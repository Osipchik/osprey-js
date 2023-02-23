import { StatusCodes } from '@/utils/StatusCodes';
import { IncomingMessageType, ServerResponseType } from '@/Routing/types';

function NotFoundHandler (
  request: IncomingMessageType,
  response: ServerResponseType,
) {
  const message = `The request ${request.method} ${request.url} is not found`;

  response.statusCode = StatusCodes.NotFound;
  response.statusMessage = message;
  response.end();
}

export default NotFoundHandler;
module.exports = NotFoundHandler;
