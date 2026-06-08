import * as WebRTCNode from '@mertushka/webrtc-node'
import { HttpsProxyAgent } from 'https-proxy-agent'
import JSON5 from 'json5'
import pako from 'pako'
import WebSocket, { type ClientOptions } from 'ws'
// @ts-expect-error xhr2 does not publish TypeScript declarations.
import XMLHttpRequest from 'xhr2'

import type { HBInit } from './types.ts'

type Constructor = new (...args: never[]) => object

export type WebRTCConstructor = Constructor

interface HeadlessElement {
	hidden?: boolean
	innerHTML?: string
	onerror?: (error: Error) => void
	src?: string
}

interface HeadlessDocument {
	getElementById(id: string): HeadlessElement | null
	createElement(): HeadlessElement
	head: {
		appendChild(element: HeadlessElement): HeadlessElement
	}
}

export interface HeadlessWindow {
	parent: {
		HBInit?: typeof HBInit
		onHBLoaded: () => void
	}
	document: HeadlessDocument
	[key: string]: unknown
}

export interface WebRTCImplementation {
	RTCPeerConnection: WebRTCConstructor
	RTCIceCandidate: WebRTCConstructor
	RTCSessionDescription: WebRTCConstructor
}

export interface HaxballJSConfig {
	proxy?: string
	debug?: boolean
	webrtc?: WebRTCImplementation
}

export class InvalidRoomTokenError extends Error {
	constructor() {
		super(
			'Invalid room token. Generate a new token at https://www.haxball.com/headlesstoken.',
		)
		this.name = 'InvalidRoomTokenError'
	}
}

export interface HeadlessEnvironment {
	WebSocket: Constructor
	XMLHttpRequest: Constructor
	JSON5: typeof JSON5
	pako: typeof pako
	RTCPeerConnection: WebRTCConstructor
	RTCIceCandidate: WebRTCConstructor
	RTCSessionDescription: WebRTCConstructor
	crypto: Crypto
	performance: Performance
	TextEncoder: typeof TextEncoder
	createWindow(resolve: (value: typeof HBInit) => void): HeadlessWindow
}

function isRecaptchaResponse(response: unknown): boolean {
	if (typeof response === 'string') {
		try {
			return isRecaptchaResponse(JSON.parse(response))
		} catch {
			return false
		}
	}

	if (typeof response !== 'object' || response === null) return false

	if ('action' in response && response.action === 'recaptcha') return true

	return (
		'data' in response &&
		typeof response.data === 'object' &&
		response.data !== null &&
		'action' in response.data &&
		response.data.action === 'recaptcha'
	)
}

function createWindow(resolve: (value: typeof HBInit) => void): HeadlessWindow {
	const roomLinkElement = { innerHTML: '' }
	const recaptchaElement = { hidden: true }

	const parent: HeadlessWindow['parent'] = {
		set HBInit(value: typeof HBInit) {
			resolve(value)
		},
		onHBLoaded: () => {},
	}

	const document: HeadlessDocument = {
		getElementById(id: string) {
			if (id === 'roomlink') return roomLinkElement
			if (id === 'recaptcha') return recaptchaElement
			return null
		},
		createElement() {
			return {
				src: '',
				onerror: undefined as ((error: Error) => void) | undefined,
			}
		},
		head: {
			appendChild(element: HeadlessElement) {
				queueMicrotask(() => {
					element.onerror?.(
						new Error('reCAPTCHA is unavailable in the Node.js runtime'),
					)
				})
				return element
			},
		},
	}

	return {
		parent,
		document,
		crypto: globalThis.crypto,
		performance: globalThis.performance,
		setTimeout,
		clearTimeout,
		setInterval,
		clearInterval,
		console,
		grecaptcha: undefined,
		___recaptchaload: undefined,
	}
}

export function createHeadlessEnvironment(
	config: HaxballJSConfig,
): HeadlessEnvironment {
	const proxyAgent = config.proxy
		? new HttpsProxyAgent(new URL(config.proxy))
		: undefined

	class HaxballWebSocket extends WebSocket {
		constructor(address: string | URL) {
			const options: ClientOptions = {
				headers: { origin: 'https://html5.haxball.com' },
			}

			if (proxyAgent) options.agent = proxyAgent

			super(address, options)

			if (config.debug) {
				this.on('error', (error) => {
					console.error('[haxball.js] WebSocket error:', error)
				})
			}
		}
	}

	class HaxballXMLHttpRequest extends XMLHttpRequest {
		dispatchEvent(event: { type: string }) {
			const { response } = this as unknown as { response: unknown }

			if (event.type === 'load' && isRecaptchaResponse(response)) {
				throw new InvalidRoomTokenError()
			}

			return super.dispatchEvent(event)
		}
	}

	const webrtc: WebRTCImplementation = config.webrtc ?? WebRTCNode

	return {
		WebSocket: HaxballWebSocket,
		XMLHttpRequest: HaxballXMLHttpRequest,
		JSON5,
		pako,
		RTCPeerConnection: webrtc.RTCPeerConnection,
		RTCIceCandidate: webrtc.RTCIceCandidate,
		RTCSessionDescription: webrtc.RTCSessionDescription,
		crypto: globalThis.crypto,
		performance: globalThis.performance,
		TextEncoder,
		createWindow,
	}
}
