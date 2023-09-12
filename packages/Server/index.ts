import {Errorlike, Server as BunServer, WebSocketServeOptions} from 'bun';
import Router from '../Routing';
import Logger from '../utils/Logger';
import type { ParamsType } from '../Routing/types';
import {ServerConfigType, TLSOptionsGenericServeOptions} from '@/types';

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
  private readonly tlsOptions?: TLSOptionsGenericServeOptions;
  private readonly websocket?: WebSocketServeOptions;

  constructor({ tlsOptions, websocket }: ServerConfigType = {}) {
    this.requestListener = this.requestListener.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.router = new Router();
    this.websocket = websocket;
    this.tlsOptions = tlsOptions;

    this.host = process.env.HOST || 'localhost';
    this.port = Number(process.env.PORT) || 3000;
  }

  run<WebSocketDataType = undefined>(): void {
    this.server = Bun.serve<WebSocketDataType>({
      port: this.port,
      hostname: this.host,
      fetch: this.requestListener,
      error: this.errorHandler,
      ...this.tlsOptions,
      ...this.websocket,
    });

    const origin = this.tlsOptions.certFile || this.tlsOptions.caFile || this.tlsOptions.keyFile
      ? 'https://'
      : 'http://';

    Logger.success(`Server is running at ${origin}${this.host}:${this.port}`);

    process.on('SIGINT', this.onServerClose);
  }

  private requestListener(
    request: Request,
  ): Response | Promise<Response> {
    const route = this.router.getRequestHandler(request);

    return route.handler(request, route.params as ParamsType);
  }

  private errorHandler(error: Errorlike) {
    return Router.errorHandlers.ServerError(error);
  }

  private onServerClose() {
    Logger.warn('Server is closed');
    process.exit();
  }
}

export default Server;
module.exports = Server;
