import { StatusCodes } from './Response/enums';
import {GenericServeOptions, TLSOptions} from 'bun';

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
