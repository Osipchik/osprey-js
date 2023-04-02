"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const OS = __importStar(require("os"));
const Routing_1 = __importDefault(require("./Routing"));
const Server_1 = __importDefault(require("./Server"));
const metaStore_1 = __importDefault(require("./utils/metaStore"));
const pipeline_1 = __importDefault(require("./pipeline"));
dotenv.config();
const availableLogicalCors = OS.cpus().length;
class App {
    pipeline;
    constructor(props = {}) {
        setThreadPoolSize(props.threadPoolSize || availableLogicalCors);
        this.pipeline = new pipeline_1.default();
    }
    useControllers(controllers) {
        const controllersSet = [];
        for (const controller of controllers) {
            const { methods } = metaStore_1.default.getMeta(controller);
            const controllerInstance = new controller();
            methods.forEach((handler) => {
                const handlerMeta = metaStore_1.default.getMeta(handler);
                Routing_1.default.addRoute(handler(controllerInstance), handlerMeta.meta);
            });
            controllersSet.push(controllerInstance);
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
//# sourceMappingURL=index.js.map