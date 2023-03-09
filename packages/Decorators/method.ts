import { IncomingMessageType, ServerResponseType, methodsTypes, RequestHandlerType, ParamsType } from '../Routing/types';
import { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE } from '../Routing/methods';
import MetaStore from '../utils/metaStore';
import type { ResponseFunctionTypeDescriptor, ResponseHandlerType, ResponseTextFunctionTypeDescriptor } from '../Response/types';

export type AsyncHandlerType = (props: ParamsType) => RequestHandlerType;

function asyncHandler(originalHandler: Function, meta: any): AsyncHandlerType {
  return (props: any) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    props: ParamsType,
  ) => {
    const context = {
      ...props,
      request,
      response
    };

    const handleResponse: ResponseHandlerType = await originalHandler.apply(context, props);
    handleResponse(request, response, meta);
  };
}

function decoratorFabric(method: methodsTypes, path?: string): MethodDecorator {
  return (
    _target: object,
    _name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalDescriptorValue = descriptor.value as Function;
    const meta = MetaStore.getMeta(descriptor);

    descriptor.value = asyncHandler(originalDescriptorValue, meta);

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
  return decoratorFabric(GET, path) as ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
}

/**
 * Routes HTTP Put requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Put(path?: string) {
  return decoratorFabric(PUT, path) as ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
}

/**
 * Routes HTTP Post requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Post(path?: string) {
  return decoratorFabric(POST, path) as ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
}

/**
 * Routes HTTP Delete requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Delete(path?: string) {
  return decoratorFabric(DELETE, path) as ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
}

/**
 * Routes HTTP Patch requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Patch(path?: string) {
  return decoratorFabric(PATCH, path) as ResponseFunctionTypeDescriptor | ResponseTextFunctionTypeDescriptor;
}

/**
 * Routes HTTP Trace requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Trace(path?: string) {
  return decoratorFabric(TRACE, path) as ResponseTextFunctionTypeDescriptor | ResponseFunctionTypeDescriptor;
}

/**
 * Routes HTTP Options requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Options(path?: string) {
  return decoratorFabric(OPTIONS, path) as ResponseTextFunctionTypeDescriptor | ResponseFunctionTypeDescriptor;
}

/**
 * Routes HTTP Head requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
export function Head(path?: string) {
  return decoratorFabric(HEAD, path) as ResponseTextFunctionTypeDescriptor | ResponseFunctionTypeDescriptor;
}
