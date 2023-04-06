import {
  ActionFilterKeys,
  ActionFilterDecoratorFabric,
  ExceptionFilterDecoratorFabric,
} from '../../Decorators/actionFilters/utils';
import { ActionAuthorisationHandlerType, ActionHandlerType } from '../../Routing/types';

/**
 * Add function that runs before all decorators and methods route handler
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export const CreateAuthorisationFilter = ActionFilterDecoratorFabric<ActionAuthorisationHandlerType>(ActionFilterKeys.AUTHORISATION);

/**
 * Add function that runs after Authorisation filter and before BeforeFilter
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export const CreateResourceFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.RESOURCE);

/**
 * Add function that runs after Resource filter and before main handler
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export const CreateBeforeFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.ACTION_BEFORE);

/**
 * Add function that runs after main handler and before server response
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export const CreateAfterFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.ACTION_AFTER);

/**
 * Add custom error handling for main handler ant it decorators
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export const CreateExceptionFilter = ExceptionFilterDecoratorFabric;
