const HaxballJS = require("../src/build");

describe("Build Tests", function () {
  it("should create room", function (done) {
    this.timeout(5000);
    HaxballJS.then((HBInit) => {
      var room = HBInit({
        roomName: "Haxball.JS",
        maxPlayers: 16,
        public: true,
        noPlayer: true,
        debug: true,
        token: "thr1.AAAAAGbJ6DKbFCpW73t1YQ.AcXcCi-Ak-w", // Make sure update here before testing
      });

      room.onRoomLink = function () {
        done();
      };
    });
  });
});
