import { ActionAuthorisationHandlerType, ActionHandlerType, RequestHandlerType } from './Routing/types';
import { ActionFilterKeys } from './Decorators/actionFilters/utils';
type FiltersType = {
    [key in ActionFilterKeys]: ActionAuthorisationHandlerType[] | ActionHandlerType[];
};
export default class Pipeline {
    registerMethod(method: RequestHandlerType, filters: FiltersType): void;
}
export {};
//# sourceMappingURL=pipeline.d.ts.map