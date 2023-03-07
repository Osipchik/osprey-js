"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metaStore_1 = __importDefault(require("../../utils/metaStore"));
function Header(name, value) {
    return (target, key, descriptor) => {
        metaStore_1.default.addMeta(descriptor, 'header', { name, value });
    };
}
exports.default = Header;
//# sourceMappingURL=header.js.map