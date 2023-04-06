"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionFilterDecoratorFabric = exports.ActionFilterDecoratorFabric = exports.ActionFilterKeys = void 0;
const metaStore_1 = __importDefault(require("../../utils/metaStore"));
var ActionFilterKeys;
(function (ActionFilterKeys) {
    ActionFilterKeys["AUTHORISATION"] = "actionFilter";
    ActionFilterKeys["RESOURCE"] = "resourceFilter";
    ActionFilterKeys["ACTION_BEFORE"] = "actionBeforeFilter";
    ActionFilterKeys["ACTION_AFTER"] = "actionAfterFilter";
    ActionFilterKeys["EXCEPTION"] = "exceptionFilter";
    ActionFilterKeys["RESULT"] = "resultFilter";
})(ActionFilterKeys = exports.ActionFilterKeys || (exports.ActionFilterKeys = {}));
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
exports.ActionFilterDecoratorFabric = ActionFilterDecoratorFabric;
const ExceptionFilterDecoratorFabric = (handler) => {
    return (_target, _name, descriptor) => {
        const meta = metaStore_1.default.getMeta(descriptor);
        const existedFilters = meta[ActionFilterKeys.EXCEPTION] || [];
        metaStore_1.default.addMeta(descriptor, ActionFilterKeys.EXCEPTION, [
            ...existedFilters,
            handler,
        ]);
        return descriptor;
    };
};
exports.ExceptionFilterDecoratorFabric = ExceptionFilterDecoratorFabric;
//# sourceMappingURL=utils.js.map