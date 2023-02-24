"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stylize = require('./stylize');
function Concollor(strings, ...values) {
    const result = [strings[0]];
    let i = 1;
    for (const val of values) {
        const str = strings[i++];
        if (str.startsWith('(')) {
            const pos = str.indexOf(')');
            const styles = str.substring(1, pos);
            const value = stylize(styles, val);
            const rest = str.substring(pos + 1);
            result.push(value, rest);
        }
    }
    return result.join('');
}
exports.default = Concollor;
