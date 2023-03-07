"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Singleton(ctr) {
    let instance;
    return class {
        constructor(...args) {
            if (instance) {
                return instance;
            }
            instance = new ctr(...args);
            return instance;
        }
    };
}
exports.default = Singleton;
//# sourceMappingURL=singleton.js.map