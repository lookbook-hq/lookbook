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
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
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
})({"1uIvH":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "916932b22e4085ab";
module.bundle.HMR_BUNDLE_ID = "0a614e2f185f363f";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
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
            it = o[Symbol.iterator]();
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
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
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
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
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
        checkedAssets = {
        };
        acceptedAssets = {
        };
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
            } else window.location.reload();
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
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
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
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
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
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
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

},{}],"kCDd3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _hotkey = require("@github/hotkey");
var _alpinejs = require("alpinejs");
var _alpinejsDefault = parcelHelpers.interopDefault(_alpinejs);
var _persist = require("@alpinejs/persist");
var _persistDefault = parcelHelpers.interopDefault(_persist);
var _morph = require("@alpinejs/morph");
var _morphDefault = parcelHelpers.interopDefault(_morph);
var _alpineTooltip = require("@ryangjchandler/alpine-tooltip");
var _alpineTooltipDefault = parcelHelpers.interopDefault(_alpineTooltip);
var _page = require("./components/page");
var _pageDefault = parcelHelpers.interopDefault(_page);
var _inspector = require("./components/inspector");
var _inspectorDefault = parcelHelpers.interopDefault(_inspector);
var _previewWindow = require("./components/preview-window");
var _previewWindowDefault = parcelHelpers.interopDefault(_previewWindow);
var _filter = require("./components/filter");
var _filterDefault = parcelHelpers.interopDefault(_filter);
var _param = require("./components/param");
var _paramDefault = parcelHelpers.interopDefault(_param);
var _nav = require("./components/nav");
var _navDefault = parcelHelpers.interopDefault(_nav);
var _navItem = require("./components/nav-item");
var _navItemDefault = parcelHelpers.interopDefault(_navItem);
var _navGroup = require("./components/nav-group");
var _navGroupDefault = parcelHelpers.interopDefault(_navGroup);
var _splitter = require("./components/splitter");
var _splitterDefault = parcelHelpers.interopDefault(_splitter);
var _copy = require("./components/copy");
var _copyDefault = parcelHelpers.interopDefault(_copy);
var _sizes = require("./components/sizes");
var _sizesDefault = parcelHelpers.interopDefault(_sizes);
var _filter1 = require("./stores/filter");
var _filterDefault1 = parcelHelpers.interopDefault(_filter1);
var _layout = require("./stores/layout");
var _layoutDefault = parcelHelpers.interopDefault(_layout);
var _nav1 = require("./stores/nav");
var _navDefault1 = parcelHelpers.interopDefault(_nav1);
var _sidebar = require("./stores/sidebar");
var _sidebarDefault = parcelHelpers.interopDefault(_sidebar);
var _inspector1 = require("./stores/inspector");
var _inspectorDefault1 = parcelHelpers.interopDefault(_inspector1);
// Plugins
_alpinejsDefault.default.plugin(_persistDefault.default);
_alpinejsDefault.default.plugin(_morphDefault.default);
_alpinejsDefault.default.plugin(_alpineTooltipDefault.default);
// Stores
_alpinejsDefault.default.store("filter", _filterDefault1.default(_alpinejsDefault.default));
_alpinejsDefault.default.store("layout", _layoutDefault.default(_alpinejsDefault.default));
_alpinejsDefault.default.store("nav", _navDefault1.default(_alpinejsDefault.default));
_alpinejsDefault.default.store("sidebar", _sidebarDefault.default(_alpinejsDefault.default));
_alpinejsDefault.default.store("inspector", _inspectorDefault1.default(_alpinejsDefault.default));
// Components
_alpinejsDefault.default.data("page", _pageDefault.default);
_alpinejsDefault.default.data("splitter", _splitterDefault.default);
_alpinejsDefault.default.data("previewWindow", _previewWindowDefault.default);
_alpinejsDefault.default.data("copy", _copyDefault.default);
_alpinejsDefault.default.data("inspector", _inspectorDefault.default);
_alpinejsDefault.default.data("filter", _filterDefault.default);
_alpinejsDefault.default.data("param", _paramDefault.default);
_alpinejsDefault.default.data("sizes", _sizesDefault.default);
_alpinejsDefault.default.data("nav", _navDefault.default);
_alpinejsDefault.default.data("navItem", _navItemDefault.default);
_alpinejsDefault.default.data("navGroup", _navGroupDefault.default);
var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
try {
    // Init
    for(var _iterator = document.querySelectorAll("[data-hotkey]")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
        var el = _step.value;
        _hotkey.install(el);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally{
    try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
        }
    } finally{
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}
window.Alpine = _alpinejsDefault.default;
_alpinejsDefault.default.start();

},{"@github/hotkey":"4Vf0K","alpinejs":"cQZQC","@alpinejs/persist":"gCoGk","@alpinejs/morph":"80ez2","@ryangjchandler/alpine-tooltip":"lgns0","./components/page":"55pfR","./components/splitter":"2c7V4","./components/inspector":"a9DtZ","./components/filter":"1Wjrk","./components/param":"9tbIq","./components/nav":"41Ql3","./components/sizes":"ipCdL","./stores/filter":"clyCh","./stores/layout":"dS8Sg","./stores/nav":"dXBwS","./stores/sidebar":"520kV","./stores/inspector":"4zpcp","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU","./components/copy":"kk5Vp","./components/nav-item":"jkkjy","./components/nav-group":"7yZ5O","./components/preview-window":"iZ8eY"}],"4Vf0K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Leaf", ()=>Leaf
);
parcelHelpers.export(exports, "RadixTrie", ()=>RadixTrie
);
parcelHelpers.export(exports, "eventToHotkeyString", ()=>hotkey1
);
parcelHelpers.export(exports, "install", ()=>install
);
parcelHelpers.export(exports, "uninstall", ()=>uninstall
);
class Leaf {
    constructor(trie){
        this.children = [];
        this.parent = trie;
    }
    delete(value) {
        const index = this.children.indexOf(value);
        if (index === -1) return false;
        this.children = this.children.slice(0, index).concat(this.children.slice(index + 1));
        if (this.children.length === 0) this.parent.delete(this);
        return true;
    }
    add(value1) {
        this.children.push(value1);
        return this;
    }
}
class RadixTrie {
    constructor(trie1){
        this.parent = null;
        this.children = {
        };
        this.parent = trie1 || null;
    }
    get(edge1) {
        return this.children[edge1];
    }
    insert(edges) {
        let currentNode = this;
        for(let i = 0; i < edges.length; i += 1){
            const edge = edges[i];
            let nextNode = currentNode.get(edge);
            if (i === edges.length - 1) {
                if (nextNode instanceof RadixTrie) {
                    currentNode.delete(nextNode);
                    nextNode = null;
                }
                if (!nextNode) {
                    nextNode = new Leaf(currentNode);
                    currentNode.children[edge] = nextNode;
                }
                return nextNode;
            } else {
                if (nextNode instanceof Leaf) nextNode = null;
                if (!nextNode) {
                    nextNode = new RadixTrie(currentNode);
                    currentNode.children[edge] = nextNode;
                }
            }
            currentNode = nextNode;
        }
        return currentNode;
    }
    delete(node) {
        for(const edge in this.children){
            const currentNode = this.children[edge];
            if (currentNode === node) {
                const success = delete this.children[edge];
                if (Object.keys(this.children).length === 0 && this.parent) this.parent.delete(this);
                return success;
            }
        }
        return false;
    }
}
function isFormField(element) {
    if (!(element instanceof HTMLElement)) return false;
    const name = element.nodeName.toLowerCase();
    const type = (element.getAttribute('type') || '').toLowerCase();
    return name === 'select' || name === 'textarea' || name === 'input' && type !== 'submit' && type !== 'reset' && type !== 'checkbox' && type !== 'radio' || element.isContentEditable;
}
function fireDeterminedAction(el, path) {
    const delegateEvent = new CustomEvent('hotkey-fire', {
        cancelable: true,
        detail: {
            path
        }
    });
    const cancelled = !el.dispatchEvent(delegateEvent);
    if (cancelled) return;
    if (isFormField(el)) el.focus();
    else el.click();
}
function expandHotkeyToEdges(hotkey) {
    return hotkey.split(',').map((edge)=>edge.split(' ')
    );
}
function hotkey1(event) {
    const elideShift = event.code.startsWith('Key') && event.shiftKey && event.key.toUpperCase() === event.key;
    return `${event.ctrlKey ? 'Control+' : ''}${event.altKey ? 'Alt+' : ''}${event.metaKey ? 'Meta+' : ''}${event.shiftKey && !elideShift ? 'Shift+' : ''}${event.key}`;
}
const hotkeyRadixTrie = new RadixTrie();
const elementsLeaves = new WeakMap();
let currentTriePosition = hotkeyRadixTrie;
let resetTriePositionTimer = null;
let path1 = [];
function resetTriePosition() {
    path1 = [];
    resetTriePositionTimer = null;
    currentTriePosition = hotkeyRadixTrie;
}
function keyDownHandler(event) {
    if (event.defaultPrevented) return;
    if (!(event.target instanceof Node)) return;
    if (isFormField(event.target)) {
        const target = event.target;
        if (!target.id) return;
        if (!target.ownerDocument.querySelector(`[data-hotkey-scope=${target.id}]`)) return;
    }
    if (resetTriePositionTimer != null) window.clearTimeout(resetTriePositionTimer);
    resetTriePositionTimer = window.setTimeout(resetTriePosition, 1500);
    const newTriePosition = currentTriePosition.get(hotkey1(event));
    if (!newTriePosition) {
        resetTriePosition();
        return;
    }
    path1.push(hotkey1(event));
    currentTriePosition = newTriePosition;
    if (newTriePosition instanceof Leaf) {
        const target = event.target;
        let shouldFire = false;
        let elementToFire;
        const formField = isFormField(target);
        for(let i = newTriePosition.children.length - 1; i >= 0; i -= 1){
            elementToFire = newTriePosition.children[i];
            const scope = elementToFire.getAttribute('data-hotkey-scope');
            if (!formField && !scope || formField && target.id === scope) {
                shouldFire = true;
                break;
            }
        }
        if (elementToFire && shouldFire) {
            fireDeterminedAction(elementToFire, path1);
            event.preventDefault();
        }
        resetTriePosition();
    }
}
function install(element, hotkey) {
    if (Object.keys(hotkeyRadixTrie.children).length === 0) document.addEventListener('keydown', keyDownHandler);
    const hotkeys = expandHotkeyToEdges(hotkey || element.getAttribute('data-hotkey') || '');
    const leaves = hotkeys.map((h)=>hotkeyRadixTrie.insert(h).add(element)
    );
    elementsLeaves.set(element, leaves);
}
function uninstall(element) {
    const leaves = elementsLeaves.get(element);
    if (leaves && leaves.length) for (const leaf of leaves)leaf && leaf.delete(element);
    if (Object.keys(hotkeyRadixTrie.children).length === 0) document.removeEventListener('keydown', keyDownHandler);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"5oERU":[function(require,module,exports) {
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

},{}],"cQZQC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>module_default
);
var global = arguments[3];
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
                exports: {
                }
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
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {
    }, "default", module && module.__esModule && "default" in module ? {
        get: ()=>module.default
        ,
        enumerable: true
    } : {
        value: module,
        enumerable: true
    })), module);
};
// node_modules/@vue/shared/dist/shared.cjs.js
var require_shared_cjs = __commonJS((exports)=>{
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
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
    var GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
    var isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
    var range = 2;
    function generateCodeFrame(source, start2 = 0, end = source.length) {
        const lines = source.split(/\r?\n/);
        let count = 0;
        const res = [];
        for(let i = 0; i < lines.length; i++){
            count += lines[i].length + 1;
            if (count >= start2) {
                for(let j = i - range; j <= i + range || end > count; j++){
                    if (j < 0 || j >= lines.length) continue;
                    const line = j + 1;
                    res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
                    const lineLength = lines[j].length;
                    if (j === i) {
                        const pad = start2 - (count - lineLength) + 1;
                        const length = Math.max(1, end > count ? lineLength - pad : end - start2);
                        res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
                    } else if (j > i) {
                        if (end > count) {
                            const length = Math.max(Math.min(end - count, lineLength), 1);
                            res.push(`   |  ` + "^".repeat(length));
                        }
                        count += lineLength + 1;
                    }
                }
                break;
            }
        }
        return res.join("\n");
    }
    var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
    var unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    var attrValidationCache = {
    };
    function isSSRSafeAttrName(name) {
        if (attrValidationCache.hasOwnProperty(name)) return attrValidationCache[name];
        const isUnsafe = unsafeAttrCharRE.test(name);
        if (isUnsafe) console.error(`unsafe attribute name: ${name}`);
        return attrValidationCache[name] = !isUnsafe;
    }
    var propsToAttrMap = {
        acceptCharset: "accept-charset",
        className: "class",
        htmlFor: "for",
        httpEquiv: "http-equiv"
    };
    var isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
    var isKnownAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
    function normalizeStyle(value) {
        if (isArray(value)) {
            const res = {
            };
            for(let i = 0; i < value.length; i++){
                const item = value[i];
                const normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);
                if (normalized) for(const key in normalized)res[key] = normalized[key];
            }
            return res;
        } else if (isObject(value)) return value;
    }
    var listDelimiterRE = /;(?![^(]*\))/g;
    var propertyDelimiterRE = /:(.+)/;
    function parseStringStyle(cssText) {
        const ret = {
        };
        cssText.split(listDelimiterRE).forEach((item)=>{
            if (item) {
                const tmp = item.split(propertyDelimiterRE);
                tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
            }
        });
        return ret;
    }
    function stringifyStyle(styles) {
        let ret = "";
        if (!styles) return ret;
        for(const key in styles){
            const value = styles[key];
            const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
            if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) ret += `${normalizedKey}:${value};`;
        }
        return ret;
    }
    function normalizeClass(value) {
        let res = "";
        if (isString(value)) res = value;
        else if (isArray(value)) for(let i = 0; i < value.length; i++){
            const normalized = normalizeClass(value[i]);
            if (normalized) res += normalized + " ";
        }
        else if (isObject(value)) {
            for(const name in value)if (value[name]) res += name + " ";
        }
        return res.trim();
    }
    var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
    var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
    var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
    var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
    var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
    var isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
    var escapeRE = /["'&<>]/;
    function escapeHtml(string) {
        const str = "" + string;
        const match = escapeRE.exec(str);
        if (!match) return str;
        let html = "";
        let escaped;
        let index;
        let lastIndex = 0;
        for(index = match.index; index < str.length; index++){
            switch(str.charCodeAt(index)){
                case 34:
                    escaped = "&quot;";
                    break;
                case 38:
                    escaped = "&amp;";
                    break;
                case 39:
                    escaped = "&#39;";
                    break;
                case 60:
                    escaped = "&lt;";
                    break;
                case 62:
                    escaped = "&gt;";
                    break;
                default:
                    continue;
            }
            if (lastIndex !== index) html += str.substring(lastIndex, index);
            lastIndex = index + 1;
            html += escaped;
        }
        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
    }
    var commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
    function escapeHtmlComment(src) {
        return src.replace(commentStripRE, "");
    }
    function looseCompareArrays(a, b) {
        if (a.length !== b.length) return false;
        let equal = true;
        for(let i = 0; equal && i < a.length; i++)equal = looseEqual(a[i], b[i]);
        return equal;
    }
    function looseEqual(a, b) {
        if (a === b) return true;
        let aValidType = isDate(a);
        let bValidType = isDate(b);
        if (aValidType || bValidType) return aValidType && bValidType ? a.getTime() === b.getTime() : false;
        aValidType = isArray(a);
        bValidType = isArray(b);
        if (aValidType || bValidType) return aValidType && bValidType ? looseCompareArrays(a, b) : false;
        aValidType = isObject(a);
        bValidType = isObject(b);
        if (aValidType || bValidType) {
            if (!aValidType || !bValidType) return false;
            const aKeysCount = Object.keys(a).length;
            const bKeysCount = Object.keys(b).length;
            if (aKeysCount !== bKeysCount) return false;
            for(const key in a){
                const aHasKey = a.hasOwnProperty(key);
                const bHasKey = b.hasOwnProperty(key);
                if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) return false;
            }
        }
        return String(a) === String(b);
    }
    function looseIndexOf(arr, val) {
        return arr.findIndex((item)=>looseEqual(item, val)
        );
    }
    var toDisplayString = (val)=>{
        return val == null ? "" : isObject(val) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    var replacer = (_key, val)=>{
        if (isMap(val)) return {
            [`Map(${val.size})`]: [
                ...val.entries()
            ].reduce((entries, [key, val2])=>{
                entries[`${key} =>`] = val2;
                return entries;
            }, {
            })
        };
        else if (isSet(val)) return {
            [`Set(${val.size})`]: [
                ...val.values()
            ]
        };
        else if (isObject(val) && !isArray(val) && !isPlainObject(val)) return String(val);
        return val;
    };
    var babelParserDefaultPlugins = [
        "bigInt",
        "optionalChaining",
        "nullishCoalescingOperator"
    ];
    var EMPTY_OBJ = Object.freeze({
    });
    var EMPTY_ARR = Object.freeze([]);
    var NOOP = ()=>{
    };
    var NO = ()=>false
    ;
    var onRE = /^on[^a-z]/;
    var isOn = (key)=>onRE.test(key)
    ;
    var isModelListener = (key)=>key.startsWith("onUpdate:")
    ;
    var extend = Object.assign;
    var remove = (arr, el)=>{
        const i = arr.indexOf(el);
        if (i > -1) arr.splice(i, 1);
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = (val, key)=>hasOwnProperty.call(val, key)
    ;
    var isArray = Array.isArray;
    var isMap = (val)=>toTypeString(val) === "[object Map]"
    ;
    var isSet = (val)=>toTypeString(val) === "[object Set]"
    ;
    var isDate = (val)=>val instanceof Date
    ;
    var isFunction = (val)=>typeof val === "function"
    ;
    var isString = (val)=>typeof val === "string"
    ;
    var isSymbol = (val)=>typeof val === "symbol"
    ;
    var isObject = (val)=>val !== null && typeof val === "object"
    ;
    var isPromise = (val)=>{
        return isObject(val) && isFunction(val.then) && isFunction(val.catch);
    };
    var objectToString = Object.prototype.toString;
    var toTypeString = (value)=>objectToString.call(value)
    ;
    var toRawType = (value)=>{
        return toTypeString(value).slice(8, -1);
    };
    var isPlainObject = (val)=>toTypeString(val) === "[object Object]"
    ;
    var isIntegerKey = (key)=>isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key
    ;
    var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
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
    var invokeArrayFns = (fns, arg)=>{
        for(let i = 0; i < fns.length; i++)fns[i](arg);
    };
    var def = (obj, key, value)=>{
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: false,
            value
        });
    };
    var toNumber = (val)=>{
        const n = parseFloat(val);
        return isNaN(n) ? val : n;
    };
    var _globalThis;
    var getGlobalThis = ()=>{
        return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {
        });
    };
    exports.EMPTY_ARR = EMPTY_ARR;
    exports.EMPTY_OBJ = EMPTY_OBJ;
    exports.NO = NO;
    exports.NOOP = NOOP;
    exports.PatchFlagNames = PatchFlagNames;
    exports.babelParserDefaultPlugins = babelParserDefaultPlugins;
    exports.camelize = camelize;
    exports.capitalize = capitalize;
    exports.def = def;
    exports.escapeHtml = escapeHtml;
    exports.escapeHtmlComment = escapeHtmlComment;
    exports.extend = extend;
    exports.generateCodeFrame = generateCodeFrame;
    exports.getGlobalThis = getGlobalThis;
    exports.hasChanged = hasChanged;
    exports.hasOwn = hasOwn;
    exports.hyphenate = hyphenate;
    exports.invokeArrayFns = invokeArrayFns;
    exports.isArray = isArray;
    exports.isBooleanAttr = isBooleanAttr2;
    exports.isDate = isDate;
    exports.isFunction = isFunction;
    exports.isGloballyWhitelisted = isGloballyWhitelisted;
    exports.isHTMLTag = isHTMLTag;
    exports.isIntegerKey = isIntegerKey;
    exports.isKnownAttr = isKnownAttr;
    exports.isMap = isMap;
    exports.isModelListener = isModelListener;
    exports.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
    exports.isObject = isObject;
    exports.isOn = isOn;
    exports.isPlainObject = isPlainObject;
    exports.isPromise = isPromise;
    exports.isReservedProp = isReservedProp;
    exports.isSSRSafeAttrName = isSSRSafeAttrName;
    exports.isSVGTag = isSVGTag;
    exports.isSet = isSet;
    exports.isSpecialBooleanAttr = isSpecialBooleanAttr;
    exports.isString = isString;
    exports.isSymbol = isSymbol;
    exports.isVoidTag = isVoidTag;
    exports.looseEqual = looseEqual;
    exports.looseIndexOf = looseIndexOf;
    exports.makeMap = makeMap;
    exports.normalizeClass = normalizeClass;
    exports.normalizeStyle = normalizeStyle;
    exports.objectToString = objectToString;
    exports.parseStringStyle = parseStringStyle;
    exports.propsToAttrMap = propsToAttrMap;
    exports.remove = remove;
    exports.slotFlagsText = slotFlagsText;
    exports.stringifyStyle = stringifyStyle;
    exports.toDisplayString = toDisplayString;
    exports.toHandlerKey = toHandlerKey;
    exports.toNumber = toNumber;
    exports.toRawType = toRawType;
    exports.toTypeString = toTypeString;
});
// node_modules/@vue/shared/index.js
var require_shared = __commonJS((exports, module)=>{
    module.exports = require_shared_cjs();
});
// node_modules/@vue/reactivity/dist/reactivity.cjs.js
var require_reactivity_cjs = __commonJS((exports)=>{
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var shared = require_shared();
    var targetMap = new WeakMap();
    var effectStack = [];
    var activeEffect;
    var ITERATE_KEY = Symbol("iterate");
    var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
    function isEffect(fn) {
        return fn && fn._isEffect === true;
    }
    function effect3(fn, options = shared.EMPTY_OBJ) {
        if (isEffect(fn)) fn = fn.raw;
        const effect4 = createReactiveEffect(fn, options);
        if (!options.lazy) effect4();
        return effect4;
    }
    function stop2(effect4) {
        if (effect4.active) {
            cleanup(effect4);
            if (effect4.options.onStop) effect4.options.onStop();
            effect4.active = false;
        }
    }
    var uid = 0;
    function createReactiveEffect(fn, options) {
        const effect4 = function reactiveEffect() {
            if (!effect4.active) return fn();
            if (!effectStack.includes(effect4)) {
                cleanup(effect4);
                try {
                    enableTracking();
                    effectStack.push(effect4);
                    activeEffect = effect4;
                    return fn();
                } finally{
                    effectStack.pop();
                    resetTracking();
                    activeEffect = effectStack[effectStack.length - 1];
                }
            }
        };
        effect4.id = uid++;
        effect4.allowRecurse = !!options.allowRecurse;
        effect4._isEffect = true;
        effect4.active = true;
        effect4.raw = fn;
        effect4.deps = [];
        effect4.options = options;
        return effect4;
    }
    function cleanup(effect4) {
        const { deps  } = effect4;
        if (deps.length) {
            for(let i = 0; i < deps.length; i++)deps[i].delete(effect4);
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
            if (activeEffect.options.onTrack) activeEffect.options.onTrack({
                effect: activeEffect,
                target,
                type,
                key
            });
        }
    }
    function trigger(target, type, key, newValue, oldValue, oldTarget) {
        const depsMap = targetMap.get(target);
        if (!depsMap) return;
        const effects = new Set();
        const add2 = (effectsToAdd)=>{
            if (effectsToAdd) effectsToAdd.forEach((effect4)=>{
                if (effect4 !== activeEffect || effect4.allowRecurse) effects.add(effect4);
            });
        };
        if (type === "clear") depsMap.forEach(add2);
        else if (key === "length" && shared.isArray(target)) depsMap.forEach((dep, key2)=>{
            if (key2 === "length" || key2 >= newValue) add2(dep);
        });
        else {
            if (key !== void 0) add2(depsMap.get(key));
            switch(type){
                case "add":
                    if (!shared.isArray(target)) {
                        add2(depsMap.get(ITERATE_KEY));
                        if (shared.isMap(target)) add2(depsMap.get(MAP_KEY_ITERATE_KEY));
                    } else if (shared.isIntegerKey(key)) add2(depsMap.get("length"));
                    break;
                case "delete":
                    if (!shared.isArray(target)) {
                        add2(depsMap.get(ITERATE_KEY));
                        if (shared.isMap(target)) add2(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                    break;
                case "set":
                    if (shared.isMap(target)) add2(depsMap.get(ITERATE_KEY));
                    break;
            }
        }
        const run = (effect4)=>{
            if (effect4.options.onTrigger) effect4.options.onTrigger({
                effect: effect4,
                target,
                key,
                type,
                newValue,
                oldValue,
                oldTarget
            });
            if (effect4.options.scheduler) effect4.options.scheduler(effect4);
            else effect4();
        };
        effects.forEach(run);
    }
    var isNonTrackableKeys = /* @__PURE__ */ shared.makeMap(`__proto__,__v_isRef,__isVue`);
    var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key)=>Symbol[key]
    ).filter(shared.isSymbol));
    var get2 = /* @__PURE__ */ createGetter();
    var shallowGet = /* @__PURE__ */ createGetter(false, true);
    var readonlyGet = /* @__PURE__ */ createGetter(true);
    var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
    var arrayInstrumentations = {
    };
    [
        "includes",
        "indexOf",
        "lastIndexOf"
    ].forEach((key)=>{
        const method = Array.prototype[key];
        arrayInstrumentations[key] = function(...args) {
            const arr = toRaw2(this);
            for(let i = 0, l = this.length; i < l; i++)track(arr, "get", i + "");
            const res = method.apply(arr, args);
            if (res === -1 || res === false) return method.apply(arr, args.map(toRaw2));
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
    function createGetter(isReadonly2 = false, shallow = false) {
        return function get3(target, key, receiver) {
            if (key === "__v_isReactive") return !isReadonly2;
            else if (key === "__v_isReadonly") return isReadonly2;
            else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) return target;
            const targetIsArray = shared.isArray(target);
            if (!isReadonly2 && targetIsArray && shared.hasOwn(arrayInstrumentations, key)) return Reflect.get(arrayInstrumentations, key, receiver);
            const res = Reflect.get(target, key, receiver);
            if (shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
            if (!isReadonly2) track(target, "get", key);
            if (shallow) return res;
            if (isRef(res)) {
                const shouldUnwrap = !targetIsArray || !shared.isIntegerKey(key);
                return shouldUnwrap ? res.value : res;
            }
            if (shared.isObject(res)) return isReadonly2 ? readonly(res) : reactive3(res);
            return res;
        };
    }
    var set2 = /* @__PURE__ */ createSetter();
    var shallowSet = /* @__PURE__ */ createSetter(true);
    function createSetter(shallow = false) {
        return function set3(target, key, value, receiver) {
            let oldValue = target[key];
            if (!shallow) {
                value = toRaw2(value);
                oldValue = toRaw2(oldValue);
                if (!shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
                    oldValue.value = value;
                    return true;
                }
            }
            const hadKey = shared.isArray(target) && shared.isIntegerKey(key) ? Number(key) < target.length : shared.hasOwn(target, key);
            const result = Reflect.set(target, key, value, receiver);
            if (target === toRaw2(receiver)) {
                if (!hadKey) trigger(target, "add", key, value);
                else if (shared.hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
            }
            return result;
        };
    }
    function deleteProperty(target, key) {
        const hadKey = shared.hasOwn(target, key);
        const oldValue = target[key];
        const result = Reflect.deleteProperty(target, key);
        if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
        return result;
    }
    function has(target, key) {
        const result = Reflect.has(target, key);
        if (!shared.isSymbol(key) || !builtInSymbols.has(key)) track(target, "has", key);
        return result;
    }
    function ownKeys(target) {
        track(target, "iterate", shared.isArray(target) ? "length" : ITERATE_KEY);
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
            console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
            return true;
        },
        deleteProperty (target, key) {
            console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
            return true;
        }
    };
    var shallowReactiveHandlers = shared.extend({
    }, mutableHandlers, {
        get: shallowGet,
        set: shallowSet
    });
    var shallowReadonlyHandlers = shared.extend({
    }, readonlyHandlers, {
        get: shallowReadonlyGet
    });
    var toReactive = (value)=>shared.isObject(value) ? reactive3(value) : value
    ;
    var toReadonly = (value)=>shared.isObject(value) ? readonly(value) : value
    ;
    var toShallow = (value)=>value
    ;
    var getProto = (v)=>Reflect.getPrototypeOf(v)
    ;
    function get$1(target, key, isReadonly2 = false, isShallow = false) {
        target = target["__v_raw"];
        const rawTarget = toRaw2(target);
        const rawKey = toRaw2(key);
        if (key !== rawKey) !isReadonly2 && track(rawTarget, "get", key);
        !isReadonly2 && track(rawTarget, "get", rawKey);
        const { has: has2  } = getProto(rawTarget);
        const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
        if (has2.call(rawTarget, key)) return wrap(target.get(key));
        else if (has2.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
        else if (target !== rawTarget) target.get(key);
    }
    function has$1(key, isReadonly2 = false) {
        const target = this["__v_raw"];
        const rawTarget = toRaw2(target);
        const rawKey = toRaw2(key);
        if (key !== rawKey) !isReadonly2 && track(rawTarget, "has", key);
        !isReadonly2 && track(rawTarget, "has", rawKey);
        return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly2 = false) {
        target = target["__v_raw"];
        !isReadonly2 && track(toRaw2(target), "iterate", ITERATE_KEY);
        return Reflect.get(target, "size", target);
    }
    function add(value) {
        value = toRaw2(value);
        const target = toRaw2(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
            target.add(value);
            trigger(target, "add", value, value);
        }
        return this;
    }
    function set$1(key, value) {
        value = toRaw2(value);
        const target = toRaw2(this);
        const { has: has2 , get: get3  } = getProto(target);
        let hadKey = has2.call(target, key);
        if (!hadKey) {
            key = toRaw2(key);
            hadKey = has2.call(target, key);
        } else checkIdentityKeys(target, has2, key);
        const oldValue = get3.call(target, key);
        target.set(key, value);
        if (!hadKey) trigger(target, "add", key, value);
        else if (shared.hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
        return this;
    }
    function deleteEntry(key) {
        const target = toRaw2(this);
        const { has: has2 , get: get3  } = getProto(target);
        let hadKey = has2.call(target, key);
        if (!hadKey) {
            key = toRaw2(key);
            hadKey = has2.call(target, key);
        } else checkIdentityKeys(target, has2, key);
        const oldValue = get3 ? get3.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) trigger(target, "delete", key, void 0, oldValue);
        return result;
    }
    function clear() {
        const target = toRaw2(this);
        const hadItems = target.size !== 0;
        const oldTarget = shared.isMap(target) ? new Map(target) : new Set(target);
        const result = target.clear();
        if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
        return result;
    }
    function createForEach(isReadonly2, isShallow) {
        return function forEach(callback, thisArg) {
            const observed = this;
            const target = observed["__v_raw"];
            const rawTarget = toRaw2(target);
            const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
            !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
            return target.forEach((value, key)=>{
                return callback.call(thisArg, wrap(value), wrap(key), observed);
            });
        };
    }
    function createIterableMethod(method, isReadonly2, isShallow) {
        return function(...args) {
            const target = this["__v_raw"];
            const rawTarget = toRaw2(target);
            const targetIsMap = shared.isMap(rawTarget);
            const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
            const isKeyOnly = method === "keys" && targetIsMap;
            const innerIterator = target[method](...args);
            const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
            !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
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
            {
                const key = args[0] ? `on key "${args[0]}" ` : ``;
                console.warn(`${shared.capitalize(type)} operation ${key}failed: target is readonly.`, toRaw2(this));
            }
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
    function createInstrumentationGetter(isReadonly2, shallow) {
        const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
        return (target, key, receiver)=>{
            if (key === "__v_isReactive") return !isReadonly2;
            else if (key === "__v_isReadonly") return isReadonly2;
            else if (key === "__v_raw") return target;
            return Reflect.get(shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
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
    function checkIdentityKeys(target, has2, key) {
        const rawKey = toRaw2(key);
        if (rawKey !== key && has2.call(target, rawKey)) {
            const type = shared.toRawType(target);
            console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
        }
    }
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
        return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(shared.toRawType(value));
    }
    function reactive3(target) {
        if (target && target["__v_isReadonly"]) return target;
        return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    function shallowReactive(target) {
        return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
    }
    function readonly(target) {
        return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    function shallowReadonly(target) {
        return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
        if (!shared.isObject(target)) {
            console.warn(`value cannot be made reactive: ${String(target)}`);
            return target;
        }
        if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) return target;
        const existingProxy = proxyMap.get(target);
        if (existingProxy) return existingProxy;
        const targetType = getTargetType(target);
        if (targetType === 0) return target;
        const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }
    function isReactive2(value) {
        if (isReadonly(value)) return isReactive2(value["__v_raw"]);
        return !!(value && value["__v_isReactive"]);
    }
    function isReadonly(value) {
        return !!(value && value["__v_isReadonly"]);
    }
    function isProxy(value) {
        return isReactive2(value) || isReadonly(value);
    }
    function toRaw2(observed) {
        return observed && toRaw2(observed["__v_raw"]) || observed;
    }
    function markRaw(value) {
        shared.def(value, "__v_skip", true);
        return value;
    }
    var convert = (val)=>shared.isObject(val) ? reactive3(val) : val
    ;
    function isRef(r) {
        return Boolean(r && r.__v_isRef === true);
    }
    function ref(value) {
        return createRef(value);
    }
    function shallowRef(value) {
        return createRef(value, true);
    }
    var RefImpl = class {
        constructor(_rawValue, _shallow = false){
            this._rawValue = _rawValue;
            this._shallow = _shallow;
            this.__v_isRef = true;
            this._value = _shallow ? _rawValue : convert(_rawValue);
        }
        get value() {
            track(toRaw2(this), "get", "value");
            return this._value;
        }
        set value(newVal) {
            if (shared.hasChanged(toRaw2(newVal), this._rawValue)) {
                this._rawValue = newVal;
                this._value = this._shallow ? newVal : convert(newVal);
                trigger(toRaw2(this), "set", "value", newVal);
            }
        }
    };
    function createRef(rawValue, shallow = false) {
        if (isRef(rawValue)) return rawValue;
        return new RefImpl(rawValue, shallow);
    }
    function triggerRef(ref2) {
        trigger(toRaw2(ref2), "set", "value", ref2.value);
    }
    function unref(ref2) {
        return isRef(ref2) ? ref2.value : ref2;
    }
    var shallowUnwrapHandlers = {
        get: (target, key, receiver)=>unref(Reflect.get(target, key, receiver))
        ,
        set: (target, key, value, receiver)=>{
            const oldValue = target[key];
            if (isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            } else return Reflect.set(target, key, value, receiver);
        }
    };
    function proxyRefs(objectWithRefs) {
        return isReactive2(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    var CustomRefImpl = class {
        constructor(factory){
            this.__v_isRef = true;
            const { get: get3 , set: set3  } = factory(()=>track(this, "get", "value")
            , ()=>trigger(this, "set", "value")
            );
            this._get = get3;
            this._set = set3;
        }
        get value() {
            return this._get();
        }
        set value(newVal) {
            this._set(newVal);
        }
    };
    function customRef(factory) {
        return new CustomRefImpl(factory);
    }
    function toRefs(object) {
        if (!isProxy(object)) console.warn(`toRefs() expects a reactive object but received a plain one.`);
        const ret = shared.isArray(object) ? new Array(object.length) : {
        };
        for(const key in object)ret[key] = toRef(object, key);
        return ret;
    }
    var ObjectRefImpl = class {
        constructor(_object, _key){
            this._object = _object;
            this._key = _key;
            this.__v_isRef = true;
        }
        get value() {
            return this._object[this._key];
        }
        set value(newVal) {
            this._object[this._key] = newVal;
        }
    };
    function toRef(object, key) {
        return isRef(object[key]) ? object[key] : new ObjectRefImpl(object, key);
    }
    var ComputedRefImpl = class {
        constructor(getter, _setter, isReadonly2){
            this._setter = _setter;
            this._dirty = true;
            this.__v_isRef = true;
            this.effect = effect3(getter, {
                lazy: true,
                scheduler: ()=>{
                    if (!this._dirty) {
                        this._dirty = true;
                        trigger(toRaw2(this), "set", "value");
                    }
                }
            });
            this["__v_isReadonly"] = isReadonly2;
        }
        get value() {
            const self2 = toRaw2(this);
            if (self2._dirty) {
                self2._value = this.effect();
                self2._dirty = false;
            }
            track(self2, "get", "value");
            return self2._value;
        }
        set value(newValue) {
            this._setter(newValue);
        }
    };
    function computed(getterOrOptions) {
        let getter;
        let setter;
        if (shared.isFunction(getterOrOptions)) {
            getter = getterOrOptions;
            setter = ()=>{
                console.warn("Write operation failed: computed value is readonly");
            };
        } else {
            getter = getterOrOptions.get;
            setter = getterOrOptions.set;
        }
        return new ComputedRefImpl(getter, setter, shared.isFunction(getterOrOptions) || !getterOrOptions.set);
    }
    exports.ITERATE_KEY = ITERATE_KEY;
    exports.computed = computed;
    exports.customRef = customRef;
    exports.effect = effect3;
    exports.enableTracking = enableTracking;
    exports.isProxy = isProxy;
    exports.isReactive = isReactive2;
    exports.isReadonly = isReadonly;
    exports.isRef = isRef;
    exports.markRaw = markRaw;
    exports.pauseTracking = pauseTracking;
    exports.proxyRefs = proxyRefs;
    exports.reactive = reactive3;
    exports.readonly = readonly;
    exports.ref = ref;
    exports.resetTracking = resetTracking;
    exports.shallowReactive = shallowReactive;
    exports.shallowReadonly = shallowReadonly;
    exports.shallowRef = shallowRef;
    exports.stop = stop2;
    exports.toRaw = toRaw2;
    exports.toRef = toRef;
    exports.toRefs = toRefs;
    exports.track = track;
    exports.trigger = trigger;
    exports.triggerRef = triggerRef;
    exports.unref = unref;
});
// node_modules/@vue/reactivity/index.js
var require_reactivity = __commonJS((exports, module)=>{
    module.exports = require_reactivity_cjs();
});
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
    let cleanup = ()=>{
    };
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
        cleanup = ()=>{
            if (effectReference === void 0) return;
            el._x_effects.delete(effectReference);
            release(effectReference);
        };
    };
    return [
        wrappedEffect,
        ()=>{
            cleanup();
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
function onElRemoved(callback) {
    onElRemoveds.push(callback);
}
function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
}
function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups) el._x_attributeCleanups = {
    };
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
            let add = ()=>{
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
            if (el.hasAttribute(name) && oldValue === null) add();
            else if (el.hasAttribute(name)) {
                remove();
                add();
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
function refreshScope(element, scope) {
    let existingScope = element._x_dataStack[0];
    Object.entries(scope).forEach(([key, value])=>{
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
    let thisProxy = new Proxy({
    }, {
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
            }) || {
            })[name];
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
    let isObject = (val)=>typeof val === "object" && !Array.isArray(val) && val !== null
    ;
    let recurse = (obj, basePath = "")=>{
        Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value , enumerable  }])=>{
            if (enumerable === false || value === void 0) return;
            let path = basePath === "" ? key : `${basePath}.${key}`;
            if (typeof value === "object" && value !== null && value._x_interceptor) obj[key] = value.initialize(data2, path, key);
            else if (isObject(value) && value !== obj && !(value instanceof Element)) recurse(value, path);
        });
    };
    return recurse(data2);
}
function interceptor(callback, mutateObj = ()=>{
}) {
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
            obj[path[0]] = {
            };
            return set(obj[path[0]], path.slice(1), value);
        }
    }
}
// packages/alpinejs/src/magics.js
var magics = {
};
function magic(name, callback) {
    magics[name] = callback;
}
function injectMagics(obj, el) {
    Object.entries(magics).forEach(([name, callback])=>{
        Object.defineProperty(obj, `$${name}`, {
            get () {
                return callback(el, {
                    Alpine: alpine_default,
                    interceptor
                });
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
function evaluate(el, expression, extras = {
}) {
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
    let overriddenMagics = {
    };
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
    return (receiver = ()=>{
    }, { scope ={
    } , params =[]  } = {
    })=>{
        let result = func.apply(mergeProxies([
            scope,
            ...dataStack
        ]), params);
        runIfTypeOfFunction(receiver, result);
    };
}
var evaluatorMemo = {
};
function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) return evaluatorMemo[expression];
    let AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
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
    return (receiver = ()=>{
    }, { scope ={
    } , params =[]  } = {
    })=>{
        func.result = void 0;
        func.finished = false;
        let completeScope = mergeProxies([
            scope,
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
function runIfTypeOfFunction(receiver, value, scope, params, el) {
    if (typeof value === "function") {
        let result = value.apply(scope, params);
        if (result instanceof Promise) result.then((i)=>runIfTypeOfFunction(receiver, i, scope, params)
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
var directiveHandlers = {
};
function directive(name, callback) {
    directiveHandlers[name] = callback;
}
function directives(el, attributes, originalAttributeOverride) {
    let transformedAttributeMap = {
    };
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
function getDirectiveHandler(el, directive2) {
    let noop = ()=>{
    };
    let handler3 = directiveHandlers[directive2.type] || noop;
    let cleanups = [];
    let cleanup = (callback)=>cleanups.push(callback)
    ;
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
        Alpine: alpine_default,
        effect: effect3,
        cleanup,
        evaluateLater: evaluateLater.bind(evaluateLater, el),
        evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = ()=>cleanups.forEach((i)=>i()
        )
    ;
    onAttributeRemoved(el, directive2.original, doCleanup);
    let fullHandler = ()=>{
        if (el._x_ignore || el._x_ignoreSelf) return;
        handler3.inline && handler3.inline(el, directive2, utilities);
        handler3 = handler3.bind(handler3, el, directive2, utilities);
        isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler3) : handler3();
    };
    fullHandler.runCleanups = doCleanup;
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
function toTransformedAttributes(callback = ()=>{
}) {
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
    "model",
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
function dispatch(el, name, detail = {
}) {
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
function nextTick(callback) {
    tickStack.push(callback);
    queueMicrotask(()=>{
        isHolding || setTimeout(()=>{
            releaseNextTicks();
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
    let previousStyles = {
    };
    Object.entries(value).forEach(([key, value2])=>{
        previousStyles[key] = el.style[key];
        el.style.setProperty(kebabCase(key), value2);
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
        el.setAttribute("style", cache);
    };
}
function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
// packages/alpinejs/src/utils/once.js
function once(callback, fallback = ()=>{
}) {
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
    let durationIn = modifierValue(modifiers, "duration", 150) / 1000;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1000;
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
function registerTransitionObject(el, setFunction, defaultValue = {
}) {
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
        in (before = ()=>{
        }, after = ()=>{
        }) {
            transition(el, setFunction, {
                during: this.enter.during,
                start: this.enter.start,
                end: this.enter.end
            }, before, after);
        },
        out (before = ()=>{
        }, after = ()=>{
        }) {
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
        el._x_transition.out(()=>{
        }, ()=>resolve(hide)
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
function transition(el, setFunction, { during , start: start2 , end  } = {
}, before = ()=>{
}, after = ()=>{
}) {
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
        let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1000;
        let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1000;
        if (duration === 0) duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1000;
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
function skipDuringClone(callback, fallback = ()=>{
}) {
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
        return ()=>{
        };
    });
    callback();
    overrideEffect(cache);
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
var stores = {
};
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
// packages/alpinejs/src/datas.js
var datas = {
};
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
    version: "3.7.0",
    flushAndStopDeferringMutations,
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
    data
};
var alpine_default = Alpine;
// packages/alpinejs/src/index.js
var import_reactivity9 = __toModule(require_reactivity());
// packages/alpinejs/src/magics/$nextTick.js
magic("nextTick", ()=>nextTick
);
// packages/alpinejs/src/magics/$dispatch.js
magic("dispatch", (el)=>dispatch.bind(dispatch, el)
);
// packages/alpinejs/src/magics/$watch.js
magic("watch", (el)=>(key, callback)=>{
        let evaluate2 = evaluateLater(el, key);
        let firstTime = true;
        let oldValue;
        effect(()=>evaluate2((value)=>{
                let div = document.createElement("div");
                div.dataset.throwAway = value;
                if (!firstTime) queueMicrotask(()=>{
                    callback(value, oldValue);
                    oldValue = value;
                });
                else oldValue = value;
                firstTime = false;
            })
        );
    }
);
// packages/alpinejs/src/magics/$store.js
magic("store", getStores);
// packages/alpinejs/src/magics/$data.js
magic("data", (el)=>{
    return mergeProxies(closestDataStack(el));
});
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
var globalIdMemo = {
};
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
    if (!el._x_ids) el._x_ids = {
    };
    if (!el._x_ids[name]) el._x_ids[name] = findAndIncrementId(name);
}
// packages/alpinejs/src/magics/$id.js
magic("id", (el)=>(name, key = null)=>{
        let root = closestIdRoot(el, name);
        let id = root ? root._x_ids[name] : findAndIncrementId(name);
        return key ? new AlpineId(`${name}-${id}-${key}`) : new AlpineId(`${name}-${id}`);
    }
);
var AlpineId = class {
    constructor(id){
        this.id = id;
    }
    toString() {
        return this.id;
    }
};
// packages/alpinejs/src/magics/$el.js
magic("el", (el)=>el
);
// packages/alpinejs/src/directives/x-teleport.js
directive("teleport", (el, { expression  }, { cleanup  })=>{
    let target = document.querySelector(expression);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    if (el._x_forwardEvents) el._x_forwardEvents.forEach((eventName)=>{
        clone2.addEventListener(eventName, (e)=>{
            e.stopPropagation();
            el.dispatchEvent(new e.constructor(e.type, e));
        });
    });
    addScopeToNode(clone2, {
    }, el);
    mutateDom(()=>{
        target.appendChild(clone2);
        initTree(clone2);
        clone2._x_ignore = true;
    });
    cleanup(()=>clone2.remove()
    );
});
// packages/alpinejs/src/directives/x-ignore.js
var handler = ()=>{
};
handler.inline = (el, { modifiers  }, { cleanup  })=>{
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup(()=>{
        modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
};
directive("ignore", handler);
// packages/alpinejs/src/directives/x-effect.js
directive("effect", (el, { expression  }, { effect: effect3  })=>effect3(evaluateLater(el, expression))
);
// packages/alpinejs/src/utils/bind.js
function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings) el._x_bindings = reactive({
    });
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
        "aria-expanded"
    ].includes(name);
}
// packages/alpinejs/src/utils/on.js
function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler3 = (e)=>callback(e)
    ;
    let options = {
    };
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
            if (el.offsetWidth < 1 && el.offsetHeight < 1) return;
            if (el._x_isShown === false) return;
            next(e);
        });
    }
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
    if (modifiers.includes("once")) handler3 = wrapHandler(handler3, (next, e)=>{
        next(e);
        listenerTarget.removeEventListener(event, handler3, options);
    });
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
directive("model", (el, { modifiers , expression  }, { effect: effect3 , cleanup  })=>{
    let evaluate2 = evaluateLater(el, expression);
    let assignmentExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
    let evaluateAssignment = evaluateLater(el, assignmentExpression);
    var event = el.tagName.toLowerCase() === "select" || [
        "checkbox",
        "radio"
    ].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let assigmentFunction = generateAssignmentFunction(el, modifiers, expression);
    let removeListener = on(el, event, modifiers, (e)=>{
        evaluateAssignment(()=>{
        }, {
            scope: {
                $event: e,
                rightSideOfExpression: assigmentFunction
            }
        });
    });
    cleanup(()=>removeListener()
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
            evaluateSetModel(()=>{
            }, {
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
directive("init", skipDuringClone((el, { expression  })=>{
    if (typeof expression === "string") return !!expression.trim() && evaluate(el, expression, {
    }, false);
    return evaluate(el, expression, {
    }, false);
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
            el.innerHTML = value;
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
    let getBindings = evaluateLater(el, expression);
    let cleanupRunners = [];
    effect3(()=>{
        while(cleanupRunners.length)cleanupRunners.pop()();
        getBindings((bindings)=>{
            let attributes = Object.entries(bindings).map(([name, value])=>({
                    name,
                    value
                })
            );
            attributes = attributes.filter((attr)=>{
                return !(typeof attr.value === "object" && !Array.isArray(attr.value) && attr.value !== null);
            });
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
        });
    });
}
function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
}
// packages/alpinejs/src/directives/x-data.js
addRootSelector(()=>`[${prefix("data")}]`
);
directive("data", skipDuringClone((el, { expression  }, { cleanup  })=>{
    expression = expression === "" ? "{}" : expression;
    let magicContext = {
    };
    injectMagics(magicContext, el);
    let dataProviderContext = {
    };
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, {
        scope: dataProviderContext
    });
    if (data2 === void 0) data2 = {
    };
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup(()=>{
        undo();
        reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
    });
}));
// packages/alpinejs/src/directives/x-show.js
directive("show", (el, { modifiers , expression  }, { effect: effect3  })=>{
    let evaluate2 = evaluateLater(el, expression);
    let hide = ()=>mutateDom(()=>{
            el.style.display = "none";
            el._x_isShown = false;
        })
    ;
    let show = ()=>mutateDom(()=>{
            if (el.style.length === 1 && el.style.display === "none") el.removeAttribute("style");
            else el.style.removeProperty("display");
            el._x_isShown = true;
        })
    ;
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
directive("for", (el, { expression  }, { effect: effect3 , cleanup  })=>{
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(el, el._x_keyExpression || "index");
    el._x_prevKeys = [];
    el._x_lookup = {
    };
    effect3(()=>loop(el, iteratorNames, evaluateItems, evaluateKey)
    );
    cleanup(()=>{
        Object.values(el._x_lookup).forEach((el2)=>el2.remove()
        );
        delete el._x_prevKeys;
        delete el._x_lookup;
    });
});
function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject = (i)=>typeof i === "object" && !Array.isArray(i)
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
        if (isObject(items)) items = Object.entries(items).map(([key, value])=>{
            let scope = getIterationScopeVariables(iteratorNames, value, key, items);
            evaluateKey((value2)=>keys.push(value2)
            , {
                scope: {
                    index: key,
                    ...scope
                }
            });
            scopes.push(scope);
        });
        else for(let i8 = 0; i8 < items.length; i8++){
            let scope = getIterationScopeVariables(iteratorNames, items[i8], i8, items);
            evaluateKey((value)=>keys.push(value)
            , {
                scope: {
                    index: i8,
                    ...scope
                }
            });
            scopes.push(scope);
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
            let scope = scopes[index];
            let key = keys[index];
            let clone2 = document.importNode(templateEl.content, true).firstElementChild;
            addScopeToNode(clone2, reactive(scope), templateEl);
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
    let res = {
    };
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
    let scopeVariables = {
    };
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
function handler2() {
}
handler2.inline = (el, { expression  }, { cleanup  })=>{
    let root = closestRoot(el);
    if (!root._x_refs) root._x_refs = {
    };
    root._x_refs[expression] = el;
    cleanup(()=>delete root._x_refs[expression]
    );
};
directive("ref", handler2);
// packages/alpinejs/src/directives/x-if.js
directive("if", (el, { expression  }, { effect: effect3 , cleanup  })=>{
    let evaluate2 = evaluateLater(el, expression);
    let show = ()=>{
        if (el._x_currentIfEl) return el._x_currentIfEl;
        let clone2 = el.content.cloneNode(true).firstElementChild;
        addScopeToNode(clone2, {
        }, el);
        mutateDom(()=>{
            el.after(clone2);
            initTree(clone2);
        });
        el._x_currentIfEl = clone2;
        el._x_undoIf = ()=>{
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
    cleanup(()=>el._x_undoIf && el._x_undoIf()
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
directive("on", skipDuringClone((el, { value , modifiers , expression  }, { cleanup  })=>{
    let evaluate2 = expression ? evaluateLater(el, expression) : ()=>{
    };
    if (el.tagName.toLowerCase() === "template") {
        if (!el._x_forwardEvents) el._x_forwardEvents = [];
        if (!el._x_forwardEvents.includes(value)) el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e)=>{
        evaluate2(()=>{
        }, {
            scope: {
                $event: e
            },
            params: [
                e
            ]
        });
    });
    cleanup(()=>removeListener()
    );
}));
// packages/alpinejs/src/index.js
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setReactivityEngine({
    reactive: import_reactivity9.reactive,
    effect: import_reactivity9.effect,
    release: import_reactivity9.stop,
    raw: import_reactivity9.toRaw
});
var src_default = alpine_default;
// packages/alpinejs/builds/module.js
var module_default = src_default;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"gCoGk":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"80ez2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>module_default
);
parcelHelpers.export(exports, "morph", ()=>morph
);
// packages/morph/src/morph.js
var resolveStep = ()=>{
};
var logger = ()=>{
};
function breakpoint(message) {
    if (!debug) return;
    message && logger(message.replace("\n", "\\n"));
    return new Promise((resolve)=>resolveStep = ()=>resolve()
    );
}
async function morph(from, toHtml, options) {
    assignOptions(options);
    let toEl = createElement(toHtml);
    if (window.Alpine && !from._x_dataStack) {
        toEl._x_dataStack = window.Alpine.closestDataStack(from);
        toEl._x_dataStack && window.Alpine.clone(from, toEl);
    }
    await breakpoint();
    patch(from, toEl);
    return from;
}
morph.step = ()=>resolveStep()
;
morph.log = (theLogger)=>{
    logger = theLogger;
};
var key;
var lookahead;
var updating;
var updated;
var removing;
var removed;
var adding;
var added;
var debug;
var noop = ()=>{
};
function assignOptions(options = {
}) {
    let defaultGetKey = (el)=>el.getAttribute("key")
    ;
    updating = options.updating || noop;
    updated = options.updated || noop;
    removing = options.removing || noop;
    removed = options.removed || noop;
    adding = options.adding || noop;
    added = options.added || noop;
    key = options.key || defaultGetKey;
    lookahead = options.lookahead || true;
    debug = options.debug || false;
}
function createElement(html) {
    return document.createRange().createContextualFragment(html).firstElementChild;
}
async function patch(from, to) {
    if (differentElementNamesTypesOrKeys(from, to)) {
        let result = patchElement(from, to);
        await breakpoint("Swap elements");
        return result;
    }
    let updateChildrenOnly = false;
    if (shouldSkip(updating, from, to, ()=>updateChildrenOnly = true
    )) return;
    window.Alpine && initializeAlpineOnTo(from, to, ()=>updateChildrenOnly = true
    );
    if (textOrComment(to)) {
        await patchNodeValue(from, to);
        updated(from, to);
        return;
    }
    if (!updateChildrenOnly) await patchAttributes(from, to);
    updated(from, to);
    await patchChildren(from, to);
}
function differentElementNamesTypesOrKeys(from, to) {
    return from.nodeType != to.nodeType || from.nodeName != to.nodeName || getKey(from) != getKey(to);
}
function textOrComment(el) {
    return el.nodeType === 3 || el.nodeType === 8;
}
function patchElement(from, to) {
    if (shouldSkip(removing, from)) return;
    let toCloned = to.cloneNode(true);
    if (shouldSkip(adding, toCloned)) return;
    dom(from).replace(toCloned);
    removed(from);
    added(toCloned);
}
async function patchNodeValue(from, to) {
    let value = to.nodeValue;
    if (from.nodeValue !== value) {
        from.nodeValue = value;
        await breakpoint("Change text node to: " + value);
    }
}
async function patchAttributes(from, to) {
    if (from._x_isShown && !to._x_isShown) return;
    if (!from._x_isShown && to._x_isShown) return;
    let domAttributes = Array.from(from.attributes);
    let toAttributes = Array.from(to.attributes);
    for(let i = domAttributes.length - 1; i >= 0; i--){
        let name = domAttributes[i].name;
        if (!to.hasAttribute(name)) {
            from.removeAttribute(name);
            await breakpoint("Remove attribute");
        }
    }
    for(let i1 = toAttributes.length - 1; i1 >= 0; i1--){
        let name = toAttributes[i1].name;
        let value = toAttributes[i1].value;
        if (from.getAttribute(name) !== value) {
            from.setAttribute(name, value);
            await breakpoint(`Set [${name}] attribute to: "${value}"`);
        }
    }
}
async function patchChildren(from, to) {
    let domChildren = from.childNodes;
    let toChildren = to.childNodes;
    let toKeyToNodeMap = keyToMap(toChildren);
    let domKeyDomNodeMap = keyToMap(domChildren);
    let currentTo = dom(to).nodes().first();
    let currentFrom = dom(from).nodes().first();
    let domKeyHoldovers = {
    };
    while(currentTo){
        let toKey = getKey(currentTo);
        let domKey = getKey(currentFrom);
        if (!currentFrom) {
            if (toKey && domKeyHoldovers[toKey]) {
                let holdover = domKeyHoldovers[toKey];
                dom.append(from, holdover);
                currentFrom = holdover;
                await breakpoint("Add element (from key)");
            } else {
                let added2 = addNodeTo(currentTo, from);
                await breakpoint("Add element: " + added2.outerHTML);
                currentTo = dom(currentTo).nodes().next();
                continue;
            }
        }
        if (lookahead) {
            let nextToElementSibling = dom(currentTo).next();
            if (nextToElementSibling && currentFrom.isEqualNode(nextToElementSibling)) {
                currentFrom = addNodeBefore(currentTo, currentFrom);
                domKey = getKey(currentFrom);
                await breakpoint("Move element (lookahead)");
            }
        }
        if (toKey !== domKey) {
            if (!toKey && domKey) {
                domKeyHoldovers[domKey] = currentFrom;
                currentFrom = addNodeBefore(currentTo, currentFrom);
                domKeyHoldovers[domKey].remove();
                currentFrom = dom(currentFrom).nodes.next();
                currentTo = dom(currentTo).nodes.next();
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
                    await breakpoint("I dont even know what this does");
                    continue;
                }
            }
        }
        await patch(currentFrom, currentTo);
        currentTo = currentTo && dom(currentTo).next();
        currentFrom = currentFrom && dom(currentFrom).next();
    }
    while(currentFrom){
        if (!shouldSkip(removing, currentFrom)) {
            let domForRemoval = currentFrom;
            domForRemoval.remove();
            await breakpoint("remove el");
            removed(domForRemoval);
        }
        currentFrom = dom(currentFrom).nodes().next();
    }
}
function getKey(el) {
    return el && el.nodeType === 1 && key(el);
}
function keyToMap(els) {
    let map = {
    };
    els.forEach((el)=>{
        let theKey = getKey(el);
        if (theKey) map[theKey] = el;
    });
    return map;
}
function shouldSkip(hook, ...args) {
    let skip = false;
    hook(...args, ()=>skip = true
    );
    return skip;
}
function addNodeTo(node, parent) {
    if (!shouldSkip(adding, node)) {
        let clone = node.cloneNode(true);
        dom(parent).append(clone);
        added(clone);
        return clone;
    }
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
function initializeAlpineOnTo(from, to, childrenOnly) {
    if (from.nodeType !== 1) return;
    if (from._x_dataStack) window.Alpine.clone(from, to);
}
function dom(el) {
    return new DomManager(el);
}
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
    teleportTo(el1) {
        if (!el1) return el1;
        if (el1._x_teleport) return el1._x_teleport;
        return el1;
    }
    teleportBack(el2) {
        if (!el2) return el2;
        if (el2._x_teleportBack) return el2._x_teleportBack;
        return el2;
    }
};
// packages/morph/src/index.js
function src_default(Alpine) {
    Alpine.morph = morph;
}
// packages/morph/builds/module.js
var module_default = src_default;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"lgns0":[function(require,module,exports) {
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
                exports: {
                }
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
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {
    }, "default", module && module.__esModule && "default" in module ? {
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
            merged2[current.name] = existing ? Object.assign({
            }, existing, current, {
                options: Object.assign({
                }, existing.options, current.options),
                data: Object.assign({
                }, existing.data, current.data)
            }) : current;
            return merged2;
        }, {
        });
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
        return Object.assign({
        }, rect, {
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
        return Object.assign({
        }, getFreshSideObject(), paddingObject);
    }
    function expandToHashMap(value, keys) {
        return keys.reduce(function(hashMap, key) {
            hashMap[key] = value;
            return hashMap;
        }, {
        });
    }
    function detectOverflow(state, options) {
        if (options === void 0) options = {
        };
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
        var popperClientRect = rectToClientRect(Object.assign({
        }, popperRect, popperOffsets2));
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
        if (generatorOptions === void 0) generatorOptions = {
        };
        var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
        return function createPopper2(reference2, popper2, options) {
            if (options === void 0) options = defaultOptions;
            var state = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({
                }, DEFAULT_OPTIONS, defaultOptions),
                modifiersData: {
                },
                elements: {
                    reference: reference2,
                    popper: popper2
                },
                attributes: {
                },
                styles: {
                }
            };
            var effectCleanupFns = [];
            var isDestroyed = false;
            var instance = {
                state,
                setOptions: function setOptions(options2) {
                    cleanupModifierEffects();
                    state.options = Object.assign({
                    }, defaultOptions, state.options, options2);
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
                        return state.modifiersData[modifier.name] = Object.assign({
                        }, modifier.data);
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
                        var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {
                        } : _state$orderedModifie2, name = _state$orderedModifie.name;
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
                    var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {
                    } : _ref3$options, effect2 = _ref3.effect;
                    if (typeof effect2 === "function") {
                        var cleanupFn = effect2({
                            state,
                            name,
                            instance,
                            options: options2
                        });
                        var noopFn = function noopFn2() {
                        };
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
        fn: function fn() {
        },
        effect: effect$2,
        data: {
        }
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
        data: {
        }
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
            return Object.assign({
            }, commonStyles, (_Object$assign = {
            }, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
        }
        return Object.assign({
        }, commonStyles, (_Object$assign2 = {
        }, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
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
        if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({
        }, state.styles.popper, mapToStyles(Object.assign({
        }, commonStyles, {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive,
            roundOffsets
        })));
        if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({
        }, state.styles.arrow, mapToStyles(Object.assign({
        }, commonStyles, {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
            roundOffsets
        })));
        state.attributes.popper = Object.assign({
        }, state.attributes.popper, {
            "data-popper-placement": state.placement
        });
    }
    var computeStyles$1 = {
        name: "computeStyles",
        enabled: true,
        phase: "beforeWrite",
        fn: computeStyles,
        data: {
        }
    };
    function applyStyles(_ref) {
        var state = _ref.state;
        Object.keys(state.elements).forEach(function(name) {
            var style = state.styles[name] || {
            };
            var attributes = state.attributes[name] || {
            };
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
            reference: {
            }
        };
        Object.assign(state.elements.popper.style, initialStyles.popper);
        state.styles = initialStyles;
        if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
        return function() {
            Object.keys(state.elements).forEach(function(name) {
                var element = state.elements[name];
                var attributes = state.attributes[name] || {
                };
                var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
                var style = styleProperties.reduce(function(style2, property) {
                    style2[property] = "";
                    return style2;
                }, {
                });
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
        var _ref = typeof offset2 === "function" ? offset2(Object.assign({
        }, rects, {
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
        }, {
        });
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
        if (options === void 0) options = {
        };
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
        }, {
        });
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
        var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({
        }, state.rects, {
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
        padding = typeof padding === "function" ? padding(Object.assign({
        }, state.rects, {
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
        state.modifiersData[name] = (_state$modifiersData$ = {
        }, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
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
        state.attributes.popper = Object.assign({
        }, state.attributes.popper, {
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
        return ({
        }).hasOwnProperty.call(obj, key);
    }
    function getValueAtIndexOrReturn(value, index, defaultValue) {
        if (Array.isArray(value)) {
            var v = value[index];
            return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
        }
        return value;
    }
    function isType(value, type) {
        var str = ({
        }).toString.call(value);
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
        var clone = Object.assign({
        }, obj);
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
        }, {
        });
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
        onAfterUpdate: function onAfterUpdate() {
        },
        onBeforeUpdate: function onBeforeUpdate() {
        },
        onCreate: function onCreate() {
        },
        onDestroy: function onDestroy() {
        },
        onHidden: function onHidden() {
        },
        onHide: function onHide() {
        },
        onMount: function onMount() {
        },
        onShow: function onShow() {
        },
        onShown: function onShown() {
        },
        onTrigger: function onTrigger() {
        },
        onUntrigger: function onUntrigger() {
        },
        onClickOutside: function onClickOutside() {
        },
        placement: "top",
        plugins: [],
        popperOptions: {
        },
        render: null,
        showOnCreate: false,
        touch: true,
        trigger: "mouseenter focus",
        triggerTarget: null
    }, pluginProps, {
    }, renderProps);
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
        }, {
        });
        return Object.assign({
        }, passedProps, {
        }, pluginProps2);
    }
    function getDataAttributeProps(reference, plugins) {
        var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({
        }, defaultProps, {
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
        }, {
        });
        return props;
    }
    function evaluateProps(reference, props) {
        var out = Object.assign({
        }, props, {
            content: invokeWithArgsOrReturn(props.content, [
                reference
            ])
        }, props.ignoreAttributes ? {
        } : getDataAttributeProps(reference, props.plugins));
        out.aria = Object.assign({
        }, defaultProps.aria, {
        }, out.aria);
        out.aria = {
            expanded: out.aria.expanded === "auto" ? props.interactive : out.aria.expanded,
            content: out.aria.content === "auto" ? props.interactive ? null : "describedby" : out.aria.content
        };
        return out;
    }
    function validateProps(partialProps, plugins) {
        if (partialProps === void 0) partialProps = {
        };
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
        var props = evaluateProps(reference, Object.assign({
        }, defaultProps, {
        }, getExtendedPassedProps(removeUndefinedProps(passedProps))));
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
                        state2.attributes.popper = {
                        };
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
            instance.popperInstance = core.createPopper(computedReference, popper, Object.assign({
            }, popperOptions, {
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
            var nextProps = evaluateProps(reference, Object.assign({
            }, instance.props, {
            }, partialProps, {
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
        return instance;
    }
    function tippy2(targets, optionalProps) {
        if (optionalProps === void 0) optionalProps = {
        };
        var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
        validateTargets(targets);
        validateProps(optionalProps, plugins);
        bindGlobalEventListeners();
        var passedProps = Object.assign({
        }, optionalProps, {
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
        var _ref = _temp === void 0 ? {
        } : _temp, excludedReferenceOrInstance = _ref.exclude, duration = _ref.duration;
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
    var applyStylesModifier = Object.assign({
    }, core.applyStyles, {
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
                reference: {
                }
            };
            Object.assign(state.elements.popper.style, initialStyles.popper);
            state.styles = initialStyles;
            if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
        }
    });
    var createSingleton = function createSingleton2(tippyInstances, optionalProps) {
        var _optionalProps$popper;
        if (optionalProps === void 0) optionalProps = {
        };
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
            }, {
            });
            singleton2.setProps(Object.assign({
            }, overrideProps, {
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
        var singleton = tippy2(div(), Object.assign({
        }, removeProperties(optionalProps, [
            "overrides"
        ]), {
            plugins: [
                plugin
            ].concat(optionalProps.plugins || []),
            triggerTarget: references,
            popperOptions: Object.assign({
            }, optionalProps.popperOptions, {
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
        var parentProps = Object.assign({
        }, nativeProps, {
            trigger: "manual",
            touch: false
        });
        var childProps = Object.assign({
        }, nativeProps, {
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
                return {
                };
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
            popperOptions: Object.assign({
            }, props.popperOptions, {
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
var import_tippy = __toModule(require_tippy_cjs());
function src_default(Alpine) {
    Alpine.directive("tooltip", (el, { modifiers , expression  }, { evaluateLater , effect  })=>{
        const getContent = evaluateLater(expression);
        const config = modifiers.length > 0 ? buildConfigFromModifiers(modifiers) : {
        };
        effect(()=>{
            getContent((content)=>{
                if (!el.__x_tippy) el.__x_tippy = (0, import_tippy.default)(el, config);
                el.__x_tippy.setContent(content);
            });
        });
    });
}
var buildConfigFromModifiers = (modifiers)=>{
    const config = {
        plugins: []
    };
    if (modifiers.includes("duration")) config.duration = parseInt(modifiers[modifiers.indexOf("duration") + 1]);
    if (modifiers.includes("delay")) config.delay = parseInt(modifiers[modifiers.indexOf("delay") + 1]);
    if (modifiers.includes("cursor")) {
        config.plugins.push(import_tippy.followCursor);
        const next = modifiers[modifiers.indexOf("cursor") + 1] ?? null;
        if ([
            "x",
            "initial"
        ].includes(next)) config.followCursor = next === "x" ? "horizontal" : "initial";
        else config.followCursor = true;
    }
    if (modifiers.includes("on")) config.trigger = modifiers[modifiers.indexOf("on") + 1];
    if (modifiers.includes("arrowless")) config.arrow = false;
    if (modifiers.includes("html")) config.allowHTML = true;
    if (modifiers.includes("interactive")) config.interactive = true;
    if (modifiers.includes("border") && config.interactive) config.interactiveBorder = parseInt(modifiers[modifiers.indexOf("border") + 1]);
    if (modifiers.includes("debounce") && config.interactive) config.interactiveDebounce = parseInt(modifiers[modifiers.indexOf("debounce") + 1]);
    if (modifiers.includes("max-width")) config.maxWidth = parseInt(modifiers[modifiers.indexOf("max-width") + 1]);
    if (modifiers.includes("theme")) config.theme = modifiers[modifiers.indexOf("theme") + 1];
    return config;
};
// builds/module.js
var module_default = src_default;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"55pfR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _helpers = require("@swc/helpers");
var _regeneratorRuntime = require("regenerator-runtime");
var _regeneratorRuntimeDefault = parcelHelpers.interopDefault(_regeneratorRuntime);
var _socket = require("../lib/socket");
var _socketDefault = parcelHelpers.interopDefault(_socket);
function page() {
    return {
        init: function() {
            var _this = this;
            var socket = _socketDefault.default(window.SOCKET_PATH);
            socket.addListener("Lookbook::ReloadChannel", function() {
                return _this.refresh();
            });
        },
        update: function() {
            return _helpers.asyncToGenerator(_regeneratorRuntimeDefault.default.mark(function _callee() {
                var response, html;
                return _regeneratorRuntimeDefault.default.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _ctx.next = 2;
                            return fetch(window.document.location);
                        case 2:
                            response = _ctx.sent;
                            if (response.ok) {
                                _ctx.next = 5;
                                break;
                            }
                            return _ctx.abrupt("return", window.location.reload());
                        case 5:
                            _ctx.next = 7;
                            return response.text();
                        case 7:
                            html = _ctx.sent;
                            this.morph(new DOMParser().parseFromString(html, "text/html"));
                        case 9:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee, this);
            })).apply(this);
        },
        setLocation: function(loc) {
            var path = loc instanceof Event ? loc.currentTarget.href : loc;
            history.pushState({
            }, null, path);
            this.$dispatch("popstate");
        },
        refresh: function() {
            this.$dispatch("popstate");
        },
        morph: function(dom) {
            var pageHtml = dom.getElementById(this.$root.id).outerHTML;
            Alpine.morph(this.$root, pageHtml, {
                key: function(el) {
                    return el.getAttribute("key") ? el.getAttribute("key") : el.id;
                }
            });
            this.$dispatch("page:morphed");
        }
    };
}
exports.default = page;

},{"@swc/helpers":"erO4s","regenerator-runtime":"12Ae8","../lib/socket":"2Tmh7","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"erO4s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyDecoratedDescriptor", ()=>_applyDecoratedDescriptorDefault.default
);
parcelHelpers.export(exports, "arrayWithHoles", ()=>_arrayWithHolesDefault.default
);
parcelHelpers.export(exports, "arrayWithoutHoles", ()=>_arrayWithoutHolesDefault.default
);
parcelHelpers.export(exports, "assertThisInitialized", ()=>_assertThisInitializedDefault.default
);
parcelHelpers.export(exports, "asyncGenerator", ()=>_asyncGeneratorDefault.default
);
parcelHelpers.export(exports, "asyncGeneratorDelegate", ()=>_asyncGeneratorDelegateDefault.default
);
parcelHelpers.export(exports, "asyncIterator", ()=>_asyncIteratorDefault.default
);
parcelHelpers.export(exports, "asyncToGenerator", ()=>_asyncToGeneratorDefault.default
);
parcelHelpers.export(exports, "awaitAsyncGenerator", ()=>_awaitAsyncGeneratorDefault.default
);
parcelHelpers.export(exports, "awaitValue", ()=>_awaitValueDefault.default
);
parcelHelpers.export(exports, "classCallCheck", ()=>_classCallCheckDefault.default
);
parcelHelpers.export(exports, "classNameTDZError", ()=>_classNameTdzErrorDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldGet", ()=>_classPrivateFieldGetDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldLooseBase", ()=>_classPrivateFieldLooseBaseDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldSet", ()=>_classPrivateFieldSetDefault.default
);
parcelHelpers.export(exports, "classPrivateMethodGet", ()=>_classPrivateMethodGetDefault.default
);
parcelHelpers.export(exports, "classPrivateMethodSet", ()=>_classPrivateMethodSetDefault.default
);
parcelHelpers.export(exports, "classStaticPrivateFieldSpecGet", ()=>_classStaticPrivateFieldSpecGetDefault.default
);
parcelHelpers.export(exports, "classStaticPrivateFieldSpecSet", ()=>_classStaticPrivateFieldSpecSetDefault.default
);
parcelHelpers.export(exports, "construct", ()=>_constructDefault.default
);
parcelHelpers.export(exports, "createClass", ()=>_createClassDefault.default
);
parcelHelpers.export(exports, "decorate", ()=>_decorateDefault.default
);
parcelHelpers.export(exports, "defaults", ()=>_defaultsDefault.default
);
parcelHelpers.export(exports, "defineEnumerableProperties", ()=>_defineEnumerablePropertiesDefault.default
);
parcelHelpers.export(exports, "defineProperty", ()=>_definePropertyDefault.default
);
parcelHelpers.export(exports, "extends", ()=>_extendsDefault.default
);
parcelHelpers.export(exports, "get", ()=>_getDefault.default
);
parcelHelpers.export(exports, "getPrototypeOf", ()=>_getPrototypeOfDefault.default
);
parcelHelpers.export(exports, "inherits", ()=>_inheritsDefault.default
);
parcelHelpers.export(exports, "inheritsLoose", ()=>_inheritsLooseDefault.default
);
parcelHelpers.export(exports, "initializerDefineProperty", ()=>_initializerDefinePropertyDefault.default
);
parcelHelpers.export(exports, "initializerWarningHelper", ()=>_initializerWarningHelperDefault.default
);
parcelHelpers.export(exports, "_instanceof", ()=>_instanceofDefault.default
);
parcelHelpers.export(exports, "interopRequireDefault", ()=>_interopRequireDefaultDefault.default
);
parcelHelpers.export(exports, "interopRequireWildcard", ()=>_interopRequireWildcardDefault.default
);
parcelHelpers.export(exports, "isNativeFunction", ()=>_isNativeFunctionDefault.default
);
parcelHelpers.export(exports, "iterableToArray", ()=>_iterableToArrayDefault.default
);
parcelHelpers.export(exports, "iterableToArrayLimit", ()=>_iterableToArrayLimitDefault.default
);
parcelHelpers.export(exports, "iterableToArrayLimitLoose", ()=>_iterableToArrayLimitLooseDefault.default
);
parcelHelpers.export(exports, "jsx", ()=>_jsxDefault.default
);
parcelHelpers.export(exports, "newArrowCheck", ()=>_newArrowCheckDefault.default
);
parcelHelpers.export(exports, "nonIterableRest", ()=>_nonIterableRestDefault.default
);
parcelHelpers.export(exports, "nonIterableSpread", ()=>_nonIterableSpreadDefault.default
);
parcelHelpers.export(exports, "objectSpread", ()=>_objectSpreadDefault.default
);
parcelHelpers.export(exports, "objectWithoutProperties", ()=>_objectWithoutPropertiesDefault.default
);
parcelHelpers.export(exports, "objectWithoutPropertiesLoose", ()=>_objectWithoutPropertiesLooseDefault.default
);
parcelHelpers.export(exports, "possibleConstructorReturn", ()=>_possibleConstructorReturnDefault.default
);
parcelHelpers.export(exports, "readOnlyError", ()=>_readOnlyErrorDefault.default
);
parcelHelpers.export(exports, "set", ()=>_setDefault.default
);
parcelHelpers.export(exports, "setPrototypeOf", ()=>_setPrototypeOfDefault.default
);
parcelHelpers.export(exports, "skipFirstGeneratorNext", ()=>_skipFirstGeneratorNextDefault.default
);
parcelHelpers.export(exports, "slicedToArray", ()=>_slicedToArrayDefault.default
);
parcelHelpers.export(exports, "slicedToArrayLoose", ()=>_slicedToArrayLooseDefault.default
);
parcelHelpers.export(exports, "superPropBase", ()=>_superPropBaseDefault.default
);
parcelHelpers.export(exports, "taggedTemplateLiteral", ()=>_taggedTemplateLiteralDefault.default
);
parcelHelpers.export(exports, "taggedTemplateLiteralLoose", ()=>_taggedTemplateLiteralLooseDefault.default
);
parcelHelpers.export(exports, "_throw", ()=>_throwDefault.default
);
parcelHelpers.export(exports, "toArray", ()=>_toArrayDefault.default
);
parcelHelpers.export(exports, "toConsumableArray", ()=>_toConsumableArrayDefault.default
);
parcelHelpers.export(exports, "toPrimitive", ()=>_toPrimitiveDefault.default
);
parcelHelpers.export(exports, "toPropertyKey", ()=>_toPropertyKeyDefault.default
);
parcelHelpers.export(exports, "typeOf", ()=>_typeOfDefault.default
);
parcelHelpers.export(exports, "wrapAsyncGenerator", ()=>_wrapAsyncGeneratorDefault.default
);
parcelHelpers.export(exports, "wrapNativeSuper", ()=>_wrapNativeSuperDefault.default
);
parcelHelpers.export(exports, "createSuper", ()=>_createSuperDefault.default
);
parcelHelpers.export(exports, "isNativeReflectConstruct", ()=>_isNativeReflectConstructDefault.default
);
var _applyDecoratedDescriptor = require("./_apply_decorated_descriptor");
var _applyDecoratedDescriptorDefault = parcelHelpers.interopDefault(_applyDecoratedDescriptor);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _arrayWithoutHoles = require("./_array_without_holes");
var _arrayWithoutHolesDefault = parcelHelpers.interopDefault(_arrayWithoutHoles);
var _assertThisInitialized = require("./_assert_this_initialized");
var _assertThisInitializedDefault = parcelHelpers.interopDefault(_assertThisInitialized);
var _asyncGenerator = require("./_async_generator");
var _asyncGeneratorDefault = parcelHelpers.interopDefault(_asyncGenerator);
var _asyncGeneratorDelegate = require("./_async_generator_delegate");
var _asyncGeneratorDelegateDefault = parcelHelpers.interopDefault(_asyncGeneratorDelegate);
var _asyncIterator = require("./_async_iterator");
var _asyncIteratorDefault = parcelHelpers.interopDefault(_asyncIterator);
var _asyncToGenerator = require("./_async_to_generator");
var _asyncToGeneratorDefault = parcelHelpers.interopDefault(_asyncToGenerator);
var _awaitAsyncGenerator = require("./_await_async_generator");
var _awaitAsyncGeneratorDefault = parcelHelpers.interopDefault(_awaitAsyncGenerator);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
var _classCallCheck = require("./_class_call_check");
var _classCallCheckDefault = parcelHelpers.interopDefault(_classCallCheck);
var _classNameTdzError = require("./_class_name_tdz_error");
var _classNameTdzErrorDefault = parcelHelpers.interopDefault(_classNameTdzError);
var _classPrivateFieldGet = require("./_class_private_field_get");
var _classPrivateFieldGetDefault = parcelHelpers.interopDefault(_classPrivateFieldGet);
var _classPrivateFieldLooseBase = require("./_class_private_field_loose_base");
var _classPrivateFieldLooseBaseDefault = parcelHelpers.interopDefault(_classPrivateFieldLooseBase);
var _classPrivateFieldSet = require("./_class_private_field_set");
var _classPrivateFieldSetDefault = parcelHelpers.interopDefault(_classPrivateFieldSet);
var _classPrivateMethodGet = require("./_class_private_method_get");
var _classPrivateMethodGetDefault = parcelHelpers.interopDefault(_classPrivateMethodGet);
var _classPrivateMethodSet = require("./_class_private_method_set");
var _classPrivateMethodSetDefault = parcelHelpers.interopDefault(_classPrivateMethodSet);
var _classStaticPrivateFieldSpecGet = require("./_class_static_private_field_spec_get");
var _classStaticPrivateFieldSpecGetDefault = parcelHelpers.interopDefault(_classStaticPrivateFieldSpecGet);
var _classStaticPrivateFieldSpecSet = require("./_class_static_private_field_spec_set");
var _classStaticPrivateFieldSpecSetDefault = parcelHelpers.interopDefault(_classStaticPrivateFieldSpecSet);
var _construct = require("./_construct");
var _constructDefault = parcelHelpers.interopDefault(_construct);
var _createClass = require("./_create_class");
var _createClassDefault = parcelHelpers.interopDefault(_createClass);
var _decorate = require("./_decorate");
var _decorateDefault = parcelHelpers.interopDefault(_decorate);
var _defaults = require("./_defaults");
var _defaultsDefault = parcelHelpers.interopDefault(_defaults);
var _defineEnumerableProperties = require("./_define_enumerable_properties");
var _defineEnumerablePropertiesDefault = parcelHelpers.interopDefault(_defineEnumerableProperties);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _extends = require("./_extends");
var _extendsDefault = parcelHelpers.interopDefault(_extends);
var _get = require("./_get");
var _getDefault = parcelHelpers.interopDefault(_get);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _inherits = require("./_inherits");
var _inheritsDefault = parcelHelpers.interopDefault(_inherits);
var _inheritsLoose = require("./_inherits_loose");
var _inheritsLooseDefault = parcelHelpers.interopDefault(_inheritsLoose);
var _initializerDefineProperty = require("./_initializer_define_property");
var _initializerDefinePropertyDefault = parcelHelpers.interopDefault(_initializerDefineProperty);
var _initializerWarningHelper = require("./_initializer_warning_helper");
var _initializerWarningHelperDefault = parcelHelpers.interopDefault(_initializerWarningHelper);
var _instanceof = require("./_instanceof");
var _instanceofDefault = parcelHelpers.interopDefault(_instanceof);
var _interopRequireDefault = require("./_interop_require_default");
var _interopRequireDefaultDefault = parcelHelpers.interopDefault(_interopRequireDefault);
var _interopRequireWildcard = require("./_interop_require_wildcard");
var _interopRequireWildcardDefault = parcelHelpers.interopDefault(_interopRequireWildcard);
var _isNativeFunction = require("./_is_native_function");
var _isNativeFunctionDefault = parcelHelpers.interopDefault(_isNativeFunction);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _iterableToArrayLimit = require("./_iterable_to_array_limit");
var _iterableToArrayLimitDefault = parcelHelpers.interopDefault(_iterableToArrayLimit);
var _iterableToArrayLimitLoose = require("./_iterable_to_array_limit_loose");
var _iterableToArrayLimitLooseDefault = parcelHelpers.interopDefault(_iterableToArrayLimitLoose);
var _jsx = require("./_jsx");
var _jsxDefault = parcelHelpers.interopDefault(_jsx);
var _newArrowCheck = require("./_new_arrow_check");
var _newArrowCheckDefault = parcelHelpers.interopDefault(_newArrowCheck);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
var _nonIterableSpread = require("./_non_iterable_spread");
var _nonIterableSpreadDefault = parcelHelpers.interopDefault(_nonIterableSpread);
var _objectSpread = require("./_object_spread");
var _objectSpreadDefault = parcelHelpers.interopDefault(_objectSpread);
var _objectWithoutProperties = require("./_object_without_properties");
var _objectWithoutPropertiesDefault = parcelHelpers.interopDefault(_objectWithoutProperties);
var _objectWithoutPropertiesLoose = require("./_object_without_properties_loose");
var _objectWithoutPropertiesLooseDefault = parcelHelpers.interopDefault(_objectWithoutPropertiesLoose);
var _possibleConstructorReturn = require("./_possible_constructor_return");
var _possibleConstructorReturnDefault = parcelHelpers.interopDefault(_possibleConstructorReturn);
var _readOnlyError = require("./_read_only_error");
var _readOnlyErrorDefault = parcelHelpers.interopDefault(_readOnlyError);
var _set = require("./_set");
var _setDefault = parcelHelpers.interopDefault(_set);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
var _skipFirstGeneratorNext = require("./_skip_first_generator_next");
var _skipFirstGeneratorNextDefault = parcelHelpers.interopDefault(_skipFirstGeneratorNext);
var _slicedToArray = require("./_sliced_to_array");
var _slicedToArrayDefault = parcelHelpers.interopDefault(_slicedToArray);
var _slicedToArrayLoose = require("./_sliced_to_array_loose");
var _slicedToArrayLooseDefault = parcelHelpers.interopDefault(_slicedToArrayLoose);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
var _taggedTemplateLiteral = require("./_tagged_template_literal");
var _taggedTemplateLiteralDefault = parcelHelpers.interopDefault(_taggedTemplateLiteral);
var _taggedTemplateLiteralLoose = require("./_tagged_template_literal_loose");
var _taggedTemplateLiteralLooseDefault = parcelHelpers.interopDefault(_taggedTemplateLiteralLoose);
var _throw = require("./_throw");
var _throwDefault = parcelHelpers.interopDefault(_throw);
var _toArray = require("./_to_array");
var _toArrayDefault = parcelHelpers.interopDefault(_toArray);
var _toConsumableArray = require("./_to_consumable_array");
var _toConsumableArrayDefault = parcelHelpers.interopDefault(_toConsumableArray);
var _toPrimitive = require("./_to_primitive");
var _toPrimitiveDefault = parcelHelpers.interopDefault(_toPrimitive);
var _toPropertyKey = require("./_to_property_key");
var _toPropertyKeyDefault = parcelHelpers.interopDefault(_toPropertyKey);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
var _wrapAsyncGenerator = require("./_wrap_async_generator");
var _wrapAsyncGeneratorDefault = parcelHelpers.interopDefault(_wrapAsyncGenerator);
var _wrapNativeSuper = require("./_wrap_native_super");
var _wrapNativeSuperDefault = parcelHelpers.interopDefault(_wrapNativeSuper);
var _createSuper = require("./_create_super");
var _createSuperDefault = parcelHelpers.interopDefault(_createSuper);
var _isNativeReflectConstruct = require("./_is_native_reflect_construct");
var _isNativeReflectConstructDefault = parcelHelpers.interopDefault(_isNativeReflectConstruct);

},{"./_apply_decorated_descriptor":"c9NX1","./_array_with_holes":"f2RVY","./_array_without_holes":"9G5hu","./_assert_this_initialized":"hb0Uz","./_async_generator":"3e3Cq","./_async_generator_delegate":"aFowE","./_async_iterator":"kDn5G","./_async_to_generator":"69ywl","./_await_async_generator":"47kVK","./_await_value":"kOPdt","./_class_call_check":"5thSN","./_class_name_tdz_error":"kLeIP","./_class_private_field_get":"hiZIF","./_class_private_field_loose_base":"iIxKI","./_class_private_field_set":"3aItm","./_class_private_method_get":"gKMrA","./_class_private_method_set":"jDhxx","./_class_static_private_field_spec_get":"79XlC","./_class_static_private_field_spec_set":"hKsVp","./_construct":"bLTlt","./_create_class":"cMLkg","./_decorate":"5M3uX","./_defaults":"jPoWh","./_define_enumerable_properties":"8xWnI","./_define_property":"c7yiB","./_extends":"by2GU","./_get":"d3ZpD","./_get_prototype_of":"4Z2sn","./_inherits":"hoEyE","./_inherits_loose":"bpWmo","./_initializer_define_property":"5WZDp","./_initializer_warning_helper":"GCE4p","./_instanceof":"j6WhW","./_interop_require_default":"9sQ50","./_interop_require_wildcard":"ejKpM","./_is_native_function":"8d7fi","./_iterable_to_array":"lY6Yg","./_iterable_to_array_limit":"61jYg","./_iterable_to_array_limit_loose":"bvfpN","./_jsx":"9hq6e","./_new_arrow_check":"4VyBi","./_non_iterable_rest":"d6ywz","./_non_iterable_spread":"29F6O","./_object_spread":"jaxa1","./_object_without_properties":"eJaOZ","./_object_without_properties_loose":"6eqIr","./_possible_constructor_return":"cWetj","./_read_only_error":"3xmWo","./_set":"kehyh","./_set_prototype_of":"hkEkh","./_skip_first_generator_next":"lqj0R","./_sliced_to_array":"k8UMw","./_sliced_to_array_loose":"7tjhK","./_super_prop_base":"lGKRS","./_tagged_template_literal":"d3FCJ","./_tagged_template_literal_loose":"fbTUf","./_throw":"89Ibv","./_to_array":"lrbT1","./_to_consumable_array":"3TaI4","./_to_primitive":"aO5VI","./_to_property_key":"d5hF2","./_type_of":"hGmQp","./_wrap_async_generator":"kfhw9","./_wrap_native_super":"2wCpr","./_create_super":"inTdM","./_is_native_reflect_construct":"b8vXc","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"c9NX1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc1 = {
    };
    Object["keys"](descriptor).forEach(function(key) {
        desc1[key] = descriptor[key];
    });
    desc1.enumerable = !!desc1.enumerable;
    desc1.configurable = !!desc1.configurable;
    if ('value' in desc1 || desc1.initializer) desc1.writable = true;
    desc1 = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator ? decorator(target, property, desc) || desc : desc;
    }, desc1);
    if (context && desc1.initializer !== void 0) {
        desc1.value = desc1.initializer ? desc1.initializer.call(context) : void 0;
        desc1.initializer = undefined;
    }
    if (desc1.initializer === void 0) {
        Object["defineProperty"](target, property, desc1);
        desc1 = null;
    }
    return desc1;
}
exports.default = _applyDecoratedDescriptor;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"f2RVY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
exports.default = _arrayWithHoles;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"9G5hu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)arr2[i] = arr[i];
        return arr2;
    }
}
exports.default = _arrayWithoutHoles;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hb0Uz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
exports.default = _assertThisInitialized;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"3e3Cq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
function AsyncGenerator(gen) {
    var front, back;
    function send(key, arg) {
        return new Promise(function(resolve, reject) {
            var request = {
                key: key,
                arg: arg,
                resolve: resolve,
                reject: reject,
                next: null
            };
            if (back) back = back.next = request;
            else {
                front = back = request;
                resume(key, arg);
            }
        });
    }
    function resume(key, arg1) {
        try {
            var result = gen[key](arg1);
            var value = result.value;
            var wrappedAwait = value instanceof _awaitValueDefault.default;
            Promise.resolve(wrappedAwait ? value.wrapped : value).then(function(arg) {
                if (wrappedAwait) {
                    resume("next", arg);
                    return;
                }
                settle(result.done ? "return" : "normal", arg);
            }, function(err) {
                resume("throw", err);
            });
        } catch (err) {
            settle("throw", err);
        }
    }
    function settle(type, value) {
        switch(type){
            case "return":
                front.resolve({
                    value: value,
                    done: true
                });
                break;
            case "throw":
                front.reject(value);
                break;
            default:
                front.resolve({
                    value: value,
                    done: false
                });
                break;
        }
        front = front.next;
        if (front) resume(front.key, front.arg);
        else back = null;
    }
    this._invoke = send;
    if (typeof gen.return !== "function") this.return = undefined;
}
exports.default = AsyncGenerator;
if (typeof Symbol === "function" && Symbol.asyncIterator) AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
    return this;
};
AsyncGenerator.prototype.next = function(arg) {
    return this._invoke("next", arg);
};
AsyncGenerator.prototype.throw = function(arg) {
    return this._invoke("throw", arg);
};
AsyncGenerator.prototype.return = function(arg) {
    return this._invoke("return", arg);
};

},{"./_await_value":"kOPdt","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kOPdt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _AwaitValue(value) {
    this.wrapped = value;
}
exports.default = _AwaitValue;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"aFowE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {
    }, waiting = false;
    function pump(key, value) {
        waiting = true;
        value = new Promise(function(resolve) {
            resolve(inner[key](value));
        });
        return {
            done: false,
            value: awaitWrap(value)
        };
    }
    if (typeof Symbol === "function" && Symbol.iterator) iter[Symbol.iterator] = function() {
        return this;
    };
    iter.next = function(value) {
        if (waiting) {
            waiting = false;
            return value;
        }
        return pump("next", value);
    };
    if (typeof inner.throw === "function") iter.throw = function(value) {
        if (waiting) {
            waiting = false;
            throw value;
        }
        return pump("throw", value);
    };
    if (typeof inner.return === "function") iter.return = function(value) {
        return pump("return", value);
    };
    return iter;
}
exports.default = _asyncGeneratorDelegate;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kDn5G":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _asyncIterator(iterable) {
    var method;
    if (typeof Symbol === "function") {
        if (Symbol.asyncIterator) {
            method = iterable[Symbol.asyncIterator];
            if (method != null) return method.call(iterable);
        }
        if (Symbol.iterator) {
            method = iterable[Symbol.iterator];
            if (method != null) return method.call(iterable);
        }
    }
    throw new TypeError("Object is not async iterable");
}
exports.default = _asyncIterator;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"69ywl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
exports.default = _asyncToGenerator;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"47kVK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
function _awaitAsyncGenerator(value) {
    return new _awaitValueDefault.default(value);
}
exports.default = _awaitAsyncGenerator;

},{"./_await_value":"kOPdt","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"5thSN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
exports.default = _classCallCheck;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kLeIP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classNameTDZError(name) {
    throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
}
exports.default = _classNameTDZError;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hiZIF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver).value;
}
exports.default = _classPrivateFieldGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"iIxKI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) throw new TypeError("attempted to use private field on non-instance");
    return receiver;
}
exports.default = _classPrivateFieldBase;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"3aItm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
    var descriptor = privateMap.get(receiver);
    if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
    return value;
}
exports.default = _classPrivateFieldSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"gKMrA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
exports.default = _classPrivateMethodGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"jDhxx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
}
exports.default = _classPrivateMethodSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"79XlC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) throw new TypeError("Private static access of wrong provenance");
    return descriptor.value;
}
exports.default = _classStaticPrivateFieldSpecGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hKsVp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) throw new TypeError("Private static access of wrong provenance");
    if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
    return value;
}
exports.default = _classStaticPrivateFieldSpecSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"bLTlt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function construct(Parent1, args1, Class1) {
    if (isNativeReflectConstruct()) construct = Reflect.construct;
    else construct = function construct(Parent, args, Class) {
        var a = [
            null
        ];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
    };
    return construct.apply(null, arguments);
}
function _construct(Parent, args, Class) {
    return construct.apply(null, arguments);
}
exports.default = _construct;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"cMLkg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
exports.default = _createClass;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"5M3uX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _toArray = require("./_to_array");
var _toArrayDefault = parcelHelpers.interopDefault(_toArray);
var _toPropertyKey = require("./_to_property_key");
var _toPropertyKeyDefault = parcelHelpers.interopDefault(_toPropertyKey);
function _decorate(decorators, factory, superClass) {
    var r = factory(function initialize(O) {
        _initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
    _initializeClassElements(r.F, decorated.elements);
    return _runClassFinishers(r.F, decorated.finishers);
}
exports.default = _decorate;
function _createElementDescriptor(def) {
    var key = _toPropertyKeyDefault.default(def.key);
    var descriptor;
    if (def.kind === "method") {
        descriptor = {
            value: def.value,
            writable: true,
            configurable: true,
            enumerable: false
        };
        Object.defineProperty(def.value, "name", {
            value: _typeof(key) === "symbol" ? "" : key,
            configurable: true
        });
    } else if (def.kind === "get") descriptor = {
        get: def.value,
        configurable: true,
        enumerable: false
    };
    else if (def.kind === "set") descriptor = {
        set: def.value,
        configurable: true,
        enumerable: false
    };
    else if (def.kind === "field") descriptor = {
        configurable: true,
        writable: true,
        enumerable: true
    };
    var element = {
        kind: def.kind === "field" ? "field" : "method",
        key: key,
        placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
        descriptor: descriptor
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;
    return element;
}
function _coalesceGetterSetter(element, other) {
    if (element.descriptor.get !== undefined) other.descriptor.get = element.descriptor.get;
    else other.descriptor.set = element.descriptor.set;
}
function _coalesceClassElements(elements) {
    var newElements = [];
    var isSameElement = function isSameElement(other) {
        return other.kind === "method" && other.key === element.key && other.placement === element.placement;
    };
    for(var i = 0; i < elements.length; i++){
        var element = elements[i];
        var other1;
        if (element.kind === "method" && (other1 = newElements.find(isSameElement))) {
            if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other1.descriptor)) {
                if (_hasDecorators(element) || _hasDecorators(other1)) throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
                other1.descriptor = element.descriptor;
            } else {
                if (_hasDecorators(element)) {
                    if (_hasDecorators(other1)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + element.key + ").");
                    other1.decorators = element.decorators;
                }
                _coalesceGetterSetter(element, other1);
            }
        } else newElements.push(element);
    }
    return newElements;
}
function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
}
function _isDataDescriptor(desc) {
    return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}
function _initializeClassElements(F, elements) {
    var proto = F.prototype;
    [
        "method",
        "field"
    ].forEach(function(kind) {
        elements.forEach(function(element) {
            var placement = element.placement;
            if (element.kind === kind && (placement === "static" || placement === "prototype")) {
                var receiver = placement === "static" ? F : proto;
                _defineClassElement(receiver, element);
            }
        });
    });
}
function _initializeInstanceElements(O, elements) {
    [
        "method",
        "field"
    ].forEach(function(kind) {
        elements.forEach(function(element) {
            if (element.kind === kind && element.placement === "own") _defineClassElement(O, element);
        });
    });
}
function _defineClassElement(receiver, element) {
    var descriptor = element.descriptor;
    if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
    }
    Object.defineProperty(receiver, element.key, descriptor);
}
function _decorateClass(elements, decorators) {
    var newElements = [];
    var finishers = [];
    var placements = {
        static: [],
        prototype: [],
        own: []
    };
    elements.forEach(function(element) {
        _addElementPlacement(element, placements);
    });
    elements.forEach(function(element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = _decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
    });
    if (!decorators) return {
        elements: newElements,
        finishers: finishers
    };
    var result = _decorateConstructor(newElements, decorators);
    finishers.push.apply(finishers, result.finishers);
    result.finishers = finishers;
    return result;
}
function _addElementPlacement(element, placements, silent) {
    var keys = placements[element.placement];
    if (!silent && keys.indexOf(element.key) !== -1) throw new TypeError("Duplicated element (" + element.key + ")");
    keys.push(element.key);
}
function _decorateElement(element, placements) {
    var extras = [];
    var finishers = [];
    for(var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--){
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = _fromElementDescriptor(element);
        var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        _addElementPlacement(element, placements);
        if (elementFinisherExtras.finisher) finishers.push(elementFinisherExtras.finisher);
        var newExtras = elementFinisherExtras.extras;
        if (newExtras) {
            for(var j = 0; j < newExtras.length; j++)_addElementPlacement(newExtras[j], placements);
            extras.push.apply(extras, newExtras);
        }
    }
    return {
        element: element,
        finishers: finishers,
        extras: extras
    };
}
function _decorateConstructor(elements, decorators) {
    var finishers = [];
    for(var i = decorators.length - 1; i >= 0; i--){
        var obj = _fromClassDescriptor(elements);
        var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj);
        if (elementsAndFinisher.finisher !== undefined) finishers.push(elementsAndFinisher.finisher);
        if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;
            for(var j = 0; j < elements.length - 1; j++)for(var k = j + 1; k < elements.length; k++){
                if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) throw new TypeError("Duplicated element (" + elements[j].key + ")");
            }
        }
    }
    return {
        elements: elements,
        finishers: finishers
    };
}
function _fromElementDescriptor(element) {
    var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
    };
    var desc = {
        value: "Descriptor",
        configurable: true
    };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    if (element.kind === "field") obj.initializer = element.initializer;
    return obj;
}
function _toElementDescriptors(elementObjects) {
    if (elementObjects === undefined) return;
    return _toArrayDefault.default(elementObjects).map(function(elementObject) {
        var element = _toElementDescriptor(elementObject);
        _disallowProperty(elementObject, "finisher", "An element descriptor");
        _disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
    });
}
function _toElementDescriptor(elementObject) {
    var kind = String(elementObject.kind);
    if (kind !== "method" && kind !== "field") throw new TypeError("An element descriptor's .kind property must be either \"method\" or \"field\", but a decorator created an element descriptor with .kind \"" + kind + '"');
    var key = _toPropertyKeyDefault.default(elementObject.key);
    var placement = String(elementObject.placement);
    if (placement !== "static" && placement !== "prototype" && placement !== "own") throw new TypeError("An element descriptor's .placement property must be one of \"static\", \"prototype\" or \"own\", but a decorator created an element descriptor with .placement \"" + placement + '"');
    var descriptor = elementObject.descriptor;
    _disallowProperty(elementObject, "elements", "An element descriptor");
    var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({
        }, descriptor)
    };
    if (kind !== "field") _disallowProperty(elementObject, "initializer", "A method descriptor");
    else {
        _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
    }
    return element;
}
function _toElementFinisherExtras(elementObject) {
    var element = _toElementDescriptor(elementObject);
    var finisher = _optionalCallableProperty(elementObject, "finisher");
    var extras = _toElementDescriptors(elementObject.extras);
    return {
        element: element,
        finisher: finisher,
        extras: extras
    };
}
function _fromClassDescriptor(elements) {
    var obj = {
        kind: "class",
        elements: elements.map(_fromElementDescriptor)
    };
    var desc = {
        value: "Descriptor",
        configurable: true
    };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    return obj;
}
function _toClassDescriptor(obj) {
    var kind = String(obj.kind);
    if (kind !== "class") throw new TypeError("A class descriptor's .kind property must be \"class\", but a decorator created a class descriptor with .kind \"" + kind + '"');
    _disallowProperty(obj, "key", "A class descriptor");
    _disallowProperty(obj, "placement", "A class descriptor");
    _disallowProperty(obj, "descriptor", "A class descriptor");
    _disallowProperty(obj, "initializer", "A class descriptor");
    _disallowProperty(obj, "extras", "A class descriptor");
    var finisher = _optionalCallableProperty(obj, "finisher");
    var elements = _toElementDescriptors(obj.elements);
    return {
        elements: elements,
        finisher: finisher
    };
}
function _disallowProperty(obj, name, objectType) {
    if (obj[name] !== undefined) throw new TypeError(objectType + " can't have a ." + name + " property.");
}
function _optionalCallableProperty(obj, name) {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") throw new TypeError("Expected '" + name + "' to be a function");
    return value;
}
function _runClassFinishers(constructor, finishers) {
    for(var i = 0; i < finishers.length; i++){
        var newConstructor = (0, finishers[i])(constructor);
        if (newConstructor !== undefined) {
            if (typeof newConstructor !== "function") throw new TypeError("Finishers must return a constructor.");
            constructor = newConstructor;
        }
    }
    return constructor;
}

},{"./_to_array":"lrbT1","./_to_property_key":"d5hF2","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"lrbT1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
function _toArray(arr) {
    return _arrayWithHolesDefault.default(arr) || _iterableToArrayDefault.default(arr) || _nonIterableRestDefault.default();
}
exports.default = _toArray;

},{"./_array_with_holes":"f2RVY","./_iterable_to_array":"lY6Yg","./_non_iterable_rest":"d6ywz","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"lY6Yg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
exports.default = _iterableToArray;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"d6ywz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
exports.default = _nonIterableRest;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"d5hF2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
var _toPrimitive = require("./_to_primitive");
var _toPrimitiveDefault = parcelHelpers.interopDefault(_toPrimitive);
function _toPropertyKey(arg) {
    var key = _toPrimitiveDefault.default(arg, "string");
    return _typeOfDefault.default(key) === "symbol" ? key : String(key);
}
exports.default = _toPropertyKey;

},{"./_type_of":"hGmQp","./_to_primitive":"aO5VI","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hGmQp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _typeof(obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
}
exports.default = _typeof;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"aO5VI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
function _toPrimitive(input, hint) {
    if (_typeOfDefault.default(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_typeOfDefault.default(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
exports.default = _toPrimitive;

},{"./_type_of":"hGmQp","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"jPoWh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        var value = Object.getOwnPropertyDescriptor(defaults, key);
        if (value && value.configurable && obj[key] === undefined) Object.defineProperty(obj, key, value);
    }
    return obj;
}
exports.default = _defaults;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"8xWnI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineEnumerableProperties(obj, descs) {
    for(var key in descs){
        var desc = descs[key];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, key, desc);
    }
    if (Object.getOwnPropertySymbols) {
        var objectSymbols = Object.getOwnPropertySymbols(descs);
        for(var i = 0; i < objectSymbols.length; i++){
            var sym = objectSymbols[i];
            var desc = descs[sym];
            desc.configurable = desc.enumerable = true;
            if ("value" in desc) desc.writable = true;
            Object.defineProperty(obj, sym, desc);
        }
    }
    return obj;
}
exports.default = _defineEnumerableProperties;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"c7yiB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
exports.default = _defineProperty;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"by2GU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function extends_() {
    extends_ = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return extends_.apply(this, arguments);
}
function _extends() {
    return extends_.apply(this, arguments);
}
exports.default = _extends;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"d3ZpD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
function get(target1, property1, receiver1) {
    if (typeof Reflect !== "undefined" && Reflect.get) get = Reflect.get;
    else get = function get(target, property, receiver) {
        var base = _superPropBaseDefault.default(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) return desc.get.call(receiver || target);
        return desc.value;
    };
    return get(target1, property1, receiver1);
}
function _get(target, property, reciever) {
    return get(target, property, reciever);
}
exports.default = _get;

},{"./_super_prop_base":"lGKRS","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"lGKRS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOfDefault.default(object);
        if (object === null) break;
    }
    return object;
}
exports.default = _superPropBase;

},{"./_get_prototype_of":"4Z2sn","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"4Z2sn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getPrototypeOf(o1) {
    getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return getPrototypeOf(o1);
}
function _getPrototypeOf(o) {
    return getPrototypeOf(o);
}
exports.default = _getPrototypeOf;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hoEyE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOfDefault.default(subClass, superClass);
}
exports.default = _inherits;

},{"./_set_prototype_of":"hkEkh","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hkEkh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function setPrototypeOf(o1, p1) {
    setPrototypeOf = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return setPrototypeOf(o1, p1);
}
function _setPrototypeOf(o, p) {
    return setPrototypeOf(o, p);
}
exports.default = _setPrototypeOf;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"bpWmo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
exports.default = _inheritsLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"5WZDp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}
exports.default = _initializerDefineProperty;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"GCE4p":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _initializerWarningHelper(descriptor, context) {
    throw new Error("Decorating class property failed. Please ensure that proposal-class-properties is enabled and set to use loose mode. To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2.");
}
exports.default = _initializerWarningHelper;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"j6WhW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) return right[Symbol.hasInstance](left);
    else return left instanceof right;
}
exports.default = _instanceof;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"9sQ50":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports.default = _interopRequireDefault;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"ejKpM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {
                };
                if (desc.get || desc.set) Object.defineProperty(newObj, key, desc);
                else newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
exports.default = _interopRequireWildcard;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"8d7fi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
exports.default = _isNativeFunction;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"61jYg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
exports.default = _iterableToArrayLimit;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"bvfpN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArrayLimitLoose(arr, i) {
    var _arr = [];
    for(var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;){
        _arr.push(_step.value);
        if (i && _arr.length === i) break;
    }
    return _arr;
}
exports.default = _iterableToArrayLimitLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"9hq6e":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var REACT_ELEMENT_TYPE;
function _createRawReactElement(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 60103;
    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;
    if (!props && childrenLength !== 0) props = {
        children: void 0
    };
    if (props && defaultProps) {
        for(var propName in defaultProps)if (props[propName] === void 0) props[propName] = defaultProps[propName];
    } else if (!props) props = defaultProps || {
    };
    if (childrenLength === 1) props.children = children;
    else if (childrenLength > 1) {
        var childArray = new Array(childrenLength);
        for(var i = 0; i < childrenLength; i++)childArray[i] = arguments[i + 3];
        props.children = childArray;
    }
    return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key === undefined ? null : '' + key,
        ref: null,
        props: props,
        _owner: null
    };
}
exports.default = _createRawReactElement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"4VyBi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) throw new TypeError("Cannot instantiate an arrow function");
}
exports.default = _newArrowCheck;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"29F6O":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}
exports.default = _nonIterableSpread;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"jaxa1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            _definePropertyDefault.default(target, key, source[key]);
        });
    }
    return target;
}
exports.default = _objectSpread;

},{"./_define_property":"c7yiB","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"eJaOZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _objectWithoutPropertiesLoose = require("./_object_without_properties_loose");
var _objectWithoutPropertiesLooseDefault = parcelHelpers.interopDefault(_objectWithoutPropertiesLoose);
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {
    };
    var target = _objectWithoutPropertiesLooseDefault.default(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
exports.default = _objectWithoutProperties;

},{"./_object_without_properties_loose":"6eqIr","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"6eqIr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {
    };
    var target = {
    };
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
exports.default = _objectWithoutPropertiesLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"cWetj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _assertThisInitialized = require("./_assert_this_initialized");
var _assertThisInitializedDefault = parcelHelpers.interopDefault(_assertThisInitialized);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
function _possibleConstructorReturn(self, call) {
    if (call && (_typeOfDefault.default(call) === "object" || typeof call === "function")) return call;
    return _assertThisInitializedDefault.default(self);
}
exports.default = _possibleConstructorReturn;

},{"./_assert_this_initialized":"hb0Uz","./_type_of":"hGmQp","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"3xmWo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _readOnlyError(name) {
    throw new Error("\"" + name + "\" is read-only");
}
exports.default = _readOnlyError;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kehyh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
function set(target1, property1, value1, receiver1) {
    if (typeof Reflect !== "undefined" && Reflect.set) set = Reflect.set;
    else set = function set(target, property, value, receiver) {
        var base = _superPropBaseDefault.default(target, property);
        var desc;
        if (base) {
            desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.set) {
                desc.set.call(receiver, value);
                return true;
            } else if (!desc.writable) return false;
        }
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
            if (!desc.writable) return false;
            desc.value = value;
            Object.defineProperty(receiver, property, desc);
        } else _definePropertyDefault.default(receiver, property, value);
        return true;
    };
    return set(target1, property1, value1, receiver1);
}
function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) throw new Error('failed to set property');
    return value;
}
exports.default = _set;

},{"./_define_property":"c7yiB","./_super_prop_base":"lGKRS","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"lqj0R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _skipFirstGeneratorNext(fn) {
    return function() {
        var it = fn.apply(this, arguments);
        it.next();
        return it;
    };
}
exports.default = _skipFirstGeneratorNext;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"k8UMw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
function _slicedToArray(arr, i) {
    return _arrayWithHolesDefault.default(arr) || _iterableToArrayDefault.default(arr, i) || _nonIterableRestDefault.default();
}
exports.default = _slicedToArray;

},{"./_array_with_holes":"f2RVY","./_iterable_to_array":"lY6Yg","./_non_iterable_rest":"d6ywz","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"7tjhK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _iterableToArrayLimitLoose = require("./_iterable_to_array_limit_loose");
var _iterableToArrayLimitLooseDefault = parcelHelpers.interopDefault(_iterableToArrayLimitLoose);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
function _slicedToArrayLoose(arr, i) {
    return _arrayWithHolesDefault.default(arr) || _iterableToArrayLimitLooseDefault.default(arr, i) || _nonIterableRestDefault.default();
}
exports.default = _slicedToArrayLoose;

},{"./_array_with_holes":"f2RVY","./_iterable_to_array_limit_loose":"bvfpN","./_non_iterable_rest":"d6ywz","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"d3FCJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) raw = strings.slice(0);
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
exports.default = _taggedTemplateLiteral;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"fbTUf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) raw = strings.slice(0);
    strings.raw = raw;
    return strings;
}
exports.default = _taggedTemplateLiteralLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"89Ibv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _throw(e) {
    throw e;
}
exports.default = _throw;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"3TaI4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithoutHoles = require("./_array_without_holes");
var _arrayWithoutHolesDefault = parcelHelpers.interopDefault(_arrayWithoutHoles);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _nonIterableSpread = require("./_non_iterable_spread");
var _nonIterableSpreadDefault = parcelHelpers.interopDefault(_nonIterableSpread);
function _toConsumableArray(arr) {
    return _arrayWithoutHolesDefault.default(arr) || _iterableToArrayDefault.default(arr) || _nonIterableSpreadDefault.default();
}
exports.default = _toConsumableArray;

},{"./_array_without_holes":"9G5hu","./_iterable_to_array":"lY6Yg","./_non_iterable_spread":"29F6O","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kfhw9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _asyncGenerator = require("./_async_generator");
var _asyncGeneratorDefault = parcelHelpers.interopDefault(_asyncGenerator);
function _wrapAsyncGenerator(fn) {
    return function() {
        return new _asyncGeneratorDefault.default(fn.apply(this, arguments));
    };
}
exports.default = _wrapAsyncGenerator;

},{"./_async_generator":"3e3Cq","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"2wCpr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _construct = require("./_construct");
var _constructDefault = parcelHelpers.interopDefault(_construct);
var _isNativeFunction = require("./_is_native_function");
var _isNativeFunctionDefault = parcelHelpers.interopDefault(_isNativeFunction);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
function wrapNativeSuper(Class1) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    wrapNativeSuper = function wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunctionDefault.default(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _constructDefault.default(Class, arguments, _getPrototypeOfDefault.default(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOfDefault.default(Wrapper, Class);
    };
    return wrapNativeSuper(Class1);
}
function _wrapNativeSuper(Class) {
    return wrapNativeSuper(Class);
}
exports.default = _wrapNativeSuper;

},{"./_construct":"bLTlt","./_is_native_function":"8d7fi","./_get_prototype_of":"4Z2sn","./_set_prototype_of":"hkEkh","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"inTdM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _isNativeReflectConstruct = require("./_is_native_reflect_construct");
var _isNativeReflectConstructDefault = parcelHelpers.interopDefault(_isNativeReflectConstruct);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _possibleConstructorReturn = require("./_possible_constructor_return");
var _possibleConstructorReturnDefault = parcelHelpers.interopDefault(_possibleConstructorReturn);
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstructDefault.default();
    return function _createSuperInternal() {
        var Super = _getPrototypeOfDefault.default(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOfDefault.default(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturnDefault.default(this, result);
    };
}
exports.default = _createSuper;

},{"./_is_native_reflect_construct":"b8vXc","./_get_prototype_of":"4Z2sn","./_possible_constructor_return":"cWetj","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"b8vXc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
exports.default = _isNativeReflectConstruct;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"12Ae8":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var runtime = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {
    };
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    }
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({
        }, "");
    } catch (err1) {
        define = function(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
    }
    exports.wrap = wrap;
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {
    };
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {
    };
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value1 = result.value;
                if (value1 && typeof value1 === "object" && hasOwn.call(value1, "__await")) return PromiseImpl.resolve(value1.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value1).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    }
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method always terminates the yield* loop.
            context.delegate = null;
            if (context.method === "throw") {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator["return"]) {
                    // If the delegate iterator has a return method, give it a
                    // chance to clean up.
                    context.method = "return";
                    context.arg = undefined;
                    maybeInvokeDelegate(delegate, context);
                    if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                }
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {
        };
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    }
    function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    exports.keys = function(object) {
        var keys = [];
        for(var key1 in object)keys.push(key1);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next1 = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next1.next = next1;
            }
        }
        // Return an iterator with no values.
        return {
            next: doneResult
        };
    }
    exports.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {
            };
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
typeof module === "object" ? module.exports : {
});
try {
    regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = runtime;
    else Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"2Tmh7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _actioncable = require("@rails/actioncable");
var _debounce = require("debounce");
var _debounceDefault = parcelHelpers.interopDefault(_debounce);
function socket(endpoint) {
    var uid = (Date.now() + (Math.random() * 100 | 0)).toString();
    var consumer = _actioncable.createConsumer("".concat(endpoint, "?uid=").concat(uid));
    return {
        addListener: function(channel, callback) {
            consumer.subscriptions.create(channel, {
                received: _debounceDefault.default(function(data) {
                    console.log("Lookbook files changed");
                    callback(data);
                }, 300),
                connected: function() {
                    console.log("Lookbook websocket connected");
                },
                disconnected: function() {
                    console.log("Lookbook websocket disconnected");
                }
            });
        }
    };
}
exports.default = socket;

},{"@rails/actioncable":"daMlV","debounce":"hw0wb","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"daMlV":[function(require,module,exports) {
(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define([
        "exports"
    ], factory) : factory(global.ActionCable = {
    });
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
        return (now() - time) / 1000;
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
            return Math.round(clamp(interval, min, max) * 1000);
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
            for(var eventName in this.events)this.webSocket["on" + eventName] = function() {
            };
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
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            };
            var mixin = arguments[2];
            classCallCheck(this, Subscription);
            this.consumer = consumer;
            this.identifier = JSON.stringify(params);
            extend(this, mixin);
        }
        Subscription.prototype.perform = function perform(action) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            };
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
    var Subscriptions1 = function() {
        function Subscriptions(consumer) {
            classCallCheck(this, Subscriptions);
            this.consumer = consumer;
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
            this.sendCommand(subscription, "subscribe");
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
                return _this2.sendCommand(subscription, "subscribe");
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
    exports.adapters = adapters;
    exports.createWebSocketURL = createWebSocketURL;
    exports.logger = logger;
    exports.createConsumer = createConsumer;
    exports.getConfig = getConfig;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});

},{}],"hw0wb":[function(require,module,exports) {
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

},{}],"2c7V4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _helpers = require("@swc/helpers");
var _splitGrid = require("split-grid");
var _splitGridDefault = parcelHelpers.interopDefault(_splitGrid);
var _obj;
function splitter(direction, param) {
    var props = param === void 0 ? {
    } : param;
    return {
        splits: [],
        init: function() {
            var _this = this, _this1 = this, _this2 = this;
            var type = "".concat(direction === "vertical" ? "column" : "row", "Gutters");
            var element = this.$el;
            _splitGridDefault.default((_obj = {
            }, _helpers.defineProperty(_obj, type, [
                {
                    track: 1,
                    element: element
                }
            ]), _helpers.defineProperty(_obj, "minSize", props.minSize || 0), _helpers.defineProperty(_obj, "writeStyle", function() {
            }), _helpers.defineProperty(_obj, "onDrag", function(dir, track, style) {
                _this.splits = style.split(" ").map(function(num) {
                    return parseInt(num);
                });
            }), _helpers.defineProperty(_obj, "onDragStart", function() {
                _this1.$store.layout.reflowing = true;
            }), _helpers.defineProperty(_obj, "onDragEnd", function() {
                _this2.$store.layout.reflowing = false;
            }), _obj));
        }
    };
}
exports.default = splitter;

},{"@swc/helpers":"erO4s","split-grid":"iOSKK","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"iOSKK":[function(require,module,exports) {
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
var getSizeAtTrack = function(index, tracks, gap, end) {
    if (gap === void 0) gap = 0;
    if (end === void 0) end = false;
    var newIndex = end ? index + 1 : index;
    var trackSum = tracks.slice(0, newIndex).reduce(function(accum, value) {
        return accum + value.numeric;
    }, 0);
    var gapSum = gap ? index * gap : 0;
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
        var trackMinSizes = direction === 'column' ? options.columnMinSizes || {
        } : options.rowMinSizes || {
        };
        var trackMinSize = direction === 'column' ? 'columnMinSize' : 'rowMinSize';
        return new Gutter(direction, Object.assign({
        }, {
            minSizeStart: getTrackOption(trackMinSizes, gutterOptions.track - 1, getOption(options, trackMinSize, getOption(options, 'minSize', 0))),
            minSizeEnd: getTrackOption(trackMinSizes, gutterOptions.track + 1, getOption(options, trackMinSize, getOption(options, 'minSize', 0)))
        }, gutterOptions), options);
    };
};
var Grid = function Grid(options) {
    var this$1 = this;
    this.columnGutters = {
    };
    this.rowGutters = {
    };
    this.options = Object.assign({
    }, {
        columnGutters: options.columnGutters || [],
        rowGutters: options.rowGutters || [],
        columnMinSizes: options.columnMinSizes || {
        },
        rowMinSizes: options.rowMinSizes || {
        }
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
function index1(options) {
    return new Grid(options);
}
exports.default = index1;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"a9DtZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function inspector() {
    return {
        isActivePanel: function(panel) {
            return this.$store.inspector.panels.active == panel;
        },
        switchPanel: function(panel) {
            this.$store.inspector.panels.active = panel;
        },
        get showSource () {
            return this.$store.inspector.preview.source;
        },
        toggleSource: function() {
            this.$store.inspector.preview.source = !this.$store.inspector.preview.source;
        },
        preview: {
            width: null,
            height: null
        }
    };
}
exports.default = inspector;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"1Wjrk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function filter() {
    return {
        get active () {
            return this.$store.filter.active;
        },
        checkEsc: function($event) {
            if ($event.key === "Escape") this.active ? this.clear() : this.blur();
        },
        clear: function() {
            this.$store.filter.raw = "";
        },
        focus: function($event) {
            var _this = this;
            if ($event.target.tagName === "INPUT") return;
            setTimeout(function() {
                return _this.$refs.input.focus();
            }, 0);
        },
        blur: function() {
            var _this = this;
            setTimeout(function() {
                return _this.$refs.input.blur();
            }, 0);
        }
    };
}
exports.default = filter;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"9tbIq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function param() {
    return {
        setFocus: function() {
            var _this = this;
            if (this.$refs.input) setTimeout(function() {
                return _this.$refs.input.focus();
            }, 0);
        },
        update: function(name, value) {
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set(name, value);
            var path = location.href.replace(location.search, "");
            this.setLocation("".concat(path, "?").concat(searchParams.toString()));
        },
        validate: function() {
            return this.$el.reportValidity ? this.$el.reportValidity() : true;
        }
    };
}
exports.default = param;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"41Ql3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utils = require("../lib/utils");
function nav() {
    return {
        empty: false,
        init: function() {
            var _this = this, _this1 = this;
            this.$watch("$store.filter.text", function() {
                return _this.filter();
            });
            this.$nextTick(function() {
                _this1.setActive();
                _this1.filter();
            });
        },
        filter: function() {
            var _this = this;
            this.empty = true;
            this.getChildren().forEach(function(child) {
                var data = _utils.getAlpineData(child);
                data.filter(_this.$store.filter.text);
                if (!data.hidden) _this.empty = false;
            });
        },
        getChildren: function() {
            return this.$refs.items ? Array.from(this.$refs.items.querySelectorAll(":scope > li")) : [];
        },
        setActive: function() {
            var target = this.$el.querySelector("[data-path=\"".concat(window.location.pathname, "\"]"));
            this.$store.nav.active = target ? target.id : "";
        }
    };
}
exports.default = nav;

},{"../lib/utils":"efGNF","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"efGNF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getAlpineData", function() {
    return getAlpineData;
});
function getAlpineData(el) {
    return el._x_dataStack[0];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"ipCdL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function sizeObserver() {
    return {
        width: 0,
        height: 0,
        init: function() {
            var _this = this;
            var ro = new ResizeObserver(function(entries) {
                var rect = entries[0].contentRect;
                _this.width = Math.round(rect.width);
                _this.height = Math.round(rect.height);
            });
            ro.observe(this.$el);
            this.width = Math.round(this.$el.clientWidth);
            this.height = Math.round(this.$el.clientHeight);
        }
    };
}
exports.default = sizeObserver;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"clyCh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function createFilterStore(Alpine) {
    return {
        raw: Alpine.$persist("").as("filter-text"),
        get text () {
            return this.raw.replace(/\s/g, "").toLowerCase();
        },
        get active () {
            return this.text.length > 0;
        }
    };
}
exports.default = createFilterStore;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"dS8Sg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
var _configDefault = parcelHelpers.interopDefault(_config);
function createLayoutStore() {
    return {
        init: function() {
            this.desktop = window.innerWidth >= _configDefault.default.desktopWidth;
        },
        reflowing: false,
        desktop: true,
        desktopWidth: _configDefault.default.desktopWidth
    };
}
exports.default = createLayoutStore;

},{"../config":"23qj7","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"23qj7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    desktopWidth: 768,
    sidebar: {
        defaultWidth: 280,
        minWidth: 200,
        maxWidth: 500
    },
    inspector: {
        tabs: {
            default: "source",
            defaultHeight: 200
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"dXBwS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function createNavStore(Alpine) {
    return {
        open: Alpine.$persist([]).as("nav-open"),
        active: Alpine.$persist(null).as("nav-active"),
        isOpen: function(id) {
            return this.open.includes(id);
        },
        setOpen: function(id) {
            this.open.push(id);
        },
        setClosed: function(id) {
            var index = this.open.indexOf(id);
            if (index > -1) this.open.splice(index, 1);
        },
        toggle: function(id) {
            this.isOpen(id) ? this.setClosed(id) : this.setOpen(id);
        }
    };
}
exports.default = createNavStore;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"520kV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
var _configDefault = parcelHelpers.interopDefault(_config);
function createSidebarStore(Alpine) {
    var _sidebar = _configDefault.default.sidebar, defaultWidth = _sidebar.defaultWidth, minWidth = _sidebar.minWidth, maxWidth = _sidebar.maxWidth;
    return {
        open: Alpine.$persist(false).as("sidebar-open"),
        width: Alpine.$persist(defaultWidth).as("sidebar-width"),
        minWidth: minWidth,
        maxWidth: maxWidth,
        toggle: function() {
            Alpine.store("sidebar").open = !Alpine.store("sidebar").open;
        }
    };
}
exports.default = createSidebarStore;

},{"../config":"23qj7","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"4zpcp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
var _configDefault = parcelHelpers.interopDefault(_config);
function createInspectorStore(Alpine) {
    var tabs = _configDefault.default.inspector.tabs;
    return {
        panels: {
            active: Alpine.$persist(tabs.default).as("inspector-panel-active"),
            height: Alpine.$persist(tabs.defaultHeight).as("inspector-height")
        },
        preview: {
            width: Alpine.$persist("100%").as("preview-width"),
            height: Alpine.$persist("100%").as("preview-height"),
            source: Alpine.$persist(false).as("preview-source"),
            lastWidth: null
        }
    };
}
exports.default = createInspectorStore;

},{"../config":"23qj7","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kk5Vp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _helpers = require("@swc/helpers");
var _regeneratorRuntime = require("regenerator-runtime");
var _regeneratorRuntimeDefault = parcelHelpers.interopDefault(_regeneratorRuntime);
function copy(id) {
    return {
        get content () {
            var target = document.getElementById(id);
            return (target ? target.innerHTML : "").trim();
        },
        done: false,
        save: function() {
            return _helpers.asyncToGenerator(_regeneratorRuntimeDefault.default.mark(function _callee() {
                var _this;
                return _regeneratorRuntimeDefault.default.wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _this = this;
                            _ctx.next = 3;
                            return window.navigator.clipboard.writeText(this.content);
                        case 3:
                            this.done = true;
                            setTimeout(function() {
                                _this.done = false;
                            }, 1000);
                        case 5:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee, this);
            })).apply(this);
        }
    };
}
exports.default = copy;

},{"@swc/helpers":"erO4s","regenerator-runtime":"12Ae8","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"jkkjy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function navItem(matchers) {
    return {
        hidden: false,
        get id () {
            return this.$root.id;
        },
        get path () {
            return this.$root.getAttribute("data-path");
        },
        get active () {
            return this.$store.nav.active === this.id;
        },
        navigate: function() {
            this.setLocation(this.path);
            this.$store.sidebar.open = false;
        },
        filter: function(text) {
            if (text.length) {
                var matched = matchers.map(function(m) {
                    return m.includes(text);
                });
                this.hidden = !matched.filter(function(m) {
                    return m;
                }).length;
            } else this.hidden = false;
        }
    };
}
exports.default = navItem;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"7yZ5O":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utils = require("../lib/utils");
function navGroup() {
    return {
        hidden: false,
        children: [],
        get id () {
            return this.$root.id;
        },
        get open () {
            return this.$store.nav.isOpen(this.id);
        },
        toggle: function() {
            this.$store.nav.toggle(this.id);
        },
        getChildren: function() {
            return this.$refs.items ? Array.from(this.$refs.items.querySelectorAll(":scope > li")) : [];
        },
        navigateToFirstChild: function() {
            if (this.open) {
                var child = this.firstVisibleChild();
                if (child) {
                    var link = child.querySelector(":scope > a.nav-link");
                    if (link) this.setLocation(link.getAttribute("href"));
                }
            }
        },
        filter: function(text) {
            var _this = this;
            this.hidden = true;
            this.getChildren().forEach(function(child) {
                var data = _utils.getAlpineData(child);
                data.filter(text);
                if (!data.hidden) _this.hidden = false;
            });
        },
        firstVisibleChild: function() {
            return this.getChildren().find(function(child) {
                return child._x_dataStack ? child._x_dataStack[0].hidden === false : false;
            });
        }
    };
}
exports.default = navGroup;

},{"../lib/utils":"efGNF","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"iZ8eY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function preview1() {
    return {
        onResize: function(e) {
            var size = this.resizeStartSize - (this.resizeStartPosition - e.pageX) * 2;
            var parentSize = this.$root.parentElement.clientWidth;
            var percentSize = Math.round(size) / parentSize * 100;
            var minWidth = 300 / parentSize * 100;
            this.$store.inspector.preview.width = "".concat(Math.min(Math.max(percentSize, minWidth), 100), "%");
        },
        onResizeStart: function(e) {
            this.$store.layout.reflowing = true;
            this.onResize = this.onResize.bind(this);
            this.onResizeEnd = this.onResizeEnd.bind(this);
            this.resizeStartPosition = e.pageX;
            this.resizeStartSize = this.$root.clientWidth;
            window.addEventListener("pointermove", this.onResize);
            window.addEventListener("pointerup", this.onResizeEnd);
        },
        onResizeEnd: function() {
            window.removeEventListener("pointermove", this.onResize);
            window.removeEventListener("pointerup", this.onResizeEnd);
            this.$store.layout.reflowing = false;
        },
        toggleFullWidth: function() {
            var preview = this.$store.inspector.preview;
            if (preview.width === "100%" && preview.lastWidth) preview.width = preview.lastWidth;
            else {
                preview.lastWidth = preview.width;
                preview.width = "100%";
            }
        }
    };
}
exports.default = preview1;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}]},["1uIvH","kCDd3"], "kCDd3", "parcelRequirea49c")

//# sourceMappingURL=app.js.map
