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
exports.ScanQuery = exports.SqlFieldsQuery = exports.STATEMENT_TYPE = exports.SqlQuery = void 0;
const Util = require("util");
const Cursor_1 = require("./Cursor");
const ArgumentChecker_1 = require("./internal/ArgumentChecker");
const BinaryCommunicator_1 = require("./internal/BinaryCommunicator");
const BinaryUtils_1 = require("./internal/BinaryUtils");
const PAGE_SIZE_DEFAULT = 1024;
const DeprecateSetLocal = Util.deprecate(() => { }, "Query.setLocal is deprecated. It will be removed in later versions.");
/**
 * Base class representing an Ignite SQL or Scan query.
 *
 * The class has no public constructor. Only subclasses may be instantiated.
 *
 * @hideconstructor
 */
class Query {
    /** Private methods */
    /**
     * @ignore
     */
    constructor(operation) {
        this._operation = operation;
        this._local = false;
        this._pageSize = PAGE_SIZE_DEFAULT;
    }
    /**
     * Set local query flag.
     *
     * @param {boolean} local - local query flag: true or false.
     *
     * @return {Query} - the same instance of the Query.
     */
    setLocal(local) {
        DeprecateSetLocal();
        this._local = local;
        return this;
    }
    /**
     * Set {@link Cursor} page size.
     *
     * @param {number} pageSize - cursor page size.
     *
     * @return {Query} - the same instance of the Query.
     */
    setPageSize(pageSize) {
        this._pageSize = pageSize;
        return this;
    }
}
/**
 * Class representing an SQL query which returns the whole cache entries (key-value pairs).
 * @extends Query
 */
class SqlQuery extends Query {
    /**
     * Public constructor.
     *
     * Requires name of a type (or SQL table) and SQL query string to be specified.
     * Other SQL query settings have the following defaults:
     * <pre>
     *     SQL Query setting         :    Default value
     *     Local query flag          :    false
     *     Cursor page size          :    1024
     *     Query arguments           :    not specified
     *     Distributed joins flag    :    false
     *     Replicated only flag      :    false
     *     Timeout                   :    0 (disabled)
     * </pre>
     * Every setting may be changed using set methods.
     *
     * @param {string} type - name of a type or SQL table.
     * @param {string} sql - SQL query string.
     *
     * @return {SqlQuery} - new SqlQuery instance.
     */
    constructor(type, sql) {
        super(BinaryUtils_1.default.OPERATION.QUERY_SQL);
        this.setType(type);
        this.setSql(sql);
        this._args = null;
        this._argTypes = null;
        this._distributedJoins = false;
        this._replicatedOnly = false;
        this._timeout = 0;
    }
    /**
     * Set name of a type or SQL table.
     *
     * @param {string} type - name of a type or SQL table.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setType(type) {
        if (this instanceof SqlFieldsQuery) {
            ArgumentChecker_1.default.invalidArgument(type, 'type', SqlFieldsQuery);
        }
        else {
            ArgumentChecker_1.default.notNull(type, 'type');
        }
        this._type = type;
        return this;
    }
    /**
     * Set SQL query string.
     *
     * @param {string} sql - SQL query string.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setSql(sql) {
        ArgumentChecker_1.default.notNull(sql, 'sql');
        this._sql = sql;
        return this;
    }
    /**
     * Set query arguments.
     *
     * Type of any argument may be specified using setArgTypes() method.
     * If type of an argument is not specified then during operations the Ignite client
     * will try to make automatic mapping between JavaScript types and Ignite object types -
     * according to the mapping table defined in the description of the {@link ObjectType} class.
     *
     * @param {...*} args - Query arguments.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setArgs(...args) {
        this._args = args;
        return this;
    }
    /**
     * Specifies types of query arguments.
     *
     * Query arguments itself are set using setArgs() method.
     * By default, a type of every argument is not specified that means during operations the Ignite client
     * will try to make automatic mapping between JavaScript types and Ignite object types -
     * according to the mapping table defined in the description of the {@link ObjectType} class.
     *
     * @param {...ObjectType.PRIMITIVE_TYPE | CompositeType} argTypes - types of Query arguments.
     *   The order of types must follow the order of arguments in the setArgs() method.
     *   A type of every argument can be:
     *   - either a type code of primitive (simple) type
     *   - or an instance of class representing non-primitive (composite) type
     *   - or null (means the type is not specified)
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setArgTypes(...argTypes) {
        this._argTypes = argTypes;
        return this;
    }
    /**
     * Set distributed joins flag.
     *
     * @param {boolean} distributedJoins - distributed joins flag: true or false.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setDistributedJoins(distributedJoins) {
        this._distributedJoins = distributedJoins;
        return this;
    }
    /**
     * Set replicated only flag.
     *
     * @param {boolean} replicatedOnly - replicated only flag: true or false.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setReplicatedOnly(replicatedOnly) {
        this._replicatedOnly = replicatedOnly;
        return this;
    }
    /**
     * Set timeout.
     *
     * @param {number} timeout - timeout value in milliseconds.
     *   Must be non-negative. Zero value disables timeout.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setTimeout(timeout) {
        this._timeout = timeout;
        return this;
    }
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            BinaryCommunicator_1.default.writeString(buffer, this._type);
            BinaryCommunicator_1.default.writeString(buffer, this._sql);
            yield this._writeArgs(communicator, buffer);
            buffer.writeBoolean(this._distributedJoins);
            buffer.writeBoolean(this._local);
            buffer.writeBoolean(this._replicatedOnly);
            buffer.writeInteger(this._pageSize);
            buffer.writeLong(this._timeout);
        });
    }
    /**
     * @ignore
     */
    _writeArgs(communicator, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const argsLength = this._args ? this._args.length : 0;
            buffer.writeInteger(argsLength);
            if (argsLength > 0) {
                let argType;
                for (let i = 0; i < argsLength; i++) {
                    argType = this._argTypes && i < this._argTypes.length ? this._argTypes[i] : null;
                    yield communicator.writeObject(buffer, this._args[i], argType);
                }
            }
        });
    }
    /**
     * @ignore
     */
    _getCursor(communicator, payload, keyType = null, valueType = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const cursor = new Cursor_1.Cursor(communicator, BinaryUtils_1.default.OPERATION.QUERY_SQL_CURSOR_GET_PAGE, payload, keyType, valueType);
            cursor._readId(payload);
            return cursor;
        });
    }
}
exports.SqlQuery = SqlQuery;
/**
 * Statement type of SQL Fields query.
 * @typedef SqlFieldsQuery.STATEMENT_TYPE
 * @enum
 * @readonly
 * @property ANY 0
 * @property SELECT 1
 * @property UPDATE 2
 */
