import Logger from '../../utils/Logger';
import { IncomingMessageType, ServerResponseType } from '../../Routing/types';
import { StatusCodes } from '../../Response/statusCodes';

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
