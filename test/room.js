const HaxballJS = require("../src/build");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("HBInit Tests", function () {
  this.timeout(10000);

  beforeEach(async function () {
    await delay(2000); // Add a 2-second delay before each test
  });

  it("should create room", function (done) {
    this.timeout(30000);
    HaxballJS.then((HBInit) => {
      var room = HBInit({
        roomName: "Haxball.JS",
        maxPlayers: 16,
        public: false,
        noPlayer: true,
        debug: true,
        token: "thr1.AAAAAGd76PXhIn2FWsZH6g.si4rjSAnmF4", // Make sure update here before testing
      });

      room.onRoomLink = function () {
        done();
      };
    });
  });

  it("should create room (proxy)", function (done) {
    this.timeout(30000);
    HaxballJS.then((HBInit) => {
      var room = HBInit({
        roomName: "Haxball.JS",
        maxPlayers: 16,
        public: false,
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
