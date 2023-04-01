export interface Param {
  key: string;
  value: string;
}

export interface AddRequestOptions {
  customHarAgentEnabled?: boolean;
}
export interface Cookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: string;
  httpOnly?: boolean;
  secure?: boolean;
  comment?: string;
}

interface HeaderAndQueryString {
  name: string;
  value: string;
  comment?: string;
}

interface Params {
  name: string;
  value: string;
  fileName?: string;
  contentType?: string;
  comment?: string;
}

interface PostData {
  mimeType: string;
  params?: Params[];
  text?: string;
  comment?: string;
}

export interface Entry {
  _parent: Entry;
  _timestamps: {
    socket?: number[];
    lookup?: number[];
    start: number[];
    secureConnect?: number[];
    connect?: number[];
    sent?: number[];
    firstByte?: number[];
  };
  _resourceType: string;
  startedDateTime: string;
  cache: {
    beforeRequest: null | {
      expires?: string;
      lastAccess: string;
      eTag: string;
      hitCount: number;
      comment?: string;
    };
    afterRequest: null | {
      expires?: string;
      lastAccess: string;
      eTag: string;
      hitCount: number;
      comment?: string;
    };
  };
  timings: {
    blocked: number;
    dns: number;
    connect: number;
    send: number;
    wait: number;
    recieve: number;
    ssl: number;
  };
  request: {
    method: string;
    url: string;
    cookies: Cookie[];
    headers: HeaderAndQueryString[];
    queryString: HeaderAndQueryString[];
    headerSize: number;
    bodySize: number;
    postData?: PostData;
    httpVersion?: string;
  };
  response: {
    status: number | undefined;
    statusText: string | undefined;
    httpVersion: string;
    cookies: Cookie[];
    headers: HeaderAndQueryString[];
    content: {
      size: number;
      mimeType: string | undefined;
    };
    redirectURL: string;
    headersSize: number;
    bodySize: number;
  };
  _compressed?: boolean;
}
