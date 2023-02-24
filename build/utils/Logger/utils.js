"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRegex = exports.Data = exports.Patch = exports.Put = exports.Success = exports.Info = exports.Warn = exports.Error = void 0;
const tslib_1 = require("tslib");
const tag_1 = tslib_1.__importDefault(require("../../utils/Logger/tag"));
exports.Error = {
    titleTag: (0, tag_1.default)('b,i,red/red'),
    messageTag: (0, tag_1.default)('red/red'),
    defaultTitle: 'Error',
};
exports.Warn = {
    titleTag: (0, tag_1.default)('b,i,yellow/yellow'),
    messageTag: (0, tag_1.default)('yellow/yellow'),
    defaultTitle: 'Warn',
};
exports.Info = {
    titleTag: (0, tag_1.default)('b,blue'),
    messageTag: (0, tag_1.default)('blue'),
    defaultTitle: 'Info',
};
exports.Success = {
    titleTag: (0, tag_1.default)('b,green'),
    messageTag: (0, tag_1.default)('green'),
    defaultTitle: 'Success',
};
exports.Put = {
    titleTag: (0, tag_1.default)('b,cyan'),
    messageTag: (0, tag_1.default)('cyan'),
    defaultTitle: 'Put',
};
exports.Patch = {
    titleTag: (0, tag_1.default)('b,crimson'),
    messageTag: (0, tag_1.default)('crimson'),
    defaultTitle: 'Patch',
};
exports.Data = {
    titleTag: (0, tag_1.default)('b,magenta'),
    messageTag: (0, tag_1.default)('magenta'),
    defaultTitle: 'Data',
};
exports.urlRegex = /(https?:\/\/\S+)/gm;
