import { CompositeType } from "./ObjectType";
import { PRIMITIVE_TYPE } from "./internal/Constants";
/**
 * Class representing Cache Key part of Ignite {@link CacheConfiguration}.
 *
 * All configuration settings are optional and have defaults which are defined on a server side.
 *
 * See Apache Ignite documentation for details of every configuration setting.
 */
export declare class CacheKeyConfiguration {
    private _typeName;
    private _affinityKeyFieldName;
    /**
     * Public constructor.
     *
     * @param {string} [typeName=null] - Type name for which affinity field name is being defined.
     * @param {string} [affinityKeyFieldName=null] - Affinity key field name.
     *
     * @return {CacheKeyConfiguration} - new CacheKeyConfiguration instance.
     */
    constructor(typeName?: string, affinityKeyFieldName?: string);
    /**
     * Sets type name for which affinity field name is being defined.
     *
     * @param {string} typeName - Type name for which affinity field name is being defined.
     *
     * @return {CacheKeyConfiguration} - the same instance of the CacheKeyConfiguration.
     */
    setTypeName(typeName: any): this;
    /**
     * Gets type name for which affinity field name is being defined.
     *
     * @return {string} - Type name for which affinity field name is being defined.
     */
    getTypeName(): string;
    /**
     * Sets affinity key field name.
     *
     * @param {string} affinityKeyFieldName - Affinity key field name.
     *
     * @return {CacheKeyConfiguration} - the same instance of the CacheKeyConfiguration.
     */
    setAffinityKeyFieldName(affinityKeyFieldName: any): this;
    /**
     * Gets affinity key field name.
     *
     * @return {string} - Affinity key field name.
     */
    getAffinityKeyFieldName(): string;
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator: any, buffer: any): Promise<void>;
    /**
     * @ignore
     */
    _read(communicator: any, buffer: any): Promise<void>;
}
/**
 * Class representing one Query Entity element of Ignite {@link CacheConfiguration}.
 *
 * All configuration settings are optional and have defaults which are defined on a server side.
 *
 * See Apache Ignite documentation for details of every configuration setting.
 */
