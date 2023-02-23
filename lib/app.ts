import * as dotenv from 'dotenv';
import * as OS from 'os';
import Server from '@/Server';

// @ts-ignore
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

dotenv.config();

const availableLogicalCors = OS.cpus().length;

type AppPropsType = {
  threadPoolSize?: number;
}

class App {
  private readonly threadPoolSize: number;

  constructor(props: AppPropsType = {}) {
    this.threadPoolSize = setThreadPoolSize(props.threadPoolSize ?? availableLogicalCors);
  }

  useControllers(controllers: any[]): void {
    const controllersSet = [];

    for(const controller of controllers) {
      controllersSet.push(new controller());
    }
  }

  run(): void {
    const server = new Server();
    server.run();
  }
}

function setThreadPoolSize(threadPoolSize: number) {
  if (threadPoolSize < 1) {
    throw new Error("application can't using less then 1 CPU core");
  }
  if (threadPoolSize > availableLogicalCors) {
    throw new Error(`application can't using more then ${availableLogicalCors} CPU core`);
  }

  process.env.UV_THREADPOOL_SIZE = String(threadPoolSize);

  return threadPoolSize;
}

export default App;
module.exports = App;
