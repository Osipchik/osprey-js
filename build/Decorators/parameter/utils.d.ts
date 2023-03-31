import { IncomingMessageType, ParamsType } from '../../Routing/types';
export declare function bodyParser(request: IncomingMessageType, _: ParamsType): Promise<unknown>;
export declare function paramsParser(key: string): (_: IncomingMessageType, params: ParamsType) => any;
export declare function getParams(_: IncomingMessageType, params: ParamsType): object | undefined;
export declare function getQuery(request: IncomingMessageType, _: ParamsType): {
    [k: string]: string;
};
//# sourceMappingURL=utils.d.ts.map