"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../../utils/Logger"));
function ServerError(message, middlewareName) {
    Logger_1.default.error(message, `Middleware Error in ${middlewareName}`);
    return new Error(message);
}
exports.default = ServerError;
//# sourceMappingURL=ServerError.js.map