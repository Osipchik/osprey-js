import { ErrorValueType } from '../../types';

function CustomErrorHandler (
  request: Request,
  errorValue: ErrorValueType,
) {

  return new Response(null, {
    status: errorValue.statusCode,
    statusText: errorValue.message,
  });
}

export default CustomErrorHandler;
module.exports = CustomErrorHandler;
