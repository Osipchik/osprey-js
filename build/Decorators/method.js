"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = exports.Options = exports.Trace = exports.Patch = exports.Delete = exports.Post = exports.Put = exports.Get = void 0;
const methods_1 = require("../Routing/methods");
const metaStore_1 = __importDefault(require("../utils/metaStore"));
function asyncHandler(originalHandler, meta) {
    return (classContext) => async (request, response, ...args) => {
        const context = {
            ...classContext,
            request,
            response
        };
        const handleResponse = await originalHandler.apply(context, args);
        handleResponse(request, response, meta);
    };
}
function decoratorFabric(method, path) {
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
function Get(path) {
    return decoratorFabric(methods_1.GET, path);
}
exports.Get = Get;
function Put(path) {
    return decoratorFabric(methods_1.PUT, path);
}
exports.Put = Put;
function Post(path) {
    return decoratorFabric(methods_1.POST, path);
}
exports.Post = Post;
function Delete(path) {
    return decoratorFabric(methods_1.DELETE, path);
}
exports.Delete = Delete;
function Patch(path) {
    return decoratorFabric(methods_1.PATCH, path);
}
exports.Patch = Patch;
function Trace(path) {
    return decoratorFabric(methods_1.TRACE, path);
}
exports.Trace = Trace;
function Options(path) {
    return decoratorFabric(methods_1.OPTIONS, path);
}
exports.Options = Options;
function Head(path) {
    return decoratorFabric(methods_1.HEAD, path);
}
exports.Head = Head;
//# sourceMappingURL=method.js.map