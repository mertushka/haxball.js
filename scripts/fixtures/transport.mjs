import assert from 'node:assert/strict'
import { fork } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import { performance } from 'node:perf_hooks'
import { setTimeout as delay } from 'node:timers/promises'
import { deflateRawSync, inflateRawSync } from 'node:zlib'
import { RTCPeerConnection } from '@webrtc-node/webrtc'
import { WebSocketServer } from 'ws'

export const modes = [
	{ label: 'ro', id: 0, negotiated: true, ordered: true, maxRetransmits: null },
	{
		label: 'ru',
		id: 1,
		negotiated: true,
		ordered: false,
		maxRetransmits: null,
	},
	{ label: 'uu', id: 2, negotiated: true, ordered: false, maxRetransmits: 0 },
]

export async function until(check, description, timeout = 5000) {
	const end = performance.now() + timeout
	while (performance.now() < end) {
		const result = await check()
		if (result) return result
		await delay(10)
	}
	throw new Error(`Timed out waiting for ${description}`)
}

function uint32(value) {
	const output = Buffer.alloc(4)
	output.writeUInt32BE(value)
	return output
}

function encodeString(value) {
	const bytes = Buffer.from(value)
	const size = []
	for (let length = bytes.length; ; length >>>= 7) {
		size.push(length & 0x7f)
		if (length < 128) break
		size[size.length - 1] |= 0x80
	}
	return Buffer.concat([Buffer.from(size), bytes])
}

function readString(bytes, offset = 0) {
	let size = 0
	let shift = 0
	let byte
	do {
		assert.ok(offset < bytes.length)
		byte = bytes[offset++]
		size |= (byte & 0x7f) << shift
		shift += 7
	} while (byte & 0x80)
	assert.ok(offset + size <= bytes.length)
	return [bytes.toString('utf8', offset, offset + size), offset + size]
}

function decodeAnswer(bytes) {
	const [sdp, offset] = readString(bytes)
	const [candidates] = readString(bytes, offset)
	return { sdp, candidates: JSON.parse(candidates) }
}

