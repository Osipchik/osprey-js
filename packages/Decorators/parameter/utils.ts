import Config from '../../Config';
import { IncomingMessageType, ParamsType } from '../../Routing/types';

export async function bodyParser(request: IncomingMessageType, _: ParamsType) {
  return new Promise((resolve, reject) => {
    const data: any[] = [];

    request.on('data', (chunk) => {
      data.push(chunk);
    });

    request.on('end', () => {
      resolve(Config.getValue<Function>('bodyParser')(data));
    });
  })
}

export function paramsParser(key: string) {
  return (_: IncomingMessageType, params: ParamsType) => {
    return (params as any)[key];
  }
}

export function getParams(_: IncomingMessageType, params: ParamsType) {
  return params.params;
}

export function getQuery(request: IncomingMessageType, _: ParamsType) {
  const [url, searchParams] = (request.url as string).split('?', 2);

  const searchParamsList = new URLSearchParams(searchParams);

  return Object.fromEntries(searchParamsList.entries());
}
