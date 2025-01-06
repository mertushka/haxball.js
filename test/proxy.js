const HaxballJS = require("../src/build");

describe("HBInit Tests (Proxy)", function () {
  it("should create room", function (done) {
    this.timeout(30000);
    HaxballJS.then((HBInit) => {
      var room = HBInit({
        roomName: "Haxball.JS",
        maxPlayers: 16,
        public: true,
        noPlayer: true,
        debug: true,
        proxy: "http://1.1.1.1:2222", // Make sure update here before testing: http://ip:port
        token: "thr1.AAAAAGd76PXhIn2FWsZH6g.si4rjSAnmF4", // Make sure update here before testing
      });

      room.onRoomLink = function () {
        done();
      };
    });
  });
});
