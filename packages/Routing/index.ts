import { RoadRunner } from '@parisholley/road-runner';
import NotImplementedHandler from '../Routing/ErrorHandlers/NotImplementedHandler';
import ServerErrorHandler from '../Routing/ErrorHandlers/ServerErrorHandler';
import MethodNotAllowedHandler from '../Routing/ErrorHandlers/MethodNotAllowedHandler';
import NotFoundHandler from '../Routing/ErrorHandlers/NotFoundHandler';
import {
  RequestHandlerType,
  HandlerMetaType,
  RouteValueType,
  IErrorRouter,
} from '../Routing/types';
import { getPath } from '../utils/helpers';
import Logger from '../utils/Logger';
import { Methods } from '../Routing/methods';
import CustomErrorHandler from '@/Routing/ErrorHandlers/CustomErrorHandler';

/**
 * Internal Class that maintain app routes
 */
class Router {
  static readonly router = new RoadRunner();

  static readonly errorHandlers: IErrorRouter = {
    ServerError: ServerErrorHandler,
    NotFound: NotFoundHandler,
    MethodNotAllowed: MethodNotAllowedHandler,
    NotImplemented: NotImplementedHandler,
    CustomError: CustomErrorHandler,
  };

  /**
   * Register route
   *
   * @param {RequestHandlerType} handler - route handler.
   * @param {HandlerMetaType} { method, prefix, path } - handler meta for internal use.
   *
   */
  static addRoute(handler: RequestHandlerType, { method, prefix, path }: HandlerMetaType): void {
    const { pathName } = getPath(prefix, path);

    switch (method) {
      case Methods.GET: Logger.info(pathName, method); break;
      case Methods.POST: Logger.warn(pathName, method); break;
      case Methods.DELETE: Logger.error(pathName, method); break;
      case Methods.PATCH: Logger.patch(pathName, method); break;
      case Methods.PUT: Logger.put(pathName, method); break;
      default: Logger.data(pathName, method);
    }

    Router.router.addRoute(method, pathName, handler);
  }


  /**
   * Find handler by it url or handle error
   *
   * @param {Request} request - obtained request.
   *
   */
  getRequestHandler(request: Request): RouteValueType {
    if (request.method !== undefined) {
      const url = new URL(request.url);
      const route = Router.router.findRoute(request.method, url.pathname);

      if (route !== null) {
        const payload = {
          params: route.params,
        };

        return {
          handler: route.value as RequestHandlerType,
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
