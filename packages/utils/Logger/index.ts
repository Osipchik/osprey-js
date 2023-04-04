import util from 'util';
import Concollor from '../../utils/Logger/concollor';
import { IDecorator, Info, urlRegex, Warn, Error, Success, Data, Put, Patch } from './utils';

type printType = (message: string, title?: string) => void;

interface ILogger {
  error: printType;
  warn: printType;
  info: printType;
  success: printType;
  put: printType;
  patch: printType;
  data: printType;
}

type Log = ILogger & ((message: string) => void);

const logger = util.promisify(console.log);

function Log(message: string): Promise<void> {
  const text = String(message);

  return new Promise(() => {
    console.log(text.replace(urlRegex, (url) => Concollor`${url}(u,blue)`));
  });
}

function _print({ titleTag, messageTag, defaultTitle }: IDecorator) {
  return function (message: string, title?: string) {
    return new Promise(() => {
      console.log(titleTag(`${ title ?? defaultTitle}: `) + messageTag(`${message}`));
    });
  }
}

Log.error = _print(Error);
Log.warn = _print(Warn);
Log.info = _print(Info);
Log.success = _print(Success);
Log.put = _print(Put);
Log.patch = _print(Patch);
Log.data = _print(Data);

export default Log as Log;
module.exports = Log as Log;
