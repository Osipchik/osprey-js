import { StatusCodes } from '../../Response/enums';

function NotFoundHandler (request: Request) {
  const message = `The request ${request.method} ${request.url} is not found`;

  return new Response(message, {
    headers: new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
    }),
    status: StatusCodes.NotFound,
    statusText: message,
  });
}

export default NotFoundHandler;
module.exports = NotFoundHandler;