var STATEMENT_TYPE;
(function (STATEMENT_TYPE) {
    STATEMENT_TYPE[STATEMENT_TYPE["ANY"] = 0] = "ANY";
    STATEMENT_TYPE[STATEMENT_TYPE["SELECT"] = 1] = "SELECT";
    STATEMENT_TYPE[STATEMENT_TYPE["UPDATE"] = 2] = "UPDATE";
})(STATEMENT_TYPE = exports.STATEMENT_TYPE || (exports.STATEMENT_TYPE = {}));
/**
 * Class representing an SQL Fields query.
 * @extends SqlQuery
 */
class SqlFieldsQuery extends SqlQuery {
    /**
     * Public constructor.
     *
     * Requires SQL query string to be specified.
     * Other SQL Fields query settings have the following defaults:
     * <pre>
     *     SQL Fields Query setting  :    Default value
     *     Local query flag          :    false
     *     Cursor page size          :    1024
     *     Query arguments           :    not specified
     *     Distributed joins flag    :    false
     *     Replicated only flag      :    false
     *     Timeout                   :    0 (disabled)
     *     Schema for the query      :    not specified
     *     Max rows                  :    -1
     *     Statement type            :    STATEMENT_TYPE.ANY
     *     Enforce join order flag   :    false
     *     Collocated flag           :    false
     *     Lazy query execution flag :    false
     *     Include field names flag  :    false
     * </pre>
     * Every setting may be changed using set methods.
     *
     * @param {string} sql - SQL query string.
     *
     * @return {SqlFieldsQuery} - new SqlFieldsQuery instance.
     */
    constructor(sql) {
        super(null, sql);
        this._operation = BinaryUtils_1.OPERATION.QUERY_SQL_FIELDS;
        this._schema = null;
        this._maxRows = -1;
        this._statementType = STATEMENT_TYPE.ANY;
        this._enforceJoinOrder = false;
        this._collocated = false;
        this._lazy = false;
        this._includeFieldNames = false;
    }
    static get STATEMENT_TYPE() {
        return STATEMENT_TYPE;
    }
    /**
     * Set schema for the query.
     *
     * @param {string} schema - schema for the query.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setSchema(schema) {
        this._schema = schema;
        return this;
    }
    /**
     * Set max rows.
     *
     * @param {number} maxRows - max rows.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setMaxRows(maxRows) {
        this._maxRows = maxRows;
        return this;
    }
    /**
     * Set statement type.
     *
     * @param {STATEMENT_TYPE} type - statement type.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setStatementType(type) {
        this._statementType = type;
        return this;
    }
    /**
     * Set enforce join order flag.
     *
     * @param {boolean} enforceJoinOrder - enforce join order flag: true or false.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setEnforceJoinOrder(enforceJoinOrder) {
        this._enforceJoinOrder = enforceJoinOrder;
        return this;
    }
    /**
     * Set collocated flag.
     *
     * @param {boolean} collocated - collocated flag: true or false.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setCollocated(collocated) {
        this._collocated = collocated;
        return this;
    }
    /**
     * Set lazy query execution flag.
     *
     * @param {boolean} lazy - lazy query execution flag: true or false.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setLazy(lazy) {
        this._lazy = lazy;
        return this;
    }
    /**
     * Set include field names flag.
     *
     * @param {boolean} includeFieldNames - include field names flag: true or false.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setIncludeFieldNames(includeFieldNames) {
        this._includeFieldNames = includeFieldNames;
        return this;
    }
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            BinaryCommunicator_1.default.writeString(buffer, this._schema);
            buffer.writeInteger(this._pageSize);
            buffer.writeInteger(this._maxRows);
            BinaryCommunicator_1.default.writeString(buffer, this._sql);
            yield this._writeArgs(communicator, buffer);
            buffer.writeByte(this._statementType);
            buffer.writeBoolean(this._distributedJoins);
            buffer.writeBoolean(this._local);
            buffer.writeBoolean(this._replicatedOnly);
            buffer.writeBoolean(this._enforceJoinOrder);
            buffer.writeBoolean(this._collocated);
            buffer.writeBoolean(this._lazy);
            buffer.writeLong(this._timeout);
            buffer.writeBoolean(this._includeFieldNames);
        });
    }
    // noinspection JSAnnotator
    /**
     * @ignore
     */
    // @ts-ignore
    _getCursor(communicator, payload, keyType = null, valueType = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const cursor = new Cursor_1.SqlFieldsCursor(communicator, payload);
            yield cursor._readFieldNames(payload, this._includeFieldNames);
            return cursor;
        });
    }
}
exports.SqlFieldsQuery = SqlFieldsQuery;
/**
 * Class representing a Scan query which returns the whole cache entries (key-value pairs).
 *
 * This version of the class does not support a possibility to specify a Filter object for the query.
 * The query returns all entries from the entire cache or from the specified partition.
 * @extends Query
 */
