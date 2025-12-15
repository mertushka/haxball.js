import { expect, test } from 'bun:test'
import HaxballJS from '../src'

test('HBInit', (done) => {
	HaxballJS({ debug: true }).then((HBInit) => {
		expect(process.env.HEADLESS_TEST_TOKEN).toBeDefined()

		const room = HBInit({
			roomName: 'Haxball.JS',
			maxPlayers: 16,
			public: false,
			noPlayer: true,
			token: process.env.HEADLESS_TEST_TOKEN,
		})

		room.setDefaultStadium('Big')
		room.setScoreLimit(5)
		room.setTimeLimit(0)

		room.onRoomLink = () => {
			done()
		}
	})
})
