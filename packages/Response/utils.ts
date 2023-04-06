import { ContentTypes, StatusCodes } from '../Response/enums';
import { IOptions, ResponseHandlerType } from '../Response/types';
import { IncomingMessageType, ServerResponseType } from '../Routing/types';
import Config from '../Config';

const ResponseStringify = {
  [ContentTypes.Application_Serialize]: Config.getValue<Function>('serializer'),
};

export const defaultOptions = (statusCode: StatusCodes) => ({
  statusCode,
  contentType: ContentTypes.Application_Serialize,
});

interface IDefaultOptions {
  statusCode: StatusCodes,
  contentType: ContentTypes,
}

export function resultResponseFabric(defaultOptions: IDefaultOptions) {
  return (result: unknown, options?: IOptions): ResponseHandlerType => {
    const currentOptions = { ...defaultOptions, ...options, };

    const stringifiedResult = ResponseStringify[ContentTypes.Application_Serialize](result) || result;

    return (
      request: IncomingMessageType,
      response: ServerResponseType,
      meta: any,
    ) => {
      response.statusCode = currentOptions.statusCode;
      response.setHeader('Content-Type', currentOptions.contentType);
      response.end(stringifiedResult);
    }
  };
}
