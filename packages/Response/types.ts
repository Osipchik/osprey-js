import type { StatusCodes, ContentTypes } from './enums';
import {BunFile} from 'bun';

export interface IOptions {
  statusCode?: StatusCodes,
  contentType?: ContentTypes,
  isJSON?: boolean,
  isFile?: boolean,
}

export type ResultType = string | Buffer | BunFile | undefined;

export type ResultResponseType = [
  result: ResultType,
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
