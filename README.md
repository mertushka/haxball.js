[![NPM Version](https://img.shields.io/npm/v/haxball.js.svg?style=flat-square)](https://www.npmjs.com/package/haxball.js) [![NPM Monthly Downloads](https://img.shields.io/npm/dm/haxball.js.svg?style=flat-square)](https://npmjs.org/package/haxball.js)

[![License](https://img.shields.io/github/license/mertushka/haxball.js?style=flat-square)](LICENSE.md) [![Last Commit](https://img.shields.io/github/last-commit/mertushka/haxball.js?style=flat-square)](https://github.com/mertushka/haxball.js/commits/) ![Language Most Used](https://img.shields.io/github/languages/top/mertushka/haxball.js?style=flat-square) [![Implementations](https://img.shields.io/badge/%F0%9F%92%A1-implementations-8C8E93.svg?style=flat-square)](https://github.com/mertushka/haxball.js/issues) ![Repository Size](https://img.shields.io/github/repo-size/mertushka/haxball.js?style=flat-square)

[![Forks](https://img.shields.io/github/forks/mertushka/haxball.js?style=social)](https://github.com/mertushka/haxball.js/network/members) [![Stars](https://img.shields.io/github/stars/mertushka/haxball.js?style=social)](https://github.com/mertushka/haxball.js/stargazers) [![Watches](https://img.shields.io/github/watchers/mertushka/haxball.js?style=social)](https://github.com/mertushka/haxball.js/watchers)

<h1 id="title" align="center">haxball.js</h1>

<h4 align="center">haxball.js is a powerful Node.js module that allows you to easily interact with the Haxball Headless API.</h4>

### 🔖 Table Of Contents

- 🤔 [How To Use](#how-to-use)
- 🚀 [Technologies](#technologies)
- 🌱 [Minimal Requirements](#minimal-requirements)
- 🎊 [Features](#features)
- 💡 [How To Contribute](#how-to-contribute)
- 🔏 [License](#license)

---

<h2 id="how-to-use">🤔 How To Use</h2>

#### 💻 Installing

```sh
npm install haxball.js
```

#### CommonJS Module Usage Example

```js
const HaxballJS = require('haxball.js').default;
```

#### ESM Module Usage Example

```js
import HaxballJS from 'haxball.js';
```

#### Module Usage Example

```js
import HaxballJS from 'haxball.js';

HaxballJS().then((HBInit) => {
	// Same as in Haxball Headless Host Documentation
	const room = HBInit({
		roomName: 'Haxball.JS',
		maxPlayers: 16,
		public: true,
		noPlayer: true,
		token: 'YOUR_TOKEN_HERE', // Required
	});

	room.setDefaultStadium('Big');
	room.setScoreLimit(5);
	room.setTimeLimit(0);

	room.onRoomLink = function (link) {
		console.log(link);
	};

	// If there are no admins left in the room give admin to one of the remaining players.
	function updateAdmins() {
		// Get all players
		var players = room.getPlayerList();
		if (players.length == 0) return; // No players left, do nothing.
		if (players.find((player) => player.admin) != null) return; // There's an admin left so do nothing.
		room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
	}

	room.onPlayerJoin = function (player) {
		updateAdmins();
	};

	room.onPlayerLeave = function (player) {
		updateAdmins();
	};
});
```

#### (Optional) Custom WebRTC Library

Haxball.JS uses `node-datachannel` as the default WebRTC library. However, you can use a custom WebRTC implementation by specifying it in the HaxballJS config using the `webrtc` option.

Example:

```js
const HaxballJS = require('haxball.js');
const WebRTC = require('webrtc');

HaxballJS({ webrtc: WebRTC }).then((HBInit) => {...});
```

#### (Optional) Proxy

Haxball has a limit of 2 rooms per IP. Therefore, you can use proxy with adding `proxy: "http://<YOUR_PROXY_IP>"` in your HaxballJS config.

Example:

```js
HaxballJS({ proxy: "http://1.1.1.1:80", }).then((HBInit) => {...});

```

#### 💻 Bun

It's highly experimental and risky to use it in a production environment, but `haxball.js` is compatible with [Bun.JS](https://bun.sh/).

```bash
bun install haxball.js
bun pm trust node-datachannel
bun index.ts
```

---

<h2 id="technologies">🚀 Technologies</h2>

- node-datachannel - WebRTC implementation for Node.JS
- ws - Websocket Connection
- json5 - JSON Helper Module
- @peculiar/webcrypto - WebCrypto implementation for Node.JS
- pako - ZLIB port for Node.JS
- xhr2 - W3C XMLHttpRequest implementation for Node.JS
- https-proxy-agent - Websocket Proxy Support
- @types/haxball-headless-browser - Type definitions

[Back To The Top](#title)

---

<h2 id="minimal-requirements">🌱 Minimal Requirements</h2>

- NPM
- NodeJS Version >=18

[Back To The Top](#title)

---

<h2 id="features">🎊 Features</h2>

- [x] Performant
- [x] Strongly Typed

[Back To The Top](#title)

---

<h2 id="how-to-contribute">💡 How To Contribute</h2>

Please check [CONTRIBUTING.md](/CONTRIBUTING.md)

<p align="center">
<i>Contributions, issues and features requests are welcome!</i><br />
<i>📮 Submit PRs to help solve issues or add features</i><br />
<i>🐛 Find and report issues</i><br />
<i>🌟 Star the project</i><br />
</p>

[Back To The Top](#title)

---

<h2 id="license">🔏 License</h2>

Copyright © This project is licensed by [MIT License](https://api.github.com/licenses/mit).

[Back To The Top](#title)
