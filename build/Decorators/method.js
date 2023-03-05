"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = exports.Options = exports.Trace = exports.Patch = exports.Delete = exports.Post = exports.Put = exports.Get = void 0;
const methods_1 = require("../Routing/methods");
const metaStore_1 = __importDefault(require("../utils/metaStore"));
function asyncHandler(originalHandler, meta) {
    return async (request, response, ...args) => {
        const context = {
            request,
            response
        };
        const handleResponse = await originalHandler.apply({ ...this, ...context }, args);
        handleResponse(request, response, meta);
    };
}
function decoratorFabric(method, path, statusCode) {
    return (target, name, descriptor) => {
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
function Get(path, statusCode) {
    return decoratorFabric(methods_1.GET, path, statusCode);
}
exports.Get = Get;
function Put(path, statusCode) {
    return decoratorFabric(methods_1.PUT, path, statusCode);
}
exports.Put = Put;
function Post(path, statusCode) {
    return decoratorFabric(methods_1.POST, path, statusCode);
}
exports.Post = Post;
function Delete(path, statusCode) {
    return decoratorFabric(methods_1.DELETE, path, statusCode);
}
exports.Delete = Delete;
function Patch(path, statusCode) {
    return decoratorFabric(methods_1.PATCH, path, statusCode);
}
exports.Patch = Patch;
function Trace(path, statusCode) {
    return decoratorFabric(methods_1.TRACE, path, statusCode);
}
exports.Trace = Trace;
function Options(path, statusCode) {
    return decoratorFabric(methods_1.OPTIONS, path, statusCode);
}
exports.Options = Options;
function Head(path, statusCode) {
    return decoratorFabric(methods_1.HEAD, path, statusCode);
}
exports.Head = Head;
//# sourceMappingURL=method.js.map