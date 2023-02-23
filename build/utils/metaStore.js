"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MetaStore {
    static addMeta(node, key, data) {
        if (MetaStore.meta.has(node)) {
            const root = MetaStore.meta.get(node);
            root[key] = data;
        }
        else {
            MetaStore.meta.set(node, { [key]: data });
        }
        MetaStore.values.set(node.value, MetaStore.meta.get(node));
    }
    static getMeta(node) {
        return MetaStore.meta.get(node) ?? MetaStore.values.get(node);
    }
}
MetaStore.meta = new WeakMap();
MetaStore.values = new WeakMap();
exports.default = MetaStore;
//# sourceMappingURL=metaStore.js.map