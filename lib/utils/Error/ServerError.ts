import Logger from '@/utils/Logger';

function ServerError(
  message: string,
  middlewareName: string,
) {
  Logger.error(message, `Middleware Error in ${middlewareName}`);

  return new Error(message);
}

export default ServerError;
