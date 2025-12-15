import { expect, test } from 'bun:test'
import HaxballJS from '../src'

test.todo('HBInit with proxy', (done) => {
	// TODO: Needs residential proxy for CI
	// Run `bun test --todo` if testing locally
	HaxballJS({ proxy: process.env.TEST_HB_PROXY, debug: true }).then(
		(HBInit) => {
			expect(process.env.HEADLESS_TEST_TOKEN).toBeDefined()
			expect(process.env.TEST_HB_PROXY).toBeDefined()

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
		},
	)
})
