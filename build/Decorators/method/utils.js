"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metaStore_1 = __importDefault(require("../../utils/metaStore"));
function asyncHandler(originalHandler, meta) {
    return (controller) => async (request, response, props) => {
        const context = {
            ...controller,
            request,
            response,
        };
        const handleResponse = await originalHandler.call(context);
        handleResponse(request, response, meta);
    };
}
function asyncHandlerWithParams(originalHandler, meta, paramsParsers) {
    return (controller) => async (request, response, props) => {
        const context = {
            ...controller,
            request,
            response
        };
        const params = await Promise.all(paramsParsers.map((callback) => callback(request, props)));
        const handleResponse = await originalHandler.apply(context, params);
        handleResponse(request, response, meta);
    };
}
function DecoratorFabric(method, path) {
    return (_target, _name, descriptor) => {
        const originalDescriptorValue = descriptor.value;
        const meta = metaStore_1.default.getMeta(descriptor);
        const propertyParserObject = metaStore_1.default.getMeta(descriptor.value);
        const propertiesParsers = propertyParserObject ? Object.values(propertyParserObject) : null;
        descriptor.value = propertiesParsers?.length
            ? asyncHandlerWithParams(originalDescriptorValue, meta, propertiesParsers)
            : asyncHandler(originalDescriptorValue, meta);
        metaStore_1.default.addMeta(descriptor, 'meta', {
            path: path || '',
            method,
        });
        return descriptor;
    };
}
exports.default = DecoratorFabric;
//# sourceMappingURL=utils.js.map