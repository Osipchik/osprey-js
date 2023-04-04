import { Methods } from '../../Routing/methods';
import { IMethodDecorator } from '../../Response/types';
import DecoratorFabric from '../../Decorators/method/utils';
import MetaStore from '../../utils/metaStore';

/**
 * Routes HTTP GET requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Get(path?: string) {
  return DecoratorFabric(Methods.GET, path) as IMethodDecorator;
}

/**
 * Routes HTTP Put requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Put(path?: string) {
  return DecoratorFabric(Methods.PUT, path) as IMethodDecorator;
}

/**
 * Routes HTTP Post requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Post(path?: string) {
  return DecoratorFabric(Methods.POST, path) as IMethodDecorator;
}

/**
 * Routes HTTP Delete requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Delete(path?: string) {
  return DecoratorFabric(Methods.DELETE, path) as IMethodDecorator;
}

/**
 * Routes HTTP Patch requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Patch(path?: string) {
  return DecoratorFabric(Methods.PATCH, path) as IMethodDecorator;
}

/**
 * Routes HTTP Trace requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Trace(path?: string) {
  return DecoratorFabric(Methods.TRACE, path) as IMethodDecorator;
}

/**
 * Routes HTTP Options requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Options(path?: string) {
  return DecoratorFabric(Methods.OPTIONS, path) as IMethodDecorator;
}

/**
 * Routes HTTP Head requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Head(path?: string) {
  return DecoratorFabric(Methods.HEAD, path) as IMethodDecorator;
}

export function CreateMethodDecorator(handler: Function): MethodDecorator {
  return (
    _target: any,
    _name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const meta = MetaStore.getMeta(descriptor);
    const existedFilters = meta?.filters || [];

    MetaStore.addMeta(descriptor, 'filters', [
      ...existedFilters,
      handler,
    ]);

    return descriptor;
  };
}
