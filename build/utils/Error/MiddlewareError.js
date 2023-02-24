"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("../../utils/Logger"));
function MiddlewareError(message, middlewareName) {
    Logger_1.default.error(message, `Middleware Error in ${middlewareName}`);
    return new Error(message);
}
exports.default = MiddlewareError;
