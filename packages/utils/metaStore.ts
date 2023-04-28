class MetaStore {
  private static meta = new WeakMap();
  private static values = new WeakMap();

  static addMeta(node: any, key: string | number, data: any) {
    if (this.meta.has(node)) {
      const root = this.meta.get(node);
      root[key] = data;
    } else {
      this.meta.set(node, { ...this.meta.get(node), [key]: data });
    }

    if (node.value) {
      this.values.set(node.value, this.meta.get(node))
    }
  }

  static getMeta(node: any) {
    return this.meta.get(node) || this.values.get(node);
  }

  static getByKey(node: any, key: string | number) {
    const meta = this.getMeta(node);

    return meta ? meta[key] : null;
  }
}

export default MetaStore;

export enum MetaStoreKeys {
  headers = 'headers',
  properties = 'properties',
  meta = 'meta',
  catch = 'catch',
  filters = 'filters',
}
