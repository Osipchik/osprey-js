import { StatusCodes } from './statusCodes';
interface IOptions {
    statusCode?: StatusCodes;
    contentType?: string;
    isJSON?: boolean;
}
export interface IResult {
    value: unknown;
    statusCode: StatusCodes;
    contentType: string;
}
export declare function Ok(result: unknown, options?: IOptions): IResult;
export declare function JsonResult(result: any, options?: IOptions): {
    result: any;
    statusCode: StatusCodes | undefined;
    contentType: string;
};
export {};
