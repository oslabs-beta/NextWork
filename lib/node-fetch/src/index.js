"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AbortError", {
  enumerable: true,
  get: function get() {
    return _abortError.AbortError;
  }
});
Object.defineProperty(exports, "Blob", {
  enumerable: true,
  get: function get() {
    return _from.Blob;
  }
});
Object.defineProperty(exports, "FetchError", {
  enumerable: true,
  get: function get() {
    return _fetchError.FetchError;
  }
});
Object.defineProperty(exports, "File", {
  enumerable: true,
  get: function get() {
    return _from.File;
  }
});
Object.defineProperty(exports, "FormData", {
  enumerable: true,
  get: function get() {
    return _esmMin.FormData;
  }
});
Object.defineProperty(exports, "Headers", {
  enumerable: true,
  get: function get() {
    return _headers["default"];
  }
});
Object.defineProperty(exports, "Request", {
  enumerable: true,
  get: function get() {
    return _request["default"];
  }
});
Object.defineProperty(exports, "Response", {
  enumerable: true,
  get: function get() {
    return _response2["default"];
  }
});
Object.defineProperty(exports, "blobFrom", {
  enumerable: true,
  get: function get() {
    return _from.blobFrom;
  }
});
Object.defineProperty(exports, "blobFromSync", {
  enumerable: true,
  get: function get() {
    return _from.blobFromSync;
  }
});
exports["default"] = fetch;
Object.defineProperty(exports, "fileFrom", {
  enumerable: true,
  get: function get() {
    return _from.fileFrom;
  }
});
Object.defineProperty(exports, "fileFromSync", {
  enumerable: true,
  get: function get() {
    return _from.fileFromSync;
  }
});
Object.defineProperty(exports, "isRedirect", {
  enumerable: true,
  get: function get() {
    return _isRedirect.isRedirect;
  }
});
var _nodeHttp = _interopRequireDefault(require("node:http"));
var _nodeHttps = _interopRequireDefault(require("node:https"));
var _nodeZlib = _interopRequireDefault(require("node:zlib"));
var _nodeStream = _interopRequireWildcard(require("node:stream"));
var _nodeBuffer = require("node:buffer");
var _dataUriToBuffer = _interopRequireDefault(require("data-uri-to-buffer"));
var _body = require("./body.js");
var _response2 = _interopRequireDefault(require("./response.js"));
var _headers = _interopRequireWildcard(require("./headers.js"));
var _request = _interopRequireWildcard(require("./request.js"));
var _fetchError = require("./errors/fetch-error.js");
var _abortError = require("./errors/abort-error.js");
var _isRedirect = require("./utils/is-redirect.js");
var _esmMin = require("formdata-polyfill/esm.min.js");
var _is = require("./utils/is.js");
var _referrer = require("./utils/referrer.js");
var _from = require("fetch-blob/from.js");
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
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
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
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
} /**
   * Index.js
   *
   * a request API compatible with window.fetch
   *
   * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
   */
var supportedSchemas = new Set(['data:', 'http:', 'https:']);

/**
 * Fetch function
 *
 * @param   {string | URL | import('./request').default} url - Absolute url or Request instance
 * @param   {*} [options_] - Fetch options
 * @return  {Promise<import('./response').default>}
 */
