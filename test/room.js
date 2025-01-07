function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("HBInit Tests", function () {
  this.timeout(10000);

  beforeEach(async function () {
    await delay(5000);
  });

  (process.env.CI_HB_HEADLESS_TOKEN || process.env.TEST_HB_HEADLESS_TOKEN
    ? it
    : it.skip)("should create room", function (done) {
    this.timeout(30000);
    requireUncached("../src/build").then((HBInit) => {
      let room = HBInit({
        roomName: "Haxball.JS",
        maxPlayers: 16,
        public: false,
        noPlayer: true,
        debug: true,
        token:
          process.env.CI_HB_HEADLESS_TOKEN ||
          process.env.TEST_HB_HEADLESS_TOKEN, // Fallback for local testing
      });

      room.onRoomLink = function () {
        done();
      };
    });
  });

  // Optional proxy test
  (process.env.CI_HB_PROXY || process.env.TEST_HB_PROXY ? it : it.skip)(
    "should create room (proxy)",
    function (done) {
      this.timeout(30000);

      if (process.env.CI_HB_PROXY == "1") return done(); // Skip since testing proxy on GitHub Actions is not practical, test this locally instead

      requireUncached("../src/build").then((HBInit) => {
        let room = HBInit({
          roomName: "Haxball.JS",
          maxPlayers: 16,
          public: false,
          noPlayer: true,
          debug: true,
          proxy: process.env.CI_HB_PROXY || process.env.TEST_HB_PROXY, // Fallback for local testing
          token:
            process.env.CI_HB_HEADLESS_TOKEN ||
            process.env.TEST_HB_HEADLESS_TOKEN, // Fallback for local testing
        });

        room.onRoomLink = function () {
          done();
        };
      });
    }
  );
});
