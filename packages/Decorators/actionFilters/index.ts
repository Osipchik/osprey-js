import MetaStore from '../../utils/metaStore';
import { ActionFilterKeys } from '../../Decorators/actionFilters/utils';
import { ActionAuthorisationHandlerType, ActionHandlerType } from '../../Routing/types';

type ActionFilterFabricType = <T>(actionKey: ActionFilterKeys) => (handler: T) => MethodDecorator;

const ActionFilterDecoratorFabric: ActionFilterFabricType =
  (actionKey) =>
  (handler): MethodDecorator => {
  return (
    _target,
    _name,
    descriptor,
  ) => {
    const meta = MetaStore.getMeta(descriptor);
    const existedFilters = meta[actionKey] || [];

    MetaStore.addMeta(descriptor, actionKey, [
      ...existedFilters,
      handler,
    ]);

    return descriptor;
  };
}

export const CreateAuthorisationFilter = ActionFilterDecoratorFabric<ActionAuthorisationHandlerType>(ActionFilterKeys.AUTHORISATION);

export const CreateResourceFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.RESOURCE);

export const CreateActionBeforeFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.ACTION_BEFORE);

export const CreateActionAfterFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.ACTION_AFTER);

export const CreateExceptionFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.EXCEPTION);

export const CreateResultFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.RESULT);
