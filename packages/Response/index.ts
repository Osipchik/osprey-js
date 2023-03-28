import { ContentTypes, StatusCodes } from './enums';
import { IOptions, ResponseHandlerType } from './types';
import { IncomingMessageType, ServerResponseType } from '../Routing/types';
import Config from '../Config';

const ResponseStringify = {
  [ContentTypes.Application_Serialize]: Config.getValue<Function>('serializer'),
};

const defaultOptions = (statusCode: StatusCodes) => ({
  statusCode,
  contentType: ContentTypes.Application_Serialize,
});

interface IDefaultOptions {
  statusCode: StatusCodes,
  contentType: ContentTypes,
}

function resultResponseFabric(defaultOptions: IDefaultOptions) {
  return (result: unknown, options?: IOptions): ResponseHandlerType => {
    const currentOptions = { ...defaultOptions, ...options, };

    const stringifiedResult = ResponseStringify[ContentTypes.Application_Serialize](result) || result;

    return (
      request: IncomingMessageType,
      response: ServerResponseType,
      meta: any,
    ) => {
      response.statusCode = currentOptions.statusCode;
      response.setHeader('Content-Type', currentOptions.contentType);
      response.end(stringifiedResult);
    }
  };
}

export type ResponseFunctionType = (result: unknown, options?: IOptions) => ResponseHandlerType;
export type ResponseTextFunctionType = (result: string, options?: IOptions) => ResponseHandlerType;

interface IResponse {
  Ok: ResponseFunctionType;
  Created: ResponseFunctionType;
  PartialContent: ResponseFunctionType;
  BadRequest: ResponseFunctionType;
  NotFound: ResponseFunctionType;
  NoContent: ResponseFunctionType;
  InternalServerError: ResponseFunctionType;
  NotImplemented: ResponseFunctionType;
  Accepted: ResponseTextFunctionType;
}

const Response: IResponse = {
  Ok: resultResponseFabric(defaultOptions(StatusCodes.Ok)),
  Created: resultResponseFabric(defaultOptions(StatusCodes.Created)),
  PartialContent: resultResponseFabric(defaultOptions(StatusCodes.PartialContent)),
  BadRequest: resultResponseFabric(defaultOptions(StatusCodes.BadRequest)),
  NotFound: resultResponseFabric(defaultOptions(StatusCodes.NotFound)),
  NoContent: resultResponseFabric(defaultOptions(StatusCodes.NoContent)),
  InternalServerError: resultResponseFabric(defaultOptions(StatusCodes.NotFound)),
  NotImplemented: resultResponseFabric(defaultOptions(StatusCodes.NotImplemented)),
  Accepted: resultResponseFabric(defaultOptions(StatusCodes.Accepted)),
};

export default Response;
