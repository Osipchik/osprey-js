"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const Routing_1 = tslib_1.__importDefault(require("../Routing"));
const Logger_1 = tslib_1.__importDefault(require("../utils/Logger"));
const Middleware_1 = tslib_1.__importDefault(require("../Middleware"));
class Server {
    constructor() {
        this.requestListener = this.requestListener.bind(this);
        this.middleware = new Middleware_1.default();
        this.router = new Routing_1.default();
        this.server = http_1.default.createServer(this.requestListener);
        this.host = process.env.HOST || 'localhost';
        this.port = Number(process.env.PORT) || 3000;
    }
    requestListener(request, response) {
        try {
            this.middleware.runMiddlewaresSync(request, response);
            const { handler, params } = this.router.getRequestHandler(request);
            handler(request, response, params);
        }
        catch (error) {
            Routing_1.default.routeHandlers.ServerError(request, response, error);
        }
    }
    run() {
        this.server.on('error', (error) => {
            if (error.code === 'EACCES') {
                Logger_1.default.error(`No access to port: ${this.port}`, 'EACCES');
            }
        });
        this.server.listen(this.port, () => {
            Logger_1.default.success(`Server is running at http://${this.host}:${this.port}`);
        });
        this.server.close(() => {
            Logger_1.default.info(`Server is closed at http://${this.host}:${this.port}`);
        });
    }
}
exports.default = Server;
module.exports = Server;
