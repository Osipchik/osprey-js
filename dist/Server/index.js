import http from 'http';

var dist = {};

var node = {};

Object.defineProperty(node, "__esModule", { value: true });
var Type;
(function (Type) {
    Type[Type["STATIC"] = 0] = "STATIC";
    Type[Type["PARAM"] = 1] = "PARAM";
})(Type || (Type = {}));
const PARAM = ':';
const SLASH = '/';
const SLASH_CODE = SLASH.charCodeAt(0);
class Node {
    constructor(config = {}) {
        this.indices = config.indices || '';
        this.children = config.children || [];
        this.childrenI = config.childrenI || {};
        this.path = config.path || "";
        this.handle = config.handle || null;
        this.wildChild = config.wildChild || false;
        this.type = config.type || Type.STATIC;
        this.param = config.param || '';
        this.pathLength = this.path.length;
        this.childrenLength = this.children.length;
    }
    addRoute(fullPath, handle) {
        const params = this.countParams(fullPath);
        if (!this.isEmpty()) {
            this.onChunk(this, fullPath, fullPath, handle, params);
        }
        else {
            this.insertChild(fullPath, fullPath, handle, params);
        }
    }
    search(searchPath) {
        let n = this;
        const params = {};
        walk: while (true) {
            // referring to length is technically a function call, cache it
            const searchPathLength = searchPath.length;
            if (searchPathLength > n.pathLength && searchPath.slice(0, n.pathLength) === n.path) {
                searchPath = searchPath.slice(n.pathLength);
                if (n.wildChild) {
                    n = n.children[0];
                    let end = 0;
                    while (end < searchPathLength && searchPath.charCodeAt(end) !== SLASH_CODE) {
                        end++;
                    }
                    const paramValue = searchPath.slice(0, end);
                    if (!paramValue || !n.param) {
                        return { value: null, params };
                    }
                    if (n.param !== '!') {
                        params[n.param] = paramValue;
                    }
                    // We need to go deeper!
                    if (end < searchPathLength) {
                        if (n.childrenLength === 0) {
                            return { value: null, params };
                        }
                        searchPath = searchPath.slice(end);
                        n = n.children[0];
                        continue walk;
                    }
                    return { value: n.handle, params };
                }
                // If n node does not have a wildcard child, look up the next child node and continue to walk down the tree
                const c = searchPath.charCodeAt(0);
                for (let i = 0; i < n.indices.length; i++) {
                    if (c === n.indices.charCodeAt(i)) {
                        n = n.children[i];
                        continue walk;
                    }
                }
            }
            else if (searchPath === n.path) {
                return { value: n.handle, params };
            }
            return { value: null, params };
        }
    }
    hasChildren() {
        return this.children.length > 0;
    }
    insertChild(fullPath, childPath, handle, numParams) {
        let offset = 0; // Already handled chars of the path
        let n = this;
        // Find prefix until first wildcard
        for (let i = 0, max = childPath.length; numParams > 0; i++) {
            const c = childPath[i];
            if (c !== PARAM) {
                continue;
            }
            // Find wildcard end (either '/' or path end)
            let end = i + 1;
            while (end < max && childPath[end] !== "/") {
                if (childPath[end] === PARAM) {
                    throw new Error("only one wildcard per path segment is allowed, has: '" +
                        childPath.slice(i) +
                        "' in path '" +
                        fullPath +
                        "'");
                }
                else {
                    end++;
                }
            }
            // Check if this Node existing children which would be unreachable
            // if we insert the wildcard here
            if (n.hasChildren()) {
                throw new Error("wildcard route '" +
                    childPath.slice(i, end) +
                    "' conflicts with existing children in path '" +
                    fullPath +
                    "'");
            }
            // check if the wildcard has a name
            if (end - i < 2) {
                throw new Error("wildcards must be named with a non-empty name in path '" +
                    fullPath +
                    "'");
            }
            // Split path at the beginning of the wildcard
            if (i > 0) {
                n.replacePath(childPath.slice(offset, i));
                offset = i;
            }
            n = n.replaceChildren({ type: Type.PARAM });
            numParams--;
            if (end < max) {
                n.replacePath(childPath.slice(offset, end));
                offset = end;
                n = n.replaceChildren();
            }
        }
        // insert remaining path part and handle to the leaf
        n.replacePath(childPath.slice(offset));
        n.setHandle(handle);
    }
    setHandle(newHandle) {
        this.handle = newHandle;
    }
    replaceChildren(config = {}) {
        const child = new Node(config);
        if (config.type === Type.PARAM) {
            this.wildChild = true;
        }
        this.children = [child];
        this.childrenLength = 1;
        return child;
    }
    replacePath(newPath) {
        if (newPath[0] === PARAM) {
            this.param = newPath.slice(1);
        }
        this.path = newPath;
        this.pathLength = newPath.length;
    }
    isEmpty() {
        return !(this.path.length > 0 || this.children.length > 0);
    }
    processCharacter(fullPath, childPath, handle, numParams) {
        const c = childPath[0];
        // Slash after param
        if (this.type === Type.PARAM && c === "/" && this.children.length === 1) {
            this.onChunk(this.children[0], fullPath, childPath, handle, numParams);
            return;
        }
        // Check if a child with the next path char exists
        const existing = this.childrenI[c.charCodeAt(0)];
        if (existing) {
            existing.onChunk(existing, fullPath, childPath, handle, numParams);
            return;
        }
        // Otherwise insert it
        if (c !== PARAM) {
            const child = new Node({ type: Type.STATIC });
            this.children.push(child);
            this.indices += c;
            this.childrenI[c.charCodeAt(0)] = child;
            this.childrenLength = this.children.length;
            child.insertChild(fullPath, childPath, handle, numParams);
            return;
        }
        this.insertChild(fullPath, childPath, handle, numParams);
    }
    processWildcard(fullPath, childPath, handle, numParams) {
        const isMatch = childPath.length >= this.path.length &&
            this.path === childPath.slice(0, this.path.length) &&
            (this.path.length >= childPath.length || childPath[this.path.length] === "/");
        if (isMatch) {
            this.onChunk(this, fullPath, childPath, handle, numParams);
            return;
        }
        // Wildcard conflict
        const pathSeg = childPath.split("/")[0];
        const prefix = fullPath.slice(0, fullPath.indexOf(pathSeg)) + this.path;
        throw new Error(`'${pathSeg}' in new path '${fullPath}' conflicts with existing wildcard '${this.path}' in existing prefix '${prefix}'`);
    }
    createNode(i, fullPath, childPath, handle, numParams) {
        const nextChildPath = childPath.slice(i);
        if (this.wildChild) {
            this.children[0].processWildcard(fullPath, nextChildPath, handle, numParams - 1);
            return;
        }
        this.processCharacter(fullPath, nextChildPath, handle, numParams);
    }
    commonPrefixIndex(childPath) {
        // Find the longest common prefix
        // This also implies that the common prefix contains no PARAM
        // since the existing key can't contain those chars.
        let i = 0;
        const max = Math.min(childPath.length, this.path.length);
        while (i < max && this.path[i] === childPath[i]) {
            i++;
        }
        return i;
    }
    split(i, childPath) {
        if (i < this.path.length) {
            const child = new Node({
                path: this.path.slice(i),
                wildChild: this.wildChild,
                childrenI: this.childrenI,
                children: this.children,
                handle: this.handle,
                indices: this.indices
            });
            this.children = [child];
            this.indices = this.path[i];
            this.childrenI = { [this.indices.charCodeAt(0)]: child };
            this.childrenLength = 1;
            this.wildChild = false;
            this.path = childPath.slice(0, i);
            this.pathLength = this.path.length;
            this.handle = null;
            return true;
        }
        return false;
    }
    onChunk(n, fullPath, childPath, fullPathHandle, numParams) {
        const i = n.commonPrefixIndex(childPath);
        const split = n.split(i, childPath);
        // Make new node a child of this node
        if (i < childPath.length) {
            n.createNode(i, fullPath, childPath, fullPathHandle, numParams);
        }
        else if (i === childPath.length) {
            // Make node a (in-path leaf)
            if (!split) {
                throw new Error('Route already defined.');
            }
            this.handle = fullPathHandle;
        }
    }
    countParams(path) {
        let n = 0;
        for (let i = 0; i < path.length; i++) {
            if (path[i] !== PARAM) {
                continue;
            }
            n++;
        }
        return n;
    }
}
node.Node = Node;

