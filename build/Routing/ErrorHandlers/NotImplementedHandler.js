"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("../../utils/Logger"));
const StatusCodes_1 = require("../../utils/StatusCodes");
function NotImplementedHandler(request, response) {
    const message = `The request method: ${request.method} is not supported by the server and cannot be handled`;
    Logger_1.default.error(message, `Error ${StatusCodes_1.StatusCodes.NotImplemented}`);
    response.statusCode = StatusCodes_1.StatusCodes.NotImplemented;
    response.statusMessage = message;
    response.end();
}
exports.default = NotImplementedHandler;
module.exports = NotImplementedHandler;
