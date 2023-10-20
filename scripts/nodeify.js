const fs = require("fs");

fetch("https://www.haxball.com/cache_hash.json")
  .then((body) => body.text())
  .then(async (data) => {
    const hash = data.replaceAll('"', "");

    let source = await (
      await fetch(
        `https://www.haxball.com/${hash}/__cache_static__/g/headless-min.js`
      )
    ).text();

    const target = fs.createWriteStream("./src/build.js");

    // Remove <Window> references
    source = source.replaceAll("window.", "");
    source = source.replaceAll("parent.", "");
    source = source.replaceAll("document.", "");
    source = source.replaceAll(".innerHTML", "");

    source = source.replaceAll('getElementById("roomlink")', "null");
    source = source.replaceAll('getElementById("recaptcha")', "null");

    source = source.replaceAll(
      '"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this',
      "global"
    );

    // Fix HBInit Callback (Regex)
    const HBInitRegex = /HBInit=.+?;/; // Match the pattern "HBInit=...;"
    const HBInitMatch = source.match(HBInitRegex)[0];

    if (HBInitMatch) {
      const value = HBInitMatch.substring(7, HBInitMatch.length - 1); // Remove "HBInit=" and the trailing ";"
      const updatedValue = `promiseResolve(${value});`;

      source = source.replace(HBInitMatch, updatedValue);
    } else {
      throw new Error("No HBInit matches found!");
    }

    // Fix Websocket (Regex)

    const WebsocketRegex = /new WebSocket\([^)]+\);/; // Match the pattern "new WebSocket(f+"?token="+e);"
    const WebsocketMatch = source.match(WebsocketRegex)[0];

    if (WebsocketMatch) {
      const updatedValue = WebsocketMatch.replace(
        /new WebSocket\(([^)]+)\);/,
        'new WebSocket($1, {headers:{origin: "https://html5.haxball.com"}, agent: proxyAgent});'
      );

      source = source.replace(WebsocketMatch, updatedValue);
    } else {
      throw new Error("No Websocket matches found!");
    }

    // Remove recaptcha (Regex)

    const RecaptchaRegex = /case "recaptcha":([a-zA-Z]+)\(([^)]+)\)/; // Match the pattern 'case "recaptcha":b(e)' method b and string e is random.
    const RecaptchaMatch = source.match(RecaptchaRegex)[0];

    if (RecaptchaMatch) {
      const updatedValue = RecaptchaMatch.replace(
        /case "recaptcha":([a-zA-Z]+)\(([^)]+)\)/,
        'case "recaptcha":console.log(new Error("Invalid Token Provided!"))'
      );

      source = source.replace(RecaptchaMatch, updatedValue);
    } else {
      throw new Error("No Recaptcha matches found!");
    }

    // Add proxy support & other things manually because too hard to string manipulate with minified code
    // Also these things are not included in Headless Host Source originally so you can create ur own build without these things
    /* 

    RoomConfigLookup: This is a example name for mimic minified function. 
    
    Example getting minified function: source.match(/(\w+)\("noPlayer",/)[1] -> this regex gets minified function's name from code
    k("noPlayer", !1) -> in this example regex gets function's name as "k"
    
    proxyAgent = RoomConfigLookup("proxy", null)
    ? new HttpsProxyAgent(url.parse(RoomConfigLookup("proxy", null)))
    : null;
    debug = RoomConfigLookup("debug", null) == true;
    
    */
    // Websocket On Error Debug -> debug && console.error(e);

    // Modules
    target.write(`const wrtc = require("@koush/wrtc");
const XMLHttpRequest = require('xhr2');
const WebSocket = require("ws");
const url = require("url");
const HttpsProxyAgent = require("https-proxy-agent");
const JSON5 = require("json5");
const pako = require("pako");
const { Crypto } = require("@peculiar/webcrypto");
const { performance } = require("perf_hooks");

const {RTCPeerConnection,
RTCIceCandidate,
RTCSessionDescription} = wrtc

const crypto = new Crypto();

var promiseResolve;
var proxyAgent;
var debug = false;

const HBLoaded = new Promise(function (resolve, reject) {
  promiseResolve = resolve;
});

const onHBLoaded = function (cb) {
  return cb;
};

/*
 Builded & Automated with Haxball.JS Nodeify Script
*/

`);

    // Update Source
    target.write(source);

    // Export HBInit Promise
    target.write(`
module.exports = HBLoaded;`);
  });

console.log("Done!");
