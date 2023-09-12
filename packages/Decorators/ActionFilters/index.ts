import {
  ActionFilterKeys,
  ActionFilterDecoratorFabric,
  ExceptionFilterDecoratorFabric,
} from '../../Decorators/ActionFilters/utils';
import { ActionHandlerType } from './types';

/**
 * First methods that called when getting request
 *
 * @param {ActionHandlerType} handler - Function that implements logic of the decorator
 */
export const CreateAuthorisationFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.AUTHORISATION);

/**
 * Second methods that called when getting request
 *
 * @param {ActionHandlerType} handler - Function that implements logic of the decorator
 */
export const CreateResourceFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.RESOURCE);

/**
 * Methods that called before main route handler
 *
 * @param {ActionHandlerType} handler - Function that implements logic of the decorator
 */
export const CreateBeforeFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.ACTION_BEFORE);

/**
 * Add function that runs after main handler and before server response
 *
 * @param {ActionHandlerType} handler - Function that implements logic of the decorator
 */
export const CreateAfterFilter = ActionFilterDecoratorFabric<ActionHandlerType>(ActionFilterKeys.ACTION_AFTER);

/**
 * Add custom error handling for main handler ant it decorators
 *
 * @param {function} handler - Function that implements logic of the decorator
 */
export const CreateExceptionFilter = ExceptionFilterDecoratorFabric;
