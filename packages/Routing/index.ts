import { RoadRunner } from '@parisholley/road-runner';
import NotImplementedHandler from '../Routing/ErrorHandlers/NotImplementedHandler';
import ServerErrorHandler from '../Routing/ErrorHandlers/ServerErrorHandler';
import MethodNotAllowedHandler from '../Routing/ErrorHandlers/MethodNotAllowedHandler';
import NotFoundHandler from '../Routing/ErrorHandlers/NotFoundHandler';
import {
  RequestHandlerType,
  HandlerMetaType,
  IncomingMessageType,
  RouteValueType,
  IErrorRouter,
} from '../Routing/types';
import { getPath } from '../utils/helpers';
import Logger from '../utils/Logger';
import { DELETE, GET, PATCH, POST, PUT } from '../Routing/methods';
import { DefineQueryProperty, DefineBodyProperty } from '../utils/define';

class Router {
  static readonly router = new RoadRunner();

  static readonly errorHandlers: IErrorRouter = {
    ServerError: ServerErrorHandler,
    NotFound: NotFoundHandler,
    MethodNotAllowed: MethodNotAllowedHandler,
    NotImplemented: NotImplementedHandler,
  };

  static addRoute(handler: RequestHandlerType, { method, prefix, path }: HandlerMetaType): void {
    const { pathName } = getPath(prefix, path);

    switch (method) {
      case GET: Logger.info(pathName, method); break;
      case POST: Logger.warn(pathName, method); break;
      case DELETE: Logger.error(pathName, method); break;
      case PATCH: Logger.patch(pathName, method); break;
      case PUT: Logger.put(pathName, method); break;
      default: Logger.data(pathName, method);
    }

    Router.router.addRoute(method, pathName, handler);
  }

  getRequestHandler(request: IncomingMessageType): RouteValueType {
    if (request.method) {
      const [url, searchParams] = (request.url as string).split('?', 2);
      const route = Router.router.findRoute(request.method, url);

      if (route) {
        const payload = {
          params: route.params,
        };

        DefineQueryProperty(payload, searchParams);
        // @ts-ignore
        DefineBodyProperty(payload, request.body);

        return {
          handler: route.value as Function,
          params: payload,
        }
      }

      return {
        handler: Router.errorHandlers.NotFound,
      };
    }

    return {
      handler: Router.errorHandlers.NotImplemented,
    };
  }
}

export default Router;
module.exports = Router;
