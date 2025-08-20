// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
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

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
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
        globalObject
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
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

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
    }
  }
})({"fg55y":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 5111;
var HMR_SERVER_PORT = 5111;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "a80df36d2c2a2a5c";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
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
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
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
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"6iWnD":[function(require,module,exports,__globalThis) {
var _iframeResizerContentWindow = require("iframe-resizer/js/iframeResizer.contentWindow");

},{"iframe-resizer/js/iframeResizer.contentWindow":"3OIqK"}],"3OIqK":[function(require,module,exports,__globalThis) {
/*
 * File: iframeResizer.contentWindow.js
 * Desc: Include this file in any page being loaded into an iframe
 *       to force the iframe to resize to the content size.
 * Requires: iframeResizer.js on host page.
 * Doc: https://iframe-resizer.com
 * Author: David J. Bradshaw - info@iframe-resizer.com
 *
 */ // eslint-disable-next-line sonarjs/cognitive-complexity, no-shadow-restricted-names
(function(undefined) {
    if (typeof window === 'undefined') return; // don't run for server side render
    var autoResize = true, base = 10, bodyBackground = '', bodyMargin = 0, bodyMarginStr = '', bodyObserver = null, bodyPadding = '', calculateWidth = false, doubleEventList = {
        resize: 1,
        click: 1
    }, eventCancelTimer = 128, firstRun = true, height = 1, heightCalcModeDefault = 'bodyOffset', heightCalcMode = heightCalcModeDefault, initLock = true, initMsg = '', inPageLinks = {}, interval = 32, intervalTimer = null, logging = false, mouseEvents = false, msgID = '[iFrameSizer]', msgIdLen = msgID.length, myID = '', resetRequiredMethods = {
        max: 1,
        min: 1,
        bodyScroll: 1,
        documentElementScroll: 1
    }, resizeFrom = 'child', sendPermit = true, target = window.parent, targetOriginDefault = '*', tolerance = 0, triggerLocked = false, triggerLockedTimer = null, throttledTimer = 16, width = 1, widthCalcModeDefault = 'scroll', widthCalcMode = widthCalcModeDefault, win = window, onMessage = function() {
        warn('onMessage function not defined');
    }, onReady = function() {}, onPageInfo = function() {}, customCalcMethods = {
        height: function() {
            warn('Custom height calculation function not defined');
            return document.documentElement.offsetHeight;
        },
        width: function() {
            warn('Custom width calculation function not defined');
            return document.body.scrollWidth;
        }
    }, eventHandlersByName = {}, passiveSupported = false;
    function noop() {}
    try {
        var options = Object.create({}, {
            passive: {
                // eslint-disable-next-line getter-return
                get: function() {
                    passiveSupported = true;
                }
            }
        });
        window.addEventListener('test', noop, options);
        window.removeEventListener('test', noop, options);
    } catch (error) {
    /* */ }
    function addEventListener(el, evt, func, options) {
        el.addEventListener(evt, func, passiveSupported ? options || {} : false);
    }
    function removeEventListener(el, evt, func) {
        el.removeEventListener(evt, func, false);
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // Based on underscore.js
    function throttle(func) {
        var context, args, result, timeout = null, previous = 0, later = function() {
            previous = Date.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) // eslint-disable-next-line no-multi-assign
            context = args = null;
        };
        return function() {
            var now = Date.now();
            if (!previous) previous = now;
            var remaining = throttledTimer - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > throttledTimer) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) // eslint-disable-next-line no-multi-assign
                context = args = null;
            } else if (!timeout) timeout = setTimeout(later, remaining);
            return result;
        };
    }
    function formatLogMsg(msg) {
        return msgID + '[' + myID + '] ' + msg;
    }
    function log(msg) {
        if (logging && 'object' === typeof window.console) // eslint-disable-next-line no-console
        console.log(formatLogMsg(msg));
    }
    function warn(msg) {
        if ('object' === typeof window.console) // eslint-disable-next-line no-console
        console.warn(formatLogMsg(msg));
    }
    function init() {
        readDataFromParent();
        log('Initialising iFrame (' + window.location.href + ')');
        readDataFromPage();
        setMargin();
        setBodyStyle('background', bodyBackground);
        setBodyStyle('padding', bodyPadding);
        injectClearFixIntoBodyElement();
        checkHeightMode();
        checkWidthMode();
        stopInfiniteResizingOfIFrame();
        setupPublicMethods();
        setupMouseEvents();
        startEventListeners();
        inPageLinks = setupInPageLinks();
        sendSize('init', 'Init message from host page');
        onReady();
    }
    function readDataFromParent() {
        function strBool(str) {
            return 'true' === str;
        }
        var data = initMsg.slice(msgIdLen).split(':');
        myID = data[0];
        bodyMargin = undefined === data[1] ? bodyMargin : Number(data[1]) // For V1 compatibility
        ;
        calculateWidth = undefined === data[2] ? calculateWidth : strBool(data[2]);
        logging = undefined === data[3] ? logging : strBool(data[3]);
        interval = undefined === data[4] ? interval : Number(data[4]);
        autoResize = undefined === data[6] ? autoResize : strBool(data[6]);
        bodyMarginStr = data[7];
        heightCalcMode = undefined === data[8] ? heightCalcMode : data[8];
        bodyBackground = data[9];
        bodyPadding = data[10];
        tolerance = undefined === data[11] ? tolerance : Number(data[11]);
        inPageLinks.enable = undefined === data[12] ? false : strBool(data[12]);
        resizeFrom = undefined === data[13] ? resizeFrom : data[13];
        widthCalcMode = undefined === data[14] ? widthCalcMode : data[14];
        mouseEvents = undefined === data[15] ? mouseEvents : strBool(data[15]);
    }
    function depricate(key) {
        var splitName = key.split('Callback');
        if (splitName.length === 2) {
            var name = 'on' + splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
            this[name] = this[key];
            delete this[key];
            warn("Deprecated: '" + key + "' has been renamed '" + name + "'. The old method will be removed in the next major version.");
        }
    }
    function readDataFromPage() {
        function readData() {
            var data = window.iFrameResizer;
            log('Reading data from page: ' + JSON.stringify(data));
            Object.keys(data).forEach(depricate, data);
            onMessage = 'onMessage' in data ? data.onMessage : onMessage;
            onReady = 'onReady' in data ? data.onReady : onReady;
            targetOriginDefault = 'targetOrigin' in data ? data.targetOrigin : targetOriginDefault;
            heightCalcMode = 'heightCalculationMethod' in data ? data.heightCalculationMethod : heightCalcMode;
            widthCalcMode = 'widthCalculationMethod' in data ? data.widthCalculationMethod : widthCalcMode;
        }
        function setupCustomCalcMethods(calcMode, calcFunc) {
            if ('function' === typeof calcMode) {
                log('Setup custom ' + calcFunc + 'CalcMethod');
                customCalcMethods[calcFunc] = calcMode;
                calcMode = 'custom';
            }
            return calcMode;
        }
        if ('iFrameResizer' in window && Object === window.iFrameResizer.constructor) {
            readData();
            heightCalcMode = setupCustomCalcMethods(heightCalcMode, 'height');
            widthCalcMode = setupCustomCalcMethods(widthCalcMode, 'width');
        }
        log('TargetOrigin for parent set to: ' + targetOriginDefault);
    }
    function chkCSS(attr, value) {
        if (-1 !== value.indexOf('-')) {
            warn('Negative CSS value ignored for ' + attr);
            value = '';
        }
        return value;
    }
    function setBodyStyle(attr, value) {
        if (undefined !== value && '' !== value && 'null' !== value) {
            document.body.style[attr] = value;
            log('Body ' + attr + ' set to "' + value + '"');
        }
    }
    function setMargin() {
        // If called via V1 script, convert bodyMargin from int to str
        if (undefined === bodyMarginStr) bodyMarginStr = bodyMargin + 'px';
        setBodyStyle('margin', chkCSS('margin', bodyMarginStr));
    }
    function stopInfiniteResizingOfIFrame() {
        document.documentElement.style.height = '';
        document.body.style.height = '';
        log('HTML & body height set to "auto"');
    }
    function manageTriggerEvent(options) {
        var listener = {
            add: function(eventName) {
                function handleEvent() {
                    sendSize(options.eventName, options.eventType);
                }
                eventHandlersByName[eventName] = handleEvent;
                addEventListener(window, eventName, handleEvent, {
                    passive: true
                });
            },
            remove: function(eventName) {
                var handleEvent = eventHandlersByName[eventName];
                delete eventHandlersByName[eventName];
                removeEventListener(window, eventName, handleEvent);
            }
        };
        if (options.eventNames && Array.prototype.map) {
            options.eventName = options.eventNames[0];
            options.eventNames.map(listener[options.method]);
        } else listener[options.method](options.eventName);
        log(capitalizeFirstLetter(options.method) + ' event listener: ' + options.eventType);
    }
    function manageEventListeners(method) {
        manageTriggerEvent({
            method: method,
            eventType: 'Animation Start',
            eventNames: [
                'animationstart',
                'webkitAnimationStart'
            ]
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Animation Iteration',
            eventNames: [
                'animationiteration',
                'webkitAnimationIteration'
            ]
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Animation End',
            eventNames: [
                'animationend',
                'webkitAnimationEnd'
            ]
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Input',
            eventName: 'input'
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Mouse Up',
            eventName: 'mouseup'
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Mouse Down',
            eventName: 'mousedown'
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Orientation Change',
            eventName: 'orientationchange'
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Print',
            eventNames: [
                'afterprint',
                'beforeprint'
            ]
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Ready State Change',
            eventName: 'readystatechange'
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Touch Start',
            eventName: 'touchstart'
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Touch End',
            eventName: 'touchend'
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Touch Cancel',
            eventName: 'touchcancel'
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Transition Start',
            eventNames: [
                'transitionstart',
                'webkitTransitionStart',
                'MSTransitionStart',
                'oTransitionStart',
                'otransitionstart'
            ]
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Transition Iteration',
            eventNames: [
                'transitioniteration',
                'webkitTransitionIteration',
                'MSTransitionIteration',
                'oTransitionIteration',
                'otransitioniteration'
            ]
        });
        manageTriggerEvent({
            method: method,
            eventType: 'Transition End',
            eventNames: [
                'transitionend',
                'webkitTransitionEnd',
                'MSTransitionEnd',
                'oTransitionEnd',
                'otransitionend'
            ]
        });
        if ('child' === resizeFrom) manageTriggerEvent({
            method: method,
            eventType: 'IFrame Resized',
            eventName: 'resize'
        });
    }
    function checkCalcMode(calcMode, calcModeDefault, modes, type) {
        if (calcModeDefault !== calcMode) {
            if (!(calcMode in modes)) {
                warn(calcMode + ' is not a valid option for ' + type + 'CalculationMethod.');
                calcMode = calcModeDefault;
            }
            log(type + ' calculation method set to "' + calcMode + '"');
        }
        return calcMode;
    }
    function checkHeightMode() {
        heightCalcMode = checkCalcMode(heightCalcMode, heightCalcModeDefault, getHeight, 'height');
    }
    function checkWidthMode() {
        widthCalcMode = checkCalcMode(widthCalcMode, widthCalcModeDefault, getWidth, 'width');
    }
    function startEventListeners() {
        if (true === autoResize) {
            manageEventListeners('add');
            setupMutationObserver();
        } else log('Auto Resize disabled');
    }
    //   function stopMsgsToParent() {
    //     log('Disable outgoing messages')
    //     sendPermit = false
    //   }
    //   function removeMsgListener() {
    //     log('Remove event listener: Message')
    //     removeEventListener(window, 'message', receiver)
    //   }
    function disconnectMutationObserver() {
        if (null !== bodyObserver) /* istanbul ignore next */ // Not testable in PhantonJS
        bodyObserver.disconnect();
    }
    function stopEventListeners() {
        manageEventListeners('remove');
        disconnectMutationObserver();
        clearInterval(intervalTimer);
    }
    //   function teardown() {
    //     stopMsgsToParent()
    //     removeMsgListener()
    //     if (true === autoResize) stopEventListeners()
    //   }
    function injectClearFixIntoBodyElement() {
        var clearFix = document.createElement('div');
        clearFix.style.clear = 'both';
        // Guard against the following having been globally redefined in CSS.
        clearFix.style.display = 'block';
        clearFix.style.height = '0';
        document.body.appendChild(clearFix);
    }
    function setupInPageLinks() {
        function getPagePosition() {
            return {
                x: window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset,
                y: window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset
            };
        }
        function getElementPosition(el) {
            var elPosition = el.getBoundingClientRect(), pagePosition = getPagePosition();
            return {
                x: parseInt(elPosition.left, 10) + parseInt(pagePosition.x, 10),
                y: parseInt(elPosition.top, 10) + parseInt(pagePosition.y, 10)
            };
        }
        function findTarget(location) {
            function jumpToTarget(target) {
                var jumpPosition = getElementPosition(target);
                log('Moving to in page link (#' + hash + ') at x: ' + jumpPosition.x + ' y: ' + jumpPosition.y);
                sendMsg(jumpPosition.y, jumpPosition.x, 'scrollToOffset') // X&Y reversed at sendMsg uses height/width
                ;
            }
            var hash = location.split('#')[1] || location, hashData = decodeURIComponent(hash), target = document.getElementById(hashData) || document.getElementsByName(hashData)[0];
            if (undefined === target) {
                log('In page link (#' + hash + ') not found in iFrame, so sending to parent');
                sendMsg(0, 0, 'inPageLink', '#' + hash);
            } else jumpToTarget(target);
        }
        function checkLocationHash() {
            var hash = window.location.hash;
            var href = window.location.href;
            if ('' !== hash && '#' !== hash) findTarget(href);
        }
        function bindAnchors() {
            function setupLink(el) {
                function linkClicked(e) {
                    e.preventDefault();
                    /* jshint validthis:true */ findTarget(this.getAttribute('href'));
                }
                if ('#' !== el.getAttribute('href')) addEventListener(el, 'click', linkClicked);
            }
            Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), setupLink);
        }
        function bindLocationHash() {
            addEventListener(window, 'hashchange', checkLocationHash);
        }
        function initCheck() {
            // Check if page loaded with location hash after init resize
            setTimeout(checkLocationHash, eventCancelTimer);
        }
        function enableInPageLinks() {
            /* istanbul ignore else */ // Not testable in phantonJS
            if (Array.prototype.forEach && document.querySelectorAll) {
                log('Setting up location.hash handlers');
                bindAnchors();
                bindLocationHash();
                initCheck();
            } else warn('In page linking not fully supported in this browser! (See README.md for IE8 workaround)');
        }
        if (inPageLinks.enable) enableInPageLinks();
        else log('In page linking not enabled');
        return {
            findTarget: findTarget
        };
    }
    function setupMouseEvents() {
        if (mouseEvents !== true) return;
        function sendMouse(e) {
            sendMsg(0, 0, e.type, e.screenY + ':' + e.screenX);
        }
        function addMouseListener(evt, name) {
            log('Add event listener: ' + name);
            addEventListener(window.document, evt, sendMouse);
        }
        addMouseListener('mouseenter', 'Mouse Enter');
        addMouseListener('mouseleave', 'Mouse Leave');
    }
    function setupPublicMethods() {
        log('Enable public methods');
        win.parentIFrame = {
            autoResize: function autoResizeF(resize) {
                if (true === resize && false === autoResize) {
                    autoResize = true;
                    startEventListeners();
                } else if (false === resize && true === autoResize) {
                    autoResize = false;
                    stopEventListeners();
                }
                sendMsg(0, 0, 'autoResize', JSON.stringify(autoResize));
                return autoResize;
            },
            close: function closeF() {
                sendMsg(0, 0, 'close');
            // teardown()
            },
            getId: function getIdF() {
                return myID;
            },
            getPageInfo: function getPageInfoF(callback) {
                if ('function' === typeof callback) {
                    onPageInfo = callback;
                    sendMsg(0, 0, 'pageInfo');
                } else {
                    onPageInfo = function() {};
                    sendMsg(0, 0, 'pageInfoStop');
                }
            },
            moveToAnchor: function moveToAnchorF(hash) {
                inPageLinks.findTarget(hash);
            },
            reset: function resetF() {
                resetIFrame('parentIFrame.reset');
            },
            scrollTo: function scrollToF(x, y) {
                sendMsg(y, x, 'scrollTo') // X&Y reversed at sendMsg uses height/width
                ;
            },
            scrollToOffset: function scrollToF(x, y) {
                sendMsg(y, x, 'scrollToOffset') // X&Y reversed at sendMsg uses height/width
                ;
            },
            sendMessage: function sendMessageF(msg, targetOrigin) {
                sendMsg(0, 0, 'message', JSON.stringify(msg), targetOrigin);
            },
            setHeightCalculationMethod: function setHeightCalculationMethodF(heightCalculationMethod) {
                heightCalcMode = heightCalculationMethod;
                checkHeightMode();
            },
            setWidthCalculationMethod: function setWidthCalculationMethodF(widthCalculationMethod) {
                widthCalcMode = widthCalculationMethod;
                checkWidthMode();
            },
            setTargetOrigin: function setTargetOriginF(targetOrigin) {
                log('Set targetOrigin: ' + targetOrigin);
                targetOriginDefault = targetOrigin;
            },
            size: function sizeF(customHeight, customWidth) {
                var valString = '' + (customHeight || '') + (customWidth ? ',' + customWidth : '');
                sendSize('size', 'parentIFrame.size(' + valString + ')', customHeight, customWidth);
            }
        };
    }
    function initInterval() {
        if (0 !== interval) {
            log('setInterval: ' + interval + 'ms');
            intervalTimer = setInterval(function() {
                sendSize('interval', 'setInterval: ' + interval);
            }, Math.abs(interval));
        }
    }
    // Not testable in PhantomJS
    /* istanbul ignore next */ function setupBodyMutationObserver() {
        function addImageLoadListners(mutation) {
            function addImageLoadListener(element) {
                if (false === element.complete) {
                    log('Attach listeners to ' + element.src);
                    element.addEventListener('load', imageLoaded, false);
                    element.addEventListener('error', imageError, false);
                    elements.push(element);
                }
            }
            if (mutation.type === 'attributes' && mutation.attributeName === 'src') addImageLoadListener(mutation.target);
            else if (mutation.type === 'childList') Array.prototype.forEach.call(mutation.target.querySelectorAll('img'), addImageLoadListener);
        }
        function removeFromArray(element) {
            elements.splice(elements.indexOf(element), 1);
        }
        function removeImageLoadListener(element) {
            log('Remove listeners from ' + element.src);
            element.removeEventListener('load', imageLoaded, false);
            element.removeEventListener('error', imageError, false);
            removeFromArray(element);
        }
        function imageEventTriggered(event, type, typeDesc) {
            removeImageLoadListener(event.target);
            sendSize(type, typeDesc + ': ' + event.target.src);
        }
        function imageLoaded(event) {
            imageEventTriggered(event, 'imageLoad', 'Image loaded');
        }
        function imageError(event) {
            imageEventTriggered(event, 'imageLoadFailed', 'Image load failed');
        }
        function mutationObserved(mutations) {
            sendSize('mutationObserver', 'mutationObserver: ' + mutations[0].target + ' ' + mutations[0].type);
            // Deal with WebKit / Blink asyncing image loading when tags are injected into the page
            mutations.forEach(addImageLoadListners);
        }
        function createMutationObserver() {
            var target = document.querySelector('body'), config = {
                attributes: true,
                attributeOldValue: false,
                characterData: true,
                characterDataOldValue: false,
                childList: true,
                subtree: true
            };
            observer = new MutationObserver(mutationObserved);
            log('Create body MutationObserver');
            observer.observe(target, config);
            return observer;
        }
        var elements = [], MutationObserver = window.MutationObserver || window.WebKitMutationObserver, observer = createMutationObserver();
        return {
            disconnect: function() {
                if ('disconnect' in observer) {
                    log('Disconnect body MutationObserver');
                    observer.disconnect();
                    elements.forEach(removeImageLoadListener);
                }
            }
        };
    }
    function setupMutationObserver() {
        var forceIntervalTimer = 0 > interval;
        // Not testable in PhantomJS
        /* istanbul ignore if */ if (window.MutationObserver || window.WebKitMutationObserver) {
            if (forceIntervalTimer) initInterval();
            else bodyObserver = setupBodyMutationObserver();
        } else {
            log('MutationObserver not supported in this browser!');
            initInterval();
        }
    }
    // document.documentElement.offsetHeight is not reliable, so
    // we have to jump through hoops to get a better value.
    function getComputedStyle(prop, el) {
        var retVal = 0;
        el = el || document.body // Not testable in phantonJS
        ;
        retVal = document.defaultView.getComputedStyle(el, null);
        retVal = null === retVal ? 0 : retVal[prop];
        return parseInt(retVal, base);
    }
    function chkEventThottle(timer) {
        if (timer > throttledTimer / 2) {
            throttledTimer = 2 * timer;
            log('Event throttle increased to ' + throttledTimer + 'ms');
        }
    }
    // Idea from https://github.com/guardian/iframe-messenger
    function getMaxElement(side, elements) {
        var elementsLength = elements.length, elVal = 0, maxVal = 0, Side = capitalizeFirstLetter(side), timer = Date.now();
        for(var i = 0; i < elementsLength; i++){
            elVal = elements[i].getBoundingClientRect()[side] + getComputedStyle('margin' + Side, elements[i]);
            if (elVal > maxVal) maxVal = elVal;
        }
        timer = Date.now() - timer;
        log('Parsed ' + elementsLength + ' HTML elements');
        log('Element position calculated in ' + timer + 'ms');
        chkEventThottle(timer);
        return maxVal;
    }
    function getAllMeasurements(dimensions) {
        return [
            dimensions.bodyOffset(),
            dimensions.bodyScroll(),
            dimensions.documentElementOffset(),
            dimensions.documentElementScroll()
        ];
    }
    function getTaggedElements(side, tag) {
        function noTaggedElementsFound() {
            warn('No tagged elements (' + tag + ') found on page');
            return document.querySelectorAll('body *');
        }
        var elements = document.querySelectorAll('[' + tag + ']');
        if (elements.length === 0) noTaggedElementsFound();
        return getMaxElement(side, elements);
    }
    function getAllElements() {
        return document.querySelectorAll('body *');
    }
    var getHeight = {
        bodyOffset: function getBodyOffsetHeight() {
            return document.body.offsetHeight + getComputedStyle('marginTop') + getComputedStyle('marginBottom');
        },
        offset: function() {
            return getHeight.bodyOffset() // Backwards compatibility
            ;
        },
        bodyScroll: function getBodyScrollHeight() {
            return document.body.scrollHeight;
        },
        custom: function getCustomWidth() {
            return customCalcMethods.height();
        },
        documentElementOffset: function getDEOffsetHeight() {
            return document.documentElement.offsetHeight;
        },
        documentElementScroll: function getDEScrollHeight() {
            return document.documentElement.scrollHeight;
        },
        max: function getMaxHeight() {
            return Math.max.apply(null, getAllMeasurements(getHeight));
        },
        min: function getMinHeight() {
            return Math.min.apply(null, getAllMeasurements(getHeight));
        },
        grow: function growHeight() {
            return getHeight.max() // Run max without the forced downsizing
            ;
        },
        lowestElement: function getBestHeight() {
            return Math.max(getHeight.bodyOffset() || getHeight.documentElementOffset(), getMaxElement('bottom', getAllElements()));
        },
        taggedElement: function getTaggedElementsHeight() {
            return getTaggedElements('bottom', 'data-iframe-height');
        }
    }, getWidth = {
        bodyScroll: function getBodyScrollWidth() {
            return document.body.scrollWidth;
        },
        bodyOffset: function getBodyOffsetWidth() {
            return document.body.offsetWidth;
        },
        custom: function getCustomWidth() {
            return customCalcMethods.width();
        },
        documentElementScroll: function getDEScrollWidth() {
            return document.documentElement.scrollWidth;
        },
        documentElementOffset: function getDEOffsetWidth() {
            return document.documentElement.offsetWidth;
        },
        scroll: function getMaxWidth() {
            return Math.max(getWidth.bodyScroll(), getWidth.documentElementScroll());
        },
        max: function getMaxWidth() {
            return Math.max.apply(null, getAllMeasurements(getWidth));
        },
        min: function getMinWidth() {
            return Math.min.apply(null, getAllMeasurements(getWidth));
        },
        rightMostElement: function rightMostElement() {
            return getMaxElement('right', getAllElements());
        },
        taggedElement: function getTaggedElementsWidth() {
            return getTaggedElements('right', 'data-iframe-width');
        }
    };
    function sizeIFrame(triggerEvent, triggerEventDesc, customHeight, customWidth) {
        function resizeIFrame() {
            height = currentHeight;
            width = currentWidth;
            sendMsg(height, width, triggerEvent);
        }
        function isSizeChangeDetected() {
            function checkTolarance(a, b) {
                var retVal = Math.abs(a - b) <= tolerance;
                return !retVal;
            }
            currentHeight = undefined === customHeight ? getHeight[heightCalcMode]() : customHeight;
            currentWidth = undefined === customWidth ? getWidth[widthCalcMode]() : customWidth;
            return checkTolarance(height, currentHeight) || calculateWidth && checkTolarance(width, currentWidth);
        }
        function isForceResizableEvent() {
            return !(triggerEvent in {
                init: 1,
                interval: 1,
                size: 1
            });
        }
        function isForceResizableCalcMode() {
            return heightCalcMode in resetRequiredMethods || calculateWidth && widthCalcMode in resetRequiredMethods;
        }
        function logIgnored() {
            log('No change in size detected');
        }
        function checkDownSizing() {
            if (isForceResizableEvent() && isForceResizableCalcMode()) resetIFrame(triggerEventDesc);
            else if (!(triggerEvent in {
                interval: 1
            })) logIgnored();
        }
        var currentHeight, currentWidth;
        if (isSizeChangeDetected() || 'init' === triggerEvent) {
            lockTrigger();
            resizeIFrame();
        } else checkDownSizing();
    }
    var sizeIFrameThrottled = throttle(sizeIFrame);
    function sendSize(triggerEvent, triggerEventDesc, customHeight, customWidth) {
        function recordTrigger() {
            if (!(triggerEvent in {
                reset: 1,
                resetPage: 1,
                init: 1
            })) log('Trigger event: ' + triggerEventDesc);
        }
        function isDoubleFiredEvent() {
            return triggerLocked && triggerEvent in doubleEventList;
        }
        if (isDoubleFiredEvent()) log('Trigger event cancelled: ' + triggerEvent);
        else {
            recordTrigger();
            if (triggerEvent === 'init') sizeIFrame(triggerEvent, triggerEventDesc, customHeight, customWidth);
            else sizeIFrameThrottled(triggerEvent, triggerEventDesc, customHeight, customWidth);
        }
    }
    function lockTrigger() {
        if (!triggerLocked) {
            triggerLocked = true;
            log('Trigger event lock on');
        }
        clearTimeout(triggerLockedTimer);
        triggerLockedTimer = setTimeout(function() {
            triggerLocked = false;
            log('Trigger event lock off');
            log('--');
        }, eventCancelTimer);
    }
    function triggerReset(triggerEvent) {
        height = getHeight[heightCalcMode]();
        width = getWidth[widthCalcMode]();
        sendMsg(height, width, triggerEvent);
    }
    function resetIFrame(triggerEventDesc) {
        var hcm = heightCalcMode;
        heightCalcMode = heightCalcModeDefault;
        log('Reset trigger event: ' + triggerEventDesc);
        lockTrigger();
        triggerReset('reset');
        heightCalcMode = hcm;
    }
    function sendMsg(height, width, triggerEvent, msg, targetOrigin) {
        function setTargetOrigin() {
            if (undefined === targetOrigin) targetOrigin = targetOriginDefault;
            else log('Message targetOrigin: ' + targetOrigin);
        }
        function sendToParent() {
            var size = height + ':' + width, message = myID + ':' + size + ':' + triggerEvent + (undefined === msg ? '' : ':' + msg);
            log('Sending message to host page (' + message + ')');
            target.postMessage(msgID + message, targetOrigin);
        }
        if (true === sendPermit) {
            setTargetOrigin();
            sendToParent();
        }
    }
    function receiver(event) {
        var processRequestFromParent = {
            init: function initFromParent() {
                initMsg = event.data;
                target = event.source;
                init();
                firstRun = false;
                setTimeout(function() {
                    initLock = false;
                }, eventCancelTimer);
            },
            reset: function resetFromParent() {
                if (initLock) log('Page reset ignored by init');
                else {
                    log('Page size reset by host page');
                    triggerReset('resetPage');
                }
            },
            resize: function resizeFromParent() {
                sendSize('resizeParent', 'Parent window requested size check');
            },
            moveToAnchor: function moveToAnchorF() {
                inPageLinks.findTarget(getData());
            },
            inPageLink: function inPageLinkF() {
                this.moveToAnchor();
            },
            pageInfo: function pageInfoFromParent() {
                var msgBody = getData();
                log('PageInfoFromParent called from parent: ' + msgBody);
                onPageInfo(JSON.parse(msgBody));
                log(' --');
            },
            message: function messageFromParent() {
                var msgBody = getData();
                log('onMessage called from parent: ' + msgBody);
                // eslint-disable-next-line sonarjs/no-extra-arguments
                onMessage(JSON.parse(msgBody));
                log(' --');
            }
        };
        function isMessageForUs() {
            return msgID === ('' + event.data).slice(0, msgIdLen) // ''+ Protects against non-string messages
            ;
        }
        function getMessageType() {
            return event.data.split(']')[1].split(':')[0];
        }
        function getData() {
            return event.data.slice(event.data.indexOf(':') + 1);
        }
        function isMiddleTier() {
            return !module.exports && 'iFrameResize' in window || window.jQuery !== undefined && 'iFrameResize' in window.jQuery.prototype;
        }
        function isInitMsg() {
            // Test if this message is from a child below us. This is an ugly test, however, updating
            // the message format would break backwards compatibility.
            return event.data.split(':')[2] in {
                true: 1,
                false: 1
            };
        }
        function callFromParent() {
            var messageType = getMessageType();
            if (messageType in processRequestFromParent) processRequestFromParent[messageType]();
            else if (!isMiddleTier() && !isInitMsg()) warn('Unexpected message (' + event.data + ')');
        }
        function processMessage() {
            if (false === firstRun) callFromParent();
            else if (isInitMsg()) processRequestFromParent.init();
            else log('Ignored message of type "' + getMessageType() + '". Received before initialization.');
        }
        if (isMessageForUs()) processMessage();
    }
    // Normally the parent kicks things off when it detects the iFrame has loaded.
    // If this script is async-loaded, then tell parent page to retry init.
    function chkLateLoaded() {
        if ('loading' !== document.readyState) window.parent.postMessage('[iFrameResizerChild]Ready', '*');
    }
    // Setup if not already running
    if (!('iframeResizer' in window)) {
        window.iframeChildListener = function(data) {
            receiver({
                data,
                sameDomian: true
            });
        };
        addEventListener(window, 'message', receiver);
        addEventListener(window, 'readystatechange', chkLateLoaded);
        chkLateLoaded();
    }
})();

},{}]},["fg55y","6iWnD"], "6iWnD", "parcelRequirea49c", {})

//# sourceMappingURL=iframe.js.map
