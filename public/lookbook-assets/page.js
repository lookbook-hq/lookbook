(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/prismjs/prism.js
  var require_prism = __commonJS({
    "node_modules/prismjs/prism.js"(exports, module) {
      var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
      var Prism3 = function(_self2) {
        var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
        var uniqueId = 0;
        var plainTextGrammar = {};
        var _3 = {
          /**
           * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
           * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
           * additional languages or plugins yourself.
           *
           * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
           *
           * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.manual = true;
           * // add a new <script> to load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          manual: _self2.Prism && _self2.Prism.manual,
          /**
           * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
           * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
           * own worker, you don't want it to do this.
           *
           * By setting this value to `true`, Prism will not add its own listeners to the worker.
           *
           * You obviously have to change this value before Prism executes. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.disableWorkerMessageHandler = true;
           * // Load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
          /**
           * A namespace for utility methods.
           *
           * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
           * change or disappear at any time.
           *
           * @namespace
           * @memberof Prism
           */
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
              }
            },
            /**
             * Returns the name of the type of the given value.
             *
             * @param {any} o
             * @returns {string}
             * @example
             * type(null)      === 'Null'
             * type(undefined) === 'Undefined'
             * type(123)       === 'Number'
             * type('foo')     === 'String'
             * type(true)      === 'Boolean'
             * type([1, 2])    === 'Array'
             * type({})        === 'Object'
             * type(String)    === 'Function'
             * type(/abc+/)    === 'RegExp'
             */
            type: function(o9) {
              return Object.prototype.toString.call(o9).slice(8, -1);
            },
            /**
             * Returns a unique number for the given object. Later calls will still return the same number.
             *
             * @param {Object} obj
             * @returns {number}
             */
            objId: function(obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", { value: ++uniqueId });
              }
              return obj["__id"];
            },
            /**
             * Creates a deep clone of the given object.
             *
             * The main intended use of this function is to clone language definitions.
             *
             * @param {T} o
             * @param {Record<number, any>} [visited]
             * @returns {T}
             * @template T
             */
            clone: function deepClone(o9, visited) {
              visited = visited || {};
              var clone2;
              var id;
              switch (_3.util.type(o9)) {
                case "Object":
                  id = _3.util.objId(o9);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone2 = /** @type {Record<string, any>} */
                  {};
                  visited[id] = clone2;
                  for (var key in o9) {
                    if (o9.hasOwnProperty(key)) {
                      clone2[key] = deepClone(o9[key], visited);
                    }
                  }
                  return (
                    /** @type {any} */
                    clone2
                  );
                case "Array":
                  id = _3.util.objId(o9);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone2 = [];
                  visited[id] = clone2;
                  /** @type {Array} */
                  /** @type {any} */
                  o9.forEach(function(v3, i6) {
                    clone2[i6] = deepClone(v3, visited);
                  });
                  return (
                    /** @type {any} */
                    clone2
                  );
                default:
                  return o9;
              }
            },
            /**
             * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
             *
             * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
             *
             * @param {Element} element
             * @returns {string}
             */
            getLanguage: function(element) {
              while (element) {
                var m3 = lang.exec(element.className);
                if (m3) {
                  return m3[1].toLowerCase();
                }
                element = element.parentElement;
              }
              return "none";
            },
            /**
             * Sets the Prism `language-xxxx` class of the given element.
             *
             * @param {Element} element
             * @param {string} language
             * @returns {void}
             */
            setLanguage: function(element, language) {
              element.className = element.className.replace(RegExp(lang, "gi"), "");
              element.classList.add("language-" + language);
            },
            /**
             * Returns the script element that is currently executing.
             *
             * This does __not__ work for line script element.
             *
             * @returns {HTMLScriptElement | null}
             */
            currentScript: function() {
              if (typeof document === "undefined") {
                return null;
              }
              if ("currentScript" in document && 1 < 2) {
                return (
                  /** @type {any} */
                  document.currentScript
                );
              }
              try {
                throw new Error();
              } catch (err) {
                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                if (src) {
                  var scripts = document.getElementsByTagName("script");
                  for (var i6 in scripts) {
                    if (scripts[i6].src == src) {
                      return scripts[i6];
                    }
                  }
                }
                return null;
              }
            },
            /**
             * Returns whether a given class is active for `element`.
             *
             * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
             * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
             * given class is just the given class with a `no-` prefix.
             *
             * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
             * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
             * ancestors have the given class or the negated version of it, then the default activation will be returned.
             *
             * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
             * version of it, the class is considered active.
             *
             * @param {Element} element
             * @param {string} className
             * @param {boolean} [defaultActivation=false]
             * @returns {boolean}
             */
            isActive: function(element, className, defaultActivation) {
              var no = "no-" + className;
              while (element) {
                var classList = element.classList;
                if (classList.contains(className)) {
                  return true;
                }
                if (classList.contains(no)) {
                  return false;
                }
                element = element.parentElement;
              }
              return !!defaultActivation;
            }
          },
          /**
           * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
           *
           * @namespace
           * @memberof Prism
           * @public
           */
          languages: {
            /**
             * The grammar for plain, unformatted text.
             */
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            /**
             * Creates a deep copy of the language with the given id and appends the given tokens.
             *
             * If a token in `redef` also appears in the copied language, then the existing token in the copied language
             * will be overwritten at its original position.
             *
             * ## Best practices
             *
             * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
             * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
             * understand the language definition because, normally, the order of tokens matters in Prism grammars.
             *
             * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
             * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
             *
             * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
             * @param {Grammar} redef The new tokens to append.
             * @returns {Grammar} The new language created.
             * @public
             * @example
             * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
             *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
             *     // at its original position
             *     'comment': { ... },
             *     // CSS doesn't have a 'color' token, so this token will be appended
             *     'color': /\b(?:red|green|blue)\b/
             * });
             */
            extend: function(id, redef) {
              var lang2 = _3.util.clone(_3.languages[id]);
              for (var key in redef) {
                lang2[key] = redef[key];
              }
              return lang2;
            },
            /**
             * Inserts tokens _before_ another token in a language definition or any other grammar.
             *
             * ## Usage
             *
             * This helper method makes it easy to modify existing languages. For example, the CSS language definition
             * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
             * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
             * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
             * this:
             *
             * ```js
             * Prism.languages.markup.style = {
             *     // token
             * };
             * ```
             *
             * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
             * before existing tokens. For the CSS example above, you would use it like this:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'cdata', {
             *     'style': {
             *         // token
             *     }
             * });
             * ```
             *
             * ## Special cases
             *
             * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
             * will be ignored.
             *
             * This behavior can be used to insert tokens after `before`:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'comment', {
             *     'comment': Prism.languages.markup.comment,
             *     // tokens after 'comment'
             * });
             * ```
             *
             * ## Limitations
             *
             * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
             * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
             * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
             * deleting properties which is necessary to insert at arbitrary positions.
             *
             * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
             * Instead, it will create a new object and replace all references to the target object with the new one. This
             * can be done without temporarily deleting properties, so the iteration order is well-defined.
             *
             * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
             * you hold the target object in a variable, then the value of the variable will not change.
             *
             * ```js
             * var oldMarkup = Prism.languages.markup;
             * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
             *
             * assert(oldMarkup !== Prism.languages.markup);
             * assert(newMarkup === Prism.languages.markup);
             * ```
             *
             * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
             * object to be modified.
             * @param {string} before The key to insert before.
             * @param {Grammar} insert An object containing the key-value pairs to be inserted.
             * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
             * object to be modified.
             *
             * Defaults to `Prism.languages`.
             * @returns {Grammar} The new grammar object.
             * @public
             */
            insertBefore: function(inside, before, insert, root) {
              root = root || /** @type {any} */
              _3.languages;
              var grammar = root[inside];
              var ret = {};
              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }
                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }
              var old = root[inside];
              root[inside] = ret;
              _3.languages.DFS(_3.languages, function(key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });
              return ret;
            },
            // Traverse a language definition with Depth First Search
            DFS: function DFS(o9, callback, type, visited) {
              visited = visited || {};
              var objId = _3.util.objId;
              for (var i6 in o9) {
                if (o9.hasOwnProperty(i6)) {
                  callback.call(o9, i6, o9[i6], type || i6);
                  var property = o9[i6];
                  var propertyType = _3.util.type(property);
                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === "Array" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i6, visited);
                  }
                }
              }
            }
          },
          plugins: {},
          /**
           * This is the most high-level function in Prism’s API.
           * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
           * each one of them.
           *
           * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
           *
           * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
           * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
           * @memberof Prism
           * @public
           */
          highlightAll: function(async, callback) {
            _3.highlightAllUnder(document, async, callback);
          },
          /**
           * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
           * {@link Prism.highlightElement} on each one of them.
           *
           * The following hooks will be run:
           * 1. `before-highlightall`
           * 2. `before-all-elements-highlight`
           * 3. All hooks of {@link Prism.highlightElement} for each element.
           *
           * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
           * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
           * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
           * @memberof Prism
           * @public
           */
          highlightAllUnder: function(container, async, callback) {
            var env = {
              callback,
              container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _3.hooks.run("before-highlightall", env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _3.hooks.run("before-all-elements-highlight", env);
            for (var i6 = 0, element; element = env.elements[i6++]; ) {
              _3.highlightElement(element, async === true, env.callback);
            }
          },
          /**
           * Highlights the code inside a single element.
           *
           * The following hooks will be run:
           * 1. `before-sanity-check`
           * 2. `before-highlight`
           * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
           * 4. `before-insert`
           * 5. `after-highlight`
           * 6. `complete`
           *
           * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
           * the element's language.
           *
           * @param {Element} element The element containing the code.
           * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
           * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
           * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
           * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
           *
           * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
           * asynchronous highlighting to work. You can build your own bundle on the
           * [Download page](https://prismjs.com/download.html).
           * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
           * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
           * @memberof Prism
           * @public
           */
          highlightElement: function(element, async, callback) {
            var language = _3.util.getLanguage(element);
            var grammar = _3.languages[language];
            _3.util.setLanguage(element, language);
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre") {
              _3.util.setLanguage(parent, language);
            }
            var code = element.textContent;
            var env = {
              element,
              language,
              grammar,
              code
            };
            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;
              _3.hooks.run("before-insert", env);
              env.element.innerHTML = env.highlightedCode;
              _3.hooks.run("after-highlight", env);
              _3.hooks.run("complete", env);
              callback && callback.call(env.element);
            }
            _3.hooks.run("before-sanity-check", env);
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
              parent.setAttribute("tabindex", "0");
            }
            if (!env.code) {
              _3.hooks.run("complete", env);
              callback && callback.call(env.element);
              return;
            }
            _3.hooks.run("before-highlight", env);
            if (!env.grammar) {
              insertHighlightedCode(_3.util.encode(env.code));
              return;
            }
            if (async && _self2.Worker) {
              var worker = new Worker(_3.filename);
              worker.onmessage = function(evt) {
                insertHighlightedCode(evt.data);
              };
              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_3.highlight(env.code, env.grammar, env.language));
            }
          },
          /**
           * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
           * and the language definitions to use, and returns a string with the HTML produced.
           *
           * The following hooks will be run:
           * 1. `before-tokenize`
           * 2. `after-tokenize`
           * 3. `wrap`: On each {@link Token}.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @param {string} language The name of the language definition passed to `grammar`.
           * @returns {string} The highlighted HTML.
           * @memberof Prism
           * @public
           * @example
           * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
           */
          highlight: function(text, grammar, language) {
            var env = {
              code: text,
              grammar,
              language
            };
            _3.hooks.run("before-tokenize", env);
            if (!env.grammar) {
              throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _3.tokenize(env.code, env.grammar);
            _3.hooks.run("after-tokenize", env);
            return Token.stringify(_3.util.encode(env.tokens), env.language);
          },
          /**
           * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
           * and the language definitions to use, and returns an array with the tokenized code.
           *
           * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
           *
           * This method could be useful in other contexts as well, as a very crude parser.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @returns {TokenStream} An array of strings and tokens, a token stream.
           * @memberof Prism
           * @public
           * @example
           * let code = `var foo = 0;`;
           * let tokens = Prism.tokenize(code, Prism.languages.javascript);
           * tokens.forEach(token => {
           *     if (token instanceof Prism.Token && token.type === 'number') {
           *         console.log(`Found numeric literal: ${token.content}`);
           *     }
           * });
           */
          tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }
              delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },
          /**
           * @namespace
           * @memberof Prism
           * @public
           */
          hooks: {
            all: {},
            /**
             * Adds the given callback to the list of callbacks for the given hook.
             *
             * The callback will be invoked when the hook it is registered for is run.
             * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
             *
             * One callback function can be registered to multiple hooks and the same hook multiple times.
             *
             * @param {string} name The name of the hook.
             * @param {HookCallback} callback The callback function which is given environment variables.
             * @public
             */
            add: function(name, callback) {
              var hooks = _3.hooks.all;
              hooks[name] = hooks[name] || [];
              hooks[name].push(callback);
            },
            /**
             * Runs a hook invoking all registered callbacks with the given environment variables.
             *
             * Callbacks will be invoked synchronously and in the order in which they were registered.
             *
             * @param {string} name The name of the hook.
             * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
             * @public
             */
            run: function(name, env) {
              var callbacks = _3.hooks.all[name];
              if (!callbacks || !callbacks.length) {
                return;
              }
              for (var i6 = 0, callback; callback = callbacks[i6++]; ) {
                callback(env);
              }
            }
          },
          Token
        };
        _self2.Prism = _3;
        function Token(type, content, alias, matchedStr) {
          this.type = type;
          this.content = content;
          this.alias = alias;
          this.length = (matchedStr || "").length | 0;
        }
        Token.stringify = function stringify(o9, language) {
          if (typeof o9 == "string") {
            return o9;
          }
          if (Array.isArray(o9)) {
            var s6 = "";
            o9.forEach(function(e11) {
              s6 += stringify(e11, language);
            });
            return s6;
          }
          var env = {
            type: o9.type,
            content: stringify(o9.content, language),
            tag: "span",
            classes: ["token", o9.type],
            attributes: {},
            language
          };
          var aliases = o9.alias;
          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }
          _3.hooks.run("wrap", env);
          var attributes = "";
          for (var name in env.attributes) {
            attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
          }
          return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
        };
        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (match && lookbehind && match[1]) {
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          return match;
        }
        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];
            for (var j3 = 0; j3 < patterns.length; ++j3) {
              if (rematch && rematch.cause == token + "," + j3) {
                return;
              }
              var patternObj = patterns[j3];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;
              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }
              var pattern = patternObj.pattern || patternObj;
              for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }
                var str = currentNode.value;
                if (tokenList.length > text.length) {
                  return;
                }
                if (str instanceof Token) {
                  continue;
                }
                var removeCount = 1;
                var match;
                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);
                  if (!match || match.index >= text.length) {
                    break;
                  }
                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p4 = pos;
                  p4 += currentNode.value.length;
                  while (from >= p4) {
                    currentNode = currentNode.next;
                    p4 += currentNode.value.length;
                  }
                  p4 -= currentNode.value.length;
                  pos = p4;
                  if (currentNode.value instanceof Token) {
                    continue;
                  }
                  for (var k3 = currentNode; k3 !== tokenList.tail && (p4 < to || typeof k3.value === "string"); k3 = k3.next) {
                    removeCount++;
                    p4 += k3.value.length;
                  }
                  removeCount--;
                  str = text.slice(pos, p4);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);
                  if (!match) {
                    continue;
                  }
                }
                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);
                var reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }
                var removeFrom = currentNode.prev;
                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }
                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _3.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);
                if (after) {
                  addAfter(tokenList, currentNode, after);
                }
                if (removeCount > 1) {
                  var nestedRematch = {
                    cause: token + "," + j3,
                    reach
                  };
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }
        function LinkedList() {
          var head = { value: null, prev: null, next: null };
          var tail = { value: null, prev: head, next: null };
          head.next = tail;
          this.head = head;
          this.tail = tail;
          this.length = 0;
        }
        function addAfter(list, node, value) {
          var next = node.next;
          var newNode = { value, prev: node, next };
          node.next = newNode;
          next.prev = newNode;
          list.length++;
          return newNode;
        }
        function removeRange(list, node, count) {
          var next = node.next;
          for (var i6 = 0; i6 < count && next !== list.tail; i6++) {
            next = next.next;
          }
          node.next = next;
          next.prev = node;
          list.length -= i6;
        }
        function toArray(list) {
          var array = [];
          var node = list.head.next;
          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }
          return array;
        }
        if (!_self2.document) {
          if (!_self2.addEventListener) {
            return _3;
          }
          if (!_3.disableWorkerMessageHandler) {
            _self2.addEventListener("message", function(evt) {
              var message = JSON.parse(evt.data);
              var lang2 = message.language;
              var code = message.code;
              var immediateClose = message.immediateClose;
              _self2.postMessage(_3.highlight(code, _3.languages[lang2], lang2));
              if (immediateClose) {
                _self2.close();
              }
            }, false);
          }
          return _3;
        }
        var script = _3.util.currentScript();
        if (script) {
          _3.filename = script.src;
          if (script.hasAttribute("data-manual")) {
            _3.manual = true;
          }
        }
        function highlightAutomaticallyCallback() {
          if (!_3.manual) {
            _3.highlightAll();
          }
        }
        if (!_3.manual) {
          var readyState = document.readyState;
          if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
            document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }
        return _3;
      }(_self);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Prism3;
      }
      if (typeof global !== "undefined") {
        global.Prism = Prism3;
      }
      Prism3.languages.markup = {
        "comment": {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true
        },
        "prolog": {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true
        },
        "doctype": {
          // https://www.w3.org/TR/xml/#NT-doctypedecl
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null
              // see below
            },
            "string": {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
          }
        },
        "cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true
        },
        "tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            "tag": {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                "punctuation": /^<\/?/,
                "namespace": /^[^\s>\/:]+:/
              }
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  {
                    pattern: /^(\s*)["']|["']$/,
                    lookbehind: true
                  }
                ]
              }
            },
            "punctuation": /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                "namespace": /^[^\s>\/:]+:/
              }
            }
          }
        },
        "entity": [
          {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
          },
          /&#x?[\da-f]{1,8};/i
        ]
      };
      Prism3.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism3.languages.markup["entity"];
      Prism3.languages.markup["doctype"].inside["internal-subset"].inside = Prism3.languages.markup;
      Prism3.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });
      Object.defineProperty(Prism3.languages.markup.tag, "addInlined", {
        /**
         * Adds an inlined language to markup.
         *
         * An example of an inlined language is CSS with `<style>` tags.
         *
         * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addInlined('style', 'css');
         */
        value: function addInlined2(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism3.languages[lang]
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism3.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
              return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside
          };
          Prism3.languages.insertBefore("markup", "cdata", def);
        }
      });
      Object.defineProperty(Prism3.languages.markup.tag, "addAttribute", {
        /**
         * Adds an pattern to highlight languages embedded in HTML attributes.
         *
         * An example of an inlined language is CSS with `style` attributes.
         *
         * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addAttribute('style', 'css');
         */
        value: function(attrName, lang) {
          Prism3.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(
              /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
              "i"
            ),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  "value": {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism3.languages[lang]
                  },
                  "punctuation": [
                    {
                      pattern: /^=/,
                      alias: "attr-equals"
                    },
                    /"|'/
                  ]
                }
              }
            }
          });
        }
      });
      Prism3.languages.html = Prism3.languages.markup;
      Prism3.languages.mathml = Prism3.languages.markup;
      Prism3.languages.svg = Prism3.languages.markup;
      Prism3.languages.xml = Prism3.languages.extend("markup", {});
      Prism3.languages.ssml = Prism3.languages.xml;
      Prism3.languages.atom = Prism3.languages.xml;
      Prism3.languages.rss = Prism3.languages.xml;
      (function(Prism4) {
        var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        Prism4.languages.css = {
          "comment": /\/\*[\s\S]*?\*\//,
          "atrule": {
            pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
            inside: {
              "rule": /^@[\w-]+/,
              "selector-function-argument": {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector"
              },
              "keyword": {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              }
              // See rest below
            }
          },
          "url": {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
              "function": /^url/i,
              "punctuation": /^\(|\)$/,
              "string": {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url"
              }
            }
          },
          "selector": {
            pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
          },
          "string": {
            pattern: string,
            greedy: true
          },
          "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
          },
          "important": /!important\b/i,
          "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
          },
          "punctuation": /[(){};:,]/
        };
        Prism4.languages.css["atrule"].inside.rest = Prism4.languages.css;
        var markup = Prism4.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism3);
      Prism3.languages.clike = {
        "comment": [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        "string": {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            "punctuation": /[.\\]/
          }
        },
        "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        "boolean": /\b(?:false|true)\b/,
        "function": /\b\w+(?=\()/,
        "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        "punctuation": /[{}[\];(),.:]/
      };
      Prism3.languages.javascript = Prism3.languages.extend("clike", {
        "class-name": [
          Prism3.languages.clike["class-name"],
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
          }
        ],
        "keyword": [
          {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
          },
          {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
          }
        ],
        // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
        "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        "number": {
          pattern: RegExp(
            /(^|[^\w$])/.source + "(?:" + // constant
            (/NaN|Infinity/.source + "|" + // binary integer
            /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
            /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
            /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
            /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
            /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
          ),
          lookbehind: true
        },
        "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism3.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
      Prism3.languages.insertBefore("javascript", "keyword", {
        "regex": {
          pattern: RegExp(
            // lookbehind
            // eslint-disable-next-line regexp/no-dupe-characters-character-class
            /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
            // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
            // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
            // with the only syntax, so we have to define 2 different regex patterns.
            /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
            /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
            /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism3.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
          }
        },
        // This must be declared before keyword because we use "function" inside the look-forward
        "function-variable": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function"
        },
        "parameter": [
          {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism3.languages.javascript
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism3.languages.javascript
          },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism3.languages.javascript
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism3.languages.javascript
          }
        ],
        "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism3.languages.insertBefore("javascript", "string", {
        "hashbang": {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment"
        },
        "template-string": {
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "interpolation": {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                rest: Prism3.languages.javascript
              }
            },
            "string": /[\s\S]+/
          }
        },
        "string-property": {
          pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property"
        }
      });
      Prism3.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property"
        }
      });
      if (Prism3.languages.markup) {
        Prism3.languages.markup.tag.addInlined("script", "javascript");
        Prism3.languages.markup.tag.addAttribute(
          /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
          "javascript"
        );
      }
      Prism3.languages.js = Prism3.languages.javascript;
      (function() {
        if (typeof Prism3 === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        var LOADING_MESSAGE = "Loading\u2026";
        var FAILURE_MESSAGE = function(status, message) {
          return "\u2716 Error " + status + " while fetching file: " + message;
        };
        var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
        var EXTENSIONS = {
          "js": "javascript",
          "py": "python",
          "rb": "ruby",
          "ps1": "powershell",
          "psm1": "powershell",
          "sh": "bash",
          "bat": "batch",
          "h": "c",
          "tex": "latex"
        };
        var STATUS_ATTR = "data-src-status";
        var STATUS_LOADING = "loading";
        var STATUS_LOADED = "loaded";
        var STATUS_FAILED = "failed";
        var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
        function loadFile(src, success, error2) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                success(xhr.responseText);
              } else {
                if (xhr.status >= 400) {
                  error2(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                } else {
                  error2(FAILURE_EMPTY_MESSAGE);
                }
              }
            }
          };
          xhr.send(null);
        }
        function parseRange(range) {
          var m3 = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
          if (m3) {
            var start2 = Number(m3[1]);
            var comma = m3[2];
            var end = m3[3];
            if (!comma) {
              return [start2, start2];
            }
            if (!end) {
              return [start2, void 0];
            }
            return [start2, Number(end)];
          }
          return void 0;
        }
        Prism3.hooks.add("before-highlightall", function(env) {
          env.selector += ", " + SELECTOR;
        });
        Prism3.hooks.add("before-sanity-check", function(env) {
          var pre = (
            /** @type {HTMLPreElement} */
            env.element
          );
          if (pre.matches(SELECTOR)) {
            env.code = "";
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
            var code = pre.appendChild(document.createElement("CODE"));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute("data-src");
            var language = env.language;
            if (language === "none") {
              var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
              language = EXTENSIONS[extension] || extension;
            }
            Prism3.util.setLanguage(code, language);
            Prism3.util.setLanguage(pre, language);
            var autoloader = Prism3.plugins.autoloader;
            if (autoloader) {
              autoloader.loadLanguages(language);
            }
            loadFile(
              src,
              function(text) {
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                var range = parseRange(pre.getAttribute("data-range"));
                if (range) {
                  var lines = text.split(/\r\n?|\n/g);
                  var start2 = range[0];
                  var end = range[1] == null ? lines.length : range[1];
                  if (start2 < 0) {
                    start2 += lines.length;
                  }
                  start2 = Math.max(0, Math.min(start2 - 1, lines.length));
                  if (end < 0) {
                    end += lines.length;
                  }
                  end = Math.max(0, Math.min(end, lines.length));
                  text = lines.slice(start2, end).join("\n");
                  if (!pre.hasAttribute("data-start")) {
                    pre.setAttribute("data-start", String(start2 + 1));
                  }
                }
                code.textContent = text;
                Prism3.highlightElement(code);
              },
              function(error2) {
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                code.textContent = error2;
              }
            );
          }
        });
        Prism3.plugins.fileHighlight = {
          /**
           * Executes the File Highlight plugin for all matching `pre` elements under the given container.
           *
           * Note: Elements which are already loaded or currently loading will not be touched by this method.
           *
           * @param {ParentNode} [container=document]
           */
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for (var i6 = 0, element; element = elements[i6++]; ) {
              Prism3.highlightElement(element);
            }
          }
        };
        var logged = false;
        Prism3.fileHighlight = function() {
          if (!logged) {
            console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
            logged = true;
          }
          Prism3.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();
    }
  });

  // node_modules/container-query-polyfill/dist/container-query-polyfill.modern.js
  function e() {
    return e = Object.assign ? Object.assign.bind() : function(e11) {
      for (var t7 = 1; t7 < arguments.length; t7++) {
        var n7 = arguments[t7];
        for (var r9 in n7)
          Object.prototype.hasOwnProperty.call(n7, r9) && (e11[r9] = n7[r9]);
      }
      return e11;
    }, e.apply(this, arguments);
  }
  function t(e11, t7) {
    const n7 = t7.width, r9 = t7.height, u5 = t7.inlineSize, o9 = t7.blockSize;
    switch (e11) {
      case 1:
        return null != n7 ? { type: 3, value: n7, unit: "px" } : { type: 1 };
      case 3:
        return null != u5 ? { type: 3, value: u5, unit: "px" } : { type: 1 };
      case 2:
        return null != r9 ? { type: 3, value: r9, unit: "px" } : { type: 1 };
      case 4:
        return null != o9 ? { type: 3, value: o9, unit: "px" } : { type: 1 };
      case 5:
        return null != n7 && null != r9 && r9 > 0 ? { type: 2, value: n7 / r9 } : { type: 1 };
      case 6:
        return null != n7 && null != r9 ? { type: 4, value: r9 >= n7 ? "portrait" : "landscape" } : { type: 1 };
    }
  }
  function n(e11, t7) {
    switch (e11.type) {
      case 1:
      case 2:
      case 3:
      case 4:
        return i(e11, t7);
      case 5: {
        const n7 = t7.sizeFeatures.get(e11.feature);
        return null == n7 ? { type: 1 } : n7;
      }
      case 6:
        return e11.value;
    }
  }
  function r(e11) {
    return { type: 5, value: e11 };
  }
  function u(e11, t7, n7) {
    return r(function(e12, t8, n8) {
      switch (n8) {
        case 1:
          return e12 === t8;
        case 2:
          return e12 > t8;
        case 3:
          return e12 >= t8;
        case 4:
          return e12 < t8;
        case 5:
          return e12 <= t8;
      }
    }(e11, t7, n7));
  }
  function o(e11, t7, n7) {
    return null == e11 ? t7 : null == t7 ? e11 : n7(e11, t7);
  }
  function s(e11, t7) {
    switch (e11) {
      case "cqw":
        return t7.cqw;
      case "cqh":
        return t7.cqh;
      case "cqi":
        return 0 === t7.writingAxis ? t7.cqw : t7.cqh;
      case "cqb":
        return 1 === t7.writingAxis ? t7.cqw : t7.cqh;
      case "cqmin":
        return o(s("cqi", t7), s("cqb", t7), Math.min);
      case "cqmax":
        return o(s("cqi", t7), s("cqb", t7), Math.max);
    }
  }
  function l(e11, { treeContext: t7 }) {
    switch (e11.unit) {
      case "px":
        return e11.value;
      case "rem":
        return e11.value * t7.rootFontSize;
      case "em":
        return e11.value * t7.fontSize;
      case "cqw":
      case "cqh":
      case "cqi":
      case "cqb":
      case "cqmin":
      case "cqmax":
        return o(e11.value, s(e11.unit, t7), (e12, t8) => e12 * t8);
    }
    return null;
  }
  function c(e11, t7) {
    switch (e11.type) {
      case 2:
        return 0 === e11.value ? 0 : null;
      case 3:
        return l(e11, t7);
    }
    return null;
  }
  function i(e11, t7) {
    switch (e11.type) {
      case 4:
        return function(e12, t8) {
          const o9 = n(e12.left, t8), s6 = n(e12.right, t8), l5 = e12.operator;
          if (4 === o9.type && 4 === s6.type || 5 === o9.type && 5 === s6.type)
            return function(e13, t9, n7) {
              return 1 === n7 ? r(e13.value === t9.value) : { type: 1 };
            }(o9, s6, l5);
          if (3 === o9.type || 3 === s6.type) {
            const e13 = c(o9, t8), n7 = c(s6, t8);
            if (null != e13 && null != n7)
              return u(e13, n7, l5);
          } else if (2 === o9.type && 2 === s6.type)
            return u(o9.value, s6.value, l5);
          return { type: 1 };
        }(e11, t7);
      case 2:
        return function(e12, t8) {
          const n7 = i(e12.left, t8);
          return 5 !== n7.type || true !== n7.value ? n7 : i(e12.right, t8);
        }(e11, t7);
      case 3:
        return function(e12, t8) {
          const n7 = i(e12.left, t8);
          return 5 === n7.type && true === n7.value ? n7 : i(e12.right, t8);
        }(e11, t7);
      case 1: {
        const n7 = i(e11.value, t7);
        return 5 === n7.type ? { type: 5, value: !n7.value } : { type: 1 };
      }
      case 5:
        return a(n(e11, t7));
      case 6:
        return a(e11.value);
    }
  }
  function a(e11) {
    switch (e11.type) {
      case 5:
        return e11;
      case 2:
      case 3:
        return { type: 5, value: e11.value > 0 };
    }
    return { type: 1 };
  }
  var f = Array.from({ length: 4 }, () => Math.floor(256 * Math.random()).toString(16)).join("");
  var p = S("container");
  var y = S("container-type");
  var h = S("container-name");
  var v = `data-cqs-${f}`;
  var d = `data-cqc-${f}`;
  var m = S("cqw");
  var w = S("cqh");
  var g = S("cqi");
  var b = S("cqb");
  function S(e11) {
    return `--cq-${e11}-${f}`;
  }
  var x = Symbol();
  function q(e11, t7) {
    const n7 = { value: t7, errorIndices: [], index: -1, at(r9) {
      const u5 = n7.index + r9;
      return u5 >= e11.length ? t7 : e11[u5];
    }, consume: (e12) => (n7.index += e12, n7.value = n7.at(0), n7.value), reconsume() {
      n7.index -= 1;
    }, error() {
      n7.errorIndices.push(n7.index);
    } };
    return n7;
  }
  function C(e11) {
    return q(e11, { type: 0 });
  }
  function* $(e11) {
    const t7 = [];
    let n7 = false;
    for (const r10 of e11) {
      const e12 = r10.codePointAt(0);
      n7 && 10 !== e12 && (n7 = false, t7.push(10)), 0 === e12 || e12 >= 55296 && e12 <= 57343 ? t7.push(65533) : 13 === e12 ? n7 = true : t7.push(e12);
    }
    const r9 = q(t7, -1), { at: u5, consume: o9, error: s6, reconsume: l5 } = r9;
    function c5() {
      return String.fromCodePoint(r9.value);
    }
    function i6() {
      return { type: 13, value: c5() };
    }
    function a5() {
      for (; z(u5(1)); )
        o9(1);
    }
    function f4() {
      for (; -1 !== r9.value; )
        if (o9(1), 42 === u5(0) && 47 === u5(1))
          return void o9(1);
      s6();
    }
    function p4() {
      const [e12, t8] = function() {
        let e13 = 0, t9 = "", n9 = u5(1);
        for (43 !== n9 && 45 !== n9 || (o9(1), t9 += c5()); k(u5(1)); )
          o9(1), t9 += c5();
        if (46 === u5(1) && k(u5(2)))
          for (e13 = 1, o9(1), t9 += c5(); k(u5(1)); )
            o9(1), t9 += c5();
        if (n9 = u5(1), 69 === n9 || 101 === n9) {
          const n10 = u5(2);
          if (k(n10))
            for (e13 = 1, o9(1), t9 += c5(); k(u5(1)); )
              o9(1), t9 += c5();
          else if ((45 === n10 || 43 === n10) && k(u5(3)))
            for (e13 = 1, o9(1), t9 += c5(), o9(1), t9 += c5(); k(u5(1)); )
              o9(1), t9 += c5();
        }
        return [t9, e13];
      }(), n8 = u5(1);
      return d4(n8, u5(1), u5(2)) ? { type: 15, value: e12, flag: t8, unit: w3() } : 37 === n8 ? (o9(1), { type: 16, value: e12 }) : { type: 17, value: e12, flag: t8 };
    }
    function y4() {
      const e12 = w3();
      let t8 = u5(1);
      if ("url" === e12.toLowerCase() && 40 === t8) {
        for (o9(1); z(u5(1)) && z(u5(2)); )
          o9(1);
        t8 = u5(1);
        const n8 = u5(2);
        return 34 === t8 || 39 === t8 ? { type: 23, value: e12 } : !z(t8) || 34 !== n8 && 39 !== n8 ? function() {
          let e13 = "";
          for (a5(); ; ) {
            const n9 = o9(1);
            if (41 === n9)
              return { type: 20, value: e13 };
            if (-1 === n9)
              return s6(), { type: 20, value: e13 };
            if (z(n9)) {
              a5();
              const t10 = u5(1);
              return 41 === t10 || -1 === t10 ? (o9(1), -1 === n9 && s6(), { type: 20, value: e13 }) : (g3(), { type: 21 });
            }
            if (34 === n9 || 39 === n9 || 40 === n9 || (t9 = n9) >= 0 && t9 <= 8 || 11 === t9 || t9 >= 14 && t9 <= 31 || 127 === t9)
              return s6(), g3(), { type: 21 };
            if (92 === n9) {
              if (!j(n9, u5(1)))
                return s6(), { type: 21 };
              e13 += v3();
            } else
              e13 += c5();
          }
          var t9;
        }() : { type: 23, value: e12 };
      }
      return 40 === t8 ? (o9(1), { type: 23, value: e12 }) : { type: 24, value: e12 };
    }
    function h4(e12) {
      let t8 = "";
      for (; ; ) {
        const n8 = o9(1);
        if (-1 === n8 || n8 === e12)
          return -1 === n8 && s6(), { type: 2, value: t8 };
        if (E(n8))
          return s6(), l5(), { type: 3 };
        if (92 === n8) {
          const e13 = u5(1);
          if (-1 === e13)
            continue;
          E(e13) ? o9(1) : t8 += v3();
        } else
          t8 += c5();
      }
    }
    function v3() {
      const e12 = o9(1);
      if (A(e12)) {
        const t8 = [e12];
        for (let e13 = 0; e13 < 5; e13++) {
          const e14 = u5(1);
          if (!A(e14))
            break;
          t8.push(e14), o9(1);
        }
        z(u5(1)) && o9(1);
        let n8 = parseInt(String.fromCodePoint(...t8), 16);
        return (0 === n8 || n8 >= 55296 && n8 <= 57343 || n8 > 1114111) && (n8 = 65533), String.fromCodePoint(n8);
      }
      return -1 === e12 ? (s6(), String.fromCodePoint(65533)) : c5();
    }
    function d4(e12, t8, n8) {
      return 45 === e12 ? L(t8) || 45 === t8 || j(t8, n8) : !!L(e12);
    }
    function m3(e12, t8, n8) {
      return 43 === e12 || 45 === e12 ? k(t8) || 46 === t8 && k(n8) : !(46 !== e12 || !k(t8)) || !!k(e12);
    }
    function w3() {
      let e12 = "";
      for (; ; ) {
        const t8 = o9(1);
        if (M(t8))
          e12 += c5();
        else {
          if (!j(t8, u5(1)))
            return l5(), e12;
          e12 += v3();
        }
      }
    }
    function g3() {
      for (; ; ) {
        const e12 = o9(1);
        if (-1 === e12)
          return;
        j(e12, u5(1)) && v3();
      }
    }
    for (; ; ) {
      const e12 = o9(1);
      if (47 === e12 && 42 === u5(1))
        o9(2), f4();
      else if (z(e12))
        a5(), yield { type: 1 };
      else if (34 === e12)
        yield h4(e12);
      else if (35 === e12) {
        const e13 = u5(1);
        M(e13) || j(e13, u5(2)) ? yield { type: 14, flag: d4(u5(1), u5(2), u5(3)) ? 1 : 0, value: w3() } : yield i6();
      } else if (39 === e12)
        yield h4(e12);
      else if (40 === e12)
        yield { type: 4 };
      else if (41 === e12)
        yield { type: 5 };
      else if (43 === e12)
        m3(e12, u5(1), u5(2)) ? (l5(), yield p4()) : yield i6();
      else if (44 === e12)
        yield { type: 6 };
      else if (45 === e12) {
        const t8 = u5(1), n8 = u5(2);
        m3(e12, t8, n8) ? (l5(), yield p4()) : 45 === t8 && 62 === n8 ? (o9(2), yield { type: 19 }) : d4(e12, t8, n8) ? (l5(), yield y4()) : yield i6();
      } else if (46 === e12)
        m3(e12, u5(1), u5(2)) ? (l5(), yield p4()) : yield i6();
      else if (58 === e12)
        yield { type: 7 };
      else if (59 === e12)
        yield { type: 8 };
      else if (60 === e12)
        33 === u5(1) && 45 === u5(2) && 45 === u5(3) ? yield { type: 18 } : yield i6();
      else if (64 === e12)
        if (d4(u5(1), u5(2), u5(3))) {
          const e13 = w3();
          yield { type: 22, value: e13 };
        } else
          yield i6();
      else if (91 === e12)
        yield { type: 9 };
      else if (92 === e12)
        j(e12, u5(1)) ? (l5(), yield y4()) : (s6(), yield i6());
      else if (93 === e12)
        yield { type: 10 };
      else if (123 === e12)
        yield { type: 11 };
      else if (125 === e12)
        yield { type: 12 };
      else if (k(e12))
        l5(), yield p4();
      else if (L(e12))
        l5(), yield y4();
      else {
        if (-1 === e12)
          return yield { type: 0 }, r9.errorIndices;
        yield { type: 13, value: c5() };
      }
    }
  }
  function k(e11) {
    return e11 >= 48 && e11 <= 57;
  }
  function A(e11) {
    return k(e11) || e11 >= 65 && e11 <= 70 || e11 >= 97 && e11 <= 102;
  }
  function E(e11) {
    return 10 === e11 || 13 === e11 || 12 === e11;
  }
  function z(e11) {
    return E(e11) || 9 === e11 || 32 === e11;
  }
  function L(e11) {
    return e11 >= 65 && e11 <= 90 || e11 >= 97 && e11 <= 122 || e11 >= 128 || 95 === e11;
  }
  function j(e11, t7) {
    return 92 === e11 && !E(t7);
  }
  function M(e11) {
    return L(e11) || k(e11) || 45 === e11;
  }
  var T = { 11: 12, 9: 10, 4: 5 };
  function P(t7, n7) {
    const r9 = function(e11, t8) {
      const n8 = [];
      for (; ; )
        switch (e11.consume(1).type) {
          case 1:
            break;
          case 0:
            return { type: 3, value: n8 };
          case 18:
          case 19:
            if (false !== t8) {
              e11.reconsume();
              const t9 = R(e11);
              t9 !== x && n8.push(t9);
            }
            break;
          case 22:
            e11.reconsume(), n8.push(U(e11));
            break;
          default: {
            e11.reconsume();
            const t9 = R(e11);
            t9 !== x && n8.push(t9);
            break;
          }
        }
    }(C(t7), true === n7);
    return e({}, r9, { value: r9.value.map((t8) => 26 === t8.type ? function(t9, n8) {
      return 0 === t9.value.value.type ? e({}, t9, { value: e({}, t9.value, { value: O(t9.value.value.value) }) }) : t9;
    }(t8) : t8) });
  }
  function N(e11) {
    const t7 = C(e11), n7 = [];
    for (; ; ) {
      if (0 === t7.consume(1).type)
        return n7;
      t7.reconsume(), n7.push(Q(t7));
    }
  }
  function O(e11) {
    return function(e12) {
      const t7 = [], n7 = [];
      for (; ; ) {
        const r9 = e12.consume(1);
        switch (r9.type) {
          case 1:
          case 8:
            break;
          case 0:
            return { type: 1, value: [...n7, ...t7] };
          case 22:
            e12.reconsume(), t7.push(U(e12));
            break;
          case 24: {
            const t8 = [r9];
            let u5 = e12.at(1);
            for (; 8 !== u5.type && 0 !== u5.type; )
              t8.push(Q(e12)), u5 = e12.at(1);
            const o9 = I(C(t8));
            o9 !== x && n7.push(o9);
            break;
          }
          case 13:
            if ("&" === r9.value) {
              e12.reconsume();
              const n8 = R(e12);
              n8 !== x && t7.push(n8);
              break;
            }
          default: {
            e12.error(), e12.reconsume();
            let t8 = e12.at(1);
            for (; 8 !== t8.type && 0 !== t8.type; )
              Q(e12), t8 = e12.at(1);
            break;
          }
        }
      }
    }(C(e11));
  }
  function F(e11) {
    for (; 1 === e11.at(1).type; )
      e11.consume(1);
  }
  function U(e11) {
    let t7 = e11.consume(1);
    if (22 !== t7.type)
      throw new Error(`Unexpected type ${t7.type}`);
    const n7 = t7.value, r9 = [];
    for (; ; )
      switch (t7 = e11.consume(1), t7.type) {
        case 8:
          return { type: 25, name: n7, prelude: r9, value: null };
        case 0:
          return e11.error(), { type: 25, name: n7, prelude: r9, value: null };
        case 11:
          return { type: 25, name: n7, prelude: r9, value: H(e11) };
        case 28:
          if (11 === t7.source.type)
            return { type: 25, name: n7, prelude: r9, value: t7 };
        default:
          e11.reconsume(), r9.push(Q(e11));
      }
  }
  function R(e11) {
    let t7 = e11.value;
    const n7 = [];
    for (; ; )
      switch (t7 = e11.consume(1), t7.type) {
        case 0:
          return e11.error(), x;
        case 11:
          return { type: 26, prelude: n7, value: H(e11) };
        case 28:
          if (11 === t7.source.type)
            return { type: 26, prelude: n7, value: t7 };
        default:
          e11.reconsume(), n7.push(Q(e11));
      }
  }
  function I(e11) {
    const t7 = e11.consume(1);
    if (24 !== t7.type)
      throw new Error(`Unexpected type ${t7.type}`);
    const n7 = t7.value, r9 = [];
    let u5 = false;
    if (F(e11), 7 !== e11.at(1).type)
      return e11.error(), x;
    for (e11.consume(1), F(e11); 0 !== e11.at(1).type; )
      r9.push(Q(e11));
    const o9 = r9[r9.length - 2], s6 = r9[r9.length - 1];
    return o9 && 13 === o9.type && "!" === o9.value && 24 === s6.type && "important" === s6.value.toLowerCase() && (u5 = true, r9.splice(r9.length - 2)), { type: 29, name: n7, value: r9, important: u5 };
  }
  function Q(e11) {
    const t7 = e11.consume(1);
    switch (t7.type) {
      case 11:
      case 9:
      case 4:
        return H(e11);
      case 23:
        return function(e12) {
          let t8 = e12.value;
          if (23 !== t8.type)
            throw new Error(`Unexpected type ${t8.type}`);
          const n7 = t8.value, r9 = [];
          for (; ; )
            switch (t8 = e12.consume(1), t8.type) {
              case 5:
                return { type: 27, name: n7, value: r9 };
              case 0:
                return e12.error(), { type: 27, name: n7, value: r9 };
              default:
                e12.reconsume(), r9.push(Q(e12));
            }
        }(e11);
      default:
        return t7;
    }
  }
  function H(e11) {
    let t7 = e11.value;
    const n7 = t7, r9 = T[n7.type];
    if (!r9)
      throw new Error(`Unexpected type ${t7.type}`);
    const u5 = [];
    for (; ; )
      switch (t7 = e11.consume(1), t7.type) {
        case r9:
          return { type: 28, source: n7, value: { type: 0, value: u5 } };
        case 0:
          return e11.error(), { type: 28, source: n7, value: { type: 0, value: u5 } };
        default:
          e11.reconsume(), u5.push(Q(e11));
      }
  }
  function V(e11) {
    return F(e11), 0 === e11.at(1).type;
  }
  var D = { 11: ["{", "}"], 9: ["[", "]"], 4: ["(", ")"] };
  function W(e11, t7) {
    switch (e11.type) {
      case 25:
        return `@${CSS.escape(e11.name)} ${e11.prelude.map((e12) => W(e12)).join("")}${e11.value ? W(e11.value) : ";"}`;
      case 26:
        return `${e11.prelude.map((e12) => W(e12)).join("")}${W(e11.value)}`;
      case 28: {
        const [t8, n7] = D[e11.source.type];
        return `${t8}${_(e11.value)}${n7}`;
      }
      case 27:
        return `${CSS.escape(e11.name)}(${e11.value.map((e12) => W(e12)).join("")})`;
      case 29:
        return `${CSS.escape(e11.name)}:${e11.value.map((e12) => W(e12)).join("")}${e11.important ? " !important" : ""}`;
      case 1:
        return " ";
      case 8:
        return ";";
      case 7:
        return ":";
      case 14:
        return "#" + CSS.escape(e11.value);
      case 24:
        return CSS.escape(e11.value);
      case 15:
        return e11.value + CSS.escape(e11.unit);
      case 13:
      case 17:
        return e11.value;
      case 2:
        return `"${CSS.escape(e11.value)}"`;
      case 6:
        return ",";
      case 20:
        return "url(" + CSS.escape(e11.value) + ")";
      case 22:
        return "@" + CSS.escape(e11.value);
      case 16:
        return e11.value + "%";
      default:
        throw new Error(`Unsupported token ${e11.type}`);
    }
  }
  function _(e11, t7) {
    return e11.value.map((t8) => {
      let n7 = W(t8);
      return 29 === t8.type && 0 !== e11.type && (n7 += ";"), n7;
    }).join("");
  }
  function B(e11) {
    return W(e11);
  }
  function G(e11) {
    const t7 = e11.at(1);
    return 13 === t7.type && "=" === t7.value && (e11.consume(1), true);
  }
  function Y(e11, t7) {
    const n7 = [];
    for (; ; ) {
      const r9 = e11.at(1);
      if (0 === r9.type || t7 && 7 === r9.type || 13 === r9.type && (">" === r9.value || "<" === r9.value || "=" === r9.value))
        break;
      n7.push(e11.consume(1));
    }
    return n7;
  }
  function J(e11) {
    F(e11);
    const t7 = e11.consume(1);
    return 13 !== t7.type ? x : ">" === t7.value ? G(e11) ? 3 : 2 : "<" === t7.value ? G(e11) ? 5 : 4 : "=" === t7.value ? 1 : x;
  }
  function K(e11) {
    return 4 === e11 || 5 === e11;
  }
  function X(e11) {
    return 2 === e11 || 3 === e11;
  }
  function Z(e11, t7, n7) {
    const r9 = function(e12) {
      F(e12);
      const t8 = e12.consume(1);
      return F(e12), 24 !== t8.type || 0 !== e12.at(1).type ? x : t8.value;
    }(C(e11));
    if (r9 === x)
      return x;
    let u5 = r9.toLowerCase();
    return u5 = n7 ? n7(u5) : u5, t7.has(u5) ? u5 : x;
  }
  function ee(e11) {
    return { type: 13, value: e11 };
  }
  function te(e11, t7) {
    return { type: 29, name: e11, value: t7, important: false };
  }
  function ne(e11) {
    return { type: 24, value: e11 };
  }
  function re(e11, t7) {
    return { type: 27, name: e11, value: t7 };
  }
  function ue(e11) {
    return re("var", [ne(e11)]);
  }
  function oe(e11, t7) {
    F(e11);
    let n7 = false, r9 = e11.at(1);
    if (24 === r9.type) {
      if ("not" !== r9.value.toLowerCase())
        return x;
      e11.consume(1), F(e11), n7 = true;
    }
    let u5 = function(e12) {
      const t8 = e12.consume(1);
      switch (t8.type) {
        case 28: {
          if (4 !== t8.source.type)
            return x;
          const e13 = oe(C(t8.value.value), null);
          return e13 !== x ? e13 : { type: 4, value: t8 };
        }
        case 27:
          return { type: 4, value: t8 };
        default:
          return x;
      }
    }(e11);
    if (u5 === x)
      return x;
    u5 = n7 ? { type: 1, value: u5 } : u5, F(e11), r9 = e11.at(1);
    const o9 = 24 === r9.type ? r9.value.toLowerCase() : null;
    if (null !== o9) {
      if (e11.consume(1), F(e11), "and" !== o9 && "or" !== o9 || null !== t7 && o9 !== t7)
        return x;
      const n8 = oe(e11, o9);
      return n8 === x ? x : { type: "and" === o9 ? 2 : 3, left: u5, right: n8 };
    }
    return V(e11) ? u5 : x;
  }
  function se(e11) {
    return oe(e11, null);
  }
  function le(e11) {
    switch (e11.type) {
      case 1:
        return [ne("not"), { type: 1 }, ...le(e11.value)];
      case 2:
      case 3:
        return [...le(e11.left), { type: 1 }, ne(2 === e11.type ? "and" : "or"), { type: 1 }, ...le(e11.right)];
      case 4:
        return [e11.value];
    }
  }
  var ce = { width: 1, height: 2, "inline-size": 3, "block-size": 4, "aspect-ratio": 5, orientation: 6 };
  var ie = new Set(Object.keys(ce));
  var ae = /* @__PURE__ */ new Set(["none", "and", "not", "or", "normal", "auto"]);
  var fe = /* @__PURE__ */ new Set(["initial", "inherit", "revert", "revert-layer", "unset"]);
  var pe = /* @__PURE__ */ new Set(["size", "inline-size"]);
  function ye(e11, t7, n7, r9) {
    const u5 = n7();
    if (u5 === x)
      return x;
    let o9 = [u5, null];
    F(e11);
    const s6 = e11.at(1);
    if (13 === s6.type) {
      if (s6.value !== t7)
        return x;
      e11.consume(1), F(e11);
      const n8 = r9();
      F(e11), n8 !== x && (o9 = [u5, n8]);
    }
    return V(e11) ? o9 : x;
  }
  function he(e11) {
    const t7 = e11.consume(1);
    return 17 === t7.type ? parseInt(t7.value) : x;
  }
  function ve(e11) {
    const t7 = C(e11);
    F(t7);
    const n7 = t7.consume(1);
    let r9 = x;
    switch (n7.type) {
      case 17:
        t7.reconsume(), r9 = function(e12) {
          const t8 = ye(e12, "/", () => he(e12), () => he(e12));
          return t8 === x ? x : { type: 2, value: t8[0] / (null !== t8[1] ? t8[1] : 1) };
        }(t7);
        break;
      case 15:
        r9 = { type: 3, value: parseInt(n7.value), unit: n7.unit.toLowerCase() };
        break;
      case 24: {
        const e12 = n7.value.toLowerCase();
        switch (e12) {
          case "landscape":
          case "portrait":
            r9 = { type: 4, value: e12 };
        }
      }
    }
    return r9 === x ? x : V(t7) ? { type: 6, value: r9 } : x;
  }
  function de(e11) {
    return !ge(e11 = e11.toLowerCase()) && !ae.has(e11);
  }
  function me(e11, t7) {
    const n7 = [];
    for (; ; ) {
      F(e11);
      const r9 = e11.at(1);
      if (24 !== r9.type || !t7(r9.value))
        return n7;
      e11.consume(1), n7.push(r9.value);
    }
  }
  function we(e11) {
    const t7 = [];
    for (; ; ) {
      F(e11);
      const n7 = e11.at(1);
      if (24 !== n7.type)
        break;
      const r9 = n7.value;
      if (!de(r9))
        break;
      e11.consume(1), t7.push(r9);
    }
    return t7;
  }
  function ge(e11) {
    return fe.has(e11);
  }
  function be(e11) {
    return e11.map((e12) => "cq-" + e12);
  }
  function Se(e11) {
    const t7 = me(e11, (e12) => ge(e12));
    return 1 === t7.length ? be(t7) : x;
  }
  function xe(e11, t7) {
    const n7 = me(e11, (e12) => "none" === e12);
    if (1 === n7.length)
      return be(n7);
    if (0 !== n7.length)
      return x;
    if (t7) {
      const t8 = Se(e11);
      if (t8 !== x)
        return t8;
    }
    const r9 = we(e11);
    return r9.length > 0 && (!t7 || V(e11)) ? r9 : x;
  }
  function qe(e11, t7) {
    if (t7) {
      const t8 = Se(e11);
      if (t8 !== x)
        return t8;
    }
    return function(e12) {
      const t8 = me(e12, (e13) => "normal" === e13);
      if (1 === t8.length)
        return be(t8);
      if (0 !== t8.length)
        return x;
      const n7 = me(e12, (e13) => pe.has(e13));
      return n7.length > 0 && V(e12) ? n7 : x;
    }(e11);
  }
  function Ce(e11) {
    const t7 = C(e11), n7 = Se(t7);
    if (n7 !== x)
      return [n7, n7];
    const r9 = ye(t7, "/", () => xe(t7, false), () => qe(t7, false));
    return r9 !== x && V(t7) ? [r9[0], r9[1] || []] : x;
  }
  function $e(e11) {
    const t7 = C(e11), n7 = we(t7);
    if (!n7 || n7.length > 1)
      return x;
    const r9 = se(t7);
    if (r9 === x)
      return x;
    const u5 = { features: /* @__PURE__ */ new Set() }, o9 = ke(r9, u5);
    return V(t7) ? { name: n7.length > 0 ? n7[0] : null, condition: o9, features: u5.features } : x;
  }
  function ke(e11, t7) {
    switch (e11.type) {
      case 1:
        return { type: 1, value: ke(e11.value, t7) };
      case 2:
      case 3:
        return { type: 2 === e11.type ? 2 : 3, left: ke(e11.left, t7), right: ke(e11.right, t7) };
      case 4:
        if (28 === e11.value.type) {
          const n7 = function(e12, t8) {
            const n8 = function(e13, t9) {
              const n9 = Y(e13, true), r10 = e13.at(1);
              if (0 === r10.type) {
                const e14 = Z(n9, t9);
                return e14 !== x && t9.has(e14) ? { type: 1, feature: e14 } : x;
              }
              if (7 === r10.type) {
                e13.consume(1);
                const r11 = Y(e13, false);
                let u6 = 1;
                const o10 = Z(n9, t9, (e14) => e14.startsWith("min-") ? (u6 = 3, e14.substring(4)) : e14.startsWith("max-") ? (u6 = 5, e14.substring(4)) : e14);
                return o10 !== x ? { type: 2, feature: o10, bounds: [null, [u6, r11]] } : x;
              }
              const u5 = J(e13);
              if (u5 === x)
                return x;
              const o9 = Y(e13, false);
              if (0 === e13.at(1).type) {
                const e14 = Z(n9, t9);
                if (e14 !== x)
                  return { type: 2, feature: e14, bounds: [null, [u5, o9]] };
                const r11 = Z(o9, t9);
                return r11 !== x ? { type: 2, feature: r11, bounds: [[u5, n9], null] } : x;
              }
              const s6 = J(e13);
              if (s6 === x || !(X(u5) && X(s6) || K(u5) && K(s6)))
                return x;
              const l5 = Y(e13, false), c5 = Z(o9, t9);
              return c5 !== x ? { type: 2, feature: c5, bounds: [[u5, n9], [s6, l5]] } : x;
            }(e12, ie);
            if (n8 === x)
              return x;
            const r9 = ce[n8.feature];
            if (null == r9)
              return x;
            if (t8.features.add(r9), 1 === n8.type)
              return { type: 5, feature: r9 };
            {
              const e13 = { type: 5, feature: r9 };
              let t9 = x;
              if (null !== n8.bounds[0]) {
                const r10 = ve(n8.bounds[0][1]);
                if (r10 === x)
                  return x;
                t9 = { type: 4, operator: n8.bounds[0][0], left: r10, right: e13 };
              }
              if (null !== n8.bounds[1]) {
                const r10 = ve(n8.bounds[1][1]);
                if (r10 === x)
                  return x;
                const u5 = { type: 4, operator: n8.bounds[1][0], left: e13, right: r10 };
                t9 = t9 !== x ? { type: 2, left: t9, right: u5 } : u5;
              }
              return t9;
            }
          }(C(e11.value.value.value), t7);
          if (n7 !== x)
            return n7;
        }
        return { type: 6, value: { type: 1 } };
    }
  }
  var Ae = 0;
  var Ee = { cqw: m, cqh: w, cqi: g, cqb: b };
  var ze = CSS.supports("selector(:where(div))");
  var Le = ":not(.container-query-polyfill)";
  N(Array.from($(Le)));
  var je = document.createElement("div");
  var Me = /* @__PURE__ */ new Set(["before", "after", "first-line", "first-letter"]);
  function Te(e11, t7) {
    return re("calc", [{ type: 17, flag: e11.flag, value: e11.value }, ee("*"), t7]);
  }
  function Pe(t7) {
    return t7.map((t8) => {
      switch (t8.type) {
        case 15:
          return function(e11) {
            const t9 = e11.unit, n7 = Ee[t9];
            return null != n7 ? Te(e11, ue(n7)) : "cqmin" === t9 || "cqmax" === t9 ? Te(e11, re(e11.unit.slice(2), [ue(g), { type: 6 }, ue(b)])) : e11;
          }(t8);
        case 27:
          return e({}, t8, { value: Pe(t8.value) });
      }
      return t8;
    });
  }
  function Ne(t7) {
    switch (t7.name) {
      case "container":
        return Ce(t7.value) ? e({}, t7, { name: p }) : t7;
      case "container-name":
        return xe(C(t7.value), true) ? e({}, t7, { name: h }) : t7;
      case "container-type":
        return null != qe(C(t7.value), true) ? e({}, t7, { name: y }) : t7;
    }
    return e({}, t7, { value: Pe(t7.value) });
  }
  function Oe(t7, n7) {
    return e({}, t7, { value: t7.value.map((t8) => {
      switch (t8.type) {
        case 25:
          return He(t8, n7);
        case 26:
          return function(t9, n8) {
            return n8.transformStyleRule(e({}, t9, { value: Re(t9.value, n8) }));
          }(t8, n7);
        default:
          return t8;
      }
    }) });
  }
  function Fe(e11) {
    return 0 === e11.type || 6 === e11.type;
  }
  function Ue(e11) {
    for (let t7 = e11.length - 1; t7 >= 0; t7--)
      if (1 !== e11[t7].type)
        return e11.slice(0, t7 + 1);
    return e11;
  }
  function Re(t7, n7) {
    return function(t8, n8) {
      const r9 = [];
      let u5 = null, o9 = null;
      for (const e11 of t8.value.value)
        switch (e11.type) {
          case 25:
            {
              const t9 = n8 ? n8(e11) : e11;
              t9 && r9.push(t9);
            }
            break;
          case 29: {
            const t9 = Ne(e11);
            switch (t9.name) {
              case p: {
                const t10 = Ce(e11.value);
                t10 !== x && (u5 = t10[0], o9 = t10[1]);
                break;
              }
              case h: {
                const t10 = xe(C(e11.value), true);
                t10 !== x && (u5 = t10);
                break;
              }
              case y: {
                const t10 = qe(C(e11.value), true);
                t10 !== x && (o9 = t10);
                break;
              }
              default:
                r9.push(t9);
            }
          }
        }
      return u5 && u5.length > 0 && r9.push(te(h, [ne(u5.join(" "))])), o9 && o9.length > 0 && r9.push(te(y, [ne(o9.join(" "))])), e({}, t8, { value: { type: 2, value: r9 } });
    }(t7, (e11) => He(e11, n7));
  }
  function Ie(t7) {
    if (1 === t7.type)
      return e({}, t7, { value: Ie(t7.value) });
    if (2 === t7.type || 3 === t7.type)
      return e({}, t7, { left: Ie(t7.left), right: Ie(t7.right) });
    if (4 === t7.type && 28 === t7.value.type) {
      const n7 = function(e11) {
        const t8 = C(e11);
        return F(t8), 24 !== t8.at(1).type ? x : I(t8) || x;
      }(t7.value.value.value);
      if (n7 !== x)
        return e({}, t7, { value: e({}, t7.value, { value: { type: 0, value: [Ne(n7)] } }) });
    }
    return t7;
  }
  function Qe(t7, n7) {
    let r9 = se(C(t7.prelude));
    return r9 = r9 !== x ? Ie(r9) : x, e({}, t7, { prelude: r9 !== x ? le(r9) : t7.prelude, value: t7.value ? e({}, t7.value, { value: Oe(P(t7.value.value.value), n7) }) : null });
  }
  function He(t7, n7) {
    switch (t7.name.toLocaleLowerCase()) {
      case "media":
      case "layer":
        return function(t8, n8) {
          return e({}, t8, { value: t8.value ? e({}, t8.value, { value: Oe(P(t8.value.value.value), n8) }) : null });
        }(t7, n7);
      case "keyframes":
        return function(t8, n8) {
          let r9 = null;
          return t8.value && (r9 = e({}, t8.value, { value: { type: 3, value: P(t8.value.value.value).value.map((t9) => {
            switch (t9.type) {
              case 26:
                return function(t10, n9) {
                  return e({}, t10, { value: Re(t10.value, n9) });
                }(t9, n8);
              case 25:
                return He(t9, n8);
            }
          }) } })), e({}, t8, { value: r9 });
        }(t7, n7);
      case "supports":
        return Qe(t7, n7);
      case "container":
        return function(t8, n8) {
          if (t8.value) {
            const r9 = $e(t8.prelude);
            if (r9 !== x) {
              const u5 = { rule: r9, selector: null, parent: n8.parent, uid: "c" + Ae++ }, o9 = /* @__PURE__ */ new Set(), s6 = [], l5 = Oe(P(t8.value.value.value), { descriptors: n8.descriptors, parent: u5, transformStyleRule: (t9) => {
                const [n9, r10] = function(e11, t10, n10) {
                  const r11 = C(e11), u6 = [], o10 = [];
                  for (; ; ) {
                    if (0 === r11.at(1).type)
                      return [u6, o10];
                    const n11 = Math.max(0, r11.index);
                    for (; l7 = r11.at(1), c5 = r11.at(2), !(Fe(l7) || 7 === l7.type && (7 === c5.type || 24 === c5.type && Me.has(c5.value.toLowerCase()))); )
                      r11.consume(1);
                    const i6 = r11.index + 1, a5 = e11.slice(n11, i6), f4 = a5.length > 0 ? Ue(a5) : [ee("*")];
                    for (; !Fe(r11.at(1)); )
                      r11.consume(1);
                    const p4 = e11.slice(i6, Math.max(0, r11.index + 1));
                    let y4 = f4, h4 = [{ type: 28, source: { type: 9 }, value: { type: 0, value: [ne(p4.length > 0 ? v : d), ee("~"), ee("="), { type: 2, value: t10 }] } }];
                    if (ze)
                      h4 = [ee(":"), re("where", h4)];
                    else {
                      const e12 = f4.map(B).join("");
                      e12.endsWith(Le) ? y4 = N(Array.from($(e12.substring(0, e12.length - Le.length)))) : s6.push({ actual: e12, expected: e12 + Le });
                    }
                    u6.push(...f4), o10.push(...y4), o10.push(...h4), o10.push(...p4), r11.consume(1);
                  }
                  var l7, c5;
                }(t9.prelude, u5.uid);
                if (s6.length > 0)
                  return t9;
                const l6 = n9.map(B).join("");
                try {
                  je.matches(l6), o9.add(l6);
                } catch (e11) {
                }
                return e({}, t9, { prelude: r10 });
              } }).value;
              if (s6.length > 0) {
                const e11 = /* @__PURE__ */ new Set(), t9 = [];
                let n9 = 0;
                for (const { actual: e12 } of s6)
                  n9 = Math.max(n9, e12.length);
                const r10 = Array.from({ length: n9 }, () => " ").join("");
                for (const { actual: u6, expected: o10 } of s6)
                  e11.has(u6) || (t9.push(`${u6}${r10.substring(0, n9 - u6.length)} => ${o10}`), e11.add(u6));
                console.warn(`The :where() pseudo-class is not supported by this browser. To use the Container Query Polyfill, you must modify the selectors under your @container rules:

${t9.join("\n")}`);
              }
              return o9.size > 0 && (u5.selector = Array.from(o9).join(", ")), n8.descriptors.push(u5), { type: 25, name: "media", prelude: [ne("all")], value: e({}, t8.value, { value: { type: 3, value: l5 } }) };
            }
          }
          return t8;
        }(t7, n7);
    }
    return t7;
  }
  var Ve = class {
    constructor(e11) {
      this.value = void 0, this.value = e11;
    }
  };
  function De(e11, t7) {
    if (e11 === t7)
      return true;
    if (typeof e11 == typeof t7 && null !== e11 && null !== t7 && "object" == typeof e11) {
      if (Array.isArray(e11)) {
        if (!Array.isArray(t7) || t7.length !== e11.length)
          return false;
        for (let n7 = 0, r9 = e11.length; n7 < r9; n7++)
          if (!De(e11[n7], t7[n7]))
            return false;
        return true;
      }
      if (e11 instanceof Ve)
        return t7 instanceof Ve && e11.value === t7.value;
      {
        const n7 = Object.keys(e11);
        if (n7.length !== Object.keys(t7).length)
          return false;
        for (let r9 = 0, u5 = n7.length; r9 < u5; r9++) {
          const u6 = n7[r9];
          if (!De(e11[u6], t7[u6]))
            return false;
        }
        return true;
      }
    }
    return false;
  }
  var We = Symbol("CQ_INSTANCE");
  var _e = Symbol("CQ_STYLESHEET");
  var Be = CSS.supports("width: 1svh");
  var Ge = /* @__PURE__ */ new Set(["vertical-lr", "vertical-rl", "sideways-rl", "sideways-lr", "tb", "tb-lr", "tb-rl"]);
  var Ye = ["padding-left", "padding-right", "border-left-width", "border-right-width"];
  var Je = ["padding-top", "padding-bottom", "border-top-width", "border-bottom-width"];
  var Ke = /(\w*(\s|-))?(table|ruby)(-\w*)?/;
  var Xe = class {
    constructor(e11) {
      this.node = void 0, this.node = e11;
    }
    connected() {
    }
    disconnected() {
    }
    updated() {
    }
  };
  var Ze = class extends Xe {
    constructor(e11, t7) {
      super(e11), this.context = void 0, this.controller = null, this.styleSheet = null, this.context = t7;
    }
    connected() {
      var e11 = this;
      const t7 = this.node;
      if ("stylesheet" === t7.rel) {
        const n7 = new URL(t7.href, document.baseURI);
        n7.origin === location.origin && (this.controller = rt(async function(r9) {
          const u5 = await fetch(n7.toString(), { signal: r9 }), o9 = await u5.text(), s6 = e11.styleSheet = await e11.context.registerStyleSheet({ source: o9, url: n7, signal: r9 }), l5 = new Blob([s6.source], { type: "text/css" }), c5 = new Image();
          c5.onload = c5.onerror = s6.refresh, c5.src = t7.href = URL.createObjectURL(l5);
        }));
      }
    }
    disconnected() {
      var e11, t7;
      null == (e11 = this.controller) || e11.abort(), this.controller = null, null == (t7 = this.styleSheet) || t7.dispose(), this.styleSheet = null;
    }
  };
  var et = class extends Xe {
    constructor(e11, t7) {
      super(e11), this.context = void 0, this.controller = null, this.styleSheet = null, this.context = t7;
    }
    connected() {
      var e11 = this;
      this.controller = rt(async function(t7) {
        const n7 = e11.node, r9 = e11.styleSheet = await e11.context.registerStyleSheet({ source: n7.innerHTML, signal: t7 });
        n7.innerHTML = r9.source, r9.refresh();
      });
    }
    disconnected() {
      var e11, t7;
      null == (e11 = this.controller) || e11.abort(), this.controller = null, null == (t7 = this.styleSheet) || t7.dispose(), this.styleSheet = null;
    }
  };
  var tt = class extends Xe {
    connected() {
      const e11 = `* { ${y}: cq-normal; ${h}: cq-none; }`;
      this.node.innerHTML = void 0 === window.CSSLayerBlockRule ? e11 : `@layer cq-polyfill-${f} { ${e11} }`;
    }
  };
  var nt = class extends Xe {
    constructor(e11, t7) {
      super(e11), this.context = void 0, this.styles = void 0, this.context = t7, this.styles = window.getComputedStyle(e11);
    }
    connected() {
      this.node.style.cssText = "position: fixed; top: 0; left: 0; visibility: hidden; " + (Be ? "width: 1svw; height: 1svh;" : "width: 1%; height: 1%;");
    }
    updated() {
      const e11 = ct((e12) => this.styles.getPropertyValue(e12));
      this.context.viewportChanged({ width: e11.width, height: e11.height });
    }
  };
  function rt(e11) {
    const t7 = new AbortController();
    return e11(t7.signal).catch((e12) => {
      if (!(e12 instanceof DOMException && "AbortError" === e12.message))
        throw e12;
    }), t7;
  }
  function ut(e11) {
    let t7 = 0;
    if (0 === e11.length)
      return t7;
    if (e11.startsWith("cq-") && ("normal" === (e11 = e11.substring("cq-".length)) || ge(e11)))
      return t7;
    const n7 = e11.split(" ");
    for (const e12 of n7)
      switch (e12) {
        case "size":
          t7 |= 3;
          break;
        case "inline-size":
          t7 |= 1;
          break;
        default:
          return 0;
      }
    return t7;
  }
  function ot(e11) {
    let t7 = 0;
    return "none" !== e11 && (t7 |= 1, "contents" === e11 || "inline" === e11 || Ke.test(e11) || (t7 |= 2)), t7;
  }
  function st(e11, t7) {
    return parseFloat(e11(t7));
  }
  function lt(e11, t7) {
    return t7.reduce((t8, n7) => t8 + st(e11, n7), 0);
  }
  function ct(e11) {
    let t7 = 0, n7 = 0;
    return "border-box" === e11("box-sizing") && (t7 = lt(e11, Ye), n7 = lt(e11, Je)), { fontSize: st(e11, "font-size"), width: st(e11, "width") - t7, height: st(e11, "height") - n7 };
  }
  function it(e11) {
    return { containerType: ut(e11(y).trim()), containerNames: (n7 = e11(h).trim(), n7.startsWith("cq-") && ("none" === (n7 = n7.substring("cq-".length)) || ge(n7)) ? /* @__PURE__ */ new Set([]) : new Set(0 === n7.length ? [] : n7.split(" "))), writingAxis: (t7 = e11("writing-mode").trim(), Ge.has(t7) ? 1 : 0), displayFlags: ot(e11("display").trim()) };
    var t7, n7;
  }
  function at(e11, t7, n7) {
    null != n7 ? n7 != e11.getPropertyValue(t7) && e11.setProperty(t7, n7) : e11.removeProperty(t7);
  }
  function ft(e11) {
    const t7 = e11[_e];
    return null != t7 ? t7 : [];
  }
  function pt(e11, t7) {
    e11[_e] = t7;
  }
  new Promise((e11) => {
  }), window.CQPolyfill = { version: "1.0.2" }, "container" in document.documentElement.style || function(n7) {
    function r9(e11) {
      return e11[We] || null;
    }
    const u5 = document.documentElement;
    if (r9(u5))
      return;
    const o9 = document.createElement(`cq-polyfill-${f}`), s6 = document.createElement("style");
    new MutationObserver((e11) => {
      for (const t7 of e11) {
        for (const e12 of t7.removedNodes) {
          const t8 = r9(e12);
          null == t8 || t8.disconnect();
        }
        t7.target.nodeType !== Node.DOCUMENT_NODE && t7.target.nodeType !== Node.DOCUMENT_FRAGMENT_NODE && null === t7.target.parentNode || "attributes" === t7.type && t7.attributeName && (t7.attributeName === v || t7.attributeName === d || t7.target instanceof Element && t7.target.getAttribute(t7.attributeName) === t7.oldValue) || (A3(t7.target).mutate(), S4());
      }
    }).observe(u5, { childList: true, subtree: true, attributes: true, attributeOldValue: true });
    const l5 = new ResizeObserver((e11) => {
      for (const t7 of e11)
        A3(t7.target).resize();
      A3(u5).update(C3());
    }), c5 = new Xe(u5);
    async function a5(e11, { source: t7, url: n8, signal: r10 }) {
      const o10 = function(e12, t8) {
        try {
          const n9 = Array.from($(e12));
          if (t8)
            for (let e13 = 0; e13 < n9.length; e13++) {
              const r12 = n9[e13];
              if (20 === r12.type)
                r12.value = new URL(r12.value, t8).toString();
              else if (23 === r12.type && "url" === r12.value.toLowerCase()) {
                const r13 = e13 + 1 < n9.length ? n9[e13 + 1] : null;
                r13 && 2 === r13.type && (r13.value = new URL(r13.value, t8).toString());
              }
            }
          const r11 = { descriptors: [], parent: null, transformStyleRule: (e13) => e13 };
          return { source: _(Oe(P(n9, true), r11)), descriptors: r11.descriptors };
        } catch (t9) {
          return console.warn("An error occurred while transpiling stylesheet: " + t9), { source: e12, descriptors: [] };
        }
      }(t7, n8 ? n8.toString() : void 0);
      let s7 = () => {
      }, l6 = () => {
      };
      const c6 = A3(u5);
      let i6 = false;
      return null != r10 && r10.aborted || (l6 = () => {
        if (!i6) {
          const { sheet: t8 } = e11;
          null != t8 && (pt(t8, o10.descriptors), i6 = true, s7 = () => {
            pt(t8), c6.mutate(), S4();
          }, c6.mutate(), S4());
        }
      }), { source: o10.source, dispose: s7, refresh: l6 };
    }
    const p4 = { cqw: null, cqh: null };
    function y4({ width: e11, height: t7 }) {
      p4.cqw = e11, p4.cqh = t7;
    }
    function h4(e11, t7, n8) {
      if (e11 instanceof Element && t7) {
        let r10 = "";
        for (const [n9, u6] of t7.conditions) {
          const t8 = n9.value;
          null != t8.selector && null != u6 && 2 == (2 & u6) && e11.matches(t8.selector) && (r10.length > 0 && (r10 += " "), r10 += t8.uid);
        }
        r10.length > 0 ? e11.setAttribute(n8, r10) : e11.removeAttribute(n8);
      }
    }
    function S4() {
      l5.unobserve(u5), l5.observe(u5);
    }
    const x3 = () => {
      const e11 = [];
      for (const t7 of document.styleSheets)
        for (const n8 of ft(t7))
          e11.push([new Ve(n8), 0]);
      return e11;
    }, q2 = window.getComputedStyle(u5), C3 = () => {
      const t7 = (e11) => q2.getPropertyValue(e11), n8 = it(t7), r10 = ct(t7);
      return { parentState: null, conditions: x3(), context: e({}, p4, { fontSize: r10.fontSize, rootFontSize: r10.fontSize, writingAxis: n8.writingAxis }), displayFlags: n8.displayFlags, isQueryContainer: false };
    }, k3 = (e11) => e11;
    function A3(n8) {
      let f4 = r9(n8);
      if (!f4) {
        let p5, S5 = null, x4 = false;
        n8 === u5 ? (p5 = c5, S5 = k3) : n8 === o9 ? (x4 = true, p5 = new nt(o9, { viewportChanged: y4 })) : p5 = n8 === s6 ? new tt(s6) : n8 instanceof HTMLLinkElement ? new Ze(n8, { registerStyleSheet: (t7) => a5(n8, e({}, t7)) }) : n8 instanceof HTMLStyleElement ? new et(n8, { registerStyleSheet: (t7) => a5(n8, e({}, t7)) }) : new Xe(n8);
        let q3 = Symbol();
        if (null == S5 && n8 instanceof Element) {
          const r10 = function(n9) {
            const r11 = window.getComputedStyle(n9);
            return /* @__PURE__ */ function(n10) {
              let u6 = null;
              return (...n11) => {
                if (null == u6 || !De(u6[0], n11)) {
                  const o10 = ((n12, u7) => {
                    const { context: o11, conditions: s7 } = n12, l6 = (e11) => r11.getPropertyValue(e11), c6 = it(l6), a6 = e({}, o11, { writingAxis: c6.writingAxis });
                    let f5 = s7, p6 = false, y5 = c6.displayFlags;
                    0 == (1 & n12.displayFlags) && (y5 = 0);
                    const { containerType: h5, containerNames: v3 } = c6;
                    if (h5 > 0) {
                      const e11 = h5 > 0 && 2 == (2 & y5), n13 = new Map(s7.map((e12) => [e12[0].value, e12[1]]));
                      if (f5 = [], p6 = true, e11) {
                        const e12 = ct(l6);
                        a6.fontSize = e12.fontSize;
                        const r12 = function(e13, t7) {
                          const n14 = { value: t7.width }, r13 = { value: t7.height };
                          let u9 = n14, o12 = r13;
                          if (1 === e13.writingAxis) {
                            const e14 = u9;
                            u9 = o12, o12 = e14;
                          }
                          return 2 != (2 & e13.containerType) && (o12.value = void 0), { width: n14.value, height: r13.value, inlineSize: u9.value, blockSize: o12.value };
                        }(c6, e12), u8 = { sizeFeatures: r12, treeContext: a6 }, p7 = (e13) => {
                          const { rule: r13 } = e13, o12 = r13.name, s8 = null == o12 || v3.has(o12) ? function(e14, n14) {
                            const r14 = /* @__PURE__ */ new Map(), u9 = n14.sizeFeatures;
                            for (const n15 of e14.features) {
                              const e15 = t(n15, u9);
                              if (1 === e15.type)
                                return null;
                              r14.set(n15, e15);
                            }
                            const o13 = i(e14.condition, { sizeFeatures: r14, treeContext: n14.treeContext });
                            return 5 === o13.type ? o13.value : null;
                          }(r13, u8) : null;
                          var l7;
                          return null == s8 ? 1 === ((null != (l7 = n13.get(e13)) ? l7 : 0) && 1) : true === s8;
                        }, y6 = (e13, t7) => {
                          let n14 = e13.get(t7);
                          if (null == n14) {
                            const r13 = p7(t7);
                            n14 = (r13 ? 1 : 0) | (true !== r13 || null != t7.parent && 1 != (1 & y6(e13, t7.parent)) ? 0 : 2), e13.set(t7, n14);
                          }
                          return n14;
                        }, h6 = /* @__PURE__ */ new Map();
                        for (const e13 of s7)
                          f5.push([e13[0], y6(h6, e13[0].value)]);
                        a6.cqw = null != r12.width ? r12.width / 100 : o11.cqw, a6.cqh = null != r12.height ? r12.height / 100 : o11.cqh;
                      }
                    }
                    return { parentState: new Ve(n12), conditions: f5, context: a6, displayFlags: y5, isQueryContainer: p6 };
                  })(...n11);
                  null != u6 && De(u6[1], o10) || (u6 = [n11, o10]);
                }
                return u6[1];
              };
            }();
          }(n8);
          S5 = (e11) => r10(e11, q3);
        }
        const C4 = S5 || k3;
        let $3 = null;
        const E3 = (e11) => {
          const t7 = $3, n9 = C4(e11);
          return $3 = n9, [$3, $3 !== t7];
        }, z3 = n8 instanceof HTMLElement || n8 instanceof SVGElement ? n8.style : null;
        let L3 = false;
        f4 = { connect() {
          for (let e11 = n8.firstChild; null != e11; e11 = e11.nextSibling)
            A3(e11);
          p5.connected();
        }, disconnect() {
          n8 instanceof Element && (l5.unobserve(n8), n8.removeAttribute(v), n8.removeAttribute(d)), z3 && (z3.removeProperty(g), z3.removeProperty(b), z3.removeProperty(m), z3.removeProperty(w));
          for (let e11 = n8.firstChild; null != e11; e11 = e11.nextSibling) {
            const t7 = r9(e11);
            null == t7 || t7.disconnect();
          }
          p5.disconnected(), delete n8[We];
        }, update(e11) {
          const [t7, r10] = E3(e11);
          if (r10) {
            if (h4(n8, e11, d), h4(n8, t7, v), n8 instanceof Element) {
              const e12 = x4 || t7.isQueryContainer;
              e12 && !L3 ? (l5.observe(n8), L3 = true) : !e12 && L3 && (l5.unobserve(n8), L3 = false);
            }
            if (z3) {
              const n9 = t7.context, r11 = n9.writingAxis;
              let u6 = null, o10 = null, s7 = null, l6 = null;
              (r11 !== e11.context.writingAxis || t7.isQueryContainer) && (u6 = `var(${0 === r11 ? m : w})`, o10 = `var(${1 === r11 ? m : w})`), e11 && !t7.isQueryContainer || (n9.cqw && (s7 = n9.cqw + "px"), n9.cqh && (l6 = n9.cqh + "px")), at(z3, g, u6), at(z3, b, o10), at(z3, m, s7), at(z3, w, l6);
            }
            p5.updated();
          }
          for (let e12 = n8.firstChild; null != e12; e12 = e12.nextSibling)
            A3(e12).update(t7);
        }, resize() {
          q3 = Symbol();
        }, mutate() {
          q3 = Symbol();
          for (let e11 = n8.firstChild; null != e11; e11 = e11.nextSibling)
            A3(e11).mutate();
        } }, n8[We] = f4, f4.connect();
      }
      return f4;
    }
    u5.prepend(s6, o9), A3(u5), S4();
  }();

  // assets/js/logger.js
  var Logger = class {
    constructor(scope2 = null) {
      this.scope = scope2 ? `${scope2.charAt(0).toUpperCase()}${scope2.slice(1)}` : null;
    }
    log(...args) {
      return console.log(...this._buildArgs("log", args));
    }
    info(...args) {
      return console.info(...this._buildArgs("info", args));
    }
    debug(...args) {
      return console.debug(...this._buildArgs("debug", args));
    }
    warn(...args) {
      return console.warn(...this._buildArgs("warn", args));
    }
    error(...args) {
      return console.error(...this._buildArgs("error", args));
    }
    _buildArgs(level, args) {
      let prefix2 = "Lookbook";
      if (this.scope) {
        prefix2 += ` [${this.scope}]`;
      }
      return [prefix2, ...args];
    }
  };

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3Y6SB6QS.js
  var basePath = "";
  function setBasePath(path) {
    basePath = path;
  }
  function getBasePath(subpath = "") {
    if (!basePath) {
      const scripts = [...document.getElementsByTagName("script")];
      const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
      if (configScript) {
        setBasePath(configScript.getAttribute("data-shoelace"));
      } else {
        const fallbackScript = scripts.find((s6) => {
          return /shoelace(\.min)?\.js($|\?)/.test(s6.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(s6.src);
        });
        let path = "";
        if (fallbackScript) {
          path = fallbackScript.getAttribute("src");
        }
        setBasePath(path.split("/").slice(0, -1).join("/"));
      }
    }
    return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : ``);
  }

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IFDWM6P4.js
  var __defProp2 = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a5, b4) => {
    for (var prop in b4 || (b4 = {}))
      if (__hasOwnProp2.call(b4, prop))
        __defNormalProp(a5, prop, b4[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b4)) {
        if (__propIsEnum.call(b4, prop))
          __defNormalProp(a5, prop, b4[prop]);
      }
    return a5;
  };
  var __spreadProps = (a5, b4) => __defProps(a5, __getOwnPropDescs(b4));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
    for (var i6 = decorators.length - 1, decorator; i6 >= 0; i6--)
      if (decorator = decorators[i6])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp2(target, key, result);
    return result;
  };

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js
  var library = {
    name: "default",
    resolver: (name) => getBasePath(`assets/icons/${name}.svg`)
  };
  var library_default_default = library;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3TFKS637.js
  var icons = {
    caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
    check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
    "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
    "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
    "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
    copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
    eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
    "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
    eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
    "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
    indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
    "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
    "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
    "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
    radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
    "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
    "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
    "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
  };
  var systemLibrary = {
    name: "system",
    resolver: (name) => {
      if (name in icons) {
        return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
      }
      return "";
    }
  };
  var library_system_default = systemLibrary;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZL53POKZ.js
  var registry = [library_default_default, library_system_default];
  var watchedIcons = [];
  function watchIcon(icon) {
    watchedIcons.push(icon);
  }
  function unwatchIcon(icon) {
    watchedIcons = watchedIcons.filter((el) => el !== icon);
  }
  function getIconLibrary(name) {
    return registry.find((lib) => lib.name === name);
  }
  function registerIconLibrary(name, options) {
    unregisterIconLibrary(name);
    registry.push({
      name,
      resolver: options.resolver,
      mutator: options.mutator,
      spriteSheet: options.spriteSheet
    });
    watchedIcons.forEach((icon) => {
      if (icon.library === name) {
        icon.setIcon();
      }
    });
  }
  function unregisterIconLibrary(name) {
    registry = registry.filter((lib) => lib.name !== name);
  }

  // assets/js/shoelace/setup.js
  function initShoelace() {
    if (true) {
      setBasePath("/lookbook-dev/shoelace");
    } else {
      setBasePath("/lookbook-assets/shoelace");
    }
    registerIconLibrary("default", {
      resolver: (name) => `https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/${name}.svg`
    });
  }

  // node_modules/@lit/reactive-element/css-tag.js
  var t2 = globalThis;
  var e2 = t2.ShadowRoot && (void 0 === t2.ShadyCSS || t2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s2 = Symbol();
  var o2 = /* @__PURE__ */ new WeakMap();
  var n2 = class {
    constructor(t7, e11, o9) {
      if (this._$cssResult$ = true, o9 !== s2)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7, this.t = e11;
    }
    get styleSheet() {
      let t7 = this.o;
      const s6 = this.t;
      if (e2 && void 0 === t7) {
        const e11 = void 0 !== s6 && 1 === s6.length;
        e11 && (t7 = o2.get(s6)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e11 && o2.set(s6, t7));
      }
      return t7;
    }
    toString() {
      return this.cssText;
    }
  };
  var r2 = (t7) => new n2("string" == typeof t7 ? t7 : t7 + "", void 0, s2);
  var i2 = (t7, ...e11) => {
    const o9 = 1 === t7.length ? t7[0] : e11.reduce((e12, s6, o10) => e12 + ((t8) => {
      if (true === t8._$cssResult$)
        return t8.cssText;
      if ("number" == typeof t8)
        return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t7[o10 + 1], t7[0]);
    return new n2(o9, t7, s2);
  };
  var S2 = (s6, o9) => {
    if (e2)
      s6.adoptedStyleSheets = o9.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
    else
      for (const e11 of o9) {
        const o10 = document.createElement("style"), n7 = t2.litNonce;
        void 0 !== n7 && o10.setAttribute("nonce", n7), o10.textContent = e11.cssText, s6.appendChild(o10);
      }
  };
  var c2 = e2 ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e11 = "";
    for (const s6 of t8.cssRules)
      e11 += s6.cssText;
    return r2(e11);
  })(t7) : t7;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i3, defineProperty: e3, getOwnPropertyDescriptor: r3, getOwnPropertyNames: h2, getOwnPropertySymbols: o3, getPrototypeOf: n3 } = Object;
  var a2 = globalThis;
  var c3 = a2.trustedTypes;
  var l2 = c3 ? c3.emptyScript : "";
  var p2 = a2.reactiveElementPolyfillSupport;
  var d2 = (t7, s6) => t7;
  var u2 = { toAttribute(t7, s6) {
    switch (s6) {
      case Boolean:
        t7 = t7 ? l2 : null;
        break;
      case Object:
      case Array:
        t7 = null == t7 ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, s6) {
    let i6 = t7;
    switch (s6) {
      case Boolean:
        i6 = null !== t7;
        break;
      case Number:
        i6 = null === t7 ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          i6 = JSON.parse(t7);
        } catch (t8) {
          i6 = null;
        }
    }
    return i6;
  } };
  var f2 = (t7, s6) => !i3(t7, s6);
  var y2 = { attribute: true, type: String, converter: u2, reflect: false, hasChanged: f2 };
  Symbol.metadata ??= Symbol("metadata"), a2.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b2 = class extends HTMLElement {
    static addInitializer(t7) {
      this._$Ei(), (this.l ??= []).push(t7);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t7, s6 = y2) {
      if (s6.state && (s6.attribute = false), this._$Ei(), this.elementProperties.set(t7, s6), !s6.noAccessor) {
        const i6 = Symbol(), r9 = this.getPropertyDescriptor(t7, i6, s6);
        void 0 !== r9 && e3(this.prototype, t7, r9);
      }
    }
    static getPropertyDescriptor(t7, s6, i6) {
      const { get: e11, set: h4 } = r3(this.prototype, t7) ?? { get() {
        return this[s6];
      }, set(t8) {
        this[s6] = t8;
      } };
      return { get() {
        return e11?.call(this);
      }, set(s7) {
        const r9 = e11?.call(this);
        h4.call(this, s7), this.requestUpdate(t7, r9, i6);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) ?? y2;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d2("elementProperties")))
        return;
      const t7 = n3(this);
      t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d2("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d2("properties"))) {
        const t8 = this.properties, s6 = [...h2(t8), ...o3(t8)];
        for (const i6 of s6)
          this.createProperty(i6, t8[i6]);
      }
      const t7 = this[Symbol.metadata];
      if (null !== t7) {
        const s6 = litPropertyMetadata.get(t7);
        if (void 0 !== s6)
          for (const [t8, i6] of s6)
            this.elementProperties.set(t8, i6);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t8, s6] of this.elementProperties) {
        const i6 = this._$Eu(t8, s6);
        void 0 !== i6 && this._$Eh.set(i6, t8);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s6) {
      const i6 = [];
      if (Array.isArray(s6)) {
        const e11 = new Set(s6.flat(1 / 0).reverse());
        for (const s7 of e11)
          i6.unshift(c2(s7));
      } else
        void 0 !== s6 && i6.push(c2(s6));
      return i6;
    }
    static _$Eu(t7, s6) {
      const i6 = s6.attribute;
      return false === i6 ? void 0 : "string" == typeof i6 ? i6 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t7) => t7(this));
    }
    addController(t7) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t7), void 0 !== this.renderRoot && this.isConnected && t7.hostConnected?.();
    }
    removeController(t7) {
      this._$EO?.delete(t7);
    }
    _$E_() {
      const t7 = /* @__PURE__ */ new Map(), s6 = this.constructor.elementProperties;
      for (const i6 of s6.keys())
        this.hasOwnProperty(i6) && (t7.set(i6, this[i6]), delete this[i6]);
      t7.size > 0 && (this._$Ep = t7);
    }
    createRenderRoot() {
      const t7 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S2(t7, this.constructor.elementStyles), t7;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t7) => t7.hostConnected?.());
    }
    enableUpdating(t7) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t7) => t7.hostDisconnected?.());
    }
    attributeChangedCallback(t7, s6, i6) {
      this._$AK(t7, i6);
    }
    _$EC(t7, s6) {
      const i6 = this.constructor.elementProperties.get(t7), e11 = this.constructor._$Eu(t7, i6);
      if (void 0 !== e11 && true === i6.reflect) {
        const r9 = (void 0 !== i6.converter?.toAttribute ? i6.converter : u2).toAttribute(s6, i6.type);
        this._$Em = t7, null == r9 ? this.removeAttribute(e11) : this.setAttribute(e11, r9), this._$Em = null;
      }
    }
    _$AK(t7, s6) {
      const i6 = this.constructor, e11 = i6._$Eh.get(t7);
      if (void 0 !== e11 && this._$Em !== e11) {
        const t8 = i6.getPropertyOptions(e11), r9 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : u2;
        this._$Em = e11, this[e11] = r9.fromAttribute(s6, t8.type), this._$Em = null;
      }
    }
    requestUpdate(t7, s6, i6) {
      if (void 0 !== t7) {
        if (i6 ??= this.constructor.getPropertyOptions(t7), !(i6.hasChanged ?? f2)(this[t7], s6))
          return;
        this.P(t7, s6, i6);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t7, s6, i6) {
      this._$AL.has(t7) || this._$AL.set(t7, s6), true === i6.reflect && this._$Em !== t7 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t7);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t8) {
        Promise.reject(t8);
      }
      const t7 = this.scheduleUpdate();
      return null != t7 && await t7, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t9, s7] of this._$Ep)
            this[t9] = s7;
          this._$Ep = void 0;
        }
        const t8 = this.constructor.elementProperties;
        if (t8.size > 0)
          for (const [s7, i6] of t8)
            true !== i6.wrapped || this._$AL.has(s7) || void 0 === this[s7] || this.P(s7, this[s7], i6);
      }
      let t7 = false;
      const s6 = this._$AL;
      try {
        t7 = this.shouldUpdate(s6), t7 ? (this.willUpdate(s6), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s6)) : this._$EU();
      } catch (s7) {
        throw t7 = false, this._$EU(), s7;
      }
      t7 && this._$AE(s6);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      this._$EO?.forEach((t8) => t8.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t7) {
      return true;
    }
    update(t7) {
      this._$Ej &&= this._$Ej.forEach((t8) => this._$EC(t8, this[t8])), this._$EU();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  b2.elementStyles = [], b2.shadowRootOptions = { mode: "open" }, b2[d2("elementProperties")] = /* @__PURE__ */ new Map(), b2[d2("finalized")] = /* @__PURE__ */ new Map(), p2?.({ ReactiveElement: b2 }), (a2.reactiveElementVersions ??= []).push("2.0.4");

  // node_modules/lit-html/lit-html.js
  var t3 = globalThis;
  var i4 = t3.trustedTypes;
  var s3 = i4 ? i4.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var e4 = "$lit$";
  var h3 = `lit$${(Math.random() + "").slice(9)}$`;
  var o4 = "?" + h3;
  var n4 = `<${o4}>`;
  var r4 = document;
  var l3 = () => r4.createComment("");
  var c4 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
  var a3 = Array.isArray;
  var u3 = (t7) => a3(t7) || "function" == typeof t7?.[Symbol.iterator];
  var d3 = "[ 	\n\f\r]";
  var f3 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v2 = /-->/g;
  var _2 = />/g;
  var m2 = RegExp(`>|${d3}(?:([^\\s"'>=/]+)(${d3}*=${d3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p3 = /'/g;
  var g2 = /"/g;
  var $2 = /^(?:script|style|textarea|title)$/i;
  var y3 = (t7) => (i6, ...s6) => ({ _$litType$: t7, strings: i6, values: s6 });
  var x2 = y3(1);
  var b3 = y3(2);
  var w2 = Symbol.for("lit-noChange");
  var T2 = Symbol.for("lit-nothing");
  var A2 = /* @__PURE__ */ new WeakMap();
  var E2 = r4.createTreeWalker(r4, 129);
  function C2(t7, i6) {
    if (!Array.isArray(t7) || !t7.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== s3 ? s3.createHTML(i6) : i6;
  }
  var P2 = (t7, i6) => {
    const s6 = t7.length - 1, o9 = [];
    let r9, l5 = 2 === i6 ? "<svg>" : "", c5 = f3;
    for (let i7 = 0; i7 < s6; i7++) {
      const s7 = t7[i7];
      let a5, u5, d4 = -1, y4 = 0;
      for (; y4 < s7.length && (c5.lastIndex = y4, u5 = c5.exec(s7), null !== u5); )
        y4 = c5.lastIndex, c5 === f3 ? "!--" === u5[1] ? c5 = v2 : void 0 !== u5[1] ? c5 = _2 : void 0 !== u5[2] ? ($2.test(u5[2]) && (r9 = RegExp("</" + u5[2], "g")), c5 = m2) : void 0 !== u5[3] && (c5 = m2) : c5 === m2 ? ">" === u5[0] ? (c5 = r9 ?? f3, d4 = -1) : void 0 === u5[1] ? d4 = -2 : (d4 = c5.lastIndex - u5[2].length, a5 = u5[1], c5 = void 0 === u5[3] ? m2 : '"' === u5[3] ? g2 : p3) : c5 === g2 || c5 === p3 ? c5 = m2 : c5 === v2 || c5 === _2 ? c5 = f3 : (c5 = m2, r9 = void 0);
      const x3 = c5 === m2 && t7[i7 + 1].startsWith("/>") ? " " : "";
      l5 += c5 === f3 ? s7 + n4 : d4 >= 0 ? (o9.push(a5), s7.slice(0, d4) + e4 + s7.slice(d4) + h3 + x3) : s7 + h3 + (-2 === d4 ? i7 : x3);
    }
    return [C2(t7, l5 + (t7[s6] || "<?>") + (2 === i6 ? "</svg>" : "")), o9];
  };
  var V2 = class _V {
    constructor({ strings: t7, _$litType$: s6 }, n7) {
      let r9;
      this.parts = [];
      let c5 = 0, a5 = 0;
      const u5 = t7.length - 1, d4 = this.parts, [f4, v3] = P2(t7, s6);
      if (this.el = _V.createElement(f4, n7), E2.currentNode = this.el.content, 2 === s6) {
        const t8 = this.el.content.firstChild;
        t8.replaceWith(...t8.childNodes);
      }
      for (; null !== (r9 = E2.nextNode()) && d4.length < u5; ) {
        if (1 === r9.nodeType) {
          if (r9.hasAttributes())
            for (const t8 of r9.getAttributeNames())
              if (t8.endsWith(e4)) {
                const i6 = v3[a5++], s7 = r9.getAttribute(t8).split(h3), e11 = /([.?@])?(.*)/.exec(i6);
                d4.push({ type: 1, index: c5, name: e11[2], strings: s7, ctor: "." === e11[1] ? k2 : "?" === e11[1] ? H2 : "@" === e11[1] ? I2 : R2 }), r9.removeAttribute(t8);
              } else
                t8.startsWith(h3) && (d4.push({ type: 6, index: c5 }), r9.removeAttribute(t8));
          if ($2.test(r9.tagName)) {
            const t8 = r9.textContent.split(h3), s7 = t8.length - 1;
            if (s7 > 0) {
              r9.textContent = i4 ? i4.emptyScript : "";
              for (let i6 = 0; i6 < s7; i6++)
                r9.append(t8[i6], l3()), E2.nextNode(), d4.push({ type: 2, index: ++c5 });
              r9.append(t8[s7], l3());
            }
          }
        } else if (8 === r9.nodeType)
          if (r9.data === o4)
            d4.push({ type: 2, index: c5 });
          else {
            let t8 = -1;
            for (; -1 !== (t8 = r9.data.indexOf(h3, t8 + 1)); )
              d4.push({ type: 7, index: c5 }), t8 += h3.length - 1;
          }
        c5++;
      }
    }
    static createElement(t7, i6) {
      const s6 = r4.createElement("template");
      return s6.innerHTML = t7, s6;
    }
  };
  function N2(t7, i6, s6 = t7, e11) {
    if (i6 === w2)
      return i6;
    let h4 = void 0 !== e11 ? s6._$Co?.[e11] : s6._$Cl;
    const o9 = c4(i6) ? void 0 : i6._$litDirective$;
    return h4?.constructor !== o9 && (h4?._$AO?.(false), void 0 === o9 ? h4 = void 0 : (h4 = new o9(t7), h4._$AT(t7, s6, e11)), void 0 !== e11 ? (s6._$Co ??= [])[e11] = h4 : s6._$Cl = h4), void 0 !== h4 && (i6 = N2(t7, h4._$AS(t7, i6.values), h4, e11)), i6;
  }
  var S3 = class {
    constructor(t7, i6) {
      this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i6;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t7) {
      const { el: { content: i6 }, parts: s6 } = this._$AD, e11 = (t7?.creationScope ?? r4).importNode(i6, true);
      E2.currentNode = e11;
      let h4 = E2.nextNode(), o9 = 0, n7 = 0, l5 = s6[0];
      for (; void 0 !== l5; ) {
        if (o9 === l5.index) {
          let i7;
          2 === l5.type ? i7 = new M2(h4, h4.nextSibling, this, t7) : 1 === l5.type ? i7 = new l5.ctor(h4, l5.name, l5.strings, this, t7) : 6 === l5.type && (i7 = new L2(h4, this, t7)), this._$AV.push(i7), l5 = s6[++n7];
        }
        o9 !== l5?.index && (h4 = E2.nextNode(), o9++);
      }
      return E2.currentNode = r4, e11;
    }
    p(t7) {
      let i6 = 0;
      for (const s6 of this._$AV)
        void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t7, s6, i6), i6 += s6.strings.length - 2) : s6._$AI(t7[i6])), i6++;
    }
  };
  var M2 = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t7, i6, s6, e11) {
      this.type = 2, this._$AH = T2, this._$AN = void 0, this._$AA = t7, this._$AB = i6, this._$AM = s6, this.options = e11, this._$Cv = e11?.isConnected ?? true;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i6 = this._$AM;
      return void 0 !== i6 && 11 === t7?.nodeType && (t7 = i6.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i6 = this) {
      t7 = N2(this, t7, i6), c4(t7) ? t7 === T2 || null == t7 || "" === t7 ? (this._$AH !== T2 && this._$AR(), this._$AH = T2) : t7 !== this._$AH && t7 !== w2 && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : u3(t7) ? this.k(t7) : this._(t7);
    }
    S(t7) {
      return this._$AA.parentNode.insertBefore(t7, this._$AB);
    }
    T(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.S(t7));
    }
    _(t7) {
      this._$AH !== T2 && c4(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(r4.createTextNode(t7)), this._$AH = t7;
    }
    $(t7) {
      const { values: i6, _$litType$: s6 } = t7, e11 = "number" == typeof s6 ? this._$AC(t7) : (void 0 === s6.el && (s6.el = V2.createElement(C2(s6.h, s6.h[0]), this.options)), s6);
      if (this._$AH?._$AD === e11)
        this._$AH.p(i6);
      else {
        const t8 = new S3(e11, this), s7 = t8.u(this.options);
        t8.p(i6), this.T(s7), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i6 = A2.get(t7.strings);
      return void 0 === i6 && A2.set(t7.strings, i6 = new V2(t7)), i6;
    }
    k(t7) {
      a3(this._$AH) || (this._$AH = [], this._$AR());
      const i6 = this._$AH;
      let s6, e11 = 0;
      for (const h4 of t7)
        e11 === i6.length ? i6.push(s6 = new _M(this.S(l3()), this.S(l3()), this, this.options)) : s6 = i6[e11], s6._$AI(h4), e11++;
      e11 < i6.length && (this._$AR(s6 && s6._$AB.nextSibling, e11), i6.length = e11);
    }
    _$AR(t7 = this._$AA.nextSibling, i6) {
      for (this._$AP?.(false, true, i6); t7 && t7 !== this._$AB; ) {
        const i7 = t7.nextSibling;
        t7.remove(), t7 = i7;
      }
    }
    setConnected(t7) {
      void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
    }
  };
  var R2 = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t7, i6, s6, e11, h4) {
      this.type = 1, this._$AH = T2, this._$AN = void 0, this.element = t7, this.name = i6, this._$AM = e11, this.options = h4, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = T2;
    }
    _$AI(t7, i6 = this, s6, e11) {
      const h4 = this.strings;
      let o9 = false;
      if (void 0 === h4)
        t7 = N2(this, t7, i6, 0), o9 = !c4(t7) || t7 !== this._$AH && t7 !== w2, o9 && (this._$AH = t7);
      else {
        const e12 = t7;
        let n7, r9;
        for (t7 = h4[0], n7 = 0; n7 < h4.length - 1; n7++)
          r9 = N2(this, e12[s6 + n7], i6, n7), r9 === w2 && (r9 = this._$AH[n7]), o9 ||= !c4(r9) || r9 !== this._$AH[n7], r9 === T2 ? t7 = T2 : t7 !== T2 && (t7 += (r9 ?? "") + h4[n7 + 1]), this._$AH[n7] = r9;
      }
      o9 && !e11 && this.j(t7);
    }
    j(t7) {
      t7 === T2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
    }
  };
  var k2 = class extends R2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t7) {
      this.element[this.name] = t7 === T2 ? void 0 : t7;
    }
  };
  var H2 = class extends R2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t7) {
      this.element.toggleAttribute(this.name, !!t7 && t7 !== T2);
    }
  };
  var I2 = class extends R2 {
    constructor(t7, i6, s6, e11, h4) {
      super(t7, i6, s6, e11, h4), this.type = 5;
    }
    _$AI(t7, i6 = this) {
      if ((t7 = N2(this, t7, i6, 0) ?? T2) === w2)
        return;
      const s6 = this._$AH, e11 = t7 === T2 && s6 !== T2 || t7.capture !== s6.capture || t7.once !== s6.once || t7.passive !== s6.passive, h4 = t7 !== T2 && (s6 === T2 || e11);
      e11 && this.element.removeEventListener(this.name, this, s6), h4 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var L2 = class {
    constructor(t7, i6, s6) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      N2(this, t7);
    }
  };
  var z2 = { P: e4, A: h3, C: o4, M: 1, L: P2, R: S3, D: u3, V: N2, I: M2, H: R2, N: H2, U: I2, B: k2, F: L2 };
  var Z2 = t3.litHtmlPolyfillSupport;
  Z2?.(V2, M2), (t3.litHtmlVersions ??= []).push("3.1.2");
  var j2 = (t7, i6, s6) => {
    const e11 = s6?.renderBefore ?? i6;
    let h4 = e11._$litPart$;
    if (void 0 === h4) {
      const t8 = s6?.renderBefore ?? null;
      e11._$litPart$ = h4 = new M2(i6.insertBefore(l3(), t8), t8, void 0, s6 ?? {});
    }
    return h4._$AI(t7), h4;
  };

  // node_modules/lit-element/lit-element.js
  var s4 = class extends b2 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t7 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t7.firstChild, t7;
    }
    update(t7) {
      const i6 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = j2(i6, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return w2;
    }
  };
  s4._$litElement$ = true, s4["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s4 });
  var r5 = globalThis.litElementPolyfillSupport;
  r5?.({ LitElement: s4 });
  (globalThis.litElementVersions ??= []).push("4.0.4");

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js
  var component_styles_default = i2`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LMJPQPQT.js
  var icon_styles_default = i2`
  ${component_styles_default}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2FB5TK5H.js
  function watch(propertyName, options) {
    const resolvedOptions = __spreadValues({
      waitUntilFirstUpdate: false
    }, options);
    return (proto, decoratedFnName) => {
      const { update: update2 } = proto;
      const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
      proto.update = function(changedProps) {
        watchedProperties.forEach((property) => {
          const key = property;
          if (changedProps.has(key)) {
            const oldValue = changedProps.get(key);
            const newValue = this[key];
            if (oldValue !== newValue) {
              if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
                this[decoratedFnName](oldValue, newValue);
              }
            }
          }
        });
        update2.call(this, changedProps);
      };
    };
  }

  // node_modules/@lit/reactive-element/decorators/property.js
  var o5 = { attribute: true, type: String, converter: u2, reflect: false, hasChanged: f2 };
  var r6 = (t7 = o5, e11, r9) => {
    const { kind: n7, metadata: i6 } = r9;
    let s6 = globalThis.litPropertyMetadata.get(i6);
    if (void 0 === s6 && globalThis.litPropertyMetadata.set(i6, s6 = /* @__PURE__ */ new Map()), s6.set(r9.name, t7), "accessor" === n7) {
      const { name: o9 } = r9;
      return { set(r10) {
        const n8 = e11.get.call(this);
        e11.set.call(this, r10), this.requestUpdate(o9, n8, t7);
      }, init(e12) {
        return void 0 !== e12 && this.P(o9, void 0, t7), e12;
      } };
    }
    if ("setter" === n7) {
      const { name: o9 } = r9;
      return function(r10) {
        const n8 = this[o9];
        e11.call(this, r10), this.requestUpdate(o9, n8, t7);
      };
    }
    throw Error("Unsupported decorator location: " + n7);
  };
  function n5(t7) {
    return (e11, o9) => "object" == typeof o9 ? r6(t7, e11, o9) : ((t8, e12, o10) => {
      const r9 = e12.hasOwnProperty(o10);
      return e12.constructor.createProperty(o10, r9 ? { ...t8, wrapped: true } : t8), r9 ? Object.getOwnPropertyDescriptor(e12, o10) : void 0;
    })(t7, e11, o9);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function r7(r9) {
    return n5({ ...r9, state: true, attribute: false });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var e5 = (e11, t7, c5) => (c5.configurable = true, c5.enumerable = true, Reflect.decorate && "object" != typeof t7 && Object.defineProperty(e11, t7, c5), c5);

  // node_modules/@lit/reactive-element/decorators/query.js
  function e6(e11, r9) {
    return (n7, s6, i6) => {
      const o9 = (t7) => t7.renderRoot?.querySelector(e11) ?? null;
      if (r9) {
        const { get: e12, set: r10 } = "object" == typeof s6 ? n7 : i6 ?? (() => {
          const t7 = Symbol();
          return { get() {
            return this[t7];
          }, set(e13) {
            this[t7] = e13;
          } };
        })();
        return e5(n7, s6, { get() {
          let t7 = e12.call(this);
          return void 0 === t7 && (t7 = o9(this), (null !== t7 || this.hasUpdated) && r10.call(this, t7)), t7;
        } });
      }
      return e5(n7, s6, { get() {
        return o9(this);
      } });
    };
  }

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.U5X52PUD.js
  var ShoelaceElement = class extends s4 {
    constructor() {
      super();
      Object.entries(this.constructor.dependencies).forEach(([name, component]) => {
        this.constructor.define(name, component);
      });
    }
    emit(name, options) {
      const event = new CustomEvent(name, __spreadValues({
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {}
      }, options));
      this.dispatchEvent(event);
      return event;
    }
    /* eslint-enable */
    static define(name, elementConstructor = this, options = {}) {
      const currentlyRegisteredConstructor = customElements.get(name);
      if (!currentlyRegisteredConstructor) {
        customElements.define(name, class extends elementConstructor {
        }, options);
        return;
      }
      let newVersion = " (unknown version)";
      let existingVersion = newVersion;
      if ("version" in elementConstructor && elementConstructor.version) {
        newVersion = " v" + elementConstructor.version;
      }
      if ("version" in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
        existingVersion = " v" + currentlyRegisteredConstructor.version;
      }
      if (newVersion && existingVersion && newVersion === existingVersion) {
        return;
      }
      console.warn(
        `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`
      );
    }
  };
  ShoelaceElement.version = "2.13.1";
  ShoelaceElement.dependencies = {};
  __decorateClass([
    n5()
  ], ShoelaceElement.prototype, "dir", 2);
  __decorateClass([
    n5()
  ], ShoelaceElement.prototype, "lang", 2);

  // node_modules/lit-html/directive-helpers.js
  var { I: t4 } = z2;
  var e7 = (o9, t7) => void 0 === t7 ? void 0 !== o9?._$litType$ : o9?._$litType$ === t7;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Y62EZWMI.js
  var CACHEABLE_ERROR = Symbol();
  var RETRYABLE_ERROR = Symbol();
  var parser;
  var iconCache = /* @__PURE__ */ new Map();
  var SlIcon = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.initialRender = false;
      this.svg = null;
      this.label = "";
      this.library = "default";
    }
    /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
    async resolveIcon(url, library2) {
      var _a;
      let fileData;
      if (library2 == null ? void 0 : library2.spriteSheet) {
        return x2`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`;
      }
      try {
        fileData = await fetch(url, { mode: "cors" });
        if (!fileData.ok)
          return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
      } catch (e11) {
        return RETRYABLE_ERROR;
      }
      try {
        const div = document.createElement("div");
        div.innerHTML = await fileData.text();
        const svg = div.firstElementChild;
        if (((_a = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a.toLowerCase()) !== "svg")
          return CACHEABLE_ERROR;
        if (!parser)
          parser = new DOMParser();
        const doc = parser.parseFromString(svg.outerHTML, "text/html");
        const svgEl = doc.body.querySelector("svg");
        if (!svgEl)
          return CACHEABLE_ERROR;
        svgEl.part.add("svg");
        return document.adoptNode(svgEl);
      } catch (e11) {
        return CACHEABLE_ERROR;
      }
    }
    connectedCallback() {
      super.connectedCallback();
      watchIcon(this);
    }
    firstUpdated() {
      this.initialRender = true;
      this.setIcon();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      unwatchIcon(this);
    }
    getIconSource() {
      const library2 = getIconLibrary(this.library);
      if (this.name && library2) {
        return {
          url: library2.resolver(this.name),
          fromLibrary: true
        };
      }
      return {
        url: this.src,
        fromLibrary: false
      };
    }
    handleLabelChange() {
      const hasLabel = typeof this.label === "string" && this.label.length > 0;
      if (hasLabel) {
        this.setAttribute("role", "img");
        this.setAttribute("aria-label", this.label);
        this.removeAttribute("aria-hidden");
      } else {
        this.removeAttribute("role");
        this.removeAttribute("aria-label");
        this.setAttribute("aria-hidden", "true");
      }
    }
    async setIcon() {
      var _a;
      const { url, fromLibrary } = this.getIconSource();
      const library2 = fromLibrary ? getIconLibrary(this.library) : void 0;
      if (!url) {
        this.svg = null;
        return;
      }
      let iconResolver = iconCache.get(url);
      if (!iconResolver) {
        iconResolver = this.resolveIcon(url, library2);
        iconCache.set(url, iconResolver);
      }
      if (!this.initialRender) {
        return;
      }
      const svg = await iconResolver;
      if (svg === RETRYABLE_ERROR) {
        iconCache.delete(url);
      }
      if (url !== this.getIconSource().url) {
        return;
      }
      if (e7(svg)) {
        this.svg = svg;
        return;
      }
      switch (svg) {
        case RETRYABLE_ERROR:
        case CACHEABLE_ERROR:
          this.svg = null;
          this.emit("sl-error");
          break;
        default:
          this.svg = svg.cloneNode(true);
          (_a = library2 == null ? void 0 : library2.mutator) == null ? void 0 : _a.call(library2, this.svg);
          this.emit("sl-load");
      }
    }
    render() {
      return this.svg;
    }
  };
  SlIcon.styles = icon_styles_default;
  __decorateClass([
    r7()
  ], SlIcon.prototype, "svg", 2);
  __decorateClass([
    n5({ reflect: true })
  ], SlIcon.prototype, "name", 2);
  __decorateClass([
    n5()
  ], SlIcon.prototype, "src", 2);
  __decorateClass([
    n5()
  ], SlIcon.prototype, "label", 2);
  __decorateClass([
    n5({ reflect: true })
  ], SlIcon.prototype, "library", 2);
  __decorateClass([
    watch("label")
  ], SlIcon.prototype, "handleLabelChange", 1);
  __decorateClass([
    watch(["name", "src", "library"])
  ], SlIcon.prototype, "setIcon", 1);

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DQI3IAOX.js
  SlIcon.define("sl-icon");

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.EACLXYYC.js
  var spinner_styles_default = i2`
  ${component_styles_default}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;

  // node_modules/@shoelace-style/localize/dist/index.js
  var connectedElements = /* @__PURE__ */ new Set();
  var documentElementObserver = new MutationObserver(update);
  var translations = /* @__PURE__ */ new Map();
  var documentDirection = document.documentElement.dir || "ltr";
  var documentLanguage = document.documentElement.lang || navigator.language;
  var fallback;
  documentElementObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir", "lang"]
  });
  function registerTranslation(...translation2) {
    translation2.map((t7) => {
      const code = t7.$code.toLowerCase();
      if (translations.has(code)) {
        translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t7));
      } else {
        translations.set(code, t7);
      }
      if (!fallback) {
        fallback = t7;
      }
    });
    update();
  }
  function update() {
    documentDirection = document.documentElement.dir || "ltr";
    documentLanguage = document.documentElement.lang || navigator.language;
    [...connectedElements.keys()].map((el) => {
      if (typeof el.requestUpdate === "function") {
        el.requestUpdate();
      }
    });
  }
  var LocalizeController = class {
    constructor(host) {
      this.host = host;
      this.host.addController(this);
    }
    hostConnected() {
      connectedElements.add(this.host);
    }
    hostDisconnected() {
      connectedElements.delete(this.host);
    }
    dir() {
      return `${this.host.dir || documentDirection}`.toLowerCase();
    }
    lang() {
      return `${this.host.lang || documentLanguage}`.toLowerCase();
    }
    getTranslationData(lang) {
      var _a, _b;
      const locale = new Intl.Locale(lang.replace(/_/g, "-"));
      const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
      const region = (_b = (_a = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
      const primary = translations.get(`${language}-${region}`);
      const secondary = translations.get(language);
      return { locale, language, region, primary, secondary };
    }
    exists(key, options) {
      var _a;
      const { primary, secondary } = this.getTranslationData((_a = options.lang) !== null && _a !== void 0 ? _a : this.lang());
      options = Object.assign({ includeFallback: false }, options);
      if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
        return true;
      }
      return false;
    }
    term(key, ...args) {
      const { primary, secondary } = this.getTranslationData(this.lang());
      let term;
      if (primary && primary[key]) {
        term = primary[key];
      } else if (secondary && secondary[key]) {
        term = secondary[key];
      } else if (fallback && fallback[key]) {
        term = fallback[key];
      } else {
        console.error(`No translation found for: ${String(key)}`);
        return String(key);
      }
      if (typeof term === "function") {
        return term(...args);
      }
      return term;
    }
    date(dateToFormat, options) {
      dateToFormat = new Date(dateToFormat);
      return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
    }
    number(numberToFormat, options) {
      numberToFormat = Number(numberToFormat);
      return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
    }
    relativeTime(value, unit, options) {
      return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
    }
  };

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAS2SHYD.js
  var translation = {
    $code: "en",
    $name: "English",
    $dir: "ltr",
    carousel: "Carousel",
    clearEntry: "Clear entry",
    close: "Close",
    copied: "Copied",
    copy: "Copy",
    currentValue: "Current value",
    error: "Error",
    goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
    hidePassword: "Hide password",
    loading: "Loading",
    nextSlide: "Next slide",
    numOptionsSelected: (num) => {
      if (num === 0)
        return "No options selected";
      if (num === 1)
        return "1 option selected";
      return `${num} options selected`;
    },
    previousSlide: "Previous slide",
    progress: "Progress",
    remove: "Remove",
    resize: "Resize",
    scrollToEnd: "Scroll to end",
    scrollToStart: "Scroll to start",
    selectAColorFromTheScreen: "Select a color from the screen",
    showPassword: "Show password",
    slideNum: (slide) => `Slide ${slide}`,
    toggleColorFormat: "Toggle color format"
  };
  registerTranslation(translation);
  var en_default = translation;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.WLV3FVBR.js
  var LocalizeController2 = class extends LocalizeController {
  };
  registerTranslation(en_default);

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XYU7AT6Q.js
  var SlSpinner = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.localize = new LocalizeController2(this);
    }
    render() {
      return x2`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
    }
  };
  SlSpinner.styles = spinner_styles_default;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DL5222VR.js
  var formCollections = /* @__PURE__ */ new WeakMap();
  var reportValidityOverloads = /* @__PURE__ */ new WeakMap();
  var checkValidityOverloads = /* @__PURE__ */ new WeakMap();
  var userInteractedControls = /* @__PURE__ */ new WeakSet();
  var interactions = /* @__PURE__ */ new WeakMap();
  var FormControlController = class {
    constructor(host, options) {
      this.handleFormData = (event) => {
        const disabled = this.options.disabled(this.host);
        const name = this.options.name(this.host);
        const value = this.options.value(this.host);
        const isButton = this.host.tagName.toLowerCase() === "sl-button";
        if (this.host.isConnected && !disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              event.formData.append(name, val.toString());
            });
          } else {
            event.formData.append(name, value.toString());
          }
        }
      };
      this.handleFormSubmit = (event) => {
        var _a;
        const disabled = this.options.disabled(this.host);
        const reportValidity = this.options.reportValidity;
        if (this.form && !this.form.noValidate) {
          (_a = formCollections.get(this.form)) == null ? void 0 : _a.forEach((control) => {
            this.setUserInteracted(control, true);
          });
        }
        if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      };
      this.handleFormReset = () => {
        this.options.setValue(this.host, this.options.defaultValue(this.host));
        this.setUserInteracted(this.host, false);
        interactions.set(this.host, []);
      };
      this.handleInteraction = (event) => {
        const emittedEvents = interactions.get(this.host);
        if (!emittedEvents.includes(event.type)) {
          emittedEvents.push(event.type);
        }
        if (emittedEvents.length === this.options.assumeInteractionOn.length) {
          this.setUserInteracted(this.host, true);
        }
      };
      this.checkFormValidity = () => {
        if (this.form && !this.form.noValidate) {
          const elements = this.form.querySelectorAll("*");
          for (const element of elements) {
            if (typeof element.checkValidity === "function") {
              if (!element.checkValidity()) {
                return false;
              }
            }
          }
        }
        return true;
      };
      this.reportFormValidity = () => {
        if (this.form && !this.form.noValidate) {
          const elements = this.form.querySelectorAll("*");
          for (const element of elements) {
            if (typeof element.reportValidity === "function") {
              if (!element.reportValidity()) {
                return false;
              }
            }
          }
        }
        return true;
      };
      (this.host = host).addController(this);
      this.options = __spreadValues({
        form: (input) => {
          const formId = input.form;
          if (formId) {
            const root = input.getRootNode();
            const form = root.getElementById(formId);
            if (form) {
              return form;
            }
          }
          return input.closest("form");
        },
        name: (input) => input.name,
        value: (input) => input.value,
        defaultValue: (input) => input.defaultValue,
        disabled: (input) => {
          var _a;
          return (_a = input.disabled) != null ? _a : false;
        },
        reportValidity: (input) => typeof input.reportValidity === "function" ? input.reportValidity() : true,
        checkValidity: (input) => typeof input.checkValidity === "function" ? input.checkValidity() : true,
        setValue: (input, value) => input.value = value,
        assumeInteractionOn: ["sl-input"]
      }, options);
    }
    hostConnected() {
      const form = this.options.form(this.host);
      if (form) {
        this.attachForm(form);
      }
      interactions.set(this.host, []);
      this.options.assumeInteractionOn.forEach((event) => {
        this.host.addEventListener(event, this.handleInteraction);
      });
    }
    hostDisconnected() {
      this.detachForm();
      interactions.delete(this.host);
      this.options.assumeInteractionOn.forEach((event) => {
        this.host.removeEventListener(event, this.handleInteraction);
      });
    }
    hostUpdated() {
      const form = this.options.form(this.host);
      if (!form) {
        this.detachForm();
      }
      if (form && this.form !== form) {
        this.detachForm();
        this.attachForm(form);
      }
      if (this.host.hasUpdated) {
        this.setValidity(this.host.validity.valid);
      }
    }
    attachForm(form) {
      if (form) {
        this.form = form;
        if (formCollections.has(this.form)) {
          formCollections.get(this.form).add(this.host);
        } else {
          formCollections.set(this.form, /* @__PURE__ */ new Set([this.host]));
        }
        this.form.addEventListener("formdata", this.handleFormData);
        this.form.addEventListener("submit", this.handleFormSubmit);
        this.form.addEventListener("reset", this.handleFormReset);
        if (!reportValidityOverloads.has(this.form)) {
          reportValidityOverloads.set(this.form, this.form.reportValidity);
          this.form.reportValidity = () => this.reportFormValidity();
        }
        if (!checkValidityOverloads.has(this.form)) {
          checkValidityOverloads.set(this.form, this.form.checkValidity);
          this.form.checkValidity = () => this.checkFormValidity();
        }
      } else {
        this.form = void 0;
      }
    }
    detachForm() {
      if (!this.form)
        return;
      const formCollection = formCollections.get(this.form);
      if (!formCollection) {
        return;
      }
      formCollection.delete(this.host);
      if (formCollection.size <= 0) {
        this.form.removeEventListener("formdata", this.handleFormData);
        this.form.removeEventListener("submit", this.handleFormSubmit);
        this.form.removeEventListener("reset", this.handleFormReset);
        if (reportValidityOverloads.has(this.form)) {
          this.form.reportValidity = reportValidityOverloads.get(this.form);
          reportValidityOverloads.delete(this.form);
        }
        if (checkValidityOverloads.has(this.form)) {
          this.form.checkValidity = checkValidityOverloads.get(this.form);
          checkValidityOverloads.delete(this.form);
        }
        this.form = void 0;
      }
    }
    setUserInteracted(el, hasInteracted) {
      if (hasInteracted) {
        userInteractedControls.add(el);
      } else {
        userInteractedControls.delete(el);
      }
      el.requestUpdate();
    }
    doAction(type, submitter) {
      if (this.form) {
        const button = document.createElement("button");
        button.type = type;
        button.style.position = "absolute";
        button.style.width = "0";
        button.style.height = "0";
        button.style.clipPath = "inset(50%)";
        button.style.overflow = "hidden";
        button.style.whiteSpace = "nowrap";
        if (submitter) {
          button.name = submitter.name;
          button.value = submitter.value;
          ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
            if (submitter.hasAttribute(attr)) {
              button.setAttribute(attr, submitter.getAttribute(attr));
            }
          });
        }
        this.form.append(button);
        button.click();
        button.remove();
      }
    }
    /** Returns the associated `<form>` element, if one exists. */
    getForm() {
      var _a;
      return (_a = this.form) != null ? _a : null;
    }
    /** Resets the form, restoring all the control to their default value */
    reset(submitter) {
      this.doAction("reset", submitter);
    }
    /** Submits the form, triggering validation and form data injection. */
    submit(submitter) {
      this.doAction("submit", submitter);
    }
    /**
     * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
     * the host element immediately, i.e. before Lit updates the component in the next update.
     */
    setValidity(isValid) {
      const host = this.host;
      const hasInteracted = Boolean(userInteractedControls.has(host));
      const required = Boolean(host.required);
      host.toggleAttribute("data-required", required);
      host.toggleAttribute("data-optional", !required);
      host.toggleAttribute("data-invalid", !isValid);
      host.toggleAttribute("data-valid", isValid);
      host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
      host.toggleAttribute("data-user-valid", isValid && hasInteracted);
    }
    /**
     * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
     * that affects constraint validation changes so the component receives the correct validity states.
     */
    updateValidity() {
      const host = this.host;
      this.setValidity(host.validity.valid);
    }
    /**
     * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
     * If the `sl-invalid` event will be cancelled then the original `invalid`
     * event (which may have been passed as argument) will also be cancelled.
     * If no original `invalid` event has been passed then the `sl-invalid`
     * event will be cancelled before being dispatched.
     */
    emitInvalidEvent(originalInvalidEvent) {
      const slInvalidEvent = new CustomEvent("sl-invalid", {
        bubbles: false,
        composed: false,
        cancelable: true,
        detail: {}
      });
      if (!originalInvalidEvent) {
        slInvalidEvent.preventDefault();
      }
      if (!this.host.dispatchEvent(slInvalidEvent)) {
        originalInvalidEvent == null ? void 0 : originalInvalidEvent.preventDefault();
      }
    }
  };
  var validValidityState = Object.freeze({
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: true,
    valueMissing: false
  });
  var valueMissingValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
    valid: false,
    valueMissing: true
  }));
  var customErrorValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
    valid: false,
    customError: true
  }));

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MGOBPGE5.js
  var button_styles_default = i2`
  ${component_styles_default}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js
  var HasSlotController = class {
    constructor(host, ...slotNames) {
      this.slotNames = [];
      this.handleSlotChange = (event) => {
        const slot = event.target;
        if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
          this.host.requestUpdate();
        }
      };
      (this.host = host).addController(this);
      this.slotNames = slotNames;
    }
    hasDefaultSlot() {
      return [...this.host.childNodes].some((node) => {
        if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
          return true;
        }
        if (node.nodeType === node.ELEMENT_NODE) {
          const el = node;
          const tagName = el.tagName.toLowerCase();
          if (tagName === "sl-visually-hidden") {
            return false;
          }
          if (!el.hasAttribute("slot")) {
            return true;
          }
        }
        return false;
      });
    }
    hasNamedSlot(name) {
      return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
    }
    test(slotName) {
      return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
    }
    hostConnected() {
      this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
    }
    hostDisconnected() {
      this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
    }
  };

  // node_modules/lit-html/directive.js
  var t5 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e8 = (t7) => (...e11) => ({ _$litDirective$: t7, values: e11 });
  var i5 = class {
    constructor(t7) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t7, e11, i6) {
      this._$Ct = t7, this._$AM = e11, this._$Ci = i6;
    }
    _$AS(t7, e11) {
      return this.update(t7, e11);
    }
    update(t7, e11) {
      return this.render(...e11);
    }
  };

  // node_modules/lit-html/directives/class-map.js
  var e9 = e8(class extends i5 {
    constructor(t7) {
      if (super(t7), t7.type !== t5.ATTRIBUTE || "class" !== t7.name || t7.strings?.length > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t7) {
      return " " + Object.keys(t7).filter((s6) => t7[s6]).join(" ") + " ";
    }
    update(s6, [i6]) {
      if (void 0 === this.st) {
        this.st = /* @__PURE__ */ new Set(), void 0 !== s6.strings && (this.nt = new Set(s6.strings.join(" ").split(/\s/).filter((t7) => "" !== t7)));
        for (const t7 in i6)
          i6[t7] && !this.nt?.has(t7) && this.st.add(t7);
        return this.render(i6);
      }
      const r9 = s6.element.classList;
      for (const t7 of this.st)
        t7 in i6 || (r9.remove(t7), this.st.delete(t7));
      for (const t7 in i6) {
        const s7 = !!i6[t7];
        s7 === this.st.has(t7) || this.nt?.has(t7) || (s7 ? (r9.add(t7), this.st.add(t7)) : (r9.remove(t7), this.st.delete(t7)));
      }
      return w2;
    }
  });

  // node_modules/lit-html/static.js
  var e10 = Symbol.for("");
  var o6 = (t7) => {
    if (t7?.r === e10)
      return t7?._$litStatic$;
  };
  var s5 = (t7, ...r9) => ({ _$litStatic$: r9.reduce((r10, e11, o9) => r10 + ((t8) => {
    if (void 0 !== t8._$litStatic$)
      return t8._$litStatic$;
    throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t8}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
  })(e11) + t7[o9 + 1], t7[0]), r: e10 });
  var a4 = /* @__PURE__ */ new Map();
  var l4 = (t7) => (r9, ...e11) => {
    const i6 = e11.length;
    let s6, l5;
    const n7 = [], u5 = [];
    let c5, $3 = 0, f4 = false;
    for (; $3 < i6; ) {
      for (c5 = r9[$3]; $3 < i6 && void 0 !== (l5 = e11[$3], s6 = o6(l5)); )
        c5 += s6 + r9[++$3], f4 = true;
      $3 !== i6 && u5.push(l5), n7.push(c5), $3++;
    }
    if ($3 === i6 && n7.push(r9[i6]), f4) {
      const t8 = n7.join("$$lit$$");
      void 0 === (r9 = a4.get(t8)) && (n7.raw = n7, a4.set(t8, r9 = n7)), e11 = u5;
    }
    return t7(r9, ...e11);
  };
  var n6 = l4(x2);
  var u4 = l4(b3);

  // node_modules/lit-html/directives/if-defined.js
  var o7 = (o9) => o9 ?? T2;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.H5IWQ6LD.js
  var SlButton = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.formControlController = new FormControlController(this, {
        assumeInteractionOn: ["click"]
      });
      this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
      this.localize = new LocalizeController2(this);
      this.hasFocus = false;
      this.invalid = false;
      this.title = "";
      this.variant = "default";
      this.size = "medium";
      this.caret = false;
      this.disabled = false;
      this.loading = false;
      this.outline = false;
      this.pill = false;
      this.circle = false;
      this.type = "button";
      this.name = "";
      this.value = "";
      this.href = "";
      this.rel = "noreferrer noopener";
    }
    /** Gets the validity state object */
    get validity() {
      if (this.isButton()) {
        return this.button.validity;
      }
      return validValidityState;
    }
    /** Gets the validation message */
    get validationMessage() {
      if (this.isButton()) {
        return this.button.validationMessage;
      }
      return "";
    }
    firstUpdated() {
      if (this.isButton()) {
        this.formControlController.updateValidity();
      }
    }
    handleBlur() {
      this.hasFocus = false;
      this.emit("sl-blur");
    }
    handleFocus() {
      this.hasFocus = true;
      this.emit("sl-focus");
    }
    handleClick() {
      if (this.type === "submit") {
        this.formControlController.submit(this);
      }
      if (this.type === "reset") {
        this.formControlController.reset(this);
      }
    }
    handleInvalid(event) {
      this.formControlController.setValidity(false);
      this.formControlController.emitInvalidEvent(event);
    }
    isButton() {
      return this.href ? false : true;
    }
    isLink() {
      return this.href ? true : false;
    }
    handleDisabledChange() {
      if (this.isButton()) {
        this.formControlController.setValidity(this.disabled);
      }
    }
    /** Simulates a click on the button. */
    click() {
      this.button.click();
    }
    /** Sets focus on the button. */
    focus(options) {
      this.button.focus(options);
    }
    /** Removes focus from the button. */
    blur() {
      this.button.blur();
    }
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
      if (this.isButton()) {
        return this.button.checkValidity();
      }
      return true;
    }
    /** Gets the associated form, if one exists. */
    getForm() {
      return this.formControlController.getForm();
    }
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
      if (this.isButton()) {
        return this.button.reportValidity();
      }
      return true;
    }
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message) {
      if (this.isButton()) {
        this.button.setCustomValidity(message);
        this.formControlController.updateValidity();
      }
    }
    render() {
      const isLink = this.isLink();
      const tag = isLink ? s5`a` : s5`button`;
      return n6`
      <${tag}
        part="base"
        class=${e9({
        button: true,
        "button--default": this.variant === "default",
        "button--primary": this.variant === "primary",
        "button--success": this.variant === "success",
        "button--neutral": this.variant === "neutral",
        "button--warning": this.variant === "warning",
        "button--danger": this.variant === "danger",
        "button--text": this.variant === "text",
        "button--small": this.size === "small",
        "button--medium": this.size === "medium",
        "button--large": this.size === "large",
        "button--caret": this.caret,
        "button--circle": this.circle,
        "button--disabled": this.disabled,
        "button--focused": this.hasFocus,
        "button--loading": this.loading,
        "button--standard": !this.outline,
        "button--outline": this.outline,
        "button--pill": this.pill,
        "button--rtl": this.localize.dir() === "rtl",
        "button--has-label": this.hasSlotController.test("[default]"),
        "button--has-prefix": this.hasSlotController.test("prefix"),
        "button--has-suffix": this.hasSlotController.test("suffix")
      })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${o7(isLink ? void 0 : this.name)}
        value=${o7(isLink ? void 0 : this.value)}
        href=${o7(isLink ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink ? this.rel : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? n6` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? n6`<sl-spinner part="spinner"></sl-spinner>` : ""}
      </${tag}>
    `;
    }
  };
  SlButton.styles = button_styles_default;
  SlButton.dependencies = {
    "sl-icon": SlIcon,
    "sl-spinner": SlSpinner
  };
  __decorateClass([
    e6(".button")
  ], SlButton.prototype, "button", 2);
  __decorateClass([
    r7()
  ], SlButton.prototype, "hasFocus", 2);
  __decorateClass([
    r7()
  ], SlButton.prototype, "invalid", 2);
  __decorateClass([
    n5()
  ], SlButton.prototype, "title", 2);
  __decorateClass([
    n5({ reflect: true })
  ], SlButton.prototype, "variant", 2);
  __decorateClass([
    n5({ reflect: true })
  ], SlButton.prototype, "size", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlButton.prototype, "caret", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlButton.prototype, "disabled", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlButton.prototype, "loading", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlButton.prototype, "outline", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlButton.prototype, "pill", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlButton.prototype, "circle", 2);
  __decorateClass([
    n5()
  ], SlButton.prototype, "type", 2);
  __decorateClass([
    n5()
  ], SlButton.prototype, "name", 2);
  __decorateClass([
    n5()
  ], SlButton.prototype, "value", 2);
  __decorateClass([
    n5()
  ], SlButton.prototype, "href", 2);
  __decorateClass([
    n5()
  ], SlButton.prototype, "target", 2);
  __decorateClass([
    n5()
  ], SlButton.prototype, "rel", 2);
  __decorateClass([
    n5()
  ], SlButton.prototype, "download", 2);
  __decorateClass([
    n5()
  ], SlButton.prototype, "form", 2);
  __decorateClass([
    n5({ attribute: "formaction" })
  ], SlButton.prototype, "formAction", 2);
  __decorateClass([
    n5({ attribute: "formenctype" })
  ], SlButton.prototype, "formEnctype", 2);
  __decorateClass([
    n5({ attribute: "formmethod" })
  ], SlButton.prototype, "formMethod", 2);
  __decorateClass([
    n5({ attribute: "formnovalidate", type: Boolean })
  ], SlButton.prototype, "formNoValidate", 2);
  __decorateClass([
    n5({ attribute: "formtarget" })
  ], SlButton.prototype, "formTarget", 2);
  __decorateClass([
    watch("disabled", { waitUntilFirstUpdate: true })
  ], SlButton.prototype, "handleDisabledChange", 1);

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5IKI4445.js
  SlButton.define("sl-button");

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7BLP64MK.js
  var icon_button_styles_default = i2`
  ${component_styles_default}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LAJLA5X5.js
  var SlIconButton = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.hasFocus = false;
      this.label = "";
      this.disabled = false;
    }
    handleBlur() {
      this.hasFocus = false;
      this.emit("sl-blur");
    }
    handleFocus() {
      this.hasFocus = true;
      this.emit("sl-focus");
    }
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    /** Simulates a click on the icon button. */
    click() {
      this.button.click();
    }
    /** Sets focus on the icon button. */
    focus(options) {
      this.button.focus(options);
    }
    /** Removes focus from the icon button. */
    blur() {
      this.button.blur();
    }
    render() {
      const isLink = this.href ? true : false;
      const tag = isLink ? s5`a` : s5`button`;
      return n6`
      <${tag}
        part="base"
        class=${e9({
        "icon-button": true,
        "icon-button--disabled": !isLink && this.disabled,
        "icon-button--focused": this.hasFocus
      })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : "button")}
        href=${o7(isLink ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${o7(this.name)}
          library=${o7(this.library)}
          src=${o7(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
    }
  };
  SlIconButton.styles = icon_button_styles_default;
  SlIconButton.dependencies = { "sl-icon": SlIcon };
  __decorateClass([
    e6(".icon-button")
  ], SlIconButton.prototype, "button", 2);
  __decorateClass([
    r7()
  ], SlIconButton.prototype, "hasFocus", 2);
  __decorateClass([
    n5()
  ], SlIconButton.prototype, "name", 2);
  __decorateClass([
    n5()
  ], SlIconButton.prototype, "library", 2);
  __decorateClass([
    n5()
  ], SlIconButton.prototype, "src", 2);
  __decorateClass([
    n5()
  ], SlIconButton.prototype, "href", 2);
  __decorateClass([
    n5()
  ], SlIconButton.prototype, "target", 2);
  __decorateClass([
    n5()
  ], SlIconButton.prototype, "download", 2);
  __decorateClass([
    n5()
  ], SlIconButton.prototype, "label", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlIconButton.prototype, "disabled", 2);

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.25OVILMX.js
  SlIconButton.define("sl-icon-button");

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.WISH4DLW.js
  var button_group_styles_default = i2`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QO26VIPE.js
  var SlButtonGroup = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.disableRole = false;
      this.label = "";
    }
    handleFocus(event) {
      const button = findButton(event.target);
      button == null ? void 0 : button.classList.add("sl-button-group__button--focus");
    }
    handleBlur(event) {
      const button = findButton(event.target);
      button == null ? void 0 : button.classList.remove("sl-button-group__button--focus");
    }
    handleMouseOver(event) {
      const button = findButton(event.target);
      button == null ? void 0 : button.classList.add("sl-button-group__button--hover");
    }
    handleMouseOut(event) {
      const button = findButton(event.target);
      button == null ? void 0 : button.classList.remove("sl-button-group__button--hover");
    }
    handleSlotChange() {
      const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
      slottedElements.forEach((el) => {
        const index = slottedElements.indexOf(el);
        const button = findButton(el);
        if (button) {
          button.classList.add("sl-button-group__button");
          button.classList.toggle("sl-button-group__button--first", index === 0);
          button.classList.toggle("sl-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
          button.classList.toggle("sl-button-group__button--last", index === slottedElements.length - 1);
          button.classList.toggle("sl-button-group__button--radio", button.tagName.toLowerCase() === "sl-radio-button");
        }
      });
    }
    render() {
      return x2`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole ? "presentation" : "group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
    }
  };
  SlButtonGroup.styles = button_group_styles_default;
  __decorateClass([
    e6("slot")
  ], SlButtonGroup.prototype, "defaultSlot", 2);
  __decorateClass([
    r7()
  ], SlButtonGroup.prototype, "disableRole", 2);
  __decorateClass([
    n5()
  ], SlButtonGroup.prototype, "label", 2);
  function findButton(el) {
    var _a;
    const selector = "sl-button, sl-radio-button";
    return (_a = el.closest(selector)) != null ? _a : el.querySelector(selector);
  }

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UJYS7SGI.js
  SlButtonGroup.define("sl-button-group");

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.FLAQ2JUH.js
  var popup_styles_default = i2`
  ${component_styles_default}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;

  // node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
  var min = Math.min;
  var max = Math.max;
  var round = Math.round;
  var floor = Math.floor;
  var createCoords = (v3) => ({
    x: v3,
    y: v3
  });
  var oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  var oppositeAlignmentMap = {
    start: "end",
    end: "start"
  };
  function clamp(start2, value, end) {
    return max(start2, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  function getSideAxis(placement) {
    return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
  }
  function getSideList(side, isStart, rtl) {
    const lr = ["left", "right"];
    const rl = ["right", "left"];
    const tb = ["top", "bottom"];
    const bt = ["bottom", "top"];
    switch (side) {
      case "top":
      case "bottom":
        if (rtl)
          return isStart ? rl : lr;
        return isStart ? lr : rl;
      case "left":
      case "right":
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list = list.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    return {
      ...rect,
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    };
  }

  // node_modules/@floating-ui/core/dist/floating-ui.core.mjs
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case "start":
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case "end":
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }
  var computePosition = async (reference, floating, config) => {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x: x3,
      y: y4
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i6 = 0; i6 < validMiddleware.length; i6++) {
      const {
        name,
        fn
      } = validMiddleware[i6];
      const {
        x: nextX,
        y: nextY,
        data: data2,
        reset
      } = await fn({
        x: x3,
        y: y4,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platform2,
        elements: {
          reference,
          floating
        }
      });
      x3 = nextX != null ? nextX : x3;
      y4 = nextY != null ? nextY : y4;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data2
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x: x3,
            y: y4
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i6 = -1;
      }
    }
    return {
      x: x3,
      y: y4,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x: x3,
      y: y4,
      platform: platform2,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
      element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      ...rects.floating,
      x: x3,
      y: y4
    } : rects.reference;
    const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
    const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }
  var arrow = (options) => ({
    name: "arrow",
    options,
    async fn(state) {
      const {
        x: x3,
        y: y4,
        placement,
        rects,
        platform: platform2,
        elements,
        middlewareData
      } = state;
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x: x3,
        y: y4
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = await platform2.getDimensions(element);
      const isYAxis = axis === "y";
      const minProp = isYAxis ? "top" : "left";
      const maxProp = isYAxis ? "bottom" : "right";
      const clientProp = isYAxis ? "clientHeight" : "clientWidth";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
      if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
      const min$1 = minPadding;
      const max2 = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset2 = clamp(min$1, center, max2);
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: {
          [axis]: offset2,
          centerOffset: center - offset2 - alignmentOffset,
          ...shouldAddOffset && {
            alignmentOffset
          }
        },
        reset: shouldAddOffset
      };
    }
  });
  var flip = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements2 = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements2[nextIndex];
          if (nextPlacement) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d4) => d4.overflows[0] <= 0).sort((a5, b4) => a5.overflows[1] - b4.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$map$so;
                const placement2 = (_overflowsData$map$so = overflowsData.map((d4) => [d4.placement, d4.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a5, b4) => a5[1] - b4[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform: platform2,
      elements
    } = state;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...rawValue
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  var offset = function(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: "offset",
      options,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x: x3,
          y: y4,
          placement,
          middlewareData
        } = state;
        const diffCoords = await convertValueToCoords(state, options);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x3 + diffCoords.x,
          y: y4 + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };
  var shift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      async fn(state) {
        const {
          x: x3,
          y: y4,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x4,
                y: y5
              } = _ref;
              return {
                x: x4,
                y: y5
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x: x3,
          y: y4
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === "y" ? "top" : "left";
          const maxSide = mainAxis === "y" ? "bottom" : "right";
          const min2 = mainAxisCoord + overflow[minSide];
          const max2 = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min2, mainAxisCoord, max2);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === "y" ? "top" : "left";
          const maxSide = crossAxis === "y" ? "bottom" : "right";
          const min2 = crossAxisCoord + overflow[minSide];
          const max2 = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min2, crossAxisCoord, max2);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x3,
            y: limitedCoords.y - y4
          }
        };
      }
    };
  };
  var size = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "size",
      options,
      async fn(state) {
        const {
          placement,
          rects,
          platform: platform2,
          elements
        } = state;
        const {
          apply = () => {
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isYAxis = getSideAxis(placement) === "y";
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === "top" || side === "bottom") {
          heightSide = side;
          widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
        } else {
          widthSide = side;
          heightSide = alignment === "end" ? "top" : "bottom";
        }
        const overflowAvailableHeight = height - overflow[heightSide];
        const overflowAvailableWidth = width - overflow[widthSide];
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if (isYAxis) {
          const maximumClippingWidth = width - overflow.left - overflow.right;
          availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
        } else {
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isYAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform2.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };

  // node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle2(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
  }
  function isTableElement(element) {
    return ["table", "td", "th"].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    const webkit = isWebKit();
    const css = getComputedStyle2(element);
    return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        currentNode = getParentNode(currentNode);
      }
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === "undefined" || !CSS.supports)
      return false;
    return CSS.supports("-webkit-backdrop-filter", "none");
  }
  function isLastTraversableNode(node) {
    return ["html", "body", "#document"].includes(getNodeName(node));
  }
  function getComputedStyle2(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    const result = (
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot || // DOM Element detected.
      node.parentNode || // ShadowRoot detected.
      isShadowRoot(node) && node.host || // Fallback.
      getDocumentElement(node)
    );
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }

  // node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
  function getCssDimensions(element) {
    const css = getComputedStyle2(element);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $: $3
    } = getCssDimensions(domElement);
    let x3 = ($3 ? round(rect.width) : rect.width) / width;
    let y4 = ($3 ? round(rect.height) : rect.height) / height;
    if (!x3 || !Number.isFinite(x3)) {
      x3 = 1;
    }
    if (!y4 || !Number.isFinite(y4)) {
      y4 = 1;
    }
    return {
      x: x3,
      y: y4
    };
  }
  var noOffsets = /* @__PURE__ */ createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x3 = (clientRect.left + visualOffsets.x) / scale.x;
    let y4 = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = currentWin.frameElement;
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle2(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x3 *= iframeScale.x;
        y4 *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x3 += left;
        y4 += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = currentWin.frameElement;
      }
    }
    return rectToClientRect({
      width,
      height,
      x: x3,
      y: y4
    });
  }
  var topLayerSelectors = [":popover-open", ":modal"];
  function isTopLayer(floating) {
    return topLayerSelectors.some((selector) => {
      try {
        return floating.matches(selector);
      } catch (e11) {
        return false;
      }
    });
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === "fixed";
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
  }
  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x3 = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y4 = -scroll.scrollTop;
    if (getComputedStyle2(body).direction === "rtl") {
      x3 += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x: x3,
      y: y4
    };
  }
  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x3 = 0;
    let y4 = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
        x3 = visualViewport.offsetLeft;
        y4 = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x3,
      y: y4
    };
  }
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x3 = left * scale.x;
    const y4 = top * scale.y;
    return {
      width,
      height,
      x: x3,
      y: y4
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport") {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        ...clippingAncestor,
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
  }
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle2(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle2(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === "fixed") {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    const x3 = rect.left + scroll.scrollLeft - offsets.x;
    const y4 = rect.top + scroll.scrollTop - offsets.y;
    return {
      x: x3,
      y: y4,
      width: rect.width,
      height: rect.height
    };
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    return element.offsetParent;
  }
  function getOffsetParent(element, polyfill) {
    const window2 = getWindow(element);
    if (!isHTMLElement(element) || isTopLayer(element)) {
      return window2;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }
  var getElementRects = async function(data2) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    return {
      reference: getRectRelativeToOffsetParent(data2.reference, await getOffsetParentFn(data2.floating), data2.strategy),
      floating: {
        x: 0,
        y: 0,
        ...await getDimensionsFn(data2.floating)
      }
    };
  };
  function isRTL(element) {
    return getComputedStyle2(element).direction === "rtl";
  }
  var platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup2() {
      var _io;
      clearTimeout(timeoutId);
      (_io = io) == null || _io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup2();
      const {
        left,
        top,
        width,
        height
      } = element.getBoundingClientRect();
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 100);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options,
          // Handle <iframe>s
          root: root.ownerDocument
        });
      } catch (e11) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    refresh(true);
    return cleanup2;
  }
  function autoUpdate(reference, floating, update2, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === "function",
      layoutShift = typeof IntersectionObserver === "function",
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.addEventListener("scroll", update2, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener("resize", update2);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update2) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver((_ref) => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            var _resizeObserver;
            (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
          });
        }
        update2();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update2();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update2();
    return () => {
      var _resizeObserver2;
      ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.removeEventListener("scroll", update2);
        ancestorResize && ancestor.removeEventListener("resize", update2);
      });
      cleanupIo == null || cleanupIo();
      (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  var shift2 = shift;
  var flip2 = flip;
  var size2 = size;
  var arrow2 = arrow;
  var computePosition2 = (reference, floating, options) => {
    const cache = /* @__PURE__ */ new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  // node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs
  function t6(t7) {
    return r8(t7);
  }
  function o8(t7) {
    return t7.assignedSlot ? t7.assignedSlot : t7.parentNode instanceof ShadowRoot ? t7.parentNode.host : t7.parentNode;
  }
  function r8(t7) {
    for (let e11 = t7; e11; e11 = o8(e11))
      if (e11 instanceof Element && "none" === getComputedStyle(e11).display)
        return null;
    for (let e11 = o8(t7); e11; e11 = o8(e11)) {
      if (!(e11 instanceof Element))
        continue;
      const t8 = getComputedStyle(e11);
      if ("contents" !== t8.display) {
        if ("static" !== t8.position || "none" !== t8.filter)
          return e11;
        if ("BODY" === e11.tagName)
          return e11;
      }
    }
    return null;
  }

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IL7MSTH2.js
  function isVirtualElement(e11) {
    return e11 !== null && typeof e11 === "object" && "getBoundingClientRect" in e11;
  }
  var SlPopup = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.active = false;
      this.placement = "top";
      this.strategy = "absolute";
      this.distance = 0;
      this.skidding = 0;
      this.arrow = false;
      this.arrowPlacement = "anchor";
      this.arrowPadding = 10;
      this.flip = false;
      this.flipFallbackPlacements = "";
      this.flipFallbackStrategy = "best-fit";
      this.flipPadding = 0;
      this.shift = false;
      this.shiftPadding = 0;
      this.autoSizePadding = 0;
      this.hoverBridge = false;
      this.updateHoverBridge = () => {
        if (this.hoverBridge && this.anchorEl) {
          const anchorRect = this.anchorEl.getBoundingClientRect();
          const popupRect = this.popup.getBoundingClientRect();
          const isVertical = this.placement.includes("top") || this.placement.includes("bottom");
          let topLeftX = 0;
          let topLeftY = 0;
          let topRightX = 0;
          let topRightY = 0;
          let bottomLeftX = 0;
          let bottomLeftY = 0;
          let bottomRightX = 0;
          let bottomRightY = 0;
          if (isVertical) {
            if (anchorRect.top < popupRect.top) {
              topLeftX = anchorRect.left;
              topLeftY = anchorRect.bottom;
              topRightX = anchorRect.right;
              topRightY = anchorRect.bottom;
              bottomLeftX = popupRect.left;
              bottomLeftY = popupRect.top;
              bottomRightX = popupRect.right;
              bottomRightY = popupRect.top;
            } else {
              topLeftX = popupRect.left;
              topLeftY = popupRect.bottom;
              topRightX = popupRect.right;
              topRightY = popupRect.bottom;
              bottomLeftX = anchorRect.left;
              bottomLeftY = anchorRect.top;
              bottomRightX = anchorRect.right;
              bottomRightY = anchorRect.top;
            }
          } else {
            if (anchorRect.left < popupRect.left) {
              topLeftX = anchorRect.right;
              topLeftY = anchorRect.top;
              topRightX = popupRect.left;
              topRightY = popupRect.top;
              bottomLeftX = anchorRect.right;
              bottomLeftY = anchorRect.bottom;
              bottomRightX = popupRect.left;
              bottomRightY = popupRect.bottom;
            } else {
              topLeftX = popupRect.right;
              topLeftY = popupRect.top;
              topRightX = anchorRect.left;
              topRightY = anchorRect.top;
              bottomLeftX = popupRect.right;
              bottomLeftY = popupRect.bottom;
              bottomRightX = anchorRect.left;
              bottomRightY = anchorRect.bottom;
            }
          }
          this.style.setProperty("--hover-bridge-top-left-x", `${topLeftX}px`);
          this.style.setProperty("--hover-bridge-top-left-y", `${topLeftY}px`);
          this.style.setProperty("--hover-bridge-top-right-x", `${topRightX}px`);
          this.style.setProperty("--hover-bridge-top-right-y", `${topRightY}px`);
          this.style.setProperty("--hover-bridge-bottom-left-x", `${bottomLeftX}px`);
          this.style.setProperty("--hover-bridge-bottom-left-y", `${bottomLeftY}px`);
          this.style.setProperty("--hover-bridge-bottom-right-x", `${bottomRightX}px`);
          this.style.setProperty("--hover-bridge-bottom-right-y", `${bottomRightY}px`);
        }
      };
    }
    async connectedCallback() {
      super.connectedCallback();
      await this.updateComplete;
      this.start();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.stop();
    }
    async updated(changedProps) {
      super.updated(changedProps);
      if (changedProps.has("active")) {
        if (this.active) {
          this.start();
        } else {
          this.stop();
        }
      }
      if (changedProps.has("anchor")) {
        this.handleAnchorChange();
      }
      if (this.active) {
        await this.updateComplete;
        this.reposition();
      }
    }
    async handleAnchorChange() {
      await this.stop();
      if (this.anchor && typeof this.anchor === "string") {
        const root = this.getRootNode();
        this.anchorEl = root.getElementById(this.anchor);
      } else if (this.anchor instanceof Element || isVirtualElement(this.anchor)) {
        this.anchorEl = this.anchor;
      } else {
        this.anchorEl = this.querySelector('[slot="anchor"]');
      }
      if (this.anchorEl instanceof HTMLSlotElement) {
        this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
      }
      if (this.anchorEl) {
        this.start();
      }
    }
    start() {
      if (!this.anchorEl) {
        return;
      }
      this.cleanup = autoUpdate(this.anchorEl, this.popup, () => {
        this.reposition();
      });
    }
    async stop() {
      return new Promise((resolve) => {
        if (this.cleanup) {
          this.cleanup();
          this.cleanup = void 0;
          this.removeAttribute("data-current-placement");
          this.style.removeProperty("--auto-size-available-width");
          this.style.removeProperty("--auto-size-available-height");
          requestAnimationFrame(() => resolve());
        } else {
          resolve();
        }
      });
    }
    /** Forces the popup to recalculate and reposition itself. */
    reposition() {
      if (!this.active || !this.anchorEl) {
        return;
      }
      const middleware = [
        // The offset middleware goes first
        offset({ mainAxis: this.distance, crossAxis: this.skidding })
      ];
      if (this.sync) {
        middleware.push(
          size2({
            apply: ({ rects }) => {
              const syncWidth = this.sync === "width" || this.sync === "both";
              const syncHeight = this.sync === "height" || this.sync === "both";
              this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
              this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
            }
          })
        );
      } else {
        this.popup.style.width = "";
        this.popup.style.height = "";
      }
      if (this.flip) {
        middleware.push(
          flip2({
            boundary: this.flipBoundary,
            // @ts-expect-error - We're converting a string attribute to an array here
            fallbackPlacements: this.flipFallbackPlacements,
            fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
            padding: this.flipPadding
          })
        );
      }
      if (this.shift) {
        middleware.push(
          shift2({
            boundary: this.shiftBoundary,
            padding: this.shiftPadding
          })
        );
      }
      if (this.autoSize) {
        middleware.push(
          size2({
            boundary: this.autoSizeBoundary,
            padding: this.autoSizePadding,
            apply: ({ availableWidth, availableHeight }) => {
              if (this.autoSize === "vertical" || this.autoSize === "both") {
                this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
              } else {
                this.style.removeProperty("--auto-size-available-height");
              }
              if (this.autoSize === "horizontal" || this.autoSize === "both") {
                this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
              } else {
                this.style.removeProperty("--auto-size-available-width");
              }
            }
          })
        );
      } else {
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
      }
      if (this.arrow) {
        middleware.push(
          arrow2({
            element: this.arrowEl,
            padding: this.arrowPadding
          })
        );
      }
      const getOffsetParent2 = this.strategy === "absolute" ? (element) => platform.getOffsetParent(element, t6) : platform.getOffsetParent;
      computePosition2(this.anchorEl, this.popup, {
        placement: this.placement,
        middleware,
        strategy: this.strategy,
        platform: __spreadProps(__spreadValues({}, platform), {
          getOffsetParent: getOffsetParent2
        })
      }).then(({ x: x3, y: y4, middlewareData, placement }) => {
        const isRtl = getComputedStyle(this).direction === "rtl";
        const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
        this.setAttribute("data-current-placement", placement);
        Object.assign(this.popup.style, {
          left: `${x3}px`,
          top: `${y4}px`
        });
        if (this.arrow) {
          const arrowX = middlewareData.arrow.x;
          const arrowY = middlewareData.arrow.y;
          let top = "";
          let right = "";
          let bottom = "";
          let left = "";
          if (this.arrowPlacement === "start") {
            const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
            top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
            right = isRtl ? value : "";
            left = isRtl ? "" : value;
          } else if (this.arrowPlacement === "end") {
            const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
            right = isRtl ? "" : value;
            left = isRtl ? value : "";
            bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          } else if (this.arrowPlacement === "center") {
            left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
            top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          } else {
            left = typeof arrowX === "number" ? `${arrowX}px` : "";
            top = typeof arrowY === "number" ? `${arrowY}px` : "";
          }
          Object.assign(this.arrowEl.style, {
            top,
            right,
            bottom,
            left,
            [staticSide]: "calc(var(--arrow-size-diagonal) * -1)"
          });
        }
      });
      requestAnimationFrame(() => this.updateHoverBridge());
      this.emit("sl-reposition");
    }
    render() {
      return x2`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${e9({
        "popup-hover-bridge": true,
        "popup-hover-bridge--visible": this.hoverBridge && this.active
      })}
      ></span>

      <div
        part="popup"
        class=${e9({
        popup: true,
        "popup--active": this.active,
        "popup--fixed": this.strategy === "fixed",
        "popup--has-arrow": this.arrow
      })}
      >
        <slot></slot>
        ${this.arrow ? x2`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
    }
  };
  SlPopup.styles = popup_styles_default;
  __decorateClass([
    e6(".popup")
  ], SlPopup.prototype, "popup", 2);
  __decorateClass([
    e6(".popup__arrow")
  ], SlPopup.prototype, "arrowEl", 2);
  __decorateClass([
    n5()
  ], SlPopup.prototype, "anchor", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlPopup.prototype, "active", 2);
  __decorateClass([
    n5({ reflect: true })
  ], SlPopup.prototype, "placement", 2);
  __decorateClass([
    n5({ reflect: true })
  ], SlPopup.prototype, "strategy", 2);
  __decorateClass([
    n5({ type: Number })
  ], SlPopup.prototype, "distance", 2);
  __decorateClass([
    n5({ type: Number })
  ], SlPopup.prototype, "skidding", 2);
  __decorateClass([
    n5({ type: Boolean })
  ], SlPopup.prototype, "arrow", 2);
  __decorateClass([
    n5({ attribute: "arrow-placement" })
  ], SlPopup.prototype, "arrowPlacement", 2);
  __decorateClass([
    n5({ attribute: "arrow-padding", type: Number })
  ], SlPopup.prototype, "arrowPadding", 2);
  __decorateClass([
    n5({ type: Boolean })
  ], SlPopup.prototype, "flip", 2);
  __decorateClass([
    n5({
      attribute: "flip-fallback-placements",
      converter: {
        fromAttribute: (value) => {
          return value.split(" ").map((p4) => p4.trim()).filter((p4) => p4 !== "");
        },
        toAttribute: (value) => {
          return value.join(" ");
        }
      }
    })
  ], SlPopup.prototype, "flipFallbackPlacements", 2);
  __decorateClass([
    n5({ attribute: "flip-fallback-strategy" })
  ], SlPopup.prototype, "flipFallbackStrategy", 2);
  __decorateClass([
    n5({ type: Object })
  ], SlPopup.prototype, "flipBoundary", 2);
  __decorateClass([
    n5({ attribute: "flip-padding", type: Number })
  ], SlPopup.prototype, "flipPadding", 2);
  __decorateClass([
    n5({ type: Boolean })
  ], SlPopup.prototype, "shift", 2);
  __decorateClass([
    n5({ type: Object })
  ], SlPopup.prototype, "shiftBoundary", 2);
  __decorateClass([
    n5({ attribute: "shift-padding", type: Number })
  ], SlPopup.prototype, "shiftPadding", 2);
  __decorateClass([
    n5({ attribute: "auto-size" })
  ], SlPopup.prototype, "autoSize", 2);
  __decorateClass([
    n5()
  ], SlPopup.prototype, "sync", 2);
  __decorateClass([
    n5({ type: Object })
  ], SlPopup.prototype, "autoSizeBoundary", 2);
  __decorateClass([
    n5({ attribute: "auto-size-padding", type: Number })
  ], SlPopup.prototype, "autoSizePadding", 2);
  __decorateClass([
    n5({ attribute: "hover-bridge", type: Boolean })
  ], SlPopup.prototype, "hoverBridge", 2);

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4AZGT5K5.js
  SlPopup.define("sl-popup");

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LTNP3XQR.js
  var tooltip_styles_default = i2`
  ${component_styles_default}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DHU6MIVB.js
  var defaultAnimationRegistry = /* @__PURE__ */ new Map();
  var customAnimationRegistry = /* @__PURE__ */ new WeakMap();
  function ensureAnimation(animation) {
    return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
  }
  function getLogicalAnimation(animation, dir) {
    if (dir.toLowerCase() === "rtl") {
      return {
        keyframes: animation.rtlKeyframes || animation.keyframes,
        options: animation.options
      };
    }
    return animation;
  }
  function setDefaultAnimation(animationName, animation) {
    defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
  }
  function getAnimation(el, animationName, options) {
    const customAnimation = customAnimationRegistry.get(el);
    if (customAnimation == null ? void 0 : customAnimation[animationName]) {
      return getLogicalAnimation(customAnimation[animationName], options.dir);
    }
    const defaultAnimation = defaultAnimationRegistry.get(animationName);
    if (defaultAnimation) {
      return getLogicalAnimation(defaultAnimation, options.dir);
    }
    return {
      keyframes: [],
      options: { duration: 0 }
    };
  }

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js
  function waitForEvent(el, eventName) {
    return new Promise((resolve) => {
      function done(event) {
        if (event.target === el) {
          el.removeEventListener(eventName, done);
          resolve();
        }
      }
      el.addEventListener(eventName, done);
    });
  }

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LHI6QEL2.js
  function animateTo(el, keyframes, options) {
    return new Promise((resolve) => {
      if ((options == null ? void 0 : options.duration) === Infinity) {
        throw new Error("Promise-based animations must be finite.");
      }
      const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
        duration: prefersReducedMotion() ? 0 : options.duration
      }));
      animation.addEventListener("cancel", resolve, { once: true });
      animation.addEventListener("finish", resolve, { once: true });
    });
  }
  function parseDuration(delay) {
    delay = delay.toString().toLowerCase();
    if (delay.indexOf("ms") > -1) {
      return parseFloat(delay);
    }
    if (delay.indexOf("s") > -1) {
      return parseFloat(delay) * 1e3;
    }
    return parseFloat(delay);
  }
  function prefersReducedMotion() {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    return query.matches;
  }
  function stopAnimations(el) {
    return Promise.all(
      el.getAnimations().map((animation) => {
        return new Promise((resolve) => {
          animation.cancel();
          requestAnimationFrame(resolve);
        });
      })
    );
  }

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KMHZYCWU.js
  var SlTooltip = class extends ShoelaceElement {
    constructor() {
      super();
      this.localize = new LocalizeController2(this);
      this.content = "";
      this.placement = "top";
      this.disabled = false;
      this.distance = 8;
      this.open = false;
      this.skidding = 0;
      this.trigger = "hover focus";
      this.hoist = false;
      this.handleBlur = () => {
        if (this.hasTrigger("focus")) {
          this.hide();
        }
      };
      this.handleClick = () => {
        if (this.hasTrigger("click")) {
          if (this.open) {
            this.hide();
          } else {
            this.show();
          }
        }
      };
      this.handleFocus = () => {
        if (this.hasTrigger("focus")) {
          this.show();
        }
      };
      this.handleDocumentKeyDown = (event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          this.hide();
        }
      };
      this.handleMouseOver = () => {
        if (this.hasTrigger("hover")) {
          const delay = parseDuration(getComputedStyle(this).getPropertyValue("--show-delay"));
          clearTimeout(this.hoverTimeout);
          this.hoverTimeout = window.setTimeout(() => this.show(), delay);
        }
      };
      this.handleMouseOut = () => {
        if (this.hasTrigger("hover")) {
          const delay = parseDuration(getComputedStyle(this).getPropertyValue("--hide-delay"));
          clearTimeout(this.hoverTimeout);
          this.hoverTimeout = window.setTimeout(() => this.hide(), delay);
        }
      };
      this.addEventListener("blur", this.handleBlur, true);
      this.addEventListener("focus", this.handleFocus, true);
      this.addEventListener("click", this.handleClick);
      this.addEventListener("mouseover", this.handleMouseOver);
      this.addEventListener("mouseout", this.handleMouseOut);
    }
    disconnectedCallback() {
      var _a;
      (_a = this.closeWatcher) == null ? void 0 : _a.destroy();
      document.removeEventListener("keydown", this.handleDocumentKeyDown);
    }
    firstUpdated() {
      this.body.hidden = !this.open;
      if (this.open) {
        this.popup.active = true;
        this.popup.reposition();
      }
    }
    hasTrigger(triggerType) {
      const triggers = this.trigger.split(" ");
      return triggers.includes(triggerType);
    }
    async handleOpenChange() {
      var _a, _b;
      if (this.open) {
        if (this.disabled) {
          return;
        }
        this.emit("sl-show");
        if ("CloseWatcher" in window) {
          (_a = this.closeWatcher) == null ? void 0 : _a.destroy();
          this.closeWatcher = new CloseWatcher();
          this.closeWatcher.onclose = () => {
            this.hide();
          };
        } else {
          document.addEventListener("keydown", this.handleDocumentKeyDown);
        }
        await stopAnimations(this.body);
        this.body.hidden = false;
        this.popup.active = true;
        const { keyframes, options } = getAnimation(this, "tooltip.show", { dir: this.localize.dir() });
        await animateTo(this.popup.popup, keyframes, options);
        this.popup.reposition();
        this.emit("sl-after-show");
      } else {
        this.emit("sl-hide");
        (_b = this.closeWatcher) == null ? void 0 : _b.destroy();
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        await stopAnimations(this.body);
        const { keyframes, options } = getAnimation(this, "tooltip.hide", { dir: this.localize.dir() });
        await animateTo(this.popup.popup, keyframes, options);
        this.popup.active = false;
        this.body.hidden = true;
        this.emit("sl-after-hide");
      }
    }
    async handleOptionsChange() {
      if (this.hasUpdated) {
        await this.updateComplete;
        this.popup.reposition();
      }
    }
    handleDisabledChange() {
      if (this.disabled && this.open) {
        this.hide();
      }
    }
    /** Shows the tooltip. */
    async show() {
      if (this.open) {
        return void 0;
      }
      this.open = true;
      return waitForEvent(this, "sl-after-show");
    }
    /** Hides the tooltip */
    async hide() {
      if (!this.open) {
        return void 0;
      }
      this.open = false;
      return waitForEvent(this, "sl-after-hide");
    }
    //
    // NOTE: Tooltip is a bit unique in that we're using aria-live instead of aria-labelledby to trick screen readers into
    // announcing the content. It works really well, but it violates an accessibility rule. We're also adding the
    // aria-describedby attribute to a slot, which is required by <sl-popup> to correctly locate the first assigned
    // element, otherwise positioning is incorrect.
    //
    render() {
      return x2`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${e9({
        tooltip: true,
        "tooltip--open": this.open
      })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? "fixed" : "absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open ? "polite" : "off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `;
    }
  };
  SlTooltip.styles = tooltip_styles_default;
  SlTooltip.dependencies = { "sl-popup": SlPopup };
  __decorateClass([
    e6("slot:not([name])")
  ], SlTooltip.prototype, "defaultSlot", 2);
  __decorateClass([
    e6(".tooltip__body")
  ], SlTooltip.prototype, "body", 2);
  __decorateClass([
    e6("sl-popup")
  ], SlTooltip.prototype, "popup", 2);
  __decorateClass([
    n5()
  ], SlTooltip.prototype, "content", 2);
  __decorateClass([
    n5()
  ], SlTooltip.prototype, "placement", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlTooltip.prototype, "disabled", 2);
  __decorateClass([
    n5({ type: Number })
  ], SlTooltip.prototype, "distance", 2);
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlTooltip.prototype, "open", 2);
  __decorateClass([
    n5({ type: Number })
  ], SlTooltip.prototype, "skidding", 2);
  __decorateClass([
    n5()
  ], SlTooltip.prototype, "trigger", 2);
  __decorateClass([
    n5({ type: Boolean })
  ], SlTooltip.prototype, "hoist", 2);
  __decorateClass([
    watch("open", { waitUntilFirstUpdate: true })
  ], SlTooltip.prototype, "handleOpenChange", 1);
  __decorateClass([
    watch(["content", "distance", "hoist", "placement", "skidding"])
  ], SlTooltip.prototype, "handleOptionsChange", 1);
  __decorateClass([
    watch("disabled")
  ], SlTooltip.prototype, "handleDisabledChange", 1);
  setDefaultAnimation("tooltip.show", {
    keyframes: [
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1 }
    ],
    options: { duration: 150, easing: "ease" }
  });
  setDefaultAnimation("tooltip.hide", {
    keyframes: [
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.8 }
    ],
    options: { duration: 150, easing: "ease" }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.YXUIOLC7.js
  SlTooltip.define("sl-tooltip");

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RMCOWJOW.js
  var resize_observer_styles_default = i2`
  ${component_styles_default}

  :host {
    display: contents;
  }
`;

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GU6S3A75.js
  var SlResizeObserver = class extends ShoelaceElement {
    constructor() {
      super(...arguments);
      this.observedElements = [];
      this.disabled = false;
    }
    connectedCallback() {
      super.connectedCallback();
      this.resizeObserver = new ResizeObserver((entries) => {
        this.emit("sl-resize", { detail: { entries } });
      });
      if (!this.disabled) {
        this.startObserver();
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.stopObserver();
    }
    handleSlotChange() {
      if (!this.disabled) {
        this.startObserver();
      }
    }
    startObserver() {
      const slot = this.shadowRoot.querySelector("slot");
      if (slot !== null) {
        const elements = slot.assignedElements({ flatten: true });
        this.observedElements.forEach((el) => this.resizeObserver.unobserve(el));
        this.observedElements = [];
        elements.forEach((el) => {
          this.resizeObserver.observe(el);
          this.observedElements.push(el);
        });
      }
    }
    stopObserver() {
      this.resizeObserver.disconnect();
    }
    handleDisabledChange() {
      if (this.disabled) {
        this.stopObserver();
      } else {
        this.startObserver();
      }
    }
    render() {
      return x2` <slot @slotchange=${this.handleSlotChange}></slot> `;
    }
  };
  SlResizeObserver.styles = resize_observer_styles_default;
  __decorateClass([
    n5({ type: Boolean, reflect: true })
  ], SlResizeObserver.prototype, "disabled", 2);
  __decorateClass([
    watch("disabled", { waitUntilFirstUpdate: true })
  ], SlResizeObserver.prototype, "handleDisabledChange", 1);

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2XDCNWNM.js
  SlResizeObserver.define("sl-resize-observer");

  // assets/js/shoelace/page.js
  var page_default = initShoelace;

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
    let index = queue.indexOf(job);
    if (index !== -1 && index > lastFlushedIndex)
      queue.splice(index, 1);
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
    for (let i6 = 0; i6 < queue.length; i6++) {
      queue[i6]();
      lastFlushedIndex = i6;
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
    let cleanup2 = () => {
    };
    let wrappedEffect = (callback) => {
      let effectReference = effect(callback);
      if (!el._x_effects) {
        el._x_effects = /* @__PURE__ */ new Set();
        el._x_runEffects = () => {
          el._x_effects.forEach((i6) => i6());
        };
      }
      el._x_effects.add(effectReference);
      cleanup2 = () => {
        if (effectReference === void 0)
          return;
        el._x_effects.delete(effectReference);
        release(effectReference);
      };
      return effectReference;
    };
    return [wrappedEffect, () => {
      cleanup2();
    }];
  }
  function watch2(getter, callback) {
    let firstTime = true;
    let oldValue;
    let effectReference = effect(() => {
      let value = getter();
      JSON.stringify(value);
      if (!firstTime) {
        queueMicrotask(() => {
          callback(value, oldValue);
          oldValue = value;
        });
      } else {
        oldValue = value;
      }
      firstTime = false;
    });
    return () => release(effectReference);
  }
  function dispatch(el, name, detail = {}) {
    el.dispatchEvent(
      new CustomEvent(name, {
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
  function warn(message, ...args) {
    console.warn(`Alpine Warning: ${message}`, ...args);
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
  var initInterceptors = [];
  function interceptInit(callback) {
    initInterceptors.push(callback);
  }
  function initTree(el, walker = walk, intercept = () => {
  }) {
    deferHandlingDirectives(() => {
      walker(el, (el2, skip) => {
        intercept(el2, skip);
        initInterceptors.forEach((i6) => i6(el2, skip));
        directives(el2, el2.attributes).forEach((handle) => handle());
        el2._x_ignore && skip();
      });
    });
  }
  function destroyTree(root) {
    walk(root, (el) => {
      cleanupAttributes(el);
      cleanupElement(el);
    });
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
  function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups)
      el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name])
      el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
  }
  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups)
      return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
      if (names === void 0 || names.includes(name)) {
        value.forEach((i6) => i6());
        delete el._x_attributeCleanups[name];
      }
    });
  }
  function cleanupElement(el) {
    if (el._x_cleanups) {
      while (el._x_cleanups.length)
        el._x_cleanups.pop()();
    }
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
    let addedNodes = /* @__PURE__ */ new Set();
    let removedNodes = /* @__PURE__ */ new Set();
    let addedAttributes = /* @__PURE__ */ new Map();
    let removedAttributes = /* @__PURE__ */ new Map();
    for (let i6 = 0; i6 < mutations.length; i6++) {
      if (mutations[i6].target._x_ignoreMutationObserver)
        continue;
      if (mutations[i6].type === "childList") {
        mutations[i6].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.add(node));
        mutations[i6].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.add(node));
      }
      if (mutations[i6].type === "attributes") {
        let el = mutations[i6].target;
        let name = mutations[i6].attributeName;
        let oldValue = mutations[i6].oldValue;
        let add2 = () => {
          if (!addedAttributes.has(el))
            addedAttributes.set(el, []);
          addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
        };
        let remove = () => {
          if (!removedAttributes.has(el))
            removedAttributes.set(el, []);
          removedAttributes.get(el).push(name);
        };
        if (el.hasAttribute(name) && oldValue === null) {
          add2();
        } else if (el.hasAttribute(name)) {
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
      onAttributeAddeds.forEach((i6) => i6(el, attrs));
    });
    for (let node of removedNodes) {
      if (addedNodes.has(node))
        continue;
      onElRemoveds.forEach((i6) => i6(node));
      destroyTree(node);
    }
    addedNodes.forEach((node) => {
      node._x_ignoreSelf = true;
      node._x_ignore = true;
    });
    for (let node of addedNodes) {
      if (removedNodes.has(node))
        continue;
      if (!node.isConnected)
        continue;
      delete node._x_ignoreSelf;
      delete node._x_ignore;
      onElAddeds.forEach((i6) => i6(node));
      node._x_ignore = true;
      node._x_ignoreSelf = true;
    }
    addedNodes.forEach((node) => {
      delete node._x_ignoreSelf;
      delete node._x_ignore;
    });
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
      node._x_dataStack = node._x_dataStack.filter((i6) => i6 !== data2);
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
        new Set(objects.flatMap((i6) => Object.keys(i6)))
      );
    },
    has({ objects }, name) {
      if (name == Symbol.unscopables)
        return false;
      return objects.some(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name)
      );
    },
    get({ objects }, name, thisProxy) {
      if (name == "toJSON")
        return collapseProxies;
      return Reflect.get(
        objects.find(
          (obj) => Object.prototype.hasOwnProperty.call(obj, name)
        ) || {},
        name,
        thisProxy
      );
    },
    set({ objects }, name, value, thisProxy) {
      const target = objects.find(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name)
      ) || objects[objects.length - 1];
      const descriptor = Object.getOwnPropertyDescriptor(target, name);
      if (descriptor?.set && descriptor?.get)
        return Reflect.set(target, name, value, thisProxy);
      return Reflect.set(target, name, value);
    }
  };
  function collapseProxies() {
    let keys = Reflect.ownKeys(this);
    return keys.reduce((acc, key) => {
      acc[key] = Reflect.get(this, key);
      return acc;
    }, {});
  }
  function initInterceptors2(data2) {
    let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath2 = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
        if (enumerable === false || value === void 0)
          return;
        let path = basePath2 === "" ? key : `${basePath2}.${key}`;
        if (typeof value === "object" && value !== null && value._x_interceptor) {
          obj[key] = value.initialize(data2, path, key);
        } else {
          if (isObject2(value) && value !== obj && !(value instanceof Element)) {
            recurse(value, path);
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
        return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
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
  function set(obj, path, value) {
    if (typeof path === "string")
      path = path.split(".");
    if (path.length === 1)
      obj[path[0]] = value;
    else if (path.length === 0)
      throw error;
    else {
      if (obj[path[0]])
        return set(obj[path[0]], path.slice(1), value);
      else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value);
      }
    }
  }
  var magics = {};
  function magic(name, callback) {
    magics[name] = callback;
  }
  function injectMagics(obj, el) {
    Object.entries(magics).forEach(([name, callback]) => {
      let memoizedUtilities = null;
      function getUtilities() {
        if (memoizedUtilities) {
          return memoizedUtilities;
        } else {
          let [utilities, cleanup2] = getElementBoundUtilities(el);
          memoizedUtilities = { interceptor, ...utilities };
          onElRemoved(el, cleanup2);
          return memoizedUtilities;
        }
      }
      Object.defineProperty(obj, `$${name}`, {
        get() {
          return callback(el, getUtilities());
        },
        enumerable: false
      });
    });
    return obj;
  }
  function tryCatch(el, expression, callback, ...args) {
    try {
      return callback(...args);
    } catch (e11) {
      handleError(e11, el, expression);
    }
  }
  function handleError(error2, el, expression = void 0) {
    error2 = Object.assign(
      error2 ?? { message: "No error message given." },
      { el, expression }
    );
    console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
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
  function evaluate2(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value) => result = value, extras);
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
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
    return tryCatch.bind(null, el, expression, evaluator);
  }
  function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
      runIfTypeOfFunction(receiver, result);
    };
  }
  var evaluatorMemo = {};
  function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) {
      return evaluatorMemo[expression];
    }
    let AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
    const safeAsyncFunction = () => {
      try {
        let func2 = new AsyncFunction(
          ["__self", "scope"],
          `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`
        );
        Object.defineProperty(func2, "name", {
          value: `[Alpine] ${expression}`
        });
        return func2;
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
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      func.result = void 0;
      func.finished = false;
      let completeScope = mergeProxies([scope2, ...dataStack]);
      if (typeof func === "function") {
        let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
        if (func.finished) {
          runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
          func.result = void 0;
        } else {
          promise.then((result) => {
            runIfTypeOfFunction(receiver, result, completeScope, params, el);
          }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
        }
      }
    };
  }
  function runIfTypeOfFunction(receiver, value, scope2, params, el) {
    if (shouldAutoEvaluateFunctions && typeof value === "function") {
      let result = value.apply(scope2, params);
      if (result instanceof Promise) {
        result.then((i6) => runIfTypeOfFunction(receiver, i6, scope2, params)).catch((error2) => handleError(error2, el, value));
      } else {
        receiver(result);
      }
    } else if (typeof value === "object" && value instanceof Promise) {
      value.then((i6) => receiver(i6));
    } else {
      receiver(value);
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
  function directive(name, callback) {
    directiveHandlers[name] = callback;
    return {
      before(directive2) {
        if (!directiveHandlers[directive2]) {
          console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
          return;
        }
        const pos = directiveOrder.indexOf(directive2);
        directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
      }
    };
  }
  function directives(el, attributes, originalAttributeOverride) {
    attributes = Array.from(attributes);
    if (el._x_virtualDirectives) {
      let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
      let staticAttributes = attributesOnly(vAttributes);
      vAttributes = vAttributes.map((attribute) => {
        if (staticAttributes.find((attr) => attr.name === attribute.name)) {
          return {
            name: `x-bind:${attribute.name}`,
            value: `"${attribute.value}"`
          };
        }
        return attribute;
      });
      attributes = attributes.concat(vAttributes);
    }
    let transformedAttributeMap = {};
    let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2) => {
      return getDirectiveHandler(el, directive2);
    });
  }
  function attributesOnly(attributes) {
    return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
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
    let cleanup2 = (callback) => cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup: cleanup2,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate2.bind(evaluate2, el)
    };
    let doCleanup = () => cleanups.forEach((i6) => i6());
    return [utilities, doCleanup];
  }
  function getDirectiveHandler(el, directive2) {
    let noop = () => {
    };
    let handler4 = directiveHandlers[directive2.type] || noop;
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive2.original, cleanup2);
    let fullHandler = () => {
      if (el._x_ignore || el._x_ignoreSelf)
        return;
      handler4.inline && handler4.inline(el, directive2, utilities);
      handler4 = handler4.bind(handler4, el, directive2, utilities);
      isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
    };
    fullHandler.runCleanups = cleanup2;
    return fullHandler;
  }
  var startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject))
      name = name.replace(subject, replacement);
    return { name, value };
  };
  var into = (i6) => i6;
  function toTransformedAttributes(callback = () => {
  }) {
    return ({ name, value }) => {
      let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
        return transform(carry);
      }, { name, value });
      if (newName !== name)
        callback(newName, name);
      return { name: newName, value: newValue };
    };
  }
  var attributeTransformers = [];
  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }
  function outNonAlpineAttributes({ name }) {
    return alpineAttributeRegex().test(name);
  }
  var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name, value }) => {
      let typeMatch = name.match(alpineAttributeRegex());
      let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
      let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      let original = originalAttributeOverride || transformedAttributeMap[name] || name;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map((i6) => i6.replace(".", "")),
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
  function byPriority(a5, b4) {
    let typeA = directiveOrder.indexOf(a5.type) === -1 ? DEFAULT : a5.type;
    let typeB = directiveOrder.indexOf(b4.type) === -1 ? DEFAULT : b4.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
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
  function setClasses(el, value) {
    if (Array.isArray(value)) {
      return setClassesFromString(el, value.join(" "));
    } else if (typeof value === "object" && value !== null) {
      return setClassesFromObject(el, value);
    } else if (typeof value === "function") {
      return setClasses(el, value());
    }
    return setClassesFromString(el, value);
  }
  function setClassesFromString(el, classString) {
    let split = (classString2) => classString2.split(" ").filter(Boolean);
    let missingClasses = (classString2) => classString2.split(" ").filter((i6) => !el.classList.contains(i6)).filter(Boolean);
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
    forRemove.forEach((i6) => {
      if (el.classList.contains(i6)) {
        el.classList.remove(i6);
        removed.push(i6);
      }
    });
    forAdd.forEach((i6) => {
      if (!el.classList.contains(i6)) {
        el.classList.add(i6);
        added.push(i6);
      }
    });
    return () => {
      removed.forEach((i6) => el.classList.add(i6));
      added.forEach((i6) => el.classList.remove(i6));
    };
  }
  function setStyles(el, value) {
    if (typeof value === "object" && value !== null) {
      return setStylesFromObject(el, value);
    }
    return setStylesFromString(el, value);
  }
  function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2]) => {
      previousStyles[key] = el.style[key];
      if (!key.startsWith("--")) {
        key = kebabCase(key);
      }
      el.style.setProperty(key, value2);
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
  function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return () => {
      el.setAttribute("style", cache || "");
    };
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function once(callback, fallback2 = () => {
  }) {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback2.apply(this, arguments);
      }
    };
  }
  directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate22 }) => {
    if (typeof expression === "function")
      expression = evaluate22(expression);
    if (expression === false)
      return;
    if (!expression || typeof expression === "boolean") {
      registerTransitionsFromHelper(el, modifiers, value);
    } else {
      registerTransitionsFromClassString(el, expression, value);
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
      modifiers = modifiers.filter((i6, index) => index < modifiers.indexOf("out"));
    }
    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter((i6, index) => index > modifiers.indexOf("out"));
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
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide2) {
    const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let clickAwayCompatibleShow = () => nextTick2(show);
    if (value) {
      if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
        el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
      } else {
        el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
      }
      return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
      el._x_transition.out(() => {
      }, () => resolve(hide2));
      el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
    }) : Promise.resolve(hide2);
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
            ]).then(([i6]) => i6());
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };
          hideAfterChildren(el).catch((e11) => {
            if (!e11.isFromCancelledTransition)
              throw e11;
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
  function modifierValue(modifiers, key, fallback2) {
    if (modifiers.indexOf(key) === -1)
      return fallback2;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback2;
    if (key === "scale") {
      if (isNaN(rawValue))
        return fallback2;
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
  function skipDuringClone(callback, fallback2 = () => {
  }) {
    return (...args) => isCloning ? fallback2(...args) : callback(...args);
  }
  function onlyDuringClone(callback) {
    return (...args) => isCloning && callback(...args);
  }
  var interceptors = [];
  function interceptClone(callback) {
    interceptors.push(callback);
  }
  function cloneNode(from, to) {
    interceptors.forEach((i6) => i6(from, to));
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
  function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings)
      el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch (name) {
      case "value":
        bindInputValue(el, value);
        break;
      case "style":
        bindStyles(el, value);
        break;
      case "class":
        bindClasses(el, value);
        break;
      case "selected":
      case "checked":
        bindAttributeAndProperty(el, name, value);
        break;
      default:
        bindAttribute(el, name, value);
        break;
    }
  }
  function bindInputValue(el, value) {
    if (el.type === "radio") {
      if (el.attributes.value === void 0) {
        el.value = value;
      }
      if (window.fromModel) {
        if (typeof value === "boolean") {
          el.checked = safeParseBoolean(el.value) === value;
        } else {
          el.checked = checkedAttrLooseCompare(el.value, value);
        }
      }
    } else if (el.type === "checkbox") {
      if (Number.isInteger(value)) {
        el.value = value;
      } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
        el.value = String(value);
      } else {
        if (Array.isArray(value)) {
          el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
        } else {
          el.checked = !!value;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value);
    } else {
      if (el.value === value)
        return;
      el.value = value === void 0 ? "" : value;
    }
  }
  function bindClasses(el, value) {
    if (el._x_undoAddedClasses)
      el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
  }
  function bindStyles(el, value) {
    if (el._x_undoAddedStyles)
      el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
  }
  function bindAttributeAndProperty(el, name, value) {
    bindAttribute(el, name, value);
    setPropertyIfChanged(el, name, value);
  }
  function bindAttribute(el, name, value) {
    if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
      el.removeAttribute(name);
    } else {
      if (isBooleanAttr(name))
        value = name;
      setIfChanged(el, name, value);
    }
  }
  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }
  function setPropertyIfChanged(el, propName, value) {
    if (el[propName] !== value) {
      el[propName] = value;
    }
  }
  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2) => {
      return value2 + "";
    });
    Array.from(el.options).forEach((option) => {
      option.selected = arrayWrappedValue.includes(option.value);
    });
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
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
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
  }
  function getBinding(el, name, fallback2) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    return getAttributeBinding(el, name, fallback2);
  }
  function extractProp(el, name, fallback2, extract = true) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
      let binding = el._x_inlineBindings[name];
      binding.extract = extract;
      return dontAutoEvaluateFunctions(() => {
        return evaluate2(el, binding.expression);
      });
    }
    return getAttributeBinding(el, name, fallback2);
  }
  function getAttributeBinding(el, name, fallback2) {
    let attr = el.getAttribute(name);
    if (attr === null)
      return typeof fallback2 === "function" ? fallback2() : fallback2;
    if (attr === "")
      return true;
    if (isBooleanAttr(name)) {
      return !![name, "true"].includes(attr);
    }
    return attr;
  }
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
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      let context = this, args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
    let firstRun = true;
    let outerHash;
    let innerHash;
    let reference = effect(() => {
      let outer = outerGet();
      let inner = innerGet();
      if (firstRun) {
        innerSet(cloneIfObject(outer));
        firstRun = false;
      } else {
        let outerHashLatest = JSON.stringify(outer);
        let innerHashLatest = JSON.stringify(inner);
        if (outerHashLatest !== outerHash) {
          innerSet(cloneIfObject(outer));
        } else if (outerHashLatest !== innerHashLatest) {
          outerSet(cloneIfObject(inner));
        } else {
        }
      }
      outerHash = JSON.stringify(outerGet());
      innerHash = JSON.stringify(innerGet());
    });
    return () => {
      release(reference);
    };
  }
  function cloneIfObject(value) {
    return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
  }
  function plugin(callback) {
    let callbacks = Array.isArray(callback) ? callback : [callback];
    callbacks.forEach((i6) => i6(alpine_default));
  }
  var stores = {};
  var isReactive = false;
  function store(name, value) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }
    if (value === void 0) {
      return stores[name];
    }
    stores[name] = value;
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
      stores[name].init();
    }
    initInterceptors2(stores[name]);
  }
  function getStores() {
    return stores;
  }
  var binds = {};
  function bind2(name, bindings) {
    let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
    if (name instanceof Element) {
      return applyBindingsObject(name, getBindings());
    } else {
      binds[name] = getBindings;
    }
    return () => {
    };
  }
  function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback(...args);
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
    let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(attributes);
    attributes = attributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    directives(el, attributes, original).map((handle) => {
      cleanupRunners.push(handle.runCleanups);
      handle();
    });
    return () => {
      while (cleanupRunners.length)
        cleanupRunners.pop()();
    };
  }
  var datas = {};
  function data(name, callback) {
    datas[name] = callback;
  }
  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback.bind(context)(...args);
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
    version: "3.13.5",
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
    evaluate: evaluate2,
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
    watch: watch2,
    walk,
    data,
    bind: bind2
  };
  var alpine_default = Alpine;
  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i6 = 0; i6 < list.length; i6++) {
      map[list[i6]] = true;
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
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
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
    return str.replace(camelizeRE, (_3, c5) => c5 ? c5.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
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
      for (let i6 = 0; i6 < deps.length; i6++) {
        deps[i6].delete(effect3);
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
  function track(target, type, key) {
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
          type,
          key
        });
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
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
    if (type === "clear") {
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
      switch (type) {
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
          type,
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
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i6 = 0, l5 = this.length; i6 < l5; i6++) {
          track(arr, "get", i6 + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
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
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
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
  var toReactive = (value) => isObject(value) ? reactive2(value) : value;
  var toReadonly = (value) => isObject(value) ? readonly(value) : value;
  var toShallow = (value) => value;
  var getProto = (v3) => Reflect.getPrototypeOf(v3);
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
  function size3(target, isReadonly = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
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
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
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
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
      const target = this[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
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
  function createReadonlyMethod(type) {
    return function(...args) {
      if (true) {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size3(this);
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
        return size3(this);
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
        return size3(this, true);
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
        return size3(this, true);
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
      const type = toRawType(target);
      console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
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
  function getTargetType(value) {
    return value[
      "__v_skip"
      /* SKIP */
    ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
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
  function isRef(r9) {
    return Boolean(r9 && r9.__v_isRef === true);
  }
  magic("nextTick", () => nextTick);
  magic("dispatch", (el) => dispatch.bind(dispatch, el));
  magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
    let evaluate22 = evaluateLater2(key);
    let getter = () => {
      let value;
      evaluate22((i6) => value = i6);
      return value;
    };
    let unwatch = watch2(getter, callback);
    cleanup2(unwatch);
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
    let currentEl = el;
    while (currentEl) {
      if (currentEl._x_refs)
        refObjects.push(currentEl._x_refs);
      currentEl = currentEl.parentNode;
    }
    return refObjects;
  }
  var globalIdMemo = {};
  function findAndIncrementId(name) {
    if (!globalIdMemo[name])
      globalIdMemo[name] = 0;
    return ++globalIdMemo[name];
  }
  function closestIdRoot(el, name) {
    return findClosest(el, (element) => {
      if (element._x_ids && element._x_ids[name])
        return true;
    });
  }
  function setIdRoot(el, name) {
    if (!el._x_ids)
      el._x_ids = {};
    if (!el._x_ids[name])
      el._x_ids[name] = findAndIncrementId(name);
  }
  magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
    let cacheKey = `${name}${key ? `-${key}` : ""}`;
    return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
      let root = closestIdRoot(el, name);
      let id = root ? root._x_ids[name] : findAndIncrementId(name);
      return key ? `${name}-${id}-${key}` : `${name}-${id}`;
    });
  });
  interceptClone((from, to) => {
    if (from._x_id) {
      to._x_id = from._x_id;
    }
  });
  function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
    if (!el._x_id)
      el._x_id = {};
    if (el._x_id[cacheKey])
      return el._x_id[cacheKey];
    let output = callback();
    el._x_id[cacheKey] = output;
    cleanup2(() => {
      delete el._x_id[cacheKey];
    });
    return output;
  }
  magic("el", (el) => el);
  warnMissingPluginMagic("Focus", "focus", "focus");
  warnMissingPluginMagic("Persist", "persist", "persist");
  function warnMissingPluginMagic(name, magicName, slug) {
    magic(magicName, (el) => warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
    let func = evaluateLater2(expression);
    let innerGet = () => {
      let result;
      func((i6) => result = i6);
      return result;
    };
    let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
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
          set(value) {
            outerSet(value);
          }
        },
        {
          get() {
            return innerGet();
          },
          set(value) {
            innerSet(value);
          }
        }
      );
      cleanup2(releaseEntanglement);
    });
  });
  directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-teleport can only be used on a <template> tag", el);
    let target = getTarget(expression);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    el.setAttribute("data-teleport-template", true);
    clone2.setAttribute("data-teleport-target", true);
    if (el._x_forwardEvents) {
      el._x_forwardEvents.forEach((eventName) => {
        clone2.addEventListener(eventName, (e11) => {
          e11.stopPropagation();
          el.dispatchEvent(new e11.constructor(e11.type, e11));
        });
      });
    }
    addScopeToNode(clone2, {}, el);
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
      placeInDom(clone2, target, modifiers);
      initTree(clone2);
      clone2._x_ignore = true;
    });
    el._x_teleportPutBack = () => {
      let target2 = getTarget(expression);
      mutateDom(() => {
        placeInDom(el._x_teleport, target2, modifiers);
      });
    };
    cleanup2(() => clone2.remove());
  });
  var teleportContainerDuringClone = document.createElement("div");
  function getTarget(expression) {
    let target = skipDuringClone(() => {
      return document.querySelector(expression);
    }, () => {
      return teleportContainerDuringClone;
    })();
    if (!target)
      warn(`Cannot find x-teleport element for selector: "${expression}"`);
    return target;
  }
  var handler = () => {
  };
  handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(() => {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };
  directive("ignore", handler);
  directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
    effect3(evaluateLater(el, expression));
  }));
  function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler4 = (e11) => callback(e11);
    let options = {};
    let wrapHandler = (callback2, wrapper) => (e11) => wrapper(callback2, e11);
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
      handler4 = wrapHandler(handler4, (next, e11) => {
        e11.preventDefault();
        next(e11);
      });
    if (modifiers.includes("stop"))
      handler4 = wrapHandler(handler4, (next, e11) => {
        e11.stopPropagation();
        next(e11);
      });
    if (modifiers.includes("self"))
      handler4 = wrapHandler(handler4, (next, e11) => {
        e11.target === el && next(e11);
      });
    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler4 = wrapHandler(handler4, (next, e11) => {
        if (el.contains(e11.target))
          return;
        if (e11.target.isConnected === false)
          return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1)
          return;
        if (el._x_isShown === false)
          return;
        next(e11);
      });
    }
    if (modifiers.includes("once")) {
      handler4 = wrapHandler(handler4, (next, e11) => {
        next(e11);
        listenerTarget.removeEventListener(event, handler4, options);
      });
    }
    handler4 = wrapHandler(handler4, (next, e11) => {
      if (isKeyEvent(event)) {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e11, modifiers)) {
          return;
        }
      }
      next(e11);
    });
    listenerTarget.addEventListener(event, handler4, options);
    return () => {
      listenerTarget.removeEventListener(event, handler4, options);
    };
  }
  function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
  }
  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
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
  function isListeningForASpecificKeyThatHasntBeenPressed(e11, modifiers) {
    let keyModifiers = modifiers.filter((i6) => {
      return !["window", "document", "prevent", "stop", "once", "capture"].includes(i6);
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
    if (keyModifiers.length === 1 && keyToModifiers(e11.key).includes(keyModifiers[0]))
      return false;
    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i6) => !selectedSystemKeyModifiers.includes(i6));
    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
        if (modifier === "cmd" || modifier === "super")
          modifier = "meta";
        return e11[`${modifier}Key`];
      });
      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (keyToModifiers(e11.key).includes(keyModifiers[0]))
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
  directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let scopeTarget = el;
    if (modifiers.includes("parent")) {
      scopeTarget = el.parentNode;
    }
    let evaluateGet = evaluateLater(scopeTarget, expression);
    let evaluateSet;
    if (typeof expression === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
    } else if (typeof expression === "function" && typeof expression() === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
    } else {
      evaluateSet = () => {
      };
    }
    let getValue = () => {
      let result;
      evaluateGet((value) => result = value);
      return isGetterSetter(result) ? result.get() : result;
    };
    let setValue = (value) => {
      let result;
      evaluateGet((value2) => result = value2);
      if (isGetterSetter(result)) {
        result.set(value);
      } else {
        evaluateSet(() => {
        }, {
          scope: { "__placeholder": value }
        });
      }
    };
    if (typeof expression === "string" && el.type === "radio") {
      mutateDom(() => {
        if (!el.hasAttribute("name"))
          el.setAttribute("name", expression);
      });
    }
    var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let removeListener = isCloning ? () => {
    } : on(el, event, modifiers, (e11) => {
      setValue(getInputValue(el, modifiers, e11, getValue()));
    });
    if (modifiers.includes("fill")) {
      if ([void 0, null, ""].includes(getValue()) || el.type === "checkbox" && Array.isArray(getValue())) {
        el.dispatchEvent(new Event(event, {}));
      }
    }
    if (!el._x_removeModelListeners)
      el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup2(() => el._x_removeModelListeners["default"]());
    if (el.form) {
      let removeResetListener = on(el.form, "reset", [], (e11) => {
        nextTick(() => el._x_model && el._x_model.set(el.value));
      });
      cleanup2(() => removeResetListener());
    }
    el._x_model = {
      get() {
        return getValue();
      },
      set(value) {
        setValue(value);
      }
    };
    el._x_forceModelUpdate = (value) => {
      if (value === void 0 && typeof expression === "string" && expression.match(/\./))
        value = "";
      window.fromModel = true;
      mutateDom(() => bind(el, "value", value));
      delete window.fromModel;
    };
    effect3(() => {
      let value = getValue();
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
        return;
      el._x_forceModelUpdate(value);
    });
  });
  function getInputValue(el, modifiers, event, currentValue) {
    return mutateDom(() => {
      if (event instanceof CustomEvent && event.detail !== void 0)
        return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
      else if (el.type === "checkbox") {
        if (Array.isArray(currentValue)) {
          let newValue = null;
          if (modifiers.includes("number")) {
            newValue = safeParseNumber(event.target.value);
          } else if (modifiers.includes("boolean")) {
            newValue = safeParseBoolean(event.target.value);
          } else {
            newValue = event.target.value;
          }
          return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
        if (modifiers.includes("number")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          });
        } else if (modifiers.includes("boolean")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseBoolean(rawValue);
          });
        }
        return Array.from(event.target.selectedOptions).map((option) => {
          return option.value || option.text;
        });
      } else {
        if (modifiers.includes("number")) {
          return safeParseNumber(event.target.value);
        } else if (modifiers.includes("boolean")) {
          return safeParseBoolean(event.target.value);
        }
        return modifiers.includes("trim") ? event.target.value.trim() : event.target.value;
      }
    });
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
  function isGetterSetter(value) {
    return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
  }
  directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
  addInitSelector(() => `[${prefix("init")}]`);
  directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate22 }) => {
    if (typeof expression === "string") {
      return !!expression.trim() && evaluate22(expression, {}, false);
    }
    return evaluate22(expression, {}, false);
  }));
  directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate22 = evaluateLater2(expression);
    effect3(() => {
      evaluate22((value) => {
        mutateDom(() => {
          el.textContent = value;
        });
      });
    });
  });
  directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate22 = evaluateLater2(expression);
    effect3(() => {
      evaluate22((value) => {
        mutateDom(() => {
          el.innerHTML = value;
          el._x_ignoreSelf = true;
          initTree(el);
          delete el._x_ignoreSelf;
        });
      });
    });
  });
  mapAttributes(startingWith(":", into(prefix("bind:"))));
  var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3 }) => {
    if (!value) {
      let bindingProviders = {};
      injectBindingProviders(bindingProviders);
      let getBindings = evaluateLater(el, expression);
      getBindings((bindings) => {
        applyBindingsObject(el, bindings, original);
      }, { scope: bindingProviders });
      return;
    }
    if (value === "key")
      return storeKeyForXFor(el, expression);
    if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
      return;
    }
    let evaluate22 = evaluateLater(el, expression);
    effect3(() => evaluate22((result) => {
      if (result === void 0 && typeof expression === "string" && expression.match(/\./)) {
        result = "";
      }
      mutateDom(() => bind(el, value, result, modifiers));
    }));
  };
  handler2.inline = (el, { value, modifiers, expression }) => {
    if (!value)
      return;
    if (!el._x_inlineBindings)
      el._x_inlineBindings = {};
    el._x_inlineBindings[value] = { expression, extract: false };
  };
  directive("bind", handler2);
  function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
  }
  addRootSelector(() => `[${prefix("data")}]`);
  directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
    if (shouldSkipRegisteringDataDuringClone(el))
      return;
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    injectMagics(magicContext, el);
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate2(el, expression, { scope: dataProviderContext });
    if (data2 === void 0 || data2 === true)
      data2 = {};
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors2(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate2(el, reactiveData["init"]);
    cleanup2(() => {
      reactiveData["destroy"] && evaluate2(el, reactiveData["destroy"]);
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
  directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
    let evaluate22 = evaluateLater(el, expression);
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
    let hide2 = () => {
      el._x_doHide();
      el._x_isShown = false;
    };
    let show = () => {
      el._x_doShow();
      el._x_isShown = true;
    };
    let clickAwayCompatibleShow = () => setTimeout(show);
    let toggle = once(
      (value) => value ? show() : hide2(),
      (value) => {
        if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
          el._x_toggleAndCascadeWithTransitions(el, value, show, hide2);
        } else {
          value ? clickAwayCompatibleShow() : hide2();
        }
      }
    );
    let oldValue;
    let firstTime = true;
    effect3(() => evaluate22((value) => {
      if (!firstTime && value === oldValue)
        return;
      if (modifiers.includes("immediate"))
        value ? clickAwayCompatibleShow() : hide2();
      toggle(value);
      oldValue = value;
      firstTime = false;
    }));
  });
  directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(
      el,
      // the x-bind:key expression is stored for our use instead of evaluated.
      el._x_keyExpression || "index"
    );
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup2(() => {
      Object.values(el._x_lookup).forEach((el2) => el2.remove());
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });
  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i6) => typeof i6 === "object" && !Array.isArray(i6);
    let templateEl = el;
    evaluateItems((items) => {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), (i6) => i6 + 1);
      }
      if (items === void 0)
        items = [];
      let lookup = el._x_lookup;
      let prevKeys = el._x_prevKeys;
      let scopes = [];
      let keys = [];
      if (isObject2(items)) {
        items = Object.entries(items).map(([key, value]) => {
          let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
          evaluateKey((value2) => keys.push(value2), { scope: { index: key, ...scope2 } });
          scopes.push(scope2);
        });
      } else {
        for (let i6 = 0; i6 < items.length; i6++) {
          let scope2 = getIterationScopeVariables(iteratorNames, items[i6], i6, items);
          evaluateKey((value) => keys.push(value), { scope: { index: i6, ...scope2 } });
          scopes.push(scope2);
        }
      }
      let adds = [];
      let moves = [];
      let removes = [];
      let sames = [];
      for (let i6 = 0; i6 < prevKeys.length; i6++) {
        let key = prevKeys[i6];
        if (keys.indexOf(key) === -1)
          removes.push(key);
      }
      prevKeys = prevKeys.filter((key) => !removes.includes(key));
      let lastKey = "template";
      for (let i6 = 0; i6 < keys.length; i6++) {
        let key = keys[i6];
        let prevIndex = prevKeys.indexOf(key);
        if (prevIndex === -1) {
          prevKeys.splice(i6, 0, key);
          adds.push([lastKey, i6]);
        } else if (prevIndex !== i6) {
          let keyInSpot = prevKeys.splice(i6, 1)[0];
          let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(i6, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(key);
        }
        lastKey = key;
      }
      for (let i6 = 0; i6 < removes.length; i6++) {
        let key = removes[i6];
        if (!!lookup[key]._x_effects) {
          lookup[key]._x_effects.forEach(dequeueJob);
        }
        lookup[key].remove();
        lookup[key] = null;
        delete lookup[key];
      }
      for (let i6 = 0; i6 < moves.length; i6++) {
        let [keyInSpot, keyForSpot] = moves[i6];
        let elInSpot = lookup[keyInSpot];
        let elForSpot = lookup[keyForSpot];
        let marker = document.createElement("div");
        mutateDom(() => {
          if (!elForSpot)
            warn(`x-for ":key" is undefined or invalid`, templateEl);
          elForSpot.after(marker);
          elInSpot.after(elForSpot);
          elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
          marker.before(elInSpot);
          elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
          marker.remove();
        });
        elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
      }
      for (let i6 = 0; i6 < adds.length; i6++) {
        let [lastKey2, index] = adds[i6];
        let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
        if (lastEl._x_currentIfEl)
          lastEl = lastEl._x_currentIfEl;
        let scope2 = scopes[index];
        let key = keys[index];
        let clone2 = document.importNode(templateEl.content, true).firstElementChild;
        let reactiveScope = reactive(scope2);
        addScopeToNode(clone2, reactiveScope, templateEl);
        clone2._x_refreshXForScope = (newScope) => {
          Object.entries(newScope).forEach(([key2, value]) => {
            reactiveScope[key2] = value;
          });
        };
        mutateDom(() => {
          lastEl.after(clone2);
          initTree(clone2);
        });
        if (typeof key === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        }
        lookup[key] = clone2;
      }
      for (let i6 = 0; i6 < sames.length; i6++) {
        lookup[sames[i6]]._x_refreshXForScope(scopes[keys.indexOf(sames[i6])]);
      }
      templateEl._x_prevKeys = keys;
    });
  }
  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
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
  function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i6) => i6.trim());
      names.forEach((name, i6) => {
        scopeVariables[name] = item[i6];
      });
    } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
      let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i6) => i6.trim());
      names.forEach((name) => {
        scopeVariables[name] = item[name];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }
    if (iteratorNames.index)
      scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }
  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function handler3() {
  }
  handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
    let root = closestRoot(el);
    if (!root._x_refs)
      root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(() => delete root._x_refs[expression]);
  };
  directive("ref", handler3);
  directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-if can only be used on a <template> tag", el);
    let evaluate22 = evaluateLater(el, expression);
    let show = () => {
      if (el._x_currentIfEl)
        return el._x_currentIfEl;
      let clone2 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone2, {}, el);
      mutateDom(() => {
        el.after(clone2);
        initTree(clone2);
      });
      el._x_currentIfEl = clone2;
      el._x_undoIf = () => {
        walk(clone2, (node) => {
          if (!!node._x_effects) {
            node._x_effects.forEach(dequeueJob);
          }
        });
        clone2.remove();
        delete el._x_currentIfEl;
      };
      return clone2;
    };
    let hide2 = () => {
      if (!el._x_undoIf)
        return;
      el._x_undoIf();
      delete el._x_undoIf;
    };
    effect3(() => evaluate22((value) => {
      value ? show() : hide2();
    }));
    cleanup2(() => el._x_undoIf && el._x_undoIf());
  });
  directive("id", (el, { expression }, { evaluate: evaluate22 }) => {
    let names = evaluate22(expression);
    names.forEach((name) => setIdRoot(el, name));
  });
  interceptClone((from, to) => {
    if (from._x_ids) {
      to._x_ids = from._x_ids;
    }
  });
  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
    let evaluate22 = expression ? evaluateLater(el, expression) : () => {
    };
    if (el.tagName.toLowerCase() === "template") {
      if (!el._x_forwardEvents)
        el._x_forwardEvents = [];
      if (!el._x_forwardEvents.includes(value))
        el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e11) => {
      evaluate22(() => {
      }, { scope: { "$event": e11 }, params: [e11] });
    });
    cleanup2(() => removeListener());
  }));
  warnMissingPluginDirective("Collapse", "collapse", "collapse");
  warnMissingPluginDirective("Intersect", "intersect", "intersect");
  warnMissingPluginDirective("Focus", "trap", "focus");
  warnMissingPluginDirective("Mask", "mask", "mask");
  function warnMissingPluginDirective(name, directiveName, slug) {
    directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
  var src_default = alpine_default;
  var module_default = src_default;

  // assets/js/alpine/utils.js
  function registerComponents(entries) {
    entries.forEach((entry) => {
      module_default.data(entry.default.componentName, entry.default);
    });
  }

  // import-glob:/Users/mark/Code/lookbook/lookbook-v3/assets/js/alpine|../../../app/components/lookbook/ui/shared/**/*.js
  var __exports = {};
  __export(__exports, {
    default: () => __default,
    filenames: () => filenames
  });

  // app/components/lookbook/ui/shared/code/code.js
  var code_exports = {};
  __export(code_exports, {
    default: () => code_default
  });

  // assets/js/alpine/component.js
  function AlpineComponent(name, fn) {
    fn.componentName = name;
    return fn;
  }

  // assets/js/prism.js
  var import_prismjs = __toESM(require_prism(), 1);

  // node_modules/prismjs/components/prism-json.js
  Prism.languages.json = {
    "property": {
      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
      lookbehind: true,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
      lookbehind: true,
      greedy: true
    },
    "comment": {
      pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
      greedy: true
    },
    "number": /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    "punctuation": /[{}[\],]/,
    "operator": /:/,
    "boolean": /\b(?:false|true)\b/,
    "null": {
      pattern: /\bnull\b/,
      alias: "keyword"
    }
  };
  Prism.languages.webmanifest = Prism.languages.json;

  // node_modules/prismjs/components/prism-haml.js
  (function(Prism3) {
    Prism3.languages.haml = {
      // Multiline stuff should appear before the rest
      "multiline-comment": {
        pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ].+)*/,
        lookbehind: true,
        alias: "comment"
      },
      "multiline-code": [
        {
          pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ].*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ].+)/,
          lookbehind: true,
          inside: Prism3.languages.ruby
        },
        {
          pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ].*\|[\t ]*)*/,
          lookbehind: true,
          inside: Prism3.languages.ruby
        }
      ],
      // See at the end of the file for known filters
      "filter": {
        pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/,
        lookbehind: true,
        inside: {
          "filter-name": {
            pattern: /^:[\w-]+/,
            alias: "symbol"
          }
        }
      },
      "markup": {
        pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
        lookbehind: true,
        inside: Prism3.languages.markup
      },
      "doctype": {
        pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/,
        lookbehind: true
      },
      "tag": {
        // Allows for one nested group of braces
        pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^{}])+\}|\[[^\]]+\])*[\/<>]*/,
        lookbehind: true,
        inside: {
          "attributes": [
            {
              // Lookbehind tries to prevent interpolations from breaking it all
              // Allows for one nested group of braces
              pattern: /(^|[^#])\{(?:\{[^}]+\}|[^{}])+\}/,
              lookbehind: true,
              inside: Prism3.languages.ruby
            },
            {
              pattern: /\([^)]+\)/,
              inside: {
                "attr-value": {
                  pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
                  lookbehind: true
                },
                "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
                "punctuation": /[=(),]/
              }
            },
            {
              pattern: /\[[^\]]+\]/,
              inside: Prism3.languages.ruby
            }
          ],
          "punctuation": /[<>]/
        }
      },
      "code": {
        pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
        lookbehind: true,
        inside: Prism3.languages.ruby
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
            pattern: /[\s\S]+/,
            inside: Prism3.languages.ruby
          }
        }
      },
      "punctuation": {
        pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
        lookbehind: true
      }
    };
    var filter_pattern = "((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+";
    var filters = [
      "css",
      { filter: "coffee", language: "coffeescript" },
      "erb",
      "javascript",
      "less",
      "markdown",
      "ruby",
      "scss",
      "textile"
    ];
    var all_filters = {};
    for (var i6 = 0, l5 = filters.length; i6 < l5; i6++) {
      var filter = filters[i6];
      filter = typeof filter === "string" ? { filter, language: filter } : filter;
      if (Prism3.languages[filter.language]) {
        all_filters["filter-" + filter.filter] = {
          pattern: RegExp(filter_pattern.replace("{{filter_name}}", function() {
            return filter.filter;
          })),
          lookbehind: true,
          inside: {
            "filter-name": {
              pattern: /^:[\w-]+/,
              alias: "symbol"
            },
            "text": {
              pattern: /[\s\S]+/,
              alias: [filter.language, "language-" + filter.language],
              inside: Prism3.languages[filter.language]
            }
          }
        };
      }
    }
    Prism3.languages.insertBefore("haml", "filter", all_filters);
  })(Prism);

  // node_modules/prismjs/components/prism-liquid.js
  Prism.languages.liquid = {
    "comment": {
      pattern: /(^\{%\s*comment\s*%\})[\s\S]+(?=\{%\s*endcomment\s*%\}$)/,
      lookbehind: true
    },
    "delimiter": {
      pattern: /^\{(?:\{\{|[%\{])-?|-?(?:\}\}|[%\}])\}$/,
      alias: "punctuation"
    },
    "string": {
      pattern: /"[^"]*"|'[^']*'/,
      greedy: true
    },
    "keyword": /\b(?:as|assign|break|(?:end)?(?:capture|case|comment|for|form|if|paginate|raw|style|tablerow|unless)|continue|cycle|decrement|echo|else|elsif|in|include|increment|limit|liquid|offset|range|render|reversed|section|when|with)\b/,
    "object": /\b(?:address|all_country_option_tags|article|block|blog|cart|checkout|collection|color|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|part|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,
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
    "boolean": /\b(?:false|nil|true)\b/,
    "range": {
      pattern: /\.\./,
      alias: "operator"
    },
    // https://github.com/Shopify/liquid/blob/698f5e0d967423e013f6169d9111bd969bd78337/lib/liquid/lexer.rb#L21
    "number": /\b\d+(?:\.\d+)?\b/,
    "operator": /[!=]=|<>|[<>]=?|[|?:=-]|\b(?:and|contains(?=\s)|or)\b/,
    "punctuation": /[.,\[\]()]/,
    "empty": {
      pattern: /\bempty\b/,
      alias: "keyword"
    }
  };
  Prism.hooks.add("before-tokenize", function(env) {
    var liquidPattern = /\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}|\{(?:%[\s\S]*?%|\{\{[\s\S]*?\}\}|\{[\s\S]*?\})\}/g;
    var insideRaw = false;
    Prism.languages["markup-templating"].buildPlaceholders(env, "liquid", liquidPattern, function(match) {
      var tagMatch = /^\{%-?\s*(\w+)/.exec(match);
      if (tagMatch) {
        var tag = tagMatch[1];
        if (tag === "raw" && !insideRaw) {
          insideRaw = true;
          return true;
        } else if (tag === "endraw") {
          insideRaw = false;
          return true;
        }
      }
      return !insideRaw;
    });
  });
  Prism.hooks.add("after-tokenize", function(env) {
    Prism.languages["markup-templating"].tokenizePlaceholders(env, "liquid");
  });

  // node_modules/prismjs/components/prism-ruby.js
  (function(Prism3) {
    Prism3.languages.ruby = Prism3.languages.extend("clike", {
      "comment": {
        pattern: /#.*|^=begin\s[\s\S]*?^=end/m,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
        lookbehind: true,
        inside: {
          "punctuation": /[.\\]/
        }
      },
      "keyword": /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
      "operator": /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,
      "punctuation": /[(){}[\].,;]/
    });
    Prism3.languages.insertBefore("ruby", "operator", {
      "double-colon": {
        pattern: /::/,
        alias: "punctuation"
      }
    });
    var interpolation = {
      pattern: /((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,
      lookbehind: true,
      inside: {
        "content": {
          pattern: /^(#\{)[\s\S]+(?=\}$)/,
          lookbehind: true,
          inside: Prism3.languages.ruby
        },
        "delimiter": {
          pattern: /^#\{|\}$/,
          alias: "punctuation"
        }
      }
    };
    delete Prism3.languages.ruby.function;
    var percentExpression = "(?:" + [
      /([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
      /\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source,
      /\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source,
      /\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source,
      /<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source
    ].join("|") + ")";
    var symbolName = /(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source;
    Prism3.languages.insertBefore("ruby", "keyword", {
      "regex-literal": [
        {
          pattern: RegExp(/%r/.source + percentExpression + /[egimnosux]{0,6}/.source),
          greedy: true,
          inside: {
            "interpolation": interpolation,
            "regex": /[\s\S]+/
          }
        },
        {
          pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
          lookbehind: true,
          greedy: true,
          inside: {
            "interpolation": interpolation,
            "regex": /[\s\S]+/
          }
        }
      ],
      "variable": /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
      "symbol": [
        {
          pattern: RegExp(/(^|[^:]):/.source + symbolName),
          lookbehind: true,
          greedy: true
        },
        {
          pattern: RegExp(/([\r\n{(,][ \t]*)/.source + symbolName + /(?=:(?!:))/.source),
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
      }
    });
    Prism3.languages.insertBefore("ruby", "string", {
      "string-literal": [
        {
          pattern: RegExp(/%[qQiIwWs]?/.source + percentExpression),
          greedy: true,
          inside: {
            "interpolation": interpolation,
            "string": /[\s\S]+/
          }
        },
        {
          pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
          greedy: true,
          inside: {
            "interpolation": interpolation,
            "string": /[\s\S]+/
          }
        },
        {
          pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
          alias: "heredoc-string",
          greedy: true,
          inside: {
            "delimiter": {
              pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
              inside: {
                "symbol": /\b\w+/,
                "punctuation": /^<<[-~]?/
              }
            },
            "interpolation": interpolation,
            "string": /[\s\S]+/
          }
        },
        {
          pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
          alias: "heredoc-string",
          greedy: true,
          inside: {
            "delimiter": {
              pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
              inside: {
                "symbol": /\b\w+/,
                "punctuation": /^<<[-~]?'|'$/
              }
            },
            "string": /[\s\S]+/
          }
        }
      ],
      "command-literal": [
        {
          pattern: RegExp(/%x/.source + percentExpression),
          greedy: true,
          inside: {
            "interpolation": interpolation,
            "command": {
              pattern: /[\s\S]+/,
              alias: "string"
            }
          }
        },
        {
          pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,
          greedy: true,
          inside: {
            "interpolation": interpolation,
            "command": {
              pattern: /[\s\S]+/,
              alias: "string"
            }
          }
        }
      ]
    });
    delete Prism3.languages.ruby.string;
    Prism3.languages.insertBefore("ruby", "number", {
      "builtin": /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
      "constant": /\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/
    });
    Prism3.languages.rb = Prism3.languages.ruby;
  })(Prism);

  // node_modules/prismjs/components/prism-css.js
  (function(Prism3) {
    var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    Prism3.languages.css = {
      "comment": /\/\*[\s\S]*?\*\//,
      "atrule": {
        pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
        inside: {
          "rule": /^@[\w-]+/,
          "selector-function-argument": {
            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: true,
            alias: "selector"
          },
          "keyword": {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: true
          }
          // See rest below
        }
      },
      "url": {
        // https://drafts.csswg.org/css-values-3/#urls
        pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
        greedy: true,
        inside: {
          "function": /^url/i,
          "punctuation": /^\(|\)$/,
          "string": {
            pattern: RegExp("^" + string.source + "$"),
            alias: "url"
          }
        }
      },
      "selector": {
        pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
        lookbehind: true
      },
      "string": {
        pattern: string,
        greedy: true
      },
      "property": {
        pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: true
      },
      "important": /!important\b/i,
      "function": {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: true
      },
      "punctuation": /[(){};:,]/
    };
    Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
    var markup = Prism3.languages.markup;
    if (markup) {
      markup.tag.addInlined("style", "css");
      markup.tag.addAttribute("style", "css");
    }
  })(Prism);

  // node_modules/prismjs/components/prism-css-extras.js
  (function(Prism3) {
    var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    var selectorInside;
    Prism3.languages.css.selector = {
      pattern: Prism3.languages.css.selector.pattern,
      lookbehind: true,
      inside: selectorInside = {
        "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        "pseudo-class": /:[-\w]+/,
        "class": /\.[-\w]+/,
        "id": /#[-\w]+/,
        "attribute": {
          pattern: RegExp(`\\[(?:[^[\\]"']|` + string.source + ")*\\]"),
          greedy: true,
          inside: {
            "punctuation": /^\[|\]$/,
            "case-sensitivity": {
              pattern: /(\s)[si]$/i,
              lookbehind: true,
              alias: "keyword"
            },
            "namespace": {
              pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
              lookbehind: true,
              inside: {
                "punctuation": /\|$/
              }
            },
            "attr-name": {
              pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
              lookbehind: true
            },
            "attr-value": [
              string,
              {
                pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
                lookbehind: true
              }
            ],
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
        "combinator": />|\+|~|\|\|/,
        // the `tag` token has been existed and removed.
        // because we can't find a perfect tokenize to match it.
        // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.
        "punctuation": /[(),]/
      }
    };
    Prism3.languages.css["atrule"].inside["selector-function-argument"].inside = selectorInside;
    Prism3.languages.insertBefore("css", "property", {
      "variable": {
        pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
        lookbehind: true
      }
    });
    var unit = {
      pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
      lookbehind: true
    };
    var number = {
      pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
      lookbehind: true
    };
    Prism3.languages.insertBefore("css", "function", {
      "operator": {
        pattern: /(\s)[+\-*\/](?=\s)/,
        lookbehind: true
      },
      // CAREFUL!
      // Previewers and Inline color use hexcode and color.
      "hexcode": {
        pattern: /\B#[\da-f]{3,8}\b/i,
        alias: "color"
      },
      "color": [
        {
          pattern: /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
          lookbehind: true
        },
        {
          pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
          inside: {
            "unit": unit,
            "number": number,
            "function": /[\w-]+(?=\()/,
            "punctuation": /[(),]/
          }
        }
      ],
      // it's important that there is no boundary assertion after the hex digits
      "entity": /\\[\da-f]{1,8}/i,
      "unit": unit,
      "number": number
    });
  })(Prism);

  // node_modules/prismjs/components/prism-markup.js
  Prism.languages.markup = {
    "comment": {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
      greedy: true
    },
    "prolog": {
      pattern: /<\?[\s\S]+?\?>/,
      greedy: true
    },
    "doctype": {
      // https://www.w3.org/TR/xml/#NT-doctypedecl
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: true,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: true,
          greedy: true,
          inside: null
          // see below
        },
        "string": {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: true
        },
        "punctuation": /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        "name": /[^\s<>'"]+/
      }
    },
    "cdata": {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      greedy: true
    },
    "tag": {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: true,
      inside: {
        "tag": {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            "punctuation": /^<\/?/,
            "namespace": /^[^\s>\/:]+:/
          }
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            "punctuation": [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: true
              }
            ]
          }
        },
        "punctuation": /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            "namespace": /^[^\s>\/:]+:/
          }
        }
      }
    },
    "entity": [
      {
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
      },
      /&#x?[\da-f]{1,8};/i
    ]
  };
  Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
  Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
  Prism.hooks.add("wrap", function(env) {
    if (env.type === "entity") {
      env.attributes["title"] = env.content.replace(/&amp;/, "&");
    }
  });
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    /**
     * Adds an inlined language to markup.
     *
     * An example of an inlined language is CSS with `<style>` tags.
     *
     * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addInlined('style', 'css');
     */
    value: function addInlined(tagName, lang) {
      var includedCdataInside = {};
      includedCdataInside["language-" + lang] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: true,
        inside: Prism.languages[lang]
      };
      includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
      var inside = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: includedCdataInside
        }
      };
      inside["language-" + lang] = {
        pattern: /[\s\S]+/,
        inside: Prism.languages[lang]
      };
      var def = {};
      def[tagName] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
          return tagName;
        }), "i"),
        lookbehind: true,
        greedy: true,
        inside
      };
      Prism.languages.insertBefore("markup", "cdata", def);
    }
  });
  Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    /**
     * Adds an pattern to highlight languages embedded in HTML attributes.
     *
     * An example of an inlined language is CSS with `style` attributes.
     *
     * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addAttribute('style', 'css');
     */
    value: function(attrName, lang) {
      Prism.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
          "i"
        ),
        lookbehind: true,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              "value": {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: true,
                alias: [lang, "language-" + lang],
                inside: Prism.languages[lang]
              },
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          }
        }
      });
    }
  });
  Prism.languages.html = Prism.languages.markup;
  Prism.languages.mathml = Prism.languages.markup;
  Prism.languages.svg = Prism.languages.markup;
  Prism.languages.xml = Prism.languages.extend("markup", {});
  Prism.languages.ssml = Prism.languages.xml;
  Prism.languages.atom = Prism.languages.xml;
  Prism.languages.rss = Prism.languages.xml;

  // node_modules/prismjs/components/prism-markup-templating.js
  (function(Prism3) {
    function getPlaceholder(language, index) {
      return "___" + language.toUpperCase() + index + "___";
    }
    Object.defineProperties(Prism3.languages["markup-templating"] = {}, {
      buildPlaceholders: {
        /**
         * Tokenize all inline templating expressions matching `placeholderPattern`.
         *
         * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
         * `true` will be replaced.
         *
         * @param {object} env The environment of the `before-tokenize` hook.
         * @param {string} language The language id.
         * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
         * @param {(match: string) => boolean} [replaceFilter]
         */
        value: function(env, language, placeholderPattern, replaceFilter) {
          if (env.language !== language) {
            return;
          }
          var tokenStack = env.tokenStack = [];
          env.code = env.code.replace(placeholderPattern, function(match) {
            if (typeof replaceFilter === "function" && !replaceFilter(match)) {
              return match;
            }
            var i6 = tokenStack.length;
            var placeholder;
            while (env.code.indexOf(placeholder = getPlaceholder(language, i6)) !== -1) {
              ++i6;
            }
            tokenStack[i6] = match;
            return placeholder;
          });
          env.grammar = Prism3.languages.markup;
        }
      },
      tokenizePlaceholders: {
        /**
         * Replace placeholders with proper tokens after tokenizing.
         *
         * @param {object} env The environment of the `after-tokenize` hook.
         * @param {string} language The language id.
         */
        value: function(env, language) {
          if (env.language !== language || !env.tokenStack) {
            return;
          }
          env.grammar = Prism3.languages[language];
          var j3 = 0;
          var keys = Object.keys(env.tokenStack);
          function walkTokens(tokens) {
            for (var i6 = 0; i6 < tokens.length; i6++) {
              if (j3 >= keys.length) {
                break;
              }
              var token = tokens[i6];
              if (typeof token === "string" || token.content && typeof token.content === "string") {
                var k3 = keys[j3];
                var t7 = env.tokenStack[k3];
                var s6 = typeof token === "string" ? token : token.content;
                var placeholder = getPlaceholder(language, k3);
                var index = s6.indexOf(placeholder);
                if (index > -1) {
                  ++j3;
                  var before = s6.substring(0, index);
                  var middle = new Prism3.Token(language, Prism3.tokenize(t7, env.grammar), "language-" + language, t7);
                  var after = s6.substring(index + placeholder.length);
                  var replacement = [];
                  if (before) {
                    replacement.push.apply(replacement, walkTokens([before]));
                  }
                  replacement.push(middle);
                  if (after) {
                    replacement.push.apply(replacement, walkTokens([after]));
                  }
                  if (typeof token === "string") {
                    tokens.splice.apply(tokens, [i6, 1].concat(replacement));
                  } else {
                    token.content = replacement;
                  }
                }
              } else if (token.content) {
                walkTokens(token.content);
              }
            }
            return tokens;
          }
          walkTokens(env.tokens);
        }
      }
    });
  })(Prism);

  // node_modules/prismjs/components/prism-erb.js
  (function(Prism3) {
    Prism3.languages.erb = {
      "delimiter": {
        pattern: /^(\s*)<%=?|%>(?=\s*$)/,
        lookbehind: true,
        alias: "punctuation"
      },
      "ruby": {
        pattern: /\s*\S[\s\S]*/,
        alias: "language-ruby",
        inside: Prism3.languages.ruby
      }
    };
    Prism3.hooks.add("before-tokenize", function(env) {
      var erbPattern = /<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/g;
      Prism3.languages["markup-templating"].buildPlaceholders(env, "erb", erbPattern);
    });
    Prism3.hooks.add("after-tokenize", function(env) {
      Prism3.languages["markup-templating"].tokenizePlaceholders(env, "erb");
    });
  })(Prism);

  // assets/js/prism.js
  import_prismjs.default.manual = true;
  var prism_default = import_prismjs.default;

  // app/components/lookbook/ui/shared/code/code.js
  var code_default = AlpineComponent("code", () => {
    return {
      init() {
        prism_default.highlightElement(this.$refs.code);
      }
    };
  });

  // app/components/lookbook/ui/shared/page/page.js
  var page_exports = {};
  __export(page_exports, {
    default: () => page_default2
  });
  var page_default2 = AlpineComponent("page", () => {
    return {};
  });

  // app/components/lookbook/ui/shared/prose/prose.js
  var prose_exports = {};
  __export(prose_exports, {
    default: () => prose_default
  });
  var prose_default = AlpineComponent("prose", () => {
    return {};
  });

  // import-glob:/Users/mark/Code/lookbook/lookbook-v3/assets/js/alpine|../../../app/components/lookbook/ui/shared/**/*.js
  var modules = [code_exports, page_exports, prose_exports];
  var __default = modules;
  var filenames = ["../../../app/components/lookbook/ui/shared/code/code.js", "../../../app/components/lookbook/ui/shared/page/page.js", "../../../app/components/lookbook/ui/shared/prose/prose.js"];

  // assets/js/alpine/page.js
  window.Alpine = module_default;
  function initAlpine({ logger: logger2 }) {
    module_default.magic("logger", () => logger2);
    registerComponents(__exports);
    module_default.start();
  }

  // assets/entrypoints/page.js
  var logger = new Logger("page");
  var base = document.createElement("base");
  base.setAttribute("target", "_parent");
  document.body.prepend(base);
  addEventListener("click", (event) => {
    const link = event.target.closest("[href]");
    if (link) {
      const isExternalLink = link.host && link.host !== window.location.host;
      if (!isExternalLink && !link.hasAttribute("target")) {
        event.preventDefault();
        window.parent.postMessage(
          JSON.stringify({ action: "visit", url: link.href }),
          "*"
        );
      }
    }
  });
  page_default({ logger });
  initAlpine({ logger });
})();
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
