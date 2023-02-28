import Router from '../../Routing';
import { MetaHandlerType } from '../../Routing/types';
import MetaStore from '../../utils/metaStore';

function Controller(prefix: string): ClassDecorator {
  return function (constructor: Function) {
    for (const key of Object.getOwnPropertyNames(constructor.prototype)) {
      const handler: MetaHandlerType = constructor.prototype[key];
      const handlerMeta = MetaStore.getMeta(handler);

      if (handlerMeta) {
        handlerMeta.meta.prefix = prefix;
        Router.addRoute(handler, handlerMeta.meta);
        delete handler.meta;
      }
    }
  }
}

export default Controller;
