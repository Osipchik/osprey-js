import { TagReturnType } from '../../utils/Logger/tag';
export interface IDecorator {
    titleTag: TagReturnType;
    messageTag: TagReturnType;
    defaultTitle: string;
}
export declare const Error: IDecorator;
export declare const Warn: IDecorator;
export declare const Info: IDecorator;
export declare const Success: IDecorator;
export declare const Put: IDecorator;
export declare const Patch: IDecorator;
export declare const Data: IDecorator;
export declare const urlRegex: RegExp;
//# sourceMappingURL=utils.d.ts.map