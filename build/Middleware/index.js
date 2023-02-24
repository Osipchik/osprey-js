"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const MiddlewareError_1 = tslib_1.__importDefault(require("../utils/Error/MiddlewareError"));
class Middleware {
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
Middleware.middlewares = [];
Middleware.asyncMiddlewares = [];
exports.default = Middleware;
module.exports = Middleware;
