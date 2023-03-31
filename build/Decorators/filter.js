"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging = void 0;
const metaStore_1 = __importDefault(require("../utils/metaStore"));
function decoratorFabric() {
    return (_target, _name, descriptor) => {
        const originalDescriptorValue = descriptor.value;
        const meta = metaStore_1.default.getMeta(descriptor);
        // const propertyParserObject = MetaStore.getMeta(descriptor.value);
        // const propertiesParsers = propertyParserObject ? Object.values(propertyParserObject) : null;
        // descriptor.value = propertiesParsers?.length
        //   ? asyncHandlerWithParams(originalDescriptorValue, meta, propertiesParsers as Function[])
        //   : asyncHandler(originalDescriptorValue, meta);
        metaStore_1.default.addMeta(descriptor, 'guard', {
            method: 'asdasdsad',
        });
        return descriptor;
    };
}
/**
 * Routes HTTP GET requests to the specified path.
 *
 * @param {string} path - Specified path.
 */
function Logging() {
    return decoratorFabric();
}
exports.Logging = Logging;
//# sourceMappingURL=filter.js.map