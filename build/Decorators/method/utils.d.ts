import type { RequestHandlerType, ParamsType } from '../../Routing/types';
import { Methods } from '../../Routing/methods';
export type AsyncHandlerType = (props: ParamsType) => RequestHandlerType;
export default function DecoratorFabric(method: Methods, path?: string): MethodDecorator;
//# sourceMappingURL=utils.d.ts.map