"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultResponseFabric = exports.defaultOptions = void 0;
const enums_1 = require("../Response/enums");
const Config_1 = __importDefault(require("../Config"));
const ResponseStringify = {
    [enums_1.ContentTypes.Application_Serialize]: Config_1.default.getValue('serializer'),
};
const defaultOptions = (statusCode) => ({
    statusCode,
    contentType: enums_1.ContentTypes.Application_Serialize,
});
exports.defaultOptions = defaultOptions;
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
exports.resultResponseFabric = resultResponseFabric;
//# sourceMappingURL=utils.js.map