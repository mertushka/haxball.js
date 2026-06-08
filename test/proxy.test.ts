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

test('creates a Haxball room through a proxy', {
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
