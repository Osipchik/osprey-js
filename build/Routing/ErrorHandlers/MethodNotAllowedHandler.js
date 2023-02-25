"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("../../Response/statusCodes");
function MethodNotAllowedHandler(request, response) {
    const message = `The request ${request.method} ${request.url} is not allowed`;
    response.statusCode = statusCodes_1.StatusCodes.MethodNotAllowed;
    response.statusMessage = message;
    response.end();
}
exports.default = MethodNotAllowedHandler;
module.exports = MethodNotAllowedHandler;
//# sourceMappingURL=MethodNotAllowedHandler.js.map