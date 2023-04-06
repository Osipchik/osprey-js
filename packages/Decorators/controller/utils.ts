import { RequestHandlerType } from '../../Routing/types';
import { ActionFilterKeys } from '../../Decorators/actionFilters/utils';
import MetaStore from '../../utils/metaStore';

export const ControllerActionFilterDecoratorFabric =
  (actionKey: ActionFilterKeys) =>
    (handler: RequestHandlerType) =>
      (constructor: Function) => {
        const meta = MetaStore.getMeta(constructor);
        const filters = meta?.filters || {};

        const currentFilters = filters[actionKey] || [];
        currentFilters.push(handler);

        MetaStore.addMeta(constructor, 'filters', filters);
      };
