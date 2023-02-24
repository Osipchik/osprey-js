import { StatusCodes } from '../../utils/StatusCodes';
export declare function Get(path: string, statusCode?: StatusCodes): MethodDecorator;
export declare function Put(path: string, statusCode?: StatusCodes): MethodDecorator;
export declare function Post(path: string, statusCode?: StatusCodes): MethodDecorator;
export declare function Delete(path: string, statusCode?: StatusCodes): MethodDecorator;
export declare function Patch(path: string, statusCode?: StatusCodes): MethodDecorator;
export declare function Trace(path: string, statusCode?: StatusCodes): MethodDecorator;
export declare function Options(path: string, statusCode?: StatusCodes): MethodDecorator;
export declare function Head(path: string, statusCode?: StatusCodes): MethodDecorator;
