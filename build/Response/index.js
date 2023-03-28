"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const Config_1 = __importDefault(require("../Config"));
const ResponseStringify = {
    [enums_1.ContentTypes.Application_Serialize]: Config_1.default.getValue('serializer'),
};
const defaultOptions = (statusCode) => ({
    statusCode,
    contentType: enums_1.ContentTypes.Application_Serialize,
});
function resultResponseFabric(defaultOptions) {
    return (result, options) => {
        const currentOptions = { ...defaultOptions, ...options, };
        const stringifiedResult = ResponseStringify[enums_1.ContentTypes.Application_Serialize](result) || result;
        return (request, response, meta) => {
            response.statusCode = currentOptions.statusCode;
            response.setHeader('Content-Type', currentOptions.contentType);
            response.end(stringifiedResult);
        };
    };
}
const Response = {
    Ok: resultResponseFabric(defaultOptions(enums_1.StatusCodes.Ok)),
    Created: resultResponseFabric(defaultOptions(enums_1.StatusCodes.Created)),
    PartialContent: resultResponseFabric(defaultOptions(enums_1.StatusCodes.PartialContent)),
    BadRequest: resultResponseFabric(defaultOptions(enums_1.StatusCodes.BadRequest)),
    NotFound: resultResponseFabric(defaultOptions(enums_1.StatusCodes.NotFound)),
    NoContent: resultResponseFabric(defaultOptions(enums_1.StatusCodes.NoContent)),
    InternalServerError: resultResponseFabric(defaultOptions(enums_1.StatusCodes.NotFound)),
    NotImplemented: resultResponseFabric(defaultOptions(enums_1.StatusCodes.NotImplemented)),
    Accepted: resultResponseFabric(defaultOptions(enums_1.StatusCodes.Accepted)),
};
exports.default = Response;
//# sourceMappingURL=index.js.map