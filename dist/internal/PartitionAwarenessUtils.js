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
exports.RendezvousAffinityFunction = exports.CacheAffinityMap = exports.PartitionAwarenessCacheGroup = exports.AffinityTopologyVersion = void 0;
const Util = require("util");
const BinaryUtils_1 = require("./BinaryUtils");
class AffinityTopologyVersion {
    constructor(payload) {
        this._major = payload.readLong();
        this._minor = payload.readInteger();
    }
    compareTo(other) {
        let diff = this._major - other._major;
        if (diff !== 0) {
            return diff;
        }
        return this._minor - other._minor;
    }
    equals(other) {
        return this.compareTo(other) === 0;
    }
    toString() {
        return Util.format('%d.%d', this._major, this._minor);
    }
}
exports.AffinityTopologyVersion = AffinityTopologyVersion;
class PartitionAwarenessCacheGroup {
    constructor(caches, partitionMap) {
        this._caches = caches;
        this._partitionMap = partitionMap;
    }
    static build(communicator, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const applicable = payload.readBoolean();
            const cachesNum = payload.readInteger();
            const caches = new Array(cachesNum);
            for (let i = 0; i < cachesNum; i++) {
                const cacheId = payload.readInteger();
                if (!applicable) {
                    caches[i] = [cacheId, new Map()];
                    continue;
                }
                caches[i] = [cacheId, this._readCacheKeyConfig(payload)];
            }
            if (!applicable) {
                return new PartitionAwarenessCacheGroup(caches, []);
            }
            const partitionMap = yield this._readPartitionMap(communicator, payload);
            return new PartitionAwarenessCacheGroup(caches, partitionMap);
        });
    }
    get caches() {
        // Array [[cacheId, cfg]]
        return this._caches;
    }
    get partitionMap() {
        // Array [[nodeId, [partitions]]]
        return this._partitionMap;
    }
    static _readCacheKeyConfig(payload) {
        const configsNum = payload.readInteger();
        // {Key Type ID -> Affinity Key Field ID}
        let configs = new Map();
        if (configsNum > 0) {
            for (let i = 0; i < configsNum; i++) {
                const keyTypeId = payload.readInteger();
                const affinityKeyFieldId = payload.readInteger();
                configs.set(keyTypeId, affinityKeyFieldId);
            }
        }
        return configs;
    }
    static _readPartitionMap(communicator, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const partitionMapSize = payload.readInteger();
            // [[nodeId, [partitions]]]
            const partitionMap = new Array(partitionMapSize);
            for (let i = 0; i < partitionMapSize; i++) {
                const nodeId = yield communicator.readObject(payload, BinaryUtils_1.default.TYPE_CODE.UUID);
                const partitionsNum = payload.readInteger();
                const partitions = new Array(partitionsNum);
                for (let j = 0; j < partitionsNum; j++) {
                    partitions[j] = payload.readInteger();
                }
                partitionMap[i] = [nodeId, partitions];
            }
            return partitionMap;
        });
    }
}
exports.PartitionAwarenessCacheGroup = PartitionAwarenessCacheGroup;
class CacheAffinityMap {
    constructor(cacheId, partitionMapping, keyConfig) {
        this._cacheId = cacheId;
        this._partitionMapping = partitionMapping;
        this._keyConfig = keyConfig;
    }
    get cacheId() {
        return this._cacheId;
    }
    get partitionMapping() {
        return this._partitionMapping;
    }
    get keyConfig() {
        return this._keyConfig;
    }
}
exports.CacheAffinityMap = CacheAffinityMap;
class RendezvousAffinityFunction {
    static calcPartition(keyHash, partitionsNum) {
        const mask = (partitionsNum & (partitionsNum - 1)) == 0 ? partitionsNum - 1 : -1;
        if (mask >= 0) {
            return (keyHash ^ (keyHash >> 16)) & mask;
        }
        return Math.abs(keyHash % partitionsNum);
    }
}
exports.RendezvousAffinityFunction = RendezvousAffinityFunction;
//# sourceMappingURL=PartitionAwarenessUtils.js.map