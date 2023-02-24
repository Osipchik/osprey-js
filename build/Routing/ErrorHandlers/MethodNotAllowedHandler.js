"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCodes_1 = require("../../utils/StatusCodes");
function MethodNotAllowedHandler(request, response) {
    const message = `The request ${request.method} ${request.url} is not allowed`;
    response.statusCode = StatusCodes_1.StatusCodes.MethodNotAllowed;
    response.statusMessage = message;
    response.end();
}
exports.default = MethodNotAllowedHandler;
module.exports = MethodNotAllowedHandler;
