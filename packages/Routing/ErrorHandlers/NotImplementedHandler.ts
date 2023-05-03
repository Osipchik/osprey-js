import Logger from '../../utils/Logger';
import { IncomingMessageType, ServerResponseType } from '../../Routing/types';
import { StatusCodes } from '../../Response/enums';

function NotImplementedHandler (
  request: IncomingMessageType,
  response: ServerResponseType,
) {
  const message = `The request method: ${request.method} is not supported by the server and cannot be handled`;
  Logger.error(message, `Error ${StatusCodes.NotImplemented}`);

  response.statusCode = StatusCodes.NotImplemented;
  response.statusMessage = message;
  response.end();
}

export default NotImplementedHandler;
module.exports = NotImplementedHandler;
