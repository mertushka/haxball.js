import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import {
	createGeneratedModule,
	inspectHeadlessSource,
	updateHeadless,
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

test('rejects an invalid cache hash before requesting source', async (t) => {
	const fetch = t.mock.method(globalThis, 'fetch', async () =>
		Response.json('../bad'),
	)

	await assert.rejects(updateHeadless(), /Unexpected Haxball cache hash/)
	assert.equal(fetch.mock.callCount(), 1)
})

test('ignores cache-only changes and writes changed source', async (t) => {
	const directory = await mkdtemp(join(tmpdir(), 'haxball-headless-'))
	t.after(() => rm(directory, { recursive: true, force: true }))
	const output = join(directory, 'headless.ts')
	const original = createGeneratedModule(
		inspectHeadlessSource('old-cache', fixture),
		fixture,
	)
	await writeFile(output, original)

	let source = fixture.replaceAll('\n', '\r\n')
	t.mock.method(globalThis, 'fetch', async (url: string) =>
		url.endsWith('/cache_hash.json')
			? Response.json('new-cache')
			: new Response(source),
	)
	await updateHeadless(output)
	assert.equal(await readFile(output, 'utf8'), original)

	source = fixture.replace('example.com', 'example.org')
	await updateHeadless(output)
	const updated = await readFile(output, 'utf8')
	assert.match(updated, /Haxball cache hash: new-cache/)
	assert.ok(updated.includes(source))
})
