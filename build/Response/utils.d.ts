import { ContentTypes, StatusCodes } from '../Response/enums';
import { IOptions, ResponseHandlerType } from '../Response/types';
export declare const defaultOptions: (statusCode: StatusCodes) => {
    statusCode: StatusCodes;
    contentType: ContentTypes;
};
interface IDefaultOptions {
    statusCode: StatusCodes;
    contentType: ContentTypes;
}
export declare function resultResponseFabric(defaultOptions: IDefaultOptions): (result: unknown, options?: IOptions) => ResponseHandlerType;
export {};
//# sourceMappingURL=utils.d.ts.map