import * as dotenv from 'dotenv';
import * as OS from 'os';
import Server from './Server';
import MetaStore from './utils/metaStore';
import Pipeline from './pipeline';
import { AsyncHandlerType } from './Routing/types';
import { ActionFilterKeys } from './Decorators/ActionFilters/utils';
import { AppPropsType, WrappedMethodMta } from '@/types';

dotenv.config();

const availableLogicalCors = OS.cpus().length;

/**
 * Root class to start the project
 *
 * @param {AppPropsType} props - application basic config.
 *
 * @example
 * ```ts
 * new App({ threadPoolSize: 5 })
 * ```
 */
class App {
  private readonly pipeline: Pipeline;
  private readonly middlewares: any[];
  private readonly props?: AppPropsType;

  constructor(props: AppPropsType = {}) {
    setThreadPoolSize(props.threadPoolSize || availableLogicalCors);
    this.pipeline = new Pipeline();

    this.middlewares = [];
    this.props = props;
  }

  /**
   * Register controllers
   *
   * @param {any[]} controllers - controllers list.
   *
   */
  useControllers(controllers: any[]): void {
    for (const controller of controllers) {
      const meta = MetaStore.getMeta(controller);

      const controllerInstance = new controller();

      meta.methods.forEach((handler: AsyncHandlerType) => {
        const handlerMeta = MetaStore.getMeta(handler);
        const filters: WrappedMethodMta = { ...meta.filters, [ActionFilterKeys.MIDDLEWARE]: this.middlewares };

        this.pipeline.registerMethod(handler(controllerInstance), handlerMeta, filters);
      });
    }
  }

  /**
   * Register middlewares
   * This method should be called before useControllers
   *
   * @param {any[]} middlewares - middlewares list.
   *
   */
  useMiddlewares(middlewares: any[]): void {
    this.middlewares.push(...middlewares);
  }

  /**
   * Finish setup and run the server
   *
   */
  run(): void {
    const server = new Server(this.props);
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
