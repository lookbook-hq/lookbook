(() => {
  // node_modules/alpinejs/dist/module.esm.js
  var flushPending = false;
  var flushing = false;
  var queue = [];
  var lastFlushedIndex = -1;
  function scheduler(callback) {
    queueJob(callback);
  }
  function queueJob(job) {
    if (!queue.includes(job))
      queue.push(job);
    queueFlush();
  }
  function dequeueJob(job) {
    let index2 = queue.indexOf(job);
    if (index2 !== -1 && index2 > lastFlushedIndex)
      queue.splice(index2, 1);
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
    for (let i = 0; i < queue.length; i++) {
      queue[i]();
      lastFlushedIndex = i;
    }
    queue.length = 0;
    lastFlushedIndex = -1;
    flushing = false;
  }
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
    effect = (callback) => engine.effect(callback, { scheduler: (task) => {
      if (shouldSchedule) {
        scheduler(task);
      } else {
        task();
      }
    } });
    raw = engine.raw;
  }
  function overrideEffect(override) {
    effect = override;
  }
  function elementBoundEffect(el) {
    let cleanup22 = () => {
    };
    let wrappedEffect = (callback) => {
      let effectReference = effect(callback);
      if (!el._x_effects) {
        el._x_effects = /* @__PURE__ */ new Set();
        el._x_runEffects = () => {
          el._x_effects.forEach((i) => i());
        };
      }
      el._x_effects.add(effectReference);
      cleanup22 = () => {
        if (effectReference === void 0)
          return;
        el._x_effects.delete(effectReference);
        release(effectReference);
      };
      return effectReference;
    };
    return [wrappedEffect, () => {
      cleanup22();
    }];
  }
  function watch(getter, callback) {
    let firstTime = true;
    let oldValue;
    let effectReference = effect(() => {
      let value2 = getter();
      JSON.stringify(value2);
      if (!firstTime) {
        queueMicrotask(() => {
          callback(value2, oldValue);
          oldValue = value2;
        });
      } else {
        oldValue = value2;
      }
      firstTime = false;
    });
    return () => release(effectReference);
  }
  var onAttributeAddeds = [];
  var onElRemoveds = [];
  var onElAddeds = [];
  function onElAdded(callback) {
    onElAddeds.push(callback);
  }
  function onElRemoved(el, callback) {
    if (typeof callback === "function") {
      if (!el._x_cleanups)
        el._x_cleanups = [];
      el._x_cleanups.push(callback);
    } else {
      callback = el;
      onElRemoveds.push(callback);
    }
  }
  function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
  }
  function onAttributeRemoved(el, name2, callback) {
    if (!el._x_attributeCleanups)
      el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name2])
      el._x_attributeCleanups[name2] = [];
    el._x_attributeCleanups[name2].push(callback);
  }
  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups)
      return;
    Object.entries(el._x_attributeCleanups).forEach(([name2, value2]) => {
      if (names === void 0 || names.includes(name2)) {
        value2.forEach((i) => i());
        delete el._x_attributeCleanups[name2];
      }
    });
  }
  function cleanupElement(el) {
    var _a, _b;
    (_a = el._x_effects) == null ? void 0 : _a.forEach(dequeueJob);
    while ((_b = el._x_cleanups) == null ? void 0 : _b.length)
      el._x_cleanups.pop()();
  }
  var observer = new MutationObserver(onMutate);
  var currentlyObserving = false;
  function startObservingMutations() {
    observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
    currentlyObserving = true;
  }
  function stopObservingMutations() {
    flushObserver();
    observer.disconnect();
    currentlyObserving = false;
  }
  var queuedMutations = [];
  function flushObserver() {
    let records = observer.takeRecords();
    queuedMutations.push(() => records.length > 0 && onMutate(records));
    let queueLengthWhenTriggered = queuedMutations.length;
    queueMicrotask(() => {
      if (queuedMutations.length === queueLengthWhenTriggered) {
        while (queuedMutations.length > 0)
          queuedMutations.shift()();
      }
    });
  }
  function mutateDom(callback) {
    if (!currentlyObserving)
      return callback();
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
    let removedNodes = /* @__PURE__ */ new Set();
    let addedAttributes = /* @__PURE__ */ new Map();
    let removedAttributes = /* @__PURE__ */ new Map();
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].target._x_ignoreMutationObserver)
        continue;
      if (mutations[i].type === "childList") {
        mutations[i].removedNodes.forEach((node) => {
          if (node.nodeType !== 1)
            return;
          if (!node._x_marker)
            return;
          removedNodes.add(node);
        });
        mutations[i].addedNodes.forEach((node) => {
          if (node.nodeType !== 1)
            return;
          if (removedNodes.has(node)) {
            removedNodes.delete(node);
            return;
          }
          if (node._x_marker)
            return;
          addedNodes.push(node);
        });
      }
      if (mutations[i].type === "attributes") {
        let el = mutations[i].target;
        let name2 = mutations[i].attributeName;
        let oldValue = mutations[i].oldValue;
        let add2 = () => {
          if (!addedAttributes.has(el))
            addedAttributes.set(el, []);
          addedAttributes.get(el).push({ name: name2, value: el.getAttribute(name2) });
        };
        let remove = () => {
          if (!removedAttributes.has(el))
            removedAttributes.set(el, []);
          removedAttributes.get(el).push(name2);
        };
        if (el.hasAttribute(name2) && oldValue === null) {
          add2();
        } else if (el.hasAttribute(name2)) {
          remove();
          add2();
        } else {
          remove();
        }
      }
    }
    removedAttributes.forEach((attrs, el) => {
      cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el) => {
      onAttributeAddeds.forEach((i) => i(el, attrs));
    });
    for (let node of removedNodes) {
      if (addedNodes.some((i) => i.contains(node)))
        continue;
      onElRemoveds.forEach((i) => i(node));
    }
    for (let node of addedNodes) {
      if (!node.isConnected)
        continue;
      onElAddeds.forEach((i) => i(node));
    }
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
  }
  function scope(node) {
    return mergeProxies(closestDataStack(node));
  }
  function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
    return () => {
      node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
    };
  }
  function closestDataStack(node) {
    if (node._x_dataStack)
      return node._x_dataStack;
    if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
      return closestDataStack(node.host);
    }
    if (!node.parentNode) {
      return [];
    }
    return closestDataStack(node.parentNode);
  }
  function mergeProxies(objects) {
    return new Proxy({ objects }, mergeProxyTrap);
  }
  var mergeProxyTrap = {
    ownKeys({ objects }) {
      return Array.from(
        new Set(objects.flatMap((i) => Object.keys(i)))
      );
    },
    has({ objects }, name2) {
      if (name2 == Symbol.unscopables)
        return false;
      return objects.some(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name2) || Reflect.has(obj, name2)
      );
    },
    get({ objects }, name2, thisProxy) {
      if (name2 == "toJSON")
        return collapseProxies;
      return Reflect.get(
        objects.find(
          (obj) => Reflect.has(obj, name2)
        ) || {},
        name2,
        thisProxy
      );
    },
    set({ objects }, name2, value2, thisProxy) {
      const target = objects.find(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name2)
      ) || objects[objects.length - 1];
      const descriptor = Object.getOwnPropertyDescriptor(target, name2);
      if ((descriptor == null ? void 0 : descriptor.set) && (descriptor == null ? void 0 : descriptor.get))
        return descriptor.set.call(thisProxy, value2) || true;
      return Reflect.set(target, name2, value2);
    }
  };
  function collapseProxies() {
    let keys = Reflect.ownKeys(this);
    return keys.reduce((acc, key) => {
      acc[key] = Reflect.get(this, key);
      return acc;
    }, {});
  }
  function initInterceptors(data2) {
    let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value: value2, enumerable }]) => {
        if (enumerable === false || value2 === void 0)
          return;
        if (typeof value2 === "object" && value2 !== null && value2.__v_skip)
          return;
        let path = basePath === "" ? key : `${basePath}.${key}`;
        if (typeof value2 === "object" && value2 !== null && value2._x_interceptor) {
          obj[key] = value2.initialize(data2, path, key);
        } else {
          if (isObject2(value2) && value2 !== obj && !(value2 instanceof Element)) {
            recurse(value2, path);
          }
        }
      });
    };
    return recurse(data2);
  }
  function interceptor(callback, mutateObj = () => {
  }) {
    let obj = {
      initialValue: void 0,
      _x_interceptor: true,
      initialize(data2, path, key) {
        return callback(this.initialValue, () => get(data2, path), (value2) => set(data2, path, value2), path, key);
      }
    };
    mutateObj(obj);
    return (initialValue) => {
      if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
        let initialize = obj.initialize.bind(obj);
        obj.initialize = (data2, path, key) => {
          let innerValue = initialValue.initialize(data2, path, key);
          obj.initialValue = innerValue;
          return initialize(data2, path, key);
        };
      } else {
        obj.initialValue = initialValue;
      }
      return obj;
    };
  }
  function get(obj, path) {
    return path.split(".").reduce((carry, segment) => carry[segment], obj);
  }
  function set(obj, path, value2) {
    if (typeof path === "string")
      path = path.split(".");
    if (path.length === 1)
      obj[path[0]] = value2;
    else if (path.length === 0)
      throw error;
    else {
      if (obj[path[0]])
        return set(obj[path[0]], path.slice(1), value2);
      else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value2);
      }
    }
  }
  var magics = {};
  function magic(name2, callback) {
    magics[name2] = callback;
  }
  function injectMagics(obj, el) {
    let memoizedUtilities = getUtilities(el);
    Object.entries(magics).forEach(([name2, callback]) => {
      Object.defineProperty(obj, `$${name2}`, {
        get() {
          return callback(el, memoizedUtilities);
        },
        enumerable: false
      });
    });
    return obj;
  }
  function getUtilities(el) {
    let [utilities, cleanup22] = getElementBoundUtilities(el);
    let utils = { interceptor, ...utilities };
    onElRemoved(el, cleanup22);
    return utils;
  }
  function tryCatch(el, expression16, callback, ...args2) {
    try {
      return callback(...args2);
    } catch (e) {
      handleError(e, el, expression16);
    }
  }
  function handleError(error2, el, expression16 = void 0) {
    error2 = Object.assign(
      error2 != null ? error2 : { message: "No error message given." },
      { el, expression: expression16 }
    );
    console.warn(`Alpine Expression Error: ${error2.message}

${expression16 ? 'Expression: "' + expression16 + '"\n\n' : ""}`, el);
    setTimeout(() => {
      throw error2;
    }, 0);
  }
  var shouldAutoEvaluateFunctions = true;
  function dontAutoEvaluateFunctions(callback) {
    let cache = shouldAutoEvaluateFunctions;
    shouldAutoEvaluateFunctions = false;
    let result = callback();
    shouldAutoEvaluateFunctions = cache;
    return result;
  }
  function evaluate(el, expression16, extras = {}) {
    let result;
    evaluateLater(el, expression16)((value2) => result = value2, extras);
    return result;
  }
  function evaluateLater(...args2) {
    return theEvaluatorFunction(...args2);
  }
  var theEvaluatorFunction = normalEvaluator;
  function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
  }
  function normalEvaluator(el, expression16) {
    let overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    let evaluator = typeof expression16 === "function" ? generateEvaluatorFromFunction(dataStack, expression16) : generateEvaluatorFromString(dataStack, expression16, el);
    return tryCatch.bind(null, el, expression16, evaluator);
  }
  function generateEvaluatorFromFunction(dataStack, func4) {
    return (receiver = () => {
    }, { scope: scope2 = {}, params: params2 = [] } = {}) => {
      let result = func4.apply(mergeProxies([scope2, ...dataStack]), params2);
      runIfTypeOfFunction(receiver, result);
    };
  }
  var evaluatorMemo = {};
  function generateFunctionFromString(expression16, el) {
    if (evaluatorMemo[expression16]) {
      return evaluatorMemo[expression16];
    }
    let AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression16.trim()) || /^(let|const)\s/.test(expression16.trim()) ? `(async()=>{ ${expression16} })()` : expression16;
    const safeAsyncFunction = () => {
      try {
        let func22 = new AsyncFunction(
          ["__self", "scope"],
          `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`
        );
        Object.defineProperty(func22, "name", {
          value: `[Alpine] ${expression16}`
        });
        return func22;
      } catch (error2) {
        handleError(error2, el, expression16);
        return Promise.resolve();
      }
    };
    let func4 = safeAsyncFunction();
    evaluatorMemo[expression16] = func4;
    return func4;
  }
  function generateEvaluatorFromString(dataStack, expression16, el) {
    let func4 = generateFunctionFromString(expression16, el);
    return (receiver = () => {
    }, { scope: scope2 = {}, params: params2 = [] } = {}) => {
      func4.result = void 0;
      func4.finished = false;
      let completeScope = mergeProxies([scope2, ...dataStack]);
      if (typeof func4 === "function") {
        let promise = func4(func4, completeScope).catch((error2) => handleError(error2, el, expression16));
        if (func4.finished) {
          runIfTypeOfFunction(receiver, func4.result, completeScope, params2, el);
          func4.result = void 0;
        } else {
          promise.then((result) => {
            runIfTypeOfFunction(receiver, result, completeScope, params2, el);
          }).catch((error2) => handleError(error2, el, expression16)).finally(() => func4.result = void 0);
        }
      }
    };
  }
  function runIfTypeOfFunction(receiver, value2, scope2, params2, el) {
    if (shouldAutoEvaluateFunctions && typeof value2 === "function") {
      let result = value2.apply(scope2, params2);
      if (result instanceof Promise) {
        result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params2)).catch((error2) => handleError(error2, el, value2));
      } else {
        receiver(result);
      }
    } else if (typeof value2 === "object" && value2 instanceof Promise) {
      value2.then((i) => receiver(i));
    } else {
      receiver(value2);
    }
  }
  var prefixAsString = "x-";
  function prefix(subject = "") {
    return prefixAsString + subject;
  }
  function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
  }
  var directiveHandlers = {};
  function directive(name2, callback) {
    directiveHandlers[name2] = callback;
    return {
      before(directive22) {
        if (!directiveHandlers[directive22]) {
          console.warn(String.raw`Cannot find directive \`${directive22}\`. \`${name2}\` will use the default order of execution`);
          return;
        }
        const pos = directiveOrder.indexOf(directive22);
        directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name2);
      }
    };
  }
  function directiveExists(name2) {
    return Object.keys(directiveHandlers).includes(name2);
  }
  function directives(el, attributes3, originalAttributeOverride) {
    attributes3 = Array.from(attributes3);
    if (el._x_virtualDirectives) {
      let vAttributes = Object.entries(el._x_virtualDirectives).map(([name2, value2]) => ({ name: name2, value: value2 }));
      let staticAttributes = attributesOnly(vAttributes);
      vAttributes = vAttributes.map((attribute) => {
        if (staticAttributes.find((attr2) => attr2.name === attribute.name)) {
          return {
            name: `x-bind:${attribute.name}`,
            value: `"${attribute.value}"`
          };
        }
        return attribute;
      });
      attributes3 = attributes3.concat(vAttributes);
    }
    let transformedAttributeMap = {};
    let directives2 = attributes3.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive22) => {
      return getDirectiveHandler(el, directive22);
    });
  }
  function attributesOnly(attributes3) {
    return Array.from(attributes3).map(toTransformedAttributes()).filter((attr2) => !outNonAlpineAttributes(attr2));
  }
  var isDeferringHandlers = false;
  var directiveHandlerStacks = /* @__PURE__ */ new Map();
  var currentHandlerStackKey = Symbol();
  function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let key = Symbol();
    currentHandlerStackKey = key;
    directiveHandlerStacks.set(key, []);
    let flushHandlers = () => {
      while (directiveHandlerStacks.get(key).length)
        directiveHandlerStacks.get(key).shift()();
      directiveHandlerStacks.delete(key);
    };
    let stopDeferring = () => {
      isDeferringHandlers = false;
      flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
  }
  function getElementBoundUtilities(el) {
    let cleanups = [];
    let cleanup22 = (callback) => cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup: cleanup22,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = () => cleanups.forEach((i) => i());
    return [utilities, doCleanup];
  }
  function getDirectiveHandler(el, directive22) {
    let noop = () => {
    };
    let handler4 = directiveHandlers[directive22.type] || noop;
    let [utilities, cleanup22] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive22.original, cleanup22);
    let fullHandler = () => {
      if (el._x_ignore || el._x_ignoreSelf)
        return;
      handler4.inline && handler4.inline(el, directive22, utilities);
      handler4 = handler4.bind(handler4, el, directive22, utilities);
      isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
    };
    fullHandler.runCleanups = cleanup22;
    return fullHandler;
  }
  var startingWith = (subject, replacement) => ({ name: name2, value: value2 }) => {
    if (name2.startsWith(subject))
      name2 = name2.replace(subject, replacement);
    return { name: name2, value: value2 };
  };
  var into = (i) => i;
  function toTransformedAttributes(callback = () => {
  }) {
    return ({ name: name2, value: value2 }) => {
      let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
        return transform(carry);
      }, { name: name2, value: value2 });
      if (newName !== name2)
        callback(newName, name2);
      return { name: newName, value: newValue };
    };
  }
  var attributeTransformers = [];
  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }
  function outNonAlpineAttributes({ name: name2 }) {
    return alpineAttributeRegex().test(name2);
  }
  var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name: name2, value: value2 }) => {
      let typeMatch = name2.match(alpineAttributeRegex());
      let valueMatch = name2.match(/:([a-zA-Z0-9\-_:]+)/);
      let modifiers = name2.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      let original = originalAttributeOverride || transformedAttributeMap[name2] || name2;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map((i) => i.replace(".", "")),
        expression: value2,
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
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    DEFAULT,
    "teleport"
  ];
  function byPriority(a2, b) {
    let typeA = directiveOrder.indexOf(a2.type) === -1 ? DEFAULT : a2.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
  }
  function dispatch(el, name2, detail = {}) {
    el.dispatchEvent(
      new CustomEvent(name2, {
        detail,
        bubbles: true,
        // Allows events to pass the shadow DOM barrier.
        composed: true,
        cancelable: true
      })
    );
  }
  function walk(el, callback) {
    if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
      Array.from(el.children).forEach((el2) => walk(el2, callback));
      return;
    }
    let skip = false;
    callback(el, () => skip = true);
    if (skip)
      return;
    let node = el.firstElementChild;
    while (node) {
      walk(node, callback, false);
      node = node.nextElementSibling;
    }
  }
  function warn(message2, ...args2) {
    console.warn(`Alpine Warning: ${message2}`, ...args2);
  }
  var started = false;
  function start() {
    if (started)
      warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
    started = true;
    if (!document.body)
      warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el) => initTree(el, walk));
    onElRemoved((el) => destroyTree(el));
    onAttributesAdded((el, attrs) => {
      directives(el, attrs).forEach((handle) => handle());
    });
    let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
    Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
      initTree(el);
    });
    dispatch(document, "alpine:initialized");
    setTimeout(() => {
      warnAboutMissingPlugins();
    });
  }
  var rootSelectorCallbacks = [];
  var initSelectorCallbacks = [];
  function rootSelectors() {
    return rootSelectorCallbacks.map((fn) => fn());
  }
  function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
  }
  function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
  }
  function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
  }
  function closestRoot(el, includeInitSelectors = false) {
    return findClosest(el, (element) => {
      const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
      if (selectors.some((selector) => element.matches(selector)))
        return true;
    });
  }
  function findClosest(el, callback) {
    if (!el)
      return;
    if (callback(el))
      return el;
    if (el._x_teleportBack)
      el = el._x_teleportBack;
    if (!el.parentElement)
      return;
    return findClosest(el.parentElement, callback);
  }
  function isRoot(el) {
    return rootSelectors().some((selector) => el.matches(selector));
  }
  var initInterceptors2 = [];
  function interceptInit(callback) {
    initInterceptors2.push(callback);
  }
  var markerDispenser = 1;
  function initTree(el, walker = walk, intercept = () => {
  }) {
    if (findClosest(el, (i) => i._x_ignore))
      return;
    deferHandlingDirectives(() => {
      walker(el, (el2, skip) => {
        if (el2._x_marker)
          return;
        intercept(el2, skip);
        initInterceptors2.forEach((i) => i(el2, skip));
        directives(el2, el2.attributes).forEach((handle) => handle());
        if (!el2._x_ignore)
          el2._x_marker = markerDispenser++;
        el2._x_ignore && skip();
      });
    });
  }
  function destroyTree(root, walker = walk) {
    walker(root, (el) => {
      cleanupElement(el);
      cleanupAttributes(el);
      delete el._x_marker;
    });
  }
  function warnAboutMissingPlugins() {
    let pluginDirectives = [
      ["ui", "dialog", ["[x-dialog], [x-popover]"]],
      ["anchor", "anchor", ["[x-anchor]"]],
      ["sort", "sort", ["[x-sort]"]]
    ];
    pluginDirectives.forEach(([plugin2, directive22, selectors]) => {
      if (directiveExists(directive22))
        return;
      selectors.some((selector) => {
        if (document.querySelector(selector)) {
          warn(`found "${selector}", but missing ${plugin2} plugin`);
          return true;
        }
      });
    });
  }
  var tickStack = [];
  var isHolding = false;
  function nextTick(callback = () => {
  }) {
    queueMicrotask(() => {
      isHolding || setTimeout(() => {
        releaseNextTicks();
      });
    });
    return new Promise((res) => {
      tickStack.push(() => {
        callback();
        res();
      });
    });
  }
  function releaseNextTicks() {
    isHolding = false;
    while (tickStack.length)
      tickStack.shift()();
  }
  function holdNextTicks() {
    isHolding = true;
  }
  function setClasses(el, value2) {
    if (Array.isArray(value2)) {
      return setClassesFromString(el, value2.join(" "));
    } else if (typeof value2 === "object" && value2 !== null) {
      return setClassesFromObject(el, value2);
    } else if (typeof value2 === "function") {
      return setClasses(el, value2());
    }
    return setClassesFromString(el, value2);
  }
  function setClassesFromString(el, classString) {
    let split = (classString2) => classString2.split(" ").filter(Boolean);
    let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
    let addClassesAndReturnUndo = (classes) => {
      el.classList.add(...classes);
      return () => {
        el.classList.remove(...classes);
      };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
  }
  function setClassesFromObject(el, classObject) {
    let split = (classString) => classString.split(" ").filter(Boolean);
    let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i) => {
      if (el.classList.contains(i)) {
        el.classList.remove(i);
        removed.push(i);
      }
    });
    forAdd.forEach((i) => {
      if (!el.classList.contains(i)) {
        el.classList.add(i);
        added.push(i);
      }
    });
    return () => {
      removed.forEach((i) => el.classList.add(i));
      added.forEach((i) => el.classList.remove(i));
    };
  }
  function setStyles(el, value2) {
    if (typeof value2 === "object" && value2 !== null) {
      return setStylesFromObject(el, value2);
    }
    return setStylesFromString(el, value2);
  }
  function setStylesFromObject(el, value2) {
    let previousStyles = {};
    Object.entries(value2).forEach(([key, value22]) => {
      previousStyles[key] = el.style[key];
      if (!key.startsWith("--")) {
        key = kebabCase(key);
      }
      el.style.setProperty(key, value22);
    });
    setTimeout(() => {
      if (el.style.length === 0) {
        el.removeAttribute("style");
      }
    });
    return () => {
      setStyles(el, previousStyles);
    };
  }
  function setStylesFromString(el, value2) {
    let cache = el.getAttribute("style", value2);
    el.setAttribute("style", value2);
    return () => {
      el.setAttribute("style", cache || "");
    };
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function once(callback, fallback = () => {
  }) {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback.apply(this, arguments);
      }
    };
  }
  directive("transition", (el, { value: value2, modifiers, expression: expression16 }, { evaluate: evaluate2 }) => {
    if (typeof expression16 === "function")
      expression16 = evaluate2(expression16);
    if (expression16 === false)
      return;
    if (!expression16 || typeof expression16 === "boolean") {
      registerTransitionsFromHelper(el, modifiers, value2);
    } else {
      registerTransitionsFromClassString(el, expression16, value2);
    }
  });
  function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
      "enter": (classes) => {
        el._x_transition.enter.during = classes;
      },
      "enter-start": (classes) => {
        el._x_transition.enter.start = classes;
      },
      "enter-end": (classes) => {
        el._x_transition.enter.end = classes;
      },
      "leave": (classes) => {
        el._x_transition.leave.during = classes;
      },
      "leave-start": (classes) => {
        el._x_transition.leave.start = classes;
      },
      "leave-end": (classes) => {
        el._x_transition.leave.end = classes;
      }
    };
    directiveStorageMap[stage](classString);
  }
  function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index2) => index2 < modifiers.indexOf("out"));
    }
    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index2) => index2 > modifiers.indexOf("out"));
    }
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0) / 1e3;
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
    if (transitioningIn) {
      el._x_transition.enter.during = {
        transformOrigin: origin,
        transitionDelay: `${delay}s`,
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
        transitionDelay: `${delay}s`,
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
    if (!el._x_transition)
      el._x_transition = {
        enter: { during: defaultValue, start: defaultValue, end: defaultValue },
        leave: { during: defaultValue, start: defaultValue, end: defaultValue },
        in(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end
          }, before, after);
        },
        out(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end
          }, before, after);
        }
      };
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value2, show, hide) {
    const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let clickAwayCompatibleShow = () => nextTick2(show);
    if (value2) {
      if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
        el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
      } else {
        el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
      }
      return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve2, reject) => {
      el._x_transition.out(() => {
      }, () => resolve2(hide));
      el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
    }) : Promise.resolve(hide);
    queueMicrotask(() => {
      let closest = closestHide(el);
      if (closest) {
        if (!closest._x_hideChildren)
          closest._x_hideChildren = [];
        closest._x_hideChildren.push(el);
      } else {
        nextTick2(() => {
          let hideAfterChildren = (el2) => {
            let carry = Promise.all([
              el2._x_hidePromise,
              ...(el2._x_hideChildren || []).map(hideAfterChildren)
            ]).then(([i]) => i == null ? void 0 : i());
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };
          hideAfterChildren(el).catch((e) => {
            if (!e.isFromCancelledTransition)
              throw e;
          });
        });
      }
    });
  };
  function closestHide(el) {
    let parent = el.parentNode;
    if (!parent)
      return;
    return parent._x_hidePromise ? parent : closestHide(parent);
  }
  function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
  }, after = () => {
  }) {
    if (el._x_transitioning)
      el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
      before();
      after();
      return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
      start() {
        undoStart = setFunction(el, start2);
      },
      during() {
        undoDuring = setFunction(el, during);
      },
      before,
      end() {
        undoStart();
        undoEnd = setFunction(el, end);
      },
      after,
      cleanup() {
        undoDuring();
        undoEnd();
      }
    });
  }
  function performTransition(el, stages) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(() => {
      mutateDom(() => {
        interrupted = true;
        if (!reachedBefore)
          stages.before();
        if (!reachedEnd) {
          stages.end();
          releaseNextTicks();
        }
        stages.after();
        if (el.isConnected)
          stages.cleanup();
        delete el._x_transitioning;
      });
    });
    el._x_transitioning = {
      beforeCancels: [],
      beforeCancel(callback) {
        this.beforeCancels.push(callback);
      },
      cancel: once(function() {
        while (this.beforeCancels.length) {
          this.beforeCancels.shift()();
        }
        ;
        finish();
      }),
      finish
    };
    mutateDom(() => {
      stages.start();
      stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
      let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      if (duration === 0)
        duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
      mutateDom(() => {
        stages.before();
      });
      reachedBefore = true;
      requestAnimationFrame(() => {
        if (interrupted)
          return;
        mutateDom(() => {
          stages.end();
        });
        releaseNextTicks();
        setTimeout(el._x_transitioning.finish, duration + delay);
        reachedEnd = true;
      });
    });
  }
  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1)
      return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback;
    if (key === "scale") {
      if (isNaN(rawValue))
        return fallback;
    }
    if (key === "duration" || key === "delay") {
      let match = rawValue.match(/([0-9]+)ms/);
      if (match)
        return match[1];
    }
    if (key === "origin") {
      if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }
    return rawValue;
  }
  var isCloning = false;
  function skipDuringClone(callback, fallback = () => {
  }) {
    return (...args2) => isCloning ? fallback(...args2) : callback(...args2);
  }
  function onlyDuringClone(callback) {
    return (...args2) => isCloning && callback(...args2);
  }
  var interceptors = [];
  function interceptClone(callback) {
    interceptors.push(callback);
  }
  function cloneNode(from, to) {
    interceptors.forEach((i) => i(from, to));
    isCloning = true;
    dontRegisterReactiveSideEffects(() => {
      initTree(to, (el, callback) => {
        callback(el, () => {
        });
      });
    });
    isCloning = false;
  }
  var isCloningLegacy = false;
  function clone(oldEl, newEl) {
    if (!newEl._x_dataStack)
      newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    isCloningLegacy = true;
    dontRegisterReactiveSideEffects(() => {
      cloneTree(newEl);
    });
    isCloning = false;
    isCloningLegacy = false;
  }
  function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback) => {
      walk(el2, (el3, skip) => {
        if (hasRunThroughFirstEl && isRoot(el3))
          return skip();
        hasRunThroughFirstEl = true;
        callback(el3, skip);
      });
    };
    initTree(el, shallowWalker);
  }
  function dontRegisterReactiveSideEffects(callback) {
    let cache = effect;
    overrideEffect((callback2, el) => {
      let storedEffect = cache(callback2);
      release(storedEffect);
      return () => {
      };
    });
    callback();
    overrideEffect(cache);
  }
  function bind(el, name2, value2, modifiers = []) {
    if (!el._x_bindings)
      el._x_bindings = reactive({});
    el._x_bindings[name2] = value2;
    name2 = modifiers.includes("camel") ? camelCase(name2) : name2;
    switch (name2) {
      case "value":
        bindInputValue(el, value2);
        break;
      case "style":
        bindStyles(el, value2);
        break;
      case "class":
        bindClasses(el, value2);
        break;
      case "selected":
      case "checked":
        bindAttributeAndProperty(el, name2, value2);
        break;
      default:
        bindAttribute(el, name2, value2);
        break;
    }
  }
  function bindInputValue(el, value2) {
    if (isRadio(el)) {
      if (el.attributes.value === void 0) {
        el.value = value2;
      }
      if (window.fromModel) {
        if (typeof value2 === "boolean") {
          el.checked = safeParseBoolean(el.value) === value2;
        } else {
          el.checked = checkedAttrLooseCompare(el.value, value2);
        }
      }
    } else if (isCheckbox(el)) {
      if (Number.isInteger(value2)) {
        el.value = value2;
      } else if (!Array.isArray(value2) && typeof value2 !== "boolean" && ![null, void 0].includes(value2)) {
        el.value = String(value2);
      } else {
        if (Array.isArray(value2)) {
          el.checked = value2.some((val) => checkedAttrLooseCompare(val, el.value));
        } else {
          el.checked = !!value2;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value2);
    } else {
      if (el.value === value2)
        return;
      el.value = value2 === void 0 ? "" : value2;
    }
  }
  function bindClasses(el, value2) {
    if (el._x_undoAddedClasses)
      el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value2);
  }
  function bindStyles(el, value2) {
    if (el._x_undoAddedStyles)
      el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value2);
  }
  function bindAttributeAndProperty(el, name2, value2) {
    bindAttribute(el, name2, value2);
    setPropertyIfChanged(el, name2, value2);
  }
  function bindAttribute(el, name2, value2) {
    if ([null, void 0, false].includes(value2) && attributeShouldntBePreservedIfFalsy(name2)) {
      el.removeAttribute(name2);
    } else {
      if (isBooleanAttr(name2))
        value2 = name2;
      setIfChanged(el, name2, value2);
    }
  }
  function setIfChanged(el, attrName, value2) {
    if (el.getAttribute(attrName) != value2) {
      el.setAttribute(attrName, value2);
    }
  }
  function setPropertyIfChanged(el, propName, value2) {
    if (el[propName] !== value2) {
      el[propName] = value2;
    }
  }
  function updateSelect(el, value2) {
    const arrayWrappedValue = [].concat(value2).map((value22) => {
      return value22 + "";
    });
    Array.from(el.options).forEach((option2) => {
      option2.selected = arrayWrappedValue.includes(option2.value);
    });
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char2) => char2.toUpperCase());
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function safeParseBoolean(rawValue) {
    if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
      return true;
    }
    if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
      return false;
    }
    return rawValue ? Boolean(rawValue) : null;
  }
  var booleanAttributes = /* @__PURE__ */ new Set([
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "inert",
    "ismap",
    "itemscope",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected",
    "shadowrootclonable",
    "shadowrootdelegatesfocus",
    "shadowrootserializable"
  ]);
  function isBooleanAttr(attrName) {
    return booleanAttributes.has(attrName);
  }
  function attributeShouldntBePreservedIfFalsy(name2) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name2);
  }
  function getBinding(el, name2, fallback) {
    if (el._x_bindings && el._x_bindings[name2] !== void 0)
      return el._x_bindings[name2];
    return getAttributeBinding(el, name2, fallback);
  }
  function extractProp(el, name2, fallback, extract = true) {
    if (el._x_bindings && el._x_bindings[name2] !== void 0)
      return el._x_bindings[name2];
    if (el._x_inlineBindings && el._x_inlineBindings[name2] !== void 0) {
      let binding = el._x_inlineBindings[name2];
      binding.extract = extract;
      return dontAutoEvaluateFunctions(() => {
        return evaluate(el, binding.expression);
      });
    }
    return getAttributeBinding(el, name2, fallback);
  }
  function getAttributeBinding(el, name2, fallback) {
    let attr2 = el.getAttribute(name2);
    if (attr2 === null)
      return typeof fallback === "function" ? fallback() : fallback;
    if (attr2 === "")
      return true;
    if (isBooleanAttr(name2)) {
      return !![name2, "true"].includes(attr2);
    }
    return attr2;
  }
  function isCheckbox(el) {
    return el.type === "checkbox" || el.localName === "ui-checkbox" || el.localName === "ui-switch";
  }
  function isRadio(el) {
    return el.type === "radio" || el.localName === "ui-radio";
  }
  function debounce(func4, wait) {
    var timeout;
    return function() {
      var context = this, args2 = arguments;
      var later = function() {
        timeout = null;
        func4.apply(context, args2);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  function throttle(func4, limit) {
    let inThrottle;
    return function() {
      let context = this, args2 = arguments;
      if (!inThrottle) {
        func4.apply(context, args2);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
    let firstRun = true;
    let outerHash;
    let innerHash;
    let reference2 = effect(() => {
      let outer = outerGet();
      let inner2 = innerGet();
      if (firstRun) {
        innerSet(cloneIfObject(outer));
        firstRun = false;
      } else {
        let outerHashLatest = JSON.stringify(outer);
        let innerHashLatest = JSON.stringify(inner2);
        if (outerHashLatest !== outerHash) {
          innerSet(cloneIfObject(outer));
        } else if (outerHashLatest !== innerHashLatest) {
          outerSet(cloneIfObject(inner2));
        } else {
        }
      }
      outerHash = JSON.stringify(outerGet());
      innerHash = JSON.stringify(innerGet());
    });
    return () => {
      release(reference2);
    };
  }
  function cloneIfObject(value2) {
    return typeof value2 === "object" ? JSON.parse(JSON.stringify(value2)) : value2;
  }
  function plugin(callback) {
    let callbacks = Array.isArray(callback) ? callback : [callback];
    callbacks.forEach((i) => i(alpine_default));
  }
  var stores = {};
  var isReactive = false;
  function store(name2, value2) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }
    if (value2 === void 0) {
      return stores[name2];
    }
    stores[name2] = value2;
    initInterceptors(stores[name2]);
    if (typeof value2 === "object" && value2 !== null && value2.hasOwnProperty("init") && typeof value2.init === "function") {
      stores[name2].init();
    }
  }
  function getStores() {
    return stores;
  }
  var binds = {};
  function bind2(name2, bindings) {
    let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
    if (name2 instanceof Element) {
      return applyBindingsObject(name2, getBindings());
    } else {
      binds[name2] = getBindings;
    }
    return () => {
    };
  }
  function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name2, callback]) => {
      Object.defineProperty(obj, name2, {
        get() {
          return (...args2) => {
            return callback(...args2);
          };
        }
      });
    });
    return obj;
  }
  function applyBindingsObject(el, obj, original) {
    let cleanupRunners = [];
    while (cleanupRunners.length)
      cleanupRunners.pop()();
    let attributes3 = Object.entries(obj).map(([name2, value2]) => ({ name: name2, value: value2 }));
    let staticAttributes = attributesOnly(attributes3);
    attributes3 = attributes3.map((attribute) => {
      if (staticAttributes.find((attr2) => attr2.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    directives(el, attributes3, original).map((handle) => {
      cleanupRunners.push(handle.runCleanups);
      handle();
    });
    return () => {
      while (cleanupRunners.length)
        cleanupRunners.pop()();
    };
  }
  var datas = {};
  function data(name2, callback) {
    datas[name2] = callback;
  }
  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name2, callback]) => {
      Object.defineProperty(obj, name2, {
        get() {
          return (...args2) => {
            return callback.bind(context)(...args2);
          };
        },
        enumerable: false
      });
    });
    return obj;
  }
  var Alpine = {
    get reactive() {
      return reactive;
    },
    get release() {
      return release;
    },
    get effect() {
      return effect;
    },
    get raw() {
      return raw;
    },
    version: "3.14.9",
    flushAndStopDeferringMutations,
    dontAutoEvaluateFunctions,
    disableEffectScheduling,
    startObservingMutations,
    stopObservingMutations,
    setReactivityEngine,
    onAttributeRemoved,
    onAttributesAdded,
    closestDataStack,
    skipDuringClone,
    onlyDuringClone,
    addRootSelector,
    addInitSelector,
    interceptClone,
    addScopeToNode,
    deferMutations,
    mapAttributes,
    evaluateLater,
    interceptInit,
    setEvaluator,
    mergeProxies,
    extractProp,
    findClosest,
    onElRemoved,
    closestRoot,
    destroyTree,
    interceptor,
    // INTERNAL: not public API and is subject to change without major release.
    transition,
    // INTERNAL
    setStyles,
    // INTERNAL
    mutateDom,
    directive,
    entangle,
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
    // INTERNAL
    cloneNode,
    // INTERNAL
    bound: getBinding,
    $data: scope,
    watch,
    walk,
    data,
    bind: bind2
  };
  var alpine_default = Alpine;
  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }
  var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
  var EMPTY_OBJ = true ? Object.freeze({}) : {};
  var EMPTY_ARR = true ? Object.freeze([]) : [];
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var objectToString = Object.prototype.toString;
  var toTypeString = (value2) => objectToString.call(value2);
  var toRawType = (value2) => {
    return toTypeString(value2).slice(8, -1);
  };
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  var hasChanged = (value2, oldValue) => value2 !== oldValue && (value2 === value2 || oldValue === oldValue);
  var targetMap = /* @__PURE__ */ new WeakMap();
  var effectStack = [];
  var activeEffect;
  var ITERATE_KEY = Symbol(true ? "iterate" : "");
  var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }
  function effect2(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
      fn = fn.raw;
    }
    const effect3 = createReactiveEffect(fn, options);
    if (!options.lazy) {
      effect3();
    }
    return effect3;
  }
  function stop(effect3) {
    if (effect3.active) {
      cleanup(effect3);
      if (effect3.options.onStop) {
        effect3.options.onStop();
      }
      effect3.active = false;
    }
  }
  var uid = 0;
  function createReactiveEffect(fn, options) {
    const effect3 = function reactiveEffect() {
      if (!effect3.active) {
        return fn();
      }
      if (!effectStack.includes(effect3)) {
        cleanup(effect3);
        try {
          enableTracking();
          effectStack.push(effect3);
          activeEffect = effect3;
          return fn();
        } finally {
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
    const { deps } = effect3;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect3);
      }
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
  function track(target, type5, key) {
    if (!shouldTrack || activeEffect === void 0) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = /* @__PURE__ */ new Set());
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.options.onTrack) {
        activeEffect.options.onTrack({
          effect: activeEffect,
          target,
          type: type5,
          key
        });
      }
    }
  }
  function trigger(target, type5, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    const effects = /* @__PURE__ */ new Set();
    const add2 = (effectsToAdd) => {
      if (effectsToAdd) {
        effectsToAdd.forEach((effect3) => {
          if (effect3 !== activeEffect || effect3.allowRecurse) {
            effects.add(effect3);
          }
        });
      }
    };
    if (type5 === "clear") {
      depsMap.forEach(add2);
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          add2(dep);
        }
      });
    } else {
      if (key !== void 0) {
        add2(depsMap.get(key));
      }
      switch (type5) {
        case "add":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            add2(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            add2(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const run = (effect3) => {
      if (effect3.options.onTrigger) {
        effect3.options.onTrigger({
          effect: effect3,
          target,
          key,
          type: type5,
          newValue,
          oldValue,
          oldTarget
        });
      }
      if (effect3.options.scheduler) {
        effect3.options.scheduler(effect3);
      } else {
        effect3();
      }
    };
    effects.forEach(run);
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
  var get2 = /* @__PURE__ */ createGetter();
  var readonlyGet = /* @__PURE__ */ createGetter(true);
  var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args2) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args2);
        if (res === -1 || res === false) {
          return arr[key](...args2.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args2) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args2);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly = false, shallow = false) {
    return function get3(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive2(res);
      }
      return res;
    };
  }
  var set2 = /* @__PURE__ */ createSetter();
  function createSetter(shallow = false) {
    return function set3(target, key, value2, receiver) {
      let oldValue = target[key];
      if (!shallow) {
        value2 = toRaw(value2);
        oldValue = toRaw(oldValue);
        if (!isArray(target) && isRef(oldValue) && !isRef(value2)) {
          oldValue.value = value2;
          return true;
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value2, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value2);
        } else if (hasChanged(value2, oldValue)) {
          trigger(target, "set", key, value2, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
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
    set(target, key) {
      if (true) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      if (true) {
        console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  };
  var toReactive = (value2) => isObject(value2) ? reactive2(value2) : value2;
  var toReadonly = (value2) => isObject(value2) ? readonly(value2) : value2;
  var toShallow = (value2) => value2;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "get", key);
    }
    !isReadonly && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1(key, isReadonly = false) {
    const target = this[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "has", key);
    }
    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value2) {
    value2 = toRaw(value2);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value2);
    if (!hadKey) {
      target.add(value2);
      trigger(target, "add", value2, value2);
    }
    return this;
  }
  function set$1(key, value2) {
    value2 = toRaw(value2);
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3.call(target, key);
    target.set(key, value2);
    if (!hadKey) {
      trigger(target, "add", key, value2);
    } else if (hasChanged(value2, oldValue)) {
      trigger(target, "set", key, value2, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3 ? get3.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value2, key) => {
        return callback.call(thisArg, wrap(value2), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args2) {
      const target = this[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args2);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        // iterator protocol
        next() {
          const { value: value2, done } = innerIterator.next();
          return done ? { value: value2, done } : {
            value: isPair ? [wrap(value2[0]), wrap(value2[1])] : wrap(value2),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type5) {
    return function(...args2) {
      if (true) {
        const key = args2[0] ? `on key "${args2[0]}" ` : ``;
        console.warn(`${capitalize(type5)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type5 === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type5 = toRawType(target);
      console.warn(`Reactive ${type5} contains both the raw and reactive versions of the same object${type5 === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  var readonlyMap = /* @__PURE__ */ new WeakMap();
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
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
  function getTargetType(value2) {
    return value2[
      "__v_skip"
      /* SKIP */
    ] || !Object.isExtensible(value2) ? 0 : targetTypeMap(toRawType(value2));
  }
  function reactive2(target) {
    if (target && target[
      "__v_isReadonly"
      /* IS_READONLY */
    ]) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    if (target[
      "__v_raw"
      /* RAW */
    ] && !(isReadonly && target[
      "__v_isReactive"
      /* IS_REACTIVE */
    ])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function toRaw(observed) {
    return observed && toRaw(observed[
      "__v_raw"
      /* RAW */
    ]) || observed;
  }
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }
  magic("nextTick", () => nextTick);
  magic("dispatch", (el) => dispatch.bind(dispatch, el));
  magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup22 }) => (key, callback) => {
    let evaluate2 = evaluateLater2(key);
    let getter = () => {
      let value2;
      evaluate2((i) => value2 = i);
      return value2;
    };
    let unwatch = watch(getter, callback);
    cleanup22(unwatch);
  });
  magic("store", getStores);
  magic("data", (el) => scope(el));
  magic("root", (el) => closestRoot(el));
  magic("refs", (el) => {
    if (el._x_refs_proxy)
      return el._x_refs_proxy;
    el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
    return el._x_refs_proxy;
  });
  function getArrayOfRefObject(el) {
    let refObjects = [];
    findClosest(el, (i) => {
      if (i._x_refs)
        refObjects.push(i._x_refs);
    });
    return refObjects;
  }
  var globalIdMemo = {};
  function findAndIncrementId(name2) {
    if (!globalIdMemo[name2])
      globalIdMemo[name2] = 0;
    return ++globalIdMemo[name2];
  }
  function closestIdRoot(el, name2) {
    return findClosest(el, (element) => {
      if (element._x_ids && element._x_ids[name2])
        return true;
    });
  }
  function setIdRoot(el, name2) {
    if (!el._x_ids)
      el._x_ids = {};
    if (!el._x_ids[name2])
      el._x_ids[name2] = findAndIncrementId(name2);
  }
  magic("id", (el, { cleanup: cleanup22 }) => (name2, key = null) => {
    let cacheKey = `${name2}${key ? `-${key}` : ""}`;
    return cacheIdByNameOnElement(el, cacheKey, cleanup22, () => {
      let root = closestIdRoot(el, name2);
      let id2 = root ? root._x_ids[name2] : findAndIncrementId(name2);
      return key ? `${name2}-${id2}-${key}` : `${name2}-${id2}`;
    });
  });
  interceptClone((from, to) => {
    if (from._x_id) {
      to._x_id = from._x_id;
    }
  });
  function cacheIdByNameOnElement(el, cacheKey, cleanup22, callback) {
    if (!el._x_id)
      el._x_id = {};
    if (el._x_id[cacheKey])
      return el._x_id[cacheKey];
    let output = callback();
    el._x_id[cacheKey] = output;
    cleanup22(() => {
      delete el._x_id[cacheKey];
    });
    return output;
  }
  magic("el", (el) => el);
  warnMissingPluginMagic("Focus", "focus", "focus");
  warnMissingPluginMagic("Persist", "persist", "persist");
  function warnMissingPluginMagic(name2, magicName, slug) {
    magic(magicName, (el) => warn(`You can't use [$${magicName}] without first installing the "${name2}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  directive("modelable", (el, { expression: expression16 }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup22 }) => {
    let func4 = evaluateLater2(expression16);
    let innerGet = () => {
      let result;
      func4((i) => result = i);
      return result;
    };
    let evaluateInnerSet = evaluateLater2(`${expression16} = __placeholder`);
    let innerSet = (val) => evaluateInnerSet(() => {
    }, { scope: { "__placeholder": val } });
    let initialValue = innerGet();
    innerSet(initialValue);
    queueMicrotask(() => {
      if (!el._x_model)
        return;
      el._x_removeModelListeners["default"]();
      let outerGet = el._x_model.get;
      let outerSet = el._x_model.set;
      let releaseEntanglement = entangle(
        {
          get() {
            return outerGet();
          },
          set(value2) {
            outerSet(value2);
          }
        },
        {
          get() {
            return innerGet();
          },
          set(value2) {
            innerSet(value2);
          }
        }
      );
      cleanup22(releaseEntanglement);
    });
  });
  directive("teleport", (el, { modifiers, expression: expression16 }, { cleanup: cleanup22 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-teleport can only be used on a <template> tag", el);
    let target = getTarget(expression16);
    let clone22 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone22;
    clone22._x_teleportBack = el;
    el.setAttribute("data-teleport-template", true);
    clone22.setAttribute("data-teleport-target", true);
    if (el._x_forwardEvents) {
      el._x_forwardEvents.forEach((eventName) => {
        clone22.addEventListener(eventName, (e) => {
          e.stopPropagation();
          el.dispatchEvent(new e.constructor(e.type, e));
        });
      });
    }
    addScopeToNode(clone22, {}, el);
    let placeInDom = (clone3, target2, modifiers2) => {
      if (modifiers2.includes("prepend")) {
        target2.parentNode.insertBefore(clone3, target2);
      } else if (modifiers2.includes("append")) {
        target2.parentNode.insertBefore(clone3, target2.nextSibling);
      } else {
        target2.appendChild(clone3);
      }
    };
    mutateDom(() => {
      placeInDom(clone22, target, modifiers);
      skipDuringClone(() => {
        initTree(clone22);
      })();
    });
    el._x_teleportPutBack = () => {
      let target2 = getTarget(expression16);
      mutateDom(() => {
        placeInDom(el._x_teleport, target2, modifiers);
      });
    };
    cleanup22(
      () => mutateDom(() => {
        clone22.remove();
        destroyTree(clone22);
      })
    );
  });
  var teleportContainerDuringClone = document.createElement("div");
  function getTarget(expression16) {
    let target = skipDuringClone(() => {
      return document.querySelector(expression16);
    }, () => {
      return teleportContainerDuringClone;
    })();
    if (!target)
      warn(`Cannot find x-teleport element for selector: "${expression16}"`);
    return target;
  }
  var handler = () => {
  };
  handler.inline = (el, { modifiers }, { cleanup: cleanup22 }) => {
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup22(() => {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };
  directive("ignore", handler);
  directive("effect", skipDuringClone((el, { expression: expression16 }, { effect: effect3 }) => {
    effect3(evaluateLater(el, expression16));
  }));
  function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler4 = (e) => callback(e);
    let options = {};
    let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
    if (modifiers.includes("dot"))
      event = dotSyntax(event);
    if (modifiers.includes("camel"))
      event = camelCase2(event);
    if (modifiers.includes("passive"))
      options.passive = true;
    if (modifiers.includes("capture"))
      options.capture = true;
    if (modifiers.includes("window"))
      listenerTarget = window;
    if (modifiers.includes("document"))
      listenerTarget = document;
    if (modifiers.includes("debounce")) {
      let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = debounce(handler4, wait);
    }
    if (modifiers.includes("throttle")) {
      let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = throttle(handler4, wait);
    }
    if (modifiers.includes("prevent"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.preventDefault();
        next(e);
      });
    if (modifiers.includes("stop"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.stopPropagation();
        next(e);
      });
    if (modifiers.includes("once")) {
      handler4 = wrapHandler(handler4, (next, e) => {
        next(e);
        listenerTarget.removeEventListener(event, handler4, options);
      });
    }
    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler4 = wrapHandler(handler4, (next, e) => {
        if (el.contains(e.target))
          return;
        if (e.target.isConnected === false)
          return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1)
          return;
        if (el._x_isShown === false)
          return;
        next(e);
      });
    }
    if (modifiers.includes("self"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.target === el && next(e);
      });
    if (isKeyEvent(event) || isClickEvent(event)) {
      handler4 = wrapHandler(handler4, (next, e) => {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
          return;
        }
        next(e);
      });
    }
    listenerTarget.addEventListener(event, handler4, options);
    return () => {
      listenerTarget.removeEventListener(event, handler4, options);
    };
  }
  function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
  }
  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char2) => char2.toUpperCase());
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function kebabCase2(subject) {
    if ([" ", "_"].includes(
      subject
    ))
      return subject;
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }
  function isClickEvent(event) {
    return ["contextmenu", "click", "mouse"].some((i) => event.includes(i));
  }
  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i) => {
      return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
      let debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.includes("throttle")) {
      let debounceIndex = keyModifiers.indexOf("throttle");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0)
      return false;
    if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
      return false;
    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
        if (modifier === "cmd" || modifier === "super")
          modifier = "meta";
        return e[`${modifier}Key`];
      });
      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (isClickEvent(e.type))
          return false;
        if (keyToModifiers(e.key).includes(keyModifiers[0]))
          return false;
      }
    }
    return true;
  }
  function keyToModifiers(key) {
    if (!key)
      return [];
    key = kebabCase2(key);
    let modifierToKeyMap = {
      "ctrl": "control",
      "slash": "/",
      "space": " ",
      "spacebar": " ",
      "cmd": "meta",
      "esc": "escape",
      "up": "arrow-up",
      "down": "arrow-down",
      "left": "arrow-left",
      "right": "arrow-right",
      "period": ".",
      "comma": ",",
      "equal": "=",
      "minus": "-",
      "underscore": "_"
    };
    modifierToKeyMap[key] = key;
    return Object.keys(modifierToKeyMap).map((modifier) => {
      if (modifierToKeyMap[modifier] === key)
        return modifier;
    }).filter((modifier) => modifier);
  }
  directive("model", (el, { modifiers, expression: expression16 }, { effect: effect3, cleanup: cleanup22 }) => {
    let scopeTarget = el;
    if (modifiers.includes("parent")) {
      scopeTarget = el.parentNode;
    }
    let evaluateGet = evaluateLater(scopeTarget, expression16);
    let evaluateSet;
    if (typeof expression16 === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression16} = __placeholder`);
    } else if (typeof expression16 === "function" && typeof expression16() === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression16()} = __placeholder`);
    } else {
      evaluateSet = () => {
      };
    }
    let getValue = () => {
      let result;
      evaluateGet((value2) => result = value2);
      return isGetterSetter(result) ? result.get() : result;
    };
    let setValue = (value2) => {
      let result;
      evaluateGet((value22) => result = value22);
      if (isGetterSetter(result)) {
        result.set(value2);
      } else {
        evaluateSet(() => {
        }, {
          scope: { "__placeholder": value2 }
        });
      }
    };
    if (typeof expression16 === "string" && el.type === "radio") {
      mutateDom(() => {
        if (!el.hasAttribute("name"))
          el.setAttribute("name", expression16);
      });
    }
    var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let removeListener = isCloning ? () => {
    } : on(el, event, modifiers, (e) => {
      setValue(getInputValue(el, modifiers, e, getValue()));
    });
    if (modifiers.includes("fill")) {
      if ([void 0, null, ""].includes(getValue()) || isCheckbox(el) && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
        setValue(
          getInputValue(el, modifiers, { target: el }, getValue())
        );
      }
    }
    if (!el._x_removeModelListeners)
      el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup22(() => el._x_removeModelListeners["default"]());
    if (el.form) {
      let removeResetListener = on(el.form, "reset", [], (e) => {
        nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, { target: el }, getValue())));
      });
      cleanup22(() => removeResetListener());
    }
    el._x_model = {
      get() {
        return getValue();
      },
      set(value2) {
        setValue(value2);
      }
    };
    el._x_forceModelUpdate = (value2) => {
      if (value2 === void 0 && typeof expression16 === "string" && expression16.match(/\./))
        value2 = "";
      window.fromModel = true;
      mutateDom(() => bind(el, "value", value2));
      delete window.fromModel;
    };
    effect3(() => {
      let value2 = getValue();
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
        return;
      el._x_forceModelUpdate(value2);
    });
  });
  function getInputValue(el, modifiers, event, currentValue) {
    return mutateDom(() => {
      if (event instanceof CustomEvent && event.detail !== void 0)
        return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
      else if (isCheckbox(el)) {
        if (Array.isArray(currentValue)) {
          let newValue = null;
          if (modifiers.includes("number")) {
            newValue = safeParseNumber(event.target.value);
          } else if (modifiers.includes("boolean")) {
            newValue = safeParseBoolean(event.target.value);
          } else {
            newValue = event.target.value;
          }
          return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
        if (modifiers.includes("number")) {
          return Array.from(event.target.selectedOptions).map((option2) => {
            let rawValue = option2.value || option2.text;
            return safeParseNumber(rawValue);
          });
        } else if (modifiers.includes("boolean")) {
          return Array.from(event.target.selectedOptions).map((option2) => {
            let rawValue = option2.value || option2.text;
            return safeParseBoolean(rawValue);
          });
        }
        return Array.from(event.target.selectedOptions).map((option2) => {
          return option2.value || option2.text;
        });
      } else {
        let newValue;
        if (isRadio(el)) {
          if (event.target.checked) {
            newValue = event.target.value;
          } else {
            newValue = currentValue;
          }
        } else {
          newValue = event.target.value;
        }
        if (modifiers.includes("number")) {
          return safeParseNumber(newValue);
        } else if (modifiers.includes("boolean")) {
          return safeParseBoolean(newValue);
        } else if (modifiers.includes("trim")) {
          return newValue.trim();
        } else {
          return newValue;
        }
      }
    });
  }
  function safeParseNumber(rawValue) {
    let number6 = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number6) ? number6 : rawValue;
  }
  function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
  }
  function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function isGetterSetter(value2) {
    return value2 !== null && typeof value2 === "object" && typeof value2.get === "function" && typeof value2.set === "function";
  }
  directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
  addInitSelector(() => `[${prefix("init")}]`);
  directive("init", skipDuringClone((el, { expression: expression16 }, { evaluate: evaluate2 }) => {
    if (typeof expression16 === "string") {
      return !!expression16.trim() && evaluate2(expression16, {}, false);
    }
    return evaluate2(expression16, {}, false);
  }));
  directive("text", (el, { expression: expression16 }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression16);
    effect3(() => {
      evaluate2((value2) => {
        mutateDom(() => {
          el.textContent = value2;
        });
      });
    });
  });
  directive("html", (el, { expression: expression16 }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression16);
    effect3(() => {
      evaluate2((value2) => {
        mutateDom(() => {
          el.innerHTML = value2;
          el._x_ignoreSelf = true;
          initTree(el);
          delete el._x_ignoreSelf;
        });
      });
    });
  });
  mapAttributes(startingWith(":", into(prefix("bind:"))));
  var handler2 = (el, { value: value2, modifiers, expression: expression16, original }, { effect: effect3, cleanup: cleanup22 }) => {
    if (!value2) {
      let bindingProviders = {};
      injectBindingProviders(bindingProviders);
      let getBindings = evaluateLater(el, expression16);
      getBindings((bindings) => {
        applyBindingsObject(el, bindings, original);
      }, { scope: bindingProviders });
      return;
    }
    if (value2 === "key")
      return storeKeyForXFor(el, expression16);
    if (el._x_inlineBindings && el._x_inlineBindings[value2] && el._x_inlineBindings[value2].extract) {
      return;
    }
    let evaluate2 = evaluateLater(el, expression16);
    effect3(() => evaluate2((result) => {
      if (result === void 0 && typeof expression16 === "string" && expression16.match(/\./)) {
        result = "";
      }
      mutateDom(() => bind(el, value2, result, modifiers));
    }));
    cleanup22(() => {
      el._x_undoAddedClasses && el._x_undoAddedClasses();
      el._x_undoAddedStyles && el._x_undoAddedStyles();
    });
  };
  handler2.inline = (el, { value: value2, modifiers, expression: expression16 }) => {
    if (!value2)
      return;
    if (!el._x_inlineBindings)
      el._x_inlineBindings = {};
    el._x_inlineBindings[value2] = { expression: expression16, extract: false };
  };
  directive("bind", handler2);
  function storeKeyForXFor(el, expression16) {
    el._x_keyExpression = expression16;
  }
  addRootSelector(() => `[${prefix("data")}]`);
  directive("data", (el, { expression: expression16 }, { cleanup: cleanup22 }) => {
    if (shouldSkipRegisteringDataDuringClone(el))
      return;
    expression16 = expression16 === "" ? "{}" : expression16;
    let magicContext = {};
    injectMagics(magicContext, el);
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression16, { scope: dataProviderContext });
    if (data2 === void 0 || data2 === true)
      data2 = {};
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup22(() => {
      reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
      undo();
    });
  });
  interceptClone((from, to) => {
    if (from._x_dataStack) {
      to._x_dataStack = from._x_dataStack;
      to.setAttribute("data-has-alpine-state", true);
    }
  });
  function shouldSkipRegisteringDataDuringClone(el) {
    if (!isCloning)
      return false;
    if (isCloningLegacy)
      return true;
    return el.hasAttribute("data-has-alpine-state");
  }
  directive("show", (el, { modifiers, expression: expression16 }, { effect: effect3 }) => {
    let evaluate2 = evaluateLater(el, expression16);
    if (!el._x_doHide)
      el._x_doHide = () => {
        mutateDom(() => {
          el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
        });
      };
    if (!el._x_doShow)
      el._x_doShow = () => {
        mutateDom(() => {
          if (el.style.length === 1 && el.style.display === "none") {
            el.removeAttribute("style");
          } else {
            el.style.removeProperty("display");
          }
        });
      };
    let hide = () => {
      el._x_doHide();
      el._x_isShown = false;
    };
    let show = () => {
      el._x_doShow();
      el._x_isShown = true;
    };
    let clickAwayCompatibleShow = () => setTimeout(show);
    let toggle = once(
      (value2) => value2 ? show() : hide(),
      (value2) => {
        if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
          el._x_toggleAndCascadeWithTransitions(el, value2, show, hide);
        } else {
          value2 ? clickAwayCompatibleShow() : hide();
        }
      }
    );
    let oldValue;
    let firstTime = true;
    effect3(() => evaluate2((value2) => {
      if (!firstTime && value2 === oldValue)
        return;
      if (modifiers.includes("immediate"))
        value2 ? clickAwayCompatibleShow() : hide();
      toggle(value2);
      oldValue = value2;
      firstTime = false;
    }));
  });
  directive("for", (el, { expression: expression16 }, { effect: effect3, cleanup: cleanup22 }) => {
    let iteratorNames = parseForExpression(expression16);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(
      el,
      // the x-bind:key expression is stored for our use instead of evaluated.
      el._x_keyExpression || "index"
    );
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup22(() => {
      Object.values(el._x_lookup).forEach((el2) => mutateDom(
        () => {
          destroyTree(el2);
          el2.remove();
        }
      ));
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });
  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
    let templateEl2 = el;
    evaluateItems((items) => {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), (i) => i + 1);
      }
      if (items === void 0)
        items = [];
      let lookup = el._x_lookup;
      let prevKeys = el._x_prevKeys;
      let scopes = [];
      let keys = [];
      if (isObject2(items)) {
        items = Object.entries(items).map(([key, value2]) => {
          let scope2 = getIterationScopeVariables(iteratorNames, value2, key, items);
          evaluateKey((value22) => {
            if (keys.includes(value22))
              warn("Duplicate key on x-for", el);
            keys.push(value22);
          }, { scope: { index: key, ...scope2 } });
          scopes.push(scope2);
        });
      } else {
        for (let i = 0; i < items.length; i++) {
          let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
          evaluateKey((value2) => {
            if (keys.includes(value2))
              warn("Duplicate key on x-for", el);
            keys.push(value2);
          }, { scope: { index: i, ...scope2 } });
          scopes.push(scope2);
        }
      }
      let adds = [];
      let moves = [];
      let removes = [];
      let sames = [];
      for (let i = 0; i < prevKeys.length; i++) {
        let key = prevKeys[i];
        if (keys.indexOf(key) === -1)
          removes.push(key);
      }
      prevKeys = prevKeys.filter((key) => !removes.includes(key));
      let lastKey = "template";
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let prevIndex = prevKeys.indexOf(key);
        if (prevIndex === -1) {
          prevKeys.splice(i, 0, key);
          adds.push([lastKey, i]);
        } else if (prevIndex !== i) {
          let keyInSpot = prevKeys.splice(i, 1)[0];
          let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(i, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(key);
        }
        lastKey = key;
      }
      for (let i = 0; i < removes.length; i++) {
        let key = removes[i];
        if (!(key in lookup))
          continue;
        mutateDom(() => {
          destroyTree(lookup[key]);
          lookup[key].remove();
        });
        delete lookup[key];
      }
      for (let i = 0; i < moves.length; i++) {
        let [keyInSpot, keyForSpot] = moves[i];
        let elInSpot = lookup[keyInSpot];
        let elForSpot = lookup[keyForSpot];
        let marker2 = document.createElement("div");
        mutateDom(() => {
          if (!elForSpot)
            warn(`x-for ":key" is undefined or invalid`, templateEl2, keyForSpot, lookup);
          elForSpot.after(marker2);
          elInSpot.after(elForSpot);
          elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
          marker2.before(elInSpot);
          elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
          marker2.remove();
        });
        elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
      }
      for (let i = 0; i < adds.length; i++) {
        let [lastKey2, index2] = adds[i];
        let lastEl = lastKey2 === "template" ? templateEl2 : lookup[lastKey2];
        if (lastEl._x_currentIfEl)
          lastEl = lastEl._x_currentIfEl;
        let scope2 = scopes[index2];
        let key = keys[index2];
        let clone22 = document.importNode(templateEl2.content, true).firstElementChild;
        let reactiveScope = reactive(scope2);
        addScopeToNode(clone22, reactiveScope, templateEl2);
        clone22._x_refreshXForScope = (newScope) => {
          Object.entries(newScope).forEach(([key2, value2]) => {
            reactiveScope[key2] = value2;
          });
        };
        mutateDom(() => {
          lastEl.after(clone22);
          skipDuringClone(() => initTree(clone22))();
        });
        if (typeof key === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl2);
        }
        lookup[key] = clone22;
      }
      for (let i = 0; i < sames.length; i++) {
        lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
      }
      templateEl2._x_prevKeys = keys;
    });
  }
  function parseForExpression(expression16) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression16.match(forAliasRE);
    if (!inMatch)
      return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }
    return res;
  }
  function getIterationScopeVariables(iteratorNames, item, index2, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
      names.forEach((name2, i) => {
        scopeVariables[name2] = item[i];
      });
    } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
      let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
      names.forEach((name2) => {
        scopeVariables[name2] = item[name2];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }
    if (iteratorNames.index)
      scopeVariables[iteratorNames.index] = index2;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }
  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function handler3() {
  }
  handler3.inline = (el, { expression: expression16 }, { cleanup: cleanup22 }) => {
    let root = closestRoot(el);
    if (!root._x_refs)
      root._x_refs = {};
    root._x_refs[expression16] = el;
    cleanup22(() => delete root._x_refs[expression16]);
  };
  directive("ref", handler3);
  directive("if", (el, { expression: expression16 }, { effect: effect3, cleanup: cleanup22 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-if can only be used on a <template> tag", el);
    let evaluate2 = evaluateLater(el, expression16);
    let show = () => {
      if (el._x_currentIfEl)
        return el._x_currentIfEl;
      let clone22 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone22, {}, el);
      mutateDom(() => {
        el.after(clone22);
        skipDuringClone(() => initTree(clone22))();
      });
      el._x_currentIfEl = clone22;
      el._x_undoIf = () => {
        mutateDom(() => {
          destroyTree(clone22);
          clone22.remove();
        });
        delete el._x_currentIfEl;
      };
      return clone22;
    };
    let hide = () => {
      if (!el._x_undoIf)
        return;
      el._x_undoIf();
      delete el._x_undoIf;
    };
    effect3(() => evaluate2((value2) => {
      value2 ? show() : hide();
    }));
    cleanup22(() => el._x_undoIf && el._x_undoIf());
  });
  directive("id", (el, { expression: expression16 }, { evaluate: evaluate2 }) => {
    let names = evaluate2(expression16);
    names.forEach((name2) => setIdRoot(el, name2));
  });
  interceptClone((from, to) => {
    if (from._x_ids) {
      to._x_ids = from._x_ids;
    }
  });
  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone((el, { value: value2, modifiers, expression: expression16 }, { cleanup: cleanup22 }) => {
    let evaluate2 = expression16 ? evaluateLater(el, expression16) : () => {
    };
    if (el.tagName.toLowerCase() === "template") {
      if (!el._x_forwardEvents)
        el._x_forwardEvents = [];
      if (!el._x_forwardEvents.includes(value2))
        el._x_forwardEvents.push(value2);
    }
    let removeListener = on(el, value2, modifiers, (e) => {
      evaluate2(() => {
      }, { scope: { "$event": e }, params: [e] });
    });
    cleanup22(() => removeListener());
  }));
  warnMissingPluginDirective("Collapse", "collapse", "collapse");
  warnMissingPluginDirective("Intersect", "intersect", "intersect");
  warnMissingPluginDirective("Focus", "trap", "focus");
  warnMissingPluginDirective("Mask", "mask", "mask");
  function warnMissingPluginDirective(name2, directiveName, slug) {
    directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name2}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
  var src_default = alpine_default;
  var module_default = src_default;

  // node_modules/@alpinejs/morph/dist/module.esm.js
  function morph(from, toHtml, options) {
    monkeyPatchDomSetAttributeToAllowAtSymbols();
    let fromEl;
    let toEl;
    let key, lookahead, updating, updated, removing, removed, adding, added;
    function assignOptions(options2 = {}) {
      let defaultGetKey = (el) => el.getAttribute("key");
      let noop = () => {
      };
      updating = options2.updating || noop;
      updated = options2.updated || noop;
      removing = options2.removing || noop;
      removed = options2.removed || noop;
      adding = options2.adding || noop;
      added = options2.added || noop;
      key = options2.key || defaultGetKey;
      lookahead = options2.lookahead || false;
    }
    function patch(from2, to) {
      if (differentElementNamesTypesOrKeys(from2, to)) {
        return swapElements(from2, to);
      }
      let updateChildrenOnly = false;
      let skipChildren = false;
      if (shouldSkipChildren(updating, () => skipChildren = true, from2, to, () => updateChildrenOnly = true))
        return;
      if (from2.nodeType === 1 && window.Alpine) {
        window.Alpine.cloneNode(from2, to);
        if (from2._x_teleport && to._x_teleport) {
          patch(from2._x_teleport, to._x_teleport);
        }
      }
      if (textOrComment(to)) {
        patchNodeValue(from2, to);
        updated(from2, to);
        return;
      }
      if (!updateChildrenOnly) {
        patchAttributes(from2, to);
      }
      updated(from2, to);
      if (!skipChildren) {
        patchChildren(from2, to);
      }
    }
    function differentElementNamesTypesOrKeys(from2, to) {
      return from2.nodeType != to.nodeType || from2.nodeName != to.nodeName || getKey(from2) != getKey(to);
    }
    function swapElements(from2, to) {
      if (shouldSkip(removing, from2))
        return;
      let toCloned = to.cloneNode(true);
      if (shouldSkip(adding, toCloned))
        return;
      from2.replaceWith(toCloned);
      removed(from2);
      added(toCloned);
    }
    function patchNodeValue(from2, to) {
      let value2 = to.nodeValue;
      if (from2.nodeValue !== value2) {
        from2.nodeValue = value2;
      }
    }
    function patchAttributes(from2, to) {
      if (from2._x_transitioning)
        return;
      if (from2._x_isShown && !to._x_isShown) {
        return;
      }
      if (!from2._x_isShown && to._x_isShown) {
        return;
      }
      let domAttributes = Array.from(from2.attributes);
      let toAttributes = Array.from(to.attributes);
      for (let i = domAttributes.length - 1; i >= 0; i--) {
        let name2 = domAttributes[i].name;
        if (!to.hasAttribute(name2)) {
          from2.removeAttribute(name2);
        }
      }
      for (let i = toAttributes.length - 1; i >= 0; i--) {
        let name2 = toAttributes[i].name;
        let value2 = toAttributes[i].value;
        if (from2.getAttribute(name2) !== value2) {
          from2.setAttribute(name2, value2);
        }
      }
    }
    function patchChildren(from2, to) {
      let fromKeys = keyToMap(from2.children);
      let fromKeyHoldovers = {};
      let currentTo = getFirstNode(to);
      let currentFrom = getFirstNode(from2);
      while (currentTo) {
        seedingMatchingId(currentTo, currentFrom);
        let toKey = getKey(currentTo);
        let fromKey = getKey(currentFrom);
        if (!currentFrom) {
          if (toKey && fromKeyHoldovers[toKey]) {
            let holdover = fromKeyHoldovers[toKey];
            from2.appendChild(holdover);
            currentFrom = holdover;
            fromKey = getKey(currentFrom);
          } else {
            if (!shouldSkip(adding, currentTo)) {
              let clone3 = currentTo.cloneNode(true);
              from2.appendChild(clone3);
              added(clone3);
            }
            currentTo = getNextSibling(to, currentTo);
            continue;
          }
        }
        let isIf = (node) => node && node.nodeType === 8 && node.textContent === "[if BLOCK]><![endif]";
        let isEnd = (node) => node && node.nodeType === 8 && node.textContent === "[if ENDBLOCK]><![endif]";
        if (isIf(currentTo) && isIf(currentFrom)) {
          let nestedIfCount = 0;
          let fromBlockStart = currentFrom;
          while (currentFrom) {
            let next = getNextSibling(from2, currentFrom);
            if (isIf(next)) {
              nestedIfCount++;
            } else if (isEnd(next) && nestedIfCount > 0) {
              nestedIfCount--;
            } else if (isEnd(next) && nestedIfCount === 0) {
              currentFrom = next;
              break;
            }
            currentFrom = next;
          }
          let fromBlockEnd = currentFrom;
          nestedIfCount = 0;
          let toBlockStart = currentTo;
          while (currentTo) {
            let next = getNextSibling(to, currentTo);
            if (isIf(next)) {
              nestedIfCount++;
            } else if (isEnd(next) && nestedIfCount > 0) {
              nestedIfCount--;
            } else if (isEnd(next) && nestedIfCount === 0) {
              currentTo = next;
              break;
            }
            currentTo = next;
          }
          let toBlockEnd = currentTo;
          let fromBlock = new Block(fromBlockStart, fromBlockEnd);
          let toBlock = new Block(toBlockStart, toBlockEnd);
          patchChildren(fromBlock, toBlock);
          continue;
        }
        if (currentFrom.nodeType === 1 && lookahead && !currentFrom.isEqualNode(currentTo)) {
          let nextToElementSibling = getNextSibling(to, currentTo);
          let found = false;
          while (!found && nextToElementSibling) {
            if (nextToElementSibling.nodeType === 1 && currentFrom.isEqualNode(nextToElementSibling)) {
              found = true;
              currentFrom = addNodeBefore(from2, currentTo, currentFrom);
              fromKey = getKey(currentFrom);
            }
            nextToElementSibling = getNextSibling(to, nextToElementSibling);
          }
        }
        if (toKey !== fromKey) {
          if (!toKey && fromKey) {
            fromKeyHoldovers[fromKey] = currentFrom;
            currentFrom = addNodeBefore(from2, currentTo, currentFrom);
            fromKeyHoldovers[fromKey].remove();
            currentFrom = getNextSibling(from2, currentFrom);
            currentTo = getNextSibling(to, currentTo);
            continue;
          }
          if (toKey && !fromKey) {
            if (fromKeys[toKey]) {
              currentFrom.replaceWith(fromKeys[toKey]);
              currentFrom = fromKeys[toKey];
              fromKey = getKey(currentFrom);
            }
          }
          if (toKey && fromKey) {
            let fromKeyNode = fromKeys[toKey];
            if (fromKeyNode) {
              fromKeyHoldovers[fromKey] = currentFrom;
              currentFrom.replaceWith(fromKeyNode);
              currentFrom = fromKeyNode;
              fromKey = getKey(currentFrom);
            } else {
              fromKeyHoldovers[fromKey] = currentFrom;
              currentFrom = addNodeBefore(from2, currentTo, currentFrom);
              fromKeyHoldovers[fromKey].remove();
              currentFrom = getNextSibling(from2, currentFrom);
              currentTo = getNextSibling(to, currentTo);
              continue;
            }
          }
        }
        let currentFromNext = currentFrom && getNextSibling(from2, currentFrom);
        patch(currentFrom, currentTo);
        currentTo = currentTo && getNextSibling(to, currentTo);
        currentFrom = currentFromNext;
      }
      let removals = [];
      while (currentFrom) {
        if (!shouldSkip(removing, currentFrom))
          removals.push(currentFrom);
        currentFrom = getNextSibling(from2, currentFrom);
      }
      while (removals.length) {
        let domForRemoval = removals.shift();
        domForRemoval.remove();
        removed(domForRemoval);
      }
    }
    function getKey(el) {
      return el && el.nodeType === 1 && key(el);
    }
    function keyToMap(els) {
      let map = {};
      for (let el of els) {
        let theKey = getKey(el);
        if (theKey) {
          map[theKey] = el;
        }
      }
      return map;
    }
    function addNodeBefore(parent, node, beforeMe) {
      if (!shouldSkip(adding, node)) {
        let clone3 = node.cloneNode(true);
        parent.insertBefore(clone3, beforeMe);
        added(clone3);
        return clone3;
      }
      return node;
    }
    assignOptions(options);
    fromEl = from;
    toEl = typeof toHtml === "string" ? createElement(toHtml) : toHtml;
    if (window.Alpine && window.Alpine.closestDataStack && !from._x_dataStack) {
      toEl._x_dataStack = window.Alpine.closestDataStack(from);
      toEl._x_dataStack && window.Alpine.cloneNode(from, toEl);
    }
    patch(from, toEl);
    fromEl = void 0;
    toEl = void 0;
    return from;
  }
  morph.step = () => {
  };
  morph.log = () => {
  };
  function shouldSkip(hook, ...args2) {
    let skip = false;
    hook(...args2, () => skip = true);
    return skip;
  }
  function shouldSkipChildren(hook, skipChildren, ...args2) {
    let skip = false;
    hook(...args2, () => skip = true, skipChildren);
    return skip;
  }
  var patched = false;
  function createElement(html) {
    const template3 = document.createElement("template");
    template3.innerHTML = html;
    return template3.content.firstElementChild;
  }
  function textOrComment(el) {
    return el.nodeType === 3 || el.nodeType === 8;
  }
  var Block = class {
    constructor(start2, end) {
      this.startComment = start2;
      this.endComment = end;
    }
    get children() {
      let children = [];
      let currentNode = this.startComment.nextSibling;
      while (currentNode && currentNode !== this.endComment) {
        children.push(currentNode);
        currentNode = currentNode.nextSibling;
      }
      return children;
    }
    appendChild(child) {
      this.endComment.before(child);
    }
    get firstChild() {
      let first = this.startComment.nextSibling;
      if (first === this.endComment)
        return;
      return first;
    }
    nextNode(reference2) {
      let next = reference2.nextSibling;
      if (next === this.endComment)
        return;
      return next;
    }
    insertBefore(newNode, reference2) {
      reference2.before(newNode);
      return newNode;
    }
  };
  function getFirstNode(parent) {
    return parent.firstChild;
  }
  function getNextSibling(parent, reference2) {
    let next;
    if (parent instanceof Block) {
      next = parent.nextNode(reference2);
    } else {
      next = reference2.nextSibling;
    }
    return next;
  }
  function monkeyPatchDomSetAttributeToAllowAtSymbols() {
    if (patched)
      return;
    patched = true;
    let original = Element.prototype.setAttribute;
    let hostDiv = document.createElement("div");
    Element.prototype.setAttribute = function newSetAttribute(name2, value2) {
      if (!name2.includes("@")) {
        return original.call(this, name2, value2);
      }
      hostDiv.innerHTML = `<span ${name2}="${value2}"></span>`;
      let attr2 = hostDiv.firstElementChild.getAttributeNode(name2);
      hostDiv.firstElementChild.removeAttributeNode(attr2);
      this.setAttributeNode(attr2);
    };
  }
  function seedingMatchingId(to, from) {
    let fromId = from && from._x_bindings && from._x_bindings.id;
    if (!fromId)
      return;
    if (!to.setAttribute)
      return;
    to.setAttribute("id", fromId);
    to.id = fromId;
  }
  function src_default2(Alpine2) {
    Alpine2.morph = morph;
  }
  var module_default2 = src_default2;

  // node_modules/@alpinejs/resize/dist/module.esm.js
  function src_default3(Alpine2) {
    Alpine2.directive("resize", Alpine2.skipDuringClone((el, { value: value2, expression: expression16, modifiers }, { evaluateLater: evaluateLater2, cleanup: cleanup3 }) => {
      let evaluator = evaluateLater2(expression16);
      let evaluate2 = (width, height) => {
        evaluator(() => {
        }, { scope: { "$width": width, "$height": height } });
      };
      let off = modifiers.includes("document") ? onDocumentResize(evaluate2) : onElResize(el, evaluate2);
      cleanup3(() => off());
    }));
  }
  function onElResize(el, callback) {
    let observer2 = new ResizeObserver((entries) => {
      let [width, height] = dimensions(entries);
      callback(width, height);
    });
    observer2.observe(el);
    return () => observer2.disconnect();
  }
  var documentResizeObserver;
  var documentResizeObserverCallbacks = /* @__PURE__ */ new Set();
  function onDocumentResize(callback) {
    documentResizeObserverCallbacks.add(callback);
    if (!documentResizeObserver) {
      documentResizeObserver = new ResizeObserver((entries) => {
        let [width, height] = dimensions(entries);
        documentResizeObserverCallbacks.forEach((i) => i(width, height));
      });
      documentResizeObserver.observe(document.documentElement);
    }
    return () => {
      documentResizeObserverCallbacks.delete(callback);
    };
  }
  function dimensions(entries) {
    let width, height;
    for (let entry of entries) {
      width = entry.borderBoxSize[0].inlineSize;
      height = entry.borderBoxSize[0].blockSize;
    }
    return [width, height];
  }
  var module_default3 = src_default3;

  // node_modules/@alpinejs/persist/dist/module.esm.js
  function src_default4(Alpine2) {
    let persist = () => {
      let alias;
      let storage;
      try {
        storage = localStorage;
      } catch (e) {
        console.error(e);
        console.warn("Alpine: $persist is using temporary storage since localStorage is unavailable.");
        let dummy = /* @__PURE__ */ new Map();
        storage = {
          getItem: dummy.get.bind(dummy),
          setItem: dummy.set.bind(dummy)
        };
      }
      return Alpine2.interceptor((initialValue, getter, setter, path, key) => {
        let lookup = alias || `_x_${path}`;
        let initial = storageHas(lookup, storage) ? storageGet(lookup, storage) : initialValue;
        setter(initial);
        Alpine2.effect(() => {
          let value2 = getter();
          storageSet(lookup, value2, storage);
          setter(value2);
        });
        return initial;
      }, (func4) => {
        func4.as = (key) => {
          alias = key;
          return func4;
        }, func4.using = (target) => {
          storage = target;
          return func4;
        };
      });
    };
    Object.defineProperty(Alpine2, "$persist", { get: () => persist() });
    Alpine2.magic("persist", persist);
    Alpine2.persist = (key, { get: get3, set: set3 }, storage = localStorage) => {
      let initial = storageHas(key, storage) ? storageGet(key, storage) : get3();
      set3(initial);
      Alpine2.effect(() => {
        let value2 = get3();
        storageSet(key, value2, storage);
        set3(value2);
      });
    };
  }
  function storageHas(key, storage) {
    return storage.getItem(key) !== null;
  }
  function storageGet(key, storage) {
    let value2 = storage.getItem(key, storage);
    if (value2 === void 0)
      return;
    return JSON.parse(value2);
  }
  function storageSet(key, value2, storage) {
    storage.setItem(key, JSON.stringify(value2));
  }
  var module_default4 = src_default4;

  // node_modules/@alpinejs/collapse/dist/module.esm.js
  function src_default5(Alpine2) {
    Alpine2.directive("collapse", collapse);
    collapse.inline = (el, { modifiers }) => {
      if (!modifiers.includes("min"))
        return;
      el._x_doShow = () => {
      };
      el._x_doHide = () => {
      };
    };
    function collapse(el, { modifiers }) {
      let duration = modifierValue2(modifiers, "duration", 250) / 1e3;
      let floor = modifierValue2(modifiers, "min", 0);
      let fullyHide = !modifiers.includes("min");
      if (!el._x_isShown)
        el.style.height = `${floor}px`;
      if (!el._x_isShown && fullyHide)
        el.hidden = true;
      if (!el._x_isShown)
        el.style.overflow = "hidden";
      let setFunction = (el2, styles) => {
        let revertFunction = Alpine2.setStyles(el2, styles);
        return styles.height ? () => {
        } : revertFunction;
      };
      let transitionStyles = {
        transitionProperty: "height",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)"
      };
      el._x_transition = {
        in(before = () => {
        }, after = () => {
        }) {
          if (fullyHide)
            el.hidden = false;
          if (fullyHide)
            el.style.display = null;
          let current = el.getBoundingClientRect().height;
          el.style.height = "auto";
          let full = el.getBoundingClientRect().height;
          if (current === full) {
            current = floor;
          }
          Alpine2.transition(el, Alpine2.setStyles, {
            during: transitionStyles,
            start: { height: current + "px" },
            end: { height: full + "px" }
          }, () => el._x_isShown = true, () => {
            if (Math.abs(el.getBoundingClientRect().height - full) < 1) {
              el.style.overflow = null;
            }
          });
        },
        out(before = () => {
        }, after = () => {
        }) {
          let full = el.getBoundingClientRect().height;
          Alpine2.transition(el, setFunction, {
            during: transitionStyles,
            start: { height: full + "px" },
            end: { height: floor + "px" }
          }, () => el.style.overflow = "hidden", () => {
            el._x_isShown = false;
            if (el.style.height == `${floor}px` && fullyHide) {
              el.style.display = "none";
              el.hidden = true;
            }
          });
        }
      };
    }
  }
  function modifierValue2(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1)
      return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback;
    if (key === "duration") {
      let match = rawValue.match(/([0-9]+)ms/);
      if (match)
        return match[1];
    }
    if (key === "min") {
      let match = rawValue.match(/([0-9]+)px/);
      if (match)
        return match[1];
    }
    return rawValue;
  }
  var module_default5 = src_default5;

  // node_modules/@imacrayon/alpine-ajax/dist/module.esm.js
  var settings = {
    headers: {},
    mergeStrategy: "replace",
    transitions: false,
    mapDelimiter: ":"
  };
  var doMorph = () => {
    console.error(`You can't use the "morph" merge without first installing the Alpine "morph" plugin here: https://alpinejs.dev/plugins/morph`);
  };
  function Ajax(Alpine2) {
    if (Alpine2.morph)
      doMorph = Alpine2.morph;
    Alpine2.addInitSelector(() => `[${Alpine2.prefixed("target")}]`);
    Alpine2.addInitSelector(() => `[${Alpine2.prefixed("target\\.push")}]`);
    Alpine2.addInitSelector(() => `[${Alpine2.prefixed("target\\.replace")}]`);
    Alpine2.directive("target", (el, { value: value2, modifiers, expression: expression16 }, { evaluateLater: evaluateLater2, effect: effect3 }) => {
      let setTarget = (ids) => {
        el._ajax_target = el._ajax_target || {};
        let plan = {
          ids: parseIds(el, ids),
          sync: true,
          focus: !modifiers.includes("nofocus"),
          history: modifiers.includes("push") ? "push" : modifiers.includes("replace") ? "replace" : false
        };
        let statues = modifiers.filter((modifier) => ["back", "away", "error"].includes(modifier) || parseInt(modifier));
        statues = statues.length ? statues : ["xxx"];
        statues.forEach((status) => {
          if (status.charAt(0) === "3") {
            status = "3xx";
          }
          el._ajax_target[status] = plan;
        });
      };
      if (value2 === "dynamic") {
        let evaluate2 = evaluateLater2(expression16);
        effect3(() => evaluate2(setTarget));
      } else {
        setTarget(expression16);
      }
    });
    Alpine2.directive("headers", (el, { expression: expression16 }, { evaluateLater: evaluateLater2, effect: effect3 }) => {
      let evaluate2 = evaluateLater2(expression16 || "{}");
      effect3(() => {
        evaluate2((headers) => {
          el._ajax_headers = headers;
        });
      });
    });
    Alpine2.addInitSelector(() => `[${Alpine2.prefixed("merge")}]`);
    Alpine2.addInitSelector(() => `[${Alpine2.prefixed("merge\\.transition")}]`);
    Alpine2.directive("merge", (el, { value: value2, modifiers, expression: expression16 }, { evaluateLater: evaluateLater2, effect: effect3 }) => {
      let setMerge = (strategy) => {
        el._ajax_strategy = strategy;
        el._ajax_transition = settings.transitions || modifiers.includes("transition");
      };
      if (value2 === "dynamic") {
        let evaluate2 = evaluateLater2(expression16);
        effect3(() => evaluate2(setMerge));
      } else {
        setMerge(expression16);
      }
    });
    Alpine2.magic("ajax", (el) => {
      return async (action, options = {}) => {
        let control = {
          el,
          target: {
            "xxx": {
              ids: parseIds(el, options.targets || options.target),
              sync: Boolean(options.sync),
              history: "history" in options ? options.history : false,
              focus: "focus" in options ? options.focus : true
            }
          },
          headers: options.headers || {}
        };
        let method = options.method ? options.method.toUpperCase() : "GET";
        let body = options.body;
        return send(control, action, method, body);
      };
    });
    let started2 = false;
    Alpine2.ajax = {
      start() {
        if (!started2) {
          document.addEventListener("submit", handleForms);
          document.addEventListener("click", handleLinks);
          window.addEventListener("popstate", handleHistory);
          started2 = true;
        }
      },
      configure: Ajax.configure,
      stop() {
        document.removeEventListener("submit", handleForms);
        document.removeEventListener("click", handleLinks);
        window.removeEventListener("popstate", handleHistory);
        started2 = false;
      }
    };
    Alpine2.ajax.start();
  }
  Ajax.configure = (options) => {
    settings = Object.assign(settings, options);
    return Ajax;
  };
  var src_default6 = Ajax;
  function handleHistory(event) {
    if (!event.state || !event.state.__ajax)
      return;
    window.location.reload(true);
  }
  async function handleLinks(event) {
    if (event.defaultPrevented || event.which > 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    let link = event == null ? void 0 : event.target.closest("a[href]:not([download]):not([noajax])");
    if (!link || !link._ajax_target || link.isContentEditable || link.origin !== window.location.origin || link.getAttribute("href").startsWith("#") || link.hash && samePath(link, new URL(document.baseURI)))
      return;
    event.preventDefault();
    event.stopImmediatePropagation();
    let control = {
      el: link,
      target: link._ajax_target,
      headers: link._ajax_headers || {}
    };
    let action = link.getAttribute("href");
    try {
      return await send(control, action);
    } catch (error2) {
      if (error2.name === "RenderError") {
        console.warn(error2.message);
        window.location.href = link.href;
        return;
      }
      throw error2;
    }
  }
  async function handleForms(event) {
    if (event.defaultPrevented) {
      return;
    }
    let form = event.target;
    let submitter = event.submitter;
    let method = ((submitter == null ? void 0 : submitter.getAttribute("formmethod")) || form.getAttribute("method") || "GET").toUpperCase();
    if (!form || !form._ajax_target || method === "DIALOG" || (submitter == null ? void 0 : submitter.hasAttribute("formnoajax")) || (submitter == null ? void 0 : submitter.hasAttribute("formtarget")) || form.hasAttribute("noajax") || form.hasAttribute("target"))
      return;
    event.preventDefault();
    event.stopImmediatePropagation();
    let control = {
      el: form,
      target: form._ajax_target,
      headers: form._ajax_headers || {}
    };
    let body = new FormData(form);
    let enctype = form.getAttribute("enctype");
    let action = form.getAttribute("action");
    if (submitter) {
      enctype = submitter.getAttribute("formenctype") || enctype;
      action = submitter.getAttribute("formaction") || action;
      if (submitter.name) {
        body.append(submitter.name, submitter.value);
      }
    }
    try {
      return await withSubmitter(submitter, () => {
        return send(control, action, method, body, enctype);
      });
    } catch (error2) {
      if (error2.name === "RenderError") {
        console.warn(error2.message);
        form.setAttribute("noajax", "true");
        form.requestSubmit(submitter);
        return;
      }
      throw error2;
    }
  }
  async function withSubmitter(submitter, callback) {
    if (!submitter)
      return await callback();
    let disableEvent = (e) => e.preventDefault();
    submitter.setAttribute("aria-disabled", "true");
    submitter.addEventListener("click", disableEvent);
    let result;
    try {
      result = await callback();
    } finally {
      submitter.removeAttribute("aria-disabled");
      submitter.removeEventListener("click", disableEvent);
    }
    return result;
  }
  var PendingTargets = {
    store: /* @__PURE__ */ new Map(),
    plan(plan, response) {
      plan.ids.forEach((pair) => {
        let docId = pair[0];
        let el = ["_self", "_top", "_none"].includes(docId) ? document.documentElement : document.getElementById(docId);
        if (!el) {
          return console.warn(`Target [#${docId}] was not found in current document.`);
        }
        el._ajax_id = pair[1];
        this.set(el, response);
      });
      if (plan.sync) {
        let targeted = plan.ids.flat();
        document.querySelectorAll("[x-sync]").forEach((el) => {
          let id2 = el.getAttribute("id");
          if (!id2) {
            throw new IDError(el);
          }
          if (targeted.includes(id2)) {
            return;
          }
          el._ajax_id = id2;
          el._ajax_sync = true;
          this.set(el, response);
        });
      }
    },
    purge(response) {
      this.store.forEach((r, t) => response === r && this.delete(t));
    },
    get(response) {
      let targets = [];
      this.store.forEach((r, t) => response === r && targets.push(t));
      return targets;
    },
    set(target, response) {
      target.querySelectorAll("[aria-busy]").forEach((busy) => {
        this.delete(busy);
      });
      target.setAttribute("aria-busy", "true");
      this.store.set(target, response);
    },
    delete(target) {
      target.removeAttribute("aria-busy");
      this.store.delete(target);
    }
  };
  var RequestCache = /* @__PURE__ */ new Map();
  async function send(control, action = "", method = "GET", body = null, enctype = "application/x-www-form-urlencoded") {
    var _a;
    if (!dispatch2(control.el, "ajax:before")) {
      return;
    }
    let plan = control.target.xxx;
    let response = { ok: false, redirected: false, url: "", status: "", html: "", raw: "" };
    PendingTargets.plan(plan, response);
    let referrer = new URL(((_a = control.el.closest("[data-source]")) == null ? void 0 : _a.dataset.source) || "", document.baseURI);
    action = new URL(action || referrer, document.baseURI);
    if (body) {
      body = parseFormData(body);
      if (method === "GET") {
        action.search = formDataToParams(body).toString();
        body = null;
      } else if (enctype !== "multipart/form-data") {
        body = formDataToParams(body);
      }
    }
    let request = {
      action: action.toString(),
      method,
      body,
      enctype,
      referrer: referrer.toString(),
      headers: Object.assign({
        "X-Alpine-Request": true,
        "X-Alpine-Target": PendingTargets.get(response).map((target) => target._ajax_id).join(" ")
      }, settings.headers, control.headers)
    };
    dispatch2(control.el, "ajax:send", request);
    let pending;
    if (request.method === "GET" && RequestCache.has(request.action)) {
      pending = RequestCache.get(request.action);
    } else {
      pending = fetch(request.action, request).then(async (r) => {
        let text = await r.text();
        let wrapper = document.createRange().createContextualFragment("<template>" + text + "</template>");
        r.html = wrapper.firstElementChild.content;
        r.raw = text;
        return r;
      });
      RequestCache.set(request.action, pending);
    }
    await pending.then((r) => {
      response.ok = r.ok;
      response.redirected = r.redirected;
      response.url = r.url;
      response.status = r.status;
      response.html = r.html;
      response.raw = r.raw;
    });
    if (response.ok) {
      if (response.redirected) {
        dispatch2(control.el, "ajax:redirect", response);
        RequestCache.set(response.url, pending);
        setTimeout(() => {
          RequestCache.delete(response.url);
        }, 5);
      }
      dispatch2(control.el, "ajax:success", response);
    } else {
      dispatch2(control.el, "ajax:error", response);
    }
    dispatch2(control.el, "ajax:sent", response);
    RequestCache.delete(request.action);
    if (!response.html) {
      PendingTargets.purge(response);
      return;
    }
    let status = response.redirected ? "3xx" : response.status.toString();
    let isBack = samePath(new URL(response.url), new URL(request.referrer, document.baseURI));
    let key = [
      response.redirected ? isBack ? "back" : "away" : null,
      status,
      status.charAt(0) + "xx",
      response.ok ? "xxx" : "error",
      "xxx"
    ].find((key2) => key2 in control.target);
    if (key !== "xxx") {
      plan = control.target[key];
      if (!response.redirected || !isBack || !plan.ids.flat().includes("_self")) {
        PendingTargets.purge(response);
        PendingTargets.plan(plan, response);
      }
    }
    if (plan.history) {
      updateHistory(plan.history, response.url);
    }
    let focused = !plan.focus;
    let renders = PendingTargets.get(response).map(async (target) => {
      if (!target.isConnected || target._ajax_id === "_none") {
        PendingTargets.delete(target);
        return;
      }
      if (target === document.documentElement) {
        window.location.href = response.url;
      }
      let content2 = response.html.getElementById(target._ajax_id);
      if (!content2) {
        if (target._ajax_sync) {
          return;
        }
        if (!dispatch2(control.el, "ajax:missing", { target, response })) {
          return;
        }
        if (response.ok) {
          return target.remove();
        }
        throw new RenderError(target, response.status);
      }
      let strategy = target._ajax_strategy || settings.mergeStrategy;
      let render2 = async () => {
        target = await merge(strategy, target, content2);
        if (target) {
          target.dataset.source = response.url;
          PendingTargets.delete(target);
          let selectors = ["[x-autofocus]", "[autofocus]"];
          while (!focused && selectors.length) {
            let selector = selectors.shift();
            if (target.matches(selector)) {
              focused = focusOn(target);
            }
            focused = focused || Array.from(target.querySelectorAll(selector)).some((focusable) => focusOn(focusable));
          }
        }
        dispatch2(target, "ajax:merged");
        return target;
      };
      if (!dispatch2(target, "ajax:merge", { strategy, content: content2, merge: render2 })) {
        return;
      }
      return render2();
    });
    let render = await Promise.all(renders);
    dispatch2(control.el, "ajax:after", { response, render });
    return render;
  }
  function parseFormData(data2) {
    if (data2 instanceof FormData)
      return data2;
    if (data2 instanceof HTMLFormElement)
      return new FormData(data2);
    const formData = new FormData();
    for (let key in data2) {
      if (typeof data2[key] === "object") {
        formData.append(key, JSON.stringify(data2[key]));
      } else {
        formData.append(key, data2[key]);
      }
    }
    return formData;
  }
  function formDataToParams(body) {
    let params2 = Array.from(body.entries()).filter(([key, value2]) => {
      return !(value2 instanceof File);
    });
    return new URLSearchParams(params2);
  }
  async function merge(strategy, target, to) {
    let strategies = {
      before(from, to2) {
        from.before(...to2.childNodes);
        return from;
      },
      replace(from, to2) {
        from.replaceWith(to2);
        return to2;
      },
      update(from, to2) {
        from.replaceChildren(...to2.childNodes);
        return from;
      },
      prepend(from, to2) {
        from.prepend(...to2.childNodes);
        return from;
      },
      append(from, to2) {
        from.append(...to2.childNodes);
        return from;
      },
      after(from, to2) {
        from.after(...to2.childNodes);
        return from;
      },
      morph(from, to2) {
        doMorph(from, to2);
        return document.getElementById(to2.getAttribute("id"));
      }
    };
    if (!target._ajax_transition || !document.startViewTransition) {
      return strategies[strategy](target, to);
    }
    let transition2 = document.startViewTransition(() => {
      target = strategies[strategy](target, to);
      return Promise.resolve();
    });
    await transition2.updateCallbackDone;
    return target;
  }
  function focusOn(el) {
    if (!el)
      return false;
    if (!el.getClientRects().length)
      return false;
    setTimeout(() => {
      if (!el.hasAttribute("tabindex"))
        el.setAttribute("tabindex", "0");
      el.focus();
    }, 0);
    return true;
  }
  function updateHistory(strategy, url) {
    let strategies = {
      push: () => window.history.pushState({ __ajax: true }, "", url),
      replace: () => window.history.replaceState({ __ajax: true }, "", url)
    };
    return strategies[strategy]();
  }
  function parseIds(el, ids = null) {
    let elId = el.getAttribute("id");
    let parsed = [elId];
    if (ids) {
      parsed = Array.isArray(ids) ? ids : ids.split(" ");
    }
    parsed = parsed.filter((id2) => id2).map((id2) => {
      let pair = id2.split(settings.mapDelimiter).map((id22) => id22 || elId);
      pair[1] = pair[1] || pair[0];
      return pair;
    });
    if (parsed.length === 0) {
      throw new IDError(el);
    }
    return parsed;
  }
  function dispatch2(el, name2, detail) {
    return el.dispatchEvent(
      new CustomEvent(name2, {
        detail,
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
  }
  function samePath(urlA, urlB) {
    return stripTrailingSlash(urlA.pathname) === stripTrailingSlash(urlB.pathname);
  }
  function stripTrailingSlash(str) {
    return str.replace(/\/$/, "");
  }
  var IDError = class extends DOMException {
    constructor(el) {
      var _a, _b;
      let description = (_b = ((_a = el.outerHTML.match(/<[^>]+>/)) != null ? _a : [])[0]) != null ? _b : "[Element]";
      super(`${description} is missing an ID to target.`, "IDError");
    }
  };
  var RenderError = class extends DOMException {
    constructor(target, status) {
      let id2 = target.getAttribute("id");
      super(`Target [#${id2}] was not found in response with status [${status}].`, "RenderError");
    }
  };
  var module_default6 = src_default6;

  // assets/js/logger.js
  var Logger = class {
    constructor(scope2 = null) {
      this.scope = scope2 ? `${scope2.charAt(0).toUpperCase()}${scope2.slice(1)}` : null;
    }
    log(...args2) {
      return console.log(...this._buildArgs("log", args2));
    }
    info(...args2) {
      return console.info(...this._buildArgs("info", args2));
    }
    debug(...args2) {
      return console.debug(...this._buildArgs("debug", args2));
    }
    warn(...args2) {
      return console.warn(...this._buildArgs("warn", args2));
    }
    error(...args2) {
      return console.error(...this._buildArgs("error", args2));
    }
    _buildArgs(level, args2) {
      let prefix2 = "Lookbook";
      if (this.scope) prefix2 += `:${this.scope}`;
      return [`[${prefix2}]`, ...args2];
    }
  };

  // node_modules/prism-code-editor/dist/index-C1_GGQ8y.js
  var plainTextGrammar = {};
  var rest = Symbol();
  var tokenize = Symbol();
  var resolve = (id2) => typeof id2 == "string" ? languages[id2] : id2;
  var languages = {
    plain: plainTextGrammar,
    plaintext: plainTextGrammar,
    text: plainTextGrammar,
    txt: plainTextGrammar
  };
  var tokenizeText = (text, grammar) => (grammar[tokenize] || withoutTokenizer)(text, grammar);
  var withoutTokenizer = (text, grammar) => {
    var startNode = [text];
    var restGrammar;
    var array2 = [], i = 0;
    while (restGrammar = resolve(grammar[rest])) {
      delete grammar[rest];
      Object.assign(grammar, restGrammar);
    }
    matchGrammar(text, grammar, startNode, 0);
    while (array2[i++] = startNode[0], startNode = startNode[1]) ;
    return array2;
  };
  var escapeHtml = (string16, pattern, replacement) => {
    return string16.replace(/&/g, "&amp;").replace(pattern, replacement);
  };
  var closingTag = "</span>";
  var openingTags = "";
  var closingTags = "";
  var highlightTokens = (tokens) => {
    var str = "", l = tokens.length, i = 0;
    while (i < l) str += stringify(tokens[i++]);
    return str;
  };
  var stringify = (token) => {
    if (token instanceof Token) {
      var { type: type5, alias, content: content2 } = token;
      var prevOpening = openingTags;
      var prevClosing = closingTags;
      var opening = `<span class="token ${type5 + (alias ? " " + alias : "") + (type5 == "keyword" && typeof content2 == "string" ? " keyword-" + content2 : "")}">`;
      closingTags += closingTag;
      openingTags += opening;
      var contentStr = stringify(content2);
      openingTags = prevOpening;
      closingTags = prevClosing;
      return opening + contentStr + closingTag;
    }
    if (typeof token != "string") return highlightTokens(token);
    token = escapeHtml(token, /</g, "&lt;");
    if (closingTags && token.includes("\n")) {
      return token.replace(/\n/g, closingTags + "\n" + openingTags);
    }
    return token;
  };
  var matchGrammar = (text, grammar, startNode, startPos, rematch) => {
    for (var token in grammar) {
      if (grammar[token]) for (var j = 0, p = grammar[token], patterns = Array.isArray(p) ? p : [p]; j < patterns.length; ++j) {
        if (rematch && rematch[0] == token && rematch[1] == j) {
          return;
        }
        var patternObj = patterns[j];
        var pattern = patternObj.pattern || patternObj;
        var inside5 = resolve(patternObj.inside);
        var lookbehind = patternObj.lookbehind;
        var greedy = patternObj.greedy && pattern.global;
        var alias = patternObj.alias;
        for (var currentNode = startNode, pos = startPos; currentNode && (!rematch || pos < rematch[2]); pos += currentNode[0].length, currentNode = currentNode[1]) {
          var str = currentNode[0];
          var removeCount = 0;
          var match, lookbehindLength;
          if (str instanceof Token) {
            continue;
          }
          pattern.lastIndex = greedy ? pos : 0;
          match = pattern.exec(greedy ? text : str);
          if (!match && greedy) {
            break;
          }
          if (!(match && match[0])) {
            continue;
          }
          if (lookbehind && match[1]) {
            lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          if (greedy) {
            for (var from = match.index, to = from + match[0].length, l; from >= pos + (l = currentNode[0].length); currentNode = currentNode[1], pos += l) ;
            if (currentNode[0] instanceof Token) {
              continue;
            }
            for (var k = currentNode, p = pos; (p += k[0].length) < to; k = k[1], removeCount++) ;
            str = text.slice(pos, p);
            match.index -= pos;
          }
          var from = match.index;
          var matchStr = match[0];
          var after = str.slice(from + matchStr.length);
          var reach = pos + str.length;
          var newToken = new Token(token, inside5 ? tokenizeText(matchStr, inside5) : matchStr, matchStr, alias);
          var next = currentNode, i = 0;
          var nestedRematch;
          while (next = next[1], i++ < removeCount) ;
          if (after) {
            if (!next || next[0] instanceof Token) next = [after, next];
            else next[0] = after + next[0];
          }
          pos += from;
          currentNode[0] = from ? str.slice(0, from) : newToken;
          if (from) currentNode = currentNode[1] = [newToken, next];
          else currentNode[1] = next;
          if (removeCount) {
            matchGrammar(text, grammar, currentNode, pos, nestedRematch = [token, j, reach]);
            reach = nestedRematch[2];
          }
          if (rematch && reach > rematch[2]) rematch[2] = reach;
        }
      }
    }
  };
  function Token(type5, content2, matchedStr, alias) {
    this.type = type5;
    this.content = content2;
    this.alias = alias;
    this.length = matchedStr.length;
  }

  // node_modules/prism-code-editor/dist/prism/languages/abap.js
  languages.abap = {
    "comment": /^\*.*/m,
    "string": /(`|')(?:\\.|(?!\1)[^\\\n])*\1/,
    "string-template": {
      pattern: /([|}])(?:\\.|[^\\\n|{])+(?=[|{])/,
      lookbehind: true,
      alias: "string"
    },
    /* End Of Line comments should not interfere with strings when the
    quote character occurs within them. We assume a string being highlighted
    inside an EOL comment is more acceptable than the opposite.
    */
    "eol-comment": {
      pattern: /(^|\s)".*/m,
      lookbehind: true,
      alias: "comment"
    },
    "keyword": {
      pattern: /(\s|\.|^)(?:\*-input|\?to|abap-source|abbreviated|ab?s|abstract|accept|accepting|accesspolicy|according|a?cos|activation|actual|add|add-corresponding|adjacent|after|alias|aliases|align|allocate|alpha|analysis|analyzer|an[dy]|append|appendage|appending|application|archive|area|arithmetic|ascending|a?sin|aspect|assert|assign|assigned|assigning|association|asynchronous|at|a?tan|attributes|authority|authority-check|avg|[bp]ack|background|backup|backward|badi|base|before|begin|between|big|binary|binding|bit|bit-and|bit-not|bit-x?or|black|blanks?|b?lob|blocks?|blue|bounds?|boundaries|boxed|break-point|bt|buffer|by|bypassing|byte|byte-c[anos]|byte-n[as]|byte-order|ca?|c?all|calling|cas[et]|casting|[cm]atch|ceil|center|centered|chain|chain-input|chain-request|change|changing|channels|char-to-hex|character|charlen|check|checkbox|circular|ci_|class|class-coding|class-data|class-events|class-methods|class-pool|cleanup|clear|client|clob|clock|close|cnt?|co|coalesce|code|coding|collect|color|columns?|col_background|col_group|col_heading|col_key|col_negative|col_normal|col_positive|col_total|comments?|commit|common|communication|comparing|components?|compression|compute|concat|concatenate|con[dv]|condense|condition|connect|connection|constants|contexts?|continue|controls?|conversion|convert|copies|copy|corresponding|cosh|count|country|cover|cpi?|create|creating|critical|cs|currency|currency_conversion|current|cursor|cursor-selection|customer|customer-function|dangerous|data|database|datainfo|dataset|[dl]ate|daylight|dbmaxlen|dd\/mm\/yy|dd\/mm\/yyyy|ddmmyy|deallocate|decimals|decimal_shift|declarations|[dk]eep|default|deferred|define|defining|definition|delete|deleting|demand|department|descending|describe|destination|detail|dialog|directory|disconnect|display|display-mode|distance|distinct|div|divide|divide-corresponding|division|do|dummy|duplicates?|duration|during|dynamic|dynpro|eq?|each|edit|editor-call|else|elseif|empty|enabled|enabling|encoding|end(?:-enhancement-section|-lines|-of-definition|-of-file|-of-page|-of-selection|at|case|catch|chain|class|do|enhancement|exec|form?|function|ian|if|ing|interface|loop|method|module|on|provide|select|try|while)|engineering|enhancements?|enhancement-point|enhancement-section|entries|entry|environment|equal|equiv|errormessage|errors|escape|escaping|events?|exact|except|exceptions?|exception-table|exclude|excluding|exec|execute|exists|exit|exit-command|exp|expand|expanding|expiration|explicit|exponent|export|exporting|extend|extended|extension|extract|fail|fetch|field-groups|field-symbols?|fields?|file|filter-table|filters?|final|find|first|first-line|fixed-point|[fg]keq|[fg]kge|floor|flush|font|form?|format|forward|found|frac|frames?|free|friends|from|function|function-pool|functionality|further|gaps|get?|generate|giving|global|grant|greater|green|groups?|gt|handler?|harmless|hashed|having|hdb|head-lines|headers?|heading|help-id|help-request|hide|high|hint|hold|hotspot|in?|icon|ids?|identification|identifier|if|ignore|ignoring|immediately|implementations?|implemented|implicit|import|importing|inactive|incl|includes?|including|increment|index|index-line|infotypes|inheriting|init|initial|initialization|inner|in[op]ut|insert|instances|intensified|interfaces?|interface-pool|internal|intervals|into|inverse|inverted-date|iso?|iterator|itno|job|join|keeping|kernel|keys?|keywords|kind|language|last|layout|let?|leading|leave|left|left-justified|leftplus|leftspace|legacy|length|less|levels?|like|lines?|line-count|line-selection|line-size|linefeed|list|list-processing|listbox|little|llang|load|load-of-program|locale?|locator|log|log-point|log10|logfile|logical|long|loop|low|lower|l?pad|lpi|lt|m|mai[ln]|major-id|mapping|margin|ma[rs]k|matchcode|max|maximum|medium|members|memory|mesh|messages?|message-id|messaging|methods?|min|minimum|minor-id|mm\/dd\/yy|mm\/dd\/yyyy|mmddyy|mode?|modify?|modifier|module|move|move-corresponding|multiply|multiply-corresponding|n[abeops]|name|nametab|native|nested|[nt]esting|new|new-line|new-page|new-section|[nt]ext|no-display|no-extension|no-gaps?|no-grouping|no-heading|no-scrolling|no-sign|no-title|no-topofpage|no-zero|nodes?|non-unicode|non-unique|not|null|number|numofchar|on?|objects?|obligatory|occurrences?|occurs|off?|offset|only|open|options?|optional|order|others?|[op]ut|outer|output|output-length|overflow|overlay|package|padding|pages?|parameters?|parameter-table|part|partially|pattern|percentage|perform|performing|person|pf|pf-status|pink|places|position|pos_high|pos_low|pragmas|precompiled|preferred|preserving|primary|print|print-control|priority|private|procedure|process|program|property|protected|provide|public|pushbutton|queue-only|quickinfo|radiobutton|raise|raising|ranges?|raw|read|read-only|reader|receiver?|received|receiving|red|redefinition|reduced?|ref|reference|refresh|regex|reject|remote|renaming|replace|replacement|replacing|report|request|requested|reserve|reset|resolution|respecting|responsible|results?|resumable|resume|retry|return|returncode|returning|right|right-justified|rightplus|rightspace|risk|rmc_communication_failure|rmc_invalid_status|rmc_system_failure|r?ole|rollback|round|rows|rtti|run|sap|sap-spool|saving|scale_preserving|scale_preserving_scientific|scan|scientific|scientific_with_leading_zero|screen|scroll|scroll-boundary|scrolling|search|secondary|seconds|section|select(?:-options|ion-screen|ion-sets?|ion-table|ions?|or)?|s?end|separated?|set|shared|shift|short|shortdump-id|sign|sign_as_postfix|simple|single|sinh|size|skip|skipping|smart|some|sort|sortable|sorted|source|space|specified|split|s?pool|spots|sql|sqlscript|sqrt|stable|stamp|standard|start-of-selection|starting|state|statements?|statics?|statusinfo|step-loop|stop|structures?|style|subkey|submatches|submit|subroutine|subscreen|substring|subtract|subtract-corresponding|suffix|sum|summary|summing|supplied|supply|suppress|switch|switchstates|symbol|syncpoints|syntax|syntax-check|syntax-trace|system-call|system-exceptions|system-exit|tab|tabbed|tables?|tableview|tabstrip|tanh|target|tasks?|test|textpool|[tw]hen|throw|times?|timestamp|timezone|title|title-lines|titlebar|to|tokenization|tokens|top-lines|top-of-page|trace-file|trace-table|trailing|transaction|transfer|transformation|translate|transporting|trmac|trunc|truncate|truncation|try|types?|type-pools?|uline|unassign|under|unicode|union|unique|uni[tx]|unit_conversion|unpack|until|unwind|up|update|upper|user|user-command|using|utf-8|valid|values?|value-request|vary|varying|verification-message|version|via|view|visible|wait|warning|whenever|where|while|width|windows?|with|with-heading|with-title|without|wor[dk]|writer?|x|xml|x?or|xsd|x?strlen|yellow|yes|yymmdd|z|zero|zone)(?![\w-])/i,
      lookbehind: true
    },
    /* Numbers can be only integers. Decimal or Hex appear only as strings */
    "number": /\b\d+\b/,
    /* Operators must always be surrounded by whitespace, they cannot be put
    adjacent to operands.
    */
    "operator": {
      pattern: /(\s)(?:\*\*?|<[=>]?|>=?|\?=|[/=+-])(?!\S)/,
      lookbehind: true
    },
    "string-operator": {
      pattern: /(\s)&&?(?!\S)/,
      lookbehind: true,
      /* The official editor highlights */
      alias: "keyword"
    },
    "token-operator": {
      /* Special operators used to access structure components, class methods/attributes, etc. */
      /* Special tokens used do delimit string templates */
      pattern: /\b(?:->?|=>|~)\b|[|{}]/,
      alias: "punctuation"
    },
    "punctuation": /[().,:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/abnf.js
  var coreRules = "(?:ALPHA|BIT|CR|CRLF|CTL|DIGIT|DQUOTE|HEXDIG|HTAB|LF|L?WSP|OCTET|SP|V?CHAR)";
  languages.abnf = {
    "comment": /;.*/,
    "string": {
      pattern: /(?:%[is])?"[^\n"]*"/g,
      greedy: true,
      inside: {
        "punctuation": /^%./
      }
    },
    "range": {
      pattern: /%(?:b[01]+-[01]+|d\d+-\d+|x[a-f\d]+-[a-f\d]+)/i,
      alias: "number"
    },
    "terminal": {
      pattern: /%(?:b[01]+(?:\.[01]+)*|d\d+(?:\.\d+)*|x[a-f\d]+(?:\.[a-f\d]+)*)/i,
      alias: "number"
    },
    "repetition": {
      pattern: /(^|[^\w-])(?:\d*\*\d*|\d+)/,
      lookbehind: true,
      alias: "operator"
    },
    "definition": {
      pattern: /(^[ 	]*)(?:[a-z][\w-]*|<[^<>\n]*>)(?=\s*=)/m,
      lookbehind: true,
      alias: "keyword",
      inside: {
        "punctuation": /<|>/
      }
    },
    "core-rule": {
      pattern: RegExp(`(?:(^|[^<\\w-])${coreRules}|<${coreRules}>)(?![\\w-])`, "i"),
      lookbehind: true,
      alias: "rule constant",
      inside: {
        "punctuation": /<|>/
      }
    },
    "rule": {
      pattern: /(^|[^<\w-])[a-z][\w-]*|<[^<>\n]*>/i,
      lookbehind: true,
      inside: {
        "punctuation": /<|>/
      }
    },
    "operator": /=\/?|\//,
    "punctuation": /[()[\]]/
  };

  // node_modules/prism-code-editor/dist/patterns-Cp3h1ylA.js
  var clikeComment = () => ({
    pattern: /\/\/.*|\/\*[^]*?(?:\*\/|$)/g,
    greedy: true
  });
  var clikeString = () => ({
    pattern: /(["'])(?:\\[^]|(?!\1)[^\\\n])*\1/g,
    greedy: true
  });
  var clikeNumber = /\b0x[a-f\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i;
  var clikePunctuation = /[()[\]{}.,:;]/;
  var boolean = /\b(?:false|true)\b/;

  // node_modules/prism-code-editor/dist/prism/languages/javascript.js
  var js = {};
  languages.js = languages.javascript = Object.assign(js, {
    "doc-comment": {
      pattern: /\/\*\*(?!\/)[^]*?(?:\*\/|$)/g,
      greedy: true,
      alias: "comment",
      inside: "jsdoc"
    },
    "comment": clikeComment(),
    "hashbang": {
      pattern: /^#!.*/g,
      greedy: true,
      alias: "comment"
    },
    "template-string": {
      pattern: /`(?:\\[^]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}|(?!\$\{)[^\\`])*`/g,
      greedy: true,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            [rest]: js
          }
        },
        "string": /[^]+/
      }
    },
    "string-property": {
      pattern: /((?:^|[,{])[ 	]*)(["'])(?:\\[^]|(?!\2)[^\\\n])*\2(?=\s*:)/mg,
      lookbehind: true,
      greedy: true,
      alias: "property"
    },
    "string": clikeString(),
    "regex": {
      pattern: /((?:^|[^$\w\xa0-\uffff"'`.)\]\s]|\b(?:return|yield))\s*)\/(?:(?:\[(?:\\.|[^\\\n\]])*\]|\\.|[^\\\n/[])+\/[dgimyus]{0,7}|(?:\[(?:\\.|[^\\\n[\]]|\[(?:\\.|[^\\\n[\]]|\[(?:\\.|[^\\\n[\]])*\])*\])*\]|\\.|[^\\\n/[])+\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?!\/\*|[^()[\]{}.,:;?`\n%&|^!=<>/*+-]))/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "regex-flags": /\w+$/,
        "regex-delimiter": /^\/|\/$/,
        "regex-source": {
          pattern: /.+/,
          alias: "language-regex",
          inside: "regex"
        }
      }
    },
    "class-name": [
      {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new)\s+)(?!\d)(?:(?!\s)[$\w\xa0-\uffff.])+/,
        lookbehind: true,
        inside: {
          "punctuation": /\./
        }
      },
      {
        pattern: /(^|[^$\w\xa0-\uffff]|\s)(?![a-z\d])(?:(?!\s)[$\w\xa0-\uffff])+(?=\.(?:constructor|prototype)\b)/,
        lookbehind: true
      }
    ],
    // This must be declared before keyword because we use "function" inside the look-forward
    "function-variable": {
      pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^)]*\))*\)|(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)\s*=>))/,
      alias: "function",
      inside: {
        "maybe-class-name": /^[A-Z].*/
      }
    },
    "parameter": [
      /(function(?:\s+(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      /(^|[^$\w\xa0-\uffff]|\s)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*=>)/,
      /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|continue|default|do|else|finally|for|if|return|switch|throw|try|while|yield|class|const|debugger|delete|enum|extends|function|[gs]et|export|from|import|implements|in|instanceof|interface|let|new|null|of|package|private|protected|public|static|super|this|typeof|undefined|var|void|with)(?![$\w\xa0-\uffff]))(?:(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/
    ].map((pattern) => ({
      pattern,
      lookbehind: true,
      inside: js
    })),
    "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    "keyword": [
      {
        pattern: /(^|[^.]|\.{3}\s*)\b(?:as|assert(?=\s*\{)|export|from(?!\s*[^\s"'])|import)\b/,
        alias: "module",
        lookbehind: true
      },
      {
        pattern: /(^|[^.]|\.{3}\s*)\b(?:await|break|case|catch|continue|default|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,
        alias: "control-flow",
        lookbehind: true
      },
      {
        pattern: /(^|[^.]|\.{3}\s*)\b(?:async(?!\s*[^\s($\w\xa0-\uffff])|class|const|debugger|delete|enum|extends|function|[gs]et(?!\s*[^\s#[$\w\xa0-\uffff])|implements|in|instanceof|interface|let|new|null|of|package|private|protected|public|static|super|this|typeof|undefined|var|void|with)\b/,
        lookbehind: true
      }
    ],
    "boolean": boolean,
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    "function": {
      pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      inside: {
        "maybe-class-name": /^[A-Z].*/
      }
    },
    "number": {
      pattern: /(^|[^$\w])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][a-fA-F\d]+(?:_[a-fA-F\d]+)*n?|\d+(?:_\d+)*n|(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?)(?![$\w])/,
      lookbehind: true
    },
    "literal-property": {
      pattern: /([\n,{][ 	]*)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*:)/,
      lookbehind: true,
      alias: "property"
    },
    "operator": [
      {
        pattern: /=>/,
        alias: "arrow"
      },
      /--|\+\+|(?:\*\*|&&|\|\||[!=]=|>>>?|<<|[%&|^!=<>/*+-]|\?\?)=?|\.{3}|\?(?!\.)|~|:/
    ],
    "property-access": {
      pattern: /(\.\s*)#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+/,
      lookbehind: true,
      inside: {
        "maybe-class-name": /^[A-Z].*/
      }
    },
    "maybe-class-name": {
      pattern: /(^|[^$\w\xa0-\uffff])[A-Z][$\w\xa0-\uffff]+/,
      lookbehind: true
    },
    "punctuation": /\?\.|[()[\]{}.,:;]/
  });

  // node_modules/prism-code-editor/dist/templating-DcpUBghR.js
  var embeddedIn = (hostGrammar) => (code, templateGrammar) => {
    var host = resolve(hostGrammar);
    var hostCode = "";
    var tokenStack = [];
    var stackLength = 0;
    var templateTokens = withoutTokenizer(code, templateGrammar);
    var i = 0, l = templateTokens.length, position = 0;
    while (i < l) {
      var token = templateTokens[i++];
      var length = token.length;
      var type5 = token.type;
      if (type5 && type5.slice(0, 6) != "ignore") {
        tokenStack[stackLength++] = [position, token];
        hostCode += " ".repeat(length);
      } else {
        hostCode += code.slice(position, position + length);
      }
      position += length;
    }
    var j = 0;
    var position = 0;
    var walkTokens2 = (tokens2) => {
      for (var i2 = 0; j < stackLength && i2 < tokens2.length; i2++) {
        var token2 = tokens2[i2];
        var content2 = token2.content;
        if (Array.isArray(content2)) {
          walkTokens2(content2);
        } else {
          var length2 = token2.length;
          var replacement = [];
          var offset, t, k = 0;
          var pos = position;
          while ([offset, t] = tokenStack[j], offset >= position && offset < position + length2) {
            if (pos < offset) replacement[k++] = hostCode.slice(pos, offset);
            pos = offset + t.length;
            replacement[k++] = t;
            if (++j == stackLength) break;
          }
          position += length2;
          if (k) {
            if (pos < position) replacement[k++] = hostCode.slice(pos, position);
            if (content2) {
              token2.content = replacement;
            } else {
              tokens2.splice(i2, 1, ...replacement);
              i2 += k - 1;
            }
          }
        }
      }
    };
    var tokens = host ? tokenizeText(hostCode, host) : [hostCode];
    walkTokens2(tokens);
    return tokens;
  };

  // node_modules/prism-code-editor/dist/prism/languages/js-templates.js
  var js2 = languages.js;
  var templateString = js2["template-string"];
  var templateLiteralPattern = templateString.pattern.source;
  var interpolationPattern = templateString.inside.interpolation.pattern;
  var createTemplate = (language2, tag9) => ({
    pattern: RegExp("(\\b(?:" + tag9 + ")\\s*)" + templateLiteralPattern, "g"),
    lookbehind: true,
    greedy: true,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      ["language-" + language2]: {
        pattern: /[^]+/,
        inside: {
          "interpolation": {
            pattern: interpolationPattern,
            lookbehind: true,
            alias: "language-javascript",
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              [rest]: "js"
            }
          },
          [tokenize]: embeddedIn(language2)
        }
      }
    }
  });
  js2["template-string"] = [
    // styled-jsx:
    //   css`a { color: #25F; }`
    // styled-components:
    //   styled.h1`color: red;`
    createTemplate("css", "styled(?:\\([^)]*\\))?(?:\\s*\\.\\s*\\w+(?:\\([^)]*\\))*)*|css(?:\\s*\\.\\s*(?:global|resolve))?|createGlobalStyle|keyframes"),
    // html`<p></p>`
    // div.innerHTML = `<p></p>`
    createTemplate("html", "html|\\.\\s*(?:inner|outer)HTML\\s*\\+?="),
    // svg`<path fill="#fff" d="M55.37 ..."/>`
    createTemplate("svg", "svg"),
    // md`# h1`, markdown`## h2`
    createTemplate("markdown", "markdown|md"),
    // gql`...`, graphql`...`, graphql.experimental`...`
    createTemplate("graphql", "gql|graphql(?:\\s*\\.\\s*experimental)?"),
    // sql`...`
    createTemplate("sql", "sql"),
    // vanilla template string
    templateString
  ];

  // node_modules/prism-code-editor/dist/language-gdIi4UL0.js
  var _clone = (o, visited) => {
    if (visited.has(o)) return visited.get(o);
    var copy = o, t = toString.call(o).slice(8, -1);
    if (t == "Object") {
      visited.set(o, copy = {});
      for (var key in o) {
        copy[key] = _clone(o[key], visited);
      }
      if (o[rest]) copy[rest] = _clone(o[rest], visited);
      if (o[tokenize]) copy[tokenize] = o[tokenize];
    } else if (t == "Array") {
      visited.set(o, copy = []);
      for (var i = 0, l = o.length; i < l; i++) {
        copy[i] = _clone(o[i], visited);
      }
    }
    return copy;
  };
  var clone2 = (o) => _clone(o, /* @__PURE__ */ new Map());
  var extend = (id2, redef) => Object.assign(clone2(languages[id2]), redef);
  var insertBefore = (grammar, before, insert) => {
    var temp = {};
    for (var token in grammar) {
      temp[token] = grammar[token];
      delete grammar[token];
    }
    for (var token in temp) {
      if (token == before) Object.assign(grammar, insert);
      if (!insert.hasOwnProperty(token)) {
        grammar[token] = temp[token];
      }
    }
  };
  var toString = {}.toString;

  // node_modules/prism-code-editor/dist/xml-shared-D4vCmq1i.js
  var entity = [
    {
      pattern: /&[a-z\d]{1,8};/i,
      alias: "named-entity"
    },
    /&#x?[a-f\d]{1,8};/i
  ];
  var xmlComment = {
    pattern: /<!--(?:(?!<!--)[^])*?-->/g,
    greedy: true
  };
  var tag = {
    pattern: /<\/?(?!\d)[^\s/=>$<%]+(?:\s(?:\s*[^\s/=>]+(?:\s*=\s*(?!\s)(?:"[^"]*"|'[^']*'|[^\s"'=>]+(?=[\s>]))?|(?=[\s/>])))+)?\s*\/?>/g,
    greedy: true,
    inside: {
      "punctuation": /^<\/?|\/?>$/,
      "tag": {
        pattern: /^\S+/,
        inside: {
          "namespace": /^[^:]+:/
        }
      },
      "attr-value": [{
        pattern: /(=\s*)(?:"[^"]*"|'[^']*'|[^\s>]+)/g,
        lookbehind: true,
        greedy: true,
        inside: {
          "punctuation": /^["']|["']$/,
          entity
        }
      }],
      "attr-equals": /=/,
      "attr-name": {
        pattern: /\S+/,
        inside: {
          "namespace": /^[^:]+:/
        }
      }
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/actionscript.js
  var actionscript = languages.actionscript = extend("javascript", {
    "keyword": /\b(?:as|break|case|catch|class|const|default|delete|do|dynamic|each|else|extends|final|finally|for|function|[gs]et|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|null|override|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|use|var|void|while|with)\b/,
    "operator": /--|\+\+|[!=]==|(?:&&|\|\||<<|>>>?|[%&|^!=<>/*+-])=?|[~?@]/
  });
  actionscript["class-name"].alias = "function";
  delete actionscript["parameter"];
  delete actionscript["literal-property"];
  insertBefore(actionscript, "regex", {
    "tag": tag
  });

  // node_modules/prism-code-editor/dist/prism/languages/ada.js
  languages.ada = {
    "comment": /--.*/,
    "string": /"(?:""|[^"\f\n])*"/,
    "number": /\b\d(?:_?\d)*(?:#[a-f\d](?:_?[a-f\d])*(?:\.[a-f\d](?:_?[a-f\d])*)?#|(?:\.\d(?:_?\d)*)?)(?:e[+-]?\d(?:_?\d)*)?\b/i,
    "attribute": {
      pattern: /\b'\w+/,
      alias: "attr-name"
    },
    "keyword": /\b(?:abort|abs|abstract|accept|access|aliased|all|[ae]nd|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|elsif|entry|exception|exit|for|function|generic|goto|i[fns]|interface|limited|loop|mod|new|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|return|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|[tw]hen|type|until|use|while|with|x?or)\b/i,
    "boolean": /\b(?:false|true)\b/i,
    "operator": /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
    "punctuation": /\.\.?|[(),:;]/,
    "char": /'.'/,
    "variable": /\b[a-z]\w*/i
  };

  // node_modules/prism-code-editor/dist/prism/languages/agda.js
  languages.agda = {
    "comment": /\{-[^]*?(?:-\}|$)|--.*/,
    "string": {
      pattern: /"(?:\\[^]|[^\\\n"])*"/g,
      greedy: true
    },
    "punctuation": /[(){}⦃⦄.;@]/,
    "class-name": {
      pattern: /((?:data|record) +)\S+/,
      lookbehind: true
    },
    "function": {
      pattern: /(^[ 	]*)(?!\s)[^\n:]+(?=:)/m,
      lookbehind: true
    },
    "operator": {
      pattern: /(^|\s)(?:[=|:∀→λ\\?_]|->)(?!\S)/,
      lookbehind: true
    },
    "keyword": /\b(?:Set|abstract|constructor|data|eta-equality|field|forall|hiding|import|in|inductive|infix[lr]?|instance|let|macro|module|mutual|no-eta-equality|open|overlap|pattern|postulate|primitive|private|public|quote|quoteContext|quoteGoal|quoteTerm|record|renaming|rewrite|syntax|tactic|unquote|unquoteDecl|unquoteDef|using|variable|where|with)\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/al.js
  languages.al = {
    "comment": clikeComment(),
    "string": {
      pattern: /'(?:''|[^\n'])*'(?!')|"(?:""|[^\n"])*"(?!")/g,
      greedy: true
    },
    "function": {
      pattern: /(\b(?:event|procedure|trigger)\s+|(?:^|[^.])\.\s*)[a-z_]\w*(?=\s*\()/i,
      lookbehind: true
    },
    "keyword": /\b(?:actions?|addafter|addbefore|addfirst|addlast|area|array|assembly|asserterror|begin|break|case|chartpart|codeunit|column|controladdin|cuegroup|customizes|dataitem|dataset|do|dotnet|downto|elements|else|end|enum|enumextension|event|exit|extends|fieldattribute|fieldelement|fieldgroups?|fields?|filter|fixed|for|foreach|function|grid|group|if|implements|in|indataset|interface|internal|keys?|labels?|layout|local|modify|moveafter|movebefore|movefirst|movelast|of|page|pagecustomization|pageextension|part|procedure|profile|program|protected|query|repeat|repeater|report|requestpage|runonclient|schema|securityfiltering|separator|suppressdispose|systempart|table|tableelement|tableextension|temporary|textattribute|textelement|then|to|trigger|type|until|usercontrol|value|var|while|with|withevents|xmlport)\b/i,
    "number": /\b(?:0x[a-f\d]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(?:f|ll?|u(?:ll?)?)?\b/i,
    "boolean": /\b(?:false|true)\b/i,
    "variable": /\b(?:Curr(?:FieldNo|Page|Report)|x?Rec|RequestOptionsPage)\b/,
    "class-name": /\b(?:automation|biginteger|bigtext|blob|boolean|byte|char|clienttype|code|completiontriggererrorlevel|connectiontype|database|dataclassification|datascope|date|dateformula|datetime|decimal|defaultlayout|dialog|dictionary|dotnetassembly|dotnettypedeclaration|duration|errorinfo|errortype|executioncontext|executionmode|fieldclass|fieldref|fieldtype|file|filterpagebuilder|guid|httpclient|httpcontent|httpheaders|httprequestmessage|httpresponsemessage|instream|integer|joker|jsonarray|jsonobject|jsontoken|jsonvalue|keyref|list|moduledependencyinfo|moduleinfo|none|notification|notificationscope|objecttype|option|outstream|pageresult|record|recordid|recordref|reportformat|securityfilter|sessionsettings|tableconnectiontype|tablefilter|testaction|testfield|testfilterfield|testpage|testpermissions|testrequestpage|text|textbuilder|textconst|textencoding|time|transactionmodel|transactiontype|variant|verbosity|version|views?|webserviceactioncontext|webserviceactionresultcode|xmlattribute|xmlattributecollection|xmlcdata|xmlcomment|xmldeclaration|xmldocument|xmldocumenttype|xmlelement|xmlnamespacemanager|xmlnametable|xmlnode|xmlnodelist|xmlprocessinginstruction|xmlreadoptions|xmltext|xmlwriteoptions)\b/i,
    "operator": /\.\.|:[=:]|<>|[<>/*+-]=?|=|\b(?:and|div|mod|not|x?or)\b/i,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/antlr4.js
  languages.g4 = languages.antlr4 = {
    "comment": clikeComment(),
    "string": {
      pattern: /'(?:\\.|[^\\\n'])*'/g,
      greedy: true
    },
    "character-class": {
      pattern: /\[(?:\\.|[^\\\]\n])*\]/g,
      greedy: true,
      alias: "regex",
      inside: {
        "range": {
          pattern: /([^[]|(?:^|[^\\])(?:\\\\)*\\\[)-(?!\])/,
          lookbehind: true,
          alias: "punctuation"
        },
        "escape": /\\(?:u(?:[a-fA-F\d]{4}|\{[a-fA-F\d]+\})|[pP]\{[=\w-]+\}|[^\nupP])/,
        "punctuation": /[[\]]/
      }
    },
    "action": {
      pattern: /\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\})*\}/g,
      greedy: true,
      inside: {
        "content": /(?!^)[^]+(?=.)/,
        "punctuation": /./
      }
    },
    "command": {
      pattern: /(->\s*(?!\s))(?:\s*(?:,\s*)?\b[a-z]\w*(?:\s*\([^()\n]*\))?)+(?=\s*;)/i,
      lookbehind: true,
      inside: {
        "function": /\b\w+(?!\s*[^\s,(])/,
        "punctuation": /[(),]/
      }
    },
    "annotation": {
      pattern: /@\w+(?:::\w+)*/,
      alias: "keyword"
    },
    "label": {
      pattern: /#[ 	]*\w+/,
      alias: "punctuation"
    },
    "keyword": /\b(?:catch|channels|finally|fragment|grammar|import|lexer|locals|mode|options|parser|returns|throws|tokens)\b/,
    "definition": [
      {
        pattern: /\b[a-z]\w*(?=\s*:)/,
        alias: "rule class-name"
      },
      {
        pattern: /\b[A-Z]\w*(?=\s*:)/,
        alias: "token constant"
      }
    ],
    "constant": /\b[A-Z][A-Z_]*\b/,
    "operator": /\.\.|->|[|~]|[*+?]\??/,
    "punctuation": /[():;=]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/apacheconf.js
  var variable = /[$%]\{?(?:\w\.?[:+-]?)+\}?/;
  languages.apacheconf = {
    "comment": /#.*/,
    "directive-inline": {
      pattern: /(^[ 	]*)\b(?:acceptfilter|acceptpathinfo|accessfilename|action|add(?:alt|altbyencoding|altbytype|charset|defaultcharset|description|encoding|handler|icon|iconbyencoding|iconbytype|inputfilter|language|moduleinfo|outputfilter|outputfilterbytype|type)|alias|aliasmatch|allow(?:connect|encodedslashes|methods|override|overridelist)?|anonymous(?:_logemail|_mustgiveemail|_nouserid|_verifyemail)?|asyncrequestworkerfactor|auth(?:basicauthoritative|basicfake|basicprovider|basicusedigestalgorithm|dbduserpwquery|dbduserrealmquery|dbmgroupfile|dbmuserfile|digest(?:algorithm|domain|noncelifetime|provider|qop|shmemsize)|form(?:authoritative|body|disablenostore|fakebasicauth|location|loginrequiredlocation|loginsuccesslocation|logoutlocation|method|mimetype|password|provider|sitepassphrase|size|username)|groupfile|ldap(?:authorizeprefix|bindauthoritative|binddn|bindpassword|charsetconfig|compareasuser|comparednonserver|dereferencealiases|groupattribute|groupattributeisdn|initialbindasuser|initialbindpattern|maxsubgroupdepth|remoteuserattribute|remoteuserisdn|searchasuser|subgroupattribute|subgroupclass|url)|merging|name|ncache(?:context|enable|providefor|socache|timeout)|nzfcgicheckauthnprovider|nzfcgidefineprovider|type|userfile|zdbdlogintoreferer|zdbdquery|zdbdredirectquery|z?dbmtype|zsendforbiddenonfailure)|balancergrowth|balancerinherit|balancermember|balancerpersist|browsermatch|browsermatchnocase|bufferedlogs|buffersize|cache(?:defaultexpire|detailheader|dirlength|dirlevels|disable|enable|file|header|ignorecachecontrol|ignoreheaders|ignorenolastmod|ignorequerystring|ignoreurlsessionidentifiers|keybaseurl|lastmodifiedfactor|lock|lockmaxage|lockpath|maxexpire|maxfilesize|minexpire|minfilesize|negotiateddocs|quickhandler|readsize|readtime|root|socache(?:maxsize|maxtime|mintime|readsize|readtime)?|staleonerror|storeexpired|storenostore|storeprivate)|cgidscripttimeout|cgimapextension|charsetdefault|charsetoptions|charsetsourceenc|checkcaseonly|checkspelling|chrootdir|contentdigest|cookiedomain|cookieexpires|cookiename|cookiestyle|cookietracking|coredumpdirectory|customlog|dav|davdepthinfinity|davgenericlockdb|davlockdb|davmintimeout|dbdexptime|dbdinitsql|dbdkeep|dbdmax|dbdmin|dbdparams|dbdpersist|dbdpreparesql|dbdriver|defaulticon|defaultlanguage|defaultruntimedir|defaulttype|define|deflate(?:buffersize|compressionlevel|filternote|inflatelimitrequestbody|inflateratio(?:burst|limit)|memlevel|windowsize)|deny|directorycheckhandler|directoryindex|directoryindexredirect|directoryslash|documentroot|dtraceprivileges|dumpioinput|dumpiooutput|enableexceptionhook|enablemmap|enablesendfile|error|errordocument|errorlog|errorlogformat|example|expiresactive|expiresbytype|expiresdefault|extendedstatus|extfilterdefine|extfilteroptions|fallbackresource|fileetag|filterchain|filterdeclare|filterprotocol|filterprovider|filtertrace|forcelanguagepriority|forcetype|forensiclog|gprofdir|gracefulshutdowntimeout|group|header|headername|heartbeat(?:address|listen|maxservers|storage)|hostnamelookups|identitycheck|identitychecktimeout|imapbase|imapdefault|imapmenu|include|includeoptional|index(?:headinsert|ignore|ignorereset|options|orderdefault|stylesheet)|inputsed|isapi(?:appendlogtoerrors|appendlogtoquery|cachefile|fakeasync|lognotsupported|readaheadbuffer)|keepalive|keepalivetimeout|keptbodysize|languagepriority|ldap(?:cacheentries|cachettl|connectionpoolttl|connectiontimeout|librarydebug|opcacheentries|opcachettl|referralhoplimit|referrals|retries|retrydelay|sharedcachefile|sharedcachesize|timeout|trustedclientcert|trustedglobalcert|trustedmode|verifyservercert)|limit(?:internalrecursion|request(?:body|fields|fieldsize|line)|xmlrequestbody)|listen|listenbacklog|loadfile|loadmodule|logformat|loglevel|logmessage|luaauthzprovider|luacodecache|lua(?:hook(?:accesschecker|authchecker|checkuserid|fixups|insertfilter|log|maptostorage|translatename|typechecker)|inherit|inputfilter|maphandler|outputfilter|packagecpath|packagepath|quickhandler|root|scope)|max(?:connectionsperchild|keepaliverequests|memfree|rangeoverlaps|rangereversals|ranges|requestworkers|spareservers|sparethreads|threads)|mergetrailers|metadir|metafiles|metasuffix|mimemagicfile|minspareservers|minsparethreads|mmapfile|modemstandard|modmimeusepathinfo|multiviewsmatch|mutex|namevirtualhost|noproxy|nwssltrustedcerts|nwsslupgradeable|options|order|outputsed|passenv|pidfile|privilegesmode|protocol|protocolecho|proxy(?:addheaders|badheader|block|domain|erroroverride|expressdbmfile|expressdbmtype|expressenable|ftpdircharset|ftpescapewildcards|ftplistonwildcard|html(?:bufsize|charsetout|doctype|enable|events|extended|fixups|interp|links|meta|stripcomments|urlmap)|iobuffersize|maxforwards|pass(?:inherit|interpolateenv|match|reverse|reversecookiedomain|reversecookiepath)?|preservehost|receivebuffersize|remote|remotematch|requests|scgiinternalredirect|scgisendfile|set|sourceaddress|status|timeout|via)|readmename|receivebuffersize|redirect|redirectmatch|redirectpermanent|redirecttemp|reflectorheader|remoteip(?:header|internalproxy|internalproxylist|proxiesheader|trustedproxy|trustedproxylist)|remove(?:charset|encoding|handler|inputfilter|language|outputfilter|type)|requestheader|requestreadtimeout|require|rewrite(?:base|cond|engine|map|options|rule)|rlimitcpu|rlimitmem|rlimitnproc|satisfy|scoreboardfile|script(?:alias|aliasmatch|interpretersource|log|logbuffer|loglength|sock)?|securelisten|seerequesttail|sendbuffersize|server(?:admin|alias|limit|name|path|root|signature|tokens)|session(?:cookie(?:name2?|remove)|crypto(?:cipher|driver|passphrase|passphrasefile)|dbd(?:cookiename|cookiename2|cookieremove|deletelabel|insertlabel|peruser|selectlabel|updatelabel)|env|exclude|header|include|maxage)?|setenv|setenvif|setenvifexpr|setenvifnocase|sethandler|setinputfilter|setoutputfilter|ssiendtag|ssierrormsg|ssietag|ssilastmodified|ssilegacyexprparser|ssistarttag|ssitimeformat|ssiundefinedecho|ssl(?:cacertificatefile|cacertificatepath|cadnrequestfile|cadnrequestpath|carevocationcheck|carevocationfile|carevocationpath|certificatechainfile|certificatefile|certificatekeyfile|ciphersuite|compression|cryptodevice|engine|fips|honorcipherorder|insecurerenegotiation|ocsp(?:defaultresponder|enable|overrideresponder|respondertimeout|responsemaxage|responsetimeskew|userequestnonce)|opensslconfcmd|options|passphrasedialog|protocol|proxy(?:cacertificatefile|cacertificatepath|carevocation(?:check|file|path)|checkpeer(?:cn|expire|name)|ciphersuite|engine|machinecertificate(?:chainfile|file|path)|protocol|verify|verifydepth)|randomseed|renegbuffersize|require|requiressl|session(?:cache|cachetimeout|ticketkeyfile|tickets)|srpunknownuserseed|srpverifierfile|stapling(?:cache|errorcachetimeout|faketrylater|forceurl|respondertimeout|responsemaxage|responsetimeskew|returnrespondererrors|standardcachetimeout)|strictsnivhostcheck|username|usestapling|verifyclient|verifydepth)|startservers|startthreads|substitute|suexec|suexecusergroup|threadlimit|threadsperchild|threadstacksize|timeout|traceenable|transferlog|typesconfig|undefine|undefmacro|unsetenv|usecanonicalname|usecanonicalphysicalport|user?|userdir|vhostcgimode|vhostcgiprivs|vhostgroup|vhostprivs|vhostsecure|vhostuser|virtual(?:documentroot|scriptalias)(?:ip)?|watchdoginterval|xbithack|xml2encalias|xml2encdefault|xml2startparse)\b/im,
      lookbehind: true,
      alias: "property"
    },
    "directive-block": {
      pattern: /<\/?(?:auth[nz]provideralias|(?:directory|files|location)(?:match)?|else|elseif|if|ifdefine|ifmodule|ifversion|limit|limitexcept||macro|proxy|require(?:all|any|none)|virtualhost)\b.*>/i,
      inside: {
        "punctuation": /^<\/?|>$/,
        "directive-block": {
          pattern: /^\w+/,
          alias: "tag"
        },
        "directive-block-parameter": {
          pattern: /.+/,
          inside: {
            "punctuation": /:/,
            "string": {
              pattern: /(["']).*\1/,
              inside: {
                "variable": variable
              }
            }
          },
          alias: "attr-value"
        }
      },
      alias: "tag"
    },
    "directive-flags": {
      pattern: /\[(?:[\w=],?)+\]/,
      alias: "keyword"
    },
    "string": {
      pattern: /(["']).*\1/,
      inside: {
        "variable": variable
      }
    },
    "variable": variable,
    "regex": /\^?.*\$|\^.*\$?/
  };

  // node_modules/prism-code-editor/dist/clike-class-B8-ApZOm.js
  var clikeClass = () => ({
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\\\w.]+/i,
    lookbehind: true,
    inside: {
      "punctuation": /[\\.]/
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/clike.js
  languages.clike = {
    "comment": clikeComment(),
    "string": clikeString(),
    "class-name": clikeClass(),
    "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "number": clikeNumber,
    "operator": /[!=]==|[!=<>]=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/sql.js
  languages.sql = {
    "comment": /\/\*[^]*?\*\/|(?:--|\/\/|#).*/,
    "variable": [
      {
        pattern: /@(["'`])(?:\\[^]|(?!\1)[^\\])+\1/g,
        greedy: true
      },
      /@[\w.$]+/
    ],
    "string": {
      pattern: /(^|[^@\\])(["'])(?:\\[^]|(?!\2)[^\\]|\2\2)*\2/g,
      lookbehind: true,
      greedy: true
    },
    "identifier": {
      pattern: /(^|[^@\\])`(?:\\[^]|[^\\`]|``)*`/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "punctuation": /^`|`$/
      }
    },
    "function": /\b(?:avg|count|first|format|last|[lu]case|len|max|mi[dn]|mod|now|round|sum)(?=\s*\()/i,
    // Should we highlight user defined functions too?
    "keyword": /\b(?:action|add|after|algorithm|alter|analyze|any|apply|asc?|authorization|auto_increment|backup|bdb|begin|berkeleydb|bigint|binary|bit|blob|bool|boolean|break|browse|[br]tree|bulk|by|c?all|cascaded?|case|chain|character|charset|check(?:point)?|close|clustered|coalesce|collate|columns?|comment|commit(?:ted)?|compute|connect|consistent|constraint|contains(?:table)?|continue|convert|create|cross|current(?:_date|_time|_timestamp|_user)?|cursor|cycle|data(?:bases?)?|date(?:time)?|day|dbcc|deallocate|dec|decimal|declare|default|definer|delayed|delete|delimiters?|deny|desc|describe|deterministic|disable|discard|disk|distinct|distinctrow|distributed|do|double|drop|dummy|dump(?:file)?|duplicate|else(?:if)?|enable|enclosed|end|engine|enum|errlvl|errors|escaped?|except|exec(?:ute)?|exists|exit|explain|extended|fetch|fields|file|fillfactor|first|fixed|float|following|for each row|for|force|foreign|freetexttable|freetext|from|full|function|geometry(?:collection)?|global|goto|grant|group|handler|hash|having|holdlock|hour|identity(?:col|_insert)?|if|ignore|import|index|infile|inner|innodb|inout|insert|integer|intersect|interval|into?|invoker|isolation|iterate|join|keys?|kill|language|last|leave|left|level|limit|lineno|lines|linestring|load|local|lock|long(?:blob|text)|loop|matched|match|(?:medium|tiny)(?:blob|int|text)|merge|middleint|minute|mode|modifies|modify|month|multi(?:linestring|point|polygon)|national|natural|n?char|next|no|nonclustered|nullif|numeric|off?|offsets?|on|open(?:datasource|query|rowset)?|optimize|option(?:ally)?|order|out(?:er|file)?|over|partial|partition|percent|pivot|plan|point|polygon|preceding|precision|prepare|prev|primary|print|privileges|proc(?:edure)?|public|purge|quick|raiserror|reads?|real|reconfigure|references|release|rename|repeat(?:able)?|replace|replication|require|resignal|restore|restrict|returning|returns?|revoke|right|rollback|routine|row(?:count|guidcol|s)?|rule|savepoint|save|schema|second|select|serializable|serial|session_user|session|setuser|set|share|show|shutdown|simple|smallint|snapshot|some|soname|sql|start(?:ing)?|statistics|status|striped|system_user|tables?|tablespace|temp(?:orary|table)?|terminated|textsize|text|[tw]hen|timestamp|time|top?|transactions?|tran|trigger|truncate|tsequal|types?|unbounded|uncommitted|undefined|union|unique|unlock|unpivot|unsigned|updatetext|update|usage|user?|using|values?|var(?:binary|char|character|ying)|view|waitfor|warnings|where|while|with(?: rollup|in)?|work|writetext|write|year)\b/i,
    "boolean": /\b(?:false|true|null)\b/i,
    "number": /\b0x[a-f\d]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    "operator": /[=%~^/*+-]|&&?|\|\|?|!=?|<<|<=?>?|>[>=]?|\b(?:and|between|div|[ir]?like|in|is|not|x?or|regexp|sounds like)\b/i,
    "punctuation": /[()[\].,;`]/
  };

  // node_modules/prism-code-editor/dist/shared-Sq5P6lf6.js
  var nested = (pattern, depthLog2) => {
    for (var i = 0; i < depthLog2; i++) {
      pattern = pattern.replace(/<self>/g, `(?:${pattern})`);
    }
    return pattern.replace(/<self>/g, "[]");
  };
  var replace = (pattern, replacements2) => pattern.replace(/<(\d+)>/g, (m, index2) => `(?:${replacements2[+index2]})`);
  var re = (pattern, replacements2, flags) => RegExp(replace(pattern, replacements2), flags);

  // node_modules/prism-code-editor/dist/prism/languages/apex.js
  var keywords = /\b(?:(?:after|before)(?=\s+[a-z])|abstract|activate|an[dy]|array|asc?|autonomous|begin|bigdecimal|blob|boolean|break|bulk|by|byte|cas[et]|catch|char|class|collect|commit|const|continue|currency|date|datetime|decimal|default|delete|desc|do|double|else|end|enum|exception|exit|export|extends|final|finally|float|for|from|get(?=\s*[{};])|global|goto|group|having|hint|if|implements|import|inner|insert|instanceof|integer|interface|into?|in|join|like|limit|list|long|loop|map|merge|new|not|nulls?|number|o[fnr]|outer|override|package|parallel|pragma|private|protected|public|retrieve|return|rollback|select|set|short|s?object|sort|static|string|super|switch|synchronized|system|testmethod|[tw]hen|this|throw|time|transaction|transient|trigger|try|undelete|update|upsert|using|virtual|void|webservice|where|while|(?:inherited|with|without)\s+sharing)\b/i;
  var className = replace("\\b(?:(?=[a-z_]\\w*\\s*[<\\[])|(?!<0>))[A-Z_]\\w*(?:\\s*\\.\\s*[A-Z_]\\w*)*\\b(?:\\s*(?:\\[\\s*\\]|<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>))*", [keywords.source]);
  var insertClassName = (pattern) => re(pattern, [className], "i");
  var classNameInside = {
    "keyword": keywords,
    "punctuation": /[()[\]{}.,:;<>]/
  };
  languages.apex = {
    "comment": clikeComment(),
    "string": clikeString(),
    "sql": {
      pattern: /((?:[=,({:]|\breturn)\s*)\[[^[\]]*\]/gi,
      lookbehind: true,
      greedy: true,
      alias: "language-sql",
      inside: "sql"
    },
    "annotation": {
      pattern: /@\w+/,
      alias: "punctuation"
    },
    "class-name": [
      {
        pattern: insertClassName("(\\b(?:class|enum|extends|implements|instanceof|interface|new|trigger\\s+\\w+\\s+on)\\s+)<0>"),
        lookbehind: true,
        inside: classNameInside
      },
      {
        // cast
        pattern: insertClassName("(\\(\\s*)<0>(?=\\s*\\)\\s*[\\w(])"),
        lookbehind: true,
        inside: classNameInside
      },
      {
        // variable/parameter declaration and return types
        pattern: insertClassName("<0>(?=\\s*\\w+\\s*[;=,(){:])"),
        inside: classNameInside
      }
    ],
    "trigger": {
      pattern: /(\btrigger\s+)\w+/i,
      lookbehind: true,
      alias: "class-name"
    },
    "keyword": keywords,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "boolean": /\b(?:false|true)\b/i,
    "number": /(?:\B\.\d+|\b\d+(?:\.\d+|l)?)\b/i,
    "operator": /\?\.?|&&|\|\||--|\+\+|(?:[!=]=|<<|>>>?|[&|^!=<>/*+-])=?|:/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/apl.js
  languages.apl = {
    "comment": /(?:⍝|#[! ]).*/,
    "string": {
      pattern: /'(?:[^\n']|'')*'/g,
      greedy: true
    },
    "number": /¯?(?:\d*\.?\b\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:(?:\d+(?:\.\d+)?|\.\d+)(?:e[+¯]?\d+)?|¯|∞))?/i,
    "statement": /:[A-Z][a-z][a-zA-Z]*\b/,
    "system-function": {
      pattern: /⎕[a-z]+/i,
      alias: "function"
    },
    "constant": /[⍬⌾#⎕⍞]/,
    "function": /[×÷⌈⌊∣|⍳⍸?⍟○⌹≤≥≠≡≢∊⍷∪∩~∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⊆⊇⌷⍋⍒⊤⊥⍕⍎⊣⊢⍁⍂≈⍯↗¤→!=<>*+-]/,
    "monadic-operator": {
      pattern: /[\\/⌿⍀¨⍨⌶&∥]/,
      alias: "operator"
    },
    "dyadic-operator": {
      pattern: /[.⍣⍠⍤∘⌸@⌺⍥]/,
      alias: "operator"
    },
    "assignment": {
      pattern: /←/,
      alias: "keyword"
    },
    "punctuation": /[()[\];◇⋄]/,
    "dfn": {
      pattern: /[{}⍺⍵⍶⍹∇⍫:]/,
      alias: "builtin"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/applescript.js
  languages.applescript = {
    // Allow one level of nesting
    "comment": /#.+|--.+|\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[^])*?\*\)/,
    "string": /"(?:\\.|[^\\\n"])*"/,
    "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e-?\d+)?\b/i,
    "operator": [
      /[&=≠≤≥*/÷^+-]|[<>]=?/,
      /\b(?:(?:begin|end|start)s? with|(?:contains?|(?:does not|doesn't) contain)|(?:is|isn't|is not) (?:contained by|in)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:comes|(?:does not|doesn't) come) (?:after|before)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equal to|equals|is not|isn't)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|as|div|mod|not|or))\b/
    ],
    "keyword": /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|true|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|[io]nto|is|its?|last|local|me|middle|my|ninth|of|on|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|then?|third|through|thru|timeout|times|to|transaction|try|until|where|while|whose|with|without)\b/,
    "class-name": /\b(?:POSIX file|RGB color|alias|application|boolean|class|constant|(?:cubic )?(?:(?:centi)?(?:meters|metres)|feet|inches|yards)|date|degrees (?:Celsius|Fahrenheit|Kelvin)|file|gallons|grams|integer|kilograms|list|liters|litres|number|ounces|pounds|quarts|real|record|reference|script|(?:square )?(?:feet|(?:kilo)?(?:meters|metres)|miles|yards)|text)\b/,
    "punctuation": /[(){},:¬«»《》]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/aql.js
  languages.aql = {
    "comment": clikeComment(),
    "property": {
      pattern: /([{,]\s*)(?:(?!\d)\w+|(["'´`])(?:\\.|(?!\2)[^\\\n])*\2)(?=\s*:)/g,
      lookbehind: true,
      greedy: true
    },
    "string": {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true
    },
    "identifier": {
      pattern: /([´`])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true
    },
    "variable": /@@?\w+/,
    "keyword": [
      {
        pattern: /(\with\s+)count(?=\s+into\b)/i,
        lookbehind: true
      },
      /\b(?:aggregate|all|an[dy]|asc|collect|desc|distinct|filter|f?or|graph|in|inbound|insert|into|k_paths|k_shortest_paths|let|like|limit|none|not|null|outbound|remove|replace|return|shortest_path|sort|update|upsert|window|with)\b/i,
      // pseudo keywords get a lookbehind to avoid false positives
      {
        pattern: /(^|[^\w.[])(?:keep|prune|search|to)\b/i,
        lookbehind: true
      },
      {
        pattern: /(^|[^\w.[])(?:CURRENT|NEW|OLD)\b/,
        lookbehind: true
      },
      /\options(?=\s*\{)/i
    ],
    "function": /\b(?!\d)\w+(?=\s*\()/,
    "boolean": /\b(?:false|true)\b/i,
    "range": {
      pattern: /\.\./,
      alias: "operator"
    },
    "number": [
      /\b0b[01]+/i,
      /\b0x[a-f\d]+/i,
      /(?:\B\.\d+|\b(?:0|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?/i
    ],
    "operator": /\*{2,}|[!=]~|[!=<>]=?|&&|\|\||[*/%+-]/,
    "punctuation": /::|[()[\]{}.,:;?]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/c.js
  var char = {
    // https://en.cppreference.com/w/c/language/character_constant
    pattern: /'(?:\\[^]|[^\\\n']){0,32}'/g,
    greedy: true
  };
  var comment = {
    pattern: /\/\/(?:[^\\\n]|\\\n?)*|\/\*[^]*?(?:\*\/|$)/g,
    greedy: true
  };
  var string = {
    // https://en.cppreference.com/w/c/language/string_literal
    pattern: /"(?:\\[^]|[^\\\n"])*"/g,
    greedy: true
  };
  var macroExpression = {
    pattern: /\S[^]*/
  };
  macroExpression.inside = languages.c = {
    "comment": comment,
    "char": char,
    "macro": {
      // allow for multiline macro definitions
      // spaces after the # character compile fine with gcc
      pattern: /(^[ 	]*)#\s*[a-z](?:[^\\\n/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\[^])*/img,
      lookbehind: true,
      greedy: true,
      alias: "property",
      inside: {
        "string": [
          {
            // highlight the path of the include statement as a string
            pattern: /^(#\s*include\s*)<[^>]+>/,
            lookbehind: true
          },
          string
        ],
        "char": char,
        "comment": comment,
        "macro-name": [
          {
            pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
            lookbehind: true
          },
          {
            pattern: /(^#\s*define\s+)\w+/i,
            lookbehind: true,
            alias: "function"
          }
        ],
        // highlight macro directives as keywords
        "directive": {
          pattern: /^(#\s*)[a-z]+/,
          lookbehind: true,
          alias: "keyword"
        },
        "directive-hash": /^#/,
        "punctuation": /##|\\(?=\n)/,
        "expression": macroExpression
      }
    },
    "string": string,
    "class-name": {
      pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([^]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
      lookbehind: true
    },
    "keyword": /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
    // highlight predefined macros as constants
    "constant": /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "number": /(?:\b0x(?:[a-f\d]+(?:\.[a-f\d]*)?|\.[a-f\d]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    "operator": /->|([&|:+-])\1|[?:~]|>>=?|<<=?|[%&|^!=<>/*+-]=?/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/cpp.js
  var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
  var cpp = languages.cpp = extend("c", {
    "class-name": [
      {
        pattern: RegExp(`(\\b(?:class|concept|enum|struct|typename)\\s+)(?!${keyword.source})\\w+`),
        lookbehind: true
      },
      // This is intended to capture the class name of method implementations like:
      //   void foo::bar() const {}
      // However! The `foo` in the above example could also be a namespace, so we only capture the class name if
      // it starts with an uppercase letter. This approximation should give decent results.
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      // This will capture the class name before destructors like:
      //   Foo::~Foo() {}
      /\b[a-z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      // This also intends to capture the class name of method implementations but here the class has template
      // parameters, so it can't be a namespace (until C++ adds generic namespaces).
      /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
    ],
    "keyword": keyword,
    "number": {
      pattern: /(?:\b0b[01']+|\b0x(?:[a-f\d']+(?:\.[a-f\d']*)?|\.[a-f\d']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/gi,
      greedy: true
    },
    "operator": /->|--|\+\+|&&|\|\||[?:~]|<=>|>>=?|<<=?|[%&|^!=<>/*+-]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|x?or|x?or_eq)\b/,
    "boolean": boolean
  });
  insertBefore(cpp, "string", {
    "module": {
      // https://en.cppreference.com/w/cpp/language/modules
      pattern: re(
        '(\\b(?:import|module)\\s+)(?:"(?:\\\\[\\s\\S]|[^\\\\\n"])*"|<[^<>\n]*>|<0>(?:\\s*:\\s*<0>)?|:\\s*<0>)',
        [`\\b(?!${keyword.source})\\w+(?:\\s*\\.\\s*\\w+)*\\b`],
        "g"
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        "string": /^[<"][^]+/,
        "operator": /:/,
        "punctuation": /\./
      }
    },
    "raw-string": {
      pattern: /R"([^()\\ ]{0,16})\([^]*?\)\1"/g,
      greedy: true,
      alias: "string"
    }
  });
  insertBefore(cpp, "keyword", {
    "generic-function": {
      pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
      inside: {
        "function": /^\w+/,
        "generic": {
          pattern: /<[^]+/,
          alias: "class-name",
          inside: cpp
        }
      }
    }
  });
  insertBefore(cpp, "operator", {
    "double-colon": {
      pattern: /::/,
      alias: "punctuation"
    }
  });
  var baseClauseInside = Object.assign({}, cpp);
  insertBefore(cpp, "class-name", {
    // the base clause is an optional list of parent classes
    // https://en.cppreference.com/w/cpp/language/class
    "base-clause": {
      pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/g,
      lookbehind: true,
      greedy: true,
      inside: baseClauseInside
    }
  });
  insertBefore(baseClauseInside, "double-colon", {
    // All untokenized words that are not namespaces should be class names
    "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
  });

  // node_modules/prism-code-editor/dist/prism/languages/opencl.js
  insertBefore(
    languages.opencl = extend("c", {
      // Extracted from the official specs (2.0) and http://streamcomputing.eu/downloads/?opencl.lang (opencl-keywords, opencl-types) and http://sourceforge.net/tracker/?func=detail&aid=2957794&group_id=95717&atid=612384 (Words2, partly Words3)
      "keyword": /\b(?:(?:__)?(?:constant|global|kernel|local|private|read_only|read_write|write_only)|__attribute__|auto|(?:bool|u?(?:char|int|long|short)|half|quad)(?:2|3|4|8|16)?|break|case|complex|const|continue|(?:double|float)(?:16(?:x(?:1|2|4|8|16))?|1x(?:1|2|4|8|16)|2(?:x(?:1|2|4|8|16))?|3|4(?:x(?:1|2|4|8|16))?|8(?:x(?:1|2|4|8|16))?)?|default|do|else|enum|extern|for|goto|if|imaginary|inline|packed|pipe|register|restrict|return|signed|sizeof|static|struct|switch|typedef|uniform|union|unsigned|void|volatile|while)\b/,
      // Extracted from http://streamcomputing.eu/downloads/?opencl.lang (opencl-const)
      // Math Constants: https://www.khronos.org/registry/OpenCL/sdk/2.1/docs/man/xhtml/mathConstants.html
      // Macros and Limits: https://www.khronos.org/registry/OpenCL/sdk/2.1/docs/man/xhtml/macroLimits.html
      "number": /(?:\b0x(?:[a-f\d]+(?:\.[a-f\d]*)?|\.[a-f\d]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[fuhl]{0,4}/i,
      "boolean": boolean,
      "constant-opencl-kernel": {
        pattern: /\b(?:CHAR_(?:BIT|MAX|MIN)|CLK_(?:ADDRESS_(?:CLAMP(?:_TO_EDGE)?|NONE|REPEAT)|FILTER_(?:LINEAR|NEAREST)|(?:GLOBAL|LOCAL)_MEM_FENCE|NORMALIZED_COORDS_(?:FALSE|TRUE))|CL_(?:BGRA|(?:HALF_)?FLOAT|INTENSITY|LUMINANCE|A?R?G?B?[Ax]?|(?:(?:UN)?SIGNED|[US]NORM)_(?:INT(?:8|16|32))|UNORM_(?:INT_101010|SHORT_(?:555|565)))|(?:DBL|FLT|HALF)_(?:DIG|EPSILON|(?:MAX|MIN)(?:(?:_10)?_EXP)?|MANT_DIG)|FLT_RADIX|HUGE_VALF?|(?:INT|LONG|SCHAR|SHRT)_(?:MAX|MIN)|INFINITY|MAXFLOAT|M_(?:[12]_PI|2_SQRTPI|E|LN2|LN10|LOG2E?|LOG10E?|PI(?:_[24])?|SQRT(?:1_2|2))(?:_F|_H)?|NAN|(?:UCHAR|UINT|ULONG|USHRT)_MAX)\b/,
        alias: "constant"
      }
    }),
    "class-name",
    {
      // https://www.khronos.org/registry/OpenCL/sdk/2.1/docs/man/xhtml/scalarDataTypes.html
      // https://www.khronos.org/registry/OpenCL/sdk/2.1/docs/man/xhtml/otherDataTypes.html
      "builtin-type": {
        pattern: /\b(?:_cl_(?:command_queue|context|device_id|event|kernel|mem|platform_id|program|sampler)|cl_(?:image_format|mem_fence_flags)|clk_event_t|event_t|image(?:1d_(?:array_|buffer_)?t|2d_(?:array_(?:depth_|msaa_depth_|msaa_)?|depth_|msaa_depth_|msaa_)?t|3d_t)|ndrange_t|ptrdiff_t|queue_t|reserve_id_t|sampler_t|size_t|u?intptr_t)\b/,
        alias: "keyword"
      }
    }
  );
  var attributes = {
    // Extracted from http://streamcomputing.eu/downloads/?opencl_host.lang (opencl-types and opencl-host)
    "type-opencl-host": {
      pattern: /\b(?:cl_(?:GLenum|GLint|GLuin|addressing_mode|bitfield|bool|buffer_create_type|build_status|channel_(?:order|type)|(?:u?(?:char|int|long|short)|double|float)(?:[2348]|16)?|command_(?:queue(?:_info|_properties)?|type)|context(?:_info|_properties)?|device_(?:exec_capabilities|fp_config|id|info|local_mem_type|mem_cache_type|type)|(?:event|sampler)(?:_info)?|filter_mode|half|image_info|kernel(?:_info|_work_group_info)?|map_flags|mem(?:_flags|_info|_object_type)?|platform_(?:id|info)|profiling_info|program(?:_build_info|_info)?))\b/,
      alias: "keyword"
    },
    "boolean-opencl-host": {
      pattern: /\bCL_(?:FALSE|TRUE)\b/,
      alias: "boolean"
    },
    // Extracted from cl.h (2.0) and http://streamcomputing.eu/downloads/?opencl_host.lang (opencl-const)
    "constant-opencl-host": {
      pattern: /\bCL_(?:A|ABGR|ADDRESS_(?:CLAMP(?:_TO_EDGE)?|MIRRORED_REPEAT|NONE|REPEAT)|ARGB|BLOCKING|BUFFER_CREATE_TYPE_REGION|BUILD_(?:ERROR|IN_PROGRESS|NONE|PROGRAM_FAILURE|SUCCESS)|COMMAND_(?:ACQUIRE_GL_OBJECTS|BARRIER|COPY_(?:BUFFER(?:_RECT|_TO_IMAGE)?|IMAGE(?:_TO_BUFFER)?)|FILL_(?:BUFFER|IMAGE)|MAP(?:_BUFFER|_IMAGE)|MARKER|MIGRATE(?:_SVM)?_MEM_OBJECTS|NATIVE_KERNEL|NDRANGE_KERNEL|READ_(?:BUFFER(?:_RECT)?|IMAGE)|RELEASE_GL_OBJECTS|SVM_(?:FREE|MAP|MEMCPY|MEMFILL|UNMAP)|TASK|UNMAP_MEM_OBJECT|USER|WRITE_(?:BUFFER(?:_RECT)?|IMAGE))|COMPILER_NOT_AVAILABLE|COMPILE_PROGRAM_FAILURE|COMPLETE|CONTEXT_(?:DEVICES|INTEROP_USER_SYNC|NUM_DEVICES|PLATFORM|PROPERTIES|REFERENCE_COUNT)|DEPTH(?:_STENCIL)?|DEVICE_(?:ADDRESS_BITS|AFFINITY_DOMAIN_(?:L[1-4]_CACHE|NEXT_PARTITIONABLE|NUMA)|AVAILABLE|BUILT_IN_KERNELS|COMPILER_AVAILABLE|DOUBLE_FP_CONFIG|ENDIAN_LITTLE|ERROR_CORRECTION_SUPPORT|EXECUTION_CAPABILITIES|EXTENSIONS|GLOBAL_(?:MEM_(?:CACHELINE_SIZE|CACHE_SIZE|CACHE_TYPE|SIZE)|VARIABLE_PREFERRED_TOTAL_SIZE)|HOST_UNIFIED_MEMORY|IL_VERSION|IMAGE(?:2D_MAX_(?:HEIGHT|WIDTH)|3D_MAX_(?:DEPTH|HEIGHT|WIDTH)|_BASE_ADDRESS_ALIGNMENT|_MAX_ARRAY_SIZE|_MAX_BUFFER_SIZE|_PITCH_ALIGNMENT|_SUPPORT)|LINKER_AVAILABLE|LOCAL_MEM_SIZE|LOCAL_MEM_TYPE|MAX_(?:CLOCK_FREQUENCY|COMPUTE_UNITS|CONSTANT_ARGS|CONSTANT_BUFFER_SIZE|GLOBAL_VARIABLE_SIZE|MEM_ALLOC_SIZE|NUM_SUB_GROUPS|ON_DEVICE_(?:EVENTS|QUEUES)|PARAMETER_SIZE|PIPE_ARGS|READ_IMAGE_ARGS|READ_WRITE_IMAGE_ARGS|SAMPLERS|WORK_GROUP_SIZE|WORK_ITEM_DIMENSIONS|WORK_ITEM_SIZES|WRITE_IMAGE_ARGS)|MEM_BASE_ADDR_ALIGN|MIN_DATA_TYPE_ALIGN_SIZE|NAME|NATIVE_VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT)|NOT_(?:AVAILABLE|FOUND)|OPENCL_C_VERSION|PARENT_DEVICE|PARTITION_(?:AFFINITY_DOMAIN|BY_AFFINITY_DOMAIN|BY_COUNTS|BY_COUNTS_LIST_END|EQUALLY|FAILED|MAX_SUB_DEVICES|PROPERTIES|TYPE)|PIPE_MAX_(?:ACTIVE_RESERVATIONS|PACKET_SIZE)|PLATFORM|PREFERRED_(?:GLOBAL_ATOMIC_ALIGNMENT|INTEROP_USER_SYNC|LOCAL_ATOMIC_ALIGNMENT|PLATFORM_ATOMIC_ALIGNMENT|VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT))|PRINTF_BUFFER_SIZE|PROFILE|PROFILING_TIMER_RESOLUTION|QUEUE_(?:ON_(?:DEVICE_(?:MAX_SIZE|PREFERRED_SIZE|PROPERTIES)|HOST_PROPERTIES)|PROPERTIES)|REFERENCE_COUNT|SINGLE_FP_CONFIG|SUB_GROUP_INDEPENDENT_FORWARD_PROGRESS|SVM_(?:ATOMICS|CAPABILITIES|COARSE_GRAIN_BUFFER|FINE_GRAIN_BUFFER|FINE_GRAIN_SYSTEM)|TYPE(?:_ACCELERATOR|_ALL|_CPU|_CUSTOM|_DEFAULT|_GPU)?|VENDOR(?:_ID)?|VERSION)|DRIVER_VERSION|EVENT_(?:COMMAND_(?:EXECUTION_STATUS|QUEUE|TYPE)|CONTEXT|REFERENCE_COUNT)|EXEC_(?:KERNEL|NATIVE_KERNEL|STATUS_ERROR_FOR_EVENTS_IN_WAIT_LIST)|FILTER_(?:LINEAR|NEAREST)|FLOAT|FP_(?:CORRECTLY_ROUNDED_DIVIDE_SQRT|DENORM|FMA|INF_NAN|ROUND_TO_INF|ROUND_TO_NEAREST|ROUND_TO_ZERO|SOFT_FLOAT)|GLOBAL|HALF_FLOAT|IMAGE_(?:ARRAY_SIZE|BUFFER|DEPTH|ELEMENT_SIZE|FORMAT|FORMAT_MISMATCH|FORMAT_NOT_SUPPORTED|HEIGHT|NUM_MIP_LEVELS|NUM_SAMPLES|ROW_PITCH|SLICE_PITCH|WIDTH)|INTENSITY|INVALID_(?:ARG_INDEX|ARG_SIZE|ARG_VALUE|BINARY|BUFFER_SIZE|BUILD_OPTIONS|COMMAND_QUEUE|COMPILER_OPTIONS|CONTEXT|DEVICE|DEVICE_PARTITION_COUNT|DEVICE_QUEUE|DEVICE_TYPE|EVENT|EVENT_WAIT_LIST|GLOBAL_OFFSET|GLOBAL_WORK_SIZE|GL_OBJECT|HOST_PTR|IMAGE_DESCRIPTOR|IMAGE_FORMAT_DESCRIPTOR|IMAGE_SIZE|KERNEL|KERNEL_ARGS|KERNEL_DEFINITION|KERNEL_NAME|LINKER_OPTIONS|MEM_OBJECT|MIP_LEVEL|OPERATION|PIPE_SIZE|PLATFORM|PROGRAM|PROGRAM_EXECUTABLE|PROPERTY|QUEUE_PROPERTIES|SAMPLER|VALUE|WORK_DIMENSION|WORK_GROUP_SIZE|WORK_ITEM_SIZE)|KERNEL_(?:ARG_(?:ACCESS_(?:NONE|QUALIFIER|READ_ONLY|READ_WRITE|WRITE_ONLY)|ADDRESS_(?:CONSTANT|GLOBAL|LOCAL|PRIVATE|QUALIFIER)|INFO_NOT_AVAILABLE|NAME|TYPE_(?:CONST|NAME|NONE|PIPE|QUALIFIER|RESTRICT|VOLATILE))|ATTRIBUTES|COMPILE_NUM_SUB_GROUPS|COMPILE_WORK_GROUP_SIZE|CONTEXT|EXEC_INFO_SVM_FINE_GRAIN_SYSTEM|EXEC_INFO_SVM_PTRS|FUNCTION_NAME|GLOBAL_WORK_SIZE|LOCAL_MEM_SIZE|LOCAL_SIZE_FOR_SUB_GROUP_COUNT|MAX_NUM_SUB_GROUPS|MAX_SUB_GROUP_SIZE_FOR_NDRANGE|NUM_ARGS|PREFERRED_WORK_GROUP_SIZE_MULTIPLE|PRIVATE_MEM_SIZE|PROGRAM|REFERENCE_COUNT|SUB_GROUP_COUNT_FOR_NDRANGE|WORK_GROUP_SIZE)|LINKER_NOT_AVAILABLE|LINK_PROGRAM_FAILURE|LOCAL|LUMINANCE|MAP_(?:FAILURE|READ|WRITE|WRITE_INVALIDATE_REGION)|MEM_(?:ALLOC_HOST_PTR|ASSOCIATED_MEMOBJECT|CONTEXT|COPY_HOST_PTR|COPY_OVERLAP|FLAGS|HOST_NO_ACCESS|HOST_PTR|HOST_READ_ONLY|HOST_WRITE_ONLY|KERNEL_READ_AND_WRITE|MAP_COUNT|OBJECT_(?:ALLOCATION_FAILURE|BUFFER|IMAGE1D|IMAGE1D_ARRAY|IMAGE1D_BUFFER|IMAGE2D|IMAGE2D_ARRAY|IMAGE3D|PIPE)|OFFSET|READ_ONLY|READ_WRITE|REFERENCE_COUNT|SIZE|SVM_ATOMICS|SVM_FINE_GRAIN_BUFFER|TYPE|USES_SVM_POINTER|USE_HOST_PTR|WRITE_ONLY)|MIGRATE_MEM_OBJECT_(?:CONTENT_UNDEFINED|HOST)|MISALIGNED_SUB_BUFFER_OFFSET|NONE|NON_BLOCKING|OUT_OF_(?:HOST_MEMORY|RESOURCES)|PIPE_(?:MAX_PACKETS|PACKET_SIZE)|PLATFORM_(?:EXTENSIONS|HOST_TIMER_RESOLUTION|NAME|PROFILE|VENDOR|VERSION)|PROFILING_(?:COMMAND_(?:COMPLETE|END|QUEUED|START|SUBMIT)|INFO_NOT_AVAILABLE)|PROGRAM_(?:BINARIES|BINARY_SIZES|BINARY_TYPE(?:_COMPILED_OBJECT|_EXECUTABLE|_LIBRARY|_NONE)?|BUILD_(?:GLOBAL_VARIABLE_TOTAL_SIZE|LOG|OPTIONS|STATUS)|CONTEXT|DEVICES|IL|KERNEL_NAMES|NUM_DEVICES|NUM_KERNELS|REFERENCE_COUNT|SOURCE)|QUEUED|QUEUE_(?:CONTEXT|DEVICE|DEVICE_DEFAULT|ON_DEVICE|ON_DEVICE_DEFAULT|OUT_OF_ORDER_EXEC_MODE_ENABLE|PROFILING_ENABLE|PROPERTIES|REFERENCE_COUNT|SIZE)|RA?|READ_(?:ONLY|WRITE)_CACHE|RG|RGB[Ax]?|RG?x|RUNNING|SAMPLER_(?:ADDRESSING_MODE|CONTEXT|FILTER_MODE|LOD_MAX|LOD_MIN|MIP_FILTER_MODE|NORMALIZED_COORDS|REFERENCE_COUNT)|(?:UN)?SIGNED_INT(?:8|16|32)|SNORM_INT(?:8|16)|SUBMITTED|SUCCESS|UNORM_INT(?:8|16|24|_101010|_101010_2)|UNORM_SHORT_5[56]5|VERSION_(?:1_[012]|2_[01])|s?BGRA|sRGB[Ax]?)\b/,
      alias: "constant"
    },
    // Extracted from cl.h (2.0) and http://streamcomputing.eu/downloads/?opencl_host.lang (opencl-host)
    "function-opencl-host": {
      pattern: /\bcl(?:BuildProgram|CloneKernel|CompileProgram|Create(?:Buffer|CommandQueue(?:WithProperties)?|Context|ContextFromType|Image|Image[23]D|Kernel|KernelsInProgram|Pipe|ProgramWith(?:Binary|BuiltInKernels|IL|Source)|Sampler|SamplerWithProperties|SubBuffer|SubDevices|UserEvent)|Enqueue(?:(?:Barrier|Marker)(?:WithWaitList)?|Copy(?:Buffer(?:Rect|ToImage)?|Image(?:ToBuffer)?)|(?:Fill|Map)(?:Buffer|Image)|MigrateMemObjects|NDRangeKernel|NativeKernel|(?:Read|Write)(?:Buffer(?:Rect)?|Image)|SVM(?:Free|Map|MemFill|Memcpy|MigrateMem|Unmap)|Task|UnmapMemObject|WaitForEvents)|Finish|Flush|Get(?:CommandQueueInfo|ContextInfo|Device(?:AndHostTimer|IDs|Info)|Event(?:Profiling)?Info|ExtensionFunctionAddress(?:ForPlatform)?|HostTimer|ImageInfo|Kernel(?:ArgInfo|Info|SubGroupInfo|WorkGroupInfo)|MemObjectInfo|PipeInfo|Platform(?:IDs|Info)|Program(?:Build)?Info|SamplerInfo|SupportedImageFormats)|LinkProgram|(?:Release|Retain)(?:CommandQueue|Context|Device|Event|Kernel|MemObject|Program|Sampler)|SVM(?:Alloc|Free)|Set(?:CommandQueueProperty|DefaultDeviceCommandQueue|EventCallback|Kernel|Kernel(?:Arg(?:SVMPointer)?|ExecInfo)|MemObjectDestructorCallback|UserEventStatus)|Unload(?:Platform)?Compiler|WaitForEvents)\b/,
      alias: "function"
    }
  };
  insertBefore(languages.c, "keyword", attributes);
  if (languages.cpp) {
    attributes["type-opencl-host-cpp"] = {
      pattern: /\b(?:Buffer|BufferGL|BufferRenderGL|CommandQueue|Context|Device|DeviceCommandQueue|EnqueueArgs|Event|Image(?:[123]D|[12]DArray|1DBuffer|[23]DGL|Format|GL)?|Kernel|KernelFunctor|LocalSpaceArg|Memory|NDRange|Pipe|Platform|Program|SVMAllocator|SVMTrait(?:Atomic|Coarse|Fine|ReadOnly|ReadWrite|WriteOnly)|Sampler|UserEvent)\b/,
      alias: "keyword"
    };
    insertBefore(languages.cpp, "keyword", attributes);
  }

  // node_modules/prism-code-editor/dist/prism/languages/arduino.js
  languages.ino = languages.arduino = extend("cpp", {
    "keyword": /\b(?:String|array|bool|boolean|break|byte|case|catch|continue|default|do|double|else|finally|for|function|goto|if|int?|instanceof|integer|long|loop|new|null|return|setup|string|switch|throw|try|void|while|word)\b/,
    "constant": /\b(?:ANALOG_MESSAGE|DEFAULT|DIGITAL_MESSAGE|EXTERNAL|FIRMATA_STRING|HIGH|INPUT|INPUT_PULLUP|INTERNAL|INTERNAL1V1|INTERNAL2V56|LED_BUILTIN|LOW|OUTPUT|REPORT_ANALOG|REPORT_DIGITAL|SET_PIN_MODE|SYSEX_START|SYSTEM_RESET)\b/,
    "builtin": /\b(?:Audio|BSSID|Bridge|Client|Console|EEPROM|Esplora|EsploraTFT|Ethernet|EthernetClient|EthernetServer|EthernetUDP|File|FileIO|FileSystem|Firmata|GPRS|GSM|GSMBand|GSMClient|GSMModem|GSMPIN|GSMScanner|GSMServer|GSMVoiceCall|GSM_SMS|HttpClient|IPAddress|IRread|Keyboard|KeyboardController|LiquidCrystal|LiquidCrystal_I2C|Mailbox|Mouse|MouseController|PImage|Process|RSSI|RobotControl|RobotMotor|SD|SPI|SSID|Scheduler|Serial|Server|Servo|SoftwareSerial|Stepper|Stream|TFT|Task|USBHost|WiFi|WiFiClient|WiFiServer|WiFiUDP|Wire|YunClient|YunServer|abs|addParameter|analogRead|analogReadResolution|analogReference|analogWrite|analogWriteResolution|answerCall|attach|attachGPRS|attachInterrupt|attached|autoscroll|available|background|beep|begin|beginPacket|beginSD|beginSMS|beginSpeaker|beginTFT|beginTransmission|beginWrite|bit|bitClear|bitRead|bitSet|bitWrite|blink|blinkVersion|buffer|changePIN|checkPIN|checkPUK|checkReg|circle|cityNameRead|cityNameWrite|clear|clearScreen|click|close|compassRead|config|connect|connected|constrain|cos|countryNameRead|countryNameWrite|createChar|cursor|debugPrint|delay|delayMicroseconds|detach|detachInterrupt|digitalRead|digitalWrite|disconnect|display|displayLogos|drawBMP|drawCompass|encryptionType|end|endPacket|endSMS|endTransmission|endWrite|exists|exitValue|fill|find|findUntil|flush|gatewayIP|get|getAsynchronously|getBand|getButton|getCurrentCarrier|getIMEI|getKey|getModifiers|getOemKey|getPINUsed|getResult|getSignalStrength|getSocket|getVoiceCallStatus|getXChange|getYChange|hangCall|height|highByte|home|image|interrupts|isActionDone|isDirectory|isListening|isPIN|isPressed|isValid|keyPressed|keyReleased|keyboardRead|knobRead|leftToRight|line|lineFollowConfig|listen|listenOnLocalhost|loadImage|localIP|lowByte|macAddress|maintain|map|max|messageAvailable|micros|millis|min|mkdir|motorsStop|motorsWrite|mouseDragged|mouseMoved|mousePressed|mouseReleased|move|noAutoscroll|noBlink|noBuffer|noCursor|noDisplay|noFill|noInterrupts|noListenOnLocalhost|noStroke|noTone|onReceive|onRequest|open|openNextFile|overflow|parseCommand|parseFloat|parseInt|parsePacket|pauseMode|peek|pinMode|playFile|playMelody|point|pointTo|position|pow|prepare|press|print|printFirmwareVersion|printVersion|println|process|processInput|pulseIn|put|random|randomSeed|read(?:Accelerometer|Blue|Button|Bytes|BytesUntil|Green|JoystickButton|JoystickSwitch|Joystick[XY]|LightSensor|Message|Microphone|Networks|Red|Slider|String|StringUntil|Temperature|y)?|rect|release|releaseAll|remoteIP|remoteNumber|remotePort|remove|requestFrom|retrieveCallingNumber|rewindDirectory|rightToLeft|rmdir|robotNameRead|robotNameWrite|run|runAsynchronously|runShellCommand|runShellCommandAsynchronously|running|scanNetworks|scrollDisplayLeft|scrollDisplayRight|seek|sendAnalog|sendDigitalPortPair|sendDigitalPorts|sendString|sendSysex|serialEvent|setBand|setBitOrder|setClockDivider|setCursor|setDNS|setDataMode|setFirmwareVersion|setMode|setPINUsed|setSpeed|setTextSize|setTimeout|shiftIn|shiftOut|shutdown|sin|size|sqrt|startLoop|step|stop|stroke|subnetMask|switchPIN|tan|tempoWrite|text|tone|transfer|tuneWrite|turn|updateIR|userNameRead|userNameWrite|voiceCall|waitContinue|width|write|writeBlue|writeGreen|writeJSON|writeMessage|writeMicroseconds|writeRGB|writeRed|yield)\b/
  });

  // node_modules/prism-code-editor/dist/prism/languages/arff.js
  languages.arff = {
    "comment": /%.*/,
    "string": {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true
    },
    "keyword": /@(?:attribute|data|end|relation)\b/i,
    "number": /\b\d+(?:\.\d+)?\b/,
    "punctuation": /[{},]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/armasm.js
  languages["arm-asm"] = languages.armasm = {
    "comment": {
      pattern: /;.*/g,
      greedy: true
    },
    "string": {
      pattern: /"(?:[^\n"]|"")*"/g,
      greedy: true,
      inside: {
        "variable": {
          pattern: /((?:^|[^$])(?:\$\$)*)\$\w+/,
          lookbehind: true
        }
      }
    },
    "char": {
      pattern: /'(?:[^\n']{0,4}|'')'/g,
      greedy: true
    },
    "version-symbol": {
      pattern: /\|[\w@]+\|/g,
      greedy: true,
      alias: "property"
    },
    "boolean": /\b(?:FALSE|TRUE)\b/,
    "directive": {
      pattern: /\b(?:ALIAS|ALIGN|AREA|ARM|ASSERT|ATTR|CN|CODE|CODE16|CODE32|COMMON|CP|DATA|DC[BDIQW]|DCD[OU]|DCFDU?|DC[QW]U|DN|ELIF|ELSE|ENDFUNC|ENDIF|ENDP?|ENTRY|EQU|EXPORT|EXPORTAS|EXTERN|FIELD|FILL|FN|FUNCTION|GBL[ALS]|GET|GLOBAL|IF|IMPORT|INCBIN|INCLUDE|INFO|KEEP|LCL[ALS]|LTORG|MACRO|MAP|MEND|MEXIT|NOFP|OPT|PRESERVE8|PROC|QN|READONLY|RELOC|REQUIRE8?|RLIST|ROUT|SET[ALS]|SN|SPACE|SUBT|THUMBX?|TTL|WEND|WHILE)\b/,
      alias: "property"
    },
    "instruction": {
      pattern: /((?:^|(?:^|[^\\])\n)[ 	]*(?:(?:[A-Z][A-Z\d_]*[a-z]\w*|[a-z]\w*|\d+)[ 	]+)?)\b[A-Z.]+\b/,
      lookbehind: true,
      alias: "keyword"
    },
    "variable": /\$\w+/,
    "number": /(?:\b[2-9]_\d+|(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e-?\d+)?|\b0(?:[fd]_|x)[a-f\d]+|&[a-f\d]+)\b/i,
    "register": {
      pattern: /\b(?:r\d|lr)\b/,
      alias: "symbol"
    },
    "operator": /<>|>>|<<|&&|\|\||[!=<>/]=?|[%&|^#?*+-]|:[A-Z]+:/,
    "punctuation": /[()[\],]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/arturo.js
  var createLanguageString = (lang, pattern = lang) => ({
    pattern: RegExp(`\\{!(?:${pattern})$[^]*\\}`, "mg"),
    greedy: true,
    inside: {
      "string": /^.+|.$/,
      "embedded": {
        pattern: /[^]+/,
        alias: "language-" + lang,
        inside: lang
      }
    }
  });
  languages.art = languages.arturo = {
    "comment": {
      pattern: /;.*/g,
      greedy: true
    },
    "character": {
      pattern: /`.`/g,
      greedy: true,
      alias: "char"
    },
    "number": /\b\d+(?:\.\d+(?:\.\d+(?:-[\w+-]+)?)?)?\b/,
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "regex": {
      pattern: /\{\/.*?\/\}/g,
      greedy: true
    },
    "html-string": createLanguageString("html"),
    "css-string": createLanguageString("css"),
    "js-string": createLanguageString("js"),
    "md-string": createLanguageString("md"),
    "sql-string": createLanguageString("sql"),
    "sh-string": createLanguageString("shell", "sh"),
    "multistring": {
      pattern: /».*|\{:[^]*?:\}|\{[^}]*\}|^-{6}$[^]*/mg,
      alias: "string",
      greedy: true
    },
    "label": {
      pattern: /\w+\??:/,
      alias: "property"
    },
    "literal": {
      pattern: /'\w+\??:?/,
      alias: "constant"
    },
    "type": {
      pattern: /:\w+\??:?/,
      alias: "class-name"
    },
    "color": /#\w+/,
    "predicate": {
      pattern: /\b(?:all|an[dy]|ascii|attr|attribute|attributeLabel|binary|block|char|contains|database|date|dictionary|empty|equal|even|every|exists|false|true|floating|function|greater|greaterOrEqual|i[fns]|inline|integer|key|label|leap|less|lessOrEqual|literal|logical|lower|n?and|negative|not|notEqual|null|numeric|odd|path|pathLabel|positive|prefix|prime|regex|same|set|some|sorted|standalone|string|subset|suffix|superset|symbol|symbolLiteral|try|type|unless|upper|when|whitespace|word|x?n?or|zero)\?/,
      alias: "keyword"
    },
    "builtin-function": {
      pattern: /\b(?:ab?s|a?cosh?|a?csech?|a?ctanh?|add|after|alert|alias|angle|append|args?|arity|array|a?sech?|a?sinh?|a?tanh?|atan2|attrs?|average|before|benchmark|blend|break|call|capitalize|case|ceil|chop|clear|clip|close|color|combine|conj|continue|copy|crc|cursor|darken|dec|decode|define|delete|desaturate|deviation|dialog|dictionary|difference|digest|digits|do|download|drop|dup|e|else|empty|encode|ensure|env|escape|execute|exit|exp|extend|extract|factors|f?div|filter|first|flatten|floor|fold|from|function|gamma|gcd|get|goto|hash|hypot|if|inc|indent|index|infinity|info|input|insert|inspect|intersection|invert|jaro|join|keys|kurtosis|last|let|levenshtein|lighten|list|ln|log|loop|lower|mail|map|match|max|median|min|mod|module|mul|n?and|neg|new|normalize|no[tw]|null|open|outdent|pad|palette|panic|path|pause|permissions|permutate|pi|po[pw]|popup|powerset|powmod|prefix|prints?|process|product|query|random|range|read|relative|remove|rename|render|repeat|replace|request|return|reverse|round|sample|saturate|script|select|serve|set|sh[lr]|shuffle|size|skewness|slice|sort|spin|split|sqrt|squeeze|stack|strip|su[bm]|suffix|switch|symbols|symlink|sys|take|terminal|terminate|to|truncate|try|type|unclip|union|unique|unless|until|unzip|upper|values|var|variance|volume|webview|while|with|wordwrap|write|x?n?or|zip)\b/,
      alias: "keyword"
    },
    "sugar": {
      pattern: /->|=>|\||::/,
      alias: "operator"
    },
    "punctuation": /[()[\],]/,
    "symbol": /<:|-:|ø|@|#|\+|\||\*|\$|---|-|%|\/|\.\.|\^|~|=|<|>|\\/,
    "boolean": /\b(?:false|true|maybe)\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/asciidoc.js
  var attributes2 = {
    pattern: /(^[ 	]*)\[(?!\[)(?:(["'$`])(?:\\.|(?!\2)[^\\])*\2|\[(?:\\.|[^\\[\]])*\]|\\.|[^\\"'[\]$`])*\]/m,
    lookbehind: true,
    inside: {
      "quoted": {
        pattern: /([$`])(?:\\.|(?!\1)[^\\])*\1/,
        inside: {
          "punctuation": /^[$`]|[$`]$/
        }
      },
      "interpreted": {
        pattern: /'(?:\\.|[^\\'])*'/,
        inside: {
          "punctuation": /^'|'$/
          // See rest below
        }
      },
      "string": /"(?:\\.|[^\\"])*"/,
      "variable": /\w+(?==)/,
      "punctuation": /^\[|\]$|,/,
      "operator": /=/,
      // The negative look-ahead prevents blank matches
      "attr-value": /(?!^\s+$).+/
    }
  };
  var asciidoc = languages.adoc = languages.asciidoc = {
    "comment-block": {
      pattern: /^(\/{4,})$[^]*?^\1/m,
      alias: "comment"
    },
    "table": {
      pattern: /^\|={3,}(?:\n.*)*?\n\|={3,}$/m,
      inside: {
        "specifiers": {
          pattern: /(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*](?:[<^>](?:\.[<^>])?|\.[<^>])?|[<^>](?:\.[<^>])?|\.[<^>])[a-z]*|[a-z]+)(?=\|)/,
          alias: "attr-value"
        },
        "punctuation": {
          pattern: /(^|[^\\])[|!]=*/,
          lookbehind: true
        }
        // See rest below
      }
    },
    "passthrough-block": {
      pattern: /^(\+{4,})$[^]*?^\1$/m,
      inside: {
        "punctuation": /^\++|\++$/
        // See rest below
      }
    },
    // Literal blocks and listing blocks
    "literal-block": {
      pattern: /^(-{4,}|\.{4,})$[^]*?^\1$/m,
      inside: {
        "punctuation": /^(?:-+|\.+)|(?:-+|\.+)$/
        // See rest below
      }
    },
    // Sidebar blocks, quote blocks, example blocks and open blocks
    "other-block": {
      pattern: /^(--|\*{4,}|_{4,}|={4,})$[^]*?^\1$/m,
      inside: {
        "punctuation": /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/
        // See rest below
      }
    },
    // list-punctuation and list-label must appear before indented-block
    "list-punctuation": {
      pattern: /(^[ 	]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im,
      lookbehind: true,
      alias: "punctuation"
    },
    "list-label": {
      pattern: /(^[ 	]*)[a-z\d].+(?::{2,4}|;;)(?!\S)/im,
      lookbehind: true,
      alias: "symbol"
    },
    "indented-block": {
      pattern: /(\n\n)([ 	]+)\S.*(?:\n\2.+)*(?=\n\n|$)/,
      lookbehind: true
    },
    "comment": /^\/\/.*/m,
    "title": {
      pattern: /^.+\n(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} .+|^\.(?![\s.]).*/m,
      alias: "important",
      inside: {
        "punctuation": /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/
        // See rest below
      }
    },
    "attribute-entry": {
      pattern: /^:[^\n:]+:(?: .*?(?: \+\n.*?)*)?$/m,
      alias: "tag"
    },
    "attributes": attributes2,
    "hr": {
      pattern: /^'{3,}$/m,
      alias: "punctuation"
    },
    "page-break": {
      pattern: /^<{3,}$/m,
      alias: "punctuation"
    },
    "admonition": {
      pattern: /^(?:CAUTION|IMPORTANT|NOTE|TIP|WARNING):/m,
      alias: "keyword"
    },
    "callout": [
      {
        pattern: /(^[ 	]*)<?\d*>/m,
        lookbehind: true,
        alias: "symbol"
      },
      {
        pattern: /<\d+>/,
        alias: "symbol"
      }
    ],
    "macro": {
      pattern: /\b[a-z\d][a-z\d-]*::?(?:[^\s\[\]]*\[(?:[^\]\\"']|(["'])(?:\\.|(?!\1)[^\\])*\1|\\.)*\])/,
      inside: {
        "function": /^[^:]+/,
        "punctuation": /^::?/,
        "attributes": {
          pattern: /(?:\[(?:[^\]\\"']|(["'])(?:\\.|(?!\1)[^\\])*\1|\\.)*\])/,
          inside: attributes2.inside
        }
      }
    },
    "inline": {
      /*
      		The initial look-behind prevents the highlighting of escaped quoted text.
      
      		Quoted text can be multi-line but cannot span an empty line.
      		All quoted text can have attributes before [foobar, 'foobar', baz="bar"].
      
      		First, we handle the constrained quotes.
      		Those must be bounded by non-word chars and cannot have spaces between the delimiter and the first char.
      		They are, in order: _emphasis_, ``double quotes'', `single quotes', `monospace`, 'emphasis', *strong*, +monospace+ and #unquoted#
      
      		Then we handle the unconstrained quotes.
      		Those do not have the restrictions of the constrained quotes.
      		They are, in order: __emphasis__, **strong**, ++monospace++, +++passthrough+++, ##unquoted##, $$passthrough$$, ~subscript~, ^superscript^, {attribute-reference}, [[anchor]], [[[bibliography anchor]]], <<xref>>, (((indexes))) and ((indexes))
      		 */
      pattern: /(^|[^\\])(?:(?:\B\[(?:[^\]\\"']|(["'])(?:\\.|(?!\2)[^\\])*\2|\\.)*\])?(?:\b_(?!\s)(?: _|\\.|[^\\\n_])+(?:\n(?: _|\\.|[^\\\n_])+)*_\b|\B``(?!\s).+?(?:\n.+?)*''\B|\B`(?!\s)(?:[^`'\s]|\s+\S)+['`]\B|\B(['*+#])(?!\s)(?: \3|\\.|(?!\3)[^\\\n])+(?:\n(?: \3|\\.|(?!\3)[^\\\n])+)*\3\B)|(?:\[(?:[^\]\\"']|(["'])(?:\\.|(?!\4)[^\\])*\4|\\.)*\])?(?:(__|\*\*|\+\+\+?|##|\$\$|[~^]).+?(?:\n.+?)*\5|\{[^\n}]+\}|\[\[\[?.+?(?:\n.+?)*\]?\]\]|<<.+?(?:\n.+?)*>>|\(\(\(?.+?(?:\n.+?)*\)?\)\)))/m,
      lookbehind: true,
      inside: {
        "attributes": attributes2,
        "url": {
          pattern: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/,
          inside: {
            "punctuation": /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/
          }
        },
        "attribute-ref": {
          pattern: /^\{.+\}$/,
          inside: {
            "variable": {
              pattern: /(^\{)[a-z\d,+_-]+/,
              lookbehind: true
            },
            "operator": /^[=?!#%@$]|!(?=[:}])/,
            "punctuation": /^\{|\}$|::?/
          }
        },
        "italic": {
          pattern: /^(['_])[^]+\1$/,
          inside: {
            "punctuation": /^(?:''?|__?)|(?:''?|__?)$/
          }
        },
        "bold": {
          pattern: /^\*[^]+\*$/,
          inside: {
            punctuation: /^\*\*?|\*\*?$/
          }
        },
        "punctuation": /^(?:``?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^`]|\)\)\)?)$/
      }
    },
    "replacement": {
      pattern: /\((?:C|R|TM)\)/,
      alias: "builtin"
    },
    "entity": /&#?[a-z\d]{1,8};/i,
    "line-continuation": {
      pattern: /(^| )\+$/m,
      lookbehind: true,
      alias: "punctuation"
    }
  };
  var copyFromAsciiDoc = (keys, obj) => {
    keys = keys.split(" ");
    obj = obj.inside;
    for (var i = 0, l = keys.length; i < l; i++) {
      obj[keys[i]] = asciidoc[keys[i]];
    }
  };
  copyFromAsciiDoc("macro inline replacement entity", attributes2.inside["interpreted"]);
  copyFromAsciiDoc("macro", asciidoc["passthrough-block"]);
  copyFromAsciiDoc("callout", asciidoc["literal-block"]);
  copyFromAsciiDoc("comment-block passthrough-block literal-block other-block list-punctuation indented-block comment title attribute-entry attributes hr page-break admonition list-label callout macro inline replacement entity line-continuation", asciidoc["table"]);
  copyFromAsciiDoc("table list-punctuation indented-block comment attribute-entry attributes hr page-break admonition list-label macro inline replacement entity line-continuation", asciidoc["other-block"]);
  copyFromAsciiDoc("macro inline replacement entity", asciidoc["title"]);

  // node_modules/prism-code-editor/dist/prism/languages/asm6502.js
  var opCodes = "adc|and|asl|bcc|bcs|beq|bit|bmi|bne|bpl|brk|bvc|bvs|cl[cdiv]|cmp|cpx|cpy|de[cxy]|eor|in[cxy]|jmp|jsr|ld[axy]|lsr|nop|ora|pha|php|pla|plp|rol|ror|rti|rts|sbc|se[cdi]|st[axy]|tax|tay|tsx|txa|txs|tya";
  languages.asm6502 = {
    "comment": /;.*/,
    "directive": {
      pattern: /\.\w+(?= )/,
      alias: "property"
    },
    "string": /(["'`])(?:\\.|(?!\1)[^\\\n])*\1/,
    "op-code": {
      pattern: RegExp("\\b(?:" + opCodes.toUpperCase() + "|" + opCodes + ")\\b"),
      alias: "keyword"
    },
    "hex-number": {
      pattern: /#?\$[a-f\d]{1,4}\b/i,
      alias: "number"
    },
    "binary-number": {
      pattern: /#?%[01]+\b/,
      alias: "number"
    },
    "decimal-number": {
      pattern: /#?\b\d+\b/,
      alias: "number"
    },
    "register": {
      pattern: /\b[xya]\b/i,
      alias: "variable"
    },
    "punctuation": /[(),:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/asmatmel.js
  var opCodes2 = "ad[cd]|adiw|andi?|asr|bclr|bld|br[bchtv][cs]|break|breq|br[gin]e|brid|brl[ot]|brmi|brpl|brsh|bse?t|cb[ir]|cl[chinrstvz]|com|cp[ci]?|cpse|de[cs]|eicall|eijmp|e?lpm|eor|f?mul|f?mulsu?|[ir]?call|[ir]?jmp|inc?|la[cst]|ld[a-z0-9]?|ls[lr]|movw?|neg|nop|ori?|out|pop|push|reti?|rol|ror|sbci?|sbi[csw]?|sbr[cs]?|se[chinrstvz]|sleep|spm|st[a-z0-9]?|subi?|swap|tst|wdr|xch";
  languages.asmatmel = {
    "comment": /;.*/,
    "string": {
      pattern: /(["'`])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true
    },
    "constant": /\b(?:PORT[A-Z]|DDR[A-Z]|(?:DD|P)[A-Z](?:\d|[0-2]\d|3[01]))\b/,
    "directive": {
      pattern: /\.\w+(?= )/,
      alias: "property"
    },
    "r-register": {
      pattern: /\br(?:\d|[12]\d|3[01])\b/,
      alias: "variable"
    },
    "op-code": {
      pattern: RegExp("\\b(?:" + opCodes2.toUpperCase() + "|" + opCodes2 + ")\\b"),
      alias: "keyword"
    },
    "hex-number": {
      pattern: /#?\$[a-f\d]{2,4}\b/i,
      alias: "number"
    },
    "binary-number": {
      pattern: /#?%[01]+\b/,
      alias: "number"
    },
    "decimal-number": {
      pattern: /#?\b\d+\b/,
      alias: "number"
    },
    "register": {
      pattern: /\b[acznvshtixy]\b/i,
      alias: "variable"
    },
    "operator": /&[&=]?|\|[|=]?|>>=?|<<=?|[%?^!=<>/*+-]=?/,
    "punctuation": /[(),:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/xml.js
  languages.rss = languages.atom = languages.ssml = languages.xml = {
    "comment": xmlComment,
    "prolog": {
      pattern: /<\?[^]+?\?>/g,
      greedy: true
    },
    "doctype": {
      // https://www.w3.org/TR/xml/#NT-doctypedecl
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/gi,
      greedy: true,
      inside: {
        "internal-subset": {
          pattern: /(\[)[^]+(?=\]\s*>$)/,
          lookbehind: true,
          inside: "xml"
        },
        "string": /"[^"]*"|'[^']*'/,
        "punctuation": /^<!|[>[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        "name": /\S+/
      }
    },
    "cdata": {
      pattern: /<!\[CDATA\[[^]*?\]\]>/gi,
      greedy: true
    },
    "tag": tag,
    "entity": entity,
    "markup-bracket": {
      pattern: /[()[\]{}]/,
      alias: "punctuation"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/markup.js
  var addLang = (grammar, lang) => {
    grammar["language-" + lang] = {
      pattern: /[^]+/,
      inside: lang
    };
    return grammar;
  };
  var addInlined = (tagName, lang) => ({
    pattern: RegExp(`(<${tagName}[^>]*>)(?!</${tagName}>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])+?(?=</${tagName}>)`, "gi"),
    lookbehind: true,
    greedy: true,
    inside: addLang({
      "included-cdata": {
        pattern: /<!\[CDATA\[[^]*?\]\]>/i,
        inside: addLang({
          "cdata": /^<!\[CDATA\[|\]\]>$/i
        }, lang)
      }
    }, lang)
  });
  var addAttribute = (attrName, lang, alias = attrName) => ({
    pattern: RegExp(`([\\s"']${attrName}\\s*=\\s*)(?:"[^"]*"|'[^']*'|[^\\s>]+)`, "gi"),
    lookbehind: true,
    greedy: true,
    alias,
    inside: addLang({
      "punctuation": /^["']|["']$/
    }, lang)
  });
  var markup = languages.svg = languages.mathml = languages.html = languages.markup = clone2(languages.xml);
  markup.tag.inside["attr-value"].unshift(
    addAttribute("style", "css"),
    addAttribute("on[a-z]+", "javascript", "script")
  );
  insertBefore(markup, "cdata", {
    "style": addInlined("style", "css"),
    "script": addInlined("script", "javascript")
  });

  // node_modules/prism-code-editor/dist/prism/languages/csharp.js
  var keywordsToPattern = (words) => `\\b(?:${words})\\b`;
  var typeKeyword = "bool|char|decimal|double|dynamic|float|object|s?byte|string|u?int|u?long|u?short|var|void";
  var typeDeclarationKeyword = "class|enum|interface|record|struct";
  var contextualKeyword = "add|alias|and|ascending|async|await|by|descending|from(?!\\s*[^\\s\\w])|[gls]et|global|group|into|init(?=\\s*;)|join|nameof|not|notnull|on|or|orderby|partial|remove|select|unmanaged|value|when|where|with(?=\\s*{)";
  var otherKeyword = "abstract|as|[bc]ase|break|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|i[fns]|implicit|internal|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield";
  var typeDeclarationKeywords = keywordsToPattern(typeDeclarationKeyword);
  var keywords2 = RegExp(keywordsToPattern(typeKeyword + "|" + typeDeclarationKeyword + "|" + contextualKeyword + "|" + otherKeyword));
  var nonTypeKeywords = keywordsToPattern(typeDeclarationKeyword + "|" + contextualKeyword + "|" + otherKeyword);
  var nonContextualKeywords = keywordsToPattern(typeKeyword + "|" + typeDeclarationKeyword + "|" + otherKeyword);
  var generic = nested("<(?:[^<>;=*/%&|^+-]|<self>)*>", 2);
  var nestedRound = nested("\\((?:[^()]|<self>)*\\)", 2);
  var name = "@?\\b(?!\\d)\\w+\\b";
  var genericName = replace("<0>(?:\\s*<1>)?", [name, generic]);
  var identifier = replace("(?!<0>)<1>(?:\\s*\\.\\s*<1>)*", [nonTypeKeywords, genericName]);
  var array = "\\[\\s*(?:,\\s*)*\\]";
  var typeExpressionWithoutTuple = replace("<0>(?:\\s*(?:\\?\\s*)?<1>)*(?:\\s*\\?)?", [identifier, array]);
  var tupleElement = replace("[^()[\\],;%&|^=<>/*+-]|<0>|<1>|<2>", [generic, nestedRound, array]);
  var tuple = replace("\\(<0>+(?:,<0>+)+\\)", [tupleElement]);
  var typeExpression = replace("(?:<0>|<1>)(?:\\s*(?:\\?\\s*)?<2>)*(?:\\s*\\?)?", [tuple, identifier, array]);
  var typeInside = {
    "keyword": keywords2,
    "punctuation": /[()[\].,:<>?]/
  };
  var character = "'(?:\\\\.|[^\n'\\\\]|\\\\[Uux][a-fA-F\\d]{1,8})'";
  var regularString = '"(?:\\\\.|[^\\\\\n"])*"';
  var verbatimString = '@"(?:""|\\\\[\\s\\S]|[^\\\\"])*"(?!")';
  var regularStringOrCharacter = regularString + "|" + character;
  var regularStringCharacterOrComment = replace("/(?![*/])|//[^\n]*\n|/\\*(?:[^*]|\\*(?!/))*\\*/|<0>", [regularStringOrCharacter]);
  var roundExpression = nested(replace(`[^()"'/]|<0>|\\(<self>*\\)`, [regularStringCharacterOrComment]), 2);
  var attrTarget = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b";
  var attr = replace("<0>(?:\\s*\\(<1>*\\))?", [identifier, roundExpression]);
  var formatString = ":[^\n}]+";
  var mInterpolationRound = nested(replace(`[^()"'/]|<0>|\\(<self>*\\)`, [regularStringCharacterOrComment]), 2);
  var mInterpolation = replace("\\{(?!\\{)(?:(?![}:])<0>)*<1>?\\}", [mInterpolationRound, formatString]);
  var sInterpolationRound = nested(replace(`[^()"'/]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<0>|\\(<self>*\\)`, [regularStringOrCharacter]), 2);
  var sInterpolation = replace("\\{(?!\\{)(?:(?![}:])<0>)*<1>?\\}", [sInterpolationRound, formatString]);
  var createInterpolationInside = (interpolation10, interpolationRound) => ({
    "interpolation": {
      pattern: re("((?:^|[^{])(?:\\{\\{)*)<0>", [interpolation10]),
      lookbehind: true,
      inside: {
        "format-string": {
          pattern: re("(^\\{(?:(?![}:])<0>)*)<1>(?=\\}$)", [interpolationRound, formatString]),
          lookbehind: true,
          inside: {
            "punctuation": /^:/
          }
        },
        "punctuation": /^\{|\}$/,
        "expression": {
          pattern: /[^]+/,
          alias: "language-csharp",
          inside: "cs"
        }
      }
    },
    "string": /[^]+/
  });
  languages.dotnet = languages.cs = languages.csharp = {
    "comment": clikeComment(),
    "interpolation-string": [
      {
        pattern: re('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[\\s\\S]|\\{\\{|<0>|[^\\\\{"])*"', [mInterpolation], "g"),
        lookbehind: true,
        greedy: true,
        inside: createInterpolationInside(mInterpolation, mInterpolationRound)
      },
      {
        pattern: re('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<0>|[^\\\\"{])*"', [sInterpolation], "g"),
        lookbehind: true,
        greedy: true,
        inside: createInterpolationInside(sInterpolation, sInterpolationRound)
      }
    ],
    "char": {
      pattern: RegExp(character, "g"),
      greedy: true
    },
    "string": [
      {
        pattern: re("(^|[^$\\\\])<0>", [verbatimString], "g"),
        lookbehind: true,
        greedy: true
      },
      {
        pattern: re("(^|[^@$\\\\])<0>", [regularString], "g"),
        lookbehind: true,
        greedy: true
      }
    ],
    "namespace": {
      // namespace Foo.Bar {}
      // using Foo.Bar;
      pattern: re("(\\b(?:namespace|using)\\s+)<0>(?:\\s*\\.\\s*<0>)*(?=\\s*[;{])", [name]),
      lookbehind: true,
      inside: {
        "punctuation": /\./
      }
    },
    "type-expression": {
      // default(Foo), typeof(Foo<Bar>), sizeof(int)
      pattern: re("(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<0>)+(?=\\s*\\))", [nestedRound]),
      lookbehind: true,
      alias: "class-name",
      inside: typeInside
    },
    "return-type": {
      // Foo<Bar> ForBar(); Foo IFoo.Bar() => 0
      // int this[int index] => 0; T IReadOnlyList<T>.this[int index] => this[index];
      // int Foo => 0; int Foo { get; set } = 0;
      pattern: re("<0>(?=\\s+(?:<1>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [typeExpression, identifier]),
      alias: "class-name",
      inside: typeInside
    },
    "constructor-invocation": {
      // new List<Foo<Bar[]>> { }
      pattern: re("(\\bnew\\s+)<0>(?=\\s*[[({])", [typeExpression]),
      lookbehind: true,
      alias: "class-name",
      inside: typeInside
    },
    /*'explicit-implementation': {
    	// int IFoo<Foo>.Bar => 0; void IFoo<Foo<Foo>>.Foo<T>();
    	pattern: replace(/\b<0>(?=\.<1>)/, className, methodOrPropertyDeclaration),
    	inside: classNameInside,
    	alias: 'class-name'
    },*/
    "generic-method": {
      // foo<Bar>()
      pattern: re("<0>\\s*<1>(?=\\s*\\()", [name, generic]),
      inside: {
        "function": re("^<0>", [name]),
        "generic": {
          pattern: RegExp(generic),
          alias: "class-name",
          inside: typeInside
        }
      }
    },
    "type-list": {
      // The list of types inherited or of generic constraints
      // class Foo<F> : Bar, IList<FooBar>
      // where F : Bar, IList<int>
      pattern: re(
        "\\b((?:<0>\\s+<1>|record\\s+<1>\\s*<5>|where\\s+<2>)\\s*:\\s*)(?:<3>|<4>|<1>\\s*<5>|<6>)(?:\\s*,\\s*(?:<3>|<4>|<6>))*(?=\\s*(?:where|[{;]|=>|$))",
        [typeDeclarationKeywords, genericName, name, typeExpression, keywords2.source, nestedRound, "\\bnew\\s*\\(\\s*\\)"]
      ),
      lookbehind: true,
      inside: {
        "record-arguments": {
          pattern: re("(^(?!new\\s*\\()<0>\\s*)<1>", [genericName, nestedRound], "g"),
          lookbehind: true,
          greedy: true,
          inside: "cs"
        },
        "keyword": keywords2,
        "class-name": {
          pattern: RegExp(typeExpression, "g"),
          greedy: true,
          inside: typeInside
        },
        "punctuation": /[(),]/
      }
    },
    "preprocessor": {
      pattern: /(^[ 	]*)#.*/m,
      lookbehind: true,
      alias: "property",
      inside: {
        // highlight preprocessor directives as keywords
        "directive": {
          pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
          lookbehind: true,
          alias: "keyword"
        }
      }
    },
    "attribute": {
      // Attributes
      // [Foo], [Foo(1), Bar(2, Prop = "foo")], [return: Foo(1), Bar(2)], [assembly: Foo(Bar)]
      pattern: re("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<0>\\s*:\\s*)?<1>(?:\\s*,\\s*<1>)*(?=\\s*\\])", [attrTarget, attr], "g"),
      lookbehind: true,
      greedy: true,
      inside: {
        "target": {
          pattern: re("^<0>(?=\\s*:)", [attrTarget]),
          alias: "keyword"
        },
        "attribute-arguments": {
          pattern: re("\\(<0>*\\)", [roundExpression]),
          inside: "cs"
        },
        "class-name": {
          pattern: RegExp(identifier),
          inside: {
            "punctuation": /\./
          }
        },
        "punctuation": /[,:]/
      }
    },
    "class-name": [
      {
        // Using static
        // using static System.Math;
        pattern: re("(\\busing\\s+static\\s+)<0>(?=\\s*;)", [identifier]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Using alias (type)
        // using Project = PC.MyCompany.Project;
        pattern: re("(\\busing\\s+<0>\\s*=\\s*)<1>(?=\\s*;)", [name, typeExpression]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Using alias (alias)
        // using Project = PC.MyCompany.Project;
        pattern: re("(\\busing\\s+)<0>(?=\\s*=)", [name]),
        lookbehind: true
      },
      {
        // Type declarations
        // class Foo<A, B>
        // interface Foo<out A, B>
        pattern: re("(\\b<0>\\s+)<1>", [typeDeclarationKeywords, genericName]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Single catch exception declaration
        // catch(Foo)
        // (things like catch(Foo e) is covered by variable declaration)
        pattern: re("(\\bcatch\\s*\\(\\s*)<0>", [identifier]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Name of the type parameter of generic constraints
        // where Foo : class
        pattern: re("(\\bwhere\\s+)<0>", [name]),
        lookbehind: true
      },
      {
        // Casts and checks via as and is.
        // as Foo<A>, is Bar<B>
        // (things like if(a is Foo b) is covered by variable declaration)
        pattern: re("(\\b(?:is(?:\\s+not)?|as)\\s+)<0>", [typeExpressionWithoutTuple]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Variable, field and parameter declaration
        // (Foo bar, Bar baz, Foo[,,] bay, Foo<Bar, FooBar<Bar>> bax)
        pattern: re("\\b<0>(?=\\s+(?!<1>|with\\s*\\{)<2>(?:\\s*[=,:;{)\\]]|\\s+(?:in|when)\\b))", [typeExpression, nonContextualKeywords, name]),
        inside: typeInside
      }
    ],
    "keyword": keywords2,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "range": {
      pattern: /\.\./,
      alias: "operator"
    },
    // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#literals
    "number": /(?:\b0(?:x[a-f\d_]*[a-f\d]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[+-]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
    "operator": /[=-]>|([&|+-])\1|~|\?\?=?|>>=?|<<=?|[%&|^!=<>/*+-]=?/,
    "named-parameter": {
      pattern: re("([(,]\\s*)<0>(?=\\s*:)", [name]),
      lookbehind: true,
      alias: "punctuation"
    },
    "punctuation": /\?\.?|::|[()[\]{}.,:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/aspnet.js
  var pageDirectiveInside = {
    "page-directive": {
      pattern: /<%\s*@\s*(?:assembly|control|implements|import|master(?:type)?|outputcache|page|previouspagetype|reference|register)?|%>/i,
      alias: "tag"
    }
  };
  var aspnet = languages.aspnet = clone2(languages.html);
  var tag2 = aspnet.tag;
  var directive2 = {
    pattern: /<%.*%>/,
    alias: "tag",
    inside: {
      "directive": {
        pattern: /<%\s*?[$=%#:]{0,2}|%>/,
        alias: "tag"
      },
      [rest]: "cs"
    }
  };
  insertBefore(aspnet, "markup-bracket", {
    "page-directive": {
      pattern: /<%\s*@.*%>/,
      alias: "tag",
      inside: pageDirectiveInside
    },
    "directive": directive2
  });
  pageDirectiveInside[rest] = tag2.inside;
  tag2.inside["attr-value"][2].inside["directive"] = directive2;
  insertBefore(aspnet, "comment", {
    "asp-comment": {
      pattern: /<%--[^]*?--%>/,
      alias: "asp comment"
    }
  });
  insertBefore(aspnet, "script", {
    "asp-script": {
      pattern: /(<script(?=.*runat=["']?server\b)[^>]*>)(?!<\/script>)[^]+?(?=<\/script>)/i,
      lookbehind: true,
      alias: "language-csharp",
      inside: "cs"
    }
  });

  // node_modules/prism-code-editor/dist/jsx-shared-Dd7t2otl.js
  var space = "\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))*\\*/";
  var braces = "\\{(?:[^{}]|\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\})*\\}";
  var isText = (token) => token && (!token.type || token.type == "plain-text");
  var tokenizer = (code, grammar) => {
    var position = 0, tokens = withoutTokenizer(code, grammar);
    var i = 0, openedTags = [], l = 0;
    for (; i < tokens.length; i++, position += length) {
      var token = tokens[i];
      var length = token.length;
      var type5 = token.type;
      var notTagNorBrace = !type5;
      var last, tag9, start2, plainText, content2;
      if (type5) {
        content2 = token.content;
        if (type5 == "tag") {
          start2 = content2[0].length;
          tag9 = content2[2] ? code.substr(position + start2, content2[1].length) : "";
          if (start2 > 1) {
            if (l && openedTags[l - 1][0] == tag9) {
              l--;
            }
          } else {
            if (content2[content2.length - 1].length < 2) {
              openedTags[l++] = [tag9, 0];
            }
          }
        } else if (l && type5 == "punctuation") {
          last = openedTags[l - 1];
          if (content2 == "{") last[1]++;
          else if (last[1] && content2 == "}") last[1]--;
          else {
            notTagNorBrace = !"}()[]".includes(content2);
          }
        } else {
          notTagNorBrace = true;
        }
      }
      if (notTagNorBrace && l && !openedTags[l - 1][1]) {
        start2 = position;
        if (isText(tokens[i + 1])) {
          length += tokens[i + 1].length;
          tokens.splice(i + 1, 1);
        }
        if (isText(tokens[i - 1])) {
          start2 -= tokens[--i].length;
          tokens.splice(i, 1);
        }
        plainText = code.slice(start2, position + length);
        tokens[i] = new Token("plain-text", plainText, plainText);
      }
    }
    return tokens;
  };
  var addJsxTag = (grammar, name2) => {
    insertBefore(languages[name2] = grammar = clone2(grammar), "regex", {
      "tag": {
        pattern: re(
          `</?(?:(?!\\d)[^\\s%=<>/]+(?:<0>(?:<0>*(?:[^\\s{=<>/*]+(?:<0>*=<0>*(?!\\s)(?:"[^"]*"|'[^']*'|<1>)?|(?=[\\s/>]))|<1>))*)?<0>*/?)?>`,
          [space, braces],
          "g"
        ),
        greedy: true,
        inside: {
          "punctuation": /^<\/?|\/?>$/,
          "tag": {
            pattern: /^[^\s/<]+/,
            inside: {
              "namespace": /^[^:]+:/,
              "class-name": /^[A-Z]\w*(?:\.[A-Z]\w*)*$/
            }
          },
          "attr-value": {
            pattern: re(`(=<0>*)(?:"[^"]*"|'[^']*')`, [space]),
            lookbehind: true,
            inside: {
              "punctuation": /^["']|["']$/
            }
          },
          "expression": {
            pattern: RegExp(braces, "g"),
            greedy: true,
            alias: "language-" + name2,
            inside: grammar
          },
          "comment": grammar["comment"],
          "attr-equals": /=/,
          "attr-name": {
            pattern: /\S+/,
            inside: {
              "namespace": /^[^:]+:/
            }
          }
        }
      }
    });
    grammar[tokenize] = tokenizer;
    return grammar;
  };

  // node_modules/prism-code-editor/dist/markup-shared-D_TTcCGm.js
  var addInlined2 = (tagName, tagInside5, getLang) => ({
    pattern: RegExp(`<${tagName}(?:\\s[^>]*)?>[^]*?</${tagName}\\s*>`, "g"),
    greedy: true,
    inside: {
      "code-block": {
        pattern: /(>)[^]+(?=<)/,
        lookbehind: true
      },
      "tag": {
        pattern: /[^>]+>/,
        inside: tagInside5
      },
      [tokenize]: (code, grammar) => {
        grammar["code-block"].alias = "language-" + (grammar["code-block"].inside = getLang(code));
        return withoutTokenizer(code, grammar);
      }
    }
  });
  var astroTag = (expression16) => ({
    pattern: re(
      `</?(?:(?!\\d)[^\\s%=<>/]+(?:\\s(?:\\s*[^\\s{=<>/]+(?:\\s*=\\s*(?!\\s)(?:"[^"]*"|'[^']*'|[^\\s{=<>/"']+(?=[\\s/>])|<0>)?|(?=[\\s/>]))|\\s*<0>)*)?\\s*/?)?>`,
      [braces],
      "g"
    ),
    greedy: true,
    inside: {
      "punctuation": /^<\/?|\/?>$/,
      "tag": {
        pattern: /^\S+/,
        inside: {
          "namespace": /^[^:]+:/,
          "class-name": /^[A-Z]\w*(?:\.[A-Z]\w*)*$/
        }
      },
      "attr-value": {
        pattern: /(=\s*)(?:"[^"]*"|'[^']*'|[^\s>{]+)/,
        lookbehind: true,
        inside: {
          "punctuation": /^["']|["']$/
        }
      },
      "expression": expression16,
      "attr-equals": /=/,
      "attr-name": {
        pattern: /\S+/,
        inside: {
          "namespace": /^[^:]+:/
        }
      }
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/astro.js
  var expression = {
    pattern: RegExp(braces, "g"),
    greedy: true,
    alias: "language-tsx",
    inside: "tsx"
  };
  var tag3 = astroTag(expression);
  var tagInside = tag3.inside;
  languages.astro = {
    "comment": xmlComment,
    "front-matter-block": {
      pattern: /^---(?!.)[^]*?\n---/g,
      greedy: true,
      inside: {
        "punctuation": /^---|---$/,
        "language-typescript": {
          pattern: /[^]+/,
          inside: "ts"
        }
      }
    },
    "script": addInlined2("script", tagInside, (code) => {
      return /^[^>]+?[\s"'}]is:inline\b/.test(code) ? "javascript" : "typescript";
    }),
    "style": addInlined2("style", tagInside, (code) => {
      var _a;
      return ((_a = /^[^>]+?[\s"'}]lang\s*=\s*(["'])(less|s[ac]ss|stylus)\1/.exec(code)) == null ? void 0 : _a[2]) || "css";
    }),
    "expression": expression,
    "tag": tag3,
    "entity": entity
  };

  // node_modules/prism-code-editor/dist/prism/languages/autohotkey.js
  languages.autohotkey = {
    "comment": [
      {
        pattern: /(^|\s);.*/,
        lookbehind: true
      },
      {
        pattern: /((?:^|\n)[ 	]*)\/\*[^]*?(?:\n[ 	]*\*\/|$)/g,
        lookbehind: true,
        greedy: true
      }
    ],
    "tag": {
      // labels
      pattern: /^([ 	]*)[^\s,`":]+(?=:[ 	]*$)/m,
      lookbehind: true
    },
    "string": /"(?:[^\n"]|"")*"/,
    "variable": /%\w+%/,
    "number": /\b0x[a-fA-F\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
    "operator": /\?|:=|--|\+\+|\*\*|&&|<>|(?:\|\||\/\/|<<|>>|[~.&|^!=<>/*+-])=?|\b(?:AND|NOT|OR)\b/,
    "boolean": boolean,
    "command": {
      pattern: /\b(?:autotrim|blockinput|break|click|clipwait|continue|control(?:click|focus|get|getfocus|getpos|[gs]ettext|move|send|sendraw)?|coordmode|critical|detecthiddentext|detecthiddenwindows|drive|driveget|drivespacefree|envadd|envdiv|envget|envmult|envset|envsub|envupdate|exit|exitapp|file(?:append|copy|copydir|createdir|createshortcut|delete|encoding|[gs]etattrib|getshortcut|getsize|[gs]ettime|getversion|install|move|movedir|read|readline|recycle|recycleempty|removedir|selectfile|selectfolder)|formattime|getkeystate|gosub|goto|groupactivate|groupadd|groupclose|groupdeactivate|gui|guicontrol|guicontrolget|hotkey|imagesearch|inidelete|iniread|iniwrite|input|inputbox|keywait|listhotkeys|listlines|listvars|loop|menu|mouseclick|mouseclickdrag|mousegetpos|mousemove|msgbox|onexit|outputdebug|pause|pixelgetcolor|pixelsearch|postmessage|process|progress|random|regdelete|regread|regwrite|reload|repeat|return|run|runas|runwait|send(?:event|input|message|mode|play|raw)?|set(?:batchlines|capslockstate|controldelay|defaultmousespeed|env|format|keydelay|mousedelay|numlockstate|regview|scrolllockstate|storecapslockmode|timer|titlematchmode|windelay|workingdir)|shutdown|sleep|sort|sound(?:beep|[gs]et|[gs]etwavevolume|play)|splashimage|splashtextoff|splashtexton|splitpath|statusbargettext|statusbarwait|string(?:casesense|getpos|left|len|lower|mid|replace|right|split|trimleft|trimright|upper)|suspend|sysget|thread|tooltip|transform|traytip|urldownloadtofile|win(?:activate|activatebottom|close|[gs]et|getactivestats|getactivetitle|getclass|getpos|gettext|[gs]ettitle|hide|kill|maximize|menuselectitem|minimize|minimizeall|minimizeallundo|move|restore|show|wait|waitactive|waitclose|waitnotactive))\b/i,
      alias: "selector"
    },
    "constant": /\b(?:a_(?:ahkpath|ahkversion|appdata|appdatacommon|autotrim|batchlines|caret[xy]|computername|controldelay|cursor|ddd?d?|defaultmousespeed|desktop|desktopcommon|detecthiddentext|detecthiddenwindows|endchar|eventinfo|exitreason|fileencoding|formatfloat|formatinteger|gui|guicontrol|guicontrolevent|guievent|guiheight|guiwidth|gui[xy]|hour|iconfile|iconhidden|iconnumber|icontip|index|ipaddress[1-4]|is64bitos|isadmin|iscompiled|iscritical|ispaused|issuspended|isunicode|keydelay|language|lasterror|linefile|linenumber|loopfield|loopfile(?:attrib|dir|ext|fullpath|longpath|name|shortname|shortpath|size[km]b|size|timeaccessed|timecreated|timemodified)|loopreadline|loopregkey|loopregname|loopregsubkey|loopregtimemodified|loopregtype|[mwy]day|min|mmm?m?|mon|mousedelay|m?sec|mydocuments|now|nowutc|numbatchlines|ostype|osversion|priorhotkey|priorkey|programfiles|programs|programscommon|ptrsize|regview|screendpi|screenheight|screenwidth|scriptdir|scriptfullpath|scripthwnd|scriptname|space|startmenu|startmenucommon|startup|startupcommon|stringcasesense|tab|temp|this(?:func|hotkey|label|menu|menuitem|menuitempos)|tickcount|timeidle|timeidlephysical|timesincepriorhotkey|timesincethishotkey|titlematchmode|titlematchmodespeed|username|windelay|windir|workingdir|year|yweek|yyyy)|clipboard|clipboardall|comspec|errorlevel|programfiles)\b/i,
    "builtin": /\b(?:abs|a?cos|asc|a?sin|a?tan|ceil|chr|class|comobj(?:active|array|connect|create|error|flags|get|query|type|value)|dllcall|exp|fileexist|fileopen|floor|format|il_add|il_create|il_destroy|instr|isfunc|islabel|isobject|ln|log|[lr]trim|lv_(?:add|delete|deletecol|getcount|get[nt]ext|insert|insertcol|modify|modifycol|setimagelist)|mod|numget|numput|onmessage|regexmatch|regexreplace|registercallback|round|sb_seticon|sb_setparts|sb_settext|sqrt|strlen|strreplace|strsplit|substr|tv_(?:add|delete|get|getchild|getcount|get[nt]ext|getparent|getprev|getselection|modify)|varsetcapacity|winactive|winexist|__call|__[gs]et|__new)\b/i,
    "symbol": /\b(?:alt|altdown|altup|appskey|backspace|browser_(?:back|favorites|forward|home|refresh|search|stop)|bs|capslock|ctrl|ctrlbreak|ctrldown|ctrlup|del|delete|down|end|enter|esc|escape|f[01]\d|f2[0-4]?|f\d|home|ins|insert|joy[012]\d|joy3[012]?|joy\d|joyaxes|joybuttons|joyinfo|joyname|joypov|joy[ruvxyz]|[lr]alt|launch_app[12]|launch_mail|launch_media|[lmrx]button|[lr]control|[lr]ctrl|left|[lr]?shift|[lr]win|[lr]windown|[rl]winup|media_next|media_play_pause|media_prev|media_stop|numlock|numpad(?:\d|add|clear|del|div|dot|down|end|enter|home|ins|left|mult|pgdn|pgup|right|sub|up)|pgdn|pgup|printscreen|right|scrolllock|shift|shiftdown|shiftup|space|tab|up|volume_down|volume_mute|volume_up|wheeldown|wheelleft|wheelright|wheelup|xbutton[12])\b/i,
    "directive": {
      pattern: /#[a-z]+\b/i,
      alias: "important"
    },
    "keyword": /\b(?:abort|abovenormal|add|ahk_class|ahk_exe|ahk_group|ahk_id|ahk_pid|all|alnum|alpha|altsubmit|alttab|alttabandmenu|alttabmenu|alttabmenudismiss|alwaysontop|autosize|background|backgroundtrans|belownormal|between|bitand|bitnot|bitshiftleft|bitshiftright|bitx?or|bold|border|button|byref|catch|checkbox|checked|checkedgray|choose|choosestring|close|color|combobox|contains|controllist|count|date|datetime|days|ddl|default|deleteall|delimiter|deref|destroy|disabled?|dropdownlist|edit|eject|else|enabled?|error|exist|expand|exstyle|filesystem|finally|first|flash|float|floatfast|focus|font|for|global|grid|group|groupbox|guiclose|guicontextmenu|guidropfiles|guiescape|guisize|hdr|hidden|hide|high|hkc[cru]|hkey_(?:classes_root|current_config|current_user|local_machine|users)|hklm|hku|hours|[hv]scroll|icon|iconsmall|i[dfns]|idlast|if(?:equal|exist|greater|greaterorequal|instring|less|lessorequal|msgbox|notequal|notexist|notinstring|winactive|winexist|winnotactive|winnotexist)|ignore|imagelist|integer|integerfast|interrupt|italic|join|label|lastfound|lastfoundexist|limit|lines|list|listbox|listview|local|lock|logoff|low|lower|lowercase|mainwindow|margin|maximize|maximizebox|maxsize|minimize|minimizebox|minmax|minsize|minutes|monthcal|mouse|move|multi|na|noactivate|nodefault|nohide|noicon|nomainwindow|norm|normal|nosort|nosorthdr|nostandard|not?|notab|notimers|number|off|ok|on|owndialogs|owner|parse|password|picture|pixel|po[sw]|priority|processname|radio|range|read|readonly|realtime|redraw|region|reg_binary|reg_dword|reg_expand_sz|reg_multi_sz|reg_sz|relative|rename|report|resize|restore|retry|rgb|screen|seconds|section|serial|setlabel|shiftalttab|show|single|slider|sortdesc|standard|static|status|statusbar|statuscd|strike|style|submit|sysmenu|tab2|tabstop|text|theme|throw|tile|togglecheck|toggleenable|toolwindow|top|topmost|transcolor|transparent|tra?y|treeview|tryagain|type|uncheck|underline|unicode|unlock|until|updown|upper|uppercase|useerrorlevel|vis|visfirst|visible|wait|waitclose|wantctrla|wantf2|wantreturn|while|wrap|x?digit|[xy][mps]|yes)\b/i,
    "function": /[^(); 	,\n*=?>:\\/<&%[\]+-]+(?=\()/,
    "punctuation": /[()[\]{},:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/autoit.js
  languages.autoit = {
    "comment": {
      // The multi-line comments delimiters can actually be commented out with ";"
      pattern: /;.*|(^[ 	]*)#(?:comments-start|cs)[^]*?^[ 	]*#(?:ce|comments-end)/m,
      lookbehind: true
    },
    "url": {
      pattern: /(^[ 	]*#include\s+)(?:<[^\n>]+>|"[^\n"]+")/m,
      lookbehind: true
    },
    "string": {
      pattern: /"(?:""|[^\n"])*"|'(?:''|[^\n'])*'/g,
      greedy: true,
      inside: {
        "variable": /([%$@])\w+\1/
      }
    },
    "directive": {
      pattern: /(^[ 	]*)#[\w-]+/m,
      lookbehind: true,
      alias: "keyword"
    },
    "function": /\b\w+(?=\()/,
    // Variables and macros
    "variable": /[$@]\w+/,
    "keyword": /\b(?:case|const|continue(?:case|loop)|default|dim|do|elseif|else|end(?:func|if|select|switch|with)|enum|exitloop|exit|for|func|global|if|in|local|next|null|redim|select|static|step|switch|then|to|until|volatile|wend|while|with)\b/i,
    "number": /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
    "boolean": /\b(?:false|true)\b/i,
    "operator": /<[=>]?|[=>&/*+-]=?|[?^]|\b(?:and|not|or)\b/i,
    "punctuation": /[()[\].,:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/avisynth.js
  var types = "bool|clip|float|int|string|val";
  var allinternals = "is(?:bool|clip|float|int|string)|defined|(?:(?:internal)?function|var)?exists?|apply|assert|default|eval|import|nop|select|undefined|opt_(?:allowfloataudio|avipadscanlines|dwchannelmask|enable_(?:b64a|planartopackedrgb|v210|y3_10_10|y3_10_16)|usewaveextensible|vdubplanarhack)|set(?:cachemode|maxcpu|memorymax|planarlegacyalignment|workingdir)|hex(?:value)?|value|abs|ceil|continued(?:denominator|numerator)?|exp|floor|fmod|frac|log(?:10)?|max|min|muldiv|pi|pow|rand|round|sign|spline|sqrt|a?sinh?|a?cosh?|a?tan[2h]?|(?:bit(?:and|not|x?or|[lr]?shift[aslu]?|sh[lr]|sa[lr]|[lr]rotatel?|ro[rl]|te?st|set(?:count)?|cl(?:ea)?r|ch(?:an)?ge?))|average(?:[bgr]|chroma[uv]|luma)|(?:[rgb]|chroma[uv]|luma|rgb|[yuv](?=difference(?:fromprevious|tonext)))difference(?:fromprevious|tonext)?|[yuvrgb]plane(?:median|min|max|minmaxdifference)|getprocessinfo|logmsg|script(?:dir(?:utf8)?|file(?:utf8)?|name(?:utf8)?)|setlogparams|chr|(?:fill|find|left|mid|replace|rev|right)str|format|[lu]case|ord|str(?:cmpi?|fromutf8|len|toutf8)|time|trim(?:all|left|right)|isversionorgreater|version(?:number|string)|buildpixeltype|colorspacenametopixeltype|addautoloaddir|on(?:cpu|cuda)|prefetch|setfiltermtmode|has(?:audio|video)|height|width|frame(?:count|rate(?:denominator|numerator)?)|getparity|is(?:field|frame)based|bitspercomponent|componentsize|hasalpha|is(?:planar(?:rgba?)?|interleaved|rgb(?:24|32|48|64)?|y(?:8|u(?:va?|y2))?|yv(?:12|16|24|411)|420|422|444|packedrgb)|numcomponents|pixeltype|audio(?:bits|channels|duration|length(?:[fs]|hi|lo)?|rate)|isaudio(?:float|int)|avi(?:file)?source|directshowsource|image(?:reader|source|sourceanim)|opendmlsource|segmented(?:avisource|directshowsource)|wavsource|coloryuv|convertbacktoyuy2|convertto(?:RGB(?:24|32|48|64)|(?:planar)?RGBA?|Y8?|YV(?:12|16|24|411)|YUVA?(?:411|420|422|444)|YUY2)|fixluminance|gr[ae]yscale|invert|levels|limiter|mergea?rgb|merge(?:chroma|luma)|rgbadjust|show(?:alpha|blue|green|red)|swapuv|tweak|[uv]toy8?|ytouv|(?:colorkey|reset)mask|layer|mask(?:hs)?|merge|overlay|subtract|addborders|(?:bicubic|bilinear|blackman|gauss|lanczos4|lanczos|point|sinc|spline(?:16|36|64))resize|crop(?:bottom)?|flip(?:horizontal|vertical)|(?:horizontal|vertical)?reduceby2|letterbox|skewrows|turn(?:180|left|right)|blur|fixbrokenchromaupsampling|generalconvolution|(?:spatial|temporal)soften|sharpen|trim|(?:un)?alignedsplice|(?:assume|assumescaled|change|convert)FPS|(?:delete|duplicate)frame|dissolve|fade(?:in|io|out)[02]?|freezeframe|interleave|loop|reverse|select(?:even|odd|(?:range)?every)|assume[bt]ff|assume(?:field|frame)based|bob|complementparity|doubleweave|peculiarblend|pulldown|separate(?:columns|fields|rows)|swapfields|weave(?:columns|rows)?|amplify(?:db)?|assumesamplerate|audiodub(?:ex)?|audiotrim|convertaudioto(?:(?:8|16|24|32)bit|float)|converttomono|delayaudio|ensurevbrmp3sync|get(?:left|right)?channel|kill(?:audio|video)|mergechannels|mixaudio|monotostereo|normalize|resampleaudio|ssrc|supereq|timestretch|animate|applyrange|conditional(?:filter|reader|select)|frameevaluate|scriptclip|tcp(?:server|source)|writefile(?:end|if|start)?|imagewriter|blackness|blankclip|colorbars(?:hd)?|compare|dumpfiltergraph|echo|histogram|info|messageclip|preroll|setgraphanalysis|show(?:framenumber|smpte|time)|showfiveversions|stack(?:horizontal|vertical)|subtitle|tone|version";
  languages.avs = languages.avisynth = {
    "comment": {
      pattern: /#.*|\/\*[^]*?(?:\*\/|$)|\[\*(?:[^\[*]|\[(?!\*)|\*(?!\])|\[\*(?:[^\[*]|\[(?!\*)|\*(?!\]))*\*\])*\*\]/g,
      greedy: true
    },
    // Handle before strings because optional arguments are surrounded by double quotes
    "argument": {
      pattern: re('\\b<0>\\s+("?)\\w+\\1', [types], "i"),
      inside: {
        "keyword": /^\w+/
      }
    },
    // Optional argument assignment
    "argument-label": {
      pattern: /([,(][\s\\]*)\w+\s*=(?!=)/,
      lookbehind: true,
      inside: {
        "argument-name": {
          pattern: /\w+/,
          alias: "punctuation"
        },
        "punctuation": /=/
      }
    },
    "string": [
      {
        // triple double-quoted
        pattern: /"""[^]*?"""/g,
        greedy: true
      },
      {
        // single double-quoted
        pattern: /"(?:\\[^]|[^\\\n"])*"/g,
        greedy: true,
        inside: {
          "constant": {
            // These *are* case-sensitive!
            pattern: /\b(?:DEFAULT_MT_MODE|(?:MAINSCRIPT|PROGRAM|SCRIPT)DIR|(?:MACHINE|USER)_(?:CLASSIC|PLUS)_PLUGINS)\b/
          }
        }
      }
    ],
    // The special "last" variable that takes the value of the last implicitly returned clip
    "variable": /\b(?:last)\b/i,
    "boolean": /\b(?:false|true|no|yes)\b/i,
    "keyword": /\b(?:catch|else|for|function|global|if|return|try|while|__end__)\b/i,
    "constant": /\bMT_(?:MULTI_INSTANCE|NICE_FILTER|SERIALIZED|SPECIAL_MT)\b/,
    // AviSynth's internal functions, filters, and properties
    "builtin-function": {
      pattern: re("\\b<0>\\b", [allinternals], "i"),
      alias: "function"
    },
    "type-cast": {
      pattern: re("\\b<0>(?=\\s*\\()", [types], "i"),
      alias: "keyword"
    },
    // External/user-defined filters
    "function": {
      pattern: /\b[a-z_]\w*(?=\s*\()|(\.)[a-z_]\w*\b/i,
      lookbehind: true
    },
    // Matches a \ as the first or last character on a line
    "line-continuation": {
      pattern: /(^[ 	]*)\\|\\(?=[ 	]*$)/m,
      lookbehind: true,
      alias: "punctuation"
    },
    "number": /\B\$(?:[a-f\d]{6}|[a-f\d]{8})\b|(?:(?:\b|\B-)\d+(?:\.\d*)?\b|\B\.\d+\b)/i,
    "operator": /\+\+?|[!=<>]=?|&&|\|\||[?:%/*-]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/avro-idl.js
  languages.avdl = languages["avro-idl"] = {
    "comment": clikeComment(),
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^\\\n"])*"/g,
      lookbehind: true,
      greedy: true
    },
    "annotation": {
      pattern: /@(?:[$\w.-]|`[^\n`]+`)+/g,
      greedy: true,
      alias: "function"
    },
    "function-identifier": {
      pattern: /`[^\n`]+`(?=\s*\()/g,
      greedy: true,
      alias: "function"
    },
    "identifier": {
      pattern: /`[^\n`]+`/g,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:enum|error|protocol|record|throws)\b\s+)[$\w]+/g,
      lookbehind: true,
      greedy: true
    },
    "keyword": /\b(?:array|boolean|bytes|date|decimal|double|enum|error|false|true|fixed|float|idl|import|int|local_timestamp_ms|long|map|null|oneway|protocol|record|schema|string|throws|time_ms|timestamp_ms|union|uuid|void)\b/,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "number": [
      {
        pattern: /(^|[^\w.])-?(?:(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|0x(?:[a-f\d]+(?:\.[a-f\d]*)?|\.[a-f\d]+)(?:p[+-]?\d+)?)[dfl]?(?![\w.])/i,
        lookbehind: true
      },
      /-?\b(?:Infinity|NaN)\b/
    ],
    "operator": /=/,
    "punctuation": /[()[\]{}<>.,:;-]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/awk.js
  languages.gawk = languages.awk = {
    "hashbang": {
      pattern: /^#!.*/g,
      greedy: true,
      alias: "comment"
    },
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^\\\n"])*"/g,
      lookbehind: true,
      greedy: true
    },
    "regex": {
      pattern: /((?:^|[^\w\s)])\s*)\/(?:\\.|[^\\\n/])*\//g,
      lookbehind: true,
      greedy: true
    },
    "variable": /\$\w+/,
    "keyword": /\b(?:BEGIN|BEGINFILE|END|ENDFILE|break|case|continue|default|delete|do|else|exit|for|function|getline|if|in|next|nextfile|printf?|return|switch|while)\b|@(?:include|load)\b/,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "number": /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[a-fA-F\d]+)\b/,
    "operator": /--|\+\+|!?~|>&|>>|<<|(?:\*\*|[%^!=<>/*+-])=?|&&|\|[|&]|[?:]/,
    "punctuation": /[()[\]{},;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/bash.js
  var envVars = "\\b(?:BASH(?:OPTS|_ALIASES|_ARG[CV]|_CMDS|_COMPLETION_COMPAT_DIR|_LINENO|_REMATCH|_SOURCE|_VERSINFO|_VERSION)?|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|E?UID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_(?:ADDRESS|ALL|IDENTIFICATION|MEASUREMENT|MONETARY|NAME|NUMERIC|PAPER|TELEPHONE|TIME)|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS[1-4]|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_(?:CONFIG_DIRS|CURRENT_DESKTOP|DATA_DIRS|GREETER_DATA_DIR|MENU_PREFIX|RUNTIME_DIR|SEAT|SEAT_PATH|SESSION_DESKTOP|SESSION_ID|SESSION_PATH|SESSION_TYPE|VTNR)|XMODIFIERS)\\b";
  var commandAfterHeredoc = {
    pattern: /(^(["']?)\w+\2)[ 	]+\S.*/,
    lookbehind: true,
    alias: "punctuation"
    // this looks reasonably well in all themes
  };
  var variableInside = {
    "variable": /^\$\(|^`|\)$|`$/
  };
  var insideString = {
    "bash": commandAfterHeredoc,
    "environment": {
      pattern: RegExp("\\$" + envVars),
      alias: "constant"
    },
    "variable": [
      // [0]: Arithmetic Environment
      {
        pattern: /\$?\(\([^]*?\)\)/g,
        greedy: true,
        inside: {
          // If there is a $ sign at the beginning highlight $(( and )) as variable
          "variable": [
            {
              pattern: /(^\$[^]+)../,
              lookbehind: true
            },
            /^\$\(\(/
          ],
          "number": /\b0x[a-fA-F\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
          // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
          "operator": /--|\+\+|&&|\|\||(?:\*\*|<<|>>|[%&|^!=<>/*+-])=?|[?:~]/,
          // If there is no $ sign at the beginning highlight (( and )) as punctuation
          "punctuation": /\(\(?|\)\)?|,|;/
        }
      },
      // [1]: Command Substitution
      {
        pattern: /\$\((?:[^()]|\([^)]*\))*\)|`[^`]+`/g,
        greedy: true,
        inside: variableInside
      },
      // [2]: Brace expansion
      {
        pattern: /\$\{[^}]*\}/g,
        greedy: true,
        inside: {
          "operator": /:[?=+-]?|[!/]|##?|%%?|\^\^?|,,?/,
          "punctuation": /[[\]]/,
          "environment": {
            pattern: RegExp("(\\{)" + envVars),
            lookbehind: true,
            alias: "constant"
          }
        }
      },
      /\$(?:\w+|[#?*!@$])/
    ],
    // Escape sequences from echo and printf's manuals, and escaped quotes.
    "entity": /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[a-fA-F\d]{8}|u[a-fA-F\d]{4}|x[a-fA-F\d]{1,2})/
  };
  var bash = commandAfterHeredoc.inside = languages.sh = languages.shell = languages.bash = {
    "shebang": {
      pattern: /^#!\s*\/.*/,
      alias: "important"
    },
    "comment": {
      pattern: /(^|[^"{\\$])#.*/,
      lookbehind: true
    },
    "function-name": [
      // a) function foo {
      // b) foo() {
      // c) function foo() {
      // but not “foo {”
      {
        // a) and c)
        pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: true,
        alias: "function"
      },
      {
        // b)
        pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
        alias: "function"
      }
    ],
    // Highlight variable names as variables in for and select beginnings.
    "for-or-select": {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      lookbehind: true,
      alias: "variable"
    },
    // Highlight variable names as variables in the left-hand part
    // of assignments (“=” and “+=”).
    "assign-left": {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
      lookbehind: true,
      alias: "variable",
      inside: {
        "environment": {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
          lookbehind: true,
          alias: "constant"
        }
      }
    },
    // Highlight parameter names as variables
    "parameter": {
      pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?![^\s=])/,
      lookbehind: true,
      alias: "variable"
    },
    "string": [
      // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[^]*?\n\2/g,
        lookbehind: true,
        greedy: true,
        inside: insideString
      },
      // Here-document with quotes around the tag
      // → No expansion (so no “inside”).
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[^]*?\n\3/g,
        lookbehind: true,
        greedy: true,
        inside: {
          "bash": commandAfterHeredoc
        }
      },
      // “Normal” string
      {
        // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
        pattern: /(^|[^\\](?:\\\\)*)"(?:\\[^]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^\\"`$])*"/g,
        lookbehind: true,
        greedy: true,
        inside: insideString
      },
      {
        // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
        pattern: /(^|[^$\\])'[^']*'/g,
        lookbehind: true,
        greedy: true
      },
      {
        // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
        pattern: /\$'(?:\\[^]|[^\\'])*'/g,
        greedy: true,
        inside: {
          "entity": insideString.entity
        }
      }
    ],
    "environment": {
      pattern: RegExp("\\$?" + envVars),
      alias: "constant"
    },
    "variable": insideString.variable,
    "function": {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|c?fdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cron|crontab|c?split|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff3?|dig|dircolors|dirname|dirs?|dmesg|docker|docker-compose|du|[ef]?grep|eject|env|ethtool|expand|expect|expr|fdformat|fg|file|find|fmt|fold|format|free|fsck|fuser|g?awk|git|g?parted|groupadd|groupdel|groupmod|groups|grub-mkconfig|halt|head|hg|history|host|hostname|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|killall|less|link|ln|logname|logrotate|look|lpc|lprint[dq]?|lprm?|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mm?v|more|most|mtools|m?tr|mutt|nano|nc|netstat|nice|nl|node|nohup|notify-send|nslookup|op|open|passwd|paste|pathchk|ping|p?kill|p?npm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ra[mr]|reboot|remsync|rename|renice|rev|rmdir|rp?m|r?sync|[sr]?cp|screen|sdiff|se[dq]|sendmail|service|s?ftp|shellcheck|shuf|shutdown|sleep|s?locate|[sz]?sh|stat|strace|sudo|sum?|suspend|swapon|sysctl|tac|tail|tar|tee|time|timeout|h?top|touch|traceroute|t?sort|tty|u?mount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vim?|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|g?zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "keyword": {
      pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
    "builtin": {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|[ls]et|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
      lookbehind: true,
      // Alias added to make those easier to distinguish from strings.
      alias: "class-name"
    },
    "boolean": {
      pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "file-descriptor": {
      pattern: /\B&\d\b/,
      alias: "important"
    },
    "operator": {
      // Lots of redirections here, but not just that.
      pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
      inside: {
        "file-descriptor": {
          pattern: /^\d/,
          alias: "important"
        }
      }
    },
    "punctuation": /\$?\(\(?|\)\)?|\.\.|[[\]{};\\]/,
    "number": {
      pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
      lookbehind: true
    }
  };
  [
    "comment",
    "function-name",
    "for-or-select",
    "assign-left",
    "parameter",
    "string",
    "environment",
    "function",
    "keyword",
    "builtin",
    "boolean",
    "file-descriptor",
    "operator",
    "punctuation",
    "number"
  ].forEach((copied) => variableInside[copied] = bash[copied]);

  // node_modules/prism-code-editor/dist/prism/languages/basic.js
  languages.basic = {
    "comment": {
      pattern: /(?:!|rem\b).+/i,
      inside: {
        "keyword": /^rem/i
      }
    },
    "string": {
      pattern: /"(?:""|[#$%&'().,:;\w ?^!=<>/*+-])*"/g,
      greedy: true
    },
    "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    "keyword": /\b(?:as|beep|bload|bsave|call absolute|call|case|chain|chdir|clear|close|cls|com|common|const|data|declare|def(?: fn| seg|dbl|int|[ls]ng|str)|dim|do|double|else|elseif|environ|erase|error|exit|field|files|for|function|get|gosub|goto|if|input|integer|ioctl|key|kill|line input|locate|lock|long|loop|[lr]set|mkdir|name|next|off|on(?: com| error| key| timer)?|open|option base|[op]ut|poke|read|redim|rem|restore|resume|return|rmdir|run|select case|shared|shell|single|sleep|static|step|stop|string|sub|swap|system|then|timer|to|troff|tron|type|unlock|until|using|view print|wait|w?end|while|write)(?:\$|\b)/i,
    "function": /\b(?:abs|access|a?cos|angle|area|arithmetic|array|a?sin|ask|atn?|base|begin|break|cause|ceil|chr|clip|collate|color|co[nst]|cosh|csc|date|datum|debug|decimal|de[fgt]|degrees|delete|device|display|dot|elapsed|eps|erasable|exline|exp|external|extype|filetype|fixed|fp|go|graph|handler|idn|image|int?|internal|ip|is|keyed|[lu]bound|[lu]case|left|le[nt]|length|lines?|log2?|log10|[lr]trim|margin|ma[tx]|maxnum|mi[dn]|missing|mod|native|nul|numeric|of|option|ord|organization|outin|output|pi|pointer|points?|pos|print|program|prompt|rad|radians|randomize|record|recsize|rectype|relative|remainder|repeat|rest|retry|rewrite|right|rnd|round|same|se[ct]|select|sequential|setter|sgn|sinh|size|skip|s[qt]r|standard|status|stream|style|tab|tanh?|template|text|there|time|timeout|trace|transform|truncate|use|val|variable|viewport|when|window|with|zer|zonewidth)(?:\$|\b)/i,
    "operator": /<=|<>|>=|[&^=<>/*+-]|\b(?:and|eqv|imp|not|x?or)\b/i,
    "punctuation": /[(),:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/batch.js
  var variable2 = /%%?[~:\w]+%?|!\S+!/;
  var parameter = {
    pattern: /\/[a-z?]+(?![^ :]):?|-[a-z]\b|--[a-z-]+\b/im,
    alias: "attr-name",
    inside: {
      "punctuation": /:/
    }
  };
  var string2 = /"(?:[\\"]"|[^"])*"(?!")/;
  var number = /(?:\b|-)\d+\b/;
  languages.batch = {
    "comment": {
      pattern: /^::.*|((?:^|[&(])[ 	]*)rem\b(?:[^^&)\n]|\^[^])*/im,
      lookbehind: true
    },
    "label": {
      pattern: /^:.*/m,
      alias: "property"
    },
    "command": [
      {
        // FOR command
        pattern: /((?:^|[&(])[ 	]*)for(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* \S+ in \([^)]+\) do/im,
        lookbehind: true,
        inside: {
          "keyword": /\b(?:do|in)\b|^for\b/i,
          "string": string2,
          "parameter": parameter,
          "variable": variable2,
          "number": number,
          "punctuation": /[()',]/
        }
      },
      {
        // IF command
        pattern: /((?:^|[&(])[ 	]*)if(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|(?!")(?:(?!==)\S)+)?(?:==| (?:equ|[gln]eq|gtr|lss) )(?:"[^"]*"|[^\s"]\S*))/im,
        lookbehind: true,
        inside: {
          "keyword": /\b(?:cmdextversion|defined|errorlevel|exist|not)\b|^if\b/i,
          "string": string2,
          "parameter": parameter,
          "variable": variable2,
          "number": number,
          "operator": /\^|==|\b(?:equ|[gln]eq|gtr|lss)\b/i
        }
      },
      {
        // ELSE command
        pattern: /((?:^|[&()])[ 	]*)else\b/im,
        lookbehind: true,
        inside: {
          "keyword": /.+/
        }
      },
      {
        // SET command
        pattern: /((?:^|[&(])[ 	]*)set(?: \/[a-z](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:[^^&)\n]|\^[^])*/im,
        lookbehind: true,
        inside: {
          "keyword": /^set\b/i,
          "string": string2,
          "parameter": parameter,
          "variable": [
            variable2,
            /\w+(?=(?:[*/%&^|+-]|<<|>>)?=)/
          ],
          "number": number,
          "operator": /[%&|^/*+-]=?|<<=?|>>=?|[!~_=]/,
          "punctuation": /[()',]/
        }
      },
      {
        // Other commands
        pattern: /((?:^|[&(])[ 	]*@?)\w+\b(?:"(?:[\\"]"|[^"])*"(?!")|[^"^&)\n]|\^[^])*/m,
        lookbehind: true,
        inside: {
          "keyword": /^\w+/,
          "string": string2,
          "parameter": parameter,
          "label": {
            pattern: /(^\s*):\S+/m,
            lookbehind: true,
            alias: "property"
          },
          "variable": variable2,
          "number": number,
          "operator": /\^/
        }
      }
    ],
    "operator": /[&@]/,
    "punctuation": /[()']/
  };

  // node_modules/prism-code-editor/dist/prism/languages/bbcode.js
  languages.shortcode = languages.bbcode = {
    "tag": {
      pattern: /\[\/?[^\s=\]]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'\]=]+))?(?:\s+[^\s=\]]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'\]=]+))*\s*\]/,
      inside: {
        "punctuation": /^\[\/?|\]$/,
        "attr-value": {
          pattern: /(=\s*)(?:"[^"]*"|'[^']*'|\S+)/,
          lookbehind: true,
          inside: {
            "punctuation": /^["']|["']$/
          }
        },
        "attr-equals": /=/,
        "tag": /^\S+/,
        "attr-name": /\S+/
      }
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/bbj.js
  languages.bbj = {
    "comment": {
      pattern: /(^|[^\\:])rem\s+.*/i,
      lookbehind: true
    },
    "string": {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true
    },
    "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    "keyword": /\b(?:abstract|all|argc|begin|bye|callback|case|chn|class|classend|ctl|day|declare|delete|dim|dom|dread|dsz|else|end|endif|err|exitto|extends|fi|field|for|from|gosub|goto|if|implements|interface|interfaceend|iol|iolist|let|list|load|method|methodend|methodret|on|opts|pfx|print|private|process_events|protected|psz|public|read|read_resource|release|remove_callback|repeat|restore|return|rev|seterr|setesc|sqlchn|sqlunt|ssn|start|static|s?wend|switch|sys|then|tim|unt|until|use|void|where|while)\b/i,
    "function": /\b\w+(?=\()/,
    "boolean": /\bbbjapi\.(?:false|true)\b/i,
    "operator": /<[=>]?|>=?|[&^=/*+-]|\b(?:and|not|x?or)\b/i,
    "punctuation": /[.,:;()]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/bicep.js
  languages.bicep = {
    "comment": clikeComment(),
    "property": [
      {
        pattern: /(\n[ 	]*)[a-z_]\w*(?=[ 	]*:)/i,
        lookbehind: true
      },
      {
        pattern: /(\n[ 	]*)'(?:\\.|\$(?!\{)|[^\\\n'$])*'(?=[ 	]*:)/g,
        lookbehind: true,
        greedy: true
      }
    ],
    "string": [
      {
        pattern: /'''[^'][^]*?'''/g,
        greedy: true
      },
      {
        pattern: /(^|[^\\'])'(?:\\.|\$(?!\{)|[^\\\n'$])*'/g,
        lookbehind: true,
        greedy: true
      }
    ],
    "interpolated-string": {
      pattern: /(^|[^\\'])'(?:\\.|\$(?:(?!\{)|\{[^{}\n]*\})|[^\\\n'$])*'/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /\$\{[^{}\n]*\}/,
          inside: {
            "punctuation": /^\$\{|\}$/,
            "expression": {
              pattern: /[^]+/,
              inside: "bicep"
            }
          }
        },
        "string": /[^]+/
      }
    },
    "datatype": {
      pattern: /(\b(?:output|param)\b[ 	]+\w+[ 	]+)\w+/,
      lookbehind: true,
      alias: "class-name"
    },
    "boolean": boolean,
    // https://github.com/Azure/bicep/blob/114a3251b4e6e30082a58729f19a8cc4e374ffa6/src/textmate/bicep.tmlanguage#L184
    "keyword": /\b(?:existing|for|if|in|module|null|output|param|resource|targetScope|var)\b/,
    "decorator": /@\w+/,
    "function": /\b[a-z_]\w*(?=[ 	]*\()/i,
    "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    "operator": /--|\+\+|=>|(?:\*\*|&&|\|\||\?\?|[!=]=|<<|>>>?|[%&|^!=<>/*+-])=?|\.{3}|\?\.?|[~:]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/birb.js
  languages.birb = {
    "comment": clikeComment(),
    "string": {
      pattern: /r?(["'])(?:\\.|(?!\1)[^\\])*\1/g,
      greedy: true
    },
    "class-name": /\b[A-Z](?:[\d_]*[a-zA-Z]\w*)?\b|\b(?:[A-Z]\w*|(?!(?:var|void)\b)[a-z]\w*)(?=\s+\w+\s*[;,=()])/,
    "keyword": /\b(?:assert|break|case|class|const|default|else|enum|final|follows|for|grab|if|nest|new|next|noSeeb|return|static|switch|throw|var|void|while)\b/,
    "boolean": boolean,
    "metadata": {
      pattern: /<\w+>/g,
      greedy: true,
      alias: "symbol"
    },
    "function": /\b\w+(?=\()/,
    "number": clikeNumber,
    "operator": /--|\+\+|&&|\|\||(?:<<|>>|~\/|[%&|^!=<>/*+-])=?|[?:~]/,
    "punctuation": clikePunctuation,
    "variable": /\b[a-z_]\w*\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/bison.js
  languages.bison = Object.assign({
    "bison": {
      // This should match all the beginning of the file
      // including the prologue(s), the bison declarations and
      // the grammar rules.
      pattern: /^(?:[^%]|%(?!%))*%%[^]*?%%/,
      inside: {
        "c": {
          // Allow for one level of nested braces
          pattern: /%\{[^]*?%\}|\{(?:[^{}]|\{[^}]*\})*\}/,
          inside: {
            "delimiter": {
              pattern: /^%?\{|%?\}$/,
              alias: "punctuation"
            },
            "bison-variable": {
              pattern: /[$@](?:<[^\s>]+>)?[$\w]+/,
              alias: "variable",
              inside: {
                "punctuation": /<|>/
              }
            },
            [rest]: languages.c
          }
        },
        "comment": languages.c.comment,
        "string": languages.c.string,
        "property": /\S+(?=:)/,
        "keyword": /%\w+/,
        "number": {
          pattern: /(^|[^@])\b(?:0x[a-f\d]+|\d+)/i,
          lookbehind: true
        },
        "punctuation": /%[%?]|[|:;[\]<>]/
      }
    }
  }, clone2(languages.c));

  // node_modules/prism-code-editor/dist/prism/languages/bnf.js
  languages.rbnf = languages.bnf = {
    "string": /"[^\n"]*"|'[^\n']*'/,
    "definition": {
      pattern: /<[^<>\n	]+>(?=\s*::=)/,
      alias: "rule keyword",
      inside: {
        "punctuation": /^<|>$/
      }
    },
    "rule": {
      pattern: /<[^<>\n	]+>/,
      inside: {
        "punctuation": /^<|>$/
      }
    },
    "operator": /::=|[|()[\]{}*+?]|\.{3}/
  };

  // node_modules/prism-code-editor/dist/prism/languages/bqn.js
  languages.bqn = {
    "shebang": {
      pattern: /^#![ 	]*\/.*/g,
      alias: "important",
      greedy: true
    },
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "string-literal": {
      pattern: /"(?:[^"]|"")*"/g,
      greedy: true,
      alias: "string"
    },
    "character-literal": {
      pattern: /'(?:[^]|[\ud800-\udbff][\udc00-\udfff])'/g,
      greedy: true,
      alias: "char"
    },
    "function": /•[\w¯.∞π]+[\w¯.∞π]*/,
    "dot-notation-on-brackets": {
      pattern: /\{(?=.*\}\.)|\}\./,
      alias: "namespace"
    },
    "special-name": {
      pattern: /𝕨|𝕩|𝕗|𝕘|𝕤|𝕣|𝕎|𝕏|𝔽|𝔾|𝕊|_𝕣_?/,
      alias: "keyword"
    },
    "dot-notation-on-name": {
      pattern: /[A-Za-z_][\w¯∞π]*\./,
      alias: "namespace"
    },
    "word-number-scientific": {
      pattern: /\d+(?:\.\d+)?[eE]¯?\d+/,
      alias: "number"
    },
    "word-name": {
      pattern: /[A-Za-z_][\w¯∞π]*/,
      alias: "symbol"
    },
    "word-number": {
      pattern: /[¯∞π]?(?:\d*\.?\b\d+(?:e[+¯]?\d+|E[+¯]?\d+)?|[¯∞π])(?:j¯?(?:(?:\d+(?:\.\d+)?|\.\d+)(?:e[+¯]?\d+|E[+¯]?\d+)?|[¯∞π]))?/,
      alias: "number"
    },
    "null-literal": {
      pattern: /@/,
      alias: "char"
    },
    "primitive-functions": {
      pattern: /[×÷⋆√⌊⌈|¬∧∨≠≤≥≡≢⊣⊢⥊∾≍⋈↑↓↕«»⌽⍉⍋⍒⊏⊑⊐⊒∊⍷⊔!=<>/+-]/,
      alias: "operator"
    },
    "primitive-1-operators": {
      pattern: /[`˜˘¨⁼⌜´˝˙]/,
      alias: "operator"
    },
    "primitive-2-operators": {
      pattern: /[∘⊸⟜○⌾⎉⚇⍟⊘◶⎊]/,
      alias: "operator"
    },
    "punctuation": /[←⇐↩()[\]{}.,:;⟨⟩‿·⋄?]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/brainfuck.js
  languages.brainfuck = {
    "pointer": {
      pattern: /<|>/,
      alias: "keyword"
    },
    "increment": {
      pattern: /\+/,
      alias: "inserted"
    },
    "decrement": {
      pattern: /-/,
      alias: "deleted"
    },
    "branching": {
      pattern: /[[\]]/,
      alias: "important"
    },
    "operator": /[.,]/,
    "comment": /\S+/
  };

  // node_modules/prism-code-editor/dist/prism/languages/brightscript.js
  var expression2 = {
    pattern: /[^]+/
  };
  expression2.inside = languages.brightscript = {
    "comment": /(?:\brem|').*/i,
    "directive-statement": {
      pattern: /(^[ 	]*)#(?:const|else(?:[ 	]+if)?|end[ 	]+if|error|if).*/im,
      lookbehind: true,
      alias: "property",
      inside: {
        "error-message": {
          pattern: /(^#error).+/,
          lookbehind: true
        },
        "directive": {
          pattern: /^#(?:const|else(?:[ 	]+if)?|end[ 	]+if|error|if)/,
          alias: "keyword"
        },
        "expression": expression2
      }
    },
    "property": {
      pattern: /([\n{,][ 	]*)(?:(?!\d)\w+|"(?:[^\n"]|"")*"(?!"))(?=[ 	]*:)/g,
      lookbehind: true,
      greedy: true
    },
    "string": {
      pattern: /"(?:[^\n"]|"")*"(?!")/g,
      greedy: true
    },
    "class-name": {
      pattern: /(\bas[ 	]+)\w+/i,
      lookbehind: true
    },
    "keyword": /\b(?:as|dim|each|else|elseif|end|exit|for|function|goto|if|in|print|return|step|stop|sub|then|to|while)\b/i,
    "boolean": /\b(?:false|true)\b/i,
    "function": /\b(?!\d)\w+(?=[ 	]*\()/,
    "number": /(?:\b\d+(?:\.\d+)?(?:[ed][+-]\d+)?|&h[a-f\d]+)\b[%&!#]?/i,
    "operator": /--|\+\+|<>|>>=?|<<=?|[\\<>/*+-]=?|[?:^=]|\b(?:and|mod|not|or)\b/i,
    "punctuation": clikePunctuation,
    "constant": /\b(?:line_num)\b/i
  };

  // node_modules/prism-code-editor/dist/prism/languages/bro.js
  languages.bro = {
    "comment": {
      pattern: /(^|[^\\$])#.*/,
      lookbehind: true,
      inside: {
        "italic": /\b(?:FIXME|TODO|XXX)\b/
      }
    },
    "string": clikeString(),
    "boolean": /\b[TF]\b/,
    "function": {
      pattern: /(\b(?:event|function|hook)[ 	]+)\w+(?:::\w+)?/,
      lookbehind: true
    },
    "builtin": /(?:@(?:load(?:-(?:plugin|sigs))?|unload|prefixes|ifn?def|else|(?:end)?if|DIR|FILENAME))|(?:&?(?:add_func|create_expire|default|delete_func|encrypt|error_handler|expire_func|group|log|mergeable|optional|persistent|priority|raw_output|read_expire|redef|rotate_interval|rotate_size|synchronized|type_column|write_expire))/,
    "constant": {
      pattern: /(\bconst[ 	]+)\w+/i,
      lookbehind: true
    },
    "keyword": /\b(?:add|addr|alarm|any|bool|break|const|continue|count|delete|double|else|enum|event|export|file|for|function|global|hook|if|int?|interval|local|module|next|of|opaque|pattern|port|print|record|return|schedule|set|string|subnet|table|time|timeout|using|vector|when)\b/,
    "operator": /--|\+\+|&&?|::|\|\|?|[!=<>+-]=?|\??\$|[?/*~^%]/,
    "number": clikeNumber,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/bsl.js
  var charClass = ["\\w\u0400-\u0484\u0487-\u052F\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F"];
  languages.oscript = languages.bsl = {
    "comment": /\/\/.*/,
    "string": {
      pattern: /"(?:[^"]|"")*"(?!")|'(?:\\.|[^\n\\'])*'/g,
      greedy: true
    },
    "keyword": {
      pattern: re("(^|[^<0>])(?:\u043F\u043E\u043A\u0430|\u0434\u043B\u044F|\u043D\u043E\u0432\u044B\u0439|\u043F\u0440\u0435\u0440\u0432\u0430\u0442\u044C|\u043F\u043E\u043F\u044B\u0442\u043A\u0430|\u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435|\u0432\u044B\u0437\u0432\u0430\u0442\u044C\u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435|\u0438\u043D\u0430\u0447\u0435|\u043A\u043E\u043D\u0435\u0446\u043F\u043E\u043F\u044B\u0442\u043A\u0438|\u043D\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043E|\u0444\u0443\u043D\u043A\u0446\u0438\u044F|\u043F\u0435\u0440\u0435\u043C|\u0432\u043E\u0437\u0432\u0440\u0430\u0442|\u043A\u043E\u043D\u0435\u0446\u0444\u0443\u043D\u043A\u0446\u0438\u0438|\u0435\u0441\u043B\u0438|\u0438\u043D\u0430\u0447\u0435\u0435\u0441\u043B\u0438|\u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430|\u043A\u043E\u043D\u0435\u0446\u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u044B|\u0442\u043E\u0433\u0434\u0430|\u0437\u043D\u0430\u0447|\u044D\u043A\u0441\u043F\u043E\u0440\u0442|\u043A\u043E\u043D\u0435\u0446\u0435\u0441\u043B\u0438|\u0438\u0437|\u043A\u0430\u0436\u0434\u043E\u0433\u043E|\u0438\u0441\u0442\u0438\u043D\u0430|\u043B\u043E\u0436\u044C|\u043F\u043E|\u0446\u0438\u043A\u043B|\u043A\u043E\u043D\u0435\u0446\u0446\u0438\u043A\u043B\u0430|\u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C)(?![<0>])|\\b(?:break|do|each|else|elseif|enddo|endfunction|endif|endprocedure|endtry|except|execute|export|false|true|for|function|if|in|new|null|procedure|raise|return|then|to|try|undefined|val|var|while)\\b", charClass, "i"),
      lookbehind: true
    },
    "number": {
      pattern: re("(^(?=\\d)|[^<0>])(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?", charClass, "i"),
      lookbehind: true
    },
    "operator": {
      pattern: re("[<>*/+-]=?|[%=]|\\b(?:and|not|or)\\b|(^|[^<0>])(?:\u0438|\u0438\u043B\u0438|\u043D\u0435)(?![\\w<0>])", charClass, "i"),
      lookbehind: true
    },
    "punctuation": /\(\.|\.\)|[()[\].,:;]/,
    // Теги препроцессора вида &Клиент, &Сервер, ...
    // Preprocessor tags of the type &Client, &Server, ...
    // Инструкции препроцессора вида:
    // #Если Сервер Тогда
    // ...
    // #КонецЕсли
    // Preprocessor instructions of the form:
    // #If Server Then
    // ...
    // #EndIf
    "directive": {
      pattern: /^([ 	]*)[&#].*/gm,
      lookbehind: true,
      greedy: true,
      alias: "important"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/cfscript.js
  languages.cfc = languages.cfscript = {
    "comment": [
      /\/\/.*/,
      {
        pattern: /\/\*[^]*?(?:\*\/|$)/g,
        greedy: true,
        inside: {
          "annotation": {
            pattern: /(?:^|[^.])@[\w\.]+/,
            alias: "punctuation"
          }
        }
      }
    ],
    "string": clikeString(),
    "function-variable": {
      pattern: /(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*[=:]\s*(?:\bfunction\b|(?:\((?:[^()]|\([^)]*\))*\)|(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)\s*=>))/,
      alias: "function"
    },
    "keyword": /\b(?:abstract|break|catch|component|continue|default|do|else|extends|final|finally|for|function|if|in|include|package|private|property|public|remote|required|rethrow|return|static|switch|throw|try|var|while|xml)\b(?!\s*=)/,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "number": clikeNumber,
    "operator": /--|\+\+|&&|\|\||::|=>|[!=]==|[%&|^!=<>/*+-]=?|\?[.:]?|:|\b(?:and|contains|equal|eqv?|[gl]te?|imp|is|mod|not|x?or)\b/,
    "punctuation": clikePunctuation,
    "scope": {
      pattern: /\b(?:application|arguments|cgi|client|cookie|local|session|super|this|variables)\b/,
      alias: "global"
    },
    "type": {
      pattern: /\b(?:any|array|binary|boolean|date|[gu]uid|numeric|query|string|struct|void|xml)\b/,
      alias: "builtin"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/chaiscript.js
  languages.chaiscript = {
    "comment": clikeComment(),
    "string-interpolation": {
      pattern: /(^|[^\\])"(?:\\[^]|[^\\$"]|\$(?!\{)|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\})*"/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
          lookbehind: true,
          inside: {
            "interpolation-expression": {
              pattern: /(..)[^]+(?=.)/,
              lookbehind: true,
              inside: "chaiscript"
            },
            "interpolation-punctuation": {
              pattern: /.+/,
              alias: "punctuation"
            }
          }
        },
        "string": /[^]+/
      }
    },
    "string": {
      pattern: /(^|[^\\])'(?:\\[^]|[^\\'])*'/g,
      lookbehind: true,
      greedy: true
    },
    "class-name": [
      {
        // e.g. class Rectangle { ... }
        pattern: /(\bclass\s+)\w+/,
        lookbehind: true
      },
      {
        // e.g. attr Rectangle::height, def Rectangle::area() { ... }
        pattern: /(\b(?:attr|def)\s+)\w+(?=\s*::)/,
        lookbehind: true
      }
    ],
    "keyword": /\b(?:attr|auto|break|case|catch|class|continue|def|default|else|finally|for|fun|global|if|return|switch|this|try|var|while)\b/,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "number": [
      {
        pattern: /(?:\b0b[01']+|\b0x(?:[a-f\d']+(?:\.[a-f\d']*)?|\.[a-f\d']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/gi,
        greedy: true
      },
      /\b(?:Infinity|NaN)\b/
    ],
    "parameter-type": {
      // e.g. def foo(int x, Vector y) {...}
      pattern: /([,(]\s*)\w+(?=\s+\w)/,
      lookbehind: true,
      alias: "class-name"
    },
    "operator": /:[:=]|--|\+\+|&&|\|\||>>=?|<<=?|[%&|^!=<>/*+-]=?|[?:~]|`[^\n`]{1,4}`/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/cil.js
  languages.cil = {
    "comment": /\/\/.*/,
    "string": clikeString(),
    "directive": {
      pattern: /(^|\W)\.[a-z]+(?!\S)/,
      lookbehind: true,
      alias: "class-name"
    },
    // Actually an assembly reference
    "variable": /\[[\w\.]+\]/,
    "keyword": /\b(?:abstract|ansi|assembly|auto|autochar|beforefieldinit|bool|bstr|byvalstr|catch|char|cil|class|currency|date|decimal|default|enum|error|explicit|extends|extern|famandassem|family|famorassem|final(?:ly)?|float32|float64|hidebysig|u?int(?:8|16|32|64)?|iant|idispatch|implements|import|initonly|instance|interface|iunknown|literal|lpstr|lpstruct|lptstr|lpwstr|managed|method|native(?:Type)?|nested|newslot|object(?:ref)?|pinvokeimpl|private|privatescope|public|reqsecobj|rtspecialname|runtime|sealed|sequential|serializable|specialname|static|string|struct|syschar|tbstr|unicode|unmanagedexp|unsigned|value(?:type)?|variant|virtual|void)\b/,
    "function": /\b(?:(?:constrained|no|readonly|tail|unaligned|volatile)\.)?(?:conv\.(?:[iu][1248]?|ovf\.[iu][1248]?(?:\.un)?|r\.un|r4|r8)|ldc\.(?:i4(?:\.\d+|\.[mM]1|\.s)?|i8|r4|r8)|ldelem(?:\.[iu][1248]?|\.r[48]|\.ref|a)?|ldind\.(?:[iu][1248]?|r[48]|ref)|stelem\.?(?:i[1248]?|r[48]|ref)?|stind\.(?:i[1248]?|r[48]|ref)?|end(?:fault|filter|finally)|ldarg(?:\.[0-3s]|a(?:\.s)?)?|ldloc(?:\.\d+|\.s)?|sub(?:\.ovf(?:\.un)?)?|mul(?:\.ovf(?:\.un)?)?|add(?:\.ovf(?:\.un)?)?|stloc(?:\.[0-3s])?|refany(?:type|val)|b[lg][te](?:\.un)?(?:\.s)?|unbox(?:\.any)?|init(?:blk|obj)|call(?:i|virt)?|brfalse(?:\.s)?|bne\.un(?:\.s)?|ldloca(?:\.s)?|brzero(?:\.s)?|brtrue(?:\.s)?|brnull(?:\.s)?|brinst(?:\.s)?|starg(?:\.s)?|leave(?:\.s)?|(?:ovf\.[iu][1248]?|shr|rem|div|clt)(?:\.un)?|rem(?:\.un)?|div(?:\.un)?|clt(?:\.un)?|alignment|castclass|ldvirtftn|beq(?:\.s)?|ckfinite|ldsflda|ldtoken|localloc|mkrefany|rethrow|cgt\.un|arglist|switch|stsfld|sizeof|newobj|newarr|ldsfld|ldnull|ldflda?|isinst|throw|stobj|stfld|ldstr|ldobj|ldlen|ldftn|cpobj|cpblk|break|br\.s|x?or|shl|ret|pop|not|nop|neg|jmp|dup|cgt|ceq|box|and|br)\b/,
    "boolean": boolean,
    "number": /\b-?(?:0x[a-f\d]+|\d+)(?:\.[a-f\d]+)?\b/i,
    "punctuation": /[()[\]{};,:=]|IL_[a-zA-Z\d]+/
  };

  // node_modules/prism-code-editor/dist/prism/languages/cilkc.js
  insertBefore(languages["cilk-c"] = languages.cilkc = clone2(languages.c), "function", {
    "parallel-keyword": {
      pattern: /\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,
      alias: "keyword"
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/cilkcpp.js
  insertBefore(languages.cilk = languages["cilk-cpp"] = languages.cilkcpp = clone2(languages.cpp), "function", {
    "parallel-keyword": {
      pattern: /\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,
      alias: "keyword"
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/clojure.js
  languages.clojure = {
    "comment": /;.*/,
    "string": {
      pattern: /"(?:\\.|[^\\"])*"/g,
      greedy: true
    },
    "char": /\\\w+/,
    "symbol": {
      pattern: /(^|[\s()[\]{},])::?[\w*+!?'<>=/.-]+/,
      lookbehind: true
    },
    "keyword": {
      pattern: /(\()(?:->?>?|\.\.?|[*/+]|[=<>]=?|accessor|agent|agent-errors|a?get|alength|all-ns|alter|append-child|apply|array-map|aset|aset-boolean|aset-byte|aset-char|aset-double|aset-float|aset-int|aset-long|aset-short|assert|assoc|await-for|await|bean|binding|bit-and|bit-not|bit-or|bit-shift-left|bit-shift-right|bit-xor|boolean|branch\?|butlast|byte|[cl]ast|char|children|class|clear-agent-errors|comment|commute|comparator|complement|comp|concat|con[djs]|constantly|construct-proxy|contains\?|count|create-ns|create-struct|cycle|dec|declare|definline|definterface|defmacro|defmethod|defmulti|defn?-?|defonce|defproject|defprotocol|defrecord|defstruct|deftype|deref|difference|disj|dissoc|distinct|doall|doc|dorun|doseq|dosync|dotimes|doto|double|down|do|drop-while|drop|edit|end\?|ensure|eval|every\?|false\?|[fr]?first|file-seq|filter|find|find-doc|find-ns|find-var|float|flush|fnseq|fn|for|f?rest|gensym|get-proxy-class|hash-map|hash-set|identical\?|identity|if-let|if-not|if|import|in-ns|inc|index|insert-child|insert-left|insert-right|inspect-table|inspect-tree|instance\?|interleave|intersection|into-array|into|int|iterate|join|keys?|keyword\??|lazy-cat|lazy-cons|lefts?|let|line-seq|list\*?|load-file|load|locking|long|loop|macroexpand-1|macroexpand|make-array|make-node|map-invert|mapcat|map\??|max-key|max|memfn|merge-with|merge|meta|min-key|min|monitor-enter|namespace|name|neg\?|newline|new|next|nil\?|node|not-any\?|not-every\?|not=?|ns-imports|ns-interns|ns-map|ns-name|ns-publics|ns-refers|ns-resolve|ns-unmap|ns|nthrest|nth|or|parse|partial|path|peek|pop|pos\?|pr-str|print-str|println|println-str|print|prn-str|prn|project|proxy-mappings|proxy|pr|quote?|rand-int|r?and|range|re-find|re-groups|re-matche[rs]|re-pattern|re-seq|read-line|read|recur|reduce|ref-set|refer|ref|remove-method|remove-ns|remove|rem|rename-keys|rename|repeat|replace|replicate|resolve|resultset-seq|reverse|rights?|root|rrest|rseq|second|select-keys|select|send-off|send|seq-zip|seq\??|set!?|short|slurp|some|sort-by|sorted-map|sorted-map-by|sorted-set|sort|special-symbol\?|split-at|split-with|string\?|struct-map|struct|str|subs|subvec|symbol\??|sync|take-nth|take-while|take|test|throw|time|to-array-2d|to-array|tree-seq|true\?|try|union|update-proxy|up|vals?|var-get|var-set|var\??|vector-zip|vector\??|when-first|when-let|when-not|when|with-local-vars|with-meta|with-open|with-out-str|xml-seq|xml-zip|zero\?|zipmap|zipper)(?![^\s)])/,
      lookbehind: true
    },
    "boolean": /\b(?:false|true|nil)\b/,
    "number": {
      pattern: /(^|[^$\w@])(?:\d+(?:[/.]\d+)?(?:e[+-]?\d+)?|0x[a-f\d]+|[1-9]\d?r[a-z\d]+)[lmn]?(?![$\w@])/i,
      lookbehind: true
    },
    "function": {
      pattern: /((?:^|[^'])\()[\w.?'<>!=/*+-]+(?![^\s)])/,
      lookbehind: true
    },
    "operator": /[#@^`~]/,
    "punctuation": /[()[\]{},]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/cmake.js
  languages.cmake = {
    "comment": /#\[(=*)\[[^]*?\]\1\]|#.*/,
    "string": {
      pattern: /"(?:\\.|[^\\"])*"/g,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /\$\{(?:[^{}$]|\$\{[^{}$]*\})*\}/,
          inside: {
            "punctuation": /\$\{|\}/,
            "variable": /\w+/
          }
        }
      }
    },
    "variable": /\b(?:CMAKE_\w+|\w+_(?:(?:BINARY|SOURCE)_DIR|DESCRIPTION|HOMEPAGE_URL|ROOT|VERSION(?:_MAJOR|_MINOR|_PATCH|_TWEAK)?)|(?:ANDROID|APPLE|BORLAND|BUILD_SHARED_LIBS|CACHE|CPACK_(?:ABSOLUTE_DESTINATION_FILES|COMPONENT_INCLUDE_TOPLEVEL_DIRECTORY|ERROR_ON_ABSOLUTE_INSTALL_DESTINATION|INCLUDE_TOPLEVEL_DIRECTORY|INSTALL_DEFAULT_DIRECTORY_PERMISSIONS|INSTALL_SCRIPT|PACKAGING_INSTALL_PREFIX|SET_DESTDIR|WARN_ON_ABSOLUTE_INSTALL_DESTINATION)|CTEST_(?:BINARY_DIRECTORY|BUILD_COMMAND|BUILD_NAME|BZR_COMMAND|BZR_UPDATE_OPTIONS|CHANGE_ID|CHECKOUT_COMMAND|CONFIGURATION_TYPE|CONFIGURE_COMMAND|COVERAGE_COMMAND|COVERAGE_EXTRA_FLAGS|CURL_OPTIONS|CUSTOM_(?:COVERAGE_EXCLUDE|ERROR_EXCEPTION|ERROR_MATCH|ERROR_POST_CONTEXT|ERROR_PRE_CONTEXT|MAXIMUM_FAILED_TEST_OUTPUT_SIZE|MAXIMUM_NUMBER_OF_(?:ERRORS|WARNINGS)|MAXIMUM_PASSED_TEST_OUTPUT_SIZE|MEMCHECK_IGNORE|POST_MEMCHECK|POST_TEST|PRE_MEMCHECK|PRE_TEST|TESTS_IGNORE|WARNING_EXCEPTION|WARNING_MATCH)|CVS_CHECKOUT|CVS_COMMAND|CVS_UPDATE_OPTIONS|DROP_LOCATION|DROP_METHOD|DROP_SITE|DROP_SITE_CDASH|DROP_SITE_PASSWORD|DROP_SITE_USER|EXTRA_COVERAGE_GLOB|GIT_COMMAND|GIT_INIT_SUBMODULES|GIT_UPDATE_CUSTOM|GIT_UPDATE_OPTIONS|HG_COMMAND|HG_UPDATE_OPTIONS|LABELS_FOR_SUBPROJECTS|MEMORYCHECK_(?:COMMAND|COMMAND_OPTIONS|SANITIZER_OPTIONS|SUPPRESSIONS_FILE|TYPE)|NIGHTLY_START_TIME|P4_CLIENT|P4_COMMAND|P4_OPTIONS|P4_UPDATE_OPTIONS|RUN_CURRENT_SCRIPT|SCP_COMMAND|SITE|SOURCE_DIRECTORY|SUBMIT_URL|SVN_COMMAND|SVN_OPTIONS|SVN_UPDATE_OPTIONS|TEST_LOAD|TEST_TIMEOUT|TRIGGER_SITE|UPDATE_COMMAND|UPDATE_OPTIONS|UPDATE_VERSION_ONLY|USE_LAUNCHERS)|CYGWIN|ENV|EXECUTABLE_OUTPUT_PATH|GHS-MULTI|IOS|LIBRARY_OUTPUT_PATH|MINGW|MSVC(?:[16-9]0|11|12|14|71|_IDE|_TOOLSET_VERSION|_VERSION)?|MSYS|PROJECT_NAME|UNIX|WIN32|WINCE|WINDOWS_PHONE|WINDOWS_STORE|XCODE))\b/,
    "property": /\b(?:cxx_\w+|(?:ARCHIVE_OUTPUT_(?:DIRECTORY|NAME)|COMPILE_DEFINITIONS|COMPILE_PDB_NAME|COMPILE_PDB_OUTPUT_DIRECTORY|EXCLUDE_FROM_DEFAULT_BUILD|IMPORTED_(?:IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_LANGUAGES|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|NO_SONAME|OBJECTS|SONAME)|INTERPROCEDURAL_OPTIMIZATION|LIBRARY_OUTPUT_DIRECTORY|LIBRARY_OUTPUT_NAME|LINK_FLAGS|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|MAP_IMPORTED_CONFIG|OSX_ARCHITECTURES|OUTPUT_NAME|PDB_NAME|PDB_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_NAME|STATIC_LIBRARY_FLAGS|VS_CSHARP|VS_DOTNET_REFERENCEPROP|VS_DOTNET_REFERENCE|VS_GLOBAL_SECTION_POST|VS_GLOBAL_SECTION_PRE|VS_GLOBAL|XCODE_ATTRIBUTE)_\w+|\w+_(?:CLANG_TIDY|COMPILER_LAUNCHER|CPPCHECK|CPPLINT|INCLUDE_WHAT_YOU_USE|OUTPUT_NAME|POSTFIX|VISIBILITY_PRESET)|ABSTRACT|ADDITIONAL_MAKE_CLEAN_FILES|ADVANCED|ALIASED_TARGET|ALLOW_DUPLICATE_CUSTOM_TARGETS|ANDROID_(?:ANT_ADDITIONAL_OPTIONS|API|API_MIN|ARCH|ASSETS_DIRECTORIES|GUI|JAR_DEPENDENCIES|NATIVE_LIB_DEPENDENCIES|NATIVE_LIB_DIRECTORIES|PROCESS_MAX|PROGUARD|PROGUARD_CONFIG_PATH|SECURE_PROPS_PATH|SKIP_ANT_STEP|STL_TYPE)|ARCHIVE_OUTPUT_DIRECTORY|ATTACHED_FILES|ATTACHED_FILES_ON_FAIL|AUTOGEN_(?:BUILD_DIR|ORIGIN_DEPENDS|PARALLEL|SOURCE_GROUP|TARGETS_FOLDER|TARGET_DEPENDS)|AUTOMOC|AUTOMOC_(?:COMPILER_PREDEFINES|DEPEND_FILTERS|EXECUTABLE|MACRO_NAMES|MOC_OPTIONS|SOURCE_GROUP|TARGETS_FOLDER)|AUTORCC|AUTORCC_EXECUTABLE|AUTORCC_OPTIONS|AUTORCC_SOURCE_GROUP|AUTOUIC|AUTOUIC_EXECUTABLE|AUTOUIC_OPTIONS|AUTOUIC_SEARCH_PATHS|BINARY_DIR|BUILDSYSTEM_TARGETS|BUILD_RPATH|BUILD_RPATH_USE_ORIGIN|BUILD_WITH_INSTALL_NAME_DIR|BUILD_WITH_INSTALL_RPATH|BUNDLE|BUNDLE_EXTENSION|CACHE_VARIABLES|CLEAN_NO_CUSTOM|COMMON_LANGUAGE_RUNTIME|COMPATIBLE_INTERFACE_(?:BOOL|NUMBER_MAX|NUMBER_MIN|STRING)|COMPILE_(?:DEFINITIONS|FEATURES|FLAGS|OPTIONS|PDB_NAME|PDB_OUTPUT_DIRECTORY)|COST|CPACK_DESKTOP_SHORTCUTS|CPACK_NEVER_OVERWRITE|CPACK_PERMANENT|CPACK_STARTUP_SHORTCUTS|CPACK_START_MENU_SHORTCUTS|CPACK_WIX_ACL|CROSSCOMPILING_EMULATOR|CUDA_EXTENSIONS|CUDA_PTX_COMPILATION|CUDA_RESOLVE_DEVICE_SYMBOLS|CUDA_SEPARABLE_COMPILATION|CUDA_STANDARD|CUDA_STANDARD_REQUIRED|CXX_EXTENSIONS|CXX_STANDARD|CXX_STANDARD_REQUIRED|C_EXTENSIONS|C_STANDARD|C_STANDARD_REQUIRED|DEBUG_CONFIGURATIONS|DEFINE_SYMBOL|DEFINITIONS|DEPENDS|DEPLOYMENT_ADDITIONAL_FILES|DEPLOYMENT_REMOTE_DIRECTORY|DISABLED|DISABLED_FEATURES|ECLIPSE_EXTRA_CPROJECT_CONTENTS|ECLIPSE_EXTRA_NATURES|ENABLED_FEATURES|ENABLED_LANGUAGES|ENABLE_EXPORTS|ENVIRONMENT|EXCLUDE_FROM_ALL|EXCLUDE_FROM_DEFAULT_BUILD|EXPORT_NAME|EXPORT_PROPERTIES|EXTERNAL_OBJECT|EchoString|FAIL_REGULAR_EXPRESSION|FIND_LIBRARY_USE_LIB32_PATHS|FIND_LIBRARY_USE_LIB64_PATHS|FIND_LIBRARY_USE_LIBX32_PATHS|FIND_LIBRARY_USE_OPENBSD_VERSIONING|FIXTURES_CLEANUP|FIXTURES_REQUIRED|FIXTURES_SETUP|FOLDER|FRAMEWORK|Fortran_FORMAT|Fortran_MODULE_DIRECTORY|GENERATED|GENERATOR_FILE_NAME|GENERATOR_IS_MULTI_CONFIG|GHS_INTEGRITY_APP|GHS_NO_SOURCE_GROUP_FILE|GLOBAL_DEPENDS_DEBUG_MODE|GLOBAL_DEPENDS_NO_CYCLES|GNUtoMS|HAS_CXX|HEADER_FILE_ONLY|HELPSTRING|IMPLICIT_DEPENDS_INCLUDE_TRANSFORM|IMPORTED|IMPORTED_(?:COMMON_LANGUAGE_RUNTIME|CONFIGURATIONS|GLOBAL|IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_(?:LANGUAGES|LIBRARIES|MULTIPLICITY)|LOCATION|NO_SONAME|OBJECTS|SONAME)|IMPORT_PREFIX|IMPORT_SUFFIX|INCLUDE_DIRECTORIES|INCLUDE_REGULAR_EXPRESSION|INSTALL_NAME_DIR|INSTALL_RPATH|INSTALL_RPATH_USE_LINK_PATH|INTERFACE_(?:AUTOUIC_OPTIONS|COMPILE_DEFINITIONS|COMPILE_FEATURES|COMPILE_OPTIONS|INCLUDE_DIRECTORIES|LINK_DEPENDS|LINK_DIRECTORIES|LINK_LIBRARIES|LINK_OPTIONS|POSITION_INDEPENDENT_CODE|SOURCES|SYSTEM_INCLUDE_DIRECTORIES)|INTERPROCEDURAL_OPTIMIZATION|IN_TRY_COMPILE|IOS_INSTALL_COMBINED|JOB_POOLS|JOB_POOL_COMPILE|JOB_POOL_LINK|KEEP_EXTENSION|LABELS|LANGUAGE|LIBRARY_OUTPUT_DIRECTORY|LINKER_LANGUAGE|LINK_(?:DEPENDS|DEPENDS_NO_SHARED|DIRECTORIES|FLAGS|INTERFACE_LIBRARIES|INTERFACE_MULTIPLICITY|LIBRARIES|OPTIONS|SEARCH_END_STATIC|SEARCH_START_STATIC|WHAT_YOU_USE)|LISTFILE_STACK|LOCATION|MACOSX_BUNDLE|MACOSX_BUNDLE_INFO_PLIST|MACOSX_FRAMEWORK_INFO_PLIST|MACOSX_PACKAGE_LOCATION|MACOSX_RPATH|MACROS|MANUALLY_ADDED_DEPENDENCIES|MEASUREMENT|MODIFIED|NAME|NO_SONAME|NO_SYSTEM_FROM_IMPORTED|OBJECT_DEPENDS|OBJECT_OUTPUTS|OSX_ARCHITECTURES|OUTPUT_NAME|PACKAGES_FOUND|PACKAGES_NOT_FOUND|PARENT_DIRECTORY|PASS_REGULAR_EXPRESSION|PDB_NAME|PDB_OUTPUT_DIRECTORY|POSITION_INDEPENDENT_CODE|POST_INSTALL_SCRIPT|PREDEFINED_TARGETS_FOLDER|PREFIX|PRE_INSTALL_SCRIPT|PRIVATE_HEADER|PROCESSORS|PROCESSOR_AFFINITY|PROJECT_LABEL|PUBLIC_HEADER|REPORT_UNDEFINED_PROPERTIES|REQUIRED_FILES|RESOURCE|RESOURCE_LOCK|RULE_LAUNCH_COMPILE|RULE_LAUNCH_CUSTOM|RULE_LAUNCH_LINK|RULE_MESSAGES|RUNTIME_OUTPUT_DIRECTORY|RUN_SERIAL|SKIP_AUTOGEN|SKIP_AUTOMOC|SKIP_AUTORCC|SKIP_AUTOUIC|SKIP_BUILD_RPATH|SKIP_RETURN_CODE|SOURCES|SOURCE_DIR|SOVERSION|STATIC_LIBRARY_FLAGS|STATIC_LIBRARY_OPTIONS|STRINGS|SUBDIRECTORIES|SUFFIX|SYMBOLIC|TARGET_ARCHIVES_MAY_BE_SHARED_LIBS|TARGET_MESSAGES|TARGET_SUPPORTS_SHARED_LIBS|TESTS|TEST_INCLUDE_FILES?|TIMEOUT|TIMEOUT_AFTER_MATCH|TYPE|USE_FOLDERS|VALUE|VARIABLES|VERSION|VISIBILITY_INLINES_HIDDEN|VS_(?:CONFIGURATION_TYPE|COPY_TO_OUT_DIR|DEBUGGER_(?:COMMAND|COMMAND_ARGUMENTS|ENVIRONMENT|WORKING_DIRECTORY)|DEPLOYMENT_CONTENT|DEPLOYMENT_LOCATION|DOTNET_REFERENCES|DOTNET_REFERENCES_COPY_LOCAL|INCLUDE_IN_VSIX|IOT_STARTUP_TASK|KEYWORD|RESOURCE_GENERATOR|SCC_AUXPATH|SCC_LOCALPATH|SCC_PROJECTNAME|SCC_PROVIDER|SDK_REFERENCES|SHADER_(?:DISABLE_OPTIMIZATIONS|ENABLE_DEBUG|ENTRYPOINT|FLAGS|MODEL|OBJECT_FILE_NAME|OUTPUT_HEADER_FILE|TYPE|VARIABLE_NAME)|STARTUP_PROJECT|TOOL_OVERRIDE|USER_PROPS|WINRT_COMPONENT|WINRT_EXTENSIONS|WINRT_REFERENCES|XAML_TYPE)|WILL_FAIL|WIN32_EXECUTABLE|WINDOWS_EXPORT_ALL_SYMBOLS|WORKING_DIRECTORY|WRAP_EXCLUDE|XCODE_(?:EMIT_EFFECTIVE_PLATFORM_NAME|EXPLICIT_FILE_TYPE|FILE_ATTRIBUTES|LAST_KNOWN_FILE_TYPE|PRODUCT_TYPE|SCHEME_(?:ADDRESS_SANITIZER|ADDRESS_SANITIZER_USE_AFTER_RETURN|ARGUMENTS|DISABLE_MAIN_THREAD_CHECKER|DYNAMIC_LIBRARY_LOADS|DYNAMIC_LINKER_API_USAGE|ENVIRONMENT|EXECUTABLE|GUARD_MALLOC|MAIN_THREAD_CHECKER_STOP|MALLOC_GUARD_EDGES|MALLOC_SCRIBBLE|MALLOC_STACK|THREAD_SANITIZER(?:_STOP)?|UNDEFINED_BEHAVIOUR_SANITIZER(?:_STOP)?|ZOMBIE_OBJECTS))|XCTEST)\b/,
    "keyword": /\b(?:add_compile_definitions|add_compile_options|add_custom_command|add_custom_target|add_definitions|add_dependencies|add_executable|add_library|add_link_options|add_subdirectory|add_test|aux_source_directory|break|build_command|build_name|cmake_host_system_information|cmake_minimum_required|cmake_parse_arguments|cmake_policy|configure_file|continue|create_test_sourcelist|ctest_(?:build|configure|coverage|empty_binary_directory|memcheck|read_custom_files|run_script|sleep|start|submit|test|update|upload)|define_property|else|elseif|enable_language|enable_testing|endforeach|endfunction|endif|endmacro|endwhile|exec_program|execute_process|export|export_library_dependencies|file|find_file|find_library|find_package|find_path|find_program|fltk_wrap_ui|foreach|function|get_cmake_property|get_directory_property|get_filename_component|[gs]et_property|get_source_file_property|get_target_property|get_test_property|if|include|include_directories|include_external_msproject|include_guard|include_regular_expression|install|install_files|install_programs|install_targets|link_directories|link_libraries|list|load_cache|load_command|macro|make_directory|mark_as_advanced|math|message|option|output_required_files|project|qt_wrap_cpp|qt_wrap_ui|remove|remove_definitions|return|separate_arguments|set|set_directory_properties|set_source_files_properties|set_target_properties|set_tests_properties|site_name|source_group|string|subdir_depends|subdirs|target_(?:compile_definitions|compile_features|compile_options|include_directories|link_directories|link_libraries|link_options|sources)|try_compile|try_run|unset|use_mangled_mesa|utility_source|variable_requires|variable_watch|while|write_file)(?=\s*\()/,
    "boolean": /\b(?:FALSE|TRUE|OFF|ON)\b/,
    "namespace": /\b(?:INTERFACE|PRIVATE|PROPERTIES|PUBLIC|SHARED|STATIC|TARGET_OBJECTS)\b/,
    "operator": /\b(?:AND|DEFINED|EQUAL|GREATER|LESS|MATCHES|NOT|OR|STREQUAL|STRGREATER|STRLESS|VERSION_EQUAL|VERSION_GREATER|VERSION_LESS)\b/,
    "inserted": {
      pattern: /\b\w+::\w+/,
      alias: "class-name"
    },
    "number": /\b\d+(?:\.\d+)*\b/,
    "function": /\b(?!\d)\w+(?=\s*\()/,
    "punctuation": /[()>}]|\$[<{]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/cobol.js
  languages.cobol = {
    "comment": {
      pattern: /\*>.*|(^[ 	]*)\*.*/mg,
      lookbehind: true,
      greedy: true
    },
    "string": {
      pattern: /[xzgn]?(?:"(?:[^\n"]|"")*"(?!")|'(?:[^\n']|'')*'(?!'))/ig,
      greedy: true
    },
    "level": {
      pattern: /(^[ 	]*)\d+\b/mg,
      lookbehind: true,
      greedy: true,
      alias: "number"
    },
    "class-name": {
      // https://github.com/antlr/grammars-v4/blob/42edd5b687d183b5fa679e858a82297bd27141e7/cobol85/Cobol85.g4#L1015
      pattern: /(\bpic(?:ture)?\s+)(?:(?:[$\w/,:*<>+-]|\.(?=\S))(?:\(\d+\))?)+/i,
      lookbehind: true,
      inside: {
        "number": {
          pattern: /(\()\d+/,
          lookbehind: true
        },
        "punctuation": /[()]/
      }
    },
    "keyword": {
      pattern: /(^|[^\w-])(?:abort|accept|access|add|address|advancing|after|aligned|alphabet|alphabetic|alphabetic-lower|alphabetic-upper|alphanumeric|alphanumeric-edited|also|alter|alternate|any|are|areas?|as|ascending|ascii|assign|associated-data|associated-data-length|at|attribute|author|auto|auto-skip|background-color|background-colour|basis|beep|before|beginning|bell|binary|bit|blank|blink|b?lock|bottom|bounds|by|byfunction|bytitle|c?all|cancel|capable|ccsversion|c[dfh]|chaining|changed|channel|characters?|class|class-id|clock-units|close|close-disposition|co(?:bol|de|de-set|l|llating|lumn|m-reg|mma|mmitment|mmon|mmunication|mp(?:utational)?(?:-[1-5])?|mpute|nfiguration|ntains|ntent|ntinue|ntrol-point|ntrols?|nvention|nverting|py|rr|rresponding|unt)|crunch|currency|cursor|dat[ae]|data-base|date-compiled|date-written|day|day-of-week|dbcs|de|debug-contents|debug-item|debug-line|debug-name|debug-sub-[123]|debugging|decimal-point|declaratives|default|default-display|definition|delete|delimite[dr]|depending|descending|destination|detail|dfhresp|dfhvalue|disable|disk|display|display-1|divide|division|dontcare|double|d?own|duplicates|dynamic|ebcdic|egcs|egi|else|emi|empty-check|enable|end-(?:accept|add|call|compute|delete|divide|evaluate|if|multiply|of-page|perform|read|receive|return|rewrite|search|start|string|subtract|unstring|write)|ending|enter|entry|entry-procedure|environment|eo[lps]|erase|error|escape|esi|evaluate|event|every|exception|exclusive|exhibit|exit|export|extend|extended|external|fd|file|file-control|filler|final|first|footing|for|foreground-color|foreground-colour|from|full|function|function-pointer|functionname|generate|giving|global|go|goback|grid|group|heading|(?:high-|low-)?values?|highlight|i-o|i-o-control|i[dfns]|identification|implicit|import|index|indexed|indicate|initial|initialize|initiate|input|input-output|inspect|installation|integer|into|invalid|invoke|just|justified|kanji|kept|key|keyboard|label|language|last|lb|ld|leading|left|leftline|length|length-check|libaccess|libparameter|library|limits?|linage|linage-counter|line-counter|lines?|linkage|list|local|local-storage|long-date|long-time|lower|lowlight|memory|merge|message|mmddyyyy|mode|modules|more-labels|move|multipl[ey]|named|national|national-edited|native|negative|network|[nt]ext|no|no-echo|nulls?|number|numeric|numeric-date|numeric-edited|numeric-time|object-computer|occurs|odt|off?|omitted|on|open|optional|order|orderly|organization|other|output|overflow|overline|packed-decimal|padding|page|page-counter|password|perform|pf|ph|pic|picture|plus|pointer|port|position|positive|printer|printing|private|procedure-pointer|procedures?|proceed|process|program|program-id|program-library|prompt|purge|queue|quotes?|random|rd|re(?:ad|ader|al|ceived?|cording|cords?|cursive|defines|el|f|ferences?|lative|lease|mainder|marks|mote|moval|move|names|place|placing|porting|ports?|quired|run|serve|set|turn|turn-code|turning|verse-video|versed|wind|write)|rf|rh|right|rounded|run|same|save|screen|sd|search|section|secure|security|segment|segment-limit|select|s?end|sentence|separate|sequence|sequential|set|shared|sharedbyall|sharedbyrununit|sharing|shift-in|shift-out|short-date|sign|size|sort|sort-(?:control|core-size|file-size|merge|message|mode-size|return)|source|source-computer|spaces?|special-names|standard|standard-[12]|start|status|stop|string|sub-queue-[123]|subtract|sum|suppress|symbol|symbolic|sync|synchronized|table|tally|tallying|tape|task|terminal|terminate|test|[tw]hen|thread|thread-local|through|thru|time[rs]?|title|todays-date|todays-name|top?|trailing|truncated|type|typedef|underline|unit|unstring|until|up|upon|usage|use|using|varying|virtual|wait|when-compiled|with|words|working-storage|write|year|yyyyddd|yyyymmdd|zero-fill|zeroe?s)(?![\w-])/i,
      lookbehind: true
    },
    "boolean": {
      pattern: /(^|[^\w-])(?:false|true)(?![\w-])/i,
      lookbehind: true
    },
    "number": {
      pattern: /(^|[^\w-])(?:[+-]?(?:(?:\d+(?:[.,]\d+)?|[.,]\d+)(?:e[+-]?\d+)?|zero))(?![\w-])/i,
      lookbehind: true
    },
    "operator": {
      pattern: /<>|[<>]=?|[=+*/&]|(^|[^\w-])(?:-|and|equal|greater|less|not|or|than)(?![\w-])/i,
      lookbehind: true
    },
    "punctuation": /[().,:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/coffeescript.js
  var comment2 = /#(?!\{).+/;
  var interpolation = {
    pattern: /#\{[^}]+\}/,
    alias: "variable"
  };
  var coffee = languages.coffee = languages.coffeescript = extend("js", {
    "comment": comment2,
    "string": [
      // Strings are multiline
      {
        pattern: /'(?:\\[^]|[^\\'])*'/g,
        greedy: true
      },
      {
        // Strings are multiline
        pattern: /"(?:\\[^]|[^\\"])*"/g,
        greedy: true,
        inside: {
          "interpolation": interpolation
        }
      }
    ],
    "keyword": /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extends?|false|true|finally|f?or|i[fns]|instanceof|isnt|let|loop|namespace|new|not?|null|off?|ow?n|return|super|switch|[tw]hen|this|throw|try|typeof|undefined|unless|until|while|window|with|yes|yield)\b/,
    "class-member": {
      pattern: /@(?!\d)\w+/,
      alias: "variable"
    }
  });
  insertBefore(coffee, "comment", {
    "multiline-comment": {
      pattern: /###[^]+?###/,
      alias: "comment"
    },
    // Block regexp can contain comments and interpolation
    "block-regex": {
      pattern: /\/{3}[^]*?\/{3}/,
      alias: "regex",
      inside: {
        "comment": comment2,
        "interpolation": interpolation
      }
    }
  });
  insertBefore(coffee, "string", {
    "inline-javascript": {
      pattern: /`(?:\\[^]|[^\\`])*`/,
      inside: {
        "delimiter": {
          pattern: /^`|`$/,
          alias: "punctuation"
        },
        "script": {
          pattern: /[^]+/,
          alias: "language-javascript",
          inside: "js"
        }
      }
    },
    // Block strings
    "multiline-string": [
      {
        pattern: /'''[^]*?'''/g,
        greedy: true,
        alias: "string"
      },
      {
        pattern: /"""[^]*?"""/g,
        greedy: true,
        alias: "string",
        inside: {
          "interpolation": interpolation
        }
      }
    ]
  });
  insertBefore(coffee, "keyword", {
    // Object property
    "property": /(?!\d)\w+(?=\s*:(?!:))/
  });
  delete coffee["template-string"];

  // node_modules/prism-code-editor/dist/prism/languages/concurnas.js
  var interpolation2 = {
    pattern: /((?:^|[^\\])(?:\\\\)*)\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
    lookbehind: true
  };
  interpolation2.inside = languages.conc = languages.concurnas = {
    "comment": clikeComment(),
    "regex-literal": {
      pattern: /\br(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true,
      inside: {
        "interpolation": interpolation2,
        "regex": /[^]+/
      }
    },
    "string-literal": {
      pattern: /(?:\B|\bs)(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true,
      inside: {
        "interpolation": interpolation2,
        "string": /[^]+/
      }
    },
    "langext": {
      pattern: /\b\w+\s*\|\|[^]+?\|\|/g,
      greedy: true,
      inside: {
        "class-name": /^\w+/,
        "string": {
          pattern: /(^\s*..)[^]+(?=..)/,
          lookbehind: true
        },
        "punctuation": /\|\|/
      }
    },
    "function": {
      pattern: /((?:^|\s)def[ 	]+)(?!\d)\w+(?=\s*\()/,
      lookbehind: true
    },
    "keyword": /\b(?:abstract|actor|also|annotation|assert|a?sync|await|bool|boolean|break|byte|case|[cm]atch|changed|char|class|closed|constant|continue|def|default|del|double|elif|else|enum|every|extends|false|true|finally|float|for|from|global|gpudef|gpukernel|if|import|in|ini?t|inject|lambda|local|long|loop|new|nodefault|null|of|onchange|open|out|override|package|parfor|parforsync|post|pre|private|protected|provider?|public|return|shared|short|single|size_t|sizeof|super|this|throw|trait|trans|transient|try|typedef|unchecked|using|va[lr]|void|while|with)\b/,
    "boolean": boolean,
    "number": /\b0b[01][01_]*l?\b|\b0x(?:[a-f\d_]*\.)?[a-f\d_p+-]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfls]?/i,
    "punctuation": clikePunctuation,
    "operator": /<==|>==|=>|->|<-|<>|&==|&<>|\?:?|\.\?|--|\+\+|[=<>/*+-]=?|[!^~]|\b(?:as|b?and|bx?or|comp|is|isnot|mod|or)\b=?/,
    "annotation": {
      pattern: /@(?:\w+:)?(?:\w+|\[[^\]]+\])?/,
      alias: "builtin"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/cooklang.js
  var single_token_suffix = "(?:(?!\\s)[\\d$+<=a-zA-Z\\x80-\\uffff])+";
  var multi_token_infix = "[^{}@#]+";
  var multi_token = multi_token_infix + "\\{[^}#@]*\\}";
  var amount_group_impl = {
    pattern: /\{[^{}]*\}/,
    inside: {
      "amount": {
        pattern: /([\{|])[^{}|*%]+/,
        lookbehind: true,
        alias: "number"
      },
      "unit": {
        pattern: /(%)[^}]+/,
        lookbehind: true,
        alias: "symbol"
      },
      "servings-scaler": {
        pattern: /\*/,
        alias: "operator"
      },
      "servings-alternative-separator": {
        pattern: /\|/,
        alias: "operator"
      },
      "unit-separator": {
        pattern: /(?:%|(\*)%)/,
        lookbehind: true,
        alias: "operator"
      },
      "punctuation": /[{}]/
    }
  };
  languages.cooklang = {
    // [- comment -]
    // -- comment
    "comment": /\[-[^]*?-\]|--.*/,
    "meta": {
      // >> key: value
      pattern: />>.*:.*/,
      inside: {
        "property": {
          // key:
          pattern: /(>>\s*)[^\s:](?:[^:]*[^\s:])?/,
          lookbehind: true
        }
      }
    },
    "cookware-group": {
      // #...{...}, #...
      pattern: RegExp(`#(?:${multi_token}|${single_token_suffix})`),
      inside: {
        "cookware": {
          pattern: RegExp(`(^#)(?:${multi_token_infix})`),
          lookbehind: true,
          alias: "variable"
        },
        "cookware-keyword": {
          pattern: /^#/,
          alias: "keyword"
        },
        "quantity-group": {
          pattern: /\{[^{}@#]*\}/,
          inside: {
            "punctuation": /[{}]/,
            "quantity": {
              pattern: /[^]+/,
              alias: "number"
            }
          }
        }
      }
    },
    "ingredient-group": {
      // @...{...}, @...
      pattern: RegExp(`@(?:${multi_token}|${single_token_suffix})`),
      inside: {
        "ingredient": {
          pattern: RegExp(`(^@)(?:${multi_token_infix})`),
          lookbehind: true,
          alias: "variable"
        },
        "ingredient-keyword": {
          pattern: /^@/,
          alias: "keyword"
        },
        "amount-group": amount_group_impl
      }
    },
    "timer-group": {
      // ~timer{...}
      // eslint-disable-next-line regexp/sort-alternatives
      pattern: /~(?!\s)[^@#~{}]*\{[^{}]*\}/,
      inside: {
        "timer": {
          pattern: /(^~)[^{]+/,
          lookbehind: true,
          alias: "variable"
        },
        "duration-group": {
          // {...}
          pattern: /\{[^{}]*\}/,
          inside: {
            "punctuation": /[{}]/,
            "unit": {
              pattern: /(%\s*)(?:h|hours|hrs|m|min|minutes)\b/,
              lookbehind: true,
              alias: "symbol"
            },
            "operator": /%/,
            "duration": {
              pattern: /\d+/,
              alias: "number"
            }
          }
        },
        "timer-keyword": {
          pattern: /^~/,
          alias: "keyword"
        }
      }
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/coq.js
  var string3 = {
    pattern: /"(?:[^"]|"")*"(?!")/g,
    greedy: true
  };
  var commentSource = nested("\\(\\*(?:[^(*]|\\((?!\\*)|\\*(?!\\))|<self>)*\\*\\)", 2);
  languages.coq = {
    "comment": RegExp(commentSource),
    "string": string3,
    "attribute": [
      {
        pattern: re('#\\[(?:[^[\\]("]|"(?:[^"]|"")*"(?!")|\\((?!\\*)|<0>)*\\]', [commentSource], "g"),
        greedy: true,
        alias: "attr-name",
        inside: {
          "comment": RegExp(commentSource),
          "string": string3,
          "operator": /=/,
          "punctuation": /^#\[|\]$|[(),]/
        }
      },
      {
        pattern: /\b(?:Cumulative|Global|Local|Monomorphic|NonCumulative|Polymorphic|Private|Program)\b/,
        alias: "attr-name"
      }
    ],
    "keyword": /\b(?:Abort|About|Add|Admit|Admitted|All|Arguments|As|Assumptions|Axioms?|Back|BackTo|Backtrace|BinOp|BinOpSpec|BinRel|Bind|Blacklist|Canonical|Case|Cd|Check|Class|Classes|Close|CoFixpoint|CoInductive|Coercions?|Collection|Combined|Compute|Conjectures?|Constants?|Constraint|Constructors|Context|Corollary|Create|CstOp|Custom|Cut|Debug|Declare|Defined|Definition|Delimit|Dependencies|Dependent|Derive|Diffs|Drop|Elimination|End|Entry|Equality|Eval|Example|Existentials?|Existing|Export|Extern|Extraction|Fact|Fail|Field|File|Firstorder|Fixpoint|Flags|Focus|From|Funclass|Function|Functional|GC|Generalizable|Goal|Grab|Grammar|Graph|Guarded|Haskell|Heap|Hide|HintDb|Hints?|Hypothes[ei]s|IF|Identity|Immediate|Implicits?|Import|Include|Induction|Inductive|Infix|Info|Initial|InjTyp|Inline|Inspect|Instances?|Intros?|Inversion|Inversion_clear|JSON|Language|Left|Lemma|Lia|Libraries|Library|Load|LoadPath|Locate|Ltac2?|ML|Match|Method|Minimality|Modules?|Morphism|Next|NoInline|Notation|Number|OCaml|Obligations?|Opaque|Open|Optimize|Parameters?|Parametric|Paths?|Prenex|Preterm|Primitive|Print|Profile|Projections|Proof|S?Prop|PropBinOp|PropU?Op|Property|Proposition|Pwd|Qed|Quit|Rec|Record|Recursive|Redirect|Reduction|Register|Relation|Remark|Remove|Require|Reserved|Reset|Resolve|Restart|Rewrite|Right|Rings?|Saturate|Save|Scheme|Scopes?|Search|SearchHead|SearchPattern|SearchRewrite|Section|Separate|Setoid|Show|Signatures|Solver?|Sort|Sortclass|Sorted|Spec|Step|Strategies|Strategy|String|Structure|SubClass|Subgraph|SuchThat|Tactic|Term|TestCompile|Theorem|Time|Timeout|To|Transparent|Typeclasses|Types?|Typing|UnOp|UnOpSpec|Undelimit|Undo|Unfocus|Unfocused|Unfold|Universes?|Unshelve|Variables?|Variant|Verbose|View|Visibility|Zify|_|apply|as|at|by|cofix|else|end|exists2?|fix|for|forall|fun|if|in|[lLS]et|match|measure|move|removed|return|struct|then|using|wf|where|with)\b/,
    "number": /\b(?:0x[a-f\d][a-f\d_]*(?:\.[a-f\d_]+)?(?:p[+-]?\d[\d_]*)?|\d[\d_]*(?:\.[\d_]+)?(?:e[+-]?\d[\d_]*)?)\b/i,
    "punct": {
      pattern: /@\{|\{\||\[=|:>/,
      alias: "punctuation"
    },
    "operator": /\/\\|\\\/|\.{2,3}|::?=|\*\*|[=-]>|<->?|<<:|<[+:=<>]|>=|>->|\|[-|]|[?@~'%&|^!=<>/*+-]/,
    "punctuation": /\.\(|`[({]|@\{|\{\||\[=|:>|[()[\]{}.,:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/ruby.js
  var interpolationContent = {
    pattern: /^(..)[^]+(?=.)/,
    lookbehind: true
  };
  var percentExpression = "(?:([^a-zA-Z\\d\\s{(\\[<=])(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|\\((?:\\\\[\\s\\S]|[^\\\\()]|\\((?:\\\\[\\s\\S]|[^\\\\()])*\\))*\\)|\\{(?:\\\\[\\s\\S]|[^\\\\{}]|\\{(?:\\\\[\\s\\S]|[^\\\\{}])*\\})*\\}|\\[(?:\\\\[\\s\\S]|[^\\\\[\\]]|\\[(?:\\\\[\\s\\S]|[^\\\\[\\]])*\\])*\\]|<(?:\\\\[\\s\\S]|[^\\\\<>]|<(?:\\\\[\\s\\S]|[^\\\\<>])*>)*>)";
  var symbolName = '(?:"(?:\\\\.|[^\\\\\n"])*"|(?:\\b(?!\\d)\\w+|[^\\s\0-\\x7f]+)[?!]?|\\$.)';
  var interpolation3 = {
    pattern: /((?:^|[^\\])(?:\\\\)*)#\{(?:[^{}]|\{[^}]*\})*\}/,
    lookbehind: true,
    inside: {
      "content": interpolationContent,
      "delimiter": {
        pattern: /.+/,
        alias: "punctuation"
      }
    }
  };
  interpolationContent.inside = languages.rb = languages.ruby = {
    "comment": {
      pattern: /#.*|^=begin\s[^]*?^=end/mg,
      greedy: true
    },
    "string-literal": [
      {
        pattern: RegExp("%[qQiIwWs]?" + percentExpression, "g"),
        greedy: true,
        inside: {
          "interpolation": interpolation3,
          "string": /[^]+/
        }
      },
      {
        pattern: /(["'])(?:#\{[^}]+\}|#(?!\{)|\\[^]|(?!\1)[^\\#\n])*\1/g,
        greedy: true,
        inside: {
          "interpolation": interpolation3,
          "string": /[^]+/
        }
      },
      {
        pattern: /<<[-~]?([a-z_]\w*)\n(?:.*\n)*?[ 	]*\1/gi,
        alias: "heredoc-string",
        greedy: true,
        inside: {
          "delimiter": {
            pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
            inside: {
              "symbol": /\w+/,
              "punctuation": /^<<[-~]?/
            }
          },
          "interpolation": interpolation3,
          "string": /[^]+/
        }
      },
      {
        pattern: /<<[-~]?'([a-z_]\w*)'\n(?:.*\n)*?[ 	]*\1/gi,
        alias: "heredoc-string",
        greedy: true,
        inside: {
          "delimiter": {
            pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
            inside: {
              "symbol": /\w+/,
              "punctuation": /^<<[-~]?'|'$/
            }
          },
          "string": /[^]+/
        }
      }
    ],
    "command-literal": [
      {
        pattern: RegExp("%x" + percentExpression, "g"),
        greedy: true,
        inside: {
          "interpolation": interpolation3,
          "command": {
            pattern: /[^]+/,
            alias: "string"
          }
        }
      },
      {
        pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\[^]|[^\\`#\n])*`/g,
        greedy: true,
        inside: {
          "interpolation": interpolation3,
          "command": {
            pattern: /[^]+/,
            alias: "string"
          }
        }
      }
    ],
    "class-name": {
      pattern: /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
      lookbehind: true,
      inside: {
        "punctuation": /[\\.]/
      }
    },
    "regex-literal": [
      {
        pattern: RegExp(`%r${percentExpression}[egimnosux]{0,6}`, "g"),
        greedy: true,
        inside: {
          "interpolation": interpolation3,
          "regex": /[^]+/
        }
      },
      {
        pattern: /(^|[^/])\/(?!\/)(?:\[[^\n\]]+\]|\\.|[^\\\n/[])+\/[egimnosux]{0,6}(?=\s*(?:$|[\n,.;})#]))/g,
        lookbehind: true,
        greedy: true,
        inside: {
          "interpolation": interpolation3,
          "regex": /[^]+/
        }
      }
    ],
    "variable": /[@$]+(?!\d)\w+(?:[?!]|\b)/,
    "symbol": [
      {
        pattern: RegExp("(^|[^:]):" + symbolName, "g"),
        lookbehind: true,
        greedy: true
      },
      {
        pattern: RegExp("([\n{(,][ 	]*)" + symbolName + "(?=:(?!:))", "g"),
        lookbehind: true,
        greedy: true
      }
    ],
    "method-definition": {
      pattern: /(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,
      lookbehind: true,
      inside: {
        "function": /\b\w+$/,
        "keyword": /^self\b/,
        "class-name": /^\w+/,
        "punctuation": /\./
      }
    },
    "keyword": /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|f?or|if|in|include|module|new|next|nil|not|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|[tw]hen|throw|undef|unless|until|while|yield)\b/,
    "boolean": boolean,
    "builtin": /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
    "constant": /\b[A-Z][A-Z\d_]*(?:[?!]|\b)/,
    "number": clikeNumber,
    "double-colon": {
      pattern: /::/,
      alias: "punctuation"
    },
    "operator": /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[%&|^!=<>/*+-])=?|[?:]/,
    "punctuation": /[()[\]{}.,;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/crystal.js
  var crystal = languages.crystal = extend("ruby", {
    "keyword": {
      pattern: /\b(?:__DIR__|__END_LINE__|__FILE__|__LINE__|abstract|alias|annotation|asm?|begin|break|case|class|def|do|else|elsif|end|ensure|enum|extend|for|fun|if|ifdef|include|instance_sizeof|lib|macro|module|next|of|out|pointerof|private|protected|ptr|require|rescue|return|select|self|sizeof|struct|super|[tw]hen|type|typeof|undef|uninitialized|union|unless|until|while|with|yield)\b|(\.\s*)(?:is_a|responds_to)\?/,
      lookbehind: true
    },
    "number": /\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[a-fA-F\d_]*[a-fA-F\d]|(?:\d(?:[\d_]*\d)?)(?:\.[\d_]*\d)?(?:[eE][+-]?[\d_]*\d)?)(?:_(?:[uif](?:8|16|32|64))?)?\b/,
    "operator": [
      /->/,
      languages.ruby.operator
    ],
    "punctuation": /[()[\]{}.,;\\]/
  });
  insertBefore(crystal, "string-literal", {
    "attribute": {
      pattern: /@\[.*?\]/,
      inside: {
        "delimiter": {
          pattern: /^@\[|\]$/,
          alias: "punctuation"
        },
        "attribute": {
          pattern: /^(\s*)\w+/,
          lookbehind: true,
          alias: "class-name"
        },
        "args": {
          pattern: /\S(?:.*\S)?/,
          inside: crystal
        }
      }
    },
    "expansion": {
      pattern: /\{(?:\{.*?\}|%.*?%)\}/,
      inside: {
        "content": {
          pattern: /^(..).+(?=..)/,
          lookbehind: true,
          inside: crystal
        },
        "delimiter": {
          pattern: /../,
          alias: "operator"
        }
      }
    },
    "char": {
      pattern: /'(?:[^\\\n]{1,2}|\\(?:.|u(?:[a-fA-F\d]{1,4}|\{[a-fA-F\d]{1,6}\})))'/g,
      greedy: true
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/cshtml.js
  var commentLike = "/(?![/*])|//.*\n|/\\*[^*]*(?:\\*(?!/)[^*]*)*\\*/";
  var stringLike = `@(?!")|"(?:[^\\\\
"]|\\\\.)*"|@"(?:\\\\[^]|[^\\\\"]|"")*"(?!")|'(?:(?:[^\\\\
']|\\\\.|\\\\[Uux][a-fA-Fd]{1,8})'|(?=[^\\\\](?!')))`;
  var round = nested(replace(`\\((?:[^()"'@/]|<0>|<1>|<self>)*\\)`, [stringLike, commentLike]), 2);
  var square = nested(replace(`\\[(?:[^[\\]"'@/]|<0>|<1>|<self>)*\\]`, [stringLike, commentLike]), 1);
  var curly = nested(replace(`\\{(?:[^{}"'@/]|<0>|<1>|<self>)*\\}`, [stringLike, commentLike]), 2);
  var angle = nested(replace(`<(?:[^<>"'@/]|<0>|<self>)*>`, [commentLike]), 1);
  var inlineCs = `@(?:await\\b\\s*)?(?:(?!await\\b)\\w+\\b|${round})(?:[?!]?\\.\\w+\\b|(?:${angle})?${round}|${square})*(?![?!\\.(\\[]|<(?!\\/))`;
  var tagAttrInlineCs = "@(?![()\\w])|" + inlineCs;
  var tagAttrValue = `(?:"[^"@]*"|'[^'@]*'|[^\\s"'@=>]+(?=[\\s>])|["'][^"'@]*(?:(?:${tagAttrInlineCs})[^"'@]*)+["'])`;
  var tagAttrs = `(?:\\s(?:\\s*[^\\s/=>]+(?:\\s*=\\s*${tagAttrValue}|(?=[\\s/>])))+)?`;
  var tagContent = `(?!\\d)[^\\s/=>$<%]+${tagAttrs}\\s*\\/?>`;
  var tagRegion = `\\B@?(?:<([a-zA-Z][\\w:]*)${tagAttrs}\\s*>(?:[^<]|<\\/?(?!\\1\\b)${tagContent}|${nested(
    `<\\1${tagAttrs}\\s*>(?:[^<]|<\\/?(?!\\1\\b)${tagContent}|<self>)*<\\/\\1\\s*>`,
    2
  )})*<\\/\\1\\s*>|<${tagContent})`;
  var cshtml = languages.razor = languages.cshtml = clone2(languages.html);
  var csharpWithHtml = clone2(languages.cs);
  var cs = {
    pattern: /\S[^]*/,
    alias: "language-csharp",
    inside: csharpWithHtml
  };
  var inlineValue = {
    pattern: RegExp("(^|[^@])" + inlineCs, "g"),
    lookbehind: true,
    greedy: true,
    alias: "variable",
    inside: {
      "keyword": /^@/,
      "csharp": cs
    }
  };
  var attrValue = cshtml.tag.inside["attr-value"][2];
  cshtml.tag.pattern = RegExp("</?" + tagContent, "g");
  attrValue.pattern = RegExp("(=\\s*)" + tagAttrValue, "g");
  insertBefore(csharpWithHtml, "string", {
    "html": {
      pattern: RegExp(tagRegion, "g"),
      greedy: true,
      inside: cshtml
    }
  });
  insertBefore(attrValue.inside, "punctuation", { "value": inlineValue });
  insertBefore(cshtml, "prolog", {
    "razor-comment": {
      pattern: /@\*[^]*?\*@/g,
      greedy: true,
      alias: "comment"
    },
    "block": {
      pattern: RegExp(
        `(^|[^@])@(?:${curly}|(?:code|functions)\\s*${curly}|(?:for|foreach|lock|switch|using|while)\\s*${round}\\s*${curly}|do\\s*${curly}\\s*while\\s*${round}(?:\\s*;)?|try\\s*${curly}\\s*catch\\s*${round}\\s*${curly}\\s*finally\\s*${curly}|if\\s*${round}\\s*${curly}(?:\\s*else(?:\\s+if\\s*${round})?\\s*${curly})*|helper\\s+\\w+\\s*${round}\\s*${curly})`,
        "g"
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        "keyword": /^@\w*/,
        "csharp": cs
      }
    },
    "directive": {
      pattern: /^([ 	]*)@(?:addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|section|tagHelperPrefix|using)(?=\s).*/mg,
      lookbehind: true,
      greedy: true,
      inside: {
        "keyword": /^@\w+/,
        "csharp": cs
      }
    },
    "value": inlineValue,
    "delegate-operator": {
      pattern: /(^|[^@])@(?=<)/,
      lookbehind: true,
      alias: "operator"
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/csp.js
  var value = (pattern) => RegExp("([ 	])(?:" + pattern + ")(?![^\\s;])", "i");
  languages.csp = {
    "directive": {
      pattern: /(^|[\s;])(?:base-uri|block-all-mixed-content|(?:child|connect|default|font|frame|img|manifest|media|object|prefetch|script|style|worker)-src|disown-opener|form-action|frame-(?:ancestors|options)|input-protection(?:-(?:clip|selectors))?|navigate-to|plugin-types|policy-uri|referrer|reflected-xss|report-(?:to|uri)|require-sri-for|sandbox|(?:script|style)-src-(?:attr|elem)|upgrade-insecure-requests)(?![^\s;])/i,
      lookbehind: true,
      alias: "property"
    },
    "scheme": {
      pattern: value("[a-z][a-z\\d.+-]*:"),
      lookbehind: true
    },
    "none": {
      pattern: value("'none'"),
      lookbehind: true,
      alias: "keyword"
    },
    "nonce": {
      pattern: value("'nonce-[\\w=/+-]+'"),
      lookbehind: true,
      alias: "number"
    },
    "hash": {
      pattern: value("'sha(?:256|384|512)-[\\w=/+-]+'"),
      lookbehind: true,
      alias: "number"
    },
    "host": {
      pattern: value(
        "[a-z][a-z\\d.+-]*://[^\\s;,']*|\\*[^\\s;,']*|[a-z\\d-]+(?:\\.[a-z\\d-]+)+(?::[\\d*]+)?(?:/[^\\s;,']*)?"
      ),
      lookbehind: true,
      alias: "url",
      inside: {
        "important": /\*/
      }
    },
    "keyword": [
      {
        pattern: value("'unsafe-[a-z-]+'"),
        lookbehind: true,
        alias: "unsafe"
      },
      {
        pattern: value("'[a-z-]+'"),
        lookbehind: true,
        alias: "safe"
      }
    ],
    "punctuation": /;/
  };

  // node_modules/prism-code-editor/dist/prism/languages/css.js
  var string4 = /(?:"(?:\\[^]|[^\\\n"])*"|'(?:\\[^]|[^\\\n'])*')/g;
  var stringSrc = string4.source;
  var atruleInside = {
    "rule": /^@[\w-]+/,
    "selector-function-argument": {
      pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^)]*\))*\))+(?=\s*\))/,
      lookbehind: true,
      alias: "selector"
    },
    "keyword": {
      pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
      lookbehind: true
    }
    // See rest below
  };
  atruleInside[rest] = languages.css = {
    "comment": /\/\*[^]*?\*\//,
    "atrule": {
      pattern: RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|${stringSrc})*?(?:;|(?=\\s*\\{))`),
      inside: atruleInside
    },
    "url": {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp(`\\burl\\((?:${stringSrc}|(?:[^\\\\
"')=]|\\\\[^])*)\\)`, "gi"),
      greedy: true,
      inside: {
        "function": /^url/i,
        "punctuation": /^\(|\)$/,
        "string": {
          pattern: RegExp("^" + stringSrc + "$"),
          alias: "url"
        }
      }
    },
    "selector": {
      pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|${stringSrc})*(?=\\s*\\{)`),
      lookbehind: true
    },
    "string": {
      pattern: string4,
      greedy: true
    },
    "property": {
      pattern: /(^|[^-\w\xa0-\uffff])(?!\d)(?:(?!\s)[-\w\xa0-\uffff])+(?=\s*:)/i,
      lookbehind: true
    },
    "important": /!important\b/i,
    "function": {
      pattern: /(^|[^-a-z\d])[-a-z\d]+(?=\()/i,
      lookbehind: true
    },
    "punctuation": /[(){},:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/css-extras.js
  var css = languages.css;
  css.selector.inside = css["atrule"].inside["selector-function-argument"].inside = {
    "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    "pseudo-class": /:[-\w]+/,
    "class": /\.[-\w]+/,
    "id": /#[-\w]+/,
    "attribute": {
      pattern: /\[(?:[^[\]"']|(["'])(?:\\[^]|(?!\1)[^\\\n])*\1)*\]/g,
      greedy: true,
      inside: {
        "punctuation": /^\[|\]$/,
        "case-sensitivity": {
          pattern: /(\s)[si]$/i,
          lookbehind: true,
          alias: "keyword"
        },
        "namespace": {
          pattern: /^(\s*)(?:(?!\s)[-*\w\xa0-\uffff])*\|(?!=)/,
          lookbehind: true,
          inside: {
            "punctuation": /\|$/
          }
        },
        "attr-name": {
          pattern: /^(\s*)(?:(?!\s)[-\w\xa0-\uffff])+/,
          lookbehind: true
        },
        "attr-value": {
          pattern: /(=\s*)(?:(?!\s)[-\w\xa0-\uffff])+(?=\s*$)|(["'])(?:\\[^]|(?!\2)[^\\\n])*\2/,
          lookbehind: true
        },
        "operator": /[|~*^$]?=/
      }
    },
    "n-th": [
      {
        pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
        lookbehind: true,
        inside: {
          "number": /[\dn]+/,
          "operator": /[+-]/
        }
      },
      {
        pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
        lookbehind: true
      }
    ],
    "combinator": /[>+~]|\|\|/,
    // the `tag` token has been existed and removed.
    // because we can't find a perfect tokenize to match it.
    // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.
    "punctuation": /[(),]/
  };
  insertBefore(css, "property", {
    "variable": {
      pattern: /(^|[^-\w\xa0-\uffff])--(?!\d)(?:(?!\s)[-\w\xa0-\uffff])*/i,
      lookbehind: true
    }
  });
  insertBefore(css, "function", {
    "operator": {
      pattern: /(\s)[/*+-](?!\S)/,
      lookbehind: true
    },
    "hexcode": {
      pattern: /\B#[a-f\d]{3,8}\b/i,
      alias: "color"
    },
    // it's important that there is no boundary assertion after the hex digits
    "entity": /\\[a-f\d]{1,8}/i,
    "unit": {
      pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
      lookbehind: true
    },
    // 123 -123 .123 -.123 12.3 -12.3
    "number": {
      pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
      lookbehind: true
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/csv.js
  languages.csv = {
    "value": /[^\n,"]+|"(?:[^"]|"")*"(?!")/,
    "punctuation": /,/
  };

  // node_modules/prism-code-editor/dist/prism/languages/cue.js
  var stringEscape = "\\\\(?:(?!\\2)|\\2(?:[^()\n]|\\([^()]*\\)))";
  var stringLiteral = re(`(^|[^#"'\\\\])(#*)(?:"""(?:[^\\\\"]|"(?!""\\2)|<0>)*"""|'''(?:[^\\\\']|'(?!''\\2)|<0>)*'''|"(?:[^\\\\
"]|"(?!\\2)|<0>)*"|'(?:[^\\\\
']|'(?!\\2)|<0>)*')(?!["'])\\2`, [stringEscape], "g");
  var expression3 = {
    pattern: /[^]+/
  };
  expression3.inside = languages.cue = {
    "comment": /\/\/.*/,
    "string-literal": {
      pattern: stringLiteral,
      lookbehind: true,
      greedy: true,
      inside: {
        // I'm using dirty hack here. We have to know the number hashes at the start of the string somehow,
        // but we can't look back. So instead, we will use a lookahead, go to the end of the string, and
        // capture the hashes at the end of the string.
        "escape": {
          pattern: /(?=[^]*["'](#*)$)\\\1(?:U[a-fA-F\d]{1,8}|u[a-fA-F\d]{1,4}|x[a-fA-F\d]{1,2}|\d{2,3}|[^(])/g,
          greedy: true,
          alias: "string"
        },
        "interpolation": {
          pattern: /(?=[^]*["'](#*)$)\\\1\([^()]*\)/g,
          greedy: true,
          inside: {
            "punctuation": /^\\#*\(|\)$/,
            "expression": expression3
          }
        },
        "string": /[^]+/
      }
    },
    "keyword": {
      pattern: /(^|[^$\w])(?:for|if|import|in|let|null|package)(?![$\w])/,
      lookbehind: true
    },
    "boolean": {
      pattern: /(^|[^$\w])(?:false|true)(?![$\w])/,
      lookbehind: true
    },
    "builtin": {
      pattern: /(^|[^$\w])(?:bool|bytes|float(?:32|64)?|u?int(?:8|16|32|64|128)?|number|rune|string)(?![$\w])/,
      lookbehind: true
    },
    "attribute": {
      pattern: /@[$\w]+(?=\s*\()/,
      alias: "function"
    },
    "function": {
      pattern: /(^|[^$\w])[a-z_$][$\w]*(?=\s*\()/i,
      lookbehind: true
    },
    "number": {
      pattern: /(^|[^$\w.])(?:0b[01]+(?:_[01]+)*|0o[0-7]+(?:_[0-7]+)*|0[xX][a-fA-F\d]+(?:_[a-fA-F\d]+)*|(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[eE][+-]?\d+(?:_\d+)*)?(?:[KMGTP]i?)?)(?![$\w])/,
      lookbehind: true
    },
    "operator": /\.{3}|_\|_|&&?|\|\|?|[!=]~|[<>!=]=?|[?/*+-]/,
    "punctuation": /[()[\]{}.,:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/cypher.js
  languages.cypher = {
    // https://neo4j.com/docs/cypher-manual/current/syntax/comments/
    "comment": /\/\/.*/,
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'/g,
      greedy: true
    },
    "class-name": {
      pattern: /(:\s*)(?:\w+|`(?:[^\\\n`])*`)(?=\s*[{):])/g,
      lookbehind: true,
      greedy: true
    },
    "relationship": {
      pattern: /(-\[\s*(?:\w+\s*|`(?:[^\\\n`])*`\s*)?:\s*|\|\s*:\s*)(?:\w+|`(?:[^\\\n`])*`)/g,
      lookbehind: true,
      greedy: true,
      alias: "property"
    },
    "identifier": {
      pattern: /`(?:[^\\\n`])*`/g,
      greedy: true
    },
    "variable": /\$\w+/,
    // https://neo4j.com/docs/cypher-manual/current/syntax/reserved/
    "keyword": /\b(?:add|and|asc?|ascending|assert|by|c?all|case|commit|constraint|contains|create|csv|delete|desc|descending|detach|distinct|do|drop|else|ends?|exists|for|foreach|in|index|is|join|key|limit|load|mandatory|match|merge|node|not|of|on|optional|order(?=\s+by)|periodic|remove|require|return|scalar|scan|set|skip|starts?|[tw]hen|union|unique|unwind|using|where|with|x?or|yield)\b/i,
    "function": /\b\w+(?=\s*\()/,
    "boolean": /\b(?:false|true|null)\b/i,
    "number": /\b(?:0x[a-fA-F\d]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/,
    // https://neo4j.com/docs/cypher-manual/current/syntax/operators/
    "operator": /<--?|--?>?|<>|=~?|[<>]=?|[:%|^/*+]|\.{2,3}/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/d.js
  languages.d = {
    "comment": {
      pattern: /^\s*#!.+|(?:\/\+(?:\/\+(?:[^+]|\+(?!\/))*\+\/|(?!\/\+)[^])*?\+\/|\/\/.*|\/\*[^]*?\*\/)/g,
      greedy: true
    },
    // Characters
    // 'a', '\\', '\n', '\xFF', '\377', '\uffff', '\U0010FFFF', '\quot'
    "char": /'(?:\\(?:\W|\w+)|[^\\])'/,
    "string": [
      {
        pattern: /\b[rx]"(?:\\[^]|[^\\"])*"[cwd]?|\bq"(?:\[[^]*?\]|\([^]*?\)|<[^]*?>|\{[^]*?\})"|\bq"((?!\d)\w+)$[^]*?^\1"|\bq"(.)[^]*?\2"|(["`])(?:\\[^]|(?!\3)[^\\])*\3[cwd]?/gm,
        greedy: true
      },
      {
        pattern: /\bq\{(?:[^{}]|\{[^}]*\})*\}/g,
        greedy: true,
        alias: "token-string"
      }
    ],
    "class-name": clikeClass(),
    "property": /\B@\w*/,
    // In order: $, keywords and special tokens, globally defined symbols
    "keyword": /\$|\b(?:__(?:(?:DATE|EOF|FILE|FUNCTION|LINE|MODULE|PRETTY_FUNCTION|TIMESTAMP|TIME|VENDOR|VERSION)__|gshared|parameters|traits|vector)|abstract|alias|align|asm|assert|auto|body|bool|break|cas[et]|catch|[ci]?double|[ci]?float|class|const|continue|[ci]?real|[dw]?char|debug|default|delegate|delete|deprecated|do|d?string|else|enum|export|extern|false|true|final|finally|for|foreach|foreach_reverse|function|goto|if|immutable|import|inout|interface|invariant|lazy|macro|mixin|module|new|nothrow|null|out|override|package|pragma|private|protected|ptrdiff_t|public|pure|ref|return|scope|shared|size_t|static|struct|super|switch|synchronized|template|this|throw|try|typedef|typeid|typeof|u?byte|u?cent|u?int|u?long|union|unittest|u?short|version|void|volatile|while|with|wstring)\b/,
    "boolean": boolean,
    "register": {
      // Iasm registers
      pattern: /\b(?:[ABCD][LHX]|E?(?:BP|DI|SI|SP)|[BS]PL|[ECSDGF]S|CR[0234]|[DS]IL|DR[012367]|[ER][ABCD]X|X?MM[0-7]|R(?:1[0-5]|[89])[BWD]?|R[BS]P|R[DS]I|TR[3-7]|XMM(?:1[0-5]|[89])|YMM(?:1[0-5]|\d))\b|\bST(?:\([0-7]\)|\b)/,
      alias: "variable"
    },
    "function": /\b\w+(?=\()/,
    "number": {
      // The lookbehind and the negative look-ahead try to prevent bad highlighting of the .. operator
      // Hexadecimal numbers must be handled separately to avoid problems with exponent "e"
      pattern: /\b0x\.?[a-f\d_]+(?:(?!\.\.)\.[a-f\d_]*)?(?:p[+-]?[a-f\d_]+)?[ulfi]{0,4}|(\.\.)?(?:\b0b\.?|\b|\.)\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:e[+-]?\d[\d_]*)?[ulfi]{0,4}/i,
      lookbehind: true
    },
    "operator": /--|\+\+|&&|\|\||=>|!?\bi[ns]\b|(?:!<>?|!>|<[<>]?|>>?>?|\^\^|[~%&|^!=/*+-])=?|\.{2,3}/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/dart.js
  var keywords3 = /\b(?:a?sync|yield)\b\*?|\b(?:abstract|assert|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|final|finally|for|[gs]et|hide|if|implements|import|in|interface|library|mixin|new|null|on|operator|part|rethrow|return|show|static|super|switch|this|throw|try|typedef|var|void|while|with)\b/;
  var packagePrefix = "(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*";
  var className2 = {
    pattern: RegExp(packagePrefix + "[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"),
    lookbehind: true,
    inside: {
      "namespace": {
        pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
        inside: {
          "punctuation": /\./
        }
      }
    }
  };
  languages.dart = {
    "comment": clikeComment(),
    "string-literal": {
      pattern: /r?(?:("""|''')[^]*?\1|(["'])(?:\\.|(?!\2)[^\\\n])*\2(?!\2))/g,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$(?:\w+|\{(?:[^{}]|\{[^}]*\})*\})/,
          lookbehind: true,
          inside: {
            "punctuation": /^\$\{?|\}$/,
            "expression": {
              pattern: /[^]+/,
              inside: "dart"
            }
          }
        },
        "string": /[^]+/
      }
    },
    "metadata": {
      pattern: /@\w+/,
      alias: "function"
    },
    "generics": {
      pattern: /<(?:[\w\s.,&?]|<(?:[\w\s.,&?]|<(?:[\w\s.,&?]|<[\w\s.,&?]*>)*>)*>)*>/,
      inside: {
        "class-name": className2,
        "keyword": keywords3,
        "punctuation": /[().,:<>]/,
        "operator": /[?&|]/
      }
    },
    "class-name": [
      className2,
      {
        // variables and parameters
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(packagePrefix + "[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()])"),
        lookbehind: true,
        inside: className2.inside
      }
    ],
    "keyword": keywords3,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "number": clikeNumber,
    "operator": /\bis!|\b[ai]s\b|--|\+\+|&&|\|\||<<=?|>>=?|~\/=?|[*/%&^|!=<>+-]=?|[~?]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/dataweave.js
  languages.dataweave = {
    "url": /\b[a-zA-Z]+:\/\/[\w/:.?=&-]+|\burn:[\w:.?=&-]+/,
    "property": {
      pattern: /(?:\b\w+#)?(?:"(?:\\.|[^\\\n"])*"|\b\w+)(?=\s*[:@])/g,
      greedy: true
    },
    "string": {
      pattern: /(["'`])(?:\\[^]|(?!\1)[^\\])*\1/g,
      greedy: true
    },
    "mime-type": /\b(?:application|audio|image|multipart|text|video)\/[\w+-]+/,
    "date": {
      pattern: /\|[\w:+-]+\|/g,
      greedy: true
    },
    "comment": clikeComment(),
    "regex": {
      pattern: /\/(?:[^\\\n/]|\\[^\n])+\//g,
      greedy: true
    },
    "keyword": /\b(?:and|as|at|case|do|else|fun|if|input|is|match|not|ns|null|or|output|type|unless|update|using|var)\b/,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "number": /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    "punctuation": /[()[\]{}.,:;@]/,
    "operator": /<<|>>|->|[~!=<>]=?|--?-?|\+\+?|\?/,
    "boolean": boolean
  };

  // node_modules/prism-code-editor/dist/prism/languages/dax.js
  languages.dax = {
    "comment": /\/\*[^]*?\*\/|(?:--|\/\/).*/,
    "data-field": {
      pattern: /'(?:[^']|'')*'(?!')(?:\[[ \w\xa0-\uffff]+\])?|\w+\[[ \w\xa0-\uffff]+\]/,
      alias: "symbol"
    },
    "measure": {
      pattern: /\[[ \w\xa0-\uffff]+\]/,
      alias: "constant"
    },
    "string": {
      pattern: /"(?:[^"]|"")*"(?!")/g,
      greedy: true
    },
    "function": /\b(?:abs|a?cosh?|a?coth?|addcolumns|addmissingitems|all|allcrossfiltered|allexcept|allnoblankrow|allselected|and|approximatedistinctcount|a?sinh?|a?tanh?|average[ax]?|beta\.dist|beta\.inv|blank|calculate|calculatetable|calendar|calendarauto|ceiling|chisq\.(?:dist|inv)(?:\.rt)?|(?:closingbalance|endof|next|openingbalance|previous|startof)(?:month|quarter|year)|coalesce|combina?|combinevalues|concatenatex?|confidence\.norm|confidence\.t|contains|containsrow|containsstring|containsstringexact|convert|counta?x?|countblank|countrows|crossfilter|crossjoin|currency|currentgroup|customdata|datatable|dateadd|datediff|datesbetween|datesinperiod|datesmtd|datesqtd|datesytd|datevalue|day|degrees|detailrows|distinct|distinctcount|distinctcountnoblank|divide|earlier|earliest|e?date|eomonth|error|even|exact|except|exp|expon\.dist|fact|false|true|filters?|find|firstdate|firstnonblank|firstnonblankvalue|fixed|floor|format|gcd|generate|generateall|generateseries|geomeanx?|groupby|hasonefilter|hasonevalue|hour|if|if\.eager|iferror|ignore|int|intersect|isblank|iscrossfiltered|isempty|iserror|iseven|isfiltered|isinscope|islogical|isnontext|isnumber|iso\.ceiling|isodd|isonorafter|isselectedmeasure|issubtotal|istext|keepfilters|keywordmatch|lastdate|lastnonblank|lastnonblankvalue|lcm|left|le?n|log|log10|lookupvalue|lower|max[ax]?|medianx?|mid|min[ax]?|minute|mod|month|m?round|naturalinnerjoin|naturalleftouterjoin|nextday|nonvisual|norm\.dist|norm\.inv|norm\.s\.dist|norm\.s\.inv|no[tw]|odd|or|parallelperiod|path|pathcontains|pathitem|pathitemreverse|pathlength|percentilex?\.exc|percentilex?\.inc|permut|pi|poisson\.dist|power|previousday|productx?|quarter|quotient|radians|rand|randbetween|rank\.eq|rankx|related|relatedtable|removefilters|replace|rept|right|rollup|rollupaddissubtotal|rollupgroup|rollupissubtotal|rounddown|roundup|row|sameperiodlastyear|sample|search|second|selectcolumns|selected(?:measure|measureformatstring|measurename|value)|sign|sqrt|sqrtpi|stdevx?\.[ps]|substitute|substitutewithindex|summarize|summarizecolumns|sumx?|switch|t\.dist|t\.dist\.[2r]t|t\.inv|t\.inv\.2t|time|timevalue|today|topn|topnperlevel|topnskip|total[mqy]td|treatas|trim|trunc|unichar|unicode|union|upper|userelationship|username|userobjectid|userprincipalname|utcnow|utctoday|values?|varx?\.[ps]|weekday|weeknum|xirr|xnpv|year|yearfrac)(?=\s*\()/i,
    "keyword": /\b(?:define|evaluate|measure|order\s+by|return|var|start\s+at|asc|desc)\b/i,
    "boolean": {
      pattern: /\b(?:false|true|null)\b/i,
      alias: "constant"
    },
    "number": /\b\d+(?:\.\d*)?|\B\.\d+\b/,
    "operator": /:=|[=^/*+-]|&&?|\|\||<=>?|<[<>]?|>[>=]?|\b(?:in|not)\b/i,
    "punctuation": /[()[\]{}.,;`]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/dhall.js
  var expression4 = {
    pattern: /(^..)[^]+(?=.)/,
    lookbehind: true,
    alias: "language-dhall"
  };
  expression4.inside = languages.dhall = {
    // Multi-line comments can be nested. E.g. {- foo {- bar -} -}
    // The multi-line pattern is essentially this:
    //   \{-(?:[^-{]|-(?!\})|\{(?!-)|<SELF>)*-\}
    "comment": /--.*|\{-(?:[^-{]|-(?!\})|\{(?!-)|\{-(?:[^-{]|-(?!\})|\{(?!-))*-\})*-\}/,
    "string": {
      pattern: /"(?:\\.|[^\\"])*"|''(?:[^']|'(?!')|'''|''\$\{)*''(?!'|\$)/g,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /\$\{[^{}]*\}/,
          inside: {
            "expression": expression4,
            "punctuation": /.+/
          }
        }
      }
    },
    "label": {
      pattern: /`[^`]*`/g,
      greedy: true
    },
    "url": {
      // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L596
      pattern: /\bhttps?:\/\/[\w.:%!$&'*+;=@~-]+(?:\/[\w.:%!$&'*+;=@~-]*)*(?:\?[/?\w.:%!$&'*+;=@~-]*)?/g,
      greedy: true
    },
    "env": {
      // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L661
      pattern: /\benv:(?:(?!\d)\w+|"(?:\\.|[^\\"=])*")/g,
      greedy: true,
      inside: {
        "function": /^env/,
        "operator": /^:/,
        "variable": /[^]+/
      }
    },
    "hash": {
      // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L725
      pattern: /\bsha256:[a-fA-F\d]{64}\b/,
      inside: {
        "function": /sha256/,
        "operator": /:/,
        "number": /[a-fA-F\d]{64}/
      }
    },
    // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L359
    "keyword": /\b(?:as|assert|else|forall|if|in|let|merge|missing|then|toMap|using|with)\b|∀/,
    "builtin": /\b(?:None|Some)\b/,
    "boolean": /\b(?:False|True)\b/,
    "number": /\bNaN\b|-?\bInfinity\b|[+-]?\b(?:0x[a-fA-F\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/,
    "operator": /\/\\|\/\/\\\\|===|[!=]=|\/\/|->|\+\+|&&|\|\||::|[+*#@:?=<>|\\∧⩓≡⫽λ→]/,
    "punctuation": /\.\.|[()[\]{}.,/]/,
    // we'll just assume that every capital word left is a type name
    "class-name": /\b[A-Z]\w*\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/diff.js
  var diff = languages.diff = {
    // Match all kinds of coord lines (prefixed by "+++", "---" or "***").
    // Match "@@ ... @@" coord lines in unified diff.
    // Match coord lines in normal diff (starts with a number).
    "coord": /^(?:\*{3}|-{3}|\+{3}|\d).*$|^@@.*@@$/m
    // deleted, inserted, unchanged, diff
  };
  var PREFIXES = {
    "deleted-sign": "-",
    "deleted-arrow": "<",
    "inserted-sign": "+",
    "inserted-arrow": ">",
    "unchanged": " ",
    "diff": "!"
  };
  for (name2 in PREFIXES) {
    prefix2 = name2.split("-")[0];
    diff[name2] = {
      pattern: RegExp("^(?:[" + PREFIXES[name2] + "].*$\n?)+", "m"),
      alias: prefix2 != name2 ? prefix2 : name2 == "diff" ? "bold" : void 0,
      inside: {
        "prefix": {
          pattern: RegExp("^[" + PREFIXES[name2] + "]", "mg"),
          greedy: true,
          alias: prefix2
        }
      }
    };
  }
  var prefix2;
  var name2;

  // node_modules/prism-code-editor/dist/prism/languages/django.js
  languages.jinja2 = languages.django = {
    "django": {
      pattern: /\{(?:\{[^]*?\}|%[^]*?%|#[^]*?#)\}/,
      alias: "language-django",
      inside: {
        "comment": /^\{#[^]+/,
        "tag": {
          pattern: /(^\{%[+-]?\s*)\w+/,
          lookbehind: true,
          alias: "keyword"
        },
        "delimiter": {
          pattern: /^\{[{%][+-]?|[+-]?[}%]\}$/,
          alias: "punctuation"
        },
        "string": {
          pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
          greedy: true
        },
        "filter": {
          pattern: /(\|)\w+/,
          lookbehind: true,
          alias: "function"
        },
        "test": {
          pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
          lookbehind: true,
          alias: "function"
        },
        "function": /\b(?!\d)\w+(?=\s*\()/,
        "keyword": /\b(?:and|as|by|else|f?or|i[fns]|import|loop|not|recursive|with|without)\b/,
        "operator": /!=|\*\*=?|\/\/=?|<>|>>|<<|[%=<>/*+-]=?|[&|^~]/,
        "number": /\b\d+(?:\.\d+)?\b/,
        "boolean": /[Ff]alse|[Nn]one|[Tt]rue/,
        "variable": /\w+/,
        "punctuation": clikePunctuation
      }
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/dns-zone-file.js
  languages["dns-zone"] = languages["dns-zone-file"] = {
    "comment": /;.*/,
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "variable": [
      {
        pattern: /(^\$ORIGIN[ 	]+)\S+/m,
        lookbehind: true
      },
      {
        pattern: /(^|\s)@(?!\S)/,
        lookbehind: true
      }
    ],
    "keyword": /^\$(?:INCLUDE|ORIGIN|TTL)(?!\S)/m,
    "class": {
      // https://tools.ietf.org/html/rfc1035#page-13
      pattern: /(^|\s)(?:CH|CS|HS|IN)(?!\S)/,
      lookbehind: true,
      alias: "keyword"
    },
    "type": {
      // https://en.wikipedia.org/wiki/List_of_DNS_record_types
      pattern: /(^|\s)(?:A6?|AAAA|AFSDB|APL|ATMA|CAA|C?DNSKEY|C?DS|CERT|[CD]NAME|DHCID|DLV|[EGU]ID|GPOS|[HMNU]INFO|HIP|IPSECKEY|ISDN|[RT]?KEY|KX|LOC|MAIL[AB]|M[BDFGRX]|NAPTR|NB|NBSTAT|NIMLOC|NS|NSAP|NSAP-PTR|NSEC3?|NSEC3PARAM|NULL|[NT]XT|OPENPGPKEY|PTR|PX|RP|RRSIG|RT|SINK|SMIMEA|SOA|SPF|SRV|SSHFP|TA|TLSA|T?SIG|UNSPEC|URI|WKS|X25)(?!\S)/,
      lookbehind: true,
      alias: "keyword"
    },
    "punctuation": /[()]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/docker.js
  var spaceAfterBackSlash = "\\\\\n(?:\\s|\\\\\n|#.*(?!.))*(?![\\s#]|\\\\\n)";
  var space2 = replace("(?:[ 	]+(?![ 	])<0>?|<0>)", [spaceAfterBackSlash]);
  var string5 = /"(?:\\[^]|[^\\\n"])*"|'(?:\\[^]|[^\\\n'])*'/g;
  var stringSrc2 = string5.source;
  var option = replace(`--[\\w-]+=(?:<0>|(?!["'])(?:\\\\.|[^\\\\\\s])+)`, [stringSrc2]);
  var stringRule = {
    pattern: string5,
    greedy: true
  };
  var commentRule = {
    pattern: /(^[ 	]*)#.*/mg,
    lookbehind: true,
    greedy: true
  };
  languages.dockerfile = languages.docker = {
    "instruction": {
      pattern: /(^[ 	]*)(?:add|arg|cmd|copy|entrypoint|env|expose|from|healthcheck|label|maintainer|onbuild|run|shell|stopsignal|user|volume|workdir)(?=\s)(?:\\.|[^\\\n])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\\\n])*)*/img,
      lookbehind: true,
      greedy: true,
      inside: {
        "options": {
          pattern: re("(^(?:onbuild<0>)?\\w+<0>)<1>(?:<0><1>)*", [space2, option], "gi"),
          lookbehind: true,
          greedy: true,
          inside: {
            "property": {
              pattern: /(^|\s)--[\w-]+/,
              lookbehind: true
            },
            "string": [
              stringRule,
              {
                pattern: /(=)(?!["'])(?:\\.|[^\\\s])+/,
                lookbehind: true
              }
            ],
            "operator": /\\$/m,
            "punctuation": /=/
          }
        },
        "keyword": [
          {
            // https://docs.docker.com/engine/reference/builder/#healthcheck
            pattern: re("(^(?:onbuild<0>)?healthcheck<0>(?:<1><0>)*)(?:cmd|none)\\b", [space2, option], "gi"),
            lookbehind: true,
            greedy: true
          },
          {
            // https://docs.docker.com/engine/reference/builder/#from
            pattern: re("(^(?:onbuild<0>)?from<0>(?:<1><0>)*(?!--)[^ 	\\\\]+<0>)as", [space2, option], "gi"),
            lookbehind: true,
            greedy: true
          },
          {
            // https://docs.docker.com/engine/reference/builder/#onbuild
            pattern: re("(^onbuild<0>)\\w+", [space2], "gi"),
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /^\w+/g,
            greedy: true
          }
        ],
        "comment": commentRule,
        "string": stringRule,
        "variable": /\$(?:\w+|\{[^{}"'\\]*\})/,
        "operator": /\\$/m
      }
    },
    "comment": commentRule
  };

  // node_modules/prism-code-editor/dist/prism/languages/dot.js
  var ID = `(?:(?!d)[\\w\\x80-\\uffff]+|-?(?:\\.\\d+|\\d+(?:\\.\\d*)?)|"[^\\\\"]*(?:\\\\[\\s\\S][^\\\\"]*)*"|<(?:[^<>]|(?!<!--)<(?:[^<>"']|"[^"]*"|'[^']*')+>|<!--(?:[^-]|-(?!->))*-->)*>)`;
  var IDInside = {
    "markup": {
      pattern: /(^<)[^]+(?=>)/,
      lookbehind: true,
      alias: "language-markup",
      inside: "markup"
    }
  };
  languages.gv = languages.dot = {
    "comment": {
      pattern: /\/\/.*|\/\*[^]*?\*\/|^#.*/mg,
      greedy: true
    },
    "graph-name": {
      pattern: re("(\\b(?:digraph|graph|subgraph)[ 	\n]+)<0>", [ID], "gi"),
      lookbehind: true,
      greedy: true,
      alias: "class-name",
      inside: IDInside
    },
    "attr-value": {
      pattern: re("(=[ 	\n]*)<0>", [ID], "g"),
      lookbehind: true,
      greedy: true,
      inside: IDInside
    },
    "attr-name": {
      pattern: re("([\\[;, 	\n])<0>(?=[ 	\n]*=)", [ID], "g"),
      lookbehind: true,
      greedy: true,
      inside: IDInside
    },
    "keyword": /\b(?:digraph|edge|graph|node|strict|subgraph)\b/i,
    "compass-point": {
      pattern: /(:[ 	\n]*)(?:[ewc_]|[ns][ew]?)(?![\w\x80-\uffff])/,
      lookbehind: true,
      alias: "builtin"
    },
    "node": {
      pattern: re("(^|[^-.\\w\\x80-\\uffff\\\\])<0>", [ID], "g"),
      lookbehind: true,
      greedy: true,
      inside: IDInside
    },
    "operator": /[=:]|-[->]/,
    "punctuation": /[[\]{},;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/ebnf.js
  languages.ebnf = {
    "comment": /\(\*[^]*?\*\)/,
    "string": {
      pattern: /"[^\n"]*"|'[^\n']*'/g,
      greedy: true
    },
    "special": {
      pattern: /\?[^\n?]*\?/g,
      greedy: true,
      alias: "class-name"
    },
    "definition": {
      pattern: /^([ 	]*)[a-z]\w*(?:[ 	]+[a-z]\w*)*(?=\s*=)/im,
      lookbehind: true,
      alias: "rule keyword"
    },
    "rule": /\b[a-z]\w*(?:[ 	]+[a-z]\w*)*\b/i,
    "punctuation": /\([:/]|[:/]\)|[()[\]{}.,;]/,
    "operator": /[|!=/*-]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/editorconfig.js
  languages.editorconfig = {
    // https://editorconfig-specification.readthedocs.io
    "comment": /[;#].*/,
    "section": {
      pattern: /(^[ 	]*)\[.+\]/m,
      lookbehind: true,
      alias: "selector",
      inside: {
        "regex": /\\\\[[\]{}.,?!*]/,
        // Escape special characters with '\\'
        "operator": /[!?]|\.\.|\*\*?/,
        "punctuation": /[[\]{},]/
      }
    },
    "key": {
      pattern: /(^[ 	]*)[^\s=]+(?=[ 	]*=)/m,
      lookbehind: true,
      alias: "attr-name"
    },
    "value": {
      pattern: /=.*/,
      alias: "attr-value",
      inside: {
        "punctuation": /^=/
      }
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/eiffel.js
  languages.eiffel = {
    "comment": /--.*/,
    "string": {
      pattern: /"([^[]*)\[[^]*?\]\1"|"([^{]*)\{[^]*?\}\2"|"(?:%(?:(?!\n)\s)*\n\s*%|%\S|[^%"\n])*"/g,
      greedy: true
    },
    // normal char | special char | char code
    "char": /'(?:%.|[^%'\n])+'/,
    "keyword": /\b(?:across|agent|alias|all|[ae]nd|as|assign|attached|attribute|check|class|convert|create|current|debug|deferred|detachable|do|else|elseif|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|note?|obsolete|old|once|precursor|redefine|rename|require|rescue|result|retry|select|separate|some|[tw]hen|undefine|until|variant|void|x?or)\b/i,
    "boolean": /\b(?:false|true)\b/i,
    // Convention: class-names are always all upper-case characters
    "class-name": /\b[A-Z][A-Z\d_]*\b/,
    // hexa | octal | bin | decimal
    "number": /\b0[xcb][a-f\d](?:_*[a-f\d])*\b|(?:\b\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?e[+-]?)?\d(?:_*\d)*\b|\b\d(?:_*\d)*\b\.?/i,
    "punctuation": /:=|<<|>>|\(\||\|\)|->|\.\b|[()[\]{},:;?]/,
    "operator": /\\\\|\|\.\.\||\.\.|\/[~/=]?|[<>]=?|[~^=*+-]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/ejs.js
  languages.eta = languages.ejs = {
    "ejs": {
      pattern: /<%[^%][^]*?%>/,
      inside: {
        "comment": /^<%#[^]+/,
        "delimiter": {
          pattern: /^<%[-_=]?|[-_]?%>$/,
          alias: "punctuation"
        },
        "language-javascript": {
          pattern: /[^]+/,
          inside: "js"
        }
      }
    },
    "escape": /<%%|%%>/,
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/elixir.js
  var interpolationInside = {
    "delimiter": {
      pattern: /^#\{|\}$/,
      alias: "punctuation"
    }
  };
  interpolationInside[rest] = languages.elixir = {
    "doc": {
      pattern: /@(?:doc|moduledoc)\s+(?:("""|''')[^]*?\1|(["'])(?:\\[^]|(?!\2)[^\\\n])*\2)/,
      inside: {
        "attribute": /^@\w+/,
        "string": /["'][^]+/
      }
    },
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    // ~r"""foo""" (multi-line), ~r'''foo''' (multi-line), ~r/foo/, ~r|foo|, ~r"foo", ~r'foo', ~r(foo), ~r[foo], ~r{foo}, ~r<foo>
    "regex": {
      pattern: /~[rR](?:("""|''')(?:\\[^]|(?!\1)[^\\])+\1|([/|"'])(?:\\.|(?!\2)[^\\\n])+\2|\((?:\\.|[^\\)\n])+\)|\[(?:\\.|[^\\\]\n])+\]|\{(?:\\.|[^\\}\n])+\}|<(?:\\.|[^\\>\n])+>)[uismxfr]*/g,
      greedy: true
    },
    "string": {
      // ~s"""foo""" (multi-line), ~s'''foo''' (multi-line), ~s/foo/, ~s|foo|, ~s"foo", ~s'foo', ~s(foo), ~s[foo], ~s{foo} (with interpolation care), ~s<foo>
      pattern: /~[cCsSwW](?:("""|''')(?:\\[^]|(?!\1)[^\\])+\1|([/|"'])(?:\\.|(?!\2)[^\\\n])+\2|\((?:\\.|[^\\)\n])+\)|\[(?:\\.|[^\\\]\n])+\]|\{(?:\\.|#\{[^}]+\}|#(?!\{)|[^#\\}\n])+\}|<(?:\\.|[^\\>\n])+>)[csa]?|("""|''')[^]*?\3|(["'])(?:\\[^]|(?!\4)[^\\\n])*\4/g,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /#\{[^}]+\}/,
          inside: interpolationInside
        }
      }
    },
    "atom": {
      // Look-behind prevents bad highlighting of the :: operator
      pattern: /(^|[^:]):\w+/,
      lookbehind: true,
      alias: "symbol"
    },
    "module": {
      pattern: /\b[A-Z]\w*\b/,
      alias: "class-name"
    },
    // Look-ahead prevents bad highlighting of the :: operator
    "attr-name": /\b\w+\??:(?!:)/,
    "argument": {
      // Look-behind prevents bad highlighting of the && operator
      pattern: /(^|[^&])&\d+/,
      lookbehind: true,
      alias: "variable"
    },
    "attribute": {
      pattern: /@\w+/,
      alias: "variable"
    },
    "function": /\b(?!\d)\w+[?!]?(?:(?=\s*(?:\.\s*)?\()|(?=\/\d))/,
    "number": /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
    "keyword": /\b(?:after|alias|[ae]nd|case|catch|cond|def(?:callback|delegate|exception|impl|macro|module|n?p?|protocol|struct)|do|else|fn|f?or|if|import|not|quote|raise|require|rescue|try|unless|unquote|use|when)\b/,
    "boolean": /\b(?:false|true|nil)\b/,
    "operator": [
      /\bin\b|&&?|\|[|>]?|\\\\|::|\.{2,3}|\+\+?|-[->]?|<[=>-]|>=|!==?|\B!|=(?:==?|[>~])?|[*/^]/,
      {
        // We don't want to match <<
        pattern: /([^<])<(?!<)/,
        lookbehind: true
      },
      {
        // We don't want to match >>
        pattern: /([^>])>(?!>)/,
        lookbehind: true
      }
    ],
    "punctuation": /<<|>>|[()[\]{}.,%]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/elm.js
  languages.elm = {
    "comment": /--.*|\{-[^]*?-\}/,
    "char": {
      pattern: /'(?:[^\\\n']|\\(?:[abfnrtv\\']|\d+|x[a-fA-F\d]+|u\{[a-fA-F\d]+\}))'/g,
      greedy: true
    },
    "string": {
      // Multiline strings are wrapped in triple ". Quotes may appear unescaped.
      pattern: /"""[^]*?"""|"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "import-statement": {
      // The imported or hidden names are not included in this import
      // statement. This is because we want to highlight those exactly like
      // we do for the names in the program.
      pattern: /(^[ 	]*)import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+(?:[A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
      lookbehind: true,
      inside: {
        "keyword": /\b(?:as|exposing|import)\b/
      }
    },
    "keyword": /\b(?:alias|as|case|else|exposing|if|in|infix[lr]|let|module|of|then|type)\b/,
    // These are builtin variables only. Constructors are highlighted later as a constant.
    "builtin": /\b(?:abs|a?cos|always|a?sin|atan2?|ceiling|clamp|compare|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
    // decimal integers and floating point numbers | hexadecimal integers
    "number": /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[a-f\d]+)\b/i,
    // Most of this is needed because of the meaning of a single '.'.
    // If it stands alone freely, it is the function composition.
    // It may also be a separator between a module name and an identifier => no
    // operator. If it comes together with other special characters it is an
    // operator too.
    // Valid operator characters in 0.18: +-/*=.$<>:&|^?%#@~!
    // Ref: https://groups.google.com/forum/#!msg/elm-dev/0AHSnDdkSkQ/E0SVU70JEQAJ
    "operator": /\s\.\s|\.\.+|[:?$#@~%&|^!=<>/*+-]+/,
    // In Elm, nearly everything is a variable, do not highlight these.
    "hvariable": /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
    "constant": /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
    "punctuation": /[()[\]{}.,]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/erb.js
  languages.erb = {
    "erb": {
      pattern: /<%=?(?:[^\n]|\n(?!=begin)|\n=begin\s(?:[^\n]|\n(?!=end))*\n=end)+?%>/,
      inside: {
        "delimiter": {
          pattern: /^<%=?|%>$/,
          alias: "punctuation"
        },
        "ruby": {
          pattern: /\s*\S[^]*/,
          alias: "language-ruby",
          inside: "ruby"
        }
      }
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/erlang.js
  languages.erlang = {
    "comment": /%.+/,
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "quoted-function": {
      pattern: /'(?:\\.|[^\\\n'])+'(?=\()/,
      alias: "function"
    },
    "quoted-atom": {
      pattern: /'(?:\\.|[^\\\n'])+'/,
      alias: "atom"
    },
    "boolean": boolean,
    "keyword": /\b(?:after|begin|case|catch|end|fun|if|of|receive|try|when)\b/,
    "number": [
      /\$\\?./,
      /\b\d+#[a-z\d]+/i,
      /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i
    ],
    "function": /\b[a-z][\w@]*(?=\()/,
    "variable": {
      // Look-behind is used to prevent wrong highlighting of atoms containing "@"
      pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
      lookbehind: true
    },
    "operator": [
      /[:=<>/]=|=[:/]=|\+\+?|--?|[!=/*]|\b(?:andalso|b?and|b?not|b?x?or|bs[lr]|div|orelse|rem)\b/,
      {
        // We don't want to match <<
        pattern: /(^|[^<])<(?!<)/,
        lookbehind: true
      },
      {
        // We don't want to match >>
        pattern: /(^|[^>])>(?!>)/,
        lookbehind: true
      }
    ],
    "atom": /\b[a-z][\w@]*/,
    "punctuation": /[()[\]{}.,:;#|]|<<|>>/
  };

  // node_modules/prism-code-editor/dist/prism/languages/lua.js
  languages.lua = {
    "comment": /^#!.+|--(?:\[(=*)\[[^]*?\]\1\]|.*)/m,
    // \z may be used to skip the following space
    "string": {
      pattern: /(["'])(?:(?!\1)[^\\\n]|\\z\s|\\[^z])*\1|\[(=*)\[[^]*?\]\2\]/g,
      greedy: true
    },
    "number": /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
    "keyword": /\b(?:and|break|do|else|elseif|end|false|true|f?or|function|goto|if|in|local|nil|not|repeat|return|then|until|while)\b/,
    "function": /(?!\d)\w+(?=\s*(?:[({]))/,
    // Match ".." but don't break "..."
    "operator": {
      pattern: /[%&|^#*+-]|\/\/?|<[<=]?|>[>=]?|[=~]=?|(^|[^.])\.\.(?!\.)/,
      lookbehind: true
    },
    "punctuation": /[()[\]{},;]|\.+|:+/
  };

  // node_modules/prism-code-editor/dist/prism/languages/etlua.js
  languages.etlua = {
    "etlua": {
      pattern: /<%[^]+?%>/,
      inside: {
        "delimiter": {
          pattern: /^<%[=-]?|-?%>$/,
          alias: "punctuation"
        },
        "language-lua": {
          pattern: /[^]+/,
          inside: "lua"
        }
      }
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/excel-formula.js
  languages["xlsx"] = languages["xls"] = languages["excel-formula"] = {
    "comment": {
      pattern: /(\bn\(\s*)"(?:[^"]|"")*"(?=\s*\))/gi,
      lookbehind: true,
      greedy: true
    },
    "string": {
      pattern: /"(?:[^"]|"")*"(?!")/g,
      greedy: true
    },
    "reference": {
      // https://www.ablebits.com/office-addins-blog/2015/12/08/excel-reference-another-sheet-workbook/
      // Sales!B2
      // 'Winter sales'!B2
      // [Sales.xlsx]Jan!B2:B5
      // D:\Reports\[Sales.xlsx]Jan!B2:B5
      // '[Sales.xlsx]Jan sales'!B2:B5
      // 'D:\Reports\[Sales.xlsx]Jan sales'!B2:B5
      pattern: /(?:'[^']*'|(?:[^\s()[\]{}<>*?"';,$&]*\[[^^\s()[\]{}<>*?"']+\])?\w+)!/g,
      greedy: true,
      alias: "string",
      inside: {
        "operator": /!$/,
        "punctuation": /'/,
        "sheet": {
          pattern: /[^[\]]+$/,
          alias: "function"
        },
        "file": {
          pattern: /\[[^[\]]+\]$/,
          inside: {
            "punctuation": /[[\]]/
          }
        },
        "path": /[^]+/
      }
    },
    "function-name": {
      pattern: /\b[a-z]\w*(?=\()/i,
      alias: "builtin"
    },
    "range": {
      pattern: /\$?\b(?:[a-z]+\$?\d+:\$?[a-z]+\$?\d+|[a-z]+:\$?[a-z]+|\d+:\$?\d+)\b/i,
      alias: "selector",
      inside: {
        "operator": /:/,
        "cell": /\$?[a-z]+\$?\d+/i,
        "column": /\$?[a-z]+/i,
        "row": /\$?\d+/
      }
    },
    "cell": {
      // Excel is case insensitive, so the string "foo1" could be either a variable or a cell.
      // To combat this, we match cells case insensitive, if the contain at least one "$", and case sensitive otherwise.
      pattern: /\b[A-Z]+\d+\b|\$[a-zA-Z]+\$?\d+\b|\b[a-zA-Z]+\$\d+\b/,
      alias: "selector"
    },
    "number": /(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?\b/i,
    "boolean": /\b(?:false|true)\b/i,
    "operator": /[%&^,=/*+-]|<[=>]?|>=?/,
    "punctuation": /[()[\]{};|]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/factor.js
  var comment_inside = {
    "function": /\b(?:BUGS?|FIX(?:MES?)?|NOTES?|TODOS?|XX+|HACKS?|WARN(?:ING)?|\?{2,}|!{2,})\b/
  };
  var string_inside = {
    "number": /\\[^\s']|%\w/
  };
  var combinatorsToken = {
    lookbehind: true,
    alias: "keyword"
  };
  var factor = languages.factor = {
    "comment": {
      // ! single-line exclamation point comments with whitespace after/around the !
      // /* comment */, /* comment*/
      // ![[ comment ]] , ![===[ comment]===]
      pattern: /(^|\s)(?:! .*|!$|\/\*\s[^]*?\*\/(?!\S)|!\[(={0,6})\[\s[^]*?\]\2\](?!\S))/g,
      lookbehind: true,
      greedy: true,
      inside: comment_inside
    },
    "number": {
      // basic base 10 integers 9, -9
      // base prefix integers 0b010 0o70 0xad 0d10 0XAD -0xa9
      // fractional ratios 1/5 -1/5 and the literal float approximations 1/5. -1/5.
      // positive mixed numbers 23+1/5 +23+1/5
      // negative mixed numbers -23-1/5
      // basic decimal floats -0.01 0. .0 .1 -.1 -1. -12.13 +12.13
      // and scientific notation with base 10 exponents 3e4 3e-4 .3e-4
      // NAN literal syntax NAN: 80000deadbeef, NAN: a
      /*
      	base prefix floats 0x1.0p3 (8.0) 0b1.010p2 (5.0) 0x1.p1 0b1.11111111p11111...
      	"The normalized hex form ±0x1.MMMMMMMMMMMMM[pP]±EEEE allows any floating-point number to be specified precisely.
      	The values of MMMMMMMMMMMMM and EEEE map directly to the mantissa and exponent fields of the binary IEEE 754 representation."
      	<https://docs.factorcode.org/content/article-syntax-floats.html>
      */
      pattern: /(^|\s)(?:[+-]?\d+|[+-]?0(?:[bB][01]+|[oO][0-7]+|d\d+|x[a-fA-F\d]+)|[+-]?\d+\/\d+\.?|\+?\d+\+\d+\/\d+|-\d+-\d+\/\d+|[+-]?(?:\d*\.\d+|\d+\.\d*|\d+)(?:[eE][+-]?\d+)?|NAN:\s+[a-fA-F\d]+|[+-]?0(?:[bB]1\.[01]*|[oO]1\.[0-7]*|[dD]1\.\d*|[xX]1\.[a-fA-F\d]*)[pP]\d+)(?!\S)/,
      lookbehind: true
    },
    // R/ regexp?\/\\/
    "regexp": {
      pattern: /(^|\s)R\/\s(?:\\\S|[^\\/])*\/(?:[idmsr]*|[idmsr]+-[idmsr]+)(?!\S)/,
      lookbehind: true,
      alias: "number",
      inside: {
        "variable": /\\\S/,
        "keyword": /[+?*^$()[\]{}.|]/,
        "operator": {
          pattern: /(\/)[idmsr]+(?:-[idmsr]+)?/,
          lookbehind: true
        }
      }
    },
    "boolean": {
      pattern: /(^|\s)[tf](?!\S)/,
      lookbehind: true
    },
    // SBUF" asd", URL" ://...", P" /etc/"
    "custom-string": {
      pattern: /(^|\s)[A-Z\d-]+"\s(?:\\\S|[^\\"])*"/g,
      lookbehind: true,
      greedy: true,
      alias: "string",
      inside: {
        "number": /\\\S|%\w|\//
      }
    },
    "multiline-string": [
      {
        // STRING: name \n content \n ; -> CONSTANT: name "content" (symbol)
        pattern: /(^|\s)STRING:\s+\S+\n.*\n\s*;(?!\S)/g,
        lookbehind: true,
        greedy: true,
        alias: "string",
        inside: {
          "number": string_inside.number,
          // trailing semicolon on its own line
          "semicolon-or-setlocal": {
            pattern: /(\n[ 	]*);(?!\S)/,
            lookbehind: true,
            alias: "function"
          }
        }
      },
      {
        // HEREDOC: marker \n content \n marker ; -> "content" (immediate)
        pattern: /(^|\s)HEREDOC:\s+\S+\n.*\n\s*\S+(?!\S)/g,
        lookbehind: true,
        greedy: true,
        alias: "string",
        inside: string_inside
      },
      {
        // [[ string ]], [==[ string]==]
        pattern: /(^|\s)\[(={0,6})\[\s[^]*?\]\2\](?!\S)/g,
        lookbehind: true,
        greedy: true,
        alias: "string",
        inside: string_inside
      }
    ],
    "special-using": {
      pattern: /(^|\s)USING:(?:\s\S+)*(?=\s+;(?!\S))/,
      lookbehind: true,
      alias: "function",
      inside: {
        // this is essentially a regex for vocab names, which i don't want to specify
        // but the USING: gets picked up as a vocab name
        "string": {
          pattern: /(\s)[^:\s]+/,
          lookbehind: true
        }
      }
    },
    /* this description of stack effect literal syntax is not complete and not as specific as theoretically possible
    		trying to do better is more work and regex-computation-time than it's worth though.
    		- we'd like to have the "delimiter" parts of the stack effect [ (, --, and ) ] be a different (less-important or comment-like) colour to the stack effect contents
    		- we'd like if nested stack effects were treated as such rather than just appearing flat (with `inside`)
    		- we'd like if the following variable name conventions were recognised specifically:
    			special row variables = ..a b..
    			type and stack effect annotations end with a colon = ( quot: ( a: ( -- ) -- b ) -- x ), ( x: number -- )
    			word throws unconditional error = *
    			any other word-like variable name = a ? q' etc
    
    		https://docs.factorcode.org/content/article-effects.html
    
    		these are pretty complicated to highlight properly without a real parser, and therefore out of scope
    		the old pattern, which may be later useful, was: (^|\s)(?:call|execute|eval)?\((?:\s+[^"\r\n	 ]\S*)*?\s+--(?:\s+[^"\n	 ]\S*)*?\s+\)(?=\s|$)
    	*/
    // current solution is not great
    "stack-effect-delimiter": [
      {
        // opening parenthesis
        pattern: /(^|\s)(?:call|eval|execute)?\((?=\s)/,
        lookbehind: true,
        alias: "operator"
      },
      {
        // middle --
        pattern: /(\s)--(?=\s)/,
        lookbehind: true,
        alias: "operator"
      },
      {
        // closing parenthesis
        pattern: /(\s)\)(?!\S)/,
        lookbehind: true,
        alias: "operator"
      }
    ],
    "combinators": combinatorsToken,
    "kernel-builtin": {
      pattern: null,
      lookbehind: true,
      alias: "variable"
    },
    "sequences-builtin": {
      pattern: null,
      lookbehind: true,
      alias: "variable"
    },
    "math-builtin": {
      pattern: null,
      lookbehind: true,
      alias: "variable"
    },
    "constructor-word": {
      // <array> but not <=>
      pattern: /(^|\s)<(?!=+>|-+>)\S+>(?!\S)/,
      lookbehind: true,
      alias: "keyword"
    },
    "other-builtin-syntax": {
      pattern: null,
      lookbehind: true,
      alias: "operator"
    },
    /*
    		full list of supported word naming conventions: (the convention appears outside of the [brackets])
    			set-[x]
    			change-[x]
    			with-[x]
    			new-[x]
    			>[string]
    			[base]>
    			[string]>[number]
    			+[symbol]+
    			[boolean-word]?
    			?[of]
    			[slot-reader]>>
    			>>[slot-setter]
    			[slot-writer]<<
    			([implementation-detail])
    			[mutater]!
    			[variant]*
    			[prettyprint].
    			$[help-markup]
    
    		<constructors>, SYNTAX:, etc are supported by their own patterns.
    
    		`with` and `new` from `kernel` are their own builtins.
    
    		see <https://docs.factorcode.org/content/article-conventions.html>
    	*/
    "conventionally-named-word": {
      pattern: /(^|\s)(?!")(?:(?:change|new|set|with)-\S+|\$\S+|>[^>\s]+|[^:>\s]+>|[^>\s]+>[^>\s]+|\+[^+\s]+\+|[^?\s]+\?|\?[^?\s]+|[^>\s]+>>|>>[^>\s]+|[^<\s]+<<|\([^()\s]+\)|[^!\s]+!|[^*\s]\S*\*|[^.\s]\S*\.)(?!\S)/,
      lookbehind: true,
      alias: "keyword"
    },
    "colon-syntax": {
      pattern: /(^|\s)(?:[A-Z\d-]+#?)?::?\s+(?:;\S+|(?!;)\S+)(?!\S)/g,
      lookbehind: true,
      greedy: true,
      alias: "function"
    },
    "semicolon-or-setlocal": {
      pattern: /(\s)(?:;|:>)(?!\S)/,
      lookbehind: true,
      alias: "function"
    },
    // do not highlight leading } or trailing X{ at the begin/end of the file as it's invalid syntax
    "curly-brace-literal-delimiter": [
      {
        // opening
        pattern: /(^|\s)[a-z]*\{(?=\s)/i,
        lookbehind: true,
        alias: "operator"
      },
      {
        // closing
        pattern: /(\s)\}(?!\S)/,
        lookbehind: true,
        alias: "operator"
      }
    ],
    // do not highlight leading ] or trailing [ at the begin/end of the file as it's invalid syntax
    "quotation-delimiter": [
      {
        // opening
        pattern: /(^|\s)\[(?=\s)/,
        lookbehind: true,
        alias: "operator"
      },
      {
        // closing
        pattern: /(\s)\](?!\S)/,
        lookbehind: true,
        alias: "operator"
      }
    ],
    "normal-word": {
      pattern: /(^|\s)[^"\s]\S*(?!\S)/,
      lookbehind: true
    },
    /*
    		basic first-class string "a"
    			with escaped double-quote "a\""
    			escaped backslash "\\"
    			and general escapes since Factor has so many "\N"
    
    		syntax that works in the reference implementation that isn't fully
    		supported because it's an implementation detail:
    			"string 1""string 2" -> 2 strings (works anyway)
    			"string"5 -> string, 5
    			"string"[ ] -> string, quotation
    			{ "a"} -> array<string>
    
    		the rest of those examples all properly recognise the string, but not
    			the other object (number, quotation, etc)
    		this is fine for a regex-only implementation.
    	*/
    "string": {
      pattern: /"(?:\\\S|[^\\"])*"/g,
      greedy: true,
      inside: string_inside
    }
  };
  var escape = (str) => str.replace(/[$+?|.^*()[\]{}\\]/g, "\\$&");
  var arrToWordsRegExp = (arr) => RegExp("(^|\\s)(?:" + arr.map(escape).join("|") + ")(?!\\S)");
  var builtins = {
    "kernel-builtin": [
      "or",
      "2nipd",
      "4drop",
      "tuck",
      "wrapper",
      "nip",
      "wrapper?",
      "callstack>array",
      "die",
      "dupd",
      "callstack",
      "callstack?",
      "3dup",
      "hashcode",
      "pick",
      "4nip",
      "build",
      ">boolean",
      "nipd",
      "clone",
      "5nip",
      "eq?",
      "?",
      "=",
      "swapd",
      "2over",
      "clear",
      "2dup",
      "get-retainstack",
      "not",
      "tuple?",
      "dup",
      "3nipd",
      "call",
      "-rotd",
      "object",
      "drop",
      "assert=",
      "assert?",
      "-rot",
      "execute",
      "boa",
      "get-callstack",
      "curried?",
      "3drop",
      "pickd",
      "overd",
      "over",
      "roll",
      "3nip",
      "swap",
      "and",
      "2nip",
      "rotd",
      "throw",
      "(clone)",
      "hashcode*",
      "spin",
      "reach",
      "4dup",
      "equal?",
      "get-datastack",
      "assert",
      "2drop",
      "<wrapper>",
      "boolean?",
      "identity-hashcode",
      "identity-tuple?",
      "null",
      "composed?",
      "new",
      "5drop",
      "rot",
      "-roll",
      "xor",
      "identity-tuple",
      "boolean"
    ],
    "other-builtin-syntax": [
      // syntax
      "=======",
      "recursive",
      "flushable",
      ">>",
      "<<<<<<",
      "M\\",
      "B",
      "PRIVATE>",
      "\\",
      "======",
      "final",
      "inline",
      "delimiter",
      "deprecated",
      "<PRIVATE",
      ">>>>>>",
      "<<<<<<<",
      "parse-complex",
      "malformed-complex",
      "read-only",
      ">>>>>>>",
      "call-next-method",
      "<<",
      "foldable",
      // literals
      "$",
      "$[",
      "${"
    ],
    "sequences-builtin": [
      "member-eq?",
      "mismatch",
      "append",
      "assert-sequence=",
      "longer",
      "repetition",
      "clone-like",
      "3sequence",
      "assert-sequence?",
      "last-index-from",
      "reversed",
      "index-from",
      "cut*",
      "pad-tail",
      "join-as",
      "remove-eq!",
      "concat-as",
      "but-last",
      "snip",
      "nths",
      "nth",
      "sequence",
      "longest",
      "slice?",
      "<slice>",
      "remove-nth",
      "tail-slice",
      "empty?",
      "tail*",
      "member?",
      "virtual-sequence?",
      "set-length",
      "drop-prefix",
      "iota",
      "unclip",
      "bounds-error?",
      "unclip-last-slice",
      "non-negative-integer-expected",
      "non-negative-integer-expected?",
      "midpoint@",
      "longer?",
      "?set-nth",
      "?first",
      "rest-slice",
      "prepend-as",
      "prepend",
      "fourth",
      "sift",
      "subseq-start",
      "new-sequence",
      "?last",
      "like",
      "first4",
      "1sequence",
      "reverse",
      "slice",
      "virtual@",
      "repetition?",
      "set-last",
      "index",
      "4sequence",
      "max-length",
      "set-second",
      "immutable-sequence",
      "first2",
      "first3",
      "supremum",
      "unclip-slice",
      "suffix!",
      "insert-nth",
      "tail",
      "3append",
      "short",
      "suffix",
      "concat",
      "flip",
      "immutable?",
      "reverse!",
      "2sequence",
      "sum",
      "delete-all",
      "indices",
      "snip-slice",
      "<iota>",
      "check-slice",
      "sequence?",
      "head",
      "append-as",
      "halves",
      "sequence=",
      "collapse-slice",
      "?second",
      "slice-error?",
      "product",
      "bounds-check?",
      "bounds-check",
      "immutable",
      "virtual-exemplar",
      "harvest",
      "remove",
      "pad-head",
      "last",
      "set-fourth",
      "cartesian-product",
      "remove-eq",
      "shorten",
      "shorter",
      "reversed?",
      "shorter?",
      "shortest",
      "head-slice",
      "pop*",
      "tail-slice*",
      "but-last-slice",
      "iota?",
      "append!",
      "cut-slice",
      "new-resizable",
      "head-slice*",
      "sequence-hashcode",
      "pop",
      "set-nth",
      "?nth",
      "second",
      "join",
      "immutable-sequence?",
      "<reversed>",
      "3append-as",
      "virtual-sequence",
      "subseq?",
      "remove-nth!",
      "length",
      "last-index",
      "lengthen",
      "assert-sequence",
      "copy",
      "move",
      "third",
      "first",
      "tail?",
      "set-first",
      "prefix",
      "bounds-error",
      "<repetition>",
      "exchange",
      "surround",
      "cut",
      "min-length",
      "set-third",
      "push-all",
      "head?",
      "subseq-start-from",
      "delete-slice",
      "rest",
      "sum-lengths",
      "head*",
      "infimum",
      "remove!",
      "glue",
      "slice-error",
      "subseq",
      "push",
      "replace-slice",
      "subseq-as",
      "unclip-last"
    ],
    "math-builtin": [
      "number=",
      "next-power-of-2",
      "?1+",
      "fp-special?",
      "imaginary-part",
      "float>bits",
      "number?",
      "fp-infinity?",
      "bignum?",
      "fp-snan?",
      "denominator",
      "gcd",
      "*",
      "+",
      "fp-bitwise=",
      "-",
      "u>=",
      "/",
      ">=",
      "bitand",
      "power-of-2?",
      "log2-expects-positive",
      "neg?",
      "<",
      "log2",
      ">",
      "integer?",
      "number",
      "bits>double",
      "2/",
      "zero?",
      "bits>float",
      "float?",
      "shift",
      "ratio?",
      "rect>",
      "even?",
      "ratio",
      "fp-sign",
      "bitnot",
      ">fixnum",
      "complex?",
      "/i",
      "integer>fixnum",
      "/f",
      "sgn",
      ">bignum",
      "next-float",
      "u<",
      "u>",
      "mod",
      "recip",
      "rational",
      ">float",
      "2^",
      "integer",
      "fixnum?",
      "neg",
      "fixnum",
      "sq",
      "bignum",
      ">rect",
      "bit?",
      "fp-qnan?",
      "simple-gcd",
      "complex",
      "<fp-nan>",
      "real",
      ">fraction",
      "double>bits",
      "bitor",
      "rem",
      "fp-nan-payload",
      "real-part",
      "log2-expects-positive?",
      "prev-float",
      "align",
      "unordered?",
      "float",
      "fp-nan?",
      "abs",
      "bitxor",
      "integer>fixnum-strict",
      "u<=",
      "odd?",
      "<=",
      "/mod",
      ">integer",
      "real?",
      "rational?",
      "numerator"
    ]
    // that's all for now
  };
  var combinators = [
    // kernel
    "2bi",
    "while",
    "2tri",
    "bi*",
    "4dip",
    "both?",
    "same?",
    "tri@",
    "curry",
    "prepose",
    "3bi",
    "?if",
    "tri*",
    "2keep",
    "3keep",
    "curried",
    "2keepd",
    "when",
    "2bi*",
    "2tri*",
    "4keep",
    "bi@",
    "keepdd",
    "do",
    "unless*",
    "tri-curry",
    "if*",
    "loop",
    "bi-curry*",
    "when*",
    "2bi@",
    "2tri@",
    "with",
    "2with",
    "either?",
    "bi",
    "until",
    "3dip",
    "3curry",
    "tri-curry*",
    "tri-curry@",
    "bi-curry",
    "keepd",
    "compose",
    "2dip",
    "if",
    "3tri",
    "unless",
    "tuple",
    "keep",
    "2curry",
    "tri",
    "most",
    "while*",
    "dip",
    "composed",
    "bi-curry@",
    // sequences
    "find-last-from",
    "trim-head-slice",
    "map-as",
    "each-from",
    "none?",
    "trim-tail",
    "partition",
    "if-empty",
    "accumulate*",
    "reject!",
    "find-from",
    "accumulate-as",
    "collector-for-as",
    "reject",
    "map",
    "map-sum",
    "accumulate!",
    "2each-from",
    "follow",
    "supremum-by",
    "map!",
    "unless-empty",
    "collector",
    "padding",
    "reduce-index",
    "replicate-as",
    "infimum-by",
    "trim-tail-slice",
    "count",
    "find-index",
    "filter",
    "accumulate*!",
    "reject-as",
    "map-integers",
    "map-find",
    "reduce",
    "selector",
    "interleave",
    "2map",
    "filter-as",
    "binary-reduce",
    "map-index-as",
    "find",
    "produce",
    "filter!",
    "replicate",
    "cartesian-map",
    "cartesian-each",
    "find-index-from",
    "map-find-last",
    "3map-as",
    "3map",
    "find-last",
    "selector-as",
    "2map-as",
    "2map-reduce",
    "accumulate",
    "each",
    "each-index",
    "accumulate*-as",
    "when-empty",
    "all?",
    "collector-as",
    "push-either",
    "new-like",
    "collector-for",
    "2selector",
    "push-if",
    "2all?",
    "map-reduce",
    "3each",
    "any?",
    "trim-slice",
    "2reduce",
    "change-nth",
    "produce-as",
    "2each",
    "trim",
    "trim-head",
    "cartesian-find",
    "map-index",
    // math
    "if-zero",
    "each-integer",
    "unless-zero",
    "(find-integer)",
    "when-zero",
    "find-last-integer",
    "(all-integers?)",
    "times",
    "(each-integer)",
    "find-integer",
    "all-integers?",
    // math.combinators
    "unless-negative",
    "if-positive",
    "when-positive",
    "when-negative",
    "unless-positive",
    "if-negative",
    // combinators
    "case",
    "2cleave",
    "cond>quot",
    "case>quot",
    "3cleave",
    "wrong-values",
    "to-fixed-point",
    "alist>quot",
    "cond",
    "cleave",
    "call-effect",
    "recursive-hashcode",
    "spread",
    "deep-spread>quot",
    // combinators.short-circuit
    "2||",
    "0||",
    "n||",
    "0&&",
    "2&&",
    "3||",
    "1||",
    "1&&",
    "n&&",
    "3&&",
    // combinators.smart
    "smart-unless*",
    "keep-inputs",
    "reduce-outputs",
    "smart-when*",
    "cleave>array",
    "smart-with",
    "smart-apply",
    "smart-if",
    "inputs/outputs",
    "output>sequence-n",
    "map-outputs",
    "map-reduce-outputs",
    "dropping",
    "output>array",
    "smart-map-reduce",
    "smart-2map-reduce",
    "output>array-n",
    "nullary",
    "input<sequence",
    "append-outputs",
    "drop-inputs",
    "inputs",
    "smart-2reduce",
    "drop-outputs",
    "smart-reduce",
    "preserving",
    "smart-when",
    "outputs",
    "append-outputs-as",
    "smart-unless",
    "smart-if*",
    "sum-outputs",
    "input<sequence-unsafe",
    "output>sequence"
    // tafn
  ];
  for (k in builtins) {
    factor[k].pattern = arrToWordsRegExp(builtins[k]);
  }
  var k;
  combinatorsToken.pattern = arrToWordsRegExp(combinators);

  // node_modules/prism-code-editor/dist/prism/languages/false.js
  languages["false"] = {
    "comment": /\{[^}]*\}/,
    "string": {
      pattern: /"[^"]*"/g,
      greedy: true
    },
    "character-code": {
      pattern: /'[^]/,
      alias: "number"
    },
    "assembler-code": {
      pattern: /\d+`/,
      alias: "important"
    },
    "number": /\d+/,
    "operator": /[#$?'.,:;@\\_`~ßø%&|^!=>/*+-]/,
    "punctuation": /[[\]]/,
    "variable": /[a-z]/,
    "non-standard": {
      pattern: /[()<BDO®]/,
      alias: "bold"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/firestore-security-rules.js
  languages["firestore-security-rules"] = {
    "comment": /\/\/.*/,
    "string": clikeString(),
    "path": {
      pattern: /(^|[\s(),])(?:\/(?:[\w\xa0-\uffff]+|\{[\w\xa0-\uffff]+(?:=\*\*)?\}|\$\([\w\xa0-\uffff.]+\)))+/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "variable": {
          pattern: /\{[\w\xa0-\uffff]+(?:=\*\*)?\}|\$\([\w\xa0-\uffff.]+\)/,
          inside: {
            "operator": /=/,
            "keyword": /\*\*/,
            "punctuation": /[(){}.$]/
          }
        },
        "punctuation": /\//
      }
    },
    "method": {
      // to make the pattern shorter, the actual method names are omitted
      pattern: /(\ballow\s+)[a-z]+(?:\s*,\s*[a-z]+)*(?=\s*[:;])/,
      lookbehind: true,
      alias: "builtin",
      inside: {
        "punctuation": /,/
      }
    },
    "keyword": /\b(?:allow|function|if|match|null|return|rules_version|service)\b/,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "number": clikeNumber,
    "operator": /&&|\|\||[!=<>]=?|[%/*+-]|\bi[ns]\b/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/flow.js
  var flow = languages.flow = clone2(languages.js);
  insertBefore(flow, "keyword", {
    "type": [
      {
        pattern: /\b(?:[Bb]oolean|Function|[Nn]umber|[Ss]tring|[Ss]ymbol|any|mixed|null|void)\b/,
        alias: "class-name"
      }
    ]
  });
  flow["function-variable"].pattern = /(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)\s*=>))/i;
  delete flow["parameter"];
  insertBefore(flow, "operator", {
    "flow-punctuation": {
      pattern: /\{\||\|\}/,
      alias: "punctuation"
    }
  });
  flow.keyword.unshift(
    {
      pattern: /(^|[^$]\b)(?:Class|declare|opaque|type)\b(?!\$)/,
      lookbehind: true
    },
    {
      pattern: /(^|[^$]\B)\$(?:Diff|Enum|Exact|Keys|ObjMap|PropertyType|Record|Shape|Subtype|Supertype|await)\b(?!\$)/,
      lookbehind: true
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/fortran.js
  languages.fortran = {
    "quoted-number": {
      pattern: /[boz](["'])[a-f\d]+\1/i,
      alias: "number"
    },
    "string": {
      pattern: /(?:\b\w+_)?(["'])(?:\1\1|&\n(?:[ 	]*!.*\n|(?![ 	]*!))|(?!\1).)*(?:\1|&)/,
      inside: {
        "comment": {
          pattern: /(&\n\s*)!.*/,
          lookbehind: true
        }
      }
    },
    "comment": {
      pattern: /!.*/g,
      greedy: true
    },
    "boolean": /\.(?:false|true)\.(?:_\w+)?/i,
    "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[ed][+-]?\d+)?(?:_\w+)?/i,
    "keyword": /\b(?:allocatable|allocate|assignment|backspace|call|case|character|close|common|complex|contains|continue|cycle|data|deallocate|default|dimension|do|double ?precision|elemental|else|elseif|elsewhere|(?:end ?)?(?:block ?data|do|file|forall|function|if|interface|program|select|subroutine|type|where)|end module|end|entry|equivalence|exit|external|format|go ?to|implicit(?: none)?|in|include|inout|inquire|integer|intent|intrinsic|kind|logical|module procedure|module|namelist|null|nullify|only|open|operator|optional|out|parameter|pointer|print|private|public|pure|rea[dl]|recursive|result|return|rewind|save|select|sequence|stat|stop|target|then|use|while|write)\b/i,
    "operator": [
      /\*\*|\/\/|=>|[=/]=|[<>]=?|::|[%=*+-]|\.[a-z]+\./i,
      {
        // Use lookbehind to prevent confusion with (/ /)
        pattern: /(^|[^(])\/(?!\))/,
        lookbehind: true
      }
    ],
    "punctuation": /\(\/|\/\)|[(),:;&]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/fsharp.js
  languages.fsharp = {
    "comment": {
      pattern: /\/\/.*|\(\*(?!\))[^]*?\*\)/g,
      greedy: true
    },
    "annotation": {
      pattern: /\[<.+?>\]/g,
      greedy: true,
      inside: {
        "punctuation": /^\[<|>\]$/,
        "class-name": {
          pattern: /^\w+$|(^|;\s*)[A-Z]\w*(?=\()/,
          lookbehind: true
        },
        "annotation-content": {
          pattern: /[^]+/,
          inside: "fsharp"
        }
      }
    },
    "char": {
      pattern: /'(?:[^\\']|\\(?:.|\d{3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|U[a-fA-F\d]{8}))'B?/g,
      greedy: true
    },
    "string": {
      pattern: /(?:"""[^]*?"""|@"(?:""|[^"])*"|"(?:\\[^]|[^\\"])*")B?/g,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:exception|inherit|interface|new|of|type)\s+|\w\s*:\s*|\s:\??>\s*)[.\w]+\b(?:\s*(?:->|\*)\s*[.\w]+\b)*(?!\s*[:.])/,
      lookbehind: true,
      inside: {
        "operator": /->|\*/,
        "punctuation": /\./
      }
    },
    "preprocessor": {
      pattern: /(^[ 	]*)#.*/m,
      lookbehind: true,
      alias: "property",
      inside: {
        "directive": {
          pattern: /(^#)\b(?:else|endif|if|light|line|nowarn)\b/,
          lookbehind: true,
          alias: "keyword"
        }
      }
    },
    "keyword": /\b(?:let|return|use|yield)(?:!\B|\b)|\b(?:abstract|and|asr?|assert|atomic|base|begin|break|checked|class|component|const|constraint|constructor|continue|default|delegate|do|done|downcast|downto|eager|elif|else|end|event|exception|extern|external|false|true|finally|fixed|f?or|fun|function|functor|global|if|in|include|inherit|inline|interface|internal|land|lazy|ls[lr]|lx?or|match|member|method|mixin|mod|module|mutable|namespace|new|not|null|object|of|open|override|parallel|private|process|protected|public|pure|rec|sealed|select|sig|static|struct|tailcall|[tw]hen|to|trait|try|type|upcast|val|virtual|void|volatile|while|with)\b/,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "number": [
      /\b0x[a-fA-F\d]+(?:LF|lf|un)?\b/,
      /\b0b[01]+(?:uy|y)?\b/,
      /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[fm]|e[+-]?\d+)?\b/i,
      /\b\d+(?:[IlLsy]|UL|u[lsy]?)?\b/
    ],
    "operator": /([<>~&^])\1\1|([*.:<>&])\2|<-|->|[!=:]=|<?\|{1,3}>?|\??(?:<=|>=|<>|[%=<>/*+-])\??|[?!^&]|~[+~-]|:>|:\?>?/,
    "computation-expression": {
      pattern: /\b[_a-z]\w*(?=\s*\{)/i,
      alias: "keyword"
    },
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/ftl.js
  var FTL_EXPR = [nested(`[^<()"']|\\((?:<self>)*\\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:\\\\.|[^\\\\"])*"|'(?:\\\\.|[^\\\\'])*'`, 2)];
  var interpolationInside2 = {
    "interpolation-punctuation": {
      pattern: /^\$\{|\}$/,
      alias: "punctuation"
    }
  };
  var ftl = interpolationInside2[rest] = {
    "comment": /<#--[^]*?-->/,
    "string": [
      {
        // raw string
        pattern: /\br(["'])(?:\\.|(?!\1)[^\\])*\1/g,
        greedy: true
      },
      {
        pattern: re(`(["'])(?:\\\\.|(?!\\1|\\$\\{)[^\\\\]|\\$\\{(?:(?!\\})<0>)*\\})*\\1`, FTL_EXPR, "g"),
        greedy: true,
        inside: {
          "interpolation": {
            pattern: re("((?:^|[^\\\\])(?:\\\\\\\\)*)\\$\\{(?:(?!\\})<0>)*\\}", FTL_EXPR),
            lookbehind: true,
            inside: interpolationInside2
          }
        }
      }
    ],
    "keyword": /\b(?:as)\b/,
    "boolean": boolean,
    "builtin-function": {
      pattern: /((?:^|[^?])\?\s*)\w+/,
      lookbehind: true,
      alias: "function"
    },
    "function": /\b\w+(?=\s*\()/,
    "number": /\b\d+(?:\.\d+)?\b/,
    "operator": /\.\.[<*!]?|->|--|\+\+|&&|\|\||\?\??|[%!=<>/*+-]=?|\b[gl]te?\b/,
    "punctuation": clikePunctuation
  };
  languages.ftl = {
    "ftl-comment": {
      pattern: /<#--[^]*?-->/g,
      greedy: true,
      alias: "comment"
    },
    "ftl-directive": {
      pattern: re("</?[#@][a-zA-Z]<0>*?>", FTL_EXPR, "gi"),
      greedy: true,
      inside: {
        "punctuation": /^<\/?|\/?>$/,
        "directive": {
          pattern: /^[#@][a-z]\w*/i,
          alias: "keyword"
        },
        "ftl": {
          pattern: /\s*\S[^]*/,
          alias: "language-ftl",
          inside: ftl
        }
      }
    },
    "ftl-interpolation": {
      pattern: re("\\$\\{<0>*?\\}", FTL_EXPR, "gi"),
      greedy: true,
      inside: {
        "punctuation": /^\$\{|\}$/,
        "ftl": {
          pattern: /\s*\S[^]*/,
          alias: "language-ftl",
          inside: ftl
        }
      }
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/gap.js
  var gap = {
    pattern: /^(gap>).+(?:\n>.*)*/,
    lookbehind: true
  };
  gap.inside = languages.gap = {
    "shell": {
      pattern: /^gap>[^]*?(?=^gap>|$(?![^]))/mg,
      greedy: true,
      inside: {
        "gap": gap,
        "punctuation": /^gap>/
      }
    },
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\"'])(?:'(?:\\.|[^\\\n']|){1,10}'|"(?:\\.|[^\\\n"])*"(?!")|"""[^]*?""")/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "continuation": {
          pattern: /^>/m,
          alias: "punctuation"
        }
      }
    },
    "keyword": /\b(?:Assert|Info|IsBound|QUIT|TryNextMethod|Unbind|[ae]nd|atomic|break|continue|do|elif|else|fi|f?or|function|if|in|local|m?od|not|quit|readonly|readwrite|rec|repeat|return|then|until|while)\b/,
    "boolean": boolean,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "number": {
      pattern: /(^|[^\w.]|\.\.)(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?(?:_[a-z]?)?(?=$|[^\w.]|\.\.)/,
      lookbehind: true
    },
    "continuation": {
      pattern: /^>/m,
      alias: "punctuation"
    },
    "operator": /->|[~^!=/*+-]|<>|[<>]=?|:=|\.\./,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/gcode.js
  languages.gcode = {
    "comment": /;.*|\B\(.*?\)\B/,
    "string": {
      pattern: /"(?:""|[^"])*"/g,
      greedy: true
    },
    "keyword": /\b[GM]\d+(?:\.\d+)?\b/,
    "property": /\b[A-Z]/,
    "checksum": {
      pattern: /(\*)\d+/,
      lookbehind: true,
      alias: "number"
    },
    // T0:0:0
    "punctuation": /[:*]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/gdscript.js
  languages.gdscript = {
    "comment": /#.*/,
    "string": {
      pattern: /@?(?:(["'])(?:\\[^]|(?!\1)[^\\\n])*\1(?!"|')|"""(?:\\[^]|[^\\])*?""")/g,
      greedy: true
    },
    "class-name": {
      // class_name Foo, extends Bar, class InnerClass
      // export(int) var baz, export(int, 0) var i
      // as Node
      // const FOO: int = 9, var bar: bool = true
      // func add(reference: Item, amount: int) -> Item:
      pattern: /(^(?:class|class_name|extends)[ 	]+|^export\([ 	]*|\bas[ 	]+|(?:\b(?:const|var)[ 	]|[,(])[ 	]*\w+[ 	]*:[ 	]*|->[ 	]*)(?!\d)\w+/m,
      lookbehind: true
    },
    "keyword": /\b(?:and|as|assert|break|breakpoint|class|class_name|const|continue|elif|else|enum|export|extends|f?or|func|if|in|is|master|mastersync|match|not|null|onready|pass|preload|puppet|puppetsync|remote|remotesync|return|self|setget|signal|static|tool|var|while|yield)\b/,
    "function": /\b[a-z_]\w*(?=[ 	]*\()/i,
    "variable": /\$\w+/,
    "number": [
      /\b0b[01_]+\b|\b0x[a-fA-F\d_]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.[\d_]+)(?:e[+-]?[\d_]+)?\b/,
      /\b(?:INF|NAN|PI|TAU)\b/
    ],
    "constant": /\b[A-Z][A-Z_\d]*\b/,
    "boolean": boolean,
    "operator": /->|:=|&&|\|\||<<|>>|[%&|!=<>/*+-]=?|[~^]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/gedcom.js
  languages.gedcom = {
    "line-value": {
      // Preceded by level, optional pointer, and tag
      pattern: /(^[ 	]*\d+ +(?:@\w[\w!"$%&'()*+,./:;<=>?[\\\]^`{|}~\x80-\xfe #-]*@ +)?\w+ ).+/m,
      lookbehind: true,
      inside: {
        "pointer": {
          pattern: /^@\w[\w!"$%&'()*+,./:;<=>?[\\\]^`{|}~\x80-\xfe #-]*@$/,
          alias: "variable"
        }
      }
    },
    "record": {
      // Preceded by level and optional pointer
      pattern: /(^[ 	]*\d+ +(?:@\w[\w!"$%&'()*+,./:;<=>?[\\\]^`{|}~\x80-\xfe #-]*@ +)?)\w+/m,
      lookbehind: true,
      alias: "tag"
    },
    "level": {
      pattern: /(^[ 	]*)\d+/m,
      lookbehind: true,
      alias: "number"
    },
    "pointer": {
      pattern: /@\w[\w!"$%&'()*+,./:;<=>?[\\\]^`{|}~\x80-\xfe #-]*@/,
      alias: "variable"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/gettext.js
  languages.po = languages.gettext = {
    "comment": [
      {
        pattern: /# .*/g,
        greedy: true,
        alias: "translator-comment"
      },
      {
        pattern: /#\..*/g,
        greedy: true,
        alias: "extracted-comment"
      },
      {
        pattern: /#:.*/g,
        greedy: true,
        alias: "reference-comment"
      },
      {
        pattern: /#,.*/g,
        greedy: true,
        alias: "flag-comment"
      },
      {
        pattern: /#\|.*/g,
        greedy: true,
        alias: "previously-untranslated-comment"
      },
      {
        pattern: /#.*/g,
        greedy: true
      }
    ],
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^\\"])*"/g,
      lookbehind: true,
      greedy: true
    },
    "keyword": /^msg(?:ctxt|id|id_plural|str)\b/m,
    "number": /\b\d+\b/,
    "punctuation": /[[\]]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/gherkin.js
  var tableRow = "\n[ 	]*\\|.+\\|(?:(?!\\|).)*";
  languages.gherkin = {
    "pystring": {
      pattern: /("""|''')[^]+?\1/,
      alias: "string"
    },
    "comment": {
      pattern: /(^[ 	]*)#.*/m,
      lookbehind: true
    },
    "tag": {
      pattern: /(^[ 	]*)@\S*/m,
      lookbehind: true
    },
    "feature": {
      pattern: /(^[ 	]*)(?:Ability|Ahoy matey!|Arwedd|Aspekt|Besigheid Behoefte|Business Need|Caracteristica|Característica|Egenska[bp]|Eiginleiki|Feature|Fīča|Fitur|Fonctionnalité|Fonksyonalite|Funcionalidade|Funcionalitat|Functionalitate|Funcţionalitate|Funcționalitate|Functionaliteit|Fungsi|Funkcia|Funkcija|Funkcionalitāte|Funkcionalnost|Funkcja|Funksie|Funktionalität|Funktionalitéit|Funzionalità|Hwaet|Hwæt|Jellemző|Karakteristik|Lastnost|Mak|Mogucnost|laH|Mogućnost|Moznosti|Možnosti|OH HAI|Omadus|Ominaisuus|Osobina|Özellik|Potrzeba biznesowa|perbogh|poQbogh malja'|Požadavek|Požiadavka|Pretty much|Qap|Qu'meH 'ut|Savybė|Tính năng|Trajto|Vermoë|Vlastnosť|Właściwość|Značilnost|Δυνατότητα|Λειτουργία|Могућност|Мөмкинлек|Особина|Свойство|Үзенчәлеклелек|Функционал|Функционалност|Функция|Функціонал|תכונה|خاصية|خصوصیت|صلاحیت|کاروبار کی ضرورت|وِیژگی|रूप लेख|ਖਾਸੀਅਤ|ਨਕਸ਼ ਨੁਹਾਰ|ਮੁਹਾਂਦਰਾ|గుణము|ಹೆಚ್ಚಳ|ความต้องการทางธุรกิจ|ความสามารถ|โครงหลัก|기능|フィーチャ|功能|機能):(?:[^\n:]+(?:\n|$))*/m,
      lookbehind: true,
      inside: {
        "keyword": /[^\n:]+:/,
        "important": /^.+/
      }
    },
    "scenario": {
      pattern: /(^[ 	]*)(?:Abstra[ck]t Scenario|Achtergrond|Aer|Ær|Agtergrond|All y'all|Antecedente?s|Atburðarás|Atburðarásir|Awww, look mate|B4|Background|Baggrund|Bakgrun[dn]|Bakgrunnur|Beispiele|Beispiller|Bối cảnh|Cefndir|Cen[aá]rios?|Cenário|Cen[aá]rio de Fundo|Conte[sx]to|Contexte?|Contoh?|Contone|Dæmi|Dasar|Dead men tell no tales|Delineacao do Cenario|Delineação do Cenário|Dis is what went down|Dữ liệu|Dyagram [Ss]enaryo|Egzanp|Ejemplos|Eksempler|Ekzemploj|Enghreifftiau|Esbozo do escenario|Escenario?|Esempi|Esquema de l'escenari|Esquema del escenario|Esquema do Cenario|Esquema do Cenário|EXAMPLZ|Examples|Exempel|Exemples?|Exemplos|First off|Fono|Forgatókönyv|Forgatókönyv vázlat|Fundo|Geçmiş|Grundlage|Hannergrond|ghantoH|Háttér|Heave to|Istorik|Juhtumid|Keadaan|Khung kịch bản|Khung tình huống|Kịch bản|Koncept|Konsep skenario|Kontèks|Kontekst|Konteksta?s|Kontext|Konturo de la scenaro|Latar Belakang|lut chovnatlh|lut|lutmey|Lýsing Atburðarásar|Lýsing Dæma|MISHUN SRSLY|MISHUN|Menggariskan Senario|mo'|Náčrt Scenár[au]|Náčrt Scénáře|Oris scenarija|Örnekler|Osnova|Osnova Scenára|Osnova scénáře|Osnutek|Ozadje|Paraugs|Pavyzdžiai|Példák|Piemēri|Plan du scénario|Plan du Scénario|Plan Senaryo|Plan senaryo|Plang vum Szenario|Pozadí|Pozadie|Pozadina|Príklady|Příklady|Primeri?|Primjeri|Przykłady|Raamstsenaarium|Reckon it's like|Rerefons|Scenár|Scénář|Scenari(?:e|jai|jaus šablonas|ji?|jus|o Amlinellol|o Outline|o Template|omall?|os?|u|usz)|Scénario|Scenārijs|Scenārijs pēc parauga|Scenaro|Schema dello scenario|Se ðe|Se the|Se þe|Senar[iy]o|Senaryo Deskripsyon|Senaryo deskripsyon|Senaryo taslağı|Shiver me timbers|Situācija|Situai|Situasie Uiteensetting|Situasie|Skenario konsep|Skenario|Skica|Structura scenariu|Structură scenariu|Struktura scenarija|Stsenaarium|Swa hwaer swa|Swa|Swa hwær swa|Szablon scenariusza|Szenario|Szenariogrundriss|Tapaukset|Tapaus|Tapausaihio|Tausta?|Template Keadaan|Template Senario|Template Situai|The thing of it is|Tình huống|Variantai|Voorbeelden?|Wharrimean is|Yo-ho-ho|You'll wanna|Założenia|Παραδείγματα|Περιγραφή Σεναρίου|Σενάρι[αο]|Υπόβαθρο|Кереш|Контекст|Концепт|Мисаллар|Мисоллар|Основа|Передумова|Позадина|Предистория|Предыстория|Приклади|Примери?|Примеры|Рамка на сценарий|Скица|Структура сценарија|Структура сценария|Структура сценарію|Сценарий|Сценарий структураси|Сценарийның төзелеше|Сценарији|Сценарио|Сценарій|Тарих|Үрнәкләр|דוגמאות|רקע|תבנית תרחיש|תרחיש|الخلفية|الگوی سناریو|امثلة|پس منظر|زمینه|سناریو|سيناريو|سيناريو مخطط|مثالیں|منظر نامے کا خاکہ|منظرنامہ|نمونه ها|उदाहरण|परिदृश्य|परिदृश्य रूपरेखा|पृष्ठभूमि|ਉਦਾਹਰਨਾਂ|ਪਟਕਥਾ|ਪਟਕਥਾ ਢਾਂਚਾ|ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ|ਪਿਛੋਕੜ|ఉదాహరణలు|కథనం|నేపథ్యం|సన్నివేశం|ಉದಾಹರಣೆಗಳು|ಕಥಾಸಾರಾಂಶ|ವಿವರಣೆ|ಹಿನ್ನೆಲೆ|โครงสร้างของเหตุการณ์|ชุดของตัวอย่าง|ชุดของเหตุการณ์|แนวคิด|สรุปเหตุการณ์|เหตุการณ์|배경|시나리오|시나리오 개요|예|サンプル|シナリオ|シナリオアウトライン|シナリオテンプレ|シナリオテンプレート|テンプレ|例子?|剧本|剧本大纲|劇本|劇本大綱|场景|场景大纲|場景|場景大綱|背景):[^\n:]*/m,
      lookbehind: true,
      inside: {
        "keyword": /[^\n:]+:/,
        "important": /.+/
      }
    },
    "table-body": {
      // Look-behind is used to skip the table head, which has the same format as any table row
      pattern: RegExp("(" + tableRow + ")(?:" + tableRow + ")+"),
      lookbehind: true,
      inside: {
        "outline": {
          pattern: /<[^>]+>/,
          alias: "variable"
        },
        "td": {
          pattern: /\s*[^\s|][^|]*/,
          alias: "string"
        },
        "punctuation": /\|/
      }
    },
    "table-head": {
      pattern: RegExp(tableRow),
      inside: {
        "th": {
          pattern: /\s*[^\s|][^|]*/,
          alias: "variable"
        },
        "punctuation": /\|/
      }
    },
    "atrule": {
      pattern: /(^[ 	]+)(?:'a|'ach|'ej|7|A také|A taktiež|A tiež|A zároveň|Aber|Ac|Adott|Akkor|Ak|Aleshores|Al[ei]|Allora|Alors|Als|Ama|Amennyiben|Amikor|Ampak|an?|AN|Ananging|And y'all|And|Angenommen|Anrhegedig a|An|Apabila|Atès|Atesa|Atunci|Avast!|Aye|A|awer|Bagi|Banjur|Bet|Biết|Blimey!|Buh|But at the end of the day I reckon|But y'all|But|BUT|Cal|Când|Cand|Ce|Cu?ando|Če|Ða ðe|Ða|Dadas?|Dados?|DaH ghu' bejlu'|dann|Dan[no]?|Dar|Dat[ie]? fiind|Dat[aei]|Da[ţț]i fiind|DEN|Dato|De|Den youse gotta|Dengan|Diberi|Diyelim ki|Donada|Donat|Donitaĵo|Do|Dun|Duota|Ðurh|Eeldades|Ef|Eğer ki|Entao|Então|Entón|En?|Entonces|Epi|És|[EÉ]tant donnée?s?|Et|Fakat|Gangway!|Gdy|Gegeben seien|Gegeben sei|Gegeven|Gegewe|ghu' noblu'|Gitt|Given y'all|Give[nt]|Givun|Ha|Cho|I CAN HAZ|In|Ir|It's just unbelievable|I|Ja|Jeśli|Jeżeli|Kad|Kadar?|Ka[ij]|Když|Keď|Kemudian|Ketika|Khi|Kiedy|Ko|Kuid?|Kun|Lan|latlh|Le sa a|Let go and haul|Le|Lè sa a|Lè|Logo|Lorsqu'<|Lorsque|mä|Maar|Mais|Mając|Majd|Maka|Manawa|Mas?|Men|Menawa|Mutta|Nalika|Nalikaning|Nanging|Når|När|Nato|Nhưng|Niin|Njuk|O zaman|Och|Og|Oletetaan|Onda?|Oraz|Pak|Per[oò]|Podano|Pokiaľ|Pokud|Potem|Potom|Privzeto|Pryd|Quan|Quando?|qaSDI'|Så|Sed?|Siis|Sipoze ke|Sipoze Ke|Sipoze|Si|Şi|Și|Soit|Stel|Tada?|Takrat|Tak|Tapi|Ter|Tetapi|Tha the|Tha|[TW]hen y'all|[TW]hen|Thì|Thurh|Toda|Too right|Und?|ugeholl|Và|vaj|Vendar|Ve|wann|Wanneer|WEN|Wenn|Wtedy|Wun|Y'know|Yeah nah|Yna|Youse know like when|Youse know when youse got|Y|Za predpokladu|Za předpokladu|Zadani?|Zadano|Zadat[eo]|Zakładając|Zaradi|Zatati|Þa þe|Þa|Þá|Þegar|Þurh|Αλλά|Δεδομένου|Και|Όταν|Τότε|А також|Агар|Ал[еи]|Аммо|А|Әгәр|Әйтик|Әмма|Бирок|Ва|Вә|Дадено|Дано|Допустим|Если|Задат[еио]|И|І|К тому же|Када?|Когато|[КТ]огда|Коли|Ләкин|Лекин|Нәтиҗәдә|Нехай|Но|[ОУ]нда|Припустимо, що|Припустимо|Пусть|Также|Та|Тоді|То|Һәм|Якщо|אבל|אזי?|בהינתן|וגם|כאשר|آنگاه|اذاً|اگر|اما|اور|با فرض|بالفرض|بفرض|پھر|تب|ثم|جب|عندما|فرض کیا|لكن|لیکن|متى|هنگامی|و|अगर|और|कदा|किन्तु|चूंकि|जब|तथा|तदा|तब|परन्तु|पर|यदि|ਅਤੇ|ਜਦੋਂ|ਜਿਵੇਂ ਕਿ|ਜੇਕਰ|ਤਦ|ਪਰ|అప్పుడు|ఈ పరిస్థితిలో|కాని|చెప్పబడినది|మరియు|ಆದರೆ|ನಂತರ|ನೀಡಿದ|ಮತ್ತು|ಸ್ಥಿತಿಯನ್ನು|กำหนดให้|ดังนั้น|แต่|เมื่อ|และ|그러면<|그리고<|단<|만약<|만일<|먼저<|조건<|하지만<|かつ<|しかし<|ただし<|ならば<|もし<|並且<|但し<|但是<|假如<|假定<|假設<|假设<|前提<|同时<|同時<|并且<|当<|當<|而且<|那么<|那麼<)(?=[ 	])/m,
      lookbehind: true
    },
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'/,
      inside: {
        "outline": {
          pattern: /<[^>]+>/,
          alias: "variable"
        }
      }
    },
    "outline": {
      pattern: /<[^>]+>/,
      alias: "variable"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/git.js
  languages.git = {
    /*
     * A simple one line comment like in a git status command
     * For instance:
     * $ git status
     * # On branch infinite-scroll
     * # Your branch and 'origin/sharedBranches/frontendTeam/infinite-scroll' have diverged,
     * # and have 1 and 2 different commits each, respectively.
     * nothing to commit (working directory clean)
     */
    "comment": /^#.*/m,
    /*
     * Regexp to match the changed lines in a git diff output. Check the example below.
     */
    "deleted": /^[-–].*/m,
    "inserted": /^\+.*/m,
    /*
     * a string (double and simple quote)
     */
    "string": /(["'])(?:\\.|(?!\1)[^\\\n])*\1/,
    /*
     * a git command. It starts with a random prompt finishing by a $, then "git" then some other parameters
     * For instance:
     * $ git add file.txt
     */
    "command": {
      pattern: /^.*\$ git .*/m,
      inside: {
        /*
         * A git command can contain a parameter starting by a single or a double dash followed by a string
         * For instance:
         * $ git diff --cached
         * $ git log -p
         */
        "parameter": /\s--?\w+/
      }
    },
    /*
     * Coordinates displayed in a git diff command
     * For instance:
     * $ git diff
     * diff --git file.txt file.txt
     * index 6214953..1d54a52 100644
     * --- file.txt
     * +++ file.txt
     * @@ -1 +1,2 @@
     * -Here's my tetx file
     * +Here's my text file
     * +And this is the second line
     */
    "coord": /^@@.*@@$/m,
    /*
     * Match a "commit [SHA1]" line in a git log output.
     * For instance:
     * $ git log
     * commit a11a14ef7e26f2ca62d4b35eac455ce636d0dc09
     * Author: lgiraudel
     * Date:   Mon Feb 17 11:18:34 2014 +0100
     *
     *     Add of a new line
     */
    "commit-sha1": /^commit \w{40}$/m
  };

  // node_modules/prism-code-editor/dist/prism/languages/glsl.js
  languages.glsl = extend("c", {
    "keyword": /\b(?:active|asm|atomic_uint|attribute|[ibdu]?vec[234]|bool|break|buffer|cas[et]|centroid|class|coherent|common|const|continue|d?mat[234](?:x[234])?|default|discard|do|double|else|enum|extern|external|false|true|filter|fixed|flat|float|for|[fh]vec[234]|goto|half|highp|[iu]?(?:sampler|image)(?:2DMS(?:Array)?|2DRect|Buffer|Cube|CubeArray|[123]D|[12]DArray)|if|in|inline|in[op]ut|interface|invariant|layout|long|lowp|mediump|namespace|noinline|noperspective|out|output|partition|patch|precise|precision|public|readonly|resource|restrict|return|sample|sampler(?:[12]DArrayShadow|[12]DShadow|2DRectShadow|3DRect|CubeArrayShadow|CubeShadow)|shared|short|sizeof|smooth|static|struct|subroutine|superp|switch|template|this|typedef|u?int|uniform|union|unsigned|using|varying|void|volatile|while|writeonly)\b/
  });

  // node_modules/prism-code-editor/dist/prism/languages/gml.js
  languages.gamemakerlanguage = languages.gml = extend("clike", {
    "keyword": /\b(?:break|case|continue|default|do|else|enum|exit|for|globalvar|if|repeat|return|switch|until|var|while)\b/,
    "number": /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ulf]{0,4}/i,
    "operator": /--|\+\+|&&?|!=|\*\*=?|<>|>>|<<|[%=<>/*+-]=?|\^\^?|\|\|?|~|\b(?:and|at|not|with|x?or)\b/,
    "constant": /\b(?:GM_build_date|GM_version|action_(?:continue|restart|reverse|stop)|all|gamespeed_(?:fps|microseconds)|global|local|noone|other|pi|pointer_(?:invalid|null)|self|timezone_(?:local|utc)|undefined|ev_(?:create|destroy|step|alarm|keyboard|mouse|collision|other|draw|draw_(?:begin|end|post|pre)|keypress|keyrelease|trigger|(?:left|middle|no|right)_button|(?:left|middle|right)_press|(?:left|middle|right)_release|mouse_(?:enter|leave|wheel_down|wheel_up)|global_(?:left|middle|right)_button|global_(?:left|middle|right)_press|global_(?:left|middle|right)_release|joystick(?:1|2)_(?:button[1-8]|down|left|right|up)|outside|boundary|game_start|game_end|room_start|room_end|no_more_lives|animation_end|end_of_path|no_more_health|user\d|gui|gui_begin|gui_end|step_(?:begin|end|normal))|vk_(?:[lr]?alt|anykey|backspace|[lr]?control|delete|down|end|enter|escape|home|insert|left|nokey|pagedown|pageup|pause|printscreen|return|right|[lr]?shift|space|tab|up|f\d|numpad\d|add|decimal|divide|multiply|subtract)|achievement_(?:filter_(?:all_players|favorites_only|friends_only)|friends_info|info|leaderboard_info|our_info|pic_loaded|show_(?:achievement|bank|friend_picker|leaderboard|profile|purchase_prompt|ui)|type_challenge|type_score_challenge)|asset_(?:font|object|path|room|script|shader|sound|sprite|tiles|timeline|unknown)|audio_(?:3d|falloff_(?:exponent_distance|exponent_distance_clamped|inverse_distance|inverse_distance_clamped|linear_distance|linear_distance_clamped|none)|mono|new_system|old_system|stereo)|bm_(?:add|complex|dest_alpha|dest_color|dest_colour|inv_dest_alpha|inv_dest_color|inv_dest_colour|inv_src_alpha|inv_src_color|inv_src_colour|max|normal|one|src_alpha|src_alpha_sat|src_color|src_colour|subtract|zero)|browser_(?:chrome|firefox|ie|ie_mobile|not_a_browser|opera|safari|safari_mobile|tizen|unknown|windows_store)|buffer_(?:bool|[fs]16|[fs]32|f64|fast|fixed|generalerror|grow|invalidtype|network|outofbounds|outofspace|s8|seek_end|seek_relative|seek_start|string|text|u16|u32|u64|u8|vbuffer|wrap)|c_(?:aqua|black|blue|dkgray|fuchsia|gray|green|lime|ltgray|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)|cmpfunc_(?:always|equal|greater|greaterequal|less|lessequal|never|notequal)|cr_(?:appstart|arrow|beam|cross|default|drag|handpoint|hourglass|none|size_all|size_nesw|size_ns|size_nwse|size_we|uparrow)|cull_(?:clockwise|counterclockwise|noculling)|device_(?:emulator|tablet)|device_ios_(?:ipad|ipad_retina|iphone[56]?|iphone6plus|iphone_retina|unknown)|display_(?:landscape|landscape_flipped|portrait|portrait_flipped)|dll_(?:cdecl|cdel|stdcall)|ds_type_(?:grid|list|map|priority|queue|stack)|ef_(?:cloud|ellipse|explosion|firework|flare|rain|ring|smoke|smokeup|snow|spark|star)|fa_(?:archive|bottom|center|directory|hidden|left|middle|readonly|right|sysfile|top|volumeid)|fb_login_(?:default|fallback_to_webview|forcing_safari|forcing_webview|no_fallback_to_webview|use_system_account)|iap_(?:available|canceled|ev_consume|ev_product|ev_purchase|ev_restore|ev_storeload|failed|purchased|refunded|status_available|status_loading|status_processing|status_restoring|status_unavailable|status_uninitialised|storeload_failed|storeload_ok|unavailable)|leaderboard_type_(?:number|time_mins_secs)|lighttype_(?:dir|point)|matrix_(?:projection|view|world)|mb_(?:any|left|middle|none|right)|network_(?:config_(?:connect_timeout|disable_reliable_udp|enable_reliable_udp|use_non_blocking_socket)|socket_(?:bluetooth|tcp|udp)|type_(?:connect|data|disconnect|non_blocking_connect))|of_challenge_(?:lose|tie|win)|os_(?:android|ios|linux|macosx|ps[34]|psvita|unknown|uwp|win32|win8native|windows|winphone|xboxone)|phy_debug_render_(?:aabb|collision_pairs|coms|core_shapes|joints|obb|shapes)|phy_joint_(?:anchor_[12]_[xy]|angle|angle_limits|damping_ratio|frequency|length_[12]|lower_angle_limit|max_force|max_length|max_motor_force|max_motor_torque|max_torque|motor_force|motor_speed|motor_torque|reaction_force_[xy]|reaction_torque|speed|translation|upper_angle_limit)|phy_particle_data_flag_(?:category|color|colour|position|typeflags|velocity)|phy_particle_flag_(?:colormixing|colourmixing|elastic|powder|spring|tensile|viscous|wall|water|zombie)|phy_particle_group_flag_(?:rigid|solid)|pr_(?:linelist|linestrip|pointlist|trianglefan|trianglelist|trianglestrip)|ps_(?:distr|shape)_(?:diamond|ellipse|gaussian|invgaussian|line|linear|rectangle)|pt_shape_(?:circle|cloud|disk|explosion|flare|line|pixel|ring|smoke|snow|spark|sphere|square|star)|ty_(?:real|string)|gp_(?:face\d|axis[lr][hv]|pad[dlru]|select|shoulder[lr]b?|start|stick[lr])|lb_disp_(?:none|numeric|time_ms|time_sec)|lb_sort_(?:ascending|descending|none)|ov_(?:achievements|community|friends|gamegroup|players|settings)|ugc_(?:filetype_(?:community|microtrans)|list_(?:Favorited|Followed|Published|Subscribed|UsedOrPlayed|VotedDown|VotedOn|VotedUp|WillVoteLater)|match_(?:AllGuides|Artwork|Collections|ControllerBindings|IntegratedGuides|Items|Items_Mtx|Items_ReadyToUse|Screenshots|UsableInGame|Videos|WebGuides)|query_(?:AcceptedForGameRankedByAcceptanceDate|CreatedByFriendsRankedByPublicationDate|FavoritedByFriendsRankedByPublicationDate|NotYetRated)|query_RankedBy(?:NumTimesReported|PublicationDate|TextSearch|TotalVotesAsc|Trend|Vote|VotesUp)|result_success|sortorder_CreationOrder(?:Asc|Desc)|sortorder_(?:ForModeration|LastUpdatedDesc|SubscriptionDateDesc|TitleAsc|VoteScoreDesc)|visibility_(?:friends_only|private|public))|vertex_usage_(?:binormal|blendindices|blendweight|color|colour|depth|fog|normal|position|psize|sample|tangent|texcoord|textcoord)|vertex_type_(?:float\d|color|colour|ubyte4)|input_type|layerelementtype_(?:background|instance|oldtilemap|particlesystem|sprite|tile|tilemap|undefined)|se_(?:chorus|compressor|echo|equalizer|flanger|gargle|none|reverb)|text_type|tile_(?:flip|index_mask|mirror|rotate)|(?:obj|rm|scr|spr)\w+)\b/,
    "variable": /\b(?:alarm|application_surface|async_load|background_(?:alpha|blend|colu?or|foreground|height|[hv]speed|[hv]tiled|index|showcolou?r|visible|width|x|[xy]scale|y)|bbox_(?:bottom|left|right|top)|browser_(?:height|width)|caption_(?:health|lives|score)|current_(?:day|hour|minute|month|second|time|weekday|year)|cursor_sprite|debug_mode|delta_time|direction|display_aa|error_(?:last|occurred)|event_(?:action|number|object|type)|fps|fps_real|friction|game_(?:display|project|save)_(?:id|name)|gamemaker_(?:pro|registered|version)|gravity|gravity_direction|[hv]?speed|health|iap_data|id|image_(?:alpha|angle|blend|depth|index|number|speed|[xy]scale)|instance_(?:count|id)|keyboard_(?:key|lastchar|lastkey|string)|layer|lives|mask_index|mouse_(?:button|lastbutton|x|y)|object_index|os_(?:browser|device|type|version)|path_(?:endaction|index|orientation|position|positionprevious|scale|speed)|persistent|phy_(?:rotation|(?:col_normal|collision|com|linear_velocity|position|speed)_[xy]|angular_(?:damping|velocity)|position_[xy]previous|speed|linear_damping|bullet|fixed_rotation|active|mass|inertia|dynamic|kinematic|sleeping|collision_points)|pointer_(?:invalid|null)|room|room_(?:caption|first|height|last|persistent|speed|width)|score|secure_mode|show_(?:health|lives|score)|solid|sprite_(?:height|index|width|[xy]offset)|temp_directory|timeline_(?:index|loop|position|running|speed)|transition_(?:color|kind|steps)|undefined|view_(?:angle|current|enabled|[hv](?:border|speed)|[hwxy]port|[hwxy]view|object|surface_id|visible)|visible|webgl_enabled|working_directory|[xy](?:previous|start)|x|y|argument(?:_relitive|_count|\d)|argument|global|local|other|self)\b/
  });

  // node_modules/prism-code-editor/dist/prism/languages/gn.js
  var expression5 = {
    pattern: /[^]+/
  };
  expression5.inside = languages.gni = languages.gn = {
    "comment": /#.*/,
    "string-literal": {
      pattern: /(^|[^\\"])"(?:\\.|[^\\\n"])*"/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$(?:\{[^]*?\}|(?!\d)\w+|0x[a-fA-F\d]{2})/,
          lookbehind: true,
          inside: {
            "number": /^\$0x[^]{2}$/,
            "variable": /^\$\w+$/,
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            "expression": expression5
          }
        },
        "string": /[^]+/
      }
    },
    "keyword": /\b(?:else|if)\b/,
    "boolean": boolean,
    "builtin-function": {
      // a few functions get special highlighting to improve readability
      pattern: /\b(?:assert|defined|foreach|import|[pt]ool|print|template|toolchain)(?=\s*\()/i,
      alias: "keyword"
    },
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "constant": /\b(?:current_cpu|current_os|current_toolchain|default_toolchain|host_cpu|host_os|root_build_dir|root_gen_dir|root_out_dir|target_cpu|target_gen_dir|target_os|target_out_dir)\b/,
    "number": /-?\b\d+\b/,
    "operator": /[!=<>+-]=?|&&|\|\|/,
    "punctuation": /[()[\]{}.,]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/go-module.js
  languages["go-mod"] = languages["go-module"] = {
    "comment": /\/\/.*/,
    "version": {
      pattern: /(^|[\s()[\],])v\d+\.\d+\.\d+(?:[+-][\w.+-]*)?(?![^\s()[\],])/,
      lookbehind: true,
      alias: "number"
    },
    "go-version": {
      pattern: /((?:^|\s)go\s+)\d+(?:\.\d+){1,2}/,
      lookbehind: true,
      alias: "number"
    },
    "keyword": {
      pattern: /^([ 	]*)(?:exclude|go|module|replace|require|retract)\b/m,
      lookbehind: true
    },
    "operator": /=>/,
    "punctuation": /[()[\],]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/go.js
  languages.go = {
    "comment": clikeComment(),
    "char": {
      pattern: /'(?:\\.|[^\\\n']){0,10}'/g,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^\\\n"])*"|`[^`]*`/g,
      lookbehind: true,
      greedy: true
    },
    "keyword": /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    "boolean": /\b(?:_|false|true|iota|nil)\b/,
    "function": /\b\w+(?=\()/,
    "number": [
      // binary and octal integers
      /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
      // hexadecimal integers and floats
      /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
      // decimal integers and floats
      /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
    ],
    "operator": /--|\+\+|&&|\|\||&\^=?|<-|<<=?|>>=?|[%&|^!=<>/*+-]=?|:=|\.{3}/,
    "punctuation": clikePunctuation,
    "builtin": /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/gradle.js
  var expression6 = {
    pattern: /[^]+/
  };
  var interpolation4 = {
    pattern: /((?:^|[^\\$])(?:\\\\)*)\$(?:\w+|\{[^{}]*\})/,
    lookbehind: true,
    inside: {
      "interpolation-punctuation": {
        pattern: /^\$\{?|\}$/,
        alias: "punctuation"
      },
      "expression": expression6
    }
  };
  expression6.inside = languages.gradle = {
    "comment": clikeComment(),
    "shebang": {
      pattern: /#!.+/g,
      alias: "comment",
      greedy: true
    },
    "interpolation-string": {
      pattern: /"""(?:\\[^]|[^\\])*?"""|(["/])(?:\\.|(?!\1)[^\\\n])*\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/g,
      greedy: true,
      inside: {
        "interpolation": interpolation4,
        "string": /[^]+/
      }
    },
    "string": {
      pattern: /'''(?:\\[^]|[^\\])*?'''|'(?:\\.|[^\\\n'])*'/g,
      greedy: true
    },
    "class-name": clikeClass(),
    "keyword": /\b(?:apply|def|dependencies|else|if|implementation|import|plugins?|project|repositories|repository|sourceSets|tasks|val)\b/,
    "boolean": boolean,
    "annotation": {
      pattern: /(^|[^.])@\w+/,
      lookbehind: true,
      alias: "punctuation"
    },
    "function": /\b\w+(?=\()/,
    "number": /\b(?:0b[01_]+|0x[a-f\d_]+(?:\.[a-f\d_p-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
    "operator": {
      pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*\.|\.[@&]|\.\.<|\.\.(?!\.)|--|\+\+|&&|\|\||\*\*=?|->|>>>?=?|<<=?|<=>?|[%&|^!=<>/*+-]=?)/,
      lookbehind: true
    },
    "spock-block": /\b(?:and|cleanup|expect|given|setup|[tw]hen|where):/,
    "punctuation": /\.+|[()[\]{},:;$]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/graphql.js
  languages.graphql = {
    "comment": /#.*/,
    "description": {
      pattern: /(?:"""(?:[^"]|"(?!""))*"""|"(?:\\.|[^\\\n"])*")(?=\s*[a-z_])/gi,
      greedy: true,
      alias: "string",
      inside: {
        "language-markdown": {
          pattern: /("(?!")|""")[^]+(?=\1)/,
          lookbehind: true,
          inside: "md"
        }
      }
    },
    "string": {
      pattern: /"""[^]*?"""|"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "number": /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    "boolean": boolean,
    "variable": /\$[a-z_]\w*/i,
    "directive": {
      pattern: /@[a-z_]\w*/i,
      alias: "function"
    },
    "attr-name": {
      pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\\n"])*")*\))?:)/gi,
      greedy: true
    },
    "atom-input": {
      pattern: /\b[A-Z]\w*Input\b/,
      alias: "class-name"
    },
    "scalar": /\b(?:Boolean|Float|ID|Int|String)\b/,
    "constant": /\b[A-Z][A-Z_\d]*\b/,
    "class-name": {
      pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
      lookbehind: true
    },
    "fragment": {
      pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))(?!\d)\w+/,
      lookbehind: true,
      alias: "function"
    },
    "definition-mutation": {
      pattern: /(\bmutation\s+)(?!\d)\w+/,
      lookbehind: true,
      alias: "function"
    },
    "definition-query": {
      pattern: /(\bquery\s+)(?!\d)\w+/,
      lookbehind: true,
      alias: "function"
    },
    "keyword": /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
    "operator": /[&|!=]|\.{3}/,
    "property-query": /\w+(?=\s*\()/,
    "object": /\w+(?=\s*\{)/,
    "punctuation": /[()[\]{},:!=]/,
    "property": /\w+/,
    [tokenize](code, grammar) {
      var tokens = withoutTokenizer(code, grammar);
      var validTokens = tokens.filter(({ type: type5 }) => type5 && type5 != "comment" && type5 != "scalar");
      var l = validTokens.length;
      var currentIndex = 0;
      var isNotTokenType = (types2) => {
        for (var i2 = 0; i2 < types2.length; i2++) {
          if (currentIndex + i2 == l || validTokens[currentIndex + i2].type != types2[i2]) {
            return true;
          }
        }
      };
      var findClosingBracket = (open, close) => {
        var stackHeight = 1;
        for (var i2 = currentIndex; i2 < l; i2++) {
          var token = validTokens[i2];
          var content2 = token.content;
          if (token.type == "punctuation") {
            if (open == content2) {
              stackHeight++;
            } else if (close == content2 && !--stackHeight) {
              return i2;
            }
          }
        }
      };
      while (currentIndex < l) {
        var startToken = validTokens[currentIndex++];
        if (startToken.type == "keyword" && startToken.content == "mutation") {
          var inputVariables = [];
          if (!isNotTokenType(["definition-mutation", "punctuation"]) && validTokens[currentIndex + 1].content == "(") {
            currentIndex += 2;
            var definitionEnd = findClosingBracket("(", ")");
            if (!definitionEnd) continue;
            for (; currentIndex < definitionEnd; currentIndex++) {
              var t = validTokens[currentIndex];
              if (t.type == "variable") {
                t.alias = "variable-input";
                inputVariables.push(t.content);
              }
            }
            currentIndex = definitionEnd + 1;
          }
          if (!isNotTokenType(["punctuation", "property-query"]) && validTokens[currentIndex].content == "{") {
            validTokens[++currentIndex].alias = "property-mutation";
            if (inputVariables[0]) {
              var mutationEnd = findClosingBracket("{", "}");
              if (mutationEnd) for (var i = currentIndex; i < mutationEnd; i++) {
                var varToken = validTokens[i];
                if (varToken.type == "variable" && inputVariables.indexOf(varToken.content) >= 0) {
                  varToken.alias = "variable-input";
                }
              }
            }
          }
        }
      }
      return tokens;
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/groovy.js
  var expression7 = {
    pattern: /[^]+/
  };
  var interpolation5 = {
    pattern: /((?:^|[^\\$])(?:\\\\)*)\$(?:\w+|\{[^{}]*\})/,
    lookbehind: true,
    inside: {
      "interpolation-punctuation": {
        pattern: /^\$\{?|\}$/,
        alias: "punctuation"
      },
      "expression": expression7
    }
  };
  expression7.inside = languages.groovy = {
    "comment": clikeComment(),
    "shebang": {
      pattern: /#!.+/g,
      alias: "comment",
      greedy: true
    },
    "interpolation-string": {
      // TODO: Slash strings (e.g. /foo/) can contain line breaks but this will cause a lot of trouble with
      // simple division (see JS regex), so find a fix maybe?
      pattern: /"""(?:\\[^]|[^\\])*?"""|(["/])(?:\\.|(?!\1)[^\\\n])*\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/g,
      greedy: true,
      inside: {
        "interpolation": interpolation5,
        "string": /[^]+/
      }
    },
    "string": {
      // https://groovy-lang.org/syntax.html#_dollar_slashy_string
      pattern: /'''(?:\\[^]|[^\\])*?'''|'(?:\\.|[^\\\n'])*'/g,
      greedy: true
    },
    "class-name": clikeClass(),
    "keyword": /\b(?:abstract|as|assert|boolean|break|byte|case|catch|char|class|const|continue|def|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int?|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throws?|trait|transient|try|void|volatile|while)\b/,
    "boolean": boolean,
    "annotation": {
      pattern: /(^|[^.])@\w+/,
      lookbehind: true,
      alias: "punctuation"
    },
    "function": /\b\w+(?=\()/,
    "number": /\b(?:0b[01_]+|0x[a-f\d_]+(?:\.[a-f\d_p-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
    "operator": {
      pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*\.|\.[@&]|\.\.<|\.\.(?!\.)|--|\+\+|&&|\|\||\*\*=?|->|>>>?=?|<<=?|<=>?|[%&|^!=<>/*+-]=?)/,
      lookbehind: true
    },
    "spock-block": /\b(?:and|cleanup|expect|given|setup|[tw]hen|where):/,
    "punctuation": /\.+|[()[\]{},:;$]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/haml.js
  var haml = languages.haml = {
    // Multiline stuff should appear before the rest
    "multiline-comment": {
      pattern: /(^[ 	]*)(?:\/|-#).*(?:$\s*?\n\1[ 	]+\S.*)*/m,
      lookbehind: true,
      alias: "comment"
    },
    "multiline-code": {
      pattern: /(^([ 	]*)(?:[~-]|[&!]?=)).*(?:,[ 	]*(?:\n\2[ 	].*,[ 	]*)*(?:\n\2[ 	].+)|\|[ 	]*(?:\n\2[ 	].*\|[ 	]*)*)/m,
      lookbehind: true,
      inside: "ruby"
    }
  };
  var filter_pattern = "(^[ 	]*):<0>(?:$\\s*?\n\\1[ 	]+\\S.*)+";
  [
    "css",
    "coffee",
    "erb",
    "javascript",
    "less",
    "markdown",
    "ruby",
    "scss",
    "textile"
  ].forEach((filter) => {
    var language2 = filter == "coffee" ? "coffeescript" : filter;
    haml["filter-" + filter] = {
      pattern: re(filter_pattern, [filter], "m"),
      lookbehind: true,
      inside: {
        "filter-name": {
          pattern: /^:.+/,
          alias: "symbol"
        },
        "text": {
          pattern: /[^]+/,
          alias: "language-" + language2,
          inside: language2
        }
      }
    };
  });
  Object.assign(haml, {
    "filter": {
      pattern: re(filter_pattern, ["[\\w-]+"], "m"),
      lookbehind: true,
      inside: {
        "filter-name": {
          pattern: /^:.+/,
          alias: "symbol"
        }
      }
    },
    "markup": {
      pattern: /(^[ 	]*)<.+/m,
      lookbehind: true,
      inside: "markup"
    },
    "doctype": {
      pattern: /(^[ 	]*)!!!(?: .+)?/m,
      lookbehind: true
    },
    "tag": {
      // Allows for one nested group of braces
      pattern: /(^[ 	]*)[%.#][\w#.-]*[\w-](?:\([^)]*\)|\{(?:[^{}]|\{[^}]*\})*\}|\[[^\]]*\])*[<>/]*/m,
      lookbehind: true,
      inside: {
        "attributes": [
          {
            // Lookbehind tries to prevent interpolations from breaking it all
            // Allows for one nested group of braces
            pattern: /(^|[^#])\{(?:[^{}]|\{[^}]*\})*\}/,
            lookbehind: true,
            inside: "ruby"
          },
          {
            pattern: /\([^)]+\)/,
            inside: {
              "attr-value": {
                pattern: /(=\s*)(?:"(?:\\.|[^\\\n"])*"|[^)\s]+)/,
                lookbehind: true
              },
              "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
              "punctuation": /[=(),]/
            }
          },
          {
            pattern: /\[[^\]]+\]/,
            inside: "ruby"
          }
        ],
        "punctuation": /<|>/
      }
    },
    "code": {
      pattern: /(^[ 	]*(?:[~-]|[&!]?=)).+/m,
      lookbehind: true,
      inside: "ruby"
    },
    // Interpolations in plain text
    "interpolation": {
      pattern: /#\{[^}]+\}/,
      inside: {
        "delimiter": {
          pattern: /^#\{|\}$/,
          alias: "punctuation"
        },
        "ruby": {
          pattern: /[^]+/,
          inside: "ruby"
        }
      }
    },
    "punctuation": {
      pattern: /(^[ 	]*)[~=&!-]+/m,
      lookbehind: true
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/handlebars.js
  languages.mustache = languages.hbs = languages.handlebars = {
    "handlebars": {
      pattern: /\{\{(?:\{[^]+?\}|[^]+?)\}\}/,
      alias: "language-handlebars",
      inside: {
        "comment": /\{\{![^]*?\}\}/,
        "delimiter": {
          pattern: /^\{\{+|\}\}+$/,
          alias: "punctuation"
        },
        "string": /(["'])(?:\\.|(?!\1)[^\\\n])*\1/,
        "number": /\b0x[a-fA-F\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
        "boolean": boolean,
        "block": {
          pattern: /^(\s*(?:~\s*)?)[#/]\S+?(?=\s|~?\s*$)/,
          lookbehind: true,
          alias: "keyword"
        },
        "brackets": {
          pattern: /\[[^\]]+\]/,
          inside: {
            punctuation: /[[\]]/,
            variable: /[^]+/
          }
        },
        "punctuation": /[%&|^!=<>/*+#"'()[\]{}.,:;@\\`~]/,
        "variable": /\S+/
      }
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/haskell.js
  languages.hs = languages.haskell = {
    "comment": {
      pattern: /(^|[^.#$?@~:\\%&|^!=<>/*+-])(?:--(?![.#$?@~:\\%&|^!=<>/*+-]).*|\{-[^]*?-\})/,
      lookbehind: true
    },
    "char": {
      pattern: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|ACK|[BD]EL|BS|CAN|CR|DC[1-4]|DLE|EM|ENQ|EOT|ESC|ET[BX]|FF|FS|GS|HT|LF|NAK|NUL|RS|SI|SOH?|SP|STX|SUB|SYN|US|VT|\d+|o[0-7]+|x[a-fA-F\d]+))'/,
      alias: "string"
    },
    "string": {
      pattern: /"(?:[^\\"]|\\(?:\S|\s+\\))*"/g,
      greedy: true
    },
    "keyword": /\b(?:case|class|data|deriving|do|else|if|in|infix[lr]|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    "import-statement": {
      // The imported or hidden names are not included in this import
      // statement. This is because we want to highlight those exactly like
      // we do for the names in the program.
      pattern: /(^[ 	]*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
      lookbehind: true,
      inside: {
        "keyword": /\b(?:as|hiding|import|qualified)\b/,
        "punctuation": /\./
      }
    },
    // These are builtin variables only. Constructors are highlighted later as a constant.
    "builtin": /\b(?:abs|a?cosh?|all|an[dy]|appendFile|approxRational|asTypeOf|a?sinh?|atan[2h]?|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|[ft]ail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|fold[lr]1?|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|ma[px]|mapM|mapM_?|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|ord?|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read(?:s?|Dec|File|Float|Hex|IO|Int|List|LitChar|Ln|Oct|Paren|Signed|sPrec)|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scan[lr]1?|seq|sequence_?|show(?:s|Char|Int|List|LitChar|Paren|Signed|String|sPrec)?|significand|signum|snd|sort|span|splitAt|sqrt|subtract|succ|sum|take|takeWhile|tanh?|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip3?|userError|words|writeFile|zip3?|zipWith3?)\b/,
    // decimal integers and floating point numbers | octal integers | hexadecimal integers
    "number": /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[a-f\d]+)\b/i,
    "operator": [
      {
        // infix operator
        pattern: /`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/g,
        greedy: true
      },
      {
        // function composition
        pattern: /(\s)\.(?!\S)/,
        lookbehind: true
      },
      // Most of this is needed because of the meaning of a single '.'.
      // If it stands alone freely, it is the function composition.
      // It may also be a separator between a module name and an identifier => no
      // operator. If it comes together with other special characters it is an
      // operator too.
      //
      // This regex means: /[!#$%*=?&@|~.:<>^\\/+-]+/ without /\./.
      /[#$?@~:\\%&|^!=<>/*+-][.#$?@~:\\%&|^!=<>/*+-]*|\.[.#$?@~:\\%&|^!=<>/*+-]+/
    ],
    // In Haskell, nearly everything is a variable, do not highlight these.
    "hvariable": {
      pattern: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*/,
      inside: {
        "punctuation": /\./
      }
    },
    "constant": {
      pattern: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*/,
      inside: {
        "punctuation": /\./
      }
    },
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/haxe.js
  languages.haxe = {
    "comment": clikeComment(),
    "string-interpolation": {
      pattern: /'(?:\\[^]|[^\\'])*'/g,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /(^|[^\\])\$(?:\w+|\{[^{}]+\})/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{?|\}$/,
              alias: "punctuation"
            },
            "expression": {
              pattern: /[^]+/,
              inside: "haxe"
            }
          }
        },
        "string": /[^]+/
      }
    },
    "string": {
      // Strings can be multi-line
      pattern: /"(?:\\[^]|[^\\"])*"/g,
      greedy: true
    },
    "regex": {
      pattern: /~\/(?:\\.|[^\\\n/])+\/[a-z]*/g,
      greedy: true,
      inside: {
        "regex-flags": /\w+$/,
        "regex-delimiter": /^~\/|\/$/,
        "regex-source": {
          pattern: /[^]+/,
          alias: "language-regex",
          inside: "regex"
        }
      }
    },
    "class-name": [
      {
        pattern: /(\b(?:abstract|class|enum|extends|implements|interface|new|typedef)\s+)[A-Z_]\w*/,
        lookbehind: true
      },
      // based on naming convention
      /\b[A-Z]\w*/
    ],
    "preprocessor": {
      pattern: /#(?:else|elseif|end|if)\b.*/,
      alias: "property"
    },
    "metadata": {
      pattern: /@:?[\w.]+/,
      alias: "symbol"
    },
    "reification": {
      pattern: /\$(?:\w+|(?=\{))/,
      alias: "important"
    },
    // The final look-ahead prevents highlighting of keywords if expressions such as "haxe.macro.Expr"
    "keyword": /\bthis\b|\b(?:abstract|as|break|cas[et]|catch|class|continue|default|do|dynamic|else|enum|extends|extern|final|for|from|function|if|implements|import|in|inline|interface|macro|new|null|operator|overload|override|package|private|public|return|static|super|switch|throw|to|try|typedef|untyped|using|var|while)(?!\.)\b/,
    "boolean": boolean,
    "function": {
      pattern: /\b[a-z_]\w*(?=\s*(?:<[^<>]*>\s*)?\()/gi,
      greedy: true
    },
    "number": clikeNumber,
    "operator": /--|\+\+|&&|\|\||->|=>|(?:<<?|>{1,3}|[%&|^!=/*+-])=?|[?:~]|\.{3}/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/hcl.js
  languages.hcl = {
    "comment": /(?:\/\/|#).*|\/\*[^]*?(?:\*\/|$)/,
    "heredoc": {
      pattern: /<<-?(\w+\b)[^]*?^[ 	]*\1/mg,
      greedy: true,
      alias: "string"
    },
    "keyword": [
      {
        pattern: /(?:data|resource)\s+(?:"(?:\\[^]|[^\\"])*")(?=\s+"[\w-]+"\s+\{)/i,
        inside: {
          "type": {
            pattern: /(resource|data|\s)(?:"(?:\\[^]|[^\\"])*")/i,
            lookbehind: true,
            alias: "variable"
          }
        }
      },
      {
        pattern: /(?:backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[^]|[^\\"])*")\s+(?=\{)/i,
        inside: {
          "type": {
            pattern: /(backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[^]|[^\\"])*")\s+/i,
            lookbehind: true,
            alias: "variable"
          }
        }
      },
      /[\w-]+(?=\s+\{)/
    ],
    "property": [
      /[-\w.]+(?=\s*=(?!=))/,
      /"(?:\\[^]|[^\\"])+"(?=\s*[:=])/
    ],
    "string": {
      pattern: /"(?:\\[^]|[^\\"$]|\$(?:(?=")|\$+(?!\$)|[^"${])|\$\{(?:[^{}"]|"(?:\\[^]|[^\\"])*")*\})*"/g,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /(^|[^$])\$\{(?:[^{}"]|"(?:\\[^]|[^\\"])*")*\}/,
          lookbehind: true,
          inside: {
            "type": {
              pattern: /(\b(?:count|data|local|module|path|self|terraform|var)\b\.)[\w\*]+/i,
              lookbehind: true,
              alias: "variable"
            },
            "keyword": /\b(?:count|data|local|module|path|self|terraform|var)\b/i,
            "function": /\w+(?=\()/,
            "string": {
              pattern: /"(?:\\[^]|[^\\"])*"/g,
              greedy: true
            },
            "number": /\b0x[a-f\d]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
            "punctuation": /[?!=$#%&'()[\]{}.,:;*+/<>@\\^`|~]/
          }
        }
      }
    },
    "number": /\b0x[a-f\d]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
    "boolean": /\b(?:false|true)\b/i,
    "punctuation": /[=[\]{}]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/hlsl.js
  languages.hlsl = extend("c", {
    // Regarding keywords and class names:
    // The list of all keywords was split into 'keyword' and 'class-name' tokens based on whether they are capitalized.
    // https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-keywords
    // https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-reserved-words
    "class-name": [
      languages.c["class-name"],
      /\b(?:AppendStructuredBuffer|BlendState|Buffer|ByteAddressBuffer|CompileShader|ComputeShader|ConsumeStructuredBuffer|DepthStencilState|DepthStencilView|DomainShader|GeometryShader|Hullshader|InputPatch|LineStream|OutputPatch|PixelShader|PointStream|RWBuffer|RWByteAddressBuffer|RWStructuredBuffer|RWTexture(?:[123]D|[12]DArray)|RasterizerState|RenderTargetView|SamplerComparisonState|SamplerState|StructuredBuffer|Texture(?:[123]D|[12]DArray|2DMS|2DMSArray|Cube|CubeArray)|TriangleStream|VertexShader)\b/
    ],
    "keyword": [
      // HLSL keyword
      /\b(?:asm|asm_fragment|auto|break|case|catch|[ct]buffer|centroid|char|class|column_major|compile|compile_fragment|const|const_cast|continue|default|delete|discard|do|dynamic_cast|else|enum|explicit|export|extern|for|friend|fxgroup|goto|groupshared|if|in|inline|inout|interface|line|lineadj|linear|long|matrix|mutable|namespace|new|nointerpolation|noperspective|operator|out|packoffset|pass|pixelfragment|point|precise|private|protected|public|register|reinterpret_cast|return|row_major|sampler?|shared|short|signed|sizeof|[su]norm|stateblock|stateblock_state|static|static_cast|string|struct|switch|technique|technique1[01]|template|texture|this|throw|triangle|triangleadj|try|typedef|typename|uniform|union|unsigned|using|vector|vertexfragment|virtual|void|volatile|while)\b/,
      // scalar, vector, and matrix types
      /\b(?:bool|double|dword|float|half|min(?:10float|12int|16(?:float|u?int))|u?int)(?:[1-4](?:x[1-4])?)?\b/
    ],
    // https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-grammar#floating-point-numbers
    "number": /(?:(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?|\b0x[a-fA-F\d]+)[fFhHlLuU]?\b/,
    "boolean": boolean
  });

  // node_modules/prism-code-editor/dist/prism/languages/hoon.js
  languages.hoon = {
    "comment": /::.*/,
    "string": {
      pattern: /"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'/g,
      greedy: true
    },
    "constant": /%(?:\.[ny]|[\w-]+)/,
    "class-name": /@(?:[a-z\d-]*[a-z\d])?|\*/i,
    "function": /(?:\+[+-]  )?(?:[a-z](?:[a-z\d-]*[a-z\d])?)/,
    "keyword": /\.[+*=?^]|![.:?!=<>]|=[.,:;~?|^<>/*+-]|\?[|.:^<>&~=@!+-]|\|[$_%.:^~*=@?-]|\+[|$+*]|:[_^~*+-]|%[_.:^~*=+]|\^[|.:&~*=?+-]|\$[|_%:<>^&~@=?-]|;[<:;/~*=+]|~[%&|$_?!=<>/+]|--|==/
  };

  // node_modules/prism-code-editor/dist/prism/languages/hpkp.js
  languages.hpkp = {
    "directive": {
      pattern: /\b(?:includesubdomains|max-age|pin-sha256|preload|report-to|report-uri|strict)(?![^\s;=])/i,
      alias: "property"
    },
    "operator": /=/,
    "punctuation": /;/
  };

  // node_modules/prism-code-editor/dist/prism/languages/hsts.js
  languages.hsts = {
    "directive": {
      pattern: /\b(?:includesubdomains|max-age|preload)(?![^\s;=])/i,
      alias: "property"
    },
    "operator": /=/,
    "punctuation": /;/
  };

  // node_modules/prism-code-editor/dist/prism/languages/json.js
  languages.webmanifest = languages.json = {
    "property": {
      pattern: /"(?:\\.|[^\\\n"])*"(?=\s*:)/g,
      greedy: true
    },
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "comment": clikeComment(),
    "number": /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    "operator": /:/,
    "punctuation": /[[\]{},]/,
    "boolean": boolean,
    "null": {
      pattern: /\bnull\b/,
      alias: "keyword"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/http.js
  var headerValueOf = (name2, lang) => ({
    pattern: RegExp("(^(?:" + name2 + "):[ 	]*)\\S[^]*", "i"),
    lookbehind: true,
    alias: lang && "language-" + lang,
    inside: lang
  });
  var http = languages.http = {
    "request-line": {
      pattern: /^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/)?\/\S*\sHTTP\/[\d.]+/m,
      inside: {
        // HTTP Method
        "method": {
          pattern: /^\w+/,
          alias: "property"
        },
        // Request Target e.g. http://example.com, /path/to/file
        "request-target": {
          pattern: /^(\s)[h/]\S*/,
          lookbehind: true,
          alias: "url",
          inside: "uri"
        },
        // HTTP Version
        "http-version": {
          pattern: /(?!^)\S+/,
          alias: "property"
        }
      }
    },
    "response-status": {
      pattern: /^HTTP\/[\d.]+ \d+ .+/m,
      inside: {
        // HTTP Version
        "http-version": {
          pattern: /^\S+/,
          alias: "property"
        },
        // Status Code
        "status-code": {
          pattern: /^( )\d+(?= )/,
          lookbehind: true,
          alias: "number"
        },
        // Reason Phrase
        "reason-phrase": {
          pattern: /(?!^).+/,
          alias: "string"
        }
      }
    }
  };
  [
    "application/javascript",
    "application/json",
    "application/xml",
    "text/xml",
    "text/html",
    "text/css",
    "text/plain"
  ].forEach((contentType) => {
    var lang = contentType.split("/")[1];
    var pattern = contentType[10] && !lang[4] ? "(?:" + contentType + "|\\w+/(?:[\\w.-]+\\+)+" + lang + "(?![\\w.+-]))" : contentType;
    http[contentType.replace("/", "-")] = {
      pattern: RegExp("(content-type:\\s*" + pattern + "(?:;.*)?(?:\n[\\w-].*)*\n)[^ 	\\w-][^]*", "i"),
      lookbehind: true,
      alias: "language-" + lang,
      inside: lang == "json" ? languages.json || "js" : lang
    };
  });
  http.header = {
    pattern: /^[\w-]+:.+(?:\n[ 	].+)*/m,
    inside: {
      "header-value": [
        headerValueOf("Content-Security-Policy", "csp"),
        headerValueOf("Public-Key-Pins(?:-Report-Only)?", "hpkp"),
        headerValueOf("Strict-Transport-Security", "hsts"),
        headerValueOf("[^:]+")
      ],
      "header-name": {
        pattern: /^[^:]+/,
        alias: "keyword"
      },
      "punctuation": /^:/
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/ichigojam.js
  languages.ichigojam = {
    "comment": /(?:\B'|rem).*/i,
    "string": {
      pattern: /"(?:""|[!#$%&'()*,/:;<=>?^\w .+-])*"/g,
      greedy: true
    },
    "number": /\B#[a-f\d]+|\B`[01]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    "keyword": /\b(?:beep|bps|case|clear|cl[kopstv]|cont|copy|else|end|files?|for|gosub|goto|gsb|if|input|kbd|led|let|list|load|locate|lrun|new|next|out|play|poke|print|pwm|rem|renum|reset|return|right|r[tu]n|save|scroll|sleep|srnd|st[eo]p|sub|tempo|then|to|uart|video|wait)(?:\$|\b)/i,
    "function": /\b(?:abs|ana|asc|b?in|btn|dec|[er]nd|free|help|hex|i2c[rw]|inkey|len|line|s[ct]r|sound|tick|usr|[vz]er|v?peek)(?:\$|\b)/i,
    "label": /\B@\S+/,
    "operator": /<>|<=|>=|&&|\|\||[~&|^!=<>/*+-]|\b(?:and|not|or)\b/i,
    "punctuation": /[()[\],:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/icon.js
  languages.icon = {
    "comment": /#.*/,
    "string": {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\n_]|_(?!\1)[^])*\1/g,
      greedy: true
    },
    "number": /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
    "builtin-keyword": {
      pattern: /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|[lu]case|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|version)\b/,
      alias: "variable"
    },
    "directive": {
      pattern: /\$\w+/,
      alias: "builtin"
    },
    "keyword": /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
    "function": /\b(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
    "operator": /[+-]:(?!=)|(?:[/?@^%&]|\+\+?|--?|~?==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:=?:?|[!.\\|~]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/icu-message-format.js
  var stringPattern = /'[{}:=,](?:[^']|'')*'(?!')/g;
  var escape2 = {
    pattern: /''/g,
    greedy: true,
    alias: "operator"
  };
  var string6 = {
    pattern: stringPattern,
    greedy: true,
    inside: {
      "escape": escape2
    }
  };
  var message = {
    pattern: /(?!^)[^]+(?=.)/
  };
  var choiceStyleInside = {
    "punctuation": /\|/,
    "range": {
      pattern: /^(\s*)[+-]?(?:\d+(?:\.\d*)?|∞)\s*[<#≤]/,
      lookbehind: true,
      inside: {
        "operator": /[<#≤]/,
        "number": /\S+/
      }
    }
  };
  var argumentSource = nested(
    replace("\\{(?:[^{}']|'(?![{},'])|''|<0>|<self>)*\\}", [stringPattern.source]),
    3
  );
  var nestedMessage = {
    pattern: RegExp(argumentSource),
    inside: {
      "message": message,
      "message-delimiter": {
        pattern: /./,
        alias: "punctuation"
      }
    }
  };
  choiceStyleInside[rest] = message.inside = languages["icu-message-format"] = {
    "argument": {
      pattern: RegExp(argumentSource, "g"),
      greedy: true,
      inside: {
        "content": {
          pattern: /(?!^)[^]+(?=.)/,
          inside: {
            "argument-name": {
              pattern: /^(\s*)[^{}:=,\s]+/,
              lookbehind: true
            },
            "choice-style": {
              // https://unicode-org.github.io/icu-docs/apidoc/released/icu4c/classicu_1_1ChoiceFormat.html#details
              pattern: /^(\s*,\s*choice\s*,\s*)\S(?:[^]*\S)?/,
              lookbehind: true,
              inside: choiceStyleInside
            },
            "plural-style": {
              // https://unicode-org.github.io/icu-docs/apidoc/released/icu4j/com/ibm/icu/text/PluralFormat.html#:~:text=Patterns%20and%20Their%20Interpretation
              pattern: /^(\s*,\s*(?:plural|selectordinal)\s*,\s*)\S(?:[^]*\S)?/,
              lookbehind: true,
              inside: {
                "offset": /^offset:\s*\d+/,
                "nested-message": nestedMessage,
                "selector": {
                  pattern: /=\d+|[^{}:=,\s]+/,
                  inside: {
                    "keyword": /^(?:few|many|one|other|two|zero)$/
                  }
                }
              }
            },
            "select-style": {
              // https://unicode-org.github.io/icu-docs/apidoc/released/icu4j/com/ibm/icu/text/SelectFormat.html#:~:text=Patterns%20and%20Their%20Interpretation
              pattern: /^(\s*,\s*select\s*,\s*)\S(?:[^]*\S)?/,
              lookbehind: true,
              inside: {
                "nested-message": nestedMessage,
                "selector": {
                  pattern: /[^{}:=,\s]+/,
                  inside: {
                    "keyword": /^other$/
                  }
                }
              }
            },
            "keyword": /\b(?:choice|plural|select|selectordinal)\b/,
            "arg-type": {
              pattern: /\b(?:date|duration|number|ordinal|spellout|time)\b/,
              alias: "keyword"
            },
            "arg-skeleton": {
              pattern: /(,\s*)::[^{}:=,\s]+/,
              lookbehind: true
            },
            "arg-style": {
              pattern: /(,\s*)(?:currency|full|integer|long|medium|percent|short)(?=\s*$)/,
              lookbehind: true
            },
            "arg-style-text": {
              pattern: RegExp("(^\\s*,\\s*(?!\\s))" + nested("(?:[^{}']|'[^']*'|\\{(?:<self>)?\\})+", 3) + "$"),
              lookbehind: true,
              alias: "string"
            },
            "punctuation": /,/
          }
        },
        "argument-delimiter": {
          pattern: /./,
          alias: "operator"
        }
      }
    },
    "escape": escape2,
    "string": string6
  };

  // node_modules/prism-code-editor/dist/prism/languages/idris.js
  insertBefore(
    languages.idr = languages.idris = extend("hs", {
      "comment": /(?:(?:--|\|\|\|).*$|\{-[^]*?-\})/m,
      "keyword": /\b(?:Type|case|class|codata|constructor|corecord|data|do|dsl|else|export|if|implementation|implicit|import|impossible|in|infix[lr]?|instance|interface|let|module|mutual|namespace|of|parameters|partial|postulate|private|proof|public|quoteGoal|record|rewrite|syntax|then|total|using|where|with)\b/,
      "builtin": void 0
    }),
    "keyword",
    {
      "import-statement": {
        pattern: /(^\s*import\s+)(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*/m,
        lookbehind: true,
        inside: {
          "punctuation": /\./
        }
      }
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/iecst.js
  languages.iecst = {
    "comment": /\/\/.*|\/\*[^]*?(?:\*\/|$)|\(\*[^]*?(?:\*\)|$)|\{[^}]*}?/g,
    "string": clikeString(),
    "keyword": [
      /\b(?:end_)?(?:program|configuration|interface|function_block|function|action|transition|type|struct|(?:initial_)?step|namespace|library|channel|folder|resource|var_(?:access|config|external|global|input|in_out|output|temp)|var|method|property)\b/i,
      /\b(?:AT|BY|(?:END_)?(?:CASE|FOR|IF|REPEAT|WHILE)|CONSTANT|CONTINUE|DO|ELSE|ELSIF|EXIT|EXTENDS|FROM|[GS]ET|GOTO|IMPLEMENTS|JMP|NON_RETAIN|OF|PRIVATE|PROTECTED|PUBLIC|RETAIN|RETURN|TASK|THEN|TO|UNTIL|USING|WITH|__CATCH|__ENDTRY|__FINALLY|__TRY)\b/
    ],
    "class-name": /\b(?:ANY|ARRAY|BOOL|BYTE|U?(?:D|L|S)?INT|(?:D|L)?WORD|DATE(?:_AND_TIME)?|DT|L?REAL|POINTER|STRING|TIME(?:_OF_DAY)?|TOD)\b/,
    "address": {
      pattern: /%[IQM][XBWDL][\d.]*|%[IQ][\d.]*/,
      alias: "symbol"
    },
    "number": /\b(?:16#[a-f\d]+|2#[01_]+|0x[a-f\d]+)\b|\b(?:dt?|t|tod)#[\d_shmd:]*|\b[a-z]*#[\d.,_]*|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    "boolean": /\b(?:FALSE|TRUE|NULL)\b/,
    "operator": /S?R?:?=>?|&&|\*\*|<>|<=|>=|[:#&^<>/*+-]|\b(?:AND|EQ|EXPT|[GL][ET]|MOD|NE|NOT|X?OR)\b/,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "punctuation": /[()[\].,;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/ignore.js
  languages.npmignore = languages.hgignore = languages.gitignore = languages.ignore = {
    // https://git-scm.com/docs/gitignore
    "comment": /^#.*/m,
    "entry": {
      pattern: /\S(?:.*(?:(?:\\ )|\S))?/,
      alias: "string",
      inside: {
        "operator": /^!|\*\*?|\?/,
        "regex": {
          pattern: /(^|[^\\])\[[^[\]]*\]/,
          lookbehind: true
        },
        "punctuation": /\//
      }
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/inform7.js
  var substitutionInside = {
    "delimiter": {
      pattern: /[[\]]/,
      alias: "punctuation"
    }
  };
  var inform7 = languages.inform7 = {
    "comment": /\[[^[\]]+\]/,
    "string": {
      pattern: /"[^"]*"/g,
      greedy: true,
      inside: {
        "substitution": {
          pattern: /\[[^[\]]+\]/,
          inside: substitutionInside
        }
      }
    },
    "title": {
      pattern: /^[ 	]*(?:book|chapter|part(?! of)|section|table|volume)\b.+/im,
      alias: "important"
    },
    "number": {
      pattern: /(^|[^-])(?:\b\d+(?:\.\d+)?(?:\^\d+)?(?:(?!\d)\w+)?|\b(?:eight|eleven|five|four|nine|one|seven|six|ten|three|twelve|two))\b(?!-)/i,
      lookbehind: true
    },
    "verb": {
      pattern: /(^|[^-])\b(?:answering|applying to|are|asking|attacking|being|be|[bt]urning|buying|called|carries|carry(?! out)|carrying|climbing|closing|consulting|[cp]utting|drinking|dropping|eating|entering|examining|exiting|[gs]etting|giving|going|has|have|[hw]aving|implies|imply|inserting|is|jumping|kissing|listening|locking|looking|opening|pulling|pushing|(?:enclos|incorporat|provid|relat)(?:es?|ing)|removing|searching|showing|singing|sleeping|smelling|squeezing|swearing|switching|[tw]aking|tasting|telling|thinking|throwing|touching|tying|varies|varying|vary|waiting|(?:conceal|contain|hold|mean|see|support|unlock|wear)(?:ing|s)?)\b(?!-)/i,
      lookbehind: true,
      alias: "operator"
    },
    "keyword": {
      pattern: /(^|[^-])\b(?:after|before|carry out|check|continue the action|definition(?= *:)|do nothing|else|end (?:if|the story|unless)|every turn|if|include|instead(?: of)?|let|move|now?|otherwise|repeat|report|resume the story|rule for|running through|saying|say|stop the action|test|trying|try|understand|unless|use|when|while|yes)\b(?!-)/i,
      lookbehind: true
    },
    "property": {
      pattern: /(^|[^-])\b(?:adjacent(?! to)|carried|closed|concealed|contained|dark|described|edible|empty|enclosed|enterable|even|female|fixed in place|full|handled|held|improper-named|incorporated|inedible|invisible|lighted|lit|lockable|locked|male|marked for listing|mentioned|negative|neuter|non-(?:empty|full|recurring)|odd|opaque|open(?:able)?|plural-named|portable|positive|privately-named|proper-named|provided|publically-named|pushable between rooms|recurring|related|rubbing|scenery|seen|singular-named|supported|swinging|switch(?:able|ed off|ed on|ed)|touchable|touched|transparent|unconcealed|undescribed|unlit|unlocked|unmarked for listing|unmentioned|unopenable|untouchable|unvisited|variable|visible|visited|wearable|worn)\b(?!-)/i,
      lookbehind: true,
      alias: "symbol"
    },
    "position": {
      pattern: /(^|[^-])\b(?:above|adjacent to|back side of|below|between|down|east|everywhere|front side|here|in|inside(?: from)?|nowhere|on top of|on|other side|outside(?: from)?|parts? of|regionally in|(?:north|south)(?:east|west)?|through|up|west|within)\b(?!-)/i,
      lookbehind: true,
      alias: "keyword"
    },
    "type": {
      pattern: /(^|[^-])\b(?:actions?|activit(?:ies|y)|actors?|animals?|backdrops?|containers?|devices?|directions?|doors?|holders?|kinds?|lists?|m[ae]n|nobody|nothing|nouns?|numbers?|objects?|people|persons?|player(?:'s holdall)?|regions?|relations?|rooms?|rule(?:book)?s?|scenes?|someone|something|supporters?|tables?|texts?|things?|time|vehicles?|wom[ae]n)\b(?!-)/i,
      lookbehind: true,
      alias: "variable"
    },
    "punctuation": /[(){}.,:;]/
  };
  Object.assign(substitutionInside, inform7, {
    "text": {
      pattern: /\S(?:[^]*\S)?/,
      alias: "comment"
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/ini.js
  languages.ini = {
    /**
     * The component mimics the behavior of the Win32 API parser.
     *
     * @see {@link https://github.com/PrismJS/prism/issues/2775#issuecomment-787477723}
     */
    "comment": {
      pattern: /(^[ \f	\v]*)[#;].*/m,
      lookbehind: true
    },
    "section": {
      pattern: /(^[ \f	\v]*)\[[^\n\]]*\]?/m,
      lookbehind: true,
      inside: {
        "section-name": {
          pattern: /(^\[[ \f	\v]*)[^ \f	\v\]]+(?:[ \f	\v]+[^ \f	\v\]]+)*/,
          lookbehind: true,
          alias: "selector"
        },
        "punctuation": /[[\]]/
      }
    },
    "key": {
      pattern: /(^[ \f	\v]*)[^ \f\n	\v=]+(?:[ \f	\v]+[^ \f\n	\v=]+)*(?=[ \f	\v]*=)/m,
      lookbehind: true,
      alias: "attr-name"
    },
    "value": {
      pattern: /(=[ \f	\v]*)[^ \f\n	\v]+(?:[ \f	\v]+[^ \f\n	\v]+)*/,
      lookbehind: true,
      alias: "attr-value",
      inside: {
        "inner-value": {
          pattern: /^(["']).+(?=\1$)/,
          lookbehind: true
        }
      }
    },
    "punctuation": /=/
  };

  // node_modules/prism-code-editor/dist/prism/languages/io.js
  languages.io = {
    "comment": {
      pattern: /\/\*[^]*?(?:\*\/|$)|\/\/.*|#.*/g,
      greedy: true
    },
    "triple-quoted-string": {
      pattern: /"""(?:\\[^]|[^\\])*?"""/g,
      greedy: true,
      alias: "string"
    },
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "keyword": /\b(?:activate|activeCoroCount|asString|block|break|call|catch|clone|collectGarbage|compileString|continue|do|doFile|doMessage|doString|else|elseif|exit|for|foreach|forward|getEnvironmentVariable|[gs]etSlot|hasSlot|if|ifFalse|ifNil|ifNilEval|ifTrue|isActive|isNil|isResumable|list|message|method|parent|pass|pause|perform|performWithArgList|print|println|proto|raise|raiseResumable|removeSlot|resend|resume|schedulerSleepSeconds|self|sender|setSchedulerSleepSeconds|shallowCopy|slotNames|super|system|then|thisBlock|thisContext|try|type|uniqueId|updateSlot|wait|while|write|yield)\b/,
    "builtin": /\b(?:Array|AudioDevice|AudioMixer|BigNum|Block|Box|Buffer|CFunction|CGI|Color|Curses|DBM|DNSResolver|DOConnection|DOProxy|DOServer|Date|Directory|Duration|DynLib|Error|Exception|FFT|File|Fnmatch|Font|Future|GLE?|GLScissor|GLUCylinder|GLUQuadric|GLUSphere|GLUT?|Host|Image|Importer|LinkList|List|Lobby|Locals|MD5|MP3Decoder|MP3Encoder|Map|Message|Movie|Notification|Number|Object|OpenGL|Point|Protos|Random|Regex|SGML|SGMLElement|SGMLParser|SQLite|Sequence|Server|ShowMessage|SleepyCat|SleepyCatCursor|Socket|SocketManager|Sound|Soup|Store|String|Tree|UDPSender|UPDReceiver|URL|User|Warning|WeakLink)\b/,
    "boolean": /\b(?:false|true|nil)\b/,
    "number": /\b0x[a-f\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e-?\d+)?/i,
    "operator": /--|\+\+|\*\*|\/\/|\|\||&&|::?=|>>=?|<<=?|[!~^]=|[%&|=<>/*+-]=?|\b(?:and|not|or|return)\b|@@?|\?\??|\.\./,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/j.js
  languages.j = {
    "comment": /\bNB\..*/,
    "string": {
      pattern: /'(?:''|[^\n'])*'/g,
      greedy: true
    },
    "keyword": /\b(?:(?:CR|LF|adverb|conjunction|def|define|dyad|monad|noun|verb)\b|(?:assert|break|catch[dt]?|continue|do|else|elseif|end|f?case|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/,
    "verb": {
      // Negative look-ahead prevents bad highlighting
      // of ^: ;. =. =: !. !:
      pattern: /(?!\^:|;\.|[!=][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[!=\]]|[<>*%$|,#+-][.:]?|[?^]\.?|[;\[]:?|[~}"i][.:]|[ACeEIjLor]\.|(?:[_/\\qsux]|_?\d):)/,
      alias: "keyword"
    },
    "number": /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:ad|ar|[ejpx])_?\d+(?:\.\d+)?)*(?:b_?[a-z\d]+(?:\.[a-z\d]+)?)?|_\b(?!\.))/,
    "adverb": {
      pattern: /[~}]|[/\\]\.?|[bfM]\.|t[.:]/,
      alias: "builtin"
    },
    "operator": /[=a][.:]|_\./,
    "conjunction": {
      pattern: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|`:?|[\^LS]:|"/,
      alias: "variable"
    },
    "punctuation": /[()]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/java.js
  var keywords4 = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|opens?|package|permits|private|protected|provides|public|record(?!\s*[()[\]{}%~.,:;?%&|^=<>/*+-])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throws?|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
  var classNamePrefix = "(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*";
  var namespace = {
    pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
    inside: {
      "punctuation": /\./
    }
  };
  var classInside = {
    "namespace": namespace,
    "punctuation": /\./
  };
  var className3 = {
    pattern: RegExp(`(^|[^\\w.])${classNamePrefix}[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b`),
    lookbehind: true,
    inside: classInside
  };
  languages.java = {
    "doc-comment": {
      pattern: /\/\*\*(?!\/)[^]*?(?:\*\/|$)/g,
      greedy: true,
      alias: "comment",
      inside: "javadoc"
    },
    "comment": clikeComment(),
    "triple-quoted-string": {
      // http://openjdk.java.net/jeps/355#Description
      pattern: /"""[ 	]*\n(?:\\.|[^\\])*?"""/g,
      greedy: true,
      alias: "string"
    },
    "char": {
      pattern: /'(?:\\.|[^\\\n']){1,6}'/g,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^\\\n"])*"/g,
      lookbehind: true,
      greedy: true
    },
    "annotation": {
      pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
      lookbehind: true,
      alias: "punctuation"
    },
    "generics": {
      pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
      inside: {
        "class-name": className3,
        "keyword": keywords4,
        "punctuation": /[().,:<>]/,
        "operator": /[?&|]/
      }
    },
    "import": [
      {
        pattern: RegExp(`(\\bimport\\s+)${classNamePrefix}(?:[A-Z]\\w*|\\*)(?=\\s*;)`),
        lookbehind: true,
        inside: {
          "namespace": namespace,
          "punctuation": /\./,
          "operator": /\*/,
          "class-name": /\w+/
        }
      },
      {
        pattern: RegExp(`(\\bimport\\s+static\\s+)${classNamePrefix}(?:\\w+|\\*)(?=\\s*;)`),
        lookbehind: true,
        alias: "static",
        inside: {
          "namespace": namespace,
          "static": /\b\w+$/,
          "punctuation": /\./,
          "operator": /\*/,
          "class-name": /\w+/
        }
      }
    ],
    "namespace": {
      pattern: RegExp(
        `(\\b(?:exports|import(?:\\s+static)?|module|opens?|package|provides|requires|to|transitive|uses|with)\\s+)(?!${keywords4.source})[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?`
      ),
      lookbehind: true,
      inside: {
        "punctuation": /\./
      }
    },
    "class-name": [
      className3,
      {
        // variables, parameters, and constructor references
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(`(^|[^\\w.])${classNamePrefix}[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()]|\\s*(?:\\[[\\s,]*\\]\\s*)?::\\s*new\\b)`),
        lookbehind: true,
        inside: classInside
      },
      {
        // class names based on keyword
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(`(\\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\\s+)${classNamePrefix}[A-Z]\\w*\\b`),
        lookbehind: true,
        inside: classInside
      }
    ],
    "keyword": keywords4,
    "boolean": boolean,
    "function": {
      pattern: /\b\w+(?=\()|(::\s*)[a-z_]\w*/,
      lookbehind: true
    },
    "number": /\b0b[01][01_]*l?\b|\b0x(?:\.[a-f\d_p+-]+|[a-f\d_]+(?:\.[a-f\d_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    "constant": /\b[A-Z][A-Z_\d]+\b/,
    "operator": {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[%&|^!=<>/*+-]=?)/m,
      lookbehind: true
    },
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/javadoclike.js
  languages.javadoclike = {
    "parameter": {
      pattern: /(^[ 	]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m,
      lookbehind: true
    },
    "keyword": {
      // keywords are the first word in a line preceded be an `@` or surrounded by curly braces.
      // @word, {@word}
      pattern: /(^[ 	]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
      lookbehind: true
    },
    "punctuation": /[{}]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/javadoc.js
  var codeLinePattern = /(^[ 	]*(?:\*\s*)*)[^\s*].*/m;
  var memberReference = "#\\s*\\w+(?:\\s*\\([^()]*\\))?";
  var reference = replace("(?:\\b[a-zA-Z]\\w+\\s*\\.\\s*)*\\b[A-Z]\\w*(?:\\s*<0>)?|<0>", [memberReference]);
  var java = languages.java;
  var markup2 = languages.markup;
  var javadoc = languages.javadoc = clone2(languages.javadoclike);
  insertBefore(javadoc, "keyword", {
    "reference": {
      pattern: RegExp(`(@(?:exception|link|linkplain|see|throws|value)\\s+(?:\\*\\s*)?)(?:${reference})`),
      lookbehind: true,
      inside: {
        "function": {
          pattern: /(#\s*)\w+(?=\s*\()/,
          lookbehind: true
        },
        "field": {
          pattern: /(#\s*)\w+/,
          lookbehind: true
        },
        "namespace": {
          pattern: /\b(?:[a-z]\w*\s*\.\s*)+/,
          inside: {
            "punctuation": /\./
          }
        },
        "class-name": /\b[A-Z]\w*/,
        "keyword": java.keyword,
        "punctuation": /[()[\].,#]/
      }
    },
    "class-name": {
      // @param <T> the first generic type parameter
      pattern: /(@param\s+)<[A-Z]\w*>/,
      lookbehind: true,
      inside: {
        "punctuation": /[.<>]/
      }
    },
    "code-section": [
      {
        pattern: /(\{@code\s+(?!\s))(?:[^\s{}]|\s+(?![\s}])|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\})*\})+(?=\s*\})/,
        lookbehind: true,
        inside: {
          "code": {
            // there can't be any HTML inside of {@code} tags
            pattern: codeLinePattern,
            lookbehind: true,
            alias: "language-java",
            inside: java
          }
        }
      },
      {
        pattern: /(<(code|pre|tt)>(?!<code>)\s*)\S(?:\S|\s+\S)*?(?=\s*<\/\2>)/,
        lookbehind: true,
        inside: {
          "line": {
            pattern: codeLinePattern,
            lookbehind: true,
            inside: {
              // highlight HTML tags and entities
              "tag": markup2.tag,
              "entity": markup2.entity,
              "code": {
                // everything else is Java code
                pattern: /.+/,
                alias: "language-java",
                inside: java
              }
            }
          }
        }
      }
    ],
    "tag": markup2.tag,
    "entity": markup2.entity
  });

  // node_modules/prism-code-editor/dist/prism/languages/javastacktrace.js
  languages.javastacktrace = {
    // java.sql.SQLException: Violation of unique constraint MY_ENTITY_UK_1: duplicate value(s) for column(s) MY_COLUMN in statement [...]
    // Caused by: java.sql.SQLException: Violation of unique constraint MY_ENTITY_UK_1: duplicate value(s) for column(s) MY_COLUMN in statement [...]
    // Caused by: com.example.myproject.MyProjectServletException
    // Caused by: MidLevelException: LowLevelException
    // Suppressed: Resource$CloseFailException: Resource ID = 0
    "summary": {
      pattern: /^([ 	]*)(?:(?:Caused by:|Suppressed:|Exception in thread "[^"]*")[ 	]+)?[$\w.]+(?::.*)?$/m,
      lookbehind: true,
      inside: {
        "keyword": {
          pattern: /^([ 	]*)(?:(?:Caused by|Suppressed)(?=:)|Exception in thread)/m,
          lookbehind: true
        },
        // the current thread if the summary starts with 'Exception in thread'
        "string": {
          pattern: /^(\s*)"[^"]*"/,
          lookbehind: true
        },
        "exceptions": {
          pattern: /^(:?\s*)[$\w.]+(?=:|$)/,
          lookbehind: true,
          inside: {
            "class-name": /[$\w]+$/,
            "namespace": /\b[a-z]\w*\b/,
            "punctuation": /\./
          }
        },
        "message": {
          pattern: /(:\s*)\S.*/,
          lookbehind: true,
          alias: "string"
        },
        "punctuation": /:/
      }
    },
    // at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1166)
    // at org.hsqldb.jdbc.Util.throwError(Unknown Source) here could be some notes
    // at java.base/java.lang.Class.forName0(Native Method)
    // at Util.<init>(Unknown Source)
    // at com.foo.loader/foo@9.0/com.foo.Main.run(Main.java:101)
    // at com.foo.loader//com.foo.bar.App.run(App.java:12)
    // at acme@2.1/org.acme.Lib.test(Lib.java:80)
    // at MyClass.mash(MyClass.java:9)
    //
    // More information:
    // https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/StackTraceElement.html#toString()
    //
    // A valid Java module name is defined as:
    //   "A module name consists of one or more Java identifiers (§3.8) separated by "." tokens."
    // https://docs.oracle.com/javase/specs/jls/se9/html/jls-6.html#jls-ModuleName
    //
    // A Java module version is defined by this class:
    // https://docs.oracle.com/javase/9/docs/api/java/lang/module/ModuleDescriptor.Version.html
    // This is the implementation of the `parse` method in JDK13:
    // https://github.com/matcdac/jdk/blob/2305df71d1b7710266ae0956d73927a225132c0f/src/java.base/share/classes/java/lang/module/ModuleDescriptor.java#L1108
    // However, to keep this simple, a version will be matched by the pattern /@[$\w.+-]*/.
    "stack-frame": {
      pattern: /^([ 	]*)at (?:[$\w./]|@[$\w.+-]*\/)+(?:<init>)?\([^()]*\)/m,
      lookbehind: true,
      inside: {
        "keyword": {
          pattern: /^(\s*)at(?= )/,
          lookbehind: true
        },
        "source": [
          // (Main.java:15)
          // (Main.scala:15)
          {
            pattern: /(\()\w+\.\w+:\d+(?=\))/,
            lookbehind: true,
            inside: {
              "file": /^\w+\.\w+/,
              "punctuation": /:/,
              "line-number": {
                pattern: /\b\d+\b/,
                alias: "number"
              }
            }
          },
          // (Unknown Source)
          // (Native Method)
          // (...something...)
          {
            pattern: /(\()[^()]+(?=\))/,
            lookbehind: true,
            inside: {
              "keyword": /^(?:Native Method|Unknown Source)$/
            }
          }
        ],
        "class-name": /[$\w]+(?=\.(?:<init>|[$\w]+)\()/,
        "function": /(?:<init>|[$\w]+)(?=\()/,
        "class-loader": {
          pattern: /(\s)[a-z]\w*(?:\.[a-z]\w*)*(?=\/[\w@$.]*\/)/,
          lookbehind: true,
          alias: "namespace",
          inside: {
            "punctuation": /\./
          }
        },
        "module": {
          pattern: /([\s/])[a-z]\w*(?:\.[a-z]\w*)*(?:@[$\w.+-]*)?(?=\/)/,
          lookbehind: true,
          inside: {
            "version": {
              pattern: /(@)[^]+/,
              lookbehind: true,
              alias: "number"
            },
            "punctuation": /[@.]/
          }
        },
        "namespace": {
          pattern: /(?:\b[a-z]\w*\.)+/,
          inside: {
            "punctuation": /\./
          }
        },
        "punctuation": /[()/.]/
      }
    },
    // ... 32 more
    // ... 32 common frames omitted
    "more": {
      pattern: /^([ 	]*)\.{3} \d+ [a-z]+(?: [a-z]+)*/m,
      lookbehind: true,
      inside: {
        "punctuation": /\.{3}/,
        "number": /\d+/,
        "keyword": /\b[a-z]+(?: [a-z]+)*\b/
      }
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/jexl.js
  languages.jexl = {
    "string": /(["'])(?:\\[^]|(?!\1)[^\\])*\1/,
    "transform": {
      pattern: /(\|\s*)[a-zA-Zа-яА-Я_\xc0-\xd6\xd8-\xf6\xf8-\xff$][\wа-яА-Я\xc0-\xd6\xd8-\xf6\xf8-\xff$]*/,
      alias: "function",
      lookbehind: true
    },
    "function": /[a-zA-Zа-яА-Я_\xc0-\xd6\xd8-\xf6\xf8-\xff$][\wа-яА-Я\xc0-\xd6\xd8-\xf6\xf8-\xff$]*\s*(?=\()/,
    "number": /\b\d+(?:\.\d+)?\b|\B\.\d+\b/,
    "operator": /[!<>]=?|&&|==|\|\||\/\/|[?:%|^/*+-]/,
    "boolean": boolean,
    "keyword": /\bin\b/,
    "punctuation": /[()[\]{}.,]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/jolie.js
  languages.jolie = {
    "comment": clikeComment(),
    "string": {
      pattern: /(^|[^\\])"(?:\\[^]|[^\\"])*"/g,
      lookbehind: true,
      greedy: true
    },
    "class-name": {
      pattern: /((?:\b(?:as|courier|embed|in|inputPort|outputPort|service)\b|@)[ 	]*)\w+/,
      lookbehind: true
    },
    "aggregates": {
      pattern: /(\bAggregates\s*:\s*)(?:\w+(?:\s+with\s+\w+)?\s*,\s*)*\w+(?:\s+with\s+\w+)?/,
      lookbehind: true,
      inside: {
        "keyword": /\bwith\b/,
        "class-name": /\w+/,
        "punctuation": /,/
      }
    },
    "redirects": {
      pattern: /(\bRedirects\s*:\s*)(?:\w+\s*=>\s*\w+\s*,\s*)*(?:\w+\s*=>\s*\w+)/,
      lookbehind: true,
      inside: {
        "punctuation": /,/,
        "class-name": /\w+/,
        "operator": /=>/
      }
    },
    "property": /\b(?:Aggregates|[Ii]nterfaces|Java|Javascript|Jolie|[Ll]ocation|OneWay|[Pp]rotocol|Redirects|RequestResponse)\b(?=[ 	]*:)/,
    "keyword": /\b(?:as|cH|comp|concurrent|constants|courier|csets?|default|define|else|embed|embedded|execution|exit|extender|for|foreach|forward|from|global|if|import|in|include|init|inputPort|install|instanceof|interface|is_defined|linkIn|linkOut|main|new|nullProcess|outputPort|over|private|provide|public|scope|sequential|service|single|spawn|synchronized|this|throws?|type|undef|until|while|with)\b/,
    "boolean": boolean,
    "function": /\b[a-z_]\w*(?=[ 	]*[@(])/i,
    "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?l?/i,
    "operator": /--|\+\+|&&|\|\||->|<<|[!=<>*+-]=?|[%|^@/?]/,
    "punctuation": clikePunctuation,
    "builtin": /\b(?:Byte|any|bool|char|double|enum|float|int|length|long|ranges|regex|string|undefined|void)\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/jq.js
  var content = {
    pattern: /[^]+/
  };
  var interpolation6 = "\\\\\\((?:[^()]|\\([^)]*\\))*\\)";
  var string7 = '(^|[^\\\\])"(?:[^\\\\\n"]|\\\\[^\n(]|__)*"'.replace(/__/g, interpolation6);
  var stringInterpolation = {
    "interpolation": {
      pattern: RegExp("((?:^|[^\\\\])(?:\\\\\\\\)*)" + interpolation6),
      lookbehind: true,
      inside: {
        "punctuation": /^\\\(|\)$/,
        "content": content
      }
    }
  };
  content.inside = languages.jq = {
    "comment": /#.*/,
    "property": {
      pattern: RegExp(string7 + "(?=\\s*:(?!:))", "g"),
      lookbehind: true,
      greedy: true,
      inside: stringInterpolation
    },
    "string": {
      pattern: RegExp(string7, "g"),
      lookbehind: true,
      greedy: true,
      inside: stringInterpolation
    },
    "function": {
      pattern: /(\bdef\s+)[a-z_]\w+/i,
      lookbehind: true
    },
    "variable": /\B\$\w+/,
    "property-literal": {
      pattern: /\b[a-z_]\w*(?=\s*:(?!:))/i,
      alias: "property"
    },
    "keyword": /\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\b/,
    "boolean": boolean,
    "number": /(?:\b\d+\.|\B\.)?\b\d+(?:[eE][+-]?\d+)?\b/,
    "operator": [
      {
        pattern: /\|=?/,
        alias: "pipe"
      },
      /\.\.|!=|\?\/\/|\/\/=?|[%=<>/*+-]=?|\?|\b(?:and|not|or)\b/
    ],
    "c-style-function": {
      pattern: /\b[a-z_]\w*(?=\s*\()/i,
      alias: "function"
    },
    "punctuation": /::|[()[\]{},:;]|\.(?=\s*[\[$\w])/,
    "dot": {
      pattern: /\./,
      alias: "important"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/typescript.js
  var className4 = {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/g,
    lookbehind: true,
    greedy: true
  };
  var ts = languages.ts = languages.typescript = extend("js", {
    "class-name": className4
  });
  insertBefore(ts, "operator", {
    "builtin": /\b(?:Array|Function|Promise|any|boolean|never|number|string|symbol|unknown)\b/
  });
  ts.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require)\b|\b(?:asserts|infer|interface|module|namespace|type)\b(?!\s*[^\s{_$a-zA-Z\xa0-\uffff])|\btype(?=\s*\*)/
  );
  delete ts["parameter"];
  delete ts["literal-property"];
  var typeInside2 = className4.inside = Object.assign({}, ts);
  delete typeInside2["class-name"];
  delete typeInside2["maybe-class-name"];
  insertBefore(ts, "function", {
    "decorator": {
      pattern: /@[$\w\xa0-\uffff]+/,
      inside: {
        "at": {
          pattern: /^@/,
          alias: "operator"
        },
        "function": /.+/
      }
    },
    "generic-function": {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\s*<(?:[^<>=]|=[^<]|=?<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/g,
      greedy: true,
      inside: {
        "generic": {
          pattern: /<[^]+/,
          // everything after the first <
          alias: "class-name",
          inside: typeInside2
        },
        "function": /\S+/
      }
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/jsdoc.js
  var javascript = languages.js;
  var type = "\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})+\\}";
  var parameterPrefix = `(@(?:arg|argument|param|property)\\s+(?:${type}\\s+)?)`;
  insertBefore(
    languages.jsdoc = extend("javadoclike", {
      "parameter": {
        // @param {string} foo - foo bar
        pattern: RegExp(parameterPrefix + "(?:(?!\\s)[$\\w\\xa0-\\uffff.])+(?!\\S)"),
        lookbehind: true,
        inside: {
          "punctuation": /\./
        }
      }
    }),
    "keyword",
    {
      "optional-parameter": {
        // @param {string} [baz.foo="bar"] foo bar
        pattern: RegExp(parameterPrefix + "\\[(?:(?!\\s)[$\\w\\xa0-\\uffff.])+(?:=[^[\\]]+)?\\](?!\\S)"),
        lookbehind: true,
        inside: {
          "code": {
            pattern: /(=)[^]+(?=.)/,
            lookbehind: true,
            alias: "language-javascript",
            inside: javascript
          },
          "punctuation": /[=[\]]/,
          "parameter": {
            pattern: /[^]+/,
            inside: {
              "punctuation": /\./
            }
          }
        }
      },
      "class-name": [
        {
          pattern: re("(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\\s+(?:<0>\\s+)?)[A-Z]\\w*(?:\\.[A-Z]\\w*)*", [type]),
          lookbehind: true,
          inside: {
            "punctuation": /\./
          }
        },
        {
          pattern: RegExp("(@[a-z]+\\s+)" + type),
          lookbehind: true,
          inside: {
            "string": javascript.string,
            "number": javascript.number,
            "boolean": javascript.boolean,
            "keyword": languages.ts.keyword,
            "operator": /=>|\.{3}|[&|?:*]/,
            "punctuation": /[()[\]{}.,;<>=]/
          }
        }
      ],
      "example": {
        pattern: /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
        lookbehind: true,
        inside: {
          "code": {
            pattern: /^([ 	]*(?:\*[ 	]*|(?!\*)))\S.*/m,
            lookbehind: true,
            alias: "language-javascript",
            inside: javascript
          }
        }
      }
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/json5.js
  var string8 = clikeString();
  languages.json5 = extend("json", {
    "property": [
      RegExp(string8.pattern.source + "(?=\\s*:)"),
      {
        pattern: /(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*:)/,
        alias: "unquoted"
      }
    ],
    "string": string8,
    "number": /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/
  });

  // node_modules/prism-code-editor/dist/prism/languages/jsonp.js
  insertBefore(languages.jsonp = extend("json", {
    "punctuation": clikePunctuation
  }), "punctuation", {
    "function": /(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*\()/
  });

  // node_modules/prism-code-editor/dist/prism/languages/jsstacktrace.js
  languages.jsstacktrace = {
    "error-message": {
      pattern: /^\S.*/m,
      alias: "string"
    },
    "stack-frame": {
      pattern: /(^[ 	]+)at[ 	].*/m,
      lookbehind: true,
      inside: {
        "not-my-code": {
          pattern: /^at[ 	]+(?!\s)(?:node\.js|<unknown>|.*(?:node_modules|\(<anonymous>\)|\(<unknown>|<anonymous>$|\(internal\/|\(node\.js)).*/m,
          alias: "comment"
        },
        "filename": {
          pattern: /(\bat\s+(?!\s)|\()(?:[a-zA-Z]:)?[^():]+(?=:)/,
          lookbehind: true,
          alias: "url"
        },
        "function": {
          pattern: /(\bat\s+(?:new\s+)?)(?![\d>.])(?:(?!\s)[.$\w\xa0-\uffff<>])+/,
          lookbehind: true,
          inside: {
            "punctuation": /\./
          }
        },
        "punctuation": /[()]/,
        "keyword": /\b(?:at|new)\b/,
        "alias": {
          pattern: /\[(?:as\s+)?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\]/,
          alias: "variable"
        },
        "line-number": {
          pattern: /:\d+(?::\d+)?\b/,
          alias: "number",
          inside: {
            "punctuation": /:/
          }
        }
      }
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/jsx.js
  addJsxTag(languages.js, "jsx");

  // node_modules/prism-code-editor/dist/prism/languages/julia.js
  languages.julia = {
    // support one level of nested comments
    // https://github.com/JuliaLang/julia/pull/6128
    "comment": /#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*/,
    "regex": {
      // https://docs.julialang.org/en/v1/manual/strings/#Regular-Expressions-1
      pattern: /r"(?:\\.|[^\\\n"])*"[imsx]{0,4}/g,
      greedy: true
    },
    "string": {
      // https://docs.julialang.org/en/v1/manual/strings/#String-Basics-1
      // https://docs.julialang.org/en/v1/manual/strings/#non-standard-string-literals-1
      // https://docs.julialang.org/en/v1/manual/running-external-programs/#Running-External-Programs-1
      pattern: /"""[^]+?"""|(?:\b\w+)?"(?:\\.|[^\\\n"])*"|`(?:\\.|[^\\\n`])*`/g,
      greedy: true
    },
    "char": {
      // https://docs.julialang.org/en/v1/manual/strings/#man-characters-1
      pattern: /(^|[^\w'])'(?:\\[^\n][^\n']*|[^\\\n])'/g,
      lookbehind: true,
      greedy: true
    },
    "keyword": /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,
    "boolean": boolean,
    "number": /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[a-f\d]+(?:_[a-f\d]+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[efp][+-]?\d+(?:_\d+)*)?j?/i,
    // https://docs.julialang.org/en/v1/manual/mathematical-operations/
    // https://docs.julialang.org/en/v1/manual/mathematical-operations/#Operator-Precedence-and-Associativity-1
    "operator": /&&|\|\||\/\/|[!=]==|\|>|>>>?=?|<<=?|<:|<\||[\\$÷⊻%&|^!=<>/*+-]=?|[~≠≤≥'√∛]/,
    "punctuation": /::|[()[\]{}.,:;?]/,
    // https://docs.julialang.org/en/v1/base/numbers/#Base.im
    "constant": /\b(?:(?:Inf|NaN)(?:16|32|64)?|im|pi)\b|[πℯ]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/keepalived.js
  languages.keepalived = {
    "comment": /[#!].*/,
    "string": {
      pattern: /(^|[^\\])(["'])(?:\\[^]|(?!\2)[^\\\n])*\2/g,
      lookbehind: true,
      greedy: true
    },
    // support IPv4, IPv6, subnet mask
    "ip": {
      pattern: re(
        "\\b(?:(?:(?:[a-f\\d]{1,4}:){7}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){6}:[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){5}:(?:[a-f\\d]{1,4}:)?[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){4}:(?:[a-f\\d]{1,4}:){0,2}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){3}:(?:[a-f\\d]{1,4}:){0,3}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){2}:(?:[a-f\\d]{1,4}:){0,4}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){6}<0>|(?:[a-f\\d]{1,4}:){0,5}:<0>|::(?:[a-f\\d]{1,4}:){0,5}<0>|[a-f\\d]{1,4}::(?:[a-f\\d]{1,4}:){0,5}[a-f\\d]{1,4}|::(?:[a-f\\d]{1,4}:){0,6}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){1,7}:)(?:/\\d{1,3})?|<0>(?:/\\d\\d?)?)\\b",
        ["(?:(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d))"],
        "i"
      ),
      alias: "number"
    },
    // support *nix / Windows, directory / file
    "path": {
      pattern: /(\s)\/(?:[^\s/]+\/)*[^\s/]*|\b[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]*/,
      lookbehind: true,
      alias: "string"
    },
    "variable": /\$\{?\w+\}?/,
    "email": {
      pattern: /[\w-]+@[\w-]+(?:\.[\w-]{2,3}){1,2}/,
      alias: "string"
    },
    "conditional-configuration": {
      pattern: /@\^?[\w-]+/,
      alias: "variable"
    },
    "operator": /=/,
    "property": /\b(?:BFD_CHECK|DNS_CHECK|FILE_CHECK|HTTP_GET|MISC_CHECK|NAME|PING_CHECK|SCRIPTS|SMTP_CHECK|SSL|SSL_GET|TCP_CHECK|UDP_CHECK|accept|advert_int|alpha|auth_pass|auth_type|authentication|bfd_cpu_affinity|bfd_instance|bfd_no_swap|bfd_priority|bfd_process_name|bfd_rlimit_rttime|bfd_rt_priority|bind_if|bind_port|bindto|ca|certificate|check_unicast_src|checker|checker_(?:|cpu_affinity|log_all_failures|no_swap|priority|rlimit_rttime|rt_priority)|child_wait_time|connect_ip|connect_port|connect_timeout|dbus_service_name|debug|default_interface|delay|delay_before_retry|delay_loop|digest|dont_track_primary|dynamic|dynamic_interfaces|enable_(?:dbus|script_security|sni|snmp_checker|snmp_rfc|snmp_rfcv[23]|snmp_vrrp|traps)|end|fall|fast_recovery|file|flag-[123]|fork_delay|full_command|fwmark|garp_(?:group|interval|lower_prio_delay|lower_prio_repeat|master_delay|master_refresh|master_refresh_repeat|master_repeat)|global_defs|global_tracking|gna_interval|group|ha_suspend|hashed|helo_name|higher_prio_send_advert|hoplimit|http_protocol|hysteresis|idle_tx|include|inhibit_on_failure|init_fail|init_file|instance|interfaces?|interval|ip_family|ipvs_process_name|keepalived.conf|kernel_rx_buf_size|key|linkbeat_interfaces|linkbeat_use_polling|log_all_failures|log_unknown_vrids|lower_prio_no_advert|lthreshold|lvs_(?:flush|flush_onstop|method|netlink_cmd_rcv_bufs|netlink_cmd_rcv_bufs_force|netlink_monitor_rcv_bufs|netlink_monitor_rcv_bufs_force|notify_fifo|notify_fifo_script|sched|sync_daemon)|max_auto_priority|max_hops|mcast_src_ip|mh-fallback|mh-port|min_auto_priority_delay|min_rx|min_tx|misc_dynamic|misc_path|misc_timeout|multiplier|name|namespace_with_ipsets|native_ipv6|neighbor_ip|net_namespace|net_namespace_ipvs|nftables|nftables_counters|nftables_ifindex|nftables_priority|no_accept|no_checker_emails|no_email_faults|nopreempt|notif(?:ication_email|ication_email_from|y|y_backup|y_deleted|y_down|y_fault|y_fifo|y_fifo_script|y_master|y_master_rx_lower_pri|y_priority_changes|y_stop|y_up)|old_unicast_checksum|omega|ops|param_match|passive|password|path|persistence_(?:engine|granularity|timeout)|preempt|preempt_delay|priority|process|process_monitor_rcv_bufs|process_monitor_rcv_bufs_force|process_names?|promote_secondaries|protocol|proxy_arp|proxy_arp_pvlan|quorum|quorum_down|quorum_max|quorum_up|random_seed|real_server|regex|regex_(?:max_offset|min_offset|no_match|options|stack)|reload_repeat|reload_time_file|require_reply|retry|rise|router_id|rs_init_notifies|script|script_user|sh-fallback|sh-port|shutdown_script|shutdown_script_timeout|skip_check_adv_addr|smtp_alert|smtp_alert_checker|smtp_alert_vrrp|smtp_connect_timeout|smtp_helo_name|smtp_server|snmp_socket|sorry_server|sorry_server_inhibit|sorry_server_lvs_method|source_ip|start|startup_script|startup_script_timeout|state|static_ipaddress|static_routes|static_rules|status_code|step|strict_mode|sync_group_tracking_weight|terminate_delay|timeout|track_(?:bfd|file|group|interface|process|script|src_ip)|ttl|type|umask|unicast_peer|unicast_src_ip|unicast_ttl|url|use_ipvlan|use_pid_dir|use_vmac|user|uthreshold|val[123]|version|virtual_(?:ipaddress|ipaddress_excluded|router_id|routes|rules|server|server_group)|virtualhost|vmac_xmit_base|vrrp|vrrp_(?:check_unicast_src|cpu_affinity|garp_(?:interval|lower_prio_delay|lower_prio_repeat|master_delay|master_refresh|master_refresh_repeat|master_repeat)|gna_interval|higher_prio_send_advert|instance|ipsets|iptables|lower_prio_no_advert|mcast_group[46]|min_garp|netlink_cmd_rcv_bufs|netlink_cmd_rcv_bufs_force|netlink_monitor_rcv_bufs|netlink_monitor_rcv_bufs_force|no_swap|notify_fifo|notify_fifo_script|notify_priority_changes|priority|process_name|rlimit_rttime|rt_priority|rx_bufs_multiplier|rx_bufs_policy|script|skip_check_adv_addr|startup_delay|strict|sync_group|track_process|version)|warmup|weight)\b/,
    "constant": /\b(?:A|AAAA|AH|BACKUP|CNAME|DR|MASTER|MX|NAT|NS|PASS|SCTP|SOA|TCP|TUN|TXT|UDP|dh|fo|lblcr?|mh|nq|ovf|sed|sh|w?lc|w?rr)\b/,
    "number": {
      pattern: /(^|[^\w.-])-?\d+(?:\.\d+)?/,
      lookbehind: true
    },
    "boolean": /\b(?:false|true|no|off|on|yes)\b/,
    "punctuation": /[{}]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/keyman.js
  languages.keyman = {
    "comment": {
      pattern: /\bc .*/gi,
      greedy: true
    },
    "string": {
      pattern: /"[^\n"]*"|'[^\n']*'/g,
      greedy: true
    },
    "virtual-key": {
      pattern: /\[\s*(?:(?:[lr]?alt|[lr]?ctrl|n?caps|shift)\s+)*(?:[tku]_[\w?]+|[a-e]\d\d?|"[^\n"]*"|'[^\n']*')\s*\]/gi,
      greedy: true,
      alias: "function"
      // alias for styles
    },
    // https://help.keyman.com/developer/language/guide/headers
    "header-keyword": {
      pattern: /&\w+/,
      alias: "bold"
      // alias for styles
    },
    "header-statement": {
      pattern: /\b(?:bitmap|bitmaps|caps always off|caps on only|copyright|hotkey|language|layout|message|name|shift frees caps|version)\b/i,
      alias: "bold"
      // alias for styles
    },
    "rule-keyword": {
      pattern: /\b(?:any|baselayout|beep|call|context|deadkey|dk|if|index|layer|notany|nul|outs|platform|reset|return|save|set|store|use)\b/i,
      alias: "keyword"
    },
    "structural-keyword": {
      pattern: /\b(?:ansi|begin|group|match|newcontext|nomatch|postkeystroke|readonly|unicode|using keys)\b/i,
      alias: "keyword"
    },
    "compile-target": {
      pattern: /\$(?:keyman|keymanonly|keymanweb|kmfl|weaver):/i,
      alias: "property"
    },
    // U+####, x###, d### characters and numbers
    "number": /\b(?:u\+[a-f\d]+|d?\d+|x[a-f\d]+)\b/i,
    "operator": /[\\+>$]|\.\./,
    "punctuation": /[(),=]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/kotlin.js
  var interpolationInside3 = {
    "interpolation-punctuation": {
      pattern: /^\$\{?|\}$/,
      alias: "punctuation"
    },
    "expression": {
      pattern: /[^]+/
    }
  };
  interpolationInside3.expression.inside = languages.kts = languages.kt = languages.kotlin = {
    // https://kotlinlang.org/spec/expressions.html#string-interpolation-expressions
    "string-literal": [
      {
        pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/,
        alias: "multiline",
        inside: {
          "interpolation": {
            pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i,
            inside: interpolationInside3
          },
          "string": /[^]+/
        }
      },
      {
        pattern: /"(?:\\.|[^\\\n"$]|\$(?:(?!\{)|\{[^{}]*\}))*"/,
        alias: "singleline",
        inside: {
          "interpolation": {
            pattern: /((?:^|[^\\])(?:\\\\)*)\$(?:[a-z_]\w*|\{[^{}]*\})/i,
            lookbehind: true,
            inside: interpolationInside3
          },
          "string": /[^]+/
        }
      }
    ],
    "char": {
      // https://kotlinlang.org/spec/expressions.html#character-literals
      pattern: /'(?:[^\\\n']|\\(?:.|u[a-fA-F\d]{0,4}))'/g,
      greedy: true
    },
    "comment": clikeComment(),
    "annotation": {
      pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
      alias: "builtin"
    },
    "keyword": {
      // The lookbehind prevents wrong highlighting of e.g. kotlin.properties.get
      pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
      lookbehind: true
    },
    "boolean": boolean,
    "label": {
      pattern: /\b\w+@|@\w+/,
      alias: "symbol"
    },
    "function": {
      pattern: /(?:`[^\n`]+`|\b\w+)(?=\s*\()|(\.)(?:`[^\n`]+`|\w+)(?=\s*\{)/g,
      lookbehind: true,
      greedy: true
    },
    "number": /\b(?:0[xX][a-fA-F\d]+(?:_[a-fA-F\d]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
    "operator": /--|\+\+|&&|\|\||->|[!=]==|!!|[%!=<>/*+-]=?|[?:]:?|\.\.|\b(?:and|inv|shl|u?shr|x?or)\b/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/kumir.js
  var nonId = ['\\s\0-"-/:-?[-^`{-~'];
  languages.kum = languages.kumir = {
    "comment": /\|.*/,
    "prolog": {
      pattern: /#.*/g,
      greedy: true
    },
    "string": {
      pattern: /"[^\n"]*"|'[^\n']*'/g,
      greedy: true
    },
    "boolean": {
      pattern: re("(^|[<0>])(?:\u0434\u0430|\u043D\u0435\u0442)(?![^<0>])", nonId),
      lookbehind: true
    },
    "operator-word": {
      pattern: re("(^|[<0>])(?:\u0438|\u0438\u043B\u0438|\u043D\u0435)(?![^<0>])", nonId),
      lookbehind: true,
      alias: "keyword"
    },
    "system-variable": {
      pattern: re("(^|[<0>])\u0437\u043D\u0430\u0447(?![^<0>])", nonId),
      lookbehind: true,
      alias: "keyword"
    },
    "type": [
      {
        pattern: re("(^|[<0>])(?:\u0432\u0435\u0449|\u043B\u0438\u0442|\u043B\u043E\u0433|\u0441\u0438\u043C|\u0446\u0435\u043B)(?: *\u0442\u0430\u0431)?(?![^<0>])", nonId),
        lookbehind: true,
        alias: "builtin"
      },
      {
        pattern: re("(^|[<0>])(?:\u043A\u043E\u043C\u043F\u043B|\u0441\u043A\u0430\u043D\u043A\u043E\u0434|\u0444\u0430\u0439\u043B|\u0446\u0432\u0435\u0442)(?![^<0>])", nonId),
        lookbehind: true,
        alias: "important"
      }
    ],
    /**
     * Should be performed after searching for type names because of "таб".
     * "таб" is a reserved word, but never used without a preceding type name.
     * "НАЗНАЧИТЬ", "Фввод", and "Фвывод" are not reserved words.
     */
    "keyword": {
      pattern: re("(^|[<0>])(?:\u0430\u043B\u0433|\u0430\u0440\u0433(?: *\u0440\u0435\u0437)?|\u0432\u0432\u043E\u0434|\u0412\u041A\u041B\u042E\u0427\u0418\u0422\u042C|\u0432\u0441[\u0435\u0451]|\u0432\u044B\u0431\u043E\u0440|\u0432\u044B\u0432\u043E\u0434|\u0432\u044B\u0445\u043E\u0434|\u0434\u0430\u043D\u043E|\u0434\u043B\u044F|\u0434\u043E|\u0434\u0441|\u0435\u0441\u043B\u0438|\u0438\u043D\u0430\u0447\u0435|\u0438\u0441\u043F|\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C|\u043A\u043E\u043D(?:(?: +|_)\u0438\u0441\u043F)?|\u043A\u0446(?:(?: +|_)\u043F\u0440\u0438)?|\u043D\u0430\u0434\u043E|\u043D\u0430\u0447|\u043D\u0441|\u043D\u0446|\u043E\u0442|\u043F\u0430\u0443\u0437\u0430|\u043F\u043E\u043A\u0430|\u043F\u0440\u0438|\u0440\u0430\u0437\u0430?|\u0440\u0435\u0437|\u0441\u0442\u043E\u043F|\u0442\u0430\u0431|\u0442\u043E|\u0443\u0442\u0432|\u0448\u0430\u0433)(?![^<0>])", nonId),
      lookbehind: true
    },
    /** Should be performed after searching for reserved words. */
    "name": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re("(^|[<0>])[^\\d<0>][^<0>]*(?: +[^<0>]+)*(?![^<0>])", nonId),
      lookbehind: true
    },
    /** Should be performed after searching for names. */
    "number": {
      pattern: re("(^|[<0>])(?:\\B\\$[a-f\\d]+\\b|(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:e[+-]?\\d+)?)(?![^<0>])", nonId, "i"),
      lookbehind: true
    },
    /** Should be performed after searching for words. */
    "punctuation": /:=|[()[\],:;]/,
    /**
     * Should be performed after searching for
     * - numeric constants (because of "+" and "-");
     * - punctuation marks (because of ":=" and "=").
     */
    "operator-char": {
      pattern: /\*\*?|<>|>=?|<=?|[=/+-]/,
      alias: "operator"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/kusto.js
  languages.kusto = {
    "comment": /\/\/.*/,
    "string": {
      pattern: /```[^]*?```|[hH]?(?:"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'|@(?:"[^\n"]*"|'[^\n']*'))/g,
      greedy: true
    },
    "verb": {
      pattern: /(\|\s*)[a-z][\w-]*/i,
      lookbehind: true,
      alias: "keyword"
    },
    "command": {
      pattern: /\.[a-z][a-z\d-]*\b/,
      alias: "keyword"
    },
    "class-name": /\b(?:bool|datetime|decimal|dynamic|guid|int|long|real|string|timespan)\b/,
    "keyword": /\b(?:access|alias|and|anti|asc?|auto|between|by|(?:contains|(?:ends|starts)with|has(?:perfix|suffix)?)(?:_cs)?|database|declare|desc|external|from|fullouter|has_all|in|ingestion|inline|inner|innerunique|into|(?:left|right)(?:anti(?:semi)?|inner|outer|semi)?|[ls]et|like|local|not|o[fnr]|pattern|print|query_parameters|range|restrict|schema|step|tables?|to|view|where|with|matches\s+regex|nulls\s+(?:first|last))(?![\w-])/,
    "boolean": /\b(?:false|true|null)\b/,
    "function": /\b[a-z_]\w*(?=\s*\()/,
    "datetime": [
      {
        // RFC 822 + RFC 850
        pattern: /\b(?:(?:Fri|Friday|Mon|Monday|Sat|Saturday|Sun|Sunday|Thu|Thursday|Tue|Tuesday|Wed|Wednesday)\s*,\s*)?\d\d?(?:\s+|-)(?:Apr|Aug|Dec|Feb|Jan|Ju[ln]|Ma[ry]|Nov|Oct|Sep)(?:\s+|-)\d\d\s+\d\d:\d\d(?::\d\d)?(?:\s*(?:\b(?:[A-Z]|(?:[ECMT][DS]|GM|U)T)|[+-]\d{4}))?\b/,
        alias: "number"
      },
      {
        // ISO 8601
        pattern: /[+-]?\b(?:\d{4}-\d\d-\d\d(?:[ T]\d\d:\d\d(?::\d\d(?:\.\d+)?)?)?|\d\d:\d\d(?::\d\d(?:\.\d+)?)?)Z?/,
        alias: "number"
      }
    ],
    "number": /\b(?:0x[a-fA-F\d]+|\d+(?:\.\d+)?(?:[Ee][+-]?\d+)?)(?:(?:min|sec|[mnµ]s|[dhms]|microsecond|tick)\b)?|[+-]?\binf\b/,
    "operator": /=>|[!=]~|[!=<>]=?|[%|/*+-]|\.\./,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/latex.js
  var funcPattern = /\\(?:[^a-z()[\]]|[a-z*]+)/i;
  var insideEqu = {
    "equation-command": {
      pattern: funcPattern,
      alias: "regex"
    }
  };
  languages.context = languages.tex = languages.latex = {
    "comment": /%.*/,
    // the verbatim environment prints whitespace to the document
    "cdata": {
      pattern: /(\\begin\{((?:lstlisting|verbatim)\*?)\})(?!\\end\{\2\})[^]+?(?=\\end\{\2\})/,
      lookbehind: true
    },
    /*
     * equations can be between $$ $$ or $ $ or \( \) or \[ \]
     * (all are multiline)
     */
    "equation": [
      {
        pattern: /\$\$(?:\\[^]|[^\\$])+\$\$|\$(?:\\[^]|[^\\$])+\$|\\\([^]*?\\\)|\\\[[^]*?\\\]/,
        inside: insideEqu,
        alias: "string"
      },
      {
        pattern: /(\\begin\{((?:align|eqnarray|equation|gather|math|multline)\*?)\})(?!\\end\{\2\})[^]+?(?=\\end\{\2\})/,
        lookbehind: true,
        inside: insideEqu,
        alias: "string"
      }
    ],
    /*
     * arguments which are keywords or references are highlighted
     * as keywords
     */
    "keyword": {
      pattern: /(\\(?:begin|cite|documentclass|end|label|ref|usepackage)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: true
    },
    "url": {
      pattern: /(\\url\{)[^}]+(?=\})/,
      lookbehind: true
    },
    /*
     * section or chapter headlines are highlighted as bold so that
     * they stand out more
     */
    "headline": {
      pattern: /(\\(?:chapter|frametitle|paragraph|part|section|subparagraph|subsection|subsubparagraph|subsubsection|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: true,
      alias: "class-name"
    },
    "function": {
      pattern: funcPattern,
      alias: "selector"
    },
    "punctuation": /[[\]{}&]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/php.js
  var comment3 = /\/\*[^]*?\*\/|\/\/.*|#(?!\[).*/;
  var constant = [
    {
      pattern: /\b(?:false|true)\b/i,
      alias: "boolean"
    },
    {
      pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/gi,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/gi,
      lookbehind: true,
      greedy: true
    },
    /\b(?:null)\b/i,
    /\b[A-Z_][A-Z\d_]*\b(?!\s*\()/
  ];
  var number2 = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[a-f\d]+(?:_[a-f\d]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i;
  var operator = /<?=>|\?\?=?|\.{3}|\??->|[!=]==|::|--|\+\+|&&|\*\*=?|\|\||>>|<<|[?~]|[.%&|^!=<>/*+-]=?/;
  var stringInterpolation2 = {
    pattern: /\{\$(?:[^{}]|\{(?:[^{}]|\{[^}]+\})*\})*\}|(^|[^\\{])\$+(?:\w+(?:\[[^\n[\]]*\]|->\w+)?)/,
    lookbehind: true
  };
  var string9 = [
    {
      pattern: /<<<'([^']+)'\n(?:.*\n)*?\1;/g,
      alias: "nowdoc-string",
      greedy: true,
      inside: {
        "delimiter": {
          pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            "punctuation": /^<<<'?|[';]$/
          }
        }
      }
    },
    {
      pattern: /<<<(?:"([^"]+)"\n(?:.*\n)*?\1;|([a-z_]\w*)\n(?:.*\n)*?\2;)/gi,
      greedy: true,
      alias: "heredoc-string",
      inside: {
        "delimiter": {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            "punctuation": /^<<<"?|[";]$/
          }
        },
        "interpolation": stringInterpolation2
      }
    },
    {
      pattern: /`(?:\\[^]|[^\\`])*`/g,
      alias: "backtick-quoted-string",
      greedy: true
    },
    {
      pattern: /'(?:\\[^]|[^\\'])*'/g,
      greedy: true,
      alias: "single-quoted-string"
    },
    {
      pattern: /"(?:\\[^]|[^\\"])*"/g,
      greedy: true,
      alias: "double-quoted-string",
      inside: {
        "interpolation": stringInterpolation2
      }
    }
  ];
  var php = stringInterpolation2.inside = {
    "delimiter": {
      pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
      alias: "important"
    },
    "doc-comment": {
      pattern: /\/\*\*(?!\/)[^]*?\*\//g,
      greedy: true,
      alias: "comment",
      inside: "phpdoc"
    },
    "comment": comment3,
    "string": string9,
    "attribute": {
      pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*')+\](?=\s*[a-z$#])/img,
      greedy: true,
      inside: {
        "attribute-content": {
          pattern: /^(..)[^]+(?=.)/,
          lookbehind: true,
          // inside can appear subset of php
          inside: {
            "comment": comment3,
            "string": string9,
            "attribute-class-name": [
              {
                pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/gi,
                lookbehind: true,
                greedy: true,
                alias: "class-name"
              },
              {
                pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/gi,
                lookbehind: true,
                greedy: true,
                alias: "class-name class-name-fully-qualified",
                inside: {
                  "punctuation": /\\/
                }
              }
            ],
            "constant": constant,
            "number": number2,
            "operator": operator,
            "punctuation": clikePunctuation
          }
        },
        "delimiter": {
          pattern: /.+/,
          alias: "punctuation"
        }
      }
    },
    "variable": /\$+(?:\w+|(?=\{))/,
    "package": {
      pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: true,
      inside: {
        "punctuation": /\\/
      }
    },
    "class-name-definition": {
      pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
      lookbehind: true,
      alias: "class-name"
    },
    "function-definition": {
      pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
      lookbehind: true,
      alias: "function"
    },
    "keyword": [
      {
        pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/gi,
        lookbehind: true,
        greedy: true,
        alias: "type-casting"
      },
      {
        pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/gi,
        lookbehind: true,
        greedy: true,
        alias: "type-hint"
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/gi,
        lookbehind: true,
        greedy: true,
        alias: "return-type"
      },
      {
        pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/gi,
        alias: "type-declaration",
        greedy: true
      },
      {
        pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/gi,
        lookbehind: true,
        greedy: true,
        alias: "type-declaration"
      },
      {
        pattern: /\b(?:parent|self|static)(?=\s*::)/gi,
        greedy: true,
        alias: "static-context"
      },
      {
        // yield from
        pattern: /(\byield\s+)from\b/gi,
        lookbehind: true
      },
      // `class` is always a keyword unlike other keywords
      /\bclass\b/i,
      {
        // https://www.php.net/manual/en/reserved.keywords.php
        //
        // keywords cannot be preceded by "->"
        // the complex lookbehind means `(?<!(?:->|::)\s*)`
        pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|[fx]?or|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|yield|__halt_compiler)\b/i,
        lookbehind: true
      }
    ],
    "argument-name": {
      pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
      lookbehind: true
    },
    "class-name": [
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/gi,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/gi,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/gi,
        greedy: true
      },
      {
        pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/gi,
        lookbehind: true,
        greedy: true,
        alias: "class-name-fully-qualified",
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/gi,
        greedy: true,
        alias: "class-name-fully-qualified",
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/gi,
        lookbehind: true,
        greedy: true,
        alias: "class-name-fully-qualified",
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*\$)/gi,
        greedy: true,
        alias: "type-declaration"
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/gi,
        greedy: true,
        alias: "class-name-fully-qualified type-declaration",
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*::)/gi,
        greedy: true,
        alias: "static-context"
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/gi,
        greedy: true,
        alias: "class-name-fully-qualified static-context",
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/gi,
        lookbehind: true,
        greedy: true,
        alias: "type-hint"
      },
      {
        pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/gi,
        lookbehind: true,
        greedy: true,
        alias: "class-name-fully-qualified type-hint",
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/gi,
        alias: "return-type",
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/gi,
        lookbehind: true,
        greedy: true,
        alias: "class-name-fully-qualified return-type",
        inside: {
          "punctuation": /\\/
        }
      }
    ],
    "constant": constant,
    "function": {
      pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
      lookbehind: true,
      inside: {
        "punctuation": /\\/
      }
    },
    "property": {
      pattern: /(->\s*)\w+/,
      lookbehind: true
    },
    "number": number2,
    "operator": operator,
    "punctuation": clikePunctuation
  };
  var embedded = embeddedIn("html");
  languages.php = {
    "php": {
      pattern: /<\?(?:[^"'/#]|\/(?![*/])|(["'])(?:\\[^]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^\n?]|\?(?!>))*(?=$|\?>|\n)|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/,
      alias: "language-php",
      inside: php
    },
    [tokenize]: (code, grammar) => {
      if (code.includes("<?")) return embedded(code, grammar);
      return tokenizeText(code, php);
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/php-extras.js
  insertBefore(languages.php.php.inside, "variable", {
    "this": {
      pattern: /\$this\b/,
      alias: "keyword"
    },
    "global": /\$(?:GLOBALS|HTTP_RAW_POST_DATA|_COOKIE|_ENV|_FILES|_GET|_POST|_REQUEST|_SERVER|_SESSION|arg[cv]|http_response_header|php_errormsg)\b/,
    "scope": {
      pattern: /\b[\w\\]+::/,
      inside: {
        "keyword": /\b(?:parent|self|static)\b/,
        "punctuation": /::|\\/
      }
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/latte.js
  var markupLatte = clone2(languages.html);
  insertBefore(markupLatte.tag.inside, "attr-value", {
    "n-attr": {
      pattern: /n:[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=>]+))?/g,
      greedy: true,
      inside: {
        "attr-value": {
          pattern: /(=\s*)[^]+/,
          lookbehind: true,
          inside: {
            "punctuation": /^["']|["']$/,
            "php": {
              pattern: /\S(?:[^]*\S)?/,
              inside: "php"
            }
          }
        },
        "attr-equals": /=/,
        "attr-name": {
          pattern: /\S+/,
          alias: "important"
        }
      }
    }
  });
  languages.latte = {
    "latte": {
      pattern: /\{\*[^]*?\*\}|\{[^\s{}"'*](?:[^"'/{}]|\/(?![*/])|(["'])(?:\\[^]|(?!\1)[^\\])*\1|\/\*(?:[^*]|\*(?!\/))*\*\/)*\}/,
      alias: "language-latte",
      inside: {
        "comment": /^\{\*[^]+/,
        "latte-tag": {
          // https://latte.nette.org/en/tags
          pattern: /(^\{(?:\/(?=[a-z]))?)(?:[=_]|[a-z]\w*\b(?!\())/i,
          lookbehind: true,
          alias: "important"
        },
        "delimiter": {
          pattern: /^\{\/?|\}$/,
          alias: "punctuation"
        },
        "php": {
          pattern: /\S(?:[^]*\S)?/,
          alias: "language-php",
          inside: "php"
        }
      }
    },
    [tokenize]: embeddedIn(markupLatte)
  };

  // node_modules/prism-code-editor/dist/prism/languages/less.js
  insertBefore(
    languages.less = extend("css", {
      "comment": clikeComment(),
      "atrule": {
        pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
        inside: {
          "punctuation": /[():]/
        }
      },
      // selectors and mixins are considered the same
      "selector": {
        pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
        inside: {
          // mixin parameters
          "variable": /@+[\w-]+/
        }
      },
      "property": /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
      "operator": /[/*+-]/
    }),
    "property",
    {
      "variable": [
        // Variable declaration (the colon must be consumed!)
        {
          pattern: /@[\w-]+\s*:/,
          inside: {
            "punctuation": /:/
          }
        },
        // Variable usage
        /@@?[\w-]+/
      ],
      "mixin-usage": {
        pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
        lookbehind: true,
        alias: "function"
      }
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/scheme.js
  var SortedBNF = (grammar) => {
    for (var key in grammar) {
      grammar[key] = grammar[key].replace(/<[\w ]+>/g, (key2) => `(?:${grammar[key2]})`);
    }
    return RegExp(grammar[key], "i");
  };
  languages.scheme = {
    // this supports "normal" single-line comments:
    //   ; comment
    // and (potentially nested) multiline comments:
    //   #| comment #| nested |# still comment |#
    // (only 1 level of nesting is supported)
    "comment": /;.*|#;\s*(?:\((?:[^()]|\([^)]*\))*\)|\[(?:[^[\]]|\[[^\]]*\])*\])|#\|(?:[^#|]|#(?!\|)|\|(?!#)|#\|(?:[^#|]|#(?!\|)|\|(?!#))*\|#)*\|#/,
    "string": {
      pattern: /"(?:\\.|[^\\"])*"/g,
      greedy: true
    },
    "symbol": {
      pattern: /'[^()[\]#'\s]+/g,
      greedy: true
    },
    "char": {
      pattern: /#\\(?:[ux][a-fA-F\d]+\b|[-a-zA-Z]+\b|[\ud800-\udbff][\udc00-\udfff]|\S)/g,
      greedy: true
    },
    "lambda-parameter": [
      // https://www.cs.cmu.edu/Groups/AI/html/r4rs/r4rs_6.html#SEC30
      {
        pattern: /((?:^|[^'`#])[([]lambda\s+)(?:[^\s()[\]'|]+|\|(?:\\.|[^\\|])*\|)/,
        lookbehind: true
      },
      {
        pattern: /((?:^|[^'`#])[([]lambda\s+[([])[^()[\]']+/,
        lookbehind: true
      }
    ],
    "keyword": {
      pattern: /((?:^|[^'`#])[([])(?:begin|case(?:-lambda)?|cond(?:-expand)?|define(?:-library|-macro|-record-type|-syntax|-values)?|defmacro|delay(?:-force)?|do|else|except|export|guard|if|import|include(?:-ci|-library-declarations)?|lambda|let(?:rec)?(?:-syntax|-values|\*)?|let\*-values|only|parameterize|prefix|(?:quasi-?)?quote|rename|set!|syntax-(?:case|rules)|unless|unquote(?:-splicing)?|when)(?![^()[\]\s])/,
      lookbehind: true
    },
    "builtin": {
      // all functions of the base library of R7RS plus some of built-ins of R5Rs
      pattern: /((?:^|[^'`#])[([])(?:abs|and|append|apply|assoc|ass[qv]|binary-port\?|boolean=?\?|bytevector(?:-append|-copy!?|-length|-u8-ref|-u8-set!|\?)?|caar|cadr|call-with-(?:current-continuation|port|values)|call\/cc|car|cdar|cddr|cdr|ceiling|char(?:->integer|-ready\?|\?|<\?|<=\?|=\?|>\?|>=\?)|close-(?:input-port|output-port|port)|complex\?|cons|current-(?:error|input|output)-port|denominator|dynamic-wind|eof-object\??|eq\?|equal\?|eqv\?|error|error-object(?:-irritants|-message|\?)|eval|even\?|exact(?:-integer-sqrt|-integer\?|\?)?|expt|features|file-error\?|floor(?:-quotient|-remainder|\/)?|flush-output-port|for-each|gcd|get-output-(?:bytevector|string)|inexact\??|input-port(?:-open\?|\?)|integer(?:->char|\?)|lcm|length|list(?:->string|->vector|-copy|-ref|-set!|-tail|\?)?|make-(?:bytevector|list|parameter|string|vector)|map|max|member|mem[qv]|min|modulo|negative\?|newline|not|null\?|number(?:->string|\?)|numerator|odd\?|open-(?:input|output)-(?:bytevector|string)|or|output-port(?:-open\?|\?)|pair\?|peek-char|peek-u8|port\?|positive\?|procedure\?|quotient|raise|raise-continuable|rational\?|rationalize|read-(?:bytevector|bytevector!|char|error\?|line|string|u8)|real\?|remainder|reverse|round|set-c[ad]r!|square|string(?:->list|->number|->symbol|->utf8|->vector|-append|-copy!?|-fill!|-for-each|-length|-map|-ref|-set!|\?|<\?|<=\?|=\?|>\?|>=\?)?|substring|symbol(?:->string|\?|=\?)|syntax-error|textual-port\?|truncate(?:-quotient|-remainder|\/)?|u8-ready\?|utf8->string|values|vector(?:->list|->string|-append|-copy!?|-fill!|-for-each|-length|-map|-ref|-set!|\?)?|with-exception-handler|write-(?:bytevector|char|string|u8)|zero\?)(?![^()[\]\s])/,
      lookbehind: true
    },
    "operator": {
      pattern: /((?:^|[^'`#])[([])(?:[%/*+-]|[<>]=?|=>?)(?![^()[\]\s])/,
      lookbehind: true
    },
    "number": {
      // The number pattern from [the R7RS spec](https://small.r7rs.org/attachment/r7rs.pdf).
      //
      // <number>      := <num 2>|<num 8>|<num 10>|<num 16>
      // <num R>       := <prefix R><complex R>
      // <complex R>   := <real R>(?:@<real R>|<imaginary R>)?|<imaginary R>
      // <imaginary R> := [+-](?:<ureal R>|(?:inf|nan)\.0)?i
      // <real R>      := [+-]?<ureal R>|[+-](?:inf|nan)\.0
      // <ureal R>     := <uint R>(?:\/<uint R>)?
      //                | <decimal R>
      //
      // <decimal 10>  := (?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?
      // <uint R>      := <digit R>+
      // <prefix R>    := <radix R>(?:#[ei])?|(?:#[ei])?<radix R>
      // <radix 2>     := #b
      // <radix 8>     := #o
      // <radix 10>    := (?:#d)?
      // <radix 16>    := #x
      // <digit 2>     := [01]
      // <digit 8>     := [0-7]
      // <digit 10>    := \d
      // <digit 16>    := [a-f\d]
      //
      // The problem with this grammar is that the resulting regex is way to complex, so we simplify by grouping all
      // non-decimal bases together. This results in a decimal (dec) and combined binary, octal, and hexadecimal (box)
      // pattern:
      pattern: SortedBNF({
        "<ureal dec>": "\\d+(?:/\\d+)|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[esfdl][+-]?\\d+)?",
        "<real dec>": "[+-]?<ureal dec>|[+-](?:inf|nan)\\.0",
        "<imaginary dec>": "[+-](?:<ureal dec>|(?:inf|nan)\\.0)?i",
        "<complex dec>": "<real dec>(?:@<real dec>|<imaginary dec>)?|<imaginary dec>",
        "<num dec>": "(?:#d(?:#[ei])?|#[ei](?:#d)?)?<complex dec>",
        "<ureal box>": "[a-f\\d]+(?:/[a-f\\d]+)?",
        "<real box>": "[+-]?<ureal box>|[+-](?:inf|nan)\\.0",
        "<imaginary box>": "[+-](?:<ureal box>|(?:inf|nan)\\.0)?i",
        "<complex box>": "<real box>(?:@<real box>|<imaginary box>)?|<imaginary box>",
        "<num box>": "#[box](?:#[ei])?|(?:#[ei])?#[box]<complex box>",
        "<number>": "(^|[()[\\]\\s])(?:<num dec>|<num box>)(?![^()[\\]\\s])"
      }),
      lookbehind: true
    },
    "boolean": {
      pattern: /(^|[()[\]\s])#(?:[ft]|false|true)(?![^()[\]\s])/,
      lookbehind: true
    },
    "function": {
      pattern: /((?:^|[^'`#])[([])(?:[^|()[\]'\s]+|\|(?:\\.|[^\\|])*\|)(?![^()[\]\s])/,
      lookbehind: true
    },
    "identifier": {
      pattern: /(^|[()[\]\s])\|(?:\\.|[^\\|])*\|(?![^()[\]\s])/g,
      lookbehind: true,
      greedy: true
    },
    "punctuation": /[()[\]']/
  };

  // node_modules/prism-code-editor/dist/prism/languages/lilypond.js
  var schemeExpression = nested('\\((?:\\\\[\\s\\S]|[^\\\\"();#]|;.*(?!.)|"(?:\\\\.|[^\\\\"])*"|#(?:\\{(?:(?!#\\})[\\s\\S])*#\\}|[^{])|<self>)*\\)', 5);
  var inside = {
    pattern: /[^]+/,
    alias: "language-lilypond"
  };
  inside.inside = languages.ly = languages.lilypond = {
    "comment": /%\{[^]*?%\}|%.*/,
    "embedded-scheme": {
      pattern: re('(^|[=\\s])#(?:"(?:\\\\.|[^\\\\"])*"|[^\\s()"]*(?:[^\\s()]|<0>))', [schemeExpression], "mg"),
      lookbehind: true,
      greedy: true,
      inside: {
        "scheme": {
          pattern: /(?!^)[^]+/,
          alias: "language-scheme",
          inside: {
            "embedded-lilypond": {
              pattern: /#\{[^]*?#\}/g,
              greedy: true,
              inside: {
                "punctuation": /^#\{|#\}$/,
                "lilypond": inside
              }
            },
            [rest]: languages.scheme
          }
        },
        "punctuation": /#/
      }
    },
    "string": {
      pattern: /"(?:\\.|[^\\"])*"/g,
      greedy: true
    },
    "class-name": {
      pattern: /(\\new\s+)[\w-]+/,
      lookbehind: true
    },
    "keyword": {
      pattern: /\\[a-z][-\w]*/i,
      inside: {
        "punctuation": /^\\/
      }
    },
    "operator": /[=|]|<<|>>/,
    "punctuation": {
      pattern: /(^|[a-z\d])(?:'+|,+|[_^]?-[_^]?(?:[!>._^+-]|(?=\d))|[_^]\.?|[.!])|[()[\]{}<>^~]|\\[()[\]<>\\!]|--|__/,
      lookbehind: true
    },
    "number": /\b\d+(?:\/\d+)?\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/linker-script.js
  languages["ld"] = languages["linker-script"] = {
    "identifier": /"[^\n"]*"/,
    "comment": {
      pattern: /(^|\s)\/\*[^]*?(?:$|\*\/)/g,
      lookbehind: true,
      greedy: true
    },
    "location-counter": {
      pattern: /\B\.\B/,
      alias: "important"
    },
    "section": {
      pattern: /(^|[^\w*])\.\w+/,
      lookbehind: true,
      alias: "keyword"
    },
    "function": /\b[A-Z][A-Z_]*(?=\s*\()/,
    "number": /\b(?:0[xX][a-fA-F\d]+|\d+)[KM]?\b/,
    "operator": /->|--|\+\+|&&|\|\||::|[?:~]|>>=?|<<=?|[%&|^!=<>/*+-]=?/,
    "punctuation": /[(){},;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/liquid.js
  languages.liquid = {
    "ignore-raw": {
      pattern: /(\{%-?\s*raw\b[^}]*\})(?!\{%-?\s*endraw\b[^}]*\})[^]+?(?=\{%-?\s*endraw\b[^}]*\})/g,
      lookbehind: true,
      greedy: true
    },
    "liquid": {
      pattern: /\{%\s*comment\s*%\}[^]*?\{%\s*endcomment\s*%\}|\{(?:%[^]*?%|\{\{[^]*?\}\}|\{[^]*?\})\}/g,
      greedy: true,
      alias: "language-liquid",
      inside: {
        "comment": {
          pattern: /(^\{%\s*comment\s*%\})[^]+(?=\{%\s*endcomment\s*%\}$)/,
          lookbehind: true
        },
        "delimiter": {
          pattern: /^\{(?:\{\{|[%{])-?|-?(?:\}\}|[%}])\}$/,
          alias: "punctuation"
        },
        "string": {
          pattern: /"[^"]*"|'[^']*'/g,
          greedy: true
        },
        "keyword": /\b(?:as|assign|break|(?:end)?(?:capture|case|comment|form?|if|paginate|raw|style|tablerow|unless)|continue|cycle|decrement|echo|else|elsif|in|include|increment|limit|liquid|offset|range|render|reversed|section|when|with)\b/,
        "object": /\b(?:address|all_country_option_tags|article|block|blog|[cp]art|checkout|collection|color|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,
        "function": [
          {
            pattern: /(\|\s*)\w+/,
            lookbehind: true,
            alias: "filter"
          },
          {
            // array functions
            pattern: /(\.\s*)(?:first|last|size)/,
            lookbehind: true
          }
        ],
        "boolean": /\b(?:false|true|nil)\b/,
        "range": {
          pattern: /\.\./,
          alias: "operator"
        },
        // https://github.com/Shopify/liquid/blob/698f5e0d967423e013f6169d9111bd969bd78337/lib/liquid/lexer.rb#L21
        "number": /\b\d+(?:\.\d+)?\b/,
        "operator": /[!=]=|<>|[<>]=?|[|?:=-]|\b(?:and|contains(?!\S)|or)\b/,
        "punctuation": /[()[\].,]/,
        "empty": {
          pattern: /\bempty\b/,
          alias: "keyword"
        }
      }
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/lisp.js
  var simple_form = (name2) => RegExp(`(\\()(?:${name2})(?=[\\s\\)])`);
  var primitive = (pattern) => RegExp(`([\\s([])(?:${pattern})(?=[\\s)])`);
  var symbol = "(?!\\d)[~@$%{}\\w^!=<>/*+-]+";
  var marker = "&" + symbol;
  var par = "(\\()";
  var endpar = "(?=\\))";
  var space3 = "(?=\\s)";
  var nestedPar = "(?:[^()]|\\((?:[^()]|\\((?:[^()]|\\((?:[^()]|\\((?:[^()]|\\([^)]*\\))*\\))*\\))*\\))*\\))";
  var language = {
    // Three or four semicolons are considered a heading.
    // See https://www.gnu.org/software/emacs/manual/html_node/elisp/Comment-Tips.html
    "heading": {
      pattern: /;;;.*/,
      alias: "comment title"
    },
    "comment": /;.*/,
    "string": {
      pattern: /"(?:\\.|[^\\"])*"/g,
      greedy: true,
      inside: {
        argument: /[-A-Z]+(?=[.,\s])/,
        symbol: RegExp("`" + symbol + "'")
      }
    },
    "quoted-symbol": {
      pattern: RegExp("#?'" + symbol),
      alias: "variable symbol"
    },
    "lisp-property": {
      pattern: RegExp(":" + symbol),
      alias: "property"
    },
    "splice": {
      pattern: RegExp(",@?" + symbol),
      alias: "symbol variable"
    },
    "keyword": [
      {
        pattern: RegExp(
          par + "(?:and|(?:cl-)?letf|cl-loop|con[ds]|error|if|(?:lexical-)?let\\*?|message|not|null|or|provide|require|setq|unless|use-package|when|while)" + space3
        ),
        lookbehind: true
      },
      {
        pattern: RegExp(
          par + "(?:append|by|collect|concat|do|finally|for|in|return)" + space3
        ),
        lookbehind: true
      }
    ],
    "declare": {
      pattern: simple_form("declare"),
      lookbehind: true,
      alias: "keyword"
    },
    "interactive": {
      pattern: simple_form("interactive"),
      lookbehind: true,
      alias: "keyword"
    },
    "boolean": {
      pattern: primitive("nil|t"),
      lookbehind: true
    },
    "number": {
      pattern: primitive("[+-]?\\d+(?:\\.\\d*)?"),
      lookbehind: true
    },
    "defvar": {
      pattern: RegExp(par + "def(?:const|custom|group|var)\\s+" + symbol),
      lookbehind: true,
      inside: {
        "keyword": /^def[a-z]+/,
        "variable": RegExp(symbol)
      }
    },
    "defun": {
      pattern: RegExp(`${par}(?:cl-)?(?:defmacro|defun\\*?)\\s+${symbol}\\s+\\(${nestedPar}*\\)`, "g"),
      lookbehind: true,
      greedy: true,
      inside: {
        "keyword": /^(?:cl-)?def\S+/,
        // See below, this property needs to be defined later so that it can
        // reference the language object.
        "arguments": null,
        "function": {
          pattern: RegExp("(^\\s)" + symbol),
          lookbehind: true
        },
        "punctuation": /[()]/
      }
    },
    "lambda": {
      pattern: RegExp(par + "lambda\\s+\\(\\s*(?:&?" + symbol + "(?:\\s+&?" + symbol + ")*\\s*)?\\)", "g"),
      lookbehind: true,
      greedy: true,
      inside: {
        "keyword": /^lambda/,
        // See below, this property needs to be defined later so that it can
        // reference the language object.
        "arguments": null,
        "punctuation": /[()]/
      }
    },
    "car": {
      pattern: RegExp(par + symbol),
      lookbehind: true
    },
    "punctuation": [
      // open paren, brackets, and close paren
      /['`,]\(|[()[\]]/,
      // cons
      {
        pattern: /(\s)\.(?!\S)/,
        lookbehind: true
      }
    ]
  };
  var arg = {
    "lisp-marker": RegExp(marker),
    "varform": {
      pattern: RegExp(`\\(${symbol}\\s+(?=\\S)${nestedPar}*\\)`),
      inside: language
    },
    "argument": {
      pattern: RegExp("(^|[\\s(])" + symbol),
      lookbehind: true,
      alias: "variable"
    },
    [rest]: language
  };
  var forms = "\\S+(?:\\s+\\S+)*";
  var arglist = {
    pattern: RegExp(par + nestedPar + "+" + endpar),
    lookbehind: true,
    inside: {
      "rest-vars": {
        pattern: RegExp("&(?:body|rest)\\s+" + forms),
        inside: arg
      },
      "other-marker-vars": {
        pattern: RegExp("&(?:aux|optional)\\s+" + forms),
        inside: arg
      },
      "keys": {
        pattern: RegExp("&key\\s+" + forms + "(?:\\s+&allow-other-keys)?"),
        inside: arg
      },
      "argument": {
        pattern: RegExp(symbol),
        alias: "variable"
      },
      "punctuation": /[()]/
    }
  };
  language["lambda"].inside.arguments = arglist;
  (language["defun"].inside.arguments = clone2(arglist)).inside.sublist = arglist;
  languages["emacs-lisp"] = languages.emacs = languages.elisp = languages.lisp = language;

  // node_modules/prism-code-editor/dist/prism/languages/livescript.js
  languages.livescript = {
    "comment": /#.*|\/\*[^]*?\*\//,
    "interpolated-string": {
      pattern: /"""(?:\\[^]|[^\\])*?"""|"(?:\\[^]|[^\\])*?"/g,
      greedy: true,
      inside: {
        "variable": {
          pattern: /(^|[^\\])#[a-z_](?:-?[a-z]|[\d_])*/m,
          lookbehind: true
        },
        "interpolation": {
          pattern: /(^|[^\\])#\{[^}]+\}/m,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^#\{|\}$/,
              alias: "variable"
            },
            [rest]: "livescript"
          }
        },
        "string": /[^]+/
      }
    },
    "string": [
      {
        pattern: /'''(?:\\[^]|[^\\])*?'''|'(?:\\[^]|[^\\])*?'|<\[[^]*?\]>/g,
        greedy: true
      },
      /\\[^\s,;\])}]+/
    ],
    "regex": [
      {
        pattern: /\/\/(?:\[[^\n\]]*\]|\\.|(?!\/\/)[^\\[])+\/\/[gimyu]{0,5}/g,
        greedy: true,
        inside: {
          "comment": /#.*/
        }
      },
      {
        pattern: /\/(?:\[[^\n\]]*\]|\\.|[^\\\n/[])+\/[gimyu]{0,5}/g,
        greedy: true
      }
    ],
    "keyword": {
      pattern: /(^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fallthrough|finally|for ever|for|function|if|implements|it|let|loop|new|null|otherwise|own|return|super|switch|that|[tw]hen|this|throw|try|unless|until|var|void|while|yield)(?!-)\b/m,
      lookbehind: true
    },
    "keyword-operator": {
      pattern: /(^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import all|import|in|instanceof|isnt|is not|is|not|of|til|to|typeof|with|x?or)(?!-)\b)/m,
      lookbehind: true,
      alias: "operator"
    },
    "boolean": {
      pattern: /(^|[^-])\b(?:false|true|no|off|on|yes)(?!-)\b/m,
      lookbehind: true
    },
    "argument": {
      // Don't match .&. nor &&
      pattern: /(^|(?!\.&\.)[^&])&(?!&)\d*/m,
      lookbehind: true,
      alias: "variable"
    },
    "number": /\b(?:\d+~[a-z\d]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[a-z]\w*)?)/i,
    "identifier": /[a-z_](?:-?[a-z]|[\d_])*/i,
    "operator": {
      // Full list, in order:
      // Spaced .
      // .= .~ .. ...
      // .&. .^. .<<. .>>. .>>>.
      // := :: ::=
      // &&
      // || |>
      // < << <<< <<<<
      // <- <-- <-! <--!
      // <~ <~~ <~! <~~!
      // <| <= <?
      // > >> >= >?
      // - -- -> -->
      // + ++
      // @ @@
      // % %%
      // * **
      // ! != !~=
      // !~> !~~>
      // !-> !-->
      // ~ ~> ~~> ~=
      // = ==
      // ^ ^^
      // / ?
      pattern: /( )\.(?= )|\.[=~]|\.{2,3}|\.(?:[&|^]|>>>?|<<)\.|::?=|::|&&|\|[|>]|<--?!?|<~~?!?|<[|?=]|<{1,4}|>[>=?]?|--?>?|\+\+?|@@?|%%?|\*\*?|!--?>|!~?~>|!~?=?|~=|~~?>?|==?|\^\^?|[/?]/,
      lookbehind: true
    },
    "punctuation": /[()[\]{}.,:;|`]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/llvm.js
  languages.llvm = {
    "comment": /;.*/,
    "string": {
      pattern: /"[^"]*"/g,
      greedy: true
    },
    "boolean": boolean,
    "variable": /[%@!#](?:(?!\d)(?:[-\w$.]|\\[a-f\d]{2})+|\d+)/i,
    "label": /(?!\d)(?:[-\w$.]|\\[a-f\d]{2})+:/i,
    "type": {
      pattern: /\b(?:double|float|fp128|half|i[1-9]\d*|label|metadata|ppc_fp128|token|void|x86_fp80|x86_mmx)\b/,
      alias: "class-name"
    },
    "keyword": /\b[a-z_][a-z_\d]*\b/,
    "number": /[+-]?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[a-fA-F\d]+\b|\b0xK[a-fA-F\d]{20}\b|\b0x[ML][a-fA-F\d]{32}\b|\b0xH[a-fA-F\d]{4}\b/,
    "punctuation": /[()[\]{}.,;!=<>*]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/log.js
  languages.log = {
    "string": {
      // Single-quoted strings must not be confused with plain text. E.g. Can't isn't Susan's Chris' toy
      pattern: /"(?:\\.|[^\\\n"])*"|'(?![st] | \w)(?:\\.|[^\\\n'])*'/g,
      greedy: true
    },
    "exception": {
      pattern: /(^|[^\w.])[a-z][\w.]*(?:Error|Exception):.*(?:\n[ 	]*(?:at[ 	].+|\.{3}.*|Caused by:.*))+(?:\n[ 	]*\.{3} .*)?/g,
      lookbehind: true,
      greedy: true,
      alias: "language-javastacktrace",
      inside: languages["javastacktrace"] || {
        "keyword": /\bat\b/,
        "function": /[a-z_][$\w]*(?=\()/,
        "punctuation": /[().:]/
      }
    },
    "level": [
      {
        pattern: /\b(?:ALERT|CRIT|CRITICAL|EMERG|EMERGENCY|ERR|ERROR|FAILURE|FATAL|SEVERE)\b/,
        alias: "error important"
      },
      {
        pattern: /\b(?:WARN|WARNING|WRN)\b/,
        alias: "warning important"
      },
      {
        pattern: /\b(?:DISPLAY|INFO?|NOTICE|STATUS)\b/,
        alias: "info keyword"
      },
      {
        pattern: /\b(?:DBG|DEBUG|FINE)\b/,
        alias: "debug keyword"
      },
      {
        pattern: /\b(?:FINER|FINEST|TRACE|TRC|VERBOSE|VRB)\b/,
        alias: "trace comment"
      }
    ],
    "property": {
      pattern: /((?:^|[\]|])[ 	]*)[a-z_](?:[\w-]|\b\/\b)*(?:[. ]\(?\w(?:[\w-]|\b\/\b)*\)?)*:(?!\S)/im,
      lookbehind: true
    },
    "separator": {
      pattern: /(^|[^-+])-{3,}|={3,}|\*{3,}|- - /m,
      lookbehind: true,
      alias: "comment"
    },
    "url": /\b(?:file|ftp|https?):\/\/[^\s|,;"']*[^\s|,;"'>.]/,
    "email": {
      pattern: /(^|\s)[-\w+.]+@[a-z][a-z\d-]*(?:\.[a-z][a-z\d-]*)+(?!\S)/,
      lookbehind: true,
      alias: "url"
    },
    "ip-address": {
      pattern: /\b(?:\d{1,3}(?:\.\d{1,3}){3})\b/,
      alias: "constant"
    },
    "mac-address": {
      pattern: /\b[a-f\d]{2}(?::[a-f\d]{2}){5}\b/i,
      alias: "constant"
    },
    "domain": {
      pattern: /(^|\s)[a-z][a-z\d-]*(?:\.[a-z][a-z\d-]*)*\.[a-z][a-z\d-]+(?!\S)/,
      lookbehind: true,
      alias: "constant"
    },
    "uuid": {
      pattern: /\b[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}\b/i,
      alias: "constant"
    },
    "hash": {
      pattern: /\b(?:[a-f\d]{32}){1,2}\b/i,
      alias: "constant"
    },
    "file-path": {
      pattern: /\b[a-z]:[\\/][^\s()[\]{},:;|"']+|(^|[\s:[\](>|])\.{0,2}\/\w[^\s()[\]{},:;|"']*/gi,
      lookbehind: true,
      greedy: true,
      alias: "string"
    },
    "date": {
      pattern: /\b\d{4}[-/]\d\d[-/]\d\d(?:t(?=\d\d?:)|(?=\s\d\d?:))|\b\d{1,4}[-/ ](?:\d\d?|apr|aug|dec|feb|jan|jul|jun|mar|may|nov|oct|sep)[-/ ]\d{2,4}t?\b|\b(?:(?:fri|mon|sat|sun|thu|tue|wed)(?:\s\s?(?:apr|aug|dec|feb|jan|jul|jun|mar|may|nov|oct|sep))?|apr|aug|dec|feb|jan|jul|jun|mar|may|nov|oct|sep)\s\s?\d\d?\b/i,
      alias: "number"
    },
    "time": {
      pattern: /\b\d\d?:\d\d?:\d\d?(?:[.,:]\d+)?(?:\s?[+-]\d\d:?\d\d|Z)?\b/,
      alias: "number"
    },
    "boolean": /\b(?:false|true|null)\b/i,
    "number": {
      pattern: /(^|[^.\w])(?:0x[a-f\d]+|0o[0-7]+|0b[01]+|v?\d[a-f\d]*(?:\.\d+)*(?:e[+-]?\d+)?[a-z]{0,3}\b)\b(?!\.\w)/i,
      lookbehind: true
    },
    "operator": /[(){}:;?~@$#%&|^!=<>/*+-]/,
    "punctuation": /[[\].,]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/lolcode.js
  languages.lolcode = {
    "comment": /\bOBTW\s[^]*?\sTLDR\b|\bBTW.+/,
    "string": {
      pattern: /"(?::.|[^":])*"/g,
      inside: {
        "variable": /:\{[^}]+\}/,
        "symbol": [
          /:\([a-f\d]+\)/i,
          /:\[[^\]]+\]/,
          /:[)>o":]/
        ]
      },
      greedy: true
    },
    "number": /(?:\B-)?(?:\b\d+(?:\.\d*)?|\B\.\d+)/,
    "symbol": {
      pattern: /(^|\s)(?:A )?(?:BUKKIT|NOOB|NUMBAR|NUMBR|TROOF|YARN)(?![^\s,])/,
      lookbehind: true,
      inside: {
        "keyword": /A(?!\S)/
      }
    },
    "label": {
      pattern: /((?:^|\s)(?:IM IN YR|IM OUTTA YR) )[a-zA-Z]\w*/,
      lookbehind: true,
      alias: "string"
    },
    "function": {
      pattern: /((?:^|\s)(?:HOW IZ I|I IZ|IZ) )[a-zA-Z]\w*/,
      lookbehind: true
    },
    "keyword": [
      {
        pattern: /(^|\s)(?:AN|FOUND YR|GIMMEH|GTFO|HAI|HAS A|HOW IZ I|I HAS A|I IZ|IF U SAY SO|IM IN YR|IM OUTTA YR|IS NOW(?: A)?|ITZ(?: A)?|IZ|KTHX|KTHXBYE|LIEK(?: A)?|MAEK|MEBBE|MKAY|NERFIN|NO WAI|O HAI IM|O RLY\?|OIC|OMG|OMGWTF|R|SMOOSH|SRS|TIL|UPPIN|VISIBLE|WILE|WTF\?|YA RLY|YR)(?![^\s,])/,
        lookbehind: true
      },
      /'Z(?![^\s,])/
    ],
    "boolean": {
      pattern: /(^|\s)(?:FAIL|WIN)(?![^\s,])/,
      lookbehind: true
    },
    "variable": {
      pattern: /(^|\s)IT(?![^\s,])/,
      lookbehind: true
    },
    "operator": {
      pattern: /(^|\s)(?:NOT|BOTH SAEM|DIFFRINT|(?:ALL|ANY|BIGGR|BOTH|DIFF|EITHER|MOD|PRODUKT|QUOSHUNT|SMALLR|SUM|WON) OF)(?![^\s,])/,
      lookbehind: true
    },
    "punctuation": /\.{3}|…|,|!/
  };

  // node_modules/prism-code-editor/dist/prism/languages/magma.js
  languages.magma = {
    "output": {
      pattern: /^(>.*\n)(?!>)(?:.+|\n(?!>).*)(?:\n(?!>).*)*/mg,
      lookbehind: true,
      greedy: true
    },
    "comment": clikeComment(),
    "string": {
      pattern: /(^|[^\\"])"(?:\\.|[^\\\n"])*"/g,
      lookbehind: true,
      greedy: true
    },
    // http://magma.maths.usyd.edu.au/magma/handbook/text/82
    "keyword": /\b(?:_|adj|[ae]nd|assert[23]?|assigned|break|by|case|cat|catch|clear|cmpeq|cmpne|continue|declare|default|delete|div|do|elif|else|eq|error|eval|exists|exit|for|forall|forward|fprintf|freeze|function|[gl][et]|i[fns]|i?load|import|intrinsic|join|local|meet|mod|ne|not|notadj|notin|notsubset|procedure|quit|random|readi?|repeat|require|requirege|requirerange|restore|return|save|s?diff|select|subset|[tw]hen|to|try|until|v?printf?|v?time|where|while|x?or)\b/,
    "boolean": boolean,
    "generator": {
      pattern: /\b[a-z_]\w*(?=\s*<)/i,
      alias: "class-name"
    },
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "number": {
      pattern: /(^|[^\w.]|\.\.)(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?(?:_[a-z]?)?(?=$|[^\w.]|\.\.)/,
      lookbehind: true
    },
    "operator": /->|[~#|^!=/*+-]|:=|\.\./,
    "punctuation": /[()[\]{}.,:;<>]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/makefile.js
  languages.makefile = {
    "comment": /#(?:\\[^]|[^\\\n])*/,
    "string": clikeString(),
    "builtin-target": {
      pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
      alias: "builtin"
    },
    "target": {
      pattern: /^(?:[^:=\s]|[ 	]+(?![\s:]))+(?=\s*:(?!=))/m,
      alias: "symbol",
      inside: {
        "variable": /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/
      }
    },
    "variable": /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
    // Directives
    "keyword": /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|override|private|s?include|undefine|unexport|vpath)\b/,
    "function": {
      pattern: /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ 	])/,
      lookbehind: true
    },
    "operator": /(?:::|[?:+!])?=|[|@]/,
    "punctuation": /[:;(){}]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/markdown.js
  var inner = ["(?:\\\\.|[^\\\\\n]|\n(?!\n))"];
  var createInline = (pattern) => re(`((?:^|[^\\\\])(?:\\\\\\\\)*)(?:${pattern})`, inner, "g");
  var tableCell = /(?:\\.|``(?:[^\n`]|`(?!`))+``|`[^\n`]+`|[^\\\n|`])+/;
  var tableRow2 = replace("\\|?<0>(?:\\|<0>)+\\|?(?:\n|(?![\\s\\S]))", [tableCell.source]);
  var tableLine = "\\|?[ 	]*:?-{3,}:?[ 	]*(?:\\|[ 	]*:?-{3,}:?[ 	]*)+\\|?\n";
  var markdown = languages.md = languages.markdown = clone2(languages.html);
  insertBefore(markdown, "prolog", {
    "front-matter-block": {
      pattern: /(^(?:\s*\n)?)---(?!.)[^]*?\n---(?!.)/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "punctuation": /^---|---$/,
        "front-matter": {
          pattern: /\S(?:[^]*\S)?/,
          alias: "language-yaml",
          inside: "yaml"
        }
      }
    },
    "blockquote": {
      // > ...
      pattern: /^>(?:[ 	]*>)*/m,
      alias: "punctuation"
    },
    "table": {
      pattern: RegExp("^" + tableRow2 + tableLine + "(?:" + tableRow2 + ")*", "m"),
      inside: {
        "table-header-row": {
          pattern: /^.+/,
          inside: {
            "table-header": {
              pattern: tableCell,
              alias: "important",
              inside: markdown
            },
            "punctuation": /\|/
          }
        },
        "table-data-rows": {
          pattern: /(.+\n)[^]+/,
          lookbehind: true,
          inside: {
            "table-data": {
              pattern: tableCell,
              inside: markdown
            },
            "punctuation": /\|/
          }
        },
        "table-line": {
          pattern: /.+/,
          inside: {
            "punctuation": /\S+/
          }
        }
      }
    },
    "code": [
      {
        // Prefixed by 4 spaces or 1 tab and preceded by an empty line
        pattern: /(^[ 	]*\n)(?:    |	).+(?:\n(?:    |	).+)*/m,
        lookbehind: true,
        alias: "keyword"
      },
      {
        // ```optional language
        // code block
        // ```
        pattern: /^(```+)[^`][^]*?^\1`*$/mg,
        greedy: true,
        inside: {
          "punctuation": /^`+|`+$/,
          "code-language": /^.+/,
          "code-block": /(?!^)[^]+(?=\n)/,
          [tokenize](code, grammar) {
            var tokens = withoutTokenizer(code, grammar);
            var language2;
            if (tokens[5]) {
              language2 = (/[a-z][\w-]*/i.exec(
                tokens[1].content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp")
              ) || [""])[0].toLowerCase();
              tokens[3].alias = "language-" + language2;
              if (grammar = languages[language2]) {
                tokens[3].content = tokenizeText(tokens[3].content, grammar);
              }
            }
            return tokens;
          }
        }
      }
    ],
    "title": [
      {
        // title 1
        // =======
        // title 2
        // -------
        pattern: /\S.*\n(?:==+|--+)(?=[ 	]*$)/m,
        alias: "important",
        inside: {
          punctuation: /=+$|-+$/
        }
      },
      {
        // # title 1
        // ###### title 6
        pattern: /(^\s*)#.+/m,
        lookbehind: true,
        alias: "important",
        inside: {
          punctuation: /^#+|#+$/
        }
      }
    ],
    "hr": {
      // ***
      // ---
      // * * *
      // -----------
      pattern: /(^\s*)([*-])(?:[ 	]*\2){2,}(?=\s*$)/m,
      lookbehind: true,
      alias: "punctuation"
    },
    "list": {
      // * item
      // + item
      // - item
      // 1. item
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[ 	].)/m,
      lookbehind: true,
      alias: "punctuation"
    },
    "url-reference": {
      // [id]: http://example.com "Optional title"
      // [id]: http://example.com 'Optional title'
      // [id]: http://example.com (Optional title)
      // [id]: <http://example.com> "Optional title"
      pattern: /!?\[[^\]]+\]:[ 	]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[ 	]+(?:"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        "variable": {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: true
        },
        "string": /(?:"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|\((?:\\.|[^)\\])*\))$/,
        "punctuation": /^[[\]!:]|<|>/
      },
      alias: "url"
    },
    "bold": {
      // **strong**
      // __strong__
      // allow one nested instance of italic text using the same delimiter
      pattern: createInline("\\b__(?:(?!_)<0>|_(?:(?!_)<0>)+_)+__\\b|\\*\\*(?:(?!\\*)<0>|\\*(?:(?!\\*)<0>)+\\*)+\\*\\*"),
      lookbehind: true,
      greedy: true,
      inside: {
        "content": {
          pattern: /(^..)[^]+(?=..)/,
          lookbehind: true,
          inside: {}
          // see below
        },
        "punctuation": /../
      }
    },
    "italic": {
      // *em*
      // _em_
      // allow one nested instance of bold text using the same delimiter
      pattern: createInline("\\b_(?:(?!_)<0>|__(?:(?!_)<0>)+__)+_\\b|\\*(?:(?!\\*)<0>|\\*\\*(?:(?!\\*)<0>)+\\*\\*)+\\*"),
      lookbehind: true,
      greedy: true,
      inside: {
        "content": {
          pattern: /(?!^)[^]+(?=.)/,
          inside: {}
          // see below
        },
        "punctuation": /./
      }
    },
    "strike": {
      // ~~strike through~~
      // ~strike~
      // eslint-disable-next-line regexp/strict
      pattern: createInline("(~~?)(?:(?!~)<0>)+\\2"),
      lookbehind: true,
      greedy: true,
      inside: {
        "punctuation": /^~~?|~~?$/,
        "content": {
          pattern: /[^]+/,
          inside: {}
          // see below
        }
      }
    },
    "code-snippet": {
      // `code`
      // ``code``
      pattern: /(^|[^\\`])(`+)[^\n`](?:|.*?[^\n`])\2(?!`)/g,
      lookbehind: true,
      greedy: true,
      alias: "code keyword"
    },
    "url": {
      // [example](http://example.com "Optional title")
      // [example][id]
      // [example] [id]
      pattern: createInline('!?\\[(?:(?!\\])<0>)+\\](?:\\([^\\s)]+(?:[ 	]+"(?:\\\\.|[^\\\\"])*")?\\)|[ 	]?\\[(?:(?!\\])<0>)+\\])'),
      lookbehind: true,
      greedy: true,
      inside: {
        "operator": /^!/,
        "content": {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: true,
          inside: {}
          // see below
        },
        "variable": {
          pattern: /(^\][ 	]?\[)[^\]]+(?=\]$)/,
          lookbehind: true
        },
        "url": {
          pattern: /(^\]\()[^\s)]+/,
          lookbehind: true
        },
        "string": {
          pattern: /(^[ 	]+)"(?:\\.|[^\\"])*"(?=\)$)/,
          lookbehind: true
        },
        "markup-bracket": markdown["markup-bracket"]
      }
    }
  });
  ["url", "bold", "italic", "strike"].forEach((token) => {
    ["url", "bold", "italic", "strike", "code-snippet", "markup-bracket"].forEach((inside5) => {
      if (token != inside5) {
        markdown[token].inside.content.inside[inside5] = markdown[inside5];
      }
    });
  });

  // node_modules/prism-code-editor/dist/prism/languages/mata.js
  var orgType = "\\b(?:(?:col|row)?vector|matrix|scalar)\\b";
  var type2 = "\\bvoid\\b|<org>|\\b(?:complex|numeric|pointer(?:\\s*\\([^()]*\\))?|real|string|(?:class|struct)\\s+\\w+|transmorphic)(?:\\s*<org>)?".replace(/<org>/g, orgType);
  languages.mata = {
    "comment": /\/\/.*|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\//,
    "string": {
      pattern: /"[^\n"]*"|[‘`']".*?"[’`']/g,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:class|extends|struct)\s+)\w+(?=\s*(?:\{|\bextends\b))/,
      lookbehind: true
    },
    "type": {
      pattern: RegExp(type2),
      alias: "class-name",
      inside: {
        "punctuation": /[()]/,
        "keyword": /\b(?:class|function|struct|void)\b/
      }
    },
    "keyword": /\b(?:break|class|continue|do|else|end|extends|external|final|for|function|goto|if|pragma|private|protected|public|return|static|struct|unset|unused|version|virtual|while)\b/,
    "constant": /\bNULL\b/,
    "number": {
      pattern: /(^|[^\w.])(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|\d[a-f\d]*(?:\.[a-f\d]+)?x[+-]?\d+)i?(?![\w.])/i,
      lookbehind: true
    },
    "missing": {
      pattern: /(^|[^\w.])(?:\.[a-z]?)(?![\w.])/,
      lookbehind: true,
      alias: "symbol"
    },
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "operator": /\.\.|--|\+\+|&&|\|\||:?(?:[!=<>]=|[&|^:<>/*+-])|[!?=\\#’`']/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/matlab.js
  languages.matlab = {
    "comment": /%\{[^]*?\}%|%.+/,
    "string": {
      pattern: /\B'(?:''|[^\n'])*'/g,
      greedy: true
    },
    // FIXME We could handle imaginary numbers as a whole
    "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
    "keyword": /\b(?:NaN|break|case|catch|continue|else|elseif|end|for|function|in?f|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
    "function": /\b(?!\d)\w+(?=\s*\()/,
    "operator": /\.?[\\^'/*]|[:@]|[~=<>+-]=?|&&?|\|\|?/,
    "punctuation": /\.{3}|[()[\]{}.,;!]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/maxscript.js
  var keywords5 = /\b(?:about|and|animate|as|at|attributes|by|case|catch|collect|continue|coordsys|do|else|exit|fn|f?or|from|function|global|if|in|local|macroscript|mapped|max|not|off?|on|parameters|persistent|plugin|rcmenu|return|rollout|set|struct|[tw]hen|throw|to|tool|try|undo|utility|where|while|with)\b/i;
  languages.maxscript = {
    "comment": {
      pattern: /\/\*[^]*?(?:\*\/|$)|--.*/g,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\"@])(?:"(?:\\[^]|[^\\"])*"|@"[^"]*")/g,
      lookbehind: true,
      greedy: true
    },
    "path": {
      pattern: /\$(?:[\w/\\.*?]|'[^']*')*/g,
      greedy: true,
      alias: "string"
    },
    "function-call": {
      pattern: RegExp(`((?:^|[;=<>+\\-*/^({\\[]|\\b(?:and|by|case|catch|collect|do|else|if|in|not|or|return|then|to|try|where|while|with)\\b)[ 	]*)(?!${keywords5.source})[a-z_]\\w*\\b(?=[ 	]*(?:(?!${keywords5.source})[a-z_]|\\d|-\\.?\\d|[({"'$@#?]))`, "img"),
      lookbehind: true,
      greedy: true,
      alias: "function"
    },
    "function-definition": {
      pattern: /(\b(?:fn|function)\s+)\w+/i,
      lookbehind: true,
      alias: "function"
    },
    "argument": {
      pattern: /\b[a-z_]\w*(?=:)/i,
      alias: "attr-name"
    },
    "keyword": keywords5,
    "boolean": boolean,
    "time": {
      pattern: /(^|[^\w.])(?:(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eEdD][+-]\d+|[LP])?[msft])+|\d+:\d+(?:\.\d*)?)(?![\w.:])/,
      lookbehind: true,
      alias: "number"
    },
    "number": [
      {
        pattern: /(^|[^\w.])(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eEdD][+-]\d+|[LP])?|0x[a-fA-F\d]+)(?![\w.:])/,
        lookbehind: true
      },
      /\b(?:e|pi)\b/
    ],
    "constant": /\b(?:dontcollect|ok|silentValue|undefined|unsupplied)\b/,
    "color": {
      pattern: /\b(?:black|blue|brown|gray|green|orange|red|white|yellow)\b/i,
      alias: "constant"
    },
    "operator": /[!=<>/*+-]=?|[&^?]|#(?!\()/,
    "punctuation": /[()[\]{}.,:;]|#(?=\()|\\$/m
  };

  // node_modules/prism-code-editor/dist/prism/languages/mel.js
  var statement = {
    pattern: /[^]+/
  };
  statement.inside = languages.mel = {
    "comment": clikeComment(),
    "code": {
      pattern: /`(?:\\.|[^\\`])*`/g,
      greedy: true,
      alias: "italic",
      inside: {
        "delimiter": {
          pattern: /^`|`$/,
          alias: "punctuation"
        },
        "statement": statement
      }
    },
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "variable": /\$\w+/,
    "number": /\b0x[a-fA-F\d]+\b|\b\d+(?:\.\d*)?|\B\.\d+/,
    "flag": {
      pattern: /-[^\d\W]\w*/,
      alias: "operator"
    },
    "keyword": /\b(?:break|case|continue|default|do|else|float|for|global|if|int?|matrix|proc|return|string|switch|vector|while)\b/,
    "function": {
      pattern: /((?:^|[{;])[ 	]*)[a-z_]\w*\b(?!\s*(?:\.(?!\.)|[[{=]))|\b[a-z_]\w*(?=[ 	]*\()/img,
      lookbehind: true,
      greedy: true
    },
    "tensor-punctuation": {
      pattern: /<<|>>/,
      alias: "punctuation"
    },
    "operator": /--|\+\+|&&|\|\||[!=<>/*+-]=?|[%^]/,
    "punctuation": /[()[\]{}.,:;?]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/mermaid.js
  languages.mermaid = {
    "comment": {
      pattern: /%%.*/g,
      greedy: true
    },
    "style": {
      pattern: /^([ 	]*(?:classDef|linkStyle|style)[ 	]+[$\w-]+[ 	]+)\w.*[^\s;]/m,
      lookbehind: true,
      inside: {
        "property": /\b\w[\w-]*(?=[ 	]*:)/,
        "operator": /:/,
        "punctuation": /,/
      }
    },
    "inter-arrow-label": {
      pattern: /([^<>ox.=-])(?:-[-.]|==)(?![<>ox.=-])[ 	]*(?:"[^\n"]*"|[^\s".=-](?:[^\n.=-]*[^\s.=-])?)[ 	]*(?:\.+->?|--+[->]|==+[=>])(?![<>ox.=-])/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "arrow": {
          pattern: /(?:\.+->?|--+[->]|==+[=>])$/,
          alias: "operator"
        },
        "label": {
          pattern: /^([^]{2}[ 	]*)\S(?:[^]*\S)?/,
          lookbehind: true,
          alias: "property"
        },
        "arrow-head": {
          pattern: /^\S+/,
          alias: "arrow operator"
        }
      }
    },
    "arrow": [
      // This might look complex but it really isn't.
      // There are many possible arrows (see tests) and it's impossible to fit all of them into one pattern. The
      // problem is that we only have one lookbehind per pattern. However, we cannot disallow too many arrow
      // characters in the one lookbehind because that would create too many false negatives. So we have to split the
      // arrows into different patterns.
      {
        // ER diagram
        pattern: /(^|[^{}|o.-])[|}][|o](?:--|\.\.)[|o][|{](?![{}|o.-])/,
        lookbehind: true,
        alias: "operator"
      },
      {
        // flow chart
        // (?:==+|--+|-\.*-)
        pattern: /(^|[^<>ox.=-])(?:[<ox](?:==+|--+|-\.*-)[>ox]?|(?:==+|--+|-\.*-)[>ox]|===+|---+|-\.+-)(?![<>ox.=-])/,
        lookbehind: true,
        alias: "operator"
      },
      {
        // sequence diagram
        pattern: /(^|[^<>()x-])(?:--?(?:>>|[x>)])(?![<>()x])|(?:<<|[x<(])--?(?!-))/,
        lookbehind: true,
        alias: "operator"
      },
      {
        // class diagram
        pattern: /(^|[^<>|*o.-])(?:[*o]--|--[*o]|<\|?(?:--|\.\.)|(?:--|\.\.)\|?>|--|\.\.)(?![<>|*o.-])/,
        lookbehind: true,
        alias: "operator"
      }
    ],
    "label": {
      pattern: /(^|[^|<])\|(?:[^\n"|]|"[^\n"]*")+\|/g,
      lookbehind: true,
      greedy: true,
      alias: "property"
    },
    "text": {
      pattern: /(?:[(\[{]+|\b>)(?:[^\n"()[\]{}]|"[^\n"]*")+(?:[)\]}]+|>)/,
      alias: "string"
    },
    "string": {
      pattern: /"[^\n"]*"/g,
      greedy: true
    },
    "annotation": {
      pattern: /<<(?:abstract|choice|enumeration|fork|interface|join|service)>>|\[\[(?:choice|fork|join)\]\]/i,
      alias: "important"
    },
    "keyword": [
      // This language has both case-sensitive and case-insensitive keywords
      {
        pattern: /(^[ 	]*)(?:action|callback|class|classDef|classDiagram|click|direction|erDiagram|flowchart|gantt|gitGraph|graph|journey|link|linkStyle|pie|requirementDiagram|sequenceDiagram|stateDiagram|stateDiagram-v2|style|subgraph)(?![$\w-])/mg,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^[ 	]*)(?:activate|alt|and|as|autonumber|deactivate|else|end(?:[ 	]+note)?|loop|opt|par|participant|rect|state|note[ 	]+(?:over|(?:left|right)[ 	]+of))(?![$\w-])/img,
        lookbehind: true,
        greedy: true
      }
    ],
    "entity": /#[a-z\d]+;/,
    "operator": {
      pattern: /(\w[ 	]*)&(?=[ 	]*\w)|:::|:/,
      lookbehind: true
    },
    "punctuation": /[(){};]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/metafont.js
  languages.metafont = {
    // Syntax of METAFONT with the added (public) elements of PlainMETAFONT. Except for internal quantities they are expected to be rarely redefined. Freely inspired by the syntax of Christophe Grandsire for the Crimson Editor.
    "comment": /%.*/,
    "string": {
      pattern: /"[^\n"]*"/g,
      greedy: true
    },
    "number": /\d*\.?\d+/,
    "boolean": boolean,
    "punctuation": [
      /[,;()]/,
      {
        pattern: /(^|[^{}])(?:\{|\})(?![{}])/,
        lookbehind: true
      },
      {
        pattern: /(^|[^[])\[(?!\[)/,
        lookbehind: true
      },
      {
        pattern: /(^|[^\]])\](?!\])/,
        lookbehind: true
      }
    ],
    "constant": [
      {
        pattern: /(^|[^!?])\?\?\?(?![!?])/,
        lookbehind: true
      },
      {
        pattern: /(^|[^/*\\])(?:\\|\\\\)(?![/*\\])/,
        lookbehind: true
      },
      /\b(?:_|blankpicture|bp|cc|cm|dd|ditto|down|eps|epsilon|fullcircle|halfcircle|identity|in|infinity|left|mm|nullpen|nullpicture|origin|pc|penrazor|penspeck|pensquare|penstroke|proof|pt|quartercircle|relax|right|smoke|unitpixel|unitsquare|up)\b/
    ],
    "quantity": {
      pattern: /\b(?:autorounding|blacker|boundarychar|charcode|chard[pxy]|charext|charht|charic|charwd|currentwindow|day|designsize|displaying|fillin|fontmaking|granularity|[hv]ppp|join_radius|month|o_correction|pausing|pen_(?:bot|lft|rt|top)|pixels_per_inch|proofing|showstopping|smoothing|time|tolerance|tracing(?:capsules|choices|commands|edges|equations|macros|online|output|pens|restores|specs|stats|titles)|turningcheck|vppp|warningcheck|[xy]offset|year)\b/,
      alias: "keyword"
    },
    "command": {
      pattern: /\b(?:addto|batchmode|charlist|cull|display|errhelp|errmessage|errorstopmode|everyjob|extensible|fontdimen|headerbyte|inner|interim|let|ligtable|message|newinternal|nonstopmode|numspecial|openwindow|outer|randomseed|save|scrollmode|shipout|show|showdependencies|showstats|showtoken|showvariable|special)\b/,
      alias: "builtin"
    },
    "operator": [
      {
        pattern: /(^|[^>=<:|])(?:\|?=:?\|?>?|\|=:\|>>|<>|::|\|\|:|>=?|<=?|:=?)(?![>=<:|])/,
        lookbehind: true
      },
      {
        pattern: /(^|[^+-])(?:\+|\+\+|-{1,3}|\+-\+)(?![+-])/,
        lookbehind: true
      },
      {
        pattern: /(^|[^/*\\])(?:\*|\*\*|\/)(?![/*\\])/,
        lookbehind: true
      },
      {
        pattern: /(^|[^.])(?:\.{2,3})(?!\.)/,
        lookbehind: true
      },
      {
        pattern: /(^|[^@#&$])&(?![@#&$])/,
        lookbehind: true
      },
      /\b(?:and|not|or)\b/
    ],
    "macro": {
      pattern: /\b(?:abs|beginchar|bot|byte|capsule_def|ceiling|change_width|clear_pen_memory|clearit|clearpen|clearxy|counterclockwise|cullit|cutdraw|cutoff|decr|define_(?:blacker_pixels|corrected_pixels|good_x_pixels|good_y_pixels|horizontal_corrected_pixels|pixels|whole_blacker_pixels|whole_pixels|whole_vertical_blacker_pixels|whole_vertical_pixels)|di[rv]|direction|directionpoint|dotprod|downto|draw|drawdot|endchar|erase|fill|filldraw|fix_units|flex|font_(?:coding_scheme|extra_space|identifier|normal_shrink|normal_space|normal_stretch|quad|size|slant|x_height)|gfcorners|gobbled?|good\.(?:bot|lft|rt|top|x|y)|grayfont|hide|[hv]?round|imagerules|incr|interact|interpath|intersectionpoint|inverse|italcorr|killtext|labelfont|labels|lft|loggingall|lowres_fix|makegrid|makelabel(?:\.(?:bot|lft|rt|top)(?:\.nodot)?)?|max|min|mod|mode_def|mode_setup|nodisplays|notransforms|numtok|openit|penlabels|penpos|pickup|proofoffset|proofrule|proofrulethickness|range|reflectedabout|rotatedabout|rotatedaround|rt|savepen|screenchars|screenrule|screenstrokes|shipit|showit|slantfont|softjoin|solve|s?top|superellipse|tensepath|thru|titlefont|tracingall|tracingnone|undraw|undrawdot|unfill|unfilldraw|upto)\b/,
      alias: "function"
    },
    "builtin": /\b(?:ASCII|angle|char|cosd|decimal|directiontime|floor|hex|intersectiontimes|jobname|known|length|makepath|makepen|mexp|mlog|normaldeviate|oct|odd|pencircle|penoffset|point|postcontrol|precontrol|reverse|rotated|sind|sqrt|str|subpath|substring|totalweight|turningnumber|uniformdeviate|unknown|[xy][xy]?part)\b/,
    "keyword": /\b(?:also|at|atleast|begingroup|charexists|contour|controls|curl|cycle|def|delimiters|doublepath|dropping|dump|else|elseif|end|enddef|endfor|endgroup|endinput|exitif|exitunless|expandafter|fi|for|forever|forsuffixes|from|if|input|inwindow|keeping|kern|of|primarydef|quote|readstring|scantokens|secondarydef|shifted|skipto|slanted|step|tension|tertiarydef|to|transformed|until|vardef|withpen|withweight|[xyz]?scaled)\b/,
    "type": {
      pattern: /\b(?:boolean|expr|numeric|pair|path|pen|picture|primary|secondary|string|suffix|tertiary|text|transform)\b/,
      alias: "property"
    },
    "variable": {
      pattern: /(^|[^@#&$])(?:@#|#@|#|@)(?![@#&$])|\b(?:aspect_ratio|currentpen|currentpicture|currenttransform|d|extra_beginchar|extra_endchar|extra_setup|h|localfont|mag|mode|screen_cols|screen_rows|w|whatever|x|y|z)\b/,
      lookbehind: true
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/mizar.js
  languages.mizar = {
    "comment": /::.+/,
    "keyword": /@proof\b|\b(?:according|aggregate|all|[ae]nd|antonym|are|as|associativity|assume|a?symmetry|attr|be|begin|being|by|canceled|cases?|clusters?|coherence|commutativity|compatibility|connectedness|consider|consistency|constructors|contradiction|correctness|def|deffunc|define|definitions?|defpred|do|does|environ|equals|ex|exactly|existence|f?or|from|func|given|hence|hereby|holds|idempotence|identity|iff?|implies|involutiveness|irreflexivity|is|it|let|means|mode|no[nw]|not|notations?|of|otherwise|over|per|pred|prefix|projectivity|proof|provided|qua|reconsider|redefine|reduce|reducibility|reflexivity|registrations?|requirements|reserve|sch|schemes?|section|selector|set|sethood|st|struct|such|suppose|synonym|take|that|then?|theorems?|thesis|thus|to|transitivity|uniqueness|vocabular(?:ies|y)|when|where|with|wrt)\b/,
    "parameter": {
      pattern: /\$(?:10|\d)/,
      alias: "variable"
    },
    "variable": /\b\w+(?=:)/,
    "number": /(?:\b|-)\d+\b/,
    "operator": /\.{3}|->|&|\.?=/,
    "punctuation": /\(#|#\)|[()[\]{},:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/mongodb.js
  var operators = [
    // query and projection
    "$eq",
    "$gt",
    "$gte",
    "$in",
    "$lt",
    "$lte",
    "$ne",
    "$nin",
    "$and",
    "$not",
    "$nor",
    "$or",
    "$exists",
    "$type",
    "$expr",
    "$jsonSchema",
    "$mod",
    "$regex",
    "$text",
    "$where",
    "$geoIntersects",
    "$geoWithin",
    "$near",
    "$nearSphere",
    "$all",
    "$elemMatch",
    "$size",
    "$bitsAllClear",
    "$bitsAllSet",
    "$bitsAnyClear",
    "$bitsAnySet",
    "$comment",
    "$elemMatch",
    "$meta",
    "$slice",
    // update
    "$currentDate",
    "$inc",
    "$min",
    "$max",
    "$mul",
    "$rename",
    "$set",
    "$setOnInsert",
    "$unset",
    "$addToSet",
    "$pop",
    "$pull",
    "$push",
    "$pullAll",
    "$each",
    "$position",
    "$slice",
    "$sort",
    "$bit",
    // aggregation pipeline stages
    "$addFields",
    "$bucket",
    "$bucketAuto",
    "$collStats",
    "$count",
    "$currentOp",
    "$facet",
    "$geoNear",
    "$graphLookup",
    "$group",
    "$indexStats",
    "$limit",
    "$listLocalSessions",
    "$listSessions",
    "$lookup",
    "$match",
    "$merge",
    "$out",
    "$planCacheStats",
    "$project",
    "$redact",
    "$replaceRoot",
    "$replaceWith",
    "$sample",
    "$set",
    "$skip",
    "$sort",
    "$sortByCount",
    "$unionWith",
    "$unset",
    "$unwind",
    "$setWindowFields",
    // aggregation pipeline operators
    "$abs",
    "$accumulator",
    "$acos",
    "$acosh",
    "$add",
    "$addToSet",
    "$allElementsTrue",
    "$and",
    "$anyElementTrue",
    "$arrayElemAt",
    "$arrayToObject",
    "$asin",
    "$asinh",
    "$atan",
    "$atan2",
    "$atanh",
    "$avg",
    "$binarySize",
    "$bsonSize",
    "$ceil",
    "$cmp",
    "$concat",
    "$concatArrays",
    "$cond",
    "$convert",
    "$cos",
    "$dateFromParts",
    "$dateToParts",
    "$dateFromString",
    "$dateToString",
    "$dayOfMonth",
    "$dayOfWeek",
    "$dayOfYear",
    "$degreesToRadians",
    "$divide",
    "$eq",
    "$exp",
    "$filter",
    "$first",
    "$floor",
    "$function",
    "$gt",
    "$gte",
    "$hour",
    "$ifNull",
    "$in",
    "$indexOfArray",
    "$indexOfBytes",
    "$indexOfCP",
    "$isArray",
    "$isNumber",
    "$isoDayOfWeek",
    "$isoWeek",
    "$isoWeekYear",
    "$last",
    "$last",
    "$let",
    "$literal",
    "$ln",
    "$log",
    "$log10",
    "$lt",
    "$lte",
    "$ltrim",
    "$map",
    "$max",
    "$mergeObjects",
    "$meta",
    "$min",
    "$millisecond",
    "$minute",
    "$mod",
    "$month",
    "$multiply",
    "$ne",
    "$not",
    "$objectToArray",
    "$or",
    "$pow",
    "$push",
    "$radiansToDegrees",
    "$range",
    "$reduce",
    "$regexFind",
    "$regexFindAll",
    "$regexMatch",
    "$replaceOne",
    "$replaceAll",
    "$reverseArray",
    "$round",
    "$rtrim",
    "$second",
    "$setDifference",
    "$setEquals",
    "$setIntersection",
    "$setIsSubset",
    "$setUnion",
    "$size",
    "$sin",
    "$slice",
    "$split",
    "$sqrt",
    "$stdDevPop",
    "$stdDevSamp",
    "$strcasecmp",
    "$strLenBytes",
    "$strLenCP",
    "$substr",
    "$substrBytes",
    "$substrCP",
    "$subtract",
    "$sum",
    "$switch",
    "$tan",
    "$toBool",
    "$toDate",
    "$toDecimal",
    "$toDouble",
    "$toInt",
    "$toLong",
    "$toObjectId",
    "$toString",
    "$toLower",
    "$toUpper",
    "$trim",
    "$trunc",
    "$type",
    "$week",
    "$year",
    "$zip",
    "$count",
    "$dateAdd",
    "$dateDiff",
    "$dateSubtract",
    "$dateTrunc",
    "$getField",
    "$rand",
    "$sampleRate",
    "$setField",
    "$unsetField",
    // aggregation pipeline query modifiers
    "$comment",
    "$explain",
    "$hint",
    "$max",
    "$maxTimeMS",
    "$min",
    "$orderby",
    "$query",
    "$returnKey",
    "$showDiskLoc",
    "$natural"
  ].map((operator3) => operator3.replace("$", "\\$"));
  var builtinFunctions = [
    "ObjectId",
    "Code",
    "BinData",
    "DBRef",
    "Timestamp",
    "NumberLong",
    "NumberDecimal",
    "MaxKey",
    "MinKey",
    "RegExp",
    "ISODate",
    "UUID"
  ];
  var operatorsSource = "(?:" + operators.join("|") + ")\\b";
  var mongodb = languages.mongodb = clone2(languages.js);
  insertBefore(mongodb, "string", {
    "property": {
      pattern: /(?:(["'])(?:\\[^]|(?!\1)[^\\\n])*\1|(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)(?=\s*:)/g,
      greedy: true,
      inside: {
        "keyword": RegExp(`^(["'])?` + operatorsSource + "(?:\\1)?$")
      }
    }
  });
  mongodb.string.inside = {
    url: {
      // url pattern
      pattern: /https?:\/\/[\w@:%.~#=+-]{1,256}\.[a-z\d()]{1,6}\b[()?&/\w@:%.~#=+-]*/gi,
      greedy: true
    },
    entity: {
      // ipv4
      pattern: /\b(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d\d?|2[0-4]\d|25[0-5])\b/g,
      greedy: true
    }
  };
  insertBefore(mongodb, "constant", {
    "builtin": {
      pattern: RegExp("\\b(?:" + builtinFunctions.join("|") + ")\\b"),
      alias: "keyword"
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/monkey.js
  languages.monkey = {
    "comment": {
      pattern: /^#rem\s[^]*?^#end|'.+/img,
      greedy: true
    },
    "string": {
      pattern: /"[^\n"]*"/g,
      greedy: true
    },
    "preprocessor": {
      pattern: /(^[ 	]*)#.+/mg,
      lookbehind: true,
      greedy: true,
      alias: "property"
    },
    "function": /\b\w+(?=\()/,
    "type-char": {
      pattern: /\b[?%#$]/,
      alias: "class-name"
    },
    "number": {
      pattern: /(\.\.)?(?:(?:\b|\B-\.?|\B\.)\d+(?:(?!\.\.)\.\d*)?|\$[a-f\d]+)/i,
      lookbehind: true
    },
    "keyword": /\b(?:abstract|array|bool|case|catch|class|const|continue|default|eachin|else|elseif|end|endif|exit|extends|extern|false|true|field|final|float|for|forever|function|global|if|implements|import|inline|int|interface|local|method|module|new|next|null|object|private|property|public|repeat|return|select|self|step|strict|string|super|then|throw|to|try|until|void|wend|while)\b/i,
    "operator": /\.\.|<[=>]?|>=?|:?=|(?:[~&|/*+-]|\b(?:mod|shl|shr)\b)=?|\b(?:and|not|or)\b/i,
    "punctuation": /[()[\].,:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/moonscript.js
  var moonscript = {
    pattern: /[^]+/
  };
  moonscript.inside = languages.moon = languages.moonscript = {
    "comment": /--.*/,
    "string": [
      {
        pattern: /'[^']*'|\[(=*)\[[^]*?\]\1\]/g,
        greedy: true
      },
      {
        pattern: /"[^"]*"/g,
        greedy: true,
        inside: {
          "interpolation": {
            pattern: /#\{[^{}]*\}/,
            inside: {
              "interpolation-punctuation": {
                pattern: /^#\{|.$/,
                alias: "punctuation"
              },
              "moonscript": moonscript
            }
          }
        }
      }
    ],
    "class-name": [
      {
        pattern: /(\b(?:class|extends)[ 	]+)\w+/,
        lookbehind: true
      },
      // class-like names start with a capital letter
      /\b[A-Z]\w*/
    ],
    "keyword": /\b(?:class|continue|do|else|elseif|export|extends|for|from|if|import|in|local|nil|return|self|super|switch|[tw]hen|unless|using|while|with)\b/,
    "variable": /@@?\w*/,
    "property": {
      pattern: /\b(?!\d)\w+(?=:)|(:)(?!\d)\w+/,
      lookbehind: true
    },
    "function": {
      pattern: /\b(?:_G|_VERSION|assert|collectgarbage|coroutine\.(?:create|resume|running|status|wrap|yield)|debug\.(?:debug|[gs]etfenv|[gs]ethook|getinfo|[gs]etlocal|[gs]etmetatable|getregistry|[gs]etupvalue|traceback)|dofile|error|[gs]etfenv|[gs]etmetatable|io\.(?:close|flush|input|lines|output|p?open|read|stderr|stdin|stdout|tmpfile|type|write)|i?pairs|load|loadfile|loadstring|math\.(?:abs|acos|asin|atan2?|ceil|cosh?|deg|exp|floor|fmod|frexp|ldexp|log|log10|max|min|modf|pi|pow|rad|random|randomseed|sinh?|sqrt|tanh?)|module|next|os\.(?:clock|date|difftime|execute|exit|getenv|remove|rename|setlocale|time|tmpname)|package\.(?:cpath|loaded|loadlib|path|preload|seeall)|print|rawequal|rawget|rawset|require|select|string\.(?:byte|char|dump|find|format|g?match|g?sub|len|lower|rep|reverse|upper)|table\.(?:concat|insert|maxn|remove|sort)|tonumber|tostring|type|unpack|x?pcall)\b/,
      inside: {
        "punctuation": /\./
      }
    },
    "boolean": boolean,
    "number": /(?:\B\.\d+|\b\d+\.\d+|\b\d+(?=[eE]))(?:[eE][+-]?\d+)?\b|\b(?:0x[a-fA-F\d]+|\d+)(?:U?LL)?\b/,
    "operator": /\.{3}|[=-]>|~=|(?:[%!=<>/*+-]|\.\.)=?|[:#^]|\b(?:and|or)\b=?|\b(?:not)\b/,
    "punctuation": /[()[\]{}.,\\]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/n1ql.js
  languages.n1ql = {
    "comment": {
      pattern: /\/\*[^]*?(?:$|\*\/)|--.*/g,
      greedy: true
    },
    "string": {
      pattern: /(["'])(?:\\[^]|(?!\1)[^\\]|\1\1)*\1/g,
      greedy: true
    },
    "identifier": {
      pattern: /`(?:\\[^]|[^\\`]|``)*`/g,
      greedy: true
    },
    "parameter": /\$[\w.]+/,
    // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html#n1ql-reserved-words
    "keyword": /\b(?:advise|alter|analyze|asc?|at|begin|binary|boolean|break|bucket|build|by|c?all|[cl]ast|cluster|collate|collection|commit|committed|connect|continue|correlated?|c?over|create|current|database|dataset|datastore|declare|decrement|delete|derived|desc|describe|distinct|do|drop|each|element|except|exclude|execute|explain|fetch|filter|flatten|flush|following|[fx]or|force|from|fts|function|golang|grant|groups?|gsi|hash|having|if|ignore|ilike|include|increment|index|infer|inline|inner|insert|intersect|into|is|isolation|javascript|join|keys?|keyspace|known|language|lef?t|letting|level|limit|lsm|map|mapping|matched|materialized|merge|minus|missing|namespace|nest|nl|no|nth_value|nulls?|number|object|offset|on|options?|order|others|outer|parse|partition|password|path|pool|preceding|prepare|primary|private|privilege|probe|procedure|public|range|raw|realm|reduce|rename|respect|return|returning|revoke|right|role|rollback|rows?|satisfies|savepoint|schema|scope|select|self|semi|set|show|some|start|statistics|string|system|ties|to|tran|transaction|trigger|truncate|unbounded|under|union|unique|unknown|unnest|unset|update|upsert|user?|using|validate|values?|via|view|where|while|window|with|work)\b/i,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "boolean": /\b(?:false|true)\b/i,
    "number": /(?:\b\d+\.|\B\.)\d+e[+-]?\d+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    "operator": /[%/*+-]|!=|==?|\|\||<[>=]?|>=?|\b(?:an[dy]|array|between|case|else|end|every|exists|first|in|like|not|or|[tw]hen|valued|within)\b/i,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/n4js.js
  insertBefore(
    languages.n4jsd = languages.n4js = extend("js", {
      // Keywords from N4JS language spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html
      "keyword": /\b(?:Array|any|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|true|finally|for|from|function|[gls]et|if|implements|import|in|instanceof|interface|module|new|null|number|package|private|protected|public|return|static|string|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/
    }),
    "constant",
    {
      // Annotations in N4JS spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html#_annotations
      "annotation": {
        pattern: /@+\w+/,
        alias: "operator"
      }
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/nand2tetris-hdl.js
  languages["nand2tetris-hdl"] = {
    "comment": clikeComment(),
    "keyword": /\b(?:BUILTIN|CHIP|CLOCKED|IN|OUT|PARTS)\b/,
    "boolean": boolean,
    "function": /\b[a-zA-Z][A-Za-z\d]*(?=\()/,
    "number": /\b\d+\b/,
    "operator": /=|\.\./,
    "punctuation": /[()[\]{},:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/naniscript.js
  var expressionDef = /\{[^\n[\]{}]*\}/g;
  var params = {
    "quoted-string": {
      pattern: /"(?:\\.|[^\\"])*"/,
      alias: "operator"
    },
    "command-param-id": {
      pattern: /(\s)\w+:/,
      lookbehind: true,
      alias: "property"
    },
    "command-param-value": [
      {
        pattern: expressionDef,
        alias: "selector"
      },
      {
        pattern: /([ 	])\S+/g,
        lookbehind: true,
        greedy: true,
        alias: "operator"
      },
      {
        pattern: /\S(?:.*\S)?/,
        alias: "operator"
      }
    ]
  };
  var isBadLine = (input) => {
    for (var brackets2 = "[]{}", stack = [], s = 0, i = 0, l = input.length; i < l; ) {
      var bracketsIndex = brackets2.indexOf(input[i++]);
      if (bracketsIndex + 1) {
        if (bracketsIndex % 2) {
          if (stack[--s] != bracketsIndex) return true;
        } else stack[s++] = bracketsIndex + 1;
      }
    }
    return s;
  };
  languages.nani = languages.naniscript = {
    // ; ...
    "comment": {
      pattern: /^([ 	]*);.*/m,
      lookbehind: true
    },
    // > ...
    // Define is a control line starting with '>' followed by a word, a space and a text.
    "define": {
      pattern: /^>.+/m,
      alias: "tag",
      inside: {
        "value": {
          pattern: /(^>\w+[ 	]+)(?!\s)[^{}\n]+/,
          lookbehind: true,
          alias: "operator"
        },
        "key": {
          pattern: /(^>)\w+/,
          lookbehind: true
        }
      }
    },
    // # ...
    "label": {
      pattern: /^([ 	]*)#[ 	]*\w+[ 	]*$/m,
      lookbehind: true,
      alias: "regex"
    },
    "command": {
      pattern: /^([ 	]*)@\w+(?=[ 	]|$).*/m,
      lookbehind: true,
      alias: "function",
      inside: {
        "command-name": /^@\w+/,
        "expression": {
          pattern: expressionDef,
          greedy: true,
          alias: "selector"
        },
        "command-params": {
          pattern: /\s*\S[^]*/,
          inside: params
        }
      }
    },
    // Generic is any line that doesn't start with operators: ;>#@
    "generic-text": {
      pattern: /(^[ 	]*)[^#@>;\s].*/m,
      lookbehind: true,
      alias: "punctuation",
      inside: {
        // \{ ... \} ... \[ ... \] ... \"
        "escaped-char": /\\[[\]{}"]/,
        "expression": {
          pattern: expressionDef,
          greedy: true,
          alias: "selector"
        },
        "inline-command": {
          pattern: /\[[ 	]*\w[^\n[\]]*\]/g,
          greedy: true,
          alias: "function",
          inside: {
            "start-stop-char": /[[\]]/,
            "command-params": {
              pattern: /(^[ 	]*\w+)[^]+/,
              lookbehind: true,
              inside: params
            },
            "command-param-name": {
              pattern: /\w+/,
              alias: "name"
            }
          }
        }
      }
    },
    [tokenize](code, grammar) {
      var tokens = withoutTokenizer(code, grammar);
      var position = 0;
      var i = 0, l = tokens.length;
      while (i < l) {
        var token = tokens[i++];
        var length = token.length;
        var content2;
        if (token.type == "generic-text") {
          content2 = code.slice(position, position + length);
          if (isBadLine(content2)) {
            token.type = "bad-line";
            token.content = content2;
          }
        }
        position += length;
      }
      return tokens;
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/nasm.js
  languages.nasm = {
    "comment": /;.*/,
    "string": /(["'`])(?:\\.|(?!\1)[^\\\n])*\1/,
    "label": {
      pattern: /(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m,
      lookbehind: true,
      alias: "function"
    },
    "keyword": [
      /\[?BITS (?:16|32|64)\]?/,
      {
        pattern: /(^\s*)section\s*[a-z.]+:?/im,
        lookbehind: true
      },
      /(?:extern|global)[^\n;]*/i,
      /(?:CPU|DEFAULT|FLOAT).*/
    ],
    "register": {
      pattern: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|di|si|sp)|[cdefgs]s)\b/i,
      alias: "variable"
    },
    "number": /(?:\b|(?=\$))(?:0[hx](?:\.[a-f\d]+|[a-f\d]+(?:\.[a-f\d]+)?)(?:p[+-]?\d+)?|\d[a-f\d]+[hx]|\$\d[a-f\d]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|(?:\d+(?:\.\d+)?|\.\d+)(?:\.?e[+-]?\d+)?[dt]?)\b/i,
    "operator": /[[\]%&|$!=<>/*+-]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/neon.js
  languages.neon = {
    "comment": /#.*/,
    "string": {
      pattern: /(^|[[{(=,:\s])(?:('''|""")\n(?:(?:[^\n]|\n(?![ 	]*\2))*\n)?[ 	]*\2|'[^\n']*'|"(?:\\.|[^\\\n"])*")/g,
      lookbehind: true,
      greedy: true
    },
    "datetime": {
      pattern: /(^|[[{(=,:\s])\d{4}-\d\d?-\d\d?(?:(?:[Tt]| +)\d\d?:\d\d:\d\d(?:\.\d*)? *(?:Z|[+-]\d\d?(?::?\d\d)?)?)?(?![^\s\]}),])/,
      lookbehind: true,
      alias: "number"
    },
    "key": {
      pattern: /(^|[[{(,\s])[^\s,:=()[\]{}"']+(?=\s*:(?:$|[\]}),\s])|\s*=)/,
      lookbehind: true,
      alias: "property"
    },
    "number": {
      pattern: /(^|[[{(=,:\s])[+-]?(?:0x[a-fA-F\d]+|0o[0-7]+|0b[01]+|(?:\d+(?:\.\d*)?|\.?\d+)(?:[eE][+-]?\d+)?)(?![^\s\]}),:=])/,
      lookbehind: true
    },
    "boolean": {
      pattern: /(^|[[{(=,:\s])(?:false|true|no|yes)(?![^\s\]}),:=])/i,
      lookbehind: true
    },
    "null": {
      pattern: /(^|[[{(=,:\s])(?:null)(?![^\s\]}),:=])/i,
      lookbehind: true,
      alias: "keyword"
    },
    "literal": {
      pattern: /(^|[[{(=,:\s])(?:[^\s#"'`()[\]{},:=-]|[:-][^\s"',=()[\]{}])(?:[^\s,:=()\]}]|:(?=[^\s,\]})])|[ 	]+[^\s#,:=()\]}])*/,
      lookbehind: true,
      alias: "string"
    },
    "punctuation": /[()[\]{},:=-]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/nevod.js
  languages.nevod = {
    "comment": /\/\/.*|\/\*[^]*?(?:\*\/|$)/,
    "string": {
      pattern: /(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))!?\*?/g,
      greedy: true,
      inside: {
        "string-attrs": /!$|!?\*$/
      }
    },
    "namespace": {
      pattern: /(@namespace\s+)[a-zA-Z\d.-]+(?=\s*\{)/,
      lookbehind: true
    },
    "pattern": {
      pattern: /(@pattern\s+)?#?[a-zA-Z\d.-]+(?:\s*\(\s*(?:~\s*)?[a-zA-Z\d.-]+\s*(?:,\s*(?:~\s*)?[a-zA-Z\d.-]*)*\))?(?=\s*=)/,
      lookbehind: true,
      inside: {
        "pattern-name": {
          pattern: /^#?[a-zA-Z\d.-]+/,
          alias: "class-name"
        },
        "fields": {
          pattern: /\(.*\)/,
          inside: {
            "field-name": {
              pattern: /[a-zA-Z\d.-]+/,
              alias: "variable"
            },
            "punctuation": /[(),]/,
            "operator": {
              pattern: /~/,
              alias: "field-hidden-mark"
            }
          }
        }
      }
    },
    "search": {
      pattern: /(@search\s+|#)[a-zA-Z\d.-]+(?:\.\*)?(?=\s*;)/,
      alias: "function",
      lookbehind: true
    },
    "keyword": /@(?:having|inside|namespace|outside|pattern|require|search|where)\b/,
    "standard-pattern": {
      pattern: /\b(?:Alpha|AlphaNum|Any|Blank|End|LineBreak|Num|NumAlpha|Punct|Space|Start|Symbol|Word|WordBreak)\b(?:\([a-zA-Z\d.,\s+-]*\))?/,
      inside: {
        "standard-pattern-name": {
          pattern: /^[a-zA-Z\d.-]+/,
          alias: "builtin"
        },
        "quantifier": {
          pattern: /\b\d+(?:\s*\+|\s*-\s*\d+)?(?!\w)/,
          alias: "number"
        },
        "standard-pattern-attr": {
          pattern: /[a-zA-Z\d.-]+/,
          alias: "builtin"
        },
        "punctuation": /[(),]/
      }
    },
    "quantifier": {
      pattern: /\b\d+(?:\s*\+|\s*-\s*\d+)?(?!\w)/,
      alias: "number"
    },
    "operator": [
      {
        pattern: /=/,
        alias: "pattern-def"
      },
      {
        pattern: /&/,
        alias: "conjunction"
      },
      {
        pattern: /~/,
        alias: "exception"
      },
      {
        pattern: /\?/,
        alias: "optionality"
      },
      {
        pattern: /[[\]]/,
        alias: "repetition"
      },
      {
        pattern: /[{}]/,
        alias: "variation"
      },
      {
        pattern: /[+_]/,
        alias: "sequence"
      },
      {
        pattern: /\.{2,3}/,
        alias: "span"
      }
    ],
    "field-capture": [
      {
        pattern: /([a-zA-Z\d.-]+\s*\()\s*[a-zA-Z\d.-]+\s*:\s*[a-zA-Z\d.-]+(?:\s*,\s*[a-zA-Z\d.-]+\s*:\s*[a-zA-Z\d.-]+)*(?=\s*\))/,
        lookbehind: true,
        inside: {
          "field-name": {
            pattern: /[a-zA-Z\d.-]+/,
            alias: "variable"
          },
          "colon": /:/
        }
      },
      {
        pattern: /[a-zA-Z\d.-]+\s*:/,
        inside: {
          "field-name": {
            pattern: /[a-zA-Z\d.-]+/,
            alias: "variable"
          },
          "colon": /:/
        }
      }
    ],
    "punctuation": /[(),:;]/,
    "name": /[a-zA-Z\d.-]+/
  };

  // node_modules/prism-code-editor/dist/prism/languages/nginx.js
  var variable3 = /\$(?:\w[a-z\d]*(?:_[^\0-\x1f\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i;
  languages.nginx = {
    "comment": {
      pattern: /(^|[\s{};])#.*/g,
      lookbehind: true,
      greedy: true
    },
    "directive": {
      pattern: /(^|\s)\w(?:\\.|[^\\\s"'{};]|"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "string": {
          pattern: /((?:^|[^\\])(?:\\\\)*)(?:"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*')/g,
          lookbehind: true,
          greedy: true,
          inside: {
            "escape": {
              pattern: /\\["'\\nrt]/,
              alias: "entity"
            },
            "variable": variable3
          }
        },
        "comment": {
          pattern: /(\s)#.*/g,
          lookbehind: true,
          greedy: true
        },
        "keyword": {
          pattern: /^\S+/g,
          greedy: true
        },
        // other patterns
        "boolean": {
          pattern: /(\s)(?:off|on)(?!\S)/,
          lookbehind: true
        },
        "number": {
          pattern: /(\s)\d+[a-z]*(?!\S)/i,
          lookbehind: true
        },
        "variable": variable3
      }
    },
    "punctuation": /[{};]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/nim.js
  languages.nim = {
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "string": {
      // Double-quoted strings can be prefixed by an identifier (Generalized raw string literals)
      pattern: /(?:\b(?!\d)(?:\w|\\x[89a-fA-F][a-fA-F\d])+)?(?:"""[^]*?"""(?!")|"(?:\\[^]|""|[^\\"])*")/g,
      greedy: true
    },
    "char": {
      // Character literals are handled specifically to prevent issues with numeric type suffixes
      pattern: /'(?:\\(?:\d+|x[a-fA-F\d]{0,2}|.)|[^'])'/g,
      greedy: true
    },
    "function": {
      pattern: /(?:(?!\d)(?:\w|\\x[89a-fA-F][a-fA-F\d])+|`[^\n`]+`)\*?(?:\[[^\]]+\])?(?=\s*\()/g,
      greedy: true,
      inside: {
        "operator": /\*$/
      }
    },
    // We don't want to highlight operators (and anything really) inside backticks
    "identifier": {
      pattern: /`[^\n`]+`/g,
      greedy: true,
      inside: {
        "punctuation": /`/
      }
    },
    // The negative look ahead prevents wrong highlighting of the .. operator
    "number": /\b(?:0[xXoObB][a-fA-F\d_]+|\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)(?:'?[iuf]\d*)?/,
    "keyword": /\b(?:addr|asm?|atomic|bind|block|break|cas[et]|concept|const|continue|converter|defer|discard|distinct|do|elif|else|end|enum|except|export|finally|for|from|func|generic|if|import|include|interface|iterator|let|macro|method|mixin|nil|object|out|proc|ptr|raise|ref|return|static|template|try|tuple|type|using|var|when|while|with|without|yield)\b/,
    "operator": {
      // Look behind and look ahead prevent wrong highlighting of punctuations [. .] {. .} (. .)
      // but allow the slice operator .. to take precedence over them
      // One can define his own operators in Nim so all combination of operators might be an operator.
      pattern: /(^|[({\[](?=\.\.)|(?![({\[]\.).)(?:(?:[\\@$~?:%&|^!=<>/*+-]|\.\.|\.(?![)}\]]))+|\b(?:and|div|in|isnot|is|mod|notin|not|of|sh[lr]|x?or)\b)/m,
      lookbehind: true
    },
    "punctuation": /[({[]\.|\.[)}\]]|[`()[\]{},:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/nix.js
  var interpolation7 = {
    // The lookbehind ensures the ${} is not preceded by \ or ''
    pattern: /(^|(?:^|(?!'').)[^\\])\$\{(?:[^{}]|\{[^}]*\})*\}/,
    lookbehind: true
  };
  interpolation7.inside = languages.nix = {
    "comment": /\/\*[^]*?\*\/|#.*/,
    "string": {
      pattern: /"(?:\\[^]|[^\\"])*"|''(?:(?!'')[^]|''(?:'|\\|\$\{))*''/g,
      greedy: true,
      inside: {
        "interpolation": interpolation7
      }
    },
    "url": {
      pattern: /\b(?:[a-z]{3,7}:\/\/)[\w%~/.:#=?&+-]+|([^/])(?:[\w%~.:#=?&+-]*(?!\/\/)[\w%~/.:#=?&+-])?(?!\/\/)\/[\w%~/.:#=?&+-]*/,
      lookbehind: true
    },
    "antiquotation": {
      pattern: /\$(?=\{)/,
      alias: "important"
    },
    "number": /\b\d+\b/,
    "keyword": /\b(?:assert|builtins|else|if|in|inherit|let|null|or|then|with)\b/,
    "function": /\b(?:abort|add|all|any|attrNames|attrValues|baseNameOf|compareVersions|concatLists|currentSystem|deepSeq|derivation|dirOf|div|elem(?:At)?|fetch(?:Tarball|url)|filter(?:Source)?|fromJSON|genList|getAttr|getEnv|hasAttr|hashString|head|import|intersectAttrs|is(?:Attrs|Bool|Function|Int|List|Null|String)|length|lessThan|listToAttrs|map|mul|parseDrvName|pathExists|read(?:Dir|File)|removeAttrs|replaceStrings|seq|sort|stringLength|sub(?:string)?|tail|throw|to(?:File|JSON|Path|String|XML)|trace|typeOf)\b|\bfoldl'\B/,
    "boolean": boolean,
    "operator": /[!=<>]=?|\+\+?|&&|\|\||\/\/|->?|[?@]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/nsis.js
  languages.nsis = {
    "comment": /\/\*[^]*?\*\/|[#;].*/,
    "string": {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true
    },
    "keyword": {
      pattern: /(^[ 	]*)(?:Abort|Add(?:BrandingImage|Size)|AdvSplash|Allow(?:RootDirInstall|SkipFiles)|AutoCloseWindow|BG(?:Font|Gradient|Image)|Banner|BrandingText|BringToFront|CRCCheck|Call(?:InstDLL)?|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|Create(?:Directory|Font|ShortCut)|Delete(?:INISec|INIStr|RegKey|RegValue)?|Detail(?:Print|sButtonText)|Dialer|Dir(?:Text|Var|Verify)|EnableWindow|Enum(?:RegKey|RegValue)|Exch|Exec(?:Shell(?:Wait)?|Wait)?|ExpandEnvStrings|File(?:BufSize|Close|ErrorText|Open|Read|ReadByte|ReadUTF16LE|ReadWord|Seek|Write|WriteByte|WriteUTF16LE|WriteWord)?|Find(?:Close|First|Next|Window)|FlushINI|Get(?:CurInstType|CurrentAddress|DLLVersion(?:Local)?|DlgItem|ErrorLevel|FileTime(?:Local)?|FullPathName|Function(?:Address|End)?|InstDirError|KnownFolderPath|LabelAddress|TempFileName|WinVer)|Goto|HideWindow|Icon|If(?:Abort|Errors|FileExists|RebootFlag|RtlLanguage|ShellVarContextAll|Silent)|InitPluginsDir|InstProgressFlags|Inst(?:Type(?:GetText|SetText)?)|Install(?:ButtonText|Colors|Dir(?:RegKey)?)|Int(?:64|Ptr)?CmpU?|Int(?:64)?Fmt|Int(?:Ptr)?Op|IsWindow|Lang(?:DLL|String)|License(?:BkColor|Data|ForceSelection|LangString|Text)|LoadLanguageFile|LockWindow|Log(?:Set|Text)|Manifest(?:DPIAware|SupportedOS)|Math|MessageBox|MiscButtonText|NSISdl|Name|Nop|OutFile|PE(?:DllCharacteristics|SubsysVer)|Page(?:Callbacks)?|Pop|Push|Quit|RMDir|Read(?:EnvStr|INIStr|RegDWORD|RegStr)|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|SearchPath|Section(?:End|[GS]etFlags|[GS]etInstTypes|[GS]etSize|[GS]etText|Group|In)?|SendMessage|Set(?:AutoClose|BrandingImage|Compress|Compressor(?:DictSize)?|CtlColors|CurInstType|DatablockOptimize|DateSave|Details(?:Print|View)|ErrorLevel|Errors|FileAttributes|Font|OutPath|Overwrite|PluginUnload|RebootFlag|RegView|ShellVarContext|Silent)|Show(?:InstDetails|UninstDetails|Window)|Silent(?:Install|UnInstall)|Sleep|SpaceTexts|Splash|StartMenu|Str(?:CmpS?|Cpy|Len)|SubCaption|System|Target|UnRegDLL|Unicode|UninstPage|Uninstall(?:ButtonText|Caption|Icon|SubCaption|Text)|UserInfo|VI(?:AddVersionKey|FileVersion|ProductVersion)|VPatch|Var|WindowIcon|Write(?:INIStr|Reg(?:Bin|DWORD|ExpandStr|MultiStr|None|Str)|Uninstaller)|XPStyle|ns(?:Dialogs|Exec))\b/m,
      lookbehind: true
    },
    "property": /\b(?:ARCHIVE|FILE_ATTRIBUTE_(?:ARCHIVE|NORMAL|OFFLINE|READONLY|SYSTEM|TEMPORARY)|HK(?:(?:CR|CU|LM)(?:32|64)?|DD|PD|U)|HKEY_(?:CLASSES_ROOT|CURRENT_CONFIG|CURRENT_USER|DYN_DATA|LOCAL_MACHINE|PERFORMANCE_DATA|USERS)|ID(?:ABORT|CANCEL|IGNORE|NO|OK|RETRY|YES)|MB_(?:ABORTRETRYIGNORE|DEFBUTTON[1-4]|ICONEXCLAMATION|ICONINFORMATION|ICONQUESTION|ICONSTOP|OK|OKCANCEL|RETRYCANCEL|RIGHT|RTLREADING|SETFOREGROUND|TOPMOST|USERICON|YESNO)|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY|admin|all|auto|both|colored|false|true|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|user)\b/,
    "constant": /\$\{[!\w.:^-]+\}|\$\([!\w.:^-]+\)/,
    "variable": /\$\w[\w.]*/,
    "number": /\b0x[a-fA-F\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
    "operator": /--?|\+\+?|<=?|>=?|==?=?|&&?|\|\|?|[?~^%/*]/,
    "punctuation": clikePunctuation,
    "important": {
      pattern: /(^[ 	]*)!(?:addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversion|gettlbversion|if|ifdef|ifmacrodef|ifmacrondef|ifndef|include|insertmacro|macro|macroend|makensis|packhdr|pragma|searchparse|searchreplace|system|tempfile|undef|verbose|warning)\b/im,
      lookbehind: true
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/objectivec.js
  languages.objc = languages.objectivec = extend("c", {
    "string": {
      pattern: /@?"(?:\\[^]|[^\\\n"])*"/g,
      greedy: true
    },
    "keyword": /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int?|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    "operator": /-[->]?|\+\+?|!=?|==?|>>?=?|<<?=?|&&?|\|\|?|[~^@%?/*]/
  });
  delete languages.objc["class-name"];

  // node_modules/prism-code-editor/dist/prism/languages/ocaml.js
  languages.ocaml = {
    "comment": /\(\*[^]*?\*\)/,
    "char": {
      pattern: /'(?:[^\\\n']|\\(?:.|[ox]?[a-f\d]{1,3}))'/gi,
      greedy: true
    },
    "string": {
      pattern: /"(?:\\[^]|[^\\\n"])*"|\{([a-z_]*)\|[^]*?\|\1\}/g,
      greedy: true
    },
    "number": [
      // binary and octal
      /\b(?:0b[01][01_]*|0o[0-7][0-7_]*)\b/i,
      // hexadecimal
      /\b0x[a-f\d][a-f\d_]*(?:\.[a-f\d_]*)?(?:p[+-]?\d[\d_]*)?(?!\w)/i,
      // decimal
      /\b\d[\d_]*(?:\.[\d_]*)?(?:e[+-]?\d[\d_]*)?(?!\w)/i
    ],
    "directive": {
      pattern: /\B#\w+/,
      alias: "property"
    },
    "label": {
      pattern: /\B~\w+/,
      alias: "property"
    },
    "type-variable": {
      pattern: /\B'\w+/,
      alias: "function"
    },
    "variant": {
      pattern: /`\w+/,
      alias: "symbol"
    },
    // For the list of keywords and operators,
    // see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
    "keyword": /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|[tw]hen|to|try|type|val|value|virtual|where|while|with)\b/,
    "boolean": boolean,
    "operator-like-punctuation": {
      pattern: /\[[<>|]|[>|]\]|\{<|>\}/,
      alias: "punctuation"
    },
    // Custom operators are allowed
    "operator": /\.[.~]|:[=>]|[@$?~%&|^!=<>/*+-][.:/@$?~%&|^!=<>/*+-]*|\b(?:and|asr|land|ls[lr]|lx?or|mod|or)\b/,
    "punctuation": /;;|::|[()[\]{}.,:;#]|\b_\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/odin.js
  var escapes = /\\(?:["'\\abefnrtv]|0[0-7]{2}|U[a-fA-F\d]{6}|u[a-fA-F\d]{4}|x[a-fA-F\d]{2})/;
  languages.odin = {
    /**
     * The current implementation supports only 1 level of nesting.
     *
     * @author Michael Schmidt
     * @author edukisto
     */
    "comment": {
      pattern: /\/\/.*|#!.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:\*(?!\/)|[^*])*(?:\*\/|$))*(?:\*\/|$)/g,
      greedy: true
    },
    /**
     * Should be found before strings because of '"'"- and '`'`-like sequences.
     */
    "char": {
      pattern: /'(?:\\(?:.|[0Uux][a-fA-F\d]{1,6})|[^\n'\\])'/g,
      greedy: true,
      inside: {
        "symbol": escapes
      }
    },
    "string": [
      {
        pattern: /`[^`]*`/g,
        greedy: true
      },
      {
        pattern: /"(?:\\.|[^\\\n"])*"/g,
        greedy: true,
        inside: {
          "symbol": escapes
        }
      }
    ],
    "directive": {
      pattern: /#\w+/,
      alias: "property"
    },
    "number": /\b0(?:b[01_]+|d[\d_]+|h_*(?:(?:(?:[a-fA-F\d]_*){8}){1,2}|(?:[a-fA-F\d]_*){4})|o[0-7_]+|x[a-fA-F\d_]+|z[\dAB_ab]+)\b|(?:\b\d+(?:\.(?!\.)\d*)?|\B\.\d+)(?:[Ee][+-]?\d*)?[ijk]?(?!\w)/,
    "discard": {
      pattern: /\b_\b/,
      alias: "keyword"
    },
    "procedure-definition": {
      pattern: /\b\w+(?=[ 	]*(?::\s*){2}proc\b)/,
      alias: "function"
    },
    "keyword": /\b(?:asm|auto_cast|bit_set|break|cas[et]|context|continue|defer|distinct|do|dynamic|else|enum|fallthrough|for|foreign|if|import|in|map|matrix|not_in|or_else|or_return|package|proc|return|struct|switch|transmute|typeid|union|using|when|where)\b/,
    /**
     * false, nil, true can be used as procedure names. "_" and keywords can't.
     */
    "procedure-name": {
      pattern: /\b\w+(?=[ 	]*\()/,
      alias: "function"
    },
    "boolean": /\b(?:false|true|nil)\b/,
    "constant-parameter-sign": {
      pattern: /\$/,
      alias: "important"
    },
    "undefined": {
      pattern: /---/,
      alias: "operator"
    },
    "arrow": {
      pattern: /->/,
      alias: "punctuation"
    },
    "operator": /--|\+\+|\.\.[<=]?|(?:&~|[~!=/*+-]|[%&|<>]{1,2})=?|[?^]/,
    "punctuation": /[()[\]{}.,:;@]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/openqasm.js
  languages.qasm = languages.openqasm = {
    "string": /"[^\n	"]*"|'[^\n	']*'/,
    "comment": clikeComment(),
    "keyword": /\b(?:CX|OPENQASM|U|barrier|boxas|boxto|break|const|continue|ctrl|def|defcal|defcalgrammar|delay|else|end|for|gate|gphase|if|include|inv?|kernel|lengthof|let|measure|pow|reset|return|rotary|stretchinf|while)\b|#pragma\b/,
    "class-name": /\b(?:angle|bit|bool|[cq]reg|fixed|float|length|qubit|stretch|u?int)\b/,
    "function": /\b(?:cos|exp|ln|popcount|rot[lr]|sin|sqrt|tan)\b(?=\s*\()/,
    "constant": /\b(?:euler|pi|tau)\b|π|𝜏|ℇ/,
    "number": {
      pattern: /(^|[^$\w.])(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?(?:dt|[nuµm]?s)?/i,
      lookbehind: true
    },
    "operator": /->|--|\+\+|&&|\|\||>>=?|<<=?|[~%&|^!=<>/*+-]=?|@/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/oz.js
  languages.oz = {
    "comment": {
      pattern: /\/\*[^]*?\*\/|%.*/g,
      greedy: true
    },
    "string": {
      pattern: /"(?:\\[^]|[^\\"])*"/g,
      greedy: true
    },
    "atom": {
      pattern: /'(?:\\[^]|[^\\'])*'/g,
      greedy: true,
      alias: "builtin"
    },
    "keyword": /\$|\[\]|\b(?:_|at|attr|case|catch|choice|class|cond|declare|define|dis|else(?:case|if)?|end|export|fail|false|true|feat|finally|from|fun|functor|if|import|in|local|lock|meth|nil|not|of|or|prepare|pro[cp]|raise|require|self|skip|then|thread|try|unit)\b/,
    "function": {
      pattern: /\b[a-z][A-Za-z\d]*(?=\()|(\{)[A-Z][A-Za-z\d]*\b/,
      lookbehind: true
    },
    "number": /\b(?:0[bx][a-f\d]+|\d+(?:\.\d*)?(?:e~?\d+)?)\b|&(?:[^\\]|\\(?:\d{3}|.))/i,
    "variable": /`(?:\\.|[^\\`])+`/,
    "attr-name": /\b\w+(?=[ 	]*:(?![:=]))/,
    "operator": /:=|:::?|<[-:=]?|==|=<?:?|>=?:?|\\=:?|!!?|[|#,~^@/*+-]|\b(?:andthen|div|mod|orelse)\b/,
    "punctuation": /[()[\]{}.:;?]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/parigp.js
  languages.parigp = {
    "comment": /\/\*[^]*?\*\/|\\\\.*/,
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    // PARI/GP does not care about white spaces at all
    // so let's process the keywords to build an appropriate regexp
    // (e.g. "b *r *e *a *k", etc.)
    "keyword": RegExp(
      "\\b(?:" + "breakpoint|break|dbg_down|dbg_err|dbg_up|dbg_x|forcomposite|fordiv|forell|forpart|forprime|forstep|forsubgroup|forvec|for|iferr|if|local|my|next|return|until|while".replace(/\w/g, "$& *") + ")\\b"
    ),
    "function": /\b\w(?:[\w ]*\w)?(?= *\()/,
    "number": {
      // The lookbehind and the negative lookahead prevent from breaking the .. operator
      pattern: /(\. *\. *)?(?:\b\d(?: *\d)*(?: *(?!\. *\.)\.(?: *\d)*)?|\. *\d(?: *\d)*)(?: *e *(?:[+-] *)?\d(?: *\d)*)?/i,
      lookbehind: true
    },
    "operator": /\. *\.|[*/!](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\+(?: *[+=])?|-(?: *[-=>])?|<(?: *>|(?: *<)?(?: *=)?)?|>(?: *>)?(?: *=)?|=(?: *=){0,2}|\\(?: *\/)?(?: *=)?|&(?: *&)?|\| *\||['#~^]/,
    "punctuation": /[()[\]{}.,:;|]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/parser.js
  var keyword2 = {
    pattern: /(^|[^^])(?:\^(?:case|eval|for|if|switch|throw)\b|@(?:BASE|CLASS|GET(?:_DEFAULT)?|OPTIONS|SET_DEFAULT|USE)\b)/,
    lookbehind: true
  };
  var variable4 = {
    pattern: /(^|[^^])\B\$(?:\w+|(?=[.{]))(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
    lookbehind: true,
    inside: {
      "punctuation": /\.|:+/
    }
  };
  var func = {
    pattern: /(^|[^^])\B[@^]\w+(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
    lookbehind: true,
    inside: {
      "keyword": {
        pattern: /(^@)(?:GET_|SET_)/,
        lookbehind: true
      },
      "punctuation": /\.|:+/
    }
  };
  var escape3 = {
    pattern: /\^(?:[$^;@()[\]{}"':]|#[a-f\d]*)/i,
    alias: "builtin"
  };
  var punctuation = /[()[\]{};]/;
  var expression8 = {
    // Allow for 3 levels of depth
    pattern: /(^|[^^])\((?:[^()]|\((?:[^()]|\([^)]*\))*\))*\)/g,
    lookbehind: true,
    greedy: true,
    inside: {
      "string": {
        pattern: /(^|[^^])(["'])(?:(?!\2)[^^]|\^[^])*\2/,
        lookbehind: true
      },
      "keyword": keyword2,
      "variable": variable4,
      "function": func,
      "boolean": boolean,
      "number": /\b(?:0x[a-f\d]+|\d+(?:\.\d*)?(?:e[+-]?\d+)?)\b/i,
      "escape": escape3,
      "operator": /[~/\\%*+]|!\|\|?|&&?|\|\|?|==|>>|<<|[!<>]=?|-[fd]?|\b(?:def|eq|[gl][et]|in|is|ne)\b/,
      "punctuation": punctuation
    }
  };
  var parser = languages.parser = extend("html", {
    "parser-comment": {
      pattern: /(\s)#.*/,
      lookbehind: true,
      alias: "comment"
    },
    "expression": expression8,
    "keyword": keyword2,
    "variable": variable4,
    "function": func,
    "escape": escape3,
    "punctuation": punctuation
  });
  insertBefore(parser["tag"].inside["attr-value"][2].inside, "punctuation", {
    "expression": expression8,
    "keyword": keyword2,
    "variable": variable4,
    "function": func,
    "escape": escape3,
    "parser-punctuation": {
      pattern: punctuation,
      alias: "punctuation"
    }
  });
  delete parser["markup-bracket"];

  // node_modules/prism-code-editor/dist/prism/languages/pascal.js
  var asm = {
    pattern: /(\basm\b)[^]+?(?=\bend\s*[;[])/gi,
    lookbehind: true,
    greedy: true
  };
  languages.objectpascal = asm.inside = languages.pascal = {
    "directive": {
      pattern: /\{\$[^]*?\}/g,
      greedy: true,
      alias: "marco property"
    },
    "comment": {
      pattern: /\(\*[^]*?\*\)|\{[^]*?\}|\/\/.*/g,
      greedy: true
    },
    "string": {
      pattern: /(?:'(?:''|[^\n'])*'(?!')|#[&$%]?[a-f\d]+)+|\^[a-z]/gi,
      greedy: true
    },
    "asm": asm,
    "keyword": [
      {
        // Turbo Pascal
        pattern: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i,
        lookbehind: true
      },
      {
        // Free Pascal
        pattern: /(^|[^&])\b(?:dispose|exit|false|true|new)\b/i,
        lookbehind: true
      },
      {
        // Object Pascal
        pattern: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i,
        lookbehind: true
      },
      {
        // Modifiers
        pattern: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i,
        lookbehind: true
      }
    ],
    // Hexadecimal, octal and binary, Decimal
    "number": /[&%]\d+|\$[a-f\d]+|\b\d+(?:\.\d+)?(?:e[+-]?\d+)?/i,
    "operator": {
      pattern: /\.\.|\*\*|:=|<>|>>|<<|[<>/*+-]=?|[@^=]|(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|x?or|sh[lr])\b/,
      lookbehind: true
    },
    "punctuation": /\(\.|\.\)|[()[\].,:;]/
  };
  asm.inside = extend("pascal", {
    "asm": void 0,
    "keyword": void 0,
    "operator": void 0
  });

  // node_modules/prism-code-editor/dist/prism/languages/pascaligo.js
  var type3 = replace("(?:\\b\\w+<0>?|<0>)", ["\\((?:[^()]|\\((?:[^()]|\\([^)]*\\))*\\))*\\)"]);
  var classNameInside2 = {};
  var className5 = [
    {
      pattern: re("(\\btype\\s+\\w+\\s+is\\s+)<0>", [type3], "i"),
      lookbehind: true,
      inside: classNameInside2
    },
    {
      pattern: re("<0>(?=\\s+is\\b)", [type3], "i"),
      inside: classNameInside2
    },
    {
      pattern: re("(:\\s*)<0>", [type3]),
      lookbehind: true,
      inside: classNameInside2
    }
  ];
  var pascaligo = languages.pascaligo = {
    "comment": /\(\*[^]+?\*\)|\/\/.*/,
    "string": {
      pattern: /(["'`])(?:\\[^]|(?!\1)[^\\])*\1|\^[a-z]/gi,
      greedy: true
    },
    "class-name": className5,
    "keyword": {
      pattern: /(^|[^&])\b(?:begin|block|case|const|else|end|fail|for|from|function|if|is|nil|of|remove|return|skip|then|type|var|while|with)\b/i,
      lookbehind: true
    },
    "boolean": {
      pattern: /(^|[^&])\b(?:false|true)\b/i,
      lookbehind: true
    },
    "builtin": {
      pattern: /(^|[^&])\b(?:bool|int|list|map|nat|record|string|unit)\b/i,
      lookbehind: true
    },
    "function": /\b\w+(?=\s*\()/,
    "number": [
      // Hexadecimal, octal and binary
      /%[01]+|&[0-7]+|\$[a-f\d]+/i,
      // Decimal
      /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?(?:mtz|n)?/i
    ],
    "operator": /->|=\/=|\.\.|\*\*|:=|<>|>>|<<|[<>/*+-]=?|[@|^=]|\b(?:and|mod|or)\b/,
    "punctuation": /\(\.|\.\)|[()[\]{}.,:;]/
  };
  ["comment", "keyword", "builtin", "operator", "punctuation"].forEach((key) => {
    classNameInside2[key] = pascaligo[key];
  });

  // node_modules/prism-code-editor/dist/prism/languages/pcaxis.js
  languages.px = languages.pcaxis = {
    "string": /"[^"]*"/,
    "keyword": {
      pattern: /((?:^|;)\s*)[-A-Z\d]+(?:\s*\[[-\w]+\])?(?:\s*\("[^"]*"(?:,\s*"[^"]*")*\))?(?=\s*=)/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "keyword": /^[-A-Z\d]+/,
        "language": {
          pattern: /^(\s*)\[[-\w]+\]/,
          lookbehind: true,
          inside: {
            "punctuation": /^\[|\]$/,
            "property": /[-\w]+/
          }
        },
        "sub-key": {
          pattern: /^(\s*)\S[^]*/,
          lookbehind: true,
          inside: {
            "parameter": {
              pattern: /"[^"]*"/,
              alias: "property"
            },
            "punctuation": /^\(|\)$|,/
          }
        }
      }
    },
    "operator": /=/,
    "tlist": {
      pattern: /TLIST\s*\(\s*\w+(?:(?:\s*,\s*"[^"]*")+|\s*,\s*"[^"]*"-"[^"]*")?\s*\)/g,
      greedy: true,
      inside: {
        "function": /^TLIST/,
        "property": {
          pattern: /^(\s*\(\s*)\w+/,
          lookbehind: true
        },
        "string": /"[^"]*"/,
        "punctuation": /[(),]/,
        "operator": /-/
      }
    },
    "punctuation": /[;,]/,
    "number": {
      pattern: /(^|\s)\d+(?:\.\d+)?(?!\S)/,
      lookbehind: true
    },
    "boolean": /NO|YES/
  };

  // node_modules/prism-code-editor/dist/prism/languages/peoplecode.js
  languages.pcode = languages.peoplecode = {
    "comment": /\/\*[^]*?\*\/|\bREM[^;]*;|<\*(?:[^<*]|\*(?!>)|<(?!\*)|<\*(?:(?!\*>)[^])*\*>)*\*>|\/\+[^]*?\+\//,
    "string": {
      pattern: /'(?:''|[^\n'])*'(?!')|"(?:""|[^\n"])*"(?!")/g,
      greedy: true
    },
    "variable": /%\w+/,
    "function-definition": {
      pattern: /((?:^|[^\w-])(?:function|method)\s+)\w+/i,
      lookbehind: true,
      alias: "function"
    },
    "class-name": {
      pattern: /((?:^|[^-\w])(?:as|catch|class|component|create|extends|global|implements|instance|local|of|property|returns)\s+)\w+(?::\w+)*/i,
      lookbehind: true,
      inside: {
        "punctuation": /:/
      }
    },
    "keyword": /\b(?:abstract|alias|as|catch|class|component|constant|create|declare|else|end-(?:class|evaluate|for|function|[gs]et|if|method|try|while)|evaluate|extends|for|function|[gs]et|global|if|implements|import|instance|library|local|method|null|of|out|peoplecode|private|program|property|protected|readonly|ref|repeat|returns?|step|throw|to|try|until|value|when-other|[tw]hen|while)\b/i,
    "operator-keyword": {
      pattern: /\b(?:and|not|or)\b/i,
      alias: "operator"
    },
    "function": /[_a-z]\w*(?=\s*\()/i,
    "boolean": /\b(?:false|true)\b/i,
    "number": /\b\d+(?:\.\d+)?\b/,
    "operator": /<>|[<>]=?|!=|\*\*|[@|=/*+-]/,
    "punctuation": /[()[\].,:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/perl.js
  var brackets = "(?:\\((?:\\\\[\\s\\S]|[^\\\\()])*\\)|\\{(?:\\\\[\\s\\S]|[^\\\\{}])*\\}|\\[(?:\\\\[\\s\\S]|[^\\\\[\\]])*\\]|<(?:\\\\[\\s\\S]|[^\\\\<>])*>)";
  var a = "(?![a-zA-Zd])\\s*(?:([^a-zA-Zd\\s{([<])(?:\\\\[^]|(?!\\1)[^\\\\])*\\1|([a-zA-Zd])(?:\\\\[^]|(?!\\2)[^\\\\])*\\2";
  languages.perl = {
    "comment": [
      {
        // POD
        pattern: /(^\s*)=\w[^]*?=cut.*/mg,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\$])#.*/g,
        lookbehind: true,
        greedy: true
      }
    ],
    // TODO Could be nice to handle Heredoc too.
    "string": {
      pattern: RegExp(
        `\\bq[qwx]?${a}|${brackets})|("|\`)(?:\\\\[^]|(?!\\3)[^\\\\])*\\3|'(?:\\\\.|[^\\\\
'])*'`,
        "g"
      ),
      greedy: true
    },
    "regex": [
      {
        pattern: RegExp(
          `\\b(?:m|qr)${a}|${brackets})[msixpodualngc]*`,
          "g"
        ),
        greedy: true
      },
      // The lookbehinds prevent -s from breaking
      {
        pattern: RegExp(
          `(^|[^-])\\b(?:s|tr|y)(?![a-zA-Zd])\\s*(?:([^a-zA-Zd\\s{([<])(?:\\\\[^]|(?!\\2)[^\\\\])*\\2(?:\\\\[^]|(?!\\2)[^\\\\])*\\2|([a-zA-Zd])(?:\\\\[^]|(?!\\3)[^\\\\])*\\3(?:\\\\[^]|(?!\\3)[^\\\\])*\\3|${brackets}\\s*${brackets})[msixpodualngcer]*`,
          "g"
        ),
        lookbehind: true,
        greedy: true
      },
      // /.../
      // The look-ahead tries to prevent two divisions on
      // the same line from being highlighted as regex.
      // This does not support multi-line regex.
      {
        pattern: /\/(?:\\.|[^\\\n/])*\/[msixpodualngc]*(?=\s*(?:$|[\n,.;})&|*~<>!?^+-]|(?:and|cmp|eq|[gl][et]|ne|not|x|x?or)\b))/g,
        greedy: true
      }
    ],
    // FIXME Not sure about the handling of ::, ', and #
    "variable": /[&*$@%](?:\{\^[A-Z]+\}|\^[A-Z_]|#?(?=\{)|#?(?:(?:::)*'?(?!\d)[$\w]+(?![$\w]))+(?:::)*|\d+)|(?!%=)[$@%][!"#$%&'*,./:;<=>?@()[\]{}||^_`|~+-]/,
    "filehandle": {
      // <>, <FOO>, _
      pattern: /<(?![<=])\S*?>|\b_\b/,
      alias: "symbol"
    },
    "v-string": {
      // v1.2, 1.2.3
      pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,
      alias: "string"
    },
    "function": {
      pattern: /(\bsub[ 	]+)\w+/,
      lookbehind: true
    },
    "keyword": /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    "number": /\b(?:0x[a-fA-F\d](?:_?[a-fA-F\d])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
    "operator": /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|->|=>|=~|~~|<=>?|!~|--|\+\+|(?:\*\*|\/\/|&&|\|\||<<|>>|[~%&|^!=<>/*+-])=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:and|cmp|eq|[gl][et]|ne|not|x?or)\b/,
    "punctuation": /[()[\]{},:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/phpdoc.js
  insertBefore(
    languages.phpdoc = extend("javadoclike", {
      "parameter": {
        pattern: /(@(?:global|param|property(?:-read|-write)?|var)\s+(?:(?:\b[a-zA-Z]\w*|[|\\[\]])+\s+)?)\$\w+/,
        lookbehind: true
      }
    }),
    "keyword",
    {
      "class-name": [
        {
          pattern: /(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\s+)(?:\b[a-zA-Z]\w*|[|\\[\]])+/,
          lookbehind: true,
          inside: {
            "keyword": /\b(?:array|bool|boolean|callback|double|false|true|float|int|integer|mixed|null|object|resource|self|string|void)\b/,
            "punctuation": /[|\\()[\]]/
          }
        }
      ]
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/plant-uml.js
  var variable5 = /\$\w+|%[a-z]+%/;
  var expression9 = {
    pattern: /(\[)[^[\]]+(?=\])/,
    lookbehind: true
  };
  var arrowAttr = "\\[[^[\\]]*\\]";
  var arrowDirection = "(?:[drlu]|do|down|le|left|ri|right|up)";
  var arrowBody = "(?:-+" + arrowDirection + "-+|\\.+" + arrowDirection + "\\.+|-+(?:" + arrowAttr + "-*)?|" + arrowAttr + "-+|\\.+(?:" + arrowAttr + "\\.*)?|" + arrowAttr + "\\.+)";
  var arrowLeft = "(?:<<?|//?|\\\\\\\\?|<\\||[#*^+}xo])";
  var arrowRight = "(?:>>?|//?|\\\\\\\\?|\\|>|[#*^+{xo])";
  var arrowPrefix = "[[?]?[ox]?";
  var arrowSuffix = "[ox]?[\\]?]?";
  var arrow = arrowPrefix + "(?:" + arrowBody + arrowRight + "|" + arrowLeft + arrowBody + "(?:" + arrowRight + ")?)" + arrowSuffix;
  expression9.inside = languages.plantuml = languages["plant-uml"] = {
    "comment": {
      pattern: /(^[ 	]*)(?:'.*|\/'[^]*?'\/)/mg,
      lookbehind: true,
      greedy: true
    },
    "preprocessor": {
      pattern: /(^[ 	]*)!.*/mg,
      lookbehind: true,
      greedy: true,
      alias: "property",
      inside: {
        "variable": variable5
      }
    },
    "delimiter": {
      pattern: /(^[ 	]*)@(?:end|start)uml\b/mg,
      lookbehind: true,
      greedy: true,
      alias: "punctuation"
    },
    "arrow": {
      pattern: RegExp("(^|[^-.<>?|\\\\[\\]ox])" + arrow + "(?![-.<>?|\\\\\\]ox])", "g"),
      lookbehind: true,
      greedy: true,
      alias: "operator",
      inside: {
        "expression": expression9,
        "punctuation": /\[(?=$|\])|^\]/
      }
    },
    "string": {
      pattern: /"[^"]*"/g,
      greedy: true
    },
    "text": {
      pattern: /(\[[ 	]*\n+(?!\n))[^\]]+(?=\])/g,
      lookbehind: true,
      greedy: true,
      alias: "string"
    },
    "keyword": [
      {
        pattern: /^([ 	]*)(?:abstract\s+class|end\s+(?:box|fork|group|merge|note|ref|split|title)|(?:fork|split)(?:\s+again)?|activate|actor|agent|alt|annotation|artifact|autoactivate|autonumber|backward|binary|boundary|box|break|caption|card|case|circle|class|clock|cloud|collections|component|concise|control|create|critical|database|deactivate|destroy|detach|diamond|else|elseif|end|end[hr]note|endif|endswitch|endwhile|entity|enum|file|folder|footer|frame|group|[hr]?note|header|hexagon|hide|if|interface|label|legend|loop|map|namespace|network|newpage|node|nwdiag|object|opt|package|page|par|participant|person|queue|rectangle|ref|remove|repeat|restore|return|robust|scale|set|show|skinparam|stack|start|state|stop|storage|switch|title|together|usecase\/?|while)(?!\S)/mg,
        lookbehind: true,
        greedy: true
      },
      /\b(?:elseif|equals|not|while)(?=\s*\()/,
      /\b(?:as|is|then)\b/
    ],
    "divider": {
      pattern: /^==.+==$/mg,
      greedy: true,
      alias: "important"
    },
    "time": {
      pattern: /@(?:\d+(?:[:/]\d+){2}|[+-]?\d+|:[a-z]\w*(?:[+-]\d+)?)\b/gi,
      greedy: true,
      alias: "number"
    },
    "color": {
      pattern: /#(?:[a-z_]+|[a-fA-F\d]+)\b/,
      alias: "symbol"
    },
    "variable": variable5,
    "punctuation": /[()[\]{},:;]|\.{3}/
  };

  // node_modules/prism-code-editor/dist/prism/languages/plsql.js
  insertBefore(
    languages.plsql = extend("sql", {
      "comment": {
        pattern: /\/\*[^]*?\*\/|--.*/g,
        greedy: true
      },
      // https://docs.oracle.com/en/database/oracle/oracle-database/21/lnpls/plsql-reserved-words-keywords.html
      "keyword": /\b(?:a|accessible|add|agent|aggregate|alter|an[dy]|asc?|at|attribute|authid|avg|begin|between|bfile_base|binary|[bc]lob_base|b?lock|body|both|bound|bulk|by|byte|c|c?all|calling|cascade|case|character|charset|charsetform|charsetid|char_base|check|clo[ns]e|clusters?|colauth|collect|columns|comment|commit|committed|compiled|compress|connect|constant|constructor|context|continue|convert|count|crash|create|credential|current|cursor|customdatum|dangling|dat[ae]|date_base|day|declare|default|define|delete|desc|deterministic|directory|distinct|double|drop|duration|element|else|elsif|empty|end|escape|except|exceptions?|exclusive|execute|exists|exit|external|fetch|final|first|fixed|float|for|forall|force|from|function|general|goto|grant|group|hash|having|heap|hidden|hour|identified|i[fns]|immediate|immutable|including|index|indexes|indicator|indices|infinite|insert|instantiable|interface|intersect|interval|into?|invalidate|isolation|java|language|large|leading|length|level|library|like[24c]?|limit|limited|local|long|loop|ma[px]|maxlen|member|merge|min|minus|minute|mode?|modify|month|multiset|mutable|name|nan|national|native|n?char|new|nocompress|nocopy|not|nowait|null|number_base|object|ocicoll|ocidate|ocidatetime|ociduration|ociinterval|ociloblocator|ocinumber|ociraw|ociref|ocirefcursor|ocirowid|ocistring|ocitype|o[fnr]|old|only|opaque|open|operator|option|oracle|oradata|order|organization|orlany|orlvary|others|out|overlaps|overriding|package|parallel_enable|parameters?|parent|partition|pascal|persistable|pipe|pipelined|pluggable|polymorphic|pragma|precision|prior|private|procedure|public|raise|range|raw|read|record|re[fm]|reference|relies_on|remainder|rename|resource|result|result_cache|return|returning|reverse|revoke|rollback|row|sample|save|savepoint|[su]b[124]|second|segment|select|self|separate|sequence|serializable|set|share|short|size|size_t|some|sparse|sql|sqlcode|sqldata|sqlname|sqlstate|standard|start|static|stddev|stored|string|struct|style|submultiset|subpartition|substitutable|subtype|sum|synonym|tabauth|table|tdo|then?|time|timestamp|timezone_(?:abbr|hour|minute|region)|to|trailing|transaction|transactional|trusted|type|under|union|unique|unplug|unsigned|untrusted|update|use|using|valist|values?|variable|variance|v?array|varying|views?|void|when|where|while|with|work|wrapped|write|year|zone)\b/i,
      // https://docs.oracle.com/en/database/oracle/oracle-database/21/lnpls/plsql-language-fundamentals.html#GUID-96A42F7C-7A71-4B90-8255-CA9C8BD9722E
      "operator": /=>|[~^!<>:]=|\.\.|\|\||\*\*|[@%:=<>/*+-]/
    }),
    "operator",
    {
      "label": {
        pattern: /<<\s*\w+\s*>>/,
        alias: "symbol"
      }
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/powerquery.js
  languages.mscript = languages.pq = languages.powerquery = {
    "comment": clikeComment(),
    "quoted-identifier": {
      pattern: /#"(?:[^\n"]|"")*"(?!")/g,
      greedy: true
    },
    "string": {
      pattern: /(?:#!)?"(?:[^\n"]|"")*"(?!")/g,
      greedy: true
    },
    "constant": [
      /\bDay\.(?:Friday|Monday|Saturday|Sunday|Thursday|Tuesday|Wednesday)\b/,
      /\bTraceLevel\.(?:Critical|Error|Information|Verbose|Warning)\b/,
      /\bOccurrence\.(?:All|First|Last)\b/,
      /\bOrder\.(?:Ascending|Descending)\b/,
      /\bRoundingMode\.(?:AwayFromZero|Down|ToEven|TowardZero|Up)\b/,
      /\bMissingField\.(?:Error|Ignore|UseNull)\b/,
      /\bQuoteStyle\.(?:Csv|None)\b/,
      /\bJoinKind\.(?:FullOuter|Inner|LeftAnti|LeftOuter|RightAnti|RightOuter)\b/,
      /\bGroupKind\.(?:Global|Local)\b/,
      /\bExtraValues\.(?:Error|Ignore|List)\b/,
      /\bJoinAlgorithm\.(?:Dynamic|LeftHash|LeftIndex|PairwiseHash|RightHash|RightIndex|SortMerge)\b/,
      /\bJoinSide\.(?:Left|Right)\b/,
      /\bPrecision\.(?:Decimal|Double)\b/,
      /\bRelativePosition\.From(?:End|Start)\b/,
      /\bTextEncoding\.(?:Ascii|BigEndianUnicode|Unicode|Utf16|Utf8|Windows)\b/,
      /\b(?:Any|Binary|Date|DateTime|DateTimeZone|Duration|Function|Int16|Int32|Int64|Int8|List|Logical|None|Number|Record|Table|Text|Time)\.Type\b/,
      /\bnull\b/
    ],
    "boolean": boolean,
    "keyword": /\b(?:and|as|each|else|error|if|in|is|let|meta|not|nullable|optional|or|otherwise|section|shared|then|try|type)\b|#(?:binary|date|datetime|datetimezone|duration|infinity|nan|sections|shared|table|time)\b/,
    "function": {
      pattern: /(^|[^#\w.])[a-z_][\w.]*(?=\s*\()/i,
      lookbehind: true
    },
    "data-type": {
      pattern: /\b(?:any|anynonnull|binary|date|datetime|datetimezone|duration|function|list|logical|none|number|record|table|text|time)\b/,
      alias: "class-name"
    },
    "number": {
      pattern: /\b0x[a-f\d]+\b|(?:[+-]?(?:\b\d+\.)?\b\d+|[+-]\.\d+|(^|[^.])\B\.\d+)(?:e[+-]?\d+)?\b/i,
      lookbehind: true
    },
    "operator": /<?=>?|<>|>=|[&?@^<>/*+-]|\.{2,3}/,
    "punctuation": /[()[\]{},;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/powershell.js
  var stringFunction = {
    // Allow for one level of nesting
    pattern: /(^|[^`])\$\((?:\$\([^\n()]*\)|(?!\$\()[^\n)])*\)/,
    lookbehind: true
  };
  var variable6 = /\$\w+/;
  var boolean2 = /\$(?:false|true)\b/i;
  stringFunction.inside = languages.powershell = {
    "comment": {
      pattern: /(^|[^`])(?:#.*|<#[^]*?#>)/,
      lookbehind: true
    },
    "string": [
      {
        pattern: /"(?:`[^]|[^`"])*"/g,
        greedy: true,
        // Variable interpolation inside strings, and nested expressions
        inside: {
          "function": stringFunction,
          "boolean": boolean2,
          "variable": variable6
        }
      },
      {
        pattern: /'(?:[^']|'')*'/g,
        greedy: true
      }
    ],
    // Matches name spaces as well as casts, attribute decorators. Force starting with letter to avoid matching array indices
    // Supports two levels of nested brackets (e.g. `[OutputType([System.Collections.Generic.List[int]])]`)
    "namespace": /\[[a-z](?:[^[\]]|\[(?:[^[\]]|\[[^\]]*\])*\])*\]/i,
    "boolean": boolean2,
    "variable": variable6,
    // Cmdlets and aliases. Aliases should come last, otherwise "write" gets preferred over "write-host" for example
    // Get-Command | ?{ $_.ModuleName -match "Microsoft.PowerShell.(Util|Core|Management)" }
    // Get-Alias | ?{ $_.ReferencedCommand.Module.Name -match "Microsoft.PowerShell.(Util|Core|Management)" }
    "function": [
      /\b(?:add|approve|assert|backup|b?lock|checkpoint|clear|close|compare|complete|compress|confirm|connect|convert|convertfrom|convertto|copy|debug|deny|disable|disconnect|dismount|edit|enable|enter|exit|expand|export|find|foreach|format|get|grant|group|hide|import|initialize|install|invoke|join|limit|measure|merge|move|new|open|optimize|out|ping|pop|protect|publish|push|read|receive|redo|register|remove|rename|repair|request|reset|resize|resolve|restart|restore|resume|revoke|save|search|select|send|set|show|skip|sort|split|start|step|stop|submit|suspend|switch|sync|tee|test|trace|unblock|undo|uninstall|unlock|unprotect|unpublish|unregister|update|use|wait|watch|where|write)-[a-z]+\b/i,
      /\b(?:ac|cat|chdir|cl[cipv]|compare|copy|cp[ip]?|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|f[cltw]|gal|gbp|gc[is]?|gdr|g[ilmuv]|gps?|group|g?sv|[girs]wmi|iex|ii|ipal|ipcsv|ipsn|i?rm|iwr|kill|lp|ls|measure|m[ipv]|mount|move|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rdr?|ren|rmdir|rn?[ip]|rv|rvpa|sal|s[ap]ps|s[ap]sv|sb?p|sc|select|set|shcm|si|sleep|sls?|sort|start|tee|trcm|type|write)\b/i
    ],
    // per http://technet.microsoft.com/en-us/library/hh847744.aspx
    "keyword": /\b(?:begin|break|catch|class|continue|data|define|do|dynamicparam|else|elseif|end|exit|filter|finally|for|foreach|from|function|if|inlinescript|parallel|param|process|return|sequence|switch|throw|trap|try|until|using|var|while|workflow)\b/i,
    "operator": {
      pattern: /(^|\W)(?:!|-(?:b?and|b?x?or|as|(?:not)?(?:contains|in|like|match)|eq|[gl][et]|isnot|is|join|ne|not|replace|sh[lr])\b|--|\+\+|[%/*+-]=?)/i,
      lookbehind: true
    },
    "punctuation": /[()[\]{}.,;|]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/processing.js
  insertBefore(
    languages.processing = extend("clike", {
      "keyword": /\b(?:break|case|catch|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
      // Spaces are allowed between function name and parenthesis
      "function": /\b\w+(?=\s*\()/,
      "operator": />>|<<|&&?|\|\|?|[%?]|[!=<>/*+-]=?/
    }),
    "number",
    {
      // Special case: XML is a type
      "constant": /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
      "type": {
        pattern: /\b(?:boolean|byte|char|color|double|float|int|[A-Z]\w*)\b/,
        alias: "class-name"
      }
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/prolog.js
  languages.prolog = {
    // Syntax depends on the implementation
    "comment": {
      pattern: /\/\*[^]*?\*\/|%.*/g,
      greedy: true
    },
    // Depending on the implementation, strings may allow escaped newlines and quote-escape
    "string": {
      pattern: /(["'])(?:\1\1|\\[^]|(?!\1)[^\\\n])*\1(?!\1)/g,
      greedy: true
    },
    "builtin": /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
    // FIXME: Should we list all null-ary predicates (not followed by a parenthesis) like halt, trace, etc.?
    "function": /\b[a-z]\w*(?:(?=\()|\/\d+)/,
    "number": /\b\d+(?:\.\d*)?/,
    // Custom operators are allowed
    "operator": /[\\$?@.:;|^!=<>/*+-]+|\b(?:is|mod|not|xor)\b/,
    "punctuation": /[()[\]{},]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/promql.js
  var vectorMatching = "on|ignoring|group_right|group_left|by|without";
  languages.promql = {
    "comment": {
      pattern: /(^[ 	]*)#.*/m,
      lookbehind: true
    },
    "vector-match": {
      // Match the comma-separated label lists inside vector matching:
      pattern: RegExp("((?:" + vectorMatching + ")\\s*)\\([^)]*\\)"),
      lookbehind: true,
      inside: {
        "label-key": {
          pattern: /\b[^,]+\b/,
          alias: "attr-name"
        },
        "punctuation": /[(),]/
      }
    },
    "context-labels": {
      pattern: /\{[^{}]*\}/,
      inside: {
        "label-key": {
          pattern: /\b[a-z_]\w*(?=\s*(?:=|![=~]))/,
          alias: "attr-name"
        },
        "label-value": {
          pattern: /(["'`])(?:\\[^]|(?!\1)[^\\])*\1/g,
          greedy: true,
          alias: "attr-value"
        },
        "punctuation": /\{|\}|=~?|![=~]|,/
      }
    },
    "context-range": [
      {
        pattern: /\[[\w\s:]+\]/,
        // [1m]
        inside: {
          "punctuation": /[[\]:]/,
          "range-duration": {
            pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
            alias: "number"
          }
        }
      },
      {
        pattern: /(\boffset\s+)\w+/,
        // offset 1m
        lookbehind: true,
        inside: {
          "range-duration": {
            pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
            alias: "number"
          }
        }
      }
    ],
    "keyword": RegExp("\\b(?:sum|min|max|avg|group|stddev|stdvar|count|count_values|bottomk|topk|quantile|" + vectorMatching + "|offset)\\b", "i"),
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "number": /[+-]?(?:(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?\b|\b(?:0x[a-f\d]+|nan|inf)\b)/i,
    "operator": /[!=<>]=|[%^<>/*+-]|\b(?:and|or|unless)\b/i,
    "punctuation": /[()[\]{}.,;`]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/properties.js
  languages.properties = {
    "comment": /^[ 	]*[#!].*/m,
    "value": {
      pattern: /(^[ 	]*(?:\\[^]|[^\\\s:=])+(?: *[=:] *(?! )| ))(?:\\[^]|[^\\\n])+/m,
      lookbehind: true,
      alias: "attr-value"
    },
    "key": {
      pattern: /^[ 	]*(?:\\[^]|[^\\\s:=])+(?= *[=:]| )/m,
      alias: "attr-name"
    },
    "punctuation": /[=:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/protobuf.js
  var builtinTypes = /\b(?:bool|bytes|double|s?fixed(?:32|64)|float|[su]?int(?:32|64)|string)\b/;
  insertBefore(
    languages.protobuf = extend("clike", {
      "class-name": [
        {
          pattern: /(\b(?:enum|extend|message|service)\s+)(?!\d)\w+(?=\s*\{)/,
          lookbehind: true
        },
        {
          pattern: /(\b(?:rpc\s+\w+|returns)\s*\(\s*(?:stream\s+)?)\.?(?!\d)\w+(?:\.(?!\d)\w+)*(?=\s*\))/,
          lookbehind: true
        }
      ],
      "keyword": /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|returns|rpc(?=\s+\w)|service|stream|syntax|to)\b(?!\s*=\s*\d)/,
      "function": /\b[a-z_]\w*(?=\s*\()/i
    }),
    "operator",
    {
      "map": {
        pattern: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[a-z_]\w*\s*[=;])/i,
        alias: "class-name",
        inside: {
          "punctuation": /[<>.,]/,
          "builtin": builtinTypes
        }
      },
      "builtin": builtinTypes,
      "positional-class-name": {
        pattern: /(?:\b|\B\.)[a-z_]\w*(?:\.[a-z_]\w*)*(?=\s+[a-z_]\w*\s*[=;])/i,
        alias: "class-name",
        inside: {
          "punctuation": /\./
        }
      },
      "annotation": {
        pattern: /(\[\s*)[a-z_]\w*(?=\s*=)/i,
        lookbehind: true
      }
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/psl.js
  languages.psl = {
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "string": {
      pattern: /"(?:\\.|[^\\"])*"/g,
      greedy: true,
      inside: {
        "symbol": /\\[ntrbA-Z"\\]/
      }
    },
    "heredoc-string": {
      pattern: /<<<((?!\d)\w+)\n(?:.*\n)*?\1\b/g,
      alias: "string",
      greedy: true
    },
    "keyword": /\b(?:__multi|__single|case|default|do|else|elsif|exit|export|for|foreach|function|if|last|line|local|next|requires|return|switch|until|while|word)\b/,
    "constant": /\b(?:ALARM|CHART_ADD_GRAPH|CHART_DELETE_GRAPH|CHART_DESTROY|CHART_LOAD|CHART_PRINT|EOF|OFFLINE|OK|PSL_PROF_LOG|R_CHECK_HORIZ|R_CHECK_VERT|R_CLICKER|R_COLUMN|R_FRAME|R_ICON|R_LABEL|R_LABEL_CENTER|R_LIST_MULTIPLE|R_LIST_MULTIPLE_ND|R_LIST_SINGLE|R_LIST_SINGLE_ND|R_MENU|R_POPUP|R_POPUP_SCROLLED|R_RADIO_HORIZ|R_RADIO_VERT|R_ROW|R_SCALE_HORIZ|R_SCALE_VERT|R_SEP_HORIZ|R_SEP_VERT|R_SPINNER|R_TEXT_FIELD|R_TEXT_FIELD_LABEL|R_TOGGLE|TRIM_LEADING|TRIM_LEADING_AND_TRAILING|TRIM_REDUNDANT|TRIM_TRAILING|VOID|WARN)\b/,
    "boolean": /\b(?:FALSE|[Ff]alse|NO|No|TRUE|[Tt]rue|YES|[Yy]es|no)\b/,
    "variable": /\b(?:PslDebug|errno|exit_status)\b/,
    "builtin": {
      pattern: /\b(?:PslExecute|PslFunctionCall|PslFunctionExists|PslSetOptions|_snmp_debug|a?cos|add_diary|annotate|annotate_get|ascii_to_ebcdic|asctime|a?sin|a?tan|atexit|batch_set|blackout|cat|ceil|chan_exists|change_state|close|code_cvt|cond_signal|cond_wait|console_type|convert_base|convert_date|convert_locale_date|cosh|create|date|dcget_text|destroy|destroy_lock|dget_text|difference|dump_hist|ebcdic_to_ascii|encrypt|event_(?:archive|catalog_get|check|query|range_manage|range_query|report|schedule|trigger2?)|execute|exists|exp|fabs|file|floor|fmod|[fps]open|fseek|ftell|full_discovery|[gs]et|get_chan_info|get_ranges|get_text|get_vars|getenv|gethostinfo|getpid|getpname|grep|history|history_get_retention|in_transition|int|internal|intersection|is_var|isnumber|join|kill|length|lines|lock|lock_info|log10|loge?|matchline|msg_check|msg_get_format|msg_get_severity|msg_s?printf|nthargf?|nthlinef?|num_bytes|num_consoles|pconfig|poplines|pow|printf?|proc_exists|process|read|readln|refresh_parameters|remote_(?:check|close|event_query|event_trigger|file_send|open)|remove|replace|r?index|sec_check_priv|sec_store_get|sec_store_set|set_alarm_ranges|set_locale|share|sinh|sleep|snmp_(?:agent_config|agent_start|agent_stop|close|config|[gs]et|get_next|h_get|h_get_next|h_set|open|trap_(?:ignore|listen|raise_std_trap|receive|register_im|send)|walk)|sort|splitline|sprintf|sqrt|s?random|str_repeat|strcasecmp|subset|substr|system|tail|tanh|text_domain|time|tmpnam|tolower|toupper|trace_psl_process|trim|union|unique|unlock|unset|va_arg|va_start|write)\b/,
      alias: "builtin-function"
    },
    "foreach-variable": {
      pattern: /(\bforeach\s+(?:(?:\w+\b|"(?:\\.|[^\\"])*")\s+){0,2})(?!\d)\w+(?=\s*\()/g,
      lookbehind: true,
      greedy: true
    },
    "function": /\b[_a-z]\w*\b(?=\s*\()/i,
    "number": /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?)\b/i,
    "operator": /--|\+\+|[!=]~|(?:&&|\|\||<<|>>|[%&|^!=<>/*+-])=?|[.:?]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/pug.js
  var js3 = languages.js;
  var filter_pattern2 = "(^[ 	]*):<0>(?:$\\s*?\n\\1[ 	]+\\S.*)+";
  var langMap = {
    atpl: "twig",
    coffee: "coffeescript",
    sass: "scss"
  };
  var pug = languages.pug = {
    // Multiline stuff should appear before the rest
    // This handles both single-line and multi-line comments
    "comment": {
      pattern: /(^[ 	]*)\/\/.*(?:$\s*?\n\1[ 	]+\S.*)*/m,
      lookbehind: true
    },
    // All the tag-related part is in lookbehind
    // so that it can be highlighted by the "tag" pattern
    "multiline-script": {
      pattern: /(^([ 	]*)script\b.*\.[ 	]*)(?:$\s*?\n\2[ 	]+\S.*)+/m,
      lookbehind: true,
      inside: js3
    }
  };
  [
    "atpl",
    "coffee",
    "ejs",
    "handlebars",
    "less",
    "livescript",
    "markdown",
    "sass",
    "stylus"
  ].forEach((filter) => {
    var language2 = langMap[filter] || filter;
    pug["filter-" + filter] = {
      pattern: re(filter_pattern2, [filter], "m"),
      lookbehind: true,
      inside: {
        "filter-name": {
          pattern: /^:.+/,
          alias: "variable"
        },
        "text": {
          pattern: /\S[^]*/,
          alias: "language-" + language2,
          inside: language2
        }
      }
    };
  });
  Object.assign(pug, {
    "filter": {
      pattern: re(filter_pattern2, [".+"], "m"),
      lookbehind: true,
      inside: {
        "filter-name": {
          pattern: /^:.+/,
          alias: "variable"
        },
        "text": /\S[^]*/
      }
    },
    "multiline-plain-text": {
      pattern: /(^([ 	]*)[\w#.-]+\.[ 	]*)(?:$\s*?\n\2[ 	]+\S.*)+/m,
      lookbehind: true
    },
    "markup": {
      pattern: /(^[ 	]*)<.+/m,
      lookbehind: true,
      inside: languages.html
    },
    "doctype": {
      pattern: /((?:^|\n)[ 	]*)doctype(?: .+)?/,
      lookbehind: true
    },
    // This handle all conditional and loop keywords
    "flow-control": {
      pattern: /(^[ 	]*)(?:case|default|each|else|if|unless|when|while)\b(?: .+)?/m,
      lookbehind: true,
      inside: {
        "each": {
          pattern: /^each .+? in\b/,
          inside: {
            "keyword": /^\w+|in$/,
            "punctuation": /,/
          }
        },
        "branch": {
          pattern: /^\w+/,
          alias: "keyword"
        },
        [rest]: js3
      }
    },
    "keyword": {
      pattern: /(^[ 	]*)(?:append|block|extends|include|prepend)\b.+/m,
      lookbehind: true
    },
    "mixin": [
      // Declaration
      {
        pattern: /(^[ 	]*)mixin .+/m,
        lookbehind: true,
        inside: {
          "keyword": /^mixin/,
          "function": /\b\w+(?!\s*[^\s(])/,
          "punctuation": /[().,]/
        }
      },
      // Usage
      {
        pattern: /(^[ 	]*)\+.+/m,
        lookbehind: true,
        inside: {
          "name": {
            pattern: /^\+\w+/,
            alias: "function"
          },
          [rest]: js3
        }
      }
    ],
    "script": {
      pattern: /(^[ 	]*script(?:(?:&[^(]+)?\([^)]+\))*[ 	]).+/m,
      lookbehind: true,
      inside: js3
    },
    "plain-text": {
      pattern: /(^[ 	]*(?!-)[\w#.-]*[\w-](?:(?:&[^(]+)?\([^)]+\))*\/?[ 	]).+/m,
      lookbehind: true
    },
    "tag": {
      pattern: /(^[ 	]*)(?!-)[\w#.-]*[\w-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
      lookbehind: true,
      inside: {
        "attributes": [
          {
            pattern: /&[^(]+\([^)]+\)/,
            inside: js3
          },
          {
            pattern: /\([^)]+\)/,
            inside: {
              "attr-value": {
                pattern: /(=\s*(?!\s))(?:\{[^}]*\}|[^\n,)]+)/,
                lookbehind: true,
                inside: js3
              },
              "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
              "punctuation": /[!=(),]+/
            }
          }
        ],
        "punctuation": /:/,
        "attr-id": /#[\w-]+/,
        "attr-class": /\.[\w-]+/
      }
    },
    "code": {
      pattern: /(^[ 	]*(?:-|!?=)).+/m,
      lookbehind: true,
      inside: js3
    },
    "punctuation": /[.!=|-]+/
  });

  // node_modules/prism-code-editor/dist/prism/languages/puppet.js
  var interpolation8 = [
    {
      // Allow for one nested level of braces inside interpolation
      pattern: /(^|[^\\])\$\{(?:[^{}"']|\{[^}]*\}|(["'])(?:\\[^]|(?!\2)[^\\])*\2)+\}/,
      lookbehind: true,
      inside: {
        "short-variable": {
          // Negative look-ahead prevent wrong highlighting of functions
          pattern: /(^\$\{)(?!\w+\()(?:::)?\w+(?:::\w+)*/,
          lookbehind: true,
          alias: "variable",
          inside: {
            "punctuation": /::/
          }
        },
        "delimiter": {
          pattern: /^\$/,
          alias: "variable"
        }
      }
    },
    {
      pattern: /(^|[^\\])\$(?:::)?\w+(?:::\w+)*/,
      lookbehind: true,
      alias: "variable",
      inside: {
        "punctuation": /::/
      }
    }
  ];
  interpolation8[0].inside[rest] = languages.puppet = {
    "heredoc": [
      // Matches the content of a quoted heredoc string (subject to interpolation)
      {
        pattern: /(@\("([^\n"/):]+)"(?:\/[nrts$uL]*)?\).*\n)(?:.*\n)*?[ 	]*(?:\|[ 	]*)?(?:-[ 	]*)?\2/,
        lookbehind: true,
        alias: "string",
        inside: {
          // Matches the end tag
          "punctuation": /(?!\s).*\S(?= *$)/,
          // See interpolation below
          "interpolation": interpolation8
        }
      },
      // Matches the content of an unquoted heredoc string (no interpolation)
      {
        pattern: /(@\(([^\n"/):]+)(?:\/[nrts$uL]*)?\).*\n)(?:.*\n)*?[ 	]*(?:\|[ 	]*)?(?:-[ 	]*)?\2/g,
        lookbehind: true,
        greedy: true,
        alias: "string",
        inside: {
          // Matches the end tag
          "punctuation": /(?!\s).*\S(?= *$)/
        }
      },
      // Matches the start tag of heredoc strings
      {
        pattern: /@\("?(?:[^\n"/):]+)"?(?:\/[nrts$uL]*)?\)/,
        alias: "string",
        inside: {
          "punctuation": /(?![(@]).+(?=.)/
        }
      }
    ],
    "multiline-comment": {
      pattern: /\/\*[^]*?\*\//g,
      greedy: true,
      alias: "comment"
    },
    "regex": {
      // Must be prefixed with the keyword "node" or a non-word char
      pattern: /(\bnode\s+|[~=([{,]\s*|[=+]>\s*|^\s*)\/(?:\\[^]|[^\\/])+\/(?:[imx]+\b|\B)/g,
      lookbehind: true,
      greedy: true,
      inside: {
        // Extended regexes must have the x flag. They can contain single-line comments.
        "extended-regex": {
          pattern: /^\/(?:\\[^]|[^\\/])+\/[im]*x[im]*$/,
          inside: {
            "comment": /#.*/
          }
        }
      }
    },
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "string": {
      // Allow for one nested level of double quotes inside interpolation
      pattern: /(["'])(?:\$\{(?:[^}"']|(["'])(?:\\[^]|(?!\2)[^\\])*\2)+\}|\$(?!\{)|\\[^]|(?!\1)[^\\$])*\1/g,
      greedy: true,
      inside: {
        "double-quoted": {
          pattern: /^"[^]*"$/,
          inside: {
            "interpolation": interpolation8
          }
        }
      }
    },
    "variable": {
      pattern: /\$(?:::)?\w+(?:::\w+)*/,
      inside: {
        "punctuation": /::/
      }
    },
    "attr-name": /(?:\b\w+|\*)(?=\s*=>)/,
    "function": [
      {
        pattern: /(\.)(?!\d)\w+/,
        lookbehind: true
      },
      /\b(?:contain|debug|err|fail|include|info|notice|realize|require|tag|warning)\b|\b(?!\d)\w+(?=\()/
    ],
    "number": /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e-?\d+)?)\b/i,
    "boolean": boolean,
    // Includes words reserved for future use
    "keyword": /\b(?:application|attr|case|class|consumes|default|define|else|elsif|function|if|import|inherits|node|private|produces|type|undef|unless)\b/,
    "datatype": {
      pattern: /\b(?:Any|Array|Boolean|Callable|Catalogentry|Class|Collection|Data|Default|Enum|Float|Hash|Integer|NotUndef|Numeric|Optional|Pattern|Regexp|Resource|Runtime|Scalar|String|Struct|Tuple|Type|Undef|Variant)\b/,
      alias: "symbol"
    },
    "operator": /=[=~>]?|![=~]?|<<\|?|<[=~|-]?|>[>=]?|->?|~>|\|>?>?|[%/*+?]|\b(?:and|in|or)\b/,
    "punctuation": /[()[\]{}.,;]|:+/
  };

  // node_modules/prism-code-editor/dist/prism/languages/pure.js
  var inside2 = (lang) => ({
    "lang": {
      pattern: /(^%< *)-\*-.+?-\*-/,
      lookbehind: true,
      alias: "comment"
    },
    "delimiter": {
      pattern: /^%<.*|%>$/,
      alias: "punctuation"
    },
    [rest]: lang
  });
  var pure = languages.pure = {
    "comment": /#!.+|\/\/.*|\/\*[^]*?\*\//
  };
  var inlineLanguages = [
    "c",
    "c\\+\\+",
    "fortran"
  ];
  var inlineLanguageRe = "%< *-\\*- *<0>\\d* *-\\*-[\\s\\S]+?%>";
  inlineLanguages.forEach((lang) => {
    var alias = lang.length == 5 ? "cpp" : lang;
    pure["inline-lang-" + alias] = {
      pattern: re(inlineLanguageRe, [lang], "i"),
      inside: inside2(alias)
    };
  });
  Object.assign(pure, {
    "inline-lang": {
      pattern: /%<[^]+?%>/g,
      greedy: true,
      inside: inside2("c")
    },
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "number": {
      // The look-behind prevents wrong highlighting of the .. operator
      pattern: /(\.\.)?(?:\b(?:inf|nan)\b|\b0x[a-f\d]+|(?:\b(?:0b)?\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?l?)/i,
      lookbehind: true
    },
    "keyword": /\b(?:NULL|ans|break|bt|case|catch|cd|clear|const|de[fl]|dump|else|end|exit|extern|false|true|force|help|if|infix[lr]?|interface|let|ls|mem|namespace|nonfix|of|otherwise|outfix|override|postfix|prefix|private|public|pwd|quit|run|save|show|stats|[tw]hen|throw|trace|type|underride|using|with)\b/,
    "function": /\b(?:abs|add_(?:addr|constdef|(?:fundef|interface|macdef|typedef)(?:_at)?|vardef)|all|any|applp?|arity|bigintp?|blob(?:_crc|_size|p)?|boolp?|byte_c?string(?:_pointer)?|byte_(?:matrix|pointer)|calloc|cat|catmap|ceil|char[ps]?|check_ptrtag|chr|clear_sentry|clearsym|closurep?|cmatrixp?|cols?|colcat(?:map)?|colmap|colrev|colvector(?:p|seq)?|complex(?:_float_(?:matrix|pointer)|_matrix(?:_view)?|_pointer|p)?|conj|cookedp?|cst|cstring(?:_(?:dup|list|vector))?|curry3?|cyclen?|del_(?:constdef|fundef|interface|macdef|typedef|vardef)|delete|diag(?:mat)?|dim|dmatrixp?|do|double(?:_matrix(?:_view)?|_pointer|p)?|dowith3?|drop|dropwhile|eval(?:cmd)?|exactp|filter|fix|fixity|flip|float(?:_matrix|_pointer)|floor|fold[lr]1?|frac|free|funp?|functionp?|gcd|get(?:_(?:byte|constdef|double|float|fundef|int(?:64)?|interface(?:_typedef)?|long|macdef|pointer|ptrtag|sentry|short|string|typedef|vardef))?|globsym|hash|head|id|im|imatrixp?|index|inexactp|infp|init|insert|int(?:_matrix_view|_matrix|_pointer|p)?|int64_(?:matrix|pointer)|integerp?|iteraten?|iterwhile|join|keys?|lambdap?|last(?:errpos|err)?|lcd|list[2p]?|listmap|make_ptrtag|malloc|map|matcat|max|member|min|nanp|nargs|n?matrixp?|null|numberp?|ord|packed|pack|pointer(?:_cast|_tag|_type|p)?|pow|pred|ptrtag|put(?:_(?:byte|double|float|int64|int|long|pointer|short|string))?|rationalp?|re|realp?|realloc|recordp?|redim|reduce_with|reduce|refp?|repeatn?|reverse|rlistp?|round|rows?|rowcatmap|rowcat|rowmap|rowrev|rowvector(?:p|seq)?|same|scan[lr]1?|sentry|sgn|short_(?:matrix|pointer)|slice|smatrixp?|sort|split|str|strcat|stream|stride|string(?:_(?:dup|list|vector)|p)?|su[bp]diag(?:mat)?|submat|subseq2?|substr|succ|symbolp?|tail|take|takewhile|thunkp?|transpose|trunc|tuplep?|typep|ubyte|uint(?:64)?|ulong|uncurry3?|unref|unzip3?|update|ushort|vals?|varp?|vectorseq|vectorp?|void|zip3?|zipwith3?)\b/,
    "special": {
      pattern: /\b__[a-z]+__\b/i,
      alias: "builtin"
    },
    // Any combination of operator chars can be an operator
    // eslint-disable-next-line no-misleading-character-class
    "operator": /(?:[\\#$"'.,:?@`~\xa1-\xbf\xd7-\xf7\u20d0-\u2bff%&|^!=<>/*+-]|\b_+\b)+|\b(?:and|div|mod|not|or)\b/,
    // FIXME: How can we prevent | and , to be highlighted as operator when they are used alone?
    "punctuation": /[()[\]{},;|]/
  });

  // node_modules/prism-code-editor/dist/prism/languages/purebasic.js
  languages.pbfasm = languages.purebasic = {
    "comment": /;.*/,
    "string": clikeString(),
    "tag": /#\w+\$?/,
    "asm": {
      pattern: /(^[ 	]*)!.*/m,
      lookbehind: true,
      alias: "tag",
      inside: {
        "string": {
          pattern: /(["'`])(?:\\.|(?!\1)[^\\\n])*\1/g,
          greedy: true
        },
        // Anonymous label references, i.e.: jmp @b
        "label-reference-anonymous": {
          pattern: /(!\s*j[a-z]+\s+)@[fb]/i,
          lookbehind: true,
          alias: "fasm-label"
        },
        // Named label reference, i.e.: jne label1
        "label-reference-addressed": {
          pattern: /(!\s*j[a-z]+\s+)[a-z._?$@][\w.?$@~#]*/i,
          lookbehind: true,
          alias: "fasm-label"
        },
        "keyword": [
          /\b(?:extern|global)\b[^\n;]*/i,
          /\b(?:CPU|DEFAULT|FLOAT)\b.*/
        ],
        "function": {
          pattern: /^([ 	]*!\s*)[a-z\d]+(?!\S)/im,
          lookbehind: true
        },
        "function-inline": {
          pattern: /(:\s*)[a-z\d]+(?!\S)/i,
          lookbehind: true,
          alias: "function"
        },
        "label": {
          pattern: /^([ 	]*!\s*)[A-Za-z._?$@][\w.?$@~#]*(?=:)/m,
          lookbehind: true,
          alias: "fasm-label"
        },
        "register": /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|di|si|sp)|[cdefgs]s|mm\d+)\b/i,
        "number": /(?:\b|-|(?=\$))(?:0[hx](?:[a-f\d]*\.)?[a-f\d]+(?:p[+-]?\d+)?|\d[a-f\d]+[hx]|\$\d[a-f\d]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|(?:\d+(?:\.\d+)?|\.\d+)(?:\.?e[+-]?\d+)?[dt]?)\b/i,
        "operator": /[[\].,:%&|$!=<>/*+-]/
      }
    },
    "keyword": /\b(?:align|and|as|break|calldebugger|compilererror|(?:compiler)?(?:case|default|else|elseif|endif|endselect|if|select)|continue|data|datasection|debug|debuglevel|declarec?|declarec?dll|declaremodule|define|dim|disableasm|disabledebugger|disableexplicit|enableasm|enabledebugger|enableexplicit|enddatasection|enddeclaremodule|endenumeration|endimport|endinterface|endmacro|endmodule|endprocedure|endstructure|endstructureunion|endwith|enumeration|extends|fakereturn|[fx]?or|foreach|forever|global|gosub|goto|importc?|includebinary|includepath|interface|macro|module|newlist|newmap|next|not|procedurec?|procedurec?dll|procedurereturn|protected|prototypec?|read|redim|repeat|restore|return|runtime|shared|static|step|structure|structureunion|swap|threaded|to|until|w?end|while|with|x?includefile)\b/i,
    "function": /\b\w+(?:\.\w+)?\s*(?=\()/,
    "number": /(?:\$[a-f\d]+|\b-?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?)\b/i,
    "operator": /(?:@\*?|\?|\*)\w+\$?|-[>-]?|\+\+?|[!=]=?|<<?=?|>>?=?|&&?|\|\|?|[~^%?*/@]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/purescript.js
  languages.purs = languages.purescript = extend("hs", {
    "keyword": /\b(?:ado|case|class|data|derive|do|else|forall|if|in|infix[lr]|instance|let|module|newtype|of|primitive|then|type|where)\b|∀/,
    "import-statement": {
      // The imported or hidden names are not included in this import
      // statement. This is because we want to highlight those exactly like
      // we do for the names in the program.
      pattern: /(^[ 	]*)import\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*(?:\s+as\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
      lookbehind: true,
      inside: {
        "keyword": /\b(?:as|hiding|import)\b/,
        "punctuation": /\./
      }
    },
    // These are builtin functions only. Constructors are highlighted later as a constant.
    "builtin": /\b(?:absurd|add|append|apply|between|bind|bottom|clamp|compare|comparing|compose|conj|const|degree|discard|disj|div|eq|flap|flip|gcd|identity|ifM|join|lcm|lift[AM]1|m?ap|max|mempty|min|mod|mul|negate|not|notEq|one|otherwise|recip|show|sub|top|unit|unlessM?|void|whenM?|zero)\b/,
    "operator": [
      // Infix operators
      languages.hs.operator[0],
      // ASCII operators
      languages.hs.operator[2],
      // All UTF16 Unicode operator symbols
      // This regex is equivalent to /(?=[\x80-\uffff])[\p{gc=Math_Symbol}\p{gc=Currency_Symbol}\p{Modifier_Symbol}\p{Other_Symbol}]/u
      // See https://github.com/PrismJS/prism/issues/3006 for more details.
      /[\xa2-\xa6\xa8\xa9\xac\xae-\xb1\xb4\xb8\xd7\xf7\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02eb\u02ed\u02ef-\u02ff\u0375\u0384\u0385\u03f6\u0482\u058d-\u058f\u0606-\u0608\u060b\u060e\u060f\u06de\u06e9\u06fd\u06fe\u07f6\u07fe\u07ff\u09f2\u09f3\u09fa\u09fb\u0af1\u0b70\u0bf3-\u0bfa\u0c7f\u0d4f\u0d79\u0e3f\u0f01-\u0f03\u0f13\u0f15-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fce\u0fcf\u0fd5-\u0fd8\u109e\u109f\u1390-\u1399\u166d\u17db\u1940\u19de-\u19ff\u1b61-\u1b6a\u1b74-\u1b7c\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd\u1ffe\u2044\u2052\u207a-\u207c\u208a-\u208c\u20a0-\u20bf\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211e-\u2123\u2125\u2127\u2129\u212e\u213a\u213b\u2140-\u2144\u214a-\u214d\u214f\u218a\u218b\u2190-\u2307\u230c-\u2328\u232b-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u2767\u2794-\u27c4\u27c7-\u27e5\u27f0-\u2982\u2999-\u29d7\u29dc-\u29fb\u29fe-\u2b73\u2b76-\u2b95\u2b97-\u2bff\u2ce5-\u2cea\u2e50\u2e51\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u309b\u309c\u3190\u3191\u3196-\u319f\u31c0-\u31e3\u3200-\u321e\u322a-\u3247\u3250\u3260-\u327f\u328a-\u32b0\u32c0-\u33ff\u4dc0-\u4dff\ua490-\ua4c6\ua700-\ua716\ua720\ua721\ua789\ua78a\ua828-\ua82b\ua836-\ua839\uaa77-\uaa79\uab5b\uab6a\uab6b\ufb29\ufbb2-\ufbc1\ufdfc\ufdfd\ufe62\ufe64-\ufe66\ufe69\uff04\uff0b\uff1c-\uff1e\uff3e\uff40\uff5c\uff5e\uffe0-\uffe6\uffe8-\uffee\ufffc\ufffd]/
    ]
  });

  // node_modules/prism-code-editor/dist/prism/languages/python.js
  var inside3 = {
    "format-spec": {
      pattern: /(:)[^(){}:]+(?=\}$)/,
      lookbehind: true
    },
    "conversion-option": {
      pattern: /![sra](?=[:}]$)/,
      alias: "punctuation"
    }
  };
  inside3[rest] = languages.py = languages.python = {
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "string-interpolation": {
      pattern: /(?:fr?|rf)(?:("""|''')[^]*?\1|(["'])(?:\\[^]|(?!\2)[^\\\n])*\2)/gi,
      greedy: true,
      inside: {
        "interpolation": {
          // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
          pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
          lookbehind: true,
          inside: inside3
        },
        "string": /[^]+/
      }
    },
    "triple-quoted-string": {
      pattern: /(?:br?|rb?|u)?("""|''')[^]*?\1/gi,
      greedy: true,
      alias: "string"
    },
    "string": {
      pattern: /(?:br?|rb?|u)?(["'])(?:\\[^]|(?!\1)[^\\\n])*\1/gi,
      greedy: true
    },
    "function": {
      pattern: /((?:^|\s)def[ 	]+)(?!\d)\w+(?=\s*\()/,
      lookbehind: true
    },
    "class-name": {
      pattern: /(\bclass\s+)\w+/i,
      lookbehind: true
    },
    "decorator": {
      pattern: /(^[ 	]*)@\w+(?:\.\w+)*/m,
      lookbehind: true,
      alias: "annotation punctuation",
      inside: {
        "punctuation": /\./
      }
    },
    "keyword": /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|de[fl]|elif|else|except|exec|finally|f?or|from|global|i[fns]|import|lambda|match|nonlocal|not|pass|print|raise|return|try|while|with|yield)\b/,
    "builtin": /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|ma[px]|memoryview|min|next|object|oct|open|ord|pow|property|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|x?range|zip)\b/,
    "boolean": /\b(?:False|True|None)\b/,
    "number": /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f\d])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
    "operator": /!=|:=|\*\*=?|\/\/=?|<>|>>|<<|[%=<>/*+-]=?|[&|^~]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/q.js
  languages.q = {
    "string": /"(?:\\.|[^\\\n"])*"/,
    "comment": [
      // From http://code.kx.com/wiki/Reference/Slash:
      // When / is following a space (or a right parenthesis, bracket, or brace), it is ignored with the rest of the line.
      {
        pattern: /([	 )\]}])\/.*/g,
        lookbehind: true,
        greedy: true
      },
      // From http://code.kx.com/wiki/Reference/Slash:
      // A line which has / as its first character and contains at least one other non-whitespace character is a whole-line comment and is ignored entirely.
      // A / on a line by itself begins a multiline comment which is terminated by the next \ on a line by itself.
      // If a / is not matched by a \, the multiline comment is unterminated and continues to end of file.
      // The / and \ must be the first char on the line, but may be followed by any amount of whitespace.
      {
        pattern: /^\/[ 	]*(?:\n(?:.*\n)*?(?:\\(?=[ 	]*$)|(?![^]))|\S.*)/mg,
        greedy: true
      },
      // From http://code.kx.com/wiki/Reference/Slash:
      // A \ on a line by itself with no preceding matching / will comment to end of file.
      {
        pattern: /^\\[ 	]*\n[^]+|^#!.+/mg,
        greedy: true
      }
    ],
    "symbol": /`(?::\S+|[\w.]*)/,
    "datetime": {
      pattern: /0N[mdzuvt]|0W[dtz]|\d{4}\.\d\d(?:m|\.\d\d(?:T(?:\d\d(?::\d\d(?::\d\d(?:[.:]\d\d\d)?)?)?)?)?[dz]?)|\d\d:\d\d(?::\d\d(?:[.:]\d\d\d)?)?[uvt]?/,
      alias: "number"
    },
    // The negative look-ahead prevents bad highlighting
    // of verbs 0: and 1:
    "number": /\b(?![01]:)(?:0N[hje]?|0W[hj]?|0[wn]|0x[a-fA-F\d]+|\d+(?:\.\d*)?(?:e[+-]?\d+)?[hjfeb]?)/,
    "keyword": /\\\w+|\b(?:abs|a?cos|aj0?|all|an[dy]|[ix]?asc|a?sin|asof|a?tan|attr|avgs?|binr?|ceiling|cols|cor|[hm]?count|cross|csv|cut|delete|deltas|[ix]?desc|[sm]?dev|differ|distinct|div|do|ej|enlist|except|exec|exit|f?by|fills|first|fkeys|flip|floor|from|get|getenv|[gl]time|hclose|hdel|hopen|hsym|identity|i[fjn]|insert|inter|inv|keys?|last|like|ljf?|lower|lsq|[lr]?trim|[mw]avg|maxs?|md5|med|meta|mins?|mmax|mmin|mmu|mod|[mw]sum|neg|next|not|null|or|over|parse|peach|pj|p?list|prds?|prior|rand|ratios|raze|read[01]|reciprocal|r?eval|reverse|r?load|rotate|[dr]?save|scan|s?cov|select|set|setenv|show|signum|sqrt|ssr?|string|sublist|sums?|sv|s?var|system|tables|til|txf|type|uj|ungroup|union|update|upper|upsert|value|views?|vs|where|while|within|wj1?|ww|xbar|xcols?|x?exp|x?group|xkey|x?log|x?prev|x?rank)\b/,
    "adverb": {
      pattern: /['/\\]:?|\beach\b/,
      alias: "function"
    },
    "verb": {
      pattern: /(?:\B\.\B|\b[01]:|<[=>]?|>=?|[:%,!?~=|$&#@^*+-]):?|\b_\b:?/,
      alias: "operator"
    },
    "punctuation": /[()[\]{}.;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/qml.js
  var jsExpr = nested(`(?:[^\\\\()[\\]{}"'/]|"(?:\\\\.|[^\\\\
"])*"|'(?:\\\\.|[^\\\\
'])*'|/(?![*/])|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))*\\*/|\\(<self>*\\)|\\[<self>*\\]|\\{<self>*\\}|\\\\[\\s\\S])`, 2);
  languages.qml = {
    "comment": clikeComment(),
    "javascript-function": {
      pattern: re("((?:^|;)[ 	]*)function\\s+(?!\\d)(?:(?!\\s)[$\\w\\xa0-\\uffff])+\\s*\\(<0>*\\)\\s*\\{<0>*\\}", [jsExpr], "mg"),
      lookbehind: true,
      greedy: true,
      alias: "language-javascript",
      inside: languages.js
    },
    "class-name": {
      pattern: /((?:^|[:;])[ 	]*)(?!\d)\w+(?=[ 	]*\{|[ 	]+on\b)/m,
      lookbehind: true
    },
    "property": [
      {
        pattern: /((?:^|[;{])[ 	]*)(?!\d)\w+(?:\.\w+)*(?=[ 	]*:)/m,
        lookbehind: true
      },
      {
        pattern: /((?:^|[;{])[ 	]*)property[ 	]+(?!\d)\w+(?:\.\w+)*[ 	]+(?!\d)\w+(?:\.\w+)*(?=[ 	]*:)/m,
        lookbehind: true,
        inside: {
          "keyword": /^property/,
          "property": /\w+(?:\.\w+)*/
        }
      }
    ],
    "javascript-expression": {
      pattern: re("(:[ 	]*)(?![\\s;}[])(?:(?!$|[;}])<0>)+", [jsExpr], "mg"),
      lookbehind: true,
      greedy: true,
      alias: "language-javascript",
      inside: languages.js
    },
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "keyword": /\b(?:as|import|on)\b/,
    "punctuation": /[[\]{},:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/qore.js
  languages.qore = {
    "comment": /\/\*[^]*?\*\/|\/\/.*|#.*/,
    // Overridden to allow unescaped multi-line strings
    "string": {
      pattern: /(["'])(?:\\[^]|(?!\1)[^\\])*\1/g,
      greedy: true
    },
    "class-name": clikeClass(),
    "keyword": /\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|code|const|continue|data|default|do|double|else|enum|extends|final|finally|float|for|goto|hash|if|implements|import|inherits|instanceof|int|interface|long|my|native|new|nothing|null|object|our|own|private|reference|rethrow|return|short|soft(?:bool|date|float|int|list|number|string)|static|strictfp|string|sub|super|switch|synchronized|this|throws?|transient|try|void|volatile|while)\b/,
    "boolean": /\b(?:false|true)\b/i,
    "function": /\$?\b(?!\d)\w+(?=\()/,
    "number": /\b(?:0b[01]+|0x(?:[a-f\d]*\.)?[a-f\dp-]+|(?:\d+(?:\.\d+)?|\.\d+)(?:e\d+)?[df]|(?:\d+(?:\.\d+)?|\.\d+))\b/i,
    "operator": {
      pattern: /(^|[^.])(?:--|\+\+|&&|\|\||[!=]==|[!=]~|<=>?|>>=?|<<=?|[%&|^!=<>/*+-]=?|[~?])/,
      lookbehind: true
    },
    "punctuation": clikePunctuation,
    "variable": /\$(?!\d)\w+/
  };

  // node_modules/prism-code-editor/dist/prism/languages/qsharp.js
  var keywords6 = /\b(?:Adj|BigInt|Bool|Ctl|Double|false|true|Int|One|Pauli[IXYZ]?|Qubit|Range|Result|String|Unit|Zero|[Aa]djoint|apply|as|auto|body|borrow|borrowing|[Cc]ontrolled|distribute|elif|else|fail|fixup|for|function|i[fns]|internal|intrinsic|invert|[ls]et|mutable|namespace|new|newtype|open|operation|repeat|return|self|until|use|using|while|within)\b/;
  var identifier2 = "\\b(?!\\d)\\w+\\b";
  var qualifiedName = replace("<0>(?:\\s*\\.\\s*<0>)*", [identifier2]);
  var typeInside3 = {
    "keyword": keywords6,
    "punctuation": /[<>()?,.:[\]]/
  };
  var regularString2 = '"(?:\\\\.|[^\\\\"])*"';
  var interpolationExpr = nested(replace('\\{(?:[^"{}]|<0>|<self>)*\\}', [regularString2]), 2);
  languages.qs = languages.qsharp = {
    "comment": /\/\/.*/,
    "interpolation-string": {
      pattern: re('\\$"(?:\\\\.|<0>|[^\\\\"{])*"', [interpolationExpr], "g"),
      greedy: true,
      inside: {
        "interpolation": {
          pattern: re("((?:^|[^\\\\])(?:\\\\\\\\)*)<0>", [interpolationExpr]),
          lookbehind: true,
          inside: {
            "punctuation": /^\{|\}$/,
            "expression": {
              pattern: /[^]+/,
              alias: "language-qsharp",
              inside: "qs"
            }
          }
        },
        "string": /[^]+/
      }
    },
    "string": [
      {
        pattern: re("(^|[^$\\\\])<0>", [regularString2], "g"),
        lookbehind: true,
        greedy: true
      }
    ],
    "class-name": [
      {
        // open Microsoft.Quantum.Canon;
        // open Microsoft.Quantum.Canon as CN;
        pattern: re("(\\b(?:as|open)\\s+)<0>(?=\\s*(?:;|as\\b))", [qualifiedName]),
        lookbehind: true,
        inside: typeInside3
      },
      {
        // namespace Quantum.App1;
        pattern: re("(\\bnamespace\\s+)<0>(?=\\s*\\{)", [qualifiedName]),
        lookbehind: true,
        inside: typeInside3
      }
    ],
    "keyword": keywords6,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "range": {
      pattern: /\.\./,
      alias: "operator"
    },
    "number": /(?:\b0(?:x[a-f\d]+|b[01]+|o[0-7]+)|(?:\B\.\d+|\b\d+(?:\.\d*)?)(?:e[+-]?\d+)?)l?\b/i,
    "operator": /\b(?:and\b=?|or\b=?|not\b)|<[=-]|[=-]>|(?:>>>|<<<|\^\^\^|\|\|\||&&&|w\/|[*/^!=%+-])=?|~~~/,
    "punctuation": /::|[()[\]{}.,:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/r.js
  languages.r = {
    "comment": /#.*/,
    "string": {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true
    },
    "percent-operator": {
      // Includes user-defined operators
      // and %%, %*%, %/%, %in%, %o%, %x%
      pattern: /%[^%\s]*%/,
      alias: "operator"
    },
    "boolean": /\b(?:FALSE|TRUE)\b/,
    "ellipsis": /\.\.(?:\.|\d+)/,
    "number": [
      /\b(?:Inf|NaN)\b/,
      /(?:\b0x[a-fA-F\d]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/
    ],
    "keyword": /\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\b/,
    "operator": /->>?|<=|<<?-|[!=<>]=?|::?|&&?|\|\|?|[~^$@/*+-]/,
    "punctuation": /[()[\]{},;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/racket.js
  insertBefore(
    languages.rkt = languages.racket = extend("scheme", {
      "lambda-parameter": {
        // the racket lambda syntax is a lot more complex, so we won't even attempt to capture it.
        // this will just prevent false positives of the `function` pattern
        pattern: /([(\[]lambda\s+[(\[])[^()[\]'\s]+/,
        lookbehind: true
      }
    }),
    "string",
    {
      "lang": {
        pattern: /^#lang.+/mg,
        greedy: true,
        alias: "keyword"
      }
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/reason.js
  languages.reason = {
    "comment": clikeComment(),
    "string": {
      pattern: /"(?:\\[^]|[^\\\n"])*"/g,
      greedy: true
    },
    "char": {
      pattern: /'(?:\\x[a-f\d]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^\\\n'])'/g,
      greedy: true
    },
    // Negative look-ahead prevents from matching things like String.capitalize
    "constructor": /\b[A-Z]\w*\b(?!\s*\.)/,
    "label": {
      pattern: /\b[a-z]\w*(?=::)/,
      alias: "symbol"
    },
    // 'class-name' must be matched *after* 'constructor' defined below
    "class-name": /\b[A-Z]\w*/,
    "keyword": /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|f?or|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|switch|[tw]hen|to|try|type|val|virtual|while|with)\b/,
    "boolean": boolean,
    "number": clikeNumber,
    "operator": /\.{3}|:[:=]|[|-]>|=>|==?=?|<=?|>=?|[|^?'#!~`]|[/*+-]\.?|\b(?:asr|land|ls[lr]|lx?or|mod)\b/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/regex.js
  var specialEscape = {
    pattern: /\\[\\()[\]{}^$+*?|.]/,
    alias: "escape"
  };
  var escape4 = /\\(?:x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|u\{[a-fA-F\d]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/;
  var charSet = {
    pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
    alias: "class-name"
  };
  var charSetWithoutDot = {
    pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
    alias: "class-name"
  };
  var rangeChar = "(?:[^\\\\-]|" + escape4.source + ")";
  var range = RegExp(rangeChar + "-" + rangeChar);
  var groupName = {
    pattern: /(<|')[^<>']+(?=[>']$)/,
    lookbehind: true,
    alias: "variable"
  };
  languages.regex = {
    "char-class": {
      pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:\\[^]|[^\\\]])*\]/,
      lookbehind: true,
      inside: {
        "char-class-punctuation": {
          pattern: /^.|.$/g,
          greedy: true,
          alias: "punctuation"
        },
        "char-class-negation": {
          pattern: /^\^/,
          alias: "operator"
        },
        "range": {
          pattern: range,
          inside: {
            "escape": escape4,
            "range-punctuation": {
              pattern: /-/,
              alias: "operator"
            }
          }
        },
        "special-escape": specialEscape,
        "char-set": charSetWithoutDot,
        "escape": escape4
      }
    },
    "special-escape": specialEscape,
    "char-set": charSet,
    "backreference": [
      {
        // a backreference which is not an octal escape
        pattern: /\\(?![123][0-7]{2})[1-9]/,
        alias: "keyword"
      },
      {
        pattern: /\\k<[^<>']+>/,
        alias: "keyword",
        inside: {
          "group-name": groupName
        }
      }
    ],
    "anchor": {
      pattern: /[$^]|\\[ABbGZz]/,
      alias: "function"
    },
    "escape": escape4,
    "group": [
      {
        // https://docs.oracle.com/javase/10/docs/api/java/util/regex/Pattern.html
        // https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference?view=netframework-4.7.2#grouping-constructs
        // (), (?<name>), (?'name'), (?>), (?:), (?=), (?!), (?<=), (?<!), (?is-m), (?i-m:)
        pattern: /(\()\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[!=]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?)/,
        lookbehind: true,
        inside: {
          "group-name": groupName
        }
      },
      {
        pattern: /[()]/,
        alias: "punctuation"
      }
    ],
    "quantifier": {
      pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
      alias: "number"
    },
    "alternation": {
      pattern: /\|/,
      alias: "keyword"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/rego.js
  languages.rego = {
    "comment": /#.*/,
    "property": {
      pattern: /(^|[^\\.])(?:"(?:\\.|[^\\\n"])*"|`[^`]*`|\b[a-z_]\w*\b)(?=\s*:(?!=))/gi,
      lookbehind: true,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^\\\n"])*"|`[^`]*`/g,
      lookbehind: true,
      greedy: true
    },
    "keyword": /\b(?:as|default|else|import|not|null|package|set(?=\s*\()|some|with)\b/,
    "boolean": boolean,
    "function": {
      pattern: /\b[a-z_]\w*\b(?:\s*\.\s*\b[a-z_]\w*\b)*(?=\s*\()/i,
      inside: {
        "namespace": /\b\w+(?=\s*\.)/,
        "punctuation": /\./
      }
    },
    "number": /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    "operator": /[%&|/*+-]|[:=<>]=?|!=|\b_\b/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/renpy.js
  languages.rpy = languages.renpy = {
    "comment": /#.+/,
    "string": {
      pattern: /("""|''')[^]+?\1|(["'])(?:\\.|(?!\2)[^\\])*\2|(?:^#?(?:(?:[a-fA-F\d]){3}|[a-fA-F\d]{6})$)/mg,
      greedy: true
    },
    "function": /\b[a-z_]\w*(?=\()/i,
    "property": /\b(?:Update|UpdateVersion|action|activate_sound|adv_nvl_transition|after_load_transition|alpha|alt|antialias|area|auto|background|bar_invert|bar_resizing|bar_vertical|black_color|bold|bottom_bar|bottom_gutter|bottom_margin|bottom_padding|box_reverse|box_wrap|can_update|caret|child|color|crop|default_afm_enable|default_afm_time|default_fullscreen|default_text_cps|developer|directory_name|drag_handle|drag_joined|drag_name|drag_raise|draggable|dragged|drop_shadow|drop_shadow_color|droppable|dropped|easein|easeout|edgescroll|end_game_transition|end_splash_transition|enter_replay_transition|enter_sound|enter_transition|enter_yesno_transition|executable_name|exit_replay_transition|exit_sound|exit_transition|exit_yesno_transition|fadein|fadeout|first_indent|first_spacing|fit_first|focus|focus_mask|font|foreground|game_main_transition|get_installed_packages|google_play_key|google_play_salt|ground|has_music|has_sound|has_voice|height|help|hinting|hover|hover_background|hover_color|hover_sound|hovered|hyperlink_functions|idle|idle_color|image_style|include_update|insensitive|insensitive_background|insensitive_color|inside|intra_transition|italic|justify|kerning|keyboard_focus|language|layer_clipping|layers|layout|left_bar|left_gutter|left_margin|left_padding|length|line_leading|line_overlap_split|line_spacing|linear|main_game_transition|main_menu_music|min_?width|modal|mouse|mousewheel|name|narrator_menu|newline_indent|nvl_adv_transition|order_reverse|outlines|overlay_functions|position|prefix|radius|range|rest_indent|right_bar|right_gutter|right_margin|right_padding|rotate|rotate_pad|ruby_style|sample_sound|save_directory|say_attribute_transition|screen_height|screen_width|scrollbars|selected_(?:hover|hover_color|idle|idle_color|insensitive)|show_side_image|show_two_window|side_spacing|side_[xy]pos|size_group|slow_cps|slow_cps_multiplier|spacing|strikethrough|subpixel|text_align|text_style|text_[xy]pos|text_y_fudge|thumb|thumb_offset|thumb_shadow|thumbnail_height|thumbnail_width|time|top_bar|top_gutter|top_margin|top_padding|translations|underline|unscrollable|update|value|version|version_name|version_tuple|vertical|width|window_hide_transition|window_icon|window_left_padding|window_show_transition|window_title|windows_icon|[xy]adjustment|[xy]?align|[xy]?anchor|[xy]anchoraround|[xy]around|[xy]center|[xy]fill|[xy]initial|[xy]margin|[xy]?maximum|[xy]?minimum|[xy]?offset|xofsset|[xy]padding|[xy]?pos|[xy]?size|[xy]?zoom|ysizexysize|zorder)\b/,
    "tag": /\b(?:bar|block|button|buttoscreenn|drag|draggroup|fixed|frame|grid|[hv]box|hotbar|hotspot|image|imagebutton|imagemap|input|key|label|menu|mm_menu_frame|mousearea|nvl|parallel|screen|self|side|tag|text|textbutton|timer|vbar|viewport|window)\b|\$/,
    "keyword": /\b(?:None|add|adjustment|alignaround|allow|angle|animation|around|assert|behind|box_layout|break|build|cache|call|center|changed|child_size|choice|circles|class|clear|clicked|clipping|clockwise|config|contains|continue|corner[12]|counterclockwise|de[fl]|default|define|delay|disabled|disabled_text|dissolve|elif|else|event|except|exclude|exec|expression|fade|finally|for|from|function|global|[gm]m_root|h?as|hide|id|if|import|in|init|is|jump|knot|lambda|left|less_rounded|movie|music|null|on|onlayer|pass|pause|persistent|play|print|python|queue|raise|random|renpy|repeat|return|right|rounded_window|scene|scope|set|show|slow|slow_abortable|slow_done|sound|stop|store|style|style_group|substitute|suffix|theme|transform|transform_anchor|transpose|try|ui|unhovered|updater|use|voice|while|widget|widget_hover|widget_selected|widget_text|yield)\b/,
    "boolean": /\b(?:[Ff]alse|[Tt]rue)\b/,
    "number": /(?:\b(?:0[bo])?(?:(?:\d|0x[a-f\d])[a-f\d]*(?:\.\d*)?)|\B\.\d+)(?:e[+-]?\d+)?j?/i,
    "operator": /[%=+-]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[~&|^]|\b(?:and|at|not|or|with)\b/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/rescript.js
  languages.res = languages.rescript = {
    "comment": clikeComment(),
    "char": {
      pattern: /'(?:[^\\\n]|\\(?:.|\w+))'/g,
      greedy: true
    },
    "template-string": {
      pattern: /`(?:\\[^]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}|(?!\$\{)[^\\`])*`/g,
      greedy: true,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "tag"
            },
            [rest]: "res"
          }
        },
        "string": /[^]+/
      }
    },
    "string": {
      pattern: /"(?:\\[^]|[^\\\n"])*"/g,
      greedy: true
    },
    "class-name": /\b[A-Z]\w*|@[a-z.]*|#[a-zA-Z]\w*|#\d/,
    "function": {
      pattern: /[a-zA-Z]\w*(?=\()|(\.)[a-z]\w*/,
      lookbehind: true
    },
    "number": /(?:\b0x(?:[a-f\d]+(?:\.[a-f\d]*)?|\.[a-f\d]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    "boolean": boolean,
    "attr-value": /[a-zA-Z]\w*(?==)/,
    "constant": {
      pattern: /(\btype\s+)[a-z]\w*/,
      lookbehind: true
    },
    "tag": {
      pattern: /(<)[a-z]\w*|(?:<\/)[a-z]\w*/,
      lookbehind: true,
      inside: {
        "operator": /[<>/]/
      }
    },
    "keyword": /\b(?:and|as|assert|begin|bool|class|constraint|do|done|downto|else|end|exception|external|float|f?or|fun|function|if|include|inherit|initializer|int?|lazy|let|method|module|mutable|new|nonrec|object|of|open|private|rec|string|switch|[tw]hen|to|try|type|while|with)\b/,
    "operator": /\.{3}|:[:=]?|\|>|->|=>|==?=?|<=?|>=?|[~|^!?'#`]|[/*+-]\.?|\b(?:asr|land|ls[lr]|lx?or|mod)\b/,
    "punctuation": /[()[\]{}.,;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/rest.js
  languages.rest = {
    "table": [
      {
        pattern: /(^[ 	]*)(?:\+[=-]+)+\+\n(?:\1[+|].+[+|]\n)+\1(?:\+[=-]+)+\+/m,
        lookbehind: true,
        inside: {
          "punctuation": /\||(?:\+[=-]+)+\+/
        }
      },
      {
        pattern: /(^[ 	]*)=+ [ =]*=(?:\n\1.+)+\n\1=+ [ =]*=(?=\n\n|\s*$)/m,
        lookbehind: true,
        inside: {
          "punctuation": /[=-]+/
        }
      }
    ],
    // Directive-like patterns
    "substitution-def": {
      pattern: /(^[ 	]*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m,
      lookbehind: true,
      inside: {
        "substitution": {
          pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/,
          alias: "attr-value",
          inside: {
            "punctuation": /^\||\|$/
          }
        },
        "directive": {
          pattern: /( )(?! )[^:]+::/,
          lookbehind: true,
          alias: "function",
          inside: {
            "punctuation": /::$/
          }
        }
      }
    },
    "link-target": [
      {
        pattern: /(^[ 	]*\.\. )\[[^\]]+\]/m,
        lookbehind: true,
        alias: "string",
        inside: {
          "punctuation": /^\[|\]$/
        }
      },
      {
        pattern: /(^[ 	]*\.\. )_(?:`[^`]+`|(?:\\.|[^\\:])+):/m,
        lookbehind: true,
        alias: "string",
        inside: {
          "punctuation": /^_|:$/
        }
      }
    ],
    "directive": {
      pattern: /(^[ 	]*\.\. )[^:]+::/m,
      lookbehind: true,
      alias: "function",
      inside: {
        "punctuation": /::$/
      }
    },
    "comment": {
      // The two alternatives try to prevent highlighting of blank comments
      pattern: /(^[ 	]*\.\.)(?:(?: .+)?(?:\n.+)+| .+)$/m,
      lookbehind: true
    },
    "title": [
      // Overlined and underlined
      {
        pattern: /^(([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-])\2+)\n.+\n\1$/m,
        inside: {
          "punctuation": /^[#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-]+|[#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-]+$/,
          "important": /.+/
        }
      },
      // Underlined only
      {
        pattern: /(^|\n\n).+\n([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-])\2+(?=\n|$)/,
        lookbehind: true,
        inside: {
          "punctuation": /[#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-]+$/,
          "important": /.+/
        }
      }
    ],
    "hr": {
      pattern: /(\n\n)([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-])\2{3,}(?=\n\n)/,
      lookbehind: true,
      alias: "punctuation"
    },
    "field": {
      pattern: /(^[ 	]*):[^\n:]+:(?= )/m,
      lookbehind: true,
      alias: "attr-name"
    },
    "command-line-option": {
      pattern: /(^[ 	]*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?)*(?=\n? {2,}\S)/im,
      lookbehind: true,
      alias: "symbol"
    },
    "literal-block": {
      pattern: /::\n\n([ 	]+)(?![ 	]).+(?:\n\1.+)*/,
      inside: {
        "literal-block-punctuation": {
          pattern: /^::/,
          alias: "punctuation"
        }
      }
    },
    "quoted-literal-block": {
      pattern: /::\n\n([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-]).*(?:\n\1.*)*/,
      inside: {
        "literal-block-punctuation": {
          pattern: /^(?:::|([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-])\1*)/m,
          alias: "punctuation"
        }
      }
    },
    "list-bullet": {
      pattern: /(^[ 	]*)(?:[*•‣⁃+-]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im,
      lookbehind: true,
      alias: "punctuation"
    },
    "doctest-block": {
      pattern: /(^[ 	]*)>>> .+(?:\n.+)*/m,
      lookbehind: true,
      inside: {
        "punctuation": /^>>>/
      }
    },
    "inline": [
      {
        pattern: /(^|[\s:/"'<([{-])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s)(?:(?!\2).)*\S\2(?![^\s.,:;!?\\/"')\]}-]))/m,
        lookbehind: true,
        inside: {
          "bold": {
            pattern: /(^\*\*).+(?=..)/,
            lookbehind: true
          },
          "italic": {
            pattern: /(^\*).+(?=.)/,
            lookbehind: true
          },
          "inline-literal": {
            pattern: /(^``).+(?=..)/,
            lookbehind: true,
            alias: "symbol"
          },
          "role": {
            pattern: /^:[^:]+:|:[^:]+:$/,
            alias: "function",
            inside: {
              "punctuation": /^:|:$/
            }
          },
          "interpreted-text": {
            pattern: /(^`).+(?=.)/,
            lookbehind: true,
            alias: "attr-value"
          },
          "substitution": {
            pattern: /(^\|).+(?=.)/,
            lookbehind: true,
            alias: "attr-value"
          },
          "punctuation": /.+/
        }
      }
    ],
    "link": [
      {
        pattern: /\[[^[\]]+\]_(?![^\s.,:;!?\\/"')\]}-])/,
        alias: "string",
        inside: {
          "punctuation": /^\[|\]_$/
        }
      },
      {
        pattern: /(?:\b[a-z\d]+(?:[_.:+][a-z\d]+)*_?_|`[^`]+`_?_|_`[^`]+`)(?![^\s.,:;!?\\/"')\]}-])/i,
        alias: "string",
        inside: {
          "punctuation": /^_?`|`$|`?_?_$/
        }
      }
    ],
    // Line block start,
    // quote attribution,
    // explicit markup start,
    // and anonymous hyperlink target shortcut (__)
    "punctuation": {
      pattern: /(^[ 	]*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m,
      lookbehind: true
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/rip.js
  languages.rip = {
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "char": {
      pattern: /\B`[^\s"'`#/\\<>()[\]{}.,:;]\b/g,
      greedy: true
    },
    "string": {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true
    },
    "regex": {
      pattern: /(^|[^/])\/(?!\/)(?:\[[^\n\]]*\]|\\.|[^\\\n/[])+\/(?=\s*(?:$|[\n.,;})]))/g,
      lookbehind: true,
      greedy: true
    },
    "keyword": /(?:=>|->)|\b(?:case|catch|class|else|exit|finally|if|raise|return|switch|try)\b/,
    "builtin": /@|\bSystem\b/,
    "boolean": boolean,
    "date": /\b\d{4}-\d\d-\d\d\b/,
    "time": /\b\d\d:\d\d:\d\d\b/,
    "datetime": /\b\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\b/,
    "symbol": /:(?!\d)[^\s"'`#/\\<>()[\]{}.,:;]+/,
    "number": /[+-]?\b(?:\d+\.\d+|\d+)\b/,
    "punctuation": /\.{2,3}|[`\\<>=/()[\]{}.,:;]/,
    "reference": /(?!\d)[^\s"'`#/\\<>()[\]{}.,:;]+/
  };

  // node_modules/prism-code-editor/dist/prism/languages/roboconf.js
  languages.roboconf = {
    "comment": /#.*/,
    "keyword": {
      "pattern": /(^|\s)(?:(?:external|import)\b|(?:facet|instance of)(?=[ 	]+[\w-]+[ 	]*\{))/,
      lookbehind: true
    },
    "component": {
      pattern: /[\w-]+(?=[ 	]*\{)/,
      alias: "variable"
    },
    "property": /[\w.-]+(?=[ 	]*:)/,
    "value": {
      pattern: /(=[ 	]*(?![ 	]))[^,;]+/,
      lookbehind: true,
      alias: "attr-value"
    },
    "optional": {
      pattern: /\(optional\)/,
      alias: "builtin"
    },
    "wildcard": {
      pattern: /(\.)\*/,
      lookbehind: true,
      alias: "operator"
    },
    "punctuation": /[{}.,:;=]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/robotframework.js
  var comment4 = {
    pattern: /(^[ 	]*|  |	)#.*/mg,
    lookbehind: true,
    greedy: true
  };
  var variable7 = {
    pattern: /((?:^|[^\\])(?:\\\\)*)[$@&%]\{(?:[^{}\n]|\{[^{}\n]*\})*\}/,
    lookbehind: true,
    inside: {
      "punctuation": /^[$@&%]\{|\}$/
    }
  };
  var createSection = (name2, inside5) => {
    var extendecInside = {};
    extendecInside["section-header"] = {
      pattern: /^ ?\*{3}.+?\*{3}/,
      alias: "keyword"
    };
    Object.assign(extendecInside, inside5);
    extendecInside["tag"] = {
      pattern: /(\n(?:  |	)[ 	]*)\[[-\w]+\]/,
      lookbehind: true,
      inside: {
        "punctuation": /[[\]]/
      }
    };
    extendecInside["variable"] = variable7;
    extendecInside["comment"] = comment4;
    return {
      pattern: re("^ ?\\*{3}[ 	]*<0>[ 	]*\\*{3}(?:.|\n(?!\\*{3}))*", [name2], "im"),
      alias: "section",
      inside: extendecInside
    };
  };
  var docTag = {
    pattern: /(\[Documentation\](?:  |	)[ 	]*)(?![ 	]|#)(?:.|\n[ 	]*\.{3})+/,
    lookbehind: true,
    alias: "string"
  };
  var testNameLike = {
    pattern: /(\n ?)(?!#)(?:\S(?:[ 	]\S)*)+/,
    lookbehind: true,
    alias: "function",
    inside: {
      "variable": variable7
    }
  };
  var testPropertyLike = {
    pattern: /(\n(?: |	)[ 	]*)(?!\[|\.{3}|#)(?:\S(?:[ 	]\S)*)+/,
    lookbehind: true,
    inside: {
      "variable": variable7
    }
  };
  languages.robot = languages.robotframework = {
    "settings": createSection("Settings", {
      "documentation": {
        pattern: /(\n ?Documentation(?:  |	)[ 	]*)(?![ 	]|#)(?:.|\n[ 	]*\.{3})+/,
        lookbehind: true,
        alias: "string"
      },
      "property": {
        pattern: /(\n ?)(?!\.{3}|#)(?:\S(?:[ 	]\S)*)+/,
        lookbehind: true
      }
    }),
    "variables": createSection("Variables"),
    "test-cases": createSection("Test Cases", {
      "test-name": testNameLike,
      "documentation": docTag,
      "property": testPropertyLike
    }),
    "keywords": createSection("Keywords", {
      "keyword-name": testNameLike,
      "documentation": docTag,
      "property": testPropertyLike
    }),
    "tasks": createSection("Tasks", {
      "task-name": testNameLike,
      "documentation": docTag,
      "property": testPropertyLike
    }),
    "comment": comment4
  };

  // node_modules/prism-code-editor/dist/prism/languages/rust.js
  var multilineComment = nested("/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/", 2);
  var string10 = {
    pattern: /b?"(?:\\[^]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/g,
    greedy: true
  };
  var paramsInside = {
    "closure-punctuation": {
      pattern: /^\||\|$/,
      alias: "punctuation"
    }
  };
  paramsInside[rest] = languages.rust = {
    "comment": {
      pattern: RegExp("//.*|" + multilineComment, "g"),
      greedy: true
    },
    "string": string10,
    "char": {
      pattern: /b?'(?:\\(?:x[0-7][a-fA-F\d]|u\{(?:[a-fA-F\d]_*){1,6}\}|.)|[^\\\n	'])'/g,
      greedy: true
    },
    "attribute": {
      pattern: /#!?\[(?:[^[\]"]|"(?:\\[^]|[^\\"])*")*\]/g,
      greedy: true,
      alias: "attr-name",
      inside: {
        "string": string10
      }
    },
    // Closure params should not be confused with bitwise OR |
    "closure-params": {
      pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/g,
      lookbehind: true,
      greedy: true,
      inside: paramsInside
    },
    "lifetime-annotation": {
      pattern: /'\w+/,
      alias: "symbol"
    },
    "fragment-specifier": {
      pattern: /(\$\w+:)[a-z]+/,
      lookbehind: true,
      alias: "punctuation"
    },
    "variable": /\$\w+/,
    "function-definition": {
      pattern: /(\bfn\s+)\w+/,
      lookbehind: true,
      alias: "function"
    },
    "type-definition": {
      pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
      lookbehind: true,
      alias: "class-name"
    },
    "module-declaration": [
      {
        pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
        lookbehind: true,
        alias: "namespace"
      },
      {
        pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
        lookbehind: true,
        alias: "namespace",
        inside: {
          "punctuation": /::/
        }
      }
    ],
    // https://github.com/rust-lang/reference/blob/master/src/keywords.md
    // primitives and str
    // https://doc.rust-lang.org/stable/rust-by-example/primitives.html
    "keyword": /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield|bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/,
    // functions can technically start with an upper-case letter, but this will introduce a lot of false positives
    // and Rust's naming conventions recommend snake_case anyway.
    // https://doc.rust-lang.org/1.0.0/style/style/naming/README.html
    "function": /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
    "macro": {
      pattern: /\b\w+!/,
      alias: "property"
    },
    "constant": /\b[A-Z_][A-Z_\d]+\b/,
    "class-name": /\b[A-Z]\w*\b/,
    "namespace": {
      pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
      inside: {
        "punctuation": /::/
      }
    },
    // Hex, oct, bin, dec numbers with visual separators and type suffix
    "number": /\b(?:0x[a-fA-F\d](?:_?[a-fA-F\d])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
    "boolean": boolean,
    "punctuation": /->|\.\.=|\.{1,3}|::|[()[\]{},:;]/,
    "operator": /&&|\|\||=>|>>=?|<<=?|[%&|^!=<>/*+-]=?|[@?]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/sas.js
  var stringPattern2 = `(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))`;
  var number3 = /\b(?:\d[a-f\d]*x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i;
  var numericConstant = {
    pattern: RegExp(stringPattern2 + "[bx]"),
    alias: "number"
  };
  var macroVariable = /&[a-z_]\w*/i;
  var macroKeyword = {
    pattern: /(^|[\s=(])%(?:abort|by|cms|copy|display|do|else|end|eval|global|goto|go|if|inc|include|index|input|length|let|list|local|put|q?ktrim|q?scan|q?substr|q?sysfunc|q?upcase|return|run|superq|symdel|symexist|symglobl|symlocal|syscall|sysevalf|sysexec|sysget|sysrput|then|ts?o|unquote|until|while|window)\b/i,
    lookbehind: true,
    alias: "keyword"
  };
  var step = {
    pattern: /(^|\s)(?:proc\s+\w+|data(?!=)|quit|run)\b/i,
    alias: "keyword",
    lookbehind: true
  };
  var comment5 = {
    pattern: /\/\*[^]*?\*\/|(^[ 	]*|;\s*)\*[^;]*;/m,
    lookbehind: true
  };
  var string11 = {
    pattern: RegExp(stringPattern2, "g"),
    greedy: true
  };
  var punctuation2 = /[$%@()[\]{}.,;\\]/;
  var func2 = {
    pattern: /%?\b\w+(?=\()/,
    alias: "keyword"
  };
  var argValue = {
    pattern: /(=\s*)[a-z\.]+/i,
    lookbehind: true
  };
  var arg2 = {
    pattern: /[a-z]+/i,
    alias: "keyword"
  };
  var args = {
    "function": func2,
    "arg-value": argValue,
    "operator": /=/,
    "macro-variable": macroVariable,
    "arg": arg2,
    "number": number3,
    "numeric-constant": numericConstant,
    "punctuation": punctuation2,
    "string": string11
  };
  var format = {
    pattern: /\b(?:format|put)\b=?[\w'$.]+/i,
    inside: {
      "keyword": /^(?:format|put)(?==)/i,
      "equals": /=/,
      "format": {
        pattern: /(?:\w|\$\d)+\.\d?/,
        alias: "number"
      }
    }
  };
  var altformat = {
    pattern: /\b(?:format|put)\s+[\w']+(?:\s+[$.\w]+)+(?=;)/i,
    inside: {
      "keyword": /^(?:format|put)/i,
      "format": {
        pattern: /[$\w]+\.\d?/,
        alias: "number"
      }
    }
  };
  var globalStatements = {
    pattern: /((?:^|\s)=?)(?:catname|checkpoint execute_always|dm|endsas|filename|footnote|%include|libname|%list|lock|missing|options|page|resetline|%run|sasfile|skip|sysecho|title\d?)\b/i,
    lookbehind: true,
    alias: "keyword"
  };
  var submitStatement = {
    pattern: /(^|\s)(?:submit(?:\s+(?:load|norun|parseonly))?|endsubmit)\b/i,
    lookbehind: true,
    alias: "keyword"
  };
  var actionSets = "astore|accesscontrol|aggregation|audio|autotune|bayesiannetclassifier|biomedimage|boolrule|builtins|cardinality|cdm|clustering|conditionalrandomfields|configuration|copula|countreg|datadiscovery|datapreprocess|datasciencepilot|datastep|decisiontree|deduplication|deeplearn|deepneural|deeprnn|ds2|ecm|entityres|espcluster|explainmodel|factmac|fastknn|fcmpact|fedsql|freqtab|gvarcluster|gam|gleam|graphsemisuplearn|hiddenmarkovmodel|hypergroup|[ip]ca|image|iml|kernalpca|langmodel|ldatopic|loadstreams|mbc|mixed|mltools|modelpublishing|network|neuralnet|nmf|nonparametricbayes|nonlinear|optnetwork|optimization|panel|percentile|phreg|pls|qkb|qlim|quantreg|recommend|regression|reinforcementlearn|robustpca|rulemining|sampling|sandwich|sccasl|search(?:analytics)?|sentimentanalysis|sequence|session(?:prop)?|severity|simsystem|simple|smartdata|sparkembeddedprocess|sparseml|spatialreg|spc|stabilitymonitoring|svdatadescription|svm|table|text(?:filters|frequency|mining|parse|rule(?:develop|score)|topic|util)|timedata|transpose|tsinfo|tsreconcile|unitimeseries|varreduce";
  var casActions = {
    pattern: re("(^|\\s)(?:action\\s+)?<0>\\.[a-z]+\\b[^;]+", [actionSets], "i"),
    lookbehind: true,
    inside: {
      "keyword": re("<0>\\.[a-z]+\\b", [actionSets], "i"),
      "action": {
        pattern: /(?:action)/i,
        alias: "keyword"
      },
      "comment": comment5,
      "function": func2,
      "arg-value": argValue,
      "operator": /=/,
      "argument": arg2,
      "number": number3,
      "numeric-constant": numericConstant,
      "punctuation": punctuation2,
      "string": string11
    }
  };
  var keywords7 = {
    pattern: /((?:^|\s)=?)(?:after|analysis|and|array|barchart|barwidth|begingraph|by|call|cas|cbarline|cfill|class|classlev|close|column|computed?|contains|continue|data(?==)|define|delete|describe|document|do\s+over|dol?|drop|dul|else|end(?:comp|source)?|entrytitle|evaluate|eval|execute|exec|exit|filename|fillattrs|fil[el]|flist|fnc|functionlist|function|global|goto|groupby|group|headline|headskip|histogram|if|infile|keep|keylabel|keyword|label|layout|leave|legendlabel|length|libname|loadactionset|merge|midpoints|_?null_|name|noobs|nowd|ods|options|or|otherwise|output|[op]ut|overlay|over|plot|print|raise|ranexp|rannor|rbreak|retain|return|select|session|sessref|set|source|statgraph|sum|summarize|table|temp|terminate|then\s+do|[tw]hen|title\d?|to|var|where|xaxisopts|y2?axisopts)\b/i,
    lookbehind: true
  };
  languages.sas = {
    "datalines": {
      pattern: /^([ 	]*)(?:cards|(?:data)?lines);[^]+?^[ 	]*;/im,
      lookbehind: true,
      alias: "string",
      inside: {
        "keyword": /^(?:cards|(?:data)?lines)/i,
        "punctuation": /;/
      }
    },
    "proc-sql": {
      pattern: /(^proc\s+(?:fed)?sql(?:\s+[\w|=]+)?;)[^]+?(?=^(?:proc\s+\w+|data|quit|run);|(?![^]))/im,
      lookbehind: true,
      inside: {
        "sql": {
          pattern: re(`^[ 	]*(?:select|alter\\s+table|(?:create|describe|drop)\\s+(?:index|table(?:\\s+constraints)?|view)|create\\s+unique\\s+index|insert\\s+into|update)(?:<0>|[^;"'])+;`, [stringPattern2], "im"),
          alias: "language-sql",
          inside: "sql"
        },
        "global-statements": globalStatements,
        "sql-statements": {
          pattern: /(^|\s)(?:disconnect\s+from|begin|commit|exec(?:ute)?|reset|rollback|validate)\b/i,
          lookbehind: true,
          alias: "keyword"
        },
        "number": number3,
        "numeric-constant": numericConstant,
        "punctuation": punctuation2,
        "string": string11
      }
    },
    "proc-groovy": {
      pattern: /(^proc\s+groovy(?:\s+[\w|=]+)?;)[^]+?(?=^(?:proc\s+\w+|data|quit|run);|(?![^]))/im,
      lookbehind: true,
      inside: {
        "comment": comment5,
        "groovy": {
          pattern: re(`(^[ 	]*submit(?:\\s+(?:load|norun|parseonly))?)(?:<0>|[^"'])+?(?=endsubmit;)`, [stringPattern2], "im"),
          lookbehind: true,
          alias: "language-groovy",
          inside: "groovy"
        },
        "keyword": keywords7,
        "submit-statement": submitStatement,
        "global-statements": globalStatements,
        "number": number3,
        "numeric-constant": numericConstant,
        "punctuation": punctuation2,
        "string": string11
      }
    },
    "proc-lua": {
      pattern: /(^proc\s+lua(?:\s+[\w|=]+)?;)[^]+?(?=^(?:proc\s+\w+|data|quit|run);|(?![^]))/im,
      lookbehind: true,
      inside: {
        "comment": comment5,
        "lua": {
          pattern: re(`(^[ 	]*submit(?:\\s+(?:load|norun|parseonly))?)(?:<0>|[^"'])+?(?=endsubmit;)`, [stringPattern2], "im"),
          lookbehind: true,
          alias: "language-lua",
          inside: "lua"
        },
        "keyword": keywords7,
        "submit-statement": submitStatement,
        "global-statements": globalStatements,
        "number": number3,
        "numeric-constant": numericConstant,
        "punctuation": punctuation2,
        "string": string11
      }
    },
    "proc-cas": {
      pattern: /(^proc\s+cas(?:\s+[\w|=]+)?;)[^]+?(?=^(?:proc\s+\w+|quit|data);|(?![^]))/im,
      lookbehind: true,
      inside: {
        "comment": comment5,
        "statement-var": {
          pattern: /((?:^|\s)=?)saveresult\s[^;]+/im,
          lookbehind: true,
          inside: {
            "statement": {
              pattern: /^saveresult\s+\S+/i,
              inside: {
                keyword: /^(?:saveresult)/i
              }
            },
            [rest]: args
          }
        },
        "cas-actions": casActions,
        "statement": {
          pattern: /((?:^|\s)=?)(?:default|(?:un)?set|on|output|upload)[^;]+/im,
          lookbehind: true,
          inside: args
        },
        "step": step,
        "keyword": keywords7,
        "function": func2,
        "format": format,
        "altformat": altformat,
        "global-statements": globalStatements,
        "number": number3,
        "numeric-constant": numericConstant,
        "punctuation": punctuation2,
        "string": string11
      }
    },
    "proc-args": {
      pattern: re(`(^proc\\s+\\w+\\s+)(?!\\s)(?:[^;"']|<0>)+;`, [stringPattern2], "im"),
      lookbehind: true,
      inside: args
    },
    /*Special keywords within macros*/
    "macro-keyword": macroKeyword,
    "macro-variable": macroVariable,
    "macro-string-functions": {
      pattern: /(^|\s|=)%(?:nr)?(?:b?quote|str)\(.*?(?:[^%]\))/i,
      lookbehind: true,
      inside: {
        "function": {
          pattern: /^[^(]+/,
          alias: "keyword"
        },
        "macro-keyword": macroKeyword,
        "macro-variable": macroVariable,
        "escaped-char": /%["'()<>=¬^~;,#]/,
        "punctuation": punctuation2
      }
    },
    "macro-declaration": {
      pattern: /^%macro[^;]+(?=;)/im,
      inside: {
        "keyword": /%macro/i
      }
    },
    "macro-end": {
      pattern: /^%mend[^;]+(?=;)/im,
      inside: {
        "keyword": /%mend/i
      }
    },
    /*%_zscore(headcir, _lhc, _mhc, _shc, headcz, headcpct, _Fheadcz); */
    "macro": {
      pattern: /%_\w+(?=\()/,
      alias: "keyword"
    },
    "input": {
      pattern: /\binput\s[-\w\s/*.$&]+;/i,
      inside: {
        "input": {
          alias: "keyword",
          pattern: /^input/i
        },
        "comment": comment5,
        "number": number3,
        "numeric-constant": numericConstant
      }
    },
    "options-args": {
      pattern: /(^options)[()"'|:\\\w\s=<>/*+-]+(?=;)/im,
      lookbehind: true,
      inside: args
    },
    "cas-actions": casActions,
    "comment": comment5,
    "function": func2,
    "format": format,
    "altformat": altformat,
    "numeric-constant": numericConstant,
    "datetime": {
      // '1jan2013'd, '9:25:19pm't, '18jan2003:9:27:05am'dt
      pattern: RegExp(stringPattern2 + "(?:dt?|t)"),
      alias: "number"
    },
    "string": string11,
    "step": step,
    "keyword": keywords7,
    // In SAS Studio syntax highlighting, these operators are styled like keywords
    "operator-keyword": {
      pattern: /\b(?:eq|[gl][et]|in|ne|not)\b/i,
      alias: "operator"
    },
    // Decimal (1.2e23), hexadecimal (0c1x)
    "number": number3,
    "operator": /\*\*?|\|\|?|!!?|¦¦?|<>|><|[&=/+-]|[~¬^<>]=?/,
    "punctuation": punctuation2
  };

  // node_modules/prism-code-editor/dist/prism/languages/sass.js
  var variable8 = /\$[-\w]+|#\{\$[-\w]+\}/;
  var operator2 = {
    pattern: /[%/*+]|[!=]=|<=?|>=?|\b(?:and|not|or)\b|(\s)-(?!\S)/,
    lookbehind: true
  };
  var sass = languages.sass = extend("css", {
    // Sass comments don't need to be closed, only indented
    "comment": {
      pattern: /^([ 	]*)\/[/*].*(?:$\s*?\n\1[ 	]+\S.*)*/mg,
      lookbehind: true,
      greedy: true
    }
  });
  insertBefore(sass, "atrule", {
    // We want to consume the whole line
    "atrule-line": {
      // Includes support for = and + shortcuts
      pattern: /^(?:[ 	]*)[@+=].+/mg,
      greedy: true,
      inside: {
        "atrule": /(?:@[\w-]+|[+=])/
      }
    }
  });
  delete sass.atrule;
  insertBefore(sass, "property", {
    // We want to consume the whole line
    "variable-line": {
      pattern: /^[ 	]*\$.+/mg,
      greedy: true,
      inside: {
        "punctuation": /:/,
        "variable": variable8,
        "operator": operator2
      }
    },
    // We want to consume the whole line
    "property-line": {
      pattern: /^[ 	]*(?:[^:\s]+ *:.*|:[^:\s].*)/mg,
      greedy: true,
      inside: {
        "property": [
          /[^:\s]+(?=\s*:)/,
          {
            pattern: /(:)[^:\s]+/,
            lookbehind: true
          }
        ],
        "punctuation": /:/,
        "variable": variable8,
        "operator": operator2,
        "important": sass.important
      }
    }
  });
  delete sass.property;
  delete sass.important;
  insertBefore(sass, "punctuation", {
    "selector": {
      pattern: /^([ 	]*)\S(?:,[^\n,]+|[^\n,]*)(?:,[^\n,]+)*(?:,\n\1[ 	]+\S(?:,[^\n,]+|[^\n,]*)(?:,[^\n,]+)*)*/mg,
      lookbehind: true,
      greedy: true
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/scala.js
  var scala = languages.scala = extend("java", {
    "triple-quoted-string": {
      pattern: /"""[^]*?"""/g,
      greedy: true,
      alias: "string"
    },
    "string": {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      greedy: true
    },
    "keyword": /<-|=>|\b(?:abstract|case|[cm]atch|class|def|derives|do|else|enum|extends|extension|final|finally|for|forSome|given|if|implicit|import|infix|inline|lazy|new|null|object|opaque|open|override|package|private|protected|return|sealed|self|super|this|throw|trait|transparent|try|type|using|val|var|while|with|yield)\b/,
    "number": /\b0x(?:[a-f\d]*\.)?[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e\d+)?[dfl]?/i,
    "builtin": /\b(?:Any|AnyRef|AnyVal|Boolean|Byte|Char|Double|Float|Int|Long|Nothing|Short|String|Unit)\b/,
    "symbol": /'[^\d\s\\]\w*/
  });
  insertBefore(scala, "triple-quoted-string", {
    "string-interpolation": {
      pattern: /\b[a-z]\w*(?:"""(?:[^$]|\$(?:[^{]|\{(?:[^{}]|\{[^}]*\})*\}))*?"""|"(?:[^$"\n]|\$(?:[^{]|\{(?:[^{}]|\{[^}]*\})*\}))*")/ig,
      greedy: true,
      inside: {
        "id": {
          pattern: /^\w+/g,
          greedy: true,
          alias: "function"
        },
        "escape": {
          pattern: /\\\$"|\$[$"]/g,
          greedy: true,
          alias: "symbol"
        },
        "interpolation": {
          pattern: /\$(?:\w+|\{(?:[^{}]|\{[^}]*\})*\})/g,
          greedy: true,
          inside: {
            "punctuation": /^\$\{?|\}$/,
            "expression": {
              pattern: /[^]+/,
              inside: scala
            }
          }
        },
        "string": /[^]+/
      }
    }
  });
  delete scala["class-name"];
  delete scala["function"];
  delete scala["constant"];

  // node_modules/prism-code-editor/dist/prism/languages/scss.js
  var scss = languages.scss = extend("css", {
    "comment": clikeComment(),
    "atrule": {
      pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
      inside: {
        "rule": /@[\w-]+/,
        [rest]: "scss"
      }
    },
    // url, compassified
    "url": /(?:[-a-z]+-)?url(?=\()/i,
    // CSS selector regex is not appropriate for Sass
    // since there can be lot more things (var, @ directive, nesting..)
    // a selector must start at the end of a property or after a brace (end of other rules or nesting)
    // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
    // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
    // can "pass" as a selector- e.g: proper#{$erty})
    // this one was hard to do, so please be careful if you edit this one :)
    "selector": {
      // Initial look-ahead is used to prevent matching of blank selectors
      pattern: /(?!\s)[^@;(){}]?(?:[^@;(){}\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
      inside: {
        "parent": {
          pattern: /&/,
          alias: "important"
        },
        "placeholder": /%[-\w]+/,
        "variable": /\$[-\w]+|#\{\$[-\w]+\}/
      }
    },
    "property": {
      pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
      inside: {
        "variable": /\$[-\w]+|#\{\$[-\w]+\}/
      }
    }
  });
  insertBefore(scss, "atrule", {
    "keyword": [
      /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
      {
        pattern: /( )(?:from|through)(?= )/,
        lookbehind: true
      }
    ]
  });
  insertBefore(scss, "important", {
    // var and interpolated vars
    "variable": /\$[-\w]+|#\{\$[-\w]+\}/
  });
  insertBefore(scss, "function", {
    "module-modifier": {
      pattern: /\b(?:as|hide|show|with)\b/i,
      alias: "keyword"
    },
    "placeholder": {
      pattern: /%[-\w]+/,
      alias: "selector"
    },
    "statement": {
      pattern: /\B!(?:default|optional)\b/i,
      alias: "keyword"
    },
    "boolean": boolean,
    "null": {
      pattern: /\bnull\b/,
      alias: "keyword"
    },
    "operator": {
      pattern: /(\s)(?:[%/*+-]|[!=]=|[<>]=?|and|not|or)(?!\S)/,
      lookbehind: true
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/shell-session.js
  languages["sh-session"] = languages.shellsession = languages["shell-session"] = {
    "command": {
      pattern: /^(?:[^\s@:$#%*!/\\]+@[^\n@:$#%*!/\\]+(?::[^\0-\x1f$#%*?"<>:;|]+)?|[/~.][^\0-\x1f$#%*?"<>@:;|]*)?[$#%](?=\s)(?:[^\\\n 	"'<$]|[ 	](?:(?!#)|#.*$)|\\[^]|\$(?!')|<(?!<)|"(?:\\[^]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^\\"`$])*"|'[^']*'|\$'(?:\\[^]|[^\\'])*'|<<-?\s*(["']?)(\w+)\1\s[^]*?\n\2)+/mg,
      greedy: true,
      inside: {
        "info": {
          // foo@bar:~/files$ exit
          // foo@bar$ exit
          // ~/files$ exit
          pattern: /^[^#$%]+/,
          alias: "punctuation",
          inside: {
            "user": /^[^\s@:$#%*!/\\]+@[^\n@:$#%*!/\\]+/,
            "punctuation": /:/,
            "path": /[^]+/
          }
        },
        "bash": {
          pattern: /(^[$#%]\s*)\S[^]*/,
          lookbehind: true,
          alias: "language-bash",
          inside: languages.bash
        },
        "shell-symbol": {
          pattern: /^[$#%]/,
          alias: "important"
        }
      }
    },
    "output": /.(?:.*(?:\n|.$))*/
  };

  // node_modules/prism-code-editor/dist/prism/languages/smali.js
  languages.smali = {
    "comment": /#.*/,
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"|'(?:[^\\\n']|\\(?:.|u[a-fA-F\d]{4}))'/g,
      greedy: true
    },
    "class-name": {
      pattern: /(^|[^L])L(?:(?:\w+|`[^\n`]*`)\/)*(?:[$\w]+|`[^\n`]*`)(?=\s*;)/,
      lookbehind: true,
      inside: {
        "class-name": {
          pattern: /(^L|\/)(?:[$\w]+|`[^\n`]*`)$/,
          lookbehind: true
        },
        "namespace": {
          pattern: /^(L)(?:(?:\w+|`[^\n`]*`)\/)+/,
          lookbehind: true,
          inside: {
            "punctuation": /\//
          }
        },
        "builtin": /^L/
      }
    },
    "builtin": [
      {
        // Reference: https://github.com/JesusFreke/smali/wiki/TypesMethodsAndFields#types
        pattern: /([()[;])[BCDFIJSVZ]+/,
        lookbehind: true
      },
      {
        // e.g. .field mWifiOnUid:I
        pattern: /([$\w>]:)[BCDFIJSVZ]/,
        lookbehind: true
      }
    ],
    "keyword": [
      {
        pattern: /(\.end\s+)[\w-]+/,
        lookbehind: true
      },
      {
        pattern: /(^|[^\w.-])\.(?!\d)[\w-]+/,
        lookbehind: true
      },
      {
        pattern: /(^|[^\w.-])(?:abstract|annotation|bridge|constructor|enum|final|interface|private|protected|public|runtime|static|synthetic|system|transient)(?![\w.-])/,
        lookbehind: true
      }
    ],
    "function": {
      pattern: /(^|[^\w.-])(?:\w+|<[$\w-]+>)(?=\()/,
      lookbehind: true
    },
    "field": {
      pattern: /[$\w]+(?=:)/,
      alias: "variable"
    },
    "register": {
      pattern: /(^|[^\w.-])[vp]\d(?![\w.-])/,
      lookbehind: true,
      alias: "variable"
    },
    "boolean": {
      pattern: /(^|[^\w.-])(?:false|true)(?![\w.-])/,
      lookbehind: true
    },
    "number": {
      pattern: /(^|[^/\w.-])-?(?:NaN|Infinity|0x(?:[a-f\d]+(?:\.[a-f\d]*)?|\.[a-f\d]+)(?:p[+-]?[a-f\d]+)?|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)[dflst]?(?![\w.-])/i,
      lookbehind: true
    },
    "label": {
      pattern: /(:)\w+/,
      lookbehind: true,
      alias: "property"
    },
    "operator": /->|\.\.|[[=]/,
    "punctuation": /[(){},:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/smalltalk.js
  languages.smalltalk = {
    "comment": {
      pattern: /"(?:""|[^"])*"/g,
      greedy: true
    },
    "char": {
      pattern: /\$./g,
      greedy: true
    },
    "string": {
      pattern: /'(?:''|[^'])*'/g,
      greedy: true
    },
    "symbol": /#[a-z\d]+|#(?:-|([+/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
    "block-arguments": {
      pattern: /(\[\s*):[^\[|]*\|/,
      lookbehind: true,
      inside: {
        "variable": /:[a-z\d]+/i,
        "punctuation": /\|/
      }
    },
    "temporary-variables": {
      pattern: /\|[^|]+\|/,
      inside: {
        "variable": /[a-z\d]+/i,
        "punctuation": /\|/
      }
    },
    "keyword": /\b(?:new|nil|self|super)\b/,
    "boolean": boolean,
    "number": [
      /\d+r-?[A-Z\d]+(?:\.[A-Z\d]+)?(?:e-?\d+)?/,
      /\b\d+(?:\.\d+)?(?:e-?\d+)?/
    ],
    "operator": /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[,@&|^!*+-]/,
    "punctuation": /[()[\]{}.:;?]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/smarty.js
  var expression10 = {
    pattern: /[^]+/
  };
  var smarty = expression10.inside = {
    "string": [
      {
        pattern: /"(?:\\.|[^\\\n"])*"/g,
        greedy: true,
        inside: {
          "interpolation": {
            pattern: /\{[^{}]*\}|`[^`]*`/,
            inside: {
              "interpolation-punctuation": {
                pattern: /^[{`]|[`}]$/,
                alias: "punctuation"
              },
              "expression": expression10
            }
          },
          "variable": /\$\w+/
        }
      },
      {
        pattern: /'(?:\\.|[^\\\n'])*'/g,
        greedy: true
      }
    ],
    "keyword": {
      pattern: /(^\{\/?)[a-z_]\w*\b(?!\()/gi,
      lookbehind: true,
      greedy: true
    },
    "delimiter": {
      pattern: /^\{\/?|\}$/g,
      greedy: true,
      alias: "punctuation"
    },
    "number": /\b0x[a-fA-F\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    "variable": [
      /\$(?!\d)\w+/,
      /#(?!\d)\w+#/,
      {
        pattern: /(\.|->|\w\s*=)(?!\d)\w+\b(?!\()/,
        lookbehind: true
      },
      {
        pattern: /(\[)(?!\d)\w+(?=\])/,
        lookbehind: true
      }
    ],
    "function": {
      pattern: /(\|\s*)@?[a-z_]\w*|\b[a-z_]\w*(?=\()/i,
      lookbehind: true
    },
    "attr-name": /\b[a-z_]\w*(?=\s*=)/i,
    "boolean": /\b(?:false|true|no|off|on|yes)\b/,
    "punctuation": /[()[\]{}.,:`]|->/,
    "operator": [
      /[%/*+-]|===|[!=<>]=?|&&|\|\|?/,
      /\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/,
      /\b(?:and|eq|[gl][te]|[gl]te|mod|neq?|not|or)\b/
    ]
  };
  languages.smarty = {
    "ignore-literal": {
      pattern: /(\{literal\})(?!\{\/literal\})[^]+?(?=\{\/literal\})/g,
      lookbehind: true,
      greedy: true
    },
    "embedded-php": {
      pattern: /(\{php\})(?!\{\/php\})[^]+?(?=\{\/php\})/g,
      lookbehind: true,
      greedy: true,
      alias: "language-php",
      inside: "php"
    },
    "smarty-comment": {
      pattern: /\{\*[^]*?\*\}/g,
      greedy: true,
      alias: "comment"
    },
    "smarty": {
      pattern: RegExp("<>|<>|<>)*})*})*}".replace(/<>/g, `{(?:[^{}"']|"(?:\\\\.|[^\\\\
"])*"|'(?:\\\\.|[^\\\\
'])*'`), "g"),
      greedy: true,
      alias: "language-smarty",
      inside: smarty
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/sml.js
  var keywords8 = /\b(?:abstype|[ae]nd|andalso|as|case|datatype|do|else|eqtype|exception|fu?n|functor|handle|if|in|include|infixr?|let|local|nonfix|of|op|open|orelse|raise|rec|sharing|sig|signature|struct|structure|then|type|val|where|while|with|withtype)\b/i;
  var longId = `(?!${keywords8.source})[a-z\\d_][\\w'.]*`;
  var class0 = {
    // This is only an approximation since the real grammar is context-free
    //
    // Why the main loop so complex?
    // The main loop is approximately the same as /(?:\s*(?:[*,]|->)\s*<TERMINAL>)*/ which is, obviously, a lot
    // simpler. The difference is that if a comma is the last iteration of the loop, then the terminal must be
    // followed by a long identifier.
    pattern: re(
      "((?:^|[^:]):\\s*)<0>(?:\\s*(?:(?:\\*|->)\\s*<0>|,\\s*<0>(?:(?=\\s*(?:[*,]|->))|(?!\\s*(?:[*,]|->))\\s+<1>)))*",
      [replace("(?:'[\\w']*|<0>|\\((?:[^()]|\\([^)]*\\))*\\)|\\{(?:[^{}]|\\{[^}]*\\})*\\})(?:\\s+<0>)*", [longId]), longId],
      "gi"
    ),
    lookbehind: true,
    greedy: true
  };
  class0.inside = languages.smlnj = languages.sml = {
    // allow one level of nesting
    "comment": /\(\*(?:[^*(]|\*(?!\))|\((?!\*)|\(\*(?:[^*(]|\*(?!\))|\((?!\*))*\*\))*\*\)/,
    "string": {
      pattern: /#?"(?:\\.|[^\\"])*"/g,
      greedy: true
    },
    "class-name": [
      class0,
      {
        pattern: /((?:^|[^\w'])(?:datatype|exception|functor|signature|structure|type)\s+)[a-z_][\w'.]*/i,
        lookbehind: true
      }
    ],
    "function": {
      pattern: /((?:^|[^\w'])fun\s+)[a-z_][\w'.]*/i,
      lookbehind: true
    },
    "keyword": keywords8,
    "variable": {
      pattern: /(^|[^\w'])'[\w']*/,
      lookbehind: true
    },
    "number": /~?\b(?:\d+(?:\.\d+)?(?:e~?\d+)?|0x[a-f\d]+)\b/i,
    "word": {
      pattern: /\b0w(?:\d+|x[a-f\d]+)\b/i,
      alias: "constant"
    },
    "boolean": /\b(?:false|true)\b/i,
    "operator": /\.{3}|:[>=:]|=>?|->|[<>]=?|[|^#@~!/*+-]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/solidity.js
  languages.sol = languages.solidity = {
    "comment": clikeComment(),
    "string": clikeString(),
    "class-name": {
      pattern: /(\b(?:contract|enum|interface|library|new|struct|using)\s+)(?!\d)[$\w]+/,
      lookbehind: true
    },
    "builtin": /\b(?:address|bool|byte|u?int(?:8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?|string|bytes(?:[1-9]|[12]\d|3[0-2])?)\b/,
    "keyword": /\b(?:_|anonymous|as|assembly|assert|break|calldata|case|constant|constructor|continue|contract|default|delete|do|else|emit|enum|event|external|for|from|function|if|import|indexed|inherited|interface|internal|is|let|library|mapping|memory|modifier|new|payable|pragma|private|public|pure|require|returns?|revert|selfdestruct|solidity|storage|struct|suicide|switch|this|throw|using|var|view|while)\b/,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "version": {
      pattern: /([<>]=?|\^)\d+\.\d+\.\d+\b/,
      lookbehind: true,
      alias: "number"
    },
    "number": clikeNumber,
    "operator": /=>|->|:=|=:|--|\+\+|\*\*|&&|\|\||>>=?|<<=?|[%&|^!=<>/*+-]=?|[~?]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/solution-file.js
  var guid = {
    // https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
    pattern: /\{[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}\}/i,
    alias: "constant",
    inside: {
      "punctuation": /[{}]/
    }
  };
  languages["solution-file"] = {
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "string": {
      pattern: /"[^\n"]*"|'[^\n']*'/g,
      greedy: true,
      inside: {
        "guid": guid
      }
    },
    "object": {
      // Foo
      //   Bar("abs") = 9
      //   EndBar
      //   Prop = TRUE
      // EndFoo
      pattern: /^([ 	]*)(?:([A-Z]\w*)\b(?=.*\n(?:\1[ 	].*\n)*\1End\2(?=[ 	]*$))|End[A-Z]\w*(?=[ 	]*$))/mg,
      lookbehind: true,
      greedy: true,
      alias: "keyword"
    },
    "property": {
      pattern: /^([ 	]*)(?!\s)[^\n"#=()]*[^\s"#=()](?=\s*=)/m,
      lookbehind: true,
      inside: {
        "guid": guid
      }
    },
    "guid": guid,
    "number": /\b\d+(?:\.\d+)*\b/,
    "boolean": /\b(?:FALSE|TRUE)\b/,
    "operator": /=/,
    "punctuation": /[(),]/
  };
  languages["sln"] = languages["solution-file"];

  // node_modules/prism-code-editor/dist/prism/languages/soy.js
  var numberPattern = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[A-F\d]+\b/;
  var string12 = clikeString();
  languages.soy = {
    "ignore-literal": {
      pattern: /(\{literal\})(?!\{\/literal\})[^]+?(?=\{\/literal\})/g,
      lookbehind: true,
      greedy: true
    },
    "soy": {
      pattern: /\{\{.+?\}\}|\{.+?\}|(^|\s)\/\/.*|\/\*[^]*?\*\//g,
      lookbehind: true,
      greedy: true,
      alias: "language-soy",
      inside: {
        "comment": {
          pattern: /(^|\s)\/\/.*|\/\*[^]*?\*\//,
          lookbehind: true
        },
        "command-arg": {
          pattern: /(\{+\/?\s*(?:alias|call|delcall|delpackage|deltemplate|namespace|template)\s+)\.?[\w.]+/,
          lookbehind: true,
          alias: "string",
          inside: {
            "punctuation": /\./
          }
        },
        "parameter": {
          pattern: /(\{+\/?\s*@?param\??\s+)\.?[\w.]+/,
          lookbehind: true,
          alias: "variable"
        },
        "keyword": {
          pattern: /(\{+\/?[^\S\n]*)(?:\\[nrt]|alias|call|case|css|default|delcall|delpackage|deltemplate|elseif|else|fallbackmsg|foreach|for|ifempty|if|lb|let|literal|msg|namespace|nil|@?param\??|rb|sp|switch|template|xid)|\b(?:any|as|attributes|bool|css|float|html|int?|js|list|map|null|number|string|uri)\b/,
          lookbehind: true
        },
        "delimiter": {
          pattern: /^\{+\/?|\/?\}+$/,
          alias: "punctuation"
        },
        "property": /\w+(?==)/,
        "variable": {
          pattern: /\$(?!\d)\w+(?:\??(?:\.\w+|\[[^\]]+\]))*/,
          inside: {
            "string": string12,
            "number": numberPattern,
            "punctuation": /[[\].?]/
          }
        },
        "string": string12,
        "function": {
          pattern: /\w+(?=\()|(\|[^\S\n]*)\w+/,
          lookbehind: true
        },
        "boolean": boolean,
        "number": numberPattern,
        "operator": /\?:?|[=<>]=?|!=|[%/*+-]|\b(?:and|not|or)\b/,
        "punctuation": /[()[\]{}.,:|]/
      }
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/turtle.js
  languages.trig = languages.turtle = {
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "multiline-string": {
      pattern: /"""(?:\\.|[^\\])*?"""|'''(?:\\.|[^\\])*?'''/g,
      greedy: true,
      alias: "string",
      inside: {
        "comment": /#.*/
      }
    },
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'/g,
      greedy: true
    },
    "url": {
      pattern: /<(?:[^\0- <>"{}|^`\\]|\\(?:u[a-fA-F\d]{4}|U[a-fA-F\d]{8}))*>/g,
      greedy: true,
      inside: {
        "punctuation": /<|>/
      }
    },
    "function": {
      pattern: /(?:(?![-.\d\xb7])[-.\w\xb7\xc0-\ufffd]+)?:(?:(?![-.])(?:[-.:\w\xc0-\ufffd]|%[a-f\d]{2}|\\.)+)?/i,
      inside: {
        "local-name": {
          pattern: /(:)[^]+/,
          lookbehind: true
        },
        "prefix": {
          pattern: /[^]+/,
          inside: {
            "punctuation": /:/
          }
        }
      }
    },
    "number": /[+-]?\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
    "punctuation": /[()[\]{}.,;]|\^\^/,
    "boolean": boolean,
    "keyword": [
      /(?:\ba|@prefix|@base)\b|=/,
      /\b(?:base|graph|prefix)\b/i
    ],
    "tag": {
      pattern: /@[a-z]+(?:-[a-z\d]+)*/i,
      inside: {
        "punctuation": /@/
      }
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/sparql.js
  insertBefore(
    languages.rq = languages.sparql = extend("turtle", {
      "boolean": /\b(?:false|true)\b/i,
      "variable": {
        pattern: /[?$]\w+/g,
        greedy: true
      }
    }),
    "punctuation",
    {
      "keyword": [
        /\b(?:a|add|all|as[ck]?|bnode|by|clear|construct|copy|create|data|default|delete|desc|describe|distinct|drop|exists|filter|from|group|having|insert|into|limit|load|minus|move|named|no[tw]|offset|optional|order|rand|reduced|select|separator|service|silent|struuid|union|using|uuid|values|where)\b/i,
        /\b(?:abs|avg|bind|[br]ound|ceil|coalesce|concat|contains|count|datatype|day|encode_for_uri|floor|group_concat|hours|if|[iu]ri|isblank|is[iu]ri|isliteral|isnumeric|lang|langmatches|[lu]case|max|md5|min|minutes|month|regex|replace|sameterm|sample|seconds|sha1|sha256|sha384|sha512|str|strafter|strbefore|strdt|strends|strlang|strlen|strstarts|substr|sum|timezone|tz|year)\b(?=\s*\()/i,
        /\b(?:base|graph|prefix)\b/i
      ]
    }
  );

  // node_modules/prism-code-editor/dist/prism/languages/splunk-spl.js
  languages["splunk-spl"] = {
    "comment": /`comment\("(?:\\.|[^\\"])*"\)`/,
    "string": {
      pattern: /"(?:\\.|[^\\"])*"/g,
      greedy: true
    },
    // https://docs.splunk.com/Documentation/Splunk/7.3.0/SearchReference/ListOfSearchCommands
    "keyword": /\b(?:abstract|accum|addcoltotals|addinfo|addtotals|analyzefields|anomalies|anomalousvalue|anomalydetection|append|appendcols|appendcsv|appendlookup|appendpipe|arules|associate|audit|autoregress|bin|bucket|bucketdir|chart|cluster|cofilter|collect|concurrency|contingency|convert|correlate|datamodel|dbinspect|dedup|delete|delta|diff|erex|eval|eventcount|eventstats|extract|fieldformat|fields|fieldsummary|filldown|fillnull|findtypes|folderize|foreach|format|from|gauge|gentimes|geom|geomfilter|geostats|head|highlight|history|iconify|input|inputcsv|inputlookup|iplocation|join|kmeans|kv|kvform|loadjob|localize|localop|lookup|makecontinuous|makemv|makeresults|map|mcollect|metadata|metasearch|meventcollect|mstats|multikv|multisearch|mvcombine|mvexpand|nomv|outlier|outputcsv|outputlookup|outputtext|overlap|pivot|predict|rangemap|rare|regex|relevancy|reltime|rename|replace|rest|return|reverse|rex|rtorder|run|savedsearch|script|scrub|search|searchtxn|selfjoin|sendemail|set|setfields|sichart|sirare|sistats|sitimechart|sitop|sort|[sx]path|strcat|streamstats|table|tags|tail|timechart|timewrap|top|transaction|transpose|trendline|tscollect|t?stats|typeahead|typelearner|typer|union|uniq|untable|where|x11|xmlkv|xmlunescape|xyseries)\b/i,
    "operator-word": {
      pattern: /\b(?:and|as|by|not|x?or)\b/i,
      alias: "operator"
    },
    "function": /\b\w+(?=\s*\()/,
    "property": /\b\w+(?=\s*=(?!=))/,
    "date": {
      // MM/DD/YYYY(:HH:MM:SS)?
      pattern: /\b\d\d?\/\d\d?\/\d{1,4}(?:(?::\d\d?){3})?\b/,
      alias: "number"
    },
    "number": /\b\d+(?:\.\d+)?\b/,
    "boolean": /\b(?:false|true|f|t)\b/i,
    "operator": /[<>=]=?|[%|/*+-]/,
    "punctuation": /[()[\],]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/sqf.js
  var comment6 = clikeComment();
  languages.sqf = {
    "comment": comment6,
    "macro": {
      pattern: /(^[ 	]*)#[a-z](?:\\[^]|[^\\\n])*/img,
      lookbehind: true,
      greedy: true,
      alias: "property",
      inside: {
        "directive": {
          pattern: /#[a-z]+\b/i,
          alias: "keyword"
        },
        "comment": comment6
      }
    },
    "string": {
      pattern: /"(?:(?:"")?[^"])*"(?!")|'(?:[^'])*'/g,
      greedy: true
    },
    "keyword": /\b(?:breakout|breakto|call|case|catch|default|do|echo|else|execfsm|execvm|exitwith|for|foreach|foreachmember|foreachmemberagent|foreachmemberteam|from|goto|if|nil|preprocessfile|preprocessfilelinenumbers|private|scopename|spawn|step|switch|then|throw|to|try|while|with)\b/i,
    "boolean": /\b(?:false|true)\b/i,
    "function": /\b(?:abs|acctime|acos|action(?:ids|keys|keysimages|keysnames|keysnamesarray|name|params)?|activateaddons|activatedaddons|activatekey|add(?:3denconnection|3deneventhandler|3denlayer|action|backpack(?:cargo|cargoglobal|global)?|camshake|curator(?:addons|cameraarea|editableobjects|editingarea|points)|editorobject|eventhandler|force|forcegeneratorrtd|goggles|groupicon|handgunitem|headgear|item|itemcargo|itemcargoglobal|itempool|itemtobackpack|itemtouniform|itemtovest|livestats|magazine(?:ammocargo|cargo|cargoglobal|global|pool|s?|turret)|menu|menuitem|missioneventhandler|mpeventhandler|musiceventhandler|ownedmine|playerscores|primaryweaponitem|publicvariableeventhandler|rating|resources|score|scoreside|secondaryweaponitem|switchableunit|teammember|toremainscollector|torque|uniform|vehicle|vest|waypoint|weapon(?:cargo|cargoglobal|global|item|pool|turret)?)|admin|agents?|agltoasl|aimedattarget|aimpos|airdensitycurvertd|airdensityrtd|airplanethrottle|airportside|aisfinishheal|alive|all(?:3denentities|airports|controls|curators|cutlayers|dead|deadmen|displays|groups|mapmarkers|mines|missionobjects|ow3dmode|owcrewinimmobile|owcuratorlogicignoreareas|owdamage|owdammage|owfileoperations|owfleeing|owgetin|owsprint|players|simpleobjects|sites|turrets|units|unitsuav|variables)|ammo|ammoonpylon|animat(?:e|ebay|edoor|epylon|esource|ionnames|ionphase|ionsourcephase|ionstate)|append|apply|armorypoints|arrayintersect|asin|asltoagl|asltoatl|assert|assign(?:ascargo|ascargoindex|ascommander|asdriver|asgunner|asturret|curator|edcargo|edcommander|eddriver|edgunner|editems|edtarget|edteam|edvehicle|edvehiclerole|item|team|toairport)|atan2?|atg|atltoasl|attachedobjects?|attachedto|attachobject|attachto|attackenabled|backpack(?:cargo|container|items|magazines|spacefor)?|behaviour|benchmark|binocular|blufor|boundingbox|boundingboxreal|boundingcenter|briefingname|buildingexit|buildingpos|buldozer_enableroaddiag|buldozer_isenabledroaddiag|buldozer_loadnewroads|buldozer_reloadopermap|buttonaction|buttonsetaction|cadetmode|callextension|cam(?:command|commit|commitprepared|committed|constuctionsetparams|create|destroy|eraeffect|eraeffectenablehud|erainterest|eraon|eraview|paignconfigfile|preload|preloaded|prepare(?:bank|dir|dive|focus|fov|fovrange|pos|relpos|target)|setbank|setdir|setdive|setfocus|setfov|setfovrange|setpos|setrelpos|settarget|target|usenvg)|can(?:add|additemtobackpack|additemtouniform|additemtovest|celsimpletaskdestination|fire|move|slingload|stand|suspend|triggerdynamicsimulation|unloadincombat|vehiclecargo)|captive|captivenum|cbchecked|cbsetchecked|ceil|channelenabled|cheatsenabled|checkaifeature|checkvisibility|civilian|classname|clear(?:3denattribute|3deninventory|allitemsfrombackpack|backpackcargo|backpackcargoglobal|forcesrtd|groupicons|itemcargo|itemcargoglobal|itempool|magazinecargo|magazinecargoglobal|magazinepool|overlay|radio|vehicleinit|weaponcargo|weaponcargoglobal|weaponpool)|clientowner|closedialog|closedisplay|closeoverlay|collapseobjecttree|collect3denhistory|collectivertd|combatmode|command(?:artilleryfire|chat|er|fire|follow|fsm|getout|ingmenu|move|radio|stop|suppressivefire|target|watch)|comment|commitoverlay|compile|compilefinal|completedfsm|composetext|config(?:classes|file|hierarchy|name|null|properties|sourceaddonlist|sourcemod|sourcemodlist)|confirmsensortarget|connectterminaltouav|controlnull|controlsgroupctrl|copyfromclipboard|copytoclipboard|copywaypoints|cos|count|countenemy|countfriendly|countside|counttype|countunknown|create(?:3dencomposition|3denentity|agent|center|dialog|diarylink|diaryrecord|diarysubject|display|geardialog|group|guardedpoint|location|marker|markerlocal|menu|mine|missiondisplay|mpcampaigndisplay|simpleobject|simpletask|site|soundsource|task|team|trigger|unit|vehicle|vehiclecrew|vehiclelocal)|crew|ctaddheader|ctaddrow|ctclear|ctcursel|ctdata|ctfindheaderrows|ctfindrowheader|ctheadercontrols|ctheadercount|ctremoveheaders|ctremoverows|ctrl(?:activate|addeventhandler|angle|autoscrolldelay|autoscrollrewind|autoscrollspeed|checked|classname|commit|committed|create|delete|enabled?|fade|htmlloaded|id[cd]|mapanimadd|mapanimclear|mapanimcommit|mapanimdone|mapcursor|mapmouseover|mapscale|mapscreentoworld|mapworldtoscreen|model|modeldirandup|modelscale|parent|parentcontrolsgroup|position|removealleventhandlers|removeeventhandler|scale|set(?:activecolor|angle|autoscrolldelay|autoscrollrewind|autoscrollspeed|backgroundcolor|checked|disabledcolor|eventhandler|fade|focus|font|fonth[1-6]b?|fontheight(?:h[1-6]|secondary)?|fontpb?|fontsecondary|foregroundcolor|model|modeldirandup|modelscale|pixelprecision|position|scale|structuredtext|text|textcolor|textcolorsecondary|textsecondary|tooltip|tooltipcolorbox|tooltipcolorshade|tooltipcolortext)|shown?|text|textheight|textsecondary|textwidth|type|visible)|ctrowcontrols|ctrowcount|ctsetcursel|ctsetdata|ctsetheadertemplate|ctsetrowtemplate|ctsetvalue|ctvalue|curator(?:addons|camera|cameraarea|cameraareaceiling|coef|editableobjects|editingarea|editingareatype|mouseover|points|registeredobjects|selected|waypointcost)|current(?:3denoperation|channel|command|magazine|magazinedetail|magazinedetailturret|magazineturret|muzzle|namespace|tasks?|throwable|visionmode|waypoint|weapon|weaponmode|weaponturret|zeroing)|cursorobject|cursortarget|customchat|customradio|cutfadeout|cutobj|cutrsc|cuttext|damage|date|datetonumber|daytime|deactivatekey|debriefingtext|debugfsm|debuglog|deg|delete(?:3denentities|at|center|collection|editorobject|group|groupwhenempty|identity|location|marker|markerlocal|range|resources|site|status|team|vehicle|vehiclecrew|waypoint)|detach|detectedmines|diag_(?:activemissionfsms|activescripts|activesqfscripts|activesqsscripts|captureframe|captureframetofile|captureslowframe|codeperformance|drawmode|dynamicsimulationend|enabled?|fps|fpsmin|frameno|lightnewload|list|log|logslowframe|mergeconfigfile|recordturretlimits|setlightnew|ticktime|toggle)|dialog|diarysubjectexists|didjip|didjipowner|difficulty|difficultyenabled|difficultyenabledrtd|difficultyoption|direction|directsay|disable(?:ai|collisionwith|conversation|debriefingstats|mapindicators|nvgequipment|remotesensors|serialization|tiequipment|uavconnectability|userinput)|display(?:addeventhandler|ctrl|null|parent|removealleventhandlers|removeeventhandler|seteventhandler)|dissolveteam|distance|distance2d|distancesqr|distributionregion|do3denaction|doartilleryfire|dofire|dofollow|dofsm|dogetout|domove|doorphase|dostop|dosuppressivefire|dotarget|dowatch|draw(?:arrow|ellipse|icon|icon3d|lin[ek]|line3d|location|polygon|rectangle|triangle)|driver|drop|dynamicsimulationdistance|dynamicsimulationdistancecoef|dynamicsimulationenabled|dynamicsimulationsystemenabled|east|edit3denmissionattributes|editobject|editorseteventhandler|effectivecommander|emptypositions|enable(?:ai|aifeature|aimprecision|attack|audiofeature|autostartuprtd|autotrimrtd|camshake|caustics|channel|collisionwith|copilot|debriefingstats|diaglegend|dynamicsimulation|dynamicsimulationsystem|enddialog|engineartillery|environment|fatigue|gunlights|infopanelcomponent|irlasers|mimics|personturret|radio|reload|ropeattach|satnormalondetail|saving|sentences|simulation|simulationglobal|stamina|stressdamage|teamswitch|traffic|uavconnectability|uavwaypoints|vehiclecargo|vehiclesensor|weapondisassembly)|endl|endloadingscreen|endmission|engineon|enginesisonrtd|enginespowerrtd|enginesrpmrtd|enginestorquertd|entities|environmentenabled|estimatedendservertime|estimatedtimeleft|evalobjectargument|everybackpack|everycontainer|exec|execeditorscript|exp|expecteddestination|exportjipmessages|eyedirection|eyepos|face|faction|fademusic|faderadio|fadesound|fadespeech|failmission|fillweaponsfrompool|find|findcover|finddisplay|findeditorobject|findemptyposition|findemptypositionready|findif|findnearestenemy|finishmissioninit|finite|fire|fireattarget|firstbackpack|flag|flaganimationphase|flagowner|flagside|flagtexture|fleeing|floor|flyinheight|flyinheightasl|fog|fogforecast|fogparams|force(?:adduniform|atpositionrtd|d?map|end|flagtexture|followroad|generatorrtd|respawn|speed|walk|weaponfire|weatherchange)|forgettarget|format(?:ion|iondirection|ionleader|ionmembers|ionposition|iontask|text)?|formleader|freelook|fromeditor|fuel|fullcrew|gearidcammocount|gearslotammocount|gearslotdata|get(?:3den(?:actionstate|attribute|camera|connections|entity|entityid|grid|iconsvisible|layerentities|linesvisible|missionattribute|mouseover|selected)|aimingcoef|allenvsoundcontrollers|allhitpointsdamage|allownedmines|allsoundcontrollers|ammocargo|animaimprecision|animspeedcoef|array|artilleryammo|artillerycomputersettings|artilleryeta|assignedcuratorlogic|assignedcuratorunit|backpackcargo|bleedingremaining|burningvalue|cameraviewdirection|cargoindex|centerofmass|clientstate|clientstatenumber|compatiblepylonmagazines|connecteduav|containermaxload|cursorobjectparams|customaimcoef|dammage|description|dir|dirvisual|dlcassetsusage|dlcassetsusagebyname|dlcs|dlcusagetime|editorcamera|editormode|editorobjectscope|elevationoffset|enginetargetrpmrtd|envsoundcontroller|fatigue|fieldmanualstartpage|forcedflagtexture|friend|fsmvariable|fuelcargo|groupiconparams|groupicons?|hidefrom|hit|hitindex|hitpointdamage|itemcargo|magazinecargo|marker(?:color|pos|size|type)|mass|missionconfig|missionconfigvalue|missiondlcs|missionlayerentities|missionlayers|modelinfo|mouseposition|musicplayedtime|number|object(?:argument|children|dlc|materials|proxy|textures|type|viewdistance)|oxygenremaining|personuseddlcs|pilotcameradirection|pilotcameraposition|pilotcamerarotation|pilotcameratarget|platenumber|playerchannel|playerscores|playeruid|playeruidold|pos|posaslvisual|posaslw?|posatl|posatlvisual|posvisual|posworld|pylonmagazines|reldir|relpos|remotesensorsdisabled|repaircargo|resolution|rotorbrakertd|shadowdistance|shotparents|slingload|soundcontroller|soundcontrollerresult|speed|stamina|statvalue|suppression|terraingrid|terrainheightasl|text|totaldlcusagetime|trimoffsetrtd|unitloadout|unittrait|usermfdtext|usermfdvalue|variable|vehiclecargo|weaponcargo|weaponsway|wingsorientationrtd|wingspositionrtd|wppos)|glanceat|globalchat|globalradio|goggles|group(?:chat|fromnetid|iconselectable|iconsvisible|id|owner|radio|selectedunits|selectunit)?|grpnull|gunner|gusts|halt|handgunitems|handgunmagazine|handgunweapon|handshit|hasinterface|haspilotcamera|hasweapon|hcallgroups|hcgroupparams|hcleader|hcremoveallgroups|hcremovegroup|hcselected|hcselectgroup|hcsetgroup|hcshowbar|hcshownbar|headgear|hidebody|hideobject|hideobjectglobal|hideselection|hintc?|hintcadet|hintsilent|hmd|hostmission|htmlload|hudmovementlevels|humidity|image|importallgroups|importance|inarea|inareaarray|incapacitatedstate|independent|inflamed?|infopanelcomponentenabled|infopanelcomponents|infopanels?|ingameuiseteventhandler|inheritsfrom|initambientlife|inpolygon|inputaction|inrangeofartillery|inserteditorobject|intersect|is(?:3den|3denmultiplayer|abletobreathe|agent|aimprecisionenabled|array|autohoveron|autonomous|autostartupenabledrtd|autotest|autotrimonrtd|bleeding|burning|class|collisionlighton|copilotenabled|damageallowed|dedicated|dlcavailable|engineon|equalto|equaltype(?:all|any|array|params)?|filepatchingenabled|flashlighton|flatempty|forcedwalk|formationleader|groupdeletedwhenempty|hidden|inremainscollector|instructorfigureenabled|irlaseron|keyactive|kindof|laseron|lighton|localized|manualfire|markedforcollection|multiplayer|multiplayersolo|nil|null|number|objecthidden|objectrtd|onroad|pipenabled|player|realtime|remoteexecuted|remoteexecutedjip|server|showing3dicons|simpleobject|sprintallowed|staminaenabled|steammission|streamfriendlyuienabled|stressdamageenabled|text|touchingground|turnedout|tuthintsenabled|uavconnectable|uavconnected|uicontext|uniformallowed|vehiclecargo|vehicleradaron|vehiclesensorenabled|walking|weapondeployed|weaponrested)|itemcargo|items|itemswithmagazines|join|joinas|joinassilent|joinsilent|joinstring|kbadddatabase|kbadddatabasetargets|kbaddtopic|kbhastopic|kbreact|kbremovetopic|kbtell|kbwassaid|keyimage|keyname|knowsabout|land|landat|landresult|language|lasertarget|lb(?:add|clear|color|colorright|cursel|data|delete|isselected|picture|pictureright|selection|set(?:color|colorright|cursel|data|picture(?:color|colordisabled|colorselected|right|rightcolor|rightcolordisabled|rightcolorselected)?|selectcolor|selectcolorright|selected|text|textright|tooltip|value)|size|sort|sortbyvalue|text|textright|value)|leader|leaderboard(?:deinit|getrows|init|requestrowsfriends|requestrowsglobal|requestrowsglobalarounduser|srequestuploadscore|srequestuploadscorekeepbest|state)|leavevehicle|librarycredits|librarydisclaimers|lifestate|lightattachobject|lightdetachobject|lightison|lightnings|limitspeed|linearconversion|linebreak|lineintersects(?:objs|surfaces|with)?|linkitem|list|listobjects|listremotetargets|listvehiclesensors|ln|lnb(?:addarray|addcolumn|addrow|clear|color|colorright|curselrow|data|deletecolumn|deleterow|getcolumnsposition|picture|pictureright|set(?:color|colorright|columnspos|curselrow|data|picture|picturecolor|picturecolorright|picturecolorselected|picturecolorselectedright|pictureright|text|textright|value)|size|sort|sortbyvalue|text|textright|value)|load(?:abs|backpack|file|game|identity|magazine|overlay|status|uniform|vest)?|local|localize|locationnull|locationposition|lock(?:camerato|cargo|driver|ed|edcargo|eddriver|edturret|identity|turret|wp)?|log|logentities|lognetwork|lognetworkterminate|lookat|lookatpos|magazine(?:cargo|s|sallturrets|sammo|sammocargo|sammofull|sdetail|sdetailbackpack|sdetailuniform|sdetailvest|sturret|turretammo)|mapanimadd|mapanimclear|mapanimcommit|mapanimdone|mapcenteroncamera|mapgridposition|markasfinishedonsteam|marker(?:alpha|brush|color|dir|pos|shape|size|text|type)|max|members|menu(?:action|add|checked|clear|collapse|data|delete|enabled?|expand|hover|picture|setaction|setcheck|setdata|setpicture|setvalue|shortcut|shortcuttext|size|sort|text|url|value)|m?in|mineactive|minedetectedby|missionconfigfile|missiondifficulty|missionname|missionnamespace|missionstart|missionversion|modeltoworld|modeltoworldvisual|modeltoworldvisualworld|modeltoworldworld|modparams|moonintensity|moonphase|morale|move(?:3dencamera|inany|incargo|incommander|indriver|ingunner|inturret|objecttoend|out|time|to|tocompleted|tofailed)?|musicvolume|name|namesound|nearentities|nearest(?:building|locations?|locationwithdubbing|objects?|terrainobjects)|nearobjects|nearobjectsready|nearroads|nearsupplies|neartargets|needreload|netid|netobjnull|newoverlay|nextmenuitemindex|nextweatherchange|nmenuitems|numberofenginesrtd|numbertodate|objectcurators|objectfromnetid|objectparent|objnull|objstatus|on(?:briefinggear|briefinggroup|briefingnotes|briefingplan|briefingteamswitch|commandmodechanged|doubleclick|eachframe|groupiconclick|groupiconoverenter|groupiconoverleave|hcgroupselectionchanged|mapsingleclick|playerconnected|playerdisconnected|preloadfinished|preloadstarted|shownewobject|teamswitch)|opencuratorinterface|opendlcpage|opendsinterface|openmap|opensteamapp|openyoutubevideo|opfor|ordergetin|overcast|overcastforecast|owner|params?|parsenumber|parsesimplearray|parsetext|parsingnamespace|particlesquality|pi|pickweaponpool|pitch|pixelgrid|pixelgridbase|pixelgridnouiscale|pixel[hw]|play(?:ableslotsnumber|ableunits|action|actionnow|er|errespawntime|erside|ersnumber|gesture|mission|move|movenow|music|scriptedmission|sound|sound3d)|position|positioncameratoworld|posscreentoworld|posworldtoscreen|ppeffect(?:adjust|commit|committed|create|destroy|enabled?|forceinnvg)|precision|preload(?:camera|object|sound|titleobj|titlersc)|primaryweapon|primaryweaponitems|primaryweaponmagazine|priority|processdiarylink|processinitcommands|productversion|profilename|profilenamespace|profilenamesteam|progressloadingscreen|progressposition|progresssetposition|publicvariable|publicvariableclient|publicvariableserver|pushback|pushbackunique|putweaponpool|queryitemspool|querymagazinepool|queryweaponpool|rad|radiochannel(?:add|create|remove|setcallsign|setlabel)|radiovolume|rain|rainbow|random|rank|rankid|rating|rectangular|registeredtasks|registertask|reload|reloadenabled|remotecontrol|remoteexec|remoteexeccall|remoteexecutedowner|remove(?:3denconnection|3deneventhandler|3denlayer|action|all3deneventhandlers|allactions|allassigneditems|allcontainers|allcuratoraddons|allcuratorcameraareas|allcuratoreditingareas|alleventhandlers|allhandgunitems|allitems|allitemswithmagazines|allmissioneventhandlers|allmpeventhandlers|allmusiceventhandlers|allownedmines|allprimaryweaponitems|allweapons|backpack|backpackglobal|curator(?:addons|cameraarea|editableobjects|editingarea)|drawicon|drawlinks|eventhandler|fromremainscollector|goggles|groupicon|handgunitem|headgear|itemfrombackpack|itemfromuniform|itemfromvest|items?|magazineglobal|magazines?|magazinesturret|magazineturret|menuitem|missioneventhandler|mpeventhandler|musiceventhandler|ownedmine|primaryweaponitem|secondaryweaponitem|simpletask|switchableunit|teammember|uniform|vest|weapon(?:attachmentcargo|cargo|global|turret)?)|reportremotetarget|requiredversion|resetcamshake|resetsubgroupdirection|resistance|resize|resources|respawnvehicle|restarteditorcamera|reveal|revealmine|reverse|reversedmousey|roadat|roadsconnectedto|roledescription|rope(?:attachedobjects|attachedto|attachenabled|attachto|create|cut|destroy|detach|endposition|length|s|unwind|unwound)|rotorsforcesrtd|rotorsrpmrtd|round|runinitscript|safezone[hwxy]|safezonewabs|safezonexabs|save(?:3deninventory|game|identity|joysticks|overlay|profilenamespace|status|var)|savingenabled|say|say2d|say3d|score|scoreside|screenshot|screentoworld|scriptdone|scriptname|scriptnull|scudstate|secondaryweapon|secondaryweaponitems|secondaryweaponmagazine|select(?:bestplaces|diarysubject|ededitorobjects|editorobject|ionnames|ionposition|leader|max|min|noplayer|player|random|randomweighted|weapon|weaponturret)?|sendaumessage|sendsimplecommand|sendtask|sendtaskresult|sendudpmessage|servercommand|servercommandavailable|servercommandexecutable|servername|servertime|set(?:3denattributes?|3den(?:grid|iconsvisible|layer|linesvisible|logictype|missionattributes?|modelsvisible|objecttype|selected)|acctime|actualcollectivertd|airplanethrottle|airportside|ammo|ammocargo|ammoonpylon|animspeedcoef|aperture|aperturenew|armorypoints|attributes|autonomous|behaviour|bleedingremaining|brakesrtd|camerainterest|camshakedefparams|camshakeparams|camuseti|captive|centerofmass|collisionlight|combatmode|compassoscillation|convoyseparation|curator(?:cameraareaceiling|coef|editingareatype|waypointcost)|currentchannel|currenttask|currentwaypoint|customaimcoef|customweightrtd|damage|dammage|date|debriefingtext|defaultcamera|destination|detailmapblendpars|dir|direction|drawicon|driveonpath|dropinterval|dynamicsimulationdistance|dynamicsimulationdistancecoef|editormode|editorobjectscope|effectcondition|enginerpmrtd|face|faceanimation|fatigue|featuretype|flaganimationphase|flagowner|flagside|flagtexture|fog|forcegeneratorrtd|formation|formationtask|formdir|friend|fromeditor|fsmvariable|fuel|fuelcargo|groupicon|groupiconparams|groupiconsselectable|groupiconsvisible|groupid|groupidglobal|groupowner|gusts|hidebehind|hit|hitindex|hitpointdamage|horizonparallaxcoef|hudmovementlevels|identity|importance|infopanel|leader|light(?:ambient|attenuation|brightness|color|daylight|flaremaxdistance|flaresize|intensity|nings|useflare)|localwindparams|magazineturretammo|marker(?:alpha|brush|color|dir|pos|shape|size|text|type)(?:local)?|mass|mimic|mouseposition|musiceffect|musiceventhandler|name|namesound|object(?:arguments|material|materialglobal|proxy|texture|textureglobal|viewdistance)|overcast|owner|oxygenremaining|particle(?:circle|class|fire|params|random)|pilotcameradirection|pilotcamerarotation|pilotcameratarget|pilotlight|pipeffect|pitch|platenumber|playable|playerrespawntime|pos|posasl[2w]?|posatl|position|posworld|pylonloadout|pylonspriority|radiomsg|rain|rainbow|randomlip|rank|rectangular|repaircargo|rotorbrakertd|shadowdistance|shotparents|side|simpletask(?:alwaysvisible|customdata|description|destination|target|type)|simulweatherlayers|size|skill|slingload|soundeffect|speaker|speech|speedmode|stamina|staminascheme|statvalue|suppression|systemofunits|targetage|taskmarkeroffset|taskresult|taskstate|terraingrid|text|timemultiplier|titleeffect|tonemapping|tonemappingparams|trafficdensity|trafficdistance|trafficgap|trafficspeed|trigger(?:activation|area|statements|text|timeout|type)|type|unconscious|unitability|unitloadout|unitpos|unitposweak|unitrank|unitrecoilcoefficient|unittrait|unloadincombat|useractiontext|usermfdtext|usermfdvalue|variable|vectordir|vectordirandup|vectorup|vehicle(?:ammo|ammodef|armor|cargo|id|init|lock|position|radar|receiveremotetargets|reportownposition|reportremotetargets|tipars|varname)|velocity|velocitymodelspace|velocitytransformation|viewdistance|visibleiftreecollapsed|wantedrpmrtd|waves|waypoint(?:behaviour|combatmode|completionradius|description|forcebehaviour|formation|houseposition|loiterradius|loitertype|name|position|script|speed|statements|timeout|type|visible)|weaponreloadingtime|wind|winddir|windforce|windstr|wingforcescalertd|wppos)?|show(?:3dicons|cinemaborder|commandingmenu|legend|nartillerycomputer|n?chat|n?compass|n?curatorcompass|neweditorobject|n?gps|n?hud|n?map|n?pad|n?radio|n?scoretable|n?uavfeed|n?warrant|n?watch|subtitles|waypoints?)|side(?:ambientlife|chat|empty|enemy|friendly|logic|radio|unknown)?|simpletasks|simulationenabled|simulclouddensity|simulcloudocclusion|simulinclouds|simulweathersync|sin|size|sizeof|skill|skillfinal|skiptime|sleep|slider(?:position|range|setposition|setrange|setspeed|speed)|slingloadassistantshown|soldiermagazines|someammo|sort|soundvolume|speaker|speed|speedmode|splitstring|sqrt|squadparams|stance|startloadingscreen|stop|stopenginertd|stopped|str|sunormoon|supportinfo|suppressfor|surfaceiswater|surfacenormal|surfacetype|swimindepth|switch(?:ableunits|action|camera|gesture|light|move)|synchronize(?:dobjects|dtriggers|dwaypoints|objectsadd|objectsremove|trigger|waypoint)|systemchat|systemofunits|tan|targetknowledge|targets|targetsaggregate|targetsquery|task(?:alwaysvisible|children|completed|customdata|description|destination|hint|markeroffset|null|parent|result|state|type)|team(?:member|membernull|name|s|switch|switchenabled|type)|terminate|terrainintersect|terrainintersectasl|terrainintersectatasl|text|textlog|textlogformat|tg|time|timemultiplier|titlecut|titlefadeout|titleobj|titlersc|titletext|toarray|tofixed|tolower|tostring|toupper|trigger(?:activated|activation|area|attachedvehicle|attachobject|attachvehicle|dynamicsimulation|statements|text|timeout|timeoutcurrent|type)|turretlocal|turretowner|turretunit|tv(?:add|clear|collapse|collapseall|count|cursel|data|delete|expand|expandall|picture|pictureright|set(?:color|cursel|data|picture(?:color|colordisabled|colorselected|right|rightcolor|rightcolordisabled|rightcolorselected)?|selectcolor|text|tooltip|value)|sort|sortbyvalue|text|tooltip|value)|type|typename|typeof|uavcontrol|uinamespace|uisleep|unassigncurator|unassignitem|unassignteam|unassignvehicle|underwater|uniform|uniformcontainer|uniformitems|uniformmagazines|unit(?:addons|aimposition|aimpositionvisual|backpack|isuav|pos|ready|recoilcoefficient|sbelowheight|s)|unlinkitem|unlockachievement|unregistertask|updatedrawicon|updatemenuitem|updateobjecttree|useaiopermapobstructiontest|useaisteeringcomponent|useaudiotimeformoves|userinputdisabled|vector(?:add|cos|crossproduct|diff|dir|dirvisual|distance|distancesqr|dotproduct|fromto|magnitude|magnitudesqr|modeltoworld|modeltoworldvisual|multiply|normalized|up|upvisual|worldtomodel|worldtomodelvisual)|vehicle(?:cargoenabled|chat|radio|receiveremotetargets|reportownposition|reportremotetargets|s|varname)?|velocity|velocitymodelspace|verifysignature|vest|vestcontainer|vestitems|vestmagazines|viewdistance|visible(?:compass|gps|map|position|positionasl|scoretable|watch)|waituntil|waves|waypoint(?:attachedobject|attachedvehicle|attachobject|attachvehicle|behaviour|combatmode|completionradius|description|forcebehaviour|formation|houseposition|loiterradius|loitertype|name|position|s|script|senableduav|show|speed|statements|timeout|timeoutcurrent|type|visible)|weapon(?:accessories|accessoriescargo|cargo|direction|inertia|lowered|s|sitems|sitemscargo|state|sturret)|weightrtd|west|wfsidetext|wind|winddir|windrtd|windstr|wingsforcesrtd|world(?:name|size|tomodel|tomodelvisual|toscreen))\b/i,
    "number": /(?:\$|\b0x)[a-f\d]+\b|(?:\B\.\d+|\b\d+(?:\.\d+)?)(?:e[+-]?\d+)?\b/i,
    "operator": /##|>>|&&|\|\||[!=<>]=?|[%#^/*+-]|\b(?:and|mod|not|or)\b/i,
    "punctuation": clikePunctuation,
    "magic-variable": {
      pattern: /\b(?:this|thislist|thistrigger|_exception|_fnc_scriptname|_fnc_scriptnameparent|_foreachindex|_this|_thiseventhandler|_thisfsm|_thisscript|_x)\b/i,
      alias: "keyword"
    },
    "constant": /\bdik(?:_[a-z\d]+)+\b/i
  };

  // node_modules/prism-code-editor/dist/prism/languages/squirrel.js
  languages.squirrel = {
    "comment": {
      pattern: /\/\*[^]*?(?:\*\/|$)|\/\/.*|#.*/g,
      greedy: true
    },
    "char": {
      pattern: /(^|[^\\"'])'(?:[^\\']|\\(?:[xuU][a-fA-F\d]{0,8}|[^]))'/g,
      lookbehind: true,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\"'@])(?:@"(?:[^"]|"")*"(?!")|"(?:\\.|[^\\\n"])*")/g,
      lookbehind: true,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:class|enum|extends|instanceof)\s+)\w+(?:\.\w+)*/,
      lookbehind: true,
      inside: {
        "punctuation": /\./
      }
    },
    "keyword": /\b(?:__FILE__|__LINE__|base|break|case|catch|class|clone|const|constructor|continue|default|delete|else|enum|extends|for|foreach|function|if|in|instanceof|local|null|resume|return|static|switch|this|throw|try|typeof|while|yield)\b/,
    "boolean": boolean,
    "function": /\b\w+(?=\()/,
    "number": /\b(?:0x[a-fA-F\d]+|\d+(?:\.(?:\d+|[eE][+-]?\d+))?)\b/,
    "attribute-punctuation": {
      pattern: /<\/|\/>/,
      alias: "important"
    },
    "lambda": {
      pattern: /@(?=\()/,
      alias: "operator"
    },
    "operator": /--|\+\+|<=>|<[-<]|>>>?|&&?|\|\|?|[%!=<>/*+-]=?|[~^]|::?/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/stan.js
  var higherOrderFunctions = /\b(?:algebra_solver|algebra_solver_newton|integrate_1d|integrate_ode|integrate_ode_bdf|integrate_ode_rk45|map_rect|ode_(?:adams|bdf|ckrk|rk45)(?:_tol)?|ode_adjoint_tol_ctl|reduce_sum|reduce_sum_static)\b/;
  var expression11 = {
    pattern: /(=\s*)\S(?:\S|\s+(?!\s))*?(?=\s*(?:>$|,\s*\w+\s*=))/,
    lookbehind: true
  };
  expression11.inside = languages.stan = {
    "comment": /\/\/.*|\/\*[^]*?\*\/|#(?!include).*/,
    "string": {
      // String literals can contain spaces and any printable ASCII characters except for " and \
      // https://mc-stan.org/docs/2_24/reference-manual/print-statements-section.html#string-literals
      pattern: /"[ !#-[\]-~]*"/g,
      greedy: true
    },
    "directive": {
      pattern: /^([ 	]*)#include\b.*/m,
      lookbehind: true,
      alias: "property"
    },
    "function-arg": {
      pattern: RegExp(
        `(${higherOrderFunctions.source}\\s*\\(\\s*)[a-zA-Z]\\w*`
      ),
      lookbehind: true,
      alias: "function"
    },
    "constraint": {
      pattern: /(\b(?:int|matrix|real|row_vector|vector)\s*)<[^<>]*>/,
      lookbehind: true,
      inside: {
        "expression": expression11,
        "property": /\b[a-z]\w*(?=\s*=)/i,
        "operator": /=/,
        "punctuation": /^<|>$|,/
      }
    },
    "keyword": [
      {
        pattern: /\bdata(?=\s*\{)|\b(?:functions|generated|model|parameters|quantities|transformed)\b/,
        alias: "program-block"
      },
      /\b(?:array|break|cholesky_factor_corr|cholesky_factor_cov|complex|continue|corr_matrix|cov_matrix|data|else|for|if|increment_log_prob|int?|matrix|ordered|positive_ordered|print|real|reject|return|row_vector|simplex|target|unit_vector|vector|void|while)\b/,
      // these are functions that are known to take another function as their first argument.
      higherOrderFunctions
    ],
    "function": /\b[a-z]\w*(?=\s*\()/i,
    "number": /(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
    "boolean": boolean,
    "operator": /<-|\.[*/]=?|\|\|?|&&|[!=<>/*+-]=?|['^%~?:]/,
    "punctuation": /[()[\]{},;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/stata.js
  var expression12 = {
    pattern: /[^]+/
  };
  expression12.inside = languages.stata = {
    "comment": [
      {
        pattern: /(^[ 	]*)\*.*/mg,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|\s)\/\/.*|\/\*[^]*?\*\//g,
        lookbehind: true,
        greedy: true
      }
    ],
    "string-literal": {
      pattern: /"[^\n"]*"|[‘`']".*?"[’`']/g,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /\$\{[^{}]*\}|[‘`']\w[^’`'\n]*[’`']/,
          inside: {
            "punctuation": /^\$\{|\}$/,
            "expression": expression12
          }
        },
        "string": /[^]+/
      }
    },
    "mata": {
      pattern: /(^[ 	]*mata[ 	]*:)[^]+?(?=^end\b)/mg,
      lookbehind: true,
      greedy: true,
      alias: "language-mata",
      inside: languages.mata
    },
    "java": {
      pattern: /(^[ 	]*java[ 	]*:)[^]+?(?=^end\b)/mg,
      lookbehind: true,
      greedy: true,
      alias: "language-java",
      inside: languages.java
    },
    "python": {
      pattern: /(^[ 	]*python[ 	]*:)[^]+?(?=^end\b)/mg,
      lookbehind: true,
      greedy: true,
      alias: "language-python",
      inside: languages.py
    },
    "command": {
      pattern: /(^[ 	]*(?:\.[ 	]+)?(?:(?:bayes|bootstrap|by|bysort|capture|collect|fmm|frame|jackknife|m?fp|mi|nestreg|noisily|permute|quietly|rolling|simulate|statsby|stepwise|svy|version|xi)\b[^\n:]*:[ 	]*|(?:capture|noisily|quietly|version)[ 	]+)?)[a-zA-Z]\w*/mg,
      lookbehind: true,
      greedy: true,
      alias: "keyword"
    },
    "variable": /\$\w+|[‘`']\w[^’`'\n]*[’`']/,
    "keyword": /\b(?:bayes|bootstrap|by|bysort|capture|clear|collect|fmm|frame|if|in|jackknife|mi[ 	]+estimate|m?fp|nestreg|noisily|of|permute|quietly|rolling|simulate|sort|statsby|stepwise|svy|varlist|version|xi)\b/,
    "boolean": /\b(?:off|on)\b/,
    "number": /\b\d+(?:\.\d+)?\b|\B\.\d+/,
    "function": /\b[a-z_]\w*(?=\()/i,
    "operator": /--|\+\+|##?|[~!=<>]=?|[&|^/*+-]/,
    "punctuation": /[()[\]{},:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/stylus.js
  var unit = {
    pattern: /(\b\d+)(?:%|[a-z]+)/,
    lookbehind: true
  };
  var number4 = {
    pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
    lookbehind: true
  };
  var comment7 = clikeComment();
  var string13 = clikeString();
  var interpolation9 = {
    pattern: /\{[^\n}:]*\}/,
    alias: "variable",
    inside: {
      "delimiter": {
        pattern: /^\{|\}$/,
        alias: "punctuation"
      }
    }
  };
  var func3 = {
    pattern: /[\w-]+\([^)]*\).*/,
    inside: {
      "function": /^[^(]+/
    }
  };
  var inside4 = interpolation9.inside[rest] = func3.inside[rest] = {
    "comment": comment7,
    "url": {
      pattern: /\burl\((["']?).*?\1\)/ig,
      greedy: true
    },
    "string": string13,
    "interpolation": interpolation9,
    "func": func3,
    "important": /\B!(?:important|optional)\b/i,
    "keyword": {
      pattern: /(^|\s)(?:(?:else|for|if|return|unless)(?!\S)|@[\w-]+)/,
      lookbehind: true
    },
    "hexcode": /#[a-f\d]{3,6}/i,
    "color": [
      /\b(?:(?:alice|cadet|cornflower|darksky|dodger|midnight|powder|royal|sky|steel)blue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blueviolet|brown|burlywood|chartreuse|chocolate|coral|cornsilk|crimson|(?:dark)?(?:blue|cyan|goldenrod|gr[ae]y|green|khaki|magenta|olivegreen|orange|orchid|red|salmon|seagreen|slateblue|slategr[ae]y|turquoise|violet)|deeppink|dimgr[ae]y|firebrick|floralwhite|(?:forest|lawn|lime|pale|spring)green|fuchsia|gainsboro|ghostwhite|gold|greenyellow|honeydew|hotpink|indianred|indigo|ivory|lavender|lavenderblush|lemonchiffon|light(?:blue|coral|cyan|goldenrodyellow|gr[ae]y|green|pink|salmon|seagreen|skyblue|slategr[ae]y|steelblue|yellow)|lime|linen|maroon|medium(?:aquamarine|blue|orchid|purple|seagreen|slateblue|springgreen|turquoise|violetred)|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orangered|palegoldenrod|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|purple|rosybrown|saddlebrown|sandybrown|seashell|sienna|silver|snow|tan|teal|thistle|tomato|transparent|wheat|white|whitesmoke|yellow|yellowgreen)\b/i,
      {
        pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: {
          "unit": unit,
          "number": number4,
          "function": /[\w-]+(?=\()/,
          "punctuation": /[(),]/
        }
      }
    ],
    "entity": /\\[a-f\d]{1,8}/i,
    "unit": unit,
    "boolean": boolean,
    // We want non-word chars around "-" because it is
    // accepted in property names.
    "operator": /~|\*\*|[?%!=<>/*+]=?|[-:]=|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/,
    "number": number4,
    "punctuation": clikePunctuation
  };
  languages.stylus = {
    "atrule-declaration": {
      pattern: /(^[ 	]*)@.*[^\s{]/m,
      lookbehind: true,
      inside: {
        "atrule": /^@[\w-]+/,
        [rest]: inside4
      }
    },
    "variable-declaration": {
      pattern: /(^[ 	]*)[$\w-]+\s*.?=[ 	]*(?:\{[^{}]*\}|\S.*|$)/m,
      lookbehind: true,
      inside: {
        "variable": /^\S+/,
        [rest]: inside4
      }
    },
    "statement": {
      pattern: /(^[ 	]*)(?:else|for|if|return|unless)[ 	].+/m,
      lookbehind: true,
      inside: {
        "keyword": /^\S+/,
        [rest]: inside4
      }
    },
    // A property/value pair cannot end with a comma or a brace
    // It cannot have indented content unless it ended with a semicolon
    "property-declaration": {
      pattern: /((?:^|\{)([ 	]*))(?:[\w-]|\{[^\n}]*\})+(?:\s*:\s*|[ 	]+)(?!\s)[^\n{]*(?:;|[^\n{,]$(?!\n(?:\{|\2[ 	])))/m,
      lookbehind: true,
      inside: {
        "property": {
          pattern: /^[^\s:]+/,
          inside: {
            "interpolation": interpolation9
          }
        },
        [rest]: inside4
      }
    },
    // A selector can contain parentheses only as part of a pseudo-element
    // It can span multiple lines.
    // It must end with a comma or an accolade or have indented content.
    "selector": {
      pattern: /(^[ 	]*)(?:(?!\s)(?:[^(){}\n:]|::?[\w-]+(?:\([^\n)]*\)|(?![\w-]))|\{[^\n}]*\})+)(?:\n(?:\1(?:(?!\s)(?:[^(){}\n:]|::?[\w-]+(?:\([^\n)]*\)|(?![\w-]))|\{[^\n}]*\})+)))*(?=,$|\{|\n(?:\{|\1[ 	]))/m,
      lookbehind: true,
      inside: {
        "interpolation": interpolation9,
        "comment": comment7,
        "punctuation": /[()[\]{},]/
      }
    },
    "func": func3,
    "string": string13,
    "comment": comment7,
    "interpolation": interpolation9,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/supercollider.js
  languages.sclang = languages.supercollider = {
    "comment": {
      pattern: /\/\/.*|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\//g,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\])"(?:\\[^]|[^\\"])*"/g,
      lookbehind: true,
      greedy: true
    },
    "char": {
      pattern: /\$(?:\\.|[^\\\n])/g,
      greedy: true
    },
    "symbol": {
      pattern: /(^|[^\\])'(?:\\[^]|[^\\'])*'|\\\w+/g,
      lookbehind: true,
      greedy: true
    },
    "keyword": /\b(?:_|arg|classvar|const|nil|var|while)\b/,
    "boolean": boolean,
    "label": {
      pattern: /\b[a-z_]\w*(?=\s*:)/,
      alias: "property"
    },
    "number": /\b(?:inf|pi|0x[a-fA-F\d]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(?:pi)?|\d+r[a-zA-Z\d]+(?:\.[a-zA-Z\d]+)?|\d+[sb]{1,4}\d*)\b/,
    "class-name": /\b[A-Z]\w*\b/,
    "operator": /\.{2,3}|#(?![[{])|&&|[!=]==?|\+>>|\+{1,3}|--|[-=>]>|\?\?|@\|?@|\|(?:@|[!=]=)?\||!\?|<[!=>]|\*\*?|<<<?\*?|[%&|?!=<>/@`-]/,
    "punctuation": /[()[\]{}.,:;]|#[[{]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/svelte.js
  var currentLang;
  var expression13 = {
    pattern: RegExp(braces, "g"),
    greedy: true
  };
  var tag4 = astroTag(expression13);
  var tagInside2 = tag4.inside;
  var blockInside = {
    "punctuation": /^\W|\}$/,
    "keyword": /^\w+|\bthen\b(?!\s*[^\s[{$\w\xa0-\uffff])/
  };
  var blockLang = {
    pattern: /[^]+/
  };
  tagInside2["attr-value"].inside["expression"] = expression13;
  languages.svelte = {
    "comment": xmlComment,
    "script": addInlined2("script", tagInside2, (code) => {
      return /^[^>]+?[\s"'}]lang\s*=\s*(["'])ts\1/.test(code) ? "ts" : "js";
    }),
    "style": addInlined2("style", tagInside2, (code) => {
      var _a;
      return ((_a = /^[^>]+?[\s"'}]lang\s*=\s*(["'])(less|s[ac]ss|stylus)\1/.exec(code)) == null ? void 0 : _a[2]) || "css";
    }),
    "block": {
      pattern: re("\\{[#@:/]\\w*(?:\\s(?:[^{}]|<0>)*)?\\}", [braces], "g"),
      greedy: true,
      inside: blockInside
    },
    "tag": tag4,
    "expression": expression13,
    "entity": entity,
    "punctuation": /[()[\]{}]/,
    [tokenize](code, grammar) {
      var lang = /<script\s(?:[^>]*?[\s"'}])?lang\s*=\s*(["'])ts\1/.test(code) ? "ts" : "js";
      if (lang != currentLang) {
        expression13.alias = "language-" + lang;
        delete blockInside["language-" + currentLang];
        blockInside["language-" + lang] = blockLang;
        expression13.inside = blockLang.inside = currentLang = lang;
      }
      return withoutTokenizer(code, grammar);
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/swift.js
  var swift = languages.swift = {
    "comment": {
      // Nested comments are supported up to 2 levels
      pattern: /\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\//g,
      greedy: true
    },
    "string-literal": [
      // https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html
      {
        pattern: /(^|[^"#])(?:"(?:\\(?:\((?:[^()]|\([^)]*\))*\)|[^(])|[^\\\n"])*"|"""(?:\\(?:\((?:[^()]|\([^)]*\))*\)|[^(])|[^\\"]|"(?!""))*""")(?!["#])/g,
        lookbehind: true,
        greedy: true,
        inside: {
          "interpolation": {
            pattern: /(\\\()(?:[^()]|\([^()]*\))+(?=\))/,
            lookbehind: true
          },
          "interpolation-punctuation": {
            pattern: /^\)|\\\($/,
            alias: "punctuation"
          },
          "punctuation": /\\(?=\n)/,
          "string": /[^]+/
        }
      },
      {
        pattern: /(^|[^"#])(#+)(?:"(?:\\(?:#+\((?:[^()]|\([^)]*\))*\)|[^#])|[^\\\n])*?"|"""(?:\\(?:#+\((?:[^()]|\([^)]*\))*\)|[^#])|[^\\])*?""")\2/g,
        lookbehind: true,
        greedy: true,
        inside: {
          "interpolation": {
            pattern: /(\\#+\()(?:[^()]|\([^()]*\))+(?=\))/,
            lookbehind: true
          },
          "interpolation-punctuation": {
            pattern: /^\)|\\#+\($/,
            alias: "punctuation"
          },
          "string": /[^]+/
        }
      }
    ],
    "directive": {
      // directives with conditions
      pattern: /#(?:(?:elseif|if)\b(?:[ 	]*(?:![ 	]*)?(?:\b\w+\b(?:[ 	]*\((?:[^()]|\([^)]*\))*\))?|\((?:[^()]|\([^)]*\))*\))(?:[ 	]*(?:&&|\|\|))?)+|(?:else|endif)\b)/,
      alias: "property",
      inside: {
        "directive-name": /^#\w+/,
        "boolean": boolean,
        "number": /\b\d+(?:\.\d+)*\b/,
        "operator": /!|&&|\|\||[<>]=?/,
        "punctuation": /[(),]/
      }
    },
    "literal": {
      pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
      alias: "constant"
    },
    "other-directive": {
      pattern: /#\w+/,
      alias: "property"
    },
    "attribute": {
      pattern: /@\w+/,
      alias: "atrule"
    },
    "function-definition": {
      pattern: /(\bfunc\s+)\w+/,
      lookbehind: true,
      alias: "function"
    },
    "label": {
      // https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID141
      pattern: /\b(break|continue)\s+\w+|\b(?!\d)\w+(?=\s*:\s*(?:for|repeat|while)\b)/,
      lookbehind: true,
      alias: "important"
    },
    "keyword": /\b(?:Any|[Pp]rotocol|[Ss]elf|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|[gs]et|guard|higherThan|i[fns]|import|indirect|infix|init|inout|internal|isolated|lazy|lef?t|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|public|repeat|required|rethrows|return|right|safe|some|static|struct|subscript|super|switch|throws?|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
    "boolean": boolean,
    "nil": {
      pattern: /\bnil\b/,
      alias: "constant"
    },
    "short-argument": /\$\d+\b/,
    "omit": {
      pattern: /\b_\b/,
      alias: "keyword"
    },
    "number": /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f\d_]+(?:\.[a-f\dp_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
    // A class name must start with an upper-case letter and be either 1 letter long or contain a lower-case letter.
    "class-name": /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "constant": /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
    // Operators are generic in Swift. Developers can even create new operators (e.g. +++).
    // https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html#ID481
    // This regex only supports ASCII operators.
    "operator": /[~?%&|^!=<>/*+-]+|\.[.~?%&|^!=<>/*+-]+/,
    "punctuation": /[()[\]{}.,:;\\]/
  };
  swift["string-literal"].forEach((rule) => {
    rule.inside["interpolation"].inside = swift;
  });

  // node_modules/prism-code-editor/dist/prism/languages/systemd.js
  var comment8 = {
    pattern: /^[;#].*/mg,
    greedy: true
  };
  var quotesSource = '"(?:\\\\[\\s\\S]|[^\\\\\n"])*"(?!\\S)';
  languages.systemd = {
    "comment": comment8,
    "section": {
      pattern: /^\[[^\n[\]]*\](?=[ 	]*$)/mg,
      greedy: true,
      inside: {
        "punctuation": /^\[|\]$/,
        "section-name": {
          pattern: /[^]+/,
          alias: "selector"
        }
      }
    },
    "key": {
      pattern: /^[^\s=]+(?=[ 	]*=)/mg,
      greedy: true,
      alias: "attr-name"
    },
    "value": {
      // This pattern is quite complex because of two properties:
      //  1) Quotes (strings) must be preceded by a space. Since we can't use lookbehinds, we have to "resolve"
      //     the lookbehind. You will see this in the main loop where spaces are handled separately.
      //  2) Line continuations.
      //     After line continuations, empty lines and comments are ignored so we have to consume them.
      pattern: RegExp(
        `(=[ 	]*(?!\\s))(?:[^\\\\\\s]|[ 	]+(?:(?![ 	"])|${quotesSource})|\\\\
+(?:[#;].*
+)*(?![#;]))+`,
        "g"
      ),
      lookbehind: true,
      greedy: true,
      alias: "attr-value",
      inside: {
        "comment": comment8,
        "quoted": {
          pattern: RegExp("(^|\\s)" + quotesSource, "g"),
          lookbehind: true,
          greedy: true
        },
        "punctuation": /\\$/m,
        "boolean": {
          pattern: /^(?:false|true|no|off|on|yes)$/g,
          greedy: true
        }
      }
    },
    "punctuation": /=/
  };

  // node_modules/prism-code-editor/dist/t4-templating-Byj5aJQW.js
  var createBlock = (prefix2, insideLang) => ({
    pattern: RegExp(`<#${prefix2}[^]*?#>`),
    alias: "block",
    inside: {
      "delimiter": {
        pattern: RegExp(`^<#${prefix2}|#>$`),
        alias: "important"
      },
      "content": {
        pattern: /[^]+/,
        alias: typeof insideLang == "string" ? "language-" + insideLang : void 0,
        inside: insideLang
      }
    }
  });
  var createT4 = (insideLang) => ({
    "block": {
      pattern: /<#[^]+?#>/,
      inside: {
        "directive": createBlock("@", {
          "attr-value": {
            pattern: /=(?:(["'])(?:\\[^]|(?!\1)[^\\])*\1|[^\s"'=>]+)/,
            inside: {
              "punctuation": /^[="']|["']$/
            }
          },
          "keyword": /\b\w+(?=\s)/,
          "attr-name": /\w+/
        }),
        "expression": createBlock("=", insideLang),
        "class-feature": createBlock("\\+", insideLang),
        "standard": createBlock("", insideLang)
      }
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/t4-cs.js
  languages.t4 = languages["t4-cs"] = createT4("csharp");

  // node_modules/prism-code-editor/dist/prism/languages/vbnet.js
  languages.vbnet = extend("basic", {
    "comment": {
      pattern: /(?:!|'|rem\b).*/i,
      inside: {
        "keyword": /^rem/i
      }
    },
    "string": {
      pattern: /(^|[^"])"(?:""|[^"])*"(?!")/g,
      lookbehind: true,
      greedy: true
    },
    "keyword": /(?:\b(?:addhandler|addressof|alias|and|andalso|as|beep|bload|boolean|bsave|byref|byval|call absolute|call|case|catch|cbool|c?byte|cc?har|c?date|cdbl|cdec|chain|chdir|cu?int|class|clear|close|cls|cobj|com|common|const|continue|c?sbyte|c?u?short|c?sng|cstr|c?type|cu?lng|data|decimal|declare|def(?: fn| seg|dbl|int|lng|sng|str)|default|delegate|dim|directcast|do|double|else|elseif|enum|environ|erase|error|event|exit|false|true|field|files|finally|for each|for|friend|function|[gls]et|gettype|getxmlnamespace|global|gosub|goto|handles|i[fns]|implements|imports|inherits|input|interface|ioctl|isnot|key|kill|lib|like|line input|locate|lock|loop|[lr]set|me|mkdir|mod|module|mustinherit|mustoverride|mybase|myclass|name|namespace|narrowing|new|next|not|nothing|notinheritable|notoverridable|object|off?|on (?:com|error|key|timer)|on|open|operator|option base|option|optional|orelse|out|overloads|overridable|overrides|paramarray|partial|poke|private|property|protected|public|put|raiseevent|read|readonly|redim|removehandler|restore|resume|return|rmdir|run|select case|select|shadows|shared|shell|single|sleep|static|step|stop|string|structure|sub|swap|synclock|system|[tw]hen|throw|timer|to|troff|tron|try|trycast|typeof|u?integer|u?long|unlock|until|using|view print|wait|w?end|while|widening|with|withevents|write|writeonly|x?or)|\B#(?:const|else|elseif|end|if))(?:\$|\b)/i,
    "punctuation": /[(){},:;]/
  });

  // node_modules/prism-code-editor/dist/prism/languages/t4-vb.js
  languages["t4-vb"] = createT4("vbnet");

  // node_modules/prism-code-editor/dist/prism/languages/yaml.js
  var anchorOrAlias = /[*&][^\s[\]{},]+/;
  var tag5 = /!(?:<[\w%#;/?:@&=$,.!~*'()[\]+-]+>|(?:[a-zA-Z\d-]*!)?[\w%#;/?:@&=$.~*'()+-]+)?/;
  var properties = `(?:${tag5.source}(?:[ 	]+${anchorOrAlias.source})?|${anchorOrAlias.source}(?:[ 	]+${tag5.source})?)`;
  var plainKey = replace(
    "(?:[^\\s\0-\\x08\\x0e-\\x1f!\"#%&'*,:>?@[\\]{}`|\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff-]|[?:-]<0>)(?:[ 	]*(?:(?![#:])<0>|:<0>))*",
    ["[^\\s\0-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]"]
  );
  var string14 = `"(?:\\\\.|[^\\\\
"])*"|'(?:\\\\.|[^\\\\
'])*'`;
  var createValuePattern = (value2, flags) => re(
    "([:,[{-]\\s*(?:\\s<0>[ 	]+)?)<1>(?=[ 	]*(?:$|,|\\]|\\}|(?:\n\\s*)?#))",
    [properties, value2],
    flags
  );
  languages.yml = languages.yaml = {
    "scalar": {
      pattern: re("([:-]\\s*(?:\\s<0>[ 	]+)?[|>])[ 	]*(?:(\n[ 	]+)\\S.*(?:\\2.+)*)", [properties]),
      lookbehind: true,
      alias: "string"
    },
    "comment": /#.*/,
    "key": {
      pattern: re(
        "((?:^|[:,[{\n?-])[ 	]*(?:<0>[ 	]+)?)<1>(?=\\s*:\\s)",
        [properties, "(?:" + plainKey + "|" + string14 + ")"],
        "g"
      ),
      lookbehind: true,
      greedy: true,
      alias: "atrule"
    },
    "directive": {
      pattern: /(^[ 	]*)%.+/m,
      lookbehind: true,
      alias: "important"
    },
    "datetime": {
      pattern: createValuePattern("\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ 	]+)\\d\\d?:\\d\\d:\\d\\d(?:\\.\\d*)?(?:[ 	]*(?:Z|[+-]\\d\\d?(?::\\d\\d)?))?|\\d{4}-\\d\\d-\\d\\d|\\d\\d?:\\d\\d(?::\\d\\d(?:\\.\\d*)?)?", "m"),
      lookbehind: true,
      alias: "number"
    },
    "boolean": {
      pattern: createValuePattern("false|true", "im"),
      lookbehind: true,
      alias: "important"
    },
    "null": {
      pattern: createValuePattern("null|~", "im"),
      lookbehind: true,
      alias: "important"
    },
    "string": {
      pattern: createValuePattern(string14, "mg"),
      lookbehind: true,
      greedy: true
    },
    "number": {
      pattern: createValuePattern("[+-]?(?:0x[a-f\\d]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)", "im"),
      lookbehind: true
    },
    "tag": tag5,
    "important": anchorOrAlias,
    "punctuation": /---|[:[\]{},|>?-]|\.{3}/
  };

  // node_modules/prism-code-editor/dist/prism/languages/tap.js
  languages.tap = {
    "fail": /not ok[^#{\n]*/,
    "pass": /ok[^#{\n]*/,
    "pragma": /pragma [+-][a-z]+/,
    "bailout": /bail out!.*/i,
    "version": /tap version \d+/i,
    "plan": /\b\d+\.\.\d+(?: +#.*)?/,
    "subtest": {
      pattern: /# Subtest(?:: .*)?/g,
      greedy: true
    },
    "punctuation": /[{}]/,
    "directive": /#.*/,
    "yamlish": {
      pattern: /(^[ 	]*)---[^]*?\n[ 	]*\.{3}$/m,
      lookbehind: true,
      inside: languages.yaml,
      alias: "language-yaml"
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/tcl.js
  languages.tcl = {
    "comment": /#.*/,
    "string": {
      pattern: /"(?:\\[^]|[^\\\n"])*"/g,
      greedy: true
    },
    "variable": [
      {
        pattern: /(\$)(?:(?:::)?(?:[a-zA-Z\d]+::)*\w+|\{[^}]+\})/,
        lookbehind: true
      },
      {
        pattern: /(^[ 	]*set[ 	]+)(?:::)?(?:[a-zA-Z\d]+::)*\w+/m,
        lookbehind: true
      }
    ],
    "function": {
      pattern: /(^[ 	]*proc[ 	]+)\S+/m,
      lookbehind: true
    },
    "builtin": {
      pattern: /(^[ 	]*)(?:break|class|continue|error|eval|exit|for|foreach|if|proc|return|switch|while)\b|\belse(?:if)?\b/m,
      lookbehind: true
    },
    "scope": {
      pattern: /(^[ 	]*)(?:global|upvar|variable)\b/m,
      lookbehind: true,
      alias: "constant"
    },
    "keyword": {
      pattern: /(^[ 	]*|\[)(?:Safe_Base|Tcl|after|apply|array|auto_(?:execok|import|load|mkindex|qualify|reset)|automkindex_old|bgerror|binary|catch|cd|chan|clock|close|concat|dde|dict|encoding|eof|exec|expr|fblocked|fconfigure|fcopy|file(?:event|name)?|flush|gets|glob|history|http|incr|info|interp|join|l?append|lassign|lindex|linsert|list|llength|load|lrange|lrepeat|lreplace|lreverse|lsearch|l?set|lsort|mathfunc|mathop|memory|msgcat|namespace|open|package|parray|pid|pkg_mkIndex|platform|puts|pwd|re_syntax|read|refchan|regexp|registry|regsub|rename|scan|seek|socket|source|split|string|subst|tcl(?:_endOfWord|_findLibrary|startOf(?:Next|Previous)Word|test|vars|wordBreak(?:After|Before))|tell|time|tm|trace|unknown|unload|unset|update|uplevel|vwait)\b/m,
      lookbehind: true
    },
    "operator": /\*\*?|==|&&?|\|\|?|>>|<<|[!<>]=?|[~/%?^+-]|\b(?:eq|in|ne|ni)\b/,
    "punctuation": /[()[\]{}]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/textile.js
  var replacements = ["(?:\\([^|()\n]+\\)|\\[[^\\]\n]+\\]|\\{[^\n}]+\\})", "(?:\\)|\\((?![^|()\n]+\\)))"];
  var modifierTokens = {
    "css": {
      pattern: /\{[^{}]+\}/,
      inside: "css"
    },
    "class-id": {
      pattern: /(\()[^()]+(?=\))/,
      lookbehind: true,
      alias: "attr-value"
    },
    "lang": {
      pattern: /(\[)[^[\]]+(?=\])/,
      lookbehind: true,
      alias: "attr-value"
    },
    // Anything else is punctuation (the first pattern is for row/col spans inside tables)
    "punctuation": /[\\/]\d+|\S/
  };
  var phraseInlineInside = {
    // Note: superscripts and subscripts are not handled specifically
    // *bold*, **bold**
    "bold": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re("(^(\\*\\*?)<0>*).+?(?=\\2)", replacements),
      lookbehind: true
    },
    // _italic_, __italic__
    "italic": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re("(^(__?)<0>*).+?(?=\\2)", replacements),
      lookbehind: true
    },
    // ??cite??
    "cite": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re("(^\\?\\?<0>*).+?(?=\\?\\?)", replacements),
      lookbehind: true,
      alias: "string"
    },
    // @code@
    "code": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re("(^@<0>*).+?(?=@)", replacements),
      lookbehind: true,
      alias: "keyword"
    },
    // +inserted+
    "inserted": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re("(^\\+<0>*).+?(?=\\+)", replacements),
      lookbehind: true
    },
    // -deleted-
    "deleted": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re("(^-<0>*).+?(?=-)", replacements),
      lookbehind: true
    },
    // %span%
    "span": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re("(^%<0>*).+?(?=%)", replacements),
      lookbehind: true
    },
    "modifier": {
      pattern: re("(^\\*\\*|__|\\?\\?|[*_%@^~+-])<0>+", replacements),
      lookbehind: true,
      inside: modifierTokens
    },
    "punctuation": /[*_%?@^~+-]+/
  };
  var phraseTableInside = {
    "modifier": {
      // Modifiers for rows after the first one are
      // preceded by a pipe and a line feed
      pattern: re("(^|\\|\n?)(?:<0>|<1>|[<>=^~_]|[\\\\/]\\d+)+(?=\\.)", replacements),
      lookbehind: true,
      inside: modifierTokens
    },
    "punctuation": /\||^\./
  };
  var phraseInside = {
    // h1. Header 1
    "block-tag": {
      pattern: re("^[a-z]\\w*(?:<0>|<1>|[<>=])*\\.", replacements),
      inside: {
        "modifier": {
          pattern: re("(^[a-z]\\w*)(?:<0>|<1>|[<>=])+(?=\\.)", replacements),
          lookbehind: true,
          inside: modifierTokens
        },
        "tag": /^[a-z]\w*/,
        "punctuation": /\.$/
      }
    },
    // # List item
    // * List item
    "list": {
      pattern: re("^[*#]+<0>*\\s+\\S.*", replacements, "m"),
      inside: {
        "modifier": {
          pattern: re("(^[*#]+)<0>+", replacements),
          lookbehind: true,
          inside: modifierTokens
        },
        "punctuation": /^[*#]+/
      }
    },
    // | cell | cell | cell |
    "table": {
      // Modifiers can be applied to the row: {color:red}.|1|2|3|
      // or the cell: |{color:red}.1|2|3|
      pattern: re("^(?:(?:<0>|<1>|[<>=^~])+\\.\\s*)?(?:\\|(?:(?:<0>|<1>|[<>=^~_]|[\\\\/]\\d+)+\\.|(?!(?:<0>|<1>|[<>=^~_]|[\\\\/]\\d+)+\\.))[^|]*)+\\|", replacements, "m"),
      inside: phraseTableInside
    },
    "inline": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re("(^|[^a-zA-Z\\d])(\\*\\*|__|\\?\\?|[*_%@^~+-])<0>*.+?\\2(?![a-zA-Z\\d])", replacements),
      lookbehind: true,
      inside: phraseInlineInside
    },
    // [alias]http://example.com
    "link-ref": {
      pattern: /^\[[^\]]+\]\S+$/m,
      inside: {
        "string": {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: true
        },
        "url": {
          pattern: /(^\])\S+$/,
          lookbehind: true
        },
        "punctuation": /[[\]]/
      }
    },
    // "text":http://example.com
    // "text":link-ref
    "link": {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      pattern: re('"<0>*[^"]+":\\S+(?=\\S)[\\w/]?', replacements),
      inside: {
        "text": {
          // eslint-disable-next-line regexp/no-super-linear-backtracking
          pattern: re('(^"<0>*)[^"]+(?=")', replacements),
          lookbehind: true
        },
        "modifier": {
          pattern: re('(^")<0>+', replacements),
          lookbehind: true,
          inside: modifierTokens
        },
        "url": {
          pattern: /(:).+/,
          lookbehind: true
        },
        "punctuation": /[":]/
      }
    },
    // !image.jpg!
    // !image.jpg(Title)!:http://example.com
    "image": {
      pattern: re("!(?:<0>|<1>|[<>=])*(?![<>=])[^!\\s()]+(?:\\([^)]+\\))?!(?::\\S+(?=\\S)[\\w/]?)?", replacements),
      inside: {
        "source": {
          pattern: re("(^!(?:<0>|<1>|[<>=])*)(?![<>=])[^!\\s()]+(?:\\([^)]+\\))?(?=!)", replacements),
          lookbehind: true,
          alias: "url"
        },
        "modifier": {
          pattern: re("(^!)(?:<0>|<1>|[<>=])+", replacements),
          lookbehind: true,
          inside: modifierTokens
        },
        "url": {
          pattern: /(:).+/,
          lookbehind: true
        },
        "punctuation": /[!:]/
      }
    },
    // Footnote[1]
    "footnote": {
      pattern: /\b\[\d+\]/,
      alias: "comment",
      inside: {
        "punctuation": /[[\]]/
      }
    },
    // CSS(Cascading Style Sheet)
    "acronym": {
      pattern: /\b[A-Z\d]+\([^)]+\)/,
      inside: {
        "comment": {
          pattern: /(\()[^()]+(?=\))/,
          lookbehind: true
        },
        "punctuation": /[()]/
      }
    },
    // Prism(C)
    "mark": {
      pattern: /\b\((?:C|R|TM)\)/,
      alias: "comment",
      inside: {
        "punctuation": /[()]/
      }
    }
  };
  var textile = languages.textile = clone2(languages.html);
  var nestedPatterns = {};
  insertBefore(textile, "markup-bracket", {
    "phrase": {
      pattern: /(^|\n)\S[^]*?(?=$|\n\n)/,
      lookbehind: true,
      inside: phraseInside
    }
  });
  ["bold", "italic", "inserted", "deleted", "span"].forEach((p) => phraseInlineInside[p].inside = nestedPatterns);
  ["inline", "link", "image", "footnote", "acronym", "mark"].forEach((p) => nestedPatterns[p] = phraseTableInside[p] = phraseInside[p]);
  textile.tag.pattern = /<\/?(?!\d)[a-z\d]+(?:\s+[^\s/=>]+(?:=(?:"[^"]*"|'[^']'|[^\s"'>=]+))?)*\s*\/?>/gi;

  // node_modules/prism-code-editor/dist/prism/languages/toml.js
  var insertKey = (pattern) => re(pattern, [`(?:[\\w-]+|'[^
']*'|"(?:\\\\.|[^\\\\"
])*")`], "mg");
  languages.toml = {
    "comment": {
      pattern: /#.*/g,
      greedy: true
    },
    "table": {
      pattern: insertKey("(^[ 	]*\\[\\s*(?:\\[\\s*)?)<0>(?:\\s*\\.\\s*<0>)*(?=\\s*\\])"),
      lookbehind: true,
      greedy: true,
      alias: "class-name"
    },
    "key": {
      pattern: insertKey("(^[ 	]*|[{,]\\s*)<0>(?:\\s*\\.\\s*<0>)*(?=\\s*=)"),
      lookbehind: true,
      greedy: true,
      alias: "property"
    },
    "string": {
      pattern: /"""(?:\\[^]|[^\\])*?"""|'''[^]*?'''|'[^\n']*'|"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "date": {
      // Offset Date-Time, Local Date-Time, Local Date, Local Time
      pattern: /\b(?:\d{4}-\d\d-\d\d(?:[t\s]\d\d:\d\d:\d\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?)?|\d\d:\d\d:\d\d(?:\.\d+)?)\b/i,
      alias: "number"
    },
    "number": /(?:\b0(?:x[a-zA-Z\d]+(?:_[a-zA-Z\d]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[+-]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[+-]?\b(?:inf|nan)\b/,
    "boolean": boolean,
    "punctuation": /[[\]{}.,=]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/tremor.js
  var interpolationPattern2 = '#\\{(?:[^"{}]|\\{[^{}]*\\}|"(?:\\\\[\\s\\S]|[^\\\\\n"])*")*\\}';
  languages.trickle = languages.troy = languages.tremor = {
    "comment": /\/\*[^]*?\*\/|(?:--|\/\/|#).*/,
    "interpolated-string": {
      pattern: RegExp(
        `(^|[^\\\\])(?:"""(?:\\\\[^]|[^\\\\"#]|"(?!"")|#(?!\\{)|${interpolationPattern2})*"""|"(?:\\\\[^]|[^\\\\
"#]|#(?!\\{)|${interpolationPattern2})*")`,
        "g"
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: RegExp(interpolationPattern2),
          inside: {
            "punctuation": /^#\{|\}$/,
            "expression": {
              pattern: /[^]+/,
              inside: "tremor"
            }
          }
        },
        "string": /[^]+/
      }
    },
    "extractor": {
      pattern: /\b[a-z_]\w*\|(?:\\[^]|[^\\\n|])*\|/gi,
      greedy: true,
      inside: {
        "regex": {
          pattern: /(^re)\|[^]+/,
          lookbehind: true
        },
        "function": /^\w+/,
        "value": /\|[^]+/
      }
    },
    "identifier": {
      pattern: /`[^`]*`/g,
      greedy: true
    },
    "function": /\b[a-z_]\w*(?=\s*(?:::\s*<|\())\b/,
    "keyword": /\b(?:args|as|by|case|config|connect|connector|const|copy|create|default|define|deploy|drop|each|emit|end|erase|event|flow|fn|for|from|group|having|insert|into|intrinsic|[ls]et|links|[mp]atch|merge|mod|move|of|operator|pipeline|recur|script|select|sliding|state|stream|to|tumbling|update|use|when|where|window|with)\b/,
    "boolean": /\b(?:false|true|null)\b/i,
    "number": /\b(?:0b[01_]*|0x[a-fA-F\d_]*|\d[\d_]*(?:\.\d[\d_]*)?(?:[Ee][+-]?[\d_]+)?)\b/,
    "pattern-punctuation": {
      pattern: /%(?=[({[])/,
      alias: "punctuation"
    },
    "operator": /=>|&&|\|\||<<=?|>>>?=?|[~%&|^!=<>/*+-]=?|(?:absent|and|not|x?or|present)\b/,
    "punctuation": /::|[()[\]{}.,:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/tsx.js
  var tsx = addJsxTag(languages.ts, "tsx");
  var tag6 = tsx["tag"];
  var bracket = "(?:^|(";
  try {
    RegExp("(?<=)");
    bracket += "?<=";
  } catch (e) {
    tag6.lookbehind = true;
  }
  tag6.pattern = RegExp(bracket + `[^\\w$])|(?=</))${tag6.pattern.source.replace(space, space + `|(?:${space})*<(?:[^<>=]|=[^<]|=?<(?:[^<>]|<[^<>]*>)*>)*>`)}`, "g");
  insertBefore(tag6.inside, "attr-value", {
    "generic": {
      pattern: re("(^<0>*)<(?:[^<>=]|=[^<]|=?<(?:[^<>]|<[^<>]*>)*>)*>", [space]),
      lookbehind: true,
      alias: "class-name",
      inside: tsx["class-name"].inside
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/tt2.js
  languages.tt2 = {
    "tt2": {
      pattern: /\[%[^]+?%\]/,
      alias: "language-tt2",
      inside: {
        "comment": /#.*|\[%#[^]*?%\]/,
        "string": [
          {
            pattern: /'[^\\']*(?:\\[^][^\\']*)*'/g,
            greedy: true
          },
          {
            pattern: /"[^\\"]*(?:\\[^][^\\"]*)*"/g,
            greedy: true,
            inside: {
              "variable": /\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i
            }
          }
        ],
        "class-name": clikeClass(),
        "delimiter": {
          pattern: /^[[%]%-?|-?%\]$/,
          alias: "punctuation"
        },
        "keyword": /\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|[GS]ET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|STOP|SWITCH|TAGS|THROW|TRY|UNLESS|USE|WHILE|WRAPPER)\b/,
        "boolean": boolean,
        "function": /\b\w+(?=\()/,
        "operator": /=>|[!=<>]=?|&&|\|\|?|\b(?:and|not|or)\b/,
        "variable": /\b[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*\b/i,
        "number": clikeNumber,
        "punctuation": /[()[\]{},]/
      }
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/twig.js
  languages.twig = {
    "twig": {
      pattern: /\{(?:#[^]*?#|%[^]*?%|\{[^]*?\})\}/,
      alias: "language-twig",
      inside: {
        "comment": /^\{#[^]+/,
        "tag-name": {
          pattern: /(^\{%-?\s*)\w+/,
          lookbehind: true,
          alias: "keyword"
        },
        "delimiter": {
          pattern: /^\{[{%]-?|-?[%}]\}$/,
          alias: "punctuation"
        },
        "string": {
          pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/,
          inside: {
            "punctuation": /^["']|["']$/
          }
        },
        "keyword": /\b(?:even|if|odd)\b/,
        "boolean": /\b(?:false|true|null)\b/,
        "number": /\b0x[a-fA-F\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
        "operator": [
          {
            pattern: /(\s)(?:and|b-and|b-x?or|ends with|in|is|matches|not|or|same as|starts with)(?!\S)/,
            lookbehind: true
          },
          /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[~%|+-]/
        ],
        "punctuation": /[()[\]{}.,:]/
      }
    },
    [tokenize]: embeddedIn("html")
  };

  // node_modules/prism-code-editor/dist/prism/languages/typoscript.js
  var keywords9 = /\b(?:ACT|ACTIFSUB|CARRAY|CASE|CLEARGIF|COA|COA_INT|CONSTANTS|CONTENT|CUR|EDITPANEL|EFFECT|EXT|FILE|FLUIDTEMPLATE|FORM|FRAME|FRAMESET|GIFBUILDER|[GHT]MENU|GMENU_FOLDOUT|[GT]MENU_LAYERS|GP|HRULER|HTML|IENV|IFSUB|IMAGE|IMGMENU|IMGMENUITEM|IMGTEXT|IMG_RESOURCE|INCLUDE_TYPOSCRIPT|JSMENU|JSMENUITEM|LLL|LOAD_REGISTER|NO|PAGE|RECORDS|RESTORE_REGISTER|TEMPLATE|TEXT|TMENUITEM|USER|USER_INT|_GIFBUILDER|global|globalString|globalVar)\b/;
  languages.tsconfig = languages.typoscript = {
    "comment": [
      // multiline comments /* */
      /\/\*[^]*?(?:\*\/|$)/,
      {
        // double-slash comments - ignored when backslashes or colon is found in front
        // also ignored whenever directly after an equal-sign, because it would probably be an url without protocol
        pattern: /(^|[^\\:= 	]|(?:^|[^= 	])[ 	]+)\/\/.*/g,
        lookbehind: true,
        greedy: true
      },
      {
        // hash comments - ignored when leading quote is found for hex colors in strings
        pattern: /(^|[^"'])#.*/g,
        lookbehind: true,
        greedy: true
      }
    ],
    "function": [
      {
        // old include style
        pattern: /<INCLUDE_TYPOSCRIPT:\s*source\s*=\s*(?:"[^\n"]*"|'[^\n']*')\s*>/,
        inside: {
          "string": {
            pattern: /"[^\n"]*"|'[^\n']*'/,
            inside: {
              "keyword": keywords9
            }
          },
          "keyword": /INCLUDE_TYPOSCRIPT/
        }
      },
      {
        // new include style
        pattern: /@import\s*(?:"[^\n"]*"|'[^\n']*')/,
        inside: {
          "string": /"[^\n"]*"|'[^\n']*'/
        }
      }
    ],
    "string": {
      pattern: /^((?:[^=]|=\n)*=[< ]?).*[^\n\]]/,
      lookbehind: true,
      inside: {
        "function": /\{\$.*\}/,
        // constants include
        "keyword": keywords9,
        "number": /^\d+$/,
        "punctuation": /[,:|]/
      }
    },
    "keyword": keywords9,
    "number": {
      // special highlighting for indexes of arrays in tags
      pattern: /\b\d+\s*[.{=]/,
      inside: {
        "operator": /[.{=]/
      }
    },
    "tag": {
      pattern: /\.?[-\w\\]+\.?/,
      inside: {
        "punctuation": /\./
      }
    },
    "punctuation": /[()[\]{}.,:;|]/,
    "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/unrealscript.js
  languages.uc = languages.uscript = languages.unrealscript = {
    "comment": clikeComment(),
    "string": clikeString(),
    "category": {
      pattern: /(\b(?:(?:autoexpand|hide|show)categories|var)\s*\()[^()]+(?=\))/g,
      lookbehind: true,
      greedy: true,
      alias: "property"
    },
    "metadata": {
      pattern: /(\w\s*)<\s*\w+\s*=[^<>|=\n]+(?:\|\s*\w+\s*=[^<>|=\n]+)*>/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "property": /\b\w+(?=\s*=)/,
        "operator": /=/,
        "punctuation": /[<>|]/
      }
    },
    "macro": {
      pattern: /`\w+/,
      alias: "property"
    },
    "class-name": {
      pattern: /(\b(?:class|enum|extends|interface|state(?:\(\))?|struct|within)\s+)\w+/,
      lookbehind: true
    },
    "keyword": /\b(?:abstract|actor|array|auto|autoexpandcategories|bool|break|byte|case|class|classgroup|client|coerce|collapsecategories|config|const|continue|default|defaultproperties|delegate|dependson|deprecated|do|dontcollapsecategories|editconst|editinlinenew|else|enum|event|exec|export|extends|final|float|for|forcescriptorder|foreach|function|goto|guid|hidecategories|hidedropdown|if|ignores|implements|inherits|input|int|interface|iterator|latent|local|material|name|native|nativereplication|noexport|nontransient|noteditinlinenew|notplaceable|operator|optional|out|pawn|perobjectconfig|perobjectlocalized|placeable|postoperator|preoperator|private|protected|reliable|replication|return|server|showcategories|simulated|singular|state|static|string|struct|structdefault|structdefaultproperties|switch|texture|transient|travel|unreliable|until|var|vector|while|within)\b/,
    "function": /\b[a-z_]\w*(?=\s*\()/i,
    "boolean": boolean,
    "number": clikeNumber,
    // https://docs.unrealengine.com/udk/Three/UnrealScriptExpressions.html
    "operator": />>|<<|--|\+\+|\*\*|[~$@!=<>/*+-]=?|&&?|\|\|?|\^\^?|[?:%]|\b(?:ClockwiseFrom|Cross|Dot)\b/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/uorazor.js
  languages.uorazor = {
    "comment-hash": {
      pattern: /#.*/g,
      alias: "comment",
      greedy: true
    },
    "comment-slash": {
      pattern: /\/\/.*/g,
      alias: "comment",
      greedy: true
    },
    "string": {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
      inside: {
        "punctuation": /^["']|["']$/
      },
      greedy: true
    },
    "source-layers": {
      pattern: /\b(?:arms|backpack|blue|bracelet|cancel|clear|cloak|criminal|earrings|enemy|facialhair|friend|friendly|gloves|gray|grey|ground|hair|head|innerlegs|innertorso|innocent|lefthand|middletorso|murderer|neck|nonfriendly|onehandedsecondary|outerlegs|outertorso|pants|red|righthand|ring|self|shirt|shoes|talisman|waist)\b/i,
      alias: "function"
    },
    "source-commands": {
      pattern: /\b(?:alliance|attack|cast|clearall|clearignore|clearjournal|clearlist|clearsysmsg|createlist|createtimer|dclick|dclicktype|dclickvar|dress|dressconfig|drop|droprelloc|emote|getlabel|guild|gumpclose|gumpresponse|hotkey|ignore|lasttarget|lift|lifttype|menu|menuresponse|msg|org|organizer?|overhead|pause|poplist|potion|promptresponse|pushlist|removelist|removetimer|rename|restock|say|scav|scavenger|script|setability|setlasttarget|setskill|settimer|setvar|sysmsg|target|targetloc|targetrelloc|targettype|undress|unignore|unsetvar|useobject|useonce|useskill|usetype|virtue|wait|waitforgump|waitformenu|waitforprompt|waitforstat|waitforsysmsg|waitfortarget|walk|wfsysmsg|wft|whisper|yell)\b/,
      alias: "function"
    },
    "tag-name": {
      pattern: /(^\{%-?\s*)\w+/,
      lookbehind: true,
      alias: "keyword"
    },
    "delimiter": {
      pattern: /^\{[{%]-?|-?[%}]\}$/,
      alias: "punctuation"
    },
    "function": /\b(?:atlist|close|closest|count|counter|counttype|dead|dex|diffhits|diffmana|diffstam|diffweight|find(?:buff|debuff|layer|typelist|type)?|followers|gumpexists|hidden|hits|hp|hue|human|humanoid|ingump|inlist|insysmessage|insysmsg|int|invul|[lr]handempty|list|listexists|mana|maxhits|maxhp|maxmana|maxstam|maxweight|monster|mounted|name|next|noto|paralyzed|poisoned|position|prev|previous|queued|rand|random|skill|stam|str|targetexists|timer|timerexists|varexist|warmode|weight)\b/,
    "keyword": /\b(?:and|as|break|continue|else|elseif|endfor|endif|endwhile|f?or|if|loop|not|replay|stop|while)\b/,
    "boolean": /\b(?:false|true|null)\b/,
    "number": /\b0x[a-fA-F\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    "operator": [
      {
        pattern: /(\s)(?:and|b-and|b-x?or|ends with|in|is|matches|not|or|same as|starts with)(?!\S)/,
        lookbehind: true
      },
      /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[~%|+-]/
    ],
    "punctuation": /[()[\]{}.,:]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/uri.js
  languages.url = languages.uri = {
    "scheme": {
      pattern: /^[a-z][a-z\d+.-]*:/img,
      greedy: true,
      inside: {
        "scheme-delimiter": /:$/
      }
    },
    "fragment": {
      pattern: /#[\w.~!$&'()*,;=%:@/?+-]*/,
      inside: {
        "fragment-delimiter": /^#/
      }
    },
    "query": {
      pattern: /\?[\w.~!$&'()*,;=%:@/?+-]*/,
      inside: {
        "query-delimiter": {
          pattern: /^\?/g,
          greedy: true
        },
        "pair-delimiter": /[&;]/,
        "pair": {
          pattern: /^[^=][^]*/,
          inside: {
            "key": /^[^=]+/,
            "value": {
              pattern: /(^=)[^]+/,
              lookbehind: true
            }
          }
        }
      }
    },
    "authority": {
      pattern: /^\/\/(?:[\w.~!$&'()*,;=%:+-]*@)?(?:\[(?:[a-fA-F\d:.]{2,48}|v[a-fA-F\d]+\.[\w.~!$&'()*,;=+-]+)\]|[\w.~!$&'()*,;=%+-]*)(?::\d*)?/m,
      inside: {
        "authority-delimiter": /^\/\//,
        "user-info-segment": {
          pattern: /^[\w.~!$&'()*,;=%:+-]*@/,
          inside: {
            "user-info-delimiter": /@$/,
            "user-info": /^[\w.~!$&'()*,;=%:+-]+/
          }
        },
        "port-segment": {
          pattern: /:\d*$/,
          inside: {
            "port-delimiter": /^:/,
            "port": /^\d+/
          }
        },
        "host": {
          pattern: /[^]+/,
          inside: {
            "ip-literal": {
              pattern: /^\[[^]+\]$/,
              inside: {
                "ip-literal-delimiter": /^\[|\]$/,
                "ipv-future": /^v[^]+/,
                "ipv6-address": /^[^]+/
              }
            },
            "ipv4-address": /^(?:(?:[03-9]\d?|[12]\d{0,2})\.){3}(?:[03-9]\d?|[12]\d{0,2})$/
          }
        }
      }
    },
    "path": {
      pattern: /^[\w.~!$&'()*,;=%:@/+-]+/m,
      inside: {
        "path-separator": /\//
      }
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/v.js
  var interpolationExpr2 = {
    pattern: /[^]+/
  };
  var generic2 = {
    "punctuation": /<|>/,
    "class-name": /\w+/
  };
  interpolationExpr2.inside = languages.v = {
    "comment": clikeComment(),
    "char": {
      pattern: /`(?:\\`|\\?[^`]{1,2})`/,
      // using {1,2} instead of `u` flag for compatibility
      alias: "rune"
    },
    "string": {
      pattern: /r?(["'])(?:\\[^]|(?!\1)[^\\\n])*\1/g,
      alias: "quoted-string",
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$(?:\{[^{}]*\}|\w+(?:\.\w+(?:\([^\(\)]*\))?|\[[^[\]]+\])*)/,
          lookbehind: true,
          inside: {
            "interpolation-variable": {
              pattern: /^\$\w[^]*$/,
              alias: "variable"
            },
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            "interpolation-expression": interpolationExpr2
          }
        }
      }
    },
    "class-name": {
      pattern: /(\b(?:enum|interface|struct|type)\s+)(?:C\.)?\w+/,
      lookbehind: true
    },
    "keyword": /(?:\b(?:__global|asm?|assert|atomic|break|chan|const|continue|defer|else|embed|enum|fn|f?or|goto|go|i[fns]|import|interface|match|module|mut|none|pub|return|r?lock|select|shared|sizeof|static|struct|typeof|type|union|unsafe)|\$(?:else|for|if)|#(?:flag|include))\b/,
    "boolean": boolean,
    "generic-function": {
      // e.g. foo<T>( ...
      pattern: /\b\w+\s*<\w+>(?=\()/,
      inside: {
        "function": /^\w+/,
        "generic": {
          pattern: /<\w+>/,
          inside: generic2
        }
      }
    },
    "function": /\b\w+(?=\()/,
    "number": /\b(?:0x[a-f\d]+(?:_[a-f\d]+)*|0b[01]+(?:_[01]+)*|0o[0-7]+(?:_[0-7]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?)\b/i,
    "attribute": {
      pattern: /(^[ 	]*)\[(?:deprecated|direct_array_access|flag|inline|live|ref_only|typedef|unsafe_fn|windows_stdcall)\]/m,
      lookbehind: true,
      alias: "annotation",
      inside: {
        "punctuation": /[[\]]/,
        "keyword": /\w+/
      }
    },
    "generic": {
      pattern: /<\w+>(?=\s*[\)\{])/,
      inside: generic2
    },
    "operator": /--|\+\+|\|\||&&|&\^=?|<-|<<=?|>>=?|[%&|^!=<>/*+-]=?|:=|\.{2,3}|[~?]/,
    "punctuation": clikePunctuation,
    "builtin": /\b(?:any(?:_float|_int)?|bool|byte(?:ptr)?|charptr|f(?:32|64)|[iu](?:16|64|128)|i8|int|rune|size_t|string|voidptr)\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/vala.js
  languages.vala = {
    "comment": clikeComment(),
    "raw-string": {
      pattern: /"""[^]*?"""/g,
      greedy: true,
      alias: "string"
    },
    "template-string": {
      pattern: /@"[^"]*"/g,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /\$(?:\([^)]*\)|[a-zA-Z]\w*)/,
          inside: {
            "delimiter": {
              pattern: /^\$\(?|\)$/,
              alias: "punctuation"
            },
            [rest]: "vala"
          }
        },
        "string": /[^]+/
      }
    },
    "string": clikeString(),
    // Classes copied from prism-csharp
    "class-name": [
      {
        // (Foo bar, Bar baz)
        pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=(?:\?\s+|\*?\s+\*?)\w)/,
        inside: {
          punctuation: /\./
        }
      },
      {
        // [Foo]
        pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      },
      {
        // class Foo : Bar
        pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      },
      {
        // class Foo
        pattern: /((?:\b(?:class|enum|interface|new|struct)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      }
    ],
    "regex": {
      pattern: /\/(?:\[(?:\\.|[^\\\n\]])*\]|\\.|[^/\\[\n])+\/[imsx]{0,4}(?=\s*(?:$|[\n,.;})\]]))/g,
      greedy: true,
      inside: {
        "regex-flags": /\w+$/,
        "regex-delimiter": /^\/|\/$/,
        "regex-source": {
          pattern: /[^]+/,
          alias: "language-regex",
          inside: "regex"
        }
      }
    },
    "keyword": /\b(?:abstract|as|assert|async|[bc]ase|bool|break|catch|class|const|construct|continue|default|delegate|delete|do|double|dynamic|else|ensures|enum|errordomain|extern|finally|float|for|foreach|[gs]et|i[fns]|inline|interface|internal|lock|namespace|new|null|out|override|owned|params|private|protected|public|ref|requires|return|signal|sizeof|ss?ize_t|static|string|struct|switch|this|throws?|try|typeof|u?char|u?int(?:8|16|32|64)?|u?long|unichar|unowned|u?short|using|value|var|virtual|void|volatile|weak|while|yield)\b/i,
    "boolean": boolean,
    "function": /\b\w+(?=\s*\()/,
    "number": /(?:\b0x[a-f\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)(?:f|u?l?)?/i,
    "operator": /--|\+\+|&&|\|\||=>|->|~|>>=?|<<=?|[%&|^!=<>/*+-]=?|\?\??|\.{3}/,
    "punctuation": clikePunctuation,
    "constant": /\b[A-Z\d_]+\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/velocity.js
  var vel = languages.velocity = clone2(languages.html);
  var string15 = {
    pattern: /"[^"]*"|'[^']*'/g,
    greedy: true
  };
  var punctuation3 = /[()[\]{}.,:]/;
  var number5 = /\b\d+\b/;
  var variable9 = {
    pattern: /(^|[^\\](?:\\\\)*)\$!?(?:[a-z][\w-]*(?:\([^)]*\))?(?:\.[a-z][\w-]*(?:\([^)]*\))?|\[[^\]]+\])*|\{[^}]+\})/i,
    lookbehind: true,
    inside: {
      "string": string15,
      "function": {
        pattern: /([^\w-])[a-z][\w-]*(?=\()/,
        lookbehind: true
      },
      "number": number5,
      "boolean": boolean,
      "punctuation": punctuation3
    }
  };
  insertBefore(vel, "comment", {
    "unparsed": {
      pattern: /(^|[^\\])#\[\[[^]*?\]\]#/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "punctuation": /^#\[\[|\]\]#$/
      }
    },
    "velocity-comment": [
      {
        pattern: /(^|[^\\])#\*[^]*?\*#/g,
        lookbehind: true,
        greedy: true,
        alias: "comment"
      },
      {
        pattern: /(^|[^\\])##.*/g,
        lookbehind: true,
        greedy: true,
        alias: "comment"
      }
    ],
    "directive": {
      pattern: /(^|[^\\](?:\\\\)*)#@?(?:[a-z][\w-]*|\{[a-z][\w-]*\})(?:\s*\((?:[^()]|\([^)]*\))*\))?/i,
      lookbehind: true,
      inside: {
        "keyword": {
          pattern: /^#@?(?:[a-z][\w-]*|\{[a-z][\w-]*\})|\bin\b/,
          inside: {
            "punctuation": /[{}]/
          }
        },
        "variable": variable9,
        "string": string15,
        "number": number5,
        "boolean": boolean,
        "operator": /[!=<>]=?|[%/*+-]|&&|\|\||\.\.|\b(?:eq|[gl][et]|ne|not)\b/,
        "punctuation": punctuation3
      }
    },
    "variable": variable9
  });
  vel["tag"].inside["attr-value"][2].inside[rest] = vel;

  // node_modules/prism-code-editor/dist/prism/languages/verilog.js
  languages.verilog = {
    "comment": clikeComment(),
    "string": {
      pattern: /"(?:\\[^]|[^\\\n"])*"/g,
      greedy: true
    },
    "kernel-function": {
      // support for any kernel function (ex: $display())
      pattern: /\B\$\w+/,
      alias: "property"
    },
    // support for user defined constants (ex: `define)
    "constant": /\B`\w+/,
    "function": /\b\w+(?=\()/,
    // support for verilog and system verilog keywords
    "keyword": /\b(?:alias|assert|assign|assume|automatic|before|begin|bin[ds]|binsof|bit|break|buf|bufif[01]|byte|case[xz]?|cell|chandle|class|clocking|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end(?:case|class|clocking|config|function|generate|group|interface|module|package|primitive|program|property|sequence|specify|table|task)?|enum|event|expect|export|extends|extern|final|first_match|[fnw]or|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz[01]|iff?|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|in[op]ut|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|[nrw]?and|negedge|new|noshowcancelled|not|notif[01]|null|output|package|packed|parameter|posedge|primitive|priority|program|property|protected|pull[01]|pulldown|pullup|pulsestyle_ondetect|pulsestyle_onevent|pure|randc|randcase|randsequence|r?[cnp]mos|real|realtime|re[fg]|release|repeat|return|r?tran|r?tranif[01]|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong[01]|struct|super|supply[01]|table|tagged|task|this|throughout|time|timeprecision|timeunit|tri[01]?|triand|trior|trireg|type|typedef|union|unique|unsigned|use|u?wire|var|vectored|virtual|void|wait|wait_order|weak[01]|while|wildcard|with|within|x?n?or)\b/,
    // bold highlighting for all verilog and system verilog logic blocks
    "important": /\b(?:always|always_comb|always_ff|always_latch)\b(?: *@)?/,
    // support for time ticks, vectors, and real numbers
    "number": /\B##?\d+|(?:\b\d+)?'[odbh] ?[a-f\dzx_?]+|\b(?:\d*[._])?\d+(?:e[+-]?\d+)?/i,
    "operator": /[{}~?%&|^!=<>/*+-]+/,
    "punctuation": /[()[\].,:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/vhdl.js
  languages.vhdl = {
    "comment": /--.+/,
    // support for all logic vectors
    "vhdl-vectors": {
      "pattern": /\b[oxb]"[a-f\d_]+"|"[01uxzwlh-]+"/i,
      "alias": "number"
    },
    // support for operator overloading included
    "quoted-function": {
      pattern: /"\S+?"(?=\()/,
      alias: "function"
    },
    "string": /"(?:\\[^]|[^\\\n"])*"/,
    "attribute": {
      pattern: /\b'\w+/,
      alias: "attr-name"
    },
    // support for predefined attributes included
    "keyword": /\b(?:access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|impure|inertial|inout|i[fns]|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|private|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|[tw]hen|to|transport|type|unaffected|units|until|use|variable|view|wait|while|with)\b/i,
    "boolean": /\b(?:false|true)\b/i,
    "function": /\w+(?=\()/,
    // decimal, based, physical, and exponential numbers supported
    "number": /'[01uxzwlh-]'|\b(?:\d+#[a-f\d_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
    "operator": /[<>]=?|:=|[&=/*+-]|\b(?:abs|n?and|mod|x?n?or|not|rem|ro[lr]|s[lr][al])\b/i,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/vim.js
  languages.vim = {
    "string": /"(?:\\.|[^\\\n"])*"|'(?:[^\n']|'')*'/,
    "comment": /".*/,
    "function": /\b\w+(?=\()/,
    "keyword": /\b(?:N|(?:[bclstw]|pt|sb|tab)?[Nn]ext|P|[Pp]rint|X|XMLent|XMLns|ab[co]?|abbreviate|aboveleft|ar|arg[adeglsu]|argadd|argdelete|argdo|argedit|argglobal|arglocal|argument|as|ascii|bN?|badd?|ba|ball|bd|b?delete|b?el?|belowright|bf|[cl]first|bl|bm|bmodified|bn|botright|bp|[clw]previous|br|brea|break[adl]?|breakadd|breakdel|breaklist|[cl]rewind|br?o|browse|bufdo|buffers?|bun|bunload|bw|bwipeout|c[Nabcdefglnopqruw]?|cNfcNfile|cabbrev|cabc|c?abclear|ca[dt]|cadd[bf]|caddbuffer|[cl](?:add|get)?expr|caddfile|c?all?|catch|cbuffer|ccl|[clp]?close|center|cex|cfile|cfir|cget[be]|cgetbuffer|cgetfile|changes?|ch[de]|chdir|checkpath|checkt|checktime|cl[ao]|cl[ai]st|cmapc|[cilnosvx]mapclear|cnew|cnewer|cnf|cnfile|[ci]?norea|[ci]?noreabbrev|colo?|colder|colorscheme|com[cp]|comclear|compiler|conf?|confirm|continue|copen?|copy|cpf|cpfile|cquit|cuna|[ci]unabbrev|[cilnosvx]?unmap|[cl]window|debugg|debuggreedy|del[cfm]|delcommand|delfunction|delmarks|diff(?:[gu]|get|off|patch|put?|split|this|update)|dig?|digraphs|display|dj?|[dit]jump|dl|[dil]?list|dr|drop|dsearch|dsp?|[div]?split|earlier|echo[emn]|echoerr|echomsg|edit|else|elseif?|em|emenu|en|endfor?|endfun|endfunction|endi?f|end[tw]|endtry|endwhile|[elv]new?|exit?|exu?|exusage|files?|filetype|fin[adi]?|finally|finish|fi[rx]|fixdel|f|fold[cdo]?|foldclose|folddoc|folddoclosed|folddoopen|foldopen|for?|fun?|function|go|goto|gr|ha?|hardcopy|help[fgt]?|helpfind|helptags|hide?|his|history|ia|iabbrev|iabc|iabclear|i[fjlnu]|imapc|isearch|isp|iuna|ju?|join|jumps|k|kee|keepalt|keepj|keepjumps|keepmarks|lNf?|lNfile|lad?|ladd[bf]|laddbuffer|laddfile|lan|language|later|lb?|lbuffer|lc[dhl]?|lchdir|lefta?|leftabove|le[tx]|lf|lfile|lfir|lget[be]|lgetbuffer|lgetfile|lgr?|l?grepa?|l?grepadd|lh|l?helpgrep|ll[ai]?|llast|lm|l?make?|[lsx]mapc?|lnewer|lnf?|lnfile|lnoremap|lo[clp]?|loadview|lockmarks|lockv|lockvar|lolder|lopen|lpf?|lpfile|lr|ls|lt|[lp]tag|lu|lv|l?vimgrepa?|l?vimgrepadd|lw|m|marks?|mat?|match|menut|menutranslate|mkexrc|mksession|mksp?|mkspell|mkv?|mkview?|mkvimrc|mode?|move|mzf?|mzfile|mzscheme|n|nbkey|new|[no]mapc|noh|nohlsearch|nun?|number|on?|only|open|opt|options|ou|pc?|ped?|pedit|perl|perldo?|po|popup?|pp|pp?op|preserve|prev?|profd?|profdel|profile|prompt[fr]|promptfind|promptrepl|ps|psearch|pt[Nafjlnprs]|p?tfirst|[ps]tjump|p?tlast|p?tprevious|p?trewind|[ps]?tselect|put?|pwd?|pyf?|pyfile|python|quita?|quitall|read|re[cdgstw]|recover|redir?|red[or]|redraws?|redrawstatus|registers|resize|retab|retu|return|ri?|rightb?|rightbelow|ru|ruby?|rubydo?|rubyf|rubyfile|runtime|rv|rviminfo|sN|sall?|san?|sandbox|sargument|sav|saveas|sb[Naflmnpr]?|sball|s?b?first|s?b?last|sbmodified|s?b?previous|s?b?rewind|sbuffer|scrip|scripte|scriptencoding|scriptnames|set?|set[fgl]|setfiletype|setglobal|setlocal|sf|sfind|sfir|sh|shell|sign|si[lm]|silent|simalt|sla?|sleep|smagic|sme?|smenu|sni?|sniff|snomagic|snor?|snoremap|snoreme|snoremenu|so|sort?|source|spe?|spell[diruw]|spelldump|spellgood|spellinfo|spellrepall|spellundo|spellwrong|spr|sre|sta?|sta[gr]|start[gr]|startgreplace|startinsert|startreplace|st[js]|stopi?|stopinsert|sunhide|sunm?|sus|suspend|sv|sview|syncbind|tN?|tab?|tab(?:[Ncdeflmnoprs]|close|do|edit|find|fir|first|last|move|new|only|previous|rewind)|tags?|tcldo?|tclf?|tclfile|t[cefhjlmnopsu]|tearoff|throw|tmenu|topleft|try?|tunmenu|un[ahm]|unabbreviate|undoj?|undojoin|undol|undolist|unhide|unlet|unlo|unlockvar|up?|update|ve|ver[bt]|verbose|version|vertical|view?|vi[mu]?|visual|viusage|vmapc|vs|vu|wN?|wa|[wx]all|wh|while|win[cp]?|wincmd|windo|winpos|winsize|wn|wp|w?qa?|w?qall|write|ws|wsverb|wv|wviminfo|xa?|xit|xme?|xmenu|xn|xnoremap|xnoreme|xnoremenu|xu|y|yank)\b/,
    "builtin": /\b(?:acd|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ar?i|arshape|autochdir|autocmd|autoindent|autoread|autowrite|autowriteall|awa?|back(?:ground|space|up|upcopy|updir|upext|upskip)|balloondelay|ballooneval|balloonexpr|[bv]dir|bdlay|beval|bex|[bp]expr|bg|bh|bin|binary|biosk|bioskey|bkc?|bomb|breakat|brk|browsedir|bsk?|bsdir|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|cin?|cindent|cin[kow]|cinkeys|cinoptions|cinwords|clipboard|cmdheight|cmdwinheight|cm[ps]|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|c[op]t|cpo|cpoptions|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|csto?|csverb|cu[cl]|cursorcolumn|cursorline|cwh|debug|deco|de[fx]|define|delcombine|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|di[pr]|directory|dy|e[abdfikpt]|ead|eadirection|edcompatible|efm|enc|encoding|endofline|eol|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|eventignore|expandtab|exrc|fc[ls]|fd[ceilmnot]|fdls|fe[nx]|fencs?|ffs?|fileencodings?|fileformats?|fillchars|fk|fkmap|flp|fm[lr]|fold(?:column|enable|expr|ignore|level|levelstart|marker|method|minlines|nestmax|text)|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gf[mnsw]|ghr|gp|grepformat|grepprg|gt[lt]|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hkmapp?|hkp?|hlg?|hls|hlsearch|ic|icon|iconstring|ignorecase|imactivatekey|imak|im[cdis]?|imcmdline|imdisable|iminsert|imsearch|in[cf]|include|includeexpr|incsearch|ind[ek]|indentexpr|indentkeys|inex|infercase|insertmode|inv(?:acd|ai|akm|allowrevins|altkeymap|anti|antialias|ari?|arab|arabic|arabicshape|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|awa?|backup|ballooneval|beval|bin|binary|biosk|bioskey|bk|bl|bomb|buflisted|cf|cin?|cindent|compatible|confirm|consk|conskey|copyindent|cp|cscopetag|cscopeverbose|cst|csverb|cu[cl]|cursorcolumn|cursorline|deco|delcombine|dg|diff|digraph|disable|e[abdktx]|edcompatible|endofline|eol|equalalways|errorbells|esckeys|expandtab|exrc|fen|fk|fkmap|foldenable|gd|gdefault|guipty|hid|hidden|hkmapp?|hkp?|hls|hlsearch|ic|icon|ignorecase|im[cd]?|imcmdline|incsearch|inf|infercase|insertmode|is|joinspaces|js|lazyredraw|lbr|linebreak|lis[pt]|loadplugins|lpl|lz|ma|macatsui|magic|mh|ml|mod|modeline|modifiable|modified|more|mousef|mousefocus|mousehide|nu|number|odev|opendevice|paste|pi|preserveindent|previewwindow|prompt|pvw|readonly|remap|restorescreen|revins|ri|rightleft|rightleftcmd|rlc?|ro|rs|ru|ruler|sb|sc[bs]?|scrollbind|secure|sft|shellslash|shelltemp|shiftround|shortname|showcmd|showfulltag|showmatch|showmode|si|smartcase|smartindent|smarttab|smd?|sn|sol|spell|splitbelow|splitright|sp?r|ssl|s?ta|startofline|stmp|swapfile|swf|tagbsearch|tagrelative|tagstack|tb[is]|tbidi|termbidi|terse|textauto|textmode|tf|tgst|tildeop|title|top?|tr|tt?imeout|ttybuiltin|ttyfast|tx|vb|visualbell|wa|warn|wb|weirdinvert|wf[hw]|wildmenu|winfixheight|winfixwidth|wiv|wmnu|wrap|wrapscan|write|writeany|writebackup|ws)|isf|isfname|is[ik]|isident|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|kmp?|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|mls?|mm[dpt]?|modelines?|modifiable|modified|more|mouse[fmst]?|mousefocus|mousehide|mousemodel|mouseshape|mousetime|mps?|msm|mzq|mzquantum|nf|no(?:acd|ai|akm|allowrevins|altkeymap|anti|antialias|arab|arabic|arabicshape|ari?|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|awa?|backup|ballooneval|beval|bin|binary|biosk|bioskey|bk|bl|bomb|buflisted|cf|cin?|cindent|compatible|confirm|consk|conskey|copyindent|cp|cscopetag|cscopeverbose|cst|csverb|cu[cl]|cursorcolumn|cursorline|deco|delcombine|dg|diff|digraph|disable|e[abdktx]|edcompatible|endofline|eol|equalalways|errorbells|esckeys|expandtab|exrc|fen|fk|fkmap|foldenable|gd|gdefault|guipty|hid|hidden|hkmapp?|hkp?|hls|ic|icon|ignorecase|im[cd]?|imcmdline|incsearch|inf|infercase|insertmode|is|joinspaces|js|lazyredraw|lbr|linebreak|lis[pt]|loadplugins|lpl|lz|ma|macatsui|magic|mh|ml|mod|modeline|modifiable|modified|more|mousef|mousefocus|mousehide|nu|number|odev|opendevice|paste|pi|preserveindent|previewwindow|prompt|pvw|readonly|remap|restorescreen|revins|ri|rightleft|rightleftcmd|rlc?|ro|rs|ru|ruler|sb|sc[bs]?|scrollbind|secure|sft|shellslash|shelltemp|shiftround|shortname|showcmd|showfulltag|showmatch|showmode|si|smartcase|smartindent|smarttab|smd?|sn|sol|spell|splitbelow|splitright|sp?r|ssl|s?ta|startofline|stmp|swapfile|swf|tagbsearch|tagrelative|tagstack|tb[is]|tbidi|termbidi|terse|textauto|textmode|tf|tgst|tildeop|title|top?|tr|tt?imeout|ttybuiltin|ttyfast|tx|vb|visualbell|wa|warn|wb|weirdinvert|wf[hw]|wildmenu|winfixheight|winfixwidth|wiv|wmnu|wrap|wrapscan|write|writeany|writebackup|ws)|nrformats|numberwidth|nuw|[op]dev|of[tu]|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|penc|pex|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|print(?:device|encoding|expr|font|header|mbcharset|mbfont|options)|prompt|pt|pumheight|pv[hw]|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rlc?|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc[br]?|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shell(?:cmdflag|pipe|redir|slash|temp|type|x?quote)|shiftround|shiftwidth|sh[mq]|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|sm[cd]|softtabstop|sol|spc|spell(?:capcheck|file|lang|suggest)?|sp[fls]|splitbelow|splitright|srr?|ssl?|ssop|sta?l|startofline|statusline|stmp|sua?|suffixes|suffixesadd|swapfile|swapsync|sw[bfs]?|switchbuf|sxq|syn|synmaxcol|syntax|t_(?:AB|AF|AL|CS|CV|Ce|Co|Cs|DL|EI|[FKk]\d|IE|IS|K[A-L]|RI|RV|SI|Sb|Sf|WP|WS|ZH|ZR|al|bc|cd|ce|cl|cm|cs|da|db|dl|fs|k[BDINPbdehlrsu]|le|mb|md|me|mr|ms|nd|op|se|so|sr|te|ti|ts|ue|us|ut|vb|ve|vi|vs|xs)|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tbi?s?|tbidi|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|[tvw]op|tpm|ts[lr]|tt?imeout|tt?imeoutlen|ttm|ttybuiltin|ttyfast|ttym?|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vbs?|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|wak|warn|wb|wcm?|wd|weirdinvert|wf[hw]|whichwrap|wig?|wildcharm?|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wi[vw]|wm[hw]?|wmnu|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww)\b/,
    "number": /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?)\b/i,
    "operator": /&&|\|\||[.+-]=?|[!=][=~][#?]?|[<>]=?[#?]?|[%?!=/*]|\bis(?:not)?\b/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/visual-basic.js
  languages.vba = languages.vb = languages["visual-basic"] = {
    "comment": {
      pattern: /(?:['‘’]|rem\b)(?:[^\n_]|_\n?)*/i,
      inside: {
        "keyword": /^rem/i
      }
    },
    "directive": {
      pattern: /#(?:const|else|elseif|end|externalchecksum|externalsource|if|region)(?:\b_[ 	]*\n|.)+/gi,
      alias: "property",
      greedy: true
    },
    "string": {
      pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]c?/gi,
      greedy: true
    },
    "date": {
      pattern: /#[ 	]*(?:\d+([/-])\d+\1\d+(?:[ 	]+(?:\d+[ 	]*(?:am|pm)|\d+:\d+(?::\d+)?(?:[ 	]*(?:am|pm))?))?|\d+[ 	]*(?:am|pm)|\d+:\d+(?::\d+)?(?:[ 	]*(?:am|pm))?)[ 	]*#/i,
      alias: "number"
    },
    "number": /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?|&[ho][a-f\d]+)(?:[frd]|u?[ils])?/i,
    "boolean": /\b(?:false|true|nothing)\b/i,
    "keyword": /\b(?:addhandler|addressof|alias|andalso|and|as|boolean|byref|byval|call|case|catch|cbool|cc?har|c?date|cdbl|cdec|cobj|c?s?byte|csng|cstr|c?type|cu?int|cu?lng|c?u?short|class|const|continue|currency|decimal|declare|default|delegate|dim|directcast|do|double|each|else|elseif|endif|enum|erase|error|event|exit|finally|[fx]or|friend|function|get(?:type|xmlnamespace)?|global|gosub|goto|handles|i[fns]|implements|imports|inherits|interface|isnot|[ls]et|lib|like|loop|me|mod|module|must(?:inherit|override)|mybase|myclass|namespace|narrowing|new|next|notinheritable|notoverridable|not|object|o[fnr]|operator|optional|option|orelse|out|overloads|overridable|overrides|paramarray|partial|private|property|protected|public|raiseevent|readonly|redim|removehandler|resume|return|select|shadows|shared|single|static|step|stop|string|structure|sub|synclock|[tw]hen|throw|to|try|trycast|typeof|u?integer|u?long|until|using|variant|w?end|while|widening|withevents|with|writeonly)\b/i,
    "operator": /[\\#@$%&^!=<>/*+-]|\b_(?=[ 	]*\n)/,
    "punctuation": /[(){}.,:?]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/vue.js
  var vueTag = clone2(tag);
  var tagInside3 = vueTag.inside;
  var currentLang2;
  var expression14 = {
    pattern: /(\{\{)[^]+?(?=\}\})/g,
    lookbehind: true,
    greedy: true
  };
  var attrLang = {
    pattern: /[^]+/
  };
  var attrInside = {
    "punctuation": /^["']|["']$/
  };
  tagInside3["attr-value"].unshift(
    {
      pattern: /([\s"'](?::|@|v-)[^\s/=>]+\s*=\s*)(?:"[^"]*"|'[^']*'|[^\s>]+)/g,
      lookbehind: true,
      greedy: true,
      alias: "script",
      inside: attrInside
    },
    {
      pattern: /([\s"']style\s*=\s*)(?:"[^"]*"|'[^']*'|[^\s>]+)/g,
      lookbehind: true,
      greedy: true,
      alias: "style",
      inside: {
        "punctuation": /^["']|["']$/,
        "language-css": {
          pattern: /[^]+/,
          inside: "css"
        }
      }
    }
  );
  tagInside3["attr-name"].inside = {
    "punctuation": /[[\].:@#]/
  };
  tagInside3["tag"].inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
  languages.vue = {
    "comment": xmlComment,
    "script": addInlined2("script", tagInside3, (code) => {
      var _a;
      return ((_a = /^[^>]+?[\s"']lang\s*=\s*(["'])([jt]sx?)\1/.exec(code)) == null ? void 0 : _a[2]) || "js";
    }),
    "style": addInlined2("style", tagInside3, (code) => {
      var _a;
      return ((_a = /^[^>]+?[\s"']lang\s*=\s*(["'])(less|s[ac]ss|stylus)\1/.exec(code)) == null ? void 0 : _a[2]) || "css";
    }),
    "expression": expression14,
    "tag": vueTag,
    "entity": entity,
    "punctuation": /\{\{|\}\}|[()[\]{}]/,
    [tokenize](code, grammar) {
      var _a;
      var lang = ((_a = /<script\s(?:[^>]*?[\s"'])?lang\s*=\s*(["'])([jt]s)x?\1/.exec(code)) == null ? void 0 : _a[2]) || "js";
      if (lang != currentLang2) {
        expression14.alias = "language-" + lang;
        delete attrInside["language-" + currentLang2];
        attrInside["language-" + lang] = attrLang;
        expression14.inside = attrLang.inside = currentLang2 = lang;
      }
      return withoutTokenizer(code, grammar);
    }
  };

  // node_modules/prism-code-editor/dist/prism/languages/warpscript.js
  languages.warpscript = {
    "comment": /#.*|\/\/.*|\/\*[^]*?\*\//,
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'|<'(?:[^\\']|'(?!>)|\\.)*'>/g,
      greedy: true
    },
    "variable": /\$\S+/,
    "macro": {
      pattern: /@\S+/,
      alias: "property"
    },
    // WarpScript doesn't have any keywords, these are all functions under the control category
    // https://www.warp10.io/tags/control
    "keyword": /\b(?:BREAK|CHECKMACRO|CONTINUE|C?UDF|DEFINED|DEFINEDMACRO|EVAL|FAIL|FOR|FOREACH|FORSTEP|IFTE?|MSGFAIL|N?RETURN|RETHROW|SWITCH|TRY|UNTIL|WHILE)\b/,
    "number": /[+-]?\b(?:NaN|Infinity|\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?|0x[a-fA-F\d]+|0b[01]+)\b/,
    "boolean": /\b(?:F|T|false|true)\b/,
    "punctuation": /<%|%>|[()[\]{}]/,
    // Some operators from the "operators" category
    // https://www.warp10.io/tags/operators
    "operator": /==|&&?|\|\|?|\*\*?|>>>?|<<|[<>!~]=?|[%^/-]|\+!?|\b(?:AND|NOT|OR)\b/
  };

  // node_modules/prism-code-editor/dist/prism/languages/wasm.js
  languages.wasm = {
    "comment": /\(;[^]*?;\)|;;.*/,
    "string": {
      pattern: /"(?:\\[^]|[^\\"])*"/g,
      greedy: true
    },
    "keyword": [
      {
        pattern: /\b(?:align|offset)=/,
        inside: {
          "operator": /=/
        }
      },
      {
        pattern: /\b(?:(?:[fi]32|[fi]64)(?:\.(?:abs|a[dn]d|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|neg?|nearest|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|sqrt|store(?:8|16|32)?|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|x?or))?|memory\.(?:grow|size))\b/,
        inside: {
          "punctuation": /\./
        }
      },
      /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/
    ],
    "variable": /\$[\w!#$%&'*./:<=>?@\\^`|~+-]+/,
    "number": /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[a-fA-F\d](?:_?[a-fA-F\d])*(?:\.[a-fA-F\d](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[a-fA-F\d](?:_?[\da-fA-D])*)?\b/,
    "punctuation": /[()]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/web-idl.js
  var id = "(?:\\B-|\\b_|\\b)[a-zA-Z][\\w-]*(?![\\w-])";
  var type4 = `(?:\\b(?:unsigned\\s+)?long\\s+long(?![\\w-])|\\b(?:unrestricted|unsigned)\\s+[a-z]+(?![\\w-])|(?!(?:unrestricted|unsigned)\\b)${id}(?:\\s*<(?:[^<>]|<[^<>]*>)*>)?)(?:\\s*\\?)?`;
  var typeInside4 = {};
  var webIdl = languages["webidl"] = languages["web-idl"] = {
    "comment": clikeComment(),
    "string": {
      pattern: /"[^"]*"/g,
      greedy: true
    },
    "namespace": {
      pattern: RegExp("(\\bnamespace\\s+)" + id),
      lookbehind: true
    },
    "class-name": [
      {
        pattern: /(^|[^\w-])(?:iterable|maplike|setlike)\s*<(?:[^<>]|<[^<>]*>)*>/,
        lookbehind: true,
        inside: typeInside4
      },
      {
        pattern: RegExp("(\\b(?:attribute|const|deleter|[gs]etter|optional)\\s+)" + type4),
        lookbehind: true,
        inside: typeInside4
      },
      {
        // callback return type
        pattern: RegExp(`(\\bcallback\\s+${id}\\s*=\\s*)${type4}`),
        lookbehind: true,
        inside: typeInside4
      },
      {
        // typedef
        pattern: RegExp("(\\btypedef\\b\\s*)" + type4),
        lookbehind: true,
        inside: typeInside4
      },
      {
        pattern: RegExp("(\\b(?:callback|dictionary|enum|interface(?:\\s+mixin)?)\\s+)(?!(?:interface|mixin)\\b)" + id),
        lookbehind: true
      },
      {
        // inheritance
        pattern: RegExp("(:\\s*)" + id),
        lookbehind: true
      },
      // includes and implements
      RegExp(id + "(?=\\s+(?:implements|includes)\\b)"),
      {
        pattern: RegExp("(\\b(?:implements|includes)\\s+)" + id),
        lookbehind: true
      },
      {
        // function return type, parameter types, and dictionary members
        pattern: RegExp(`${type4}(?=\\s*(?:\\.{3}\\s*)?${id}\\s*[(),;=])`),
        inside: typeInside4
      }
    ],
    "builtin": /\b(?:ArrayBuffer|BigInt64Array|BigUint64Array|ByteString|DOMString|DataView|Float32Array|Float64Array|FrozenArray|Int16Array|Int32Array|Int8Array|ObservableArray|Promise|USVString|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray)\b/,
    "keyword": [
      /\b(?:async|attribute|callback|const|constructor|deleter|dictionary|enum|[gs]etter|implements|includes|inherit|interface|mixin|namespace|null|optional|or|partial|readonly|required|static|stringifier|typedef|unrestricted)\b/,
      // type keywords
      /\b(?:any|bigint|boolean|byte|double|float|iterable|long|maplike|object|octet|record|sequence|setlike|short|symbol|undefined|unsigned|void)\b/
    ],
    "boolean": boolean,
    "number": {
      pattern: /(^|[^\w-])-?(?:0x[a-f\d]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|NaN|Infinity)(?![\w-])/i,
      lookbehind: true
    },
    "operator": /\.{3}|[?:=<>-]/,
    "punctuation": /[()[\]{}.,;]/
  };
  Object.assign(typeInside4, webIdl);
  delete typeInside4["class-name"];

  // node_modules/prism-code-editor/dist/prism/languages/wgsl.js
  languages.wgsl = {
    "comment": clikeComment(),
    "builtin-attribute": {
      pattern: /(@)builtin\(.*?\)/,
      lookbehind: true,
      inside: {
        "attribute": {
          pattern: /^builtin/,
          alias: "attr-name"
        },
        "punctuation": /[(),]/,
        "built-in-values": {
          pattern: /\b(?:frag_depth|front_facing|global_invocation_id|instance_index|local_invocation_id|local_invocation_index|num_workgroups|position|sample_index|sample_mask|vertex_index|workgroup_id)\b/,
          alias: "attr-value"
        }
      }
    },
    "attributes": {
      pattern: /(@)(?:align|binding|compute|const|fragment|group|id|interpolate|invariant|location|size|vertex|workgroup_size)/i,
      lookbehind: true,
      alias: "attr-name"
    },
    "functions": {
      pattern: /\b(fn\s+)(?!\d)\w+(?=[(<])/,
      lookbehind: true,
      alias: "function"
    },
    "keyword": /\b(?:bitcast|break|case|const|continue|continuing|default|discard|else|enable|fallthrough|fn|for|function|if|let|loop|private|return|storage|struct|switch|type|uniform|var|while|workgroup)\b/,
    "builtin": /\b(?:abs|a?cosh?|all|any|array|a?sinh?|atan2|a?tanh?|atomic(?:Add|And|CompareExchangeWeak|Exchange|Load|Max|Min|Or|Store|Sub|Xor)?|bool|ceil|clamp|countLeadingZeros|countOneBits|countTrailingZeros|cross|degrees|determinant|distance|dot|dpd[xy]|dpd[xy]Coarse|dpd[xy]Fine|exp2?|extractBits|[fiu]32|[fiu]64|faceForward|firstLeadingBit|floor|fma|fract|frexp|fwidth|fwidthCoarse|fwidthFine|insertBits|inverseSqrt|ldexp|length|log2?|mat[234]x[234]|max|mi[nx]|modf|normalize|override|(?:un)?pack2x16float|(?:un)?pack(?:2x16|4x8)[su]norm|pow|ptr|quantizeToF16|radians|reflect|refract|reverseBits|round|sampler|sampler_comparison|select|shiftLeft|shiftRight|sign|smoothstep|sqrt|staticAssert|step|storageBarrier|texture(?:Dimensions|Gather|GatherCompare|Load|NumLayers|NumLevels|NumSamples|Sample|SampleBias|SampleCompare|SampleCompareLevel|SampleGrad|SampleLevel|Store|_[123]d|_2d_array|_cube|_cube_array|_depth_2d|_depth_2d_array|_depth_cube|_depth_cube_array|_depth_multisampled_2d|_multisampled_2d|_storage_[123]d|_storage_2d_array)|transpose|trunc|vec[234]|workgroupBarrier)\b/,
    "function-calls": {
      pattern: /\b[_a-z]\w*(?=\()/i,
      alias: "function"
    },
    "class-name": /\b(?:[A-Z][A-Za-z\d]*)\b/,
    "bool-literal": {
      pattern: boolean,
      alias: "boolean"
    },
    "hex-int-literal": {
      pattern: /\b0[xX][a-fA-F\d]+[iu]?\b(?![.pP])/,
      alias: "number"
    },
    "hex-float-literal": {
      pattern: /\b0[xX][a-fA-F\d]*(?:\.[a-fA-F\d]*)?(?:[pP][+-]?\d+[fh]?)?/,
      alias: "number"
    },
    "decimal-float-literal": {
      pattern: /(?:(?:\d*\.\d+|\d+\.\d*)(?:[eE][+-]?\d+)?|\d+[eE][+-]?\d+)[fh]?|\b\d+[fh]\b/,
      alias: "number"
    },
    "int-literal": {
      pattern: /\b\d+[iu]?\b/,
      alias: "number"
    },
    "operator": /-[->]|\+\+|&&|\|\||>>=?|<<=?|[%&|^!=/*+-]=?|[<>]=|~/,
    "punctuation": /[()[\]{}.,:;<>@]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/wiki.js
  var tagInside4 = languages.html.tag.inside;
  insertBefore(
    languages.wiki = extend("html", {
      "block-comment": {
        pattern: /(^|[^\\])\/\*[^]*?\*\//,
        lookbehind: true,
        alias: "comment"
      },
      "heading": {
        pattern: /^(=+)[^\n=].*?\1/m,
        inside: {
          "punctuation": /^=+|=+$/,
          "important": /.+/
        }
      },
      "emphasis": {
        // TODO Multi-line
        pattern: /('{2,5}).+?\1/,
        inside: {
          "bold-italic": {
            pattern: /(''''').+?(?=\1)/,
            lookbehind: true,
            alias: "bold italic"
          },
          "bold": {
            pattern: /(''')[^'].*(?=\1)/,
            lookbehind: true
          },
          "italic": /[^'].*(?='')/,
          "punctuation": /.+/
        }
      },
      "hr": {
        pattern: /^-{4,}/m,
        alias: "punctuation"
      },
      "url": [
        /isbn +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:pmid|rfc) +\d+/i,
        /\[\[.+?\]\]|\[.+?\]/
      ],
      "variable": [
        /__[A-Z]+__/,
        // FIXME Nested structures should be handled
        // {{formatnum:{{#expr:{{{3}}}}}}}
        /\{{3}.+?\}{3}/,
        /\{\{.+?\}\}/
      ],
      "symbol": [
        /^#redirect/im,
        /~{3,5}/
      ],
      // Handle table attrs:
      // {|
      // ! style="text-align:left;"| Item
      // |}
      "table-tag": {
        pattern: /((?:^|[|!])[|!])[^\n|]+\|(?!\|)/m,
        lookbehind: true,
        inside: {
          "table-bar": {
            pattern: /\|$/,
            alias: "punctuation"
          },
          [rest]: tagInside4
        }
      },
      "punctuation": /^(?:\{\||\|\}|\|-|[*#:;!|])|\|\||!!/m
    }),
    "tag",
    {
      // Prevent highlighting inside <nowiki>, <source> and <pre> tags
      "nowiki": {
        pattern: /<(nowiki|pre|source)\b[^>]*>[^]*?<\/\1>/i,
        inside: {
          "tag": {
            pattern: /<(?:nowiki|pre|source)\b[^>]*>|<\/(?:nowiki|pre|source)>/i,
            inside: tagInside4
          }
        }
      }
    }
  );
  delete languages.wiki["markup-bracket"];

  // node_modules/prism-code-editor/dist/prism/languages/wolfram.js
  languages.nb = languages.wl = languages.mathematica = languages.wolfram = {
    "comment": (
      // Allow one level of nesting - note: regex taken from applescipt
      /\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[^])*?\*\)/
    ),
    "string": {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    "keyword": /\b(?:Abs|AbsArg|Accuracy|Block|Do|For|Function|If|Manipulate|Module|Nest|NestList|None|Return|Switch|Table|Which|While)\b/,
    "context": {
      pattern: /\b\w+`+\w*/,
      alias: "class-name"
    },
    "blank": {
      pattern: /\b\w+_\b/,
      alias: "regex"
    },
    "global-variable": {
      pattern: /\$\w+/,
      alias: "variable"
    },
    "boolean": /\b(?:False|True)\b/,
    "number": /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[a-f\d])[a-f\d]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    "operator": /[/=]\.|:>|\|?->|<-|@@?@?|\/@|=?[!=]?=|\^?:?=|\*\*?=?|\/\/?=?|[/+-]=?|<[<|=>]?|>[|=>]?|[;&|^~]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/wren.js
  languages.wren = {
    // Multiline comments in Wren can have nested multiline comments
    // Comments: // and /* */
    "comment": {
      // support 3 levels of nesting
      // regex: \/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\/
      pattern: /\/\/.*|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*))*\*\/)*\*\/)*\*\//g,
      greedy: true
    },
    // Triple quoted strings are multiline but cannot have interpolation (raw strings)
    // Based on prism-python.js
    "triple-quoted-string": {
      pattern: /"""[^]*?"""/g,
      greedy: true,
      alias: "string"
    },
    "string-literal": {
      // A single quote string is multiline and can have interpolation (similar to JS backticks ``)
      pattern: /(^|[^\\"])"(?:\\[^]|[^\\"%]|%(?!\()|%\((?:[^()]|\((?:[^()]|\([^)]*\))*\))*\))*"/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "interpolation": {
          // "%(interpolation)"
          pattern: /((?:^|[^\\])(?:\\\\)*)%\((?:[^()]|\((?:[^()]|\([^)]*\))*\))*\)/,
          lookbehind: true,
          inside: {
            "expression": {
              pattern: /^(..)[^]+(?=.)/,
              lookbehind: true,
              inside: "wren"
            },
            "interpolation-punctuation": {
              pattern: /.+/,
              alias: "punctuation"
            }
          }
        },
        "string": /[^]+/
      }
    },
    // #!/usr/bin/env wren on the first line
    "hashbang": {
      pattern: /^#!\/.+/g,
      greedy: true,
      alias: "comment"
    },
    // Attributes are special keywords to add meta data to classes
    "attribute": {
      // #! attributes are stored in class properties
      // #!myvar = true
      // #attributes are not stored and dismissed at compilation
      pattern: /#!?[ 	　]*\w+/,
      alias: "keyword"
    },
    "class-name": [
      {
        // class definition
        // class Meta {}
        pattern: /(\bclass\s+)\w+/,
        lookbehind: true
      },
      // A class must always start with an uppercase.
      // File.read
      /\b[A-Z][a-z\d_]*\b/
    ],
    // A constant can be a variable, class, property or method. Just named in all uppercase letters
    "constant": /\b[A-Z][A-Z\d_]*\b/,
    "null": {
      pattern: /\bnull\b/,
      alias: "keyword"
    },
    "keyword": /\b(?:as|break|class|construct|continue|else|for|foreign|i[fns]|import|return|static|super|this|var|while)\b/,
    "boolean": boolean,
    "number": /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
    // Functions can be Class.method()
    "function": /\b[a-z_]\w*(?=\s*[({])/i,
    "operator": /<<|>>|[!=<>]=?|&&|\|\||[%&|^~?:/*+-]|\.{2,3}/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/prism/languages/xeora.js
  var xeora = languages.xeoracube = languages.xeora = clone2(languages.html);
  var variable10 = {
    pattern: /(?:[,|])@?(?:#+|[~=^*+-])?[\w.]+/,
    inside: {
      "punctuation": /[,.|]/,
      "operator": /#+|[~=^@*+-]/
    }
  };
  var blockPunctuation = [
    {
      pattern: /\$(?:\w:|C#\d|C)?/,
      inside: {
        "tag": /#\d/
      }
    },
    /[[\]{:]/
  ];
  insertBefore(xeora, "markup-bracket", {
    "constant": {
      pattern: /\$(?:DomainContents|PageRenderDuration)\$/,
      inside: {
        "punctuation": /\$/
      }
    },
    "variable": {
      pattern: /\$@?(?:[~=^*+-]|#*)[\w.]+\$/,
      inside: {
        "punctuation": /[$.]/,
        "operator": /[~=^@*+-]|#+/
      }
    },
    "function-inline": {
      pattern: /\$F:[\w.-]+\?[\w.-]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\$/,
      alias: "function",
      inside: {
        "variable": variable10,
        "punctuation": /\$\w:|[$?.,:|]/
      }
    },
    "function-block": {
      pattern: /\$XF:\{[\w.-]+\?[\w.-]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\}:XF\$/,
      alias: "function",
      inside: {
        "variable": variable10,
        "punctuation": /[$?{}.,:|]/
      }
    },
    "directive-inline": {
      pattern: /\$\w(?:#\d+\+?)?(?:\[[\w.-]+\])?:[\w./-]+\$/,
      alias: "function",
      inside: {
        "punctuation": blockPunctuation
      }
    },
    "directive-block-open": {
      pattern: /\$\w+:\{|\$\w(?:#\d+\+?)?(?:\[[\w.-]+\])?:[\w.-]+:\{(?:![A-Z]+)?/,
      alias: "function",
      inside: {
        "punctuation": blockPunctuation,
        "attribute": {
          pattern: /!.+/,
          alias: "keyword",
          inside: {
            "punctuation": /!/
          }
        }
      }
    },
    "directive-block-separator": {
      pattern: /\}:[\w.-]+:\{/,
      alias: "function",
      inside: {
        "punctuation": /[{}:]/
      }
    },
    "directive-block-close": {
      pattern: /\}:[\w.-]+\$/,
      alias: "function",
      inside: {
        "punctuation": /[$}:]/
      }
    }
  });

  // node_modules/prism-code-editor/dist/prism/languages/xml-doc.js
  var insertDocComment = (lang, docComment) => {
    if (languages[lang]) {
      insertBefore(languages[lang], "comment", {
        "doc-comment": docComment
      });
    }
  };
  var tag7 = languages.markup.tag;
  var slashDocComment = {
    pattern: /\/\/\/.*/g,
    greedy: true,
    alias: "comment",
    inside: {
      "tag": tag7
    }
  };
  var tickDocComment = {
    pattern: /'''.*/g,
    greedy: true,
    alias: "comment",
    inside: {
      "tag": tag7
    }
  };
  insertDocComment("csharp", slashDocComment);
  insertDocComment("fsharp", slashDocComment);
  insertDocComment("vbnet", tickDocComment);

  // node_modules/prism-code-editor/dist/prism/languages/xojo.js
  languages.xojo = {
    "comment": /(?:'|\/\/|rem\b).+/i,
    "string": {
      pattern: /"(?:""|[^"])*"/g,
      greedy: true
    },
    "number": [
      /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      /&[bchou][a-z\d]+/i
    ],
    "directive": {
      pattern: /#(?:else|elseif|endif|if|pragma)\b/i,
      alias: "property"
    },
    "keyword": /\b(?:addhandler|app|array|assigns|as|auto|boolean|break|byref|byval|byte|call|case|catch|cfstringref|cgfloat|class|color|const|continue|cstring|currency|currentmethodname|declare|delegate|dim|do(?:uble|wnto)?|each|else(?:if)?|enumeration|event|exception|exit|extends|false|true|finally|for|function|get|gettypeinfo|global|goto|if|implements|in|inherits|int(?:8|16|32|64|eger|erface)?|lib|loop|me|module|[nt]ext|nil|object|optional|ostype|paramarray|private|property|protected|p?string|ptr|raiseevent|raise|redim|removehandler|return|selector|select|self|set|shared|short|single|soft|static|step|sub|super|then|to|try|ubound|uint(?:8|16|32|64|eger)?|until|using|variant|var|w?end|while|windowptr|wstring)\b/i,
    "operator": /<[=>]|>=|[\\^=<>/*+-]|\b(?:addressof|and|ctype|isa?|mod|new|not|weakaddressof|x?or)\b/i,
    "punctuation": /[().,:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/xquery.js
  var xquery = languages.xquery = extend("xml", {
    "xquery-comment": {
      pattern: /\(:[^]*?:\)/g,
      greedy: true,
      alias: "comment"
    },
    "string": {
      pattern: /"(?:""|[^"])*"|'(?:''|[^'])*'/g,
      greedy: true
    },
    "extension": {
      pattern: /\(#.+?#\)/,
      alias: "symbol"
    },
    "variable": /\$[-\w:]+/,
    "axis": {
      pattern: /(^|[^-])(?:ancestor(?:-or-self)?|attribute|child|descendant(?:-or-self)?|following(?:-sibling)?|parent|preceding(?:-sibling)?|self)(?=::)/,
      lookbehind: true,
      alias: "operator"
    },
    "keyword-operator": {
      pattern: /(^|[^:-])\b(?:and|castable as|eq|except|[gl][et]|i?div|instance of|intersect|is|mod|ne|or|union)\b(?=$|[^:-])/,
      lookbehind: true,
      alias: "operator"
    },
    "keyword": {
      pattern: /(^|[^:-])\b(?:as|ascending|at|base-uri|boundary-space|case|cast as|collation|construction|copy-namespaces|declare|default|descending|else|empty (?:greatest|least)|encoding|every|external|for|function|if|import|in|inherit|lax|let|map|module|namespace|no-inherit|no-preserve|option|order(?: by|ed|ing)?|preserve|return|satisfies|schema|some|stable|strict|strip|then|to|treat as|typeswitch|unordered|validate|variable|version|where|xquery)\b(?=$|[^:-])/,
      lookbehind: true
    },
    "function": /[\w-]+(?::[\w-]+)*(?=\s*\()/,
    "xquery-element": {
      pattern: /(element\s+)[\w-]+(?::[\w-]+)*/,
      lookbehind: true,
      alias: "tag"
    },
    "xquery-attribute": {
      pattern: /(attribute\s+)[\w-]+(?::[\w-]+)*/,
      lookbehind: true,
      alias: "attr-name"
    },
    "builtin": {
      pattern: /(^|[^:-])\b(?:attribute|comment|document|element|processing-instruction|text|xs:(?:ENTITIES|ENTITY|ID|IDREFS?|NCName|NMTOKENS?|NOTATION|Q?Name|anyAtomicType|anyType|anyURI|base64Binary|boolean|byte|date|dateTime|dayTimeDuration|decimal|double|duration|float|gDay|gMonth|gMonthDay|gYear|gYearMonth|hexBinary|int|integer|language|long|negativeInteger|nonNegativeInteger|nonPositiveInteger|normalizedString|positiveInteger|short|string|time|token|unsigned(?:Byte|Int|Long|Short)|untyped(?:Atomic)?|yearMonthDuration))\b(?=$|[^:-])/,
      lookbehind: true
    },
    "number": /\b\d+(?:\.\d+)?(?:E[+-]?\d+)?/,
    "operator": {
      pattern: /[=?|@*+]|\.\.?|:=|!=|<[=<]?|>[=>]?|(\s)-(?!\S)/,
      lookbehind: true
    },
    "punctuation": /[()[\]{},:;/]/,
    [tokenize]: (code, grammar) => walkTokens(withoutTokenizer(code, grammar), code, 0)
  });
  var tag8 = xquery.tag;
  var attrValue2 = tag8.inside["attr-value"][0];
  var isText2 = (token) => token && (!token.type || token.type == "plain-text");
  var walkTokens = (tokens, code, position) => {
    for (var i = 0, openedTags = [], l = 0; i < tokens.length; i++) {
      var token = tokens[i];
      var length = token.length;
      var type5 = token.type;
      var notTagNorBrace = !type5;
      var last, tag22, start2, plainText, content2;
      if (type5 && type5 != "comment") {
        content2 = token.content;
        if (type5 == "tag") {
          start2 = content2[0].length;
          tag22 = code.substr(position + start2, content2[1].length);
          if (start2 > 1) {
            if (l && openedTags[l - 1][0] == tag22) {
              l--;
            }
          } else {
            if (content2[content2.length - 1].length < 2) {
              openedTags[l++] = [tag22, 0];
            }
          }
        } else if (l && type5 == "punctuation") {
          last = openedTags[l - 1];
          if (content2 == "{") {
            if (code[position + 1] == content2) {
              tokens[i + 1] = content2;
              notTagNorBrace = true;
            } else {
              last[1]++;
            }
          } else if (last[1] && content2 == "}") last[1]--;
          else {
            notTagNorBrace = true;
          }
        } else {
          notTagNorBrace = true;
        }
      }
      if (notTagNorBrace && l && !openedTags[l - 1][1]) {
        start2 = position;
        if (isText2(tokens[i + 1])) {
          length += tokens[i + 1].length;
          tokens.splice(i + 1, 1);
        }
        if (isText2(tokens[i - 1])) {
          start2 -= tokens[--i].length;
          tokens.splice(i, 1);
        }
        plainText = code.slice(start2, position + length);
        tokens[i] = new Token("plain-text", plainText, plainText);
      }
      position += length;
    }
    return tokens;
  };
  var expression15 = ["\\{(?!\\{)(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}"];
  tag8.pattern = re(`</?(?!\\d)[^\\s/=>$<%]+(?:\\s+[^\\s/=>]+(?:\\s*=\\s*(["'])(?:\\{\\{|<0>|(?!\\1)[^{])*\\1)?)*\\s*/?>`, expression15, "g");
  attrValue2.pattern = re(`(=\\s*)(["'])(?:\\{\\{|<0>|(?!\\2)[^{])*\\2`, expression15, "g");
  attrValue2.inside["expression"] = {
    pattern: re("((?:^|[^{])(?:\\{\\{)*)<0>", expression15),
    lookbehind: true,
    alias: "language-xquery",
    inside: xquery
  };
  delete xquery["markup-bracket"];

  // node_modules/prism-code-editor/dist/prism/languages/yang.js
  languages.yang = {
    // https://tools.ietf.org/html/rfc6020#page-34
    // http://www.yang-central.org/twiki/bin/view/Main/YangExamples
    "comment": clikeComment(),
    "string": {
      pattern: /"(?:\\.|[^\\"])*"|'[^']*'/g,
      greedy: true
    },
    "keyword": {
      pattern: /(^|[{};\n][ 	]*)[a-z_][\w.-]*/i,
      lookbehind: true
    },
    "namespace": {
      pattern: /(\s)[a-z_][\w.-]*(?=:)/i,
      lookbehind: true
    },
    "boolean": boolean,
    "operator": /\+/,
    "punctuation": /[{}:;]/
  };

  // node_modules/prism-code-editor/dist/prism/languages/zig.js
  var keyword3 = /\b(?:align|allowzero|and|anyframe|anytype|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|f?or|if|inline|linksection|nakedcc|noalias|nosuspend|null|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)\b/;
  var IDENTIFIER = "\\b(?!" + keyword3.source + ")(?!\\d)\\w+\\b";
  var ALIGN = "align\\s*\\((?:[^()]|\\([^)]*\\))*\\)";
  var PREFIX_TYPE_OP = replace("(?:\\?|\\bpromise->|(?:\\[[^[\\]]*\\]|\\*(?!\\*)|\\*\\*)(?:\\s*<0>|\\s*const\\b|\\s*volatile\\b|\\s*allowzero\\b)*)", [ALIGN]);
  var SUFFIX_EXPR = replace("(?:\\bpromise\\b|(?:\\berror\\.)?<0>(?:\\.<0>)*(?!\\s+<0>))", [IDENTIFIER]);
  var TYPE = "(?!\\s)(?:!?\\s*(?:" + PREFIX_TYPE_OP + "\\s*)*" + SUFFIX_EXPR + ")+";
  languages.zig = {
    "comment": [
      {
        pattern: /\/\/[/!].*/,
        alias: "doc-comment"
      },
      /\/\/.*/
    ],
    "string": [
      {
        // "string" and c"string"
        pattern: /(^|[^\\@])c?"(?:\\.|[^\\\n"])*"/g,
        lookbehind: true,
        greedy: true
      },
      {
        // multiline strings and c-strings
        pattern: /(\n)([ 	]+c?\\\\).*(?:\n\2.*)*/g,
        lookbehind: true,
        greedy: true
      }
    ],
    "char": {
      // characters 'a', '\n', '\xFF', '\u{10FFFF}'
      pattern: /(^|[^\\])'(?:[^\\\n']|[\ud800-\udfff]{2}|\\(?:.|x[a-fA-F\d]{2}|u\{[a-fA-F\d]{1,6}\}))'/g,
      lookbehind: true,
      greedy: true
    },
    "builtin": /\B@(?!\d)\w+(?=\s*\()/,
    "label": {
      pattern: /(\b(?:break|continue)\s*:\s*)\w+|\b(?!\d)\w+\b(?=\s*:\s*(?:\{|while\b))/,
      lookbehind: true
    },
    "class-name": [
      // const Foo = struct {};
      /\b(?!\d)\w+(?=\s*=\s*(?:(?:extern|packed)\s+)?(?:enum|struct|union)\s*[({])/,
      {
        // const x: i32 = 9;
        // var x: Bar;
        // fn foo(x: bool, y: f32) void {}
        pattern: re("(:\\s*)<0>(?=\\s*(?:<1>\\s*)?[=;,)])|<0>(?=\\s*(?:<1>\\s*)?\\{)", [TYPE, ALIGN]),
        lookbehind: true,
        inside: "zig"
      },
      {
        // extern fn foo(x: f64) f64; (optional alignment)
        pattern: re("(\\)\\s*)<0>(?=\\s*(?:<1>\\s*)?;)", [TYPE, ALIGN]),
        lookbehind: true,
        inside: "zig"
      }
    ],
    "builtin-type": {
      pattern: /\b(?:anyerror|bool|c_u?(?:int|long|longlong|short)|c_longdouble|c_void|comptime_(?:float|int)|f(?:16|32|64|128)|[iu](?:8|16|32|64|128|size)|noreturn|type|void)\b/,
      alias: "keyword"
    },
    "keyword": keyword3,
    "function": /\b(?!\d)\w+(?=\s*\()/,
    "number": /\b(?:0b[01]+|0o[0-7]+|0x[a-fA-F\d]+(?:\.[a-fA-F\d]*)?(?:[pP][+-]?[a-fA-F\d]+)?|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)\b/,
    "boolean": boolean,
    "operator": /[=-]>|\*\*|\+\+|\|\||(?:<<|>>|[*+-]%|[%&|^!=<>/*+-])=?|[?~]|\.{3}|\.[.*?]/,
    "punctuation": clikePunctuation
  };

  // node_modules/prism-code-editor/dist/index-CKRNGLIi.js
  var createEditor = (container, options, ...extensions) => {
    var _a;
    let language2;
    let prevLines = [];
    let activeLine;
    let value2 = "";
    let activeLineNumber;
    let focused = false;
    let handleSelectionChange = true;
    let tokens = [];
    let readOnly;
    let lineCount = 0;
    const scrollContainer = editorTemplate();
    const wrapper = scrollContainer.firstChild;
    const lines = wrapper.children;
    const overlays = lines[0];
    const textarea = overlays.firstChild;
    const currentOptions = { language: "text", value: value2 };
    const currentExtensions = new Set(extensions);
    const listeners = {};
    const setOptions = (options2) => {
      var _a2;
      Object.assign(currentOptions, options2);
      let isNewVal = value2 != (value2 = (_a2 = options2.value) != null ? _a2 : value2);
      let isNewLang = language2 != (language2 = currentOptions.language);
      readOnly = !!currentOptions.readOnly;
      scrollContainer.style.tabSize = currentOptions.tabSize || 2;
      textarea.inputMode = readOnly ? "none" : "";
      textarea.setAttribute("aria-readonly", readOnly);
      updateClassName();
      updateExtensions();
      if (isNewVal) {
        if (!focused) textarea.remove();
        textarea.value = value2;
        textarea.selectionEnd = 0;
        if (!focused) overlays.prepend(textarea);
      }
      if (isNewVal || isNewLang) {
        update();
      }
    };
    const update = () => {
      tokens = tokenizeText(value2 = textarea.value, languages[language2] || {});
      dispatchEvent("tokenize", tokens, language2, value2);
      let newLines = highlightTokens(tokens).split("\n");
      let start2 = 0;
      let end2 = lineCount;
      let end1 = lineCount = newLines.length;
      while (newLines[start2] == prevLines[start2] && start2 < end1) ++start2;
      while (end1 && newLines[--end1] == prevLines[--end2]) ;
      if (start2 == end1 && start2 == end2) lines[start2 + 1].innerHTML = newLines[start2] + "\n";
      else {
        let insertStart = end2 < start2 ? end2 : start2 - 1;
        let i = insertStart;
        let newHTML = "";
        while (i < end1) newHTML += `<div class=pce-line aria-hidden=true>${newLines[++i]}
</div>`;
        for (i = end1 < start2 ? end1 : start2 - 1; i < end2; i++) lines[start2 + 1].remove();
        if (newHTML) lines[insertStart + 1].insertAdjacentHTML("afterend", newHTML);
        for (i = insertStart + 1; i < lineCount; ) lines[++i].setAttribute("data-line", i);
        scrollContainer.style.setProperty(
          "--number-width",
          (0 | Math.log10(lineCount)) + 1 + ".001ch"
        );
      }
      dispatchEvent("update", value2);
      dispatchSelection(true);
      if (handleSelectionChange) setTimeout(setTimeout, 0, () => handleSelectionChange = true);
      prevLines = newLines;
      handleSelectionChange = false;
    };
    const updateExtensions = (newExtensions) => {
      (newExtensions || currentExtensions).forEach((extension) => {
        if (typeof extension == "object") {
          extension.update(self, currentOptions);
          if (newExtensions) currentExtensions.add(extension);
        } else {
          extension(self, currentOptions);
          if (!newExtensions) currentExtensions.delete(extension);
        }
      });
    };
    const updateClassName = ([start2, end] = getInputSelection()) => {
      scrollContainer.className = `prism-code-editor language-${language2}${currentOptions.lineNumbers == false ? "" : " show-line-numbers"} pce-${currentOptions.wordWrap ? "" : "no"}wrap${currentOptions.rtl ? " pce-rtl" : ""} pce-${start2 < end ? "has" : "no"}-selection${focused ? " pce-focus" : ""}${readOnly ? " pce-readonly" : ""}${currentOptions.class ? " " + currentOptions.class : ""}`;
    };
    const getInputSelection = () => [
      textarea.selectionStart,
      textarea.selectionEnd,
      textarea.selectionDirection
    ];
    const keyCommandMap = {
      Escape() {
        textarea.blur();
      }
    };
    const inputCommandMap = {};
    const dispatchEvent = (name2, ...args2) => {
      var _a2, _b;
      (_a2 = listeners[name2]) == null ? void 0 : _a2.forEach((handler4) => handler4.apply(self, args2));
      (_b = currentOptions["on" + name2[0].toUpperCase() + name2.slice(1)]) == null ? void 0 : _b.apply(self, args2);
    };
    const dispatchSelection = (force) => {
      if (force || handleSelectionChange) {
        const selection = getInputSelection();
        const newLine = lines[activeLineNumber = numLines(value2, 0, selection[selection[2] < "f" ? 0 : 1])];
        if (newLine != activeLine) {
          activeLine == null ? void 0 : activeLine.classList.remove("active-line");
          newLine.classList.add("active-line");
          activeLine = newLine;
        }
        updateClassName(selection);
        dispatchEvent("selectionChange", selection, value2);
      }
    };
    const self = {
      container: scrollContainer,
      wrapper,
      lines,
      textarea,
      get activeLine() {
        return activeLineNumber;
      },
      get value() {
        return value2;
      },
      options: currentOptions,
      get focused() {
        return focused;
      },
      get tokens() {
        return tokens;
      },
      inputCommandMap,
      keyCommandMap,
      extensions: {},
      setOptions,
      update,
      getSelection: getInputSelection,
      addExtensions(...extensions2) {
        updateExtensions(extensions2);
      },
      on: (name2, handler4) => {
        (listeners[name2] || (listeners[name2] = /* @__PURE__ */ new Set())).add(handler4);
        return () => listeners[name2].delete(handler4);
      },
      remove() {
        scrollContainer.remove();
      }
    };
    addListener(textarea, "keydown", (e) => {
      var _a2;
      ((_a2 = keyCommandMap[e.key]) == null ? void 0 : _a2.call(keyCommandMap, e, getInputSelection(), value2)) && preventDefault(e);
    });
    addListener(textarea, "beforeinput", (e) => {
      var _a2;
      if (readOnly || e.inputType == "insertText" && ((_a2 = inputCommandMap[e.data]) == null ? void 0 : _a2.call(inputCommandMap, e, getInputSelection(), value2)))
        preventDefault(e);
    });
    addListener(textarea, "input", update);
    addListener(textarea, "blur", () => {
      selectionChange = null;
      focused = false;
      updateClassName();
    });
    addListener(textarea, "focus", () => {
      selectionChange = dispatchSelection;
      focused = true;
      updateClassName();
    });
    addListener(textarea, "selectionchange", (e) => {
      dispatchSelection();
      preventDefault(e);
    });
    (_a = getElement(container)) == null ? void 0 : _a.append(scrollContainer);
    options && setOptions(options);
    return self;
  };
  var doc = "u" > typeof window ? document : null;
  var templateEl = doc == null ? void 0 : /* @__PURE__ */ doc.createElement("div");
  var createTemplate2 = (html, node) => {
    if (templateEl) {
      templateEl.innerHTML = html;
      node = templateEl.firstChild;
    }
    return () => node.cloneNode(true);
  };
  var addListener = (target, type5, listener2, options) => target.addEventListener(type5, listener2, options);
  var getElement = (el) => typeof el == "string" ? doc.querySelector(el) : el;
  var numLines = (str, start2 = 0, end = Infinity) => {
    let count = 1;
    for (; (start2 = str.indexOf("\n", start2) + 1) && start2 <= end; count++) ;
    return count;
  };
  var languageMap = {};
  var editorTemplate = /* @__PURE__ */ createTemplate2(
    "<div><div class=pce-wrapper><div class=pce-overlays><textarea class=pce-textarea spellcheck=false autocapitalize=off autocomplete=off>"
  );
  var preventDefault = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var selectionChange;
  if (doc) addListener(doc, "selectionchange", () => selectionChange == null ? void 0 : selectionChange());

  // node_modules/prism-code-editor/dist/extensions/guides.js
  var template = /* @__PURE__ */ createTemplate2("<div class=guide-indents>	");
  var indentGuides = () => {
    let tabSize;
    let prevLength = 0;
    let lineIndentMap;
    let active;
    let currentEditor;
    let lines = [];
    let indents = [];
    let container;
    let update = (code) => {
      lineIndentMap = [];
      const newIndents = getIndentGuides(code, tabSize);
      const l = newIndents.length;
      for (let i = 0, prev = [], next = newIndents[0]; next; i++) {
        const style = (lines[i] || (lines[i] = doc.createElement("div"))).style;
        const [top, left, height] = next;
        const old = indents[i];
        next = newIndents[i + 1];
        if (top != (old == null ? void 0 : old[0])) style.top = top + "00%";
        if (left != (old == null ? void 0 : old[1])) style.left = left + "00%";
        if (height != (old == null ? void 0 : old[2])) style.height = height + "00%";
        const isSingleIndent = prev[0] != top && (next == null ? void 0 : next[0]) != top, isSingleOutdent = prev[0] + prev[1] != top + height && (next == null ? void 0 : next[0]) + (next == null ? void 0 : next[1]) != top + height;
        for (let j = -isSingleIndent, l2 = height + isSingleOutdent; j < l2; j++)
          lineIndentMap[j + top] = i;
        prev = indents[i] = newIndents[i];
      }
      for (let i = l; i < prevLength; ) lines[i++].remove();
      container.append(...lines.slice(prevLength, prevLength = l));
    };
    let updateActive = () => {
      const newActive = lines[lineIndentMap[currentEditor.activeLine - 1]];
      if (newActive != active) {
        if (active) active.className = "";
        if (newActive) newActive.className = "active-indent";
        active = newActive;
      }
    };
    return {
      update(editor, options) {
        if (!currentEditor) {
          currentEditor = editor;
          let overlays = editor.lines[0];
          if (container = overlays.querySelector(".guide-indents")) {
            lines.push(...container.children);
            active = lines.find((line) => line.className);
          } else {
            overlays.append(container = template());
          }
          editor.on("update", update);
          editor.on("selectionChange", updateActive);
        }
        container.style.display = options.wordWrap ? "none" : "";
        if (tabSize != (tabSize = options.tabSize || 2)) {
          update(editor.value);
          updateActive();
        }
      }
    };
  };
  var getIndentGuides = (code, tabSize) => {
    const lines = code.split("\n");
    const l = lines.length;
    const stack = [];
    const results = [];
    for (let prevIndent = 0, emptyPos = -1, i = 0, p = 0; ; i++) {
      let last = i == l;
      let line = lines[i];
      let pos = last ? 0 : line.search(/\S/);
      let indent = 0;
      let j = 0;
      if (pos < 0) {
        if (emptyPos < 0) emptyPos = i;
      } else {
        for (; j < pos; ) {
          indent += line[j++] == "	" ? tabSize - indent % tabSize : 1;
        }
        if (indent) indent = Math.ceil(indent / tabSize);
        for (j = indent; j < prevIndent; j++) {
          stack[j][2] = (emptyPos < 0 || j == indent && !last ? i : emptyPos) - stack[j][0];
        }
        for (j = prevIndent; j < indent; ) {
          results[p++] = stack[j] = [emptyPos < 0 || j > prevIndent ? i : emptyPos, j++, 0];
        }
        emptyPos = -1;
        prevIndent = indent;
      }
      if (last) break;
    }
    return results;
  };

  // node_modules/prism-code-editor/dist/bracket-BPYnIBjq.js
  var testBracket = (str, brackets2, l) => {
    return brackets2.indexOf(str[0]) + 1 || l && brackets2.indexOf(str[l]) + 1;
  };

  // node_modules/prism-code-editor/dist/extensions/matchBrackets/index.js
  var matchBrackets = (rainbowBrackets = true, pairs = "()[]{}") => {
    let bracketIndex;
    let sp;
    const stack = [];
    const self = (editor) => {
      editor.extensions.matchBrackets = self;
      editor.on("tokenize", matchBrackets2);
      if (rainbowBrackets && editor.tokens[0]) editor.update();
      else matchBrackets2(editor.tokens);
    };
    const brackets2 = self.brackets = [];
    const pairMap = self.pairs = [];
    const matchBrackets2 = (tokens) => {
      pairMap.length = brackets2.length = sp = bracketIndex = 0;
      matchRecursive(tokens, 0);
      if (rainbowBrackets) {
        for (let i = 0, bracket2; bracket2 = brackets2[i]; ) {
          let alias = bracket2[0].alias;
          bracket2[0].alias = (alias ? alias + " " : "") + `bracket-${i++ in pairMap ? "level-" + bracket2[3] % 12 : "error"}`;
        }
      }
    };
    const matchRecursive = (tokens, position) => {
      let token;
      let i = 0;
      for (; token = tokens[i++]; ) {
        let length = token.length;
        if (typeof token != "string") {
          let content2 = token.content;
          if (Array.isArray(content2)) {
            matchRecursive(content2, position);
          } else if ((token.alias || token.type) == "punctuation") {
            let bracketType = testBracket(content2, pairs, length - 1);
            let isOpening = bracketType % 2;
            if (bracketType) {
              brackets2[bracketIndex] = [token, position, position + length, sp, content2, !!isOpening];
              if (isOpening) stack[sp++] = [bracketIndex, bracketType + 1];
              else {
                for (let i2 = sp; i2; ) {
                  let entry = stack[--i2];
                  if (bracketType == entry[1]) {
                    pairMap[pairMap[bracketIndex] = entry[0]] = bracketIndex;
                    brackets2[bracketIndex][3] = sp = i2;
                    i2 = 0;
                  }
                }
              }
              bracketIndex++;
            }
          }
        }
        position += length;
      }
    };
    return self;
  };

  // node_modules/prism-code-editor/dist/index-BvZmi6ce.js
  var getLineStart = (text, position) => position ? text.lastIndexOf("\n", position - 1) + 1 : 0;
  var getLineEnd = (text, position) => (position = text.indexOf("\n", position)) + 1 ? position : text.length;
  var addTextareaListener = (editor, type5, listener2, options) => addListener(editor.textarea, type5, listener2, options);
  var getStyleValue = (el, prop) => parseFloat(getComputedStyle(el)[prop]);
  var updateNode = (node, text) => {
    if (node.data != text) node.data = text;
  };
  var voidlessLangs = new Set("xml,rss,atom,jsx,tsx,xquery,xeora,xeoracube,actionscript".split(","));
  var voidTags = /^(?:area|base|w?br|col|embed|hr|img|input|link|meta|source|track)$/i;
  var prevSelection;
  var regexEscape = (str) => str.replace(/[$+?|.^*()[\]{}\\]/g, "\\$&");
  var getLineBefore = (text, position) => text.slice(getLineStart(text, position), position);
  var getLines = (text, start2, end = start2) => [
    text.slice(start2 = getLineStart(text, start2), end = getLineEnd(text, end)).split("\n"),
    start2,
    end
  ];
  var getClosestToken = (editor, selector, marginLeft = 0, marginRight = marginLeft, position = editor.getSelection()[0]) => {
    var _a;
    const value2 = editor.value;
    const line = editor.lines[numLines(value2, 0, position)];
    const walker = doc.createTreeWalker(line, 5);
    let node = walker.lastChild();
    let offset = getLineEnd(value2, position) + 1 - position - node.length;
    while (-offset <= marginRight && (node = walker.previousNode())) {
      if (node.lastChild) continue;
      offset -= node.length || 0;
      if (offset <= marginLeft) {
        for (; node != line; node = node.parentNode) {
          if ((_a = node.matches) == null ? void 0 : _a.call(node, selector)) return node;
        }
      }
    }
  };
  var getLanguage = (editor, position) => {
    var _a;
    return ((_a = getClosestToken(editor, "[class*=language-]", 0, 0, position)) == null ? void 0 : _a.className.match(
      /language-(\S*)/
    )[1]) || editor.options.language;
  };
  var insertText = (editor, text, start2, end, newCursorStart, newCursorEnd) => {
    if (editor.options.readOnly) return;
    prevSelection = editor.getSelection();
    end != null ? end : end = start2;
    let textarea = editor.textarea;
    let value2 = editor.value;
    let avoidBug = isChrome && !value2[end != null ? end : prevSelection[1]] && /\n$/.test(text) && /^$|\n$/.test(value2);
    let removeListener;
    editor.focused || textarea.focus();
    if (start2 != null) textarea.setSelectionRange(start2, end);
    if (newCursorStart != null) {
      removeListener = editor.on("update", () => {
        textarea.setSelectionRange(
          newCursorStart,
          newCursorEnd != null ? newCursorEnd : newCursorStart,
          prevSelection[2]
        );
        removeListener();
      });
    }
    isWebKit || textarea.dispatchEvent(new InputEvent("beforeinput", { data: text }));
    if (isChrome || isWebKit) {
      if (avoidBug) {
        textarea.selectionEnd--;
        text = text.slice(0, -1);
      }
      if (isWebKit) text += "\n";
      doc.execCommand(text ? "insertHTML" : "delete", false, escapeHtml(text, /</g, "&lt;"));
      if (avoidBug) textarea.selectionStart++;
    } else doc.execCommand(text ? "insertText" : "delete", false, text);
    prevSelection = 0;
  };
  var setSelection = (editor, start2, end = start2, direction) => {
    let focused = editor.focused;
    let textarea = editor.textarea;
    let relatedTarget;
    if (!focused) {
      addListener(
        textarea,
        "focus",
        (e) => {
          relatedTarget = e.relatedTarget;
        },
        { once: true }
      );
      textarea.focus();
    }
    textarea.setSelectionRange(start2, end, direction);
    selectionChange(!(!focused && (relatedTarget ? relatedTarget.focus() : textarea.blur())));
  };
  var userAgent = doc ? navigator.userAgent : "";
  var isMac = doc ? /Mac|iPhone|iPod|iPad/i.test(navigator.platform) : false;
  var isChrome = /Chrome\//.test(userAgent);
  var isWebKit = !isChrome && /AppleWebKit\//.test(userAgent);
  var getModifierCode = (e) => e.altKey + e.ctrlKey * 2 + e.metaKey * 4 + e.shiftKey * 8;
  var addOverlay = (editor, overlay) => editor.lines[0].append(overlay);

  // node_modules/prism-code-editor/dist/extensions/matchTags.js
  var createTagMatcher = (editor) => {
    let pairMap = [];
    let code;
    let tags = [];
    let tagIndex;
    let sp;
    let stack = [];
    let matchTags2 = (tokens, language2, value2) => {
      code = value2;
      tags.length = pairMap.length = tagIndex = sp = 0;
      matchTagsRecursive(tokens, language2, 0);
    };
    let matchTagsRecursive = (tokens, language2, position) => {
      let noVoidTags = voidlessLangs.has(language2);
      let i = 0;
      let l = tokens.length;
      for (; i < l; ) {
        const token = tokens[i++];
        const content2 = token.content;
        const length = token.length;
        if (Array.isArray(content2)) {
          if (token.type == "tag" && code[position] == "<") {
            const openLen = content2[0].length;
            const tagName = content2[2] ? code.substr(position + openLen, content2[1].length) : "";
            const notSelfClosing = content2[content2.length - 1].length < 2 && (noVoidTags || !voidTags.test(tagName));
            if (content2[2] && noVoidTags) matchTagsRecursive(content2, language2, position);
            if (notSelfClosing) {
              if (openLen > 1) {
                for (let i2 = sp; i2; ) {
                  if (tagName == stack[--i2][1]) {
                    pairMap[pairMap[tagIndex] = stack[sp = i2][0]] = tagIndex;
                    i2 = 0;
                  }
                }
              } else {
                stack[sp++] = [tagIndex, tagName];
              }
            }
            tags[tagIndex++] = [
              token,
              position,
              position + length,
              tagName,
              openLen > 1,
              notSelfClosing
            ];
          } else {
            let lang = token.alias || token.type;
            matchTagsRecursive(
              content2,
              lang.slice(0, 9) == "language-" ? lang.slice(9) : language2,
              position
            );
          }
        }
        position += length;
      }
    };
    editor.on("tokenize", matchTags2);
    matchTags2(editor.tokens, editor.options.language, editor.value);
    return {
      tags,
      pairs: pairMap
    };
  };
  var getClosestTagIndex = (pos, tags) => {
    for (let i = 0, l = tags.length; i < l; i++) if (tags[i][1] <= pos && tags[i][2] >= pos) return i;
  };
  var matchTags = () => (editor) => {
    var _a;
    let openEl, closeEl;
    const { tags, pairs } = (_a = editor.extensions).matchTags || (_a.matchTags = createTagMatcher(editor));
    const highlight = (remove) => [openEl, closeEl].forEach((el) => {
      el && el.classList.toggle("active-tagname", !remove);
    });
    editor.on("selectionChange", ([start2, end]) => {
      let newEl1;
      let newEl2;
      let index2;
      if (start2 == end && editor.focused) {
        index2 = getClosestTagIndex(start2, tags);
        if (index2 + 1) {
          index2 = pairs[index2];
          if (index2 + 1 && (newEl1 = getClosestToken(editor, ".tag>.tag"))) {
            newEl2 = getClosestToken(editor, ".tag>.tag", 2, 0, tags[index2][1]);
          }
        }
      }
      if (openEl != newEl1) {
        highlight(true);
        openEl = newEl1;
        closeEl = newEl2;
        highlight();
      }
    });
  };

  // node_modules/prism-code-editor/dist/extensions/commands.js
  var ignoreTab = false;
  var mod = isMac ? 4 : 2;
  var setIgnoreTab = (newState) => ignoreTab = newState;
  var whitespaceEnd = (str) => str.search(/\S|$/);
  var defaultCommands = (selfClosePairs = ['""', "''", "``", "()", "[]", "{}"], selfCloseRegex = /([^$\w'"`]["'`]|.[[({])[.,:;\])}>\s]|.[[({]`/s) => (editor, options) => {
    let prevCopy;
    const { keyCommandMap, inputCommandMap, getSelection, container } = editor;
    const clipboard = navigator.clipboard;
    const getIndent = ({ insertSpaces = true, tabSize } = options) => [insertSpaces ? " " : "	", insertSpaces ? tabSize || 2 : 1];
    const scroll = () => {
      var _a;
      return !options.readOnly && !((_a = editor.extensions.cursor) == null ? void 0 : _a.scrollIntoView());
    };
    const selfClose = ([start2, end], [open, close], value2, wrapOnly) => (start2 < end || !wrapOnly && selfCloseRegex.test((value2[end - 1] || " ") + open + (value2[end] || " "))) && !insertText(editor, open + value2.slice(start2, end) + close, null, null, start2 + 1, end + 1);
    const skipIfEqual = ([start2, end], char2, value2) => start2 == end && value2[end] == char2 && !setSelection(editor, start2 + 1);
    const insertLines = (old, newL, start2, end, selectionStart, selectionEnd) => {
      let newLines = newL.join("\n");
      if (newLines != old.join("\n")) {
        const last = old.length - 1;
        const lastLine = newL[last];
        const oldLastLine = old[last];
        const lastDiff = oldLastLine.length - lastLine.length;
        const firstDiff = newL[0].length - old[0].length;
        const firstInsersion = start2 + whitespaceEnd((firstDiff < 0 ? newL : old)[0]);
        const lastInsersion = end - oldLastLine.length + whitespaceEnd(lastDiff > 0 ? lastLine : oldLastLine);
        const offset = start2 - end + newLines.length + lastDiff;
        const newCursorStart = firstInsersion > selectionStart ? selectionStart : Math.max(firstInsersion, selectionStart + firstDiff);
        const newCursorEnd = selectionEnd + start2 - end + newLines.length;
        insertText(
          editor,
          newLines,
          start2,
          end,
          newCursorStart,
          selectionEnd < lastInsersion ? newCursorEnd + lastDiff : Math.max(lastInsersion + offset, newCursorEnd)
        );
      }
    };
    const indent = (outdent, lines, start1, end1, start2, end, indentChar, tabSize) => {
      insertLines(
        lines,
        lines.map(
          outdent ? (str) => str.slice(whitespaceEnd(str) ? tabSize - whitespaceEnd(str) % tabSize : 0) : (str) => str && indentChar.repeat(tabSize - whitespaceEnd(str) % tabSize) + str
        ),
        start1,
        end1,
        start2,
        end
      );
    };
    inputCommandMap["<"] = (_e, selection, value2) => selfClose(selection, "<>", value2, true);
    selfClosePairs.forEach(([open, close]) => {
      const isQuote = open == close;
      inputCommandMap[open] = (_e, selection, value2) => (isQuote && skipIfEqual(selection, close, value2) || selfClose(selection, open + close, value2)) && scroll();
      if (!isQuote)
        inputCommandMap[close] = (_e, selection, value2) => skipIfEqual(selection, close, value2) && scroll();
    });
    inputCommandMap[">"] = (e, selection, value2) => {
      var _a, _b;
      const closingTag2 = (_b = (_a = languageMap[getLanguage(editor)]) == null ? void 0 : _a.autoCloseTags) == null ? void 0 : _b.call(_a, selection, value2, editor);
      if (closingTag2) {
        insertText(editor, ">" + closingTag2, null, null, selection[0] + 1);
        preventDefault(e);
      }
    };
    keyCommandMap.Tab = (e, [start2, end], value2) => {
      if (ignoreTab || options.readOnly || getModifierCode(e) & 6) return;
      const [indentChar, tabSize] = getIndent(options);
      const shiftKey = e.shiftKey;
      const [lines, start1, end1] = getLines(value2, start2, end);
      if (start2 < end || shiftKey) {
        indent(shiftKey, lines, start1, end1, start2, end, indentChar, tabSize);
      } else insertText(editor, indentChar.repeat(tabSize - (start2 - start1) % tabSize));
      return scroll();
    };
    keyCommandMap.Enter = (e, selection, value2) => {
      var _a, _b, _c;
      const code = getModifierCode(e) & 7;
      if (!code || code == mod) {
        if (code) selection[0] = selection[1] = getLines(value2, selection[1])[2];
        const [indentChar, tabSize] = getIndent();
        const [start2, end] = selection;
        const autoIndent = (_a = languageMap[getLanguage(editor)]) == null ? void 0 : _a.autoIndent;
        const indenationCount = Math.floor(whitespaceEnd(getLineBefore(value2, start2)) / tabSize) * tabSize;
        const extraIndent = ((_b = autoIndent == null ? void 0 : autoIndent[0]) == null ? void 0 : _b.call(autoIndent, selection, value2, editor)) ? tabSize : 0;
        const extraLine = (_c = autoIndent == null ? void 0 : autoIndent[1]) == null ? void 0 : _c.call(autoIndent, selection, value2, editor);
        const newText = "\n" + indentChar.repeat(indenationCount + extraIndent) + (extraLine ? "\n" + indentChar.repeat(indenationCount) : "");
        if (newText[1] || value2[end]) {
          insertText(editor, newText, start2, end, start2 + indenationCount + extraIndent + 1);
          return scroll();
        }
      }
    };
    keyCommandMap.Backspace = (_e, [start2, end], value2) => {
      if (start2 == end) {
        const line = getLineBefore(value2, start2);
        const tabSize = options.tabSize || 2;
        const isPair = selfClosePairs.includes(value2.slice(start2 - 1, start2 + 1));
        const indenationCount = /[^ ]/.test(line) ? 0 : (line.length - 1) % tabSize + 1;
        if (isPair || indenationCount > 1) {
          insertText(editor, "", start2 - (isPair ? 1 : indenationCount), start2 + isPair);
          return scroll();
        }
      }
    };
    for (let i = 0; i < 2; i++) {
      keyCommandMap[i ? "ArrowDown" : "ArrowUp"] = (e, [start2, end], value2) => {
        const code = getModifierCode(e);
        if (code == 1) {
          const newStart = i ? start2 : getLineStart(value2, start2) - 1;
          const newEnd = i ? value2.indexOf("\n", end) + 1 : end;
          if (newStart > -1 && newEnd > 0) {
            const [lines, start1, end1] = getLines(value2, newStart, newEnd);
            const line = lines[i ? "pop" : "shift"]();
            const offset = (line.length + 1) * (i ? 1 : -1);
            lines[i ? "unshift" : "push"](line);
            insertText(editor, lines.join("\n"), start1, end1, start2 + offset, end + offset);
          }
          return scroll();
        } else if (code == 9) {
          const [lines, start1, end1] = getLines(value2, start2, end);
          const str = lines.join("\n");
          const offset = i ? str.length + 1 : 0;
          insertText(editor, str + "\n" + str, start1, end1, start2 + offset, end + offset);
          return scroll();
        } else if (code == 2 && !isMac) {
          container.scrollBy(0, getStyleValue(container, "lineHeight") * (i ? 1 : -1));
          return true;
        }
      };
    }
    addTextareaListener(editor, "keydown", (e) => {
      var _a;
      const code = getModifierCode(e);
      const keyCode = e.keyCode;
      const [start2, end, dir] = getSelection();
      if (code == mod && (keyCode == 221 || keyCode == 219)) {
        indent(keyCode == 219, ...getLines(editor.value, start2, end), start2, end, ...getIndent());
        scroll();
        preventDefault(e);
      } else if (code == (isMac ? 10 : 2) && keyCode == 77) {
        setIgnoreTab(!ignoreTab);
        preventDefault(e);
      } else if (keyCode == 191 && code == mod || keyCode == 65 && code == 9) {
        const value2 = editor.value;
        const isBlock = code == 9;
        const position = isBlock ? start2 : getLineStart(value2, start2);
        const language2 = languageMap[getLanguage(editor, position)] || {};
        const { line, block } = ((_a = language2.getComments) == null ? void 0 : _a.call(language2, editor, position, value2)) || language2.comments || {};
        const [lines, start1, end1] = getLines(value2, start2, end);
        const last = lines.length - 1;
        if (isBlock) {
          if (block) {
            const [open, close] = block;
            const text = value2.slice(start2, end);
            const pos = value2.slice(0, start2).search(regexEscape(open) + " ?$");
            const matches = RegExp("^ ?" + regexEscape(close)).test(value2.slice(end));
            if (pos + 1 && matches)
              insertText(
                editor,
                text,
                pos,
                end + +(value2[end] == " ") + close.length,
                pos,
                pos + end - start2
              );
            else
              insertText(
                editor,
                `${open} ${text} ${close}`,
                start2,
                end,
                start2 + open.length + 1,
                end + open.length + 1
              );
            scroll();
            preventDefault(e);
          }
        } else {
          if (line) {
            const escaped = regexEscape(line);
            const regex = RegExp(`^\\s*(${escaped} ?|$)`);
            const regex2 = RegExp(escaped + " ?");
            const allWhiteSpace = !/\S/.test(value2.slice(start1, end1));
            const newLines = lines.map(
              lines.every((line2) => regex.test(line2)) && !allWhiteSpace ? (str) => str.replace(regex2, "") : (str) => allWhiteSpace || /\S/.test(str) ? str.replace(/^\s*/, `$&${line} `) : str
            );
            insertLines(lines, newLines, start1, end1, start2, end);
            scroll();
            preventDefault(e);
          } else if (block) {
            const [open, close] = block;
            const insertionPoint = whitespaceEnd(lines[0]);
            const hasComment = lines[0].startsWith(open, insertionPoint) && lines[last].endsWith(close);
            const newLines = lines.slice();
            newLines[0] = lines[0].replace(
              hasComment ? RegExp(regexEscape(open) + " ?") : /(?=\S)|$/,
              hasComment ? "" : open + " "
            );
            let diff2 = newLines[0].length - lines[0].length;
            newLines[last] = hasComment ? newLines[last].replace(RegExp(`( ?${regexEscape(close)})?$`), "") : newLines[last] + " " + close;
            let newText = newLines.join("\n");
            let firstInsersion = insertionPoint + start1;
            let newStart = firstInsersion > start2 ? start2 : Math.max(start2 + diff2, firstInsersion);
            let newEnd = firstInsersion > end - (start2 != end) ? end : Math.min(Math.max(firstInsersion, end + diff2), start1 + newText.length);
            insertText(editor, newText, start1, end1, newStart, Math.max(newStart, newEnd));
            scroll();
            preventDefault(e);
          }
        }
      } else if (code == 8 + mod && keyCode == 75) {
        const value2 = editor.value;
        const [lines, start1, end1] = getLines(value2, start2, end);
        const column = dir > "f" ? end - end1 + lines.pop().length : start2 - start1;
        const newLineLen = getLineEnd(value2, end1 + 1) - end1 - 1;
        insertText(
          editor,
          "",
          start1 - !!start1,
          end1 + !start1,
          start1 + Math.min(column, newLineLen)
        );
        scroll();
        preventDefault(e);
      }
    });
    ["copy", "cut", "paste"].forEach(
      (type5) => addTextareaListener(editor, type5, (e) => {
        const [start2, end] = getSelection();
        if (start2 == end && clipboard) {
          const [[line], start1, end1] = getLines(editor.value, start2, end);
          if (type5 == "paste") {
            if (e.clipboardData.getData("text/plain") == prevCopy) {
              insertText(editor, prevCopy + "\n", start1, start1, start2 + prevCopy.length + 1);
              scroll();
              preventDefault(e);
            }
          } else {
            clipboard.writeText(prevCopy = line);
            if (type5 == "cut") insertText(editor, "", start1, end1 + 1), scroll();
            preventDefault(e);
          }
        }
      })
    );
  };

  // node_modules/prism-code-editor/dist/extensions/matchBrackets/highlight.js
  var highlightBracketPairs = () => (editor) => {
    let prev;
    let els = [];
    let selectionChange2 = () => {
      var _a;
      let matcher = editor.extensions.matchBrackets;
      let [start2, end] = editor.getSelection();
      if (matcher) {
        let brackets2 = matcher.brackets;
        let pairs = matcher.pairs;
        let opening;
        let closing;
        if (editor.focused && start2 == end) {
          for (let i = 0, bracket2; bracket2 = brackets2[++i]; ) {
            if (!bracket2[5] && bracket2[2] >= end && ((_a = brackets2[pairs[i]]) == null ? void 0 : _a[1]) <= end) {
              opening = brackets2[pairs[i]];
              closing = bracket2;
              break;
            }
          }
        }
        if (closing != prev) {
          toggleActive();
          if (closing) {
            els = [opening, closing].map(
              (bracket2) => getClosestToken(editor, ".punctuation", 0, -1, bracket2[1])
            );
            if (els[0] != els[1] && opening[2] == closing[1]) {
              els[0].textContent += els[1].textContent;
              els[1].textContent = "";
              els[1] = els[0];
            }
            toggleActive(true);
          } else els = [];
        }
        prev = closing;
      }
    };
    let toggleActive = (add2) => els.forEach((el) => el.classList.toggle("active-bracket", !!add2));
    addTextareaListener(editor, "focus", selectionChange2);
    addTextareaListener(editor, "blur", selectionChange2);
    editor.on("selectionChange", selectionChange2);
  };

  // node_modules/prism-code-editor/dist/search-Dk5fdw4x.js
  var searchTemplate = /* @__PURE__ */ createTemplate2(
    '<div style="color:#0000;contain:strict;padding:0 var(--_pse) 0 var(--padding-left)" aria-hidden=true> '
  );
  var matchTemplate = /* @__PURE__ */ createTemplate2("<span> ");
  var testBoundary = (str, position, pattern = /[_\p{N}\p{L}]{2}/u) => {
    if (!position) return false;
    return pattern.test(
      str.slice(
        position - (str.codePointAt(position - 2) > 65535 ? 2 : 1),
        position + (str.codePointAt(position) > 65535 ? 2 : 1)
      )
    );
  };
  var createSearchAPI = (editor) => {
    const container = searchTemplate();
    const nodes = [container.firstChild];
    const matchPositions = [];
    const stopSearch = () => {
      if (matchPositions[0]) {
        matchPositions.length = 0;
        container.remove();
      }
    };
    let regex;
    let lastNode = 0;
    return {
      search(str, caseSensitive, wholeWord, useRegExp, selection, filter, pattern) {
        if (!str) return stopSearch();
        if (!useRegExp) str = regexEscape(str);
        const value2 = editor.value;
        const searchStr = selection ? value2.slice(...selection) : value2;
        const offset = selection ? selection[0] : 0;
        let match;
        let l;
        let index2;
        let i = 0;
        try {
          regex = RegExp(str, `gum${caseSensitive ? "" : "i"}`);
          while (match = regex.exec(searchStr)) {
            l = match[0].length;
            index2 = match.index + offset;
            if (!l) regex.lastIndex += value2.codePointAt(index2) > 65535 ? 2 : 1;
            if (wholeWord && (testBoundary(value2, index2, pattern) || testBoundary(value2, index2 + l, pattern)))
              continue;
            if (!filter || filter(index2, index2 + l)) matchPositions[i++] = [index2, index2 + l];
          }
        } catch (e) {
          stopSearch();
          return e.message;
        }
        if (i) {
          matchPositions.length = i;
          l = Math.min(i * 2, 2e4);
          for (i = nodes.length; i <= l; ) {
            nodes[i++] = matchTemplate();
            nodes[i++] = new Text();
          }
          for (i = l; i < lastNode; ) nodes[++i].remove();
          if (lastNode < l) container.append(...nodes.slice(lastNode + 1, l + 1));
          let prevEnd = 0;
          for (i = 0; i < l; ) {
            const [start2, end] = matchPositions[i / 2];
            updateNode(nodes[i++], value2.slice(prevEnd, start2));
            updateNode(nodes[i++].firstChild, value2.slice(start2, prevEnd = end));
          }
          updateNode(nodes[l], value2.slice(prevEnd));
          if (!container.parentNode) addOverlay(editor, container);
          lastNode = l;
        } else stopSearch();
      },
      container,
      get regex() {
        return regex;
      },
      matches: matchPositions,
      stopSearch
    };
  };

  // node_modules/prism-code-editor/dist/selection-M9_8z0AZ.js
  var highlightSelectionMatches = (caseSensitive, minLength = 1, maxLength = 200) => {
    const self = (editor) => {
      const searchAPI = self.api = createSearchAPI(editor);
      const container = searchAPI.container;
      container.style.zIndex = -1;
      container.className = "selection-matches";
      editor.on("selectionChange", ([start2, end], value2) => {
        value2 = editor.focused ? value2.slice(start2, end) : "";
        start2 += value2.search(/\S/);
        value2 = value2.trim();
        let l = value2.length;
        searchAPI.search(
          minLength > l || l > maxLength ? "" : value2,
          caseSensitive,
          false,
          false,
          void 0,
          (mStart, mEnd) => mStart > start2 || mEnd <= start2
        );
      });
    };
    return self;
  };

  // node_modules/prism-code-editor/dist/extensions/search/index.js
  var shortcut = ` (Alt+${isMac ? "Cmd+" : ""}`;
  var template2 = /* @__PURE__ */ createTemplate2(
    `<div class=prism-search-container style=display:flex;align-items:flex-start;justify-content:flex-end><div dir=ltr class=prism-search><button type=button aria-expanded=false title="Toggle Replace" class=pce-expand></button><div spellcheck=false><div><div class="pce-input pce-find"><input autocorrect=off autocapitalize=off placeholder=Find aria-label=Find><button type=button class=prev-match title="Previous Match (Shift+Enter)"></button><button type=button class=next-match title="Next Match (Enter)"></button><div class=search-error></div></div><button type=button class=pce-close title="Close (Esc)"></button></div><div class="pce-input pce-replace"><input autocorrect=off autocapitalize=off placeholder=Replace aria-label=Replace><button type=button title=(Enter)>Replace</button><button type=button title=(${isMac ? "Cmd" : "Ctrl+Alt"}+Enter)>All</button></div><div class=pce-options><div class=pce-match-count>0<span> of </span>0</div><button type=button aria-pressed=false class=pce-regex title="RegExp Search${shortcut}R)"><span aria-hidden=true></span></button><button type=button aria-pressed=false title="Preserve Case${shortcut}P)"><span aria-hidden=true>Aa</span></button><button type=button aria-pressed=false class=pce-whole title="Match Whole Word${shortcut}W)"><span aria-hidden=true>ab</span></button><button type=button aria-pressed=false class=pce-in-selection title="Find in Selection${shortcut}L)">`
  );

  // assets/js/components/code_block.js
  function codeEditor({ readOnly = true }) {
    return {
      editor: null,
      async init() {
        this.$debug("Initializing code editor");
        this.editor = await createEditor(
          this.$refs.container,
          {
            language: "html",
            theme: "github-light",
            value: this.$refs.raw.value,
            lineNumbers: true,
            readOnly: true,
            insertSpaces: true,
            wordWrap: true
          },
          matchTags(),
          matchBrackets(),
          highlightBracketPairs(),
          highlightSelectionMatches(),
          indentGuides(),
          defaultCommands()
          // readOnlyCodeFolding(
          //   tagFolding,
          //   bracketFolding,
          //   markdownFolding,
          //   blockCommentFolding
          // )
        );
      }
    };
  }

  // node_modules/split-grid/dist/split-grid.mjs
  var numeric = function(value2, unit2) {
    return Number(value2.slice(0, -1 * unit2.length));
  };
  var parseValue = function(value2) {
    if (value2.endsWith("px")) {
      return { value: value2, type: "px", numeric: numeric(value2, "px") };
    }
    if (value2.endsWith("fr")) {
      return { value: value2, type: "fr", numeric: numeric(value2, "fr") };
    }
    if (value2.endsWith("%")) {
      return { value: value2, type: "%", numeric: numeric(value2, "%") };
    }
    if (value2 === "auto") {
      return { value: value2, type: "auto" };
    }
    return null;
  };
  var parse = function(rule) {
    return rule.split(" ").map(parseValue);
  };
  var getSizeAtTrack = function(index2, tracks, gap2, end) {
    if (gap2 === void 0) {
      gap2 = 0;
    }
    if (end === void 0) {
      end = false;
    }
    var newIndex = end ? index2 + 1 : index2;
    var trackSum = tracks.slice(0, newIndex).reduce(function(accum, value2) {
      return accum + value2.numeric;
    }, 0);
    var gapSum = gap2 ? index2 * gap2 : 0;
    return trackSum + gapSum;
  };
  var getStyles = function(rule, ownRules, matchedRules) {
    return ownRules.concat(matchedRules).map(function(r) {
      return r.style[rule];
    }).filter(function(style) {
      return style !== void 0 && style !== "";
    });
  };
  var getGapValue = function(unit2, size2) {
    if (size2.endsWith(unit2)) {
      return Number(size2.slice(0, -1 * unit2.length));
    }
    return null;
  };
  var firstNonZero = function(tracks) {
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i].numeric > 0) {
        return i;
      }
    }
    return null;
  };
  var NOOP = function() {
    return false;
  };
  var defaultWriteStyle = function(element, gridTemplateProp, style) {
    element.style[gridTemplateProp] = style;
  };
  var getOption = function(options, propName, def) {
    var value2 = options[propName];
    if (value2 !== void 0) {
      return value2;
    }
    return def;
  };
  function getMatchedCSSRules(el) {
    var ref;
    return (ref = []).concat.apply(
      ref,
      Array.from(el.ownerDocument.styleSheets).map(function(s) {
        var rules = [];
        try {
          rules = Array.from(s.cssRules || []);
        } catch (e) {
        }
        return rules;
      })
    ).filter(function(r) {
      var matches = false;
      try {
        matches = el.matches(r.selectorText);
      } catch (e) {
      }
      return matches;
    });
  }
  var gridTemplatePropColumns = "grid-template-columns";
  var gridTemplatePropRows = "grid-template-rows";
  var Gutter = function Gutter2(direction, options, parentOptions) {
    this.direction = direction;
    this.element = options.element;
    this.track = options.track;
    if (direction === "column") {
      this.gridTemplateProp = gridTemplatePropColumns;
      this.gridGapProp = "grid-column-gap";
      this.cursor = getOption(
        parentOptions,
        "columnCursor",
        getOption(parentOptions, "cursor", "col-resize")
      );
      this.snapOffset = getOption(
        parentOptions,
        "columnSnapOffset",
        getOption(parentOptions, "snapOffset", 30)
      );
      this.dragInterval = getOption(
        parentOptions,
        "columnDragInterval",
        getOption(parentOptions, "dragInterval", 1)
      );
      this.clientAxis = "clientX";
      this.optionStyle = getOption(parentOptions, "gridTemplateColumns");
    } else if (direction === "row") {
      this.gridTemplateProp = gridTemplatePropRows;
      this.gridGapProp = "grid-row-gap";
      this.cursor = getOption(
        parentOptions,
        "rowCursor",
        getOption(parentOptions, "cursor", "row-resize")
      );
      this.snapOffset = getOption(
        parentOptions,
        "rowSnapOffset",
        getOption(parentOptions, "snapOffset", 30)
      );
      this.dragInterval = getOption(
        parentOptions,
        "rowDragInterval",
        getOption(parentOptions, "dragInterval", 1)
      );
      this.clientAxis = "clientY";
      this.optionStyle = getOption(parentOptions, "gridTemplateRows");
    }
    this.onDragStart = getOption(parentOptions, "onDragStart", NOOP);
    this.onDragEnd = getOption(parentOptions, "onDragEnd", NOOP);
    this.onDrag = getOption(parentOptions, "onDrag", NOOP);
    this.writeStyle = getOption(
      parentOptions,
      "writeStyle",
      defaultWriteStyle
    );
    this.startDragging = this.startDragging.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.drag = this.drag.bind(this);
    this.minSizeStart = options.minSizeStart;
    this.minSizeEnd = options.minSizeEnd;
    if (options.element) {
      this.element.addEventListener("mousedown", this.startDragging);
      this.element.addEventListener("touchstart", this.startDragging);
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
    if (this.direction === "column") {
      this.start = top;
      this.end = bottom;
      this.size = height;
    } else if (this.direction === "row") {
      this.start = left;
      this.end = right;
      this.size = width;
    }
  };
  Gutter.prototype.getSizeAtTrack = function getSizeAtTrack$1(track2, end) {
    return getSizeAtTrack(
      track2,
      this.computedPixels,
      this.computedGapPixels,
      end
    );
  };
  Gutter.prototype.getSizeOfTrack = function getSizeOfTrack(track2) {
    return this.computedPixels[track2].numeric;
  };
  Gutter.prototype.getRawTracks = function getRawTracks() {
    var tracks = getStyles(
      this.gridTemplateProp,
      [this.grid],
      getMatchedCSSRules(this.grid)
    );
    if (!tracks.length) {
      if (this.optionStyle) {
        return this.optionStyle;
      }
      throw Error("Unable to determine grid template tracks from styles.");
    }
    return tracks[0];
  };
  Gutter.prototype.getGap = function getGap() {
    var gap2 = getStyles(
      this.gridGapProp,
      [this.grid],
      getMatchedCSSRules(this.grid)
    );
    if (!gap2.length) {
      return null;
    }
    return gap2[0];
  };
  Gutter.prototype.getRawComputedTracks = function getRawComputedTracks() {
    return window.getComputedStyle(this.grid)[this.gridTemplateProp];
  };
  Gutter.prototype.getRawComputedGap = function getRawComputedGap() {
    return window.getComputedStyle(this.grid)[this.gridGapProp];
  };
  Gutter.prototype.setTracks = function setTracks(raw2) {
    this.tracks = raw2.split(" ");
    this.trackValues = parse(raw2);
  };
  Gutter.prototype.setComputedTracks = function setComputedTracks(raw2) {
    this.computedTracks = raw2.split(" ");
    this.computedPixels = parse(raw2);
  };
  Gutter.prototype.setGap = function setGap(raw2) {
    this.gap = raw2;
  };
  Gutter.prototype.setComputedGap = function setComputedGap(raw2) {
    this.computedGap = raw2;
    this.computedGapPixels = getGapValue("px", this.computedGap) || 0;
  };
  Gutter.prototype.getMousePosition = function getMousePosition(e) {
    if ("touches" in e) {
      return e.touches[0][this.clientAxis];
    }
    return e[this.clientAxis];
  };
  Gutter.prototype.startDragging = function startDragging(e) {
    if ("button" in e && e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (this.element) {
      this.grid = this.element.parentNode;
    } else {
      this.grid = e.target.parentNode;
    }
    this.getDimensions();
    this.setTracks(this.getRawTracks());
    this.setComputedTracks(this.getRawComputedTracks());
    this.setGap(this.getGap());
    this.setComputedGap(this.getRawComputedGap());
    var trackPercentage = this.trackValues.filter(
      function(track3) {
        return track3.type === "%";
      }
    );
    var trackFr = this.trackValues.filter(function(track3) {
      return track3.type === "fr";
    });
    this.totalFrs = trackFr.length;
    if (this.totalFrs) {
      var track2 = firstNonZero(trackFr);
      if (track2 !== null) {
        this.frToPixels = this.computedPixels[track2].numeric / trackFr[track2].numeric;
      }
    }
    if (trackPercentage.length) {
      var track$1 = firstNonZero(trackPercentage);
      if (track$1 !== null) {
        this.percentageToPixels = this.computedPixels[track$1].numeric / trackPercentage[track$1].numeric;
      }
    }
    var gutterStart = this.getSizeAtTrack(this.track, false) + this.start;
    this.dragStartOffset = this.getMousePosition(e) - gutterStart;
    this.aTrack = this.track - 1;
    if (this.track < this.tracks.length - 1) {
      this.bTrack = this.track + 1;
    } else {
      throw Error(
        "Invalid track index: " + this.track + ". Track must be between two other tracks and only " + this.tracks.length + " tracks were found."
      );
    }
    this.aTrackStart = this.getSizeAtTrack(this.aTrack, false) + this.start;
    this.bTrackEnd = this.getSizeAtTrack(this.bTrack, true) + this.start;
    this.dragging = true;
    window.addEventListener("mouseup", this.stopDragging);
    window.addEventListener("touchend", this.stopDragging);
    window.addEventListener("touchcancel", this.stopDragging);
    window.addEventListener("mousemove", this.drag);
    window.addEventListener("touchmove", this.drag);
    this.grid.addEventListener("selectstart", NOOP);
    this.grid.addEventListener("dragstart", NOOP);
    this.grid.style.userSelect = "none";
    this.grid.style.webkitUserSelect = "none";
    this.grid.style.MozUserSelect = "none";
    this.grid.style.pointerEvents = "none";
    this.grid.style.cursor = this.cursor;
    window.document.body.style.cursor = this.cursor;
    this.onDragStart(this.direction, this.track);
  };
  Gutter.prototype.stopDragging = function stopDragging() {
    this.dragging = false;
    this.cleanup();
    this.onDragEnd(this.direction, this.track);
    if (this.needsDestroy) {
      if (this.element) {
        this.element.removeEventListener(
          "mousedown",
          this.startDragging
        );
        this.element.removeEventListener(
          "touchstart",
          this.startDragging
        );
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
    if (mousePosition < minMousePositionOffset) {
      mousePosition = minMousePosition;
    }
    if (mousePosition > maxMousePositionOffset) {
      mousePosition = maxMousePosition;
    }
    if (mousePosition < minMousePosition) {
      mousePosition = minMousePosition;
    } else if (mousePosition > maxMousePosition) {
      mousePosition = maxMousePosition;
    }
    var aTrackSize = mousePosition - this.aTrackStart - this.dragStartOffset - this.computedGapPixels;
    var bTrackSize = this.bTrackEnd - mousePosition + this.dragStartOffset - gutterSize - this.computedGapPixels;
    if (this.dragInterval > 1) {
      var aTrackSizeIntervaled = Math.round(aTrackSize / this.dragInterval) * this.dragInterval;
      bTrackSize -= aTrackSizeIntervaled - aTrackSize;
      aTrackSize = aTrackSizeIntervaled;
    }
    if (aTrackSize < this.minSizeStart) {
      aTrackSize = this.minSizeStart;
    }
    if (bTrackSize < this.minSizeEnd) {
      bTrackSize = this.minSizeEnd;
    }
    if (this.trackValues[this.aTrack].type === "px") {
      this.tracks[this.aTrack] = aTrackSize + "px";
    } else if (this.trackValues[this.aTrack].type === "fr") {
      if (this.totalFrs === 1) {
        this.tracks[this.aTrack] = "1fr";
      } else {
        var targetFr = aTrackSize / this.frToPixels;
        this.tracks[this.aTrack] = targetFr + "fr";
      }
    } else if (this.trackValues[this.aTrack].type === "%") {
      var targetPercentage = aTrackSize / this.percentageToPixels;
      this.tracks[this.aTrack] = targetPercentage + "%";
    }
    if (this.trackValues[this.bTrack].type === "px") {
      this.tracks[this.bTrack] = bTrackSize + "px";
    } else if (this.trackValues[this.bTrack].type === "fr") {
      if (this.totalFrs === 1) {
        this.tracks[this.bTrack] = "1fr";
      } else {
        var targetFr$1 = bTrackSize / this.frToPixels;
        this.tracks[this.bTrack] = targetFr$1 + "fr";
      }
    } else if (this.trackValues[this.bTrack].type === "%") {
      var targetPercentage$1 = bTrackSize / this.percentageToPixels;
      this.tracks[this.bTrack] = targetPercentage$1 + "%";
    }
    var style = this.tracks.join(" ");
    this.writeStyle(this.grid, this.gridTemplateProp, style);
    this.onDrag(this.direction, this.track, style);
  };
  Gutter.prototype.cleanup = function cleanup2() {
    window.removeEventListener("mouseup", this.stopDragging);
    window.removeEventListener("touchend", this.stopDragging);
    window.removeEventListener("touchcancel", this.stopDragging);
    window.removeEventListener("mousemove", this.drag);
    window.removeEventListener("touchmove", this.drag);
    if (this.grid) {
      this.grid.removeEventListener("selectstart", NOOP);
      this.grid.removeEventListener("dragstart", NOOP);
      this.grid.style.userSelect = "";
      this.grid.style.webkitUserSelect = "";
      this.grid.style.MozUserSelect = "";
      this.grid.style.pointerEvents = "";
      this.grid.style.cursor = "";
    }
    window.document.body.style.cursor = "";
  };
  Gutter.prototype.destroy = function destroy(immediate, cb) {
    if (immediate === void 0) immediate = true;
    if (immediate || this.dragging === false) {
      this.cleanup();
      if (this.element) {
        this.element.removeEventListener(
          "mousedown",
          this.startDragging
        );
        this.element.removeEventListener(
          "touchstart",
          this.startDragging
        );
      }
      if (cb) {
        cb();
      }
    } else {
      this.needsDestroy = true;
      if (cb) {
        this.destroyCb = cb;
      }
    }
  };
  var getTrackOption = function(options, track2, defaultValue) {
    if (track2 in options) {
      return options[track2];
    }
    return defaultValue;
  };
  var createGutter = function(direction, options) {
    return function(gutterOptions) {
      if (gutterOptions.track < 1) {
        throw Error(
          "Invalid track index: " + gutterOptions.track + ". Track must be between two other tracks."
        );
      }
      var trackMinSizes = direction === "column" ? options.columnMinSizes || {} : options.rowMinSizes || {};
      var trackMinSize = direction === "column" ? "columnMinSize" : "rowMinSize";
      return new Gutter(
        direction,
        Object.assign(
          {},
          {
            minSizeStart: getTrackOption(
              trackMinSizes,
              gutterOptions.track - 1,
              getOption(
                options,
                trackMinSize,
                getOption(options, "minSize", 0)
              )
            ),
            minSizeEnd: getTrackOption(
              trackMinSizes,
              gutterOptions.track + 1,
              getOption(
                options,
                trackMinSize,
                getOption(options, "minSize", 0)
              )
            )
          },
          gutterOptions
        ),
        options
      );
    };
  };
  var Grid = function Grid2(options) {
    var this$1 = this;
    this.columnGutters = {};
    this.rowGutters = {};
    this.options = Object.assign(
      {},
      {
        columnGutters: options.columnGutters || [],
        rowGutters: options.rowGutters || [],
        columnMinSizes: options.columnMinSizes || {},
        rowMinSizes: options.rowMinSizes || {}
      },
      options
    );
    this.options.columnGutters.forEach(function(gutterOptions) {
      this$1.columnGutters[gutterOptions.track] = createGutter(
        "column",
        this$1.options
      )(gutterOptions);
    });
    this.options.rowGutters.forEach(function(gutterOptions) {
      this$1.rowGutters[gutterOptions.track] = createGutter(
        "row",
        this$1.options
      )(gutterOptions);
    });
  };
  Grid.prototype.addColumnGutter = function addColumnGutter(element, track2) {
    if (this.columnGutters[track2]) {
      this.columnGutters[track2].destroy();
    }
    this.columnGutters[track2] = createGutter(
      "column",
      this.options
    )({
      element,
      track: track2
    });
  };
  Grid.prototype.addRowGutter = function addRowGutter(element, track2) {
    if (this.rowGutters[track2]) {
      this.rowGutters[track2].destroy();
    }
    this.rowGutters[track2] = createGutter(
      "row",
      this.options
    )({
      element,
      track: track2
    });
  };
  Grid.prototype.removeColumnGutter = function removeColumnGutter(track2, immediate) {
    var this$1 = this;
    if (immediate === void 0) immediate = true;
    if (this.columnGutters[track2]) {
      this.columnGutters[track2].destroy(immediate, function() {
        delete this$1.columnGutters[track2];
      });
    }
  };
  Grid.prototype.removeRowGutter = function removeRowGutter(track2, immediate) {
    var this$1 = this;
    if (immediate === void 0) immediate = true;
    if (this.rowGutters[track2]) {
      this.rowGutters[track2].destroy(immediate, function() {
        delete this$1.rowGutters[track2];
      });
    }
  };
  Grid.prototype.handleDragStart = function handleDragStart(e, direction, track2) {
    if (direction === "column") {
      if (this.columnGutters[track2]) {
        this.columnGutters[track2].destroy();
      }
      this.columnGutters[track2] = createGutter(
        "column",
        this.options
      )({
        track: track2
      });
      this.columnGutters[track2].startDragging(e);
    } else if (direction === "row") {
      if (this.rowGutters[track2]) {
        this.rowGutters[track2].destroy();
      }
      this.rowGutters[track2] = createGutter(
        "row",
        this.options
      )({
        track: track2
      });
      this.rowGutters[track2].startDragging(e);
    }
  };
  Grid.prototype.destroy = function destroy2(immediate) {
    var this$1 = this;
    if (immediate === void 0) immediate = true;
    Object.keys(this.columnGutters).forEach(
      function(track2) {
        return this$1.columnGutters[track2].destroy(immediate, function() {
          delete this$1.columnGutters[track2];
        });
      }
    );
    Object.keys(this.rowGutters).forEach(
      function(track2) {
        return this$1.rowGutters[track2].destroy(immediate, function() {
          delete this$1.rowGutters[track2];
        });
      }
    );
  };
  function index(options) {
    return new Grid(options);
  }
  var split_grid_default = index;

  // assets/js/components/split_layout.js
  function splitLayout(id2, opts = {}) {
    return {
      forceOrientation: false,
      orientation: this.$persist(opts.orientation || "horizontal").as(
        `${id2}-split-orientation`
      ),
      verticalSizes: this.$persist(
        opts.verticalSizes || opts.sizes || ["50%", "50%"]
      ).as(`${id2}-split-vertical-sizes`),
      horizontalSizes: this.$persist(
        opts.horizontalSizes || opts.sizes || ["50%", "50%"]
      ).as(`${id2}-split-horizontal-sizes`),
      minHorizontalSizes: opts.minHorizontalSizes || opts.minSizes || [],
      minVerticalSizes: opts.minVerticalSizes || opts.minSizes || [],
      layoutWidth: null,
      layoutHeight: null,
      splitter: null,
      gutters: [],
      initSplit() {
        if (this.gutters.length) {
          this.$debug(`Split layout initialized (#${id2})`);
          this.destroySplitter();
          const dir = this.horizontal ? "row" : "column";
          this.splitter = split_grid_default({
            [`${dir}Gutters`]: gutterSplits(this.gutters),
            [`${dir}MinSizes`]: sizeSplits(this.minSizes),
            snapOffset: 0,
            dragInterval: 1,
            writeStyle() {
            },
            onDrag: (dir2, gutterTrack, style) => {
              const splits = style.split(" ").map((value2, i) => i % 2 == 0 ? value2 : null).filter((v) => v);
              this.setSplits(splits);
            }
          });
        }
      },
      registerGutter(el) {
        this.gutters.push(el);
      },
      setSplits(splits) {
        if (this.horizontal) {
          this.horizontalSizes = splits;
        } else {
          this.verticalSizes = splits;
        }
      },
      switchOrientation() {
        this.orientation = this.vertical ? "horizontal" : "vertical";
      },
      destroySplitter() {
        if (this.splitter) this.splitter.destroy();
      },
      get minSizes() {
        if (this.horizontal) {
          return this.minHorizontalSizes;
        } else {
          return this.minVerticalSizes;
        }
      },
      get splits() {
        return this.horizontal ? this.horizontalSizes : this.verticalSizes;
      },
      get vertical() {
        if (this.forceOrientation) {
          return this.forceOrientation === "vertical";
        }
        return this.orientation === "vertical";
      },
      get horizontal() {
        if (this.forceOrientation) {
          return this.forceOrientation === "horizontal";
        }
        return this.orientation === "horizontal";
      },
      root: {
        [":style"]() {
          return {
            "grid-template-columns": this.vertical && sizeStr(this.splits),
            "grid-template-rows": this.horizontal && sizeStr(this.splits)
          };
        },
        ["x-bind:data-orientation"]() {
          return this.forceOrientation || this.orientation;
        },
        ["x-effect"]() {
          this.initSplit();
        }
      }
    };
  }
  function sizeStr(sizes) {
    const values = [];
    sizes.forEach((size2) => values.push(size2, "1px"));
    return values.slice(0, -1).join(" ");
  }
  function gutterSplits(gutters) {
    return gutters.map((element, i) => {
      return {
        track: i * 2 + 1,
        element
      };
    });
  }
  function sizeSplits(sizes) {
    const splits = {};
    sizes.forEach((value2, i) => {
      if (value2 !== null) splits[i * 2] = value2;
    });
    return splits;
  }

  // assets/js/components/viewport.js
  function viewport(id2, opts = { minWidth: 200, minHeight: 200 }) {
    return {
      minWidth: opts.minWidth,
      minHeight: opts.minHeight,
      width: "100%",
      height: "100%",
      lastWidth: "100%",
      lastHeight: "100%",
      iframeDimensions: {},
      resizing: false,
      init() {
        this.$debug(`Viewport initialized (#${id2})`);
        this.onResizeWidth = this.onResizeWidth.bind(this);
        this.onResizeWidthEnd = this.onResizeWidthEnd.bind(this);
        this.onResizeHeight = this.onResizeHeight.bind(this);
        this.onResizeHeightEnd = this.onResizeHeightEnd.bind(this);
      },
      start() {
        this.resizing = true;
      },
      stop() {
        this.resizing = false;
      },
      onResizeStart(e) {
        this.onResizeWidthStart(e);
        this.onResizeHeightStart(e);
      },
      toggleFullSize() {
        if (this.height === "100%" && this.width === "100%") {
          this.toggleFullHeight();
          this.toggleFullWidth();
        } else {
          if (this.height !== "100%") this.toggleFullHeight();
          if (this.width !== "100%") this.toggleFullWidth();
        }
      },
      onResizeWidth(e) {
        const width = this.resizeStartWidth - (this.resizeStartPositionX - e.pageX) * 2;
        const boundedWidth = Math.min(
          Math.max(Math.round(width), this.minWidth),
          this.parentWidth
        );
        this.width = boundedWidth === this.parentWidth ? "100%" : boundedWidth;
        this.$dispatch("viewport:resize-progress");
      },
      onResizeWidthStart(e) {
        this.start();
        this.resizeStartPositionX = e.pageX;
        this.resizeStartWidth = this.$refs.wrapper.clientWidth;
        addEventListener("pointermove", this.onResizeWidth);
        addEventListener("pointerup", this.onResizeWidthEnd);
      },
      onResizeWidthEnd() {
        removeEventListener("pointermove", this.onResizeWidth);
        removeEventListener("pointerup", this.onResizeWidthEnd);
        this.stop();
      },
      toggleFullWidth() {
        if (this.width === "100%") {
          this.width = this.lastWidth;
        } else {
          this.lastWidth = this.width;
          this.width = "100%";
        }
      },
      onResizeHeight(e) {
        const height = this.resizeStartHeight - (this.resizeStartPositionY - e.pageY);
        const boundedHeight = Math.min(
          Math.max(Math.round(height), this.minHeight),
          this.parentHeight
        );
        this.height = boundedHeight === this.parentHeight ? "100%" : boundedHeight;
        this.$dispatch("viewport:resize-progress");
      },
      onResizeHeightStart(e) {
        this.start();
        this.resizeStartPositionY = e.pageY;
        this.resizeStartHeight = this.$refs.wrapper.clientHeight;
        addEventListener("pointermove", this.onResizeHeight);
        addEventListener("pointerup", this.onResizeHeightEnd);
      },
      onResizeHeightEnd() {
        removeEventListener("pointermove", this.onResizeHeight);
        removeEventListener("pointerup", this.onResizeHeightEnd);
        this.stop();
      },
      toggleFullHeight() {
        if (this.height === "100%") {
          this.height = this.lastHeight;
        } else {
          this.lastHeight = this.height;
          this.height = "100%";
        }
      },
      reload() {
        this.$refs.iframe.contentlocation.reload();
      },
      get displayWidth() {
        return `${this.iframeDimensions.width}px`;
      },
      get displayHeight() {
        return `${this.iframeDimensions.height}px`;
      },
      get maxWidth() {
        return this.width === "100%" ? "100%" : `${this.width}px`;
      },
      get maxHeight() {
        return this.height === "100%" ? "100%" : `${this.height}px`;
      },
      get parentWidth() {
        return Math.round(this.$root.clientWidth);
      },
      get parentHeight() {
        return Math.round(this.$root.clientHeight);
      },
      get inert() {
        return this.resizing || this.reflowing;
      },
      get iframe() {
        return this.$refs.iframe;
      },
      destroy() {
        if (this.iframe.iFrameResizer) {
          this.iFrameResizer.disconnect();
        }
      }
    };
  }

  // assets/js/alpine.js
  module_default.plugin(module_default2);
  module_default.plugin(module_default3);
  module_default.plugin(module_default4);
  module_default.plugin(module_default5);
  module_default.plugin(
    module_default6.configure({
      mergeStrategy: "morph"
    })
  );
  module_default.magic("addOrRemove", () => (item, array2) => {
    const index2 = array2.indexOf(item);
    index2 === -1 ? array2.push(item) : array2.splice(index2, 1);
  });
  var logger = new Logger();
  module_default.magic("logger", () => logger);
  module_default.magic("debug", () => logger.debug.bind(logger));
  module_default.magic("info", () => logger.info.bind(logger));
  module_default.magic("warn", () => logger.warn.bind(logger));
  module_default.magic("error", () => logger.error.bind(logger));
  module_default.data("codeBlock", codeEditor);
  module_default.data("splitLayout", splitLayout);
  module_default.data("viewport", viewport);
  window.Alpine = module_default;
  var alpine_default2 = module_default;

  // assets/js/sse-listener.js
  var ServerEventsListener = class {
    constructor(endpoint) {
      this.endpoint = endpoint;
      this.source = null;
      this.broadcastChannel = this.initBroadCastChannel();
      this.handlers = [];
      this.logger = new Logger("EventsListener");
      addEventListener("visibilitychange", () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });
    }
    start() {
      if (!this.source) {
        this.logger.debug(`Starting`);
        this.source = this.initSource();
        this.broadcastStart();
      }
    }
    stop() {
      if (this.source) {
        this.source.close();
        this.source = null;
        this.logger.debug(`Stopped`);
      }
    }
    on(type5, callback) {
      this.handlers.push({ type: type5, callback });
    }
    initSource() {
      const source = new EventSource(this.endpoint);
      source.addEventListener("open", () => {
        this.logger.debug(`Connected to '${this.endpoint}'`);
      });
      source.addEventListener("message", (event) => {
        const data2 = JSON.parse(event.data);
        this.broadcastChannel.postMessage(JSON.stringify(data2));
        this.handlers.forEach((handler4) => {
          if (data2.type === handler4.type) {
            handler4.callback.call(null, data2);
          }
        });
      });
      source.addEventListener("error", () => {
        this.logger.warn(`Event source error`);
        this.stop();
      });
      window.onbeforeunload = () => this.stop();
      return source;
    }
    initBroadCastChannel() {
      const bc = new BroadcastChannel("lookbook_events");
      bc.addEventListener("message", (event) => {
        const data2 = JSON.parse(event.data);
        this.handlers.forEach((handler4) => {
          if (data2.type === handler4.type) {
            handler4.callback.call(null, data2);
          }
        });
      });
      return bc;
    }
    broadcastStart() {
      this.broadcastChannel.postMessage(
        JSON.stringify({ type: "event-source-start" })
      );
    }
  };

  // assets/scripts.js
  var listener = new ServerEventsListener("/lookbook/events");
  listener.on("update", (detail) => {
    const event = new CustomEvent("fetch-update", { detail });
    window.dispatchEvent(event);
  });
  listener.start();
  alpine_default2.start();
})();
