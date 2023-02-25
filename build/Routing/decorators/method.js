"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = exports.Options = exports.Trace = exports.Patch = exports.Delete = exports.Post = exports.Put = exports.Get = void 0;
const tslib_1 = require("tslib");
const methods_1 = require("../../Routing/methods");
const metaStore_1 = tslib_1.__importDefault(require("../../utils/metaStore"));
const statusCodes_1 = require("../../Response/statusCodes");
function getStatusCode(method) {
    switch (method) {
        case methods_1.POST: return statusCodes_1.StatusCodes.Created;
        default: return statusCodes_1.StatusCodes.Ok;
    }
}
function asyncHandler(originalHandler, callBack) {
    return async (request, response, ...args) => {
        const context = {
            request,
            response
        };
        const result = await originalHandler.apply({ ...this, ...context }, args);
        callBack(response, result);
    };
}
function decoratorFabric(method, path, statusCode) {
    const responseStatusCode = statusCode || getStatusCode(method);
    return (target, name, descriptor) => {
        const originalDescriptorValue = descriptor.value;
        const meta = metaStore_1.default.getMeta(descriptor);
        function handler(response, result) {
            response.statusCode = result.statusCode;
            response.setHeader('Content-Type', result.contentType);
            response.end(result.value);
        }
        function handlerWithHeader(response, result) {
            response.statusCode = result.statusCode;
            response.setHeader('Content-Type', result.contentType);
            response.setHeader(meta.header.name, meta.header.value);
            response.end(result.value);
        }
        descriptor.value = asyncHandler(originalDescriptorValue, meta?.header ? handlerWithHeader : handler);
        metaStore_1.default.addMeta(descriptor, 'meta', {
            path,
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