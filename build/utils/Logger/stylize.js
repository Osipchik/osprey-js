"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ANSI = {
    /* 1 */ 'b': 1,
    /* 2 */ 'f': 2,
    /* 3 */ 'i': 3,
    /* 4 */ 'u': 4,
    /* 5 */ 'l': 5,
    /* 6 */ 'h': 6,
    /* 7 */ 'n': 7,
    /* 8 */ 'c': 8,
    /* 9 */ 's': 9, // strikethrough
};
const COLOR = [
    /* 1 */ 'black',
    /* 2 */ 'red',
    /* 3 */ 'green',
    /* 4 */ 'yellow',
    /* 5 */ 'blue',
    /* 6 */ 'magenta',
    /* 7 */ 'cyan',
    /* 8 */ 'white',
    /* 9 */ 'crimson',
];
function esc(style, value) {
    if (style) {
        return `\x1b[${style}m${value}\x1b[0m`;
    }
    return value;
}
function stylize(styles, text) {
    for (const style of styles.split(',')) {
        if (style.length === 1) {
            text = esc(ANSI[style], text);
        }
        else {
            const [fg, bg] = style.split('/');
            const fgColor = COLOR.indexOf(fg);
            const bgColor = COLOR.indexOf(bg);
            if (fgColor > -1) {
                text = esc(30 + fgColor, text);
            }
            if (bgColor > -1) {
                text = esc(40 + bgColor, text);
            }
        }
    }
    return text;
}
exports.default = stylize;
module.exports = stylize;
