import { IncomingMessageType, ServerResponseType, methodsTypes, RequestHandlerType } from '../Routing/types';
import { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE } from '../Routing/methods';
import MetaStore from '../utils/metaStore';
import type { ResponseHandlerType } from '../Response/types';

export type asyncHandlerType = (classContext: any) => RequestHandlerType;

function asyncHandler(originalHandler: Function, meta: any): asyncHandlerType {
  return (classContext: any) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    ...args: unknown[]
  ) => {
    const context = {
      ...classContext,
      request,
      response
    };

    const handleResponse: ResponseHandlerType = await originalHandler.apply(context, args);
    handleResponse(request, response, meta);
  };
}

function decoratorFabric(
  method: methodsTypes,
  path?: string,
): MethodDecorator {
  return (
    target: object,
    name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalDescriptorValue: Function = descriptor.value;
    const meta = MetaStore.getMeta(descriptor);

    descriptor.value = asyncHandler(originalDescriptorValue, meta);

    MetaStore.addMeta(descriptor, 'meta', {
      path: path || '',
      method,
    })

    return descriptor;
  };
}

export function Get(path?: string) {
  return decoratorFabric(GET, path);
}

export function Put(path?: string) {
  return decoratorFabric(PUT, path);
}

export function Post(path?: string) {
  return decoratorFabric(POST, path);
}

export function Delete(path?: string) {
  return decoratorFabric(DELETE, path);
}

export function Patch(path?: string) {
  return decoratorFabric(PATCH, path);
}

export function Trace(path?: string) {
  return decoratorFabric(TRACE, path);
}

export function Options(path?: string) {
  return decoratorFabric(OPTIONS, path);
}

export function Head(path?: string) {
  return decoratorFabric(HEAD, path);
}
