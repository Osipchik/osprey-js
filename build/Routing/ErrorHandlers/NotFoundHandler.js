"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCodes_1 = require("../../utils/StatusCodes");
function NotFoundHandler(request, response) {
    const message = `The request ${request.method} ${request.url} is not found`;
    response.statusCode = StatusCodes_1.StatusCodes.NotFound;
    response.statusMessage = message;
    response.end();
}
exports.default = NotFoundHandler;
module.exports = NotFoundHandler;
