"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialize_javascript_1 = __importDefault(require("serialize-javascript"));
class Config {
    static config = {
        bodyParser: JSON.parse,
        serializer: (data) => (0, serialize_javascript_1.default)(data, { isJSON: true }),
    };
    static getValue(key) {
        return this.config[key];
    }
    static setValue(key, value) {
        this.config[key] = value;
    }
}
exports.default = Config;
//# sourceMappingURL=index.js.map