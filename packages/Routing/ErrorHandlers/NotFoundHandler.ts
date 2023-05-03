import { StatusCodes } from '@/Response/enums';
import { IncomingMessageType, ServerResponseType } from '@/Routing/types';

function NotFoundHandler (
  request: IncomingMessageType,
  response: ServerResponseType,
) {
  const message = `The request ${request.method} ${request.url} is not found`;

  response.setHeader('Content-Type', 'text/html; charset=UTF-8');
  response.statusCode = StatusCodes.NotFound;
  response.statusMessage = message;
  response.end(message);
}

export default NotFoundHandler;
module.exports = NotFoundHandler;
