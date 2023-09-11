import Logger from '../../utils/Logger';
import { StatusCodes } from '../../Response/enums';

function ServerErrorHandler (
  request: Request,
  error: Error,
) {
  Logger.error(error.message, `Error ${StatusCodes.InternalServerError}`);
  Logger.data(error.stack || '');

  const message = 'Internal Server Error';

  return new Response(message, {
    headers: new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
    }),
    status: StatusCodes.InternalServerError,
    statusText: message,
  });
}

export default ServerErrorHandler;
module.exports = ServerErrorHandler;
