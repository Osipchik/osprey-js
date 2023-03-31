import MetaStore from '../../utils/metaStore';
import { bodyParser, getParams, getQuery, paramsParser } from '../../Decorators/parameter/utils';
import {IncomingMessageType, ParamsType} from "@/Routing/types";

export type ParameterDecoratorHandlerType = (request: IncomingMessageType, params: ParamsType) => unknown;
/**
 * Create custom parameter decorator
 *
 * @param {function} handler - Param handler.
 */
export function CreateParamDecorator(handler: ParameterDecoratorHandlerType): ParameterDecorator {
  return (target, propertyKey, parameterIndex): void => {
    MetaStore.addMeta((target as any)[propertyKey], parameterIndex, handler);
  };
}

/**
 * Parse request body
 */
export const Body = CreateParamDecorator(bodyParser);

/**
 * Get parameter by key
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
