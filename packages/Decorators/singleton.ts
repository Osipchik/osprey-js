export const SINGLETON_KEY = Symbol("Singleton Key");

export type Singleton<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};

export default function Singleton<T extends new (...args: any[]) => any>(
  classTarget: T
) {
  return new Proxy(classTarget, {
    construct(target: Singleton<T>, argumentsList, newTarget) {
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argumentsList, newTarget);
      }

      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(
          target,
          argumentsList,
          newTarget
        );
      }

      return target[SINGLETON_KEY];
    },
  });
}
