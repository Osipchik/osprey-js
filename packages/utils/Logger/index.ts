import Concollor from '../../utils/Logger/concollor';
import { IDecorator, Info, urlRegex, Warn, Error, Success, Data, Put, Patch } from '@/utils/Logger/utils';

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

function Log(message: string): void {
  const text = String(message);

  console.log(text.replace(urlRegex, (url) => Concollor`${url}(u,blue)`));
}

function _print({ titleTag, messageTag, defaultTitle }: IDecorator) {
  return function (message: string, title?: string) {
    console.log(titleTag(`${ title ?? defaultTitle}: `) + messageTag(`${message}`));
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
