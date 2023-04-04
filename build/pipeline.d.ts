import type { RequestHandlerType } from './Routing/types';
export default class Pipeline {
    registerMethod(method: RequestHandlerType, filters: any): void;
    private getFilterHandlers;
    private getFiltersHandler;
    private PrepareSyncFilters;
    private PrepareAsyncFilters;
    private PrepareMixedFilters;
}
//# sourceMappingURL=pipeline.d.ts.map