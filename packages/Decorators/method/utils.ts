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

    const propertyParser = GetParameterHandler(propertyParserObject) as Function;
    const isOriginAsync = isAsyncFunction(originalDescriptorValue);
    const isPropertyParserAsync = propertyParser ? isAsyncFunction(propertyParser) : false;

    descriptor.value = GetMethodHandler(originalDescriptorValue, meta, propertyParser, isPropertyParserAsync, isOriginAsync);

    MetaStore.addMeta(
      descriptor,
      'meta',
      {
        path: path || '',
        method,
        isOriginAsync,
        isPropertyParserAsync
      },
    );

    return descriptor;
  };
}
