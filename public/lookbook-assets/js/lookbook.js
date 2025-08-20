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
})({"7eNRd":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 5111;
var HMR_SERVER_PORT = 5111;
var HMR_SECURE = false;
var HMR_ENV_HASH = "42036d7a98ade5a7";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "9e4f761d7c794211";
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

},{}],"a2Jjp":[function(require,module,exports,__globalThis) {
var _iframeResizer = require("iframe-resizer/js/iframeResizer");
var _lookbook = require("./lib/lookbook");

},{"iframe-resizer/js/iframeResizer":"5kZ3k","./lib/lookbook":"eL04M"}],"5kZ3k":[function(require,module,exports,__globalThis) {
/*
 * File: iframeResizer.js
 * Desc: Force iframes to size to content.
 * Requires: iframeResizer.contentWindow.js to be loaded into the target frame.
 * Doc: https://iframe-resizer.com
 * Author: David J. Bradshaw - info@iframe-resizer.com
 */ console.info(`
IFRAME-RESIZER

Iframe-Resizer 5 is now available via the following two packages:

 * @iframe-resizer/parent
 * @iframe-resizer/child

Additionally their are also new versions of iframe-resizer for React, Vue, and jQuery.

Version 5 of iframe-resizer has been extensively rewritten to use modern browser APIs, which has enabled significantly better performance and greater accuracy in the detection of content resizing events.

Please see https://iframe-resizer.com/upgrade for more details.
`);
(function(undefined) {
    if (typeof window === 'undefined') return; // don't run for server side render
    // var VERSION = '4.3.11'
    var count = 0, destroyObserver, logEnabled = false, hiddenCheckEnabled = false, msgHeader = 'message', msgHeaderLen = msgHeader.length, msgId = '[iFrameSizer]', msgIdLen = msgId.length, pagePosition = null, requestAnimationFrame = window.requestAnimationFrame, resetRequiredMethods = Object.freeze({
        max: 1,
        scroll: 1,
        bodyScroll: 1,
        documentElementScroll: 1
    }), settings = {}, timer = null, defaults = Object.freeze({
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
        license: '1jqr0si6pnt',
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
    });
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
        if (requestAnimationFrame) // Firefox extension content-scripts have a globalThis object that is not the same as window.
        // Binding `requestAnimationFrame` to window allows the function to work and prevents errors
        // being thrown when run in that context, and should be a no-op in every other context.
        requestAnimationFrame = requestAnimationFrame.bind(window);
        else log('setup', 'RequestAnimationFrame not supported');
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
    function iFrameListener(event) {
        function resizeIFrame() {
            function resize() {
                setSize(messageData);
                setPagePosition(iframeId);
                on('onResized', messageData);
            }
            ensureInRange('Height');
            ensureInRange('Width');
            syncResize(resize, messageData, 'init');
        }
        function processMsg() {
            var data = msg.slice(msgIdLen).split(':');
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
            var max = Number(settings[iframeId]['max' + Dimension]), min = Number(settings[iframeId]['min' + Dimension]), dimension = Dimension.toLowerCase(), size = Number(messageData[dimension]);
            log(iframeId, 'Checking ' + dimension + ' is in range ' + min + '-' + max);
            if (size < min) {
                size = min;
                log(iframeId, 'Set ' + dimension + ' to min value');
            }
            if (size > max) {
                size = max;
                log(iframeId, 'Set ' + dimension + ' to max value');
            }
            messageData[dimension] = '' + size;
        }
        function isMessageFromIFrame() {
            function checkAllowedOrigin() {
                function checkList() {
                    var i = 0, retCode = false;
                    log(iframeId, 'Checking connection is from allowed list of origins: ' + checkOrigin);
                    for(; i < checkOrigin.length; i++)if (checkOrigin[i] === origin) {
                        retCode = true;
                        break;
                    }
                    return retCode;
                }
                function checkSingle() {
                    var remoteHost = settings[iframeId] && settings[iframeId].remoteHost;
                    log(iframeId, 'Checking connection is from: ' + remoteHost);
                    return origin === remoteHost;
                }
                return checkOrigin.constructor === Array ? checkList() : checkSingle();
            }
            var origin = event.origin, checkOrigin = settings[iframeId] && settings[iframeId].checkOrigin;
            if (checkOrigin && '' + origin !== 'null' && !checkAllowedOrigin()) throw new Error('Unexpected message received from: ' + origin + ' for ' + messageData.iframe.id + '. Message was: ' + event.data + '. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.');
            return true;
        }
        function isMessageForUs() {
            return msgId === ('' + msg).slice(0, msgIdLen) && msg.slice(msgIdLen).split(':')[0] in settings // ''+Protects against non-string msg
            ;
        }
        function isMessageFromMetaParent() {
            // Test if this message is from a parent above us. This is an ugly test, however, updating
            // the message format would break backwards compatibility.
            var retCode = messageData.type in {
                true: 1,
                false: 1,
                undefined: 1
            };
            if (retCode) log(iframeId, 'Ignoring init message from meta parent page');
            return retCode;
        }
        function getMsgBody(offset) {
            return msg.slice(msg.indexOf(':') + msgHeaderLen + offset);
        }
        function forwardMsgFromIFrame(msgBody) {
            log(iframeId, 'onMessage passed: {iframe: ' + messageData.iframe.id + ', message: ' + msgBody + '}');
            on('onMessage', {
                iframe: messageData.iframe,
                message: JSON.parse(msgBody)
            });
            log(iframeId, '--');
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
            var id = iframeId // Create locally scoped copy of iFrame ID
            ;
            start();
            if (settings[id]) settings[id].stopPageInfo = stop;
        }
        function stopPageInfoMonitor() {
            if (settings[iframeId] && settings[iframeId].stopPageInfo) {
                settings[iframeId].stopPageInfo();
                delete settings[iframeId].stopPageInfo;
            }
        }
        function checkIFrameExists() {
            var retBool = true;
            if (null === messageData.iframe) {
                warn(iframeId, 'IFrame (' + messageData.id + ') not found');
                retBool = false;
            }
            return retBool;
        }
        function getElementPosition(target) {
            var iFramePosition = target.getBoundingClientRect();
            getPagePosition(iframeId);
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
                log(iframeId, '--');
            }
            function calcOffset() {
                return {
                    x: Number(messageData.width) + offset.x,
                    y: Number(messageData.height) + offset.y
                };
            }
            function scrollParent() {
                if (window.parentIFrame) window.parentIFrame['scrollTo' + (addOffset ? 'Offset' : '')](newPosition.x, newPosition.y);
                else warn(iframeId, 'Unable to scroll to requested position, window.parentIFrame not found');
            }
            var offset = addOffset ? getElementPosition(messageData.iframe) : {
                x: 0,
                y: 0
            }, newPosition = calcOffset();
            log(iframeId, 'Reposition requested from iFrame (offset x:' + offset.x + ' y:' + offset.y + ')');
            if (window.top === window.self) reposition();
            else scrollParent();
        }
        function scrollTo() {
            if (false === on('onScroll', pagePosition)) unsetPagePosition();
            else setPagePosition(iframeId);
        }
        function findTarget(location) {
            function jumpToTarget() {
                var jumpPosition = getElementPosition(target);
                log(iframeId, 'Moving to in page link (#' + hash + ') at x: ' + jumpPosition.x + ' y: ' + jumpPosition.y);
                pagePosition = {
                    x: jumpPosition.x,
                    y: jumpPosition.y
                };
                scrollTo();
                log(iframeId, '--');
            }
            function jumpToParent() {
                if (window.parentIFrame) window.parentIFrame.moveToAnchor(hash);
                else log(iframeId, 'In page link #' + hash + ' not found and window.parentIFrame not found');
            }
            var hash = location.split('#')[1] || '', hashData = decodeURIComponent(hash), target = document.getElementById(hashData) || document.getElementsByName(hashData)[0];
            if (target) jumpToTarget();
            else if (window.top === window.self) log(iframeId, 'In page link #' + hash + ' not found');
            else jumpToParent();
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
            return chkEvent(iframeId, funcName, val);
        }
        function actionMsg() {
            if (settings[iframeId] && settings[iframeId].firstRun) firstRun();
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
                    settings[iframeId].autoResize = JSON.parse(getMsgBody(9));
                    break;
                case 'scrollTo':
                    scrollRequestFromChild(false);
                    break;
                case 'scrollToOffset':
                    scrollRequestFromChild(true);
                    break;
                case 'pageInfo':
                    sendPageInfoToIframe(settings[iframeId] && settings[iframeId].iframe, iframeId);
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
            if (settings[iframeId]) settings[iframeId].firstRun = false;
        }
        var msg = event.data, messageData = {}, iframeId = null;
        if ('[iFrameResizerChild]Ready' === msg) iFrameReadyMsgReceived();
        else if (isMessageForUs()) {
            messageData = processMsg();
            iframeId = messageData.id;
            if (settings[iframeId]) settings[iframeId].loaded = true;
            if (!isMessageFromMetaParent() && hasSettings(iframeId)) {
                log(iframeId, 'Received: ' + msg);
                if (checkIFrameExists() && isMessageFromIFrame()) actionMsg();
            }
        } else info(iframeId, 'Ignored: ' + msg);
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
        if (destroyObserver) {
            destroyObserver.disconnect();
            destroyObserver = null;
        }
    }
    function getPagePosition(iframeId) {
        if (null === pagePosition) {
            pagePosition = {
                x: window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset,
                y: window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset
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
    function setupIFrame(iframe, options) {
        function setLimits() {
            function addStyle(style) {
                var styleValue = settings[iframeId][style];
                if (Infinity !== styleValue && 0 !== styleValue) {
                    iframe.style[style] = isNumber(styleValue) ? styleValue + 'px' : styleValue;
                    log(iframeId, 'Set ' + style + ' = ' + iframe.style[style]);
                }
            }
            function chkMinMax(dimension) {
                if (settings[iframeId]['min' + dimension] > settings[iframeId]['max' + dimension]) throw new Error('Value for min' + dimension + ' can not be greater than max' + dimension);
            }
            chkMinMax('Height');
            chkMinMax('Width');
            addStyle('maxHeight');
            addStyle('minHeight');
            addStyle('maxWidth');
            addStyle('minWidth');
        }
        function newId() {
            var id = options && options.id || defaults.id + count++;
            if (null !== document.getElementById(id)) id += count++;
            return id;
        }
        function ensureHasId(iframeId) {
            if (typeof iframeId !== 'string') throw new TypeError('Invaild id for iFrame. Expected String');
            if ('' === iframeId) {
                // eslint-disable-next-line no-multi-assign
                iframe.id = iframeId = newId();
                logEnabled = (options || {}).log;
                log(iframeId, 'Added missing iframe ID: ' + iframeId + ' (' + iframe.src + ')');
            }
            return iframeId;
        }
        function setScrolling() {
            log(iframeId, 'IFrame scrolling ' + (settings[iframeId] && settings[iframeId].scrolling ? 'enabled' : 'disabled') + ' for ' + iframeId);
            iframe.style.overflow = false === (settings[iframeId] && settings[iframeId].scrolling) ? 'hidden' : 'auto';
            switch(settings[iframeId] && settings[iframeId].scrolling){
                case 'omit':
                    break;
                case true:
                    iframe.scrolling = 'yes';
                    break;
                case false:
                    iframe.scrolling = 'no';
                    break;
                default:
                    iframe.scrolling = settings[iframeId] ? settings[iframeId].scrolling : 'no';
            }
        }
        // The V1 iFrame script expects an int, where as in V2 expects a CSS
        // string value such as '1px 3em', so if we have an int for V2, set V1=V2
        // and then convert V2 to a string PX value.
        function setupBodyMarginValues() {
            if ('number' === typeof (settings[iframeId] && settings[iframeId].bodyMargin) || '0' === (settings[iframeId] && settings[iframeId].bodyMargin)) {
                settings[iframeId].bodyMarginV1 = settings[iframeId].bodyMargin;
                settings[iframeId].bodyMargin = '' + settings[iframeId].bodyMargin + 'px';
            }
        }
        function checkReset() {
            // Reduce scope of firstRun to function, because IE8's JS execution
            // context stack is borked and this value gets externally
            // changed midway through running this function!!!
            var firstRun = settings[iframeId] && settings[iframeId].firstRun, resetRequertMethod = settings[iframeId] && settings[iframeId].heightCalculationMethod in resetRequiredMethods;
            if (!firstRun && resetRequertMethod) resetIFrame({
                iframe: iframe,
                height: 0,
                width: 0,
                type: 'init'
            });
        }
        function setupIFrameObject() {
            if (settings[iframeId]) settings[iframeId].iframe.iFrameResizer = {
                close: closeIFrame.bind(null, settings[iframeId].iframe),
                removeListeners: removeIframeListeners.bind(null, settings[iframeId].iframe),
                resize: trigger.bind(null, 'Window resize', 'resize', settings[iframeId].iframe),
                moveToAnchor: function(anchor) {
                    trigger('Move to anchor', 'moveToAnchor:' + anchor, settings[iframeId].iframe, iframeId);
                },
                sendMessage: function(message) {
                    message = JSON.stringify(message);
                    trigger('Send Message', 'message:' + message, settings[iframeId].iframe, iframeId);
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
                if (!iframe.parentNode) return null;
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
                return destroyObserver;
            }
            var MutationObserver = getMutationObserver();
            if (MutationObserver) destroyObserver = createDestroyObserver(MutationObserver);
            addEventListener(iframe, 'load', iFrameLoaded);
            trigger('init', msg, iframe, undefined, true);
        }
        function checkOptions(options) {
            if ('object' !== typeof options) throw new TypeError('Options is not an object');
        }
        function copyOptions(options) {
            // eslint-disable-next-line no-restricted-syntax
            for(var option in defaults)if (Object.prototype.hasOwnProperty.call(defaults, option)) settings[iframeId][option] = Object.prototype.hasOwnProperty.call(options, option) ? options[option] : defaults[option];
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
                warn(iframeId, "Deprecated: '" + key + "' has been renamed '" + name + "'. The old method will be removed in the next major version.");
            }
        }
        function processOptions(options) {
            options = options || {};
            settings[iframeId] = Object.create(null) // Protect against prototype attacks
            ;
            settings[iframeId].iframe = iframe;
            settings[iframeId].firstRun = true;
            settings[iframeId].remoteHost = iframe.src && iframe.src.split('/').slice(0, 3).join('/');
            checkOptions(options);
            Object.keys(options).forEach(depricate, options);
            copyOptions(options);
            if (settings[iframeId]) settings[iframeId].targetOrigin = true === settings[iframeId].checkOrigin ? getTargetOrigin(settings[iframeId].remoteHost) : '*';
        }
        function beenHere() {
            return iframeId in settings && 'iFrameResizer' in iframe;
        }
        var iframeId = ensureHasId(iframe.id);
        if (beenHere()) warn(iframeId, 'Ignored iFrame, already setup.');
        else {
            processOptions(options);
            setScrolling();
            setLimits();
            setupBodyMarginValues();
            init(createOutgoingMsg(iframeId));
            setupIFrameObject();
        }
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
            sendTriggerMsg('Tab Visible', 'resize');
        }
        if ('hidden' !== document.visibilityState) {
            log('document', 'Trigger event: Visibility change');
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
    if (window.jQuery !== undefined) createJQueryPublicMethod(window.jQuery);
    if (typeof define === 'function' && define.amd) define([], factory);
    else if (typeof module.exports === 'object') // Node for browserfy
    module.exports = factory();
    window.iFrameResize = window.iFrameResize || factory();
})();

},{}],"eL04M":[function(require,module,exports,__globalThis) {
window.Lookbook = window.Lookbook || {};
window.Lookbook.initEmbeds = initEmbeds;
const embedUrlPrefix = "embed";
const whiteListedAttributes = [
    "preview",
    "scenario",
    "panels",
    "actions",
    "param-*"
];
function initEmbeds(root = document) {
    if (typeof window.iFrameResize !== "function") {
        console.error("Lookbook embeds require the 'iframe-resizer' library to be available. Skipping embed instantiation.");
        return;
    }
    if (typeof root === "string") root = document.querySelector(root);
    if (!root) return console.error("Could not initialize Lookbook embeds. Root node not found.");
    const embeds = Array.from(root.querySelectorAll("lookbook-embed"));
    embeds.forEach((embed)=>{
        const attrs = Array.from(embed.attributes);
        const wrapper = createWrapper();
        const iframe = createIframe(attrs);
        wrapper.appendChild(iframe);
        embed.replaceWith(wrapper);
    });
    window.iFrameResize({
        checkOrigin: false
    }, "[data-lookbook-embed-iframe]");
}
function createWrapper() {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("data-lookbook-embed", "");
    wrapper.classList.add("lookbook-embed");
    return wrapper;
}
function createIframe(attrs) {
    const src = buildSrc(attrs);
    const id = attrValue(attrs, "id");
    const styles = attrValue(attrs, "style");
    const classes = attrValue(attrs, "class", "").split(" ").map((c)=>c.trim()).filter((c)=>c.length);
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
function buildSrc(attrs) {
    const appPath = attrValue(attrs, "app") || guessBasePath();
    const props = {};
    permittedAttrs(attrs).forEach(({ name, value })=>{
        name = name.replace("-", "_").toLowerCase();
        props[name] = value;
    });
    return encodeURI([
        appPath,
        embedUrlPrefix
    ].join("/") + `?props=${JSON.stringify(props)}`);
}
function attrValue(attrs, name, fallback = null) {
    const attr = attrs.find((attr)=>attr.name === name);
    return attr ? attr.value : fallback;
}
function permittedAttrs(attrs) {
    return attrs.filter((attr)=>{
        return whiteListedAttributes.find((key)=>{
            const name = attr.name;
            return key === name || key.includes("*") && name.startsWith(key.replace("*", ""));
        });
    });
}
function guessBasePath() {
    const script = document.currentScript || document.querySelector('script[src*="lookbook.js"]');
    const scriptSrc = script.src;
    if (scriptSrc && scriptSrc.includes("lookbook-assets")) return scriptSrc.split("?")[0].replace("lookbook-assets/js/lookbook.js", "lookbook");
    return `//${location.host}/lookbook`;
}
document.addEventListener("DOMContentLoaded", ()=>initEmbeds());

},{}]},["7eNRd","a2Jjp"], "a2Jjp", "parcelRequirea49c", {})

