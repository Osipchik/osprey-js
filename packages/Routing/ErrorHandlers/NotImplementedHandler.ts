import Logger from '../../utils/Logger';
import { StatusCodes } from '../../Response/enums';

function NotImplementedHandler (request: Request) {
  const message = `The request method: ${request.method} is not supported by the server and cannot be handled`;
  Logger.error(message, `Error ${StatusCodes.NotImplemented}`);

  return new Response(message, {
    headers: new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
    }),
    status: StatusCodes.NotImplemented,
    statusText: message,
  });
}

export default NotImplementedHandler;
module.exports = NotImplementedHandler;
