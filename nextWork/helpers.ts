// import cookie from "cookie";
// import setCookie from "set-cookie-parser";
const cookie = require('cookie');
const setCookie = require('set-cookie-parser');

import { QueryParam } from './interfaces';

//Headers API: https://developer.mozilla.org/en-US/docs/Web/API/Headers
// const addHeaders = (oldHeaders, requestIdHeader) => {
//   if (!oldHeaders) {
//     return requestIdHeader;
//   } else if (
//     //if original headers were instantiated using map or Headers
//     typeof oldHeaders.set === "function" &&
//     typeof oldHeaders.constructor === "functions"
//   ) {
//     const Headers = oldHeaders.constructor;
//     const headers = new Headers(oldHeaders); //instantiate a new instance of Headers class
//     for (const name in requestIdHeader) {
//       headers.set(name, requestIdHeader[name]);
//     }
//     return headers;
//   }
//   return Object.assign({}, oldHeaders, requestIdHeader);
// };

const addHeaders = (
  oldHeaders: Headers | { [key: string]: string } | undefined,
  requestIdHeader: { [key: string]: string } //Record<string, string>
): Headers => {
  if (!oldHeaders) {
    return new Headers(requestIdHeader);
  } else if (oldHeaders instanceof Map || oldHeaders instanceof Headers) {
    const headers = new Headers(oldHeaders);
    for (const name in requestIdHeader) {
      headers.set(name, requestIdHeader[name]);
    }
    return headers;
  } else {
    return new Headers({ ...oldHeaders, ...requestIdHeader });
  }
};

const buildRequestCookies = (headers) => {
  const cookies: { name: string; value: string }[] = [];

  for (const header in headers) {
    if (header.toLowerCase() === 'cookie') {
      headers[header].forEach((cookievalue) => {
        const parsedCookie = cookie.parse(cookievalue);
        for (const name in parsedCookie) {
          const value = parsedCookie[name];
          cookies.push({ name, value });
        }
      });
    }
  }
  return cookies;
};

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
          list.push({ key, value });
        }
      } else {
        list.push({ key, values });
      }
    }
  }
  return list;
};

const buildQueryParams = (queryParams) => {
  return [...queryParams].map(([name, value]) => ({
    name,
    value,
  }));
};

const buildQueryParams = (queryParams: Map<string, string>): QueryParam[] => {
  return [...queryParams].map(([name, value]) => ({ name, value }));
};

const buildParams = (paramString) => {
  const params = [];
  const parsed = querystring.parse(paramString);
  for (const [key, value] of Object.entries(parsed)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        params.push({ key, value: item });
      }
    } else {
      params.push({ key, value });
    }
  }
  return params;
};

const buildResponseCookies = (headers) => {
  const cookies = [];
  const setCookies = headers['set-cookie'];
  if (setCookies) {
    setCookies.forEach((headerValue) => {
      let parsed;
      try {
        parsed = setCookie.parse(headerValue);
      } catch (err) {
        return;
      }
      parsed.forEach((cookie) => {
        const { name, value, path, domain, expires, httpOnly, secure } = cookie;
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
          harCookie.expires = expires.toISOString();
        }
        cookies.push(harCookie);
      });
    });
  }
  return cookies;
};

// const getDuration = (a, b) => {
//   const seconds = b[0] - a[0];
//   const nanoseconds = b[1] - a[1];
//   return seconds * 1000 + nanoseconds / 1e6;
// };

const getDuration = (a: [number, number], b: [number, number]): number => {
  const seconds = b[0] - a[0];
  const nanoseconds = b[1] - a[1];
  return seconds * 1000 + nanoseconds / 1e6;
};

export {};
module.exports = {
  addHeaders,
  // buildRequestCookies,
  // buildHeaders,
  buildQueryParams,
  // buildParams,
  // buildResponseCookies,
  getDuration,
};
