import { createRequire } from 'node:module'
import { monitorEventLoopDelay, performance } from 'node:perf_hooks'
import { setTimeout as delay } from 'node:timers/promises'
import { pathToFileURL } from 'node:url'
import { crc32 } from 'node:zlib'
import {
	RTCDataChannel,
	RTCError,
	RTCErrorEvent,
	RTCPeerConnection,
} from '@webrtc-node/webrtc'

const require = createRequire(import.meta.url)
const XMLHttpRequest = require('xhr2')
const openRequest = XMLHttpRequest.prototype.open
const setInterval = globalThis.setInterval
const entry = process.env.HAXBALL_ENTRY
const endpoint = process.env.HAXBALL_LOOPBACK
const peers = new Map()
let nextPeer = 0
let capture
let reuse = false
let failLabel
let failures = 0

// HBInit has no room shutdown API. Let the fixture process exit after closing
// its signaling socket and peers, even with the room's periodic timers active.
globalThis.setInterval = (...args) => setInterval(...args).unref()

// Only the signaling service is replaced. The generated host uses the default
// WebRTC adapter and native UDP transport to reach clients in another process.
XMLHttpRequest.prototype.open = function (method, url, ...args) {
	const path = new URL(url).pathname
	if (!['/rs/api/geo', '/rs/api/host'].includes(path)) throw new Error(url)
	return openRequest.call(this, method, new URL(path, endpoint).href, ...args)
}

const createChannel = RTCPeerConnection.prototype.createDataChannel
const closePeer = RTCPeerConnection.prototype.close
RTCPeerConnection.prototype.createDataChannel = function (label, options) {
	if (!peers.has(this)) peers.set(this, { id: ++nextPeer, channels: [] })
	const peer = peers.get(this)
	const channel = createChannel.call(this, label, options)
	peer.channels.push(channel)
	return channel
}
RTCPeerConnection.prototype.close = function () {
	peers.delete(this)
	return closePeer.call(this)
}

const nativeSend = RTCDataChannel.prototype.send
const scratch = new Uint8Array(2048)
RTCDataChannel.prototype.send = function (data) {
	if (failLabel === this.label) {
		failLabel = undefined
		failures++
		throw new DOMException('Injected send admission failure', 'OperationError')
	}
	const bytes = new Uint8Array(data)
	const start = capture && performance.now()
	let payload = data
	if (reuse) {
		scratch.set(bytes, 3)
		payload = new DataView(scratch.buffer, 3, bytes.length)
	}
	if (capture) {
		for (const { id, channels } of peers.values()) {
			if (!channels.includes(this)) continue
			const buffer = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.length)
			capture.packets.push([
				id,
				this.label,
				bytes.length,
				crc32(bytes),
				buffer.includes('loopback:'),
			])
			break
		}
	}
	nativeSend.call(this, payload)
	if (reuse) scratch.fill(0xff, 3, 3 + bytes.length)
	if (capture) {
		const end = performance.now()
		capture.nativeMs += end - start
		capture.backlog = Math.max(capture.backlog, this.bufferedAmount)
	}
}

const { default: haxball } = entry.endsWith('.cjs')
	? require(entry)
	: await import(pathToFileURL(entry).href)
const room = (await haxball())({
	roomName: 'Loopback',
	maxPlayers: 16,
	noPlayer: true,
	geo: { code: 'gb', lat: 0, lon: 0 },
})
room.onRoomLink = () => process.send({ ready: true })
room.onGameTick = () => capture?.ticks.push(performance.now())

const commands = {
	status: () => ({
		players: room.getPlayerList(),
		peers: [...peers.values()].map(({ channels }) =>
			channels.map(({ label, id, negotiated, ordered, maxRetransmits }) => ({
				label,
				id,
				negotiated,
				ordered,
				maxRetransmits,
			})),
		),
		failures,
	}),
	async startGame() {
		room.setPlayerTeam(room.getPlayerList()[0].id, 1)
		room.startGame()
		await Promise.resolve()
	},
	startCapture(reuseBuffers = false) {
		reuse = reuseBuffers
		const lag = monitorEventLoopDelay({ resolution: 2 })
		lag.enable()
		capture = {
			lag,
			ticks: [],
			packets: [],
			nativeMs: 0,
			backlog: 0,
			cpu: process.cpuUsage(),
			rss: process.memoryUsage.rss(),
			bursts: [],
		}
	},
	async burst(count, offset = 0, kick = false) {
		const players = room.getPlayerList()
		const start = performance.now()
		for (let sequence = offset; sequence < offset + count; sequence++) {
			const payload = `loopback:${sequence}:${'x'.repeat([4, 24, 96, 850][sequence % 4])}é`
			room.sendAnnouncement(payload)
			for (const player of players) room.sendAnnouncement(payload, player.id)
		}
		if (kick) room.kickPlayer(players[0].id, 'loopback teardown', false)
		await Promise.resolve()
		capture?.bursts.push({
			start: performance.timeOrigin + start,
			ms: performance.now() - start,
			rss: process.memoryUsage.rss(),
		})
	},
	saturateNext(label) {
		failLabel = label
	},
	raiseChannelError(label) {
		const { channels } = peers.values().next().value
		const channel = channels.find((candidate) => candidate.label === label)
		setImmediate(() =>
			channel.dispatchEvent(
				new RTCErrorEvent('error', {
					error: new RTCError({ errorDetail: 'data-channel-failure' }),
				}),
			),
		)
	},
	async stopCapture() {
		const { lag, ticks, cpu, rss, ...result } = capture
		const usage = process.cpuUsage(cpu)
		lag.disable()
		capture = undefined
		reuse = false
		return {
			...result,
			rss,
			cpuMs: (usage.user + usage.system) / 1000,
			endRss: process.memoryUsage.rss(),
			eventLoopMs: { p99: lag.percentile(99) / 1e6, max: lag.max / 1e6 },
			tickGaps: ticks.slice(1).map((tick, index) => tick - ticks[index]),
		}
	},
	async shutdown() {
		for (const peer of peers.keys()) peer.close()
		await delay(20)
		process.disconnect()
	},
}

process.on('message', async ({ id, method, args }) => {
	try {
		const value = await commands[method](...args)
		if (process.connected) process.send({ id, value })
	} catch (error) {
		process.send({ id, error: error.stack })
	}
})
