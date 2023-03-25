"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefineBodyProperty = exports.DefineQueryProperty = void 0;
function DefineProperty(target, key, getValue) {
    Object.defineProperty(target, key, {
        configurable: true,
        get: function () {
            const value = getValue();
            Object.defineProperty(this, key, {
                value,
                configurable: false,
            });
            return value;
        }
    });
}
function DefineQueryProperty(payload, searchParams) {
    DefineProperty(payload, 'query', () => {
        const searchParamsList = new URLSearchParams(searchParams);
        return Object.fromEntries(searchParamsList.entries());
    });
}
exports.DefineQueryProperty = DefineQueryProperty;
function DefineBodyProperty(payload, requestBody) {
    DefineProperty(payload, 'body', () => {
        return JSON.parse(requestBody);
    });
}
exports.DefineBodyProperty = DefineBodyProperty;
//# sourceMappingURL=define.js.map