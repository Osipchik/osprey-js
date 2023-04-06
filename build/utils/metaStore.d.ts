declare class MetaStore {
    private static meta;
    private static values;
    static addMeta(node: any, key: string | number, data: any): void;
    static getMeta(node: any): any;
    static getByKey(node: any, key: string | number): any;
    static push(node: any, key: string | number, value: any[] | object): void;
}
export default MetaStore;
//# sourceMappingURL=metaStore.d.ts.map