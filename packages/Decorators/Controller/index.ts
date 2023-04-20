import type { MetaHandlerType } from '../../Routing/types';
import MetaStore from '../../utils/metaStore';
import { ControllerActionFilterDecoratorFabric } from '../../Decorators/Controller/utils';
import { ActionFilterKeys } from '../../Decorators/ActionFilters/utils';
import { RequestHandlerType } from '../../Routing/types';

/**
 * Create the new node into router
 *
 * @param {string} prefix - Prefix that added for all routes of the Controller
 */
export function Controller(prefix?: string): ClassDecorator {
  return function (constructor: Function) {
    const methods = Object.getOwnPropertyNames(constructor.prototype).reduce((acc, key) => {
      const handler: RequestHandlerType = constructor.prototype[key];
      const handlerMeta = MetaStore.getByKey(handler, 'meta');

      if (handlerMeta) {
        handlerMeta.prefix = prefix || '';
        acc.push(handler);
      }

      return acc;
    }, [] as MetaHandlerType[]);

    MetaStore.addMeta(constructor, 'methods', methods);
  }
}

/**
 * Apply Authorisation filter for all route handlers in the controllers
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export const ControllerAuthorisationFilter = ControllerActionFilterDecoratorFabric(ActionFilterKeys.AUTHORISATION);

/**
 * Apply Before filter for all route handlers in the controllers
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export const ControllerBeforeFilter = ControllerActionFilterDecoratorFabric(ActionFilterKeys.ACTION_BEFORE);

/**
 * Apply After filter for all route handlers in the controllers
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export const ControllerAfterFilter = ControllerActionFilterDecoratorFabric(ActionFilterKeys.ACTION_AFTER);
