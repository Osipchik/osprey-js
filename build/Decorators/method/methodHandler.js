"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function syncHandler(originalHandler, meta) {
    return (controllerContext) => (request, response) => {
        const context = {
            ...controllerContext,
            request,
            response,
        };
        const handleResponse = originalHandler.call(context);
        handleResponse(request, response, meta);
    };
}
function asyncHandler(originalHandler, meta) {
    return (controllerContext) => async (request, response) => {
        const context = {
            ...controllerContext,
            request,
            response,
        };
        const handleResponse = await originalHandler.call(context);
        handleResponse(request, response, meta);
    };
}
function asyncHandlerWithAsyncParams(originalHandler, meta, paramsParser) {
    return (controllerContext) => async (request, response, args) => {
        const context = {
            ...controllerContext,
            request,
            response
        };
        const params = await paramsParser(request, args);
        const handleResponse = await originalHandler.apply(context, params);
        handleResponse(request, response, meta);
    };
}
function syncHandlerWithAsyncParams(originalHandler, meta, paramsParser) {
    return (controllerContext) => async (request, response, args) => {
        const context = {
            ...controllerContext,
            request,
            response
        };
        const params = await paramsParser(request, args);
        const handleResponse = originalHandler.apply(context, params);
        handleResponse(request, response, meta);
    };
}
function asyncHandlerWithParams(originalHandler, meta, paramsParser) {
    return (controllerContext) => async (request, response, args) => {
        const context = {
            ...controllerContext,
            request,
            response
        };
        const params = paramsParser(request, args);
        const handleResponse = await originalHandler.apply(context, params);
        handleResponse(request, response, meta);
    };
}
function syncHandlerWithParams(originalHandler, meta, paramsParser) {
    return (controllerContext) => (request, response, args) => {
        const context = {
            ...controllerContext,
            request,
            response
        };
        const params = paramsParser(request, args);
        const handleResponse = originalHandler.apply(context, params);
        handleResponse(request, response, meta);
    };
}
function GetMethodHandler(originalDescriptorValue, meta, propertyParser, isPropertyParserAsync, isOriginAsync) {
    console.log({ isPropertyParserAsync, isOriginAsync });
    if (!propertyParser && !isOriginAsync) {
        return syncHandler(originalDescriptorValue, meta);
    }
    else if (!propertyParser && isOriginAsync) {
        return asyncHandler(originalDescriptorValue, meta);
    }
    else if (isPropertyParserAsync && isOriginAsync) {
        return asyncHandlerWithAsyncParams(originalDescriptorValue, meta, propertyParser);
    }
    else if (isPropertyParserAsync && !isOriginAsync) {
        return syncHandlerWithAsyncParams(originalDescriptorValue, meta, propertyParser);
    }
    else if (!isPropertyParserAsync && isOriginAsync) {
        return asyncHandlerWithParams(originalDescriptorValue, meta, propertyParser);
    }
    else if (!isPropertyParserAsync && !isOriginAsync) {
        return syncHandlerWithParams(originalDescriptorValue, meta, propertyParser);
    }
}
exports.default = GetMethodHandler;
//# sourceMappingURL=methodHandler.js.map