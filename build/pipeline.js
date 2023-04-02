"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./Decorators/actionFilters/utils");
class Pipeline {
    registerMethod(method, filters) {
        const actionAuthorisationFilters = (filters[utils_1.ActionFilterKeys.AUTHORISATION] || []);
        const actionResourceFilters = (filters[utils_1.ActionFilterKeys.RESOURCE] || []);
        const actionBeforeFilters = (filters[utils_1.ActionFilterKeys.ACTION_BEFORE] || []);
        const actionAfterFilters = (filters[utils_1.ActionFilterKeys.ACTION_AFTER] || []);
        const actionExceptionFilters = (filters[utils_1.ActionFilterKeys.EXCEPTION] || []);
        const actionResultFilters = (filters[utils_1.ActionFilterKeys.RESULT] || []);
        // const asd: RequestHandlerType = (
        //   request: IncomingMessageType,
        //   response: ServerResponseType,
        //   args?: ParamsType,
        // ) => {
        //   const
        // }
        // const
    }
}
exports.default = Pipeline;
//# sourceMappingURL=pipeline.js.map