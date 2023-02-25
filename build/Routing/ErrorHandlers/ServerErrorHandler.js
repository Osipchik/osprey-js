"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("../../utils/Logger"));
const statusCodes_1 = require("../../Response/statusCodes");
function ServerErrorHandler(request, response, error) {
    Logger_1.default.error('Unexpected Server Error', `Error ${statusCodes_1.StatusCodes.InternalServerError}`);
    Logger_1.default.error(error.message);
    response.statusCode = statusCodes_1.StatusCodes.InternalServerError;
    response.statusMessage = 'Internal Server Error';
    response.end();
}
exports.default = ServerErrorHandler;
module.exports = ServerErrorHandler;
//# sourceMappingURL=ServerErrorHandler.js.map