import { IncomingMessageType, ServerResponseType, methodsTypes } from '@/Routing/types';
import { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE } from '@/Routing/methods';
import { StatusCodes } from '@/utils/StatusCodes';
import { isPrimitive } from '@/utils/helpers';
import MetaStore from '@/utils/metaStore';

function getStatusCode(method: methodsTypes) {
  switch (method) {
    case POST: return StatusCodes.Created;
    default: return StatusCodes.Ok;
  }
}

function asyncHandler(original: Function, callBack: Function): (
  request: IncomingMessageType,
  response: ServerResponseType,
) => Promise<void> {
  return async (
    request: IncomingMessageType,
    response: ServerResponseType,
    ...args: any
  ) => {
    const context = {
      request,
      response
    }

    const result = await original.apply({ ...this, ...context}, args);
    callBack(response, result);
  };
}

function decoratorFabric(
  method: methodsTypes,
  path: string,
  statusCode?: StatusCodes,
): MethodDecorator {
  const responseStatusCode = statusCode ?? getStatusCode(method);

  return (
    target: object,
    name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const original: Function = descriptor.value;
    const meta = MetaStore.getMeta(descriptor);

    function handler(
      response: ServerResponseType,
      result: any,
    ): void {
      response.statusCode = result?.statusCode ?? responseStatusCode;

      if (isPrimitive(result)) {
        response.setHeader('Content-Type', 'text/html; charset=UTF-8');
        response.end(result);
      } else {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(result));
      }
    }

    function handlerWithHeader(
      response: ServerResponseType,
      result: any,
    ): void {
      response.statusCode = result?.statusCode ?? responseStatusCode;
      response.setHeader(meta.header.name, meta.header.value);

      if (isPrimitive(result)) {
        response.setHeader('Content-Type', 'text/html; charset=UTF-8');
        response.end(result);
      } else {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(result));
      }
    }

    descriptor.value = asyncHandler(original, meta.header ? handlerWithHeader : handler);

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
