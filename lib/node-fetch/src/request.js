"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodeRequestOptions = exports["default"] = void 0;
var _nodeUrl = require("node:url");
var _nodeUtil = require("node:util");
var _headers = _interopRequireDefault(require("./headers.js"));
var _body = _interopRequireWildcard(require("./body.js"));
var _is = require("./utils/is.js");
var _getSearch = require("./utils/get-search.js");
var _referrer = require("./utils/referrer.js");
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
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
} /**
   * Request.js
   *
   * Request class contains server only options
   *
   * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
   */
var INTERNALS = Symbol('Request internals');

/**
 * Check if `obj` is an instance of Request.
 *
 * @param  {*} object
 * @return {boolean}
 */
var isRequest = function isRequest(object) {
  return _typeof(object) === 'object' && _typeof(object[INTERNALS]) === 'object';
};
var doBadDataWarn = (0, _nodeUtil.deprecate)(function () {}, '.data is not a valid RequestInit property, use .body instead', 'https://github.com/node-fetch/node-fetch/issues/1000 (request)');

/**
 * Request class
 *
 * Ref: https://fetch.spec.whatwg.org/#request-class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
var Request = /*#__PURE__*/function (_Body, _Symbol$toStringTag) {
  _inherits(Request, _Body);
  var _super = _createSuper(Request);
  function Request(input) {
    var _this;
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Request);
    var parsedURL;

    // Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    if (parsedURL.username !== '' || parsedURL.password !== '') {
      throw new TypeError("".concat(parsedURL, " is an url with embedded credentials."));
    }
    var method = init.method || input.method || 'GET';
    if (/^(delete|get|head|options|post|put)$/i.test(method)) {
      method = method.toUpperCase();
    }
    if (!isRequest(init) && 'data' in init) {
      doBadDataWarn();
    }

    // eslint-disable-next-line no-eq-null, eqeqeq
    if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
      throw new TypeError('Request with GET/HEAD method cannot have body');
    }
    var inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? (0, _body.clone)(input) : null;
    _this = _super.call(this, inputBody, {
      size: init.size || input.size || 0
    });
    var headers = new _headers["default"](init.headers || input.headers || {});
    if (inputBody !== null && !headers.has('Content-Type')) {
      var contentType = (0, _body.extractContentType)(inputBody, _assertThisInitialized(_this));
      if (contentType) {
        headers.set('Content-Type', contentType);
      }
    }
    var signal = isRequest(input) ? input.signal : null;
    if ('signal' in init) {
      signal = init.signal;
    }

    // eslint-disable-next-line no-eq-null, eqeqeq
    if (signal != null && !(0, _is.isAbortSignal)(signal)) {
      throw new TypeError('Expected signal to be an instanceof AbortSignal or EventTarget');
    }

    // §5.4, Request constructor steps, step 15.1
    // eslint-disable-next-line no-eq-null, eqeqeq
    var referrer = init.referrer == null ? input.referrer : init.referrer;
    if (referrer === '') {
      // §5.4, Request constructor steps, step 15.2
      referrer = 'no-referrer';
    } else if (referrer) {
      // §5.4, Request constructor steps, step 15.3.1, 15.3.2
      var parsedReferrer = new URL(referrer);
      // §5.4, Request constructor steps, step 15.3.3, 15.3.4
      referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? 'client' : parsedReferrer;
    } else {
      referrer = undefined;
    }
    _this[INTERNALS] = {
      method: method,
      redirect: init.redirect || input.redirect || 'follow',
      headers: headers,
      parsedURL: parsedURL,
      signal: signal,
      referrer: referrer
    };

    // Node-fetch-only options
    _this.follow = init.follow === undefined ? input.follow === undefined ? 20 : input.follow : init.follow;
    _this.compress = init.compress === undefined ? input.compress === undefined ? true : input.compress : init.compress;
    _this.counter = init.counter || input.counter || 0;
    _this.agent = init.agent || input.agent;
    _this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
    _this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;

    // §5.4, Request constructor steps, step 16.
    // Default is empty string per https://fetch.spec.whatwg.org/#concept-request-referrer-policy
    _this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || '';
    return _this;
  }

  /** @returns {string} */
  _createClass(Request, [{
    key: "method",
    get: function get() {
      return this[INTERNALS].method;
    }

    /** @returns {string} */
  }, {
    key: "url",
    get: function get() {
      return (0, _nodeUrl.format)(this[INTERNALS].parsedURL);
    }

    /** @returns {Headers} */
  }, {
    key: "headers",
    get: function get() {
      return this[INTERNALS].headers;
    }
  }, {
    key: "redirect",
    get: function get() {
      return this[INTERNALS].redirect;
    }

    /** @returns {AbortSignal} */
  }, {
    key: "signal",
    get: function get() {
      return this[INTERNALS].signal;
    }

    // https://fetch.spec.whatwg.org/#dom-request-referrer
  }, {
    key: "referrer",
    get: function get() {
      if (this[INTERNALS].referrer === 'no-referrer') {
        return '';
      }
      if (this[INTERNALS].referrer === 'client') {
        return 'about:client';
      }
      if (this[INTERNALS].referrer) {
        return this[INTERNALS].referrer.toString();
      }
      return undefined;
    }
  }, {
    key: "referrerPolicy",
    get: function get() {
      return this[INTERNALS].referrerPolicy;
    },
    set: function set(referrerPolicy) {
      this[INTERNALS].referrerPolicy = (0, _referrer.validateReferrerPolicy)(referrerPolicy);
    }

    /**
     * Clone this request
     *
     * @return  Request
     */
  }, {
    key: "clone",
    value: function clone() {
      return new Request(this);
    }
  }, {
    key: _Symbol$toStringTag,
    get: function get() {
      return 'Request';
    }
  }]);
  return Request;
}(_body["default"], Symbol.toStringTag);
exports["default"] = Request;
Object.defineProperties(Request.prototype, {
  method: {
    enumerable: true
  },
  url: {
    enumerable: true
  },
  headers: {
    enumerable: true
  },
  redirect: {
    enumerable: true
  },
  clone: {
    enumerable: true
  },
  signal: {
    enumerable: true
  },
  referrer: {
    enumerable: true
  },
  referrerPolicy: {
    enumerable: true
  }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param {Request} request - A Request instance
 * @return The options object to be passed to http.request
 */
var getNodeRequestOptions = function getNodeRequestOptions(request) {
  var parsedURL = request[INTERNALS].parsedURL;
  var headers = new _headers["default"](request[INTERNALS].headers);

  // Fetch step 1.3
  if (!headers.has('Accept')) {
    headers.set('Accept', '*/*');
  }

  // HTTP-network-or-cache fetch steps 2.4-2.7
  var contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = '0';
  }
  if (request.body !== null) {
    var totalBytes = (0, _body.getTotalBytes)(request);
    // Set Content-Length if totalBytes is a number (that is not NaN)
    if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set('Content-Length', contentLengthValue);
  }

  // 4.1. Main fetch, step 2.6
  // > If request's referrer policy is the empty string, then set request's referrer policy to the
  // > default referrer policy.
  if (request.referrerPolicy === '') {
    request.referrerPolicy = _referrer.DEFAULT_REFERRER_POLICY;
  }

  // 4.1. Main fetch, step 2.7
  // > If request's referrer is not "no-referrer", set request's referrer to the result of invoking
  // > determine request's referrer.
  if (request.referrer && request.referrer !== 'no-referrer') {
    request[INTERNALS].referrer = (0, _referrer.determineRequestsReferrer)(request);
  } else {
    request[INTERNALS].referrer = 'no-referrer';
  }

  // 4.5. HTTP-network-or-cache fetch, step 6.9
  // > If httpRequest's referrer is a URL, then append `Referer`/httpRequest's referrer, serialized
  // >  and isomorphic encoded, to httpRequest's header list.
  if (request[INTERNALS].referrer instanceof URL) {
    headers.set('Referer', request.referrer);
  }

  // HTTP-network-or-cache fetch step 2.11
  if (!headers.has('User-Agent')) {
    headers.set('User-Agent', 'node-fetch');
  }

  // HTTP-network-or-cache fetch step 2.15
  if (request.compress && !headers.has('Accept-Encoding')) {
    headers.set('Accept-Encoding', 'gzip, deflate, br');
  }
  var agent = request.agent;
  if (typeof agent === 'function') {
    agent = agent(parsedURL);
  }
  if (!headers.has('Connection') && !agent) {
    headers.set('Connection', 'close');
  }

  // HTTP-network fetch step 4.2
  // chunked encoding is handled by Node.js

  var search = (0, _getSearch.getSearch)(parsedURL);

  // Pass the full URL directly to request(), but overwrite the following
  // options:
  var options = {
    // Overwrite search to retain trailing ? (issue #776)
    path: parsedURL.pathname + search,
    // The following options are not expressed in the URL
    method: request.method,
    headers: headers[Symbol["for"]('nodejs.util.inspect.custom')](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent: agent
  };
  return {
    /** @type {URL} */
    parsedURL: parsedURL,
    options: options
  };
};
exports.getNodeRequestOptions = getNodeRequestOptions;