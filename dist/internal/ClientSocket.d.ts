/// <reference types="long" />
/// <reference types="node" />
import BinaryCommunicator from "./BinaryCommunicator";
import MessageBuffer from "./MessageBuffer";
import { IgniteClientConfiguration } from "../IgniteClientConfiguration";
declare class ProtocolVersion {
    private _major;
    private _minor;
    private _patch;
    constructor(major?: any, minor?: any, patch?: any);
    compareTo(other: any): number;
    equals(other: any): boolean;
    toString(): string;
    read(buffer: any): void;
    write(buffer: any): void;
}
export declare enum STATE {
    INITIAL = 0,
    HANDSHAKE = 1,
    CONNECTED = 2,
    DISCONNECTED = 3
}
export default class ClientSocket {
    private _socket;
    private _host;
    private _buffer;
    private _requests;
    private _nodeUuid;
    private _error;
    private _endpoint;
    private _config;
    private _communicator;
    private _onSocketDisconnect;
    private _onAffinityTopologyChange;
    private _state;
    private _requestId;
    private _offset;
    private _wasConnected;
    private _handshakeRequestId;
    private _protocolVersion;
    private _port;
    private _version;
    constructor(endpoint: string, config: IgniteClientConfiguration, communicator: BinaryCommunicator, onSocketDisconnect: Function, onAffinityTopologyChange: Function);
    connect(): Promise<unknown>;
    disconnect(): void;
    get requestId(): import("long").Long;
    get endpoint(): string;
    get nodeUUID(): string;
    sendRequest(opCode: any, payloadWriter: any, payloadReader?: any): Promise<unknown>;
    _connectSocket(handshakeRequest: any): void;
    _addRequest(request: Request): void;
    _sendRequest(request: Request): Promise<void>;
    _processResponse(message: Buffer): Promise<void>;
    _finalizeHandshake(buffer: MessageBuffer, request: Request): Promise<void>;
    _finalizeResponse(buffer: MessageBuffer, request: Request): Promise<void>;
    _handshakePayloadWriter(payload: any): Promise<void>;
    _getHandshake(version: ProtocolVersion, resolve: Function, reject: Function): Request;
    _isSupportedVersion(protocolVersion: any): boolean;
    _disconnect(close?: boolean, callOnDisconnect?: boolean): void;
    _parseEndpoint(endpoint: any): void;
    _logMessage(requestId: any, isRequest: any, message: any): void;
}
declare class Request {
    private _id;
    private _resolve;
    private _reject;
    private _payloadWriter;
    private _opCode;
    private _payloadReader;
    constructor(id: Long, opCode: any, payloadWriter: any, payloadReader: any, resolve: Function, reject: Function);
    get id(): Long;
    get payloadReader(): Function;
    get resolve(): Function;
    get reject(): Function;
    getMessage(): Promise<Buffer>;
}
export {};
//# sourceMappingURL=ClientSocket.d.ts.map