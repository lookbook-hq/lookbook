// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6zpHt":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = 5111;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "e45650cd7087753c";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ('reload' in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === 'undefined' ? typeof browser === 'undefined' ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"7KyuE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _alpinejs = require("alpinejs");
var _alpinejsDefault = parcelHelpers.interopDefault(_alpinejs);
var _morph = require("@alpinejs/morph");
var _morphDefault = parcelHelpers.interopDefault(_morph);
var _persist = require("@alpinejs/persist");
var _persistDefault = parcelHelpers.interopDefault(_persist);
var _alpineTooltip = require("@ryangjchandler/alpine-tooltip");
var _alpineTooltipDefault = parcelHelpers.interopDefault(_alpineTooltip);
var _logger = require("./plugins/logger");
var _loggerDefault = parcelHelpers.interopDefault(_logger);
var _layout = require("./stores/layout");
var _layoutDefault = parcelHelpers.interopDefault(_layout);
var _nav = require("./stores/nav");
var _navDefault = parcelHelpers.interopDefault(_nav);
var _inspector = require("./stores/inspector");
var _inspectorDefault = parcelHelpers.interopDefault(_inspector);
var _pages = require("./stores/pages");
var _pagesDefault = parcelHelpers.interopDefault(_pages);
var _settings = require("./stores/settings");
var _settingsDefault = parcelHelpers.interopDefault(_settings);
var _workbench = require("./stores/workbench");
var _workbenchDefault = parcelHelpers.interopDefault(_workbench);
var _app = require("./app");
var _appDefault = parcelHelpers.interopDefault(_app);
// Note: A ParcelJS issue prevents loading all depths of component JS files in one glob,
// so need to split it up. Path aliases also do not work with the glob imports.
var _build = require("./helpers/build");
var _componentJs = require("../../../components/lookbook/*/component.js");
var _componentJs1 = require("../../../components/lookbook/*/*/component.js");
var _js = require("./components/*.js");
// Plugins
_alpinejsDefault.default.plugin(_morphDefault.default);
_alpinejsDefault.default.plugin(_persistDefault.default);
_alpinejsDefault.default.plugin(_morphDefault.default);
_alpinejsDefault.default.plugin(_alpineTooltipDefault.default);
_alpinejsDefault.default.plugin(_loggerDefault.default);
// Stores
const prefix = window.APP_NAME;
_alpinejsDefault.default.store("layout", _layoutDefault.default(_alpinejsDefault.default, {
    prefix
}));
_alpinejsDefault.default.store("nav", _navDefault.default(_alpinejsDefault.default, {
    prefix
}));
_alpinejsDefault.default.store("inspector", _inspectorDefault.default(_alpinejsDefault.default, {
    prefix
}));
_alpinejsDefault.default.store("pages", _pagesDefault.default(_alpinejsDefault.default, {
    prefix
}));
_alpinejsDefault.default.store("settings", _settingsDefault.default(_alpinejsDefault.default, {
    prefix
}));
_alpinejsDefault.default.store("workbench", _workbenchDefault.default(_alpinejsDefault.default, {
    prefix
}));
// Components
_alpinejsDefault.default.data("app", _appDefault.default);
[
    _componentJs,
    _componentJs1,
    _js
].forEach((scripts)=>{
    const components = _build.getComponents(scripts);
    Object.keys(components).forEach((name)=>{
        _alpinejsDefault.default.data(`${name}Component`, components[name]);
    });
});
// Init
window.log = _logger.log;
window.Alpine = _alpinejsDefault.default;
_alpinejsDefault.default.start();

},{"alpinejs":"69hXP","@alpinejs/morph":"h2FeS","@alpinejs/persist":"hOl6K","@ryangjchandler/alpine-tooltip":"j3Uyt","./plugins/logger":"a8yvv","./stores/layout":"2QNcl","./stores/nav":"dYphZ","./stores/inspector":"1tdkQ","./stores/pages":"hvNyC","./stores/settings":"f0gkx","./stores/workbench":"f6Spf","./app":"bkyhi","./helpers/build":"a7dEL","../../../components/lookbook/*/component.js":"dDPTi","../../../components/lookbook/*/*/component.js":"9JwZ2","./components/*.js":"jQFJF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"69hXP":[function(require,module,exports) {
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
    }
}
function flushJobs() {
    flushPending = false;
    flushing = true;
    for(let i = 0; i < queue.length; i++)queue[i]();
    queue.length = 0;
    flushing = false;
}
// packages/alpinejs/src/reactivity.js
var reactive;
var effect;
var release;
var raw;
var shouldSchedule = true;
function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
}
function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;
    effect = (callback)=>engine.effect(callback, {
            scheduler: (task)=>{
                if (shouldSchedule) scheduler(task);
                else task();
            }
        })
    ;
    raw = engine.raw;
}
function overrideEffect(override) {
    effect = override;
}
function elementBoundEffect(el) {
    let cleanup2 = ()=>{};
    let wrappedEffect = (callback)=>{
        let effectReference = effect(callback);
        if (!el._x_effects) {
            el._x_effects = new Set();
            el._x_runEffects = ()=>{
                el._x_effects.forEach((i)=>i()
                );
            };
        }
        el._x_effects.add(effectReference);
        cleanup2 = ()=>{
            if (effectReference === void 0) return;
            el._x_effects.delete(effectReference);
            release(effectReference);
        };
        return effectReference;
    };
    return [
        wrappedEffect,
        ()=>{
            cleanup2();
        }
    ];
}
// packages/alpinejs/src/mutation.js
var onAttributeAddeds = [];
var onElRemoveds = [];
var onElAddeds = [];
function onElAdded(callback) {
    onElAddeds.push(callback);
}
function onElRemoved(el, callback) {
    if (typeof callback === "function") {
        if (!el._x_cleanups) el._x_cleanups = [];
        el._x_cleanups.push(callback);
    } else {
        callback = el;
        onElRemoveds.push(callback);
    }
}
function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
}
function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups) el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name]) el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
}
function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups) return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value])=>{
        if (names === void 0 || names.includes(name)) {
            value.forEach((i)=>i()
            );
            delete el._x_attributeCleanups[name];
        }
    });
}
var observer = new MutationObserver(onMutate);
var currentlyObserving = false;
function startObservingMutations() {
    observer.observe(document, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeOldValue: true
    });
    currentlyObserving = true;
}
function stopObservingMutations() {
    flushObserver();
    observer.disconnect();
    currentlyObserving = false;
}
var recordQueue = [];
var willProcessRecordQueue = false;
function flushObserver() {
    recordQueue = recordQueue.concat(observer.takeRecords());
    if (recordQueue.length && !willProcessRecordQueue) {
        willProcessRecordQueue = true;
        queueMicrotask(()=>{
            processRecordQueue();
            willProcessRecordQueue = false;
        });
    }
}
function processRecordQueue() {
    onMutate(recordQueue);
    recordQueue.length = 0;
}
function mutateDom(callback) {
    if (!currentlyObserving) return callback();
    stopObservingMutations();
    let result = callback();
    startObservingMutations();
    return result;
}
var isCollecting = false;
var deferredMutations = [];
function deferMutations() {
    isCollecting = true;
}
function flushAndStopDeferringMutations() {
    isCollecting = false;
    onMutate(deferredMutations);
    deferredMutations = [];
}
function onMutate(mutations) {
    if (isCollecting) {
        deferredMutations = deferredMutations.concat(mutations);
        return;
    }
    let addedNodes = [];
    let removedNodes = [];
    let addedAttributes = new Map();
    let removedAttributes = new Map();
    for(let i1 = 0; i1 < mutations.length; i1++){
        if (mutations[i1].target._x_ignoreMutationObserver) continue;
        if (mutations[i1].type === "childList") {
            mutations[i1].addedNodes.forEach((node)=>node.nodeType === 1 && addedNodes.push(node)
            );
            mutations[i1].removedNodes.forEach((node)=>node.nodeType === 1 && removedNodes.push(node)
            );
        }
        if (mutations[i1].type === "attributes") {
            let el = mutations[i1].target;
            let name = mutations[i1].attributeName;
            let oldValue = mutations[i1].oldValue;
            let add2 = ()=>{
                if (!addedAttributes.has(el)) addedAttributes.set(el, []);
                addedAttributes.get(el).push({
                    name,
                    value: el.getAttribute(name)
                });
            };
            let remove = ()=>{
                if (!removedAttributes.has(el)) removedAttributes.set(el, []);
                removedAttributes.get(el).push(name);
            };
            if (el.hasAttribute(name) && oldValue === null) add2();
            else if (el.hasAttribute(name)) {
                remove();
                add2();
            } else remove();
        }
    }
    removedAttributes.forEach((attrs, el)=>{
        cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el)=>{
        onAttributeAddeds.forEach((i)=>i(el, attrs)
        );
    });
    for (let node2 of removedNodes){
        if (addedNodes.includes(node2)) continue;
        onElRemoveds.forEach((i)=>i(node2)
        );
        if (node2._x_cleanups) while(node2._x_cleanups.length)node2._x_cleanups.pop()();
    }
    addedNodes.forEach((node)=>{
        node._x_ignoreSelf = true;
        node._x_ignore = true;
    });
    for (let node1 of addedNodes){
        if (removedNodes.includes(node1)) continue;
        if (!node1.isConnected) continue;
        delete node1._x_ignoreSelf;
        delete node1._x_ignore;
        onElAddeds.forEach((i)=>i(node1)
        );
        node1._x_ignore = true;
        node1._x_ignoreSelf = true;
    }
    addedNodes.forEach((node)=>{
        delete node._x_ignoreSelf;
        delete node._x_ignore;
    });
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
}
// packages/alpinejs/src/scope.js
function scope(node) {
    return mergeProxies(closestDataStack(node));
}
function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [
        data2,
        ...closestDataStack(referenceNode || node)
    ];
    return ()=>{
        node._x_dataStack = node._x_dataStack.filter((i)=>i !== data2
        );
    };
}
function refreshScope(element, scope2) {
    let existingScope = element._x_dataStack[0];
    Object.entries(scope2).forEach(([key, value])=>{
        existingScope[key] = value;
    });
}
function closestDataStack(node) {
    if (node._x_dataStack) return node._x_dataStack;
    if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) return closestDataStack(node.host);
    if (!node.parentNode) return [];
    return closestDataStack(node.parentNode);
}
function mergeProxies(objects) {
    let thisProxy = new Proxy({}, {
        ownKeys: ()=>{
            return Array.from(new Set(objects.flatMap((i)=>Object.keys(i)
            )));
        },
        has: (target, name)=>{
            return objects.some((obj)=>obj.hasOwnProperty(name)
            );
        },
        get: (target, name)=>{
            return (objects.find((obj)=>{
                if (obj.hasOwnProperty(name)) {
                    let descriptor = Object.getOwnPropertyDescriptor(obj, name);
                    if (descriptor.get && descriptor.get._x_alreadyBound || descriptor.set && descriptor.set._x_alreadyBound) return true;
                    if ((descriptor.get || descriptor.set) && descriptor.enumerable) {
                        let getter = descriptor.get;
                        let setter = descriptor.set;
                        let property = descriptor;
                        getter = getter && getter.bind(thisProxy);
                        setter = setter && setter.bind(thisProxy);
                        if (getter) getter._x_alreadyBound = true;
                        if (setter) setter._x_alreadyBound = true;
                        Object.defineProperty(obj, name, {
                            ...property,
                            get: getter,
                            set: setter
                        });
                    }
                    return true;
                }
                return false;
            }) || {})[name];
        },
        set: (target, name, value)=>{
            let closestObjectWithKey = objects.find((obj)=>obj.hasOwnProperty(name)
            );
            if (closestObjectWithKey) closestObjectWithKey[name] = value;
            else objects[objects.length - 1][name] = value;
            return true;
        }
    });
    return thisProxy;
}
// packages/alpinejs/src/interceptor.js
function initInterceptors(data2) {
    let isObject2 = (val)=>typeof val === "object" && !Array.isArray(val) && val !== null
    ;
    let recurse = (obj, basePath = "")=>{
        Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value , enumerable  }])=>{
            if (enumerable === false || value === void 0) return;
            let path = basePath === "" ? key : `${basePath}.${key}`;
            if (typeof value === "object" && value !== null && value._x_interceptor) obj[key] = value.initialize(data2, path, key);
            else if (isObject2(value) && value !== obj && !(value instanceof Element)) recurse(value, path);
        });
    };
    return recurse(data2);
}
function interceptor(callback, mutateObj = ()=>{}) {
    let obj = {
        initialValue: void 0,
        _x_interceptor: true,
        initialize (data2, path, key) {
            return callback(this.initialValue, ()=>get(data2, path)
            , (value)=>set(data2, path, value)
            , path, key);
        }
    };
    mutateObj(obj);
    return (initialValue)=>{
        if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
            let initialize = obj.initialize.bind(obj);
            obj.initialize = (data2, path, key)=>{
                let innerValue = initialValue.initialize(data2, path, key);
                obj.initialValue = innerValue;
                return initialize(data2, path, key);
            };
        } else obj.initialValue = initialValue;
        return obj;
    };
}
function get(obj, path) {
    return path.split(".").reduce((carry, segment)=>carry[segment]
    , obj);
}
function set(obj, path, value) {
    if (typeof path === "string") path = path.split(".");
    if (path.length === 1) obj[path[0]] = value;
    else if (path.length === 0) throw error;
    else {
        if (obj[path[0]]) return set(obj[path[0]], path.slice(1), value);
        else {
            obj[path[0]] = {};
            return set(obj[path[0]], path.slice(1), value);
        }
    }
}
// packages/alpinejs/src/magics.js
var magics = {};
function magic(name, callback) {
    magics[name] = callback;
}
function injectMagics(obj, el) {
    Object.entries(magics).forEach(([name, callback])=>{
        Object.defineProperty(obj, `$${name}`, {
            get () {
                let [utilities, cleanup2] = getElementBoundUtilities(el);
                utilities = {
                    interceptor,
                    ...utilities
                };
                onElRemoved(el, cleanup2);
                return callback(el, utilities);
            },
            enumerable: false
        });
    });
    return obj;
}
// packages/alpinejs/src/utils/error.js
function tryCatch(el, expression, callback, ...args) {
    try {
        return callback(...args);
    } catch (e) {
        handleError(e, el, expression);
    }
}
function handleError(error2, el, expression) {
    Object.assign(error2, {
        el,
        expression
    });
    console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
    setTimeout(()=>{
        throw error2;
    }, 0);
}
// packages/alpinejs/src/evaluator.js
var shouldAutoEvaluateFunctions = true;
function dontAutoEvaluateFunctions(callback) {
    let cache = shouldAutoEvaluateFunctions;
    shouldAutoEvaluateFunctions = false;
    callback();
    shouldAutoEvaluateFunctions = cache;
}
function evaluate(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value)=>result = value
    , extras);
    return result;
}
function evaluateLater(...args) {
    return theEvaluatorFunction(...args);
}
var theEvaluatorFunction = normalEvaluator;
function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
}
function normalEvaluator(el, expression) {
    let overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    let dataStack = [
        overriddenMagics,
        ...closestDataStack(el)
    ];
    if (typeof expression === "function") return generateEvaluatorFromFunction(dataStack, expression);
    let evaluator = generateEvaluatorFromString(dataStack, expression, el);
    return tryCatch.bind(null, el, expression, evaluator);
}
function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = ()=>{}, { scope: scope2 = {} , params =[]  } = {})=>{
        let result = func.apply(mergeProxies([
            scope2,
            ...dataStack
        ]), params);
        runIfTypeOfFunction(receiver, result);
    };
}
var evaluatorMemo = {};
function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) return evaluatorMemo[expression];
    let AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression) || /^(let|const)\s/.test(expression) ? `(() => { ${expression} })()` : expression;
    const safeAsyncFunction = ()=>{
        try {
            return new AsyncFunction([
                "__self",
                "scope"
            ], `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`);
        } catch (error2) {
            handleError(error2, el, expression);
            return Promise.resolve();
        }
    };
    let func = safeAsyncFunction();
    evaluatorMemo[expression] = func;
    return func;
}
function generateEvaluatorFromString(dataStack, expression, el) {
    let func = generateFunctionFromString(expression, el);
    return (receiver = ()=>{}, { scope: scope2 = {} , params =[]  } = {})=>{
        func.result = void 0;
        func.finished = false;
        let completeScope = mergeProxies([
            scope2,
            ...dataStack
        ]);
        if (typeof func === "function") {
            let promise = func(func, completeScope).catch((error2)=>handleError(error2, el, expression)
            );
            if (func.finished) {
                runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
                func.result = void 0;
            } else promise.then((result)=>{
                runIfTypeOfFunction(receiver, result, completeScope, params, el);
            }).catch((error2)=>handleError(error2, el, expression)
            ).finally(()=>func.result = void 0
            );
        }
    };
}
function runIfTypeOfFunction(receiver, value, scope2, params, el) {
    if (shouldAutoEvaluateFunctions && typeof value === "function") {
        let result = value.apply(scope2, params);
        if (result instanceof Promise) result.then((i)=>runIfTypeOfFunction(receiver, i, scope2, params)
        ).catch((error2)=>handleError(error2, el, value)
        );
        else receiver(result);
    } else receiver(value);
}
// packages/alpinejs/src/directives.js
var prefixAsString = "x-";
function prefix(subject = "") {
    return prefixAsString + subject;
}
function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
}
var directiveHandlers = {};
function directive(name, callback) {
    directiveHandlers[name] = callback;
}
function directives(el, attributes, originalAttributeOverride) {
    let transformedAttributeMap = {};
    let directives2 = Array.from(attributes).map(toTransformedAttributes((newName, oldName)=>transformedAttributeMap[newName] = oldName
    )).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2)=>{
        return getDirectiveHandler(el, directive2);
    });
}
function attributesOnly(attributes) {
    return Array.from(attributes).map(toTransformedAttributes()).filter((attr)=>!outNonAlpineAttributes(attr)
    );
}
var isDeferringHandlers = false;
var directiveHandlerStacks = new Map();
var currentHandlerStackKey = Symbol();
function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let key = Symbol();
    currentHandlerStackKey = key;
    directiveHandlerStacks.set(key, []);
    let flushHandlers = ()=>{
        while(directiveHandlerStacks.get(key).length)directiveHandlerStacks.get(key).shift()();
        directiveHandlerStacks.delete(key);
    };
    let stopDeferring = ()=>{
        isDeferringHandlers = false;
        flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
}
function getElementBoundUtilities(el) {
    let cleanups = [];
    let cleanup2 = (callback)=>cleanups.push(callback)
    ;
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
        Alpine: alpine_default,
        effect: effect3,
        cleanup: cleanup2,
        evaluateLater: evaluateLater.bind(evaluateLater, el),
        evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = ()=>cleanups.forEach((i)=>i()
        )
    ;
    return [
        utilities,
        doCleanup
    ];
}
function getDirectiveHandler(el, directive2) {
    let noop = ()=>{};
    let handler3 = directiveHandlers[directive2.type] || noop;
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive2.original, cleanup2);
    let fullHandler = ()=>{
        if (el._x_ignore || el._x_ignoreSelf) return;
        handler3.inline && handler3.inline(el, directive2, utilities);
        handler3 = handler3.bind(handler3, el, directive2, utilities);
        isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler3) : handler3();
    };
    fullHandler.runCleanups = cleanup2;
    return fullHandler;
}
var startingWith = (subject, replacement)=>({ name , value  })=>{
        if (name.startsWith(subject)) name = name.replace(subject, replacement);
        return {
            name,
            value
        };
    }
