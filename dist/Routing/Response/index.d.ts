import { IOptions, ResponseHandlerType } from './types';
type ResponseFunctionType = (result: unknown, options?: IOptions) => ResponseHandlerType;
type ResponseTextFunctionType = (result: string, options?: IOptions) => ResponseHandlerType;
interface IResponse {
    Ok: ResponseFunctionType;
    Created: ResponseFunctionType;
    PartialContent: ResponseFunctionType;
    BadRequest: ResponseFunctionType;
    NotFound: ResponseFunctionType;
    InternalServerError: ResponseFunctionType;
    NotImplemented: ResponseFunctionType;
    Accepted: ResponseTextFunctionType;
}
export declare const Response: IResponse;
export {};
//# sourceMappingURL=index.d.ts.map