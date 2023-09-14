import MetaStore from '../../utils/metaStore';
import { ActionFilterFabricType } from '@/types';

export enum ActionFilterKeys {
  AUTHORISATION = 'actionFilter',
  RESOURCE = 'resourceFilter',
  ACTION_BEFORE = 'actionBeforeFilter',
  ACTION_AFTER = 'actionAfterFilter',
  EXCEPTION = 'exceptionFilter',
  RESULT = 'resultFilter',
  MIDDLEWARE = 'middleware',
}

export const ActionFilterDecoratorFabric: ActionFilterFabricType =
  (actionKey: ActionFilterKeys) =>
    (handler): MethodDecorator => {
      return (
        _target,
        _name,
        descriptor,
      ) => {
        const existedFilters = MetaStore.getByKey(descriptor.value, actionKey) || [];

        MetaStore.addMeta(descriptor, actionKey, [
          ...existedFilters,
          handler,
        ]);

        return descriptor;
      };
    };

export const ExceptionFilterDecoratorFabric = (handler: Function): MethodDecorator => {
    return (
      _target,
      _name,
      descriptor,
    ) => {
      const meta = MetaStore.getMeta(descriptor);
      const existedFilters = meta[ActionFilterKeys.EXCEPTION] || [];

      MetaStore.addMeta(descriptor, ActionFilterKeys.EXCEPTION, [
        ...existedFilters,
        handler,
      ]);

      return descriptor;
    };
  };
