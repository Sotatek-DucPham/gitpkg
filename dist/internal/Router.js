/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util = require("util");
const IgniteClient_1 = require("../IgniteClient");
const ClientSocket_1 = require("./ClientSocket");
const BinaryUtils_1 = require("./BinaryUtils");
const BinaryObject_1 = require("../BinaryObject");
const Logger_1 = require("./Logger");
const PartitionAwarenessUtils_1 = require("./PartitionAwarenessUtils");
const Errors_1 = require("../Errors");
class Router {
    constructor(onStateChanged) {
        this._state = IgniteClient_1.IgniteClient.STATE.DISCONNECTED;
        this._onStateChanged = onStateChanged;
        this._partitionAwarenessAllowed = false;
        // ClientSocket instance with no node UUID
        this._legacyConnection = null;
        // Array of endpoints which we are not connected to. Mostly used when Partition Awareness is on
        this._inactiveEndpoints = [];
        /** Partition Awareness only fields */
        // This flag indicates if we have at least two alive connections
        this._partitionAwarenessActive = false;
        // Contains the background task (promise) or null
        this._backgroundConnectTask = null;
        // {Node UUID -> ClientSocket instance}
        this._connections = {};
        // {cacheId -> CacheAffinityMap}
        this._distributionMap = new Map();
        this._affinityTopologyVer = null;
    }
    connect(communicator, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._state !== IgniteClient_1.STATE.DISCONNECTED) {
                throw new Errors_1.IllegalStateError(this._state);
            }
            // Wait for background task to stop before we move forward
            yield this._waitBackgroundConnect();
            this._communicator = communicator;
            this._config = config;
            this._partitionAwarenessAllowed = config.partitionAwareness;
            this._inactiveEndpoints = [...config.endpoints];
            yield this._connect();
        });
    }
    disconnect() {
        if (this._state !== IgniteClient_1.IgniteClient.STATE.DISCONNECTED) {
            this._changeState(IgniteClient_1.IgniteClient.STATE.DISCONNECTED);
            for (const socket of this._getAllConnections()) {
                socket.disconnect();
            }
            this._cleanUp();
        }
    }
    send(opCode, payloadWriter, payloadReader = null, affinityHint = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._state !== IgniteClient_1.IgniteClient.STATE.CONNECTED) {
                throw new Errors_1.IllegalStateError(this._state);
            }
            if (this._partitionAwarenessActive && affinityHint) {
                yield this._affinitySend(opCode, payloadWriter, payloadReader, affinityHint);
            }
            else {
                // If _partitionAwarenessActive flag is not set, we have exactly one connection
                // but it can be either a legacy one or a modern one (with node UUID)
                // If affinityHint has not been passed, we want to always use one socket (as long as it is alive)
                // because some requests (e.g., SQL cursor-related) require to be sent to the same cluster node
                yield this._getAllConnections()[0].sendRequest(opCode, payloadWriter, payloadReader);
            }
        });
    }
    _connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            const endpoints = this._inactiveEndpoints;
            const config = this._config;
            const communicator = this._communicator;
            const onSocketDisconnect = this._onSocketDisconnect.bind(this);
            const onAffinityTopologyChange = this._onAffinityTopologyChange.bind(this);
            const endpointsNum = endpoints.length;
            const random = this._getRandomInt(endpointsNum);
            this._changeState(IgniteClient_1.IgniteClient.STATE.CONNECTING);
            for (let i = 0; i < endpoints.length; i++) {
                const index = (i + random) % endpointsNum;
                const endpoint = endpoints[index];
                try {
                    const socket = new ClientSocket_1.default(endpoint, config, communicator, onSocketDisconnect, onAffinityTopologyChange);
                    yield socket.connect();
                    Logger_1.default.logDebug(Util.format('Connected to %s', endpoint));
                    this._changeState(IgniteClient_1.IgniteClient.STATE.CONNECTED);
                    this._addConnection(socket);
                    this._runBackgroundConnect();
                    return;
                }
                catch (err) {
                    Logger_1.default.logDebug(Util.format('Could not connect to %s. Error: "%s"', endpoint, err.message));
                    errors.push(Util.format('[%s] %s', endpoint, err.message));
                }
            }
            const error = errors.join('; ');
            this._changeState(IgniteClient_1.IgniteClient.STATE.DISCONNECTED, error);
            throw new Errors_1.IgniteClientError(error);
        });
    }
    // Can be called when there are no alive connections left
    _reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._waitBackgroundConnect();
            yield this._connect();
        });
    }
    _runBackgroundConnect() {
        if (this._partitionAwarenessAllowed && !this._backgroundConnectTask) {
            // Only one task can be active
            this._backgroundConnectTask = this._backgroundConnect();
            this._backgroundConnectTask.then(() => this._backgroundConnectTask = null);
        }
    }
    _waitBackgroundConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._backgroundConnectTask) {
                yield this._backgroundConnectTask;
            }
        });
    }
    _backgroundConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            // Local copy of _inactiveEndpoints to make sure the array is not being changed during the 'for' cycle
            const endpoints = [...this._inactiveEndpoints];
            const config = this._config;
            const communicator = this._communicator;
            const onSocketDisconnect = this._onSocketDisconnect.bind(this);
            const onAffinityTopologyChange = this._onAffinityTopologyChange.bind(this);
            for (const endpoint of endpoints) {
                const socket = new ClientSocket_1.default(endpoint, config, communicator, onSocketDisconnect, onAffinityTopologyChange);
                try {
                    yield socket.connect();
                    Logger_1.default.logDebug(Util.format('Connected (in background) to %s', endpoint));
                    // While we were waiting for socket to connect, someone could call disconnect()
                    if (this._state !== IgniteClient_1.IgniteClient.STATE.CONNECTED) {
                        // If became not connected, stop this task
                        socket.disconnect();
                        return;
                    }
                    this._addConnection(socket);
                }
                catch (err) {
                    Logger_1.default.logDebug(Util.format('Could not connect (in background) to %s. Error: "%s"', endpoint, err.message));
                    // While we were waiting for socket to connect, someone could call disconnect()
                    if (this._state !== IgniteClient_1.IgniteClient.STATE.CONNECTED) {
                        // If became not connected, stop this task
                        socket.disconnect();
                        return;
                    }
                }
            }
        });
    }
    _cleanUp() {
        this._legacyConnection = null;
        this._inactiveEndpoints = [];
        this._partitionAwarenessActive = false;
        this._connections = {};
        this._distributionMap = new Map();
        this._affinityTopologyVer = null;
    }
    _getAllConnections() {
        const allConnections = Object.values(this._connections);
        if (this._legacyConnection) {
            allConnections.push(this._legacyConnection);
        }
        return allConnections;
    }
    _addConnection(socket) {
        const nodeUUID = socket.nodeUUID;
        if (this._partitionAwarenessAllowed && nodeUUID) {
            if (nodeUUID in this._connections) {
                // This can happen if the same node has several IPs
                // We will keep more fresh connection alive
                this._connections[nodeUUID].disconnect();
            }
            this._connections[nodeUUID] = socket;
        }
        else {
            if (this._legacyConnection) {
                // We already have a legacy connection
                // We will keep more fresh connection alive
                this._legacyConnection.disconnect();
            }
            this._legacyConnection = socket;
        }
        // Remove the endpoint from _inactiveEndpoints
        const index = this._inactiveEndpoints.indexOf(socket.endpoint);
        if (index > -1) {
            this._inactiveEndpoints.splice(index, 1);
        }
        if (!this._partitionAwarenessActive &&
            this._getAllConnections().length >= 2) {
            this._partitionAwarenessActive = true;
        }
    }
    _removeConnection(socket) {
        if (socket.nodeUUID in this._connections) {
            delete this._connections[socket.nodeUUID];
            // Add the endpoint to _inactiveEndpoints
            this._inactiveEndpoints.push(socket.endpoint);
        }
        else if (this._legacyConnection == socket) {
            this._legacyConnection = null;
            // Add the endpoint to _inactiveEndpoints
            this._inactiveEndpoints.push(socket.endpoint);
        }
        if (this._partitionAwarenessActive &&
            this._getAllConnections().length < 2) {
            this._partitionAwarenessActive = false;
        }
    }
    _onSocketDisconnect(socket, error = null) {
        return __awaiter(this, void 0, void 0, function* () {
            this._removeConnection(socket);
            if (this._getAllConnections().length != 0) {
                // We had more than one connection before this disconnection
                this._runBackgroundConnect();
                return;
            }
            try {
                yield this._reconnect();
            }
            catch (err) {
                this._cleanUp();
            }
        });
    }
    /** Partition Awareness methods */
    _affinitySend(opCode, payloadWriter, payloadReader, affinityHint) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = yield this._chooseConnection(affinityHint);
            while (true) {
                Logger_1.default.logDebug('Endpoint chosen: ' + connection.endpoint);
                try {
                    yield connection.sendRequest(opCode, payloadWriter, payloadReader);
                    return;
                }
                catch (err) {
                    if (!(err instanceof Errors_1.LostConnectionError)) {
                        throw err;
                    }
                    Logger_1.default.logDebug(connection.endpoint + ' is unavailable');
                    this._removeConnection(connection);
                    if (this._getAllConnections().length == 0) {
                        throw new Errors_1.LostConnectionError('Cluster is unavailable');
                    }
                }
                connection = this._getRandomConnection();
                Logger_1.default.logDebug('Node has been chosen randomly');
            }
        });
    }
    _chooseConnection(affinityHint) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheId = affinityHint.cacheId;
            if (!this._distributionMap.has(cacheId)) {
                Logger_1.default.logDebug('Distribution map does not have info for the cache ' + cacheId);
                Logger_1.default.logDebug('Node has been chosen randomly');
                // We are not awaiting here in order to not increase latency of requests
                this._getCachePartitions(cacheId);
                return this._getRandomConnection();
            }
            const cacheAffinityMap = this._distributionMap.get(cacheId);
            // node id in cache affinity map is represented by byte array, so we have to convert it to string in order to use
            // as connections map key
            const nodeId = "" + (yield this._determineNodeId(cacheAffinityMap, affinityHint.key, affinityHint.keyType));
            if (nodeId in this._connections) {
                Logger_1.default.logDebug('Node has been chosen by affinity');
                return this._connections[nodeId];
            }
            Logger_1.default.logDebug('Node has been chosen randomly');
            return this._getRandomConnection();
        });
    }
    _determineNodeId(cacheAffinityMap, key, keyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const partitionMap = cacheAffinityMap.partitionMapping;
            if (partitionMap.size == 0) {
                return null;
            }
            const keyAffinityMap = cacheAffinityMap.keyConfig;
            const affinityKeyInfo = yield this._affinityKeyInfo(key, keyType);
            let affinityKey = affinityKeyInfo.key;
            let affinityKeyTypeCode = affinityKeyInfo.typeCode;
            if ('typeId' in affinityKeyInfo && keyAffinityMap.has(affinityKeyInfo.typeId)) {
                const affinityKeyTypeId = keyAffinityMap.get(affinityKeyInfo.typeId);
                if (affinityKey instanceof BinaryObject_1.BinaryObject &&
                    (affinityKey.fields.has(affinityKeyTypeId))) {
                    const field = affinityKey.fields.get(affinityKeyTypeId);
                    affinityKey = yield field.getValue();
                    affinityKeyTypeCode = field.typeCode;
                }
            }
            const keyHash = yield BinaryUtils_1.default.hashCode(affinityKey, this._communicator, affinityKeyTypeCode);
            const partition = PartitionAwarenessUtils_1.RendezvousAffinityFunction.calcPartition(keyHash, partitionMap.size);
            Logger_1.default.logDebug('Partition = ' + partition);
            const nodeId = partitionMap.get(partition);
            Logger_1.default.logDebug('Node ID = ' + nodeId);
            return nodeId;
        });
    }
    _affinityKeyInfo(key, keyType) {
        return __awaiter(this, void 0, void 0, function* () {
            let typeCode = BinaryUtils_1.default.getTypeCode(keyType ? keyType : BinaryUtils_1.default.calcObjectType(key));
            if (typeCode == BinaryUtils_1.default.TYPE_CODE.BINARY_OBJECT) {
                return { 'key': key, 'typeCode': typeCode, 'typeId': key._getTypeId() };
            }
            if (typeCode == BinaryUtils_1.default.TYPE_CODE.COMPLEX_OBJECT) {
                const binObj = yield BinaryObject_1.BinaryObject.fromObject(key, keyType);
                typeCode = BinaryUtils_1.default.TYPE_CODE.BINARY_OBJECT;
                return { 'key': binObj, 'typeCode': typeCode, 'typeId': binObj._getTypeId() };
            }
            return { 'key': key, 'typeCode': typeCode };
        });
    }
    _onAffinityTopologyChange(newVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._versionIsNewer(newVersion)) {
                return;
            }
            Logger_1.default.logDebug('New topology version reported: ' + newVersion);
            this._affinityTopologyVer = newVersion;
            this._distributionMap = new Map();
            this._runBackgroundConnect();
        });
    }
    _getCachePartitions(cacheId) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.default.logDebug('Getting cache partitions info...');
            try {
                yield this.send(BinaryUtils_1.default.OPERATION.CACHE_PARTITIONS, (payload) => __awaiter(this, void 0, void 0, function* () {
                    // We always request partition map for one cache
                    payload.writeInteger(1);
                    payload.writeInteger(cacheId);
                }), this._handleCachePartitions.bind(this));
            }
            catch (err) {
                Logger_1.default.logDebug('Could not get partitions info: ' + err.message);
            }
        });
    }
    _handleCachePartitions(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const affinityTopologyVer = new PartitionAwarenessUtils_1.AffinityTopologyVersion(payload);
            Logger_1.default.logDebug('Partitions info for topology version ' + affinityTopologyVer);
            if (this._versionIsNewer(affinityTopologyVer)) {
                this._distributionMap = new Map();
                this._affinityTopologyVer = affinityTopologyVer;
                Logger_1.default.logDebug('New affinity topology version: ' + affinityTopologyVer);
            }
            else if (this._versionIsOlder(affinityTopologyVer)) {
                Logger_1.default.logDebug('Topology version is outdated. Actual version: ' + this._affinityTopologyVer);
                return;
            }
            const groupsNum = payload.readInteger();
            Logger_1.default.logDebug('Partitions info for ' + groupsNum + ' cache groups received');
            for (let i = 0; i < groupsNum; i++) {
                const group = yield PartitionAwarenessUtils_1.PartitionAwarenessCacheGroup.build(this._communicator, payload);
                // {partition -> nodeId}
                const partitionMapping = new Map();
                for (const [nodeId, partitions] of group.partitionMap) {
                    for (const partition of partitions) {
                        partitionMapping.set(partition, nodeId);
                    }
                }
                for (const [cacheId, config] of group.caches) {
                    const cacheAffinityMap = new PartitionAwarenessUtils_1.CacheAffinityMap(cacheId, partitionMapping, config);
                    this._distributionMap.set(cacheId, cacheAffinityMap);
                    Logger_1.default.logDebug('Partitions info for cache: ' + cacheId);
                }
            }
            Logger_1.default.logDebug('Got cache partitions info');
        });
    }
    _getRandomConnection() {
        const allConnections = this._getAllConnections();
        return allConnections[this._getRandomInt(allConnections.length)];
    }
    _changeState(state, reason = null) {
        if (Logger_1.default.debug) {
            Logger_1.default.logDebug(Util.format('Router state: %s -> %s'), this._getState(this._state), this._getState(state));
        }
        if (this._state !== state) {
            this._state = state;
            if (this._onStateChanged) {
                this._onStateChanged(state, reason);
            }
        }
    }
    _getState(state) {
        switch (state) {
            case IgniteClient_1.IgniteClient.STATE.DISCONNECTED:
                return 'DISCONNECTED';
            case IgniteClient_1.IgniteClient.STATE.CONNECTING:
                return 'CONNECTING';
            case IgniteClient_1.IgniteClient.STATE.CONNECTED:
                return 'CONNECTED';
            default:
                return 'UNKNOWN';
        }
    }
    _versionIsNewer(version) {
        return this._affinityTopologyVer === null ||
            this._affinityTopologyVer.compareTo(version) < 0;
    }
    _versionIsOlder(version) {
        return this._affinityTopologyVer !== null &&
            this._affinityTopologyVer.compareTo(version) > 0;
    }
    // Returns a random integer between 0 and max - 1
    _getRandomInt(max) {
        if (max === 0) {
            return 0;
        }
        return Math.floor(Math.random() * max);
    }
    _sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map