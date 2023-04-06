import type { RequestHandlerType } from './Routing/types';
export default class Pipeline {
    registerMethod(method: RequestHandlerType, filters: any, controllerFilters: any): void;
    private setExceptionHandler;
    private createMethodHandlers;
    private getFilterHandlers;
    private getFiltersHandler;
    private PrepareSyncFilters;
    private PrepareAsyncFilters;
    private PrepareMixedFilters;
}
//# sourceMappingURL=pipeline.d.ts.map