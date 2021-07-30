import BaseCluster from './base/Cluster';
import ClusterNode, { ClusterNodeOptions } from './ClusterNode';
export interface ClusterOptions {
    filter?: (node: ClusterNode, guildID: string) => boolean;
    send: (guildID: string, packet: any) => any;
    nodes?: ClusterNodeOptions[];
}
export default class Cluster extends BaseCluster {
    filter: (node: ClusterNode, guildID: string) => boolean;
    send: (guildID: string, packet: any) => any;
    constructor(options: ClusterOptions);
}
