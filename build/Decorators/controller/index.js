"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerAfterFilter = exports.ControllerBeforeFilter = exports.ControllerAuthorisationFilter = exports.Controller = void 0;
const metaStore_1 = __importDefault(require("../../utils/metaStore"));
const utils_1 = require("../../Decorators/controller/utils");
const utils_2 = require("../../Decorators/actionFilters/utils");
/**
 * Create the new node into router
 *
 * @param {string} prefix - Prefix that added for all routes of the Controller
 */
function Controller(prefix) {
    return function (constructor) {
        const methods = Object.getOwnPropertyNames(constructor.prototype).reduce((acc, key) => {
            const handler = constructor.prototype[key];
            const handlerMeta = metaStore_1.default.getMeta(handler);
            if (handlerMeta) {
                handlerMeta.meta.prefix = prefix || '';
                acc.push(handler);
            }
            return acc;
        }, []);
        metaStore_1.default.addMeta(constructor, 'methods', methods);
    };
}
exports.Controller = Controller;
/**
 * Apply Authorisation filter for all route handlers in the controllers
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
exports.ControllerAuthorisationFilter = (0, utils_1.ControllerActionFilterDecoratorFabric)(utils_2.ActionFilterKeys.AUTHORISATION);
/**
 * Apply Before filter for all route handlers in the controllers
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
exports.ControllerBeforeFilter = (0, utils_1.ControllerActionFilterDecoratorFabric)(utils_2.ActionFilterKeys.ACTION_BEFORE);
/**
 * Apply After filter for all route handlers in the controllers
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
exports.ControllerAfterFilter = (0, utils_1.ControllerActionFilterDecoratorFabric)(utils_2.ActionFilterKeys.ACTION_AFTER);
//# sourceMappingURL=index.js.map