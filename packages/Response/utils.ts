import zlib from 'zlib';
import {
  ACCEPT_HEADERS, BROTLI_OPTIONS,
  COMPRESSION_TYPES,
  CONTENT_HEADERS,
  ContentTypes, GZIP_OPTIONS,
  ResponseStringify,
  StatusCodes
} from '../Response/enums';
import { IOptions, ResponseHandlerType } from '../Response/types';
import { IncomingMessageType, ServerResponseType } from '../Routing/types';

interface IDefaultOptions {
  statusCode: StatusCodes,
  contentType: ContentTypes,
}

export function resultResponseFabric(defaultOptions: IDefaultOptions) {
  return (result: unknown, options?: IOptions): ResponseHandlerType => {
    const currentOptions = { ...defaultOptions, ...options, };

    const stringify = ResponseStringify[currentOptions.contentType] || ResponseStringify[ContentTypes.Text_Plain];

    const stringifiedResult = stringify(result);

    return (
      request: IncomingMessageType,
      response: ServerResponseType,
      meta: any,
    ) => {
      let result = stringifiedResult;

      if (request.headers[ACCEPT_HEADERS.ENCODING]!.indexOf(COMPRESSION_TYPES.gzip) !== -1) {
        result = zlib.gzipSync(stringifiedResult, GZIP_OPTIONS);

        response.writeHead(currentOptions.statusCode, {
          [CONTENT_HEADERS.TYPE]: currentOptions.contentType,
          [CONTENT_HEADERS.ENCODING]: CONTENT_HEADERS.GZIP,
        });
      } else if (request.headers[ACCEPT_HEADERS.ENCODING]!.indexOf(COMPRESSION_TYPES.deflate) !== -1) {
        result = zlib.deflateSync(stringifiedResult);

        response.writeHead(currentOptions.statusCode, {
          [CONTENT_HEADERS.TYPE]: currentOptions.contentType,
          [CONTENT_HEADERS.ENCODING]: COMPRESSION_TYPES.deflate,
        });
      } else if (request.headers[ACCEPT_HEADERS.ENCODING]!.indexOf(COMPRESSION_TYPES.br) !== -1) {
        result = zlib.brotliCompressSync(stringifiedResult, BROTLI_OPTIONS);

        response.writeHead(currentOptions.statusCode, {
          [CONTENT_HEADERS.TYPE]: currentOptions.contentType,
          [CONTENT_HEADERS.ENCODING]: CONTENT_HEADERS.BR,
        });
      } else if (request.headers[ACCEPT_HEADERS.ENCODING]!.indexOf(COMPRESSION_TYPES.compress) !== -1) {
        result = zlib.brotliCompressSync(stringifiedResult, BROTLI_OPTIONS);

        response.writeHead(currentOptions.statusCode, {
          [CONTENT_HEADERS.TYPE]: currentOptions.contentType,
          [CONTENT_HEADERS.ENCODING]: COMPRESSION_TYPES.compress,
        });
      } else {
        response.writeHead(currentOptions.statusCode, {
          [CONTENT_HEADERS.TYPE]: currentOptions.contentType,
        });
      }

      response.write(result);
      response.end();
    }
  };
}
