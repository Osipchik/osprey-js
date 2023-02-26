import serialize from 'serialize-javascript';
import { IncomingMessageType, ServerResponseType } from '@/Routing/types';
import { StatusCodes } from './statusCodes';
import { IOptions, ResponseHandlerType } from './types';

const defaultOptions = (statusCode: StatusCodes) => ({
  statusCode,
  contentType: 'application/json',
  isJSON: true,
});

interface IDefaultOptions {
  statusCode: StatusCodes,
  contentType: string,
  isJSON: boolean,
}

function resultResponseFabric(defaultOptions: IDefaultOptions) {
  return (result: unknown, options?: IOptions): ResponseHandlerType => {
    const currentOptions = { ...options, ...defaultOptions };

    let contentType: any;
    let stringifiedResult = result;

    if (currentOptions.isJSON) {
      stringifiedResult = serialize(result, { isJSON: true });
      contentType = 'application/json';
    }

    if (!contentType) {
      contentType = 'text/html; charset=UTF-8';
    } else {
      contentType = currentOptions.contentType;
    }

    return (
      request: IncomingMessageType,
      response: ServerResponseType,
      meta: any,
    ) => {
      response.statusCode = currentOptions.statusCode;
      response.setHeader('Content-Type', contentType);
      response.end(stringifiedResult);
    }
  };
}

function textResponseFabric(defaultOptions: IDefaultOptions) {
  return (message: string, options?: IOptions): ResponseHandlerType => {
    const currentOptions = { ...options, ...defaultOptions };

    let contentType: any;

    if (!contentType) {
      contentType = 'text/html; charset=UTF-8';
    } else {
      contentType = currentOptions.contentType;
    }

    return (
      request: IncomingMessageType,
      response: ServerResponseType,
      meta: any,
    ) => {
      response.statusCode = currentOptions.statusCode;
      response.setHeader('Content-Type', contentType);
      response.end(message);
    }
  };
}

type ResponseFunctionType = (result: unknown, options?: IOptions) => ResponseHandlerType;
type ResponseTextFunctionType = (result: string, options?: IOptions) => ResponseHandlerType;

interface IResponse {
  Ok: ResponseFunctionType;
  Created: ResponseFunctionType;
  PartialContent: ResponseFunctionType;
  BadRequest: ResponseFunctionType;
  NotFound: ResponseFunctionType;
  InternalServerError: ResponseFunctionType;
  NotImplemented: ResponseFunctionType;
  Accepted: ResponseTextFunctionType;
}

export const Response: IResponse = {
  Ok: resultResponseFabric(defaultOptions(StatusCodes.Ok)),
  Created: resultResponseFabric(defaultOptions(StatusCodes.Created)),
  PartialContent: resultResponseFabric(defaultOptions(StatusCodes.PartialContent)),
  BadRequest: resultResponseFabric(defaultOptions(StatusCodes.BadRequest)),
  NotFound: resultResponseFabric(defaultOptions(StatusCodes.NotFound)),
  InternalServerError: resultResponseFabric(defaultOptions(StatusCodes.NotFound)),
  NotImplemented: resultResponseFabric(defaultOptions(StatusCodes.NotImplemented)),

  Accepted: textResponseFabric(defaultOptions(StatusCodes.Accepted)),
};
