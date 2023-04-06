import { ActionAuthorisationHandlerType, ActionHandlerType } from '../../Routing/types';
/**
 * Add function that runs before all decorators and methods route handler
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export declare const CreateAuthorisationFilter: (handler: ActionAuthorisationHandlerType) => MethodDecorator;
/**
 * Add function that runs after Authorisation filter and before BeforeFilter
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export declare const CreateResourceFilter: (handler: ActionHandlerType) => MethodDecorator;
/**
 * Add function that runs after Resource filter and before main handler
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export declare const CreateBeforeFilter: (handler: ActionHandlerType) => MethodDecorator;
/**
 * Add function that runs after main handler and before server response
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export declare const CreateAfterFilter: (handler: ActionHandlerType) => MethodDecorator;
/**
 * Add custom error handling for main handler ant it decorators
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export declare const CreateExceptionFilter: (handler: Function) => MethodDecorator;
//# sourceMappingURL=index.d.ts.map