import { ActionFilterKeys } from '../../Decorators/ActionFilters/utils';
import MetaStore from '../../utils/metaStore';
import type { ActionHandlerType } from '../../Decorators/ActionFilters/types';

export const ControllerActionFilterDecoratorFabric =
  (actionKey: ActionFilterKeys) =>
    (handler: ActionHandlerType): ClassDecorator =>
      (constructor: Function) => {
        const filters = MetaStore.getByKey(constructor, 'filters') || {};

        if (!filters[actionKey]) {
          filters[actionKey] = [];
        }

        filters[actionKey].push(handler);

        MetaStore.addMeta(constructor, 'filters', filters);
      };
