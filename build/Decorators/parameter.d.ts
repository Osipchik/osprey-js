/**
 * Parse request body
 */
export declare function Body(target: Object, key: string, index: any): void;
/**
 * Get parameter by key
 *
 * @param {string} paramKey - Specified key.
 */
export declare function Param(paramKey: string): (target: Object, key: string, index: any) => void;
/**
 * Get parameters as object
 */
export declare function Params(target: Object, key: string, index: any): void;
/**
 * Get query parameters as object
 */
export declare function Query(target: Object, key: string, index: any): void;
//# sourceMappingURL=parameter.d.ts.map