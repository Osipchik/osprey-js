import http from 'http';
import ServerErrorHandler from '../Routing/ErrorHandlers/ServerErrorHandler';
import NotFoundHandler from '../Routing/ErrorHandlers/NotFoundHandler';
import MethodNotAllowedHandler from '../Routing/ErrorHandlers/MethodNotAllowedHandler';
import NotImplementedHandler from '../Routing/ErrorHandlers/NotImplementedHandler';
import { Methods } from '../Routing/methods';

export type IncomingMessageType = http.IncomingMessage;
export type ServerResponseType = http.ServerResponse;

export type ActionHandlerType = (request: IncomingMessageType, args?: ParamsType) => void;
export type ActionAuthorisationHandlerType = (request: IncomingMessageType, args?: ParamsType) => boolean;

export type AsyncHandlerType = (controllerContext: any) => RequestHandlerType;

export type RequestHandlerType = (
  request: IncomingMessageType,
  response: ServerResponseType,
  args?: ParamsType,
) => Promise<void> | void;

export type ParamsType = {
  params: object | undefined;
  query: object | undefined;
};

export type RouteValueType = {
  handler: RequestHandlerType,
  params?: object,
}

export type HandlerMetaType = {
  method: Methods,
  path: string,
  prefix?: string,
  query?: string,
}

export type MetaHandlerType = RequestHandlerType & {
  meta?: HandlerMetaType
};

export type routeType = ObjectT<RequestHandlerType>;

export type ObjectT<T> = {
  [key: number | string]: T;
}

export interface IErrorRouter {
  ServerError: typeof ServerErrorHandler,
  NotFound: typeof NotFoundHandler,
  MethodNotAllowed: typeof MethodNotAllowedHandler,
  NotImplemented: typeof NotImplementedHandler,
}

export interface ICommonRouter {
  GET: routeType,
  HEAD: routeType,
  POST: routeType,
  PUT: routeType,
  DELETE: routeType,
  CONNECTS: routeType,
  OPTIONS: routeType,
  TRACE: routeType,
  PATCH: routeType,
}

export type IRoute = IErrorRouter & ICommonRouter;
