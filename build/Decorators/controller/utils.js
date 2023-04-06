"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerActionFilterDecoratorFabric = void 0;
const metaStore_1 = __importDefault(require("../../utils/metaStore"));
const ControllerActionFilterDecoratorFabric = (actionKey) => (handler) => (constructor) => {
    const meta = metaStore_1.default.getMeta(constructor);
    const filters = meta?.filters || {};
    const currentFilters = filters[actionKey] || [];
    currentFilters.push(handler);
    metaStore_1.default.addMeta(constructor, 'filters', filters);
};
exports.ControllerActionFilterDecoratorFabric = ControllerActionFilterDecoratorFabric;
//# sourceMappingURL=utils.js.map