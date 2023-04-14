/// <reference types="node" />
/// <reference types="node" />
import { ClientRequest, ClientRequestArgs, Agent as HttpAgent } from 'node:http';
import { Agent as HttpsAgent } from 'node:https';
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
export interface HeaderAndQueryString {
    name: string;
    value: string;
}
export interface QueryParam {
    name: string;
    value: string;
}
export interface Params {
    [key: string]: string;
    value: string;
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
        receive: number;
        ssl: number;
    };
    request: {
        method: string;
        url: string;
        cookies: Cookie[];
        headers: HeaderAndQueryString[];
        queryString: HeaderAndQueryString[];
        headersSize: number;
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
export interface RequestOptions {
    agent?: HttpAgent | HttpsAgent;
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    integrity?: string;
    keepalive?: boolean;
    signal?: AbortSignal | null;
}
export interface CustomResponseInit extends ResponseInit {
    ok?: boolean;
}
export interface CustomResponse extends Response {
    harEntry?: Entry;
}
export interface BaseFetch {
    (resource: string, options: RequestOptions, defaults?: Default | undefined): Promise<any>;
    Response?: Response;
}
interface AddRequest {
    (request: ClientRequest, options: ClientRequestArgs, port?: number, localAddress?: string): (request: ClientRequest, options: ClientRequestArgs, port?: number, localAddress?: string) => void;
    customHarAgentEnabled?: boolean;
}
export interface InstrumentedHttpsAgent extends HttpsAgent {
    addRequest?: AddRequest;
}
export interface InstrumentedHttpAgent extends HttpAgent {
    addRequest?: AddRequest;
}
declare global {
    interface Window {
        fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    }
}
export {};
