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
- 🤗 [Contributors](#contributors)
- 👤 [Author](#author)
- 🔏 [License](#license)

---

<h2 id="how-to-use">🤔 How To Use</h2>

#### 💻 Installing

```sh
npm install haxball.js
```

#### Module Usage Example

```js
const HaxballJS = require("haxball.js");

HaxballJS.then((HBInit) => {
  // Same as in Haxball Headless Host Documentation
  const room = HBInit({
    roomName: "Haxball.JS",
    maxPlayers: 16,
    public: true,
    noPlayer: true,
    token: "YOUR_TOKEN_HERE", // Required
  });

  room.setDefaultStadium("Big");
  room.setScoreLimit(5);
  room.setTimeLimit(0);

  room.onRoomLink = function (link) {
    console.log(link);
  };
});
```

#### (Optional) Proxy

Haxball has a limit of 2 rooms per IP. Therefore, you can use proxy with adding `proxy: "http://<YOUR_PROXY_IP>"` in your `RoomConfig`.

Example:

```js
HBInit({
    ...
    proxy: "http://1.1.1.1:80",
});
```

### 💻 TypeScript

#### TypeScript Example

```js
import HaxballJS from "haxball.js";

HaxballJS.then((HBInit) => {
  // Same as in Haxball Headless Host Documentation
  const room = HBInit({
    roomName: "Haxball.JS",
    maxPlayers: 16,
    public: true,
    noPlayer: true,
    token: "YOUR_TOKEN_HERE", // Required
  });

  room.setDefaultStadium("Big");
  room.setScoreLimit(5);
  room.setTimeLimit(0);

  room.onRoomLink = function (link) {
    console.log(link);
  };
});
```

#### 💻 (Optional, Highly Experimental!) Bun

It's highly experimental and risky to use it in a production environment, but `haxball.js` is compatible with [Bun.JS](https://bun.sh/).

```bash
bun install haxball.js
bun index.ts
```

---

<h2 id="technologies">🚀 Technologies</h2>

- node-datachannel - WebRTC implementation for Node.JS
- ws - Websocket Connection
- json5 - JSON Helper Module
- @peculiar/webcrypto - WebCrypto implementation for Node.JS
- pako - ZLIB port for NodeJS
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

- [x] Promise based
- [x] Synchronous
- [x] Performant
- [x] Strongly Typed

[Back To The Top](#title)

---

<h2 id="how-to-contribute">💡 How To Contribute</h2>

- Make a fork of this repository
- Clone to you machine and entry on respective paste
- Create a branch with your resource: `git checkout -b my-feature`
- Commit your changes: `git commit -m 'feat: My new feature'`
- Push your branch: `git push origin my-feature`
- A green button will appear at the beginning of this repository
- Click to open and fill in the pull request information

<p align="center">
<i>Contributions, issues and features requests are welcome!</i><br />
<i>📮 Submit PRs to help solve issues or add features</i><br />
<i>🐛 Find and report issues</i><br />
<i>🌟 Star the project</i><br />
</p>

[Back To The Top](#title)

---

<h2 id="contributors">🤗 Contributors</h2>

<p>

<a href="https://github.com/mertushka"><img width="60" src="https://avatars1.githubusercontent.com/u/34413473?v=4"/>
<a href="https://github.com/jakjus"><img width="60" src="https://avatars.githubusercontent.com/u/43467994?v=4"/>

</p>

[Back To The Top](#title)

---

<h2 id="license">🔏 License</h2>

Copyright © 2023 mertushka & basro

This project is licensed by [MIT License](https://api.github.com/licenses/mit).

[Back To The Top](#title)
