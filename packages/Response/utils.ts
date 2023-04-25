import zlib from 'zlib';
import {
  ACCEPT_HEADERS, BROTLI_OPTIONS,
  COMPRESSION_TYPES,
  CONTENT_HEADERS,
  ContentTypes, GZIP_OPTIONS,
  ResponseStringify,
  StatusCodes
} from '../Response/enums';
import { IOptions, ResultResponseType } from '../Response/types';
import { IncomingMessageType, ServerResponseType } from '../Routing/types';

interface IDefaultOptions {
  statusCode: StatusCodes,
  contentType: ContentTypes,
}

export function resultResponseFabric(defaultOptions: IDefaultOptions) {
  return (result: unknown, currentOptions?: IOptions): ResultResponseType => {
    const options = { ...defaultOptions, ...currentOptions, };

    const stringify = ResponseStringify[options.contentType] || ResponseStringify[ContentTypes.Text_Plain];

    const stringifiedResult = stringify(result);

    return [stringifiedResult, options];
  };
}

export function sendResponse(
  request: IncomingMessageType,
  response: ServerResponseType,
  meta: any,
  result: string,
  options: IDefaultOptions,
): void {
  let resultBuffer: Buffer;

  if (request.headers[ACCEPT_HEADERS.ENCODING]!.indexOf(COMPRESSION_TYPES.gzip) !== -1) {
    resultBuffer = zlib.gzipSync(result, GZIP_OPTIONS);

    response.writeHead(options.statusCode, {
      [CONTENT_HEADERS.TYPE]: options.contentType,
      [CONTENT_HEADERS.ENCODING]: CONTENT_HEADERS.GZIP,
    });
  } else if (request.headers[ACCEPT_HEADERS.ENCODING]!.indexOf(COMPRESSION_TYPES.deflate) !== -1) {
    resultBuffer = zlib.deflateSync(result);

    response.writeHead(options.statusCode, {
      [CONTENT_HEADERS.TYPE]: options.contentType,
      [CONTENT_HEADERS.ENCODING]: COMPRESSION_TYPES.deflate,
    });
  } else if (request.headers[ACCEPT_HEADERS.ENCODING]!.indexOf(COMPRESSION_TYPES.br) !== -1) {
    resultBuffer = zlib.brotliCompressSync(result, BROTLI_OPTIONS);

    response.writeHead(options.statusCode, {
      [CONTENT_HEADERS.TYPE]: options.contentType,
      [CONTENT_HEADERS.ENCODING]: CONTENT_HEADERS.BR,
    });
  } else if (request.headers[ACCEPT_HEADERS.ENCODING]!.indexOf(COMPRESSION_TYPES.compress) !== -1) {
    resultBuffer = zlib.brotliCompressSync(result, BROTLI_OPTIONS);

    response.writeHead(options.statusCode, {
      [CONTENT_HEADERS.TYPE]: options.contentType,
      [CONTENT_HEADERS.ENCODING]: COMPRESSION_TYPES.compress,
    });
  } else {
    resultBuffer = new Buffer(result);
    response.writeHead(options.statusCode, {
      [CONTENT_HEADERS.TYPE]: options.contentType,
    });
  }

  response.write(resultBuffer);
  response.end();
}

export function ErrorHandler(statusCode: StatusCodes | number, message: string) {

}
