"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../utils/helpers");
const PrepareSyncProps = (syncParsers) => (request, args) => {
    const result = new Array(syncParsers.length);
    for (const [index, parser] of syncParsers.entries()) {
        result[index] = parser(request, args);
    }
    return result;
};
const PrepareAsyncProps = (asyncParsers) => (request, args) => {
    return Promise.all(asyncParsers.map((parser) => parser(request, args)));
};
const PrepareMixedProps = (asyncParsers, syncParsers, syncIndexes, asyncIndexes) => async (request, args) => {
    const normalisedResult = new Array(syncParsers.length + asyncParsers.length);
    const asyncPromises = asyncParsers.map((parser) => parser(request, args));
    for (const [index, parser] of syncParsers.entries()) {
        normalisedResult[syncIndexes[index]] = parser(request, args);
    }
    const asyncResult = await Promise.all(asyncPromises);
    for (const [index, result] of asyncResult.entries()) {
        normalisedResult[asyncIndexes[index]] = result;
    }
    return normalisedResult;
};
function GetParameterHandler(paramsParsers) {
    if (!paramsParsers) {
        return null;
    }
    const { asyncValues, asyncIndexes, syncValues, syncIndexes, } = (0, helpers_1.getSyncAndAsyncLists)(paramsParsers);
    if (asyncValues.length && syncValues.length) {
        return PrepareMixedProps(asyncValues, syncValues, syncIndexes, asyncIndexes);
    }
    else if (asyncValues.length) {
        return PrepareAsyncProps(asyncValues);
    }
    else if (syncValues.length) {
        return PrepareSyncProps(syncValues);
    }
    else {
        return null;
    }
}
exports.default = GetParameterHandler;
//# sourceMappingURL=parameterHandler.js.map