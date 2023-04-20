import {ActionFilterKeys} from './Decorators/ActionFilters/utils';
import Router from './Routing';
import {getSyncAndAsyncLists, isAsyncFunction} from './utils/helpers';
import type {RequestHandlerType} from './Routing/types';
import {IncomingMessageType, ParamsType, ServerResponseType} from './Routing/types';
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
    let counter = filterTypes.length;
    while (counter > 0) {
      counter--;

      const filter = filters[filterTypes[counter]] || [];
      const controllerFilter = controllerFilters ? controllerFilters[filterTypes[counter]] || [] : [];
      filters[filterTypes[counter]] = [ ...controllerFilter, ...filter ];
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
        let counter = handlers.length;
        while (counter > 0) {
          counter--;

          if (handlers[counter].isAsync === true) {
            await handlers[counter].handler(request, response, args);
          } else {
            handlers[counter].handler(request, response, args);
          }
        }
      }
    }

    return (
      request: IncomingMessageType,
      response: ServerResponseType,
      args?: ParamsType,
    ): void => {
      let counter = handlers.length;
      while (counter > 0) {
        counter--;

        handlers[counter].handler(request, response, args);
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
      let counter = 0;
      while (counter < syncValues.length) {
        syncValues[counter](request, args);
        counter++;
      }
    }
  }

  private PrepareAsyncFilters(asyncValues: Function[]) {
    return async (
      request: IncomingMessageType,
      response: ServerResponseType,
      args?: ParamsType,
    ): Promise<Awaited<any>> => {
      const handlerPromises = new Array(asyncValues.length);

      {
        let counter = 0;
        while (counter < asyncValues.length) {
          handlerPromises[counter] = asyncValues[counter](request, args);
          counter++;
        }
      }

      return Promise.all(handlerPromises);
    }
  }

  private PrepareMixedFilters(asyncValues: Function[], syncValues: Function[]) {
    return async (
      request: IncomingMessageType,
      response: ServerResponseType,
      args?: ParamsType,
    ): Promise<Awaited<any>> => {
      const handlerPromises = new Array(asyncValues.length);

      {
        let counter = 0;
        while (counter < asyncValues.length) {
          handlerPromises[counter] = asyncValues[counter](request, args);
          counter++;
        }
      }

      {
        let counter = 0;
        while (counter < syncValues.length) {
          syncValues[counter](request, args);
          counter++;
        }
      }

      await Promise.all(handlerPromises);
    }
  }
}
