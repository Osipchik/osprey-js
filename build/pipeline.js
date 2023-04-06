"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./Decorators/actionFilters/utils");
const Routing_1 = __importDefault(require("./Routing"));
const helpers_1 = require("./utils/helpers");
const metaStore_1 = __importDefault(require("./utils/metaStore"));
const filterTypes = [
    utils_1.ActionFilterKeys.AUTHORISATION,
    utils_1.ActionFilterKeys.RESOURCE,
    utils_1.ActionFilterKeys.ACTION_BEFORE,
    utils_1.ActionFilterKeys.ACTION_AFTER,
    utils_1.ActionFilterKeys.EXCEPTION,
];
class Pipeline {
    registerMethod(method, filters, controllerFilters) {
        for (const key of filterTypes) {
            const filter = filters[key] || [];
            const controllerFilter = controllerFilters[key] || [];
            filters[key] = [...controllerFilter, ...filter];
        }
        this.setExceptionHandler(filters, method);
        const { handlers, hasAsync } = this.getFilterHandlers(filters, method);
        const routeHandler = this.createMethodHandlers(handlers, hasAsync);
        Routing_1.default.addRoute(routeHandler, filters.meta);
    }
    setExceptionHandler(filters, method) {
        let hasAsync = false;
        const key = utils_1.ActionFilterKeys.EXCEPTION;
        let exceptionHandlers = [];
        if (filters.hasOwnProperty(key) && filters[key].length) {
            const handler = this.getFiltersHandler([filters[key][0]]);
            const isAsync = (0, helpers_1.isAsyncFunction)(handler);
            hasAsync = hasAsync || isAsync;
            exceptionHandlers.push({
                handler,
                isAsync,
            });
        }
        if (exceptionHandlers.length) {
            const exceptionHandler = this.createMethodHandlers(exceptionHandlers, hasAsync);
            metaStore_1.default.addMeta(method, 'catch', exceptionHandler);
        }
    }
    createMethodHandlers(handlers, hasAsync) {
        if (hasAsync) {
            return async (request, response, args) => {
                for (const { isAsync, handler } of handlers) {
                    if (isAsync) {
                        await handler(request, response, args);
                    }
                    else {
                        handler(request, response, args);
                    }
                }
            };
        }
        return (request, response, args) => {
            for (const { handler } of handlers) {
                handler(request, response, args);
            }
        };
    }
    getFilterHandlers(filters, method) {
        let hasAsync = false;
        const handlers = filterTypes.reduce((acc, key) => {
            if (key === utils_1.ActionFilterKeys.ACTION_AFTER) {
                const isAsync = (0, helpers_1.isAsyncFunction)(method);
                hasAsync = hasAsync || isAsync;
                acc.push({
                    handler: method,
                    isAsync,
                });
            }
            if (filters.hasOwnProperty(key) && filters[key].length) {
                const handler = this.getFiltersHandler(filters[key]);
                const isAsync = (0, helpers_1.isAsyncFunction)(handler);
                hasAsync = hasAsync || isAsync;
                acc.push({
                    handler,
                    isAsync,
                });
            }
            return acc;
        }, []);
        return {
            handlers,
            hasAsync,
        };
    }
    getFiltersHandler(filters) {
        if (!filters) {
            return undefined;
        }
        const { asyncValues, syncValues } = (0, helpers_1.getSyncAndAsyncLists)(filters);
        if (syncValues.length && !asyncValues.length) {
            return this.PrepareSyncFilters(syncValues);
        }
        else if (!syncValues.length && asyncValues.length) {
            return this.PrepareAsyncFilters(asyncValues);
        }
        else {
            return this.PrepareMixedFilters(asyncValues, syncValues);
        }
    }
    PrepareSyncFilters(syncValues) {
        return (request, response, args) => {
            for (const handler of syncValues) {
                handler(request, args);
            }
        };
    }
    PrepareAsyncFilters(asyncValues) {
        return async (request, response, args) => {
            return Promise.all(asyncValues.map((handler) => handler(request, args)));
        };
    }
    PrepareMixedFilters(asyncValues, syncValues) {
        return async (request, response, args) => {
            const handlerPromise = asyncValues.map((handler) => handler(request, args));
            for (const handler of syncValues) {
                handler(request, args);
            }
            await Promise.all(handlerPromise);
        };
    }
}
exports.default = Pipeline;
//# sourceMappingURL=pipeline.js.map