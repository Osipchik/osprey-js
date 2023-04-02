import { ObjectT, ParamsType } from '../../Routing/types';
export default function GetParameterHandler(paramsParsers: ObjectT<Function>): ((request: import("http").IncomingMessage, args?: ParamsType | undefined) => Promise<unknown[]>) | ((request: import("http").IncomingMessage, args?: ParamsType | undefined) => unknown[]) | null;
//# sourceMappingURL=parameterHandler.d.ts.map