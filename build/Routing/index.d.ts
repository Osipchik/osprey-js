import { RoadRunner } from '@parisholley/road-runner';
import { RequestHandlerType, HandlerMetaType, IncomingMessageType, RouteValueType, IErrorRouter } from '../Routing/types';
declare class Router {
    static readonly router: RoadRunner<unknown>;
    static readonly errorHandlers: IErrorRouter;
    static addRoute(handler: RequestHandlerType, { method, prefix, path }: HandlerMetaType): void;
    getRequestHandler(request: IncomingMessageType): RouteValueType;
}
export default Router;
//# sourceMappingURL=index.d.ts.map