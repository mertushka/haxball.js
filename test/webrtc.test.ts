import { expect, test } from 'bun:test'
import HaxballJS from '../src'

//import wrtc from "@roamhq/wrtc";

test.todo('HBInit with custom webrtc', (done) => {
	// TODO: Bun crashes because of "wrtc" module
	HaxballJS({ debug: true }).then((HBInit) => {
		expect(process.env.CI_HB_HEADLESS_TOKEN).toBeDefined()

		const room = HBInit({
			roomName: 'Haxball.JS',
			maxPlayers: 16,
			public: false,
			noPlayer: true,
			token: process.env.CI_HB_HEADLESS_TOKEN,
		})

		room.setDefaultStadium('Big')
		room.setScoreLimit(5)
		room.setTimeLimit(0)

		room.onRoomLink = () => {
			done()
		}
	})
})
