"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMethodDecorator = exports.Head = exports.Options = exports.Trace = exports.Patch = exports.Delete = exports.Post = exports.Put = exports.Get = void 0;
const methods_1 = require("../../Routing/methods");
const utils_1 = __importDefault(require("../../Decorators/method/utils"));
const metaStore_1 = __importDefault(require("../../utils/metaStore"));
/**
 * Routes HTTP GET requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Get(path) {
    return (0, utils_1.default)(methods_1.Methods.GET, path);
}
exports.Get = Get;
/**
 * Routes HTTP Put requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Put(path) {
    return (0, utils_1.default)(methods_1.Methods.PUT, path);
}
exports.Put = Put;
/**
 * Routes HTTP Post requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Post(path) {
    return (0, utils_1.default)(methods_1.Methods.POST, path);
}
exports.Post = Post;
/**
 * Routes HTTP Delete requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Delete(path) {
    return (0, utils_1.default)(methods_1.Methods.DELETE, path);
}
exports.Delete = Delete;
/**
 * Routes HTTP Patch requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Patch(path) {
    return (0, utils_1.default)(methods_1.Methods.PATCH, path);
}
exports.Patch = Patch;
/**
 * Routes HTTP Trace requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Trace(path) {
    return (0, utils_1.default)(methods_1.Methods.TRACE, path);
}
exports.Trace = Trace;
/**
 * Routes HTTP Options requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Options(path) {
    return (0, utils_1.default)(methods_1.Methods.OPTIONS, path);
}
exports.Options = Options;
/**
 * Routes HTTP Head requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Head(path) {
    return (0, utils_1.default)(methods_1.Methods.HEAD, path);
}
exports.Head = Head;
function CreateMethodDecorator(handler) {
    return (_target, _name, descriptor) => {
        const meta = metaStore_1.default.getMeta(descriptor);
        const existedFilters = meta?.filters || [];
        metaStore_1.default.addMeta(descriptor, 'filters', [
            ...existedFilters,
            handler,
        ]);
        return descriptor;
    };
}
exports.CreateMethodDecorator = CreateMethodDecorator;
//# sourceMappingURL=index.js.map