import Router from './Routing';
import { ActionFilterKeys } from './Decorators/ActionFilters/utils';
import { isAsyncFunction } from './utils/helpers';
import MetaStore, { MetaStoreKeys } from './utils/metaStore';
import type { RequestHandlerType } from './Routing/types';
import type { ParamsType, ResponseHandlerType } from './Routing/types';
import type { ActionHandlerType } from './Decorators/ActionFilters/types';
import type { PipelineDescriptorType, ErrorValueType, WrappedMethodMta } from './types';
import type { StatusCodes } from './Response/enums';

const filterTypes = [
  ActionFilterKeys.AUTHORISATION,
  ActionFilterKeys.RESOURCE,
  ActionFilterKeys.ACTION_BEFORE,
  ActionFilterKeys.ACTION_AFTER,
  ActionFilterKeys.EXCEPTION,
];

/**
 * Internal Class for combine decorators and methods into one method
 *
 */
export default class Pipeline {
  /**
   * Wrap API method, method decorators and controller decorators into one method
   *
   * @param {ResponseHandlerType} method - API method.
   * @param {any} methodMeta - Decorators that wrapped API method.
   * @param {WrappedMethodMta} controllerFilters - Common Controller decorator that applied API method.
   *
   */
  registerMethod(
    method: ResponseHandlerType,
    methodMeta: any,
    controllerFilters: WrappedMethodMta,
  ): void {
    let counter = 0;
    while (counter < filterTypes.length) {
      const filter = methodMeta[filterTypes[counter]] || [];
      const controllerFilter = controllerFilters ? controllerFilters[filterTypes[counter]] || [] : [];
      methodMeta[filterTypes[counter]] = [ ...controllerFilter, ...filter ];

      counter++;
    }

    this.setExceptionHandler(methodMeta, method);
    const handlers = this.concatHandlers(methodMeta, method);

    const routeHandler: RequestHandlerType = this.createMethodHandler(handlers);

    Router.addRoute(routeHandler, methodMeta.meta);
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
      request: Request,
      args?: ParamsType,
    ): Promise<Response> => {
      let counter = methods.length;

      while (counter > 1 && errorValue === null) {
        counter--;

        if (methodStatuses[counter] === true) {
          await methods[counter](request, breakLoop);
        } else {
          methods[counter](request, breakLoop);
        }
      }

      if (errorValue === null) {
        return methods[0](request, args);
      } else {
        return Router.errorHandlers.CustomError(request, errorValue);
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
}
