import Player from './Player';
import BaseNode from '../base/Node';
export default class PlayerStore<T extends BaseNode = BaseNode> extends Map<string, Player<T>> {
    readonly node: T;
    constructor(node: T);
    get(key: string): Player<T>;
}
