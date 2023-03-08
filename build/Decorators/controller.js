"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metaStore_1 = __importDefault(require("../utils/metaStore"));
/**
 * Create the new node into router
 *
 * @param {string} prefix - Prefix that added for all routes of the Controller
 */
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