type PathArgsType = {
    path: string;
    prefix?: string;
    property?: string;
    query?: string;
};
export declare function normalizePath({ prefix, path, property, query }: PathArgsType): string;
export declare function addSlash(param?: string): string;
export declare function isPrimitive(value: any): boolean;
export declare function isPromise(value: any): boolean;
export declare function isAsyncFunction(value: Function): boolean;
export declare function normalizeSlash(value: string): string;
export declare function getPath(prefix?: string, pathName?: string): {
    pathName: string;
    prefix: string;
    props: string[];
};
export declare function isVarName(name: string): boolean;
export {};
//# sourceMappingURL=helpers.d.ts.map