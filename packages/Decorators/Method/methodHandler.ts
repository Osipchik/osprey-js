import { AsyncHandlerType, IncomingMessageType, ServerResponseType } from '../../Routing/types';
import { ResultResponseType } from '../../Response/types';
import { OriginalHandlerAsyncType, OriginalHandlerSyncType } from '../../Decorators/Method/types';
import { sendResponse } from '../../Response/utils';

function syncHandler(originalHandler: OriginalHandlerSyncType, meta: any): AsyncHandlerType {
  return (controllerContext) => (
    request: IncomingMessageType,
    response: ServerResponseType,
  ) => {
    const context = {
      ...controllerContext,
      request,
      response,
    };

    const result = originalHandler.call(context);
    return sendResponse(request, response, meta, result[0], result[1]);
  };
}

function asyncHandler(originalHandler: OriginalHandlerAsyncType, meta: any): AsyncHandlerType {
  return (controllerContext) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
  ) => {
    const context = {
      ...controllerContext,
      request,
      response,
    };

    const result = await originalHandler.call(context);
    return sendResponse(request, response, meta, result[0], result[1]);
  };
}

function asyncHandlerWithAsyncParams(originalHandler: OriginalHandlerAsyncType, meta: any, paramsParser: Function): AsyncHandlerType {
  return (controllerContext) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    args,
  ) => {
    const context = {
      ...controllerContext,
      request,
      response
    };

    const params = await paramsParser(request, args);

    const result = await originalHandler.apply(context, params);
    return sendResponse(request, response, meta, result[0], result[1]);
  };
}

function syncHandlerWithAsyncParams(originalHandler: OriginalHandlerSyncType, meta: any, paramsParser: Function): AsyncHandlerType {
  return (controllerContext) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    args,
  ) => {
    const context = {
      ...controllerContext,
      request,
      response
    };

    const params = await paramsParser(request, args);

    const result: ResultResponseType = originalHandler.apply(context, params);
    return sendResponse(request, response, meta, result[0], result[1]);
  };
}

function asyncHandlerWithParams(originalHandler: OriginalHandlerAsyncType, meta: any, paramsParser: Function): AsyncHandlerType {
  return (controllerContext) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    args,
  ) => {
    const context = {
      ...controllerContext,
      request,
      response
    };

    const params = paramsParser(request, args);

    const result = await originalHandler.apply(context, params);
    return sendResponse(request, response, meta, result[0], result[1]);
  };
}

function syncHandlerWithParams(originalHandler: OriginalHandlerSyncType, meta: any, paramsParser: Function): AsyncHandlerType {
  return (controllerContext) => (
    request: IncomingMessageType,
    response: ServerResponseType,
    args,
  ) => {
    const context = {
      ...controllerContext,
      request,
      response
    };

    const params = paramsParser(request, args);

    const result = originalHandler.apply(context, params);
    return sendResponse(request, response, meta, result[0], result[1]);
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
    return syncHandler(originalDescriptorValue as OriginalHandlerSyncType, meta);
  }
  else if (!propertyParser && isOriginAsync) {
    return asyncHandler(originalDescriptorValue as OriginalHandlerAsyncType, meta);
  }
  else if (isPropertyParserAsync && isOriginAsync && propertyParser) {
    return asyncHandlerWithAsyncParams(originalDescriptorValue as OriginalHandlerAsyncType, meta, propertyParser);
  }
  else if (isPropertyParserAsync && !isOriginAsync && propertyParser) {
    return syncHandlerWithAsyncParams(originalDescriptorValue as OriginalHandlerSyncType, meta, propertyParser);
  }
  else if (!isPropertyParserAsync && isOriginAsync && propertyParser) {
    return asyncHandlerWithParams(originalDescriptorValue as OriginalHandlerAsyncType, meta, propertyParser);
  }
  else {
    return syncHandlerWithParams(originalDescriptorValue as OriginalHandlerSyncType, meta, propertyParser!);
  }
}
