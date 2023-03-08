import type { MetaHandlerType } from '../Routing/types';
import MetaStore from '../utils/metaStore';

/**
 * Create the new node into router
 *
 * @param {string} prefix - Prefix that added for all routes of the Controller
 */
function Controller(prefix?: string): ClassDecorator {
  return function (constructor: Function) {
    const methods = Object.getOwnPropertyNames(constructor.prototype).reduce((acc, key) => {
      const handler: MetaHandlerType = constructor.prototype[key];
      const handlerMeta = MetaStore.getMeta(handler);

      if (handlerMeta) {
        handlerMeta.meta.prefix = prefix || '';
        acc.push(handler);
      }

      return acc;
    }, [] as MetaHandlerType[]);

    MetaStore.addMeta(constructor, 'methods', methods);
  }
}

export default Controller;
