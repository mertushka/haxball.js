async function nodeify() {
	const req = await fetch('https://www.haxball.com/cache_hash.json');

	if (!req.ok) {
		throw new Error(
			`Failed to fetch cache_hash.json: ${req.status} ${req.statusText}`
		);
	}

	const data = await req.text();

	if (!data) {
		throw new Error('cache_hash.json is empty');
	}

	const cache_hash = data.replaceAll('"', '');

	const source_url = `https://www.haxball.com/${cache_hash}/__cache_static__/g/headless-min.js`;

	const source_res = await fetch(source_url);

	if (!source_res.ok) {
		throw new Error(
			`Failed to fetch headless-min.js: ${source_res.status} ${source_res.statusText}`
		);
	}

	let source_code = await source_res.text();

	if (!source_code) {
		throw new Error('headless-min.js is empty');
	}

	const source_code_hash = source_code.match(/\/\*[\s\S]*?(\b[a-f0-9]{8}\b)/);

	if (!source_code_hash) {
		throw new Error('Failed to extract hash from headless-min.js');
	}

	const hash = source_code_hash[1];

	if (!hash) {
		throw new Error('Extracted hash is empty');
	}

	source_code = processSource(source_code);

	await writeOutputFile(`./src/index.ts`, source_code);

	console.log(`SUCCESS:${hash}`);
}

function processSource(source: string): string {
	// Remove window references
	source = removeWindowReferences(source);

	// Apply regex replacements
	source = applyRegexReplacements(source);

	// Wrap with module code
	return wrapWithModuleCode(source);
}

function removeWindowReferences(source: string): string {
	const replacements = {
		'window.': '',
		'parent.': '',
		'document.': '',
		'.innerHTML': '',
		'getElementById("roomlink")': 'null',
		'getElementById("recaptcha")': 'null',
	};

	return Object.entries(replacements).reduce(
		(text, [search, replace]) => text.replaceAll(search, replace),
		source
	);
}

function applyRegexReplacements(source: string): string {
	// HBInit replacement
	const hbInitMatch = source.match(/HBInit\s*=\s*.+?;/);
	if (!hbInitMatch) throw new Error('Failed to find HBInit pattern');
	source = source.replace(
		hbInitMatch[0],
		`promiseResolve(${hbInitMatch[0].substring(7, hbInitMatch[0].length - 1)});`
	);

	// WebSocket replacement
	const wsMatch = source.match(/new WebSocket\([^)]+\);/);
	if (!wsMatch) throw new Error('Failed to find WebSocket pattern');
	source = source.replace(
		wsMatch[0],
		wsMatch[0].replace(
			/new WebSocket\(([^)]+)\);/,
			'new WebSocket($1, {headers:{origin: "https://html5.haxball.com"}, agent: proxyAgent});'
		)
	);

	// Add WebSocket error debug
	const wsErrorPattern =
		/([a-zA-Z]+)\.([a-zA-Z]+)\.onerror=function\(\){([a-zA-Z]+)\.([a-zA-Z]+)\(!0\)}/;
	const wsErrorMatch = source.match(wsErrorPattern);
	if (!wsErrorMatch) throw new Error('Failed to find WebSocket error handler');

	const [fullMatch, objName, wsProperty, methodObj, methodName] = wsErrorMatch;
	const debugCode = `${objName}.${wsProperty}.onerror=function(err){${methodObj}.${methodName}(!0);debug && console.error(err)};`;
	source = source.replace(fullMatch, debugCode);

	// Recaptcha replacement
	const recaptchaMatch = source.match(
		/case "recaptcha":([a-zA-Z]+)\(([^)]+)\)/
	);
	if (!recaptchaMatch) throw new Error('Failed to find Recaptcha pattern');
	source = source.replace(
		recaptchaMatch[0],
		'case "recaptcha":console.log(new Error("Invalid Token Provided!"))'
	);

	return source;
}

function wrapWithModuleCode(source: string): string {
	const header = `import WebSocket from "ws";
//@ts-expect-error - no types available
import XMLHttpRequest from "xhr2";
import JSON5 from "json5";
import pako from "pako";
import { HttpsProxyAgent } from "https-proxy-agent";
import { Crypto } from "@peculiar/webcrypto";
import { performance } from "perf_hooks";
import datachannel from "node-datachannel/polyfill";

const crypto = new Crypto();

let {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription
} = datachannel;

let promiseResolve: ((value: typeof HBInit) => void) | null = null;
//@ts-expect-error - todo: fix types
let proxyAgent: HttpsProxyAgent | undefined;
let debug = false;

//import "haxball-headless-browser";

 interface HaxballJSConfig {
  proxy?: string;
  debug?: boolean;
  webrtc?: {
    RTCPeerConnection: typeof globalThis.RTCPeerConnection;
    RTCIceCandidate: typeof globalThis.RTCIceCandidate;
    RTCSessionDescription: typeof globalThis.RTCSessionDescription;
  };
}

const HBInitPromise: Promise<typeof HBInit> = new Promise(resolve => {
  promiseResolve = resolve;
});

export default function HaxballJS(config?: HaxballJSConfig): Promise<typeof HBInit> {
  if (config?.webrtc) {
    //@ts-expect-error
    RTCPeerConnection = config.webrtc.RTCPeerConnection;
    //@ts-expect-error
    RTCIceCandidate = config.webrtc.RTCIceCandidate;
    //@ts-expect-error
    RTCSessionDescription = config.webrtc.RTCSessionDescription;
  }

  if (config?.debug !== undefined) {
    debug = config.debug;
  }

  if (config?.proxy) {
    proxyAgent = new HttpsProxyAgent(new URL(config.proxy));
  }

  return HBInitPromise;
};

const onHBLoaded = <T extends (...args: any[]) => any>(cb: T): T => {
  return cb;
};

/* Builded & Automated with Haxball.JS Nodeify Script */

//@ts-expect-error - for the basro's minified code
`;

	return header + source.trim().replace(/\s+/g, ' ');
}

async function writeOutputFile(outputPath: string, content: string) {
	const path = Bun.file(outputPath);
	await Bun.write(path, content);
}

export default nodeify;
