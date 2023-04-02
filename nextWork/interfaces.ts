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

export interface Header {
  name: string;
  value: string;
}

interface HeaderAndQueryString {
  name: string;
  value: string;
  comment?: string;
}

export interface QueryParam {
  name: string;
  value: string;
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
  response?: {
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

export interface Creator {
  name: string;
  version: string;
}

export interface PageTimings {
  onContentLoad: number;
  onLoad: number;
}

export interface PageInfo {
  startedDateTime?: string;
  id?: string;
  title?: string;
  pageTimings?: PageTimings;
}

export interface HarLog {
  version?: string;
  creator?: Creator;
  pages?: PageInfo[];
  entries?: Entry[];
}

export interface Default {
  trackRequest: boolean;
  harPageRef: string;
  Response?: Response;
}

export interface Parsed {
  [key: string]: string;
}

declare global {
  interface Window {
    fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  }
}
