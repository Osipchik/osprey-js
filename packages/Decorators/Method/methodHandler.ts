import { sendResponse } from '../../Response/utils';
import type { ResultResponseType } from '../../Response/types';
import type { AsyncHandlerType } from '../../Routing/types';
import type { OriginalHandlerAsyncType, OriginalHandlerSyncType } from '../../Decorators/Method/types';

function syncHandler(originalHandler: OriginalHandlerSyncType, headers: HeadersInit): AsyncHandlerType {
  return (controllerContext) => (request: Request) => {
    const result = originalHandler.call(controllerContext);
    return sendResponse(request, result[0], result[1], headers);
  };
}

function asyncHandler(originalHandler: OriginalHandlerAsyncType, headers: HeadersInit): AsyncHandlerType {
  return (controllerContext) => async (request: Request) => {
    const result = await originalHandler.call(controllerContext);
    return sendResponse(request, result[0], result[1], headers);
  };
}

function asyncHandlerWithAsyncParams(originalHandler: OriginalHandlerAsyncType, paramsParser: Function, headers: HeadersInit): AsyncHandlerType {
  return (controllerContext) => async (
    request: Request,
    args,
  ) => {
    const params = await paramsParser(request, args);

    const result = await originalHandler.apply(controllerContext, params);
    return sendResponse(request, result[0], result[1], headers);
  };
}

function syncHandlerWithAsyncParams(originalHandler: OriginalHandlerSyncType, paramsParser: Function, headers: HeadersInit): AsyncHandlerType {
  return (controllerContext) => async (
    request: Request,
    args,
  ) => {
    const params = await paramsParser(request, args);

    const result: ResultResponseType = originalHandler.apply(controllerContext, params);
    return sendResponse(request, result[0], result[1], headers);
  };
}

function asyncHandlerWithParams(originalHandler: OriginalHandlerAsyncType, paramsParser: Function, headers: HeadersInit): AsyncHandlerType {
  return (controllerContext) => async (
    request: Request,
    args,
  ) => {
    const params = paramsParser(request, args);

    const result = await originalHandler.apply(controllerContext, params);
    return sendResponse(request, result[0], result[1], headers);
  };
}

function syncHandlerWithParams(originalHandler: OriginalHandlerSyncType, paramsParser: Function, headers: HeadersInit): AsyncHandlerType {
  return (controllerContext) => (
    request: Request,
    args,
  ) => {
    const params = paramsParser(request, args);

    const result = originalHandler.apply(controllerContext, params);
    return sendResponse(request, result[0], result[1], headers);
  };
}

export default function GetMethodHandler(
  originalDescriptorValue: OriginalHandlerSyncType | OriginalHandlerAsyncType,
  meta: any,
  isOriginAsync: boolean,
  propertyParser?: Function,
  isPropertyParserAsync?: boolean,
): AsyncHandlerType {
  if (!propertyParser && !isOriginAsync) {
    return syncHandler(originalDescriptorValue as OriginalHandlerSyncType, meta?.headers);
  }
  else if (!propertyParser && isOriginAsync) {
    return asyncHandler(originalDescriptorValue as OriginalHandlerAsyncType, meta?.headers);
  }
  else if (isPropertyParserAsync && isOriginAsync && propertyParser) {
    return asyncHandlerWithAsyncParams(originalDescriptorValue as OriginalHandlerAsyncType, propertyParser, meta?.headers);
  }
  else if (isPropertyParserAsync && !isOriginAsync && propertyParser) {
    return syncHandlerWithAsyncParams(originalDescriptorValue as OriginalHandlerSyncType, propertyParser, meta?.headers);
  }
  else if (!isPropertyParserAsync && isOriginAsync && propertyParser) {
    return asyncHandlerWithParams(originalDescriptorValue as OriginalHandlerAsyncType, propertyParser, meta?.headers);
  }
  else {
    return syncHandlerWithParams(originalDescriptorValue as OriginalHandlerSyncType, propertyParser!, meta?.headers);
  }
}
