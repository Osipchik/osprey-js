"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const Routing_1 = __importDefault(require("../Routing"));
const Logger_1 = __importDefault(require("../utils/Logger"));
const Middleware_1 = __importDefault(require("../Middleware"));
class Server {
    server;
    middleware;
    router;
    host;
    port;
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
            handler(request, response, params)?.catch((error) => Routing_1.default.errorHandlers.ServerError(request, response, error));
        }
        catch (error) {
            Routing_1.default.errorHandlers.ServerError(request, response, error);
        }
    }
    run() {
        this.server.on('error', (error) => {
            switch (error.code) {
                case 'EACCES': {
                    Logger_1.default.error(`No access to port: ${this.port}`, 'EACCES');
                    break;
                }
                case 'ELIFECYCLE': {
                    Logger_1.default.error(error.message, 'ELIFECYCLE');
                    break;
                }
                default: {
                    Logger_1.default.error(error.message, 'EACCES');
                }
            }
        });
        this.server.listen(this.port, () => {
            Logger_1.default.success(`Server is running at http://${this.host}:${this.port}`);
        });
        this.server.on('close', this.onServerClose);
        process.on('SIGINT', this.onServerClose);
    }
    onServerClose() {
        Logger_1.default.warn('Server is closed');
        process.exit();
    }
}
exports.default = Server;
module.exports = Server;
//# sourceMappingURL=index.js.map