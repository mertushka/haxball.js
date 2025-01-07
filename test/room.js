function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const TOKEN = "thr1.AAAAAGd82uXE_qA2Ongrnw.6AWO8_UYHKA"; // Make sure update here before testing
const PROXY = "http://1.1.1.1:2222"; // (Optional) http://ip:port

describe("HBInit Tests", function () {
  this.timeout(10000);

  beforeEach(async function () {
    await delay(2000);
  });

  it("should create room", function (done) {
    this.timeout(30000);
    requireUncached("../src/build").then((HBInit) => {
      var room = HBInit({
        roomName: "Haxball.JS",
        maxPlayers: 16,
        public: false,
        noPlayer: true,
        debug: true,
        token: TOKEN,
      });

      room.onRoomLink = function () {
        done();
      };
    });
  });

  // Optional proxy test
  (process.env.TEST_PROXY ? it : it.skip)(
    "should create room (proxy)",
    function (done) {
      this.timeout(30000);
      requireUncached("../src/build").then((HBInit) => {
        var room = HBInit({
          roomName: "Haxball.JS",
          maxPlayers: 16,
          public: false,
          noPlayer: true,
          debug: true,
          proxy: PROXY,
          token: TOKEN,
        });

        room.onRoomLink = function () {
          done();
        };
      });
    }
  );
});
