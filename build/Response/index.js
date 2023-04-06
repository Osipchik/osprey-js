"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const utils_1 = require("../Response/utils");
const Response = {
    Ok: (0, utils_1.resultResponseFabric)((0, utils_1.defaultOptions)(enums_1.StatusCodes.Ok)),
    Created: (0, utils_1.resultResponseFabric)((0, utils_1.defaultOptions)(enums_1.StatusCodes.Created)),
    PartialContent: (0, utils_1.resultResponseFabric)((0, utils_1.defaultOptions)(enums_1.StatusCodes.PartialContent)),
    BadRequest: (0, utils_1.resultResponseFabric)((0, utils_1.defaultOptions)(enums_1.StatusCodes.BadRequest)),
    NotFound: (0, utils_1.resultResponseFabric)((0, utils_1.defaultOptions)(enums_1.StatusCodes.NotFound)),
    NoContent: (0, utils_1.resultResponseFabric)((0, utils_1.defaultOptions)(enums_1.StatusCodes.NoContent)),
    InternalServerError: (0, utils_1.resultResponseFabric)((0, utils_1.defaultOptions)(enums_1.StatusCodes.NotFound)),
    NotImplemented: (0, utils_1.resultResponseFabric)((0, utils_1.defaultOptions)(enums_1.StatusCodes.NotImplemented)),
    Accepted: (0, utils_1.resultResponseFabric)((0, utils_1.defaultOptions)(enums_1.StatusCodes.Accepted)),
};
exports.default = Response;
//# sourceMappingURL=index.js.map