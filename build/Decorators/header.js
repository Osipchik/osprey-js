"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metaStore_1 = __importDefault(require("../utils/metaStore"));
/**
 * Decorator to add header parameter into response.
 *
 * @param {string} name - The key of the property
 * @param {string} value - The value of the property
 */
function Header(key, value) {
    return (_target, _key, descriptor) => {
        metaStore_1.default.addMeta(descriptor, 'header', { key, value });
    };
}
exports.default = Header;
//# sourceMappingURL=header.js.map