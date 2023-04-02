"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parameterHandler_1 = __importDefault(require("../../Decorators/method/parameterHandler"));
const methodHandler_1 = __importDefault(require("../../Decorators/method/methodHandler"));
const metaStore_1 = __importDefault(require("../../utils/metaStore"));
const helpers_1 = require("../../utils/helpers");
function DecoratorFabric(method, path) {
    return (_target, _name, descriptor) => {
        const originalDescriptorValue = descriptor.value;
        const meta = metaStore_1.default.getMeta(descriptor);
        const propertyParserObject = metaStore_1.default.getMeta(descriptor.value);
        const propertyParser = (0, parameterHandler_1.default)(propertyParserObject);
        const isOriginAsync = (0, helpers_1.isAsyncFunction)(originalDescriptorValue);
        const isPropertyParserAsync = propertyParser ? (0, helpers_1.isAsyncFunction)(propertyParser) : false;
        descriptor.value = (0, methodHandler_1.default)(originalDescriptorValue, meta, propertyParser, isPropertyParserAsync, isOriginAsync);
        metaStore_1.default.addMeta(descriptor, 'meta', {
            path: path || '',
            method,
            isOriginAsync,
            isPropertyParserAsync
        });
        return descriptor;
    };
}
exports.default = DecoratorFabric;
//# sourceMappingURL=utils.js.map