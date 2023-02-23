"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("../../utils/Logger"));
const StatusCodes_1 = require("../../utils/StatusCodes");
function ServerErrorHandler(request, response, error) {
    Logger_1.default.error('Unexpected Server Error', `Error ${StatusCodes_1.StatusCodes.InternalServerError}`);
    Logger_1.default.error(error.message);
    response.statusCode = StatusCodes_1.StatusCodes.InternalServerError;
    response.statusMessage = 'Internal Server Error';
    response.end();
}
exports.default = ServerErrorHandler;
module.exports = ServerErrorHandler;
//# sourceMappingURL=ServerErrorHandler.js.map