import type { StatusCodes, ContentTypes } from './enums';

export interface IOptions {
  statusCode?: StatusCodes,
  contentType?: ContentTypes,
  isJSON?: boolean,
}

export type ResultResponseType = [
  result: string,
  options: any,
]

export type temp = {
  [key in any]: any;
}

export type ResponseFunctionType = (result: unknown, options?: IOptions) => ResultResponseType;
export type ResponseTextFunctionType = (result: string, options?: IOptions) => ResultResponseType;

export interface IResponse {
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
