/** Utility class for logging errors and debug messages. */
export default class Logger {
    private static _debug;
    static get debug(): boolean;
    static set debug(value: boolean);
    static logDebug(data: string, ...args: any[]): void;
    static logError(data: string, ...args: any[]): void;
}
//# sourceMappingURL=Logger.d.ts.map