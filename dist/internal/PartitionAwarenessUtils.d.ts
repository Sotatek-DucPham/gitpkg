import MessageBuffer from "./MessageBuffer";
import BinaryCommunicator from "./BinaryCommunicator";
export declare class AffinityTopologyVersion {
    private _major;
    private _minor;
    constructor(payload: any);
    compareTo(other: any): number;
    equals(other: any): boolean;
    toString(): string;
}
export declare class PartitionAwarenessCacheGroup {
    private _caches;
    private _partitionMap;
    constructor(caches: Array<[number, Map<number, number>]>, partitionMap: Array<[number, number[]]>);
    static build(communicator: any, payload: any): Promise<PartitionAwarenessCacheGroup>;
    get caches(): Array<[number, Map<number, number>]>;
    get partitionMap(): Array<[number, number[]]>;
    static _readCacheKeyConfig(payload: any): Map<number, number>;
    static _readPartitionMap(communicator: BinaryCommunicator, payload: MessageBuffer): Promise<Array<[number, number[]]>>;
}
export declare class CacheAffinityMap {
    private _cacheId;
    private _partitionMapping;
    private _keyConfig;
    constructor(cacheId: number, partitionMapping: Map<number, number[]>, keyConfig: Map<number, number>);
    get cacheId(): number;
    get partitionMapping(): Map<number, number[]>;
    get keyConfig(): Map<number, number>;
}
export declare class RendezvousAffinityFunction {
    static calcPartition(keyHash: any, partitionsNum: any): number;
}
//# sourceMappingURL=PartitionAwarenessUtils.d.ts.map