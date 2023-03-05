"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const serialize_javascript_1 = __importDefault(require("serialize-javascript"));
const statusCodes_1 = require("./statusCodes");
const defaultOptions = (statusCode) => ({
    statusCode,
    contentType: 'application/json',
    isJSON: true,
});
function resultResponseFabric(defaultOptions) {
    return (result, options) => {
        const currentOptions = { ...options, ...defaultOptions };
        let contentType;
        let stringifiedResult = result;
        if (currentOptions.isJSON) {
            stringifiedResult = (0, serialize_javascript_1.default)(result, { isJSON: true });
            contentType = 'application/json';
        }
        if (!contentType) {
            contentType = 'text/html; charset=UTF-8';
        }
        else {
            contentType = currentOptions.contentType;
        }
        return (request, response, meta) => {
            response.statusCode = currentOptions.statusCode;
            response.setHeader('Content-Type', contentType);
            response.end(stringifiedResult);
        };
    };
}
function textResponseFabric(defaultOptions) {
    return (message, options) => {
        const currentOptions = { ...options, ...defaultOptions };
        let contentType;
        if (!contentType) {
            contentType = 'text/html; charset=UTF-8';
        }
        else {
            contentType = currentOptions.contentType;
        }
        return (request, response, meta) => {
            response.statusCode = currentOptions.statusCode;
            response.setHeader('Content-Type', contentType);
            response.end(message);
        };
    };
}
const Response = {
    Ok: resultResponseFabric(defaultOptions(statusCodes_1.StatusCodes.Ok)),
    Created: resultResponseFabric(defaultOptions(statusCodes_1.StatusCodes.Created)),
    PartialContent: resultResponseFabric(defaultOptions(statusCodes_1.StatusCodes.PartialContent)),
    BadRequest: resultResponseFabric(defaultOptions(statusCodes_1.StatusCodes.BadRequest)),
    NotFound: resultResponseFabric(defaultOptions(statusCodes_1.StatusCodes.NotFound)),
    InternalServerError: resultResponseFabric(defaultOptions(statusCodes_1.StatusCodes.NotFound)),
    NotImplemented: resultResponseFabric(defaultOptions(statusCodes_1.StatusCodes.NotImplemented)),
    Accepted: textResponseFabric(defaultOptions(statusCodes_1.StatusCodes.Accepted)),
};
exports.Response = Response;
//# sourceMappingURL=index.js.map