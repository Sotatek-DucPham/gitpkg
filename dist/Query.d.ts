import { BaseCursor, Cursor } from "./Cursor";
import BinaryCommunicator from "./internal/BinaryCommunicator";
import { OPERATION } from "./internal/BinaryUtils";
import { CompositeType } from "./ObjectType";
import { PRIMITIVE_TYPE } from "./internal/Constants";
import MessageBuffer from "./internal/MessageBuffer";
import { CacheEntry } from "./CacheClient";
/**
 * Base class representing an Ignite SQL or Scan query.
 *
 * The class has no public constructor. Only subclasses may be instantiated.
 *
 * @hideconstructor
 */
declare abstract class Query<T> {
    protected _local: boolean;
    protected _pageSize: number;
    protected _operation: OPERATION;
    /**
     * Set local query flag.
     *
     * @param {boolean} local - local query flag: true or false.
     *
     * @return {Query} - the same instance of the Query.
     */
    setLocal(local: boolean): Query<T>;
    /**
     * Set {@link Cursor} page size.
     *
     * @param {number} pageSize - cursor page size.
     *
     * @return {Query} - the same instance of the Query.
     */
    setPageSize(pageSize: number): Query<T>;
    /** Private methods */
    /**
     * @ignore
     */
    constructor(operation: OPERATION);
    abstract _getCursor(communicator: any, payload: any, keyType: any, valueType: any): Promise<BaseCursor<T>>;
}
/**
 * Class representing an SQL query which returns the whole cache entries (key-value pairs).
 * @extends Query
 */
export declare class SqlQuery extends Query<CacheEntry> {
    private _type;
    protected _sql: string;
    private _argTypes;
    protected _distributedJoins: boolean;
    protected _replicatedOnly: boolean;
    protected _timeout: number;
    private _args;
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
    constructor(type: string, sql: string);
    /**
     * Set name of a type or SQL table.
     *
     * @param {string} type - name of a type or SQL table.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setType(type: string): SqlQuery;
    /**
     * Set SQL query string.
     *
     * @param {string} sql - SQL query string.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setSql(sql: string): SqlQuery;
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
    setArgs(...args: object[]): SqlQuery;
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
    setArgTypes(...argTypes: (PRIMITIVE_TYPE | CompositeType)[]): SqlQuery;
    /**
     * Set distributed joins flag.
     *
     * @param {boolean} distributedJoins - distributed joins flag: true or false.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setDistributedJoins(distributedJoins: boolean): SqlQuery;
    /**
     * Set replicated only flag.
     *
     * @param {boolean} replicatedOnly - replicated only flag: true or false.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setReplicatedOnly(replicatedOnly: boolean): SqlQuery;
    /**
     * Set timeout.
     *
     * @param {number} timeout - timeout value in milliseconds.
     *   Must be non-negative. Zero value disables timeout.
     *
     * @return {SqlQuery} - the same instance of the SqlQuery.
     */
    setTimeout(timeout: number): SqlQuery;
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator: BinaryCommunicator, buffer: MessageBuffer): Promise<void>;
    /**
     * @ignore
     */
    _writeArgs(communicator: BinaryCommunicator, buffer: MessageBuffer): Promise<void>;
    /**
     * @ignore
     */
    _getCursor(communicator: any, payload: any, keyType?: any, valueType?: any): Promise<BaseCursor<CacheEntry>>;
}
/**
 * Statement type of SQL Fields query.
 * @typedef SqlFieldsQuery.STATEMENT_TYPE
 * @enum
 * @readonly
 * @property ANY 0
 * @property SELECT 1
 * @property UPDATE 2
 */
export declare enum STATEMENT_TYPE {
    ANY = 0,
    SELECT = 1,
    UPDATE = 2
}
/**
 * Class representing an SQL Fields query.
 * @extends SqlQuery
 */
export declare class SqlFieldsQuery extends SqlQuery {
    private _schema;
    private _maxRows;
    private _statementType;
    private _enforceJoinOrder;
    private _collocated;
    private _lazy;
    private _includeFieldNames;
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
    constructor(sql: string);
    static get STATEMENT_TYPE(): typeof STATEMENT_TYPE;
    /**
     * Set schema for the query.
     *
     * @param {string} schema - schema for the query.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setSchema(schema: string): SqlFieldsQuery;
    /**
     * Set max rows.
     *
     * @param {number} maxRows - max rows.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setMaxRows(maxRows: number): SqlFieldsQuery;
    /**
     * Set statement type.
     *
     * @param {STATEMENT_TYPE} type - statement type.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setStatementType(type: STATEMENT_TYPE): SqlFieldsQuery;
    /**
     * Set enforce join order flag.
     *
     * @param {boolean} enforceJoinOrder - enforce join order flag: true or false.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setEnforceJoinOrder(enforceJoinOrder: boolean): SqlFieldsQuery;
    /**
     * Set collocated flag.
     *
     * @param {boolean} collocated - collocated flag: true or false.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setCollocated(collocated: boolean): SqlFieldsQuery;
    /**
     * Set lazy query execution flag.
     *
     * @param {boolean} lazy - lazy query execution flag: true or false.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setLazy(lazy: boolean): SqlFieldsQuery;
    /**
     * Set include field names flag.
     *
     * @param {boolean} includeFieldNames - include field names flag: true or false.
     *
     * @return {SqlFieldsQuery} - the same instance of the SqlFieldsQuery.
     */
    setIncludeFieldNames(includeFieldNames: boolean): SqlFieldsQuery;
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator: any, buffer: any): Promise<void>;
    /**
     * @ignore
     */
    _getCursor(communicator: any, payload: any, keyType?: any, valueType?: any): Promise<BaseCursor<Array<object>>>;
}
/**
 * Class representing a Scan query which returns the whole cache entries (key-value pairs).
 *
 * This version of the class does not support a possibility to specify a Filter object for the query.
 * The query returns all entries from the entire cache or from the specified partition.
 * @extends Query
 */
export declare class ScanQuery extends Query<CacheEntry> {
    private _partitionNumber;
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
    constructor();
    /**
     * Sets a partition number over which this query should iterate.
     *
     * If negative, the query will iterate over all partitions in the cache.
     *
     * @param {number} partitionNumber - partition number over which this query should iterate.
     *
     * @return {ScanQuery} - the same instance of the ScanQuery.
     */
    setPartitionNumber(partitionNumber: number): ScanQuery;
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator: BinaryCommunicator, buffer: MessageBuffer): Promise<void>;
    /**
     * @ignore
     */
    _getCursor(communicator: BinaryCommunicator, payload: any, keyType?: any, valueType?: any): Promise<Cursor>;
}
export {};
//# sourceMappingURL=Query.d.ts.map