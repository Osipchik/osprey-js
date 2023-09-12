import zlib from 'zlib';
import Config from '../Config';
import { temp } from '../Response/types';

export enum StatusCodes {
  Ok = 200,
  Created,
  Accepted,
  NonAuthoritativeInformation,
  NoContent,
  ResetContent,
  PartialContent,
  MultiStatus,
  AlreadyReported,
  IMUsed = 226,
  BadRequest = 400,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
  NotImplemented = 501,
};

export enum ContentTypes {
  Application_JavaArchive = 'application/java-archive',
  Application_EDI_X12 = 'application/EDI-X12',
  Application_EDIFACT = 'application/EDIFACT',
  Application_OctetStream = 'application/octet-stream',
  Application_Ogg = 'application/ogg',
  Application_Pdf = 'application/pdf',
  Application_XhtmlXml = 'application/xhtml+xml',
  Application_XShockwaveFlash = 'application/x-shockwave-flash',
  Application_LdJson = 'application/ld+json',
  Application_Xml = 'application/xml',
  Application_Zip = 'application/zip',
  Application_XWwwFormUrlencoded = 'application/x-www-form-urlencoded',
  Application_Serialize = 'application/json',

  Audio_Mpeg = 'audio/mpeg',
  Audio_XMsWma = 'audio/x-ms-wma',
  Audio_Vnd = 'audio/vnd.rn-realaudio',
  Audio_XWav = 'audio/x-wav',

  Image_Gif = 'image/gif',
  Image_Jpeg = 'image/jpeg',
  Image_Png = 'image/png',
  Image_Tiff = 'image/tiff',
  Image_Webp = 'image/webp',
  Image_VndMicrosoftIcon = 'image/vnd.microsoft.icon',
  Image_XIcon = 'image/x-icon',
  Image_VndDjvu = 'image/vnd.djvu',
  Image_SvgXml = 'image/svg+xml',

  Multipart_Mixed = 'multipart/mixed',
  Multipart_Alternative = 'multipart/alternative',
  Multipart_Related = 'multipart/related (using by MHTML (HTML mail).)',
  Multipart_FormData = 'multipart/form-data',

  Text_Css = 'text/css',
  Text_Csv = 'text/csv',
  Text_Html = 'text/html',
  Text_Plain = 'text/plain',
  Text_Xml = 'text/xml',

  Video_Mpeg = 'video/mpeg',
  Video_Mp4 = 'video/mp4',
  Video_Quicktime = 'video/quicktime',
  Video_XMsWmv = 'video/x-ms-wmv',
  Video_XMsvideo = 'video/x-msvideo',
  Video_XFlv = 'video/x-flv',
  Video_Webm = 'video/webm',
}

export enum COMPRESSION_TYPES {
  compress = 'compress',
  deflate = 'deflate',
  gzip = 'gzip',
  br = 'br',
}

export enum CONTENT_HEADERS {
  TYPE = 'Content-Type',
  ENCODING = 'Content-Encoding',
  BR = 'br',
  GZIP = 'gzip',
}

export enum ACCEPT_HEADERS {
  ENCODING = 'accept-encoding',
}

export const GZIP_OPTIONS = {
  flush: zlib.constants.Z_FULL_FLUSH,
  memLevel: 7,
  windowBits: 14,
};

export const BROTLI_OPTIONS = {
  flush: zlib.constants.BROTLI_OPERATION_FLUSH,
}

const defaultParsers = () => Object.values(ContentTypes).reduce((acc, key) => {
  return { ...acc, [key]: (content: any) => content };
}, {} as any)();

export const ResponseEncode: temp = {
  ...defaultParsers,
  [ContentTypes.Application_Serialize]: (Config.getValue<Function>('serializer')),
  [ContentTypes.Text_Plain]: Config.getValue<Function>('stringify'),
};

export const defaultOptions = (statusCode: StatusCodes) => ({
  statusCode,
  contentType: ContentTypes.Application_Serialize,
});
