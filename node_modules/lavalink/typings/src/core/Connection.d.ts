import * as WebSocket from 'ws';
import backoff = require('backoff');
import BaseNode from '../base/Node';
export interface Options extends WebSocket.ClientOptions {
    resumeKey?: string;
    resumeTimeout?: number;
}
export default class Connection<T extends BaseNode = BaseNode> {
    readonly node: T;
    url: string;
    options: Options;
    resumeKey?: string;
    ws: WebSocket;
    reconnectTimeout: number;
    private _backoff;
    private _listeners;
    private _queue;
    constructor(node: T, url: string, options?: Options);
    get backoff(): backoff.Backoff;
    set backoff(b: backoff.Backoff);
    connect(): void;
    configureResuming(timeout?: number, key?: string): Promise<void>;
    send(d: object): Promise<void>;
    close(code?: number, data?: string): Promise<void>;
    private _reconnect;
    private _registerWSEventListeners;
    private _flush;
    private _send;
}