export declare class QueryEntity {
    private _keyTypeName;
    private _valueTypeName;
    private _tableName;
    private _keyFieldName;
    private _valueFieldName;
    private _fields;
    private _aliases;
    private _indexes;
    /**
     * Public constructor.
     *
     * @return {QueryEntity} - new QueryEntity instance.
     */
    constructor();
    /**
     * Sets key type name for this query entity.
     *
     * @param {string} keyTypeName - Key type name.
     *
     * @return {QueryEntity} - the same instance of the QueryEntity.
     */
    setKeyTypeName(keyTypeName: string): this;
    /**
     * Gets key type name for this query entity.
     *
     * @return {string} - Key type name.
     */
    getKeyTypeName(): string;
    /**
     * Sets value type name for this query entity.
     *
     * @param {string} valueTypeName - Value type name.
     *
     * @return {QueryEntity} - the same instance of the QueryEntity.
     */
    setValueTypeName(valueTypeName: string): this;
    /**
     * Gets value type name for this query entity.
     *
     * @return {string} - Value type name.
     */
    getValueTypeName(): string;
    /**
     * Sets table name for this query entity.
     *
     * @param {string} tableName - Table name.
     *
     * @return {QueryEntity} - the same instance of the QueryEntity.
     */
    setTableName(tableName: string): this;
    /**
     * Gets table name for this query entity.
     *
     * @return {string} - Table name.
     */
    getTableName(): string;
    /**
     * Sets key field name.
     *
     * @param {string} keyFieldName - Key name.
     *
     * @return {QueryEntity} - the same instance of the QueryEntity.
     */
    setKeyFieldName(keyFieldName: string): this;
    /**
     * Gets key field name.
     *
     * @return {string} - Key name.
     */
    getKeyFieldName(): string;
    /**
     * Sets value field name.
     *
     * @param {string} valueFieldName - Value name.
     *
     * @return {QueryEntity} - the same instance of the QueryEntity.
     */
    setValueFieldName(valueFieldName: string): this;
    /**
     * Gets value field name.
     *
     * @return {string} - Value name.
     */
    getValueFieldName(): string;
    /**
     * Sets query fields for this query pair. The order of the fields is important as it
     * defines the order of columns returned by the 'select *' queries.
     *
     * @param {Array<QueryField>} fields - Array of query fields.
     *
     * @return {QueryEntity} - the same instance of the QueryEntity.
     */
    setFields(fields: QueryField[]): this;
    /**
     * Gets query fields for this query pair. The order of the fields is
     * defines the order of columns returned by the 'select *' queries.
     *
     * @return {Array<QueryField>} - Array of query fields.
     */
    getFields(): QueryField[];
    /**
     * Sets mapping from a full property name in dot notation to an alias that will be
     * used as SQL column name. Example: {"parent.name" -> "parentName"}.
     *
     * @param {Map<string, string>} aliases - Aliases map.
     *
     * @return {QueryEntity} - the same instance of the QueryEntity.
     */
    setAliases(aliases: Map<string, string>): this;
    /**
     * Gets aliases map.
     *
     * @return {Map<string, string>} - Aliases map.
     */
    getAliases(): Map<string, string>;
    /**
     * Sets a collection of index entities.
     *
     * @param {Array<QueryIndex>} indexes - Collection (array) of index entities.
     *
     * @return {QueryEntity} - the same instance of the QueryEntity.
     */
    setIndexes(indexes: QueryIndex[]): this;
    /**
     * Gets a collection of index entities.
     *
     * @return {Array<QueryIndex>} - Collection (array) of index entities.
     */
    getIndexes(): QueryIndex[];
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator: any, buffer: any): Promise<void>;
    /**
     * @ignore
     */
    _writeAliases(communicator: any, buffer: any): Promise<void>;
    /**
     * @ignore
     */
    _writeSubEntities(communicator: any, buffer: any, entities: any): Promise<void>;
    /**
     * @ignore
     */
    _read(communicator: any, buffer: any): Promise<void>;
    /**
     * @ignore
     */
    _readSubEntities(communicator: any, buffer: any, objectConstructor: any): Promise<any[]>;
    /**
     * @ignore
     */
    _readAliases(communicator: any, buffer: any): Promise<void>;
}
/**
 * Class representing one Query Field element of {@link QueryEntity} of Ignite {@link CacheConfiguration}.
 *
 * All configuration settings are optional and have defaults which are defined on a server side.
 *
 * See Apache Ignite documentation for details of every configuration setting.
 */
