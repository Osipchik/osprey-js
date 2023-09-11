import { defaultOptions, StatusCodes } from './enums';
import { resultResponseFabric } from '../Response/utils';

/**
 * Return OK status and generate response body
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const Ok = resultResponseFabric(defaultOptions(StatusCodes.Ok));

/**
 * Return Created status and generate response body
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const Created = resultResponseFabric(defaultOptions(StatusCodes.Created));

/**
 * Return PartialContent status and generate response body
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const PartialContent = resultResponseFabric(defaultOptions(StatusCodes.PartialContent));

/**
 * Return BadRequest status and generate response body
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const BadRequest = resultResponseFabric(defaultOptions(StatusCodes.BadRequest));

/**
 * Return NotFound status and generate response body
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const NotFound = resultResponseFabric(defaultOptions(StatusCodes.NotFound));

/**
 * Return NoContent status and generate response body
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const NoContent = resultResponseFabric(defaultOptions(StatusCodes.NoContent));

/**
 * Return InternalServerError status and generate response body
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const InternalServerError = resultResponseFabric(defaultOptions(StatusCodes.NotFound));

/**
 * Return NotImplemented status and generate response body
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const NotImplemented = resultResponseFabric(defaultOptions(StatusCodes.NotImplemented));

/**
 * Return Accepted status and generate response body
 *
 * @param {unknown} result - any data.
 * @param {IOptions} currentOptions - optional settings for response.
 *
 */
export const Accepted = resultResponseFabric(defaultOptions(StatusCodes.Accepted));
