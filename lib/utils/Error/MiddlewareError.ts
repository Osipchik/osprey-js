import Logger from '@/utils/Logger';

function MiddlewareError(
  message: string,
  middlewareName: string,
) {
  Logger.error(message, `Middleware Error in ${middlewareName}`);

  return new Error(message);
}

export default MiddlewareError;
