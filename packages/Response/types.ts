import { IncomingMessageType, ParamsType, ServerResponseType } from '../Routing/types';
import type { StatusCodes } from './enums';

export interface IOptions {
  statusCode?: StatusCodes,
  contentType?: string,
  isJSON?: boolean,
};

export interface IResult {
  value: unknown,
  statusCode: StatusCodes,
  contentType: string,
};

export type ResponseHandlerType = (
  request: IncomingMessageType,
  response: ServerResponseType,
  meta: any,
) => void;

// type MethodDecoratorTargetType = (...args: any[]) => ResponseHandlerType;

type MethodDecoratorTargetType = (...args: any[]) => any;
type AsyncMethodDecoratorTargetType = (...args: any[]) => Promise<any> ;

export type IMethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<MethodDecoratorTargetType>,
) => TypedPropertyDescriptor<MethodDecoratorTargetType>;

export type IAsyncMethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<AsyncMethodDecoratorTargetType>,
) => TypedPropertyDescriptor<AsyncMethodDecoratorTargetType>;
