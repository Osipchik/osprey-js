"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVarName = exports.getPath = exports.normalizeSlash = exports.isPromise = exports.isPrimitive = exports.addSlash = exports.normalizePath = void 0;
function normalizePath({ prefix, path, property, query }) {
    const pathname = [
        addSlash(prefix),
        addSlash(path),
    ].join('');
    return pathname;
}
exports.normalizePath = normalizePath;
function addSlash(param) {
    if (param) {
        const cleanParam = param.replace('/', '');
        return cleanParam.length ? '/' + cleanParam : '';
    }
    return '';
}
exports.addSlash = addSlash;
function isPrimitive(value) {
    return !(value instanceof Object);
}
exports.isPrimitive = isPrimitive;
function isPromise(value) {
    return typeof value === 'object' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
function normalizeSlash(value) {
    let val = value;
    while (val.startsWith('/')) {
        val = val.slice(1);
    }
    while (val.endsWith('/')) {
        val = val.slice(0, -1);
    }
    return '/' + val;
}
exports.normalizeSlash = normalizeSlash;
function getPath(prefix, pathName) {
    const routePrefix = prefix ?? '';
    const routePathName = pathName ?? '';
    if (routePrefix.includes(':')) {
        throw new Error('cant has semicolon');
    }
    if (routePathName.includes('*')) {
        throw new Error('cant has semicolon');
    }
    const props = [];
    const normalizedPathName = routePathName.split('/').reduce((acc, character) => {
        if (character.includes(':')) {
            const propName = character.slice(1);
            if (isVarName(propName)) {
                props.push(character.slice(1));
            }
            else {
                throw new Error(`invalid var name: ${propName}`);
            }
            return acc + '/' + character;
        }
        return acc + '/' + character;
    }, '');
    const normalizedPrefix = normalizeSlash(routePrefix);
    return {
        pathName: normalizeSlash(normalizedPrefix + normalizeSlash(normalizedPathName)),
        prefix: normalizedPrefix,
        props,
    };
}
exports.getPath = getPath;
function isVarName(name) {
    if (name.trim() !== name) {
        return false;
    }
    try {
        new Function(name, 'var ' + name);
    }
    catch (_) {
        return false;
    }
    return true;
}
exports.isVarName = isVarName;
//# sourceMappingURL=helpers.js.map