;
var into = (i)=>i
;
function toTransformedAttributes(callback = ()=>{}) {
    return ({ name , value  })=>{
        let { name: newName , value: newValue  } = attributeTransformers.reduce((carry, transform)=>{
            return transform(carry);
        }, {
            name,
            value
        });
        if (newName !== name) callback(newName, name);
        return {
            name: newName,
            value: newValue
        };
    };
}
var attributeTransformers = [];
function mapAttributes(callback) {
    attributeTransformers.push(callback);
}
function outNonAlpineAttributes({ name  }) {
    return alpineAttributeRegex().test(name);
}
var alpineAttributeRegex = ()=>new RegExp(`^${prefixAsString}([^:^.]+)\\b`)
;
function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name , value  })=>{
        let typeMatch = name.match(alpineAttributeRegex());
        let valueMatch = name.match(/:([a-zA-Z0-9\-:]+)/);
        let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
        let original = originalAttributeOverride || transformedAttributeMap[name] || name;
        return {
            type: typeMatch ? typeMatch[1] : null,
            value: valueMatch ? valueMatch[1] : null,
            modifiers: modifiers.map((i)=>i.replace(".", "")
            ),
            expression: value,
            original
        };
    };
}
var DEFAULT = "DEFAULT";
var directiveOrder = [
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
    DEFAULT,
    "teleport",
    "element"
];
function byPriority(a, b) {
    let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
}
// packages/alpinejs/src/utils/dispatch.js
function dispatch(el, name, detail = {}) {
    el.dispatchEvent(new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
        cancelable: true
    }));
}
// packages/alpinejs/src/nextTick.js
var tickStack = [];
var isHolding = false;
function nextTick(callback = ()=>{}) {
    queueMicrotask(()=>{
        isHolding || setTimeout(()=>{
            releaseNextTicks();
        });
    });
    return new Promise((res)=>{
        tickStack.push(()=>{
            callback();
            res();
        });
    });
}
function releaseNextTicks() {
    isHolding = false;
    while(tickStack.length)tickStack.shift()();
}
function holdNextTicks() {
    isHolding = true;
}
// packages/alpinejs/src/utils/walk.js
function walk(el, callback) {
    if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
        Array.from(el.children).forEach((el2)=>walk(el2, callback)
        );
        return;
    }
    let skip = false;
    callback(el, ()=>skip = true
    );
    if (skip) return;
    let node = el.firstElementChild;
    while(node){
        walk(node, callback, false);
        node = node.nextElementSibling;
    }
}
// packages/alpinejs/src/utils/warn.js
function warn(message, ...args) {
    console.warn(`Alpine Warning: ${message}`, ...args);
}
// packages/alpinejs/src/lifecycle.js
function start() {
    if (!document.body) warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el)=>initTree(el, walk)
    );
    onElRemoved((el)=>destroyTree(el)
    );
    onAttributesAdded((el, attrs)=>{
        directives(el, attrs).forEach((handle)=>handle()
        );
    });
    let outNestedComponents = (el)=>!closestRoot(el.parentElement, true)
    ;
    Array.from(document.querySelectorAll(allSelectors())).filter(outNestedComponents).forEach((el)=>{
        initTree(el);
    });
    dispatch(document, "alpine:initialized");
}
var rootSelectorCallbacks = [];
var initSelectorCallbacks = [];
function rootSelectors() {
    return rootSelectorCallbacks.map((fn)=>fn()
    );
}
function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn)=>fn()
    );
}
function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
}
function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
}
function closestRoot(el, includeInitSelectors = false) {
    return findClosest(el, (element)=>{
        const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
        if (selectors.some((selector)=>element.matches(selector)
        )) return true;
    });
}
function findClosest(el, callback) {
    if (!el) return;
    if (callback(el)) return el;
    if (el._x_teleportBack) el = el._x_teleportBack;
    if (!el.parentElement) return;
    return findClosest(el.parentElement, callback);
}
function isRoot(el) {
    return rootSelectors().some((selector)=>el.matches(selector)
    );
}
function initTree(el, walker = walk) {
    deferHandlingDirectives(()=>{
        walker(el, (el2, skip)=>{
            directives(el2, el2.attributes).forEach((handle)=>handle()
            );
            el2._x_ignore && skip();
        });
    });
}
function destroyTree(root) {
    walk(root, (el)=>cleanupAttributes(el)
    );
}
// packages/alpinejs/src/utils/classes.js
function setClasses(el, value) {
    if (Array.isArray(value)) return setClassesFromString(el, value.join(" "));
    else if (typeof value === "object" && value !== null) return setClassesFromObject(el, value);
    else if (typeof value === "function") return setClasses(el, value());
    return setClassesFromString(el, value);
}
function setClassesFromString(el, classString) {
    let split = (classString2)=>classString2.split(" ").filter(Boolean)
    ;
    let missingClasses = (classString2)=>classString2.split(" ").filter((i)=>!el.classList.contains(i)
        ).filter(Boolean)
    ;
    let addClassesAndReturnUndo = (classes)=>{
        el.classList.add(...classes);
        return ()=>{
            el.classList.remove(...classes);
        };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
}
function setClassesFromObject(el, classObject) {
    let split = (classString)=>classString.split(" ").filter(Boolean)
    ;
    let forAdd = Object.entries(classObject).flatMap(([classString, bool])=>bool ? split(classString) : false
    ).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool])=>!bool ? split(classString) : false
    ).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i)=>{
        if (el.classList.contains(i)) {
            el.classList.remove(i);
            removed.push(i);
        }
    });
    forAdd.forEach((i)=>{
        if (!el.classList.contains(i)) {
            el.classList.add(i);
            added.push(i);
        }
    });
    return ()=>{
        removed.forEach((i)=>el.classList.add(i)
        );
        added.forEach((i)=>el.classList.remove(i)
        );
    };
}
// packages/alpinejs/src/utils/styles.js
function setStyles(el, value) {
    if (typeof value === "object" && value !== null) return setStylesFromObject(el, value);
    return setStylesFromString(el, value);
}
function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2])=>{
        previousStyles[key] = el.style[key];
        if (!key.startsWith("--")) key = kebabCase(key);
        el.style.setProperty(key, value2);
    });
    setTimeout(()=>{
        if (el.style.length === 0) el.removeAttribute("style");
    });
    return ()=>{
        setStyles(el, previousStyles);
    };
}
function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return ()=>{
        el.setAttribute("style", cache || "");
    };
}
function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
// packages/alpinejs/src/utils/once.js
function once(callback, fallback = ()=>{}) {
    let called = false;
    return function() {
        if (!called) {
            called = true;
            callback.apply(this, arguments);
        } else fallback.apply(this, arguments);
    };
}
// packages/alpinejs/src/directives/x-transition.js
directive("transition", (el, { value , modifiers , expression  }, { evaluate: evaluate2  })=>{
    if (typeof expression === "function") expression = evaluate2(expression);
    if (!expression) registerTransitionsFromHelper(el, modifiers, value);
    else registerTransitionsFromClassString(el, expression, value);
});
function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
        enter: (classes)=>{
            el._x_transition.enter.during = classes;
        },
        "enter-start": (classes)=>{
            el._x_transition.enter.start = classes;
        },
        "enter-end": (classes)=>{
            el._x_transition.enter.end = classes;
        },
        leave: (classes)=>{
            el._x_transition.leave.during = classes;
        },
        "leave-start": (classes)=>{
            el._x_transition.leave.start = classes;
        },
        "leave-end": (classes)=>{
            el._x_transition.leave.end = classes;
        }
    };
    directiveStorageMap[stage](classString);
}
function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || [
        "enter"
    ].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || [
        "leave"
    ].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) modifiers = modifiers.filter((i, index)=>index < modifiers.indexOf("out")
    );
    if (modifiers.includes("out") && !doesntSpecify) modifiers = modifiers.filter((i, index)=>index > modifiers.indexOf("out")
    );
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0);
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
    if (transitioningIn) {
        el._x_transition.enter.during = {
            transformOrigin: origin,
            transitionDelay: delay,
            transitionProperty: property,
            transitionDuration: `${durationIn}s`,
            transitionTimingFunction: easing
        };
        el._x_transition.enter.start = {
            opacity: opacityValue,
            transform: `scale(${scaleValue})`
        };
        el._x_transition.enter.end = {
            opacity: 1,
            transform: `scale(1)`
        };
    }
    if (transitioningOut) {
        el._x_transition.leave.during = {
            transformOrigin: origin,
            transitionDelay: delay,
            transitionProperty: property,
            transitionDuration: `${durationOut}s`,
            transitionTimingFunction: easing
        };
        el._x_transition.leave.start = {
            opacity: 1,
            transform: `scale(1)`
        };
        el._x_transition.leave.end = {
            opacity: opacityValue,
            transform: `scale(${scaleValue})`
        };
    }
}
function registerTransitionObject(el, setFunction, defaultValue = {}) {
    if (!el._x_transition) el._x_transition = {
        enter: {
            during: defaultValue,
            start: defaultValue,
            end: defaultValue
        },
        leave: {
            during: defaultValue,
            start: defaultValue,
            end: defaultValue
        },
        in (before = ()=>{}, after = ()=>{}) {
            transition(el, setFunction, {
                during: this.enter.during,
                start: this.enter.start,
                end: this.enter.end
            }, before, after);
        },
        out (before = ()=>{}, after = ()=>{}) {
            transition(el, setFunction, {
                during: this.leave.during,
                start: this.leave.start,
                end: this.leave.end
            }, before, after);
        }
    };
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
    let clickAwayCompatibleShow = ()=>{
        document.visibilityState === "visible" ? requestAnimationFrame(show) : setTimeout(show);
    };
    if (value) {
        if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
        else el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
        return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject)=>{
        el._x_transition.out(()=>{}, ()=>resolve(hide)
        );
        el._x_transitioning.beforeCancel(()=>reject({
                isFromCancelledTransition: true
            })
        );
    }) : Promise.resolve(hide);
    queueMicrotask(()=>{
        let closest = closestHide(el);
        if (closest) {
            if (!closest._x_hideChildren) closest._x_hideChildren = [];
            closest._x_hideChildren.push(el);
        } else queueMicrotask(()=>{
            let hideAfterChildren = (el2)=>{
                let carry = Promise.all([
                    el2._x_hidePromise,
                    ...(el2._x_hideChildren || []).map(hideAfterChildren)
                ]).then(([i])=>i()
                );
                delete el2._x_hidePromise;
                delete el2._x_hideChildren;
                return carry;
            };
            hideAfterChildren(el).catch((e)=>{
                if (!e.isFromCancelledTransition) throw e;
            });
        });
    });
};
function closestHide(el) {
    let parent = el.parentNode;
    if (!parent) return;
    return parent._x_hidePromise ? parent : closestHide(parent);
}
function transition(el, setFunction, { during , start: start2 , end  } = {}, before = ()=>{}, after = ()=>{}) {
    if (el._x_transitioning) el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
        before();
        after();
        return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
        start () {
            undoStart = setFunction(el, start2);
        },
        during () {
            undoDuring = setFunction(el, during);
        },
        before,
        end () {
            undoStart();
            undoEnd = setFunction(el, end);
        },
        after,
        cleanup () {
            undoDuring();
            undoEnd();
        }
    });
}
function performTransition(el, stages) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(()=>{
        mutateDom(()=>{
            interrupted = true;
            if (!reachedBefore) stages.before();
            if (!reachedEnd) {
                stages.end();
                releaseNextTicks();
            }
            stages.after();
            if (el.isConnected) stages.cleanup();
            delete el._x_transitioning;
        });
    });
    el._x_transitioning = {
        beforeCancels: [],
        beforeCancel (callback) {
            this.beforeCancels.push(callback);
        },
        cancel: once(function() {
            while(this.beforeCancels.length)this.beforeCancels.shift()();
            finish();
        }),
        finish
    };
    mutateDom(()=>{
        stages.start();
        stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(()=>{
        if (interrupted) return;
        let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
        let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
        if (duration === 0) duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
        mutateDom(()=>{
            stages.before();
        });
        reachedBefore = true;
        requestAnimationFrame(()=>{
            if (interrupted) return;
            mutateDom(()=>{
                stages.end();
            });
            releaseNextTicks();
            setTimeout(el._x_transitioning.finish, duration + delay);
            reachedEnd = true;
        });
    });
}
function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1) return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue) return fallback;
    if (key === "scale") {
        if (isNaN(rawValue)) return fallback;
    }
    if (key === "duration") {
        let match = rawValue.match(/([0-9]+)ms/);
        if (match) return match[1];
    }
    if (key === "origin") {
        if ([
            "top",
            "right",
            "left",
            "center",
            "bottom"
        ].includes(modifiers[modifiers.indexOf(key) + 2])) return [
            rawValue,
            modifiers[modifiers.indexOf(key) + 2]
        ].join(" ");
    }
    return rawValue;
}
// packages/alpinejs/src/clone.js
var isCloning = false;
function skipDuringClone(callback, fallback = ()=>{}) {
    return (...args)=>isCloning ? fallback(...args) : callback(...args)
    ;
}
function clone(oldEl, newEl) {
    if (!newEl._x_dataStack) newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    dontRegisterReactiveSideEffects(()=>{
        cloneTree(newEl);
    });
    isCloning = false;
}
function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback)=>{
        walk(el2, (el3, skip)=>{
            if (hasRunThroughFirstEl && isRoot(el3)) return skip();
            hasRunThroughFirstEl = true;
            callback(el3, skip);
        });
    };
    initTree(el, shallowWalker);
}
function dontRegisterReactiveSideEffects(callback) {
    let cache = effect;
    overrideEffect((callback2, el)=>{
        let storedEffect = cache(callback2);
        release(storedEffect);
        return ()=>{};
    });
    callback();
    overrideEffect(cache);
}
// packages/alpinejs/src/utils/bind.js
function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings) el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch(name){
        case "value":
            bindInputValue(el, value);
            break;
        case "style":
            bindStyles(el, value);
            break;
        case "class":
            bindClasses(el, value);
            break;
        default:
            bindAttribute(el, name, value);
            break;
    }
}
function bindInputValue(el, value) {
    if (el.type === "radio") {
        if (el.attributes.value === void 0) el.value = value;
        if (window.fromModel) el.checked = checkedAttrLooseCompare(el.value, value);
    } else if (el.type === "checkbox") {
        if (Number.isInteger(value)) el.value = value;
        else if (!Number.isInteger(value) && !Array.isArray(value) && typeof value !== "boolean" && ![
            null,
            void 0
        ].includes(value)) el.value = String(value);
        else if (Array.isArray(value)) el.checked = value.some((val)=>checkedAttrLooseCompare(val, el.value)
        );
        else el.checked = !!value;
    } else if (el.tagName === "SELECT") updateSelect(el, value);
    else {
        if (el.value === value) return;
        el.value = value;
    }
}
function bindClasses(el, value) {
    if (el._x_undoAddedClasses) el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
}
function bindStyles(el, value) {
    if (el._x_undoAddedStyles) el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
}
function bindAttribute(el, name, value) {
    if ([
        null,
        void 0,
        false
    ].includes(value) && attributeShouldntBePreservedIfFalsy(name)) el.removeAttribute(name);
    else {
        if (isBooleanAttr(name)) value = name;
        setIfChanged(el, name, value);
    }
}
function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) el.setAttribute(attrName, value);
}
function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2)=>{
        return value2 + "";
    });
    Array.from(el.options).forEach((option)=>{
        option.selected = arrayWrappedValue.includes(option.value);
    });
}
function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char)=>char.toUpperCase()
    );
}
function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
}
function isBooleanAttr(attrName) {
    const booleanAttributes = [
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
        "nomodule"
    ];
    return booleanAttributes.includes(attrName);
}
function attributeShouldntBePreservedIfFalsy(name) {
    return ![
        "aria-pressed",
        "aria-checked",
        "aria-expanded",
        "aria-selected"
    ].includes(name);
}
function getBinding(el, name, fallback) {
    if (el._x_bindings && el._x_bindings[name] !== void 0) return el._x_bindings[name];
    let attr = el.getAttribute(name);
    if (attr === null) return typeof fallback === "function" ? fallback() : fallback;
    if (isBooleanAttr(name)) return !![
        name,
        "true"
    ].includes(attr);
    if (attr === "") return true;
    return attr;
}
// packages/alpinejs/src/utils/debounce.js
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// packages/alpinejs/src/utils/throttle.js
function throttle(func, limit) {
    let inThrottle;
    return function() {
        let context = this, args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(()=>inThrottle = false
            , limit);
        }
    };
}
// packages/alpinejs/src/plugin.js
function plugin(callback) {
    callback(alpine_default);
}
// packages/alpinejs/src/store.js
var stores = {};
var isReactive = false;
function store(name, value) {
    if (!isReactive) {
        stores = reactive(stores);
        isReactive = true;
    }
    if (value === void 0) return stores[name];
    stores[name] = value;
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") stores[name].init();
    initInterceptors(stores[name]);
}
function getStores() {
    return stores;
}
// packages/alpinejs/src/binds.js
var binds = {};
function bind2(name, object) {
    binds[name] = typeof object !== "function" ? ()=>object
     : object;
}
function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name, callback])=>{
        Object.defineProperty(obj, name, {
            get () {
                return (...args)=>{
                    return callback(...args);
                };
            }
        });
    });
    return obj;
}
// packages/alpinejs/src/datas.js
var datas = {};
function data(name, callback) {
    datas[name] = callback;
}
function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback])=>{
        Object.defineProperty(obj, name, {
            get () {
                return (...args)=>{
                    return callback.bind(context)(...args);
                };
            },
            enumerable: false
        });
    });
    return obj;
}
// packages/alpinejs/src/alpine.js
var Alpine = {
    get reactive () {
        return reactive;
    },
    get release () {
        return release;
    },
    get effect () {
        return effect;
    },
    get raw () {
        return raw;
    },
    version: "3.10.0",
    flushAndStopDeferringMutations,
    dontAutoEvaluateFunctions,
    disableEffectScheduling,
    setReactivityEngine,
    closestDataStack,
    skipDuringClone,
    addRootSelector,
    addInitSelector,
    addScopeToNode,
    deferMutations,
    mapAttributes,
    evaluateLater,
    setEvaluator,
    mergeProxies,
    findClosest,
    closestRoot,
    interceptor,
    transition,
    setStyles,
    mutateDom,
    directive,
    throttle,
    debounce,
    evaluate,
    initTree,
    nextTick,
    prefixed: prefix,
    prefix: setPrefix,
    plugin,
    magic,
    store,
    start,
    clone,
    bound: getBinding,
    $data: scope,
    data,
    bind: bind2
};
var alpine_default = Alpine;
// node_modules/@vue/shared/dist/shared.esm-bundler.js
function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(",");
    for(let i = 0; i < list.length; i++)map[list[i]] = true;
    return expectsLowerCase ? (val)=>!!map[val.toLowerCase()]
     : (val)=>!!map[val]
    ;
}
var PatchFlagNames = {
    [1]: `TEXT`,
    [2]: `CLASS`,
    [4]: `STYLE`,
    [8]: `PROPS`,
    [16]: `FULL_PROPS`,
    [32]: `HYDRATE_EVENTS`,
    [64]: `STABLE_FRAGMENT`,
    [128]: `KEYED_FRAGMENT`,
    [256]: `UNKEYED_FRAGMENT`,
    [512]: `NEED_PATCH`,
    [1024]: `DYNAMIC_SLOTS`,
    [2048]: `DEV_ROOT_FRAGMENT`,
    [-1]: `HOISTED`,
    [-2]: `BAIL`
};
var slotFlagsText = {
    [1]: "STABLE",
    [2]: "DYNAMIC",
    [3]: "FORWARDED"
};
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var extend = Object.assign;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key)=>hasOwnProperty.call(val, key)
;
var isArray = Array.isArray;
var isMap = (val)=>toTypeString(val) === "[object Map]"
;
var isString = (val)=>typeof val === "string"
;
var isSymbol = (val)=>typeof val === "symbol"
;
var isObject = (val)=>val !== null && typeof val === "object"
;
var objectToString = Object.prototype.toString;
var toTypeString = (value)=>objectToString.call(value)
;
var toRawType = (value)=>{
    return toTypeString(value).slice(8, -1);
};
var isIntegerKey = (key)=>isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key
;
var cacheStringFunction = (fn)=>{
    const cache = Object.create(null);
    return (str)=>{
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str)=>{
    return str.replace(camelizeRE, (_, c)=>c ? c.toUpperCase() : ""
    );
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str)=>str.replace(hyphenateRE, "-$1").toLowerCase()
);
var capitalize = cacheStringFunction((str)=>str.charAt(0).toUpperCase() + str.slice(1)
);
var toHandlerKey = cacheStringFunction((str)=>str ? `on${capitalize(str)}` : ``
);
var hasChanged = (value, oldValue)=>value !== oldValue && (value === value || oldValue === oldValue)
;
// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var targetMap = new WeakMap();
var effectStack = [];
var activeEffect;
var ITERATE_KEY = Symbol("");
var MAP_KEY_ITERATE_KEY = Symbol("");
function isEffect(fn) {
    return fn && fn._isEffect === true;
}
function effect2(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) fn = fn.raw;
    const effect3 = createReactiveEffect(fn, options);
    if (!options.lazy) effect3();
    return effect3;
}
function stop(effect3) {
    if (effect3.active) {
        cleanup(effect3);
        if (effect3.options.onStop) effect3.options.onStop();
        effect3.active = false;
    }
}
var uid = 0;
function createReactiveEffect(fn, options) {
    const effect3 = function reactiveEffect() {
        if (!effect3.active) return fn();
        if (!effectStack.includes(effect3)) {
            cleanup(effect3);
            try {
                enableTracking();
                effectStack.push(effect3);
                activeEffect = effect3;
                return fn();
            } finally{
                effectStack.pop();
                resetTracking();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect3.id = uid++;
    effect3.allowRecurse = !!options.allowRecurse;
    effect3._isEffect = true;
    effect3.active = true;
    effect3.raw = fn;
    effect3.deps = [];
    effect3.options = options;
    return effect3;
}
function cleanup(effect3) {
    const { deps  } = effect3;
    if (deps.length) {
        for(let i = 0; i < deps.length; i++)deps[i].delete(effect3);
        deps.length = 0;
    }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}
function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
}
function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
    if (!shouldTrack || activeEffect === void 0) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) targetMap.set(target, depsMap = new Map());
    let dep = depsMap.get(key);
    if (!dep) depsMap.set(key, dep = new Set());
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
    }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const effects = new Set();
    const add2 = (effectsToAdd)=>{
        if (effectsToAdd) effectsToAdd.forEach((effect3)=>{
            if (effect3 !== activeEffect || effect3.allowRecurse) effects.add(effect3);
        });
    };
    if (type === "clear") depsMap.forEach(add2);
    else if (key === "length" && isArray(target)) depsMap.forEach((dep, key2)=>{
        if (key2 === "length" || key2 >= newValue) add2(dep);
    });
    else {
        if (key !== void 0) add2(depsMap.get(key));
        switch(type){
            case "add":
                if (!isArray(target)) {
                    add2(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) add2(depsMap.get(MAP_KEY_ITERATE_KEY));
                } else if (isIntegerKey(key)) add2(depsMap.get("length"));
                break;
            case "delete":
                if (!isArray(target)) {
                    add2(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) add2(depsMap.get(MAP_KEY_ITERATE_KEY));
                }
                break;
            case "set":
                if (isMap(target)) add2(depsMap.get(ITERATE_KEY));
                break;
        }
    }
    const run = (effect3)=>{
        if (effect3.options.scheduler) effect3.options.scheduler(effect3);
        else effect3();
    };
    effects.forEach(run);
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key)=>Symbol[key]
).filter(isSymbol));
var get2 = /* @__PURE__ */ createGetter();
var shallowGet = /* @__PURE__ */ createGetter(false, true);
var readonlyGet = /* @__PURE__ */ createGetter(true);
var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
var arrayInstrumentations = {};
[
    "includes",
    "indexOf",
    "lastIndexOf"
].forEach((key)=>{
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for(let i = 0, l = this.length; i < l; i++)track(arr, "get", i + "");
        const res = method.apply(arr, args);
        if (res === -1 || res === false) return method.apply(arr, args.map(toRaw));
        else return res;
    };
});
[
    "push",
    "pop",
    "shift",
    "unshift",
    "splice"
].forEach((key)=>{
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function(...args) {
        pauseTracking();
        const res = method.apply(this, args);
        resetTracking();
        return res;
    };
});
function createGetter(isReadonly = false, shallow = false) {
    return function get3(target, key, receiver) {
        if (key === "__v_isReactive") return !isReadonly;
        else if (key === "__v_isReadonly") return isReadonly;
        else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) return target;
        const targetIsArray = isArray(target);
        if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) return Reflect.get(arrayInstrumentations, key, receiver);
        const res = Reflect.get(target, key, receiver);
        if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
        if (!isReadonly) track(target, "get", key);
        if (shallow) return res;
        if (isRef(res)) {
            const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
            return shouldUnwrap ? res.value : res;
        }
        if (isObject(res)) return isReadonly ? readonly(res) : reactive2(res);
        return res;
    };
}
var set2 = /* @__PURE__ */ createSetter();
var shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
    return function set3(target, key, value, receiver) {
        let oldValue = target[key];
        if (!shallow) {
            value = toRaw(value);
            oldValue = toRaw(oldValue);
            if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            }
        }
        const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (target === toRaw(receiver)) {
            if (!hadKey) trigger(target, "add", key, value);
            else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
        }
        return result;
    };
}
function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
    return result;
}
function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) track(target, "has", key);
    return result;
}
function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
}
var mutableHandlers = {
    get: get2,
    set: set2,
    deleteProperty,
    has,
    ownKeys
};
var readonlyHandlers = {
    get: readonlyGet,
    set (target, key) {
        return true;
    },
    deleteProperty (target, key) {
        return true;
    }
};
var shallowReactiveHandlers = extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
});
var shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
});
var toReactive = (value)=>isObject(value) ? reactive2(value) : value
;
var toReadonly = (value)=>isObject(value) ? readonly(value) : value
;
var toShallow = (value)=>value
;
var getProto = (v)=>Reflect.getPrototypeOf(v)
;
function get$1(target, key, isReadonly = false, isShallow = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) !isReadonly && track(rawTarget, "get", key);
    !isReadonly && track(rawTarget, "get", rawKey);
    const { has: has2  } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) return wrap(target.get(key));
    else if (has2.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
    else if (target !== rawTarget) target.get(key);
}
function has$1(key, isReadonly = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) !isReadonly && track(rawTarget, "has", key);
    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
    target = target["__v_raw"];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
}
function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
        target.add(value);
        trigger(target, "add", value, value);
    }
    return this;
}
function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2 , get: get3  } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has2.call(target, key);
    }
    const oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) trigger(target, "add", key, value);
    else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
    return this;
}
function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2 , get: get3  } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has2.call(target, key);
    }
    const oldValue = get3 ? get3.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) trigger(target, "delete", key, void 0, oldValue);
    return result;
}
function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = void 0;
    const result = target.clear();
    if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
    return result;
}
function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw(target);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key)=>{
            return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
    };
}
function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const targetIsMap = isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
        return {
            next () {
                const { value , done  } = innerIterator.next();
                return done ? {
                    value,
                    done
                } : {
                    value: isPair ? [
                        wrap(value[0]),
                        wrap(value[1])
                    ] : wrap(value),
                    done
                };
            },
            [Symbol.iterator] () {
                return this;
            }
        };
    };
}
function createReadonlyMethod(type) {
    return function(...args) {
        return type === "delete" ? false : this;
    };
}
var mutableInstrumentations = {
    get (key) {
        return get$1(this, key);
    },
    get size () {
        return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
};
var shallowInstrumentations = {
    get (key) {
        return get$1(this, key, false, true);
    },
    get size () {
        return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
};
var readonlyInstrumentations = {
    get (key) {
        return get$1(this, key, true);
    },
    get size () {
        return size(this, true);
    },
    has (key) {
        return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
};
var shallowReadonlyInstrumentations = {
    get (key) {
        return get$1(this, key, true, true);
    },
    get size () {
        return size(this, true);
    },
    has (key) {
        return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
};
var iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
];
iteratorMethods.forEach((method)=>{
    mutableInstrumentations[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations[method] = createIterableMethod(method, true, false);
    shallowInstrumentations[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
});
function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver)=>{
        if (key === "__v_isReactive") return !isReadonly;
        else if (key === "__v_isReadonly") return isReadonly;
        else if (key === "__v_raw") return target;
        return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
}
var mutableCollectionHandlers = {
    get: createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
    get: createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, false)
};
var shallowReadonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, true)
};
var reactiveMap = new WeakMap();
var shallowReactiveMap = new WeakMap();
var readonlyMap = new WeakMap();
var shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
    switch(rawType){
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
}
function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive2(target) {
    if (target && target["__v_isReadonly"]) return target;
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) return target;
    if (target["__v_raw"] && !(isReadonly && target["__v_isReactive"])) return target;
    const existingProxy = proxyMap.get(target);
    if (existingProxy) return existingProxy;
    const targetType = getTargetType(target);
    if (targetType === 0) return target;
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}
function toRaw(observed) {
    return observed && toRaw(observed["__v_raw"]) || observed;
}
function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
}
// packages/alpinejs/src/magics/$nextTick.js
magic("nextTick", ()=>nextTick
);
// packages/alpinejs/src/magics/$dispatch.js
magic("dispatch", (el)=>dispatch.bind(dispatch, el)
);
// packages/alpinejs/src/magics/$watch.js
magic("watch", (el, { evaluateLater: evaluateLater2 , effect: effect3  })=>(key, callback)=>{
        let evaluate2 = evaluateLater2(key);
        let firstTime = true;
        let oldValue;
        let effectReference = effect3(()=>evaluate2((value)=>{
                JSON.stringify(value);
                if (!firstTime) queueMicrotask(()=>{
                    callback(value, oldValue);
                    oldValue = value;
                });
                else oldValue = value;
                firstTime = false;
            })
        );
        el._x_effects.delete(effectReference);
    }
);
// packages/alpinejs/src/magics/$store.js
magic("store", getStores);
// packages/alpinejs/src/magics/$data.js
magic("data", (el)=>scope(el)
);
// packages/alpinejs/src/magics/$root.js
magic("root", (el)=>closestRoot(el)
);
// packages/alpinejs/src/magics/$refs.js
magic("refs", (el)=>{
    if (el._x_refs_proxy) return el._x_refs_proxy;
    el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
    return el._x_refs_proxy;
});
function getArrayOfRefObject(el) {
    let refObjects = [];
    let currentEl = el;
    while(currentEl){
        if (currentEl._x_refs) refObjects.push(currentEl._x_refs);
        currentEl = currentEl.parentNode;
    }
    return refObjects;
}
// packages/alpinejs/src/ids.js
var globalIdMemo = {};
function findAndIncrementId(name) {
    if (!globalIdMemo[name]) globalIdMemo[name] = 0;
    return ++globalIdMemo[name];
}
function closestIdRoot(el, name) {
    return findClosest(el, (element)=>{
        if (element._x_ids && element._x_ids[name]) return true;
    });
}
function setIdRoot(el, name) {
    if (!el._x_ids) el._x_ids = {};
    if (!el._x_ids[name]) el._x_ids[name] = findAndIncrementId(name);
}
// packages/alpinejs/src/magics/$id.js
magic("id", (el)=>(name, key = null)=>{
        let root = closestIdRoot(el, name);
        let id = root ? root._x_ids[name] : findAndIncrementId(name);
        return key ? `${name}-${id}-${key}` : `${name}-${id}`;
    }
);
// packages/alpinejs/src/magics/$el.js
magic("el", (el)=>el
);
// packages/alpinejs/src/magics/index.js
warnMissingPluginMagic("Focus", "focus", "focus");
warnMissingPluginMagic("Persist", "persist", "persist");
function warnMissingPluginMagic(name, magicName, slug) {
    magic(magicName, (el)=>warn(`You can't use [$${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el)
    );
}
// packages/alpinejs/src/directives/x-modelable.js
directive("modelable", (el, { expression  }, { effect: effect3 , evaluateLater: evaluateLater2  })=>{
    let func = evaluateLater2(expression);
    let innerGet = ()=>{
        let result;
        func((i)=>result = i
        );
        return result;
    };
    let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
    let innerSet = (val)=>evaluateInnerSet(()=>{}, {
            scope: {
                __placeholder: val
            }
        })
    ;
    let initialValue = innerGet();
    innerSet(initialValue);
    queueMicrotask(()=>{
        if (!el._x_model) return;
        el._x_removeModelListeners["default"]();
        let outerGet = el._x_model.get;
        let outerSet = el._x_model.set;
        effect3(()=>innerSet(outerGet())
        );
        effect3(()=>outerSet(innerGet())
        );
    });
});
// packages/alpinejs/src/directives/x-teleport.js
directive("teleport", (el, { expression  }, { cleanup: cleanup2  })=>{
    if (el.tagName.toLowerCase() !== "template") warn("x-teleport can only be used on a <template> tag", el);
    let target = document.querySelector(expression);
    if (!target) warn(`Cannot find x-teleport element for selector: "${expression}"`);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    if (el._x_forwardEvents) el._x_forwardEvents.forEach((eventName)=>{
        clone2.addEventListener(eventName, (e)=>{
            e.stopPropagation();
            el.dispatchEvent(new e.constructor(e.type, e));
        });
    });
    addScopeToNode(clone2, {}, el);
    mutateDom(()=>{
        target.appendChild(clone2);
        initTree(clone2);
        clone2._x_ignore = true;
    });
    cleanup2(()=>clone2.remove()
    );
});
// packages/alpinejs/src/directives/x-ignore.js
var handler = ()=>{};
handler.inline = (el, { modifiers  }, { cleanup: cleanup2  })=>{
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(()=>{
        modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
};
directive("ignore", handler);
// packages/alpinejs/src/directives/x-effect.js
directive("effect", (el, { expression  }, { effect: effect3  })=>effect3(evaluateLater(el, expression))
);
// packages/alpinejs/src/utils/on.js
function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler3 = (e)=>callback(e)
    ;
    let options = {};
    let wrapHandler = (callback2, wrapper)=>(e)=>wrapper(callback2, e)
    ;
    if (modifiers.includes("dot")) event = dotSyntax(event);
    if (modifiers.includes("camel")) event = camelCase2(event);
    if (modifiers.includes("passive")) options.passive = true;
    if (modifiers.includes("capture")) options.capture = true;
    if (modifiers.includes("window")) listenerTarget = window;
    if (modifiers.includes("document")) listenerTarget = document;
    if (modifiers.includes("prevent")) handler3 = wrapHandler(handler3, (next, e)=>{
        e.preventDefault();
        next(e);
    });
    if (modifiers.includes("stop")) handler3 = wrapHandler(handler3, (next, e)=>{
        e.stopPropagation();
        next(e);
    });
    if (modifiers.includes("self")) handler3 = wrapHandler(handler3, (next, e)=>{
        e.target === el && next(e);
    });
    if (modifiers.includes("away") || modifiers.includes("outside")) {
        listenerTarget = document;
        handler3 = wrapHandler(handler3, (next, e)=>{
            if (el.contains(e.target)) return;
            if (e.target.isConnected === false) return;
            if (el.offsetWidth < 1 && el.offsetHeight < 1) return;
            if (el._x_isShown === false) return;
            next(e);
        });
    }
    if (modifiers.includes("once")) handler3 = wrapHandler(handler3, (next, e)=>{
        next(e);
        listenerTarget.removeEventListener(event, handler3, options);
    });
    handler3 = wrapHandler(handler3, (next, e)=>{
        if (isKeyEvent(event)) {
            if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) return;
        }
        next(e);
    });
    if (modifiers.includes("debounce")) {
        let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
        let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
        handler3 = debounce(handler3, wait);
    }
    if (modifiers.includes("throttle")) {
        let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
        let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
        handler3 = throttle(handler3, wait);
    }
    listenerTarget.addEventListener(event, handler3, options);
    return ()=>{
        listenerTarget.removeEventListener(event, handler3, options);
    };
}
function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
}
function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char)=>char.toUpperCase()
    );
}
function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
}
function kebabCase2(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function isKeyEvent(event) {
    return [
        "keydown",
        "keyup"
    ].includes(event);
}
function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i)=>{
        return ![
            "window",
            "document",
            "prevent",
            "stop",
            "once"
        ].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
        let debounceIndex = keyModifiers.indexOf("debounce");
        keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0) return false;
    if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0])) return false;
    const systemKeyModifiers = [
        "ctrl",
        "shift",
        "alt",
        "meta",
        "cmd",
        "super"
    ];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier)=>keyModifiers.includes(modifier)
    );
    keyModifiers = keyModifiers.filter((i)=>!selectedSystemKeyModifiers.includes(i)
    );
    if (selectedSystemKeyModifiers.length > 0) {
        const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier)=>{
            if (modifier === "cmd" || modifier === "super") modifier = "meta";
            return e[`${modifier}Key`];
        });
        if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
            if (keyToModifiers(e.key).includes(keyModifiers[0])) return false;
        }
    }
    return true;
}
function keyToModifiers(key) {
    if (!key) return [];
    key = kebabCase2(key);
    let modifierToKeyMap = {
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
        equal: "="
    };
    modifierToKeyMap[key] = key;
    return Object.keys(modifierToKeyMap).map((modifier)=>{
        if (modifierToKeyMap[modifier] === key) return modifier;
    }).filter((modifier)=>modifier
    );
}
// packages/alpinejs/src/directives/x-model.js
directive("model", (el, { modifiers , expression  }, { effect: effect3 , cleanup: cleanup2  })=>{
    let evaluate2 = evaluateLater(el, expression);
    let assignmentExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
    let evaluateAssignment = evaluateLater(el, assignmentExpression);
    var event = el.tagName.toLowerCase() === "select" || [
        "checkbox",
        "radio"
    ].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let assigmentFunction = generateAssignmentFunction(el, modifiers, expression);
    let removeListener = on(el, event, modifiers, (e)=>{
        evaluateAssignment(()=>{}, {
            scope: {
                $event: e,
                rightSideOfExpression: assigmentFunction
            }
        });
    });
    if (!el._x_removeModelListeners) el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup2(()=>el._x_removeModelListeners["default"]()
    );
    let evaluateSetModel = evaluateLater(el, `${expression} = __placeholder`);
    el._x_model = {
        get () {
            let result;
            evaluate2((value)=>result = value
            );
            return result;
        },
        set (value) {
            evaluateSetModel(()=>{}, {
                scope: {
                    __placeholder: value
                }
            });
        }
    };
    el._x_forceModelUpdate = ()=>{
        evaluate2((value)=>{
            if (value === void 0 && expression.match(/\./)) value = "";
            window.fromModel = true;
            mutateDom(()=>bind(el, "value", value)
            );
            delete window.fromModel;
        });
    };
    effect3(()=>{
        if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el)) return;
        el._x_forceModelUpdate();
    });
});
function generateAssignmentFunction(el, modifiers, expression) {
    if (el.type === "radio") mutateDom(()=>{
        if (!el.hasAttribute("name")) el.setAttribute("name", expression);
    });
    return (event, currentValue)=>{
        return mutateDom(()=>{
            if (event instanceof CustomEvent && event.detail !== void 0) return event.detail || event.target.value;
            else if (el.type === "checkbox") {
                if (Array.isArray(currentValue)) {
                    let newValue = modifiers.includes("number") ? safeParseNumber(event.target.value) : event.target.value;
                    return event.target.checked ? currentValue.concat([
                        newValue
                    ]) : currentValue.filter((el2)=>!checkedAttrLooseCompare2(el2, newValue)
                    );
                } else return event.target.checked;
            } else if (el.tagName.toLowerCase() === "select" && el.multiple) return modifiers.includes("number") ? Array.from(event.target.selectedOptions).map((option)=>{
                let rawValue = option.value || option.text;
                return safeParseNumber(rawValue);
            }) : Array.from(event.target.selectedOptions).map((option)=>{
                return option.value || option.text;
            });
            else {
                let rawValue = event.target.value;
                return modifiers.includes("number") ? safeParseNumber(rawValue) : modifiers.includes("trim") ? rawValue.trim() : rawValue;
            }
        });
    };
}
function safeParseNumber(rawValue) {
    let number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
}
function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
}
function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
}
// packages/alpinejs/src/directives/x-cloak.js
directive("cloak", (el)=>queueMicrotask(()=>mutateDom(()=>el.removeAttribute(prefix("cloak"))
        )
    )
);
// packages/alpinejs/src/directives/x-init.js
addInitSelector(()=>`[${prefix("init")}]`
);
directive("init", skipDuringClone((el, { expression  }, { evaluate: evaluate2  })=>{
    if (typeof expression === "string") return !!expression.trim() && evaluate2(expression, {}, false);
    return evaluate2(expression, {}, false);
}));
// packages/alpinejs/src/directives/x-text.js
directive("text", (el, { expression  }, { effect: effect3 , evaluateLater: evaluateLater2  })=>{
    let evaluate2 = evaluateLater2(expression);
    effect3(()=>{
        evaluate2((value)=>{
            mutateDom(()=>{
                el.textContent = value;
            });
        });
    });
});
// packages/alpinejs/src/directives/x-html.js
directive("html", (el, { expression  }, { effect: effect3 , evaluateLater: evaluateLater2  })=>{
    let evaluate2 = evaluateLater2(expression);
    effect3(()=>{
        evaluate2((value)=>{
            mutateDom(()=>{
                el.innerHTML = value;
                el._x_ignoreSelf = true;
                initTree(el);
                delete el._x_ignoreSelf;
            });
        });
    });
});
// packages/alpinejs/src/directives/x-bind.js
mapAttributes(startingWith(":", into(prefix("bind:"))));
directive("bind", (el, { value , modifiers , expression , original  }, { effect: effect3  })=>{
    if (!value) return applyBindingsObject(el, expression, original, effect3);
    if (value === "key") return storeKeyForXFor(el, expression);
    let evaluate2 = evaluateLater(el, expression);
    effect3(()=>evaluate2((result)=>{
            if (result === void 0 && expression.match(/\./)) result = "";
            mutateDom(()=>bind(el, value, result, modifiers)
            );
        })
    );
});
function applyBindingsObject(el, expression, original, effect3) {
    let bindingProviders = {};
    injectBindingProviders(bindingProviders);
    let getBindings = evaluateLater(el, expression);
    let cleanupRunners = [];
    while(cleanupRunners.length)cleanupRunners.pop()();
    getBindings((bindings)=>{
        let attributes = Object.entries(bindings).map(([name, value])=>({
                name,
                value
            })
        );
        let staticAttributes = attributesOnly(attributes);
        attributes = attributes.map((attribute)=>{
            if (staticAttributes.find((attr)=>attr.name === attribute.name
            )) return {
                name: `x-bind:${attribute.name}`,
                value: `"${attribute.value}"`
            };
            return attribute;
        });
        directives(el, attributes, original).map((handle)=>{
            cleanupRunners.push(handle.runCleanups);
            handle();
        });
    }, {
        scope: bindingProviders
    });
}
function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
}
// packages/alpinejs/src/directives/x-data.js
addRootSelector(()=>`[${prefix("data")}]`
);
directive("data", skipDuringClone((el, { expression  }, { cleanup: cleanup2  })=>{
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    injectMagics(magicContext, el);
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, {
        scope: dataProviderContext
    });
    if (data2 === void 0) data2 = {};
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup2(()=>{
        reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
        undo();
    });
}));
// packages/alpinejs/src/directives/x-show.js
directive("show", (el, { modifiers , expression  }, { effect: effect3  })=>{
    let evaluate2 = evaluateLater(el, expression);
    if (!el._x_doHide) el._x_doHide = ()=>{
        mutateDom(()=>el.style.display = "none"
        );
    };
    if (!el._x_doShow) el._x_doShow = ()=>{
        mutateDom(()=>{
            if (el.style.length === 1 && el.style.display === "none") el.removeAttribute("style");
            else el.style.removeProperty("display");
        });
    };
    let hide = ()=>{
        el._x_doHide();
        el._x_isShown = false;
    };
    let show = ()=>{
        el._x_doShow();
        el._x_isShown = true;
    };
    let clickAwayCompatibleShow = ()=>setTimeout(show)
    ;
    let toggle = once((value)=>value ? show() : hide()
    , (value)=>{
        if (typeof el._x_toggleAndCascadeWithTransitions === "function") el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
        else value ? clickAwayCompatibleShow() : hide();
    });
    let oldValue;
    let firstTime = true;
    effect3(()=>evaluate2((value)=>{
            if (!firstTime && value === oldValue) return;
            if (modifiers.includes("immediate")) value ? clickAwayCompatibleShow() : hide();
            toggle(value);
            oldValue = value;
            firstTime = false;
        })
    );
});
// packages/alpinejs/src/directives/x-for.js
directive("for", (el, { expression  }, { effect: effect3 , cleanup: cleanup2  })=>{
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(el, el._x_keyExpression || "index");
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(()=>loop(el, iteratorNames, evaluateItems, evaluateKey)
    );
    cleanup2(()=>{
        Object.values(el._x_lookup).forEach((el2)=>el2.remove()
        );
        delete el._x_prevKeys;
        delete el._x_lookup;
    });
});
function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i)=>typeof i === "object" && !Array.isArray(i)
    ;
    let templateEl = el;
    evaluateItems((items)=>{
        if (isNumeric3(items) && items >= 0) items = Array.from(Array(items).keys(), (i)=>i + 1
        );
        if (items === void 0) items = [];
        let lookup = el._x_lookup;
        let prevKeys = el._x_prevKeys;
        let scopes = [];
        let keys = [];
        if (isObject2(items)) items = Object.entries(items).map(([key, value])=>{
            let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
            evaluateKey((value2)=>keys.push(value2)
            , {
                scope: {
                    index: key,
                    ...scope2
                }
            });
            scopes.push(scope2);
        });
        else for(let i8 = 0; i8 < items.length; i8++){
            let scope2 = getIterationScopeVariables(iteratorNames, items[i8], i8, items);
            evaluateKey((value)=>keys.push(value)
            , {
                scope: {
                    index: i8,
                    ...scope2
                }
            });
            scopes.push(scope2);
        }
        let adds = [];
        let moves = [];
        let removes = [];
        let sames = [];
        for(let i2 = 0; i2 < prevKeys.length; i2++){
            let key = prevKeys[i2];
            if (keys.indexOf(key) === -1) removes.push(key);
        }
        prevKeys = prevKeys.filter((key)=>!removes.includes(key)
        );
        let lastKey = "template";
        for(let i3 = 0; i3 < keys.length; i3++){
            let key = keys[i3];
            let prevIndex = prevKeys.indexOf(key);
            if (prevIndex === -1) {
                prevKeys.splice(i3, 0, key);
                adds.push([
                    lastKey,
                    i3
                ]);
            } else if (prevIndex !== i3) {
                let keyInSpot = prevKeys.splice(i3, 1)[0];
                let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
                prevKeys.splice(i3, 0, keyForSpot);
                prevKeys.splice(prevIndex, 0, keyInSpot);
                moves.push([
                    keyInSpot,
                    keyForSpot
                ]);
            } else sames.push(key);
            lastKey = key;
        }
        for(let i4 = 0; i4 < removes.length; i4++){
            let key = removes[i4];
            if (!!lookup[key]._x_effects) lookup[key]._x_effects.forEach(dequeueJob);
            lookup[key].remove();
            lookup[key] = null;
            delete lookup[key];
        }
        for(let i5 = 0; i5 < moves.length; i5++){
            let [keyInSpot, keyForSpot] = moves[i5];
            let elInSpot = lookup[keyInSpot];
            let elForSpot = lookup[keyForSpot];
            let marker = document.createElement("div");
            mutateDom(()=>{
                elForSpot.after(marker);
                elInSpot.after(elForSpot);
                elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
                marker.before(elInSpot);
                elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
                marker.remove();
            });
            refreshScope(elForSpot, scopes[keys.indexOf(keyForSpot)]);
        }
        for(let i6 = 0; i6 < adds.length; i6++){
            let [lastKey2, index] = adds[i6];
            let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
            if (lastEl._x_currentIfEl) lastEl = lastEl._x_currentIfEl;
            let scope2 = scopes[index];
            let key = keys[index];
            let clone2 = document.importNode(templateEl.content, true).firstElementChild;
            addScopeToNode(clone2, reactive(scope2), templateEl);
            mutateDom(()=>{
                lastEl.after(clone2);
                initTree(clone2);
            });
            if (typeof key === "object") warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
            lookup[key] = clone2;
        }
        for(let i7 = 0; i7 < sames.length; i7++)refreshScope(lookup[sames[i7]], scopes[keys.indexOf(sames[i7])]);
        templateEl._x_prevKeys = keys;
    });
}
function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch) return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
        res.item = item.replace(forIteratorRE, "").trim();
        res.index = iteratorMatch[1].trim();
        if (iteratorMatch[2]) res.collection = iteratorMatch[2].trim();
    } else res.item = item;
    return res;
}
function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
        let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i)=>i.trim()
        );
        names.forEach((name, i)=>{
            scopeVariables[name] = item[i];
        });
    } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
        let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i)=>i.trim()
        );
        names.forEach((name)=>{
            scopeVariables[name] = item[name];
        });
    } else scopeVariables[iteratorNames.item] = item;
    if (iteratorNames.index) scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection) scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
}
function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
}
// packages/alpinejs/src/directives/x-ref.js
function handler2() {}
handler2.inline = (el, { expression  }, { cleanup: cleanup2  })=>{
    let root = closestRoot(el);
    if (!root._x_refs) root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(()=>delete root._x_refs[expression]
    );
};
directive("ref", handler2);
// packages/alpinejs/src/directives/x-if.js
directive("if", (el, { expression  }, { effect: effect3 , cleanup: cleanup2  })=>{
    let evaluate2 = evaluateLater(el, expression);
    let show = ()=>{
        if (el._x_currentIfEl) return el._x_currentIfEl;
        let clone2 = el.content.cloneNode(true).firstElementChild;
        addScopeToNode(clone2, {}, el);
        mutateDom(()=>{
            el.after(clone2);
            initTree(clone2);
        });
        el._x_currentIfEl = clone2;
        el._x_undoIf = ()=>{
            walk(clone2, (node)=>{
                if (!!node._x_effects) node._x_effects.forEach(dequeueJob);
            });
            clone2.remove();
            delete el._x_currentIfEl;
        };
        return clone2;
    };
    let hide = ()=>{
        if (!el._x_undoIf) return;
        el._x_undoIf();
        delete el._x_undoIf;
    };
    effect3(()=>evaluate2((value)=>{
            value ? show() : hide();
        })
    );
    cleanup2(()=>el._x_undoIf && el._x_undoIf()
    );
});
// packages/alpinejs/src/directives/x-id.js
directive("id", (el, { expression  }, { evaluate: evaluate2  })=>{
    let names = evaluate2(expression);
    names.forEach((name)=>setIdRoot(el, name)
    );
});
// packages/alpinejs/src/directives/x-on.js
mapAttributes(startingWith("@", into(prefix("on:"))));
directive("on", skipDuringClone((el, { value , modifiers , expression  }, { cleanup: cleanup2  })=>{
    let evaluate2 = expression ? evaluateLater(el, expression) : ()=>{};
    if (el.tagName.toLowerCase() === "template") {
        if (!el._x_forwardEvents) el._x_forwardEvents = [];
        if (!el._x_forwardEvents.includes(value)) el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e)=>{
        evaluate2(()=>{}, {
            scope: {
                $event: e
            },
            params: [
                e
            ]
        });
    });
    cleanup2(()=>removeListener()
    );
}));
// packages/alpinejs/src/directives/index.js
warnMissingPluginDirective("Collapse", "collapse", "collapse");
warnMissingPluginDirective("Intersect", "intersect", "intersect");
warnMissingPluginDirective("Focus", "trap", "focus");
warnMissingPluginDirective("Mask", "mask", "mask");
function warnMissingPluginDirective(name, directiveName2, slug) {
    directive(directiveName2, (el)=>warn(`You can't use [x-${directiveName2}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el)
    );
}
// packages/alpinejs/src/index.js
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setReactivityEngine({
    reactive: reactive2,
    effect: effect2,
    release: stop,
    raw: toRaw
});
var src_default = alpine_default;
// packages/alpinejs/builds/module.js
var module_default = src_default;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"h2FeS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>module_default
);
parcelHelpers.export(exports, "morph", ()=>morph
);
// packages/morph/src/dom.js
var DomManager = class {
    el = void 0;
    constructor(el){
        this.el = el;
    }
    traversals = {
        first: "firstElementChild",
        next: "nextElementSibling",
        parent: "parentElement"
    };
    nodes() {
        this.traversals = {
            first: "firstChild",
            next: "nextSibling",
            parent: "parentNode"
        };
        return this;
    }
    first() {
        return this.teleportTo(this.el[this.traversals["first"]]);
    }
    next() {
        return this.teleportTo(this.teleportBack(this.el[this.traversals["next"]]));
    }
    before(insertee) {
        this.el[this.traversals["parent"]].insertBefore(insertee, this.el);
        return insertee;
    }
    replace(replacement) {
        this.el[this.traversals["parent"]].replaceChild(replacement, this.el);
        return replacement;
    }
    append(appendee) {
        this.el.appendChild(appendee);
        return appendee;
    }
    teleportTo(el) {
        if (!el) return el;
        if (el._x_teleport) return el._x_teleport;
        return el;
    }
    teleportBack(el) {
        if (!el) return el;
        if (el._x_teleportBack) return el._x_teleportBack;
        return el;
    }
};
function dom(el) {
    return new DomManager(el);
}
function createElement(html) {
    return document.createRange().createContextualFragment(html).firstElementChild;
}
function textOrComment(el) {
    return el.nodeType === 3 || el.nodeType === 8;
}
// packages/morph/src/morph.js
var resolveStep = ()=>{};
var logger = ()=>{};
async function morph(from, toHtml, options) {
    let fromEl;
    let toEl;
    let key, lookahead, updating, updated, removing, removed, adding, added, debug;
    function breakpoint(message) {
        if (!debug) return;
        logger((message || "").replace("\n", "\\n"), fromEl, toEl);
        return new Promise((resolve)=>resolveStep = ()=>resolve()
        );
    }
    function assignOptions(options2 = {}) {
        let defaultGetKey = (el)=>el.getAttribute("key")
        ;
        let noop = ()=>{};
        updating = options2.updating || noop;
        updated = options2.updated || noop;
        removing = options2.removing || noop;
        removed = options2.removed || noop;
        adding = options2.adding || noop;
        added = options2.added || noop;
        key = options2.key || defaultGetKey;
        lookahead = options2.lookahead || false;
        debug = options2.debug || false;
    }
    async function patch(from2, to) {
        if (differentElementNamesTypesOrKeys(from2, to)) {
            let result = patchElement(from2, to);
            await breakpoint("Swap elements");
            return result;
        }
        let updateChildrenOnly = false;
        if (shouldSkip(updating, from2, to, ()=>updateChildrenOnly = true
        )) return;
        window.Alpine && initializeAlpineOnTo(from2, to, ()=>updateChildrenOnly = true
        );
        if (textOrComment(to)) {
            await patchNodeValue(from2, to);
            updated(from2, to);
            return;
        }
        if (!updateChildrenOnly) await patchAttributes(from2, to);
        updated(from2, to);
        await patchChildren(from2, to);
    }
    function differentElementNamesTypesOrKeys(from2, to) {
        return from2.nodeType != to.nodeType || from2.nodeName != to.nodeName || getKey(from2) != getKey(to);
    }
    function patchElement(from2, to) {
        if (shouldSkip(removing, from2)) return;
        let toCloned = to.cloneNode(true);
        if (shouldSkip(adding, toCloned)) return;
        dom(from2).replace(toCloned);
        removed(from2);
        added(toCloned);
    }
    async function patchNodeValue(from2, to) {
        let value = to.nodeValue;
        if (from2.nodeValue !== value) {
            from2.nodeValue = value;
            await breakpoint("Change text node to: " + value);
        }
    }
    async function patchAttributes(from2, to) {
        if (from2._x_isShown && !to._x_isShown) return;
        if (!from2._x_isShown && to._x_isShown) return;
        let domAttributes = Array.from(from2.attributes);
        let toAttributes = Array.from(to.attributes);
        for(let i = domAttributes.length - 1; i >= 0; i--){
            let name = domAttributes[i].name;
            if (!to.hasAttribute(name)) {
                from2.removeAttribute(name);
                await breakpoint("Remove attribute");
            }
        }
        for(let i1 = toAttributes.length - 1; i1 >= 0; i1--){
            let name = toAttributes[i1].name;
            let value = toAttributes[i1].value;
            if (from2.getAttribute(name) !== value) {
                from2.setAttribute(name, value);
                await breakpoint(`Set [${name}] attribute to: "${value}"`);
            }
        }
    }
    async function patchChildren(from2, to) {
        let domChildren = from2.childNodes;
        let toChildren = to.childNodes;
        let toKeyToNodeMap = keyToMap(toChildren);
        let domKeyDomNodeMap = keyToMap(domChildren);
        let currentTo = dom(to).nodes().first();
        let currentFrom = dom(from2).nodes().first();
        let domKeyHoldovers = {};
        while(currentTo){
            let toKey = getKey(currentTo);
            let domKey = getKey(currentFrom);
            if (!currentFrom) {
                if (toKey && domKeyHoldovers[toKey]) {
                    let holdover = domKeyHoldovers[toKey];
                    dom(from2).append(holdover);
                    currentFrom = holdover;
                    await breakpoint("Add element (from key)");
                } else {
                    let added2 = addNodeTo(currentTo, from2) || {};
                    await breakpoint("Add element: " + (added2.outerHTML || added2.nodeValue));
                    currentTo = dom(currentTo).nodes().next();
                    continue;
                }
            }
            if (lookahead) {
                let nextToElementSibling = dom(currentTo).next();
                let found = false;
                while(!found && nextToElementSibling){
                    if (currentFrom.isEqualNode(nextToElementSibling)) {
                        found = true;
                        currentFrom = addNodeBefore(currentTo, currentFrom);
                        domKey = getKey(currentFrom);
                        await breakpoint("Move element (lookahead)");
                    }
                    nextToElementSibling = dom(nextToElementSibling).next();
                }
            }
            if (toKey !== domKey) {
                if (!toKey && domKey) {
                    domKeyHoldovers[domKey] = currentFrom;
                    currentFrom = addNodeBefore(currentTo, currentFrom);
                    domKeyHoldovers[domKey].remove();
                    currentFrom = dom(currentFrom).nodes().next();
                    currentTo = dom(currentTo).nodes().next();
                    await breakpoint('No "to" key');
                    continue;
                }
                if (toKey && !domKey) {
                    if (domKeyDomNodeMap[toKey]) {
                        currentFrom = dom(currentFrom).replace(domKeyDomNodeMap[toKey]);
                        await breakpoint('No "from" key');
                    }
                }
                if (toKey && domKey) {
                    domKeyHoldovers[domKey] = currentFrom;
                    let domKeyNode = domKeyDomNodeMap[toKey];
                    if (domKeyNode) {
                        currentFrom = dom(currentFrom).replace(domKeyNode);
                        await breakpoint('Move "from" key');
                    } else {
                        domKeyHoldovers[domKey] = currentFrom;
                        currentFrom = addNodeBefore(currentTo, currentFrom);
                        domKeyHoldovers[domKey].remove();
                        currentFrom = dom(currentFrom).next();
                        currentTo = dom(currentTo).next();
                        await breakpoint("Swap elements with keys");
                        continue;
                    }
                }
            }
            let currentFromNext = currentFrom && dom(currentFrom).nodes().next();
            await patch(currentFrom, currentTo);
            currentTo = currentTo && dom(currentTo).nodes().next();
            currentFrom = currentFromNext;
        }
        let removals = [];
        while(currentFrom){
            if (!shouldSkip(removing, currentFrom)) removals.push(currentFrom);
            currentFrom = dom(currentFrom).nodes().next();
        }
        while(removals.length){
            let domForRemoval = removals.shift();
            domForRemoval.remove();
            await breakpoint("remove el");
            removed(domForRemoval);
        }
    }
    function getKey(el) {
        return el && el.nodeType === 1 && key(el);
    }
    function keyToMap(els) {
        let map = {};
        els.forEach((el)=>{
            let theKey = getKey(el);
            if (theKey) map[theKey] = el;
        });
        return map;
    }
    function addNodeTo(node, parent) {
        if (!shouldSkip(adding, node)) {
            let clone = node.cloneNode(true);
            dom(parent).append(clone);
            added(clone);
            return clone;
        }
        return null;
    }
    function addNodeBefore(node, beforeMe) {
        if (!shouldSkip(adding, node)) {
            let clone = node.cloneNode(true);
            dom(beforeMe).before(clone);
            added(clone);
            return clone;
        }
        return beforeMe;
    }
    assignOptions(options);
    fromEl = from;
    toEl = createElement(toHtml);
    if (window.Alpine && window.Alpine.closestDataStack && !from._x_dataStack) {
        toEl._x_dataStack = window.Alpine.closestDataStack(from);
        toEl._x_dataStack && window.Alpine.clone(from, toEl);
    }
    await breakpoint();
    await patch(from, toEl);
    fromEl = void 0;
    toEl = void 0;
    return from;
}
morph.step = ()=>resolveStep()
;
morph.log = (theLogger)=>{
    logger = theLogger;
};
function shouldSkip(hook, ...args) {
    let skip = false;
    hook(...args, ()=>skip = true
    );
    return skip;
}
function initializeAlpineOnTo(from, to, childrenOnly) {
    if (from.nodeType !== 1) return;
    if (from._x_dataStack) window.Alpine.clone(from, to);
}
// packages/morph/src/index.js
function src_default(Alpine) {
    Alpine.morph = morph;
}
// packages/morph/builds/module.js
var module_default = src_default;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hOl6K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>module_default
);
// packages/persist/src/index.js
function src_default(Alpine) {
    let persist = ()=>{
        let alias;
        let storage = localStorage;
        return Alpine.interceptor((initialValue, getter, setter, path, key)=>{
            let lookup = alias || `_x_${path}`;
            let initial = storageHas(lookup, storage) ? storageGet(lookup, storage) : initialValue;
            setter(initial);
            Alpine.effect(()=>{
                let value = getter();
                storageSet(lookup, value, storage);
                setter(value);
            });
            return initial;
        }, (func)=>{
            func.as = (key)=>{
                alias = key;
                return func;
            }, func.using = (target)=>{
                storage = target;
                return func;
            };
        });
    };
    Object.defineProperty(Alpine, "$persist", {
        get: ()=>persist()
    });
    Alpine.magic("persist", persist);
}
function storageHas(key, storage) {
    return storage.getItem(key) !== null;
}
function storageGet(key, storage) {
    return JSON.parse(storage.getItem(key, storage));
}
function storageSet(key, value, storage) {
    storage.setItem(key, JSON.stringify(value));
}
// packages/persist/builds/module.js
var module_default = src_default;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j3Uyt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>module_default
);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target)=>__defProp(target, "__esModule", {
        value: true
    })
