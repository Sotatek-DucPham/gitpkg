/// <reference types="node" />
import { CompositeType, ObjectArrayType } from "../ObjectType";
import { PRIMITIVE_TYPE, COMPOSITE_TYPE } from "./Constants";
export declare enum OPERATION {
    CACHE_GET = 1000,
    CACHE_PUT = 1001,
    CACHE_PUT_IF_ABSENT = 1002,
    CACHE_GET_ALL = 1003,
    CACHE_PUT_ALL = 1004,
    CACHE_GET_AND_PUT = 1005,
    CACHE_GET_AND_REPLACE = 1006,
    CACHE_GET_AND_REMOVE = 1007,
    CACHE_GET_AND_PUT_IF_ABSENT = 1008,
    CACHE_REPLACE = 1009,
    CACHE_REPLACE_IF_EQUALS = 1010,
    CACHE_CONTAINS_KEY = 1011,
    CACHE_CONTAINS_KEYS = 1012,
    CACHE_CLEAR = 1013,
    CACHE_CLEAR_KEY = 1014,
    CACHE_CLEAR_KEYS = 1015,
    CACHE_REMOVE_KEY = 1016,
    CACHE_REMOVE_IF_EQUALS = 1017,
    CACHE_REMOVE_KEYS = 1018,
    CACHE_REMOVE_ALL = 1019,
    CACHE_GET_SIZE = 1020,
    CACHE_LOCAL_PEEK = 1021,
    CACHE_GET_NAMES = 1050,
    CACHE_CREATE_WITH_NAME = 1051,
    CACHE_GET_OR_CREATE_WITH_NAME = 1052,
    CACHE_CREATE_WITH_CONFIGURATION = 1053,
    CACHE_GET_OR_CREATE_WITH_CONFIGURATION = 1054,
    CACHE_GET_CONFIGURATION = 1055,
    CACHE_DESTROY = 1056,
    CACHE_PARTITIONS = 1101,
    QUERY_SCAN = 2000,
    QUERY_SCAN_CURSOR_GET_PAGE = 2001,
    QUERY_SQL = 2002,
    QUERY_SQL_CURSOR_GET_PAGE = 2003,
    QUERY_SQL_FIELDS = 2004,
    QUERY_SQL_FIELDS_CURSOR_GET_PAGE = 2005,
    RESOURCE_CLOSE = 0,
    GET_BINARY_TYPE = 3002,
    PUT_BINARY_TYPE = 3003
}
export declare const TYPE_CODE: {
    BINARY_OBJECT: number;
    BINARY_ENUM: number;
    OBJECT_ARRAY: COMPOSITE_TYPE.OBJECT_ARRAY;
    COLLECTION: COMPOSITE_TYPE.COLLECTION;
    MAP: COMPOSITE_TYPE.MAP;
    NULL: COMPOSITE_TYPE.NULL;
    COMPLEX_OBJECT: COMPOSITE_TYPE.COMPLEX_OBJECT;
    BYTE: PRIMITIVE_TYPE.BYTE;
    SHORT: PRIMITIVE_TYPE.SHORT;
    INTEGER: PRIMITIVE_TYPE.INTEGER;
    LONG: PRIMITIVE_TYPE.LONG;
    FLOAT: PRIMITIVE_TYPE.FLOAT;
    DOUBLE: PRIMITIVE_TYPE.DOUBLE;
    CHAR: PRIMITIVE_TYPE.CHAR;
    BOOLEAN: PRIMITIVE_TYPE.BOOLEAN;
    STRING: PRIMITIVE_TYPE.STRING;
    UUID: PRIMITIVE_TYPE.UUID;
    DATE: PRIMITIVE_TYPE.DATE;
    BYTE_ARRAY: PRIMITIVE_TYPE.BYTE_ARRAY;
    SHORT_ARRAY: PRIMITIVE_TYPE.SHORT_ARRAY;
    INTEGER_ARRAY: PRIMITIVE_TYPE.INTEGER_ARRAY;
    LONG_ARRAY: PRIMITIVE_TYPE.LONG_ARRAY;
    FLOAT_ARRAY: PRIMITIVE_TYPE.FLOAT_ARRAY;
    DOUBLE_ARRAY: PRIMITIVE_TYPE.DOUBLE_ARRAY;
    CHAR_ARRAY: PRIMITIVE_TYPE.CHAR_ARRAY;
    BOOLEAN_ARRAY: PRIMITIVE_TYPE.BOOLEAN_ARRAY;
    STRING_ARRAY: PRIMITIVE_TYPE.STRING_ARRAY;
    UUID_ARRAY: PRIMITIVE_TYPE.UUID_ARRAY;
    DATE_ARRAY: PRIMITIVE_TYPE.DATE_ARRAY;
    ENUM: PRIMITIVE_TYPE.ENUM;
    ENUM_ARRAY: PRIMITIVE_TYPE.ENUM_ARRAY;
    DECIMAL: PRIMITIVE_TYPE.DECIMAL;
    DECIMAL_ARRAY: PRIMITIVE_TYPE.DECIMAL_ARRAY;
    TIMESTAMP: PRIMITIVE_TYPE.TIMESTAMP;
    TIMESTAMP_ARRAY: PRIMITIVE_TYPE.TIMESTAMP_ARRAY;
    TIME: PRIMITIVE_TYPE.TIME;
    TIME_ARRAY: PRIMITIVE_TYPE.TIME_ARRAY;
};
export default class BinaryUtils {
    static get OPERATION(): typeof OPERATION;
    static get TYPE_CODE(): {
        BINARY_OBJECT: number;
        BINARY_ENUM: number;
        OBJECT_ARRAY: COMPOSITE_TYPE.OBJECT_ARRAY;
        COLLECTION: COMPOSITE_TYPE.COLLECTION;
        MAP: COMPOSITE_TYPE.MAP;
        NULL: COMPOSITE_TYPE.NULL;
        COMPLEX_OBJECT: COMPOSITE_TYPE.COMPLEX_OBJECT;
        BYTE: PRIMITIVE_TYPE.BYTE;
        SHORT: PRIMITIVE_TYPE.SHORT;
        INTEGER: PRIMITIVE_TYPE.INTEGER;
        LONG: PRIMITIVE_TYPE.LONG;
        FLOAT: PRIMITIVE_TYPE.FLOAT;
        DOUBLE: PRIMITIVE_TYPE.DOUBLE;
        CHAR: PRIMITIVE_TYPE.CHAR;
        BOOLEAN: PRIMITIVE_TYPE.BOOLEAN;
        STRING: PRIMITIVE_TYPE.STRING;
        UUID: PRIMITIVE_TYPE.UUID;
        DATE: PRIMITIVE_TYPE.DATE;
        BYTE_ARRAY: PRIMITIVE_TYPE.BYTE_ARRAY;
        SHORT_ARRAY: PRIMITIVE_TYPE.SHORT_ARRAY;
        INTEGER_ARRAY: PRIMITIVE_TYPE.INTEGER_ARRAY;
        LONG_ARRAY: PRIMITIVE_TYPE.LONG_ARRAY;
        FLOAT_ARRAY: PRIMITIVE_TYPE.FLOAT_ARRAY;
        DOUBLE_ARRAY: PRIMITIVE_TYPE.DOUBLE_ARRAY;
        CHAR_ARRAY: PRIMITIVE_TYPE.CHAR_ARRAY;
        BOOLEAN_ARRAY: PRIMITIVE_TYPE.BOOLEAN_ARRAY;
        STRING_ARRAY: PRIMITIVE_TYPE.STRING_ARRAY;
        UUID_ARRAY: PRIMITIVE_TYPE.UUID_ARRAY;
        DATE_ARRAY: PRIMITIVE_TYPE.DATE_ARRAY;
        ENUM: PRIMITIVE_TYPE.ENUM;
        ENUM_ARRAY: PRIMITIVE_TYPE.ENUM_ARRAY;
        DECIMAL: PRIMITIVE_TYPE.DECIMAL;
        DECIMAL_ARRAY: PRIMITIVE_TYPE.DECIMAL_ARRAY;
        TIMESTAMP: PRIMITIVE_TYPE.TIMESTAMP;
        TIMESTAMP_ARRAY: PRIMITIVE_TYPE.TIMESTAMP_ARRAY;
        TIME: PRIMITIVE_TYPE.TIME;
        TIME_ARRAY: PRIMITIVE_TYPE.TIME_ARRAY;
    };
    static get TYPE_INFO(): Readonly<{
        [x: number]: {
            NAME: string;
            SIZE: number;
            NULLABLE?: undefined;
            ELEMENT_TYPE?: undefined;
            KEEP_ELEMENT_TYPE?: undefined;
        } | {
            NAME: string;
            NULLABLE: boolean;
            SIZE?: undefined;
            ELEMENT_TYPE?: undefined;
            KEEP_ELEMENT_TYPE?: undefined;
        } | {
            NAME: string;
            SIZE: number;
            NULLABLE: boolean;
            ELEMENT_TYPE?: undefined;
            KEEP_ELEMENT_TYPE?: undefined;
        } | {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            NULLABLE: boolean;
            SIZE?: undefined;
            KEEP_ELEMENT_TYPE?: undefined;
        } | {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
            SIZE?: undefined;
        } | {
            NAME: string;
            ELEMENT_TYPE: COMPOSITE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
            SIZE?: undefined;
        };
        1: {
            NAME: string;
            SIZE: number;
        };
        2: {
            NAME: string;
            SIZE: number;
        };
        3: {
            NAME: string;
            SIZE: number;
        };
        4: {
            NAME: string;
            SIZE: number;
        };
        5: {
            NAME: string;
            SIZE: number;
        };
        6: {
            NAME: string;
            SIZE: number;
        };
        7: {
            NAME: string;
            SIZE: number;
        };
        8: {
            NAME: string;
            SIZE: number;
        };
        9: {
            NAME: string;
            NULLABLE: boolean;
        };
        10: {
            NAME: string;
            SIZE: number;
            NULLABLE: boolean;
        };
        11: {
            NAME: string;
            SIZE: number;
            NULLABLE: boolean;
        };
        12: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            NULLABLE: boolean;
        };
        13: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            NULLABLE: boolean;
        };
        14: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            NULLABLE: boolean;
        };
        15: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            NULLABLE: boolean;
        };
        16: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            NULLABLE: boolean;
        };
        17: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            NULLABLE: boolean;
        };
        18: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            NULLABLE: boolean;
        };
        19: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            NULLABLE: boolean;
        };
        20: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
        };
        22: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
        };
        21: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
        };
        23: {
            NAME: string;
            ELEMENT_TYPE: COMPOSITE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
        };
        24: {
            NAME: string;
            NULLABLE: boolean;
        };
        25: {
            NAME: string;
            NULLABLE: boolean;
        };
        28: {
            NAME: string;
            NULLABLE: boolean;
        };
        29: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
        };
        30: {
            NAME: string;
            NULLABLE: boolean;
        };
        31: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
        };
        33: {
            NAME: string;
            NULLABLE: boolean;
        };
        34: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
        };
        36: {
            NAME: string;
            NULLABLE: boolean;
        };
        37: {
            NAME: string;
            ELEMENT_TYPE: PRIMITIVE_TYPE;
            KEEP_ELEMENT_TYPE: boolean;
            NULLABLE: boolean;
        };
        101: {
            NAME: string;
            NULLABLE: boolean;
        };
        103: {
            NAME: string;
            NULLABLE: boolean;
        };
    }>;
    static getSize(typeCode: any): number;
    static get ENCODING(): BufferEncoding;
    static getTypeName(type: any): string;
    static isNullable(type: any): boolean;
    static getTypeCode(type: PRIMITIVE_TYPE | CompositeType): number;
    static checkObjectType(type: any, argName: any): void;
    static calcObjectType(object: any): PRIMITIVE_TYPE | CompositeType;
    static checkCompatibility(value: any, type: any): void;
    static isStandardType(typeCode: any): boolean;
    static checkStandardTypeCompatibility(value: any, typeCode: any, type?: any): void;
    static checkTypesComatibility(expectedType: any, actualTypeCode: any): void;
    static getArrayElementType(arrayType: any): PRIMITIVE_TYPE | COMPOSITE_TYPE | CompositeType;
    static getArrayType(elementType: any): PRIMITIVE_TYPE.BYTE_ARRAY | PRIMITIVE_TYPE.SHORT_ARRAY | PRIMITIVE_TYPE.INTEGER_ARRAY | PRIMITIVE_TYPE.LONG_ARRAY | PRIMITIVE_TYPE.FLOAT_ARRAY | PRIMITIVE_TYPE.DOUBLE_ARRAY | PRIMITIVE_TYPE.CHAR_ARRAY | PRIMITIVE_TYPE.BOOLEAN_ARRAY | PRIMITIVE_TYPE.STRING_ARRAY | PRIMITIVE_TYPE.UUID_ARRAY | PRIMITIVE_TYPE.DATE_ARRAY | PRIMITIVE_TYPE.ENUM_ARRAY | PRIMITIVE_TYPE.DECIMAL_ARRAY | PRIMITIVE_TYPE.TIMESTAMP_ARRAY | PRIMITIVE_TYPE.TIME_ARRAY | ObjectArrayType;
    static keepArrayElementType(arrayTypeCode: any): boolean;
    static getJsObjectFieldNames(jsObject: any): any[];
    static hashCode(object: any, communicator: any, typeCode?: any): Promise<any>;
    static standardHashCode(object: any, typeCode?: any): any;
    static contentHashCode(buffer: any, startPos: any, endPos: any): number;
    static strHashCode(str: any): number;
    static strHashCodeLowerCase(str: any): number;
    static charHashCode(char: any): any;
    static intHashCode(int: any): any;
    static longHashCode(long: any): number;
    static boolHashCode(bool: any): 1231 | 1237;
    static floatHashCode(float: any): number;
    static doubleHashCode(double: any): number;
    static uuidHashCode(uuid: any): number;
    static timeHashCode(time: any): number;
    static datetimeHashCode(date: any): number;
}
//# sourceMappingURL=BinaryUtils.d.ts.map