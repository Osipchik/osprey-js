"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = exports.Options = exports.Trace = exports.Patch = exports.Delete = exports.Post = exports.Put = exports.Get = void 0;
const methods_1 = require("../Routing/methods");
const metaStore_1 = __importDefault(require("../utils/metaStore"));
function asyncHandler(originalHandler, meta) {
    return (props) => async (request, response, ...args) => {
        const context = {
            ...props,
            request,
            response
        };
        const handleResponse = await originalHandler.apply(context, args);
        handleResponse(request, response, meta);
    };
}
function decoratorFabric(method, path) {
    return (_target, _name, descriptor) => {
        const originalDescriptorValue = descriptor.value;
        const meta = metaStore_1.default.getMeta(descriptor);
        descriptor.value = asyncHandler(originalDescriptorValue, meta);
        metaStore_1.default.addMeta(descriptor, 'meta', {
            path: path || '',
            method,
        });
        return descriptor;
    };
}
/**
 * Routes HTTP GET requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Get(path) {
    return decoratorFabric(methods_1.GET, path);
}
exports.Get = Get;
/**
 * Routes HTTP Put requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Put(path) {
    return decoratorFabric(methods_1.PUT, path);
}
exports.Put = Put;
/**
 * Routes HTTP Post requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Post(path) {
    return decoratorFabric(methods_1.POST, path);
}
exports.Post = Post;
/**
 * Routes HTTP Delete requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Delete(path) {
    return decoratorFabric(methods_1.DELETE, path);
}
exports.Delete = Delete;
/**
 * Routes HTTP Patch requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Patch(path) {
    return decoratorFabric(methods_1.PATCH, path);
}
exports.Patch = Patch;
/**
 * Routes HTTP Trace requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Trace(path) {
    return decoratorFabric(methods_1.TRACE, path);
}
exports.Trace = Trace;
/**
 * Routes HTTP Options requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Options(path) {
    return decoratorFabric(methods_1.OPTIONS, path);
}
exports.Options = Options;
/**
 * Routes HTTP Head requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Head(path) {
    return decoratorFabric(methods_1.HEAD, path);
}
exports.Head = Head;
//# sourceMappingURL=method.js.map