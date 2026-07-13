import assert from 'node:assert/strict'
import test from 'node:test'
import { constants } from 'node:zlib'

import pako from '../src/pako.ts'

const source = new TextEncoder().encode('native zlib '.repeat(1_000))

test('raw deflate and inflate round trip as Uint8Array values', () => {
	const compressed = pako.deflateRaw(source)
	const restored = pako.inflateRaw(compressed)

	assert.ok(compressed instanceof Uint8Array)
	assert.ok(restored instanceof Uint8Array)
	assert.equal(compressed.constructor, Uint8Array)
	assert.equal(restored.constructor, Uint8Array)
	assert.deepEqual(restored, source)
})

test('Inflate supports subclass callbacks and synchronous final push', () => {
	class BoundedInflate extends pako.Inflate {
		readonly buffer = new Uint8Array(source.length)
		total = 0
		endedWith: number | undefined
		readonly callbacks: string[] = []

		override onData(chunk: Uint8Array) {
			this.callbacks.push('data')
			this.buffer.set(chunk, this.total)
			this.total += chunk.byteLength
		}

		override onEnd(status: number) {
			this.callbacks.push('end')
			this.endedWith = status
			this.err = status
		}
	}

	const inflate = new BoundedInflate({ raw: true })
	assert.equal(inflate.push(pako.deflateRaw(source), true), true)
	assert.equal(inflate.endedWith, 0)
	assert.equal(inflate.err, 0)
	assert.equal(inflate.total, source.length)
	assert.deepEqual(inflate.callbacks, ['data', 'end'])
	assert.deepEqual(inflate.buffer, source)
})

test('Inflate default callbacks expose the result and success state', () => {
	const inflate = new pako.Inflate({ raw: true })

	assert.equal(inflate.push(pako.deflateRaw(source), true), true)
	assert.equal(inflate.err, 0)
	assert.equal(inflate.msg, '')
	assert.ok(inflate.result instanceof Uint8Array)
	assert.deepEqual(inflate.result, source)
})

test('Inflate reports malformed input through onEnd, err, and msg', () => {
	const statuses: number[] = []
	class CallbackInflate extends pako.Inflate {
		override onData() {
			assert.fail('onData must not run for malformed input')
		}

		override onEnd(status: number) {
			statuses.push(status)
			super.onEnd(status)
		}
	}

	const inflate = new CallbackInflate({ raw: true })
	assert.equal(inflate.push(Uint8Array.of(0xff), true), false)
	assert.equal(inflate.err, constants.Z_DATA_ERROR)
	assert.notEqual(inflate.msg, '')
	assert.deepEqual(statuses, [inflate.err])
})

test('Inflate enforces an upstream-style output buffer limit', () => {
	class BoundedInflate extends pako.Inflate {
		readonly buffer = new Uint8Array(source.length - 1)
	}

	const inflate = new BoundedInflate({ raw: true })
	assert.throws(
		() => inflate.push(pako.deflateRaw(source), true),
		/Inflate size exceeds limit/,
	)
})

test('Inflate propagates callback errors', () => {
	class DataCallbackInflate extends pako.Inflate {
		override onData() {
			throw new Error('callback failed')
		}
	}

	class EndCallbackInflate extends pako.Inflate {
		override onEnd() {
			throw new Error('end callback failed')
		}
	}

	const compressed = pako.deflateRaw(source)
	const inflate = new DataCallbackInflate({ raw: true })
	assert.throws(() => inflate.push(compressed, true), /callback failed/)
	assert.throws(
		() => new EndCallbackInflate({ raw: true }).push(compressed, true),
		/end callback failed/,
	)
})

test('Inflate enforces a zero-length output buffer limit', () => {
	class BoundedInflate extends pako.Inflate {
		readonly buffer = new Uint8Array(0)

		override onData(chunk: Uint8Array) {
			if (chunk.byteLength > this.buffer.byteLength) {
				throw new Error('Inflate size exceeds limit')
			}
		}
	}

	const inflate = new BoundedInflate({ raw: true })
	assert.throws(
		() => inflate.push(pako.deflateRaw(Uint8Array.of(1)), true),
		/Inflate size exceeds limit/,
	)
})