export declare class QueryField {
    private _name;
    private _typeName;
    private _isKeyField;
    private _isNotNull;
    private _precision;
    private _scale;
    private _communicator;
    private _buffer;
    private _defaultValue;
    private _valueType;
    private _index;
    /**
     * Public constructor.
     *
     * @param {string} [name=null] - Query field name.
     * @param {string} [typeName=null] - Query field type name.
     *
     * @return {QueryField} - new QueryField instance.
     */
    constructor(name?: string, typeName?: string);
    /**
     * Sets query field name.
     *
     * @param {string} name - Query field name.
     *
     * @return {QueryField} - the same instance of the QueryField.
     */
    setName(name: any): this;
    /**
     * Gets query field name.
     *
     * @return {string} - Query field name.
     */
    getName(): string;
    /**
     * Sets query field type name.
     *
     * @param {string} typeName - Query field type name.
     *
     * @return {QueryField} - the same instance of the QueryField.
     */
    setTypeName(typeName: any): this;
    /**
     * Gets query field type name.
     *
     * @return {string} - Query field type name.
     */
    getTypeName(): string;
    /**
     * Sets if it is a key query field or not.
     *
     * @param {boolean} isKeyField - True to make this query field a key field. False otherwise.
     *
     * @return {QueryField} - the same instance of the QueryField.
     */
    setIsKeyField(isKeyField: any): this;
    /**
     * Gets if it is a key query field or not.
     *
     * @return {boolean} - True if this query field is a key field. False otherwise.
     */
    getIsKeyField(): boolean;
    /**
     * Sets if this query field must be checked for null.
     *
     * @param {boolean} isNotNull - True if this query field must be checked for null. False otherwise.
     *
     * @return {QueryField} - the same instance of the QueryField.
     */
    setIsNotNull(isNotNull: any): this;
    /**
     * Gets if this query field must be checked for null.
     *
     * @return {boolean} - True if this query field must be checked for null. False otherwise.
     */
    getIsNotNull(): boolean;
    /**
     * Sets query field default value.
     *
     * @param {*} defaultValue - Query field default value.
     * @param {PRIMITIVE_TYPE | CompositeType} [valueType=null] - type of the default value:
     *   - either a type code of primitive (simple) type
     *   - or an instance of class representing non-primitive (composite) type
     *   - or null (or not specified) that means the type is not specified
     *
     * @return {QueryField} - the same instance of the QueryField.
     */
    setDefaultValue(defaultValue: object, valueType?: PRIMITIVE_TYPE | CompositeType): this;
    /**
     * Gets query field default value.
     *
     * @param {ObjectType.PRIMITIVE_TYPE | CompositeType} [valueType=null] - type of the default value:
     *   - either a type code of primitive (simple) type
     *   - or an instance of class representing non-primitive (composite) type
     *   - or null (or not specified) that means the type is not specified
     *
     * @async
     *
     * @return {*} - Query field default value.
     */
    getDefaultValue(valueType?: any): Promise<any>;
    /**
     * Sets query field precision.
     *
     * @param {number} precision - Query field precision.
     *
     * @return {QueryField} - the same instance of the QueryField.
     */
    setPrecision(precision: any): this;
    /**
     * Gets query field precision.
     *
     * @return {number} - Query field precision.
     */
    getPrecision(): number;
    /**
     * Sets query field scale.
     *
     * @param {number} scale - Query field scale.
     *
     * @return {QueryField} - the same instance of the QueryField.
     */
    setScale(scale: any): this;
    /**
     * Gets query field scale.
     *
     * @return {number} - Query field scale.
     */
    getScale(): number;
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator: any, buffer: any): Promise<void>;
    /**
     * @ignore
     */
    _read(communicator: any, buffer: any): Promise<void>;
}
/**
 *
 * @typedef QueryIndex.INDEX_TYPE
 * @enum
 * @readonly
 * @property SORTED 0
 * @property FULLTEXT 1
 * @property GEOSPATIAL 2
 */
export declare enum INDEX_TYPE {
    SORTED = 0,
    FULLTEXT = 1,
    GEOSPATIAL = 2
}
/**
 * Class representing one Query Index element of {@link QueryEntity} of Ignite {@link CacheConfiguration}.
 *
 * All configuration settings are optional and have defaults which are defined on a server side.
 *
 * See Apache Ignite documentation for details of every configuration setting.
 */
