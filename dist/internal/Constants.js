"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPOSITE_TYPE = exports.PRIMITIVE_TYPE = void 0;
/**
 * Supported Ignite type codes for primitive (simple) types.
 * @typedef ObjectType.PRIMITIVE_TYPE
 * @enum
 * @readonly
 * @property BYTE 1
 * @property SHORT 2
 * @property INTEGER 3
 * @property LONG 4
 * @property FLOAT 5
 * @property DOUBLE 6
 * @property CHAR 7
 * @property BOOLEAN 8
 * @property STRING 9
 * @property UUID 10
 * @property DATE 11
 * @property BYTE_ARRAY 12
 * @property SHORT_ARRAY 13
 * @property INTEGER_ARRAY 14
 * @property LONG_ARRAY 15
 * @property FLOAT_ARRAY 16
 * @property DOUBLE_ARRAY 17
 * @property CHAR_ARRAY 18
 * @property BOOLEAN_ARRAY 19
 * @property STRING_ARRAY 20
 * @property UUID_ARRAY 21
 * @property DATE_ARRAY 22
 * @property ENUM 28
 * @property ENUM_ARRAY 29
 * @property DECIMAL 30
 * @property DECIMAL_ARRAY 31
 * @property TIMESTAMP 33
 * @property TIMESTAMP_ARRAY 34
 * @property TIME 36
 * @property TIME_ARRAY 37
 */
var PRIMITIVE_TYPE;
(function (PRIMITIVE_TYPE) {
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["BYTE"] = 1] = "BYTE";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["SHORT"] = 2] = "SHORT";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["INTEGER"] = 3] = "INTEGER";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["LONG"] = 4] = "LONG";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["FLOAT"] = 5] = "FLOAT";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["DOUBLE"] = 6] = "DOUBLE";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["CHAR"] = 7] = "CHAR";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["BOOLEAN"] = 8] = "BOOLEAN";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["STRING"] = 9] = "STRING";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["UUID"] = 10] = "UUID";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["DATE"] = 11] = "DATE";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["BYTE_ARRAY"] = 12] = "BYTE_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["SHORT_ARRAY"] = 13] = "SHORT_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["INTEGER_ARRAY"] = 14] = "INTEGER_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["LONG_ARRAY"] = 15] = "LONG_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["FLOAT_ARRAY"] = 16] = "FLOAT_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["DOUBLE_ARRAY"] = 17] = "DOUBLE_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["CHAR_ARRAY"] = 18] = "CHAR_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["BOOLEAN_ARRAY"] = 19] = "BOOLEAN_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["STRING_ARRAY"] = 20] = "STRING_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["UUID_ARRAY"] = 21] = "UUID_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["DATE_ARRAY"] = 22] = "DATE_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["ENUM"] = 28] = "ENUM";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["ENUM_ARRAY"] = 29] = "ENUM_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["DECIMAL"] = 30] = "DECIMAL";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["DECIMAL_ARRAY"] = 31] = "DECIMAL_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["TIMESTAMP"] = 33] = "TIMESTAMP";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["TIMESTAMP_ARRAY"] = 34] = "TIMESTAMP_ARRAY";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["TIME"] = 36] = "TIME";
    PRIMITIVE_TYPE[PRIMITIVE_TYPE["TIME_ARRAY"] = 37] = "TIME_ARRAY";
})(PRIMITIVE_TYPE = exports.PRIMITIVE_TYPE || (exports.PRIMITIVE_TYPE = {}));
/**
 * Supported Ignite type codes for non-primitive (composite) types.
 * @typedef ObjectType.COMPOSITE_TYPE
 * @enum
 * @readonly
 * @property OBJECT_ARRAY 23
 * @property COLLECTION 24
 * @property MAP 25
 * @property NULL 101
 * @property COMPLEX_OBJECT 103
 */
var COMPOSITE_TYPE;
(function (COMPOSITE_TYPE) {
    COMPOSITE_TYPE[COMPOSITE_TYPE["OBJECT_ARRAY"] = 23] = "OBJECT_ARRAY";
    COMPOSITE_TYPE[COMPOSITE_TYPE["COLLECTION"] = 24] = "COLLECTION";
    COMPOSITE_TYPE[COMPOSITE_TYPE["MAP"] = 25] = "MAP";
    COMPOSITE_TYPE[COMPOSITE_TYPE["NULL"] = 101] = "NULL";
    COMPOSITE_TYPE[COMPOSITE_TYPE["COMPLEX_OBJECT"] = 103] = "COMPLEX_OBJECT";
})(COMPOSITE_TYPE = exports.COMPOSITE_TYPE || (exports.COMPOSITE_TYPE = {}));
//# sourceMappingURL=Constants.js.map