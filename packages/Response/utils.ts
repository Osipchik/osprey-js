import zlib from 'zlib';

import {
  ACCEPT_HEADERS,
  COMPRESSION_TYPES,
  CONTENT_HEADERS,
  ContentTypes,
  GZIP_OPTIONS,
  BROTLI_OPTIONS,
  ResponseEncode,
  StatusCodes,
} from '../Response/enums';
import type { IOptions, ResultResponseType } from '../Response/types';
import {ResultType} from '../Response/types';
import {BunFile} from 'bun';

interface IDefaultOptions {
  statusCode: StatusCodes,
  contentType: ContentTypes,
  isFile?: boolean,
}

export function resultResponseFabric(defaultOptions: IDefaultOptions) {
  return (result: unknown, currentOptions?: IOptions): ResultResponseType => {
    const options = { ...defaultOptions, ...currentOptions, };

    const encode = ResponseEncode[options.contentType];
    const encodeResult = encode(result);

    return [encodeResult, options];
  };
}

export function sendResponse(
  request: Request,
  result: any,
  options: IDefaultOptions,
  headers?: HeadersInit,
): Response {
  let resultBuffer: Buffer | BunFile;
  let header: ResponseInit;

  const encodingType = request.headers.get(ACCEPT_HEADERS.ENCODING);

  if (encodingType.indexOf(COMPRESSION_TYPES.gzip) !== -1) {
    resultBuffer = zlib.gzipSync(result, GZIP_OPTIONS);

    header = {
      headers: new Headers({
        [CONTENT_HEADERS.TYPE]: options.contentType,
        [CONTENT_HEADERS.ENCODING]: CONTENT_HEADERS.GZIP,
        ...headers,
      }),
      status: options.statusCode,
    };
  } else if (encodingType.indexOf(COMPRESSION_TYPES.deflate) !== -1) {
    resultBuffer = zlib.deflateSync(result);

    header = {
      headers: new Headers({
        [CONTENT_HEADERS.TYPE]: options.contentType,
        [CONTENT_HEADERS.ENCODING]: COMPRESSION_TYPES.deflate,
        ...headers,
      }),
      status: options.statusCode,
    };
  } else if (encodingType.indexOf(COMPRESSION_TYPES.br) !== -1) {
    resultBuffer = zlib.brotliCompressSync(result, BROTLI_OPTIONS);

    header = {
      headers: new Headers({
        [CONTENT_HEADERS.TYPE]: options.contentType,
        [CONTENT_HEADERS.ENCODING]: CONTENT_HEADERS.BR,
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
