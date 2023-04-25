import { IncomingMessageType, ServerResponseType } from '../../Routing/types';
import { ErrorValueType } from '../../types';

function CustomErrorHandler (
  request: IncomingMessageType,
  response: ServerResponseType,
  errorValue: ErrorValueType,
) {
  response.statusCode = errorValue.statusCode;
  response.statusMessage = errorValue.message;
  response.end();
}

export default CustomErrorHandler;
module.exports = CustomErrorHandler;
