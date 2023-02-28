import MiddlewareError from '../utils/Error/MiddlewareError';
import { PreHandler, PreHandlerAsync } from '..//Middleware/type';
import { IncomingMessageType, ServerResponseType } from '../Routing/types';

class Middleware {
  static readonly middlewares: PreHandler[] = [];
  static readonly asyncMiddlewares: PreHandlerAsync[] = [];

  runMiddlewaresSync(
    request: IncomingMessageType,
    response: ServerResponseType,
  ): void {
    const next = (error?: unknown): void => {
      if (error instanceof Error) {
        throw MiddlewareError(error.message, 'Middleware');
      }
    }

    for (const middleware of Middleware.middlewares) {
      middleware(request, response, next)
    }
  }

  static use(preHandler: PreHandler) {
    Middleware.middlewares.push(preHandler);
  }
}

export default Middleware;
module.exports = Middleware;
