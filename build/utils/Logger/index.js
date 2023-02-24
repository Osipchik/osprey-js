"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const concollor_1 = tslib_1.__importDefault(require("../../utils/Logger/concollor"));
const utils_1 = require("../../utils/Logger/utils");
function Log(message) {
    const text = String(message);
    console.log(text.replace(utils_1.urlRegex, (url) => (0, concollor_1.default) `${url}(u,blue)`));
}
function _print({ titleTag, messageTag, defaultTitle }) {
    return function (message, title) {
        console.log(titleTag(`${title ?? defaultTitle}: `) + messageTag(`${message}`));
    };
}
Log.error = _print(utils_1.Error);
Log.warn = _print(utils_1.Warn);
Log.info = _print(utils_1.Info);
Log.success = _print(utils_1.Success);
Log.put = _print(utils_1.Put);
Log.patch = _print(utils_1.Patch);
Log.data = _print(utils_1.Data);
exports.default = Log;
module.exports = Log;
