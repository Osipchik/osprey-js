import * as dotenv from 'dotenv';
import * as OS from 'os';
import Router from './Routing';
import Server from './Server';
import MetaStore from './utils/metaStore';
import { AsyncHandlerType } from './Decorators/method';

dotenv.config();

const availableLogicalCors = OS.cpus().length;

type AppPropsType = {
  threadPoolSize?: number;
}

class App {
  constructor(props: AppPropsType = {}) {
    setThreadPoolSize(props.threadPoolSize ?? availableLogicalCors);
  }

  useControllers(controllers: any[]): void {
    const controllersSet = [];

    for(const controller of controllers) {
      const { methods } = MetaStore.getMeta(controller);

      const controllerInstance = new controller();

      methods.forEach((handler: AsyncHandlerType) => {
        const handlerMeta = MetaStore.getMeta(handler);

        Router.addRoute(handler(controllerInstance), handlerMeta.meta);
      });

      controllersSet.push(controllerInstance);
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
