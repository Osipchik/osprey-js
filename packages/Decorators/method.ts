import { IncomingMessageType, ServerResponseType, methodsTypes, RequestHandlerType, ParamsType } from '../Routing/types';
import { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE } from '../Routing/methods';
import MetaStore from '../utils/metaStore';
import type { IMethodDecorator, ResponseHandlerType } from '../Response/types';

export type AsyncHandlerType = (props: ParamsType) => RequestHandlerType;

function asyncHandler(originalHandler: Function, meta: any): AsyncHandlerType {
  return (controller: any) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    props: ParamsType,
  ) => {
    const context = {
      ...controller,
      request,
      response,
    };

    const handleResponse: ResponseHandlerType = await originalHandler.call(context);
    handleResponse(request, response, meta);
  };
}

function asyncHandlerWithParams(originalHandler: Function, meta: any, paramsParsers: Function[]): AsyncHandlerType {
  return (controller: any) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    props: ParamsType,
  ) => {
    const context = {
      ...controller,
      request,
      response
    };

    const params = await Promise.all(paramsParsers.map((callback) => callback(request, props)));

    const handleResponse: ResponseHandlerType = await originalHandler.apply(context, params);
    handleResponse(request, response, meta);
  };
}

function decoratorFabric(method: methodsTypes, path?: string): MethodDecorator {
  return (
    _target: any,
    _name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalDescriptorValue = descriptor.value as Function;
    const meta = MetaStore.getMeta(descriptor);

    const propertyParserObject = MetaStore.getMeta(descriptor.value);
    const propertiesParsers = propertyParserObject ? Object.values(propertyParserObject) : null;

    descriptor.value = propertiesParsers?.length
      ? asyncHandlerWithParams(originalDescriptorValue, meta, propertiesParsers as Function[])
      : asyncHandler(originalDescriptorValue, meta);

    MetaStore.addMeta(descriptor, 'meta', {
      path: path || '',
      method,
    });

    return descriptor;
  };
}

/**
 * Routes HTTP GET requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Get(path?: string) {
  return decoratorFabric(GET, path) as IMethodDecorator;
}

/**
 * Routes HTTP Put requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Put(path?: string) {
  return decoratorFabric(PUT, path) as IMethodDecorator;
}

/**
 * Routes HTTP Post requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Post(path?: string) {
  return decoratorFabric(POST, path) as IMethodDecorator;
}

/**
 * Routes HTTP Delete requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Delete(path?: string) {
  return decoratorFabric(DELETE, path) as IMethodDecorator;
}

/**
 * Routes HTTP Patch requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Patch(path?: string) {
  return decoratorFabric(PATCH, path) as IMethodDecorator;
}

/**
 * Routes HTTP Trace requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Trace(path?: string) {
  return decoratorFabric(TRACE, path) as IMethodDecorator;
}

/**
 * Routes HTTP Options requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Options(path?: string) {
  return decoratorFabric(OPTIONS, path) as IMethodDecorator;
}

/**
 * Routes HTTP Head requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Head(path?: string) {
  return decoratorFabric(HEAD, path) as IMethodDecorator;
}
