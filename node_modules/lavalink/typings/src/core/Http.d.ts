/// <reference types="node" />
import { IncomingMessage, IncomingHttpHeaders } from 'http';
import { URL } from 'url';
import RoutePlanner from './RoutePlanner';
import BaseNode from '../base/Node';
export declare class HTTPError extends Error {
    readonly statusMessage: string;
    method: string;
    statusCode: number;
    headers: IncomingHttpHeaders;
    path: string;
    constructor(httpMessage: IncomingMessage, method: string, url: URL);
}
export declare enum LoadType {
    TRACK_LOADED = "TRACK_LOADED",
    PLAYLIST_LOADED = "PLAYLIST_LOADED",
    SEARCH_RESULT = "SEARCH_RESULT",
    NO_MATCHES = "NO_MATCHES",
    LOAD_FAILED = "LOAD_FAILED"
}
export interface TrackResponse {
    loadType: LoadType;
    playlistInfo: PlaylistInfo;
    tracks: Track[];
}
export interface PlaylistInfo {
    name?: string;
    selectedTrack?: number;
}
export interface TrackInfo {
    identifier: string;
    isSeekable: boolean;
    author: string;
    length: number;
    isStream: boolean;
    position: number;
    title: string;
    uri: string;
}
export interface Track {
    track: string;
    info: TrackInfo;
}
export default class Http {
    readonly node: BaseNode;
    input: string;
    base?: string;
    routeplanner: RoutePlanner;
    constructor(node: BaseNode, input: string, base?: string);
    url(): URL;
    load(identifier: string): Promise<TrackResponse>;
    decode(track: string): Promise<TrackInfo>;
    decode(tracks: string[]): Promise<Track[]>;
    decode(tracks: string | string[]): Promise<TrackInfo | Track[]>;
    do<T = any>(method: string, url: URL, data?: Buffer): Promise<T>;
}
