import MetaStore from '../utils/metaStore';
import type { IMethodDecorator, ResponseHandlerType } from '../Response/types';

function decoratorFabric(): MethodDecorator {
  return (
    _target: any,
    _name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalDescriptorValue = descriptor.value as Function;
    const meta = MetaStore.getMeta(descriptor);

    // const propertyParserObject = MetaStore.getMeta(descriptor.value);
    // const propertiesParsers = propertyParserObject ? Object.values(propertyParserObject) : null;

    // descriptor.value = propertiesParsers?.length
    //   ? asyncHandlerWithParams(originalDescriptorValue, meta, propertiesParsers as Function[])
    //   : asyncHandler(originalDescriptorValue, meta);

    MetaStore.addMeta(descriptor, 'guard', {
      method: 'asdasdsad',
    });

    return descriptor;
  };
}

/**
 * Routes HTTP GET requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Logging() {
  return decoratorFabric();
}
