"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookie = require('cookie');
const setCookie = require('set-cookie-parser');
// const querystring = require('query-string');
const querystring = require('querystring');
const { Headers } = require('node-fetch');
const addHeaders = (oldHeaders, requestIdHeader) => {
    if (!oldHeaders) {
        return new Headers(requestIdHeader);
    }
    else if (oldHeaders instanceof Map || oldHeaders instanceof Headers) {
        const headers = new Headers(oldHeaders);
        for (const name in requestIdHeader) {
            headers.set(name, requestIdHeader[name]);
        }
        return headers;
    }
    else {
        const headers = new Headers({ ...oldHeaders, ...requestIdHeader });
        return headers;
    }
};
const buildRequestCookies = (headers) => {
    const cookies = [];
    for (const header in headers) {
        if (header.toLowerCase() === 'cookie') {
            for (const cookieString of headers[header]) {
                const parsed = cookie.parse(cookieString);
                for (const name in parsed) {
                    const value = parsed[name];
                    cookies.push({ name, value });
                }
            }
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
    }
    else {
        for (const [key, values] of Object.entries(headers)) {
            if (Array.isArray(values)) {
                for (const value of values) {
                    list.push({ name: key, value });
                }
            }
            else if (typeof values === 'string') {
                list.push({ name: key, value: values });
            }
        }
    }
    return list;
};
const buildQueryParams = (queryParams) => {
    return [...queryParams].map(([name, value]) => ({ name, value }));
};
const buildParams = (paramString) => {
    const params = [];
    const parsed = querystring.parse(paramString);
    for (const [key, value] of Object.entries(parsed)) {
        if (Array.isArray(value)) {
            for (const item of value) {
                params.push({ name: key, value: item });
            }
        }
        else {
            params.push({ name: key, value: value });
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
            }
            catch (err) {
                return;
            }
            parsed.forEach((cookie) => {
                const { name, value, path, domain, expires, httpOnly, secure } = cookie;
                if (!name || !value)
                    return;
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
const getDuration = (a, b) => {
    const seconds = b[0] - a[0];
    const nanoseconds = b[1] - a[1];
    return seconds * 1000 + nanoseconds / 1e6;
};
module.exports = {
    addHeaders,
    buildRequestCookies,
    buildHeaders,
    buildQueryParams,
    buildParams,
    buildResponseCookies,
    getDuration,
};
