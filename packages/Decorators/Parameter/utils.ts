import Url from 'fast-url-parser';
import { ParamsType } from '../../Routing/types';

export async function bodyParser(request: Request, _: ParamsType): Promise<unknown> {
  return request.body.getReader().readMany();
}

export function paramsParser(key: string) {
  return (request: Request, params: ParamsType) => {
    return (params as any)[key];
  }
}

export function getParams(request: Request, params: ParamsType) {
  return params.params;
}

export function getQuery(request: Request, _: ParamsType) {
  return Url.parse(request.url).query;
}

export function getRequest(request: Request, _: ParamsType) {
  return request;
}
