"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MetaStore {
    static meta = new WeakMap();
    static values = new WeakMap();
    static addMeta(node, key, data) {
        if (MetaStore.meta.has(node)) {
            const root = MetaStore.meta.get(node);
            root[key] = data;
        }
        else {
            MetaStore.meta.set(node, { [key]: data });
        }
        if (node.value) {
            MetaStore.values.set(node.value, MetaStore.meta.get(node));
        }
    }
    static getMeta(node) {
        return MetaStore.meta.get(node) || MetaStore.values.get(node);
    }
    static getByKey(node, key) {
        const meta = this.getMeta(node);
        return meta ? meta[key] : null;
    }
    static push(node, key, value) {
        const isArray = Array.isArray(value);
        const defaultValue = isArray ? [] : {};
        const meta = MetaStore.getMeta(node);
        const metaData = meta[key] || defaultValue;
        if (isArray) {
            this.addMeta(node, key, [
                ...metaData,
                value,
            ]);
        }
        else {
            this.addMeta(node, key, {
                ...metaData,
                ...value,
            });
        }
    }
}
exports.default = MetaStore;
//# sourceMappingURL=metaStore.js.map