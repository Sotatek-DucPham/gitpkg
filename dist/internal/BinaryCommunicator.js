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
const ObjectType_1 = require("../ObjectType");
const Timestamp_1 = require("../Timestamp");
const EnumItem_1 = require("../EnumItem");
const BinaryUtils_1 = require("./BinaryUtils");
const BinaryTypeStorage_1 = require("./BinaryTypeStorage");
const Errors_1 = require("../Errors");
const BinaryObject_1 = require("../BinaryObject");
const BinaryType_1 = require("./BinaryType");
const Decimal = require('decimal.js').default;
class BinaryCommunicator {
    constructor(router) {
        this._router = router;
        this._typeStorage = new BinaryTypeStorage_1.default(this);
    }
    static readString(buffer) {
        const typeCode = buffer.readByte();
        BinaryUtils_1.default.checkTypesComatibility(BinaryUtils_1.default.TYPE_CODE.STRING, typeCode);
        if (typeCode === BinaryUtils_1.default.TYPE_CODE.NULL) {
            return null;
        }
        return buffer.readString();
    }
    static writeString(buffer, value) {
        if (value === null) {
            buffer.writeByte(BinaryUtils_1.default.TYPE_CODE.NULL);
        }
        else {
            buffer.writeByte(BinaryUtils_1.default.TYPE_CODE.STRING);
            buffer.writeString(value);
        }
    }
    send(opCode, payloadWriter, payloadReader = null, affinityHint = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._router.send(opCode, payloadWriter, payloadReader, affinityHint);
        });
    }
    get typeStorage() {
        return this._typeStorage;
    }
    readObject(buffer, expectedType = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeCode = buffer.readByte();
            BinaryUtils_1.default.checkTypesComatibility(expectedType, typeCode);
            return yield this._readTypedObject(buffer, typeCode, expectedType);
        });
    }
    readStringArray(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._readTypedObject(buffer, BinaryUtils_1.default.TYPE_CODE.STRING_ARRAY);
        });
    }
    writeObject(buffer, object, objectType = null, writeObjectType = true) {
        return __awaiter(this, void 0, void 0, function* () {
            BinaryUtils_1.default.checkCompatibility(object, objectType);
            if (object === null) {
                buffer.writeByte(BinaryUtils_1.default.TYPE_CODE.NULL);
                return;
            }
            objectType = objectType ? objectType : BinaryUtils_1.default.calcObjectType(object);
            const objectTypeCode = BinaryUtils_1.default.getTypeCode(objectType);
            if (writeObjectType) {
                buffer.writeByte(objectTypeCode);
            }
            switch (objectTypeCode) {
                case BinaryUtils_1.default.TYPE_CODE.BYTE:
                case BinaryUtils_1.default.TYPE_CODE.SHORT:
                case BinaryUtils_1.default.TYPE_CODE.INTEGER:
                case BinaryUtils_1.default.TYPE_CODE.FLOAT:
                case BinaryUtils_1.default.TYPE_CODE.DOUBLE:
                    buffer.writeNumber(object, objectTypeCode);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.LONG:
                    buffer.writeLong(object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.CHAR:
                    buffer.writeChar(object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.BOOLEAN:
                    buffer.writeBoolean(object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.STRING:
                    buffer.writeString(object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.UUID:
                    this._writeUUID(buffer, object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.DATE:
                    buffer.writeDate(object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.ENUM:
                    yield this._writeEnum(buffer, object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.DECIMAL:
                    this._writeDecimal(buffer, object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.TIMESTAMP:
                    this._writeTimestamp(buffer, object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.TIME:
                    this._writeTime(buffer, object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.BYTE_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.SHORT_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.INTEGER_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.LONG_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.FLOAT_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.DOUBLE_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.CHAR_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.BOOLEAN_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.STRING_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.UUID_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.DATE_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.OBJECT_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.ENUM_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.DECIMAL_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.TIMESTAMP_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.TIME_ARRAY:
                    yield this._writeArray(buffer, object, objectType, objectTypeCode);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.COLLECTION:
                    yield this._writeCollection(buffer, object, objectType);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.MAP:
                    yield this._writeMap(buffer, object, objectType);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.BINARY_OBJECT:
                    yield this._writeBinaryObject(buffer, object);
                    break;
                case BinaryUtils_1.default.TYPE_CODE.COMPLEX_OBJECT:
                    yield this._writeComplexObject(buffer, object, objectType);
                    break;
                default:
                    throw Errors_1.IgniteClientError.unsupportedTypeError(objectType);
            }
        });
    }
    _readTypedObject(buffer, objectTypeCode, expectedType = null) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (objectTypeCode) {
                case BinaryUtils_1.default.TYPE_CODE.BYTE:
                case BinaryUtils_1.default.TYPE_CODE.SHORT:
                case BinaryUtils_1.default.TYPE_CODE.INTEGER:
                case BinaryUtils_1.default.TYPE_CODE.FLOAT:
                case BinaryUtils_1.default.TYPE_CODE.DOUBLE:
                    return buffer.readNumber(objectTypeCode);
                case BinaryUtils_1.default.TYPE_CODE.LONG:
                    return buffer.readLong().toNumber();
                case BinaryUtils_1.default.TYPE_CODE.CHAR:
                    return buffer.readChar();
                case BinaryUtils_1.default.TYPE_CODE.BOOLEAN:
                    return buffer.readBoolean();
                case BinaryUtils_1.default.TYPE_CODE.STRING:
                    return buffer.readString();
                case BinaryUtils_1.default.TYPE_CODE.UUID:
                    return this._readUUID(buffer);
                case BinaryUtils_1.default.TYPE_CODE.DATE:
                    return buffer.readDate();
                case BinaryUtils_1.default.TYPE_CODE.ENUM:
                case BinaryUtils_1.default.TYPE_CODE.BINARY_ENUM:
                    return yield this._readEnum(buffer);
                case BinaryUtils_1.default.TYPE_CODE.DECIMAL:
                    return this._readDecimal(buffer);
                case BinaryUtils_1.default.TYPE_CODE.TIMESTAMP:
                    return this._readTimestamp(buffer);
                case BinaryUtils_1.default.TYPE_CODE.TIME:
                    return buffer.readDate();
                case BinaryUtils_1.default.TYPE_CODE.BYTE_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.SHORT_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.INTEGER_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.LONG_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.FLOAT_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.DOUBLE_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.CHAR_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.BOOLEAN_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.STRING_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.UUID_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.DATE_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.OBJECT_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.ENUM_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.DECIMAL_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.TIMESTAMP_ARRAY:
                case BinaryUtils_1.default.TYPE_CODE.TIME_ARRAY:
                    return yield this._readArray(buffer, objectTypeCode, expectedType);
                case BinaryUtils_1.default.TYPE_CODE.COLLECTION:
                    return yield this._readCollection(buffer, expectedType);
                case BinaryUtils_1.default.TYPE_CODE.MAP:
                    return yield this._readMap(buffer, expectedType);
                case BinaryUtils_1.default.TYPE_CODE.BINARY_OBJECT:
                    return yield this._readBinaryObject(buffer, expectedType);
                case BinaryUtils_1.default.TYPE_CODE.NULL:
                    return null;
                case BinaryUtils_1.default.TYPE_CODE.COMPLEX_OBJECT:
                    return yield this._readComplexObject(buffer, expectedType);
                default:
                    throw Errors_1.IgniteClientError.unsupportedTypeError(objectTypeCode);
            }
        });
    }
    _readUUID(buffer) {
        return [...buffer.readBuffer(BinaryUtils_1.default.getSize(BinaryUtils_1.default.TYPE_CODE.UUID)).swap64()];
    }
    _readEnum(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const enumItem = new EnumItem_1.EnumItem(0);
            yield enumItem._read(this, buffer);
            return enumItem;
        });
    }
    _readDecimal(buffer) {
        const scale = buffer.readInteger();
        const dataLength = buffer.readInteger();
        const data = buffer.readBuffer(dataLength);
        const isNegative = (data[0] & 0x80) !== 0;
        if (isNegative) {
            data[0] &= 0x7F;
        }
        let result = new Decimal('0x' + data.toString('hex'));
        if (isNegative) {
            result = result.negated();
        }
        return result.mul(Decimal.pow(10, -scale));
    }
    _readTimestamp(buffer) {
        return new Timestamp_1.Timestamp(buffer.readLong().toNumber(), buffer.readInteger());
    }
    _readArray(buffer, arrayTypeCode, arrayType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (arrayTypeCode === BinaryUtils_1.default.TYPE_CODE.OBJECT_ARRAY) {
                buffer.readInteger();
            }
            const length = buffer.readInteger();
            const elementType = BinaryUtils_1.default.getArrayElementType(arrayType ? arrayType : arrayTypeCode);
            const keepElementType = elementType === null ? true : BinaryUtils_1.default.keepArrayElementType(arrayTypeCode);
            const result = new Array(length);
            for (let i = 0; i < length; i++) {
                result[i] = keepElementType ?
                    yield this.readObject(buffer, elementType) :
                    yield this._readTypedObject(buffer, elementType);
            }
            return result;
        });
    }
    _readMap(buffer, expectedMapType) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new Map();
            const size = buffer.readInteger();
            const subType = buffer.readByte();
            let key, value;
            for (let i = 0; i < size; i++) {
                key = yield this.readObject(buffer, expectedMapType ? expectedMapType._keyType : null);
                value = yield this.readObject(buffer, expectedMapType ? expectedMapType._valueType : null);
                result.set(key, value);
            }
            return result;
        });
    }
    _readCollection(buffer, expectedColType) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = buffer.readInteger();
            const subType = buffer.readByte();
            const isSet = ObjectType_1.CollectionObjectType._isSet(subType);
            const result = isSet ? new Set() : new Array(size);
            let element;
            for (let i = 0; i < size; i++) {
                element = yield this.readObject(buffer, expectedColType ? expectedColType._elementType : null);
                if (isSet) {
                    result.add(element);
                }
                else {
                    result[i] = element;
                }
            }
            return result;
        });
    }
    _readBinaryObject(buffer, expectedType) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = buffer.readInteger();
            const startPos = buffer.position;
            buffer.position = startPos + size;
            const offset = buffer.readInteger();
            const endPos = buffer.position;
            buffer.position = startPos + offset;
            const result = yield this.readObject(buffer, expectedType);
            buffer.position = endPos;
            return result;
        });
    }
    _readComplexObject(buffer, expectedType) {
        return __awaiter(this, void 0, void 0, function* () {
            buffer.position = buffer.position - 1;
            const binaryObject = yield BinaryObject_1.BinaryObject._fromBuffer(this, buffer);
            return expectedType ?
                yield binaryObject.toObject(expectedType) : binaryObject;
        });
    }
    _writeUUID(buffer, value) {
        buffer.writeBuffer(Buffer.from(value).swap64());
    }
    _writeEnum(buffer, enumValue) {
        return __awaiter(this, void 0, void 0, function* () {
            yield enumValue._write(this, buffer);
        });
    }
    _writeDecimal(buffer, decimal) {
        let strValue = decimal.toExponential();
        let expIndex = strValue.indexOf('e');
        if (expIndex < 0) {
            expIndex = strValue.indexOf('E');
        }
        let scale = 0;
        if (expIndex >= 0) {
            scale = parseInt(strValue.substring(expIndex + 1));
            strValue = strValue.substring(0, expIndex);
        }
        const isNegative = strValue.startsWith('-');
        if (isNegative) {
            strValue = strValue.substring(1);
        }
        const dotIndex = strValue.indexOf('.');
        if (dotIndex >= 0) {
            scale -= strValue.length - dotIndex - 1;
            strValue = strValue.substring(0, dotIndex) + strValue.substring(dotIndex + 1);
        }
        scale = -scale;
        let hexValue = new Decimal(strValue).toHexadecimal().substring(2);
        hexValue = ((hexValue.length % 2 !== 0) ? '000' : '00') + hexValue;
        const valueBuffer = Buffer.from(hexValue, 'hex');
        if (isNegative) {
            valueBuffer[0] |= 0x80;
        }
        buffer.writeInteger(scale);
        buffer.writeInteger(valueBuffer.length);
        buffer.writeBuffer(valueBuffer);
    }
    _writeTimestamp(buffer, timestamp) {
        buffer.writeDate(timestamp);
        buffer.writeInteger(timestamp.getNanos());
    }
    _writeTime(buffer, time) {
        const midnight = new Date(time);
        midnight.setHours(0, 0, 0, 0);
        buffer.writeLong(time.getTime() - midnight.getTime());
    }
    _writeArray(buffer, array, arrayType, arrayTypeCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const elementType = BinaryUtils_1.default.getArrayElementType(arrayType);
            const keepElementType = BinaryUtils_1.default.keepArrayElementType(arrayTypeCode);
            if (arrayTypeCode === BinaryUtils_1.default.TYPE_CODE.OBJECT_ARRAY) {
                buffer.writeInteger(elementType instanceof ObjectType_1.ComplexObjectType ?
                    BinaryType_1.default._calculateId(elementType.typeName) : -1);
            }
            buffer.writeInteger(array.length);
            for (let elem of array) {
                yield this.writeObject(buffer, elem, elementType, keepElementType);
            }
        });
    }
    _writeCollection(buffer, collection, collectionType) {
        return __awaiter(this, void 0, void 0, function* () {
            buffer.writeInteger(collection instanceof Set ? collection.size : collection.length);
            buffer.writeByte(collectionType._subType);
            for (let element of collection) {
                yield this.writeObject(buffer, element, collectionType._elementType);
            }
        });
    }
    _writeMap(buffer, map, mapType) {
        return __awaiter(this, void 0, void 0, function* () {
            buffer.writeInteger(map.size);
            buffer.writeByte(mapType._subType);
            for (let [key, value] of map.entries()) {
                yield this.writeObject(buffer, key, mapType._keyType);
                yield this.writeObject(buffer, value, mapType._valueType);
            }
        });
    }
    _writeBinaryObject(buffer, binaryObject) {
        return __awaiter(this, void 0, void 0, function* () {
            buffer.position = buffer.position - 1;
            yield binaryObject._write(this, buffer);
        });
    }
    _writeComplexObject(buffer, object, objectType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._writeBinaryObject(buffer, yield BinaryObject_1.BinaryObject.fromObject(object, objectType));
        });
    }
}
exports.default = BinaryCommunicator;
//# sourceMappingURL=BinaryCommunicator.js.map