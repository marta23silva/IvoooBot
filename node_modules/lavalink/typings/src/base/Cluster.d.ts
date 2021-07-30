/// <reference types="node" />
import { EventEmitter } from 'events';
import ClusterNode, { ClusterNodeOptions } from '../ClusterNode';
import Player from '../core/Player';
import { VoiceStateUpdate, VoiceServerUpdate } from './Node';
export default abstract class BaseCluster extends EventEmitter {
    abstract send: (guildID: string, packet: any) => any;
    abstract filter: (node: ClusterNode, guildID: string) => boolean;
    readonly nodes: ClusterNode[];
    constructor(options?: ClusterNodeOptions[]);
    spawn(options: ClusterNodeOptions): ClusterNode;
    spawn(options: ClusterNodeOptions[]): ClusterNode[];
    sort(): ClusterNode[];
    getNode(guildID: string): ClusterNode;
    has(guildID: string): boolean;
    get(guildID: string): Player<ClusterNode>;
    voiceStateUpdate(state: VoiceStateUpdate): Promise<boolean>;
    voiceServerUpdate(server: VoiceServerUpdate): Promise<boolean>;
}