class ScanQuery extends Query {
    /**
     * Public constructor.
     *
     * Scan query settings have the following defaults:
     * <pre>
     *     Scan Query setting        :    Default value
     *     Local query flag          :    false
     *     Cursor page size          :    1024
     *     Partition number          :    -1 (entire cache)
     *     Filter object             :    null (not supported)
     * </pre>
     * Every setting (except Filter object) may be changed using set methods.
     *
     * @return {ScanQuery} - new ScanQuery instance.
     */
    constructor() {
        super(BinaryUtils_1.OPERATION.QUERY_SCAN);
        this._partitionNumber = -1;
    }
    /**
     * Sets a partition number over which this query should iterate.
     *
     * If negative, the query will iterate over all partitions in the cache.
     *
     * @param {number} partitionNumber - partition number over which this query should iterate.
     *
     * @return {ScanQuery} - the same instance of the ScanQuery.
     */
    setPartitionNumber(partitionNumber) {
        this._partitionNumber = partitionNumber;
        return this;
    }
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            // filter
            yield communicator.writeObject(buffer, null);
            buffer.writeInteger(this._pageSize);
            buffer.writeInteger(this._partitionNumber);
            buffer.writeBoolean(this._local);
        });
    }
    /**
     * @ignore
     */
    _getCursor(communicator, payload, keyType = null, valueType = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const cursor = new Cursor_1.Cursor(communicator, BinaryUtils_1.OPERATION.QUERY_SCAN_CURSOR_GET_PAGE, payload, keyType, valueType);
            cursor._readId(payload);
            return cursor;
        });
    }
}
exports.ScanQuery = ScanQuery;
//# sourceMappingURL=Query.js.map