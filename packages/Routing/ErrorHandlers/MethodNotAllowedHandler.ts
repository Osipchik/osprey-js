import { StatusCodes } from '../../Response/enums';
import { IncomingMessageType, ServerResponseType } from '../../Routing/types';

function MethodNotAllowedHandler (
  request: IncomingMessageType,
  response: ServerResponseType,
) {
  const message = `The request ${request.method} ${request.url} is not allowed`;

  response.statusCode = StatusCodes.MethodNotAllowed;
  response.statusMessage = message;
  response.end();
}

export default MethodNotAllowedHandler;
module.exports = MethodNotAllowedHandler;
