import { Socket } from 'node:net';
import {
  Entry,
  Default,
  RequestOptions,
  BaseFetch,
  CustomResponseInit,
  CustomResponse,
  InstrumentedHttpsAgent,
  InstrumentedHttpAgent,
  AddRequestOptions,
} from './interfaces';
import http, {
  IncomingMessage,
  ClientRequest,
  ClientRequestArgs,
} from 'node:http';
import { Agent as HttpAgent } from 'node:http';
// import { Response } from 'node-fetch';
import { Agent as HttpsAgent } from 'node:https';
import { default as base } from 'node-fetch';
// @ts-ignore
const baseFetch: BaseFetch = base;
import { nanoid } from 'nanoid';
// const generateId = nanoid;
import * as fs from 'node:fs';
import * as path from 'node:path';
import { URL } from 'node:url';
import {
  addHeaders,
  buildRequestCookies,
  buildHeaders,
  buildQueryParams,
  buildParams,
  buildResponseCookies,
  getDuration,
} from './helpers';
const headerName = 'x-har-request-id';
const harEntryMap = new Map();

const handleRequest = (request: any, options: any): void => {
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

  const url = new URL(options.url || options.href); // Depends on Node version?

  const entry: Entry = {
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
      cookies: buildRequestCookies(headers),
      headers: buildHeaders(headers),
      queryString: buildQueryParams(url.searchParams),
      headersSize: -1,
      bodySize: -1,
    },
  };

  const _write = request.write;
  const _end = request.end;
  let requestBody: string | Buffer;

  const concatBody = (chunk: string | Buffer | Uint8Array): void => {
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
        let copiedBody = Buffer.from(requestBody);
        requestBody = Buffer.concat([copiedBody, chunk]);
      }
    }
  };

  request.write = function (
    chunk: string | Buffer | Uint8Array,
    encoding: BufferEncoding,
    callback?: any
  ) {
    concatBody(chunk);
    return _write.call(this, chunk, encoding, callback);
  };

  request.end = function (
    chunk: string | Buffer | Uint8Array,
    encoding: BufferEncoding,
    callback?: any
  ) {
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
            params: buildParams(bodyString),
          };
        } else {
          entry.request.postData = { mimeType, text: bodyString };
        }
      }
    }
    return _end.call(this, chunk, encoding, callback);
  };

  let removeSocketListeners: () => void;

  request.on('socket', (socket: Socket): void => {
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

  request.on('response', (response: IncomingMessage): void => {
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
      cookies: buildResponseCookies(response.headers),
      headers: buildHeaders(response.rawHeaders),
      content: {
        size: -1,
        mimeType: response.headers['content-type'],
      },
      redirectURL: response.headers.location || '',
      headersSize: -1,
      bodySize: -1,
    };

    let compressed: boolean | undefined;
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

export const createAgentClass = (
  BaseAgent: typeof HttpAgent | typeof HttpsAgent
) => {
  //http(s).Agent
  class HarAgent extends BaseAgent {
    // what args are going into constructor?
    constructor(...args: any[]) {
      super(...args);
      (this.addRequest as AddRequestOptions).customHarAgentEnabled = true;
    }

    addRequest(request: any, ...args: any[]): void {
      // @ts-ignore
      handleRequest(request, ...args);
      super.addRequest(request, ...args);
    }
  }
  return HarAgent;
};

let globalHarHttpAgent: InstrumentedHttpAgent;
let globalHarHttpsAgent: InstrumentedHttpsAgent;

const HarHttpAgent = createAgentClass(HttpAgent);
const HarHttpsAgent = createAgentClass(HttpsAgent);

const instrumentAgentInstance = (
  agent: InstrumentedHttpAgent | InstrumentedHttpsAgent
) => {
  const { addRequest: originalAddRequest } = agent;
  if (originalAddRequest) {
    if (!originalAddRequest.customHarAgentEnabled) {
      agent.addRequest = function addRequest(
        request: ClientRequest,
        options: ClientRequestArgs,
        port?: number,
        localAddress?: string
      ): (
        request: ClientRequest,
        options: ClientRequestArgs,
        port?: number,
        localAddress?: string
      ) => void {
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

export function getInputUrl(resource: string | { href: string }): URL {
  let url: string;
  if (typeof resource === 'string') {
    url = resource;
  } else {
    url = resource.href;
  }
  return new URL(url);
}

// handle cases where agent does not exist in fetch options
const getGlobalAgent = (resource: string) => {
  const url = getInputUrl(resource);
  if (url.protocol === 'http:') {
    if (!globalHarHttpAgent) {
      globalHarHttpAgent = new HarHttpAgent() as InstrumentedHttpAgent;
    }
    return globalHarHttpAgent;
  }
  if (!globalHarHttpsAgent) {
    globalHarHttpsAgent = new HarHttpsAgent() as InstrumentedHttpsAgent;
  }
  return globalHarHttpsAgent;
};

// handle agent creation and/or assignment
const getAgent = (resource: string, options: RequestOptions) => {
  if (options.agent) {
    if (typeof options.agent === 'function') {
      const agentFn = options.agent as (
        this: typeof HttpAgent | typeof HttpsAgent,
        ...args: any[]
      ) => any; // Type guard

      return function (...args: any[]) {
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
const harLogQueue: Entry[] = [];

const createNextWorkServer = (): void => {
  const server = http.createServer();
  let timeoutId: NodeJS.Timeout;
  server.on(
    'request',
    (request: http.IncomingMessage, response: http.ServerResponse) => {
      // below is for dev purposes only - will delete when push to production
      // as GUI will be Chrome Extension
      if (request.method === 'GET' && request.url === '/') {
        const data = fs.readFile(
          path.join(__dirname, '../nextWorkFetchLibrary/stream.html'),
          'utf-8',
          (err: NodeJS.ErrnoException | null, data: string) => {
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
        const send = (response: http.ServerResponse) => {
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
    }
  );
  server.listen(3001, () => {
    console.log('server listening on port 3001');
  });
};

// Wrap and return custom fetch with HAR entry tracking
export const nextWorkFetch = (): ((
  resource: string,
  options: RequestOptions,
  defaults?: Default
) => Promise<any>) => {
  createNextWorkServer();

  return function fetch(
    resource,
    options = {},
    defaults = { trackRequest: true, harPageRef: '' }
  ) {
    if (defaults.trackRequest === false) {
      return baseFetch(resource, options);
    }

    const requestId = nanoid();

    options = Object.assign({}, options, {
      //add unique request id to headers
      headers: addHeaders(options.headers, { [headerName]: requestId }),
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

        const responseCopy = new Response(text, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          ok: response.ok,
          size: response.size,
          url: response.url,
        } as CustomResponseInit) as CustomResponse;

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
          getDuration(time.start, time.socket),
          0.01 // Minimum value, see above.
        );
        entry.timings.dns = getDuration(time.socket, time.lookup);
        entry.timings.connect = getDuration(
          time.lookup,
          // For backwards compatibility with HAR 1.1, the `connect` timing
          // includes `ssl` instead of being mutually exclusive.
          time.secureConnect || time.connect
        );
        if (time.secureConnect) {
          entry.timings.ssl = getDuration(time.connect, time.secureConnect);
        }
        entry.timings.send = getDuration(
          time.secureConnect || time.connect,
          time.sent
        );
        entry.timings.wait = Math.max(
          // Seems like it might be possible to receive a response before the
          // request fires its `finish` event. This is just a hunch and it would
          // be worthwhile to disprove.
          getDuration(time.sent, time.firstByte),
          0
        );
        entry.timings.receive = getDuration(time.firstByte, time.received);
        entry.time = getDuration(time.start, time.received);

        responseCopy.harEntry = entry;
        harLogQueue.push(...parents, entry);
        return responseCopy;
      })
      .catch((err: Error) => {
        harEntryMap.delete(requestId);
        throw err;
      });
  };
};

// @ts-ignore
fetch = nextWorkFetch();
