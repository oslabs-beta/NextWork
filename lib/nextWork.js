'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.nextWorkFetch = exports.getInputUrl = exports.createAgentClass = void 0;
const node_http_1 = __importStar(require('node:http'));
const node_https_1 = require('node:https');
let baseFetch;
// @ts-ignore
let node_fetch_1;
import('node-fetch').then((mod) => {
  baseFetch = mod.default;
  node_fetch_1 = mod;
});
let generateId;
import('nanoid').then((mod) => {
  generateId = mod.nanoid;
});
const fs = __importStar(require('node:fs'));
const path = __importStar(require('node:path'));
const node_url_1 = require('node:url');
const helpers_1 = require('./helpers');
const headerName = 'x-har-request-id';
const harEntryMap = new Map();
const handleRequest = (request, options) => {
  if (!options || typeof options !== 'object') {
    return;
  }
  const headers = options.headers || {};
  const requestId = headers[headerName] ? headers[headerName] : null;
  if (!requestId) {
    return;
  }
  // Redirects! Fetch follows them (in `follow`) mode and uses the same request
  // headers. So we'll see multiple requests with the same ID. We should remove
  // any previous entry from `harEntryMap` and attach it as a "parent" to this
  // one.
  const parentEntry = harEntryMap.get(requestId);
  if (parentEntry) {
    harEntryMap.delete(requestId);
  }
  const url = new node_url_1.URL(options.url || options.href); // Depends on Node version?
  const entry = {
    _parent: parentEntry,
    _timestamps: {
      // needs to be changed to bigint - issues with json parse
      //process.hrtime() returns [seconds, nanoseconds]
      start: process.hrtime(),
    },
    _resourceType: 'fetch',
    startedDateTime: new Date(Date.now()).toISOString(),
    cache: {
      beforeRequest: null,
      afterRequest: null,
    },
    timings: {
      blocked: -1,
      dns: -1,
      connect: -1,
      send: 0,
      wait: 0,
      receive: 0,
      ssl: -1,
    },
    request: {
      method: request.method,
      url: url.href,
      cookies: (0, helpers_1.buildRequestCookies)(headers),
      headers: (0, helpers_1.buildHeaders)(headers),
      queryString: (0, helpers_1.buildQueryParams)(url.searchParams),
      headersSize: -1,
      bodySize: -1,
    },
  };
  // globalEntry = entry;
  // capturing writes to the ClientRequest stream
  const _write = request.write;
  const _end = request.end;
  let requestBody;
  const concatBody = (chunk) => {
    if (typeof chunk === 'string') {
      if (!requestBody) {
        requestBody = chunk;
      } else {
        requestBody += chunk;
      }
    } else if (Buffer.isBuffer(chunk)) {
      if (!requestBody) {
        requestBody = chunk;
      } else {
        const copiedBody = Buffer.from(requestBody);
        requestBody = Buffer.concat([copiedBody, chunk]);
      }
    }
  };
  request.write = function (chunk, encoding, callback) {
    concatBody(chunk);
    return _write.call(this, chunk, encoding, callback);
  };
  request.end = function (chunk, encoding, callback) {
    concatBody(chunk);
    if (requestBody) {
      entry.request.bodySize = Buffer.byteLength(requestBody);
      let mimeType;
      for (const name in headers) {
        if (name.toLowerCase() === 'content-type') {
          mimeType = headers[name];
          break;
        }
      }
      if (mimeType) {
        const bodyString = requestBody.toString(); // FIXME: Assumes encoding?
        if (mimeType === 'application/x-www-form-urlencoded') {
          entry.request.postData = {
            mimeType,
            params: (0, helpers_1.buildParams)(bodyString),
          };
        } else {
          entry.request.postData = { mimeType, text: bodyString };
        }
      }
    }
    return _end.call(this, chunk, encoding, callback);
  };
  let removeSocketListeners;
  request.on('socket', (socket) => {
    entry._timestamps.socket = process.hrtime();
    const onLookup = () => {
      entry._timestamps.lookup = process.hrtime();
    };
    const onConnect = () => {
      entry._timestamps.connect = process.hrtime();
    };
    const onSecureConnect = () => {
      entry._timestamps.secureConnect = process.hrtime();
    };
    socket.once('lookup', onLookup);
    socket.once('connect', onConnect);
    socket.once('secureConnect', onSecureConnect);
    removeSocketListeners = () => {
      socket.removeListener('lookup', onLookup);
      socket.removeListener('connect', onConnect);
      socket.removeListener('secureConnect', onSecureConnect);
    };
  });
  request.on('finish', () => {
    entry._timestamps.sent = process.hrtime();
    removeSocketListeners();
  });
  request.on('response', (response) => {
    entry._timestamps.firstByte = process.hrtime();
    harEntryMap.set(requestId, entry);
    // Now we know whether `lookup` or `connect` happened. It's possible they
    // were skipped if the hostname was already resolved (or we were given an
    // IP directly), or if a connection was already open (e.g. due to
    // `keep-alive`).
    if (!entry._timestamps.lookup) {
      entry._timestamps.lookup = entry._timestamps.socket;
    }
    if (!entry._timestamps.connect) {
      entry._timestamps.connect = entry._timestamps.lookup;
    }
    // Populate request info that isn't available until now.
    const httpVersion = `HTTP/${response.httpVersion}`;
    entry.request.httpVersion = httpVersion;
    entry.response = {
      status: response.statusCode,
      statusText: response.statusMessage,
      httpVersion,
      cookies: (0, helpers_1.buildResponseCookies)(response.headers),
      headers: (0, helpers_1.buildHeaders)(response.rawHeaders),
      content: {
        size: -1,
        mimeType: response.headers['content-type'],
      },
      redirectURL: response.headers.location || '',
      headersSize: -1,
      bodySize: -1,
    };
    let compressed;
    // Detect supported compression encodings.
    if (response.headers['content-encoding']) {
      compressed = /^(gzip|compress|deflate|br)$/.test(
        response.headers['content-encoding']
      );
    }
    if (compressed) {
      entry._compressed = true;
      response.on('data', (chunk) => {
        if (entry.response) {
          if (entry.response.bodySize === -1) {
            entry.response.bodySize = 0;
          }
          entry.response.bodySize += Buffer.byteLength(chunk);
        }
      });
    }
  });
};
const createAgentClass = (BaseAgent) => {
  //http(s).Agent
  class HarAgent extends BaseAgent {
    // what args are going into constructor?
    constructor(...args) {
      super(...args);
      this.addRequest.customHarAgentEnabled = true;
    }
    addRequest(request, ...args) {
      // @ts-ignore
      handleRequest(request, ...args);
      super.addRequest(request, ...args);
    }
  }
  return HarAgent;
};
exports.createAgentClass = createAgentClass;
let globalHarHttpAgent;
let globalHarHttpsAgent;
const HarHttpAgent = (0, exports.createAgentClass)(node_http_1.Agent);
const HarHttpsAgent = (0, exports.createAgentClass)(node_https_1.Agent);
const instrumentAgentInstance = (agent) => {
  const { addRequest: originalAddRequest } = agent;
  if (originalAddRequest) {
    if (!originalAddRequest.customHarAgentEnabled) {
      agent.addRequest = function addRequest(
        request,
        options,
        port,
        localAddress
      ) {
        handleRequest(request, options);
        return originalAddRequest.call(
          this,
          request,
          options,
          port,
          localAddress
        ); //here 'this' refers to agent object
      };
      agent.addRequest.customHarAgentEnabled = true;
    }
  }
};
function getInputUrl(resource) {
  let url;
  if (typeof resource === 'string') {
    url = resource;
  } else {
    url = resource.href;
  }
  return new node_url_1.URL(url);
}
exports.getInputUrl = getInputUrl;
// handle cases where agent does not exist in fetch options
const getGlobalAgent = (resource) => {
  const url = getInputUrl(resource);
  if (url.protocol === 'http:') {
    if (!globalHarHttpAgent) {
      globalHarHttpAgent = new HarHttpAgent();
    }
    return globalHarHttpAgent;
  }
  if (!globalHarHttpsAgent) {
    globalHarHttpsAgent = new HarHttpsAgent();
  }
  return globalHarHttpsAgent;
};
// handle agent creation and/or assignment
const getAgent = (resource, options) => {
  if (options.agent) {
    if (typeof options.agent === 'function') {
      const agentFn = options.agent; // Type guard
      return function (...args) {
        //args are going to be resource and options obj
        // @ts-ignore
        const agent = agentFn.call(this, ...args);
        if (agent) {
          instrumentAgentInstance(agent);
          return agent;
        }
        return getGlobalAgent(resource);
      };
    }
    instrumentAgentInstance(options.agent);
    return options.agent;
  }
  return getGlobalAgent(resource);
};
let globalHarLog;
const harLogQueue = [];
const createNextWorkServer = () => {
  const server = node_http_1.default.createServer();
  let timeoutId;
  server.on('request', (request, response) => {
    // below is for dev purposes only - will delete when push to production
    // as GUI will be Chrome Extension
    if (request.method === 'GET' && request.url === '/') {
      const data = fs.readFile(
        path.join(__dirname, '../nextWorkFetchLibrary/stream.html'),
        'utf-8',
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
          }
          response.end();
        }
      );
    }
    if (request.method === 'GET' && request.url === '/stream') {
      response.writeHead(200, { 'Content-Type': 'text/event-stream' });
      const send = (response) => {
        if (harLogQueue.length) {
          response.write(`data: ${JSON.stringify(harLogQueue[0])}\n\n`);
          harLogQueue.shift();
        }
        timeoutId = setTimeout(() => send(response), 1000);
      };
      // handle client close connection
      request.once('close', () => {
        console.log('client closed connection');
        clearTimeout(timeoutId);
      });
      send(response);
    }
  });
  server.listen(3001, () => {
    console.log('server listening on port 3001');
  });
};
// Wrap and return custom fetch with HAR entry tracking
const nextWorkFetch = () => {
  // createNextWorkServer();
  return function fetch(
    resource,
    options,
    defaults = { trackRequest: true, harPageRef: '' }
  ) {
    if (defaults.trackRequest === false) {
      return baseFetch(resource, options);
    }
    const requestId = generateId();
    options = Object.assign({}, options, {
      //add unique request id to headers
      headers: (0, helpers_1.addHeaders)(options.headers, {
        [headerName]: requestId,
      }),
      // get custom agent class to pass into baseFetch to handle request
      agent: getAgent(resource, options),
    });
    const { trackRequest, harPageRef } = defaults;
    return baseFetch(resource, options)
      .then(async (response) => {
        const entry = harEntryMap.get(requestId);
        harEntryMap.delete(requestId);
        if (!entry) {
          return response;
        }
        // We need to consume the decoded response in order to populate the
        // `response.content` field.
        const text = await response.text();
        const { _timestamps: time } = entry;
        time.received = process.hrtime();
        const parents = [];
        let child = entry;
        do {
          const parent = child._parent;
          // Remove linked parent references as they're flattened.
          delete child._parent;
          if (parent) {
            parents.unshift(parent);
          }
          child = parent;
        } while (child);
        const responseCopy = new node_fetch_1.Response(text, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          ok: response.ok,
          size: response.size,
          url: response.url,
        });
        // Allow grouping by pages.
        entry.pageref = harPageRef || 'page_1';
        parents.forEach((parent) => {
          parent.pageref = entry.pageref;
        });
        // Response content info.
        const bodySize = Buffer.byteLength(text);
        entry.response.content.text = text;
        entry.response.content.size = bodySize;
        if (entry._compressed) {
          if (entry.response.bodySize !== -1) {
            entry.response.content.compression =
              entry.response.content.size - entry.response.bodySize;
          }
        } else {
          entry.response.bodySize = bodySize;
        }
        // Finalize timing info.
        // Chrome's HAR viewer (the Network panel) is broken and doesn't honor
        // the HAR spec. If `blocked` is not a positive number, it shows the
        // `wait` time as stalled instead of the time waiting for the response.
        entry.timings.blocked = Math.max(
          (0, helpers_1.getDuration)(time.start, time.socket),
          0.01 // Minimum value, see above.
        );
        entry.timings.dns = (0, helpers_1.getDuration)(
          time.socket,
          time.lookup
        );
        entry.timings.connect = (0, helpers_1.getDuration)(
          time.lookup,
          // For backwards compatibility with HAR 1.1, the `connect` timing
          // includes `ssl` instead of being mutually exclusive.
          time.secureConnect || time.connect
        );
        if (time.secureConnect) {
          entry.timings.ssl = (0, helpers_1.getDuration)(
            time.connect,
            time.secureConnect
          );
        }
        entry.timings.send = (0, helpers_1.getDuration)(
          time.secureConnect || time.connect,
          time.sent
        );
        entry.timings.wait = Math.max(
          // Seems like it might be possible to receive a response before the
          // request fires its `finish` event. This is just a hunch and it would
          // be worthwhile to disprove.
          (0, helpers_1.getDuration)(time.sent, time.firstByte),
          0
        );
        entry.timings.receive = (0, helpers_1.getDuration)(
          time.firstByte,
          time.received
        );
        entry.time = (0, helpers_1.getDuration)(time.start, time.received);
        responseCopy.harEntry = entry;
        harLogQueue.push(...parents, entry);
        return responseCopy;
      })
      .catch((err) => {
        harEntryMap.delete(requestId);
        throw err;
      });
  };
};
exports.nextWorkFetch = nextWorkFetch;
// @ts-ignore
node_fetch_1.default = (0, exports.nextWorkFetch)();
