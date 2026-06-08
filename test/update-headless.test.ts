import assert from 'node:assert/strict'
import test from 'node:test'

import {
	createGeneratedModule,
	inspectHeadlessSource,
} from '../scripts/update-headless.ts'

const fixture = `/*
 HaxBall
 abcdef12
*/
(function () {
	window.parent.HBInit = function () {}
	new WebSocket("wss://example.com")
	window.document.getElementById("roomlink")
	window.document.getElementById("recaptcha")
})()`

test('validates and fingerprints upstream source', () => {
	const metadata = inspectHeadlessSource('cache123', fixture)

	assert.equal(metadata.cacheHash, 'cache123')
	assert.equal(metadata.sourceHash, 'abcdef12')
})

test('embeds upstream source without rewriting it', () => {
	const metadata = inspectHeadlessSource('cache123', fixture)
	const generated = createGeneratedModule(metadata, fixture)

	assert.ok(generated.includes(fixture))
	assert.ok(generated.includes('export function loadHeadless'))
	assert.ok(generated.includes('// Haxball source hash: abcdef12'))
})

test('rejects changed upstream integration points', () => {
	assert.throws(
		() =>
			inspectHeadlessSource(
				'cache123',
				fixture.replace('new WebSocket', 'new OtherSocket'),
			),
		/WebSocket construction/,
	)
})
