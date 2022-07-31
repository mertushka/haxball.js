const HaxballJS = require("../src/index");

describe("HBInit Tests", function () {
  it("should create room", function (done) {
    this.timeout(5000);
    HaxballJS.then((HBInit) => {
      try {
        var room = HBInit({
          roomName: "Haxball.JS",
          maxPlayers: 16,
          public: true,
          noPlayer: true,
          token: "thr1.AAAAAGLmYKJ3LdGsopf1Mw.BWMK36G23Ys", // Make sure update here before testing
        });
      } catch (error) {
        done(error);
      }

      room.onRoomLink = function () {
        done();
      };
    });
  });
  it("should give invalid token provided error", function (done) {
    this.timeout(5000);
    HaxballJS.then((HBInit) => {
      try {
        HBInit({
          roomName: "Haxball.JS",
          maxPlayers: 16,
          public: true,
          noPlayer: true,
        });
      } catch (error) {
        done();
      }
    });
  });
});
