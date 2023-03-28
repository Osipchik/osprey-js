"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../../utils/Logger"));
const enums_1 = require("../../Response/enums");
function NotImplementedHandler(request, response) {
    const message = `The request method: ${request.method} is not supported by the server and cannot be handled`;
    Logger_1.default.error(message, `Error ${enums_1.StatusCodes.NotImplemented}`);
    response.statusCode = enums_1.StatusCodes.NotImplemented;
    response.statusMessage = message;
    response.end();
}
exports.default = NotImplementedHandler;
module.exports = NotImplementedHandler;
//# sourceMappingURL=NotImplementedHandler.js.map