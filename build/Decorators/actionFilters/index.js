"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExceptionFilter = exports.CreateAfterFilter = exports.CreateBeforeFilter = exports.CreateResourceFilter = exports.CreateAuthorisationFilter = void 0;
const utils_1 = require("../../Decorators/actionFilters/utils");
/**
 * Add function that runs before all decorators and methods route handler
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
exports.CreateAuthorisationFilter = (0, utils_1.ActionFilterDecoratorFabric)(utils_1.ActionFilterKeys.AUTHORISATION);
/**
 * Add function that runs after Authorisation filter and before BeforeFilter
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
exports.CreateResourceFilter = (0, utils_1.ActionFilterDecoratorFabric)(utils_1.ActionFilterKeys.RESOURCE);
/**
 * Add function that runs after Resource filter and before main handler
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
exports.CreateBeforeFilter = (0, utils_1.ActionFilterDecoratorFabric)(utils_1.ActionFilterKeys.ACTION_BEFORE);
/**
 * Add function that runs after main handler and before server response
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
exports.CreateAfterFilter = (0, utils_1.ActionFilterDecoratorFabric)(utils_1.ActionFilterKeys.ACTION_AFTER);
/**
 * Add custom error handling for main handler ant it decorators
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
exports.CreateExceptionFilter = utils_1.ExceptionFilterDecoratorFabric;
//# sourceMappingURL=index.js.map