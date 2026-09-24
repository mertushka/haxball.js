import assert from 'node:assert/strict'
import test from 'node:test'

import { loadHeadless } from '../src/generated/headless.ts'
import { createHeadlessEnvironment } from '../src/runtime.ts'

test('exposes input flags and initial player input without a live room', async () => {
	// Resolve geolocation locally and leave host registration pending. This tests
	// the actual generated API without a token, network traffic, or room timers.
	class XMLHttpRequest {
		status = 200
		response = { data: { code: 'GB', lat: 0, lon: 0 } }
		onload?: () => void
		url = ''
		open(_method: string, url: string) {
			this.url = url
		}
		setRequestHeader() {}
		send() {
			if (this.url.endsWith('/api/geo')) {
				queueMicrotask(() => this.onload?.())
			}
		}
	}

	const environment = createHeadlessEnvironment({})
	const HBInit = await loadHeadless({
		...environment,
		XMLHttpRequest,
		createWindow: (resolve) => ({
			...environment.createWindow(resolve),
			setInterval: () => 0,
			setTimeout: () => 0,
		}),
	})
	const room = HBInit({ roomName: 'Input API test', public: false })

	assert.deepEqual(room.InputBits, {
		Up: 1,
		Down: 2,
		Left: 4,
		Right: 8,
		Kick: 16,
	})
	assert.equal(room.getPlayer(0)?.input, 0)
	assert.equal(room.getPlayerList()[0]?.input, 0)
})