export declare class QueryIndex {
    private _name;
    private _inlineSize;
    private _type;
    private _fields;
    /**
     * Public constructor.
     *
     * @param {string} [name=null] - Query index name.
     * @param {string} type - Query index type name.
     *
     * @return {QueryIndex} - new QueryIndex instance.
     */
    constructor(name?: string, type?: INDEX_TYPE);
    static get INDEX_TYPE(): typeof INDEX_TYPE;
    /**
     * Sets query index name. Will be automatically set if not provided by a user.
     *
     * @param {string} name - Query index name.
     *
     * @return {QueryIndex} - the same instance of the QueryIndex.
     */
    setName(name: any): this;
    /**
     * Gets query index name.
     *
     * @return {string} - Query index name.
     */
    getName(): string;
    /**
     * Sets query index type.
     *
     * @param {INDEX_TYPE} type - Query index type.
     *
     * @return {QueryIndex} - the same instance of the QueryIndex.
     *
     * @throws {IgniteClientError} if error.
     */
    setType(type: INDEX_TYPE): QueryIndex;
    /**
     * Gets query index type.
     *
     * @return {QueryIndex.INDEX_TYPE} - Query index type.
     */
    getType(): INDEX_TYPE;
    /**
     * Sets index inline size in bytes. When enabled, a part of the indexed value is placed directly
     * to the index pages, thus minimizing data page accesses and increasing query performance. Allowed values:
     *   - -1 (default) - determine inline size automatically (see below)
     *   - 0 - index inline is disabled (not recommended)
     *   - positive value - fixed index inline
     *
     * When set to -1, Ignite will try to detect inline size automatically. It will be no more than
     * CacheConfiguration.getSqlIndexInlineMaxSize(). Index inline will be enabled for all fixed-length types,
     * but will not be enabled for String.
     *
     * @param {number} inlineSize - Index inline size in bytes.
     *
     * @return {QueryIndex} - the same instance of the QueryIndex.
     */
    setInlineSize(inlineSize: any): this;
    /**
     * Gets index inline size in bytes.
     *
     * @return {number} - Index inline size in bytes.
     */
    getInlineSize(): number;
    /**
     * Sets fields included in the index.
     *
     * @param {Map<string, boolean>} fields - Map of the index fields.
     *
     * @return {QueryIndex} - the same instance of the QueryIndex.
     */
    setFields(fields: Map<string, boolean>): QueryIndex;
    /**
     * Gets fields included in the index.
     *
     * @return {Map<string, boolean>} - Map of the index fields.
     */
    getFields(): Map<string, boolean>;
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator: any, buffer: any): Promise<void>;
    /**
     * @ignore
     */
    _read(communicator: any, buffer: any): Promise<void>;
}
/**
 * Class representing Ignite cache configuration on a server.
 *
 * All configuration settings are optional and have defaults which are defined on a server side.
 *
 * See Apache Ignite documentation for details of every configuration setting.
 */
