import Logger from '@/utils/Logger';
import { StatusCodes } from '@/utils/StatusCodes';
import { IncomingMessageType, ServerResponseType } from '@/Routing/types';

function ServerErrorHandler (
  request: IncomingMessageType,
  response: ServerResponseType,
  error: Error,
) {
  Logger.error('Unexpected Server Error', `Error ${StatusCodes.InternalServerError}`);
  Logger.error(error.message);

  response.statusCode = StatusCodes.InternalServerError;
  response.statusMessage = 'Internal Server Error';
  response.end();
}

export default ServerErrorHandler;
module.exports = ServerErrorHandler;
