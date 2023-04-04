type printType = (message: string, title?: string) => void;
interface ILogger {
    error: printType;
    warn: printType;
    info: printType;
    success: printType;
    put: printType;
    patch: printType;
    data: printType;
}
type Log = ILogger & ((message: string) => void);
declare function Log(message: string): Promise<void>;
declare namespace Log {
    var error: (message: string, title?: string | undefined) => Promise<unknown>;
    var warn: (message: string, title?: string | undefined) => Promise<unknown>;
    var info: (message: string, title?: string | undefined) => Promise<unknown>;
    var success: (message: string, title?: string | undefined) => Promise<unknown>;
    var put: (message: string, title?: string | undefined) => Promise<unknown>;
    var patch: (message: string, title?: string | undefined) => Promise<unknown>;
    var data: (message: string, title?: string | undefined) => Promise<unknown>;
}
declare const _default: Log;
export default _default;
//# sourceMappingURL=index.d.ts.map