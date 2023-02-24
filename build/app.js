"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
const OS = tslib_1.__importStar(require("os"));
const Server_1 = tslib_1.__importDefault(require("./Server"));
// @ts-ignore
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
dotenv.config();
const availableLogicalCors = OS.cpus().length;
class App {
    constructor(props = {}) {
        this.threadPoolSize = setThreadPoolSize(props.threadPoolSize ?? availableLogicalCors);
    }
    useControllers(controllers) {
        const controllersSet = [];
        for (const controller of controllers) {
            controllersSet.push(new controller());
        }
    }
    run() {
        const server = new Server_1.default();
        server.run();
    }
}
function setThreadPoolSize(threadPoolSize) {
    if (threadPoolSize < 1) {
        throw new Error("application can't using less then 1 CPU core");
    }
    if (threadPoolSize > availableLogicalCors) {
        throw new Error(`application can't using more then ${availableLogicalCors} CPU core`);
    }
    process.env.UV_THREADPOOL_SIZE = String(threadPoolSize);
    return threadPoolSize;
}
exports.default = App;
module.exports = App;
//# sourceMappingURL=app.js.map