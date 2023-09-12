import ServerErrorHandler from '../Routing/ErrorHandlers/ServerErrorHandler';
import NotFoundHandler from '../Routing/ErrorHandlers/NotFoundHandler';
import MethodNotAllowedHandler from '../Routing/ErrorHandlers/MethodNotAllowedHandler';
import NotImplementedHandler from '../Routing/ErrorHandlers/NotImplementedHandler';
import CustomErrorHandler from '@/Routing/ErrorHandlers/CustomErrorHandler';
import { Methods } from '../Routing/methods';

export type AsyncHandlerType = (controllerContext: any) => ResponseHandlerType;

export type ResponseHandlerType = (
  request: Request,
  args?: ParamsType,
) => Promise<unknown> | unknown;

export type RequestHandlerType = (
  request: Request,
  args?: ParamsType,
) => Promise<Response> | Response;

export type ParamsType = {
  params: object | undefined;
  query: object | undefined;
  error: unknown | undefined;
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
  CustomError: typeof CustomErrorHandler,
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
