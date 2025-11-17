const fs = require('fs').promises;
const path = require('path');

async function nodeify() {
  try {
    // Fetch cache hash
    const hashResponse = await fetch('https://www.haxball.com/cache_hash.json');
    if (!hashResponse.ok)
      throw new Error(`Failed to fetch hash: ${hashResponse.status}`);
    let hash = (await hashResponse.text()).replaceAll('"', '');

    // Fetch source
    const sourceUrl = `https://www.haxball.com/${hash}/__cache_static__/g/headless-min.js`;
    const sourceResponse = await fetch(sourceUrl);
    if (!sourceResponse.ok)
      throw new Error(`Failed to fetch source: ${sourceResponse.status}`);
    let source = await sourceResponse.text();

    // Extract hash from source header comment
    const hashMatch = source.match(/\/\*[\s\S]*?(\b[a-f0-9]{8}\b)/);
    hash = hashMatch?.[1];

    // Process source code
    source = processSource(source);

    // Write output
    const outputPath = path.join(__dirname, '../src/build.js');
    await writeOutputFile(outputPath, source);

    console.log(`SUCCESS:${hash}`); // Special format for GitHub Actions
    return hash;
  } catch (error) {
    console.error(`ERROR:${error.message}`);
    process.exit(1);
  }
}

function processSource(source) {
  // Remove window references
  source = removeWindowReferences(source);

  // Apply regex replacements
  source = applyRegexReplacements(source);

  // Add proxy support
  source = addProxySupport(source);

  // Wrap with module code
  return wrapWithModuleCode(source);
}

function removeWindowReferences(source) {
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

function applyRegexReplacements(source) {
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

function addProxySupport(source) {
  // Find the initialization pattern with more flexible matching
  const initPattern =
    /if\s*\([A-Za-z]+\.[A-Za-z]+\)\s*throw\s+[A-Za-z]+\.[A-Za-z]+\s*\(\s*"Can't init twice"\s*\)\s*;\s*[A-Za-z]+\.[A-Za-z]+\s*=\s*!0\s*;/;
  const initMatch = source.match(initPattern);

  if (!initMatch) {
    throw new Error('Could not find initialization pattern for proxy support');
  }

  // Get the RoomConfigLookup function name
  const configLookupMatch = source.match(/(\w+)\("noPlayer",/);
  if (!configLookupMatch) {
    throw new Error('Could not find RoomConfigLookup function');
  }
  const configFn = configLookupMatch[1];

  // Add proxy support code after initialization
  const proxyCode = `${initMatch[0].slice(
    0,
    -3
  )}!0;proxyAgent = ${configFn}("proxy", null) ? new HttpsProxyAgent(url.parse(${configFn}("proxy", null))) : null; debug = ${configFn}("debug", null) == true;`;

  // Replace the entire initialization block
  source = source.replace(initMatch[0], proxyCode);

  return source;
}

function wrapWithModuleCode(source) {
  const header = `const WebSocket = require("ws");
const XMLHttpRequest = require("xhr2");
const JSON5 = require("json5");
const url = require("url");
const pako = require("pako");
const { HttpsProxyAgent } = require("https-proxy-agent");
const { Crypto } = require("@peculiar/webcrypto");
const { performance } = require("perf_hooks");
const crypto = new Crypto();

let { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription } = require("@mertushka/node-datachannel/polyfill");

var promiseResolve;
var proxyAgent;
var debug = false;

const HBInit = new Promise(function (resolve, reject) {
  promiseResolve = resolve;
});

const HBLoaded = (config) => {
  if(config?.webrtc) {
    RTCPeerConnection = config.webrtc.RTCPeerConnection;
    RTCIceCandidate = config.webrtc.RTCIceCandidate;
    RTCSessionDescription = config.webrtc.RTCSessionDescription;
  }
  return HBInit;
}

const onHBLoaded = function (cb) {
  return cb;
};

/* Builded & Automated with Haxball.JS Nodeify Script */

`;

  const footer = `\nmodule.exports = HBLoaded;`;

  return header + source + footer;
}

async function writeOutputFile(outputPath, content) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, content, 'utf8');
}

nodeify();
