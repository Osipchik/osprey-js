"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stylize_1 = __importDefault(require("./stylize"));
function Tag(styles) {
    return (strings, ...values) => {
        if (typeof strings === 'string') {
            return (0, stylize_1.default)(styles, strings);
        }
        const result = [strings[0]];
        let i = 1;
        for (const val of values) {
            const str = strings[i++];
            result.push(String(val), str);
        }
        return (0, stylize_1.default)(styles, result.join(''));
    };
}
exports.default = Tag;
module.exports = Tag;
//# sourceMappingURL=tag.js.map