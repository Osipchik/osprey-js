import { ActionFilterKeys } from './Decorators/actionFilters/utils';
import Router from './Routing';
import { getSyncAndAsyncLists, isAsyncFunction } from './utils/helpers';
import type {RequestHandlerType } from './Routing/types';
import { IncomingMessageType, ParamsType, ServerResponseType } from './Routing/types';
import MetaStore from './utils/metaStore';

const filterTypes = [
  ActionFilterKeys.AUTHORISATION,
  ActionFilterKeys.RESOURCE,
  ActionFilterKeys.ACTION_BEFORE,
  ActionFilterKeys.ACTION_AFTER,
  ActionFilterKeys.EXCEPTION,
];

export default class Pipeline {
  registerMethod(method: RequestHandlerType, filters: any, controllerFilters: any): void {
    for(const key of filterTypes) {
      const filter = filters[key] || [];
      const controllerFilter = controllerFilters[key] || [];
      filters[key] = [ ...controllerFilter, ...filter ];
    }

    this.setExceptionHandler(filters, method);
    const { handlers, hasAsync } = this.getFilterHandlers(filters, method);

    const routeHandler: RequestHandlerType = this.createMethodHandlers(handlers, hasAsync);

    Router.addRoute(routeHandler, filters.meta);
  }

  private setExceptionHandler(filters: any, method: RequestHandlerType) {
    let hasAsync = false;
    const key = ActionFilterKeys.EXCEPTION;
    let exceptionHandlers = [];

    if (filters.hasOwnProperty(key) && filters[key].length) {
      const handler = this.getFiltersHandler([filters[key][0]]);
      const isAsync = isAsyncFunction(handler);
      hasAsync = hasAsync || isAsync;

      exceptionHandlers.push({
        handler,
        isAsync,
      });
    }

    if (exceptionHandlers.length) {
      const exceptionHandler = this.createMethodHandlers(exceptionHandlers, hasAsync);
      MetaStore.addMeta(method, 'catch', exceptionHandler)
    }
  }

  private createMethodHandlers(handlers: any[], hasAsync: boolean) {
    if (hasAsync) {
      return async (
        request: IncomingMessageType,
        response: ServerResponseType,
        args?: ParamsType,
      ): Promise<void> => {
        for (const { isAsync, handler } of handlers) {
          if (isAsync) {
            await handler(request, response, args);
          } else {
            handler(request, response, args);
          }
        }
      }
    }

    return (
      request: IncomingMessageType,
      response: ServerResponseType,
      args?: ParamsType,
    ): void => {
      for (const { handler } of handlers) {
        handler(request, response, args);
      }
    }
  }

  private getFilterHandlers(filters: any, method: RequestHandlerType) {
    let hasAsync = false;

    const handlers =  filterTypes.reduce((acc, key) => {
      if (key === ActionFilterKeys.ACTION_AFTER) {
        const isAsync = isAsyncFunction(method);
        hasAsync = hasAsync || isAsync;

        acc.push({
          handler: method,
          isAsync,
        });
      }

      if (filters.hasOwnProperty(key) && filters[key].length) {
        const handler = this.getFiltersHandler(filters[key]);
        const isAsync = isAsyncFunction(handler);
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

  private getFiltersHandler(filters?: RequestHandlerType[]) {
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
