import zlib from 'zlib';

import {
  ACCEPT_HEADERS,
  COMPRESSION_TYPES,
  CONTENT_HEADERS,
  ContentTypes,
  GZIP_OPTIONS,
  BROTLI_OPTIONS,
  ResponseStringify,
  StatusCodes,
} from '../Response/enums';
import type { IOptions, ResultResponseType } from '../Response/types';

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
  request: Request,
  result: string,
  options: IDefaultOptions,
  headers: any,
): Response {
  let resultBuffer: Buffer;
  let header: ResponseInit;

  if (request.headers.get(ACCEPT_HEADERS.ENCODING).indexOf(COMPRESSION_TYPES.gzip) !== -1) {
    resultBuffer = zlib.gzipSync(result, GZIP_OPTIONS);

    header = {
      headers: new Headers({
        [CONTENT_HEADERS.TYPE]: options.contentType,
        [CONTENT_HEADERS.ENCODING]: CONTENT_HEADERS.GZIP,
        ...headers,
      }),
      status: options.statusCode,
    };
  } else if (request.headers.get(ACCEPT_HEADERS.ENCODING).indexOf(COMPRESSION_TYPES.deflate) !== -1) {
    resultBuffer = zlib.deflateSync(result);

    header = {
      headers: new Headers({
        [CONTENT_HEADERS.TYPE]: options.contentType,
        [CONTENT_HEADERS.ENCODING]: COMPRESSION_TYPES.deflate,
        ...headers,
      }),
      status: options.statusCode,
    };
  } else if (request.headers.get(ACCEPT_HEADERS.ENCODING).indexOf(COMPRESSION_TYPES.br) !== -1) {
    resultBuffer = zlib.brotliCompressSync(result, BROTLI_OPTIONS);

    header = {
      headers: new Headers({
        [CONTENT_HEADERS.TYPE]: options.contentType,
        [CONTENT_HEADERS.ENCODING]: CONTENT_HEADERS.BR,
        ...headers,
      }),
      status: options.statusCode,
    };
  } else if (request.headers.get(ACCEPT_HEADERS.ENCODING).indexOf(COMPRESSION_TYPES.compress) !== -1) {
    resultBuffer = zlib.brotliCompressSync(result, BROTLI_OPTIONS);

    header = {
      headers: new Headers({
        [CONTENT_HEADERS.TYPE]: options.contentType,
        [CONTENT_HEADERS.ENCODING]: COMPRESSION_TYPES.compress,
        ...headers,
      }),
      status: options.statusCode,
    };
  } else {
    resultBuffer = new Buffer(result);

    header = {
      headers: new Headers({
        [CONTENT_HEADERS.TYPE]: options.contentType,
        ...headers,
      }),
      status: options.statusCode,
    };
  }

  return new Response(resultBuffer, header);
}
