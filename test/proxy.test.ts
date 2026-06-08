import assert from 'node:assert/strict'
import { once } from 'node:events'
import { createServer } from 'node:http'
import { connect } from 'node:net'
import test from 'node:test'
import type WebSocket from 'ws'
import { WebSocketServer } from 'ws'

import HaxballJS from '../src/index.ts'
import { createHeadlessEnvironment } from '../src/runtime.ts'

const token = process.env.TEST_HB_HEADLESS_TOKEN
const proxy = process.env.TEST_HB_PROXY

test('does not proxy XMLHttpRequest connections', async (t) => {
	let targetRequests = 0
	const targetServer = createServer((_request, response) => {
		targetRequests++
		response.writeHead(200, { 'content-type': 'application/json' })
		response.end('{"ok":true}')
	})
	targetServer.listen(0, '127.0.0.1')
	await once(targetServer, 'listening')

	let proxyRequests = 0
	const proxyServer = createServer((_request, response) => {
		proxyRequests++
		response.writeHead(502)
		response.end()
	})
	proxyServer.on('connect', (_request, clientSocket) => {
		proxyRequests++
		clientSocket.destroy()
	})
	proxyServer.listen(0, '127.0.0.1')
	await once(proxyServer, 'listening')

	t.after(async () => {
		await Promise.all([
			new Promise<void>((resolve, reject) =>
				targetServer.close((error) => (error ? reject(error) : resolve())),
			),
			new Promise<void>((resolve, reject) =>
				proxyServer.close((error) => (error ? reject(error) : resolve())),
			),
		])
	})

	const targetAddress = targetServer.address()
	const proxyAddress = proxyServer.address()
	assert.ok(targetAddress && typeof targetAddress !== 'string')
	assert.ok(proxyAddress && typeof proxyAddress !== 'string')

	const environment = createHeadlessEnvironment({
		proxy: `http://127.0.0.1:${proxyAddress.port}`,
	})
	const DirectXMLHttpRequest =
		environment.XMLHttpRequest as unknown as new () => {
			status: number
			onload: (() => void) | null
			onerror: ((error: unknown) => void) | null
			open(method: string, url: string): void
			send(): void
		}
	const request = new DirectXMLHttpRequest()

	await new Promise<void>((resolve, reject) => {
		request.onload = () => resolve()
		request.onerror = reject
		request.open('GET', `http://127.0.0.1:${targetAddress.port}`)
		request.send()
	})

	assert.equal(request.status, 200)
	assert.equal(targetRequests, 1)
	assert.equal(proxyRequests, 0)
})

test('routes WebSocket connections through the configured proxy', async (t) => {
	const targetServer = createServer()
	const webSocketServer = new WebSocketServer({ server: targetServer })
	targetServer.listen(0, '127.0.0.1')
	await once(targetServer, 'listening')

	let proxyConnections = 0
	const proxyServer = createServer()
	proxyServer.on('connect', (request, clientSocket, head) => {
		proxyConnections++
		const [host, port] = request.url?.split(':') ?? []
		assert.ok(host)
		assert.ok(port)

		const targetSocket = connect(Number(port), host, () => {
			clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n')
			if (head.length > 0) targetSocket.write(head)
			targetSocket.pipe(clientSocket)
			clientSocket.pipe(targetSocket)
		})
	})
	proxyServer.listen(0, '127.0.0.1')
	await once(proxyServer, 'listening')

	t.after(async () => {
		await Promise.all([
			new Promise<void>((resolve) => webSocketServer.close(() => resolve())),
			new Promise<void>((resolve, reject) =>
				targetServer.close((error) => (error ? reject(error) : resolve())),
			),
			new Promise<void>((resolve, reject) =>
				proxyServer.close((error) => (error ? reject(error) : resolve())),
			),
		])
	})

	const targetAddress = targetServer.address()
	const proxyAddress = proxyServer.address()
	assert.ok(targetAddress && typeof targetAddress !== 'string')
	assert.ok(proxyAddress && typeof proxyAddress !== 'string')

	const environment = createHeadlessEnvironment({
		proxy: `http://127.0.0.1:${proxyAddress.port}`,
	})
	const ProxiedWebSocket = environment.WebSocket as typeof WebSocket
	const socket = new ProxiedWebSocket(`ws://127.0.0.1:${targetAddress.port}`)

	await once(socket, 'open')
	assert.equal(proxyConnections, 1)

	socket.close()
	await once(socket, 'close')
})

test('creates a Haxball room with a proxied WebSocket connection', {
	skip:
		token && proxy
			? false
			: 'TEST_HB_HEADLESS_TOKEN and TEST_HB_PROXY are required',
	timeout: 30_000,
}, async () => {
	assert.ok(token)
	assert.ok(proxy)
	const HBInit = await HaxballJS({ proxy, debug: true })

	await new Promise<void>((resolve, reject) => {
		const timeout = setTimeout(
			() => reject(new Error('Timed out waiting for the proxied room link')),
			25_000,
		)

		const room = HBInit({
			roomName: 'Haxball.JS',
			maxPlayers: 16,
			public: false,
			noPlayer: true,
			token,
		})

		room.onRoomLink = () => {
			clearTimeout(timeout)
			resolve()
		}
	})
})
