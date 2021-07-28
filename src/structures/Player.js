class Player {
    constructor(client, player) {
        this.client = client;
        this.player = player;

        this._patch(player);
    }

    _patch(player) {
        this.player = player;
    }

    get id() {
        return this.player.id;
    }

    get name() {
        return this.player.name;
    }

    get team() {
        return this.player.team;
    }

    get admin() {
        return this.player.admin;
    }

    get position() {
        return this.player.position;
    }

    get auth() {
        return this.player.auth;
    }

    get conn() {
        return this.player.conn;
    }

    send(message) {
        return new Promise((resolve, reject) => {
            const promise = this.client.room.evaluate(`(() => { return room.sendChat("${message}", ${this.player.id})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setAdmin(admin) {
        return new Promise((resolve, reject) => {
            if (!admin) reject(new TypeError("Value must be Boolean."));

            const promise = this.client.room.evaluate(`(() => { return room.setPlayerAdmin(${this.player.id}, ${admin})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setTeam(team) {
        return new Promise((resolve, reject) => {
            if (isNaN(team)) reject(new TypeError("Value must be Integer."));

            const promise = this.client.room.evaluate(`(() => { return room.setPlayerTeam(${this.player.id}, ${team})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setAvatar(avatar) {
        return new Promise((resolve, reject) => {
            if (isNaN(avatar)) reject(new TypeError("Value must be Integer."));

            const promise = this.client.room.evaluate(`(() => { return room.setPlayerAvatar(${this.player.id}, ${avatar})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    setDiscProperties(properties) {
        return new Promise((resolve, reject) => {
            const promise = this.client.room.evaluate(`(() => { return room.setPlayerDiscProperties(${this.player.id}, ${properties})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    getDiscProperties() {
        return new Promise((resolve, reject) => {
            const promise = this.client.room.evaluate(`(() => { return room.getPlayerDiscProperties(${this.player.id})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }

    kick(reason, ban) {
        return new Promise((resolve, reject) => {
            if (!ban) reject(new TypeError("Value must be Boolean."));

            const promise = this.client.room.evaluate(`(() => { return room.kickPlayer(${this.player.id}, "${reason}", ${ban})})()`);

            promise.then((p) => resolve(p)).catch((error) => reject(new Error(error)));
        });
    }
}

module.exports = Player;
