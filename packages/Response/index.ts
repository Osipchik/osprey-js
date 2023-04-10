import { defaultOptions, StatusCodes } from './enums';
import { IOptions, ResponseHandlerType } from './types';
import { resultResponseFabric } from '../Response/utils';


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
