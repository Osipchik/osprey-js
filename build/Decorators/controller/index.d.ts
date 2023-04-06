/**
 * Create the new node into router
 *
 * @param {string} prefix - Prefix that added for all routes of the Controller
 */
export declare function Controller(prefix?: string): ClassDecorator;
/**
 * Apply Authorisation filter for all route handlers in the controllers
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export declare const ControllerAuthorisationFilter: (handler: import("../../Routing/types").RequestHandlerType) => (constructor: Function) => void;
/**
 * Apply Before filter for all route handlers in the controllers
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export declare const ControllerBeforeFilter: (handler: import("../../Routing/types").RequestHandlerType) => (constructor: Function) => void;
/**
 * Apply After filter for all route handlers in the controllers
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export declare const ControllerAfterFilter: (handler: import("../../Routing/types").RequestHandlerType) => (constructor: Function) => void;
//# sourceMappingURL=index.d.ts.map