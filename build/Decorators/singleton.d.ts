export declare const SINGLETON_KEY: unique symbol;
export type Singleton<T extends new (...args: any[]) => any> = T & {
    [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};
export default function Singleton<T extends new (...args: any[]) => any>(classTarget: T): T;
//# sourceMappingURL=singleton.d.ts.map