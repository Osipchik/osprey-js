import { ActionFilterKeys } from './Decorators/actionFilters/utils';
import Router from './Routing';
import { getSyncAndAsyncLists, isAsyncFunction } from './utils/helpers';
import type { RequestHandlerType } from './Routing/types';
import { IncomingMessageType, ParamsType, ServerResponseType } from './Routing/types';

export default class Pipeline {
  registerMethod(method: RequestHandlerType, filters: any) {
    const { handlers, hasAsync } = this.getFilterHandlers(filters, method);

    let routeHandler: RequestHandlerType;

    if (hasAsync) {
      routeHandler = async (
        request: IncomingMessageType,
        response: ServerResponseType,
        args?: ParamsType,
      ) => {
        for (const { isAsync, handler } of handlers) {
          if (isAsync) {
            await handler(request, response, args);
          } else {
            handler(request, response, args);
          }
        }
      }
    } else {
      routeHandler = (
        request: IncomingMessageType,
        response: ServerResponseType,
        args?: ParamsType,
      ) => {
        for (const { handler } of handlers) {
          handler(request, response, args);
        }
      }
    }


    Router.addRoute(routeHandler, filters.meta);
  }

  private getFilterHandlers(filters: any, method: RequestHandlerType) {
    const order = [
      ActionFilterKeys.AUTHORISATION,
      ActionFilterKeys.ACTION_BEFORE,
      ActionFilterKeys.ACTION_AFTER,
    ];

    let hasAsync = false;

    const handlers =  order.reduce((acc, key) => {
      if (key === ActionFilterKeys.ACTION_AFTER) {
        const isAsync = isAsyncFunction(method);
        hasAsync = hasAsync || isAsync;

        acc.push({
          handler: method,
          isAsync,
        });
      }

      if (filters.hasOwnProperty(key)) {
        const handler = this.getFiltersHandler(filters[key]);
        const isAsync = isAsyncFunction(method);
        hasAsync = hasAsync || isAsync;

        acc.push({
          handler,
          isAsync,
        });
      }

      return acc;
    }, [] as any[]);

    return {
      handlers,
      hasAsync,
    };
  }

  private getFiltersHandler(filters?: Function[]) {
    if (!filters) {
      return undefined;
    }

    const { asyncValues, syncValues } = getSyncAndAsyncLists(filters);

    if (syncValues.length && !asyncValues.length) {
      return this.PrepareSyncFilters(syncValues);
    } else if (!syncValues.length && asyncValues.length) {
      return this.PrepareAsyncFilters(asyncValues);
    } else {
      return this.PrepareMixedFilters(asyncValues, syncValues);
    }
  }

  private PrepareSyncFilters(syncValues: Function[]) {
    return (
      request: IncomingMessageType,
      response: ServerResponseType,
      args?: ParamsType,
    ): void => {
      for (const handler of syncValues) {
        handler(request, args);
      }
    }
  }

  private PrepareAsyncFilters(asyncValues: Function[]) {
    return async (
      request: IncomingMessageType,
      response: ServerResponseType,
      args?: ParamsType,
    ): Promise<Awaited<any>> => {
      return Promise.all(asyncValues.map((handler) => handler(request, args)));
    }
  }

  private PrepareMixedFilters(asyncValues: Function[], syncValues: Function[]) {
    return async (
      request: IncomingMessageType,
      response: ServerResponseType,
      args?: ParamsType,
    ): Promise<Awaited<any>> => {
      const handlerPromise = asyncValues.map((handler) => handler(request, args));

      for (const handler of syncValues) {
        handler(request, args);
      }

      await Promise.all(handlerPromise);
    }
  }
}
