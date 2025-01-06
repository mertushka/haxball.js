const HaxballJS = require("../src/build");

describe("HBInit Tests", function () {
  it("should create room", function (done) {
    this.timeout(5000);
    HaxballJS.then((HBInit) => {
      var room = HBInit({
        roomName: "Haxball.JS",
        maxPlayers: 16,
        public: true,
        noPlayer: true,
        debug: true,
        token: "thr1.AAAAAGd6n3RGOJJKWU7ysA.1bO4Vuys4CM", // Make sure update here before testing
      });

      room.onRoomLink = function () {
        done();
      };
    });
  });
});
