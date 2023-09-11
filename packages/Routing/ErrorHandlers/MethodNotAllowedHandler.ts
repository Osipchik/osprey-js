import { StatusCodes } from '../../Response/enums';

function MethodNotAllowedHandler (request: Request) {
  const message = `The request ${request.method} ${request.url} is not allowed`;

  return new Response(message, {
    headers: new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
    }),
    status: StatusCodes.MethodNotAllowed,
    statusText: message,
  });
}

export default MethodNotAllowedHandler;
module.exports = MethodNotAllowedHandler;
