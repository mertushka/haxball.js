import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import test from 'node:test'
import * as WebRTCNode from '@webrtc-node/webrtc'

import {
	createHeadlessEnvironment,
	InvalidRoomTokenError,
} from '../src/runtime.ts'
import type { HBInit } from '../src/types.ts'

test('uses @webrtc-node/webrtc by default', () => {
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
		webrtc,
	})

	assert.equal(environment.RTCPeerConnection, RTCPeerConnection)
	assert.equal(environment.RTCIceCandidate, RTCIceCandidate)
	assert.equal(environment.RTCSessionDescription, RTCSessionDescription)
})

test('uses a custom WebRTC implementation when the default cannot load', () => {
	const runtime = new URL('../src/runtime.ts', import.meta.url)
	execFileSync(process.execPath, [
		'--input-type=module',
		'--eval',
		`
		import assert from 'node:assert/strict'
		import { registerHooks } from 'node:module'
		registerHooks({
			resolve(specifier, context, nextResolve) {
				if (specifier === '@webrtc-node/webrtc') throw new Error('Default backend unavailable')
				return nextResolve(specifier, context)
			},
		})
		const { createHeadlessEnvironment } = await import(${JSON.stringify(runtime.href)})
		class Custom {}
		const webrtc = { RTCPeerConnection: Custom, RTCIceCandidate: Custom, RTCSessionDescription: Custom }
		assert.equal(createHeadlessEnvironment({ webrtc }).RTCPeerConnection, Custom)
		assert.throws(() => createHeadlessEnvironment({}), /Default backend unavailable/)
		`,
	])
})

test('captures HBInit through the window shim', () => {
	const environment = createHeadlessEnvironment({})
	const expected = (() => ({})) as unknown as HBInit
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
