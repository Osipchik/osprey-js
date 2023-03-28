import { IOptions, ResponseHandlerType } from './types';
export type ResponseFunctionType = (result: unknown, options?: IOptions) => ResponseHandlerType;
export type ResponseTextFunctionType = (result: string, options?: IOptions) => ResponseHandlerType;
interface IResponse {
    Ok: ResponseFunctionType;
    Created: ResponseFunctionType;
    PartialContent: ResponseFunctionType;
    BadRequest: ResponseFunctionType;
    NotFound: ResponseFunctionType;
    NoContent: ResponseFunctionType;
    InternalServerError: ResponseFunctionType;
    NotImplemented: ResponseFunctionType;
    Accepted: ResponseTextFunctionType;
}
declare const Response: IResponse;
export default Response;
//# sourceMappingURL=index.d.ts.map