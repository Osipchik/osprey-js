/// <reference types="node" />
import http from 'http';
import ServerErrorHandler from '@/Routing/ErrorHandlers/ServerErrorHandler';
import NotFoundHandler from '@/Routing/ErrorHandlers/NotFoundHandler';
import MethodNotAllowedHandler from '@/Routing/ErrorHandlers/MethodNotAllowedHandler';
import NotImplementedHandler from '@/Routing/ErrorHandlers/NotImplementedHandler';
export type IncomingMessageType = http.IncomingMessage;
export type ServerResponseType = http.ServerResponse;
export type methodsTypes = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'TRACE' | 'PATCH';
export type RequestHandlerType = (request: IncomingMessageType, response: ServerResponseType) => void;
export type RouteValueType = {
    handler: Function;
    params?: object;
};
export type HandlerMetaType = {
    method: methodsTypes;
    path: string;
    prefix?: string;
    query?: string;
};
export type MetaHandlerType = RequestHandlerType & {
    meta?: HandlerMetaType;
};
export type routeType = {
    [key: string]: RequestHandlerType;
};
export interface IErrorRouter {
    ServerError: typeof ServerErrorHandler;
    NotFound: typeof NotFoundHandler;
    MethodNotAllowed: typeof MethodNotAllowedHandler;
    NotImplemented: typeof NotImplementedHandler;
}
export interface ICommonRouter {
    GET: routeType;
    HEAD: routeType;
    POST: routeType;
    PUT: routeType;
    DELETE: routeType;
    CONNECTS: routeType;
    OPTIONS: routeType;
    TRACE: routeType;
    PATCH: routeType;
}
export type IRoute = IErrorRouter & ICommonRouter;
//# sourceMappingURL=types.d.ts.map