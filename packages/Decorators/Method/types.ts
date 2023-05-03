import { ResultResponseType } from '../../Response/types';

export type OriginalHandlerSyncType = (...args: any[]) => ResultResponseType;
export type OriginalHandlerAsyncType = (...args: any[]) => Promise<ResultResponseType>;

type MethodDecoratorTargetType = (...args: any[]) => any;

export type IMethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<MethodDecoratorTargetType>,
) => TypedPropertyDescriptor<MethodDecoratorTargetType>;
