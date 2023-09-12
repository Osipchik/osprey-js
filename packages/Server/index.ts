import {Errorlike, Server as BunServer, TLSOptions, TLSServeOptions} from 'bun';
import Router from '../Routing';
import Logger from '../utils/Logger';
import MetaStore, { MetaStoreKeys } from '../utils/metaStore';
import type { ParamsType } from '../Routing/types';
import { TLSOptionsGenericServeOptions } from '@/types';

/**
 * Internal Class that configure and start server
 *
 * @param {TLSOptionsGenericServeOptions} config - Configure the server.
 *
 * @example
 * ```ts
 * new Server({
 *   lowMemoryMode: false,
 *   development: true,
 *   id: 123,
 * })
 * ```
 */
class Server {
  private server: BunServer;
  private readonly router: Router;
  private readonly host: string;
  private readonly port: number;
  private readonly config?: TLSOptionsGenericServeOptions;

  constructor(config?: TLSOptionsGenericServeOptions) {
    this.requestListener = this.requestListener.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.router = new Router();
    this.config = config;

    this.host = process.env.HOST || 'localhost';
    this.port = Number(process.env.PORT) || 3000;
  }

  run(): void {
    this.server = Bun.serve({
      port: this.port,
      hostname: this.host,
      fetch: this.requestListener,
      error: this.errorHandler,
      ...this.config,
    });

    Logger.success(`Server is running at http://${this.host}:${this.port}`);

    process.on('SIGINT', this.onServerClose);
  }

  private requestListener(
    request: Request,
  ): Response | Promise<Response> {
    const route = this.router.getRequestHandler(request);

    return route.handler(request, route.params as ParamsType);

    // try {
    //   const route = this.router.getRequestHandler(request);
    //   const handlerTask = route.handler(request, route.params as ParamsType);
    //
    //   if (handlerTask) {
    //     handlerTask.catch((error: any) => {
    //       const exceptionHandler: Function | undefined = MetaStore.getByKey(route.handler, MetaStoreKeys.catch);
    //
    //       if (typeof exceptionHandler === 'function') {
    //         exceptionHandler(request, response, route.params)?.catch((err: any) => {
    //           throw new Error(err);
    //         })
    //       } else {
    //         Router.errorHandlers.ServerError(request, response, error);
    //       }
    //     });
    //   }
    // } catch (error: any) {
    //   Router.errorHandlers.ServerError(request, response, error);
    // }
  }

  private errorHandler(error: Errorlike) {

  }

  private onServerClose() {
    Logger.warn('Server is closed');
    process.exit();
  }
}

export default Server;
module.exports = Server;
