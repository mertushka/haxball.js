const wrtc = require("@koush/wrtc");
const fetch = require("node-fetch");
const WebSocket = require("ws");
const url = require("url");
const HttpsProxyAgent = require("https-proxy-agent");
const JSON5 = require("json5");
const pako = require("pako");
const { Crypto } = require("@peculiar/webcrypto");
const { performance } = require("perf_hooks");
const crypto = new Crypto();

const proxy = process.env.PROXY
let proxyAgent;
if (proxy) {
    if (!proxy.startsWith("http")) {
        proxy = "http://"+proxy
    }
    console.log(`Using proxy: ${proxy}`)
    proxyAgent = new HttpsProxyAgent(url.parse(proxy));
}

const headless = new Promise((resolve) => {
  (function (cb) {
    function Ra() {}
    function k() {}
    function l(a) {
      this.Db = a;
      Error.captureStackTrace && Error.captureStackTrace(this, l);
    }
    function w() {
      this.Dc = 0;
      this.m = 32;
      this.c = 63;
      this.i = 1;
      this.a = new x(0, 0);
    }
    function z() {
      this.bd = this.cd = this.X = null;
      this.Ce = 0;
      this.J = this.F = this.Yb = null;
      this.tb = 0;
      this.i = 1;
      this.c = 63;
      this.m = 32;
      this.Ha = 1 / 0;
      this.ua = !0;
      this.S = 0;
    }
    function B() {
      this.m = 32;
      this.c = 63;
      this.i = 1;
      this.la = 0;
      this.X = new x(0, 0);
    }
    function za() {
      this.w = [];
    }
    function ka() {
      this.S = 0;
      this.hc = 1 / 0;
      this.Ja = this.Ua = 100;
      this.Ac = this.Bc = 0;
    }
    function la() {
      this.cf = 0;
      this.c = this.m = 63;
      this.S = 16777215;
      this.ga = 0.99;
      this.K = 1;
      this.i = 0.5;
      this.L = 10;
      this.ma = new x(0, 0);
      this.s = new x(0, 0);
      this.a = new x(0, 0);
    }
    function N() {
      this.D = 0;
    }
    function Y() {
      this.D = 0;
    }
    function Z() {
      this.D = 0;
    }
    function O() {
      this.D = 0;
    }
    function E() {
      this.D = 0;
    }
    function P() {
      this.D = 0;
    }
    function I() {
      this.gd = !1;
      this.D = 0;
    }
    function Sa() {}
    function ma() {
      this.D = 0;
    }
    function na() {
      this.D = 0;
    }
    function aa() {
      this.D = 0;
    }
    function ba() {
      this.D = 0;
    }
    function Q() {
      this.D = 0;
    }
    function R() {
      this.D = 0;
    }
    function ca() {
      this.D = 0;
    }
    function da() {
      this.D = 0;
    }
    function K() {
      this.D = 0;
    }
    function S() {
      this.D = 0;
    }
    function oa() {
      this.D = 0;
    }
    function T() {
      this.D = 0;
    }
    function L() {
      this.D = 0;
    }
    function pa() {
      this.D = 0;
    }
    function U() {
      this.D = 0;
    }
    function qa() {
      this.D = 0;
    }
    function ra() {
      this.ja = p.oa;
      this.N = null;
      this.Sb = this.kc = 0;
      this.yb = !1;
      this.Hb = this.na = 0;
      this.pa = "Player";
      this.ki = this.Tc = 0;
      this.ae = null;
      this.ce = !1;
      this.zb = this.If = null;
      this.Ab = 0;
      this.Rb = !1;
    }
    function Aa() {
      this.fa = null;
      this.Qc = 2;
      this.Zb = 0;
      this.Dd = 1;
      this.$a = this.Ma = 3;
      this.Sd = !1;
      this.C = null;
      this.ca = [];
      this.Ld = "";
      this.fa = n.wd()[0];
      this.jc = [null, new W(), new W()];
      this.jc[1].Pa.push(p.ka.S);
      this.jc[2].Pa.push(p.wa.S);
    }
    function p(a, b, c, d, e, f, h, m) {
      this.Sc = null;
      this.R = a;
      this.S = b;
      this.Ee = c;
      this.Vg = d;
      this.pa = e;
      this.m = m;
      this.Vh = new W();
      this.Vh.Pa.push(b);
    }
    function W() {
      this.Td = 16777215;
      this.Pa = [];
    }
    function n() {
      this.u = [];
      this.I = [];
      this.Y = [];
      this.Ra = [];
      this.w = [];
      this.Sa = [];
      this.Nb = [];
      this.Gb = [];
      this.bc = new Ba();
      this.vd = 255;
      this.rd = this.Ed = 0;
      this.sd = !0;
      this.Xc = !1;
    }
    function Ga() {}
    function Ba() {
      this.Gc = 0;
      this.L = 15;
      this.m = 0;
      this.ma = new x(0, 0);
      this.K = this.i = 0.5;
      this.ga = 0.96;
      this.oc = 0.1;
      this.Hc = 0.07;
      this.Ic = 0.96;
      this.Fc = 5;
    }
    function sa() {
      this.ic = p.oa;
      this.J = new x(0, 0);
      this.F = new x(0, 0);
    }
    function J() {
      this.Mb = this.Fb = this.Jb = this.Wa = 0;
      this.Bd = p.ka;
      this.xb = this.Za = 0;
      this.ia = new za();
      this.Ma = 0;
      this.$a = 5;
      this.fa = null;
    }
    function X() {
      this.c = this.m = 63;
      this.S = 16777215;
      this.ga = 0.99;
      this.K = 1;
      this.i = 0.5;
      this.L = 10;
      this.ma = new x(0, 0);
      this.s = new x(0, 0);
      this.a = new x(0, 0);
    }
    function Ha() {}
    function y() {}
    function ta() {}
    function M() {
      this.gb = "";
      this.Kc = this.Mc = 0;
    }
    function Ca(a, b) {
      this.ze = a;
      this.Df = b;
      this.sb = a;
      this.Jc = performance.now();
    }
    function Da() {}
    function Ia() {}
    function Ea() {}
    function ua() {}
    function F() {}
    function x(a, b) {
      this.x = a;
      this.y = b;
    }
    function Ta() {}
    function Ja(a) {
      this.ve = new Map();
      this.Fg = new Ca(100, 16);
      this.Wc = !1;
      this.Tc = 0;
      this.ac = a;
      a = r.ba(8);
      a.g(Math.random());
      this.Xb = a.nb();
    }
    function Fa(a) {
      this.qc = new Map();
      this.jb = null;
      this.Pc = 32;
      this.ub = new Map();
      this.Ga = [];
      this.pf = 4;
      this.mg = 600;
      var b = this;
      ea.call(this, a.state);
      this.ih = a.oi;
      this.di = a.version;
      this.jh = 1;
      this.Pe = 0;
      this.yf = performance.now();
      this.Va = new fa(this.ih, a.iceServers, Ta.ii, a.ti);
      this.Va.Be = Ua(this, this.Jg);
      this.Va.Xe = function (a) {
        b.nh(a);
      };
      this.Va.Rc = function (a) {
        ua.va(b.Rc, a);
      };
      this.Va.$b = function (a, d) {
        null != b.$b && b.$b(a, d);
      };
    }
    function ea(a) {
      this.ed = this.Qa = 0;
      this.Md = new Ka();
      this.vg = 0;
      this.re = 0.06;
      va.call(this, a);
    }
    function ga() {}
    function La(a, b) {
      this.Qf = 0;
      this.version = 1;
      this.ld = 0;
      this.Cb = r.ba(1e3);
      this.nc = r.ba(16384);
      var c = this;
      this.version = b;
      var d = (this.ld = a.ea);
      this.fe = a;
      a.Fa.G(this.nc);
      a.wb = function (b) {
        var e = a.ea;
        c.nc.Da(e - d);
        d = e;
        c.nc.Na(b.A);
        g.ke(b, c.nc);
      };
      this.Cb.Na(0);
      var e = this.ld;
      a.Fa.uf(function (b) {
        var d = a.ea;
        c.Cb.Da(d - e);
        c.Cb.f(b);
        c.Qf++;
        e = d;
      });
    }
    function Ma() {}
    function ha() {
      this.D = 0;
    }
    function va(a) {
      this.ea = 0;
      this.Fa = a;
    }
    function Ka() {
      this.list = [];
    }
    function g() {
      this.D = 0;
    }
    function Va() {}
    function Wa() {}
    function ia() {}
    function V() {}
    function r(a, b) {
      null == b && (b = !1);
      this.j = a;
      this.sa = b;
      this.a = 0;
    }
    function C(a, b) {
      null == b && (b = !1);
      this.j = a;
      this.sa = b;
      this.a = 0;
    }
    function Na(a) {
      this.fb = null;
      this.Dh = 1e4;
      this.Ec = !0;
      var b = this;
      a.Ae();
      this.ra = a.ra;
      this.hb = a.hb;
      this.Ob = a.Ob;
      this.fb = a.fb;
      this.Bf = performance.now();
      var c = null,
        c = function () {
          var a = b.Dh - b.Xh();
          0 >= a
            ? b.bb()
            : (clearTimeout(b.Cf), (a = setTimeout(c, a + 1e3)), (b.Cf = a));
        };
      c();
      this.ra.oniceconnectionstatechange = function () {
        var a = b.ra.iceConnectionState;
        ("closed" != a && "failed" != a) || b.bb();
      };
      a = 0;
      for (var d = this.hb; a < d.length; ) {
        var e = d[a];
        ++a;
        e.onmessage = function (a) {
          b.Ec && ((b.Bf = performance.now()), null != b.$e && b.$e(a.data));
        };
        e.onclose = function () {
          b.bb();
        };
      }
    }
    function Xa() {}
    function fa(a, b, c, d) {
      this.pc = new Set();
      this.Vb = new Set();
      this.Yc = this.dc = this.sf = !1;
      this.Ya = null;
      this.R = "";
      this.Gh = 5e4;
      this.Fh = 1e4;
      this.vb = new Map();
      this.Rh = a;
      this.Ad = b;
      this.kg = c;
      this.$c = d;
      null == this.$c && (this.$c = "");
      this.Rd();
    }
    function wa(a, b, c) {
      this.fb = this.Ud = null;
      this.Ob = [];
      this.De = 0;
      this.af = !1;
      this.zd = [];
      this.hb = [];
      var d = this;
      this.ra = new wrtc.RTCPeerConnection(
        {
          iceServers: b,
        },
        wa.qg
      );
      this.Le = new Promise(function (a) {
        d.Qg = a;
      });
      this.ra.onicecandidate = function (a) {
        null == a.candidate
          ? d.Qg(d.zd)
          : ((a = a.candidate),
            null != a.candidate &&
              "" != a.candidate &&
              (null != d.Hd && d.Hd(a), d.zd.push(a)));
      };
      for (b = 0; b < c.length; ) this.sg(c[b++]);
      this.R = a;
    }
    function H() {}
    function Ya() {}
    function ja() {}
    function Za() {}
    function G() {}
    function bb() {
      return k.Ub(this, "");
    }
    function v(a, b) {
      var c = Object.create(a),
        d;
      for (d in b) c[d] = b[d];
      b.toString !== Object.prototype.toString && (c.toString = b.toString);
      return c;
    }
    function Ua(a, b) {
      if (null == b) return null;
      null == b.od && (b.od = db++);
      var c;
      null == a.de ? (a.de = {}) : (c = a.de[b.od]);
      null == c && ((c = b.bind(a)), (a.de[b.od] = c));
      return c;
    }
    var Oa = Oa || {},
      $a;
    G.b = !0;
    G.Jf = function (a, b) {
      var c = a.charCodeAt(b);
      if (c == c) return c;
    };
    G.substr = function (a, b, c) {
      if (null == c) c = a.length;
      else if (0 > c)
        if (0 == b) c = a.length + c;
        else return "";
      return a.substr(b, c);
    };
    G.remove = function (a, b) {
      var c = a.indexOf(b);
      if (-1 == c) return !1;
      a.splice(c, 1);
      return !0;
    };
    Math.b = !0;
    Za.b = !0;
    Za.ji = function (a) {
      var b = [];
      if (null != a) {
        var c = Object.prototype.hasOwnProperty,
          d;
        for (d in a)
          "__id__" != d && "hx__closures__" != d && c.call(a, d) && b.push(d);
      }
      return b;
    };
    ja.b = !0;
    ja.pe = function (a) {
      return k.Ub(a, "");
    };
    ja.parseInt = function (a) {
      a = parseInt(
        a,
        !a || "0" != a[0] || ("x" != a[1] && "X" != a[1]) ? 10 : 16
      );
      return isNaN(a) ? null : a;
    };
    Ya.b = !0;
    Ya.li = function (a) {
      for (
        var b = "";
        (b = "0123456789ABCDEF".charAt(a & 15) + b), (a >>>= 4), 0 < a;

      );
      for (; 2 > b.length; ) b = "0" + b;
      return b;
    };
    H.b = !0;
    H.pb = function (a, b) {
      return a.length <= b ? a : G.substr(a, 0, b);
    };
    H.hi = function (a) {
      for (var b = "", c = 0, d = a.byteLength; c < d; ) b += Ya.li(a[c++]);
      return b;
    };
    wa.b = !0;
    wa.prototype = {
      Uh: function (a) {
        null == a && (a = 1e4);
        clearTimeout(this.Ud);
        this.Ud = setTimeout(Ua(this, this.Pg), a);
      },
      rg: function (a, b) {
        var c = this;
        this.wg(
          this.ra.setRemoteDescription(a).then(function () {
            return c.ra.createAnswer();
          }),
          b,
          500
        );
      },
      wg: function (a, b, c) {
        var d = this;
        a.then(function (a) {
          return d.ra.setLocalDescription(a).then(function () {
            return a;
          });
        })
          .then(function (a) {
            function e() {
              return a;
            }
            for (var h = 0; h < b.length; ) d.we(b[h++]);
            return Va.Yh(d.Le, c).then(e, e);
          })
          .then(function (a) {
            d.Ye(a);
          })
          ["catch"](function () {
            d.Cc();
          });
      },
      sg: function (a) {
        var b = this,
          c = {
            id: this.hb.length,
            negotiated: !0,
            ordered: a.je,
          };
        a.reliable || (c.maxRetransmits = 0);
        a = this.ra.createDataChannel(a.name, c);
        a.binaryType = "arraybuffer";
        a.onopen = function () {
          for (var a = 0, c = b.hb; a < c.length; )
            if ("open" != c[a++].readyState) return;
          null != b.Fd && b.Fd();
        };
        a.onclose = function () {
          b.Cc();
        };
        a.onmessage = function () {
          b.Cc();
        };
        this.hb.push(a);
      },
      we: function (a) {
        var b = this;
        setTimeout(function () {
          return b.ra.addIceCandidate(a);
        }, this.De);
      },
      Pg: function () {
        this.Cc();
      },
      Cc: function () {
        null != this.Gd && this.Gd();
        this.bb();
      },
      bb: function () {
        this.Ae();
        this.ra.close();
      },
      Ae: function () {
        clearTimeout(this.Ud);
        this.Ye = this.Fd = this.Hd = this.Gd = null;
        this.ra.onicecandidate = null;
        this.ra.ondatachannel = null;
        this.ra.onsignalingstatechange = null;
        this.ra.oniceconnectionstatechange = null;
        for (var a = 0, b = this.hb; a < b.length; ) {
          var c = b[a];
          ++a;
          c.onopen = null;
          c.onclose = null;
          c.onmessage = null;
        }
      },
      h: wa,
    };
    var Pa = (Oa["bas.basnet.ConnectionRequestResponse"] = {
      se: !0,
      Yf: ["Accept", "Reject"],
      Tf: {
        yd: 0,
        eb: "bas.basnet.ConnectionRequestResponse",
        toString: bb,
      },
      nd:
        (($a = function (a) {
          return {
            yd: 1,
            reason: a,
            eb: "bas.basnet.ConnectionRequestResponse",
            toString: bb,
          };
        }),
        ($a.ue = ["reason"]),
        $a),
    });
    fa.b = !0;
    fa.Je = function (a) {
      try {
        var b = Xa.oh(a.candidate);
        if ("srflx" == b.$h) return b.Sg;
      } catch (c) {}
      return null;
    };
    fa.prototype = {
      Qd: function (a) {
        var b = this;
        if (null != this.Ya || null != a) {
          if (
            null != this.Ya &&
            null != a &&
            this.Ya.byteLength == a.byteLength
          ) {
            for (
              var c = new Uint8Array(this.Ya),
                d = new Uint8Array(a),
                e = !1,
                f = 0,
                h = this.Ya.byteLength;
              f < h;

            ) {
              var m = f++;
              if (c[m] != d[m]) {
                e = !0;
                break;
              }
            }
            if (!e) return;
          }
          this.Ya = a.slice(0);
          this.Yc = !0;
          null != this.ta &&
            1 == this.ta.readyState &&
            null == this.Zc &&
            (this.Nd(),
            (this.Zc = setTimeout(function () {
              b.Zc = null;
              1 == b.ta.readyState && b.Yc && b.Nd();
            }, 1e4)));
        }
      },
      Pd: function (a) {
        function b() {
          null != c.ta && 1 == c.ta.readyState && c.dc != c.sf && c.qf();
          c.mf = null;
        }
        var c = this;
        this.dc = a;
        null == this.mf && (b(), (this.mf = setTimeout(b, 1e3)));
      },
      Rd: function (a) {
        function c(a) {
          var b = a.url;
          if (null == b) throw new l(null);
          a = a.token;
          if (null == a) throw new l(null);
          d.ta = new WebSocket(b + "?token=" + a, {
            headers: {
              Connection: "Upgrade",
              Pragma: "no-cache",
              "Cache-Control": "no-cache",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36 Edg/100.0.1185.36",
              Upgrade: "websocket",
              Origin: "https://html5.haxball.com",
              "Sec-WebSocket-Version": 13,
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
              "Sec-WebSocket-Extensions":
                "permessage-deflate; client_max_window_bits",
            },
            agent: proxyAgent
          });
          d.ta.binaryType = "arraybuffer";

          d.ta.on("open", () => {
            d.Og();
          });
          d.ta.on("close", (a) => {
            process.env.VERBOSE && console.log(a)
            d.xd(4001 != a);
          });
          d.ta.on("error", (e) => {
            process.env.VERBOSE && console.error(e)
            d.xd(!0);
          });
          d.ta.on("message", Ua(d, d.Ng));
        }
        null == a && (a = "");
        var d = this;
        F.vh(this.Rh, "token=" + this.$c + "&rcr=" + a, F.Uf).then(function (
          a
        ) {
          switch (a.action) {
            case "connect":
              c(a);
              break;
            case "recaptcha":
              throw new l("Invalid Token Provided!");
          }
        });
      },
      Og: function () {
        var a = this;
        null != this.Ya && this.Nd();
        0 != this.dc && this.qf();
        this.qh = setInterval(function () {
          a.Lh();
        }, 4e4);
      },
      Ng: function (a) {
        a = new C(new DataView(a), !1);
        switch (a.B()) {
          case 1:
            this.Lg(a);
            break;
          case 4:
            this.Gg(a);
            break;
          case 5:
            this.Ig(a);
            break;
          case 6:
            this.Kg(a);
        }
      },
      Lg: function (a) {
        var b = a.Lb(),
          c = H.hi(a.Ka(a.B())),
          d,
          e,
          f;
        try {
          a = new C(new DataView(pako.inflateRaw(a.Ka()).buffer), !1);
          d = 0 != a.B();
          e = a.kb();
          for (var h = a.jf(), m = [], q = 0; q < h.length; )
            m.push(new wrtc.RTCIceCandidate(h[q++]));
          f = m;
        } catch (ib) {
          this.fc(b, 0);
          return;
        }
        this.Mg(b, c, e, f, a, d);
      },
      Mg: function (a, b, c, d, e, f) {
        var h = this;
        if (16 <= this.vb.size) this.fc(a, 4104);
        else if (this.pc.has(b)) this.fc(a, 4102);
        else {
          for (var m = [], q = 0; q < d.length; ) {
            var g = fa.Je(d[q++]);
            if (null != g) {
              if (this.Vb.has(g)) {
                this.fc(a, 4102);
                return;
              }
              m.push(g);
            }
          }
          if (
            null != this.Be &&
            ((q = new C(e.j)), (q.a = e.a), (e = this.Be(b, q)), 1 == e.yd)
          ) {
            this.fc(a, e.reason);
            return;
          }
          var k = new wa(a, this.Ad, this.kg);
          f && (k.De = 2500);
          k.Ob = m;
          k.fb = b;
          this.vb.set(a, k);
          k.Gd = function () {
            h.gc(0, k, null);
            h.vb["delete"](k.R);
          };
          k.Fd = function () {
            h.vb["delete"](k.R);
            h.gc(0, k, null);
            null != h.Xe && h.Xe(new Na(k));
          };
          k.Ye = function (a) {
            h.Mh(k, a, k.zd, null);
            k.Le.then(function () {
              h.gc(0, k, null);
            });
            k.Hd = function (a) {
              h.Kh(k, a);
            };
          };
          k.Uh();
          k.rg(
            new wrtc.RTCSessionDescription({
              sdp: c,
              type: "offer",
            }),
            d
          );
        }
      },
      Gg: function (a) {
        var b = a.Lb(),
          c;
        try {
          (a = new C(new DataView(pako.inflateRaw(a.Ka()).buffer), !1)),
            (c = new wrtc.RTCIceCandidate(a.jf()));
        } catch (d) {
          return;
        }
        this.Hg(b, c);
      },
      Hg: function (a, b) {
        var c = this.vb.get(a);
        if (null != c) {
          var d = fa.Je(b);
          if (null != d && (c.Ob.push(d), this.Vb.has(d))) return;
          c.we(b);
        }
      },
      Ig: function (a) {
        this.R = a.Uc(a.B());
        null != this.Rc && this.Rc(this.R);
      },
      Kg: function (a) {
        this.$c = a.Uc(a.j.byteLength - a.a);
      },
      gc: function (a, b, c) {
        if (!b.af) {
          0 == a && (b.af = !0);
          b = b.R;
          var d = r.ba(32, !1);
          d.f(a);
          d.ya(b);
          null != c && d.ob(pako.deflateRaw(c.nb()));
          this.ta.send(d.Pb());
        }
      },
      fc: function (a, b) {
        var c = r.ba(16, !1);
        c.f(0);
        c.ya(a);
        c.Na(b);
        this.ta.send(c.Pb());
      },
      Lh: function () {
        var a = r.ba(1, !1);
        a.f(8);
        this.ta.send(a.Pb());
      },
      Nd: function () {
        this.Yc = !1;
        var a = r.ba(256, !1);
        a.f(7);
        null != this.Ya && a.Ff(this.Ya);
        this.ta.send(a.Pb());
      },
      qf: function () {
        var a = r.ba(2, !1);
        a.f(9);
        a.f(this.dc ? 1 : 0);
        this.ta.send(a.Pb());
        this.sf = this.dc;
      },
      Mh: function (a, b, c, d) {
        var e = r.ba(32, !1);
        e.Qb(b.sdp);
        e.Gf(c);
        null != d && e.ob(d.nb());
        this.gc(1, a, e);
      },
      Kh: function (a, b) {
        var c = r.ba(32, !1);
        c.Gf(b);
        this.gc(4, a, c);
      },
      xg: function () {
        for (var a = this.vb.values(), b = a.next(); !b.done; ) {
          var c = b.value,
            b = a.next();
          c.bb();
        }
        this.vb.clear();
      },
      xd: function (a) {
        var b = this;
        this.xg();
        clearTimeout(this.Zc);
        this.Zc = null;
        this.Yc = !1;
        clearInterval(this.qh);
        clearTimeout(this.Hh);
        a &&
          (this.Hh = setTimeout(function () {
            b.Rd();
          }, (this.Fh + Math.random() * this.Gh) | 0));
      },
      gg: function (a) {
        for (var b = 0, c = a.Ob; b < c.length; ) this.Vb.add(c[b++]);
        null != a.fb && this.pc.add(a.fb);
        return {
          si: a.Ob,
          gi: a.fb,
        };
      },
      ud: function () {
        this.Vb.clear();
        this.pc.clear();
      },
      td: function (a) {
        for (var b = 0, c = a.si; b < c.length; ) this.Vb["delete"](c[b++]);
        this.pc["delete"](a.gi);
      },
      h: fa,
    };
    Xa.b = !0;
    Xa.oh = function (a) {
      a = a.split(" ");
      if ("typ" != a[6]) throw new l(null);
      return {
        $h: a[7],
        Sg: a[4],
      };
    };
    Na.b = !0;
    Na.prototype = {
      Xh: function () {
        return performance.now() - this.Bf;
      },
      mb: function (a, b) {
        if (this.Ec) {
          var c = this.hb[a];
          if ("open" == c.readyState) {
            var d = b.Vd();
            try {
              c.send(d);
            } catch (e) {
              console.log(e instanceof l ? e.Db : e);
            }
          }
        }
      },
      bb: function () {
        clearTimeout(this.Cf);
        this.Ec &&
          ((this.Ec = !1), this.ra.close(), null != this.Ze && this.Ze());
      },
      h: Na,
    };
    C.b = !0;
    C.ug = function (a, b) {
      var c = a.getUint8(b),
        d,
        e,
        f,
        h,
        m,
        q = b;
      if (0 == (c & 128)) ++b;
      else if (192 == (c & 224))
        (d = a.getUint8(b + 1)), (c = ((c & 31) << 6) | (d & 63)), (b += 2);
      else if (224 == (c & 240))
        (d = a.getUint8(b + 1)),
          (e = a.getUint8(b + 2)),
          (c = ((c & 15) << 12) | ((d & 63) << 6) | (e & 63)),
          (b += 3);
      else if (240 == (c & 248))
        (d = a.getUint8(b + 1)),
          (e = a.getUint8(b + 2)),
          (f = a.getUint8(b + 3)),
          (c = ((c & 7) << 18) | ((d & 63) << 12) | ((e & 63) << 6) | (f & 63)),
          (b += 4);
      else if (248 == (c & 252))
        (d = a.getUint8(b + 1)),
          (e = a.getUint8(b + 2)),
          (f = a.getUint8(b + 3)),
          (h = a.getUint8(b + 4)),
          (c =
            ((c & 3) << 24) |
            ((d & 63) << 18) |
            ((e & 63) << 12) |
            ((f & 63) << 6) |
            (h & 63)),
          (b += 5);
      else if (252 == (c & 254))
        (d = a.getUint8(b + 1)),
          (e = a.getUint8(b + 2)),
          (f = a.getUint8(b + 3)),
          (h = a.getUint8(b + 4)),
          (m = a.getUint8(b + 5)),
          (c =
            ((c & 1) << 30) |
            ((d & 63) << 24) |
            ((e & 63) << 18) |
            ((f & 63) << 12) |
            ((h & 63) << 6) |
            (m & 63)),
          (b += 6);
      else
        throw new l(
          "Cannot decode UTF8 character at offset " +
            b +
            ": charCode (" +
            c +
            ") is invalid"
        );
      return {
        char: c,
        length: b - q,
      };
    };
    C.prototype = {
      Ka: function (a) {
        null == a && (a = this.j.byteLength - this.a);
        if (this.a + a > this.j.byteLength) throw new l("Read too much");
        var b = new Uint8Array(this.j.buffer, this.j.byteOffset + this.a, a);
        this.a += a;
        return b;
      },
      Ah: function (a) {
        var b = this.Ka(a);
        a = new ArrayBuffer(a);
        new Uint8Array(a).set(b);
        return a;
      },
      Jd: function () {
        return this.j.getInt8(this.a++);
      },
      B: function () {
        return this.j.getUint8(this.a++);
      },
      cc: function () {
        var a = this.j.getUint16(this.a, this.sa);
        this.a += 2;
        return a;
      },
      H: function () {
        var a = this.j.getInt32(this.a, this.sa);
        this.a += 4;
        return a;
      },
      Lb: function () {
        var a = this.j.getUint32(this.a, this.sa);
        this.a += 4;
        return a;
      },
      Bh: function () {
        var a = this.j.getFloat32(this.a, this.sa);
        this.a += 4;
        return a;
      },
      o: function () {
        var a = this.j.getFloat64(this.a, this.sa);
        this.a += 8;
        return a;
      },
      lb: function () {
        for (
          var a = this.a, b = 0, c, d = 0;
          (c = this.j.getUint8(a + b)),
            5 > b && (d |= ((c & 127) << (7 * b)) >>> 0),
            ++b,
            0 != (c & 128);

        );
        this.a += b;
        return d | 0;
      },
      Uc: function (a) {
        var b = this.a,
          c,
          d = "";
        for (a = b + a; b < a; )
          (c = C.ug(this.j, b)),
            (b += c.length),
            (d += String.fromCodePoint(c["char"]));
        if (b != a)
          throw new l(
            "Actual string length differs from the specified: " +
              (b - a) +
              " bytes"
          );
        this.a = b;
        return d;
      },
      Xa: function () {
        var a = this.lb();
        return 0 >= a ? null : this.Uc(a - 1);
      },
      kb: function () {
        return this.Uc(this.lb());
      },
      jf: function () {
        var a = this.kb();
        return JSON.parse(a);
      },
      h: C,
    };
    r.b = !0;
    r.ba = function (a, b) {
      null == b && (b = !1);
      null == a && (a = 16);
      return new r(new DataView(new ArrayBuffer(a)), b);
    };
    r.zg = function (a, b, c) {
      var d = c;
      if (0 > a)
        throw new l(
          "Cannot encode UTF8 character: charCode (" + a + ") is negative"
        );
      if (128 > a) b.setUint8(c, a & 127), ++c;
      else if (2048 > a)
        b.setUint8(c, ((a >> 6) & 31) | 192),
          b.setUint8(c + 1, (a & 63) | 128),
          (c += 2);
      else if (65536 > a)
        b.setUint8(c, ((a >> 12) & 15) | 224),
          b.setUint8(c + 1, ((a >> 6) & 63) | 128),
          b.setUint8(c + 2, (a & 63) | 128),
          (c += 3);
      else if (2097152 > a)
        b.setUint8(c, ((a >> 18) & 7) | 240),
          b.setUint8(c + 1, ((a >> 12) & 63) | 128),
          b.setUint8(c + 2, ((a >> 6) & 63) | 128),
          b.setUint8(c + 3, (a & 63) | 128),
          (c += 4);
      else if (67108864 > a)
        b.setUint8(c, ((a >> 24) & 3) | 248),
          b.setUint8(c + 1, ((a >> 18) & 63) | 128),
          b.setUint8(c + 2, ((a >> 12) & 63) | 128),
          b.setUint8(c + 3, ((a >> 6) & 63) | 128),
          b.setUint8(c + 4, (a & 63) | 128),
          (c += 5);
      else if (-2147483648 > a)
        b.setUint8(c, ((a >> 30) & 1) | 252),
          b.setUint8(c + 1, ((a >> 24) & 63) | 128),
          b.setUint8(c + 2, ((a >> 18) & 63) | 128),
          b.setUint8(c + 3, ((a >> 12) & 63) | 128),
          b.setUint8(c + 4, ((a >> 6) & 63) | 128),
          b.setUint8(c + 5, (a & 63) | 128),
          (c += 6);
      else
        throw new l(
          "Cannot encode UTF8 character: charCode (" +
            a +
            ") is too large (>= 0x80000000)"
        );
      return c - d;
    };
    r.hg = function (a) {
      if (0 > a)
        throw new l(
          "Cannot calculate length of UTF8 character: charCode (" +
            a +
            ") is negative"
        );
      if (128 > a) return 1;
      if (2048 > a) return 2;
      if (65536 > a) return 3;
      if (2097152 > a) return 4;
      if (67108864 > a) return 5;
      if (-2147483648 > a) return 6;
      throw new l(
        "Cannot calculate length of UTF8 character: charCode (" +
          a +
          ") is too large (>= 0x80000000)"
      );
    };
    r.xc = function (a) {
      for (var b = 0, c = a.length, d = 0; d < c; ) b += r.hg(G.Jf(a, d++));
      return b;
    };
    r.ig = function (a) {
      a >>>= 0;
      return 128 > a
        ? 1
        : 16384 > a
        ? 2
        : 2097152 > a
        ? 3
        : 268435456 > a
        ? 4
        : 5;
    };
    r.prototype = {
      Vd: function () {
        var a = new ArrayBuffer(this.a),
          b = new Uint8Array(this.j.buffer, this.j.byteOffset, this.a);
        new Uint8Array(a).set(b);
        return a;
      },
      nb: function () {
        return new Uint8Array(this.j.buffer, this.j.byteOffset, this.a);
      },
      Pb: function () {
        return new DataView(this.j.buffer, this.j.byteOffset, this.a);
      },
      Zh: function () {
        return new C(this.Pb(), this.sa);
      },
      Ia: function (a) {
        this.j.byteLength < a &&
          this.Eh(2 * this.j.byteLength >= a ? 2 * this.j.byteLength : a);
      },
      Eh: function (a) {
        if (1 > a)
          throw new l("Can't resize buffer to a capacity lower than 1");
        if (this.j.byteLength < a) {
          var b = new Uint8Array(this.j.buffer);
          a = new ArrayBuffer(a);
          new Uint8Array(a).set(b);
          this.j = new DataView(a);
        }
      },
      f: function (a) {
        var b = this.a++;
        this.Ia(this.a);
        this.j.setUint8(b, a);
      },
      Xd: function (a) {
        var b = this.a;
        this.a += 2;
        this.Ia(this.a);
        this.j.setInt16(b, a, this.sa);
      },
      Na: function (a) {
        var b = this.a;
        this.a += 2;
        this.Ia(this.a);
        this.j.setUint16(b, a, this.sa);
      },
      v: function (a) {
        var b = this.a;
        this.a += 4;
        this.Ia(this.a);
        this.j.setInt32(b, a, this.sa);
      },
      ya: function (a) {
        var b = this.a;
        this.a += 4;
        this.Ia(this.a);
        this.j.setUint32(b, a, this.sa);
      },
      Wd: function (a) {
        var b = this.a;
        this.a += 4;
        this.Ia(this.a);
        this.j.setFloat32(b, a, this.sa);
      },
      g: function (a) {
        var b = this.a;
        this.a += 8;
        this.Ia(this.a);
        this.j.setFloat64(b, a, this.sa);
      },
      ob: function (a) {
        var b = this.a;
        this.a += a.byteLength;
        this.Ia(this.a);
        new Uint8Array(this.j.buffer, this.j.byteOffset, this.j.byteLength).set(
          a,
          b
        );
      },
      Ff: function (a) {
        this.ob(new Uint8Array(a));
      },
      Qb: function (a) {
        this.Da(r.xc(a));
        this.fd(a);
      },
      Ca: function (a) {
        null == a ? this.Da(0) : (this.Da(r.xc(a) + 1), this.fd(a));
      },
      Hf: function (a) {
        var b = r.xc(a);
        if (255 < b) throw new l(null);
        this.f(b);
        this.fd(a);
      },
      Gf: function (a) {
        this.Qb(JSON.stringify(a));
      },
      fd: function (a) {
        var b = this.a;
        this.Ia(b + r.xc(a));
        for (var c = a.length, d = 0; d < c; )
          b += r.zg(G.Jf(a, d++), this.j, b);
        this.a = b;
      },
      Da: function (a) {
        var b = this.a;
        a >>>= 0;
        this.Ia(b + r.ig(a));
        this.j.setUint8(b, a | 128);
        128 <= a
          ? (this.j.setUint8(b + 1, (a >> 7) | 128),
            16384 <= a
              ? (this.j.setUint8(b + 2, (a >> 14) | 128),
                2097152 <= a
                  ? (this.j.setUint8(b + 3, (a >> 21) | 128),
                    268435456 <= a
                      ? (this.j.setUint8(b + 4, (a >> 28) & 127), (a = 5))
                      : (this.j.setUint8(b + 3, this.j.getUint8(b + 3) & 127),
                        (a = 4)))
                  : (this.j.setUint8(b + 2, this.j.getUint8(b + 2) & 127),
                    (a = 3)))
              : (this.j.setUint8(b + 1, this.j.getUint8(b + 1) & 127), (a = 2)))
          : (this.j.setUint8(b, this.j.getUint8(b) & 127), (a = 1));
        this.a += a;
      },
      h: r,
    };
    V.b = !0;
    V.ci = function (a, b) {
      try {
        var c = new C(new DataView(a.buffer, a.byteOffset, a.byteLength), !1);
        c.B();
        var d = c.Ka(c.cc()),
          e = c.Ka(),
          f = new C(new DataView(d.buffer, d.byteOffset, d.byteLength), !1),
          h = f.kb(),
          m = f.kb(),
          q = f.Ka();
        if (q.byteLength != b.byteLength) return Promise.reject(null);
        for (var c = 0, g = q.byteLength; c < g; ) {
          var k = c++;
          if (q[k] != b[k]) return Promise.reject(null);
        }
        return V.ei(h, m)
          .then(function (a) {
            return crypto.subtle.verify(V.Qh, a, e, d);
          })
          .then(function (a) {
            if (!a) throw new l(null);
            return h;
          });
      } catch (xa) {
        return Promise.reject(xa instanceof l ? xa.Db : xa);
      }
    };
    V.ei = function (a, b) {
      try {
        return crypto.subtle.importKey(
          "jwk",
          {
            crv: "P-256",
            ext: !0,
            key_ops: ["verify"],
            kty: "EC",
            x: a,
            y: b,
          },
          V.eg,
          !0,
          ["verify"]
        );
      } catch (c) {
        return Promise.reject(c instanceof l ? c.Db : c);
      }
    };
    ia.b = !0;
    ia.Wg = function () {
      if (null != ia.Id) return ia.Id;
      ia.Id = new Promise(function (a, b) {
        var c = global.grecaptcha;
        null != c ? a(c) : b(null);
      });
      return ia.Id;
    };
    Wa.b = !0;
    Wa.pi = function () {
      var a = wrtc;
      var b = new wrtc.RTCPeerConnection({
        iceServers: [],
      });
      try {
        b.createAnswer()["catch"](function () {});
      } catch (e) {
        var a = a.RTCPeerConnection.prototype,
          c = a.createOffer,
          d = a.createAnswer;
        a.createOffer = function (a) {
          var b = this;
          return new Promise(function (d, e) {
            c.call(b, d, e, a);
          });
        };
        a.createAnswer = function (a) {
          var b = this;
          return new Promise(function (c, e) {
            d.call(b, c, e, a);
          });
        };
      }
    };
    Va.b = !0;
    Va.Yh = function (a, b) {
      return new Promise(function (c, d) {
        var e = setTimeout(function () {
          d("Timed out");
        }, b);
        a.then(
          function (a) {
            clearTimeout(e);
            c(a);
          },
          function (a) {
            clearTimeout(e);
            d(a);
          }
        );
      });
    };
    g.b = !0;
    g.$ = function (a) {
      null == a.Z && (a.Z = !0);
      null == a.da && (a.da = !0);
      return a;
    };
    g.aa = function (a) {
      a.Xf = g.Yd;
      if (null == a.U) throw new l("Class doesn't have a config");
      a.prototype.Kf = a.U;
      g.Nf.set(g.Yd, a);
      g.Yd++;
    };
    g.ke = function (a, b) {
      var c = (null == a ? null : k.Mf(a)).Xf;
      if (null == c) throw new l("Tried to pack unregistered action");
      b.f(c);
      a.P(b);
    };
    g.ui = function (a) {
      var b = a.B(),
        b = Object.create(g.Nf.get(b).prototype);
      b.D = 0;
      b.cb = 0;
      b.W(a);
      return b;
    };
    g.prototype = {
      Rf: function () {
        return !0;
      },
      apply: function () {
        throw new l("missing implementation");
      },
      W: function () {
        throw new l("missing implementation");
      },
      P: function () {
        throw new l("missing implementation");
      },
      h: g,
    };
    Ka.b = !0;
    Ka.prototype = {
      ni: function (a) {
        for (
          var b = 0, c = a.cb, d = a.D, e = 0, f = this.list;
          e < f.length;

        ) {
          var h = f[e];
          ++e;
          var m = h.cb;
          if (m > c) break;
          if (m == c) {
            h = h.D;
            if (h > d) break;
            h == d && ++d;
          }
          ++b;
        }
        a.D = d;
        this.list.splice(b, 0, a);
      },
      h: Ka,
    };
    va.b = !0;
    va.prototype = {
      h: va,
    };
    ha.b = !0;
    ha.M = g;
    ha.prototype = v(g.prototype, {
      apply: function (a) {
        a.pg(this.hd);
      },
      P: function (a) {
        a.Da(this.hd.byteLength);
        a.Ff(this.hd);
      },
      W: function (a) {
        this.hd = a.Ah(a.lb());
      },
      h: ha,
    });
    Ma.b = !0;
    Ma.prototype = {
      h: Ma,
    };
    La.b = !0;
    La.prototype = {
      stop: function () {
        this.fe.wb = null;
        this.fe.Fa.uf(null);
        this.Cb.j.setUint16(0, this.Qf, this.Cb.sa);
        this.Cb.ob(this.nc.nb());
        var a = pako.deflateRaw(this.Cb.nb()),
          b = r.ba(a.byteLength + 32);
        b.fd("HBR2");
        b.ya(this.version);
        b.ya(this.fe.ea - this.ld);
        b.ob(a);
        return b.nb();
      },
      h: La,
    };
    ga.b = !0;
    ea.b = !0;
    ea.M = va;
    ea.prototype = v(va.prototype, {
      dg: function (a) {
        for (var b = this.Md.list, c = 0, d = b.length, e = 0; e < a; ) {
          for (++e; c < d; ) {
            var f = b[c];
            if (f.cb != this.ea) break;
            f.apply(this.Fa);
            null != this.wb && this.wb(f);
            this.Qa++;
            ++c;
          }
          this.Fa.Ba(1);
          this.ed += this.Qa;
          this.Qa = 0;
          this.ea++;
        }
        for (; c < d; ) {
          a = b[c];
          if (a.cb != this.ea || a.D != this.Qa) break;
          a.apply(this.Fa);
          null != this.wb && this.wb(a);
          this.Qa++;
          ++c;
        }
        b.splice(0, c);
      },
      nf: function (a) {
        a.cb == this.ea && a.D <= this.Qa
          ? ((a.D = this.Qa++), a.apply(this.Fa), null != this.wb && this.wb(a))
          : this.Md.ni(a);
      },
      h: ea,
    });
    Fa.b = !0;
    Fa.M = ea;
    Fa.prototype = v(ea.prototype, {
      yg: function (a, b, c, d) {
        var e = this.ub.get(a);
        if (null != e) {
          if (d) {
            var f = this.Va.gg(e.ac);
            this.qc.set(a, f);
          }
          a = r.ba();
          a.f(5);
          a.f(d ? 1 : 0);
          a.Qb(b);
          null == c && (c = "");
          a.Qb(c);
          e.mb(a);
          e.ac.bb();
        }
      },
      ud: function () {
        this.Va.ud();
        this.qc.clear();
      },
      td: function (a) {
        var b = this.qc.get(a);
        null != b && this.Va.td(b);
        this.qc["delete"](a);
      },
      Qd: function (a) {
        this.Va.Qd(a);
      },
      Pd: function (a) {
        this.Va.Pd(a);
      },
      ec: function (a) {
        a.A = 0;
        var b = this.ea + this.pf + this.vg;
        a.Kf.Z || (b = this.ea);
        a.cb = b;
        this.nf(a);
        this.Od();
        0 < this.Ga.length && this.ad(this.Cd(a), 1);
      },
      rf: function (a, b) {
        var c = this.ub.get(b);
        if (null != c) {
          a.A = 0;
          var d = r.ba();
          d.f(6);
          g.ke(a, d);
          c.mb(d, 0);
        }
      },
      Ba: function () {
        var a = (((performance.now() - this.yf) * this.re) | 0) - this.ea;
        0 < a && this.dg(a);
        7 <= this.ea - this.Qe && this.Od();
        this.ea - this.Pe >= this.mg && (this.Od(), this.Jh());
      },
      Jg: function (a, b) {
        if (this.Ga.length >= this.Pc) return Pa.nd(4100);
        try {
          if (b.cc() != this.di) throw new l(null);
        } catch (d) {
          return Pa.nd(4103);
        }
        try {
          var c = b.Xa();
          if (null != this.jb && c != this.jb) throw new l(null);
        } catch (d) {
          return Pa.nd(4101);
        }
        return Pa.Tf;
      },
      nh: function (a) {
        var b = this;
        if (this.Ga.length >= this.Pc) a.bb();
        else {
          var c = new Ja(a);
          this.Ga.push(c);
          a.$e = function (a) {
            a = new C(new DataView(a));
            b.wh(a, c);
          };
          a.Ze = function () {
            G.remove(b.Ga, c);
            b.ub["delete"](c.R);
            ua.va(b.mh, c.R);
          };
          a = r.ba(1 + c.Xb.byteLength);
          a.f(0);
          a.Da(c.Xb.byteLength);
          a.ob(c.Xb);
          c.mb(a);
        }
      },
      Cd: function (a) {
        var b = r.ba();
        b.f(2);
        this.bf(a, b);
        return b;
      },
      bf: function (a, b) {
        b.ya(a.cb);
        b.Da(a.D);
        b.Na(a.A);
        b.ya(a.fi);
        g.ke(a, b);
      },
      Od: function () {
        if (!(0 >= this.ea - this.Qe) && 0 != this.Ga.length) {
          var a = r.ba();
          a.f(3);
          a.ya(this.ea);
          a.ya(this.ed);
          this.ad(a, 2);
          this.Qe = this.ea;
        }
      },
      ad: function (a, b) {
        null == b && (b = 0);
        for (var c = 0, d = this.Ga; c < d.length; ) {
          var e = d[c];
          ++c;
          e.Wc && e.mb(a, b);
        }
      },
      Nh: function (a) {
        var b = r.ba();
        b.f(1);
        var c = r.ba();
        c.Na(a.R);
        c.ya(this.ea);
        c.ya(this.ed);
        c.Da(this.Qa);
        this.Fa.G(c);
        for (var d = this.Md.list, e = 0, f = d.length; e < f; )
          this.bf(d[e++], c);
        b.ob(pako.deflateRaw(c.nb()));
        a.mb(b);
      },
      Jh: function () {
        this.Pe = this.ea;
        if (0 != this.Ga.length) {
          var a = new ha();
          a.cb = this.ea;
          a.D = this.Qa++;
          a.A = 0;
          a.hd = this.Fa.Cg();
          this.ad(this.Cd(a));
        }
      },
      yh: function (a, b) {
        var c = this,
          d = a.Ka(a.lb()),
          e = a.Ka(a.lb()),
          f = b.Xb;
        b.Xb = null;
        V.ci(d, f)
          ["catch"](function () {
            return null;
          })
          .then(function (a) {
            try {
              if (-1 != c.Ga.indexOf(b)) {
                b.tg = a;
                var d = c.jh++;
                b.R = d;
                c.ub.set(d, b);
                Ea.va(
                  c.lh,
                  d,
                  new C(new DataView(e.buffer, e.byteOffset, e.byteLength), !1)
                );
                b.Wc = !0;
                c.Nh(b);
              }
            } catch (q) {
              c.Ke(b, q instanceof l ? q.Db : q);
            }
          });
      },
      wh: function (a, b) {
        this.Ba();
        try {
          if (!b.Fg.Ef()) throw new l(1);
          var c = a.B();
          if (b.Wc)
            switch (c) {
              case 1:
                this.zh(a, b);
                break;
              case 2:
                this.xh(a, b);
                break;
              default:
                throw new l(0);
            }
          else if (0 == c) this.yh(a, b);
          else throw new l(0);
          if (0 < a.j.byteLength - a.a) throw new l(2);
        } catch (d) {
          this.Ke(b, d instanceof l ? d.Db : d);
        }
      },
      Ke: function (a, b) {
        this.ub["delete"](a.R);
        G.remove(this.Ga, a);
        a.Wc && null != this.We && this.We(a.R);
        a.ac.bb();
      },
      xh: function (a, b) {
        var c = a.o();
        b.Tc = a.lb();
        var d = r.ba();
        d.f(4);
        d.g((performance.now() - this.yf) * this.re + this.pf);
        d.g(c);
        b.mb(d, 2);
      },
      zh: function (a, b) {
        var c = a.Lb(),
          d = a.Lb(),
          e = g.ui(a),
          f = e.Kf.me;
        if (null != f) {
          var h = b.ve.get(f);
          null == h && ((h = new Ca(f.Zd, f.qe)), b.ve.set(f, h));
          if (!h.Ef()) throw new l(3);
        }
        f = this.ea;
        h = this.ea + 120;
        e.fi = d;
        e.A = b.R;
        e.cb = c < f ? f : c > h ? h : c;
        e.Rf(this.Fa) && (this.nf(e), this.ad(this.Cd(e), 1));
      },
      h: Fa,
    });
    Ja.b = !0;
    Ja.prototype = {
      mb: function (a, b) {
        null == b && (b = 0);
        this.ac.mb(b, a);
      },
      h: Ja,
    };
    Ta.b = !0;
    x.b = !0;
    x.prototype = {
      h: x,
    };
    F.b = !0;
    F.lf = function (a, b, c, d) {
      return new Promise(function (e, f) {
        fetch(a, {
          headers: {
            accept: "",
            "accept-language": "tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
            "content-type": d,
            "sec-ch-ua":
              '" Not A;Brand";v="99", "Chromium";v="100", "Microsoft Edge";v="100"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            Referer: "https://html5.haxball.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: c,
          method: b,
        })
          .then(async (data) => {
            const json = await data.json();
            e(json);
          })
          .catch((e) => {
            f(e);
          });
      });
    };
    F.Bg = function (a) {
      return F.lf(a, "GET", null);
    };
    F.Dg = function (a) {
      return F.Bg(a).then(function (a) {
        var b = a.error;
        if (null != b) throw new l(b);
        return a.data;
      });
    };
    F.uh = function (a, b, c) {
      return F.lf(a, "POST", b, c);
    };
    F.vh = function (a, b, c) {
      return F.uh(a, b, c).then(function (a) {
        var b = a.error;
        if (null != b) throw new l(b);
        return a.data;
      });
    };
    ua.b = !0;
    ua.va = function (a, b) {
      null != a && a(b);
    };
    Ea.b = !0;
    Ea.va = function (a, b, c) {
      null != a && a(b, c);
    };
    Ia.b = !0;
    Ia.va = function (a, b, c, d) {
      null != a && a(b, c, d);
    };
    Da.b = !0;
    Da.va = function (a, b, c, d, e) {
      null != a && a(b, c, d, e);
    };
    Ca.b = !0;
    Ca.prototype = {
      Ef: function (a) {
        null == a && (a = 1);
        this.Ba();
        return a <= this.sb ? ((this.sb -= a), !0) : !1;
      },
      Ba: function () {
        var a = performance.now(),
          b = Math.floor((a - this.Jc) / this.Df);
        this.Jc += b * this.Df;
        this.sb += b;
        this.sb >= this.ze && ((this.sb = this.ze), (this.Jc = a));
      },
      h: Ca,
    };
    M.b = !0;
    M.He = function (a) {
      var b = new M();
      b.Kc = a.lat;
      b.Mc = a.lon;
      b.gb = a.code.toLowerCase();
      return b;
    };
    M.Eg = function () {
      return F.Dg(ta.ye + "api/geo").then(function (a) {
        return M.He(a);
      });
    };
    M.prototype = {
      h: M,
    };
    ta.b = !0;
    y.b = !0;
    y.fh = function () {
      Wa.pi();
      Sa.mi();
      M.Eg()
        .then(
          function (a) {
            y.Ge = a;
          },
          function () {
            return {};
          }
        )
        .then(function () {
          resolve(y.Th);
        });
    };
    y.Ph = function (a, b, c) {
      null == y.Vc &&
        ((y.Vc = undefined),
        (y.Ch = a.render(y.Vc, {
          sitekey: b,
          callback: function (a) {
            null != y.Kd && y.Kd(a);
          },
        })));
      y.Vc.hidden = !1;
      a.reset(y.Ch);
      y.Kd = function (a) {
        setTimeout(function () {
          y.Vc.hidden = !0;
          c(a);
        }, 1e3);
        y.Kd = null;
      };
    };
    y.hh = function (a, b) {
      return "https://www.haxball.com/play?c=" + a + (b ? "&p=1" : "");
    };
    y.Th = function (a) {
      function b() {
        if (!q) {
          var a = new Ha();
          a.bi = 9;
          a.pa = u.Ld;
          a.ca = u.ca.length - (xa ? 0 : 1);
          a.kh = A.Pc;
          a.gb = x.gb;
          a.jb = null != A.jb;
          a.Kc = x.Kc;
          a.Mc = x.Mc;
          var b = r.ba(16);
          a.G(b);
          a = b.Vd();
          A.Qd(a);
        }
      }
      function c(a) {
        B.then(function () {
          A.ec(a);
        });
      }
      function d(a) {
        return null == a
          ? null
          : {
              x: a.a.x,
              y: a.a.y,
              xspeed: a.s.x,
              yspeed: a.s.y,
              xgravity: a.ma.x,
              ygravity: a.ma.y,
              radius: a.L,
              bCoeff: a.i,
              invMass: a.K,
              damping: a.ga,
              color: a.S,
              cMask: a.c,
              cGroup: a.m,
            };
      }
      function e() {
        return null == u.C
          ? null
          : {
              red: u.C.Mb,
              blue: u.C.Fb,
              time: u.C.Jb,
              scoreLimit: u.C.$a,
              timeLimit: 60 * u.C.Ma,
            };
      }
      function f(a) {
        if (null == a) return null;
        var b = null,
          c = a.N;
        null != c &&
          (b = {
            x: c.a.x,
            y: c.a.y,
          });
        return {
          name: a.pa,
          team: a.ja.R,
          id: a.na,
          admin: a.Rb,
          position: b,
        };
      }
      function h(b, c) {
        var d = a[b];
        return null == d ? c : k.l(d, String);
      }
      function m(b, c) {
        var d = a[b];
        return null == d ? c : d;
      }
      if (y.tf) throw new l("Can't init twice");
      y.tf = !0;
      var q = !m("public", !1),
        g = h("roomName", "Headless Room"),
        eb = h("playerName", "Host"),
        xa = m("noPlayer", !1),
        t = k.l(m("maxPlayers", 12), ya),
        w = h("password", null),
        v = h("token", null),
        z = m("geo", null),
        x = y.Ge;
      if (null != z && ((x = M.He(z)), 3 < x.gb.length))
        throw new l("Invalid country code");

      if (v == null) throw new l("No Token Provided!");
      var u = new Aa();
      u.Ld = g;
      xa ||
        ((g = new ra()), (g.pa = eb), (g.Rb = !0), (g.ae = x.gb), u.ca.push(g));
      var A = new Fa({
        iceServers: ta.Ad,
        oi: ta.ye + "api/host",
        state: u,
        version: 9,
        ti: v,
      });
      A.Pc = 2 > t ? 2 : 30 < t ? 30 : t;
      A.jb = w;
      var B = Promise.resolve();
      b();
      var C = null,
        D = {
          sendChat: function (a, b) {
            var d = new aa();
            d.Oa = a;
            null != b
              ? B.then(function () {
                  A.rf(d, b);
                })
              : c(d);
          },
          sendAnnouncement: function (a, b, d, e, f) {
            e = {
              bold: 1,
              italic: 2,
              small: 3,
              "small-bold": 4,
              "small-italic": 5,
            }[e];
            null == e && (e = 0);
            null == d && (d = -1);
            null == f && (f = 1);
            var h = U.V(a, d, e, f);
            null != b
              ? B.then(function () {
                  A.rf(h, b);
                })
              : c(h);
          },
          setPlayerAdmin: function (a, b) {
            var d = T.V(a, b);
            c(d);
          },
          setPlayerTeam: function (a, b) {
            var d = S.V(a, 1 == b ? p.ka : 2 == b ? p.wa : p.oa);
            c(d);
          },
          setPlayerAvatar: function (a, b) {
            var d = Q.V(a, b);
            c(d);
          },
          kickPlayer: function (a, b, d) {
            null == b && (b = "");
            a = I.V(a, b, d);
            c(a);
          },
          clearBan: function (a) {
            A.td(a);
          },
          clearBans: function () {
            A.ud();
          },
          setScoreLimit: function (a) {
            a = L.V(0, a);
            c(a);
          },
          setTimeLimit: function (a) {
            a = L.V(1, a);
            c(a);
          },
          setCustomStadium: function (a) {
            var b = new n();
            try {
              b.Xg(a);
            } catch (ab) {
              throw l.vi(ab instanceof l ? ab.Db : ab);
            }
            a = K.V(b);
            c(a);
          },
          setDefaultStadium: function (a) {
            for (var b = n.wd(), d = null, e = 0; e < b.length; ) {
              var f = b[e];
              ++e;
              if (f.pa == a) {
                d = f;
                break;
              }
            }
            if (null == d) throw new l("Stadium doesn't exist");
            a = K.V(d);
            c(a);
          },
          setDiscProperties: function (a, b) {
            var d = E.Pf(a, !1, b);
            c(d);
          },
          setPlayerDiscProperties: function (a, b) {
            var d = E.Pf(a, !0, b);
            c(d);
          },
          setTeamColors: function (a, b, d, e) {
            var f = new da(),
              h = new W();
            f.jd = h;
            f.ja = 1 == a ? p.ka : 2 == a ? p.wa : p.oa;
            h.Pa = [];
            var m = e.length;
            a = 0;
            for (m = 3 > m ? m : 3; a < m; ) h.Pa.push(e[a++] | 0);
            h.Td = d | 0;
            h.xe = ((256 * b) / 360) | 0;
            c(f);
          },
          setKickRateLimit: function (a, b, d) {
            null == a && (a = 2);
            null == b && (b = 0);
            null == d && (d = 0);
            a = O.V(a, b, d);
            c(a);
          },
          startGame: function () {
            c(new Z());
          },
          stopGame: function () {
            c(new Y());
          },
          pauseGame: function (a) {
            var b = new ba();
            b.mc = a;
            c(b);
          },
          setTeamsLock: function (a) {
            var b = new ca();
            b.newValue = a;
            c(b);
          },
          setPassword: function (a) {
            A.jb = null == a ? null : k.l(a, String);
            b();
          },
          setRequireRecaptcha: function (a) {
            A.Pd(k.l(a, Qa));
          },
          getPlayerList: function () {
            for (var a = [], b = 0, c = u.ca; b < c.length; ) a.push(f(c[b++]));
            return a;
          },
          getPlayer: function (a) {
            a = u.T(a);
            return null == a ? null : f(a);
          },
          getScores: function () {
            return e();
          },
          getBallPosition: function () {
            var a = u.C;
            if (null == a) return null;
            a = a.ia.w[0].a;
            return {
              x: a.x,
              y: a.y,
            };
          },
          getPlayerDiscProperties: function (a) {
            if (null == u.C) return null;
            a = u.T(a);
            return null == a ? null : d(a.N);
          },
          getDiscProperties: function (a) {
            var b = u.C;
            return null == b ? null : d(b.ia.w[a]);
          },
          getDiscCount: function () {
            var a = u.C;
            return null == a ? 0 : a.ia.w.length;
          },
          startRecording: function () {
            C = new La(A, 3);
          },
          stopRecording: function () {
            if (null == C) return null;
            var a = C.stop();
            C = null;
            return a;
          },
          reorderPlayers: function (a, b) {
            var d = P.V(a, b);
            c(d);
          },
          CollisionFlags: {
            ball: 1,
            red: 2,
            blue: 4,
            redKO: 8,
            blueKO: 16,
            wall: 32,
            kick: 64,
            score: 128,
            c0: 268435456,
            c1: 536870912,
            c2: 1073741824,
            c3: -2147483648,
            all: 63,
          },
        };
      A.$b = function (a, b) {
        return ia.Wg().then(function (c) {
          y.Ph(c, a, b);
        });
      };
      setInterval(function () {
        A.Ba();
      }, 50);
      setInterval(function () {
        var a = N.V(A);
        A.ec(a);
      }, 3e3);
      A.We = function (a) {
        null != u.T(a) && ((a = I.V(a, "Bad actor", !1)), A.ec(a));
      };
      A.lh = function (a, c) {
        var d = c.kb();
        if (25 < d.length) throw new l("name too long");
        var e = c.kb();
        if (3 < e.length) throw new l("country too long");
        var f = c.Xa();
        if (null != f && 2 < f.length) throw new l("avatar too long");
        d = R.V(a, d, e, f);
        A.ec(d);
        b();
      };
      A.mh = function (a) {
        null != u.T(a) && ((a = I.V(a, null, !1)), A.ec(a));
      };
      A.Rc = function (a) {
        a = y.hh(a, null != A.jb);
        var b = D.onRoomLink;
        null != b && b(a);
      };
      u.rh = function (a) {
        var b = A.ub.get(a.na),
          c = null,
          d = null;
        null != b && ((c = b.tg), (d = b.ac.fb));
        b = D.onPlayerJoin;
        null != b && ((a = f(a)), (a.auth = c), (a.conn = d), b(a));
      };
      u.Af = function () {
        var a = D.onTeamVictory;
        null != a && null != u.C && a(e());
      };
      u.ef = function (a, b) {
        var c = D.onPlayerChat;
        return null == c ? !0 : 0 != c(f(a), b);
      };
      u.gf = function (a) {
        var b = D.onPlayerBallKick;
        null != b && b(f(a));
      };
      u.zf = function (a) {
        var b = D.onTeamGoal;
        null != b && null != u.C && b(a.R);
      };
      u.xf = function (a) {
        var b = D.onGameStart;
        null != b && b(f(a));
      };
      u.dd = function (a) {
        var b = D.onGameStop;
        null != b && b(f(a));
      };
      u.th = function (a, b) {
        var c = D.onPlayerTeamChange;
        null != c && c(f(b), f(a));
      };
      u.df = function (a, b) {
        var c = D.onPlayerAdminChange;
        null != c && c(f(b), f(a));
      };
      u.Ag = function () {
        var a = D.onGameTick;
        null != a && a();
      };
      u.ph = function (a, b) {
        var c = D[b ? "onGamePause" : "onGameUnpause"];
        null != c && c(f(a));
      };
      u.hf = function () {
        var a = D.onPositionsReset;
        null != a && a();
      };
      u.ff = function (a) {
        var b = D.onPlayerActivity;
        null != b && b(f(a));
      };
      u.vf = function (a, b) {
        var c = D.onStadiumChange;
        null != c && c(b.pa, f(a));
      };
      u.sh = function (a, c, d, e) {
        b();
        var h = D.onPlayerLeave;
        null != h && h(f(a));
        null != c &&
          ((h = null),
          null != e && (h = e.pa),
          A.yg(a.na, c, h, d),
          (h = D.onPlayerKicked),
          null != h && h(f(a), c, d, f(e)));
      };
      u.Ug = function (a, b, c, d) {
        var e = D.onKickRateLimitSet;
        null != e && e(b, c, d, f(a));
      };
      return D;
    };
    Ha.b = !0;
    Ha.prototype = {
      jg: function () {
        this.pa = H.pb(this.pa, 40);
        this.gb = H.pb(this.gb, 3);
      },
      G: function (a) {
        this.jg();
        a.sa = !0;
        a.Na(this.bi);
        a.Hf(this.pa);
        a.Hf(this.gb);
        a.Wd(this.Kc);
        a.Wd(this.Mc);
        a.f(this.jb ? 1 : 0);
        a.f(this.kh);
        a.f(this.ca);
        a.sa = !1;
      },
      h: Ha,
    };
    X.b = !0;
    X.prototype = {
      G: function (a) {
        var b = this.a;
        a.g(b.x);
        a.g(b.y);
        b = this.s;
        a.g(b.x);
        a.g(b.y);
        b = this.ma;
        a.g(b.x);
        a.g(b.y);
        a.g(this.L);
        a.g(this.i);
        a.g(this.K);
        a.g(this.ga);
        a.ya(this.S);
        a.v(this.c);
        a.v(this.m);
      },
      qa: function (a) {
        var b = this.a;
        b.x = a.o();
        b.y = a.o();
        b = this.s;
        b.x = a.o();
        b.y = a.o();
        b = this.ma;
        b.x = a.o();
        b.y = a.o();
        this.L = a.o();
        this.i = a.o();
        this.K = a.o();
        this.ga = a.o();
        this.S = a.Lb();
        this.c = a.H();
        this.m = a.H();
      },
      gh: function () {
        var a = new la();
        this.Me(a);
        return a;
      },
      Me: function (a) {
        var b = a.a,
          c = this.a;
        b.x = c.x;
        b.y = c.y;
        b = a.s;
        c = this.s;
        b.x = c.x;
        b.y = c.y;
        b = a.ma;
        c = this.ma;
        b.x = c.x;
        b.y = c.y;
        a.L = this.L;
        a.i = this.i;
        a.K = this.K;
        a.ga = this.ga;
        a.S = this.S;
        a.c = this.c;
        a.m = this.m;
      },
      h: X,
    };
    J.b = !0;
    J.Eb = [ga];
    J.prototype = {
      Rg: function (a) {
        this.ha = a;
        this.$a = a.$a;
        this.Ma = a.Ma;
        this.fa = a.fa;
        this.ia.u = this.fa.u;
        this.ia.Y = this.fa.Y;
        this.ia.I = this.fa.I;
        this.ia.Sa = this.fa.Sa;
        a = 0;
        for (var b = this.fa.w; a < b.length; ) this.ia.w.push(b[a++].gh());
        this.Oe();
      },
      Ne: function (a) {
        if (a.ja == p.oa) a.N = null;
        else {
          a.Hb = 0;
          var b = a.N;
          null == b && ((b = new la()), (a.N = b), this.ia.w.push(b));
          var c = this.fa.bc;
          b.S = 0;
          b.L = c.L;
          b.K = c.K;
          b.ga = c.ga;
          b.i = c.i;
          b.c = 39;
          b.m = a.ja.m | c.m;
          var d = a.ja == p.ka ? this.fa.Nb : this.fa.Gb;
          0 == d.length
            ? ((b.a.x = a.ja.Ee * this.fa.Wb), (b.a.y = 0))
            : ((a = b.a), (d = d[d.length - 1]), (a.x = d.x), (a.y = d.y));
          d = b.s;
          d.x = 0;
          d.y = 0;
          b = b.ma;
          c = c.ma;
          b.x = c.x;
          b.y = c.y;
        }
      },
      Ba: function (a) {
        if (0 < this.Wa) 120 > this.Wa && this.Wa--;
        else {
          var b = this.ha.Ag;
          null != b && b();
          for (var b = this.ha.ca, c = 0; c < b.length; ) {
            var d = b[c];
            ++c;
            if (null != d.N) {
              0 == (d.Hb & 16) && (d.yb = !1);
              var e = this.fa.bc;
              0 < d.kc && d.kc--;
              d.Sb < this.ha.Dd && d.Sb++;
              if (d.yb && 0 >= d.kc && 0 <= d.Sb) {
                for (var f = !1, h = 0, m = this.ia.w; h < m.length; ) {
                  var q = m[h];
                  ++h;
                  if (0 != (q.m & 64) && q != d.N) {
                    var g = q.a,
                      k = d.N.a,
                      n = g.x - k.x,
                      g = g.y - k.y,
                      k = Math.sqrt(n * n + g * g);
                    if (4 > k - q.L - d.N.L) {
                      var f = n / k,
                        n = g / k,
                        g = e.Fc,
                        l = (k = q.s),
                        q = q.K;
                      k.x = l.x + f * g * q;
                      k.y = l.y + n * g * q;
                      l = d.N;
                      q = -e.Gc;
                      k = g = l.s;
                      l = l.K;
                      g.x = k.x + f * q * l;
                      g.y = k.y + n * q * l;
                      f = !0;
                    }
                  }
                }
                f &&
                  (null != this.ha.gf && this.ha.gf(d),
                  (d.yb = !1),
                  (d.kc = this.ha.Qc),
                  (d.Sb -= this.ha.Zb));
              }
              f = d.Hb;
              m = h = 0;
              0 != (f & 1) && --m;
              0 != (f & 2) && ++m;
              0 != (f & 4) && --h;
              0 != (f & 8) && ++h;
              0 != h &&
                0 != m &&
                ((f = Math.sqrt(h * h + m * m)), (h /= f), (m /= f));
              f = d.N.s;
              q = d.yb ? e.Hc : e.oc;
              f.x += h * q;
              f.y += m * q;
              d.N.ga = d.yb ? e.Ic : e.ga;
            }
          }
          c = 0;
          d = this.ia.w;
          e = 0;
          for (h = d.length; e < h; )
            (f = e++),
              (m = d[f]),
              0 != (m.m & 128) &&
                ((J.Fe[c] = f),
                (f = J.Ve[c]),
                (m = m.a),
                (f.x = m.x),
                (f.y = m.y),
                ++c);
          this.ia.Ba(a);
          if (0 == this.Za) {
            for (a = 0; a < b.length; )
              (c = b[a]), ++a, null != c.N && (c.N.c = 39 | this.Bd.Vg);
            b = this.ia.w[0].s;
            0 < b.x * b.x + b.y * b.y && (this.Za = 1);
          } else if (1 == this.Za) {
            this.Jb += 0.016666666666666666;
            for (a = 0; a < b.length; )
              (d = b[a]), ++a, null != d.N && (d.N.c = 39);
            d = p.oa;
            b = this.ia.w;
            for (
              a = 0;
              a < c &&
              ((d = a++), (d = this.fa.lg(b[J.Fe[d]].a, J.Ve[d])), d == p.oa);

            );
            d != p.oa
              ? ((this.Za = 2),
                (this.xb = 150),
                (this.Bd = d),
                d == p.ka ? this.Fb++ : this.Mb++,
                null != this.ha.zf && this.ha.zf(d.Sc),
                null != this.ha.kf && this.ha.kf(d.R))
              : 0 < this.Ma &&
                this.Jb >= 60 * this.Ma &&
                this.Mb != this.Fb &&
                (null != this.ha.Wh && this.ha.Wh(), this.wf());
          } else if (2 == this.Za)
            this.xb--,
              0 >= this.xb &&
                ((0 < this.$a && (this.Mb >= this.$a || this.Fb >= this.$a)) ||
                (0 < this.Ma && this.Jb >= 60 * this.Ma && this.Mb != this.Fb)
                  ? this.wf()
                  : (this.Oe(), null != this.ha.hf && this.ha.hf()));
          else if (
            3 == this.Za &&
            (this.xb--, 0 >= this.xb && ((b = this.ha), null != b.C))
          ) {
            b.C = null;
            a = 0;
            for (c = b.ca; a < c.length; )
              (d = c[a]), ++a, (d.N = null), (d.Ab = 0);
            null != b.dd && b.dd(null);
          }
        }
      },
      wf: function () {
        this.xb = 300;
        this.Za = 3;
        null != this.ha.Af && this.ha.Af();
      },
      Oe: function () {
        var a = this.ha.ca;
        this.Za = 0;
        for (
          var b = this.fa.w,
            c = this.ia.w,
            d = 0,
            e = this.fa.Xc ? b.length : 1;
          d < e;

        ) {
          var f = d++;
          b[f].Me(c[f]);
        }
        b = [0, 0, 0];
        for (c = 0; c < a.length; )
          if (((d = a[c]), ++c, this.Ne(d), (e = d.ja), e != p.oa)) {
            var f = d.N.a,
              h = this.fa,
              m = b[e.R],
              q = e == p.ka ? h.Nb : h.Gb;
            0 == q.length
              ? ((q = (m + 1) >> 1),
                0 == (m & 1) && (q = -q),
                (h = h.La * e.Ee),
                (m = 55 * q))
              : (m >= q.length && (m = q.length - 1),
                (m = q[m]),
                (h = m.x),
                (m = m.y));
            f.x = h;
            f.y = m;
            b[e.R]++;
            d.Ab = b[e.R];
          }
      },
      G: function (a) {
        this.ia.G(a);
        a.v(this.xb);
        a.v(this.Za);
        a.v(this.Mb);
        a.v(this.Fb);
        a.g(this.Jb);
        a.v(this.Wa);
        a.f(this.Bd.R);
      },
      h: J,
    };
    sa.b = !0;
    sa.prototype = {
      G: function (a) {
        var b = this.F;
        a.g(b.x);
        a.g(b.y);
        b = this.J;
        a.g(b.x);
        a.g(b.y);
        a.f(this.ic.R);
      },
      qa: function (a) {
        var b = this.F;
        b.x = a.o();
        b.y = a.o();
        b = this.J;
        b.x = a.o();
        b.y = a.o();
        a = a.Jd();
        this.ic = 1 == a ? p.ka : 2 == a ? p.wa : p.oa;
      },
      h: sa,
    };
    Ba.b = !0;
    Ba.prototype = {
      G: function (a) {
        a.g(this.i);
        a.g(this.K);
        a.g(this.ga);
        a.g(this.oc);
        a.g(this.Hc);
        a.g(this.Ic);
        a.g(this.Fc);
        var b = this.ma;
        a.g(b.x);
        a.g(b.y);
        a.v(this.m);
        a.g(this.L);
        a.g(this.Gc);
      },
      qa: function (a) {
        this.i = a.o();
        this.K = a.o();
        this.ga = a.o();
        this.oc = a.o();
        this.Hc = a.o();
        this.Ic = a.o();
        this.Fc = a.o();
        var b = this.ma;
        b.x = a.o();
        b.y = a.o();
        this.m = a.H();
        this.L = a.o();
        this.Gc = a.o();
      },
      h: Ba,
    };
    Ga.b = !0;
    Ga.prototype = {
      h: Ga,
    };
    n.b = !0;
    n.qa = function (a) {
      var b = a.B();
      return 255 == b ? ((b = new n()), b.ai(a), b) : n.wd()[b];
    };
    n.wd = function () {
      if (null == n.xa) {
        n.xa = [];
        var a = new n();
        a.ib("Classic", 420, 200, 370, 170, 64, 75);
        n.xa.push(a);
        a = new n();
        a.ib("Easy", 420, 200, 370, 170, 90, 75);
        n.xa.push(a);
        a = new n();
        a.ib("Small", 420, 200, 320, 130, 55, 70);
        n.xa.push(a);
        a = new n();
        a.ib("Big", 600, 270, 550, 240, 80, 80);
        n.xa.push(a);
        a = new n();
        a.ib("Rounded", 420, 200, 370, 170, 64, 75, 75);
        n.xa.push(a);
        a = new n();
        a.Te("Hockey", 420, 204, 398, 182, 68, 120, 75, 100);
        n.xa.push(a);
        a = new n();
        a.Te("Big Hockey", 600, 270, 550, 240, 90, 160, 75, 150);
        n.xa.push(a);
        a = new n();
        a.ib("Big Easy", 600, 270, 550, 240, 95, 80);
        n.xa.push(a);
        a = new n();
        a.ib("Big Rounded", 600, 270, 550, 240, 80, 75, 100);
        n.xa.push(a);
        a = new n();
        a.ib("Huge", 750, 350, 700, 320, 100, 80);
        n.xa.push(a);
        for (var a = 0, b = n.xa.length; a < b; ) {
          var c = a++;
          n.xa[c].vd = c;
        }
      }
      return n.xa;
    };
    n.fg = function (a, b) {
      if (null != a.trait) {
        var c = b[k.l(a.trait, String)];
        if (null != c)
          for (var d = 0, e = Za.ji(c); d < e.length; ) {
            var f = e[d];
            ++d;
            null == a[f] && (a[f] = c[f]);
          }
      }
    };
    n.Ta = function (a) {
      a = k.l(a, Array);
      for (var b = 0, c = 0; c < a.length; )
        switch (a[c++]) {
          case "all":
            b |= 63;
            break;
          case "ball":
            b |= 1;
            break;
          case "blue":
            b |= 4;
            break;
          case "blueKO":
            b |= 16;
            break;
          case "c0":
            b |= 268435456;
            break;
          case "c1":
            b |= 536870912;
            break;
          case "c2":
            b |= 1073741824;
            break;
          case "c3":
            b |= -2147483648;
            break;
          case "kick":
            b |= 64;
            break;
          case "red":
            b |= 2;
            break;
          case "redKO":
            b |= 8;
            break;
          case "score":
            b |= 128;
            break;
          case "wall":
            b |= 32;
        }
      return b;
    };
    n.Lc = function (a) {
      if ("transparent" == a) return -1;
      if ("string" == typeof a) return ja.parseInt("0x" + ja.pe(a));
      if (a instanceof Array && null == a.eb)
        return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
      throw new l("Bad color");
    };
    n.dh = function (a) {
      var b = new w();
      b.a.x = k.l(a.x, t);
      b.a.y = k.l(a.y, t);
      var c = a.bCoef;
      null != c && (b.i = k.l(c, t));
      c = a.cMask;
      null != c && (b.c = n.Ta(c));
      a = a.cGroup;
      null != a && (b.m = n.Ta(a));
      return b;
    };
    n.bh = function (a, b) {
      var c = new z(),
        d = k.l(a.v1, ya);
      c.F = b[k.l(a.v0, ya)];
      c.J = b[d];
      var d = a.bias,
        e = a.bCoef,
        f = a.curve,
        h = a.curveF,
        m = a.vis,
        q = a.cMask,
        g = a.cGroup,
        l = a.color;
      null != d && (c.tb = k.l(d, t));
      null != e && (c.i = k.l(e, t));
      null != h ? (c.Ha = k.l(h, t)) : null != f && c.ab(k.l(f, t));
      null != m && (c.ua = k.l(m, Qa));
      null != q && (c.c = n.Ta(q));
      null != g && (c.m = n.Ta(g));
      null != l && (c.S = n.Lc(l));
      return c;
    };
    n.Zg = function (a, b) {
      var c = new ka(),
        d = k.l(a.d0, ya),
        e = k.l(a.d1, ya),
        f = a.color,
        h = a.strength,
        m = a.length;
      if (d >= b.length || 0 > d) throw new l(null);
      if (e >= b.length || 0 > e) throw new l(null);
      c.Ac = d;
      c.Bc = e;
      null == m
        ? ((d = b[d]),
          (m = b[e]),
          null == d || null == m
            ? (c.Ua = c.Ja = 100)
            : ((e = d.a),
              (m = m.a),
              (d = e.x - m.x),
              (e = e.y - m.y),
              (c.Ua = c.Ja = Math.sqrt(d * d + e * e))))
        : m instanceof Array && null == m.eb
        ? ((c.Ja = k.l(m[0], t)), (c.Ua = k.l(m[1], t)))
        : (c.Ua = c.Ja = k.l(m, t));
      c.hc = null == h || "rigid" == h ? 1 / 0 : k.l(h, t);
      null != f && (c.S = n.Lc(f));
      return c;
    };
    n.$g = function (a) {
      var b = new B(),
        c = k.l(a.normal, Array),
        d = k.l(c[0], t),
        c = k.l(c[1], t),
        e = b.X,
        f = Math.sqrt(d * d + c * c);
      e.x = d / f;
      e.y = c / f;
      b.la = k.l(a.dist, t);
      d = a.bCoef;
      c = a.cMask;
      a = a.cGroup;
      null != d && (b.i = k.l(d, t));
      null != c && (b.c = n.Ta(c));
      null != a && (b.m = n.Ta(a));
      return b;
    };
    n.Yg = function (a) {
      var b = new sa(),
        c = k.l(a.p0, Array),
        d = k.l(a.p1, Array),
        e = b.F;
      e.x = c[0];
      e.y = c[1];
      c = b.J;
      c.x = d[0];
      c.y = d[1];
      switch (a.team) {
        case "blue":
          a = p.wa;
          break;
        case "red":
          a = p.ka;
          break;
        default:
          throw new l("Bad team value");
      }
      b.ic = a;
      return b;
    };
    n.ah = function (a) {
      var b = new Ba(),
        c = a.bCoef,
        d = a.invMass,
        e = a.damping,
        f = a.acceleration,
        h = a.kickingAcceleration,
        m = a.kickingDamping,
        q = a.kickStrength,
        g = a.gravity,
        l = a.cGroup,
        p = a.radius;
      a = a.kickback;
      null != c && (b.i = k.l(c, t));
      null != d && (b.K = k.l(d, t));
      null != e && (b.ga = k.l(e, t));
      null != f && (b.oc = k.l(f, t));
      null != h && (b.Hc = k.l(h, t));
      null != m && (b.Ic = k.l(m, t));
      null != q && (b.Fc = k.l(q, t));
      null != g &&
        ((c = b.ma), (d = k.l(g[1], t)), (c.x = k.l(g[0], t)), (c.y = d));
      null != l && (b.m = n.Ta(l));
      null != p && (b.L = k.l(p, t));
      null != a && (b.Gc = k.l(a, t));
      return b;
    };
    n.Re = function (a, b) {
      var c = a.pos,
        d = a.speed,
        e = a.gravity,
        f = a.radius,
        h = a.bCoef,
        m = a.invMass,
        q = a.damping,
        g = a.color,
        l = a.cMask,
        p = a.cGroup;
      if (null != c) {
        var r = b.a;
        r.x = c[0];
        r.y = c[1];
      }
      null != d && ((c = b.s), (c.x = d[0]), (c.y = d[1]));
      null != e && ((d = b.ma), (d.x = e[0]), (d.y = e[1]));
      null != f && (b.L = k.l(f, t));
      null != h && (b.i = k.l(h, t));
      null != m && (b.K = k.l(m, t));
      null != q && (b.ga = k.l(q, t));
      null != g && (b.S = n.Lc(g));
      null != l && (b.c = n.Ta(l));
      null != p && (b.m = n.Ta(p));
      return b;
    };
    n.prototype = {
      Nc: function () {
        var a = new X();
        a.S = 16777215;
        a.c = 63;
        a.m = 193;
        a.L = 10;
        a.ga = 0.99;
        a.K = 1;
        a.i = 0.5;
        return a;
      },
      G: function (a) {
        a.f(this.vd);
        if (!this.Tg()) {
          a.Ca(this.pa);
          a.v(this.vc);
          a.g(this.wc);
          a.g(this.tc);
          a.g(this.uc);
          a.g(this.sc);
          a.g(this.qd);
          a.v(this.rc);
          a.g(this.Wb);
          a.g(this.yc);
          a.g(this.La);
          this.bc.G(a);
          a.Na(this.Ed);
          a.f(this.rd);
          a.f(this.sd ? 1 : 0);
          a.f(this.Xc ? 1 : 0);
          a.f(this.u.length);
          for (var b = 0, c = this.u.length; b < c; ) {
            var d = b++,
              e = this.u[d];
            e.Dc = d;
            e.G(a);
          }
          a.f(this.I.length);
          b = 0;
          for (c = this.I; b < c.length; ) c[b++].G(a);
          a.f(this.Y.length);
          b = 0;
          for (c = this.Y; b < c.length; ) c[b++].G(a);
          a.f(this.Ra.length);
          b = 0;
          for (c = this.Ra; b < c.length; ) c[b++].G(a);
          a.f(this.w.length);
          b = 0;
          for (c = this.w; b < c.length; ) c[b++].G(a);
          a.f(this.Sa.length);
          b = 0;
          for (c = this.Sa; b < c.length; ) c[b++].G(a);
          a.f(this.Nb.length);
          b = 0;
          for (c = this.Nb; b < c.length; ) (d = c[b]), ++b, a.g(d.x), a.g(d.y);
          a.f(this.Gb.length);
          b = 0;
          for (c = this.Gb; b < c.length; ) (d = c[b]), ++b, a.g(d.x), a.g(d.y);
        }
      },
      ai: function (a) {
        function b() {
          for (var b = [], c = a.B(), d = 0; d < c; ) {
            ++d;
            var e = new x(0, 0);
            e.x = a.o();
            e.y = a.o();
            b.push(e);
          }
          return b;
        }
        this.pa = a.Xa();
        this.vc = a.H();
        this.wc = a.o();
        this.tc = a.o();
        this.uc = a.o();
        this.sc = a.o();
        this.qd = a.o();
        this.rc = a.H();
        this.Wb = a.o();
        this.yc = a.o();
        this.La = a.o();
        this.bc.qa(a);
        this.Ed = a.cc();
        this.rd = a.B();
        this.sd = 0 != a.B();
        this.Xc = 0 != a.B();
        this.u = [];
        for (var c = a.B(), d = 0; d < c; ) {
          var e = new w();
          e.qa(a);
          e.Dc = d++;
          this.u.push(e);
        }
        this.I = [];
        c = a.B();
        for (d = 0; d < c; )
          ++d, (e = new z()), e.qa(a, this.u), this.I.push(e);
        this.Y = [];
        c = a.B();
        for (d = 0; d < c; ) ++d, (e = new B()), e.qa(a), this.Y.push(e);
        this.Ra = [];
        c = a.B();
        for (d = 0; d < c; ) ++d, (e = new sa()), e.qa(a), this.Ra.push(e);
        this.w = [];
        c = a.B();
        for (d = 0; d < c; ) ++d, (e = new X()), e.qa(a), this.w.push(e);
        this.Sa = [];
        c = a.B();
        for (d = 0; d < c; ) ++d, (e = new ka()), e.qa(a), this.Sa.push(e);
        this.Nb = b();
        this.Gb = b();
        this.Kb();
      },
      Kb: function () {
        for (var a = 0, b = this.I; a < b.length; ) b[a++].Kb();
      },
      Tg: function () {
        return 255 != this.vd;
      },
      Ib: function (a, b, c) {
        a = a[b];
        return null != a ? k.l(a, t) : c;
      },
      eh: function (a, b, c) {
        a = a[b];
        return null != a ? k.l(a, Qa) : c;
      },
      Xg: function (a) {
        function b(a) {
          var b = k.l(a[0], t);
          a = k.l(a[1], t);
          return new x(b, a);
        }
        function c(a, b, c, d) {
          null == d && (d = !1);
          b = e[b];
          if (!d || null != b)
            if (((d = k.l(b, Array)), null != d))
              for (b = 0; b < d.length; ) {
                var f = d[b];
                ++b;
                try {
                  n.fg(f, h), a.push(c(f));
                } catch (jb) {
                  throw new l(new Ga());
                }
              }
        }
        var d = this,
          e = JSON5.parse(a);
        this.u = [];
        this.I = [];
        this.Y = [];
        this.Ra = [];
        this.w = [];
        this.Sa = [];
        this.pa = k.l(e.name, String);
        this.Wb = k.l(e.width, t);
        this.yc = k.l(e.height, t);
        this.Ed = this.Ib(e, "maxViewWidth", 0) | 0;
        "player" == e.cameraFollow && (this.rd = 1);
        this.La = 200;
        a = e.spawnDistance;
        null != a && (this.La = k.l(a, t));
        a = e.bg;
        var f;
        switch (a.type) {
          case "grass":
            f = 1;
            break;
          case "hockey":
            f = 2;
            break;
          default:
            f = 0;
        }
        this.vc = f;
        this.wc = this.Ib(a, "width", 0);
        this.tc = this.Ib(a, "height", 0);
        this.uc = this.Ib(a, "kickOffRadius", 0);
        this.sc = this.Ib(a, "cornerRadius", 0);
        this.rc = 7441498;
        null != a.color && (this.rc = n.Lc(a.color));
        this.qd = this.Ib(a, "goalLine", 0);
        this.sd = this.eh(e, "canBeStored", !0);
        this.Xc = "full" == e.kickOffReset;
        var h = e.traits;
        a = e.ballPhysics;
        "disc0" != a &&
          (null != a
            ? ((a = n.Re(a, this.Nc())), (a.m |= 192), this.w.push(a))
            : this.w.push(this.Nc()));
        c(this.u, "vertexes", n.dh);
        c(this.I, "segments", function (a) {
          return n.bh(a, d.u);
        });
        c(this.Ra, "goals", n.Yg);
        c(this.w, "discs", function (a) {
          return n.Re(a, new X());
        });
        c(this.Y, "planes", n.$g);
        c(
          this.Sa,
          "joints",
          function (a) {
            return n.Zg(a, d.w);
          },
          !0
        );
        c(this.Nb, "redSpawnPoints", b, !0);
        c(this.Gb, "blueSpawnPoints", b, !0);
        a = e.playerPhysics;
        null != a && (this.bc = n.ah(a));
        if (
          255 < this.u.length ||
          255 < this.I.length ||
          255 < this.Y.length ||
          255 < this.Ra.length ||
          255 < this.w.length
        )
          throw new l("Error");
        this.Kb();
      },
      lg: function (a, b) {
        for (var c = 0, d = this.Ra; c < d.length; ) {
          var e = d[c];
          ++c;
          var f = e.F,
            h = e.J,
            m = b.x - a.x,
            g = b.y - a.y;
          0 < -(f.y - a.y) * m + (f.x - a.x) * g ==
          0 < -(h.y - a.y) * m + (h.x - a.x) * g
            ? (f = !1)
            : ((m = h.x - f.x),
              (h = h.y - f.y),
              (f =
                0 < -(a.y - f.y) * m + (a.x - f.x) * h ==
                0 < -(b.y - f.y) * m + (b.x - f.x) * h
                  ? !1
                  : !0));
          if (f) return e.ic;
        }
        return p.oa;
      },
      ib: function (a, b, c, d, e, f, h, m) {
        null == m && (m = 0);
        this.pa = a;
        this.w.push(this.Nc());
        this.Wb = b;
        this.yc = c;
        this.vc = 1;
        this.rc = 7441498;
        this.wc = d;
        this.tc = e;
        this.uc = h;
        this.sc = m;
        this.La = 0.75 * d;
        400 < this.La && (this.La = 400);
        a = new B();
        var g = a.X;
        g.x = 0;
        g.y = 1;
        a.la = -c;
        a.i = 0;
        this.Y.push(a);
        a = new B();
        g = a.X;
        g.x = 0;
        g.y = -1;
        a.la = -c;
        a.i = 0;
        this.Y.push(a);
        a = new B();
        g = a.X;
        g.x = 1;
        g.y = 0;
        a.la = -b;
        a.i = 0;
        this.Y.push(a);
        a = new B();
        g = a.X;
        g.x = -1;
        g.y = 0;
        a.la = -b;
        a.i = 0;
        this.Y.push(a);
        this.Oc(d, 1, f, 13421823, p.wa);
        this.Oc(-d, -1, f, 16764108, p.ka);
        this.Ue(h, c);
        b = new B();
        c = b.X;
        c.x = 0;
        c.y = 1;
        b.la = -e;
        b.c = 1;
        this.Y.push(b);
        b = new B();
        c = b.X;
        c.x = 0;
        c.y = -1;
        b.la = -e;
        b.c = 1;
        this.Y.push(b);
        b = new w();
        c = b.a;
        c.x = -d;
        c.y = -e;
        b.c = 0;
        c = new w();
        h = c.a;
        h.x = d;
        h.y = -e;
        c.c = 0;
        h = new w();
        a = h.a;
        a.x = d;
        a.y = -f;
        h.c = 0;
        a = new w();
        g = a.a;
        g.x = d;
        g.y = f;
        a.c = 0;
        var g = new w(),
          k = g.a;
        k.x = d;
        k.y = e;
        g.c = 0;
        var k = new w(),
          l = k.a;
        l.x = -d;
        l.y = e;
        k.c = 0;
        var l = new w(),
          n = l.a;
        n.x = -d;
        n.y = f;
        l.c = 0;
        var n = new w(),
          r = n.a;
        r.x = -d;
        r.y = -f;
        n.c = 0;
        f = new z();
        f.F = c;
        f.J = h;
        f.c = 1;
        f.ua = !1;
        r = new z();
        r.F = a;
        r.J = g;
        r.c = 1;
        r.ua = !1;
        var t = new z();
        t.F = k;
        t.J = l;
        t.c = 1;
        t.ua = !1;
        var v = new z();
        v.F = n;
        v.J = b;
        v.c = 1;
        v.ua = !1;
        this.u.push(b);
        this.u.push(c);
        this.u.push(h);
        this.u.push(a);
        this.u.push(g);
        this.u.push(k);
        this.u.push(l);
        this.u.push(n);
        this.I.push(f);
        this.I.push(r);
        this.I.push(t);
        this.I.push(v);
        this.Se(d, e, m);
        this.Kb();
      },
      Te: function (a, b, c, d, e, f, h, g, q) {
        this.pa = a;
        this.w.push(this.Nc());
        this.Wb = b;
        this.yc = c;
        this.vc = 2;
        this.wc = d;
        this.tc = e;
        this.uc = g;
        this.sc = q;
        this.qd = h;
        this.La = 0.75 * (d - h);
        400 < this.La && (this.La = 400);
        a = new B();
        var m = a.X;
        m.x = 0;
        m.y = 1;
        a.la = -c;
        a.i = 0;
        this.Y.push(a);
        a = new B();
        m = a.X;
        m.x = 0;
        m.y = -1;
        a.la = -c;
        a.i = 0;
        this.Y.push(a);
        a = new B();
        m = a.X;
        m.x = 1;
        m.y = 0;
        a.la = -b;
        a.i = 0;
        this.Y.push(a);
        a = new B();
        m = a.X;
        m.x = -1;
        m.y = 0;
        a.la = -b;
        a.i = 0;
        this.Y.push(a);
        this.Oc(d - h, 1, f, 13421823, p.wa, 63);
        this.Oc(-d + h, -1, f, 16764108, p.ka, 63);
        this.Ue(g, c);
        b = new B();
        c = b.X;
        c.x = 0;
        c.y = 1;
        b.la = -e;
        b.c = 1;
        this.Y.push(b);
        b = new B();
        c = b.X;
        c.x = 0;
        c.y = -1;
        b.la = -e;
        b.c = 1;
        this.Y.push(b);
        b = new B();
        c = b.X;
        c.x = 1;
        c.y = 0;
        b.la = -d;
        b.c = 1;
        this.Y.push(b);
        b = new B();
        c = b.X;
        c.x = -1;
        c.y = 0;
        b.la = -d;
        b.c = 1;
        this.Y.push(b);
        this.Se(d, e, q);
        this.Kb();
      },
      Oc: function (a, b, c, d, e, f, h) {
        null == h && (h = 32);
        null == f && (f = 1);
        var m = new w(),
          g = m.a;
        g.x = a + 8 * b;
        g.y = -c;
        var g = new w(),
          k = g.a;
        k.x = a + 8 * b;
        k.y = c;
        var l = new w(),
          k = l.a;
        k.x = m.a.x + 22 * b;
        k.y = m.a.y + 22;
        var n = new w(),
          k = n.a;
        k.x = g.a.x + 22 * b;
        k.y = g.a.y - 22;
        k = new z();
        k.F = m;
        k.J = l;
        k.ab(90 * b);
        var p = new z();
        p.F = n;
        p.J = l;
        var r = new z();
        r.F = n;
        r.J = g;
        r.ab(90 * b);
        b = this.u.length;
        this.u.push(m);
        this.u.push(g);
        this.u.push(l);
        this.u.push(n);
        m = b;
        for (b = this.u.length; m < b; )
          (g = m++), (this.u[g].c = f), (this.u[g].m = h), (this.u[g].i = 0.1);
        b = this.I.length;
        this.I.push(k);
        this.I.push(p);
        this.I.push(r);
        m = b;
        for (b = this.I.length; m < b; )
          (g = m++), (this.I[g].c = f), (this.I[g].m = h), (this.I[g].i = 0.1);
        f = new X();
        h = f.a;
        h.x = a;
        h.y = -c;
        f.K = 0;
        f.L = 8;
        f.S = d;
        this.w.push(f);
        f = new X();
        h = f.a;
        h.x = a;
        h.y = c;
        f.K = 0;
        f.L = 8;
        f.S = d;
        this.w.push(f);
        d = new sa();
        f = d.F;
        f.x = a;
        f.y = -c;
        f = d.J;
        f.x = a;
        f.y = c;
        d.ic = e;
        this.Ra.push(d);
      },
      Ue: function (a, b) {
        var c = new w(),
          d = c.a;
        d.x = 0;
        d.y = -b;
        c.i = 0.1;
        c.m = 24;
        c.c = 6;
        var d = new w(),
          e = d.a;
        e.x = 0;
        e.y = -a;
        d.i = 0.1;
        d.m = 24;
        d.c = 6;
        var e = new w(),
          f = e.a;
        f.x = 0;
        f.y = a;
        e.i = 0.1;
        e.m = 24;
        e.c = 6;
        var f = new w(),
          h = f.a;
        h.x = 0;
        h.y = b;
        f.i = 0.1;
        f.m = 24;
        f.c = 6;
        h = new z();
        h.F = c;
        h.J = d;
        h.m = 24;
        h.c = 6;
        h.ua = !1;
        h.i = 0.1;
        var g = new z();
        g.F = e;
        g.J = f;
        g.m = 24;
        g.c = 6;
        g.ua = !1;
        g.i = 0.1;
        var k = new z();
        k.F = d;
        k.J = e;
        k.m = 8;
        k.c = 6;
        k.ua = !1;
        k.ab(180);
        k.i = 0.1;
        var l = new z();
        l.F = e;
        l.J = d;
        l.m = 16;
        l.c = 6;
        l.ua = !1;
        l.ab(180);
        l.i = 0.1;
        this.u.push(c);
        this.u.push(d);
        this.u.push(e);
        this.u.push(f);
        this.I.push(h);
        this.I.push(g);
        this.I.push(k);
        this.I.push(l);
      },
      Se: function (a, b, c) {
        if (!(0 >= c)) {
          var d = new w(),
            e = d.a;
          e.x = -a + c;
          e.y = -b;
          d.c = 0;
          var e = new w(),
            f = e.a;
          f.x = -a;
          f.y = -b + c;
          e.c = 0;
          var f = new w(),
            h = f.a;
          h.x = -a + c;
          h.y = b;
          f.c = 0;
          var h = new w(),
            g = h.a;
          g.x = -a;
          g.y = b - c;
          h.c = 0;
          var g = new w(),
            k = g.a;
          k.x = a - c;
          k.y = b;
          g.c = 0;
          var k = new w(),
            l = k.a;
          l.x = a;
          l.y = b - c;
          k.c = 0;
          var l = new w(),
            n = l.a;
          n.x = a - c;
          n.y = -b;
          l.c = 0;
          var n = new w(),
            p = n.a;
          p.x = a;
          p.y = -b + c;
          n.c = 0;
          a = new z();
          a.F = d;
          a.J = e;
          a.c = 1;
          a.ua = !1;
          a.i = 1;
          a.ab(-90);
          b = new z();
          b.F = f;
          b.J = h;
          b.c = 1;
          b.ua = !1;
          b.i = 1;
          b.ab(90);
          c = new z();
          c.F = g;
          c.J = k;
          c.c = 1;
          c.ua = !1;
          c.i = 1;
          c.ab(-90);
          p = new z();
          p.F = l;
          p.J = n;
          p.c = 1;
          p.ua = !1;
          p.i = 1;
          p.ab(90);
          this.u.push(d);
          this.u.push(e);
          this.u.push(f);
          this.u.push(h);
          this.u.push(g);
          this.u.push(k);
          this.u.push(l);
          this.u.push(n);
          this.I.push(a);
          this.I.push(b);
          this.I.push(c);
          this.I.push(p);
        }
      },
      h: n,
    };
    W.b = !0;
    W.prototype = {
      G: function (a) {
        a.f(this.xe);
        a.v(this.Td);
        a.f(this.Pa.length);
        for (var b = 0, c = this.Pa; b < c.length; ) a.v(c[b++]);
      },
      qa: function (a) {
        this.xe = a.B();
        this.Td = a.H();
        var b = a.B();
        if (3 < b) throw new l("too many");
        this.Pa = [];
        for (var c = 0; c < b; ) ++c, this.Pa.push(a.H());
      },
      h: W,
    };
    p.b = !0;
    p.prototype = {
      h: p,
    };
    Aa.b = !0;
    Aa.Eb = [ga, Ma];
    Aa.prototype = {
      Sh: function (a) {
        if (null == this.C) {
          this.C = new J();
          for (var b = 0, c = this.ca; b < c.length; ) {
            var d = c[b];
            ++b;
            d.N = null;
            d.Ab = 0;
          }
          this.C.Rg(this);
          null != this.xf && this.xf(a);
        }
      },
      zc: function (a, b, c) {
        if (b.ja != c) {
          b.ja = c;
          G.remove(this.ca, b);
          this.ca.push(b);
          if (null != this.C) {
            null != b.N && (G.remove(this.C.ia.w, b.N), (b.N = null));
            this.C.Ne(b);
            for (var d = 0, e = !1; !e; ) {
              ++d;
              for (var e = !0, f = 0, h = this.ca; f < h.length; ) {
                var g = h[f];
                ++f;
                if (g != b && g.ja == b.ja && g.Ab == d) {
                  e = !1;
                  break;
                }
              }
            }
            b.Ab = d;
          }
          Ia.va(this.th, a, b, c);
        }
      },
      T: function (a) {
        for (var b = 0, c = this.ca; b < c.length; ) {
          var d = c[b];
          ++b;
          if (d.na == a) return d;
        }
        return null;
      },
      Ba: function (a) {
        null != this.C && this.C.Ba(a);
      },
      G: function (a) {
        a.Ca(this.Ld);
        a.f(this.Sd ? 1 : 0);
        a.v(this.$a);
        a.v(this.Ma);
        a.Xd(this.Dd);
        a.f(this.Zb);
        a.f(this.Qc);
        this.fa.G(a);
        a.f(null != this.C ? 1 : 0);
        null != this.C && this.C.G(a);
        a.f(this.ca.length);
        for (var b = 0, c = this.ca; b < c.length; ) c[b++].P(a);
        this.jc[1].G(a);
        this.jc[2].G(a);
      },
      Ie: function () {
        var a = 0,
          b = r.ba();
        this.G(b);
        for (b = b.Zh(); 4 <= b.j.byteLength - b.a; ) a ^= b.H();
        return a;
      },
      Cg: function () {
        var a = r.ba(4);
        a.v(this.Ie());
        return a.Vd();
      },
      pg: function (a) {
        a = new C(new DataView(a)).H();
        ua.va(this.wi, this.Ie() != a);
      },
      uf: function (a) {
        this.kf = a;
      },
      Aa: function (a) {
        if (0 == a) return !0;
        a = this.T(a);
        return null != a && a.Rb ? !0 : !1;
      },
      Oh: function (a, b, c, d) {
        this.Qc = 0 > b ? 0 : 255 < b ? 255 : b;
        this.Zb = 0 > c ? 0 : 255 < c ? 255 : c;
        d = 0 > d ? 0 : 100 < d ? 100 : d;
        this.Dd = this.Zb * d;
        Da.va(this.Ug, a, this.Qc, this.Zb, d);
      },
      h: Aa,
    };
    ra.b = !0;
    ra.Eb = [ga];
    ra.prototype = {
      P: function (a) {
        a.f(this.Rb ? 1 : 0);
        a.v(this.Ab);
        a.Ca(this.zb);
        a.Ca(this.If);
        a.f(this.ce ? 1 : 0);
        a.Ca(this.ae);
        a.v(this.ki);
        a.Ca(this.pa);
        a.v(this.Hb);
        a.Da(this.na);
        a.f(this.yb ? 1 : 0);
        a.Xd(this.Sb);
        a.f(this.kc);
        a.f(this.ja.R);
        a.Xd(null == this.N ? -1 : this.N.cf);
      },
      h: ra,
    };
    qa.b = !0;
    qa.M = g;
    qa.prototype = v(g.prototype, {
      apply: function (a) {
        var b = a.T(this.A);
        null != b && this.ge != b.ce && ((b.ce = this.ge), ua.va(a.yi, b));
      },
      P: function (a) {
        a.f(this.ge ? 1 : 0);
      },
      W: function (a) {
        this.ge = 0 != a.B();
      },
      h: qa,
    });
    U.b = !0;
    U.V = function (a, b, c, d) {
      var e = new U();
      e.Oa = a;
      e.color = b;
      e.style = c;
      e.oe = d;
      return e;
    };
    U.M = g;
    U.prototype = v(g.prototype, {
      apply: function (a) {
        0 == this.A && Da.va(a.Ai, this.Oa, this.color, this.style, this.oe);
      },
      P: function (a) {
        a.Qb(H.pb(this.Oa, 1e3));
        a.v(this.color);
        a.f(this.style);
        a.f(this.oe);
      },
      W: function (a) {
        this.Oa = a.kb();
        if (1e3 < this.Oa.length) throw new l("message too long");
        this.color = a.H();
        this.style = a.B();
        this.oe = a.B();
      },
      h: U,
    });
    pa.b = !0;
    pa.M = g;
    pa.prototype = v(g.prototype, {
      apply: function (a) {
        if (a.Aa(this.A, 1)) {
          for (
            var b = a.T(this.A), c = a.ca, d = [], e = 0, f = 0, h = 0;
            h < c.length;

          ) {
            var g = c[h];
            ++h;
            g.ja == p.oa && d.push(g);
            g.ja == p.ka ? ++e : g.ja == p.wa && ++f;
          }
          c = d.length;
          0 != c &&
            (f == e
              ? 2 > c || (a.zc(b, d[0], p.ka), a.zc(b, d[1], p.wa))
              : a.zc(b, d[0], f > e ? p.ka : p.wa));
        }
      },
      P: function () {},
      W: function () {},
      h: pa,
    });
    L.b = !0;
    L.V = function (a, b) {
      var c = new L();
      c.ne = a;
      c.newValue = b;
      return c;
    };
    L.M = g;
    L.prototype = v(g.prototype, {
      apply: function (a) {
        if (a.Aa(this.A, 2) && null == a.C)
          switch (this.ne) {
            case 0:
              var b = this.newValue;
              a.$a = 0 > b ? 0 : 99 < b ? 99 : b;
              break;
            case 1:
              (b = this.newValue), (a.Ma = 0 > b ? 0 : 99 < b ? 99 : b);
          }
      },
      P: function (a) {
        a.v(this.ne);
        a.v(this.newValue);
      },
      W: function (a) {
        this.ne = a.H();
        this.newValue = a.H();
      },
      h: L,
    });
    T.b = !0;
    T.V = function (a, b) {
      var c = new T();
      c.Bb = a;
      c.kd = b;
      return c;
    };
    T.M = g;
    T.prototype = v(g.prototype, {
      apply: function (a) {
        if (a.Aa(this.A, 4)) {
          var b = a.T(this.A),
            c = a.T(this.Bb);
          null != c &&
            0 != c.na &&
            c.Rb != this.kd &&
            ((c.Rb = this.kd), null != a.df && a.df(b, c));
        }
      },
      P: function (a) {
        a.v(this.Bb);
        a.f(this.kd ? 1 : 0);
      },
      W: function (a) {
        this.Bb = a.H();
        this.kd = 0 != a.B();
      },
      h: T,
    });
    oa.b = !0;
    oa.M = g;
    oa.prototype = v(g.prototype, {
      apply: function (a) {
        a = a.T(this.A);
        null != a && (a.zb = this.Ea);
      },
      P: function (a) {
        a.Ca(this.Ea);
      },
      W: function (a) {
        this.Ea = a.Xa();
        null != this.Ea && (this.Ea = H.pb(this.Ea, 2));
      },
      h: oa,
    });
    S.b = !0;
    S.V = function (a, b) {
      var c = new S();
      c.Bb = a;
      c.he = b;
      return c;
    };
    S.M = g;
    S.prototype = v(g.prototype, {
      apply: function (a) {
        var b = a.T(this.Bb);
        if (null != b) {
          var c = a.T(this.A),
            d = a.Aa(this.A, 1);
          (d = d || (b == c && !a.Sd && null == a.C)) && a.zc(c, b, this.he);
        }
      },
      P: function (a) {
        a.v(this.Bb);
        a.f(this.he.R);
      },
      W: function (a) {
        this.Bb = a.H();
        a = a.Jd();
        this.he = 1 == a ? p.ka : 2 == a ? p.wa : p.oa;
      },
      h: S,
    });
    K.b = !0;
    K.V = function (a) {
      var b = new K();
      b.md = a;
      return b;
    };
    K.M = g;
    K.prototype = v(g.prototype, {
      apply: function (a) {
        if (a.Aa(this.A, 8)) {
          var b = a.T(this.A);
          null == a.C && ((a.fa = this.md), null != a.vf && a.vf(b, this.md));
        }
      },
      P: function (a) {
        var b = r.ba();
        this.md.G(b);
        b = pako.deflateRaw(b.nb());
        a.Na(b.byteLength);
        a.ob(b);
      },
      W: function (a) {
        a = pako.inflateRaw(a.Ka(a.cc()));
        this.md = n.qa(
          new C(new DataView(a.buffer, a.byteOffset, a.byteLength))
        );
      },
      h: K,
    });
    da.b = !0;
    da.M = g;
    da.prototype = v(g.prototype, {
      apply: function (a) {
        a.Aa(this.A, 2) && this.ja != p.oa && (a.jc[this.ja.R] = this.jd);
      },
      P: function (a) {
        a.f(this.ja.R);
        this.jd.G(a);
      },
      W: function (a) {
        var b = a.Jd();
        this.ja = 1 == b ? p.ka : 2 == b ? p.wa : p.oa;
        this.jd = new W();
        this.jd.qa(a);
      },
      h: da,
    });
    ca.b = !0;
    ca.M = g;
    ca.prototype = v(g.prototype, {
      apply: function (a) {
        a.Aa(this.A, 2) && (a.Sd = this.newValue);
      },
      P: function (a) {
        a.f(this.newValue ? 1 : 0);
      },
      W: function (a) {
        this.newValue = 0 != a.B();
      },
      h: ca,
    });
    R.b = !0;
    R.V = function (a, b, c, d) {
      var e = new R();
      e.na = a;
      e.name = b;
      e.be = c;
      e.zb = d;
      return e;
    };
    R.M = g;
    R.prototype = v(g.prototype, {
      apply: function (a) {
        if (0 == this.A) {
          var b = new ra();
          b.na = this.na;
          b.pa = this.name;
          b.ae = this.be;
          b.zb = this.zb;
          a.ca.push(b);
          a = a.rh;
          null != a && a(b);
        }
      },
      P: function (a) {
        a.v(this.na);
        a.Ca(this.name);
        a.Ca(this.be);
        a.Ca(this.zb);
      },
      W: function (a) {
        this.na = a.H();
        this.name = a.Xa();
        this.be = a.Xa();
        this.zb = a.Xa();
      },
      h: R,
    });
    Q.b = !0;
    Q.V = function (a, b) {
      var c = new Q();
      c.Ea = null != b ? H.pb(b, 2) : null;
      c.rb = a;
      return c;
    };
    Q.M = g;
    Q.prototype = v(g.prototype, {
      apply: function (a) {
        a = a.T(this.rb);
        null != a && 0 == this.A && (a.If = this.Ea);
      },
      P: function (a) {
        a.Ca(this.Ea);
        a.v(this.rb);
      },
      W: function (a) {
        this.Ea = a.Xa();
        this.rb = a.H();
        null != this.Ea && (this.Ea = H.pb(this.Ea, 2));
      },
      h: Q,
    });
    ba.b = !0;
    ba.M = g;
    ba.prototype = v(g.prototype, {
      apply: function (a) {
        var b = a.C;
        if (null != b && a.Aa(this.A, 16)) {
          var c = a.T(this.A),
            d = 120 == b.Wa,
            e = 0 < b.Wa;
          this.mc ? (b.Wa = 120) : 120 == b.Wa && (b.Wa = 119);
          d != this.mc && Ia.va(a.ph, c, this.mc, e);
        }
      },
      P: function (a) {
        a.f(this.mc ? 1 : 0);
      },
      W: function (a) {
        this.mc = 0 != a.B();
      },
      h: ba,
    });
    aa.b = !0;
    aa.M = g;
    aa.prototype = v(g.prototype, {
      Rf: function (a) {
        if (null != a.ef) {
          var b = a.T(this.A);
          return null == b ? !1 : a.ef(b, this.Oa);
        }
        return !0;
      },
      apply: function (a) {
        var b = a.T(this.A);
        null != b && Ea.va(a.xi, b, this.Oa);
      },
      P: function (a) {
        a.Qb(H.pb(this.Oa, 140));
      },
      W: function (a) {
        this.Oa = a.kb();
        if (140 < this.Oa.length) throw new l("message too long");
      },
      h: aa,
    });
    na.b = !0;
    na.M = g;
    na.prototype = v(g.prototype, {
      apply: function (a) {
        var b = a.T(this.A);
        if (null != b) {
          var c = this.input;
          0 == (b.Hb & 16) && 0 != (c & 16) && (b.yb = !0);
          b.Hb = c;
          null != a.ff && a.ff(b);
        }
      },
      P: function (a) {
        a.ya(this.input);
      },
      W: function (a) {
        this.input = a.Lb();
      },
      h: na,
    });
    ma.b = !0;
    ma.M = g;
    ma.prototype = v(g.prototype, {
      apply: function (a) {
        var b = a.T(this.A);
        null != b && Ea.va(a.zi, b, this.Sf);
      },
      P: function (a) {
        a.f(this.Sf);
      },
      W: function (a) {
        this.Sf = a.B();
      },
      h: ma,
    });
    Sa.b = !0;
    Sa.mi = function () {
      g.aa(U);
      g.aa(ma);
      g.aa(ha);
      g.aa(na);
      g.aa(aa);
      g.aa(R);
      g.aa(I);
      g.aa(Z);
      g.aa(Y);
      g.aa(ba);
      g.aa(L);
      g.aa(K);
      g.aa(S);
      g.aa(ca);
      g.aa(T);
      g.aa(pa);
      g.aa(qa);
      g.aa(N);
      g.aa(oa);
      g.aa(da);
      g.aa(P);
      g.aa(O);
      g.aa(Q);
      g.aa(E);
    };
    I.b = !0;
    I.V = function (a, b, c) {
      var d = new I();
      d.na = a;
      d.qb = b;
      d.gd = c;
      return d;
    };
    I.M = g;
    I.prototype = v(g.prototype, {
      apply: function (a) {
        if (0 != this.na && a.Aa(this.A, 128)) {
          var b = a.T(this.na);
          if (null != b) {
            var c = a.T(this.A);
            G.remove(a.ca, b);
            null != a.C && G.remove(a.C.ia.w, b.N);
            Da.va(a.sh, b, this.qb, this.gd, c);
          }
        }
      },
      P: function (a) {
        null != this.qb && (this.qb = H.pb(this.qb, 100));
        a.v(this.na);
        a.Ca(this.qb);
        a.f(this.gd ? 1 : 0);
      },
      W: function (a) {
        this.na = a.H();
        this.qb = a.Xa();
        this.gd = 0 != a.B();
        if (null != this.qb && 100 < this.qb.length)
          throw new l("string too long");
      },
      h: I,
    });
    P.b = !0;
    P.V = function (a, b) {
      for (var c = new P(), d = new Set(), e = 0; e < a.length; ) d.add(a[e++]);
      a = [];
      for (var e = 0, d = d.values(), f = d.next(); !f.done; ) {
        var h = f.value,
          f = d.next();
        a.push(h);
        ++e;
        if (40 <= e) break;
      }
      c.lc = a;
      c.ie = b;
      return c;
    };
    P.M = g;
    P.prototype = v(g.prototype, {
      apply: function (a) {
        if (0 == this.A) {
          for (var b = new Map(), c = 0, d = a.ca; c < d.length; ) {
            var e = d[c];
            ++c;
            b.set(e.na, e);
          }
          c = [];
          d = 0;
          for (e = this.lc; d < e.length; ) {
            var f = e[d];
            ++d;
            var h = b.get(f);
            null != h && (b["delete"](f), c.push(h));
          }
          d = [];
          b = b.values();
          for (e = b.next(); !e.done; )
            (f = e.value), (e = b.next()), d.push(f);
          a.ca = this.ie ? c.concat(d) : d.concat(c);
        }
      },
      P: function (a) {
        a.f(this.ie ? 1 : 0);
        a.f(this.lc.length);
        for (var b = 0, c = this.lc; b < c.length; ) a.v(c[b++]);
      },
      W: function (a) {
        this.ie = 0 != a.B();
        var b = a.B();
        this.lc = [];
        for (var c = 0; c < b; ) ++c, this.lc.push(a.H());
      },
      h: P,
    });
    E.b = !0;
    E.Pf = function (a, b, c) {
      var d = new E();
      d.rb = a;
      d.ee = b;
      d.O = [
        c.x,
        c.y,
        c.xspeed,
        c.yspeed,
        c.xgravity,
        c.ygravity,
        c.radius,
        c.bCoeff,
        c.invMass,
        c.damping,
      ];
      d.za = [c.color, c.cMask, c.cGroup];
      a = 0;
      for (b = d.O.length; a < b; ) {
        c = a++;
        var e = d.O[c];
        null != e && ((E.Lf[0] = e), (d.O[c] = E.Lf[0]));
      }
      a = 0;
      for (b = d.za.length; a < b; )
        (c = a++),
          (e = d.za[c]),
          null != e && ((E.Of[0] = e), (d.za[c] = E.Of[0]));
      return d;
    };
    E.M = g;
    E.prototype = v(g.prototype, {
      apply: function (a) {
        if (0 == this.A) {
          var b = a.C;
          if (null != b) {
            if (this.ee) {
              a = a.T(this.rb);
              if (null == a) return;
              a = a.N;
            } else a = b.ia.w[this.rb];
            null != a &&
              (null != this.O[0] && (a.a.x = this.O[0]),
              null != this.O[1] && (a.a.y = this.O[1]),
              null != this.O[2] && (a.s.x = this.O[2]),
              null != this.O[3] && (a.s.y = this.O[3]),
              null != this.O[4] && (a.ma.x = this.O[4]),
              null != this.O[5] && (a.ma.y = this.O[5]),
              null != this.O[6] && (a.L = this.O[6]),
              null != this.O[7] && (a.i = this.O[7]),
              null != this.O[8] && (a.K = this.O[8]),
              null != this.O[9] && (a.ga = this.O[9]),
              null != this.za[0] && (a.S = this.za[0]),
              null != this.za[1] && (a.c = this.za[1]),
              null != this.za[2] && (a.m = this.za[2]));
          }
        }
      },
      P: function (a) {
        a.v(this.rb);
        a.f(this.ee ? 1 : 0);
        var b = a.a;
        a.Na(0);
        for (var c = 0, d = 1, e = 0, f = this.O; e < f.length; ) {
          var h = f[e];
          ++e;
          null != h && ((c |= d), a.Wd(h));
          d <<= 1;
        }
        e = 0;
        for (f = this.za; e < f.length; )
          (h = f[e]), ++e, null != h && ((c |= d), a.v(h)), (d <<= 1);
        d = a.a;
        a.a = b;
        a.Na(c);
        a.a = d;
      },
      W: function (a) {
        this.rb = a.H();
        this.ee = 0 != a.B();
        var b = a.cc();
        this.O = [];
        for (var c = 0; 10 > c; ) {
          var d = c++;
          this.O[d] = null;
          0 != (b & 1) && (this.O[d] = a.Bh());
          b >>>= 1;
        }
        this.za = [];
        for (c = 0; 3 > c; )
          (d = c++),
            (this.za[d] = null),
            0 != (b & 1) && (this.za[d] = a.H()),
            (b >>>= 1);
      },
      h: E,
    });
    O.b = !0;
    O.V = function (a, b, c) {
      var d = new O();
      d.min = a;
      d.le = b;
      d.$d = c;
      return d;
    };
    O.M = g;
    O.prototype = v(g.prototype, {
      apply: function (a) {
        a.Aa(this.A, 2) && a.Oh(a.T(this.A), this.min, this.le, this.$d);
      },
      P: function (a) {
        a.v(this.min);
        a.v(this.le);
        a.v(this.$d);
      },
      W: function (a) {
        this.min = a.H();
        this.le = a.H();
        this.$d = a.H();
      },
      h: O,
    });
    Z.b = !0;
    Z.M = g;
    Z.prototype = v(g.prototype, {
      apply: function (a) {
        a.Aa(this.A, 32) && a.Sh(a.T(this.A), 0);
      },
      P: function () {},
      W: function () {},
      h: Z,
    });
    Y.b = !0;
    Y.M = g;
    Y.prototype = v(g.prototype, {
      apply: function (a) {
        if (a.Aa(this.A, 32)) {
          var b = a.T(this.A);
          if (null != a.C) {
            a.C = null;
            for (var c = 0, d = a.ca; c < d.length; ) {
              var e = d[c];
              ++c;
              e.N = null;
              e.Ab = 0;
            }
            null != a.dd && a.dd(b);
          }
        }
      },
      P: function () {},
      W: function () {},
      h: Y,
    });
    N.b = !0;
    N.V = function (a) {
      for (var b = new N(), c = a.Fa.ca, d = [], e = 0; e < c.length; ) {
        var f = a.ub.get(c[e++].na);
        d.push(null == f ? 0 : f.Tc);
      }
      b.Tb = d;
      return b;
    };
    N.M = g;
    N.prototype = v(g.prototype, {
      apply: function (a) {
        if (0 == this.A) {
          a = a.ca;
          for (var b = 0, c = a.length; b < c; ) {
            var d = b++;
            if (d >= this.Tb.length) break;
            a[d].Tc = this.Tb[d];
          }
        }
      },
      P: function (a) {
        a.Da(this.Tb.length);
        for (var b = 0, c = this.Tb; b < c.length; ) a.Da(c[b++]);
      },
      W: function (a) {
        this.Tb = [];
        for (var b = a.lb(), c = 0; c < b; ) ++c, this.Tb.push(a.lb());
      },
      h: N,
    });
    la.b = !0;
    la.Eb = [ga];
    la.prototype = {
      G: function (a) {
        var b = this.a;
        a.g(b.x);
        a.g(b.y);
        b = this.s;
        a.g(b.x);
        a.g(b.y);
        b = this.ma;
        a.g(b.x);
        a.g(b.y);
        a.g(this.L);
        a.g(this.i);
        a.g(this.K);
        a.g(this.ga);
        a.ya(this.S);
        a.v(this.c);
        a.v(this.m);
      },
      ng: function (a) {
        var b = this.a,
          c = a.a,
          d = b.x - c.x,
          b = b.y - c.y,
          e = a.L + this.L,
          f = d * d + b * b;
        if (0 < f && f <= e * e) {
          var f = Math.sqrt(f),
            d = d / f,
            b = b / f,
            c = this.K / (this.K + a.K),
            e = e - f,
            f = e * c,
            h = this.a,
            g = this.a;
          h.x = g.x + d * f;
          h.y = g.y + b * f;
          g = h = a.a;
          e -= f;
          h.x = g.x - d * e;
          h.y = g.y - b * e;
          e = this.s;
          f = a.s;
          e = d * (e.x - f.x) + b * (e.y - f.y);
          0 > e &&
            ((e *= this.i * a.i + 1),
            (c *= e),
            (h = f = this.s),
            (f.x = h.x - d * c),
            (f.y = h.y - b * c),
            (a = f = a.s),
            (c = e - c),
            (f.x = a.x + d * c),
            (f.y = a.y + b * c));
        }
      },
      og: function (a) {
        var b, c, d;
        if (0 != 0 * a.Ha) {
          b = a.F.a;
          var e = a.J.a;
          c = e.x - b.x;
          var f = e.y - b.y,
            h = this.a;
          d = h.x - e.x;
          e = h.y - e.y;
          h = this.a;
          if (0 >= (h.x - b.x) * c + (h.y - b.y) * f || 0 <= d * c + e * f)
            return;
          c = a.X;
          b = c.x;
          c = c.y;
          d = b * d + c * e;
        } else {
          c = a.Yb;
          d = this.a;
          b = d.x - c.x;
          c = d.y - c.y;
          d = a.bd;
          e = a.cd;
          if ((0 < d.x * b + d.y * c && 0 < e.x * b + e.y * c) == 0 >= a.Ha)
            return;
          e = Math.sqrt(b * b + c * c);
          if (0 == e) return;
          d = e - a.Ce;
          b /= e;
          c /= e;
        }
        e = a.tb;
        if (0 == e) 0 > d && ((d = -d), (b = -b), (c = -c));
        else if ((0 > e && ((e = -e), (d = -d), (b = -b), (c = -c)), d < -e))
          return;
        d >= this.L ||
          ((d = this.L - d),
          (f = e = this.a),
          (e.x = f.x + b * d),
          (e.y = f.y + c * d),
          (d = this.s),
          (d = b * d.x + c * d.y),
          0 > d &&
            ((d *= this.i * a.i + 1),
            (e = a = this.s),
            (a.x = e.x - b * d),
            (a.y = e.y - c * d)));
      },
      h: la,
    };
    ka.b = !0;
    ka.Eb = [ga];
    ka.prototype = {
      G: function (a) {
        a.f(this.Ac);
        a.f(this.Bc);
        a.g(this.Ja);
        a.g(this.Ua);
        a.g(this.hc);
        a.v(this.S);
      },
      qa: function (a) {
        this.Ac = a.B();
        this.Bc = a.B();
        this.Ja = a.o();
        this.Ua = a.o();
        this.hc = a.o();
        this.S = a.H();
      },
      Ba: function (a) {
        var b = a[this.Ac];
        a = a[this.Bc];
        if (null != b && null != a) {
          var c = b.a,
            d = a.a,
            e = c.x - d.x,
            c = c.y - d.y,
            f = Math.sqrt(e * e + c * c);
          if (!(0 >= f)) {
            e /= f;
            c /= f;
            d = b.K / (b.K + a.K);
            d != d && (d = 0.5);
            var h, g;
            if (this.Ja >= this.Ua) (h = this.Ja), (g = 0);
            else if (f <= this.Ja) (h = this.Ja), (g = 1);
            else if (f >= this.Ua) (h = this.Ua), (g = -1);
            else return;
            f = h - f;
            if (0 == 0 * this.hc)
              (d = this.hc * f * 0.5),
                (e *= d),
                (c *= d),
                (g = d = b.s),
                (b = b.K),
                (d.x = g.x + e * b),
                (d.y = g.y + c * b),
                (d = b = a.s),
                (a = a.K),
                (b.x = d.x + -e * a),
                (b.y = d.y + -c * a);
            else {
              h = f * d;
              var k = b.a,
                l = b.a;
              k.x = l.x + e * h * 0.5;
              k.y = l.y + c * h * 0.5;
              l = k = a.a;
              f -= h;
              k.x = l.x - e * f * 0.5;
              k.y = l.y - c * f * 0.5;
              f = b.s;
              h = a.s;
              f = e * (f.x - h.x) + c * (f.y - h.y);
              0 >= f * g &&
                ((d *= f),
                (b = g = b.s),
                (g.x = b.x - e * d),
                (g.y = b.y - c * d),
                (a = b = a.s),
                (d = f - d),
                (b.x = a.x + e * d),
                (b.y = a.y + c * d));
            }
          }
        }
      },
      h: ka,
    };
    za.b = !0;
    za.Eb = [ga];
    za.prototype = {
      G: function (a) {
        a.f(this.w.length);
        for (var b = 0, c = this.w.length; b < c; ) {
          var d = b++,
            e = this.w[d];
          e.cf = d;
          e.G(a);
        }
      },
      Ba: function (a) {
        for (var b = 0, c = this.w; b < c.length; ) {
          var d = c[b];
          ++b;
          var e = d.a,
            f = d.a,
            h = d.s;
          e.x = f.x + h.x * a;
          e.y = f.y + h.y * a;
          f = e = d.s;
          h = d.ma;
          d = d.ga;
          e.x = (f.x + h.x) * d;
          e.y = (f.y + h.y) * d;
        }
        a = 0;
        for (b = this.w.length; a < b; ) {
          d = a++;
          c = this.w[d];
          d += 1;
          for (e = this.w.length; d < e; )
            (f = this.w[d++]), 0 != (f.c & c.m) && 0 != (f.m & c.c) && c.ng(f);
          if (0 != c.K) {
            d = 0;
            for (e = this.Y; d < e.length; )
              if (((f = e[d]), ++d, 0 != (f.c & c.m) && 0 != (f.m & c.c))) {
                var h = f.X,
                  g = c.a,
                  h = f.la - (h.x * g.x + h.y * g.y) + c.L;
                if (0 < h) {
                  var k = (g = c.a),
                    l = f.X;
                  g.x = k.x + l.x * h;
                  g.y = k.y + l.y * h;
                  h = c.s;
                  g = f.X;
                  h = h.x * g.x + h.y * g.y;
                  0 > h &&
                    ((h *= c.i * f.i + 1),
                    (k = g = c.s),
                    (f = f.X),
                    (g.x = k.x - f.x * h),
                    (g.y = k.y - f.y * h));
                }
              }
            d = 0;
            for (e = this.I; d < e.length; )
              (f = e[d]), ++d, 0 != (f.c & c.m) && 0 != (f.m & c.c) && c.og(f);
            d = 0;
            for (e = this.u; d < e.length; )
              if (
                ((f = e[d]),
                ++d,
                0 != (f.c & c.m) &&
                  0 != (f.m & c.c) &&
                  ((g = c.a),
                  (k = f.a),
                  (h = g.x - k.x),
                  (g = g.y - k.y),
                  (k = h * h + g * g),
                  0 < k && k <= c.L * c.L))
              ) {
                var k = Math.sqrt(k),
                  h = h / k,
                  g = g / k,
                  k = c.L - k,
                  n = (l = c.a);
                l.x = n.x + h * k;
                l.y = n.y + g * k;
                k = c.s;
                k = h * k.x + g * k.y;
                0 > k &&
                  ((k *= c.i * f.i + 1),
                  (l = f = c.s),
                  (f.x = l.x - h * k),
                  (f.y = l.y - g * k));
              }
          }
        }
        for (a = 0; 2 > a; )
          for (++a, b = 0, c = this.Sa; b < c.length; ) c[b++].Ba(this.w);
      },
      h: za,
    };
    B.b = !0;
    B.prototype = {
      G: function (a) {
        var b = this.X;
        a.g(b.x);
        a.g(b.y);
        a.g(this.la);
        a.g(this.i);
        a.v(this.c);
        a.v(this.m);
      },
      qa: function (a) {
        var b = this.X;
        b.x = a.o();
        b.y = a.o();
        this.la = a.o();
        this.i = a.o();
        this.c = a.H();
        this.m = a.H();
      },
      h: B,
    };
    z.b = !0;
    z.prototype = {
      G: function (a) {
        var b = 0,
          c = a.a;
        a.f(0);
        a.f(this.F.Dc);
        a.f(this.J.Dc);
        0 != this.tb && ((b = 1), a.g(this.tb));
        this.Ha != 1 / 0 && ((b |= 2), a.g(this.Ha));
        0 != this.S && ((b |= 4), a.v(this.S));
        this.ua && (b |= 8);
        a.j.setUint8(c, b);
        a.g(this.i);
        a.v(this.c);
        a.v(this.m);
      },
      qa: function (a, b) {
        var c = a.B();
        this.F = b[a.B()];
        this.J = b[a.B()];
        this.tb = 0 != (c & 1) ? a.o() : 0;
        this.Ha = 0 != (c & 2) ? a.o() : 1 / 0;
        this.S = 0 != (c & 4) ? a.H() : 0;
        this.ua = 0 != (c & 8);
        this.i = a.o();
        this.c = a.H();
        this.m = a.H();
      },
      ab: function (a) {
        a *= 0.017453292519943295;
        if (0 > a) {
          a = -a;
          var b = this.F;
          this.F = this.J;
          this.J = b;
          this.tb = -this.tb;
        }
        a > z.Wf && a < z.Vf && (this.Ha = 1 / Math.tan(a / 2));
      },
      Kb: function () {
        if (0 == 0 * this.Ha) {
          var a = this.J.a,
            b = this.F.a,
            c = 0.5 * (a.x - b.x),
            a = 0.5 * (a.y - b.y),
            b = this.F.a,
            d = this.Ha;
          this.Yb = new x(b.x + c + -a * d, b.y + a + c * d);
          a = this.F.a;
          b = this.Yb;
          c = a.x - b.x;
          a = a.y - b.y;
          this.Ce = Math.sqrt(c * c + a * a);
          c = this.F.a;
          a = this.Yb;
          this.bd = new x(-(c.y - a.y), c.x - a.x);
          c = this.Yb;
          a = this.J.a;
          this.cd = new x(-(c.y - a.y), c.x - a.x);
          0 >= this.Ha &&
            ((a = c = this.bd),
            (c.x = -a.x),
            (c.y = -a.y),
            (a = c = this.cd),
            (c.x = -a.x),
            (c.y = -a.y));
        } else
          (a = this.F.a),
            (b = this.J.a),
            (c = a.x - b.x),
            (a = -(a.y - b.y)),
            (b = Math.sqrt(a * a + c * c)),
            (this.X = new x(a / b, c / b));
      },
      h: z,
    };
    w.b = !0;
    w.prototype = {
      G: function (a) {
        var b = this.a;
        a.g(b.x);
        a.g(b.y);
        a.g(this.i);
        a.v(this.c);
        a.v(this.m);
      },
      qa: function (a) {
        var b = this.a;
        b.x = a.o();
        b.y = a.o();
        this.i = a.o();
        this.c = a.H();
        this.m = a.H();
      },
      h: w,
    };
    l.b = !0;
    l.vi = function (a) {
      return a instanceof Error ? a : new l(a);
    };
    l.M = Error;
    l.prototype = v(Error.prototype, {
      h: l,
    });
    k.b = !0;
    k.Mf = function (a) {
      if (a instanceof Array && null == a.eb) return Array;
      var b = a.h;
      if (null != b) return b;
      a = k.te(a);
      return null != a ? k.ag(a) : null;
    };
    k.Ub = function (a, b) {
      if (null == a) return "null";
      if (5 <= b.length) return "<...>";
      var c = typeof a;
      "function" == c && (a.b || a.se) && (c = "object");
      switch (c) {
        case "function":
          return "<function>";
        case "object":
          if (a.eb) {
            var d = Oa[a.eb],
              c = d.Yf[a.yd],
              e = d[c];
            if (e.ue) {
              b += "\t";
              for (var c = c + "(", d = [], f = 0, e = e.ue; f < e.length; ) {
                var g = e[f];
                ++f;
                d.push(k.Ub(a[g], b));
              }
              return c + d.join(",") + ")";
            }
            return c;
          }
          if (a instanceof Array) {
            c = a.length;
            d = "[";
            b += "\t";
            for (f = 0; f < c; )
              (e = f++), (d += (0 < e ? "," : "") + k.Ub(a[e], b));
            return d + "]";
          }
          try {
            d = a.toString;
          } catch (m) {
            return "???";
          }
          if (
            null != d &&
            d != Object.toString &&
            "function" == typeof d &&
            ((c = a.toString()), "[object Object]" != c)
          )
            return c;
          c = null;
          d = "{\n";
          b += "\t";
          f = null != a.hasOwnProperty;
          for (c in a)
            (f && !a.hasOwnProperty(c)) ||
              "prototype" == c ||
              "__class__" == c ||
              "__super__" == c ||
              "__interfaces__" == c ||
              "__properties__" == c ||
              (2 != d.length && (d += ", \n"),
              (d += b + c + " : " + k.Ub(a[c], b)));
          b = b.substring(1);
          return d + ("\n" + b + "}");
        case "string":
          return a;
        default:
          return String(a);
      }
    };
    k.pd = function (a, b) {
      if (null == a) return !1;
      if (a == b) return !0;
      var c = a.Eb;
      if (null != c)
        for (var d = 0, e = c.length; d < e; ) {
          var f = c[d++];
          if (f == b || k.pd(f, b)) return !0;
        }
      return k.pd(a.M, b);
    };
    k.Zf = function (a, b) {
      if (null == b) return !1;
      switch (b) {
        case Array:
          return a instanceof Array ? null == a.eb : !1;
        case Qa:
          return "boolean" == typeof a;
        case fb:
          return !0;
        case t:
          return "number" == typeof a;
        case ya:
          return "number" == typeof a ? (a | 0) === a : !1;
        case String:
          return "string" == typeof a;
        default:
          if (null != a)
            if ("function" == typeof b) {
              if (a instanceof b || k.pd(k.Mf(a), b)) return !0;
            } else {
              if ("object" == typeof b && k.$f(b) && a instanceof b) return !0;
            }
          else return !1;
          return (b == gb && null != a.b) || (b == hb && null != a.se)
            ? !0
            : Oa[a.eb] == b;
      }
    };
    k.l = function (a, b) {
      if (k.Zf(a, b)) return a;
      throw new l("Cannot cast " + ja.pe(a) + " to " + ja.pe(b));
    };
    k.te = function (a) {
      a = k.cg.call(a).slice(8, -1);
      return "Object" == a || "Function" == a || "Math" == a || "JSON" == a
        ? null
        : a;
    };
    k.$f = function (a) {
      return null != k.te(a);
    };
    k.ag = function (a) {
      return cb[a];
    };
    Ra.b = !0;
    Ra.ri = function (a, b) {
      var c = new Uint8Array(this, a, null == b ? null : b - a),
        d = new Uint8Array(c.byteLength);
      d.set(c);
      return d.buffer;
    };
    var db = 0;
    null == String.fromCodePoint &&
      (String.fromCodePoint = function (a) {
        return 65536 > a
          ? String.fromCharCode(a)
          : String.fromCharCode((a >> 10) + 55232) +
              String.fromCharCode((a & 1023) + 56320);
      });
    String.prototype.h = String;
    String.b = !0;
    Array.b = !0;
    var ya = {},
      fb = {},
      t = Number,
      Qa = Boolean,
      gb = {},
      hb = {};
    p.oa = new p(0, 16777215, 0, -1, "Spectators", 0, 0, 0);
    p.ka = new p(1, 15035990, -1, 8, "Red", 0, 0, 2);
    p.wa = new p(2, 5671397, 1, 16, "Blue", 0, 0, 4);
    p.oa.Sc = p.oa;
    p.ka.Sc = p.wa;
    p.wa.Sc = p.ka;
    Object.defineProperty(l.prototype, "message", {
      get: function () {
        return String(this.Db);
      },
    });
    null == ArrayBuffer.prototype.slice &&
      (ArrayBuffer.prototype.slice = Ra.ri);
    wa.qg = {
      mandatory: {
        OfferToReceiveAudio: !1,
        OfferToReceiveVideo: !1,
      },
    };
    V.eg = {
      name: "ECDSA",
      namedCurve: "P-256",
    };
    V.Qh = {
      name: "ECDSA",
      hash: {
        name: "SHA-256",
      },
    };
    g.Nf = new Map();
    g.Yd = 0;
    ha.U = g.$({
      da: !1,
      Z: !1,
    });
    Ta.ii = [
      {
        name: "ro",
        reliable: !0,
        je: !0,
      },
      {
        name: "ru",
        reliable: !0,
        je: !1,
      },
      {
        name: "uu",
        reliable: !1,
        je: !1,
      },
    ];
    F.Uf = "application/x-www-form-urlencoded";
    ta.ye = "https://www.haxball.com/rs/";
    ta.Ad = [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ];
    y.Ge = new M();
    y.tf = !1;
    J.Ve = (function () {
      for (var a = [], b = 0; 256 > b; ) ++b, a.push(new x(0, 0));
      return a;
    })(this);
    J.Fe = (function () {
      for (var a = [], b = 0; 256 > b; ) ++b, a.push(0);
      return a;
    })(this);
    qa.U = g.$({
      da: !1,
      Z: !1,
    });
    U.U = g.$({
      da: !1,
      Z: !1,
      me: {
        Zd: 10,
        qe: 900,
      },
    });
    pa.U = g.$({
      da: !1,
      Z: !1,
    });
    L.U = g.$({
      da: !1,
      Z: !1,
    });
    T.U = g.$({
      da: !1,
      Z: !1,
    });
    oa.U = g.$({
      da: !1,
      Z: !1,
    });
    S.U = g.$({
      da: !1,
      Z: !1,
    });
    K.U = g.$({
      da: !1,
      Z: !1,
      me: {
        Zd: 10,
        qe: 2e3,
      },
    });
    da.U = g.$({
      da: !1,
      Z: !1,
    });
    ca.U = g.$({
      da: !1,
      Z: !1,
    });
    R.U = g.$({
      da: !1,
      Z: !1,
    });
    Q.U = g.$({
      da: !1,
      Z: !1,
    });
    ba.U = g.$({});
    aa.U = g.$({
      da: !1,
      Z: !1,
      me: {
        Zd: 10,
        qe: 900,
      },
    });
    na.U = g.$({});
    ma.U = g.$({
      da: !1,
      Z: !1,
    });
    I.U = g.$({
      da: !1,
      Z: !1,
    });
    P.U = g.$({
      da: !1,
      Z: !1,
    });
    E.U = g.$({
      da: !1,
      Z: !1,
    });
    E.Lf = new Float32Array(1);
    E.Of = new Int32Array(1);
    O.U = g.$({
      da: !1,
      Z: !1,
    });
    Z.U = g.$({
      da: !1,
      Z: !1,
    });
    Y.U = g.$({
      da: !1,
      Z: !1,
    });
    N.U = g.$({
      da: !1,
      Z: !1,
    });
    z.Wf = 0.17435839227423353;
    z.Vf = 5.934119456780721;
    k.cg = {}.toString;
    y.fh();
  })();
});

module.exports = headless;
