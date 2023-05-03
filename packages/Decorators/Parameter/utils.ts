import url from 'url';
import Config from '../../Config';
import { IncomingMessageType, ParamsType, ServerResponseType } from '../../Routing/types';

export async function bodyParser(request: IncomingMessageType, response: ServerResponseType, _: ParamsType): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const data: any[] = [];

    request.on('data', (chunk) => {
      data.push(chunk);
    });

    request.on('end', () => {
      try {
        resolve(Config.getValue<Function>('bodyParser')(data));
      } catch (error) {
        reject(error);
      }
    });
  })
}

export function paramsParser(key: string) {
  return (request: IncomingMessageType, response: ServerResponseType, params: ParamsType) => {
    return (params as any)[key];
  }
}

export function getParams(request: IncomingMessageType, response: ServerResponseType, params: ParamsType) {
  return params.params;
}

export function getQuery(request: IncomingMessageType, response: ServerResponseType, _: ParamsType) {
  const path = url.parse(request.url!, true);

  return path.query;
}

export function getRequest(request: IncomingMessageType, response: ServerResponseType, _: ParamsType) {
  return request;
}

export function getResponse(request: IncomingMessageType, response: ServerResponseType, _: ParamsType) {
  return response;
}
