import { defaultOptions, StatusCodes } from './enums';
import { resultResponseFabric } from '../Response/utils';

/**
 * The request succeeded. The result meaning of "success" depends on the HTTP method:
 *
 * GET: The resource has been fetched and transmitted in the message body.
 * HEAD: The representation headers are included in the response without any message body.
 * PUT or POST: The resource describing the result of the action is transmitted in the message body.
 * TRACE: The message body contains the request message as received by the server.
 * As described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const Ok = resultResponseFabric(defaultOptions(StatusCodes.Ok));

/**
 * The request succeeded, and a new resource was created as a result.
 * This is typically the response sent after POST requests, or some PUT requests.
 * As described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const Created = resultResponseFabric(defaultOptions(StatusCodes.Created));

/**
 * This response code is used when the [Range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range) header is sent from the client to request only part of a resource.
 * As described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const PartialContent = resultResponseFabric(defaultOptions(StatusCodes.PartialContent));

/**
 * The server cannot or will not process the request due to something that is perceived to be a client error
 * (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
 * As described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const BadRequest = resultResponseFabric(defaultOptions(StatusCodes.BadRequest));

/**
 * The server cannot find the requested resource. In the browser, this means the URL is not recognized.
 * In an API, this can also mean that the endpoint is valid but the resource itself does not exist.
 * Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client.
 * As described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const NotFound = resultResponseFabric(defaultOptions(StatusCodes.NotFound));

/**
 * There is no content to send for this request, but the headers may be useful.
 * The user agent may update its cached headers for this resource with the new ones.
 * As described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const NoContent = resultResponseFabric(defaultOptions(StatusCodes.NoContent));

/**
 * The server has encountered a situation it does not know how to handle.
 * As described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const InternalServerError = resultResponseFabric(defaultOptions(StatusCodes.InternalServerError));

/**
 * The request method is not supported by the server and cannot be handled.
 * The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
 * As described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const NotImplemented = resultResponseFabric(defaultOptions(StatusCodes.NotImplemented));

/**
 * The request has been received but not yet acted upon.
 * It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request.
 * It is intended for cases where another process or server handles the request, or for batch processing.
 * As described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const Accepted = resultResponseFabric(defaultOptions(StatusCodes.Accepted));

/**
 * Permanently redirect. The URL of the requested resource has been changed permanently.
 * The new URL is given in the response, as described by [this MSDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const Redirect = resultResponseFabric(defaultOptions(StatusCodes.MovedPermanently));
