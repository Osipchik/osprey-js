"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("../../utils/Logger"));
const statusCodes_1 = require("../../Response/statusCodes");
function NotImplementedHandler(request, response) {
    const message = `The request method: ${request.method} is not supported by the server and cannot be handled`;
    Logger_1.default.error(message, `Error ${statusCodes_1.StatusCodes.NotImplemented}`);
    response.statusCode = statusCodes_1.StatusCodes.NotImplemented;
    response.statusMessage = message;
    response.end();
}
exports.default = NotImplementedHandler;
module.exports = NotImplementedHandler;
//# sourceMappingURL=NotImplementedHandler.js.map