"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = exports.Options = exports.Trace = exports.Patch = exports.Delete = exports.Post = exports.Put = exports.Get = void 0;
const tslib_1 = require("tslib");
const methods_1 = require("../../Routing/methods");
const StatusCodes_1 = require("../../utils/StatusCodes");
const helpers_1 = require("../../utils/helpers");
const metaStore_1 = tslib_1.__importDefault(require("../../utils/metaStore"));
function getStatusCode(method) {
    switch (method) {
        case methods_1.POST: return StatusCodes_1.StatusCodes.Created;
        default: return StatusCodes_1.StatusCodes.Ok;
    }
}
function asyncHandler(original, callBack) {
    return async (request, response, ...args) => {
        const context = {
            request,
            response
        };
        const result = await original.apply({ ...this, ...context }, args);
        callBack(response, result);
    };
}
function decoratorFabric(method, path, statusCode) {
    const responseStatusCode = statusCode ?? getStatusCode(method);
    return (target, name, descriptor) => {
        const original = descriptor.value;
        const meta = metaStore_1.default.getMeta(descriptor);
        function handler(response, result) {
            response.statusCode = result?.statusCode ?? responseStatusCode;
            if ((0, helpers_1.isPrimitive)(result)) {
                response.setHeader('Content-Type', 'text/html; charset=UTF-8');
                response.end(result);
            }
            else {
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(result));
            }
        }
        function handlerWithHeader(response, result) {
            response.statusCode = result?.statusCode ?? responseStatusCode;
            response.setHeader(meta.header.name, meta.header.value);
            if ((0, helpers_1.isPrimitive)(result)) {
                response.setHeader('Content-Type', 'text/html; charset=UTF-8');
                response.end(result);
            }
            else {
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(result));
            }
        }
        descriptor.value = asyncHandler(original, meta.header ? handlerWithHeader : handler);
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