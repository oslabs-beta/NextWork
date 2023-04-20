/// <reference types="node" />
import { Default, RequestOptions } from './interfaces';
import { Agent as HttpAgent } from 'node:http';
import { Agent as HttpsAgent } from 'node:https';
import { URL } from 'node:url';
export declare const createAgentClass: (BaseAgent: typeof HttpAgent | typeof HttpsAgent) => {
    new (...args: any[]): {
        addRequest(request: any, ...args: any[]): void;
    };
};
export declare function getInputUrl(resource: string | {
    href: string;
}): URL;
export declare const nextWorkFetch: () => (resource: string, options: RequestOptions, defaults?: Default) => Promise<any>;
