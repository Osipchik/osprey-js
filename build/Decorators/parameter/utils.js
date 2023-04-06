"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = exports.getParams = exports.paramsParser = exports.bodyParser = void 0;
const Config_1 = __importDefault(require("../../Config"));
async function bodyParser(request, _) {
    return new Promise((resolve, reject) => {
        const data = [];
        request.on('data', (chunk) => {
            data.push(chunk);
        });
        request.on('end', () => {
            try {
                resolve(Config_1.default.getValue('bodyParser')(data));
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
exports.bodyParser = bodyParser;
function paramsParser(key) {
    return (_, params) => {
        return params[key];
    };
}
exports.paramsParser = paramsParser;
function getParams(_, params) {
    return params.params;
}
exports.getParams = getParams;
function getQuery(request, _) {
    const [url, searchParams] = request.url.split('?', 2);
    const searchParamsList = new URLSearchParams(searchParams);
    return Object.fromEntries(searchParamsList.entries());
}
exports.getQuery = getQuery;
//# sourceMappingURL=utils.js.map