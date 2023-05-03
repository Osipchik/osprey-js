import Logger from '@/utils/Logger';
import { IncomingMessageType, ServerResponseType } from '@/Routing/types';
import { StatusCodes } from '@/Response/enums';

function ServerErrorHandler (
  request: IncomingMessageType,
  response: ServerResponseType,
  error: Error,
) {
  Logger.error(error.message, `Error ${StatusCodes.InternalServerError}`);
  Logger.data(error.stack || '');

  response.statusCode = StatusCodes.InternalServerError;
  response.statusMessage = 'Internal Server Error';
  response.end('500: Internal Server Error');
}

export default ServerErrorHandler;
module.exports = ServerErrorHandler;
