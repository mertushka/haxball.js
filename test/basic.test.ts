import assert from 'node:assert/strict'
import test from 'node:test'

import HaxballJS from '../src/index.ts'

const token = process.env.TEST_HB_HEADLESS_TOKEN

test('creates a Haxball room', {
	skip: token ? false : 'TEST_HB_HEADLESS_TOKEN is not configured',
	timeout: 60_000,
}, async () => {
	assert.ok(token)
	const HBInit = await HaxballJS({ debug: true })

	await new Promise<void>((resolve, reject) => {
		const timeout = setTimeout(
			() => reject(new Error('Timed out waiting for the room link')),
			55_000,
		)

		const room = HBInit({
			roomName: 'Haxball.JS',
			maxPlayers: 16,
			public: false,
			noPlayer: true,
			token,
		})

		room.setDefaultStadium('Big')
		room.setScoreLimit(5)
		room.setTimeLimit(0)
		room.onRoomLink = () => {
			clearTimeout(timeout)
			resolve()
		}
	})
})
