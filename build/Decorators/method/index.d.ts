import { IMethodDecorator } from '../../Response/types';
/**
 * Routes HTTP GET requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Get(path?: string): IMethodDecorator;
/**
 * Routes HTTP Put requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Put(path?: string): IMethodDecorator;
/**
 * Routes HTTP Post requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Post(path?: string): IMethodDecorator;
/**
 * Routes HTTP Delete requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Delete(path?: string): IMethodDecorator;
/**
 * Routes HTTP Patch requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Patch(path?: string): IMethodDecorator;
/**
 * Routes HTTP Trace requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Trace(path?: string): IMethodDecorator;
/**
 * Routes HTTP Options requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Options(path?: string): IMethodDecorator;
/**
 * Routes HTTP Head requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export declare function Head(path?: string): IMethodDecorator;
//# sourceMappingURL=index.d.ts.map