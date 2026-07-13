import {
	constants,
	deflateRawSync,
	inflateRawSync,
	type ZlibOptions,
} from 'node:zlib'

type Input = string | ArrayBuffer | NodeJS.ArrayBufferView

function toUint8Array(data: Uint8Array): Uint8Array {
	return new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
}

export function deflateRaw(data: Input): Uint8Array {
	return toUint8Array(deflateRawSync(data))
}

export function inflateRaw(data: Input): Uint8Array {
	return toUint8Array(inflateRawSync(data))
}

export class Inflate {
	err = 0
	msg = ''
	result?: Uint8Array

	readonly #options: ZlibOptions
	#chunks: Uint8Array[] = []

	constructor(options: ZlibOptions & { raw?: boolean } = {}) {
		const { raw: _raw, ...zlibOptions } = options
		this.#options = zlibOptions
	}

	onData(chunk: Uint8Array): void {
		this.#chunks.push(chunk)
	}

	onEnd(status: number): void {
		this.err = status
		if (status === 0) {
			this.result = this.#chunks.length === 1 ? this.#chunks[0] : undefined
		}
		this.#chunks = []
	}

	push(data: Input, final: boolean): boolean {
		if (!final) {
			throw new Error('The Node zlib compatibility adapter requires final=true')
		}

		const outputBuffer = (this as { buffer?: unknown }).buffer
		const maxOutputLength =
			outputBuffer instanceof Uint8Array
				? Math.max(1, outputBuffer.byteLength)
				: undefined
		const chunkSize =
			maxOutputLength === undefined
				? this.#options.chunkSize
				: (this.#options.chunkSize ??
					Math.max(constants.Z_MIN_CHUNK, maxOutputLength))

		let output: Uint8Array
		try {
			output = toUint8Array(
				inflateRawSync(data, {
					...this.#options,
					chunkSize,
					maxOutputLength,
				}),
			)
		} catch (error) {
			if (
				maxOutputLength !== undefined &&
				error instanceof Error &&
				'code' in error &&
				error.code === 'ERR_BUFFER_TOO_LARGE'
			) {
				throw new Error('Inflate size exceeds limit')
			}

			this.msg = error instanceof Error ? error.message : String(error)
			const status =
				error instanceof Error &&
				'errno' in error &&
				typeof error.errno === 'number'
					? error.errno
					: constants.Z_DATA_ERROR
			this.onEnd(status)
			return false
		}

		this.onData(output)
		this.onEnd(0)
		return true
	}
}

interface PakoAdapter {
	deflateRaw: typeof deflateRaw
	inflateRaw: typeof inflateRaw
	Inflate: typeof Inflate
}

const pako: PakoAdapter = { deflateRaw, inflateRaw, Inflate }

export default pako
