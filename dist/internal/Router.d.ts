import { IgniteClientOnStateChanged } from "../IgniteClient";
import ClientSocket from "./ClientSocket";
import { CacheAffinityMap } from "./PartitionAwarenessUtils";
import BinaryCommunicator from "./BinaryCommunicator";
import { IgniteClientConfiguration } from "../IgniteClientConfiguration";
import { AffinityHint } from "../CacheClient";
import { PRIMITIVE_TYPE } from "./Constants";
import { CompositeType } from "../ObjectType";
export default class Router {
    private _state;
    private _connections;
    private _partitionAwarenessAllowed;
    private _partitionAwarenessActive;
    private _distributionMap;
    private _communicator;
    private _config;
    private _onStateChanged;
    private _inactiveEndpoints;
    private _backgroundConnectTask;
    private _legacyConnection;
    private _affinityTopologyVer;
    constructor(onStateChanged: IgniteClientOnStateChanged);
    connect(communicator: BinaryCommunicator, config: IgniteClientConfiguration): Promise<void>;
    disconnect(): void;
    send(opCode: any, payloadWriter: any, payloadReader?: any, affinityHint?: AffinityHint): Promise<void>;
    _connect(): Promise<void>;
    _reconnect(): Promise<void>;
    _runBackgroundConnect(): void;
    _waitBackgroundConnect(): Promise<void>;
    _backgroundConnect(): Promise<void>;
    _cleanUp(): void;
    _getAllConnections(): ClientSocket[];
    _addConnection(socket: ClientSocket): void;
    _removeConnection(socket: any): void;
    _onSocketDisconnect(socket: any, error?: any): Promise<void>;
    /** Partition Awareness methods */
    _affinitySend(opCode: any, payloadWriter: any, payloadReader: any, affinityHint: AffinityHint): Promise<void>;
    _chooseConnection(affinityHint: AffinityHint): Promise<ClientSocket>;
    _determineNodeId(cacheAffinityMap: CacheAffinityMap, key: object, keyType: PRIMITIVE_TYPE | CompositeType): Promise<number[] | null>;
    _affinityKeyInfo(key: any, keyType: any): Promise<{
        key: any;
        typeCode: number;
        typeId: any;
    } | {
        key: any;
        typeCode: number;
        typeId?: undefined;
    }>;
    _onAffinityTopologyChange(newVersion: any): Promise<void>;
    _getCachePartitions(cacheId: any): Promise<void>;
    _handleCachePartitions(payload: any): Promise<void>;
    _getRandomConnection(): ClientSocket;
    _changeState(state: any, reason?: any): void;
    _getState(state: any): "DISCONNECTED" | "CONNECTING" | "CONNECTED" | "UNKNOWN";
    _versionIsNewer(version: any): boolean;
    _versionIsOlder(version: any): boolean;
    _getRandomInt(max: any): number;
    _sleep(milliseconds: any): Promise<unknown>;
}
//# sourceMappingURL=Router.d.ts.map