Object.defineProperty(dist, "__esModule", { value: true });
const node_1 = node;
function typeCheck(bucket, path) {
    if (!path) {
        throw new Error('Path is required.');
    }
    if (!bucket) {
        throw new Error('Bucket is required.');
    }
    // when used outside of typescript, it is possible for user to pass in the wrong parameters
    if (typeof bucket !== 'string') {
        throw new Error('Bucket should be a string.');
    }
    if (typeof path !== 'string') {
        throw new Error('Path should be a string.');
    }
}
class RoadRunner {
    constructor() {
        this.buckets = {};
    }
    addRoute(bucket, path, value) {
        typeCheck(bucket, path);
        // only check when building routes for performance, assume user will pass in correct values on lookup
        if (path[0] !== '/' && path[0] !== '*') {
            throw new Error('The first character of a path should be `/` or `*`.');
        }
        // convert wildcards into params (we suppress them from output later)
        path = path.replace(/\*([A-z0-9]+)?\//g, ':!/').replace(/\*$/g, ':!');
        if (!this.buckets[bucket]) {
            this.buckets[bucket] = new node_1.Node();
        }
        this.buckets[bucket].addRoute(path, value);
    }
    findRoute(bucket, path) {
        typeCheck(bucket, path);
        if (!this.buckets[bucket]) {
            return null;
        }
        const dynamic = this.buckets[bucket].search(path);
        if (dynamic.value === null) {
            return null;
        }
        return {
            value: dynamic.value,
            params: dynamic.params
        };
    }
}
var RoadRunner_1 = dist.RoadRunner = RoadRunner;

const stylize$1 = require('./stylize');

function Concollor(strings, ...values) {
  const result = [strings[0]];

  let i = 1;
  for (const val of values) {
    const str = strings[i++];

    if (str.startsWith('(')) {
      const pos = str.indexOf(')');
      const styles = str.substring(1, pos);
      const value = stylize$1(styles, val);
      const rest = str.substring(pos + 1);

      result.push(value, rest);
    }
  }

  return result.join('');
}

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
module.exports = stylize;

function Tag(styles) {
    return (strings, ...values) => {
        if (typeof strings === 'string') {
            return stylize(styles, strings);
        }
        const result = [strings[0]];
        let i = 1;
        for (const val of values) {
            const str = strings[i++];
            result.push(String(val), str);
        }
        return stylize(styles, result.join(''));
    };
}
module.exports = Tag;

const Error$1 = {
    titleTag: Tag('b,i,red/red'),
    messageTag: Tag('red/red'),
    defaultTitle: 'Error',
};
const Warn = {
    titleTag: Tag('b,i,yellow/yellow'),
    messageTag: Tag('yellow/yellow'),
    defaultTitle: 'Warn',
};
const Info = {
    titleTag: Tag('b,blue'),
    messageTag: Tag('blue'),
    defaultTitle: 'Info',
};
const Success = {
    titleTag: Tag('b,green'),
    messageTag: Tag('green'),
    defaultTitle: 'Success',
};
const Put = {
    titleTag: Tag('b,cyan'),
    messageTag: Tag('cyan'),
    defaultTitle: 'Put',
};
const Patch = {
    titleTag: Tag('b,crimson'),
    messageTag: Tag('crimson'),
    defaultTitle: 'Patch',
};
const Data = {
    titleTag: Tag('b,magenta'),
    messageTag: Tag('magenta'),
    defaultTitle: 'Data',
};
const urlRegex = /(https?:\/\/\S+)/gm;

function Log(message) {
    const text = String(message);
    console.log(text.replace(urlRegex, (url) => Concollor `${url}(u,blue)`));
}
function _print({ titleTag, messageTag, defaultTitle }) {
    return function (message, title) {
        console.log(titleTag(`${title ?? defaultTitle}: `) + messageTag(`${message}`));
    };
}
Log.error = _print(Error$1);
Log.warn = _print(Warn);
Log.info = _print(Info);
Log.success = _print(Success);
Log.put = _print(Put);
Log.patch = _print(Patch);
Log.data = _print(Data);
module.exports = Log;

var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["Ok"] = 200] = "Ok";
    StatusCodes[StatusCodes["Created"] = 201] = "Created";
    StatusCodes[StatusCodes["Accepted"] = 202] = "Accepted";
    StatusCodes[StatusCodes["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    StatusCodes[StatusCodes["NoContent"] = 204] = "NoContent";
    StatusCodes[StatusCodes["ResetContent"] = 205] = "ResetContent";
    StatusCodes[StatusCodes["PartialContent"] = 206] = "PartialContent";
    StatusCodes[StatusCodes["MultiStatus"] = 207] = "MultiStatus";
    StatusCodes[StatusCodes["AlreadyReported"] = 208] = "AlreadyReported";
    StatusCodes[StatusCodes["IMUsed"] = 226] = "IMUsed";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
    StatusCodes[StatusCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    StatusCodes[StatusCodes["InternalServerError"] = 500] = "InternalServerError";
    StatusCodes[StatusCodes["NotImplemented"] = 501] = "NotImplemented";
})(StatusCodes || (StatusCodes = {}));

function NotImplementedHandler(request, response) {
    const message = `The request method: ${request.method} is not supported by the server and cannot be handled`;
    Log.error(message, `Error ${StatusCodes.NotImplemented}`);
    response.statusCode = StatusCodes.NotImplemented;
    response.statusMessage = message;
    response.end();
}
module.exports = NotImplementedHandler;

function ServerErrorHandler(request, response, error) {
    Log.error('Unexpected Server Error', `Error ${StatusCodes.InternalServerError}`);
    Log.error(error.message);
    response.statusCode = StatusCodes.InternalServerError;
    response.statusMessage = 'Internal Server Error';
    response.end();
}
module.exports = ServerErrorHandler;

function MethodNotAllowedHandler(request, response) {
    const message = `The request ${request.method} ${request.url} is not allowed`;
    response.statusCode = StatusCodes.MethodNotAllowed;
    response.statusMessage = message;
    response.end();
}
module.exports = MethodNotAllowedHandler;

function NotFoundHandler(request, response) {
    const message = `The request ${request.method} ${request.url} is not found`;
    response.statusCode = StatusCodes.NotFound;
    response.statusMessage = message;
    response.end();
}
module.exports = NotFoundHandler;

function normalizeSlash(value) {
    let val = value;
    while (val.startsWith('/')) {
        val = val.slice(1);
    }
    while (val.endsWith('/')) {
        val = val.slice(0, -1);
    }
    return '/' + val;
}
function getPath(prefix, pathName) {
    const routePrefix = prefix ?? '';
    const routePathName = pathName ?? '';
    if (routePrefix.includes(':')) {
        throw new Error('cant has semicolon');
    }
    if (routePathName.includes('*')) {
        throw new Error('cant has semicolon');
    }
    const props = [];
    const normalizedPathName = routePathName.split('/').reduce((acc, character) => {
        if (character.includes(':')) {
            const propName = character.slice(1);
            if (isVarName(propName)) {
                props.push(character.slice(1));
            }
            else {
                throw new Error(`invalid var name: ${propName}`);
            }
            return acc + '/' + character;
        }
        return acc + '/' + character;
    }, '');
    const normalizedPrefix = normalizeSlash(routePrefix);
    return {
        pathName: normalizeSlash(normalizedPrefix + normalizeSlash(normalizedPathName)),
        prefix: normalizedPrefix,
        props,
    };
}
function isVarName(name) {
    if (name.trim() !== name) {
        return false;
    }
    try {
        new Function(name, 'var ' + name);
    }
    catch (_) {
        return false;
    }
    return true;
}

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const PATCH = 'PATCH';

class Router {
    static ServerError = ServerErrorHandler;
    static NotFound = NotFoundHandler;
    static MethodNotAllowed = MethodNotAllowedHandler;
    static NotImplemented = NotImplementedHandler;
    static router = new RoadRunner_1();
    static routeHandlers = {
        GET: {},
        HEAD: {},
        POST: {},
        PUT: {},
        DELETE: {},
        CONNECTS: {},
        OPTIONS: {},
        TRACE: {},
        PATCH: {},
        ServerError: Router.ServerError,
        NotFound: Router.NotFound,
        MethodNotAllowed: Router.MethodNotAllowed,
        NotImplemented: Router.NotImplemented,
    };
    static addRoute(handler, { method, prefix, path }) {
        const { pathName } = getPath(prefix, path);
        switch (method) {
            case GET:
                Log.info(pathName, method);
                break;
            case POST:
                Log.warn(pathName, method);
                break;
            case DELETE:
                Log.error(pathName, method);
                break;
            case PATCH:
                Log.patch(pathName, method);
                break;
            case PUT:
                Log.put(pathName, method);
                break;
            default: Log.data(pathName, method);
        }
        Router.router.addRoute(method, pathName, handler);
    }
    getRequestHandler(request) {
        if (request.method) {
            const route = Router.router.findRoute(request.method, request.url);
            if (route) {
                return {
                    handler: route.value,
                    params: route.params,
                };
            }
            return {
                handler: Router.routeHandlers.NotFound,
            };
        }
        return {
            handler: Router.routeHandlers.NotImplemented,
        };
    }
}
module.exports = Router;

function MiddlewareError(message, middlewareName) {
    Log.error(message, `Middleware Error in ${middlewareName}`);
    return new Error(message);
}

class Middleware {
    static middlewares = [];
    static asyncMiddlewares = [];
    runMiddlewaresSync(request, response) {
        const next = (error) => {
            if (error instanceof Error) {
                throw MiddlewareError(error.message, 'Middleware');
            }
        };
        for (const middleware of Middleware.middlewares) {
            middleware(request, response, next);
        }
    }
    static use(preHandler) {
        Middleware.middlewares.push(preHandler);
    }
}
module.exports = Middleware;

class Server {
    server;
    middleware;
    router;
    host;
    port;
    constructor() {
        this.requestListener = this.requestListener.bind(this);
        this.middleware = new Middleware();
        this.router = new Router();
        this.server = http.createServer(this.requestListener);
        this.host = process.env.HOST || 'localhost';
        this.port = Number(process.env.PORT) || 3000;
    }
    requestListener(request, response) {
        try {
            this.middleware.runMiddlewaresSync(request, response);
            const { handler, params } = this.router.getRequestHandler(request);
            handler(request, response, params);
        }
        catch (error) {
            Router.routeHandlers.ServerError(request, response, error);
        }
    }
    run() {
        this.server.on('error', (error) => {
            if (error.code === 'EACCES') {
                Log.error(`No access to port: ${this.port}`, 'EACCES');
            }
        });
        this.server.listen(this.port, () => {
            Log.success(`Server is running at http://${this.host}:${this.port}`);
        });
        process.on('exit', () => {
            this.server.close(() => {
                Log.warn(`Server is closed at http://${this.host}:${this.port}`);
            });
        });
        process.on('exit', () => {
            this.server.close(() => {
                Log.warn(`Server is closed at http://${this.host}:${this.port}`);
            });
        });
    }
}
module.exports = Server;

export { Server as default };
//# sourceMappingURL=index.js.map
