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

export { Middleware as default };
//# sourceMappingURL=index.js.map
