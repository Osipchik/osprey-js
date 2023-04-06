class MetaStore {
  private static meta = new WeakMap();
  private static values = new WeakMap();

  static addMeta(node: any, key: string | number, data: any) {
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

  static getByKey(node: any, key: string | number) {
    const meta = this.getMeta(node);

    return meta ? meta[key] : null;
  }

  static push(node: any, key: string | number, value: any[] | object) {
    const isArray = Array.isArray(value);
    const defaultValue = isArray ? [] : {};

    const meta = MetaStore.getMeta(node);
    const metaData = meta[key] || defaultValue;

    if (isArray) {
      this.addMeta(node, key, [
        ...metaData,
        value,
      ]);
    } else {
      this.addMeta(node, key, {
        ...metaData,
        ...value,
      });
    }
  }
}

export default MetaStore;
