import { Methods } from '../../Routing/methods';
import GetParameterHandler from '../../Decorators/method/parameterHandler';
import GetMethodHandler from '../../Decorators/method/methodHandler';
import MetaStore from '../../utils/metaStore';
import { isAsyncFunction } from '../../utils/helpers';

export default function DecoratorFabric(method: Methods, path?: string): MethodDecorator {
  return (
    _target: any,
    _name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalDescriptorValue = descriptor.value as Function;
    const meta = MetaStore.getMeta(descriptor);

    const propertyParserObject = MetaStore.getMeta(descriptor.value);

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
      },
    );

    return descriptor;
  };
}
