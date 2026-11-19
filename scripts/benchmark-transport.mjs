import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { arch, cpus, platform, release, totalmem } from 'node:os'
import {
	setTimeout as delay,
	setInterval as interval,
} from 'node:timers/promises'
import { crc32 } from 'node:zlib'
import { startHost, until } from './fixtures/transport.mjs'

const require = createRequire(import.meta.url)
const entry = process.env.HAXBALL_ENTRY ?? 'dist/index.mjs'
const workloads = [
	{ name: 'paced', peers: 1, bursts: 100, packets: 1, gap: 15 },
	{ name: 'bursts', peers: 4, bursts: 10, packets: 128, gap: 120 },
]

function percentiles(samples) {
	const sorted = samples.toSorted((a, b) => a - b)
	assert.ok(sorted.length)
	const at = (q) => sorted[Math.ceil(q * sorted.length) - 1]
	return { p50: at(0.5), p95: at(0.95), p99: at(0.99), max: at(1) }
}

function fingerprints(packets) {
	return packets.map(({ bytes }) => `${bytes.length}:${crc32(bytes)}`)
}

async function measure(host, players, { bursts, packets, gap }) {
	await delay(100)
	const stop = new AbortController()
	const pingCounts = players.map(() => 0)
	const pinger = (async () => {
		for await (const _ of interval(25, undefined, { signal: stop.signal })) {
			players.forEach((player, index) => {
				player.ping()
				pingCounts[index]++
			})
		}
	})().catch((error) => {
		if (error.name !== 'AbortError') throw error
	})
	for (const player of players) player.reset()
	await host.call('startCapture')
	try {
		for (let burst = 0; burst < bursts; burst++) {
			await host.call('burst', packets, burst * packets)
			await delay(gap)
		}
		await until(
			() =>
				players.every(({ packets: received }) =>
					['ro', 'ru'].every(
						(label) =>
							received.filter(
								(packet) =>
									packet.label === label && packet.bytes.includes('loopback:'),
							).length ===
							bursts * packets,
					),
				),
			'reliable announcement delivery',
		)
	} finally {
		stop.abort()
		await pinger
	}
	const sample = await host.call('stopCapture')
	await delay(150)
	const delivery = {}
	let announcementBytes = 0
	let lastArrival = 0
	for (const label of ['ro', 'ru', 'uu']) {
		let attempted = 0
		let delivered = 0
		for (const [index, player] of players.entries()) {
			const expected = sample.packets
				.filter(
					([id, mode, , , announcement]) =>
						id === player.id &&
						mode === label &&
						(label === 'uu' || announcement),
				)
				.map(([, , length, crc]) => `${length}:${crc}`)
			const observed = player.packets.filter(
				(packet) =>
					packet.label === label &&
					(label === 'uu' || packet.bytes.includes('loopback:')),
			)
			if (label === 'uu') {
				// Ping replies are individually identified by their echoed timestamp.
				// Tick sync can occur just outside the capture window.
				const pending = new Map()
				for (const hash of fingerprints(observed)) {
					pending.set(hash, (pending.get(hash) ?? 0) + 1)
				}
				for (const hash of expected) {
					const copies = pending.get(hash) ?? 0
					if (!copies) continue
					pending.set(hash, copies - 1)
					delivered++
				}
				assert.equal(
					player.rtt.length,
					observed.filter(({ bytes }) => bytes[0] === 4).length,
				)
				assert.ok(player.rtt.length <= pingCounts[index])
			} else {
				const actual = fingerprints(observed)
				assert.deepEqual(
					label === 'ro' ? actual : actual.sort(),
					label === 'ro' ? expected : expected.sort(),
				)
				for (const { bytes, at } of observed) {
					if (!bytes.includes('loopback:')) continue
					announcementBytes += bytes.length
					lastArrival = Math.max(lastArrival, at)
				}
				delivered += observed.length
			}
			attempted += expected.length
		}
		delivery[label] = { attempted, delivered }
	}
	const firstSend = sample.bursts[0].start
	return {
		sendLoopMs: percentiles(sample.bursts.map(({ ms }) => ms)),
		nativeSendTotalMs: sample.nativeMs,
		eventLoopMs: sample.eventLoopMs,
		tickGapMs: percentiles(sample.tickGaps),
		rttMs: percentiles(players.flatMap(({ rtt }) => rtt)),
		pings: {
			sent: pingCounts.reduce((a, b) => a + b),
			echoed: players.flatMap(({ rtt }) => rtt).length,
		},
		announcementBytesPerSecond:
			(announcementBytes * 1000) / (lastArrival - firstSend),
		delivery,
		hostCpuMs: sample.cpuMs,
		hostRssMiB: {
			start: sample.rss / 2 ** 20,
			peakSample:
				Math.max(
					sample.rss,
					sample.endRss,
					...sample.bursts.map(({ rss }) => rss),
				) /
				2 ** 20,
		},
		bufferedAmountBytesPeak: sample.backlog,
	}
}

const environment = {
	node: process.version,
	platform: platform(),
	release: release(),
	arch: arch(),
	cpu: cpus()[0].model,
	logicalCpus: cpus().length,
	memoryGiB: totalmem() / 2 ** 30,
	haxball: require('../package.json').version,
	webrtc: require('@webrtc-node/webrtc/package.json').version,
	entry,
}
const results = []
for (const workload of workloads) {
	const host = await startHost(entry)
	try {
		const players = []
		for (let index = 0; index < workload.peers; index++) {
			players.push(await host.connect(`Player ${index}`))
		}
		await host.call('startGame')
		await measure(host, players, {
			...workload,
			bursts: Math.ceil(workload.bursts / 2),
		})
		const samples = []
		for (let round = 0; round < 3; round++)
			samples.push(await measure(host, players, workload))
		results.push({ workload, samples })
	} finally {
		await host.close()
	}
}
console.log(JSON.stringify({ environment, results }, null, 2))
