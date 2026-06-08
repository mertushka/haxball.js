import assert from 'node:assert/strict'
import test from 'node:test'

import HaxballJS from '../src/index.ts'

const token = process.env.TEST_HB_HEADLESS_TOKEN
const proxy = process.env.TEST_HB_PROXY

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
