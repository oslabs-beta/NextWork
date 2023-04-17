/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/nextWork.ts":
/*!*************************!*\
  !*** ./src/nextWork.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.nextWorkFetch = exports.getInputUrl = exports.createAgentClass = void 0;\nconst node_http_1 = __importDefault(__webpack_require__(/*! node:http */ \"node:http\"));\nconst node_http_2 = __webpack_require__(/*! node:http */ \"node:http\");\n// import { Response } from 'node-fetch';\nconst node_https_1 = __webpack_require__(/*! node:https */ \"node:https\");\nconst node_fetch_1 = __importDefault(__webpack_require__(/*! node-fetch */ \"node-fetch\"));\n// @ts-ignore\nconst baseFetch = node_fetch_1.default;\nconst nanoid_1 = __webpack_require__(/*! nanoid */ \"nanoid\");\nconst generateId = nanoid_1.nanoid;\nconst fs = __importStar(__webpack_require__(/*! node:fs */ \"node:fs\"));\nconst path = __importStar(__webpack_require__(/*! node:path */ \"node:path\"));\nconst node_url_1 = __webpack_require__(/*! node:url */ \"node:url\");\nconst helpers_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './helpers'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst headerName = 'x-har-request-id';\nconst harEntryMap = new Map();\nconst handleRequest = (request, options) => {\n    if (!options || typeof options !== 'object') {\n        return;\n    }\n    const headers = options.headers || {};\n    const requestId = headers[headerName] ? headers[headerName] : null;\n    if (!requestId) {\n        return;\n    }\n    // Redirects! Fetch follows them (in `follow`) mode and uses the same request\n    // headers. So we'll see multiple requests with the same ID. We should remove\n    // any previous entry from `harEntryMap` and attach it as a \"parent\" to this\n    // one.\n    const parentEntry = harEntryMap.get(requestId);\n    if (parentEntry) {\n        harEntryMap.delete(requestId);\n    }\n    const url = new node_url_1.URL(options.url || options.href); // Depends on Node version?\n    const entry = {\n        _parent: parentEntry,\n        _timestamps: {\n            // needs to be changed to bigint - issues with json parse\n            //process.hrtime() returns [seconds, nanoseconds]\n            start: process.hrtime(),\n        },\n        _resourceType: 'fetch',\n        startedDateTime: new Date(Date.now()).toISOString(),\n        cache: {\n            beforeRequest: null,\n            afterRequest: null,\n        },\n        timings: {\n            blocked: -1,\n            dns: -1,\n            connect: -1,\n            send: 0,\n            wait: 0,\n            receive: 0,\n            ssl: -1,\n        },\n        request: {\n            method: request.method,\n            url: url.href,\n            cookies: (0, helpers_1.buildRequestCookies)(headers),\n            headers: (0, helpers_1.buildHeaders)(headers),\n            queryString: (0, helpers_1.buildQueryParams)(url.searchParams),\n            headersSize: -1,\n            bodySize: -1,\n        },\n    };\n    const _write = request.write;\n    const _end = request.end;\n    let requestBody;\n    const concatBody = (chunk) => {\n        if (typeof chunk === 'string') {\n            if (!requestBody) {\n                requestBody = chunk;\n            }\n            else {\n                requestBody += chunk;\n            }\n        }\n        else if (Buffer.isBuffer(chunk)) {\n            if (!requestBody) {\n                requestBody = chunk;\n            }\n            else {\n                let copiedBody = Buffer.from(requestBody);\n                requestBody = Buffer.concat([copiedBody, chunk]);\n            }\n        }\n    };\n    request.write = function (chunk, encoding, callback) {\n        concatBody(chunk);\n        return _write.call(this, chunk, encoding, callback);\n    };\n    request.end = function (chunk, encoding, callback) {\n        concatBody(chunk);\n        if (requestBody) {\n            entry.request.bodySize = Buffer.byteLength(requestBody);\n            let mimeType;\n            for (const name in headers) {\n                if (name.toLowerCase() === 'content-type') {\n                    mimeType = headers[name][0];\n                    break;\n                }\n            }\n            if (mimeType) {\n                const bodyString = requestBody.toString(); // FIXME: Assumes encoding?\n                if (mimeType === 'application/x-www-form-urlencoded') {\n                    entry.request.postData = {\n                        mimeType,\n                        params: (0, helpers_1.buildParams)(bodyString),\n                    };\n                }\n                else {\n                    entry.request.postData = { mimeType, text: bodyString };\n                }\n            }\n        }\n        return _end.call(this, chunk, encoding, callback);\n    };\n    let removeSocketListeners;\n    request.on('socket', (socket) => {\n        entry._timestamps.socket = process.hrtime();\n        const onLookup = () => {\n            entry._timestamps.lookup = process.hrtime();\n        };\n        const onConnect = () => {\n            entry._timestamps.connect = process.hrtime();\n        };\n        const onSecureConnect = () => {\n            entry._timestamps.secureConnect = process.hrtime();\n        };\n        socket.once('lookup', onLookup);\n        socket.once('connect', onConnect);\n        socket.once('secureConnect', onSecureConnect);\n        removeSocketListeners = () => {\n            socket.removeListener('lookup', onLookup);\n            socket.removeListener('connect', onConnect);\n            socket.removeListener('secureConnect', onSecureConnect);\n        };\n    });\n    request.on('finish', () => {\n        entry._timestamps.sent = process.hrtime();\n        removeSocketListeners();\n    });\n    request.on('response', (response) => {\n        entry._timestamps.firstByte = process.hrtime();\n        harEntryMap.set(requestId, entry);\n        // Now we know whether `lookup` or `connect` happened. It's possible they\n        // were skipped if the hostname was already resolved (or we were given an\n        // IP directly), or if a connection was already open (e.g. due to\n        // `keep-alive`).\n        if (!entry._timestamps.lookup) {\n            entry._timestamps.lookup = entry._timestamps.socket;\n        }\n        if (!entry._timestamps.connect) {\n            entry._timestamps.connect = entry._timestamps.lookup;\n        }\n        // Populate request info that isn't available until now.\n        const httpVersion = `HTTP/${response.httpVersion}`;\n        entry.request.httpVersion = httpVersion;\n        entry.response = {\n            status: response.statusCode,\n            statusText: response.statusMessage,\n            httpVersion,\n            cookies: (0, helpers_1.buildResponseCookies)(response.headers),\n            headers: (0, helpers_1.buildHeaders)(response.rawHeaders),\n            content: {\n                size: -1,\n                mimeType: response.headers['content-type'],\n            },\n            redirectURL: response.headers.location || '',\n            headersSize: -1,\n            bodySize: -1,\n        };\n        let compressed;\n        // Detect supported compression encodings.\n        if (response.headers['content-encoding']) {\n            compressed = /^(gzip|compress|deflate|br)$/.test(response.headers['content-encoding']);\n        }\n        if (compressed) {\n            entry._compressed = true;\n            response.on('data', (chunk) => {\n                if (entry.response) {\n                    if (entry.response.bodySize === -1) {\n                        entry.response.bodySize = 0;\n                    }\n                    entry.response.bodySize += Buffer.byteLength(chunk);\n                }\n            });\n        }\n    });\n};\nconst createAgentClass = (BaseAgent) => {\n    //http(s).Agent\n    class HarAgent extends BaseAgent {\n        // what args are going into constructor?\n        constructor(...args) {\n            super(...args);\n            this.addRequest.customHarAgentEnabled = true;\n        }\n        addRequest(request, ...args) {\n            // @ts-ignore\n            handleRequest(request, ...args);\n            super.addRequest(request, ...args);\n        }\n    }\n    return HarAgent;\n};\nexports.createAgentClass = createAgentClass;\nlet globalHarHttpAgent;\nlet globalHarHttpsAgent;\nconst HarHttpAgent = (0, exports.createAgentClass)(node_http_2.Agent);\nconst HarHttpsAgent = (0, exports.createAgentClass)(node_https_1.Agent);\nconst instrumentAgentInstance = (agent) => {\n    const { addRequest: originalAddRequest } = agent;\n    if (originalAddRequest) {\n        if (!originalAddRequest.customHarAgentEnabled) {\n            agent.addRequest = function addRequest(request, options, port, localAddress) {\n                handleRequest(request, options);\n                return originalAddRequest.call(this, request, options, port, localAddress); //here 'this' refers to agent object\n            };\n            agent.addRequest.customHarAgentEnabled = true;\n        }\n    }\n};\nfunction getInputUrl(resource) {\n    let url;\n    if (typeof resource === 'string') {\n        url = resource;\n    }\n    else {\n        url = resource.href;\n    }\n    return new node_url_1.URL(url);\n}\nexports.getInputUrl = getInputUrl;\n// handle cases where agent does not exist in fetch options\nconst getGlobalAgent = (resource) => {\n    const url = getInputUrl(resource);\n    if (url.protocol === 'http:') {\n        if (!globalHarHttpAgent) {\n            globalHarHttpAgent = new HarHttpAgent();\n        }\n        return globalHarHttpAgent;\n    }\n    if (!globalHarHttpsAgent) {\n        globalHarHttpsAgent = new HarHttpsAgent();\n    }\n    return globalHarHttpsAgent;\n};\n// handle agent creation and/or assignment\nconst getAgent = (resource, options) => {\n    if (options.agent) {\n        if (typeof options.agent === 'function') {\n            const agentFn = options.agent; // Type guard\n            return function (...args) {\n                //args are going to be resource and options obj\n                // @ts-ignore\n                const agent = agentFn.call(this, ...args);\n                if (agent) {\n                    instrumentAgentInstance(agent);\n                    return agent;\n                }\n                return getGlobalAgent(resource);\n            };\n        }\n        instrumentAgentInstance(options.agent);\n        return options.agent;\n    }\n    return getGlobalAgent(resource);\n};\nlet globalHarLog;\nconst harLogQueue = [];\nconst createNextWorkServer = () => {\n    const server = node_http_1.default.createServer();\n    let timeoutId;\n    server.on('request', (request, response) => {\n        // below is for dev purposes only - will delete when push to production\n        // as GUI will be Chrome Extension\n        if (request.method === 'GET' && request.url === '/') {\n            const data = fs.readFile(path.join(__dirname, '../nextWorkFetchLibrary/stream.html'), 'utf-8', (err, data) => {\n                if (err) {\n                    console.log(err);\n                }\n                else {\n                    response.writeHead(200, { 'Content-Type': 'text/html' });\n                    response.write(data);\n                }\n                response.end();\n            });\n        }\n        if (request.method === 'GET' && request.url === '/stream') {\n            response.writeHead(200, { 'Content-Type': 'text/event-stream' });\n            const send = (response) => {\n                if (harLogQueue.length) {\n                    response.write(`data: ${JSON.stringify(harLogQueue[0])}\\n\\n`);\n                    harLogQueue.shift();\n                }\n                timeoutId = setTimeout(() => send(response), 1000);\n            };\n            // handle client close connection\n            request.once('close', () => {\n                console.log('client closed connection');\n                clearTimeout(timeoutId);\n            });\n            send(response);\n        }\n    });\n    server.listen(3001, () => {\n        console.log('server listening on port 3001');\n    });\n};\n// Wrap and return custom fetch with HAR entry tracking\nconst nextWorkFetch = () => {\n    createNextWorkServer();\n    return function fetch(resource, options = {}, defaults = { trackRequest: true, harPageRef: '' }) {\n        if (defaults.trackRequest === false) {\n            return baseFetch(resource, options);\n        }\n        const requestId = generateId();\n        options = Object.assign({}, options, {\n            //add unique request id to headers\n            headers: (0, helpers_1.addHeaders)(options.headers, { [headerName]: requestId }),\n            // get custom agent class to pass into baseFetch to handle request\n            agent: getAgent(resource, options),\n        });\n        const { trackRequest, harPageRef } = defaults;\n        return baseFetch(resource, options)\n            .then(async (response) => {\n            const entry = harEntryMap.get(requestId);\n            harEntryMap.delete(requestId);\n            if (!entry) {\n                return response;\n            }\n            // We need to consume the decoded response in order to populate the\n            // `response.content` field.\n            const text = await response.text();\n            const { _timestamps: time } = entry;\n            time.received = process.hrtime();\n            const parents = [];\n            let child = entry;\n            do {\n                const parent = child._parent;\n                // Remove linked parent references as they're flattened.\n                delete child._parent;\n                if (parent) {\n                    parents.unshift(parent);\n                }\n                child = parent;\n            } while (child);\n            const responseCopy = new Response(text, {\n                status: response.status,\n                statusText: response.statusText,\n                headers: response.headers,\n                ok: response.ok,\n                size: response.size,\n                url: response.url,\n            });\n            // Allow grouping by pages.\n            entry.pageref = harPageRef || 'page_1';\n            parents.forEach((parent) => {\n                parent.pageref = entry.pageref;\n            });\n            // Response content info.\n            const bodySize = Buffer.byteLength(text);\n            entry.response.content.text = text;\n            entry.response.content.size = bodySize;\n            if (entry._compressed) {\n                if (entry.response.bodySize !== -1) {\n                    entry.response.content.compression =\n                        entry.response.content.size - entry.response.bodySize;\n                }\n            }\n            else {\n                entry.response.bodySize = bodySize;\n            }\n            // Finalize timing info.\n            // Chrome's HAR viewer (the Network panel) is broken and doesn't honor\n            // the HAR spec. If `blocked` is not a positive number, it shows the\n            // `wait` time as stalled instead of the time waiting for the response.\n            entry.timings.blocked = Math.max((0, helpers_1.getDuration)(time.start, time.socket), 0.01 // Minimum value, see above.\n            );\n            entry.timings.dns = (0, helpers_1.getDuration)(time.socket, time.lookup);\n            entry.timings.connect = (0, helpers_1.getDuration)(time.lookup, \n            // For backwards compatibility with HAR 1.1, the `connect` timing\n            // includes `ssl` instead of being mutually exclusive.\n            time.secureConnect || time.connect);\n            if (time.secureConnect) {\n                entry.timings.ssl = (0, helpers_1.getDuration)(time.connect, time.secureConnect);\n            }\n            entry.timings.send = (0, helpers_1.getDuration)(time.secureConnect || time.connect, time.sent);\n            entry.timings.wait = Math.max(\n            // Seems like it might be possible to receive a response before the\n            // request fires its `finish` event. This is just a hunch and it would\n            // be worthwhile to disprove.\n            (0, helpers_1.getDuration)(time.sent, time.firstByte), 0);\n            entry.timings.receive = (0, helpers_1.getDuration)(time.firstByte, time.received);\n            entry.time = (0, helpers_1.getDuration)(time.start, time.received);\n            responseCopy.harEntry = entry;\n            harLogQueue.push(...parents, entry);\n            return responseCopy;\n        })\n            .catch((err) => {\n            harEntryMap.delete(requestId);\n            throw err;\n        });\n    };\n};\nexports.nextWorkFetch = nextWorkFetch;\n// @ts-ignore\nnode_fetch_1.default = (0, exports.nextWorkFetch)();\n\n\n//# sourceURL=webpack://nextty-work/./src/nextWork.ts?");

/***/ }),

/***/ "nanoid":
/*!*************************!*\
  !*** external "nanoid" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("nanoid");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ "node:https":
/*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node:https");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node:url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/nextWork.ts");
/******/ 	
/******/ })()
;