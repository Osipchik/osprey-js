import { PreHandler, PreHandlerAsync } from '../Middleware/type';
import { IncomingMessageType, ServerResponseType } from '../Routing/types';
declare class Middleware {
    static readonly middlewares: PreHandler[];
    static readonly asyncMiddlewares: PreHandlerAsync[];
    runMiddlewaresSync(request: IncomingMessageType, response: ServerResponseType): void;
    static use(preHandler: PreHandler): void;
}
export default Middleware;
