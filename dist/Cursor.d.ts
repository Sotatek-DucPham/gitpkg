/// <reference types="long" />
import { OPERATION } from './internal/BinaryUtils';
import BinaryCommunicator from "./internal/BinaryCommunicator";
import { PRIMITIVE_TYPE } from "./internal/Constants";
import { CompositeType } from "./ObjectType";
import MessageBuffer from "./internal/MessageBuffer";
import { CacheEntry } from "./CacheClient";
export declare abstract class BaseCursor<T> {
    protected _id: Long;
    protected _hasNext: boolean;
    protected _communicator: BinaryCommunicator;
    protected _operation: OPERATION;
    protected _buffer: MessageBuffer;
    protected _keyType: object;
    protected _valueType: object;
    protected _values: T[];
    protected _valueIndex: number;
    /**
     * Returns one element (cache entry) from the query results.
     *
     * Every new call returns the next cache entry from the query results.
     * If the method returns null, no more entries are available.
     *
     * @async
     *
     * @return {Promise<T>} - a cache entry.
     */
    getValue(): Promise<T>;
    /**
     * Checks if more elements are available in the query results.
     *
     * @return {boolean} - true if more cache entries are available, false otherwise.
     */
    hasMore(): boolean;
    /**
     * Returns all elements (cache entries) from the query results.
     *
     * May be used instead of getValue() method if the number of returned entries
     * is relatively small and will not cause memory utilization issues.
     *
     * @async
     *
     * @return {Promise<Array<T>>} - all cache entries returned by SQL or Scan query.
     */
    getAll(): Promise<T[]>;
    /**
     * Closes the cursor. Obtaining elements from the results is not possible after this.
     *
     * This method should be called if no more elements are needed.
     * It is not neccessary to call it if all elements have been already obtained.
     *
     * @async
     */
    close(): Promise<void>;
    /** Private methods */
    /**
     * @ignore
     */
    constructor(communicator: BinaryCommunicator, operation: OPERATION, buffer: MessageBuffer, keyType?: any, valueType?: any);
    /**
     * @ignore
     */
    _getNext(): Promise<void>;
    /**
     * @ignore
     */
    _getValues(): Promise<T[]>;
    /**
     * @ignore
     */
    _write(buffer: any): Promise<void>;
    /**
     * @ignore
     */
    _readId(buffer: any): void;
    /**
     * @ignore
     */
    abstract _readRow(buffer: MessageBuffer): Promise<T>;
    /**
     * @ignore
     */
    _read(buffer: any): Promise<void>;
}
/**
 * Class representing a cursor to obtain results of SQL and Scan query operations.
 *
 * The class has no public constructor. An instance of this class is obtained
 * via query() method of {@link CacheClient} objects.
 * One instance of this class returns results of one SQL or Scan query operation.
 *
 * @hideconstructor
 */
export declare class Cursor extends BaseCursor<CacheEntry> {
    /** Private methods */
    /**
     * @ignore
     */
    constructor(communicator: BinaryCommunicator, operation: OPERATION, buffer: MessageBuffer, keyType?: any, valueType?: any);
    /**
     * @ignore
     */
    _readRow(buffer: MessageBuffer): Promise<CacheEntry>;
}
/**
 * Class representing a cursor to obtain results of SQL Fields query operation.
 *
 * The class has no public constructor. An instance of this class is obtained
 * via query() method of {@link CacheClient} objects.
 * One instance of this class returns results of one SQL Fields query operation.
 *
 * @hideconstructor
 * @extends Cursor
 */
export declare class SqlFieldsCursor extends BaseCursor<Array<object>> {
    private _fieldCount;
    private _fieldTypes;
    private _fieldNames;
    /**
     * Returns one element (array with values of the fields) from the query results.
     *
     * Every new call returns the next element from the query results.
     * If the method returns null, no more elements are available.
     *
     * @async
     *
     * @return {Promise<Array<*>>} - array with values of the fields requested by the query.
     *
     */
    getValue(): Promise<Array<object>>;
    /**
     * Returns all elements (arrays with values of the fields) from the query results.
     *
     * May be used instead of getValue() method if the number of returned elements
     * is relatively small and will not cause memory utilization issues.
     *
     * @async
     *
     * @return {Promise<Array<Array<*>>>} - all results returned by SQL Fields query.
     *   Every element of the array is an array with values of the fields requested by the query.
     *
     */
    getAll(): Promise<Array<object>[]>;
    /**
     * Returns names of the fields which were requested in the SQL Fields query.
     *
     * Empty array is returned if "include field names" flag was false in the query.
     *
     * @return {Array<string>} - field names.
     *   The order of names corresponds to the order of field values returned in the results of the query.
     */
    getFieldNames(): string[];
    /**
     * Specifies types of the fields returned by the SQL Fields query.
     *
     * By default, a type of every field is not specified that means during operations the Ignite client
     * will try to make automatic mapping between JavaScript types and Ignite object types -
     * according to the mapping table defined in the description of the {@link ObjectType} class.
     *
     * @param {...PRIMITIVE_TYPE | CompositeType} fieldTypes - types of the returned fields.
     *   The order of types must correspond the order of field values returned in the results of the query.
     *   A type of every field can be:
     *   - either a type code of primitive (simple) type
     *   - or an instance of class representing non-primitive (composite) type
     *   - or null (means the type is not specified)
     *
     * @return {SqlFieldsCursor} - the same instance of the SqlFieldsCursor.
     */
    setFieldTypes(...fieldTypes: Array<PRIMITIVE_TYPE | CompositeType>): this;
    /** Private methods */
    /**
     * @ignore
     */
    constructor(communicator: BinaryCommunicator, buffer: MessageBuffer);
    /**
     * @ignore
     */
    _readFieldNames(buffer: MessageBuffer, includeFieldNames: boolean): Promise<void>;
    /**
     * @ignore
     */
    _readRow(buffer: MessageBuffer): Promise<Array<object>>;
}
//# sourceMappingURL=Cursor.d.ts.map