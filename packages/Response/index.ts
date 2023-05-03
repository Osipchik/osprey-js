import { defaultOptions, StatusCodes } from '@/Response/enums';
import { resultResponseFabric } from '@/Response/utils';
import type { IResponse } from '@/Response/types';

const Response: IResponse = {
  Ok: resultResponseFabric(defaultOptions(StatusCodes.Ok)),
  Created: resultResponseFabric(defaultOptions(StatusCodes.Created)),
  PartialContent: resultResponseFabric(defaultOptions(StatusCodes.PartialContent)),
  BadRequest: resultResponseFabric(defaultOptions(StatusCodes.BadRequest)),
  NotFound: resultResponseFabric(defaultOptions(StatusCodes.NotFound)),
  NoContent: resultResponseFabric(defaultOptions(StatusCodes.NoContent)),
  InternalServerError: resultResponseFabric(defaultOptions(StatusCodes.NotFound)),
  NotImplemented: resultResponseFabric(defaultOptions(StatusCodes.NotImplemented)),
  Accepted: resultResponseFabric(defaultOptions(StatusCodes.Accepted)),
};

export default Response;
