class MetaStore {
  private static meta = new WeakMap();
  private static values = new WeakMap();

  static addMeta(node: any, key: string, data: any) {
    if (MetaStore.meta.has(node)) {
      const root = MetaStore.meta.get(node);
      root[key] = data;
    } else {
      MetaStore.meta.set(node, { [key]: data });
    }

    if (node.value) {
      MetaStore.values.set(node.value, MetaStore.meta.get(node))
    }
  }

  static getMeta(node: any) {
    return MetaStore.meta.get(node) || MetaStore.values.get(node);
  }
}

export default MetaStore;
