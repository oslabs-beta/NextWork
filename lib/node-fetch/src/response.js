"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _headers = _interopRequireDefault(require("./headers.js"));
var _body = _interopRequireWildcard(require("./body.js"));
var _isRedirect = require("./utils/is-redirect.js");
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
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
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
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
} /**
   * Response.js
   *
   * Response class provides content decoding
   */
var INTERNALS = Symbol('Response internals');

/**
 * Response class
 *
 * Ref: https://fetch.spec.whatwg.org/#response-class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
var Response = /*#__PURE__*/function (_Body, _Symbol$toStringTag) {
  _inherits(Response, _Body);
  var _super = _createSuper(Response);
  function Response() {
    var _this;
    var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Response);
    _this = _super.call(this, body, options);

    // eslint-disable-next-line no-eq-null, eqeqeq, no-negated-condition
    var status = options.status != null ? options.status : 200;
    var headers = new _headers["default"](options.headers);
    if (body !== null && !headers.has('Content-Type')) {
      var contentType = (0, _body.extractContentType)(body, _assertThisInitialized(_this));
      if (contentType) {
        headers.append('Content-Type', contentType);
      }
    }
    _this[INTERNALS] = {
      type: 'default',
      url: options.url,
      status: status,
      statusText: options.statusText || '',
      headers: headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
    return _this;
  }
  _createClass(Response, [{
    key: "type",
    get: function get() {
      return this[INTERNALS].type;
    }
  }, {
    key: "url",
    get: function get() {
      return this[INTERNALS].url || '';
    }
  }, {
    key: "status",
    get: function get() {
      return this[INTERNALS].status;
    }

    /**
     * Convenience property representing if the request ended normally
     */
  }, {
    key: "ok",
    get: function get() {
      return this[INTERNALS].status >= 200 && this[INTERNALS].status < 300;
    }
  }, {
    key: "redirected",
    get: function get() {
      return this[INTERNALS].counter > 0;
    }
  }, {
    key: "statusText",
    get: function get() {
      return this[INTERNALS].statusText;
    }
  }, {
    key: "headers",
    get: function get() {
      return this[INTERNALS].headers;
    }
  }, {
    key: "highWaterMark",
    get: function get() {
      return this[INTERNALS].highWaterMark;
    }

    /**
     * Clone this response
     *
     * @return  Response
     */
  }, {
    key: "clone",
    value: function clone() {
      return new Response((0, _body.clone)(this, this.highWaterMark), {
        type: this.type,
        url: this.url,
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        ok: this.ok,
        redirected: this.redirected,
        size: this.size,
        highWaterMark: this.highWaterMark
      });
    }

    /**
     * @param {string} url    The URL that the new response is to originate from.
     * @param {number} status An optional status code for the response (e.g., 302.)
     * @returns {Response}    A Response object.
     */
  }, {
    key: _Symbol$toStringTag,
    get: function get() {
      return 'Response';
    }
  }], [{
    key: "redirect",
    value: function redirect(url) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 302;
      if (!(0, _isRedirect.isRedirect)(status)) {
        throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
      }
      return new Response(null, {
        headers: {
          location: new URL(url).toString()
        },
        status: status
      });
    }
  }, {
    key: "error",
    value: function error() {
      var response = new Response(null, {
        status: 0,
        statusText: ''
      });
      response[INTERNALS].type = 'error';
      return response;
    }
  }, {
    key: "json",
    value: function json() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var body = JSON.stringify(data);
      if (body === undefined) {
        throw new TypeError('data is not JSON serializable');
      }
      var headers = new _headers["default"](init && init.headers);
      if (!headers.has('content-type')) {
        headers.set('content-type', 'application/json');
      }
      return new Response(body, _objectSpread(_objectSpread({}, init), {}, {
        headers: headers
      }));
    }
  }]);
  return Response;
}(_body["default"], Symbol.toStringTag);
exports["default"] = Response;
Object.defineProperties(Response.prototype, {
  type: {
    enumerable: true
  },
  url: {
    enumerable: true
  },
  status: {
    enumerable: true
  },
  ok: {
    enumerable: true
  },
  redirected: {
    enumerable: true
  },
  statusText: {
    enumerable: true
  },
  headers: {
    enumerable: true
  },
  clone: {
    enumerable: true
  }
});