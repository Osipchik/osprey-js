"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const road_runner_1 = require("@parisholley/road-runner");
const NotImplementedHandler_1 = __importDefault(require("../Routing/ErrorHandlers/NotImplementedHandler"));
const ServerErrorHandler_1 = __importDefault(require("../Routing/ErrorHandlers/ServerErrorHandler"));
const MethodNotAllowedHandler_1 = __importDefault(require("../Routing/ErrorHandlers/MethodNotAllowedHandler"));
const NotFoundHandler_1 = __importDefault(require("../Routing/ErrorHandlers/NotFoundHandler"));
const helpers_1 = require("../utils/helpers");
const Logger_1 = __importDefault(require("../utils/Logger"));
const methods_1 = require("../Routing/methods");
class Router {
    static ServerError = ServerErrorHandler_1.default;
    static NotFound = NotFoundHandler_1.default;
    static MethodNotAllowed = MethodNotAllowedHandler_1.default;
    static NotImplemented = NotImplementedHandler_1.default;
    static router = new road_runner_1.RoadRunner();
    static routeHandlers = {
        GET: {},
        HEAD: {},
        POST: {},
        PUT: {},
        DELETE: {},
        CONNECTS: {},
        OPTIONS: {},
        TRACE: {},
        PATCH: {},
        ServerError: Router.ServerError,
        NotFound: Router.NotFound,
        MethodNotAllowed: Router.MethodNotAllowed,
        NotImplemented: Router.NotImplemented,
    };
    static addRoute(handler, { method, prefix, path }) {
        const { pathName } = (0, helpers_1.getPath)(prefix, path);
        switch (method) {
            case methods_1.GET:
                Logger_1.default.info(pathName, method);
                break;
            case methods_1.POST:
                Logger_1.default.warn(pathName, method);
                break;
            case methods_1.DELETE:
                Logger_1.default.error(pathName, method);
                break;
            case methods_1.PATCH:
                Logger_1.default.patch(pathName, method);
                break;
            case methods_1.PUT:
                Logger_1.default.put(pathName, method);
                break;
            default: Logger_1.default.data(pathName, method);
        }
        Router.router.addRoute(method, pathName, handler);
    }
    getRequestHandler(request) {
        if (request.method) {
            const route = Router.router.findRoute(request.method, request.url);
            if (route) {
                return {
                    handler: route.value,
                    params: route.params,
                };
            }
            return {
                handler: Router.routeHandlers.NotFound,
            };
        }
        return {
            handler: Router.routeHandlers.NotImplemented,
        };
    }
}
exports.default = Router;
module.exports = Router;
//# sourceMappingURL=index.js.map