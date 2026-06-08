import { loadHeadless } from './generated/headless.ts'
import {
	createHeadlessEnvironment,
	type HaxballJSConfig,
	InvalidRoomTokenError,
	type WebRTCConstructor,
	type WebRTCImplementation,
} from './runtime.ts'
import type { HBInit } from './types.ts'

export * from './types.ts'
export type { HaxballJSConfig, WebRTCConstructor, WebRTCImplementation }
export { InvalidRoomTokenError }

export default function HaxballJS(
	config: HaxballJSConfig = {},
): Promise<typeof HBInit> {
	return loadHeadless(createHeadlessEnvironment(config))
}
