import assert from 'node:assert/strict'
import test from 'node:test'
import * as WebRTCNode from '@mertushka/webrtc-node'

import {
	createHeadlessEnvironment,
	InvalidRoomTokenError,
} from '../src/runtime.ts'
import type { HBInit } from '../src/types.ts'

test('uses @mertushka/webrtc-node by default', () => {
	const environment = createHeadlessEnvironment({})

	assert.equal(environment.RTCPeerConnection, WebRTCNode.RTCPeerConnection)
	assert.equal(environment.RTCIceCandidate, WebRTCNode.RTCIceCandidate)
	assert.equal(
		environment.RTCSessionDescription,
		WebRTCNode.RTCSessionDescription,
	)

	const peerConnection = new environment.RTCPeerConnection({ iceServers: [] })
	peerConnection.close()
})

test('uses a custom WebRTC implementation', () => {
	class RTCPeerConnection {}
	class RTCIceCandidate {}
	class RTCSessionDescription {}

	const webrtc = {
		RTCPeerConnection,
		RTCIceCandidate,
		RTCSessionDescription,
	}

	const environment = createHeadlessEnvironment({
		webrtc: webrtc as never,
	})

	assert.equal(environment.RTCPeerConnection, RTCPeerConnection)
	assert.equal(environment.RTCIceCandidate, RTCIceCandidate)
	assert.equal(environment.RTCSessionDescription, RTCSessionDescription)
})

test('captures HBInit through the window shim', () => {
	const environment = createHeadlessEnvironment({})
	const expected = (() => ({})) as unknown as typeof HBInit
	let actual: unknown
	const window = environment.createWindow((HBInit) => {
		actual = HBInit
	})

	window.parent.HBInit = expected

	assert.equal(actual, expected)
	const roomLinkElement = window.document.getElementById('roomlink')
	const recaptchaElement = window.document.getElementById('recaptcha')
	assert.ok(roomLinkElement)
	assert.ok(recaptchaElement)
	assert.equal(roomLinkElement.innerHTML, '')
	assert.equal(recaptchaElement.hidden, true)
})

test('throws when Haxball rejects the room token', async (t) => {
	const environment = createHeadlessEnvironment({})
	const XMLHttpRequest = environment.XMLHttpRequest as unknown as new () => {
		response: unknown
		dispatchEvent(event: { type: string }): unknown
	}

	for (const response of [
		{ action: 'recaptcha' },
		{ data: { action: 'recaptcha', sitekey: 'test' } },
		'{"data":{"action":"recaptcha","sitekey":"test"}}',
	]) {
		await t.test(`response: ${typeof response}`, () => {
			const request = new XMLHttpRequest()

			Object.defineProperty(request, 'response', { value: response })

			assert.throws(
				() => request.dispatchEvent({ type: 'load' }),
				(error: unknown) => {
					assert.ok(error instanceof InvalidRoomTokenError)
					assert.match(error.message, /Invalid room token/)
					return true
				},
			)
		})
	}
})