function fetch(_x, _x2) {
  return _fetch.apply(this, arguments);
}
function _fetch() {
  _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, options_) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            // Build request object
            var request = new _request["default"](url, options_);
            var _getNodeRequestOption = (0, _request.getNodeRequestOptions)(request),
              parsedURL = _getNodeRequestOption.parsedURL,
              options = _getNodeRequestOption.options;
            if (!supportedSchemas.has(parsedURL.protocol)) {
              throw new TypeError("node-fetch cannot load ".concat(url, ". URL scheme \"").concat(parsedURL.protocol.replace(/:$/, ''), "\" is not supported."));
            }
            if (parsedURL.protocol === 'data:') {
              var data = (0, _dataUriToBuffer["default"])(request.url);
              var _response = new _response2["default"](data, {
                headers: {
                  'Content-Type': data.typeFull
                }
              });
              resolve(_response);
              return;
            }

            // Wrap http.request into fetch
            var send = (parsedURL.protocol === 'https:' ? _nodeHttps["default"] : _nodeHttp["default"]).request;
            var signal = request.signal;
            var response = null;
            var abort = function abort() {
              var error = new _abortError.AbortError('The operation was aborted.');
              reject(error);
              if (request.body && request.body instanceof _nodeStream["default"].Readable) {
                request.body.destroy(error);
              }
              if (!response || !response.body) {
                return;
              }
              response.body.emit('error', error);
            };
            if (signal && signal.aborted) {
              abort();
              return;
            }
            var abortAndFinalize = function abortAndFinalize() {
              abort();
              finalize();
            };

            // Send request
            var request_ = send(parsedURL.toString(), options);
            if (signal) {
              signal.addEventListener('abort', abortAndFinalize);
            }
            var finalize = function finalize() {
              request_.abort();
              if (signal) {
                signal.removeEventListener('abort', abortAndFinalize);
              }
            };
            request_.on('error', function (error) {
              reject(new _fetchError.FetchError("request to ".concat(request.url, " failed, reason: ").concat(error.message), 'system', error));
              finalize();
            });
            fixResponseChunkedTransferBadEnding(request_, function (error) {
              if (response && response.body) {
                response.body.destroy(error);
              }
            });

            /* c8 ignore next 18 */
            if (process.version < 'v14') {
              // Before Node.js 14, pipeline() does not fully support async iterators and does not always
              // properly handle when the socket close/end events are out of order.
              request_.on('socket', function (s) {
                var endedWithEventsCount;
                s.prependListener('end', function () {
                  endedWithEventsCount = s._eventsCount;
                });
                s.prependListener('close', function (hadError) {
                  // if end happened before close but the socket didn't emit an error, do it now
                  if (response && endedWithEventsCount < s._eventsCount && !hadError) {
                    var error = new Error('Premature close');
                    error.code = 'ERR_STREAM_PREMATURE_CLOSE';
                    response.body.emit('error', error);
                  }
                });
              });
            }
            request_.on('response', function (response_) {
              request_.setTimeout(0);
              var headers = (0, _headers.fromRawHeaders)(response_.rawHeaders);

              // HTTP fetch step 5
              if ((0, _isRedirect.isRedirect)(response_.statusCode)) {
                // HTTP fetch step 5.2
                var location = headers.get('Location');

                // HTTP fetch step 5.3
                var locationURL = null;
                try {
                  locationURL = location === null ? null : new URL(location, request.url);
                } catch (_unused) {
                  // error here can only be invalid URL in Location: header
                  // do not throw when options.redirect == manual
                  // let the user extract the errorneous redirect URL
                  if (request.redirect !== 'manual') {
                    reject(new _fetchError.FetchError("uri requested responds with an invalid redirect URL: ".concat(location), 'invalid-redirect'));
                    finalize();
                    return;
                  }
                }

                // HTTP fetch step 5.5
                switch (request.redirect) {
                  case 'error':
                    reject(new _fetchError.FetchError("uri requested responds with a redirect, redirect mode is set to error: ".concat(request.url), 'no-redirect'));
                    finalize();
                    return;
                  case 'manual':
                    // Nothing to do
                    break;
                  case 'follow':
                    {
                      // HTTP-redirect fetch step 2
                      if (locationURL === null) {
                        break;
                      }

                      // HTTP-redirect fetch step 5
                      if (request.counter >= request.follow) {
                        reject(new _fetchError.FetchError("maximum redirect reached at: ".concat(request.url), 'max-redirect'));
                        finalize();
                        return;
                      }

                      // HTTP-redirect fetch step 6 (counter increment)
                      // Create a new Request object.
                      var requestOptions = {
                        headers: new _headers["default"](request.headers),
                        follow: request.follow,
                        counter: request.counter + 1,
                        agent: request.agent,
                        compress: request.compress,
                        method: request.method,
                        body: (0, _body.clone)(request),
                        signal: request.signal,
                        size: request.size,
                        referrer: request.referrer,
                        referrerPolicy: request.referrerPolicy
                      };

                      // when forwarding sensitive headers like "Authorization",
                      // "WWW-Authenticate", and "Cookie" to untrusted targets,
                      // headers will be ignored when following a redirect to a domain
                      // that is not a subdomain match or exact match of the initial domain.
                      // For example, a redirect from "foo.com" to either "foo.com" or "sub.foo.com"
                      // will forward the sensitive headers, but a redirect to "bar.com" will not.
                      // headers will also be ignored when following a redirect to a domain using
                      // a different protocol. For example, a redirect from "https://foo.com" to "http://foo.com"
                      // will not forward the sensitive headers
                      if (!(0, _is.isDomainOrSubdomain)(request.url, locationURL) || !(0, _is.isSameProtocol)(request.url, locationURL)) {
                        for (var _i = 0, _arr = ['authorization', 'www-authenticate', 'cookie', 'cookie2']; _i < _arr.length; _i++) {
                          var name = _arr[_i];
                          requestOptions.headers["delete"](name);
                        }
                      }

                      // HTTP-redirect fetch step 9
                      if (response_.statusCode !== 303 && request.body && options_.body instanceof _nodeStream["default"].Readable) {
                        reject(new _fetchError.FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
                        finalize();
                        return;
                      }

                      // HTTP-redirect fetch step 11
                      if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === 'POST') {
                        requestOptions.method = 'GET';
                        requestOptions.body = undefined;
                        requestOptions.headers["delete"]('content-length');
                      }

                      // HTTP-redirect fetch step 14
                      var responseReferrerPolicy = (0, _referrer.parseReferrerPolicyFromHeader)(headers);
                      if (responseReferrerPolicy) {
                        requestOptions.referrerPolicy = responseReferrerPolicy;
                      }

                      // HTTP-redirect fetch step 15
                      resolve(fetch(new _request["default"](locationURL, requestOptions)));
                      finalize();
                      return;
                    }
                  default:
                    return reject(new TypeError("Redirect option '".concat(request.redirect, "' is not a valid value of RequestRedirect")));
                }
              }

              // Prepare response
              if (signal) {
                response_.once('end', function () {
                  signal.removeEventListener('abort', abortAndFinalize);
                });
              }
              var body = (0, _nodeStream.pipeline)(response_, new _nodeStream.PassThrough(), function (error) {
                if (error) {
                  reject(error);
                }
              });
              // see https://github.com/nodejs/node/pull/29376
              /* c8 ignore next 3 */
              if (process.version < 'v12.10') {
                response_.on('aborted', abortAndFinalize);
              }
              var responseOptions = {
                url: request.url,
                status: response_.statusCode,
                statusText: response_.statusMessage,
                headers: headers,
                size: request.size,
                counter: request.counter,
                highWaterMark: request.highWaterMark
              };

              // HTTP-network fetch step 12.1.1.3
              var codings = headers.get('Content-Encoding');

              // HTTP-network fetch step 12.1.1.4: handle content codings

              // in following scenarios we ignore compression support
              // 1. compression support is disabled
              // 2. HEAD request
              // 3. no Content-Encoding header
              // 4. no content response (204)
              // 5. content not modified response (304)
              if (!request.compress || request.method === 'HEAD' || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
                response = new _response2["default"](body, responseOptions);
                resolve(response);
                return;
              }

              // For Node v6+
              // Be less strict when decoding compressed responses, since sometimes
              // servers send slightly invalid responses that are still accepted
              // by common browsers.
              // Always using Z_SYNC_FLUSH is what cURL does.
              var zlibOptions = {
                flush: _nodeZlib["default"].Z_SYNC_FLUSH,
                finishFlush: _nodeZlib["default"].Z_SYNC_FLUSH
              };

              // For gzip
              if (codings === 'gzip' || codings === 'x-gzip') {
                body = (0, _nodeStream.pipeline)(body, _nodeZlib["default"].createGunzip(zlibOptions), function (error) {
                  if (error) {
                    reject(error);
                  }
                });
                response = new _response2["default"](body, responseOptions);
                resolve(response);
                return;
              }

              // For deflate
              if (codings === 'deflate' || codings === 'x-deflate') {
                // Handle the infamous raw deflate response from old servers
                // a hack for old IIS and Apache servers
                var raw = (0, _nodeStream.pipeline)(response_, new _nodeStream.PassThrough(), function (error) {
                  if (error) {
                    reject(error);
                  }
                });
                raw.once('data', function (chunk) {
                  // See http://stackoverflow.com/questions/37519828
                  if ((chunk[0] & 0x0F) === 0x08) {
                    body = (0, _nodeStream.pipeline)(body, _nodeZlib["default"].createInflate(), function (error) {
                      if (error) {
                        reject(error);
                      }
                    });
                  } else {
                    body = (0, _nodeStream.pipeline)(body, _nodeZlib["default"].createInflateRaw(), function (error) {
                      if (error) {
                        reject(error);
                      }
                    });
                  }
                  response = new _response2["default"](body, responseOptions);
                  resolve(response);
                });
                raw.once('end', function () {
                  // Some old IIS servers return zero-length OK deflate responses, so
                  // 'data' is never emitted. See https://github.com/node-fetch/node-fetch/pull/903
                  if (!response) {
                    response = new _response2["default"](body, responseOptions);
                    resolve(response);
                  }
                });
                return;
              }

              // For br
              if (codings === 'br') {
                body = (0, _nodeStream.pipeline)(body, _nodeZlib["default"].createBrotliDecompress(), function (error) {
                  if (error) {
                    reject(error);
                  }
                });
                response = new _response2["default"](body, responseOptions);
                resolve(response);
                return;
              }

              // Otherwise, use response as-is
              response = new _response2["default"](body, responseOptions);
              resolve(response);
            });

            // eslint-disable-next-line promise/prefer-await-to-then
            (0, _body.writeToStream)(request_, request)["catch"](reject);
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _fetch.apply(this, arguments);
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  var LAST_CHUNK = _nodeBuffer.Buffer.from('0\r\n\r\n');
  var isChunkedTransfer = false;
  var properLastChunkReceived = false;
  var previousChunk;
  request.on('response', function (response) {
    var headers = response.headers;
    isChunkedTransfer = headers['transfer-encoding'] === 'chunked' && !headers['content-length'];
  });
  request.on('socket', function (socket) {
    var onSocketClose = function onSocketClose() {
      if (isChunkedTransfer && !properLastChunkReceived) {
        var error = new Error('Premature close');
        error.code = 'ERR_STREAM_PREMATURE_CLOSE';
        errorCallback(error);
      }
    };
    var onData = function onData(buf) {
      properLastChunkReceived = _nodeBuffer.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;

      // Sometimes final 0-length chunk and end of message code are in separate packets
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = _nodeBuffer.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && _nodeBuffer.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener('close', onSocketClose);
    socket.on('data', onData);
    request.on('close', function () {
      socket.removeListener('close', onSocketClose);
      socket.removeListener('data', onData);
    });
  });
}