import { IncomingMessageType, ServerResponseType, methodsTypes } from '../../Routing/types';
import { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE } from '../../Routing/methods';
import { StatusCodes } from '../../Response/statusCodes';
import MetaStore from '../../utils/metaStore';
import type { IResult, ResponseHandlerType } from '../../Response/types';

function asyncHandler(originalHandler: Function, meta: any): (
  request: IncomingMessageType,
  response: ServerResponseType,
) => Promise<void> {
  return async (
    request: IncomingMessageType,
    response: ServerResponseType,
    ...args: unknown[]
  ) => {
    const context = {
      request,
      response
    };

    const handleResponse: ResponseHandlerType = await originalHandler.apply({ ...this, ...context}, args);
    handleResponse(request, response, meta);
  };
}

function decoratorFabric(
  method: methodsTypes,
  path: string,
  statusCode?: StatusCodes,
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
      path,
      method,
    })

    return descriptor;
  };
}

export function Get(path: string, statusCode?: StatusCodes) {
  return decoratorFabric(GET, path, statusCode);
}

export function Put(path: string, statusCode?: StatusCodes) {
  return decoratorFabric(PUT, path, statusCode);
}

export function Post(path: string, statusCode?: StatusCodes) {
  return decoratorFabric(POST, path, statusCode);
}

export function Delete(path: string, statusCode?: StatusCodes) {
  return decoratorFabric(DELETE, path, statusCode);
}

export function Patch(path: string, statusCode?: StatusCodes) {
  return decoratorFabric(PATCH, path, statusCode);
}

export function Trace(path: string, statusCode?: StatusCodes) {
  return decoratorFabric(TRACE, path, statusCode);
}

export function Options(path: string, statusCode?: StatusCodes) {
  return decoratorFabric(OPTIONS, path, statusCode);
}

export function Head(path: string, statusCode?: StatusCodes) {
  return decoratorFabric(HEAD, path, statusCode);
}
