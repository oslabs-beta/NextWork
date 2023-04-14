"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFormData = toFormData;
var _from = require("fetch-blob/from.js");
var _esmMin = require("formdata-polyfill/esm.min.js");
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
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _asyncIterator(iterable) {
  var method,
    async,
    sync,
    retry = 2;
  for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) {
    if (async && null != (method = iterable[async])) return method.call(iterable);
    if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable));
    async = "@@asyncIterator", sync = "@@iterator";
  }
  throw new TypeError("Object is not async iterable");
}
function AsyncFromSyncIterator(s) {
  function AsyncFromSyncIteratorContinuation(r) {
    if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
    var done = r.done;
    return Promise.resolve(r.value).then(function (value) {
      return {
        value: value,
        done: done
      };
    });
  }
  return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) {
    this.s = s, this.n = s.next;
  }, AsyncFromSyncIterator.prototype = {
    s: null,
    n: null,
    next: function next() {
      return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
    },
    "return": function _return(value) {
      var ret = this.s["return"];
      return void 0 === ret ? Promise.resolve({
        value: value,
        done: !0
      }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
    },
    "throw": function _throw(value) {
      var thr = this.s["return"];
      return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
    }
  }, new AsyncFromSyncIterator(s);
}
var s = 0;
var S = {
  START_BOUNDARY: s++,
  HEADER_FIELD_START: s++,
  HEADER_FIELD: s++,
  HEADER_VALUE_START: s++,
  HEADER_VALUE: s++,
  HEADER_VALUE_ALMOST_DONE: s++,
  HEADERS_ALMOST_DONE: s++,
  PART_DATA_START: s++,
  PART_DATA: s++,
  END: s++
};
var f = 1;
var F = {
  PART_BOUNDARY: f,
  LAST_BOUNDARY: f *= 2
};
var LF = 10;
var CR = 13;
var SPACE = 32;
var HYPHEN = 45;
var COLON = 58;
var A = 97;
var Z = 122;
var lower = function lower(c) {
  return c | 0x20;
};
var noop = function noop() {};
var MultipartParser = /*#__PURE__*/function () {
  /**
   * @param {string} boundary
   */
  function MultipartParser(boundary) {
    _classCallCheck(this, MultipartParser);
    this.index = 0;
    this.flags = 0;
    this.onHeaderEnd = noop;
    this.onHeaderField = noop;
    this.onHeadersEnd = noop;
    this.onHeaderValue = noop;
    this.onPartBegin = noop;
    this.onPartData = noop;
    this.onPartEnd = noop;
    this.boundaryChars = {};
    boundary = '\r\n--' + boundary;
    var ui8a = new Uint8Array(boundary.length);
    for (var i = 0; i < boundary.length; i++) {
      ui8a[i] = boundary.charCodeAt(i);
      this.boundaryChars[ui8a[i]] = true;
    }
    this.boundary = ui8a;
    this.lookbehind = new Uint8Array(this.boundary.length + 8);
    this.state = S.START_BOUNDARY;
  }

  /**
   * @param {Uint8Array} data
   */
  _createClass(MultipartParser, [{
    key: "write",
    value: function write(data) {
      var _this = this;
      var i = 0;
      var length_ = data.length;
      var previousIndex = this.index;
      var lookbehind = this.lookbehind,
        boundary = this.boundary,
        boundaryChars = this.boundaryChars,
        index = this.index,
        state = this.state,
        flags = this.flags;
      var boundaryLength = this.boundary.length;
      var boundaryEnd = boundaryLength - 1;
      var bufferLength = data.length;
      var c;
      var cl;
      var mark = function mark(name) {
        _this[name + 'Mark'] = i;
      };
      var clear = function clear(name) {
        delete _this[name + 'Mark'];
      };
      var callback = function callback(callbackSymbol, start, end, ui8a) {
        if (start === undefined || start !== end) {
          _this[callbackSymbol](ui8a && ui8a.subarray(start, end));
        }
      };
      var dataCallback = function dataCallback(name, clear) {
        var markSymbol = name + 'Mark';
        if (!(markSymbol in _this)) {
          return;
        }
        if (clear) {
          callback(name, _this[markSymbol], i, data);
          delete _this[markSymbol];
        } else {
          callback(name, _this[markSymbol], data.length, data);
          _this[markSymbol] = 0;
        }
      };
      for (i = 0; i < length_; i++) {
        c = data[i];
        switch (state) {
          case S.START_BOUNDARY:
            if (index === boundary.length - 2) {
              if (c === HYPHEN) {
                flags |= F.LAST_BOUNDARY;
              } else if (c !== CR) {
                return;
              }
              index++;
              break;
            } else if (index - 1 === boundary.length - 2) {
              if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                state = S.END;
                flags = 0;
              } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                index = 0;
                callback('onPartBegin');
                state = S.HEADER_FIELD_START;
              } else {
                return;
              }
              break;
            }
            if (c !== boundary[index + 2]) {
              index = -2;
            }
            if (c === boundary[index + 2]) {
              index++;
            }
            break;
          case S.HEADER_FIELD_START:
            state = S.HEADER_FIELD;
            mark('onHeaderField');
            index = 0;
          // falls through
          case S.HEADER_FIELD:
            if (c === CR) {
              clear('onHeaderField');
              state = S.HEADERS_ALMOST_DONE;
              break;
            }
            index++;
            if (c === HYPHEN) {
              break;
            }
            if (c === COLON) {
              if (index === 1) {
                // empty header field
                return;
              }
              dataCallback('onHeaderField', true);
              state = S.HEADER_VALUE_START;
              break;
            }
            cl = lower(c);
            if (cl < A || cl > Z) {
              return;
            }
            break;
          case S.HEADER_VALUE_START:
            if (c === SPACE) {
              break;
            }
            mark('onHeaderValue');
            state = S.HEADER_VALUE;
          // falls through
          case S.HEADER_VALUE:
            if (c === CR) {
              dataCallback('onHeaderValue', true);
              callback('onHeaderEnd');
              state = S.HEADER_VALUE_ALMOST_DONE;
            }
            break;
          case S.HEADER_VALUE_ALMOST_DONE:
            if (c !== LF) {
              return;
            }
            state = S.HEADER_FIELD_START;
            break;
          case S.HEADERS_ALMOST_DONE:
            if (c !== LF) {
              return;
            }
            callback('onHeadersEnd');
            state = S.PART_DATA_START;
            break;
          case S.PART_DATA_START:
            state = S.PART_DATA;
            mark('onPartData');
          // falls through
          case S.PART_DATA:
            previousIndex = index;
            if (index === 0) {
              // boyer-moore derrived algorithm to safely skip non-boundary data
              i += boundaryEnd;
              while (i < bufferLength && !(data[i] in boundaryChars)) {
                i += boundaryLength;
              }
              i -= boundaryEnd;
              c = data[i];
            }
            if (index < boundary.length) {
              if (boundary[index] === c) {
                if (index === 0) {
                  dataCallback('onPartData', true);
                }
                index++;
              } else {
                index = 0;
              }
            } else if (index === boundary.length) {
              index++;
              if (c === CR) {
                // CR = part boundary
                flags |= F.PART_BOUNDARY;
              } else if (c === HYPHEN) {
                // HYPHEN = end boundary
                flags |= F.LAST_BOUNDARY;
              } else {
                index = 0;
              }
            } else if (index - 1 === boundary.length) {
              if (flags & F.PART_BOUNDARY) {
                index = 0;
                if (c === LF) {
                  // unset the PART_BOUNDARY flag
                  flags &= ~F.PART_BOUNDARY;
                  callback('onPartEnd');
                  callback('onPartBegin');
                  state = S.HEADER_FIELD_START;
                  break;
                }
              } else if (flags & F.LAST_BOUNDARY) {
                if (c === HYPHEN) {
                  callback('onPartEnd');
                  state = S.END;
                  flags = 0;
                } else {
                  index = 0;
                }
              } else {
                index = 0;
              }
            }
            if (index > 0) {
              // when matching a possible boundary, keep a lookbehind reference
              // in case it turns out to be a false lead
              lookbehind[index - 1] = c;
            } else if (previousIndex > 0) {
              // if our boundary turned out to be rubbish, the captured lookbehind
              // belongs to partData
              var _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
              callback('onPartData', 0, previousIndex, _lookbehind);
              previousIndex = 0;
              mark('onPartData');

              // reconsider the current character even so it interrupted the sequence
              // it could be the beginning of a new sequence
              i--;
            }
            break;
          case S.END:
            break;
          default:
            throw new Error("Unexpected state entered: ".concat(state));
        }
      }
      dataCallback('onHeaderField');
      dataCallback('onHeaderValue');
      dataCallback('onPartData');

      // Update properties for the next call
      this.index = index;
      this.state = state;
      this.flags = flags;
    }
  }, {
    key: "end",
    value: function end() {
      if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
        this.onPartEnd();
      } else if (this.state !== S.END) {
        throw new Error('MultipartParser.end(): stream ended unexpectedly');
      }
    }
  }]);
  return MultipartParser;
}();
function _fileName(headerValue) {
  // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
  var m = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m) {
    return;
  }
  var match = m[2] || m[3] || '';
  var filename = match.slice(match.lastIndexOf('\\') + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, function (m, code) {
    return String.fromCharCode(code);
  });
  return filename;
}
function toFormData(_x, _x2) {
  return _toFormData.apply(this, arguments);
}
function _toFormData() {
  _toFormData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(Body, ct) {
    var m, parser, headerField, headerValue, entryValue, entryName, contentType, filename, entryChunks, formData, onPartData, appendToFile, appendFileToFormData, appendEntryToFormData, decoder, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (/multipart/i.test(ct)) {
            _context.next = 2;
            break;
          }
          throw new TypeError('Failed to fetch');
        case 2:
          m = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
          if (m) {
            _context.next = 5;
            break;
          }
          throw new TypeError('no or bad content-type header, no multipart boundary');
        case 5:
          parser = new MultipartParser(m[1] || m[2]);
          entryChunks = [];
          formData = new _esmMin.FormData();
          onPartData = function onPartData(ui8a) {
            entryValue += decoder.decode(ui8a, {
              stream: true
            });
          };
          appendToFile = function appendToFile(ui8a) {
            entryChunks.push(ui8a);
          };
          appendFileToFormData = function appendFileToFormData() {
            var file = new _from.File(entryChunks, filename, {
              type: contentType
            });
            formData.append(entryName, file);
          };
          appendEntryToFormData = function appendEntryToFormData() {
            formData.append(entryName, entryValue);
          };
          decoder = new TextDecoder('utf-8');
          decoder.decode();
          parser.onPartBegin = function () {
            parser.onPartData = onPartData;
            parser.onPartEnd = appendEntryToFormData;
            headerField = '';
            headerValue = '';
            entryValue = '';
            entryName = '';
            contentType = '';
            filename = null;
            entryChunks.length = 0;
          };
          parser.onHeaderField = function (ui8a) {
            headerField += decoder.decode(ui8a, {
              stream: true
            });
          };
          parser.onHeaderValue = function (ui8a) {
            headerValue += decoder.decode(ui8a, {
              stream: true
            });
          };
          parser.onHeaderEnd = function () {
            headerValue += decoder.decode();
            headerField = headerField.toLowerCase();
            if (headerField === 'content-disposition') {
              // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
              var _m = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
              if (_m) {
                entryName = _m[2] || _m[3] || '';
              }
              filename = _fileName(headerValue);
              if (filename) {
                parser.onPartData = appendToFile;
                parser.onPartEnd = appendFileToFormData;
              }
            } else if (headerField === 'content-type') {
              contentType = headerValue;
            }
            headerValue = '';
            headerField = '';
          };
          _iteratorAbruptCompletion = false;
          _didIteratorError = false;
          _context.prev = 20;
          _iterator = _asyncIterator(Body);
        case 22:
          _context.next = 24;
          return _iterator.next();
        case 24:
          if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
            _context.next = 30;
            break;
          }
          chunk = _step.value;
          parser.write(chunk);
        case 27:
          _iteratorAbruptCompletion = false;
          _context.next = 22;
          break;
        case 30:
          _context.next = 36;
          break;
        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](20);
          _didIteratorError = true;
          _iteratorError = _context.t0;
        case 36:
          _context.prev = 36;
          _context.prev = 37;
          if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
            _context.next = 41;
            break;
          }
          _context.next = 41;
          return _iterator["return"]();
        case 41:
          _context.prev = 41;
          if (!_didIteratorError) {
            _context.next = 44;
            break;
          }
          throw _iteratorError;
        case 44:
          return _context.finish(41);
        case 45:
          return _context.finish(36);
        case 46:
          parser.end();
          return _context.abrupt("return", formData);
        case 48:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[20, 32, 36, 46], [37,, 41, 45]]);
  }));
  return _toFormData.apply(this, arguments);
}