(() => {
  function e(e) {
    return e && e.__esModule ? e.default : e;
  }
  function t(e) {
    Object.defineProperty(e, "__esModule", { value: !0, configurable: !0 });
  }
  function n(e, t, n, i) {
    Object.defineProperty(e, t, {
      get: n,
      set: i,
      enumerable: !0,
      configurable: !0,
    });
  }
  var i,
    r,
    o,
    s,
    a = !1,
    c = !1,
    u = [];
  function l(e) {
    !(function (e) {
      u.includes(e) || u.push(e);
      c || a || ((a = !0), queueMicrotask(p));
    })(e);
  }
  function f(e) {
    let t = u.indexOf(e);
    -1 !== t && u.splice(t, 1);
  }
  function p() {
    (a = !1), (c = !0);
    for (let e = 0; e < u.length; e++) u[e]();
    (u.length = 0), (c = !1);
  }
  var d = !0;
  function h(e) {
    r = e;
  }
  var m = [],
    g = [],
    v = [];
  function y(e, t) {
    "function" == typeof t
      ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
      : ((t = e), g.push(t));
  }
  function b(e, t) {
    e._x_attributeCleanups &&
      Object.entries(e._x_attributeCleanups).forEach(([n, i]) => {
        (void 0 === t || t.includes(n)) &&
          (i.forEach((e) => e()), delete e._x_attributeCleanups[n]);
      });
  }
  var w = new MutationObserver(C),
    x = !1;
  function _() {
    w.observe(document, {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeOldValue: !0,
    }),
      (x = !0);
  }
  function O() {
    (k = k.concat(w.takeRecords())).length &&
      !E &&
      ((E = !0),
      queueMicrotask(() => {
        C(k), (k.length = 0), (E = !1);
      })),
      w.disconnect(),
      (x = !1);
  }
  var k = [],
    E = !1;
  function S(e) {
    if (!x) return e();
    O();
    let t = e();
    return _(), t;
  }
  var T = !1,
    A = [];
  function C(e) {
    if (T) return void (A = A.concat(e));
    let t = [],
      n = [],
      i = new Map(),
      r = new Map();
    for (let o = 0; o < e.length; o++)
      if (
        !e[o].target._x_ignoreMutationObserver &&
        ("childList" === e[o].type &&
          (e[o].addedNodes.forEach((e) => 1 === e.nodeType && t.push(e)),
          e[o].removedNodes.forEach((e) => 1 === e.nodeType && n.push(e))),
        "attributes" === e[o].type)
      ) {
        let t = e[o].target,
          n = e[o].attributeName,
          s = e[o].oldValue,
          a = () => {
            i.has(t) || i.set(t, []),
              i.get(t).push({ name: n, value: t.getAttribute(n) });
          },
          c = () => {
            r.has(t) || r.set(t, []), r.get(t).push(n);
          };
        t.hasAttribute(n) && null === s
          ? a()
          : t.hasAttribute(n)
          ? (c(), a())
          : c();
      }
    r.forEach((e, t) => {
      b(t, e);
    }),
      i.forEach((e, t) => {
        m.forEach((n) => n(t, e));
      });
    for (let e of n)
      if (!t.includes(e) && (g.forEach((t) => t(e)), e._x_cleanups))
        for (; e._x_cleanups.length; ) e._x_cleanups.pop()();
    t.forEach((e) => {
      (e._x_ignoreSelf = !0), (e._x_ignore = !0);
    });
    for (let e of t)
      n.includes(e) ||
        (e.isConnected &&
          (delete e._x_ignoreSelf,
          delete e._x_ignore,
          v.forEach((t) => t(e)),
          (e._x_ignore = !0),
          (e._x_ignoreSelf = !0)));
    t.forEach((e) => {
      delete e._x_ignoreSelf, delete e._x_ignore;
    }),
      (t = null),
      (n = null),
      (i = null),
      (r = null);
  }
  function L(e) {
    return P(D(e));
  }
  function j(e, t, n) {
    return (
      (e._x_dataStack = [t, ...D(n || e)]),
      () => {
        e._x_dataStack = e._x_dataStack.filter((e) => e !== t);
      }
    );
  }
  function M(e, t) {
    let n = e._x_dataStack[0];
    Object.entries(t).forEach(([e, t]) => {
      n[e] = t;
    });
  }
  function D(e) {
    return e._x_dataStack
      ? e._x_dataStack
      : "function" == typeof ShadowRoot && e instanceof ShadowRoot
      ? D(e.host)
      : e.parentNode
      ? D(e.parentNode)
      : [];
  }
  function P(e) {
    let t = new Proxy(
      {},
      {
        ownKeys: () => Array.from(new Set(e.flatMap((e) => Object.keys(e)))),
        has: (t, n) => e.some((e) => e.hasOwnProperty(n)),
        get: (n, i) =>
          (e.find((e) => {
            if (e.hasOwnProperty(i)) {
              let n = Object.getOwnPropertyDescriptor(e, i);
              if (
                (n.get && n.get._x_alreadyBound) ||
                (n.set && n.set._x_alreadyBound)
              )
                return !0;
              if ((n.get || n.set) && n.enumerable) {
                let r = n.get,
                  o = n.set,
                  s = n;
                (r = r && r.bind(t)),
                  (o = o && o.bind(t)),
                  r && (r._x_alreadyBound = !0),
                  o && (o._x_alreadyBound = !0),
                  Object.defineProperty(e, i, { ...s, get: r, set: o });
              }
              return !0;
            }
            return !1;
          }) || {})[i],
        set: (t, n, i) => {
          let r = e.find((e) => e.hasOwnProperty(n));
          return r ? (r[n] = i) : (e[e.length - 1][n] = i), !0;
        },
      }
    );
    return t;
  }
  function z(e) {
    let t = (n, i = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
        ([r, { value: o, enumerable: s }]) => {
          if (!1 === s || void 0 === o) return;
          let a = "" === i ? r : `${i}.${r}`;
          var c;
          "object" == typeof o && null !== o && o._x_interceptor
            ? (n[r] = o.initialize(e, a, r))
            : "object" != typeof (c = o) ||
              Array.isArray(c) ||
              null === c ||
              o === n ||
              o instanceof Element ||
              t(o, a);
        }
      );
    };
    return t(e);
  }
  function R(e, t = () => {}) {
    let n = {
      initialValue: void 0,
      _x_interceptor: !0,
      initialize(t, n, i) {
        return e(
          this.initialValue,
          () =>
            (function (e, t) {
              return t.split(".").reduce((e, t) => e[t], e);
            })(t, n),
          (e) => I(t, n, e),
          n,
          i
        );
      },
    };
    return (
      t(n),
      (e) => {
        if ("object" == typeof e && null !== e && e._x_interceptor) {
          let t = n.initialize.bind(n);
          n.initialize = (i, r, o) => {
            let s = e.initialize(i, r, o);
            return (n.initialValue = s), t(i, r, o);
          };
        } else n.initialValue = e;
        return n;
      }
    );
  }
  function I(e, t, n) {
    if (("string" == typeof t && (t = t.split(".")), 1 !== t.length)) {
      if (0 === t.length) throw error;
      return e[t[0]] || (e[t[0]] = {}), I(e[t[0]], t.slice(1), n);
    }
    e[t[0]] = n;
  }
  var $ = {};
  function W(e, t) {
    $[e] = t;
  }
  function N(e, t) {
    return (
      Object.entries($).forEach(([n, i]) => {
        Object.defineProperty(e, `$${n}`, {
          get() {
            let [e, n] = re(t);
            return (e = { interceptor: R, ...e }), y(t, n), i(t, e);
          },
          enumerable: !1,
        });
      }),
      e
    );
<<<<<<< HEAD
  }
  function H(e, t, n, ...i) {
    try {
      return n(...i);
    } catch (n) {
      F(n, e, t);
=======
});
// Init
window.log = _logger.log;
window.Alpine = _alpinejsDefault.default;
_alpinejsDefault.default.start();

},{"alpinejs":"69hXP","@alpinejs/morph":"h2FeS","@alpinejs/persist":"hOl6K","@ryangjchandler/alpine-tooltip":"j3Uyt","./plugins/logger":"a8yvv","./stores/layout":"2QNcl","./stores/nav":"dYphZ","./stores/inspector":"1tdkQ","./app":"bkyhi","./helpers/build":"a7dEL","../../../components/lookbook/*/component.js":"akleQ","../../../components/lookbook/*/*/component.js":"lT8lG","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./stores/pages":"hvNyC"}],"69hXP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>module_default
);
// packages/alpinejs/src/scheduler.js
var flushPending = false;
var flushing = false;
var queue = [];
function scheduler(callback) {
    queueJob(callback);
}
function queueJob(job) {
    if (!queue.includes(job)) queue.push(job);
    queueFlush();
}
function dequeueJob(job) {
    let index = queue.indexOf(job);
    if (index !== -1) queue.splice(index, 1);
}
function queueFlush() {
    if (!flushing && !flushPending) {
        flushPending = true;
        queueMicrotask(flushJobs);
>>>>>>> 8a8eeb1 (Automate basic theme generation)
    }
  }
  function F(e, t, n) {
    Object.assign(e, { el: t, expression: n }),
      console.warn(
        `Alpine Expression Error: ${e.message}\n\n${
          n ? 'Expression: "' + n + '"\n\n' : ""
        }`,
        t
      ),
      setTimeout(() => {
        throw e;
      }, 0);
  }
  var V = !0;
  function B(e, t, n = {}) {
    let i;
    return q(e, t)((e) => (i = e), n), i;
  }
  function q(...e) {
    return G(...e);
  }
  var G = U;
  function U(e, t) {
    let n = {};
    N(n, e);
    let i = [n, ...D(e)];
    if ("function" == typeof t)
      return (function (e, t) {
        return (n = () => {}, { scope: i = {}, params: r = [] } = {}) => {
          X(n, t.apply(P([i, ...e]), r));
        };
      })(i, t);
    let r = (function (e, t, n) {
      let i = (function (e, t) {
        if (Y[e]) return Y[e];
        let n = Object.getPrototypeOf(async function () {}).constructor,
          i =
            /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
              ? `(() => { ${e} })()`
              : e;
        let r = (() => {
          try {
            return new n(
              ["__self", "scope"],
              `with (scope) { __self.result = ${i} }; __self.finished = true; return __self.result;`
            );
          } catch (n) {
            return F(n, t, e), Promise.resolve();
          }
        })();
        return (Y[e] = r), r;
      })(t, n);
      return (r = () => {}, { scope: o = {}, params: s = [] } = {}) => {
        (i.result = void 0), (i.finished = !1);
        let a = P([o, ...e]);
        if ("function" == typeof i) {
          let e = i(i, a).catch((e) => F(e, n, t));
          i.finished
            ? (X(r, i.result, a, s, n), (i.result = void 0))
            : e
                .then((e) => {
                  X(r, e, a, s, n);
                })
                .catch((e) => F(e, n, t))
                .finally(() => (i.result = void 0));
        }
      };
    })(i, t, e);
    return H.bind(null, e, t, r);
  }
  var Y = {};
  function X(e, t, n, i, r) {
    if (V && "function" == typeof t) {
      let o = t.apply(n, i);
      o instanceof Promise
        ? o.then((t) => X(e, t, n, i)).catch((e) => F(e, r, t))
        : e(o);
    } else e(t);
  }
  var J = "x-";
  function K(e = "") {
    return J + e;
  }
  var Z = {};
  function Q(e, t) {
    Z[e] = t;
  }
  function ee(e, t, n) {
    let i = {},
      r = Array.from(t)
        .map(se((e, t) => (i[e] = t)))
        .filter(ue)
        .map(
          (function (e, t) {
            return ({ name: n, value: i }) => {
              let r = n.match(le()),
                o = n.match(/:([a-zA-Z0-9\-:]+)/),
                s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
                a = t || e[n] || n;
              return {
                type: r ? r[1] : null,
                value: o ? o[1] : null,
                modifiers: s.map((e) => e.replace(".", "")),
                expression: i,
                original: a,
              };
            };
          })(i, n)
        )
        .sort(de);
    return r.map((t) =>
      (function (e, t) {
        let n = () => {},
          i = Z[t.type] || n,
          [r, o] = re(e);
        !(function (e, t, n) {
          e._x_attributeCleanups || (e._x_attributeCleanups = {}),
            e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
            e._x_attributeCleanups[t].push(n);
        })(e, t.original, o);
        let s = () => {
          e._x_ignore ||
            e._x_ignoreSelf ||
            (i.inline && i.inline(e, t, r),
            (i = i.bind(i, e, t, r)),
            te ? ne.get(ie).push(i) : i());
        };
        return (s.runCleanups = o), s;
      })(e, t)
    );
  }
  var te = !1,
    ne = new Map(),
    ie = Symbol();
  function re(e) {
    let t = [],
      [n, i] = (function (e) {
        let t = () => {};
        return [
          (n) => {
            let i = r(n);
            return (
              e._x_effects ||
                ((e._x_effects = new Set()),
                (e._x_runEffects = () => {
                  e._x_effects.forEach((e) => e());
                })),
              e._x_effects.add(i),
              (t = () => {
                void 0 !== i && (e._x_effects.delete(i), o(i));
              }),
              i
            );
          },
          () => {
            t();
          },
        ];
      })(e);
    t.push(i);
    return [
      {
        Alpine: Xe,
        effect: n,
        cleanup: (e) => t.push(e),
        evaluateLater: q.bind(q, e),
        evaluate: B.bind(B, e),
      },
      () => t.forEach((e) => e()),
    ];
  }
  var oe = (e, t) => ({ name: n, value: i }) => (
    n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: i }
  );
  function se(e = () => {}) {
    return ({ name: t, value: n }) => {
      let { name: i, value: r } = ae.reduce((e, t) => t(e), {
        name: t,
        value: n,
      });
      return i !== t && e(i, t), { name: i, value: r };
    };
  }
  var ae = [];
  function ce(e) {
    ae.push(e);
  }
  function ue({ name: e }) {
    return le().test(e);
  }
  var le = () => new RegExp(`^${J}([^:^.]+)\\b`);
  var fe = "DEFAULT",
    pe = [
      "ignore",
      "ref",
      "data",
      "id",
      "bind",
      "init",
      "for",
      "mask",
      "model",
      "modelable",
      "transition",
      "show",
      "if",
      fe,
      "teleport",
      "element",
    ];
  function de(e, t) {
    let n = -1 === pe.indexOf(e.type) ? fe : e.type,
      i = -1 === pe.indexOf(t.type) ? fe : t.type;
    return pe.indexOf(n) - pe.indexOf(i);
  }
  function he(e, t, n = {}) {
    e.dispatchEvent(
      new CustomEvent(t, {
        detail: n,
        bubbles: !0,
        composed: !0,
        cancelable: !0,
      })
    );
  }
  var me = [],
    ge = !1;
  function ve(e = () => {}) {
    return (
      queueMicrotask(() => {
        ge ||
          setTimeout(() => {
            ye();
          });
      }),
      new Promise((t) => {
        me.push(() => {
          e(), t();
        });
      })
    );
  }
  function ye() {
    for (ge = !1; me.length; ) me.shift()();
  }
  function be(e, t) {
    if ("function" == typeof ShadowRoot && e instanceof ShadowRoot)
      return void Array.from(e.children).forEach((e) => be(e, t));
    let n = !1;
    if ((t(e, () => (n = !0)), n)) return;
    let i = e.firstElementChild;
    for (; i; ) be(i, t), (i = i.nextElementSibling);
  }
  function we(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t);
  }
  var xe = [],
    _e = [];
  function Oe() {
    return xe.map((e) => e());
  }
  function ke() {
    return xe.concat(_e).map((e) => e());
  }
  function Ee(e) {
    xe.push(e);
  }
  function Se(e) {
    _e.push(e);
  }
  function Te(e, t = !1) {
    return Ae(e, (e) => {
      if ((t ? ke() : Oe()).some((t) => e.matches(t))) return !0;
    });
  }
  function Ae(e, t) {
    if (e) {
      if (t(e)) return e;
      if ((e._x_teleportBack && (e = e._x_teleportBack), e.parentElement))
        return Ae(e.parentElement, t);
    }
  }
  function Ce(e, t = be) {
    !(function (e) {
      te = !0;
      let t = Symbol();
      (ie = t), ne.set(t, []);
      let n = () => {
        for (; ne.get(t).length; ) ne.get(t).shift()();
        ne.delete(t);
      };
      e(n), (te = !1), n();
    })(() => {
      t(e, (e, t) => {
        ee(e, e.attributes).forEach((e) => e()), e._x_ignore && t();
      });
    });
  }
  function Le(e, t) {
    return Array.isArray(t)
      ? je(e, t.join(" "))
      : "object" == typeof t && null !== t
      ? (function (e, t) {
          let n = (e) => e.split(" ").filter(Boolean),
            i = Object.entries(t)
              .flatMap(([e, t]) => !!t && n(e))
              .filter(Boolean),
            r = Object.entries(t)
              .flatMap(([e, t]) => !t && n(e))
              .filter(Boolean),
            o = [],
            s = [];
          return (
            r.forEach((t) => {
              e.classList.contains(t) && (e.classList.remove(t), s.push(t));
            }),
            i.forEach((t) => {
              e.classList.contains(t) || (e.classList.add(t), o.push(t));
            }),
            () => {
              s.forEach((t) => e.classList.add(t)),
                o.forEach((t) => e.classList.remove(t));
            }
          );
        })(e, t)
      : "function" == typeof t
      ? Le(e, t())
      : je(e, t);
  }
  function je(e, t) {
    return (
      (t = !0 === t ? (t = "") : t || ""),
      (n = t
        .split(" ")
        .filter((t) => !e.classList.contains(t))
        .filter(Boolean)),
      e.classList.add(...n),
      () => {
        e.classList.remove(...n);
      }
    );
    var n;
  }
  function Me(e, t) {
    return "object" == typeof t && null !== t
      ? (function (e, t) {
          let n = {};
          return (
            Object.entries(t).forEach(([t, i]) => {
              (n[t] = e.style[t]),
                t.startsWith("--") ||
                  (t = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()),
                e.style.setProperty(t, i);
            }),
            setTimeout(() => {
              0 === e.style.length && e.removeAttribute("style");
            }),
            () => {
              Me(e, n);
            }
          );
        })(e, t)
      : (function (e, t) {
          let n = e.getAttribute("style", t);
          return (
            e.setAttribute("style", t),
            () => {
              e.setAttribute("style", n || "");
            }
          );
        })(e, t);
  }
  function De(e, t = () => {}) {
    let n = !1;
    return function () {
      n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
    };
  }
  function Pe(e, t, n = {}) {
    e._x_transition ||
      (e._x_transition = {
        enter: { during: n, start: n, end: n },
        leave: { during: n, start: n, end: n },
        in(n = () => {}, i = () => {}) {
          Re(
            e,
            t,
            {
              during: this.enter.during,
              start: this.enter.start,
              end: this.enter.end,
            },
            n,
            i
          );
        },
        out(n = () => {}, i = () => {}) {
          Re(
            e,
            t,
            {
              during: this.leave.during,
              start: this.leave.start,
              end: this.leave.end,
            },
            n,
            i
          );
        },
      });
  }
  function ze(e) {
    let t = e.parentNode;
    if (t) return t._x_hidePromise ? t : ze(t);
  }
  function Re(
    e,
    t,
    { during: n, start: i, end: r } = {},
    o = () => {},
    s = () => {}
  ) {
    if (
      (e._x_transitioning && e._x_transitioning.cancel(),
      0 === Object.keys(n).length &&
        0 === Object.keys(i).length &&
        0 === Object.keys(r).length)
    )
      return o(), void s();
    let a, c, u;
    !(function (e, t) {
      let n,
        i,
        r,
        o = De(() => {
          S(() => {
            (n = !0),
              i || t.before(),
              r || (t.end(), ye()),
              t.after(),
              e.isConnected && t.cleanup(),
              delete e._x_transitioning;
          });
        });
      (e._x_transitioning = {
        beforeCancels: [],
        beforeCancel(e) {
          this.beforeCancels.push(e);
        },
        cancel: De(function () {
          for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
          o();
        }),
        finish: o,
      }),
        S(() => {
          t.start(), t.during();
        }),
        (ge = !0),
        requestAnimationFrame(() => {
          if (n) return;
          let o =
              1e3 *
              Number(
                getComputedStyle(e)
                  .transitionDuration.replace(/,.*/, "")
                  .replace("s", "")
              ),
            s =
              1e3 *
              Number(
                getComputedStyle(e)
                  .transitionDelay.replace(/,.*/, "")
                  .replace("s", "")
              );
          0 === o &&
            (o =
              1e3 *
              Number(getComputedStyle(e).animationDuration.replace("s", ""))),
            S(() => {
              t.before();
            }),
            (i = !0),
            requestAnimationFrame(() => {
              n ||
                (S(() => {
                  t.end();
                }),
                ye(),
                setTimeout(e._x_transitioning.finish, o + s),
                (r = !0));
            });
        });
    })(e, {
      start() {
        a = t(e, i);
      },
      during() {
        c = t(e, n);
      },
      before: o,
      end() {
        a(), (u = t(e, r));
      },
      after: s,
      cleanup() {
        c(), u();
      },
    });
  }
  function Ie(e, t, n) {
    if (-1 === e.indexOf(t)) return n;
    const i = e[e.indexOf(t) + 1];
    if (!i) return n;
    if ("scale" === t && isNaN(i)) return n;
    if ("duration" === t) {
      let e = i.match(/([0-9]+)ms/);
      if (e) return e[1];
    }
    return "origin" === t &&
      ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2])
      ? [i, e[e.indexOf(t) + 2]].join(" ")
      : i;
  }
  Q(
    "transition",
    (e, { value: t, modifiers: n, expression: i }, { evaluate: r }) => {
      "function" == typeof i && (i = r(i)),
        i
          ? (function (e, t, n) {
              Pe(e, Le, ""),
                {
                  enter: (t) => {
                    e._x_transition.enter.during = t;
                  },
                  "enter-start": (t) => {
                    e._x_transition.enter.start = t;
                  },
                  "enter-end": (t) => {
                    e._x_transition.enter.end = t;
                  },
                  leave: (t) => {
                    e._x_transition.leave.during = t;
                  },
                  "leave-start": (t) => {
                    e._x_transition.leave.start = t;
                  },
                  "leave-end": (t) => {
                    e._x_transition.leave.end = t;
                  },
                }[n](t);
            })(e, i, t)
          : (function (e, t, n) {
              Pe(e, Me);
              let i = !t.includes("in") && !t.includes("out") && !n,
                r = i || t.includes("in") || ["enter"].includes(n),
                o = i || t.includes("out") || ["leave"].includes(n);
              t.includes("in") &&
                !i &&
                (t = t.filter((e, n) => n < t.indexOf("out")));
              t.includes("out") &&
                !i &&
                (t = t.filter((e, n) => n > t.indexOf("out")));
              let s = !t.includes("opacity") && !t.includes("scale"),
                a = s || t.includes("opacity"),
                c = s || t.includes("scale"),
                u = a ? 0 : 1,
                l = c ? Ie(t, "scale", 95) / 100 : 1,
                f = Ie(t, "delay", 0),
                p = Ie(t, "origin", "center"),
                d = "opacity, transform",
                h = Ie(t, "duration", 150) / 1e3,
                m = Ie(t, "duration", 75) / 1e3,
                g = "cubic-bezier(0.4, 0.0, 0.2, 1)";
              r &&
                ((e._x_transition.enter.during = {
                  transformOrigin: p,
                  transitionDelay: f,
                  transitionProperty: d,
                  transitionDuration: `${h}s`,
                  transitionTimingFunction: g,
                }),
                (e._x_transition.enter.start = {
                  opacity: u,
                  transform: `scale(${l})`,
                }),
                (e._x_transition.enter.end = {
                  opacity: 1,
                  transform: "scale(1)",
                }));
              o &&
                ((e._x_transition.leave.during = {
                  transformOrigin: p,
                  transitionDelay: f,
                  transitionProperty: d,
                  transitionDuration: `${m}s`,
                  transitionTimingFunction: g,
                }),
                (e._x_transition.leave.start = {
                  opacity: 1,
                  transform: "scale(1)",
                }),
                (e._x_transition.leave.end = {
                  opacity: u,
                  transform: `scale(${l})`,
                }));
            })(e, n, t);
    }
  ),
    (window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
      e,
      t,
      n,
      i
    ) {
      let r = () => {
        "visible" === document.visibilityState
          ? requestAnimationFrame(n)
          : setTimeout(n);
      };
      t
        ? e._x_transition && (e._x_transition.enter || e._x_transition.leave)
          ? e._x_transition.enter &&
            (Object.entries(e._x_transition.enter.during).length ||
              Object.entries(e._x_transition.enter.start).length ||
              Object.entries(e._x_transition.enter.end).length)
            ? e._x_transition.in(n)
            : r()
          : e._x_transition
          ? e._x_transition.in(n)
          : r()
        : ((e._x_hidePromise = e._x_transition
            ? new Promise((t, n) => {
                e._x_transition.out(
                  () => {},
                  () => t(i)
                ),
                  e._x_transitioning.beforeCancel(() =>
                    n({ isFromCancelledTransition: !0 })
                  );
              })
            : Promise.resolve(i)),
          queueMicrotask(() => {
            let t = ze(e);
            t
              ? (t._x_hideChildren || (t._x_hideChildren = []),
                t._x_hideChildren.push(e))
              : queueMicrotask(() => {
                  let t = (e) => {
                    let n = Promise.all([
                      e._x_hidePromise,
                      ...(e._x_hideChildren || []).map(t),
                    ]).then(([e]) => e());
                    return delete e._x_hidePromise, delete e._x_hideChildren, n;
                  };
                  t(e).catch((e) => {
                    if (!e.isFromCancelledTransition) throw e;
                  });
                });
          }));
    });
  var $e = !1;
  function We(e, t = () => {}) {
    return (...n) => ($e ? t(...n) : e(...n));
  }
  function Ne(e, t, n, r = []) {
    switch (
      (e._x_bindings || (e._x_bindings = i({})),
      (e._x_bindings[t] = n),
      (t = r.includes("camel")
        ? t.toLowerCase().replace(/-(\w)/g, (e, t) => t.toUpperCase())
        : t))
    ) {
      case "value":
        !(function (e, t) {
          if ("radio" === e.type)
            void 0 === e.attributes.value && (e.value = t),
              window.fromModel && (e.checked = He(e.value, t));
          else if ("checkbox" === e.type)
            Number.isInteger(t)
              ? (e.value = t)
              : Number.isInteger(t) ||
                Array.isArray(t) ||
                "boolean" == typeof t ||
                [null, void 0].includes(t)
              ? Array.isArray(t)
                ? (e.checked = t.some((t) => He(t, e.value)))
                : (e.checked = !!t)
              : (e.value = String(t));
          else if ("SELECT" === e.tagName)
            !(function (e, t) {
              const n = [].concat(t).map((e) => e + "");
              Array.from(e.options).forEach((e) => {
                e.selected = n.includes(e.value);
              });
            })(e, t);
          else {
            if (e.value === t) return;
            e.value = t;
          }
        })(e, n);
        break;
      case "style":
        !(function (e, t) {
          e._x_undoAddedStyles && e._x_undoAddedStyles();
          e._x_undoAddedStyles = Me(e, t);
        })(e, n);
        break;
      case "class":
        !(function (e, t) {
          e._x_undoAddedClasses && e._x_undoAddedClasses();
          e._x_undoAddedClasses = Le(e, t);
        })(e, n);
        break;
      default:
        !(function (e, t, n) {
          [null, void 0, !1].includes(n) &&
          (function (e) {
            return ![
              "aria-pressed",
              "aria-checked",
              "aria-expanded",
              "aria-selected",
            ].includes(e);
          })(t)
            ? e.removeAttribute(t)
            : (Fe(t) && (n = t),
              (function (e, t, n) {
                e.getAttribute(t) != n && e.setAttribute(t, n);
              })(e, t, n));
        })(e, t, n);
    }
  }
  function He(e, t) {
    return e == t;
  }
  function Fe(e) {
    return [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule",
    ].includes(e);
  }
  function Ve(e, t) {
    var n;
    return function () {
      var i = this,
        r = arguments,
        o = function () {
          (n = null), e.apply(i, r);
        };
      clearTimeout(n), (n = setTimeout(o, t));
    };
  }
  function Be(e, t) {
    let n;
    return function () {
      let i = this,
        r = arguments;
      n || (e.apply(i, r), (n = !0), setTimeout(() => (n = !1), t));
    };
  }
  var qe = {},
    Ge = !1;
  var Ue = {};
  var Ye = {};
  var Xe = {
    get reactive() {
      return i;
    },
    get release() {
      return o;
    },
    get effect() {
      return r;
    },
    get raw() {
      return s;
    },
    version: "3.10.0",
    flushAndStopDeferringMutations: function () {
      (T = !1), C(A), (A = []);
    },
    dontAutoEvaluateFunctions: function (e) {
      let t = V;
      (V = !1), e(), (V = t);
    },
    disableEffectScheduling: function (e) {
      (d = !1), e(), (d = !0);
    },
    setReactivityEngine: function (e) {
      (i = e.reactive),
        (o = e.release),
        (r = (t) =>
          e.effect(t, {
            scheduler: (e) => {
              d ? l(e) : e();
            },
          })),
        (s = e.raw);
    },
    closestDataStack: D,
    skipDuringClone: We,
    addRootSelector: Ee,
    addInitSelector: Se,
    addScopeToNode: j,
    deferMutations: function () {
      T = !0;
    },
    mapAttributes: ce,
    evaluateLater: q,
    setEvaluator: function (e) {
      G = e;
    },
    mergeProxies: P,
    findClosest: Ae,
    closestRoot: Te,
    interceptor: R,
    transition: Re,
    setStyles: Me,
    mutateDom: S,
    directive: Q,
    throttle: Be,
    debounce: Ve,
    evaluate: B,
    initTree: Ce,
    nextTick: ve,
    prefixed: K,
    prefix: function (e) {
      J = e;
    },
    plugin: function (e) {
      e(Xe);
    },
    magic: W,
    store: function (e, t) {
      if ((Ge || ((qe = i(qe)), (Ge = !0)), void 0 === t)) return qe[e];
      (qe[e] = t),
        "object" == typeof t &&
          null !== t &&
          t.hasOwnProperty("init") &&
          "function" == typeof t.init &&
          qe[e].init(),
        z(qe[e]);
    },
    start: function () {
      var e;
      document.body ||
        we(
          "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
        ),
        he(document, "alpine:init"),
        he(document, "alpine:initializing"),
        _(),
        (e = (e) => Ce(e, be)),
        v.push(e),
        y((e) => {
          be(e, (e) => b(e));
        }),
        (function (e) {
          m.push(e);
        })((e, t) => {
          ee(e, t).forEach((e) => e());
        }),
        Array.from(document.querySelectorAll(ke()))
          .filter((e) => !Te(e.parentElement, !0))
          .forEach((e) => {
            Ce(e);
          }),
        he(document, "alpine:initialized");
    },
    clone: function (e, t) {
      t._x_dataStack || (t._x_dataStack = e._x_dataStack),
        ($e = !0),
        (function (e) {
          let t = r;
          h((e, n) => {
            let i = t(e);
            return o(i), () => {};
          }),
            e(),
            h(t);
        })(() => {
          !(function (e) {
            let t = !1;
            Ce(e, (e, n) => {
              be(e, (e, i) => {
                if (
                  t &&
                  (function (e) {
                    return Oe().some((t) => e.matches(t));
                  })(e)
                )
                  return i();
                (t = !0), n(e, i);
              });
            });
          })(t);
        }),
        ($e = !1);
    },
    bound: function (e, t, n) {
      if (e._x_bindings && void 0 !== e._x_bindings[t]) return e._x_bindings[t];
      let i = e.getAttribute(t);
      return null === i
        ? "function" == typeof n
          ? n()
          : n
        : Fe(t)
        ? !![t, "true"].includes(i)
        : "" === i || i;
    },
    $data: L,
    data: function (e, t) {
      Ye[e] = t;
    },
    bind: function (e, t) {
      Ue[e] = "function" != typeof t ? () => t : t;
    },
  };
  function Je(e, t) {
    const n = Object.create(null),
      i = e.split(",");
    for (let e = 0; e < i.length; e++) n[i[e]] = !0;
    return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e];
  }
  var Ke,
    Ze = {},
    Qe = Object.assign,
    et = Object.prototype.hasOwnProperty,
    tt = (e, t) => et.call(e, t),
    nt = Array.isArray,
    it = (e) => "[object Map]" === at(e),
    rt = (e) => "symbol" == typeof e,
    ot = (e) => null !== e && "object" == typeof e,
    st = Object.prototype.toString,
    at = (e) => st.call(e),
    ct = (e) =>
      "string" == typeof e &&
      "NaN" !== e &&
      "-" !== e[0] &&
      "" + parseInt(e, 10) === e,
    ut = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
    },
    lt = /-(\w)/g,
    ft =
      (ut((e) => e.replace(lt, (e, t) => (t ? t.toUpperCase() : ""))),
      /\B([A-Z])/g),
    pt =
      (ut((e) => e.replace(ft, "-$1").toLowerCase()),
      ut((e) => e.charAt(0).toUpperCase() + e.slice(1))),
    dt =
      (ut((e) => (e ? `on${pt(e)}` : "")),
      (e, t) => e !== t && (e == e || t == t)),
    ht = new WeakMap(),
    mt = [],
    gt = Symbol(""),
    vt = Symbol("");
  var yt = 0;
  function bt(e) {
    const { deps: t } = e;
    if (t.length) {
      for (let n = 0; n < t.length; n++) t[n].delete(e);
      t.length = 0;
    }
  }
  var wt = !0,
    xt = [];
  function _t() {
    const e = xt.pop();
    wt = void 0 === e || e;
  }
  function Ot(e, t, n) {
    if (!wt || void 0 === Ke) return;
    let i = ht.get(e);
    i || ht.set(e, (i = new Map()));
    let r = i.get(n);
    r || i.set(n, (r = new Set())), r.has(Ke) || (r.add(Ke), Ke.deps.push(r));
  }
  function kt(e, t, n, i, r, o) {
    const s = ht.get(e);
    if (!s) return;
    const a = new Set(),
      c = (e) => {
        e &&
          e.forEach((e) => {
            (e !== Ke || e.allowRecurse) && a.add(e);
          });
      };
    if ("clear" === t) s.forEach(c);
    else if ("length" === n && nt(e))
      s.forEach((e, t) => {
        ("length" === t || t >= i) && c(e);
      });
    else
      switch ((void 0 !== n && c(s.get(n)), t)) {
        case "add":
          nt(e)
            ? ct(n) && c(s.get("length"))
            : (c(s.get(gt)), it(e) && c(s.get(vt)));
          break;
        case "delete":
          nt(e) || (c(s.get(gt)), it(e) && c(s.get(vt)));
          break;
        case "set":
          it(e) && c(s.get(gt));
      }
    a.forEach((e) => {
      e.options.scheduler ? e.options.scheduler(e) : e();
    });
  }
  var Et = Je("__proto__,__v_isRef,__isVue"),
    St = new Set(
      Object.getOwnPropertyNames(Symbol)
        .map((e) => Symbol[e])
        .filter(rt)
    ),
    Tt = Mt(),
    At = Mt(!1, !0),
    Ct = Mt(!0),
    Lt = Mt(!0, !0),
    jt = {};
  function Mt(e = !1, t = !1) {
    return function (n, i, r) {
      if ("__v_isReactive" === i) return !e;
      if ("__v_isReadonly" === i) return e;
      if ("__v_raw" === i && r === (e ? (t ? an : sn) : t ? on : rn).get(n))
        return n;
      const o = nt(n);
      if (!e && o && tt(jt, i)) return Reflect.get(jt, i, r);
      const s = Reflect.get(n, i, r);
      if (rt(i) ? St.has(i) : Et(i)) return s;
      if ((e || Ot(n, 0, i), t)) return s;
      if (dn(s)) {
        return !o || !ct(i) ? s.value : s;
      }
      return ot(s) ? (e ? ln(s) : un(s)) : s;
    };
  }
  function Dt(e = !1) {
    return function (t, n, i, r) {
      let o = t[n];
      if (!e && ((i = pn(i)), (o = pn(o)), !nt(t) && dn(o) && !dn(i)))
        return (o.value = i), !0;
      const s = nt(t) && ct(n) ? Number(n) < t.length : tt(t, n),
        a = Reflect.set(t, n, i, r);
      return (
        t === pn(r) &&
          (s ? dt(i, o) && kt(t, "set", n, i) : kt(t, "add", n, i)),
        a
      );
    };
  }
  ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    const t = Array.prototype[e];
    jt[e] = function (...e) {
      const n = pn(this);
      for (let e = 0, t = this.length; e < t; e++) Ot(n, 0, e + "");
      const i = t.apply(n, e);
      return -1 === i || !1 === i ? t.apply(n, e.map(pn)) : i;
    };
  }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
      const t = Array.prototype[e];
      jt[e] = function (...e) {
        xt.push(wt), (wt = !1);
        const n = t.apply(this, e);
        return _t(), n;
      };
    });
  var Pt = {
      get: Tt,
      set: Dt(),
      deleteProperty: function (e, t) {
        const n = tt(e, t),
          i = (e[t], Reflect.deleteProperty(e, t));
        return i && n && kt(e, "delete", t, void 0), i;
      },
      has: function (e, t) {
        const n = Reflect.has(e, t);
        return (rt(t) && St.has(t)) || Ot(e, 0, t), n;
      },
      ownKeys: function (e) {
        return Ot(e, 0, nt(e) ? "length" : gt), Reflect.ownKeys(e);
      },
    },
    zt = { get: Ct, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
    Rt =
      (Qe({}, Pt, { get: At, set: Dt(!0) }),
      Qe({}, zt, { get: Lt }),
      (e) => (ot(e) ? un(e) : e)),
    It = (e) => (ot(e) ? ln(e) : e),
    $t = (e) => e,
    Wt = (e) => Reflect.getPrototypeOf(e);
  function Nt(e, t, n = !1, i = !1) {
    const r = pn((e = e.__v_raw)),
      o = pn(t);
    t !== o && !n && Ot(r, 0, t), !n && Ot(r, 0, o);
    const { has: s } = Wt(r),
      a = i ? $t : n ? It : Rt;
    return s.call(r, t)
      ? a(e.get(t))
      : s.call(r, o)
      ? a(e.get(o))
      : void (e !== r && e.get(t));
  }
  function Ht(e, t = !1) {
    const n = this.__v_raw,
      i = pn(n),
      r = pn(e);
    return (
      e !== r && !t && Ot(i, 0, e),
      !t && Ot(i, 0, r),
      e === r ? n.has(e) : n.has(e) || n.has(r)
    );
  }
  function Ft(e, t = !1) {
    return (e = e.__v_raw), !t && Ot(pn(e), 0, gt), Reflect.get(e, "size", e);
  }
  function Vt(e) {
    e = pn(e);
    const t = pn(this);
    return Wt(t).has.call(t, e) || (t.add(e), kt(t, "add", e, e)), this;
  }
  function Bt(e, t) {
    t = pn(t);
    const n = pn(this),
      { has: i, get: r } = Wt(n);
    let o = i.call(n, e);
    o || ((e = pn(e)), (o = i.call(n, e)));
    const s = r.call(n, e);
    return (
      n.set(e, t), o ? dt(t, s) && kt(n, "set", e, t) : kt(n, "add", e, t), this
    );
  }
  function qt(e) {
    const t = pn(this),
      { has: n, get: i } = Wt(t);
    let r = n.call(t, e);
    r || ((e = pn(e)), (r = n.call(t, e)));
    i && i.call(t, e);
    const o = t.delete(e);
    return r && kt(t, "delete", e, void 0), o;
  }
  function Gt() {
    const e = pn(this),
      t = 0 !== e.size,
      n = e.clear();
    return t && kt(e, "clear", void 0, void 0), n;
  }
  function Ut(e, t) {
    return function (n, i) {
      const r = this,
        o = r.__v_raw,
        s = pn(o),
        a = t ? $t : e ? It : Rt;
      return !e && Ot(s, 0, gt), o.forEach((e, t) => n.call(i, a(e), a(t), r));
    };
  }
  function Yt(e, t, n) {
    return function (...i) {
      const r = this.__v_raw,
        o = pn(r),
        s = it(o),
        a = "entries" === e || (e === Symbol.iterator && s),
        c = "keys" === e && s,
        u = r[e](...i),
        l = n ? $t : t ? It : Rt;
      return (
        !t && Ot(o, 0, c ? vt : gt),
        {
          next() {
            const { value: e, done: t } = u.next();
            return t
              ? { value: e, done: t }
              : { value: a ? [l(e[0]), l(e[1])] : l(e), done: t };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function Xt(e) {
    return function (...t) {
      return "delete" !== e && this;
    };
  }
  var Jt = {
      get(e) {
        return Nt(this, e);
      },
      get size() {
        return Ft(this);
      },
      has: Ht,
      add: Vt,
      set: Bt,
      delete: qt,
      clear: Gt,
      forEach: Ut(!1, !1),
    },
    Kt = {
      get(e) {
        return Nt(this, e, !1, !0);
      },
      get size() {
        return Ft(this);
      },
      has: Ht,
      add: Vt,
      set: Bt,
      delete: qt,
      clear: Gt,
      forEach: Ut(!1, !0),
    },
    Zt = {
      get(e) {
        return Nt(this, e, !0);
      },
      get size() {
        return Ft(this, !0);
      },
      has(e) {
        return Ht.call(this, e, !0);
      },
      add: Xt("add"),
      set: Xt("set"),
      delete: Xt("delete"),
      clear: Xt("clear"),
      forEach: Ut(!0, !1),
    },
    Qt = {
      get(e) {
        return Nt(this, e, !0, !0);
      },
      get size() {
        return Ft(this, !0);
      },
      has(e) {
        return Ht.call(this, e, !0);
      },
      add: Xt("add"),
      set: Xt("set"),
      delete: Xt("delete"),
      clear: Xt("clear"),
      forEach: Ut(!0, !0),
    };
  function en(e, t) {
    const n = t ? (e ? Qt : Kt) : e ? Zt : Jt;
    return (t, i, r) =>
      "__v_isReactive" === i
        ? !e
        : "__v_isReadonly" === i
        ? e
        : "__v_raw" === i
        ? t
        : Reflect.get(tt(n, i) && i in t ? n : t, i, r);
  }
  ["keys", "values", "entries", Symbol.iterator].forEach((e) => {
    (Jt[e] = Yt(e, !1, !1)),
      (Zt[e] = Yt(e, !0, !1)),
      (Kt[e] = Yt(e, !1, !0)),
      (Qt[e] = Yt(e, !0, !0));
  });
  var tn = { get: en(!1, !1) },
    nn = (en(!1, !0), { get: en(!0, !1) }),
    rn = (en(!0, !0), new WeakMap()),
    on = new WeakMap(),
    sn = new WeakMap(),
    an = new WeakMap();
  function cn(e) {
    return e.__v_skip || !Object.isExtensible(e)
      ? 0
      : (function (e) {
          switch (e) {
            case "Object":
            case "Array":
              return 1;
            case "Map":
            case "Set":
            case "WeakMap":
            case "WeakSet":
              return 2;
            default:
              return 0;
          }
        })(((e) => at(e).slice(8, -1))(e));
  }
  function un(e) {
    return e && e.__v_isReadonly ? e : fn(e, !1, Pt, tn, rn);
  }
  function ln(e) {
    return fn(e, !0, zt, nn, sn);
  }
  function fn(e, t, n, i, r) {
    if (!ot(e)) return e;
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
    const o = r.get(e);
    if (o) return o;
    const s = cn(e);
    if (0 === s) return e;
    const a = new Proxy(e, 2 === s ? i : n);
    return r.set(e, a), a;
  }
  function pn(e) {
    return (e && pn(e.__v_raw)) || e;
  }
  function dn(e) {
    return Boolean(e && !0 === e.__v_isRef);
  }
  W("nextTick", () => ve),
    W("dispatch", (e) => he.bind(he, e)),
    W("watch", (e, { evaluateLater: t, effect: n }) => (i, r) => {
      let o,
        s = t(i),
        a = !0,
        c = n(() =>
          s((e) => {
            JSON.stringify(e),
              a
                ? (o = e)
                : queueMicrotask(() => {
                    r(e, o), (o = e);
                  }),
              (a = !1);
          })
        );
      e._x_effects.delete(c);
    }),
    W("store", function () {
      return qe;
    }),
    W("data", (e) => L(e)),
    W("root", (e) => Te(e)),
    W(
      "refs",
      (e) => (
        e._x_refs_proxy ||
          (e._x_refs_proxy = P(
            (function (e) {
              let t = [],
                n = e;
              for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
              return t;
            })(e)
          )),
        e._x_refs_proxy
      )
    );
  var hn = {};
  function mn(e) {
    return hn[e] || (hn[e] = 0), ++hn[e];
  }
  function gn(e, t, n) {
    W(t, (t) =>
      we(
        `You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
        t
      )
    );
  }
  W("id", (e) => (t, n = null) => {
    let i = (function (e, t) {
        return Ae(e, (e) => {
          if (e._x_ids && e._x_ids[t]) return !0;
        });
      })(e, t),
      r = i ? i._x_ids[t] : mn(t);
    return n ? `${t}-${r}-${n}` : `${t}-${r}`;
  }),
    W("el", (e) => e),
    gn("Focus", "focus", "focus"),
    gn("Persist", "persist", "persist"),
    Q("modelable", (e, { expression: t }, { effect: n, evaluateLater: i }) => {
      let r = i(t),
        o = () => {
          let e;
          return r((t) => (e = t)), e;
        },
        s = i(`${t} = __placeholder`),
        a = (e) => s(() => {}, { scope: { __placeholder: e } }),
        c = o();
      a(c),
        queueMicrotask(() => {
          if (!e._x_model) return;
          e._x_removeModelListeners.default();
          let t = e._x_model.get,
            i = e._x_model.set;
          n(() => a(t())), n(() => i(o()));
        });
    }),
    Q("teleport", (e, { expression: t }, { cleanup: n }) => {
      "template" !== e.tagName.toLowerCase() &&
        we("x-teleport can only be used on a <template> tag", e);
      let i = document.querySelector(t);
      i || we(`Cannot find x-teleport element for selector: "${t}"`);
      let r = e.content.cloneNode(!0).firstElementChild;
      (e._x_teleport = r),
        (r._x_teleportBack = e),
        e._x_forwardEvents &&
          e._x_forwardEvents.forEach((t) => {
            r.addEventListener(t, (t) => {
              t.stopPropagation(),
                e.dispatchEvent(new t.constructor(t.type, t));
            });
          }),
        j(r, {}, e),
        S(() => {
          i.appendChild(r), Ce(r), (r._x_ignore = !0);
        }),
        n(() => r.remove());
    });
  var vn = () => {};
  function yn(e, t, n, i) {
    let r = e,
      o = (e) => i(e),
      s = {},
      a = (e, t) => (n) => t(e, n);
    if (
      (n.includes("dot") && (t = t.replace(/-/g, ".")),
      n.includes("camel") &&
        (t = (function (e) {
          return e.toLowerCase().replace(/-(\w)/g, (e, t) => t.toUpperCase());
        })(t)),
      n.includes("passive") && (s.passive = !0),
      n.includes("capture") && (s.capture = !0),
      n.includes("window") && (r = window),
      n.includes("document") && (r = document),
      n.includes("prevent") &&
        (o = a(o, (e, t) => {
          t.preventDefault(), e(t);
        })),
      n.includes("stop") &&
        (o = a(o, (e, t) => {
          t.stopPropagation(), e(t);
        })),
      n.includes("self") &&
        (o = a(o, (t, n) => {
          n.target === e && t(n);
        })),
      (n.includes("away") || n.includes("outside")) &&
        ((r = document),
        (o = a(o, (t, n) => {
          e.contains(n.target) ||
            (!1 !== n.target.isConnected &&
              ((e.offsetWidth < 1 && e.offsetHeight < 1) ||
                (!1 !== e._x_isShown && t(n))));
        }))),
      n.includes("once") &&
        (o = a(o, (e, n) => {
          e(n), r.removeEventListener(t, o, s);
        })),
      (o = a(o, (e, i) => {
        ((function (e) {
          return ["keydown", "keyup"].includes(e);
        })(t) &&
          (function (e, t) {
            let n = t.filter(
              (e) =>
                !["window", "document", "prevent", "stop", "once"].includes(e)
            );
            if (n.includes("debounce")) {
              let e = n.indexOf("debounce");
              n.splice(
                e,
                bn((n[e + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1
              );
            }
            if (0 === n.length) return !1;
            if (1 === n.length && wn(e.key).includes(n[0])) return !1;
            const i = [
              "ctrl",
              "shift",
              "alt",
              "meta",
              "cmd",
              "super",
            ].filter((e) => n.includes(e));
            if (((n = n.filter((e) => !i.includes(e))), i.length > 0)) {
              if (
                i.filter(
                  (t) => (
                    ("cmd" !== t && "super" !== t) || (t = "meta"), e[`${t}Key`]
                  )
                ).length === i.length &&
                wn(e.key).includes(n[0])
              )
                return !1;
            }
            return !0;
          })(i, n)) ||
          e(i);
      })),
      n.includes("debounce"))
    ) {
      let e = n[n.indexOf("debounce") + 1] || "invalid-wait",
        t = bn(e.split("ms")[0]) ? Number(e.split("ms")[0]) : 250;
      o = Ve(o, t);
    }
    if (n.includes("throttle")) {
      let e = n[n.indexOf("throttle") + 1] || "invalid-wait",
        t = bn(e.split("ms")[0]) ? Number(e.split("ms")[0]) : 250;
      o = Be(o, t);
    }
    return (
      r.addEventListener(t, o, s),
      () => {
        r.removeEventListener(t, o, s);
      }
    );
  }
  function bn(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  function wn(e) {
    if (!e) return [];
    e = e
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[_\s]/, "-")
      .toLowerCase();
    let t = {
      ctrl: "control",
      slash: "/",
      space: "-",
      spacebar: "-",
      cmd: "meta",
      esc: "escape",
      up: "arrow-up",
      down: "arrow-down",
      left: "arrow-left",
      right: "arrow-right",
      period: ".",
      equal: "=",
    };
    return (
      (t[e] = e),
      Object.keys(t)
        .map((n) => {
          if (t[n] === e) return n;
        })
        .filter((e) => e)
    );
  }
  function xn(e) {
    let t = e ? parseFloat(e) : null;
    return (n = t), Array.isArray(n) || isNaN(n) ? e : t;
    var n;
  }
  function _n(e, t, n, i) {
    let r = {};
    if (/^\[.*\]$/.test(e.item) && Array.isArray(t)) {
      e.item
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((e) => e.trim())
        .forEach((e, n) => {
          r[e] = t[n];
        });
    } else if (
      /^\{.*\}$/.test(e.item) &&
      !Array.isArray(t) &&
      "object" == typeof t
    ) {
      e.item
        .replace("{", "")
        .replace("}", "")
        .split(",")
        .map((e) => e.trim())
        .forEach((e) => {
          r[e] = t[e];
        });
    } else r[e.item] = t;
    return (
      e.index && (r[e.index] = n), e.collection && (r[e.collection] = i), r
    );
  }
  function On() {}
  function kn(e, t, n) {
    Q(t, (i) =>
      we(
        `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
        i
      )
    );
  }
  (vn.inline = (e, { modifiers: t }, { cleanup: n }) => {
    t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
      n(() => {
        t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
      });
  }),
    Q("ignore", vn),
    Q("effect", (e, { expression: t }, { effect: n }) => n(q(e, t))),
    Q(
      "model",
      (e, { modifiers: t, expression: n }, { effect: i, cleanup: r }) => {
        let o = q(e, n),
          s = q(e, `${n} = rightSideOfExpression($event, ${n})`);
        var a =
          "select" === e.tagName.toLowerCase() ||
          ["checkbox", "radio"].includes(e.type) ||
          t.includes("lazy")
            ? "change"
            : "input";
        let c = (function (e, t, n) {
            "radio" === e.type &&
              S(() => {
                e.hasAttribute("name") || e.setAttribute("name", n);
              });
            return (n, i) =>
              S(() => {
                if (n instanceof CustomEvent && void 0 !== n.detail)
                  return n.detail || n.target.value;
                if ("checkbox" === e.type) {
                  if (Array.isArray(i)) {
                    let e = t.includes("number")
                      ? xn(n.target.value)
                      : n.target.value;
                    return n.target.checked
                      ? i.concat([e])
                      : i.filter((t) => !(t == e));
                  }
                  return n.target.checked;
                }
                if ("select" === e.tagName.toLowerCase() && e.multiple)
                  return t.includes("number")
                    ? Array.from(n.target.selectedOptions).map((e) =>
                        xn(e.value || e.text)
                      )
                    : Array.from(n.target.selectedOptions).map(
                        (e) => e.value || e.text
                      );
                {
                  let e = n.target.value;
                  return t.includes("number")
                    ? xn(e)
                    : t.includes("trim")
                    ? e.trim()
                    : e;
                }
              });
          })(e, t, n),
          u = yn(e, a, t, (e) => {
            s(() => {}, { scope: { $event: e, rightSideOfExpression: c } });
          });
        e._x_removeModelListeners || (e._x_removeModelListeners = {}),
          (e._x_removeModelListeners.default = u),
          r(() => e._x_removeModelListeners.default());
        let l = q(e, `${n} = __placeholder`);
        (e._x_model = {
          get() {
            let e;
            return o((t) => (e = t)), e;
          },
          set(e) {
            l(() => {}, { scope: { __placeholder: e } });
          },
        }),
          (e._x_forceModelUpdate = () => {
            o((t) => {
              void 0 === t && n.match(/\./) && (t = ""),
                (window.fromModel = !0),
                S(() => Ne(e, "value", t)),
                delete window.fromModel;
            });
          }),
          i(() => {
            (t.includes("unintrusive") &&
              document.activeElement.isSameNode(e)) ||
              e._x_forceModelUpdate();
          });
      }
    ),
    Q("cloak", (e) =>
      queueMicrotask(() => S(() => e.removeAttribute(K("cloak"))))
    ),
    Se(() => `[${K("init")}]`),
    Q(
      "init",
      We((e, { expression: t }, { evaluate: n }) =>
        "string" == typeof t ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)
      )
    ),
    Q("text", (e, { expression: t }, { effect: n, evaluateLater: i }) => {
      let r = i(t);
      n(() => {
        r((t) => {
          S(() => {
            e.textContent = t;
          });
        });
      });
    }),
    Q("html", (e, { expression: t }, { effect: n, evaluateLater: i }) => {
      let r = i(t);
      n(() => {
        r((t) => {
          S(() => {
            (e.innerHTML = t),
              (e._x_ignoreSelf = !0),
              Ce(e),
              delete e._x_ignoreSelf;
          });
        });
      });
    }),
    ce(oe(":", K("bind:"))),
    Q(
      "bind",
      (
        e,
        { value: t, modifiers: n, expression: i, original: r },
        { effect: o }
      ) => {
        if (!t)
          return (function (e, t, n, i) {
            let r = {};
            (o = r),
              Object.entries(Ue).forEach(([e, t]) => {
                Object.defineProperty(o, e, { get: () => (...e) => t(...e) });
              });
            var o;
            let s = q(e, t),
              a = [];
            for (; a.length; ) a.pop()();
            s(
              (t) => {
                let i = Object.entries(t).map(([e, t]) => ({
                    name: e,
                    value: t,
                  })),
                  r = (function (e) {
                    return Array.from(e)
                      .map(se())
                      .filter((e) => !ue(e));
                  })(i);
                (i = i.map((e) =>
                  r.find((t) => t.name === e.name)
                    ? { name: `x-bind:${e.name}`, value: `"${e.value}"` }
                    : e
                )),
                  ee(e, i, n).map((e) => {
                    a.push(e.runCleanups), e();
                  });
              },
              { scope: r }
            );
          })(e, i, r);
        if ("key" === t)
          return (function (e, t) {
            e._x_keyExpression = t;
          })(e, i);
        let s = q(e, i);
        o(() =>
          s((r) => {
            void 0 === r && i.match(/\./) && (r = ""), S(() => Ne(e, t, r, n));
          })
        );
      }
    ),
    Ee(() => `[${K("data")}]`),
    Q(
      "data",
      We((e, { expression: t }, { cleanup: n }) => {
        t = "" === t ? "{}" : t;
        let r = {};
        N(r, e);
        let o = {};
        var s, a;
        (s = o),
          (a = r),
          Object.entries(Ye).forEach(([e, t]) => {
            Object.defineProperty(s, e, {
              get: () => (...e) => t.bind(a)(...e),
              enumerable: !1,
            });
          });
        let c = B(e, t, { scope: o });
        void 0 === c && (c = {}), N(c, e);
        let u = i(c);
        z(u);
        let l = j(e, u);
        u.init && B(e, u.init),
          n(() => {
            u.destroy && B(e, u.destroy), l();
          });
      })
    ),
    Q("show", (e, { modifiers: t, expression: n }, { effect: i }) => {
      let r = q(e, n);
      e._x_doHide ||
        (e._x_doHide = () => {
          S(() => (e.style.display = "none"));
        }),
        e._x_doShow ||
          (e._x_doShow = () => {
            S(() => {
              1 === e.style.length && "none" === e.style.display
                ? e.removeAttribute("style")
                : e.style.removeProperty("display");
            });
          });
      let o,
        s = () => {
          e._x_doHide(), (e._x_isShown = !1);
        },
        a = () => {
          e._x_doShow(), (e._x_isShown = !0);
        },
        c = () => setTimeout(a),
        u = De(
          (e) => (e ? a() : s()),
          (t) => {
            "function" == typeof e._x_toggleAndCascadeWithTransitions
              ? e._x_toggleAndCascadeWithTransitions(e, t, a, s)
              : t
              ? c()
              : s();
          }
        ),
        l = !0;
      i(() =>
        r((e) => {
          (l || e !== o) &&
            (t.includes("immediate") && (e ? c() : s()),
            u(e),
            (o = e),
            (l = !1));
        })
      );
    }),
    Q("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
      let o = (function (e) {
          let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
            n = /^\s*\(|\)\s*$/g,
            i = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
            r = e.match(i);
          if (!r) return;
          let o = {};
          o.items = r[2].trim();
          let s = r[1].replace(n, "").trim(),
            a = s.match(t);
          a
            ? ((o.item = s.replace(t, "").trim()),
              (o.index = a[1].trim()),
              a[2] && (o.collection = a[2].trim()))
            : (o.item = s);
          return o;
        })(t),
        s = q(e, o.items),
        a = q(e, e._x_keyExpression || "index");
      (e._x_prevKeys = []),
        (e._x_lookup = {}),
        n(() =>
          (function (e, t, n, r) {
            let o = (e) => "object" == typeof e && !Array.isArray(e),
              s = e;
            n((n) => {
              var a;
              (a = n),
                !Array.isArray(a) &&
                  !isNaN(a) &&
                  n >= 0 &&
                  (n = Array.from(Array(n).keys(), (e) => e + 1)),
                void 0 === n && (n = []);
              let c = e._x_lookup,
                u = e._x_prevKeys,
                l = [],
                p = [];
              if (o(n))
                n = Object.entries(n).map(([e, i]) => {
                  let o = _n(t, i, e, n);
                  r((e) => p.push(e), { scope: { index: e, ...o } }), l.push(o);
                });
              else
                for (let e = 0; e < n.length; e++) {
                  let i = _n(t, n[e], e, n);
                  r((e) => p.push(e), { scope: { index: e, ...i } }), l.push(i);
                }
              let d = [],
                h = [],
                m = [],
                g = [];
              for (let e = 0; e < u.length; e++) {
                let t = u[e];
                -1 === p.indexOf(t) && m.push(t);
              }
              u = u.filter((e) => !m.includes(e));
              let v = "template";
              for (let e = 0; e < p.length; e++) {
                let t = p[e],
                  n = u.indexOf(t);
                if (-1 === n) u.splice(e, 0, t), d.push([v, e]);
                else if (n !== e) {
                  let t = u.splice(e, 1)[0],
                    i = u.splice(n - 1, 1)[0];
                  u.splice(e, 0, i), u.splice(n, 0, t), h.push([t, i]);
                } else g.push(t);
                v = t;
              }
              for (let e = 0; e < m.length; e++) {
                let t = m[e];
                c[t]._x_effects && c[t]._x_effects.forEach(f),
                  c[t].remove(),
                  (c[t] = null),
                  delete c[t];
              }
              for (let e = 0; e < h.length; e++) {
                let [t, n] = h[e],
                  i = c[t],
                  r = c[n],
                  o = document.createElement("div");
                S(() => {
                  r.after(o),
                    i.after(r),
                    r._x_currentIfEl && r.after(r._x_currentIfEl),
                    o.before(i),
                    i._x_currentIfEl && i.after(i._x_currentIfEl),
                    o.remove();
                }),
                  M(r, l[p.indexOf(n)]);
              }
              for (let e = 0; e < d.length; e++) {
                let [t, n] = d[e],
                  r = "template" === t ? s : c[t];
                r._x_currentIfEl && (r = r._x_currentIfEl);
                let o = l[n],
                  a = p[n],
                  u = document.importNode(s.content, !0).firstElementChild;
                j(u, i(o), s),
                  S(() => {
                    r.after(u), Ce(u);
                  }),
                  "object" == typeof a &&
                    we(
                      "x-for key cannot be an object, it must be a string or an integer",
                      s
                    ),
                  (c[a] = u);
              }
              for (let e = 0; e < g.length; e++) M(c[g[e]], l[p.indexOf(g[e])]);
              s._x_prevKeys = p;
            });
          })(e, o, s, a)
        ),
        r(() => {
          Object.values(e._x_lookup).forEach((e) => e.remove()),
            delete e._x_prevKeys,
            delete e._x_lookup;
        });
    }),
    (On.inline = (e, { expression: t }, { cleanup: n }) => {
      let i = Te(e);
      i._x_refs || (i._x_refs = {}),
        (i._x_refs[t] = e),
        n(() => delete i._x_refs[t]);
    }),
    Q("ref", On),
    Q("if", (e, { expression: t }, { effect: n, cleanup: i }) => {
      let r = q(e, t);
      n(() =>
        r((t) => {
          t
            ? (() => {
                if (e._x_currentIfEl) return e._x_currentIfEl;
                let t = e.content.cloneNode(!0).firstElementChild;
                j(t, {}, e),
                  S(() => {
                    e.after(t), Ce(t);
                  }),
                  (e._x_currentIfEl = t),
                  (e._x_undoIf = () => {
                    be(t, (e) => {
                      e._x_effects && e._x_effects.forEach(f);
                    }),
                      t.remove(),
                      delete e._x_currentIfEl;
                  });
              })()
            : e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
        })
      ),
        i(() => e._x_undoIf && e._x_undoIf());
    }),
    Q("id", (e, { expression: t }, { evaluate: n }) => {
      n(t).forEach((t) =>
        (function (e, t) {
          e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = mn(t));
        })(e, t)
      );
    }),
    ce(oe("@", K("on:"))),
    Q(
      "on",
      We((e, { value: t, modifiers: n, expression: i }, { cleanup: r }) => {
        let o = i ? q(e, i) : () => {};
        "template" === e.tagName.toLowerCase() &&
          (e._x_forwardEvents || (e._x_forwardEvents = []),
          e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
        let s = yn(e, t, n, (e) => {
          o(() => {}, { scope: { $event: e }, params: [e] });
        });
        r(() => s());
      })
    ),
    kn("Collapse", "collapse", "collapse"),
    kn("Intersect", "intersect", "intersect"),
    kn("Focus", "trap", "focus"),
    kn("Mask", "mask", "mask"),
    Xe.setEvaluator(U),
    Xe.setReactivityEngine({
      reactive: un,
      effect: function (e, t = Ze) {
        (function (e) {
          return e && !0 === e._isEffect;
        })(e) && (e = e.raw);
        const n = (function (e, t) {
          const n = function () {
            if (!n.active) return e();
            if (!mt.includes(n)) {
              bt(n);
              try {
                return xt.push(wt), (wt = !0), mt.push(n), (Ke = n), e();
              } finally {
                mt.pop(), _t(), (Ke = mt[mt.length - 1]);
              }
            }
          };
          return (
            (n.id = yt++),
            (n.allowRecurse = !!t.allowRecurse),
            (n._isEffect = !0),
            (n.active = !0),
            (n.raw = e),
            (n.deps = []),
            (n.options = t),
            n
          );
        })(e, t);
        return t.lazy || n(), n;
      },
      release: function (e) {
        e.active &&
          (bt(e), e.options.onStop && e.options.onStop(), (e.active = !1));
      },
      raw: pn,
    });
  var En = Xe;
  function Sn(e) {
    return new (class {
      el = void 0;
      constructor(e) {
        this.el = e;
      }
      traversals = {
        first: "firstElementChild",
        next: "nextElementSibling",
        parent: "parentElement",
      };
      nodes() {
        return (
          (this.traversals = {
            first: "firstChild",
            next: "nextSibling",
            parent: "parentNode",
          }),
          this
        );
      }
      first() {
        return this.teleportTo(this.el[this.traversals.first]);
      }
      next() {
        return this.teleportTo(
          this.teleportBack(this.el[this.traversals.next])
        );
      }
      before(e) {
        return this.el[this.traversals.parent].insertBefore(e, this.el), e;
      }
      replace(e) {
        return this.el[this.traversals.parent].replaceChild(e, this.el), e;
      }
      append(e) {
        return this.el.appendChild(e), e;
      }
      teleportTo(e) {
        return e && e._x_teleport ? e._x_teleport : e;
      }
      teleportBack(e) {
        return e && e._x_teleportBack ? e._x_teleportBack : e;
      }
    })(e);
  }
  var Tn = () => {},
    An = () => {};
  async function Cn(e, t, n) {
    let i, r, o, s, a, c, u, l, f, p, d;
    function h(e) {
      if (d)
        return (
          An((e || "").replace("\n", "\\n"), i, r),
          new Promise((e) => (Tn = () => e()))
        );
    }
    async function m(e, t) {
      if (
        (function (e, t) {
          return (
            e.nodeType != t.nodeType || e.nodeName != t.nodeName || g(e) != g(t)
          );
        })(e, t)
      ) {
        let n = (function (e, t) {
          if (Ln(u, e)) return;
          let n = t.cloneNode(!0);
          if (Ln(f, n)) return;
          Sn(e).replace(n), l(e), p(n);
        })(e, t);
        return await h("Swap elements"), n;
      }
      let n = !1;
      if (!Ln(a, e, t, () => (n = !0))) {
        if (
          (window.Alpine &&
            (function (e, t, n) {
              if (1 !== e.nodeType) return;
              e._x_dataStack && window.Alpine.clone(e, t);
            })(e, t),
          3 === (i = t).nodeType || 8 === i.nodeType)
        )
          return (
            await (async function (e, t) {
              let n = t.nodeValue;
              e.nodeValue !== n &&
                ((e.nodeValue = n), await h("Change text node to: " + n));
            })(e, t),
            void c(e, t)
          );
        var i;
        n ||
          (await (async function (e, t) {
            if (e._x_isShown && !t._x_isShown) return;
            if (!e._x_isShown && t._x_isShown) return;
            let n = Array.from(e.attributes),
              i = Array.from(t.attributes);
            for (let i = n.length - 1; i >= 0; i--) {
              let r = n[i].name;
              t.hasAttribute(r) ||
                (e.removeAttribute(r), await h("Remove attribute"));
            }
            for (let t = i.length - 1; t >= 0; t--) {
              let n = i[t].name,
                r = i[t].value;
              e.getAttribute(n) !== r &&
                (e.setAttribute(n, r),
                await h(`Set [${n}] attribute to: "${r}"`));
            }
          })(e, t)),
          c(e, t),
          await (async function (e, t) {
            let n = e.childNodes,
              i = (v(t.childNodes), v(n)),
              r = Sn(t).nodes().first(),
              o = Sn(e).nodes().first(),
              a = {};
            for (; r; ) {
              let t = g(r),
                n = g(o);
              if (!o) {
                if (!t || !a[t]) {
                  let t = y(r, e) || {};
                  await h("Add element: " + (t.outerHTML || t.nodeValue)),
                    (r = Sn(r).nodes().next());
                  continue;
                }
                {
                  let n = a[t];
                  Sn(e).append(n), (o = n), await h("Add element (from key)");
                }
              }
              if (s) {
                let e = Sn(r).next(),
                  t = !1;
                for (; !t && e; )
                  o.isEqualNode(e) &&
                    ((t = !0),
                    (o = b(r, o)),
                    (n = g(o)),
                    await h("Move element (lookahead)")),
                    (e = Sn(e).next());
              }
              if (t !== n) {
                if (!t && n) {
                  (a[n] = o),
                    (o = b(r, o)),
                    a[n].remove(),
                    (o = Sn(o).nodes().next()),
                    (r = Sn(r).nodes().next()),
                    await h('No "to" key');
                  continue;
                }
                if (
                  (t &&
                    !n &&
                    i[t] &&
                    ((o = Sn(o).replace(i[t])), await h('No "from" key')),
                  t && n)
                ) {
                  a[n] = o;
                  let e = i[t];
                  if (!e) {
                    (a[n] = o),
                      (o = b(r, o)),
                      a[n].remove(),
                      (o = Sn(o).next()),
                      (r = Sn(r).next()),
                      await h("Swap elements with keys");
                    continue;
                  }
                  (o = Sn(o).replace(e)), await h('Move "from" key');
                }
              }
              let c = o && Sn(o).nodes().next();
              await m(o, r), (r = r && Sn(r).nodes().next()), (o = c);
            }
            let c = [];
            for (; o; ) Ln(u, o) || c.push(o), (o = Sn(o).nodes().next());
            for (; c.length; ) {
              let e = c.shift();
              e.remove(), await h("remove el"), l(e);
            }
          })(e, t);
      }
    }
    function g(e) {
      return e && 1 === e.nodeType && o(e);
    }
    function v(e) {
      let t = {};
      return (
        e.forEach((e) => {
          let n = g(e);
          n && (t[n] = e);
        }),
        t
      );
    }
    function y(e, t) {
      if (!Ln(f, e)) {
        let n = e.cloneNode(!0);
        return Sn(t).append(n), p(n), n;
      }
      return null;
    }
    function b(e, t) {
      if (!Ln(f, e)) {
        let n = e.cloneNode(!0);
        return Sn(t).before(n), p(n), n;
      }
      return t;
    }
    var w;
    return (
      (function (e = {}) {
        let t = () => {};
        (a = e.updating || t),
          (c = e.updated || t),
          (u = e.removing || t),
          (l = e.removed || t),
          (f = e.adding || t),
          (p = e.added || t),
          (o = e.key || ((e) => e.getAttribute("key"))),
          (s = e.lookahead || !1),
          (d = e.debug || !1);
      })(n),
      (i = e),
      (w = t),
      (r = document.createRange().createContextualFragment(w)
        .firstElementChild),
      window.Alpine &&
        window.Alpine.closestDataStack &&
        !e._x_dataStack &&
        ((r._x_dataStack = window.Alpine.closestDataStack(e)),
        r._x_dataStack && window.Alpine.clone(e, r)),
      await h(),
      await m(e, r),
      (i = void 0),
      (r = void 0),
      e
    );
  }
  function Ln(e, ...t) {
    let n = !1;
    return e(...t, () => (n = !0)), n;
  }
  (Cn.step = () => Tn()),
    (Cn.log = (e) => {
      An = e;
    });
  var jn = function (e) {
    e.morph = Cn;
  };
  var Mn = function (e) {
      let t = () => {
        let t,
          n = localStorage;
        return e.interceptor(
          (i, r, o, s, a) => {
            let c = t || `_x_${s}`,
              u = (function (e, t) {
                return null !== t.getItem(e);
              })(c, n)
                ? (function (e, t) {
                    return JSON.parse(t.getItem(e, t));
                  })(c, n)
                : i;
            return (
              o(u),
              e.effect(() => {
                let e = r();
                !(function (e, t, n) {
                  n.setItem(e, JSON.stringify(t));
                })(c, e, n),
                  o(e);
              }),
              u
            );
          },
          (e) => {
            (e.as = (n) => ((t = n), e)), (e.using = (t) => ((n = t), e));
          }
        );
      };
      Object.defineProperty(e, "$persist", { get: () => t() }),
        e.magic("persist", t);
    },
    Dn = Object.create,
    Pn = Object.defineProperty,
    zn = Object.getPrototypeOf,
    Rn = Object.prototype.hasOwnProperty,
    In = Object.getOwnPropertyNames,
    $n = Object.getOwnPropertyDescriptor,
    Wn = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Nn = (e) => {
      return ((e, t, n) => {
        if ((t && "object" == typeof t) || "function" == typeof t)
          for (let i of In(t))
            Rn.call(e, i) ||
              "default" === i ||
              Pn(e, i, {
                get: () => t[i],
                enumerable: !(n = $n(t, i)) || n.enumerable,
              });
        return e;
      })(
        ((t = Pn(
          null != e ? Dn(zn(e)) : {},
          "default",
          e && e.__esModule && "default" in e
            ? { get: () => e.default, enumerable: !0 }
            : { value: e, enumerable: !0 }
        )),
        Pn(t, "__esModule", { value: !0 })),
        e
      );
      var t;
    },
    Hn = Wn((e) => {
      function t(e) {
        var t = e.getBoundingClientRect();
        return {
          width: t.width,
          height: t.height,
          top: t.top,
          right: t.right,
          bottom: t.bottom,
          left: t.left,
          x: t.left,
          y: t.top,
        };
      }
      function n(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
          var t = e.ownerDocument;
          return (t && t.defaultView) || window;
        }
        return e;
      }
      function i(e) {
        var t = n(e);
        return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
      }
      function r(e) {
        return e instanceof n(e).Element || e instanceof Element;
      }
      function o(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement;
      }
      function s(e) {
        return (
          "undefined" != typeof ShadowRoot &&
          (e instanceof n(e).ShadowRoot || e instanceof ShadowRoot)
        );
      }
      function a(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
      }
      function c(e) {
        return ((r(e) ? e.ownerDocument : e.document) || window.document)
          .documentElement;
      }
      function u(e) {
        return t(c(e)).left + i(e).scrollLeft;
      }
      function l(e) {
        return n(e).getComputedStyle(e);
      }
      function f(e) {
        var t = l(e),
          n = t.overflow,
          i = t.overflowX,
          r = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + r + i);
      }
      function p(e, r, s) {
        void 0 === s && (s = !1);
        var l,
          p,
          d = c(r),
          h = t(e),
          m = o(r),
          g = { scrollLeft: 0, scrollTop: 0 },
          v = { x: 0, y: 0 };
        return (
          (m || (!m && !s)) &&
            (("body" !== a(r) || f(d)) &&
              (g =
                (l = r) !== n(l) && o(l)
                  ? { scrollLeft: (p = l).scrollLeft, scrollTop: p.scrollTop }
                  : i(l)),
            o(r)
              ? (((v = t(r)).x += r.clientLeft), (v.y += r.clientTop))
              : d && (v.x = u(d))),
          {
            x: h.left + g.scrollLeft - v.x,
            y: h.top + g.scrollTop - v.y,
            width: h.width,
            height: h.height,
          }
        );
      }
      function d(e) {
        var n = t(e),
          i = e.offsetWidth,
          r = e.offsetHeight;
        return (
          Math.abs(n.width - i) <= 1 && (i = n.width),
          Math.abs(n.height - r) <= 1 && (r = n.height),
          { x: e.offsetLeft, y: e.offsetTop, width: i, height: r }
        );
      }
      function h(e) {
        return "html" === a(e)
          ? e
          : e.assignedSlot || e.parentNode || (s(e) ? e.host : null) || c(e);
      }
      function m(e) {
        return ["html", "body", "#document"].indexOf(a(e)) >= 0
          ? e.ownerDocument.body
          : o(e) && f(e)
          ? e
          : m(h(e));
      }
      function g(e, t) {
        var i;
        void 0 === t && (t = []);
        var r = m(e),
          o = r === (null == (i = e.ownerDocument) ? void 0 : i.body),
          s = n(r),
          a = o ? [s].concat(s.visualViewport || [], f(r) ? r : []) : r,
          c = t.concat(a);
        return o ? c : c.concat(g(h(a)));
      }
      function v(e) {
        return ["table", "td", "th"].indexOf(a(e)) >= 0;
      }
      function y(e) {
        return o(e) && "fixed" !== l(e).position ? e.offsetParent : null;
      }
      function b(e) {
        for (var t = n(e), i = y(e); i && v(i) && "static" === l(i).position; )
          i = y(i);
        return i &&
          ("html" === a(i) || ("body" === a(i) && "static" === l(i).position))
          ? t
          : i ||
              (function (e) {
                var t =
                  -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
                if (
                  -1 !== navigator.userAgent.indexOf("Trident") &&
                  o(e) &&
                  "fixed" === l(e).position
                )
                  return null;
                for (
                  var n = h(e);
                  o(n) && ["html", "body"].indexOf(a(n)) < 0;

                ) {
                  var i = l(n);
                  if (
                    "none" !== i.transform ||
                    "none" !== i.perspective ||
                    "paint" === i.contain ||
                    -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                    (t && "filter" === i.willChange) ||
                    (t && i.filter && "none" !== i.filter)
                  )
                    return n;
                  n = n.parentNode;
                }
                return null;
              })(e) ||
              t;
      }
      Object.defineProperty(e, "__esModule", { value: !0 });
      var w = "top",
        x = "bottom",
        _ = "right",
        O = "left",
        k = "auto",
        E = [w, x, _, O],
        S = "start",
        T = "end",
        A = "viewport",
        C = "popper",
        L = E.reduce(function (e, t) {
          return e.concat([t + "-" + S, t + "-" + T]);
        }, []),
        j = [].concat(E, [k]).reduce(function (e, t) {
          return e.concat([t, t + "-" + S, t + "-" + T]);
        }, []),
        M = [
          "beforeRead",
          "read",
          "afterRead",
          "beforeMain",
          "main",
          "afterMain",
          "beforeWrite",
          "write",
          "afterWrite",
        ];
      function D(e) {
        var t = new Map(),
          n = new Set(),
          i = [];
        function r(e) {
          n.add(e.name),
            []
              .concat(e.requires || [], e.requiresIfExists || [])
              .forEach(function (e) {
                if (!n.has(e)) {
                  var i = t.get(e);
                  i && r(i);
                }
              }),
            i.push(e);
        }
        return (
          e.forEach(function (e) {
            t.set(e.name, e);
          }),
          e.forEach(function (e) {
            n.has(e.name) || r(e);
          }),
          i
        );
      }
      function P(e) {
        for (
          var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
          i < t;
          i++
        )
          n[i - 1] = arguments[i];
        return [].concat(n).reduce(function (e, t) {
          return e.replace(/%s/, t);
        }, e);
      }
      var z =
          'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
        R = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
      function I(e) {
        return e.split("-")[0];
      }
      var $ = Math.max,
        W = Math.min,
        N = Math.round;
      function H(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && s(n)) {
          var i = t;
          do {
            if (i && e.isSameNode(i)) return !0;
            i = i.parentNode || i.host;
          } while (i);
        }
        return !1;
      }
      function F(e) {
        return Object.assign({}, e, {
          left: e.x,
          top: e.y,
          right: e.x + e.width,
          bottom: e.y + e.height,
        });
      }
      function V(e, r) {
        return r === A
          ? F(
              (function (e) {
                var t = n(e),
                  i = c(e),
                  r = t.visualViewport,
                  o = i.clientWidth,
                  s = i.clientHeight,
                  a = 0,
                  l = 0;
                return (
                  r &&
                    ((o = r.width),
                    (s = r.height),
                    /^((?!chrome|android).)*safari/i.test(
                      navigator.userAgent
                    ) || ((a = r.offsetLeft), (l = r.offsetTop))),
                  { width: o, height: s, x: a + u(e), y: l }
                );
              })(e)
            )
          : o(r)
          ? (function (e) {
              var n = t(e);
              return (
                (n.top = n.top + e.clientTop),
                (n.left = n.left + e.clientLeft),
                (n.bottom = n.top + e.clientHeight),
                (n.right = n.left + e.clientWidth),
                (n.width = e.clientWidth),
                (n.height = e.clientHeight),
                (n.x = n.left),
                (n.y = n.top),
                n
              );
            })(r)
          : F(
              (function (e) {
                var t,
                  n = c(e),
                  r = i(e),
                  o = null == (t = e.ownerDocument) ? void 0 : t.body,
                  s = $(
                    n.scrollWidth,
                    n.clientWidth,
                    o ? o.scrollWidth : 0,
                    o ? o.clientWidth : 0
                  ),
                  a = $(
                    n.scrollHeight,
                    n.clientHeight,
                    o ? o.scrollHeight : 0,
                    o ? o.clientHeight : 0
                  ),
                  f = -r.scrollLeft + u(e),
                  p = -r.scrollTop;
                return (
                  "rtl" === l(o || n).direction &&
                    (f += $(n.clientWidth, o ? o.clientWidth : 0) - s),
                  { width: s, height: a, x: f, y: p }
                );
              })(c(e))
            );
      }
      function B(e, t, n) {
        var i =
            "clippingParents" === t
              ? (function (e) {
                  var t = g(h(e)),
                    n =
                      ["absolute", "fixed"].indexOf(l(e).position) >= 0 && o(e)
                        ? b(e)
                        : e;
                  return r(n)
                    ? t.filter(function (e) {
                        return r(e) && H(e, n) && "body" !== a(e);
                      })
                    : [];
                })(e)
              : [].concat(t),
          s = [].concat(i, [n]),
          c = s[0],
          u = s.reduce(function (t, n) {
            var i = V(e, n);
            return (
              (t.top = $(i.top, t.top)),
              (t.right = W(i.right, t.right)),
              (t.bottom = W(i.bottom, t.bottom)),
              (t.left = $(i.left, t.left)),
              t
            );
          }, V(e, c));
        return (
          (u.width = u.right - u.left),
          (u.height = u.bottom - u.top),
          (u.x = u.left),
          (u.y = u.top),
          u
        );
      }
      function q(e) {
        return e.split("-")[1];
      }
      function G(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
      }
      function U(e) {
        var t,
          n = e.reference,
          i = e.element,
          r = e.placement,
          o = r ? I(r) : null,
          s = r ? q(r) : null,
          a = n.x + n.width / 2 - i.width / 2,
          c = n.y + n.height / 2 - i.height / 2;
        switch (o) {
          case w:
            t = { x: a, y: n.y - i.height };
            break;
          case x:
            t = { x: a, y: n.y + n.height };
            break;
          case _:
            t = { x: n.x + n.width, y: c };
            break;
          case O:
            t = { x: n.x - i.width, y: c };
            break;
          default:
            t = { x: n.x, y: n.y };
        }
        var u = o ? G(o) : null;
        if (null != u) {
          var l = "y" === u ? "height" : "width";
          switch (s) {
            case S:
              t[u] = t[u] - (n[l] / 2 - i[l] / 2);
              break;
            case T:
              t[u] = t[u] + (n[l] / 2 - i[l] / 2);
          }
        }
        return t;
      }
      function Y(e) {
        return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
      }
      function X(e, t) {
        return t.reduce(function (t, n) {
          return (t[n] = e), t;
        }, {});
      }
      function J(e, n) {
        void 0 === n && (n = {});
        var i = n,
          o = i.placement,
          s = void 0 === o ? e.placement : o,
          a = i.boundary,
          u = void 0 === a ? "clippingParents" : a,
          l = i.rootBoundary,
          f = void 0 === l ? A : l,
          p = i.elementContext,
          d = void 0 === p ? C : p,
          h = i.altBoundary,
          m = void 0 !== h && h,
          g = i.padding,
          v = void 0 === g ? 0 : g,
          y = Y("number" != typeof v ? v : X(v, E)),
          b = d === C ? "reference" : C,
          O = e.elements.reference,
          k = e.rects.popper,
          S = e.elements[m ? b : d],
          T = B(r(S) ? S : S.contextElement || c(e.elements.popper), u, f),
          L = t(O),
          j = U({
            reference: L,
            element: k,
            strategy: "absolute",
            placement: s,
          }),
          M = F(Object.assign({}, k, j)),
          D = d === C ? M : L,
          P = {
            top: T.top - D.top + y.top,
            bottom: D.bottom - T.bottom + y.bottom,
            left: T.left - D.left + y.left,
            right: D.right - T.right + y.right,
          },
          z = e.modifiersData.offset;
        if (d === C && z) {
          var R = z[s];
          Object.keys(P).forEach(function (e) {
            var t = [_, x].indexOf(e) >= 0 ? 1 : -1,
              n = [w, x].indexOf(e) >= 0 ? "y" : "x";
            P[e] += R[n] * t;
          });
        }
        return P;
      }
      var K =
          "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",
        Z = { placement: "bottom", modifiers: [], strategy: "absolute" };
      function Q() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return !t.some(function (e) {
          return !(e && "function" == typeof e.getBoundingClientRect);
        });
      }
      function ee(e) {
        void 0 === e && (e = {});
        var t = e,
          n = t.defaultModifiers,
          i = void 0 === n ? [] : n,
          o = t.defaultOptions,
          s = void 0 === o ? Z : o;
        return function (e, t, n) {
          void 0 === n && (n = s);
          var o,
            a,
            c = {
              placement: "bottom",
              orderedModifiers: [],
              options: Object.assign({}, Z, s),
              modifiersData: {},
              elements: { reference: e, popper: t },
              attributes: {},
              styles: {},
            },
            u = [],
            f = !1,
            h = {
              state: c,
              setOptions: function (n) {
                m(),
                  (c.options = Object.assign({}, s, c.options, n)),
                  (c.scrollParents = {
                    reference: r(e)
                      ? g(e)
                      : e.contextElement
                      ? g(e.contextElement)
                      : [],
                    popper: g(t),
                  });
                var o,
                  a,
                  f,
                  p = (function (e) {
                    var t = D(e);
                    return M.reduce(function (e, n) {
                      return e.concat(
                        t.filter(function (e) {
                          return e.phase === n;
                        })
                      );
                    }, []);
                  })(
                    (function (e) {
                      var t = e.reduce(function (e, t) {
                        var n = e[t.name];
                        return (
                          (e[t.name] = n
                            ? Object.assign({}, n, t, {
                                options: Object.assign(
                                  {},
                                  n.options,
                                  t.options
                                ),
                                data: Object.assign({}, n.data, t.data),
                              })
                            : t),
                          e
                        );
                      }, {});
                      return Object.keys(t).map(function (e) {
                        return t[e];
                      });
                    })([].concat(i, c.options.modifiers))
                  );
                ((c.orderedModifiers = p.filter(function (e) {
                  return e.enabled;
                })),
                (function (e) {
                  e.forEach(function (t) {
                    Object.keys(t).forEach(function (n) {
                      switch (n) {
                        case "name":
                          "string" != typeof t.name &&
                            console.error(
                              P(
                                z,
                                String(t.name),
                                '"name"',
                                '"string"',
                                '"' + String(t.name) + '"'
                              )
                            );
                          break;
                        case "enabled":
                          "boolean" != typeof t.enabled &&
                            console.error(
                              P(
                                z,
                                t.name,
                                '"enabled"',
                                '"boolean"',
                                '"' + String(t.enabled) + '"'
                              )
                            );
                        case "phase":
                          M.indexOf(t.phase) < 0 &&
                            console.error(
                              P(
                                z,
                                t.name,
                                '"phase"',
                                "either " + M.join(", "),
                                '"' + String(t.phase) + '"'
                              )
                            );
                          break;
                        case "fn":
                          "function" != typeof t.fn &&
                            console.error(
                              P(
                                z,
                                t.name,
                                '"fn"',
                                '"function"',
                                '"' + String(t.fn) + '"'
                              )
                            );
                          break;
                        case "effect":
                          "function" != typeof t.effect &&
                            console.error(
                              P(
                                z,
                                t.name,
                                '"effect"',
                                '"function"',
                                '"' + String(t.fn) + '"'
                              )
                            );
                          break;
                        case "requires":
                          Array.isArray(t.requires) ||
                            console.error(
                              P(
                                z,
                                t.name,
                                '"requires"',
                                '"array"',
                                '"' + String(t.requires) + '"'
                              )
                            );
                          break;
                        case "requiresIfExists":
                          Array.isArray(t.requiresIfExists) ||
                            console.error(
                              P(
                                z,
                                t.name,
                                '"requiresIfExists"',
                                '"array"',
                                '"' + String(t.requiresIfExists) + '"'
                              )
                            );
                          break;
                        case "options":
                        case "data":
                          break;
                        default:
                          console.error(
                            'PopperJS: an invalid property has been provided to the "' +
                              t.name +
                              '" modifier, valid properties are ' +
                              R.map(function (e) {
                                return '"' + e + '"';
                              }).join(", ") +
                              '; but "' +
                              n +
                              '" was provided.'
                          );
                      }
                      t.requires &&
                        t.requires.forEach(function (n) {
                          null ==
                            e.find(function (e) {
                              return e.name === n;
                            }) &&
                            console.error(
                              P(
                                'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
                                String(t.name),
                                n,
                                n
                              )
                            );
                        });
                    });
                  });
                })(
                  ((o = [].concat(p, c.options.modifiers)),
                  (a = function (e) {
                    return e.name;
                  }),
                  (f = new Set()),
                  o.filter(function (e) {
                    var t = a(e);
                    if (!f.has(t)) return f.add(t), !0;
                  }))
                ),
                I(c.options.placement) === k) &&
                  (c.orderedModifiers.find(function (e) {
                    return "flip" === e.name;
                  }) ||
                    console.error(
                      [
                        'Popper: "auto" placements require the "flip" modifier be',
                        "present and enabled to work.",
                      ].join(" ")
                    ));
                var d = l(t);
                return (
                  [
                    d.marginTop,
                    d.marginRight,
                    d.marginBottom,
                    d.marginLeft,
                  ].some(function (e) {
                    return parseFloat(e);
                  }) &&
                    console.warn(
                      [
                        'Popper: CSS "margin" styles cannot be used to apply padding',
                        "between the popper and its reference element or boundary.",
                        "To replicate margin, use the `offset` modifier, as well as",
                        "the `padding` option in the `preventOverflow` and `flip`",
                        "modifiers.",
                      ].join(" ")
                    ),
                  c.orderedModifiers.forEach(function (e) {
                    var t = e.name,
                      n = e.options,
                      i = void 0 === n ? {} : n,
                      r = e.effect;
                    if ("function" == typeof r) {
                      var o = r({ state: c, name: t, instance: h, options: i }),
                        s = function () {};
                      u.push(o || s);
                    }
                  }),
                  h.update()
                );
              },
              forceUpdate: function () {
                if (!f) {
                  var e = c.elements,
                    t = e.reference,
                    n = e.popper;
                  if (Q(t, n)) {
                    (c.rects = {
                      reference: p(t, b(n), "fixed" === c.options.strategy),
                      popper: d(n),
                    }),
                      (c.reset = !1),
                      (c.placement = c.options.placement),
                      c.orderedModifiers.forEach(function (e) {
                        return (c.modifiersData[e.name] = Object.assign(
                          {},
                          e.data
                        ));
                      });
                    for (var i = 0, r = 0; r < c.orderedModifiers.length; r++) {
                      if ((i += 1) > 100) {
                        console.error(
                          "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash."
                        );
                        break;
                      }
                      if (!0 !== c.reset) {
                        var o = c.orderedModifiers[r],
                          s = o.fn,
                          a = o.options,
                          u = void 0 === a ? {} : a,
                          l = o.name;
                        "function" == typeof s &&
                          (c =
                            s({ state: c, options: u, name: l, instance: h }) ||
                            c);
                      } else (c.reset = !1), (r = -1);
                    }
                  } else console.error(K);
                }
              },
              update:
                ((o = function () {
                  return new Promise(function (e) {
                    h.forceUpdate(), e(c);
                  });
                }),
                function () {
                  return (
                    a ||
                      (a = new Promise(function (e) {
                        Promise.resolve().then(function () {
                          (a = void 0), e(o());
                        });
                      })),
                    a
                  );
                }),
              destroy: function () {
                m(), (f = !0);
              },
            };
          if (!Q(e, t)) return console.error(K), h;
          function m() {
            u.forEach(function (e) {
              return e();
            }),
              (u = []);
          }
          return (
            h.setOptions(n).then(function (e) {
              !f && n.onFirstUpdate && n.onFirstUpdate(e);
            }),
            h
          );
        };
      }
      var te = { passive: !0 };
      var ne = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function () {},
        effect: function (e) {
          var t = e.state,
            i = e.instance,
            r = e.options,
            o = r.scroll,
            s = void 0 === o || o,
            a = r.resize,
            c = void 0 === a || a,
            u = n(t.elements.popper),
            l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
          return (
            s &&
              l.forEach(function (e) {
                e.addEventListener("scroll", i.update, te);
              }),
            c && u.addEventListener("resize", i.update, te),
            function () {
              s &&
                l.forEach(function (e) {
                  e.removeEventListener("scroll", i.update, te);
                }),
                c && u.removeEventListener("resize", i.update, te);
            }
          );
        },
        data: {},
      };
      var ie = {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = U({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        re = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
      function oe(e) {
        var t,
          i = e.popper,
          r = e.popperRect,
          o = e.placement,
          s = e.offsets,
          a = e.position,
          u = e.gpuAcceleration,
          f = e.adaptive,
          p = e.roundOffsets,
          d =
            !0 === p
              ? (function (e) {
                  var t = e.x,
                    n = e.y,
                    i = window.devicePixelRatio || 1;
                  return { x: N(N(t * i) / i) || 0, y: N(N(n * i) / i) || 0 };
                })(s)
              : "function" == typeof p
              ? p(s)
              : s,
          h = d.x,
          m = void 0 === h ? 0 : h,
          g = d.y,
          v = void 0 === g ? 0 : g,
          y = s.hasOwnProperty("x"),
          k = s.hasOwnProperty("y"),
          E = O,
          S = w,
          T = window;
        if (f) {
          var A = b(i),
            C = "clientHeight",
            L = "clientWidth";
          A === n(i) &&
            "static" !== l((A = c(i))).position &&
            ((C = "scrollHeight"), (L = "scrollWidth")),
            o === w && ((S = x), (v -= A[C] - r.height), (v *= u ? 1 : -1)),
            o === O && ((E = _), (m -= A[L] - r.width), (m *= u ? 1 : -1));
        }
        var j,
          M = Object.assign({ position: a }, f && re);
        return u
          ? Object.assign(
              {},
              M,
              (((j = {})[S] = k ? "0" : ""),
              (j[E] = y ? "0" : ""),
              (j.transform =
                (T.devicePixelRatio || 1) < 2
                  ? "translate(" + m + "px, " + v + "px)"
                  : "translate3d(" + m + "px, " + v + "px, 0)"),
              j)
            )
          : Object.assign(
              {},
              M,
              (((t = {})[S] = k ? v + "px" : ""),
              (t[E] = y ? m + "px" : ""),
              (t.transform = ""),
              t)
            );
      }
      var se = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            i = n.gpuAcceleration,
            r = void 0 === i || i,
            o = n.adaptive,
            s = void 0 === o || o,
            a = n.roundOffsets,
            c = void 0 === a || a,
            u = l(t.elements.popper).transitionProperty || "";
          s &&
            ["transform", "top", "right", "bottom", "left"].some(function (e) {
              return u.indexOf(e) >= 0;
            }) &&
            console.warn(
              [
                "Popper: Detected CSS transitions on at least one of the following",
                'CSS properties: "transform", "top", "right", "bottom", "left".',
                "\n\n",
                'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
                "for smooth transitions, or remove these properties from the CSS",
                "transition declaration on the popper element if only transitioning",
                "opacity or background-color for example.",
                "\n\n",
                "We recommend using the popper element as a wrapper around an inner",
                "element that can have any CSS property transitioned for animations.",
              ].join(" ")
            );
          var f = {
            placement: I(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: r,
          };
          null != t.modifiersData.popperOffsets &&
            (t.styles.popper = Object.assign(
              {},
              t.styles.popper,
              oe(
                Object.assign({}, f, {
                  offsets: t.modifiersData.popperOffsets,
                  position: t.options.strategy,
                  adaptive: s,
                  roundOffsets: c,
                })
              )
            )),
            null != t.modifiersData.arrow &&
              (t.styles.arrow = Object.assign(
                {},
                t.styles.arrow,
                oe(
                  Object.assign({}, f, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: c,
                  })
                )
              )),
            (t.attributes.popper = Object.assign({}, t.attributes.popper, {
              "data-popper-placement": t.placement,
            }));
        },
        data: {},
      };
      var ae = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (e) {
          var t = e.state;
          Object.keys(t.elements).forEach(function (e) {
            var n = t.styles[e] || {},
              i = t.attributes[e] || {},
              r = t.elements[e];
            o(r) &&
              a(r) &&
              (Object.assign(r.style, n),
              Object.keys(i).forEach(function (e) {
                var t = i[e];
                !1 === t
                  ? r.removeAttribute(e)
                  : r.setAttribute(e, !0 === t ? "" : t);
              }));
          });
        },
        effect: function (e) {
          var t = e.state,
            n = {
              popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0",
              },
              arrow: { position: "absolute" },
              reference: {},
            };
          return (
            Object.assign(t.elements.popper.style, n.popper),
            (t.styles = n),
            t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
            function () {
              Object.keys(t.elements).forEach(function (e) {
                var i = t.elements[e],
                  r = t.attributes[e] || {},
                  s = Object.keys(
                    t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
                  ).reduce(function (e, t) {
                    return (e[t] = ""), e;
                  }, {});
                o(i) &&
                  a(i) &&
                  (Object.assign(i.style, s),
                  Object.keys(r).forEach(function (e) {
                    i.removeAttribute(e);
                  }));
              });
            }
          );
        },
        requires: ["computeStyles"],
      };
      var ce = {
          name: "offset",
          enabled: !0,
          phase: "main",
          requires: ["popperOffsets"],
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              r = n.offset,
              o = void 0 === r ? [0, 0] : r,
              s = j.reduce(function (e, n) {
                return (
                  (e[n] = (function (e, t, n) {
                    var i = I(e),
                      r = [O, w].indexOf(i) >= 0 ? -1 : 1,
                      o =
                        "function" == typeof n
                          ? n(Object.assign({}, t, { placement: e }))
                          : n,
                      s = o[0],
                      a = o[1];
                    return (
                      (s = s || 0),
                      (a = (a || 0) * r),
                      [O, _].indexOf(i) >= 0 ? { x: a, y: s } : { x: s, y: a }
                    );
                  })(n, t.rects, o)),
                  e
                );
              }, {}),
              a = s[t.placement],
              c = a.x,
              u = a.y;
            null != t.modifiersData.popperOffsets &&
              ((t.modifiersData.popperOffsets.x += c),
              (t.modifiersData.popperOffsets.y += u)),
              (t.modifiersData[i] = s);
          },
        },
        ue = { left: "right", right: "left", bottom: "top", top: "bottom" };
      function le(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
          return ue[e];
        });
      }
      var fe = { start: "end", end: "start" };
      function pe(e) {
        return e.replace(/start|end/g, function (e) {
          return fe[e];
        });
      }
      var de = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            i = e.name;
          if (!t.modifiersData[i]._skip) {
            for (
              var r = n.mainAxis,
                o = void 0 === r || r,
                s = n.altAxis,
                a = void 0 === s || s,
                c = n.fallbackPlacements,
                u = n.padding,
                l = n.boundary,
                f = n.rootBoundary,
                p = n.altBoundary,
                d = n.flipVariations,
                h = void 0 === d || d,
                m = n.allowedAutoPlacements,
                g = t.options.placement,
                v = I(g),
                y =
                  c ||
                  (v === g || !h
                    ? [le(g)]
                    : (function (e) {
                        if (I(e) === k) return [];
                        var t = le(e);
                        return [pe(e), t, pe(t)];
                      })(g)),
                b = [g].concat(y).reduce(function (e, n) {
                  return e.concat(
                    I(n) === k
                      ? (function (e, t) {
                          void 0 === t && (t = {});
                          var n = t,
                            i = n.placement,
                            r = n.boundary,
                            o = n.rootBoundary,
                            s = n.padding,
                            a = n.flipVariations,
                            c = n.allowedAutoPlacements,
                            u = void 0 === c ? j : c,
                            l = q(i),
                            f = l
                              ? a
                                ? L
                                : L.filter(function (e) {
                                    return q(e) === l;
                                  })
                              : E,
                            p = f.filter(function (e) {
                              return u.indexOf(e) >= 0;
                            });
                          0 === p.length &&
                            ((p = f),
                            console.error(
                              [
                                "Popper: The `allowedAutoPlacements` option did not allow any",
                                "placements. Ensure the `placement` option matches the variation",
                                "of the allowed placements.",
                                'For example, "auto" cannot be used to allow "bottom-start".',
                                'Use "auto-start" instead.',
                              ].join(" ")
                            ));
                          var d = p.reduce(function (t, n) {
                            return (
                              (t[n] = J(e, {
                                placement: n,
                                boundary: r,
                                rootBoundary: o,
                                padding: s,
                              })[I(n)]),
                              t
                            );
                          }, {});
                          return Object.keys(d).sort(function (e, t) {
                            return d[e] - d[t];
                          });
                        })(t, {
                          placement: n,
                          boundary: l,
                          rootBoundary: f,
                          padding: u,
                          flipVariations: h,
                          allowedAutoPlacements: m,
                        })
                      : n
                  );
                }, []),
                T = t.rects.reference,
                A = t.rects.popper,
                C = new Map(),
                M = !0,
                D = b[0],
                P = 0;
              P < b.length;
              P++
            ) {
              var z = b[P],
                R = I(z),
                $ = q(z) === S,
                W = [w, x].indexOf(R) >= 0,
                N = W ? "width" : "height",
                H = J(t, {
                  placement: z,
                  boundary: l,
                  rootBoundary: f,
                  altBoundary: p,
                  padding: u,
                }),
                F = W ? ($ ? _ : O) : $ ? x : w;
              T[N] > A[N] && (F = le(F));
              var V = le(F),
                B = [];
              if (
                (o && B.push(H[R] <= 0),
                a && B.push(H[F] <= 0, H[V] <= 0),
                B.every(function (e) {
                  return e;
                }))
              ) {
                (D = z), (M = !1);
                break;
              }
              C.set(z, B);
            }
            if (M)
              for (
                var G = function (e) {
                    var t = b.find(function (t) {
                      var n = C.get(t);
                      if (n)
                        return n.slice(0, e).every(function (e) {
                          return e;
                        });
                    });
                    if (t) return (D = t), "break";
                  },
                  U = h ? 3 : 1;
                U > 0;
                U--
              ) {
                if ("break" === G(U)) break;
              }
            t.placement !== D &&
              ((t.modifiersData[i]._skip = !0),
              (t.placement = D),
              (t.reset = !0));
          }
        },
        requiresIfExists: ["offset"],
        data: { _skip: !1 },
      };
      function he(e, t, n) {
        return $(e, W(t, n));
      }
      var me = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            i = e.name,
            r = n.mainAxis,
            o = void 0 === r || r,
            s = n.altAxis,
            a = void 0 !== s && s,
            c = n.boundary,
            u = n.rootBoundary,
            l = n.altBoundary,
            f = n.padding,
            p = n.tether,
            h = void 0 === p || p,
            m = n.tetherOffset,
            g = void 0 === m ? 0 : m,
            v = J(t, {
              boundary: c,
              rootBoundary: u,
              padding: f,
              altBoundary: l,
            }),
            y = I(t.placement),
            k = q(t.placement),
            E = !k,
            T = G(y),
            A = "x" === T ? "y" : "x",
            C = t.modifiersData.popperOffsets,
            L = t.rects.reference,
            j = t.rects.popper,
            M =
              "function" == typeof g
                ? g(Object.assign({}, t.rects, { placement: t.placement }))
                : g,
            D = { x: 0, y: 0 };
          if (C) {
            if (o || a) {
              var P = "y" === T ? w : O,
                z = "y" === T ? x : _,
                R = "y" === T ? "height" : "width",
                N = C[T],
                H = C[T] + v[P],
                F = C[T] - v[z],
                V = h ? -j[R] / 2 : 0,
                B = k === S ? L[R] : j[R],
                U = k === S ? -j[R] : -L[R],
                Y = t.elements.arrow,
                X = h && Y ? d(Y) : { width: 0, height: 0 },
                K = t.modifiersData["arrow#persistent"]
                  ? t.modifiersData["arrow#persistent"].padding
                  : { top: 0, right: 0, bottom: 0, left: 0 },
                Z = K[P],
                Q = K[z],
                ee = he(0, L[R], X[R]),
                te = E ? L[R] / 2 - V - ee - Z - M : B - ee - Z - M,
                ne = E ? -L[R] / 2 + V + ee + Q + M : U + ee + Q + M,
                ie = t.elements.arrow && b(t.elements.arrow),
                re = ie
                  ? "y" === T
                    ? ie.clientTop || 0
                    : ie.clientLeft || 0
                  : 0,
                oe = t.modifiersData.offset
                  ? t.modifiersData.offset[t.placement][T]
                  : 0,
                se = C[T] + te - oe - re,
                ae = C[T] + ne - oe;
              if (o) {
                var ce = he(h ? W(H, se) : H, N, h ? $(F, ae) : F);
                (C[T] = ce), (D[T] = ce - N);
              }
              if (a) {
                var ue = "x" === T ? w : O,
                  le = "x" === T ? x : _,
                  fe = C[A],
                  pe = fe + v[ue],
                  de = fe - v[le],
                  me = he(h ? W(pe, se) : pe, fe, h ? $(de, ae) : de);
                (C[A] = me), (D[A] = me - fe);
              }
            }
            t.modifiersData[i] = D;
          }
        },
        requiresIfExists: ["offset"],
      };
      var ge = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t,
            n = e.state,
            i = e.name,
            r = e.options,
            o = n.elements.arrow,
            s = n.modifiersData.popperOffsets,
            a = I(n.placement),
            c = G(a),
            u = [O, _].indexOf(a) >= 0 ? "height" : "width";
          if (o && s) {
            var l = (function (e, t) {
                return Y(
                  "number" !=
                    typeof (e =
                      "function" == typeof e
                        ? e(
                            Object.assign({}, t.rects, {
                              placement: t.placement,
                            })
                          )
                        : e)
                    ? e
                    : X(e, E)
                );
              })(r.padding, n),
              f = d(o),
              p = "y" === c ? w : O,
              h = "y" === c ? x : _,
              m =
                n.rects.reference[u] +
                n.rects.reference[c] -
                s[c] -
                n.rects.popper[u],
              g = s[c] - n.rects.reference[c],
              v = b(o),
              y = v
                ? "y" === c
                  ? v.clientHeight || 0
                  : v.clientWidth || 0
                : 0,
              k = m / 2 - g / 2,
              S = l[p],
              T = y - f[u] - l[h],
              A = y / 2 - f[u] / 2 + k,
              C = he(S, A, T),
              L = c;
            n.modifiersData[i] =
              (((t = {})[L] = C), (t.centerOffset = C - A), t);
          }
        },
        effect: function (e) {
          var t = e.state,
            n = e.options.element,
            i = void 0 === n ? "[data-popper-arrow]" : n;
          null != i &&
            ("string" != typeof i ||
              (i = t.elements.popper.querySelector(i))) &&
            (o(i) ||
              console.error(
                [
                  'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
                  "To use an SVG arrow, wrap it in an HTMLElement that will be used as",
                  "the arrow.",
                ].join(" ")
              ),
            H(t.elements.popper, i)
              ? (t.elements.arrow = i)
              : console.error(
                  [
                    'Popper: "arrow" modifier\'s `element` must be a child of the popper',
                    "element.",
                  ].join(" ")
                ));
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"],
      };
      function ve(e, t, n) {
        return (
          void 0 === n && (n = { x: 0, y: 0 }),
          {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x,
          }
        );
      }
      function ye(e) {
        return [w, _, x, O].some(function (t) {
          return e[t] >= 0;
        });
      }
      var be = {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              i = t.rects.reference,
              r = t.rects.popper,
              o = t.modifiersData.preventOverflow,
              s = J(t, { elementContext: "reference" }),
              a = J(t, { altBoundary: !0 }),
              c = ve(s, i),
              u = ve(a, r, o),
              l = ye(c),
              f = ye(u);
            (t.modifiersData[n] = {
              referenceClippingOffsets: c,
              popperEscapeOffsets: u,
              isReferenceHidden: l,
              hasPopperEscaped: f,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": l,
                "data-popper-escaped": f,
              }));
          },
        },
        we = ee({ defaultModifiers: [ne, ie, se, ae] }),
        xe = [ne, ie, se, ae, ce, de, me, ge, be],
        _e = ee({ defaultModifiers: xe });
      (e.applyStyles = ae),
        (e.arrow = ge),
        (e.computeStyles = se),
        (e.createPopper = _e),
        (e.createPopperLite = we),
        (e.defaultModifiers = xe),
        (e.detectOverflow = J),
        (e.eventListeners = ne),
        (e.flip = de),
        (e.hide = be),
        (e.offset = ce),
        (e.popperGenerator = ee),
        (e.popperOffsets = ie),
        (e.preventOverflow = me);
    }),
    Fn = Wn((e) => {
      Object.defineProperty(e, "__esModule", { value: !0 });
      var t = Hn(),
        n = "tippy-content",
        i = "tippy-backdrop",
        r = "tippy-arrow",
        o = "tippy-svg-arrow",
        s = { passive: !0, capture: !0 };
      function a(e, t, n) {
        if (Array.isArray(e)) {
          var i = e[t];
          return null == i ? (Array.isArray(n) ? n[t] : n) : i;
        }
        return e;
      }
      function c(e, t) {
        var n = {}.toString.call(e);
        return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
      }
      function u(e, t) {
        return "function" == typeof e ? e.apply(void 0, t) : e;
      }
      function l(e, t) {
        return 0 === t
          ? e
          : function (i) {
              clearTimeout(n),
                (n = setTimeout(function () {
                  e(i);
                }, t));
            };
        var n;
      }
      function f(e, t) {
        var n = Object.assign({}, e);
        return (
          t.forEach(function (e) {
            delete n[e];
          }),
          n
        );
      }
      function p(e) {
        return [].concat(e);
      }
      function d(e, t) {
        -1 === e.indexOf(t) && e.push(t);
      }
      function h(e) {
        return e.split("-")[0];
      }
      function m(e) {
        return [].slice.call(e);
      }
      function g() {
        return document.createElement("div");
      }
      function v(e) {
        return ["Element", "Fragment"].some(function (t) {
          return c(e, t);
        });
      }
      function y(e) {
        return c(e, "MouseEvent");
      }
      function b(e) {
        return !(!e || !e._tippy || e._tippy.reference !== e);
      }
      function w(e) {
        return v(e)
          ? [e]
          : (function (e) {
              return c(e, "NodeList");
            })(e)
          ? m(e)
          : Array.isArray(e)
          ? e
          : m(document.querySelectorAll(e));
      }
      function x(e, t) {
        e.forEach(function (e) {
          e && (e.style.transitionDuration = t + "ms");
        });
      }
      function _(e, t) {
        e.forEach(function (e) {
          e && e.setAttribute("data-state", t);
        });
      }
      function O(e) {
        var t,
          n = p(e)[0];
        return (null == n || null == (t = n.ownerDocument) ? void 0 : t.body)
          ? n.ownerDocument
          : document;
      }
      function k(e, t, n) {
        var i = t + "EventListener";
        ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
          e[i](t, n);
        });
      }
      var E = { isTouch: !1 },
        S = 0;
      function T() {
        E.isTouch ||
          ((E.isTouch = !0),
          window.performance && document.addEventListener("mousemove", A));
      }
      function A() {
        var e = performance.now();
        e - S < 20 &&
          ((E.isTouch = !1), document.removeEventListener("mousemove", A)),
          (S = e);
      }
      function C() {
        var e = document.activeElement;
        if (b(e)) {
          var t = e._tippy;
          e.blur && !t.state.isVisible && e.blur();
        }
      }
      var L,
        j =
          "undefined" != typeof window && "undefined" != typeof document
            ? navigator.userAgent
            : "",
        M = /MSIE |Trident\//.test(j);
      function D(e) {
        return [
          e +
            "() was called on a" +
            ("destroy" === e ? "n already-" : " ") +
            "destroyed instance. This is a no-op but",
          "indicates a potential memory leak.",
        ].join(" ");
      }
      function P(e) {
        return e
          .replace(/[ \t]{2,}/g, " ")
          .replace(/^[ \t]*/gm, "")
          .trim();
      }
      function z(e) {
        return P(
          "\n  %ctippy.js\n\n  %c" +
            P(e) +
            "\n\n  %c👷‍ This is a development-only message. It will be removed in production.\n  "
        );
      }
      function R(e) {
        return [
          z(e),
          "color: #00C584; font-size: 1.3em; font-weight: bold;",
          "line-height: 1.5",
          "color: #a6a095;",
        ];
      }
      function I(e, t) {
        var n;
        e && !L.has(t) && (L.add(t), (n = console).warn.apply(n, R(t)));
      }
      function $(e, t) {
        var n;
        e && !L.has(t) && (L.add(t), (n = console).error.apply(n, R(t)));
      }
      L = new Set();
      var W = {
          animateFill: !1,
          followCursor: !1,
          inlinePositioning: !1,
          sticky: !1,
        },
        N = Object.assign(
          {
            appendTo: function () {
              return document.body;
            },
            aria: { content: "auto", expanded: "auto" },
            delay: 0,
            duration: [300, 250],
            getReferenceClientRect: null,
            hideOnClick: !0,
            ignoreAttributes: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [0, 10],
            onAfterUpdate: function () {},
            onBeforeUpdate: function () {},
            onCreate: function () {},
            onDestroy: function () {},
            onHidden: function () {},
            onHide: function () {},
            onMount: function () {},
            onShow: function () {},
            onShown: function () {},
            onTrigger: function () {},
            onUntrigger: function () {},
            onClickOutside: function () {},
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: !1,
            touch: !0,
            trigger: "mouseenter focus",
            triggerTarget: null,
          },
          W,
          {},
          {
            allowHTML: !1,
            animation: "fade",
            arrow: !0,
            content: "",
            inertia: !1,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999,
          }
        ),
        H = Object.keys(N);
      function F(e) {
        var t = (e.plugins || []).reduce(function (t, n) {
          var i = n.name,
            r = n.defaultValue;
          return i && (t[i] = void 0 !== e[i] ? e[i] : r), t;
        }, {});
        return Object.assign({}, e, {}, t);
      }
      function V(e, t) {
        var n = Object.assign(
          {},
          t,
          { content: u(t.content, [e]) },
          t.ignoreAttributes
            ? {}
            : (function (e, t) {
                return (t
                  ? Object.keys(F(Object.assign({}, N, { plugins: t })))
                  : H
                ).reduce(function (t, n) {
                  var i = (e.getAttribute("data-tippy-" + n) || "").trim();
                  if (!i) return t;
                  if ("content" === n) t[n] = i;
                  else
                    try {
                      t[n] = JSON.parse(i);
                    } catch (e) {
                      t[n] = i;
                    }
                  return t;
                }, {});
              })(e, t.plugins)
        );
        return (
          (n.aria = Object.assign({}, N.aria, {}, n.aria)),
          (n.aria = {
            expanded:
              "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
            content:
              "auto" === n.aria.content
                ? t.interactive
                  ? null
                  : "describedby"
                : n.aria.content,
          }),
          n
        );
      }
      function B(e, t) {
        void 0 === e && (e = {}),
          void 0 === t && (t = []),
          Object.keys(e).forEach(function (e) {
            var n,
              i,
              r = f(N, Object.keys(W)),
              o = ((n = r), (i = e), !{}.hasOwnProperty.call(n, i));
            o &&
              (o =
                0 ===
                t.filter(function (t) {
                  return t.name === e;
                }).length),
              I(
                o,
                [
                  "`" + e + "`",
                  "is not a valid prop. You may have spelled it incorrectly, or if it's",
                  "a plugin, forgot to pass it in an array as props.plugins.",
                  "\n\n",
                  "All props: https://atomiks.github.io/tippyjs/v6/all-props/\n",
                  "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/",
                ].join(" ")
              );
          });
      }
      function q(e, t) {
        e.innerHTML = t;
      }
      function G(e) {
        var t = g();
        return (
          !0 === e
            ? (t.className = r)
            : ((t.className = o), v(e) ? t.appendChild(e) : q(t, e)),
          t
        );
      }
      function U(e, t) {
        v(t.content)
          ? (q(e, ""), e.appendChild(t.content))
          : "function" != typeof t.content &&
            (t.allowHTML ? q(e, t.content) : (e.textContent = t.content));
      }
      function Y(e) {
        var t = e.firstElementChild,
          s = m(t.children);
        return {
          box: t,
          content: s.find(function (e) {
            return e.classList.contains(n);
          }),
          arrow: s.find(function (e) {
            return e.classList.contains(r) || e.classList.contains(o);
          }),
          backdrop: s.find(function (e) {
            return e.classList.contains(i);
          }),
        };
      }
      function X(e) {
        var t = g(),
          i = g();
        (i.className = "tippy-box"),
          i.setAttribute("data-state", "hidden"),
          i.setAttribute("tabindex", "-1");
        var r = g();
        function o(n, i) {
          var r = Y(t),
            o = r.box,
            s = r.content,
            a = r.arrow;
          i.theme
            ? o.setAttribute("data-theme", i.theme)
            : o.removeAttribute("data-theme"),
            "string" == typeof i.animation
              ? o.setAttribute("data-animation", i.animation)
              : o.removeAttribute("data-animation"),
            i.inertia
              ? o.setAttribute("data-inertia", "")
              : o.removeAttribute("data-inertia"),
            (o.style.maxWidth =
              "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
            i.role ? o.setAttribute("role", i.role) : o.removeAttribute("role"),
            (n.content === i.content && n.allowHTML === i.allowHTML) ||
              U(s, e.props),
            i.arrow
              ? a
                ? n.arrow !== i.arrow &&
                  (o.removeChild(a), o.appendChild(G(i.arrow)))
                : o.appendChild(G(i.arrow))
              : a && o.removeChild(a);
        }
        return (
          (r.className = n),
          r.setAttribute("data-state", "hidden"),
          U(r, e.props),
          t.appendChild(i),
          i.appendChild(r),
          o(e.props, e.props),
          { popper: t, onUpdate: o }
        );
      }
      X.$$tippy = !0;
      var J = 1,
        K = [],
        Z = [];
      function Q(e, n) {
        var i,
          r,
          o,
          c,
          f,
          v,
          b,
          w,
          S,
          T = V(
            e,
            Object.assign(
              {},
              N,
              {},
              F(
                ((i = n),
                Object.keys(i).reduce(function (e, t) {
                  return void 0 !== i[t] && (e[t] = i[t]), e;
                }, {}))
              )
            )
          ),
          A = !1,
          C = !1,
          L = !1,
          j = !1,
          P = [],
          z = l(xe, T.interactiveDebounce),
          R = J++,
          W = (S = T.plugins).filter(function (e, t) {
            return S.indexOf(e) === t;
          }),
          H = {
            id: R,
            reference: e,
            popper: g(),
            popperInstance: null,
            props: T,
            state: {
              isEnabled: !0,
              isVisible: !1,
              isDestroyed: !1,
              isMounted: !1,
              isShown: !1,
            },
            plugins: W,
            clearDelayTimeouts: function () {
              clearTimeout(r), clearTimeout(o), cancelAnimationFrame(c);
            },
            setProps: function (t) {
              I(H.state.isDestroyed, D("setProps"));
              if (H.state.isDestroyed) return;
              ae("onBeforeUpdate", [H, t]), be();
              var n = H.props,
                i = V(
                  e,
                  Object.assign({}, H.props, {}, t, { ignoreAttributes: !0 })
                );
              (H.props = i),
                ye(),
                n.interactiveDebounce !== i.interactiveDebounce &&
                  (le(), (z = l(xe, i.interactiveDebounce)));
              n.triggerTarget && !i.triggerTarget
                ? p(n.triggerTarget).forEach(function (e) {
                    e.removeAttribute("aria-expanded");
                  })
                : i.triggerTarget && e.removeAttribute("aria-expanded");
              ue(), se(), G && G(n, i);
              H.popperInstance &&
                (Ee(),
                Te().forEach(function (e) {
                  requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
                }));
              ae("onAfterUpdate", [H, t]);
            },
            setContent: function (e) {
              H.setProps({ content: e });
            },
            show: function () {
              I(H.state.isDestroyed, D("show"));
              var e = H.state.isVisible,
                t = H.state.isDestroyed,
                n = !H.state.isEnabled,
                i = E.isTouch && !H.props.touch,
                r = a(H.props.duration, 0, N.duration);
              if (e || t || n || i) return;
              if (ne().hasAttribute("disabled")) return;
              if ((ae("onShow", [H], !1), !1 === H.props.onShow(H))) return;
              (H.state.isVisible = !0),
                te() && (q.style.visibility = "visible");
              se(), he(), H.state.isMounted || (q.style.transition = "none");
              if (te()) {
                var o = re(),
                  s = o.box,
                  c = o.content;
                x([s, c], 0);
              }
              (b = function () {
                var e;
                if (H.state.isVisible && !j) {
                  if (
                    ((j = !0),
                    q.offsetHeight,
                    (q.style.transition = H.props.moveTransition),
                    te() && H.props.animation)
                  ) {
                    var t = re(),
                      n = t.box,
                      i = t.content;
                    x([n, i], r), _([n, i], "visible");
                  }
                  ce(),
                    ue(),
                    d(Z, H),
                    null == (e = H.popperInstance) || e.forceUpdate(),
                    (H.state.isMounted = !0),
                    ae("onMount", [H]),
                    H.props.animation &&
                      te() &&
                      (function (e, t) {
                        ge(e, t);
                      })(r, function () {
                        (H.state.isShown = !0), ae("onShown", [H]);
                      });
                }
              }),
                (function () {
                  var e,
                    t = H.props.appendTo,
                    n = ne();
                  e =
                    (H.props.interactive && t === N.appendTo) || "parent" === t
                      ? n.parentNode
                      : u(t, [n]);
                  e.contains(q) || e.appendChild(q);
                  Ee(),
                    I(
                      H.props.interactive &&
                        t === N.appendTo &&
                        n.nextElementSibling !== q,
                      [
                        "Interactive tippy element may not be accessible via keyboard",
                        "navigation because it is not directly after the reference element",
                        "in the DOM source order.",
                        "\n\n",
                        "Using a wrapper <div> or <span> tag around the reference element",
                        "solves this by creating a new parentNode context.",
                        "\n\n",
                        "Specifying `appendTo: document.body` silences this warning, but it",
                        "assumes you are using a focus management solution to handle",
                        "keyboard navigation.",
                        "\n\n",
                        "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity",
                      ].join(" ")
                    );
                })();
            },
            hide: function () {
              I(H.state.isDestroyed, D("hide"));
              var e = !H.state.isVisible,
                t = H.state.isDestroyed,
                n = !H.state.isEnabled,
                i = a(H.props.duration, 1, N.duration);
              if (e || t || n) return;
              if ((ae("onHide", [H], !1), !1 === H.props.onHide(H))) return;
              (H.state.isVisible = !1),
                (H.state.isShown = !1),
                (j = !1),
                (A = !1),
                te() && (q.style.visibility = "hidden");
              if ((le(), me(), se(), te())) {
                var r = re(),
                  o = r.box,
                  s = r.content;
                H.props.animation && (x([o, s], i), _([o, s], "hidden"));
              }
              ce(),
                ue(),
                H.props.animation
                  ? te() &&
                    (function (e, t) {
                      ge(e, function () {
                        !H.state.isVisible &&
                          q.parentNode &&
                          q.parentNode.contains(q) &&
                          t();
                      });
                    })(i, H.unmount)
                  : H.unmount();
            },
            hideWithInteractivity: function (e) {
              I(H.state.isDestroyed, D("hideWithInteractivity"));
              ie().addEventListener("mousemove", z), d(K, z), z(e);
            },
            enable: function () {
              H.state.isEnabled = !0;
            },
            disable: function () {
              H.hide(), (H.state.isEnabled = !1);
            },
            unmount: function () {
              I(H.state.isDestroyed, D("unmount"));
              H.state.isVisible && H.hide();
              if (!H.state.isMounted) return;
              Se(),
                Te().forEach(function (e) {
                  e._tippy.unmount();
                }),
                q.parentNode && q.parentNode.removeChild(q);
              (Z = Z.filter(function (e) {
                return e !== H;
              })),
                (H.state.isMounted = !1),
                ae("onHidden", [H]);
            },
            destroy: function () {
              I(H.state.isDestroyed, D("destroy"));
              if (H.state.isDestroyed) return;
              H.clearDelayTimeouts(),
                H.unmount(),
                be(),
                delete e._tippy,
                (H.state.isDestroyed = !0),
                ae("onDestroy", [H]);
            },
          };
        if (!T.render)
          return $(!0, "render() function has not been supplied."), H;
        var B = T.render(H),
          q = B.popper,
          G = B.onUpdate;
        q.setAttribute("data-tippy-root", ""),
          (q.id = "tippy-" + H.id),
          (H.popper = q),
          (e._tippy = H),
          (q._tippy = H);
        var U = W.map(function (e) {
            return e.fn(H);
          }),
          X = e.hasAttribute("aria-expanded");
        return (
          ye(),
          ue(),
          se(),
          ae("onCreate", [H]),
          T.showOnCreate && Ae(),
          q.addEventListener("mouseenter", function () {
            H.props.interactive && H.state.isVisible && H.clearDelayTimeouts();
          }),
          q.addEventListener("mouseleave", function (e) {
            H.props.interactive &&
              H.props.trigger.indexOf("mouseenter") >= 0 &&
              (ie().addEventListener("mousemove", z), z(e));
          }),
          H
        );
        function Q() {
          var e = H.props.touch;
          return Array.isArray(e) ? e : [e, 0];
        }
        function ee() {
          return "hold" === Q()[0];
        }
        function te() {
          var e;
          return !!(null == (e = H.props.render) ? void 0 : e.$$tippy);
        }
        function ne() {
          return w || e;
        }
        function ie() {
          var e = ne().parentNode;
          return e ? O(e) : document;
        }
        function re() {
          return Y(q);
        }
        function oe(e) {
          return (H.state.isMounted && !H.state.isVisible) ||
            E.isTouch ||
            (f && "focus" === f.type)
            ? 0
            : a(H.props.delay, e ? 0 : 1, N.delay);
        }
        function se() {
          (q.style.pointerEvents =
            H.props.interactive && H.state.isVisible ? "" : "none"),
            (q.style.zIndex = "" + H.props.zIndex);
        }
        function ae(e, t, n) {
          var i;
          (void 0 === n && (n = !0),
          U.forEach(function (n) {
            n[e] && n[e].apply(void 0, t);
          }),
          n) && (i = H.props)[e].apply(i, t);
        }
        function ce() {
          var t = H.props.aria;
          if (t.content) {
            var n = "aria-" + t.content,
              i = q.id;
            p(H.props.triggerTarget || e).forEach(function (e) {
              var t = e.getAttribute(n);
              if (H.state.isVisible) e.setAttribute(n, t ? t + " " + i : i);
              else {
                var r = t && t.replace(i, "").trim();
                r ? e.setAttribute(n, r) : e.removeAttribute(n);
              }
            });
          }
        }
        function ue() {
          !X &&
            H.props.aria.expanded &&
            p(H.props.triggerTarget || e).forEach(function (e) {
              H.props.interactive
                ? e.setAttribute(
                    "aria-expanded",
                    H.state.isVisible && e === ne() ? "true" : "false"
                  )
                : e.removeAttribute("aria-expanded");
            });
        }
        function le() {
          ie().removeEventListener("mousemove", z),
            (K = K.filter(function (e) {
              return e !== z;
            }));
        }
        function fe(e) {
          if (
            !(
              (E.isTouch && (L || "mousedown" === e.type)) ||
              (H.props.interactive && q.contains(e.target))
            )
          ) {
            if (ne().contains(e.target)) {
              if (E.isTouch) return;
              if (H.state.isVisible && H.props.trigger.indexOf("click") >= 0)
                return;
            } else ae("onClickOutside", [H, e]);
            !0 === H.props.hideOnClick &&
              (H.clearDelayTimeouts(),
              H.hide(),
              (C = !0),
              setTimeout(function () {
                C = !1;
              }),
              H.state.isMounted || me());
          }
        }
        function pe() {
          L = !0;
        }
        function de() {
          L = !1;
        }
        function he() {
          var e = ie();
          e.addEventListener("mousedown", fe, !0),
            e.addEventListener("touchend", fe, s),
            e.addEventListener("touchstart", de, s),
            e.addEventListener("touchmove", pe, s);
        }
        function me() {
          var e = ie();
          e.removeEventListener("mousedown", fe, !0),
            e.removeEventListener("touchend", fe, s),
            e.removeEventListener("touchstart", de, s),
            e.removeEventListener("touchmove", pe, s);
        }
        function ge(e, t) {
          var n = re().box;
          function i(e) {
            e.target === n && (k(n, "remove", i), t());
          }
          if (0 === e) return t();
          k(n, "remove", v), k(n, "add", i), (v = i);
        }
        function ve(t, n, i) {
          void 0 === i && (i = !1),
            p(H.props.triggerTarget || e).forEach(function (e) {
              e.addEventListener(t, n, i),
                P.push({ node: e, eventType: t, handler: n, options: i });
            });
        }
        function ye() {
          var e;
          ee() &&
            (ve("touchstart", we, { passive: !0 }),
            ve("touchend", _e, { passive: !0 })),
            ((e = H.props.trigger), e.split(/\s+/).filter(Boolean)).forEach(
              function (e) {
                if ("manual" !== e)
                  switch ((ve(e, we), e)) {
                    case "mouseenter":
                      ve("mouseleave", _e);
                      break;
                    case "focus":
                      ve(M ? "focusout" : "blur", Oe);
                      break;
                    case "focusin":
                      ve("focusout", Oe);
                  }
              }
            );
        }
        function be() {
          P.forEach(function (e) {
            var t = e.node,
              n = e.eventType,
              i = e.handler,
              r = e.options;
            t.removeEventListener(n, i, r);
          }),
            (P = []);
        }
        function we(e) {
          var t,
            n = !1;
          if (H.state.isEnabled && !ke(e) && !C) {
            var i = "focus" === (null == (t = f) ? void 0 : t.type);
            (f = e),
              (w = e.currentTarget),
              ue(),
              !H.state.isVisible &&
                y(e) &&
                K.forEach(function (t) {
                  return t(e);
                }),
              "click" === e.type &&
              (H.props.trigger.indexOf("mouseenter") < 0 || A) &&
              !1 !== H.props.hideOnClick &&
              H.state.isVisible
                ? (n = !0)
                : Ae(e),
              "click" === e.type && (A = !n),
              n && !i && Ce(e);
          }
        }
        function xe(e) {
          var t = e.target,
            n = ne().contains(t) || q.contains(t);
          ("mousemove" === e.type && n) ||
            ((function (e, t) {
              var n = t.clientX,
                i = t.clientY;
              return e.every(function (e) {
                var t = e.popperRect,
                  r = e.popperState,
                  o = e.props.interactiveBorder,
                  s = h(r.placement),
                  a = r.modifiersData.offset;
                if (!a) return !0;
                var c = "bottom" === s ? a.top.y : 0,
                  u = "top" === s ? a.bottom.y : 0,
                  l = "right" === s ? a.left.x : 0,
                  f = "left" === s ? a.right.x : 0,
                  p = t.top - i + c > o,
                  d = i - t.bottom - u > o,
                  m = t.left - n + l > o,
                  g = n - t.right - f > o;
                return p || d || m || g;
              });
            })(
              Te()
                .concat(q)
                .map(function (e) {
                  var t,
                    n =
                      null == (t = e._tippy.popperInstance) ? void 0 : t.state;
                  return n
                    ? {
                        popperRect: e.getBoundingClientRect(),
                        popperState: n,
                        props: T,
                      }
                    : null;
                })
                .filter(Boolean),
              e
            ) &&
              (le(), Ce(e)));
        }
        function _e(e) {
          ke(e) ||
            (H.props.trigger.indexOf("click") >= 0 && A) ||
            (H.props.interactive ? H.hideWithInteractivity(e) : Ce(e));
        }
        function Oe(e) {
          (H.props.trigger.indexOf("focusin") < 0 && e.target !== ne()) ||
            (H.props.interactive &&
              e.relatedTarget &&
              q.contains(e.relatedTarget)) ||
            Ce(e);
        }
        function ke(e) {
          return !!E.isTouch && ee() !== e.type.indexOf("touch") >= 0;
        }
        function Ee() {
          Se();
          var n = H.props,
            i = n.popperOptions,
            r = n.placement,
            o = n.offset,
            s = n.getReferenceClientRect,
            a = n.moveTransition,
            c = te() ? Y(q).arrow : null,
            u = s
              ? {
                  getBoundingClientRect: s,
                  contextElement: s.contextElement || ne(),
                }
              : e,
            l = [
              { name: "offset", options: { offset: o } },
              {
                name: "preventOverflow",
                options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
              },
              { name: "flip", options: { padding: 5 } },
              { name: "computeStyles", options: { adaptive: !a } },
              {
                name: "$$tippy",
                enabled: !0,
                phase: "beforeWrite",
                requires: ["computeStyles"],
                fn: function (e) {
                  var t = e.state;
                  if (te()) {
                    var n = re().box;
                    ["placement", "reference-hidden", "escaped"].forEach(
                      function (e) {
                        "placement" === e
                          ? n.setAttribute("data-placement", t.placement)
                          : t.attributes.popper["data-popper-" + e]
                          ? n.setAttribute("data-" + e, "")
                          : n.removeAttribute("data-" + e);
                      }
                    ),
                      (t.attributes.popper = {});
                  }
                },
              },
            ];
          te() &&
            c &&
            l.push({ name: "arrow", options: { element: c, padding: 3 } }),
            l.push.apply(l, (null == i ? void 0 : i.modifiers) || []),
            (H.popperInstance = t.createPopper(
              u,
              q,
              Object.assign({}, i, {
                placement: r,
                onFirstUpdate: b,
                modifiers: l,
              })
            ));
        }
        function Se() {
          H.popperInstance &&
            (H.popperInstance.destroy(), (H.popperInstance = null));
        }
        function Te() {
          return m(q.querySelectorAll("[data-tippy-root]"));
        }
        function Ae(e) {
          H.clearDelayTimeouts(), e && ae("onTrigger", [H, e]), he();
          var t = oe(!0),
            n = Q(),
            i = n[0],
            o = n[1];
          E.isTouch && "hold" === i && o && (t = o),
            t
              ? (r = setTimeout(function () {
                  H.show();
                }, t))
              : H.show();
        }
        function Ce(e) {
          if (
            (H.clearDelayTimeouts(),
            ae("onUntrigger", [H, e]),
            H.state.isVisible)
          ) {
            if (
              !(
                H.props.trigger.indexOf("mouseenter") >= 0 &&
                H.props.trigger.indexOf("click") >= 0 &&
                ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
                A
              )
            ) {
              var t = oe(!1);
              t
                ? (o = setTimeout(function () {
                    H.state.isVisible && H.hide();
                  }, t))
                : (c = requestAnimationFrame(function () {
                    H.hide();
                  }));
            }
          } else me();
        }
      }
      function ee(e, t) {
        void 0 === t && (t = {});
        var n = N.plugins.concat(t.plugins || []);
        !(function (e) {
          var t = !e,
            n =
              "[object Object]" === Object.prototype.toString.call(e) &&
              !e.addEventListener;
          $(
            t,
            [
              "tippy() was passed",
              "`" + String(e) + "`",
              "as its targets (first) argument. Valid types are: String, Element,",
              "Element[], or NodeList.",
            ].join(" ")
          ),
            $(
              n,
              [
                "tippy() was passed a plain object which is not supported as an argument",
                "for virtual positioning. Use props.getReferenceClientRect instead.",
              ].join(" ")
            );
        })(e),
          B(t, n),
          document.addEventListener("touchstart", T, s),
          window.addEventListener("blur", C);
        var i = Object.assign({}, t, { plugins: n }),
          r = w(e),
          o = v(i.content),
          a = r.length > 1;
        I(
          o && a,
          [
            "tippy() was passed an Element as the `content` prop, but more than",
            "one tippy instance was created by this invocation. This means the",
            "content element will only be appended to the last tippy instance.",
            "\n\n",
            "Instead, pass the .innerHTML of the element, or use a function that",
            "returns a cloned version of the element instead.",
            "\n\n",
            "1) content: element.innerHTML\n",
            "2) content: () => element.cloneNode(true)",
          ].join(" ")
        );
        var c = r.reduce(function (e, t) {
          var n = t && Q(t, i);
          return n && e.push(n), e;
        }, []);
        return v(e) ? c[0] : c;
      }
      (ee.defaultProps = N),
        (ee.setDefaultProps = function (e) {
          B(e, []),
            Object.keys(e).forEach(function (t) {
              N[t] = e[t];
            });
        }),
        (ee.currentInput = E);
      var te = Object.assign({}, t.applyStyles, {
          effect: function (e) {
            var t = e.state,
              n = {
                popper: {
                  position: t.options.strategy,
                  left: "0",
                  top: "0",
                  margin: "0",
                },
                arrow: { position: "absolute" },
                reference: {},
              };
            Object.assign(t.elements.popper.style, n.popper),
              (t.styles = n),
              t.elements.arrow &&
                Object.assign(t.elements.arrow.style, n.arrow);
          },
        }),
        ne = { mouseover: "mouseenter", focusin: "focus", click: "click" };
      var ie = {
        name: "animateFill",
        defaultValue: !1,
        fn: function (e) {
          var t;
          if (!(null == (t = e.props.render) ? void 0 : t.$$tippy))
            return (
              $(
                e.props.animateFill,
                "The `animateFill` plugin requires the default render function."
              ),
              {}
            );
          var n = Y(e.popper),
            r = n.box,
            o = n.content,
            s = e.props.animateFill
              ? (function () {
                  var e = g();
                  return (e.className = i), _([e], "hidden"), e;
                })()
              : null;
          return {
            onCreate: function () {
              s &&
                (r.insertBefore(s, r.firstElementChild),
                r.setAttribute("data-animatefill", ""),
                (r.style.overflow = "hidden"),
                e.setProps({ arrow: !1, animation: "shift-away" }));
            },
            onMount: function () {
              if (s) {
                var e = r.style.transitionDuration,
                  t = Number(e.replace("ms", ""));
                (o.style.transitionDelay = Math.round(t / 10) + "ms"),
                  (s.style.transitionDuration = e),
                  _([s], "visible");
              }
            },
            onShow: function () {
              s && (s.style.transitionDuration = "0ms");
            },
            onHide: function () {
              s && _([s], "hidden");
            },
          };
        },
      };
      var re = { clientX: 0, clientY: 0 },
        oe = [];
      function se(e) {
        var t = e.clientX,
          n = e.clientY;
        re = { clientX: t, clientY: n };
      }
      var ae = {
        name: "followCursor",
        defaultValue: !1,
        fn: function (e) {
          var t = e.reference,
            n = O(e.props.triggerTarget || t),
            i = !1,
            r = !1,
            o = !0,
            s = e.props;
          function a() {
            return "initial" === e.props.followCursor && e.state.isVisible;
          }
          function c() {
            n.addEventListener("mousemove", f);
          }
          function u() {
            n.removeEventListener("mousemove", f);
          }
          function l() {
            (i = !0), e.setProps({ getReferenceClientRect: null }), (i = !1);
          }
          function f(n) {
            var i = !n.target || t.contains(n.target),
              r = e.props.followCursor,
              o = n.clientX,
              s = n.clientY,
              a = t.getBoundingClientRect(),
              c = o - a.left,
              u = s - a.top;
            (!i && e.props.interactive) ||
              e.setProps({
                getReferenceClientRect: function () {
                  var e = t.getBoundingClientRect(),
                    n = o,
                    i = s;
                  "initial" === r && ((n = e.left + c), (i = e.top + u));
                  var a = "horizontal" === r ? e.top : i,
                    l = "vertical" === r ? e.right : n,
                    f = "horizontal" === r ? e.bottom : i,
                    p = "vertical" === r ? e.left : n;
                  return {
                    width: l - p,
                    height: f - a,
                    top: a,
                    right: l,
                    bottom: f,
                    left: p,
                  };
                },
              });
          }
          function p() {
            e.props.followCursor &&
              (oe.push({ instance: e, doc: n }),
              (function (e) {
                e.addEventListener("mousemove", se);
              })(n));
          }
          function d() {
            0 ===
              (oe = oe.filter(function (t) {
                return t.instance !== e;
              })).filter(function (e) {
                return e.doc === n;
              }).length &&
              (function (e) {
                e.removeEventListener("mousemove", se);
              })(n);
          }
          return {
            onCreate: p,
            onDestroy: d,
            onBeforeUpdate: function () {
              s = e.props;
            },
            onAfterUpdate: function (t, n) {
              var o = n.followCursor;
              i ||
                (void 0 !== o &&
                  s.followCursor !== o &&
                  (d(),
                  o
                    ? (p(), !e.state.isMounted || r || a() || c())
                    : (u(), l())));
            },
            onMount: function () {
              e.props.followCursor &&
                !r &&
                (o && (f(re), (o = !1)), a() || c());
            },
            onTrigger: function (e, t) {
              y(t) && (re = { clientX: t.clientX, clientY: t.clientY }),
                (r = "focus" === t.type);
            },
            onHidden: function () {
              e.props.followCursor && (l(), u(), (o = !0));
            },
          };
        },
      };
      var ce = {
        name: "inlinePositioning",
        defaultValue: !1,
        fn: function (e) {
          var t,
            n = e.reference;
          var i = -1,
            r = !1,
            o = {
              name: "tippyInlinePositioning",
              enabled: !0,
              phase: "afterWrite",
              fn: function (r) {
                var o = r.state;
                e.props.inlinePositioning &&
                  (t !== o.placement &&
                    e.setProps({
                      getReferenceClientRect: function () {
                        return (function (e, t, n, i) {
                          if (n.length < 2 || null === e) return t;
                          if (
                            2 === n.length &&
                            i >= 0 &&
                            n[0].left > n[1].right
                          )
                            return n[i] || t;
                          switch (e) {
                            case "top":
                            case "bottom":
                              var r = n[0],
                                o = n[n.length - 1],
                                s = "top" === e,
                                a = r.top,
                                c = o.bottom,
                                u = s ? r.left : o.left,
                                l = s ? r.right : o.right;
                              return {
                                top: a,
                                bottom: c,
                                left: u,
                                right: l,
                                width: l - u,
                                height: c - a,
                              };
                            case "left":
                            case "right":
                              var f = Math.min.apply(
                                  Math,
                                  n.map(function (e) {
                                    return e.left;
                                  })
                                ),
                                p = Math.max.apply(
                                  Math,
                                  n.map(function (e) {
                                    return e.right;
                                  })
                                ),
                                d = n.filter(function (t) {
                                  return "left" === e
                                    ? t.left === f
                                    : t.right === p;
                                }),
                                h = d[0].top,
                                m = d[d.length - 1].bottom;
                              return {
                                top: h,
                                bottom: m,
                                left: f,
                                right: p,
                                width: p - f,
                                height: m - h,
                              };
                            default:
                              return t;
                          }
                        })(
                          h(o.placement),
                          n.getBoundingClientRect(),
                          m(n.getClientRects()),
                          i
                        );
                      },
                    }),
                  (t = o.placement));
              },
            };
          function s() {
            var t;
            r ||
              ((t = (function (e, t) {
                var n;
                return {
                  popperOptions: Object.assign({}, e.popperOptions, {
                    modifiers: [].concat(
                      (
                        (null == (n = e.popperOptions)
                          ? void 0
                          : n.modifiers) || []
                      ).filter(function (e) {
                        return e.name !== t.name;
                      }),
                      [t]
                    ),
                  }),
                };
              })(e.props, o)),
              (r = !0),
              e.setProps(t),
              (r = !1));
          }
          return {
            onCreate: s,
            onAfterUpdate: s,
            onTrigger: function (t, n) {
              if (y(n)) {
                var r = m(e.reference.getClientRects()),
                  o = r.find(function (e) {
                    return (
                      e.left - 2 <= n.clientX &&
                      e.right + 2 >= n.clientX &&
                      e.top - 2 <= n.clientY &&
                      e.bottom + 2 >= n.clientY
                    );
                  });
                i = r.indexOf(o);
              }
            },
            onUntrigger: function () {
              i = -1;
            },
          };
        },
      };
      var ue = {
        name: "sticky",
        defaultValue: !1,
        fn: function (e) {
          var t = e.reference,
            n = e.popper;
          function i(t) {
            return !0 === e.props.sticky || e.props.sticky === t;
          }
          var r = null,
            o = null;
          function s() {
            var a = i("reference")
                ? (e.popperInstance
                    ? e.popperInstance.state.elements.reference
                    : t
                  ).getBoundingClientRect()
                : null,
              c = i("popper") ? n.getBoundingClientRect() : null;
            ((a && le(r, a)) || (c && le(o, c))) &&
              e.popperInstance &&
              e.popperInstance.update(),
              (r = a),
              (o = c),
              e.state.isMounted && requestAnimationFrame(s);
          }
          return {
            onMount: function () {
              e.props.sticky && s();
            },
          };
        },
      };
      function le(e, t) {
        return (
          !e ||
          !t ||
          e.top !== t.top ||
          e.right !== t.right ||
          e.bottom !== t.bottom ||
          e.left !== t.left
        );
      }
      ee.setDefaultProps({ render: X }),
        (e.animateFill = ie),
        (e.createSingleton = function (e, t) {
          var n;
          void 0 === t && (t = {}),
            $(
              !Array.isArray(e),
              [
                "The first argument passed to createSingleton() must be an array of",
                "tippy instances. The passed value was",
                String(e),
              ].join(" ")
            );
          var i,
            r = e,
            o = [],
            s = t.overrides,
            a = [],
            c = !1;
          function u() {
            o = r.map(function (e) {
              return e.reference;
            });
          }
          function l(e) {
            r.forEach(function (t) {
              e ? t.enable() : t.disable();
            });
          }
          function p(e) {
            return r.map(function (t) {
              var n = t.setProps;
              return (
                (t.setProps = function (r) {
                  n(r), t.reference === i && e.setProps(r);
                }),
                function () {
                  t.setProps = n;
                }
              );
            });
          }
          function d(e, t) {
            var n = o.indexOf(t);
            if (t !== i) {
              i = t;
              var a = (s || []).concat("content").reduce(function (e, t) {
                return (e[t] = r[n].props[t]), e;
              }, {});
              e.setProps(
                Object.assign({}, a, {
                  getReferenceClientRect:
                    "function" == typeof a.getReferenceClientRect
                      ? a.getReferenceClientRect
                      : function () {
                          return t.getBoundingClientRect();
                        },
                })
              );
            }
          }
          l(!1), u();
          var h = {
              fn: function () {
                return {
                  onDestroy: function () {
                    l(!0);
                  },
                  onHidden: function () {
                    i = null;
                  },
                  onClickOutside: function (e) {
                    e.props.showOnCreate && !c && ((c = !0), (i = null));
                  },
                  onShow: function (e) {
                    e.props.showOnCreate && !c && ((c = !0), d(e, o[0]));
                  },
                  onTrigger: function (e, t) {
                    d(e, t.currentTarget);
                  },
                };
              },
            },
            m = ee(
              g(),
              Object.assign({}, f(t, ["overrides"]), {
                plugins: [h].concat(t.plugins || []),
                triggerTarget: o,
                popperOptions: Object.assign({}, t.popperOptions, {
                  modifiers: [].concat(
                    (null == (n = t.popperOptions) ? void 0 : n.modifiers) ||
                      [],
                    [te]
                  ),
                }),
              })
            ),
            v = m.show;
          (m.show = function (e) {
            if ((v(), !i && null == e)) return d(m, o[0]);
            if (!i || null != e) {
              if ("number" == typeof e) return o[e] && d(m, o[e]);
              if (r.includes(e)) {
                var t = e.reference;
                return d(m, t);
              }
              return o.includes(e) ? d(m, e) : void 0;
            }
          }),
            (m.showNext = function () {
              var e = o[0];
              if (!i) return m.show(0);
              var t = o.indexOf(i);
              m.show(o[t + 1] || e);
            }),
            (m.showPrevious = function () {
              var e = o[o.length - 1];
              if (!i) return m.show(e);
              var t = o.indexOf(i),
                n = o[t - 1] || e;
              m.show(n);
            });
          var y = m.setProps;
          return (
            (m.setProps = function (e) {
              (s = e.overrides || s), y(e);
            }),
            (m.setInstances = function (e) {
              l(!0),
                a.forEach(function (e) {
                  return e();
                }),
                (r = e),
                l(!1),
                u(),
                p(m),
                m.setProps({ triggerTarget: o });
            }),
            (a = p(m)),
            m
          );
        }),
        (e.default = ee),
        (e.delegate = function (e, t) {
          $(
            !(t && t.target),
            [
              "You must specity a `target` prop indicating a CSS selector string matching",
              "the target elements that should receive a tippy.",
            ].join(" ")
          );
          var n = [],
            i = [],
            r = !1,
            o = t.target,
            a = f(t, ["target"]),
            c = Object.assign({}, a, { trigger: "manual", touch: !1 }),
            u = Object.assign({}, a, { showOnCreate: !0 }),
            l = ee(e, c);
          function d(e) {
            if (e.target && !r) {
              var n = e.target.closest(o);
              if (n) {
                var s =
                  n.getAttribute("data-tippy-trigger") ||
                  t.trigger ||
                  N.trigger;
                if (
                  !n._tippy &&
                  !(
                    ("touchstart" === e.type && "boolean" == typeof u.touch) ||
                    ("touchstart" !== e.type && s.indexOf(ne[e.type]) < 0)
                  )
                ) {
                  var a = ee(n, u);
                  a && (i = i.concat(a));
                }
              }
            }
          }
          function h(e, t, i, r) {
            void 0 === r && (r = !1),
              e.addEventListener(t, i, r),
              n.push({ node: e, eventType: t, handler: i, options: r });
          }
          return (
            p(l).forEach(function (e) {
              var t = e.destroy,
                o = e.enable,
                a = e.disable;
              (e.destroy = function (e) {
                void 0 === e && (e = !0),
                  e &&
                    i.forEach(function (e) {
                      e.destroy();
                    }),
                  (i = []),
                  n.forEach(function (e) {
                    var t = e.node,
                      n = e.eventType,
                      i = e.handler,
                      r = e.options;
                    t.removeEventListener(n, i, r);
                  }),
                  (n = []),
                  t();
              }),
                (e.enable = function () {
                  o(),
                    i.forEach(function (e) {
                      return e.enable();
                    }),
                    (r = !1);
                }),
                (e.disable = function () {
                  a(),
                    i.forEach(function (e) {
                      return e.disable();
                    }),
                    (r = !0);
                }),
                (function (e) {
                  var t = e.reference;
                  h(t, "touchstart", d, s),
                    h(t, "mouseover", d),
                    h(t, "focusin", d),
                    h(t, "click", d);
                })(e);
            }),
            l
          );
        }),
        (e.followCursor = ae),
        (e.hideAll = function (e) {
          var t = void 0 === e ? {} : e,
            n = t.exclude,
            i = t.duration;
          Z.forEach(function (e) {
            var t = !1;
            if (
              (n && (t = b(n) ? e.reference === n : e.popper === n.popper), !t)
            ) {
              var r = e.props.duration;
              e.setProps({ duration: i }),
                e.hide(),
                e.state.isDestroyed || e.setProps({ duration: r });
            }
          });
        }),
        (e.inlinePositioning = ce),
        (e.roundArrow =
          '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>'),
        (e.sticky = ue);
    }),
    Vn = Nn(Fn()),
    Bn = Nn(Fn());
  var qn,
    Gn,
    Un = function (e) {
      e.magic("tooltip", (e) => (t, n = {}) => {
        const i = (0, Vn.default)(e, { content: t, trigger: "manual", ...n });
        i.show(),
          setTimeout(() => {
            i.hide(), setTimeout(() => i.destroy(), n.duration || 300);
          }, n.timeout || 2e3);
      }),
        e.directive(
          "tooltip",
          (
            e,
            { modifiers: t, expression: n },
            { evaluateLater: i, effect: r }
          ) => {
            const o =
              t.length > 0
                ? ((e) => {
                    const t = { plugins: [] },
                      n = (t) => e[e.indexOf(t) + 1];
                    if (
                      (e.includes("animation") &&
                        (t.animation = n("animation")),
                      e.includes("duration") &&
                        (t.duration = parseInt(n("duration"))),
                      e.includes("delay"))
                    ) {
                      const e = n("delay");
                      t.delay = e.includes("-")
                        ? e.split("-").map((e) => parseInt(e))
                        : parseInt(e);
                    }
                    if (e.includes("cursor")) {
                      t.plugins.push(Bn.followCursor);
                      const e = n("cursor");
                      ["x", "initial"].includes(e)
                        ? (t.followCursor =
                            "x" === e ? "horizontal" : "initial")
                        : (t.followCursor = !0);
                    }
                    return (
                      e.includes("on") && (t.trigger = n("on")),
                      e.includes("arrowless") && (t.arrow = !1),
                      e.includes("html") && (t.allowHTML = !0),
                      e.includes("interactive") && (t.interactive = !0),
                      e.includes("border") &&
                        t.interactive &&
                        (t.interactiveBorder = parseInt(n("border"))),
                      e.includes("debounce") &&
                        t.interactive &&
                        (t.interactiveDebounce = parseInt(n("debounce"))),
                      e.includes("max-width") &&
                        (t.maxWidth = parseInt(n("max-width"))),
                      e.includes("theme") && (t.theme = n("theme")),
                      e.includes("placement") && (t.placement = n("placement")),
                      t
                    );
                  })(t)
                : {};
            e.__x_tippy || (e.__x_tippy = (0, Vn.default)(e, o));
            const s = () => e.__x_tippy.enable(),
              a = (t) => {
                t ? (s(), e.__x_tippy.setContent(t)) : e.__x_tippy.disable();
              };
            if (t.includes("raw")) a(n);
            else {
              const t = i(n);
              r(() => {
                t((t) => {
                  "object" == typeof t ? (e.__x_tippy.setProps(t), s()) : a(t);
                });
              });
            }
          }
        );
    },
    Yn = {};
  (qn = Yn),
    (Gn = function () {
      "use strict";
      var e = function () {},
        t = "undefined",
        n =
          typeof window !== t &&
          typeof window.navigator !== t &&
          /Trident\/|MSIE /.test(window.navigator.userAgent),
        i = ["trace", "debug", "info", "warn", "error"];
      function r(e, t) {
        var n = e[t];
        if ("function" == typeof n.bind) return n.bind(e);
        try {
          return Function.prototype.bind.call(n, e);
        } catch (t) {
          return function () {
            return Function.prototype.apply.apply(n, [e, arguments]);
          };
        }
      }
      function o() {
        console.log &&
          (console.log.apply
            ? console.log.apply(console, arguments)
            : Function.prototype.apply.apply(console.log, [
                console,
                arguments,
              ])),
          console.trace && console.trace();
      }
      function s(i) {
        return (
          "debug" === i && (i = "log"),
          typeof console !== t &&
            ("trace" === i && n
              ? o
              : void 0 !== console[i]
              ? r(console, i)
              : void 0 !== console.log
              ? r(console, "log")
              : e)
        );
      }
      function a(t, n) {
        for (var r = 0; r < i.length; r++) {
          var o = i[r];
          this[o] = r < t ? e : this.methodFactory(o, t, n);
        }
        this.log = this.debug;
      }
      function c(e, n, i) {
        return function () {
          typeof console !== t &&
            (a.call(this, n, i), this[e].apply(this, arguments));
        };
      }
      function u(e, t, n) {
        return s(e) || c.apply(this, arguments);
      }
      function l(e, n, r) {
        var o,
          s = this;
        n = null == n ? "WARN" : n;
        var c = "loglevel";
        function l() {
          var e;
          if (typeof window !== t && c) {
            try {
              e = window.localStorage[c];
            } catch (e) {}
            if (typeof e === t)
              try {
                var n = window.document.cookie,
                  i = n.indexOf(encodeURIComponent(c) + "=");
                -1 !== i && (e = /^([^;]+)/.exec(n.slice(i))[1]);
              } catch (e) {}
            return void 0 === s.levels[e] && (e = void 0), e;
          }
        }
        "string" == typeof e
          ? (c += ":" + e)
          : "symbol" == typeof e && (c = void 0),
          (s.name = e),
          (s.levels = {
            TRACE: 0,
            DEBUG: 1,
            INFO: 2,
            WARN: 3,
            ERROR: 4,
            SILENT: 5,
          }),
          (s.methodFactory = r || u),
          (s.getLevel = function () {
            return o;
          }),
          (s.setLevel = function (n, r) {
            if (
              ("string" == typeof n &&
                void 0 !== s.levels[n.toUpperCase()] &&
                (n = s.levels[n.toUpperCase()]),
              !("number" == typeof n && n >= 0 && n <= s.levels.SILENT))
            )
              throw "log.setLevel() called with invalid level: " + n;
            if (
              ((o = n),
              !1 !== r &&
                (function (e) {
                  var n = (i[e] || "silent").toUpperCase();
                  if (typeof window !== t && c) {
                    try {
                      return void (window.localStorage[c] = n);
                    } catch (e) {}
                    try {
                      window.document.cookie =
                        encodeURIComponent(c) + "=" + n + ";";
                    } catch (e) {}
                  }
                })(n),
              a.call(s, n, e),
              typeof console === t && n < s.levels.SILENT)
            )
              return "No console available for logging";
          }),
          (s.setDefaultLevel = function (e) {
            (n = e), l() || s.setLevel(e, !1);
          }),
          (s.resetLevel = function () {
            s.setLevel(n, !1),
              (function () {
                if (typeof window !== t && c) {
                  try {
                    return void window.localStorage.removeItem(c);
                  } catch (e) {}
                  try {
                    window.document.cookie =
                      encodeURIComponent(c) +
                      "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                  } catch (e) {}
                }
              })();
          }),
          (s.enableAll = function (e) {
            s.setLevel(s.levels.TRACE, e);
          }),
          (s.disableAll = function (e) {
            s.setLevel(s.levels.SILENT, e);
          });
        var f = l();
        null == f && (f = n), s.setLevel(f, !1);
      }
      var f = new l(),
        p = {};
      f.getLogger = function (e) {
        if (("symbol" != typeof e && "string" != typeof e) || "" === e)
          throw new TypeError("You must supply a name when creating a logger.");
        var t = p[e];
        return t || (t = p[e] = new l(e, f.getLevel(), f.methodFactory)), t;
      };
      var d = typeof window !== t ? window.log : void 0;
      return (
        (f.noConflict = function () {
          return typeof window !== t && window.log === f && (window.log = d), f;
        }),
        (f.getLoggers = function () {
          return p;
        }),
        (f.default = f),
        f
      );
    }),
    "function" == typeof define && define.amd
      ? define(Gn)
      : Yn
      ? (Yn = Gn())
      : (qn.log = Gn());
  var Xn = {};
  !(function (e, t) {
    "function" == typeof define && define.amd
      ? define(t)
      : Xn
      ? (Xn = t())
      : (e.prefix = t(e));
  })(Xn, function (e) {
    "use strict";
    var t,
      n,
      i = {
        template: "[%t] %l:",
        levelFormatter: function (e) {
          return e.toUpperCase();
        },
        nameFormatter: function (e) {
          return e || "root";
        },
        timestampFormatter: function (e) {
          return e.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        },
        format: void 0,
      },
      r = {},
      o = {
        reg: function (e) {
          if (!e || !e.getLogger)
            throw new TypeError("Argument is not a root logger");
          t = e;
        },
        apply: function (e, n) {
          if (!e || !e.setLevel)
            throw new TypeError("Argument is not a logger");
          var o = e.methodFactory,
            s = e.name || "",
            a = r[s] || r[""] || i;
          return (
            r[s] ||
              (e.methodFactory = function (e, t, n) {
                var i = o(e, t, n),
                  a = r[n] || r[""],
                  c = -1 !== a.template.indexOf("%t"),
                  u = -1 !== a.template.indexOf("%l"),
                  l = -1 !== a.template.indexOf("%n");
                return function () {
                  for (
                    var t = "", o = arguments.length, f = Array(o), p = 0;
                    p < o;
                    p++
                  )
                    f[p] = arguments[p];
                  if (s || !r[n]) {
                    var d = a.timestampFormatter(new Date()),
                      h = a.levelFormatter(e),
                      m = a.nameFormatter(n);
                    a.format
                      ? (t += a.format(h, m, d))
                      : ((t += a.template),
                        c && (t = t.replace(/%t/, d)),
                        u && (t = t.replace(/%l/, h)),
                        l && (t = t.replace(/%n/, m))),
                      f.length && "string" == typeof f[0]
                        ? (f[0] = t + " " + f[0])
                        : f.unshift(t);
                  }
                  i.apply(void 0, f);
                };
              }),
            (n = n || {}).template && (n.format = void 0),
            (r[s] = (function (e) {
              for (var t, n = 1, i = arguments.length; n < i; n++)
                for (t in arguments[n])
                  Object.prototype.hasOwnProperty.call(arguments[n], t) &&
                    (e[t] = arguments[n][t]);
              return e;
            })({}, a, n)),
            e.setLevel(e.getLevel()),
            t ||
              e.warn(
                "It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"
              ),
            e
          );
        },
      };
    return (
      e &&
        ((n = e.prefix),
        (o.noConflict = function () {
          return e.prefix === o && (e.prefix = n), o;
        })),
      o
    );
  }),
    e(Xn).reg(e(Yn)),
    e(Xn).apply(e(Yn), { format: (e) => `${`[${e}]`.padStart(7)} Lookbook:` });
  let Jn = 3;
  void 0 !== window.LOG_LEVEL && (Jn = window.LOG_LEVEL), e(Yn).setLevel(Jn);
  var Kn = {
    desktopWidth: 768,
    sidebar: { defaultWidth: 280, minWidth: 200, minSectionHeight: 200 },
    main: { minWidth: 200 },
    inspector: {
      drawer: {
        defaultHeight: 300,
        defaultWidth: 500,
        minWidth: 350,
        minHeight: 200,
      },
      preview: { minHeight: 200, minWidth: 200 },
    },
  };
  const { sidebar: Zn, main: Qn, inspector: ei } = Kn;
  var ti;
  ti = JSON.parse(
    '{"name":"lookbook","version":"0.8.2","description":"A native development UI for ViewComponent","targets":{"app":{"source":["./app/assets/lookbook/js/embed.js","./app/assets/lookbook/js/lookbook.js","./app/assets/lookbook/css/lookbook.css"],"distDir":"./public/lookbook-assets"}},"scripts":{"dev":"parcel watch","build":"parcel build --no-cache","clean":"rm -rf .parcel-cache","lint:fix":"standardrb --fix && prettier --write .","release":"release-it","release:dry-run":"release-it --dry-run"},"author":"Mark Perkins","license":"MIT","dependencies":{"@alpinejs/collapse":"^3.10.2","@alpinejs/morph":"^3.10.2","@alpinejs/persist":"^3.10.2","@parcel/resolver-glob":"^2.4.0","@rails/actioncable":"^6.1.4","@ryangjchandler/alpine-tooltip":"^1.2.0","@tailwindcss/forms":"^0.4.0","@tailwindcss/typography":"^0.5.0","alpinejs":"^3.10.2","autoprefixer":"^10.4.0","debounce":"^1.2.1","iframe-resizer":"^4.3.2","loglevel":"^1.8.0","loglevel-plugin-prefix":"^0.8.4","parcel":"^2.0.1","postcss":"^8.4.5","postcss-import":"^14.0.2","postcss-import-ext-glob":"^2.0.1","split-grid":"^1.0.11","tailwindcss":"^3.0.6","tippy.js":"^6.3.2"},"devDependencies":{"eslint":"^7.32.0","eslint-config-airbnb-base":"^14.2.1","eslint-config-prettier":"^8.3.0","eslint-plugin-import":"^2.25.2","prettier":"2.3.2","release-it":"^14.11.6"},"release-it":{"git":{"commitMessage":"release v${version}"},"github":{"release":true},"npm":{"publish":false},"hooks":{"before:init":["bundle install","rake test"],"after:bump":"npm run build","after:version:bump":"rake \'lookbook:release:bump_version[${version}]\' && bundle","after:release":"rake \'lookbook:release:build_and_push\'"}}}'
  );
  var ni = {};
  !(function (e) {
    "use strict";
    var t = { logger: self.console, WebSocket: self.WebSocket },
      n = {
        log: function () {
          if (this.enabled) {
            for (var e, n = arguments.length, i = Array(n), r = 0; r < n; r++)
              i[r] = arguments[r];
            i.push(Date.now()),
              (e = t.logger).log.apply(e, ["[ActionCable]"].concat(i));
          }
        },
      },
      i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            },
      r = function (e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      },
      o = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(e, i.key, i);
          }
        }
        return function (t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t;
        };
      })(),
      s = function () {
        return new Date().getTime();
      },
      a = function (e) {
        return (s() - e) / 1e3;
      },
      c = function (e, t, n) {
        return Math.max(t, Math.min(n, e));
      },
      u = (function () {
        function e(t) {
          r(this, e),
            (this.visibilityDidChange = this.visibilityDidChange.bind(this)),
            (this.connection = t),
            (this.reconnectAttempts = 0);
        }
        return (
          (e.prototype.start = function () {
            this.isRunning() ||
              ((this.startedAt = s()),
              delete this.stoppedAt,
              this.startPolling(),
              addEventListener("visibilitychange", this.visibilityDidChange),
              n.log(
                "ConnectionMonitor started. pollInterval = " +
                  this.getPollInterval() +
                  " ms"
              ));
          }),
          (e.prototype.stop = function () {
            this.isRunning() &&
              ((this.stoppedAt = s()),
              this.stopPolling(),
              removeEventListener("visibilitychange", this.visibilityDidChange),
              n.log("ConnectionMonitor stopped"));
          }),
          (e.prototype.isRunning = function () {
            return this.startedAt && !this.stoppedAt;
          }),
          (e.prototype.recordPing = function () {
            this.pingedAt = s();
          }),
          (e.prototype.recordConnect = function () {
            (this.reconnectAttempts = 0),
              this.recordPing(),
              delete this.disconnectedAt,
              n.log("ConnectionMonitor recorded connect");
          }),
          (e.prototype.recordDisconnect = function () {
            (this.disconnectedAt = s()),
              n.log("ConnectionMonitor recorded disconnect");
          }),
          (e.prototype.startPolling = function () {
            this.stopPolling(), this.poll();
          }),
          (e.prototype.stopPolling = function () {
            clearTimeout(this.pollTimeout);
          }),
          (e.prototype.poll = function () {
            var e = this;
            this.pollTimeout = setTimeout(function () {
              e.reconnectIfStale(), e.poll();
            }, this.getPollInterval());
          }),
          (e.prototype.getPollInterval = function () {
            var e = this.constructor.pollInterval,
              t = e.min,
              n = e.max,
              i = e.multiplier * Math.log(this.reconnectAttempts + 1);
            return Math.round(1e3 * c(i, t, n));
          }),
          (e.prototype.reconnectIfStale = function () {
            this.connectionIsStale() &&
              (n.log(
                "ConnectionMonitor detected stale connection. reconnectAttempts = " +
                  this.reconnectAttempts +
                  ", pollInterval = " +
                  this.getPollInterval() +
                  " ms, time disconnected = " +
                  a(this.disconnectedAt) +
                  " s, stale threshold = " +
                  this.constructor.staleThreshold +
                  " s"
              ),
              this.reconnectAttempts++,
              this.disconnectedRecently()
                ? n.log(
                    "ConnectionMonitor skipping reopening recent disconnect"
                  )
                : (n.log("ConnectionMonitor reopening"),
                  this.connection.reopen()));
          }),
          (e.prototype.connectionIsStale = function () {
            return (
              a(this.pingedAt ? this.pingedAt : this.startedAt) >
              this.constructor.staleThreshold
            );
          }),
          (e.prototype.disconnectedRecently = function () {
            return (
              this.disconnectedAt &&
              a(this.disconnectedAt) < this.constructor.staleThreshold
            );
          }),
          (e.prototype.visibilityDidChange = function () {
            var e = this;
            "visible" === document.visibilityState &&
              setTimeout(function () {
                (!e.connectionIsStale() && e.connection.isOpen()) ||
                  (n.log(
                    "ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = " +
                      document.visibilityState
                  ),
                  e.connection.reopen());
              }, 200);
          }),
          e
        );
      })();
    (u.pollInterval = { min: 3, max: 30, multiplier: 5 }),
      (u.staleThreshold = 6);
    var l = {
        message_types: {
          welcome: "welcome",
          disconnect: "disconnect",
          ping: "ping",
          confirmation: "confirm_subscription",
          rejection: "reject_subscription",
        },
        disconnect_reasons: {
          unauthorized: "unauthorized",
          invalid_request: "invalid_request",
          server_restart: "server_restart",
        },
        default_mount_path: "/cable",
        protocols: ["actioncable-v1-json", "actioncable-unsupported"],
      },
      f = l.message_types,
      p = l.protocols,
      d = p.slice(0, p.length - 1),
      h = [].indexOf,
      m = (function () {
        function e(t) {
          r(this, e),
            (this.open = this.open.bind(this)),
            (this.consumer = t),
            (this.subscriptions = this.consumer.subscriptions),
            (this.monitor = new u(this)),
            (this.disconnected = !0);
        }
        return (
          (e.prototype.send = function (e) {
            return (
              !!this.isOpen() && (this.webSocket.send(JSON.stringify(e)), !0)
            );
          }),
          (e.prototype.open = function () {
            return this.isActive()
              ? (n.log(
                  "Attempted to open WebSocket, but existing socket is " +
                    this.getState()
                ),
                !1)
              : (n.log(
                  "Opening WebSocket, current state is " +
                    this.getState() +
                    ", subprotocols: " +
                    p
                ),
                this.webSocket && this.uninstallEventHandlers(),
                (this.webSocket = new t.WebSocket(this.consumer.url, p)),
                this.installEventHandlers(),
                this.monitor.start(),
                !0);
          }),
          (e.prototype.close = function () {
            if (
              ((arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : { allowReconnect: !0 }
              ).allowReconnect || this.monitor.stop(),
              this.isActive())
            )
              return this.webSocket.close();
          }),
          (e.prototype.reopen = function () {
            if (
              (n.log(
                "Reopening WebSocket, current state is " + this.getState()
              ),
              !this.isActive())
            )
              return this.open();
            try {
<<<<<<< HEAD
              return this.close();
            } catch (e) {
              n.log("Failed to reopen WebSocket", e);
            } finally {
              n.log(
                "Reopening WebSocket in " + this.constructor.reopenDelay + "ms"
              ),
=======
                const { fragment , title  } = await _request.fetchHTML(window.location, `#${this.$root.id}`);
                _dom.morph(this.$root, fragment);
                document.title = title;
                this.$dispatch("dom:update-complete");
                this.debug("DOM update complete");
            } catch (err) {
                this.error(err);
                window.location.reload();
            }
        },
        validateStorage () {
            if (this.version && this.version.split(".")[0] !== _packageJsonDefault.default.version.split(".")[0]) {
                localStorage.clear();
                this.warn(`
          The data in localStorage is incomaptible with this version of Lookbook.
          Storage data has been cleared.
        `);
            }
            this.version = _packageJsonDefault.default.version;
        },
        ...Alpine.$log
    };
}
exports.default = app;
function isExternalLink(link) {
    if (link.getAttribute("target") === "_blank") return true;
    if (link.href) return link.host !== window.location.host;
    return false;
}

},{"~/package.json":"dIKiH","./lib/socket":"8T56f","./helpers/dom":"3rv1J","./helpers/request":"12Op4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dIKiH":[function(require,module,exports) {
module.exports = JSON.parse("{\"name\":\"lookbook\",\"version\":\"0.8.1\",\"description\":\"A native development UI for ViewComponent\",\"targets\":{\"app\":{\"source\":[\"./app/assets/lookbook/js/embed.js\",\"./app/assets/lookbook/js/lookbook.js\",\"./app/assets/lookbook/css/lookbook.css\"],\"distDir\":\"./public/lookbook-assets\"}},\"scripts\":{\"dev\":\"parcel watch\",\"build\":\"parcel build --no-cache\",\"theme:generate\":\"npm run theme:generate:default && npm run theme:generate:blue && npm run theme:generate:zinc\",\"theme:generate:default\":\"bin/generate-theme\",\"theme:generate:blue\":\"bin/generate-theme --name=blue --accent=blue\",\"theme:generate:zinc\":\"bin/generate-theme --name=zinc --accent=zinc\",\"clean\":\"rm -rf .parcel-cache\",\"lint:fix\":\"standardrb --fix && prettier --write .\",\"release\":\"release-it\",\"release:dry-run\":\"release-it --dry-run\"},\"author\":\"Mark Perkins\",\"license\":\"MIT\",\"dependencies\":{\"@alpinejs/collapse\":\"^3.10.2\",\"@alpinejs/morph\":\"^3.10.2\",\"@alpinejs/persist\":\"^3.10.2\",\"@parcel/resolver-glob\":\"^2.4.0\",\"@rails/actioncable\":\"^6.1.4\",\"@ryangjchandler/alpine-tooltip\":\"^1.2.0\",\"@tailwindcss/forms\":\"^0.4.0\",\"@tailwindcss/typography\":\"^0.5.0\",\"alpinejs\":\"^3.10.2\",\"autoprefixer\":\"^10.4.0\",\"command-line-args\":\"^5.2.1\",\"debounce\":\"^1.2.1\",\"iframe-resizer\":\"^4.3.2\",\"loglevel\":\"^1.8.0\",\"loglevel-plugin-prefix\":\"^0.8.4\",\"parcel\":\"^2.0.1\",\"postcss\":\"^8.4.5\",\"postcss-import\":\"^14.0.2\",\"postcss-import-ext-glob\":\"^2.0.1\",\"split-grid\":\"^1.0.11\",\"tailwindcss\":\"^3.0.6\",\"tippy.js\":\"^6.3.2\"},\"devDependencies\":{\"eslint\":\"^7.32.0\",\"eslint-config-airbnb-base\":\"^14.2.1\",\"eslint-config-prettier\":\"^8.3.0\",\"eslint-plugin-import\":\"^2.25.2\",\"prettier\":\"2.3.2\",\"release-it\":\"^14.11.6\"},\"release-it\":{\"git\":{\"commitMessage\":\"release v${version}\"},\"github\":{\"release\":true},\"npm\":{\"publish\":false},\"hooks\":{\"before:init\":[\"bundle install\",\"rake test\"],\"after:bump\":\"npm run build\",\"after:version:bump\":\"rake 'lookbook:release:bump_version[${version}]' && bundle\",\"after:release\":\"rake 'lookbook:release:build_and_push'\"}}}");

},{}],"8T56f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _actioncable = require("@rails/actioncable");
var _debounce = require("debounce");
var _debounceDefault = parcelHelpers.interopDefault(_debounce);
var _logger = require("../plugins/logger");
function socket(endpoint) {
    const uid = (Date.now() + (Math.random() * 100 | 0)).toString();
    const consumer = _actioncable.createConsumer(`${endpoint}?uid=${uid}`);
    return {
        addListener (channel, callback) {
            consumer.subscriptions.create(channel, {
                received: _debounceDefault.default((data)=>{
                    _logger.log.debug("Lookbook files changed");
                    callback(data);
                }, 200),
                connected () {
                    _logger.log.info("Lookbook websocket connected");
                },
                disconnected () {
                    _logger.log.info("Lookbook websocket disconnected");
                }
            });
        }
    };
}
exports.default = socket;

},{"@rails/actioncable":"01WFa","debounce":"6mekx","../plugins/logger":"a8yvv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"01WFa":[function(require,module,exports) {
(function(global, factory) {
    factory(exports);
})(this, function(exports) {
    "use strict";
    var adapters = {
        logger: self.console,
        WebSocket: self.WebSocket
    };
    var logger = {
        log: function log() {
            if (this.enabled) {
                var _adapters$logger;
                for(var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++)messages[_key] = arguments[_key];
                messages.push(Date.now());
                (_adapters$logger = adapters.logger).log.apply(_adapters$logger, [
                    "[ActionCable]"
                ].concat(messages));
            }
        }
    };
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    };
    var createClass = function() {
        function defineProperties(target, props) {
            for(var i = 0; i < props.length; i++){
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    var now = function now() {
        return new Date().getTime();
    };
    var secondsSince = function secondsSince(time) {
        return (now() - time) / 1e3;
    };
    var clamp = function clamp(number, min, max) {
        return Math.max(min, Math.min(max, number));
    };
    var ConnectionMonitor1 = function() {
        function ConnectionMonitor(connection) {
            classCallCheck(this, ConnectionMonitor);
            this.visibilityDidChange = this.visibilityDidChange.bind(this);
            this.connection = connection;
            this.reconnectAttempts = 0;
        }
        ConnectionMonitor.prototype.start = function start() {
            if (!this.isRunning()) {
                this.startedAt = now();
                delete this.stoppedAt;
                this.startPolling();
                addEventListener("visibilitychange", this.visibilityDidChange);
                logger.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms");
            }
        };
        ConnectionMonitor.prototype.stop = function stop() {
            if (this.isRunning()) {
                this.stoppedAt = now();
                this.stopPolling();
                removeEventListener("visibilitychange", this.visibilityDidChange);
                logger.log("ConnectionMonitor stopped");
            }
        };
        ConnectionMonitor.prototype.isRunning = function isRunning() {
            return this.startedAt && !this.stoppedAt;
        };
        ConnectionMonitor.prototype.recordPing = function recordPing() {
            this.pingedAt = now();
        };
        ConnectionMonitor.prototype.recordConnect = function recordConnect() {
            this.reconnectAttempts = 0;
            this.recordPing();
            delete this.disconnectedAt;
            logger.log("ConnectionMonitor recorded connect");
        };
        ConnectionMonitor.prototype.recordDisconnect = function recordDisconnect() {
            this.disconnectedAt = now();
            logger.log("ConnectionMonitor recorded disconnect");
        };
        ConnectionMonitor.prototype.startPolling = function startPolling() {
            this.stopPolling();
            this.poll();
        };
        ConnectionMonitor.prototype.stopPolling = function stopPolling() {
            clearTimeout(this.pollTimeout);
        };
        ConnectionMonitor.prototype.poll = function poll() {
            var _this = this;
            this.pollTimeout = setTimeout(function() {
                _this.reconnectIfStale();
                _this.poll();
            }, this.getPollInterval());
        };
        ConnectionMonitor.prototype.getPollInterval = function getPollInterval() {
            var _constructor$pollInte = this.constructor.pollInterval, min = _constructor$pollInte.min, max = _constructor$pollInte.max, multiplier = _constructor$pollInte.multiplier;
            var interval = multiplier * Math.log(this.reconnectAttempts + 1);
            return Math.round(clamp(interval, min, max) * 1e3);
        };
        ConnectionMonitor.prototype.reconnectIfStale = function reconnectIfStale() {
            if (this.connectionIsStale()) {
                logger.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + secondsSince(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
                this.reconnectAttempts++;
                if (this.disconnectedRecently()) logger.log("ConnectionMonitor skipping reopening recent disconnect");
                else {
                    logger.log("ConnectionMonitor reopening");
                    this.connection.reopen();
                }
            }
        };
        ConnectionMonitor.prototype.connectionIsStale = function connectionIsStale() {
            return secondsSince(this.pingedAt ? this.pingedAt : this.startedAt) > this.constructor.staleThreshold;
        };
        ConnectionMonitor.prototype.disconnectedRecently = function disconnectedRecently() {
            return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };
        ConnectionMonitor.prototype.visibilityDidChange = function visibilityDidChange() {
            var _this2 = this;
            if (document.visibilityState === "visible") setTimeout(function() {
                if (_this2.connectionIsStale() || !_this2.connection.isOpen()) {
                    logger.log("ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = " + document.visibilityState);
                    _this2.connection.reopen();
                }
            }, 200);
        };
        return ConnectionMonitor;
    }();
    ConnectionMonitor1.pollInterval = {
        min: 3,
        max: 30,
        multiplier: 5
    };
    ConnectionMonitor1.staleThreshold = 6;
    var INTERNAL = {
        message_types: {
            welcome: "welcome",
            disconnect: "disconnect",
            ping: "ping",
            confirmation: "confirm_subscription",
            rejection: "reject_subscription"
        },
        disconnect_reasons: {
            unauthorized: "unauthorized",
            invalid_request: "invalid_request",
            server_restart: "server_restart"
        },
        default_mount_path: "/cable",
        protocols: [
            "actioncable-v1-json",
            "actioncable-unsupported"
        ]
    };
    var message_types = INTERNAL.message_types, protocols = INTERNAL.protocols;
    var supportedProtocols = protocols.slice(0, protocols.length - 1);
    var indexOf = [].indexOf;
    var Connection1 = function() {
        function Connection(consumer) {
            classCallCheck(this, Connection);
            this.open = this.open.bind(this);
            this.consumer = consumer;
            this.subscriptions = this.consumer.subscriptions;
            this.monitor = new ConnectionMonitor1(this);
            this.disconnected = true;
        }
        Connection.prototype.send = function send(data) {
            if (this.isOpen()) {
                this.webSocket.send(JSON.stringify(data));
                return true;
            } else return false;
        };
        Connection.prototype.open = function open() {
            if (this.isActive()) {
                logger.log("Attempted to open WebSocket, but existing socket is " + this.getState());
                return false;
            } else {
                logger.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + protocols);
                if (this.webSocket) this.uninstallEventHandlers();
                this.webSocket = new adapters.WebSocket(this.consumer.url, protocols);
                this.installEventHandlers();
                this.monitor.start();
                return true;
            }
        };
        Connection.prototype.close = function close() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
                allowReconnect: true
            }, allowReconnect = _ref.allowReconnect;
            if (!allowReconnect) this.monitor.stop();
            if (this.isActive()) return this.webSocket.close();
        };
        Connection.prototype.reopen = function reopen() {
            logger.log("Reopening WebSocket, current state is " + this.getState());
            if (this.isActive()) try {
                return this.close();
            } catch (error) {
                logger.log("Failed to reopen WebSocket", error);
            } finally{
                logger.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
>>>>>>> 8a8eeb1 (Automate basic theme generation)
                setTimeout(this.open, this.constructor.reopenDelay);
            }
          }),
          (e.prototype.getProtocol = function () {
            if (this.webSocket) return this.webSocket.protocol;
          }),
          (e.prototype.isOpen = function () {
            return this.isState("open");
          }),
          (e.prototype.isActive = function () {
            return this.isState("open", "connecting");
          }),
          (e.prototype.isProtocolSupported = function () {
            return h.call(d, this.getProtocol()) >= 0;
          }),
          (e.prototype.isState = function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            return h.call(t, this.getState()) >= 0;
          }),
          (e.prototype.getState = function () {
            if (this.webSocket)
              for (var e in t.WebSocket)
                if (t.WebSocket[e] === this.webSocket.readyState)
                  return e.toLowerCase();
            return null;
          }),
          (e.prototype.installEventHandlers = function () {
            for (var e in this.events) {
              var t = this.events[e].bind(this);
              this.webSocket["on" + e] = t;
            }
          }),
          (e.prototype.uninstallEventHandlers = function () {
            for (var e in this.events)
              this.webSocket["on" + e] = function () {};
          }),
          e
        );
      })();
    (m.reopenDelay = 500),
      (m.prototype.events = {
        message: function (e) {
          if (this.isProtocolSupported()) {
            var t = JSON.parse(e.data),
              i = t.identifier,
              r = t.message,
              o = t.reason,
              s = t.reconnect;
            switch (t.type) {
              case f.welcome:
                return (
                  this.monitor.recordConnect(), this.subscriptions.reload()
                );
              case f.disconnect:
                return (
                  n.log("Disconnecting. Reason: " + o),
                  this.close({ allowReconnect: s })
                );
              case f.ping:
                return this.monitor.recordPing();
              case f.confirmation:
                return (
                  this.subscriptions.confirmSubscription(i),
                  this.subscriptions.notify(i, "connected")
                );
              case f.rejection:
                return this.subscriptions.reject(i);
              default:
                return this.subscriptions.notify(i, "received", r);
            }
          }
        },
        open: function () {
          if (
            (n.log(
              "WebSocket onopen event, using '" +
                this.getProtocol() +
                "' subprotocol"
            ),
            (this.disconnected = !1),
            !this.isProtocolSupported())
          )
            return (
              n.log(
                "Protocol is unsupported. Stopping monitor and disconnecting."
              ),
              this.close({ allowReconnect: !1 })
            );
        },
        close: function (e) {
          if ((n.log("WebSocket onclose event"), !this.disconnected))
            return (
              (this.disconnected = !0),
              this.monitor.recordDisconnect(),
              this.subscriptions.notifyAll("disconnected", {
                willAttemptReconnect: this.monitor.isRunning(),
              })
            );
        },
        error: function () {
          n.log("WebSocket onerror event");
        },
      });
    var g = function (e, t) {
        if (null != t)
          for (var n in t) {
            var i = t[n];
            e[n] = i;
          }
        return e;
      },
      v = (function () {
        function e(t) {
          var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            i = arguments[2];
          r(this, e),
            (this.consumer = t),
            (this.identifier = JSON.stringify(n)),
            g(this, i);
        }
        return (
          (e.prototype.perform = function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return (t.action = e), this.send(t);
          }),
          (e.prototype.send = function (e) {
            return this.consumer.send({
              command: "message",
              identifier: this.identifier,
              data: JSON.stringify(e),
            });
          }),
          (e.prototype.unsubscribe = function () {
            return this.consumer.subscriptions.remove(this);
          }),
          e
        );
      })(),
      y = (function () {
        function e(t) {
          r(this, e),
            (this.subscriptions = t),
            (this.pendingSubscriptions = []);
        }
        return (
          (e.prototype.guarantee = function (e) {
            -1 == this.pendingSubscriptions.indexOf(e)
              ? (n.log("SubscriptionGuarantor guaranteeing " + e.identifier),
                this.pendingSubscriptions.push(e))
              : n.log(
                  "SubscriptionGuarantor already guaranteeing " + e.identifier
                ),
              this.startGuaranteeing();
          }),
          (e.prototype.forget = function (e) {
            n.log("SubscriptionGuarantor forgetting " + e.identifier),
              (this.pendingSubscriptions = this.pendingSubscriptions.filter(
                function (t) {
                  return t !== e;
                }
              ));
          }),
          (e.prototype.startGuaranteeing = function () {
            this.stopGuaranteeing(), this.retrySubscribing();
          }),
          (e.prototype.stopGuaranteeing = function () {
            clearTimeout(this.retryTimeout);
          }),
          (e.prototype.retrySubscribing = function () {
            var e = this;
            this.retryTimeout = setTimeout(function () {
              e.subscriptions &&
                "function" == typeof e.subscriptions.subscribe &&
                e.pendingSubscriptions.map(function (t) {
                  n.log("SubscriptionGuarantor resubscribing " + t.identifier),
                    e.subscriptions.subscribe(t);
                });
            }, 500);
          }),
          e
        );
      })(),
      b = (function () {
        function e(t) {
          r(this, e),
            (this.consumer = t),
            (this.guarantor = new y(this)),
            (this.subscriptions = []);
        }
        return (
          (e.prototype.create = function (e, t) {
            var n = e,
              r =
                "object" === (void 0 === n ? "undefined" : i(n))
                  ? n
                  : { channel: n },
              o = new v(this.consumer, r, t);
            return this.add(o);
          }),
          (e.prototype.add = function (e) {
            return (
              this.subscriptions.push(e),
              this.consumer.ensureActiveConnection(),
              this.notify(e, "initialized"),
              this.subscribe(e),
              e
            );
          }),
          (e.prototype.remove = function (e) {
            return (
              this.forget(e),
              this.findAll(e.identifier).length ||
                this.sendCommand(e, "unsubscribe"),
              e
            );
          }),
          (e.prototype.reject = function (e) {
            var t = this;
            return this.findAll(e).map(function (e) {
              return t.forget(e), t.notify(e, "rejected"), e;
            });
          }),
          (e.prototype.forget = function (e) {
            return (
              this.guarantor.forget(e),
              (this.subscriptions = this.subscriptions.filter(function (t) {
                return t !== e;
              })),
              e
            );
          }),
          (e.prototype.findAll = function (e) {
            return this.subscriptions.filter(function (t) {
              return t.identifier === e;
            });
          }),
          (e.prototype.reload = function () {
            var e = this;
            return this.subscriptions.map(function (t) {
              return e.subscribe(t);
            });
          }),
          (e.prototype.notifyAll = function (e) {
            for (
              var t = this,
                n = arguments.length,
                i = Array(n > 1 ? n - 1 : 0),
                r = 1;
              r < n;
              r++
            )
              i[r - 1] = arguments[r];
            return this.subscriptions.map(function (n) {
              return t.notify.apply(t, [n, e].concat(i));
            });
          }),
          (e.prototype.notify = function (e, t) {
            for (
              var n = arguments.length, i = Array(n > 2 ? n - 2 : 0), r = 2;
              r < n;
              r++
            )
              i[r - 2] = arguments[r];
            return ("string" == typeof e ? this.findAll(e) : [e]).map(function (
              e
            ) {
              return "function" == typeof e[t] ? e[t].apply(e, i) : void 0;
            });
          }),
          (e.prototype.subscribe = function (e) {
            this.sendCommand(e, "subscribe") && this.guarantor.guarantee(e);
          }),
          (e.prototype.confirmSubscription = function (e) {
            var t = this;
            n.log("Subscription confirmed " + e),
              this.findAll(e).map(function (e) {
                return t.guarantor.forget(e);
              });
          }),
          (e.prototype.sendCommand = function (e, t) {
            var n = e.identifier;
            return this.consumer.send({ command: t, identifier: n });
          }),
          e
        );
      })(),
      w = (function () {
        function e(t) {
          r(this, e),
            (this._url = t),
            (this.subscriptions = new b(this)),
            (this.connection = new m(this));
        }
        return (
          (e.prototype.send = function (e) {
            return this.connection.send(e);
          }),
          (e.prototype.connect = function () {
            return this.connection.open();
          }),
          (e.prototype.disconnect = function () {
            return this.connection.close({ allowReconnect: !1 });
          }),
          (e.prototype.ensureActiveConnection = function () {
            if (!this.connection.isActive()) return this.connection.open();
          }),
          o(e, [
            {
              key: "url",
              get: function () {
                return x(this._url);
              },
            },
          ]),
          e
        );
      })();
    function x(e) {
      if (("function" == typeof e && (e = e()), e && !/^wss?:/i.test(e))) {
        var t = document.createElement("a");
        return (
          (t.href = e),
          (t.href = t.href),
          (t.protocol = t.protocol.replace("http", "ws")),
          t.href
        );
      }
      return e;
    }
    function _() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : O("url") || l.default_mount_path;
      return new w(e);
    }
    function O(e) {
      var t = document.head.querySelector(
        "meta[name='action-cable-" + e + "']"
      );
      if (t) return t.getAttribute("content");
    }
    (e.Connection = m),
      (e.ConnectionMonitor = u),
      (e.Consumer = w),
      (e.INTERNAL = l),
      (e.Subscription = v),
      (e.Subscriptions = b),
      (e.SubscriptionGuarantor = y),
      (e.adapters = t),
      (e.createWebSocketURL = x),
      (e.logger = n),
      (e.createConsumer = _),
      (e.getConfig = O),
      Object.defineProperty(e, "__esModule", { value: !0 });
  })(ni);
  var ii;
  function ri(e, t, n) {
    var i, r, o, s, a;
    function c() {
      var u = Date.now() - s;
      u < t && u >= 0
        ? (i = setTimeout(c, t - u))
        : ((i = null), n || ((a = e.apply(o, r)), (o = r = null)));
    }
    null == t && (t = 100);
    var u = function () {
      (o = this), (r = arguments), (s = Date.now());
      var u = n && !i;
      return (
        i || (i = setTimeout(c, t)),
        u && ((a = e.apply(o, r)), (o = r = null)),
        a
      );
    };
    return (
      (u.clear = function () {
        i && (clearTimeout(i), (i = null));
      }),
      (u.flush = function () {
        i && ((a = e.apply(o, r)), (o = r = null), clearTimeout(i), (i = null));
      }),
      u
    );
<<<<<<< HEAD
  }
  (ri.debounce = ri), (ii = ri);
  var oi = {},
    si = {};
  function ai(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function ci(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
=======
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"akleQ":[function(require,module,exports) {
const _temp0 = require("../button/component.js");
const _temp1 = require("../code/component.js");
const _temp2 = require("../copy_button/component.js");
const _temp3 = require("../dimensions_display/component.js");
const _temp4 = require("../embed/component.js");
const _temp5 = require("../filter/component.js");
const _temp6 = require("../icon/component.js");
const _temp7 = require("../nav/component.js");
const _temp8 = require("../param_field/component.js");
const _temp9 = require("../split_layout/component.js");
const _temp10 = require("../tabbed_content/component.js");
const _temp11 = require("../tabs/component.js");
const _temp12 = require("../viewport/component.js");
module.exports = {
    "button": _temp0,
    "code": _temp1,
    "copy_button": _temp2,
    "dimensions_display": _temp3,
    "embed": _temp4,
    "filter": _temp5,
    "icon": _temp6,
    "nav": _temp7,
    "param_field": _temp8,
    "split_layout": _temp9,
    "tabbed_content": _temp10,
    "tabs": _temp11,
    "viewport": _temp12
};

},{"../button/component.js":"lQApy","../code/component.js":"2jedY","../copy_button/component.js":"1HiHq","../dimensions_display/component.js":"kFxrd","../embed/component.js":"hM4Uf","../filter/component.js":"c1bw6","../icon/component.js":"2RhL0","../nav/component.js":"bGQJL","../param_field/component.js":"b93Nq","../split_layout/component.js":"dX3DZ","../tabbed_content/component.js":"4BnLZ","../tabs/component.js":"dvr8m","../viewport/component.js":"6kmWp"}],"lQApy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tippy = require("~/app/assets/lookbook/js/lib/tippy");
var _tippyDefault = parcelHelpers.interopDefault(_tippy);
function buttonComponent() {
    return {
        init () {
            this._initTippy();
        },
        startSpin () {
            this._spinning = true;
        },
        stopSpin (delay = 0) {
            setTimeout(()=>this._spinning = false
            , delay);
        },
        _spinning: false,
        _initTippy () {
            if (this.$refs.tooltip) this._labelTippy = _tippyDefault.default(this.$refs.icon, {
                triggerTarget: this.$el,
                content: this.$refs.tooltip.innerHTML
            });
        },
        _labelTippy: null
    };
}
exports.default = buttonComponent;

},{"~/app/assets/lookbook/js/lib/tippy":"6zhil","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6zhil":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tippyJs = require("tippy.js");
var _tippyJsDefault = parcelHelpers.interopDefault(_tippyJs);
_tippyJsDefault.default.setDefaultProps({
    allowHTML: true,
    theme: "lookbook"
});
exports.default = _tippyJsDefault.default;

},{"tippy.js":"ccpCS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ccpCS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "animateFill", ()=>animateFill
);
parcelHelpers.export(exports, "createSingleton", ()=>createSingleton
);
parcelHelpers.export(exports, "delegate", ()=>delegate
);
parcelHelpers.export(exports, "followCursor", ()=>followCursor
);
parcelHelpers.export(exports, "hideAll", ()=>hideAll
);
parcelHelpers.export(exports, "inlinePositioning", ()=>inlinePositioning
);
parcelHelpers.export(exports, "roundArrow", ()=>ROUND_ARROW
);
parcelHelpers.export(exports, "sticky", ()=>sticky
);
/**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/ var _core = require("@popperjs/core");
var ROUND_ARROW = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
    passive: true,
    capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
    return document.body;
};
function hasOwnProperty(obj, key) {
    return ({}).hasOwnProperty.call(obj, key);
}
function getValueAtIndexOrReturn(value, index, defaultValue) {
    if (Array.isArray(value)) {
        var v = value[index];
        return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
    }
    return value;
}
function isType(value, type) {
    var str = ({}).toString.call(value);
    return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
    return typeof value === 'function' ? value.apply(void 0, args) : value;
}
function debounce(fn, ms) {
    // Avoid wrapping in `setTimeout` if ms is 0 anyway
    if (ms === 0) return fn;
    var timeout;
    return function(arg) {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            fn(arg);
        }, ms);
    };
}
function removeProperties(obj, keys) {
    var clone = Object.assign({}, obj);
    keys.forEach(function(key) {
        delete clone[key];
    });
    return clone;
}
function splitBySpaces(value) {
    return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
    return [].concat(value);
}
function pushIfUnique(arr, value) {
    if (arr.indexOf(value) === -1) arr.push(value);
}
function unique(arr) {
    return arr.filter(function(item, index) {
        return arr.indexOf(item) === index;
    });
}
function getBasePlacement(placement) {
    return placement.split('-')[0];
}
function arrayFrom(value) {
    return [].slice.call(value);
}
function removeUndefinedProps(obj) {
    return Object.keys(obj).reduce(function(acc, key) {
        if (obj[key] !== undefined) acc[key] = obj[key];
        return acc;
    }, {});
}
function div() {
    return document.createElement('div');
}
function isElement(value) {
    return [
        'Element',
        'Fragment'
    ].some(function(type) {
        return isType(value, type);
    });
}
function isNodeList(value) {
    return isType(value, 'NodeList');
}
function isMouseEvent(value) {
    return isType(value, 'MouseEvent');
}
function isReferenceElement(value) {
    return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
    if (isElement(value)) return [
        value
    ];
    if (isNodeList(value)) return arrayFrom(value);
    if (Array.isArray(value)) return value;
    return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
    els.forEach(function(el) {
        if (el) el.style.transitionDuration = value + "ms";
    });
}
function setVisibilityState(els, state) {
    els.forEach(function(el) {
        if (el) el.setAttribute('data-state', state);
    });
}
function getOwnerDocument(elementOrElements) {
    var _element$ownerDocumen;
    var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body
    return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
    var clientX = event.clientX, clientY = event.clientY;
    return popperTreeData.every(function(_ref) {
        var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
        var interactiveBorder = props.interactiveBorder;
        var basePlacement = getBasePlacement(popperState.placement);
        var offsetData = popperState.modifiersData.offset;
        if (!offsetData) return true;
        var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
        var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
        var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
        var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
        var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
        var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
        var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
        var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
        return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
    });
}
function updateTransitionEndListener(box, action, listener) {
    var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
    // `webkitTransitionEnd`...
    [
        'transitionend',
        'webkitTransitionEnd'
    ].forEach(function(event) {
        box[method](event, listener);
    });
}
/**
 * Compared to xxx.contains, this function works for dom structures with shadow
 * dom
 */ function actualContains(parent, child) {
    var target = child;
    while(target){
        var _target$getRootNode;
        if (parent.contains(target)) return true;
        target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
    }
    return false;
}
var currentInput = {
    isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */ function onDocumentTouchStart() {
    if (currentInput.isTouch) return;
    currentInput.isTouch = true;
    if (window.performance) document.addEventListener('mousemove', onDocumentMouseMove);
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */ function onDocumentMouseMove() {
    var now = performance.now();
    if (now - lastMouseMoveTime < 20) {
        currentInput.isTouch = false;
        document.removeEventListener('mousemove', onDocumentMouseMove);
    }
    lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */ function onWindowBlur() {
    var activeElement = document.activeElement;
    if (isReferenceElement(activeElement)) {
        var instance = activeElement._tippy;
        if (activeElement.blur && !instance.state.isVisible) activeElement.blur();
    }
}
function bindGlobalEventListeners() {
    document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
    window.addEventListener('blur', onWindowBlur);
}
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE11 = isBrowser ? !!window.msCrypto : false;
function createMemoryLeakWarning(method) {
    var txt = method === 'destroy' ? 'n already-' : ' ';
    return [
        method + "() was called on a" + txt + "destroyed instance. This is a no-op but",
        'indicates a potential memory leak.'
    ].join(' ');
}
function clean(value) {
    var spacesAndTabs = /[ \t]{2,}/g;
    var lineStartWithSpaces = /^[ \t]*/gm;
    return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
}
function getDevMessage(message) {
    return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
}
function getFormattedMessage(message) {
    return [
        getDevMessage(message),
        'color: #00C584; font-size: 1.3em; font-weight: bold;',
        'line-height: 1.5',
        'color: #a6a095;'
    ];
} // Assume warnings and errors never have the same message
var visitedMessages;
resetVisitedMessages();
function resetVisitedMessages() {
    visitedMessages = new Set();
}
function warnWhen(condition, message) {
    if (condition && !visitedMessages.has(message)) {
        var _console;
        visitedMessages.add(message);
        (_console = console).warn.apply(_console, getFormattedMessage(message));
    }
}
function errorWhen(condition, message) {
    if (condition && !visitedMessages.has(message)) {
        var _console2;
        visitedMessages.add(message);
        (_console2 = console).error.apply(_console2, getFormattedMessage(message));
    }
}
function validateTargets(targets) {
    var didPassFalsyValue = !targets;
    var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
    errorWhen(didPassFalsyValue, [
        'tippy() was passed',
        '`' + String(targets) + '`',
        'as its targets (first) argument. Valid types are: String, Element,',
        'Element[], or NodeList.'
    ].join(' '));
    errorWhen(didPassPlainObject, [
        'tippy() was passed a plain object which is not supported as an argument',
        'for virtual positioning. Use props.getReferenceClientRect instead.'
    ].join(' '));
}
var pluginProps = {
    animateFill: false,
    followCursor: false,
    inlinePositioning: false,
    sticky: false
};
var renderProps = {
    allowHTML: false,
    animation: 'fade',
    arrow: true,
    content: '',
    inertia: false,
    maxWidth: 350,
    role: 'tooltip',
    theme: '',
    zIndex: 9999
};
var defaultProps = Object.assign({
    appendTo: TIPPY_DEFAULT_APPEND_TO,
    aria: {
        content: 'auto',
        expanded: 'auto'
    },
    delay: 0,
    duration: [
        300,
        250
    ],
    getReferenceClientRect: null,
    hideOnClick: true,
    ignoreAttributes: false,
    interactive: false,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    moveTransition: '',
    offset: [
        0,
        10
    ],
    onAfterUpdate: function onAfterUpdate() {},
    onBeforeUpdate: function onBeforeUpdate() {},
    onCreate: function onCreate() {},
    onDestroy: function onDestroy() {},
    onHidden: function onHidden() {},
    onHide: function onHide() {},
    onMount: function onMount() {},
    onShow: function onShow() {},
    onShown: function onShown() {},
    onTrigger: function onTrigger() {},
    onUntrigger: function onUntrigger() {},
    onClickOutside: function onClickOutside() {},
    placement: 'top',
    plugins: [],
    popperOptions: {},
    render: null,
    showOnCreate: false,
    touch: true,
    trigger: 'mouseenter focus',
    triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps(partialProps) {
    validateProps(partialProps, []);
    var keys = Object.keys(partialProps);
    keys.forEach(function(key) {
        defaultProps[key] = partialProps[key];
    });
};
function getExtendedPassedProps(passedProps) {
    var plugins = passedProps.plugins || [];
    var pluginProps1 = plugins.reduce(function(acc, plugin) {
        var name = plugin.name, defaultValue = plugin.defaultValue;
        if (name) {
            var _name;
            acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
        }
        return acc;
    }, {});
    return Object.assign({}, passedProps, pluginProps1);
}
function getDataAttributeProps(reference, plugins) {
    var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
        plugins: plugins
    }))) : defaultKeys;
    var props = propKeys.reduce(function(acc, key) {
        var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();
        if (!valueAsString) return acc;
        if (key === 'content') acc[key] = valueAsString;
        else try {
            acc[key] = JSON.parse(valueAsString);
        } catch (e) {
            acc[key] = valueAsString;
        }
        return acc;
    }, {});
    return props;
}
function evaluateProps(reference, props) {
    var out = Object.assign({}, props, {
        content: invokeWithArgsOrReturn(props.content, [
            reference
        ])
    }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
    out.aria = Object.assign({}, defaultProps.aria, out.aria);
    out.aria = {
        expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
        content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
    };
    return out;
}
function validateProps(partialProps, plugins) {
    if (partialProps === void 0) partialProps = {};
    if (plugins === void 0) plugins = [];
    var keys = Object.keys(partialProps);
    keys.forEach(function(prop) {
        var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
        var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`
        if (didPassUnknownProp) didPassUnknownProp = plugins.filter(function(plugin) {
            return plugin.name === prop;
        }).length === 0;
        warnWhen(didPassUnknownProp, [
            "`" + prop + "`",
            "is not a valid prop. You may have spelled it incorrectly, or if it's",
            'a plugin, forgot to pass it in an array as props.plugins.',
            '\n\n',
            'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n',
            'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'
        ].join(' '));
    });
}
var innerHTML = function innerHTML() {
    return 'innerHTML';
};
function dangerouslySetInnerHTML(element, html) {
    element[innerHTML()] = html;
}
function createArrowElement(value) {
    var arrow = div();
    if (value === true) arrow.className = ARROW_CLASS;
    else {
        arrow.className = SVG_ARROW_CLASS;
        if (isElement(value)) arrow.appendChild(value);
        else dangerouslySetInnerHTML(arrow, value);
    }
    return arrow;
}
function setContent(content, props) {
    if (isElement(props.content)) {
        dangerouslySetInnerHTML(content, '');
        content.appendChild(props.content);
    } else if (typeof props.content !== 'function') {
        if (props.allowHTML) dangerouslySetInnerHTML(content, props.content);
        else content.textContent = props.content;
    }
}
function getChildren(popper) {
    var box = popper.firstElementChild;
    var boxChildren = arrayFrom(box.children);
    return {
        box: box,
        content: boxChildren.find(function(node) {
            return node.classList.contains(CONTENT_CLASS);
        }),
        arrow: boxChildren.find(function(node) {
            return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
        }),
        backdrop: boxChildren.find(function(node) {
            return node.classList.contains(BACKDROP_CLASS);
        })
    };
}
function render(instance) {
    var popper = div();
    var box1 = div();
    box1.className = BOX_CLASS;
    box1.setAttribute('data-state', 'hidden');
    box1.setAttribute('tabindex', '-1');
    var content1 = div();
    content1.className = CONTENT_CLASS;
    content1.setAttribute('data-state', 'hidden');
    setContent(content1, instance.props);
    popper.appendChild(box1);
    box1.appendChild(content1);
    onUpdate(instance.props, instance.props);
    function onUpdate(prevProps, nextProps) {
        var _getChildren = getChildren(popper), box = _getChildren.box, content = _getChildren.content, arrow = _getChildren.arrow;
        if (nextProps.theme) box.setAttribute('data-theme', nextProps.theme);
        else box.removeAttribute('data-theme');
        if (typeof nextProps.animation === 'string') box.setAttribute('data-animation', nextProps.animation);
        else box.removeAttribute('data-animation');
        if (nextProps.inertia) box.setAttribute('data-inertia', '');
        else box.removeAttribute('data-inertia');
        box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;
        if (nextProps.role) box.setAttribute('role', nextProps.role);
        else box.removeAttribute('role');
        if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) setContent(content, instance.props);
        if (nextProps.arrow) {
            if (!arrow) box.appendChild(createArrowElement(nextProps.arrow));
            else if (prevProps.arrow !== nextProps.arrow) {
                box.removeChild(arrow);
                box.appendChild(createArrowElement(nextProps.arrow));
            }
        } else if (arrow) box.removeChild(arrow);
    }
    return {
        popper: popper,
        onUpdate: onUpdate
    };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away
render.$$tippy = true;
var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`
var mountedInstances = [];
function createTippy(reference, passedProps) {
    var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
    // 🔒 Private members
    // ===========================================================================
    var showTimeout;
    var hideTimeout;
    var scheduleHideAnimationFrame;
    var isVisibleFromClick = false;
    var didHideDueToDocumentMouseDown = false;
    var didTouchMove = false;
    var ignoreOnFirstUpdate = false;
    var lastTriggerEvent;
    var currentTransitionEndListener;
    var onFirstUpdate;
    var listeners = [];
    var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
    var currentTarget; // ===========================================================================
    // 🔑 Public members
    // ===========================================================================
    var id1 = idCounter++;
    var popperInstance = null;
    var plugins = unique(props.plugins);
    var state1 = {
        // Is the instance currently enabled?
        isEnabled: true,
        // Is the tippy currently showing and not transitioning out?
        isVisible: false,
        // Has the instance been destroyed?
        isDestroyed: false,
        // Is the tippy currently mounted to the DOM?
        isMounted: false,
        // Has the tippy finished transitioning in?
        isShown: false
    };
    var instance1 = {
        // properties
        id: id1,
        reference: reference,
        popper: div(),
        popperInstance: popperInstance,
        props: props,
        state: state1,
        plugins: plugins,
        // methods
        clearDelayTimeouts: clearDelayTimeouts,
        setProps: setProps,
        setContent: setContent1,
        show: show,
        hide: hide,
        hideWithInteractivity: hideWithInteractivity,
        enable: enable,
        disable: disable,
        unmount: unmount,
        destroy: destroy
    }; // TODO: Investigate why this early return causes a TDZ error in the tests —
    // it doesn't seem to happen in the browser
    /* istanbul ignore if */ if (!props.render) {
        errorWhen(true, 'render() function has not been supplied.');
        return instance1;
    } // ===========================================================================
    // Initial mutations
    // ===========================================================================
    var _props$render = props.render(instance1), popper1 = _props$render.popper, onUpdate = _props$render.onUpdate;
    popper1.setAttribute('data-tippy-root', '');
    popper1.id = "tippy-" + instance1.id;
    instance1.popper = popper1;
    reference._tippy = instance1;
    popper1._tippy = instance1;
    var pluginsHooks = plugins.map(function(plugin) {
        return plugin.fn(instance1);
    });
    var hasAriaExpanded = reference.hasAttribute('aria-expanded');
    addListeners();
    handleAriaExpandedAttribute();
    handleStyles();
    invokeHook('onCreate', [
        instance1
    ]);
    if (props.showOnCreate) scheduleShow();
     // Prevent a tippy with a delay from hiding if the cursor left then returned
    // before it started hiding
    popper1.addEventListener('mouseenter', function() {
        if (instance1.props.interactive && instance1.state.isVisible) instance1.clearDelayTimeouts();
    });
    popper1.addEventListener('mouseleave', function() {
        if (instance1.props.interactive && instance1.props.trigger.indexOf('mouseenter') >= 0) getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    });
    return instance1; // ===========================================================================
    // 🔒 Private methods
    // ===========================================================================
    function getNormalizedTouchSettings() {
        var touch = instance1.props.touch;
        return Array.isArray(touch) ? touch : [
            touch,
            0
        ];
    }
    function getIsCustomTouchBehavior() {
        return getNormalizedTouchSettings()[0] === 'hold';
    }
    function getIsDefaultRenderFn() {
        var _instance$props$rende;
        // @ts-ignore
        return !!((_instance$props$rende = instance1.props.render) != null && _instance$props$rende.$$tippy);
    }
    function getCurrentTarget() {
        return currentTarget || reference;
    }
    function getDocument() {
        var parent = getCurrentTarget().parentNode;
        return parent ? getOwnerDocument(parent) : document;
    }
    function getDefaultTemplateChildren() {
        return getChildren(popper1);
    }
    function getDelay(isShow) {
        // For touch or keyboard input, force `0` delay for UX reasons
        // Also if the instance is mounted but not visible (transitioning out),
        // ignore delay
        if (instance1.state.isMounted && !instance1.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
            return 0;
        }
        return getValueAtIndexOrReturn(instance1.props.delay, isShow ? 0 : 1, defaultProps.delay);
    }
    function handleStyles(fromHide) {
        if (fromHide === void 0) {
            fromHide = false;
        }
        popper1.style.pointerEvents = instance1.props.interactive && !fromHide ? '' : 'none';
        popper1.style.zIndex = "" + instance1.props.zIndex;
    }
    function invokeHook(hook, args, shouldInvokePropsHook) {
        if (shouldInvokePropsHook === void 0) {
            shouldInvokePropsHook = true;
        }
        pluginsHooks.forEach(function(pluginHooks) {
            if (pluginHooks[hook]) {
                pluginHooks[hook].apply(pluginHooks, args);
            }
        });
        if (shouldInvokePropsHook) {
            var _instance$props;
            (_instance$props = instance1.props)[hook].apply(_instance$props, args);
        }
    }
    function handleAriaContentAttribute() {
        var aria = instance1.props.aria;
        if (!aria.content) {
            return;
        }
        var attr = "aria-" + aria.content;
        var id = popper1.id;
        var nodes = normalizeToArray(instance1.props.triggerTarget || reference);
        nodes.forEach(function(node) {
            var currentValue = node.getAttribute(attr);
            if (instance1.state.isVisible) {
                node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
            } else {
                var nextValue = currentValue && currentValue.replace(id, '').trim();
                if (nextValue) {
                    node.setAttribute(attr, nextValue);
                } else {
                    node.removeAttribute(attr);
                }
            }
        });
    }
    function handleAriaExpandedAttribute() {
        if (hasAriaExpanded || !instance1.props.aria.expanded) {
            return;
        }
        var nodes = normalizeToArray(instance1.props.triggerTarget || reference);
        nodes.forEach(function(node) {
            if (instance1.props.interactive) {
                node.setAttribute('aria-expanded', instance1.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
            } else {
                node.removeAttribute('aria-expanded');
            }
        });
>>>>>>> 8a8eeb1 (Automate basic theme generation)
    }
    return e;
  }
  function ui(e) {
    return e instanceof ci(e).Element || e instanceof Element;
  }
  function li(e) {
    return e instanceof ci(e).HTMLElement || e instanceof HTMLElement;
  }
  function fi(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof ci(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  t(si), n(si, "default", () => uo);
  var pi = {
      name: "applyStyles",
      enabled: !0,
      phase: "write",
      fn: function (e) {
        var t = e.state;
        Object.keys(t.elements).forEach(function (e) {
          var n = t.styles[e] || {},
            i = t.attributes[e] || {},
            r = t.elements[e];
          li(r) &&
            ai(r) &&
            (Object.assign(r.style, n),
            Object.keys(i).forEach(function (e) {
              var t = i[e];
              !1 === t
                ? r.removeAttribute(e)
                : r.setAttribute(e, !0 === t ? "" : t);
            }));
        });
      },
      effect: function (e) {
        var t = e.state,
          n = {
            popper: {
              position: t.options.strategy,
              left: "0",
              top: "0",
              margin: "0",
            },
            arrow: { position: "absolute" },
            reference: {},
          };
        return (
          Object.assign(t.elements.popper.style, n.popper),
          (t.styles = n),
          t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
          function () {
            Object.keys(t.elements).forEach(function (e) {
              var i = t.elements[e],
                r = t.attributes[e] || {},
                o = Object.keys(
                  t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
                ).reduce(function (e, t) {
                  return (e[t] = ""), e;
                }, {});
              li(i) &&
                ai(i) &&
                (Object.assign(i.style, o),
                Object.keys(r).forEach(function (e) {
                  i.removeAttribute(e);
                }));
            });
<<<<<<< HEAD
          }
        );
      },
      requires: ["computeStyles"],
    },
    di = Math.max,
    hi = Math.min,
    mi = Math.round;
  function gi(e, t) {
    void 0 === t && (t = !1);
    var n = e.getBoundingClientRect(),
      i = 1,
      r = 1;
    if (li(e) && t) {
      var o = e.offsetHeight,
        s = e.offsetWidth;
      s > 0 && (i = mi(n.width) / s || 1), o > 0 && (r = mi(n.height) / o || 1);
=======
            if (activeInstances.filter(function(data) {
                return data.doc === doc;
            }).length === 0) removeMouseCoordsListener(doc);
        }
        return {
            onCreate: create,
            onDestroy: destroy,
            onBeforeUpdate: function onBeforeUpdate() {
                prevProps = instance.props;
            },
            onAfterUpdate: function onAfterUpdate(_, _ref2) {
                var followCursor2 = _ref2.followCursor;
                if (isInternalUpdate) return;
                if (followCursor2 !== undefined && prevProps.followCursor !== followCursor2) {
                    destroy();
                    if (followCursor2) {
                        create();
                        if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) addListener();
                    } else {
                        removeListener();
                        unsetGetReferenceClientRect();
                    }
                }
            },
            onMount: function onMount() {
                if (instance.props.followCursor && !wasFocusEvent) {
                    if (isUnmounted) {
                        onMouseMove(mouseCoords);
                        isUnmounted = false;
                    }
                    if (!getIsInitialBehavior()) addListener();
                }
            },
            onTrigger: function onTrigger(_, event) {
                if (isMouseEvent(event)) mouseCoords = {
                    clientX: event.clientX,
                    clientY: event.clientY
                };
                wasFocusEvent = event.type === 'focus';
            },
            onHidden: function onHidden() {
                if (instance.props.followCursor) {
                    unsetGetReferenceClientRect();
                    removeListener();
                    isUnmounted = true;
                }
            }
        };
    }
};
function getProps(props, modifier) {
    var _props$popperOptions;
    return {
        popperOptions: Object.assign({}, props.popperOptions, {
            modifiers: [].concat((((_props$popperOptions = props.popperOptions) == null ? void 0 : _props$popperOptions.modifiers) || []).filter(function(_ref) {
                var name = _ref.name;
                return name !== modifier.name;
            }), [
                modifier
            ])
        })
    };
}
var inlinePositioning = {
    name: 'inlinePositioning',
    defaultValue: false,
    fn: function fn(instance) {
        var reference = instance.reference;
        function isEnabled() {
            return !!instance.props.inlinePositioning;
        }
        var placement1;
        var cursorRectIndex = -1;
        var isInternalUpdate = false;
        var triedPlacements = [];
        var modifier = {
            name: 'tippyInlinePositioning',
            enabled: true,
            phase: 'afterWrite',
            fn: function fn(_ref2) {
                var state = _ref2.state;
                if (isEnabled()) {
                    if (triedPlacements.indexOf(state.placement) !== -1) triedPlacements = [];
                    if (placement1 !== state.placement && triedPlacements.indexOf(state.placement) === -1) {
                        triedPlacements.push(state.placement);
                        instance.setProps({
                            // @ts-ignore - unneeded DOMRect properties
                            getReferenceClientRect: function getReferenceClientRect() {
                                return _getReferenceClientRect(state.placement);
                            }
                        });
                    }
                    placement1 = state.placement;
                }
            }
        };
        function _getReferenceClientRect(placement) {
            return getInlineBoundingClientRect(getBasePlacement(placement), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
        }
        function setInternalProps(partialProps) {
            isInternalUpdate = true;
            instance.setProps(partialProps);
            isInternalUpdate = false;
        }
        function addModifier() {
            if (!isInternalUpdate) setInternalProps(getProps(instance.props, modifier));
        }
        return {
            onCreate: addModifier,
            onAfterUpdate: addModifier,
            onTrigger: function onTrigger(_, event) {
                if (isMouseEvent(event)) {
                    var rects = arrayFrom(instance.reference.getClientRects());
                    var cursorRect = rects.find(function(rect) {
                        return rect.left - 2 <= event.clientX && rect.right + 2 >= event.clientX && rect.top - 2 <= event.clientY && rect.bottom + 2 >= event.clientY;
                    });
                    var index = rects.indexOf(cursorRect);
                    cursorRectIndex = index > -1 ? index : cursorRectIndex;
                }
            },
            onHidden: function onHidden() {
                cursorRectIndex = -1;
            }
        };
    }
};
function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
    // Not an inline element, or placement is not yet known
    if (clientRects.length < 2 || currentBasePlacement === null) return boundingRect;
     // There are two rects and they are disjoined
    if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) return clientRects[cursorRectIndex] || boundingRect;
    switch(currentBasePlacement){
        case 'top':
        case 'bottom':
            var firstRect = clientRects[0];
            var lastRect = clientRects[clientRects.length - 1];
            var isTop = currentBasePlacement === 'top';
            var top = firstRect.top;
            var bottom = lastRect.bottom;
            var left = isTop ? firstRect.left : lastRect.left;
            var right = isTop ? firstRect.right : lastRect.right;
            var width = right - left;
            var height = bottom - top;
            return {
                top: top,
                bottom: bottom,
                left: left,
                right: right,
                width: width,
                height: height
            };
        case 'left':
        case 'right':
            var minLeft = Math.min.apply(Math, clientRects.map(function(rects) {
                return rects.left;
            }));
            var maxRight = Math.max.apply(Math, clientRects.map(function(rects) {
                return rects.right;
            }));
            var measureRects = clientRects.filter(function(rect) {
                return currentBasePlacement === 'left' ? rect.left === minLeft : rect.right === maxRight;
            });
            var _top = measureRects[0].top;
            var _bottom = measureRects[measureRects.length - 1].bottom;
            var _left = minLeft;
            var _right = maxRight;
            var _width = _right - _left;
            var _height = _bottom - _top;
            return {
                top: _top,
                bottom: _bottom,
                left: _left,
                right: _right,
                width: _width,
                height: _height
            };
        default:
            return boundingRect;
    }
}
var sticky = {
    name: 'sticky',
    defaultValue: false,
    fn: function fn(instance) {
        var reference = instance.reference, popper = instance.popper;
        function getReference() {
            return instance.popperInstance ? instance.popperInstance.state.elements.reference : reference;
        }
        function shouldCheck(value) {
            return instance.props.sticky === true || instance.props.sticky === value;
        }
        var prevRefRect = null;
        var prevPopRect = null;
        function updatePosition() {
            var currentRefRect = shouldCheck('reference') ? getReference().getBoundingClientRect() : null;
            var currentPopRect = shouldCheck('popper') ? popper.getBoundingClientRect() : null;
            if (currentRefRect && areRectsDifferent(prevRefRect, currentRefRect) || currentPopRect && areRectsDifferent(prevPopRect, currentPopRect)) {
                if (instance.popperInstance) instance.popperInstance.update();
            }
            prevRefRect = currentRefRect;
            prevPopRect = currentPopRect;
            if (instance.state.isMounted) requestAnimationFrame(updatePosition);
        }
        return {
            onMount: function onMount() {
                if (instance.props.sticky) updatePosition();
            }
        };
    }
};
function areRectsDifferent(rectA, rectB) {
    if (rectA && rectB) return rectA.top !== rectB.top || rectA.right !== rectB.right || rectA.bottom !== rectB.bottom || rectA.left !== rectB.left;
    return true;
}
tippy.setDefaultProps({
    render: render
});
exports.default = tippy;

},{"@popperjs/core":"7unqC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7unqC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "popperGenerator", ()=>_createPopperJs.popperGenerator
) // eslint-disable-next-line import/no-unused-modules
;
parcelHelpers.export(exports, "detectOverflow", ()=>_createPopperJs.detectOverflow
);
parcelHelpers.export(exports, "createPopperBase", ()=>_createPopperJs.createPopper
);
parcelHelpers.export(exports, "createPopper", ()=>_popperJs.createPopper
) // eslint-disable-next-line import/no-unused-modules
;
parcelHelpers.export(exports, "createPopperLite", ()=>_popperLiteJs.createPopper
);
var _enumsJs = require("./enums.js");
parcelHelpers.exportAll(_enumsJs, exports);
var _indexJs = require("./modifiers/index.js"); // eslint-disable-next-line import/no-unused-modules
parcelHelpers.exportAll(_indexJs, exports);
var _createPopperJs = require("./createPopper.js");
var _popperJs = require("./popper.js");
var _popperLiteJs = require("./popper-lite.js");

},{"./enums.js":"lCAq5","./modifiers/index.js":"cap3W","./createPopper.js":"cHuNp","./popper.js":"1PuRF","./popper-lite.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lCAq5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "top", ()=>top
);
parcelHelpers.export(exports, "bottom", ()=>bottom
);
parcelHelpers.export(exports, "right", ()=>right
);
parcelHelpers.export(exports, "left", ()=>left
);
parcelHelpers.export(exports, "auto", ()=>auto
);
parcelHelpers.export(exports, "basePlacements", ()=>basePlacements
);
parcelHelpers.export(exports, "start", ()=>start
);
parcelHelpers.export(exports, "end", ()=>end
);
parcelHelpers.export(exports, "clippingParents", ()=>clippingParents
);
parcelHelpers.export(exports, "viewport", ()=>viewport
);
parcelHelpers.export(exports, "popper", ()=>popper
);
parcelHelpers.export(exports, "reference", ()=>reference
);
parcelHelpers.export(exports, "variationPlacements", ()=>variationPlacements
);
parcelHelpers.export(exports, "placements", ()=>placements
);
parcelHelpers.export(exports, "beforeRead", ()=>beforeRead
);
parcelHelpers.export(exports, "read", ()=>read
);
parcelHelpers.export(exports, "afterRead", ()=>afterRead
);
parcelHelpers.export(exports, "beforeMain", ()=>beforeMain
);
parcelHelpers.export(exports, "main", ()=>main
);
parcelHelpers.export(exports, "afterMain", ()=>afterMain
);
parcelHelpers.export(exports, "beforeWrite", ()=>beforeWrite
);
parcelHelpers.export(exports, "write", ()=>write
);
parcelHelpers.export(exports, "afterWrite", ()=>afterWrite
);
parcelHelpers.export(exports, "modifierPhases", ()=>modifierPhases
);
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [
    top,
    bottom,
    right,
    left
];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/ basePlacements.reduce(function(acc, placement) {
    return acc.concat([
        placement + "-" + start,
        placement + "-" + end
    ]);
}, []);
var placements = /*#__PURE__*/ [].concat(basePlacements, [
    auto
]).reduce(function(acc, placement) {
    return acc.concat([
        placement,
        placement + "-" + start,
        placement + "-" + end
    ]);
}, []); // modifiers that need to read the DOM
var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers
var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)
var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [
    beforeRead,
    read,
    afterRead,
    beforeMain,
    main,
    afterMain,
    beforeWrite,
    write,
    afterWrite
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cap3W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyStyles", ()=>_applyStylesJsDefault.default
);
parcelHelpers.export(exports, "arrow", ()=>_arrowJsDefault.default
);
parcelHelpers.export(exports, "computeStyles", ()=>_computeStylesJsDefault.default
);
parcelHelpers.export(exports, "eventListeners", ()=>_eventListenersJsDefault.default
);
parcelHelpers.export(exports, "flip", ()=>_flipJsDefault.default
);
parcelHelpers.export(exports, "hide", ()=>_hideJsDefault.default
);
parcelHelpers.export(exports, "offset", ()=>_offsetJsDefault.default
);
parcelHelpers.export(exports, "popperOffsets", ()=>_popperOffsetsJsDefault.default
);
parcelHelpers.export(exports, "preventOverflow", ()=>_preventOverflowJsDefault.default
);
var _applyStylesJs = require("./applyStyles.js");
var _applyStylesJsDefault = parcelHelpers.interopDefault(_applyStylesJs);
var _arrowJs = require("./arrow.js");
var _arrowJsDefault = parcelHelpers.interopDefault(_arrowJs);
var _computeStylesJs = require("./computeStyles.js");
var _computeStylesJsDefault = parcelHelpers.interopDefault(_computeStylesJs);
var _eventListenersJs = require("./eventListeners.js");
var _eventListenersJsDefault = parcelHelpers.interopDefault(_eventListenersJs);
var _flipJs = require("./flip.js");
var _flipJsDefault = parcelHelpers.interopDefault(_flipJs);
var _hideJs = require("./hide.js");
var _hideJsDefault = parcelHelpers.interopDefault(_hideJs);
var _offsetJs = require("./offset.js");
var _offsetJsDefault = parcelHelpers.interopDefault(_offsetJs);
var _popperOffsetsJs = require("./popperOffsets.js");
var _popperOffsetsJsDefault = parcelHelpers.interopDefault(_popperOffsetsJs);
var _preventOverflowJs = require("./preventOverflow.js");
var _preventOverflowJsDefault = parcelHelpers.interopDefault(_preventOverflowJs);

},{"./applyStyles.js":"4iMn4","./arrow.js":"31HFW","./computeStyles.js":"gDlm2","./eventListeners.js":"hBKsL","./flip.js":"fv5wq","./hide.js":"2g4OF","./offset.js":"3GKVY","./popperOffsets.js":"6I679","./preventOverflow.js":"1AMhb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4iMn4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getNodeNameJs = require("../dom-utils/getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _instanceOfJs = require("../dom-utils/instanceOf.js"); // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow
function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name1) {
        var style = state.styles[name1] || {};
        var attributes = state.attributes[name1] || {};
        var element = state.elements[name1]; // arrow is optional + virtual elements
        if (!_instanceOfJs.isHTMLElement(element) || !_getNodeNameJsDefault.default(element)) return;
         // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(name) {
            var value = attributes[name];
            if (value === false) element.removeAttribute(name);
            else element.setAttribute(name, value === true ? '' : value);
        });
    });
}
function effect(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
        popper: {
            position: state.options.strategy,
            left: '0',
            top: '0',
            margin: '0'
        },
        arrow: {
            position: 'absolute'
        },
        reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
    return function() {
        Object.keys(state.elements).forEach(function(name) {
            var element = state.elements[name];
            var attributes = state.attributes[name] || {};
            var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them
            var style1 = styleProperties.reduce(function(style, property) {
                style[property] = '';
                return style;
            }, {}); // arrow is optional + virtual elements
            if (!_instanceOfJs.isHTMLElement(element) || !_getNodeNameJsDefault.default(element)) return;
            Object.assign(element.style, style1);
            Object.keys(attributes).forEach(function(attribute) {
                element.removeAttribute(attribute);
            });
        });
    };
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect,
    requires: [
        'computeStyles'
    ]
};

},{"../dom-utils/getNodeName.js":"a2Qom","../dom-utils/instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a2Qom":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
}
exports.default = getNodeName;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gYFUC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isElement", ()=>isElement
);
parcelHelpers.export(exports, "isHTMLElement", ()=>isHTMLElement
);
parcelHelpers.export(exports, "isShadowRoot", ()=>isShadowRoot
);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
function isElement(node) {
    var OwnElement = _getWindowJsDefault.default(node).Element;
    return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
    var OwnElement = _getWindowJsDefault.default(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') return false;
    var OwnElement = _getWindowJsDefault.default(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
}

},{"./getWindow.js":"2SkOo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2SkOo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getWindow(node) {
    if (node == null) return window;
    if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
}
exports.default = getWindow;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"31HFW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getBasePlacementJs = require("../utils/getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _getLayoutRectJs = require("../dom-utils/getLayoutRect.js");
var _getLayoutRectJsDefault = parcelHelpers.interopDefault(_getLayoutRectJs);
var _containsJs = require("../dom-utils/contains.js");
var _containsJsDefault = parcelHelpers.interopDefault(_containsJs);
var _getOffsetParentJs = require("../dom-utils/getOffsetParent.js");
var _getOffsetParentJsDefault = parcelHelpers.interopDefault(_getOffsetParentJs);
var _getMainAxisFromPlacementJs = require("../utils/getMainAxisFromPlacement.js");
var _getMainAxisFromPlacementJsDefault = parcelHelpers.interopDefault(_getMainAxisFromPlacementJs);
var _withinJs = require("../utils/within.js");
var _mergePaddingObjectJs = require("../utils/mergePaddingObject.js");
var _mergePaddingObjectJsDefault = parcelHelpers.interopDefault(_mergePaddingObjectJs);
var _expandToHashMapJs = require("../utils/expandToHashMap.js");
var _expandToHashMapJsDefault = parcelHelpers.interopDefault(_expandToHashMapJs);
var _enumsJs = require("../enums.js");
var _instanceOfJs = require("../dom-utils/instanceOf.js"); // eslint-disable-next-line import/no-unused-modules
var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
    })) : padding;
    return _mergePaddingObjectJsDefault.default(typeof padding !== 'number' ? padding : _expandToHashMapJsDefault.default(padding, _enumsJs.basePlacements));
};
function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state, name = _ref.name, options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = _getBasePlacementJsDefault.default(state.placement);
    var axis = _getMainAxisFromPlacementJsDefault.default(basePlacement);
    var isVertical = [
        _enumsJs.left,
        _enumsJs.right
    ].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';
    if (!arrowElement || !popperOffsets) return;
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = _getLayoutRectJsDefault.default(arrowElement);
    var minProp = axis === 'y' ? _enumsJs.top : _enumsJs.left;
    var maxProp = axis === 'y' ? _enumsJs.bottom : _enumsJs.right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = _getOffsetParentJsDefault.default(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds
    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = _withinJs.within(min, center, max); // Prevents breaking syntax highlighting...
    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect(_ref2) {
    var state = _ref2.state, options = _ref2.options;
    var _options$element = options.element, arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
    if (arrowElement == null) return;
     // CSS selector
    if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);
        if (!arrowElement) return;
    }
    if (!_instanceOfJs.isHTMLElement(arrowElement)) console.error([
        'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
        'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
        'the arrow.'
    ].join(' '));
    if (!_containsJsDefault.default(state.elements.popper, arrowElement)) {
        console.error([
            'Popper: "arrow" modifier\'s `element` must be a child of the popper',
            'element.'
        ].join(' '));
        return;
    }
    state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect,
    requires: [
        'popperOffsets'
    ],
    requiresIfExists: [
        'preventOverflow'
    ]
};

},{"../utils/getBasePlacement.js":"59Wp3","../dom-utils/getLayoutRect.js":"jvjuf","../dom-utils/contains.js":"4QxRR","../dom-utils/getOffsetParent.js":"laoYw","../utils/getMainAxisFromPlacement.js":"1Xlom","../utils/within.js":"3glSz","../utils/mergePaddingObject.js":"lEIf9","../utils/expandToHashMap.js":"iQlH5","../enums.js":"lCAq5","../dom-utils/instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"59Wp3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _enumsJs = require("../enums.js");
function getBasePlacement(placement) {
    return placement.split('-')[0];
}
exports.default = getBasePlacement;

},{"../enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jvjuf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getBoundingClientRectJs = require("./getBoundingClientRect.js"); // Returns the layout rect of an element relative to its offsetParent. Layout
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
function getLayoutRect(element) {
    var clientRect = _getBoundingClientRectJsDefault.default(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
    if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
    return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
    };
}
exports.default = getLayoutRect;

},{"./getBoundingClientRect.js":"9CFSQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9CFSQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _instanceOfJs = require("./instanceOf.js");
var _mathJs = require("../utils/math.js");
function getBoundingClientRect(element, includeScale) {
    if (includeScale === void 0) includeScale = false;
    var rect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (_instanceOfJs.isHTMLElement(element) && includeScale) {
        var offsetHeight = element.offsetHeight;
        var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
        // Fallback to 1 in case both values are `0`
        if (offsetWidth > 0) scaleX = _mathJs.round(rect.width) / offsetWidth || 1;
        if (offsetHeight > 0) scaleY = _mathJs.round(rect.height) / offsetHeight || 1;
    }
    return {
        width: rect.width / scaleX,
        height: rect.height / scaleY,
        top: rect.top / scaleY,
        right: rect.right / scaleX,
        bottom: rect.bottom / scaleY,
        left: rect.left / scaleX,
        x: rect.left / scaleX,
        y: rect.top / scaleY
    };
}
exports.default = getBoundingClientRect;

},{"./instanceOf.js":"gYFUC","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gQqVe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "max", ()=>max
);
parcelHelpers.export(exports, "min", ()=>min
);
parcelHelpers.export(exports, "round", ()=>round
);
var max = Math.max;
var min = Math.min;
var round = Math.round;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4QxRR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _instanceOfJs = require("./instanceOf.js");
function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method
    if (parent.contains(child)) return true;
    else if (rootNode && _instanceOfJs.isShadowRoot(rootNode)) {
        var next = child;
        do {
            if (next && parent.isSameNode(next)) return true;
             // $FlowFixMe[prop-missing]: need a better way to handle this...
            next = next.parentNode || next.host;
        }while (next)
    } // Give up, the result is false
    return false;
}
exports.default = contains;

},{"./instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"laoYw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _getComputedStyleJs = require("./getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _instanceOfJs = require("./instanceOf.js");
var _isTableElementJs = require("./isTableElement.js");
var _isTableElementJsDefault = parcelHelpers.interopDefault(_isTableElementJs);
var _getParentNodeJs = require("./getParentNode.js");
var _getParentNodeJsDefault = parcelHelpers.interopDefault(_getParentNodeJs);
function getTrueOffsetParent(element) {
    if (!_instanceOfJs.isHTMLElement(element) || _getComputedStyleJsDefault.default(element).position === 'fixed') return null;
    return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block
function getContainingBlock(element) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
    var isIE = navigator.userAgent.indexOf('Trident') !== -1;
    if (isIE && _instanceOfJs.isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = _getComputedStyleJsDefault.default(element);
        if (elementCss.position === 'fixed') return null;
    }
    var currentNode = _getParentNodeJsDefault.default(element);
    if (_instanceOfJs.isShadowRoot(currentNode)) currentNode = currentNode.host;
    while(_instanceOfJs.isHTMLElement(currentNode) && [
        'html',
        'body'
    ].indexOf(_getNodeNameJsDefault.default(currentNode)) < 0){
        var css = _getComputedStyleJsDefault.default(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || [
            'transform',
            'perspective'
        ].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') return currentNode;
        else currentNode = currentNode.parentNode;
    }
    return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
function getOffsetParent(element) {
    var window = _getWindowJsDefault.default(element);
    var offsetParent = getTrueOffsetParent(element);
    while(offsetParent && _isTableElementJsDefault.default(offsetParent) && _getComputedStyleJsDefault.default(offsetParent).position === 'static')offsetParent = getTrueOffsetParent(offsetParent);
    if (offsetParent && (_getNodeNameJsDefault.default(offsetParent) === 'html' || _getNodeNameJsDefault.default(offsetParent) === 'body' && _getComputedStyleJsDefault.default(offsetParent).position === 'static')) return window;
    return offsetParent || getContainingBlock(element) || window;
}
exports.default = getOffsetParent;

},{"./getWindow.js":"2SkOo","./getNodeName.js":"a2Qom","./getComputedStyle.js":"3mZjB","./instanceOf.js":"gYFUC","./isTableElement.js":"2qBb7","./getParentNode.js":"bIHpd","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3mZjB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
function getComputedStyle(element) {
    return _getWindowJsDefault.default(element).getComputedStyle(element);
}
exports.default = getComputedStyle;

},{"./getWindow.js":"2SkOo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2qBb7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
function isTableElement(element) {
    return [
        'table',
        'td',
        'th'
    ].indexOf(_getNodeNameJsDefault.default(element)) >= 0;
}
exports.default = isTableElement;

},{"./getNodeName.js":"a2Qom","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bIHpd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _instanceOfJs = require("./instanceOf.js");
function getParentNode(element) {
    if (_getNodeNameJsDefault.default(element) === 'html') return element;
    return(// $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || element.parentNode || (_instanceOfJs.isShadowRoot(element) ? element.host : null) || // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    _getDocumentElementJsDefault.default(element) // fallback
    );
}
exports.default = getParentNode;

},{"./getNodeName.js":"a2Qom","./getDocumentElement.js":"eJ9Y1","./instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eJ9Y1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _instanceOfJs = require("./instanceOf.js");
function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((_instanceOfJs.isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
exports.default = getDocumentElement;

},{"./instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Xlom":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getMainAxisFromPlacement(placement) {
    return [
        'top',
        'bottom'
    ].indexOf(placement) >= 0 ? 'x' : 'y';
}
exports.default = getMainAxisFromPlacement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3glSz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "within", ()=>within
);
parcelHelpers.export(exports, "withinMaxClamp", ()=>withinMaxClamp
);
var _mathJs = require("./math.js");
function within(min, value, max) {
    return _mathJs.max(min, _mathJs.min(value, max));
}
function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
}

},{"./math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lEIf9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getFreshSideObjectJs = require("./getFreshSideObject.js");
var _getFreshSideObjectJsDefault = parcelHelpers.interopDefault(_getFreshSideObjectJs);
function mergePaddingObject(paddingObject) {
    return Object.assign({}, _getFreshSideObjectJsDefault.default(), paddingObject);
}
exports.default = mergePaddingObject;

},{"./getFreshSideObject.js":"g4xOt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g4xOt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getFreshSideObject() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
}
exports.default = getFreshSideObject;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iQlH5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function expandToHashMap(value, keys) {
    return keys.reduce(function(hashMap, key) {
        hashMap[key] = value;
        return hashMap;
    }, {});
}
exports.default = expandToHashMap;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gDlm2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "mapToStyles", ()=>mapToStyles
);
var _enumsJs = require("../enums.js");
var _getOffsetParentJs = require("../dom-utils/getOffsetParent.js");
var _getOffsetParentJsDefault = parcelHelpers.interopDefault(_getOffsetParentJs);
var _getWindowJs = require("../dom-utils/getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _getDocumentElementJs = require("../dom-utils/getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getComputedStyleJs = require("../dom-utils/getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _getBasePlacementJs = require("../utils/getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _getVariationJs = require("../utils/getVariation.js");
var _getVariationJsDefault = parcelHelpers.interopDefault(_getVariationJs);
var _mathJs = require("../utils/math.js"); // eslint-disable-next-line import/no-unused-modules
var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.
function roundOffsetsByDPR(_ref) {
    var x = _ref.x, y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
        x: _mathJs.round(x * dpr) / dpr || 0,
        y: _mathJs.round(y * dpr) / dpr || 0
    };
}
function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
        x: x,
        y: y
    }) : {
        x: x,
        y: y
    };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = _enumsJs.left;
    var sideY = _enumsJs.top;
    var win = window;
    if (adaptive) {
        var offsetParent = _getOffsetParentJsDefault.default(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';
        if (offsetParent === _getWindowJsDefault.default(popper)) {
            offsetParent = _getDocumentElementJsDefault.default(popper);
            if (_getComputedStyleJsDefault.default(offsetParent).position !== 'static' && position === 'absolute') {
                heightProp = 'scrollHeight';
                widthProp = 'scrollWidth';
            }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it
        if (placement === _enumsJs.top || (placement === _enumsJs.left || placement === _enumsJs.right) && variation === _enumsJs.end) {
            sideY = _enumsJs.bottom;
            var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
            y -= offsetY - popperRect.height;
            y *= gpuAcceleration ? 1 : -1;
        }
        if (placement === _enumsJs.left || (placement === _enumsJs.top || placement === _enumsJs.bottom) && variation === _enumsJs.end) {
            sideX = _enumsJs.right;
            var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
            x -= offsetX - popperRect.width;
            x *= gpuAcceleration ? 1 : -1;
        }
    }
    var commonStyles = Object.assign({
        position: position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x: x,
        y: y
    }) : {
        x: x,
        y: y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
        var _Object$assign;
        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}
function computeStyles(_ref5) {
    var state = _ref5.state, options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var transitionProperty = _getComputedStyleJsDefault.default(state.elements.popper).transitionProperty || '';
    if (adaptive && [
        'transform',
        'top',
        'right',
        'bottom',
        'left'
    ].some(function(property) {
        return transitionProperty.indexOf(property) >= 0;
    })) console.warn([
        'Popper: Detected CSS transitions on at least one of the following',
        'CSS properties: "transform", "top", "right", "bottom", "left".',
        '\n\n',
        'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
        'for smooth transitions, or remove these properties from the CSS',
        'transition declaration on the popper element if only transitioning',
        'opacity or background-color for example.',
        '\n\n',
        'We recommend using the popper element as a wrapper around an inner',
        'element that can have any CSS property transitioned for animations.'
    ].join(' '));
    var commonStyles = {
        placement: _getBasePlacementJsDefault.default(state.placement),
        variation: _getVariationJsDefault.default(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
        isFixed: state.options.strategy === 'fixed'
    };
    if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
    })));
    if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
    })));
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
    });
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
};

},{"../enums.js":"lCAq5","../dom-utils/getOffsetParent.js":"laoYw","../dom-utils/getWindow.js":"2SkOo","../dom-utils/getDocumentElement.js":"eJ9Y1","../dom-utils/getComputedStyle.js":"3mZjB","../utils/getBasePlacement.js":"59Wp3","../utils/getVariation.js":"hIo7Y","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hIo7Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getVariation(placement) {
    return placement.split('-')[1];
}
exports.default = getVariation;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hBKsL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("../dom-utils/getWindow.js"); // eslint-disable-next-line import/no-unused-modules
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var passive = {
    passive: true
};
function effect(_ref) {
    var state = _ref.state, instance = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window = _getWindowJsDefault.default(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
    });
    if (resize) window.addEventListener('resize', instance.update, passive);
    return function() {
        if (scroll) scrollParents.forEach(function(scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
        });
        if (resize) window.removeEventListener('resize', instance.update, passive);
    };
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
};

},{"../dom-utils/getWindow.js":"2SkOo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fv5wq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getOppositePlacementJs = require("../utils/getOppositePlacement.js");
var _getOppositePlacementJsDefault = parcelHelpers.interopDefault(_getOppositePlacementJs);
var _getBasePlacementJs = require("../utils/getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _getOppositeVariationPlacementJs = require("../utils/getOppositeVariationPlacement.js");
var _getOppositeVariationPlacementJsDefault = parcelHelpers.interopDefault(_getOppositeVariationPlacementJs);
var _detectOverflowJs = require("../utils/detectOverflow.js");
var _detectOverflowJsDefault = parcelHelpers.interopDefault(_detectOverflowJs);
var _computeAutoPlacementJs = require("../utils/computeAutoPlacement.js");
var _computeAutoPlacementJsDefault = parcelHelpers.interopDefault(_computeAutoPlacementJs);
var _enumsJs = require("../enums.js");
var _getVariationJs = require("../utils/getVariation.js"); // eslint-disable-next-line import/no-unused-modules
var _getVariationJsDefault = parcelHelpers.interopDefault(_getVariationJs);
function getExpandedFallbackPlacements(placement) {
    if (_getBasePlacementJsDefault.default(placement) === _enumsJs.auto) return [];
    var oppositePlacement = _getOppositePlacementJsDefault.default(placement);
    return [
        _getOppositeVariationPlacementJsDefault.default(placement),
        oppositePlacement,
        _getOppositeVariationPlacementJsDefault.default(oppositePlacement)
    ];
}
function flip(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    if (state.modifiersData[name]._skip) return;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = _getBasePlacementJsDefault.default(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [
        _getOppositePlacementJsDefault.default(preferredPlacement)
    ] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [
        preferredPlacement
    ].concat(fallbackPlacements).reduce(function(acc, placement) {
        return acc.concat(_getBasePlacementJsDefault.default(placement) === _enumsJs.auto ? _computeAutoPlacementJsDefault.default(state, {
            placement: placement,
            boundary: boundary,
            rootBoundary: rootBoundary,
            padding: padding,
            flipVariations: flipVariations,
            allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];
    for(var i = 0; i < placements.length; i++){
        var placement1 = placements[i];
        var _basePlacement = _getBasePlacementJsDefault.default(placement1);
        var isStartVariation = _getVariationJsDefault.default(placement1) === _enumsJs.start;
        var isVertical = [
            _enumsJs.top,
            _enumsJs.bottom
        ].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = _detectOverflowJsDefault.default(state, {
            placement: placement1,
            boundary: boundary,
            rootBoundary: rootBoundary,
            altBoundary: altBoundary,
            padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? _enumsJs.right : _enumsJs.left : isStartVariation ? _enumsJs.bottom : _enumsJs.top;
        if (referenceRect[len] > popperRect[len]) mainVariationSide = _getOppositePlacementJsDefault.default(mainVariationSide);
        var altVariationSide = _getOppositePlacementJsDefault.default(mainVariationSide);
        var checks = [];
        if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
        if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        if (checks.every(function(check) {
            return check;
        })) {
            firstFittingPlacement = placement1;
            makeFallbackChecks = false;
            break;
        }
        checksMap.set(placement1, checks);
    }
    if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;
        var _loop = function _loop(_i) {
            var fittingPlacement = placements.find(function(placement) {
                var checks = checksMap.get(placement);
                if (checks) return checks.slice(0, _i).every(function(check) {
                    return check;
                });
            });
            if (fittingPlacement) {
                firstFittingPlacement = fittingPlacement;
                return "break";
            }
        };
        for(var _i1 = numberOfChecks; _i1 > 0; _i1--){
            var _ret = _loop(_i1);
            if (_ret === "break") break;
        }
    }
    if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
    }
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: [
        'offset'
    ],
    data: {
        _skip: false
    }
};

},{"../utils/getOppositePlacement.js":"a8CY0","../utils/getBasePlacement.js":"59Wp3","../utils/getOppositeVariationPlacement.js":"bKTLC","../utils/detectOverflow.js":"ltCuw","../utils/computeAutoPlacement.js":"gytMj","../enums.js":"lCAq5","../utils/getVariation.js":"hIo7Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a8CY0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
};
function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
        return hash[matched];
    });
}
exports.default = getOppositePlacement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bKTLC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var hash = {
    start: 'end',
    end: 'start'
};
function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
        return hash[matched];
    });
}
exports.default = getOppositeVariationPlacement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ltCuw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getClippingRectJs = require("../dom-utils/getClippingRect.js");
var _getClippingRectJsDefault = parcelHelpers.interopDefault(_getClippingRectJs);
var _getDocumentElementJs = require("../dom-utils/getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getBoundingClientRectJs = require("../dom-utils/getBoundingClientRect.js");
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
var _computeOffsetsJs = require("./computeOffsets.js");
var _computeOffsetsJsDefault = parcelHelpers.interopDefault(_computeOffsetsJs);
var _rectToClientRectJs = require("./rectToClientRect.js");
var _rectToClientRectJsDefault = parcelHelpers.interopDefault(_rectToClientRectJs);
var _enumsJs = require("../enums.js");
var _instanceOfJs = require("../dom-utils/instanceOf.js");
var _mergePaddingObjectJs = require("./mergePaddingObject.js");
var _mergePaddingObjectJsDefault = parcelHelpers.interopDefault(_mergePaddingObjectJs);
var _expandToHashMapJs = require("./expandToHashMap.js"); // eslint-disable-next-line import/no-unused-modules
var _expandToHashMapJsDefault = parcelHelpers.interopDefault(_expandToHashMapJs);
function detectOverflow(state, options) {
    if (options === void 0) options = {};
    var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? _enumsJs.clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? _enumsJs.viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? _enumsJs.popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = _mergePaddingObjectJsDefault.default(typeof padding !== 'number' ? padding : _expandToHashMapJsDefault.default(padding, _enumsJs.basePlacements));
    var altContext = elementContext === _enumsJs.popper ? _enumsJs.reference : _enumsJs.popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = _getClippingRectJsDefault.default(_instanceOfJs.isElement(element) ? element : element.contextElement || _getDocumentElementJsDefault.default(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = _getBoundingClientRectJsDefault.default(state.elements.reference);
    var popperOffsets = _computeOffsetsJsDefault.default({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
    });
    var popperClientRect = _rectToClientRectJsDefault.default(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === _enumsJs.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect
    var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element
    if (elementContext === _enumsJs.popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function(key) {
            var multiply = [
                _enumsJs.right,
                _enumsJs.bottom
            ].indexOf(key) >= 0 ? 1 : -1;
            var axis = [
                _enumsJs.top,
                _enumsJs.bottom
            ].indexOf(key) >= 0 ? 'y' : 'x';
            overflowOffsets[key] += offset[axis] * multiply;
        });
    }
    return overflowOffsets;
}
exports.default = detectOverflow;

},{"../dom-utils/getClippingRect.js":"eeg2s","../dom-utils/getDocumentElement.js":"eJ9Y1","../dom-utils/getBoundingClientRect.js":"9CFSQ","./computeOffsets.js":"7jtXk","./rectToClientRect.js":"cQ3tg","../enums.js":"lCAq5","../dom-utils/instanceOf.js":"gYFUC","./mergePaddingObject.js":"lEIf9","./expandToHashMap.js":"iQlH5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eeg2s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _enumsJs = require("../enums.js");
var _getViewportRectJs = require("./getViewportRect.js");
var _getViewportRectJsDefault = parcelHelpers.interopDefault(_getViewportRectJs);
var _getDocumentRectJs = require("./getDocumentRect.js");
var _getDocumentRectJsDefault = parcelHelpers.interopDefault(_getDocumentRectJs);
var _listScrollParentsJs = require("./listScrollParents.js");
var _listScrollParentsJsDefault = parcelHelpers.interopDefault(_listScrollParentsJs);
var _getOffsetParentJs = require("./getOffsetParent.js");
var _getOffsetParentJsDefault = parcelHelpers.interopDefault(_getOffsetParentJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getComputedStyleJs = require("./getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _instanceOfJs = require("./instanceOf.js");
var _getBoundingClientRectJs = require("./getBoundingClientRect.js");
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
var _getParentNodeJs = require("./getParentNode.js");
var _getParentNodeJsDefault = parcelHelpers.interopDefault(_getParentNodeJs);
var _containsJs = require("./contains.js");
var _containsJsDefault = parcelHelpers.interopDefault(_containsJs);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _rectToClientRectJs = require("../utils/rectToClientRect.js");
var _rectToClientRectJsDefault = parcelHelpers.interopDefault(_rectToClientRectJs);
var _mathJs = require("../utils/math.js");
function getInnerBoundingClientRect(element) {
    var rect = _getBoundingClientRectJsDefault.default(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === _enumsJs.viewport ? _rectToClientRectJsDefault.default(_getViewportRectJsDefault.default(element)) : _instanceOfJs.isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : _rectToClientRectJsDefault.default(_getDocumentRectJsDefault.default(_getDocumentElementJsDefault.default(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`
function getClippingParents(element) {
    var clippingParents = _listScrollParentsJsDefault.default(_getParentNodeJsDefault.default(element));
    var canEscapeClipping = [
        'absolute',
        'fixed'
    ].indexOf(_getComputedStyleJsDefault.default(element).position) >= 0;
    var clipperElement = canEscapeClipping && _instanceOfJs.isHTMLElement(element) ? _getOffsetParentJsDefault.default(element) : element;
    if (!_instanceOfJs.isElement(clipperElement)) return [];
     // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414
    return clippingParents.filter(function(clippingParent) {
        return _instanceOfJs.isElement(clippingParent) && _containsJsDefault.default(clippingParent, clipperElement) && _getNodeNameJsDefault.default(clippingParent) !== 'body';
    });
} // Gets the maximum area that the element is visible in due to any number of
function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [
        rootBoundary
    ]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function(accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent);
        accRect.top = _mathJs.max(rect.top, accRect.top);
        accRect.right = _mathJs.min(rect.right, accRect.right);
        accRect.bottom = _mathJs.min(rect.bottom, accRect.bottom);
        accRect.left = _mathJs.max(rect.left, accRect.left);
        return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
}
exports.default = getClippingRect;

},{"../enums.js":"lCAq5","./getViewportRect.js":"cnH2G","./getDocumentRect.js":"d94SC","./listScrollParents.js":"2di3T","./getOffsetParent.js":"laoYw","./getDocumentElement.js":"eJ9Y1","./getComputedStyle.js":"3mZjB","./instanceOf.js":"gYFUC","./getBoundingClientRect.js":"9CFSQ","./getParentNode.js":"bIHpd","./contains.js":"4QxRR","./getNodeName.js":"a2Qom","../utils/rectToClientRect.js":"cQ3tg","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cnH2G":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getWindowScrollBarXJs = require("./getWindowScrollBarX.js");
var _getWindowScrollBarXJsDefault = parcelHelpers.interopDefault(_getWindowScrollBarXJs);
function getViewportRect(element) {
    var win = _getWindowJsDefault.default(element);
    var html = _getDocumentElementJsDefault.default(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
    // can be obscured underneath it.
    // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
    // if it isn't open, so if this isn't available, the popper will be detected
    // to overflow the bottom of the screen too early.
    if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
        // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
        // errors due to floating point numbers, so we need to check precision.
        // Safari returns a number <= 0, usually < -1 when pinch-zoomed
        // Feature detection fails in mobile emulation mode in Chrome.
        // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
        // 0.001
        // Fallback here: "Not Safari" userAgent
        if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
        }
    }
    return {
        width: width,
        height: height,
        x: x + _getWindowScrollBarXJsDefault.default(element),
        y: y
    };
}
exports.default = getViewportRect;

},{"./getWindow.js":"2SkOo","./getDocumentElement.js":"eJ9Y1","./getWindowScrollBarX.js":"sz4Ld","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"sz4Ld":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getBoundingClientRectJs = require("./getBoundingClientRect.js");
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getWindowScrollJs = require("./getWindowScroll.js");
var _getWindowScrollJsDefault = parcelHelpers.interopDefault(_getWindowScrollJs);
function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return _getBoundingClientRectJsDefault.default(_getDocumentElementJsDefault.default(element)).left + _getWindowScrollJsDefault.default(element).scrollLeft;
}
exports.default = getWindowScrollBarX;

},{"./getBoundingClientRect.js":"9CFSQ","./getDocumentElement.js":"eJ9Y1","./getWindowScroll.js":"1XUtN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1XUtN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
function getWindowScroll(node) {
    var win = _getWindowJsDefault.default(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
    };
}
exports.default = getWindowScroll;

},{"./getWindow.js":"2SkOo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d94SC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _getComputedStyleJs = require("./getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _getWindowScrollBarXJs = require("./getWindowScrollBarX.js");
var _getWindowScrollBarXJsDefault = parcelHelpers.interopDefault(_getWindowScrollBarXJs);
var _getWindowScrollJs = require("./getWindowScroll.js");
var _getWindowScrollJsDefault = parcelHelpers.interopDefault(_getWindowScrollJs);
var _mathJs = require("../utils/math.js"); // Gets the entire size of the scrollable document area, even extending outside
function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = _getDocumentElementJsDefault.default(element);
    var winScroll = _getWindowScrollJsDefault.default(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = _mathJs.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = _mathJs.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + _getWindowScrollBarXJsDefault.default(element);
    var y = -winScroll.scrollTop;
    if (_getComputedStyleJsDefault.default(body || html).direction === 'rtl') x += _mathJs.max(html.clientWidth, body ? body.clientWidth : 0) - width;
    return {
        width: width,
        height: height,
        x: x,
        y: y
    };
}
exports.default = getDocumentRect;

},{"./getDocumentElement.js":"eJ9Y1","./getComputedStyle.js":"3mZjB","./getWindowScrollBarX.js":"sz4Ld","./getWindowScroll.js":"1XUtN","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2di3T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getScrollParentJs = require("./getScrollParent.js");
var _getScrollParentJsDefault = parcelHelpers.interopDefault(_getScrollParentJs);
var _getParentNodeJs = require("./getParentNode.js");
var _getParentNodeJsDefault = parcelHelpers.interopDefault(_getParentNodeJs);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _isScrollParentJs = require("./isScrollParent.js");
var _isScrollParentJsDefault = parcelHelpers.interopDefault(_isScrollParentJs);
function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) list = [];
    var scrollParent = _getScrollParentJsDefault.default(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = _getWindowJsDefault.default(scrollParent);
    var target = isBody ? [
        win
    ].concat(win.visualViewport || [], _isScrollParentJsDefault.default(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : updatedList.concat(listScrollParents(_getParentNodeJsDefault.default(target)));
}
exports.default = listScrollParents;

},{"./getScrollParent.js":"jy4ZS","./getParentNode.js":"bIHpd","./getWindow.js":"2SkOo","./isScrollParent.js":"9rLGO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jy4ZS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getParentNodeJs = require("./getParentNode.js");
var _getParentNodeJsDefault = parcelHelpers.interopDefault(_getParentNodeJs);
var _isScrollParentJs = require("./isScrollParent.js");
var _isScrollParentJsDefault = parcelHelpers.interopDefault(_isScrollParentJs);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _instanceOfJs = require("./instanceOf.js");
function getScrollParent(node) {
    if ([
        'html',
        'body',
        '#document'
    ].indexOf(_getNodeNameJsDefault.default(node)) >= 0) // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
    if (_instanceOfJs.isHTMLElement(node) && _isScrollParentJsDefault.default(node)) return node;
    return getScrollParent(_getParentNodeJsDefault.default(node));
}
exports.default = getScrollParent;

},{"./getParentNode.js":"bIHpd","./isScrollParent.js":"9rLGO","./getNodeName.js":"a2Qom","./instanceOf.js":"gYFUC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9rLGO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getComputedStyleJs = require("./getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = _getComputedStyleJsDefault.default(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
exports.default = isScrollParent;

},{"./getComputedStyle.js":"3mZjB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cQ3tg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function rectToClientRect(rect) {
    return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
    });
}
exports.default = rectToClientRect;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7jtXk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getBasePlacementJs = require("./getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _getVariationJs = require("./getVariation.js");
var _getVariationJsDefault = parcelHelpers.interopDefault(_getVariationJs);
var _getMainAxisFromPlacementJs = require("./getMainAxisFromPlacement.js");
var _getMainAxisFromPlacementJsDefault = parcelHelpers.interopDefault(_getMainAxisFromPlacementJs);
var _enumsJs = require("../enums.js");
function computeOffsets(_ref) {
    var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? _getBasePlacementJsDefault.default(placement) : null;
    var variation = placement ? _getVariationJsDefault.default(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;
    switch(basePlacement){
        case _enumsJs.top:
            offsets = {
                x: commonX,
                y: reference.y - element.height
            };
            break;
        case _enumsJs.bottom:
            offsets = {
                x: commonX,
                y: reference.y + reference.height
            };
            break;
        case _enumsJs.right:
            offsets = {
                x: reference.x + reference.width,
                y: commonY
            };
            break;
        case _enumsJs.left:
            offsets = {
                x: reference.x - element.width,
                y: commonY
            };
            break;
        default:
            offsets = {
                x: reference.x,
                y: reference.y
            };
    }
    var mainAxis = basePlacement ? _getMainAxisFromPlacementJsDefault.default(basePlacement) : null;
    if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';
        switch(variation){
            case _enumsJs.start:
                offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
                break;
            case _enumsJs.end:
                offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
                break;
            default:
        }
    }
    return offsets;
}
exports.default = computeOffsets;

},{"./getBasePlacement.js":"59Wp3","./getVariation.js":"hIo7Y","./getMainAxisFromPlacement.js":"1Xlom","../enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gytMj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getVariationJs = require("./getVariation.js");
var _getVariationJsDefault = parcelHelpers.interopDefault(_getVariationJs);
var _enumsJs = require("../enums.js");
var _detectOverflowJs = require("./detectOverflow.js");
var _detectOverflowJsDefault = parcelHelpers.interopDefault(_detectOverflowJs);
var _getBasePlacementJs = require("./getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
function computeAutoPlacement(state, options) {
    if (options === void 0) options = {};
    var _options = options, placement1 = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enumsJs.placements : _options$allowedAutoP;
    var variation = _getVariationJsDefault.default(placement1);
    var placements = variation ? flipVariations ? _enumsJs.variationPlacements : _enumsJs.variationPlacements.filter(function(placement) {
        return _getVariationJsDefault.default(placement) === variation;
    }) : _enumsJs.basePlacements;
    var allowedPlacements = placements.filter(function(placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
    });
    if (allowedPlacements.length === 0) {
        allowedPlacements = placements;
        console.error([
            'Popper: The `allowedAutoPlacements` option did not allow any',
            'placements. Ensure the `placement` option matches the variation',
            'of the allowed placements.',
            'For example, "auto" cannot be used to allow "bottom-start".',
            'Use "auto-start" instead.'
        ].join(' '));
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...
    var overflows = allowedPlacements.reduce(function(acc, placement) {
        acc[placement] = _detectOverflowJsDefault.default(state, {
            placement: placement,
            boundary: boundary,
            rootBoundary: rootBoundary,
            padding: padding
        })[_getBasePlacementJsDefault.default(placement)];
        return acc;
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
        return overflows[a] - overflows[b];
    });
}
exports.default = computeAutoPlacement;

},{"./getVariation.js":"hIo7Y","../enums.js":"lCAq5","./detectOverflow.js":"ltCuw","./getBasePlacement.js":"59Wp3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2g4OF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _enumsJs = require("../enums.js");
var _detectOverflowJs = require("../utils/detectOverflow.js");
var _detectOverflowJsDefault = parcelHelpers.interopDefault(_detectOverflowJs);
function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) preventedOffsets = {
        x: 0,
        y: 0
    };
    return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
    };
}
function isAnySideFullyClipped(overflow) {
    return [
        _enumsJs.top,
        _enumsJs.right,
        _enumsJs.bottom,
        _enumsJs.left
    ].some(function(side) {
        return overflow[side] >= 0;
    });
}
function hide(_ref) {
    var state = _ref.state, name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = _detectOverflowJsDefault.default(state, {
        elementContext: 'reference'
    });
    var popperAltOverflow = _detectOverflowJsDefault.default(state, {
        altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
    });
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: [
        'preventOverflow'
    ],
    fn: hide
};

},{"../enums.js":"lCAq5","../utils/detectOverflow.js":"ltCuw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3GKVY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "distanceAndSkiddingToXY", ()=>distanceAndSkiddingToXY
);
var _getBasePlacementJs = require("../utils/getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _enumsJs = require("../enums.js"); // eslint-disable-next-line import/no-unused-modules
function distanceAndSkiddingToXY(placement, rects, offset1) {
    var basePlacement = _getBasePlacementJsDefault.default(placement);
    var invertDistance = [
        _enumsJs.left,
        _enumsJs.top
    ].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset1 === 'function' ? offset1(Object.assign({}, rects, {
        placement: placement
    })) : offset1, skidding = _ref[0], distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [
        _enumsJs.left,
        _enumsJs.right
    ].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
    } : {
        x: skidding,
        y: distance
    };
}
function offset(_ref2) {
    var state = _ref2.state, options = _ref2.options, name = _ref2.name;
    var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [
        0,
        0
    ] : _options$offset;
    var data = _enumsJs.placements.reduce(function(acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
        return acc;
    }, {});
    var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: [
        'popperOffsets'
    ],
    fn: offset
};

},{"../utils/getBasePlacement.js":"59Wp3","../enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6I679":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _computeOffsetsJs = require("../utils/computeOffsets.js");
var _computeOffsetsJsDefault = parcelHelpers.interopDefault(_computeOffsetsJs);
function popperOffsets(_ref) {
    var state = _ref.state, name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = _computeOffsetsJsDefault.default({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
    });
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
};

},{"../utils/computeOffsets.js":"7jtXk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1AMhb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _enumsJs = require("../enums.js");
var _getBasePlacementJs = require("../utils/getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _getMainAxisFromPlacementJs = require("../utils/getMainAxisFromPlacement.js");
var _getMainAxisFromPlacementJsDefault = parcelHelpers.interopDefault(_getMainAxisFromPlacementJs);
var _getAltAxisJs = require("../utils/getAltAxis.js");
var _getAltAxisJsDefault = parcelHelpers.interopDefault(_getAltAxisJs);
var _withinJs = require("../utils/within.js");
var _getLayoutRectJs = require("../dom-utils/getLayoutRect.js");
var _getLayoutRectJsDefault = parcelHelpers.interopDefault(_getLayoutRectJs);
var _getOffsetParentJs = require("../dom-utils/getOffsetParent.js");
var _getOffsetParentJsDefault = parcelHelpers.interopDefault(_getOffsetParentJs);
var _detectOverflowJs = require("../utils/detectOverflow.js");
var _detectOverflowJsDefault = parcelHelpers.interopDefault(_detectOverflowJs);
var _getVariationJs = require("../utils/getVariation.js");
var _getVariationJsDefault = parcelHelpers.interopDefault(_getVariationJs);
var _getFreshSideObjectJs = require("../utils/getFreshSideObject.js");
var _getFreshSideObjectJsDefault = parcelHelpers.interopDefault(_getFreshSideObjectJs);
var _mathJs = require("../utils/math.js");
function preventOverflow(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = _detectOverflowJsDefault.default(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
    });
    var basePlacement = _getBasePlacementJsDefault.default(state.placement);
    var variation = _getVariationJsDefault.default(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = _getMainAxisFromPlacementJsDefault.default(basePlacement);
    var altAxis = _getAltAxisJsDefault.default(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
    } : Object.assign({
        mainAxis: 0,
        altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
        x: 0,
        y: 0
    };
    if (!popperOffsets) return;
    if (checkMainAxis) {
        var _offsetModifierState$;
        var mainSide = mainAxis === 'y' ? _enumsJs.top : _enumsJs.left;
        var altSide = mainAxis === 'y' ? _enumsJs.bottom : _enumsJs.right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min = offset + overflow[mainSide];
        var max = offset - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === _enumsJs.start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === _enumsJs.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds
        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? _getLayoutRectJsDefault.default(arrowElement) : {
            width: 0,
            height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : _getFreshSideObjectJsDefault.default();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)
        var arrowLen = _withinJs.within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && _getOffsetParentJsDefault.default(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset + maxOffset - offsetModifierValue;
        var preventedOffset = _withinJs.within(tether ? _mathJs.min(min, tetherMin) : min, offset, tether ? _mathJs.max(max, tetherMax) : max);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
    }
    if (checkAltAxis) {
        var _offsetModifierState$2;
        var _mainSide = mainAxis === 'x' ? _enumsJs.top : _enumsJs.left;
        var _altSide = mainAxis === 'x' ? _enumsJs.bottom : _enumsJs.right;
        var _offset = popperOffsets[altAxis];
        var _len = altAxis === 'y' ? 'height' : 'width';
        var _min = _offset + overflow[_mainSide];
        var _max = _offset - overflow[_altSide];
        var isOriginSide = [
            _enumsJs.top,
            _enumsJs.left
        ].indexOf(basePlacement) !== -1;
        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
        var _preventedOffset = tether && isOriginSide ? _withinJs.withinMaxClamp(_tetherMin, _offset, _tetherMax) : _withinJs.within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
    }
    state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules
exports.default = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: [
        'offset'
    ]
};

},{"../enums.js":"lCAq5","../utils/getBasePlacement.js":"59Wp3","../utils/getMainAxisFromPlacement.js":"1Xlom","../utils/getAltAxis.js":"59FWE","../utils/within.js":"3glSz","../dom-utils/getLayoutRect.js":"jvjuf","../dom-utils/getOffsetParent.js":"laoYw","../utils/detectOverflow.js":"ltCuw","../utils/getVariation.js":"hIo7Y","../utils/getFreshSideObject.js":"g4xOt","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"59FWE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
}
exports.default = getAltAxis;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cHuNp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "popperGenerator", ()=>popperGenerator
);
parcelHelpers.export(exports, "createPopper", ()=>createPopper
);
parcelHelpers.export(exports, "detectOverflow", ()=>_detectOverflowJsDefault.default
);
var _getCompositeRectJs = require("./dom-utils/getCompositeRect.js");
var _getCompositeRectJsDefault = parcelHelpers.interopDefault(_getCompositeRectJs);
var _getLayoutRectJs = require("./dom-utils/getLayoutRect.js");
var _getLayoutRectJsDefault = parcelHelpers.interopDefault(_getLayoutRectJs);
var _listScrollParentsJs = require("./dom-utils/listScrollParents.js");
var _listScrollParentsJsDefault = parcelHelpers.interopDefault(_listScrollParentsJs);
var _getOffsetParentJs = require("./dom-utils/getOffsetParent.js");
var _getOffsetParentJsDefault = parcelHelpers.interopDefault(_getOffsetParentJs);
var _getComputedStyleJs = require("./dom-utils/getComputedStyle.js");
var _getComputedStyleJsDefault = parcelHelpers.interopDefault(_getComputedStyleJs);
var _orderModifiersJs = require("./utils/orderModifiers.js");
var _orderModifiersJsDefault = parcelHelpers.interopDefault(_orderModifiersJs);
var _debounceJs = require("./utils/debounce.js");
var _debounceJsDefault = parcelHelpers.interopDefault(_debounceJs);
var _validateModifiersJs = require("./utils/validateModifiers.js");
var _validateModifiersJsDefault = parcelHelpers.interopDefault(_validateModifiersJs);
var _uniqueByJs = require("./utils/uniqueBy.js");
var _uniqueByJsDefault = parcelHelpers.interopDefault(_uniqueByJs);
var _getBasePlacementJs = require("./utils/getBasePlacement.js");
var _getBasePlacementJsDefault = parcelHelpers.interopDefault(_getBasePlacementJs);
var _mergeByNameJs = require("./utils/mergeByName.js");
var _mergeByNameJsDefault = parcelHelpers.interopDefault(_mergeByNameJs);
var _detectOverflowJs = require("./utils/detectOverflow.js");
var _detectOverflowJsDefault = parcelHelpers.interopDefault(_detectOverflowJs);
var _instanceOfJs = require("./dom-utils/instanceOf.js");
var _enumsJs = require("./enums.js");
var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
};
function areValidElements() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
    return !args.some(function(element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
    });
}
function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) generatorOptions = {};
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference1, popper1, options1) {
        if (options1 === void 0) options1 = defaultOptions;
        var state1 = {
            placement: 'bottom',
            orderedModifiers: [],
            options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
            modifiersData: {},
            elements: {
                reference: reference1,
                popper: popper1
            },
            attributes: {},
            styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
            state: state1,
            setOptions: function setOptions(setOptionsAction) {
                var options = typeof setOptionsAction === 'function' ? setOptionsAction(state1.options) : setOptionsAction;
                cleanupModifierEffects();
                state1.options = Object.assign({}, defaultOptions, state1.options, options);
                state1.scrollParents = {
                    reference: _instanceOfJs.isElement(reference1) ? _listScrollParentsJsDefault.default(reference1) : reference1.contextElement ? _listScrollParentsJsDefault.default(reference1.contextElement) : [],
                    popper: _listScrollParentsJsDefault.default(popper1)
                }; // Orders the modifiers based on their dependencies and `phase`
                // properties
                var orderedModifiers = _orderModifiersJsDefault.default(_mergeByNameJsDefault.default([].concat(defaultModifiers, state1.options.modifiers))); // Strip out disabled modifiers
                state1.orderedModifiers = orderedModifiers.filter(function(m) {
                    return m.enabled;
                }); // Validate the provided modifiers so that the consumer will get warned
                var modifiers = _uniqueByJsDefault.default([].concat(orderedModifiers, state1.options.modifiers), function(_ref) {
                    var name = _ref.name;
                    return name;
                });
                _validateModifiersJsDefault.default(modifiers);
                if (_getBasePlacementJsDefault.default(state1.options.placement) === _enumsJs.auto) {
                    var flipModifier = state1.orderedModifiers.find(function(_ref2) {
                        var name = _ref2.name;
                        return name === 'flip';
                    });
                    if (!flipModifier) console.error([
                        'Popper: "auto" placements require the "flip" modifier be',
                        'present and enabled to work.'
                    ].join(' '));
                }
                var _getComputedStyle = _getComputedStyleJsDefault.default(popper1), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
                // cause bugs with positioning, so we'll warn the consumer
                if ([
                    marginTop,
                    marginRight,
                    marginBottom,
                    marginLeft
                ].some(function(margin) {
                    return parseFloat(margin);
                })) console.warn([
                    'Popper: CSS "margin" styles cannot be used to apply padding',
                    'between the popper and its reference element or boundary.',
                    'To replicate margin, use the `offset` modifier, as well as',
                    'the `padding` option in the `preventOverflow` and `flip`',
                    'modifiers.'
                ].join(' '));
                runModifierEffects();
                return instance.update();
            },
            // Sync update – it will always be executed, even if not necessary. This
            // is useful for low frequency updates where sync behavior simplifies the
            // logic.
            // For high frequency updates (e.g. `resize` and `scroll` events), always
            // prefer the async Popper#update method
            forceUpdate: function forceUpdate() {
                if (isDestroyed) return;
                var _state$elements = state1.elements, reference = _state$elements.reference, popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
                // anymore
                if (!areValidElements(reference, popper)) {
                    console.error(INVALID_ELEMENT_ERROR);
                    return;
                } // Store the reference and popper rects to be read by modifiers
                state1.rects = {
                    reference: _getCompositeRectJsDefault.default(reference, _getOffsetParentJsDefault.default(popper), state1.options.strategy === 'fixed'),
                    popper: _getLayoutRectJsDefault.default(popper)
                }; // Modifiers have the ability to reset the current update cycle. The
                // most common use case for this is the `flip` modifier changing the
                // placement, which then needs to re-run all the modifiers, because the
                // logic was previously ran for the previous placement and is therefore
                // stale/incorrect
                state1.reset = false;
                state1.placement = state1.options.placement; // On each update cycle, the `modifiersData` property for each modifier
                // is filled with the initial data specified by the modifier. This means
                // it doesn't persist and is fresh on each update.
                // To ensure persistent data, use `${name}#persistent`
                state1.orderedModifiers.forEach(function(modifier) {
                    return state1.modifiersData[modifier.name] = Object.assign({}, modifier.data);
                });
                var __debug_loops__ = 0;
                for(var index = 0; index < state1.orderedModifiers.length; index++){
                    __debug_loops__ += 1;
                    if (__debug_loops__ > 100) {
                        console.error(INFINITE_LOOP_ERROR);
                        break;
                    }
                    if (state1.reset === true) {
                        state1.reset = false;
                        index = -1;
                        continue;
                    }
                    var _state$orderedModifie = state1.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                    if (typeof fn === 'function') state1 = fn({
                        state: state1,
                        options: _options,
                        name: name,
                        instance: instance
                    }) || state1;
                }
            },
            // Async and optimistically optimized update – it will not be executed if
            // not necessary (debounced to run at most once-per-tick)
            update: _debounceJsDefault.default(function() {
                return new Promise(function(resolve) {
                    instance.forceUpdate();
                    resolve(state1);
                });
            }),
            destroy: function destroy() {
                cleanupModifierEffects();
                isDestroyed = true;
            }
        };
        if (!areValidElements(reference1, popper1)) {
            console.error(INVALID_ELEMENT_ERROR);
            return instance;
        }
        instance.setOptions(options1).then(function(state) {
            if (!isDestroyed && options1.onFirstUpdate) options1.onFirstUpdate(state);
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.
        function runModifierEffects() {
            state1.orderedModifiers.forEach(function(_ref3) {
                var name = _ref3.name, _ref3$options = _ref3.options, options = _ref3$options === void 0 ? {} : _ref3$options, effect = _ref3.effect;
                if (typeof effect === 'function') {
                    var cleanupFn = effect({
                        state: state1,
                        name: name,
                        instance: instance,
                        options: options
                    });
                    var noopFn = function noopFn() {};
                    effectCleanupFns.push(cleanupFn || noopFn);
                }
            });
        }
        function cleanupModifierEffects() {
            effectCleanupFns.forEach(function(fn) {
                return fn();
            });
            effectCleanupFns = [];
        }
        return instance;
    };
}
var createPopper = /*#__PURE__*/ popperGenerator(); // eslint-disable-next-line import/no-unused-modules

},{"./dom-utils/getCompositeRect.js":"ijPls","./dom-utils/getLayoutRect.js":"jvjuf","./dom-utils/listScrollParents.js":"2di3T","./dom-utils/getOffsetParent.js":"laoYw","./dom-utils/getComputedStyle.js":"3mZjB","./utils/orderModifiers.js":"N0VO0","./utils/debounce.js":"g6Chr","./utils/validateModifiers.js":"1S5dQ","./utils/uniqueBy.js":"hhl2M","./utils/getBasePlacement.js":"59Wp3","./utils/mergeByName.js":"2zTVN","./utils/detectOverflow.js":"ltCuw","./dom-utils/instanceOf.js":"gYFUC","./enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ijPls":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getBoundingClientRectJs = require("./getBoundingClientRect.js");
var _getBoundingClientRectJsDefault = parcelHelpers.interopDefault(_getBoundingClientRectJs);
var _getNodeScrollJs = require("./getNodeScroll.js");
var _getNodeScrollJsDefault = parcelHelpers.interopDefault(_getNodeScrollJs);
var _getNodeNameJs = require("./getNodeName.js");
var _getNodeNameJsDefault = parcelHelpers.interopDefault(_getNodeNameJs);
var _instanceOfJs = require("./instanceOf.js");
var _getWindowScrollBarXJs = require("./getWindowScrollBarX.js");
var _getWindowScrollBarXJsDefault = parcelHelpers.interopDefault(_getWindowScrollBarXJs);
var _getDocumentElementJs = require("./getDocumentElement.js");
var _getDocumentElementJsDefault = parcelHelpers.interopDefault(_getDocumentElementJs);
var _isScrollParentJs = require("./isScrollParent.js");
var _isScrollParentJsDefault = parcelHelpers.interopDefault(_isScrollParentJs);
var _mathJs = require("../utils/math.js");
function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = _mathJs.round(rect.width) / element.offsetWidth || 1;
    var scaleY = _mathJs.round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) isFixed = false;
    var isOffsetParentAnElement = _instanceOfJs.isHTMLElement(offsetParent);
    var offsetParentIsScaled = _instanceOfJs.isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = _getDocumentElementJsDefault.default(offsetParent);
    var rect = _getBoundingClientRectJsDefault.default(elementOrVirtualElement, offsetParentIsScaled);
    var scroll = {
        scrollLeft: 0,
        scrollTop: 0
    };
    var offsets = {
        x: 0,
        y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (_getNodeNameJsDefault.default(offsetParent) !== 'body' || _isScrollParentJsDefault.default(documentElement)) scroll = _getNodeScrollJsDefault.default(offsetParent);
        if (_instanceOfJs.isHTMLElement(offsetParent)) {
            offsets = _getBoundingClientRectJsDefault.default(offsetParent, true);
            offsets.x += offsetParent.clientLeft;
            offsets.y += offsetParent.clientTop;
        } else if (documentElement) offsets.x = _getWindowScrollBarXJsDefault.default(documentElement);
    }
    return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
    };
}
exports.default = getCompositeRect;

},{"./getBoundingClientRect.js":"9CFSQ","./getNodeScroll.js":"bBjCr","./getNodeName.js":"a2Qom","./instanceOf.js":"gYFUC","./getWindowScrollBarX.js":"sz4Ld","./getDocumentElement.js":"eJ9Y1","./isScrollParent.js":"9rLGO","../utils/math.js":"gQqVe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bBjCr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getWindowScrollJs = require("./getWindowScroll.js");
var _getWindowScrollJsDefault = parcelHelpers.interopDefault(_getWindowScrollJs);
var _getWindowJs = require("./getWindow.js");
var _getWindowJsDefault = parcelHelpers.interopDefault(_getWindowJs);
var _instanceOfJs = require("./instanceOf.js");
var _getHTMLElementScrollJs = require("./getHTMLElementScroll.js");
var _getHTMLElementScrollJsDefault = parcelHelpers.interopDefault(_getHTMLElementScrollJs);
function getNodeScroll(node) {
    if (node === _getWindowJsDefault.default(node) || !_instanceOfJs.isHTMLElement(node)) return _getWindowScrollJsDefault.default(node);
    else return _getHTMLElementScrollJsDefault.default(node);
}
exports.default = getNodeScroll;

},{"./getWindowScroll.js":"1XUtN","./getWindow.js":"2SkOo","./instanceOf.js":"gYFUC","./getHTMLElementScroll.js":"6pwY2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6pwY2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getHTMLElementScroll(element) {
    return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
    };
}
exports.default = getHTMLElementScroll;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"N0VO0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _enumsJs = require("../enums.js"); // source: https://stackoverflow.com/questions/49875255
function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
        map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively
    function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function(dep) {
            if (!visited.has(dep)) {
                var depModifier = map.get(dep);
                if (depModifier) sort(depModifier);
            }
        });
        result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
        if (!visited.has(modifier.name)) // check for visited object
        sort(modifier);
    });
    return result;
}
function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase
    return _enumsJs.modifierPhases.reduce(function(acc, phase) {
        return acc.concat(orderedModifiers.filter(function(modifier) {
            return modifier.phase === phase;
        }));
    }, []);
}
exports.default = orderModifiers;

},{"../enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g6Chr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function debounce(fn) {
    var pending;
    return function() {
        if (!pending) pending = new Promise(function(resolve) {
            Promise.resolve().then(function() {
                pending = undefined;
                resolve(fn());
            });
        });
        return pending;
    };
}
exports.default = debounce;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1S5dQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _formatJs = require("./format.js");
var _formatJsDefault = parcelHelpers.interopDefault(_formatJs);
var _enumsJs = require("../enums.js");
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = [
    'name',
    'enabled',
    'phase',
    'fn',
    'effect',
    'requires',
    'options'
];
function validateModifiers(modifiers) {
    modifiers.forEach(function(modifier) {
        [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
        .filter(function(value, index, self) {
            return self.indexOf(value) === index;
        }).forEach(function(key) {
            switch(key){
                case 'name':
                    if (typeof modifier.name !== 'string') console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
                    break;
                case 'enabled':
                    if (typeof modifier.enabled !== 'boolean') console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
                    break;
                case 'phase':
                    if (_enumsJs.modifierPhases.indexOf(modifier.phase) < 0) console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enumsJs.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
                    break;
                case 'fn':
                    if (typeof modifier.fn !== 'function') console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
                    break;
                case 'effect':
                    if (modifier.effect != null && typeof modifier.effect !== 'function') console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
                    break;
                case 'requires':
                    if (modifier.requires != null && !Array.isArray(modifier.requires)) console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
                    break;
                case 'requiresIfExists':
                    if (!Array.isArray(modifier.requiresIfExists)) console.error(_formatJsDefault.default(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
                    break;
                case 'options':
                case 'data':
                    break;
                default:
                    console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function(s) {
                        return "\"" + s + "\"";
                    }).join(', ') + "; but \"" + key + "\" was provided.");
            }
            modifier.requires && modifier.requires.forEach(function(requirement) {
                if (modifiers.find(function(mod) {
                    return mod.name === requirement;
                }) == null) console.error(_formatJsDefault.default(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
            });
        });
    });
}
exports.default = validateModifiers;

},{"./format.js":"baNIW","../enums.js":"lCAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"baNIW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function format(str) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
    return [].concat(args).reduce(function(p, c) {
        return p.replace(/%s/, c);
    }, str);
}
exports.default = format;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hhl2M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function uniqueBy(arr, fn) {
    var identifiers = new Set();
    return arr.filter(function(item) {
        var identifier = fn(item);
        if (!identifiers.has(identifier)) {
            identifiers.add(identifier);
            return true;
        }
    });
}
exports.default = uniqueBy;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2zTVN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function mergeByName(modifiers) {
    var merged1 = modifiers.reduce(function(merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
            options: Object.assign({}, existing.options, current.options),
            data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
    }, {}); // IE11 does not support Object.values
    return Object.keys(merged1).map(function(key) {
        return merged1[key];
    });
}
exports.default = mergeByName;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1PuRF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createPopper", ()=>createPopper
) // eslint-disable-next-line import/no-unused-modules
;
parcelHelpers.export(exports, "popperGenerator", ()=>_createPopperJs.popperGenerator
);
parcelHelpers.export(exports, "defaultModifiers", ()=>defaultModifiers
);
parcelHelpers.export(exports, "detectOverflow", ()=>_createPopperJs.detectOverflow
);
parcelHelpers.export(exports, "createPopperLite", ()=>_popperLiteJs.createPopper
) // eslint-disable-next-line import/no-unused-modules
;
var _createPopperJs = require("./createPopper.js");
var _eventListenersJs = require("./modifiers/eventListeners.js");
var _eventListenersJsDefault = parcelHelpers.interopDefault(_eventListenersJs);
var _popperOffsetsJs = require("./modifiers/popperOffsets.js");
var _popperOffsetsJsDefault = parcelHelpers.interopDefault(_popperOffsetsJs);
var _computeStylesJs = require("./modifiers/computeStyles.js");
var _computeStylesJsDefault = parcelHelpers.interopDefault(_computeStylesJs);
var _applyStylesJs = require("./modifiers/applyStyles.js");
var _applyStylesJsDefault = parcelHelpers.interopDefault(_applyStylesJs);
var _offsetJs = require("./modifiers/offset.js");
var _offsetJsDefault = parcelHelpers.interopDefault(_offsetJs);
var _flipJs = require("./modifiers/flip.js");
var _flipJsDefault = parcelHelpers.interopDefault(_flipJs);
var _preventOverflowJs = require("./modifiers/preventOverflow.js");
var _preventOverflowJsDefault = parcelHelpers.interopDefault(_preventOverflowJs);
var _arrowJs = require("./modifiers/arrow.js");
var _arrowJsDefault = parcelHelpers.interopDefault(_arrowJs);
var _hideJs = require("./modifiers/hide.js");
var _hideJsDefault = parcelHelpers.interopDefault(_hideJs);
var _popperLiteJs = require("./popper-lite.js");
var _indexJs = require("./modifiers/index.js");
parcelHelpers.exportAll(_indexJs, exports);
var defaultModifiers = [
    _eventListenersJsDefault.default,
    _popperOffsetsJsDefault.default,
    _computeStylesJsDefault.default,
    _applyStylesJsDefault.default,
    _offsetJsDefault.default,
    _flipJsDefault.default,
    _preventOverflowJsDefault.default,
    _arrowJsDefault.default,
    _hideJsDefault.default
];
var createPopper = /*#__PURE__*/ _createPopperJs.popperGenerator({
    defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

},{"./createPopper.js":"cHuNp","./modifiers/eventListeners.js":"hBKsL","./modifiers/popperOffsets.js":"6I679","./modifiers/computeStyles.js":"gDlm2","./modifiers/applyStyles.js":"4iMn4","./modifiers/offset.js":"3GKVY","./modifiers/flip.js":"fv5wq","./modifiers/preventOverflow.js":"1AMhb","./modifiers/arrow.js":"31HFW","./modifiers/hide.js":"2g4OF","./popper-lite.js":false,"./modifiers/index.js":"cap3W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2jedY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function codeComponent() {
    return {};
}
exports.default = codeComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1HiHq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tippy = require("~/app/assets/lookbook/js/lib/tippy");
var _tippyDefault = parcelHelpers.interopDefault(_tippy);
var _component = require("../button/component");
var _componentDefault = parcelHelpers.interopDefault(_component);
function copyButtonComponent(target = null) {
    const button = _componentDefault.default();
    return {
        ...button,
        done: false,
        init () {
            button.init.bind(this)();
            if (target === null) this._copyTarget = this.$refs.copyContent;
            else this._copyTarget = typeof target === "string" ? document.querySelector(target) : target;
            this._notificationTippy = _tippyDefault.default(this.$el, {
                content: "Copied!",
                trigger: "manual"
            });
        },
        async copyToClipboard () {
            await window.navigator.clipboard.writeText(this.getContent());
            this.done = true;
            this._notificationTippy.show();
            this._labelTippy.hide();
            setTimeout(()=>{
                this.done = false;
                this._notificationTippy.hide();
            }, 1000);
        },
        getContent () {
            const decoder = document.createElement("textarea");
            decoder.innerHTML = this._copyTarget ? this._copyTarget.innerHTML : "";
            return decoder.value.trim();
        },
        _copyTarget: null,
        _notificationTippy: null
    };
}
exports.default = copyButtonComponent;

},{"~/app/assets/lookbook/js/lib/tippy":"6zhil","../button/component":"lQApy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kFxrd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function dimensionsDisplayComponent(targetSelector) {
    return {
        width: 0,
        height: 0,
        resizing: false,
        init () {
            const target = document.querySelector(targetSelector);
            this.width = Math.round(target.clientWidth);
            this.height = Math.round(target.clientHeight);
            this.createObserver();
        },
        createObserver () {
            this.observer = new ResizeObserver((entries)=>{
                const rect = entries[0].contentRect;
                this.width = Math.round(rect.width);
                this.height = Math.round(rect.height);
            });
            console.log(document.querySelector(targetSelector));
            this.observer.observe(document.querySelector(targetSelector));
        },
        tearDown () {
            this.observer.disconnect();
        }
    };
}
exports.default = dimensionsDisplayComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hM4Uf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iframeResizer = require("iframe-resizer/js/iframeResizer");
function embedComponent(id, embedStore) {
    if (!embedStore[id]) embedStore[id] = {
        width: "100%",
        height: "100%"
    };
    return {
        tab: "preview",
        resizer: null,
        get store () {
            return embedStore[id];
        },
        async loadResizer () {
            window.iFrameResize({
                heightCalculationMethod: "lowestElement"
            }, this.$el.querySelector("iframe"));
            this.resizer = this.$el.querySelector("iframe").iFrameResizer;
            this.resizer.resize();
        },
        resizeIframe (width) {
            this.store.width = width;
            this.$el.querySelector("iframe").iFrameResizer.resize();
        }
    };
}
exports.default = embedComponent;

},{"iframe-resizer/js/iframeResizer":"l3td4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l3td4":[function(require,module,exports) {
(function(undefined) {
    if (typeof window === 'undefined') return; // don't run for server side render
    var count = 0, logEnabled = false, hiddenCheckEnabled = false, msgHeader = 'message', msgHeaderLen = msgHeader.length, msgId = '[iFrameSizer]', msgIdLen = msgId.length, pagePosition = null, requestAnimationFrame = window.requestAnimationFrame, resetRequiredMethods = {
        max: 1,
        scroll: 1,
        bodyScroll: 1,
        documentElementScroll: 1
    }, settings = {}, timer = null, defaults = {
        autoResize: true,
        bodyBackground: null,
        bodyMargin: null,
        bodyMarginV1: 8,
        bodyPadding: null,
        checkOrigin: true,
        inPageLinks: false,
        enablePublicMethods: true,
        heightCalculationMethod: 'bodyOffset',
        id: 'iFrameResizer',
        interval: 32,
        log: false,
        maxHeight: Infinity,
        maxWidth: Infinity,
        minHeight: 0,
        minWidth: 0,
        mouseEvents: true,
        resizeFrom: 'parent',
        scrolling: false,
        sizeHeight: true,
        sizeWidth: false,
        warningTimeout: 5000,
        tolerance: 0,
        widthCalculationMethod: 'scroll',
        onClose: function() {
            return true;
        },
        onClosed: function() {},
        onInit: function() {},
        onMessage: function() {
            warn('onMessage function not defined');
        },
        onMouseEnter: function() {},
        onMouseLeave: function() {},
        onResized: function() {},
        onScroll: function() {
            return true;
        }
    };
    function getMutationObserver() {
        return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    }
    function addEventListener(el, evt, func) {
        el.addEventListener(evt, func, false);
    }
    function removeEventListener(el, evt, func) {
        el.removeEventListener(evt, func, false);
    }
    function setupRequestAnimationFrame() {
        var vendors = [
            'moz',
            'webkit',
            'o',
            'ms'
        ];
        var x;
        // Remove vendor prefixing if prefixed and break early if not
        for(x = 0; x < vendors.length && !requestAnimationFrame; x += 1)requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        if (!requestAnimationFrame) log('setup', 'RequestAnimationFrame not supported');
        else // Firefox extension content-scripts have a globalThis object that is not the same as window.
        // Binding `requestAnimationFrame` to window allows the function to work and prevents errors
        // being thrown when run in that context, and should be a no-op in every other context.
        requestAnimationFrame = requestAnimationFrame.bind(window);
    }
    function getMyID(iframeId) {
        var retStr = 'Host page: ' + iframeId;
        if (window.top !== window.self) retStr = window.parentIFrame && window.parentIFrame.getId ? window.parentIFrame.getId() + ': ' + iframeId : 'Nested host page: ' + iframeId;
        return retStr;
    }
    function formatLogHeader(iframeId) {
        return msgId + '[' + getMyID(iframeId) + ']';
    }
    function isLogEnabled(iframeId) {
        return settings[iframeId] ? settings[iframeId].log : logEnabled;
    }
    function log(iframeId, msg) {
        output('log', iframeId, msg, isLogEnabled(iframeId));
    }
    function info(iframeId, msg) {
        output('info', iframeId, msg, isLogEnabled(iframeId));
    }
    function warn(iframeId, msg) {
        output('warn', iframeId, msg, true);
    }
    function output(type, iframeId, msg, enabled) {
        if (true === enabled && 'object' === typeof window.console) // eslint-disable-next-line no-console
        console[type](formatLogHeader(iframeId), msg);
    }
    function iFrameListener(event1) {
        function resizeIFrame() {
            function resize() {
                setSize(messageData);
                setPagePosition(iframeId1);
                on('onResized', messageData);
            }
            ensureInRange('Height');
            ensureInRange('Width');
            syncResize(resize, messageData, 'init');
        }
        function processMsg() {
            var data = msg.substr(msgIdLen).split(':');
            var height = data[1] ? parseInt(data[1], 10) : 0;
            var iframe = settings[data[0]] && settings[data[0]].iframe;
            var compStyle = getComputedStyle(iframe);
            return {
                iframe: iframe,
                id: data[0],
                height: height + getPaddingEnds(compStyle) + getBorderEnds(compStyle),
                width: data[2],
                type: data[3]
            };
        }
        function getPaddingEnds(compStyle) {
            if (compStyle.boxSizing !== 'border-box') return 0;
            var top = compStyle.paddingTop ? parseInt(compStyle.paddingTop, 10) : 0;
            var bot = compStyle.paddingBottom ? parseInt(compStyle.paddingBottom, 10) : 0;
            return top + bot;
        }
        function getBorderEnds(compStyle) {
            if (compStyle.boxSizing !== 'border-box') return 0;
            var top = compStyle.borderTopWidth ? parseInt(compStyle.borderTopWidth, 10) : 0;
            var bot = compStyle.borderBottomWidth ? parseInt(compStyle.borderBottomWidth, 10) : 0;
            return top + bot;
        }
        function ensureInRange(Dimension) {
            var max = Number(settings[iframeId1]['max' + Dimension]), min = Number(settings[iframeId1]['min' + Dimension]), dimension = Dimension.toLowerCase(), size = Number(messageData[dimension]);
            log(iframeId1, 'Checking ' + dimension + ' is in range ' + min + '-' + max);
            if (size < min) {
                size = min;
                log(iframeId1, 'Set ' + dimension + ' to min value');
            }
            if (size > max) {
                size = max;
                log(iframeId1, 'Set ' + dimension + ' to max value');
            }
            messageData[dimension] = '' + size;
        }
        function isMessageFromIFrame() {
            function checkAllowedOrigin() {
                function checkList() {
                    var i = 0, retCode = false;
                    log(iframeId1, 'Checking connection is from allowed list of origins: ' + checkOrigin);
                    for(; i < checkOrigin.length; i++)if (checkOrigin[i] === origin) {
                        retCode = true;
                        break;
                    }
                    return retCode;
                }
                function checkSingle() {
                    var remoteHost = settings[iframeId1] && settings[iframeId1].remoteHost;
                    log(iframeId1, 'Checking connection is from: ' + remoteHost);
                    return origin === remoteHost;
                }
                return checkOrigin.constructor === Array ? checkList() : checkSingle();
            }
            var origin = event1.origin, checkOrigin = settings[iframeId1] && settings[iframeId1].checkOrigin;
            if (checkOrigin && '' + origin !== 'null' && !checkAllowedOrigin()) throw new Error('Unexpected message received from: ' + origin + ' for ' + messageData.iframe.id + '. Message was: ' + event1.data + '. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.');
            return true;
        }
        function isMessageForUs() {
            return msgId === ('' + msg).substr(0, msgIdLen) && msg.substr(msgIdLen).split(':')[0] in settings // ''+Protects against non-string msg
            ;
        }
        function isMessageFromMetaParent() {
            // Test if this message is from a parent above us. This is an ugly test, however, updating
            // the message format would break backwards compatibity.
            var retCode = messageData.type in {
                true: 1,
                false: 1,
                undefined: 1
            };
            if (retCode) log(iframeId1, 'Ignoring init message from meta parent page');
            return retCode;
        }
        function getMsgBody(offset) {
            return msg.substr(msg.indexOf(':') + msgHeaderLen + offset);
        }
        function forwardMsgFromIFrame(msgBody) {
            log(iframeId1, 'onMessage passed: {iframe: ' + messageData.iframe.id + ', message: ' + msgBody + '}');
            on('onMessage', {
                iframe: messageData.iframe,
                message: JSON.parse(msgBody)
            });
            log(iframeId1, '--');
        }
        function getPageInfo() {
            var bodyPosition = document.body.getBoundingClientRect(), iFramePosition = messageData.iframe.getBoundingClientRect();
            return JSON.stringify({
                iframeHeight: iFramePosition.height,
                iframeWidth: iFramePosition.width,
                clientHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                clientWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                offsetTop: parseInt(iFramePosition.top - bodyPosition.top, 10),
                offsetLeft: parseInt(iFramePosition.left - bodyPosition.left, 10),
                scrollTop: window.pageYOffset,
                scrollLeft: window.pageXOffset,
                documentHeight: document.documentElement.clientHeight,
                documentWidth: document.documentElement.clientWidth,
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth
            });
        }
        function sendPageInfoToIframe(iframe, iframeId) {
            function debouncedTrigger() {
                trigger('Send Page Info', 'pageInfo:' + getPageInfo(), iframe, iframeId);
            }
            debounceFrameEvents(debouncedTrigger, 32, iframeId);
        }
        function startPageInfoMonitor() {
            function setListener(type, func) {
                function sendPageInfo() {
                    if (settings[id]) sendPageInfoToIframe(settings[id].iframe, id);
                    else stop();
                }
                [
                    'scroll',
                    'resize'
                ].forEach(function(evt) {
                    log(id, type + evt + ' listener for sendPageInfo');
                    func(window, evt, sendPageInfo);
                });
            }
            function stop() {
                setListener('Remove ', removeEventListener);
            }
            function start() {
                setListener('Add ', addEventListener);
            }
            var id = iframeId1 // Create locally scoped copy of iFrame ID
            ;
            start();
            if (settings[id]) settings[id].stopPageInfo = stop;
        }
        function stopPageInfoMonitor() {
            if (settings[iframeId1] && settings[iframeId1].stopPageInfo) {
                settings[iframeId1].stopPageInfo();
                delete settings[iframeId1].stopPageInfo;
            }
        }
        function checkIFrameExists() {
            var retBool = true;
            if (null === messageData.iframe) {
                warn(iframeId1, 'IFrame (' + messageData.id + ') not found');
                retBool = false;
            }
            return retBool;
        }
        function getElementPosition(target) {
            var iFramePosition = target.getBoundingClientRect();
            getPagePosition(iframeId1);
            return {
                x: Math.floor(Number(iFramePosition.left) + Number(pagePosition.x)),
                y: Math.floor(Number(iFramePosition.top) + Number(pagePosition.y))
            };
        }
        function scrollRequestFromChild(addOffset) {
            /* istanbul ignore next */ // Not testable in Karma
            function reposition() {
                pagePosition = newPosition;
                scrollTo();
                log(iframeId1, '--');
            }
            function calcOffset() {
                return {
                    x: Number(messageData.width) + offset.x,
                    y: Number(messageData.height) + offset.y
                };
            }
            function scrollParent() {
                if (window.parentIFrame) window.parentIFrame['scrollTo' + (addOffset ? 'Offset' : '')](newPosition.x, newPosition.y);
                else warn(iframeId1, 'Unable to scroll to requested position, window.parentIFrame not found');
            }
            var offset = addOffset ? getElementPosition(messageData.iframe) : {
                x: 0,
                y: 0
            }, newPosition = calcOffset();
            log(iframeId1, 'Reposition requested from iFrame (offset x:' + offset.x + ' y:' + offset.y + ')');
            if (window.top !== window.self) scrollParent();
            else reposition();
        }
        function scrollTo() {
            if (false !== on('onScroll', pagePosition)) setPagePosition(iframeId1);
            else unsetPagePosition();
        }
        function findTarget(location) {
            function jumpToTarget() {
                var jumpPosition = getElementPosition(target);
                log(iframeId1, 'Moving to in page link (#' + hash + ') at x: ' + jumpPosition.x + ' y: ' + jumpPosition.y);
                pagePosition = {
                    x: jumpPosition.x,
                    y: jumpPosition.y
                };
                scrollTo();
                log(iframeId1, '--');
            }
            function jumpToParent() {
                if (window.parentIFrame) window.parentIFrame.moveToAnchor(hash);
                else log(iframeId1, 'In page link #' + hash + ' not found and window.parentIFrame not found');
            }
            var hash = location.split('#')[1] || '', hashData = decodeURIComponent(hash), target = document.getElementById(hashData) || document.getElementsByName(hashData)[0];
            if (target) jumpToTarget();
            else if (window.top !== window.self) jumpToParent();
            else log(iframeId1, 'In page link #' + hash + ' not found');
        }
        function onMouse(event) {
            var mousePos = {};
            if (Number(messageData.width) === 0 && Number(messageData.height) === 0) {
                var data = getMsgBody(9).split(':');
                mousePos = {
                    x: data[1],
                    y: data[0]
                };
            } else mousePos = {
                x: messageData.width,
                y: messageData.height
            };
            on(event, {
                iframe: messageData.iframe,
                screenX: Number(mousePos.x),
                screenY: Number(mousePos.y),
                type: messageData.type
            });
        }
        function on(funcName, val) {
            return chkEvent(iframeId1, funcName, val);
        }
        function actionMsg() {
            if (settings[iframeId1] && settings[iframeId1].firstRun) firstRun();
            switch(messageData.type){
                case 'close':
                    closeIFrame(messageData.iframe);
                    break;
                case 'message':
                    forwardMsgFromIFrame(getMsgBody(6));
                    break;
                case 'mouseenter':
                    onMouse('onMouseEnter');
                    break;
                case 'mouseleave':
                    onMouse('onMouseLeave');
                    break;
                case 'autoResize':
                    settings[iframeId1].autoResize = JSON.parse(getMsgBody(9));
                    break;
                case 'scrollTo':
                    scrollRequestFromChild(false);
                    break;
                case 'scrollToOffset':
                    scrollRequestFromChild(true);
                    break;
                case 'pageInfo':
                    sendPageInfoToIframe(settings[iframeId1] && settings[iframeId1].iframe, iframeId1);
                    startPageInfoMonitor();
                    break;
                case 'pageInfoStop':
                    stopPageInfoMonitor();
                    break;
                case 'inPageLink':
                    findTarget(getMsgBody(9));
                    break;
                case 'reset':
                    resetIFrame(messageData);
                    break;
                case 'init':
                    resizeIFrame();
                    on('onInit', messageData.iframe);
                    break;
                default:
                    if (Number(messageData.width) === 0 && Number(messageData.height) === 0) warn('Unsupported message received (' + messageData.type + '), this is likely due to the iframe containing a later ' + 'version of iframe-resizer than the parent page');
                    else resizeIFrame();
            }
        }
        function hasSettings(iframeId) {
            var retBool = true;
            if (!settings[iframeId]) {
                retBool = false;
                warn(messageData.type + ' No settings for ' + iframeId + '. Message was: ' + msg);
            }
            return retBool;
        }
        function iFrameReadyMsgReceived() {
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for(var iframeId in settings)trigger('iFrame requested init', createOutgoingMsg(iframeId), settings[iframeId].iframe, iframeId);
        }
        function firstRun() {
            if (settings[iframeId1]) settings[iframeId1].firstRun = false;
        }
        var msg = event1.data, messageData = {}, iframeId1 = null;
        if ('[iFrameResizerChild]Ready' === msg) iFrameReadyMsgReceived();
        else if (isMessageForUs()) {
            messageData = processMsg();
            iframeId1 = messageData.id;
            if (settings[iframeId1]) settings[iframeId1].loaded = true;
            if (!isMessageFromMetaParent() && hasSettings(iframeId1)) {
                log(iframeId1, 'Received: ' + msg);
                if (checkIFrameExists() && isMessageFromIFrame()) actionMsg();
            }
        } else info(iframeId1, 'Ignored: ' + msg);
    }
    function chkEvent(iframeId, funcName, val) {
        var func = null, retVal = null;
        if (settings[iframeId]) {
            func = settings[iframeId][funcName];
            if ('function' === typeof func) retVal = func(val);
            else throw new TypeError(funcName + ' on iFrame[' + iframeId + '] is not a function');
        }
        return retVal;
    }
    function removeIframeListeners(iframe) {
        var iframeId = iframe.id;
        delete settings[iframeId];
    }
    function closeIFrame(iframe) {
        var iframeId = iframe.id;
        if (chkEvent(iframeId, 'onClose', iframeId) === false) {
            log(iframeId, 'Close iframe cancelled by onClose event');
            return;
        }
        log(iframeId, 'Removing iFrame: ' + iframeId);
        try {
            // Catch race condition error with React
            if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        } catch (error) {
            warn(error);
        }
        chkEvent(iframeId, 'onClosed', iframeId);
        log(iframeId, '--');
        removeIframeListeners(iframe);
    }
    function getPagePosition(iframeId) {
        if (null === pagePosition) {
            pagePosition = {
                x: window.pageXOffset !== undefined ? window.pageXOffset : document.documentElement.scrollLeft,
                y: window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop
            };
            log(iframeId, 'Get page position: ' + pagePosition.x + ',' + pagePosition.y);
        }
    }
    function setPagePosition(iframeId) {
        if (null !== pagePosition) {
            window.scrollTo(pagePosition.x, pagePosition.y);
            log(iframeId, 'Set page position: ' + pagePosition.x + ',' + pagePosition.y);
            unsetPagePosition();
        }
    }
    function unsetPagePosition() {
        pagePosition = null;
    }
    function resetIFrame(messageData) {
        function reset() {
            setSize(messageData);
            trigger('reset', 'reset', messageData.iframe, messageData.id);
        }
        log(messageData.id, 'Size reset requested by ' + ('init' === messageData.type ? 'host page' : 'iFrame'));
        getPagePosition(messageData.id);
        syncResize(reset, messageData, 'reset');
    }
    function setSize(messageData) {
        function setDimension(dimension) {
            if (!messageData.id) {
                log('undefined', 'messageData id not set');
                return;
            }
            messageData.iframe.style[dimension] = messageData[dimension] + 'px';
            log(messageData.id, 'IFrame (' + iframeId + ') ' + dimension + ' set to ' + messageData[dimension] + 'px');
        }
        function chkZero(dimension) {
            // FireFox sets dimension of hidden iFrames to zero.
            // So if we detect that set up an event to check for
            // when iFrame becomes visible.
            /* istanbul ignore next */ // Not testable in PhantomJS
            if (!hiddenCheckEnabled && '0' === messageData[dimension]) {
                hiddenCheckEnabled = true;
                log(iframeId, 'Hidden iFrame detected, creating visibility listener');
                fixHiddenIFrames();
            }
        }
        function processDimension(dimension) {
            setDimension(dimension);
            chkZero(dimension);
        }
        var iframeId = messageData.iframe.id;
        if (settings[iframeId]) {
            if (settings[iframeId].sizeHeight) processDimension('height');
            if (settings[iframeId].sizeWidth) processDimension('width');
        }
    }
    function syncResize(func, messageData, doNotSync) {
        /* istanbul ignore if */ // Not testable in PhantomJS
        if (doNotSync !== messageData.type && requestAnimationFrame && // including check for jasmine because had trouble getting spy to work in unit test using requestAnimationFrame
        !window.jasmine) {
            log(messageData.id, 'Requesting animation frame');
            requestAnimationFrame(func);
        } else func();
    }
    function trigger(calleeMsg, msg, iframe, id, noResponseWarning) {
        function postMessageToIFrame() {
            var target = settings[id] && settings[id].targetOrigin;
            log(id, '[' + calleeMsg + '] Sending msg to iframe[' + id + '] (' + msg + ') targetOrigin: ' + target);
            iframe.contentWindow.postMessage(msgId + msg, target);
        }
        function iFrameNotFound() {
            warn(id, '[' + calleeMsg + '] IFrame(' + id + ') not found');
        }
        function chkAndSend() {
            if (iframe && 'contentWindow' in iframe && null !== iframe.contentWindow) // Null test for PhantomJS
            postMessageToIFrame();
            else iFrameNotFound();
        }
        function warnOnNoResponse() {
            function warning() {
                if (settings[id] && !settings[id].loaded && !errorShown) {
                    errorShown = true;
                    warn(id, 'IFrame has not responded within ' + settings[id].warningTimeout / 1000 + ' seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning.');
                }
            }
            if (!!noResponseWarning && settings[id] && !!settings[id].warningTimeout) settings[id].msgTimeout = setTimeout(warning, settings[id].warningTimeout);
        }
        var errorShown = false;
        id = id || iframe.id;
        if (settings[id]) {
            chkAndSend();
            warnOnNoResponse();
        }
    }
    function createOutgoingMsg(iframeId) {
        return iframeId + ':' + settings[iframeId].bodyMarginV1 + ':' + settings[iframeId].sizeWidth + ':' + settings[iframeId].log + ':' + settings[iframeId].interval + ':' + settings[iframeId].enablePublicMethods + ':' + settings[iframeId].autoResize + ':' + settings[iframeId].bodyMargin + ':' + settings[iframeId].heightCalculationMethod + ':' + settings[iframeId].bodyBackground + ':' + settings[iframeId].bodyPadding + ':' + settings[iframeId].tolerance + ':' + settings[iframeId].inPageLinks + ':' + settings[iframeId].resizeFrom + ':' + settings[iframeId].widthCalculationMethod + ':' + settings[iframeId].mouseEvents;
    }
    function isNumber(value) {
        return typeof value === 'number';
    }
    function setupIFrame(iframe, options1) {
        function setLimits() {
            function addStyle(style) {
                var styleValue = settings[iframeId2][style];
                if (Infinity !== styleValue && 0 !== styleValue) {
                    iframe.style[style] = isNumber(styleValue) ? styleValue + 'px' : styleValue;
                    log(iframeId2, 'Set ' + style + ' = ' + iframe.style[style]);
                }
            }
            function chkMinMax(dimension) {
                if (settings[iframeId2]['min' + dimension] > settings[iframeId2]['max' + dimension]) throw new Error('Value for min' + dimension + ' can not be greater than max' + dimension);
            }
            chkMinMax('Height');
            chkMinMax('Width');
            addStyle('maxHeight');
            addStyle('minHeight');
            addStyle('maxWidth');
            addStyle('minWidth');
        }
        function newId() {
            var id = options1 && options1.id || defaults.id + count++;
            if (null !== document.getElementById(id)) id += count++;
            return id;
        }
        function ensureHasId(iframeId) {
            if ('' === iframeId) {
                // eslint-disable-next-line no-multi-assign
                iframe.id = iframeId = newId();
                logEnabled = (options1 || {}).log;
                log(iframeId, 'Added missing iframe ID: ' + iframeId + ' (' + iframe.src + ')');
            }
            return iframeId;
        }
        function setScrolling() {
            log(iframeId2, 'IFrame scrolling ' + (settings[iframeId2] && settings[iframeId2].scrolling ? 'enabled' : 'disabled') + ' for ' + iframeId2);
            iframe.style.overflow = false === (settings[iframeId2] && settings[iframeId2].scrolling) ? 'hidden' : 'auto';
            switch(settings[iframeId2] && settings[iframeId2].scrolling){
                case 'omit':
                    break;
                case true:
                    iframe.scrolling = 'yes';
                    break;
                case false:
                    iframe.scrolling = 'no';
                    break;
                default:
                    iframe.scrolling = settings[iframeId2] ? settings[iframeId2].scrolling : 'no';
            }
        }
        // The V1 iFrame script expects an int, where as in V2 expects a CSS
        // string value such as '1px 3em', so if we have an int for V2, set V1=V2
        // and then convert V2 to a string PX value.
        function setupBodyMarginValues() {
            if ('number' === typeof (settings[iframeId2] && settings[iframeId2].bodyMargin) || '0' === (settings[iframeId2] && settings[iframeId2].bodyMargin)) {
                settings[iframeId2].bodyMarginV1 = settings[iframeId2].bodyMargin;
                settings[iframeId2].bodyMargin = '' + settings[iframeId2].bodyMargin + 'px';
            }
        }
        function checkReset() {
            // Reduce scope of firstRun to function, because IE8's JS execution
            // context stack is borked and this value gets externally
            // changed midway through running this function!!!
            var firstRun = settings[iframeId2] && settings[iframeId2].firstRun, resetRequertMethod = settings[iframeId2] && settings[iframeId2].heightCalculationMethod in resetRequiredMethods;
            if (!firstRun && resetRequertMethod) resetIFrame({
                iframe: iframe,
                height: 0,
                width: 0,
                type: 'init'
            });
        }
        function setupIFrameObject() {
            if (settings[iframeId2]) settings[iframeId2].iframe.iFrameResizer = {
                close: closeIFrame.bind(null, settings[iframeId2].iframe),
                removeListeners: removeIframeListeners.bind(null, settings[iframeId2].iframe),
                resize: trigger.bind(null, 'Window resize', 'resize', settings[iframeId2].iframe),
                moveToAnchor: function(anchor) {
                    trigger('Move to anchor', 'moveToAnchor:' + anchor, settings[iframeId2].iframe, iframeId2);
                },
                sendMessage: function(message) {
                    message = JSON.stringify(message);
                    trigger('Send Message', 'message:' + message, settings[iframeId2].iframe, iframeId2);
                }
            };
        }
        // We have to call trigger twice, as we can not be sure if all
        // iframes have completed loading when this code runs. The
        // event listener also catches the page changing in the iFrame.
        function init(msg) {
            function iFrameLoaded() {
                trigger('iFrame.onload', msg, iframe, undefined, true);
                checkReset();
            }
            function createDestroyObserver(MutationObserver) {
                if (!iframe.parentNode) return;
                var destroyObserver = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        var removedNodes = Array.prototype.slice.call(mutation.removedNodes) // Transform NodeList into an Array
                        ;
                        removedNodes.forEach(function(removedNode) {
                            if (removedNode === iframe) closeIFrame(iframe);
                        });
                    });
                });
                destroyObserver.observe(iframe.parentNode, {
                    childList: true
                });
            }
            var MutationObserver1 = getMutationObserver();
            if (MutationObserver1) createDestroyObserver(MutationObserver1);
            addEventListener(iframe, 'load', iFrameLoaded);
            trigger('init', msg, iframe, undefined, true);
        }
        function checkOptions(options) {
            if ('object' !== typeof options) throw new TypeError('Options is not an object');
        }
        function copyOptions(options) {
            // eslint-disable-next-line no-restricted-syntax
            for(var option in defaults)if (Object.prototype.hasOwnProperty.call(defaults, option)) settings[iframeId2][option] = Object.prototype.hasOwnProperty.call(options, option) ? options[option] : defaults[option];
        }
        function getTargetOrigin(remoteHost) {
            return '' === remoteHost || null !== remoteHost.match(/^(about:blank|javascript:|file:\/\/)/) ? '*' : remoteHost;
        }
        function depricate(key) {
            var splitName = key.split('Callback');
            if (splitName.length === 2) {
                var name = 'on' + splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
                this[name] = this[key];
                delete this[key];
                warn(iframeId2, "Deprecated: '" + key + "' has been renamed '" + name + "'. The old method will be removed in the next major version.");
            }
        }
        function processOptions(options) {
            options = options || {};
            settings[iframeId2] = {
                firstRun: true,
                iframe: iframe,
                remoteHost: iframe.src && iframe.src.split('/').slice(0, 3).join('/')
            };
            checkOptions(options);
            Object.keys(options).forEach(depricate, options);
            copyOptions(options);
            if (settings[iframeId2]) settings[iframeId2].targetOrigin = true === settings[iframeId2].checkOrigin ? getTargetOrigin(settings[iframeId2].remoteHost) : '*';
        }
        function beenHere() {
            return iframeId2 in settings && 'iFrameResizer' in iframe;
        }
        var iframeId2 = ensureHasId(iframe.id);
        if (!beenHere()) {
            processOptions(options1);
            setScrolling();
            setLimits();
            setupBodyMarginValues();
            init(createOutgoingMsg(iframeId2));
            setupIFrameObject();
        } else warn(iframeId2, 'Ignored iFrame, already setup.');
    }
    function debouce(fn, time) {
        if (null === timer) timer = setTimeout(function() {
            timer = null;
            fn();
        }, time);
    }
    var frameTimer = {};
    function debounceFrameEvents(fn, time, frameId) {
        if (!frameTimer[frameId]) frameTimer[frameId] = setTimeout(function() {
            frameTimer[frameId] = null;
            fn();
        }, time);
    }
    // Not testable in PhantomJS
    /* istanbul ignore next */ function fixHiddenIFrames() {
        function checkIFrames() {
            function checkIFrame(settingId) {
                function chkDimension(dimension) {
                    return '0px' === (settings[settingId] && settings[settingId].iframe.style[dimension]);
                }
                function isVisible(el) {
                    return null !== el.offsetParent;
                }
                if (settings[settingId] && isVisible(settings[settingId].iframe) && (chkDimension('height') || chkDimension('width'))) trigger('Visibility change', 'resize', settings[settingId].iframe, settingId);
            }
            Object.keys(settings).forEach(function(key) {
                checkIFrame(key);
            });
        }
        function mutationObserved(mutations) {
            log('window', 'Mutation observed: ' + mutations[0].target + ' ' + mutations[0].type);
            debouce(checkIFrames, 16);
        }
        function createMutationObserver() {
            var target = document.querySelector('body'), config = {
                attributes: true,
                attributeOldValue: false,
                characterData: true,
                characterDataOldValue: false,
                childList: true,
                subtree: true
            }, observer = new MutationObserver(mutationObserved);
            observer.observe(target, config);
        }
        var MutationObserver = getMutationObserver();
        if (MutationObserver) createMutationObserver();
    }
    function resizeIFrames(event) {
        function resize() {
            sendTriggerMsg('Window ' + event, 'resize');
        }
        log('window', 'Trigger event: ' + event);
        debouce(resize, 16);
    }
    // Not testable in PhantomJS
    /* istanbul ignore next */ function tabVisible() {
        function resize() {
            sendTriggerMsg('Tab Visable', 'resize');
        }
        if ('hidden' !== document.visibilityState) {
            log('document', 'Trigger event: Visiblity change');
            debouce(resize, 16);
        }
    }
    function sendTriggerMsg(eventName, event) {
        function isIFrameResizeEnabled(iframeId) {
            return settings[iframeId] && 'parent' === settings[iframeId].resizeFrom && settings[iframeId].autoResize && !settings[iframeId].firstRun;
        }
        Object.keys(settings).forEach(function(iframeId) {
            if (isIFrameResizeEnabled(iframeId)) trigger(eventName, event, settings[iframeId].iframe, iframeId);
        });
    }
    function setupEventListeners() {
        addEventListener(window, 'message', iFrameListener);
        addEventListener(window, 'resize', function() {
            resizeIFrames('resize');
        });
        addEventListener(document, 'visibilitychange', tabVisible);
        addEventListener(document, '-webkit-visibilitychange', tabVisible);
    }
    function factory() {
        function init(options, element) {
            function chkType() {
                if (!element.tagName) throw new TypeError('Object is not a valid DOM element');
                else if ('IFRAME' !== element.tagName.toUpperCase()) throw new TypeError('Expected <IFRAME> tag, found <' + element.tagName + '>');
            }
            if (element) {
                chkType();
                setupIFrame(element, options);
                iFrames.push(element);
            }
        }
        function warnDeprecatedOptions(options) {
            if (options && options.enablePublicMethods) warn('enablePublicMethods option has been removed, public methods are now always available in the iFrame');
        }
        var iFrames;
        setupRequestAnimationFrame();
        setupEventListeners();
        return function iFrameResizeF(options, target) {
            iFrames = [] // Only return iFrames past in on this call
            ;
            warnDeprecatedOptions(options);
            switch(typeof target){
                case 'undefined':
                case 'string':
                    Array.prototype.forEach.call(document.querySelectorAll(target || 'iframe'), init.bind(undefined, options));
                    break;
                case 'object':
                    init(options, target);
                    break;
                default:
                    throw new TypeError('Unexpected data type (' + typeof target + ')');
            }
            return iFrames;
        };
    }
    function createJQueryPublicMethod($) {
        if (!$.fn) info('', 'Unable to bind to jQuery, it is not fully loaded.');
        else if (!$.fn.iFrameResize) $.fn.iFrameResize = function $iFrameResizeF(options) {
            function init(index, element) {
                setupIFrame(element, options);
            }
            return this.filter('iframe').each(init).end();
        };
>>>>>>> 8a8eeb1 (Automate basic theme generation)
    }
    return {
      width: n.width / i,
      height: n.height / r,
      top: n.top / r,
      right: n.right / i,
      bottom: n.bottom / r,
      left: n.left / i,
      x: n.left / i,
      y: n.top / r,
    };
  }
  function vi(e) {
    var t = ci(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function yi(e) {
    return ((ui(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function bi(e) {
    return gi(yi(e)).left + vi(e).scrollLeft;
  }
  function wi(e) {
    return ci(e).getComputedStyle(e);
  }
  function xi(e) {
    var t = wi(e),
      n = t.overflow,
      i = t.overflowX,
      r = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + r + i);
  }
  function _i(e, t, n) {
    void 0 === n && (n = !1);
    var i,
      r,
      o = li(t),
      s =
        li(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = mi(t.width) / e.offsetWidth || 1,
            i = mi(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== i;
        })(t),
      a = yi(t),
      c = gi(e, s),
      u = { scrollLeft: 0, scrollTop: 0 },
      l = { x: 0, y: 0 };
    return (
      (o || (!o && !n)) &&
        (("body" !== ai(t) || xi(a)) &&
          (u =
            (i = t) !== ci(i) && li(i)
              ? { scrollLeft: (r = i).scrollLeft, scrollTop: r.scrollTop }
              : vi(i)),
        li(t)
          ? (((l = gi(t, !0)).x += t.clientLeft), (l.y += t.clientTop))
          : a && (l.x = bi(a))),
      {
        x: c.left + u.scrollLeft - l.x,
        y: c.top + u.scrollTop - l.y,
        width: c.width,
        height: c.height,
      }
    );
  }
  function Oi(e) {
    var t = gi(e),
      n = e.offsetWidth,
      i = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - i) <= 1 && (i = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: i }
    );
  }
  function ki(e) {
    return "html" === ai(e)
      ? e
      : e.assignedSlot || e.parentNode || (fi(e) ? e.host : null) || yi(e);
  }
  function Ei(e) {
    return ["html", "body", "#document"].indexOf(ai(e)) >= 0
      ? e.ownerDocument.body
      : li(e) && xi(e)
      ? e
      : Ei(ki(e));
  }
  function Si(e, t) {
    var n;
    void 0 === t && (t = []);
    var i = Ei(e),
      r = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
      o = ci(i),
      s = r ? [o].concat(o.visualViewport || [], xi(i) ? i : []) : i,
      a = t.concat(s);
    return r ? a : a.concat(Si(ki(s)));
  }
  function Ti(e) {
    return ["table", "td", "th"].indexOf(ai(e)) >= 0;
  }
  function Ai(e) {
    return li(e) && "fixed" !== wi(e).position ? e.offsetParent : null;
  }
  function Ci(e) {
    for (var t = ci(e), n = Ai(e); n && Ti(n) && "static" === wi(n).position; )
      n = Ai(n);
    return n &&
      ("html" === ai(n) || ("body" === ai(n) && "static" === wi(n).position))
      ? t
      : n ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              li(e) &&
              "fixed" === wi(e).position
            )
              return null;
            var n = ki(e);
            for (
              fi(n) && (n = n.host);
              li(n) && ["html", "body"].indexOf(ai(n)) < 0;

<<<<<<< HEAD
<<<<<<< HEAD
            ) {
              var i = wi(n);
              if (
                "none" !== i.transform ||
                "none" !== i.perspective ||
                "paint" === i.contain ||
                -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                (t && "filter" === i.willChange) ||
                (t && i.filter && "none" !== i.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var Li = "top",
    ji = "bottom",
    Mi = "right",
    Di = "left",
    Pi = "auto",
    zi = [Li, ji, Mi, Di],
    Ri = "start",
    Ii = "end",
    $i = "viewport",
    Wi = "popper",
    Ni = zi.reduce(function (e, t) {
      return e.concat([t + "-" + Ri, t + "-" + Ii]);
    }, []),
    Hi = [].concat(zi, [Pi]).reduce(function (e, t) {
      return e.concat([t, t + "-" + Ri, t + "-" + Ii]);
    }, []),
    Fi = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function Vi(e) {
    var t = new Map(),
      n = new Set(),
      i = [];
    function r(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var i = t.get(e);
              i && r(i);
            }
          }),
        i.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || r(e);
      }),
      i
    );
  }
  var Bi = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function qi() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function Gi(e) {
    void 0 === e && (e = {});
    var t = e,
      n = t.defaultModifiers,
      i = void 0 === n ? [] : n,
      r = t.defaultOptions,
      o = void 0 === r ? Bi : r;
    return function (e, t, n) {
      void 0 === n && (n = o);
      var r,
        s,
        a = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, Bi, o),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        c = [],
        u = !1,
        l = {
          state: a,
          setOptions: function (n) {
            var r = "function" == typeof n ? n(a.options) : n;
            f(),
              (a.options = Object.assign({}, o, a.options, r)),
              (a.scrollParents = {
                reference: ui(e)
                  ? Si(e)
                  : e.contextElement
                  ? Si(e.contextElement)
                  : [],
                popper: Si(t),
              });
            var s = (function (e) {
              var t = Vi(e);
              return Fi.reduce(function (e, n) {
                return e.concat(
                  t.filter(function (e) {
                    return e.phase === n;
                  })
                );
              }, []);
            })(
              (function (e) {
                var t = e.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {});
                return Object.keys(t).map(function (e) {
                  return t[e];
                });
              })([].concat(i, a.options.modifiers))
            );
            return (
              (a.orderedModifiers = s.filter(function (e) {
                return e.enabled;
              })),
              a.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  i = void 0 === n ? {} : n,
                  r = e.effect;
                if ("function" == typeof r) {
                  var o = r({ state: a, name: t, instance: l, options: i }),
                    s = function () {};
                  c.push(o || s);
                }
              }),
              l.update()
            );
          },
          forceUpdate: function () {
            if (!u) {
              var e = a.elements,
                t = e.reference,
                n = e.popper;
              if (qi(t, n)) {
                (a.rects = {
                  reference: _i(t, Ci(n), "fixed" === a.options.strategy),
                  popper: Oi(n),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (e) {
                    return (a.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var i = 0; i < a.orderedModifiers.length; i++)
                  if (!0 !== a.reset) {
                    var r = a.orderedModifiers[i],
                      o = r.fn,
                      s = r.options,
                      c = void 0 === s ? {} : s,
                      f = r.name;
                    "function" == typeof o &&
                      (a =
                        o({ state: a, options: c, name: f, instance: l }) || a);
                  } else (a.reset = !1), (i = -1);
              }
            }
          },
          update:
            ((r = function () {
              return new Promise(function (e) {
                l.forceUpdate(), e(a);
              });
            }),
            function () {
              return (
                s ||
                  (s = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (s = void 0), e(r());
                    });
                  })),
                s
              );
            }),
          destroy: function () {
            f(), (u = !0);
          },
        };
      if (!qi(e, t)) return l;
      function f() {
        c.forEach(function (e) {
          return e();
        }),
          (c = []);
      }
      return (
        l.setOptions(n).then(function (e) {
          !u && n.onFirstUpdate && n.onFirstUpdate(e);
        }),
        l
      );
=======
=======
},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2RhL0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function iconComponent(iconName) {
    return {
        iconName
    };
}
exports.default = iconComponent;

>>>>>>> c9a6dcb (Add preview dimensions display)
},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bGQJL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function navComponent(store) {
    return {
        empty: false,
        children: [],
        init () {
            this.children = Array.from(this.$refs.items.children);
        },
        isOpen (id) {
            return store.open.includes(id);
        },
        setOpen (id) {
            store.open.push(id);
        },
        setClosed (id) {
            const index = store.open.indexOf(id);
            if (index > -1) store.open.splice(index, 1);
        },
        toggleOpen (id) {
            this.isOpen(id) ? this.setClosed(id) : this.setOpen(id);
        },
        async filter (text) {
            this.debug(`Filter text: ${text}`);
            await this.$nextTick();
            const filteredStates = await Promise.all(this.children.map(async (child)=>{
                const data = Alpine.$data(child);
                await data.filter(text);
                return data.filteredOut;
            }));
            const matchedChildCount = filteredStates.filter((s)=>!s
            ).length;
            this.empty = matchedChildCount === 0;
            this.debug(`Children matching filter: ${matchedChildCount}/${this.children.length}`);
        }
    };
}
exports.default = navComponent;

<<<<<<< HEAD
},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2RhL0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function iconComponent(iconName) {
    return {
        iconName
>>>>>>> 8a8eeb1 (Automate basic theme generation)
    };
  }
  var Ui = { passive: !0 };
  function Yi(e) {
    return e.split("-")[0];
  }
  function Xi(e) {
    return e.split("-")[1];
  }
  function Ji(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function Ki(e) {
    var t,
      n = e.reference,
      i = e.element,
      r = e.placement,
      o = r ? Yi(r) : null,
      s = r ? Xi(r) : null,
      a = n.x + n.width / 2 - i.width / 2,
      c = n.y + n.height / 2 - i.height / 2;
    switch (o) {
      case Li:
        t = { x: a, y: n.y - i.height };
        break;
      case ji:
        t = { x: a, y: n.y + n.height };
        break;
      case Mi:
        t = { x: n.x + n.width, y: c };
        break;
      case Di:
        t = { x: n.x - i.width, y: c };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var u = o ? Ji(o) : null;
    if (null != u) {
      var l = "y" === u ? "height" : "width";
      switch (s) {
        case Ri:
          t[u] = t[u] - (n[l] / 2 - i[l] / 2);
          break;
        case Ii:
          t[u] = t[u] + (n[l] / 2 - i[l] / 2);
      }
    }
    return t;
  }
  var Zi = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Qi(e) {
    var t,
      n = e.popper,
      i = e.popperRect,
      r = e.placement,
      o = e.variation,
      s = e.offsets,
      a = e.position,
      c = e.gpuAcceleration,
      u = e.adaptive,
      l = e.roundOffsets,
      f = e.isFixed,
      p = s.x,
      d = void 0 === p ? 0 : p,
      h = s.y,
      m = void 0 === h ? 0 : h,
      g = "function" == typeof l ? l({ x: d, y: m }) : { x: d, y: m };
    (d = g.x), (m = g.y);
    var v = s.hasOwnProperty("x"),
      y = s.hasOwnProperty("y"),
      b = Di,
      w = Li,
      x = window;
    if (u) {
      var _ = Ci(n),
        O = "clientHeight",
        k = "clientWidth";
      if (
        (_ === ci(n) &&
          "static" !== wi((_ = yi(n))).position &&
          "absolute" === a &&
          ((O = "scrollHeight"), (k = "scrollWidth")),
        r === Li || ((r === Di || r === Mi) && o === Ii))
      )
        (w = ji),
          (m -=
            (f && _ === x && x.visualViewport
              ? x.visualViewport.height
              : _[O]) - i.height),
          (m *= c ? 1 : -1);
      if (r === Di || ((r === Li || r === ji) && o === Ii))
        (b = Mi),
          (d -=
            (f && _ === x && x.visualViewport ? x.visualViewport.width : _[k]) -
            i.width),
          (d *= c ? 1 : -1);
    }
    var E,
      S = Object.assign({ position: a }, u && Zi),
      T =
        !0 === l
          ? (function (e) {
              var t = e.x,
                n = e.y,
                i = window.devicePixelRatio || 1;
              return { x: mi(t * i) / i || 0, y: mi(n * i) / i || 0 };
            })({ x: d, y: m })
          : { x: d, y: m };
    return (
      (d = T.x),
      (m = T.y),
      c
        ? Object.assign(
            {},
            S,
            (((E = {})[w] = y ? "0" : ""),
            (E[b] = v ? "0" : ""),
            (E.transform =
              (x.devicePixelRatio || 1) <= 1
                ? "translate(" + d + "px, " + m + "px)"
                : "translate3d(" + d + "px, " + m + "px, 0)"),
            E)
          )
        : Object.assign(
            {},
            S,
            (((t = {})[w] = y ? m + "px" : ""),
            (t[b] = v ? d + "px" : ""),
            (t.transform = ""),
            t)
          )
    );
  }
  var er = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function tr(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return er[e];
    });
  }
  var nr = { start: "end", end: "start" };
  function ir(e) {
    return e.replace(/start|end/g, function (e) {
      return nr[e];
    });
  }
  function rr(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && fi(n)) {
      var i = t;
      do {
        if (i && e.isSameNode(i)) return !0;
        i = i.parentNode || i.host;
      } while (i);
    }
    return !1;
  }
  function or(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function sr(e, t) {
    return t === $i
      ? or(
          (function (e) {
            var t = ci(e),
              n = yi(e),
              i = t.visualViewport,
              r = n.clientWidth,
              o = n.clientHeight,
              s = 0,
              a = 0;
            return (
              i &&
                ((r = i.width),
                (o = i.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((s = i.offsetLeft), (a = i.offsetTop))),
              { width: r, height: o, x: s + bi(e), y: a }
            );
          })(e)
        )
      : ui(t)
      ? (function (e) {
          var t = gi(e);
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          );
        })(t)
      : or(
          (function (e) {
            var t,
              n = yi(e),
              i = vi(e),
              r = null == (t = e.ownerDocument) ? void 0 : t.body,
              o = di(
                n.scrollWidth,
                n.clientWidth,
                r ? r.scrollWidth : 0,
                r ? r.clientWidth : 0
              ),
              s = di(
                n.scrollHeight,
                n.clientHeight,
                r ? r.scrollHeight : 0,
                r ? r.clientHeight : 0
              ),
              a = -i.scrollLeft + bi(e),
              c = -i.scrollTop;
            return (
              "rtl" === wi(r || n).direction &&
                (a += di(n.clientWidth, r ? r.clientWidth : 0) - o),
              { width: o, height: s, x: a, y: c }
            );
          })(yi(e))
        );
  }
  function ar(e, t, n) {
    var i =
        "clippingParents" === t
          ? (function (e) {
              var t = Si(ki(e)),
                n =
                  ["absolute", "fixed"].indexOf(wi(e).position) >= 0 && li(e)
                    ? Ci(e)
                    : e;
              return ui(n)
                ? t.filter(function (e) {
                    return ui(e) && rr(e, n) && "body" !== ai(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      r = [].concat(i, [n]),
      o = r[0],
      s = r.reduce(function (t, n) {
        var i = sr(e, n);
        return (
          (t.top = di(i.top, t.top)),
          (t.right = hi(i.right, t.right)),
          (t.bottom = hi(i.bottom, t.bottom)),
          (t.left = di(i.left, t.left)),
          t
        );
      }, sr(e, o));
    return (
      (s.width = s.right - s.left),
      (s.height = s.bottom - s.top),
      (s.x = s.left),
      (s.y = s.top),
      s
    );
  }
  function cr(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function ur(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function lr(e, t) {
    void 0 === t && (t = {});
    var n = t,
      i = n.placement,
      r = void 0 === i ? e.placement : i,
      o = n.boundary,
      s = void 0 === o ? "clippingParents" : o,
      a = n.rootBoundary,
      c = void 0 === a ? $i : a,
      u = n.elementContext,
      l = void 0 === u ? Wi : u,
      f = n.altBoundary,
      p = void 0 !== f && f,
      d = n.padding,
      h = void 0 === d ? 0 : d,
      m = cr("number" != typeof h ? h : ur(h, zi)),
      g = l === Wi ? "reference" : Wi,
      v = e.rects.popper,
      y = e.elements[p ? g : l],
      b = ar(ui(y) ? y : y.contextElement || yi(e.elements.popper), s, c),
      w = gi(e.elements.reference),
      x = Ki({ reference: w, element: v, strategy: "absolute", placement: r }),
      _ = or(Object.assign({}, v, x)),
      O = l === Wi ? _ : w,
      k = {
        top: b.top - O.top + m.top,
        bottom: O.bottom - b.bottom + m.bottom,
        left: b.left - O.left + m.left,
        right: O.right - b.right + m.right,
      },
      E = e.modifiersData.offset;
    if (l === Wi && E) {
      var S = E[r];
      Object.keys(k).forEach(function (e) {
        var t = [Mi, ji].indexOf(e) >= 0 ? 1 : -1,
          n = [Li, ji].indexOf(e) >= 0 ? "y" : "x";
        k[e] += S[n] * t;
      });
    }
    return k;
  }
  function fr(e, t, n) {
    return di(e, hi(t, n));
  }
  function pr(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function dr(e) {
    return [Li, Mi, ji, Di].some(function (t) {
      return e[t] >= 0;
    });
  }
  var hr = Gi({
      defaultModifiers: [
        {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function () {},
          effect: function (e) {
            var t = e.state,
              n = e.instance,
              i = e.options,
              r = i.scroll,
              o = void 0 === r || r,
              s = i.resize,
              a = void 0 === s || s,
              c = ci(t.elements.popper),
              u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return (
              o &&
                u.forEach(function (e) {
                  e.addEventListener("scroll", n.update, Ui);
                }),
              a && c.addEventListener("resize", n.update, Ui),
              function () {
                o &&
                  u.forEach(function (e) {
                    e.removeEventListener("scroll", n.update, Ui);
                  }),
                  a && c.removeEventListener("resize", n.update, Ui);
              }
=======
},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b93Nq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function paramFieldComponent({ name , value  }) {
    return {
        name,
        value,
        init () {
            this.$watch("value", ()=>this.update()
>>>>>>> c9a6dcb (Add preview dimensions display)
            );
          },
          data: {},
        },
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = Ki({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = n.gpuAcceleration,
              r = void 0 === i || i,
              o = n.adaptive,
              s = void 0 === o || o,
              a = n.roundOffsets,
              c = void 0 === a || a,
              u = {
                placement: Yi(t.placement),
                variation: Xi(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: r,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                Qi(
                  Object.assign({}, u, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: s,
                    roundOffsets: c,
                  })
                )
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  Qi(
                    Object.assign({}, u, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: c,
                    })
                  )
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
<<<<<<< HEAD
        pi,
        {
          name: "offset",
          enabled: !0,
          phase: "main",
          requires: ["popperOffsets"],
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              r = n.offset,
              o = void 0 === r ? [0, 0] : r,
              s = Hi.reduce(function (e, n) {
                return (
                  (e[n] = (function (e, t, n) {
                    var i = Yi(e),
                      r = [Di, Li].indexOf(i) >= 0 ? -1 : 1,
                      o =
                        "function" == typeof n
                          ? n(Object.assign({}, t, { placement: e }))
                          : n,
                      s = o[0],
                      a = o[1];
                    return (
                      (s = s || 0),
                      (a = (a || 0) * r),
                      [Di, Mi].indexOf(i) >= 0 ? { x: a, y: s } : { x: s, y: a }
                    );
                  })(n, t.rects, o)),
                  e
                );
              }, {}),
              a = s[t.placement],
              c = a.x,
              u = a.y;
            null != t.modifiersData.popperOffsets &&
              ((t.modifiersData.popperOffsets.x += c),
              (t.modifiersData.popperOffsets.y += u)),
              (t.modifiersData[i] = s);
          },
        },
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name;
            if (!t.modifiersData[i]._skip) {
              for (
                var r = n.mainAxis,
                  o = void 0 === r || r,
                  s = n.altAxis,
                  a = void 0 === s || s,
                  c = n.fallbackPlacements,
                  u = n.padding,
                  l = n.boundary,
                  f = n.rootBoundary,
                  p = n.altBoundary,
                  d = n.flipVariations,
                  h = void 0 === d || d,
                  m = n.allowedAutoPlacements,
                  g = t.options.placement,
                  v = Yi(g),
                  y =
                    c ||
                    (v === g || !h
                      ? [tr(g)]
                      : (function (e) {
                          if (Yi(e) === Pi) return [];
                          var t = tr(e);
                          return [ir(e), t, ir(t)];
                        })(g)),
                  b = [g].concat(y).reduce(function (e, n) {
                    return e.concat(
                      Yi(n) === Pi
                        ? (function (e, t) {
                            void 0 === t && (t = {});
                            var n = t,
                              i = n.placement,
                              r = n.boundary,
                              o = n.rootBoundary,
                              s = n.padding,
                              a = n.flipVariations,
                              c = n.allowedAutoPlacements,
                              u = void 0 === c ? Hi : c,
                              l = Xi(i),
                              f = l
                                ? a
                                  ? Ni
                                  : Ni.filter(function (e) {
                                      return Xi(e) === l;
                                    })
                                : zi,
                              p = f.filter(function (e) {
                                return u.indexOf(e) >= 0;
                              });
                            0 === p.length && (p = f);
                            var d = p.reduce(function (t, n) {
                              return (
                                (t[n] = lr(e, {
                                  placement: n,
                                  boundary: r,
                                  rootBoundary: o,
                                  padding: s,
                                })[Yi(n)]),
                                t
                              );
                            }, {});
                            return Object.keys(d).sort(function (e, t) {
                              return d[e] - d[t];
                            });
                          })(t, {
                            placement: n,
                            boundary: l,
                            rootBoundary: f,
                            padding: u,
                            flipVariations: h,
                            allowedAutoPlacements: m,
                          })
                        : n
                    );
                  }, []),
                  w = t.rects.reference,
                  x = t.rects.popper,
                  _ = new Map(),
                  O = !0,
                  k = b[0],
                  E = 0;
                E < b.length;
                E++
              ) {
                var S = b[E],
                  T = Yi(S),
                  A = Xi(S) === Ri,
                  C = [Li, ji].indexOf(T) >= 0,
                  L = C ? "width" : "height",
                  j = lr(t, {
                    placement: S,
                    boundary: l,
                    rootBoundary: f,
                    altBoundary: p,
                    padding: u,
                  }),
                  M = C ? (A ? Mi : Di) : A ? ji : Li;
                w[L] > x[L] && (M = tr(M));
                var D = tr(M),
                  P = [];
                if (
                  (o && P.push(j[T] <= 0),
                  a && P.push(j[M] <= 0, j[D] <= 0),
                  P.every(function (e) {
                    return e;
                  }))
                ) {
                  (k = S), (O = !1);
                  break;
                }
                _.set(S, P);
              }
              if (O)
                for (
                  var z = function (e) {
                      var t = b.find(function (t) {
                        var n = _.get(t);
                        if (n)
                          return n.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (k = t), "break";
                    },
                    R = h ? 3 : 1;
                  R > 0;
                  R--
                ) {
                  if ("break" === z(R)) break;
                }
              t.placement !== k &&
                ((t.modifiersData[i]._skip = !0),
                (t.placement = k),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        {
          name: "preventOverflow",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              r = n.mainAxis,
              o = void 0 === r || r,
              s = n.altAxis,
              a = void 0 !== s && s,
              c = n.boundary,
              u = n.rootBoundary,
              l = n.altBoundary,
              f = n.padding,
              p = n.tether,
              d = void 0 === p || p,
              h = n.tetherOffset,
              m = void 0 === h ? 0 : h,
              g = lr(t, {
                boundary: c,
                rootBoundary: u,
                padding: f,
                altBoundary: l,
              }),
              v = Yi(t.placement),
              y = Xi(t.placement),
              b = !y,
              w = Ji(v),
              x = "x" === w ? "y" : "x",
              _ = t.modifiersData.popperOffsets,
              O = t.rects.reference,
              k = t.rects.popper,
              E =
                "function" == typeof m
                  ? m(Object.assign({}, t.rects, { placement: t.placement }))
                  : m,
              S =
                "number" == typeof E
                  ? { mainAxis: E, altAxis: E }
                  : Object.assign({ mainAxis: 0, altAxis: 0 }, E),
              T = t.modifiersData.offset
                ? t.modifiersData.offset[t.placement]
                : null,
              A = { x: 0, y: 0 };
            if (_) {
              if (o) {
                var C,
                  L = "y" === w ? Li : Di,
                  j = "y" === w ? ji : Mi,
                  M = "y" === w ? "height" : "width",
                  D = _[w],
                  P = D + g[L],
                  z = D - g[j],
                  R = d ? -k[M] / 2 : 0,
                  I = y === Ri ? O[M] : k[M],
                  $ = y === Ri ? -k[M] : -O[M],
                  W = t.elements.arrow,
                  N = d && W ? Oi(W) : { width: 0, height: 0 },
                  H = t.modifiersData["arrow#persistent"]
                    ? t.modifiersData["arrow#persistent"].padding
                    : { top: 0, right: 0, bottom: 0, left: 0 },
                  F = H[L],
                  V = H[j],
                  B = fr(0, O[M], N[M]),
                  q = b
                    ? O[M] / 2 - R - B - F - S.mainAxis
                    : I - B - F - S.mainAxis,
                  G = b
                    ? -O[M] / 2 + R + B + V + S.mainAxis
                    : $ + B + V + S.mainAxis,
                  U = t.elements.arrow && Ci(t.elements.arrow),
                  Y = U
                    ? "y" === w
                      ? U.clientTop || 0
                      : U.clientLeft || 0
                    : 0,
                  X = null != (C = null == T ? void 0 : T[w]) ? C : 0,
                  J = D + G - X,
                  K = fr(d ? hi(P, D + q - X - Y) : P, D, d ? di(z, J) : z);
                (_[w] = K), (A[w] = K - D);
              }
              if (a) {
                var Z,
                  Q = "x" === w ? Li : Di,
                  ee = "x" === w ? ji : Mi,
                  te = _[x],
                  ne = "y" === x ? "height" : "width",
                  ie = te + g[Q],
                  re = te - g[ee],
                  oe = -1 !== [Li, Di].indexOf(v),
                  se = null != (Z = null == T ? void 0 : T[x]) ? Z : 0,
                  ae = oe ? ie : te - O[ne] - k[ne] - se + S.altAxis,
                  ce = oe ? te + O[ne] + k[ne] - se - S.altAxis : re,
                  ue =
                    d && oe
                      ? (function (e, t, n) {
                          var i = fr(e, t, n);
                          return i > n ? n : i;
                        })(ae, te, ce)
                      : fr(d ? ae : ie, te, d ? ce : re);
                (_[x] = ue), (A[x] = ue - te);
              }
              t.modifiersData[i] = A;
            }
          },
          requiresIfExists: ["offset"],
        },
        {
          name: "arrow",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t,
              n = e.state,
              i = e.name,
              r = e.options,
              o = n.elements.arrow,
              s = n.modifiersData.popperOffsets,
              a = Yi(n.placement),
              c = Ji(a),
              u = [Di, Mi].indexOf(a) >= 0 ? "height" : "width";
            if (o && s) {
              var l = (function (e, t) {
                  return cr(
                    "number" !=
                      typeof (e =
                        "function" == typeof e
                          ? e(
                              Object.assign({}, t.rects, {
                                placement: t.placement,
                              })
                            )
                          : e)
                      ? e
                      : ur(e, zi)
                  );
                })(r.padding, n),
                f = Oi(o),
                p = "y" === c ? Li : Di,
                d = "y" === c ? ji : Mi,
                h =
                  n.rects.reference[u] +
                  n.rects.reference[c] -
                  s[c] -
                  n.rects.popper[u],
                m = s[c] - n.rects.reference[c],
                g = Ci(o),
                v = g
                  ? "y" === c
                    ? g.clientHeight || 0
                    : g.clientWidth || 0
                  : 0,
                y = h / 2 - m / 2,
                b = l[p],
                w = v - f[u] - l[d],
                x = v / 2 - f[u] / 2 + y,
                _ = fr(b, x, w),
                O = c;
              n.modifiersData[i] =
                (((t = {})[O] = _), (t.centerOffset = _ - x), t);
            }
          },
          effect: function (e) {
            var t = e.state,
              n = e.options.element,
              i = void 0 === n ? "[data-popper-arrow]" : n;
            null != i &&
              ("string" != typeof i ||
                (i = t.elements.popper.querySelector(i))) &&
              rr(t.elements.popper, i) &&
              (t.elements.arrow = i);
          },
          requires: ["popperOffsets"],
          requiresIfExists: ["preventOverflow"],
        },
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              i = t.rects.reference,
              r = t.rects.popper,
              o = t.modifiersData.preventOverflow,
              s = lr(t, { elementContext: "reference" }),
              a = lr(t, { altBoundary: !0 }),
              c = pr(s, i),
              u = pr(a, r, o),
              l = dr(c),
              f = dr(u);
            (t.modifiersData[n] = {
              referenceClippingOffsets: c,
              popperEscapeOffsets: u,
              isReferenceHidden: l,
              hasPopperEscaped: f,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": l,
                "data-popper-escaped": f,
              }));
          },
        },
      ],
    }),
    mr = "tippy-content",
    gr = "tippy-backdrop",
    vr = "tippy-arrow",
    yr = "tippy-svg-arrow",
    br = { passive: !0, capture: !0 },
    wr = function () {
      return document.body;
    };
  function xr(e, t, n) {
    if (Array.isArray(e)) {
      var i = e[t];
      return null == i ? (Array.isArray(n) ? n[t] : n) : i;
    }
    return e;
  }
  function _r(e, t) {
    var n = {}.toString.call(e);
    return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
  }
  function Or(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function kr(e, t) {
    return 0 === t
      ? e
      : function (i) {
          clearTimeout(n),
            (n = setTimeout(function () {
              e(i);
            }, t));
        };
    var n;
  }
  function Er(e) {
    return [].concat(e);
  }
  function Sr(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function Tr(e) {
    return e.split("-")[0];
  }
  function Ar(e) {
    return [].slice.call(e);
  }
  function Cr(e) {
    return Object.keys(e).reduce(function (t, n) {
      return void 0 !== e[n] && (t[n] = e[n]), t;
    }, {});
  }
  function Lr() {
    return document.createElement("div");
  }
  function jr(e) {
    return ["Element", "Fragment"].some(function (t) {
      return _r(e, t);
    });
  }
  function Mr(e) {
    return _r(e, "MouseEvent");
  }
  function Dr(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function Pr(e) {
    return jr(e)
      ? [e]
      : (function (e) {
          return _r(e, "NodeList");
        })(e)
      ? Ar(e)
      : Array.isArray(e)
      ? e
      : Ar(document.querySelectorAll(e));
  }
  function zr(e, t) {
    e.forEach(function (e) {
      e && (e.style.transitionDuration = t + "ms");
    });
  }
  function Rr(e, t) {
    e.forEach(function (e) {
      e && e.setAttribute("data-state", t);
    });
  }
  function Ir(e) {
    var t,
      n = Er(e)[0];
    return null != n && null != (t = n.ownerDocument) && t.body
      ? n.ownerDocument
      : document;
  }
  function $r(e, t, n) {
    var i = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
      e[i](t, n);
    });
  }
  function Wr(e, t) {
    for (var n = t; n; ) {
      var i;
      if (e.contains(n)) return !0;
      n =
        null == n.getRootNode || null == (i = n.getRootNode())
          ? void 0
          : i.host;
    }
    return !1;
  }
  var Nr = { isTouch: !1 },
    Hr = 0;
  function Fr() {
    Nr.isTouch ||
      ((Nr.isTouch = !0),
      window.performance && document.addEventListener("mousemove", Vr));
  }
  function Vr() {
    var e = performance.now();
    e - Hr < 20 &&
      ((Nr.isTouch = !1), document.removeEventListener("mousemove", Vr)),
      (Hr = e);
  }
  function Br() {
    var e = document.activeElement;
    if (Dr(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var qr =
    !!("undefined" != typeof window && "undefined" != typeof document) &&
    !!window.msCrypto;
  var Gr = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1,
    },
    Ur = Object.assign(
      {
        appendTo: wr,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      Gr,
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    Yr = Object.keys(Ur);
  function Xr(e) {
    var t = (e.plugins || []).reduce(function (t, n) {
      var i,
        r = n.name,
        o = n.defaultValue;
      r && (t[r] = void 0 !== e[r] ? e[r] : null != (i = Ur[r]) ? i : o);
      return t;
    }, {});
    return Object.assign({}, e, t);
  }
  function Jr(e, t) {
    var n = Object.assign(
      {},
      t,
      { content: Or(t.content, [e]) },
      t.ignoreAttributes
        ? {}
        : (function (e, t) {
            return (t
              ? Object.keys(Xr(Object.assign({}, Ur, { plugins: t })))
              : Yr
            ).reduce(function (t, n) {
              var i = (e.getAttribute("data-tippy-" + n) || "").trim();
              if (!i) return t;
              if ("content" === n) t[n] = i;
              else
                try {
                  t[n] = JSON.parse(i);
                } catch (e) {
                  t[n] = i;
                }
              return t;
            }, {});
          })(e, t.plugins)
    );
    return (
      (n.aria = Object.assign({}, Ur.aria, n.aria)),
      (n.aria = {
        expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
        content:
          "auto" === n.aria.content
            ? t.interactive
              ? null
              : "describedby"
            : n.aria.content,
      }),
      n
    );
  }
  function Kr(e, t) {
    e.innerHTML = t;
  }
  function Zr(e) {
    var t = Lr();
    return (
      !0 === e
        ? (t.className = vr)
        : ((t.className = yr), jr(e) ? t.appendChild(e) : Kr(t, e)),
      t
    );
  }
  function Qr(e, t) {
    jr(t.content)
      ? (Kr(e, ""), e.appendChild(t.content))
      : "function" != typeof t.content &&
        (t.allowHTML ? Kr(e, t.content) : (e.textContent = t.content));
  }
  function eo(e) {
    var t = e.firstElementChild,
      n = Ar(t.children);
=======
        bindings: {
            input: {
                [":id"]: "`param-${name}`",
                ["x-ref"]: "input",
                ["x-model.debounce.200"]: "value",
                ["@keydown.stop"]: true
            }
        }
    };
}
exports.default = paramFieldComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dX3DZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _splitGrid = require("split-grid");
var _splitGridDefault = parcelHelpers.interopDefault(_splitGrid);
function splitLayoutComponent({ split , opts  }) {
    let splitter = null;
>>>>>>> 8a8eeb1 (Automate basic theme generation)
    return {
      box: t,
      content: n.find(function (e) {
        return e.classList.contains(mr);
      }),
      arrow: n.find(function (e) {
        return e.classList.contains(vr) || e.classList.contains(yr);
      }),
      backdrop: n.find(function (e) {
        return e.classList.contains(gr);
      }),
    };
  }
  function to(e) {
    var t = Lr(),
      n = Lr();
    (n.className = "tippy-box"),
      n.setAttribute("data-state", "hidden"),
      n.setAttribute("tabindex", "-1");
    var i = Lr();
    function r(n, i) {
      var r = eo(t),
        o = r.box,
        s = r.content,
        a = r.arrow;
      i.theme
        ? o.setAttribute("data-theme", i.theme)
        : o.removeAttribute("data-theme"),
        "string" == typeof i.animation
          ? o.setAttribute("data-animation", i.animation)
          : o.removeAttribute("data-animation"),
        i.inertia
          ? o.setAttribute("data-inertia", "")
          : o.removeAttribute("data-inertia"),
        (o.style.maxWidth =
          "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
        i.role ? o.setAttribute("role", i.role) : o.removeAttribute("role"),
        (n.content === i.content && n.allowHTML === i.allowHTML) ||
          Qr(s, e.props),
        i.arrow
          ? a
            ? n.arrow !== i.arrow &&
              (o.removeChild(a), o.appendChild(Zr(i.arrow)))
            : o.appendChild(Zr(i.arrow))
          : a && o.removeChild(a);
    }
    return (
      (i.className = mr),
      i.setAttribute("data-state", "hidden"),
      Qr(i, e.props),
      t.appendChild(n),
      n.appendChild(i),
      r(e.props, e.props),
      { popper: t, onUpdate: r }
    );
  }
  to.$$tippy = !0;
  var no = 1,
    io = [],
    ro = [];
  function oo(e, t) {
    var n,
      i,
      r,
      o,
      s,
      a,
      c,
      u,
      l = Jr(e, Object.assign({}, Ur, Xr(Cr(t)))),
      f = !1,
      p = !1,
      d = !1,
      h = !1,
      m = [],
      g = kr(U, l.interactiveDebounce),
      v = no++,
      y = (u = l.plugins).filter(function (e, t) {
        return u.indexOf(e) === t;
      }),
      b = {
        id: v,
        reference: e,
        popper: Lr(),
        popperInstance: null,
        props: l,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: y,
        clearDelayTimeouts: function () {
          clearTimeout(n), clearTimeout(i), cancelAnimationFrame(r);
        },
        setProps: function (t) {
          0;
          if (b.state.isDestroyed) return;
          D("onBeforeUpdate", [b, t]), q();
          var n = b.props,
            i = Jr(e, Object.assign({}, n, Cr(t), { ignoreAttributes: !0 }));
          (b.props = i),
            B(),
            n.interactiveDebounce !== i.interactiveDebounce &&
              (R(), (g = kr(U, i.interactiveDebounce)));
          n.triggerTarget && !i.triggerTarget
            ? Er(n.triggerTarget).forEach(function (e) {
                e.removeAttribute("aria-expanded");
              })
            : i.triggerTarget && e.removeAttribute("aria-expanded");
          z(), M(), _ && _(n, i);
          b.popperInstance &&
            (K(),
            Q().forEach(function (e) {
              requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
            }));
          D("onAfterUpdate", [b, t]);
        },
        setContent: function (e) {
          b.setProps({ content: e });
        },
        show: function () {
          0;
          var e = b.state.isVisible,
            t = b.state.isDestroyed,
            n = !b.state.isEnabled,
            i = Nr.isTouch && !b.props.touch,
            r = xr(b.props.duration, 0, Ur.duration);
          if (e || t || n || i) return;
          if (A().hasAttribute("disabled")) return;
          if ((D("onShow", [b], !1), !1 === b.props.onShow(b))) return;
          (b.state.isVisible = !0), T() && (x.style.visibility = "visible");
          M(), N(), b.state.isMounted || (x.style.transition = "none");
          if (T()) {
            var o = L(),
              s = o.box,
              c = o.content;
            zr([s, c], 0);
          }
          (a = function () {
            var e;
            if (b.state.isVisible && !h) {
              if (
                ((h = !0),
                x.offsetHeight,
                (x.style.transition = b.props.moveTransition),
                T() && b.props.animation)
              ) {
                var t = L(),
                  n = t.box,
                  i = t.content;
                zr([n, i], r), Rr([n, i], "visible");
              }
              P(),
                z(),
                Sr(ro, b),
                null == (e = b.popperInstance) || e.forceUpdate(),
                D("onMount", [b]),
                b.props.animation &&
                  T() &&
                  (function (e, t) {
                    F(e, t);
                  })(r, function () {
                    (b.state.isShown = !0), D("onShown", [b]);
                  });
            }
          }),
            (function () {
              var e,
                t = b.props.appendTo,
                n = A();
              e =
                (b.props.interactive && t === wr) || "parent" === t
                  ? n.parentNode
                  : Or(t, [n]);
              e.contains(x) || e.appendChild(x);
              (b.state.isMounted = !0), K(), !1;
            })();
        },
        hide: function () {
          0;
          var e = !b.state.isVisible,
            t = b.state.isDestroyed,
            n = !b.state.isEnabled,
            i = xr(b.props.duration, 1, Ur.duration);
          if (e || t || n) return;
          if ((D("onHide", [b], !1), !1 === b.props.onHide(b))) return;
          (b.state.isVisible = !1),
            (b.state.isShown = !1),
            (h = !1),
            (f = !1),
            T() && (x.style.visibility = "hidden");
          if ((R(), H(), M(!0), T())) {
            var r = L(),
              o = r.box,
              s = r.content;
            b.props.animation && (zr([o, s], i), Rr([o, s], "hidden"));
          }
          P(),
            z(),
            b.props.animation
              ? T() &&
                (function (e, t) {
                  F(e, function () {
                    !b.state.isVisible &&
                      x.parentNode &&
                      x.parentNode.contains(x) &&
                      t();
                  });
                })(i, b.unmount)
              : b.unmount();
        },
        hideWithInteractivity: function (e) {
          0;
          C().addEventListener("mousemove", g), Sr(io, g), g(e);
        },
        enable: function () {
          b.state.isEnabled = !0;
        },
        disable: function () {
          b.hide(), (b.state.isEnabled = !1);
        },
        unmount: function () {
          0;
          b.state.isVisible && b.hide();
          if (!b.state.isMounted) return;
          Z(),
            Q().forEach(function (e) {
              e._tippy.unmount();
            }),
            x.parentNode && x.parentNode.removeChild(x);
          (ro = ro.filter(function (e) {
            return e !== b;
          })),
            (b.state.isMounted = !1),
            D("onHidden", [b]);
        },
        destroy: function () {
          0;
          if (b.state.isDestroyed) return;
          b.clearDelayTimeouts(),
            b.unmount(),
            q(),
            delete e._tippy,
            (b.state.isDestroyed = !0),
            D("onDestroy", [b]);
        },
      };
    if (!l.render) return b;
    var w = l.render(b),
      x = w.popper,
      _ = w.onUpdate;
    x.setAttribute("data-tippy-root", ""),
      (x.id = "tippy-" + b.id),
      (b.popper = x),
      (e._tippy = b),
      (x._tippy = b);
    var O = y.map(function (e) {
        return e.fn(b);
      }),
      k = e.hasAttribute("aria-expanded");
    return (
      B(),
      z(),
      M(),
      D("onCreate", [b]),
      l.showOnCreate && ee(),
      x.addEventListener("mouseenter", function () {
        b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
      }),
      x.addEventListener("mouseleave", function () {
        b.props.interactive &&
          b.props.trigger.indexOf("mouseenter") >= 0 &&
          C().addEventListener("mousemove", g);
      }),
      b
    );
    function E() {
      var e = b.props.touch;
      return Array.isArray(e) ? e : [e, 0];
    }
    function S() {
      return "hold" === E()[0];
    }
    function T() {
      var e;
      return !(null == (e = b.props.render) || !e.$$tippy);
    }
    function A() {
      return c || e;
    }
    function C() {
      var e = A().parentNode;
      return e ? Ir(e) : document;
    }
    function L() {
      return eo(x);
    }
    function j(e) {
      return (b.state.isMounted && !b.state.isVisible) ||
        Nr.isTouch ||
        (o && "focus" === o.type)
        ? 0
        : xr(b.props.delay, e ? 0 : 1, Ur.delay);
    }
    function M(e) {
      void 0 === e && (e = !1),
        (x.style.pointerEvents = b.props.interactive && !e ? "" : "none"),
        (x.style.zIndex = "" + b.props.zIndex);
    }
    function D(e, t, n) {
      var i;
      (void 0 === n && (n = !0),
      O.forEach(function (n) {
        n[e] && n[e].apply(n, t);
      }),
      n) && (i = b.props)[e].apply(i, t);
    }
    function P() {
      var t = b.props.aria;
      if (t.content) {
        var n = "aria-" + t.content,
          i = x.id;
        Er(b.props.triggerTarget || e).forEach(function (e) {
          var t = e.getAttribute(n);
          if (b.state.isVisible) e.setAttribute(n, t ? t + " " + i : i);
          else {
            var r = t && t.replace(i, "").trim();
            r ? e.setAttribute(n, r) : e.removeAttribute(n);
          }
        });
      }
    }
    function z() {
      !k &&
        b.props.aria.expanded &&
        Er(b.props.triggerTarget || e).forEach(function (e) {
          b.props.interactive
            ? e.setAttribute(
                "aria-expanded",
                b.state.isVisible && e === A() ? "true" : "false"
              )
            : e.removeAttribute("aria-expanded");
        });
    }
    function R() {
      C().removeEventListener("mousemove", g),
        (io = io.filter(function (e) {
          return e !== g;
        }));
    }
    function I(t) {
      if (!Nr.isTouch || (!d && "mousedown" !== t.type)) {
        var n = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!b.props.interactive || !Wr(x, n)) {
          if (
            Er(b.props.triggerTarget || e).some(function (e) {
              return Wr(e, n);
            })
          ) {
            if (Nr.isTouch) return;
            if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
              return;
          } else D("onClickOutside", [b, t]);
          !0 === b.props.hideOnClick &&
            (b.clearDelayTimeouts(),
            b.hide(),
            (p = !0),
            setTimeout(function () {
              p = !1;
            }),
            b.state.isMounted || H());
        }
      }
    }
    function $() {
      d = !0;
    }
    function W() {
      d = !1;
    }
    function N() {
      var e = C();
      e.addEventListener("mousedown", I, !0),
        e.addEventListener("touchend", I, br),
        e.addEventListener("touchstart", W, br),
        e.addEventListener("touchmove", $, br);
    }
    function H() {
      var e = C();
      e.removeEventListener("mousedown", I, !0),
        e.removeEventListener("touchend", I, br),
        e.removeEventListener("touchstart", W, br),
        e.removeEventListener("touchmove", $, br);
    }
    function F(e, t) {
      var n = L().box;
      function i(e) {
        e.target === n && ($r(n, "remove", i), t());
      }
      if (0 === e) return t();
      $r(n, "remove", s), $r(n, "add", i), (s = i);
    }
    function V(t, n, i) {
      void 0 === i && (i = !1),
        Er(b.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, n, i),
            m.push({ node: e, eventType: t, handler: n, options: i });
        });
    }
    function B() {
      var e;
      S() &&
        (V("touchstart", G, { passive: !0 }),
        V("touchend", Y, { passive: !0 })),
        ((e = b.props.trigger), e.split(/\s+/).filter(Boolean)).forEach(
          function (e) {
            if ("manual" !== e)
              switch ((V(e, G), e)) {
                case "mouseenter":
                  V("mouseleave", Y);
                  break;
                case "focus":
                  V(qr ? "focusout" : "blur", X);
                  break;
                case "focusin":
                  V("focusout", X);
              }
          }
        );
    }
    function q() {
      m.forEach(function (e) {
        var t = e.node,
          n = e.eventType,
          i = e.handler,
          r = e.options;
        t.removeEventListener(n, i, r);
      }),
        (m = []);
    }
    function G(e) {
      var t,
        n = !1;
      if (b.state.isEnabled && !J(e) && !p) {
        var i = "focus" === (null == (t = o) ? void 0 : t.type);
        (o = e),
          (c = e.currentTarget),
          z(),
          !b.state.isVisible &&
            Mr(e) &&
            io.forEach(function (t) {
              return t(e);
            }),
          "click" === e.type &&
          (b.props.trigger.indexOf("mouseenter") < 0 || f) &&
          !1 !== b.props.hideOnClick &&
          b.state.isVisible
            ? (n = !0)
            : ee(e),
          "click" === e.type && (f = !n),
          n && !i && te(e);
      }
    }
    function U(e) {
      var t = e.target,
        n = A().contains(t) || x.contains(t);
      ("mousemove" === e.type && n) ||
        ((function (e, t) {
          var n = t.clientX,
            i = t.clientY;
          return e.every(function (e) {
            var t = e.popperRect,
              r = e.popperState,
              o = e.props.interactiveBorder,
              s = Tr(r.placement),
              a = r.modifiersData.offset;
            if (!a) return !0;
            var c = "bottom" === s ? a.top.y : 0,
              u = "top" === s ? a.bottom.y : 0,
              l = "right" === s ? a.left.x : 0,
              f = "left" === s ? a.right.x : 0,
              p = t.top - i + c > o,
              d = i - t.bottom - u > o,
              h = t.left - n + l > o,
              m = n - t.right - f > o;
            return p || d || h || m;
          });
        })(
          Q()
            .concat(x)
            .map(function (e) {
              var t,
                n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
              return n
                ? {
                    popperRect: e.getBoundingClientRect(),
                    popperState: n,
                    props: l,
                  }
                : null;
            })
            .filter(Boolean),
          e
        ) &&
          (R(), te(e)));
    }
    function Y(e) {
      J(e) ||
        (b.props.trigger.indexOf("click") >= 0 && f) ||
        (b.props.interactive ? b.hideWithInteractivity(e) : te(e));
    }
    function X(e) {
      (b.props.trigger.indexOf("focusin") < 0 && e.target !== A()) ||
        (b.props.interactive &&
          e.relatedTarget &&
          x.contains(e.relatedTarget)) ||
        te(e);
    }
    function J(e) {
      return !!Nr.isTouch && S() !== e.type.indexOf("touch") >= 0;
    }
    function K() {
      Z();
      var t = b.props,
        n = t.popperOptions,
        i = t.placement,
        r = t.offset,
        o = t.getReferenceClientRect,
        s = t.moveTransition,
        c = T() ? eo(x).arrow : null,
        u = o
          ? {
              getBoundingClientRect: o,
              contextElement: o.contextElement || A(),
            }
          : e,
        l = [
          { name: "offset", options: { offset: r } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !s } },
          {
            name: "$$tippy",
            enabled: !0,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: function (e) {
              var t = e.state;
              if (T()) {
                var n = L().box;
                ["placement", "reference-hidden", "escaped"].forEach(function (
                  e
                ) {
                  "placement" === e
                    ? n.setAttribute("data-placement", t.placement)
                    : t.attributes.popper["data-popper-" + e]
                    ? n.setAttribute("data-" + e, "")
                    : n.removeAttribute("data-" + e);
                }),
                  (t.attributes.popper = {});
              }
            },
          },
        ];
      T() &&
        c &&
        l.push({ name: "arrow", options: { element: c, padding: 3 } }),
        l.push.apply(l, (null == n ? void 0 : n.modifiers) || []),
        (b.popperInstance = hr(
          u,
          x,
          Object.assign({}, n, { placement: i, onFirstUpdate: a, modifiers: l })
        ));
    }
    function Z() {
      b.popperInstance &&
        (b.popperInstance.destroy(), (b.popperInstance = null));
    }
    function Q() {
      return Ar(x.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      b.clearDelayTimeouts(), e && D("onTrigger", [b, e]), N();
      var t = j(!0),
        i = E(),
        r = i[0],
        o = i[1];
      Nr.isTouch && "hold" === r && o && (t = o),
        t
          ? (n = setTimeout(function () {
              b.show();
            }, t))
          : b.show();
    }
    function te(e) {
      if (
        (b.clearDelayTimeouts(), D("onUntrigger", [b, e]), b.state.isVisible)
      ) {
        if (
          !(
            b.props.trigger.indexOf("mouseenter") >= 0 &&
            b.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
            f
          )
        ) {
          var t = j(!1);
          t
            ? (i = setTimeout(function () {
                b.state.isVisible && b.hide();
              }, t))
            : (r = requestAnimationFrame(function () {
                b.hide();
              }));
        }
      } else H();
    }
  }
  function so(e, t) {
    void 0 === t && (t = {});
    var n = Ur.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", Fr, br),
      window.addEventListener("blur", Br);
    var i = Object.assign({}, t, { plugins: n }),
      r = Pr(e).reduce(function (e, t) {
        var n = t && oo(t, i);
        return n && e.push(n), e;
      }, []);
    return jr(e) ? r[0] : r;
  }
  (so.defaultProps = Ur),
    (so.setDefaultProps = function (e) {
      Object.keys(e).forEach(function (t) {
        Ur[t] = e[t];
      });
    }),
    (so.currentInput = Nr);
  Object.assign({}, pi, {
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
    },
  });
  so.setDefaultProps({ render: to });
  var ao = so;
  ao.setDefaultProps({ allowHTML: !0, theme: "lookbook" });
  var co = ao;
  function uo() {
    return {
      init() {
        this._initTippy();
      },
      startSpin() {
        this._spinning = !0;
      },
      stopSpin(e = 0) {
        setTimeout(() => (this._spinning = !1), e);
      },
      _spinning: !1,
      _initTippy() {
        this.$refs.tooltip &&
          (this._labelTippy = co(this.$refs.icon, {
            triggerTarget: this.$el,
            content: this.$refs.tooltip.innerHTML,
          }));
      },
      _labelTippy: null,
    };
  }
  var lo = {};
  function fo() {
    return {};
  }
  t(lo), n(lo, "default", () => fo);
  var po = {};
  function ho(e = null) {
    const t = uo();
    return {
      ...t,
      done: !1,
      init() {
        t.init.bind(this)(),
          (this._copyTarget =
            null === e
              ? this.$refs.copyContent
              : "string" == typeof e
              ? document.querySelector(e)
              : e),
          (this._notificationTippy = co(this.$el, {
            content: "Copied!",
            trigger: "manual",
          }));
      },
      async copyToClipboard() {
        await window.navigator.clipboard.writeText(this.getContent()),
          (this.done = !0),
          this._notificationTippy.show(),
          this._labelTippy.hide(),
          setTimeout(() => {
            (this.done = !1), this._notificationTippy.hide();
          }, 1e3);
      },
      getContent() {
        const e = document.createElement("textarea");
        return (
          (e.innerHTML = this._copyTarget ? this._copyTarget.innerHTML : ""),
          e.value.trim()
        );
      },
      _copyTarget: null,
      _notificationTippy: null,
    };
  }
  t(po), n(po, "default", () => ho);
  var mo = {};
  function go(e) {
    return {
      focussed: !1,
      get active() {
        return e.active;
      },
      get text() {
        return e.text;
      },
      clear() {
        "" === e.raw ? this.$refs.input.blur() : (e.raw = "");
      },
      focus() {
        this.$refs.input.focus();
      },
    };
  }
  t(mo), n(mo, "default", () => go);
  var vo = {};
  t(vo), n(vo, "default", () => bo);
  var yo = {};
  function bo(e, t) {
    return (
      t[e] || (t[e] = { width: "100%", height: "100%" }),
      {
        tab: "preview",
        resizer: null,
        get store() {
          return t[e];
        },
        async loadResizer() {
          window.iFrameResize(
            { heightCalculationMethod: "lowestElement" },
            this.$el.querySelector("iframe")
          ),
            (this.resizer = this.$el.querySelector("iframe").iFrameResizer),
            this.resizer.resize();
        },
        resizeIframe(e) {
          (this.store.width = e),
            this.$el.querySelector("iframe").iFrameResizer.resize();
        },
      }
    );
  }
  !(function (e) {
    if ("undefined" != typeof window) {
      var t,
        n = 0,
        i = !1,
        r = !1,
        o = "message".length,
        s = "[iFrameSizer]",
        a = s.length,
        c = null,
        u = window.requestAnimationFrame,
        l = { max: 1, scroll: 1, bodyScroll: 1, documentElementScroll: 1 },
        f = {},
        p = null,
        d = {
          autoResize: !0,
          bodyBackground: null,
          bodyMargin: null,
          bodyMarginV1: 8,
          bodyPadding: null,
          checkOrigin: !0,
          inPageLinks: !1,
          enablePublicMethods: !0,
          heightCalculationMethod: "bodyOffset",
          id: "iFrameResizer",
          interval: 32,
          log: !1,
          maxHeight: 1 / 0,
          maxWidth: 1 / 0,
          minHeight: 0,
          minWidth: 0,
          mouseEvents: !0,
          resizeFrom: "parent",
          scrolling: !1,
          sizeHeight: !0,
          sizeWidth: !1,
          warningTimeout: 5e3,
          tolerance: 0,
          widthCalculationMethod: "scroll",
          onClose: function () {
            return !0;
          },
          onClosed: function () {},
          onInit: function () {},
          onMessage: function () {
            _("onMessage function not defined");
          },
          onMouseEnter: function () {},
          onMouseLeave: function () {},
          onResized: function () {},
          onScroll: function () {
            return !0;
          },
        },
        h = {};
      window.jQuery &&
        ((t = window.jQuery).fn
          ? t.fn.iFrameResize ||
            (t.fn.iFrameResize = function (e) {
              return this.filter("iframe")
                .each(function (t, n) {
                  R(n, e);
                })
                .end();
            })
          : x("", "Unable to bind to jQuery, it is not fully loaded.")),
        "function" == typeof define && define.amd
          ? define([], H)
          : "object" == typeof yo && (yo = H()),
        (window.iFrameResize = window.iFrameResize || H());
    }
    function m() {
      return (
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver
      );
    }
    function g(e, t, n) {
      e.addEventListener(t, n, !1);
    }
    function v(e, t, n) {
      e.removeEventListener(t, n, !1);
    }
    function y(e) {
      return (
        s +
        "[" +
        (function (e) {
          var t = "Host page: " + e;
          return (
            window.top !== window.self &&
              (t =
                window.parentIFrame && window.parentIFrame.getId
                  ? window.parentIFrame.getId() + ": " + e
                  : "Nested host page: " + e),
            t
          );
        })(e) +
        "]"
      );
    }
    function b(e) {
      return f[e] ? f[e].log : i;
    }
    function w(e, t) {
      O("log", e, t, b(e));
    }
    function x(e, t) {
      O("info", e, t, b(e));
    }
    function _(e, t) {
      O("warn", e, t, !0);
    }
    function O(e, t, n, i) {
      !0 === i && "object" == typeof window.console && console[e](y(t), n);
    }
    function k(e) {
      function t() {
        r("Height"),
          r("Width"),
          D(
            function () {
              M(H), C(F), b("onResized", H);
            },
            H,
            "init"
          );
      }
      function n(e) {
        return "border-box" !== e.boxSizing
          ? 0
          : (e.paddingTop ? parseInt(e.paddingTop, 10) : 0) +
              (e.paddingBottom ? parseInt(e.paddingBottom, 10) : 0);
      }
      function i(e) {
        return "border-box" !== e.boxSizing
          ? 0
          : (e.borderTopWidth ? parseInt(e.borderTopWidth, 10) : 0) +
              (e.borderBottomWidth ? parseInt(e.borderBottomWidth, 10) : 0);
      }
      function r(e) {
        var t = Number(f[F]["max" + e]),
          n = Number(f[F]["min" + e]),
          i = e.toLowerCase(),
          r = Number(H[i]);
        w(F, "Checking " + i + " is in range " + n + "-" + t),
          r < n && ((r = n), w(F, "Set " + i + " to min value")),
          r > t && ((r = t), w(F, "Set " + i + " to max value")),
          (H[i] = "" + r);
      }
      function u(e) {
        return N.substr(N.indexOf(":") + o + e);
      }
      function l(e, t) {
        var n, i, r;
        (n = function () {
          var n, i;
          P(
            "Send Page Info",
            "pageInfo:" +
              ((n = document.body.getBoundingClientRect()),
              (i = H.iframe.getBoundingClientRect()),
              JSON.stringify({
                iframeHeight: i.height,
                iframeWidth: i.width,
                clientHeight: Math.max(
                  document.documentElement.clientHeight,
                  window.innerHeight || 0
                ),
                clientWidth: Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0
                ),
                offsetTop: parseInt(i.top - n.top, 10),
                offsetLeft: parseInt(i.left - n.left, 10),
                scrollTop: window.pageYOffset,
                scrollLeft: window.pageXOffset,
                documentHeight: document.documentElement.clientHeight,
                documentWidth: document.documentElement.clientWidth,
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth,
              })),
            e,
            t
          );
        }),
          (i = 32),
          h[(r = t)] ||
            (h[r] = setTimeout(function () {
              (h[r] = null), n();
            }, i));
      }
      function p(e) {
        var t = e.getBoundingClientRect();
        return (
          A(F),
          {
            x: Math.floor(Number(t.left) + Number(c.x)),
            y: Math.floor(Number(t.top) + Number(c.y)),
          }
        );
      }
      function d(e) {
        var t = e ? p(H.iframe) : { x: 0, y: 0 },
          n = { x: Number(H.width) + t.x, y: Number(H.height) + t.y };
        w(
          F,
          "Reposition requested from iFrame (offset x:" +
            t.x +
            " y:" +
            t.y +
            ")"
        ),
          window.top !== window.self
            ? window.parentIFrame
              ? window.parentIFrame["scrollTo" + (e ? "Offset" : "")](n.x, n.y)
              : _(
                  F,
                  "Unable to scroll to requested position, window.parentIFrame not found"
                )
            : ((c = n), m(), w(F, "--"));
      }
      function m() {
        !1 !== b("onScroll", c) ? C(F) : L();
      }
      function y(e) {
        var t = {};
        if (0 === Number(H.width) && 0 === Number(H.height)) {
          var n = u(9).split(":");
          t = { x: n[1], y: n[0] };
        } else t = { x: H.width, y: H.height };
        b(e, {
          iframe: H.iframe,
          screenX: Number(t.x),
          screenY: Number(t.y),
          type: H.type,
        });
      }
      function b(e, t) {
        return E(F, e, t);
      }
      var O,
        k,
        S,
        R,
        I,
        $,
        W,
        N = e.data,
        H = {},
        F = null;
      "[iFrameResizerChild]Ready" === N
        ? (function () {
            for (var e in f) P("iFrame requested init", z(e), f[e].iframe, e);
          })()
        : s === ("" + N).substr(0, a) && N.substr(a).split(":")[0] in f
        ? ((R = N.substr(a).split(":")),
          (I = R[1] ? parseInt(R[1], 10) : 0),
          ($ = f[R[0]] && f[R[0]].iframe),
          (W = getComputedStyle($)),
          (H = {
            iframe: $,
            id: R[0],
            height: I + n(W) + i(W),
            width: R[2],
            type: R[3],
          }),
          (F = H.id),
          f[F] && (f[F].loaded = !0),
          (S = H.type in { true: 1, false: 1, undefined: 1 }) &&
            w(F, "Ignoring init message from meta parent page"),
          !S &&
            ((k = !0),
            f[(O = F)] ||
              ((k = !1),
              _(H.type + " No settings for " + O + ". Message was: " + N)),
            k) &&
            (w(F, "Received: " + N),
            (function () {
              var e = !0;
              return (
                null === H.iframe &&
                  (_(F, "IFrame (" + H.id + ") not found"), (e = !1)),
                e
              );
            })() &&
              (function () {
                var t,
                  n = e.origin,
                  i = f[F] && f[F].checkOrigin;
                if (
                  i &&
                  "" + n != "null" &&
                  !(i.constructor === Array
                    ? (function () {
                        var e = 0,
                          t = !1;
                        for (
                          w(
                            F,
                            "Checking connection is from allowed list of origins: " +
                              i
                          );
                          e < i.length;
                          e++
                        )
                          if (i[e] === n) {
                            t = !0;
                            break;
                          }
                        return t;
                      })()
                    : ((t = f[F] && f[F].remoteHost),
                      w(F, "Checking connection is from: " + t),
                      n === t))
                )
                  throw new Error(
                    "Unexpected message received from: " +
                      n +
                      " for " +
                      H.iframe.id +
                      ". Message was: " +
                      e.data +
                      ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains."
                  );
                return !0;
              })() &&
              (function () {
                switch (
                  (f[F] && f[F].firstRun && f[F] && (f[F].firstRun = !1),
                  H.type)
                ) {
                  case "close":
                    T(H.iframe);
                    break;
                  case "message":
                    (e = u(6)),
                      w(
                        F,
                        "onMessage passed: {iframe: " +
                          H.iframe.id +
                          ", message: " +
                          e +
                          "}"
                      ),
                      b("onMessage", {
                        iframe: H.iframe,
                        message: JSON.parse(e),
                      }),
                      w(F, "--");
                    break;
                  case "mouseenter":
                    y("onMouseEnter");
                    break;
                  case "mouseleave":
                    y("onMouseLeave");
                    break;
                  case "autoResize":
                    f[F].autoResize = JSON.parse(u(9));
                    break;
                  case "scrollTo":
                    d(!1);
                    break;
                  case "scrollToOffset":
                    d(!0);
                    break;
                  case "pageInfo":
                    l(f[F] && f[F].iframe, F),
                      (function () {
                        function e(e, i) {
                          function r() {
                            f[n] ? l(f[n].iframe, n) : t();
                          }
                          ["scroll", "resize"].forEach(function (t) {
                            w(n, e + t + " listener for sendPageInfo"),
                              i(window, t, r);
                          });
                        }
                        function t() {
                          e("Remove ", v);
                        }
                        var n = F;
                        e("Add ", g), f[n] && (f[n].stopPageInfo = t);
                      })();
                    break;
                  case "pageInfoStop":
                    f[F] &&
                      f[F].stopPageInfo &&
                      (f[F].stopPageInfo(), delete f[F].stopPageInfo);
                    break;
                  case "inPageLink":
                    !(function (e) {
                      var t,
                        n = e.split("#")[1] || "",
                        i = decodeURIComponent(n),
                        r =
                          document.getElementById(i) ||
                          document.getElementsByName(i)[0];
                      r
                        ? ((t = p(r)),
                          w(
                            F,
                            "Moving to in page link (#" +
                              n +
                              ") at x: " +
                              t.x +
                              " y: " +
                              t.y
                          ),
                          (c = { x: t.x, y: t.y }),
                          m(),
                          w(F, "--"))
                        : window.top !== window.self
                        ? window.parentIFrame
                          ? window.parentIFrame.moveToAnchor(n)
                          : w(
                              F,
                              "In page link #" +
                                n +
                                " not found and window.parentIFrame not found"
                            )
                        : w(F, "In page link #" + n + " not found");
                    })(u(9));
                    break;
                  case "reset":
                    j(H);
                    break;
                  case "init":
                    t(), b("onInit", H.iframe);
                    break;
                  default:
                    0 === Number(H.width) && 0 === Number(H.height)
                      ? _(
                          "Unsupported message received (" +
                            H.type +
                            "), this is likely due to the iframe containing a later version of iframe-resizer than the parent page"
                        )
                      : t();
                }
                var e;
              })()))
        : x(F, "Ignored: " + N);
    }
    function E(e, t, n) {
      var i = null,
        r = null;
      if (f[e]) {
        if ("function" != typeof (i = f[e][t]))
          throw new TypeError(t + " on iFrame[" + e + "] is not a function");
        r = i(n);
      }
      return r;
    }
    function S(e) {
      var t = e.id;
      delete f[t];
    }
    function T(e) {
      var t = e.id;
      if (!1 !== E(t, "onClose", t)) {
        w(t, "Removing iFrame: " + t);
        try {
          e.parentNode && e.parentNode.removeChild(e);
        } catch (e) {
          _(e);
        }
        E(t, "onClosed", t), w(t, "--"), S(e);
      } else w(t, "Close iframe cancelled by onClose event");
    }
    function A(t) {
      null === c &&
        w(
          t,
          "Get page position: " +
            (c = {
              x:
                window.pageXOffset !== e
                  ? window.pageXOffset
                  : document.documentElement.scrollLeft,
              y:
                window.pageYOffset !== e
                  ? window.pageYOffset
                  : document.documentElement.scrollTop,
            }).x +
            "," +
            c.y
        );
    }
    function C(e) {
      null !== c &&
        (window.scrollTo(c.x, c.y),
        w(e, "Set page position: " + c.x + "," + c.y),
        L());
    }
    function L() {
      c = null;
    }
    function j(e) {
      w(
        e.id,
        "Size reset requested by " +
          ("init" === e.type ? "host page" : "iFrame")
      ),
        A(e.id),
        D(
          function () {
            M(e), P("reset", "reset", e.iframe, e.id);
          },
          e,
          "reset"
        );
    }
    function M(e) {
      function t(t) {
        r ||
          "0" !== e[t] ||
          ((r = !0),
          w(i, "Hidden iFrame detected, creating visibility listener"),
          (function () {
            function e() {
              function e(e) {
                function t(t) {
                  return "0px" === (f[e] && f[e].iframe.style[t]);
                }
                function n(e) {
                  return null !== e.offsetParent;
                }
                f[e] &&
                  n(f[e].iframe) &&
                  (t("height") || t("width")) &&
                  P("Visibility change", "resize", f[e].iframe, e);
              }
              Object.keys(f).forEach(function (t) {
                e(t);
              });
            }
            function t(t) {
              w(
                "window",
                "Mutation observed: " + t[0].target + " " + t[0].type
              ),
                I(e, 16);
            }
            function n() {
              var e = document.querySelector("body"),
                n = {
                  attributes: !0,
                  attributeOldValue: !1,
                  characterData: !0,
                  characterDataOldValue: !1,
                  childList: !0,
                  subtree: !0,
                };
              new i(t).observe(e, n);
            }
            var i = m();
            i && n();
          })());
      }
      function n(n) {
        !(function (t) {
          e.id
            ? ((e.iframe.style[t] = e[t] + "px"),
              w(e.id, "IFrame (" + i + ") " + t + " set to " + e[t] + "px"))
            : w("undefined", "messageData id not set");
        })(n),
          t(n);
      }
      var i = e.iframe.id;
      f[i] && (f[i].sizeHeight && n("height"), f[i].sizeWidth && n("width"));
    }
    function D(e, t, n) {
      n !== t.type && u && !window.jasmine
        ? (w(t.id, "Requesting animation frame"), u(e))
        : e();
    }
    function P(e, t, n, i, r) {
      var o,
        a = !1;
      (i = i || n.id),
        f[i] &&
          (n && "contentWindow" in n && null !== n.contentWindow
            ? ((o = f[i] && f[i].targetOrigin),
              w(
                i,
                "[" +
                  e +
                  "] Sending msg to iframe[" +
                  i +
                  "] (" +
                  t +
                  ") targetOrigin: " +
                  o
              ),
              n.contentWindow.postMessage(s + t, o))
            : _(i, "[" + e + "] IFrame(" + i + ") not found"),
          r &&
            f[i] &&
            f[i].warningTimeout &&
            (f[i].msgTimeout = setTimeout(function () {
              !f[i] ||
                f[i].loaded ||
                a ||
                ((a = !0),
                _(
                  i,
                  "IFrame has not responded within " +
                    f[i].warningTimeout / 1e3 +
                    " seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."
                ));
            }, f[i].warningTimeout)));
    }
    function z(e) {
      return (
        e +
        ":" +
        f[e].bodyMarginV1 +
        ":" +
        f[e].sizeWidth +
        ":" +
        f[e].log +
        ":" +
        f[e].interval +
        ":" +
        f[e].enablePublicMethods +
        ":" +
        f[e].autoResize +
        ":" +
        f[e].bodyMargin +
        ":" +
        f[e].heightCalculationMethod +
        ":" +
        f[e].bodyBackground +
        ":" +
        f[e].bodyPadding +
        ":" +
        f[e].tolerance +
        ":" +
        f[e].inPageLinks +
        ":" +
        f[e].resizeFrom +
        ":" +
        f[e].widthCalculationMethod +
        ":" +
        f[e].mouseEvents
      );
    }
    function R(t, r) {
      function o(e) {
        var t = e.split("Callback");
        if (2 === t.length) {
          var n = "on" + t[0].charAt(0).toUpperCase() + t[0].slice(1);
          (this[n] = this[e]),
            delete this[e],
            _(
              v,
              "Deprecated: '" +
                e +
                "' has been renamed '" +
                n +
                "'. The old method will be removed in the next major version."
            );
        }
      }
      var s,
        a,
        c,
        u,
        p,
        h,
        v =
          ("" === (s = t.id) &&
            ((t.id =
              ((a = (r && r.id) || d.id + n++),
              null !== document.getElementById(a) && (a += n++),
              (s = a))),
            (i = (r || {}).log),
            w(s, "Added missing iframe ID: " + s + " (" + t.src + ")")),
          s);
      v in f && "iFrameResizer" in t
        ? _(v, "Ignored iFrame, already setup.")
        : ((p = (p = r) || {}),
          (f[v] = {
            firstRun: !0,
            iframe: t,
            remoteHost: t.src && t.src.split("/").slice(0, 3).join("/"),
          }),
          (function (e) {
            if ("object" != typeof e)
              throw new TypeError("Options is not an object");
          })(p),
          Object.keys(p).forEach(o, p),
          (function (e) {
            for (var t in d)
              Object.prototype.hasOwnProperty.call(d, t) &&
                (f[v][t] = Object.prototype.hasOwnProperty.call(e, t)
                  ? e[t]
                  : d[t]);
          })(p),
          f[v] &&
            (f[v].targetOrigin =
              !0 === f[v].checkOrigin
                ? "" === (h = f[v].remoteHost) ||
                  null !== h.match(/^(about:blank|javascript:|file:\/\/)/)
                  ? "*"
                  : h
                : "*"),
          (function () {
            switch (
              (w(
                v,
                "IFrame scrolling " +
                  (f[v] && f[v].scrolling ? "enabled" : "disabled") +
                  " for " +
                  v
              ),
              (t.style.overflow =
                !1 === (f[v] && f[v].scrolling) ? "hidden" : "auto"),
              f[v] && f[v].scrolling)
            ) {
              case "omit":
                break;
              case !0:
                t.scrolling = "yes";
                break;
              case !1:
                t.scrolling = "no";
                break;
              default:
                t.scrolling = f[v] ? f[v].scrolling : "no";
            }
          })(),
          (function () {
            function e(e) {
              var n = f[v][e];
              1 / 0 !== n &&
                0 !== n &&
                ((t.style[e] = "number" == typeof n ? n + "px" : n),
                w(v, "Set " + e + " = " + t.style[e]));
            }
            function n(e) {
              if (f[v]["min" + e] > f[v]["max" + e])
                throw new Error(
                  "Value for min" + e + " can not be greater than max" + e
                );
            }
            n("Height"),
              n("Width"),
              e("maxHeight"),
              e("minHeight"),
              e("maxWidth"),
              e("minWidth");
          })(),
          ("number" != typeof (f[v] && f[v].bodyMargin) &&
            "0" !== (f[v] && f[v].bodyMargin)) ||
            ((f[v].bodyMarginV1 = f[v].bodyMargin),
            (f[v].bodyMargin = f[v].bodyMargin + "px")),
          (c = z(v)),
          (u = m()) &&
            (function (e) {
              t.parentNode &&
                new e(function (e) {
                  e.forEach(function (e) {
                    Array.prototype.slice
                      .call(e.removedNodes)
                      .forEach(function (e) {
                        e === t && T(t);
                      });
                  });
                }).observe(t.parentNode, { childList: !0 });
            })(u),
          g(t, "load", function () {
            var n, i;
            P("iFrame.onload", c, t, e, !0),
              (n = f[v] && f[v].firstRun),
              (i = f[v] && f[v].heightCalculationMethod in l),
              !n && i && j({ iframe: t, height: 0, width: 0, type: "init" });
          }),
          P("init", c, t, e, !0),
          f[v] &&
            (f[v].iframe.iFrameResizer = {
              close: T.bind(null, f[v].iframe),
              removeListeners: S.bind(null, f[v].iframe),
              resize: P.bind(null, "Window resize", "resize", f[v].iframe),
              moveToAnchor: function (e) {
                P("Move to anchor", "moveToAnchor:" + e, f[v].iframe, v);
              },
              sendMessage: function (e) {
                P(
                  "Send Message",
                  "message:" + (e = JSON.stringify(e)),
                  f[v].iframe,
                  v
                );
              },
            }));
    }
    function I(e, t) {
      null === p &&
        (p = setTimeout(function () {
          (p = null), e();
        }, t));
    }
    function $() {
      "hidden" !== document.visibilityState &&
        (w("document", "Trigger event: Visiblity change"),
        I(function () {
          W("Tab Visable", "resize");
        }, 16));
    }
    function W(e, t) {
      Object.keys(f).forEach(function (n) {
        (function (e) {
          return (
            f[e] &&
            "parent" === f[e].resizeFrom &&
            f[e].autoResize &&
            !f[e].firstRun
          );
        })(n) && P(e, t, f[n].iframe, n);
      });
    }
    function N() {
      g(window, "message", k),
        g(window, "resize", function () {
          var e;
          w("window", "Trigger event: " + (e = "resize")),
            I(function () {
              W("Window " + e, "resize");
            }, 16);
        }),
        g(document, "visibilitychange", $),
        g(document, "-webkit-visibilitychange", $);
    }
    function H() {
      function t(e, t) {
        t &&
          (!(function () {
            if (!t.tagName)
              throw new TypeError("Object is not a valid DOM element");
            if ("IFRAME" !== t.tagName.toUpperCase())
              throw new TypeError(
                "Expected <IFRAME> tag, found <" + t.tagName + ">"
              );
          })(),
          R(t, e),
          n.push(t));
      }
      var n;
      return (
        (function () {
          var e,
            t = ["moz", "webkit", "o", "ms"];
          for (e = 0; e < t.length && !u; e += 1)
            u = window[t[e] + "RequestAnimationFrame"];
          u
            ? (u = u.bind(window))
            : w("setup", "RequestAnimationFrame not supported");
        })(),
        N(),
        function (i, r) {
          switch (
            ((n = []),
            (function (e) {
              e &&
                e.enablePublicMethods &&
                _(
                  "enablePublicMethods option has been removed, public methods are now always available in the iFrame"
                );
            })(i),
            typeof r)
          ) {
            case "undefined":
            case "string":
              Array.prototype.forEach.call(
                document.querySelectorAll(r || "iframe"),
                t.bind(e, i)
              );
              break;
            case "object":
              t(i, r);
              break;
            default:
              throw new TypeError("Unexpected data type (" + typeof r + ")");
          }
          return n;
        }
      );
    }
  })();
  var wo = {};
  function xo(e) {
    return { iconName: e };
  }
  t(wo), n(wo, "default", () => xo);
  var _o = {};
  function Oo(e) {
    return {
      empty: !1,
      children: [],
      init() {
        this.children = Array.from(this.$refs.items.children);
      },
      isOpen: (t) => e.open.includes(t),
      setOpen(t) {
        e.open.push(t);
      },
      setClosed(t) {
        const n = e.open.indexOf(t);
        n > -1 && e.open.splice(n, 1);
      },
      toggleOpen(e) {
        this.isOpen(e) ? this.setClosed(e) : this.setOpen(e);
      },
      async filter(e) {
        this.debug(`Filter text: ${e}`), await this.$nextTick();
        const t = (
          await Promise.all(
            this.children.map(async (t) => {
              const n = Alpine.$data(t);
              return await n.filter(e), n.filteredOut;
            })
          )
        ).filter((e) => !e).length;
        (this.empty = 0 === t),
          this.debug(`Children matching filter: ${t}/${this.children.length}`);
      },
    };
  }
  t(_o), n(_o, "default", () => Oo);
  var ko = {};
  function Eo({ name: e, value: t }) {
    return {
      name: e,
      value: t,
      init() {
        this.$watch("value", () => this.update());
      },
      update() {
        if (this.validate()) {
          const e = new URLSearchParams(window.location.search);
          e.set(this.name, this.value);
          const t = location.href.replace(location.search, "");
          this.navigateTo(`${t}?${e.toString()}`);
        }
      },
      validate() {
        return !this.$root.reportValidity || this.$root.reportValidity();
      },
      bindings: {
        input: {
          ":id": "`param-${name}`",
          "x-ref": "input",
          "x-model.debounce.200": "value",
          "@keydown.stop": !0,
        },
      },
    };
  }
  t(ko), n(ko, "default", () => Eo);
  var So = {};
  t(So), n(So, "default", () => Ho);
  var To = function (e, t) {
      return Number(e.slice(0, -1 * t.length));
    },
    Ao = function (e) {
      return e.endsWith("px")
        ? { value: e, type: "px", numeric: To(e, "px") }
        : e.endsWith("fr")
        ? { value: e, type: "fr", numeric: To(e, "fr") }
        : e.endsWith("%")
        ? { value: e, type: "%", numeric: To(e, "%") }
        : "auto" === e
        ? { value: e, type: "auto" }
        : null;
    },
    Co = function (e) {
      return e.split(" ").map(Ao);
    },
    Lo = function (e, t, n) {
      return t
        .concat(n)
        .map(function (t) {
          return t.style[e];
        })
        .filter(function (e) {
          return void 0 !== e && "" !== e;
        });
    },
    jo = function (e) {
      for (var t = 0; t < e.length; t++) if (e[t].numeric > 0) return t;
      return null;
    },
    Mo = function () {
      return !1;
    },
    Do = function (e, t, n) {
      e.style[t] = n;
    },
    Po = function (e, t, n) {
      var i = e[t];
      return void 0 !== i ? i : n;
    };
  function zo(e) {
    var t;
    return (t = []).concat
      .apply(
        t,
        Array.from(e.ownerDocument.styleSheets).map(function (e) {
          var t = [];
          try {
            t = Array.from(e.cssRules || []);
          } catch (e) {}
          return t;
        })
      )
      .filter(function (t) {
        var n = !1;
        try {
          n = e.matches(t.selectorText);
        } catch (e) {}
        return n;
      });
  }
  var Ro = function (e, t, n) {
    (this.direction = e),
      (this.element = t.element),
      (this.track = t.track),
      "column" === e
        ? ((this.gridTemplateProp = "grid-template-columns"),
          (this.gridGapProp = "grid-column-gap"),
          (this.cursor = Po(n, "columnCursor", Po(n, "cursor", "col-resize"))),
          (this.snapOffset = Po(
            n,
            "columnSnapOffset",
            Po(n, "snapOffset", 30)
          )),
          (this.dragInterval = Po(
            n,
            "columnDragInterval",
            Po(n, "dragInterval", 1)
          )),
          (this.clientAxis = "clientX"),
          (this.optionStyle = Po(n, "gridTemplateColumns")))
        : "row" === e &&
          ((this.gridTemplateProp = "grid-template-rows"),
          (this.gridGapProp = "grid-row-gap"),
          (this.cursor = Po(n, "rowCursor", Po(n, "cursor", "row-resize"))),
          (this.snapOffset = Po(n, "rowSnapOffset", Po(n, "snapOffset", 30))),
          (this.dragInterval = Po(
            n,
            "rowDragInterval",
            Po(n, "dragInterval", 1)
          )),
          (this.clientAxis = "clientY"),
          (this.optionStyle = Po(n, "gridTemplateRows"))),
      (this.onDragStart = Po(n, "onDragStart", Mo)),
      (this.onDragEnd = Po(n, "onDragEnd", Mo)),
      (this.onDrag = Po(n, "onDrag", Mo)),
      (this.writeStyle = Po(n, "writeStyle", Do)),
      (this.startDragging = this.startDragging.bind(this)),
      (this.stopDragging = this.stopDragging.bind(this)),
      (this.drag = this.drag.bind(this)),
      (this.minSizeStart = t.minSizeStart),
      (this.minSizeEnd = t.minSizeEnd),
      t.element &&
        (this.element.addEventListener("mousedown", this.startDragging),
        this.element.addEventListener("touchstart", this.startDragging));
  };
  (Ro.prototype.getDimensions = function () {
    var e = this.grid.getBoundingClientRect(),
      t = e.width,
      n = e.height,
      i = e.top,
      r = e.bottom,
      o = e.left,
      s = e.right;
    "column" === this.direction
      ? ((this.start = i), (this.end = r), (this.size = n))
      : "row" === this.direction &&
        ((this.start = o), (this.end = s), (this.size = t));
  }),
    (Ro.prototype.getSizeAtTrack = function (e, t) {
      return (function (e, t, n, i) {
        void 0 === n && (n = 0), void 0 === i && (i = !1);
        var r = i ? e + 1 : e;
        return (
          t.slice(0, r).reduce(function (e, t) {
            return e + t.numeric;
          }, 0) + (n ? e * n : 0)
        );
      })(e, this.computedPixels, this.computedGapPixels, t);
    }),
    (Ro.prototype.getSizeOfTrack = function (e) {
      return this.computedPixels[e].numeric;
    }),
    (Ro.prototype.getRawTracks = function () {
      var e = Lo(this.gridTemplateProp, [this.grid], zo(this.grid));
      if (!e.length) {
        if (this.optionStyle) return this.optionStyle;
        throw Error("Unable to determine grid template tracks from styles.");
      }
      return e[0];
    }),
    (Ro.prototype.getGap = function () {
      var e = Lo(this.gridGapProp, [this.grid], zo(this.grid));
      return e.length ? e[0] : null;
    }),
    (Ro.prototype.getRawComputedTracks = function () {
      return window.getComputedStyle(this.grid)[this.gridTemplateProp];
    }),
    (Ro.prototype.getRawComputedGap = function () {
      return window.getComputedStyle(this.grid)[this.gridGapProp];
    }),
    (Ro.prototype.setTracks = function (e) {
      (this.tracks = e.split(" ")), (this.trackValues = Co(e));
    }),
    (Ro.prototype.setComputedTracks = function (e) {
      (this.computedTracks = e.split(" ")), (this.computedPixels = Co(e));
    }),
    (Ro.prototype.setGap = function (e) {
      this.gap = e;
    }),
    (Ro.prototype.setComputedGap = function (e) {
      var t, n;
      (this.computedGap = e),
        (this.computedGapPixels =
          ((t = "px"),
          ((n = this.computedGap).endsWith(t)
            ? Number(n.slice(0, -1 * t.length))
            : null) || 0));
    }),
    (Ro.prototype.getMousePosition = function (e) {
      return "touches" in e
        ? e.touches[0][this.clientAxis]
        : e[this.clientAxis];
    }),
    (Ro.prototype.startDragging = function (e) {
      if (!("button" in e) || 0 === e.button) {
        e.preventDefault(),
          this.element
            ? (this.grid = this.element.parentNode)
            : (this.grid = e.target.parentNode),
          this.getDimensions(),
          this.setTracks(this.getRawTracks()),
          this.setComputedTracks(this.getRawComputedTracks()),
          this.setGap(this.getGap()),
          this.setComputedGap(this.getRawComputedGap());
        var t = this.trackValues.filter(function (e) {
            return "%" === e.type;
          }),
          n = this.trackValues.filter(function (e) {
            return "fr" === e.type;
          });
        if (((this.totalFrs = n.length), this.totalFrs)) {
          var i = jo(n);
          null !== i &&
            (this.frToPixels = this.computedPixels[i].numeric / n[i].numeric);
        }
        if (t.length) {
          var r = jo(t);
          null !== r &&
            (this.percentageToPixels =
              this.computedPixels[r].numeric / t[r].numeric);
        }
        var o = this.getSizeAtTrack(this.track, !1) + this.start;
        if (
          ((this.dragStartOffset = this.getMousePosition(e) - o),
          (this.aTrack = this.track - 1),
          !(this.track < this.tracks.length - 1))
        )
          throw Error(
            "Invalid track index: " +
              this.track +
              ". Track must be between two other tracks and only " +
              this.tracks.length +
              " tracks were found."
          );
        (this.bTrack = this.track + 1),
          (this.aTrackStart =
            this.getSizeAtTrack(this.aTrack, !1) + this.start),
          (this.bTrackEnd = this.getSizeAtTrack(this.bTrack, !0) + this.start),
          (this.dragging = !0),
          window.addEventListener("mouseup", this.stopDragging),
          window.addEventListener("touchend", this.stopDragging),
          window.addEventListener("touchcancel", this.stopDragging),
          window.addEventListener("mousemove", this.drag),
          window.addEventListener("touchmove", this.drag),
          this.grid.addEventListener("selectstart", Mo),
          this.grid.addEventListener("dragstart", Mo),
          (this.grid.style.userSelect = "none"),
          (this.grid.style.webkitUserSelect = "none"),
          (this.grid.style.MozUserSelect = "none"),
          (this.grid.style.pointerEvents = "none"),
          (this.grid.style.cursor = this.cursor),
          (window.document.body.style.cursor = this.cursor),
          this.onDragStart(this.direction, this.track);
      }
    }),
    (Ro.prototype.stopDragging = function () {
      (this.dragging = !1),
        this.cleanup(),
        this.onDragEnd(this.direction, this.track),
        this.needsDestroy &&
          (this.element &&
            (this.element.removeEventListener("mousedown", this.startDragging),
            this.element.removeEventListener("touchstart", this.startDragging)),
          this.destroyCb(),
          (this.needsDestroy = !1),
          (this.destroyCb = null));
    }),
    (Ro.prototype.drag = function (e) {
      var t = this.getMousePosition(e),
        n = this.getSizeOfTrack(this.track),
        i =
          this.aTrackStart +
          this.minSizeStart +
          this.dragStartOffset +
          this.computedGapPixels,
        r =
          this.bTrackEnd -
          this.minSizeEnd -
          this.computedGapPixels -
          (n - this.dragStartOffset);
      t < i + this.snapOffset && (t = i),
        t > r - this.snapOffset && (t = r),
        t < i ? (t = i) : t > r && (t = r);
      var o =
          t - this.aTrackStart - this.dragStartOffset - this.computedGapPixels,
        s =
          this.bTrackEnd -
          t +
          this.dragStartOffset -
          n -
          this.computedGapPixels;
      if (this.dragInterval > 1) {
        var a = Math.round(o / this.dragInterval) * this.dragInterval;
        (s -= a - o), (o = a);
      }
      if (
        (o < this.minSizeStart && (o = this.minSizeStart),
        s < this.minSizeEnd && (s = this.minSizeEnd),
        "px" === this.trackValues[this.aTrack].type)
      )
        this.tracks[this.aTrack] = o + "px";
      else if ("fr" === this.trackValues[this.aTrack].type)
        if (1 === this.totalFrs) this.tracks[this.aTrack] = "1fr";
        else {
          var c = o / this.frToPixels;
          this.tracks[this.aTrack] = c + "fr";
        }
      else if ("%" === this.trackValues[this.aTrack].type) {
        var u = o / this.percentageToPixels;
        this.tracks[this.aTrack] = u + "%";
      }
      if ("px" === this.trackValues[this.bTrack].type)
        this.tracks[this.bTrack] = s + "px";
      else if ("fr" === this.trackValues[this.bTrack].type)
        if (1 === this.totalFrs) this.tracks[this.bTrack] = "1fr";
        else {
          var l = s / this.frToPixels;
          this.tracks[this.bTrack] = l + "fr";
        }
      else if ("%" === this.trackValues[this.bTrack].type) {
        var f = s / this.percentageToPixels;
        this.tracks[this.bTrack] = f + "%";
      }
      var p = this.tracks.join(" ");
      this.writeStyle(this.grid, this.gridTemplateProp, p),
        this.onDrag(this.direction, this.track, p);
    }),
    (Ro.prototype.cleanup = function () {
      window.removeEventListener("mouseup", this.stopDragging),
        window.removeEventListener("touchend", this.stopDragging),
        window.removeEventListener("touchcancel", this.stopDragging),
        window.removeEventListener("mousemove", this.drag),
        window.removeEventListener("touchmove", this.drag),
        this.grid &&
          (this.grid.removeEventListener("selectstart", Mo),
          this.grid.removeEventListener("dragstart", Mo),
          (this.grid.style.userSelect = ""),
          (this.grid.style.webkitUserSelect = ""),
          (this.grid.style.MozUserSelect = ""),
          (this.grid.style.pointerEvents = ""),
          (this.grid.style.cursor = "")),
        (window.document.body.style.cursor = "");
    }),
    (Ro.prototype.destroy = function (e, t) {
      void 0 === e && (e = !0),
        e || !1 === this.dragging
          ? (this.cleanup(),
            this.element &&
              (this.element.removeEventListener(
                "mousedown",
                this.startDragging
              ),
              this.element.removeEventListener(
                "touchstart",
                this.startDragging
              )),
            t && t())
          : ((this.needsDestroy = !0), t && (this.destroyCb = t));
    });
  var Io = function (e, t, n) {
      return t in e ? e[t] : n;
    },
    $o = function (e, t) {
      return function (n) {
        if (n.track < 1)
          throw Error(
            "Invalid track index: " +
              n.track +
              ". Track must be between two other tracks."
          );
        var i = "column" === e ? t.columnMinSizes || {} : t.rowMinSizes || {},
          r = "column" === e ? "columnMinSize" : "rowMinSize";
        return new Ro(
          e,
          Object.assign(
            {},
            {
              minSizeStart: Io(i, n.track - 1, Po(t, r, Po(t, "minSize", 0))),
              minSizeEnd: Io(i, n.track + 1, Po(t, r, Po(t, "minSize", 0))),
            },
            n
          ),
          t
        );
      };
    },
    Wo = function (e) {
      var t = this;
      (this.columnGutters = {}),
        (this.rowGutters = {}),
        (this.options = Object.assign(
          {},
          {
            columnGutters: e.columnGutters || [],
            rowGutters: e.rowGutters || [],
            columnMinSizes: e.columnMinSizes || {},
            rowMinSizes: e.rowMinSizes || {},
          },
          e
        )),
        this.options.columnGutters.forEach(function (e) {
          t.columnGutters[e.track] = $o("column", t.options)(e);
        }),
        this.options.rowGutters.forEach(function (e) {
          t.rowGutters[e.track] = $o("row", t.options)(e);
        });
    };
  (Wo.prototype.addColumnGutter = function (e, t) {
    this.columnGutters[t] && this.columnGutters[t].destroy(),
      (this.columnGutters[t] = $o(
        "column",
        this.options
      )({ element: e, track: t }));
  }),
    (Wo.prototype.addRowGutter = function (e, t) {
      this.rowGutters[t] && this.rowGutters[t].destroy(),
        (this.rowGutters[t] = $o(
          "row",
          this.options
        )({ element: e, track: t }));
    }),
    (Wo.prototype.removeColumnGutter = function (e, t) {
      var n = this;
      void 0 === t && (t = !0),
        this.columnGutters[e] &&
          this.columnGutters[e].destroy(t, function () {
            delete n.columnGutters[e];
          });
    }),
    (Wo.prototype.removeRowGutter = function (e, t) {
      var n = this;
      void 0 === t && (t = !0),
        this.rowGutters[e] &&
          this.rowGutters[e].destroy(t, function () {
            delete n.rowGutters[e];
          });
    }),
    (Wo.prototype.handleDragStart = function (e, t, n) {
      "column" === t
        ? (this.columnGutters[n] && this.columnGutters[n].destroy(),
          (this.columnGutters[n] = $o("column", this.options)({ track: n })),
          this.columnGutters[n].startDragging(e))
        : "row" === t &&
          (this.rowGutters[n] && this.rowGutters[n].destroy(),
          (this.rowGutters[n] = $o("row", this.options)({ track: n })),
          this.rowGutters[n].startDragging(e));
    }),
    (Wo.prototype.destroy = function (e) {
      var t = this;
      void 0 === e && (e = !0),
        Object.keys(this.columnGutters).forEach(function (n) {
          return t.columnGutters[n].destroy(e, function () {
            delete t.columnGutters[n];
          });
        }),
        Object.keys(this.rowGutters).forEach(function (n) {
          return t.rowGutters[n].destroy(e, function () {
            delete t.rowGutters[n];
          });
        });
    });
  var No = function (e) {
    return new Wo(e);
  };
  function Ho({ split: e, opts: t }) {
    let n = null;
    return {
      get vertical() {
        return "vertical" === e.direction;
      },
      get horizontal() {
        return !this.vertical;
      },
      get splits() {
        return this.horizontal && e.horizontalSizes
          ? e.horizontalSizes
          : this.vertical && e.verticalSizes
          ? e.verticalSizes
          : e.sizes || [];
      },
      get minSizes() {
        return this.horizontal && t.minHorizontalSizes
          ? t.minHorizontalSizes
          : this.vertical && t.minVerticalSizes
          ? t.minVerticalSizes
          : t.minSizes || [];
      },
      switchOrientation() {
        e.direction = this.vertical ? "horizontal" : "vertical";
      },
      registerGutter() {
        this._gutters.push(this.$el);
      },
      initSplit() {
        if (this._gutters.length) {
          this._destroySplit();
          const t = this.horizontal ? "row" : "column";
          n = No({
            [`${t}Gutters`]:
              ((e = this._gutters),
              e.map((e, t) => ({ track: 2 * t + 1, element: e }))),
            [`${t}MinSizes`]: Vo(this.minSizes),
            snapOffset: 0,
            dragInterval: 1,
            writeStyle() {},
            onDrag: (e, t, n) => {
              const i = n
                .split(" ")
                .map((e, t) => (t % 2 == 0 ? e : null))
                .filter((e) => e);
              this._setSplits(i);
            },
          });
        }
        var e;
      },
      bindings: {
        root: {
          ":style"() {
            return {
              "grid-template-columns": this.vertical && Fo(this.splits),
              "grid-template-rows": this.horizontal && Fo(this.splits),
            };
          },
        },
      },
      _gutters: [],
      _destroySplit() {
        n && n.destroy();
      },
      _setSplits(t) {
        this.horizontal && e.horizontalSizes
          ? (e.horizontalSizes = t)
          : this.vertical && e.verticalSizes
          ? (e.verticalSizes = t)
          : (e.sizes = t);
      },
    };
  }
  function Fo(e) {
    const t = [];
    return e.forEach((e) => t.push(e, "1px")), t.slice(0, -1).join(" ");
  }
  function Vo(e) {
    const t = {};
    return (
      e.forEach((e, n) => {
        null !== e && (t[2 * n] = e);
      }),
      t
    );
  }
  var Bo = {};
  function qo(e) {
    return {
      get id() {
        return this.$root.id;
      },
      get sections() {
        return Array.from(this.$refs.sections.children);
      },
      isActive(t) {
        return e.activeTab === this._getRef(t);
      },
      _getRef: (e) => e.getAttribute("x-ref"),
    };
  }
  t(Bo), n(Bo, "default", () => qo);
  var Go = {};
  function Uo(e) {
    const t = e.activeTab || null;
    return {
      get tabs() {
        return Array.from(this.$refs.tabs.children);
      },
      init() {
        this.$nextTick(() => {
          const e = t
            ? this.tabs.find((e) => this._getRef(e) === t)
            : this.tabs[0];
          this.selectTab(e);
        });
      },
      selectTab(t) {
        e.activeTab = this._getRef(t);
      },
      isSelected(t) {
        return e.activeTab === this._getRef(t);
      },
      isDisabled: (e) => "true" == e.getAttribute("data-disabled"),
      onSelect() {},
      _getRef: (e) => e.getAttribute("x-ref"),
    };
  }
  t(Go), n(Go, "default", () => Uo);
  var Yo = {};
  function Xo(e) {
    return (
      ((e = e || { width: "100%", height: "100%" }).resizing = !1),
      {
        store: e,
        get maxWidth() {
          return "100%" === this.store.width ? "100%" : `${e.width}px`;
        },
        get maxHeight() {
          return "100%" === this.store.height ? "100%" : `${e.height}px`;
        },
        get parentWidth() {
          return Math.round(this.$root.clientWidth);
        },
        get parentHeight() {
          return Math.round(this.$root.clientHeight);
        },
        get reflowing() {
          return this.$store.layout.reflowing;
        },
        reloadIframe() {
          this.$refs.iframe.contentWindow.location.reload();
        },
        start() {
          this.$dispatch("viewport:resize-start"),
            (this.$store.layout.reflowing = !0),
            (this.store.resizing = !0);
        },
        end() {
          (this.$store.layout.reflowing = !1),
            (this.store.resizing = !1),
            this.$dispatch("viewport:resize-complete");
        },
        onResizeStart(e) {
          this.onResizeWidthStart(e), this.onResizeHeightStart(e);
        },
        toggleFullSize() {
          const { height: t, width: n } = e;
          "100%" === t && "100%" === n
            ? (this.toggleFullHeight(), this.toggleFullWidth())
            : ("100%" !== t && this.toggleFullHeight(),
              "100%" !== n && this.toggleFullWidth());
        },
        onResizeWidth(e) {
          const t =
              this.resizeStartWidth - 2 * (this.resizeStartPositionX - e.pageX),
            n = Math.min(Math.max(Math.round(t), 200), this.parentWidth);
          (this.store.width = n === this.parentWidth ? "100%" : n),
            this.$dispatch("viewport:resize-progress", {
              width: this.store.width,
              height: this.store.height,
            });
        },
        onResizeWidthStart(e) {
          this.start(),
            (this.onResizeWidth = this.onResizeWidth.bind(this)),
            (this.onResizeWidthEnd = this.onResizeWidthEnd.bind(this)),
            (this.resizeStartPositionX = e.pageX),
            (this.resizeStartWidth = this.$refs.wrapper.clientWidth),
            window.addEventListener("pointermove", this.onResizeWidth),
            window.addEventListener("pointerup", this.onResizeWidthEnd);
        },
        onResizeWidthEnd() {
          window.removeEventListener("pointermove", this.onResizeWidth),
            window.removeEventListener("pointerup", this.onResizeWidthEnd),
            this.end();
        },
        toggleFullWidth() {
          this.$dispatch("viewport:resize-start");
          const { width: t, lastWidth: n } = e;
          "100%" === t && n
            ? (this.store.width = n)
            : ((this.store.lastWidth = t), (this.store.width = "100%")),
            this.$dispatch("viewport:resize-complete");
        },
        onResizeHeight(e) {
          const t =
              this.resizeStartHeight - (this.resizeStartPositionY - e.pageY),
            n = Math.min(Math.max(Math.round(t), 200), this.parentHeight);
          (this.store.height = n === this.parentHeight ? "100%" : n),
            this.$dispatch("viewport:resize-progress", {
              width: this.store.width,
              height: this.store.height,
            });
        },
        onResizeHeightStart(e) {
          this.start(),
            (this.onResizeHeight = this.onResizeHeight.bind(this)),
            (this.onResizeHeightEnd = this.onResizeHeightEnd.bind(this)),
            (this.resizeStartPositionY = e.pageY),
            (this.resizeStartHeight = this.$refs.wrapper.clientHeight),
            window.addEventListener("pointermove", this.onResizeHeight),
            window.addEventListener("pointerup", this.onResizeHeightEnd);
        },
        onResizeHeightEnd() {
          window.removeEventListener("pointermove", this.onResizeHeight),
            window.removeEventListener("pointerup", this.onResizeHeightEnd),
            this.end();
        },
        toggleFullHeight() {
          this.$dispatch("viewport:resize-start");
          const { height: t, lastHeight: n } = e;
          "100%" === t && n
            ? (this.store.height = n)
            : ((this.store.lastHeight = t), (this.store.height = "100%")),
            this.$dispatch("viewport:resize-complete");
        },
      }
    );
  }
  t(Yo),
    n(Yo, "default", () => Xo),
    (oi = {
      button: si,
      code: lo,
      copy_button: po,
      filter: mo,
      embed: vo,
      icon: wo,
      nav: _o,
      param_field: ko,
      split_layout: So,
      tabbed_content: Bo,
      tabs: Go,
      viewport: Yo,
    });
  var Jo = {},
    Ko = {};
  function Zo({ id: e, matchers: t }) {
    return {
      filteredOut: !1,
      get open() {
        return this.isOpen(e);
      },
      get active() {
        return (
          !!this.$refs.link &&
          this.location.pathname === this.$refs.link.getAttribute("href")
        );
      },
      get children() {
        return Array.from(this.$refs.items.children);
      },
      get isCollection() {
        return !this.$refs.link;
      },
      toggle() {
        this.toggleOpen(e);
      },
      async filter(e) {
        return (
          this.isCollection
            ? (await this.$nextTick(),
              (this.filteredOut = !0),
              this.children.forEach(async (t) => {
                const n = Alpine.$data(t);
                await n.filter(e), n.filteredOut || (this.filteredOut = !1);
              }))
            : (this.filteredOut = !this.match(e)),
          this
        );
      },
      match(e) {
        if (e.length) {
          return (t || []).map((t) => t.includes(e)).filter((e) => e).length;
        }
        return !0;
      },
      bindings: {
        toggle: { "@click.stop": "toggle", "x-ref": "toggle" },
        link: {
          ":class": "{'!bg-lookbook-nav-item-bg-active':active}",
          "x-ref": "link",
        },
      },
    };
  }
  t(Ko),
    n(Ko, "default", () => Zo),
    (Jo = { nav: { item: Ko } }),
    En.plugin(jn),
    En.plugin(Mn),
    En.plugin(jn),
    En.plugin(Un),
    En.plugin(function (t) {
      t.directive(
        "log",
        (
          t,
          { modifiers: n, expression: i },
          { evaluateLater: r, effect: o }
        ) => {
          let s = "string" == typeof i ? (e) => e(i) : r(i);
          o(() =>
            s((t) => {
              const i = n[0] || "debug";
              e(Yn)[i](t);
            })
          );
        }
      ),
        t.magic("log", () => e(Yn)),
        (t.$log = e(Yn));
    }),
    En.store(
      "layout",
      (function (t) {
        return {
          init() {
            !(function (e, t) {
              const n = window.matchMedia(e),
                i = (e) => t(e.matches);
              i(n), n.addEventListener("change", (e) => i(e));
            })(`(min-width: ${Kn.desktopWidth}px)`, (t) => {
              (this._isDesktop = t),
                e(Yn).debug(
                  "Media query 'desktop': " + (t ? "✅ match" : "❌ no match")
                );
            });
          },
          get desktop() {
            return this._isDesktop;
          },
          get mobile() {
            return !this.desktop;
          },
          reflowing: !1,
          main: {
            split: t
              .$persist({
                direction: "vertical",
                sizes: [`${Zn.defaultWidth}px`, "1fr"],
              })
              .as("main-split"),
            opts: { minSizes: [Zn.minWidth, Qn.minWidth] },
          },
          sidebar: {
            split: t
              .$persist({ direction: "horizontal", sizes: ["50%", "50%"] })
              .as("sidebar-split"),
            opts: { minSizes: [Zn.minSectionHeight, Zn.minSectionHeight] },
          },
          inspector: {
            split: t
              .$persist({
                direction: "horizontal",
                horizontalSizes: ["1fr", `${ei.drawer.defaultHeight}px`],
                verticalSizes: ["1fr", `${ei.drawer.defaultWidth}px`],
              })
              .as("inspector-split"),
            opts: { minSizes: [Zn.minWidth, Qn.minWidth] },
          },
          _isDesktop: !0,
        };
      })(En)
    ),
    En.store(
      "nav",
      (function (e) {
        return {
          previews: {
            filter: {
              raw: e.$persist("").as("previews-filter-text"),
              get text() {
                return this.raw.replace(/\s/g, "").toLowerCase();
              },
              get active() {
                return this.text.length > 0;
              },
            },
            open: e.$persist([]).as("previews-nav-open"),
          },
          pages: {
            filter: {
              raw: e.$persist("").as("pages-filter-text"),
              get text() {
                return this.raw.replace(/\s/g, "").toLowerCase();
              },
              get active() {
                return this.text.length > 0;
              },
            },
            open: e.$persist([]).as("pages-nav-open"),
          },
        };
      })(En)
    ),
    En.store(
      "inspector",
      (function (e) {
        return {
          preview: {
            activeTab: e.$persist("").as("inspector-preview-active-tab"),
            width: e.$persist("100%").as("inspector-preview-width"),
            height: e.$persist("100%").as("inspector-preview-height"),
            lastWidth: null,
            lastHeight: null,
            resizing: !1,
          },
          drawer: {
            hidden: e.$persist(!1).as("inspector-drawer-hidden"),
            activeTab: e.$persist("").as("inspector-drawer-active-tab"),
          },
        };
      })(En)
    ),
    En.store(
      "pages",
      (function (e) {
        return { embeds: e.$persist({}).as("pages-embeds") };
      })(En)
    ),
    En.data("app", function () {
      return {
        version: Alpine.$persist("").as("lookbook-version"),
        location: window.location,
        init() {
          if ((this.validateStorage(), window.SOCKET_PATH)) {
            (function (t) {
              const n = (Date.now() + ((100 * Math.random()) | 0)).toString(),
                i = ni.createConsumer(`${t}?uid=${n}`);
              return {
                addListener(t, n) {
                  i.subscriptions.create(t, {
                    received: e(ii)((t) => {
                      e(Yn).debug("Lookbook files changed"), n(t);
                    }, 200),
                    connected() {
                      e(Yn).info("Lookbook websocket connected");
                    },
                    disconnected() {
                      e(Yn).info("Lookbook websocket disconnected");
                    },
                  });
                },
              };
            })(window.SOCKET_PATH).addListener("Lookbook::ReloadChannel", () =>
              this.updateDOM()
            );
          }
        },
        navigateTo(e) {
          this.debug(`Navigating to ${e}`),
            history.pushState({}, null, e),
            this.$dispatch("popstate");
        },
        async handleNavigation() {
          this.debug("Navigating to ", window.location.pathname),
            this.$dispatch("navigation:start"),
            (this.location = window.location),
            await this.updateDOM(),
            this.$dispatch("navigation:complete");
        },
        hijax(e) {
          const t = e.target.closest("a[href]");
          t &&
            !(function (e) {
              return (
                "_blank" === e.getAttribute("target") ||
                (!!e.href && e.host !== window.location.host)
              );
            })(t) &&
            (e.preventDefault(), this.navigateTo(t.href));
        },
        async updateDOM() {
          this.debug("Starting DOM update"), this.$dispatch("dom:update-start");
          try {
            const { fragment: n, title: i } = await (async function (e, t) {
              const n = await fetch(e || window.document.location);
              if (n.ok) {
                const e = await n.text(),
                  i = new DOMParser().parseFromString(e, "text/html");
                return {
                  fragment: t ? i.querySelector(t).outerHTML : null,
                  title: i.title,
                  doc: i,
                };
              }
              throw new Error(`Error fetching HTML from ${e}`);
            })(window.location, `#${this.$root.id}`);
            (e = this.$root),
              (t = n),
              Alpine.morph(e, t, {
                key: (e) =>
                  e.getAttribute("key") ? e.getAttribute("key") : e.id,
                lookahead: !0,
                updating(e, t, n, i) {
                  if (
                    e.getAttribute &&
                    "replace" === e.getAttribute("data-morph-strategy")
                  )
                    return (e.innerHTML = t.innerHTML), i();
                },
              }),
              (document.title = i),
              this.$dispatch("dom:update-complete"),
              this.debug("DOM update complete");
          } catch (e) {
            this.error(e), window.location.reload();
          }
          var e, t;
        },
        validateStorage() {
          this.version &&
            this.version.split(".")[0] !== e(ti).version.split(".")[0] &&
            (localStorage.clear(),
            this.warn(
              "\n          The data in localStorage is incomaptible with this version of Lookbook.\n          Storage data has been cleared.\n        "
            )),
            (this.version = e(ti).version);
        },
        ...Alpine.$log,
      };
    }),
    [oi, Jo].forEach((e) => {
      (function (e) {
        const t = Object.assign(
          {},
          ...(function e(t, n = "root") {
            return [].concat(
              ...Object.keys(t).map((i) =>
                "object" == typeof t[i]
                  ? e(t[i], `${n}-${i}`)
                  : { [`${n}-${i}`]: t[i] }
              )
            );
          })(e)
        );
        return Object.keys(t).map((e) => t[e]);
      })(e).forEach((e) => En.data(e.name, e));
    }),
    (window.log = e(Yn)),
    (window.Alpine = En),
    En.start();
})();
//# sourceMappingURL=lookbook.js.map
