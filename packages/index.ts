import * as dotenv from 'dotenv';
import * as OS from 'os';
import Server from './Server';
import MetaStore from './utils/metaStore';
import Pipeline from './pipeline';
import { AsyncHandlerType } from './Routing/types';

dotenv.config();

const availableLogicalCors = OS.cpus().length;

type AppPropsType = {
  threadPoolSize?: number;
}

class App {
  private readonly pipeline: Pipeline;

  constructor(props: AppPropsType = {}) {
    setThreadPoolSize(props.threadPoolSize || availableLogicalCors);
    this.pipeline = new Pipeline();
  }

  useControllers(controllers: any[]): void {
    for (const controller of controllers) {
      const meta = MetaStore.getMeta(controller);

      const controllerInstance = new controller();

      meta.methods.forEach((handler: AsyncHandlerType) => {
        const handlerMeta = MetaStore.getMeta(handler);

        this.pipeline.registerMethod(handler(controllerInstance), handlerMeta, meta.filters);
      });
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
