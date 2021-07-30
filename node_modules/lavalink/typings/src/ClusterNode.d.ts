import Cluster from './base/Cluster';
import BaseNode, { BaseNodeOptions } from './base/Node';
export interface ClusterNodeOptions extends BaseNodeOptions {
    tags?: Iterable<string>;
}
export interface Stats {
    players: number;
    playingPlayers: number;
    uptime: number;
    memory?: {
        free: number;
        used: number;
        allocated: number;
        reservable: number;
    };
    cpu?: {
        cores: number;
        systemLoad: number;
        lavalinkLoad: number;
    };
    frameStats?: {
        sent: number;
        nulled: number;
        deficit: number;
    };
}
export default class ClusterNode extends BaseNode {
    readonly cluster: Cluster;
    tags: Set<string>;
    stats?: Stats;
    constructor(cluster: Cluster, options: ClusterNodeOptions);
    emit(name: string | symbol, ...args: any[]): boolean;
    send: (guildID: string, pk: object) => Promise<any>;
    destroy(code?: number, data?: string): Promise<void>;
}
