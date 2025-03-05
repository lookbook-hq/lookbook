(() => {
  // node_modules/@iframe-resizer/child/index.umd.js
  !function(e) {
    "function" == typeof define && define.amd ? define(e) : e();
  }(function() {
    "use strict";
    const e = "5.3.3", t = 10, n = "data-iframe-size", o = "data-overflowed", i = "bottom", r = "right", a = "resizeParent", l = (e2, t2, n2, o2) => e2.addEventListener(t2, n2, o2 || false), s = ["<iy><yi>Puchspk Spjluzl Rlf</><iy><iy>", "<iy><yi>Tpzzpun Spjluzl Rlf</><iy><iy>", "Aopz spiyhyf pz hchpshisl dpao ivao Jvttlyjphs huk Vwlu-Zvbyjl spjluzlz.<iy><iy><i>Jvttlyjphs Spjluzl</><iy>Mvy jvttlyjphs bzl, <p>pmyhtl-ylzpgly</> ylxbpylz h svd jvza vul aptl spjluzl mll. Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.<iy><iy><i>Vwlu Zvbyjl Spjluzl</><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-jvttlyjphs vwlu zvbyjl wyvqlja aolu fvb jhu bzl pa mvy myll bukly aol alytz vm aol NWS C3 Spjluzl. Av jvumpyt fvb hjjlwa aolzl alytz, wslhzl zla aol <i>spjluzl</> rlf pu <p>pmyhtl-ylzpgly</> vwapvuz av <i>NWSc3</>.<iy><iy>Mvy tvyl pumvythapvu wslhzl zll: <b>oaawz://pmyhtl-ylzpgly.jvt/nws</>", "<i>NWSc3 Spjluzl Clyzpvu</><iy><iy>Aopz clyzpvu vm <p>pmyhtl-ylzpgly</> pz ilpun bzlk bukly aol alytz vm aol <i>NWS C3</> spjluzl. Aopz spjluzl hssvdz fvb av bzl <p>pmyhtl-ylzpgly</> pu Vwlu Zvbyjl wyvqljaz, iba pa ylxbpylz fvby wyvqlja av il wbispj, wyvcpkl haaypibapvu huk il spjluzlk bukly clyzpvu 3 vy shaly vm aol NUB Nlulyhs Wbispj Spjluzl.<iy><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-vwlu zvbyjl wyvqlja vy dlizpal, fvb dpss ullk av wbyjohzl h svd jvza vul aptl jvttlyjphs spjluzl.<iy><iy>Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>."];
    Object.fromEntries(["2cgs7fdf4xb", "1c9ctcccr4z", "1q2pc4eebgb", "ueokt0969w", "w2zxchhgqz", "1umuxblj2e5"].map((e2, t2) => [e2, Math.max(0, t2 - 1)]));
    const c = (e2) => ((e3) => e3.replaceAll(/[A-Za-z]/g, (e4) => String.fromCodePoint((e4 <= "Z" ? 90 : 122) >= (e4 = e4.codePointAt(0) + 19) ? e4 : e4 - 26)))(s[e2]), d = (e2) => e2, u = 1e5, m = (e2) => Math.round(e2 * u) / u;
    let f = "", p = false;
    const h = (e2) => {
      f = e2.id, p = e2.logging;
    }, g = (e2) => "" != `${e2}` && void 0 !== e2;
    const y = (...e2) => [`[iframe-resizer][${f || "child"}]`, ...e2].join(" "), b = (...e2) => p && console?.info(`%c[iframe-resizer][${f}]%c`, "font-weight: bold;", "font-weight: normal;", ...e2), v = (...e2) => console?.warn(y(...e2)), w = (...e2) => console?.warn((/* @__PURE__ */ ((e3) => (t2) => window.chrome ? e3(t2.replaceAll("<br>", "\n").replaceAll("<rb>", "\x1B[31;1m").replaceAll("</>", "\x1B[m").replaceAll("<b>", "\x1B[1m").replaceAll("<i>", "\x1B[3m").replaceAll("<u>", "\x1B[4m")) : e3(t2.replaceAll("<br>", "\n").replaceAll(/<[/a-z]+>/gi, "")))(y))(...e2)), z = (e2) => w(e2), S = (e2, t2 = "renamed to") => (n2, o2, i2 = "") => w(`<rb>Deprecated ${e2}</>

The <b>${n2}</> ${e2.toLowerCase()} has been ${t2} <b>${o2}</>. ${i2}Use of the old ${e2.toLowerCase()} will be removed in a future version of <i>iframe-resizer</>.`), E = S("Method"), j = S("Method", "replaced with"), $ = S("Option"), C = (e2) => {
      const t2 = e2.side || i, n2 = e2.onChange || d, r2 = { root: e2.root, rootMargin: "0px", threshold: 1 };
      function a2() {
        const e3 = document.querySelectorAll(`[${o}]`);
        n2(e3);
      }
      const l2 = new IntersectionObserver(function(e3) {
        for (const n3 of e3) {
          const { boundingClientRect: e4, rootBounds: i2, target: r3 } = n3, a3 = e4[t2], l3 = 0 === a3 || a3 > i2[t2];
          r3.toggleAttribute(o, l3);
        }
        requestAnimationFrame(a2);
      }, r2), s2 = /* @__PURE__ */ new WeakSet();
      return function(e3) {
        for (const t3 of e3)
          t3.nodeType !== Node.ELEMENT_NODE || s2.has(t3) || (l2.observe(t3), s2.add(t3));
      };
    }, O = "--ifr-start", M = "--ifr-end", P = "--ifr-measure", T = [], A = /* @__PURE__ */ new WeakSet(), N = (e2) => "object" == typeof e2 && A.add(e2);
    let k, I = {};
    const R = setInterval(() => {
      if (T.length < 10)
        return;
      if (I.hasTags && I.len < 25)
        return;
      T.sort();
      const e2 = Math.min(T.reduce((e3, t2) => e3 + t2, 0) / T.length, T[Math.floor(T.length / 2)]);
      e2 <= 4 || (clearInterval(R), w(`<rb>Performance Warning</>

Calculating the page size is taking an excessive amount of time (${m(e2)}ms).

To improve performance add the <b>data-iframe-size</> attribute to the ${I.Side.toLowerCase()} most element on the page. For more details see: <u>https://iframe-resizer.com/perf</>.`));
    }, 5e3);
    function x(e2) {
      e2.getEntries().forEach((e3) => {
        if (e3.name === M) {
          const { duration: t2 } = performance.measure(P, O, M);
          !function(e4, t3) {
            const { Side: n2, len: o2, hasTags: i2, logging: r2 } = e4;
            I = e4, A.has(k) || i2 && o2 <= 1 || !k || (r2 || N(k), b(`
  ${n2} position calculated from:`, k, `
  Parsed ${o2} ${i2 ? "tagged" : "potentially overflowing"} elements in ${m(t3)}ms`));
          }(e3.detail, t2), T.push(t2), T.length > 100 && T.shift();
        }
      });
    }
    function q() {
      new PerformanceObserver(x).observe({ entryTypes: ["mark"] }), N(document.documentElement), N(document.body);
    }
    "undefined" != typeof document && "undefined" != typeof PerformanceObserver && ("loading" === document.readyState ? document.addEventListener("DOMContentLoaded", q) : q()), "undefined" != typeof window && function() {
      const o2 = { contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true }, s2 = { height: () => (v("Custom height calculation function not defined"), De.auto()), width: () => (v("Custom width calculation function not defined"), Fe.auto()) }, u2 = { bodyOffset: 1, bodyScroll: 1, offset: 1, documentElementOffset: 1, documentElementScroll: 1, boundingClientRect: 1, max: 1, min: 1, grow: 1, lowestElement: 1 }, f2 = 128, p2 = {}, y2 = "checkVisibility" in window, b2 = "auto", S2 = "[iFrameSizer]", P2 = S2.length, T2 = { max: 1, min: 1, bodyScroll: 1, documentElementScroll: 1 }, A2 = "scroll";
      let N2, I2, R2, x2, q2, L = true, B = "", W = 0, D = "", F = "", V = true, U = false, J = true, H = false, Z = false, Q = 1, _ = b2, X = true, Y = "", G = {}, K = false, ee = 0, te = false, ne = "", oe = d, ie = [], re = "child", ae = null, le = false, se = "", ce = [], de = window.parent, ue = "*", me = 0, fe = false, pe = "", he = 1, ge = A2, ye = window, be = () => {
        v("onMessage function not defined");
      }, ve = () => {
      }, we = null, ze = null;
      function Se() {
        var o3, d2, u3;
        !function() {
          const e2 = (e3) => "true" === e3, t2 = Y.slice(P2).split(":");
          ne = t2[0], W = void 0 === t2[1] ? W : Number(t2[1]), U = void 0 === t2[2] ? U : e2(t2[2]), K = void 0 === t2[3] ? K : e2(t2[3]), L = void 0 === t2[6] ? L : e2(t2[6]), D = t2[7], _ = void 0 === t2[8] ? _ : t2[8], B = t2[9], F = t2[10], me = void 0 === t2[11] ? me : Number(t2[11]), G.enable = void 0 !== t2[12] && e2(t2[12]), re = void 0 === t2[13] ? re : t2[13], ge = void 0 === t2[14] ? ge : t2[14], te = void 0 === t2[15] ? te : e2(t2[15]), N2 = void 0 === t2[16] ? N2 : Number(t2[16]), I2 = void 0 === t2[17] ? I2 : Number(t2[17]), V = void 0 === t2[18] ? V : e2(t2[18]), t2[19], pe = t2[20] || pe, ee = void 0 === t2[21] ? ee : Number(t2[21]);
        }(), h({ id: ne, logging: K }), function() {
          function e2(e3) {
            be = e3?.onMessage || be, ve = e3?.onReady || ve, "number" == typeof e3?.offset && ($("offset", "offsetSize"), V && (N2 = e3?.offset), U && (I2 = e3?.offset)), "number" == typeof e3?.offsetSize && (V && (N2 = e3?.offsetSize), U && (I2 = e3?.offsetSize)), Object.prototype.hasOwnProperty.call(e3, "sizeSelector") && (se = e3.sizeSelector), ue = e3?.targetOrigin || ue, _ = e3?.heightCalculationMethod || _, ge = e3?.widthCalculationMethod || ge;
          }
          function t2(e3, t3) {
            return "function" == typeof e3 && (s2[t3] = e3, e3 = "custom"), e3;
          }
          if (1 === ee)
            return;
          const n2 = window.iframeResizer || window.iFrameResizer;
          "object" == typeof n2 && (e2(n2), _ = t2(_, "height"), ge = t2(ge, "width"));
        }(), function() {
          try {
            le = "iframeParentListener" in window.parent;
          } catch (e2) {
          }
        }(), ee < 0 ? z(`${c(ee + 2)}${c(2)}`) : pe.codePointAt(0) > 4 || ee < 2 && z(c(3)), pe && "" !== pe && "false" !== pe ? pe !== e && w(`<b>Version mismatch</>

The parent and child pages are running different versions of <i>iframe resizer</>.

Parent page: ${pe} - Child page: ${e}.
`) : w("<rb>Legacy version detected on parent page</>\n\nDetected legacy version of parent page script. It is recommended to update the parent page to use <b>@iframe-resizer/parent</>.\n\nSee <u>https://iframe-resizer.com/setup/</> for more details.\n"), Te(), Ae(), function() {
          let e2 = false;
          const t2 = (t3) => document.querySelectorAll(`[${t3}]`).forEach((o4) => {
            e2 = true, o4.removeAttribute(t3), o4.toggleAttribute(n, true);
          });
          t2("data-iframe-height"), t2("data-iframe-width"), e2 && w("<rb>Deprecated Attributes</>\n          \nThe <b>data-iframe-height</> and <b>data-iframe-width</> attributes have been deprecated and replaced with the single <b>data-iframe-size</> attribute. Use of the old attributes will be removed in a future version of <i>iframe-resizer</>.");
        }(), "BackCompat" === document.compatMode && w("<rb>Quirks Mode Detected</>\n\nThis iframe is running in the browser's legacy <b>Quirks Mode</>, this may cause issues with the correct operation of <i>iframe-resizer</>. It is recommended that you switch to the modern <b>Standards Mode</>.\n\nFor more information see <u>https://iframe-resizer.com/quirks-mode</>.\n"), je(), V !== U && (oe = C({ onChange: Ee, root: document.documentElement, side: V ? i : r })), 1 !== ee && (ye.parentIframe = Object.freeze({ autoResize: (e2) => (true === e2 && false === L ? (L = true, Je("autoResizeEnabled", "Auto Resize enabled")) : false === e2 && true === L && (L = false), _e(0, 0, "autoResize", JSON.stringify(L)), L), close() {
          _e(0, 0, "close");
        }, getId: () => ne, getOrigin: () => (E("getOrigin()", "getParentOrigin()"), R2), getParentOrigin: () => R2, getPageInfo(e2) {
          if ("function" == typeof e2)
            return we = e2, _e(0, 0, "pageInfo"), void j("getPageInfo()", "getParentProps()", "See <u>https://iframe-resizer.com/upgrade</> for details. ");
          we = null, _e(0, 0, "pageInfoStop");
        }, getParentProps(e2) {
          if ("function" != typeof e2)
            throw new TypeError("parentIframe.getParentProps(callback) callback not a function");
          return ze = e2, _e(0, 0, "parentInfo"), () => {
            ze = null, _e(0, 0, "parentInfoStop");
          };
        }, getParentProperties(e2) {
          E("getParentProperties()", "getParentProps()"), this.getParentProps(e2);
        }, moveToAnchor(e2) {
          G.findTarget(e2);
        }, reset() {
          Qe();
        }, scrollBy(e2, t2) {
          _e(t2, e2, "scrollBy");
        }, scrollTo(e2, t2) {
          _e(t2, e2, "scrollTo");
        }, scrollToOffset(e2, t2) {
          _e(t2, e2, "scrollToOffset");
        }, sendMessage(e2, t2) {
          _e(0, 0, "message", JSON.stringify(e2), t2);
        }, setHeightCalculationMethod(e2) {
          _ = e2, Te();
        }, setWidthCalculationMethod(e2) {
          ge = e2, Ae();
        }, setTargetOrigin(e2) {
          ue = e2;
        }, resize(e2, t2) {
          Je(a, `parentIframe.resize(${e2 || ""}${t2 ? `,${t2}` : ""})`, e2, t2);
        }, size(e2, t2) {
          E("size()", "resize()"), this.resize(e2, t2);
        } }), ye.parentIFrame = ye.parentIframe), function() {
          function e2(e3) {
            _e(0, 0, e3.type, `${e3.screenY}:${e3.screenX}`);
          }
          function t2(t3, n2) {
            l(window.document, t3, e2);
          }
          true === te && (t2("mouseenter"), t2("mouseleave"));
        }(), G = function() {
          const e2 = () => ({ x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop });
          function n2(n3) {
            const o5 = n3.getBoundingClientRect(), i3 = e2();
            return { x: parseInt(o5.left, t) + parseInt(i3.x, t), y: parseInt(o5.top, t) + parseInt(i3.y, t) };
          }
          function o4(e3) {
            function t2(e4) {
              const t3 = n2(e4);
              _e(t3.y, t3.x, "scrollToOffset");
            }
            const o5 = e3.split("#")[1] || e3, i3 = decodeURIComponent(o5), r3 = document.getElementById(i3) || document.getElementsByName(i3)[0];
            void 0 === r3 ? _e(0, 0, "inPageLink", `#${o5}`) : t2(r3);
          }
          function i2() {
            const { hash: e3, href: t2 } = window.location;
            "" !== e3 && "#" !== e3 && o4(t2);
          }
          function r2() {
            for (const e3 of document.querySelectorAll('a[href^="#"]'))
              "#" !== e3.getAttribute("href") && l(e3, "click", (t2) => {
                t2.preventDefault(), o4(e3.getAttribute("href"));
              });
          }
          function a2() {
            l(window, "hashchange", i2);
          }
          function s3() {
            setTimeout(i2, f2);
          }
          function c2() {
            r2(), a2(), s3();
          }
          return G.enable && (1 === ee ? w("In page linking requires a Professional or Business license. Please see <u>https://iframe-resizer.com/pricing</> for more details.") : c2()), { findTarget: o4 };
        }(), $e(qe(document)()), void 0 === D && (D = `${W}px`), Ce("margin", (d2 = "margin", (u3 = D).includes("-") && (v(`Negative CSS value ignored for ${d2}`), u3 = ""), u3)), Ce("background", B), Ce("padding", F), function() {
          const e2 = document.createElement("div");
          e2.style.clear = "both", e2.style.display = "block", e2.style.height = "0", document.body.append(e2);
        }(), function() {
          const e2 = (e3) => e3.style.setProperty("height", "auto", "important");
          e2(document.documentElement), e2(document.body);
        }(), Oe(), Je("init", "Init message from host page", void 0, void 0, e), document.title && "" !== document.title && _e(0, 0, "title", document.title), Me({ method: o3 = "add", eventType: "After Print", eventName: "afterprint" }), Me({ method: o3, eventType: "Before Print", eventName: "beforeprint" }), Me({ method: o3, eventType: "Ready State Change", eventName: "readystatechange" }), function() {
          const e2 = /* @__PURE__ */ new Set();
          let t2 = false, n2 = 0, o4 = [];
          const i2 = (t3) => {
            for (const n3 of t3) {
              const { addedNodes: t4, removedNodes: o5 } = n3;
              for (const n4 of t4)
                e2.add(n4);
              for (const t5 of o5)
                e2.delete(t5);
            }
          }, r2 = 16, a2 = 2, l2 = 200;
          let s3 = 1;
          function c2() {
            const d4 = performance.now(), u5 = d4 - n2;
            if (u5 > r2 * s3++ + a2 && u5 < l2)
              return setTimeout(c2, r2 * s3), void (n2 = d4);
            s3 = 1, o4.forEach(i2), o4 = [], 0 !== e2.size ? (Oe(), je(), $e(e2), e2.forEach(Ie), e2.clear(), t2 = false) : t2 = false;
          }
          function d3(e3) {
            o4.push(e3), t2 || (n2 = performance.now(), t2 = true, requestAnimationFrame(c2));
          }
          function u4() {
            const e3 = new window.MutationObserver(d3), t3 = document.querySelector("body"), n3 = { attributes: false, attributeOldValue: false, characterData: false, characterDataOldValue: false, childList: true, subtree: true };
            return e3.observe(t3, n3), e3;
          }
          u4();
        }(), ae = new ResizeObserver(Ne), ae.observe(document.body), ke.add(document.body), Ie(document.body), setTimeout(ve);
      }
      function Ee(e2) {
        ie = e2, H = ie.length > 0, Je("overflowChanged", "Overflow updated");
      }
      function je() {
        ce = document.querySelectorAll(`[${n}]`), Z = ce.length > 0;
      }
      function $e(e2) {
        Z || oe(e2);
      }
      function Ce(e2, t2) {
        void 0 !== t2 && "" !== t2 && "null" !== t2 && document.body.style.setProperty(e2, t2);
      }
      function Oe() {
        if ("" !== se)
          for (const e2 of document.querySelectorAll(se))
            e2.dataset.iframeSize = true;
      }
      function Me(e2) {
        ({ add(t2) {
          function n2() {
            Je(e2.eventName, e2.eventType);
          }
          p2[t2] = n2, l(window, t2, n2, { passive: true });
        }, remove(e3) {
          const t2 = p2[e3];
          var n2, o3;
          delete p2[e3], n2 = e3, o3 = t2, window.removeEventListener(n2, o3, false);
        } })[e2.method](e2.eventName);
      }
      function Pe(e2, t2, n2, o3) {
        return t2 !== e2 && (e2 in n2 || (v(`${e2} is not a valid option for ${o3}CalculationMethod.`), e2 = t2), e2 in u2 && w(`<rb>Deprecated ${o3}CalculationMethod (${e2})</>

This version of <i>iframe-resizer</> can auto detect the most suitable ${o3} calculation method. It is recommended that you remove this option.`)), e2;
      }
      function Te() {
        _ = Pe(_, b2, De, "height");
      }
      function Ae() {
        ge = Pe(ge, A2, Fe, "width");
      }
      function Ne(e2) {
        Array.isArray(e2) && 0 !== e2.length && Je("resizeObserver", `Resize Observed: ${function(e3) {
          switch (true) {
            case !g(e3):
              return "";
            case g(e3.id):
              return `${e3.nodeName.toUpperCase()}#${e3.id}`;
            case g(e3.name):
              return `${e3.nodeName.toUpperCase()} (${e3.name})`;
            default:
              return e3.nodeName.toUpperCase() + (g(e3.className) ? `.${e3.className}` : "");
          }
        }(e2[0].target)}`);
      }
      const ke = /* @__PURE__ */ new WeakSet();
      function Ie(e2) {
        if (e2.nodeType !== Node.ELEMENT_NODE)
          return;
        if (!ke.has(e2)) {
          const t3 = getComputedStyle(e2)?.position;
          "" !== t3 && "static" !== t3 && (ae.observe(e2), ke.add(e2));
        }
        const t2 = qe(e2)();
        for (const e3 of t2) {
          if (ke.has(e3) || e3?.nodeType !== Node.ELEMENT_NODE)
            continue;
          const t3 = getComputedStyle(e3)?.position;
          "" !== t3 && "static" !== t3 && (ae.observe(e3), ke.add(e3));
        }
      }
      function Re(e2) {
        performance.mark(O);
        const t2 = (n2 = e2).charAt(0).toUpperCase() + n2.slice(1);
        var n2;
        let i2 = 0, r2 = document.documentElement, a2 = Z ? 0 : document.documentElement.getBoundingClientRect().bottom;
        const l2 = Z ? ce : H ? ie : qe(document)();
        let s3 = l2.length;
        for (const t3 of l2)
          Z || !y2 || t3.checkVisibility(o2) ? (i2 = t3.getBoundingClientRect()[e2] + parseFloat(getComputedStyle(t3).getPropertyValue(`margin-${e2}`)), i2 > a2 && (a2 = i2, r2 = t3)) : s3 -= 1;
        return k = r2, performance.mark(M, { detail: { Side: t2, len: s3, hasTags: Z, logging: K } }), a2;
      }
      const xe = (e2) => [e2.bodyOffset(), e2.bodyScroll(), e2.documentElementOffset(), e2.documentElementScroll(), e2.boundingClientRect()], qe = (e2) => () => e2.querySelectorAll("* :not(head):not(meta):not(base):not(title):not(script):not(link):not(style):not(map):not(area):not(option):not(optgroup):not(template):not(track):not(wbr):not(nobr)"), Le = { height: 0, width: 0 }, Be = { height: 0, width: 0 };
      function We(e2) {
        function t2() {
          return Be[o3] = i2, Le[o3] = l2, i2;
        }
        const n2 = e2 === De, o3 = n2 ? "height" : "width", i2 = e2.boundingClientRect(), r2 = Math.ceil(i2), a2 = Math.floor(i2), l2 = ((e3) => e3.documentElementScroll() + Math.max(0, e3.getOffset()))(e2);
        switch (true) {
          case !e2.enabled():
            return l2;
          case Z:
            return e2.taggedElement();
          case (!H && 0 === Be[o3] && 0 === Le[o3]):
            return t2();
          case (fe && i2 === Be[o3] && l2 === Le[o3]):
            return Math.max(i2, l2);
          case 0 === i2:
            return l2;
          case (!H && i2 !== Be[o3] && l2 <= Le[o3]):
            return t2();
          case !n2:
            return e2.taggedElement();
          case (!H && i2 < Be[o3]):
          case (l2 === a2 || l2 === r2):
          case i2 > l2:
            return t2();
        }
        return Math.max(e2.taggedElement(), t2());
      }
      const De = { enabled: () => V, getOffset: () => N2, auto: () => We(De), bodyOffset: () => {
        const { body: e2 } = document, n2 = getComputedStyle(e2);
        return e2.offsetHeight + parseInt(n2.marginTop, t) + parseInt(n2.marginBottom, t);
      }, bodyScroll: () => document.body.scrollHeight, offset: () => De.bodyOffset(), custom: () => s2.height(), documentElementOffset: () => document.documentElement.offsetHeight, documentElementScroll: () => document.documentElement.scrollHeight, boundingClientRect: () => Math.max(document.documentElement.getBoundingClientRect().bottom, document.body.getBoundingClientRect().bottom), max: () => Math.max(...xe(De)), min: () => Math.min(...xe(De)), grow: () => De.max(), lowestElement: () => Re(i), taggedElement: () => Re(i) }, Fe = { enabled: () => U, getOffset: () => I2, auto: () => We(Fe), bodyScroll: () => document.body.scrollWidth, bodyOffset: () => document.body.offsetWidth, custom: () => s2.width(), documentElementScroll: () => document.documentElement.scrollWidth, documentElementOffset: () => document.documentElement.offsetWidth, boundingClientRect: () => Math.max(document.documentElement.getBoundingClientRect().right, document.body.getBoundingClientRect().right), max: () => Math.max(...xe(Fe)), min: () => Math.min(...xe(Fe)), rightMostElement: () => Re(r), scroll: () => Math.max(Fe.bodyScroll(), Fe.documentElementScroll()), taggedElement: () => Re(r) }, Ve = (e2, t2) => !(Math.abs(e2 - t2) <= me);
      let Ue = false;
      function Je(e2, t2, n2, o3, i2) {
        q2 = performance.now(), (L || e2 === a) && (document.hidden || (Ue || (x2 = true, function(e3, t3, n3, o4, i3) {
          const r2 = void 0 === n3 ? De[_]() : n3, l2 = void 0 === o4 ? Fe[ge]() : o4;
          V && Ve(Q, r2) || U && Ve(he, l2) || "init" === e3 ? (He(), Q = r2, he = l2, _e(Q, he, e3, i3)) : !e3 !== a && (V && _ in T2 || U && ge in T2) ? Qe() : x2 = false;
        }(e2, 0, n2, o3, i2), requestAnimationFrame(() => {
          Ue = false;
        })), Ue = true));
      }
      function He() {
        fe || (fe = true, requestAnimationFrame(() => {
          fe = false;
        }));
      }
      function Ze(e2) {
        Q = De[_](), he = Fe[ge](), _e(Q, he, e2);
      }
      function Qe(e2) {
        const t2 = _;
        _ = b2, He(), Ze("reset"), _ = t2;
      }
      function _e(e2, t2, n2, o3, i2) {
        ee < -1 || (void 0 !== i2 || (i2 = ue), function() {
          const r2 = `${ne}:${e2 + (N2 || 0)}:${t2 + (I2 || 0)}:${n2}${void 0 === o3 ? "" : `:${o3}`}`;
          K && (console.group(`[iframe-resizer][${ne}]`), console.info("Sending message to host page via " + (le ? "sameDomain" : "postMessage")), console.info(`%c${r2}`, "font-style: italic"), x2 && console.info(function() {
            const e3 = m(performance.now() - q2);
            return "init" === n2 ? `Initialised iFrame in %c${e3}ms` : `Content size recalculated in %c${e3}ms`;
          }(), "font-weight:bold;color:#777"), console.groupEnd()), x2 = false, le ? window.parent.iframeParentListener(S2 + r2) : de.postMessage(S2 + r2, i2);
        }());
      }
      function Xe(e2) {
        const t2 = { init: function() {
          Y = e2.data, de = e2.source, R2 = e2.origin, Se(), J = false, setTimeout(() => {
            X = false;
          }, f2);
        }, reset() {
          X || Ze("resetPage");
        }, resize() {
          Je(a);
        }, moveToAnchor() {
          G.findTarget(o3());
        }, inPageLink() {
          this.moveToAnchor();
        }, pageInfo() {
          const e3 = o3();
          we ? setTimeout(() => we(JSON.parse(e3))) : _e(0, 0, "pageInfoStop");
        }, parentInfo() {
          const e3 = o3();
          ze ? setTimeout(ze(Object.freeze(JSON.parse(e3)))) : _e(0, 0, "parentInfoStop");
        }, message() {
          const e3 = o3();
          be(JSON.parse(e3));
        } }, n2 = () => e2.data.split("]")[1].split(":")[0], o3 = () => e2.data.slice(e2.data.indexOf(":") + 1), i2 = () => "iframeResize" in window || void 0 !== window.jQuery && "" in window.jQuery.prototype, r2 = () => e2.data.split(":")[2] in { true: 1, false: 1 };
        S2 === `${e2.data}`.slice(0, P2) && (false !== J ? r2() && t2.init() : function() {
          const o4 = n2();
          o4 in t2 ? t2[o4]() : i2() || r2() || v(`Unexpected message (${e2.data})`);
        }());
      }
      function Ye() {
        "loading" !== document.readyState && window.parent.postMessage("[iFrameResizerChild]Ready", "*");
      }
      "iframeChildListener" in window ? v("Already setup") : (window.iframeChildListener = (e2) => setTimeout(() => Xe({ data: e2 })), l(window, "message", Xe), l(window, "readystatechange", Ye), Ye());
    }();
  });
})();
/*! Bundled license information:

@iframe-resizer/child/index.umd.js:
  (*!
   *  @preserve
   *  
   *  @module      iframe-resizer/child 5.3.3 (umd) - 2025-02-12
   *
   *  @license     GPL-3.0 for non-commercial use only.
   *               For commercial use, you must purchase a license from
   *               https://iframe-resizer.com/pricing
   * 
   *  @description Keep same and cross domain iFrames sized to their content 
   *
   *  @author      David J. Bradshaw <info@iframe-resizer.com>
   * 
   *  @see         {@link https://iframe-resizer.com}
   * 
   *  @copyright  (c) 2013 - 2025, David J. Bradshaw. All rights reserved.
   *)
*/
