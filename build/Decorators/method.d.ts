import { RequestHandlerType } from '../Routing/types';
export type asyncHandlerType = (classContext: any) => RequestHandlerType;
export declare function Get(path?: string): MethodDecorator;
export declare function Put(path?: string): MethodDecorator;
export declare function Post(path?: string): MethodDecorator;
export declare function Delete(path?: string): MethodDecorator;
export declare function Patch(path?: string): MethodDecorator;
export declare function Trace(path?: string): MethodDecorator;
export declare function Options(path?: string): MethodDecorator;
export declare function Head(path?: string): MethodDecorator;
//# sourceMappingURL=method.d.ts.map