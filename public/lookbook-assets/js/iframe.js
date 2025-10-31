(() => {
/*!
 *  @preserve
 *  
 *  @module      iframe-resizer/child 5.5.7 (umd) - 2025-09-23
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
 */ !function(e) {
    "function" == typeof define && define.amd ? define(e) : e();
}(function() {
    "use strict";
    const e = "font-weight: normal;", t = "font-weight: bold;", n = "font-style: italic;", o = e + n, r = "default", i = Object.freeze({
        assert: !0,
        error: !0,
        warn: !0
    }), a = {
        expand: !1,
        defaultEvent: void 0,
        event: void 0,
        label: "AutoConsoleGroup",
        showTime: !0
    }, s = {
        profile: 0,
        profileEnd: 0,
        timeStamp: 0,
        trace: 0
    }, c = Object.assign(console);
    const { fromEntries: l, keys: u } = Object, d = (e)=>[
            e,
            c[e]
        ], f = (e)=>(t)=>[
                t,
                function(n) {
                    e[t] = n;
                }
            ], m = (e, t)=>l(u(e).map(t));
    const p = !(typeof window > "u" || "function" != typeof window.matchMedia) && window.matchMedia("(prefers-color-scheme: dark)").matches, h = p ? "color: #A9C7FB;" : "color: #135CD2;", y = p ? "color: #E3E3E3;" : "color: #1F1F1F;", g = "5.5.7", b = "iframeResizer", v = ":", z = "init", w = "message", $ = "pageHide", S = "pageInfo", O = "parentInfo", E = "scrollToOffset", M = "title", k = 10, j = "data-iframe-size", x = "data-iframe-overflowed", T = "data-iframe-ignore", A = "height", C = "width", I = "offset", N = "offsetSize", P = "string", R = "number", B = "object", q = "function", L = "auto", D = "readystatechange", F = "bottom", W = "right", H = "autoResizeEnabled", U = Symbol("sizeChanged"), V = "manualResize", Z = "parentResize", J = {
        [V]: 1,
        [Z]: 1
    }, _ = "setOffsetSize", Q = "resizeObserver", G = "overflowObserver", Y = "mutationObserver", X = "visibilityObserver", K = "[iFrameSizer]", ee = new Set([
        "head",
        "body",
        "meta",
        "base",
        "title",
        "script",
        "link",
        "style",
        "map",
        "area",
        "option",
        "optgroup",
        "template",
        "track",
        "wbr",
        "nobr"
    ]), te = (e, t, n, o)=>e.addEventListener(t, n, o || !1), ne = (e)=>{
        if (!e) return "";
        let t = -559038744, n = 1103547984;
        for(let o, r = 0; r < e.length; r++)o = e.codePointAt(r), t = Math.imul(t ^ o, 2246822519), n = Math.imul(n ^ o, 3266489917);
        return t ^= Math.imul(t ^ n >>> 15, 1935289751), n ^= Math.imul(n ^ t >>> 15, 3405138345), t ^= n >>> 16, n ^= t >>> 16, (2097152 * (n >>> 0) + (t >>> 11)).toString(36);
    }, oe = (e)=>e.replace(/[A-Za-z]/g, (e)=>String.fromCodePoint((e <= "Z" ? 90 : 122) >= (e = e.codePointAt(0) + 19) ? e : e - 26)), re = [
        "spjluzl",
        "rlf",
        "clyzpvu"
    ], ie = [
        "<yi>Puchspk Spjluzl Rlf</><iy><iy>",
        "<yi>Tpzzpun Spjluzl Rlf</><iy><iy>",
        "Aopz spiyhyf pz hchpshisl dpao ivao Jvttlyjphs huk Vwlu-Zvbyjl spjluzlz.<iy><iy><i>Jvttlyjphs Spjluzl</><iy>Mvy jvttlyjphs bzl, <p>pmyhtl-ylzpgly</> ylxbpylz h svd jvza vul aptl spjluzl mll. Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.<iy><iy><i>Vwlu Zvbyjl Spjluzl</><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-jvttlyjphs vwlu zvbyjl wyvqlja aolu fvb jhu bzl pa mvy myll bukly aol alytz vm aol NWS C3 Spjluzl. Av jvumpyt fvb hjjlwa aolzl alytz, wslhzl zla aol <i>spjluzl</> rlf pu <p>pmyhtl-ylzpgly</> vwapvuz av <i>NWSc3</>.<iy><iy>Mvy tvyl pumvythapvu wslhzl zll: <b>oaawz://pmyhtl-ylzpgly.jvt/nws</>",
        "<i>NWSc3 Spjluzl Clyzpvu</><iy><iy>Aopz clyzpvu vm <p>pmyhtl-ylzpgly</> pz ilpun bzlk bukly aol alytz vm aol <i>NWS C3</> spjluzl. Aopz spjluzl hssvdz fvb av bzl <p>pmyhtl-ylzpgly</> pu Vwlu Zvbyjl wyvqljaz, iba pa ylxbpylz fvby wyvqlja av il wbispj, wyvcpkl haaypibapvu huk il spjluzlk bukly clyzpvu 3 vy shaly vm aol NUB Nlulyhs Wbispj Spjluzl.<iy><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-vwlu zvbyjl wyvqlja vy dlizpal, fvb dpss ullk av wbyjohzl h svd jvza vul aptl jvttlyjphs spjluzl.<iy><iy>Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.",
        "<iy><yi>Zvsv spjluzl kvlz uva zbwwvya jyvzz-kvthpu</><iy><iy>Av bzl <p>pmyhtl-ylzpgly</> dpao jyvzz kvthpu pmyhtlz fvb ullk lpaoly aol Wyvmlzzpvuhs vy Ibzpulzz spjluzlz. Mvy klahpsz vu bwnyhkl wypjpun wslhzl jvuahja pumv@pmyhtl-ylzpgly.jvt.",
        "Pu whnl spurpun ylxbpylz h Wyvmlzzpvuhs vy Ibzpulzz spjluzl. Wslhzl zll <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</> mvy tvyl klahpsz."
    ], ae = [
        "NWSc3",
        "zvsv",
        "wyv",
        "ibzpulzz",
        "vlt"
    ], se = Object.fromEntries([
        "2cgs7fdf4xb",
        "1c9ctcccr4z",
        "1q2pc4eebgb",
        "ueokt0969w",
        "w2zxchhgqz",
        "1umuxblj2e5"
    ].map((e, t)=>[
            e,
            Math.max(0, t - 1)
        ])), ce = (e)=>oe(ie[e]), le = (e)=>{
        const t = e[oe(re[0])] || e[oe(re[1])] || e[oe(re[2])];
        if (!t) return -1;
        const n = t.split("-");
        let o = function(e = "") {
            let t = -2;
            const n = ne(oe(e));
            return n in se && (t = se[n]), t;
        }(n[0]);
        return 0 === o || ((e)=>e[2] === ne(e[0] + e[1]))(n) || (o = -2), o;
    }, ue = (e, ...t)=>setTimeout(()=>e(...t), 0), de = (e)=>{
        let t = !1;
        return function() {
            return t ? void 0 : (t = !0, Reflect.apply(e, this, arguments));
        };
    }, fe = (e)=>e, me = (e)=>Math.round(1e3 * e) / 1e3, pe = (e)=>e.charAt(0).toUpperCase() + e.slice(1), he = (e)=>"" != `${e}` && void 0 !== e, ye = (e)=>e();
    const ge = (e, t, n)=>{
        if (typeof e !== t) throw new TypeError(`${n} is not a ${pe(t)}`);
    };
    let be = !0, ve = b;
    const ze = (we = function(n = {}) {
        const l = {}, u = {}, p = [], h = {
            ...a,
            expand: !n.collapsed || a.expanded,
            ...n
        };
        let y = "";
        function g() {
            p.length = 0, y = "";
        }
        function b() {
            delete h.event, g();
        }
        const v = ()=>!!p.some(([e])=>e in i) || !!h.expand;
        function z() {
            if (0 !== p.length) {
                c[v() ? "group" : "groupCollapsed"](`%c${h.label}%c ${((e)=>{
                    const t = e.event || e.defaultEvent;
                    return t ? `${t}` : "";
                })(h)} %c${h.showTime ? y : ""}`, e, t, o);
                for (const [e, ...t] of p)c.assert(e in c, `Unknown console method: ${e}`), e in c && c[e](...t);
                c.groupEnd(), b();
            } else b();
        }
        function w() {
            "" === y && (y = function() {
                const e = new Date, t = (t, n)=>e[t]().toString().padStart(n, "0");
                return `@ ${t("getHours", 2)}:${t("getMinutes", 2)}:${t("getSeconds", 2)}.${t("getMilliseconds", 3)}`;
            }());
        }
        function $(e, ...t) {
            0 === p.length && (w(), queueMicrotask(()=>queueMicrotask(z))), p.push([
                e,
                ...t
            ]);
        }
        function S(e = r, ...t) {
            l[e] ? $("log", `${e}: ${performance.now() - l[e]} ms`, ...t) : $("timeLog", e, ...t);
        }
        return {
            ...m(h, f(h)),
            ...m(console, (e)=>[
                    e,
                    (...t)=>$(e, ...t)
                ]),
            ...m(s, d),
            assert: function(e, ...t) {
                !0 !== e && $("assert", e, ...t);
            },
            count: function(e = r) {
                u[e] ? u[e] += 1 : u[e] = 1, $("log", `${e}: ${u[e]}`);
            },
            countReset: function(e = r) {
                delete u[e];
            },
            endAutoGroup: z,
            errorBoundary: (e)=>(...t)=>{
                    let n;
                    try {
                        n = e(...t);
                    } catch (e) {
                        if (!Error.prototype.isPrototypeOf(e)) throw e;
                        $("error", e), z();
                    }
                    return n;
                },
            event: function(e) {
                w(), h.event = e;
            },
            purge: g,
            time: function(e = r) {
                w(), l[e] = performance.now();
            },
            timeEnd: function(e = r) {
                S(e), delete l[e];
            },
            timeLog: S,
            touch: w
        };
    }, we?.__esModule ? we.default : we);
    var we;
    const $e = ze({
        label: `${b}(child)`,
        expand: !1
    });
    var Se;
    const Oe = (Se = "log", (...e)=>!be || $e[Se](...e));
    const { assert: Ee, endAutoGroup: Me, error: ke, errorBoundary: je, event: xe, label: Te, purge: Ae, warn: Ce } = $e, Ie = (e)=>{
        var t;
        return $e.warn((t = fe, (e)=>window.chrome ? t(e.replaceAll("<br>", "\n").replaceAll("<rb>", "[31;1m").replaceAll("</>", "[m").replaceAll("<b>", "[1m").replaceAll("<i>", "[3m").replaceAll("<u>", "[4m")) : t(e.replaceAll("<br>", "\n").replaceAll(/<[/a-z]+>/gi, "")))(e));
    }, Ne = ((e)=>(t, n = "renamed to")=>(o, r, i = "", a = "")=>e(a, `<rb>Deprecated ${t}(${o.replace("()", "")})</>\n\nThe <b>${o}</> ${t.toLowerCase()} has been ${n} <b>${r}</>. ${i}Use of the old ${t.toLowerCase()} will be removed in a future version of <i>iframe-resizer</>.`))((e, t)=>Ie(t)), Pe = Ne("Method"), Re = Ne("Method", "replaced with"), Be = Ne("Option"), qe = [
        "min-height",
        "min-width",
        "max-height",
        "max-width"
    ], Le = new Set, De = (e, t)=>window.getComputedStyle(e).getPropertyValue(t), Fe = (e, t)=>{
        var n;
        return (n = De(e, t)) && "0px" !== n && n !== L && "none" !== n;
    };
    function We({ href: e }) {
        Le.has(e) || Le.add(e);
    }
    const He = (e, t)=>(function(e, t) {
            const n = e.style[t];
            return n ? {
                source: "an inline style attribute",
                value: n
            } : null;
        })(e, t) || function(e, t) {
            for (const n of document.styleSheets)try {
                for (const o of n.cssRules || [])if (o.selectorText && e.matches(o.selectorText)) {
                    const e = o.style[t];
                    if (e) return {
                        source: "STYLE" === n.ownerNode.tagName ? "an inline <style> block" : `stylesheet (${n.href})`,
                        value: e
                    };
                }
            } catch (e) {
                We(n);
            }
            return {
                source: "cross-origin stylesheet",
                value: De(e, t)
            };
        }(e, t), Ue = (e, t)=>{
        const { source: n, value: o } = He(e, t), r = ((e)=>e.tagName ? e.tagName.toLowerCase() : "unknown")(e);
        Ie(`The <b>${t}</> CSS property is set to <b>${o}</> on the <b><${r}></> element via ${n}. This may cause issues with the correct operation of <i>iframe-resizer</>.\n\nIf you wish to restrict the size of the iframe, then you should set this property on the iframe element itself, not the content inside it.`);
    };
    function Ve() {
        for (const e of [
            document.documentElement,
            document.body
        ])for (const t of qe)Fe(e, t) && Ue(e, t);
    }
    const Ze = (e)=>(t)=>void 0 === t ? void 0 : e(t), Je = Ze((e)=>"true" === e), _e = Ze(Number), Qe = (e)=>(e)=>{
            e.size;
        }, Ge = ((e = "")=>(t)=>(n)=>{
                n.size > 0 && ke(`${t}Observer ${e}:`, ...Array.from(n).flatMap((e)=>[
                        "\n",
                        e
                    ]));
            })("already attached"), Ye = (e)=>(e)=>{
            e.size;
        }, Xe = (t, n = !0)=>(o)=>{
            o > 0 && Oe(`${n ? "At" : "De"}tached ${t}Observer ${n ? "to" : "from"} %c${o}%c element${1 === o ? "" : "s"}`, h, e);
        }, Ke = (e, t, n, o)=>{
        const r = Ye(e);
        return (e)=>{
            const i = new Set;
            let a = 0;
            for (const o of e)n.has(o) && (t.unobserve(o), n.delete(o), i.add(o), a += 1);
            r(i), o(a), i.clear();
        };
    }, et = new Set, tt = new Set, nt = new Set, ot = [], rt = {
        attributes: !0,
        attributeFilter: [
            T,
            j
        ],
        attributeOldValue: !1,
        characterData: !1,
        characterDataOldValue: !1,
        childList: !0,
        subtree: !0
    };
    let it, at = 1, st = !1, ct = 0;
    const lt = (e)=>{
        e.size;
    }, ut = (e)=>{
        e.size;
    }, dt = (e)=>{
        e.size;
    }, ft = (e)=>e.nodeType !== Node.ELEMENT_NODE || ee.has(e.tagName.toLowerCase());
    function mt(e) {
        const t = e.addedNodes;
        for (const e of t)ft(e) || et.add(e);
    }
    function pt(e) {
        const t = e.removedNodes;
        for (const e of t)ft(e) || (et.has(e) ? (et.delete(e), nt.add(e)) : tt.add(e));
    }
    const ht = (e)=>{
        Oe("Mutations:", e);
        for (const t of e)mt(t), pt(t);
        lt(et), ut(tt), dt(nt), nt.clear();
    };
    const yt = (e)=>()=>{
            const t = performance.now(), n = t - ct, o = 16 * at++ + 2;
            if (n > o && n < 200) return xe("mutationThrottled"), Oe("Update delayed due to heavy workload on the callStack"), Oe(`EventLoop busy time: %c${me(n)}ms %c> Max wait: %c${o - 2}ms`, h, y, h), setTimeout(it, 16 * at), void (ct = t);
            at = 1, ot.forEach(ht), ot.length = 0, st = !1, tt.size, et.size, e({
                addedNodes: et,
                removedNodes: tt
            }), et.clear(), tt.clear();
        };
    function gt(e) {
        ot.push(e), st || (ct = performance.now(), st = !0, requestAnimationFrame(it));
    }
    function bt(e) {
        const t = new window.MutationObserver(gt), n = document.body || document.documentElement;
        return it = yt(e), t.observe(n, rt), Oe("Attached MutationObserver to body"), {
            ...t,
            disconnect: ()=>{
                et.clear(), tt.clear(), ot.length = 0, t.disconnect(), Oe("Detached MutationObserver");
            }
        };
    }
    const vt = "Overflow", zt = Xe(vt), wt = Xe(vt, !1), $t = Qe(vt), St = Ge(vt), Ot = (e)=>e.hidden || null === e.offsetParent || "none" === e.style.display, Et = (e, t)=>{
        const n = t.side, o = {
            root: t.root,
            rootMargin: "0px",
            threshold: 1
        }, r = window?.requestAnimationFrame || fe, i = (t = !1)=>e(t), a = (e, t)=>0 === e || e > t[n], s = (e, t)=>e.toggleAttribute(x, t);
        const c = new IntersectionObserver(function(e) {
            for (const t of e){
                const { boundingClientRect: e, rootBounds: o, target: r } = t;
                if (!o) continue;
                const i = e[n], c = a(i, o) && !Ot(r);
                s(r, c);
            }
            r(i);
        }, o), l = new WeakSet;
        return {
            attachObservers: function(e) {
                const t = new Set, n = new Set;
                let o = 0;
                for (const r of e)r.nodeType === Node.ELEMENT_NODE && (l.has(r) ? t.add(r) : (c.observe(r), l.add(r), n.add(r), o += 1));
                St(t), $t(n), zt(o), n.clear(), t.clear();
            },
            detachObservers: Ke(vt, c, l, wt),
            disconnect: ()=>{
                c.disconnect(), Oe("Detached OverflowObserver");
            }
        };
    }, Mt = "--ifr-start", kt = "--ifr-end", jt = "--ifr-measure", xt = [];
    let Tt, At = {}, Ct = 0;
    function It() {
        try {
            performance.clearMarks(Mt), performance.clearMarks(kt), performance.clearMeasures(jt);
        } catch  {}
    }
    function Nt(e) {
        e.getEntries().forEach((e)=>{
            if (e.name === kt) try {
                const { duration: t } = performance.measure(jt, Mt, kt);
                At = e.detail, xt.push(t), xt.length > 100 && xt.shift();
            } catch  {}
        });
    }
    function Pt() {
        Oe("Attached PerformanceObserver to page");
        const e = new PerformanceObserver(Nt);
        return e.observe({
            entryTypes: [
                "mark"
            ]
        }), Tt = setInterval(()=>{
            if (xt.length < 10) return;
            if (At.hasTags && At.len < 25) return;
            xt.sort();
            const e = Math.min(xt.reduce((e, t)=>e + t, 0) / xt.length, xt[Math.floor(xt.length / 2)]), t = me(e);
            t > Ct && (Ct = t, xe("performanceObserver")), It(), e <= 4 || (clearInterval(Tt), Ie(`<rb>Performance Warning</>\n\nCalculating the page size is taking an excessive amount of time (${me(e)}ms).\n\nTo improve performance add the <b>data-iframe-size</> attribute to the ${At.Side.toLowerCase()} most element on the page. For more details see: <u>https://iframe-resizer.com/perf</>.`));
        }, 5e3), {
            disconnect: ()=>{
                It(), clearInterval(Tt), e.disconnect(), Oe("Detached PerformanceObserver");
            }
        };
    }
    const Rt = "Resize", Bt = Xe(Rt), qt = Xe(Rt, !1), Lt = Qe(Rt), Dt = Ge(Rt), Ft = new WeakSet, Wt = new Set, Ht = new Set;
    let Ut;
    function Vt(e) {
        let t = 0;
        for (const n of e){
            if (n.nodeType !== Node.ELEMENT_NODE) continue;
            const e = getComputedStyle(n)?.position;
            "" !== e && "static" !== e && (Ft.has(n) ? Wt.add(n) : (Ut.observe(n), Ft.add(n), Ht.add(n), t += 1));
        }
        Dt(Wt), Lt(Ht), Bt(t), Ht.clear(), Wt.clear();
    }
    function Zt(e) {
        const t = new IntersectionObserver((t)=>e(t[0].isIntersecting), {
            threshold: 0
        }), n = document.documentElement;
        return t.observe(n), Oe("Attached VisibilityObserver to page"), {
            disconnect: ()=>{
                t.disconnect(), Oe("Detached VisibilityObserver");
            }
        };
    }
    const Jt = (e)=>(t, n)=>{
            if (n in t) {
                if (typeof t[n] === e) return t[n];
                throw new TypeError(`${n} is not a ${e}.`);
            }
        }, _t = Jt(q), Qt = Jt(R), Gt = Jt(P);
    "undefined" != typeof window && function() {
        const o = {
            height: ()=>(Ce("Custom height calculation function not defined"), Cn.auto()),
            width: ()=>(Ce("Custom width calculation function not defined"), In.auto())
        }, r = {
            bodyOffset: 1,
            bodyScroll: 1,
            offset: 1,
            documentElementOffset: 1,
            documentElementScroll: 1,
            boundingClientRect: 1,
            max: 1,
            min: 1,
            grow: 1,
            lowestElement: 1
        }, i = {}, a = L, s = [], c = "scroll";
        let l, u, d, f, m, p, ne, ie = !0, se = "", me = 0, ze = "", we = "", Se = !1, Ne = !0, qe = !1, Le = !0, De = !1, Fe = !1, We = !0, He = !1, Ue = 1, Ze = a, Qe = "", Ge = !0, Ye = {}, Xe = !1, et = !1, tt = !1, nt = 0, ot = !1, rt = 0, it = 0, at = new Set, st = "", ct = "child", lt = !1, ut = "", dt = [], ft = window.parent, mt = "*", pt = 0, ht = !1, yt = 1, gt = c, vt = window, zt = ()=>{
            Ce("onMessage function not defined");
        }, wt = ()=>{}, $t = null, St = null;
        function Ot(e) {
            var t;
            !function(e) {
                st = e[0] ?? st, me = _e(e[1]) ?? me, qe = Je(e[2]) ?? qe, tt = Je(e[3]) ?? tt, ie = Je(e[6]) ?? ie, ze = e[7] ?? ze, Ze = e[8] ?? Ze, se = e[9] ?? se, we = e[10] ?? we, pt = _e(e[11]) ?? pt, Ye.enable = Je(e[12]) ?? !1, ct = e[13] ?? ct, gt = e[14] ?? gt, ot = Je(e[15]) ?? ot, rt = _e(e[16]) ?? rt, it = _e(e[17]) ?? it, Ne = Je(e[18]) ?? Ne, l = e[19] ?? l, p = e[20] ?? p, nt = _e(e[21]) ?? nt, et = Je(e[23]) ?? et;
            }(e), ve = (t = {
                id: st,
                enabled: tt,
                expand: et
            }).id || b, $e.label(`${ve}`), $e.expand(t.expand), be = t.enabled, function() {
                function e(e) {
                    ne = _t(e, "onBeforeResize") ?? ne, zt = _t(e, "onMessage") ?? zt, wt = _t(e, "onReady") ?? wt, typeof e?.offset === R && (Be(I, N), Ne && (rt = Qt(e, I) ?? rt), qe && (it = Qt(e, I) ?? it)), typeof e?.offsetSize === R && (Ne && (rt = Qt(e, N) ?? rt), qe && (it = Qt(e, N) ?? it)), u = Gt(e, oe(re[0])) ?? u, Qe = Gt(e, "ignoreSelector") ?? Qe, ut = Gt(e, "sizeSelector") ?? ut, mt = Gt(e, "targetOrigin") ?? mt, Ze = e?.heightCalculationMethod || Ze, gt = e?.widthCalculationMethod || gt;
                }
                function t(e, t) {
                    return typeof e === q && (Ie(`<rb>Deprecated Option(${t}CalculationMethod)</>\n\nThe use of <b>${t}CalculationMethod</> as a function is deprecated and will be removed in a future version of <i>iframe-resizer</>. Please use the new <b>onBeforeResize</> event handler instead.\n\nSee <u>https://iframe-resizer.com/api/child</> for more details.`), o[t] = e, e = "custom"), e;
                }
                if (1 === nt) return;
                const n = window.iframeResizer || window.iFrameResizer;
                typeof n === B && (e(n), Ze = t(Ze, A), gt = t(gt, C), Oe(`Set targetOrigin for parent: %c${mt}`, h));
            }(), [
                Bt,
                Dt,
                an,
                It,
                Lt,
                on,
                rn,
                tn,
                Nt,
                At,
                Se ? fe : Ve,
                Jt,
                dn,
                un,
                ln,
                Yt,
                ()=>Wt("background", se),
                ()=>Wt("padding", we),
                Se ? fe : Xt,
                cn,
                sn,
                Sn,
                xt
            ].forEach((e)=>{
                try {
                    e();
                } catch (e) {
                    if (nt < 0) throw e;
                    Ie("<rb>Error in setup function</>\n<i>iframe-resizer</> detected an error during setup.\n\nPlease report the following error message at <u>https://github.com/davidjbradshaw/iframe-resizer/issues</>"), ke(e);
                }
            }), Tt(de(wt)), Dn(z, "Init message from host page", void 0, void 0, `${g}:${nt}`), document.title && "" !== document.title && Hn(0, 0, M, document.title);
        }
        function jt({ persisted: e }) {
            e || Hn(0, 0, "beforeUnload"), xe($), Oe("Page persisted:", e), e || s.forEach(ye);
        }
        const xt = ()=>te(window, $.toLowerCase(), jt);
        function Tt(e) {
            "complete" === document.readyState ? ue(e) : te(document, D, ()=>Tt(e));
        }
        function At() {
            dt = document.querySelectorAll(`[${j}]`), He = dt.length > 0;
        }
        let Ct = 0;
        function It() {
            const n = document.querySelectorAll(`*[${T}]`);
            return De = n.length > 0, De && n.length !== Ct && (function(n) {
                const o = 1 === n.length ? "" : "s";
                Ce(`%c[${T}]%c found on %c${n.length}%c element${o}`, t, e, t, e);
            }(n), Ct = n.length), De;
        }
        function Nt() {
            "BackCompat" === document.compatMode && Ie("<rb>Quirks Mode Detected</>\n\nThis iframe is running in the browser's legacy <b>Quirks Mode</>, this may cause issues with the correct operation of <i>iframe-resizer</>. It is recommended that you switch to the modern <b>Standards Mode</>.\n\nFor more information see <u>https://iframe-resizer.com/quirks-mode</>.\n");
        }
        function Bt() {
            p && "" !== p && "false" !== p ? p !== g && Ie(`<b>Version mismatch</>\n\nThe parent and child pages are running different versions of <i>iframe resizer</>.\n\nParent page: ${p} - Child page: ${g}.\n`) : Ie("<rb>Legacy version detected on parent page</>\n\nDetected legacy version of parent page script. It is recommended to update the parent page to use <b>@iframe-resizer/parent</>.\n\nSee <u>https://iframe-resizer.com/setup/</> for more details.\n");
        }
        function Lt() {
            try {
                lt = 1 === nt || "iframeParentListener" in window.parent;
            } catch (e) {}
        }
        function Dt() {
            qe === Ne && (Se = !0);
        }
        function Wt(e, t) {
            void 0 !== t && "" !== t && "null" !== t && (document.body.style.setProperty(e, t), Oe(`Set body ${e}: %c${t}`, h));
        }
        function Ht(e, t, n) {
            if ("" !== n) for (const e of document.querySelectorAll(n))e.toggleAttribute(t, !0);
        }
        function Jt() {
            Ht(0, j, ut), Ht(0, T, Qe);
        }
        function Yt() {
            var e, t;
            void 0 === ze && (ze = `${me}px`), Wt("margin", (e = "margin", (t = ze).includes("-") && (Ce(`Negative CSS value ignored for ${e}`), t = ""), t));
        }
        function Xt() {
            const e = (e)=>e.style.setProperty(A, L, "important");
            e(document.documentElement), e(document.body);
        }
        function Kt(e) {
            ({
                add (t) {
                    function n() {
                        Dn(e.eventName, e.eventType);
                    }
                    i[t] = n, te(window, t, n, {
                        passive: !0
                    });
                },
                remove (e) {
                    const t = i[e];
                    var n, o;
                    delete i[e], n = e, o = t, window.removeEventListener(n, o, !1);
                }
            })[e.method](e.eventName);
        }
        function en(e) {
            Kt({
                method: e,
                eventType: "After Print",
                eventName: "afterprint"
            }), Kt({
                method: e,
                eventType: "Before Print",
                eventName: "beforeprint"
            }), Kt({
                method: e,
                eventType: "Ready State Change",
                eventName: D
            });
        }
        function tn() {
            let e = !1;
            const t = (t)=>document.querySelectorAll(`[${t}]`).forEach((n)=>{
                    e = !0, n.removeAttribute(t), n.toggleAttribute(j, !0);
                });
            t("data-iframe-height"), t("data-iframe-width"), e && Ie("<rb>Deprecated Attributes</>\n          \nThe <b>data-iframe-height</> and <b>data-iframe-width</> attributes have been deprecated and replaced with the single <b>data-iframe-size</> attribute. Use of the old attributes will be removed in a future version of <i>iframe-resizer</>.");
        }
        function nn(e, t, n) {
            const { label: o } = n;
            return t !== e && (e in n || (Ce(`${e} is not a valid option for ${o}CalculationMethod.`), e = t), e in r) && Ie(`<rb>Deprecated ${o}CalculationMethod (${e})</>\n\nThis version of <i>iframe-resizer</> can auto detect the most suitable ${o} calculation method. It is recommended that you ${p ? "remove this option." : `set this option to <b>'auto'</> when using an older version of <i>iframe-resizer</> on the parent page. This can be done on the child page by adding the following code:\n          \nwindow.iframeResizer = {\n  license: 'xxxx',\n  ${o}CalculationMethod: AUTO,\n}\n`}\n`), e;
        }
        function on() {
            Ze = nn(Ze, a, Cn);
        }
        function rn() {
            gt = nn(gt, c, In);
        }
        function an() {
            const t = nt, n = le({
                key: l
            }), o = le({
                key: u
            });
            if (nt = Math.max(n, o), nt < 0) {
                if (nt = Math.min(n, o), Ae(), Ie(`${ce(nt + 2)}${ce(2)}`), he(p)) throw ce(nt + 2).replace(/<\/?[a-z][^>]*>|<\/>/gi, "");
            } else (!he(p) || t > -1 && nt > t) && (sessionStorage.getItem("ifr") !== g && function(t, n) {
                console.info(`${ve} %ciframe-resizer ${t}`, be || n < 1 ? "font-weight: bold;" : e);
            }(`v${g} (${((e)=>oe(ae[e]))(nt)})`, nt), nt < 2 && Ie(ce(3)), sessionStorage.setItem("ifr", g));
        }
        function sn() {
            en("add"), s.push(()=>en("remove"));
        }
        function cn() {
            const e = document.createElement("div");
            e.style.clear = "both", e.style.display = "block", e.style.height = "0", document.body.append(e);
        }
        function ln() {
            function e(e) {
                const t = e.getBoundingClientRect(), n = {
                    x: document.documentElement.scrollLeft,
                    y: document.documentElement.scrollTop
                };
                return {
                    x: parseInt(t.left, k) + parseInt(n.x, k),
                    y: parseInt(t.top, k) + parseInt(n.y, k)
                };
            }
            function t(t) {
                const n = t.split("#")[1] || t, o = decodeURIComponent(n), r = document.getElementById(o) || document.getElementsByName(o)[0];
                void 0 === r ? Hn(0, 0, "inPageLink", `#${n}`) : function(t) {
                    const n = e(t);
                    Hn(n.y, n.x, E);
                }(r);
            }
            function n() {
                const { hash: e, href: n } = window.location;
                "" !== e && "#" !== e && t(n);
            }
            const { enable: o } = Ye;
            o && (1 === nt ? Ie(ce(5)) : (function() {
                for (const e of document.querySelectorAll('a[href^="#"]'))"#" !== e.getAttribute("href") && te(e, "click", (n)=>{
                    n.preventDefault(), t(e.getAttribute("href"));
                });
            }(), te(window, "hashchange", n), setTimeout(n, 128))), Ye = {
                ...Ye,
                findTarget: t
            };
        }
        function un() {
            function e(e) {
                Hn(0, 0, e.type, `${e.screenY}:${e.screenX}`);
            }
            function t(t, n) {
                te(window.document, t, e);
            }
            !0 === ot && (t("mouseenter"), t("mouseleave"));
        }
        function dn() {
            1 !== nt && (vt.parentIframe = Object.freeze({
                autoResize: (e)=>(ge(e, "boolean", "parentIframe.autoResize(enable) enable"), !1 === qe && !1 === Ne ? (xe(H), Ie("Auto Resize can not be changed when <b>direction</> is set to 'none'."), !1) : (!0 === e && !1 === ie ? (ie = !0, queueMicrotask(()=>Dn(H, "Auto Resize enabled"))) : !1 === e && !0 === ie && (ie = !1), Hn(0, 0, "autoResize", JSON.stringify(ie)), ie)),
                close () {
                    Hn(0, 0, "close");
                },
                getId: ()=>st,
                getOrigin: ()=>(xe("getOrigin"), Pe("getOrigin()", "getParentOrigin()"), d),
                getParentOrigin: ()=>d,
                getPageInfo (e) {
                    if (typeof e === q) return $t = e, Hn(0, 0, S), void Re("getPageInfo()", "getParentProps()", "See <u>https://iframe-resizer.com/upgrade</> for details. ");
                    $t = null, Hn(0, 0, "pageInfoStop");
                },
                getParentProps: (e)=>(ge(e, q, "parentIframe.getParentProps(callback) callback"), St = e, Hn(0, 0, O), ()=>{
                        St = null, Hn(0, 0, "parentInfoStop");
                    }),
                getParentProperties (e) {
                    Pe("getParentProperties()", "getParentProps()"), this.getParentProps(e);
                },
                moveToAnchor (e) {
                    ge(e, P, "parentIframe.moveToAnchor(anchor) anchor"), Ye.findTarget(e);
                },
                reset () {
                    !function() {
                        const e = Ze;
                        Ze = a, ht || (ht = !0, requestAnimationFrame(()=>{
                            ht = !1;
                        })), Fn("reset"), Ze = e;
                    }();
                },
                setOffsetSize (e) {
                    ge(e, R, "parentIframe.setOffsetSize(offset) offset"), rt = e, it = e, Dn(_, `parentIframe.setOffsetSize(${e})`);
                },
                scrollBy (e, t) {
                    ge(e, R, "parentIframe.scrollBy(x, y) x"), ge(t, R, "parentIframe.scrollBy(x, y) y"), Hn(t, e, "scrollBy");
                },
                scrollTo (e, t) {
                    ge(e, R, "parentIframe.scrollTo(x, y) x"), ge(t, R, "parentIframe.scrollTo(x, y) y"), Hn(t, e, "scrollTo");
                },
                scrollToOffset (e, t) {
                    ge(e, R, "parentIframe.scrollToOffset(x, y) x"), ge(t, R, "parentIframe.scrollToOffset(x, y) y"), Hn(t, e, E);
                },
                sendMessage (e, t) {
                    t && ge(t, P, "parentIframe.sendMessage(msg, targetOrigin) targetOrigin"), Hn(0, 0, w, JSON.stringify(e), t);
                },
                setHeightCalculationMethod (e) {
                    Ze = e, on();
                },
                setWidthCalculationMethod (e) {
                    gt = e, rn();
                },
                setTargetOrigin (e) {
                    ge(e, P, "parentIframe.setTargetOrigin(targetOrigin) targetOrigin"), mt = e;
                },
                resize (e, t) {
                    void 0 !== e && ge(e, R, "parentIframe.resize(customHeight, customWidth) customHeight"), void 0 !== t && ge(t, R, "parentIframe.resize(customHeight, customWidth) customWidth"), Dn(V, `parentIframe.resize(${e || ""}${t ? `,${t}` : ""})`, e, t);
                },
                size (e, t) {
                    Pe("size()", "resize()"), this.resize(e, t);
                }
            }), vt.parentIFrame = vt.parentIframe);
        }
        let fn = new Set;
        function mn() {
            const e = document.querySelectorAll(`[${x}]`);
            at = function(e) {
                const t = new Set, n = new Set;
                for (const o of e)o.closest(`[${T}]`) ? n.add(o) : t.add(o);
                return n.size > 0 && queueMicrotask(()=>{
                    xe("overflowIgnored"), Oe("Ignoring elements with [data-iframe-ignore] > *:\n", n), Me();
                }), t;
            }(e), Fe = at.size > 0, typeof Set.prototype.symmetricDifference === q && (We = at.symmetricDifference(fn).size > 0), fn = at;
        }
        function pn() {
            switch(mn(), !0){
                case !We:
                    return;
                case at.size > 1:
                    Oe("Overflowed Elements:", at);
                    break;
                case Fe:
                    break;
                default:
                    Oe("No overflow detected");
            }
            Dn(G, "Overflow updated");
        }
        function hn(e) {
            const t = {
                root: document.documentElement,
                side: Ne ? F : W
            };
            return f = Et(pn, t), f.attachObservers(e), f;
        }
        function yn(e) {
            if (!Array.isArray(e) || 0 === e.length) return;
            const t = e[0].target;
            Dn(Q, `Element resized <${function(e) {
                switch(!0){
                    case !he(e):
                        return "";
                    case he(e.id):
                        return `${e.nodeName}#${e.id}`;
                    case he(e.name):
                        return `${e.nodeName} (${e.name}`;
                    case he(e.className):
                        return `${e.nodeName}.${e.className}`;
                    default:
                        return e.nodeName;
                }
            }(t)}>`);
        }
        function gn(e) {
            return Ut = new ResizeObserver(yn), Ut.observe(document.body), Ft.add(document.body), Oe("Attached ResizeObserver to body"), m = {
                attachObserverToNonStaticElements: Vt,
                detachObservers: Ke(Rt, Ut, Ft, qt),
                disconnect: ()=>{
                    Ut.disconnect(), Oe("Detached ResizeObserver");
                }
            }, m.attachObserverToNonStaticElements(e), m;
        }
        function bn(e) {
            Xe = !e, Dn(X, "Visibility changed");
        }
        const vn = (e)=>{
            const t = new Set;
            for (const n of e){
                t.add(n);
                for (const e of kn(n))t.add(e);
            }
            return Oe("Inspecting:\n", t), t;
        }, zn = (e)=>{
            if (0 === e.size) return;
            xe("addObservers");
            const t = vn(e);
            f.attachObservers(t), m.attachObserverToNonStaticElements(t), Me();
        }, wn = (e)=>{
            if (0 === e.size) return;
            xe("removeObservers");
            const t = vn(e);
            f.detachObservers(t), m.detachObservers(t), Me();
        };
        function $n(e) {
            !function({ addedNodes: e, removedNodes: t }) {
                xe("contentMutated"), Jt(), At(), mn(), Me(), wn(t), zn(e);
            }(e), Dn(Y, "Mutation Observed");
        }
        function Sn() {
            const e = kn(document.documentElement);
            var t;
            t = [
                bt($n),
                hn(e),
                Pt(),
                gn(e),
                Zt(bn)
            ], s.push(...t.map((e)=>e.disconnect));
        }
        function On(e) {
            performance.mark(Mt);
            const t = pe(e);
            let n = 1, o = document.documentElement, r = He ? 0 : document.documentElement.getBoundingClientRect().bottom;
            const i = He ? dt : Fe ? Array.from(at) : kn(document.documentElement);
            for (const t of i)n = t.getBoundingClientRect()[e] + parseFloat(getComputedStyle(t).getPropertyValue(`margin-${e}`)), n > r && (r = n, o = t);
            return Oe(`${t} position calculated from:`, o), Oe(`Checked %c${i.length}%c elements`, h, y), performance.mark(kt, {
                detail: {
                    hasTags: He,
                    len: i.length,
                    logging: tt,
                    Side: t
                }
            }), r;
        }
        const En = (e)=>[
                e.bodyOffset(),
                e.bodyScroll(),
                e.documentElementOffset(),
                e.documentElementScroll(),
                e.boundingClientRect()
            ], Mn = `* ${Array.from(ee).map((e)=>`:not(${e})`).join("")}`, kn = (e)=>e.querySelectorAll(Mn), jn = {
            height: 0,
            width: 0
        }, xn = {
            height: 0,
            width: 0
        }, Tn = [
            h,
            y,
            h
        ];
        function An(e) {
            function t() {
                return xn[o] = r, jn[o] = s, Math.max(r, 1);
            }
            const n = e === Cn, o = e.label, r = e.boundingClientRect(), i = Math.ceil(r), a = Math.floor(r), s = ((e)=>e.documentElementScroll() + Math.max(0, e.getOffset()))(e), c = `HTML: %c${r}px %cPage: %c${s}px`;
            let l = 1;
            switch(!0){
                case !e.enabled():
                    return Math.max(s, 1);
                case He:
                    Oe("Found element with data-iframe-size attribute"), l = e.taggedElement();
                    break;
                case !Fe && Le && 0 === xn[o] && 0 === jn[o]:
                    Oe(`Initial page size values: ${c}`, ...Tn), l = t();
                    break;
                case ht && r === xn[o] && s === jn[o]:
                    Oe(`Size unchanged: ${c}`, ...Tn), l = Math.max(r, s);
                    break;
                case 0 === r && 0 !== s:
                    Oe(`Page is hidden: ${c}`, ...Tn), l = s;
                    break;
                case !Fe && r !== xn[o] && s <= jn[o]:
                    Oe(`New <html> size: ${c} `, ...Tn), Oe(`Previous <html> size: %c${xn[o]}px`, h), l = t();
                    break;
                case !n:
                    l = e.taggedElement();
                    break;
                case !Fe && r < xn[o]:
                    Oe(`<html> size decreased: ${c}`, ...Tn), l = t();
                    break;
                case s === a || s === i:
                    Oe(`<html> size equals page size: ${c}`, ...Tn), l = t();
                    break;
                case r > s:
                    Oe(`Page size < <html> size: ${c}`, ...Tn), l = t();
                    break;
                case Fe:
                    Oe("Found elements possibly overflowing <html> "), l = e.taggedElement();
                    break;
                default:
                    Oe(`Using <html> size: ${c}`, ...Tn), l = t();
            }
            return Oe(`Content ${o}: %c${l}px`, h), l += function(e) {
                const t = e.getOffset();
                return 0 !== t && Oe(`Page offsetSize: %c${t}px`, h), t;
            }(e), Math.max(l, 1);
        }
        const Cn = {
            label: A,
            enabled: ()=>Ne,
            getOffset: ()=>rt,
            auto: ()=>An(Cn),
            bodyOffset: ()=>{
                const { body: e } = document, t = getComputedStyle(e);
                return e.offsetHeight + parseInt(t.marginTop, k) + parseInt(t.marginBottom, k);
            },
            bodyScroll: ()=>document.body.scrollHeight,
            offset: ()=>Cn.bodyOffset(),
            custom: ()=>o.height(),
            documentElementOffset: ()=>document.documentElement.offsetHeight,
            documentElementScroll: ()=>document.documentElement.scrollHeight,
            boundingClientRect: ()=>Math.max(document.documentElement.getBoundingClientRect().bottom, document.body.getBoundingClientRect().bottom),
            max: ()=>Math.max(...En(Cn)),
            min: ()=>Math.min(...En(Cn)),
            grow: ()=>Cn.max(),
            lowestElement: ()=>On(F),
            taggedElement: ()=>On(F)
        }, In = {
            label: C,
            enabled: ()=>qe,
            getOffset: ()=>it,
            auto: ()=>An(In),
            bodyScroll: ()=>document.body.scrollWidth,
            bodyOffset: ()=>document.body.offsetWidth,
            custom: ()=>o.width(),
            documentElementScroll: ()=>document.documentElement.scrollWidth,
            documentElementOffset: ()=>document.documentElement.offsetWidth,
            boundingClientRect: ()=>Math.max(document.documentElement.getBoundingClientRect().right, document.body.getBoundingClientRect().right),
            max: ()=>Math.max(...En(In)),
            min: ()=>Math.min(...En(In)),
            rightMostElement: ()=>On(W),
            scroll: ()=>Math.max(In.bodyScroll(), In.documentElementScroll()),
            taggedElement: ()=>On(W)
        }, Nn = (e, t)=>!(Math.abs(e - t) <= pt);
        function Pn(e, t) {
            const n = e[t](), o = e.enabled() && void 0 !== ne ? function(e) {
                const t = ne(e);
                if (void 0 === t) throw new TypeError("No value returned from onBeforeResize(), expected a numeric value");
                if (Number.isNaN(t)) throw new TypeError(`Invalid value returned from onBeforeResize(): ${t}, expected Number`);
                if (t < 1) throw new RangeError(`Out of range value returned from onBeforeResize(): ${t}, must be at least 1`);
                return t;
            }(n) : n;
            return Ee(o >= 1, `New iframe ${e.label} is too small: ${o}, must be at least 1`), o;
        }
        let Rn = !1;
        const Bn = de(()=>Ie(ce(4)));
        let qn, Ln = !1;
        const Dn = je((e, t, n, o, r)=>{
            switch(xe(e), !0){
                case !0 === Xe:
                    if (!0 === Ln) break;
                    Ln = !0, Rn = !1, cancelAnimationFrame(qn);
                    break;
                case !0 === Rn && e !== G:
                    Ae();
                    break;
                case !ie && !(e in J):
                    Oe("Resizing disabled");
                    break;
                default:
                    Ln = !1, Rn = !0, performance.now(), qn = requestAnimationFrame(()=>{
                        Rn = !1, xe("requestAnimationFrame");
                    }), function(e, t, n, o, r) {
                        const i = n ?? Pn(Cn, Ze), a = o ?? Pn(In, gt);
                        switch(Ne && Nn(Ue, i) || qe && Nn(yt, a) ? U : e){
                            case z:
                            case H:
                            case U:
                                Ue = i, yt = a;
                            case _:
                                Wn(Ue, yt, e, r);
                                break;
                            case G:
                            case Y:
                            case Q:
                            case X:
                                Ae();
                                break;
                            default:
                                Ae(), Oe("No change in content size detected");
                        }
                    }(e, 0, n, o, r);
            }
            Me();
        });
        function Fn(e) {
            Ue = Cn[Ze](), yt = In[gt](), Hn(Ue, yt, e);
        }
        function Wn(e, t, o, r, i) {
            nt < -1 || (void 0 !== i || (i = mt), function() {
                const a = `${st}:${e}:${t}:${o}${void 0 === r ? "" : `:${r}`}`;
                if (lt) try {
                    window.parent.iframeParentListener(K + a);
                } catch (e) {
                    if (1 !== nt) throw e;
                    return void Bn();
                }
                else ft.postMessage(K + a, i);
                Oe(`Sending message to parent page via ${lt ? "sameOrigin" : "postMessage"}: %c%c${a}`, n, h);
            }());
        }
        const Hn = je((e, t, n, o, r)=>{
            xe(n), Wn(e, t, n, o, r), Me();
        }), Un = je(function(e) {
            xe("onMessage");
            const { freeze: t } = Object, { parse: n } = JSON, o = (e)=>Hn(0, 0, `${e}Stop`), r = {
                init: function() {
                    if ("loading" === document.readyState) return;
                    const t = e.data.slice(13).split(v);
                    ft = e.source, d = e.origin, Ot(t), Le = !1, setTimeout(()=>{
                        Ge = !1;
                    }, 128);
                },
                reset () {
                    Ge || Fn("resetPage");
                },
                resize () {
                    Dn(Z, "Parent window requested size check");
                },
                moveToAnchor () {
                    Ye.findTarget(a());
                },
                inPageLink () {
                    this.moveToAnchor();
                },
                pageInfo () {
                    const e = a();
                    $t ? ue($t, n(e)) : o(S);
                },
                parentInfo () {
                    const e = (r = a(), t(n(r)));
                    var r;
                    St ? ue(St, e) : o(O);
                },
                message () {
                    const e = a();
                    ue(zt, n(e));
                }
            }, i = ()=>e.data.split("]")[1].split(v)[0], a = ()=>e.data.slice(e.data.indexOf(v) + 1), s = ()=>e.data.split(v)[2] in {
                    true: 1,
                    false: 1
                };
            function c() {
                const t = i();
                xe(t), t in r ? r[t]() : "iframeResize" in window || void 0 !== window.jQuery && "" in window.jQuery.prototype || s() || Ce(`Unexpected message (${e.data})`);
            }
            K === `${e.data}`.slice(0, 13) && function() {
                if (!1 !== Le) return s() ? (Te(i()), xe(z), void r.init()) : void 0;
                c();
            }();
        });
        let Vn = !1;
        const Zn = (e)=>e.postMessage("[iFrameResizerChild]Ready", window?.iframeResizer?.targetOrigin || "*");
        function Jn() {
            if ("loading" === document.readyState || !Le || Vn) return;
            const { parent: e, top: t } = window;
            xe("ready"), Zn(e), e !== t && Zn(t), Vn = !0;
        }
        "iframeChildListener" in window ? Ce("Already setup") : (window.iframeChildListener = (e)=>setTimeout(()=>Un({
                    data: e,
                    sameOrigin: !0
                })), te(window, w, Un), te(document, D, Jn), Jn());
    }();
});



})();
//# sourceMappingURL=iframe.js.map
