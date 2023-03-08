import { ResponseFunctionType, ResponseTextFunctionType } from '.';
import { IncomingMessageType, ServerResponseType } from '../Routing/types';
import type { StatusCodes } from './statusCodes';
export interface IOptions {
    statusCode?: StatusCodes;
    contentType?: string;
    isJSON?: boolean;
}
export interface IResult {
    value: unknown;
    statusCode: StatusCodes;
    contentType: string;
}
export type ResponseHandlerType = (request: IncomingMessageType, response: ServerResponseType, meta: any) => void;
export type IMethodDecorator<T> = (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>;
export type ResponseFunctionTypeDescriptor = IMethodDecorator<ResponseFunctionType>;
export type ResponseTextFunctionTypeDescriptor = IMethodDecorator<ResponseTextFunctionType>;
//# sourceMappingURL=types.d.ts.map