import Http from './Http';
export declare type RoutePlannerStatus = RotatingIpRoutePlanner | NanoIpRoutePlanner | RotatingIpRoutePlanner;
export interface BaseRoutePlannerStatusDetails {
    ipBlock: {
        type: string;
        size: string;
    };
    failingAddresses: {
        address: string;
        failingTimestamp: number;
        failingTime: string;
    }[];
}
export interface RotatingIpRoutePlanner {
    class: 'RotatingIpRoutePlanner';
    details: BaseRoutePlannerStatusDetails & {
        rotateIndex: string;
        ipIndex: string;
        currentAddress: string;
    };
}
export interface NanoIpRoutePlanner {
    class: 'NanoIpRoutePlanner';
    details: BaseRoutePlannerStatusDetails & {
        currentAddressIndex: number;
    };
}
export interface RotatingNanoIpRoutePlanner {
    class: 'RotatingNanoIpRoutePlanner';
    details: BaseRoutePlannerStatusDetails & {
        blockIndex: string;
        currentAddressIndex: number;
    };
}
export default class RoutePlanner {
    readonly http: Http;
    constructor(http: Http);
    status(): Promise<RoutePlannerStatus>;
    unmark(address?: string): Promise<void>;
}
