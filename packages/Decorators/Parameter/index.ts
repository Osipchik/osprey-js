import MetaStore, { MetaStoreKeys } from '@/utils/metaStore';
import { bodyParser, getParams, getQuery, getRequest, getResponse, paramsParser } from '@/Decorators/Parameter/utils';
import type { IncomingMessageType, ParamsType, ServerResponseType } from '@/Routing/types';

export type ParameterDecoratorHandlerType = (request: IncomingMessageType, response: ServerResponseType, params: ParamsType) => unknown;

/**
 * Create custom Parameter decorator
 *
 * @param {function} handler - Param handler.
 */
export function CreateParamDecorator(handler: ParameterDecoratorHandlerType): ParameterDecorator {
  return (target: any, propertyKey, parameterIndex): void => {
    const existedFilters = MetaStore.getByKey(target[propertyKey], MetaStoreKeys.properties) || { };

    existedFilters[parameterIndex] = handler;

    MetaStore.addMeta(target[propertyKey], MetaStoreKeys.properties, existedFilters);
  };
}

/**
 * Parse request body
 */
export const Body = CreateParamDecorator(bodyParser);

/**
 * Get Parameter by key
 *
 * @param {string} paramKey - Specified key.
 */
export function Param(paramKey: string) {
  return CreateParamDecorator(paramsParser(paramKey));
}

/**
 * Get parameters as object
 */
export const Params = CreateParamDecorator(getParams);

/**
 * Get query parameters as object
 */
export const Query = CreateParamDecorator(getQuery);

/**
 * Get response parameter
 */
export const Response = CreateParamDecorator(getResponse);

/**
 * Get request parameter
 */
export const Request = CreateParamDecorator(getRequest);
