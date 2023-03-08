"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SINGLETON_KEY = void 0;
exports.SINGLETON_KEY = Symbol("Singleton Key");
function Singleton(classTarget) {
    return new Proxy(classTarget, {
        construct(target, argumentsList, newTarget) {
            if (target.prototype !== newTarget.prototype) {
                return Reflect.construct(target, argumentsList, newTarget);
            }
            if (!target[exports.SINGLETON_KEY]) {
                target[exports.SINGLETON_KEY] = Reflect.construct(target, argumentsList, newTarget);
            }
            return target[exports.SINGLETON_KEY];
        },
    });
}
exports.default = Singleton;
//# sourceMappingURL=singleton.js.map