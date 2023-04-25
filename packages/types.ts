import { StatusCodes } from './Response/enums';

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
