"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const road_runner_1 = require("@parisholley/road-runner");
const NotImplementedHandler_1 = tslib_1.__importDefault(require("../Routing/ErrorHandlers/NotImplementedHandler"));
const ServerErrorHandler_1 = tslib_1.__importDefault(require("../Routing/ErrorHandlers/ServerErrorHandler"));
const MethodNotAllowedHandler_1 = tslib_1.__importDefault(require("../Routing/ErrorHandlers/MethodNotAllowedHandler"));
const NotFoundHandler_1 = tslib_1.__importDefault(require("../Routing/ErrorHandlers/NotFoundHandler"));
const helpers_1 = require("../utils/helpers");
const Logger_1 = tslib_1.__importDefault(require("../utils/Logger"));
const methods_1 = require("../Routing/methods");
class Router {
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
Router.ServerError = ServerErrorHandler_1.default;
Router.NotFound = NotFoundHandler_1.default;
Router.MethodNotAllowed = MethodNotAllowedHandler_1.default;
Router.NotImplemented = NotImplementedHandler_1.default;
Router.router = new road_runner_1.RoadRunner();
Router.routeHandlers = {
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
exports.default = Router;
module.exports = Router;
//# sourceMappingURL=index.js.map