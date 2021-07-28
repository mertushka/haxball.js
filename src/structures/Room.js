const EventEmitter = require("events");
const puppeteer = require("puppeteer");
const Player = require("./Player");
const { Collection } = require("@discordjs/collection");

class Room extends EventEmitter {
    constructor(config) {
        super();

        this.config = config;

        this.room = null;

        this.players = {
            cache: new Collection()
        };

        if (config.token === null) throw new Error("Token is required!");
    }

    _patch(player) {
        if (this.players.cache.has(player.id)) {
            this.players.cache.get(player.id)._patch(player);
        } else {
            this.players.cache.set(player.id, new Player(this, player));
        }
        return this.players.cache.get(player.id);
    }

    create() {
        if (this.room !== null) throw new Error("You already created a room!");

        puppeteer
            .launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox", "--single-process", "--no-zygote", "--disable-features=WebRtcHideLocalIpsWithMdns"] })
            .then((browser) => {
                browser
                    .newPage()
                    .then((page) => {
                        this.room = page;

                        page.on("error", (error) => {
                            this.emit("error", `Error happen at the page: ${error}`);
                        });

                        page.on("pageerror", (pageerror) => {
                            this.emit("error", `Page error: ${pageerror}`);
                        });

                        page.on("console", (log) => {
                            this.emit("console", log);
                        });
                    })
                    .then(() => this.room.goto("https://html5.haxball.com/headless", { waitUntil: "networkidle2" }))
                    .then(() =>
                        this.room.evaluate((config) => {
                            window.config = config;
                        }, this.config)
                    )
                    .then(() =>
                        this.room.exposeFunction("emit", (event, ...message) => {
                            for (let index = 0; index < message.length; index++) {
                                if (message[index].hasOwnProperty("admin")) {
                                    message[index] = this._patch(message[index]);
                                    if (event == "onPlayerLeave") this.players.cache.delete(message[index].id);
                                }
                            }

                            this.emit(event, ...message);
                        })
                    )
                    .then(() => this.room.addScriptTag({ path: `${__dirname}/../../src/util/room.js` }))
                    .catch((error) => this.emit("error", `Error while creating room: ${error}`));
            })
            .catch((error) => this.emit("error", `Error while creating browser: ${error}`));
    }

    send(message) {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate(`(() => { return room.sendChat("${message}")})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    clearBans() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.clearBans()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setScoreLimit(limit) {
        return new Promise((resolve, reject) => {
            if (isNaN(limit)) reject(new TypeError("Value must be integer."));

            const promise = this.room.evaluate(`(() => { return room.setScoreLimit(${limit})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setTimeLimit(limit) {
        return new Promise((resolve, reject) => {
            if (isNaN(limit)) reject(new TypeError("Value must be integer."));

            const promise = this.room.evaluate(`(() => { return room.setTimeLimit(${limit})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setCustomStadium(stadiumFileContents) {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate(`(() => { return room.setCustomStadium("${stadiumFileContents}")})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setDefaultStadium(stadiumName) {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate(`(() => { return room.setDefaultStadium("${stadiumName}")})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setTeamsLock(locked) {
        return new Promise((resolve, reject) => {
            if (!locked) reject(new TypeError("Value must be Boolean."));

            const promise = this.room.evaluate(`(() => { return room.setTeamsLock(${locked})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setTeamColors(team, angle, textColor, colors) {
        return new Promise((resolve, reject) => {
            if (isNaN(team) || isNaN(angle) || isNaN(textColor) || isNaN(colors)) reject(new TypeError("Values must be Integer."));

            const promise = this.room.evaluate(`(() => { return room.setTeamColors(${team}, ${angle}, ${textColor}, ${colors})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    startGame() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.startGame()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    stopGame() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.stopGame()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    pauseGame() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.pauseGame()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    getPlayer(playerID) {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate(`(() => { return room.getPlayer(${playerID})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    getPlayerList() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.getPlayerList()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    getScores() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.getScores()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    getBallPosition() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.getBallPosition()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    startRecording() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.startRecording()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    stopRecording() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.stopRecording()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setPassword(pass) {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate(`(() => { return room.setPassword("${pass}")})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setRequireRecaptcha(required) {
        return new Promise((resolve, reject) => {
            if (!required) reject(new TypeError("Value must be Boolean."));

            const promise = this.room.evaluate(`(() => { return room.setRequireRecaptcha(${required})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    reorderPlayers(playerIdList, moveToTop) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(playerIdList) || !moveToTop) reject(new TypeError("Values must be Array and Boolean."));

            const promise = this.room.evaluate(`(() => { return room.reorderPlayers(${playerIdList}, ${moveToTop})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    sendAnnouncement(msg, targetId, color, style, sound) {
        return new Promise((resolve, reject) => {
            if (msg === null) reject(new TypeError("Message can't be null."));

            const promise = this.room.evaluate(`(() => { return room.sendAnnouncement("${msg}", ${targetId || null}, ${color || null}, ${style || null}, ${sound || null})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setKickRateLimit(min, rate, burst) {
        return new Promise((resolve, reject) => {
            if (isNaN(min) || isNaN(rate) || isNaN(burst)) reject(new TypeError("Values must be Integer."));

            const promise = this.room.evaluate(`(() => { return room.setKickRateLimit(${min}, ${rate}, ${burst})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setDiscProperties(discIndex, properties) {
        return new Promise((resolve, reject) => {
            if (isNaN(discIndex) || !properties.hasOwnProperty("x") || !properties.hasOwnProperty("y")) reject(new TypeError("Values must be Integer and Object."));

            const promise = this.room.evaluate(`(() => { return room.setDiscProperties(${discIndex}, ${properties})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    getDiscProperties(discIndex) {
        return new Promise((resolve, reject) => {
            if (isNaN(discIndex)) reject(new TypeError("Value must be Integer."));

            const promise = this.room.evaluate(`(() => { return room.getDiscProperties(${discIndex})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    getDiscCount() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.getDiscCount()})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    get CollisionFlags() {
        return new Promise((resolve, reject) => {
            const promise = this.room.evaluate("(() => { return room.CollisionFlags})()");

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }
}

module.exports = Room;
