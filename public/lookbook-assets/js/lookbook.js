(() => {

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $3b5efa8b707408c3$exports = {};
/*!
 *  @preserve
 *  
 *  @module      iframe-resizer/parent 5.5.7 (umd) - 2025-09-23
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
 */ !function(e, t) {
    $3b5efa8b707408c3$exports = t();
}($3b5efa8b707408c3$exports, function() {
    "use strict";
    const e = "5.5.7", t = "iframeResizer", o = ":", n = "autoResize", i = "init", r = "iframeReady", a = "load", s = "message", l = "onload", c = "pageInfo", u = "parentInfo", d = "reset", f = "resize", p = "scroll", m = "child", h = "parent", g = "string", y = "object", b = "function", w = "undefined", v = "auto", z = "none", $ = "vertical", j = "horizontal", k = "[iFrameSizer]", T = Object.freeze({
        max: 1,
        scroll: 1,
        bodyScroll: 1,
        documentElementScroll: 1
    }), x = Object.freeze({
        [l]: 1,
        [i]: 1,
        [r]: 1
    }), M = "expanded", E = "collapsed", R = Object.freeze({
        [M]: 1,
        [E]: 1
    }), S = "font-weight: normal;", O = S + "font-style: italic;", C = "default", I = Object.freeze({
        assert: !0,
        error: !0,
        warn: !0
    }), A = {
        expand: !1,
        defaultEvent: void 0,
        event: void 0,
        label: "AutoConsoleGroup",
        showTime: !0
    }, W = {
        profile: 0,
        profileEnd: 0,
        timeStamp: 0,
        trace: 0
    }, L = Object.assign(console);
    const { fromEntries: N, keys: F } = Object, B = (e)=>[
            e,
            L[e]
        ], H = (e)=>(t)=>[
                t,
                function(o) {
                    e[t] = o;
                }
            ], P = (e, t)=>N(F(e).map(t));
    const q = !(typeof window > "u" || "function" != typeof window.matchMedia) && window.matchMedia("(prefers-color-scheme: dark)").matches, D = q ? "color: #A9C7FB;" : "color: #135CD2;", U = q ? "color: #E3E3E3;" : "color: #1F1F1F;", J = (e)=>(t)=>window.chrome ? e(t.replaceAll("<br>", "\n").replaceAll("<rb>", "[31;1m").replaceAll("</>", "[m").replaceAll("<b>", "[1m").replaceAll("<i>", "[3m").replaceAll("<u>", "[4m")) : e(((e)=>e.replaceAll("<br>", "\n").replaceAll(/<[/a-z]+>/gi, ""))(t)), Z = Object.hasOwn || ((e, t)=>Object.prototype.hasOwnProperty.call(e, t)), V = (e)=>e, X = {}, Y = (G = function(e = {}) {
        const t = {}, o = {}, n = [], i = {
            ...A,
            expand: !e.collapsed || A.expanded,
            ...e
        };
        let r = "";
        function a() {
            n.length = 0, r = "";
        }
        function s() {
            delete i.event, a();
        }
        const l = ()=>!!n.some(([e])=>e in I) || !!i.expand;
        function c() {
            if (0 !== n.length) {
                L[l() ? "group" : "groupCollapsed"](`%c${i.label}%c ${((e)=>{
                    const t = e.event || e.defaultEvent;
                    return t ? `${t}` : "";
                })(i)} %c${i.showTime ? r : ""}`, S, "font-weight: bold;", O);
                for (const [e, ...t] of n)L.assert(e in L, `Unknown console method: ${e}`), e in L && L[e](...t);
                L.groupEnd(), s();
            } else s();
        }
        function u() {
            "" === r && (r = function() {
                const e = new Date, t = (t, o)=>e[t]().toString().padStart(o, "0");
                return `@ ${t("getHours", 2)}:${t("getMinutes", 2)}:${t("getSeconds", 2)}.${t("getMilliseconds", 3)}`;
            }());
        }
        function d(e, ...t) {
            0 === n.length && (u(), queueMicrotask(()=>queueMicrotask(c))), n.push([
                e,
                ...t
            ]);
        }
        function f(e = C, ...o) {
            t[e] ? d("log", `${e}: ${performance.now() - t[e]} ms`, ...o) : d("timeLog", e, ...o);
        }
        return {
            ...P(i, H(i)),
            ...P(console, (e)=>[
                    e,
                    (...t)=>d(e, ...t)
                ]),
            ...P(W, B),
            assert: function(e, ...t) {
                !0 !== e && d("assert", e, ...t);
            },
            count: function(e = C) {
                o[e] ? o[e] += 1 : o[e] = 1, d("log", `${e}: ${o[e]}`);
            },
            countReset: function(e = C) {
                delete o[e];
            },
            endAutoGroup: c,
            errorBoundary: (e)=>(...t)=>{
                    let o;
                    try {
                        o = e(...t);
                    } catch (e) {
                        if (!Error.prototype.isPrototypeOf(e)) throw e;
                        d("error", e), c();
                    }
                    return o;
                },
            event: function(e) {
                u(), i.event = e;
            },
            purge: a,
            time: function(e = C) {
                u(), t[e] = performance.now();
            },
            timeEnd: function(e = C) {
                f(e), delete t[e];
            },
            timeLog: f,
            touch: u
        };
    }, G?.__esModule ? G.default : G);
    var G;
    let _ = !0;
    const K = Y({
        expand: !1,
        label: h
    }), Q = (e)=>window.top === window.self ? `parent(${e})` : `nested parent(${e})`;
    const ee = (e)=>(t, ...o)=>X[t] ? X[t].console[e](...o) : K[e](...o);
    var te;
    const oe = (te = "log", (e, ...t)=>!0 === ((e)=>X[e] ? X[e].log : _)(e) ? ee(te)(e, ...t) : null), ne = ee("warn"), ie = ee("error"), re = ee("event"), ae = ee("purge"), se = ee("errorBoundary");
    const le = (e, ...o)=>X[e] ? X[e].console.warn(J(V)(...o)) : queueMicrotask(()=>console?.warn(J(((e)=>(...o)=>[
                        `${t}(${e})`,
                        ...o
                    ].join(" "))(e))(...o))), ce = ((e)=>(t, o = "renamed to")=>(n, i, r = "", a = "")=>e(a, `<rb>Deprecated ${t}(${n.replace("()", "")})</>\n\nThe <b>${n}</> ${t.toLowerCase()} has been ${o} <b>${i}</>. ${r}Use of the old ${t.toLowerCase()} will be removed in a future version of <i>iframe-resizer</>.`))(le), ue = ce("Function"), de = ce("Option"), fe = (e, t, o, n)=>e.addEventListener(t, o, n || !1), pe = (e, t, o)=>e.removeEventListener(t, o, !1), me = (e)=>{
        if (!e) return "";
        let t = -559038744, o = 1103547984;
        for(let n, i = 0; i < e.length; i++)n = e.codePointAt(i), t = Math.imul(t ^ n, 2246822519), o = Math.imul(o ^ n, 3266489917);
        return t ^= Math.imul(t ^ o >>> 15, 1935289751), o ^= Math.imul(o ^ t >>> 15, 3405138345), t ^= o >>> 16, o ^= t >>> 16, (2097152 * (o >>> 0) + (t >>> 11)).toString(36);
    }, he = (e)=>e.replace(/[A-Za-z]/g, (e)=>String.fromCodePoint((e <= "Z" ? 90 : 122) >= (e = e.codePointAt(0) + 19) ? e : e - 26)), ge = [
        "spjluzl",
        "rlf",
        "clyzpvu"
    ], ye = [
        "<yi>Puchspk Spjluzl Rlf</><iy><iy>",
        "<yi>Tpzzpun Spjluzl Rlf</><iy><iy>",
        "Aopz spiyhyf pz hchpshisl dpao ivao Jvttlyjphs huk Vwlu-Zvbyjl spjluzlz.<iy><iy><i>Jvttlyjphs Spjluzl</><iy>Mvy jvttlyjphs bzl, <p>pmyhtl-ylzpgly</> ylxbpylz h svd jvza vul aptl spjluzl mll. Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.<iy><iy><i>Vwlu Zvbyjl Spjluzl</><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-jvttlyjphs vwlu zvbyjl wyvqlja aolu fvb jhu bzl pa mvy myll bukly aol alytz vm aol NWS C3 Spjluzl. Av jvumpyt fvb hjjlwa aolzl alytz, wslhzl zla aol <i>spjluzl</> rlf pu <p>pmyhtl-ylzpgly</> vwapvuz av <i>NWSc3</>.<iy><iy>Mvy tvyl pumvythapvu wslhzl zll: <b>oaawz://pmyhtl-ylzpgly.jvt/nws</>",
        "<i>NWSc3 Spjluzl Clyzpvu</><iy><iy>Aopz clyzpvu vm <p>pmyhtl-ylzpgly</> pz ilpun bzlk bukly aol alytz vm aol <i>NWS C3</> spjluzl. Aopz spjluzl hssvdz fvb av bzl <p>pmyhtl-ylzpgly</> pu Vwlu Zvbyjl wyvqljaz, iba pa ylxbpylz fvby wyvqlja av il wbispj, wyvcpkl haaypibapvu huk il spjluzlk bukly clyzpvu 3 vy shaly vm aol NUB Nlulyhs Wbispj Spjluzl.<iy><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-vwlu zvbyjl wyvqlja vy dlizpal, fvb dpss ullk av wbyjohzl h svd jvza vul aptl jvttlyjphs spjluzl.<iy><iy>Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.",
        "<iy><yi>Zvsv spjluzl kvlz uva zbwwvya jyvzz-kvthpu</><iy><iy>Av bzl <p>pmyhtl-ylzpgly</> dpao jyvzz kvthpu pmyhtlz fvb ullk lpaoly aol Wyvmlzzpvuhs vy Ibzpulzz spjluzlz. Mvy klahpsz vu bwnyhkl wypjpun wslhzl jvuahja pumv@pmyhtl-ylzpgly.jvt.",
        "Pu whnl spurpun ylxbpylz h Wyvmlzzpvuhs vy Ibzpulzz spjluzl. Wslhzl zll <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</> mvy tvyl klahpsz."
    ], be = [
        "NWSc3",
        "zvsv",
        "wyv",
        "ibzpulzz",
        "vlt"
    ], we = Object.fromEntries([
        "2cgs7fdf4xb",
        "1c9ctcccr4z",
        "1q2pc4eebgb",
        "ueokt0969w",
        "w2zxchhgqz",
        "1umuxblj2e5"
    ].map((e, t)=>[
            e,
            Math.max(0, t - 1)
        ])), ve = (e)=>he(ye[e]), ze = (e)=>{
        const t = e[he(ge[0])] || e[he(ge[1])] || e[he(ge[2])];
        if (!t) return -1;
        const o = t.split("-");
        let n = function(e = "") {
            let t = -2;
            const o = me(he(e));
            return o in we && (t = we[o]), t;
        }(o[0]);
        return 0 === n || ((e)=>e[2] === me(e[0] + e[1]))(o) || (n = -2), n;
    };
    function $e(e, t) {
        const { msgTimeout: o, warningTimeout: n } = t[e];
        n && (o && clearTimeout(o), t[e].msgTimeout = setTimeout(function() {
            if (void 0 === t[e]) return;
            const { initialised: o, loadErrorShown: n } = t[e];
            t[e].msgTimeout = void 0, o || n || (t[e].loadErrorShown = !0, function(e, t) {
                const { iframe: o, waitForLoad: n } = t[e], { sandbox: i } = o, r = typeof i === y && i.length > 0 && !(i.contains("allow-scripts") && i.contains("allow-same-origin"));
                re(e, "noResponse"), le(e, `<rb>No response from iframe</>\n          \nThe iframe (<i>${e}</>) has not responded within ${t[e].warningTimeout / 1e3} seconds. Check <b>@iframe-resizer/child</> package has been loaded in the iframe.\n${n ? "\nThe <b>waitForLoad</> option is currently set to <b>'true'</>. If the iframe loads before <i>iframe-resizer</> runs, this option will prevent <i>iframe-resizer</> initialising. To disable this option, set <b>waitForLoad</> to <b>'false'</>.  \n" : ""}${r ? "\nThe iframe has the <b>sandbox</> attribute, please ensure it contains both the <i>'allow-same-origin'</> and <i>'allow-scripts'</> values.\n" : ""}\nThis message can be ignored if everything is working, or you can set the <b>warningTimeout</> option to a higher value or zero to suppress this warning.\n`);
            }(e, t));
        }, n));
    }
    const je = Object.freeze({
        autoResize: !0,
        bodyBackground: null,
        bodyMargin: null,
        bodyPadding: null,
        checkOrigin: !0,
        direction: $,
        firstRun: !0,
        inPageLinks: !1,
        heightCalculationMethod: v,
        id: "iFrameResizer",
        log: !1,
        logExpand: !1,
        license: void 0,
        mouseEvents: !0,
        offsetHeight: null,
        offsetWidth: null,
        postMessageTarget: null,
        sameDomain: !1,
        scrolling: !1,
        sizeHeight: !0,
        sizeWidth: !1,
        tolerance: 0,
        waitForLoad: !1,
        warningTimeout: 5e3,
        widthCalculationMethod: v,
        onBeforeClose: ()=>!0,
        onAfterClose () {},
        onInit: !1,
        onMessage: null,
        onMouseEnter () {},
        onMouseLeave () {},
        onReady: (e)=>{
            typeof X[e.id].onInit === b && (de("init()", "onReady()", "", e.id), X[e.id].onInit(e));
        },
        onResized () {},
        onScroll: ()=>!0
    }), ke = {
        position: null,
        version: e
    };
    function Te(t) {
        function r() {
            Ie(N), Oe(H), C("onResized", N);
        }
        function l(e) {
            if ("border-box" !== e.boxSizing) return 0;
            return (e.paddingTop ? parseInt(e.paddingTop, 10) : 0) + (e.paddingBottom ? parseInt(e.paddingBottom, 10) : 0);
        }
        function m(e) {
            if ("border-box" !== e.boxSizing) return 0;
            return (e.borderTopWidth ? parseInt(e.borderTopWidth, 10) : 0) + (e.borderBottomWidth ? parseInt(e.borderBottomWidth, 10) : 0);
        }
        const y = (e)=>W.slice(W.indexOf(o) + 7 + e);
        const b = (e, t)=>(o, n)=>{
                const i = {};
                var r, a;
                r = function() {
                    We(`${o} (${e})`, `${e}:${t()}`, n);
                }, i[a = n] || (r(), i[a] = requestAnimationFrame(()=>{
                    i[a] = null;
                }));
            }, w = (e, t)=>()=>{
                let o = !1;
                const n = (t)=>()=>{
                        X[c] ? o && o !== t || (e(t, c), o = t, requestAnimationFrame(()=>{
                            o = !1;
                        })) : l();
                    }, i = n(p), r = n("resize window");
                function s(e, t) {
                    t(window, p, i), t(window, f, r);
                }
                function l() {
                    re(c, `stop${t}`), s(0, pe), u.disconnect(), d.disconnect(), pe(X[c].iframe, a, l);
                }
                const c = H, u = new ResizeObserver(n("pageObserver")), d = new ResizeObserver(n("iframeObserver"));
                X[c] && (X[c][`stop${t}`] = l, fe(X[c].iframe, a, l), s(0, fe), u.observe(document.body, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                }), d.observe(X[c].iframe, {
                    attributes: !0,
                    childList: !1,
                    subtree: !1
                }));
            }, v = (e)=>()=>{
                e in X[H] && (X[H][e](), delete X[H][e]);
            }, z = b(c, function() {
            const e = document.body.getBoundingClientRect(), t = N.iframe.getBoundingClientRect(), { scrollY: o, scrollX: n, innerHeight: i, innerWidth: r } = window, { clientHeight: a, clientWidth: s } = document.documentElement;
            return JSON.stringify({
                iframeHeight: t.height,
                iframeWidth: t.width,
                clientHeight: Math.max(a, i || 0),
                clientWidth: Math.max(s, r || 0),
                offsetTop: parseInt(t.top - e.top, 10),
                offsetLeft: parseInt(t.left - e.left, 10),
                scrollTop: o,
                scrollLeft: n,
                documentHeight: a,
                documentWidth: s,
                windowHeight: i,
                windowWidth: r
            });
        }), $ = b(u, function() {
            const { iframe: e } = N, { scrollWidth: t, scrollHeight: o } = document.documentElement, { width: n, height: i, offsetLeft: r, offsetTop: a, pageLeft: s, pageTop: l, scale: c } = window.visualViewport;
            return JSON.stringify({
                iframe: e.getBoundingClientRect(),
                document: {
                    scrollWidth: t,
                    scrollHeight: o
                },
                viewport: {
                    width: n,
                    height: i,
                    offsetLeft: r,
                    offsetTop: a,
                    pageLeft: s,
                    pageTop: l,
                    scale: c
                }
            });
        }), j = w(z, "PageInfo"), T = w($, "ParentInfo"), x = v("stopPageInfo"), M = v("stopParentInfo");
        function E(e) {
            const t = e.getBoundingClientRect();
            return Re(), {
                x: Number(t.left) + Number(ke.position.x),
                y: Number(t.top) + Number(ke.position.y)
            };
        }
        function R(e) {
            const t = e ? E(N.iframe) : {
                x: 0,
                y: 0
            };
            oe(H, `Reposition requested (offset x:%c${t.x}%c y:%c${t.y})`, D, U, D);
            const o = ((e, t)=>({
                    x: e.width + t.x,
                    y: e.height + t.y
                }))(N, t), n = window.parentIframe || window.parentIFrame;
            n ? function(t, o) {
                setTimeout(()=>t["scrollTo" + (e ? "Offset" : "")](o.x, o.y));
            }(n, o) : function(e) {
                ke.position = e, S(H);
            }(o);
        }
        function S(e) {
            const { x: t, y: o } = ke.position, n = X[e]?.iframe;
            !1 !== C("onScroll", {
                iframe: n,
                top: o,
                left: t,
                x: t,
                y: o
            }) ? Oe(e) : Se();
        }
        function O(e) {
            let t = {};
            if (0 === N.width && 0 === N.height) {
                const e = y(9).split(o);
                t = {
                    x: e[1],
                    y: e[0]
                };
            } else t = {
                x: N.width,
                y: N.height
            };
            C(e, {
                iframe: N.iframe,
                screenX: Number(t.x),
                screenY: Number(t.y),
                type: N.type
            });
        }
        const C = (e, t)=>xe(H, e, t);
        function I() {
            const { height: t, iframe: o, msg: a, type: l, width: f } = N;
            switch(X[H]?.firstRun && function() {
                if (!X[H]) return;
                Be(H, N.mode), X[H].firstRun = !1;
            }(), l){
                case "close":
                    Ee(o);
                    break;
                case s:
                    m = y(6), C("onMessage", {
                        iframe: N.iframe,
                        message: JSON.parse(m)
                    });
                    break;
                case "mouseenter":
                    O("onMouseEnter");
                    break;
                case "mouseleave":
                    O("onMouseLeave");
                    break;
                case "beforeUnload":
                    oe(H, "Ready state reset"), X[H].initialised = !1;
                    break;
                case n:
                    X[H].autoResize = JSON.parse(y(9));
                    break;
                case "scrollBy":
                    !function() {
                        const e = N.width, t = N.height, o = window.parentIframe || window.parentIFrame || window;
                        oe(H, `scrollBy: x: %c${e}%c y: %c${t}`, D, U, D), o.scrollBy(e, t);
                    }();
                    break;
                case "scrollTo":
                    R(!1);
                    break;
                case "scrollToOffset":
                    R(!0);
                    break;
                case c:
                    j();
                    break;
                case u:
                    T();
                    break;
                case "pageInfoStop":
                    x();
                    break;
                case "parentInfoStop":
                    M();
                    break;
                case "inPageLink":
                    !function(e) {
                        const t = e.split("#")[1] || "", o = decodeURIComponent(t);
                        let n = document.getElementById(o) || document.getElementsByName(o)[0];
                        n ? function() {
                            const e = E(n);
                            oe(H, `Moving to in page link: %c#${t}`, D), ke.position = {
                                x: e.x,
                                y: e.y
                            }, S(H), window.location.hash = t;
                        }() : window.top !== window.self && function() {
                            const e = window.parentIframe || window.parentIFrame;
                            e && e.moveToAnchor(t);
                        }();
                    }(y(9));
                    break;
                case "title":
                    !function(e, t) {
                        X[t]?.syncTitle && (X[t].iframe.title = e, oe(t, `Set iframe title attribute: %c${e}`, D));
                    }(a, H);
                    break;
                case d:
                    Ce(N);
                    break;
                case i:
                    r(), function(e) {
                        try {
                            X[e].sameOrigin = !!X[e]?.iframe?.contentWindow?.iframeChildListener;
                        } catch (t) {
                            X[e].sameOrigin = !1;
                        }
                    }(H), (p = a) !== e && (void 0 !== p || le(H, "<rb>Legacy version detected in iframe</>\n\nDetected legacy version of child page script. It is recommended to update the page in the iframe to use <b>@iframe-resizer/child</>.\n\nSee <u>https://iframe-resizer.com/setup/#child-page-setup</> for more details.\n")), X[H].initialised = !0, C("onReady", o);
                    break;
                default:
                    if (0 === f && 0 === t) return void ne(H, `Unsupported message received (${l}), this is likely due to the iframe containing a later version of iframe-resizer than the parent page`);
                    if (0 === f || 0 === t) return;
                    if (document.hidden) return;
                    r();
            }
            var p, m;
        }
        function A(e) {
            if (!X[e]) throw new Error(`${N.type} No settings for ${e}. Message was: ${W}`);
        }
        let W = t.data;
        if ("[iFrameResizerChild]Ready" === W) return L = t.source, void Object.values(X).forEach(((e)=>({ initChild: t, postMessageTarget: o })=>{
                e === o && t();
            })(L));
        var L;
        if (!((e)=>k === `${e}`.slice(0, 13) && e.slice(13).split(o)[0] in X)(W)) {
            if (typeof W !== g) return;
            return void re(h, "ignoredMessage");
        }
        const N = function(e) {
            const t = e.slice(13).split(o), n = t[1] ? Number(t[1]) : 0, i = X[t[0]]?.iframe, r = getComputedStyle(i), a = {
                iframe: i,
                id: t[0],
                height: n + l(r) + m(r),
                width: Number(t[2]),
                type: t[3],
                msg: t[4]
            };
            return t[5] && (a.mode = t[5]), a;
        }(W), { id: F, type: B } = N, H = F;
        H ? (re(H, B), se(H, function(e) {
            A(H), N.type in {
                true: 1,
                false: 1,
                undefined: 1
            } || (null !== N.iframe || (ne(H, `The iframe (${N.id}) was not found.`), 0)) && function() {
                const { origin: e, sameOrigin: o } = t;
                if (o) return !0;
                let n = X[H]?.checkOrigin;
                if (n && "null" != `${e}` && !(n.constructor === Array ? function() {
                    let t = 0, o = !1;
                    for(; t < n.length; t++)if (n[t] === e) {
                        o = !0;
                        break;
                    }
                    return o;
                }() : function() {
                    const t = X[H]?.remoteHost;
                    return e === t;
                }())) throw new Error(`Unexpected message received from: ${e} for ${N.iframe.id}. Message was: ${t.data}. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.`);
                return !0;
            }() && I();
        })(W)) : ne("", "iframeResizer received messageData without id, message was: ", W);
    }
    function xe(e, t, o) {
        let n = null, i = null;
        if (X[e]) {
            if (n = X[e][t], typeof n !== b) throw new TypeError(`${t} on iFrame[${e}] is not a function`);
            if ("onBeforeClose" === t || "onScroll" === t) try {
                i = n(o);
            } catch (o) {
                console.error(o), ne(e, `Error in ${t} callback`);
            }
            else ((e, ...t)=>{
                setTimeout(()=>e(...t), 0);
            })(n, o);
        }
        return i;
    }
    function Me(e) {
        const { id: t } = e;
        delete X[t], delete e.iframeResizer;
    }
    function Ee(e) {
        const { id: t } = e;
        if (!1 !== xe(t, "onBeforeClose", t)) {
            try {
                e.parentNode && e.remove();
            } catch (e) {
                ne(t, e);
            }
            xe(t, "onAfterClose", t), Me(e);
        }
    }
    function Re(e) {
        null === ke.position && (ke.position = {
            x: window.scrollX,
            y: window.scrollY
        });
    }
    function Se() {
        ke.position = null;
    }
    function Oe(e) {
        null !== ke.position && (window.scrollTo(ke.position.x, ke.position.y), oe(e, `Set page position: %c${ke.position.x}%c, %c${ke.position.y}`, D, U, D), Se());
    }
    function Ce(e) {
        Re(e.id), Ie(e), We(d, d, e.id);
    }
    function Ie(e) {
        function t(t) {
            const n = `${e[t]}px`;
            e.iframe.style[t] = n, oe(o, `Set ${t}: %c${n}`, D);
        }
        const { id: o } = e, { sizeHeight: n, sizeWidth: i } = X[o];
        n && t("height"), i && t("width");
    }
    const Ae = (e)=>e.split(o).filter((e, t)=>19 !== t).join(o);
    function We(e, t, o) {
        function n(n) {
            const i = e in x ? Ae(t) : t;
            oe(o, n, D, U, D), oe(o, `Message data: %c${i}`, D);
        }
        re(o, e), X[o] && (X[o]?.postMessageTarget ? function() {
            const { iframe: i, postMessageTarget: r, sameOrigin: a, targetOrigin: s } = X[o];
            if (a) try {
                return i.contentWindow.iframeChildListener(k + t), void n(`Sending message to iframe %c${o}%c via same origin%c`);
            } catch (t) {
                e in x ? X[o].sameOrigin = !1 : ne(o, "Same origin messaging failed, falling back to postMessage");
            }
            n(`Sending message to iframe: %c${o}%c targetOrigin: %c${s}`), r.postMessage(k + t, s);
        }() : ne(o, `Iframe(${o}) not found`));
    }
    let Le = 0, Ne = !1, Fe = !1;
    function Be(t, o = -3) {
        if (Ne) return;
        const n = Math.max(X[t].mode, o);
        if (n > X[t].mode && (X[t].mode = n), n < 0) throw ae(t), X[t].vAdvised || le(t || "Parent", `${ve(n + 2)}${ve(2)}`), X[t].vAdvised = !0, ve(n + 2).replace(/<\/?[a-z][^>]*>|<\/>/gi, "");
        n > 0 && Fe || function(e, t) {
            queueMicrotask(()=>console.info(`%ciframe-resizer ${e}`, _ || t < 1 ? "font-weight: bold;" : S));
        }(`v${e} (${((e)=>he(be[e]))(n)})`, n), n < 1 && le("Parent", ve(3)), Ne = !0;
    }
    const He = (e)=>(c)=>{
            function u() {
                X[O]?.heightCalculationMethod in T && Ce({
                    iframe: c,
                    height: 1,
                    width: 1,
                    type: i
                });
            }
            function d() {
                if (X[O]) {
                    const { iframe: e } = X[O], t = {
                        close: Ee.bind(null, e),
                        disconnect: Me.bind(null, e),
                        removeListeners () {
                            le(O, "<rb>Deprecated Method Name</>\n\nThe [removeListeners()</> method has been renamed to [disconnect()</>.\n"), this.disconnect();
                        },
                        resize () {
                            le(O, "<rb>Deprecated Method</>\n        \nUse of the <b>resize()</> method from the parent page is deprecated and will be removed in a future version of <i>iframe-resizer</>. As their are no longer any edge cases that require triggering a resize from the parent page, it is recommended to remove this method from your code."), We.bind(null, "Window resize", f, O);
                        },
                        moveToAnchor (e) {
                            ((e, t, o)=>{
                                if (typeof e !== t) throw new TypeError(`${o} is not a ${(n = t, n.charAt(0).toUpperCase() + n.slice(1))}`);
                                var n;
                            })(e, g, "moveToAnchor(anchor) anchor"), We("Move to anchor", `moveToAnchor:${e}`, O);
                        },
                        sendMessage (e) {
                            e = JSON.stringify(e), We(s, `${s}:${e}`, O);
                        }
                    };
                    e.iframeResizer = t, e.iFrameResizer = t;
                }
            }
            function p(e, t) {
                const o = (o)=>()=>{
                        if (!X[e]) return;
                        const { firstRun: n, iframe: r } = X[e];
                        We(o, t, e), ((e)=>e === i)(o) && ((e)=>"lazy" === e.loading)(r) || $e(e, X), n || u();
                    }, { iframe: n } = X[e];
                X[e].initChild = o(r), function(e, t) {
                    fe(e, a, ()=>setTimeout(t, 1));
                }(n, o(l)), function(e, t) {
                    const { iframe: o, waitForLoad: n } = X[e];
                    !0 !== n && (((e)=>{
                        const { src: t, srcdoc: o } = e;
                        return !o && (null == t || "" === t || "about:blank" === t);
                    })(o) ? setTimeout(()=>{
                        re(e, "noContent"), oe(e, "No content detected in the iframe, delaying initialisation");
                    }) : setTimeout(t));
                }(e, o(i));
            }
            function h(e) {
                return e ? (("sizeWidth" in e || "sizeHeight" in e || n in e) && le(O, `<rb>Deprecated Option</>\n\nThe <b>sizeWidth</>, <b>sizeHeight</> and <b>autoResize</> options have been replaced with new <b>direction</> option which expects values of <i>"${$}"</>, <i>"${j}"</> or <i>"${z}"</>.\n`), e) : {};
            }
            function b(e) {
                const t = X[e]?.iframe?.title;
                return "" === t || void 0 === t;
            }
            function w(e, t) {
                Z(X[O], e) && (le(O, `<rb>Deprecated option</>\n\nThe <b>${e}</> option has been renamed to <b>${t}</>. Use of the old name will be removed in a future version of <i>iframe-resizer</>.`), X[O][t] = X[O][e], delete X[O][e]);
            }
            const k = (e)=>Z(e, "onMouseEnter") || Z(e, "onMouseLeave");
            function x(e) {
                var t, o;
                X[O] = {
                    ...X[O],
                    iframe: c,
                    remoteHost: c?.src.split("/").slice(0, 3).join("/"),
                    ...je,
                    ...h(e),
                    mouseEvents: k(e),
                    mode: ze(e),
                    syncTitle: b(O)
                }, w("offset", "offsetSize"), w("onClose", "onBeforeClose"), w("onClosed", "onAfterClose"), re(O, "setup"), function() {
                    const { direction: e } = X[O];
                    switch(e){
                        case $:
                            break;
                        case j:
                            X[O].sizeHeight = !1;
                        case "both":
                            X[O].sizeWidth = !0;
                            break;
                        case z:
                            X[O].sizeWidth = !1, X[O].sizeHeight = !1, X[O].autoResize = !1;
                            break;
                        default:
                            throw new TypeError(O, `Direction value of "${e}" is not valid`);
                    }
                }(), (t = e?.offsetSize || e?.offset) && (X[O].direction === $ ? X[O].offsetHeight = t : X[O].offsetWidth = t), function(e) {
                    e?.offset && le(O, "<rb>Deprecated option</>\n\n The <b>offset</> option has been renamed to <b>offsetSize</>. Use of the old name will be removed in a future version of <i>iframe-resizer</>.");
                }(e), X[O].warningTimeout || oe(O, "warningTimeout:%c disabled", D), null === X[O].postMessageTarget && (X[O].postMessageTarget = c.contentWindow), X[O].targetOrigin = !0 === X[O].checkOrigin ? "" === (o = X[O].remoteHost) || null !== o.match(/^(about:blank|javascript:|file:\/\/)/) ? "*" : o : "*";
            }
            const S = ()=>t in c, O = function(t) {
                if (t && typeof t !== g) throw new TypeError("Invalid id for iFrame. Expected String");
                return "" !== t && t || (t = function() {
                    let t = e?.id || je.id + Le++;
                    return null !== document.getElementById(t) && (t += Le++), t;
                }(), c.id = t, re(t, "assignId")), t;
            }(c.id);
            if (typeof e !== y) throw new TypeError("Options is not an object");
            return function(e) {
                const { search: t } = window.location;
                t.includes("ifrlog") && (e.log = E, e.logExpand = t.includes("ifrlog=expanded"));
            }(e), function(e, t) {
                const o = Z(t, "log"), n = typeof t.log === g, i = o ? !!n || t.log : je.log;
                Z(t, "logExpand") || (t.logExpand = o && n ? t.log === M : je.logExpand), function(e) {
                    -1 === e?.log && (e.log = !1, Fe = !0);
                }(t), function({ enabled: e, expand: t, iframeId: o }) {
                    const n = Y({
                        expand: t,
                        label: Q(o)
                    });
                    _ = e, X[o] || (X[o] = {
                        console: n
                    });
                }({
                    enabled: i,
                    expand: t.logExpand,
                    iframeId: e
                }), n && !(t.log in R) && ie(e, 'Invalid value for options.log: Accepted values are "expanded" and "collapsed"'), t.log = i;
            }(O, e), se(O, function(e) {
                S() ? ne(O, `Ignored iframe (${O}), already setup.`) : (x(e), function() {
                    if (Ne) return;
                    const { mode: e } = X[O];
                    -1 !== e && Be(O, e);
                }(), qe(), function() {
                    switch(c.style.overflow = !1 === X[O]?.scrolling ? "hidden" : v, X[O]?.scrolling){
                        case "omit":
                            break;
                        case !0:
                            c.scrolling = "yes";
                            break;
                        case !1:
                            c.scrolling = "no";
                            break;
                        default:
                            c.scrolling = X[O] ? X[O].scrolling : "no";
                    }
                }(), function() {
                    const { bodyMargin: e } = X[O];
                    "number" != typeof e && "0" !== e || (X[O].bodyMargin = `${e}px`);
                }(), p(O, function(e) {
                    const { autoResize: t, bodyBackground: n, bodyMargin: i, bodyPadding: r, heightCalculationMethod: a, inPageLinks: s, license: l, log: c, logExpand: u, mouseEvents: d, offsetHeight: f, offsetWidth: p, mode: h, sizeHeight: g, sizeWidth: y, tolerance: b, widthCalculationMethod: w } = X[e];
                    return [
                        e,
                        "8",
                        y,
                        c,
                        "32",
                        !0,
                        t,
                        i,
                        a,
                        n,
                        r,
                        b,
                        s,
                        m,
                        w,
                        d,
                        f,
                        p,
                        g,
                        l,
                        ke.version,
                        h,
                        "",
                        u
                    ].join(o);
                }(O)), d());
            })(e), c?.iframeResizer;
        };
    function Pe() {
        !0 !== document.hidden && ((e, t)=>{
            Object.values(X).filter(({ autoResize: e, firstRun: t })=>e && !t).forEach(({ iframe: o })=>We(e, t, o.id));
        })("tabVisible", f);
    }
    const qe = ((e)=>{
        let t = !1;
        return function() {
            return t ? void 0 : (t = !0, Reflect.apply(e, this, arguments));
        };
    })(()=>{
        fe(window, s, Te), fe(document, "visibilitychange", Pe), window.iframeParentListener = (e)=>setTimeout(()=>Te({
                    data: e,
                    sameOrigin: !0
                }));
    }), De = `[${t}] `;
    const Ue = function() {
        function e(e) {
            switch(!0){
                case !e:
                    throw new TypeError(`${De}iframe is not defined`);
                case !e.tagName:
                    throw new TypeError(`${De}Not a valid DOM element`);
                case "IFRAME" !== e.tagName.toUpperCase():
                    throw new TypeError(`${De}Expected <IFRAME> tag, found <${e.tagName}>`);
                default:
                    t(e), o.push(e);
            }
        }
        let t, o;
        return function(n, i) {
            if (typeof window === w) return [];
            switch(t = He(n), o = [], typeof i){
                case w:
                case g:
                    document.querySelectorAll(i || "iframe").forEach(e);
                    break;
                case y:
                    e(i);
                    break;
                default:
                    throw new TypeError(`${De}Unexpected data type (${typeof i})`);
            }
            return Object.freeze(o);
        };
    }();
    return typeof window !== w && (window.iFrameResize = window.iFrameResize || function(...e) {
        ue("iFrameResize()", "iframeResize()", "", h), Ue(...e);
    }), Ue;
});


window.Lookbook = window.Lookbook || {};
window.Lookbook.initEmbeds = $5000cc5d1e9e824a$var$initEmbeds;
const $5000cc5d1e9e824a$var$embedUrlPrefix = "embed";
const $5000cc5d1e9e824a$var$whiteListedAttributes = [
    "preview",
    "scenario",
    "panels",
    "actions",
    "param-*"
];
function $5000cc5d1e9e824a$var$initEmbeds(root = document) {
    if (typeof window.iframeResize !== "function") {
        console.error("Lookbook embeds require the '@iframe-resizer/parent' library to be available. Skipping embed instantiation.");
        return;
    }
    if (typeof root === "string") root = document.querySelector(root);
    if (!root) return console.error("Could not initialize Lookbook embeds. Root node not found.");
    const embeds = Array.from(root.querySelectorAll("lookbook-embed"));
    embeds.forEach((embed)=>{
        const attrs = Array.from(embed.attributes);
        const wrapper = $5000cc5d1e9e824a$var$createWrapper();
        const iframe = $5000cc5d1e9e824a$var$createIframe(attrs);
        wrapper.appendChild(iframe);
        embed.replaceWith(wrapper);
    });
    window.iframeResize({
        license: "GPLv3",
        checkOrigin: false
    }, "[data-lookbook-embed-iframe]");
}
function $5000cc5d1e9e824a$var$createWrapper() {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("data-lookbook-embed", "");
    wrapper.classList.add("lookbook-embed");
    return wrapper;
}
function $5000cc5d1e9e824a$var$createIframe(attrs) {
    const src = $5000cc5d1e9e824a$var$buildSrc(attrs);
    const id = $5000cc5d1e9e824a$var$attrValue(attrs, "id");
    const styles = $5000cc5d1e9e824a$var$attrValue(attrs, "style");
    const classes = $5000cc5d1e9e824a$var$attrValue(attrs, "class", "").split(" ").map((c)=>c.trim()).filter((c)=>c.length);
    const iframe = document.createElement("iframe");
    iframe.src = src;
    if (id) iframe.id = id;
    iframe.setAttribute("frameborder", 0);
    iframe.setAttribute("data-lookbook-embed-iframe", "");
    if (classes.length) iframe.classList.add(...classes);
    if (styles) iframe.style.cssText = styles;
    iframe.style.width = "100%";
    iframe.style.transition = "height 0.3s";
    return iframe;
}
function $5000cc5d1e9e824a$var$buildSrc(attrs) {
    const appPath = $5000cc5d1e9e824a$var$attrValue(attrs, "app") || $5000cc5d1e9e824a$var$guessBasePath();
    const props = {};
    $5000cc5d1e9e824a$var$permittedAttrs(attrs).forEach(({ name: name, value: value })=>{
        name = name.replace("-", "_").toLowerCase();
        props[name] = value;
    });
    return encodeURI([
        appPath,
        $5000cc5d1e9e824a$var$embedUrlPrefix
    ].join("/") + `?props=${JSON.stringify(props)}`);
}
function $5000cc5d1e9e824a$var$attrValue(attrs, name, fallback = null) {
    const attr = attrs.find((attr)=>attr.name === name);
    return attr ? attr.value : fallback;
}
function $5000cc5d1e9e824a$var$permittedAttrs(attrs) {
    return attrs.filter((attr)=>{
        return $5000cc5d1e9e824a$var$whiteListedAttributes.find((key)=>{
            const name = attr.name;
            return key === name || key.includes("*") && name.startsWith(key.replace("*", ""));
        });
    });
}
function $5000cc5d1e9e824a$var$guessBasePath() {
    const script = document.currentScript || document.querySelector('script[src*="lookbook.js"]');
    const scriptSrc = script.src;
    if (scriptSrc && scriptSrc.includes("lookbook-assets")) return scriptSrc.split("?")[0].replace("lookbook-assets/js/lookbook.js", "lookbook");
    return `//${location.host}/lookbook`;
}
document.addEventListener("DOMContentLoaded", ()=>$5000cc5d1e9e824a$var$initEmbeds());


window.iframeResize = (0, (/*@__PURE__*/$parcel$interopDefault($3b5efa8b707408c3$exports)));

})();
