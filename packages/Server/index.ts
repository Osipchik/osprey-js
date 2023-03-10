import http from 'http';
import Router from '../Routing';
import Logger from '../utils/Logger';
import Middleware from '../Middleware';
import { IncomingMessageType, ServerResponseType } from '../Routing/types';

class Server {
  private readonly server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  private readonly middleware: Middleware;
  private readonly router: Router;
  private readonly host: string;
  private readonly port: number;

  constructor() {
    this.requestListener = this.requestListener.bind(this);
    this.middleware = new Middleware();
    this.router = new Router();

    this.server = http.createServer(this.requestListener);

    this.host = process.env.HOST || 'localhost';
    this.port = Number(process.env.PORT) || 3000;
  }

  private requestListener(
    request: IncomingMessageType,
    response: ServerResponseType,
  ): void {
    try {
      this.middleware.runMiddlewaresSync(request, response);

      const { handler, params } = this.router.getRequestHandler(request);
      handler(request, response, params)?.catch((error: any) => Router.errorHandlers.ServerError(request, response, error));
    } catch (error: any) {
      Router.errorHandlers.ServerError(request, response, error);
    }
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

  private onServerClose() {
    Logger.warn('Server is closed');
    process.exit();
  }
}

export default Server;
module.exports = Server;
