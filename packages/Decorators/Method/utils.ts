import { Methods } from '../../Routing/methods';
import GetParameterHandler from '../../Decorators/Method/parameterHandler';
import GetMethodHandler from '../../Decorators/Method/methodHandler';
import MetaStore from '../../utils/metaStore';
import { isAsyncFunction } from '../../utils/helpers';
import { OriginalHandlerSyncType } from '../../Decorators/Method/types';

export default function DecoratorFabric(method: Methods, path?: string): MethodDecorator {
  return (
    _target: any,
    _name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalDescriptorValue = descriptor.value as OriginalHandlerSyncType;
    const meta = MetaStore.getMeta(descriptor);

    const propertyParserObject = MetaStore.getByKey(descriptor.value, 'properties');

    const parameterHandler = GetParameterHandler(propertyParserObject);
    const isOriginAsync = isAsyncFunction(originalDescriptorValue);

    descriptor.value = GetMethodHandler(
      originalDescriptorValue,
      meta,
      isOriginAsync,
      parameterHandler?.handler,
      parameterHandler?.isAsync,
    );

    MetaStore.addMeta(
      descriptor,
      'meta',
      {
        path: path || '',
        method,
        isAsync: isOriginAsync,
      },
    );

    return descriptor;
  };
}
