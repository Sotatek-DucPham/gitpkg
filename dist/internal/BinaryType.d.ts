import { ComplexObjectType } from "../ObjectType";
import BinaryCommunicator from "./BinaryCommunicator";
export default class BinaryType {
    private _id;
    private _fields;
    private _schemas;
    private _name;
    private _isEnum;
    private _enumValues;
    constructor(name: string);
    get id(): number;
    set id(val: number);
    get name(): string;
    get fields(): BinaryField[];
    getField(fieldId: any): BinaryField;
    hasField(fieldId: any): boolean;
    removeField(fieldId: number): boolean;
    setField(field: BinaryField): void;
    hasSchema(schemaId: number): boolean;
    addSchema(schema: BinarySchema): void;
    getSchema(schemaId: number): BinarySchema;
    merge(binaryType: any, binarySchema: any): void;
    clone(): BinaryType;
    isValid(): boolean;
    get enumValues(): [string, number][];
    get isEnum(): boolean;
    static _calculateId(name: any): number;
    _write(buffer: any): Promise<void>;
    _writeEnum(buffer: any): Promise<void>;
    _read(buffer: any): Promise<void>;
    _readEnum(buffer: any): Promise<void>;
}
export declare class BinarySchema {
    private _id;
    private _fieldIds;
    private _isValid;
    constructor();
    get id(): number;
    get fieldIds(): number[];
    finalize(): void;
    clone(): BinarySchema;
    addField(fieldId: any): void;
    removeField(fieldId: any): void;
    hasField(fieldId: any): boolean;
    static _schemaInitialId(): number;
    static _updateSchemaId(schemaId: any, fieldId: any): any;
    static _updateSchemaIdPart(schemaId: any, fieldIdPart: any): any;
    _write(buffer: any): Promise<void>;
    _read(buffer: any): Promise<void>;
}
export declare class BinaryField {
    private _name;
    private _id;
    private _typeCode;
    constructor(name: string, typeCode: number);
    get id(): number;
    get name(): string;
    get typeCode(): number;
    isValid(): boolean;
    static _calculateId(name: any): number;
    _write(buffer: any): Promise<void>;
    _read(buffer: any): Promise<void>;
}
export declare class BinaryTypeBuilder {
    private _schema;
    private _type;
    private _fromStorage;
    static fromTypeName(typeName: any): BinaryTypeBuilder;
    static fromTypeId(communicator: BinaryCommunicator, typeId: number, schemaId: number): Promise<BinaryTypeBuilder>;
    static fromObject(jsObject: any, complexObjectType?: any): BinaryTypeBuilder;
    static fromComplexObjectType(complexObjectType: ComplexObjectType, jsObject: object): BinaryTypeBuilder;
    getTypeId(): number;
    getTypeName(): string;
    getSchemaId(): number;
    getFields(): BinaryField[];
    getField(fieldId: any): BinaryField;
    get schema(): BinarySchema;
    setField(fieldName: any, fieldTypeCode?: any): void;
    removeField(fieldName: any): void;
    finalize(communicator: any): Promise<void>;
    constructor();
    _fromComplexObjectType(complexObjectType: any, jsObject: any): void;
    _init(typeName: any): void;
    _beforeModify(): void;
    _setFields(complexObjectType: any, objectTemplate: any, jsObject: any): void;
}
//# sourceMappingURL=BinaryType.d.ts.map