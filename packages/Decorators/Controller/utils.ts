import { RequestHandlerType } from '../../Routing/types';
import { ActionFilterKeys } from '../../Decorators/ActionFilters/utils';
import MetaStore from '../../utils/metaStore';

export const ControllerActionFilterDecoratorFabric =
  (actionKey: ActionFilterKeys) =>
    (handler: RequestHandlerType): ClassDecorator =>
      (constructor: Function) => {
        const filters = MetaStore.getByKey(constructor, 'filters') || {};

        if (!filters[actionKey]) {
          filters[actionKey] = [];
        }

        filters[actionKey].push(handler);

        MetaStore.addMeta(constructor, 'filters', filters);
      };
