var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_ui_001 = __commonJS({
  "lookbook-assets/ui-CPRH8x6Z.js"(exports, module) {
    (function polyfill() {
      const relList = document.createElement("link").relList;
      if (relList && relList.supports && relList.supports("modulepreload")) return;
      for (const link2 of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link2);
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "childList") continue;
          for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
        }
      }).observe(document, {
        childList: true,
        subtree: true
      });
      function getFetchOpts(link2) {
        const fetchOpts = {};
        if (link2.integrity) fetchOpts.integrity = link2.integrity;
        if (link2.referrerPolicy) fetchOpts.referrerPolicy = link2.referrerPolicy;
        if (link2.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
        else if (link2.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
        else fetchOpts.credentials = "same-origin";
        return fetchOpts;
      }
      function processPreload(link2) {
        if (link2.ep) return;
        link2.ep = true;
        const fetchOpts = getFetchOpts(link2);
        fetch(link2.href, fetchOpts);
      }
    })();
    const PUBLIC_VERSION = "5";
    if (typeof window !== "undefined") {
      ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(PUBLIC_VERSION);
    }
    const EACH_ITEM_REACTIVE = 1;
    const EACH_INDEX_REACTIVE = 1 << 1;
    const EACH_IS_CONTROLLED = 1 << 2;
    const EACH_IS_ANIMATED = 1 << 3;
    const EACH_ITEM_IMMUTABLE = 1 << 4;
    const PROPS_IS_IMMUTABLE = 1;
    const PROPS_IS_RUNES = 1 << 1;
    const PROPS_IS_UPDATED = 1 << 2;
    const PROPS_IS_BINDABLE = 1 << 3;
    const PROPS_IS_LAZY_INITIAL = 1 << 4;
    const TEMPLATE_FRAGMENT = 1;
    const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
    const UNINITIALIZED = /* @__PURE__ */ Symbol();
    const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
    const NAMESPACE_SVG = "http://www.w3.org/2000/svg";
    const NAMESPACE_MATHML = "http://www.w3.org/1998/Math/MathML";
    const ATTACHMENT_KEY = "@attach";
    const DEV = false;
    var is_array = Array.isArray;
    var index_of = Array.prototype.indexOf;
    var includes = Array.prototype.includes;
    var array_from = Array.from;
    var define_property = Object.defineProperty;
    var get_descriptor = Object.getOwnPropertyDescriptor;
    var get_descriptors = Object.getOwnPropertyDescriptors;
    var object_prototype = Object.prototype;
    var array_prototype = Array.prototype;
    var get_prototype_of = Object.getPrototypeOf;
    var is_extensible = Object.isExtensible;
    function is_function(thing) {
      return typeof thing === "function";
    }
    const noop$2 = () => {
    };
    function run(fn) {
      return fn();
    }
    function run_all(arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i]();
      }
    }
    function deferred() {
      var resolve;
      var reject;
      var promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    }
    function to_array(value, n) {
      if (Array.isArray(value)) {
        return value;
      }
      if (!(Symbol.iterator in value)) {
        return Array.from(value);
      }
      const array = [];
      for (const element2 of value) {
        array.push(element2);
        if (array.length === n) break;
      }
      return array;
    }
    const DERIVED = 1 << 1;
    const EFFECT = 1 << 2;
    const RENDER_EFFECT = 1 << 3;
    const MANAGED_EFFECT = 1 << 24;
    const BLOCK_EFFECT = 1 << 4;
    const BRANCH_EFFECT = 1 << 5;
    const ROOT_EFFECT = 1 << 6;
    const BOUNDARY_EFFECT = 1 << 7;
    const CONNECTED = 1 << 9;
    const CLEAN = 1 << 10;
    const DIRTY = 1 << 11;
    const MAYBE_DIRTY = 1 << 12;
    const INERT = 1 << 13;
    const DESTROYED = 1 << 14;
    const REACTION_RAN = 1 << 15;
    const EFFECT_TRANSPARENT = 1 << 16;
    const EAGER_EFFECT = 1 << 17;
    const HEAD_EFFECT = 1 << 18;
    const EFFECT_PRESERVED = 1 << 19;
    const USER_EFFECT = 1 << 20;
    const EFFECT_OFFSCREEN = 1 << 25;
    const WAS_MARKED = 1 << 16;
    const REACTION_IS_UPDATING = 1 << 21;
    const ASYNC = 1 << 22;
    const ERROR_VALUE = 1 << 23;
    const STATE_SYMBOL = /* @__PURE__ */ Symbol("$state");
    const LEGACY_PROPS = /* @__PURE__ */ Symbol("legacy props");
    const LOADING_ATTR_SYMBOL = /* @__PURE__ */ Symbol("");
    const STALE_REACTION = new class StaleReactionError extends Error {
      name = "StaleReactionError";
      message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
    }();
    const IS_XHTML = (
      // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
      !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
    );
    function lifecycle_outside_component(name) {
      {
        throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
      }
    }
    function async_derived_orphan() {
      {
        throw new Error(`https://svelte.dev/e/async_derived_orphan`);
      }
    }
    function each_key_duplicate(a, b, value) {
      {
        throw new Error(`https://svelte.dev/e/each_key_duplicate`);
      }
    }
    function effect_in_teardown(rune) {
      {
        throw new Error(`https://svelte.dev/e/effect_in_teardown`);
      }
    }
    function effect_in_unowned_derived() {
      {
        throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
      }
    }
    function effect_orphan(rune) {
      {
        throw new Error(`https://svelte.dev/e/effect_orphan`);
      }
    }
    function effect_update_depth_exceeded() {
      {
        throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
      }
    }
    function props_invalid_value(key2) {
      {
        throw new Error(`https://svelte.dev/e/props_invalid_value`);
      }
    }
    function state_descriptors_fixed() {
      {
        throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
      }
    }
    function state_prototype_fixed() {
      {
        throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
      }
    }
    function state_unsafe_mutation() {
      {
        throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
      }
    }
    function svelte_boundary_reset_onerror() {
      {
        throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
      }
    }
    function select_multiple_invalid_value() {
      {
        console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
      }
    }
    function svelte_boundary_reset_noop() {
      {
        console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
      }
    }
    function equals(value) {
      return value === this.v;
    }
    function safe_not_equal(a, b) {
      return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
    }
    function safe_equals(value) {
      return !safe_not_equal(value, this.v);
    }
    let legacy_mode_flag = false;
    let tracing_mode_flag = false;
    function enable_legacy_mode_flag() {
      legacy_mode_flag = true;
    }
    let component_context = null;
    function set_component_context(context) {
      component_context = context;
    }
    function getContext(key2) {
      const context_map = get_or_init_context_map();
      const result = (
        /** @type {T} */
        context_map.get(key2)
      );
      return result;
    }
    function setContext(key2, context) {
      const context_map = get_or_init_context_map();
      context_map.set(key2, context);
      return context;
    }
    function hasContext(key2) {
      const context_map = get_or_init_context_map();
      return context_map.has(key2);
    }
    function getAllContexts() {
      const context_map = get_or_init_context_map();
      return (
        /** @type {T} */
        context_map
      );
    }
    function push(props, runes = false, fn) {
      component_context = {
        p: component_context,
        i: false,
        c: null,
        e: null,
        s: props,
        x: null,
        l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
      };
    }
    function pop(component2) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      var effects = context.e;
      if (effects !== null) {
        context.e = null;
        for (var fn of effects) {
          create_user_effect(fn);
        }
      }
      context.i = true;
      component_context = context.p;
      return (
        /** @type {T} */
        {}
      );
    }
    function is_runes() {
      return !legacy_mode_flag || component_context !== null && component_context.l === null;
    }
    function get_or_init_context_map(name) {
      if (component_context === null) {
        lifecycle_outside_component();
      }
      return component_context.c ??= new Map(get_parent_context(component_context) || void 0);
    }
    function get_parent_context(component_context2) {
      let parent = component_context2.p;
      while (parent !== null) {
        const context_map = parent.c;
        if (context_map !== null) {
          return context_map;
        }
        parent = parent.p;
      }
      return null;
    }
    let micro_tasks = [];
    function run_micro_tasks() {
      var tasks = micro_tasks;
      micro_tasks = [];
      run_all(tasks);
    }
    function queue_micro_task(fn) {
      if (micro_tasks.length === 0 && !is_flushing_sync) {
        var tasks = micro_tasks;
        queueMicrotask(() => {
          if (tasks === micro_tasks) run_micro_tasks();
        });
      }
      micro_tasks.push(fn);
    }
    function flush_tasks() {
      while (micro_tasks.length > 0) {
        run_micro_tasks();
      }
    }
    function handle_error(error) {
      var effect2 = active_effect;
      if (effect2 === null) {
        active_reaction.f |= ERROR_VALUE;
        return error;
      }
      if ((effect2.f & REACTION_RAN) === 0 && (effect2.f & EFFECT) === 0) {
        throw error;
      }
      invoke_error_boundary(error, effect2);
    }
    function invoke_error_boundary(error, effect2) {
      while (effect2 !== null) {
        if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
          if ((effect2.f & REACTION_RAN) === 0) {
            throw error;
          }
          try {
            effect2.b.error(error);
            return;
          } catch (e) {
            error = e;
          }
        }
        effect2 = effect2.parent;
      }
      throw error;
    }
    const STATUS_MASK = -7169;
    function set_signal_status(signal, status2) {
      signal.f = signal.f & STATUS_MASK | status2;
    }
    function update_derived_status(derived2) {
      if ((derived2.f & CONNECTED) !== 0 || derived2.deps === null) {
        set_signal_status(derived2, CLEAN);
      } else {
        set_signal_status(derived2, MAYBE_DIRTY);
      }
    }
    function clear_marked(deps) {
      if (deps === null) return;
      for (const dep of deps) {
        if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
          continue;
        }
        dep.f ^= WAS_MARKED;
        clear_marked(
          /** @type {Derived} */
          dep.deps
        );
      }
    }
    function defer_effect(effect2, dirty_effects, maybe_dirty_effects) {
      if ((effect2.f & DIRTY) !== 0) {
        dirty_effects.add(effect2);
      } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
        maybe_dirty_effects.add(effect2);
      }
      clear_marked(effect2.deps);
      set_signal_status(effect2, CLEAN);
    }
    const batches = /* @__PURE__ */ new Set();
    let current_batch = null;
    let batch_values = null;
    let queued_root_effects = [];
    let last_scheduled_effect = null;
    let is_flushing_sync = false;
    let collected_effects = null;
    class Batch {
      /**
       * The current values of any sources that are updated in this batch
       * They keys of this map are identical to `this.#previous`
       * @type {Map<Source, any>}
       */
      current = /* @__PURE__ */ new Map();
      /**
       * The values of any sources that are updated in this batch _before_ those updates took place.
       * They keys of this map are identical to `this.#current`
       * @type {Map<Source, any>}
       */
      previous = /* @__PURE__ */ new Map();
      /**
       * When the batch is committed (and the DOM is updated), we need to remove old branches
       * and append new ones by calling the functions added inside (if/each/key/etc) blocks
       * @type {Set<(batch: Batch) => void>}
       */
      #commit_callbacks = /* @__PURE__ */ new Set();
      /**
       * If a fork is discarded, we need to destroy any effects that are no longer needed
       * @type {Set<(batch: Batch) => void>}
       */
      #discard_callbacks = /* @__PURE__ */ new Set();
      /**
       * The number of async effects that are currently in flight
       */
      #pending = 0;
      /**
       * The number of async effects that are currently in flight, _not_ inside a pending boundary
       */
      #blocking_pending = 0;
      /**
       * A deferred that resolves when the batch is committed, used with `settled()`
       * TODO replace with Promise.withResolvers once supported widely enough
       * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
       */
      #deferred = null;
      /**
       * Deferred effects (which run after async work has completed) that are DIRTY
       * @type {Set<Effect>}
       */
      #dirty_effects = /* @__PURE__ */ new Set();
      /**
       * Deferred effects that are MAYBE_DIRTY
       * @type {Set<Effect>}
       */
      #maybe_dirty_effects = /* @__PURE__ */ new Set();
      /**
       * A map of branches that still exist, but will be destroyed when this batch
       * is committed — we skip over these during `process`.
       * The value contains child effects that were dirty/maybe_dirty before being reset,
       * so they can be rescheduled if the branch survives.
       * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
       */
      #skipped_branches = /* @__PURE__ */ new Map();
      is_fork = false;
      #decrement_queued = false;
      #is_deferred() {
        return this.is_fork || this.#blocking_pending > 0;
      }
      /**
       * Add an effect to the #skipped_branches map and reset its children
       * @param {Effect} effect
       */
      skip_effect(effect2) {
        if (!this.#skipped_branches.has(effect2)) {
          this.#skipped_branches.set(effect2, { d: [], m: [] });
        }
      }
      /**
       * Remove an effect from the #skipped_branches map and reschedule
       * any tracked dirty/maybe_dirty child effects
       * @param {Effect} effect
       */
      unskip_effect(effect2) {
        var tracked = this.#skipped_branches.get(effect2);
        if (tracked) {
          this.#skipped_branches.delete(effect2);
          for (var e of tracked.d) {
            set_signal_status(e, DIRTY);
            schedule_effect(e);
          }
          for (e of tracked.m) {
            set_signal_status(e, MAYBE_DIRTY);
            schedule_effect(e);
          }
        }
      }
      /**
       *
       * @param {Effect[]} root_effects
       */
      process(root_effects) {
        queued_root_effects = [];
        this.apply();
        var effects = collected_effects = [];
        var render_effects = [];
        for (const root2 of root_effects) {
          this.#traverse_effect_tree(root2, effects, render_effects);
        }
        collected_effects = null;
        if (this.#is_deferred()) {
          this.#defer_effects(render_effects);
          this.#defer_effects(effects);
          for (const [e, t] of this.#skipped_branches) {
            reset_branch(e, t);
          }
        } else {
          current_batch = null;
          for (const fn of this.#commit_callbacks) fn(this);
          this.#commit_callbacks.clear();
          if (this.#pending === 0) {
            this.#commit();
          }
          flush_queued_effects(render_effects);
          flush_queued_effects(effects);
          this.#dirty_effects.clear();
          this.#maybe_dirty_effects.clear();
          this.#deferred?.resolve();
        }
        batch_values = null;
      }
      /**
       * Traverse the effect tree, executing effects or stashing
       * them for later execution as appropriate
       * @param {Effect} root
       * @param {Effect[]} effects
       * @param {Effect[]} render_effects
       */
      #traverse_effect_tree(root2, effects, render_effects) {
        root2.f ^= CLEAN;
        var effect2 = root2.first;
        while (effect2 !== null) {
          var flags2 = effect2.f;
          var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
          var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
          var skip = is_skippable_branch || (flags2 & INERT) !== 0 || this.#skipped_branches.has(effect2);
          if (!skip && effect2.fn !== null) {
            if (is_branch) {
              effect2.f ^= CLEAN;
            } else if ((flags2 & EFFECT) !== 0) {
              effects.push(effect2);
            } else if (is_dirty(effect2)) {
              if ((flags2 & BLOCK_EFFECT) !== 0) this.#maybe_dirty_effects.add(effect2);
              update_effect(effect2);
            }
            var child2 = effect2.first;
            if (child2 !== null) {
              effect2 = child2;
              continue;
            }
          }
          while (effect2 !== null) {
            var next2 = effect2.next;
            if (next2 !== null) {
              effect2 = next2;
              break;
            }
            effect2 = effect2.parent;
          }
        }
      }
      /**
       * @param {Effect[]} effects
       */
      #defer_effects(effects) {
        for (var i = 0; i < effects.length; i += 1) {
          defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
        }
      }
      /**
       * Associate a change to a given source with the current
       * batch, noting its previous and current values
       * @param {Source} source
       * @param {any} value
       */
      capture(source2, value) {
        if (value !== UNINITIALIZED && !this.previous.has(source2)) {
          this.previous.set(source2, value);
        }
        if ((source2.f & ERROR_VALUE) === 0) {
          this.current.set(source2, source2.v);
          batch_values?.set(source2, source2.v);
        }
      }
      activate() {
        current_batch = this;
        this.apply();
      }
      deactivate() {
        if (current_batch !== this) return;
        current_batch = null;
        batch_values = null;
      }
      flush() {
        if (queued_root_effects.length > 0) {
          current_batch = this;
          flush_effects();
        } else if (this.#pending === 0 && !this.is_fork) {
          for (const fn of this.#commit_callbacks) fn(this);
          this.#commit_callbacks.clear();
          this.#commit();
          this.#deferred?.resolve();
        }
        this.deactivate();
      }
      discard() {
        for (const fn of this.#discard_callbacks) fn(this);
        this.#discard_callbacks.clear();
      }
      #commit() {
        if (batches.size > 1) {
          this.previous.clear();
          var previous_batch = current_batch;
          var previous_batch_values = batch_values;
          var is_earlier = true;
          for (const batch of batches) {
            if (batch === this) {
              is_earlier = false;
              continue;
            }
            const sources = [];
            for (const [source2, value] of this.current) {
              if (batch.current.has(source2)) {
                if (is_earlier && value !== batch.current.get(source2)) {
                  batch.current.set(source2, value);
                } else {
                  continue;
                }
              }
              sources.push(source2);
            }
            if (sources.length === 0) {
              continue;
            }
            const others = [...batch.current.keys()].filter((s) => !this.current.has(s));
            if (others.length > 0) {
              var prev_queued_root_effects = queued_root_effects;
              queued_root_effects = [];
              const marked = /* @__PURE__ */ new Set();
              const checked = /* @__PURE__ */ new Map();
              for (const source2 of sources) {
                mark_effects(source2, others, marked, checked);
              }
              if (queued_root_effects.length > 0) {
                current_batch = batch;
                batch.apply();
                for (const root2 of queued_root_effects) {
                  batch.#traverse_effect_tree(root2, [], []);
                }
                batch.deactivate();
              }
              queued_root_effects = prev_queued_root_effects;
            }
          }
          current_batch = previous_batch;
          batch_values = previous_batch_values;
        }
        this.#skipped_branches.clear();
        batches.delete(this);
      }
      /**
       *
       * @param {boolean} blocking
       */
      increment(blocking) {
        this.#pending += 1;
        if (blocking) this.#blocking_pending += 1;
      }
      /**
       *
       * @param {boolean} blocking
       */
      decrement(blocking) {
        this.#pending -= 1;
        if (blocking) this.#blocking_pending -= 1;
        if (this.#decrement_queued) return;
        this.#decrement_queued = true;
        queue_micro_task(() => {
          this.#decrement_queued = false;
          if (!this.#is_deferred()) {
            this.revive();
          } else if (queued_root_effects.length > 0) {
            this.flush();
          }
        });
      }
      revive() {
        for (const e of this.#dirty_effects) {
          this.#maybe_dirty_effects.delete(e);
          set_signal_status(e, DIRTY);
          schedule_effect(e);
        }
        for (const e of this.#maybe_dirty_effects) {
          set_signal_status(e, MAYBE_DIRTY);
          schedule_effect(e);
        }
        this.flush();
      }
      /** @param {(batch: Batch) => void} fn */
      oncommit(fn) {
        this.#commit_callbacks.add(fn);
      }
      /** @param {(batch: Batch) => void} fn */
      ondiscard(fn) {
        this.#discard_callbacks.add(fn);
      }
      settled() {
        return (this.#deferred ??= deferred()).promise;
      }
      static ensure() {
        if (current_batch === null) {
          const batch = current_batch = new Batch();
          batches.add(current_batch);
          if (!is_flushing_sync) {
            queue_micro_task(() => {
              if (current_batch !== batch) {
                return;
              }
              batch.flush();
            });
          }
        }
        return current_batch;
      }
      apply() {
        return;
      }
    }
    function flushSync(fn) {
      var was_flushing_sync = is_flushing_sync;
      is_flushing_sync = true;
      try {
        var result;
        if (fn) {
          if (current_batch !== null) {
            flush_effects();
          }
          result = fn();
        }
        while (true) {
          flush_tasks();
          if (queued_root_effects.length === 0) {
            current_batch?.flush();
            if (queued_root_effects.length === 0) {
              last_scheduled_effect = null;
              return (
                /** @type {T} */
                result
              );
            }
          }
          flush_effects();
        }
      } finally {
        is_flushing_sync = was_flushing_sync;
      }
    }
    function flush_effects() {
      var source_stacks = null;
      try {
        var flush_count = 0;
        while (queued_root_effects.length > 0) {
          var batch = Batch.ensure();
          if (flush_count++ > 1e3) {
            var updates, entry;
            if (DEV) ;
            infinite_loop_guard();
          }
          batch.process(queued_root_effects);
          old_values.clear();
          if (DEV) ;
        }
      } finally {
        queued_root_effects = [];
        last_scheduled_effect = null;
        collected_effects = null;
      }
    }
    function infinite_loop_guard() {
      try {
        effect_update_depth_exceeded();
      } catch (error) {
        invoke_error_boundary(error, last_scheduled_effect);
      }
    }
    let eager_block_effects = null;
    function flush_queued_effects(effects) {
      var length = effects.length;
      if (length === 0) return;
      var i = 0;
      while (i < length) {
        var effect2 = effects[i++];
        if ((effect2.f & (DESTROYED | INERT)) === 0 && is_dirty(effect2)) {
          eager_block_effects = /* @__PURE__ */ new Set();
          update_effect(effect2);
          if (effect2.deps === null && effect2.first === null && effect2.nodes === null && effect2.teardown === null && effect2.ac === null) {
            unlink_effect(effect2);
          }
          if (eager_block_effects?.size > 0) {
            old_values.clear();
            for (const e of eager_block_effects) {
              if ((e.f & (DESTROYED | INERT)) !== 0) continue;
              const ordered_effects = [e];
              let ancestor = e.parent;
              while (ancestor !== null) {
                if (eager_block_effects.has(ancestor)) {
                  eager_block_effects.delete(ancestor);
                  ordered_effects.push(ancestor);
                }
                ancestor = ancestor.parent;
              }
              for (let j = ordered_effects.length - 1; j >= 0; j--) {
                const e2 = ordered_effects[j];
                if ((e2.f & (DESTROYED | INERT)) !== 0) continue;
                update_effect(e2);
              }
            }
            eager_block_effects.clear();
          }
        }
      }
      eager_block_effects = null;
    }
    function mark_effects(value, sources, marked, checked) {
      if (marked.has(value)) return;
      marked.add(value);
      if (value.reactions !== null) {
        for (const reaction of value.reactions) {
          const flags2 = reaction.f;
          if ((flags2 & DERIVED) !== 0) {
            mark_effects(
              /** @type {Derived} */
              reaction,
              sources,
              marked,
              checked
            );
          } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && depends_on(reaction, sources, checked)) {
            set_signal_status(reaction, DIRTY);
            schedule_effect(
              /** @type {Effect} */
              reaction
            );
          }
        }
      }
    }
    function depends_on(reaction, sources, checked) {
      const depends = checked.get(reaction);
      if (depends !== void 0) return depends;
      if (reaction.deps !== null) {
        for (const dep of reaction.deps) {
          if (includes.call(sources, dep)) {
            return true;
          }
          if ((dep.f & DERIVED) !== 0 && depends_on(
            /** @type {Derived} */
            dep,
            sources,
            checked
          )) {
            checked.set(
              /** @type {Derived} */
              dep,
              true
            );
            return true;
          }
        }
      }
      checked.set(reaction, false);
      return false;
    }
    function schedule_effect(signal) {
      var effect2 = last_scheduled_effect = signal;
      var boundary2 = effect2.b;
      if (boundary2?.is_pending && (signal.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 && (signal.f & REACTION_RAN) === 0) {
        boundary2.defer_effect(signal);
        return;
      }
      while (effect2.parent !== null) {
        effect2 = effect2.parent;
        var flags2 = effect2.f;
        if (collected_effects !== null && effect2 === active_effect) {
          if ((signal.f & RENDER_EFFECT) === 0) {
            return;
          }
        }
        if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
          if ((flags2 & CLEAN) === 0) {
            return;
          }
          effect2.f ^= CLEAN;
        }
      }
      queued_root_effects.push(effect2);
    }
    function reset_branch(effect2, tracked) {
      if ((effect2.f & BRANCH_EFFECT) !== 0 && (effect2.f & CLEAN) !== 0) {
        return;
      }
      if ((effect2.f & DIRTY) !== 0) {
        tracked.d.push(effect2);
      } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
        tracked.m.push(effect2);
      }
      set_signal_status(effect2, CLEAN);
      var e = effect2.first;
      while (e !== null) {
        reset_branch(e, tracked);
        e = e.next;
      }
    }
    function createSubscriber(start2) {
      let subscribers = 0;
      let version = source(0);
      let stop;
      return () => {
        if (effect_tracking()) {
          get$3(version);
          render_effect(() => {
            if (subscribers === 0) {
              stop = untrack(() => start2(() => increment(version)));
            }
            subscribers += 1;
            return () => {
              queue_micro_task(() => {
                subscribers -= 1;
                if (subscribers === 0) {
                  stop?.();
                  stop = void 0;
                  increment(version);
                }
              });
            };
          });
        }
      };
    }
    var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
    function boundary(node, props, children, transform_error) {
      new Boundary(node, props, children, transform_error);
    }
    class Boundary {
      /** @type {Boundary | null} */
      parent;
      is_pending = false;
      /**
       * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
       * Inherited from parent boundary, or defaults to identity.
       * @type {(error: unknown) => unknown}
       */
      transform_error;
      /** @type {TemplateNode} */
      #anchor;
      /** @type {TemplateNode | null} */
      #hydrate_open = null;
      /** @type {BoundaryProps} */
      #props;
      /** @type {((anchor: Node) => void)} */
      #children;
      /** @type {Effect} */
      #effect;
      /** @type {Effect | null} */
      #main_effect = null;
      /** @type {Effect | null} */
      #pending_effect = null;
      /** @type {Effect | null} */
      #failed_effect = null;
      /** @type {DocumentFragment | null} */
      #offscreen_fragment = null;
      #local_pending_count = 0;
      #pending_count = 0;
      #pending_count_update_queued = false;
      /** @type {Set<Effect>} */
      #dirty_effects = /* @__PURE__ */ new Set();
      /** @type {Set<Effect>} */
      #maybe_dirty_effects = /* @__PURE__ */ new Set();
      /**
       * A source containing the number of pending async deriveds/expressions.
       * Only created if `$effect.pending()` is used inside the boundary,
       * otherwise updating the source results in needless `Batch.ensure()`
       * calls followed by no-op flushes
       * @type {Source<number> | null}
       */
      #effect_pending = null;
      #effect_pending_subscriber = createSubscriber(() => {
        this.#effect_pending = source(this.#local_pending_count);
        return () => {
          this.#effect_pending = null;
        };
      });
      /**
       * @param {TemplateNode} node
       * @param {BoundaryProps} props
       * @param {((anchor: Node) => void)} children
       * @param {((error: unknown) => unknown) | undefined} [transform_error]
       */
      constructor(node, props, children, transform_error) {
        this.#anchor = node;
        this.#props = props;
        this.#children = (anchor) => {
          var effect2 = (
            /** @type {Effect} */
            active_effect
          );
          effect2.b = this;
          effect2.f |= BOUNDARY_EFFECT;
          children(anchor);
        };
        this.parent = /** @type {Effect} */
        active_effect.b;
        this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
        this.#effect = block(() => {
          {
            this.#render();
          }
        }, flags);
      }
      #hydrate_resolved_content() {
        try {
          this.#main_effect = branch(() => this.#children(this.#anchor));
        } catch (error) {
          this.error(error);
        }
      }
      /**
       * @param {unknown} error The deserialized error from the server's hydration comment
       */
      #hydrate_failed_content(error) {
        const failed = this.#props.failed;
        if (!failed) return;
        this.#failed_effect = branch(() => {
          failed(
            this.#anchor,
            () => error,
            () => () => {
            }
          );
        });
      }
      #hydrate_pending_content() {
        const pending = this.#props.pending;
        if (!pending) return;
        this.is_pending = true;
        this.#pending_effect = branch(() => pending(this.#anchor));
        queue_micro_task(() => {
          var fragment = this.#offscreen_fragment = document.createDocumentFragment();
          var anchor = create_text();
          fragment.append(anchor);
          this.#main_effect = this.#run(() => {
            Batch.ensure();
            return branch(() => this.#children(anchor));
          });
          if (this.#pending_count === 0) {
            this.#anchor.before(fragment);
            this.#offscreen_fragment = null;
            pause_effect(
              /** @type {Effect} */
              this.#pending_effect,
              () => {
                this.#pending_effect = null;
              }
            );
            this.#resolve();
          }
        });
      }
      #render() {
        try {
          this.is_pending = this.has_pending_snippet();
          this.#pending_count = 0;
          this.#local_pending_count = 0;
          this.#main_effect = branch(() => {
            this.#children(this.#anchor);
          });
          if (this.#pending_count > 0) {
            var fragment = this.#offscreen_fragment = document.createDocumentFragment();
            move_effect(this.#main_effect, fragment);
            const pending = (
              /** @type {(anchor: Node) => void} */
              this.#props.pending
            );
            this.#pending_effect = branch(() => pending(this.#anchor));
          } else {
            this.#resolve();
          }
        } catch (error) {
          this.error(error);
        }
      }
      #resolve() {
        this.is_pending = false;
        for (const e of this.#dirty_effects) {
          set_signal_status(e, DIRTY);
          schedule_effect(e);
        }
        for (const e of this.#maybe_dirty_effects) {
          set_signal_status(e, MAYBE_DIRTY);
          schedule_effect(e);
        }
        this.#dirty_effects.clear();
        this.#maybe_dirty_effects.clear();
      }
      /**
       * Defer an effect inside a pending boundary until the boundary resolves
       * @param {Effect} effect
       */
      defer_effect(effect2) {
        defer_effect(effect2, this.#dirty_effects, this.#maybe_dirty_effects);
      }
      /**
       * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
       * @returns {boolean}
       */
      is_rendered() {
        return !this.is_pending && (!this.parent || this.parent.is_rendered());
      }
      has_pending_snippet() {
        return !!this.#props.pending;
      }
      /**
       * @template T
       * @param {() => T} fn
       */
      #run(fn) {
        var previous_effect = active_effect;
        var previous_reaction = active_reaction;
        var previous_ctx = component_context;
        set_active_effect(this.#effect);
        set_active_reaction(this.#effect);
        set_component_context(this.#effect.ctx);
        try {
          return fn();
        } catch (e) {
          handle_error(e);
          return null;
        } finally {
          set_active_effect(previous_effect);
          set_active_reaction(previous_reaction);
          set_component_context(previous_ctx);
        }
      }
      /**
       * Updates the pending count associated with the currently visible pending snippet,
       * if any, such that we can replace the snippet with content once work is done
       * @param {1 | -1} d
       */
      #update_pending_count(d) {
        if (!this.has_pending_snippet()) {
          if (this.parent) {
            this.parent.#update_pending_count(d);
          }
          return;
        }
        this.#pending_count += d;
        if (this.#pending_count === 0) {
          this.#resolve();
          if (this.#pending_effect) {
            pause_effect(this.#pending_effect, () => {
              this.#pending_effect = null;
            });
          }
          if (this.#offscreen_fragment) {
            this.#anchor.before(this.#offscreen_fragment);
            this.#offscreen_fragment = null;
          }
        }
      }
      /**
       * Update the source that powers `$effect.pending()` inside this boundary,
       * and controls when the current `pending` snippet (if any) is removed.
       * Do not call from inside the class
       * @param {1 | -1} d
       */
      update_pending_count(d) {
        this.#update_pending_count(d);
        this.#local_pending_count += d;
        if (!this.#effect_pending || this.#pending_count_update_queued) return;
        this.#pending_count_update_queued = true;
        queue_micro_task(() => {
          this.#pending_count_update_queued = false;
          if (this.#effect_pending) {
            internal_set(this.#effect_pending, this.#local_pending_count);
          }
        });
      }
      get_effect_pending() {
        this.#effect_pending_subscriber();
        return get$3(
          /** @type {Source<number>} */
          this.#effect_pending
        );
      }
      /** @param {unknown} error */
      error(error) {
        var onerror = this.#props.onerror;
        let failed = this.#props.failed;
        if (!onerror && !failed) {
          throw error;
        }
        if (this.#main_effect) {
          destroy_effect(this.#main_effect);
          this.#main_effect = null;
        }
        if (this.#pending_effect) {
          destroy_effect(this.#pending_effect);
          this.#pending_effect = null;
        }
        if (this.#failed_effect) {
          destroy_effect(this.#failed_effect);
          this.#failed_effect = null;
        }
        var did_reset = false;
        var calling_on_error = false;
        const reset = () => {
          if (did_reset) {
            svelte_boundary_reset_noop();
            return;
          }
          did_reset = true;
          if (calling_on_error) {
            svelte_boundary_reset_onerror();
          }
          if (this.#failed_effect !== null) {
            pause_effect(this.#failed_effect, () => {
              this.#failed_effect = null;
            });
          }
          this.#run(() => {
            Batch.ensure();
            this.#render();
          });
        };
        const handle_error_result = (transformed_error) => {
          try {
            calling_on_error = true;
            onerror?.(transformed_error, reset);
            calling_on_error = false;
          } catch (error2) {
            invoke_error_boundary(error2, this.#effect && this.#effect.parent);
          }
          if (failed) {
            this.#failed_effect = this.#run(() => {
              Batch.ensure();
              try {
                return branch(() => {
                  var effect2 = (
                    /** @type {Effect} */
                    active_effect
                  );
                  effect2.b = this;
                  effect2.f |= BOUNDARY_EFFECT;
                  failed(
                    this.#anchor,
                    () => transformed_error,
                    () => reset
                  );
                });
              } catch (error2) {
                invoke_error_boundary(
                  error2,
                  /** @type {Effect} */
                  this.#effect.parent
                );
                return null;
              }
            });
          }
        };
        queue_micro_task(() => {
          var result;
          try {
            result = this.transform_error(error);
          } catch (e) {
            invoke_error_boundary(e, this.#effect && this.#effect.parent);
            return;
          }
          if (result !== null && typeof result === "object" && typeof /** @type {any} */
          result.then === "function") {
            result.then(
              handle_error_result,
              /** @param {unknown} e */
              (e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
            );
          } else {
            handle_error_result(result);
          }
        });
      }
    }
    function flatten$1(blockers, sync, async, fn) {
      const d = is_runes() ? derived : derived_safe_equal;
      var pending = blockers.filter((b) => !b.settled);
      if (async.length === 0 && pending.length === 0) {
        fn(sync.map(d));
        return;
      }
      var parent = (
        /** @type {Effect} */
        active_effect
      );
      var restore = capture();
      var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
      function finish2(values) {
        restore();
        try {
          fn(values);
        } catch (error) {
          if ((parent.f & DESTROYED) === 0) {
            invoke_error_boundary(error, parent);
          }
        }
        unset_context();
      }
      if (async.length === 0) {
        blocker_promise.then(() => finish2(sync.map(d)));
        return;
      }
      function run2() {
        restore();
        Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then((result) => finish2([...sync.map(d), ...result])).catch((error) => invoke_error_boundary(error, parent));
      }
      if (blocker_promise) {
        blocker_promise.then(run2);
      } else {
        run2();
      }
    }
    function capture() {
      var previous_effect = active_effect;
      var previous_reaction = active_reaction;
      var previous_component_context = component_context;
      var previous_batch = current_batch;
      return function restore(activate_batch = true) {
        set_active_effect(previous_effect);
        set_active_reaction(previous_reaction);
        set_component_context(previous_component_context);
        if (activate_batch) previous_batch?.activate();
      };
    }
    function unset_context(deactivate_batch = true) {
      set_active_effect(null);
      set_active_reaction(null);
      set_component_context(null);
      if (deactivate_batch) current_batch?.deactivate();
    }
    function increment_pending() {
      var boundary2 = (
        /** @type {Boundary} */
        /** @type {Effect} */
        active_effect.b
      );
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      var blocking = boundary2.is_rendered();
      boundary2.update_pending_count(1);
      batch.increment(blocking);
      return () => {
        boundary2.update_pending_count(-1);
        batch.decrement(blocking);
      };
    }
    // @__NO_SIDE_EFFECTS__
    function derived(fn) {
      var flags2 = DERIVED | DIRTY;
      var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
        /** @type {Derived} */
        active_reaction
      ) : null;
      if (active_effect !== null) {
        active_effect.f |= EFFECT_PRESERVED;
      }
      const signal = {
        ctx: component_context,
        deps: null,
        effects: null,
        equals,
        f: flags2,
        fn,
        reactions: null,
        rv: 0,
        v: (
          /** @type {V} */
          UNINITIALIZED
        ),
        wv: 0,
        parent: parent_derived ?? active_effect,
        ac: null
      };
      return signal;
    }
    // @__NO_SIDE_EFFECTS__
    function async_derived(fn, label, location) {
      let parent = (
        /** @type {Effect | null} */
        active_effect
      );
      if (parent === null) {
        async_derived_orphan();
      }
      var promise = (
        /** @type {Promise<V>} */
        /** @type {unknown} */
        void 0
      );
      var signal = source(
        /** @type {V} */
        UNINITIALIZED
      );
      var should_suspend = !active_reaction;
      var deferreds = /* @__PURE__ */ new Map();
      async_effect(() => {
        var d = deferred();
        promise = d.promise;
        try {
          Promise.resolve(fn()).then(d.resolve, d.reject).finally(unset_context);
        } catch (error) {
          d.reject(error);
          unset_context();
        }
        var batch = (
          /** @type {Batch} */
          current_batch
        );
        if (should_suspend) {
          var decrement_pending = increment_pending();
          deferreds.get(batch)?.reject(STALE_REACTION);
          deferreds.delete(batch);
          deferreds.set(batch, d);
        }
        const handler = (value, error = void 0) => {
          batch.activate();
          if (error) {
            if (error !== STALE_REACTION) {
              signal.f |= ERROR_VALUE;
              internal_set(signal, error);
            }
          } else {
            if ((signal.f & ERROR_VALUE) !== 0) {
              signal.f ^= ERROR_VALUE;
            }
            internal_set(signal, value);
            for (const [b, d2] of deferreds) {
              deferreds.delete(b);
              if (b === batch) break;
              d2.reject(STALE_REACTION);
            }
          }
          if (decrement_pending) {
            decrement_pending();
          }
        };
        d.promise.then(handler, (e) => handler(null, e || "unknown"));
      });
      teardown(() => {
        for (const d of deferreds.values()) {
          d.reject(STALE_REACTION);
        }
      });
      return new Promise((fulfil) => {
        function next2(p) {
          function go() {
            if (p === promise) {
              fulfil(signal);
            } else {
              next2(promise);
            }
          }
          p.then(go, go);
        }
        next2(promise);
      });
    }
    // @__NO_SIDE_EFFECTS__
    function user_derived(fn) {
      const d = /* @__PURE__ */ derived(fn);
      push_reaction_value(d);
      return d;
    }
    // @__NO_SIDE_EFFECTS__
    function derived_safe_equal(fn) {
      const signal = /* @__PURE__ */ derived(fn);
      signal.equals = safe_equals;
      return signal;
    }
    function destroy_derived_effects(derived2) {
      var effects = derived2.effects;
      if (effects !== null) {
        derived2.effects = null;
        for (var i = 0; i < effects.length; i += 1) {
          destroy_effect(
            /** @type {Effect} */
            effects[i]
          );
        }
      }
    }
    function get_derived_parent_effect(derived2) {
      var parent = derived2.parent;
      while (parent !== null) {
        if ((parent.f & DERIVED) === 0) {
          return (parent.f & DESTROYED) === 0 ? (
            /** @type {Effect} */
            parent
          ) : null;
        }
        parent = parent.parent;
      }
      return null;
    }
    function execute_derived(derived2) {
      var value;
      var prev_active_effect = active_effect;
      set_active_effect(get_derived_parent_effect(derived2));
      {
        try {
          derived2.f &= ~WAS_MARKED;
          destroy_derived_effects(derived2);
          value = update_reaction(derived2);
        } finally {
          set_active_effect(prev_active_effect);
        }
      }
      return value;
    }
    function update_derived(derived2) {
      var value = execute_derived(derived2);
      if (!derived2.equals(value)) {
        derived2.wv = increment_write_version();
        if (!current_batch?.is_fork || derived2.deps === null) {
          derived2.v = value;
          if (derived2.deps === null) {
            set_signal_status(derived2, CLEAN);
            return;
          }
        }
      }
      if (is_destroying_effect) {
        return;
      }
      if (batch_values !== null) {
        if (effect_tracking() || current_batch?.is_fork) {
          batch_values.set(derived2, value);
        }
      } else {
        update_derived_status(derived2);
      }
    }
    function freeze_derived_effects(derived2) {
      if (derived2.effects === null) return;
      for (const e of derived2.effects) {
        if (e.teardown || e.ac) {
          e.teardown?.();
          e.ac?.abort(STALE_REACTION);
          e.teardown = noop$2;
          e.ac = null;
          remove_reactions(e, 0);
          destroy_effect_children(e);
        }
      }
    }
    function unfreeze_derived_effects(derived2) {
      if (derived2.effects === null) return;
      for (const e of derived2.effects) {
        if (e.teardown) {
          update_effect(e);
        }
      }
    }
    let eager_effects = /* @__PURE__ */ new Set();
    const old_values = /* @__PURE__ */ new Map();
    let eager_effects_deferred = false;
    function source(v, stack) {
      var signal = {
        f: 0,
        // TODO ideally we could skip this altogether, but it causes type errors
        v,
        reactions: null,
        equals,
        rv: 0,
        wv: 0
      };
      return signal;
    }
    // @__NO_SIDE_EFFECTS__
    function state$1(v, stack) {
      const s = source(v);
      push_reaction_value(s);
      return s;
    }
    // @__NO_SIDE_EFFECTS__
    function mutable_source(initial_value, immutable = false, trackable = true) {
      const s = source(initial_value);
      if (!immutable) {
        s.equals = safe_equals;
      }
      if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
        (component_context.l.s ??= []).push(s);
      }
      return s;
    }
    function set$2(source2, value, should_proxy = false) {
      if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
      // to ensure we error if state is set inside an inspect effect
      (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && (current_sources === null || !includes.call(current_sources, source2))) {
        state_unsafe_mutation();
      }
      let new_value = should_proxy ? proxy$1(value) : value;
      return internal_set(source2, new_value);
    }
    function internal_set(source2, value) {
      if (!source2.equals(value)) {
        var old_value = source2.v;
        if (is_destroying_effect) {
          old_values.set(source2, value);
        } else {
          old_values.set(source2, old_value);
        }
        source2.v = value;
        var batch = Batch.ensure();
        batch.capture(source2, old_value);
        if ((source2.f & DERIVED) !== 0) {
          const derived2 = (
            /** @type {Derived} */
            source2
          );
          if ((source2.f & DIRTY) !== 0) {
            execute_derived(derived2);
          }
          update_derived_status(derived2);
        }
        source2.wv = increment_write_version();
        mark_reactions(source2, DIRTY);
        if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
          if (untracked_writes === null) {
            set_untracked_writes([source2]);
          } else {
            untracked_writes.push(source2);
          }
        }
        if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
          flush_eager_effects();
        }
      }
      return value;
    }
    function flush_eager_effects() {
      eager_effects_deferred = false;
      for (const effect2 of eager_effects) {
        if ((effect2.f & CLEAN) !== 0) {
          set_signal_status(effect2, MAYBE_DIRTY);
        }
        if (is_dirty(effect2)) {
          update_effect(effect2);
        }
      }
      eager_effects.clear();
    }
    function update(source2, d = 1) {
      var value = get$3(source2);
      var result = d === 1 ? value++ : value--;
      set$2(source2, value);
      return result;
    }
    function increment(source2) {
      set$2(source2, source2.v + 1);
    }
    function mark_reactions(signal, status2) {
      var reactions = signal.reactions;
      if (reactions === null) return;
      var runes = is_runes();
      var length = reactions.length;
      for (var i = 0; i < length; i++) {
        var reaction = reactions[i];
        var flags2 = reaction.f;
        if (!runes && reaction === active_effect) continue;
        var not_dirty = (flags2 & DIRTY) === 0;
        if (not_dirty) {
          set_signal_status(reaction, status2);
        }
        if ((flags2 & DERIVED) !== 0) {
          var derived2 = (
            /** @type {Derived} */
            reaction
          );
          batch_values?.delete(derived2);
          if ((flags2 & WAS_MARKED) === 0) {
            if (flags2 & CONNECTED) {
              reaction.f |= WAS_MARKED;
            }
            mark_reactions(derived2, MAYBE_DIRTY);
          }
        } else if (not_dirty) {
          if ((flags2 & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
            eager_block_effects.add(
              /** @type {Effect} */
              reaction
            );
          }
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
    function proxy$1(value) {
      if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
        return value;
      }
      const prototype2 = get_prototype_of(value);
      if (prototype2 !== object_prototype && prototype2 !== array_prototype) {
        return value;
      }
      var sources = /* @__PURE__ */ new Map();
      var is_proxied_array = is_array(value);
      var version = /* @__PURE__ */ state$1(0);
      var parent_version = update_version;
      var with_parent = (fn) => {
        if (update_version === parent_version) {
          return fn();
        }
        var reaction = active_reaction;
        var version2 = update_version;
        set_active_reaction(null);
        set_update_version(parent_version);
        var result = fn();
        set_active_reaction(reaction);
        set_update_version(version2);
        return result;
      };
      if (is_proxied_array) {
        sources.set("length", /* @__PURE__ */ state$1(
          /** @type {any[]} */
          value.length
        ));
      }
      return new Proxy(
        /** @type {any} */
        value,
        {
          defineProperty(_, prop2, descriptor) {
            if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
              state_descriptors_fixed();
            }
            var s = sources.get(prop2);
            if (s === void 0) {
              with_parent(() => {
                var s2 = /* @__PURE__ */ state$1(descriptor.value);
                sources.set(prop2, s2);
                return s2;
              });
            } else {
              set$2(s, descriptor.value, true);
            }
            return true;
          },
          deleteProperty(target, prop2) {
            var s = sources.get(prop2);
            if (s === void 0) {
              if (prop2 in target) {
                const s2 = with_parent(() => /* @__PURE__ */ state$1(UNINITIALIZED));
                sources.set(prop2, s2);
                increment(version);
              }
            } else {
              set$2(s, UNINITIALIZED);
              increment(version);
            }
            return true;
          },
          get(target, prop2, receiver) {
            if (prop2 === STATE_SYMBOL) {
              return value;
            }
            var s = sources.get(prop2);
            var exists = prop2 in target;
            if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
              s = with_parent(() => {
                var p = proxy$1(exists ? target[prop2] : UNINITIALIZED);
                var s2 = /* @__PURE__ */ state$1(p);
                return s2;
              });
              sources.set(prop2, s);
            }
            if (s !== void 0) {
              var v = get$3(s);
              return v === UNINITIALIZED ? void 0 : v;
            }
            return Reflect.get(target, prop2, receiver);
          },
          getOwnPropertyDescriptor(target, prop2) {
            var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
            if (descriptor && "value" in descriptor) {
              var s = sources.get(prop2);
              if (s) descriptor.value = get$3(s);
            } else if (descriptor === void 0) {
              var source2 = sources.get(prop2);
              var value2 = source2?.v;
              if (source2 !== void 0 && value2 !== UNINITIALIZED) {
                return {
                  enumerable: true,
                  configurable: true,
                  value: value2,
                  writable: true
                };
              }
            }
            return descriptor;
          },
          has(target, prop2) {
            if (prop2 === STATE_SYMBOL) {
              return true;
            }
            var s = sources.get(prop2);
            var has2 = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
            if (s !== void 0 || active_effect !== null && (!has2 || get_descriptor(target, prop2)?.writable)) {
              if (s === void 0) {
                s = with_parent(() => {
                  var p = has2 ? proxy$1(target[prop2]) : UNINITIALIZED;
                  var s2 = /* @__PURE__ */ state$1(p);
                  return s2;
                });
                sources.set(prop2, s);
              }
              var value2 = get$3(s);
              if (value2 === UNINITIALIZED) {
                return false;
              }
            }
            return has2;
          },
          set(target, prop2, value2, receiver) {
            var s = sources.get(prop2);
            var has2 = prop2 in target;
            if (is_proxied_array && prop2 === "length") {
              for (var i = value2; i < /** @type {Source<number>} */
              s.v; i += 1) {
                var other_s = sources.get(i + "");
                if (other_s !== void 0) {
                  set$2(other_s, UNINITIALIZED);
                } else if (i in target) {
                  other_s = with_parent(() => /* @__PURE__ */ state$1(UNINITIALIZED));
                  sources.set(i + "", other_s);
                }
              }
            }
            if (s === void 0) {
              if (!has2 || get_descriptor(target, prop2)?.writable) {
                s = with_parent(() => /* @__PURE__ */ state$1(void 0));
                set$2(s, proxy$1(value2));
                sources.set(prop2, s);
              }
            } else {
              has2 = s.v !== UNINITIALIZED;
              var p = with_parent(() => proxy$1(value2));
              set$2(s, p);
            }
            var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
            if (descriptor?.set) {
              descriptor.set.call(receiver, value2);
            }
            if (!has2) {
              if (is_proxied_array && typeof prop2 === "string") {
                var ls = (
                  /** @type {Source<number>} */
                  sources.get("length")
                );
                var n = Number(prop2);
                if (Number.isInteger(n) && n >= ls.v) {
                  set$2(ls, n + 1);
                }
              }
              increment(version);
            }
            return true;
          },
          ownKeys(target) {
            get$3(version);
            var own_keys = Reflect.ownKeys(target).filter((key3) => {
              var source3 = sources.get(key3);
              return source3 === void 0 || source3.v !== UNINITIALIZED;
            });
            for (var [key2, source2] of sources) {
              if (source2.v !== UNINITIALIZED && !(key2 in target)) {
                own_keys.push(key2);
              }
            }
            return own_keys;
          },
          setPrototypeOf() {
            state_prototype_fixed();
          }
        }
      );
    }
    function get_proxied_value(value) {
      try {
        if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
          return value[STATE_SYMBOL];
        }
      } catch {
      }
      return value;
    }
    function is(a, b) {
      return Object.is(get_proxied_value(a), get_proxied_value(b));
    }
    var $window;
    var is_firefox;
    var first_child_getter;
    var next_sibling_getter;
    function init_operations() {
      if ($window !== void 0) {
        return;
      }
      $window = window;
      is_firefox = /Firefox/.test(navigator.userAgent);
      var element_prototype = Element.prototype;
      var node_prototype = Node.prototype;
      var text_prototype = Text.prototype;
      first_child_getter = get_descriptor(node_prototype, "firstChild").get;
      next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
      if (is_extensible(element_prototype)) {
        element_prototype.__click = void 0;
        element_prototype.__className = void 0;
        element_prototype.__attributes = null;
        element_prototype.__style = void 0;
        element_prototype.__e = void 0;
      }
      if (is_extensible(text_prototype)) {
        text_prototype.__t = void 0;
      }
    }
    function create_text(value = "") {
      return document.createTextNode(value);
    }
    // @__NO_SIDE_EFFECTS__
    function get_first_child(node) {
      return (
        /** @type {TemplateNode | null} */
        first_child_getter.call(node)
      );
    }
    // @__NO_SIDE_EFFECTS__
    function get_next_sibling(node) {
      return (
        /** @type {TemplateNode | null} */
        next_sibling_getter.call(node)
      );
    }
    function child(node, is_text) {
      {
        return /* @__PURE__ */ get_first_child(node);
      }
    }
    function first_child(node, is_text = false) {
      {
        var first2 = /* @__PURE__ */ get_first_child(node);
        if (first2 instanceof Comment && first2.data === "") return /* @__PURE__ */ get_next_sibling(first2);
        return first2;
      }
    }
    function sibling(node, count = 1, is_text = false) {
      let next_sibling = node;
      while (count--) {
        next_sibling = /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(next_sibling);
      }
      {
        return next_sibling;
      }
    }
    function clear_text_content(node) {
      node.textContent = "";
    }
    function should_defer_append() {
      return false;
    }
    function create_element(tag, namespace, is2) {
      let options = void 0;
      return (
        /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
        document.createElementNS(namespace ?? NAMESPACE_HTML, tag, options)
      );
    }
    function autofocus(dom, value) {
      if (value) {
        const body = document.body;
        dom.autofocus = true;
        queue_micro_task(() => {
          if (document.activeElement === body) {
            dom.focus();
          }
        });
      }
    }
    function without_reactive_context(fn) {
      var previous_reaction = active_reaction;
      var previous_effect = active_effect;
      set_active_reaction(null);
      set_active_effect(null);
      try {
        return fn();
      } finally {
        set_active_reaction(previous_reaction);
        set_active_effect(previous_effect);
      }
    }
    function validate_effect(rune) {
      if (active_effect === null) {
        if (active_reaction === null) {
          effect_orphan();
        }
        effect_in_unowned_derived();
      }
      if (is_destroying_effect) {
        effect_in_teardown();
      }
    }
    function push_effect(effect2, parent_effect) {
      var parent_last = parent_effect.last;
      if (parent_last === null) {
        parent_effect.last = parent_effect.first = effect2;
      } else {
        parent_last.next = effect2;
        effect2.prev = parent_last;
        parent_effect.last = effect2;
      }
    }
    function create_effect(type2, fn) {
      var parent = active_effect;
      if (parent !== null && (parent.f & INERT) !== 0) {
        type2 |= INERT;
      }
      var effect2 = {
        ctx: component_context,
        deps: null,
        nodes: null,
        f: type2 | DIRTY | CONNECTED,
        first: null,
        fn,
        last: null,
        next: null,
        parent,
        b: parent && parent.b,
        prev: null,
        teardown: null,
        wv: 0,
        ac: null
      };
      var e = effect2;
      if ((type2 & EFFECT) !== 0) {
        if (collected_effects !== null) {
          collected_effects.push(effect2);
        } else {
          schedule_effect(effect2);
        }
      } else if (fn !== null) {
        try {
          update_effect(effect2);
        } catch (e2) {
          destroy_effect(effect2);
          throw e2;
        }
        if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && // either `null`, or a singular child
        (e.f & EFFECT_PRESERVED) === 0) {
          e = e.first;
          if ((type2 & BLOCK_EFFECT) !== 0 && (type2 & EFFECT_TRANSPARENT) !== 0 && e !== null) {
            e.f |= EFFECT_TRANSPARENT;
          }
        }
      }
      if (e !== null) {
        e.parent = parent;
        if (parent !== null) {
          push_effect(e, parent);
        }
        if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type2 & ROOT_EFFECT) === 0) {
          var derived2 = (
            /** @type {Derived} */
            active_reaction
          );
          (derived2.effects ??= []).push(e);
        }
      }
      return effect2;
    }
    function effect_tracking() {
      return active_reaction !== null && !untracking;
    }
    function teardown(fn) {
      const effect2 = create_effect(RENDER_EFFECT, null);
      set_signal_status(effect2, CLEAN);
      effect2.teardown = fn;
      return effect2;
    }
    function user_effect(fn) {
      validate_effect();
      var flags2 = (
        /** @type {Effect} */
        active_effect.f
      );
      var defer = !active_reaction && (flags2 & BRANCH_EFFECT) !== 0 && (flags2 & REACTION_RAN) === 0;
      if (defer) {
        var context = (
          /** @type {ComponentContext} */
          component_context
        );
        (context.e ??= []).push(fn);
      } else {
        return create_user_effect(fn);
      }
    }
    function create_user_effect(fn) {
      return create_effect(EFFECT | USER_EFFECT, fn);
    }
    function user_pre_effect(fn) {
      validate_effect();
      return create_effect(RENDER_EFFECT | USER_EFFECT, fn);
    }
    function component_root(fn) {
      Batch.ensure();
      const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);
      return (options = {}) => {
        return new Promise((fulfil) => {
          if (options.outro) {
            pause_effect(effect2, () => {
              destroy_effect(effect2);
              fulfil(void 0);
            });
          } else {
            destroy_effect(effect2);
            fulfil(void 0);
          }
        });
      };
    }
    function effect(fn) {
      return create_effect(EFFECT, fn);
    }
    function legacy_pre_effect(deps, fn) {
      var context = (
        /** @type {ComponentContextLegacy} */
        component_context
      );
      var token = { effect: null, ran: false, deps };
      context.l.$.push(token);
      token.effect = render_effect(() => {
        deps();
        if (token.ran) return;
        token.ran = true;
        untrack(fn);
      });
    }
    function legacy_pre_effect_reset() {
      var context = (
        /** @type {ComponentContextLegacy} */
        component_context
      );
      render_effect(() => {
        for (var token of context.l.$) {
          token.deps();
          var effect2 = token.effect;
          if ((effect2.f & CLEAN) !== 0 && effect2.deps !== null) {
            set_signal_status(effect2, MAYBE_DIRTY);
          }
          if (is_dirty(effect2)) {
            update_effect(effect2);
          }
          token.ran = false;
        }
      });
    }
    function async_effect(fn) {
      return create_effect(ASYNC | EFFECT_PRESERVED, fn);
    }
    function render_effect(fn, flags2 = 0) {
      return create_effect(RENDER_EFFECT | flags2, fn);
    }
    function template_effect(fn, sync = [], async = [], blockers = []) {
      flatten$1(blockers, sync, async, (values) => {
        create_effect(RENDER_EFFECT, () => fn(...values.map(get$3)));
      });
    }
    function block(fn, flags2 = 0) {
      var effect2 = create_effect(BLOCK_EFFECT | flags2, fn);
      return effect2;
    }
    function managed(fn, flags2 = 0) {
      var effect2 = create_effect(MANAGED_EFFECT | flags2, fn);
      return effect2;
    }
    function branch(fn) {
      return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn);
    }
    function execute_effect_teardown(effect2) {
      var teardown2 = effect2.teardown;
      if (teardown2 !== null) {
        const previously_destroying_effect = is_destroying_effect;
        const previous_reaction = active_reaction;
        set_is_destroying_effect(true);
        set_active_reaction(null);
        try {
          teardown2.call(null);
        } finally {
          set_is_destroying_effect(previously_destroying_effect);
          set_active_reaction(previous_reaction);
        }
      }
    }
    function destroy_effect_children(signal, remove_dom = false) {
      var effect2 = signal.first;
      signal.first = signal.last = null;
      while (effect2 !== null) {
        const controller = effect2.ac;
        if (controller !== null) {
          without_reactive_context(() => {
            controller.abort(STALE_REACTION);
          });
        }
        var next2 = effect2.next;
        if ((effect2.f & ROOT_EFFECT) !== 0) {
          effect2.parent = null;
        } else {
          destroy_effect(effect2, remove_dom);
        }
        effect2 = next2;
      }
    }
    function destroy_block_effect_children(signal) {
      var effect2 = signal.first;
      while (effect2 !== null) {
        var next2 = effect2.next;
        if ((effect2.f & BRANCH_EFFECT) === 0) {
          destroy_effect(effect2);
        }
        effect2 = next2;
      }
    }
    function destroy_effect(effect2, remove_dom = true) {
      var removed = false;
      if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes !== null && effect2.nodes.end !== null) {
        remove_effect_dom(
          effect2.nodes.start,
          /** @type {TemplateNode} */
          effect2.nodes.end
        );
        removed = true;
      }
      destroy_effect_children(effect2, remove_dom && !removed);
      remove_reactions(effect2, 0);
      set_signal_status(effect2, DESTROYED);
      var transitions = effect2.nodes && effect2.nodes.t;
      if (transitions !== null) {
        for (const transition of transitions) {
          transition.stop();
        }
      }
      execute_effect_teardown(effect2);
      var parent = effect2.parent;
      if (parent !== null && parent.first !== null) {
        unlink_effect(effect2);
      }
      effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes = effect2.ac = null;
    }
    function remove_effect_dom(node, end) {
      while (node !== null) {
        var next2 = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
        node.remove();
        node = next2;
      }
    }
    function unlink_effect(effect2) {
      var parent = effect2.parent;
      var prev2 = effect2.prev;
      var next2 = effect2.next;
      if (prev2 !== null) prev2.next = next2;
      if (next2 !== null) next2.prev = prev2;
      if (parent !== null) {
        if (parent.first === effect2) parent.first = next2;
        if (parent.last === effect2) parent.last = prev2;
      }
    }
    function pause_effect(effect2, callback, destroy = true) {
      var transitions = [];
      pause_children(effect2, transitions, true);
      var fn = () => {
        if (destroy) destroy_effect(effect2);
        if (callback) callback();
      };
      var remaining = transitions.length;
      if (remaining > 0) {
        var check = () => --remaining || fn();
        for (var transition of transitions) {
          transition.out(check);
        }
      } else {
        fn();
      }
    }
    function pause_children(effect2, transitions, local) {
      if ((effect2.f & INERT) !== 0) return;
      effect2.f ^= INERT;
      var t = effect2.nodes && effect2.nodes.t;
      if (t !== null) {
        for (const transition of t) {
          if (transition.is_global || local) {
            transitions.push(transition);
          }
        }
      }
      var child2 = effect2.first;
      while (child2 !== null) {
        var sibling2 = child2.next;
        var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (child2.f & BRANCH_EFFECT) !== 0 && (effect2.f & BLOCK_EFFECT) !== 0;
        pause_children(child2, transitions, transparent ? local : false);
        child2 = sibling2;
      }
    }
    function resume_effect(effect2) {
      resume_children(effect2, true);
    }
    function resume_children(effect2, local) {
      if ((effect2.f & INERT) === 0) return;
      effect2.f ^= INERT;
      if ((effect2.f & CLEAN) === 0) {
        set_signal_status(effect2, DIRTY);
        schedule_effect(effect2);
      }
      var child2 = effect2.first;
      while (child2 !== null) {
        var sibling2 = child2.next;
        var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
        resume_children(child2, transparent ? local : false);
        child2 = sibling2;
      }
      var t = effect2.nodes && effect2.nodes.t;
      if (t !== null) {
        for (const transition of t) {
          if (transition.is_global || local) {
            transition.in();
          }
        }
      }
    }
    function move_effect(effect2, fragment) {
      if (!effect2.nodes) return;
      var node = effect2.nodes.start;
      var end = effect2.nodes.end;
      while (node !== null) {
        var next2 = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
        fragment.append(node);
        node = next2;
      }
    }
    let is_updating_effect = false;
    let is_destroying_effect = false;
    function set_is_destroying_effect(value) {
      is_destroying_effect = value;
    }
    let active_reaction = null;
    let untracking = false;
    function set_active_reaction(reaction) {
      active_reaction = reaction;
    }
    let active_effect = null;
    function set_active_effect(effect2) {
      active_effect = effect2;
    }
    let current_sources = null;
    function push_reaction_value(value) {
      if (active_reaction !== null && true) {
        if (current_sources === null) {
          current_sources = [value];
        } else {
          current_sources.push(value);
        }
      }
    }
    let new_deps = null;
    let skipped_deps = 0;
    let untracked_writes = null;
    function set_untracked_writes(value) {
      untracked_writes = value;
    }
    let write_version = 1;
    let read_version = 0;
    let update_version = read_version;
    function set_update_version(value) {
      update_version = value;
    }
    function increment_write_version() {
      return ++write_version;
    }
    function is_dirty(reaction) {
      var flags2 = reaction.f;
      if ((flags2 & DIRTY) !== 0) {
        return true;
      }
      if (flags2 & DERIVED) {
        reaction.f &= ~WAS_MARKED;
      }
      if ((flags2 & MAYBE_DIRTY) !== 0) {
        var dependencies = (
          /** @type {Value[]} */
          reaction.deps
        );
        var length = dependencies.length;
        for (var i = 0; i < length; i++) {
          var dependency = dependencies[i];
          if (is_dirty(
            /** @type {Derived} */
            dependency
          )) {
            update_derived(
              /** @type {Derived} */
              dependency
            );
          }
          if (dependency.wv > reaction.wv) {
            return true;
          }
        }
        if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
        // traversal of the graph in the other batches still happens
        batch_values === null) {
          set_signal_status(reaction, CLEAN);
        }
      }
      return false;
    }
    function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
      var reactions = signal.reactions;
      if (reactions === null) return;
      if (current_sources !== null && includes.call(current_sources, signal)) {
        return;
      }
      for (var i = 0; i < reactions.length; i++) {
        var reaction = reactions[i];
        if ((reaction.f & DERIVED) !== 0) {
          schedule_possible_effect_self_invalidation(
            /** @type {Derived} */
            reaction,
            effect2,
            false
          );
        } else if (effect2 === reaction) {
          if (root2) {
            set_signal_status(reaction, DIRTY);
          } else if ((reaction.f & CLEAN) !== 0) {
            set_signal_status(reaction, MAYBE_DIRTY);
          }
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
    function update_reaction(reaction) {
      var previous_deps = new_deps;
      var previous_skipped_deps = skipped_deps;
      var previous_untracked_writes = untracked_writes;
      var previous_reaction = active_reaction;
      var previous_sources = current_sources;
      var previous_component_context = component_context;
      var previous_untracking = untracking;
      var previous_update_version = update_version;
      var flags2 = reaction.f;
      new_deps = /** @type {null | Value[]} */
      null;
      skipped_deps = 0;
      untracked_writes = null;
      active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
      current_sources = null;
      set_component_context(reaction.ctx);
      untracking = false;
      update_version = ++read_version;
      if (reaction.ac !== null) {
        without_reactive_context(() => {
          reaction.ac.abort(STALE_REACTION);
        });
        reaction.ac = null;
      }
      try {
        reaction.f |= REACTION_IS_UPDATING;
        var fn = (
          /** @type {Function} */
          reaction.fn
        );
        var result = fn();
        reaction.f |= REACTION_RAN;
        var deps = reaction.deps;
        var is_fork = current_batch?.is_fork;
        if (new_deps !== null) {
          var i;
          if (!is_fork) {
            remove_reactions(reaction, skipped_deps);
          }
          if (deps !== null && skipped_deps > 0) {
            deps.length = skipped_deps + new_deps.length;
            for (i = 0; i < new_deps.length; i++) {
              deps[skipped_deps + i] = new_deps[i];
            }
          } else {
            reaction.deps = deps = new_deps;
          }
          if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
            for (i = skipped_deps; i < deps.length; i++) {
              (deps[i].reactions ??= []).push(reaction);
            }
          }
        } else if (!is_fork && deps !== null && skipped_deps < deps.length) {
          remove_reactions(reaction, skipped_deps);
          deps.length = skipped_deps;
        }
        if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
          for (i = 0; i < /** @type {Source[]} */
          untracked_writes.length; i++) {
            schedule_possible_effect_self_invalidation(
              untracked_writes[i],
              /** @type {Effect} */
              reaction
            );
          }
        }
        if (previous_reaction !== null && previous_reaction !== reaction) {
          read_version++;
          if (previous_reaction.deps !== null) {
            for (let i2 = 0; i2 < previous_skipped_deps; i2 += 1) {
              previous_reaction.deps[i2].rv = read_version;
            }
          }
          if (previous_deps !== null) {
            for (const dep of previous_deps) {
              dep.rv = read_version;
            }
          }
          if (untracked_writes !== null) {
            if (previous_untracked_writes === null) {
              previous_untracked_writes = untracked_writes;
            } else {
              previous_untracked_writes.push(.../** @type {Source[]} */
              untracked_writes);
            }
          }
        }
        if ((reaction.f & ERROR_VALUE) !== 0) {
          reaction.f ^= ERROR_VALUE;
        }
        return result;
      } catch (error) {
        return handle_error(error);
      } finally {
        reaction.f ^= REACTION_IS_UPDATING;
        new_deps = previous_deps;
        skipped_deps = previous_skipped_deps;
        untracked_writes = previous_untracked_writes;
        active_reaction = previous_reaction;
        current_sources = previous_sources;
        set_component_context(previous_component_context);
        untracking = previous_untracking;
        update_version = previous_update_version;
      }
    }
    function remove_reaction(signal, dependency) {
      let reactions = dependency.reactions;
      if (reactions !== null) {
        var index2 = index_of.call(reactions, signal);
        if (index2 !== -1) {
          var new_length = reactions.length - 1;
          if (new_length === 0) {
            reactions = dependency.reactions = null;
          } else {
            reactions[index2] = reactions[new_length];
            reactions.pop();
          }
        }
      }
      if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
      // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
      // allows us to skip the expensive work of disconnecting and immediately reconnecting it
      (new_deps === null || !includes.call(new_deps, dependency))) {
        var derived2 = (
          /** @type {Derived} */
          dependency
        );
        if ((derived2.f & CONNECTED) !== 0) {
          derived2.f ^= CONNECTED;
          derived2.f &= ~WAS_MARKED;
        }
        update_derived_status(derived2);
        freeze_derived_effects(derived2);
        remove_reactions(derived2, 0);
      }
    }
    function remove_reactions(signal, start_index) {
      var dependencies = signal.deps;
      if (dependencies === null) return;
      for (var i = start_index; i < dependencies.length; i++) {
        remove_reaction(signal, dependencies[i]);
      }
    }
    function update_effect(effect2) {
      var flags2 = effect2.f;
      if ((flags2 & DESTROYED) !== 0) {
        return;
      }
      set_signal_status(effect2, CLEAN);
      var previous_effect = active_effect;
      var was_updating_effect = is_updating_effect;
      active_effect = effect2;
      is_updating_effect = true;
      try {
        if ((flags2 & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
          destroy_block_effect_children(effect2);
        } else {
          destroy_effect_children(effect2);
        }
        execute_effect_teardown(effect2);
        var teardown2 = update_reaction(effect2);
        effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
        effect2.wv = write_version;
        var dep;
        if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) ;
      } finally {
        is_updating_effect = was_updating_effect;
        active_effect = previous_effect;
      }
    }
    async function tick() {
      await Promise.resolve();
      flushSync();
    }
    function get$3(signal) {
      var flags2 = signal.f;
      var is_derived = (flags2 & DERIVED) !== 0;
      if (active_reaction !== null && !untracking) {
        var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
        if (!destroyed && (current_sources === null || !includes.call(current_sources, signal))) {
          var deps = active_reaction.deps;
          if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
            if (signal.rv < read_version) {
              signal.rv = read_version;
              if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
                skipped_deps++;
              } else if (new_deps === null) {
                new_deps = [signal];
              } else {
                new_deps.push(signal);
              }
            }
          } else {
            (active_reaction.deps ??= []).push(signal);
            var reactions = signal.reactions;
            if (reactions === null) {
              signal.reactions = [active_reaction];
            } else if (!includes.call(reactions, active_reaction)) {
              reactions.push(active_reaction);
            }
          }
        }
      }
      if (is_destroying_effect && old_values.has(signal)) {
        return old_values.get(signal);
      }
      if (is_derived) {
        var derived2 = (
          /** @type {Derived} */
          signal
        );
        if (is_destroying_effect) {
          var value = derived2.v;
          if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
            value = execute_derived(derived2);
          }
          old_values.set(derived2, value);
          return value;
        }
        var should_connect = (derived2.f & CONNECTED) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & CONNECTED) !== 0);
        var is_new = (derived2.f & REACTION_RAN) === 0;
        if (is_dirty(derived2)) {
          if (should_connect) {
            derived2.f |= CONNECTED;
          }
          update_derived(derived2);
        }
        if (should_connect && !is_new) {
          unfreeze_derived_effects(derived2);
          reconnect(derived2);
        }
      }
      if (batch_values?.has(signal)) {
        return batch_values.get(signal);
      }
      if ((signal.f & ERROR_VALUE) !== 0) {
        throw signal.v;
      }
      return signal.v;
    }
    function reconnect(derived2) {
      derived2.f |= CONNECTED;
      if (derived2.deps === null) return;
      for (const dep of derived2.deps) {
        (dep.reactions ??= []).push(derived2);
        if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
          unfreeze_derived_effects(
            /** @type {Derived} */
            dep
          );
          reconnect(
            /** @type {Derived} */
            dep
          );
        }
      }
    }
    function depends_on_old_values(derived2) {
      if (derived2.v === UNINITIALIZED) return true;
      if (derived2.deps === null) return false;
      for (const dep of derived2.deps) {
        if (old_values.has(dep)) {
          return true;
        }
        if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
          /** @type {Derived} */
          dep
        )) {
          return true;
        }
      }
      return false;
    }
    function untrack(fn) {
      var previous_untracking = untracking;
      try {
        untracking = true;
        return fn();
      } finally {
        untracking = previous_untracking;
      }
    }
    function deep_read_state(value) {
      if (typeof value !== "object" || !value || value instanceof EventTarget) {
        return;
      }
      if (STATE_SYMBOL in value) {
        deep_read(value);
      } else if (!Array.isArray(value)) {
        for (let key2 in value) {
          const prop2 = value[key2];
          if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
            deep_read(prop2);
          }
        }
      }
    }
    function deep_read(value, visited = /* @__PURE__ */ new Set()) {
      if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
      !(value instanceof EventTarget) && !visited.has(value)) {
        visited.add(value);
        if (value instanceof Date) {
          value.getTime();
        }
        for (let key2 in value) {
          try {
            deep_read(value[key2], visited);
          } catch (e) {
          }
        }
        const proto = get_prototype_of(value);
        if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
          const descriptors = get_descriptors(proto);
          for (let key2 in descriptors) {
            const get2 = descriptors[key2].get;
            if (get2) {
              try {
                get2.call(value);
              } catch (e) {
              }
            }
          }
        }
      }
    }
    const event_symbol = /* @__PURE__ */ Symbol("events");
    const all_registered_events = /* @__PURE__ */ new Set();
    const root_event_handles = /* @__PURE__ */ new Set();
    function create_event(event_name, dom, handler, options = {}) {
      function target_handler(event2) {
        if (!options.capture) {
          handle_event_propagation.call(dom, event2);
        }
        if (!event2.cancelBubble) {
          return without_reactive_context(() => {
            return handler?.call(this, event2);
          });
        }
      }
      if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
        queue_micro_task(() => {
          dom.addEventListener(event_name, target_handler, options);
        });
      } else {
        dom.addEventListener(event_name, target_handler, options);
      }
      return target_handler;
    }
    function on(element2, type2, handler, options = {}) {
      var target_handler = create_event(type2, element2, handler, options);
      return () => {
        element2.removeEventListener(type2, target_handler, options);
      };
    }
    function event(event_name, dom, handler, capture2, passive) {
      var options = { capture: capture2, passive };
      var target_handler = create_event(event_name, dom, handler, options);
      if (dom === document.body || // @ts-ignore
      dom === window || // @ts-ignore
      dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
      dom instanceof HTMLMediaElement) {
        teardown(() => {
          dom.removeEventListener(event_name, target_handler, options);
        });
      }
    }
    function delegated(event_name, element2, handler) {
      (element2[event_symbol] ??= {})[event_name] = handler;
    }
    function delegate(events) {
      for (var i = 0; i < events.length; i++) {
        all_registered_events.add(events[i]);
      }
      for (var fn of root_event_handles) {
        fn(events);
      }
    }
    let last_propagated_event = null;
    function handle_event_propagation(event2) {
      var handler_element = this;
      var owner_document = (
        /** @type {Node} */
        handler_element.ownerDocument
      );
      var event_name = event2.type;
      var path = event2.composedPath?.() || [];
      var current_target = (
        /** @type {null | Element} */
        path[0] || event2.target
      );
      last_propagated_event = event2;
      var path_idx = 0;
      var handled_at = last_propagated_event === event2 && event2[event_symbol];
      if (handled_at) {
        var at_idx = path.indexOf(handled_at);
        if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
        window)) {
          event2[event_symbol] = handler_element;
          return;
        }
        var handler_idx = path.indexOf(handler_element);
        if (handler_idx === -1) {
          return;
        }
        if (at_idx <= handler_idx) {
          path_idx = at_idx;
        }
      }
      current_target = /** @type {Element} */
      path[path_idx] || event2.target;
      if (current_target === handler_element) return;
      define_property(event2, "currentTarget", {
        configurable: true,
        get() {
          return current_target || owner_document;
        }
      });
      var previous_reaction = active_reaction;
      var previous_effect = active_effect;
      set_active_reaction(null);
      set_active_effect(null);
      try {
        var throw_error;
        var other_errors = [];
        while (current_target !== null) {
          var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
          current_target.host || null;
          try {
            var delegated2 = current_target[event_symbol]?.[event_name];
            if (delegated2 != null && (!/** @type {any} */
            current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
            // -> the target could not have been disabled because it emits the event in the first place
            event2.target === current_target)) {
              delegated2.call(current_target, event2);
            }
          } catch (error) {
            if (throw_error) {
              other_errors.push(error);
            } else {
              throw_error = error;
            }
          }
          if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
            break;
          }
          current_target = parent_element;
        }
        if (throw_error) {
          for (let error of other_errors) {
            queueMicrotask(() => {
              throw error;
            });
          }
          throw throw_error;
        }
      } finally {
        event2[event_symbol] = handler_element;
        delete event2.currentTarget;
        set_active_reaction(previous_reaction);
        set_active_effect(previous_effect);
      }
    }
    const policy = (
      // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
      globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
        /** @param {string} html */
        createHTML: (html2) => {
          return html2;
        }
      })
    );
    function create_trusted_html(html2) {
      return (
        /** @type {string} */
        policy?.createHTML(html2) ?? html2
      );
    }
    function create_fragment_from_html(html2) {
      var elem = create_element("template");
      elem.innerHTML = create_trusted_html(html2.replaceAll("<!>", "<!---->"));
      return elem.content;
    }
    function assign_nodes(start2, end) {
      var effect2 = (
        /** @type {Effect} */
        active_effect
      );
      if (effect2.nodes === null) {
        effect2.nodes = { start: start2, end, a: null, t: null };
      }
    }
    // @__NO_SIDE_EFFECTS__
    function from_html(content, flags2) {
      var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
      var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
      var node;
      var has_start = !content.startsWith("<!>");
      return () => {
        if (node === void 0) {
          node = create_fragment_from_html(has_start ? content : "<!>" + content);
          if (!is_fragment) node = /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(node);
        }
        var clone = (
          /** @type {TemplateNode} */
          use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
        );
        if (is_fragment) {
          var start2 = (
            /** @type {TemplateNode} */
            /* @__PURE__ */ get_first_child(clone)
          );
          var end = (
            /** @type {TemplateNode} */
            clone.lastChild
          );
          assign_nodes(start2, end);
        } else {
          assign_nodes(clone, clone);
        }
        return clone;
      };
    }
    // @__NO_SIDE_EFFECTS__
    function from_namespace(content, flags2, ns = "svg") {
      var has_start = !content.startsWith("<!>");
      var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
      var node;
      return () => {
        if (!node) {
          var fragment = (
            /** @type {DocumentFragment} */
            create_fragment_from_html(wrapped)
          );
          var root2 = (
            /** @type {Element} */
            /* @__PURE__ */ get_first_child(fragment)
          );
          {
            node = /** @type {Element} */
            /* @__PURE__ */ get_first_child(root2);
          }
        }
        var clone = (
          /** @type {TemplateNode} */
          node.cloneNode(true)
        );
        {
          assign_nodes(clone, clone);
        }
        return clone;
      };
    }
    // @__NO_SIDE_EFFECTS__
    function from_svg(content, flags2) {
      return /* @__PURE__ */ from_namespace(content, flags2, "svg");
    }
    function text(value = "") {
      {
        var t = create_text(value + "");
        assign_nodes(t, t);
        return t;
      }
    }
    function comment() {
      var frag = document.createDocumentFragment();
      var start2 = document.createComment("");
      var anchor = create_text();
      frag.append(start2, anchor);
      assign_nodes(start2, anchor);
      return frag;
    }
    function append$1(anchor, dom) {
      if (anchor === null) {
        return;
      }
      anchor.before(
        /** @type {Node} */
        dom
      );
    }
    function props_id() {
      (window.__svelte ??= {}).uid ??= 1;
      return `c${window.__svelte.uid++}`;
    }
    function is_capture_event(name) {
      return name.endsWith("capture") && name !== "gotpointercapture" && name !== "lostpointercapture";
    }
    const DELEGATED_EVENTS = [
      "beforeinput",
      "click",
      "change",
      "dblclick",
      "contextmenu",
      "focusin",
      "focusout",
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mousemove",
      "mouseout",
      "mouseover",
      "mouseup",
      "pointerdown",
      "pointermove",
      "pointerout",
      "pointerover",
      "pointerup",
      "touchend",
      "touchmove",
      "touchstart"
    ];
    function can_delegate_event(event_name) {
      return DELEGATED_EVENTS.includes(event_name);
    }
    const ATTRIBUTE_ALIASES = {
      // no `class: 'className'` because we handle that separately
      formnovalidate: "formNoValidate",
      ismap: "isMap",
      nomodule: "noModule",
      playsinline: "playsInline",
      readonly: "readOnly",
      defaultvalue: "defaultValue",
      defaultchecked: "defaultChecked",
      srcobject: "srcObject",
      novalidate: "noValidate",
      allowfullscreen: "allowFullscreen",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback"
    };
    function normalize_attribute(name) {
      name = name.toLowerCase();
      return ATTRIBUTE_ALIASES[name] ?? name;
    }
    const PASSIVE_EVENTS = ["touchstart", "touchmove"];
    function is_passive_event(name) {
      return PASSIVE_EVENTS.includes(name);
    }
    function set_text(text2, value) {
      var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
      if (str !== (text2.__t ??= text2.nodeValue)) {
        text2.__t = str;
        text2.nodeValue = `${str}`;
      }
    }
    function mount(component2, options) {
      return _mount(component2, options);
    }
    const listeners = /* @__PURE__ */ new Map();
    function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
      init_operations();
      var component2 = void 0;
      var unmount2 = component_root(() => {
        var anchor_node = anchor ?? target.appendChild(create_text());
        boundary(
          /** @type {TemplateNode} */
          anchor_node,
          {
            pending: () => {
            }
          },
          (anchor_node2) => {
            push({});
            var ctx = (
              /** @type {ComponentContext} */
              component_context
            );
            if (context) ctx.c = context;
            if (events) {
              props.$$events = events;
            }
            component2 = Component(anchor_node2, props) || {};
            pop();
          },
          transformError
        );
        var registered_events = /* @__PURE__ */ new Set();
        var event_handle = (events2) => {
          for (var i = 0; i < events2.length; i++) {
            var event_name = events2[i];
            if (registered_events.has(event_name)) continue;
            registered_events.add(event_name);
            var passive = is_passive_event(event_name);
            for (const node of [target, document]) {
              var counts = listeners.get(node);
              if (counts === void 0) {
                counts = /* @__PURE__ */ new Map();
                listeners.set(node, counts);
              }
              var count = counts.get(event_name);
              if (count === void 0) {
                node.addEventListener(event_name, handle_event_propagation, { passive });
                counts.set(event_name, 1);
              } else {
                counts.set(event_name, count + 1);
              }
            }
          }
        };
        event_handle(array_from(all_registered_events));
        root_event_handles.add(event_handle);
        return () => {
          for (var event_name of registered_events) {
            for (const node of [target, document]) {
              var counts = (
                /** @type {Map<string, number>} */
                listeners.get(node)
              );
              var count = (
                /** @type {number} */
                counts.get(event_name)
              );
              if (--count == 0) {
                node.removeEventListener(event_name, handle_event_propagation);
                counts.delete(event_name);
                if (counts.size === 0) {
                  listeners.delete(node);
                }
              } else {
                counts.set(event_name, count);
              }
            }
          }
          root_event_handles.delete(event_handle);
          if (anchor_node !== anchor) {
            anchor_node.parentNode?.removeChild(anchor_node);
          }
        };
      });
      mounted_components.set(component2, unmount2);
      return component2;
    }
    let mounted_components = /* @__PURE__ */ new WeakMap();
    function unmount(component2, options) {
      const fn = mounted_components.get(component2);
      if (fn) {
        mounted_components.delete(component2);
        return fn(options);
      }
      return Promise.resolve();
    }
    class BranchManager {
      /** @type {TemplateNode} */
      anchor;
      /** @type {Map<Batch, Key>} */
      #batches = /* @__PURE__ */ new Map();
      /**
       * Map of keys to effects that are currently rendered in the DOM.
       * These effects are visible and actively part of the document tree.
       * Example:
       * ```
       * {#if condition}
       * 	foo
       * {:else}
       * 	bar
       * {/if}
       * ```
       * Can result in the entries `true->Effect` and `false->Effect`
       * @type {Map<Key, Effect>}
       */
      #onscreen = /* @__PURE__ */ new Map();
      /**
       * Similar to #onscreen with respect to the keys, but contains branches that are not yet
       * in the DOM, because their insertion is deferred.
       * @type {Map<Key, Branch>}
       */
      #offscreen = /* @__PURE__ */ new Map();
      /**
       * Keys of effects that are currently outroing
       * @type {Set<Key>}
       */
      #outroing = /* @__PURE__ */ new Set();
      /**
       * Whether to pause (i.e. outro) on change, or destroy immediately.
       * This is necessary for `<svelte:element>`
       */
      #transition = true;
      /**
       * @param {TemplateNode} anchor
       * @param {boolean} transition
       */
      constructor(anchor, transition = true) {
        this.anchor = anchor;
        this.#transition = transition;
      }
      /**
       * @param {Batch} batch
       */
      #commit = (batch) => {
        if (!this.#batches.has(batch)) return;
        var key2 = (
          /** @type {Key} */
          this.#batches.get(batch)
        );
        var onscreen = this.#onscreen.get(key2);
        if (onscreen) {
          resume_effect(onscreen);
          this.#outroing.delete(key2);
        } else {
          var offscreen = this.#offscreen.get(key2);
          if (offscreen) {
            this.#onscreen.set(key2, offscreen.effect);
            this.#offscreen.delete(key2);
            offscreen.fragment.lastChild.remove();
            this.anchor.before(offscreen.fragment);
            onscreen = offscreen.effect;
          }
        }
        for (const [b, k] of this.#batches) {
          this.#batches.delete(b);
          if (b === batch) {
            break;
          }
          const offscreen2 = this.#offscreen.get(k);
          if (offscreen2) {
            destroy_effect(offscreen2.effect);
            this.#offscreen.delete(k);
          }
        }
        for (const [k, effect2] of this.#onscreen) {
          if (k === key2 || this.#outroing.has(k)) continue;
          const on_destroy = () => {
            const keys2 = Array.from(this.#batches.values());
            if (keys2.includes(k)) {
              var fragment = document.createDocumentFragment();
              move_effect(effect2, fragment);
              fragment.append(create_text());
              this.#offscreen.set(k, { effect: effect2, fragment });
            } else {
              destroy_effect(effect2);
            }
            this.#outroing.delete(k);
            this.#onscreen.delete(k);
          };
          if (this.#transition || !onscreen) {
            this.#outroing.add(k);
            pause_effect(effect2, on_destroy, false);
          } else {
            on_destroy();
          }
        }
      };
      /**
       * @param {Batch} batch
       */
      #discard = (batch) => {
        this.#batches.delete(batch);
        const keys2 = Array.from(this.#batches.values());
        for (const [k, branch2] of this.#offscreen) {
          if (!keys2.includes(k)) {
            destroy_effect(branch2.effect);
            this.#offscreen.delete(k);
          }
        }
      };
      /**
       *
       * @param {any} key
       * @param {null | ((target: TemplateNode) => void)} fn
       */
      ensure(key2, fn) {
        var batch = (
          /** @type {Batch} */
          current_batch
        );
        var defer = should_defer_append();
        if (fn && !this.#onscreen.has(key2) && !this.#offscreen.has(key2)) {
          if (defer) {
            var fragment = document.createDocumentFragment();
            var target = create_text();
            fragment.append(target);
            this.#offscreen.set(key2, {
              effect: branch(() => fn(target)),
              fragment
            });
          } else {
            this.#onscreen.set(
              key2,
              branch(() => fn(this.anchor))
            );
          }
        }
        this.#batches.set(batch, key2);
        if (defer) {
          for (const [k, effect2] of this.#onscreen) {
            if (k === key2) {
              batch.unskip_effect(effect2);
            } else {
              batch.skip_effect(effect2);
            }
          }
          for (const [k, branch2] of this.#offscreen) {
            if (k === key2) {
              batch.unskip_effect(branch2.effect);
            } else {
              batch.skip_effect(branch2.effect);
            }
          }
          batch.oncommit(this.#commit);
          batch.ondiscard(this.#discard);
        } else {
          this.#commit(batch);
        }
      }
    }
    function snippet(node, get_snippet, ...args) {
      var branches = new BranchManager(node);
      block(() => {
        const snippet2 = get_snippet() ?? null;
        branches.ensure(snippet2, snippet2 && ((anchor) => snippet2(anchor, ...args)));
      }, EFFECT_TRANSPARENT);
    }
    function onMount(fn) {
      if (component_context === null) {
        lifecycle_outside_component();
      }
      if (legacy_mode_flag && component_context.l !== null) {
        init_update_callbacks(component_context).m.push(fn);
      } else {
        user_effect(() => {
          const cleanup = untrack(fn);
          if (typeof cleanup === "function") return (
            /** @type {() => void} */
            cleanup
          );
        });
      }
    }
    function onDestroy(fn) {
      if (component_context === null) {
        lifecycle_outside_component();
      }
      onMount(() => () => untrack(fn));
    }
    function init_update_callbacks(context) {
      var l = (
        /** @type {ComponentContextLegacy} */
        context.l
      );
      return l.u ??= { a: [], b: [], m: [] };
    }
    function createAttachmentKey() {
      return Symbol(ATTACHMENT_KEY);
    }
    function if_block(node, fn, elseif = false) {
      var branches = new BranchManager(node);
      var flags2 = elseif ? EFFECT_TRANSPARENT : 0;
      function update_branch(key2, fn2) {
        branches.ensure(key2, fn2);
      }
      block(() => {
        var has_branch = false;
        fn((fn2, key2 = 0) => {
          has_branch = true;
          update_branch(key2, fn2);
        });
        if (!has_branch) {
          update_branch(false, null);
        }
      }, flags2);
    }
    const NAN = /* @__PURE__ */ Symbol("NaN");
    function key(node, get_key, render_fn) {
      var branches = new BranchManager(node);
      var legacy = !is_runes();
      block(() => {
        var key2 = get_key();
        if (key2 !== key2) {
          key2 = /** @type {any} */
          NAN;
        }
        if (legacy && key2 !== null && typeof key2 === "object") {
          key2 = /** @type {V} */
          {};
        }
        branches.ensure(key2, render_fn);
      });
    }
    function index(_, i) {
      return i;
    }
    function pause_effects(state2, to_destroy, controlled_anchor) {
      var transitions = [];
      var length = to_destroy.length;
      var group;
      var remaining = to_destroy.length;
      for (var i = 0; i < length; i++) {
        let effect2 = to_destroy[i];
        pause_effect(
          effect2,
          () => {
            if (group) {
              group.pending.delete(effect2);
              group.done.add(effect2);
              if (group.pending.size === 0) {
                var groups = (
                  /** @type {Set<EachOutroGroup>} */
                  state2.outrogroups
                );
                destroy_effects(array_from(group.done));
                groups.delete(group);
                if (groups.size === 0) {
                  state2.outrogroups = null;
                }
              }
            } else {
              remaining -= 1;
            }
          },
          false
        );
      }
      if (remaining === 0) {
        var fast_path = transitions.length === 0 && controlled_anchor !== null;
        if (fast_path) {
          var anchor = (
            /** @type {Element} */
            controlled_anchor
          );
          var parent_node = (
            /** @type {Element} */
            anchor.parentNode
          );
          clear_text_content(parent_node);
          parent_node.append(anchor);
          state2.items.clear();
        }
        destroy_effects(to_destroy, !fast_path);
      } else {
        group = {
          pending: new Set(to_destroy),
          done: /* @__PURE__ */ new Set()
        };
        (state2.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
      }
    }
    function destroy_effects(to_destroy, remove_dom = true) {
      for (var i = 0; i < to_destroy.length; i++) {
        destroy_effect(to_destroy[i], remove_dom);
      }
    }
    var offscreen_anchor;
    function each(node, flags2, get_collection, get_key, render_fn, fallback_fn = null) {
      var anchor = node;
      var items = /* @__PURE__ */ new Map();
      var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
      if (is_controlled) {
        var parent_node = (
          /** @type {Element} */
          node
        );
        anchor = parent_node.appendChild(create_text());
      }
      var fallback = null;
      var each_array = /* @__PURE__ */ derived_safe_equal(() => {
        var collection2 = get_collection();
        return is_array(collection2) ? collection2 : collection2 == null ? [] : array_from(collection2);
      });
      var array;
      var first_run = true;
      function commit() {
        state2.fallback = fallback;
        reconcile(state2, array, anchor, flags2, get_key);
        if (fallback !== null) {
          if (array.length === 0) {
            if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
              resume_effect(fallback);
            } else {
              fallback.f ^= EFFECT_OFFSCREEN;
              move$1(fallback, null, anchor);
            }
          } else {
            pause_effect(fallback, () => {
              fallback = null;
            });
          }
        }
      }
      var effect2 = block(() => {
        array = /** @type {V[]} */
        get$3(each_array);
        var length = array.length;
        var keys2 = /* @__PURE__ */ new Set();
        var batch = (
          /** @type {Batch} */
          current_batch
        );
        var defer = should_defer_append();
        for (var index2 = 0; index2 < length; index2 += 1) {
          var value = array[index2];
          var key2 = get_key(value, index2);
          var item = first_run ? null : items.get(key2);
          if (item) {
            if (item.v) internal_set(item.v, value);
            if (item.i) internal_set(item.i, index2);
            if (defer) {
              batch.unskip_effect(item.e);
            }
          } else {
            item = create_item(
              items,
              first_run ? anchor : offscreen_anchor ??= create_text(),
              value,
              key2,
              index2,
              render_fn,
              flags2,
              get_collection
            );
            if (!first_run) {
              item.e.f |= EFFECT_OFFSCREEN;
            }
            items.set(key2, item);
          }
          keys2.add(key2);
        }
        if (length === 0 && fallback_fn && !fallback) {
          if (first_run) {
            fallback = branch(() => fallback_fn(anchor));
          } else {
            fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
            fallback.f |= EFFECT_OFFSCREEN;
          }
        }
        if (length > keys2.size) {
          {
            each_key_duplicate();
          }
        }
        if (!first_run) {
          if (defer) {
            for (const [key3, item2] of items) {
              if (!keys2.has(key3)) {
                batch.skip_effect(item2.e);
              }
            }
            batch.oncommit(commit);
            batch.ondiscard(() => {
            });
          } else {
            commit();
          }
        }
        get$3(each_array);
      });
      var state2 = { effect: effect2, items, outrogroups: null, fallback };
      first_run = false;
    }
    function skip_to_branch(effect2) {
      while (effect2 !== null && (effect2.f & BRANCH_EFFECT) === 0) {
        effect2 = effect2.next;
      }
      return effect2;
    }
    function reconcile(state2, array, anchor, flags2, get_key) {
      var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
      var length = array.length;
      var items = state2.items;
      var current = skip_to_branch(state2.effect.first);
      var seen;
      var prev2 = null;
      var to_animate;
      var matched = [];
      var stashed = [];
      var value;
      var key2;
      var effect2;
      var i;
      if (is_animated) {
        for (i = 0; i < length; i += 1) {
          value = array[i];
          key2 = get_key(value, i);
          effect2 = /** @type {EachItem} */
          items.get(key2).e;
          if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
            effect2.nodes?.a?.measure();
            (to_animate ??= /* @__PURE__ */ new Set()).add(effect2);
          }
        }
      }
      for (i = 0; i < length; i += 1) {
        value = array[i];
        key2 = get_key(value, i);
        effect2 = /** @type {EachItem} */
        items.get(key2).e;
        if (state2.outrogroups !== null) {
          for (const group of state2.outrogroups) {
            group.pending.delete(effect2);
            group.done.delete(effect2);
          }
        }
        if ((effect2.f & EFFECT_OFFSCREEN) !== 0) {
          effect2.f ^= EFFECT_OFFSCREEN;
          if (effect2 === current) {
            move$1(effect2, null, anchor);
          } else {
            var next2 = prev2 ? prev2.next : current;
            if (effect2 === state2.effect.last) {
              state2.effect.last = effect2.prev;
            }
            if (effect2.prev) effect2.prev.next = effect2.next;
            if (effect2.next) effect2.next.prev = effect2.prev;
            link$1(state2, prev2, effect2);
            link$1(state2, effect2, next2);
            move$1(effect2, next2, anchor);
            prev2 = effect2;
            matched = [];
            stashed = [];
            current = skip_to_branch(prev2.next);
            continue;
          }
        }
        if ((effect2.f & INERT) !== 0) {
          resume_effect(effect2);
          if (is_animated) {
            effect2.nodes?.a?.unfix();
            (to_animate ??= /* @__PURE__ */ new Set()).delete(effect2);
          }
        }
        if (effect2 !== current) {
          if (seen !== void 0 && seen.has(effect2)) {
            if (matched.length < stashed.length) {
              var start2 = stashed[0];
              var j;
              prev2 = start2.prev;
              var a = matched[0];
              var b = matched[matched.length - 1];
              for (j = 0; j < matched.length; j += 1) {
                move$1(matched[j], start2, anchor);
              }
              for (j = 0; j < stashed.length; j += 1) {
                seen.delete(stashed[j]);
              }
              link$1(state2, a.prev, b.next);
              link$1(state2, prev2, a);
              link$1(state2, b, start2);
              current = start2;
              prev2 = b;
              i -= 1;
              matched = [];
              stashed = [];
            } else {
              seen.delete(effect2);
              move$1(effect2, current, anchor);
              link$1(state2, effect2.prev, effect2.next);
              link$1(state2, effect2, prev2 === null ? state2.effect.first : prev2.next);
              link$1(state2, prev2, effect2);
              prev2 = effect2;
            }
            continue;
          }
          matched = [];
          stashed = [];
          while (current !== null && current !== effect2) {
            (seen ??= /* @__PURE__ */ new Set()).add(current);
            stashed.push(current);
            current = skip_to_branch(current.next);
          }
          if (current === null) {
            continue;
          }
        }
        if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
          matched.push(effect2);
        }
        prev2 = effect2;
        current = skip_to_branch(effect2.next);
      }
      if (state2.outrogroups !== null) {
        for (const group of state2.outrogroups) {
          if (group.pending.size === 0) {
            destroy_effects(array_from(group.done));
            state2.outrogroups?.delete(group);
          }
        }
        if (state2.outrogroups.size === 0) {
          state2.outrogroups = null;
        }
      }
      if (current !== null || seen !== void 0) {
        var to_destroy = [];
        if (seen !== void 0) {
          for (effect2 of seen) {
            if ((effect2.f & INERT) === 0) {
              to_destroy.push(effect2);
            }
          }
        }
        while (current !== null) {
          if ((current.f & INERT) === 0 && current !== state2.fallback) {
            to_destroy.push(current);
          }
          current = skip_to_branch(current.next);
        }
        var destroy_length = to_destroy.length;
        if (destroy_length > 0) {
          var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
          if (is_animated) {
            for (i = 0; i < destroy_length; i += 1) {
              to_destroy[i].nodes?.a?.measure();
            }
            for (i = 0; i < destroy_length; i += 1) {
              to_destroy[i].nodes?.a?.fix();
            }
          }
          pause_effects(state2, to_destroy, controlled_anchor);
        }
      }
      if (is_animated) {
        queue_micro_task(() => {
          if (to_animate === void 0) return;
          for (effect2 of to_animate) {
            effect2.nodes?.a?.apply();
          }
        });
      }
    }
    function create_item(items, anchor, value, key2, index2, render_fn, flags2, get_collection) {
      var v = (flags2 & EACH_ITEM_REACTIVE) !== 0 ? (flags2 & EACH_ITEM_IMMUTABLE) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
      var i = (flags2 & EACH_INDEX_REACTIVE) !== 0 ? source(index2) : null;
      return {
        v,
        i,
        e: branch(() => {
          render_fn(anchor, v ?? value, i ?? index2, get_collection);
          return () => {
            items.delete(key2);
          };
        })
      };
    }
    function move$1(effect2, next2, anchor) {
      if (!effect2.nodes) return;
      var node = effect2.nodes.start;
      var end = effect2.nodes.end;
      var dest = next2 && (next2.f & EFFECT_OFFSCREEN) === 0 ? (
        /** @type {EffectNodes} */
        next2.nodes.start
      ) : anchor;
      while (node !== null) {
        var next_node = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_next_sibling(node)
        );
        dest.before(node);
        if (node === end) {
          return;
        }
        node = next_node;
      }
    }
    function link$1(state2, prev2, next2) {
      if (prev2 === null) {
        state2.effect.first = next2;
      } else {
        prev2.next = next2;
      }
      if (next2 === null) {
        state2.effect.last = prev2;
      } else {
        next2.prev = prev2;
      }
    }
    function html(node, get_value, svg = false, mathml = false, skip_warning = false) {
      var anchor = node;
      var value = "";
      template_effect(() => {
        var effect2 = (
          /** @type {Effect} */
          active_effect
        );
        if (value === (value = get_value() ?? "")) {
          return;
        }
        if (effect2.nodes !== null) {
          remove_effect_dom(
            effect2.nodes.start,
            /** @type {TemplateNode} */
            effect2.nodes.end
          );
          effect2.nodes = null;
        }
        if (value === "") return;
        var ns = svg ? NAMESPACE_SVG : mathml ? NAMESPACE_MATHML : void 0;
        var wrapper = (
          /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */
          create_element(svg ? "svg" : mathml ? "math" : "template", ns)
        );
        wrapper.innerHTML = /** @type {any} */
        value;
        var node2 = svg || mathml ? wrapper : (
          /** @type {HTMLTemplateElement} */
          wrapper.content
        );
        assign_nodes(
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(node2),
          /** @type {TemplateNode} */
          node2.lastChild
        );
        if (svg || mathml) {
          while (/* @__PURE__ */ get_first_child(node2)) {
            anchor.before(
              /** @type {TemplateNode} */
              /* @__PURE__ */ get_first_child(node2)
            );
          }
        } else {
          anchor.before(node2);
        }
      });
    }
    function slot(anchor, $$props, name, slot_props, fallback_fn) {
      var slot_fn = $$props.$$slots?.[name];
      var is_interop = false;
      if (slot_fn === true) {
        slot_fn = $$props["children"];
        is_interop = true;
      }
      if (slot_fn === void 0) ;
      else {
        slot_fn(anchor, is_interop ? () => slot_props : slot_props);
      }
    }
    function component(node, get_component, render_fn) {
      var branches = new BranchManager(node);
      block(() => {
        var component2 = get_component() ?? null;
        branches.ensure(component2, component2 && ((target) => render_fn(target, component2)));
      }, EFFECT_TRANSPARENT);
    }
    function element(node, get_tag, is_svg, render_fn, get_namespace, location) {
      var element2 = null;
      var anchor = (
        /** @type {TemplateNode} */
        node
      );
      var branches = new BranchManager(anchor, false);
      block(() => {
        const next_tag = get_tag() || null;
        var ns = is_svg || next_tag === "svg" ? NAMESPACE_SVG : void 0;
        if (next_tag === null) {
          branches.ensure(null, null);
          return;
        }
        branches.ensure(next_tag, (anchor2) => {
          if (next_tag) {
            element2 = create_element(next_tag, ns);
            assign_nodes(element2, element2);
            if (render_fn) {
              var child_anchor = element2.appendChild(create_text());
              render_fn(element2, child_anchor);
            }
            active_effect.nodes.end = element2;
            anchor2.before(element2);
          }
        });
        return () => {
        };
      }, EFFECT_TRANSPARENT);
      teardown(() => {
      });
    }
    function action(dom, action2, get_value) {
      effect(() => {
        var payload = untrack(() => action2(dom, get_value?.()) || {});
        if (get_value && payload?.update) {
          var inited = false;
          var prev2 = (
            /** @type {any} */
            {}
          );
          render_effect(() => {
            var value = get_value();
            deep_read_state(value);
            if (inited && safe_not_equal(prev2, value)) {
              prev2 = value;
              payload.update(value);
            }
          });
          inited = true;
        }
        if (payload?.destroy) {
          return () => (
            /** @type {Function} */
            payload.destroy()
          );
        }
      });
    }
    function attach(node, get_fn) {
      var fn = void 0;
      var e;
      managed(() => {
        if (fn !== (fn = get_fn())) {
          if (e) {
            destroy_effect(e);
            e = null;
          }
          if (fn) {
            e = branch(() => {
              effect(() => (
                /** @type {(node: Element) => void} */
                fn(node)
              ));
            });
          }
        }
      });
    }
    function r(e) {
      var t, f, n = "";
      if ("string" == typeof e || "number" == typeof e) n += e;
      else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
      } else for (f in e) e[f] && (n && (n += " "), n += f);
      return n;
    }
    function clsx$2() {
      for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
      return n;
    }
    function clsx$1(value) {
      if (typeof value === "object") {
        return clsx$2(value);
      } else {
        return value ?? "";
      }
    }
    const whitespace = [..." 	\n\r\f \v\uFEFF"];
    function to_class(value, hash, directives) {
      var classname = value == null ? "" : "" + value;
      if (hash) {
        classname = classname ? classname + " " + hash : hash;
      }
      if (directives) {
        for (var key2 of Object.keys(directives)) {
          if (directives[key2]) {
            classname = classname ? classname + " " + key2 : key2;
          } else if (classname.length) {
            var len = key2.length;
            var a = 0;
            while ((a = classname.indexOf(key2, a)) >= 0) {
              var b = a + len;
              if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
                classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
              } else {
                a = b;
              }
            }
          }
        }
      }
      return classname === "" ? null : classname;
    }
    function append_styles(styles, important = false) {
      var separator = important ? " !important;" : ";";
      var css2 = "";
      for (var key2 of Object.keys(styles)) {
        var value = styles[key2];
        if (value != null && value !== "") {
          css2 += " " + key2 + ": " + value + separator;
        }
      }
      return css2;
    }
    function to_css_name(name) {
      if (name[0] !== "-" || name[1] !== "-") {
        return name.toLowerCase();
      }
      return name;
    }
    function to_style(value, styles) {
      if (styles) {
        var new_style = "";
        var normal_styles;
        var important_styles;
        if (Array.isArray(styles)) {
          normal_styles = styles[0];
          important_styles = styles[1];
        } else {
          normal_styles = styles;
        }
        if (value) {
          value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
          var in_str = false;
          var in_apo = 0;
          var in_comment = false;
          var reserved_names = [];
          if (normal_styles) {
            reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
          }
          if (important_styles) {
            reserved_names.push(...Object.keys(important_styles).map(to_css_name));
          }
          var start_index = 0;
          var name_index = -1;
          const len = value.length;
          for (var i = 0; i < len; i++) {
            var c = value[i];
            if (in_comment) {
              if (c === "/" && value[i - 1] === "*") {
                in_comment = false;
              }
            } else if (in_str) {
              if (in_str === c) {
                in_str = false;
              }
            } else if (c === "/" && value[i + 1] === "*") {
              in_comment = true;
            } else if (c === '"' || c === "'") {
              in_str = c;
            } else if (c === "(") {
              in_apo++;
            } else if (c === ")") {
              in_apo--;
            }
            if (!in_comment && in_str === false && in_apo === 0) {
              if (c === ":" && name_index === -1) {
                name_index = i;
              } else if (c === ";" || i === len - 1) {
                if (name_index !== -1) {
                  var name = to_css_name(value.substring(start_index, name_index).trim());
                  if (!reserved_names.includes(name)) {
                    if (c !== ";") {
                      i++;
                    }
                    var property = value.substring(start_index, i).trim();
                    new_style += " " + property + ";";
                  }
                }
                start_index = i + 1;
                name_index = -1;
              }
            }
          }
        }
        if (normal_styles) {
          new_style += append_styles(normal_styles);
        }
        if (important_styles) {
          new_style += append_styles(important_styles, true);
        }
        new_style = new_style.trim();
        return new_style === "" ? null : new_style;
      }
      return value == null ? null : String(value);
    }
    function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
      var prev2 = dom.__className;
      if (prev2 !== value || prev2 === void 0) {
        var next_class_name = to_class(value, hash, next_classes);
        {
          if (next_class_name == null) {
            dom.removeAttribute("class");
          } else if (is_html) {
            dom.className = next_class_name;
          } else {
            dom.setAttribute("class", next_class_name);
          }
        }
        dom.__className = value;
      } else if (next_classes && prev_classes !== next_classes) {
        for (var key2 in next_classes) {
          var is_present = !!next_classes[key2];
          if (prev_classes == null || is_present !== !!prev_classes[key2]) {
            dom.classList.toggle(key2, is_present);
          }
        }
      }
      return next_classes;
    }
    function update_styles(dom, prev2 = {}, next2, priority) {
      for (var key2 in next2) {
        var value = next2[key2];
        if (prev2[key2] !== value) {
          if (next2[key2] == null) {
            dom.style.removeProperty(key2);
          } else {
            dom.style.setProperty(key2, value, priority);
          }
        }
      }
    }
    function set_style(dom, value, prev_styles, next_styles) {
      var prev2 = dom.__style;
      if (prev2 !== value) {
        var next_style_attr = to_style(value, next_styles);
        {
          if (next_style_attr == null) {
            dom.removeAttribute("style");
          } else {
            dom.style.cssText = next_style_attr;
          }
        }
        dom.__style = value;
      } else if (next_styles) {
        if (Array.isArray(next_styles)) {
          update_styles(dom, prev_styles?.[0], next_styles[0]);
          update_styles(dom, prev_styles?.[1], next_styles[1], "important");
        } else {
          update_styles(dom, prev_styles, next_styles);
        }
      }
      return next_styles;
    }
    function select_option(select, value, mounting = false) {
      if (select.multiple) {
        if (value == void 0) {
          return;
        }
        if (!is_array(value)) {
          return select_multiple_invalid_value();
        }
        for (var option of select.options) {
          option.selected = value.includes(get_option_value(option));
        }
        return;
      }
      for (option of select.options) {
        var option_value = get_option_value(option);
        if (is(option_value, value)) {
          option.selected = true;
          return;
        }
      }
      if (!mounting || value !== void 0) {
        select.selectedIndex = -1;
      }
    }
    function init_select(select) {
      var observer = new MutationObserver(() => {
        select_option(select, select.__value);
      });
      observer.observe(select, {
        // Listen to option element changes
        childList: true,
        subtree: true,
        // because of <optgroup>
        // Listen to option element value attribute changes
        // (doesn't get notified of select value changes,
        // because that property is not reflected as an attribute)
        attributes: true,
        attributeFilter: ["value"]
      });
      teardown(() => {
        observer.disconnect();
      });
    }
    function get_option_value(option) {
      if ("__value" in option) {
        return option.__value;
      } else {
        return option.value;
      }
    }
    const CLASS = /* @__PURE__ */ Symbol("class");
    const STYLE = /* @__PURE__ */ Symbol("style");
    const IS_CUSTOM_ELEMENT = /* @__PURE__ */ Symbol("is custom element");
    const IS_HTML = /* @__PURE__ */ Symbol("is html");
    const OPTION_TAG = IS_XHTML ? "option" : "OPTION";
    const SELECT_TAG = IS_XHTML ? "select" : "SELECT";
    function set_selected(element2, selected) {
      if (selected) {
        if (!element2.hasAttribute("selected")) {
          element2.setAttribute("selected", "");
        }
      } else {
        element2.removeAttribute("selected");
      }
    }
    function set_attribute(element2, attribute, value, skip_warning) {
      var attributes = get_attributes(element2);
      if (attributes[attribute] === (attributes[attribute] = value)) return;
      if (attribute === "loading") {
        element2[LOADING_ATTR_SYMBOL] = value;
      }
      if (value == null) {
        element2.removeAttribute(attribute);
      } else if (typeof value !== "string" && get_setters(element2).includes(attribute)) {
        element2[attribute] = value;
      } else {
        element2.setAttribute(attribute, value);
      }
    }
    function set_attributes(element2, prev2, next2, css_hash, should_remove_defaults = false, skip_warning = false) {
      var attributes = get_attributes(element2);
      var is_custom_element = attributes[IS_CUSTOM_ELEMENT];
      var preserve_attribute_case = !attributes[IS_HTML];
      var current = prev2 || {};
      var is_option_element = element2.nodeName === OPTION_TAG;
      for (var key2 in prev2) {
        if (!(key2 in next2)) {
          next2[key2] = null;
        }
      }
      if (next2.class) {
        next2.class = clsx$1(next2.class);
      } else if (css_hash || next2[CLASS]) {
        next2.class = null;
      }
      if (next2[STYLE]) {
        next2.style ??= null;
      }
      var setters = get_setters(element2);
      for (const key3 in next2) {
        let value = next2[key3];
        if (is_option_element && key3 === "value" && value == null) {
          element2.value = element2.__value = "";
          current[key3] = value;
          continue;
        }
        if (key3 === "class") {
          var is_html = element2.namespaceURI === "http://www.w3.org/1999/xhtml";
          set_class(element2, is_html, value, css_hash, prev2?.[CLASS], next2[CLASS]);
          current[key3] = value;
          current[CLASS] = next2[CLASS];
          continue;
        }
        if (key3 === "style") {
          set_style(element2, value, prev2?.[STYLE], next2[STYLE]);
          current[key3] = value;
          current[STYLE] = next2[STYLE];
          continue;
        }
        var prev_value = current[key3];
        if (value === prev_value && !(value === void 0 && element2.hasAttribute(key3))) {
          continue;
        }
        current[key3] = value;
        var prefix = key3[0] + key3[1];
        if (prefix === "$$") continue;
        if (prefix === "on") {
          const opts = {};
          const event_handle_key = "$$" + key3;
          let event_name = key3.slice(2);
          var is_delegated = can_delegate_event(event_name);
          if (is_capture_event(event_name)) {
            event_name = event_name.slice(0, -7);
            opts.capture = true;
          }
          if (!is_delegated && prev_value) {
            if (value != null) continue;
            element2.removeEventListener(event_name, current[event_handle_key], opts);
            current[event_handle_key] = null;
          }
          if (is_delegated) {
            delegated(event_name, element2, value);
            delegate([event_name]);
          } else if (value != null) {
            let handle2 = function(evt) {
              current[key3].call(this, evt);
            };
            var handle = handle2;
            current[event_handle_key] = create_event(event_name, element2, handle2, opts);
          }
        } else if (key3 === "style") {
          set_attribute(element2, key3, value);
        } else if (key3 === "autofocus") {
          autofocus(
            /** @type {HTMLElement} */
            element2,
            Boolean(value)
          );
        } else if (!is_custom_element && (key3 === "__value" || key3 === "value" && value != null)) {
          element2.value = element2.__value = value;
        } else if (key3 === "selected" && is_option_element) {
          set_selected(
            /** @type {HTMLOptionElement} */
            element2,
            value
          );
        } else {
          var name = key3;
          if (!preserve_attribute_case) {
            name = normalize_attribute(name);
          }
          var is_default = name === "defaultValue" || name === "defaultChecked";
          if (value == null && !is_custom_element && !is_default) {
            attributes[key3] = null;
            if (name === "value" || name === "checked") {
              let input = (
                /** @type {HTMLInputElement} */
                element2
              );
              const use_default = prev2 === void 0;
              if (name === "value") {
                let previous = input.defaultValue;
                input.removeAttribute(name);
                input.defaultValue = previous;
                input.value = input.__value = use_default ? previous : null;
              } else {
                let previous = input.defaultChecked;
                input.removeAttribute(name);
                input.defaultChecked = previous;
                input.checked = use_default ? previous : false;
              }
            } else {
              element2.removeAttribute(key3);
            }
          } else if (is_default || setters.includes(name) && (is_custom_element || typeof value !== "string")) {
            element2[name] = value;
            if (name in attributes) attributes[name] = UNINITIALIZED;
          } else if (typeof value !== "function") {
            set_attribute(element2, name, value);
          }
        }
      }
      return current;
    }
    function attribute_effect(element2, fn, sync = [], async = [], blockers = [], css_hash, should_remove_defaults = false, skip_warning = false) {
      flatten$1(blockers, sync, async, (values) => {
        var prev2 = void 0;
        var effects = {};
        var is_select = element2.nodeName === SELECT_TAG;
        var inited = false;
        managed(() => {
          var next2 = fn(...values.map(get$3));
          var current = set_attributes(
            element2,
            prev2,
            next2,
            css_hash,
            should_remove_defaults,
            skip_warning
          );
          if (inited && is_select && "value" in next2) {
            select_option(
              /** @type {HTMLSelectElement} */
              element2,
              next2.value
            );
          }
          for (let symbol of Object.getOwnPropertySymbols(effects)) {
            if (!next2[symbol]) destroy_effect(effects[symbol]);
          }
          for (let symbol of Object.getOwnPropertySymbols(next2)) {
            var n = next2[symbol];
            if (symbol.description === ATTACHMENT_KEY && (!prev2 || n !== prev2[symbol])) {
              if (effects[symbol]) destroy_effect(effects[symbol]);
              effects[symbol] = branch(() => attach(element2, () => n));
            }
            current[symbol] = n;
          }
          prev2 = current;
        });
        if (is_select) {
          var select = (
            /** @type {HTMLSelectElement} */
            element2
          );
          effect(() => {
            select_option(
              select,
              /** @type {Record<string | symbol, any>} */
              prev2.value,
              true
            );
            init_select(select);
          });
        }
        inited = true;
      });
    }
    function get_attributes(element2) {
      return (
        /** @type {Record<string | symbol, unknown>} **/
        // @ts-expect-error
        element2.__attributes ??= {
          [IS_CUSTOM_ELEMENT]: element2.nodeName.includes("-"),
          [IS_HTML]: element2.namespaceURI === NAMESPACE_HTML
        }
      );
    }
    var setters_cache = /* @__PURE__ */ new Map();
    function get_setters(element2) {
      var cache_key = element2.getAttribute("is") || element2.nodeName;
      var setters = setters_cache.get(cache_key);
      if (setters) return setters;
      setters_cache.set(cache_key, setters = []);
      var descriptors;
      var proto = element2;
      var element_proto = Element.prototype;
      while (element_proto !== proto) {
        descriptors = get_descriptors(proto);
        for (var key2 in descriptors) {
          if (descriptors[key2].set) {
            setters.push(key2);
          }
        }
        proto = get_prototype_of(proto);
      }
      return setters;
    }
    function is_bound_this(bound_value, element_or_component) {
      return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
    }
    function bind_this(element_or_component = {}, update2, get_value, get_parts) {
      effect(() => {
        var old_parts;
        var parts2;
        render_effect(() => {
          old_parts = parts2;
          parts2 = [];
          untrack(() => {
            if (element_or_component !== get_value(...parts2)) {
              update2(element_or_component, ...parts2);
              if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
                update2(null, ...old_parts);
              }
            }
          });
        });
        return () => {
          queue_micro_task(() => {
            if (parts2 && is_bound_this(get_value(...parts2), element_or_component)) {
              update2(null, ...parts2);
            }
          });
        };
      });
      return element_or_component;
    }
    function init(immutable = false) {
      const context = (
        /** @type {ComponentContextLegacy} */
        component_context
      );
      const callbacks = context.l.u;
      if (!callbacks) return;
      let props = () => deep_read_state(context.s);
      if (immutable) {
        let version = 0;
        let prev2 = (
          /** @type {Record<string, any>} */
          {}
        );
        const d = /* @__PURE__ */ derived(() => {
          let changed = false;
          const props2 = context.s;
          for (const key2 in props2) {
            if (props2[key2] !== prev2[key2]) {
              prev2[key2] = props2[key2];
              changed = true;
            }
          }
          if (changed) version++;
          return version;
        });
        props = () => get$3(d);
      }
      if (callbacks.b.length) {
        user_pre_effect(() => {
          observe_all(context, props);
          run_all(callbacks.b);
        });
      }
      user_effect(() => {
        const fns = untrack(() => callbacks.m.map(run));
        return () => {
          for (const fn of fns) {
            if (typeof fn === "function") {
              fn();
            }
          }
        };
      });
      if (callbacks.a.length) {
        user_effect(() => {
          observe_all(context, props);
          run_all(callbacks.a);
        });
      }
    }
    function observe_all(context, props) {
      if (context.l.s) {
        for (const signal of context.l.s) get$3(signal);
      }
      props();
    }
    function bubble_event($$props, event2) {
      var events = (
        /** @type {Record<string, Function[] | Function>} */
        $$props.$$events?.[event2.type]
      );
      var callbacks = is_array(events) ? events.slice() : events == null ? [] : [events];
      for (var fn of callbacks) {
        fn.call(this, event2);
      }
    }
    function subscribe_to_store(store, run2, invalidate) {
      if (store == null) {
        run2(void 0);
        return noop$2;
      }
      const unsub = untrack(
        () => store.subscribe(
          run2,
          // @ts-expect-error
          invalidate
        )
      );
      return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    const subscriber_queue = [];
    function writable(value, start2 = noop$2) {
      let stop = null;
      const subscribers = /* @__PURE__ */ new Set();
      function set2(new_value) {
        if (safe_not_equal(value, new_value)) {
          value = new_value;
          if (stop) {
            const run_queue = !subscriber_queue.length;
            for (const subscriber of subscribers) {
              subscriber[1]();
              subscriber_queue.push(subscriber, value);
            }
            if (run_queue) {
              for (let i = 0; i < subscriber_queue.length; i += 2) {
                subscriber_queue[i][0](subscriber_queue[i + 1]);
              }
              subscriber_queue.length = 0;
            }
          }
        }
      }
      function update2(fn) {
        set2(fn(
          /** @type {T} */
          value
        ));
      }
      function subscribe2(run2, invalidate = noop$2) {
        const subscriber = [run2, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
          stop = start2(set2, update2) || noop$2;
        }
        run2(
          /** @type {T} */
          value
        );
        return () => {
          subscribers.delete(subscriber);
          if (subscribers.size === 0 && stop) {
            stop();
            stop = null;
          }
        };
      }
      return { set: set2, update: update2, subscribe: subscribe2 };
    }
    function get$2(store) {
      let value;
      subscribe_to_store(store, (_) => value = _)();
      return value;
    }
    let is_store_binding = false;
    let IS_UNMOUNTED = /* @__PURE__ */ Symbol();
    function store_get(store, store_name, stores) {
      const entry = stores[store_name] ??= {
        store: null,
        source: /* @__PURE__ */ mutable_source(void 0),
        unsubscribe: noop$2
      };
      if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
        entry.unsubscribe();
        entry.store = store ?? null;
        if (store == null) {
          entry.source.v = void 0;
          entry.unsubscribe = noop$2;
        } else {
          var is_synchronous_callback = true;
          entry.unsubscribe = subscribe_to_store(store, (v) => {
            if (is_synchronous_callback) {
              entry.source.v = v;
            } else {
              set$2(entry.source, v);
            }
          });
          is_synchronous_callback = false;
        }
      }
      if (store && IS_UNMOUNTED in stores) {
        return get$2(store);
      }
      return get$3(entry.source);
    }
    function setup_stores() {
      const stores = {};
      function cleanup() {
        teardown(() => {
          for (var store_name in stores) {
            const ref2 = stores[store_name];
            ref2.unsubscribe();
          }
          define_property(stores, IS_UNMOUNTED, {
            enumerable: false,
            value: true
          });
        });
      }
      return [stores, cleanup];
    }
    function capture_store_binding(fn) {
      var previous_is_store_binding = is_store_binding;
      try {
        is_store_binding = false;
        return [fn(), is_store_binding];
      } finally {
        is_store_binding = previous_is_store_binding;
      }
    }
    const rest_props_handler = {
      get(target, key2) {
        if (target.exclude.includes(key2)) return;
        return target.props[key2];
      },
      set(target, key2) {
        return false;
      },
      getOwnPropertyDescriptor(target, key2) {
        if (target.exclude.includes(key2)) return;
        if (key2 in target.props) {
          return {
            enumerable: true,
            configurable: true,
            value: target.props[key2]
          };
        }
      },
      has(target, key2) {
        if (target.exclude.includes(key2)) return false;
        return key2 in target.props;
      },
      ownKeys(target) {
        return Reflect.ownKeys(target.props).filter((key2) => !target.exclude.includes(key2));
      }
    };
    // @__NO_SIDE_EFFECTS__
    function rest_props(props, exclude, name) {
      return new Proxy(
        { props, exclude },
        rest_props_handler
      );
    }
    const legacy_rest_props_handler = {
      get(target, key2) {
        if (target.exclude.includes(key2)) return;
        get$3(target.version);
        return key2 in target.special ? target.special[key2]() : target.props[key2];
      },
      set(target, key2, value) {
        if (!(key2 in target.special)) {
          var previous_effect = active_effect;
          try {
            set_active_effect(target.parent_effect);
            target.special[key2] = prop(
              {
                get [key2]() {
                  return target.props[key2];
                }
              },
              /** @type {string} */
              key2,
              PROPS_IS_UPDATED
            );
          } finally {
            set_active_effect(previous_effect);
          }
        }
        target.special[key2](value);
        update(target.version);
        return true;
      },
      getOwnPropertyDescriptor(target, key2) {
        if (target.exclude.includes(key2)) return;
        if (key2 in target.props) {
          return {
            enumerable: true,
            configurable: true,
            value: target.props[key2]
          };
        }
      },
      deleteProperty(target, key2) {
        if (target.exclude.includes(key2)) return true;
        target.exclude.push(key2);
        update(target.version);
        return true;
      },
      has(target, key2) {
        if (target.exclude.includes(key2)) return false;
        return key2 in target.props;
      },
      ownKeys(target) {
        return Reflect.ownKeys(target.props).filter((key2) => !target.exclude.includes(key2));
      }
    };
    function legacy_rest_props(props, exclude) {
      return new Proxy(
        {
          props,
          exclude,
          special: {},
          version: source(0),
          // TODO this is only necessary because we need to track component
          // destruction inside `prop`, because of `bind:this`, but it
          // seems likely that we can simplify `bind:this` instead
          parent_effect: (
            /** @type {Effect} */
            active_effect
          )
        },
        legacy_rest_props_handler
      );
    }
    const spread_props_handler = {
      get(target, key2) {
        let i = target.props.length;
        while (i--) {
          let p = target.props[i];
          if (is_function(p)) p = p();
          if (typeof p === "object" && p !== null && key2 in p) return p[key2];
        }
      },
      set(target, key2, value) {
        let i = target.props.length;
        while (i--) {
          let p = target.props[i];
          if (is_function(p)) p = p();
          const desc = get_descriptor(p, key2);
          if (desc && desc.set) {
            desc.set(value);
            return true;
          }
        }
        return false;
      },
      getOwnPropertyDescriptor(target, key2) {
        let i = target.props.length;
        while (i--) {
          let p = target.props[i];
          if (is_function(p)) p = p();
          if (typeof p === "object" && p !== null && key2 in p) {
            const descriptor = get_descriptor(p, key2);
            if (descriptor && !descriptor.configurable) {
              descriptor.configurable = true;
            }
            return descriptor;
          }
        }
      },
      has(target, key2) {
        if (key2 === STATE_SYMBOL || key2 === LEGACY_PROPS) return false;
        for (let p of target.props) {
          if (is_function(p)) p = p();
          if (p != null && key2 in p) return true;
        }
        return false;
      },
      ownKeys(target) {
        const keys2 = [];
        for (let p of target.props) {
          if (is_function(p)) p = p();
          if (!p) continue;
          for (const key2 in p) {
            if (!keys2.includes(key2)) keys2.push(key2);
          }
          for (const key2 of Object.getOwnPropertySymbols(p)) {
            if (!keys2.includes(key2)) keys2.push(key2);
          }
        }
        return keys2;
      }
    };
    function spread_props(...props) {
      return new Proxy({ props }, spread_props_handler);
    }
    function prop(props, key2, flags2, fallback) {
      var runes = !legacy_mode_flag || (flags2 & PROPS_IS_RUNES) !== 0;
      var bindable2 = (flags2 & PROPS_IS_BINDABLE) !== 0;
      var lazy = (flags2 & PROPS_IS_LAZY_INITIAL) !== 0;
      var fallback_value = (
        /** @type {V} */
        fallback
      );
      var fallback_dirty = true;
      var get_fallback = () => {
        if (fallback_dirty) {
          fallback_dirty = false;
          fallback_value = lazy ? untrack(
            /** @type {() => V} */
            fallback
          ) : (
            /** @type {V} */
            fallback
          );
        }
        return fallback_value;
      };
      var setter;
      if (bindable2) {
        var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
        setter = get_descriptor(props, key2)?.set ?? (is_entry_props && key2 in props ? (v) => props[key2] = v : void 0);
      }
      var initial_value;
      var is_store_sub = false;
      if (bindable2) {
        [initial_value, is_store_sub] = capture_store_binding(() => (
          /** @type {V} */
          props[key2]
        ));
      } else {
        initial_value = /** @type {V} */
        props[key2];
      }
      if (initial_value === void 0 && fallback !== void 0) {
        initial_value = get_fallback();
        if (setter) {
          if (runes) props_invalid_value();
          setter(initial_value);
        }
      }
      var getter;
      if (runes) {
        getter = () => {
          var value = (
            /** @type {V} */
            props[key2]
          );
          if (value === void 0) return get_fallback();
          fallback_dirty = true;
          return value;
        };
      } else {
        getter = () => {
          var value = (
            /** @type {V} */
            props[key2]
          );
          if (value !== void 0) {
            fallback_value = /** @type {V} */
            void 0;
          }
          return value === void 0 ? fallback_value : value;
        };
      }
      if (runes && (flags2 & PROPS_IS_UPDATED) === 0) {
        return getter;
      }
      if (setter) {
        var legacy_parent = props.$$legacy;
        return (
          /** @type {() => V} */
          (function(value, mutation) {
            if (arguments.length > 0) {
              if (!runes || !mutation || legacy_parent || is_store_sub) {
                setter(mutation ? getter() : value);
              }
              return value;
            }
            return getter();
          })
        );
      }
      var overridden = false;
      var d = ((flags2 & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
        overridden = false;
        return getter();
      });
      if (bindable2) get$3(d);
      var parent_effect = (
        /** @type {Effect} */
        active_effect
      );
      return (
        /** @type {() => V} */
        (function(value, mutation) {
          if (arguments.length > 0) {
            const new_value = mutation ? get$3(d) : runes && bindable2 ? proxy$1(value) : value;
            set$2(d, new_value);
            overridden = true;
            if (fallback_value !== void 0) {
              fallback_value = new_value;
            }
            return value;
          }
          if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
            return d.v;
          }
          return get$3(d);
        })
      );
    }
    var root$j = /* @__PURE__ */ from_html(`<div><h1><strong> </strong> collection</h1></div>`);
    function Show$4($$anchor, $$props) {
      push($$props, true);
      var div = root$j();
      var h1 = child(div);
      var strong = child(h1);
      var text2 = child(strong);
      template_effect(() => set_text(text2, $$props.collection.label));
      append$1($$anchor, div);
      pop();
    }
    const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: Show$4
    }, Symbol.toStringTag, { value: "Module" }));
    var root$i = /* @__PURE__ */ from_html(`<div><h1> </h1></div>`);
    function Error$1($$anchor, $$props) {
      const title = {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden"
      };
      var div = root$i();
      var h1 = child(div);
      var text2 = child(h1);
      template_effect(() => set_text(text2, title[$$props.status]));
      append$1($$anchor, div);
    }
    const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: Error$1
    }, Symbol.toStringTag, { value: "Module" }));
    enable_legacy_mode_flag();
    var root$h = /* @__PURE__ */ from_html(`<div><h1>Not found</h1></div>`);
    function Not_found($$anchor) {
      var div = root$h();
      append$1($$anchor, div);
    }
    const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: Not_found
    }, Symbol.toStringTag, { value: "Module" }));
    var root$g = /* @__PURE__ */ from_html(`<h1> </h1> <!>`, 1);
    function Show$3($$anchor, $$props) {
      push($$props, true);
      var fragment = root$g();
      var h1 = first_child(fragment);
      var text2 = child(h1);
      var node = sibling(h1, 2);
      html(node, () => $$props.content);
      template_effect(() => set_text(text2, $$props.page.label));
      append$1($$anchor, fragment);
      pop();
    }
    const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: Show$3
    }, Symbol.toStringTag, { value: "Module" }));
    function getErrorMessage(hook, provider) {
      return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
    }
    const createContext = (options) => {
      const { name, strict = true, hookName = "useContext", providerName = "Provider", errorMessage, defaultValue } = options;
      const contextId = Symbol(name);
      const provider = (value) => setContext(contextId, value);
      const consumer = () => {
        const exists = hasContext(contextId);
        if (strict && !exists)
          throw new Error(errorMessage ?? getErrorMessage(hookName, providerName));
        return exists ? getContext(contextId) : defaultValue;
      };
      return [provider, consumer, contextId];
    };
    const createSplitProps = () => (props, keys2) => keys2.reduce((previousValue, currentValue) => {
      const [target, source2] = previousValue;
      const key2 = currentValue;
      if (source2[key2] !== void 0) {
        target[key2] = source2[key2];
      }
      delete source2[key2];
      return [target, source2];
    }, [{}, { ...props }]);
    const [RenderStrategyPropsProvider, useRenderStrategyPropsContext] = createContext({
      name: "RenderStrategyContext",
      hookName: "useRenderStrategyContext",
      providerName: "<RenderStrategyPropsProvider />"
    });
    const splitFn$2 = createSplitProps();
    const splitRenderStrategyProps = (props) => splitFn$2(props, ["lazyMount", "unmountOnExit"]);
    var __defProp$1 = Object.defineProperty;
    var __typeError = (msg) => {
      throw TypeError(msg);
    };
    var __defNormalProp$1 = (obj, key2, value) => key2 in obj ? __defProp$1(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    var __publicField$1 = (obj, key2, value) => __defNormalProp$1(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
    var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
    var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), member.get(obj));
    var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    function toArray(v) {
      if (v == null) return [];
      return Array.isArray(v) ? v : [v];
    }
    var first = (v) => v[0];
    var last = (v) => v[v.length - 1];
    var has = (v, t) => v.indexOf(t) !== -1;
    var add = (v, ...items) => v.concat(items);
    var remove$1 = (v, ...items) => v.filter((t) => !items.includes(t));
    var uniq = (v) => Array.from(new Set(v));
    var diff = (a, b) => {
      const set2 = new Set(b);
      return a.filter((t) => !set2.has(t));
    };
    var addOrRemove = (v, item) => has(v, item) ? remove$1(v, item) : add(v, item);
    function nextIndex(v, idx, opts = {}) {
      const { step = 1, loop = true } = opts;
      const next2 = idx + step;
      const len = v.length;
      const last2 = len - 1;
      if (idx === -1) return step > 0 ? 0 : last2;
      if (next2 < 0) return loop ? last2 : 0;
      if (next2 >= len) return loop ? 0 : idx > len ? len : idx;
      return next2;
    }
    function next(v, idx, opts = {}) {
      return v[nextIndex(v, idx, opts)];
    }
    function prevIndex(v, idx, opts = {}) {
      const { step = 1, loop = true } = opts;
      return nextIndex(v, idx, { step: -step, loop });
    }
    function prev(v, index2, opts = {}) {
      return v[prevIndex(v, index2, opts)];
    }
    function partition(arr, fn) {
      return arr.reduce(
        ([pass, fail], value) => {
          if (fn(value)) pass.push(value);
          else fail.push(value);
          return [pass, fail];
        },
        [[], []]
      );
    }
    var isArrayLike = (value) => value?.constructor.name === "Array";
    var isArrayEqual = (a, b) => {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) return false;
      }
      return true;
    };
    var isEqual = (a, b) => {
      if (Object.is(a, b)) return true;
      if (a == null && b != null || a != null && b == null) return false;
      if (typeof a?.isEqual === "function" && typeof b?.isEqual === "function") {
        return a.isEqual(b);
      }
      if (typeof a === "function" && typeof b === "function") {
        return a.toString() === b.toString();
      }
      if (isArrayLike(a) && isArrayLike(b)) {
        return isArrayEqual(Array.from(a), Array.from(b));
      }
      if (!(typeof a === "object") || !(typeof b === "object")) return false;
      const keys2 = Object.keys(b ?? /* @__PURE__ */ Object.create(null));
      const length = keys2.length;
      for (let i = 0; i < length; i++) {
        const hasKey = Reflect.has(a, keys2[i]);
        if (!hasKey) return false;
      }
      for (let i = 0; i < length; i++) {
        const key2 = keys2[i];
        if (!isEqual(a[key2], b[key2])) return false;
      }
      return true;
    };
    var isArray = (v) => Array.isArray(v);
    var isObjectLike = (v) => v != null && typeof v === "object";
    var isObject = (v) => isObjectLike(v) && !isArray(v);
    var isString = (v) => typeof v === "string";
    var isFunction$4 = (v) => typeof v === "function";
    var hasProp = (obj, prop2) => Object.prototype.hasOwnProperty.call(obj, prop2);
    var baseGetTag = (v) => Object.prototype.toString.call(v);
    var fnToString = Function.prototype.toString;
    var objectCtorString = fnToString.call(Object);
    var isPlainObject = (v) => {
      if (!isObjectLike(v) || baseGetTag(v) != "[object Object]" || isFrameworkElement(v)) return false;
      const proto = Object.getPrototypeOf(v);
      if (proto === null) return true;
      const Ctor = hasProp(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString.call(Ctor) == objectCtorString;
    };
    var isReactElement = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
    var isVueElement = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
    var isFrameworkElement = (x) => isReactElement(x) || isVueElement(x);
    var runIfFn$1 = (v, ...a) => {
      const res = typeof v === "function" ? v(...a) : v;
      return res ?? void 0;
    };
    var identity = (v) => v();
    var callAll = (...fns) => (...a) => {
      fns.forEach(function(fn) {
        fn?.(...a);
      });
    };
    var toPx = (v) => typeof v === "number" ? `${v}px` : v;
    function compact(obj) {
      if (!isPlainObject(obj) || obj === void 0) return obj;
      const keys2 = Reflect.ownKeys(obj).filter((key2) => typeof key2 === "string");
      const filtered = {};
      for (const key2 of keys2) {
        const value = obj[key2];
        if (value !== void 0) {
          filtered[key2] = compact(value);
        }
      }
      return filtered;
    }
    var currentTime = () => performance.now();
    var _tick;
    var Timer = class {
      constructor(onTick) {
        this.onTick = onTick;
        __publicField$1(this, "frameId", null);
        __publicField$1(this, "pausedAtMs", null);
        __publicField$1(this, "context");
        __publicField$1(this, "cancelFrame", () => {
          if (this.frameId === null) return;
          cancelAnimationFrame(this.frameId);
          this.frameId = null;
        });
        __publicField$1(this, "setStartMs", (startMs) => {
          this.context.startMs = startMs;
        });
        __publicField$1(this, "start", () => {
          if (this.frameId !== null) return;
          const now = currentTime();
          if (this.pausedAtMs !== null) {
            this.context.startMs += now - this.pausedAtMs;
            this.pausedAtMs = null;
          } else {
            this.context.startMs = now;
          }
          this.frameId = requestAnimationFrame(__privateGet(this, _tick));
        });
        __publicField$1(this, "pause", () => {
          if (this.frameId === null) return;
          this.cancelFrame();
          this.pausedAtMs = currentTime();
        });
        __publicField$1(this, "stop", () => {
          if (this.frameId === null) return;
          this.cancelFrame();
          this.pausedAtMs = null;
        });
        __privateAdd(this, _tick, (now) => {
          this.context.now = now;
          this.context.deltaMs = now - this.context.startMs;
          const shouldContinue = this.onTick(this.context);
          if (shouldContinue === false) {
            this.stop();
            return;
          }
          this.frameId = requestAnimationFrame(__privateGet(this, _tick));
        });
        this.context = { now: 0, startMs: currentTime(), deltaMs: 0 };
      }
      get elapsedMs() {
        if (this.pausedAtMs !== null) {
          return this.pausedAtMs - this.context.startMs;
        }
        return currentTime() - this.context.startMs;
      }
    };
    _tick = /* @__PURE__ */ new WeakMap();
    function setRafTimeout(fn, delayMs) {
      const timer = new Timer(({ deltaMs }) => {
        if (deltaMs >= delayMs) {
          fn();
          return false;
        }
      });
      timer.start();
      return () => timer.stop();
    }
    function warn(...a) {
      a.length === 1 ? a[0] : a[1];
      a.length === 2 ? a[0] : true;
    }
    function ensure(c, m) {
      if (c == null) throw new Error(m());
    }
    function ensureProps(props, keys2, scope) {
      let missingKeys = [];
      for (const key2 of keys2) {
        if (props[key2] == null) missingKeys.push(key2);
      }
      if (missingKeys.length > 0)
        throw new Error(`[zag-js${""}] missing required props: ${missingKeys.join(", ")}`);
    }
    var clsx = (...args) => args.map((str) => str?.trim?.()).filter(Boolean).join(" ");
    var CSS_REGEX$1 = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
    var serialize$1 = (style) => {
      const res = {};
      let match2;
      while (match2 = CSS_REGEX$1.exec(style)) {
        res[match2[1]] = match2[2];
      }
      return res;
    };
    var css = (a, b) => {
      if (isString(a)) {
        if (isString(b)) return `${a};${b}`;
        a = serialize$1(a);
      } else if (isString(b)) {
        b = serialize$1(b);
      }
      return Object.assign({}, a ?? {}, b ?? {});
    };
    function mergeProps$1(...args) {
      let result = {};
      for (let props of args) {
        if (!props) continue;
        for (let key2 in result) {
          if (key2.startsWith("on") && typeof result[key2] === "function" && typeof props[key2] === "function") {
            result[key2] = callAll(props[key2], result[key2]);
            continue;
          }
          if (key2 === "className" || key2 === "class") {
            result[key2] = clsx(result[key2], props[key2]);
            continue;
          }
          if (key2 === "style") {
            result[key2] = css(result[key2], props[key2]);
            continue;
          }
          result[key2] = props[key2] !== void 0 ? props[key2] : result[key2];
        }
        for (let key2 in props) {
          if (result[key2] === void 0) {
            result[key2] = props[key2];
          }
        }
        const symbols = Object.getOwnPropertySymbols(props);
        for (let symbol of symbols) {
          result[symbol] = props[symbol];
        }
      }
      return result;
    }
    var STATE_DELIMITER = ".";
    var ABSOLUTE_PREFIX = "#";
    var stateIndexCache = /* @__PURE__ */ new WeakMap();
    var stateIdIndexCache = /* @__PURE__ */ new WeakMap();
    function joinStatePath(parts2) {
      return parts2.join(STATE_DELIMITER);
    }
    function isAbsoluteStatePath(value) {
      return value.includes(STATE_DELIMITER);
    }
    function isExplicitAbsoluteStatePath(value) {
      return value.startsWith(ABSOLUTE_PREFIX);
    }
    function stripAbsolutePrefix(value) {
      return isExplicitAbsoluteStatePath(value) ? value.slice(ABSOLUTE_PREFIX.length) : value;
    }
    function appendStatePath(base, segment) {
      return base ? `${base}${STATE_DELIMITER}${segment}` : segment;
    }
    function buildStateIndex(machine2) {
      const index2 = /* @__PURE__ */ new Map();
      const idIndex = /* @__PURE__ */ new Map();
      const visit2 = (basePath, state2) => {
        index2.set(basePath, state2);
        const stateId = state2.id;
        if (stateId) {
          if (idIndex.has(stateId)) {
            throw new Error(`Duplicate state id: ${stateId}`);
          }
          idIndex.set(stateId, basePath);
        }
        const childStates = state2.states;
        if (!childStates) return;
        for (const [childKey, childState] of Object.entries(childStates)) {
          if (!childState) continue;
          const childPath = appendStatePath(basePath, childKey);
          visit2(childPath, childState);
        }
      };
      for (const [topKey, topState] of Object.entries(machine2.states)) {
        if (!topState) continue;
        visit2(topKey, topState);
      }
      return { index: index2, idIndex };
    }
    function ensureStateIndex(machine2) {
      const cached = stateIndexCache.get(machine2);
      if (cached) return cached;
      const { index: index2, idIndex } = buildStateIndex(machine2);
      stateIndexCache.set(machine2, index2);
      stateIdIndexCache.set(machine2, idIndex);
      return index2;
    }
    function getStatePathById(machine2, stateId) {
      ensureStateIndex(machine2);
      return stateIdIndexCache.get(machine2)?.get(stateId);
    }
    function toSegments(value) {
      if (!value) return [];
      return String(value).split(STATE_DELIMITER).filter(Boolean);
    }
    function getStateChain(machine2, state2) {
      if (!state2) return [];
      const stateIndex = ensureStateIndex(machine2);
      const segments = toSegments(state2);
      const chain = [];
      const statePath = [];
      for (const segment of segments) {
        statePath.push(segment);
        const path = joinStatePath(statePath);
        const current = stateIndex.get(path);
        if (!current) break;
        chain.push({ path, state: current });
      }
      return chain;
    }
    function resolveAbsoluteStateValue(machine2, value) {
      const stateIndex = ensureStateIndex(machine2);
      const segments = toSegments(value);
      if (!segments.length) return value;
      const resolved = [];
      for (const segment of segments) {
        resolved.push(segment);
        const path = joinStatePath(resolved);
        if (!stateIndex.has(path)) return value;
      }
      let resolvedPath = joinStatePath(resolved);
      let current = stateIndex.get(resolvedPath);
      while (current?.initial) {
        const nextPath = `${resolvedPath}${STATE_DELIMITER}${current.initial}`;
        const nextState = stateIndex.get(nextPath);
        if (!nextState) break;
        resolvedPath = nextPath;
        current = nextState;
      }
      return resolvedPath;
    }
    function hasStatePath(machine2, value) {
      const stateIndex = ensureStateIndex(machine2);
      return stateIndex.has(value);
    }
    function resolveStateValue(machine2, value, source2) {
      const stateValue = String(value);
      if (isExplicitAbsoluteStatePath(stateValue)) {
        const stateId = stripAbsolutePrefix(stateValue);
        const statePath = getStatePathById(machine2, stateId);
        if (!statePath) {
          throw new Error(`Unknown state id: ${stateId}`);
        }
        return resolveAbsoluteStateValue(machine2, statePath);
      }
      if (!isAbsoluteStatePath(stateValue) && source2) {
        const sourceSegments = toSegments(source2);
        for (let index2 = sourceSegments.length; index2 >= 1; index2--) {
          const base = sourceSegments.slice(0, index2).join(STATE_DELIMITER);
          const candidate = appendStatePath(base, stateValue);
          if (hasStatePath(machine2, candidate)) return resolveAbsoluteStateValue(machine2, candidate);
        }
      }
      return resolveAbsoluteStateValue(machine2, stateValue);
    }
    function findTransition(machine2, state2, eventType) {
      const chain = getStateChain(machine2, state2);
      for (let index2 = chain.length - 1; index2 >= 0; index2--) {
        const transitionMap = chain[index2]?.state.on;
        const transition = transitionMap?.[eventType];
        if (transition) return { transitions: transition, source: chain[index2]?.path };
      }
      const rootTransitionMap = machine2.on;
      return { transitions: rootTransitionMap?.[eventType], source: void 0 };
    }
    function getExitEnterStates(machine2, prevState, nextState, reenter) {
      const prevChain = prevState ? getStateChain(machine2, prevState) : [];
      const nextChain = getStateChain(machine2, nextState);
      let commonIndex = 0;
      while (commonIndex < prevChain.length && commonIndex < nextChain.length && prevChain[commonIndex]?.path === nextChain[commonIndex]?.path) {
        commonIndex += 1;
      }
      let exiting = prevChain.slice(commonIndex).reverse();
      let entering = nextChain.slice(commonIndex);
      const sameLeaf = prevChain.at(-1)?.path === nextChain.at(-1)?.path;
      if (reenter && sameLeaf) {
        exiting = prevChain.slice().reverse();
        entering = nextChain;
      }
      return { exiting, entering };
    }
    function matchesState(current, value) {
      if (!current) return false;
      return current === value || current.startsWith(`${value}${STATE_DELIMITER}`);
    }
    function hasTag(machine2, state2, tag) {
      return getStateChain(machine2, state2).some((item) => item.state.tags?.includes(tag));
    }
    function createGuards() {
      return {
        and: (...guards) => {
          return function andGuard(params) {
            return guards.every((str) => params.guard(str));
          };
        },
        or: (...guards) => {
          return function orGuard(params) {
            return guards.some((str) => params.guard(str));
          };
        },
        not: (guard) => {
          return function notGuard(params) {
            return !params.guard(guard);
          };
        }
      };
    }
    function createMachine$1(config2) {
      ensureStateIndex(config2);
      return config2;
    }
    function setup() {
      return {
        guards: createGuards(),
        createMachine: (config2) => {
          return createMachine$1(config2);
        },
        choose: (transitions) => {
          return function chooseFn({ choose }) {
            return choose(transitions)?.actions;
          };
        }
      };
    }
    var MachineStatus = /* @__PURE__ */ ((MachineStatus2) => {
      MachineStatus2["NotStarted"] = "Not Started";
      MachineStatus2["Started"] = "Started";
      MachineStatus2["Stopped"] = "Stopped";
      return MachineStatus2;
    })(MachineStatus || {});
    var INIT_STATE = "__init__";
    var __defProp$2 = Object.defineProperty;
    var __defNormalProp$2 = (obj, key2, value) => key2 in obj ? __defProp$2(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    var __publicField$2 = (obj, key2, value) => __defNormalProp$2(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
    var wrap = (v, idx) => {
      return v.map((_, index2) => v[(Math.max(idx, 0) + index2) % v.length]);
    };
    var noop = () => void 0;
    var isObject$1 = (v) => typeof v === "object" && v !== null;
    var dataAttr = (guard) => guard ? "" : void 0;
    var ariaAttr = (guard) => guard ? "true" : void 0;
    var ELEMENT_NODE = 1;
    var DOCUMENT_NODE = 9;
    var DOCUMENT_FRAGMENT_NODE = 11;
    var isHTMLElement = (el) => isObject$1(el) && el.nodeType === ELEMENT_NODE && typeof el.nodeName === "string";
    var isDocument = (el) => isObject$1(el) && el.nodeType === DOCUMENT_NODE;
    var isWindow = (el) => isObject$1(el) && el === el.window;
    var isNode = (el) => isObject$1(el) && el.nodeType !== void 0;
    var isShadowRoot = (el) => isNode(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in el;
    var isInputElement = (el) => isHTMLElement(el) && el.localName === "input";
    var isAnchorElement = (el) => !!el?.matches("a[href]");
    var isElementVisible = (el) => {
      if (!isHTMLElement(el)) return false;
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
    };
    function isActiveElement(element2) {
      if (!element2) return false;
      const rootNode = element2.getRootNode();
      return getActiveElement$1(rootNode) === element2;
    }
    var TEXTAREA_SELECT_REGEX = /(textarea|select)/;
    function isEditableElement(el) {
      if (el == null || !isHTMLElement(el)) return false;
      try {
        return isInputElement(el) && el.selectionStart != null || TEXTAREA_SELECT_REGEX.test(el.localName) || el.isContentEditable || el.getAttribute("contenteditable") === "true" || el.getAttribute("contenteditable") === "";
      } catch {
        return false;
      }
    }
    function contains(parent, child2) {
      if (!parent || !child2) return false;
      if (!isHTMLElement(parent) || !isHTMLElement(child2)) return false;
      const rootNode = child2.getRootNode?.();
      if (parent === child2) return true;
      if (parent.contains(child2)) return true;
      if (rootNode && isShadowRoot(rootNode)) {
        let next2 = child2;
        while (next2) {
          if (parent === next2) return true;
          next2 = next2.parentNode || next2.host;
        }
      }
      return false;
    }
    function getDocument(el) {
      if (isDocument(el)) return el;
      if (isWindow(el)) return el.document;
      return el?.ownerDocument ?? document;
    }
    function getWindow(el) {
      if (isShadowRoot(el)) return getWindow(el.host);
      if (isDocument(el)) return el.defaultView ?? window;
      if (isHTMLElement(el)) return el.ownerDocument?.defaultView ?? window;
      return window;
    }
    function getActiveElement$1(rootNode) {
      let activeElement = rootNode.activeElement;
      while (activeElement?.shadowRoot) {
        const el = activeElement.shadowRoot.activeElement;
        if (!el || el === activeElement) break;
        else activeElement = el;
      }
      return activeElement;
    }
    var styleCache = /* @__PURE__ */ new WeakMap();
    function getComputedStyle$1(el) {
      if (!styleCache.has(el)) {
        styleCache.set(el, getWindow(el).getComputedStyle(el));
      }
      return styleCache.get(el);
    }
    var isDom = () => typeof document !== "undefined";
    function getPlatform() {
      const agent = navigator.userAgentData;
      return agent?.platform ?? navigator.platform;
    }
    function getUserAgent() {
      const ua2 = navigator.userAgentData;
      if (ua2 && Array.isArray(ua2.brands)) {
        return ua2.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ");
      }
      return navigator.userAgent;
    }
    var pt = (v) => isDom() && v.test(getPlatform());
    var ua = (v) => isDom() && v.test(getUserAgent());
    var vn = (v) => isDom() && v.test(navigator.vendor);
    var isIPhone = () => pt(/^iPhone/i);
    var isIPad = () => pt(/^iPad/i) || isMac() && navigator.maxTouchPoints > 1;
    var isIos = () => isIPhone() || isIPad();
    var isApple = () => isMac() || isIos();
    var isMac = () => pt(/^Mac/i);
    var isSafari = () => isApple() && vn(/apple/i);
    var isFirefox$1 = () => ua(/Firefox/i);
    function getComposedPath(event2) {
      return event2.composedPath?.() ?? event2.nativeEvent?.composedPath?.();
    }
    function getEventTarget(event2) {
      const composedPath = getComposedPath(event2);
      return composedPath?.[0] ?? event2.target;
    }
    function isOpeningInNewTab(event2) {
      const element2 = event2.currentTarget;
      if (!element2) return false;
      const validElement = element2.matches("a[href], button[type='submit'], input[type='submit']");
      if (!validElement) return false;
      const isMiddleClick = event2.button === 1;
      const isModKeyClick = isCtrlOrMetaKey(event2);
      return isMiddleClick || isModKeyClick;
    }
    function isComposingEvent(event2) {
      return getNativeEvent(event2).isComposing || event2.keyCode === 229;
    }
    function isCtrlOrMetaKey(e) {
      if (isMac()) return e.metaKey;
      return e.ctrlKey;
    }
    var isLeftClick = (e) => e.button === 0;
    var isModifierKey = (e) => e.ctrlKey || e.altKey || e.metaKey;
    var isTouchEvent = (event2) => "touches" in event2 && event2.touches.length > 0;
    var keyMap = {
      Up: "ArrowUp",
      Down: "ArrowDown",
      Esc: "Escape",
      " ": "Space",
      ",": "Comma",
      Left: "ArrowLeft",
      Right: "ArrowRight"
    };
    var rtlKeyMap = {
      ArrowLeft: "ArrowRight",
      ArrowRight: "ArrowLeft"
    };
    function getEventKey(event2, options = {}) {
      const { dir = "ltr", orientation = "horizontal" } = options;
      let key2 = event2.key;
      key2 = keyMap[key2] ?? key2;
      const isRtl = dir === "rtl" && orientation === "horizontal";
      if (isRtl && key2 in rtlKeyMap) key2 = rtlKeyMap[key2];
      return key2;
    }
    function getNativeEvent(event2) {
      return event2.nativeEvent ?? event2;
    }
    function getEventPoint(event2, type2 = "client") {
      const point = isTouchEvent(event2) ? event2.touches[0] || event2.changedTouches[0] : event2;
      return { x: point[`${type2}X`], y: point[`${type2}Y`] };
    }
    var addDomEvent = (target, eventName, handler, options) => {
      const node = typeof target === "function" ? target() : target;
      node?.addEventListener(eventName, handler, options);
      return () => {
        node?.removeEventListener(eventName, handler, options);
      };
    };
    function getDescriptor(el, options) {
      const { type: type2 = "HTMLInputElement", property = "value" } = options;
      const proto = getWindow(el)[type2].prototype;
      return Object.getOwnPropertyDescriptor(proto, property) ?? {};
    }
    function getElementType(el) {
      if (el.localName === "input") return "HTMLInputElement";
      if (el.localName === "textarea") return "HTMLTextAreaElement";
      if (el.localName === "select") return "HTMLSelectElement";
    }
    function setElementValue(el, value, property = "value") {
      if (!el) return;
      const type2 = getElementType(el);
      if (type2) {
        const descriptor = getDescriptor(el, { type: type2, property });
        descriptor.set?.call(el, value);
      }
      el.setAttribute(property, value);
    }
    var isFrame = (el) => isHTMLElement(el) && el.tagName === "IFRAME";
    function parseTabIndex(el) {
      const attr = el.getAttribute("tabindex");
      if (!attr) return NaN;
      return parseInt(attr, 10);
    }
    var hasNegativeTabIndex = (el) => parseTabIndex(el) < 0;
    function getShadowRootForNode(element2, getShadowRoot) {
      if (!getShadowRoot) return null;
      if (getShadowRoot === true) {
        return element2.shadowRoot || null;
      }
      const result = getShadowRoot(element2);
      return (result === true ? element2.shadowRoot : result) || null;
    }
    function collectElementsWithShadowDOM(elements, getShadowRoot, filterFn) {
      const allElements = [...elements];
      const toProcess = [...elements];
      const processed = /* @__PURE__ */ new Set();
      const positionMap = /* @__PURE__ */ new Map();
      elements.forEach((el, i) => positionMap.set(el, i));
      let processIndex = 0;
      while (processIndex < toProcess.length) {
        const element2 = toProcess[processIndex++];
        if (!element2 || processed.has(element2)) continue;
        processed.add(element2);
        const shadowRoot = getShadowRootForNode(element2, getShadowRoot);
        if (shadowRoot) {
          const shadowElements = Array.from(shadowRoot.querySelectorAll(focusableSelector)).filter(filterFn);
          const hostIndex = positionMap.get(element2);
          if (hostIndex !== void 0) {
            const insertPosition = hostIndex + 1;
            allElements.splice(insertPosition, 0, ...shadowElements);
            shadowElements.forEach((el, i) => {
              positionMap.set(el, insertPosition + i);
            });
            for (let i = insertPosition + shadowElements.length; i < allElements.length; i++) {
              positionMap.set(allElements[i], i);
            }
          } else {
            const insertPosition = allElements.length;
            allElements.push(...shadowElements);
            shadowElements.forEach((el, i) => {
              positionMap.set(el, insertPosition + i);
            });
          }
          toProcess.push(...shadowElements);
        }
      }
      return allElements;
    }
    var focusableSelector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
    var getFocusables = (container, options = {}) => {
      if (!container) return [];
      const { includeContainer = false, getShadowRoot } = options;
      const elements = Array.from(container.querySelectorAll(focusableSelector));
      const include = includeContainer == true || includeContainer == "if-empty" && elements.length === 0;
      if (include && isHTMLElement(container) && isFocusable(container)) {
        elements.unshift(container);
      }
      const focusableElements = [];
      for (const element2 of elements) {
        if (!isFocusable(element2)) continue;
        if (isFrame(element2) && element2.contentDocument) {
          const frameBody = element2.contentDocument.body;
          focusableElements.push(...getFocusables(frameBody, { getShadowRoot }));
          continue;
        }
        focusableElements.push(element2);
      }
      if (getShadowRoot) {
        return collectElementsWithShadowDOM(focusableElements, getShadowRoot, isFocusable);
      }
      return focusableElements;
    };
    function isFocusable(element2) {
      if (!isHTMLElement(element2) || element2.closest("[inert]")) return false;
      return element2.matches(focusableSelector) && isElementVisible(element2);
    }
    function getTabbables(container, options = {}) {
      if (!container) return [];
      const { includeContainer, getShadowRoot } = options;
      const elements = Array.from(container.querySelectorAll(focusableSelector));
      if (includeContainer && isTabbable(container)) {
        elements.unshift(container);
      }
      const tabbableElements = [];
      for (const element2 of elements) {
        if (!isTabbable(element2)) continue;
        if (isFrame(element2) && element2.contentDocument) {
          const frameBody = element2.contentDocument.body;
          tabbableElements.push(...getTabbables(frameBody, { getShadowRoot }));
          continue;
        }
        tabbableElements.push(element2);
      }
      if (getShadowRoot) {
        const allElements = collectElementsWithShadowDOM(tabbableElements, getShadowRoot, isTabbable);
        if (!allElements.length && includeContainer) {
          return elements;
        }
        return allElements;
      }
      if (!tabbableElements.length && includeContainer) {
        return elements;
      }
      return tabbableElements;
    }
    function isTabbable(el) {
      if (isHTMLElement(el) && el.tabIndex > 0) return true;
      return isFocusable(el) && !hasNegativeTabIndex(el);
    }
    var AnimationFrame = class _AnimationFrame {
      constructor() {
        __publicField$2(this, "id", null);
        __publicField$2(this, "fn_cleanup");
        __publicField$2(this, "cleanup", () => {
          this.cancel();
        });
      }
      static create() {
        return new _AnimationFrame();
      }
      request(fn) {
        this.cancel();
        this.id = globalThis.requestAnimationFrame(() => {
          this.id = null;
          this.fn_cleanup = fn?.();
        });
      }
      cancel() {
        if (this.id !== null) {
          globalThis.cancelAnimationFrame(this.id);
          this.id = null;
        }
        this.fn_cleanup?.();
        this.fn_cleanup = void 0;
      }
      isActive() {
        return this.id !== null;
      }
    };
    function raf(fn) {
      const frame = AnimationFrame.create();
      frame.request(fn);
      return frame.cleanup;
    }
    function nextTick(fn) {
      const set2 = /* @__PURE__ */ new Set();
      function raf2(fn2) {
        const id = globalThis.requestAnimationFrame(fn2);
        set2.add(() => globalThis.cancelAnimationFrame(id));
      }
      raf2(() => raf2(fn));
      return function cleanup() {
        set2.forEach((fn2) => fn2());
      };
    }
    function queueBeforeEvent(el, type2, cb) {
      const cancelTimer = raf(() => {
        el.removeEventListener(type2, exec, true);
        cb();
      });
      const exec = () => {
        cancelTimer();
        cb();
      };
      el.addEventListener(type2, exec, { once: true, capture: true });
      return cancelTimer;
    }
    function observeChildrenImpl(node, options) {
      const { callback: fn } = options;
      if (!node) return;
      const win = node.ownerDocument.defaultView || window;
      const obs = new win.MutationObserver(fn);
      obs.observe(node, { childList: true, subtree: true });
      return () => obs.disconnect();
    }
    function observeChildren(nodeOrFn, options) {
      const { defer } = options;
      const func = defer ? raf : (v) => v();
      const cleanups = [];
      cleanups.push(
        func(() => {
          const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
          cleanups.push(observeChildrenImpl(node, options));
        })
      );
      return () => {
        cleanups.forEach((fn) => fn?.());
      };
    }
    function clickIfLink(el) {
      const click = () => {
        const win = getWindow(el);
        el.dispatchEvent(new win.MouseEvent("click"));
      };
      if (isFirefox$1()) {
        queueBeforeEvent(el, "keyup", click);
      } else {
        queueMicrotask(click);
      }
    }
    var state = "default";
    var userSelect = "";
    var elementMap = /* @__PURE__ */ new WeakMap();
    function disableTextSelectionImpl(options = {}) {
      const { target, doc } = options;
      const docNode = doc ?? document;
      const rootEl = docNode.documentElement;
      if (isIos()) {
        if (state === "default") {
          userSelect = rootEl.style.webkitUserSelect;
          rootEl.style.webkitUserSelect = "none";
        }
        state = "disabled";
      } else if (target) {
        elementMap.set(target, target.style.userSelect);
        target.style.userSelect = "none";
      }
      return () => restoreTextSelection({ target, doc: docNode });
    }
    function restoreTextSelection(options = {}) {
      const { target, doc } = options;
      const docNode = doc ?? document;
      const rootEl = docNode.documentElement;
      if (isIos()) {
        if (state !== "disabled") return;
        state = "restoring";
        setTimeout(() => {
          nextTick(() => {
            if (state === "restoring") {
              if (rootEl.style.webkitUserSelect === "none") {
                rootEl.style.webkitUserSelect = userSelect || "";
              }
              userSelect = "";
              state = "default";
            }
          });
        }, 300);
      } else {
        if (target && elementMap.has(target)) {
          const prevUserSelect = elementMap.get(target);
          if (target.style.userSelect === "none") {
            target.style.userSelect = prevUserSelect ?? "";
          }
          if (target.getAttribute("style") === "") {
            target.removeAttribute("style");
          }
          elementMap.delete(target);
        }
      }
    }
    function disableTextSelection(options = {}) {
      const { defer, target, ...restOptions } = options;
      const func = defer ? raf : (v) => v();
      const cleanups = [];
      cleanups.push(
        func(() => {
          const node = typeof target === "function" ? target() : target;
          cleanups.push(disableTextSelectionImpl({ ...restOptions, target: node }));
        })
      );
      return () => {
        cleanups.forEach((fn) => fn?.());
      };
    }
    function trackPointerMove(doc, handlers) {
      const { onPointerMove, onPointerUp } = handlers;
      const handleMove = (event2) => {
        const point = getEventPoint(event2);
        const distance = Math.sqrt(point.x ** 2 + point.y ** 2);
        const moveBuffer = event2.pointerType === "touch" ? 10 : 5;
        if (distance < moveBuffer) return;
        if (event2.pointerType === "mouse" && event2.buttons === 0) {
          handleUp(event2);
          return;
        }
        onPointerMove({ point, event: event2 });
      };
      const handleUp = (event2) => {
        const point = getEventPoint(event2);
        onPointerUp({ point, event: event2 });
      };
      const cleanups = [
        addDomEvent(doc, "pointermove", handleMove, false),
        addDomEvent(doc, "pointerup", handleUp, false),
        addDomEvent(doc, "pointercancel", handleUp, false),
        addDomEvent(doc, "contextmenu", handleUp, false),
        disableTextSelection({ doc })
      ];
      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }
    function queryAll(root2, selector) {
      return Array.from(root2?.querySelectorAll(selector) ?? []);
    }
    var defaultItemToId = (v) => v.id;
    function itemById(v, id, itemToId = defaultItemToId) {
      return v.find((item) => itemToId(item) === id);
    }
    function indexOfId(v, id, itemToId = defaultItemToId) {
      const item = itemById(v, id, itemToId);
      return item ? v.indexOf(item) : -1;
    }
    function nextById(v, id, loop = true) {
      let idx = indexOfId(v, id);
      idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
      return v[idx];
    }
    function prevById(v, id, loop = true) {
      let idx = indexOfId(v, id);
      if (idx === -1) return loop ? v[v.length - 1] : null;
      idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
      return v[idx];
    }
    function createSharedResizeObserver(options) {
      const listeners2 = /* @__PURE__ */ new WeakMap();
      let observer;
      const entries = /* @__PURE__ */ new WeakMap();
      const getObserver = (win) => {
        if (observer) return observer;
        observer = new win.ResizeObserver((observedEntries) => {
          for (const entry of observedEntries) {
            entries.set(entry.target, entry);
            const elementListeners = listeners2.get(entry.target);
            if (elementListeners) {
              for (const listener of elementListeners) {
                listener(entry);
              }
            }
          }
        });
        return observer;
      };
      const observe = (element2, listener) => {
        let elementListeners = listeners2.get(element2) || /* @__PURE__ */ new Set();
        elementListeners.add(listener);
        listeners2.set(element2, elementListeners);
        const win = getWindow(element2);
        getObserver(win).observe(element2, options);
        return () => {
          const elementListeners2 = listeners2.get(element2);
          if (!elementListeners2) return;
          elementListeners2.delete(listener);
          if (elementListeners2.size === 0) {
            listeners2.delete(element2);
            getObserver(win).unobserve(element2);
          }
        };
      };
      const unobserve = (element2) => {
        listeners2.delete(element2);
        observer?.unobserve(element2);
      };
      return {
        observe,
        unobserve
      };
    }
    var resizeObserverBorderBox = /* @__PURE__ */ createSharedResizeObserver({
      box: "border-box"
    });
    var sanitize = (str) => str.split("").map((char) => {
      const code = char.charCodeAt(0);
      if (code > 0 && code < 128) return char;
      if (code >= 128 && code <= 255) return `/x${code.toString(16)}`.replace("/", "\\");
      return "";
    }).join("").trim();
    var getValueText = (el) => {
      return sanitize(el.dataset?.valuetext ?? el.textContent ?? "");
    };
    var match = (valueText, query) => {
      return valueText.trim().toLowerCase().startsWith(query.toLowerCase());
    };
    function getByText(v, text2, currentId, itemToId = defaultItemToId) {
      const index2 = currentId ? indexOfId(v, currentId, itemToId) : -1;
      let items = currentId ? wrap(v, index2) : v;
      const isSingleKey = text2.length === 1;
      if (isSingleKey) {
        items = items.filter((item) => itemToId(item) !== currentId);
      }
      return items.find((item) => match(getValueText(item), text2));
    }
    function setAttribute(el, attr, v) {
      const prev2 = el.getAttribute(attr);
      const exists = prev2 != null;
      if (prev2 === v) return noop;
      el.setAttribute(attr, v);
      return () => {
        if (!exists) {
          el.removeAttribute(attr);
        } else {
          el.setAttribute(attr, prev2);
        }
      };
    }
    function setStyle(el, style) {
      if (!el) return noop;
      const prev2 = Object.keys(style).reduce((acc, key2) => {
        acc[key2] = el.style.getPropertyValue(key2);
        return acc;
      }, {});
      if (isEqual$1(prev2, style)) return noop;
      Object.assign(el.style, style);
      return () => {
        Object.assign(el.style, prev2);
        if (el.style.length === 0) {
          el.removeAttribute("style");
        }
      };
    }
    function isEqual$1(a, b) {
      return Object.keys(a).every((key2) => a[key2] === b[key2]);
    }
    function getByTypeaheadImpl(baseItems, options) {
      const { state: state2, activeId, key: key2, timeout = 350, itemToId } = options;
      const search = state2.keysSoFar + key2;
      const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
      const query = isRepeated ? search[0] : search;
      let items = baseItems.slice();
      const next2 = getByText(items, query, activeId, itemToId);
      function cleanup() {
        clearTimeout(state2.timer);
        state2.timer = -1;
      }
      function update2(value) {
        state2.keysSoFar = value;
        cleanup();
        if (value !== "") {
          state2.timer = +setTimeout(() => {
            update2("");
            cleanup();
          }, timeout);
        }
      }
      update2(search);
      return next2;
    }
    var getByTypeahead = /* @__PURE__ */ Object.assign(getByTypeaheadImpl, {
      defaultOptions: { keysSoFar: "", timer: -1 },
      isValidEvent: isValidTypeaheadEvent
    });
    function isValidTypeaheadEvent(event2) {
      return event2.key.length === 1 && !event2.ctrlKey && !event2.metaKey;
    }
    function createScope(props) {
      const getRootNode = () => props.getRootNode?.() ?? document;
      const getDoc = () => getDocument(getRootNode());
      const getWin = () => getDoc().defaultView ?? window;
      const getActiveElementFn = () => getActiveElement$1(getRootNode());
      const getById = (id) => getRootNode().getElementById(id);
      return {
        ...props,
        getRootNode,
        getDoc,
        getWin,
        getActiveElement: getActiveElementFn,
        isActiveElement,
        getById
      };
    }
    function createNormalizer(fn) {
      return new Proxy({}, {
        get(_target, key2) {
          if (key2 === "style")
            return (props) => {
              return fn({ style: props }).style;
            };
          return fn;
        }
      });
    }
    const propMap = {
      className: "class",
      defaultChecked: "checked",
      defaultValue: "value",
      htmlFor: "for",
      onBlur: "onfocusout",
      onChange: "oninput",
      onFocus: "onfocusin",
      onDoubleClick: "ondblclick"
    };
    function toStyleString(style) {
      let string = "";
      for (let key2 in style) {
        const value = style[key2];
        if (value === null || value === void 0)
          continue;
        if (!key2.startsWith("--"))
          key2 = key2.replace(/[A-Z]/g, (match2) => `-${match2.toLowerCase()}`);
        string += `${key2}:${value};`;
      }
      return string;
    }
    const preserveKeys = new Set("viewBox,className,preserveAspectRatio,fillRule,clipPath,clipRule,strokeWidth,strokeLinecap,strokeLinejoin,strokeDasharray,strokeDashoffset,strokeMiterlimit".split(","));
    function toSvelteProp(key2) {
      if (key2 in propMap)
        return propMap[key2];
      if (preserveKeys.has(key2))
        return key2;
      return key2.toLowerCase();
    }
    function toSveltePropValue(key2, value) {
      if (key2 === "style" && typeof value === "object")
        return toStyleString(value);
      return value;
    }
    const normalizeProps = createNormalizer((props) => {
      const normalized = {};
      for (const key2 in props) {
        normalized[toSvelteProp(key2)] = toSveltePropValue(key2, props[key2]);
      }
      return normalized;
    });
    const CSS_REGEX = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
    const serialize = (style) => {
      const res = {};
      let match2;
      while (match2 = CSS_REGEX.exec(style)) {
        res[match2[1]] = match2[2];
      }
      return res;
    };
    function mergeProps(...args) {
      const classNames = [];
      for (const props of args) {
        if (!props)
          continue;
        if ("class" in props && props.class != null) {
          classNames.push(props.class);
        }
      }
      const merged = mergeProps$1(...args);
      if (classNames.length > 0) {
        merged.class = classNames.length === 1 ? classNames[0] : classNames;
      }
      if ("style" in merged) {
        if (typeof merged.style === "string") {
          merged.style = serialize(merged.style);
        }
        merged.style = toStyleString(merged.style);
      }
      return merged;
    }
    function bindable(props) {
      const initial = props().defaultValue ?? props().value;
      const eq2 = props().isEqual ?? Object.is;
      let value = /* @__PURE__ */ state$1(proxy$1(initial));
      const controlled = /* @__PURE__ */ user_derived(() => props().value !== void 0);
      let valueRef = { current: untrack(() => get$3(value)) };
      let prevValue = { current: void 0 };
      user_pre_effect(() => {
        const v = get$3(controlled) ? props().value : get$3(value);
        valueRef = { current: v };
        prevValue = { current: v };
      });
      const setValueFn = (v) => {
        const next2 = isFunction$4(v) ? v(valueRef.current) : v;
        const prev2 = prevValue.current;
        if (props().debug) {
          console.log(`[bindable > ${props().debug}] setValue`, { next: next2, prev: prev2 });
        }
        if (!get$3(controlled)) set$2(value, next2, true);
        if (!eq2(next2, prev2)) {
          props().onChange?.(next2, prev2);
        }
      };
      function get2() {
        return get$3(controlled) ? props().value : get$3(value);
      }
      return {
        initial,
        ref: valueRef,
        get: get2,
        set(val) {
          const exec = props().sync ? flushSync : identity;
          untrack(() => exec(() => setValueFn(val)));
        },
        invoke(nextValue, prevValue2) {
          props().onChange?.(nextValue, prevValue2);
        },
        hash(value2) {
          return props().hash?.(value2) ?? String(value2);
        }
      };
    }
    bindable.cleanup = (fn) => {
      onDestroy(() => fn());
    };
    bindable.ref = (defaultValue) => {
      let value = defaultValue;
      return {
        get: () => value,
        set: (next2) => {
          value = next2;
        }
      };
    };
    function useRefs(refs) {
      const ref2 = { current: refs };
      return {
        get(key2) {
          return ref2.current[key2];
        },
        set(key2, value) {
          ref2.current[key2] = value;
        }
      };
    }
    const access$2 = (value) => {
      if (typeof value === "function") return value();
      return value;
    };
    const track = (deps, effect2) => {
      let prevDeps = [];
      let isFirstRun = true;
      user_effect(() => {
        if (isFirstRun) {
          prevDeps = deps.map((d) => access$2(d));
          isFirstRun = false;
          return;
        }
        let changed = false;
        for (let i = 0; i < deps.length; i++) {
          if (!isEqual(prevDeps[i], access$2(deps[i]))) {
            changed = true;
            break;
          }
        }
        if (changed) {
          prevDeps = deps.map((d) => access$2(d));
          effect2();
        }
      });
    };
    function access$1(userProps) {
      if (isFunction$4(userProps)) return userProps();
      return userProps;
    }
    function useMachine(machine2, userProps) {
      const scope = /* @__PURE__ */ user_derived(() => {
        const { id, ids, getRootNode } = access$1(userProps);
        return createScope({ id, ids, getRootNode });
      });
      const debug = (...args) => {
        if (machine2.debug) console.log(...args);
      };
      const props = /* @__PURE__ */ user_derived(() => machine2.props?.({ props: compact(access$1(userProps)), scope: get$3(scope) }) ?? access$1(userProps));
      const prop2 = useProp(() => get$3(props));
      const context = machine2.context?.({
        prop: prop2,
        bindable,
        get scope() {
          return get$3(scope);
        },
        flush,
        getContext() {
          return ctx;
        },
        getComputed() {
          return computed;
        },
        getRefs() {
          return refs;
        },
        getEvent() {
          return getEvent();
        }
      });
      const ctx = {
        get(key2) {
          return context?.[key2].get();
        },
        set(key2, value) {
          context?.[key2].set(value);
        },
        initial(key2) {
          return context?.[key2].initial;
        },
        hash(key2) {
          const current = context?.[key2].get();
          return context?.[key2].hash(current);
        }
      };
      let effects = /* @__PURE__ */ new Map();
      let transitionRef = { current: null };
      let previousEventRef = { current: null };
      let eventRef = { current: { type: "" } };
      const getEvent = () => ({
        ...eventRef.current,
        current() {
          return eventRef.current;
        },
        previous() {
          return previousEventRef.current;
        }
      });
      const getState = () => ({
        ...state2,
        hasTag(tag) {
          const currentState = state2.get();
          return hasTag(machine2, currentState, tag);
        },
        matches(...values) {
          const currentState = state2.get();
          return values.some((value) => matchesState(currentState, value));
        }
      });
      const refs = useRefs(machine2.refs?.({ prop: prop2, context: ctx }) ?? {});
      const getParams = () => ({
        state: getState(),
        context: ctx,
        event: getEvent(),
        prop: prop2,
        send,
        action: action2,
        guard,
        track,
        refs,
        computed,
        flush,
        scope: get$3(scope),
        choose
      });
      const action2 = (keys2) => {
        const strs = isFunction$4(keys2) ? keys2(getParams()) : keys2;
        if (!strs) return;
        const fns = strs.map((s) => {
          const fn = machine2.implementations?.actions?.[s];
          if (!fn) warn(`[zag-js] No implementation found for action "${JSON.stringify(s)}"`);
          return fn;
        });
        for (const fn of fns) {
          fn?.(getParams());
        }
      };
      const guard = (str) => {
        if (isFunction$4(str)) return str(getParams());
        return machine2.implementations?.guards?.[str](getParams());
      };
      const effect2 = (keys2) => {
        const strs = isFunction$4(keys2) ? keys2(getParams()) : keys2;
        if (!strs) return;
        const fns = strs.map((s) => {
          const fn = machine2.implementations?.effects?.[s];
          if (!fn) warn(`[zag-js] No implementation found for effect "${JSON.stringify(s)}"`);
          return fn;
        });
        const cleanups = [];
        for (const fn of fns) {
          const cleanup = fn?.(getParams());
          if (cleanup) cleanups.push(cleanup);
        }
        return () => cleanups.forEach((fn) => fn?.());
      };
      const choose = (transitions) => {
        return toArray(transitions).find((t) => {
          let result = !t.guard;
          if (isString(t.guard)) result = !!guard(t.guard);
          else if (isFunction$4(t.guard)) result = t.guard(getParams());
          return result;
        });
      };
      const computed = (key2) => {
        ensure(machine2.computed, () => `[zag-js] No computed object found on machine`);
        const fn = machine2.computed[key2];
        return fn({
          context: ctx,
          event: getEvent(),
          prop: prop2,
          refs,
          scope: get$3(scope),
          computed
        });
      };
      const state2 = bindable(() => ({
        defaultValue: resolveStateValue(machine2, machine2.initialState({ prop: prop2 })),
        onChange(nextState, prevState) {
          const { exiting, entering } = getExitEnterStates(machine2, prevState, nextState, transitionRef.current?.reenter);
          exiting.forEach((item) => {
            const exitEffects = effects.get(item.path);
            exitEffects?.();
            effects.delete(item.path);
          });
          exiting.forEach((item) => {
            action2(item.state?.exit);
          });
          action2(transitionRef.current?.actions);
          entering.forEach((item) => {
            const cleanup = effect2(item.state?.effects);
            if (cleanup) effects.set(item.path, cleanup);
          });
          if (prevState === INIT_STATE) {
            action2(machine2.entry);
            const cleanup = effect2(machine2.effects);
            if (cleanup) effects.set(INIT_STATE, cleanup);
          }
          entering.forEach((item) => {
            action2(item.state?.entry);
          });
        }
      }));
      let status2 = MachineStatus.NotStarted;
      onMount(() => {
        const started = status2 === MachineStatus.Started;
        status2 = MachineStatus.Started;
        debug(started ? "rehydrating..." : "initializing...");
        state2.invoke(state2.initial, INIT_STATE);
      });
      onDestroy(() => {
        debug("unmounting...");
        status2 = MachineStatus.Stopped;
        effects.forEach((fn) => fn?.());
        effects = /* @__PURE__ */ new Map();
        transitionRef.current = null;
        action2(machine2.exit);
      });
      const send = (event2) => {
        if (status2 !== MachineStatus.Started) return;
        previousEventRef.current = eventRef.current;
        eventRef.current = event2;
        let currentState = state2.get();
        const { transitions, source: source2 } = findTransition(machine2, currentState, event2.type);
        const transition = choose(transitions);
        if (!transition) return;
        transitionRef.current = transition;
        const target = resolveStateValue(machine2, transition.target ?? currentState, source2);
        debug("transition", event2.type, transition.target || currentState, `(${transition.actions})`);
        const changed = target !== currentState;
        if (changed) {
          state2.set(target);
        } else if (transition.reenter) {
          state2.invoke(currentState, currentState);
        } else {
          action2(transition.actions);
        }
      };
      machine2.watch?.(getParams());
      return {
        get state() {
          return getState();
        },
        send,
        context: ctx,
        prop: prop2,
        get scope() {
          return get$3(scope);
        },
        refs,
        computed,
        get event() {
          return getEvent();
        },
        getStatus: () => status2
      };
    }
    function useProp(value) {
      return function get2(key2) {
        return value()[key2];
      };
    }
    function flush(fn) {
      flushSync(() => {
        queueMicrotask(() => fn());
      });
    }
    const voidSVGTags = ["path", "rect", "circle", "ellipse", "line", "polygon", "polyline"];
    const isVoidSVGTag = (tag) => typeof tag === "string" && voidSVGTags.includes(tag);
    const voidHTMLTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link"];
    const isVoidHTMLTag = (tag) => typeof tag === "string" && voidHTMLTags.includes(tag);
    function Svg_factory($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "as", "ref"]);
      var fragment = comment();
      var node = first_child(fragment);
      element(node, () => $$props.as, true, ($$element, $$anchor2) => {
        bind_this($$element, ($$value) => ref2($$value), () => ref2());
        attribute_effect($$element, () => ({ ...props }));
      });
      append$1($$anchor, fragment);
      pop();
    }
    var root_4$1 = /* @__PURE__ */ from_html(`<textarea></textarea>`);
    function Factory($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), rest = /* @__PURE__ */ rest_props($$props, [
        "$$slots",
        "$$events",
        "$$legacy",
        "asChild",
        "children",
        "as",
        "ref"
      ]);
      const propsFn = (props) => mergeProps(rest, props ?? {});
      var fragment = comment();
      var node = first_child(fragment);
      {
        var consequent = ($$anchor2) => {
          var fragment_1 = comment();
          var node_1 = first_child(fragment_1);
          snippet(node_1, () => $$props.asChild ?? noop$2, () => propsFn);
          append$1($$anchor2, fragment_1);
        };
        var consequent_1 = ($$anchor2) => {
          Svg_factory($$anchor2, spread_props(
            {
              get as() {
                return $$props.as;
              }
            },
            () => rest,
            {
              get ref() {
                return ref2();
              },
              set ref($$value) {
                ref2($$value);
              }
            }
          ));
        };
        var d = /* @__PURE__ */ user_derived(() => isVoidSVGTag($$props.as));
        var consequent_2 = ($$anchor2) => {
          var fragment_3 = comment();
          var node_2 = first_child(fragment_3);
          element(node_2, () => $$props.as, false, ($$element, $$anchor3) => {
            bind_this($$element, ($$value) => ref2($$value), () => ref2());
            attribute_effect($$element, () => ({ ...rest }));
          });
          append$1($$anchor2, fragment_3);
        };
        var d_1 = /* @__PURE__ */ user_derived(() => isVoidHTMLTag($$props.as));
        var consequent_3 = ($$anchor2) => {
          var textarea = root_4$1();
          attribute_effect(textarea, () => ({ ...rest }));
          bind_this(textarea, ($$value) => ref2($$value), () => ref2());
          append$1($$anchor2, textarea);
        };
        var alternate = ($$anchor2) => {
          var fragment_4 = comment();
          var node_3 = first_child(fragment_4);
          element(node_3, () => $$props.as, false, ($$element_1, $$anchor3) => {
            bind_this($$element_1, ($$value) => ref2($$value), () => ref2());
            attribute_effect($$element_1, () => ({ ...rest }));
            var fragment_5 = comment();
            var node_4 = first_child(fragment_5);
            snippet(node_4, () => $$props.children ?? noop$2);
            append$1($$anchor3, fragment_5);
          });
          append$1($$anchor2, fragment_4);
        };
        if_block(node, ($$render) => {
          if ($$props.asChild) $$render(consequent);
          else if (get$3(d)) $$render(consequent_1, 1);
          else if (get$3(d_1)) $$render(consequent_2, 2);
          else if ($$props.as === "textarea") $$render(consequent_3, 3);
          else $$render(alternate, false);
        });
      }
      append$1($$anchor, fragment);
      pop();
    }
    const [CollapsibleProvider, useCollapsibleContext] = createContext({
      name: "CollapsibleContext"
    });
    function Collapsible_content($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const collapsible = useCollapsibleContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(collapsible().getContentProps(), props));
      var fragment = comment();
      var node = first_child(fragment);
      {
        var consequent = ($$anchor2) => {
          Factory($$anchor2, spread_props({ as: "div" }, () => get$3(mergedProps), {
            get ref() {
              return ref2();
            },
            set ref($$value) {
              ref2($$value);
            }
          }));
        };
        var d = /* @__PURE__ */ user_derived(() => !collapsible().isUnmounted);
        if_block(node, ($$render) => {
          if (get$3(d)) $$render(consequent);
        });
      }
      append$1($$anchor, fragment);
      pop();
    }
    const splitFn$1 = createSplitProps();
    const splitCollapsibleProps = (props) => splitFn$1(props, [
      "collapsedHeight",
      "collapsedWidth",
      "defaultOpen",
      "disabled",
      "id",
      "ids",
      "lazyMount",
      "onExitComplete",
      "onOpenChange",
      "open",
      "unmountOnExit"
    ]);
    const isFunction = (value) => typeof value === "function";
    const runIfFn = (valueOrFn, ...args) => isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
    const [EnvironmentContextProvider, useEnvironmentContext] = createContext({
      name: "EnvironmentContext",
      strict: false,
      defaultValue: () => ({
        getRootNode: () => document,
        getDocument: () => document,
        getWindow: () => window
      })
    });
    var root_1$a = /* @__PURE__ */ from_html(`<span hidden=""></span>`);
    var root$f = /* @__PURE__ */ from_html(`<!> <!>`, 1);
    function Environment_provider($$anchor, $$props) {
      push($$props, true);
      let spanRef = /* @__PURE__ */ state$1(null);
      const getRootNode = () => runIfFn($$props.value) ?? get$3(spanRef)?.ownerDocument ?? document;
      const environment = /* @__PURE__ */ user_derived(() => ({
        getRootNode,
        getDocument: () => getDocument(getRootNode()),
        getWindow: () => getWindow(getRootNode())
      }));
      EnvironmentContextProvider(() => get$3(environment));
      var fragment = root$f();
      var node = first_child(fragment);
      snippet(node, () => $$props.children ?? noop$2);
      var node_1 = sibling(node, 2);
      {
        var consequent = ($$anchor2) => {
          var span = root_1$a();
          bind_this(span, ($$value) => set$2(spanRef, $$value), () => get$3(spanRef));
          append$1($$anchor2, span);
        };
        if_block(node_1, ($$render) => {
          if (!$$props.value) $$render(consequent);
        });
      }
      append$1($$anchor, fragment);
      pop();
    }
    function i18nCache(Ins) {
      const formatterCache = /* @__PURE__ */ new Map();
      return function create(locale, options) {
        const cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
        if (formatterCache.has(cacheKey)) {
          return formatterCache.get(cacheKey);
        }
        let formatter = new Ins(locale, options);
        formatterCache.set(cacheKey, formatter);
        return formatter;
      };
    }
    var collatorCache = i18nCache(Intl.Collator);
    function createFilter(options) {
      const { locale, ...rest } = options || {};
      const collator = collatorCache(locale || "en-US", { usage: "search", ...rest });
      function normalize(string) {
        string = string.normalize("NFC");
        if (collator.resolvedOptions().ignorePunctuation) {
          string = string.replace(new RegExp("\\p{P}", "gu"), "");
        }
        return string;
      }
      function startsWith(string, substring) {
        if (substring.length === 0) return true;
        string = normalize(string);
        substring = normalize(substring);
        return collator.compare(string.slice(0, substring.length), substring) === 0;
      }
      function endsWith2(string, substring) {
        if (substring.length === 0) return true;
        string = normalize(string);
        substring = normalize(substring);
        return collator.compare(string.slice(-substring.length), substring) === 0;
      }
      function contains2(string, substring) {
        if (substring.length === 0) return true;
        string = normalize(string);
        substring = normalize(substring);
        let scan = 0;
        let sliceLen = substring.length;
        for (; scan + sliceLen <= string.length; scan++) {
          let slice = string.slice(scan, scan + sliceLen);
          if (collator.compare(substring, slice) === 0) {
            return true;
          }
        }
        return false;
      }
      return {
        startsWith,
        endsWith: endsWith2,
        contains: contains2
      };
    }
    const [LocaleContextProvider, useLocaleContext] = createContext({
      name: "LocaleContext",
      strict: false,
      defaultValue: () => ({
        dir: "ltr",
        locale: "en-US"
      })
    });
    function useFilter(inProps) {
      const props = /* @__PURE__ */ user_derived(() => runIfFn$1(inProps));
      const env = useLocaleContext();
      const locale = /* @__PURE__ */ user_derived(() => get$3(props).locale ?? env().locale);
      const filter2 = /* @__PURE__ */ user_derived(() => createFilter({ ...get$3(props), locale: get$3(locale) }));
      return () => get$3(filter2);
    }
    var createAnatomy = (name, parts2 = []) => ({
      parts: (...values) => {
        if (isEmpty(parts2)) {
          return createAnatomy(name, values);
        }
        throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
      },
      extendWith: (...values) => createAnatomy(name, [...parts2, ...values]),
      omit: (...values) => createAnatomy(name, parts2.filter((part) => !values.includes(part))),
      rename: (newName) => createAnatomy(newName, parts2),
      keys: () => parts2,
      build: () => [...new Set(parts2)].reduce(
        (prev2, part) => Object.assign(prev2, {
          [part]: {
            selector: [
              `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
              `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`
            ].join(", "),
            attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) }
          }
        }),
        {}
      )
    });
    var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
    var isEmpty = (v) => v.length === 0;
    var anatomy$1 = createAnatomy("collapsible").parts("root", "trigger", "content", "indicator");
    var parts$1 = anatomy$1.build();
    var getRootId$1 = (ctx) => ctx.ids?.root ?? `collapsible:${ctx.id}`;
    var getContentId = (ctx) => ctx.ids?.content ?? `collapsible:${ctx.id}:content`;
    var getTriggerId = (ctx) => ctx.ids?.trigger ?? `collapsible:${ctx.id}:trigger`;
    var getContentEl = (ctx) => ctx.getById(getContentId(ctx));
    function connect$1(service, normalize) {
      const { state: state2, send, context, scope, prop: prop2 } = service;
      const visible = state2.matches("open") || state2.matches("closing");
      const open = state2.matches("open");
      const closed = state2.matches("closed");
      const { width, height } = context.get("size");
      const disabled = !!prop2("disabled");
      const collapsedHeight = prop2("collapsedHeight");
      const collapsedWidth = prop2("collapsedWidth");
      const hasCollapsedHeight = collapsedHeight != null;
      const hasCollapsedWidth = collapsedWidth != null;
      const hasCollapsedSize = hasCollapsedHeight || hasCollapsedWidth;
      const skip = !context.get("initial") && open;
      return {
        disabled,
        visible,
        open,
        measureSize() {
          send({ type: "size.measure" });
        },
        setOpen(nextOpen) {
          const open2 = state2.matches("open");
          if (open2 === nextOpen) return;
          send({ type: nextOpen ? "open" : "close" });
        },
        getRootProps() {
          return normalize.element({
            ...parts$1.root.attrs,
            "data-state": open ? "open" : "closed",
            dir: prop2("dir"),
            id: getRootId$1(scope)
          });
        },
        getContentProps() {
          return normalize.element({
            ...parts$1.content.attrs,
            id: getContentId(scope),
            "data-collapsible": "",
            "data-state": skip ? void 0 : open ? "open" : "closed",
            "data-disabled": dataAttr(disabled),
            "data-has-collapsed-size": dataAttr(hasCollapsedSize),
            hidden: !visible && !hasCollapsedSize,
            dir: prop2("dir"),
            style: {
              "--height": toPx(height),
              "--width": toPx(width),
              "--collapsed-height": toPx(collapsedHeight),
              "--collapsed-width": toPx(collapsedWidth),
              ...closed && hasCollapsedHeight && {
                overflow: "hidden",
                minHeight: toPx(collapsedHeight),
                maxHeight: toPx(collapsedHeight)
              },
              ...closed && hasCollapsedWidth && {
                overflow: "hidden",
                minWidth: toPx(collapsedWidth),
                maxWidth: toPx(collapsedWidth)
              }
            }
          });
        },
        getTriggerProps() {
          return normalize.element({
            ...parts$1.trigger.attrs,
            id: getTriggerId(scope),
            dir: prop2("dir"),
            type: "button",
            "data-state": open ? "open" : "closed",
            "data-disabled": dataAttr(disabled),
            "aria-controls": getContentId(scope),
            "aria-expanded": visible || false,
            onClick(event2) {
              if (event2.defaultPrevented) return;
              if (disabled) return;
              send({ type: open ? "close" : "open" });
            }
          });
        },
        getIndicatorProps() {
          return normalize.element({
            ...parts$1.indicator.attrs,
            dir: prop2("dir"),
            "data-state": open ? "open" : "closed",
            "data-disabled": dataAttr(disabled)
          });
        }
      };
    }
    var machine$1 = createMachine$1({
      initialState({ prop: prop2 }) {
        const open = prop2("open") || prop2("defaultOpen");
        return open ? "open" : "closed";
      },
      context({ bindable: bindable2 }) {
        return {
          size: bindable2(() => ({
            defaultValue: { height: 0, width: 0 },
            sync: true
          })),
          initial: bindable2(() => ({
            defaultValue: false
          }))
        };
      },
      refs() {
        return {
          cleanup: void 0,
          stylesRef: void 0
        };
      },
      watch({ track: track2, prop: prop2, action: action2 }) {
        track2([() => prop2("open")], () => {
          action2(["setInitial", "computeSize", "toggleVisibility"]);
        });
      },
      exit: ["cleanupNode"],
      states: {
        closed: {
          effects: ["trackTabbableElements"],
          on: {
            "controlled.open": {
              target: "open"
            },
            open: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnOpen"]
              },
              {
                target: "open",
                actions: ["setInitial", "computeSize", "invokeOnOpen"]
              }
            ]
          }
        },
        closing: {
          effects: ["trackExitAnimation"],
          on: {
            "controlled.close": {
              target: "closed"
            },
            "controlled.open": {
              target: "open"
            },
            open: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnOpen"]
              },
              {
                target: "open",
                actions: ["setInitial", "invokeOnOpen"]
              }
            ],
            close: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnExitComplete"]
              },
              {
                target: "closed",
                actions: ["setInitial", "computeSize", "invokeOnExitComplete"]
              }
            ],
            "animation.end": {
              target: "closed",
              actions: ["invokeOnExitComplete", "clearInitial"]
            }
          }
        },
        open: {
          effects: ["trackEnterAnimation"],
          on: {
            "controlled.close": {
              target: "closing"
            },
            close: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnClose"]
              },
              {
                target: "closing",
                actions: ["setInitial", "computeSize", "invokeOnClose"]
              }
            ],
            "size.measure": {
              actions: ["measureSize"]
            },
            "animation.end": {
              actions: ["clearInitial"]
            }
          }
        }
      },
      implementations: {
        guards: {
          isOpenControlled: ({ prop: prop2 }) => prop2("open") != void 0
        },
        effects: {
          trackEnterAnimation: ({ send, scope }) => {
            let cleanup;
            const rafCleanup = raf(() => {
              const contentEl = getContentEl(scope);
              if (!contentEl) return;
              const animationName = getComputedStyle$1(contentEl).animationName;
              const hasNoAnimation = !animationName || animationName === "none";
              if (hasNoAnimation) {
                send({ type: "animation.end" });
                return;
              }
              const onEnd = (event2) => {
                const target = getEventTarget(event2);
                if (target === contentEl) {
                  send({ type: "animation.end" });
                }
              };
              contentEl.addEventListener("animationend", onEnd);
              cleanup = () => {
                contentEl.removeEventListener("animationend", onEnd);
              };
            });
            return () => {
              rafCleanup();
              cleanup?.();
            };
          },
          trackExitAnimation: ({ send, scope }) => {
            let cleanup;
            const rafCleanup = raf(() => {
              const contentEl = getContentEl(scope);
              if (!contentEl) return;
              const animationName = getComputedStyle$1(contentEl).animationName;
              const hasNoAnimation = !animationName || animationName === "none";
              if (hasNoAnimation) {
                send({ type: "animation.end" });
                return;
              }
              const onEnd = (event2) => {
                const target = getEventTarget(event2);
                if (target === contentEl) {
                  send({ type: "animation.end" });
                }
              };
              contentEl.addEventListener("animationend", onEnd);
              const restoreStyles = setStyle(contentEl, {
                animationFillMode: "forwards"
              });
              cleanup = () => {
                contentEl.removeEventListener("animationend", onEnd);
                nextTick(() => restoreStyles());
              };
            });
            return () => {
              rafCleanup();
              cleanup?.();
            };
          },
          trackTabbableElements: ({ scope, prop: prop2 }) => {
            if (!prop2("collapsedHeight") && !prop2("collapsedWidth")) return;
            const contentEl = getContentEl(scope);
            if (!contentEl) return;
            const applyInertToTabbables = () => {
              const tabbables = getTabbables(contentEl);
              const restoreAttrs = tabbables.map((tabbable) => setAttribute(tabbable, "inert", ""));
              return () => {
                restoreAttrs.forEach((attr) => attr());
              };
            };
            let restoreInert = applyInertToTabbables();
            const observerCleanup = observeChildren(contentEl, {
              callback() {
                restoreInert();
                restoreInert = applyInertToTabbables();
              }
            });
            return () => {
              restoreInert();
              observerCleanup();
            };
          }
        },
        actions: {
          setInitial: ({ context, flush: flush2 }) => {
            flush2(() => {
              context.set("initial", true);
            });
          },
          clearInitial: ({ context }) => {
            context.set("initial", false);
          },
          cleanupNode: ({ refs }) => {
            refs.set("stylesRef", null);
          },
          measureSize: ({ context, scope }) => {
            const contentEl = getContentEl(scope);
            if (!contentEl) return;
            const { height, width } = contentEl.getBoundingClientRect();
            context.set("size", { height, width });
          },
          computeSize: ({ refs, scope, context }) => {
            refs.get("cleanup")?.();
            const rafCleanup = raf(() => {
              const contentEl = getContentEl(scope);
              if (!contentEl) return;
              const hidden = contentEl.hidden;
              contentEl.style.animationName = "none";
              contentEl.style.animationDuration = "0s";
              contentEl.hidden = false;
              const rect = contentEl.getBoundingClientRect();
              context.set("size", { height: rect.height, width: rect.width });
              if (context.get("initial")) {
                contentEl.style.animationName = "";
                contentEl.style.animationDuration = "";
              }
              contentEl.hidden = hidden;
            });
            refs.set("cleanup", rafCleanup);
          },
          invokeOnOpen: ({ prop: prop2 }) => {
            prop2("onOpenChange")?.({ open: true });
          },
          invokeOnClose: ({ prop: prop2 }) => {
            prop2("onOpenChange")?.({ open: false });
          },
          invokeOnExitComplete: ({ prop: prop2 }) => {
            prop2("onExitComplete")?.();
          },
          toggleVisibility: ({ prop: prop2, send }) => {
            send({ type: prop2("open") ? "controlled.open" : "controlled.close" });
          }
        }
      }
    });
    const useCollapsible = (props) => {
      const env = useEnvironmentContext();
      const locale = useLocaleContext();
      let wasVisible = /* @__PURE__ */ state$1(false);
      const machineProps = /* @__PURE__ */ user_derived(() => {
        const resolvedProps2 = runIfFn$1(props);
        const {
          lazyMount,
          unmountOnExit,
          onExitComplete,
          ...collapsibleProps
        } = resolvedProps2 || {};
        return {
          dir: locale().dir,
          getRootNode: env().getRootNode,
          ...collapsibleProps
        };
      });
      const service = useMachine(machine$1, () => get$3(machineProps));
      const api = /* @__PURE__ */ user_derived(() => connect$1(service, normalizeProps));
      const resolvedProps = /* @__PURE__ */ user_derived(() => runIfFn$1(props));
      user_effect(() => {
        if (get$3(api).visible) {
          set$2(wasVisible, true);
        }
      });
      const isUnmounted = /* @__PURE__ */ user_derived(() => {
        const { lazyMount, unmountOnExit } = get$3(resolvedProps) || {};
        return !get$3(api).visible && !get$3(wasVisible) && lazyMount || unmountOnExit && !get$3(api).visible && get$3(wasVisible);
      });
      return () => ({ ...get$3(api), isUnmounted: Boolean(get$3(isUnmounted)) });
    };
    function Collapsible_root($$anchor, $$props) {
      const providedId = props_id();
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), open = prop($$props, "open", 15), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref", "open"]);
      const $$d = /* @__PURE__ */ user_derived(() => splitCollapsibleProps(props)), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), useCollapsibleProps = /* @__PURE__ */ user_derived(() => get$3($$array)[0]), localProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const resolvedProps = /* @__PURE__ */ user_derived(() => ({
        ...get$3(useCollapsibleProps),
        id: get$3(useCollapsibleProps).id ?? providedId,
        open: open(),
        onOpenChange(details) {
          get$3(useCollapsibleProps).onOpenChange?.(details);
          if (open() !== void 0) open(details.open);
        }
      }));
      const collapsible = useCollapsible(() => get$3(resolvedProps));
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(collapsible().getRootProps(), get$3(localProps)));
      CollapsibleProvider(collapsible);
      Factory($$anchor, spread_props({ as: "div" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    function connect$4(service, _normalize) {
      const { state: state2, send, context } = service;
      const present = state2.matches("mounted", "unmountSuspended");
      return {
        skip: !context.get("initial"),
        present,
        setNode(node) {
          if (!node) return;
          send({ type: "NODE.SET", node });
        },
        unmount() {
          send({ type: "UNMOUNT" });
        }
      };
    }
    var machine$4 = createMachine$1({
      props({ props }) {
        return { ...props, present: !!props.present };
      },
      initialState({ prop: prop2 }) {
        return prop2("present") ? "mounted" : "unmounted";
      },
      refs() {
        return {
          node: null,
          styles: null
        };
      },
      context({ bindable: bindable2 }) {
        return {
          unmountAnimationName: bindable2(() => ({ defaultValue: null })),
          prevAnimationName: bindable2(() => ({ defaultValue: null })),
          present: bindable2(() => ({ defaultValue: false })),
          initial: bindable2(() => ({
            sync: true,
            defaultValue: false
          }))
        };
      },
      exit: ["cleanupNode"],
      watch({ track: track2, prop: prop2, send }) {
        track2([() => prop2("present")], () => {
          send({ type: "PRESENCE.CHANGED" });
        });
      },
      on: {
        "NODE.SET": {
          actions: ["setupNode"]
        },
        "PRESENCE.CHANGED": {
          actions: ["setInitial", "syncPresence"]
        }
      },
      states: {
        mounted: {
          on: {
            UNMOUNT: {
              target: "unmounted",
              actions: ["clearPrevAnimationName", "invokeOnExitComplete"]
            },
            "UNMOUNT.SUSPEND": {
              target: "unmountSuspended"
            }
          }
        },
        unmountSuspended: {
          effects: ["trackAnimationEvents"],
          on: {
            MOUNT: {
              target: "mounted",
              actions: ["setPrevAnimationName"]
            },
            UNMOUNT: {
              target: "unmounted",
              actions: ["clearPrevAnimationName", "invokeOnExitComplete"]
            }
          }
        },
        unmounted: {
          on: {
            MOUNT: {
              target: "mounted",
              actions: ["setPrevAnimationName"]
            }
          }
        }
      },
      implementations: {
        actions: {
          setInitial: ({ context }) => {
            if (context.get("initial")) return;
            queueMicrotask(() => {
              context.set("initial", true);
            });
          },
          invokeOnExitComplete: ({ prop: prop2, refs }) => {
            prop2("onExitComplete")?.();
            const node = refs.get("node");
            if (!node) return;
            const win = getWindow(node);
            const event2 = new win.CustomEvent("exitcomplete", { bubbles: false });
            node.dispatchEvent(event2);
          },
          setupNode: ({ refs, event: event2 }) => {
            if (refs.get("node") === event2.node) return;
            refs.set("node", event2.node);
            refs.set("styles", getComputedStyle$1(event2.node));
          },
          cleanupNode: ({ refs }) => {
            refs.set("node", null);
            refs.set("styles", null);
          },
          syncPresence: ({ context, refs, send, prop: prop2 }) => {
            const presentProp = prop2("present");
            if (presentProp) {
              return send({ type: "MOUNT", src: "presence.changed" });
            }
            const node = refs.get("node");
            if (!presentProp && node?.ownerDocument.visibilityState === "hidden") {
              return send({ type: "UNMOUNT", src: "visibilitychange" });
            }
            raf(() => {
              const animationName = getAnimationName(refs.get("styles"));
              context.set("unmountAnimationName", animationName);
              if (animationName === "none" || animationName === context.get("prevAnimationName") || refs.get("styles")?.display === "none" || refs.get("styles")?.animationDuration === "0s") {
                send({ type: "UNMOUNT", src: "presence.changed" });
              } else {
                send({ type: "UNMOUNT.SUSPEND" });
              }
            });
          },
          setPrevAnimationName: ({ context, refs }) => {
            raf(() => {
              context.set("prevAnimationName", getAnimationName(refs.get("styles")));
            });
          },
          clearPrevAnimationName: ({ context }) => {
            context.set("prevAnimationName", null);
          }
        },
        effects: {
          trackAnimationEvents: ({ context, refs, send, prop: prop2 }) => {
            const node = refs.get("node");
            if (!node) return;
            const onStart = (event2) => {
              const target = event2.composedPath?.()?.[0] ?? event2.target;
              if (target === node) {
                context.set("prevAnimationName", getAnimationName(refs.get("styles")));
              }
            };
            const onEnd = (event2) => {
              const animationName = getAnimationName(refs.get("styles"));
              const target = getEventTarget(event2);
              if (target === node && animationName === context.get("unmountAnimationName") && !prop2("present")) {
                send({ type: "UNMOUNT", src: "animationend" });
              }
            };
            const onCancel = (event2) => {
              const target = getEventTarget(event2);
              if (target === node && !prop2("present")) {
                send({ type: "UNMOUNT", src: "animationcancel" });
              }
            };
            node.addEventListener("animationstart", onStart);
            node.addEventListener("animationcancel", onCancel);
            node.addEventListener("animationend", onEnd);
            const cleanupStyles = setStyle(node, { animationFillMode: "forwards" });
            return () => {
              node.removeEventListener("animationstart", onStart);
              node.removeEventListener("animationcancel", onCancel);
              node.removeEventListener("animationend", onEnd);
              nextTick(() => cleanupStyles());
            };
          }
        }
      }
    });
    function getAnimationName(styles) {
      return styles?.animationName || "none";
    }
    const usePresence = (props) => {
      const resolvedProps = /* @__PURE__ */ user_derived(() => runIfFn$1(props));
      const $$d = /* @__PURE__ */ user_derived(() => splitRenderStrategyProps(get$3(resolvedProps))), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), renderStrategyProps = /* @__PURE__ */ user_derived(() => get$3($$array)[0]), machineProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const service = useMachine(machine$4, () => get$3(machineProps));
      const api = /* @__PURE__ */ user_derived(() => connect$4(service));
      let wasEverPresent = /* @__PURE__ */ state$1(false);
      user_effect(() => {
        if (get$3(api).present) {
          set$2(wasEverPresent, true);
        }
      });
      const setNode = (node) => {
        if (!node) return;
        service.send({ type: "NODE.SET", node });
      };
      const unmounted = /* @__PURE__ */ user_derived(() => !get$3(api).present && !get$3(wasEverPresent) && get$3(renderStrategyProps).lazyMount || get$3(renderStrategyProps).unmountOnExit && !get$3(api).present && get$3(wasEverPresent));
      const result = /* @__PURE__ */ user_derived(() => ({
        getPresenceProps: () => ({
          "data-state": get$3(api).skip && get$3(resolvedProps).skipAnimationOnMount ? void 0 : get$3(resolvedProps).present ? "open" : "closed",
          hidden: !get$3(api).present
        }),
        present: get$3(api).present,
        setNode,
        unmounted: get$3(unmounted)
      }));
      return () => get$3(result);
    };
    const [PresenceProvider] = createContext({
      name: "PresenceContext"
    });
    var __defProp = Object.defineProperty;
    var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
    function access(node, indexPath, options) {
      for (let i = 0; i < indexPath.length; i++) node = options.getChildren(node, indexPath.slice(i + 1))[indexPath[i]];
      return node;
    }
    function ancestorIndexPaths(indexPaths) {
      const sortedPaths = sortIndexPaths(indexPaths);
      const result = [];
      const seen = /* @__PURE__ */ new Set();
      for (const indexPath of sortedPaths) {
        const key2 = indexPath.join();
        if (!seen.has(key2)) {
          seen.add(key2);
          result.push(indexPath);
        }
      }
      return result;
    }
    function compareIndexPaths(a, b) {
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a[i] < b[i]) return -1;
        if (a[i] > b[i]) return 1;
      }
      return a.length - b.length;
    }
    function sortIndexPaths(indexPaths) {
      return indexPaths.sort(compareIndexPaths);
    }
    function find(node, options) {
      let found;
      visit(node, {
        ...options,
        onEnter: (child2, indexPath) => {
          if (options.predicate(child2, indexPath)) {
            found = child2;
            return "stop";
          }
        }
      });
      return found;
    }
    function findAll(node, options) {
      const found = [];
      visit(node, {
        onEnter: (child2, indexPath) => {
          if (options.predicate(child2, indexPath)) found.push(child2);
        },
        getChildren: options.getChildren
      });
      return found;
    }
    function findIndexPath(node, options) {
      let found;
      visit(node, {
        onEnter: (child2, indexPath) => {
          if (options.predicate(child2, indexPath)) {
            found = [...indexPath];
            return "stop";
          }
        },
        getChildren: options.getChildren
      });
      return found;
    }
    function reduce(node, options) {
      let result = options.initialResult;
      visit(node, {
        ...options,
        onEnter: (child2, indexPath) => {
          result = options.nextResult(result, child2, indexPath);
        }
      });
      return result;
    }
    function flatMap(node, options) {
      return reduce(node, {
        ...options,
        initialResult: [],
        nextResult: (result, child2, indexPath) => {
          result.push(...options.transform(child2, indexPath));
          return result;
        }
      });
    }
    function filter(node, options) {
      const { predicate, create, getChildren } = options;
      const filterRecursive = (node2, indexPath) => {
        const children = getChildren(node2, indexPath);
        const filteredChildren = [];
        children.forEach((child2, index2) => {
          const childIndexPath = [...indexPath, index2];
          const filteredChild = filterRecursive(child2, childIndexPath);
          if (filteredChild) filteredChildren.push(filteredChild);
        });
        const isRoot = indexPath.length === 0;
        const nodeMatches = predicate(node2, indexPath);
        const hasFilteredChildren = filteredChildren.length > 0;
        if (isRoot || nodeMatches || hasFilteredChildren) {
          return create(node2, filteredChildren, indexPath);
        }
        return null;
      };
      return filterRecursive(node, []) || create(node, [], []);
    }
    function flatten(rootNode, options) {
      const nodes = [];
      let idx = 0;
      const idxMap = /* @__PURE__ */ new Map();
      const parentMap = /* @__PURE__ */ new Map();
      visit(rootNode, {
        getChildren: options.getChildren,
        onEnter: (node, indexPath) => {
          if (!idxMap.has(node)) {
            idxMap.set(node, idx++);
          }
          const children = options.getChildren(node, indexPath);
          children.forEach((child2) => {
            if (!parentMap.has(child2)) {
              parentMap.set(child2, node);
            }
            if (!idxMap.has(child2)) {
              idxMap.set(child2, idx++);
            }
          });
          const _children = children.length > 0 ? children.map((child2) => idxMap.get(child2)) : void 0;
          const parent = parentMap.get(node);
          const _parent = parent ? idxMap.get(parent) : void 0;
          const _index = idxMap.get(node);
          nodes.push({ ...node, _children, _parent, _index });
        }
      });
      return nodes;
    }
    function insertOperation(index2, nodes) {
      return { type: "insert", index: index2, nodes };
    }
    function removeOperation(indexes) {
      return { type: "remove", indexes };
    }
    function replaceOperation() {
      return { type: "replace" };
    }
    function splitIndexPath(indexPath) {
      return [indexPath.slice(0, -1), indexPath[indexPath.length - 1]];
    }
    function getInsertionOperations(indexPath, nodes, operations = /* @__PURE__ */ new Map()) {
      const [parentIndexPath, index2] = splitIndexPath(indexPath);
      for (let i = parentIndexPath.length - 1; i >= 0; i--) {
        const parentKey = parentIndexPath.slice(0, i).join();
        switch (operations.get(parentKey)?.type) {
          case "remove":
            continue;
        }
        operations.set(parentKey, replaceOperation());
      }
      const operation = operations.get(parentIndexPath.join());
      switch (operation?.type) {
        case "remove":
          operations.set(parentIndexPath.join(), {
            type: "removeThenInsert",
            removeIndexes: operation.indexes,
            insertIndex: index2,
            insertNodes: nodes
          });
          break;
        default:
          operations.set(parentIndexPath.join(), insertOperation(index2, nodes));
      }
      return operations;
    }
    function getRemovalOperations(indexPaths) {
      const operations = /* @__PURE__ */ new Map();
      const indexesToRemove = /* @__PURE__ */ new Map();
      for (const indexPath of indexPaths) {
        const parentKey = indexPath.slice(0, -1).join();
        const value = indexesToRemove.get(parentKey) ?? [];
        value.push(indexPath[indexPath.length - 1]);
        indexesToRemove.set(
          parentKey,
          value.sort((a, b) => a - b)
        );
      }
      for (const indexPath of indexPaths) {
        for (let i = indexPath.length - 2; i >= 0; i--) {
          const parentKey = indexPath.slice(0, i).join();
          if (!operations.has(parentKey)) {
            operations.set(parentKey, replaceOperation());
          }
        }
      }
      for (const [parentKey, indexes] of indexesToRemove) {
        operations.set(parentKey, removeOperation(indexes));
      }
      return operations;
    }
    function getReplaceOperations(indexPath, node) {
      const operations = /* @__PURE__ */ new Map();
      const [parentIndexPath, index2] = splitIndexPath(indexPath);
      for (let i = parentIndexPath.length - 1; i >= 0; i--) {
        const parentKey = parentIndexPath.slice(0, i).join();
        operations.set(parentKey, replaceOperation());
      }
      operations.set(parentIndexPath.join(), {
        type: "removeThenInsert",
        removeIndexes: [index2],
        insertIndex: index2,
        insertNodes: [node]
      });
      return operations;
    }
    function mutate(node, operations, options) {
      return map(node, {
        ...options,
        getChildren: (node2, indexPath) => {
          const key2 = indexPath.join();
          const operation = operations.get(key2);
          switch (operation?.type) {
            case "replace":
            case "remove":
            case "removeThenInsert":
            case "insert":
              return options.getChildren(node2, indexPath);
            default:
              return [];
          }
        },
        transform: (node2, children, indexPath) => {
          const key2 = indexPath.join();
          const operation = operations.get(key2);
          switch (operation?.type) {
            case "remove":
              return options.create(
                node2,
                children.filter((_, index2) => !operation.indexes.includes(index2)),
                indexPath
              );
            case "removeThenInsert":
              const updatedChildren = children.filter((_, index2) => !operation.removeIndexes.includes(index2));
              const adjustedIndex = operation.removeIndexes.reduce(
                (index2, removedIndex) => removedIndex < index2 ? index2 - 1 : index2,
                operation.insertIndex
              );
              return options.create(node2, splice(updatedChildren, adjustedIndex, 0, ...operation.insertNodes), indexPath);
            case "insert":
              return options.create(node2, splice(children, operation.index, 0, ...operation.nodes), indexPath);
            case "replace":
              return options.create(node2, children, indexPath);
            default:
              return node2;
          }
        }
      });
    }
    function splice(array, start2, deleteCount, ...items) {
      return [...array.slice(0, start2), ...items, ...array.slice(start2 + deleteCount)];
    }
    function map(node, options) {
      const childrenMap = {};
      visit(node, {
        ...options,
        onLeave: (child2, indexPath) => {
          const keyIndexPath = [0, ...indexPath];
          const key2 = keyIndexPath.join();
          const transformed = options.transform(child2, childrenMap[key2] ?? [], indexPath);
          const parentKey = keyIndexPath.slice(0, -1).join();
          const parentChildren = childrenMap[parentKey] ?? [];
          parentChildren.push(transformed);
          childrenMap[parentKey] = parentChildren;
        }
      });
      return childrenMap[""][0];
    }
    function insert(node, options) {
      const { nodes, at } = options;
      if (at.length === 0) throw new Error(`Can't insert nodes at the root`);
      const state2 = getInsertionOperations(at, nodes);
      return mutate(node, state2, options);
    }
    function replace(node, options) {
      if (options.at.length === 0) return options.node;
      const operations = getReplaceOperations(options.at, options.node);
      return mutate(node, operations, options);
    }
    function remove(node, options) {
      if (options.indexPaths.length === 0) return node;
      for (const indexPath of options.indexPaths) {
        if (indexPath.length === 0) throw new Error(`Can't remove the root node`);
      }
      const operations = getRemovalOperations(options.indexPaths);
      return mutate(node, operations, options);
    }
    function move(node, options) {
      if (options.indexPaths.length === 0) return node;
      for (const indexPath of options.indexPaths) {
        if (indexPath.length === 0) throw new Error(`Can't move the root node`);
      }
      if (options.to.length === 0) throw new Error(`Can't move nodes to the root`);
      const _ancestorIndexPaths = ancestorIndexPaths(options.indexPaths);
      const nodesToInsert = _ancestorIndexPaths.map((indexPath) => access(node, indexPath, options));
      const operations = getInsertionOperations(options.to, nodesToInsert, getRemovalOperations(_ancestorIndexPaths));
      return mutate(node, operations, options);
    }
    function visit(node, options) {
      const { onEnter, onLeave, getChildren } = options;
      let indexPath = [];
      let stack = [{ node }];
      const getIndexPath = options.reuseIndexPath ? () => indexPath : () => indexPath.slice();
      while (stack.length > 0) {
        let wrapper = stack[stack.length - 1];
        if (wrapper.state === void 0) {
          const enterResult = onEnter?.(wrapper.node, getIndexPath());
          if (enterResult === "stop") return;
          wrapper.state = enterResult === "skip" ? -1 : 0;
        }
        const children = wrapper.children || getChildren(wrapper.node, getIndexPath());
        wrapper.children || (wrapper.children = children);
        if (wrapper.state !== -1) {
          if (wrapper.state < children.length) {
            let currentIndex = wrapper.state;
            indexPath.push(currentIndex);
            stack.push({ node: children[currentIndex] });
            wrapper.state = currentIndex + 1;
            continue;
          }
          const leaveResult = onLeave?.(wrapper.node, getIndexPath());
          if (leaveResult === "stop") return;
        }
        indexPath.pop();
        stack.pop();
      }
    }
    var TreeCollection = class _TreeCollection {
      constructor(options) {
        this.options = options;
        __publicField(this, "rootNode");
        __publicField(this, "isEqual", (other) => {
          return isEqual(this.rootNode, other.rootNode);
        });
        __publicField(this, "getNodeChildren", (node) => {
          return this.options.nodeToChildren?.(node) ?? fallbackMethods.nodeToChildren(node) ?? [];
        });
        __publicField(this, "resolveIndexPath", (valueOrIndexPath) => {
          return typeof valueOrIndexPath === "string" ? this.getIndexPath(valueOrIndexPath) : valueOrIndexPath;
        });
        __publicField(this, "resolveNode", (valueOrIndexPath) => {
          const indexPath = this.resolveIndexPath(valueOrIndexPath);
          return indexPath ? this.at(indexPath) : void 0;
        });
        __publicField(this, "getNodeChildrenCount", (node) => {
          return this.options.nodeToChildrenCount?.(node) ?? fallbackMethods.nodeToChildrenCount(node);
        });
        __publicField(this, "getNodeValue", (node) => {
          return this.options.nodeToValue?.(node) ?? fallbackMethods.nodeToValue(node);
        });
        __publicField(this, "getNodeDisabled", (node) => {
          return this.options.isNodeDisabled?.(node) ?? fallbackMethods.isNodeDisabled(node);
        });
        __publicField(this, "stringify", (value) => {
          const node = this.findNode(value);
          if (!node) return null;
          return this.stringifyNode(node);
        });
        __publicField(this, "stringifyNode", (node) => {
          return this.options.nodeToString?.(node) ?? fallbackMethods.nodeToString(node);
        });
        __publicField(this, "getFirstNode", (rootNode = this.rootNode, opts = {}) => {
          let firstChild;
          visit(rootNode, {
            getChildren: this.getNodeChildren,
            onEnter: (node, indexPath) => {
              if (this.isSameNode(node, rootNode)) return;
              if (opts.skip?.({ value: this.getNodeValue(node), node, indexPath })) return "skip";
              if (!firstChild && indexPath.length > 0 && !this.getNodeDisabled(node)) {
                firstChild = node;
                return "stop";
              }
            }
          });
          return firstChild;
        });
        __publicField(this, "getLastNode", (rootNode = this.rootNode, opts = {}) => {
          let lastChild;
          visit(rootNode, {
            getChildren: this.getNodeChildren,
            onEnter: (node, indexPath) => {
              if (this.isSameNode(node, rootNode)) return;
              if (opts.skip?.({ value: this.getNodeValue(node), node, indexPath })) return "skip";
              if (indexPath.length > 0 && !this.getNodeDisabled(node)) {
                lastChild = node;
              }
            }
          });
          return lastChild;
        });
        __publicField(this, "at", (indexPath) => {
          return access(this.rootNode, indexPath, {
            getChildren: this.getNodeChildren
          });
        });
        __publicField(this, "findNode", (value, rootNode = this.rootNode) => {
          return find(rootNode, {
            getChildren: this.getNodeChildren,
            predicate: (node) => this.getNodeValue(node) === value
          });
        });
        __publicField(this, "findNodes", (values, rootNode = this.rootNode) => {
          const v = new Set(values.filter((v2) => v2 != null));
          return findAll(rootNode, {
            getChildren: this.getNodeChildren,
            predicate: (node) => v.has(this.getNodeValue(node))
          });
        });
        __publicField(this, "sort", (values) => {
          return values.reduce((acc, value) => {
            const indexPath = this.getIndexPath(value);
            if (indexPath) acc.push({ value, indexPath });
            return acc;
          }, []).sort((a, b) => compareIndexPaths(a.indexPath, b.indexPath)).map(({ value }) => value);
        });
        __publicField(this, "getValue", (indexPath) => {
          const node = this.at(indexPath);
          return node ? this.getNodeValue(node) : void 0;
        });
        __publicField(this, "getValuePath", (indexPath) => {
          if (!indexPath) return [];
          const valuePath = [];
          let currentPath = [...indexPath];
          while (currentPath.length > 0) {
            const node = this.at(currentPath);
            if (node) valuePath.unshift(this.getNodeValue(node));
            currentPath.pop();
          }
          return valuePath;
        });
        __publicField(this, "getDepth", (value) => {
          const indexPath = findIndexPath(this.rootNode, {
            getChildren: this.getNodeChildren,
            predicate: (node) => this.getNodeValue(node) === value
          });
          return indexPath?.length ?? 0;
        });
        __publicField(this, "isSameNode", (node, other) => {
          return this.getNodeValue(node) === this.getNodeValue(other);
        });
        __publicField(this, "isRootNode", (node) => {
          return this.isSameNode(node, this.rootNode);
        });
        __publicField(this, "contains", (parentIndexPath, valueIndexPath) => {
          if (!parentIndexPath || !valueIndexPath) return false;
          return valueIndexPath.slice(0, parentIndexPath.length).every((_, i) => parentIndexPath[i] === valueIndexPath[i]);
        });
        __publicField(this, "getNextNode", (value, opts = {}) => {
          let found = false;
          let nextNode;
          visit(this.rootNode, {
            getChildren: this.getNodeChildren,
            onEnter: (node, indexPath) => {
              if (this.isRootNode(node)) return;
              const nodeValue = this.getNodeValue(node);
              if (opts.skip?.({ value: nodeValue, node, indexPath })) {
                if (nodeValue === value) {
                  found = true;
                }
                return "skip";
              }
              if (found && !this.getNodeDisabled(node)) {
                nextNode = node;
                return "stop";
              }
              if (nodeValue === value) {
                found = true;
              }
            }
          });
          return nextNode;
        });
        __publicField(this, "getPreviousNode", (value, opts = {}) => {
          let previousNode;
          let found = false;
          visit(this.rootNode, {
            getChildren: this.getNodeChildren,
            onEnter: (node, indexPath) => {
              if (this.isRootNode(node)) return;
              const nodeValue = this.getNodeValue(node);
              if (opts.skip?.({ value: nodeValue, node, indexPath })) {
                return "skip";
              }
              if (nodeValue === value) {
                found = true;
                return "stop";
              }
              if (!this.getNodeDisabled(node)) {
                previousNode = node;
              }
            }
          });
          return found ? previousNode : void 0;
        });
        __publicField(this, "getParentNodes", (valueOrIndexPath) => {
          const indexPath = this.resolveIndexPath(valueOrIndexPath)?.slice();
          if (!indexPath) return [];
          const result = [];
          while (indexPath.length > 0) {
            indexPath.pop();
            const parentNode = this.at(indexPath);
            if (parentNode && !this.isRootNode(parentNode)) {
              result.unshift(parentNode);
            }
          }
          return result;
        });
        __publicField(this, "getDescendantNodes", (valueOrIndexPath, options2) => {
          const parentNode = this.resolveNode(valueOrIndexPath);
          if (!parentNode) return [];
          const result = [];
          visit(parentNode, {
            getChildren: this.getNodeChildren,
            onEnter: (node, nodeIndexPath) => {
              if (nodeIndexPath.length === 0) return;
              if (!options2?.withBranch && this.isBranchNode(node)) return;
              result.push(node);
            }
          });
          return result;
        });
        __publicField(this, "getDescendantValues", (valueOrIndexPath, options2) => {
          const children = this.getDescendantNodes(valueOrIndexPath, options2);
          return children.map((child2) => this.getNodeValue(child2));
        });
        __publicField(this, "getParentIndexPath", (indexPath) => {
          return indexPath.slice(0, -1);
        });
        __publicField(this, "getParentNode", (valueOrIndexPath) => {
          const indexPath = this.resolveIndexPath(valueOrIndexPath);
          return indexPath ? this.at(this.getParentIndexPath(indexPath)) : void 0;
        });
        __publicField(this, "visit", (opts) => {
          const { skip, ...rest } = opts;
          visit(this.rootNode, {
            ...rest,
            getChildren: this.getNodeChildren,
            onEnter: (node, indexPath) => {
              if (this.isRootNode(node)) return;
              if (skip?.({ value: this.getNodeValue(node), node, indexPath })) return "skip";
              return rest.onEnter?.(node, indexPath);
            }
          });
        });
        __publicField(this, "getPreviousSibling", (indexPath) => {
          const parentNode = this.getParentNode(indexPath);
          if (!parentNode) return;
          const siblings = this.getNodeChildren(parentNode);
          let idx = indexPath[indexPath.length - 1];
          while (--idx >= 0) {
            const sibling2 = siblings[idx];
            if (!this.getNodeDisabled(sibling2)) return sibling2;
          }
          return;
        });
        __publicField(this, "getNextSibling", (indexPath) => {
          const parentNode = this.getParentNode(indexPath);
          if (!parentNode) return;
          const siblings = this.getNodeChildren(parentNode);
          let idx = indexPath[indexPath.length - 1];
          while (++idx < siblings.length) {
            const sibling2 = siblings[idx];
            if (!this.getNodeDisabled(sibling2)) return sibling2;
          }
          return;
        });
        __publicField(this, "getSiblingNodes", (indexPath) => {
          const parentNode = this.getParentNode(indexPath);
          return parentNode ? this.getNodeChildren(parentNode) : [];
        });
        __publicField(this, "getValues", (rootNode = this.rootNode) => {
          const values = flatMap(rootNode, {
            getChildren: this.getNodeChildren,
            transform: (node) => [this.getNodeValue(node)]
          });
          return values.slice(1);
        });
        __publicField(this, "isValidDepth", (indexPath, depth) => {
          if (depth == null) return true;
          if (typeof depth === "function") return depth(indexPath.length);
          return indexPath.length === depth;
        });
        __publicField(this, "isBranchNode", (node) => {
          return this.getNodeChildren(node).length > 0 || this.getNodeChildrenCount(node) != null;
        });
        __publicField(this, "getBranchValues", (rootNode = this.rootNode, opts = {}) => {
          let values = [];
          visit(rootNode, {
            getChildren: this.getNodeChildren,
            onEnter: (node, indexPath) => {
              if (indexPath.length === 0) return;
              const nodeValue = this.getNodeValue(node);
              if (opts.skip?.({ value: nodeValue, node, indexPath })) return "skip";
              if (this.isBranchNode(node) && this.isValidDepth(indexPath, opts.depth)) {
                values.push(this.getNodeValue(node));
              }
            }
          });
          return values;
        });
        __publicField(this, "flatten", (rootNode = this.rootNode) => {
          return flatten(rootNode, { getChildren: this.getNodeChildren });
        });
        __publicField(this, "_create", (node, children) => {
          if (this.getNodeChildren(node).length > 0 || children.length > 0) {
            return { ...node, children };
          }
          return { ...node };
        });
        __publicField(this, "_insert", (rootNode, indexPath, nodes) => {
          return this.copy(
            insert(rootNode, { at: indexPath, nodes, getChildren: this.getNodeChildren, create: this._create })
          );
        });
        __publicField(this, "copy", (rootNode) => {
          return new _TreeCollection({ ...this.options, rootNode });
        });
        __publicField(this, "_replace", (rootNode, indexPath, node) => {
          return this.copy(
            replace(rootNode, { at: indexPath, node, getChildren: this.getNodeChildren, create: this._create })
          );
        });
        __publicField(this, "_move", (rootNode, indexPaths, to) => {
          return this.copy(move(rootNode, { indexPaths, to, getChildren: this.getNodeChildren, create: this._create }));
        });
        __publicField(this, "_remove", (rootNode, indexPaths) => {
          return this.copy(remove(rootNode, { indexPaths, getChildren: this.getNodeChildren, create: this._create }));
        });
        __publicField(this, "replace", (indexPath, node) => {
          return this._replace(this.rootNode, indexPath, node);
        });
        __publicField(this, "remove", (indexPaths) => {
          return this._remove(this.rootNode, indexPaths);
        });
        __publicField(this, "insertBefore", (indexPath, nodes) => {
          const parentNode = this.getParentNode(indexPath);
          return parentNode ? this._insert(this.rootNode, indexPath, nodes) : void 0;
        });
        __publicField(this, "insertAfter", (indexPath, nodes) => {
          const parentNode = this.getParentNode(indexPath);
          if (!parentNode) return;
          const nextIndex2 = [...indexPath.slice(0, -1), indexPath[indexPath.length - 1] + 1];
          return this._insert(this.rootNode, nextIndex2, nodes);
        });
        __publicField(this, "move", (fromIndexPaths, toIndexPath) => {
          return this._move(this.rootNode, fromIndexPaths, toIndexPath);
        });
        __publicField(this, "filter", (predicate) => {
          const filteredRoot = filter(this.rootNode, {
            predicate,
            getChildren: this.getNodeChildren,
            create: this._create
          });
          return this.copy(filteredRoot);
        });
        __publicField(this, "toJSON", () => {
          return this.getValues(this.rootNode);
        });
        this.rootNode = options.rootNode;
      }
      getIndexPath(valueOrValuePath) {
        if (Array.isArray(valueOrValuePath)) {
          if (valueOrValuePath.length === 0) return [];
          const indexPath = [];
          let currentChildren = this.getNodeChildren(this.rootNode);
          for (let i = 0; i < valueOrValuePath.length; i++) {
            const currentValue = valueOrValuePath[i];
            const matchingChildIndex = currentChildren.findIndex((child2) => this.getNodeValue(child2) === currentValue);
            if (matchingChildIndex === -1) break;
            indexPath.push(matchingChildIndex);
            if (i < valueOrValuePath.length - 1) {
              const currentNode = currentChildren[matchingChildIndex];
              currentChildren = this.getNodeChildren(currentNode);
            }
          }
          return indexPath;
        } else {
          return findIndexPath(this.rootNode, {
            getChildren: this.getNodeChildren,
            predicate: (node) => this.getNodeValue(node) === valueOrValuePath
          });
        }
      }
    };
    var fallbackMethods = {
      nodeToValue(node) {
        if (typeof node === "string") return node;
        if (isObject(node) && hasProp(node, "value")) return node.value;
        return "";
      },
      nodeToString(node) {
        if (typeof node === "string") return node;
        if (isObject(node) && hasProp(node, "label")) return node.label;
        return fallbackMethods.nodeToValue(node);
      },
      isNodeDisabled(node) {
        if (isObject(node) && hasProp(node, "disabled")) return !!node.disabled;
        return false;
      },
      nodeToChildren(node) {
        return node.children;
      },
      nodeToChildrenCount(node) {
        if (isObject(node) && hasProp(node, "childrenCount")) return node.childrenCount;
      }
    };
    const createTreeCollection = (options) => new TreeCollection(options);
    function Portal($$anchor, $$props) {
      push($$props, true);
      let container = prop($$props, "container", 19, () => globalThis.document?.body), disabled = prop($$props, "disabled", 3, false);
      const context = getAllContexts();
      let instance = null;
      user_effect(() => {
        const cleanup = () => {
          if (instance) {
            void unmount(instance);
            instance = null;
          }
        };
        if (disabled()) {
          cleanup();
          return;
        }
        tick().then(() => {
          instance = mount($$props.children, { target: container(), context });
        });
        return () => {
          cleanup();
        };
      });
      var fragment = comment();
      var node = first_child(fragment);
      {
        var consequent = ($$anchor2) => {
          var fragment_1 = comment();
          var node_1 = first_child(fragment_1);
          snippet(node_1, () => $$props.children ?? noop$2);
          append$1($$anchor2, fragment_1);
        };
        if_block(node, ($$render) => {
          if (disabled()) $$render(consequent);
        });
      }
      append$1($$anchor, fragment);
      pop();
    }
    function Frame_content($$anchor, $$props) {
      push($$props, true);
      user_effect(() => {
        $$props.onMount?.();
        return $$props.onUnmount;
      });
      var fragment = comment();
      var node = first_child(fragment);
      snippet(node, () => $$props.children);
      append$1($$anchor, fragment);
      pop();
    }
    const CUSTOM_ROOT_CLASS = "frame-root";
    const resetStyle = "<style>*,*::before,*::after { margin: 0; padding: 0; box-sizing: border-box; }</style>";
    const initialSrcDoc = `<html><head>${resetStyle}</head><body><div class="${CUSTOM_ROOT_CLASS}"></div></body></html>`;
    function getMountNode(frame) {
      const doc = frame.contentWindow?.document;
      if (!doc) return null;
      return doc.body.querySelector(`.${CUSTOM_ROOT_CLASS}`) || doc.body;
    }
    var root_1$9 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
    var root$e = /* @__PURE__ */ from_html(`<iframe><!></iframe>`);
    function Frame($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), localProps = /* @__PURE__ */ rest_props($$props, [
        "$$slots",
        "$$events",
        "$$legacy",
        "head",
        "onMount",
        "onUnmount",
        "srcdoc",
        "ref"
      ]);
      let frameRef = /* @__PURE__ */ state$1(null);
      let mountNode = /* @__PURE__ */ user_derived(() => get$3(frameRef) ? getMountNode(get$3(frameRef)) : null);
      user_effect(() => {
        if (!get$3(frameRef)) return;
        const doc = get$3(frameRef).contentWindow?.document;
        if (!doc) return;
        doc.open();
        doc.write($$props.srcdoc ?? initialSrcDoc);
        doc.close();
      });
      user_effect(() => {
        if (!get$3(frameRef) || !get$3(frameRef).contentDocument) return;
        const win = get$3(frameRef).contentWindow;
        if (!win || !get$3(mountNode)) return;
        const exec = () => {
          win.requestAnimationFrame(() => {
            if (!(get$3(mountNode) && get$3(frameRef) && get$3(frameRef).contentDocument)) return;
            const rootEl = get$3(frameRef).contentDocument?.documentElement;
            if (!rootEl) return;
            get$3(frameRef).style.setProperty("--width", `${get$3(mountNode).scrollWidth}px`);
            get$3(frameRef).style.setProperty("--height", `${get$3(mountNode).scrollHeight}px`);
          });
        };
        const resizeObserver = new win.ResizeObserver(exec);
        exec();
        if (get$3(frameRef).contentDocument) {
          resizeObserver.observe(get$3(mountNode));
        }
        return () => {
          resizeObserver.disconnect();
        };
      });
      function setFrameNode(node) {
        set$2(frameRef, node, true);
      }
      var iframe = root$e();
      attribute_effect(iframe, () => ({ ...localProps }));
      var node_1 = child(iframe);
      Environment_provider(node_1, {
        value: () => get$3(frameRef)?.contentDocument ?? document,
        children: ($$anchor2, $$slotProps) => {
          var fragment = root_1$9();
          var node_2 = first_child(fragment);
          {
            var consequent_1 = ($$anchor3) => {
              Portal($$anchor3, {
                get container() {
                  return get$3(mountNode);
                },
                children: ($$anchor4, $$slotProps2) => {
                  Frame_content($$anchor4, {
                    get onMount() {
                      return $$props.onMount;
                    },
                    get onUnmount() {
                      return $$props.onUnmount;
                    },
                    children: ($$anchor5, $$slotProps3) => {
                      var fragment_3 = comment();
                      var node_3 = first_child(fragment_3);
                      {
                        var consequent = ($$anchor6) => {
                          var fragment_4 = comment();
                          var node_4 = first_child(fragment_4);
                          snippet(node_4, () => $$props.children);
                          append$1($$anchor6, fragment_4);
                        };
                        if_block(node_3, ($$render) => {
                          if ($$props?.children) $$render(consequent);
                        });
                      }
                      append$1($$anchor5, fragment_3);
                    },
                    $$slots: { default: true }
                  });
                },
                $$slots: { default: true }
              });
            };
            if_block(node_2, ($$render) => {
              if (get$3(mountNode)) $$render(consequent_1);
            });
          }
          var node_5 = sibling(node_2, 2);
          {
            var consequent_2 = ($$anchor3) => {
              Portal($$anchor3, {
                get container() {
                  return get$3(frameRef).contentDocument.head;
                },
                children: ($$anchor4, $$slotProps2) => {
                  var fragment_6 = comment();
                  var node_6 = first_child(fragment_6);
                  snippet(node_6, () => $$props.head);
                  append$1($$anchor4, fragment_6);
                },
                $$slots: { default: true }
              });
            };
            if_block(node_5, ($$render) => {
              if (get$3(mountNode) && $$props.head && get$3(frameRef)?.contentDocument?.head) $$render(consequent_2);
            });
          }
          append$1($$anchor2, fragment);
        },
        $$slots: { default: true }
      });
      bind_this(iframe, ($$value) => ref2($$value), () => ref2());
      attach(iframe, () => setFrameNode);
      append$1($$anchor, iframe);
      pop();
    }
    const [TreeViewProvider, useTreeViewContext] = createContext({
      name: "TreeViewContext",
      hookName: "useTreeViewContext",
      providerName: "<TreeViewProvider />"
    });
    const [TreeViewNodeProvider, useTreeViewNodeContext] = createContext({
      name: "TreeViewNodeContext",
      hookName: "useTreeViewNodeContext",
      providerName: "<TreeViewNodeProvider />"
    });
    const [TreeViewNodePropsProvider, useTreeViewNodePropsContext] = createContext({
      name: "TreeViewNodePropsContext",
      hookName: "useTreeViewNodePropsContext",
      providerName: "<TreeViewNodePropsProvider />"
    });
    function Tree_view_branch($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const treeView = useTreeViewContext();
      const nodeProps = useTreeViewNodePropsContext();
      const nodeState = useTreeViewNodeContext();
      const renderStrategyProps = useRenderStrategyPropsContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(treeView().getBranchProps(nodeProps()), props));
      const branchContentProps = /* @__PURE__ */ user_derived(() => treeView().getBranchContentProps(nodeProps()));
      var fragment = comment();
      var node = first_child(fragment);
      {
        let $0 = /* @__PURE__ */ user_derived(() => nodeState().expanded);
        let $1 = /* @__PURE__ */ user_derived(() => ({ content: get$3(branchContentProps).id }));
        component(node, () => Collapsible_root, ($$anchor2, Collapsible_Root) => {
          Collapsible_Root($$anchor2, spread_props(
            {
              get open() {
                return get$3($0);
              },
              get ids() {
                return get$3($1);
              }
            },
            () => renderStrategyProps,
            () => get$3(mergedProps),
            {
              get ref() {
                return ref2();
              },
              set ref($$value) {
                ref2($$value);
              }
            }
          ));
        });
      }
      append$1($$anchor, fragment);
      pop();
    }
    function Tree_view_branch_content($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const treeView = useTreeViewContext();
      const nodeProps = useTreeViewNodePropsContext();
      const contentProps = /* @__PURE__ */ user_derived(() => treeView().getBranchContentProps(nodeProps()));
      const splitVisibilityProps = /* @__PURE__ */ user_derived(createSplitProps);
      const $$d = /* @__PURE__ */ user_derived(() => get$3(splitVisibilityProps)(get$3(contentProps), ["hidden", "data-state"])), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), branchContentProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(get$3(branchContentProps), props));
      var fragment = comment();
      var node = first_child(fragment);
      component(node, () => Collapsible_content, ($$anchor2, Collapsible_Content) => {
        Collapsible_Content($$anchor2, spread_props(() => get$3(mergedProps), {
          get ref() {
            return ref2();
          },
          set ref($$value) {
            ref2($$value);
          }
        }));
      });
      append$1($$anchor, fragment);
      pop();
    }
    function Tree_view_branch_control($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const treeView = useTreeViewContext();
      const nodeProps = useTreeViewNodePropsContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(treeView().getBranchControlProps(nodeProps()), props));
      Factory($$anchor, spread_props({ as: "div" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    function Tree_view_branch_indent_guide($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const treeView = useTreeViewContext();
      const nodeProps = useTreeViewNodePropsContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(treeView().getBranchIndentGuideProps(nodeProps()), props));
      Factory($$anchor, spread_props({ as: "div" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    function Tree_view_branch_text($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const treeView = useTreeViewContext();
      const nodeProps = useTreeViewNodePropsContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(treeView().getBranchTextProps(nodeProps()), props));
      Factory($$anchor, spread_props({ as: "span" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    function Tree_view_item($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const treeView = useTreeViewContext();
      const nodeProps = useTreeViewNodePropsContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(treeView().getItemProps(nodeProps()), props));
      Factory($$anchor, spread_props({ as: "li" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    function Tree_view_item_text($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const treeView = useTreeViewContext();
      const nodeProps = useTreeViewNodePropsContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(treeView().getItemTextProps(nodeProps()), props));
      Factory($$anchor, spread_props({ as: "span" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    function Tree_view_node_context($$anchor, $$props) {
      push($$props, true);
      const nodeContext = useTreeViewNodeContext();
      var fragment = comment();
      var node = first_child(fragment);
      snippet(node, () => $$props.render, () => nodeContext);
      append$1($$anchor, fragment);
      pop();
    }
    function Tree_view_node_provider($$anchor, $$props) {
      push($$props, true);
      const treeView = useTreeViewContext();
      const nodeProps = /* @__PURE__ */ user_derived(() => ({ node: $$props.node, indexPath: $$props.indexPath }));
      const nodeState = /* @__PURE__ */ user_derived(() => treeView().getNodeState(get$3(nodeProps)));
      TreeViewNodeProvider(() => get$3(nodeState));
      TreeViewNodePropsProvider(() => get$3(nodeProps));
      var fragment = comment();
      var node_1 = first_child(fragment);
      snippet(node_1, () => $$props.children ?? noop$2);
      append$1($$anchor, fragment);
      pop();
    }
    const splitFn = createSplitProps();
    function splitTreeViewProps(props) {
      return splitFn(props, [
        "canRename",
        "checkedValue",
        "collection",
        "defaultCheckedValue",
        "defaultExpandedValue",
        "defaultFocusedValue",
        "defaultSelectedValue",
        "expandedValue",
        "expandOnClick",
        "focusedValue",
        "id",
        "ids",
        "loadChildren",
        "onBeforeRename",
        "onCheckedChange",
        "onExpandedChange",
        "onFocusChange",
        "onLoadChildrenComplete",
        "onLoadChildrenError",
        "onRenameComplete",
        "onRenameStart",
        "onSelectionChange",
        "selectedValue",
        "selectionMode",
        "typeahead",
        "scrollToIndexFn"
      ]);
    }
    var anatomy = createAnatomy("tree-view").parts(
      "branch",
      "branchContent",
      "branchControl",
      "branchIndentGuide",
      "branchIndicator",
      "branchText",
      "branchTrigger",
      "item",
      "itemIndicator",
      "itemText",
      "label",
      "nodeCheckbox",
      "nodeRenameInput",
      "root",
      "tree"
    );
    var parts = anatomy.build();
    var collection = (options) => {
      return new TreeCollection(options);
    };
    collection.empty = () => {
      return new TreeCollection({ rootNode: { children: [] } });
    };
    var getRootId = (ctx) => ctx.ids?.root ?? `tree:${ctx.id}:root`;
    var getLabelId = (ctx) => ctx.ids?.label ?? `tree:${ctx.id}:label`;
    var getNodeId = (ctx, value) => ctx.ids?.node?.(value) ?? `tree:${ctx.id}:node:${value}`;
    var getTreeId = (ctx) => ctx.ids?.tree ?? `tree:${ctx.id}:tree`;
    var focusNode = (ctx, value) => {
      if (value == null) return;
      ctx.getById(getNodeId(ctx, value))?.focus();
    };
    var getRenameInputId = (ctx, value) => `tree:${ctx.id}:rename-input:${value}`;
    var getRenameInputEl = (ctx, value) => {
      return ctx.getById(getRenameInputId(ctx, value));
    };
    function getCheckedState(collection2, node, checkedValue) {
      const value = collection2.getNodeValue(node);
      if (!collection2.isBranchNode(node)) {
        return checkedValue.includes(value);
      }
      const childValues = collection2.getDescendantValues(value);
      const allChecked = childValues.every((v) => checkedValue.includes(v));
      const someChecked = childValues.some((v) => checkedValue.includes(v));
      return allChecked ? true : someChecked ? "indeterminate" : false;
    }
    function toggleBranchChecked(collection2, value, checkedValue) {
      const childValues = collection2.getDescendantValues(value);
      const allChecked = childValues.every((child2) => checkedValue.includes(child2));
      return uniq(allChecked ? remove$1(checkedValue, ...childValues) : add(checkedValue, ...childValues));
    }
    function getCheckedValueMap(collection2, checkedValue) {
      const map2 = /* @__PURE__ */ new Map();
      collection2.visit({
        onEnter: (node) => {
          const value = collection2.getNodeValue(node);
          const isBranch = collection2.isBranchNode(node);
          const checked = getCheckedState(collection2, node, checkedValue);
          map2.set(value, {
            type: isBranch ? "branch" : "leaf",
            checked
          });
        }
      });
      return map2;
    }
    function connect(service, normalize) {
      const { context, scope, computed, prop: prop2, send } = service;
      const collection2 = prop2("collection");
      const expandedValue = Array.from(context.get("expandedValue"));
      const selectedValue = Array.from(context.get("selectedValue"));
      const checkedValue = Array.from(context.get("checkedValue"));
      const isTypingAhead = computed("isTypingAhead");
      const focusedValue = context.get("focusedValue");
      const loadingStatus = context.get("loadingStatus");
      const renamingValue = context.get("renamingValue");
      const skip = ({ indexPath }) => {
        const paths = collection2.getValuePath(indexPath).slice(0, -1);
        return paths.some((value) => !expandedValue.includes(value));
      };
      const firstNode = collection2.getFirstNode(void 0, { skip });
      const firstNodeValue = firstNode ? collection2.getNodeValue(firstNode) : null;
      function getNodeState(props) {
        const { node, indexPath } = props;
        const value = collection2.getNodeValue(node);
        return {
          id: getNodeId(scope, value),
          value,
          indexPath,
          valuePath: collection2.getValuePath(indexPath),
          disabled: Boolean(node.disabled),
          focused: focusedValue == null ? firstNodeValue === value : focusedValue === value,
          selected: selectedValue.includes(value),
          expanded: expandedValue.includes(value),
          loading: loadingStatus[value] === "loading",
          depth: indexPath.length,
          isBranch: collection2.isBranchNode(node),
          renaming: renamingValue === value,
          get checked() {
            return getCheckedState(collection2, node, checkedValue);
          }
        };
      }
      return {
        collection: collection2,
        expandedValue,
        selectedValue,
        checkedValue,
        toggleChecked(value, isBranch) {
          send({ type: "CHECKED.TOGGLE", value, isBranch });
        },
        setChecked(value) {
          send({ type: "CHECKED.SET", value });
        },
        clearChecked() {
          send({ type: "CHECKED.CLEAR" });
        },
        getCheckedMap() {
          return getCheckedValueMap(collection2, checkedValue);
        },
        expand(value) {
          send({ type: value ? "BRANCH.EXPAND" : "EXPANDED.ALL", value });
        },
        collapse(value) {
          send({ type: value ? "BRANCH.COLLAPSE" : "EXPANDED.CLEAR", value });
        },
        deselect(value) {
          send({ type: value ? "NODE.DESELECT" : "SELECTED.CLEAR", value });
        },
        select(value) {
          send({ type: value ? "NODE.SELECT" : "SELECTED.ALL", value, isTrusted: false });
        },
        getVisibleNodes() {
          return computed("visibleNodes");
        },
        focus(value) {
          focusNode(scope, value);
        },
        selectParent(value) {
          const parentNode = collection2.getParentNode(value);
          if (!parentNode) return;
          const _selectedValue = add(selectedValue, collection2.getNodeValue(parentNode));
          send({ type: "SELECTED.SET", value: _selectedValue, src: "select.parent" });
        },
        expandParent(value) {
          const parentNode = collection2.getParentNode(value);
          if (!parentNode) return;
          const _expandedValue = add(expandedValue, collection2.getNodeValue(parentNode));
          send({ type: "EXPANDED.SET", value: _expandedValue, src: "expand.parent" });
        },
        setExpandedValue(value) {
          const _expandedValue = uniq(value);
          send({ type: "EXPANDED.SET", value: _expandedValue });
        },
        setSelectedValue(value) {
          const _selectedValue = uniq(value);
          send({ type: "SELECTED.SET", value: _selectedValue });
        },
        startRenaming(value) {
          send({ type: "NODE.RENAME", value });
        },
        submitRenaming(value, label) {
          send({ type: "RENAME.SUBMIT", value, label });
        },
        cancelRenaming() {
          send({ type: "RENAME.CANCEL" });
        },
        getRootProps() {
          return normalize.element({
            ...parts.root.attrs,
            id: getRootId(scope),
            dir: prop2("dir")
          });
        },
        getLabelProps() {
          return normalize.element({
            ...parts.label.attrs,
            id: getLabelId(scope),
            dir: prop2("dir")
          });
        },
        getTreeProps() {
          return normalize.element({
            ...parts.tree.attrs,
            id: getTreeId(scope),
            dir: prop2("dir"),
            role: "tree",
            "aria-label": "Tree View",
            "aria-labelledby": getLabelId(scope),
            "aria-multiselectable": prop2("selectionMode") === "multiple" || void 0,
            tabIndex: -1,
            onKeyDown(event2) {
              if (event2.defaultPrevented) return;
              if (isComposingEvent(event2)) return;
              const target = getEventTarget(event2);
              if (isEditableElement(target)) return;
              const node = target?.closest("[data-part=branch-control], [data-part=item]");
              if (!node) return;
              const nodeId = node.dataset.value;
              if (nodeId == null) {
                console.warn(`[zag-js/tree-view] Node id not found for node`, node);
                return;
              }
              const isBranchNode = node.matches("[data-part=branch-control]");
              const keyMap2 = {
                ArrowDown(event22) {
                  if (isModifierKey(event22)) return;
                  event22.preventDefault();
                  send({ type: "NODE.ARROW_DOWN", id: nodeId, shiftKey: event22.shiftKey });
                },
                ArrowUp(event22) {
                  if (isModifierKey(event22)) return;
                  event22.preventDefault();
                  send({ type: "NODE.ARROW_UP", id: nodeId, shiftKey: event22.shiftKey });
                },
                ArrowLeft(event22) {
                  if (isModifierKey(event22) || node.dataset.disabled) return;
                  event22.preventDefault();
                  send({ type: isBranchNode ? "BRANCH_NODE.ARROW_LEFT" : "NODE.ARROW_LEFT", id: nodeId });
                },
                ArrowRight(event22) {
                  if (!isBranchNode || node.dataset.disabled) return;
                  event22.preventDefault();
                  send({ type: "BRANCH_NODE.ARROW_RIGHT", id: nodeId });
                },
                Home(event22) {
                  if (isModifierKey(event22)) return;
                  event22.preventDefault();
                  send({ type: "NODE.HOME", id: nodeId, shiftKey: event22.shiftKey });
                },
                End(event22) {
                  if (isModifierKey(event22)) return;
                  event22.preventDefault();
                  send({ type: "NODE.END", id: nodeId, shiftKey: event22.shiftKey });
                },
                Space(event22) {
                  if (node.dataset.disabled) return;
                  if (isTypingAhead) {
                    send({ type: "TREE.TYPEAHEAD", key: event22.key });
                  } else {
                    keyMap2.Enter?.(event22);
                  }
                },
                Enter(event22) {
                  if (node.dataset.disabled) return;
                  if (isAnchorElement(target) && isModifierKey(event22)) return;
                  send({ type: isBranchNode ? "BRANCH_NODE.CLICK" : "NODE.CLICK", id: nodeId, src: "keyboard" });
                  if (!isAnchorElement(target)) {
                    event22.preventDefault();
                  }
                },
                "*"(event22) {
                  if (node.dataset.disabled) return;
                  event22.preventDefault();
                  send({ type: "SIBLINGS.EXPAND", id: nodeId });
                },
                a(event22) {
                  if (!event22.metaKey || node.dataset.disabled) return;
                  event22.preventDefault();
                  send({ type: "SELECTED.ALL", moveFocus: true });
                },
                F2(event22) {
                  if (node.dataset.disabled) return;
                  const canRenameFn = prop2("canRename");
                  if (!canRenameFn) return;
                  const indexPath = collection2.getIndexPath(nodeId);
                  if (indexPath) {
                    const node2 = collection2.at(indexPath);
                    if (node2 && !canRenameFn(node2, indexPath)) {
                      return;
                    }
                  }
                  event22.preventDefault();
                  send({ type: "NODE.RENAME", value: nodeId });
                }
              };
              const key2 = getEventKey(event2, { dir: prop2("dir") });
              const exec = keyMap2[key2];
              if (exec) {
                exec(event2);
                return;
              }
              if (!getByTypeahead.isValidEvent(event2)) return;
              send({ type: "TREE.TYPEAHEAD", key: event2.key, id: nodeId });
              event2.preventDefault();
            }
          });
        },
        getNodeState,
        getItemProps(props) {
          const nodeState = getNodeState(props);
          return normalize.element({
            ...parts.item.attrs,
            id: nodeState.id,
            dir: prop2("dir"),
            "data-ownedby": getTreeId(scope),
            "data-path": props.indexPath.join("/"),
            "data-value": nodeState.value,
            tabIndex: nodeState.focused ? 0 : -1,
            "data-focus": dataAttr(nodeState.focused),
            role: "treeitem",
            "aria-current": nodeState.selected ? "true" : void 0,
            "aria-selected": nodeState.disabled ? void 0 : nodeState.selected,
            "data-selected": dataAttr(nodeState.selected),
            "aria-disabled": ariaAttr(nodeState.disabled),
            "data-disabled": dataAttr(nodeState.disabled),
            "data-renaming": dataAttr(nodeState.renaming),
            "aria-level": nodeState.depth,
            "data-depth": nodeState.depth,
            style: {
              "--depth": nodeState.depth
            },
            onFocus(event2) {
              event2.stopPropagation();
              send({ type: "NODE.FOCUS", id: nodeState.value });
            },
            onClick(event2) {
              if (nodeState.disabled) return;
              if (!isLeftClick(event2)) return;
              if (isAnchorElement(event2.currentTarget) && isModifierKey(event2)) return;
              const isMetaKey = event2.metaKey || event2.ctrlKey;
              send({ type: "NODE.CLICK", id: nodeState.value, shiftKey: event2.shiftKey, ctrlKey: isMetaKey });
              event2.stopPropagation();
              if (!isAnchorElement(event2.currentTarget)) {
                event2.preventDefault();
              }
            }
          });
        },
        getItemTextProps(props) {
          const itemState = getNodeState(props);
          return normalize.element({
            ...parts.itemText.attrs,
            "data-disabled": dataAttr(itemState.disabled),
            "data-selected": dataAttr(itemState.selected),
            "data-focus": dataAttr(itemState.focused)
          });
        },
        getItemIndicatorProps(props) {
          const itemState = getNodeState(props);
          return normalize.element({
            ...parts.itemIndicator.attrs,
            "aria-hidden": true,
            "data-disabled": dataAttr(itemState.disabled),
            "data-selected": dataAttr(itemState.selected),
            "data-focus": dataAttr(itemState.focused),
            hidden: !itemState.selected
          });
        },
        getBranchProps(props) {
          const nodeState = getNodeState(props);
          return normalize.element({
            ...parts.branch.attrs,
            "data-depth": nodeState.depth,
            dir: prop2("dir"),
            "data-branch": nodeState.value,
            role: "treeitem",
            "data-ownedby": getTreeId(scope),
            "data-value": nodeState.value,
            "aria-level": nodeState.depth,
            "aria-selected": nodeState.disabled ? void 0 : nodeState.selected,
            "data-path": props.indexPath.join("/"),
            "data-selected": dataAttr(nodeState.selected),
            "aria-expanded": nodeState.expanded,
            "data-state": nodeState.expanded ? "open" : "closed",
            "aria-disabled": ariaAttr(nodeState.disabled),
            "data-disabled": dataAttr(nodeState.disabled),
            "data-loading": dataAttr(nodeState.loading),
            "aria-busy": ariaAttr(nodeState.loading),
            style: {
              "--depth": nodeState.depth
            }
          });
        },
        getBranchIndicatorProps(props) {
          const nodeState = getNodeState(props);
          return normalize.element({
            ...parts.branchIndicator.attrs,
            "aria-hidden": true,
            "data-state": nodeState.expanded ? "open" : "closed",
            "data-disabled": dataAttr(nodeState.disabled),
            "data-selected": dataAttr(nodeState.selected),
            "data-focus": dataAttr(nodeState.focused),
            "data-loading": dataAttr(nodeState.loading)
          });
        },
        getBranchTriggerProps(props) {
          const nodeState = getNodeState(props);
          return normalize.element({
            ...parts.branchTrigger.attrs,
            role: "button",
            dir: prop2("dir"),
            "data-disabled": dataAttr(nodeState.disabled),
            "data-state": nodeState.expanded ? "open" : "closed",
            "data-value": nodeState.value,
            "data-loading": dataAttr(nodeState.loading),
            disabled: nodeState.loading,
            onClick(event2) {
              if (nodeState.disabled || nodeState.loading) return;
              send({ type: "BRANCH_TOGGLE.CLICK", id: nodeState.value });
              event2.stopPropagation();
            }
          });
        },
        getBranchControlProps(props) {
          const nodeState = getNodeState(props);
          return normalize.element({
            ...parts.branchControl.attrs,
            role: "button",
            id: nodeState.id,
            dir: prop2("dir"),
            tabIndex: nodeState.focused ? 0 : -1,
            "data-path": props.indexPath.join("/"),
            "data-state": nodeState.expanded ? "open" : "closed",
            "data-disabled": dataAttr(nodeState.disabled),
            "data-selected": dataAttr(nodeState.selected),
            "data-focus": dataAttr(nodeState.focused),
            "data-renaming": dataAttr(nodeState.renaming),
            "data-value": nodeState.value,
            "data-depth": nodeState.depth,
            "data-loading": dataAttr(nodeState.loading),
            "aria-busy": ariaAttr(nodeState.loading),
            onFocus(event2) {
              send({ type: "NODE.FOCUS", id: nodeState.value });
              event2.stopPropagation();
            },
            onClick(event2) {
              if (nodeState.disabled) return;
              if (nodeState.loading) return;
              if (!isLeftClick(event2)) return;
              if (isAnchorElement(event2.currentTarget) && isModifierKey(event2)) return;
              const isMetaKey = event2.metaKey || event2.ctrlKey;
              send({ type: "BRANCH_NODE.CLICK", id: nodeState.value, shiftKey: event2.shiftKey, ctrlKey: isMetaKey });
              event2.stopPropagation();
            }
          });
        },
        getBranchTextProps(props) {
          const nodeState = getNodeState(props);
          return normalize.element({
            ...parts.branchText.attrs,
            dir: prop2("dir"),
            "data-disabled": dataAttr(nodeState.disabled),
            "data-state": nodeState.expanded ? "open" : "closed",
            "data-loading": dataAttr(nodeState.loading)
          });
        },
        getBranchContentProps(props) {
          const nodeState = getNodeState(props);
          return normalize.element({
            ...parts.branchContent.attrs,
            role: "group",
            dir: prop2("dir"),
            "data-state": nodeState.expanded ? "open" : "closed",
            "data-depth": nodeState.depth,
            "data-path": props.indexPath.join("/"),
            "data-value": nodeState.value,
            hidden: !nodeState.expanded
          });
        },
        getBranchIndentGuideProps(props) {
          const nodeState = getNodeState(props);
          return normalize.element({
            ...parts.branchIndentGuide.attrs,
            "data-depth": nodeState.depth
          });
        },
        getNodeCheckboxProps(props) {
          const nodeState = getNodeState(props);
          const checkedState = nodeState.checked;
          return normalize.element({
            ...parts.nodeCheckbox.attrs,
            tabIndex: -1,
            role: "checkbox",
            "data-state": checkedState === true ? "checked" : checkedState === false ? "unchecked" : "indeterminate",
            "aria-checked": checkedState === true ? "true" : checkedState === false ? "false" : "mixed",
            "data-disabled": dataAttr(nodeState.disabled),
            onClick(event2) {
              if (event2.defaultPrevented) return;
              if (nodeState.disabled) return;
              if (!isLeftClick(event2)) return;
              send({ type: "CHECKED.TOGGLE", value: nodeState.value, isBranch: nodeState.isBranch });
              event2.stopPropagation();
              const node = event2.currentTarget.closest("[role=treeitem]");
              node?.focus({ preventScroll: true });
            }
          });
        },
        getNodeRenameInputProps(props) {
          const nodeState = getNodeState(props);
          return normalize.input({
            ...parts.nodeRenameInput.attrs,
            id: getRenameInputId(scope, nodeState.value),
            type: "text",
            "aria-label": "Rename tree item",
            hidden: !nodeState.renaming,
            onKeyDown(event2) {
              if (isComposingEvent(event2)) return;
              if (event2.key === "Escape") {
                send({ type: "RENAME.CANCEL" });
                event2.preventDefault();
              }
              if (event2.key === "Enter") {
                send({ type: "RENAME.SUBMIT", label: event2.currentTarget.value });
                event2.preventDefault();
              }
              event2.stopPropagation();
            },
            onBlur(event2) {
              send({ type: "RENAME.SUBMIT", label: event2.currentTarget.value });
            }
          });
        }
      };
    }
    function expandBranches(params, values) {
      const { context, prop: prop2, refs } = params;
      if (!prop2("loadChildren")) {
        context.set("expandedValue", (prev2) => uniq(add(prev2, ...values)));
        return;
      }
      const loadingStatus = context.get("loadingStatus");
      const [loadedValues, loadingValues] = partition(values, (value) => loadingStatus[value] === "loaded");
      if (loadedValues.length > 0) {
        context.set("expandedValue", (prev2) => uniq(add(prev2, ...loadedValues)));
      }
      if (loadingValues.length === 0) return;
      const collection2 = prop2("collection");
      const [nodeWithChildren, nodeWithoutChildren] = partition(loadingValues, (id) => {
        const node = collection2.findNode(id);
        return collection2.getNodeChildren(node).length > 0;
      });
      if (nodeWithChildren.length > 0) {
        context.set("expandedValue", (prev2) => uniq(add(prev2, ...nodeWithChildren)));
      }
      if (nodeWithoutChildren.length === 0) return;
      context.set("loadingStatus", (prev2) => ({
        ...prev2,
        ...nodeWithoutChildren.reduce((acc, id) => ({ ...acc, [id]: "loading" }), {})
      }));
      const nodesToLoad = nodeWithoutChildren.map((id) => {
        const indexPath = collection2.getIndexPath(id);
        const valuePath = collection2.getValuePath(indexPath);
        const node = collection2.findNode(id);
        return { id, indexPath, valuePath, node };
      });
      const pendingAborts = refs.get("pendingAborts");
      const loadChildren = prop2("loadChildren");
      ensure(loadChildren, () => "[zag-js/tree-view] `loadChildren` is required for async expansion");
      const proms = nodesToLoad.map(({ id, indexPath, valuePath, node }) => {
        const existingAbort = pendingAborts.get(id);
        if (existingAbort) {
          existingAbort.abort();
          pendingAborts.delete(id);
        }
        const abortController = new AbortController();
        pendingAborts.set(id, abortController);
        return loadChildren({
          valuePath,
          indexPath,
          node,
          signal: abortController.signal
        });
      });
      Promise.allSettled(proms).then((results) => {
        const loadedValues2 = [];
        const nodeWithErrors = [];
        const nextLoadingStatus = context.get("loadingStatus");
        let collection22 = prop2("collection");
        results.forEach((result, index2) => {
          const { id, indexPath, node, valuePath } = nodesToLoad[index2];
          if (result.status === "fulfilled") {
            nextLoadingStatus[id] = "loaded";
            loadedValues2.push(id);
            collection22 = collection22.replace(indexPath, { ...node, children: result.value });
          } else {
            pendingAborts.delete(id);
            Reflect.deleteProperty(nextLoadingStatus, id);
            nodeWithErrors.push({ node, error: result.reason, indexPath, valuePath });
          }
        });
        context.set("loadingStatus", nextLoadingStatus);
        if (loadedValues2.length) {
          context.set("expandedValue", (prev2) => uniq(add(prev2, ...loadedValues2)));
          prop2("onLoadChildrenComplete")?.({ collection: collection22 });
        }
        if (nodeWithErrors.length) {
          prop2("onLoadChildrenError")?.({ nodes: nodeWithErrors });
        }
      });
    }
    function skipFn(params) {
      const { prop: prop2, context } = params;
      return function skip({ indexPath }) {
        const paths = prop2("collection").getValuePath(indexPath).slice(0, -1);
        return paths.some((value) => !context.get("expandedValue").includes(value));
      };
    }
    var { and } = createGuards();
    var machine = createMachine$1({
      props({ props }) {
        return {
          selectionMode: "single",
          collection: collection.empty(),
          typeahead: true,
          expandOnClick: true,
          defaultExpandedValue: [],
          defaultSelectedValue: [],
          ...props
        };
      },
      initialState() {
        return "idle";
      },
      context({ prop: prop2, bindable: bindable2, getContext: getContext2 }) {
        return {
          expandedValue: bindable2(() => ({
            defaultValue: prop2("defaultExpandedValue"),
            value: prop2("expandedValue"),
            isEqual,
            onChange(expandedValue) {
              const ctx = getContext2();
              const focusedValue = ctx.get("focusedValue");
              prop2("onExpandedChange")?.({
                expandedValue,
                focusedValue,
                get expandedNodes() {
                  return prop2("collection").findNodes(expandedValue);
                }
              });
            }
          })),
          selectedValue: bindable2(() => ({
            defaultValue: prop2("defaultSelectedValue"),
            value: prop2("selectedValue"),
            isEqual,
            onChange(selectedValue) {
              const ctx = getContext2();
              const focusedValue = ctx.get("focusedValue");
              prop2("onSelectionChange")?.({
                selectedValue,
                focusedValue,
                get selectedNodes() {
                  return prop2("collection").findNodes(selectedValue);
                }
              });
            }
          })),
          focusedValue: bindable2(() => ({
            defaultValue: prop2("defaultFocusedValue") || null,
            value: prop2("focusedValue"),
            onChange(focusedValue) {
              prop2("onFocusChange")?.({
                focusedValue,
                get focusedNode() {
                  return focusedValue ? prop2("collection").findNode(focusedValue) : null;
                }
              });
            }
          })),
          loadingStatus: bindable2(() => ({
            defaultValue: {}
          })),
          checkedValue: bindable2(() => ({
            defaultValue: prop2("defaultCheckedValue") || [],
            value: prop2("checkedValue"),
            isEqual,
            onChange(value) {
              prop2("onCheckedChange")?.({ checkedValue: value });
            }
          })),
          renamingValue: bindable2(() => ({
            sync: true,
            defaultValue: null
          }))
        };
      },
      refs() {
        return {
          typeaheadState: { ...getByTypeahead.defaultOptions },
          pendingAborts: /* @__PURE__ */ new Map()
        };
      },
      computed: {
        isMultipleSelection: ({ prop: prop2 }) => prop2("selectionMode") === "multiple",
        isTypingAhead: ({ refs }) => refs.get("typeaheadState").keysSoFar.length > 0,
        visibleNodes: ({ prop: prop2, context }) => {
          const nodes = [];
          prop2("collection").visit({
            skip: skipFn({ prop: prop2, context }),
            onEnter: (node, indexPath) => {
              nodes.push({ node, indexPath });
            }
          });
          return nodes;
        }
      },
      on: {
        "EXPANDED.SET": {
          actions: ["setExpanded"]
        },
        "EXPANDED.CLEAR": {
          actions: ["clearExpanded"]
        },
        "EXPANDED.ALL": {
          actions: ["expandAllBranches"]
        },
        "BRANCH.EXPAND": {
          actions: ["expandBranches"]
        },
        "BRANCH.COLLAPSE": {
          actions: ["collapseBranches"]
        },
        "SELECTED.SET": {
          actions: ["setSelected"]
        },
        "SELECTED.ALL": [
          {
            guard: and("isMultipleSelection", "moveFocus"),
            actions: ["selectAllNodes", "focusTreeLastNode"]
          },
          {
            guard: "isMultipleSelection",
            actions: ["selectAllNodes"]
          }
        ],
        "SELECTED.CLEAR": {
          actions: ["clearSelected"]
        },
        "NODE.SELECT": {
          actions: ["selectNode"]
        },
        "NODE.DESELECT": {
          actions: ["deselectNode"]
        },
        "CHECKED.TOGGLE": {
          actions: ["toggleChecked"]
        },
        "CHECKED.SET": {
          actions: ["setChecked"]
        },
        "CHECKED.CLEAR": {
          actions: ["clearChecked"]
        },
        "NODE.FOCUS": {
          actions: ["setFocusedNode"]
        },
        "NODE.ARROW_DOWN": [
          {
            guard: and("isShiftKey", "isMultipleSelection"),
            actions: ["focusTreeNextNode", "extendSelectionToNextNode"]
          },
          {
            actions: ["focusTreeNextNode"]
          }
        ],
        "NODE.ARROW_UP": [
          {
            guard: and("isShiftKey", "isMultipleSelection"),
            actions: ["focusTreePrevNode", "extendSelectionToPrevNode"]
          },
          {
            actions: ["focusTreePrevNode"]
          }
        ],
        "NODE.ARROW_LEFT": {
          actions: ["focusBranchNode"]
        },
        "BRANCH_NODE.ARROW_LEFT": [
          {
            guard: "isBranchExpanded",
            actions: ["collapseBranch"]
          },
          {
            actions: ["focusBranchNode"]
          }
        ],
        "BRANCH_NODE.ARROW_RIGHT": [
          {
            guard: and("isBranchFocused", "isBranchExpanded"),
            actions: ["focusBranchFirstNode"]
          },
          {
            actions: ["expandBranch"]
          }
        ],
        "SIBLINGS.EXPAND": {
          actions: ["expandSiblingBranches"]
        },
        "NODE.HOME": [
          {
            guard: and("isShiftKey", "isMultipleSelection"),
            actions: ["extendSelectionToFirstNode", "focusTreeFirstNode"]
          },
          {
            actions: ["focusTreeFirstNode"]
          }
        ],
        "NODE.END": [
          {
            guard: and("isShiftKey", "isMultipleSelection"),
            actions: ["extendSelectionToLastNode", "focusTreeLastNode"]
          },
          {
            actions: ["focusTreeLastNode"]
          }
        ],
        "NODE.CLICK": [
          {
            guard: and("isCtrlKey", "isMultipleSelection"),
            actions: ["toggleNodeSelection"]
          },
          {
            guard: and("isShiftKey", "isMultipleSelection"),
            actions: ["extendSelectionToNode"]
          },
          {
            actions: ["selectNode"]
          }
        ],
        "BRANCH_NODE.CLICK": [
          {
            guard: and("isCtrlKey", "isMultipleSelection"),
            actions: ["toggleNodeSelection"]
          },
          {
            guard: and("isShiftKey", "isMultipleSelection"),
            actions: ["extendSelectionToNode"]
          },
          {
            guard: "expandOnClick",
            actions: ["selectNode", "toggleBranchNode"]
          },
          {
            actions: ["selectNode"]
          }
        ],
        "BRANCH_TOGGLE.CLICK": {
          actions: ["toggleBranchNode"]
        },
        "TREE.TYPEAHEAD": {
          actions: ["focusMatchedNode"]
        }
      },
      exit: ["clearPendingAborts"],
      states: {
        idle: {
          on: {
            "NODE.RENAME": {
              target: "renaming",
              actions: ["setRenamingValue"]
            }
          }
        },
        renaming: {
          entry: ["syncRenameInput", "focusRenameInput"],
          on: {
            "RENAME.SUBMIT": {
              guard: "isRenameLabelValid",
              target: "idle",
              actions: ["submitRenaming"]
            },
            "RENAME.CANCEL": {
              target: "idle",
              actions: ["cancelRenaming"]
            }
          }
        }
      },
      implementations: {
        guards: {
          isBranchFocused: ({ context, event: event2 }) => context.get("focusedValue") === event2.id,
          isBranchExpanded: ({ context, event: event2 }) => context.get("expandedValue").includes(event2.id),
          isShiftKey: ({ event: event2 }) => event2.shiftKey,
          isCtrlKey: ({ event: event2 }) => event2.ctrlKey,
          hasSelectedItems: ({ context }) => context.get("selectedValue").length > 0,
          isMultipleSelection: ({ prop: prop2 }) => prop2("selectionMode") === "multiple",
          moveFocus: ({ event: event2 }) => !!event2.moveFocus,
          expandOnClick: ({ prop: prop2 }) => !!prop2("expandOnClick"),
          isRenameLabelValid: ({ event: event2 }) => event2.label.trim() !== ""
        },
        actions: {
          selectNode({ context, event: event2 }) {
            const value = event2.id || event2.value;
            context.set("selectedValue", (prev2) => {
              if (value == null) return prev2;
              if (!event2.isTrusted && isArray(value)) return prev2.concat(...value);
              return [isArray(value) ? last(value) : value].filter(Boolean);
            });
          },
          deselectNode({ context, event: event2 }) {
            const value = toArray(event2.id || event2.value);
            context.set("selectedValue", (prev2) => remove$1(prev2, ...value));
          },
          setFocusedNode({ context, event: event2 }) {
            context.set("focusedValue", event2.id);
          },
          clearFocusedNode({ context }) {
            context.set("focusedValue", null);
          },
          clearSelectedItem({ context }) {
            context.set("selectedValue", []);
          },
          toggleBranchNode({ context, event: event2, action: action2 }) {
            const isExpanded = context.get("expandedValue").includes(event2.id);
            action2(isExpanded ? ["collapseBranch"] : ["expandBranch"]);
          },
          expandBranch(params) {
            const { event: event2 } = params;
            expandBranches(params, [event2.id]);
          },
          expandBranches(params) {
            const { context, event: event2 } = params;
            const valuesToExpand = toArray(event2.value);
            expandBranches(params, diff(valuesToExpand, context.get("expandedValue")));
          },
          collapseBranch({ context, event: event2 }) {
            context.set("expandedValue", (prev2) => remove$1(prev2, event2.id));
          },
          collapseBranches(params) {
            const { context, event: event2 } = params;
            const value = toArray(event2.value);
            context.set("expandedValue", (prev2) => remove$1(prev2, ...value));
          },
          setExpanded({ context, event: event2 }) {
            if (!isArray(event2.value)) return;
            context.set("expandedValue", event2.value);
          },
          clearExpanded({ context }) {
            context.set("expandedValue", []);
          },
          setSelected({ context, event: event2 }) {
            if (!isArray(event2.value)) return;
            context.set("selectedValue", event2.value);
          },
          clearSelected({ context }) {
            context.set("selectedValue", []);
          },
          focusTreeFirstNode(params) {
            const { prop: prop2, scope } = params;
            const collection2 = prop2("collection");
            const firstNode = collection2.getFirstNode(void 0, { skip: skipFn(params) });
            if (!firstNode) return;
            const firstValue = collection2.getNodeValue(firstNode);
            const scrolled = scrollToNode(params, firstValue);
            if (scrolled) raf(() => focusNode(scope, firstValue));
            else focusNode(scope, firstValue);
          },
          focusTreeLastNode(params) {
            const { prop: prop2, scope } = params;
            const collection2 = prop2("collection");
            const lastNode = collection2.getLastNode(void 0, { skip: skipFn(params) });
            const lastValue = collection2.getNodeValue(lastNode);
            const scrolled = scrollToNode(params, lastValue);
            if (scrolled) raf(() => focusNode(scope, lastValue));
            else focusNode(scope, lastValue);
          },
          focusBranchFirstNode(params) {
            const { event: event2, prop: prop2, scope } = params;
            const collection2 = prop2("collection");
            const branchNode = collection2.findNode(event2.id);
            const firstNode = collection2.getFirstNode(branchNode, { skip: skipFn(params) });
            if (!firstNode) return;
            const firstValue = collection2.getNodeValue(firstNode);
            const scrolled = scrollToNode(params, firstValue);
            if (scrolled) raf(() => focusNode(scope, firstValue));
            else focusNode(scope, firstValue);
          },
          focusTreeNextNode(params) {
            const { event: event2, prop: prop2, scope } = params;
            const collection2 = prop2("collection");
            const nextNode = collection2.getNextNode(event2.id, { skip: skipFn(params) });
            if (!nextNode) return;
            const nextValue = collection2.getNodeValue(nextNode);
            const scrolled = scrollToNode(params, nextValue);
            if (scrolled) raf(() => focusNode(scope, nextValue));
            else focusNode(scope, nextValue);
          },
          focusTreePrevNode(params) {
            const { event: event2, prop: prop2, scope } = params;
            const collection2 = prop2("collection");
            const prevNode = collection2.getPreviousNode(event2.id, { skip: skipFn(params) });
            if (!prevNode) return;
            const prevValue = collection2.getNodeValue(prevNode);
            const scrolled = scrollToNode(params, prevValue);
            if (scrolled) raf(() => focusNode(scope, prevValue));
            else focusNode(scope, prevValue);
          },
          focusBranchNode(params) {
            const { event: event2, prop: prop2, scope } = params;
            const collection2 = prop2("collection");
            const parentNode = collection2.getParentNode(event2.id);
            const parentValue = parentNode ? collection2.getNodeValue(parentNode) : void 0;
            if (!parentValue) return;
            const scrolled = scrollToNode(params, parentValue);
            if (scrolled) raf(() => focusNode(scope, parentValue));
            else focusNode(scope, parentValue);
          },
          selectAllNodes({ context, prop: prop2 }) {
            context.set("selectedValue", prop2("collection").getValues());
          },
          focusMatchedNode(params) {
            const { context, prop: prop2, refs, event: event2, scope, computed } = params;
            const nodes = computed("visibleNodes");
            const elements = nodes.map(({ node: node2 }) => ({
              textContent: prop2("collection").stringifyNode(node2),
              id: prop2("collection").getNodeValue(node2)
            }));
            const node = getByTypeahead(elements, {
              state: refs.get("typeaheadState"),
              activeId: context.get("focusedValue"),
              key: event2.key
            });
            if (!node?.id) return;
            const scrolled = scrollToNode(params, node.id);
            if (scrolled) raf(() => focusNode(scope, node.id));
            else focusNode(scope, node.id);
          },
          toggleNodeSelection({ context, event: event2 }) {
            const selectedValue = addOrRemove(context.get("selectedValue"), event2.id);
            context.set("selectedValue", selectedValue);
          },
          expandAllBranches(params) {
            const { context, prop: prop2 } = params;
            const branchValues = prop2("collection").getBranchValues();
            const valuesToExpand = diff(branchValues, context.get("expandedValue"));
            expandBranches(params, valuesToExpand);
          },
          expandSiblingBranches(params) {
            const { context, event: event2, prop: prop2 } = params;
            const collection2 = prop2("collection");
            const indexPath = collection2.getIndexPath(event2.id);
            if (!indexPath) return;
            const nodes = collection2.getSiblingNodes(indexPath);
            const values = nodes.map((node) => collection2.getNodeValue(node));
            const valuesToExpand = diff(values, context.get("expandedValue"));
            expandBranches(params, valuesToExpand);
          },
          extendSelectionToNode(params) {
            const { context, event: event2, prop: prop2, computed } = params;
            const collection2 = prop2("collection");
            const anchorValue = first(context.get("selectedValue")) || collection2.getNodeValue(collection2.getFirstNode());
            const targetValue = event2.id;
            let values = [anchorValue, targetValue];
            let hits = 0;
            const visibleNodes = computed("visibleNodes");
            visibleNodes.forEach(({ node }) => {
              const nodeValue = collection2.getNodeValue(node);
              if (hits === 1) values.push(nodeValue);
              if (nodeValue === anchorValue || nodeValue === targetValue) hits++;
            });
            context.set("selectedValue", uniq(values));
          },
          extendSelectionToNextNode(params) {
            const { context, event: event2, prop: prop2 } = params;
            const collection2 = prop2("collection");
            const nextNode = collection2.getNextNode(event2.id, { skip: skipFn(params) });
            if (!nextNode) return;
            const values = new Set(context.get("selectedValue"));
            const nextValue = collection2.getNodeValue(nextNode);
            if (nextValue == null) return;
            if (values.has(event2.id) && values.has(nextValue)) {
              values.delete(event2.id);
            } else if (!values.has(nextValue)) {
              values.add(nextValue);
            }
            context.set("selectedValue", Array.from(values));
          },
          extendSelectionToPrevNode(params) {
            const { context, event: event2, prop: prop2 } = params;
            const collection2 = prop2("collection");
            const prevNode = collection2.getPreviousNode(event2.id, { skip: skipFn(params) });
            if (!prevNode) return;
            const values = new Set(context.get("selectedValue"));
            const prevValue = collection2.getNodeValue(prevNode);
            if (prevValue == null) return;
            if (values.has(event2.id) && values.has(prevValue)) {
              values.delete(event2.id);
            } else if (!values.has(prevValue)) {
              values.add(prevValue);
            }
            context.set("selectedValue", Array.from(values));
          },
          extendSelectionToFirstNode(params) {
            const { context, prop: prop2 } = params;
            const collection2 = prop2("collection");
            const currentSelection = first(context.get("selectedValue"));
            const values = [];
            collection2.visit({
              skip: skipFn(params),
              onEnter: (node) => {
                const nodeValue = collection2.getNodeValue(node);
                values.push(nodeValue);
                if (nodeValue === currentSelection) {
                  return "stop";
                }
              }
            });
            context.set("selectedValue", values);
          },
          extendSelectionToLastNode(params) {
            const { context, prop: prop2 } = params;
            const collection2 = prop2("collection");
            const currentSelection = first(context.get("selectedValue"));
            const values = [];
            let current = false;
            collection2.visit({
              skip: skipFn(params),
              onEnter: (node) => {
                const nodeValue = collection2.getNodeValue(node);
                if (nodeValue === currentSelection) current = true;
                if (current) values.push(nodeValue);
              }
            });
            context.set("selectedValue", values);
          },
          clearPendingAborts({ refs }) {
            const aborts = refs.get("pendingAborts");
            aborts.forEach((abort) => abort.abort());
            aborts.clear();
          },
          toggleChecked({ context, event: event2, prop: prop2 }) {
            const collection2 = prop2("collection");
            context.set(
              "checkedValue",
              (prev2) => event2.isBranch ? toggleBranchChecked(collection2, event2.value, prev2) : addOrRemove(prev2, event2.value)
            );
          },
          setChecked({ context, event: event2 }) {
            context.set("checkedValue", event2.value);
          },
          clearChecked({ context }) {
            context.set("checkedValue", []);
          },
          setRenamingValue({ context, event: event2, prop: prop2 }) {
            context.set("renamingValue", event2.value);
            const onRenameStartFn = prop2("onRenameStart");
            if (onRenameStartFn) {
              const collection2 = prop2("collection");
              const indexPath = collection2.getIndexPath(event2.value);
              if (indexPath) {
                const node = collection2.at(indexPath);
                if (node) {
                  onRenameStartFn({
                    value: event2.value,
                    node,
                    indexPath
                  });
                }
              }
            }
          },
          submitRenaming({ context, event: event2, prop: prop2, scope }) {
            const renamingValue = context.get("renamingValue");
            if (!renamingValue) return;
            const collection2 = prop2("collection");
            const indexPath = collection2.getIndexPath(renamingValue);
            if (!indexPath) return;
            const trimmedLabel = event2.label.trim();
            const onBeforeRenameFn = prop2("onBeforeRename");
            if (onBeforeRenameFn) {
              const details = {
                value: renamingValue,
                label: trimmedLabel,
                indexPath
              };
              const shouldRename = onBeforeRenameFn(details);
              if (!shouldRename) {
                context.set("renamingValue", null);
                focusNode(scope, renamingValue);
                return;
              }
            }
            prop2("onRenameComplete")?.({
              value: renamingValue,
              label: trimmedLabel,
              indexPath
            });
            context.set("renamingValue", null);
            focusNode(scope, renamingValue);
          },
          cancelRenaming({ context, scope }) {
            const renamingValue = context.get("renamingValue");
            context.set("renamingValue", null);
            if (renamingValue) {
              focusNode(scope, renamingValue);
            }
          },
          syncRenameInput({ context, scope, prop: prop2 }) {
            const renamingValue = context.get("renamingValue");
            if (!renamingValue) return;
            const collection2 = prop2("collection");
            const node = collection2.findNode(renamingValue);
            if (!node) return;
            const label = collection2.stringifyNode(node);
            const inputEl = getRenameInputEl(scope, renamingValue);
            setElementValue(inputEl, label);
          },
          focusRenameInput({ context, scope }) {
            const renamingValue = context.get("renamingValue");
            if (!renamingValue) return;
            const inputEl = getRenameInputEl(scope, renamingValue);
            if (!inputEl) return;
            inputEl.focus();
            inputEl.select();
          }
        }
      }
    });
    function scrollToNode(params, value) {
      const { prop: prop2, scope, computed } = params;
      const scrollToIndexFn = prop2("scrollToIndexFn");
      if (!scrollToIndexFn) return false;
      const collection2 = prop2("collection");
      const visibleNodes = computed("visibleNodes");
      for (let i = 0; i < visibleNodes.length; i++) {
        const { node, indexPath } = visibleNodes[i];
        if (collection2.getNodeValue(node) !== value) continue;
        scrollToIndexFn({
          index: i,
          node,
          indexPath,
          getElement: () => scope.getById(getNodeId(scope, value))
        });
        return true;
      }
      return false;
    }
    const useTreeView = (props) => {
      const env = useEnvironmentContext();
      const locale = useLocaleContext();
      const machineProps = /* @__PURE__ */ user_derived(() => {
        const resolvedProps = runIfFn$1(props);
        ensureProps(resolvedProps, ["id"]);
        return {
          dir: locale().dir,
          getRootNode: env().getRootNode,
          ...resolvedProps
        };
      });
      const service = useMachine(machine, () => get$3(machineProps));
      const api = /* @__PURE__ */ user_derived(() => connect(service, normalizeProps));
      return () => get$3(api);
    };
    function Tree_view_root($$anchor, $$props) {
      const id = props_id();
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), expandedValue = prop($$props, "expandedValue", 15), selectedValue = prop($$props, "selectedValue", 15), focusedValue = prop($$props, "focusedValue", 15), checkedValue = prop($$props, "checkedValue", 15), props = /* @__PURE__ */ rest_props($$props, [
        "$$slots",
        "$$events",
        "$$legacy",
        "ref",
        "expandedValue",
        "selectedValue",
        "focusedValue",
        "checkedValue"
      ]);
      const $$d = /* @__PURE__ */ user_derived(() => splitRenderStrategyProps(props)), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), renderStrategyProps = /* @__PURE__ */ user_derived(() => get$3($$array)[0]), treeViewProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const $$d_1 = /* @__PURE__ */ user_derived(() => splitTreeViewProps(get$3(treeViewProps))), $$array_1 = /* @__PURE__ */ user_derived(() => to_array(get$3($$d_1), 2)), useTreeViewProps = /* @__PURE__ */ user_derived(() => get$3($$array_1)[0]), localProps = /* @__PURE__ */ user_derived(() => get$3($$array_1)[1]);
      const machineProps = /* @__PURE__ */ user_derived(() => ({
        ...get$3(useTreeViewProps),
        id: get$3(useTreeViewProps).id ?? id,
        selectedValue: selectedValue(),
        expandedValue: expandedValue(),
        focusedValue: focusedValue(),
        checkedValue: checkedValue(),
        onExpandedChange: (details) => {
          get$3(useTreeViewProps).onExpandedChange?.(details);
          expandedValue(details.expandedValue);
        },
        onFocusChange: (details) => {
          get$3(useTreeViewProps).onFocusChange?.(details);
          focusedValue(details.focusedValue);
        },
        onSelectionChange: (details) => {
          get$3(useTreeViewProps).onSelectionChange?.(details);
          selectedValue(details.selectedValue);
        },
        onCheckedChange: (details) => {
          get$3(useTreeViewProps).onCheckedChange?.(details);
          checkedValue(details.checkedValue);
        }
      }));
      const treeView = useTreeView(() => get$3(machineProps));
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(treeView().getRootProps(), get$3(localProps)));
      TreeViewProvider(treeView);
      RenderStrategyPropsProvider(() => get$3(renderStrategyProps));
      Factory($$anchor, spread_props({ as: "div" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    function Tree_view_tree($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const treeView = useTreeViewContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(treeView().getTreeProps(), props));
      Factory($$anchor, spread_props({ as: "div" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    var anatomy$2 = createAnatomy("splitter").parts("root", "panel", "resizeTrigger", "resizeTriggerIndicator");
    var parts$2 = anatomy$2.build();
    var getRootId$2 = (ctx) => ctx.ids?.root ?? `splitter:${ctx.id}`;
    var getResizeTriggerId = (ctx, id) => ctx.ids?.resizeTrigger?.(id) ?? `splitter:${ctx.id}:splitter:${id}`;
    var getPanelId = (ctx, id) => ctx.ids?.panel?.(id) ?? `splitter:${ctx.id}:panel:${id}`;
    var getGlobalCursorId = (ctx) => `splitter:${ctx.id}:global-cursor`;
    var getRootEl = (ctx) => ctx.getById(getRootId$2(ctx));
    var getResizeTriggerEl = (ctx, id) => ctx.getById(getResizeTriggerId(ctx, id));
    var getCursor = (state2, x) => {
      let cursor = x ? "col-resize" : "row-resize";
      if (state2.isAtMin) cursor = x ? "e-resize" : "s-resize";
      if (state2.isAtMax) cursor = x ? "w-resize" : "n-resize";
      return cursor;
    };
    var getResizeTriggerEls = (ctx) => {
      return queryAll(getRootEl(ctx), `[role=separator][data-ownedby='${CSS.escape(getRootId$2(ctx))}']`);
    };
    var setupGlobalCursor = (ctx, state2, x, nonce) => {
      const styleEl = ctx.getById(getGlobalCursorId(ctx));
      const textContent = `* { cursor: ${getCursor(state2, x)} !important; }`;
      if (styleEl) {
        styleEl.textContent = textContent;
      } else {
        const style = ctx.getDoc().createElement("style");
        if (nonce) style.nonce = nonce;
        style.id = getGlobalCursorId(ctx);
        style.textContent = textContent;
        ctx.getDoc().head.appendChild(style);
      }
    };
    var removeGlobalCursor = (ctx) => {
      const styleEl = ctx.getById(getGlobalCursorId(ctx));
      styleEl?.remove();
    };
    function calculateAriaValues({
      size,
      panels,
      pivotIndices
    }) {
      let currentMinSize = 0;
      let currentMaxSize = 100;
      let totalMinSize = 0;
      let totalMaxSize = 0;
      const firstIndex = pivotIndices[0];
      ensure(firstIndex, () => "No pivot index found");
      panels.forEach((panel, index2) => {
        const { maxSize = 100, minSize = 0 } = panel;
        if (index2 === firstIndex) {
          currentMinSize = minSize;
          currentMaxSize = maxSize;
        } else {
          totalMinSize += minSize;
          totalMaxSize += maxSize;
        }
      });
      const valueMax = Math.min(currentMaxSize, 100 - totalMinSize);
      const valueMin = Math.max(currentMinSize, 100 - totalMaxSize);
      const valueNow = size[firstIndex];
      return {
        valueMax,
        valueMin,
        valueNow
      };
    }
    function getAriaValue(size, panels, handleId) {
      const [beforeId, afterId] = handleId.split(":");
      const beforeIndex = panels.findIndex((panel) => panel.id === beforeId);
      const afterIndex = panels.findIndex((panel) => panel.id === afterId);
      const { valueMax, valueMin, valueNow } = calculateAriaValues({
        size,
        panels,
        pivotIndices: [beforeIndex, afterIndex]
      });
      return {
        beforeId,
        afterId,
        valueMax: Math.round(valueMax),
        valueMin: Math.round(valueMin),
        valueNow: valueNow != null ? Math.round(valueNow) : void 0
      };
    }
    var PRECISION = 10;
    function fuzzyCompareNumbers(actual, expected, fractionDigits = PRECISION) {
      if (actual.toFixed(fractionDigits) === expected.toFixed(fractionDigits)) {
        return 0;
      } else {
        return actual > expected ? 1 : -1;
      }
    }
    function fuzzyNumbersEqual(actual, expected, fractionDigits = PRECISION) {
      if (actual == null || expected == null) return false;
      return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
    }
    function fuzzySizeEqual(actual, expected, fractionDigits) {
      if (actual.length !== expected.length) {
        return false;
      }
      for (let index2 = 0; index2 < actual.length; index2++) {
        const actualSize = actual[index2];
        const expectedSize = expected[index2];
        if (!fuzzyNumbersEqual(actualSize, expectedSize, fractionDigits)) {
          return false;
        }
      }
      return true;
    }
    function getPanelById(panels, id) {
      const panel = panels.find((panel2) => panel2.id === id);
      ensure(panel, () => `Panel data not found for id "${id}"`);
      return panel;
    }
    function findPanelDataIndex(panels, panel) {
      return panels.findIndex((prevPanel) => prevPanel === panel || prevPanel.id === panel.id);
    }
    function findPanelIndex(panels, id) {
      return panels.findIndex((panel) => panel.id === id);
    }
    function panelDataHelper(panels, panel, sizes) {
      const index2 = findPanelIndex(panels, panel.id);
      const pivotIndices = index2 === panels.length - 1 ? [index2 - 1, index2] : [index2, index2 + 1];
      const panelSize = sizes[index2];
      return { ...panel, panelSize, pivotIndices };
    }
    function sortPanels(panels) {
      return panels.sort((panelA, panelB) => {
        const orderA = panelA.order;
        const orderB = panelB.order;
        if (orderA == null && orderB == null) {
          return 0;
        } else if (orderA == null) {
          return -1;
        } else if (orderB == null) {
          return 1;
        } else {
          return orderA - orderB;
        }
      });
    }
    function getPanelLayout(panels) {
      return panels.map((panel) => panel.id).sort().join(":");
    }
    function serializePanels(panels) {
      const keys2 = panels.map((panel) => panel.id);
      const sortedKeys = keys2.sort();
      const serialized = sortedKeys.map((key2) => {
        const panel = panels.find((panel2) => panel2.id === key2);
        return JSON.stringify(panel);
      });
      return serialized.join(",");
    }
    function getPanelFlexBoxStyle({
      defaultSize,
      dragState,
      sizes,
      panels,
      panelIndex,
      precision = 3
    }) {
      const size = sizes[panelIndex];
      let flexGrow;
      if (size == null) {
        flexGrow = defaultSize != void 0 ? defaultSize.toPrecision(precision) : "1";
      } else if (panels.length === 1) {
        flexGrow = "1";
      } else {
        flexGrow = size.toPrecision(precision);
      }
      return {
        flexBasis: 0,
        flexGrow,
        flexShrink: 1,
        // Without this, Panel sizes may be unintentionally overridden by their content
        overflow: "hidden",
        // Disable pointer events inside of a panel during resize
        // This avoid edge cases like nested iframes
        pointerEvents: dragState !== null ? "none" : void 0
      };
    }
    function getUnsafeDefaultSize({ panels, size: sizes }) {
      const finalSizes = Array(panels.length);
      let numPanelsWithSizes = 0;
      let remainingSize = 100;
      for (let index2 = 0; index2 < panels.length; index2++) {
        const panel = panels[index2];
        ensure(panel, () => `Panel data not found for index ${index2}`);
        const defaultSize = sizes[index2];
        if (defaultSize != null) {
          numPanelsWithSizes++;
          finalSizes[index2] = defaultSize;
          remainingSize -= defaultSize;
        }
      }
      for (let index2 = 0; index2 < panels.length; index2++) {
        const panel = panels[index2];
        ensure(panel, () => `Panel data not found for index ${index2}`);
        const defaultSize = sizes[index2];
        if (defaultSize != null) {
          continue;
        }
        const numRemainingPanels = panels.length - numPanelsWithSizes;
        const size = remainingSize / numRemainingPanels;
        numPanelsWithSizes++;
        finalSizes[index2] = size;
        remainingSize -= size;
      }
      return finalSizes;
    }
    function connect$2(service, normalize) {
      const { state: state2, send, prop: prop2, computed, context, scope } = service;
      const horizontal = computed("horizontal");
      const dragging = state2.matches("dragging");
      const orientation = prop2("orientation");
      const getPanelStyle = (id) => {
        const panels = prop2("panels");
        const panelIndex = panels.findIndex((panel) => panel.id === id);
        const defaultSize = context.initial("size")[panelIndex];
        const dragState = context.get("dragState");
        return getPanelFlexBoxStyle({
          defaultSize,
          dragState,
          sizes: context.get("size"),
          panels,
          panelIndex
        });
      };
      const getResizeTriggerState = (props) => {
        const { id, disabled } = props;
        const dragging2 = context.get("dragState")?.resizeTriggerId === id;
        const focused = dragging2 || context.get("keyboardState")?.resizeTriggerId === id;
        return {
          dragging: dragging2,
          focused,
          disabled: !!disabled
        };
      };
      return {
        dragging,
        orientation,
        getPanels() {
          return prop2("panels");
        },
        getPanelById(id) {
          return getPanelById(prop2("panels"), id);
        },
        getItems() {
          return prop2("panels").flatMap((panel, index2, arr) => {
            const nextPanel = arr[index2 + 1];
            if (panel && nextPanel) {
              return [
                { type: "panel", id: panel.id },
                { type: "handle", id: `${panel.id}:${nextPanel.id}` }
              ];
            }
            return [{ type: "panel", id: panel.id }];
          });
        },
        getSizes() {
          return context.get("size");
        },
        setSizes(size) {
          send({ type: "SIZE.SET", size });
        },
        resetSizes() {
          send({ type: "SIZE.SET", size: context.initial("size") });
        },
        collapsePanel(id) {
          send({ type: "PANEL.COLLAPSE", id });
        },
        expandPanel(id, minSize) {
          send({ type: "PANEL.EXPAND", id, minSize });
        },
        resizePanel(id, unsafePanelSize) {
          send({ type: "PANEL.RESIZE", id, size: unsafePanelSize });
        },
        getPanelSize(id) {
          const panels = prop2("panels");
          const size = context.get("size");
          const panelData = getPanelById(panels, id);
          const { panelSize } = panelDataHelper(panels, panelData, size);
          ensure(panelSize, () => `Panel size not found for panel "${panelData.id}"`);
          return panelSize;
        },
        isPanelCollapsed(id) {
          const panels = prop2("panels");
          const size = context.get("size");
          const panelData = getPanelById(panels, id);
          const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panels, panelData, size);
          ensure(panelSize, () => `Panel size not found for panel "${panelData.id}"`);
          return collapsible === true && fuzzyNumbersEqual(panelSize, collapsedSize);
        },
        isPanelExpanded(id) {
          const panels = prop2("panels");
          const size = context.get("size");
          const panelData = getPanelById(panels, id);
          const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panels, panelData, size);
          ensure(panelSize, () => `Panel size not found for panel "${panelData.id}"`);
          return !collapsible || fuzzyCompareNumbers(panelSize, collapsedSize) > 0;
        },
        getLayout() {
          return getPanelLayout(prop2("panels"));
        },
        getRootProps() {
          return normalize.element({
            ...parts$2.root.attrs,
            "data-orientation": orientation,
            "data-dragging": dataAttr(dragging),
            id: getRootId$2(scope),
            dir: prop2("dir"),
            style: {
              display: "flex",
              flexDirection: horizontal ? "row" : "column",
              height: "100%",
              width: "100%",
              overflow: "hidden"
            }
          });
        },
        getPanelProps(props) {
          const { id } = props;
          return normalize.element({
            ...parts$2.panel.attrs,
            "data-orientation": orientation,
            "data-dragging": dataAttr(dragging),
            dir: prop2("dir"),
            "data-id": id,
            "data-index": findPanelIndex(prop2("panels"), id),
            id: getPanelId(scope, id),
            "data-ownedby": getRootId$2(scope),
            style: getPanelStyle(id)
          });
        },
        getResizeTriggerState,
        getResizeTriggerIndicator(props) {
          const triggerState = getResizeTriggerState(props);
          return normalize.element({
            ...parts$2.resizeTriggerIndicator.attrs,
            "data-orientation": orientation,
            "data-focus": dataAttr(triggerState.focused),
            "data-dragging": dataAttr(triggerState.dragging),
            "data-disabled": dataAttr(triggerState.disabled),
            "data-ownedby": getRootId$2(scope)
          });
        },
        getResizeTriggerProps(props) {
          const { id } = props;
          const triggerState = getResizeTriggerState(props);
          const aria = getAriaValue(context.get("size"), prop2("panels"), id);
          return normalize.element({
            ...parts$2.resizeTrigger.attrs,
            dir: prop2("dir"),
            id: getResizeTriggerId(scope, id),
            role: "separator",
            "data-id": id,
            "data-ownedby": getRootId$2(scope),
            tabIndex: triggerState.disabled ? void 0 : 0,
            "aria-valuenow": aria.valueNow,
            "aria-valuemin": aria.valueMin,
            "aria-valuemax": aria.valueMax,
            "data-orientation": orientation,
            "aria-orientation": orientation,
            "aria-controls": `${getPanelId(scope, aria.beforeId)} ${getPanelId(scope, aria.afterId)}`,
            "data-focus": dataAttr(triggerState.focused),
            "data-dragging": dataAttr(triggerState.dragging),
            "data-disabled": dataAttr(triggerState.disabled),
            style: {
              touchAction: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              flex: "0 0 auto",
              pointerEvents: triggerState.disabled ? "none" : triggerState.dragging && !triggerState.focused ? "none" : void 0,
              cursor: triggerState.disabled ? void 0 : horizontal ? "col-resize" : "row-resize",
              [horizontal ? "minHeight" : "minWidth"]: "0"
            },
            onPointerDown(event2) {
              if (!isLeftClick(event2)) return;
              if (triggerState.disabled) {
                event2.preventDefault();
                return;
              }
              const point = getEventPoint(event2);
              send({ type: "POINTER_DOWN", id, point });
              event2.currentTarget.setPointerCapture(event2.pointerId);
              event2.preventDefault();
              event2.stopPropagation();
            },
            onPointerUp(event2) {
              if (triggerState.disabled) return;
              if (event2.currentTarget.hasPointerCapture(event2.pointerId)) {
                event2.currentTarget.releasePointerCapture(event2.pointerId);
              }
            },
            onPointerOver() {
              if (triggerState.disabled) return;
              send({ type: "POINTER_OVER", id });
            },
            onPointerLeave() {
              if (triggerState.disabled) return;
              send({ type: "POINTER_LEAVE", id });
            },
            onBlur() {
              if (triggerState.disabled) return;
              send({ type: "BLUR" });
            },
            onFocus() {
              if (triggerState.disabled) return;
              send({ type: "FOCUS", id });
            },
            onKeyDown(event2) {
              if (event2.defaultPrevented) return;
              if (triggerState.disabled) return;
              const keyboardResizeBy = prop2("keyboardResizeBy");
              let delta = 0;
              if (event2.shiftKey) {
                delta = 10;
              } else if (keyboardResizeBy != null) {
                delta = keyboardResizeBy;
              } else {
                delta = 1;
              }
              const keyMap2 = {
                Enter() {
                  send({ type: "ENTER", id });
                },
                ArrowUp() {
                  send({ type: "KEYBOARD_MOVE", id, delta: horizontal ? 0 : -delta });
                },
                ArrowDown() {
                  send({ type: "KEYBOARD_MOVE", id, delta: horizontal ? 0 : delta });
                },
                ArrowLeft() {
                  send({ type: "KEYBOARD_MOVE", id, delta: horizontal ? -delta : 0 });
                },
                ArrowRight() {
                  send({ type: "KEYBOARD_MOVE", id, delta: horizontal ? delta : 0 });
                },
                Home() {
                  send({ type: "KEYBOARD_MOVE", id, delta: -100 });
                },
                End() {
                  send({ type: "KEYBOARD_MOVE", id, delta: 100 });
                },
                F6() {
                  send({ type: "FOCUS.CYCLE", id, shiftKey: event2.shiftKey });
                }
              };
              const key2 = getEventKey(event2, {
                dir: prop2("dir"),
                orientation
              });
              const exec = keyMap2[key2];
              if (exec) {
                exec(event2);
                event2.preventDefault();
              }
            }
          });
        }
      };
    }
    function resizePanel({ panels, index: index2, size }) {
      const panel = panels[index2];
      ensure(panel, () => `Panel data not found for index ${index2}`);
      let { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = panel;
      if (fuzzyCompareNumbers(size, minSize) < 0) {
        if (collapsible) {
          const halfwayPoint = (collapsedSize + minSize) / 2;
          if (fuzzyCompareNumbers(size, halfwayPoint) < 0) {
            size = collapsedSize;
          } else {
            size = minSize;
          }
        } else {
          size = minSize;
        }
      }
      size = Math.min(maxSize, size);
      size = parseFloat(size.toFixed(PRECISION));
      return size;
    }
    function resizeByDelta(props) {
      let { delta, initialSize, panels, pivotIndices, prevSize, trigger } = props;
      if (fuzzyNumbersEqual(delta, 0)) {
        return initialSize;
      }
      const nextSize = [...initialSize];
      const [firstPivotIndex, secondPivotIndex] = pivotIndices;
      ensure(firstPivotIndex, () => "Invalid first pivot index");
      ensure(secondPivotIndex, () => "Invalid second pivot index");
      let deltaApplied = 0;
      {
        if (trigger === "keyboard") {
          {
            const index2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
            const panel = panels[index2];
            ensure(panel, () => `Panel data not found for index ${index2}`);
            const { collapsedSize = 0, collapsible, minSize = 0 } = panel;
            if (collapsible) {
              const prevSize2 = initialSize[index2];
              ensure(prevSize2, () => `Previous size not found for panel index ${index2}`);
              if (fuzzyNumbersEqual(prevSize2, collapsedSize)) {
                const localDelta = minSize - prevSize2;
                if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
                  delta = delta < 0 ? 0 - localDelta : localDelta;
                }
              }
            }
          }
          {
            const index2 = delta < 0 ? firstPivotIndex : secondPivotIndex;
            const panel = panels[index2];
            ensure(panel, () => `No panel data found for index ${index2}`);
            const { collapsedSize = 0, collapsible, minSize = 0 } = panel;
            if (collapsible) {
              const prevSize2 = initialSize[index2];
              ensure(prevSize2, () => `Previous size not found for panel index ${index2}`);
              if (fuzzyNumbersEqual(prevSize2, minSize)) {
                const localDelta = prevSize2 - collapsedSize;
                if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
                  delta = delta < 0 ? 0 - localDelta : localDelta;
                }
              }
            }
          }
        }
      }
      {
        const increment2 = delta < 0 ? 1 : -1;
        let index2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
        let maxAvailableDelta = 0;
        while (true) {
          const prevSize2 = initialSize[index2];
          ensure(prevSize2, () => `Previous size not found for panel index ${index2}`);
          const maxSafeSize = resizePanel({
            panels,
            index: index2,
            size: 100
          });
          const delta2 = maxSafeSize - prevSize2;
          maxAvailableDelta += delta2;
          index2 += increment2;
          if (index2 < 0 || index2 >= panels.length) {
            break;
          }
        }
        const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
        delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
      }
      {
        const pivotIndex = delta < 0 ? firstPivotIndex : secondPivotIndex;
        let index2 = pivotIndex;
        while (index2 >= 0 && index2 < panels.length) {
          const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
          const prevSize2 = initialSize[index2];
          ensure(prevSize2, () => `Previous size not found for panel index ${index2}`);
          const unsafeSize = prevSize2 - deltaRemaining;
          const safeSize = resizePanel({ panels, index: index2, size: unsafeSize });
          if (!fuzzyNumbersEqual(prevSize2, safeSize)) {
            deltaApplied += prevSize2 - safeSize;
            nextSize[index2] = safeSize;
            if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, {
              numeric: true
            }) >= 0) {
              break;
            }
          }
          if (delta < 0) {
            index2--;
          } else {
            index2++;
          }
        }
      }
      if (fuzzySizeEqual(prevSize, nextSize)) {
        return prevSize;
      }
      {
        const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
        const prevSize2 = initialSize[pivotIndex];
        ensure(prevSize2, () => `Previous size not found for panel index ${pivotIndex}`);
        const unsafeSize = prevSize2 + deltaApplied;
        const safeSize = resizePanel({ panels, index: pivotIndex, size: unsafeSize });
        nextSize[pivotIndex] = safeSize;
        if (!fuzzyNumbersEqual(safeSize, unsafeSize)) {
          let deltaRemaining = unsafeSize - safeSize;
          const pivotIndex2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
          let index2 = pivotIndex2;
          while (index2 >= 0 && index2 < panels.length) {
            const prevSize3 = nextSize[index2];
            ensure(prevSize3, () => `Previous size not found for panel index ${index2}`);
            const unsafeSize2 = prevSize3 + deltaRemaining;
            const safeSize2 = resizePanel({ panels, index: index2, size: unsafeSize2 });
            if (!fuzzyNumbersEqual(prevSize3, safeSize2)) {
              deltaRemaining -= safeSize2 - prevSize3;
              nextSize[index2] = safeSize2;
            }
            if (fuzzyNumbersEqual(deltaRemaining, 0)) {
              break;
            }
            if (delta > 0) {
              index2--;
            } else {
              index2++;
            }
          }
        }
      }
      const totalSize = nextSize.reduce((total, size) => size + total, 0);
      if (!fuzzyNumbersEqual(totalSize, 100)) {
        return prevSize;
      }
      return nextSize;
    }
    function validateSizes({ size: prevSize, panels }) {
      const nextSize = [...prevSize];
      const nextSizeTotalSize = nextSize.reduce((accumulated, current) => accumulated + current, 0);
      if (nextSize.length !== panels.length) {
        throw Error(`Invalid ${panels.length} panel size: ${nextSize.map((size) => `${size}%`).join(", ")}`);
      } else if (!fuzzyNumbersEqual(nextSizeTotalSize, 100) && nextSize.length > 0) {
        for (let index2 = 0; index2 < panels.length; index2++) {
          const unsafeSize = nextSize[index2];
          ensure(unsafeSize, () => `No size data found for index ${index2}`);
          const safeSize = 100 / nextSizeTotalSize * unsafeSize;
          nextSize[index2] = safeSize;
        }
      }
      let remainingSize = 0;
      for (let index2 = 0; index2 < panels.length; index2++) {
        const unsafeSize = nextSize[index2];
        ensure(unsafeSize, () => `No size data found for index ${index2}`);
        const safeSize = resizePanel({ panels, index: index2, size: unsafeSize });
        if (unsafeSize != safeSize) {
          remainingSize += unsafeSize - safeSize;
          nextSize[index2] = safeSize;
        }
      }
      if (!fuzzyNumbersEqual(remainingSize, 0)) {
        for (let index2 = 0; index2 < panels.length; index2++) {
          const prevSize2 = nextSize[index2];
          ensure(prevSize2, () => `No size data found for index ${index2}`);
          const unsafeSize = prevSize2 + remainingSize;
          const safeSize = resizePanel({ panels, index: index2, size: unsafeSize });
          if (prevSize2 !== safeSize) {
            remainingSize -= safeSize - prevSize2;
            nextSize[index2] = safeSize;
            if (fuzzyNumbersEqual(remainingSize, 0)) {
              break;
            }
          }
        }
      }
      return nextSize;
    }
    var machine$2 = createMachine$1({
      props({ props }) {
        ensureProps(props, ["panels"]);
        return {
          orientation: "horizontal",
          defaultSize: [],
          dir: "ltr",
          ...props,
          panels: sortPanels(props.panels)
        };
      },
      initialState() {
        return "idle";
      },
      context({ prop: prop2, bindable: bindable2, getContext: getContext2, getRefs }) {
        return {
          size: bindable2(() => ({
            value: prop2("size"),
            defaultValue: prop2("defaultSize"),
            isEqual(a, b) {
              return b != null && fuzzySizeEqual(a, b);
            },
            onChange(value) {
              const ctx = getContext2();
              const refs = getRefs();
              const sizesBeforeCollapse = refs.get("panelSizeBeforeCollapse");
              const expandToSizes = Object.fromEntries(sizesBeforeCollapse.entries());
              const resizeTriggerId = ctx.get("dragState")?.resizeTriggerId ?? null;
              const layout = getPanelLayout(prop2("panels"));
              prop2("onResize")?.({
                size: value,
                layout,
                resizeTriggerId,
                expandToSizes
              });
            }
          })),
          dragState: bindable2(() => ({
            defaultValue: null
          })),
          keyboardState: bindable2(() => ({
            defaultValue: null
          }))
        };
      },
      watch({ track: track2, action: action2, prop: prop2 }) {
        track2([() => serializePanels(prop2("panels"))], () => {
          action2(["syncSize"]);
        });
      },
      refs() {
        return {
          panelSizeBeforeCollapse: /* @__PURE__ */ new Map(),
          prevDelta: 0,
          panelIdToLastNotifiedSizeMap: /* @__PURE__ */ new Map()
        };
      },
      computed: {
        horizontal({ prop: prop2 }) {
          return prop2("orientation") === "horizontal";
        }
      },
      on: {
        "SIZE.SET": {
          actions: ["setSize"]
        },
        "PANEL.COLLAPSE": {
          actions: ["collapsePanel"]
        },
        "PANEL.EXPAND": {
          actions: ["expandPanel"]
        },
        "PANEL.RESIZE": {
          actions: ["resizePanel"]
        }
      },
      entry: ["syncSize"],
      exit: ["clearGlobalCursor"],
      states: {
        idle: {
          entry: ["clearDraggingState", "clearKeyboardState"],
          on: {
            POINTER_OVER: {
              target: "hover:temp",
              actions: ["setKeyboardState"]
            },
            FOCUS: {
              target: "focused",
              actions: ["setKeyboardState"]
            },
            POINTER_DOWN: {
              target: "dragging",
              actions: ["setDraggingState"]
            }
          }
        },
        "hover:temp": {
          effects: ["waitForHoverDelay"],
          on: {
            HOVER_DELAY: {
              target: "hover"
            },
            POINTER_DOWN: {
              target: "dragging",
              actions: ["setDraggingState"]
            },
            POINTER_LEAVE: {
              target: "idle"
            }
          }
        },
        hover: {
          tags: ["focus"],
          on: {
            POINTER_DOWN: {
              target: "dragging",
              actions: ["setDraggingState"]
            },
            POINTER_LEAVE: {
              target: "idle"
            }
          }
        },
        focused: {
          tags: ["focus"],
          on: {
            BLUR: {
              target: "idle"
            },
            ENTER: {
              actions: ["collapseOrExpandPanel"]
            },
            POINTER_DOWN: {
              target: "dragging",
              actions: ["setDraggingState"]
            },
            KEYBOARD_MOVE: {
              actions: ["invokeOnResizeStart", "setKeyboardValue", "invokeOnResizeEnd"]
            },
            "FOCUS.CYCLE": {
              actions: ["focusNextResizeTrigger"]
            }
          }
        },
        dragging: {
          tags: ["focus"],
          effects: ["trackPointerMove"],
          entry: ["invokeOnResizeStart"],
          on: {
            POINTER_MOVE: {
              actions: ["setPointerValue", "setGlobalCursor"]
            },
            POINTER_UP: {
              target: "idle",
              actions: ["invokeOnResizeEnd", "clearGlobalCursor"]
            }
          }
        }
      },
      implementations: {
        effects: {
          waitForHoverDelay: ({ send }) => {
            return setRafTimeout(() => {
              send({ type: "HOVER_DELAY" });
            }, 250);
          },
          trackPointerMove: ({ scope, send }) => {
            const doc = scope.getDoc();
            return trackPointerMove(doc, {
              onPointerMove(info) {
                send({ type: "POINTER_MOVE", point: info.point });
              },
              onPointerUp() {
                send({ type: "POINTER_UP" });
              }
            });
          }
        },
        actions: {
          setSize(params) {
            const { context, event: event2, prop: prop2 } = params;
            const unsafeSize = event2.size;
            const prevSize = context.get("size");
            const panels = prop2("panels");
            const safeSize = validateSizes({
              size: unsafeSize,
              panels
            });
            if (!isEqual(prevSize, safeSize)) {
              setSize(params, safeSize);
            }
          },
          syncSize({ context, prop: prop2 }) {
            const panels = prop2("panels");
            let prevSize = context.get("size");
            let unsafeSize = null;
            if (prevSize.length === 0) {
              unsafeSize = getUnsafeDefaultSize({
                panels,
                size: context.initial("size")
              });
            }
            const nextSize = validateSizes({
              size: unsafeSize ?? prevSize,
              panels
            });
            if (!isEqual(prevSize, nextSize)) {
              context.set("size", nextSize);
            }
          },
          setDraggingState({ context, event: event2, prop: prop2, scope }) {
            const orientation = prop2("orientation");
            const size = context.get("size");
            const resizeTriggerId = event2.id;
            const panelGroupEl = getRootEl(scope);
            if (!panelGroupEl) return;
            const handleElement = getResizeTriggerEl(scope, resizeTriggerId);
            ensure(handleElement, () => `Drag handle element not found for id "${resizeTriggerId}"`);
            const initialCursorPosition = orientation === "horizontal" ? event2.point.x : event2.point.y;
            context.set("dragState", {
              resizeTriggerId: event2.id,
              resizeTriggerRect: handleElement.getBoundingClientRect(),
              initialCursorPosition,
              initialSize: size
            });
          },
          clearDraggingState({ context }) {
            context.set("dragState", null);
          },
          setKeyboardState({ context, event: event2 }) {
            context.set("keyboardState", {
              resizeTriggerId: event2.id
            });
          },
          clearKeyboardState({ context }) {
            context.set("keyboardState", null);
          },
          collapsePanel(params) {
            const { context, prop: prop2, event: event2, refs } = params;
            const prevSize = context.get("size");
            const panels = prop2("panels");
            const panel = panels.find((panel2) => panel2.id === event2.id);
            ensure(panel, () => `Panel data not found for id "${event2.id}"`);
            if (panel.collapsible) {
              const { collapsedSize = 0, panelSize, pivotIndices } = panelDataHelper(panels, panel, prevSize);
              ensure(panelSize, () => `Panel size not found for panel "${panel.id}"`);
              if (!fuzzyNumbersEqual(panelSize, collapsedSize)) {
                refs.get("panelSizeBeforeCollapse").set(panel.id, panelSize);
                const isLastPanel = findPanelDataIndex(panels, panel) === panels.length - 1;
                const delta = isLastPanel ? panelSize - collapsedSize : collapsedSize - panelSize;
                const nextSize = resizeByDelta({
                  delta,
                  initialSize: prevSize,
                  panels,
                  pivotIndices,
                  prevSize,
                  trigger: "imperative-api"
                });
                if (!isEqual(prevSize, nextSize)) {
                  setSize(params, nextSize);
                }
              }
            }
          },
          expandPanel(params) {
            const { context, prop: prop2, event: event2, refs } = params;
            const panels = prop2("panels");
            const prevSize = context.get("size");
            const panel = panels.find((panel2) => panel2.id === event2.id);
            ensure(panel, () => `Panel data not found for id "${event2.id}"`);
            if (panel.collapsible) {
              const {
                collapsedSize = 0,
                panelSize = 0,
                minSize: minSizeFromProps = 0,
                pivotIndices
              } = panelDataHelper(panels, panel, prevSize);
              const minSize = event2.minSize ?? minSizeFromProps;
              if (fuzzyNumbersEqual(panelSize, collapsedSize)) {
                const prevPanelSize = refs.get("panelSizeBeforeCollapse").get(panel.id);
                const baseSize = prevPanelSize != null && prevPanelSize >= minSize ? prevPanelSize : minSize;
                const isLastPanel = findPanelDataIndex(panels, panel) === panels.length - 1;
                const delta = isLastPanel ? panelSize - baseSize : baseSize - panelSize;
                const nextSize = resizeByDelta({
                  delta,
                  initialSize: prevSize,
                  panels,
                  pivotIndices,
                  prevSize,
                  trigger: "imperative-api"
                });
                if (!isEqual(prevSize, nextSize)) {
                  setSize(params, nextSize);
                }
              }
            }
          },
          resizePanel(params) {
            const { context, prop: prop2, event: event2 } = params;
            const prevSize = context.get("size");
            const panels = prop2("panels");
            const panel = getPanelById(panels, event2.id);
            const unsafePanelSize = event2.size;
            const { panelSize, pivotIndices } = panelDataHelper(panels, panel, prevSize);
            ensure(panelSize, () => `Panel size not found for panel "${panel.id}"`);
            const isLastPanel = findPanelDataIndex(panels, panel) === panels.length - 1;
            const delta = isLastPanel ? panelSize - unsafePanelSize : unsafePanelSize - panelSize;
            const nextSize = resizeByDelta({
              delta,
              initialSize: prevSize,
              panels,
              pivotIndices,
              prevSize,
              trigger: "imperative-api"
            });
            if (!isEqual(prevSize, nextSize)) {
              setSize(params, nextSize);
            }
          },
          setPointerValue(params) {
            const { context, event: event2, prop: prop2, scope } = params;
            const dragState = context.get("dragState");
            if (!dragState) return;
            const { resizeTriggerId, initialSize, initialCursorPosition } = dragState;
            const panels = prop2("panels");
            const panelGroupElement = getRootEl(scope);
            ensure(panelGroupElement, () => `Panel group element not found`);
            const pivotIndices = resizeTriggerId.split(":").map((id) => panels.findIndex((panel) => panel.id === id));
            const horizontal = prop2("orientation") === "horizontal";
            const cursorPosition = horizontal ? event2.point.x : event2.point.y;
            const groupRect = panelGroupElement.getBoundingClientRect();
            const groupSizeInPixels = horizontal ? groupRect.width : groupRect.height;
            const offsetPixels = cursorPosition - initialCursorPosition;
            const offsetPercentage = offsetPixels / groupSizeInPixels * 100;
            const prevSize = context.get("size");
            const nextSize = resizeByDelta({
              delta: offsetPercentage,
              initialSize: initialSize ?? prevSize,
              panels,
              pivotIndices,
              prevSize,
              trigger: "mouse-or-touch"
            });
            if (!isEqual(prevSize, nextSize)) {
              setSize(params, nextSize);
            }
          },
          setKeyboardValue(params) {
            const { context, event: event2, prop: prop2 } = params;
            const panelDataArray = prop2("panels");
            const resizeTriggerId = event2.id;
            const delta = event2.delta;
            const pivotIndices = resizeTriggerId.split(":").map((id) => panelDataArray.findIndex((panelData) => panelData.id === id));
            const prevSize = context.get("size");
            const nextSize = resizeByDelta({
              delta,
              initialSize: prevSize,
              panels: panelDataArray,
              pivotIndices,
              prevSize,
              trigger: "keyboard"
            });
            if (!isEqual(prevSize, nextSize)) {
              setSize(params, nextSize);
            }
          },
          invokeOnResizeEnd({ context, prop: prop2 }) {
            queueMicrotask(() => {
              const dragState = context.get("dragState");
              prop2("onResizeEnd")?.({
                size: context.get("size"),
                resizeTriggerId: dragState?.resizeTriggerId ?? null
              });
            });
          },
          invokeOnResizeStart({ prop: prop2 }) {
            queueMicrotask(() => {
              prop2("onResizeStart")?.();
            });
          },
          collapseOrExpandPanel(params) {
            const { context, prop: prop2 } = params;
            const panelDataArray = prop2("panels");
            const sizes = context.get("size");
            const resizeTriggerId = context.get("keyboardState")?.resizeTriggerId;
            const [idBefore, idAfter] = resizeTriggerId?.split(":") ?? [];
            const index2 = panelDataArray.findIndex((panelData2) => panelData2.id === idBefore);
            if (index2 === -1) return;
            const panelData = panelDataArray[index2];
            ensure(panelData, () => `No panel data found for index ${index2}`);
            const size = sizes[index2];
            const { collapsedSize = 0, collapsible, minSize = 0 } = panelData;
            if (size != null && collapsible) {
              const pivotIndices = [idBefore, idAfter].map(
                (id) => panelDataArray.findIndex((panelData2) => panelData2.id === id)
              );
              const nextSize = resizeByDelta({
                delta: fuzzyNumbersEqual(size, collapsedSize) ? minSize - collapsedSize : collapsedSize - size,
                initialSize: context.initial("size"),
                panels: panelDataArray,
                pivotIndices,
                prevSize: sizes,
                trigger: "keyboard"
              });
              if (!isEqual(sizes, nextSize)) {
                setSize(params, nextSize);
              }
            }
          },
          setGlobalCursor({ context, scope, prop: prop2 }) {
            const dragState = context.get("dragState");
            if (!dragState) return;
            const panels = prop2("panels");
            const horizontal = prop2("orientation") === "horizontal";
            const [idBefore] = dragState.resizeTriggerId.split(":");
            const indexBefore = panels.findIndex((panel2) => panel2.id === idBefore);
            const panel = panels[indexBefore];
            const size = context.get("size");
            const aria = getAriaValue(size, panels, dragState.resizeTriggerId);
            const isAtMin = fuzzyNumbersEqual(aria.valueNow, aria.valueMin) || fuzzyNumbersEqual(aria.valueNow, panel.collapsedSize);
            const isAtMax = fuzzyNumbersEqual(aria.valueNow, aria.valueMax);
            const cursorState = { isAtMin, isAtMax };
            setupGlobalCursor(scope, cursorState, horizontal, prop2("nonce"));
          },
          clearGlobalCursor({ scope }) {
            removeGlobalCursor(scope);
          },
          focusNextResizeTrigger({ event: event2, scope }) {
            const resizeTriggers = getResizeTriggerEls(scope);
            const index2 = resizeTriggers.findIndex((el) => el.dataset.id === event2.id);
            const handleEl = event2.shiftKey ? prev(resizeTriggers, index2) : next(resizeTriggers, index2);
            handleEl?.focus();
          }
        }
      }
    });
    function setSize(params, sizes) {
      const { refs, prop: prop2, context } = params;
      const panelsArray = prop2("panels");
      const onCollapse = prop2("onCollapse");
      const onExpand = prop2("onExpand");
      const panelIdToLastNotifiedSizeMap = refs.get("panelIdToLastNotifiedSizeMap");
      context.set("size", sizes);
      sizes.forEach((size, index2) => {
        const panelData = panelsArray[index2];
        ensure(panelData, () => `Panel data not found for index ${index2}`);
        const { collapsedSize = 0, collapsible, id: panelId } = panelData;
        const lastNotifiedSize = panelIdToLastNotifiedSizeMap.get(panelId);
        if (lastNotifiedSize == null || size !== lastNotifiedSize) {
          panelIdToLastNotifiedSizeMap.set(panelId, size);
          if (collapsible && (onCollapse || onExpand)) {
            if ((lastNotifiedSize == null || fuzzyNumbersEqual(lastNotifiedSize, collapsedSize)) && !fuzzyNumbersEqual(size, collapsedSize)) {
              onExpand?.({ panelId, size });
            }
            if (onCollapse && (lastNotifiedSize == null || !fuzzyNumbersEqual(lastNotifiedSize, collapsedSize)) && fuzzyNumbersEqual(size, collapsedSize)) {
              onCollapse?.({ panelId, size });
            }
          }
        }
      });
    }
    const [SplitterProvider, useSplitterContext] = createContext({
      name: "SplitterContext",
      hookName: "useSplitterContext",
      providerName: "<SplitterProvider />"
    });
    function Splitter_panel($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const $$d = /* @__PURE__ */ user_derived(() => createSplitProps()(props, ["id"])), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), splitterPanelProps = /* @__PURE__ */ user_derived(() => get$3($$array)[0]), localProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const splitter = useSplitterContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(splitter().getPanelProps(get$3(splitterPanelProps)), get$3(localProps)));
      Factory($$anchor, spread_props({ as: "div" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    const [SplitterResizeTriggerPropsProvider] = createContext({
      name: "SplitterResizeTriggerPropsContext",
      hookName: "useSplitterResizeTriggerPropsContext",
      providerName: "<SplitterResizeTriggerPropsProvider />"
    });
    function Splitter_resize_trigger($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const $$d = /* @__PURE__ */ user_derived(() => createSplitProps()(props, ["disabled", "id"])), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), triggerProps = /* @__PURE__ */ user_derived(() => get$3($$array)[0]), localProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const splitter = useSplitterContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(splitter().getResizeTriggerProps(get$3(triggerProps)), get$3(localProps)));
      SplitterResizeTriggerPropsProvider(() => get$3(triggerProps));
      Factory($$anchor, spread_props({ as: "button" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    function splitSplitterProps(props) {
      return createSplitProps()(props, [
        "defaultSize",
        "id",
        "ids",
        "keyboardResizeBy",
        "nonce",
        "onCollapse",
        "onExpand",
        "onResize",
        "onResizeEnd",
        "onResizeStart",
        "orientation",
        "panels",
        "size"
      ]);
    }
    const useSplitter = (props) => {
      const env = useEnvironmentContext();
      const locale = useLocaleContext();
      const machineProps = /* @__PURE__ */ user_derived(() => {
        const resolvedProps = runIfFn$1(props);
        ensureProps(resolvedProps, ["id"]);
        return {
          dir: locale().dir,
          getRootNode: env().getRootNode,
          ...resolvedProps
        };
      });
      const service = useMachine(machine$2, () => get$3(machineProps));
      const api = /* @__PURE__ */ user_derived(() => connect$2(service, normalizeProps));
      return () => get$3(api);
    };
    function Splitter_root($$anchor, $$props) {
      const id = props_id();
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), size = prop($$props, "size", 15), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref", "size"]);
      const $$d = /* @__PURE__ */ user_derived(() => splitSplitterProps(props)), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), useSplitterProps = /* @__PURE__ */ user_derived(() => get$3($$array)[0]), localProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const machineProps = /* @__PURE__ */ user_derived(() => ({
        ...get$3(useSplitterProps),
        id: get$3(useSplitterProps).id ?? id,
        size: size(),
        onResize: (details) => {
          get$3(useSplitterProps).onResize?.(details);
          size(details.size);
        }
      }));
      const splitter = useSplitter(() => get$3(machineProps));
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(splitter().getRootProps(), get$3(localProps)));
      SplitterProvider(splitter);
      Factory($$anchor, spread_props({ as: "div" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    const [TabsProvider, useTabsContext] = createContext({
      name: "TabsContext",
      hookName: "useTabsContext",
      providerName: "<TabsProvider />"
    });
    function Tabs_content($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const $$d = /* @__PURE__ */ user_derived(() => createSplitProps()(props, ["value"])), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), contentProps = /* @__PURE__ */ user_derived(() => get$3($$array)[0]), localProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const tabs = useTabsContext();
      const renderStrategyProps = useRenderStrategyPropsContext();
      const machineProps = /* @__PURE__ */ user_derived(() => ({
        ...renderStrategyProps,
        present: tabs().value === get$3(contentProps).value,
        immediate: true
      }));
      const presence = usePresence(() => get$3(machineProps));
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(tabs().getContentProps(get$3(contentProps)), get$3(localProps)));
      PresenceProvider(presence);
      function setNode(node) {
        presence().setNode(node);
      }
      var fragment = comment();
      var node_1 = first_child(fragment);
      {
        var consequent = ($$anchor2) => {
          Factory($$anchor2, spread_props({ as: "div" }, () => get$3(mergedProps), {
            [createAttachmentKey()]: setNode,
            get ref() {
              return ref2();
            },
            set ref($$value) {
              ref2($$value);
            }
          }));
        };
        var d = /* @__PURE__ */ user_derived(() => !presence().unmounted);
        if_block(node_1, ($$render) => {
          if (get$3(d)) $$render(consequent);
        });
      }
      append$1($$anchor, fragment);
      pop();
    }
    function Tabs_list($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const tabs = useTabsContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(tabs().getListProps(), props));
      Factory($$anchor, spread_props({ as: "div" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    var anatomy$3 = createAnatomy("tabs").parts("root", "list", "trigger", "content", "indicator");
    var parts$3 = anatomy$3.build();
    var getRootId$3 = (ctx) => ctx.ids?.root ?? `tabs:${ctx.id}`;
    var getListId = (ctx) => ctx.ids?.list ?? `tabs:${ctx.id}:list`;
    var getContentId$1 = (ctx, value) => ctx.ids?.content?.(value) ?? `tabs:${ctx.id}:content-${value}`;
    var getTriggerId$1 = (ctx, value) => ctx.ids?.trigger?.(value) ?? `tabs:${ctx.id}:trigger-${value}`;
    var getIndicatorId = (ctx) => ctx.ids?.indicator ?? `tabs:${ctx.id}:indicator`;
    var getListEl = (ctx) => ctx.getById(getListId(ctx));
    var getContentEl$1 = (ctx, value) => ctx.getById(getContentId$1(ctx, value));
    var getTriggerEl = (ctx, value) => value != null ? ctx.getById(getTriggerId$1(ctx, value)) : null;
    var getIndicatorEl = (ctx) => ctx.getById(getIndicatorId(ctx));
    var getElements = (ctx) => {
      const ownerId = CSS.escape(getListId(ctx));
      const selector = `[role=tab][data-ownedby='${ownerId}']:not([disabled])`;
      return queryAll(getListEl(ctx), selector);
    };
    var getFirstTriggerEl = (ctx) => first(getElements(ctx));
    var getLastTriggerEl = (ctx) => last(getElements(ctx));
    var getNextTriggerEl = (ctx, opts) => nextById(getElements(ctx), getTriggerId$1(ctx, opts.value), opts.loopFocus);
    var getPrevTriggerEl = (ctx, opts) => prevById(getElements(ctx), getTriggerId$1(ctx, opts.value), opts.loopFocus);
    var getOffsetRect = (el) => ({
      x: el?.offsetLeft ?? 0,
      y: el?.offsetTop ?? 0,
      width: el?.offsetWidth ?? 0,
      height: el?.offsetHeight ?? 0
    });
    var getRectByValue = (ctx, value) => {
      const tab = itemById(getElements(ctx), getTriggerId$1(ctx, value));
      return getOffsetRect(tab);
    };
    function connect$3(service, normalize) {
      const { state: state2, send, context, prop: prop2, scope } = service;
      const translations = prop2("translations");
      const focused = state2.matches("focused");
      const isVertical = prop2("orientation") === "vertical";
      const isHorizontal = prop2("orientation") === "horizontal";
      const composite = prop2("composite");
      function getTriggerState(props) {
        return {
          selected: context.get("value") === props.value,
          focused: context.get("focusedValue") === props.value,
          disabled: !!props.disabled
        };
      }
      return {
        value: context.get("value"),
        focusedValue: context.get("focusedValue"),
        setValue(value) {
          send({ type: "SET_VALUE", value });
        },
        clearValue() {
          send({ type: "CLEAR_VALUE" });
        },
        setIndicatorRect(value) {
          const id = getTriggerId$1(scope, value);
          send({ type: "SET_INDICATOR_RECT", id });
        },
        syncTabIndex() {
          send({ type: "SYNC_TAB_INDEX" });
        },
        selectNext(fromValue) {
          send({ type: "TAB_FOCUS", value: fromValue, src: "selectNext" });
          send({ type: "ARROW_NEXT", src: "selectNext" });
        },
        selectPrev(fromValue) {
          send({ type: "TAB_FOCUS", value: fromValue, src: "selectPrev" });
          send({ type: "ARROW_PREV", src: "selectPrev" });
        },
        focus() {
          const value = context.get("value");
          if (!value) return;
          getTriggerEl(scope, value)?.focus();
        },
        getRootProps() {
          return normalize.element({
            ...parts$3.root.attrs,
            id: getRootId$3(scope),
            "data-orientation": prop2("orientation"),
            "data-focus": dataAttr(focused),
            dir: prop2("dir")
          });
        },
        getListProps() {
          return normalize.element({
            ...parts$3.list.attrs,
            id: getListId(scope),
            role: "tablist",
            dir: prop2("dir"),
            "data-focus": dataAttr(focused),
            "aria-orientation": prop2("orientation"),
            "data-orientation": prop2("orientation"),
            "aria-label": translations?.listLabel,
            onKeyDown(event2) {
              if (event2.defaultPrevented) return;
              if (isComposingEvent(event2)) return;
              if (!contains(event2.currentTarget, getEventTarget(event2))) return;
              const keyMap2 = {
                ArrowDown() {
                  if (isHorizontal) return;
                  send({ type: "ARROW_NEXT", key: "ArrowDown" });
                },
                ArrowUp() {
                  if (isHorizontal) return;
                  send({ type: "ARROW_PREV", key: "ArrowUp" });
                },
                ArrowLeft() {
                  if (isVertical) return;
                  send({ type: "ARROW_PREV", key: "ArrowLeft" });
                },
                ArrowRight() {
                  if (isVertical) return;
                  send({ type: "ARROW_NEXT", key: "ArrowRight" });
                },
                Home() {
                  send({ type: "HOME" });
                },
                End() {
                  send({ type: "END" });
                }
              };
              let key2 = getEventKey(event2, {
                dir: prop2("dir"),
                orientation: prop2("orientation")
              });
              const exec = keyMap2[key2];
              if (exec) {
                event2.preventDefault();
                exec(event2);
                return;
              }
            }
          });
        },
        getTriggerState,
        getTriggerProps(props) {
          const { value, disabled } = props;
          const triggerState = getTriggerState(props);
          return normalize.button({
            ...parts$3.trigger.attrs,
            role: "tab",
            type: "button",
            disabled,
            dir: prop2("dir"),
            "data-orientation": prop2("orientation"),
            "data-disabled": dataAttr(disabled),
            "aria-disabled": disabled,
            "data-value": value,
            "aria-selected": triggerState.selected,
            "data-selected": dataAttr(triggerState.selected),
            "data-focus": dataAttr(triggerState.focused),
            "aria-controls": triggerState.selected ? getContentId$1(scope, value) : void 0,
            "data-ownedby": getListId(scope),
            "data-ssr": dataAttr(context.get("ssr")),
            id: getTriggerId$1(scope, value),
            tabIndex: triggerState.selected && composite ? 0 : -1,
            onFocus() {
              send({ type: "TAB_FOCUS", value });
            },
            onBlur(event2) {
              const target = event2.relatedTarget;
              if (target?.getAttribute("role") !== "tab") {
                send({ type: "TAB_BLUR" });
              }
            },
            onClick(event2) {
              if (event2.defaultPrevented) return;
              if (isOpeningInNewTab(event2)) return;
              if (disabled) return;
              if (isSafari()) {
                event2.currentTarget.focus();
              }
              send({ type: "TAB_CLICK", value });
            }
          });
        },
        getContentProps(props) {
          const { value } = props;
          const selected = context.get("value") === value;
          return normalize.element({
            ...parts$3.content.attrs,
            dir: prop2("dir"),
            id: getContentId$1(scope, value),
            tabIndex: composite ? 0 : -1,
            "aria-labelledby": getTriggerId$1(scope, value),
            role: "tabpanel",
            "data-ownedby": getListId(scope),
            "data-selected": dataAttr(selected),
            "data-orientation": prop2("orientation"),
            hidden: !selected
          });
        },
        getIndicatorProps() {
          const rect = context.get("indicatorRect");
          const rectIsEmpty = rect == null || rect.width === 0 && rect.height === 0 && rect.x === 0 && rect.y === 0;
          return normalize.element({
            id: getIndicatorId(scope),
            ...parts$3.indicator.attrs,
            dir: prop2("dir"),
            "data-orientation": prop2("orientation"),
            hidden: rectIsEmpty,
            style: {
              "--transition-property": "left, right, top, bottom, width, height",
              "--left": toPx(rect?.x),
              "--top": toPx(rect?.y),
              "--width": toPx(rect?.width),
              "--height": toPx(rect?.height),
              position: "absolute",
              willChange: "var(--transition-property)",
              transitionProperty: "var(--transition-property)",
              transitionDuration: "var(--transition-duration, 150ms)",
              transitionTimingFunction: "var(--transition-timing-function)",
              [isHorizontal ? "left" : "top"]: isHorizontal ? "var(--left)" : "var(--top)"
            }
          });
        }
      };
    }
    var { createMachine } = setup();
    var machine$3 = createMachine({
      props({ props }) {
        return {
          dir: "ltr",
          orientation: "horizontal",
          activationMode: "automatic",
          loopFocus: true,
          composite: true,
          navigate(details) {
            clickIfLink(details.node);
          },
          defaultValue: null,
          ...props
        };
      },
      initialState() {
        return "idle";
      },
      context({ prop: prop2, bindable: bindable2 }) {
        return {
          value: bindable2(() => ({
            defaultValue: prop2("defaultValue"),
            value: prop2("value"),
            onChange(value) {
              prop2("onValueChange")?.({ value });
            }
          })),
          focusedValue: bindable2(() => ({
            defaultValue: prop2("value") || prop2("defaultValue"),
            sync: true,
            onChange(value) {
              prop2("onFocusChange")?.({ focusedValue: value });
            }
          })),
          ssr: bindable2(() => ({ defaultValue: true })),
          indicatorRect: bindable2(() => ({
            defaultValue: null
          }))
        };
      },
      watch({ context, prop: prop2, track: track2, action: action2 }) {
        track2([() => context.get("value")], () => {
          action2(["syncIndicatorRect", "syncTabIndex", "navigateIfNeeded"]);
        });
        track2([() => prop2("dir"), () => prop2("orientation")], () => {
          action2(["syncIndicatorRect"]);
        });
      },
      on: {
        SET_VALUE: {
          actions: ["setValue"]
        },
        CLEAR_VALUE: {
          actions: ["clearValue"]
        },
        SET_INDICATOR_RECT: {
          actions: ["setIndicatorRect"]
        },
        SYNC_TAB_INDEX: {
          actions: ["syncTabIndex"]
        }
      },
      entry: ["syncIndicatorRect", "syncTabIndex", "syncSsr"],
      exit: ["cleanupObserver"],
      states: {
        idle: {
          on: {
            TAB_FOCUS: {
              target: "focused",
              actions: ["setFocusedValue"]
            },
            TAB_CLICK: {
              target: "focused",
              actions: ["setFocusedValue", "setValue"]
            }
          }
        },
        focused: {
          on: {
            TAB_CLICK: {
              actions: ["setFocusedValue", "setValue"]
            },
            ARROW_PREV: [
              {
                guard: "selectOnFocus",
                actions: ["focusPrevTab", "selectFocusedTab"]
              },
              {
                actions: ["focusPrevTab"]
              }
            ],
            ARROW_NEXT: [
              {
                guard: "selectOnFocus",
                actions: ["focusNextTab", "selectFocusedTab"]
              },
              {
                actions: ["focusNextTab"]
              }
            ],
            HOME: [
              {
                guard: "selectOnFocus",
                actions: ["focusFirstTab", "selectFocusedTab"]
              },
              {
                actions: ["focusFirstTab"]
              }
            ],
            END: [
              {
                guard: "selectOnFocus",
                actions: ["focusLastTab", "selectFocusedTab"]
              },
              {
                actions: ["focusLastTab"]
              }
            ],
            TAB_FOCUS: {
              actions: ["setFocusedValue"]
            },
            TAB_BLUR: {
              target: "idle",
              actions: ["clearFocusedValue"]
            }
          }
        }
      },
      implementations: {
        guards: {
          selectOnFocus: ({ prop: prop2 }) => prop2("activationMode") === "automatic"
        },
        actions: {
          selectFocusedTab({ context, prop: prop2 }) {
            raf(() => {
              const focusedValue = context.get("focusedValue");
              if (!focusedValue) return;
              const nullable = prop2("deselectable") && context.get("value") === focusedValue;
              const value = nullable ? null : focusedValue;
              context.set("value", value);
            });
          },
          setFocusedValue({ context, event: event2, flush: flush2 }) {
            if (event2.value == null) return;
            flush2(() => {
              context.set("focusedValue", event2.value);
            });
          },
          clearFocusedValue({ context }) {
            context.set("focusedValue", null);
          },
          setValue({ context, event: event2, prop: prop2 }) {
            const nullable = prop2("deselectable") && context.get("value") === context.get("focusedValue");
            context.set("value", nullable ? null : event2.value);
          },
          clearValue({ context }) {
            context.set("value", null);
          },
          focusFirstTab({ scope }) {
            raf(() => {
              getFirstTriggerEl(scope)?.focus();
            });
          },
          focusLastTab({ scope }) {
            raf(() => {
              getLastTriggerEl(scope)?.focus();
            });
          },
          focusNextTab({ context, prop: prop2, scope, event: event2 }) {
            const focusedValue = event2.value ?? context.get("focusedValue");
            if (!focusedValue) return;
            const triggerEl = getNextTriggerEl(scope, {
              value: focusedValue,
              loopFocus: prop2("loopFocus")
            });
            raf(() => {
              if (prop2("composite")) {
                triggerEl?.focus();
              } else if (triggerEl?.dataset.value != null) {
                context.set("focusedValue", triggerEl.dataset.value);
              }
            });
          },
          focusPrevTab({ context, prop: prop2, scope, event: event2 }) {
            const focusedValue = event2.value ?? context.get("focusedValue");
            if (!focusedValue) return;
            const triggerEl = getPrevTriggerEl(scope, {
              value: focusedValue,
              loopFocus: prop2("loopFocus")
            });
            raf(() => {
              if (prop2("composite")) {
                triggerEl?.focus();
              } else if (triggerEl?.dataset.value != null) {
                context.set("focusedValue", triggerEl.dataset.value);
              }
            });
          },
          syncTabIndex({ context, scope }) {
            raf(() => {
              const value = context.get("value");
              if (!value) return;
              const contentEl = getContentEl$1(scope, value);
              if (!contentEl) return;
              const focusables = getFocusables(contentEl);
              if (focusables.length > 0) {
                contentEl.removeAttribute("tabindex");
              } else {
                contentEl.setAttribute("tabindex", "0");
              }
            });
          },
          cleanupObserver({ refs }) {
            const cleanup = refs.get("indicatorCleanup");
            if (cleanup) cleanup();
          },
          setIndicatorRect({ context, event: event2, scope }) {
            const value = event2.id ?? context.get("value");
            const indicatorEl = getIndicatorEl(scope);
            if (!indicatorEl) return;
            if (!value) return;
            const triggerEl = getTriggerEl(scope, value);
            if (!triggerEl) return;
            context.set("indicatorRect", getRectByValue(scope, value));
          },
          syncSsr({ context }) {
            context.set("ssr", false);
          },
          syncIndicatorRect({ context, refs, scope }) {
            const cleanup = refs.get("indicatorCleanup");
            if (cleanup) cleanup();
            const indicatorEl = getIndicatorEl(scope);
            if (!indicatorEl) return;
            const exec = () => {
              const triggerEl = getTriggerEl(scope, context.get("value"));
              if (!triggerEl) return;
              const rect = getOffsetRect(triggerEl);
              context.set("indicatorRect", (prev2) => isEqual(prev2, rect) ? prev2 : rect);
            };
            exec();
            const triggerEls = getElements(scope);
            const indicatorCleanup = callAll(...triggerEls.map((el) => resizeObserverBorderBox.observe(el, exec)));
            refs.set("indicatorCleanup", indicatorCleanup);
          },
          navigateIfNeeded({ context, prop: prop2, scope }) {
            const value = context.get("value");
            if (!value) return;
            const triggerEl = getTriggerEl(scope, value);
            if (isAnchorElement(triggerEl)) {
              prop2("navigate")?.({ value, node: triggerEl, href: triggerEl.href });
            }
          }
        }
      }
    });
    const useTabs = (props) => {
      const env = useEnvironmentContext();
      const locale = useLocaleContext();
      const machineProps = /* @__PURE__ */ user_derived(() => {
        const localProps = runIfFn$1(props);
        return {
          ...localProps,
          dir: locale().dir,
          getRootNode: env().getRootNode
        };
      });
      const service = useMachine(machine$3, () => get$3(machineProps));
      const api = /* @__PURE__ */ user_derived(() => connect$3(service, normalizeProps));
      return () => get$3(api);
    };
    function Tabs_root($$anchor, $$props) {
      const id = props_id();
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), value = prop($$props, "value", 15), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref", "value"]);
      const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props);
      const $$d = /* @__PURE__ */ user_derived(() => {
        const props2 = { ...tabsProps, value: value() };
        return createSplitProps()(props2, [
          "value",
          "onValueChange",
          "onFocusChange",
          "orientation",
          "activationMode",
          "id",
          "ids",
          "loopFocus",
          "translations",
          "defaultValue",
          "composite",
          "deselectable",
          "navigate"
        ]);
      }), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), useTabsProps = /* @__PURE__ */ user_derived(() => get$3($$array)[0]), localProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const machineProps = /* @__PURE__ */ user_derived(() => ({
        ...get$3(useTabsProps),
        id: get$3(useTabsProps).id ?? id,
        value: value(),
        onValueChange(details) {
          get$3(useTabsProps).onValueChange?.(details);
          if (value() !== void 0) value(details.value);
        }
      }));
      const tabs = useTabs(() => get$3(machineProps));
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(tabs().getRootProps(), get$3(localProps)));
      TabsProvider(tabs);
      RenderStrategyPropsProvider(() => renderStrategyProps);
      Factory($$anchor, spread_props({ as: "div" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    function Tabs_trigger($$anchor, $$props) {
      push($$props, true);
      let ref2 = prop($$props, "ref", 15, null), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "ref"]);
      const $$d = /* @__PURE__ */ user_derived(() => createSplitProps()(props, ["value", "disabled"])), $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$d), 2)), triggerProps = /* @__PURE__ */ user_derived(() => get$3($$array)[0]), localProps = /* @__PURE__ */ user_derived(() => get$3($$array)[1]);
      const tabs = useTabsContext();
      const mergedProps = /* @__PURE__ */ user_derived(() => mergeProps(tabs().getTriggerProps(get$3(triggerProps)), get$3(localProps)));
      Factory($$anchor, spread_props({ as: "button" }, () => get$3(mergedProps), {
        get ref() {
          return ref2();
        },
        set ref($$value) {
          ref2($$value);
        }
      }));
      pop();
    }
    const defaultWindow = typeof window !== "undefined" ? window : void 0;
    function getActiveElement(document2) {
      let activeElement = document2.activeElement;
      while (activeElement?.shadowRoot) {
        const node = activeElement.shadowRoot.activeElement;
        if (node === activeElement)
          break;
        else
          activeElement = node;
      }
      return activeElement;
    }
    class ActiveElement {
      #document;
      #subscribe;
      constructor(options = {}) {
        const { window: window2 = defaultWindow, document: document2 = window2?.document } = options;
        if (window2 === void 0) return;
        this.#document = document2;
        this.#subscribe = createSubscriber((update2) => {
          const cleanupFocusIn = on(window2, "focusin", update2);
          const cleanupFocusOut = on(window2, "focusout", update2);
          return () => {
            cleanupFocusIn();
            cleanupFocusOut();
          };
        });
      }
      get current() {
        this.#subscribe?.();
        if (!this.#document) return null;
        return getActiveElement(this.#document);
      }
    }
    new ActiveElement();
    function getStorage(storageType, window2) {
      switch (storageType) {
        case "local":
          return window2.localStorage;
        case "session":
          return window2.sessionStorage;
      }
    }
    function proxy(value, root2, proxies, subscribe2, update2, serialize2) {
      if (value === null || typeof value !== "object") {
        return value;
      }
      const proto = Object.getPrototypeOf(value);
      if (proto !== null && proto !== Object.prototype && !Array.isArray(value)) {
        return value;
      }
      let p = proxies.get(value);
      if (!p) {
        p = new Proxy(value, {
          get: (target, property) => {
            subscribe2?.();
            return proxy(Reflect.get(target, property), root2, proxies, subscribe2, update2, serialize2);
          },
          set: (target, property, value2) => {
            update2?.();
            Reflect.set(target, property, value2);
            serialize2(root2);
            return true;
          }
        });
        proxies.set(value, p);
      }
      return p;
    }
    class PersistedState {
      #current;
      #key;
      #serializer;
      #storage;
      #subscribe;
      #update;
      #proxies = /* @__PURE__ */ new WeakMap();
      #connected;
      #storageCleanup;
      #window;
      #syncTabs;
      #storageType;
      constructor(key2, initialValue, options = {}) {
        const {
          storage: storageType = "local",
          serializer = { serialize: JSON.stringify, deserialize: JSON.parse },
          syncTabs = true,
          connected = true
        } = options;
        const window2 = "window" in options ? options.window : defaultWindow;
        this.#current = initialValue;
        this.#key = key2;
        this.#serializer = serializer;
        this.#connected = connected;
        this.#window = window2;
        this.#syncTabs = syncTabs;
        this.#storageType = storageType;
        if (window2 === void 0) return;
        const storage = getStorage(storageType, window2);
        this.#storage = storage;
        const existingValue = storage.getItem(key2);
        if (existingValue !== null) {
          this.#current = this.#deserialize(existingValue);
        } else if (connected) {
          this.#serialize(initialValue);
        }
        this.#setupStorageListener();
      }
      get current() {
        this.#subscribe?.();
        let root2;
        if (this.#connected) {
          const storageItem = this.#storage?.getItem(this.#key);
          root2 = storageItem ? this.#deserialize(storageItem) : this.#current;
        } else {
          root2 = this.#current;
        }
        return proxy(root2, root2, this.#proxies, this.#subscribe?.bind(this), this.#update?.bind(this), this.#serialize.bind(this));
      }
      set current(newValue) {
        this.#serialize(newValue);
        this.#update?.();
      }
      #handleStorageEvent = (event2) => {
        if (event2.key !== this.#key || event2.newValue === null) return;
        this.#current = this.#deserialize(event2.newValue);
        this.#update?.();
      };
      #deserialize(value) {
        try {
          return this.#serializer.deserialize(value);
        } catch (error) {
          console.error(`Error when parsing "${value}" from persisted store "${this.#key}"`, error);
          return;
        }
      }
      #serialize(value) {
        if (!this.#connected) {
          this.#current = value;
          return;
        }
        try {
          if (value !== void 0) {
            this.#storage?.setItem(this.#key, this.#serializer.serialize(value));
          }
        } catch (error) {
          console.error(`Error when writing value from persisted store "${this.#key}" to ${this.#storage}`, error);
        }
      }
      #setupStorageListener() {
        if (!this.#window || !this.#connected) return;
        this.#subscribe = createSubscriber((update2) => {
          this.#update = update2;
          this.#storageCleanup = this.#connected && this.#syncTabs && this.#storageType === "local" ? on(this.#window, "storage", this.#handleStorageEvent) : void 0;
          return () => {
            this.#storageCleanup?.();
            this.#storageCleanup = void 0;
            this.#update = void 0;
          };
        });
      }
      #teardownStorageListener() {
        this.#storageCleanup?.();
        this.#storageCleanup = void 0;
        this.#subscribe = void 0;
      }
      /**
       * Returns whether the state is currently connected to storage.
       *
       * When `connected` is `false`, the state is not connected to storage and any
       * changes to the state will not be persisted to storage and any changes to storage
       * will not be reflected in the state.
       */
      get connected() {
        return this.#connected;
      }
      /**
       * Disconnects the state from storage, preventing updates to storage and stopping
       * cross-tab synchronization. The current value in storage is removed.
       *
       * Call `.connect()` to re-enable storage persistence.
       */
      disconnect() {
        if (!this.#connected) return;
        const storageItem = this.#storage?.getItem(this.#key);
        if (storageItem) {
          this.#current = this.#deserialize(storageItem);
        }
        this.#connected = false;
        this.#storage?.removeItem(this.#key);
        this.#teardownStorageListener();
      }
      /**
       * Reconnects the state to storage, enabling storage persistence and cross-tab
       * synchronization. The current value is immediately persisted to storage.
       *
       * **NOTE**: By default, the state is already connected to storage and this method is
       * only useful to re-enable storage persistence after calling `disconnect()`
       * or starting with `connected: false` as an option.
       */
      connect() {
        if (this.#connected) return;
        this.#connected = true;
        this.#serialize(this.#current);
        this.#setupStorageListener();
      }
    }
    var root_1$8 = /* @__PURE__ */ from_html(`<div data-role="toolbar:start"><!></div>`);
    var root_2$3 = /* @__PURE__ */ from_html(`<div data-role="toolbar:end"><!></div>`);
    var root$d = /* @__PURE__ */ from_html(`<div><!> <!></div>`);
    function Toolbar($$anchor, $$props) {
      let attrs = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "start", "end"]);
      var div = root$d();
      attribute_effect(div, () => ({ "data-component": "toolbar", ...attrs }));
      var node = child(div);
      {
        var consequent = ($$anchor2) => {
          var div_1 = root_1$8();
          var node_1 = child(div_1);
          snippet(node_1, () => $$props.start);
          append$1($$anchor2, div_1);
        };
        if_block(node, ($$render) => {
          if ($$props.start) $$render(consequent);
        });
      }
      var node_2 = sibling(node, 2);
      {
        var consequent_1 = ($$anchor2) => {
          var div_2 = root_2$3();
          var node_3 = child(div_2);
          snippet(node_3, () => $$props.end);
          append$1($$anchor2, div_2);
        };
        if_block(node_2, ($$render) => {
          if ($$props.end) $$render(consequent_1);
        });
      }
      append$1($$anchor, div);
    }
    var root_1$7 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
    function Tabs_1($$anchor, $$props) {
      push($$props, true);
      let panels = prop($$props, "panels", 19, () => []);
      const createTabState = () => new PersistedState(`tabs:${$$props.id}`, { active: panels()[0]?.id });
      let tabs = createTabState();
      var fragment = comment();
      var node = first_child(fragment);
      component(node, () => Tabs_root, ($$anchor2, Tabs_Root) => {
        Tabs_Root($$anchor2, {
          "data-component": "tabs",
          get value() {
            return tabs.current.active;
          },
          set value($$value) {
            tabs.current.active = $$value;
          },
          children: ($$anchor3, $$slotProps) => {
            var fragment_1 = root_1$7();
            var node_1 = first_child(fragment_1);
            {
              const start2 = ($$anchor4) => {
                var fragment_2 = comment();
                var node_2 = first_child(fragment_2);
                component(node_2, () => Tabs_list, ($$anchor5, Tabs_List) => {
                  Tabs_List($$anchor5, {
                    "data-role": "tabs:list",
                    children: ($$anchor6, $$slotProps2) => {
                      var fragment_3 = comment();
                      var node_3 = first_child(fragment_3);
                      each(node_3, 17, panels, (p) => p.id, ($$anchor7, p) => {
                        var fragment_4 = comment();
                        var node_4 = first_child(fragment_4);
                        component(node_4, () => Tabs_trigger, ($$anchor8, Tabs_Trigger) => {
                          Tabs_Trigger($$anchor8, {
                            get value() {
                              return get$3(p).id;
                            },
                            "data-role": "tabs:trigger",
                            children: ($$anchor9, $$slotProps3) => {
                              var fragment_5 = comment();
                              var node_5 = first_child(fragment_5);
                              {
                                var consequent = ($$anchor10) => {
                                  var fragment_6 = comment();
                                  var node_6 = first_child(fragment_6);
                                  snippet(node_6, () => $$props.label, () => get$3(p));
                                  append$1($$anchor10, fragment_6);
                                };
                                var alternate = ($$anchor10) => {
                                  var text$1 = text();
                                  template_effect(() => set_text(text$1, get$3(p).label));
                                  append$1($$anchor10, text$1);
                                };
                                if_block(node_5, ($$render) => {
                                  if ($$props.label) $$render(consequent);
                                  else $$render(alternate, false);
                                });
                              }
                              append$1($$anchor9, fragment_5);
                            },
                            $$slots: { default: true }
                          });
                        });
                        append$1($$anchor7, fragment_4);
                      });
                      append$1($$anchor6, fragment_3);
                    },
                    $$slots: { default: true }
                  });
                });
                append$1($$anchor4, fragment_2);
              };
              Toolbar(node_1, { "data-role": "tabs:toolbar", start: start2, $$slots: { start: true } });
            }
            var node_7 = sibling(node_1, 2);
            each(node_7, 17, panels, (p) => p.id, ($$anchor4, p) => {
              var fragment_8 = comment();
              var node_8 = first_child(fragment_8);
              component(node_8, () => Tabs_content, ($$anchor5, Tabs_Content) => {
                Tabs_Content($$anchor5, {
                  get value() {
                    return get$3(p).id;
                  },
                  "data-role": "tabs:panel",
                  children: ($$anchor6, $$slotProps2) => {
                    var fragment_9 = comment();
                    var node_9 = first_child(fragment_9);
                    snippet(node_9, () => $$props.panel, () => get$3(p));
                    append$1($$anchor6, fragment_9);
                  },
                  $$slots: { default: true }
                });
              });
              append$1($$anchor4, fragment_8);
            });
            append$1($$anchor3, fragment_1);
          },
          $$slots: { default: true }
        });
      });
      append$1($$anchor, fragment);
      pop();
    }
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root$c = freeGlobal || freeSelf || Function("return this")();
    var Symbol$1 = root$c.Symbol;
    var objectProto$e = Object.prototype;
    var hasOwnProperty$c = objectProto$e.hasOwnProperty;
    var nativeObjectToString$1 = objectProto$e.toString;
    var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty$c.call(value, symToStringTag$1), tag = value[symToStringTag$1];
      try {
        value[symToStringTag$1] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }
    var objectProto$d = Object.prototype;
    var nativeObjectToString = objectProto$d.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
    function baseGetTag$1(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function isObjectLike$1(value) {
      return value != null && typeof value == "object";
    }
    var symbolTag$3 = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike$1(value) && baseGetTag$1(value) == symbolTag$3;
    }
    function arrayMap(array, iteratee) {
      var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index2 < length) {
        result[index2] = iteratee(array[index2], index2, array);
      }
      return result;
    }
    var isArray$2 = Array.isArray;
    var symbolProto$2 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray$2(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -Infinity ? "-0" : result;
    }
    function isObject$3(value) {
      var type2 = typeof value;
      return value != null && (type2 == "object" || type2 == "function");
    }
    var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
    function isFunction$3(value) {
      if (!isObject$3(value)) {
        return false;
      }
      var tag = baseGetTag$1(value);
      return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
    }
    var coreJsData = root$c["__core-js_shared__"];
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    var funcProto$1 = Function.prototype;
    var funcToString$1 = funcProto$1.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString$1.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype, objectProto$c = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty$b = objectProto$c.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty$b).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject$3(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction$3(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function getValue(object, key2) {
      return object == null ? void 0 : object[key2];
    }
    function getNative(object, key2) {
      var value = getValue(object, key2);
      return baseIsNative(value) ? value : void 0;
    }
    var WeakMap$1 = getNative(root$c, "WeakMap");
    var objectCreate = Object.create;
    var baseCreate = /* @__PURE__ */ (function() {
      function object() {
      }
      return function(proto) {
        if (!isObject$3(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = void 0;
        return result;
      };
    })();
    var defineProperty = (function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    })();
    function arrayEach(array, iteratee) {
      var index2 = -1, length = array == null ? 0 : array.length;
      while (++index2 < length) {
        if (iteratee(array[index2], index2, array) === false) {
          break;
        }
      }
      return array;
    }
    var MAX_SAFE_INTEGER$1 = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type2 = typeof value;
      length = length == null ? MAX_SAFE_INTEGER$1 : length;
      return !!length && (type2 == "number" || type2 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function baseAssignValue(object, key2, value) {
      if (key2 == "__proto__" && defineProperty) {
        defineProperty(object, key2, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key2] = value;
      }
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var objectProto$b = Object.prototype;
    var hasOwnProperty$a = objectProto$b.hasOwnProperty;
    function assignValue(object, key2, value) {
      var objValue = object[key2];
      if (!(hasOwnProperty$a.call(object, key2) && eq(objValue, value)) || value === void 0 && !(key2 in object)) {
        baseAssignValue(object, key2, value);
      }
    }
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isArrayLike$1(value) {
      return value != null && isLength(value.length) && !isFunction$3(value);
    }
    var objectProto$a = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$a;
      return value === proto;
    }
    function baseTimes(n, iteratee) {
      var index2 = -1, result = Array(n);
      while (++index2 < n) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    var argsTag$3 = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike$1(value) && baseGetTag$1(value) == argsTag$3;
    }
    var objectProto$9 = Object.prototype;
    var hasOwnProperty$9 = objectProto$9.hasOwnProperty;
    var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? baseIsArguments : function(value) {
      return isObjectLike$1(value) && hasOwnProperty$9.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
    };
    function stubFalse() {
      return false;
    }
    var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
    var Buffer$2 = moduleExports$2 ? root$c.Buffer : void 0;
    var nativeIsBuffer = Buffer$2 ? Buffer$2.isBuffer : void 0;
    var isBuffer$1 = nativeIsBuffer || stubFalse;
    var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
    var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
    typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
    function baseIsTypedArray(value) {
      return isObjectLike$1(value) && isLength(value.length) && !!typedArrayTags[baseGetTag$1(value)];
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
    var freeProcess = moduleExports$1 && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    var objectProto$8 = Object.prototype;
    var hasOwnProperty$8 = objectProto$8.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray$2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key2 in value) {
        if (hasOwnProperty$8.call(value, key2) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key2 == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key2 == "offset" || key2 == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key2 == "buffer" || key2 == "byteLength" || key2 == "byteOffset") || // Skip index properties.
        isIndex(key2, length)))) {
          result.push(key2);
        }
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var nativeKeys = overArg(Object.keys, Object);
    var objectProto$7 = Object.prototype;
    var hasOwnProperty$7 = objectProto$7.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key2 in Object(object)) {
        if (hasOwnProperty$7.call(object, key2) && key2 != "constructor") {
          result.push(key2);
        }
      }
      return result;
    }
    function keys(object) {
      return isArrayLike$1(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray$2(value)) {
        return false;
      }
      var type2 = typeof value;
      if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    var nativeCreate = getNative(Object, "create");
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    function hashDelete(key2) {
      var result = this.has(key2) && delete this.__data__[key2];
      this.size -= result ? 1 : 0;
      return result;
    }
    var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
    var objectProto$6 = Object.prototype;
    var hasOwnProperty$6 = objectProto$6.hasOwnProperty;
    function hashGet(key2) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key2];
        return result === HASH_UNDEFINED$2 ? void 0 : result;
      }
      return hasOwnProperty$6.call(data, key2) ? data[key2] : void 0;
    }
    var objectProto$5 = Object.prototype;
    var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
    function hashHas(key2) {
      var data = this.__data__;
      return nativeCreate ? data[key2] !== void 0 : hasOwnProperty$5.call(data, key2);
    }
    var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
    function hashSet(key2, value) {
      var data = this.__data__;
      this.size += this.has(key2) ? 0 : 1;
      data[key2] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
      return this;
    }
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function assocIndexOf(array, key2) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key2)) {
          return length;
        }
      }
      return -1;
    }
    var arrayProto = Array.prototype;
    var splice$1 = arrayProto.splice;
    function listCacheDelete(key2) {
      var data = this.__data__, index2 = assocIndexOf(data, key2);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice$1.call(data, index2, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key2) {
      var data = this.__data__, index2 = assocIndexOf(data, key2);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    function listCacheHas(key2) {
      return assocIndexOf(this.__data__, key2) > -1;
    }
    function listCacheSet(key2, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key2);
      if (index2 < 0) {
        ++this.size;
        data.push([key2, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    var Map$1 = getNative(root$c, "Map");
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map$1 || ListCache)(),
        "string": new Hash()
      };
    }
    function isKeyable(value) {
      var type2 = typeof value;
      return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
    }
    function getMapData(map2, key2) {
      var data = map2.__data__;
      return isKeyable(key2) ? data[typeof key2 == "string" ? "string" : "hash"] : data.map;
    }
    function mapCacheDelete(key2) {
      var result = getMapData(this, key2)["delete"](key2);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key2) {
      return getMapData(this, key2).get(key2);
    }
    function mapCacheHas(key2) {
      return getMapData(this, key2).has(key2);
    }
    function mapCacheSet(key2, value) {
      var data = getMapData(this, key2), size = data.size;
      data.set(key2, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key2 = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key2)) {
          return cache.get(key2);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key2, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key2) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key2;
      });
      var cache = result.cache;
      return result;
    }
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match2, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
      });
      return result;
    });
    function toString$1(value) {
      return value == null ? "" : baseToString(value);
    }
    function castPath(value, object) {
      if (isArray$2(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString$1(value));
    }
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -Infinity ? "-0" : result;
    }
    function baseGet(object, path) {
      path = castPath(path, object);
      var index2 = 0, length = path.length;
      while (object != null && index2 < length) {
        object = object[toKey(path[index2++])];
      }
      return index2 && index2 == length ? object : void 0;
    }
    function get$1(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    function arrayPush(array, values) {
      var index2 = -1, length = values.length, offset = array.length;
      while (++index2 < length) {
        array[offset + index2] = values[index2];
      }
      return array;
    }
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    function basePropertyOf(object) {
      return function(key2) {
        return object == null ? void 0 : object[key2];
      };
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key2) {
      var data = this.__data__, result = data["delete"](key2);
      this.size = data.size;
      return result;
    }
    function stackGet(key2) {
      return this.__data__.get(key2);
    }
    function stackHas(key2) {
      return this.__data__.has(key2);
    }
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key2, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key2, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key2, value);
      this.size = data.size;
      return this;
    }
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer$1 = moduleExports ? root$c.Buffer : void 0;
    Buffer$1 ? Buffer$1.allocUnsafe : void 0;
    function cloneBuffer(buffer, isDeep) {
      {
        return buffer.slice();
      }
    }
    function arrayFilter(array, predicate) {
      var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index2 < length) {
        var value = array[index2];
        if (predicate(value, index2, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function stubArray() {
      return [];
    }
    var objectProto$4 = Object.prototype;
    var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray$2(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    var DataView$1 = getNative(root$c, "DataView");
    var Promise$1 = getNative(root$c, "Promise");
    var Set$1 = getNative(root$c, "Set");
    var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
    var dataViewTag$3 = "[object DataView]";
    var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
    var getTag = baseGetTag$1;
    if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$3 || Map$1 && getTag(new Map$1()) != mapTag$4 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$4 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
      getTag = function(value) {
        var result = baseGetTag$1(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag$3;
            case mapCtorString:
              return mapTag$4;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag$4;
            case weakMapCtorString:
              return weakMapTag$1;
          }
        }
        return result;
      };
    }
    var objectProto$3 = Object.prototype;
    var hasOwnProperty$4 = objectProto$3.hasOwnProperty;
    function initCloneArray(array) {
      var length = array.length, result = new array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty$4.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    var Uint8Array$1 = root$c.Uint8Array;
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer = cloneArrayBuffer(dataView.buffer);
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    var reFlags = /\w*$/;
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
    function cloneSymbol(symbol) {
      return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = cloneArrayBuffer(typedArray.buffer);
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
    var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag$2:
          return cloneArrayBuffer(object);
        case boolTag$2:
        case dateTag$2:
          return new Ctor(+object);
        case dataViewTag$2:
          return cloneDataView(object);
        case float32Tag$1:
        case float64Tag$1:
        case int8Tag$1:
        case int16Tag$1:
        case int32Tag$1:
        case uint8Tag$1:
        case uint8ClampedTag$1:
        case uint16Tag$1:
        case uint32Tag$1:
          return cloneTypedArray(object);
        case mapTag$3:
          return new Ctor();
        case numberTag$2:
        case stringTag$2:
          return new Ctor(object);
        case regexpTag$2:
          return cloneRegExp(object);
        case setTag$3:
          return new Ctor();
        case symbolTag$2:
          return cloneSymbol(object);
      }
    }
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    var mapTag$2 = "[object Map]";
    function baseIsMap(value) {
      return isObjectLike$1(value) && getTag(value) == mapTag$2;
    }
    var nodeIsMap = nodeUtil && nodeUtil.isMap;
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
    var setTag$2 = "[object Set]";
    function baseIsSet(value) {
      return isObjectLike$1(value) && getTag(value) == setTag$2;
    }
    var nodeIsSet = nodeUtil && nodeUtil.isSet;
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
    var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
    var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var cloneableTags = {};
    cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    function baseClone(value, bitmask, customizer, key2, object, stack) {
      var result;
      if (result !== void 0) {
        return result;
      }
      if (!isObject$3(value)) {
        return value;
      }
      var isArr = isArray$2(value);
      if (isArr) {
        result = initCloneArray(value);
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer$1(value)) {
          return cloneBuffer(value);
        }
        if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object) {
          result = isFunc ? {} : initCloneObject(value);
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key3) {
          result.set(key3, baseClone(subValue, bitmask, customizer, key3, value, stack));
        });
      }
      var keysFunc = getAllKeys;
      var props = isArr ? void 0 : keysFunc(value);
      arrayEach(props || value, function(subValue, key3) {
        if (props) {
          key3 = subValue;
          subValue = value[key3];
        }
        assignValue(result, key3, baseClone(subValue, bitmask, customizer, key3, value, stack));
      });
      return result;
    }
    var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    function SetCache(values) {
      var index2 = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index2 < length) {
        this.add(values[index2]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function arraySome(array, predicate) {
      var index2 = -1, length = array == null ? 0 : array.length;
      while (++index2 < length) {
        if (predicate(array[index2], index2, array)) {
          return true;
        }
      }
      return false;
    }
    function cacheHas(cache, key2) {
      return cache.has(key2);
    }
    var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index2 < arrLength) {
        var arrValue = array[index2], othValue = other[index2];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    function mapToArray(map2) {
      var index2 = -1, result = Array(map2.size);
      map2.forEach(function(value, key2) {
        result[++index2] = [key2, value];
      });
      return result;
    }
    function setToArray(set2) {
      var index2 = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index2] = value;
      });
      return result;
    }
    var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
    var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    var COMPARE_PARTIAL_FLAG$1 = 1;
    var objectProto$2 = Object.prototype;
    var hasOwnProperty$3 = objectProto$2.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index2 = objLength;
      while (index2--) {
        var key2 = objProps[index2];
        if (!(isPartial ? key2 in other : hasOwnProperty$3.call(other, key2))) {
          return false;
        }
      }
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index2 < objLength) {
        key2 = objProps[index2];
        var objValue = object[key2], othValue = other[key2];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key2, other, object, stack) : customizer(objValue, othValue, key2, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key2 == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
    var objectProto$1 = Object.prototype;
    var hasOwnProperty$2 = objectProto$1.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray$2(object), othIsArr = isArray$2(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer$1(object)) {
        if (!isBuffer$1(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$2.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike$1(value) && !isObjectLike$1(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      var index2 = -1, length = path.length, result = false;
      while (++index2 < length) {
        var key2 = toKey(path[index2]);
        if (!(result = object != null && hasFunc(object, key2))) {
          break;
        }
        object = object[key2];
      }
      if (result || ++index2 != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key2, length) && (isArray$2(object) || isArguments(object));
    }
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    var reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    function escape$1(string) {
      string = toString$1(string);
      return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
    }
    var objectProto = Object.prototype;
    var hasOwnProperty$1 = objectProto.hasOwnProperty;
    function baseHas(object, key2) {
      return object != null && hasOwnProperty$1.call(object, key2);
    }
    function has$1(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }
    function isEqual$2(value, other) {
      return baseIsEqual(value, other);
    }
    function baseSet(object, path, value, customizer) {
      if (!isObject$3(object)) {
        return object;
      }
      path = castPath(path, object);
      var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
      while (nested != null && ++index2 < length) {
        var key2 = toKey(path[index2]), newValue = value;
        if (key2 === "__proto__" || key2 === "constructor" || key2 === "prototype") {
          return object;
        }
        if (index2 != lastIndex) {
          var objValue = nested[key2];
          newValue = void 0;
          if (newValue === void 0) {
            newValue = isObject$3(objValue) ? objValue : isIndex(path[index2 + 1]) ? [] : {};
          }
        }
        assignValue(nested, key2, newValue);
        nested = nested[key2];
      }
      return object;
    }
    function set$1(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    function getAugmentedNamespace(n) {
      if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
      var f = n.default;
      if (typeof f == "function") {
        var a = function a2() {
          var isInstance = false;
          try {
            isInstance = this instanceof a2;
          } catch {
          }
          if (isInstance) {
            return Reflect.construct(f, arguments, this.constructor);
          }
          return f.apply(this, arguments);
        };
        a.prototype = f.prototype;
      } else a = {};
      Object.defineProperty(a, "__esModule", { value: true });
      Object.keys(n).forEach(function(k) {
        var d = Object.getOwnPropertyDescriptor(n, k);
        Object.defineProperty(a, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return n[k];
          }
        });
      });
      return a;
    }
    var type;
    var hasRequiredType;
    function requireType() {
      if (hasRequiredType) return type;
      hasRequiredType = 1;
      type = TypeError;
      return type;
    }
    const __viteBrowserExternal = {};
    const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: __viteBrowserExternal
    }, Symbol.toStringTag, { value: "Module" }));
    const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
    var objectInspect;
    var hasRequiredObjectInspect;
    function requireObjectInspect() {
      if (hasRequiredObjectInspect) return objectInspect;
      hasRequiredObjectInspect = 1;
      var hasMap = typeof Map === "function" && Map.prototype;
      var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
      var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
      var mapForEach = hasMap && Map.prototype.forEach;
      var hasSet = typeof Set === "function" && Set.prototype;
      var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
      var setSize2 = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
      var setForEach = hasSet && Set.prototype.forEach;
      var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
      var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
      var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
      var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
      var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
      var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
      var booleanValueOf = Boolean.prototype.valueOf;
      var objectToString2 = Object.prototype.toString;
      var functionToString = Function.prototype.toString;
      var $match = String.prototype.match;
      var $slice = String.prototype.slice;
      var $replace = String.prototype.replace;
      var $toUpperCase = String.prototype.toUpperCase;
      var $toLowerCase = String.prototype.toLowerCase;
      var $test = RegExp.prototype.test;
      var $concat = Array.prototype.concat;
      var $join = Array.prototype.join;
      var $arrSlice = Array.prototype.slice;
      var $floor = Math.floor;
      var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
      var gOPS = Object.getOwnPropertySymbols;
      var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
      var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
      var toStringTag2 = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
        return O.__proto__;
      } : null);
      function addNumericSeparator(num, str) {
        if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
          return str;
        }
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === "number") {
          var int = num < 0 ? -$floor(-num) : $floor(num);
          if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
          }
        }
        return $replace.call(str, sepRegex, "$&_");
      }
      var utilInspect = require$$0;
      var inspectCustom = utilInspect.custom;
      var inspectSymbol = isSymbol2(inspectCustom) ? inspectCustom : null;
      var quotes = {
        __proto__: null,
        "double": '"',
        single: "'"
      };
      var quoteREs = {
        __proto__: null,
        "double": /(["\\])/g,
        single: /(['\\])/g
      };
      objectInspect = function inspect_(obj, options, depth, seen) {
        var opts = options || {};
        if (has2(opts, "quoteStyle") && !has2(quotes, opts.quoteStyle)) {
          throw new TypeError('option "quoteStyle" must be "single" or "double"');
        }
        if (has2(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
          throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        }
        var customInspect = has2(opts, "customInspect") ? opts.customInspect : true;
        if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
          throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
        }
        if (has2(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
          throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        }
        if (has2(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
          throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        }
        var numericSeparator = opts.numericSeparator;
        if (typeof obj === "undefined") {
          return "undefined";
        }
        if (obj === null) {
          return "null";
        }
        if (typeof obj === "boolean") {
          return obj ? "true" : "false";
        }
        if (typeof obj === "string") {
          return inspectString(obj, opts);
        }
        if (typeof obj === "number") {
          if (obj === 0) {
            return Infinity / obj > 0 ? "0" : "-0";
          }
          var str = String(obj);
          return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === "bigint") {
          var bigIntStr = String(obj) + "n";
          return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }
        var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
        if (typeof depth === "undefined") {
          depth = 0;
        }
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
          return isArray2(obj) ? "[Array]" : "[Object]";
        }
        var indent = getIndent(opts, depth);
        if (typeof seen === "undefined") {
          seen = [];
        } else if (indexOf(seen, obj) >= 0) {
          return "[Circular]";
        }
        function inspect(value, from, noIndent) {
          if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
          }
          if (noIndent) {
            var newOpts = {
              depth: opts.depth
            };
            if (has2(opts, "quoteStyle")) {
              newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
          }
          return inspect_(value, opts, depth + 1, seen);
        }
        if (typeof obj === "function" && !isRegExp2(obj)) {
          var name = nameOf(obj);
          var keys2 = arrObjKeys(obj, inspect);
          return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys2.length > 0 ? " { " + $join.call(keys2, ", ") + " }" : "");
        }
        if (isSymbol2(obj)) {
          var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
          return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement(obj)) {
          var s = "<" + $toLowerCase.call(String(obj.nodeName));
          var attrs = obj.attributes || [];
          for (var i = 0; i < attrs.length; i++) {
            s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
          }
          s += ">";
          if (obj.childNodes && obj.childNodes.length) {
            s += "...";
          }
          s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
          return s;
        }
        if (isArray2(obj)) {
          if (obj.length === 0) {
            return "[]";
          }
          var xs = arrObjKeys(obj, inspect);
          if (indent && !singleLineValues(xs)) {
            return "[" + indentedJoin(xs, indent) + "]";
          }
          return "[ " + $join.call(xs, ", ") + " ]";
        }
        if (isError(obj)) {
          var parts2 = arrObjKeys(obj, inspect);
          if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
            return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts2), ", ") + " }";
          }
          if (parts2.length === 0) {
            return "[" + String(obj) + "]";
          }
          return "{ [" + String(obj) + "] " + $join.call(parts2, ", ") + " }";
        }
        if (typeof obj === "object" && customInspect) {
          if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
          } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
            return obj.inspect();
          }
        }
        if (isMap2(obj)) {
          var mapParts = [];
          if (mapForEach) {
            mapForEach.call(obj, function(value, key2) {
              mapParts.push(inspect(key2, obj, true) + " => " + inspect(value, obj));
            });
          }
          return collectionOf("Map", mapSize.call(obj), mapParts, indent);
        }
        if (isSet2(obj)) {
          var setParts = [];
          if (setForEach) {
            setForEach.call(obj, function(value) {
              setParts.push(inspect(value, obj));
            });
          }
          return collectionOf("Set", setSize2.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) {
          return weakCollectionOf("WeakMap");
        }
        if (isWeakSet(obj)) {
          return weakCollectionOf("WeakSet");
        }
        if (isWeakRef(obj)) {
          return weakCollectionOf("WeakRef");
        }
        if (isNumber2(obj)) {
          return markBoxed(inspect(Number(obj)));
        }
        if (isBigInt(obj)) {
          return markBoxed(inspect(bigIntValueOf.call(obj)));
        }
        if (isBoolean2(obj)) {
          return markBoxed(booleanValueOf.call(obj));
        }
        if (isString2(obj)) {
          return markBoxed(inspect(String(obj)));
        }
        if (typeof window !== "undefined" && obj === window) {
          return "{ [object Window] }";
        }
        if (typeof globalThis !== "undefined" && obj === globalThis || typeof commonjsGlobal !== "undefined" && obj === commonjsGlobal) {
          return "{ [object globalThis] }";
        }
        if (!isDate2(obj) && !isRegExp2(obj)) {
          var ys = arrObjKeys(obj, inspect);
          var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
          var protoTag = obj instanceof Object ? "" : "null prototype";
          var stringTag2 = !isPlainObject2 && toStringTag2 && Object(obj) === obj && toStringTag2 in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
          var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
          var tag = constructorTag + (stringTag2 || protoTag ? "[" + $join.call($concat.call([], stringTag2 || [], protoTag || []), ": ") + "] " : "");
          if (ys.length === 0) {
            return tag + "{}";
          }
          if (indent) {
            return tag + "{" + indentedJoin(ys, indent) + "}";
          }
          return tag + "{ " + $join.call(ys, ", ") + " }";
        }
        return String(obj);
      };
      function wrapQuotes(s, defaultStyle, opts) {
        var style = opts.quoteStyle || defaultStyle;
        var quoteChar = quotes[style];
        return quoteChar + s + quoteChar;
      }
      function quote(s) {
        return $replace.call(String(s), /"/g, "&quot;");
      }
      function canTrustToString(obj) {
        return !toStringTag2 || !(typeof obj === "object" && (toStringTag2 in obj || typeof obj[toStringTag2] !== "undefined"));
      }
      function isArray2(obj) {
        return toStr(obj) === "[object Array]" && canTrustToString(obj);
      }
      function isDate2(obj) {
        return toStr(obj) === "[object Date]" && canTrustToString(obj);
      }
      function isRegExp2(obj) {
        return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
      }
      function isError(obj) {
        return toStr(obj) === "[object Error]" && canTrustToString(obj);
      }
      function isString2(obj) {
        return toStr(obj) === "[object String]" && canTrustToString(obj);
      }
      function isNumber2(obj) {
        return toStr(obj) === "[object Number]" && canTrustToString(obj);
      }
      function isBoolean2(obj) {
        return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
      }
      function isSymbol2(obj) {
        if (hasShammedSymbols) {
          return obj && typeof obj === "object" && obj instanceof Symbol;
        }
        if (typeof obj === "symbol") {
          return true;
        }
        if (!obj || typeof obj !== "object" || !symToString) {
          return false;
        }
        try {
          symToString.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isBigInt(obj) {
        if (!obj || typeof obj !== "object" || !bigIntValueOf) {
          return false;
        }
        try {
          bigIntValueOf.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      var hasOwn = Object.prototype.hasOwnProperty || function(key2) {
        return key2 in this;
      };
      function has2(obj, key2) {
        return hasOwn.call(obj, key2);
      }
      function toStr(obj) {
        return objectToString2.call(obj);
      }
      function nameOf(f) {
        if (f.name) {
          return f.name;
        }
        var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
        if (m) {
          return m[1];
        }
        return null;
      }
      function indexOf(xs, x) {
        if (xs.indexOf) {
          return xs.indexOf(x);
        }
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x) {
            return i;
          }
        }
        return -1;
      }
      function isMap2(x) {
        if (!mapSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          mapSize.call(x);
          try {
            setSize2.call(x);
          } catch (s) {
            return true;
          }
          return x instanceof Map;
        } catch (e) {
        }
        return false;
      }
      function isWeakMap(x) {
        if (!weakMapHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakMapHas.call(x, weakMapHas);
          try {
            weakSetHas.call(x, weakSetHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakMap;
        } catch (e) {
        }
        return false;
      }
      function isWeakRef(x) {
        if (!weakRefDeref || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakRefDeref.call(x);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isSet2(x) {
        if (!setSize2 || !x || typeof x !== "object") {
          return false;
        }
        try {
          setSize2.call(x);
          try {
            mapSize.call(x);
          } catch (m) {
            return true;
          }
          return x instanceof Set;
        } catch (e) {
        }
        return false;
      }
      function isWeakSet(x) {
        if (!weakSetHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakSetHas.call(x, weakSetHas);
          try {
            weakMapHas.call(x, weakMapHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakSet;
        } catch (e) {
        }
        return false;
      }
      function isElement(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
          return true;
        }
        return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
      }
      function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
          var remaining = str.length - opts.maxStringLength;
          var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
          return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        var quoteRE = quoteREs[opts.quoteStyle || "single"];
        quoteRE.lastIndex = 0;
        var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s, "single", opts);
      }
      function lowbyte(c) {
        var n = c.charCodeAt(0);
        var x = {
          8: "b",
          9: "t",
          10: "n",
          12: "f",
          13: "r"
        }[n];
        if (x) {
          return "\\" + x;
        }
        return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
      }
      function markBoxed(str) {
        return "Object(" + str + ")";
      }
      function weakCollectionOf(type2) {
        return type2 + " { ? }";
      }
      function collectionOf(type2, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
        return type2 + " (" + size + ") {" + joinedEntries + "}";
      }
      function singleLineValues(xs) {
        for (var i = 0; i < xs.length; i++) {
          if (indexOf(xs[i], "\n") >= 0) {
            return false;
          }
        }
        return true;
      }
      function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === "	") {
          baseIndent = "	";
        } else if (typeof opts.indent === "number" && opts.indent > 0) {
          baseIndent = $join.call(Array(opts.indent + 1), " ");
        } else {
          return null;
        }
        return {
          base: baseIndent,
          prev: $join.call(Array(depth + 1), baseIndent)
        };
      }
      function indentedJoin(xs, indent) {
        if (xs.length === 0) {
          return "";
        }
        var lineJoiner = "\n" + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
      }
      function arrObjKeys(obj, inspect) {
        var isArr = isArray2(obj);
        var xs = [];
        if (isArr) {
          xs.length = obj.length;
          for (var i = 0; i < obj.length; i++) {
            xs[i] = has2(obj, i) ? inspect(obj[i], obj) : "";
          }
        }
        var syms = typeof gOPS === "function" ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
          symMap = {};
          for (var k = 0; k < syms.length; k++) {
            symMap["$" + syms[k]] = syms[k];
          }
        }
        for (var key2 in obj) {
          if (!has2(obj, key2)) {
            continue;
          }
          if (isArr && String(Number(key2)) === key2 && key2 < obj.length) {
            continue;
          }
          if (hasShammedSymbols && symMap["$" + key2] instanceof Symbol) {
            continue;
          } else if ($test.call(/[^\w$]/, key2)) {
            xs.push(inspect(key2, obj) + ": " + inspect(obj[key2], obj));
          } else {
            xs.push(key2 + ": " + inspect(obj[key2], obj));
          }
        }
        if (typeof gOPS === "function") {
          for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
              xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
            }
          }
        }
        return xs;
      }
      return objectInspect;
    }
    var sideChannelList;
    var hasRequiredSideChannelList;
    function requireSideChannelList() {
      if (hasRequiredSideChannelList) return sideChannelList;
      hasRequiredSideChannelList = 1;
      var inspect = /* @__PURE__ */ requireObjectInspect();
      var $TypeError = /* @__PURE__ */ requireType();
      var listGetNode = function(list, key2, isDelete) {
        var prev2 = list;
        var curr;
        for (; (curr = prev2.next) != null; prev2 = curr) {
          if (curr.key === key2) {
            prev2.next = curr.next;
            if (!isDelete) {
              curr.next = /** @type {NonNullable<typeof list.next>} */
              list.next;
              list.next = curr;
            }
            return curr;
          }
        }
      };
      var listGet = function(objects, key2) {
        if (!objects) {
          return void 0;
        }
        var node = listGetNode(objects, key2);
        return node && node.value;
      };
      var listSet = function(objects, key2, value) {
        var node = listGetNode(objects, key2);
        if (node) {
          node.value = value;
        } else {
          objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
          {
            // eslint-disable-line no-param-reassign, no-extra-parens
            key: key2,
            next: objects.next,
            value
          };
        }
      };
      var listHas = function(objects, key2) {
        if (!objects) {
          return false;
        }
        return !!listGetNode(objects, key2);
      };
      var listDelete = function(objects, key2) {
        if (objects) {
          return listGetNode(objects, key2, true);
        }
      };
      sideChannelList = function getSideChannelList() {
        var $o;
        var channel = {
          assert: function(key2) {
            if (!channel.has(key2)) {
              throw new $TypeError("Side channel does not contain " + inspect(key2));
            }
          },
          "delete": function(key2) {
            var root2 = $o && $o.next;
            var deletedNode = listDelete($o, key2);
            if (deletedNode && root2 && root2 === deletedNode) {
              $o = void 0;
            }
            return !!deletedNode;
          },
          get: function(key2) {
            return listGet($o, key2);
          },
          has: function(key2) {
            return listHas($o, key2);
          },
          set: function(key2, value) {
            if (!$o) {
              $o = {
                next: void 0
              };
            }
            listSet(
              /** @type {NonNullable<typeof $o>} */
              $o,
              key2,
              value
            );
          }
        };
        return channel;
      };
      return sideChannelList;
    }
    var esObjectAtoms;
    var hasRequiredEsObjectAtoms;
    function requireEsObjectAtoms() {
      if (hasRequiredEsObjectAtoms) return esObjectAtoms;
      hasRequiredEsObjectAtoms = 1;
      esObjectAtoms = Object;
      return esObjectAtoms;
    }
    var esErrors;
    var hasRequiredEsErrors;
    function requireEsErrors() {
      if (hasRequiredEsErrors) return esErrors;
      hasRequiredEsErrors = 1;
      esErrors = Error;
      return esErrors;
    }
    var _eval;
    var hasRequired_eval;
    function require_eval() {
      if (hasRequired_eval) return _eval;
      hasRequired_eval = 1;
      _eval = EvalError;
      return _eval;
    }
    var range;
    var hasRequiredRange;
    function requireRange() {
      if (hasRequiredRange) return range;
      hasRequiredRange = 1;
      range = RangeError;
      return range;
    }
    var ref;
    var hasRequiredRef;
    function requireRef() {
      if (hasRequiredRef) return ref;
      hasRequiredRef = 1;
      ref = ReferenceError;
      return ref;
    }
    var syntax;
    var hasRequiredSyntax;
    function requireSyntax() {
      if (hasRequiredSyntax) return syntax;
      hasRequiredSyntax = 1;
      syntax = SyntaxError;
      return syntax;
    }
    var uri;
    var hasRequiredUri;
    function requireUri() {
      if (hasRequiredUri) return uri;
      hasRequiredUri = 1;
      uri = URIError;
      return uri;
    }
    var abs;
    var hasRequiredAbs;
    function requireAbs() {
      if (hasRequiredAbs) return abs;
      hasRequiredAbs = 1;
      abs = Math.abs;
      return abs;
    }
    var floor;
    var hasRequiredFloor;
    function requireFloor() {
      if (hasRequiredFloor) return floor;
      hasRequiredFloor = 1;
      floor = Math.floor;
      return floor;
    }
    var max;
    var hasRequiredMax;
    function requireMax() {
      if (hasRequiredMax) return max;
      hasRequiredMax = 1;
      max = Math.max;
      return max;
    }
    var min;
    var hasRequiredMin;
    function requireMin() {
      if (hasRequiredMin) return min;
      hasRequiredMin = 1;
      min = Math.min;
      return min;
    }
    var pow;
    var hasRequiredPow;
    function requirePow() {
      if (hasRequiredPow) return pow;
      hasRequiredPow = 1;
      pow = Math.pow;
      return pow;
    }
    var round;
    var hasRequiredRound;
    function requireRound() {
      if (hasRequiredRound) return round;
      hasRequiredRound = 1;
      round = Math.round;
      return round;
    }
    var _isNaN;
    var hasRequired_isNaN;
    function require_isNaN() {
      if (hasRequired_isNaN) return _isNaN;
      hasRequired_isNaN = 1;
      _isNaN = Number.isNaN || function isNaN2(a) {
        return a !== a;
      };
      return _isNaN;
    }
    var sign;
    var hasRequiredSign;
    function requireSign() {
      if (hasRequiredSign) return sign;
      hasRequiredSign = 1;
      var $isNaN = /* @__PURE__ */ require_isNaN();
      sign = function sign2(number) {
        if ($isNaN(number) || number === 0) {
          return number;
        }
        return number < 0 ? -1 : 1;
      };
      return sign;
    }
    var gOPD;
    var hasRequiredGOPD;
    function requireGOPD() {
      if (hasRequiredGOPD) return gOPD;
      hasRequiredGOPD = 1;
      gOPD = Object.getOwnPropertyDescriptor;
      return gOPD;
    }
    var gopd;
    var hasRequiredGopd;
    function requireGopd() {
      if (hasRequiredGopd) return gopd;
      hasRequiredGopd = 1;
      var $gOPD = /* @__PURE__ */ requireGOPD();
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e) {
          $gOPD = null;
        }
      }
      gopd = $gOPD;
      return gopd;
    }
    var esDefineProperty;
    var hasRequiredEsDefineProperty;
    function requireEsDefineProperty() {
      if (hasRequiredEsDefineProperty) return esDefineProperty;
      hasRequiredEsDefineProperty = 1;
      var $defineProperty = Object.defineProperty || false;
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = false;
        }
      }
      esDefineProperty = $defineProperty;
      return esDefineProperty;
    }
    var shams;
    var hasRequiredShams;
    function requireShams() {
      if (hasRequiredShams) return shams;
      hasRequiredShams = 1;
      shams = function hasSymbols2() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = /* @__PURE__ */ Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (var _ in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = (
            /** @type {PropertyDescriptor} */
            Object.getOwnPropertyDescriptor(obj, sym)
          );
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
      return shams;
    }
    var hasSymbols;
    var hasRequiredHasSymbols;
    function requireHasSymbols() {
      if (hasRequiredHasSymbols) return hasSymbols;
      hasRequiredHasSymbols = 1;
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = requireShams();
      hasSymbols = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof /* @__PURE__ */ Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
      return hasSymbols;
    }
    var Reflect_getPrototypeOf;
    var hasRequiredReflect_getPrototypeOf;
    function requireReflect_getPrototypeOf() {
      if (hasRequiredReflect_getPrototypeOf) return Reflect_getPrototypeOf;
      hasRequiredReflect_getPrototypeOf = 1;
      Reflect_getPrototypeOf = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
      return Reflect_getPrototypeOf;
    }
    var Object_getPrototypeOf;
    var hasRequiredObject_getPrototypeOf;
    function requireObject_getPrototypeOf() {
      if (hasRequiredObject_getPrototypeOf) return Object_getPrototypeOf;
      hasRequiredObject_getPrototypeOf = 1;
      var $Object = /* @__PURE__ */ requireEsObjectAtoms();
      Object_getPrototypeOf = $Object.getPrototypeOf || null;
      return Object_getPrototypeOf;
    }
    var implementation;
    var hasRequiredImplementation;
    function requireImplementation() {
      if (hasRequiredImplementation) return implementation;
      hasRequiredImplementation = 1;
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max2 = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) {
          arr[i] = a[i];
        }
        for (var j = 0; j < b.length; j += 1) {
          arr[j + a.length] = b[j];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i = offset, j = 0; i < arrLike.length; i += 1, j += 1) {
          arr[j] = arrLike[i];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      implementation = function bind2(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max2(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = "$" + i;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
      return implementation;
    }
    var functionBind;
    var hasRequiredFunctionBind;
    function requireFunctionBind() {
      if (hasRequiredFunctionBind) return functionBind;
      hasRequiredFunctionBind = 1;
      var implementation2 = requireImplementation();
      functionBind = Function.prototype.bind || implementation2;
      return functionBind;
    }
    var functionCall;
    var hasRequiredFunctionCall;
    function requireFunctionCall() {
      if (hasRequiredFunctionCall) return functionCall;
      hasRequiredFunctionCall = 1;
      functionCall = Function.prototype.call;
      return functionCall;
    }
    var functionApply;
    var hasRequiredFunctionApply;
    function requireFunctionApply() {
      if (hasRequiredFunctionApply) return functionApply;
      hasRequiredFunctionApply = 1;
      functionApply = Function.prototype.apply;
      return functionApply;
    }
    var reflectApply;
    var hasRequiredReflectApply;
    function requireReflectApply() {
      if (hasRequiredReflectApply) return reflectApply;
      hasRequiredReflectApply = 1;
      reflectApply = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
      return reflectApply;
    }
    var actualApply;
    var hasRequiredActualApply;
    function requireActualApply() {
      if (hasRequiredActualApply) return actualApply;
      hasRequiredActualApply = 1;
      var bind2 = requireFunctionBind();
      var $apply = requireFunctionApply();
      var $call = requireFunctionCall();
      var $reflectApply = requireReflectApply();
      actualApply = $reflectApply || bind2.call($call, $apply);
      return actualApply;
    }
    var callBindApplyHelpers;
    var hasRequiredCallBindApplyHelpers;
    function requireCallBindApplyHelpers() {
      if (hasRequiredCallBindApplyHelpers) return callBindApplyHelpers;
      hasRequiredCallBindApplyHelpers = 1;
      var bind2 = requireFunctionBind();
      var $TypeError = /* @__PURE__ */ requireType();
      var $call = requireFunctionCall();
      var $actualApply = requireActualApply();
      callBindApplyHelpers = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== "function") {
          throw new $TypeError("a function is required");
        }
        return $actualApply(bind2, $call, args);
      };
      return callBindApplyHelpers;
    }
    var get;
    var hasRequiredGet;
    function requireGet() {
      if (hasRequiredGet) return get;
      hasRequiredGet = 1;
      var callBind = requireCallBindApplyHelpers();
      var gOPD2 = /* @__PURE__ */ requireGopd();
      var hasProtoAccessor;
      try {
        hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
        [].__proto__ === Array.prototype;
      } catch (e) {
        if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
          throw e;
        }
      }
      var desc = !!hasProtoAccessor && gOPD2 && gOPD2(
        Object.prototype,
        /** @type {keyof typeof Object.prototype} */
        "__proto__"
      );
      var $Object = Object;
      var $getPrototypeOf = $Object.getPrototypeOf;
      get = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
        /** @type {import('./get')} */
        function getDunder(value) {
          return $getPrototypeOf(value == null ? value : $Object(value));
        }
      ) : false;
      return get;
    }
    var getProto;
    var hasRequiredGetProto;
    function requireGetProto() {
      if (hasRequiredGetProto) return getProto;
      hasRequiredGetProto = 1;
      var reflectGetProto = requireReflect_getPrototypeOf();
      var originalGetProto = requireObject_getPrototypeOf();
      var getDunderProto = /* @__PURE__ */ requireGet();
      getProto = reflectGetProto ? function getProto2(O) {
        return reflectGetProto(O);
      } : originalGetProto ? function getProto2(O) {
        if (!O || typeof O !== "object" && typeof O !== "function") {
          throw new TypeError("getProto: not an object");
        }
        return originalGetProto(O);
      } : getDunderProto ? function getProto2(O) {
        return getDunderProto(O);
      } : null;
      return getProto;
    }
    var hasown;
    var hasRequiredHasown;
    function requireHasown() {
      if (hasRequiredHasown) return hasown;
      hasRequiredHasown = 1;
      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind2 = requireFunctionBind();
      hasown = bind2.call(call, $hasOwn);
      return hasown;
    }
    var getIntrinsic;
    var hasRequiredGetIntrinsic;
    function requireGetIntrinsic() {
      if (hasRequiredGetIntrinsic) return getIntrinsic;
      hasRequiredGetIntrinsic = 1;
      var undefined$1;
      var $Object = /* @__PURE__ */ requireEsObjectAtoms();
      var $Error = /* @__PURE__ */ requireEsErrors();
      var $EvalError = /* @__PURE__ */ require_eval();
      var $RangeError = /* @__PURE__ */ requireRange();
      var $ReferenceError = /* @__PURE__ */ requireRef();
      var $SyntaxError = /* @__PURE__ */ requireSyntax();
      var $TypeError = /* @__PURE__ */ requireType();
      var $URIError = /* @__PURE__ */ requireUri();
      var abs2 = /* @__PURE__ */ requireAbs();
      var floor2 = /* @__PURE__ */ requireFloor();
      var max2 = /* @__PURE__ */ requireMax();
      var min2 = /* @__PURE__ */ requireMin();
      var pow2 = /* @__PURE__ */ requirePow();
      var round2 = /* @__PURE__ */ requireRound();
      var sign2 = /* @__PURE__ */ requireSign();
      var $Function = Function;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = /* @__PURE__ */ requireGopd();
      var $defineProperty = /* @__PURE__ */ requireEsDefineProperty();
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? (function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      })() : throwTypeError;
      var hasSymbols2 = requireHasSymbols()();
      var getProto2 = requireGetProto();
      var $ObjectGPO = requireObject_getPrototypeOf();
      var $ReflectGPO = requireReflect_getPrototypeOf();
      var $apply = requireFunctionApply();
      var $call = requireFunctionCall();
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto2 ? undefined$1 : getProto2(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols2 && getProto2 ? getProto2([][Symbol.iterator]()) : undefined$1,
        "%AsyncFromSyncIteratorPrototype%": undefined$1,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": $Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": $EvalError,
        "%Float16Array%": typeof Float16Array === "undefined" ? undefined$1 : Float16Array,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols2 && getProto2 ? getProto2(getProto2([][Symbol.iterator]())) : undefined$1,
        "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
        "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 || !getProto2 ? undefined$1 : getProto2((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": $Object,
        "%Object.getOwnPropertyDescriptor%": $gOPD,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
        "%RangeError%": $RangeError,
        "%ReferenceError%": $ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 || !getProto2 ? undefined$1 : getProto2((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols2 && getProto2 ? getProto2(""[Symbol.iterator]()) : undefined$1,
        "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
        "%URIError%": $URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet,
        "%Function.prototype.call%": $call,
        "%Function.prototype.apply%": $apply,
        "%Object.defineProperty%": $defineProperty,
        "%Object.getPrototypeOf%": $ObjectGPO,
        "%Math.abs%": abs2,
        "%Math.floor%": floor2,
        "%Math.max%": max2,
        "%Math.min%": min2,
        "%Math.pow%": pow2,
        "%Math.round%": round2,
        "%Math.sign%": sign2,
        "%Reflect.getPrototypeOf%": $ReflectGPO
      };
      if (getProto2) {
        try {
          null.error;
        } catch (e) {
          var errorProto = getProto2(getProto2(e));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen && getProto2) {
            value = getProto2(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        __proto__: null,
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind2 = requireFunctionBind();
      var hasOwn = /* @__PURE__ */ requireHasown();
      var $concat = bind2.call($call, Array.prototype.concat);
      var $spliceApply = bind2.call($apply, Array.prototype.splice);
      var $replace = bind2.call($call, String.prototype.replace);
      var $strSlice = bind2.call($call, String.prototype.slice);
      var $exec = bind2.call($call, RegExp.prototype.exec);
      var rePropName2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar2 = /\\(\\)?/g;
      var stringToPath2 = function stringToPath3(string) {
        var first2 = $strSlice(string, 0, 1);
        var last2 = $strSlice(string, -1);
        if (first2 === "%" && last2 !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last2 === "%" && first2 !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName2, function(match2, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar2, "$1") : number || match2;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      getIntrinsic = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts2 = stringToPath2(name);
        var intrinsicBaseName = parts2.length > 0 ? parts2[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts2, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts2.length; i += 1) {
          var part = parts2[i];
          var first2 = $strSlice(part, 0, 1);
          var last2 = $strSlice(part, -1);
          if ((first2 === '"' || first2 === "'" || first2 === "`" || (last2 === '"' || last2 === "'" || last2 === "`")) && first2 !== last2) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void undefined$1;
            }
            if ($gOPD && i + 1 >= parts2.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
      return getIntrinsic;
    }
    var callBound;
    var hasRequiredCallBound;
    function requireCallBound() {
      if (hasRequiredCallBound) return callBound;
      hasRequiredCallBound = 1;
      var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
      var callBindBasic = requireCallBindApplyHelpers();
      var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
      callBound = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = (
          /** @type {(this: unknown, ...args: unknown[]) => unknown} */
          GetIntrinsic(name, !!allowMissing)
        );
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBindBasic(
            /** @type {const} */
            [intrinsic]
          );
        }
        return intrinsic;
      };
      return callBound;
    }
    var sideChannelMap;
    var hasRequiredSideChannelMap;
    function requireSideChannelMap() {
      if (hasRequiredSideChannelMap) return sideChannelMap;
      hasRequiredSideChannelMap = 1;
      var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
      var callBound2 = /* @__PURE__ */ requireCallBound();
      var inspect = /* @__PURE__ */ requireObjectInspect();
      var $TypeError = /* @__PURE__ */ requireType();
      var $Map = GetIntrinsic("%Map%", true);
      var $mapGet = callBound2("Map.prototype.get", true);
      var $mapSet = callBound2("Map.prototype.set", true);
      var $mapHas = callBound2("Map.prototype.has", true);
      var $mapDelete = callBound2("Map.prototype.delete", true);
      var $mapSize = callBound2("Map.prototype.size", true);
      sideChannelMap = !!$Map && /** @type {Exclude<import('.'), false>} */
      function getSideChannelMap() {
        var $m;
        var channel = {
          assert: function(key2) {
            if (!channel.has(key2)) {
              throw new $TypeError("Side channel does not contain " + inspect(key2));
            }
          },
          "delete": function(key2) {
            if ($m) {
              var result = $mapDelete($m, key2);
              if ($mapSize($m) === 0) {
                $m = void 0;
              }
              return result;
            }
            return false;
          },
          get: function(key2) {
            if ($m) {
              return $mapGet($m, key2);
            }
          },
          has: function(key2) {
            if ($m) {
              return $mapHas($m, key2);
            }
            return false;
          },
          set: function(key2, value) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key2, value);
          }
        };
        return channel;
      };
      return sideChannelMap;
    }
    var sideChannelWeakmap;
    var hasRequiredSideChannelWeakmap;
    function requireSideChannelWeakmap() {
      if (hasRequiredSideChannelWeakmap) return sideChannelWeakmap;
      hasRequiredSideChannelWeakmap = 1;
      var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
      var callBound2 = /* @__PURE__ */ requireCallBound();
      var inspect = /* @__PURE__ */ requireObjectInspect();
      var getSideChannelMap = requireSideChannelMap();
      var $TypeError = /* @__PURE__ */ requireType();
      var $WeakMap = GetIntrinsic("%WeakMap%", true);
      var $weakMapGet = callBound2("WeakMap.prototype.get", true);
      var $weakMapSet = callBound2("WeakMap.prototype.set", true);
      var $weakMapHas = callBound2("WeakMap.prototype.has", true);
      var $weakMapDelete = callBound2("WeakMap.prototype.delete", true);
      sideChannelWeakmap = $WeakMap ? (
        /** @type {Exclude<import('.'), false>} */
        function getSideChannelWeakMap() {
          var $wm;
          var $m;
          var channel = {
            assert: function(key2) {
              if (!channel.has(key2)) {
                throw new $TypeError("Side channel does not contain " + inspect(key2));
              }
            },
            "delete": function(key2) {
              if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
                if ($wm) {
                  return $weakMapDelete($wm, key2);
                }
              } else if (getSideChannelMap) {
                if ($m) {
                  return $m["delete"](key2);
                }
              }
              return false;
            },
            get: function(key2) {
              if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
                if ($wm) {
                  return $weakMapGet($wm, key2);
                }
              }
              return $m && $m.get(key2);
            },
            has: function(key2) {
              if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
                if ($wm) {
                  return $weakMapHas($wm, key2);
                }
              }
              return !!$m && $m.has(key2);
            },
            set: function(key2, value) {
              if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
                if (!$wm) {
                  $wm = new $WeakMap();
                }
                $weakMapSet($wm, key2, value);
              } else if (getSideChannelMap) {
                if (!$m) {
                  $m = getSideChannelMap();
                }
                $m.set(key2, value);
              }
            }
          };
          return channel;
        }
      ) : getSideChannelMap;
      return sideChannelWeakmap;
    }
    var sideChannel;
    var hasRequiredSideChannel;
    function requireSideChannel() {
      if (hasRequiredSideChannel) return sideChannel;
      hasRequiredSideChannel = 1;
      var $TypeError = /* @__PURE__ */ requireType();
      var inspect = /* @__PURE__ */ requireObjectInspect();
      var getSideChannelList = requireSideChannelList();
      var getSideChannelMap = requireSideChannelMap();
      var getSideChannelWeakMap = requireSideChannelWeakmap();
      var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
      sideChannel = function getSideChannel() {
        var $channelData;
        var channel = {
          assert: function(key2) {
            if (!channel.has(key2)) {
              throw new $TypeError("Side channel does not contain " + inspect(key2));
            }
          },
          "delete": function(key2) {
            return !!$channelData && $channelData["delete"](key2);
          },
          get: function(key2) {
            return $channelData && $channelData.get(key2);
          },
          has: function(key2) {
            return !!$channelData && $channelData.has(key2);
          },
          set: function(key2, value) {
            if (!$channelData) {
              $channelData = makeChannel();
            }
            $channelData.set(key2, value);
          }
        };
        return channel;
      };
      return sideChannel;
    }
    var formats;
    var hasRequiredFormats;
    function requireFormats() {
      if (hasRequiredFormats) return formats;
      hasRequiredFormats = 1;
      var replace2 = String.prototype.replace;
      var percentTwenties = /%20/g;
      var Format = {
        RFC1738: "RFC1738",
        RFC3986: "RFC3986"
      };
      formats = {
        "default": Format.RFC3986,
        formatters: {
          RFC1738: function(value) {
            return replace2.call(value, percentTwenties, "+");
          },
          RFC3986: function(value) {
            return String(value);
          }
        },
        RFC1738: Format.RFC1738,
        RFC3986: Format.RFC3986
      };
      return formats;
    }
    var utils$2;
    var hasRequiredUtils;
    function requireUtils() {
      if (hasRequiredUtils) return utils$2;
      hasRequiredUtils = 1;
      var formats2 = /* @__PURE__ */ requireFormats();
      var getSideChannel = requireSideChannel();
      var has2 = Object.prototype.hasOwnProperty;
      var isArray2 = Array.isArray;
      var overflowChannel = getSideChannel();
      var markOverflow = function markOverflow2(obj, maxIndex) {
        overflowChannel.set(obj, maxIndex);
        return obj;
      };
      var isOverflow = function isOverflow2(obj) {
        return overflowChannel.has(obj);
      };
      var getMaxIndex = function getMaxIndex2(obj) {
        return overflowChannel.get(obj);
      };
      var setMaxIndex = function setMaxIndex2(obj, maxIndex) {
        overflowChannel.set(obj, maxIndex);
      };
      var hexTable = (function() {
        var array = [];
        for (var i = 0; i < 256; ++i) {
          array[array.length] = "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase();
        }
        return array;
      })();
      var compactQueue = function compactQueue2(queue3) {
        while (queue3.length > 1) {
          var item = queue3.pop();
          var obj = item.obj[item.prop];
          if (isArray2(obj)) {
            var compacted = [];
            for (var j = 0; j < obj.length; ++j) {
              if (typeof obj[j] !== "undefined") {
                compacted[compacted.length] = obj[j];
              }
            }
            item.obj[item.prop] = compacted;
          }
        }
      };
      var arrayToObject2 = function arrayToObject3(source2, options) {
        var obj = options && options.plainObjects ? { __proto__: null } : {};
        for (var i = 0; i < source2.length; ++i) {
          if (typeof source2[i] !== "undefined") {
            obj[i] = source2[i];
          }
        }
        return obj;
      };
      var merge2 = function merge3(target, source2, options) {
        if (!source2) {
          return target;
        }
        if (typeof source2 !== "object" && typeof source2 !== "function") {
          if (isArray2(target)) {
            var nextIndex2 = target.length;
            if (options && typeof options.arrayLimit === "number" && nextIndex2 > options.arrayLimit) {
              return markOverflow(arrayToObject2(target.concat(source2), options), nextIndex2);
            }
            target[nextIndex2] = source2;
          } else if (target && typeof target === "object") {
            if (isOverflow(target)) {
              var newIndex = getMaxIndex(target) + 1;
              target[newIndex] = source2;
              setMaxIndex(target, newIndex);
            } else if (options && options.strictMerge) {
              return [target, source2];
            } else if (options && (options.plainObjects || options.allowPrototypes) || !has2.call(Object.prototype, source2)) {
              target[source2] = true;
            }
          } else {
            return [target, source2];
          }
          return target;
        }
        if (!target || typeof target !== "object") {
          if (isOverflow(source2)) {
            var sourceKeys = Object.keys(source2);
            var result = options && options.plainObjects ? { __proto__: null, 0: target } : { 0: target };
            for (var m = 0; m < sourceKeys.length; m++) {
              var oldKey = parseInt(sourceKeys[m], 10);
              result[oldKey + 1] = source2[sourceKeys[m]];
            }
            return markOverflow(result, getMaxIndex(source2) + 1);
          }
          var combined = [target].concat(source2);
          if (options && typeof options.arrayLimit === "number" && combined.length > options.arrayLimit) {
            return markOverflow(arrayToObject2(combined, options), combined.length - 1);
          }
          return combined;
        }
        var mergeTarget = target;
        if (isArray2(target) && !isArray2(source2)) {
          mergeTarget = arrayToObject2(target, options);
        }
        if (isArray2(target) && isArray2(source2)) {
          source2.forEach(function(item, i) {
            if (has2.call(target, i)) {
              var targetItem = target[i];
              if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
                target[i] = merge3(targetItem, item, options);
              } else {
                target[target.length] = item;
              }
            } else {
              target[i] = item;
            }
          });
          return target;
        }
        return Object.keys(source2).reduce(function(acc, key2) {
          var value = source2[key2];
          if (has2.call(acc, key2)) {
            acc[key2] = merge3(acc[key2], value, options);
          } else {
            acc[key2] = value;
          }
          if (isOverflow(source2) && !isOverflow(acc)) {
            markOverflow(acc, getMaxIndex(source2));
          }
          if (isOverflow(acc)) {
            var keyNum = parseInt(key2, 10);
            if (String(keyNum) === key2 && keyNum >= 0 && keyNum > getMaxIndex(acc)) {
              setMaxIndex(acc, keyNum);
            }
          }
          return acc;
        }, mergeTarget);
      };
      var assign = function assignSingleSource(target, source2) {
        return Object.keys(source2).reduce(function(acc, key2) {
          acc[key2] = source2[key2];
          return acc;
        }, target);
      };
      var decode = function(str, defaultDecoder, charset) {
        var strWithoutPlus = str.replace(/\+/g, " ");
        if (charset === "iso-8859-1") {
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          return strWithoutPlus;
        }
      };
      var limit = 1024;
      var encode2 = function encode3(str, defaultEncoder, charset, kind, format) {
        if (str.length === 0) {
          return str;
        }
        var string = str;
        if (typeof str === "symbol") {
          string = Symbol.prototype.toString.call(str);
        } else if (typeof str !== "string") {
          string = String(str);
        }
        if (charset === "iso-8859-1") {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
            return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
          });
        }
        var out = "";
        for (var j = 0; j < string.length; j += limit) {
          var segment = string.length >= limit ? string.slice(j, j + limit) : string;
          var arr = [];
          for (var i = 0; i < segment.length; ++i) {
            var c = segment.charCodeAt(i);
            if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats2.RFC1738 && (c === 40 || c === 41)) {
              arr[arr.length] = segment.charAt(i);
              continue;
            }
            if (c < 128) {
              arr[arr.length] = hexTable[c];
              continue;
            }
            if (c < 2048) {
              arr[arr.length] = hexTable[192 | c >> 6] + hexTable[128 | c & 63];
              continue;
            }
            if (c < 55296 || c >= 57344) {
              arr[arr.length] = hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
              continue;
            }
            i += 1;
            c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
            arr[arr.length] = hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
          }
          out += arr.join("");
        }
        return out;
      };
      var compact2 = function compact3(value) {
        var queue3 = [{ obj: { o: value }, prop: "o" }];
        var refs = [];
        for (var i = 0; i < queue3.length; ++i) {
          var item = queue3[i];
          var obj = item.obj[item.prop];
          var keys2 = Object.keys(obj);
          for (var j = 0; j < keys2.length; ++j) {
            var key2 = keys2[j];
            var val = obj[key2];
            if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
              queue3[queue3.length] = { obj, prop: key2 };
              refs[refs.length] = val;
            }
          }
        }
        compactQueue(queue3);
        return value;
      };
      var isRegExp2 = function isRegExp3(obj) {
        return Object.prototype.toString.call(obj) === "[object RegExp]";
      };
      var isBuffer2 = function isBuffer3(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
      };
      var combine = function combine2(a, b, arrayLimit, plainObjects) {
        if (isOverflow(a)) {
          var newIndex = getMaxIndex(a) + 1;
          a[newIndex] = b;
          setMaxIndex(a, newIndex);
          return a;
        }
        var result = [].concat(a, b);
        if (result.length > arrayLimit) {
          return markOverflow(arrayToObject2(result, { plainObjects }), result.length - 1);
        }
        return result;
      };
      var maybeMap = function maybeMap2(val, fn) {
        if (isArray2(val)) {
          var mapped = [];
          for (var i = 0; i < val.length; i += 1) {
            mapped[mapped.length] = fn(val[i]);
          }
          return mapped;
        }
        return fn(val);
      };
      utils$2 = {
        arrayToObject: arrayToObject2,
        assign,
        combine,
        compact: compact2,
        decode,
        encode: encode2,
        isBuffer: isBuffer2,
        isOverflow,
        isRegExp: isRegExp2,
        markOverflow,
        maybeMap,
        merge: merge2
      };
      return utils$2;
    }
    var stringify_1;
    var hasRequiredStringify;
    function requireStringify() {
      if (hasRequiredStringify) return stringify_1;
      hasRequiredStringify = 1;
      var getSideChannel = requireSideChannel();
      var utils2 = /* @__PURE__ */ requireUtils();
      var formats2 = /* @__PURE__ */ requireFormats();
      var has2 = Object.prototype.hasOwnProperty;
      var arrayPrefixGenerators = {
        brackets: function brackets(prefix) {
          return prefix + "[]";
        },
        comma: "comma",
        indices: function indices(prefix, key2) {
          return prefix + "[" + key2 + "]";
        },
        repeat: function repeat(prefix) {
          return prefix;
        }
      };
      var isArray2 = Array.isArray;
      var push2 = Array.prototype.push;
      var pushToArray = function(arr, valueOrArray) {
        push2.apply(arr, isArray2(valueOrArray) ? valueOrArray : [valueOrArray]);
      };
      var toISO = Date.prototype.toISOString;
      var defaultFormat = formats2["default"];
      var defaults2 = {
        addQueryPrefix: false,
        allowDots: false,
        allowEmptyArrays: false,
        arrayFormat: "indices",
        charset: "utf-8",
        charsetSentinel: false,
        commaRoundTrip: false,
        delimiter: "&",
        encode: true,
        encodeDotInKeys: false,
        encoder: utils2.encode,
        encodeValuesOnly: false,
        filter: void 0,
        format: defaultFormat,
        formatter: formats2.formatters[defaultFormat],
        // deprecated
        indices: false,
        serializeDate: function serializeDate(date) {
          return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
      };
      var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
        return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
      };
      var sentinel = {};
      var stringify = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter2, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel2) {
        var obj = object;
        var tmpSc = sideChannel2;
        var step = 0;
        var findFlag = false;
        while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
          var pos = tmpSc.get(object);
          step += 1;
          if (typeof pos !== "undefined") {
            if (pos === step) {
              throw new RangeError("Cyclic object value");
            } else {
              findFlag = true;
            }
          }
          if (typeof tmpSc.get(sentinel) === "undefined") {
            step = 0;
          }
        }
        if (typeof filter2 === "function") {
          obj = filter2(prefix, obj);
        } else if (obj instanceof Date) {
          obj = serializeDate(obj);
        } else if (generateArrayPrefix === "comma" && isArray2(obj)) {
          obj = utils2.maybeMap(obj, function(value2) {
            if (value2 instanceof Date) {
              return serializeDate(value2);
            }
            return value2;
          });
        }
        if (obj === null) {
          if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults2.encoder, charset, "key", format) : prefix;
          }
          obj = "";
        }
        if (isNonNullishPrimitive(obj) || utils2.isBuffer(obj)) {
          if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults2.encoder, charset, "key", format);
            return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults2.encoder, charset, "value", format))];
          }
          return [formatter(prefix) + "=" + formatter(String(obj))];
        }
        var values = [];
        if (typeof obj === "undefined") {
          return values;
        }
        var objKeys;
        if (generateArrayPrefix === "comma" && isArray2(obj)) {
          if (encodeValuesOnly && encoder) {
            obj = utils2.maybeMap(obj, encoder);
          }
          objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
        } else if (isArray2(filter2)) {
          objKeys = filter2;
        } else {
          var keys2 = Object.keys(obj);
          objKeys = sort ? keys2.sort(sort) : keys2;
        }
        var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
        var adjustedPrefix = commaRoundTrip && isArray2(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
        if (allowEmptyArrays && isArray2(obj) && obj.length === 0) {
          return adjustedPrefix + "[]";
        }
        for (var j = 0; j < objKeys.length; ++j) {
          var key2 = objKeys[j];
          var value = typeof key2 === "object" && key2 && typeof key2.value !== "undefined" ? key2.value : obj[key2];
          if (skipNulls && value === null) {
            continue;
          }
          var encodedKey = allowDots && encodeDotInKeys ? String(key2).replace(/\./g, "%2E") : String(key2);
          var keyPrefix = isArray2(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
          sideChannel2.set(object, step);
          var valueSideChannel = getSideChannel();
          valueSideChannel.set(sentinel, sideChannel2);
          pushToArray(values, stringify2(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            allowEmptyArrays,
            strictNullHandling,
            skipNulls,
            encodeDotInKeys,
            generateArrayPrefix === "comma" && encodeValuesOnly && isArray2(obj) ? null : encoder,
            filter2,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
          ));
        }
        return values;
      };
      var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
        if (!opts) {
          return defaults2;
        }
        if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
          throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        }
        if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
          throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        }
        if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
          throw new TypeError("Encoder has to be a function.");
        }
        var charset = opts.charset || defaults2.charset;
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        }
        var format = formats2["default"];
        if (typeof opts.format !== "undefined") {
          if (!has2.call(formats2.formatters, opts.format)) {
            throw new TypeError("Unknown format option provided.");
          }
          format = opts.format;
        }
        var formatter = formats2.formatters[format];
        var filter2 = defaults2.filter;
        if (typeof opts.filter === "function" || isArray2(opts.filter)) {
          filter2 = opts.filter;
        }
        var arrayFormat;
        if (opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
        } else if ("indices" in opts) {
          arrayFormat = opts.indices ? "indices" : "repeat";
        } else {
          arrayFormat = defaults2.arrayFormat;
        }
        if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
          throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        }
        var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults2.allowDots : !!opts.allowDots;
        return {
          addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults2.addQueryPrefix,
          allowDots,
          allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults2.allowEmptyArrays,
          arrayFormat,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults2.charsetSentinel,
          commaRoundTrip: !!opts.commaRoundTrip,
          delimiter: typeof opts.delimiter === "undefined" ? defaults2.delimiter : opts.delimiter,
          encode: typeof opts.encode === "boolean" ? opts.encode : defaults2.encode,
          encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults2.encodeDotInKeys,
          encoder: typeof opts.encoder === "function" ? opts.encoder : defaults2.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults2.encodeValuesOnly,
          filter: filter2,
          format,
          formatter,
          serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults2.serializeDate,
          skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults2.skipNulls,
          sort: typeof opts.sort === "function" ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults2.strictNullHandling
        };
      };
      stringify_1 = function(object, opts) {
        var obj = object;
        var options = normalizeStringifyOptions(opts);
        var objKeys;
        var filter2;
        if (typeof options.filter === "function") {
          filter2 = options.filter;
          obj = filter2("", obj);
        } else if (isArray2(options.filter)) {
          filter2 = options.filter;
          objKeys = filter2;
        }
        var keys2 = [];
        if (typeof obj !== "object" || obj === null) {
          return "";
        }
        var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
        var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
        if (!objKeys) {
          objKeys = Object.keys(obj);
        }
        if (options.sort) {
          objKeys.sort(options.sort);
        }
        var sideChannel2 = getSideChannel();
        for (var i = 0; i < objKeys.length; ++i) {
          var key2 = objKeys[i];
          var value = obj[key2];
          if (options.skipNulls && value === null) {
            continue;
          }
          pushToArray(keys2, stringify(
            value,
            key2,
            generateArrayPrefix,
            commaRoundTrip,
            options.allowEmptyArrays,
            options.strictNullHandling,
            options.skipNulls,
            options.encodeDotInKeys,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel2
          ));
        }
        var joined = keys2.join(options.delimiter);
        var prefix = options.addQueryPrefix === true ? "?" : "";
        if (options.charsetSentinel) {
          if (options.charset === "iso-8859-1") {
            prefix += "utf8=%26%2310003%3B&";
          } else {
            prefix += "utf8=%E2%9C%93&";
          }
        }
        return joined.length > 0 ? prefix + joined : "";
      };
      return stringify_1;
    }
    var parse;
    var hasRequiredParse;
    function requireParse() {
      if (hasRequiredParse) return parse;
      hasRequiredParse = 1;
      var utils2 = /* @__PURE__ */ requireUtils();
      var has2 = Object.prototype.hasOwnProperty;
      var isArray2 = Array.isArray;
      var defaults2 = {
        allowDots: false,
        allowEmptyArrays: false,
        allowPrototypes: false,
        allowSparse: false,
        arrayLimit: 20,
        charset: "utf-8",
        charsetSentinel: false,
        comma: false,
        decodeDotInKeys: false,
        decoder: utils2.decode,
        delimiter: "&",
        depth: 5,
        duplicates: "combine",
        ignoreQueryPrefix: false,
        interpretNumericEntities: false,
        parameterLimit: 1e3,
        parseArrays: true,
        plainObjects: false,
        strictDepth: false,
        strictMerge: true,
        strictNullHandling: false,
        throwOnLimitExceeded: false
      };
      var interpretNumericEntities = function(str) {
        return str.replace(/&#(\d+);/g, function($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
        });
      };
      var parseArrayValue = function(val, options, currentArrayLength) {
        if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
          return val.split(",");
        }
        if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
          throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
        }
        return val;
      };
      var isoSentinel = "utf8=%26%2310003%3B";
      var charsetSentinel = "utf8=%E2%9C%93";
      var parseValues = function parseQueryStringValues(str, options) {
        var obj = { __proto__: null };
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
        cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
        var parts2 = cleanStr.split(
          options.delimiter,
          options.throwOnLimitExceeded ? limit + 1 : limit
        );
        if (options.throwOnLimitExceeded && parts2.length > limit) {
          throw new RangeError("Parameter limit exceeded. Only " + limit + " parameter" + (limit === 1 ? "" : "s") + " allowed.");
        }
        var skipIndex = -1;
        var i;
        var charset = options.charset;
        if (options.charsetSentinel) {
          for (i = 0; i < parts2.length; ++i) {
            if (parts2[i].indexOf("utf8=") === 0) {
              if (parts2[i] === charsetSentinel) {
                charset = "utf-8";
              } else if (parts2[i] === isoSentinel) {
                charset = "iso-8859-1";
              }
              skipIndex = i;
              i = parts2.length;
            }
          }
        }
        for (i = 0; i < parts2.length; ++i) {
          if (i === skipIndex) {
            continue;
          }
          var part = parts2[i];
          var bracketEqualsPos = part.indexOf("]=");
          var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
          var key2;
          var val;
          if (pos === -1) {
            key2 = options.decoder(part, defaults2.decoder, charset, "key");
            val = options.strictNullHandling ? null : "";
          } else {
            key2 = options.decoder(part.slice(0, pos), defaults2.decoder, charset, "key");
            if (key2 !== null) {
              val = utils2.maybeMap(
                parseArrayValue(
                  part.slice(pos + 1),
                  options,
                  isArray2(obj[key2]) ? obj[key2].length : 0
                ),
                function(encodedVal) {
                  return options.decoder(encodedVal, defaults2.decoder, charset, "value");
                }
              );
            }
          }
          if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
            val = interpretNumericEntities(String(val));
          }
          if (part.indexOf("[]=") > -1) {
            val = isArray2(val) ? [val] : val;
          }
          if (options.comma && isArray2(val) && val.length > options.arrayLimit) {
            if (options.throwOnLimitExceeded) {
              throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
            }
            val = utils2.combine([], val, options.arrayLimit, options.plainObjects);
          }
          if (key2 !== null) {
            var existing = has2.call(obj, key2);
            if (existing && (options.duplicates === "combine" || part.indexOf("[]=") > -1)) {
              obj[key2] = utils2.combine(
                obj[key2],
                val,
                options.arrayLimit,
                options.plainObjects
              );
            } else if (!existing || options.duplicates === "last") {
              obj[key2] = val;
            }
          }
        }
        return obj;
      };
      var parseObject = function(chain, val, options, valuesParsed) {
        var currentArrayLength = 0;
        if (chain.length > 0 && chain[chain.length - 1] === "[]") {
          var parentKey = chain.slice(0, -1).join("");
          currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
        }
        var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
        for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root2 = chain[i];
          if (root2 === "[]" && options.parseArrays) {
            if (utils2.isOverflow(leaf)) {
              obj = leaf;
            } else {
              obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : utils2.combine(
                [],
                leaf,
                options.arrayLimit,
                options.plainObjects
              );
            }
          } else {
            obj = options.plainObjects ? { __proto__: null } : {};
            var cleanRoot = root2.charAt(0) === "[" && root2.charAt(root2.length - 1) === "]" ? root2.slice(1, -1) : root2;
            var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
            var index2 = parseInt(decodedRoot, 10);
            var isValidArrayIndex = !isNaN(index2) && root2 !== decodedRoot && String(index2) === decodedRoot && index2 >= 0 && options.parseArrays;
            if (!options.parseArrays && decodedRoot === "") {
              obj = { 0: leaf };
            } else if (isValidArrayIndex && index2 < options.arrayLimit) {
              obj = [];
              obj[index2] = leaf;
            } else if (isValidArrayIndex && options.throwOnLimitExceeded) {
              throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
            } else if (isValidArrayIndex) {
              obj[index2] = leaf;
              utils2.markOverflow(obj, index2);
            } else if (decodedRoot !== "__proto__") {
              obj[decodedRoot] = leaf;
            }
          }
          leaf = obj;
        }
        return leaf;
      };
      var splitKeyIntoSegments = function splitKeyIntoSegments2(givenKey, options) {
        var key2 = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
        if (options.depth <= 0) {
          if (!options.plainObjects && has2.call(Object.prototype, key2)) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          return [key2];
        }
        var brackets = /(\[[^[\]]*])/;
        var child2 = /(\[[^[\]]*])/g;
        var segment = brackets.exec(key2);
        var parent = segment ? key2.slice(0, segment.index) : key2;
        var keys2 = [];
        if (parent) {
          if (!options.plainObjects && has2.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys2[keys2.length] = parent;
        }
        var i = 0;
        while ((segment = child2.exec(key2)) !== null && i < options.depth) {
          i += 1;
          var segmentContent = segment[1].slice(1, -1);
          if (!options.plainObjects && has2.call(Object.prototype, segmentContent)) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys2[keys2.length] = segment[1];
        }
        if (segment) {
          if (options.strictDepth === true) {
            throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
          }
          keys2[keys2.length] = "[" + key2.slice(segment.index) + "]";
        }
        return keys2;
      };
      var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
        if (!givenKey) {
          return;
        }
        var keys2 = splitKeyIntoSegments(givenKey, options);
        if (!keys2) {
          return;
        }
        return parseObject(keys2, val, options, valuesParsed);
      };
      var normalizeParseOptions = function normalizeParseOptions2(opts) {
        if (!opts) {
          return defaults2;
        }
        if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
          throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        }
        if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") {
          throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
        }
        if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") {
          throw new TypeError("Decoder has to be a function.");
        }
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        }
        if (typeof opts.throwOnLimitExceeded !== "undefined" && typeof opts.throwOnLimitExceeded !== "boolean") {
          throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
        }
        var charset = typeof opts.charset === "undefined" ? defaults2.charset : opts.charset;
        var duplicates = typeof opts.duplicates === "undefined" ? defaults2.duplicates : opts.duplicates;
        if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") {
          throw new TypeError("The duplicates option must be either combine, first, or last");
        }
        var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults2.allowDots : !!opts.allowDots;
        return {
          allowDots,
          allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults2.allowEmptyArrays,
          allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults2.allowPrototypes,
          allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults2.allowSparse,
          arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults2.arrayLimit,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults2.charsetSentinel,
          comma: typeof opts.comma === "boolean" ? opts.comma : defaults2.comma,
          decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults2.decodeDotInKeys,
          decoder: typeof opts.decoder === "function" ? opts.decoder : defaults2.decoder,
          delimiter: typeof opts.delimiter === "string" || utils2.isRegExp(opts.delimiter) ? opts.delimiter : defaults2.delimiter,
          // eslint-disable-next-line no-implicit-coercion, no-extra-parens
          depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults2.depth,
          duplicates,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults2.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults2.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults2.plainObjects,
          strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults2.strictDepth,
          strictMerge: typeof opts.strictMerge === "boolean" ? !!opts.strictMerge : defaults2.strictMerge,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults2.strictNullHandling,
          throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === "boolean" ? opts.throwOnLimitExceeded : false
        };
      };
      parse = function(str, opts) {
        var options = normalizeParseOptions(opts);
        if (str === "" || str === null || typeof str === "undefined") {
          return options.plainObjects ? { __proto__: null } : {};
        }
        var tempObj = typeof str === "string" ? parseValues(str, options) : str;
        var obj = options.plainObjects ? { __proto__: null } : {};
        var keys2 = Object.keys(tempObj);
        for (var i = 0; i < keys2.length; ++i) {
          var key2 = keys2[i];
          var newObj = parseKeys(key2, tempObj[key2], options, typeof str === "string");
          obj = utils2.merge(obj, newObj, options);
        }
        if (options.allowSparse === true) {
          return obj;
        }
        return utils2.compact(obj);
      };
      return parse;
    }
    var lib;
    var hasRequiredLib;
    function requireLib() {
      if (hasRequiredLib) return lib;
      hasRequiredLib = 1;
      var stringify = /* @__PURE__ */ requireStringify();
      var parse2 = /* @__PURE__ */ requireParse();
      var formats2 = /* @__PURE__ */ requireFormats();
      lib = {
        formats: formats2,
        parse: parse2,
        stringify
      };
      return lib;
    }
    var libExports = /* @__PURE__ */ requireLib();
    function bind(fn, thisArg) {
      return function wrap2() {
        return fn.apply(thisArg, arguments);
      };
    }
    const { toString } = Object.prototype;
    const { getPrototypeOf } = Object;
    const { iterator, toStringTag } = Symbol;
    const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
      const str = toString.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(/* @__PURE__ */ Object.create(null));
    const kindOfTest = (type2) => {
      type2 = type2.toLowerCase();
      return (thing) => kindOf(thing) === type2;
    };
    const typeOfTest = (type2) => (thing) => typeof thing === type2;
    const { isArray: isArray$1 } = Array;
    const isUndefined = typeOfTest("undefined");
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$2(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    }
    const isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      let result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    const isString$1 = typeOfTest("string");
    const isFunction$2 = typeOfTest("function");
    const isNumber = typeOfTest("number");
    const isObject$2 = (thing) => thing !== null && typeof thing === "object";
    const isBoolean = (thing) => thing === true || thing === false;
    const isPlainObject$1 = (val) => {
      if (kindOf(val) !== "object") {
        return false;
      }
      const prototype2 = getPrototypeOf(val);
      return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
    };
    const isEmptyObject = (val) => {
      if (!isObject$2(val) || isBuffer(val)) {
        return false;
      }
      try {
        return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
      } catch (e) {
        return false;
      }
    };
    const isDate = kindOfTest("Date");
    const isFile$1 = kindOfTest("File");
    const isReactNativeBlob = (value) => {
      return !!(value && typeof value.uri !== "undefined");
    };
    const isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
    const isBlob = kindOfTest("Blob");
    const isFileList = kindOfTest("FileList");
    const isStream = (val) => isObject$2(val) && isFunction$2(val.pipe);
    function getGlobal() {
      if (typeof globalThis !== "undefined") return globalThis;
      if (typeof self !== "undefined") return self;
      if (typeof window !== "undefined") return window;
      if (typeof global !== "undefined") return global;
      return {};
    }
    const G = getGlobal();
    const FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
    const isFormData$1 = (thing) => {
      let kind;
      return thing && (FormDataCtor && thing instanceof FormDataCtor || isFunction$2(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
      kind === "object" && isFunction$2(thing.toString) && thing.toString() === "[object FormData]"));
    };
    const isURLSearchParams = kindOfTest("URLSearchParams");
    const [isReadableStream, isRequest, isResponse, isHeaders] = [
      "ReadableStream",
      "Request",
      "Response",
      "Headers"
    ].map(kindOfTest);
    const trim = (str) => {
      return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
    function forEach(obj, fn, { allOwnKeys = false } = {}) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      let i;
      let l;
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray$1(obj)) {
        for (i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        if (isBuffer(obj)) {
          return;
        }
        const keys2 = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys2.length;
        let key2;
        for (i = 0; i < len; i++) {
          key2 = keys2[i];
          fn.call(null, obj[key2], key2, obj);
        }
      }
    }
    function findKey(obj, key2) {
      if (isBuffer(obj)) {
        return null;
      }
      key2 = key2.toLowerCase();
      const keys2 = Object.keys(obj);
      let i = keys2.length;
      let _key;
      while (i-- > 0) {
        _key = keys2[i];
        if (key2 === _key.toLowerCase()) {
          return _key;
        }
      }
      return null;
    }
    const _global = (() => {
      if (typeof globalThis !== "undefined") return globalThis;
      return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
    })();
    const isContextDefined = (context) => !isUndefined(context) && context !== _global;
    function merge() {
      const { caseless, skipUndefined } = isContextDefined(this) && this || {};
      const result = {};
      const assignValue2 = (val, key2) => {
        if (key2 === "__proto__" || key2 === "constructor" || key2 === "prototype") {
          return;
        }
        const targetKey = caseless && findKey(result, key2) || key2;
        if (isPlainObject$1(result[targetKey]) && isPlainObject$1(val)) {
          result[targetKey] = merge(result[targetKey], val);
        } else if (isPlainObject$1(val)) {
          result[targetKey] = merge({}, val);
        } else if (isArray$1(val)) {
          result[targetKey] = val.slice();
        } else if (!skipUndefined || !isUndefined(val)) {
          result[targetKey] = val;
        }
      };
      for (let i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && forEach(arguments[i], assignValue2);
      }
      return result;
    }
    const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
      forEach(
        b,
        (val, key2) => {
          if (thisArg && isFunction$2(val)) {
            Object.defineProperty(a, key2, {
              value: bind(val, thisArg),
              writable: true,
              enumerable: true,
              configurable: true
            });
          } else {
            Object.defineProperty(a, key2, {
              value: val,
              writable: true,
              enumerable: true,
              configurable: true
            });
          }
        },
        { allOwnKeys }
      );
      return a;
    };
    const stripBOM = (content) => {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    };
    const inherits = (constructor, superConstructor, props, descriptors) => {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      Object.defineProperty(constructor.prototype, "constructor", {
        value: constructor,
        writable: true,
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(constructor, "super", {
        value: superConstructor.prototype
      });
      props && Object.assign(constructor.prototype, props);
    };
    const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
      let props;
      let i;
      let prop2;
      const merged = {};
      destObj = destObj || {};
      if (sourceObj == null) return destObj;
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop2 = props[i];
          if ((!propFilter || propFilter(prop2, sourceObj, destObj)) && !merged[prop2]) {
            destObj[prop2] = sourceObj[prop2];
            merged[prop2] = true;
          }
        }
        sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    };
    const endsWith = (str, searchString, position) => {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      const lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
    const toArray$1 = (thing) => {
      if (!thing) return null;
      if (isArray$1(thing)) return thing;
      let i = thing.length;
      if (!isNumber(i)) return null;
      const arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    };
    const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
      return (thing) => {
        return TypedArray && thing instanceof TypedArray;
      };
    })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
    const forEachEntry = (obj, fn) => {
      const generator = obj && obj[iterator];
      const _iterator = generator.call(obj);
      let result;
      while ((result = _iterator.next()) && !result.done) {
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
      }
    };
    const matchAll = (regExp, str) => {
      let matches;
      const arr = [];
      while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
      }
      return arr;
    };
    const isHTMLForm = kindOfTest("HTMLFormElement");
    const toCamelCase = (str) => {
      return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      });
    };
    const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop2) => hasOwnProperty2.call(obj, prop2))(Object.prototype);
    const isRegExp = kindOfTest("RegExp");
    const reduceDescriptors = (obj, reducer) => {
      const descriptors = Object.getOwnPropertyDescriptors(obj);
      const reducedDescriptors = {};
      forEach(descriptors, (descriptor, name) => {
        let ret;
        if ((ret = reducer(descriptor, name, obj)) !== false) {
          reducedDescriptors[name] = ret || descriptor;
        }
      });
      Object.defineProperties(obj, reducedDescriptors);
    };
    const freezeMethods = (obj) => {
      reduceDescriptors(obj, (descriptor, name) => {
        if (isFunction$2(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
          return false;
        }
        const value = obj[name];
        if (!isFunction$2(value)) return;
        descriptor.enumerable = false;
        if ("writable" in descriptor) {
          descriptor.writable = false;
          return;
        }
        if (!descriptor.set) {
          descriptor.set = () => {
            throw Error("Can not rewrite read-only method '" + name + "'");
          };
        }
      });
    };
    const toObjectSet = (arrayOrString, delimiter) => {
      const obj = {};
      const define = (arr) => {
        arr.forEach((value) => {
          obj[value] = true;
        });
      };
      isArray$1(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
      return obj;
    };
    const noop$1 = () => {
    };
    const toFiniteNumber = (value, defaultValue) => {
      return value != null && Number.isFinite(value = +value) ? value : defaultValue;
    };
    function isSpecCompliantForm(thing) {
      return !!(thing && isFunction$2(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
    }
    const toJSONObject = (obj) => {
      const stack = new Array(10);
      const visit2 = (source2, i) => {
        if (isObject$2(source2)) {
          if (stack.indexOf(source2) >= 0) {
            return;
          }
          if (isBuffer(source2)) {
            return source2;
          }
          if (!("toJSON" in source2)) {
            stack[i] = source2;
            const target = isArray$1(source2) ? [] : {};
            forEach(source2, (value, key2) => {
              const reducedValue = visit2(value, i + 1);
              !isUndefined(reducedValue) && (target[key2] = reducedValue);
            });
            stack[i] = void 0;
            return target;
          }
        }
        return source2;
      };
      return visit2(obj, 0);
    };
    const isAsyncFn = kindOfTest("AsyncFunction");
    const isThenable = (thing) => thing && (isObject$2(thing) || isFunction$2(thing)) && isFunction$2(thing.then) && isFunction$2(thing.catch);
    const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
      if (setImmediateSupported) {
        return setImmediate;
      }
      return postMessageSupported ? ((token, callbacks) => {
        _global.addEventListener(
          "message",
          ({ source: source2, data }) => {
            if (source2 === _global && data === token) {
              callbacks.length && callbacks.shift()();
            }
          },
          false
        );
        return (cb) => {
          callbacks.push(cb);
          _global.postMessage(token, "*");
        };
      })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
    })(typeof setImmediate === "function", isFunction$2(_global.postMessage));
    const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
    const isIterable = (thing) => thing != null && isFunction$2(thing[iterator]);
    const utils$1 = {
      isArray: isArray$1,
      isArrayBuffer,
      isBuffer,
      isFormData: isFormData$1,
      isArrayBufferView,
      isString: isString$1,
      isNumber,
      isBoolean,
      isObject: isObject$2,
      isPlainObject: isPlainObject$1,
      isEmptyObject,
      isReadableStream,
      isRequest,
      isResponse,
      isHeaders,
      isUndefined,
      isDate,
      isFile: isFile$1,
      isReactNativeBlob,
      isReactNative,
      isBlob,
      isRegExp,
      isFunction: isFunction$2,
      isStream,
      isURLSearchParams,
      isTypedArray,
      isFileList,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray: toArray$1,
      forEachEntry,
      matchAll,
      isHTMLForm,
      hasOwnProperty,
      hasOwnProp: hasOwnProperty,
      // an alias to avoid ESLint no-prototype-builtins detection
      reduceDescriptors,
      freezeMethods,
      toObjectSet,
      toCamelCase,
      noop: noop$1,
      toFiniteNumber,
      findKey,
      global: _global,
      isContextDefined,
      isSpecCompliantForm,
      toJSONObject,
      isAsyncFn,
      isThenable,
      setImmediate: _setImmediate,
      asap,
      isIterable
    };
    let AxiosError$1 = class AxiosError2 extends Error {
      static from(error, code, config2, request, response, customProps) {
        const axiosError = new AxiosError2(error.message, code || error.code, config2, request, response);
        axiosError.cause = error;
        axiosError.name = error.name;
        if (error.status != null && axiosError.status == null) {
          axiosError.status = error.status;
        }
        customProps && Object.assign(axiosError, customProps);
        return axiosError;
      }
      /**
       * Create an Error with the specified message, config, error code, request and response.
       *
       * @param {string} message The error message.
       * @param {string} [code] The error code (for example, 'ECONNABORTED').
       * @param {Object} [config] The config.
       * @param {Object} [request] The request.
       * @param {Object} [response] The response.
       *
       * @returns {Error} The created error.
       */
      constructor(message, code, config2, request, response) {
        super(message);
        Object.defineProperty(this, "message", {
          value: message,
          enumerable: true,
          writable: true,
          configurable: true
        });
        this.name = "AxiosError";
        this.isAxiosError = true;
        code && (this.code = code);
        config2 && (this.config = config2);
        request && (this.request = request);
        if (response) {
          this.response = response;
          this.status = response.status;
        }
      }
      toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: utils$1.toJSONObject(this.config),
          code: this.code,
          status: this.status
        };
      }
    };
    AxiosError$1.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
    AxiosError$1.ERR_BAD_OPTION = "ERR_BAD_OPTION";
    AxiosError$1.ECONNABORTED = "ECONNABORTED";
    AxiosError$1.ETIMEDOUT = "ETIMEDOUT";
    AxiosError$1.ERR_NETWORK = "ERR_NETWORK";
    AxiosError$1.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
    AxiosError$1.ERR_DEPRECATED = "ERR_DEPRECATED";
    AxiosError$1.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
    AxiosError$1.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
    AxiosError$1.ERR_CANCELED = "ERR_CANCELED";
    AxiosError$1.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
    AxiosError$1.ERR_INVALID_URL = "ERR_INVALID_URL";
    const httpAdapter = null;
    function isVisitable(thing) {
      return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
    }
    function removeBrackets(key2) {
      return utils$1.endsWith(key2, "[]") ? key2.slice(0, -2) : key2;
    }
    function renderKey(path, key2, dots) {
      if (!path) return key2;
      return path.concat(key2).map(function each2(token, i) {
        token = removeBrackets(token);
        return !dots && i ? "[" + token + "]" : token;
      }).join(dots ? "." : "");
    }
    function isFlatArray(arr) {
      return utils$1.isArray(arr) && !arr.some(isVisitable);
    }
    const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter2(prop2) {
      return /^is[A-Z]/.test(prop2);
    });
    function toFormData$1(obj, formData, options) {
      if (!utils$1.isObject(obj)) {
        throw new TypeError("target must be an object");
      }
      formData = formData || new FormData();
      options = utils$1.toFlatObject(
        options,
        {
          metaTokens: true,
          dots: false,
          indexes: false
        },
        false,
        function defined(option, source2) {
          return !utils$1.isUndefined(source2[option]);
        }
      );
      const metaTokens = options.metaTokens;
      const visitor = options.visitor || defaultVisitor;
      const dots = options.dots;
      const indexes = options.indexes;
      const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
      const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
      if (!utils$1.isFunction(visitor)) {
        throw new TypeError("visitor must be a function");
      }
      function convertValue(value) {
        if (value === null) return "";
        if (utils$1.isDate(value)) {
          return value.toISOString();
        }
        if (utils$1.isBoolean(value)) {
          return value.toString();
        }
        if (!useBlob && utils$1.isBlob(value)) {
          throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
        }
        if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
          return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
        }
        return value;
      }
      function defaultVisitor(value, key2, path) {
        let arr = value;
        if (utils$1.isReactNative(formData) && utils$1.isReactNativeBlob(value)) {
          formData.append(renderKey(path, key2, dots), convertValue(value));
          return false;
        }
        if (value && !path && typeof value === "object") {
          if (utils$1.endsWith(key2, "{}")) {
            key2 = metaTokens ? key2 : key2.slice(0, -2);
            value = JSON.stringify(value);
          } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key2, "[]")) && (arr = utils$1.toArray(value))) {
            key2 = removeBrackets(key2);
            arr.forEach(function each2(el, index2) {
              !(utils$1.isUndefined(el) || el === null) && formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true ? renderKey([key2], index2, dots) : indexes === null ? key2 : key2 + "[]",
                convertValue(el)
              );
            });
            return false;
          }
        }
        if (isVisitable(value)) {
          return true;
        }
        formData.append(renderKey(path, key2, dots), convertValue(value));
        return false;
      }
      const stack = [];
      const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
      });
      function build(value, path) {
        if (utils$1.isUndefined(value)) return;
        if (stack.indexOf(value) !== -1) {
          throw Error("Circular reference detected in " + path.join("."));
        }
        stack.push(value);
        utils$1.forEach(value, function each2(el, key2) {
          const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(formData, el, utils$1.isString(key2) ? key2.trim() : key2, path, exposedHelpers);
          if (result === true) {
            build(el, path ? path.concat(key2) : [key2]);
          }
        });
        stack.pop();
      }
      if (!utils$1.isObject(obj)) {
        throw new TypeError("data must be an object");
      }
      build(obj);
      return formData;
    }
    function encode$1(str) {
      const charMap = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
      };
      return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match2) {
        return charMap[match2];
      });
    }
    function AxiosURLSearchParams(params, options) {
      this._pairs = [];
      params && toFormData$1(params, this, options);
    }
    const prototype = AxiosURLSearchParams.prototype;
    prototype.append = function append2(name, value) {
      this._pairs.push([name, value]);
    };
    prototype.toString = function toString2(encoder) {
      const _encode = encoder ? function(value) {
        return encoder.call(this, value, encode$1);
      } : encode$1;
      return this._pairs.map(function each2(pair) {
        return _encode(pair[0]) + "=" + _encode(pair[1]);
      }, "").join("&");
    };
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
    }
    function buildURL(url, params, options) {
      if (!params) {
        return url;
      }
      const _encode = options && options.encode || encode;
      const _options = utils$1.isFunction(options) ? {
        serialize: options
      } : options;
      const serializeFn = _options && _options.serialize;
      let serializedParams;
      if (serializeFn) {
        serializedParams = serializeFn(params, _options);
      } else {
        serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
      }
      if (serializedParams) {
        const hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    }
    class InterceptorManager {
      constructor() {
        this.handlers = [];
      }
      /**
       * Add a new interceptor to the stack
       *
       * @param {Function} fulfilled The function to handle `then` for a `Promise`
       * @param {Function} rejected The function to handle `reject` for a `Promise`
       * @param {Object} options The options for the interceptor, synchronous and runWhen
       *
       * @return {Number} An ID used to remove interceptor later
       */
      use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      }
      /**
       * Remove an interceptor from the stack
       *
       * @param {Number} id The ID that was returned by `use`
       *
       * @returns {void}
       */
      eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      }
      /**
       * Clear all interceptors from the stack
       *
       * @returns {void}
       */
      clear() {
        if (this.handlers) {
          this.handlers = [];
        }
      }
      /**
       * Iterate over all the registered interceptors
       *
       * This method is particularly useful for skipping over any
       * interceptors that may have become `null` calling `eject`.
       *
       * @param {Function} fn The function to call for each interceptor
       *
       * @returns {void}
       */
      forEach(fn) {
        utils$1.forEach(this.handlers, function forEachHandler(h2) {
          if (h2 !== null) {
            fn(h2);
          }
        });
      }
    }
    const transitionalDefaults = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
      legacyInterceptorReqResOrdering: true
    };
    const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
    const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
    const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
    const platform$1 = {
      isBrowser: true,
      classes: {
        URLSearchParams: URLSearchParams$1,
        FormData: FormData$1,
        Blob: Blob$1
      },
      protocols: ["http", "https", "file", "blob", "url", "data"]
    };
    const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
    const _navigator = typeof navigator === "object" && navigator || void 0;
    const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
    const hasStandardBrowserWebWorkerEnv = (() => {
      return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
    })();
    const origin = hasBrowserEnv && window.location.href || "http://localhost";
    const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      hasBrowserEnv,
      hasStandardBrowserEnv,
      hasStandardBrowserWebWorkerEnv,
      navigator: _navigator,
      origin
    }, Symbol.toStringTag, { value: "Module" }));
    const platform = {
      ...utils,
      ...platform$1
    };
    function toURLEncodedForm(data, options) {
      return toFormData$1(data, new platform.classes.URLSearchParams(), {
        visitor: function(value, key2, path, helpers) {
          if (platform.isNode && utils$1.isBuffer(value)) {
            this.append(key2, value.toString("base64"));
            return false;
          }
          return helpers.defaultVisitor.apply(this, arguments);
        },
        ...options
      });
    }
    function parsePropPath(name) {
      return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match2) => {
        return match2[0] === "[]" ? "" : match2[1] || match2[0];
      });
    }
    function arrayToObject(arr) {
      const obj = {};
      const keys2 = Object.keys(arr);
      let i;
      const len = keys2.length;
      let key2;
      for (i = 0; i < len; i++) {
        key2 = keys2[i];
        obj[key2] = arr[key2];
      }
      return obj;
    }
    function formDataToJSON(formData) {
      function buildPath(path, value, target, index2) {
        let name = path[index2++];
        if (name === "__proto__") return true;
        const isNumericKey = Number.isFinite(+name);
        const isLast = index2 >= path.length;
        name = !name && utils$1.isArray(target) ? target.length : name;
        if (isLast) {
          if (utils$1.hasOwnProp(target, name)) {
            target[name] = [target[name], value];
          } else {
            target[name] = value;
          }
          return !isNumericKey;
        }
        if (!target[name] || !utils$1.isObject(target[name])) {
          target[name] = [];
        }
        const result = buildPath(path, value, target[name], index2);
        if (result && utils$1.isArray(target[name])) {
          target[name] = arrayToObject(target[name]);
        }
        return !isNumericKey;
      }
      if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
        const obj = {};
        utils$1.forEachEntry(formData, (name, value) => {
          buildPath(parsePropPath(name), value, obj, 0);
        });
        return obj;
      }
      return null;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils$1.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils$1.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    const defaults = {
      transitional: transitionalDefaults,
      adapter: ["xhr", "http", "fetch"],
      transformRequest: [
        function transformRequest(data, headers) {
          const contentType = headers.getContentType() || "";
          const hasJSONContentType = contentType.indexOf("application/json") > -1;
          const isObjectPayload = utils$1.isObject(data);
          if (isObjectPayload && utils$1.isHTMLForm(data)) {
            data = new FormData(data);
          }
          const isFormData2 = utils$1.isFormData(data);
          if (isFormData2) {
            return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
          }
          if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
            return data;
          }
          if (utils$1.isArrayBufferView(data)) {
            return data.buffer;
          }
          if (utils$1.isURLSearchParams(data)) {
            headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
            return data.toString();
          }
          let isFileList2;
          if (isObjectPayload) {
            if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
              return toURLEncodedForm(data, this.formSerializer).toString();
            }
            if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
              const _FormData = this.env && this.env.FormData;
              return toFormData$1(
                isFileList2 ? { "files[]": data } : data,
                _FormData && new _FormData(),
                this.formSerializer
              );
            }
          }
          if (isObjectPayload || hasJSONContentType) {
            headers.setContentType("application/json", false);
            return stringifySafely(data);
          }
          return data;
        }
      ],
      transformResponse: [
        function transformResponse(data) {
          const transitional = this.transitional || defaults.transitional;
          const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
          const JSONRequested = this.responseType === "json";
          if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
            return data;
          }
          if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
            const silentJSONParsing = transitional && transitional.silentJSONParsing;
            const strictJSONParsing = !silentJSONParsing && JSONRequested;
            try {
              return JSON.parse(data, this.parseReviver);
            } catch (e) {
              if (strictJSONParsing) {
                if (e.name === "SyntaxError") {
                  throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
                }
                throw e;
              }
            }
          }
          return data;
        }
      ],
      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: platform.classes.FormData,
        Blob: platform.classes.Blob
      },
      validateStatus: function validateStatus(status2) {
        return status2 >= 200 && status2 < 300;
      },
      headers: {
        common: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": void 0
        }
      }
    };
    utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
      defaults.headers[method] = {};
    });
    const ignoreDuplicateOf = utils$1.toObjectSet([
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ]);
    const parseHeaders = (rawHeaders) => {
      const parsed = {};
      let key2;
      let val;
      let i;
      rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
        i = line.indexOf(":");
        key2 = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();
        if (!key2 || parsed[key2] && ignoreDuplicateOf[key2]) {
          return;
        }
        if (key2 === "set-cookie") {
          if (parsed[key2]) {
            parsed[key2].push(val);
          } else {
            parsed[key2] = [val];
          }
        } else {
          parsed[key2] = parsed[key2] ? parsed[key2] + ", " + val : val;
        }
      });
      return parsed;
    };
    const $internals = /* @__PURE__ */ Symbol("internals");
    function normalizeHeader(header) {
      return header && String(header).trim().toLowerCase();
    }
    function normalizeValue(value) {
      if (value === false || value == null) {
        return value;
      }
      return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
    }
    function parseTokens(str) {
      const tokens = /* @__PURE__ */ Object.create(null);
      const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
      let match2;
      while (match2 = tokensRE.exec(str)) {
        tokens[match2[1]] = match2[2];
      }
      return tokens;
    }
    const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
    function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
      if (utils$1.isFunction(filter2)) {
        return filter2.call(this, value, header);
      }
      if (isHeaderNameFilter) {
        value = header;
      }
      if (!utils$1.isString(value)) return;
      if (utils$1.isString(filter2)) {
        return value.indexOf(filter2) !== -1;
      }
      if (utils$1.isRegExp(filter2)) {
        return filter2.test(value);
      }
    }
    function formatHeader(header) {
      return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str;
      });
    }
    function buildAccessors(obj, header) {
      const accessorName = utils$1.toCamelCase(" " + header);
      ["get", "set", "has"].forEach((methodName) => {
        Object.defineProperty(obj, methodName + accessorName, {
          value: function(arg1, arg2, arg3) {
            return this[methodName].call(this, header, arg1, arg2, arg3);
          },
          configurable: true
        });
      });
    }
    let AxiosHeaders$1 = class AxiosHeaders {
      constructor(headers) {
        headers && this.set(headers);
      }
      set(header, valueOrRewrite, rewrite) {
        const self2 = this;
        function setHeader(_value, _header, _rewrite) {
          const lHeader = normalizeHeader(_header);
          if (!lHeader) {
            throw new Error("header name must be a non-empty string");
          }
          const key2 = utils$1.findKey(self2, lHeader);
          if (!key2 || self2[key2] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key2] !== false) {
            self2[key2 || _header] = normalizeValue(_value);
          }
        }
        const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
        if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
          setHeaders(header, valueOrRewrite);
        } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
          setHeaders(parseHeaders(header), valueOrRewrite);
        } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
          let obj = {}, dest, key2;
          for (const entry of header) {
            if (!utils$1.isArray(entry)) {
              throw TypeError("Object iterator must return a key-value pair");
            }
            obj[key2 = entry[0]] = (dest = obj[key2]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
          }
          setHeaders(obj, valueOrRewrite);
        } else {
          header != null && setHeader(valueOrRewrite, header, rewrite);
        }
        return this;
      }
      get(header, parser) {
        header = normalizeHeader(header);
        if (header) {
          const key2 = utils$1.findKey(this, header);
          if (key2) {
            const value = this[key2];
            if (!parser) {
              return value;
            }
            if (parser === true) {
              return parseTokens(value);
            }
            if (utils$1.isFunction(parser)) {
              return parser.call(this, value, key2);
            }
            if (utils$1.isRegExp(parser)) {
              return parser.exec(value);
            }
            throw new TypeError("parser must be boolean|regexp|function");
          }
        }
      }
      has(header, matcher) {
        header = normalizeHeader(header);
        if (header) {
          const key2 = utils$1.findKey(this, header);
          return !!(key2 && this[key2] !== void 0 && (!matcher || matchHeaderValue(this, this[key2], key2, matcher)));
        }
        return false;
      }
      delete(header, matcher) {
        const self2 = this;
        let deleted = false;
        function deleteHeader(_header) {
          _header = normalizeHeader(_header);
          if (_header) {
            const key2 = utils$1.findKey(self2, _header);
            if (key2 && (!matcher || matchHeaderValue(self2, self2[key2], key2, matcher))) {
              delete self2[key2];
              deleted = true;
            }
          }
        }
        if (utils$1.isArray(header)) {
          header.forEach(deleteHeader);
        } else {
          deleteHeader(header);
        }
        return deleted;
      }
      clear(matcher) {
        const keys2 = Object.keys(this);
        let i = keys2.length;
        let deleted = false;
        while (i--) {
          const key2 = keys2[i];
          if (!matcher || matchHeaderValue(this, this[key2], key2, matcher, true)) {
            delete this[key2];
            deleted = true;
          }
        }
        return deleted;
      }
      normalize(format) {
        const self2 = this;
        const headers = {};
        utils$1.forEach(this, (value, header) => {
          const key2 = utils$1.findKey(headers, header);
          if (key2) {
            self2[key2] = normalizeValue(value);
            delete self2[header];
            return;
          }
          const normalized = format ? formatHeader(header) : String(header).trim();
          if (normalized !== header) {
            delete self2[header];
          }
          self2[normalized] = normalizeValue(value);
          headers[normalized] = true;
        });
        return this;
      }
      concat(...targets) {
        return this.constructor.concat(this, ...targets);
      }
      toJSON(asStrings) {
        const obj = /* @__PURE__ */ Object.create(null);
        utils$1.forEach(this, (value, header) => {
          value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
        });
        return obj;
      }
      [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
      }
      toString() {
        return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
      }
      getSetCookie() {
        return this.get("set-cookie") || [];
      }
      get [Symbol.toStringTag]() {
        return "AxiosHeaders";
      }
      static from(thing) {
        return thing instanceof this ? thing : new this(thing);
      }
      static concat(first2, ...targets) {
        const computed = new this(first2);
        targets.forEach((target) => computed.set(target));
        return computed;
      }
      static accessor(header) {
        const internals = this[$internals] = this[$internals] = {
          accessors: {}
        };
        const accessors = internals.accessors;
        const prototype2 = this.prototype;
        function defineAccessor(_header) {
          const lHeader = normalizeHeader(_header);
          if (!accessors[lHeader]) {
            buildAccessors(prototype2, _header);
            accessors[lHeader] = true;
          }
        }
        utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
        return this;
      }
    };
    AxiosHeaders$1.accessor([
      "Content-Type",
      "Content-Length",
      "Accept",
      "Accept-Encoding",
      "User-Agent",
      "Authorization"
    ]);
    utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key2) => {
      let mapped = key2[0].toUpperCase() + key2.slice(1);
      return {
        get: () => value,
        set(headerValue) {
          this[mapped] = headerValue;
        }
      };
    });
    utils$1.freezeMethods(AxiosHeaders$1);
    function transformData(fns, response) {
      const config2 = this || defaults;
      const context = response || config2;
      const headers = AxiosHeaders$1.from(context.headers);
      let data = context.data;
      utils$1.forEach(fns, function transform(fn) {
        data = fn.call(config2, data, headers.normalize(), response ? response.status : void 0);
      });
      headers.normalize();
      return data;
    }
    function isCancel$1(value) {
      return !!(value && value.__CANCEL__);
    }
    let CanceledError$1 = class CanceledError extends AxiosError$1 {
      /**
       * A `CanceledError` is an object that is thrown when an operation is canceled.
       *
       * @param {string=} message The message.
       * @param {Object=} config The config.
       * @param {Object=} request The request.
       *
       * @returns {CanceledError} The created error.
       */
      constructor(message, config2, request) {
        super(message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config2, request);
        this.name = "CanceledError";
        this.__CANCEL__ = true;
      }
    };
    function settle(resolve, reject, response) {
      const validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(
          new AxiosError$1(
            "Request failed with status code " + response.status,
            [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
            response.config,
            response.request,
            response
          )
        );
      }
    }
    function parseProtocol(url) {
      const match2 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match2 && match2[1] || "";
    }
    function speedometer(samplesCount, min2) {
      samplesCount = samplesCount || 10;
      const bytes = new Array(samplesCount);
      const timestamps = new Array(samplesCount);
      let head = 0;
      let tail = 0;
      let firstSampleTS;
      min2 = min2 !== void 0 ? min2 : 1e3;
      return function push2(chunkLength) {
        const now = Date.now();
        const startedAt = timestamps[tail];
        if (!firstSampleTS) {
          firstSampleTS = now;
        }
        bytes[head] = chunkLength;
        timestamps[head] = now;
        let i = tail;
        let bytesCount = 0;
        while (i !== head) {
          bytesCount += bytes[i++];
          i = i % samplesCount;
        }
        head = (head + 1) % samplesCount;
        if (head === tail) {
          tail = (tail + 1) % samplesCount;
        }
        if (now - firstSampleTS < min2) {
          return;
        }
        const passed = startedAt && now - startedAt;
        return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
      };
    }
    function throttle(fn, freq) {
      let timestamp = 0;
      let threshold = 1e3 / freq;
      let lastArgs;
      let timer;
      const invoke = (args, now = Date.now()) => {
        timestamp = now;
        lastArgs = null;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        fn(...args);
      };
      const throttled = (...args) => {
        const now = Date.now();
        const passed = now - timestamp;
        if (passed >= threshold) {
          invoke(args, now);
        } else {
          lastArgs = args;
          if (!timer) {
            timer = setTimeout(() => {
              timer = null;
              invoke(lastArgs);
            }, threshold - passed);
          }
        }
      };
      const flush2 = () => lastArgs && invoke(lastArgs);
      return [throttled, flush2];
    }
    const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
      let bytesNotified = 0;
      const _speedometer = speedometer(50, 250);
      return throttle((e) => {
        const loaded = e.loaded;
        const total = e.lengthComputable ? e.total : void 0;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;
        bytesNotified = loaded;
        const data = {
          loaded,
          total,
          progress: total ? loaded / total : void 0,
          bytes: progressBytes,
          rate: rate ? rate : void 0,
          estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
          event: e,
          lengthComputable: total != null,
          [isDownloadStream ? "download" : "upload"]: true
        };
        listener(data);
      }, freq);
    };
    const progressEventDecorator = (total, throttled) => {
      const lengthComputable = total != null;
      return [
        (loaded) => throttled[0]({
          lengthComputable,
          total,
          loaded
        }),
        throttled[1]
      ];
    };
    const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
    const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
      url = new URL(url, platform.origin);
      return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
    })(
      new URL(platform.origin),
      platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
    ) : () => true;
    const cookies = platform.hasStandardBrowserEnv ? (
      // Standard browser envs support document.cookie
      {
        write(name, value, expires, path, domain, secure, sameSite) {
          if (typeof document === "undefined") return;
          const cookie = [`${name}=${encodeURIComponent(value)}`];
          if (utils$1.isNumber(expires)) {
            cookie.push(`expires=${new Date(expires).toUTCString()}`);
          }
          if (utils$1.isString(path)) {
            cookie.push(`path=${path}`);
          }
          if (utils$1.isString(domain)) {
            cookie.push(`domain=${domain}`);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          if (utils$1.isString(sameSite)) {
            cookie.push(`SameSite=${sameSite}`);
          }
          document.cookie = cookie.join("; ");
        },
        read(name) {
          if (typeof document === "undefined") return null;
          const match2 = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
          return match2 ? decodeURIComponent(match2[1]) : null;
        },
        remove(name) {
          this.write(name, "", Date.now() - 864e5, "/");
        }
      }
    ) : (
      // Non-standard browser env (web workers, react-native) lack needed support.
      {
        write() {
        },
        read() {
          return null;
        },
        remove() {
        }
      }
    );
    function isAbsoluteURL(url) {
      if (typeof url !== "string") {
        return false;
      }
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    }
    function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    }
    function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
      let isRelativeUrl = !isAbsoluteURL(requestedURL);
      if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    }
    const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
    function mergeConfig$1(config1, config2) {
      config2 = config2 || {};
      const config3 = {};
      function getMergedValue(target, source2, prop2, caseless) {
        if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source2)) {
          return utils$1.merge.call({ caseless }, target, source2);
        } else if (utils$1.isPlainObject(source2)) {
          return utils$1.merge({}, source2);
        } else if (utils$1.isArray(source2)) {
          return source2.slice();
        }
        return source2;
      }
      function mergeDeepProperties(a, b, prop2, caseless) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(a, b, prop2, caseless);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(void 0, a, prop2, caseless);
        }
      }
      function valueFromConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(void 0, b);
        }
      }
      function defaultToConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(void 0, b);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(void 0, a);
        }
      }
      function mergeDirectKeys(a, b, prop2) {
        if (prop2 in config2) {
          return getMergedValue(a, b);
        } else if (prop2 in config1) {
          return getMergedValue(void 0, a);
        }
      }
      const mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        withXSRFToken: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: (a, b, prop2) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop2, true)
      };
      utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop2) {
        if (prop2 === "__proto__" || prop2 === "constructor" || prop2 === "prototype") return;
        const merge2 = utils$1.hasOwnProp(mergeMap, prop2) ? mergeMap[prop2] : mergeDeepProperties;
        const configValue = merge2(config1[prop2], config2[prop2], prop2);
        utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop2] = configValue);
      });
      return config3;
    }
    const resolveConfig = (config2) => {
      const newConfig = mergeConfig$1({}, config2);
      let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
      newConfig.headers = headers = AxiosHeaders$1.from(headers);
      newConfig.url = buildURL(
        buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls),
        config2.params,
        config2.paramsSerializer
      );
      if (auth) {
        headers.set(
          "Authorization",
          "Basic " + btoa(
            (auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : "")
          )
        );
      }
      if (utils$1.isFormData(data)) {
        if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
          headers.setContentType(void 0);
        } else if (utils$1.isFunction(data.getHeaders)) {
          const formHeaders = data.getHeaders();
          const allowedHeaders = ["content-type", "content-length"];
          Object.entries(formHeaders).forEach(([key2, val]) => {
            if (allowedHeaders.includes(key2.toLowerCase())) {
              headers.set(key2, val);
            }
          });
        }
      }
      if (platform.hasStandardBrowserEnv) {
        withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
        if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
          const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
          if (xsrfValue) {
            headers.set(xsrfHeaderName, xsrfValue);
          }
        }
      }
      return newConfig;
    };
    const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
    const xhrAdapter = isXHRAdapterSupported && function(config2) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        const _config = resolveConfig(config2);
        let requestData = _config.data;
        const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
        let { responseType, onUploadProgress, onDownloadProgress } = _config;
        let onCanceled;
        let uploadThrottled, downloadThrottled;
        let flushUpload, flushDownload;
        function done2() {
          flushUpload && flushUpload();
          flushDownload && flushDownload();
          _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
          _config.signal && _config.signal.removeEventListener("abort", onCanceled);
        }
        let request = new XMLHttpRequest();
        request.open(_config.method.toUpperCase(), _config.url, true);
        request.timeout = _config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          const responseHeaders = AxiosHeaders$1.from(
            "getAllResponseHeaders" in request && request.getAllResponseHeaders()
          );
          const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          const response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config2,
            request
          };
          settle(
            function _resolve(value) {
              resolve(value);
              done2();
            },
            function _reject(err) {
              reject(err);
              done2();
            },
            response
          );
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config2, request));
          request = null;
        };
        request.onerror = function handleError(event2) {
          const msg = event2 && event2.message ? event2.message : "Network Error";
          const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config2, request);
          err.event = event2 || null;
          reject(err);
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
          const transitional = _config.transitional || transitionalDefaults;
          if (_config.timeoutErrorMessage) {
            timeoutErrorMessage = _config.timeoutErrorMessage;
          }
          reject(
            new AxiosError$1(
              timeoutErrorMessage,
              transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
              config2,
              request
            )
          );
          request = null;
        };
        requestData === void 0 && requestHeaders.setContentType(null);
        if ("setRequestHeader" in request) {
          utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key2) {
            request.setRequestHeader(key2, val);
          });
        }
        if (!utils$1.isUndefined(_config.withCredentials)) {
          request.withCredentials = !!_config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = _config.responseType;
        }
        if (onDownloadProgress) {
          [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
          request.addEventListener("progress", downloadThrottled);
        }
        if (onUploadProgress && request.upload) {
          [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
          request.upload.addEventListener("progress", uploadThrottled);
          request.upload.addEventListener("loadend", flushUpload);
        }
        if (_config.cancelToken || _config.signal) {
          onCanceled = (cancel) => {
            if (!request) {
              return;
            }
            reject(!cancel || cancel.type ? new CanceledError$1(null, config2, request) : cancel);
            request.abort();
            request = null;
          };
          _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
          if (_config.signal) {
            _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
          }
        }
        const protocol = parseProtocol(_config.url);
        if (protocol && platform.protocols.indexOf(protocol) === -1) {
          reject(
            new AxiosError$1(
              "Unsupported protocol " + protocol + ":",
              AxiosError$1.ERR_BAD_REQUEST,
              config2
            )
          );
          return;
        }
        request.send(requestData || null);
      });
    };
    const composeSignals = (signals, timeout) => {
      const { length } = signals = signals ? signals.filter(Boolean) : [];
      if (timeout || length) {
        let controller = new AbortController();
        let aborted;
        const onabort = function(reason) {
          if (!aborted) {
            aborted = true;
            unsubscribe();
            const err = reason instanceof Error ? reason : this.reason;
            controller.abort(
              err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err)
            );
          }
        };
        let timer = timeout && setTimeout(() => {
          timer = null;
          onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
        }, timeout);
        const unsubscribe = () => {
          if (signals) {
            timer && clearTimeout(timer);
            timer = null;
            signals.forEach((signal2) => {
              signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
            });
            signals = null;
          }
        };
        signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
        const { signal } = controller;
        signal.unsubscribe = () => utils$1.asap(unsubscribe);
        return signal;
      }
    };
    const streamChunk = function* (chunk, chunkSize) {
      let len = chunk.byteLength;
      if (len < chunkSize) {
        yield chunk;
        return;
      }
      let pos = 0;
      let end;
      while (pos < len) {
        end = pos + chunkSize;
        yield chunk.slice(pos, end);
        pos = end;
      }
    };
    const readBytes = async function* (iterable, chunkSize) {
      for await (const chunk of readStream(iterable)) {
        yield* streamChunk(chunk, chunkSize);
      }
    };
    const readStream = async function* (stream) {
      if (stream[Symbol.asyncIterator]) {
        yield* stream;
        return;
      }
      const reader = stream.getReader();
      try {
        for (; ; ) {
          const { done: done2, value } = await reader.read();
          if (done2) {
            break;
          }
          yield value;
        }
      } finally {
        await reader.cancel();
      }
    };
    const trackStream = (stream, chunkSize, onProgress, onFinish) => {
      const iterator2 = readBytes(stream, chunkSize);
      let bytes = 0;
      let done2;
      let _onFinish = (e) => {
        if (!done2) {
          done2 = true;
          onFinish && onFinish(e);
        }
      };
      return new ReadableStream(
        {
          async pull(controller) {
            try {
              const { done: done3, value } = await iterator2.next();
              if (done3) {
                _onFinish();
                controller.close();
                return;
              }
              let len = value.byteLength;
              if (onProgress) {
                let loadedBytes = bytes += len;
                onProgress(loadedBytes);
              }
              controller.enqueue(new Uint8Array(value));
            } catch (err) {
              _onFinish(err);
              throw err;
            }
          },
          cancel(reason) {
            _onFinish(reason);
            return iterator2.return();
          }
        },
        {
          highWaterMark: 2
        }
      );
    };
    const DEFAULT_CHUNK_SIZE = 64 * 1024;
    const { isFunction: isFunction$1 } = utils$1;
    const globalFetchAPI = (({ Request: Request2, Response: Response2 }) => ({
      Request: Request2,
      Response: Response2
    }))(utils$1.global);
    const { ReadableStream: ReadableStream$1, TextEncoder: TextEncoder$1 } = utils$1.global;
    const test = (fn, ...args) => {
      try {
        return !!fn(...args);
      } catch (e) {
        return false;
      }
    };
    const factory = (env) => {
      env = utils$1.merge.call(
        {
          skipUndefined: true
        },
        globalFetchAPI,
        env
      );
      const { fetch: envFetch, Request: Request2, Response: Response2 } = env;
      const isFetchSupported = envFetch ? isFunction$1(envFetch) : typeof fetch === "function";
      const isRequestSupported = isFunction$1(Request2);
      const isResponseSupported = isFunction$1(Response2);
      if (!isFetchSupported) {
        return false;
      }
      const isReadableStreamSupported = isFetchSupported && isFunction$1(ReadableStream$1);
      const encodeText = isFetchSupported && (typeof TextEncoder$1 === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder$1()) : async (str) => new Uint8Array(await new Request2(str).arrayBuffer()));
      const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
        let duplexAccessed = false;
        const hasContentType = new Request2(platform.origin, {
          body: new ReadableStream$1(),
          method: "POST",
          get duplex() {
            duplexAccessed = true;
            return "half";
          }
        }).headers.has("Content-Type");
        return duplexAccessed && !hasContentType;
      });
      const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response2("").body));
      const resolvers = {
        stream: supportsResponseStream && ((res) => res.body)
      };
      isFetchSupported && (() => {
        ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type2) => {
          !resolvers[type2] && (resolvers[type2] = (res, config2) => {
            let method = res && res[type2];
            if (method) {
              return method.call(res);
            }
            throw new AxiosError$1(
              `Response type '${type2}' is not supported`,
              AxiosError$1.ERR_NOT_SUPPORT,
              config2
            );
          });
        });
      })();
      const getBodyLength = async (body) => {
        if (body == null) {
          return 0;
        }
        if (utils$1.isBlob(body)) {
          return body.size;
        }
        if (utils$1.isSpecCompliantForm(body)) {
          const _request = new Request2(platform.origin, {
            method: "POST",
            body
          });
          return (await _request.arrayBuffer()).byteLength;
        }
        if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
          return body.byteLength;
        }
        if (utils$1.isURLSearchParams(body)) {
          body = body + "";
        }
        if (utils$1.isString(body)) {
          return (await encodeText(body)).byteLength;
        }
      };
      const resolveBodyLength = async (headers, body) => {
        const length = utils$1.toFiniteNumber(headers.getContentLength());
        return length == null ? getBodyLength(body) : length;
      };
      return async (config2) => {
        let {
          url,
          method,
          data,
          signal,
          cancelToken,
          timeout,
          onDownloadProgress,
          onUploadProgress,
          responseType,
          headers,
          withCredentials = "same-origin",
          fetchOptions
        } = resolveConfig(config2);
        let _fetch = envFetch || fetch;
        responseType = responseType ? (responseType + "").toLowerCase() : "text";
        let composedSignal = composeSignals(
          [signal, cancelToken && cancelToken.toAbortSignal()],
          timeout
        );
        let request = null;
        const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
          composedSignal.unsubscribe();
        });
        let requestContentLength;
        try {
          if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
            let _request = new Request2(url, {
              method: "POST",
              body: data,
              duplex: "half"
            });
            let contentTypeHeader;
            if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
              headers.setContentType(contentTypeHeader);
            }
            if (_request.body) {
              const [onProgress, flush2] = progressEventDecorator(
                requestContentLength,
                progressEventReducer(asyncDecorator(onUploadProgress))
              );
              data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush2);
            }
          }
          if (!utils$1.isString(withCredentials)) {
            withCredentials = withCredentials ? "include" : "omit";
          }
          const isCredentialsSupported = isRequestSupported && "credentials" in Request2.prototype;
          const resolvedOptions = {
            ...fetchOptions,
            signal: composedSignal,
            method: method.toUpperCase(),
            headers: headers.normalize().toJSON(),
            body: data,
            duplex: "half",
            credentials: isCredentialsSupported ? withCredentials : void 0
          };
          request = isRequestSupported && new Request2(url, resolvedOptions);
          let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
          const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
          if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
            const options = {};
            ["status", "statusText", "headers"].forEach((prop2) => {
              options[prop2] = response[prop2];
            });
            const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
            const [onProgress, flush2] = onDownloadProgress && progressEventDecorator(
              responseContentLength,
              progressEventReducer(asyncDecorator(onDownloadProgress), true)
            ) || [];
            response = new Response2(
              trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
                flush2 && flush2();
                unsubscribe && unsubscribe();
              }),
              options
            );
          }
          responseType = responseType || "text";
          let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](
            response,
            config2
          );
          !isStreamResponse && unsubscribe && unsubscribe();
          return await new Promise((resolve, reject) => {
            settle(resolve, reject, {
              data: responseData,
              headers: AxiosHeaders$1.from(response.headers),
              status: response.status,
              statusText: response.statusText,
              config: config2,
              request
            });
          });
        } catch (err) {
          unsubscribe && unsubscribe();
          if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
            throw Object.assign(
              new AxiosError$1(
                "Network Error",
                AxiosError$1.ERR_NETWORK,
                config2,
                request,
                err && err.response
              ),
              {
                cause: err.cause || err
              }
            );
          }
          throw AxiosError$1.from(err, err && err.code, config2, request, err && err.response);
        }
      };
    };
    const seedCache = /* @__PURE__ */ new Map();
    const getFetch = (config2) => {
      let env = config2 && config2.env || {};
      const { fetch: fetch2, Request: Request2, Response: Response2 } = env;
      const seeds = [Request2, Response2, fetch2];
      let len = seeds.length, i = len, seed, target, map2 = seedCache;
      while (i--) {
        seed = seeds[i];
        target = map2.get(seed);
        target === void 0 && map2.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
        map2 = target;
      }
      return target;
    };
    getFetch();
    const knownAdapters = {
      http: httpAdapter,
      xhr: xhrAdapter,
      fetch: {
        get: getFetch
      }
    };
    utils$1.forEach(knownAdapters, (fn, value) => {
      if (fn) {
        try {
          Object.defineProperty(fn, "name", { value });
        } catch (e) {
        }
        Object.defineProperty(fn, "adapterName", { value });
      }
    });
    const renderReason = (reason) => `- ${reason}`;
    const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
    function getAdapter$1(adapters2, config2) {
      adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
      const { length } = adapters2;
      let nameOrAdapter;
      let adapter;
      const rejectedReasons = {};
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters2[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
          if (adapter === void 0) {
            throw new AxiosError$1(`Unknown adapter '${id}'`);
          }
        }
        if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config2)))) {
          break;
        }
        rejectedReasons[id || "#" + i] = adapter;
      }
      if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(
          ([id, state2]) => `adapter ${id} ` + (state2 === false ? "is not supported by the environment" : "is not available in the build")
        );
        let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
        throw new AxiosError$1(
          `There is no suitable adapter to dispatch the request ` + s,
          "ERR_NOT_SUPPORT"
        );
      }
      return adapter;
    }
    const adapters = {
      /**
       * Resolve an adapter from a list of adapter names or functions.
       * @type {Function}
       */
      getAdapter: getAdapter$1,
      /**
       * Exposes all known adapters
       * @type {Object<string, Function|Object>}
       */
      adapters: knownAdapters
    };
    function throwIfCancellationRequested(config2) {
      if (config2.cancelToken) {
        config2.cancelToken.throwIfRequested();
      }
      if (config2.signal && config2.signal.aborted) {
        throw new CanceledError$1(null, config2);
      }
    }
    function dispatchRequest(config2) {
      throwIfCancellationRequested(config2);
      config2.headers = AxiosHeaders$1.from(config2.headers);
      config2.data = transformData.call(config2, config2.transformRequest);
      if (["post", "put", "patch"].indexOf(config2.method) !== -1) {
        config2.headers.setContentType("application/x-www-form-urlencoded", false);
      }
      const adapter = adapters.getAdapter(config2.adapter || defaults.adapter, config2);
      return adapter(config2).then(
        function onAdapterResolution(response) {
          throwIfCancellationRequested(config2);
          response.data = transformData.call(config2, config2.transformResponse, response);
          response.headers = AxiosHeaders$1.from(response.headers);
          return response;
        },
        function onAdapterRejection(reason) {
          if (!isCancel$1(reason)) {
            throwIfCancellationRequested(config2);
            if (reason && reason.response) {
              reason.response.data = transformData.call(
                config2,
                config2.transformResponse,
                reason.response
              );
              reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
            }
          }
          return Promise.reject(reason);
        }
      );
    }
    const VERSION$1 = "1.13.6";
    const validators$1 = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach((type2, i) => {
      validators$1[type2] = function validator2(thing) {
        return typeof thing === type2 || "a" + (i < 1 ? "n " : " ") + type2;
      };
    });
    const deprecatedWarnings = {};
    validators$1.transitional = function transitional(validator2, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return (value, opt, opts) => {
        if (validator2 === false) {
          throw new AxiosError$1(
            formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
            AxiosError$1.ERR_DEPRECATED
          );
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator2 ? validator2(value, opt, opts) : true;
      };
    };
    validators$1.spelling = function spelling(correctSpelling) {
      return (value, opt) => {
        console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
        return true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      const keys2 = Object.keys(options);
      let i = keys2.length;
      while (i-- > 0) {
        const opt = keys2[i];
        const validator2 = schema[opt];
        if (validator2) {
          const value = options[opt];
          const result = value === void 0 || validator2(value, opt, options);
          if (result !== true) {
            throw new AxiosError$1(
              "option " + opt + " must be " + result,
              AxiosError$1.ERR_BAD_OPTION_VALUE
            );
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
        }
      }
    }
    const validator = {
      assertOptions,
      validators: validators$1
    };
    const validators = validator.validators;
    let Axios$1 = class Axios {
      constructor(instanceConfig) {
        this.defaults = instanceConfig || {};
        this.interceptors = {
          request: new InterceptorManager(),
          response: new InterceptorManager()
        };
      }
      /**
       * Dispatch a request
       *
       * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
       * @param {?Object} config
       *
       * @returns {Promise} The Promise to be fulfilled
       */
      async request(configOrUrl, config2) {
        try {
          return await this._request(configOrUrl, config2);
        } catch (err) {
          if (err instanceof Error) {
            let dummy = {};
            Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
            const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
            try {
              if (!err.stack) {
                err.stack = stack;
              } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
                err.stack += "\n" + stack;
              }
            } catch (e) {
            }
          }
          throw err;
        }
      }
      _request(configOrUrl, config2) {
        if (typeof configOrUrl === "string") {
          config2 = config2 || {};
          config2.url = configOrUrl;
        } else {
          config2 = configOrUrl || {};
        }
        config2 = mergeConfig$1(this.defaults, config2);
        const { transitional, paramsSerializer, headers } = config2;
        if (transitional !== void 0) {
          validator.assertOptions(
            transitional,
            {
              silentJSONParsing: validators.transitional(validators.boolean),
              forcedJSONParsing: validators.transitional(validators.boolean),
              clarifyTimeoutError: validators.transitional(validators.boolean),
              legacyInterceptorReqResOrdering: validators.transitional(validators.boolean)
            },
            false
          );
        }
        if (paramsSerializer != null) {
          if (utils$1.isFunction(paramsSerializer)) {
            config2.paramsSerializer = {
              serialize: paramsSerializer
            };
          } else {
            validator.assertOptions(
              paramsSerializer,
              {
                encode: validators.function,
                serialize: validators.function
              },
              true
            );
          }
        }
        if (config2.allowAbsoluteUrls !== void 0) ;
        else if (this.defaults.allowAbsoluteUrls !== void 0) {
          config2.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
        } else {
          config2.allowAbsoluteUrls = true;
        }
        validator.assertOptions(
          config2,
          {
            baseUrl: validators.spelling("baseURL"),
            withXsrfToken: validators.spelling("withXSRFToken")
          },
          true
        );
        config2.method = (config2.method || this.defaults.method || "get").toLowerCase();
        let contextHeaders = headers && utils$1.merge(headers.common, headers[config2.method]);
        headers && utils$1.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
          delete headers[method];
        });
        config2.headers = AxiosHeaders$1.concat(contextHeaders, headers);
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
            return;
          }
          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
          const transitional2 = config2.transitional || transitionalDefaults;
          const legacyInterceptorReqResOrdering = transitional2 && transitional2.legacyInterceptorReqResOrdering;
          if (legacyInterceptorReqResOrdering) {
            requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
          } else {
            requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
          }
        });
        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        let promise;
        let i = 0;
        let len;
        if (!synchronousRequestInterceptors) {
          const chain = [dispatchRequest.bind(this), void 0];
          chain.unshift(...requestInterceptorChain);
          chain.push(...responseInterceptorChain);
          len = chain.length;
          promise = Promise.resolve(config2);
          while (i < len) {
            promise = promise.then(chain[i++], chain[i++]);
          }
          return promise;
        }
        len = requestInterceptorChain.length;
        let newConfig = config2;
        while (i < len) {
          const onFulfilled = requestInterceptorChain[i++];
          const onRejected = requestInterceptorChain[i++];
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error) {
            onRejected.call(this, error);
            break;
          }
        }
        try {
          promise = dispatchRequest.call(this, newConfig);
        } catch (error) {
          return Promise.reject(error);
        }
        i = 0;
        len = responseInterceptorChain.length;
        while (i < len) {
          promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }
        return promise;
      }
      getUri(config2) {
        config2 = mergeConfig$1(this.defaults, config2);
        const fullPath = buildFullPath(config2.baseURL, config2.url, config2.allowAbsoluteUrls);
        return buildURL(fullPath, config2.params, config2.paramsSerializer);
      }
    };
    utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios$1.prototype[method] = function(url, config2) {
        return this.request(
          mergeConfig$1(config2 || {}, {
            method,
            url,
            data: (config2 || {}).data
          })
        );
      };
    });
    utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config2) {
          return this.request(
            mergeConfig$1(config2 || {}, {
              method,
              headers: isForm ? {
                "Content-Type": "multipart/form-data"
              } : {},
              url,
              data
            })
          );
        };
      }
      Axios$1.prototype[method] = generateHTTPMethod();
      Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    let CancelToken$1 = class CancelToken2 {
      constructor(executor) {
        if (typeof executor !== "function") {
          throw new TypeError("executor must be a function.");
        }
        let resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });
        const token = this;
        this.promise.then((cancel) => {
          if (!token._listeners) return;
          let i = token._listeners.length;
          while (i-- > 0) {
            token._listeners[i](cancel);
          }
          token._listeners = null;
        });
        this.promise.then = (onfulfilled) => {
          let _resolve;
          const promise = new Promise((resolve) => {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);
          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };
          return promise;
        };
        executor(function cancel(message, config2, request) {
          if (token.reason) {
            return;
          }
          token.reason = new CanceledError$1(message, config2, request);
          resolvePromise(token.reason);
        });
      }
      /**
       * Throws a `CanceledError` if cancellation has been requested.
       */
      throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      }
      /**
       * Subscribe to the cancel signal
       */
      subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }
        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      }
      /**
       * Unsubscribe from the cancel signal
       */
      unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        const index2 = this._listeners.indexOf(listener);
        if (index2 !== -1) {
          this._listeners.splice(index2, 1);
        }
      }
      toAbortSignal() {
        const controller = new AbortController();
        const abort = (err) => {
          controller.abort(err);
        };
        this.subscribe(abort);
        controller.signal.unsubscribe = () => this.unsubscribe(abort);
        return controller.signal;
      }
      /**
       * Returns an object that contains a new `CancelToken` and a function that, when called,
       * cancels the `CancelToken`.
       */
      static source() {
        let cancel;
        const token = new CancelToken2(function executor(c) {
          cancel = c;
        });
        return {
          token,
          cancel
        };
      }
    };
    function spread$1(callback) {
      return function wrap2(arr) {
        return callback.apply(null, arr);
      };
    }
    function isAxiosError$1(payload) {
      return utils$1.isObject(payload) && payload.isAxiosError === true;
    }
    const HttpStatusCode$1 = {
      Continue: 100,
      SwitchingProtocols: 101,
      Processing: 102,
      EarlyHints: 103,
      Ok: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      ImUsed: 226,
      MultipleChoices: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      UriTooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      ImATeapot: 418,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HttpVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511,
      WebServerIsDown: 521,
      ConnectionTimedOut: 522,
      OriginIsUnreachable: 523,
      TimeoutOccurred: 524,
      SslHandshakeFailed: 525,
      InvalidSslCertificate: 526
    };
    Object.entries(HttpStatusCode$1).forEach(([key2, value]) => {
      HttpStatusCode$1[value] = key2;
    });
    function createInstance(defaultConfig) {
      const context = new Axios$1(defaultConfig);
      const instance = bind(Axios$1.prototype.request, context);
      utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
      utils$1.extend(instance, context, null, { allOwnKeys: true });
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
      };
      return instance;
    }
    const axios = createInstance(defaults);
    axios.Axios = Axios$1;
    axios.CanceledError = CanceledError$1;
    axios.CancelToken = CancelToken$1;
    axios.isCancel = isCancel$1;
    axios.VERSION = VERSION$1;
    axios.toFormData = toFormData$1;
    axios.AxiosError = AxiosError$1;
    axios.Cancel = axios.CanceledError;
    axios.all = function all2(promises) {
      return Promise.all(promises);
    };
    axios.spread = spread$1;
    axios.isAxiosError = isAxiosError$1;
    axios.mergeConfig = mergeConfig$1;
    axios.AxiosHeaders = AxiosHeaders$1;
    axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
    axios.getAdapter = adapters.getAdapter;
    axios.HttpStatusCode = HttpStatusCode$1;
    axios.default = axios;
    const {
      Axios,
      AxiosError,
      CanceledError,
      isCancel,
      CancelToken,
      VERSION,
      all,
      Cancel,
      isAxiosError,
      spread,
      toFormData,
      AxiosHeaders,
      HttpStatusCode,
      formToJSON,
      getAdapter,
      mergeConfig
    } = axios;
    var Config = class {
      constructor(defaults2) {
        this.config = {};
        this.defaults = defaults2;
      }
      extend(defaults2) {
        if (defaults2) {
          this.defaults = { ...this.defaults, ...defaults2 };
        }
        return this;
      }
      replace(newConfig) {
        this.config = newConfig;
      }
      get(key2) {
        return has$1(this.config, key2) ? get$1(this.config, key2) : get$1(this.defaults, key2);
      }
      set(keyOrValues, value) {
        if (typeof keyOrValues === "string") {
          set$1(this.config, keyOrValues, value);
        } else {
          Object.entries(keyOrValues).forEach(([key2, val]) => {
            set$1(this.config, key2, val);
          });
        }
      }
    };
    var config$1 = new Config({
      form: {
        recentlySuccessfulDuration: 2e3,
        forceIndicesArrayFormatInFormData: true,
        withAllErrors: false
      },
      future: {
        preserveEqualProps: false,
        useDataInertiaHeadAttribute: false,
        useDialogForErrorModal: false,
        useScriptElementForInitialPage: false
      },
      prefetch: {
        cacheFor: 3e4,
        hoverDelay: 75
      }
    });
    function debounce(fn, delay) {
      let timeoutID;
      return function(...args) {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => fn.apply(this, args), delay);
      };
    }
    function fireEvent(name, options) {
      return document.dispatchEvent(new CustomEvent(`inertia:${name}`, options));
    }
    var fireBeforeEvent = (visit2) => {
      return fireEvent("before", { cancelable: true, detail: { visit: visit2 } });
    };
    var fireErrorEvent = (errors) => {
      return fireEvent("error", { detail: { errors } });
    };
    var fireExceptionEvent = (exception) => {
      return fireEvent("exception", { cancelable: true, detail: { exception } });
    };
    var fireFinishEvent = (visit2) => {
      return fireEvent("finish", { detail: { visit: visit2 } });
    };
    var fireInvalidEvent = (response) => {
      return fireEvent("invalid", { cancelable: true, detail: { response } });
    };
    var fireBeforeUpdateEvent = (page2) => {
      return fireEvent("beforeUpdate", { detail: { page: page2 } });
    };
    var fireNavigateEvent = (page2) => {
      return fireEvent("navigate", { detail: { page: page2 } });
    };
    var fireProgressEvent = (progress3) => {
      return fireEvent("progress", { detail: { progress: progress3 } });
    };
    var fireStartEvent = (visit2) => {
      return fireEvent("start", { detail: { visit: visit2 } });
    };
    var fireSuccessEvent = (page2) => {
      return fireEvent("success", { detail: { page: page2 } });
    };
    var firePrefetchedEvent = (response, visit2) => {
      return fireEvent("prefetched", { detail: { fetchedAt: Date.now(), response: response.data, visit: visit2 } });
    };
    var firePrefetchingEvent = (visit2) => {
      return fireEvent("prefetching", { detail: { visit: visit2 } });
    };
    var fireFlashEvent = (flash) => {
      return fireEvent("flash", { detail: { flash } });
    };
    var SessionStorage = class {
      static set(key2, value) {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(key2, JSON.stringify(value));
        }
      }
      static get(key2) {
        if (typeof window !== "undefined") {
          return JSON.parse(window.sessionStorage.getItem(key2) || "null");
        }
      }
      static merge(key2, value) {
        const existing = this.get(key2);
        if (existing === null) {
          this.set(key2, value);
        } else {
          this.set(key2, { ...existing, ...value });
        }
      }
      static remove(key2) {
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(key2);
        }
      }
      static removeNested(key2, nestedKey) {
        const existing = this.get(key2);
        if (existing !== null) {
          delete existing[nestedKey];
          this.set(key2, existing);
        }
      }
      static exists(key2) {
        try {
          return this.get(key2) !== null;
        } catch (error) {
          return false;
        }
      }
      static clear() {
        if (typeof window !== "undefined") {
          window.sessionStorage.clear();
        }
      }
    };
    SessionStorage.locationVisitKey = "inertiaLocationVisit";
    var encryptHistory = async (data) => {
      if (typeof window === "undefined") {
        throw new Error("Unable to encrypt history");
      }
      const iv = getIv();
      const storedKey = await getKeyFromSessionStorage();
      const key2 = await getOrCreateKey(storedKey);
      if (!key2) {
        throw new Error("Unable to encrypt history");
      }
      const encrypted = await encryptData(iv, key2, data);
      return encrypted;
    };
    var historySessionStorageKeys = {
      key: "historyKey",
      iv: "historyIv"
    };
    var decryptHistory = async (data) => {
      const iv = getIv();
      const storedKey = await getKeyFromSessionStorage();
      if (!storedKey) {
        throw new Error("Unable to decrypt history");
      }
      return await decryptData(iv, storedKey, data);
    };
    var encryptData = async (iv, key2, data) => {
      if (typeof window === "undefined") {
        throw new Error("Unable to encrypt history");
      }
      if (typeof window.crypto.subtle === "undefined") {
        console.warn("Encryption is not supported in this environment. SSL is required.");
        return Promise.resolve(data);
      }
      const textEncoder = new TextEncoder();
      const str = JSON.stringify(data);
      const encoded = new Uint8Array(str.length * 3);
      const result = textEncoder.encodeInto(str, encoded);
      return window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv
        },
        key2,
        encoded.subarray(0, result.written)
      );
    };
    var decryptData = async (iv, key2, data) => {
      if (typeof window.crypto.subtle === "undefined") {
        console.warn("Decryption is not supported in this environment. SSL is required.");
        return Promise.resolve(data);
      }
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv
        },
        key2,
        data
      );
      return JSON.parse(new TextDecoder().decode(decrypted));
    };
    var getIv = () => {
      const ivString = SessionStorage.get(historySessionStorageKeys.iv);
      if (ivString) {
        return new Uint8Array(ivString);
      }
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      SessionStorage.set(historySessionStorageKeys.iv, Array.from(iv));
      return iv;
    };
    var createKey = async () => {
      if (typeof window.crypto.subtle === "undefined") {
        console.warn("Encryption is not supported in this environment. SSL is required.");
        return Promise.resolve(null);
      }
      return window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256
        },
        true,
        ["encrypt", "decrypt"]
      );
    };
    var saveKey = async (key2) => {
      if (typeof window.crypto.subtle === "undefined") {
        console.warn("Encryption is not supported in this environment. SSL is required.");
        return Promise.resolve();
      }
      const keyData = await window.crypto.subtle.exportKey("raw", key2);
      SessionStorage.set(historySessionStorageKeys.key, Array.from(new Uint8Array(keyData)));
    };
    var getOrCreateKey = async (key2) => {
      if (key2) {
        return key2;
      }
      const newKey = await createKey();
      if (!newKey) {
        return null;
      }
      await saveKey(newKey);
      return newKey;
    };
    var getKeyFromSessionStorage = async () => {
      const stringKey = SessionStorage.get(historySessionStorageKeys.key);
      if (!stringKey) {
        return null;
      }
      const key2 = await window.crypto.subtle.importKey(
        "raw",
        new Uint8Array(stringKey),
        {
          name: "AES-GCM",
          length: 256
        },
        true,
        ["encrypt", "decrypt"]
      );
      return key2;
    };
    var objectsAreEqual = (obj1, obj2, excludeKeys) => {
      if (obj1 === obj2) {
        return true;
      }
      for (const key2 in obj1) {
        if (excludeKeys.includes(key2)) {
          continue;
        }
        if (obj1[key2] === obj2[key2]) {
          continue;
        }
        if (!compareValues(obj1[key2], obj2[key2])) {
          return false;
        }
      }
      for (const key2 in obj2) {
        if (excludeKeys.includes(key2)) {
          continue;
        }
        if (!(key2 in obj1)) {
          return false;
        }
      }
      return true;
    };
    var compareValues = (value1, value2) => {
      switch (typeof value1) {
        case "object":
          return objectsAreEqual(value1, value2, []);
        case "function":
          return value1.toString() === value2.toString();
        default:
          return value1 === value2;
      }
    };
    var conversionMap = {
      ms: 1,
      s: 1e3,
      m: 1e3 * 60,
      h: 1e3 * 60 * 60,
      d: 1e3 * 60 * 60 * 24
    };
    var timeToMs = (time) => {
      if (typeof time === "number") {
        return time;
      }
      for (const [unit, conversion] of Object.entries(conversionMap)) {
        if (time.endsWith(unit)) {
          return parseFloat(time) * conversion;
        }
      }
      return parseInt(time);
    };
    var PrefetchedRequests = class {
      constructor() {
        this.cached = [];
        this.inFlightRequests = [];
        this.removalTimers = [];
        this.currentUseId = null;
      }
      add(params, sendFunc, { cacheFor, cacheTags }) {
        const inFlight = this.findInFlight(params);
        if (inFlight) {
          return Promise.resolve();
        }
        const existing = this.findCached(params);
        if (!params.fresh && existing && existing.staleTimestamp > Date.now()) {
          return Promise.resolve();
        }
        const [stale, prefetchExpiresIn] = this.extractStaleValues(cacheFor);
        const promise = new Promise((resolve, reject) => {
          sendFunc({
            ...params,
            onCancel: () => {
              this.remove(params);
              params.onCancel();
              reject();
            },
            onError: (error) => {
              this.remove(params);
              params.onError(error);
              reject();
            },
            onPrefetching(visitParams) {
              params.onPrefetching(visitParams);
            },
            onPrefetched(response, visit2) {
              params.onPrefetched(response, visit2);
            },
            onPrefetchResponse(response) {
              resolve(response);
            },
            onPrefetchError(error) {
              prefetchedRequests.removeFromInFlight(params);
              reject(error);
            }
          });
        }).then((response) => {
          this.remove(params);
          const pageResponse = response.getPageResponse();
          page$1.mergeOncePropsIntoResponse(pageResponse);
          this.cached.push({
            params: { ...params },
            staleTimestamp: Date.now() + stale,
            expiresAt: Date.now() + prefetchExpiresIn,
            response: promise,
            singleUse: prefetchExpiresIn === 0,
            timestamp: Date.now(),
            inFlight: false,
            tags: Array.isArray(cacheTags) ? cacheTags : [cacheTags]
          });
          const oncePropExpiresIn = this.getShortestOncePropTtl(pageResponse);
          this.scheduleForRemoval(
            params,
            oncePropExpiresIn ? Math.min(prefetchExpiresIn, oncePropExpiresIn) : prefetchExpiresIn
          );
          this.removeFromInFlight(params);
          response.handlePrefetch();
          return response;
        });
        this.inFlightRequests.push({
          params: { ...params },
          response: promise,
          staleTimestamp: null,
          inFlight: true
        });
        return promise;
      }
      removeAll() {
        this.cached = [];
        this.removalTimers.forEach((removalTimer) => {
          clearTimeout(removalTimer.timer);
        });
        this.removalTimers = [];
      }
      removeByTags(tags) {
        this.cached = this.cached.filter((prefetched) => {
          return !prefetched.tags.some((tag) => tags.includes(tag));
        });
      }
      remove(params) {
        this.cached = this.cached.filter((prefetched) => {
          return !this.paramsAreEqual(prefetched.params, params);
        });
        this.clearTimer(params);
      }
      removeFromInFlight(params) {
        this.inFlightRequests = this.inFlightRequests.filter((prefetching) => {
          return !this.paramsAreEqual(prefetching.params, params);
        });
      }
      extractStaleValues(cacheFor) {
        const [stale, expires] = this.cacheForToStaleAndExpires(cacheFor);
        return [timeToMs(stale), timeToMs(expires)];
      }
      cacheForToStaleAndExpires(cacheFor) {
        if (!Array.isArray(cacheFor)) {
          return [cacheFor, cacheFor];
        }
        switch (cacheFor.length) {
          case 0:
            return [0, 0];
          case 1:
            return [cacheFor[0], cacheFor[0]];
          default:
            return [cacheFor[0], cacheFor[1]];
        }
      }
      clearTimer(params) {
        const timer = this.removalTimers.find((removalTimer) => {
          return this.paramsAreEqual(removalTimer.params, params);
        });
        if (timer) {
          clearTimeout(timer.timer);
          this.removalTimers = this.removalTimers.filter((removalTimer) => removalTimer !== timer);
        }
      }
      scheduleForRemoval(params, expiresIn) {
        if (typeof window === "undefined") {
          return;
        }
        this.clearTimer(params);
        if (expiresIn > 0) {
          const timer = window.setTimeout(() => this.remove(params), expiresIn);
          this.removalTimers.push({
            params,
            timer
          });
        }
      }
      get(params) {
        return this.findCached(params) || this.findInFlight(params);
      }
      use(prefetched, params) {
        const id = `${params.url.pathname}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        this.currentUseId = id;
        return prefetched.response.then((response) => {
          if (this.currentUseId !== id) {
            return;
          }
          response.mergeParams({ ...params, onPrefetched: () => {
          } });
          this.removeSingleUseItems(params);
          return response.handle();
        });
      }
      removeSingleUseItems(params) {
        this.cached = this.cached.filter((prefetched) => {
          if (!this.paramsAreEqual(prefetched.params, params)) {
            return true;
          }
          return !prefetched.singleUse;
        });
      }
      findCached(params) {
        return this.cached.find((prefetched) => {
          return this.paramsAreEqual(prefetched.params, params);
        }) || null;
      }
      findInFlight(params) {
        return this.inFlightRequests.find((prefetched) => {
          return this.paramsAreEqual(prefetched.params, params);
        }) || null;
      }
      withoutPurposePrefetchHeader(params) {
        const newParams = cloneDeep(params);
        if (newParams.headers["Purpose"] === "prefetch") {
          delete newParams.headers["Purpose"];
        }
        return newParams;
      }
      paramsAreEqual(params1, params2) {
        return objectsAreEqual(
          this.withoutPurposePrefetchHeader(params1),
          this.withoutPurposePrefetchHeader(params2),
          [
            "showProgress",
            "replace",
            "prefetch",
            "preserveScroll",
            "preserveState",
            "onBefore",
            "onBeforeUpdate",
            "onStart",
            "onProgress",
            "onFinish",
            "onCancel",
            "onSuccess",
            "onError",
            "onFlash",
            "onPrefetched",
            "onCancelToken",
            "onPrefetching",
            "async",
            "viewTransition"
          ]
        );
      }
      updateCachedOncePropsFromCurrentPage() {
        this.cached.forEach((prefetched) => {
          prefetched.response.then((response) => {
            const pageResponse = response.getPageResponse();
            page$1.mergeOncePropsIntoResponse(pageResponse, { force: true });
            for (const [group, deferredProps] of Object.entries(pageResponse.deferredProps ?? {})) {
              const remaining = deferredProps.filter((prop2) => pageResponse.props[prop2] === void 0);
              if (remaining.length > 0) {
                pageResponse.deferredProps[group] = remaining;
              } else {
                delete pageResponse.deferredProps[group];
              }
            }
            const oncePropExpiresIn = this.getShortestOncePropTtl(pageResponse);
            if (oncePropExpiresIn === null) {
              return;
            }
            const prefetchExpiresIn = prefetched.expiresAt - Date.now();
            const expiresIn = Math.min(prefetchExpiresIn, oncePropExpiresIn);
            if (expiresIn > 0) {
              this.scheduleForRemoval(prefetched.params, expiresIn);
            } else {
              this.remove(prefetched.params);
            }
          });
        });
      }
      getShortestOncePropTtl(page2) {
        const expiryTimestamps = Object.values(page2.onceProps ?? {}).map((onceProp) => onceProp.expiresAt).filter((expiresAt) => !!expiresAt);
        if (expiryTimestamps.length === 0) {
          return null;
        }
        return Math.min(...expiryTimestamps) - Date.now();
      }
    };
    var prefetchedRequests = new PrefetchedRequests();
    var requestAnimationFrame$1 = (cb, times = 1) => {
      window.requestAnimationFrame(() => {
        if (times > 1) {
          requestAnimationFrame$1(cb, times - 1);
        } else {
          cb();
        }
      });
    };
    var getInitialPageFromDOM = (id, useScriptElement = false) => {
      if (typeof window === "undefined") {
        return null;
      }
      if (!useScriptElement) {
        const el = document.getElementById(id);
        if (el?.dataset.page) {
          return JSON.parse(el.dataset.page);
        }
      }
      const scriptEl = document.querySelector(`script[data-page="${id}"][type="application/json"]`);
      if (scriptEl?.textContent) {
        return JSON.parse(scriptEl.textContent);
      }
      return null;
    };
    var isServer = typeof window === "undefined";
    var isFirefox = !isServer && /Firefox/i.test(window.navigator.userAgent);
    var Scroll = class {
      static save() {
        history.saveScrollPositions(this.getScrollRegions());
      }
      static getScrollRegions() {
        return Array.from(this.regions()).map((region) => ({
          top: region.scrollTop,
          left: region.scrollLeft
        }));
      }
      static regions() {
        return document.querySelectorAll("[scroll-region]");
      }
      static scrollToTop() {
        if (isFirefox && getComputedStyle(document.documentElement).scrollBehavior === "smooth") {
          return requestAnimationFrame$1(() => window.scrollTo(0, 0), 2);
        }
        window.scrollTo(0, 0);
      }
      static reset() {
        const anchorHash = isServer ? null : window.location.hash;
        if (!anchorHash) {
          this.scrollToTop();
        }
        this.regions().forEach((region) => {
          if (typeof region.scrollTo === "function") {
            region.scrollTo(0, 0);
          } else {
            region.scrollTop = 0;
            region.scrollLeft = 0;
          }
        });
        this.save();
        this.scrollToAnchor();
      }
      static scrollToAnchor() {
        const anchorHash = isServer ? null : window.location.hash;
        if (anchorHash) {
          setTimeout(() => {
            const anchorElement = document.getElementById(anchorHash.slice(1));
            anchorElement ? anchorElement.scrollIntoView() : this.scrollToTop();
          });
        }
      }
      static restore(scrollRegions) {
        if (isServer) {
          return;
        }
        window.requestAnimationFrame(() => {
          this.restoreDocument();
          this.restoreScrollRegions(scrollRegions);
        });
      }
      static restoreScrollRegions(scrollRegions) {
        if (isServer) {
          return;
        }
        this.regions().forEach((region, index2) => {
          const scrollPosition = scrollRegions[index2];
          if (!scrollPosition) {
            return;
          }
          if (typeof region.scrollTo === "function") {
            region.scrollTo(scrollPosition.left, scrollPosition.top);
          } else {
            region.scrollTop = scrollPosition.top;
            region.scrollLeft = scrollPosition.left;
          }
        });
      }
      static restoreDocument() {
        const scrollPosition = history.getDocumentScrollPosition();
        window.scrollTo(scrollPosition.left, scrollPosition.top);
      }
      static onScroll(event2) {
        const target = event2.target;
        if (typeof target.hasAttribute === "function" && target.hasAttribute("scroll-region")) {
          this.save();
        }
      }
      static onWindowScroll() {
        history.saveDocumentScrollPosition({
          top: window.scrollY,
          left: window.scrollX
        });
      }
    };
    var isFile = (value) => typeof File !== "undefined" && value instanceof File || value instanceof Blob || typeof FileList !== "undefined" && value instanceof FileList && value.length > 0;
    function hasFiles(data) {
      return isFile(data) || data instanceof FormData && Array.from(data.values()).some((value) => hasFiles(value)) || typeof data === "object" && data !== null && Object.values(data).some((value) => hasFiles(value));
    }
    var isFormData = (value) => value instanceof FormData;
    function objectToFormData(source2, form = new FormData(), parentKey = null, queryStringArrayFormat = "brackets") {
      source2 = source2 || {};
      for (const key2 in source2) {
        if (Object.prototype.hasOwnProperty.call(source2, key2)) {
          append(form, composeKey(parentKey, key2, "indices"), source2[key2], queryStringArrayFormat);
        }
      }
      return form;
    }
    function composeKey(parent, key2, format) {
      if (!parent) {
        return key2;
      }
      return format === "brackets" ? `${parent}[]` : `${parent}[${key2}]`;
    }
    function append(form, key2, value, format) {
      if (Array.isArray(value)) {
        return Array.from(value.keys()).forEach(
          (index2) => append(form, composeKey(key2, index2.toString(), format), value[index2], format)
        );
      } else if (value instanceof Date) {
        return form.append(key2, value.toISOString());
      } else if (value instanceof File) {
        return form.append(key2, value, value.name);
      } else if (value instanceof Blob) {
        return form.append(key2, value);
      } else if (typeof value === "boolean") {
        return form.append(key2, value ? "1" : "0");
      } else if (typeof value === "string") {
        return form.append(key2, value);
      } else if (typeof value === "number") {
        return form.append(key2, `${value}`);
      } else if (value === null || value === void 0) {
        return form.append(key2, "");
      }
      objectToFormData(value, form, key2, format);
    }
    function hrefToUrl(href) {
      return new URL(href.toString(), typeof window === "undefined" ? void 0 : window.location.toString());
    }
    var transformUrlAndData = (href, data, method, forceFormData, queryStringArrayFormat) => {
      let url = typeof href === "string" ? hrefToUrl(href) : href;
      if ((hasFiles(data) || forceFormData) && !isFormData(data)) {
        if (config$1.get("form.forceIndicesArrayFormatInFormData")) {
          queryStringArrayFormat = "indices";
        }
        data = objectToFormData(data, new FormData(), null, queryStringArrayFormat);
      }
      if (isFormData(data)) {
        return [url, data];
      }
      const [_href, _data] = mergeDataIntoQueryString(method, url, data, queryStringArrayFormat);
      return [hrefToUrl(_href), _data];
    };
    function mergeDataIntoQueryString(method, href, data, qsArrayFormat = "brackets") {
      const hasDataForQueryString = method === "get" && !isFormData(data) && Object.keys(data).length > 0;
      const hasHost = urlHasProtocol(href.toString());
      const hasAbsolutePath = hasHost || href.toString().startsWith("/") || href.toString() === "";
      const hasRelativePath = !hasAbsolutePath && !href.toString().startsWith("#") && !href.toString().startsWith("?");
      const hasRelativePathWithDotPrefix = /^[.]{1,2}([/]|$)/.test(href.toString());
      const hasSearch = href.toString().includes("?") || hasDataForQueryString;
      const hasHash = href.toString().includes("#");
      const url = new URL(href.toString(), typeof window === "undefined" ? "http://localhost" : window.location.toString());
      if (hasDataForQueryString) {
        const hasIndices = /\[\d+\]/.test(decodeURIComponent(url.search));
        const parseOptions = { ignoreQueryPrefix: true, allowSparse: true };
        url.search = libExports.stringify(
          { ...libExports.parse(url.search, parseOptions), ...data },
          {
            encodeValuesOnly: true,
            arrayFormat: hasIndices ? "indices" : qsArrayFormat
          }
        );
      }
      return [
        [
          hasHost ? `${url.protocol}//${url.host}` : "",
          hasAbsolutePath ? url.pathname : "",
          hasRelativePath ? url.pathname.substring(hasRelativePathWithDotPrefix ? 0 : 1) : "",
          hasSearch ? url.search : "",
          hasHash ? url.hash : ""
        ].join(""),
        hasDataForQueryString ? {} : data
      ];
    }
    function urlWithoutHash(url) {
      url = new URL(url.href);
      url.hash = "";
      return url;
    }
    var setHashIfSameUrl = (originUrl, destinationUrl) => {
      if (originUrl.hash && !destinationUrl.hash && urlWithoutHash(originUrl).href === destinationUrl.href) {
        destinationUrl.hash = originUrl.hash;
      }
    };
    var isSameUrlWithoutHash = (url1, url2) => {
      return urlWithoutHash(url1).href === urlWithoutHash(url2).href;
    };
    var isSameUrlWithoutQueryOrHash = (url1, url2) => {
      return url1.origin === url2.origin && url1.pathname === url2.pathname;
    };
    function isUrlMethodPair(href) {
      return href !== null && typeof href === "object" && href !== void 0 && "url" in href && "method" in href;
    }
    function urlHasProtocol(url) {
      return /^([a-z][a-z0-9+.-]*:)?\/\/[^/]/i.test(url);
    }
    var CurrentPage = class {
      constructor() {
        this.componentId = {};
        this.listeners = [];
        this.isFirstPageLoad = true;
        this.cleared = false;
        this.pendingDeferredProps = null;
        this.historyQuotaExceeded = false;
      }
      init({
        initialPage,
        swapComponent,
        resolveComponent,
        onFlash
      }) {
        this.page = { ...initialPage, flash: initialPage.flash ?? {} };
        this.swapComponent = swapComponent;
        this.resolveComponent = resolveComponent;
        this.onFlashCallback = onFlash;
        eventHandler.on("historyQuotaExceeded", () => {
          this.historyQuotaExceeded = true;
        });
        return this;
      }
      set(page2, {
        replace: replace2 = false,
        preserveScroll = false,
        preserveState = false,
        viewTransition = false
      } = {}) {
        if (Object.keys(page2.deferredProps || {}).length) {
          this.pendingDeferredProps = {
            deferredProps: page2.deferredProps,
            component: page2.component,
            url: page2.url
          };
          if (page2.initialDeferredProps === void 0) {
            page2.initialDeferredProps = page2.deferredProps;
          }
        }
        this.componentId = {};
        const componentId = this.componentId;
        if (page2.clearHistory) {
          history.clear();
        }
        return this.resolve(page2.component).then((component2) => {
          if (componentId !== this.componentId) {
            return;
          }
          page2.rememberedState ?? (page2.rememberedState = {});
          const isServer3 = typeof window === "undefined";
          const location = !isServer3 ? window.location : new URL(page2.url);
          const scrollRegions = !isServer3 && preserveScroll ? Scroll.getScrollRegions() : [];
          replace2 = replace2 || isSameUrlWithoutHash(hrefToUrl(page2.url), location);
          const pageForHistory = { ...page2, flash: {} };
          return new Promise(
            (resolve) => replace2 ? history.replaceState(pageForHistory, resolve) : history.pushState(pageForHistory, resolve)
          ).then(() => {
            const isNewComponent = !this.isTheSame(page2);
            if (!isNewComponent && Object.keys(page2.props.errors || {}).length > 0) {
              viewTransition = false;
            }
            this.page = page2;
            this.cleared = false;
            if (this.hasOnceProps()) {
              prefetchedRequests.updateCachedOncePropsFromCurrentPage();
            }
            if (isNewComponent) {
              this.fireEventsFor("newComponent");
            }
            if (this.isFirstPageLoad) {
              this.fireEventsFor("firstLoad");
            }
            this.isFirstPageLoad = false;
            if (this.historyQuotaExceeded) {
              this.historyQuotaExceeded = false;
              return;
            }
            return this.swap({
              component: component2,
              page: page2,
              preserveState,
              viewTransition
            }).then(() => {
              if (preserveScroll) {
                window.requestAnimationFrame(() => Scroll.restoreScrollRegions(scrollRegions));
              } else {
                Scroll.reset();
              }
              if (this.pendingDeferredProps && this.pendingDeferredProps.component === page2.component && this.pendingDeferredProps.url === page2.url) {
                eventHandler.fireInternalEvent("loadDeferredProps", this.pendingDeferredProps.deferredProps);
              }
              this.pendingDeferredProps = null;
              if (!replace2) {
                fireNavigateEvent(page2);
              }
            });
          });
        });
      }
      setQuietly(page2, {
        preserveState = false
      } = {}) {
        return this.resolve(page2.component).then((component2) => {
          this.page = page2;
          this.cleared = false;
          history.setCurrent(page2);
          return this.swap({ component: component2, page: page2, preserveState, viewTransition: false });
        });
      }
      clear() {
        this.cleared = true;
      }
      isCleared() {
        return this.cleared;
      }
      get() {
        return this.page;
      }
      getWithoutFlashData() {
        return { ...this.page, flash: {} };
      }
      hasOnceProps() {
        return Object.keys(this.page.onceProps ?? {}).length > 0;
      }
      merge(data) {
        this.page = { ...this.page, ...data };
      }
      setFlash(flash) {
        this.page = { ...this.page, flash };
        this.onFlashCallback?.(flash);
      }
      setUrlHash(hash) {
        if (!this.page.url.includes(hash)) {
          this.page.url += hash;
        }
      }
      remember(data) {
        this.page.rememberedState = data;
      }
      swap({
        component: component2,
        page: page2,
        preserveState,
        viewTransition
      }) {
        const doSwap = () => this.swapComponent({ component: component2, page: page2, preserveState });
        if (!viewTransition || !document?.startViewTransition) {
          return doSwap();
        }
        const viewTransitionCallback = typeof viewTransition === "boolean" ? () => null : viewTransition;
        return new Promise((resolve) => {
          const transitionResult = document.startViewTransition(() => doSwap().then(resolve));
          viewTransitionCallback(transitionResult);
        });
      }
      resolve(component2) {
        return Promise.resolve(this.resolveComponent(component2));
      }
      isTheSame(page2) {
        return this.page.component === page2.component;
      }
      on(event2, callback) {
        this.listeners.push({ event: event2, callback });
        return () => {
          this.listeners = this.listeners.filter((listener) => listener.event !== event2 && listener.callback !== callback);
        };
      }
      fireEventsFor(event2) {
        this.listeners.filter((listener) => listener.event === event2).forEach((listener) => listener.callback());
      }
      mergeOncePropsIntoResponse(response, { force = false } = {}) {
        Object.entries(response.onceProps ?? {}).forEach(([key2, onceProp]) => {
          const existingOnceProp = this.page.onceProps?.[key2];
          if (existingOnceProp === void 0) {
            return;
          }
          if (force || response.props[onceProp.prop] === void 0) {
            response.props[onceProp.prop] = this.page.props[existingOnceProp.prop];
            response.onceProps[key2].expiresAt = existingOnceProp.expiresAt;
          }
        });
      }
    };
    var page$1 = new CurrentPage();
    var Queue = class {
      constructor() {
        this.items = [];
        this.processingPromise = null;
      }
      add(item) {
        this.items.push(item);
        return this.process();
      }
      process() {
        this.processingPromise ?? (this.processingPromise = this.processNext().finally(() => {
          this.processingPromise = null;
        }));
        return this.processingPromise;
      }
      processNext() {
        const next2 = this.items.shift();
        if (next2) {
          return Promise.resolve(next2()).then(() => this.processNext());
        }
        return Promise.resolve();
      }
    };
    var isServer2 = typeof window === "undefined";
    var queue = new Queue();
    var isChromeIOS = !isServer2 && /CriOS/.test(window.navigator.userAgent);
    var History = class {
      constructor() {
        this.rememberedState = "rememberedState";
        this.scrollRegions = "scrollRegions";
        this.preserveUrl = false;
        this.current = {};
        this.initialState = null;
      }
      remember(data, key2) {
        this.replaceState({
          ...page$1.getWithoutFlashData(),
          rememberedState: {
            ...page$1.get()?.rememberedState ?? {},
            [key2]: data
          }
        });
      }
      restore(key2) {
        if (!isServer2) {
          return this.current[this.rememberedState]?.[key2] !== void 0 ? this.current[this.rememberedState]?.[key2] : this.initialState?.[this.rememberedState]?.[key2];
        }
      }
      pushState(page2, cb = null) {
        if (isServer2) {
          return;
        }
        if (this.preserveUrl) {
          cb && cb();
          return;
        }
        this.current = page2;
        queue.add(() => {
          return this.getPageData(page2).then((data) => {
            const doPush = () => this.doPushState({ page: data }, page2.url).then(() => cb?.());
            if (isChromeIOS) {
              return new Promise((resolve) => {
                setTimeout(() => doPush().then(resolve));
              });
            }
            return doPush();
          });
        });
      }
      clonePageProps(page2) {
        try {
          structuredClone(page2.props);
          return page2;
        } catch {
          return {
            ...page2,
            props: cloneDeep(page2.props)
          };
        }
      }
      getPageData(page2) {
        const pageWithClonedProps = this.clonePageProps(page2);
        return new Promise((resolve) => {
          return page2.encryptHistory ? encryptHistory(pageWithClonedProps).then(resolve) : resolve(pageWithClonedProps);
        });
      }
      processQueue() {
        return queue.process();
      }
      decrypt(page2 = null) {
        if (isServer2) {
          return Promise.resolve(page2 ?? page$1.get());
        }
        const pageData = page2 ?? window.history.state?.page;
        return this.decryptPageData(pageData).then((data) => {
          if (!data) {
            throw new Error("Unable to decrypt history");
          }
          if (this.initialState === null) {
            this.initialState = data ?? void 0;
          } else {
            this.current = data ?? {};
          }
          return data;
        });
      }
      decryptPageData(pageData) {
        return pageData instanceof ArrayBuffer ? decryptHistory(pageData) : Promise.resolve(pageData);
      }
      saveScrollPositions(scrollRegions) {
        queue.add(() => {
          return Promise.resolve().then(() => {
            if (!window.history.state?.page) {
              return;
            }
            if (isEqual$2(this.getScrollRegions(), scrollRegions)) {
              return;
            }
            return this.doReplaceState({
              page: window.history.state.page,
              scrollRegions
            });
          });
        });
      }
      saveDocumentScrollPosition(scrollRegion) {
        queue.add(() => {
          return Promise.resolve().then(() => {
            if (!window.history.state?.page) {
              return;
            }
            if (isEqual$2(this.getDocumentScrollPosition(), scrollRegion)) {
              return;
            }
            return this.doReplaceState({
              page: window.history.state.page,
              documentScrollPosition: scrollRegion
            });
          });
        });
      }
      getScrollRegions() {
        return window.history.state?.scrollRegions || [];
      }
      getDocumentScrollPosition() {
        return window.history.state?.documentScrollPosition || { top: 0, left: 0 };
      }
      replaceState(page2, cb = null) {
        if (isEqual$2(this.current, page2)) {
          cb && cb();
          return;
        }
        const { flash, ...pageWithoutFlash } = page2;
        page$1.merge(pageWithoutFlash);
        if (isServer2) {
          return;
        }
        if (this.preserveUrl) {
          cb && cb();
          return;
        }
        this.current = page2;
        queue.add(() => {
          return this.getPageData(page2).then((data) => {
            const doReplace = () => this.doReplaceState({ page: data }, page2.url).then(() => cb?.());
            if (isChromeIOS) {
              return new Promise((resolve) => {
                setTimeout(() => doReplace().then(resolve));
              });
            }
            return doReplace();
          });
        });
      }
      isHistoryThrottleError(error) {
        return error instanceof Error && error.name === "SecurityError" && (error.message.includes("history.pushState") || error.message.includes("history.replaceState"));
      }
      isQuotaExceededError(error) {
        return error instanceof Error && error.name === "QuotaExceededError";
      }
      withThrottleProtection(cb) {
        return Promise.resolve().then(() => {
          try {
            return cb();
          } catch (error) {
            if (!this.isHistoryThrottleError(error)) {
              throw error;
            }
            console.error(error.message);
          }
        });
      }
      doReplaceState(data, url) {
        return this.withThrottleProtection(() => {
          window.history.replaceState(
            {
              ...data,
              scrollRegions: data.scrollRegions ?? window.history.state?.scrollRegions,
              documentScrollPosition: data.documentScrollPosition ?? window.history.state?.documentScrollPosition
            },
            "",
            url
          );
        });
      }
      doPushState(data, url) {
        return this.withThrottleProtection(() => {
          try {
            window.history.pushState(data, "", url);
          } catch (error) {
            if (!this.isQuotaExceededError(error)) {
              throw error;
            }
            eventHandler.fireInternalEvent("historyQuotaExceeded", url);
          }
        });
      }
      getState(key2, defaultValue) {
        return this.current?.[key2] ?? defaultValue;
      }
      deleteState(key2) {
        if (this.current[key2] !== void 0) {
          delete this.current[key2];
          this.replaceState(this.current);
        }
      }
      clearInitialState(key2) {
        if (this.initialState && this.initialState[key2] !== void 0) {
          delete this.initialState[key2];
        }
      }
      browserHasHistoryEntry() {
        return !isServer2 && !!window.history.state?.page;
      }
      clear() {
        SessionStorage.remove(historySessionStorageKeys.key);
        SessionStorage.remove(historySessionStorageKeys.iv);
      }
      setCurrent(page2) {
        this.current = page2;
      }
      isValidState(state2) {
        return !!state2.page;
      }
      getAllState() {
        return this.current;
      }
    };
    if (typeof window !== "undefined" && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    var history = new History();
    var EventHandler = class {
      constructor() {
        this.internalListeners = [];
      }
      init() {
        if (typeof window !== "undefined") {
          window.addEventListener("popstate", this.handlePopstateEvent.bind(this));
          window.addEventListener("pageshow", this.handlePageshowEvent.bind(this));
          window.addEventListener("scroll", debounce(Scroll.onWindowScroll.bind(Scroll), 100), true);
        }
        if (typeof document !== "undefined") {
          document.addEventListener("scroll", debounce(Scroll.onScroll.bind(Scroll), 100), true);
        }
      }
      onGlobalEvent(type2, callback) {
        const listener = ((event2) => {
          const response = callback(event2);
          if (event2.cancelable && !event2.defaultPrevented && response === false) {
            event2.preventDefault();
          }
        });
        return this.registerListener(`inertia:${type2}`, listener);
      }
      on(event2, callback) {
        this.internalListeners.push({ event: event2, listener: callback });
        return () => {
          this.internalListeners = this.internalListeners.filter((listener) => listener.listener !== callback);
        };
      }
      onMissingHistoryItem() {
        page$1.clear();
        this.fireInternalEvent("missingHistoryItem");
      }
      fireInternalEvent(event2, ...args) {
        this.internalListeners.filter((listener) => listener.event === event2).forEach((listener) => listener.listener(...args));
      }
      registerListener(type2, listener) {
        document.addEventListener(type2, listener);
        return () => document.removeEventListener(type2, listener);
      }
      // bfcache restores pages without firing `popstate`, so we use `pageshow` to
      // re-validate encrypted history entries after `clearHistory` removed the keys.
      // https://web.dev/articles/bfcache
      handlePageshowEvent(event2) {
        if (event2.persisted) {
          history.decrypt().catch(() => this.onMissingHistoryItem());
        }
      }
      handlePopstateEvent(event2) {
        const state2 = event2.state || null;
        if (state2 === null) {
          const url = hrefToUrl(page$1.get().url);
          url.hash = window.location.hash;
          history.replaceState({ ...page$1.getWithoutFlashData(), url: url.href });
          Scroll.reset();
          return;
        }
        if (!history.isValidState(state2)) {
          return this.onMissingHistoryItem();
        }
        history.decrypt(state2.page).then((data) => {
          if (page$1.get().version !== data.version) {
            this.onMissingHistoryItem();
            return;
          }
          router.cancelAll({ prefetch: false });
          page$1.setQuietly(data, { preserveState: false }).then(() => {
            Scroll.restore(history.getScrollRegions());
            fireNavigateEvent(page$1.get());
            const pendingDeferred = {};
            const pageProps = page$1.get().props;
            for (const [group, props] of Object.entries(data.initialDeferredProps ?? data.deferredProps ?? {})) {
              const missing = props.filter((prop2) => pageProps[prop2] === void 0);
              if (missing.length > 0) {
                pendingDeferred[group] = missing;
              }
            }
            if (Object.keys(pendingDeferred).length > 0) {
              this.fireInternalEvent("loadDeferredProps", pendingDeferred);
            }
          });
        }).catch(() => {
          this.onMissingHistoryItem();
        });
      }
    };
    var eventHandler = new EventHandler();
    var NavigationType = class {
      constructor() {
        this.type = this.resolveType();
      }
      resolveType() {
        if (typeof window === "undefined") {
          return "navigate";
        }
        if (window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("navigation").length > 0) {
          return window.performance.getEntriesByType("navigation")[0].type;
        }
        return "navigate";
      }
      get() {
        return this.type;
      }
      isBackForward() {
        return this.type === "back_forward";
      }
      isReload() {
        return this.type === "reload";
      }
    };
    var navigationType = new NavigationType();
    var InitialVisit = class {
      static handle() {
        this.clearRememberedStateOnReload();
        const scenarios = [this.handleBackForward, this.handleLocation, this.handleDefault];
        scenarios.find((handler) => handler.bind(this)());
      }
      static clearRememberedStateOnReload() {
        if (navigationType.isReload()) {
          history.deleteState(history.rememberedState);
          history.clearInitialState(history.rememberedState);
        }
      }
      static handleBackForward() {
        if (!navigationType.isBackForward() || !history.browserHasHistoryEntry()) {
          return false;
        }
        const scrollRegions = history.getScrollRegions();
        history.decrypt().then((data) => {
          page$1.set(data, { preserveScroll: true, preserveState: true }).then(() => {
            Scroll.restore(scrollRegions);
            fireNavigateEvent(page$1.get());
          });
        }).catch(() => {
          eventHandler.onMissingHistoryItem();
        });
        return true;
      }
      /**
       * @link https://inertiajs.com/redirects#external-redirects
       */
      static handleLocation() {
        if (!SessionStorage.exists(SessionStorage.locationVisitKey)) {
          return false;
        }
        const locationVisit = SessionStorage.get(SessionStorage.locationVisitKey) || {};
        SessionStorage.remove(SessionStorage.locationVisitKey);
        if (typeof window !== "undefined") {
          page$1.setUrlHash(window.location.hash);
        }
        history.decrypt(page$1.get()).then(() => {
          const rememberedState = history.getState(history.rememberedState, {});
          const scrollRegions = history.getScrollRegions();
          page$1.remember(rememberedState);
          page$1.set(page$1.get(), {
            preserveScroll: locationVisit.preserveScroll,
            preserveState: true
          }).then(() => {
            if (locationVisit.preserveScroll) {
              Scroll.restore(scrollRegions);
            }
            fireNavigateEvent(page$1.get());
          });
        }).catch(() => {
          eventHandler.onMissingHistoryItem();
        });
        return true;
      }
      static handleDefault() {
        if (typeof window !== "undefined") {
          page$1.setUrlHash(window.location.hash);
        }
        page$1.set(page$1.get(), { preserveScroll: true, preserveState: true }).then(() => {
          if (navigationType.isReload()) {
            Scroll.restore(history.getScrollRegions());
          } else {
            Scroll.scrollToAnchor();
          }
          const page2 = page$1.get();
          fireNavigateEvent(page2);
          const flash = page2.flash;
          if (Object.keys(flash).length > 0) {
            queueMicrotask(() => fireFlashEvent(flash));
          }
        });
      }
    };
    var Poll = class {
      constructor(interval, cb, options) {
        this.id = null;
        this.throttle = false;
        this.keepAlive = false;
        this.cbCount = 0;
        this.keepAlive = options.keepAlive ?? false;
        this.cb = cb;
        this.interval = interval;
        if (options.autoStart ?? true) {
          this.start();
        }
      }
      stop() {
        if (this.id) {
          clearInterval(this.id);
        }
      }
      start() {
        if (typeof window === "undefined") {
          return;
        }
        this.stop();
        this.id = window.setInterval(() => {
          if (!this.throttle || this.cbCount % 10 === 0) {
            this.cb();
          }
          if (this.throttle) {
            this.cbCount++;
          }
        }, this.interval);
      }
      isInBackground(hidden) {
        this.throttle = this.keepAlive ? false : hidden;
        if (this.throttle) {
          this.cbCount = 0;
        }
      }
    };
    var Polls = class {
      constructor() {
        this.polls = [];
        this.setupVisibilityListener();
      }
      add(interval, cb, options) {
        const poll = new Poll(interval, cb, options);
        this.polls.push(poll);
        return {
          stop: () => poll.stop(),
          start: () => poll.start()
        };
      }
      clear() {
        this.polls.forEach((poll) => poll.stop());
        this.polls = [];
      }
      setupVisibilityListener() {
        if (typeof document === "undefined") {
          return;
        }
        document.addEventListener(
          "visibilitychange",
          () => {
            this.polls.forEach((poll) => poll.isInBackground(document.hidden));
          },
          false
        );
      }
    };
    var polls = new Polls();
    var RequestParams = class _RequestParams {
      constructor(params) {
        this.callbacks = [];
        if (!params.prefetch) {
          this.params = params;
        } else {
          const wrappedCallbacks = {
            onBefore: this.wrapCallback(params, "onBefore"),
            onBeforeUpdate: this.wrapCallback(params, "onBeforeUpdate"),
            onStart: this.wrapCallback(params, "onStart"),
            onProgress: this.wrapCallback(params, "onProgress"),
            onFinish: this.wrapCallback(params, "onFinish"),
            onCancel: this.wrapCallback(params, "onCancel"),
            onSuccess: this.wrapCallback(params, "onSuccess"),
            onError: this.wrapCallback(params, "onError"),
            onFlash: this.wrapCallback(params, "onFlash"),
            onCancelToken: this.wrapCallback(params, "onCancelToken"),
            onPrefetched: this.wrapCallback(params, "onPrefetched"),
            onPrefetching: this.wrapCallback(params, "onPrefetching")
          };
          this.params = {
            ...params,
            ...wrappedCallbacks,
            onPrefetchResponse: params.onPrefetchResponse || (() => {
            }),
            onPrefetchError: params.onPrefetchError || (() => {
            })
          };
        }
      }
      static create(params) {
        return new _RequestParams(params);
      }
      data() {
        return this.params.method === "get" ? null : this.params.data;
      }
      queryParams() {
        return this.params.method === "get" ? this.params.data : {};
      }
      isPartial() {
        return this.params.only.length > 0 || this.params.except.length > 0 || this.params.reset.length > 0;
      }
      isPrefetch() {
        return this.params.prefetch === true;
      }
      isDeferredPropsRequest() {
        return this.params.deferredProps === true;
      }
      onCancelToken(cb) {
        this.params.onCancelToken({
          cancel: cb
        });
      }
      markAsFinished() {
        this.params.completed = true;
        this.params.cancelled = false;
        this.params.interrupted = false;
      }
      markAsCancelled({ cancelled = true, interrupted = false }) {
        this.params.onCancel();
        this.params.completed = false;
        this.params.cancelled = cancelled;
        this.params.interrupted = interrupted;
      }
      wasCancelledAtAll() {
        return this.params.cancelled || this.params.interrupted;
      }
      onFinish() {
        this.params.onFinish(this.params);
      }
      onStart() {
        this.params.onStart(this.params);
      }
      onPrefetching() {
        this.params.onPrefetching(this.params);
      }
      onPrefetchResponse(response) {
        if (this.params.onPrefetchResponse) {
          this.params.onPrefetchResponse(response);
        }
      }
      onPrefetchError(error) {
        if (this.params.onPrefetchError) {
          this.params.onPrefetchError(error);
        }
      }
      all() {
        return this.params;
      }
      headers() {
        const headers = {
          ...this.params.headers
        };
        if (this.isPartial()) {
          headers["X-Inertia-Partial-Component"] = page$1.get().component;
        }
        const only = this.params.only.concat(this.params.reset);
        if (only.length > 0) {
          headers["X-Inertia-Partial-Data"] = only.join(",");
        }
        if (this.params.except.length > 0) {
          headers["X-Inertia-Partial-Except"] = this.params.except.join(",");
        }
        if (this.params.reset.length > 0) {
          headers["X-Inertia-Reset"] = this.params.reset.join(",");
        }
        if (this.params.errorBag && this.params.errorBag.length > 0) {
          headers["X-Inertia-Error-Bag"] = this.params.errorBag;
        }
        return headers;
      }
      setPreserveOptions(page2) {
        this.params.preserveScroll = _RequestParams.resolvePreserveOption(this.params.preserveScroll, page2);
        this.params.preserveState = _RequestParams.resolvePreserveOption(this.params.preserveState, page2);
      }
      runCallbacks() {
        this.callbacks.forEach(({ name, args }) => {
          this.params[name](...args);
        });
      }
      merge(toMerge) {
        this.params = {
          ...this.params,
          ...toMerge
        };
      }
      wrapCallback(params, name) {
        return (...args) => {
          this.recordCallback(name, args);
          params[name](...args);
        };
      }
      recordCallback(name, args) {
        this.callbacks.push({ name, args });
      }
      static resolvePreserveOption(value, page2) {
        if (typeof value === "function") {
          return value(page2);
        }
        if (value === "errors") {
          return Object.keys(page2.props.errors || {}).length > 0;
        }
        return value;
      }
    };
    var modal_default = {
      modal: null,
      listener: null,
      createIframeAndPage(html2) {
        if (typeof html2 === "object") {
          html2 = `All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(
            html2
          )}`;
        }
        const page2 = document.createElement("html");
        page2.innerHTML = html2;
        page2.querySelectorAll("a").forEach((a) => a.setAttribute("target", "_top"));
        const iframe = document.createElement("iframe");
        iframe.style.backgroundColor = "white";
        iframe.style.borderRadius = "5px";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        return { iframe, page: page2 };
      },
      show(html2) {
        const { iframe, page: page2 } = this.createIframeAndPage(html2);
        this.modal = document.createElement("div");
        this.modal.style.position = "fixed";
        this.modal.style.width = "100vw";
        this.modal.style.height = "100vh";
        this.modal.style.padding = "50px";
        this.modal.style.boxSizing = "border-box";
        this.modal.style.backgroundColor = "rgba(0, 0, 0, .6)";
        this.modal.style.zIndex = 2e5;
        this.modal.addEventListener("click", () => this.hide());
        this.modal.appendChild(iframe);
        document.body.prepend(this.modal);
        document.body.style.overflow = "hidden";
        if (!iframe.contentWindow) {
          throw new Error("iframe not yet ready.");
        }
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(page2.outerHTML);
        iframe.contentWindow.document.close();
        this.listener = this.hideOnEscape.bind(this);
        document.addEventListener("keydown", this.listener);
      },
      hide() {
        this.modal.outerHTML = "";
        this.modal = null;
        document.body.style.overflow = "visible";
        document.removeEventListener("keydown", this.listener);
      },
      hideOnEscape(event2) {
        if (event2.keyCode === 27) {
          this.hide();
        }
      }
    };
    var dialog_default = {
      show(html2) {
        const { iframe, page: page2 } = modal_default.createIframeAndPage(html2);
        iframe.style.boxSizing = "border-box";
        iframe.style.display = "block";
        const dialog = document.createElement("dialog");
        dialog.id = "inertia-error-dialog";
        Object.assign(dialog.style, {
          width: "calc(100vw - 100px)",
          height: "calc(100vh - 100px)",
          padding: "0",
          margin: "auto",
          border: "none",
          backgroundColor: "transparent"
        });
        const dialogStyleElement = document.createElement("style");
        dialogStyleElement.textContent = `
      dialog#inertia-error-dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.6);
      }

      dialog#inertia-error-dialog:focus {
        outline: none;
      }
    `;
        document.head.appendChild(dialogStyleElement);
        dialog.addEventListener("click", (event2) => {
          if (event2.target === dialog) {
            dialog.close();
          }
        });
        dialog.addEventListener("close", () => {
          dialogStyleElement.remove();
          dialog.remove();
        });
        dialog.appendChild(iframe);
        document.body.prepend(dialog);
        dialog.showModal();
        dialog.focus();
        if (!iframe.contentWindow) {
          throw new Error("iframe not yet ready.");
        }
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(page2.outerHTML);
        iframe.contentWindow.document.close();
      }
    };
    var queue2 = new Queue();
    var Response = class _Response {
      constructor(requestParams, response, originatingPage) {
        this.requestParams = requestParams;
        this.response = response;
        this.originatingPage = originatingPage;
        this.wasPrefetched = false;
      }
      static create(params, response, originatingPage) {
        return new _Response(params, response, originatingPage);
      }
      async handlePrefetch() {
        if (isSameUrlWithoutHash(this.requestParams.all().url, window.location)) {
          this.handle();
        }
      }
      async handle() {
        return queue2.add(() => this.process());
      }
      async process() {
        if (this.requestParams.all().prefetch) {
          this.wasPrefetched = true;
          this.requestParams.all().prefetch = false;
          this.requestParams.all().onPrefetched(this.response, this.requestParams.all());
          firePrefetchedEvent(this.response, this.requestParams.all());
          return Promise.resolve();
        }
        this.requestParams.runCallbacks();
        if (!this.isInertiaResponse()) {
          return this.handleNonInertiaResponse();
        }
        await history.processQueue();
        history.preserveUrl = this.requestParams.all().preserveUrl;
        const previousFlash = page$1.get().flash;
        await this.setPage();
        const errors = page$1.get().props.errors || {};
        if (Object.keys(errors).length > 0) {
          const scopedErrors = this.getScopedErrors(errors);
          fireErrorEvent(scopedErrors);
          return this.requestParams.all().onError(scopedErrors);
        }
        router.flushByCacheTags(this.requestParams.all().invalidateCacheTags || []);
        if (!this.wasPrefetched) {
          router.flush(page$1.get().url);
        }
        const { flash } = page$1.get();
        if (Object.keys(flash).length > 0 && (!this.requestParams.isPartial() || !isEqual$2(flash, previousFlash))) {
          fireFlashEvent(flash);
          this.requestParams.all().onFlash(flash);
        }
        fireSuccessEvent(page$1.get());
        await this.requestParams.all().onSuccess(page$1.get());
        history.preserveUrl = false;
      }
      mergeParams(params) {
        this.requestParams.merge(params);
      }
      getPageResponse() {
        const data = this.getDataFromResponse(this.response.data);
        if (typeof data === "object") {
          return this.response.data = { ...data, flash: data.flash ?? {} };
        }
        return this.response.data = data;
      }
      async handleNonInertiaResponse() {
        if (this.isLocationVisit()) {
          const locationUrl = hrefToUrl(this.getHeader("x-inertia-location"));
          setHashIfSameUrl(this.requestParams.all().url, locationUrl);
          return this.locationVisit(locationUrl);
        }
        const response = {
          ...this.response,
          data: this.getDataFromResponse(this.response.data)
        };
        if (fireInvalidEvent(response)) {
          return config$1.get("future.useDialogForErrorModal") ? dialog_default.show(response.data) : modal_default.show(response.data);
        }
      }
      isInertiaResponse() {
        return this.hasHeader("x-inertia");
      }
      hasStatus(status2) {
        return this.response.status === status2;
      }
      getHeader(header) {
        return this.response.headers[header];
      }
      hasHeader(header) {
        return this.getHeader(header) !== void 0;
      }
      isLocationVisit() {
        return this.hasStatus(409) && this.hasHeader("x-inertia-location");
      }
      /**
       * @link https://inertiajs.com/redirects#external-redirects
       */
      locationVisit(url) {
        try {
          SessionStorage.set(SessionStorage.locationVisitKey, {
            preserveScroll: this.requestParams.all().preserveScroll === true
          });
          if (typeof window === "undefined") {
            return;
          }
          if (isSameUrlWithoutHash(window.location, url)) {
            window.location.reload();
          } else {
            window.location.href = url.href;
          }
        } catch (error) {
          return false;
        }
      }
      async setPage() {
        const pageResponse = this.getPageResponse();
        if (!this.shouldSetPage(pageResponse)) {
          return Promise.resolve();
        }
        this.mergeProps(pageResponse);
        page$1.mergeOncePropsIntoResponse(pageResponse);
        this.preserveEqualProps(pageResponse);
        await this.setRememberedState(pageResponse);
        this.requestParams.setPreserveOptions(pageResponse);
        pageResponse.url = history.preserveUrl ? page$1.get().url : this.pageUrl(pageResponse);
        this.requestParams.all().onBeforeUpdate(pageResponse);
        fireBeforeUpdateEvent(pageResponse);
        return page$1.set(pageResponse, {
          replace: this.requestParams.all().replace,
          preserveScroll: this.requestParams.all().preserveScroll,
          preserveState: this.requestParams.all().preserveState,
          viewTransition: this.requestParams.all().viewTransition
        });
      }
      getDataFromResponse(response) {
        if (typeof response !== "string") {
          return response;
        }
        try {
          return JSON.parse(response);
        } catch (error) {
          return response;
        }
      }
      shouldSetPage(pageResponse) {
        if (!this.requestParams.all().async) {
          return true;
        }
        if (this.originatingPage.component !== pageResponse.component) {
          return true;
        }
        if (this.originatingPage.component !== page$1.get().component) {
          return false;
        }
        const originatingUrl = hrefToUrl(this.originatingPage.url);
        const currentPageUrl = hrefToUrl(page$1.get().url);
        return originatingUrl.origin === currentPageUrl.origin && originatingUrl.pathname === currentPageUrl.pathname;
      }
      pageUrl(pageResponse) {
        const responseUrl = hrefToUrl(pageResponse.url);
        setHashIfSameUrl(this.requestParams.all().url, responseUrl);
        return responseUrl.pathname + responseUrl.search + responseUrl.hash;
      }
      preserveEqualProps(pageResponse) {
        if (pageResponse.component !== page$1.get().component || config$1.get("future.preserveEqualProps") !== true) {
          return;
        }
        const currentPageProps = page$1.get().props;
        Object.entries(pageResponse.props).forEach(([key2, value]) => {
          if (isEqual$2(value, currentPageProps[key2])) {
            pageResponse.props[key2] = currentPageProps[key2];
          }
        });
      }
      mergeProps(pageResponse) {
        if (!this.requestParams.isPartial() || pageResponse.component !== page$1.get().component) {
          return;
        }
        const propsToAppend = pageResponse.mergeProps || [];
        const propsToPrepend = pageResponse.prependProps || [];
        const propsToDeepMerge = pageResponse.deepMergeProps || [];
        const matchPropsOn = pageResponse.matchPropsOn || [];
        const mergeProp = (prop2, shouldAppend) => {
          const currentProp = get$1(page$1.get().props, prop2);
          const incomingProp = get$1(pageResponse.props, prop2);
          if (Array.isArray(incomingProp)) {
            const newArray = this.mergeOrMatchItems(
              currentProp || [],
              incomingProp,
              prop2,
              matchPropsOn,
              shouldAppend
            );
            set$1(pageResponse.props, prop2, newArray);
          } else if (typeof incomingProp === "object" && incomingProp !== null) {
            const newObject = {
              ...currentProp || {},
              ...incomingProp
            };
            set$1(pageResponse.props, prop2, newObject);
          }
        };
        propsToAppend.forEach((prop2) => mergeProp(prop2, true));
        propsToPrepend.forEach((prop2) => mergeProp(prop2, false));
        propsToDeepMerge.forEach((prop2) => {
          const currentProp = page$1.get().props[prop2];
          const incomingProp = pageResponse.props[prop2];
          const deepMerge = (target, source2, matchProp) => {
            if (Array.isArray(source2)) {
              return this.mergeOrMatchItems(target, source2, matchProp, matchPropsOn);
            }
            if (typeof source2 === "object" && source2 !== null) {
              return Object.keys(source2).reduce(
                (acc, key2) => {
                  acc[key2] = deepMerge(target ? target[key2] : void 0, source2[key2], `${matchProp}.${key2}`);
                  return acc;
                },
                { ...target }
              );
            }
            return source2;
          };
          pageResponse.props[prop2] = deepMerge(currentProp, incomingProp, prop2);
        });
        pageResponse.props = { ...page$1.get().props, ...pageResponse.props };
        if (this.requestParams.isDeferredPropsRequest()) {
          const currentErrors = page$1.get().props.errors;
          if (currentErrors && Object.keys(currentErrors).length > 0) {
            pageResponse.props.errors = currentErrors;
          }
        }
        if (page$1.get().scrollProps) {
          pageResponse.scrollProps = {
            ...page$1.get().scrollProps || {},
            ...pageResponse.scrollProps || {}
          };
        }
        if (page$1.hasOnceProps()) {
          pageResponse.onceProps = {
            ...page$1.get().onceProps || {},
            ...pageResponse.onceProps || {}
          };
        }
        pageResponse.flash = {
          ...page$1.get().flash,
          ...this.requestParams.isDeferredPropsRequest() ? {} : pageResponse.flash
        };
        const currentOriginalDeferred = page$1.get().initialDeferredProps;
        if (currentOriginalDeferred && Object.keys(currentOriginalDeferred).length > 0) {
          pageResponse.initialDeferredProps = currentOriginalDeferred;
        }
      }
      mergeOrMatchItems(existingItems, newItems, matchProp, matchPropsOn, shouldAppend = true) {
        const items = Array.isArray(existingItems) ? existingItems : [];
        const matchingKey = matchPropsOn.find((key2) => {
          const keyPath = key2.split(".").slice(0, -1).join(".");
          return keyPath === matchProp;
        });
        if (!matchingKey) {
          return shouldAppend ? [...items, ...newItems] : [...newItems, ...items];
        }
        const uniqueProperty = matchingKey.split(".").pop() || "";
        const newItemsMap = /* @__PURE__ */ new Map();
        newItems.forEach((item) => {
          if (this.hasUniqueProperty(item, uniqueProperty)) {
            newItemsMap.set(item[uniqueProperty], item);
          }
        });
        return shouldAppend ? this.appendWithMatching(items, newItems, newItemsMap, uniqueProperty) : this.prependWithMatching(items, newItems, newItemsMap, uniqueProperty);
      }
      appendWithMatching(existingItems, newItems, newItemsMap, uniqueProperty) {
        const updatedExisting = existingItems.map((item) => {
          if (this.hasUniqueProperty(item, uniqueProperty) && newItemsMap.has(item[uniqueProperty])) {
            return newItemsMap.get(item[uniqueProperty]);
          }
          return item;
        });
        const newItemsToAdd = newItems.filter((item) => {
          if (!this.hasUniqueProperty(item, uniqueProperty)) {
            return true;
          }
          return !existingItems.some(
            (existing) => this.hasUniqueProperty(existing, uniqueProperty) && existing[uniqueProperty] === item[uniqueProperty]
          );
        });
        return [...updatedExisting, ...newItemsToAdd];
      }
      prependWithMatching(existingItems, newItems, newItemsMap, uniqueProperty) {
        const untouchedExisting = existingItems.filter((item) => {
          if (this.hasUniqueProperty(item, uniqueProperty)) {
            return !newItemsMap.has(item[uniqueProperty]);
          }
          return true;
        });
        return [...newItems, ...untouchedExisting];
      }
      hasUniqueProperty(item, property) {
        return item && typeof item === "object" && property in item;
      }
      async setRememberedState(pageResponse) {
        const rememberedState = await history.getState(history.rememberedState, {});
        if (this.requestParams.all().preserveState && rememberedState && pageResponse.component === page$1.get().component) {
          pageResponse.rememberedState = rememberedState;
        }
      }
      getScopedErrors(errors) {
        if (!this.requestParams.all().errorBag) {
          return errors;
        }
        return errors[this.requestParams.all().errorBag || ""] || {};
      }
    };
    var Request = class _Request {
      constructor(params, page2) {
        this.page = page2;
        this.requestHasFinished = false;
        this.requestParams = RequestParams.create(params);
        this.cancelToken = new AbortController();
      }
      static create(params, page2) {
        return new _Request(params, page2);
      }
      isPrefetch() {
        return this.requestParams.isPrefetch();
      }
      async send() {
        this.requestParams.onCancelToken(() => this.cancel({ cancelled: true }));
        fireStartEvent(this.requestParams.all());
        this.requestParams.onStart();
        if (this.requestParams.all().prefetch) {
          this.requestParams.onPrefetching();
          firePrefetchingEvent(this.requestParams.all());
        }
        const originallyPrefetch = this.requestParams.all().prefetch;
        return axios({
          method: this.requestParams.all().method,
          url: urlWithoutHash(this.requestParams.all().url).href,
          data: this.requestParams.data(),
          params: this.requestParams.queryParams(),
          signal: this.cancelToken.signal,
          headers: this.getHeaders(),
          onUploadProgress: this.onProgress.bind(this),
          // Why text? This allows us to delay JSON.parse until we're ready to use the response,
          // helps with performance particularly on large responses + history encryption
          responseType: "text"
        }).then((response) => {
          this.response = Response.create(this.requestParams, response, this.page);
          return this.response.handle();
        }).catch((error) => {
          if (error?.response) {
            this.response = Response.create(this.requestParams, error.response, this.page);
            return this.response.handle();
          }
          return Promise.reject(error);
        }).catch((error) => {
          if (axios.isCancel(error)) {
            return;
          }
          if (fireExceptionEvent(error)) {
            if (originallyPrefetch) {
              this.requestParams.onPrefetchError(error);
            }
            return Promise.reject(error);
          }
        }).finally(() => {
          this.finish();
          if (originallyPrefetch && this.response) {
            this.requestParams.onPrefetchResponse(this.response);
          }
        });
      }
      finish() {
        if (this.requestParams.wasCancelledAtAll()) {
          return;
        }
        this.requestParams.markAsFinished();
        this.fireFinishEvents();
      }
      fireFinishEvents() {
        if (this.requestHasFinished) {
          return;
        }
        this.requestHasFinished = true;
        fireFinishEvent(this.requestParams.all());
        this.requestParams.onFinish();
      }
      cancel({ cancelled = false, interrupted = false }) {
        if (this.requestHasFinished) {
          return;
        }
        this.cancelToken.abort();
        this.requestParams.markAsCancelled({ cancelled, interrupted });
        this.fireFinishEvents();
      }
      onProgress(progress3) {
        if (this.requestParams.data() instanceof FormData) {
          progress3.percentage = progress3.progress ? Math.round(progress3.progress * 100) : 0;
          fireProgressEvent(progress3);
          this.requestParams.all().onProgress(progress3);
        }
      }
      getHeaders() {
        const headers = {
          ...this.requestParams.headers(),
          Accept: "text/html, application/xhtml+xml",
          "X-Requested-With": "XMLHttpRequest",
          "X-Inertia": true
        };
        const page2 = page$1.get();
        if (page2.version) {
          headers["X-Inertia-Version"] = page2.version;
        }
        const onceProps = Object.entries(page2.onceProps || {}).filter(([, onceProp]) => {
          if (page2.props[onceProp.prop] === void 0) {
            return false;
          }
          return !onceProp.expiresAt || onceProp.expiresAt > Date.now();
        }).map(([key2]) => key2);
        if (onceProps.length > 0) {
          headers["X-Inertia-Except-Once-Props"] = onceProps.join(",");
        }
        return headers;
      }
    };
    var RequestStream = class {
      constructor({ maxConcurrent, interruptible }) {
        this.requests = [];
        this.maxConcurrent = maxConcurrent;
        this.interruptible = interruptible;
      }
      send(request) {
        this.requests.push(request);
        request.send().then(() => {
          this.requests = this.requests.filter((r2) => r2 !== request);
        });
      }
      interruptInFlight() {
        this.cancel({ interrupted: true }, false);
      }
      cancelInFlight({ prefetch = true } = {}) {
        this.requests.filter((request) => prefetch || !request.isPrefetch()).forEach((request) => request.cancel({ cancelled: true }));
      }
      cancel({ cancelled = false, interrupted = false } = {}, force = false) {
        if (!force && !this.shouldCancel()) {
          return;
        }
        const request = this.requests.shift();
        request?.cancel({ cancelled, interrupted });
      }
      shouldCancel() {
        return this.interruptible && this.requests.length >= this.maxConcurrent;
      }
    };
    var Router = class {
      constructor() {
        this.syncRequestStream = new RequestStream({
          maxConcurrent: 1,
          interruptible: true
        });
        this.asyncRequestStream = new RequestStream({
          maxConcurrent: Infinity,
          interruptible: false
        });
        this.clientVisitQueue = new Queue();
      }
      init({
        initialPage,
        resolveComponent,
        swapComponent,
        onFlash
      }) {
        page$1.init({
          initialPage,
          resolveComponent,
          swapComponent,
          onFlash
        });
        InitialVisit.handle();
        eventHandler.init();
        eventHandler.on("missingHistoryItem", () => {
          if (typeof window !== "undefined") {
            this.visit(window.location.href, { preserveState: true, preserveScroll: true, replace: true });
          }
        });
        eventHandler.on("loadDeferredProps", (deferredProps) => {
          this.loadDeferredProps(deferredProps);
        });
        eventHandler.on("historyQuotaExceeded", (url) => {
          window.location.href = url;
        });
      }
      get(url, data = {}, options = {}) {
        return this.visit(url, { ...options, method: "get", data });
      }
      post(url, data = {}, options = {}) {
        return this.visit(url, { preserveState: true, ...options, method: "post", data });
      }
      put(url, data = {}, options = {}) {
        return this.visit(url, { preserveState: true, ...options, method: "put", data });
      }
      patch(url, data = {}, options = {}) {
        return this.visit(url, { preserveState: true, ...options, method: "patch", data });
      }
      delete(url, options = {}) {
        return this.visit(url, { preserveState: true, ...options, method: "delete" });
      }
      reload(options = {}) {
        return this.doReload(options);
      }
      doReload(options = {}) {
        if (typeof window === "undefined") {
          return;
        }
        return this.visit(window.location.href, {
          ...options,
          preserveScroll: true,
          preserveState: true,
          async: true,
          headers: {
            ...options.headers || {},
            "Cache-Control": "no-cache"
          }
        });
      }
      remember(data, key2 = "default") {
        history.remember(data, key2);
      }
      restore(key2 = "default") {
        return history.restore(key2);
      }
      on(type2, callback) {
        if (typeof window === "undefined") {
          return () => {
          };
        }
        return eventHandler.onGlobalEvent(type2, callback);
      }
      /**
       * @deprecated Use cancelAll() instead.
       */
      cancel() {
        this.syncRequestStream.cancelInFlight();
      }
      cancelAll({ async = true, prefetch = true, sync = true } = {}) {
        if (async) {
          this.asyncRequestStream.cancelInFlight({ prefetch });
        }
        if (sync) {
          this.syncRequestStream.cancelInFlight();
        }
      }
      poll(interval, requestOptions = {}, options = {}) {
        return polls.add(interval, () => this.reload(requestOptions), {
          autoStart: options.autoStart ?? true,
          keepAlive: options.keepAlive ?? false
        });
      }
      visit(href, options = {}) {
        const visit2 = this.getPendingVisit(href, {
          ...options,
          showProgress: options.showProgress ?? !options.async
        });
        const events = this.getVisitEvents(options);
        if (events.onBefore(visit2) === false || !fireBeforeEvent(visit2)) {
          return;
        }
        const currentPageUrl = hrefToUrl(page$1.get().url);
        const isPartialReload = visit2.only.length > 0 || visit2.except.length > 0 || visit2.reset.length > 0;
        const isSamePage = isPartialReload ? isSameUrlWithoutQueryOrHash(visit2.url, currentPageUrl) : isSameUrlWithoutHash(visit2.url, currentPageUrl);
        if (!isSamePage) {
          this.asyncRequestStream.cancelInFlight({ prefetch: false });
        }
        if (!visit2.async) {
          this.syncRequestStream.interruptInFlight();
        }
        if (!page$1.isCleared() && !visit2.preserveUrl) {
          Scroll.save();
        }
        const requestParams = {
          ...visit2,
          ...events
        };
        const prefetched = prefetchedRequests.get(requestParams);
        if (prefetched) {
          progress.reveal(prefetched.inFlight);
          prefetchedRequests.use(prefetched, requestParams);
        } else {
          progress.reveal(true);
          const requestStream = visit2.async ? this.asyncRequestStream : this.syncRequestStream;
          requestStream.send(Request.create(requestParams, page$1.get()));
        }
      }
      getCached(href, options = {}) {
        return prefetchedRequests.findCached(this.getPrefetchParams(href, options));
      }
      flush(href, options = {}) {
        prefetchedRequests.remove(this.getPrefetchParams(href, options));
      }
      flushAll() {
        prefetchedRequests.removeAll();
      }
      flushByCacheTags(tags) {
        prefetchedRequests.removeByTags(Array.isArray(tags) ? tags : [tags]);
      }
      getPrefetching(href, options = {}) {
        return prefetchedRequests.findInFlight(this.getPrefetchParams(href, options));
      }
      prefetch(href, options = {}, prefetchOptions = {}) {
        const method = options.method ?? (isUrlMethodPair(href) ? href.method : "get");
        if (method !== "get") {
          throw new Error("Prefetch requests must use the GET method");
        }
        const visit2 = this.getPendingVisit(href, {
          ...options,
          async: true,
          showProgress: false,
          prefetch: true,
          viewTransition: false
        });
        const visitUrl = visit2.url.origin + visit2.url.pathname + visit2.url.search;
        const currentUrl = window.location.origin + window.location.pathname + window.location.search;
        if (visitUrl === currentUrl) {
          return;
        }
        const events = this.getVisitEvents(options);
        if (events.onBefore(visit2) === false || !fireBeforeEvent(visit2)) {
          return;
        }
        progress.hide();
        this.asyncRequestStream.interruptInFlight();
        const requestParams = {
          ...visit2,
          ...events
        };
        const ensureCurrentPageIsSet = () => {
          return new Promise((resolve) => {
            const checkIfPageIsDefined = () => {
              if (page$1.get()) {
                resolve();
              } else {
                setTimeout(checkIfPageIsDefined, 50);
              }
            };
            checkIfPageIsDefined();
          });
        };
        ensureCurrentPageIsSet().then(() => {
          prefetchedRequests.add(
            requestParams,
            (params) => {
              this.asyncRequestStream.send(Request.create(params, page$1.get()));
            },
            {
              cacheFor: config$1.get("prefetch.cacheFor"),
              cacheTags: [],
              ...prefetchOptions
            }
          );
        });
      }
      clearHistory() {
        history.clear();
      }
      decryptHistory() {
        return history.decrypt();
      }
      resolveComponent(component2) {
        return page$1.resolve(component2);
      }
      replace(params) {
        this.clientVisit(params, { replace: true });
      }
      replaceProp(name, value, options) {
        this.replace({
          preserveScroll: true,
          preserveState: true,
          props(currentProps) {
            const newValue = typeof value === "function" ? value(get$1(currentProps, name), currentProps) : value;
            return set$1(cloneDeep(currentProps), name, newValue);
          },
          ...options || {}
        });
      }
      appendToProp(name, value, options) {
        this.replaceProp(
          name,
          (currentValue, currentProps) => {
            const newValue = typeof value === "function" ? value(currentValue, currentProps) : value;
            if (!Array.isArray(currentValue)) {
              currentValue = currentValue !== void 0 ? [currentValue] : [];
            }
            return [...currentValue, newValue];
          },
          options
        );
      }
      prependToProp(name, value, options) {
        this.replaceProp(
          name,
          (currentValue, currentProps) => {
            const newValue = typeof value === "function" ? value(currentValue, currentProps) : value;
            if (!Array.isArray(currentValue)) {
              currentValue = currentValue !== void 0 ? [currentValue] : [];
            }
            return [newValue, ...currentValue];
          },
          options
        );
      }
      push(params) {
        this.clientVisit(params);
      }
      flash(keyOrData, value) {
        const current = page$1.get().flash;
        let flash;
        if (typeof keyOrData === "function") {
          flash = keyOrData(current);
        } else if (typeof keyOrData === "string") {
          flash = { ...current, [keyOrData]: value };
        } else if (keyOrData && Object.keys(keyOrData).length) {
          flash = { ...current, ...keyOrData };
        } else {
          return;
        }
        page$1.setFlash(flash);
        if (Object.keys(flash).length) {
          fireFlashEvent(flash);
        }
      }
      clientVisit(params, { replace: replace2 = false } = {}) {
        this.clientVisitQueue.add(() => this.performClientVisit(params, { replace: replace2 }));
      }
      performClientVisit(params, { replace: replace2 = false } = {}) {
        const current = page$1.get();
        const onceProps = typeof params.props === "function" ? Object.fromEntries(
          Object.values(current.onceProps ?? {}).map((onceProp) => [onceProp.prop, current.props[onceProp.prop]])
        ) : {};
        const props = typeof params.props === "function" ? params.props(current.props, onceProps) : params.props ?? current.props;
        const flash = typeof params.flash === "function" ? params.flash(current.flash) : params.flash;
        const { viewTransition, onError, onFinish, onFlash, onSuccess, ...pageParams } = params;
        const page2 = {
          ...current,
          ...pageParams,
          flash: flash ?? {},
          props
        };
        const preserveScroll = RequestParams.resolvePreserveOption(params.preserveScroll ?? false, page2);
        const preserveState = RequestParams.resolvePreserveOption(params.preserveState ?? false, page2);
        return page$1.set(page2, {
          replace: replace2,
          preserveScroll,
          preserveState,
          viewTransition
        }).then(() => {
          const currentFlash = page$1.get().flash;
          if (Object.keys(currentFlash).length > 0) {
            fireFlashEvent(currentFlash);
            onFlash?.(currentFlash);
          }
          const errors = page$1.get().props.errors || {};
          if (Object.keys(errors).length === 0) {
            onSuccess?.(page$1.get());
            return;
          }
          const scopedErrors = params.errorBag ? errors[params.errorBag || ""] || {} : errors;
          onError?.(scopedErrors);
        }).finally(() => onFinish?.(params));
      }
      getPrefetchParams(href, options) {
        return {
          ...this.getPendingVisit(href, {
            ...options,
            async: true,
            showProgress: false,
            prefetch: true,
            viewTransition: false
          }),
          ...this.getVisitEvents(options)
        };
      }
      getPendingVisit(href, options, pendingVisitOptions = {}) {
        if (isUrlMethodPair(href)) {
          const urlMethodPair = href;
          href = urlMethodPair.url;
          options.method = options.method ?? urlMethodPair.method;
        }
        const defaultVisitOptionsCallback = config$1.get("visitOptions");
        const configuredOptions = defaultVisitOptionsCallback ? defaultVisitOptionsCallback(href.toString(), cloneDeep(options)) || {} : {};
        const mergedOptions = {
          method: "get",
          data: {},
          replace: false,
          preserveScroll: false,
          preserveState: false,
          only: [],
          except: [],
          headers: {},
          errorBag: "",
          forceFormData: false,
          queryStringArrayFormat: "brackets",
          async: false,
          showProgress: true,
          fresh: false,
          reset: [],
          preserveUrl: false,
          prefetch: false,
          invalidateCacheTags: [],
          viewTransition: false,
          ...options,
          ...configuredOptions
        };
        const [url, _data] = transformUrlAndData(
          href,
          mergedOptions.data,
          mergedOptions.method,
          mergedOptions.forceFormData,
          mergedOptions.queryStringArrayFormat
        );
        const visit2 = {
          cancelled: false,
          completed: false,
          interrupted: false,
          ...mergedOptions,
          ...pendingVisitOptions,
          url,
          data: _data
        };
        if (visit2.prefetch) {
          visit2.headers["Purpose"] = "prefetch";
        }
        return visit2;
      }
      getVisitEvents(options) {
        return {
          onCancelToken: options.onCancelToken || (() => {
          }),
          onBefore: options.onBefore || (() => {
          }),
          onBeforeUpdate: options.onBeforeUpdate || (() => {
          }),
          onStart: options.onStart || (() => {
          }),
          onProgress: options.onProgress || (() => {
          }),
          onFinish: options.onFinish || (() => {
          }),
          onCancel: options.onCancel || (() => {
          }),
          onSuccess: options.onSuccess || (() => {
          }),
          onError: options.onError || (() => {
          }),
          onFlash: options.onFlash || (() => {
          }),
          onPrefetched: options.onPrefetched || (() => {
          }),
          onPrefetching: options.onPrefetching || (() => {
          })
        };
      }
      loadDeferredProps(deferred2) {
        if (deferred2) {
          Object.entries(deferred2).forEach(([_, group]) => {
            this.doReload({ only: group, deferredProps: true });
          });
        }
      }
    };
    function isContentEditableOrPrevented(event2) {
      return event2.target instanceof HTMLElement && event2.target.isContentEditable || event2.defaultPrevented;
    }
    function shouldIntercept(event2) {
      const isLink = event2.currentTarget.tagName.toLowerCase() === "a";
      return !(isContentEditableOrPrevented(event2) || isLink && event2.altKey || isLink && event2.ctrlKey || isLink && event2.metaKey || isLink && event2.shiftKey || isLink && "button" in event2 && event2.button !== 0);
    }
    function shouldNavigate(event2) {
      const isButton = event2.currentTarget.tagName.toLowerCase() === "button";
      return !isContentEditableOrPrevented(event2) && (event2.key === "Enter" || isButton && event2.key === " ");
    }
    var baseComponentSelector = "nprogress";
    var progress2;
    var settings = {
      minimum: 0.08,
      easing: "linear",
      positionUsing: "translate3d",
      speed: 200,
      trickle: true,
      trickleSpeed: 200,
      showSpinner: true,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      color: "#29d",
      includeCSS: true,
      template: [
        '<div class="bar" role="bar">',
        '<div class="peg"></div>',
        "</div>",
        '<div class="spinner" role="spinner">',
        '<div class="spinner-icon"></div>',
        "</div>"
      ].join("")
    };
    var status = null;
    var configure = (options) => {
      Object.assign(settings, options);
      if (settings.includeCSS) {
        injectCSS(settings.color);
      }
      progress2 = document.createElement("div");
      progress2.id = baseComponentSelector;
      progress2.innerHTML = settings.template;
    };
    var set5 = (n) => {
      const started = isStarted();
      n = clamp(n, settings.minimum, 1);
      status = n === 1 ? null : n;
      const progress3 = render(!started);
      const bar = progress3.querySelector(settings.barSelector);
      const speed = settings.speed;
      const ease = settings.easing;
      progress3.offsetWidth;
      queue4((next2) => {
        const barStyles = (() => {
          if (settings.positionUsing === "translate3d") {
            return {
              transition: `all ${speed}ms ${ease}`,
              transform: `translate3d(${toBarPercentage(n)}%,0,0)`
            };
          }
          if (settings.positionUsing === "translate") {
            return {
              transition: `all ${speed}ms ${ease}`,
              transform: `translate(${toBarPercentage(n)}%,0)`
            };
          }
          return { marginLeft: `${toBarPercentage(n)}%` };
        })();
        for (const key2 in barStyles) {
          bar.style[key2] = barStyles[key2];
        }
        if (n !== 1) {
          return setTimeout(next2, speed);
        }
        progress3.style.transition = "none";
        progress3.style.opacity = "1";
        progress3.offsetWidth;
        setTimeout(() => {
          progress3.style.transition = `all ${speed}ms linear`;
          progress3.style.opacity = "0";
          setTimeout(() => {
            remove$2();
            progress3.style.transition = "";
            progress3.style.opacity = "";
            next2();
          }, speed);
        }, speed);
      });
    };
    var isStarted = () => typeof status === "number";
    var start = () => {
      if (!status) {
        set5(0);
      }
      const work = function() {
        setTimeout(function() {
          if (!status) {
            return;
          }
          increaseByRandom();
          work();
        }, settings.trickleSpeed);
      };
      if (settings.trickle) {
        work();
      }
    };
    var done = (force) => {
      if (!force && !status) {
        return;
      }
      increaseByRandom(0.3 + 0.5 * Math.random());
      set5(1);
    };
    var increaseByRandom = (amount) => {
      const n = status;
      if (n === null) {
        return start();
      }
      if (n > 1) {
        return;
      }
      amount = typeof amount === "number" ? amount : (() => {
        const ranges = {
          0.1: [0, 0.2],
          0.04: [0.2, 0.5],
          0.02: [0.5, 0.8],
          5e-3: [0.8, 0.99]
        };
        for (const r2 in ranges) {
          if (n >= ranges[r2][0] && n < ranges[r2][1]) {
            return parseFloat(r2);
          }
        }
        return 0;
      })();
      return set5(clamp(n + amount, 0, 0.994));
    };
    var render = (fromStart) => {
      if (isRendered()) {
        return document.getElementById(baseComponentSelector);
      }
      document.documentElement.classList.add(`${baseComponentSelector}-busy`);
      const bar = progress2.querySelector(settings.barSelector);
      const perc = fromStart ? "-100" : toBarPercentage(status || 0);
      const parent = getParent();
      bar.style.transition = "all 0 linear";
      bar.style.transform = `translate3d(${perc}%,0,0)`;
      if (!settings.showSpinner) {
        progress2.querySelector(settings.spinnerSelector)?.remove();
      }
      if (parent !== document.body) {
        parent.classList.add(`${baseComponentSelector}-custom-parent`);
      }
      parent.appendChild(progress2);
      return progress2;
    };
    var getParent = () => {
      return isDOM(settings.parent) ? settings.parent : document.querySelector(settings.parent);
    };
    var remove$2 = () => {
      document.documentElement.classList.remove(`${baseComponentSelector}-busy`);
      getParent().classList.remove(`${baseComponentSelector}-custom-parent`);
      progress2?.remove();
    };
    var isRendered = () => {
      return document.getElementById(baseComponentSelector) !== null;
    };
    var isDOM = (obj) => {
      if (typeof HTMLElement === "object") {
        return obj instanceof HTMLElement;
      }
      return obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string";
    };
    function clamp(n, min2, max2) {
      if (n < min2) {
        return min2;
      }
      if (n > max2) {
        return max2;
      }
      return n;
    }
    var toBarPercentage = (n) => (-1 + n) * 100;
    var queue4 = /* @__PURE__ */ (() => {
      const pending = [];
      const next2 = () => {
        const fn = pending.shift();
        if (fn) {
          fn(next2);
        }
      };
      return (fn) => {
        pending.push(fn);
        if (pending.length === 1) {
          next2();
        }
      };
    })();
    var injectCSS = (color) => {
      const element2 = document.createElement("style");
      element2.textContent = `
    #${baseComponentSelector} {
      pointer-events: none;
    }

    #${baseComponentSelector} .bar {
      background: ${color};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    #${baseComponentSelector} .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
      opacity: 1.0;

      transform: rotate(3deg) translate(0px, -4px);
    }

    #${baseComponentSelector} .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #${baseComponentSelector} .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${color};
      border-left-color: ${color};
      border-radius: 50%;

      animation: ${baseComponentSelector}-spinner 400ms linear infinite;
    }

    .${baseComponentSelector}-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .${baseComponentSelector}-custom-parent #${baseComponentSelector} .spinner,
    .${baseComponentSelector}-custom-parent #${baseComponentSelector} .bar {
      position: absolute;
    }

    @keyframes ${baseComponentSelector}-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
      document.head.appendChild(element2);
    };
    var show = () => {
      if (progress2) {
        progress2.style.display = "";
      }
    };
    var hide = () => {
      if (progress2) {
        progress2.style.display = "none";
      }
    };
    var progress_component_default = {
      configure,
      isStarted,
      done,
      set: set5,
      remove: remove$2,
      start,
      status,
      show,
      hide
    };
    var Progress = class {
      constructor() {
        this.hideCount = 0;
      }
      start() {
        progress_component_default.start();
      }
      reveal(force = false) {
        this.hideCount = Math.max(0, this.hideCount - 1);
        if (force || this.hideCount === 0) {
          progress_component_default.show();
        }
      }
      hide() {
        this.hideCount++;
        progress_component_default.hide();
      }
      set(status2) {
        progress_component_default.set(Math.max(0, Math.min(1, status2)));
      }
      finish() {
        progress_component_default.done();
      }
      reset() {
        progress_component_default.set(0);
      }
      remove() {
        progress_component_default.done();
        progress_component_default.remove();
      }
      isStarted() {
        return progress_component_default.isStarted();
      }
      getStatus() {
        return progress_component_default.status;
      }
    };
    var progress = new Progress();
    progress.reveal;
    progress.hide;
    function addEventListeners(delay) {
      document.addEventListener("inertia:start", (e) => handleStartEvent(e, delay));
      document.addEventListener("inertia:progress", handleProgressEvent);
    }
    function handleStartEvent(event2, delay) {
      if (!event2.detail.visit.showProgress) {
        progress.hide();
      }
      const timeout = setTimeout(() => progress.start(), delay);
      document.addEventListener("inertia:finish", (e) => finish(e, timeout), { once: true });
    }
    function handleProgressEvent(event2) {
      if (progress.isStarted() && event2.detail.progress?.percentage) {
        progress.set(Math.max(progress.getStatus(), event2.detail.progress.percentage / 100 * 0.9));
      }
    }
    function finish(event2, timeout) {
      clearTimeout(timeout);
      if (!progress.isStarted()) {
        return;
      }
      if (event2.detail.visit.completed) {
        progress.finish();
      } else if (event2.detail.visit.interrupted) {
        progress.reset();
      } else if (event2.detail.visit.cancelled) {
        progress.remove();
      }
    }
    function setupProgress({
      delay = 250,
      color = "#29d",
      includeCSS = true,
      showSpinner = false
    } = {}) {
      addEventListeners(delay);
      progress_component_default.configure({ showSpinner, includeCSS, color });
    }
    var router = new Router();
    const h = (component2, propsOrChildren, childrenOrKey, key2 = null) => {
      const hasProps = typeof propsOrChildren === "object" && propsOrChildren !== null && !Array.isArray(propsOrChildren);
      return {
        component: component2,
        key: hasProps ? key2 : typeof childrenOrKey === "number" ? childrenOrKey : null,
        props: hasProps ? propsOrChildren : {},
        children: hasProps ? Array.isArray(childrenOrKey) ? childrenOrKey : childrenOrKey !== null ? [childrenOrKey] : [] : Array.isArray(propsOrChildren) ? propsOrChildren : propsOrChildren !== null ? [propsOrChildren] : []
      };
    };
    function Render($$anchor, $$props) {
      push($$props, false);
      let component$1 = prop($$props, "component", 8);
      let props = prop($$props, "props", 24, () => ({}));
      let children = prop($$props, "children", 24, () => []);
      let key$1 = prop($$props, "key", 8, null);
      init();
      var fragment = comment();
      var node = first_child(fragment);
      {
        var consequent_1 = ($$anchor2) => {
          var fragment_1 = comment();
          var node_1 = first_child(fragment_1);
          key(
            node_1,
            () => (deep_read_state(children()), deep_read_state(key$1()), untrack(() => children()?.length === 0 ? key$1() : null)),
            ($$anchor3) => {
              var fragment_2 = comment();
              var node_2 = first_child(fragment_2);
              {
                var consequent = ($$anchor4) => {
                  var fragment_3 = comment();
                  var node_3 = first_child(fragment_3);
                  component(node_3, component$1, ($$anchor5, $$component) => {
                    $$component($$anchor5, spread_props(props, {
                      children: ($$anchor6, $$slotProps) => {
                        var fragment_4 = comment();
                        var node_4 = first_child(fragment_4);
                        each(node_4, 1, children, index, ($$anchor7, child2) => {
                          var fragment_5 = comment();
                          var node_5 = first_child(fragment_5);
                          Render(node_5, spread_props(() => get$3(child2)));
                          append$1($$anchor7, fragment_5);
                        });
                        append$1($$anchor6, fragment_4);
                      },
                      $$slots: { default: true }
                    }));
                  });
                  append$1($$anchor4, fragment_3);
                };
                var alternate = ($$anchor4) => {
                  var fragment_6 = comment();
                  var node_6 = first_child(fragment_6);
                  component(node_6, component$1, ($$anchor5, $$component) => {
                    $$component($$anchor5, spread_props(props));
                  });
                  append$1($$anchor4, fragment_6);
                };
                if_block(node_2, ($$render) => {
                  if (deep_read_state(children()), untrack(() => children().length > 0)) $$render(consequent);
                  else $$render(alternate, false);
                });
              }
              append$1($$anchor3, fragment_2);
            }
          );
          append$1($$anchor2, fragment_1);
        };
        if_block(node, ($$render) => {
          if (component$1()) $$render(consequent_1);
        });
      }
      append$1($$anchor, fragment);
      pop();
    }
    const { set, subscribe } = writable();
    const setPage = set;
    const page = { subscribe };
    function App$1($$anchor, $$props) {
      push($$props, false);
      let initialComponent = prop($$props, "initialComponent", 8);
      let initialPage = prop($$props, "initialPage", 8);
      let resolveComponent = prop($$props, "resolveComponent", 8);
      let component2 = initialComponent();
      let key2 = null;
      let page2 = { ...initialPage(), flash: initialPage().flash ?? {} };
      let renderProps = /* @__PURE__ */ mutable_source(resolveRenderProps(component2, page2, key2));
      setPage(page2);
      const isServer3 = typeof window === "undefined";
      if (!isServer3) {
        router.init({
          initialPage: initialPage(),
          resolveComponent: resolveComponent(),
          swapComponent: async (args) => {
            component2 = args.component;
            page2 = args.page;
            key2 = args.preserveState ? key2 : Date.now();
            set$2(renderProps, resolveRenderProps(component2, page2, key2));
            setPage(page2);
          },
          onFlash: (flash) => {
            page2 = { ...page2, flash };
            setPage(page2);
          }
        });
      }
      function resolveRenderProps(component22, page22, key22 = null) {
        const child2 = h(component22.default, page22.props, [], key22);
        const layout = component22.layout;
        return layout ? resolveLayout(layout, child2, page22.props, key22) : child2;
      }
      function resolveLayout(layout, child2, pageProps, key22) {
        if (isLayoutFunction(layout)) {
          return layout(h, child2);
        }
        if (Array.isArray(layout)) {
          return layout.slice().reverse().reduce((currentRender, layoutComponent) => h(layoutComponent, pageProps, [currentRender], key22), child2);
        }
        return h(layout, pageProps, child2 ? [child2] : [], key22);
      }
      function isLayoutFunction(layout) {
        return typeof layout === "function" && layout.length === 2 && typeof layout.prototype === "undefined";
      }
      init();
      Render($$anchor, spread_props(() => get$3(renderProps)));
      pop();
    }
    axios.create();
    function Link($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const $$restProps = legacy_rest_props($$sanitized_props, [
        "href",
        "as",
        "data",
        "method",
        "replace",
        "preserveScroll",
        "preserveState",
        "preserveUrl",
        "only",
        "except",
        "headers",
        "queryStringArrayFormat",
        "async",
        "prefetch",
        "cacheFor",
        "cacheTags",
        "viewTransition"
      ]);
      push($$props, false);
      const _method = /* @__PURE__ */ mutable_source();
      const _href = /* @__PURE__ */ mutable_source();
      const asProp = /* @__PURE__ */ mutable_source();
      const elProps = /* @__PURE__ */ mutable_source();
      let href = prop($$props, "href", 8, "");
      let as = prop($$props, "as", 8, "a");
      let data = prop($$props, "data", 24, () => ({}));
      let method = prop($$props, "method", 8, "get");
      let replace2 = prop($$props, "replace", 8, false);
      let preserveScroll = prop($$props, "preserveScroll", 8, false);
      let preserveState = prop($$props, "preserveState", 8, null);
      let preserveUrl = prop($$props, "preserveUrl", 8, false);
      let only = prop($$props, "only", 24, () => []);
      let except = prop($$props, "except", 24, () => []);
      let headers = prop($$props, "headers", 24, () => ({}));
      let queryStringArrayFormat = prop($$props, "queryStringArrayFormat", 8, "brackets");
      let async = prop($$props, "async", 8, false);
      let prefetch = prop($$props, "prefetch", 8, false);
      let cacheFor = prop($$props, "cacheFor", 8, 0);
      let cacheTags = prop($$props, "cacheTags", 24, () => []);
      let viewTransition = prop($$props, "viewTransition", 8, false);
      legacy_pre_effect(
        () => (deep_read_state(href()), deep_read_state(method())),
        () => {
          set$2(_method, isUrlMethodPair(href()) ? href().method : method());
        }
      );
      legacy_pre_effect(() => deep_read_state(href()), () => {
        set$2(_href, isUrlMethodPair(href()) ? href().url : href());
      });
      legacy_pre_effect(() => (get$3(_method), deep_read_state(as())), () => {
        set$2(asProp, get$3(_method) !== "get" ? "button" : as().toLowerCase());
      });
      legacy_pre_effect(() => (get$3(_href), get$3(asProp)), () => {
        set$2(elProps, { a: { href: get$3(_href) }, button: { type: "button" } }[get$3(asProp)] || {});
      });
      legacy_pre_effect_reset();
      init();
      var fragment = comment();
      var node = first_child(fragment);
      element(node, () => get$3(asProp), false, ($$element, $$anchor2) => {
        action($$element, ($$node, $$action_arg) => link?.($$node, $$action_arg), () => ({
          ...get$3(asProp) !== "a" ? { href: get$3(_href) } : {},
          data: data(),
          method: get$3(_method),
          replace: replace2(),
          preserveScroll: preserveScroll(),
          preserveState: preserveState() ?? get$3(_method) !== "get",
          preserveUrl: preserveUrl(),
          only: only(),
          except: except(),
          headers: headers(),
          queryStringArrayFormat: queryStringArrayFormat(),
          async: async(),
          prefetch: prefetch(),
          cacheFor: cacheFor(),
          cacheTags: cacheTags(),
          viewTransition: viewTransition()
        }));
        attribute_effect($$element, () => ({ ...$$restProps, ...get$3(elProps) }));
        event("focus", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("blur", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("click", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("dblclick", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("mousedown", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("mousemove", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("mouseout", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("mouseover", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("mouseup", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("cancel-token", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("before", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("start", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("progress", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("finish", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("cancel", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("success", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("error", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("prefetching", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        event("prefetched", $$element, function($$arg) {
          bubble_event.call(this, $$props, $$arg);
        });
        var fragment_1 = comment();
        var node_1 = first_child(fragment_1);
        slot(node_1, $$props, "default", {});
        append$1($$anchor2, fragment_1);
      });
      append$1($$anchor, fragment);
      pop();
    }
    async function createInertiaApp({ id = "app", resolve, setup: setup2, progress: progress3 = {}, page: page2, defaults: defaults2 = {} }) {
      config.replace(defaults2);
      const isServer3 = typeof window === "undefined";
      const useScriptElementForInitialPage = config.get("future.useScriptElementForInitialPage");
      const initialPage = page2 || getInitialPageFromDOM(id, useScriptElementForInitialPage);
      const resolveComponent = (name) => Promise.resolve(resolve(name));
      const svelteApp = await Promise.all([
        resolveComponent(initialPage.component),
        router.decryptHistory().catch(() => {
        })
      ]).then(([initialComponent]) => {
        return setup2({
          el: isServer3 ? null : document.getElementById(id),
          App: App$1,
          props: { initialPage, initialComponent, resolveComponent }
        });
      });
      if (isServer3 && svelteApp) {
        const { html: html2, head, css: css2 } = svelteApp;
        return {
          body: useScriptElementForInitialPage ? `<script data-page="${id}" type="application/json">${JSON.stringify(initialPage).replace(/\//g, "\\/")}<\/script><div data-server-rendered="true" id="${id}">${html2}</div>` : `<div data-server-rendered="true" id="${id}" data-page="${escape$1(JSON.stringify(initialPage))}">${html2}</div>`,
          head: [head, css2 ? `<style data-vite-css>${css2.code}</style>` : ""]
        };
      }
      if (!isServer3 && progress3) {
        setupProgress(progress3);
      }
    }
    function link(node, initialParams = {}) {
      let inFlightCount = 0;
      let hoverTimeout;
      let prefetchModes = [];
      let cacheForValue;
      let cacheTags = [];
      let method;
      let href;
      let data;
      let baseParams;
      let visitParams;
      const regularEvents = {
        click: (event2) => {
          if (shouldIntercept(event2)) {
            event2.preventDefault();
            router.visit(href, visitParams);
          }
        }
      };
      const prefetchHoverEvents = {
        mouseenter: () => hoverTimeout = setTimeout(() => prefetch(), config.get("prefetch.hoverDelay")),
        mouseleave: () => clearTimeout(hoverTimeout),
        click: regularEvents.click
      };
      const prefetchClickEvents = {
        mousedown: (event2) => {
          if (shouldIntercept(event2)) {
            event2.preventDefault();
            prefetch();
          }
        },
        keydown: (event2) => {
          if (shouldNavigate(event2)) {
            event2.preventDefault();
            prefetch();
          }
        },
        mouseup: (event2) => {
          if (shouldIntercept(event2)) {
            event2.preventDefault();
            router.visit(href, visitParams);
          }
        },
        keyup: (event2) => {
          if (shouldNavigate(event2)) {
            event2.preventDefault();
            router.visit(href, visitParams);
          }
        },
        click: (event2) => {
          if (shouldIntercept(event2)) {
            event2.preventDefault();
          }
        }
      };
      function update2({ cacheFor = 0, prefetch: prefetch2 = false, cacheTags: cacheTagValues = [], viewTransition = false, ...params }) {
        prefetchModes = (() => {
          if (prefetch2 === true) {
            return ["hover"];
          }
          if (prefetch2 === false) {
            return [];
          }
          return Array.isArray(prefetch2) ? prefetch2 : [prefetch2];
        })();
        cacheForValue = (() => {
          if (cacheFor !== 0) {
            return cacheFor;
          }
          if (prefetchModes.length === 1 && prefetchModes[0] === "click") {
            return 0;
          }
          return config.get("prefetch.cacheFor");
        })();
        cacheTags = Array.isArray(cacheTagValues) ? cacheTagValues : [cacheTagValues];
        method = isUrlMethodPair(params.href) ? params.href.method : params.method?.toLowerCase() || "get";
        [href, data] = hrefAndData(method, params);
        if (node.tagName === "A") {
          node.href = href;
        }
        baseParams = {
          data,
          method,
          replace: params.replace || false,
          preserveScroll: params.preserveScroll || false,
          preserveState: params.preserveState ?? method !== "get",
          preserveUrl: params.preserveUrl || false,
          only: params.only || [],
          except: params.except || [],
          headers: params.headers || {},
          async: params.async || false
        };
        visitParams = {
          ...baseParams,
          viewTransition,
          onStart: (visit2) => {
            inFlightCount++;
            updateNodeAttributes();
            return dispatchEvent("start", { detail: { visit: visit2 } });
          },
          onProgress: (progress3) => dispatchEvent("progress", { detail: { progress: progress3 } }),
          onFinish: (visit2) => {
            inFlightCount--;
            updateNodeAttributes();
            return dispatchEvent("finish", { detail: { visit: visit2 } });
          },
          onBefore: (visit2) => dispatchEvent("before", { cancelable: true, detail: { visit: visit2 } }),
          onCancel: () => dispatchEvent("cancel"),
          onSuccess: (page2) => dispatchEvent("success", { detail: { page: page2 } }),
          onError: (errors) => dispatchEvent("error", { detail: { errors } }),
          onCancelToken: (token) => dispatchEvent("cancel-token", { detail: { token } }),
          onPrefetching: (visit2) => dispatchEvent("prefetching", { detail: { visit: visit2 } }),
          onPrefetched: (response, visit2) => dispatchEvent("prefetched", { detail: { response, visit: visit2 } })
        };
        updateEventListeners();
      }
      function dispatchEvent(type2, detail = {}) {
        return node.dispatchEvent(new CustomEvent(type2, detail));
      }
      function hrefAndData(method2, params) {
        return mergeDataIntoQueryString(method2, isUrlMethodPair(params.href) ? params.href.url : node.href || params.href || "", params.data || {}, params.queryStringArrayFormat || "brackets");
      }
      function prefetch() {
        router.prefetch(href, {
          ...baseParams,
          onPrefetching: (visit2) => dispatchEvent("prefetching", { detail: { visit: visit2 } }),
          onPrefetched: (response, visit2) => dispatchEvent("prefetched", { detail: { response, visit: visit2 } })
        }, { cacheFor: cacheForValue, cacheTags });
      }
      function updateNodeAttributes() {
        if (inFlightCount > 0) {
          node.setAttribute("data-loading", "");
          return;
        }
        node.removeAttribute("data-loading");
      }
      function updateEventListeners() {
        removeEventListeners();
        if (prefetchModes.includes("hover")) {
          addEventListeners2(prefetchHoverEvents);
          return;
        }
        if (prefetchModes.includes("click")) {
          addEventListeners2(prefetchClickEvents);
          return;
        }
        addEventListeners2(regularEvents);
      }
      function addEventListeners2(eventHandlers) {
        Object.entries(eventHandlers).forEach(([event2, handler]) => {
          node.addEventListener(event2, handler);
        });
      }
      function removeEventListeners() {
        [prefetchHoverEvents, prefetchClickEvents, regularEvents].forEach((eventHandlers) => {
          Object.entries(eventHandlers).forEach(([event2, handler]) => {
            node.removeEventListener(event2, handler);
          });
        });
      }
      function destroy() {
        clearTimeout(hoverTimeout);
        removeEventListeners();
      }
      update2(initialParams);
      if (prefetchModes.includes("mount")) {
        prefetch();
      }
      return { update: update2, destroy };
    }
    const config = config$1.extend({});
    var root_1$6 = /* @__PURE__ */ from_html(`<i data-component="icon" class="icon"><!></i>`);
    function Icon$1($$anchor, $$props) {
      const IconSvg = prop($$props, "svg", 3, null), size = prop($$props, "size", 3, "md"), props = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "svg", "size"]);
      const defaultProps = { size: 16, strokeWidth: 1, absoluteStrokeWidth: true };
      var fragment = comment();
      var node = first_child(fragment);
      {
        var consequent = ($$anchor2) => {
          var i = root_1$6();
          var node_1 = child(i);
          component(node_1, IconSvg, ($$anchor3, IconSvg_1) => {
            IconSvg_1($$anchor3, spread_props(() => defaultProps, () => props));
          });
          template_effect(() => set_attribute(i, "data-size", size()));
          append$1($$anchor2, i);
        };
        if_block(node, ($$render) => {
          if (IconSvg()) $$render(consequent);
        });
      }
      append$1($$anchor, fragment);
    }
    var root_1$5 = /* @__PURE__ */ from_html(`<span data-role="button:content"><!> <!></span>`);
    function Button($$anchor, $$props) {
      var fragment = comment();
      var node = first_child(fragment);
      element(node, () => $$props.href ? "a" : "button", false, ($$element, $$anchor2) => {
        action($$element, ($$node) => link?.($$node));
        attribute_effect($$element, () => ({
          "data-component": "button",
          class: "button",
          "data-size": $$props.size
        }));
        var span = root_1$5();
        var node_1 = child(span);
        {
          var consequent = ($$anchor3) => {
            Icon$1($$anchor3, {
              get svg() {
                return $$props.icon;
              },
              get size() {
                return $$props.size;
              }
            });
          };
          if_block(node_1, ($$render) => {
            if ($$props.icon) $$render(consequent);
          });
        }
        var node_2 = sibling(node_1, 2);
        snippet(node_2, () => $$props.children);
        append$1($$anchor2, span);
      });
      append$1($$anchor, fragment);
    }
    var root$b = /* @__PURE__ */ from_html(`<div data-component="button-group"><!></div>`);
    function Button_group($$anchor, $$props) {
      let size = prop($$props, "size", 3, "md");
      var div = root$b();
      var node = child(div);
      snippet(node, () => $$props.children);
      template_effect(() => set_attribute(div, "data-size", size()));
      append$1($$anchor, div);
    }
    var root_2$2 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
    var root$a = /* @__PURE__ */ from_html(`<div data-component="splitter"><!></div>`);
    function Splitter_1($$anchor, $$props) {
      push($$props, true);
      let panel = prop($$props, "panel", 3, null), orientation = prop($$props, "orientation", 3, "horizontal"), panelSnippets = /* @__PURE__ */ rest_props($$props, [
        "$$slots",
        "$$events",
        "$$legacy",
        "id",
        "defaultSize",
        "panels",
        "panel",
        "orientation"
      ]);
      const createSplitterState = () => new PersistedState(`splitter:${$$props.id}`, { orientation: orientation(), size: [] });
      createSplitterState();
      var div = root$a();
      var node = child(div);
      component(node, () => Splitter_root, ($$anchor2, Splitter_Root) => {
        Splitter_Root($$anchor2, {
          get defaultSize() {
            return $$props.defaultSize;
          },
          get panels() {
            return $$props.panels;
          },
          get orientation() {
            return orientation();
          },
          "data-role": "splitter:root",
          children: ($$anchor3, $$slotProps) => {
            var fragment = comment();
            var node_1 = first_child(fragment);
            each(node_1, 19, () => $$props.panels, (panelData) => panelData.id, ($$anchor4, panelData, index2) => {
              var fragment_1 = root_2$2();
              var node_2 = first_child(fragment_1);
              {
                var consequent = ($$anchor5) => {
                  var fragment_2 = comment();
                  var node_3 = first_child(fragment_2);
                  {
                    let $0 = /* @__PURE__ */ user_derived(() => `${$$props.panels[get$3(index2) - 1].id}:${get$3(panelData).id}`);
                    component(node_3, () => Splitter_resize_trigger, ($$anchor6, Splitter_ResizeTrigger) => {
                      Splitter_ResizeTrigger($$anchor6, {
                        get id() {
                          return get$3($0);
                        },
                        "aria-label": "Resize",
                        "data-role": "splitter:resize-trigger"
                      });
                    });
                  }
                  append$1($$anchor5, fragment_2);
                };
                if_block(node_2, ($$render) => {
                  if (get$3(index2) > 0) $$render(consequent);
                });
              }
              var node_4 = sibling(node_2, 2);
              component(node_4, () => Splitter_panel, ($$anchor5, Splitter_Panel) => {
                Splitter_Panel($$anchor5, {
                  get id() {
                    return get$3(panelData).id;
                  },
                  "data-role": "splitter:panel",
                  children: ($$anchor6, $$slotProps2) => {
                    const panelSnippet = /* @__PURE__ */ user_derived(() => panelSnippets[get$3(panelData).id]);
                    var fragment_3 = comment();
                    var node_5 = first_child(fragment_3);
                    {
                      var consequent_1 = ($$anchor7) => {
                        var fragment_4 = comment();
                        var node_6 = first_child(fragment_4);
                        snippet(node_6, () => get$3(panelSnippet), () => get$3(panelData));
                        append$1($$anchor7, fragment_4);
                      };
                      var alternate = ($$anchor7) => {
                        var fragment_5 = comment();
                        var node_7 = first_child(fragment_5);
                        snippet(node_7, panel, () => get$3(panelData));
                        append$1($$anchor7, fragment_5);
                      };
                      if_block(node_5, ($$render) => {
                        if (get$3(panelSnippet)) $$render(consequent_1);
                        else $$render(alternate, false);
                      });
                    }
                    append$1($$anchor6, fragment_3);
                  },
                  $$slots: { default: true }
                });
              });
              append$1($$anchor4, fragment_1);
            });
            append$1($$anchor3, fragment);
          },
          $$slots: { default: true }
        });
      });
      append$1($$anchor, div);
      pop();
    }
    var root_1$4 = /* @__PURE__ */ from_html(`<code data-role="snippet:code"><pre><!></pre></code>`);
    function Snippet($$anchor, $$props) {
      let theme = prop($$props, "theme", 3, "github-light"), output = prop($$props, "output", 3, false);
      var fragment = comment();
      var node = first_child(fragment);
      element(node, () => output() ? "output" : "div", false, ($$element, $$anchor2) => {
        attribute_effect(
          $$element,
          () => ({
            "data-component": "snippet",
            role: "region",
            "aria-live": "polite",
            "aria-roledescription": "code block",
            class: ""
          }),
          void 0,
          void 0,
          void 0,
          "svelte-1ba9mvy"
        );
        var code = root_1$4();
        var pre = child(code);
        var node_1 = child(pre);
        snippet(node_1, () => $$props.children);
        template_effect(() => set_attribute(code, "data-theme", theme()));
        append$1($$anchor2, code);
      });
      append$1($$anchor, fragment);
    }
    var root_3$1 = /* @__PURE__ */ from_html(`<div data-role="inspector-panel:content"> </div>`);
    var root$9 = /* @__PURE__ */ from_html(`<div data-component="inspector-panel" class="svelte-1kkjpr5"><!></div>`);
    function Inspector_panel($$anchor, $$props) {
      push($$props, true);
      const decodeHTML = (html2) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html2;
        return txt.value;
      };
      var div = root$9();
      var node = child(div);
      {
        var consequent = ($$anchor2) => {
          Snippet($$anchor2, spread_props(() => $$props.props, {
            children: ($$anchor3, $$slotProps) => {
              var fragment_1 = comment();
              var node_1 = first_child(fragment_1);
              html(node_1, () => decodeHTML($$props.props.content));
              append$1($$anchor3, fragment_1);
            },
            $$slots: { default: true }
          }));
        };
        var consequent_1 = ($$anchor2) => {
        };
        var consequent_2 = ($$anchor2) => {
          var div_1 = root_3$1();
          var text2 = child(div_1);
          template_effect(() => set_text(text2, $$props.props.content));
          append$1($$anchor2, div_1);
        };
        if_block(node, ($$render) => {
          if ($$props.component === "snippet") $$render(consequent);
          else if ($$props.component === "params") $$render(consequent_1, 1);
          else if ($$props.props.content) $$render(consequent_2, 2);
        });
      }
      template_effect(() => set_attribute(div, "data-type", $$props.component));
      append$1($$anchor, div);
      pop();
    }
    const defaultAttributes = {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    };
    const hasA11yProp = (props) => {
      for (const prop2 in props) {
        if (prop2.startsWith("aria-") || prop2 === "role" || prop2 === "title") {
          return true;
        }
      }
      return false;
    };
    const mergeClasses = (...classes) => classes.filter((className, index2, array) => {
      return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index2;
    }).join(" ").trim();
    var root$8 = /* @__PURE__ */ from_svg(`<svg><!><!></svg>`);
    function Icon($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const $$restProps = legacy_rest_props($$sanitized_props, [
        "name",
        "color",
        "size",
        "strokeWidth",
        "absoluteStrokeWidth",
        "iconNode"
      ]);
      push($$props, false);
      let name = prop($$props, "name", 8, void 0);
      let color = prop($$props, "color", 8, "currentColor");
      let size = prop($$props, "size", 8, 24);
      let strokeWidth = prop($$props, "strokeWidth", 8, 2);
      let absoluteStrokeWidth = prop($$props, "absoluteStrokeWidth", 8, false);
      let iconNode = prop($$props, "iconNode", 24, () => []);
      init();
      var svg = root$8();
      attribute_effect(
        svg,
        ($0, $1, $2) => ({
          ...defaultAttributes,
          ...$0,
          ...$$restProps,
          width: size(),
          height: size(),
          stroke: color(),
          "stroke-width": $1,
          class: $2
        }),
        [
          () => !hasA11yProp($$restProps) ? { "aria-hidden": "true" } : void 0,
          () => (deep_read_state(absoluteStrokeWidth()), deep_read_state(strokeWidth()), deep_read_state(size()), untrack(() => absoluteStrokeWidth() ? Number(strokeWidth()) * 24 / Number(size()) : strokeWidth())),
          () => (deep_read_state(mergeClasses), deep_read_state(name()), deep_read_state($$sanitized_props), untrack(() => mergeClasses("lucide-icon", "lucide", name() ? `lucide-${name()}` : "", $$sanitized_props.class)))
        ]
      );
      var node = child(svg);
      each(node, 1, iconNode, index, ($$anchor2, $$item) => {
        var $$array = /* @__PURE__ */ user_derived(() => to_array(get$3($$item), 2));
        let tag = () => get$3($$array)[0];
        let attrs = () => get$3($$array)[1];
        var fragment = comment();
        var node_1 = first_child(fragment);
        element(node_1, tag, true, ($$element, $$anchor3) => {
          attribute_effect($$element, () => ({ ...attrs() }));
        });
        append$1($$anchor2, fragment);
      });
      var node_2 = sibling(node);
      slot(node_2, $$props, "default", {});
      append$1($$anchor, svg);
      pop();
    }
    function File$1($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const iconNode = [
        [
          "path",
          {
            "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
          }
        ],
        ["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }]
      ];
      Icon($$anchor, spread_props({ name: "file" }, () => $$sanitized_props, {
        get iconNode() {
          return iconNode;
        },
        children: ($$anchor2, $$slotProps) => {
          var fragment_1 = comment();
          var node = first_child(fragment_1);
          slot(node, $$props, "default", {});
          append$1($$anchor2, fragment_1);
        },
        $$slots: { default: true }
      }));
    }
    function Folder_open($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const iconNode = [
        [
          "path",
          {
            "d": "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
          }
        ]
      ];
      Icon($$anchor, spread_props({ name: "folder-open" }, () => $$sanitized_props, {
        get iconNode() {
          return iconNode;
        },
        children: ($$anchor2, $$slotProps) => {
          var fragment_1 = comment();
          var node = first_child(fragment_1);
          slot(node, $$props, "default", {});
          append$1($$anchor2, fragment_1);
        },
        $$slots: { default: true }
      }));
    }
    function Folder($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const iconNode = [
        [
          "path",
          {
            "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
          }
        ]
      ];
      Icon($$anchor, spread_props({ name: "folder" }, () => $$sanitized_props, {
        get iconNode() {
          return iconNode;
        },
        children: ($$anchor2, $$slotProps) => {
          var fragment_1 = comment();
          var node = first_child(fragment_1);
          slot(node, $$props, "default", {});
          append$1($$anchor2, fragment_1);
        },
        $$slots: { default: true }
      }));
    }
    function Layers_2($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const iconNode = [
        [
          "path",
          {
            "d": "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z"
          }
        ],
        [
          "path",
          {
            "d": "m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845"
          }
        ]
      ];
      Icon($$anchor, spread_props({ name: "layers-2" }, () => $$sanitized_props, {
        get iconNode() {
          return iconNode;
        },
        children: ($$anchor2, $$slotProps) => {
          var fragment_1 = comment();
          var node = first_child(fragment_1);
          slot(node, $$props, "default", {});
          append$1($$anchor2, fragment_1);
        },
        $$slots: { default: true }
      }));
    }
    function List_filter($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const iconNode = [
        ["path", { "d": "M2 5h20" }],
        ["path", { "d": "M6 12h12" }],
        ["path", { "d": "M9 19h6" }]
      ];
      Icon($$anchor, spread_props({ name: "list-filter" }, () => $$sanitized_props, {
        get iconNode() {
          return iconNode;
        },
        children: ($$anchor2, $$slotProps) => {
          var fragment_1 = comment();
          var node = first_child(fragment_1);
          slot(node, $$props, "default", {});
          append$1($$anchor2, fragment_1);
        },
        $$slots: { default: true }
      }));
    }
    function Panel_bottom_close($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const iconNode = [
        [
          "rect",
          { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
        ],
        ["path", { "d": "M3 15h18" }],
        ["path", { "d": "m15 8-3 3-3-3" }]
      ];
      Icon($$anchor, spread_props({ name: "panel-bottom-close" }, () => $$sanitized_props, {
        get iconNode() {
          return iconNode;
        },
        children: ($$anchor2, $$slotProps) => {
          var fragment_1 = comment();
          var node = first_child(fragment_1);
          slot(node, $$props, "default", {});
          append$1($$anchor2, fragment_1);
        },
        $$slots: { default: true }
      }));
    }
    function Panel_right_close($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const iconNode = [
        [
          "rect",
          { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
        ],
        ["path", { "d": "M15 3v18" }],
        ["path", { "d": "m8 9 3 3-3 3" }]
      ];
      Icon($$anchor, spread_props({ name: "panel-right-close" }, () => $$sanitized_props, {
        get iconNode() {
          return iconNode;
        },
        children: ($$anchor2, $$slotProps) => {
          var fragment_1 = comment();
          var node = first_child(fragment_1);
          slot(node, $$props, "default", {});
          append$1($$anchor2, fragment_1);
        },
        $$slots: { default: true }
      }));
    }
    function Square_dashed_mouse_pointer($$anchor, $$props) {
      const $$sanitized_props = legacy_rest_props($$props, ["children", "$$slots", "$$events", "$$legacy"]);
      const iconNode = [
        [
          "path",
          {
            "d": "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"
          }
        ],
        ["path", { "d": "M5 3a2 2 0 0 0-2 2" }],
        ["path", { "d": "M19 3a2 2 0 0 1 2 2" }],
        ["path", { "d": "M5 21a2 2 0 0 1-2-2" }],
        ["path", { "d": "M9 3h1" }],
        ["path", { "d": "M9 21h2" }],
        ["path", { "d": "M14 3h1" }],
        ["path", { "d": "M3 9v1" }],
        ["path", { "d": "M21 9v2" }],
        ["path", { "d": "M3 14v1" }]
      ];
      Icon($$anchor, spread_props({ name: "square-dashed-mouse-pointer" }, () => $$sanitized_props, {
        get iconNode() {
          return iconNode;
        },
        children: ($$anchor2, $$slotProps) => {
          var fragment_1 = comment();
          var node = first_child(fragment_1);
          slot(node, $$props, "default", {});
          append$1($$anchor2, fragment_1);
        },
        $$slots: { default: true }
      }));
    }
    var root_1$3 = /* @__PURE__ */ from_html(`<h4 data-role="inspector:breadcrumb" class="label">Elements / Button / Themes</h4>`);
    var root_3 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
    var root_6 = /* @__PURE__ */ from_html(`<div data-role="inspector:panel"><!></div>`);
    var root_7$1 = /* @__PURE__ */ from_html(`<div data-role="inspector:panel">end</div>`);
    var root_8 = /* @__PURE__ */ from_html(`<div data-role="inspector:panel"><!></div>`);
    var root$7 = /* @__PURE__ */ from_html(`<div data-component="inspector"><div data-role="inspector:toolbar"><!></div> <div data-role="inspector:panels"><!></div></div>`);
    function Inspector($$anchor, $$props) {
      push($$props, true);
      let panelGroups = /* @__PURE__ */ user_derived(() => $$props.panels.reduce(
        (grouped, panel) => {
          const slot2 = panel.defaultSlot;
          grouped[slot2] = grouped[slot2] || [];
          grouped[slot2].push(panel);
          return grouped;
        },
        {}
      ));
      let drawerPanels = /* @__PURE__ */ user_derived(() => get$3(panelGroups)["drawer"] || []);
      var div = root$7();
      var div_1 = child(div);
      var node = child(div_1);
      {
        const start2 = ($$anchor2) => {
          var h4 = root_1$3();
          append$1($$anchor2, h4);
        };
        const end = ($$anchor2) => {
          Button_group($$anchor2, {
            size: "lg",
            children: ($$anchor3, $$slotProps) => {
              var fragment_1 = root_3();
              var node_1 = first_child(fragment_1);
              Button(node_1, {
                get icon() {
                  return Panel_bottom_close;
                }
              });
              var node_2 = sibling(node_1, 2);
              Button(node_2, {
                get icon() {
                  return Panel_right_close;
                }
              });
              append$1($$anchor3, fragment_1);
            },
            $$slots: { default: true }
          });
        };
        Toolbar(node, { start: start2, end, $$slots: { start: true, end: true } });
      }
      var div_2 = sibling(div_1, 2);
      var node_3 = child(div_2);
      {
        const panel = ($$anchor2, panel2 = noop$2) => {
          Inspector_panel($$anchor2, spread_props(panel2));
        };
        const top = ($$anchor2) => {
          {
            const start2 = ($$anchor3) => {
              var div_3 = root_6();
              var node_4 = child(div_3);
              Frame(node_4, {
                get srcdoc() {
                  return $$props.preview.srcdoc;
                }
              });
              append$1($$anchor3, div_3);
            };
            const end = ($$anchor3) => {
              var div_4 = root_7$1();
              append$1($$anchor3, div_4);
            };
            Splitter_1($$anchor2, {
              panels: [{ id: "start" }, { id: "end" }],
              orientation: "horizontal",
              defaultSize: [70, 30],
              start: start2,
              end,
              $$slots: { start: true, end: true }
            });
          }
        };
        const bottom = ($$anchor2) => {
          var div_5 = root_8();
          var node_5 = child(div_5);
          Tabs_1(node_5, {
            id: "inspector-drawer-tabs",
            get panels() {
              return get$3(drawerPanels);
            },
            get panel() {
              return panel;
            }
          });
          append$1($$anchor2, div_5);
        };
        Splitter_1(node_3, {
          panels: [{ id: "top" }, { id: "bottom" }],
          orientation: "vertical",
          defaultSize: [65, 35],
          panel,
          top,
          bottom,
          $$slots: { panel: true, top: true, bottom: true }
        });
      }
      append$1($$anchor, div);
      pop();
    }
    function getCurrentContext() {
      return getContext("current")();
    }
    function Show$2($$anchor, $$props) {
      push($$props, true);
      const collection2 = getCurrentContext().collection;
      Inspector($$anchor, {
        get collection() {
          return collection2;
        },
        get spec() {
          return $$props.spec;
        },
        get scenario() {
          return $$props.scenario;
        },
        get panels() {
          return $$props.panels;
        },
        get preview() {
          return $$props.preview;
        }
      });
      pop();
    }
    const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: Show$2
    }, Symbol.toStringTag, { value: "Module" }));
    var root$6 = /* @__PURE__ */ from_html(`<p> </p> <div>spec</div>`, 1);
    function Show$1($$anchor, $$props) {
      push($$props, true);
      const $page = () => store_get(page, "$page", $$stores);
      const [$$stores, $$cleanup] = setup_stores();
      let collection2 = /* @__PURE__ */ user_derived(() => $page().props.collections.find((c) => c.id === $$props.collectionId));
      var fragment = root$6();
      var p = first_child(fragment);
      var text2 = child(p);
      template_effect(() => set_text(text2, get$3(collection2).label));
      append$1($$anchor, fragment);
      pop();
      $$cleanup();
    }
    const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: Show$1
    }, Symbol.toStringTag, { value: "Module" }));
    var root$5 = /* @__PURE__ */ from_html(`<div>Welcome!</div>`);
    function Show($$anchor) {
      var div = root$5();
      append$1($$anchor, div);
    }
    const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: Show
    }, Symbol.toStringTag, { value: "Module" }));
    var root_1$2 = /* @__PURE__ */ from_html(`<span> </span>`);
    var root$4 = /* @__PURE__ */ from_html(`<header data-component="header"><!></header>`);
    function Header($$anchor, $$props) {
      push($$props, true);
      var header = root$4();
      var node = child(header);
      Link(node, {
        get href() {
          return $$props.lookbook.urlPath;
        },
        class: "mark green",
        "data-role": "header:branding",
        children: ($$anchor2, $$slotProps) => {
          var span = root_1$2();
          var text2 = child(span);
          template_effect(() => set_text(text2, $$props.project.name));
          append$1($$anchor2, span);
        },
        $$slots: { default: true }
      });
      append$1($$anchor, header);
      pop();
    }
    var root$3 = /* @__PURE__ */ from_html(`<footer data-component="statusbar" class="surface svelte-f294i8"><div data-role="statusbar:section statusbar:section-start" class="svelte-f294i8"></div> <div data-role="statusbar:section statusbar:section-end" class="svelte-f294i8"><span data-role="statusbar:label" class="svelte-f294i8">LOOKBOOK_v<em data-role="statusbar:version" class="svelte-f294i8"> </em></span></div></footer>`);
    function Statusbar($$anchor, $$props) {
      push($$props, true);
      var footer = root$3();
      var div = sibling(child(footer), 2);
      var span = child(div);
      var em = sibling(child(span));
      var text2 = child(em);
      template_effect(() => set_text(text2, $$props.lookbook.version));
      append$1($$anchor, footer);
      pop();
    }
    var root_7 = /* @__PURE__ */ from_html(`<!> <span data-role="nav-tree:item-label"> </span>`, 1);
    var root_11 = /* @__PURE__ */ from_html(`<!> <span data-role="nav-tree:branch-label"> </span>`, 1);
    var root_14 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
    var root_9 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
    var root$2 = /* @__PURE__ */ from_html(`<div data-component="nav-tree"><!></div>`);
    function Nav_tree($$anchor, $$props) {
      push($$props, true);
      const iconMap = {
        page: File$1,
        scenario: Square_dashed_mouse_pointer,
        spec: Layers_2,
        folder: Folder,
        folderOpen: Folder_open
      };
      const filterFn = useFilter({ sensitivity: "base" });
      const initialCollection = /* @__PURE__ */ user_derived(() => createTreeCollection({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.label,
        rootNode: $$props.tree
      }));
      let collection2 = /* @__PURE__ */ user_derived(() => get$3(initialCollection));
      let branchIds = /* @__PURE__ */ user_derived(() => get$3(collection2).getBranchValues());
      const createNavTreeState = () => {
        const state2 = new PersistedState(`nav-tree:${$$props.id}`, { expandedItems: [], filter: "", selected: [] });
        return {
          get expandedItems() {
            return state2.current.expandedItems;
          },
          set expandedItems(value) {
            state2.current.expandedItems = value;
          },
          get filter() {
            return state2.current.filter;
          },
          set filter(value) {
            state2.current.filter = value;
          },
          get selected() {
            return state2.current.selected;
          },
          set selected(value) {
            value = Array.isArray(value) ? value : [value];
            if (!get$3(branchIds).includes(value[0])) {
              state2.current.selected = value;
            }
          }
        };
      };
      let navTreeState = createNavTreeState();
      navTreeState.selected = [getCurrentContext().resourceId];
      const filter2 = (value) => {
        const filtered = value.length > 0 ? get$3(initialCollection).filter((node) => filterFn().contains(node.label, value)) : get$3(initialCollection);
        set$2(collection2, filtered);
        navTreeState.filter = value;
      };
      filter2(navTreeState.filter);
      var div = root$2();
      {
        const renderNode = ($$anchor2, node = noop$2, indexPath = noop$2) => {
          var fragment = comment();
          var node_1 = first_child(fragment);
          component(node_1, () => Tree_view_node_provider, ($$anchor3, TreeView_NodeProvider) => {
            TreeView_NodeProvider($$anchor3, {
              get node() {
                return node();
              },
              get indexPath() {
                return indexPath();
              },
              children: ($$anchor4, $$slotProps) => {
                var fragment_1 = comment();
                var node_2 = first_child(fragment_1);
                {
                  const render2 = ($$anchor5, nodeState = noop$2) => {
                    var fragment_2 = comment();
                    var node_3 = first_child(fragment_2);
                    {
                      var consequent = ($$anchor6) => {
                        var fragment_3 = comment();
                        var node_4 = first_child(fragment_3);
                        {
                          const asChild = ($$anchor7, itemProps = noop$2) => {
                            {
                              let $0 = /* @__PURE__ */ user_derived(() => itemProps()());
                              Link($$anchor7, spread_props(
                                {
                                  get href() {
                                    return node().href;
                                  }
                                },
                                () => get$3($0),
                                {
                                  children: ($$anchor8, $$slotProps2) => {
                                    var fragment_5 = comment();
                                    var node_5 = first_child(fragment_5);
                                    component(node_5, () => Tree_view_item_text, ($$anchor9, TreeView_ItemText) => {
                                      TreeView_ItemText($$anchor9, {
                                        "data-role": "nav-tree:item-text",
                                        children: ($$anchor10, $$slotProps3) => {
                                          var fragment_6 = root_7();
                                          var node_6 = first_child(fragment_6);
                                          {
                                            let $02 = /* @__PURE__ */ user_derived(() => iconMap[node().type] || Square_dashed_mouse_pointer);
                                            Icon$1(node_6, {
                                              get svg() {
                                                return get$3($02);
                                              }
                                            });
                                          }
                                          var span = sibling(node_6, 2);
                                          var text2 = child(span);
                                          template_effect(() => set_text(text2, node().label));
                                          append$1($$anchor10, fragment_6);
                                        },
                                        $$slots: { default: true }
                                      });
                                    });
                                    append$1($$anchor8, fragment_5);
                                  },
                                  $$slots: { default: true }
                                }
                              ));
                            }
                          };
                          component(node_4, () => Tree_view_item, ($$anchor7, TreeView_Item) => {
                            TreeView_Item($$anchor7, {
                              "data-role": "nav-tree:item",
                              asChild,
                              $$slots: { asChild: true }
                            });
                          });
                        }
                        append$1($$anchor6, fragment_3);
                      };
                      var alternate_1 = ($$anchor6) => {
                        var fragment_7 = comment();
                        var node_7 = first_child(fragment_7);
                        component(node_7, () => Tree_view_branch, ($$anchor7, TreeView_Branch) => {
                          TreeView_Branch($$anchor7, {
                            "data-role": "nav-tree:branch",
                            children: ($$anchor8, $$slotProps2) => {
                              var fragment_8 = root_9();
                              var node_8 = first_child(fragment_8);
                              component(node_8, () => Tree_view_branch_control, ($$anchor9, TreeView_BranchControl) => {
                                TreeView_BranchControl($$anchor9, {
                                  "data-role": "nav-tree:branch-control",
                                  children: ($$anchor10, $$slotProps3) => {
                                    var fragment_9 = comment();
                                    var node_9 = first_child(fragment_9);
                                    component(node_9, () => Tree_view_branch_text, ($$anchor11, TreeView_BranchText) => {
                                      TreeView_BranchText($$anchor11, {
                                        "data-role": "nav-tree:branch-text",
                                        children: ($$anchor12, $$slotProps4) => {
                                          var fragment_10 = root_11();
                                          var node_10 = first_child(fragment_10);
                                          {
                                            var consequent_1 = ($$anchor13) => {
                                              Icon$1($$anchor13, {
                                                get svg() {
                                                  return iconMap["folderOpen"];
                                                }
                                              });
                                            };
                                            var d = /* @__PURE__ */ user_derived(() => nodeState()().expanded);
                                            var alternate = ($$anchor13) => {
                                              Icon$1($$anchor13, {
                                                get svg() {
                                                  return iconMap["folder"];
                                                }
                                              });
                                            };
                                            if_block(node_10, ($$render) => {
                                              if (get$3(d)) $$render(consequent_1);
                                              else $$render(alternate, false);
                                            });
                                          }
                                          var span_1 = sibling(node_10, 2);
                                          var text_1 = child(span_1);
                                          template_effect(() => set_text(text_1, node().label));
                                          append$1($$anchor12, fragment_10);
                                        },
                                        $$slots: { default: true }
                                      });
                                    });
                                    append$1($$anchor10, fragment_9);
                                  },
                                  $$slots: { default: true }
                                });
                              });
                              var node_11 = sibling(node_8, 2);
                              component(node_11, () => Tree_view_branch_content, ($$anchor9, TreeView_BranchContent) => {
                                TreeView_BranchContent($$anchor9, {
                                  "data-role": "nav-tree:branch-content",
                                  children: ($$anchor10, $$slotProps3) => {
                                    var fragment_13 = root_14();
                                    var node_12 = first_child(fragment_13);
                                    component(node_12, () => Tree_view_branch_indent_guide, ($$anchor11, TreeView_BranchIndentGuide) => {
                                      TreeView_BranchIndentGuide($$anchor11, { "data-role": "nav-tree:branch-indent-guide" });
                                    });
                                    var node_13 = sibling(node_12, 2);
                                    each(node_13, 19, () => node().children, (child2) => child2.id, ($$anchor11, child2, index2) => {
                                      {
                                        let $0 = /* @__PURE__ */ user_derived(() => [...indexPath(), get$3(index2)]);
                                        renderNode($$anchor11, () => get$3(child2), () => get$3($0));
                                      }
                                    });
                                    append$1($$anchor10, fragment_13);
                                  },
                                  $$slots: { default: true }
                                });
                              });
                              append$1($$anchor8, fragment_8);
                            },
                            $$slots: { default: true }
                          });
                        });
                        append$1($$anchor6, fragment_7);
                      };
                      if_block(node_3, ($$render) => {
                        if (node().leaf) $$render(consequent);
                        else $$render(alternate_1, false);
                      });
                    }
                    append$1($$anchor5, fragment_2);
                  };
                  component(node_2, () => Tree_view_node_context, ($$anchor5, TreeView_NodeContext) => {
                    TreeView_NodeContext($$anchor5, { render: render2, $$slots: { render: true } });
                  });
                }
                append$1($$anchor4, fragment_1);
              },
              $$slots: { default: true }
            });
          });
          append$1($$anchor2, fragment);
        };
        var node_14 = child(div);
        component(node_14, () => Tree_view_root, ($$anchor2, TreeView_Root) => {
          TreeView_Root($$anchor2, {
            get collection() {
              return get$3(collection2);
            },
            selectionMode: "single",
            "data-role": "nav-tree:tree",
            children: ($$anchor3, $$slotProps) => {
              var fragment_15 = comment();
              var node_15 = first_child(fragment_15);
              component(node_15, () => Tree_view_tree, ($$anchor4, TreeView_Tree) => {
                TreeView_Tree($$anchor4, {
                  children: ($$anchor5, $$slotProps2) => {
                    var fragment_16 = comment();
                    var node_16 = first_child(fragment_16);
                    each(node_16, 19, () => get$3(collection2).rootNode?.children ?? [], (node) => node.id, ($$anchor6, node, index2) => {
                      renderNode($$anchor6, () => get$3(node), () => [get$3(index2)]);
                    });
                    append$1($$anchor5, fragment_16);
                  },
                  $$slots: { default: true }
                });
              });
              append$1($$anchor3, fragment_15);
            },
            $$slots: { default: true }
          });
        });
      }
      append$1($$anchor, div);
      pop();
    }
    var root_2$1 = /* @__PURE__ */ from_html(`<h3 data-role="sidebar:section-label" class="label"><!></h3>`);
    var root_1$1 = /* @__PURE__ */ from_html(`<section data-role="sidebar:section"><header data-role="sidebar:section-header"><!></header> <div data-role="sidebar:section-content"><!></div></section>`);
    var root$1 = /* @__PURE__ */ from_html(`<div data-component="sidebar"><!></div>`);
    function Sidebar($$anchor, $$props) {
      push($$props, true);
      new PersistedState(`sidebar`, { expandedSections: [] });
      var div = root$1();
      var node = child(div);
      {
        const panel = ($$anchor2, collection2 = noop$2) => {
          var section = root_1$1();
          let styles;
          var header = child(section);
          var node_1 = child(header);
          {
            const start2 = ($$anchor3) => {
              var h3 = root_2$1();
              var node_2 = child(h3);
              Link(node_2, {
                get href() {
                  return collection2().href;
                },
                children: ($$anchor4, $$slotProps) => {
                  var text$1 = text();
                  template_effect(() => set_text(text$1, collection2().label));
                  append$1($$anchor4, text$1);
                },
                $$slots: { default: true }
              });
              append$1($$anchor3, h3);
            };
            const end = ($$anchor3) => {
              Button($$anchor3, {
                get icon() {
                  return List_filter;
                }
              });
            };
            Toolbar(node_1, { start: start2, end, $$slots: { start: true, end: true } });
          }
          var div_1 = sibling(header, 2);
          var node_3 = child(div_1);
          Nav_tree(node_3, {
            get id() {
              return collection2().id;
            },
            get tree() {
              return collection2().nav;
            }
          });
          template_effect(() => styles = set_style(section, "", styles, {
            "border-top-width": collection2() === $$props.collections[0] ? "0" : "1px"
          }));
          append$1($$anchor2, section);
        };
        let $0 = /* @__PURE__ */ user_derived(() => $$props.collections.map((c) => 100 / $$props.collections.length));
        Splitter_1(node, {
          id: "app-layout",
          orientation: "vertical",
          get defaultSize() {
            return get$3($0);
          },
          get panels() {
            return $$props.collections;
          },
          panel,
          $$slots: { panel: true }
        });
      }
      append$1($$anchor, div);
      pop();
    }
    class ServerEventsListener {
      constructor(endpoint) {
        this.endpoint = endpoint;
        this.source = null;
        this.broadcastChannel = this.initBroadCastChannel();
        this.handlers = [];
        window.addEventListener("visibilitychange", () => {
          if (document.hidden) {
            this.stop();
          } else {
            this.start();
          }
        });
      }
      start() {
        if (!this.source) {
          this.source = this.initSource();
          this.broadcastStart();
        }
      }
      stop() {
        if (this.source) {
          this.source.close();
          this.source = null;
        }
      }
      on(type2, callback) {
        this.handlers.push({ type: type2, callback });
      }
      initSource() {
        const source2 = new EventSource(this.endpoint);
        source2.addEventListener("message", (event2) => {
          const data = JSON.parse(event2.data);
          this.broadcastChannel.postMessage(JSON.stringify(data));
          this.handlers.forEach((handler) => {
            if (data.type === handler.type) {
              handler.callback.call(null, data);
            }
          });
        });
        source2.addEventListener("error", () => {
          console.error(`Event source error`);
          this.stop();
        });
        window.onbeforeunload = () => this.stop();
        return source2;
      }
      initBroadCastChannel() {
        const bc = new BroadcastChannel("lookbook_events");
        bc.addEventListener("message", (event2) => {
          const data = JSON.parse(event2.data);
          this.handlers.forEach((handler) => {
            if (data.type === handler.type) {
              handler.callback.call(null, data);
            }
          });
        });
        return bc;
      }
      broadcastStart() {
        this.broadcastChannel.postMessage(JSON.stringify({ type: "event-source-start" }));
      }
    }
    var root_1 = /* @__PURE__ */ from_html(`<div data-role="app:sidebar" class="svelte-uh556k"><!></div>`);
    var root_2 = /* @__PURE__ */ from_html(`<main data-role="app:main" class="svelte-uh556k"><!></main>`);
    var root = /* @__PURE__ */ from_html(`<div id="app" data-component="app" class="svelte-uh556k"><!> <div data-role="app:body" class="svelte-uh556k"><!></div> <div data-role="app:footer" class="svelte-uh556k"><!></div></div>`);
    function App($$anchor, $$props) {
      push($$props, true);
      let collectionId = prop($$props, "collectionId", 3, null), resourceId = prop($$props, "resourceId", 3, null);
      const current = /* @__PURE__ */ user_derived(() => {
        return {
          request: $$props.request,
          collectionId: collectionId(),
          resourceId: resourceId(),
          collection: $$props.collections.find((c) => c.id === collectionId())
        };
      });
      setContext("current", () => get$3(current));
      let updateRequested = /* @__PURE__ */ state$1(false);
      onMount(() => {
        const serverEventsListener = new ServerEventsListener("/lookbook/events");
        serverEventsListener.on("update", () => set$2(updateRequested, true));
        serverEventsListener.start();
        onDestroy(() => serverEventsListener.stop());
      });
      user_effect(() => {
        if (get$3(updateRequested)) {
          router.reload({ headers: { "X-Lookbook-Refresh": "true" } });
          set$2(updateRequested, false);
        }
      });
      var div = root();
      var node = child(div);
      Header(node, {
        get lookbook() {
          return $$props.lookbook;
        },
        get project() {
          return $$props.project;
        }
      });
      var div_1 = sibling(node, 2);
      var node_1 = child(div_1);
      {
        const sidebar = ($$anchor2) => {
          var div_2 = root_1();
          var node_2 = child(div_2);
          Sidebar(node_2, {
            get collections() {
              return $$props.collections;
            }
          });
          append$1($$anchor2, div_2);
        };
        const main = ($$anchor2) => {
          var main_1 = root_2();
          var node_3 = child(main_1);
          snippet(node_3, () => $$props.children);
          append$1($$anchor2, main_1);
        };
        Splitter_1(node_1, {
          id: "app-layout",
          panels: [{ id: "sidebar" }, { id: "main" }],
          defaultSize: [30, 70],
          sidebar,
          main,
          $$slots: { sidebar: true, main: true }
        });
      }
      var div_3 = sibling(div_1, 2);
      var node_4 = child(div_3);
      Statusbar(node_4, {
        get project() {
          return $$props.project;
        },
        get lookbook() {
          return $$props.lookbook;
        },
        get collections() {
          return $$props.collections;
        }
      });
      append$1($$anchor, div);
      pop();
    }
    createInertiaApp({
      id: "root",
      progress: false,
      defaults: {
        future: {
          useScriptElementForInitialPage: true,
          useDialogForErrorModal: true,
          useDataInertiaHeadAttribute: true
        },
        visitOptions: () => {
          return { viewTransition: true };
        }
      },
      resolve: (name) => {
        const pages = /* @__PURE__ */ Object.assign({ "../views/collections/show.svelte": __vite_glob_0_0, "../views/errors/error.svelte": __vite_glob_0_1, "../views/errors/not_found.svelte": __vite_glob_0_2, "../views/pages/show.svelte": __vite_glob_0_3, "../views/scenarios/show.svelte": __vite_glob_0_4, "../views/specs/show.svelte": __vite_glob_0_5, "../views/start/show.svelte": __vite_glob_0_6 });
        const page2 = pages[`../views/${name}.svelte`];
        return { default: page2.default, layout: page2.layout || App };
      },
      setup({ el, App: App2, props }) {
        mount(App2, { target: el, props });
      }
    });
  }
});
export default require_ui_001();
