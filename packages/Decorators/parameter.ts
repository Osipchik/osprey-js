import Config from '../Config';
import { IncomingMessageType, ParamsType } from '../Routing/types';
import MetaStore from '../utils/metaStore';

async function bodyParser(request: IncomingMessageType, _: ParamsType) {
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

function paramsParser(key: string) {
  return (_: IncomingMessageType, params: ParamsType) => {
    return (params as any)[key];
  }
}

function getParams(_: IncomingMessageType, params: ParamsType) {
  return params.params;
}

function getQuery(request: IncomingMessageType, _: ParamsType) {
  const [url, searchParams] = (request.url as string).split('?', 2);

  const searchParamsList = new URLSearchParams(searchParams);

  return Object.fromEntries(searchParamsList.entries());
}

/**
 * Parse request body
 */
export function Body(target: Object, key: string, index: any) {
  MetaStore.addMeta((target as any)[key], index, bodyParser);
};

/**
 * Get parameter by key
 *
 * @param {string} paramKey - Specified key.
 */
export function Param(paramKey: string) {
  return (target: Object, key: string, index: any) => {
    MetaStore.addMeta((target as any)[key], index, paramsParser(paramKey));
  };
}

/**
 * Get parameters as object
 */
export function Params(target: Object, key: string, index: any) {
  MetaStore.addMeta((target as any)[key], index, getParams);
}

/**
 * Get query parameters as object
 */
export function Query(target: Object, key: string, index: any) {
  MetaStore.addMeta((target as any)[key], index, getQuery);
}
