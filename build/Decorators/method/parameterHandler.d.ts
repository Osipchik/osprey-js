import { ObjectT, ParamsType } from '../../Routing/types';
export default function GetParameterHandler(paramsParsers: ObjectT<Function>): {
    handler: (request: import("http").IncomingMessage, args?: ParamsType | undefined) => Promise<unknown[]>;
    isAsync: boolean;
} | {
    handler: (request: import("http").IncomingMessage, args?: ParamsType | undefined) => unknown[];
    isAsync: boolean;
} | null;
//# sourceMappingURL=parameterHandler.d.ts.map