export declare class CacheConfiguration {
    private _properties;
    /**
     * Public constructor.
     *
     * @return {CacheConfiguration} - new CacheConfiguration instance.
     */
    constructor();
    static get CACHE_ATOMICITY_MODE(): Readonly<{
        TRANSACTIONAL: number;
        ATOMIC: number;
    }>;
    static get CACHE_MODE(): Readonly<{
        LOCAL: number;
        REPLICATED: number;
        PARTITIONED: number;
    }>;
    static get PARTITION_LOSS_POLICY(): Readonly<{
        READ_ONLY_SAFE: number;
        READ_ONLY_ALL: number;
        READ_WRITE_SAFE: number;
        READ_WRITE_ALL: number;
        IGNORE: number;
    }>;
    static get REABALANCE_MODE(): Readonly<{
        SYNC: number;
        ASYNC: number;
        NONE: number;
    }>;
    static get WRITE_SYNCHRONIZATION_MODE(): Readonly<{
        FULL_SYNC: number;
        FULL_ASYNC: number;
        PRIMARY_SYNC: number;
    }>;
    /**
     * Sets cache atomicity mode.
     *
     * @param {CacheConfiguration.CACHE_ATOMICITY_MODE} atomicityMode - Cache atomicity mode.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     *
     * @throws {IgniteClientError} if error.
     */
    setAtomicityMode(atomicityMode: any): this;
    /**
     * Gets cache atomicity mode.
     *
     * @return {CacheConfiguration.CACHE_ATOMICITY_MODE} - Cache atomicity mode.
     */
    getAtomicityMode(): object;
    /**
     * Sets number of nodes used to back up single partition for {@link CacheConfiguration.CACHE_MODE}.PARTITIONED cache.
     *
     * @param {number} backups - Number of backup nodes for one partition.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setBackups(backups: any): this;
    /**
     * Gets number of nodes used to back up single partition for {@link CacheConfiguration.CACHE_MODE}.PARTITIONED cache.
     *
     * @return {number} - Number of backup nodes for one partition.
     */
    getBackups(): object;
    /**
     * Sets caching mode.
     *
     * @param {CacheConfiguration.CACHE_MODE} cacheMode - Caching mode.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     *
     * @throws {IgniteClientError} if error.
     */
    setCacheMode(cacheMode: any): this;
    /**
     * Gets caching mode.
     *
     * @return {CacheConfiguration.CACHE_MODE} - Caching mode.
     */
    getCacheMode(): object;
    /**
     * Sets the flag indicating whether a copy of the value stored in the on-heap cache
     * should be created for a cache operation return the value. Also, if this flag
     * is set, copies are created for values passed to CacheInterceptor and to CacheEntryProcessor.
     * If the on-heap cache is disabled then this flag is of no use.
     *
     * @param {boolean} copyOnRead - Copy on read flag.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setCopyOnRead(copyOnRead: any): this;
    /**
     * Gets copy on read flag.
     *
     * @return {boolean} - Copy on read flag.
     */
    getCopyOnRead(): object;
    /**
     * Sets a name of DataRegionConfiguration for this cache.
     *
     * @param {string} dataRegionName - DataRegionConfiguration name. Can be null
     *  (default DataRegionConfiguration will be used) but should not be empty.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setDataRegionName(dataRegionName: any): this;
    /**
     * Gets the name of DataRegionConfiguration for this cache.
     *
     * @return {string} - DataRegionConfiguration name.
     */
    getDataRegionName(): object;
    /**
     * Sets eager ttl flag. If there is at least one cache configured with this flag set to true,
     * Ignite will create a single thread to clean up expired entries in background.
     * When flag is set to false, expired entries will be removed on next entry access.
     *
     * @param {boolean} eagerTtl - True if Ignite should eagerly remove expired cache entries.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setEagerTtl(eagerTtl: any): this;
    /**
     * Gets eager ttl flag. If there is at least one cache configured with this flag set to true,
     * Ignite will create a single thread to clean up expired entries in background.
     * When flag is set to false, expired entries will be removed on next entry access.
     *
     * @return {boolean} - Flag indicating whether Ignite will eagerly remove expired entries.
     */
    getEagerTtl(): object;
    /**
     * Enables or disables statistics for this cache.
     *
     * @param {boolean} statisticsEnabled - True to enable, false to disable.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setStatisticsEnabled(statisticsEnabled: any): this;
    /**
     * Gets if statistics are enabled for this cache.
     *
     * @return {boolean} - True if enabled, false if disabled.
     */
    getStatisticsEnabled(): object;
    /**
     * Sets the cache group name. Caches with the same group name share single underlying 'physical' cache
     * (partition set), but are logically isolated. Grouping caches reduces overall overhead, since
     * internal data structures are shared.
     *
     * @param {string} groupName - Cache group name.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setGroupName(groupName: any): this;
    /**
     * Gets the cache group name.
     *
     * @return {string} - Cache group name.
     */
    getGroupName(): object;
    /**
     * Sets default lock timeout in milliseconds.
     *
     * @param {number} lockTimeout - Default lock timeout.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setDefaultLockTimeout(lockTimeout: any): this;
    /**
     * Gets default lock acquisition timeout.
     *
     * @return {number} - Default lock timeout.
     */
    getDefaultLockTimeout(): object;
    /**
     * Sets maximum number of allowed concurrent asynchronous operations. 0 - the number of concurrent asynchronous
     * operations is unlimited.
     *
     * @param {number} maxConcurrentAsyncOperations - Maximum number of concurrent asynchronous operations.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setMaxConcurrentAsyncOperations(maxConcurrentAsyncOperations: any): this;
    /**
     * Gets maximum number of allowed concurrent asynchronous operations.
     * If 0 returned then number of concurrent asynchronous operations is unlimited.
     *
     * @return {number} - Maximum number of concurrent asynchronous operations or 0 if unlimited.
     */
    getMaxConcurrentAsyncOperations(): object;
    /**
     * Sets maximum number of query iterators that can be stored. Iterators are stored to support query
     * pagination when each page of data is sent to user's node only on demand. Increase this property
     * if you are running and processing lots of queries in parallel.
     *
     * @param {number} maxQueryIterators - Maximum number of query iterators that can be stored.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setMaxQueryIterators(maxQueryIterators: any): this;
    /**
     * Gets maximum number of query iterators that can be stored.
     *
     * @return {number} - Maximum number of query iterators that can be stored.
     */
    getMaxQueryIterators(): object;
    /**
     * Enables/disables on-heap cache for the off-heap based page memory.
     *
     * @param {boolean} isOnheapCacheEnabled - On-heap cache enabled flag.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setIsOnheapCacheEnabled(isOnheapCacheEnabled: any): this;
    /**
     * Checks if the on-heap cache is enabled for the off-heap based page memory.
     *
     * @return {boolean} - On-heap cache enabled flag.
     */
    getIsOnheapCacheEnabled(): object;
    /**
     * Sets partition loss policy. This policy defines how Ignite will react to a situation when
     * all nodes for some partition leave the cluster.
     *
     * @param {CacheConfiguration.PARTITION_LOSS_POLICY} partitionLossPolicy - Partition loss policy.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     *
     * @throws {IgniteClientError} if error.
     */
    setPartitionLossPolicy(partitionLossPolicy: any): this;
    /**
     * Gets partition loss policy. This policy defines how Ignite will react to a situation when
     * all nodes for some partition leave the cluster.
     *
     * @return {CacheConfiguration.PARTITION_LOSS_POLICY} - Partition loss policy.
     */
    getPartitionLossPolicy(): object;
    /**
     * Sets size of queries detail metrics that will be stored in memory for monitoring purposes.
     * If 0, then history will not be collected. Note, larger number may lead to higher memory consumption.
     *
     * @param {number} queryDetailMetricsSize - Maximum number of latest queries metrics that will be stored in memory.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setQueryDetailMetricsSize(queryDetailMetricsSize: any): this;
    /**
     * Gets size of queries detail metrics that will be stored in memory for monitoring purposes.
     * If 0, then history will not be collected. Note, larger number may lead to higher memory consumption.
     *
     * @return {number} - Maximum number of query metrics that will be stored in memory.
     */
    getQueryDetailMetricsSize(): object;
    /**
     * Defines a hint to query execution engine on desired degree of parallelism within a single node.
     * Query executor may or may not use this hint depending on estimated query costs.
     * Query executor may define certain restrictions on parallelism depending on query type and/or cache type.
     *
     * @param {number} queryParallelism - Query parallelism.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setQueryParallelism(queryParallelism: any): this;
    /**
     * Gets query parallelism parameter which is a hint to query execution engine on desired degree of
     * parallelism within a single node.
     *
     * @return {number} - Query parallelism.
     */
    getQueryParallelism(): object;
    /**
     * Sets read from backup flag.
     *
     * @param {boolean} readFromBackup - True to allow reads from backups. False - data always
     * should be read from primary node and never from backup.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setReadFromBackup(readFromBackup: any): this;
    /**
     * Gets flag indicating whether data can be read from backup.
     *
     * @return {boolean} - true if data can be read from backup node or false if data always
     *  should be read from primary node and never from backup.
     */
    getReadFromBackup(): object;
    /**
     * Sets rebalance batch size (to be loaded within a single rebalance message). Rebalancing algorithm will split
     * total data set on every node into multiple batches prior to sending data.
     *
     * @param {number} rebalanceBatchSize - Rebalance batch size (size in bytes of a single rebalance message).
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setRebalanceBatchSize(rebalanceBatchSize: any): this;
    /**
     * Gets size (in number bytes) to be loaded within a single rebalance message.
     *
     * @return {number} - Size in bytes of a single rebalance message.
     */
    getRebalanceBatchSize(): object;
    /**
     * To gain better rebalancing performance supplier node can provide more than one batch at rebalancing start
     * and provide one new to each next demand request. Sets number of batches generated by supply node at
     * rebalancing start. Minimum is 1.
     *
     * @param {number} rebalanceBatchesPrefetchCount - Batches count.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setRebalanceBatchesPrefetchCount(rebalanceBatchesPrefetchCount: any): this;
    /**
     * To gain better rebalancing performance supplier node can provide more than one batch at rebalancing start
     * and provide one new to each next demand request. Gets number of batches generated by supply node at
     * rebalancing start. Minimum is 1.
     *
     * @return {number} - Batches count.
     */
    getRebalanceBatchesPrefetchCount(): object;
    /**
     * Sets delay in milliseconds upon a node joining or leaving topology (or crash) after which rebalancing should be
     * started automatically. Rebalancing should be delayed if you plan to restart nodes after they leave topology,
     * or if you plan to start multiple nodes at once or one after another and don't want to repartition and rebalance
     * until all nodes are started.
     *
     * @param {number} rebalanceDelay - Rebalance delay to set. 0 to start rebalancing immediately,
     *  -1 to start rebalancing manually, or positive value to specify delay in milliseconds after which rebalancing
     *  should start automatically.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setRebalanceDelay(rebalanceDelay: any): this;
    /**
     * Gets rebalance delay.
     *
     * @return {number} - Rebalance delay.
     */
    getRebalanceDelay(): object;
    /**
     * Sets rebalance mode for distributed cache.
     *
     * @param {CacheConfiguration.REABALANCE_MODE} rebalanceMode - Rebalance mode.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     *
     * @throws {IgniteClientError} if error.
     */
    setRebalanceMode(rebalanceMode: any): this;
    /**
     * Gets rebalance mode for distributed cache.
     *
     * @return {CacheConfiguration.REABALANCE_MODE} - Rebalance mode.
     */
    getRebalanceMode(): object;
    /**
     * Sets cache rebalance order. Rebalance order can be set to non-zero value for caches with SYNC or
     * ASYNC rebalance modes only. If cache rebalance order is positive, rebalancing for this cache will be started
     * only when rebalancing for all caches with smaller rebalance order will be completed.
     *
     * @param {number} rebalanceOrder - Cache rebalance order.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setRebalanceOrder(rebalanceOrder: any): this;
    /**
     * Gets cache rebalance order.
     *
     * @return {number} - Cache rebalance order.
     */
    getRebalanceOrder(): object;
    /**
     * Sets time in milliseconds to wait between rebalance messages to avoid overloading of CPU or network. This parameter
     * helps tune the amount of time to wait between rebalance messages to make sure that rebalancing process does not
     * have any negative performance impact.
     *
     * @param {number} rebalanceThrottle - Time in millis to wait between rebalance messages, 0 to disable throttling.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setRebalanceThrottle(rebalanceThrottle: any): this;
    /**
     * Gets time in milliseconds to wait between rebalance messages to avoid overloading of CPU or network.
     *
     * @return {number} - Time in millis to wait between rebalance messages, 0 - throttling disabled.
     */
    getRebalanceThrottle(): object;
    /**
     * Sets rebalance timeout (ms).
     *
     * @param {number} rebalanceTimeout - Rebalance timeout (ms).
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setRebalanceTimeout(rebalanceTimeout: any): this;
    /**
     * Gets rebalance timeout (ms).
     *
     * @return {number} - Rebalance timeout (ms).
     */
    getRebalanceTimeout(): object;
    /**
     * Sets sqlEscapeAll flag. If true all the SQL table and field names will be escaped with double quotes like
     * ("tableName"."fieldsName"). This enforces case sensitivity for field names and also allows having special
     * characters in table and field names.
     *
     * @param {boolean} sqlEscapeAll - Flag value.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setSqlEscapeAll(sqlEscapeAll: any): this;
    /**
     * Gets sqlEscapeAll flag.
     *
     * @return {boolean} - Flag value.
     */
    getSqlEscapeAll(): object;
    /**
     * Sets maximum inline size for sql indexes.
     *
     * @param {number} sqlIndexInlineMaxSize - Maximum payload size for offheap indexes.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setSqlIndexInlineMaxSize(sqlIndexInlineMaxSize: any): this;
    /**
     * Gets maximum inline size for sql indexes.
     *
     * @return {number} - Maximum payload size for offheap indexes.
     */
    getSqlIndexInlineMaxSize(): object;
    /**
     * Sets sql schema to be used for current cache. This name will correspond to SQL ANSI-99 standard. Nonquoted
     * identifiers are not case sensitive. Quoted identifiers are case sensitive. Be aware of using the same string
     * in case sensitive and case insensitive manner simultaneously, since behaviour for such case is not specified.
     * When sqlSchema is not specified, quoted cacheName is used instead. sqlSchema could not be an empty string.
     * Has to be "\"\"" (quoted empty string) instead.
     *
     * @param {string} sqlSchema - Schema name for current cache according to SQL ANSI-99. Should not be null.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     */
    setSqlSchema(sqlSchema: any): this;
    /**
     * Gets custom name of the sql schema. If custom sql schema is not set then undefined will be returned and quoted
     * case sensitive name will be used as sql schema.
     *
     * @return {string} - Schema name for current cache according to SQL ANSI-99. Could be undefined.
     */
    getSqlSchema(): object;
    /**
     * Sets write synchronization mode. Default synchronization mode is
     * {@link CacheConfiguration.WRITE_SYNCHRONIZATION_MODE}.PRIMARY_SYNC.
     *
     * @param {CacheConfiguration.WRITE_SYNCHRONIZATION_MODE} writeSynchronizationMode - Write synchronization mode
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     *
     * @throws {IgniteClientError} if error.
     */
    setWriteSynchronizationMode(writeSynchronizationMode: any): this;
    /**
     * Gets write synchronization mode. This mode controls whether the main caller should wait for update on
     * other nodes to complete or not.
     *
     * @return {CacheConfiguration.WRITE_SYNCHRONIZATION_MODE} - Write synchronization mode.
     */
    getWriteSynchronizationMode(): object;
    /**
     * Sets cache key configurations.
     *
     * @param {...CacheKeyConfiguration} keyConfigurations - Cache key configurations.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     *
     * @throws {IgniteClientError} if error.
     */
    setKeyConfigurations(...keyConfigurations: any[]): this;
    /**
     * Gets cache key configurations.
     *
     * @return {Array<CacheKeyConfiguration>} - Array of cache key configurations.
     */
    getKeyConfigurations(): object;
    /**
     * Sets query entities configuration.
     *
     * @param {...QueryEntity} queryEntities - Query entities configuration.
     *
     * @return {CacheConfiguration} - the same instance of the CacheConfiguration.
     *
     * @throws {IgniteClientError} if error.
     */
    setQueryEntities(...queryEntities: QueryEntity[]): this;
    /**
     * Gets a collection (array) of configured query entities.
     *
     * @return {Array<QueryEntity>} - Array of query entities configurations.
     */
    getQueryEntities(): object;
    /** Private methods */
    /**
     * @ignore
     */
    _write(communicator: any, buffer: any, name: any): Promise<void>;
    /**
     * @ignore
     */
    _writeProperty(communicator: any, buffer: any, propertyCode: any, property: any): Promise<void>;
    /**
     * @ignore
     */
    _read(communicator: any, buffer: any): Promise<void>;
    /**
     * @ignore
     */
    _readProperty(communicator: any, buffer: any, propertyCode: any): Promise<void>;
}
//# sourceMappingURL=CacheConfiguration.d.ts.map