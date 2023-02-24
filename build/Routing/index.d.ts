import { RoadRunner } from '@parisholley/road-runner';
import NotImplementedHandler from '../Routing/ErrorHandlers/NotImplementedHandler';
import ServerErrorHandler from '../Routing/ErrorHandlers/ServerErrorHandler';
import MethodNotAllowedHandler from '../Routing/ErrorHandlers/MethodNotAllowedHandler';
import NotFoundHandler from '../Routing/ErrorHandlers/NotFoundHandler';
import { RequestHandlerType, IRoute, HandlerMetaType, IncomingMessageType, RouteValueType } from '../Routing/types';
declare class Router {
    static ServerError: typeof ServerErrorHandler;
    static NotFound: typeof NotFoundHandler;
    static MethodNotAllowed: typeof MethodNotAllowedHandler;
    static NotImplemented: typeof NotImplementedHandler;
    static readonly router: RoadRunner<unknown>;
    static readonly routeHandlers: IRoute;
    static addRoute(handler: RequestHandlerType, { method, prefix, path }: HandlerMetaType): void;
    getRequestHandler(request: IncomingMessageType): RouteValueType;
}
export default Router;
