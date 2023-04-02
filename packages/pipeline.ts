import {
  ActionAuthorisationHandlerType,
  ActionHandlerType,
  IncomingMessageType, ParamsType,
  RequestHandlerType, ServerResponseType
} from './Routing/types';
import { ActionFilterKeys } from './Decorators/actionFilters/utils';

type FiltersType = {
  [key in ActionFilterKeys]: ActionAuthorisationHandlerType[] | ActionHandlerType[];
}
export default class Pipeline {
  registerMethod(method: RequestHandlerType, filters: FiltersType) {
    const actionAuthorisationFilters = (filters[ActionFilterKeys.AUTHORISATION] || []) as ActionAuthorisationHandlerType[];
    const actionResourceFilters = (filters[ActionFilterKeys.RESOURCE] || []) as ActionHandlerType[];
    const actionBeforeFilters = (filters[ActionFilterKeys.ACTION_BEFORE] || []) as ActionHandlerType[];
    const actionAfterFilters = (filters[ActionFilterKeys.ACTION_AFTER] || []) as ActionHandlerType[];
    const actionExceptionFilters = (filters[ActionFilterKeys.EXCEPTION] || []) as ActionHandlerType[];
    const actionResultFilters = (filters[ActionFilterKeys.RESULT] || []) as ActionHandlerType[];

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
