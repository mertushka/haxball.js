const HaxballJS = require("../src/index");

describe("HBInit Tests (Proxy)", function () {
  it("should create room", function (done) {
    this.timeout(20000);
    HaxballJS.then((HBInit) => {
      var room = HBInit({
        roomName: "Haxball.JS",
        maxPlayers: 16,
        public: true,
        noPlayer: true,
        debug: true,
        proxy: "http://1.1.1.1:2222", // Make sure update here before testing
        token: "thr1.AAAAAGcN88rkrUuIOwnP3w.iHPzi6bc0Ns", // Make sure update here before testing
      });

      room.onRoomLink = function () {
        done();
      };
    });
  });
});
