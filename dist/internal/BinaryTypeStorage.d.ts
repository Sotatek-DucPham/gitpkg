import BinaryType, { BinarySchema } from "./BinaryType";
import { ComplexObjectType } from "../ObjectType";
export default class BinaryTypeStorage {
    private _communicator;
    private _types;
    private static _complexObjectTypes;
    constructor(communicator: any);
    static getByComplexObjectType(complexObjectType: ComplexObjectType): [BinaryType, BinarySchema];
    static setByComplexObjectType(complexObjectType: ComplexObjectType, type: BinaryType, schema: BinarySchema): void;
    static get complexObjectTypes(): Map<ComplexObjectType, [BinaryType, BinarySchema]>;
    addType(binaryType: BinaryType, binarySchema: BinarySchema): Promise<void>;
    getType(typeId: number, schemaId?: any): Promise<BinaryType>;
    /** Private methods */
    _getBinaryType(typeId: number): Promise<BinaryType>;
    _putBinaryType(binaryType: any): Promise<void>;
}
//# sourceMappingURL=BinaryTypeStorage.d.ts.map