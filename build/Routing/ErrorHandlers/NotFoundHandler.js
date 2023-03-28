"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../Response/enums");
function NotFoundHandler(request, response) {
    const message = `The request ${request.method} ${request.url} is not found`;
    response.setHeader('Content-Type', 'text/html; charset=UTF-8');
    response.statusCode = enums_1.StatusCodes.NotFound;
    response.statusMessage = message;
    response.end(message);
}
exports.default = NotFoundHandler;
module.exports = NotFoundHandler;
//# sourceMappingURL=NotFoundHandler.js.map