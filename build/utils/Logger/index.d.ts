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
declare function Log(message: string): void;
declare namespace Log {
    var error: (message: string, title?: string | undefined) => void;
    var warn: (message: string, title?: string | undefined) => void;
    var info: (message: string, title?: string | undefined) => void;
    var success: (message: string, title?: string | undefined) => void;
    var put: (message: string, title?: string | undefined) => void;
    var patch: (message: string, title?: string | undefined) => void;
    var data: (message: string, title?: string | undefined) => void;
}
declare const _default: Log;
export default _default;
