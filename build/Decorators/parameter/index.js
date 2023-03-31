"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Params = exports.Param = exports.Body = exports.CreateParamDecorator = void 0;
const metaStore_1 = __importDefault(require("../../utils/metaStore"));
const utils_1 = require("../../Decorators/parameter/utils");
/**
 * Create custom parameter decorator
 *
 * @param {function} handler - Param handler.
 */
function CreateParamDecorator(handler) {
    return (target, propertyKey, parameterIndex) => {
        metaStore_1.default.addMeta(target[propertyKey], parameterIndex, handler);
    };
}
exports.CreateParamDecorator = CreateParamDecorator;
/**
 * Parse request body
 */
exports.Body = CreateParamDecorator(utils_1.bodyParser);
/**
 * Get parameter by key
 *
 * @param {string} paramKey - Specified key.
 */
function Param(paramKey) {
    return CreateParamDecorator((0, utils_1.paramsParser)(paramKey));
}
exports.Param = Param;
/**
 * Get parameters as object
 */
exports.Params = CreateParamDecorator(utils_1.getParams);
/**
 * Get query parameters as object
 */
exports.Query = CreateParamDecorator(utils_1.getQuery);
//# sourceMappingURL=index.js.map