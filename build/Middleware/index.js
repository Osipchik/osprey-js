"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MiddlewareError_1 = __importDefault(require("../utils/Error/MiddlewareError"));
class Middleware {
    static middlewares = [];
    static asyncMiddlewares = [];
    runMiddlewaresSync(request, response) {
        const next = (error) => {
            if (error instanceof Error) {
                throw (0, MiddlewareError_1.default)(error.message, 'Middleware');
            }
        };
        for (const middleware of Middleware.middlewares) {
            middleware(request, response, next);
        }
    }
    static use(preHandler) {
        Middleware.middlewares.push(preHandler);
    }
}
exports.default = Middleware;
module.exports = Middleware;
//# sourceMappingURL=index.js.map