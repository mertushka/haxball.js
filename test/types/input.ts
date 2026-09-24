// Compile-time coverage of the public exports; checked by npm run type-check.
import type {
	InputBitsObject,
	InputFlags,
	PlayerJoinObject,
	PlayerObject,
	RoomObject,
} from '../../src/index.ts'

type Equal<A, B> =
	(<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
		? true
		: false
type Expect<T extends true> = T

export type InputApiAssertions = [
	Expect<Equal<InputFlags, number>>,
	Expect<Equal<PlayerObject['input'], InputFlags>>,
	Expect<Equal<PlayerJoinObject['input'], InputFlags>>,
	Expect<Equal<RoomObject['InputBits'], InputBitsObject>>,
	Expect<
		Equal<InputBitsObject, { Up: 1; Down: 2; Left: 4; Right: 8; Kick: 16 }>
	>,
	Expect<
		Equal<Parameters<RoomObject['onPlayerInput']>, [PlayerObject, InputFlags]>
	>,
	Expect<Equal<ReturnType<RoomObject['onPlayerInput']>, void>>,
]
