import { IncomingMessageType, ParamsType, ServerResponseType } from '../Routing/types';
import type { StatusCodes } from './statusCodes';

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

type MethodDecoratorTargetType = (...args: any[]) => ResponseHandlerType;

export type IMethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<MethodDecoratorTargetType>) => TypedPropertyDescriptor<MethodDecoratorTargetType>;