;
var __commonJS = (callback, module)=>()=>{
        if (!module) {
            module = {
                exports: {}
            };
            callback(module.exports, module);
        }
        return module.exports;
    }
;
var __exportStar = (target, module, desc)=>{
    if (module && typeof module === "object" || typeof module === "function") {
        for (let key of __getOwnPropNames(module))if (!__hasOwnProp.call(target, key) && key !== "default") __defProp(target, key, {
            get: ()=>module[key]
            ,
            enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable
        });
    }
    return target;
};
var __toModule = (module)=>{
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {
        get: ()=>module.default
        ,
        enumerable: true
    } : {
        value: module,
        enumerable: true
    })), module);
};
// node_modules/@popperjs/core/dist/cjs/popper.js
var require_popper = __commonJS((exports)=>{
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function getBoundingClientRect(element) {
        var rect = element.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            x: rect.left,
            y: rect.top
        };
    }
    function getWindow(node) {
        if (node == null) return window;
        if (node.toString() !== "[object Window]") {
            var ownerDocument = node.ownerDocument;
            return ownerDocument ? ownerDocument.defaultView || window : window;
        }
        return node;
    }
    function getWindowScroll(node) {
        var win = getWindow(node);
        var scrollLeft = win.pageXOffset;
        var scrollTop = win.pageYOffset;
        return {
            scrollLeft,
            scrollTop
        };
    }
    function isElement(node) {
        var OwnElement = getWindow(node).Element;
        return node instanceof OwnElement || node instanceof Element;
    }
    function isHTMLElement(node) {
        var OwnElement = getWindow(node).HTMLElement;
        return node instanceof OwnElement || node instanceof HTMLElement;
    }
    function isShadowRoot(node) {
        if (typeof ShadowRoot === "undefined") return false;
        var OwnElement = getWindow(node).ShadowRoot;
        return node instanceof OwnElement || node instanceof ShadowRoot;
    }
    function getHTMLElementScroll(element) {
        return {
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop
        };
    }
    function getNodeScroll(node) {
        if (node === getWindow(node) || !isHTMLElement(node)) return getWindowScroll(node);
        else return getHTMLElementScroll(node);
    }
    function getNodeName(element) {
        return element ? (element.nodeName || "").toLowerCase() : null;
    }
    function getDocumentElement(element) {
        return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
    }
    function getWindowScrollBarX(element) {
        return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }
    function getComputedStyle(element) {
        return getWindow(element).getComputedStyle(element);
    }
    function isScrollParent(element) {
        var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
        return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }
    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
        if (isFixed === void 0) isFixed = false;
        var documentElement = getDocumentElement(offsetParent);
        var rect = getBoundingClientRect(elementOrVirtualElement);
        var isOffsetParentAnElement = isHTMLElement(offsetParent);
        var scroll = {
            scrollLeft: 0,
            scrollTop: 0
        };
        var offsets = {
            x: 0,
            y: 0
        };
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
            if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) scroll = getNodeScroll(offsetParent);
            if (isHTMLElement(offsetParent)) {
                offsets = getBoundingClientRect(offsetParent);
                offsets.x += offsetParent.clientLeft;
                offsets.y += offsetParent.clientTop;
            } else if (documentElement) offsets.x = getWindowScrollBarX(documentElement);
        }
        return {
            x: rect.left + scroll.scrollLeft - offsets.x,
            y: rect.top + scroll.scrollTop - offsets.y,
            width: rect.width,
            height: rect.height
        };
    }
    function getLayoutRect(element) {
        var clientRect = getBoundingClientRect(element);
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
        if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
        return {
            x: element.offsetLeft,
            y: element.offsetTop,
            width,
            height
        };
    }
    function getParentNode(element) {
        if (getNodeName(element) === "html") return element;
        return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
    }
    function getScrollParent(node) {
        if ([
            "html",
            "body",
            "#document"
        ].indexOf(getNodeName(node)) >= 0) return node.ownerDocument.body;
        if (isHTMLElement(node) && isScrollParent(node)) return node;
        return getScrollParent(getParentNode(node));
    }
    function listScrollParents(element, list) {
        var _element$ownerDocumen;
        if (list === void 0) list = [];
        var scrollParent = getScrollParent(element);
        var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
        var win = getWindow(scrollParent);
        var target = isBody ? [
            win
        ].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
        var updatedList = list.concat(target);
        return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
    }
    function isTableElement(element) {
        return [
            "table",
            "td",
            "th"
        ].indexOf(getNodeName(element)) >= 0;
    }
    function getTrueOffsetParent(element) {
        if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") return null;
        return element.offsetParent;
    }
    function getContainingBlock(element) {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
        var isIE = navigator.userAgent.indexOf("Trident") !== -1;
        if (isIE && isHTMLElement(element)) {
            var elementCss = getComputedStyle(element);
            if (elementCss.position === "fixed") return null;
        }
        var currentNode = getParentNode(element);
        while(isHTMLElement(currentNode) && [
            "html",
            "body"
        ].indexOf(getNodeName(currentNode)) < 0){
            var css = getComputedStyle(currentNode);
            if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || [
                "transform",
                "perspective"
            ].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") return currentNode;
            else currentNode = currentNode.parentNode;
        }
        return null;
    }
    function getOffsetParent(element) {
        var window2 = getWindow(element);
        var offsetParent = getTrueOffsetParent(element);
        while(offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static")offsetParent = getTrueOffsetParent(offsetParent);
        if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) return window2;
        return offsetParent || getContainingBlock(element) || window2;
    }
    var top = "top";
    var bottom = "bottom";
    var right = "right";
    var left = "left";
    var auto = "auto";
    var basePlacements = [
        top,
        bottom,
        right,
        left
    ];
    var start = "start";
    var end = "end";
    var clippingParents = "clippingParents";
    var viewport = "viewport";
    var popper = "popper";
    var reference = "reference";
    var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
        return acc.concat([
            placement + "-" + start,
            placement + "-" + end
        ]);
    }, []);
    var placements = /* @__PURE__ */ [].concat(basePlacements, [
        auto
    ]).reduce(function(acc, placement) {
        return acc.concat([
            placement,
            placement + "-" + start,
            placement + "-" + end
        ]);
    }, []);
    var beforeRead = "beforeRead";
    var read = "read";
    var afterRead = "afterRead";
    var beforeMain = "beforeMain";
    var main = "main";
    var afterMain = "afterMain";
    var beforeWrite = "beforeWrite";
    var write = "write";
    var afterWrite = "afterWrite";
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
    function order(modifiers) {
        var map = new Map();
        var visited = new Set();
        var result = [];
        modifiers.forEach(function(modifier) {
            map.set(modifier.name, modifier);
        });
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
            if (!visited.has(modifier.name)) sort(modifier);
        });
        return result;
    }
    function orderModifiers(modifiers) {
        var orderedModifiers = order(modifiers);
        return modifierPhases.reduce(function(acc, phase) {
            return acc.concat(orderedModifiers.filter(function(modifier) {
                return modifier.phase === phase;
            }));
        }, []);
    }
    function debounce(fn) {
        var pending;
        return function() {
            if (!pending) pending = new Promise(function(resolve) {
                Promise.resolve().then(function() {
                    pending = void 0;
                    resolve(fn());
                });
            });
            return pending;
        };
    }
    function format(str) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
        return [].concat(args).reduce(function(p, c) {
            return p.replace(/%s/, c);
        }, str);
    }
    var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
    var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
    var VALID_PROPERTIES = [
        "name",
        "enabled",
        "phase",
        "fn",
        "effect",
        "requires",
        "options"
    ];
    function validateModifiers(modifiers) {
        modifiers.forEach(function(modifier) {
            Object.keys(modifier).forEach(function(key) {
                switch(key){
                    case "name":
                        if (typeof modifier.name !== "string") console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
                        break;
                    case "enabled":
                        if (typeof modifier.enabled !== "boolean") console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
                    case "phase":
                        if (modifierPhases.indexOf(modifier.phase) < 0) console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
                        break;
                    case "fn":
                        if (typeof modifier.fn !== "function") console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
                        break;
                    case "effect":
                        if (typeof modifier.effect !== "function") console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
                        break;
                    case "requires":
                        if (!Array.isArray(modifier.requires)) console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
                        break;
                    case "requiresIfExists":
                        if (!Array.isArray(modifier.requiresIfExists)) console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
                        break;
                    case "options":
                    case "data":
                        break;
                    default:
                        console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
                            return '"' + s + '"';
                        }).join(", ") + '; but "' + key + '" was provided.');
                }
                modifier.requires && modifier.requires.forEach(function(requirement) {
                    if (modifiers.find(function(mod) {
                        return mod.name === requirement;
                    }) == null) console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
                });
            });
        });
    }
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
    function getBasePlacement(placement) {
        return placement.split("-")[0];
    }
    function mergeByName(modifiers) {
        var merged = modifiers.reduce(function(merged2, current) {
            var existing = merged2[current.name];
            merged2[current.name] = existing ? Object.assign({}, existing, current, {
                options: Object.assign({}, existing.options, current.options),
                data: Object.assign({}, existing.data, current.data)
            }) : current;
            return merged2;
        }, {});
        return Object.keys(merged).map(function(key) {
            return merged[key];
        });
    }
    function getViewportRect(element) {
        var win = getWindow(element);
        var html = getDocumentElement(element);
        var visualViewport = win.visualViewport;
        var width = html.clientWidth;
        var height = html.clientHeight;
        var x = 0;
        var y = 0;
        if (visualViewport) {
            width = visualViewport.width;
            height = visualViewport.height;
            if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                x = visualViewport.offsetLeft;
                y = visualViewport.offsetTop;
            }
        }
        return {
            width,
            height,
            x: x + getWindowScrollBarX(element),
            y
        };
    }
    var max = Math.max;
    var min = Math.min;
    var round = Math.round;
    function getDocumentRect(element) {
        var _element$ownerDocumen;
        var html = getDocumentElement(element);
        var winScroll = getWindowScroll(element);
        var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
        var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
        var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
        var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
        var y = -winScroll.scrollTop;
        if (getComputedStyle(body || html).direction === "rtl") x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
        return {
            width,
            height,
            x,
            y
        };
    }
    function contains(parent, child) {
        var rootNode = child.getRootNode && child.getRootNode();
        if (parent.contains(child)) return true;
        else if (rootNode && isShadowRoot(rootNode)) {
            var next = child;
            do {
                if (next && parent.isSameNode(next)) return true;
                next = next.parentNode || next.host;
            }while (next)
        }
        return false;
    }
    function rectToClientRect(rect) {
        return Object.assign({}, rect, {
            left: rect.x,
            top: rect.y,
            right: rect.x + rect.width,
            bottom: rect.y + rect.height
        });
    }
    function getInnerBoundingClientRect(element) {
        var rect = getBoundingClientRect(element);
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
        return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    }
    function getClippingParents(element) {
        var clippingParents2 = listScrollParents(getParentNode(element));
        var canEscapeClipping = [
            "absolute",
            "fixed"
        ].indexOf(getComputedStyle(element).position) >= 0;
        var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
        if (!isElement(clipperElement)) return [];
        return clippingParents2.filter(function(clippingParent) {
            return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
        });
    }
    function getClippingRect(element, boundary, rootBoundary) {
        var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
        var clippingParents2 = [].concat(mainClippingParents, [
            rootBoundary
        ]);
        var firstClippingParent = clippingParents2[0];
        var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
            var rect = getClientRectFromMixedType(element, clippingParent);
            accRect.top = max(rect.top, accRect.top);
            accRect.right = min(rect.right, accRect.right);
            accRect.bottom = min(rect.bottom, accRect.bottom);
            accRect.left = max(rect.left, accRect.left);
            return accRect;
        }, getClientRectFromMixedType(element, firstClippingParent));
        clippingRect.width = clippingRect.right - clippingRect.left;
        clippingRect.height = clippingRect.bottom - clippingRect.top;
        clippingRect.x = clippingRect.left;
        clippingRect.y = clippingRect.top;
        return clippingRect;
    }
    function getVariation(placement) {
        return placement.split("-")[1];
    }
    function getMainAxisFromPlacement(placement) {
        return [
            "top",
            "bottom"
        ].indexOf(placement) >= 0 ? "x" : "y";
    }
    function computeOffsets(_ref) {
        var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
        var basePlacement = placement ? getBasePlacement(placement) : null;
        var variation = placement ? getVariation(placement) : null;
        var commonX = reference2.x + reference2.width / 2 - element.width / 2;
        var commonY = reference2.y + reference2.height / 2 - element.height / 2;
        var offsets;
        switch(basePlacement){
            case top:
                offsets = {
                    x: commonX,
                    y: reference2.y - element.height
                };
                break;
            case bottom:
                offsets = {
                    x: commonX,
                    y: reference2.y + reference2.height
                };
                break;
            case right:
                offsets = {
                    x: reference2.x + reference2.width,
                    y: commonY
                };
                break;
            case left:
                offsets = {
                    x: reference2.x - element.width,
                    y: commonY
                };
                break;
            default:
                offsets = {
                    x: reference2.x,
                    y: reference2.y
                };
        }
        var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
        if (mainAxis != null) {
            var len = mainAxis === "y" ? "height" : "width";
            switch(variation){
                case start:
                    offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
                    break;
                case end:
                    offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
                    break;
            }
        }
        return offsets;
    }
    function getFreshSideObject() {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
    }
    function mergePaddingObject(paddingObject) {
        return Object.assign({}, getFreshSideObject(), paddingObject);
    }
    function expandToHashMap(value, keys) {
        return keys.reduce(function(hashMap, key) {
            hashMap[key] = value;
            return hashMap;
        }, {});
    }
    function detectOverflow(state, options) {
        if (options === void 0) options = {};
        var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
        var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
        var altContext = elementContext === popper ? reference : popper;
        var referenceElement = state.elements.reference;
        var popperRect = state.rects.popper;
        var element = state.elements[altBoundary ? altContext : elementContext];
        var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
        var referenceClientRect = getBoundingClientRect(referenceElement);
        var popperOffsets2 = computeOffsets({
            reference: referenceClientRect,
            element: popperRect,
            strategy: "absolute",
            placement
        });
        var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
        var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
        var overflowOffsets = {
            top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
            bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
            left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
            right: elementClientRect.right - clippingClientRect.right + paddingObject.right
        };
        var offsetData = state.modifiersData.offset;
        if (elementContext === popper && offsetData) {
            var offset2 = offsetData[placement];
            Object.keys(overflowOffsets).forEach(function(key) {
                var multiply = [
                    right,
                    bottom
                ].indexOf(key) >= 0 ? 1 : -1;
                var axis = [
                    top,
                    bottom
                ].indexOf(key) >= 0 ? "y" : "x";
                overflowOffsets[key] += offset2[axis] * multiply;
            });
        }
        return overflowOffsets;
    }
    var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
    var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
    var DEFAULT_OPTIONS = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };
    function areValidElements() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        return !args.some(function(element) {
            return !(element && typeof element.getBoundingClientRect === "function");
        });
    }
    function popperGenerator(generatorOptions) {
        if (generatorOptions === void 0) generatorOptions = {};
        var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
        return function createPopper2(reference2, popper2, options) {
            if (options === void 0) options = defaultOptions;
            var state = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
                modifiersData: {},
                elements: {
                    reference: reference2,
                    popper: popper2
                },
                attributes: {},
                styles: {}
            };
            var effectCleanupFns = [];
            var isDestroyed = false;
            var instance = {
                state,
                setOptions: function setOptions(options2) {
                    cleanupModifierEffects();
                    state.options = Object.assign({}, defaultOptions, state.options, options2);
                    state.scrollParents = {
                        reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
                        popper: listScrollParents(popper2)
                    };
                    var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
                    state.orderedModifiers = orderedModifiers.filter(function(m) {
                        return m.enabled;
                    });
                    var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
                        var name = _ref.name;
                        return name;
                    });
                    validateModifiers(modifiers);
                    if (getBasePlacement(state.options.placement) === auto) {
                        var flipModifier = state.orderedModifiers.find(function(_ref2) {
                            var name = _ref2.name;
                            return name === "flip";
                        });
                        if (!flipModifier) console.error([
                            'Popper: "auto" placements require the "flip" modifier be',
                            "present and enabled to work."
                        ].join(" "));
                    }
                    var _getComputedStyle = getComputedStyle(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
                    if ([
                        marginTop,
                        marginRight,
                        marginBottom,
                        marginLeft
                    ].some(function(margin) {
                        return parseFloat(margin);
                    })) console.warn([
                        'Popper: CSS "margin" styles cannot be used to apply padding',
                        "between the popper and its reference element or boundary.",
                        "To replicate margin, use the `offset` modifier, as well as",
                        "the `padding` option in the `preventOverflow` and `flip`",
                        "modifiers."
                    ].join(" "));
                    runModifierEffects();
                    return instance.update();
                },
                forceUpdate: function forceUpdate() {
                    if (isDestroyed) return;
                    var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
                    if (!areValidElements(reference3, popper3)) {
                        console.error(INVALID_ELEMENT_ERROR);
                        return;
                    }
                    state.rects = {
                        reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
                        popper: getLayoutRect(popper3)
                    };
                    state.reset = false;
                    state.placement = state.options.placement;
                    state.orderedModifiers.forEach(function(modifier) {
                        return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
                    });
                    var __debug_loops__ = 0;
                    for(var index = 0; index < state.orderedModifiers.length; index++){
                        __debug_loops__ += 1;
                        if (__debug_loops__ > 100) {
                            console.error(INFINITE_LOOP_ERROR);
                            break;
                        }
                        if (state.reset === true) {
                            state.reset = false;
                            index = -1;
                            continue;
                        }
                        var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                        if (typeof fn === "function") state = fn({
                            state,
                            options: _options,
                            name,
                            instance
                        }) || state;
                    }
                },
                update: debounce(function() {
                    return new Promise(function(resolve) {
                        instance.forceUpdate();
                        resolve(state);
                    });
                }),
                destroy: function destroy() {
                    cleanupModifierEffects();
                    isDestroyed = true;
                }
            };
            if (!areValidElements(reference2, popper2)) {
                console.error(INVALID_ELEMENT_ERROR);
                return instance;
            }
            instance.setOptions(options).then(function(state2) {
                if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state2);
            });
            function runModifierEffects() {
                state.orderedModifiers.forEach(function(_ref3) {
                    var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
                    if (typeof effect2 === "function") {
                        var cleanupFn = effect2({
                            state,
                            name,
                            instance,
                            options: options2
                        });
                        var noopFn = function noopFn2() {};
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
    var passive = {
        passive: true
    };
    function effect$2(_ref) {
        var state = _ref.state, instance = _ref.instance, options = _ref.options;
        var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
        var window2 = getWindow(state.elements.popper);
        var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
        if (scroll) scrollParents.forEach(function(scrollParent) {
            scrollParent.addEventListener("scroll", instance.update, passive);
        });
        if (resize) window2.addEventListener("resize", instance.update, passive);
        return function() {
            if (scroll) scrollParents.forEach(function(scrollParent) {
                scrollParent.removeEventListener("scroll", instance.update, passive);
            });
            if (resize) window2.removeEventListener("resize", instance.update, passive);
        };
    }
    var eventListeners = {
        name: "eventListeners",
        enabled: true,
        phase: "write",
        fn: function fn() {},
        effect: effect$2,
        data: {}
    };
    function popperOffsets(_ref) {
        var state = _ref.state, name = _ref.name;
        state.modifiersData[name] = computeOffsets({
            reference: state.rects.reference,
            element: state.rects.popper,
            strategy: "absolute",
            placement: state.placement
        });
    }
    var popperOffsets$1 = {
        name: "popperOffsets",
        enabled: true,
        phase: "read",
        fn: popperOffsets,
        data: {}
    };
    var unsetSides = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };
    function roundOffsetsByDPR(_ref) {
        var x = _ref.x, y = _ref.y;
        var win = window;
        var dpr = win.devicePixelRatio || 1;
        return {
            x: round(round(x * dpr) / dpr) || 0,
            y: round(round(y * dpr) / dpr) || 0
        };
    }
    function mapToStyles(_ref2) {
        var _Object$assign2;
        var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
        var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
        var hasX = offsets.hasOwnProperty("x");
        var hasY = offsets.hasOwnProperty("y");
        var sideX = left;
        var sideY = top;
        var win = window;
        if (adaptive) {
            var offsetParent = getOffsetParent(popper2);
            var heightProp = "clientHeight";
            var widthProp = "clientWidth";
            if (offsetParent === getWindow(popper2)) {
                offsetParent = getDocumentElement(popper2);
                if (getComputedStyle(offsetParent).position !== "static") {
                    heightProp = "scrollHeight";
                    widthProp = "scrollWidth";
                }
            }
            if (placement === top) {
                sideY = bottom;
                y -= offsetParent[heightProp] - popperRect.height;
                y *= gpuAcceleration ? 1 : -1;
            }
            if (placement === left) {
                sideX = right;
                x -= offsetParent[widthProp] - popperRect.width;
                x *= gpuAcceleration ? 1 : -1;
            }
        }
        var commonStyles = Object.assign({
            position
        }, adaptive && unsetSides);
        if (gpuAcceleration) {
            var _Object$assign;
            return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
        }
        return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
    }
    function computeStyles(_ref4) {
        var state = _ref4.state, options = _ref4.options;
        var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
        var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
        if (adaptive && [
            "transform",
            "top",
            "right",
            "bottom",
            "left"
        ].some(function(property) {
            return transitionProperty.indexOf(property) >= 0;
        })) console.warn([
            "Popper: Detected CSS transitions on at least one of the following",
            'CSS properties: "transform", "top", "right", "bottom", "left".',
            "\n\n",
            'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
            "for smooth transitions, or remove these properties from the CSS",
            "transition declaration on the popper element if only transitioning",
            "opacity or background-color for example.",
            "\n\n",
            "We recommend using the popper element as a wrapper around an inner",
            "element that can have any CSS property transitioned for animations."
        ].join(" "));
        var commonStyles = {
            placement: getBasePlacement(state.placement),
            popper: state.elements.popper,
            popperRect: state.rects.popper,
            gpuAcceleration
        };
        if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive,
            roundOffsets
        })));
        if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
            roundOffsets
        })));
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
            "data-popper-placement": state.placement
        });
    }
    var computeStyles$1 = {
        name: "computeStyles",
        enabled: true,
        phase: "beforeWrite",
        fn: computeStyles,
        data: {}
    };
    function applyStyles(_ref) {
        var state = _ref.state;
        Object.keys(state.elements).forEach(function(name) {
            var style = state.styles[name] || {};
            var attributes = state.attributes[name] || {};
            var element = state.elements[name];
            if (!isHTMLElement(element) || !getNodeName(element)) return;
            Object.assign(element.style, style);
            Object.keys(attributes).forEach(function(name2) {
                var value = attributes[name2];
                if (value === false) element.removeAttribute(name2);
                else element.setAttribute(name2, value === true ? "" : value);
            });
        });
    }
    function effect$1(_ref2) {
        var state = _ref2.state;
        var initialStyles = {
            popper: {
                position: state.options.strategy,
                left: "0",
                top: "0",
                margin: "0"
            },
            arrow: {
                position: "absolute"
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
                var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
                var style = styleProperties.reduce(function(style2, property) {
                    style2[property] = "";
                    return style2;
                }, {});
                if (!isHTMLElement(element) || !getNodeName(element)) return;
                Object.assign(element.style, style);
                Object.keys(attributes).forEach(function(attribute) {
                    element.removeAttribute(attribute);
                });
            });
        };
    }
    var applyStyles$1 = {
        name: "applyStyles",
        enabled: true,
        phase: "write",
        fn: applyStyles,
        effect: effect$1,
        requires: [
            "computeStyles"
        ]
    };
    function distanceAndSkiddingToXY(placement, rects, offset2) {
        var basePlacement = getBasePlacement(placement);
        var invertDistance = [
            left,
            top
        ].indexOf(basePlacement) >= 0 ? -1 : 1;
        var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
            placement
        })) : offset2, skidding = _ref[0], distance = _ref[1];
        skidding = skidding || 0;
        distance = (distance || 0) * invertDistance;
        return [
            left,
            right
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
        var data = placements.reduce(function(acc, placement) {
            acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
            return acc;
        }, {});
        var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
        if (state.modifiersData.popperOffsets != null) {
            state.modifiersData.popperOffsets.x += x;
            state.modifiersData.popperOffsets.y += y;
        }
        state.modifiersData[name] = data;
    }
    var offset$1 = {
        name: "offset",
        enabled: true,
        phase: "main",
        requires: [
            "popperOffsets"
        ],
        fn: offset
    };
    var hash$1 = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    function getOppositePlacement(placement) {
        return placement.replace(/left|right|bottom|top/g, function(matched) {
            return hash$1[matched];
        });
    }
    var hash = {
        start: "end",
        end: "start"
    };
    function getOppositeVariationPlacement(placement) {
        return placement.replace(/start|end/g, function(matched) {
            return hash[matched];
        });
    }
    function computeAutoPlacement(state, options) {
        if (options === void 0) options = {};
        var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
        var variation = getVariation(placement);
        var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
            return getVariation(placement2) === variation;
        }) : basePlacements;
        var allowedPlacements = placements$1.filter(function(placement2) {
            return allowedAutoPlacements.indexOf(placement2) >= 0;
        });
        if (allowedPlacements.length === 0) {
            allowedPlacements = placements$1;
            console.error([
                "Popper: The `allowedAutoPlacements` option did not allow any",
                "placements. Ensure the `placement` option matches the variation",
                "of the allowed placements.",
                'For example, "auto" cannot be used to allow "bottom-start".',
                'Use "auto-start" instead.'
            ].join(" "));
        }
        var overflows = allowedPlacements.reduce(function(acc, placement2) {
            acc[placement2] = detectOverflow(state, {
                placement: placement2,
                boundary,
                rootBoundary,
                padding
            })[getBasePlacement(placement2)];
            return acc;
        }, {});
        return Object.keys(overflows).sort(function(a, b) {
            return overflows[a] - overflows[b];
        });
    }
    function getExpandedFallbackPlacements(placement) {
        if (getBasePlacement(placement) === auto) return [];
        var oppositePlacement = getOppositePlacement(placement);
        return [
            getOppositeVariationPlacement(placement),
            oppositePlacement,
            getOppositeVariationPlacement(oppositePlacement)
        ];
    }
    function flip(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        if (state.modifiersData[name]._skip) return;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
        var preferredPlacement = state.options.placement;
        var basePlacement = getBasePlacement(preferredPlacement);
        var isBasePlacement = basePlacement === preferredPlacement;
        var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [
            getOppositePlacement(preferredPlacement)
        ] : getExpandedFallbackPlacements(preferredPlacement));
        var placements2 = [
            preferredPlacement
        ].concat(fallbackPlacements).reduce(function(acc, placement2) {
            return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
                placement: placement2,
                boundary,
                rootBoundary,
                padding,
                flipVariations,
                allowedAutoPlacements
            }) : placement2);
        }, []);
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var checksMap = new Map();
        var makeFallbackChecks = true;
        var firstFittingPlacement = placements2[0];
        for(var i = 0; i < placements2.length; i++){
            var placement = placements2[i];
            var _basePlacement = getBasePlacement(placement);
            var isStartVariation = getVariation(placement) === start;
            var isVertical = [
                top,
                bottom
            ].indexOf(_basePlacement) >= 0;
            var len = isVertical ? "width" : "height";
            var overflow = detectOverflow(state, {
                placement,
                boundary,
                rootBoundary,
                altBoundary,
                padding
            });
            var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
            if (referenceRect[len] > popperRect[len]) mainVariationSide = getOppositePlacement(mainVariationSide);
            var altVariationSide = getOppositePlacement(mainVariationSide);
            var checks = [];
            if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
            if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
            if (checks.every(function(check) {
                return check;
            })) {
                firstFittingPlacement = placement;
                makeFallbackChecks = false;
                break;
            }
            checksMap.set(placement, checks);
        }
        if (makeFallbackChecks) {
            var numberOfChecks = flipVariations ? 3 : 1;
            var _loop = function _loop2(_i2) {
                var fittingPlacement = placements2.find(function(placement2) {
                    var checks2 = checksMap.get(placement2);
                    if (checks2) return checks2.slice(0, _i2).every(function(check) {
                        return check;
                    });
                });
                if (fittingPlacement) {
                    firstFittingPlacement = fittingPlacement;
                    return "break";
                }
            };
            for(var _i = numberOfChecks; _i > 0; _i--){
                var _ret = _loop(_i);
                if (_ret === "break") break;
            }
        }
        if (state.placement !== firstFittingPlacement) {
            state.modifiersData[name]._skip = true;
            state.placement = firstFittingPlacement;
            state.reset = true;
        }
    }
    var flip$1 = {
        name: "flip",
        enabled: true,
        phase: "main",
        fn: flip,
        requiresIfExists: [
            "offset"
        ],
        data: {
            _skip: false
        }
    };
    function getAltAxis(axis) {
        return axis === "x" ? "y" : "x";
    }
    function within(min$1, value, max$1) {
        return max(min$1, min(value, max$1));
    }
    function preventOverflow(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
        var overflow = detectOverflow(state, {
            boundary,
            rootBoundary,
            padding,
            altBoundary
        });
        var basePlacement = getBasePlacement(state.placement);
        var variation = getVariation(state.placement);
        var isBasePlacement = !variation;
        var mainAxis = getMainAxisFromPlacement(basePlacement);
        var altAxis = getAltAxis(mainAxis);
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
            placement: state.placement
        })) : tetherOffset;
        var data = {
            x: 0,
            y: 0
        };
        if (!popperOffsets2) return;
        if (checkMainAxis || checkAltAxis) {
            var mainSide = mainAxis === "y" ? top : left;
            var altSide = mainAxis === "y" ? bottom : right;
            var len = mainAxis === "y" ? "height" : "width";
            var offset2 = popperOffsets2[mainAxis];
            var min$1 = popperOffsets2[mainAxis] + overflow[mainSide];
            var max$1 = popperOffsets2[mainAxis] - overflow[altSide];
            var additive = tether ? -popperRect[len] / 2 : 0;
            var minLen = variation === start ? referenceRect[len] : popperRect[len];
            var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
            var arrowElement = state.elements.arrow;
            var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
                width: 0,
                height: 0
            };
            var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
            var arrowPaddingMin = arrowPaddingObject[mainSide];
            var arrowPaddingMax = arrowPaddingObject[altSide];
            var arrowLen = within(0, referenceRect[len], arrowRect[len]);
            var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
            var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
            var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
            var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
            var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
            var tetherMin = popperOffsets2[mainAxis] + minOffset - offsetModifierValue - clientOffset;
            var tetherMax = popperOffsets2[mainAxis] + maxOffset - offsetModifierValue;
            if (checkMainAxis) {
                var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
                popperOffsets2[mainAxis] = preventedOffset;
                data[mainAxis] = preventedOffset - offset2;
            }
            if (checkAltAxis) {
                var _mainSide = mainAxis === "x" ? top : left;
                var _altSide = mainAxis === "x" ? bottom : right;
                var _offset = popperOffsets2[altAxis];
                var _min = _offset + overflow[_mainSide];
                var _max = _offset - overflow[_altSide];
                var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
                popperOffsets2[altAxis] = _preventedOffset;
                data[altAxis] = _preventedOffset - _offset;
            }
        }
        state.modifiersData[name] = data;
    }
    var preventOverflow$1 = {
        name: "preventOverflow",
        enabled: true,
        phase: "main",
        fn: preventOverflow,
        requiresIfExists: [
            "offset"
        ]
    };
    var toPaddingObject = function toPaddingObject2(padding, state) {
        padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
            placement: state.placement
        })) : padding;
        return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    };
    function arrow(_ref) {
        var _state$modifiersData$;
        var state = _ref.state, name = _ref.name, options = _ref.options;
        var arrowElement = state.elements.arrow;
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var basePlacement = getBasePlacement(state.placement);
        var axis = getMainAxisFromPlacement(basePlacement);
        var isVertical = [
            left,
            right
        ].indexOf(basePlacement) >= 0;
        var len = isVertical ? "height" : "width";
        if (!arrowElement || !popperOffsets2) return;
        var paddingObject = toPaddingObject(options.padding, state);
        var arrowRect = getLayoutRect(arrowElement);
        var minProp = axis === "y" ? top : left;
        var maxProp = axis === "y" ? bottom : right;
        var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
        var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
        var arrowOffsetParent = getOffsetParent(arrowElement);
        var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
        var centerToReference = endDiff / 2 - startDiff / 2;
        var min2 = paddingObject[minProp];
        var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
        var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
        var offset2 = within(min2, center, max2);
        var axisProp = axis;
        state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
    }
    function effect(_ref2) {
        var state = _ref2.state, options = _ref2.options;
        var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
        if (arrowElement == null) return;
        if (typeof arrowElement === "string") {
            arrowElement = state.elements.popper.querySelector(arrowElement);
            if (!arrowElement) return;
        }
        if (!isHTMLElement(arrowElement)) console.error([
            'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
            "To use an SVG arrow, wrap it in an HTMLElement that will be used as",
            "the arrow."
        ].join(" "));
        if (!contains(state.elements.popper, arrowElement)) {
            console.error([
                'Popper: "arrow" modifier\'s `element` must be a child of the popper',
                "element."
            ].join(" "));
            return;
        }
        state.elements.arrow = arrowElement;
    }
    var arrow$1 = {
        name: "arrow",
        enabled: true,
        phase: "main",
        fn: arrow,
        effect,
        requires: [
            "popperOffsets"
        ],
        requiresIfExists: [
            "preventOverflow"
        ]
    };
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
            top,
            right,
            bottom,
            left
        ].some(function(side) {
            return overflow[side] >= 0;
        });
    }
    function hide(_ref) {
        var state = _ref.state, name = _ref.name;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var preventedOffsets = state.modifiersData.preventOverflow;
        var referenceOverflow = detectOverflow(state, {
            elementContext: "reference"
        });
        var popperAltOverflow = detectOverflow(state, {
            altBoundary: true
        });
        var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
        var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
        var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
        var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
        state.modifiersData[name] = {
            referenceClippingOffsets,
            popperEscapeOffsets,
            isReferenceHidden,
            hasPopperEscaped
        };
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
            "data-popper-reference-hidden": isReferenceHidden,
            "data-popper-escaped": hasPopperEscaped
        });
    }
    var hide$1 = {
        name: "hide",
        enabled: true,
        phase: "main",
        requiresIfExists: [
            "preventOverflow"
        ],
        fn: hide
    };
    var defaultModifiers$1 = [
        eventListeners,
        popperOffsets$1,
        computeStyles$1,
        applyStyles$1
    ];
    var createPopper$1 = /* @__PURE__ */ popperGenerator({
        defaultModifiers: defaultModifiers$1
    });
    var defaultModifiers = [
        eventListeners,
        popperOffsets$1,
        computeStyles$1,
        applyStyles$1,
        offset$1,
        flip$1,
        preventOverflow$1,
        arrow$1,
        hide$1
    ];
    var createPopper = /* @__PURE__ */ popperGenerator({
        defaultModifiers
    });
    exports.applyStyles = applyStyles$1;
    exports.arrow = arrow$1;
    exports.computeStyles = computeStyles$1;
    exports.createPopper = createPopper;
    exports.createPopperLite = createPopper$1;
    exports.defaultModifiers = defaultModifiers;
    exports.detectOverflow = detectOverflow;
    exports.eventListeners = eventListeners;
    exports.flip = flip$1;
    exports.hide = hide$1;
    exports.offset = offset$1;
    exports.popperGenerator = popperGenerator;
    exports.popperOffsets = popperOffsets$1;
    exports.preventOverflow = preventOverflow$1;
});
// node_modules/tippy.js/dist/tippy.cjs.js
var require_tippy_cjs = __commonJS((exports)=>{
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var core = require_popper();
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
        return str.indexOf("[object") === 0 && str.indexOf(type + "]") > -1;
    }
    function invokeWithArgsOrReturn(value, args) {
        return typeof value === "function" ? value.apply(void 0, args) : value;
    }
    function debounce(fn, ms) {
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
        return placement.split("-")[0];
    }
    function arrayFrom(value) {
        return [].slice.call(value);
    }
    function removeUndefinedProps(obj) {
        return Object.keys(obj).reduce(function(acc, key) {
            if (obj[key] !== void 0) acc[key] = obj[key];
            return acc;
        }, {});
    }
    function div() {
        return document.createElement("div");
    }
    function isElement(value) {
        return [
            "Element",
            "Fragment"
        ].some(function(type) {
            return isType(value, type);
        });
    }
    function isNodeList(value) {
        return isType(value, "NodeList");
    }
    function isMouseEvent(value) {
        return isType(value, "MouseEvent");
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
            if (el) el.setAttribute("data-state", state);
        });
    }
    function getOwnerDocument(elementOrElements) {
        var _element$ownerDocumen;
        var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0];
        return (element == null ? void 0 : (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body) ? element.ownerDocument : document;
    }
    function isCursorOutsideInteractiveBorder(popperTreeData, event) {
        var clientX = event.clientX, clientY = event.clientY;
        return popperTreeData.every(function(_ref) {
            var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
            var interactiveBorder = props.interactiveBorder;
            var basePlacement = getBasePlacement(popperState.placement);
            var offsetData = popperState.modifiersData.offset;
            if (!offsetData) return true;
            var topDistance = basePlacement === "bottom" ? offsetData.top.y : 0;
            var bottomDistance = basePlacement === "top" ? offsetData.bottom.y : 0;
            var leftDistance = basePlacement === "right" ? offsetData.left.x : 0;
            var rightDistance = basePlacement === "left" ? offsetData.right.x : 0;
            var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
            var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
            var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
            var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
            return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
        });
    }
    function updateTransitionEndListener(box, action, listener) {
        var method = action + "EventListener";
        [
            "transitionend",
            "webkitTransitionEnd"
        ].forEach(function(event) {
            box[method](event, listener);
        });
    }
    var currentInput = {
        isTouch: false
    };
    var lastMouseMoveTime = 0;
    function onDocumentTouchStart() {
        if (currentInput.isTouch) return;
        currentInput.isTouch = true;
        if (window.performance) document.addEventListener("mousemove", onDocumentMouseMove);
    }
    function onDocumentMouseMove() {
        var now = performance.now();
        if (now - lastMouseMoveTime < 20) {
            currentInput.isTouch = false;
            document.removeEventListener("mousemove", onDocumentMouseMove);
        }
        lastMouseMoveTime = now;
    }
    function onWindowBlur() {
        var activeElement = document.activeElement;
        if (isReferenceElement(activeElement)) {
            var instance = activeElement._tippy;
            if (activeElement.blur && !instance.state.isVisible) activeElement.blur();
        }
    }
    function bindGlobalEventListeners() {
        document.addEventListener("touchstart", onDocumentTouchStart, TOUCH_OPTIONS);
        window.addEventListener("blur", onWindowBlur);
    }
    var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
    var ua = isBrowser ? navigator.userAgent : "";
    var isIE = /MSIE |Trident\//.test(ua);
    function createMemoryLeakWarning(method) {
        var txt = method === "destroy" ? "n already-" : " ";
        return [
            method + "() was called on a" + txt + "destroyed instance. This is a no-op but",
            "indicates a potential memory leak."
        ].join(" ");
    }
    function clean(value) {
        var spacesAndTabs = /[ \t]{2,}/g;
        var lineStartWithSpaces = /^[ \t]*/gm;
        return value.replace(spacesAndTabs, " ").replace(lineStartWithSpaces, "").trim();
    }
    function getDevMessage(message) {
        return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\u{1F477}\u200D This is a development-only message. It will be removed in production.\n  ");
    }
    function getFormattedMessage(message) {
        return [
            getDevMessage(message),
            "color: #00C584; font-size: 1.3em; font-weight: bold;",
            "line-height: 1.5",
            "color: #a6a095;"
        ];
    }
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
        var didPassPlainObject = Object.prototype.toString.call(targets) === "[object Object]" && !targets.addEventListener;
        errorWhen(didPassFalsyValue, [
            "tippy() was passed",
            "`" + String(targets) + "`",
            "as its targets (first) argument. Valid types are: String, Element,",
            "Element[], or NodeList."
        ].join(" "));
        errorWhen(didPassPlainObject, [
            "tippy() was passed a plain object which is not supported as an argument",
            "for virtual positioning. Use props.getReferenceClientRect instead."
        ].join(" "));
    }
    var pluginProps = {
        animateFill: false,
        followCursor: false,
        inlinePositioning: false,
        sticky: false
    };
    var renderProps = {
        allowHTML: false,
        animation: "fade",
        arrow: true,
        content: "",
        inertia: false,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999
    };
    var defaultProps = Object.assign({
        appendTo: function appendTo() {
            return document.body;
        },
        aria: {
            content: "auto",
            expanded: "auto"
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
        moveTransition: "",
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
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: false,
        touch: true,
        trigger: "mouseenter focus",
        triggerTarget: null
    }, pluginProps, {}, renderProps);
    var defaultKeys = Object.keys(defaultProps);
    var setDefaultProps = function setDefaultProps2(partialProps) {
        validateProps(partialProps, []);
        var keys = Object.keys(partialProps);
        keys.forEach(function(key) {
            defaultProps[key] = partialProps[key];
        });
    };
    function getExtendedPassedProps(passedProps) {
        var plugins = passedProps.plugins || [];
        var pluginProps2 = plugins.reduce(function(acc, plugin) {
            var name = plugin.name, defaultValue = plugin.defaultValue;
            if (name) acc[name] = passedProps[name] !== void 0 ? passedProps[name] : defaultValue;
            return acc;
        }, {});
        return Object.assign({}, passedProps, {}, pluginProps2);
    }
    function getDataAttributeProps(reference, plugins) {
        var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
            plugins
        }))) : defaultKeys;
        var props = propKeys.reduce(function(acc, key) {
            var valueAsString = (reference.getAttribute("data-tippy-" + key) || "").trim();
            if (!valueAsString) return acc;
            if (key === "content") acc[key] = valueAsString;
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
        out.aria = Object.assign({}, defaultProps.aria, {}, out.aria);
        out.aria = {
            expanded: out.aria.expanded === "auto" ? props.interactive : out.aria.expanded,
            content: out.aria.content === "auto" ? props.interactive ? null : "describedby" : out.aria.content
        };
        return out;
    }
    function validateProps(partialProps, plugins) {
        if (partialProps === void 0) partialProps = {};
        if (plugins === void 0) plugins = [];
        var keys = Object.keys(partialProps);
        keys.forEach(function(prop) {
            var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
            var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop);
            if (didPassUnknownProp) didPassUnknownProp = plugins.filter(function(plugin) {
                return plugin.name === prop;
            }).length === 0;
            warnWhen(didPassUnknownProp, [
                "`" + prop + "`",
                "is not a valid prop. You may have spelled it incorrectly, or if it's",
                "a plugin, forgot to pass it in an array as props.plugins.",
                "\n\n",
                "All props: https://atomiks.github.io/tippyjs/v6/all-props/\n",
                "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"
            ].join(" "));
        });
    }
    var innerHTML = function innerHTML2() {
        return "innerHTML";
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
            dangerouslySetInnerHTML(content, "");
            content.appendChild(props.content);
        } else if (typeof props.content !== "function") {
            if (props.allowHTML) dangerouslySetInnerHTML(content, props.content);
            else content.textContent = props.content;
        }
    }
    function getChildren(popper) {
        var box = popper.firstElementChild;
        var boxChildren = arrayFrom(box.children);
        return {
            box,
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
        var box = div();
        box.className = BOX_CLASS;
        box.setAttribute("data-state", "hidden");
        box.setAttribute("tabindex", "-1");
        var content = div();
        content.className = CONTENT_CLASS;
        content.setAttribute("data-state", "hidden");
        setContent(content, instance.props);
        popper.appendChild(box);
        box.appendChild(content);
        onUpdate(instance.props, instance.props);
        function onUpdate(prevProps, nextProps) {
            var _getChildren = getChildren(popper), box2 = _getChildren.box, content2 = _getChildren.content, arrow = _getChildren.arrow;
            if (nextProps.theme) box2.setAttribute("data-theme", nextProps.theme);
            else box2.removeAttribute("data-theme");
            if (typeof nextProps.animation === "string") box2.setAttribute("data-animation", nextProps.animation);
            else box2.removeAttribute("data-animation");
            if (nextProps.inertia) box2.setAttribute("data-inertia", "");
            else box2.removeAttribute("data-inertia");
            box2.style.maxWidth = typeof nextProps.maxWidth === "number" ? nextProps.maxWidth + "px" : nextProps.maxWidth;
            if (nextProps.role) box2.setAttribute("role", nextProps.role);
            else box2.removeAttribute("role");
            if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) setContent(content2, instance.props);
            if (nextProps.arrow) {
                if (!arrow) box2.appendChild(createArrowElement(nextProps.arrow));
                else if (prevProps.arrow !== nextProps.arrow) {
                    box2.removeChild(arrow);
                    box2.appendChild(createArrowElement(nextProps.arrow));
                }
            } else if (arrow) box2.removeChild(arrow);
        }
        return {
            popper,
            onUpdate
        };
    }
    render.$$tippy = true;
    var idCounter = 1;
    var mouseMoveListeners = [];
    var mountedInstances = [];
    function createTippy(reference, passedProps) {
        var props = evaluateProps(reference, Object.assign({}, defaultProps, {}, getExtendedPassedProps(removeUndefinedProps(passedProps))));
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
        var currentTarget;
        var id = idCounter++;
        var popperInstance = null;
        var plugins = unique(props.plugins);
        var state = {
            isEnabled: true,
            isVisible: false,
            isDestroyed: false,
            isMounted: false,
            isShown: false
        };
        var instance = {
            id,
            reference,
            popper: div(),
            popperInstance,
            props,
            state,
            plugins,
            clearDelayTimeouts,
            setProps,
            setContent: setContent2,
            show,
            hide,
            hideWithInteractivity,
            enable,
            disable,
            unmount,
            destroy
        };
        if (!props.render) {
            errorWhen(true, "render() function has not been supplied.");
            return instance;
        }
        var _props$render = props.render(instance), popper = _props$render.popper, onUpdate = _props$render.onUpdate;
        popper.setAttribute("data-tippy-root", "");
        popper.id = "tippy-" + instance.id;
        instance.popper = popper;
        reference._tippy = instance;
        popper._tippy = instance;
        var pluginsHooks = plugins.map(function(plugin) {
            return plugin.fn(instance);
        });
        var hasAriaExpanded = reference.hasAttribute("aria-expanded");
        addListeners();
        handleAriaExpandedAttribute();
        handleStyles();
        invokeHook("onCreate", [
            instance
        ]);
        if (props.showOnCreate) scheduleShow();
        popper.addEventListener("mouseenter", function() {
            if (instance.props.interactive && instance.state.isVisible) instance.clearDelayTimeouts();
        });
        popper.addEventListener("mouseleave", function(event) {
            if (instance.props.interactive && instance.props.trigger.indexOf("mouseenter") >= 0) {
                getDocument().addEventListener("mousemove", debouncedOnMouseMove);
                debouncedOnMouseMove(event);
            }
        });
        return instance;
        function getNormalizedTouchSettings() {
            var touch = instance.props.touch;
            return Array.isArray(touch) ? touch : [
                touch,
                0
            ];
        }
        function getIsCustomTouchBehavior() {
            return getNormalizedTouchSettings()[0] === "hold";
        }
        function getIsDefaultRenderFn() {
            var _instance$props$rende;
            return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
        }
        function getCurrentTarget() {
            return currentTarget || reference;
        }
        function getDocument() {
            var parent = getCurrentTarget().parentNode;
            return parent ? getOwnerDocument(parent) : document;
        }
        function getDefaultTemplateChildren() {
            return getChildren(popper);
        }
        function getDelay(isShow) {
            if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === "focus") {
                return 0;
            }
            return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
        }
        function handleStyles() {
            popper.style.pointerEvents = instance.props.interactive && instance.state.isVisible ? "" : "none";
            popper.style.zIndex = "" + instance.props.zIndex;
        }
        function invokeHook(hook, args, shouldInvokePropsHook) {
            if (shouldInvokePropsHook === void 0) {
                shouldInvokePropsHook = true;
            }
            pluginsHooks.forEach(function(pluginHooks) {
                if (pluginHooks[hook]) {
                    pluginHooks[hook].apply(void 0, args);
                }
            });
            if (shouldInvokePropsHook) {
                var _instance$props;
                (_instance$props = instance.props)[hook].apply(_instance$props, args);
            }
        }
        function handleAriaContentAttribute() {
            var aria = instance.props.aria;
            if (!aria.content) {
                return;
            }
            var attr = "aria-" + aria.content;
            var id2 = popper.id;
            var nodes = normalizeToArray(instance.props.triggerTarget || reference);
            nodes.forEach(function(node) {
                var currentValue = node.getAttribute(attr);
                if (instance.state.isVisible) {
                    node.setAttribute(attr, currentValue ? currentValue + " " + id2 : id2);
                } else {
                    var nextValue = currentValue && currentValue.replace(id2, "").trim();
                    if (nextValue) {
                        node.setAttribute(attr, nextValue);
                    } else {
                        node.removeAttribute(attr);
                    }
                }
            });
        }
        function handleAriaExpandedAttribute() {
            if (hasAriaExpanded || !instance.props.aria.expanded) {
                return;
            }
            var nodes = normalizeToArray(instance.props.triggerTarget || reference);
            nodes.forEach(function(node) {
                if (instance.props.interactive) {
                    node.setAttribute("aria-expanded", instance.state.isVisible && node === getCurrentTarget() ? "true" : "false");
                } else {
                    node.removeAttribute("aria-expanded");
                }
            });
        }
        function cleanupInteractiveMouseListeners() {
            getDocument().removeEventListener("mousemove", debouncedOnMouseMove);
            mouseMoveListeners = mouseMoveListeners.filter(function(listener) {
                return listener !== debouncedOnMouseMove;
            });
        }
        function onDocumentPress(event) {
            if (currentInput.isTouch) {
                if (didTouchMove || event.type === "mousedown") {
                    return;
                }
            }
            if (instance.props.interactive && popper.contains(event.target)) {
                return;
            }
            if (getCurrentTarget().contains(event.target)) {
                if (currentInput.isTouch) {
                    return;
                }
                if (instance.state.isVisible && instance.props.trigger.indexOf("click") >= 0) {
                    return;
                }
            } else {
                invokeHook("onClickOutside", [
                    instance,
                    event
                ]);
            }
            if (instance.props.hideOnClick === true) {
                instance.clearDelayTimeouts();
                instance.hide();
                didHideDueToDocumentMouseDown = true;
                setTimeout(function() {
                    didHideDueToDocumentMouseDown = false;
                });
                if (!instance.state.isMounted) {
                    removeDocumentPress();
                }
            }
        }
        function onTouchMove() {
            didTouchMove = true;
        }
        function onTouchStart() {
            didTouchMove = false;
        }
        function addDocumentPress() {
            var doc = getDocument();
            doc.addEventListener("mousedown", onDocumentPress, true);
            doc.addEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
            doc.addEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
            doc.addEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
        }
        function removeDocumentPress() {
            var doc = getDocument();
            doc.removeEventListener("mousedown", onDocumentPress, true);
            doc.removeEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
            doc.removeEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
            doc.removeEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
        }
        function onTransitionedOut(duration, callback) {
            onTransitionEnd(duration, function() {
                if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
                    callback();
                }
            });
        }
        function onTransitionedIn(duration, callback) {
            onTransitionEnd(duration, callback);
        }
        function onTransitionEnd(duration, callback) {
            var box = getDefaultTemplateChildren().box;
            function listener(event) {
                if (event.target === box) {
                    updateTransitionEndListener(box, "remove", listener);
                    callback();
                }
            }
            if (duration === 0) {
                return callback();
            }
            updateTransitionEndListener(box, "remove", currentTransitionEndListener);
            updateTransitionEndListener(box, "add", listener);
            currentTransitionEndListener = listener;
        }
        function on(eventType, handler, options) {
            if (options === void 0) {
                options = false;
            }
            var nodes = normalizeToArray(instance.props.triggerTarget || reference);
            nodes.forEach(function(node) {
                node.addEventListener(eventType, handler, options);
                listeners.push({
                    node,
                    eventType,
                    handler,
                    options
                });
            });
        }
        function addListeners() {
            if (getIsCustomTouchBehavior()) {
                on("touchstart", onTrigger, {
                    passive: true
                });
                on("touchend", onMouseLeave, {
                    passive: true
                });
            }
            splitBySpaces(instance.props.trigger).forEach(function(eventType) {
                if (eventType === "manual") {
                    return;
                }
                on(eventType, onTrigger);
                switch(eventType){
                    case "mouseenter":
                        on("mouseleave", onMouseLeave);
                        break;
                    case "focus":
                        on(isIE ? "focusout" : "blur", onBlurOrFocusOut);
                        break;
                    case "focusin":
                        on("focusout", onBlurOrFocusOut);
                        break;
                }
            });
        }
        function removeListeners() {
            listeners.forEach(function(_ref) {
                var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
                node.removeEventListener(eventType, handler, options);
            });
            listeners = [];
        }
        function onTrigger(event) {
            var _lastTriggerEvent;
            var shouldScheduleClickHide = false;
            if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
                return;
            }
            var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === "focus";
            lastTriggerEvent = event;
            currentTarget = event.currentTarget;
            handleAriaExpandedAttribute();
            if (!instance.state.isVisible && isMouseEvent(event)) {
                mouseMoveListeners.forEach(function(listener) {
                    return listener(event);
                });
            }
            if (event.type === "click" && (instance.props.trigger.indexOf("mouseenter") < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
                shouldScheduleClickHide = true;
            } else {
                scheduleShow(event);
            }
            if (event.type === "click") {
                isVisibleFromClick = !shouldScheduleClickHide;
            }
            if (shouldScheduleClickHide && !wasFocused) {
                scheduleHide(event);
            }
        }
        function onMouseMove(event) {
            var target = event.target;
            var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);
            if (event.type === "mousemove" && isCursorOverReferenceOrPopper) {
                return;
            }
            var popperTreeData = getNestedPopperTree().concat(popper).map(function(popper2) {
                var _instance$popperInsta;
                var instance2 = popper2._tippy;
                var state2 = (_instance$popperInsta = instance2.popperInstance) == null ? void 0 : _instance$popperInsta.state;
                if (state2) {
                    return {
                        popperRect: popper2.getBoundingClientRect(),
                        popperState: state2,
                        props
                    };
                }
                return null;
            }).filter(Boolean);
            if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
                cleanupInteractiveMouseListeners();
                scheduleHide(event);
            }
        }
        function onMouseLeave(event) {
            var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf("click") >= 0 && isVisibleFromClick;
            if (shouldBail) {
                return;
            }
            if (instance.props.interactive) {
                instance.hideWithInteractivity(event);
                return;
            }
            scheduleHide(event);
        }
        function onBlurOrFocusOut(event) {
            if (instance.props.trigger.indexOf("focusin") < 0 && event.target !== getCurrentTarget()) {
                return;
            }
            if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
                return;
            }
            scheduleHide(event);
        }
        function isEventListenerStopped(event) {
            return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf("touch") >= 0 : false;
        }
        function createPopperInstance() {
            destroyPopperInstance();
            var _instance$props2 = instance.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
            var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
            var computedReference = getReferenceClientRect ? {
                getBoundingClientRect: getReferenceClientRect,
                contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
            } : reference;
            var tippyModifier = {
                name: "$$tippy",
                enabled: true,
                phase: "beforeWrite",
                requires: [
                    "computeStyles"
                ],
                fn: function fn(_ref2) {
                    var state2 = _ref2.state;
                    if (getIsDefaultRenderFn()) {
                        var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
                        [
                            "placement",
                            "reference-hidden",
                            "escaped"
                        ].forEach(function(attr) {
                            if (attr === "placement") {
                                box.setAttribute("data-placement", state2.placement);
                            } else {
                                if (state2.attributes.popper["data-popper-" + attr]) {
                                    box.setAttribute("data-" + attr, "");
                                } else {
                                    box.removeAttribute("data-" + attr);
                                }
                            }
                        });
                        state2.attributes.popper = {};
                    }
                }
            };
            var modifiers = [
                {
                    name: "offset",
                    options: {
                        offset
                    }
                },
                {
                    name: "preventOverflow",
                    options: {
                        padding: {
                            top: 2,
                            bottom: 2,
                            left: 5,
                            right: 5
                        }
                    }
                },
                {
                    name: "flip",
                    options: {
                        padding: 5
                    }
                },
                {
                    name: "computeStyles",
                    options: {
                        adaptive: !moveTransition
                    }
                },
                tippyModifier
            ];
            if (getIsDefaultRenderFn() && arrow) {
                modifiers.push({
                    name: "arrow",
                    options: {
                        element: arrow,
                        padding: 3
                    }
                });
            }
            modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
            instance.popperInstance = core.createPopper(computedReference, popper, Object.assign({}, popperOptions, {
                placement,
                onFirstUpdate,
                modifiers
            }));
        }
        function destroyPopperInstance() {
            if (instance.popperInstance) {
                instance.popperInstance.destroy();
                instance.popperInstance = null;
            }
        }
        function mount() {
            var appendTo = instance.props.appendTo;
            var parentNode;
            var node = getCurrentTarget();
            if (instance.props.interactive && appendTo === defaultProps.appendTo || appendTo === "parent") {
                parentNode = node.parentNode;
            } else {
                parentNode = invokeWithArgsOrReturn(appendTo, [
                    node
                ]);
            }
            if (!parentNode.contains(popper)) {
                parentNode.appendChild(popper);
            }
            createPopperInstance();
            if (true) {
                warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, [
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
                    "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"
                ].join(" "));
            }
        }
        function getNestedPopperTree() {
            return arrayFrom(popper.querySelectorAll("[data-tippy-root]"));
        }
        function scheduleShow(event) {
            instance.clearDelayTimeouts();
            if (event) {
                invokeHook("onTrigger", [
                    instance,
                    event
                ]);
            }
            addDocumentPress();
            var delay = getDelay(true);
            var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
            if (currentInput.isTouch && touchValue === "hold" && touchDelay) {
                delay = touchDelay;
            }
            if (delay) {
                showTimeout = setTimeout(function() {
                    instance.show();
                }, delay);
            } else {
                instance.show();
            }
        }
        function scheduleHide(event) {
            instance.clearDelayTimeouts();
            invokeHook("onUntrigger", [
                instance,
                event
            ]);
            if (!instance.state.isVisible) {
                removeDocumentPress();
                return;
            }
            if (instance.props.trigger.indexOf("mouseenter") >= 0 && instance.props.trigger.indexOf("click") >= 0 && [
                "mouseleave",
                "mousemove"
            ].indexOf(event.type) >= 0 && isVisibleFromClick) {
                return;
            }
            var delay = getDelay(false);
            if (delay) {
                hideTimeout = setTimeout(function() {
                    if (instance.state.isVisible) {
                        instance.hide();
                    }
                }, delay);
            } else {
                scheduleHideAnimationFrame = requestAnimationFrame(function() {
                    instance.hide();
                });
            }
        }
        function enable() {
            instance.state.isEnabled = true;
        }
        function disable() {
            instance.hide();
            instance.state.isEnabled = false;
        }
        function clearDelayTimeouts() {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
            cancelAnimationFrame(scheduleHideAnimationFrame);
        }
        function setProps(partialProps) {
            if (true) {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("setProps"));
            }
            if (instance.state.isDestroyed) {
                return;
            }
            invokeHook("onBeforeUpdate", [
                instance,
                partialProps
            ]);
            removeListeners();
            var prevProps = instance.props;
            var nextProps = evaluateProps(reference, Object.assign({}, instance.props, {}, partialProps, {
                ignoreAttributes: true
            }));
            instance.props = nextProps;
            addListeners();
            if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
                cleanupInteractiveMouseListeners();
                debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
            }
            if (prevProps.triggerTarget && !nextProps.triggerTarget) {
                normalizeToArray(prevProps.triggerTarget).forEach(function(node) {
                    node.removeAttribute("aria-expanded");
                });
            } else if (nextProps.triggerTarget) {
                reference.removeAttribute("aria-expanded");
            }
            handleAriaExpandedAttribute();
            handleStyles();
            if (onUpdate) {
                onUpdate(prevProps, nextProps);
            }
            if (instance.popperInstance) {
                createPopperInstance();
                getNestedPopperTree().forEach(function(nestedPopper) {
                    requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
                });
            }
            invokeHook("onAfterUpdate", [
                instance,
                partialProps
            ]);
        }
        function setContent2(content) {
            instance.setProps({
                content
            });
        }
        function show() {
            if (true) {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("show"));
            }
            var isAlreadyVisible = instance.state.isVisible;
            var isDestroyed = instance.state.isDestroyed;
            var isDisabled = !instance.state.isEnabled;
            var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
            var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);
            if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
                return;
            }
            if (getCurrentTarget().hasAttribute("disabled")) {
                return;
            }
            invokeHook("onShow", [
                instance
            ], false);
            if (instance.props.onShow(instance) === false) {
                return;
            }
            instance.state.isVisible = true;
            if (getIsDefaultRenderFn()) {
                popper.style.visibility = "visible";
            }
            handleStyles();
            addDocumentPress();
            if (!instance.state.isMounted) {
                popper.style.transition = "none";
            }
            if (getIsDefaultRenderFn()) {
                var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content = _getDefaultTemplateCh2.content;
                setTransitionDuration([
                    box,
                    content
                ], 0);
            }
            onFirstUpdate = function onFirstUpdate2() {
                var _instance$popperInsta2;
                if (!instance.state.isVisible || ignoreOnFirstUpdate) {
                    return;
                }
                ignoreOnFirstUpdate = true;
                void popper.offsetHeight;
                popper.style.transition = instance.props.moveTransition;
                if (getIsDefaultRenderFn() && instance.props.animation) {
                    var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
                    setTransitionDuration([
                        _box,
                        _content
                    ], duration);
                    setVisibilityState([
                        _box,
                        _content
                    ], "visible");
                }
                handleAriaContentAttribute();
                handleAriaExpandedAttribute();
                pushIfUnique(mountedInstances, instance);
                (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
                instance.state.isMounted = true;
                invokeHook("onMount", [
                    instance
                ]);
                if (instance.props.animation && getIsDefaultRenderFn()) {
                    onTransitionedIn(duration, function() {
                        instance.state.isShown = true;
                        invokeHook("onShown", [
                            instance
                        ]);
                    });
                }
            };
            mount();
        }
        function hide() {
            if (true) {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("hide"));
            }
            var isAlreadyHidden = !instance.state.isVisible;
            var isDestroyed = instance.state.isDestroyed;
            var isDisabled = !instance.state.isEnabled;
            var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
            if (isAlreadyHidden || isDestroyed || isDisabled) {
                return;
            }
            invokeHook("onHide", [
                instance
            ], false);
            if (instance.props.onHide(instance) === false) {
                return;
            }
            instance.state.isVisible = false;
            instance.state.isShown = false;
            ignoreOnFirstUpdate = false;
            isVisibleFromClick = false;
            if (getIsDefaultRenderFn()) {
                popper.style.visibility = "hidden";
            }
            cleanupInteractiveMouseListeners();
            removeDocumentPress();
            handleStyles();
            if (getIsDefaultRenderFn()) {
                var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content = _getDefaultTemplateCh4.content;
                if (instance.props.animation) {
                    setTransitionDuration([
                        box,
                        content
                    ], duration);
                    setVisibilityState([
                        box,
                        content
                    ], "hidden");
                }
            }
            handleAriaContentAttribute();
            handleAriaExpandedAttribute();
            if (instance.props.animation) {
                if (getIsDefaultRenderFn()) {
                    onTransitionedOut(duration, instance.unmount);
                }
            } else {
                instance.unmount();
            }
        }
        function hideWithInteractivity(event) {
            if (true) {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("hideWithInteractivity"));
            }
            getDocument().addEventListener("mousemove", debouncedOnMouseMove);
            pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
            debouncedOnMouseMove(event);
        }
        function unmount() {
            if (true) {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("unmount"));
            }
            if (instance.state.isVisible) {
                instance.hide();
            }
            if (!instance.state.isMounted) {
                return;
            }
            destroyPopperInstance();
            getNestedPopperTree().forEach(function(nestedPopper) {
                nestedPopper._tippy.unmount();
            });
            if (popper.parentNode) {
                popper.parentNode.removeChild(popper);
            }
            mountedInstances = mountedInstances.filter(function(i) {
                return i !== instance;
            });
            instance.state.isMounted = false;
            invokeHook("onHidden", [
                instance
            ]);
        }
        function destroy() {
            if (true) {
                warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("destroy"));
            }
            if (instance.state.isDestroyed) {
                return;
            }
            instance.clearDelayTimeouts();
            instance.unmount();
            removeListeners();
            delete reference._tippy;
            instance.state.isDestroyed = true;
            invokeHook("onDestroy", [
                instance
            ]);
        }
    }
    function tippy2(targets, optionalProps) {
        if (optionalProps === void 0) optionalProps = {};
        var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
        validateTargets(targets);
        validateProps(optionalProps, plugins);
        bindGlobalEventListeners();
        var passedProps = Object.assign({}, optionalProps, {
            plugins
        });
        var elements = getArrayOfElements(targets);
        var isSingleContentElement = isElement(passedProps.content);
        var isMoreThanOneReferenceElement = elements.length > 1;
        warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, [
            "tippy() was passed an Element as the `content` prop, but more than",
            "one tippy instance was created by this invocation. This means the",
            "content element will only be appended to the last tippy instance.",
            "\n\n",
            "Instead, pass the .innerHTML of the element, or use a function that",
            "returns a cloned version of the element instead.",
            "\n\n",
            "1) content: element.innerHTML\n",
            "2) content: () => element.cloneNode(true)"
        ].join(" "));
        var instances = elements.reduce(function(acc, reference) {
            var instance = reference && createTippy(reference, passedProps);
            if (instance) acc.push(instance);
            return acc;
        }, []);
        return isElement(targets) ? instances[0] : instances;
    }
    tippy2.defaultProps = defaultProps;
    tippy2.setDefaultProps = setDefaultProps;
    tippy2.currentInput = currentInput;
    var hideAll = function hideAll2(_temp) {
        var _ref = _temp === void 0 ? {} : _temp, excludedReferenceOrInstance = _ref.exclude, duration = _ref.duration;
        mountedInstances.forEach(function(instance) {
            var isExcluded = false;
            if (excludedReferenceOrInstance) isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
            if (!isExcluded) {
                var originalDuration = instance.props.duration;
                instance.setProps({
                    duration
                });
                instance.hide();
                if (!instance.state.isDestroyed) instance.setProps({
                    duration: originalDuration
                });
            }
        });
    };
    var applyStylesModifier = Object.assign({}, core.applyStyles, {
        effect: function effect(_ref) {
            var state = _ref.state;
            var initialStyles = {
                popper: {
                    position: state.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {}
            };
            Object.assign(state.elements.popper.style, initialStyles.popper);
            state.styles = initialStyles;
            if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
        }
    });
    var createSingleton = function createSingleton2(tippyInstances, optionalProps) {
        var _optionalProps$popper;
        if (optionalProps === void 0) optionalProps = {};
        errorWhen(!Array.isArray(tippyInstances), [
            "The first argument passed to createSingleton() must be an array of",
            "tippy instances. The passed value was",
            String(tippyInstances)
        ].join(" "));
        var individualInstances = tippyInstances;
        var references = [];
        var currentTarget;
        var overrides = optionalProps.overrides;
        var interceptSetPropsCleanups = [];
        var shownOnCreate = false;
        function setReferences() {
            references = individualInstances.map(function(instance) {
                return instance.reference;
            });
        }
        function enableInstances(isEnabled) {
            individualInstances.forEach(function(instance) {
                if (isEnabled) instance.enable();
                else instance.disable();
            });
        }
        function interceptSetProps(singleton2) {
            return individualInstances.map(function(instance) {
                var originalSetProps2 = instance.setProps;
                instance.setProps = function(props) {
                    originalSetProps2(props);
                    if (instance.reference === currentTarget) singleton2.setProps(props);
                };
                return function() {
                    instance.setProps = originalSetProps2;
                };
            });
        }
        function prepareInstance(singleton2, target) {
            var index = references.indexOf(target);
            if (target === currentTarget) return;
            currentTarget = target;
            var overrideProps = (overrides || []).concat("content").reduce(function(acc, prop) {
                acc[prop] = individualInstances[index].props[prop];
                return acc;
            }, {});
            singleton2.setProps(Object.assign({}, overrideProps, {
                getReferenceClientRect: typeof overrideProps.getReferenceClientRect === "function" ? overrideProps.getReferenceClientRect : function() {
                    return target.getBoundingClientRect();
                }
            }));
        }
        enableInstances(false);
        setReferences();
        var plugin = {
            fn: function fn() {
                return {
                    onDestroy: function onDestroy() {
                        enableInstances(true);
                    },
                    onHidden: function onHidden() {
                        currentTarget = null;
                    },
                    onClickOutside: function onClickOutside(instance) {
                        if (instance.props.showOnCreate && !shownOnCreate) {
                            shownOnCreate = true;
                            currentTarget = null;
                        }
                    },
                    onShow: function onShow(instance) {
                        if (instance.props.showOnCreate && !shownOnCreate) {
                            shownOnCreate = true;
                            prepareInstance(instance, references[0]);
                        }
                    },
                    onTrigger: function onTrigger(instance, event) {
                        prepareInstance(instance, event.currentTarget);
                    }
                };
            }
        };
        var singleton = tippy2(div(), Object.assign({}, removeProperties(optionalProps, [
            "overrides"
        ]), {
            plugins: [
                plugin
            ].concat(optionalProps.plugins || []),
            triggerTarget: references,
            popperOptions: Object.assign({}, optionalProps.popperOptions, {
                modifiers: [].concat(((_optionalProps$popper = optionalProps.popperOptions) == null ? void 0 : _optionalProps$popper.modifiers) || [], [
                    applyStylesModifier
                ])
            })
        }));
        var originalShow = singleton.show;
        singleton.show = function(target) {
            originalShow();
            if (!currentTarget && target == null) return prepareInstance(singleton, references[0]);
            if (currentTarget && target == null) return;
            if (typeof target === "number") return references[target] && prepareInstance(singleton, references[target]);
            if (individualInstances.includes(target)) {
                var ref = target.reference;
                return prepareInstance(singleton, ref);
            }
            if (references.includes(target)) return prepareInstance(singleton, target);
        };
        singleton.showNext = function() {
            var first = references[0];
            if (!currentTarget) return singleton.show(0);
            var index = references.indexOf(currentTarget);
            singleton.show(references[index + 1] || first);
        };
        singleton.showPrevious = function() {
            var last = references[references.length - 1];
            if (!currentTarget) return singleton.show(last);
            var index = references.indexOf(currentTarget);
            var target = references[index - 1] || last;
            singleton.show(target);
        };
        var originalSetProps = singleton.setProps;
        singleton.setProps = function(props) {
            overrides = props.overrides || overrides;
            originalSetProps(props);
        };
        singleton.setInstances = function(nextInstances) {
            enableInstances(true);
            interceptSetPropsCleanups.forEach(function(fn) {
                return fn();
            });
            individualInstances = nextInstances;
            enableInstances(false);
            setReferences();
            interceptSetProps(singleton);
            singleton.setProps({
                triggerTarget: references
            });
        };
        interceptSetPropsCleanups = interceptSetProps(singleton);
        return singleton;
    };
    var BUBBLING_EVENTS_MAP = {
        mouseover: "mouseenter",
        focusin: "focus",
        click: "click"
    };
    function delegate(targets, props) {
        errorWhen(!(props && props.target), [
            "You must specity a `target` prop indicating a CSS selector string matching",
            "the target elements that should receive a tippy."
        ].join(" "));
        var listeners = [];
        var childTippyInstances = [];
        var disabled = false;
        var target = props.target;
        var nativeProps = removeProperties(props, [
            "target"
        ]);
        var parentProps = Object.assign({}, nativeProps, {
            trigger: "manual",
            touch: false
        });
        var childProps = Object.assign({}, nativeProps, {
            showOnCreate: true
        });
        var returnValue = tippy2(targets, parentProps);
        var normalizedReturnValue = normalizeToArray(returnValue);
        function onTrigger(event) {
            if (!event.target || disabled) return;
            var targetNode = event.target.closest(target);
            if (!targetNode) return;
            var trigger = targetNode.getAttribute("data-tippy-trigger") || props.trigger || defaultProps.trigger;
            if (targetNode._tippy) return;
            if (event.type === "touchstart" && typeof childProps.touch === "boolean") return;
            if (event.type !== "touchstart" && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) return;
            var instance = tippy2(targetNode, childProps);
            if (instance) childTippyInstances = childTippyInstances.concat(instance);
        }
        function on(node, eventType, handler, options) {
            if (options === void 0) options = false;
            node.addEventListener(eventType, handler, options);
            listeners.push({
                node,
                eventType,
                handler,
                options
            });
        }
        function addEventListeners(instance) {
            var reference = instance.reference;
            on(reference, "touchstart", onTrigger, TOUCH_OPTIONS);
            on(reference, "mouseover", onTrigger);
            on(reference, "focusin", onTrigger);
            on(reference, "click", onTrigger);
        }
        function removeEventListeners() {
            listeners.forEach(function(_ref) {
                var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
                node.removeEventListener(eventType, handler, options);
            });
            listeners = [];
        }
        function applyMutations(instance) {
            var originalDestroy = instance.destroy;
            var originalEnable = instance.enable;
            var originalDisable = instance.disable;
            instance.destroy = function(shouldDestroyChildInstances) {
                if (shouldDestroyChildInstances === void 0) shouldDestroyChildInstances = true;
                if (shouldDestroyChildInstances) childTippyInstances.forEach(function(instance2) {
                    instance2.destroy();
                });
                childTippyInstances = [];
                removeEventListeners();
                originalDestroy();
            };
            instance.enable = function() {
                originalEnable();
                childTippyInstances.forEach(function(instance2) {
                    return instance2.enable();
                });
                disabled = false;
            };
            instance.disable = function() {
                originalDisable();
                childTippyInstances.forEach(function(instance2) {
                    return instance2.disable();
                });
                disabled = true;
            };
            addEventListeners(instance);
        }
        normalizedReturnValue.forEach(applyMutations);
        return returnValue;
    }
    var animateFill = {
        name: "animateFill",
        defaultValue: false,
        fn: function fn(instance) {
            var _instance$props$rende;
            if (!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy)) {
                errorWhen(instance.props.animateFill, "The `animateFill` plugin requires the default render function.");
                return {};
            }
            var _getChildren = getChildren(instance.popper), box = _getChildren.box, content = _getChildren.content;
            var backdrop = instance.props.animateFill ? createBackdropElement() : null;
            return {
                onCreate: function onCreate() {
                    if (backdrop) {
                        box.insertBefore(backdrop, box.firstElementChild);
                        box.setAttribute("data-animatefill", "");
                        box.style.overflow = "hidden";
                        instance.setProps({
                            arrow: false,
                            animation: "shift-away"
                        });
                    }
                },
                onMount: function onMount() {
                    if (backdrop) {
                        var transitionDuration = box.style.transitionDuration;
                        var duration = Number(transitionDuration.replace("ms", ""));
                        content.style.transitionDelay = Math.round(duration / 10) + "ms";
                        backdrop.style.transitionDuration = transitionDuration;
                        setVisibilityState([
                            backdrop
                        ], "visible");
                    }
                },
                onShow: function onShow() {
                    if (backdrop) backdrop.style.transitionDuration = "0ms";
                },
                onHide: function onHide() {
                    if (backdrop) setVisibilityState([
                        backdrop
                    ], "hidden");
                }
            };
        }
    };
    function createBackdropElement() {
        var backdrop = div();
        backdrop.className = BACKDROP_CLASS;
        setVisibilityState([
            backdrop
        ], "hidden");
        return backdrop;
    }
    var mouseCoords = {
        clientX: 0,
        clientY: 0
    };
    var activeInstances = [];
    function storeMouseCoords(_ref) {
        var clientX = _ref.clientX, clientY = _ref.clientY;
        mouseCoords = {
            clientX,
            clientY
        };
    }
    function addMouseCoordsListener(doc) {
        doc.addEventListener("mousemove", storeMouseCoords);
    }
    function removeMouseCoordsListener(doc) {
        doc.removeEventListener("mousemove", storeMouseCoords);
    }
    var followCursor2 = {
        name: "followCursor",
        defaultValue: false,
        fn: function fn(instance) {
            var reference = instance.reference;
            var doc = getOwnerDocument(instance.props.triggerTarget || reference);
            var isInternalUpdate = false;
            var wasFocusEvent = false;
            var isUnmounted = true;
            var prevProps = instance.props;
            function getIsInitialBehavior() {
                return instance.props.followCursor === "initial" && instance.state.isVisible;
            }
            function addListener() {
                doc.addEventListener("mousemove", onMouseMove);
            }
            function removeListener() {
                doc.removeEventListener("mousemove", onMouseMove);
            }
            function unsetGetReferenceClientRect() {
                isInternalUpdate = true;
                instance.setProps({
                    getReferenceClientRect: null
                });
                isInternalUpdate = false;
            }
            function onMouseMove(event) {
                var isCursorOverReference = event.target ? reference.contains(event.target) : true;
                var followCursor3 = instance.props.followCursor;
                var clientX = event.clientX, clientY = event.clientY;
                var rect = reference.getBoundingClientRect();
                var relativeX = clientX - rect.left;
                var relativeY = clientY - rect.top;
                if (isCursorOverReference || !instance.props.interactive) instance.setProps({
                    getReferenceClientRect: function getReferenceClientRect() {
                        var rect2 = reference.getBoundingClientRect();
                        var x = clientX;
                        var y = clientY;
                        if (followCursor3 === "initial") {
                            x = rect2.left + relativeX;
                            y = rect2.top + relativeY;
                        }
                        var top = followCursor3 === "horizontal" ? rect2.top : y;
                        var right = followCursor3 === "vertical" ? rect2.right : x;
                        var bottom = followCursor3 === "horizontal" ? rect2.bottom : y;
                        var left = followCursor3 === "vertical" ? rect2.left : x;
                        return {
                            width: right - left,
                            height: bottom - top,
                            top,
                            right,
                            bottom,
                            left
                        };
                    }
                });
            }
            function create() {
                if (instance.props.followCursor) {
                    activeInstances.push({
                        instance,
                        doc
                    });
                    addMouseCoordsListener(doc);
                }
            }
            function destroy() {
                activeInstances = activeInstances.filter(function(data) {
                    return data.instance !== instance;
                });
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
                    var followCursor3 = _ref2.followCursor;
                    if (isInternalUpdate) return;
                    if (followCursor3 !== void 0 && prevProps.followCursor !== followCursor3) {
                        destroy();
                        if (followCursor3) {
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
                    wasFocusEvent = event.type === "focus";
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
        name: "inlinePositioning",
        defaultValue: false,
        fn: function fn(instance) {
            var reference = instance.reference;
            function isEnabled() {
                return !!instance.props.inlinePositioning;
            }
            var placement;
            var cursorRectIndex = -1;
            var isInternalUpdate = false;
            var modifier = {
                name: "tippyInlinePositioning",
                enabled: true,
                phase: "afterWrite",
                fn: function fn2(_ref2) {
                    var state = _ref2.state;
                    if (isEnabled()) {
                        if (placement !== state.placement) instance.setProps({
                            getReferenceClientRect: function getReferenceClientRect() {
                                return _getReferenceClientRect(state.placement);
                            }
                        });
                        placement = state.placement;
                    }
                }
            };
            function _getReferenceClientRect(placement2) {
                return getInlineBoundingClientRect(getBasePlacement(placement2), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
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
                        cursorRectIndex = rects.indexOf(cursorRect);
                    }
                },
                onUntrigger: function onUntrigger() {
                    cursorRectIndex = -1;
                }
            };
        }
    };
    function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
        if (clientRects.length < 2 || currentBasePlacement === null) return boundingRect;
        if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) return clientRects[cursorRectIndex] || boundingRect;
        switch(currentBasePlacement){
            case "top":
            case "bottom":
                var firstRect = clientRects[0];
                var lastRect = clientRects[clientRects.length - 1];
                var isTop = currentBasePlacement === "top";
                var top = firstRect.top;
                var bottom = lastRect.bottom;
                var left = isTop ? firstRect.left : lastRect.left;
                var right = isTop ? firstRect.right : lastRect.right;
                var width = right - left;
                var height = bottom - top;
                return {
                    top,
                    bottom,
                    left,
                    right,
                    width,
                    height
                };
            case "left":
            case "right":
                var minLeft = Math.min.apply(Math, clientRects.map(function(rects) {
                    return rects.left;
                }));
                var maxRight = Math.max.apply(Math, clientRects.map(function(rects) {
                    return rects.right;
                }));
                var measureRects = clientRects.filter(function(rect) {
                    return currentBasePlacement === "left" ? rect.left === minLeft : rect.right === maxRight;
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
        name: "sticky",
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
                var currentRefRect = shouldCheck("reference") ? getReference().getBoundingClientRect() : null;
                var currentPopRect = shouldCheck("popper") ? popper.getBoundingClientRect() : null;
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
    tippy2.setDefaultProps({
        render
    });
    exports.animateFill = animateFill;
    exports.createSingleton = createSingleton;
    exports.default = tippy2;
    exports.delegate = delegate;
    exports.followCursor = followCursor2;
    exports.hideAll = hideAll;
    exports.inlinePositioning = inlinePositioning;
    exports.roundArrow = ROUND_ARROW;
    exports.sticky = sticky;
});
// src/index.js
var import_tippy2 = __toModule(require_tippy_cjs());
// src/buildConfigFromModifiers.js
var import_tippy = __toModule(require_tippy_cjs());
var buildConfigFromModifiers = (modifiers)=>{
    const config = {
        plugins: []
    };
    const getModifierArgument = (modifier)=>{
        return modifiers[modifiers.indexOf(modifier) + 1];
    };
    if (modifiers.includes("animation")) config.animation = getModifierArgument("animation");
    if (modifiers.includes("duration")) config.duration = parseInt(getModifierArgument("duration"));
    if (modifiers.includes("delay")) {
        const delay = getModifierArgument("delay");
        config.delay = delay.includes("-") ? delay.split("-").map((n)=>parseInt(n)
        ) : parseInt(delay);
    }
    if (modifiers.includes("cursor")) {
        config.plugins.push(import_tippy.followCursor);
        const next = getModifierArgument("cursor");
        if ([
            "x",
            "initial"
        ].includes(next)) config.followCursor = next === "x" ? "horizontal" : "initial";
        else config.followCursor = true;
    }
    if (modifiers.includes("on")) config.trigger = getModifierArgument("on");
    if (modifiers.includes("arrowless")) config.arrow = false;
    if (modifiers.includes("html")) config.allowHTML = true;
    if (modifiers.includes("interactive")) config.interactive = true;
    if (modifiers.includes("border") && config.interactive) config.interactiveBorder = parseInt(getModifierArgument("border"));
    if (modifiers.includes("debounce") && config.interactive) config.interactiveDebounce = parseInt(getModifierArgument("debounce"));
    if (modifiers.includes("max-width")) config.maxWidth = parseInt(getModifierArgument("max-width"));
    if (modifiers.includes("theme")) config.theme = getModifierArgument("theme");
    if (modifiers.includes("placement")) config.placement = getModifierArgument("placement");
    return config;
};
// src/index.js
function src_default(Alpine) {
    Alpine.magic("tooltip", (el)=>{
        return (content, config = {})=>{
            const instance = (0, import_tippy2.default)(el, {
                content,
                trigger: "manual",
                ...config
            });
            instance.show();
            setTimeout(()=>{
                instance.hide();
                setTimeout(()=>instance.destroy()
                , config.duration || 300);
            }, config.timeout || 2e3);
        };
    });
    Alpine.directive("tooltip", (el, { modifiers , expression  }, { evaluateLater , effect  })=>{
        const config = modifiers.length > 0 ? buildConfigFromModifiers(modifiers) : {};
        if (!el.__x_tippy) el.__x_tippy = (0, import_tippy2.default)(el, config);
        const enableTooltip = ()=>el.__x_tippy.enable()
        ;
        const disableTooltip = ()=>el.__x_tippy.disable()
        ;
        const setupTooltip = (content)=>{
            if (!content) disableTooltip();
            else {
                enableTooltip();
                el.__x_tippy.setContent(content);
            }
        };
        if (modifiers.includes("raw")) setupTooltip(expression);
        else {
            const getContent = evaluateLater(expression);
            effect(()=>{
                getContent((content)=>{
                    if (typeof content === "object") {
                        el.__x_tippy.setProps(content);
                        enableTooltip();
                    } else setupTooltip(content);
                });
            });
        }
    });
}
// builds/module.js
var module_default = src_default;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a8yvv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "log", ()=>_loglevelDefault.default
);
var _loglevel = require("loglevel");
var _loglevelDefault = parcelHelpers.interopDefault(_loglevel);
var _loglevelPluginPrefix = require("loglevel-plugin-prefix");
var _loglevelPluginPrefixDefault = parcelHelpers.interopDefault(_loglevelPluginPrefix);
_loglevelPluginPrefixDefault.default.reg(_loglevelDefault.default);
_loglevelPluginPrefixDefault.default.apply(_loglevelDefault.default, {
    format: (level)=>`${`[${level}]`.padStart(7)} Lookbook:`
});
let logLevel = 2;
if (window.LOG_LEVEL !== undefined) logLevel = window.LOG_LEVEL;
_loglevelDefault.default.setLevel(logLevel);
function loggerPlugin(Alpine) {
    Alpine.directive("log", (el, { modifiers , expression  }, { evaluateLater , effect  })=>{
        let logFn = typeof expression === "string" ? (callback)=>callback(expression)
         : evaluateLater(expression);
        effect(()=>logFn((message)=>{
                const level = modifiers[0] || "debug";
                _loglevelDefault.default[level](message);
            })
        );
    });
    Alpine.magic("log", ()=>{
        return _loglevelDefault.default;
    });
    Alpine.$log = _loglevelDefault.default;
}
exports.default = loggerPlugin;

},{"loglevel":"7kRFs","loglevel-plugin-prefix":"cLqdu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7kRFs":[function(require,module,exports) {
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/ (function(root, definition) {
    if (typeof define === 'function' && define.amd) define(definition);
    else if (module.exports) module.exports = definition();
    else root.log = definition();
})(this, function() {
    "use strict";
    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];
    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') return method.bind(obj);
        else try {
            return Function.prototype.bind.call(method, obj);
        } catch (e) {
            // Missing bind shim or IE8 + Modernizr, fallback to wrapping
            return function() {
                return Function.prototype.apply.apply(method, [
                    obj,
                    arguments
                ]);
            };
        }
    }
    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) console.log.apply(console, arguments);
            else // In old IE, native console methods themselves don't have apply().
            Function.prototype.apply.apply(console.log, [
                console,
                arguments
            ]);
        }
        if (console.trace) console.trace();
    }
    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') methodName = 'log';
        if (typeof console === undefinedType) return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        else if (methodName === 'trace' && isIE) return traceForIE;
        else if (console[methodName] !== undefined) return bindMethod(console, methodName);
        else if (console.log !== undefined) return bindMethod(console, 'log');
        else return noop;
    }
    // These private functions always need `this` to be set properly
    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */ for(var i = 0; i < logMethods.length; i++){
            var methodName = logMethods[i];
            this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
        }
        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }
    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function() {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }
    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */ return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
    function Logger(name, defaultLevel, factory) {
        var self = this;
        var currentLevel;
        defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;
        var storageKey = "loglevel";
        if (typeof name === "string") storageKey += ":" + name;
        else if (typeof name === "symbol") storageKey = undefined;
        function persistLevelIfPossible(levelNum) {
            var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
            if (typeof window === undefinedType || !storageKey) return;
            // Use localStorage if available
            try {
                window.localStorage[storageKey] = levelName;
                return;
            } catch (ignore) {}
            // Use session cookie as fallback
            try {
                window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
            } catch (ignore1) {}
        }
        function getPersistedLevel() {
            var storedLevel;
            if (typeof window === undefinedType || !storageKey) return;
            try {
                storedLevel = window.localStorage[storageKey];
            } catch (ignore) {}
            // Fallback to cookies if local storage gives us nothing
            if (typeof storedLevel === undefinedType) try {
                var cookie = window.document.cookie;
                var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");
                if (location !== -1) storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
            } catch (ignore2) {}
            // If the stored level is not valid, treat it as if nothing was stored.
            if (self.levels[storedLevel] === undefined) storedLevel = undefined;
            return storedLevel;
        }
        function clearPersistedLevel() {
            if (typeof window === undefinedType || !storageKey) return;
            // Use localStorage if available
            try {
                window.localStorage.removeItem(storageKey);
                return;
            } catch (ignore) {}
            // Use session cookie as fallback
            try {
                window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            } catch (ignore3) {}
        }
        /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */ self.name = name;
        self.levels = {
            "TRACE": 0,
            "DEBUG": 1,
            "INFO": 2,
            "WARN": 3,
            "ERROR": 4,
            "SILENT": 5
        };
        self.methodFactory = factory || defaultMethodFactory;
        self.getLevel = function() {
            return currentLevel;
        };
        self.setLevel = function(level, persist) {
            if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) level = self.levels[level.toUpperCase()];
            if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
                currentLevel = level;
                if (persist !== false) persistLevelIfPossible(level);
                replaceLoggingMethods.call(self, level, name);
                if (typeof console === undefinedType && level < self.levels.SILENT) return "No console available for logging";
            } else throw "log.setLevel() called with invalid level: " + level;
        };
        self.setDefaultLevel = function(level) {
            defaultLevel = level;
            if (!getPersistedLevel()) self.setLevel(level, false);
        };
        self.resetLevel = function() {
            self.setLevel(defaultLevel, false);
            clearPersistedLevel();
        };
        self.enableAll = function(persist) {
            self.setLevel(self.levels.TRACE, persist);
        };
        self.disableAll = function(persist) {
            self.setLevel(self.levels.SILENT, persist);
        };
        // Initialize with the right level
        var initialLevel = getPersistedLevel();
        if (initialLevel == null) initialLevel = defaultLevel;
        self.setLevel(initialLevel, false);
    }
    /*
     *
     * Top-level API
     *
     */ var defaultLogger = new Logger();
    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "symbol" && typeof name !== "string" || name === "") throw new TypeError("You must supply a name when creating a logger.");
        var logger = _loggersByName[name];
        if (!logger) logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        return logger;
    };
    // Grab the current global log variable in case of overwrite
    var _log = typeof window !== undefinedType ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType && window.log === defaultLogger) window.log = _log;
        return defaultLogger;
    };
    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };
    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;
    return defaultLogger;
});

},{}],"cLqdu":[function(require,module,exports) {
(function(root, factory) {
    if (typeof define === 'function' && define.amd) define(factory);
    else if (module.exports) module.exports = factory();
    else root.prefix = factory(root);
})(this, function(root) {
    'use strict';
    var merge = function(target) {
        var i = 1;
        var length = arguments.length;
        var key;
        for(; i < length; i++){
            for(key in arguments[i])if (Object.prototype.hasOwnProperty.call(arguments[i], key)) target[key] = arguments[i][key];
        }
        return target;
    };
    var defaults = {
        template: '[%t] %l:',
        levelFormatter: function(level) {
            return level.toUpperCase();
        },
        nameFormatter: function(name) {
            return name || 'root';
        },
        timestampFormatter: function(date) {
            return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
        },
        format: undefined
    };
    var loglevel;
    var configs = {};
    var reg = function(rootLogger) {
        if (!rootLogger || !rootLogger.getLogger) throw new TypeError('Argument is not a root logger');
        loglevel = rootLogger;
    };
    var apply = function(logger, config) {
        if (!logger || !logger.setLevel) throw new TypeError('Argument is not a logger');
        /* eslint-disable vars-on-top */ var originalFactory = logger.methodFactory;
        var name = logger.name || '';
        var parent = configs[name] || configs[''] || defaults;
        /* eslint-enable vars-on-top */ function methodFactory(methodName, logLevel, loggerName) {
            var originalMethod = originalFactory(methodName, logLevel, loggerName);
            var options = configs[loggerName] || configs[''];
            var hasTimestamp = options.template.indexOf('%t') !== -1;
            var hasLevel = options.template.indexOf('%l') !== -1;
            var hasName = options.template.indexOf('%n') !== -1;
            return function() {
                var content = '';
                var length = arguments.length;
                var args = Array(length);
                var key = 0;
                for(; key < length; key++)args[key] = arguments[key];
                // skip the root method for child loggers to prevent duplicate logic
                if (name || !configs[loggerName]) {
                    /* eslint-disable vars-on-top */ var timestamp = options.timestampFormatter(new Date());
                    var level = options.levelFormatter(methodName);
                    var lname = options.nameFormatter(loggerName);
                    /* eslint-enable vars-on-top */ if (options.format) content += options.format(level, lname, timestamp);
                    else {
                        content += options.template;
                        if (hasTimestamp) content = content.replace(/%t/, timestamp);
                        if (hasLevel) content = content.replace(/%l/, level);
                        if (hasName) content = content.replace(/%n/, lname);
                    }
                    if (args.length && typeof args[0] === 'string') // concat prefix with first argument to support string substitutions
                    args[0] = content + ' ' + args[0];
                    else args.unshift(content);
                }
                originalMethod.apply(undefined, args);
            };
        }
        if (!configs[name]) logger.methodFactory = methodFactory;
        // for remove inherited format option if template option preset
        config = config || {};
        if (config.template) config.format = undefined;
        configs[name] = merge({}, parent, config);
        logger.setLevel(logger.getLevel());
        if (!loglevel) logger.warn('It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md');
        return logger;
    };
    var api = {
        reg: reg,
        apply: apply
    };
    var save;
    if (root) {
        save = root.prefix;
        api.noConflict = function() {
            if (root.prefix === api) root.prefix = save;
            return api;
        };
    }
    return api;
});

},{}],"2QNcl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
var _configDefault = parcelHelpers.interopDefault(_config);
var _layout = require("../helpers/layout");
var _logger = require("../plugins/logger");
var _string = require("../helpers/string");
const { sidebar , main , inspector  } = _configDefault.default;
function initLayoutStore(Alpine, { prefix  }) {
    return {
        init () {
            _layout.addMediaQueryListener(`(min-width: ${_configDefault.default.desktopWidth}px)`, (matches)=>{
                this._isDesktop = matches;
                _logger.log.debug(`Media query 'desktop': ${matches ? "✅ match" : "❌ no match"}`);
            });
        },
        get desktop () {
            return this._isDesktop;
        },
        get mobile () {
            return !this.desktop;
        },
        reflowing: false,
        // Main app sidebar/content layout
        main: {
            split: Alpine.$persist({
                direction: "vertical",
                sizes: [
                    `${sidebar.defaultWidth}px`,
                    "1fr"
                ]
            }).as(_string.prefixString("main-split", prefix)),
            opts: {
                minSizes: [
                    sidebar.minWidth,
                    main.minWidth
                ]
            }
        },
        // Sidebar visibility and sections
        sidebar: {
            _hiddenDesktop: Alpine.$persist(false).as(_string.prefixString("sidebar-hidden-desktop", prefix)),
            _hiddenMobile: Alpine.$persist(true).as(_string.prefixString("sidebar-hidden-mobile", prefix)),
            set hidden (value){
                if (Alpine.store("layout").desktop) this._hiddenDesktop = value;
                else this._hiddenMobile = value;
            },
            get hidden () {
                const isDesktop = Alpine.store("layout").desktop;
                return isDesktop && this._hiddenDesktop || !isDesktop && this._hiddenMobile;
            },
            split: Alpine.$persist({
                direction: "horizontal",
                sizes: [
                    "50%",
                    "50%"
                ]
            }).as(_string.prefixString("sidebar-split", prefix)),
            opts: {
                minSizes: [
                    sidebar.minSectionHeight,
                    sidebar.minSectionHeight
                ]
            }
        },
        singleSectionSidebar: {
            split: {
                direction: "horizontal",
                sizes: null
            }
        },
        // Inspector drawer/preview layout
        inspector: {
            split: Alpine.$persist({
                direction: "horizontal",
                horizontalSizes: [
                    "1fr",
                    `${inspector.drawer.defaultHeight}px`
                ],
                verticalSizes: [
                    "1fr",
                    `${inspector.drawer.defaultWidth}px`
                ]
            }).as(_string.prefixString("inspector-split", prefix)),
            opts: {
                minVerticalSizes: [
                    inspector.drawer.minWidth,
                    inspector.drawer.minWidth, 
                ],
                minHorizontalSizes: [
                    inspector.drawer.minHeight,
                    inspector.drawer.minHeight, 
                ]
            }
        },
        // protected
        _isDesktop: true
    };
}
exports.default = initLayoutStore;

},{"../config":"i1E5F","../helpers/layout":"128Lz","../plugins/logger":"a8yvv","../helpers/string":"iYagP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i1E5F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    desktopWidth: 768,
    wideDesktopWidth: 1200,
    sidebar: {
        defaultWidth: 280,
        minWidth: 200,
        minSectionHeight: 200
    },
    main: {
        minWidth: 200
    },
    inspector: {
        drawer: {
            defaultHeight: 300,
            defaultWidth: 500,
            minWidth: 350,
            minHeight: 200
        },
        preview: {
            minHeight: 200,
            minWidth: 200
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"128Lz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addMediaQueryListener", ()=>addMediaQueryListener
);
parcelHelpers.export(exports, "observeSize", ()=>observeSize
);
function addMediaQueryListener(condition, callback) {
    const mediaQueryList = window.matchMedia(condition);
    const handleChange = (mql)=>callback(mql.matches)
    ;
    handleChange(mediaQueryList);
    mediaQueryList.addEventListener("change", (mql)=>handleChange(mql)
    );
    return mediaQueryList;
}
function observeSize(element, callback = ()=>{}) {
    const observer = new ResizeObserver((entries)=>{
        const rect = entries[0].target.getBoundingClientRect();
        callback({
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        });
    });
    observer.observe(element);
    return observer;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iYagP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "prefixString", ()=>prefixString
);
parcelHelpers.export(exports, "decodeEntities", ()=>decodeEntities
);
function decodeEntities(content) {
    var txt = document.createElement("textarea");
    txt.innerHTML = content;
    return txt.value;
}
function prefixString(string, prefix = null) {
    return prefix ? `${prefix}-${string}` : string;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dYphZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _filter = require("./filter");
var _filterDefault = parcelHelpers.interopDefault(_filter);
var _string = require("../helpers/string");
function initNavStore(Alpine, { prefix  }) {
    return {
        previews: {
            filter: _filterDefault.default(Alpine, _string.prefixString("previews-filter-text", prefix)),
            open: Alpine.$persist([]).as(_string.prefixString("previews-nav-open", prefix))
        },
        pages: {
            filter: _filterDefault.default(Alpine, _string.prefixString("pages-filter-text", prefix)),
            open: Alpine.$persist([]).as(_string.prefixString("pages-nav-open", prefix))
        }
    };
}
exports.default = initNavStore;

},{"./filter":"hkfE6","../helpers/string":"iYagP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hkfE6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function initFilterStore(Alpine, name) {
    return {
        raw: Alpine.$persist("").as(name),
        get text () {
            return this.raw.replace(/\s/g, "").toLowerCase();
        },
        get active () {
            return this.text.length > 0;
        }
    };
}
exports.default = initFilterStore;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1tdkQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _string = require("../helpers/string");
function initInspectorStore(Alpine, { prefix  }) {
    return {
        minVerticalSplitWidth: 800,
        main: {
            activeTab: Alpine.$persist("").as(_string.prefixString("inspector-main-active-tab", prefix)),
            width: Alpine.$persist("100%").as(_string.prefixString("inspector-main-width", prefix)),
            height: Alpine.$persist("100%").as(_string.prefixString("inspector-main-height", prefix)),
            lastWidth: null,
            lastHeight: null,
            resizing: false
        },
        drawer: {
            hidden: Alpine.$persist(false).as(_string.prefixString("inspector-drawer-hidden", prefix)),
            activeTab: Alpine.$persist("").as(_string.prefixString("inspector-drawer-active-tab", prefix))
        }
    };
}
exports.default = initInspectorStore;

},{"../helpers/string":"iYagP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hvNyC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _string = require("../helpers/string");
function initPagesStore(Alpine, { prefix  }) {
    return {
        embeds: Alpine.$persist({}).as(_string.prefixString("pages-embeds", prefix))
    };
}
exports.default = initPagesStore;

},{"../helpers/string":"iYagP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f0gkx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _string = require("../helpers/string");
function initSettingsStore(Alpine, { prefix  }) {
    return {
        showTooltips: true
    };
}
exports.default = initSettingsStore;

},{"../helpers/string":"iYagP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f6Spf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _filter = require("./filter");
var _filterDefault = parcelHelpers.interopDefault(_filter);
var _string = require("../helpers/string");
function initWorkbenchStore(Alpine, { prefix  }) {
    return {
        filter: _filterDefault.default(Alpine, _string.prefixString("workbench-filter", prefix)),
        nav: {
            open: Alpine.$persist([]).as(_string.prefixString("workbench-nav-open", prefix)),
            location: {
                pathname: null
            }
        },
        horizontalSplitLayout: {
            split: Alpine.$persist({
                direction: "horizontal",
                sizes: [
                    "50%",
                    "50%"
                ]
            }).as(_string.prefixString("workbench-horizontal-split", prefix))
        },
        verticalSplitLayout: {
            split: Alpine.$persist({
                direction: "vertical",
                sizes: [
                    "40%",
                    "30%",
                    "30%"
                ]
            }).as(_string.prefixString("workbench-vertical-split", prefix))
        },
        tabbedPanels: {
            activeTab: "tab-1"
        }
    };
}
exports.default = initWorkbenchStore;

},{"./filter":"hkfE6","../helpers/string":"iYagP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bkyhi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _socket = require("./lib/socket");
var _socketDefault = parcelHelpers.interopDefault(_socket);
var _dom = require("./helpers/dom");
var _request = require("./helpers/request");
function app() {
    return {
        version: Alpine.$persist("").as("lookbook-version"),
        location: window.location,
        init () {
            if (window.SOCKET_PATH) {
                const socket = _socketDefault.default(window.SOCKET_PATH);
                socket.addListener("Lookbook::ReloadChannel", ()=>this.updateDOM()
                );
            }
        },
        navigateTo (path) {
            this.debug(`Navigating to ${path}`);
            history.pushState({}, null, path);
            this.$dispatch("popstate");
        },
        async handleNavigation () {
            this.debug("Navigating to ", window.location.pathname);
            this.$dispatch("navigation:start");
            this.location = window.location;
            await this.updateDOM();
            this.$dispatch("navigation:complete");
        },
        hijax (evt) {
            const link = evt.target.closest("a[href]");
            if (link && !_dom.isExternalLink(link)) {
                evt.preventDefault();
                this.navigateTo(link.href);
            }
        },
        async updateDOM () {
            this.debug("Starting DOM update");
            this.$dispatch("dom:update-start");
            try {
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
        toggleSidebar () {
            this.$store.layout.sidebar.hidden = !this.$store.layout.sidebar.hidden;
        },
        closeMobileSidebar () {
            if (this.$store.layout.mobile && !this.sidebarHidden) this.toggleSidebar();
        },
        get sidebarHidden () {
            return this.$store.layout.sidebar.hidden;
        },
        ...Alpine.$log
    };
}
exports.default = app;

},{"./lib/socket":"8T56f","./helpers/dom":"3rv1J","./helpers/request":"12Op4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8T56f":[function(require,module,exports) {
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
                setTimeout(this.open, this.constructor.reopenDelay);
            }
            else return this.open();
        };
        Connection.prototype.getProtocol = function getProtocol() {
            if (this.webSocket) return this.webSocket.protocol;
        };
        Connection.prototype.isOpen = function isOpen() {
            return this.isState("open");
        };
        Connection.prototype.isActive = function isActive() {
            return this.isState("open", "connecting");
        };
        Connection.prototype.isProtocolSupported = function isProtocolSupported() {
            return indexOf.call(supportedProtocols, this.getProtocol()) >= 0;
        };
        Connection.prototype.isState = function isState() {
            for(var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++)states[_key] = arguments[_key];
            return indexOf.call(states, this.getState()) >= 0;
        };
        Connection.prototype.getState = function getState() {
            if (this.webSocket) for(var state in adapters.WebSocket){
                if (adapters.WebSocket[state] === this.webSocket.readyState) return state.toLowerCase();
            }
            return null;
        };
        Connection.prototype.installEventHandlers = function installEventHandlers() {
            for(var eventName in this.events){
                var handler = this.events[eventName].bind(this);
                this.webSocket["on" + eventName] = handler;
            }
        };
        Connection.prototype.uninstallEventHandlers = function uninstallEventHandlers() {
            for(var eventName in this.events)this.webSocket["on" + eventName] = function() {};
        };
        return Connection;
    }();
    Connection1.reopenDelay = 500;
    Connection1.prototype.events = {
        message: function message(event) {
            if (!this.isProtocolSupported()) return;
            var _JSON$parse = JSON.parse(event.data), identifier = _JSON$parse.identifier, message = _JSON$parse.message, reason = _JSON$parse.reason, reconnect = _JSON$parse.reconnect, type = _JSON$parse.type;
            switch(type){
                case message_types.welcome:
                    this.monitor.recordConnect();
                    return this.subscriptions.reload();
                case message_types.disconnect:
                    logger.log("Disconnecting. Reason: " + reason);
                    return this.close({
                        allowReconnect: reconnect
                    });
                case message_types.ping:
                    return this.monitor.recordPing();
                case message_types.confirmation:
                    this.subscriptions.confirmSubscription(identifier);
                    return this.subscriptions.notify(identifier, "connected");
                case message_types.rejection:
                    return this.subscriptions.reject(identifier);
                default:
                    return this.subscriptions.notify(identifier, "received", message);
            }
        },
        open: function open() {
            logger.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
                logger.log("Protocol is unsupported. Stopping monitor and disconnecting.");
                return this.close({
                    allowReconnect: false
                });
            }
        },
        close: function close(event) {
            logger.log("WebSocket onclose event");
            if (this.disconnected) return;
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
                willAttemptReconnect: this.monitor.isRunning()
            });
        },
        error: function error() {
            logger.log("WebSocket onerror event");
        }
    };
    var extend = function extend(object, properties) {
        if (properties != null) for(var key in properties){
            var value = properties[key];
            object[key] = value;
        }
        return object;
    };
    var Subscription1 = function() {
        function Subscription(consumer) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var mixin = arguments[2];
            classCallCheck(this, Subscription);
            this.consumer = consumer;
            this.identifier = JSON.stringify(params);
            extend(this, mixin);
        }
        Subscription.prototype.perform = function perform(action) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            data.action = action;
            return this.send(data);
        };
        Subscription.prototype.send = function send(data) {
            return this.consumer.send({
                command: "message",
                identifier: this.identifier,
                data: JSON.stringify(data)
            });
        };
        Subscription.prototype.unsubscribe = function unsubscribe() {
            return this.consumer.subscriptions.remove(this);
        };
        return Subscription;
    }();
    var SubscriptionGuarantor1 = function() {
        function SubscriptionGuarantor(subscriptions) {
            classCallCheck(this, SubscriptionGuarantor);
            this.subscriptions = subscriptions;
            this.pendingSubscriptions = [];
        }
        SubscriptionGuarantor.prototype.guarantee = function guarantee(subscription) {
            if (this.pendingSubscriptions.indexOf(subscription) == -1) {
                logger.log("SubscriptionGuarantor guaranteeing " + subscription.identifier);
                this.pendingSubscriptions.push(subscription);
            } else logger.log("SubscriptionGuarantor already guaranteeing " + subscription.identifier);
            this.startGuaranteeing();
        };
        SubscriptionGuarantor.prototype.forget = function forget(subscription) {
            logger.log("SubscriptionGuarantor forgetting " + subscription.identifier);
            this.pendingSubscriptions = this.pendingSubscriptions.filter(function(s) {
                return s !== subscription;
            });
        };
        SubscriptionGuarantor.prototype.startGuaranteeing = function startGuaranteeing() {
            this.stopGuaranteeing();
            this.retrySubscribing();
        };
        SubscriptionGuarantor.prototype.stopGuaranteeing = function stopGuaranteeing() {
            clearTimeout(this.retryTimeout);
        };
        SubscriptionGuarantor.prototype.retrySubscribing = function retrySubscribing() {
            var _this = this;
            this.retryTimeout = setTimeout(function() {
                if (_this.subscriptions && typeof _this.subscriptions.subscribe === "function") _this.pendingSubscriptions.map(function(subscription) {
                    logger.log("SubscriptionGuarantor resubscribing " + subscription.identifier);
                    _this.subscriptions.subscribe(subscription);
                });
            }, 500);
        };
        return SubscriptionGuarantor;
    }();
    var Subscriptions1 = function() {
        function Subscriptions(consumer) {
            classCallCheck(this, Subscriptions);
            this.consumer = consumer;
            this.guarantor = new SubscriptionGuarantor1(this);
            this.subscriptions = [];
        }
        Subscriptions.prototype.create = function create(channelName, mixin) {
            var channel = channelName;
            var params = (typeof channel === "undefined" ? "undefined" : _typeof(channel)) === "object" ? channel : {
                channel: channel
            };
            var subscription = new Subscription1(this.consumer, params, mixin);
            return this.add(subscription);
        };
        Subscriptions.prototype.add = function add(subscription) {
            this.subscriptions.push(subscription);
            this.consumer.ensureActiveConnection();
            this.notify(subscription, "initialized");
            this.subscribe(subscription);
            return subscription;
        };
        Subscriptions.prototype.remove = function remove(subscription) {
            this.forget(subscription);
            if (!this.findAll(subscription.identifier).length) this.sendCommand(subscription, "unsubscribe");
            return subscription;
        };
        Subscriptions.prototype.reject = function reject(identifier) {
            var _this = this;
            return this.findAll(identifier).map(function(subscription) {
                _this.forget(subscription);
                _this.notify(subscription, "rejected");
                return subscription;
            });
        };
        Subscriptions.prototype.forget = function forget(subscription) {
            this.guarantor.forget(subscription);
            this.subscriptions = this.subscriptions.filter(function(s) {
                return s !== subscription;
            });
            return subscription;
        };
        Subscriptions.prototype.findAll = function findAll(identifier) {
            return this.subscriptions.filter(function(s) {
                return s.identifier === identifier;
            });
        };
        Subscriptions.prototype.reload = function reload() {
            var _this2 = this;
            return this.subscriptions.map(function(subscription) {
                return _this2.subscribe(subscription);
            });
        };
        Subscriptions.prototype.notifyAll = function notifyAll(callbackName) {
            var _this3 = this;
            for(var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
            return this.subscriptions.map(function(subscription) {
                return _this3.notify.apply(_this3, [
                    subscription,
                    callbackName
                ].concat(args));
            });
        };
        Subscriptions.prototype.notify = function notify(subscription1, callbackName) {
            for(var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++)args[_key2 - 2] = arguments[_key2];
            var subscriptions = void 0;
            if (typeof subscription1 === "string") subscriptions = this.findAll(subscription1);
            else subscriptions = [
                subscription1
            ];
            return subscriptions.map(function(subscription) {
                return typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : undefined;
            });
        };
        Subscriptions.prototype.subscribe = function subscribe(subscription) {
            if (this.sendCommand(subscription, "subscribe")) this.guarantor.guarantee(subscription);
        };
        Subscriptions.prototype.confirmSubscription = function confirmSubscription(identifier) {
            var _this4 = this;
            logger.log("Subscription confirmed " + identifier);
            this.findAll(identifier).map(function(subscription) {
                return _this4.guarantor.forget(subscription);
            });
        };
        Subscriptions.prototype.sendCommand = function sendCommand(subscription, command) {
            var identifier = subscription.identifier;
            return this.consumer.send({
                command: command,
                identifier: identifier
            });
        };
        return Subscriptions;
    }();
    var Consumer1 = function() {
        function Consumer(url) {
            classCallCheck(this, Consumer);
            this._url = url;
            this.subscriptions = new Subscriptions1(this);
            this.connection = new Connection1(this);
        }
        Consumer.prototype.send = function send(data) {
            return this.connection.send(data);
        };
        Consumer.prototype.connect = function connect() {
            return this.connection.open();
        };
        Consumer.prototype.disconnect = function disconnect() {
            return this.connection.close({
                allowReconnect: false
            });
        };
        Consumer.prototype.ensureActiveConnection = function ensureActiveConnection() {
            if (!this.connection.isActive()) return this.connection.open();
        };
        createClass(Consumer, [
            {
                key: "url",
                get: function get$$1() {
                    return createWebSocketURL(this._url);
                }
            }
        ]);
        return Consumer;
    }();
    function createWebSocketURL(url) {
        if (typeof url === "function") url = url();
        if (url && !/^wss?:/i.test(url)) {
            var a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
        } else return url;
    }
    function createConsumer() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getConfig("url") || INTERNAL.default_mount_path;
        return new Consumer1(url);
    }
    function getConfig(name) {
        var element = document.head.querySelector("meta[name='action-cable-" + name + "']");
        if (element) return element.getAttribute("content");
    }
    exports.Connection = Connection1;
    exports.ConnectionMonitor = ConnectionMonitor1;
    exports.Consumer = Consumer1;
    exports.INTERNAL = INTERNAL;
    exports.Subscription = Subscription1;
    exports.Subscriptions = Subscriptions1;
    exports.SubscriptionGuarantor = SubscriptionGuarantor1;
    exports.adapters = adapters;
    exports.createWebSocketURL = createWebSocketURL;
    exports.logger = logger;
    exports.createConsumer = createConsumer;
    exports.getConfig = getConfig;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});

},{}],"6mekx":[function(require,module,exports) {
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */ function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    if (null == wait) wait = 100;
    function later() {
        var last = Date.now() - timestamp;
        if (last < wait && last >= 0) timeout = setTimeout(later, wait - last);
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    }
    var debounced = function() {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
    debounced.clear = function() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };
    debounced.flush = function() {
        if (timeout) {
            result = func.apply(context, args);
            context = args = null;
            clearTimeout(timeout);
            timeout = null;
        }
    };
    return debounced;
}
// Adds compatibility for ES modules
debounce.debounce = debounce;
module.exports = debounce;

},{}],"3rv1J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "morph", ()=>morph
);
parcelHelpers.export(exports, "getElementSize", ()=>getElementSize
);
parcelHelpers.export(exports, "isExternalLink", ()=>isExternalLink
);
function morph(from, to) {
    Alpine.morph(from, to, {
        key (el) {
            return el.getAttribute("key") ? el.getAttribute("key") : el.id;
        },
        lookahead: true,
        updating (el, toEl, childrenOnly, skip) {
            if (el.getAttribute && el.getAttribute("data-morph-strategy") === "replace") {
                el.innerHTML = toEl.innerHTML;
                return skip();
            }
        }
    });
}
function getElementSize(el, opts = {}) {
    const style = window.getComputedStyle(el, null);
    return {
        width: opts.includeMargins ? el.offsetWidth + parseInt(style.getPropertyValue("margin-left")) + parseInt(style.getPropertyValue("margin-right")) : el.offsetWidth,
        height: opts.includeMargins ? el.offsetHeight + parseInt(style.getPropertyValue("margin-top")) + parseInt(style.getPropertyValue("margin-bottom")) : el.offsetHeight
    };
}
function isExternalLink(link) {
    if (link.getAttribute("target") === "_blank") return true;
    if (link.href) return link.host !== window.location.host;
    return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"12Op4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fetchHTML", ()=>fetchHTML
);
async function fetchHTML(url, selector) {
    const response = await fetch(url || window.document.location);
    if (response.ok) {
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        return {
            fragment: selector ? doc.querySelector(selector).outerHTML : null,
            title: doc.title,
            doc
        };
    } else throw new Error(`Error fetching HTML from ${url}`);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a7dEL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getComponents", ()=>getComponents
);
function getComponents(importObject, path = []) {
    let components = {};
    Object.keys(importObject).forEach((key)=>{
        if (key === "default") components[toCamel(path.join("_"))] = importObject[key];
        else components = {
            ...components,
            ...getComponents(importObject[key], [
                ...path,
                key
            ])
        };
    });
    return components;
}
function toCamel(s) {
    return s.replace(/([-_][a-z])/gi, ($1)=>{
        return $1.toUpperCase().replace("-", "").replace("_", "");
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dDPTi":[function(require,module,exports) {
const _temp0 = require("../button/component.js");
const _temp1 = require("../code/component.js");
const _temp2 = require("../copy_button/component.js");
const _temp3 = require("../dimensions_display/component.js");
const _temp4 = require("../embed/component.js");
const _temp5 = require("../filter/component.js");
const _temp6 = require("../icon/component.js");
const _temp7 = require("../nav/component.js");
const _temp8 = require("../params_editor/component.js");
const _temp9 = require("../tab_panels/component.js");
const _temp10 = require("../split_layout/component.js");
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
    "params_editor": _temp8,
    "tab_panels": _temp9,
    "split_layout": _temp10,
    "tabs": _temp11,
    "viewport": _temp12
};

},{"../button/component.js":"lQApy","../code/component.js":"2jedY","../copy_button/component.js":"1HiHq","../dimensions_display/component.js":"kFxrd","../embed/component.js":"hM4Uf","../filter/component.js":"c1bw6","../icon/component.js":"2RhL0","../nav/component.js":"bGQJL","../params_editor/component.js":"7oLKc","../tab_panels/component.js":"jPEON","../split_layout/component.js":"dX3DZ","../tabs/component.js":"dvr8m","../viewport/component.js":"6kmWp"}],"lQApy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tippy = require("~/app/assets/lookbook/js/lib/tippy");
var _tippyDefault = parcelHelpers.interopDefault(_tippy);
var _tooltip = require("~/app/assets/lookbook/js/components/tooltip");
function buttonComponent() {
    let tooltip = null;
    let dropdown = null;
    return {
        init () {
            if (this.$refs.tooltip) tooltip = _tooltip.initTooltip(this, {
                target: this.$refs.icon
            });
            if (this.$refs.dropdown) dropdown = _tippyDefault.default(this.$el, {
                content: this.$refs.dropdown.innerHTML,
                trigger: "click",
                theme: "menu",
                triggerTarget: this.$el,
                interactive: true,
                zIndex: 99999,
                onShow: ()=>{
                    if (!this.$store.settings.showTooltips) return false;
                    this.$dispatch("dropdown:show", {
                        dropdown: this
                    });
                },
                onHide: ()=>this.$dispatch("dropdown:hide", {
                        dropdown: this
                    })
            });
        },
        hideDropdown () {
            if (dropdown) dropdown.hide();
        },
        startSpin () {
            this._spinning = true;
        },
        stopSpin (delay = 0) {
            setTimeout(()=>this._spinning = false
            , delay);
        },
        get _tooltip () {
            return tooltip;
        },
        _spinning: false
    };
}
exports.default = buttonComponent;

},{"~/app/assets/lookbook/js/lib/tippy":"6zhil","~/app/assets/lookbook/js/components/tooltip":"hxzH0","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6zhil":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tippyJs = require("tippy.js");
var _tippyJsDefault = parcelHelpers.interopDefault(_tippyJs);
_tippyJsDefault.default.setDefaultProps({
    allowHTML: true,
    theme: "tooltip"
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
    }
    function cleanupInteractiveMouseListeners() {
        getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
        mouseMoveListeners = mouseMoveListeners.filter(function(listener) {
            return listener !== debouncedOnMouseMove;
        });
    }
    function onDocumentPress(event) {
        // Moved finger to scroll instead of an intentional tap outside
        if (currentInput.isTouch) {
            if (didTouchMove || event.type === 'mousedown') {
                return;
            }
        }
        var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper
        if (instance1.props.interactive && actualContains(popper1, actualTarget)) {
            return;
        } // Clicked on the event listeners target
        if (normalizeToArray(instance1.props.triggerTarget || reference).some(function(el) {
            return actualContains(el, actualTarget);
        })) {
            if (currentInput.isTouch) {
                return;
            }
            if (instance1.state.isVisible && instance1.props.trigger.indexOf('click') >= 0) {
                return;
            }
        } else {
            invokeHook('onClickOutside', [
                instance1,
                event
            ]);
        }
        if (instance1.props.hideOnClick === true) {
            instance1.clearDelayTimeouts();
            instance1.hide(); // `mousedown` event is fired right before `focus` if pressing the
            // currentTarget. This lets a tippy with `focus` trigger know that it
            // should not show
            didHideDueToDocumentMouseDown = true;
            setTimeout(function() {
                didHideDueToDocumentMouseDown = false;
            }); // The listener gets added in `scheduleShow()`, but this may be hiding it
            // before it shows, and hide()'s early bail-out behavior can prevent it
            // from being cleaned up
            if (!instance1.state.isMounted) {
                removeDocumentPress();
            }
        }
    }
    function onTouchMove() {
        didTouchMove = true;
    }
    function onTouchStart() {
        didTouchMove = false;
    }
    function addDocumentPress() {
        var doc = getDocument();
        doc.addEventListener('mousedown', onDocumentPress, true);
        doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
        doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
        doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
    }
    function removeDocumentPress() {
        var doc = getDocument();
        doc.removeEventListener('mousedown', onDocumentPress, true);
        doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
        doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
        doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
    }
    function onTransitionedOut(duration, callback) {
        onTransitionEnd(duration, function() {
            if (!instance1.state.isVisible && popper1.parentNode && popper1.parentNode.contains(popper1)) {
                callback();
            }
        });
    }
    function onTransitionedIn(duration, callback) {
        onTransitionEnd(duration, callback);
    }
    function onTransitionEnd(duration, callback) {
        var box = getDefaultTemplateChildren().box;
        function listener(event) {
            if (event.target === box) {
                updateTransitionEndListener(box, 'remove', listener);
                callback();
            }
        } // Make callback synchronous if duration is 0
        // `transitionend` won't fire otherwise
        if (duration === 0) {
            return callback();
        }
        updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
        updateTransitionEndListener(box, 'add', listener);
        currentTransitionEndListener = listener;
    }
    function on(eventType, handler, options) {
        if (options === void 0) {
            options = false;
        }
        var nodes = normalizeToArray(instance1.props.triggerTarget || reference);
        nodes.forEach(function(node) {
            node.addEventListener(eventType, handler, options);
            listeners.push({
                node: node,
                eventType: eventType,
                handler: handler,
                options: options
            });
        });
    }
    function addListeners() {
        if (getIsCustomTouchBehavior()) {
            on('touchstart', onTrigger, {
                passive: true
            });
            on('touchend', onMouseLeave, {
                passive: true
            });
        }
        splitBySpaces(instance1.props.trigger).forEach(function(eventType) {
            if (eventType === 'manual') {
                return;
            }
            on(eventType, onTrigger);
            switch(eventType){
                case 'mouseenter':
                    on('mouseleave', onMouseLeave);
                    break;
                case 'focus':
                    on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
                    break;
                case 'focusin':
                    on('focusout', onBlurOrFocusOut);
                    break;
            }
        });
    }
    function removeListeners() {
        listeners.forEach(function(_ref) {
            var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
            node.removeEventListener(eventType, handler, options);
        });
        listeners = [];
    }
    function onTrigger(event) {
        var _lastTriggerEvent;
        var shouldScheduleClickHide = false;
        if (!instance1.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
            return;
        }
        var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
        lastTriggerEvent = event;
        currentTarget = event.currentTarget;
        handleAriaExpandedAttribute();
        if (!instance1.state.isVisible && isMouseEvent(event)) {
            // If scrolling, `mouseenter` events can be fired if the cursor lands
            // over a new target, but `mousemove` events don't get fired. This
            // causes interactive tooltips to get stuck open until the cursor is
            // moved
            mouseMoveListeners.forEach(function(listener) {
                return listener(event);
            });
        } // Toggle show/hide when clicking click-triggered tooltips
        if (event.type === 'click' && (instance1.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance1.props.hideOnClick !== false && instance1.state.isVisible) {
            shouldScheduleClickHide = true;
        } else {
            scheduleShow(event);
        }
        if (event.type === 'click') {
            isVisibleFromClick = !shouldScheduleClickHide;
        }
        if (shouldScheduleClickHide && !wasFocused) {
            scheduleHide(event);
        }
    }
    function onMouseMove(event) {
        var target = event.target;
        var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper1.contains(target);
        if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
            return;
        }
        var popperTreeData = getNestedPopperTree().concat(popper1).map(function(popper) {
            var _instance$popperInsta;
            var instance = popper._tippy;
            var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;
            if (state) {
                return {
                    popperRect: popper.getBoundingClientRect(),
                    popperState: state,
                    props: props
                };
            }
            return null;
        }).filter(Boolean);
        if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
            cleanupInteractiveMouseListeners();
            scheduleHide(event);
        }
    }
    function onMouseLeave(event) {
        var shouldBail = isEventListenerStopped(event) || instance1.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;
        if (shouldBail) {
            return;
        }
        if (instance1.props.interactive) {
            instance1.hideWithInteractivity(event);
            return;
        }
        scheduleHide(event);
    }
    function onBlurOrFocusOut(event) {
        if (instance1.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
            return;
        } // If focus was moved to within the popper
        if (instance1.props.interactive && event.relatedTarget && popper1.contains(event.relatedTarget)) {
            return;
        }
        scheduleHide(event);
    }
    function isEventListenerStopped(event) {
        return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
    }
    function createPopperInstance() {
        destroyPopperInstance();
        var _instance$props2 = instance1.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
        var arrow = getIsDefaultRenderFn() ? getChildren(popper1).arrow : null;
        var computedReference = getReferenceClientRect ? {
            getBoundingClientRect: getReferenceClientRect,
            contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
        } : reference;
        var tippyModifier = {
            name: '$$tippy',
            enabled: true,
            phase: 'beforeWrite',
            requires: [
                'computeStyles'
            ],
            fn: function fn(_ref2) {
                var state = _ref2.state;
                if (getIsDefaultRenderFn()) {
                    var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
                    [
                        'placement',
                        'reference-hidden',
                        'escaped'
                    ].forEach(function(attr) {
                        if (attr === 'placement') {
                            box.setAttribute('data-placement', state.placement);
                        } else {
                            if (state.attributes.popper["data-popper-" + attr]) {
                                box.setAttribute("data-" + attr, '');
                            } else {
                                box.removeAttribute("data-" + attr);
                            }
                        }
                    });
                    state.attributes.popper = {};
                }
            }
        };
        var modifiers = [
            {
                name: 'offset',
                options: {
                    offset: offset
                }
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: {
                        top: 2,
                        bottom: 2,
                        left: 5,
                        right: 5
                    }
                }
            },
            {
                name: 'flip',
                options: {
                    padding: 5
                }
            },
            {
                name: 'computeStyles',
                options: {
                    adaptive: !moveTransition
                }
            },
            tippyModifier
        ];
        if (getIsDefaultRenderFn() && arrow) {
            modifiers.push({
                name: 'arrow',
                options: {
                    element: arrow,
                    padding: 3
                }
            });
        }
        modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
        instance1.popperInstance = _core.createPopper(computedReference, popper1, Object.assign({}, popperOptions, {
            placement: placement,
            onFirstUpdate: onFirstUpdate,
            modifiers: modifiers
        }));
    }
    function destroyPopperInstance() {
        if (instance1.popperInstance) {
            instance1.popperInstance.destroy();
            instance1.popperInstance = null;
        }
    }
    function mount() {
        var appendTo = instance1.props.appendTo;
        var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
        // it's directly after the reference element so the elements inside the
        // tippy can be tabbed to
        // If there are clipping issues, the user can specify a different appendTo
        // and ensure focus management is handled correctly manually
        var node = getCurrentTarget();
        if (instance1.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
            parentNode = node.parentNode;
        } else {
            parentNode = invokeWithArgsOrReturn(appendTo, [
                node
            ]);
        } // The popper element needs to exist on the DOM before its position can be
        // updated as Popper needs to read its dimensions
        if (!parentNode.contains(popper1)) {
            parentNode.appendChild(popper1);
        }
        instance1.state.isMounted = true;
        createPopperInstance();
        /* istanbul ignore else */ if (true) {
            // Accessibility check
            warnWhen(instance1.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper1, [
                'Interactive tippy element may not be accessible via keyboard',
                'navigation because it is not directly after the reference element',
                'in the DOM source order.',
                '\n\n',
                'Using a wrapper <div> or <span> tag around the reference element',
                'solves this by creating a new parentNode context.',
                '\n\n',
                'Specifying `appendTo: document.body` silences this warning, but it',
                'assumes you are using a focus management solution to handle',
                'keyboard navigation.',
                '\n\n',
                'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'
            ].join(' '));
        }
    }
    function getNestedPopperTree() {
        return arrayFrom(popper1.querySelectorAll('[data-tippy-root]'));
    }
    function scheduleShow(event) {
        instance1.clearDelayTimeouts();
        if (event) {
            invokeHook('onTrigger', [
                instance1,
                event
            ]);
        }
        addDocumentPress();
        var delay = getDelay(true);
        var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
        if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
            delay = touchDelay;
        }
        if (delay) {
            showTimeout = setTimeout(function() {
                instance1.show();
            }, delay);
        } else {
            instance1.show();
        }
    }
    function scheduleHide(event) {
        instance1.clearDelayTimeouts();
        invokeHook('onUntrigger', [
            instance1,
            event
        ]);
        if (!instance1.state.isVisible) {
            removeDocumentPress();
            return;
        } // For interactive tippies, scheduleHide is added to a document.body handler
        // from onMouseLeave so must intercept scheduled hides from mousemove/leave
        // events when trigger contains mouseenter and click, and the tip is
        // currently shown as a result of a click.
        if (instance1.props.trigger.indexOf('mouseenter') >= 0 && instance1.props.trigger.indexOf('click') >= 0 && [
            'mouseleave',
            'mousemove'
        ].indexOf(event.type) >= 0 && isVisibleFromClick) {
            return;
        }
        var delay = getDelay(false);
        if (delay) {
            hideTimeout = setTimeout(function() {
                if (instance1.state.isVisible) {
                    instance1.hide();
                }
            }, delay);
        } else {
            // Fixes a `transitionend` problem when it fires 1 frame too
            // late sometimes, we don't want hide() to be called.
            scheduleHideAnimationFrame = requestAnimationFrame(function() {
                instance1.hide();
            });
        }
    } // ===========================================================================
    // 🔑 Public methods
    // ===========================================================================
    function enable() {
        instance1.state.isEnabled = true;
    }
    function disable() {
        // Disabling the instance should also hide it
        // https://github.com/atomiks/tippy.js-react/issues/106
        instance1.hide();
        instance1.state.isEnabled = false;
    }
    function clearDelayTimeouts() {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
        cancelAnimationFrame(scheduleHideAnimationFrame);
    }
    function setProps(partialProps) {
        /* istanbul ignore else */ if (true) {
            warnWhen(instance1.state.isDestroyed, createMemoryLeakWarning('setProps'));
        }
        if (instance1.state.isDestroyed) {
            return;
        }
        invokeHook('onBeforeUpdate', [
            instance1,
            partialProps
        ]);
        removeListeners();
        var prevProps = instance1.props;
        var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
            ignoreAttributes: true
        }));
        instance1.props = nextProps;
        addListeners();
        if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
            cleanupInteractiveMouseListeners();
            debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
        } // Ensure stale aria-expanded attributes are removed
        if (prevProps.triggerTarget && !nextProps.triggerTarget) {
            normalizeToArray(prevProps.triggerTarget).forEach(function(node) {
                node.removeAttribute('aria-expanded');
            });
        } else if (nextProps.triggerTarget) {
            reference.removeAttribute('aria-expanded');
        }
        handleAriaExpandedAttribute();
        handleStyles();
        if (onUpdate) {
            onUpdate(prevProps, nextProps);
        }
        if (instance1.popperInstance) {
            createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
            // and the nested ones get re-rendered first.
            // https://github.com/atomiks/tippyjs-react/issues/177
            // TODO: find a cleaner / more efficient solution(!)
            getNestedPopperTree().forEach(function(nestedPopper) {
                // React (and other UI libs likely) requires a rAF wrapper as it flushes
                // its work in one
                requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
            });
        }
        invokeHook('onAfterUpdate', [
            instance1,
            partialProps
        ]);
    }
    function setContent1(content) {
        instance1.setProps({
            content: content
        });
    }
    function show() {
        /* istanbul ignore else */ if (true) {
            warnWhen(instance1.state.isDestroyed, createMemoryLeakWarning('show'));
        } // Early bail-out
        var isAlreadyVisible = instance1.state.isVisible;
        var isDestroyed = instance1.state.isDestroyed;
        var isDisabled = !instance1.state.isEnabled;
        var isTouchAndTouchDisabled = currentInput.isTouch && !instance1.props.touch;
        var duration = getValueAtIndexOrReturn(instance1.props.duration, 0, defaultProps.duration);
        if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
            return;
        } // Normalize `disabled` behavior across browsers.
        // Firefox allows events on disabled elements, but Chrome doesn't.
        // Using a wrapper element (i.e. <span>) is recommended.
        if (getCurrentTarget().hasAttribute('disabled')) {
            return;
        }
        invokeHook('onShow', [
            instance1
        ], false);
        if (instance1.props.onShow(instance1) === false) {
            return;
        }
        instance1.state.isVisible = true;
        if (getIsDefaultRenderFn()) {
            popper1.style.visibility = 'visible';
        }
        handleStyles();
        addDocumentPress();
        if (!instance1.state.isMounted) {
            popper1.style.transition = 'none';
        } // If flipping to the opposite side after hiding at least once, the
        // animation will use the wrong placement without resetting the duration
        if (getIsDefaultRenderFn()) {
            var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content = _getDefaultTemplateCh2.content;
            setTransitionDuration([
                box,
                content
            ], 0);
        }
        onFirstUpdate = function onFirstUpdate() {
            var _instance$popperInsta2;
            if (!instance1.state.isVisible || ignoreOnFirstUpdate) {
                return;
            }
            ignoreOnFirstUpdate = true; // reflow
            void popper1.offsetHeight;
            popper1.style.transition = instance1.props.moveTransition;
            if (getIsDefaultRenderFn() && instance1.props.animation) {
                var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
                setTransitionDuration([
                    _box,
                    _content
                ], duration);
                setVisibilityState([
                    _box,
                    _content
                ], 'visible');
            }
            handleAriaContentAttribute();
            handleAriaExpandedAttribute();
            pushIfUnique(mountedInstances, instance1); // certain modifiers (e.g. `maxSize`) require a second update after the
            // popper has been positioned for the first time
            (_instance$popperInsta2 = instance1.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
            invokeHook('onMount', [
                instance1
            ]);
            if (instance1.props.animation && getIsDefaultRenderFn()) {
                onTransitionedIn(duration, function() {
                    instance1.state.isShown = true;
                    invokeHook('onShown', [
                        instance1
                    ]);
                });
            }
        };
        mount();
    }
    function hide() {
        /* istanbul ignore else */ if (true) {
            warnWhen(instance1.state.isDestroyed, createMemoryLeakWarning('hide'));
        } // Early bail-out
        var isAlreadyHidden = !instance1.state.isVisible;
        var isDestroyed = instance1.state.isDestroyed;
        var isDisabled = !instance1.state.isEnabled;
        var duration = getValueAtIndexOrReturn(instance1.props.duration, 1, defaultProps.duration);
        if (isAlreadyHidden || isDestroyed || isDisabled) {
            return;
        }
        invokeHook('onHide', [
            instance1
        ], false);
        if (instance1.props.onHide(instance1) === false) {
            return;
        }
        instance1.state.isVisible = false;
        instance1.state.isShown = false;
        ignoreOnFirstUpdate = false;
        isVisibleFromClick = false;
        if (getIsDefaultRenderFn()) {
            popper1.style.visibility = 'hidden';
        }
        cleanupInteractiveMouseListeners();
        removeDocumentPress();
        handleStyles(true);
        if (getIsDefaultRenderFn()) {
            var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content = _getDefaultTemplateCh4.content;
            if (instance1.props.animation) {
                setTransitionDuration([
                    box,
                    content
                ], duration);
                setVisibilityState([
                    box,
                    content
                ], 'hidden');
            }
        }
        handleAriaContentAttribute();
        handleAriaExpandedAttribute();
        if (instance1.props.animation) {
            if (getIsDefaultRenderFn()) {
                onTransitionedOut(duration, instance1.unmount);
            }
        } else {
            instance1.unmount();
        }
    }
    function hideWithInteractivity(event) {
        /* istanbul ignore else */ if (true) {
            warnWhen(instance1.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
        }
        getDocument().addEventListener('mousemove', debouncedOnMouseMove);
        pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
        debouncedOnMouseMove(event);
    }
    function unmount() {
        /* istanbul ignore else */ if (true) {
            warnWhen(instance1.state.isDestroyed, createMemoryLeakWarning('unmount'));
        }
        if (instance1.state.isVisible) {
            instance1.hide();
        }
        if (!instance1.state.isMounted) {
            return;
        }
        destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
        // tree by default. This seems mainly for interactive tippies, but we should
        // find a workaround if possible
        getNestedPopperTree().forEach(function(nestedPopper) {
            nestedPopper._tippy.unmount();
        });
        if (popper1.parentNode) {
            popper1.parentNode.removeChild(popper1);
        }
        mountedInstances = mountedInstances.filter(function(i) {
            return i !== instance1;
        });
        instance1.state.isMounted = false;
        invokeHook('onHidden', [
            instance1
        ]);
    }
    function destroy() {
        /* istanbul ignore else */ if (true) {
            warnWhen(instance1.state.isDestroyed, createMemoryLeakWarning('destroy'));
        }
        if (instance1.state.isDestroyed) {
            return;
        }
        instance1.clearDelayTimeouts();
        instance1.unmount();
        removeListeners();
        delete reference._tippy;
        instance1.state.isDestroyed = true;
        invokeHook('onDestroy', [
            instance1
        ]);
    }
}
function tippy(targets, optionalProps) {
    if (optionalProps === void 0) optionalProps = {};
    var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
    validateTargets(targets);
    validateProps(optionalProps, plugins);
    bindGlobalEventListeners();
    var passedProps = Object.assign({}, optionalProps, {
        plugins: plugins
    });
    var elements = getArrayOfElements(targets);
    var isSingleContentElement = isElement(passedProps.content);
    var isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, [
        'tippy() was passed an Element as the `content` prop, but more than',
        'one tippy instance was created by this invocation. This means the',
        'content element will only be appended to the last tippy instance.',
        '\n\n',
        'Instead, pass the .innerHTML of the element, or use a function that',
        'returns a cloned version of the element instead.',
        '\n\n',
        '1) content: element.innerHTML\n',
        '2) content: () => element.cloneNode(true)'
    ].join(' '));
    var instances = elements.reduce(function(acc, reference) {
        var instance = reference && createTippy(reference, passedProps);
        if (instance) acc.push(instance);
        return acc;
    }, []);
    return isElement(targets) ? instances[0] : instances;
}
tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;
var hideAll = function hideAll(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, excludedReferenceOrInstance = _ref.exclude, duration = _ref.duration;
    mountedInstances.forEach(function(instance) {
        var isExcluded = false;
        if (excludedReferenceOrInstance) isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
        if (!isExcluded) {
            var originalDuration = instance.props.duration;
            instance.setProps({
                duration: duration
            });
            instance.hide();
            if (!instance.state.isDestroyed) instance.setProps({
                duration: originalDuration
            });
        }
    });
};
// every time the popper is destroyed (i.e. a new target), removing the styles
// and causing transitions to break for singletons when the console is open, but
// most notably for non-transform styles being used, `gpuAcceleration: false`.
var applyStylesModifier = Object.assign({}, _core.applyStyles, {
    effect: function effect(_ref) {
        var state = _ref.state;
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
         // intentionally return no cleanup function
    // return () => { ... }
    }
});
var createSingleton = function createSingleton(tippyInstances, optionalProps) {
    var _optionalProps$popper;
    if (optionalProps === void 0) optionalProps = {};
    errorWhen(!Array.isArray(tippyInstances), [
        'The first argument passed to createSingleton() must be an array of',
        'tippy instances. The passed value was',
        String(tippyInstances)
    ].join(' '));
    var individualInstances = tippyInstances;
    var references = [];
    var triggerTargets = [];
    var currentTarget;
    var overrides = optionalProps.overrides;
    var interceptSetPropsCleanups = [];
    var shownOnCreate = false;
    function setTriggerTargets() {
        triggerTargets = individualInstances.map(function(instance) {
            return normalizeToArray(instance.props.triggerTarget || instance.reference);
        }).reduce(function(acc, item) {
            return acc.concat(item);
        }, []);
    }
    function setReferences() {
        references = individualInstances.map(function(instance) {
            return instance.reference;
        });
    }
    function enableInstances(isEnabled) {
        individualInstances.forEach(function(instance) {
            if (isEnabled) instance.enable();
            else instance.disable();
        });
    }
    function interceptSetProps(singleton) {
        return individualInstances.map(function(instance) {
            var originalSetProps = instance.setProps;
            instance.setProps = function(props) {
                originalSetProps(props);
                if (instance.reference === currentTarget) singleton.setProps(props);
            };
            return function() {
                instance.setProps = originalSetProps;
            };
        });
    } // have to pass singleton, as it maybe undefined on first call
    function prepareInstance(singleton, target) {
        var index = triggerTargets.indexOf(target); // bail-out
        if (target === currentTarget) return;
        currentTarget = target;
        var overrideProps = (overrides || []).concat('content').reduce(function(acc, prop) {
            acc[prop] = individualInstances[index].props[prop];
            return acc;
        }, {});
        singleton.setProps(Object.assign({}, overrideProps, {
            getReferenceClientRect: typeof overrideProps.getReferenceClientRect === 'function' ? overrideProps.getReferenceClientRect : function() {
                var _references$index;
                return (_references$index = references[index]) == null ? void 0 : _references$index.getBoundingClientRect();
            }
        }));
    }
    enableInstances(false);
    setReferences();
    setTriggerTargets();
    var plugin = {
        fn: function fn() {
            return {
                onDestroy: function onDestroy() {
                    enableInstances(true);
                },
                onHidden: function onHidden() {
                    currentTarget = null;
                },
                onClickOutside: function onClickOutside(instance) {
                    if (instance.props.showOnCreate && !shownOnCreate) {
                        shownOnCreate = true;
                        currentTarget = null;
                    }
                },
                onShow: function onShow(instance) {
                    if (instance.props.showOnCreate && !shownOnCreate) {
                        shownOnCreate = true;
                        prepareInstance(instance, references[0]);
                    }
                },
                onTrigger: function onTrigger(instance, event) {
                    prepareInstance(instance, event.currentTarget);
                }
            };
        }
    };
    var singleton1 = tippy(div(), Object.assign({}, removeProperties(optionalProps, [
        'overrides'
    ]), {
        plugins: [
            plugin
        ].concat(optionalProps.plugins || []),
        triggerTarget: triggerTargets,
        popperOptions: Object.assign({}, optionalProps.popperOptions, {
            modifiers: [].concat(((_optionalProps$popper = optionalProps.popperOptions) == null ? void 0 : _optionalProps$popper.modifiers) || [], [
                applyStylesModifier
            ])
        })
    }));
    var originalShow = singleton1.show;
    singleton1.show = function(target) {
        originalShow(); // first time, showOnCreate or programmatic call with no params
        // default to showing first instance
        if (!currentTarget && target == null) return prepareInstance(singleton1, references[0]);
         // triggered from event (do nothing as prepareInstance already called by onTrigger)
        // programmatic call with no params when already visible (do nothing again)
        if (currentTarget && target == null) return;
         // target is index of instance
        if (typeof target === 'number') return references[target] && prepareInstance(singleton1, references[target]);
         // target is a child tippy instance
        if (individualInstances.indexOf(target) >= 0) {
            var ref = target.reference;
            return prepareInstance(singleton1, ref);
        } // target is a ReferenceElement
        if (references.indexOf(target) >= 0) return prepareInstance(singleton1, target);
    };
    singleton1.showNext = function() {
        var first = references[0];
        if (!currentTarget) return singleton1.show(0);
        var index = references.indexOf(currentTarget);
        singleton1.show(references[index + 1] || first);
    };
    singleton1.showPrevious = function() {
        var last = references[references.length - 1];
        if (!currentTarget) return singleton1.show(last);
        var index = references.indexOf(currentTarget);
        var target = references[index - 1] || last;
        singleton1.show(target);
    };
    var originalSetProps1 = singleton1.setProps;
    singleton1.setProps = function(props) {
        overrides = props.overrides || overrides;
        originalSetProps1(props);
    };
    singleton1.setInstances = function(nextInstances) {
        enableInstances(true);
        interceptSetPropsCleanups.forEach(function(fn) {
            return fn();
        });
        individualInstances = nextInstances;
        enableInstances(false);
        setReferences();
        setTriggerTargets();
        interceptSetPropsCleanups = interceptSetProps(singleton1);
        singleton1.setProps({
            triggerTarget: triggerTargets
        });
    };
    interceptSetPropsCleanups = interceptSetProps(singleton1);
    return singleton1;
};
var BUBBLING_EVENTS_MAP = {
    mouseover: 'mouseenter',
    focusin: 'focus',
    click: 'click'
};
/**
 * Creates a delegate instance that controls the creation of tippy instances
 * for child elements (`target` CSS selector).
 */ function delegate(targets, props) {
    errorWhen(!(props && props.target), [
        'You must specity a `target` prop indicating a CSS selector string matching',
        'the target elements that should receive a tippy.'
    ].join(' '));
    var listeners = [];
    var childTippyInstances = [];
    var disabled = false;
    var target = props.target;
    var nativeProps = removeProperties(props, [
        'target'
    ]);
    var parentProps = Object.assign({}, nativeProps, {
        trigger: 'manual',
        touch: false
    });
    var childProps = Object.assign({
        touch: defaultProps.touch
    }, nativeProps, {
        showOnCreate: true
    });
    var returnValue = tippy(targets, parentProps);
    var normalizedReturnValue = normalizeToArray(returnValue);
    function onTrigger(event) {
        if (!event.target || disabled) return;
        var targetNode = event.target.closest(target);
        if (!targetNode) return;
         // Get relevant trigger with fallbacks:
        // 1. Check `data-tippy-trigger` attribute on target node
        // 2. Fallback to `trigger` passed to `delegate()`
        // 3. Fallback to `defaultProps.trigger`
        var trigger = targetNode.getAttribute('data-tippy-trigger') || props.trigger || defaultProps.trigger; // @ts-ignore
        if (targetNode._tippy) return;
        if (event.type === 'touchstart' && typeof childProps.touch === 'boolean') return;
        if (event.type !== 'touchstart' && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) return;
        var instance = tippy(targetNode, childProps);
        if (instance) childTippyInstances = childTippyInstances.concat(instance);
    }
    function on(node, eventType, handler, options) {
        if (options === void 0) options = false;
        node.addEventListener(eventType, handler, options);
        listeners.push({
            node: node,
            eventType: eventType,
            handler: handler,
            options: options
        });
    }
    function addEventListeners(instance) {
        var reference = instance.reference;
        on(reference, 'touchstart', onTrigger, TOUCH_OPTIONS);
        on(reference, 'mouseover', onTrigger);
        on(reference, 'focusin', onTrigger);
        on(reference, 'click', onTrigger);
    }
    function removeEventListeners() {
        listeners.forEach(function(_ref) {
            var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
            node.removeEventListener(eventType, handler, options);
        });
        listeners = [];
    }
    function applyMutations(instance2) {
        var originalDestroy = instance2.destroy;
        var originalEnable = instance2.enable;
        var originalDisable = instance2.disable;
        instance2.destroy = function(shouldDestroyChildInstances) {
            if (shouldDestroyChildInstances === void 0) shouldDestroyChildInstances = true;
            if (shouldDestroyChildInstances) childTippyInstances.forEach(function(instance) {
                instance.destroy();
            });
            childTippyInstances = [];
            removeEventListeners();
            originalDestroy();
        };
        instance2.enable = function() {
            originalEnable();
            childTippyInstances.forEach(function(instance) {
                return instance.enable();
            });
            disabled = false;
        };
        instance2.disable = function() {
            originalDisable();
            childTippyInstances.forEach(function(instance) {
                return instance.disable();
            });
            disabled = true;
        };
        addEventListeners(instance2);
    }
    normalizedReturnValue.forEach(applyMutations);
    return returnValue;
}
var animateFill = {
    name: 'animateFill',
    defaultValue: false,
    fn: function fn(instance) {
        var _instance$props$rende;
        // @ts-ignore
        if (!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy)) {
            errorWhen(instance.props.animateFill, 'The `animateFill` plugin requires the default render function.');
            return {};
        }
        var _getChildren = getChildren(instance.popper), box = _getChildren.box, content = _getChildren.content;
        var backdrop = instance.props.animateFill ? createBackdropElement() : null;
        return {
            onCreate: function onCreate() {
                if (backdrop) {
                    box.insertBefore(backdrop, box.firstElementChild);
                    box.setAttribute('data-animatefill', '');
                    box.style.overflow = 'hidden';
                    instance.setProps({
                        arrow: false,
                        animation: 'shift-away'
                    });
                }
            },
            onMount: function onMount() {
                if (backdrop) {
                    var transitionDuration = box.style.transitionDuration;
                    var duration = Number(transitionDuration.replace('ms', '')); // The content should fade in after the backdrop has mostly filled the
                    // tooltip element. `clip-path` is the other alternative but is not
                    // well-supported and is buggy on some devices.
                    content.style.transitionDelay = Math.round(duration / 10) + "ms";
                    backdrop.style.transitionDuration = transitionDuration;
                    setVisibilityState([
                        backdrop
                    ], 'visible');
                }
            },
            onShow: function onShow() {
                if (backdrop) backdrop.style.transitionDuration = '0ms';
            },
            onHide: function onHide() {
                if (backdrop) setVisibilityState([
                    backdrop
                ], 'hidden');
            }
        };
    }
};
function createBackdropElement() {
    var backdrop = div();
    backdrop.className = BACKDROP_CLASS;
    setVisibilityState([
        backdrop
    ], 'hidden');
    return backdrop;
}
var mouseCoords = {
    clientX: 0,
    clientY: 0
};
var activeInstances = [];
function storeMouseCoords(_ref) {
    var clientX = _ref.clientX, clientY = _ref.clientY;
    mouseCoords = {
        clientX: clientX,
        clientY: clientY
    };
}
function addMouseCoordsListener(doc) {
    doc.addEventListener('mousemove', storeMouseCoords);
}
function removeMouseCoordsListener(doc) {
    doc.removeEventListener('mousemove', storeMouseCoords);
}
var followCursor = {
    name: 'followCursor',
    defaultValue: false,
    fn: function fn(instance) {
        var reference = instance.reference;
        var doc = getOwnerDocument(instance.props.triggerTarget || reference);
        var isInternalUpdate = false;
        var wasFocusEvent = false;
        var isUnmounted = true;
        var prevProps = instance.props;
        function getIsInitialBehavior() {
            return instance.props.followCursor === 'initial' && instance.state.isVisible;
        }
        function addListener() {
            doc.addEventListener('mousemove', onMouseMove);
        }
        function removeListener() {
            doc.removeEventListener('mousemove', onMouseMove);
        }
        function unsetGetReferenceClientRect() {
            isInternalUpdate = true;
            instance.setProps({
                getReferenceClientRect: null
            });
            isInternalUpdate = false;
        }
        function onMouseMove(event) {
            // If the instance is interactive, avoid updating the position unless it's
            // over the reference element
            var isCursorOverReference = event.target ? reference.contains(event.target) : true;
            var followCursor1 = instance.props.followCursor;
            var clientX = event.clientX, clientY = event.clientY;
            var rect1 = reference.getBoundingClientRect();
            var relativeX = clientX - rect1.left;
            var relativeY = clientY - rect1.top;
            if (isCursorOverReference || !instance.props.interactive) instance.setProps({
                // @ts-ignore - unneeded DOMRect properties
                getReferenceClientRect: function getReferenceClientRect() {
                    var rect = reference.getBoundingClientRect();
                    var x = clientX;
                    var y = clientY;
                    if (followCursor1 === 'initial') {
                        x = rect.left + relativeX;
                        y = rect.top + relativeY;
                    }
                    var top = followCursor1 === 'horizontal' ? rect.top : y;
                    var right = followCursor1 === 'vertical' ? rect.right : x;
                    var bottom = followCursor1 === 'horizontal' ? rect.bottom : y;
                    var left = followCursor1 === 'vertical' ? rect.left : x;
                    return {
                        width: right - left,
                        height: bottom - top,
                        top: top,
                        right: right,
                        bottom: bottom,
                        left: left
                    };
                }
            });
        }
        function create() {
            if (instance.props.followCursor) {
                activeInstances.push({
                    instance: instance,
                    doc: doc
                });
                addMouseCoordsListener(doc);
            }
        }
        function destroy() {
            activeInstances = activeInstances.filter(function(data) {
                return data.instance !== instance;
            });
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

},{"./createPopper.js":"cHuNp","./modifiers/eventListeners.js":"hBKsL","./modifiers/popperOffsets.js":"6I679","./modifiers/computeStyles.js":"gDlm2","./modifiers/applyStyles.js":"4iMn4","./modifiers/offset.js":"3GKVY","./modifiers/flip.js":"fv5wq","./modifiers/preventOverflow.js":"1AMhb","./modifiers/arrow.js":"31HFW","./modifiers/hide.js":"2g4OF","./popper-lite.js":false,"./modifiers/index.js":"cap3W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hxzH0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initTooltip", ()=>initTooltip
);
var _tippy = require("../lib/tippy");
var _tippyDefault = parcelHelpers.interopDefault(_tippy);
function tooltipCreator({ target  }) {
    const content = this.$el.dataset.tooltipText || (this.$refs.tooltip ? this.$refs.tooltip.innerHTML : null);
    if (content) return _tippyDefault.default(target || this.$refs.tooltipTarget || this.$el, {
        delay: [
            200,
            0
        ],
        content,
        theme: "tooltip",
        triggerTarget: this.$el,
        onShow: ()=>this.$store.settings.showTooltips
    });
}
function initTooltip(context, opts) {
    return tooltipCreator.bind(context)(opts || {});
}
function tooltipComponent() {
    return {
        init () {
            initTooltip(this);
        }
    };
}
exports.default = tooltipComponent;

},{"../lib/tippy":"6zhil","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2jedY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function codeComponent() {
    return {};
}
exports.default = codeComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1HiHq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _clipboard = require("~/app/assets/lookbook/js/components/clipboard");
var _component = require("@components/button/component");
var _componentDefault = parcelHelpers.interopDefault(_component);
function copyButtonComponent() {
    const button = _componentDefault.default();
    return {
        ...button,
        copied: false,
        init () {
            button.init.bind(this)();
            _clipboard.initClipboard(this);
        }
    };
}
exports.default = copyButtonComponent;

},{"~/app/assets/lookbook/js/components/clipboard":"g7gXy","@components/button/component":"lQApy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g7gXy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initClipboard", ()=>initClipboard
);
var _string = require("../helpers/string");
function initClipboard(context = {}) {
    let copyTimeout = null;
    return Object.assign(context, {
        copied: false,
        async copyToClipboard (target = null) {
            let targetEl;
            if (this.$refs.copyTarget) targetEl = this.$refs.copyTarget;
            else if (typeof target === "string") targetEl = document.querySelector(target);
            if (!targetEl) {
                this.warn("Could not find copy target");
                return false;
            }
            const content = _string.decodeEntities(targetEl.innerText.trim());
            await window.navigator.clipboard.writeText(content);
            this.copied = true;
            if (copyTimeout) clearTimeout(copyTimeout);
            copyTimeout = setTimeout(()=>{
                this.copied = false;
                this.onCopyComplete();
            }, 1000);
            return content;
        },
        onCopyComplete () {}
    });
}
function clipboardComponent() {
    return initClipboard({});
}
exports.default = clipboardComponent;

},{"../helpers/string":"iYagP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kFxrd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _layout = require("@helpers/layout");
function dimensionsDisplayComponent(targetSelector) {
    return {
        width: 0,
        height: 0,
        resizing: false,
        target: null,
        init () {
            this.target = document.querySelector(targetSelector);
            if (this.target) {
                this.width = Math.round(this.target.clientWidth);
                this.height = Math.round(this.target.clientHeight);
                this.createObserver();
            }
        },
        createObserver () {
            if (this.target) this.observer = _layout.observeSize(document.querySelector(targetSelector), ({ width , height  })=>{
                this.width = width;
                this.height = height;
            });
        },
        tearDown () {
            if (this.observer) this.observer.disconnect();
        }
    };
}
exports.default = dimensionsDisplayComponent;

},{"@helpers/layout":"128Lz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hM4Uf":[function(require,module,exports) {
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
            this.$dispatch("embed:resizer-loaded", {
                resizer: this.resizer
            });
        },
        resizeIframe () {
            this.$el.querySelector("iframe").iFrameResizer.resize();
        },
        cleanup () {
            if (this.resizer) this.resizer.removeListeners();
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
    }
    if (window.jQuery) createJQueryPublicMethod(window.jQuery);
    if (typeof define === 'function' && define.amd) define([], factory);
    else if (typeof module.exports === 'object') // Node for browserfy
    module.exports = factory();
    window.iFrameResize = window.iFrameResize || factory();
})();

},{}],"c1bw6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function filterComponent(store) {
    return {
        focussed: false,
        get active () {
            return store.active;
        },
        get text () {
            return store.text;
        },
        clear () {
            if (store.raw === "") this.$refs.input.blur();
            else store.raw = "";
        },
        focus () {
            this.$refs.input.focus();
        }
    };
}
exports.default = filterComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2RhL0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function iconComponent(iconName) {
    return {
        iconName
    };
}
exports.default = iconComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bGQJL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function navComponent(store) {
    return {
        empty: false,
        children: [],
        init () {
            this.children = this.$refs.items ? Array.from(this.$refs.items.children) : [];
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7oLKc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _layout = require("@helpers/layout");
function paramsEditorComponent() {
    return {
        narrow: false,
        init () {
            _layout.observeSize(this.$el, ({ width  })=>{
                this.narrow = width < 450;
            });
        }
    };
}
exports.default = paramsEditorComponent;

},{"@helpers/layout":"128Lz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jPEON":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function tabPanelsComponent(store) {
    return {
        get store () {
            return store || this;
        },
        get id () {
            return this.$root.id;
        },
        get panels () {
            return Array.from(this.$refs.panels.children);
        },
        isActive (el) {
            return this.store.activeTab === this._getRef(el);
        },
        // protected
        _getRef (el) {
            return el.getAttribute("x-ref");
        }
    };
}
exports.default = tabPanelsComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dX3DZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _splitGrid = require("split-grid");
var _splitGridDefault = parcelHelpers.interopDefault(_splitGrid);
var _layout = require("@helpers/layout");
function splitLayoutComponent({ split , opts ={}  }) {
    let splitter = null;
    const shouldSplit = split.sizes !== null;
    return {
        layoutResizing: false,
        layoutWidth: null,
        layoutHeight: null,
        forceOrientation: null,
        get vertical () {
            if (this.forceOrientation) return this.forceOrientation === "vertical";
            return split.direction === "vertical";
        },
        get horizontal () {
            if (this.forceOrientation) return this.forceOrientation === "horizontal";
            return split.direction === "horizontal";
        },
        get splits () {
            if (this.horizontal && split.horizontalSizes) return split.horizontalSizes;
            else if (this.vertical && split.verticalSizes) return split.verticalSizes;
            else return split.sizes || [];
        },
        get minSizes () {
            if (this.horizontal && opts.minHorizontalSizes) return opts.minHorizontalSizes;
            else if (this.vertical && opts.minVerticalSizes) return opts.minVerticalSizes;
            else return opts.minSizes || [];
        },
        init () {
            _layout.observeSize(this.$el, ({ width , height  })=>{
                this.layoutWidth = width;
                this.layoutHeight = height;
            });
        },
        switchOrientation () {
            split.direction = this.vertical ? "horizontal" : "vertical";
        },
        registerGutter () {
            this._gutters.push(this.$el);
        },
        initSplit () {
            if (shouldSplit && this._gutters.length) {
                this._destroySplit();
                const dir = this.horizontal ? "row" : "column";
                splitter = _splitGridDefault.default({
                    [`${dir}Gutters`]: gutterSplits(this._gutters),
                    [`${dir}MinSizes`]: sizeSplits(this.minSizes),
                    snapOffset: 0,
                    dragInterval: 1,
                    writeStyle () {},
                    onDrag: (dir, gutterTrack, style)=>{
                        const splits = style.split(" ").map((value, i)=>i % 2 == 0 ? value : null
                        ).filter((v)=>v
                        );
                        this._setSplits(splits);
                    },
                    onDragStart: ()=>{
                        this.layoutResizing = true;
                        this.$dispatch("layout:resize-start", {
                            layout: this
                        });
                    },
                    onDragEnd: ()=>{
                        this.layoutResizing = false;
                        this.$dispatch("layout:resize-end", {
                            layout: this
                        });
                    }
                });
            }
        },
        bindings: {
            root: {
                [":style"] () {
                    return {
                        "grid-template-columns": shouldSplit && this.vertical && sizeStr(this.splits),
                        "grid-template-rows": shouldSplit && this.horizontal && sizeStr(this.splits)
                    };
                }
            }
        },
        // protected
        _gutters: [],
        _destroySplit () {
            if (splitter) splitter.destroy();
        },
        _setSplits (splits) {
            if (this.horizontal && split.horizontalSizes) split.horizontalSizes = splits;
            else if (this.vertical && split.verticalSizes) split.verticalSizes = splits;
            else split.sizes = splits;
        }
    };
}
exports.default = splitLayoutComponent;
// utils
function sizeStr(sizes) {
    const values = [];
    sizes.forEach((size)=>values.push(size, "1px")
    );
    return values.slice(0, -1).join(" ");
}
function gutterSplits(gutters) {
    return gutters.map((element, i)=>{
        return {
            track: i * 2 + 1,
            element
        };
    });
}
function sizeSplits(sizes) {
    const splits = {};
    sizes.forEach((value, i)=>{
        if (value !== null) splits[i * 2] = value;
    });
    return splits;
}

},{"split-grid":"c7zSd","@helpers/layout":"128Lz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c7zSd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var numeric = function(value, unit) {
    return Number(value.slice(0, -1 * unit.length));
};
var parseValue = function(value) {
    if (value.endsWith('px')) return {
        value: value,
        type: 'px',
        numeric: numeric(value, 'px')
    };
    if (value.endsWith('fr')) return {
        value: value,
        type: 'fr',
        numeric: numeric(value, 'fr')
    };
    if (value.endsWith('%')) return {
        value: value,
        type: '%',
        numeric: numeric(value, '%')
    };
    if (value === 'auto') return {
        value: value,
        type: 'auto'
    };
    return null;
};
var parse = function(rule) {
    return rule.split(' ').map(parseValue);
};
var getSizeAtTrack = function(index1, tracks, gap, end) {
    if (gap === void 0) gap = 0;
    if (end === void 0) end = false;
    var newIndex = end ? index1 + 1 : index1;
    var trackSum = tracks.slice(0, newIndex).reduce(function(accum, value) {
        return accum + value.numeric;
    }, 0);
    var gapSum = gap ? index1 * gap : 0;
    return trackSum + gapSum;
};
var getStyles = function(rule, ownRules, matchedRules) {
    return ownRules.concat(matchedRules).map(function(r) {
        return r.style[rule];
    }).filter(function(style) {
        return style !== undefined && style !== '';
    });
};
var getGapValue = function(unit, size) {
    if (size.endsWith(unit)) return Number(size.slice(0, -1 * unit.length));
    return null;
};
var firstNonZero = function(tracks) {
    // eslint-disable-next-line no-plusplus
    for(var i = 0; i < tracks.length; i++){
        if (tracks[i].numeric > 0) return i;
    }
    return null;
};
var NOOP = function() {
    return false;
};
var defaultWriteStyle = function(element, gridTemplateProp, style) {
    // eslint-disable-next-line no-param-reassign
    element.style[gridTemplateProp] = style;
};
var getOption = function(options, propName, def) {
    var value = options[propName];
    if (value !== undefined) return value;
    return def;
};
function getMatchedCSSRules(el) {
    var ref;
    return (ref = []).concat.apply(ref, Array.from(el.ownerDocument.styleSheets).map(function(s) {
        var rules = [];
        try {
            rules = Array.from(s.cssRules || []);
        } catch (e) {
        // Ignore results on security error
        }
        return rules;
    })).filter(function(r) {
        var matches = false;
        try {
            matches = el.matches(r.selectorText);
        } catch (e) {
        // Ignore matching erros
        }
        return matches;
    });
}
var gridTemplatePropColumns = 'grid-template-columns';
var gridTemplatePropRows = 'grid-template-rows';
var Gutter = function Gutter(direction, options, parentOptions) {
    this.direction = direction;
    this.element = options.element;
    this.track = options.track;
    if (direction === 'column') {
        this.gridTemplateProp = gridTemplatePropColumns;
        this.gridGapProp = 'grid-column-gap';
        this.cursor = getOption(parentOptions, 'columnCursor', getOption(parentOptions, 'cursor', 'col-resize'));
        this.snapOffset = getOption(parentOptions, 'columnSnapOffset', getOption(parentOptions, 'snapOffset', 30));
        this.dragInterval = getOption(parentOptions, 'columnDragInterval', getOption(parentOptions, 'dragInterval', 1));
        this.clientAxis = 'clientX';
        this.optionStyle = getOption(parentOptions, 'gridTemplateColumns');
    } else if (direction === 'row') {
        this.gridTemplateProp = gridTemplatePropRows;
        this.gridGapProp = 'grid-row-gap';
        this.cursor = getOption(parentOptions, 'rowCursor', getOption(parentOptions, 'cursor', 'row-resize'));
        this.snapOffset = getOption(parentOptions, 'rowSnapOffset', getOption(parentOptions, 'snapOffset', 30));
        this.dragInterval = getOption(parentOptions, 'rowDragInterval', getOption(parentOptions, 'dragInterval', 1));
        this.clientAxis = 'clientY';
        this.optionStyle = getOption(parentOptions, 'gridTemplateRows');
    }
    this.onDragStart = getOption(parentOptions, 'onDragStart', NOOP);
    this.onDragEnd = getOption(parentOptions, 'onDragEnd', NOOP);
    this.onDrag = getOption(parentOptions, 'onDrag', NOOP);
    this.writeStyle = getOption(parentOptions, 'writeStyle', defaultWriteStyle);
    this.startDragging = this.startDragging.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.drag = this.drag.bind(this);
    this.minSizeStart = options.minSizeStart;
    this.minSizeEnd = options.minSizeEnd;
    if (options.element) {
        this.element.addEventListener('mousedown', this.startDragging);
        this.element.addEventListener('touchstart', this.startDragging);
    }
};
Gutter.prototype.getDimensions = function getDimensions() {
    var ref = this.grid.getBoundingClientRect();
    var width = ref.width;
    var height = ref.height;
    var top = ref.top;
    var bottom = ref.bottom;
    var left = ref.left;
    var right = ref.right;
    if (this.direction === 'column') {
        this.start = top;
        this.end = bottom;
        this.size = height;
    } else if (this.direction === 'row') {
        this.start = left;
        this.end = right;
        this.size = width;
    }
};
Gutter.prototype.getSizeAtTrack = function getSizeAtTrack$1(track, end) {
    return getSizeAtTrack(track, this.computedPixels, this.computedGapPixels, end);
};
Gutter.prototype.getSizeOfTrack = function getSizeOfTrack(track) {
    return this.computedPixels[track].numeric;
};
Gutter.prototype.getRawTracks = function getRawTracks() {
    var tracks = getStyles(this.gridTemplateProp, [
        this.grid
    ], getMatchedCSSRules(this.grid));
    if (!tracks.length) {
        if (this.optionStyle) return this.optionStyle;
        throw Error('Unable to determine grid template tracks from styles.');
    }
    return tracks[0];
};
Gutter.prototype.getGap = function getGap() {
    var gap = getStyles(this.gridGapProp, [
        this.grid
    ], getMatchedCSSRules(this.grid));
    if (!gap.length) return null;
    return gap[0];
};
Gutter.prototype.getRawComputedTracks = function getRawComputedTracks() {
    return window.getComputedStyle(this.grid)[this.gridTemplateProp];
};
Gutter.prototype.getRawComputedGap = function getRawComputedGap() {
    return window.getComputedStyle(this.grid)[this.gridGapProp];
};
Gutter.prototype.setTracks = function setTracks(raw) {
    this.tracks = raw.split(' ');
    this.trackValues = parse(raw);
};
Gutter.prototype.setComputedTracks = function setComputedTracks(raw) {
    this.computedTracks = raw.split(' ');
    this.computedPixels = parse(raw);
};
Gutter.prototype.setGap = function setGap(raw) {
    this.gap = raw;
};
Gutter.prototype.setComputedGap = function setComputedGap(raw) {
    this.computedGap = raw;
    this.computedGapPixels = getGapValue('px', this.computedGap) || 0;
};
Gutter.prototype.getMousePosition = function getMousePosition(e) {
    if ('touches' in e) return e.touches[0][this.clientAxis];
    return e[this.clientAxis];
};
Gutter.prototype.startDragging = function startDragging(e) {
    if ('button' in e && e.button !== 0) return;
    // Don't actually drag the element. We emulate that in the drag function.
    e.preventDefault();
    if (this.element) this.grid = this.element.parentNode;
    else this.grid = e.target.parentNode;
    this.getDimensions();
    this.setTracks(this.getRawTracks());
    this.setComputedTracks(this.getRawComputedTracks());
    this.setGap(this.getGap());
    this.setComputedGap(this.getRawComputedGap());
    var trackPercentage = this.trackValues.filter(function(track) {
        return track.type === '%';
    });
    var trackFr = this.trackValues.filter(function(track) {
        return track.type === 'fr';
    });
    this.totalFrs = trackFr.length;
    if (this.totalFrs) {
        var track1 = firstNonZero(trackFr);
        if (track1 !== null) this.frToPixels = this.computedPixels[track1].numeric / trackFr[track1].numeric;
    }
    if (trackPercentage.length) {
        var track$1 = firstNonZero(trackPercentage);
        if (track$1 !== null) this.percentageToPixels = this.computedPixels[track$1].numeric / trackPercentage[track$1].numeric;
    }
    // get start of gutter track
    var gutterStart = this.getSizeAtTrack(this.track, false) + this.start;
    this.dragStartOffset = this.getMousePosition(e) - gutterStart;
    this.aTrack = this.track - 1;
    if (this.track < this.tracks.length - 1) this.bTrack = this.track + 1;
    else throw Error("Invalid track index: " + this.track + ". Track must be between two other tracks and only " + this.tracks.length + " tracks were found.");
    this.aTrackStart = this.getSizeAtTrack(this.aTrack, false) + this.start;
    this.bTrackEnd = this.getSizeAtTrack(this.bTrack, true) + this.start;
    // Set the dragging property of the pair object.
    this.dragging = true;
    // All the binding. `window` gets the stop events in case we drag out of the elements.
    window.addEventListener('mouseup', this.stopDragging);
    window.addEventListener('touchend', this.stopDragging);
    window.addEventListener('touchcancel', this.stopDragging);
    window.addEventListener('mousemove', this.drag);
    window.addEventListener('touchmove', this.drag);
    // Disable selection. Disable!
    this.grid.addEventListener('selectstart', NOOP);
    this.grid.addEventListener('dragstart', NOOP);
    this.grid.style.userSelect = 'none';
    this.grid.style.webkitUserSelect = 'none';
    this.grid.style.MozUserSelect = 'none';
    this.grid.style.pointerEvents = 'none';
    // Set the cursor at multiple levels
    this.grid.style.cursor = this.cursor;
    window.document.body.style.cursor = this.cursor;
    this.onDragStart(this.direction, this.track);
};
Gutter.prototype.stopDragging = function stopDragging() {
    this.dragging = false;
    // Remove the stored event listeners. This is why we store them.
    this.cleanup();
    this.onDragEnd(this.direction, this.track);
    if (this.needsDestroy) {
        if (this.element) {
            this.element.removeEventListener('mousedown', this.startDragging);
            this.element.removeEventListener('touchstart', this.startDragging);
        }
        this.destroyCb();
        this.needsDestroy = false;
        this.destroyCb = null;
    }
};
Gutter.prototype.drag = function drag(e) {
    var mousePosition = this.getMousePosition(e);
    var gutterSize = this.getSizeOfTrack(this.track);
    var minMousePosition = this.aTrackStart + this.minSizeStart + this.dragStartOffset + this.computedGapPixels;
    var maxMousePosition = this.bTrackEnd - this.minSizeEnd - this.computedGapPixels - (gutterSize - this.dragStartOffset);
    var minMousePositionOffset = minMousePosition + this.snapOffset;
    var maxMousePositionOffset = maxMousePosition - this.snapOffset;
    if (mousePosition < minMousePositionOffset) mousePosition = minMousePosition;
    if (mousePosition > maxMousePositionOffset) mousePosition = maxMousePosition;
    if (mousePosition < minMousePosition) mousePosition = minMousePosition;
    else if (mousePosition > maxMousePosition) mousePosition = maxMousePosition;
    var aTrackSize = mousePosition - this.aTrackStart - this.dragStartOffset - this.computedGapPixels;
    var bTrackSize = this.bTrackEnd - mousePosition + this.dragStartOffset - gutterSize - this.computedGapPixels;
    if (this.dragInterval > 1) {
        var aTrackSizeIntervaled = Math.round(aTrackSize / this.dragInterval) * this.dragInterval;
        bTrackSize -= aTrackSizeIntervaled - aTrackSize;
        aTrackSize = aTrackSizeIntervaled;
    }
    if (aTrackSize < this.minSizeStart) aTrackSize = this.minSizeStart;
    if (bTrackSize < this.minSizeEnd) bTrackSize = this.minSizeEnd;
    if (this.trackValues[this.aTrack].type === 'px') this.tracks[this.aTrack] = aTrackSize + "px";
    else if (this.trackValues[this.aTrack].type === 'fr') {
        if (this.totalFrs === 1) this.tracks[this.aTrack] = '1fr';
        else {
            var targetFr = aTrackSize / this.frToPixels;
            this.tracks[this.aTrack] = targetFr + "fr";
        }
    } else if (this.trackValues[this.aTrack].type === '%') {
        var targetPercentage = aTrackSize / this.percentageToPixels;
        this.tracks[this.aTrack] = targetPercentage + "%";
    }
    if (this.trackValues[this.bTrack].type === 'px') this.tracks[this.bTrack] = bTrackSize + "px";
    else if (this.trackValues[this.bTrack].type === 'fr') {
        if (this.totalFrs === 1) this.tracks[this.bTrack] = '1fr';
        else {
            var targetFr$1 = bTrackSize / this.frToPixels;
            this.tracks[this.bTrack] = targetFr$1 + "fr";
        }
    } else if (this.trackValues[this.bTrack].type === '%') {
        var targetPercentage$1 = bTrackSize / this.percentageToPixels;
        this.tracks[this.bTrack] = targetPercentage$1 + "%";
    }
    var style = this.tracks.join(' ');
    this.writeStyle(this.grid, this.gridTemplateProp, style);
    this.onDrag(this.direction, this.track, style);
};
Gutter.prototype.cleanup = function cleanup() {
    window.removeEventListener('mouseup', this.stopDragging);
    window.removeEventListener('touchend', this.stopDragging);
    window.removeEventListener('touchcancel', this.stopDragging);
    window.removeEventListener('mousemove', this.drag);
    window.removeEventListener('touchmove', this.drag);
    if (this.grid) {
        this.grid.removeEventListener('selectstart', NOOP);
        this.grid.removeEventListener('dragstart', NOOP);
        this.grid.style.userSelect = '';
        this.grid.style.webkitUserSelect = '';
        this.grid.style.MozUserSelect = '';
        this.grid.style.pointerEvents = '';
        this.grid.style.cursor = '';
    }
    window.document.body.style.cursor = '';
};
Gutter.prototype.destroy = function destroy(immediate, cb) {
    if (immediate === void 0) immediate = true;
    if (immediate || this.dragging === false) {
        this.cleanup();
        if (this.element) {
            this.element.removeEventListener('mousedown', this.startDragging);
            this.element.removeEventListener('touchstart', this.startDragging);
        }
        if (cb) cb();
    } else {
        this.needsDestroy = true;
        if (cb) this.destroyCb = cb;
    }
};
var getTrackOption = function(options, track, defaultValue) {
    if (track in options) return options[track];
    return defaultValue;
};
var createGutter = function(direction, options) {
    return function(gutterOptions) {
        if (gutterOptions.track < 1) throw Error("Invalid track index: " + gutterOptions.track + ". Track must be between two other tracks.");
        var trackMinSizes = direction === 'column' ? options.columnMinSizes || {} : options.rowMinSizes || {};
        var trackMinSize = direction === 'column' ? 'columnMinSize' : 'rowMinSize';
        return new Gutter(direction, Object.assign({}, {
            minSizeStart: getTrackOption(trackMinSizes, gutterOptions.track - 1, getOption(options, trackMinSize, getOption(options, 'minSize', 0))),
            minSizeEnd: getTrackOption(trackMinSizes, gutterOptions.track + 1, getOption(options, trackMinSize, getOption(options, 'minSize', 0)))
        }, gutterOptions), options);
    };
};
var Grid = function Grid(options) {
    var this$1 = this;
    this.columnGutters = {};
    this.rowGutters = {};
    this.options = Object.assign({}, {
        columnGutters: options.columnGutters || [],
        rowGutters: options.rowGutters || [],
        columnMinSizes: options.columnMinSizes || {},
        rowMinSizes: options.rowMinSizes || {}
    }, options);
    this.options.columnGutters.forEach(function(gutterOptions) {
        this$1.columnGutters[gutterOptions.track] = createGutter('column', this$1.options)(gutterOptions);
    });
    this.options.rowGutters.forEach(function(gutterOptions) {
        this$1.rowGutters[gutterOptions.track] = createGutter('row', this$1.options)(gutterOptions);
    });
};
Grid.prototype.addColumnGutter = function addColumnGutter(element, track) {
    if (this.columnGutters[track]) this.columnGutters[track].destroy();
    this.columnGutters[track] = createGutter('column', this.options)({
        element: element,
        track: track
    });
};
Grid.prototype.addRowGutter = function addRowGutter(element, track) {
    if (this.rowGutters[track]) this.rowGutters[track].destroy();
    this.rowGutters[track] = createGutter('row', this.options)({
        element: element,
        track: track
    });
};
Grid.prototype.removeColumnGutter = function removeColumnGutter(track, immediate) {
    var this$1 = this;
    if (immediate === void 0) immediate = true;
    if (this.columnGutters[track]) this.columnGutters[track].destroy(immediate, function() {
        delete this$1.columnGutters[track];
    });
};
Grid.prototype.removeRowGutter = function removeRowGutter(track, immediate) {
    var this$1 = this;
    if (immediate === void 0) immediate = true;
    if (this.rowGutters[track]) this.rowGutters[track].destroy(immediate, function() {
        delete this$1.rowGutters[track];
    });
};
Grid.prototype.handleDragStart = function handleDragStart(e, direction, track) {
    if (direction === 'column') {
        if (this.columnGutters[track]) this.columnGutters[track].destroy();
        this.columnGutters[track] = createGutter('column', this.options)({
            track: track
        });
        this.columnGutters[track].startDragging(e);
    } else if (direction === 'row') {
        if (this.rowGutters[track]) this.rowGutters[track].destroy();
        this.rowGutters[track] = createGutter('row', this.options)({
            track: track
        });
        this.rowGutters[track].startDragging(e);
    }
};
Grid.prototype.destroy = function destroy(immediate) {
    var this$1 = this;
    if (immediate === void 0) immediate = true;
    Object.keys(this.columnGutters).forEach(function(track) {
        return this$1.columnGutters[track].destroy(immediate, function() {
            delete this$1.columnGutters[track];
        });
    });
    Object.keys(this.rowGutters).forEach(function(track) {
        return this$1.rowGutters[track].destroy(immediate, function() {
            delete this$1.rowGutters[track];
        });
    });
};
function index(options) {
    return new Grid(options);
}
exports.default = index;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dvr8m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _debounce = require("debounce");
var _debounceDefault = parcelHelpers.interopDefault(_debounce);
var _tippy = require("~/app/assets/lookbook/js/lib/tippy");
var _tippyDefault = parcelHelpers.interopDefault(_tippy);
var _layout = require("@helpers/layout");
var _dom = require("@helpers/dom");
function tabsComponent(store) {
    const initial1 = store ? store.activeTab : null;
    let dropdown = null;
    return {
        visibleTabsCount: 0,
        triggerLeft: 0,
        get store () {
            return store || this;
        },
        get tabs () {
            return Array.from(this.$refs.tabs.children);
        },
        get dropdownTabs () {
            return Array.from(this.$refs.tabsDropdown ? this.$refs.tabsDropdown.children : []);
        },
        get tabWidths () {
            return this.tabs.map((tab)=>_dom.getElementSize(tab, {
                    includeMargins: true
                }).width
            );
        },
        init () {
            this.$nextTick(()=>{
                dropdown = _tippyDefault.default(this.$refs.dropdownTrigger, {
                    content: this.$refs.tabsDropdown,
                    theme: "menu",
                    interactive: true,
                    trigger: "click",
                    placement: "bottom",
                    appendTo: this.$root
                });
                const initialTab = initial1 ? this.tabs.find((t)=>this._getRef(t) === initial1
                ) : this.tabs[0];
                this.selectTab(initialTab, true);
                this.parentObserver = _layout.observeSize(this.$root.parentElement, _debounceDefault.default(this.handleResize.bind(this), 10));
                this.$watch("visibleTabsCount", (value)=>{
                    this.debug(`'#${this.$root.id}' visible tabs count:`, value);
                });
            });
        },
        handleResize ({ width  }) {
            if (width === this._lastMeasuredWidth) return;
            if (width === this.$root.offsetWidth) {
                this.visibleTabsCount = this.tabs.length;
                return;
            }
            let sumTabWidths = 60;
            let triggerLeft = 20;
            let visibleTabsCount = 0;
            this.tabWidths.forEach((tabWidth)=>{
                sumTabWidths += tabWidth;
                if (sumTabWidths < width) {
                    triggerLeft += tabWidth;
                    visibleTabsCount++;
                }
            });
            this.visibleTabsCount = visibleTabsCount;
            this.triggerLeft = triggerLeft;
            this._lastMeasuredWidth = width;
        },
        selectTab (el, initial = false) {
            this.store.activeTab = this._getRef(el);
            dropdown.hide();
            if (!initial) this.$dispatch("tabs:change", {
                tabs: this
            });
        },
        isSelected (el) {
            return this.store.activeTab === this._getRef(el);
        },
        isDisabled (el) {
            return el.getAttribute("data-disabled") == "true";
        },
        hasHiddenTabs () {
            return this.visibleTabsCount < this.tabs.length;
        },
        // protected
        _lastMeasuredWidth: 0,
        _getRef (el) {
            return el ? el.getAttribute("x-ref").replace("dropdown-", "") : null;
        }
    };
}
exports.default = tabsComponent;

},{"debounce":"6mekx","~/app/assets/lookbook/js/lib/tippy":"6zhil","@helpers/layout":"128Lz","@helpers/dom":"3rv1J","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6kmWp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function viewportComponent(store) {
    store = store || {
        width: "100%",
        height: "100%"
    };
    store.resizing = false;
    return {
        store,
        get maxWidth () {
            return this.store.width === "100%" ? "100%" : `${store.width}px`;
        },
        get maxHeight () {
            return this.store.height === "100%" ? "100%" : `${store.height}px`;
        },
        get parentWidth () {
            return Math.round(this.$root.clientWidth);
        },
        get parentHeight () {
            return Math.round(this.$root.clientHeight);
        },
        get reflowing () {
            return this.$store.layout.reflowing;
        },
        reloadIframe () {
            this.$refs.iframe.contentWindow.location.reload();
        },
        start () {
            this.$dispatch("viewport:resize-start", this._resizeData);
            this.$store.layout.reflowing = true;
            this.store.resizing = true;
        },
        end () {
            this.$store.layout.reflowing = false;
            this.store.resizing = false;
            this.$dispatch("viewport:resize-complete", this._resizeData);
        },
        onResizeStart (e) {
            this.onResizeWidthStart(e);
            this.onResizeHeightStart(e);
        },
        toggleFullSize () {
            const { height , width  } = store;
            if (height === "100%" && width === "100%") {
                this.toggleFullHeight();
                this.toggleFullWidth();
            } else {
                if (height !== "100%") this.toggleFullHeight();
                if (width !== "100%") this.toggleFullWidth();
            }
        },
        onResizeWidth (e) {
            const width = this.resizeStartWidth - (this.resizeStartPositionX - e.pageX) * 2;
            const boundedWidth = Math.min(Math.max(Math.round(width), 200), this.parentWidth);
            this.store.width = boundedWidth === this.parentWidth ? "100%" : boundedWidth;
            this.$dispatch("viewport:resize-progress", this._resizeData);
        },
        onResizeWidthStart (e) {
            this.start();
            this.onResizeWidth = this.onResizeWidth.bind(this);
            this.onResizeWidthEnd = this.onResizeWidthEnd.bind(this);
            this.resizeStartPositionX = e.pageX;
            this.resizeStartWidth = this.$refs.wrapper.clientWidth;
            window.addEventListener("pointermove", this.onResizeWidth);
            window.addEventListener("pointerup", this.onResizeWidthEnd);
        },
        onResizeWidthEnd () {
            window.removeEventListener("pointermove", this.onResizeWidth);
            window.removeEventListener("pointerup", this.onResizeWidthEnd);
            this.end();
        },
        toggleFullWidth () {
            this.$dispatch("viewport:resize-start", this._resizeData);
            const { width , lastWidth  } = store;
            if (width === "100%" && lastWidth) this.store.width = lastWidth;
            else {
                this.store.lastWidth = width;
                this.store.width = "100%";
            }
            this.$dispatch("viewport:resize-complete", this._resizeData);
        },
        onResizeHeight (e) {
            const height = this.resizeStartHeight - (this.resizeStartPositionY - e.pageY);
            const boundedHeight = Math.min(Math.max(Math.round(height), 200), this.parentHeight);
            this.store.height = boundedHeight === this.parentHeight ? "100%" : boundedHeight;
            this.$dispatch("viewport:resize-progress", this._resizeData);
        },
        onResizeHeightStart (e) {
            this.start();
            this.onResizeHeight = this.onResizeHeight.bind(this);
            this.onResizeHeightEnd = this.onResizeHeightEnd.bind(this);
            this.resizeStartPositionY = e.pageY;
            this.resizeStartHeight = this.$refs.wrapper.clientHeight;
            window.addEventListener("pointermove", this.onResizeHeight);
            window.addEventListener("pointerup", this.onResizeHeightEnd);
        },
        onResizeHeightEnd () {
            window.removeEventListener("pointermove", this.onResizeHeight);
            window.removeEventListener("pointerup", this.onResizeHeightEnd);
            this.end();
        },
        toggleFullHeight () {
            this.$dispatch("viewport:resize-start", this._resizeData);
            const { height , lastHeight  } = store;
            if (height === "100%" && lastHeight) this.store.height = lastHeight;
            else {
                this.store.lastHeight = height;
                this.store.height = "100%";
            }
            this.$dispatch("viewport:resize-complete", this._resizeData);
        },
        // protected
        get _resizeData () {
            return {
                width: this.store.width,
                height: this.store.height,
                viewport: this
            };
        }
    };
}
exports.default = viewportComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9JwZ2":[function(require,module,exports) {
const _temp0 = require("../../nav/item/component.js");
const _temp1 = require("../../params_editor/field/component.js");
module.exports = {
    "nav": {
        "item": _temp0
    },
    "params_editor": {
        "field": _temp1
    }
};

},{"../../nav/item/component.js":"3BO4E","../../params_editor/field/component.js":"72WZH"}],"3BO4E":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function navItemComponent({ id , matchers  }) {
    return {
        filteredOut: false,
        get open () {
            return this.isCollection && this.isOpen(id);
        },
        get active () {
            if (this.$refs.link) return this.location && this.location.pathname === this.$refs.link.getAttribute("href");
            return false;
        },
        get children () {
            return this.$refs.items ? Array.from(this.$refs.items.children) : [];
        },
        get isCollection () {
            return !this.$refs.link;
        },
        toggle () {
            this.toggleOpen(id);
        },
        async filter (text) {
            if (this.isCollection) {
                this.filteredOut = true;
                this.children.forEach(async (child)=>{
                    const data = Alpine.$data(child);
                    await data.filter(text);
                    if (!data.filteredOut) this.filteredOut = false;
                });
            } else this.filteredOut = !this.match(text);
            return this;
        },
        match (text) {
            if (text.length) {
                const matched = (matchers || []).map((m)=>m.includes(text)
                );
                return matched.filter((m)=>m
                ).length;
            }
            return true;
        },
        bindings: {
            toggle: {
                ["@click.stop"]: "toggle",
                ["x-ref"]: "toggle"
            },
            link: {
                [":class"]: "{'!bg-lookbook-nav-item-active':active}",
                ["x-ref"]: "link"
            }
        }
    };
}
exports.default = navItemComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"72WZH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function paramsEditorFieldComponent({ name , value  }) {
    return {
        name,
        value,
        init () {
            this.$watch("value", ()=>this.update()
            );
        },
        update () {
            if (this.validate()) {
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set(this.name, this.value);
                const path = location.href.replace(location.search, "");
                this.navigateTo(`${path}?${searchParams.toString()}`);
            }
        },
        validate () {
            return this.$root.reportValidity ? this.$root.reportValidity() : true;
        },
        get isNarrowLayout () {
            return this.narrow || false;
        },
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
exports.default = paramsEditorFieldComponent;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jQFJF":[function(require,module,exports) {
const _temp0 = require("./clipboard.js");
const _temp1 = require("./tooltip.js");
module.exports = {
    "clipboard": _temp0,
    "tooltip": _temp1
};

},{"./clipboard.js":"g7gXy","./tooltip.js":"hxzH0"}]},["6zpHt","7KyuE"], "7KyuE", "parcelRequirea49c")

//# sourceMappingURL=lookbook.js.map
