"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routing_1 = tslib_1.__importDefault(require("../../Routing"));
const metaStore_1 = tslib_1.__importDefault(require("../../utils/metaStore"));
function Controller(prefix) {
    return function (constructor) {
        for (const key of Object.getOwnPropertyNames(constructor.prototype)) {
            const handler = constructor.prototype[key];
            const handlerMeta = metaStore_1.default.getMeta(handler);
            if (handlerMeta) {
                handlerMeta.meta.prefix = prefix;
                Routing_1.default.addRoute(handler, handlerMeta.meta);
                delete handler.meta;
            }
        }
    };
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map