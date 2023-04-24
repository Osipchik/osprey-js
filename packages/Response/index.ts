import { defaultOptions, StatusCodes } from './enums';
import { resultResponseFabric } from '../Response/utils';
import { IResponse } from './types';

const Response: IResponse = {
  Ok: resultResponseFabric(defaultOptions(StatusCodes.Ok, true)),
  Created: resultResponseFabric(defaultOptions(StatusCodes.Created, true)),
  PartialContent: resultResponseFabric(defaultOptions(StatusCodes.PartialContent, true)),
  BadRequest: resultResponseFabric(defaultOptions(StatusCodes.BadRequest, false)),
  NotFound: resultResponseFabric(defaultOptions(StatusCodes.NotFound, false)),
  NoContent: resultResponseFabric(defaultOptions(StatusCodes.NoContent, true)),
  InternalServerError: resultResponseFabric(defaultOptions(StatusCodes.NotFound, false)),
  NotImplemented: resultResponseFabric(defaultOptions(StatusCodes.NotImplemented, false)),
  Accepted: resultResponseFabric(defaultOptions(StatusCodes.Accepted, true)),
};

export default Response;
