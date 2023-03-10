"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../../utils/Logger"));
const statusCodes_1 = require("../../Response/statusCodes");
function ServerErrorHandler(request, response, error) {
    Logger_1.default.error(error.message, `Error ${statusCodes_1.StatusCodes.InternalServerError}`);
    Logger_1.default.data(error.stack || '');
    response.statusCode = statusCodes_1.StatusCodes.InternalServerError;
    response.statusMessage = 'Internal Server Error';
    response.end('500: Internal Server Error');
}
exports.default = ServerErrorHandler;
module.exports = ServerErrorHandler;
//# sourceMappingURL=ServerErrorHandler.js.map