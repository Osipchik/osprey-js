"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Params = exports.Param = exports.Body = void 0;
const metaStore_1 = __importDefault(require("../utils/metaStore"));
function bodyParser(request, _) {
    return JSON.parse(request.body);
}
function paramsParser(key) {
    return (_, params) => {
        return params[key];
    };
}
function getParams(_, params) {
    return params.params;
}
function getQuery(_, params) {
    return params.query;
}
/**
 * Parse request body
 */
function Body(target, key, index) {
    metaStore_1.default.addMeta(target[key], index, bodyParser);
}
exports.Body = Body;
;
/**
 * Get parameter by key
 *
 * @param {string} paramKey - Specified key.
 */
function Param(paramKey) {
    return (target, key, index) => {
        metaStore_1.default.addMeta(target[key], index, paramsParser(paramKey));
    };
}
exports.Param = Param;
/**
 * Get parameters as object
 */
function Params(target, key, index) {
    metaStore_1.default.addMeta(target[key], index, getParams);
}
exports.Params = Params;
/**
 * Get query parameters as object
 */
function Query(target, key, index) {
    metaStore_1.default.addMeta(target[key], index, getQuery);
}
exports.Query = Query;
//# sourceMappingURL=parameter.js.map