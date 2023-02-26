"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const metaStore_1 = tslib_1.__importDefault(require("../../utils/metaStore"));
function Header(name, value) {
    return (target, key, descriptor) => {
        metaStore_1.default.addMeta(descriptor, 'header', { name, value });
    };
}
exports.default = Header;
//# sourceMappingURL=header.js.map