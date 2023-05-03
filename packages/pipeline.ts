import Router from '@/Routing';
import { ActionFilterKeys } from '@/Decorators/ActionFilters/utils';
import CustomErrorHandler from '@/Routing/ErrorHandlers/CustomErrorHandler';
import { isAsyncFunction } from '@/utils/helpers';
import MetaStore, { MetaStoreKeys } from '@/utils/metaStore';

import type { RequestHandlerType } from '@/Routing/types';
import type { IncomingMessageType, ParamsType, ResponseHandlerType, ServerResponseType } from '@/Routing/types';
import type { ActionHandlerType } from '@/Decorators/ActionFilters/types';
import type { PipelineDescriptorType, ErrorValueType } from '@/types';
import type { StatusCodes } from '@/Response/enums';

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
    const key = ActionFilterKeys.EXCEPTION;
    let exceptionHandlers = [];

    if (filters.hasOwnProperty(key) && filters[key].length) {
      const isAsync = isAsyncFunction(filters[key][0]);

      exceptionHandlers.push({
        handler: filters[key][0],
        isAsync,
      });
    }

    if (exceptionHandlers.length) {
      MetaStore.addMeta(method, MetaStoreKeys.catch, exceptionHandlers[0])
    }
  }

  private createMethodHandler(handlers: PipelineDescriptorType[]) {
    const methods: Function[] = [];
    const methodStatuses: Boolean[] = [];

    handlers.forEach(({ handler, isAsync }) => {
      methods.push(handler);
      methodStatuses.push(isAsync);
    });

    let errorValue: null | ErrorValueType = null;

    const breakLoop = (message: string, statusCode: StatusCodes) => {
      errorValue = {
        message,
        statusCode,
      };
    };

    return async (
      request: IncomingMessageType,
      response: ServerResponseType,
      args?: ParamsType,
    ): Promise<void> => {
      let counter = methods.length;

      while (counter > 1 && errorValue === null) {
        counter--;

        if (methodStatuses[counter] === true) {
          await methods[counter](request, response, breakLoop);
        } else {
          methods[counter](request, response, breakLoop);
        }
      }

      if (errorValue === null) {
        methods[0](request, response, args);
      } else {
        CustomErrorHandler(request, response, errorValue);
      }
    }
  }

  private concatHandlers(filters: any, method: ResponseHandlerType) {
    return filterTypes.reduce((acc, key) => {
      if (key === ActionFilterKeys.ACTION_AFTER) {
        const isAsync = isAsyncFunction(method);

        acc.reverse();
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

  private handleError() {
    throw new Error('some error');
  }
}
