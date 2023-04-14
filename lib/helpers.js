'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getDuration =
  exports.buildResponseCookies =
  exports.buildParams =
  exports.buildQueryParams =
  exports.buildHeaders =
  exports.buildRequestCookies =
  exports.addHeaders =
    void 0;
const cookie_1 = __importDefault(require('cookie'));
const set_cookie_parser_1 = __importDefault(require('set-cookie-parser'));
let query_string_1;
import('query-string').then((mod) => {
  query_string_1 = mod;
});
let node_fetch_1;
import('node-fetch').then((mod) => {
  node_fetch_1 = mod;
});
const addHeaders = (oldHeaders, requestIdHeader) => {
  if (!oldHeaders) {
    return new node_fetch_1.Headers(requestIdHeader);
  } else if (
    oldHeaders instanceof Map ||
    oldHeaders instanceof node_fetch_1.Headers
  ) {
    const headers = new node_fetch_1.Headers(oldHeaders);
    for (const name in requestIdHeader) {
      headers.set(name, requestIdHeader[name]);
    }
    return headers;
  } else {
    const headers = new node_fetch_1.Headers({
      ...oldHeaders,
      ...requestIdHeader,
    });
    return headers;
  }
};
exports.addHeaders = addHeaders;
// Record<string, string[]>
const buildRequestCookies = (headers) => {
  const cookies = [];
  for (const header in headers) {
    if (header.toLowerCase() === 'cookie') {
      const parsed = cookie_1.default.parse(headers[header]);
      for (const name in parsed) {
        const value = parsed[name];
        cookies.push({ name, value });
      }
    }
  }
  return cookies;
};
exports.buildRequestCookies = buildRequestCookies;
const buildHeaders = (headers) => {
  const list = [];
  if (Array.isArray(headers)) {
    for (let i = 0; i < headers.length; i += 2) {
      list.push({
        name: headers[i],
        value: headers[i + 1],
      });
    }
  } else {
    for (const [key, values] of Object.entries(headers)) {
      if (Array.isArray(values)) {
        for (const value of values) {
          list.push({ name: key, value });
        }
      } else if (typeof values === 'string') {
        list.push({ name: key, value: values });
      }
    }
  }
  return list;
};
exports.buildHeaders = buildHeaders;
const buildQueryParams = (queryParams) => {
  return [...queryParams].map(([name, value]) => ({ name, value }));
};
exports.buildQueryParams = buildQueryParams;
const buildParams = (paramString) => {
  const params = [];
  const parsed = query_string_1.default.parse(paramString);
  for (const [key, value] of Object.entries(parsed)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        params.push({ name: key, value: item });
      }
    } else {
      params.push({ name: key, value: value });
    }
  }
  return params;
};
exports.buildParams = buildParams;
const buildResponseCookies = (headers) => {
  const cookies = [];
  const setCookies = headers['set-cookie'];
  if (setCookies) {
    setCookies.forEach((headerValue) => {
      let parsed;
      try {
        parsed = set_cookie_parser_1.default.parse(headerValue);
      } catch (err) {
        return;
      }
      parsed.forEach((cookie) => {
        const { name, value, path, domain, expires, httpOnly, secure } = cookie;
        if (!name || !value) return;
        const harCookie = {
          name,
          value,
          httpOnly: httpOnly || false,
          secure: secure || false,
        };
        if (path) {
          harCookie.path = path;
        }
        if (domain) {
          harCookie.domain = domain;
        }
        if (expires) {
          const dt = new Date(expires);
          harCookie.expires = dt.toISOString();
        }
        cookies.push(harCookie);
      });
    });
  }
  return cookies;
};
exports.buildResponseCookies = buildResponseCookies;
const getDuration = (a, b) => {
  const seconds = b[0] - a[0];
  const nanoseconds = b[1] - a[1];
  return seconds * 1000 + nanoseconds / 1e6;
};
exports.getDuration = getDuration;
