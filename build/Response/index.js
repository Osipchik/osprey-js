"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonResult = exports.Ok = void 0;
const tslib_1 = require("tslib");
const serialize_javascript_1 = tslib_1.__importDefault(require("serialize-javascript"));
const statusCodes_1 = require("./statusCodes");
const defaultOkOptions = {
    statusCode: statusCodes_1.StatusCodes.Ok,
    contentType: 'application/json',
    isJSON: true,
};
function Ok(result, options) {
    console.log('Ok', this);
    const currentOptions = { ...options, ...defaultOkOptions };
    let contentType = currentOptions.contentType;
    let stringifiedResult = result;
    if (currentOptions.isJSON) {
        stringifiedResult = (0, serialize_javascript_1.default)(result, { isJSON: true });
        contentType = 'application/json';
    }
    else if (!contentType) {
        contentType = 'text/html; charset=UTF-8';
    }
    return {
        value: stringifiedResult,
        statusCode: currentOptions.statusCode,
        contentType,
    };
}
exports.Ok = Ok;
;
function JsonResult(result, options) {
    return {
        result,
        statusCode: options?.statusCode,
        contentType: 'application/json',
    };
}
exports.JsonResult = JsonResult;
;
//# sourceMappingURL=index.js.map