export async function startHost(entry = 'src/index.ts') {
	let socket
	let ready = false
	let failure
	let rpcId = 0
	let offerId = 0
	const replies = new Map()
	const signaling = new Map()
	const connections = new Set()
	const http = createServer((request, response) => {
		const data =
			request.url === '/rs/api/geo'
				? { code: 'gb', lat: 0, lon: 0 }
				: { action: 'connect', url: `ws://${address}`, token: 'fixture' }
		response.setHeader('content-type', 'application/json')
		response.end(JSON.stringify({ data }))
	})
	const wss = new WebSocketServer({ server: http })
	wss.on('connection', (ws) => {
		socket = ws
		ws.on('message', (bytes) => {
			if (bytes.length >= 5) signaling.get(bytes.readUInt32BE(1))?.(bytes)
		})
		ws.send(Buffer.from([5, 1, 65]))
	})
	http.listen(0, '127.0.0.1')
	await once(http, 'listening')
	const address = `127.0.0.1:${http.address().port}`
	const host = fork(new URL('./transport-host.mjs', import.meta.url), {
		execArgv: [],
		env: {
			...process.env,
			HAXBALL_ENTRY: resolve(entry),
			HAXBALL_LOOPBACK: `http://${address}`,
		},
	})
	const exited = once(host, 'exit')
	host.on('message', ({ id, value, error, ready: initialized }) => {
		if (initialized) ready = true
		const reply = replies.get(id)
		if (error) reply?.reject(new Error(error))
		else reply?.resolve(value)
	})
	host.on('exit', (code) => {
		failure = new Error(`Headless host exited with code ${code}`)
		for (const reply of replies.values()) reply.reject(failure)
	})

	async function call(method, ...args) {
		if (failure) throw failure
		const id = ++rpcId
		try {
			return await new Promise((resolve, reject) => {
				replies.set(id, { resolve, reject })
				host.send({ id, method, args })
			})
		} finally {
			replies.delete(id)
		}
	}

	async function close() {
		for (const peer of connections) peer.close()
		socket?.close(4001)
		if (host.connected && ready) host.send({ method: 'shutdown', args: [] })
		else host.kill()
		const result = await Promise.race([
			exited,
			delay(3000, null, { ref: false }),
		])
		if (!result) host.kill()
		socket?.terminate()
		await new Promise((resolve) => http.close(resolve))
		assert.equal(result?.[0], 0, 'headless process should exit cleanly')
	}

	async function connect(name) {
		const peer = new RTCPeerConnection({ iceServers: [] })
		connections.add(peer)
		const channels = modes.map(({ label, maxRetransmits, ...options }) => {
			const channel = peer.createDataChannel(label, {
				...options,
				...(maxRetransmits === null ? {} : { maxRetransmits }),
			})
			channel.binaryType = 'arraybuffer'
			return channel
		})
		const packets = []
		const pings = new Map()
		const rtt = []
		let challenge
		let joined = false
		let candidateError
		const id = ++offerId
		for (const channel of channels) {
			channel.onmessage = ({ data }) => {
				const bytes = Buffer.from(data)
				const now = performance.now()
				packets.push({
					label: channel.label,
					bytes,
					at: performance.timeOrigin + now,
				})
				if (bytes[0] === 0 && channel.label === 'ro') challenge = bytes
				if (bytes[0] === 1 && channel.label === 'ro') joined = true
				if (bytes[0] === 4 && channel.label === 'uu') {
					const sent = bytes.readDoubleBE(9)
					if (pings.delete(sent)) rtt.push(now - sent)
				}
			}
		}
		const candidates = []
		peer.onicecandidate = ({ candidate }) => {
			if (candidate?.candidate) candidates.push(candidate.toJSON())
		}
		let remote = Promise.resolve()
		signaling.set(id, (bytes) => {
			if (bytes[0] === 1) {
				remote = remote.then(async () => {
					const { sdp, candidates } = decodeAnswer(
						inflateRawSync(bytes.subarray(5)),
					)
					await peer.setRemoteDescription({ type: 'answer', sdp })
					for (const candidate of candidates)
						await peer.addIceCandidate(candidate)
				})
			}
			if (bytes[0] === 4) {
				remote = remote.then(async () => {
					const [json] = readString(inflateRawSync(bytes.subarray(5)))
					await peer.addIceCandidate(JSON.parse(json))
				})
			}
			remote.catch((error) => {
				candidateError = error
			})
		})
		await peer.setLocalDescription(await peer.createOffer())
		await until(
			() => peer.iceGatheringState === 'complete',
			'local ICE gathering',
		)
		assert.ok(candidates.length)
		const sdp = Buffer.from(
			peer.localDescription.sdp.replace(
				/^a=(?:candidate:.*|end-of-candidates)\r?\n/gm,
				'',
			),
		)
		const version = Buffer.from([0, 9, 0])
		const offer = deflateRawSync(
			Buffer.concat([
				Buffer.from([0]),
				encodeString(sdp),
				encodeString('[]'),
				version,
			]),
		)
		socket.send(
			Buffer.concat([
				Buffer.from([1]),
				uint32(id),
				Buffer.from([1, id]),
				offer,
			]),
		)
		for (const candidate of candidates) {
			socket.send(
				Buffer.concat([
					Buffer.from([4]),
					uint32(id),
					deflateRawSync(encodeString(JSON.stringify(candidate))),
				]),
			)
		}
		await until(
			() => {
				if (candidateError) throw candidateError
				return (
					challenge &&
					channels.every((channel) => channel.readyState === 'open')
				)
			},
			'native channels and room challenge',
			7500,
		)
		assert.equal(challenge[1], challenge.length - 2)
		// An empty authentication blob is accepted as an unauthenticated player.
		const details = Buffer.concat([
			encodeString(name),
			encodeString('gb'),
			Buffer.from([0]),
		])
		channels[0].send(
			Buffer.concat([Buffer.from([0, 0, details.length]), details]),
		)
		await until(() => joined, 'room snapshot')
		return {
			id,
			peer,
			channels,
			packets,
			rtt,
			reset() {
				rtt.length = 0
				packets.length = 0
				pings.clear()
			},
			ping() {
				const at = performance.now()
				const bytes = Buffer.alloc(10)
				bytes[0] = 2
				bytes.writeDoubleBE(at, 1)
				pings.set(at, true)
				channels[2].send(bytes)
			},
			close() {
				signaling.delete(id)
				connections.delete(peer)
				peer.close()
			},
		}
	}

	try {
		await until(() => {
			if (failure) throw failure
			return ready
		}, 'headless room link')
	} catch (error) {
		await close().catch(() => {})
		throw error
	}
	return { call, connect, close }
}
