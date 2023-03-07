"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("../../Response/statusCodes");
function NotFoundHandler(request, response) {
    const message = `The request ${request.method} ${request.url} is not found`;
    response.statusCode = statusCodes_1.StatusCodes.NotFound;
    response.statusMessage = message;
    response.end();
}
exports.default = NotFoundHandler;
module.exports = NotFoundHandler;
//# sourceMappingURL=NotFoundHandler.js.map