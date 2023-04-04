"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMethodDecorator = exports.Header = exports.Trace = exports.Options = exports.Post = exports.Put = exports.Patch = exports.Delete = exports.Head = exports.Get = exports.Controller = void 0;
const controller_1 = __importDefault(require("../Decorators/controller"));
exports.Controller = controller_1.default;
const method_1 = require("../Decorators/method");
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return method_1.Get; } });
Object.defineProperty(exports, "Head", { enumerable: true, get: function () { return method_1.Head; } });
Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return method_1.Delete; } });
Object.defineProperty(exports, "Patch", { enumerable: true, get: function () { return method_1.Patch; } });
Object.defineProperty(exports, "Put", { enumerable: true, get: function () { return method_1.Put; } });
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return method_1.Post; } });
Object.defineProperty(exports, "Options", { enumerable: true, get: function () { return method_1.Options; } });
Object.defineProperty(exports, "Trace", { enumerable: true, get: function () { return method_1.Trace; } });
Object.defineProperty(exports, "CreateMethodDecorator", { enumerable: true, get: function () { return method_1.CreateMethodDecorator; } });
const header_1 = __importDefault(require("../Decorators/header"));
exports.Header = header_1.default;
//# sourceMappingURL=index.js.map