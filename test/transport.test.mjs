import assert from 'node:assert/strict'
import test from 'node:test'
import { crc32 } from 'node:zlib'
import { modes, startHost, until } from '../scripts/fixtures/transport.mjs'

const entry = process.env.HAXBALL_ENTRY

test('exchanges headless traffic on all modes, with buffer reuse and reconnects', {
	timeout: 60_000,
}, async () => {
	const host = await startHost(entry)
	try {
		const clients = [await host.connect('First'), await host.connect('Second')]
		assert.deepEqual((await host.call('status')).peers, [modes, modes])
		await host.call('startGame')
		for (const client of clients) client.reset()
		await host.call('startCapture', true)
		for (const client of clients) client.ping()
		await host.call('burst', 128)
		for (const client of clients) {
			await until(
				() =>
					client.packets.filter(({ bytes }) => bytes.includes('loopback:'))
						.length >= 256,
				'reliable ordered and unordered announcements',
			)
		}
		// The unreliable channel is best-effort. Retry a small probe if a datagram drops.
		for (
			let attempt = 0;
			attempt < 5 && clients.some(({ rtt }) => !rtt.length);
			attempt++
		) {
			for (const client of clients) client.ping()
			await host.call('status')
		}
		await until(() => clients.every(({ rtt }) => rtt.length), 'ping replies')
		const { packets } = await host.call('stopCapture')
		for (const client of clients) {
			for (const { label } of modes) {
				const sent = packets
					.filter(
						([id, mode, , , announcement]) =>
							id === client.id &&
							mode === label &&
							(label === 'uu' || announcement),
					)
					.map(([, , length, crc]) => `${length}:${crc}`)
				const received = client.packets
					.filter(
						({ label: mode, bytes }) =>
							mode === label && bytes.includes('loopback:'),
					)
					.map(({ bytes }) => `${bytes.length}:${crc32(bytes)}`)
				if (label === 'uu') {
					const replies = client.packets.filter(
						({ bytes, label }) => label === 'uu' && bytes[0] === 4,
					)
					assert.ok(replies.length > 0)
					for (const { bytes } of replies)
						assert.ok(sent.includes(`${bytes.length}:${crc32(bytes)}`))
				} else {
					assert.deepEqual(
						label === 'ro' ? received : received.sort(),
						label === 'ro' ? sent : sent.sort(),
					)
				}
			}
			client.close()
		}
		await until(
			async () => (await host.call('status')).players.length === 0,
			'client disconnects',
			15_000,
		)
		for (let round = 0; round < 3; round++) {
			const client = await host.connect('First')
			await host.call('burst', 128, 0, true)
			await until(
				() =>
					client.packets.some(
						({ label, bytes }) => label === 'ro' && bytes[0] === 5,
					),
				'ordered kick packet after a burst',
			)
			const ordered = client.packets.filter(({ label }) => label === 'ro')
			const kickIndex = ordered.findIndex(({ bytes }) => bytes[0] === 5)
			assert.ok(ordered[kickIndex].bytes.includes('loopback teardown'))
			const sequences = ordered.slice(0, kickIndex).flatMap(({ bytes }) => {
				const match = /loopback:(\d+):/.exec(bytes.toString())
				return match ? [Number(match[1])] : []
			})
			assert.deepEqual(
				sequences,
				Array.from({ length: 128 }, (_, index) => index),
			)
			await until(
				async () => (await host.call('status')).peers.length === 0,
				'queued peer teardown',
			)
			client.close()
		}
	} finally {
		await host.close()
	}
})

test('isolates a reliable send failure while retaining best-effort traffic', {
	timeout: 30_000,
}, async () => {
	const host = await startHost(entry)
	try {
		const failed = await host.connect('Failed peer')
		const survivor = await host.connect('Surviving peer')
		await host.call('startGame')
		await host.call('saturateNext', 'uu')
		failed.ping()
		await until(
			async () => (await host.call('status')).failures === 1,
			'unreliable send rejection',
		)
		assert.equal((await host.call('status')).players.length, 2)

		await host.call('saturateNext', 'ru')
		await host.call('burst', 2)
		await until(
			async () => (await host.call('status')).players.length === 1,
			'reliable send failure disconnect',
		)
		assert.equal((await host.call('status')).players[0].name, 'Surviving peer')
		await until(
			() =>
				survivor.packets.some(
					({ label, bytes }) => label === 'ru' && bytes.includes('loopback:1:'),
				),
			'unaffected peer broadcast',
		)
		assert.ok(
			!failed.packets.some(({ bytes }) => bytes.includes('loopback:1:')),
		)

		await host.call('raiseChannelError', 'ro')
		await until(
			async () => (await host.call('status')).players.length === 0,
			'async channel error disconnect',
		)
	} finally {
		await host.close()
	}
})
