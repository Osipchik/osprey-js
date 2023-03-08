"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metaStore_1 = __importDefault(require("../utils/metaStore"));
function Controller(prefix) {
    return function (constructor) {
        const methods = Object.getOwnPropertyNames(constructor.prototype).reduce((acc, key) => {
            const handler = constructor.prototype[key];
            const handlerMeta = metaStore_1.default.getMeta(handler);
            if (handlerMeta) {
                handlerMeta.meta.prefix = prefix || '';
                acc.push(handler);
            }
            return acc;
        }, []);
        metaStore_1.default.addMeta(constructor, 'methods', methods);
    };
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map