"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../utils/helpers");
const prepareSyncProps = (syncParsers) => (request, args) => {
    const result = new Array(syncParsers.length);
    for (const [index, parser] of syncParsers.entries()) {
        result[index] = parser(request, args);
    }
    return result;
};
const prepareAsyncProps = (asyncParsers) => (request, args) => {
    return Promise.all(asyncParsers.map((parser) => parser(request, args)));
};
const prepareMixedProps = (asyncParsers, syncParsers, syncIndexes, asyncIndexes) => async (request, args) => {
    const normalisedResult = new Array(syncParsers.length + asyncParsers.length);
    const asyncPromises = asyncParsers.map((parser, index) => parser(request, args));
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
    const syncParsers = [];
    const syncIndexes = [];
    const asyncParsers = [];
    const asyncIndexes = [];
    for (const [index, paramsParser] of Object.entries(paramsParsers)) {
        if ((0, helpers_1.isAsyncFunction)(paramsParser)) {
            asyncParsers.push(paramsParser);
            asyncIndexes.push(Number(index));
        }
        else {
            syncParsers.push(paramsParser);
            syncIndexes.push(Number(index));
        }
    }
    if (asyncParsers.length && syncParsers.length) {
        return prepareMixedProps(asyncParsers, syncParsers, syncIndexes, asyncIndexes);
    }
    else if (asyncParsers.length) {
        return prepareAsyncProps(asyncParsers);
    }
    else if (syncParsers.length) {
        return prepareSyncProps(syncParsers);
    }
    else {
        return null;
    }
}
exports.default = GetParameterHandler;
//# sourceMappingURL=parameterHandler.js.map