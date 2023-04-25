import http from 'http';
import Router from '../Routing';
import Logger from '../utils/Logger';
import {IncomingMessageType, ParamsType, ServerResponseType} from '../Routing/types';
import MetaStore from '../utils/metaStore';

class Server {
  private readonly server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  private readonly router: Router;
  private readonly host: string;
  private readonly port: number;

  constructor() {
    this.requestListener = this.requestListener.bind(this);
    this.router = new Router();

    this.server = http.createServer(this.requestListener);

    this.host = process.env.HOST || 'localhost';
    this.port = Number(process.env.PORT) || 3000;
  }

  run(): void {
    this.server.on('error', (error: any) => {
      switch(error.code) {
        case 'EACCES': {
          Logger.error(`No access to port: ${this.port}`, 'EACCES');
          break;
        }
        case 'ELIFECYCLE': {
          Logger.error(error.message, 'ELIFECYCLE');
          break;
        }
        default: {
          Logger.error(error.message, 'EACCES');
        }
      }
    });

    this.server.listen(this.port, () => {
      Logger.success(`Server is running at http://${this.host}:${this.port}`);
    });

    this.server.on('close', this.onServerClose);

    process.on('SIGINT', this.onServerClose);
  }

  private requestListener(
    request: IncomingMessageType,
    response: ServerResponseType,
  ): void {
    try {
      const route = this.router.getRequestHandler(request);
      route.handler(request, response, route.params as ParamsType)?.
        catch((error: any) => {
          const exceptionHandler: Function | undefined = MetaStore.getByKey(route.handler, 'catch');

          if (typeof exceptionHandler === 'function') {
            exceptionHandler(request, response, route.params)?.catch((err: any) => {
              throw new Error(err);
            })
          } else {
            Router.errorHandlers.ServerError(request, response, error);
          }
        });
    } catch (error: any) {
      Router.errorHandlers.ServerError(request, response, error);
    }
  }

  private onServerClose() {
    Logger.warn('Server is closed');
    process.exit();
  }
}

export default Server;
module.exports = Server;
