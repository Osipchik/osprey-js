import { RequestHandlerType, ParamsType } from '../Routing/types';
import type { ResponseFunctionTypeDescriptor, ResponseTextFunctionTypeDescriptor } from '../Response/types';
export type AsyncHandlerType = (props: ParamsType) => RequestHandlerType;
/**
 * Routes HTTP GET requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Get(path?: string): ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
/**
 * Routes HTTP Put requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Put(path?: string): ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
/**
 * Routes HTTP Post requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Post(path?: string): ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
/**
 * Routes HTTP Delete requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Delete(path?: string): ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
/**
 * Routes HTTP Patch requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Patch(path?: string): ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
/**
 * Routes HTTP Trace requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Trace(path?: string): ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
/**
 * Routes HTTP Options requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Options(path?: string): ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
/**
 * Routes HTTP Head requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Head(path?: string): ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
//# sourceMappingURL=method.d.ts.map