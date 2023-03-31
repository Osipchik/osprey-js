import { IncomingMessageType, ParamsType } from "@/Routing/types";
export type ParameterDecoratorHandlerType = (request: IncomingMessageType, params: ParamsType) => unknown;
/**
 * Create custom parameter decorator
 *
 * @param {function} handler - Param handler.
 */
export declare function CreateParamDecorator(handler: ParameterDecoratorHandlerType): ParameterDecorator;
/**
 * Parse request body
 */
export declare const Body: ParameterDecorator;
/**
 * Get parameter by key
 *
 * @param {string} paramKey - Specified key.
 */
export declare function Param(paramKey: string): ParameterDecorator;
/**
 * Get parameters as object
 */
export declare const Params: ParameterDecorator;
/**
 * Get query parameters as object
 */
export declare const Query: ParameterDecorator;
//# sourceMappingURL=index.d.ts.map