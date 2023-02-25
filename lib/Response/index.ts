import serialize from 'serialize-javascript';
import { StatusCodes } from './statusCodes';

interface IOptions {
  statusCode?: StatusCodes,
  contentType?: string,
  isJSON?: boolean,
}

export interface IResult {
  value: unknown,
  statusCode: StatusCodes,
  contentType: string,
}

const defaultOkOptions = {
  statusCode: StatusCodes.Ok,
  contentType: 'application/json',
  isJSON: true,
}

export function Ok(result: unknown, options?: IOptions): IResult {
  const currentOptions = { ...options, ...defaultOkOptions } as typeof defaultOkOptions;

  let contentType = currentOptions.contentType;
  let stringifiedResult = result;

  if (currentOptions.isJSON) {
    stringifiedResult = serialize(result, { isJSON: true });
    contentType = 'application/json';
  } else if (!contentType) {
    contentType = 'text/html; charset=UTF-8';
  }

  return {
    value: stringifiedResult,
    statusCode: currentOptions.statusCode,
    contentType,
  };
};

export function JsonResult(result: any, options?: IOptions) {
  return {
    result,
    statusCode: options?.statusCode,
    contentType: 'application/json',
  };
};
