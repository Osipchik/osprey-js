"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResultFilter = exports.CreateExceptionFilter = exports.CreateActionAfterFilter = exports.CreateActionBeforeFilter = exports.CreateResourceFilter = exports.CreateAuthorisationFilter = void 0;
const metaStore_1 = __importDefault(require("../../utils/metaStore"));
const utils_1 = require("../../Decorators/actionFilters/utils");
const ActionFilterDecoratorFabric = (actionKey) => (handler) => {
    return (_target, _name, descriptor) => {
        const meta = metaStore_1.default.getMeta(descriptor);
        const existedFilters = meta[actionKey] || [];
        metaStore_1.default.addMeta(descriptor, actionKey, [
            ...existedFilters,
            handler,
        ]);
        return descriptor;
    };
};
exports.CreateAuthorisationFilter = ActionFilterDecoratorFabric(utils_1.ActionFilterKeys.AUTHORISATION);
exports.CreateResourceFilter = ActionFilterDecoratorFabric(utils_1.ActionFilterKeys.RESOURCE);
exports.CreateActionBeforeFilter = ActionFilterDecoratorFabric(utils_1.ActionFilterKeys.ACTION_BEFORE);
exports.CreateActionAfterFilter = ActionFilterDecoratorFabric(utils_1.ActionFilterKeys.ACTION_AFTER);
exports.CreateExceptionFilter = ActionFilterDecoratorFabric(utils_1.ActionFilterKeys.EXCEPTION);
exports.CreateResultFilter = ActionFilterDecoratorFabric(utils_1.ActionFilterKeys.RESULT);
//# sourceMappingURL=index.js.map