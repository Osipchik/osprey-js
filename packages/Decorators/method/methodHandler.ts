import { AsyncHandlerType, IncomingMessageType, ServerResponseType } from '../../Routing/types';
import { ResponseHandlerType } from '../../Response/types';

function syncHandler(originalHandler: Function, meta: any): AsyncHandlerType {
  return (controllerContext) => (
    request: IncomingMessageType,
    response: ServerResponseType,
  ) => {
    const context = {
      ...controllerContext,
      request,
      response,
    };

    const handleResponse: ResponseHandlerType = originalHandler.call(context);
    handleResponse(request, response, meta);
  };
}

function asyncHandler(originalHandler: Function, meta: any): AsyncHandlerType {
  return (controllerContext) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
  ) => {
    const context = {
      ...controllerContext,
      request,
      response,
    };

    const handleResponse: ResponseHandlerType = await originalHandler.call(context);
    handleResponse(request, response, meta);
  };
}

function asyncHandlerWithAsyncParams(originalHandler: Function, meta: any, paramsParser: Function): AsyncHandlerType {
  return (controllerContext) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    args,
  ): Promise<void> => {
    const context = {
      ...controllerContext,
      request,
      response
    };

    const params = await paramsParser(request, args);

    const handleResponse: ResponseHandlerType = await originalHandler.apply(context, params);
    handleResponse(request, response, meta);
  };
}

function syncHandlerWithAsyncParams(originalHandler: Function, meta: any, paramsParser: Function): AsyncHandlerType {
  return (controllerContext) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    args,
  ): Promise<void> => {
    const context = {
      ...controllerContext,
      request,
      response
    };

    const params = await paramsParser(request, args);

    const handleResponse: ResponseHandlerType = originalHandler.apply(context, params);
    handleResponse(request, response, meta);
  };
}

function asyncHandlerWithParams(originalHandler: Function, meta: any, paramsParser: Function): AsyncHandlerType {
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

    const handleResponse: ResponseHandlerType = await originalHandler.apply(context, params);
    handleResponse(request, response, meta);
  };
}

function syncHandlerWithParams(originalHandler: Function, meta: any, paramsParser: Function): AsyncHandlerType {
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

    const handleResponse: ResponseHandlerType = originalHandler.apply(context, params);
    handleResponse(request, response, meta);
  };
}

export default function GetMethodHandler(
  originalDescriptorValue: Function,
  meta: any,
  isOriginAsync: boolean,
  propertyParser?: Function,
  isPropertyParserAsync?: boolean,
): AsyncHandlerType {
  if (!propertyParser && !isOriginAsync) {
    return syncHandler(originalDescriptorValue, meta);
  }
  else if (!propertyParser && isOriginAsync) {
    return asyncHandler(originalDescriptorValue, meta);
  }
  else if (isPropertyParserAsync && isOriginAsync && propertyParser) {
    return asyncHandlerWithAsyncParams(originalDescriptorValue, meta, propertyParser);
  }
  else if (isPropertyParserAsync && !isOriginAsync && propertyParser) {
    return syncHandlerWithAsyncParams(originalDescriptorValue, meta, propertyParser);
  }
  else if (!isPropertyParserAsync && isOriginAsync && propertyParser) {
    return asyncHandlerWithParams(originalDescriptorValue, meta, propertyParser);
  }
  else {
    return syncHandlerWithParams(originalDescriptorValue, meta, propertyParser!);
  }
}
