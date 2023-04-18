import { QueryParam, Cookie, Params, HeaderAndQueryString } from './interfaces';
import { IncomingHttpHeaders } from 'node:http';
import { URLSearchParams } from 'node:url';
export declare const addHeaders: (oldHeaders: HeadersInit | undefined, requestIdHeader: {
    [key: string]: string;
}) => Headers;
export declare const buildRequestCookies: (headers: Record<string, string>) => Cookie[];
export declare const buildHeaders: (headers: string[]) => HeaderAndQueryString[];
export declare const buildQueryParams: (queryParams: URLSearchParams) => QueryParam[];
export declare const buildParams: (paramString: string) => Params[];
export declare const buildResponseCookies: (headers: IncomingHttpHeaders) => Cookie[];
export declare const getDuration: (a: [number, number], b: [number, number]) => number;
