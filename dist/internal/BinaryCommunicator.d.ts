import { Timestamp } from "../Timestamp";
import { EnumItem } from "../EnumItem";
import BinaryTypeStorage from "./BinaryTypeStorage";
import Router from './Router';
import MessageBuffer from "./MessageBuffer";
import { AffinityHint } from "../CacheClient";
export default class BinaryCommunicator {
    private _router;
    private _typeStorage;
    constructor(router: Router);
    static readString(buffer: MessageBuffer): string | null;
    static writeString(buffer: MessageBuffer, value: string): void;
    send(opCode: any, payloadWriter: any, payloadReader?: any, affinityHint?: AffinityHint): Promise<void>;
    get typeStorage(): BinaryTypeStorage;
    readObject(buffer: any, expectedType?: any): any;
    readStringArray(buffer: any): Promise<any>;
    writeObject(buffer: any, object: any, objectType?: any, writeObjectType?: boolean): Promise<void>;
    _readTypedObject(buffer: any, objectTypeCode: any, expectedType?: any): any;
    _readUUID(buffer: any): any[];
    _readEnum(buffer: any): Promise<EnumItem>;
    _readDecimal(buffer: any): any;
    _readTimestamp(buffer: any): Timestamp;
    _readArray(buffer: any, arrayTypeCode: any, arrayType: any): Promise<any[]>;
    _readMap(buffer: any, expectedMapType: any): Promise<Map<any, any>>;
    _readCollection(buffer: any, expectedColType: any): Promise<any[] | Set<any>>;
    _readBinaryObject(buffer: any, expectedType: any): any;
    _readComplexObject(buffer: any, expectedType: any): Promise<any>;
    _writeUUID(buffer: any, value: any): void;
    _writeEnum(buffer: any, enumValue: any): Promise<void>;
    _writeDecimal(buffer: any, decimal: any): void;
    _writeTimestamp(buffer: any, timestamp: any): void;
    _writeTime(buffer: any, time: any): void;
    _writeArray(buffer: any, array: any, arrayType: any, arrayTypeCode: any): Promise<void>;
    _writeCollection(buffer: any, collection: any, collectionType: any): Promise<void>;
    _writeMap(buffer: any, map: any, mapType: any): Promise<void>;
    _writeBinaryObject(buffer: any, binaryObject: any): Promise<void>;
    _writeComplexObject(buffer: any, object: any, objectType: any): Promise<void>;
}
//# sourceMappingURL=BinaryCommunicator.d.ts.map