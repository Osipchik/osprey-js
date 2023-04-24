import {ActionFilterKeys} from './Decorators/ActionFilters/utils';
import Router from './Routing';
import { isAsyncFunction } from './utils/helpers';
import MetaStore from './utils/metaStore';
import type {RequestHandlerType} from './Routing/types';
import type {IncomingMessageType, ParamsType, ResponseHandlerType, ServerResponseType} from './Routing/types';
import type { ActionHandlerType } from './Decorators/ActionFilters/types';
import type { PipelineDescriptorType } from './types';

const filterTypes = [
  ActionFilterKeys.AUTHORISATION,
  ActionFilterKeys.RESOURCE,
  ActionFilterKeys.ACTION_BEFORE,
  ActionFilterKeys.ACTION_AFTER,
  ActionFilterKeys.EXCEPTION,
];

export default class Pipeline {
  registerMethod(method: ResponseHandlerType, filters: any, controllerFilters: any): void {
    let counter = 0;
    while (counter < filterTypes.length) {
      const filter = filters[filterTypes[counter]] || [];
      const controllerFilter = controllerFilters ? controllerFilters[filterTypes[counter]] || [] : [];
      filters[filterTypes[counter]] = [ ...controllerFilter, ...filter ];

      counter++;
    }

    this.setExceptionHandler(filters, method);
    const handlers = this.concatHandlers(filters, method);

    const routeHandler: RequestHandlerType = this.createMethodHandler(handlers);

    Router.addRoute(routeHandler, filters.meta);
  }

  private setExceptionHandler(filters: any, method: ResponseHandlerType) {
    let hasAsync = false;
    const key = ActionFilterKeys.EXCEPTION;
    let exceptionHandlers = [];

    if (filters.hasOwnProperty(key) && filters[key].length) {
      const isAsync = isAsyncFunction(filters[key][0]);
      hasAsync = hasAsync || isAsync;

      exceptionHandlers.push({
        handler: filters[key][0],
        isAsync,
      });
    }

    if (exceptionHandlers.length) {
      MetaStore.addMeta(method, 'catch', exceptionHandlers[0])
    }
  }

  private createMethodHandler(handlers: PipelineDescriptorType[]) {
    const methods: Function[] = [];
    const methodStatuses: Boolean[] = [];

    handlers.forEach(({ handler, isAsync }) => {
      methods.push(handler);
      methodStatuses.push(isAsync);
    });

    return async (
      request: IncomingMessageType,
      response: ServerResponseType,
      args?: ParamsType,
    ): Promise<void> => {
      let counter = methods.length - 1;
      while (counter > 0) {

        if (methodStatuses[counter] === true) {
          counter -= await methods[counter](request, response, args);
        } else {
          counter -= methods[counter](request, response, args);
        }
      }
    }
  }

  private concatHandlers(filters: any, method: ResponseHandlerType) {
    return filterTypes.reduce((acc, key) => {
      if (key === ActionFilterKeys.ACTION_AFTER) {
        const isAsync = isAsyncFunction(method);

        acc.push({
          type: 'method',
          handler: method,
          isAsync,
        });
      }

      if (filters.hasOwnProperty(key) && filters[key].length) {
        filters[key].forEach((filter: ActionHandlerType) => {
          const isAsync = isAsyncFunction(filter);

          acc.push({
            type: key,
            handler: filter,
            isAsync,
          });
        });
      }

      return acc;
    }, [] as PipelineDescriptorType[]).reverse();
  }
}
