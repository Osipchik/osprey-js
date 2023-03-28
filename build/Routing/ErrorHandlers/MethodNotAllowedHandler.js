"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../Response/enums");
function MethodNotAllowedHandler(request, response) {
    const message = `The request ${request.method} ${request.url} is not allowed`;
    response.statusCode = enums_1.StatusCodes.MethodNotAllowed;
    response.statusMessage = message;
    response.end();
}
exports.default = MethodNotAllowedHandler;
module.exports = MethodNotAllowedHandler;
//# sourceMappingURL=MethodNotAllowedHandler.js.map