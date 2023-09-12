import { StatusCodes } from './Response/enums';
import {
  WebSocketServeOptions,
  GenericServeOptions,
  TLSOptions,
} from 'bun';
import { ActionFilterKeys } from '@/Decorators/ActionFilters/utils';

export type PipelineDescriptorType = {
  type: string;
  handler: Function;
  isAsync: Boolean;
};

export type BreakType = (error: unknown) => void;

export type ErrorValueType = {
  message: string;
  statusCode: StatusCodes;
};

export type TLSOptionsGenericServeOptions = TLSOptions & Pick<GenericServeOptions, 'maxRequestBodySize'| 'development' | 'id'>

export type ServerConfigType = {
  websocket?: WebSocketServeOptions,
  tlsOptions?: TLSOptionsGenericServeOptions,
};

export type RouteHandlerPathParametersType = {
  pathName: string,
  prefix: string,
  props: string[],
};

export type HandlersOrderType = {
  asyncValues: Function[],
  asyncIndexes: number[],
  syncValues: Function[],
  syncIndexes: number[],
}

export type WrappedMethodMta = ActionFilterKeys & {
  meta: any,
};

export type AppPropsType = {
  tlsOptions?: TLSOptionsGenericServeOptions,
  websocket?: WebSocketServeOptions,
  threadPoolSize?: number;
};
