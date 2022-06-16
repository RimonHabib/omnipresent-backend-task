import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import Controller from './interfaces/controller';
import errorMiddleware from './middlewares/errorMiddleware';
import HttpException from './exceptions/httpException';

// Warp the app
class App {
  public server: express.Application;

  // Initiazation sequence
  constructor(controller: Controller[]) {
    this.server = express();

    this.initializeMiddlewares();
    this.exposeRootEndPoint();
    this.initializeControllers(controller);
    this.initializeErrorhandler();
  }

  protected initializeMiddlewares() {
    // set helment to secure HTTP headers
    this.server.use(helmet());

    // sanitize request data
    this.server.use(xss());

    // enable cors, accepting request from all origin
    this.server.use(cors());
    this.server.options('*', cors());

    // parse json request body
    this.server.use(express.json());
  }

  private exposeRootEndPoint() {
    this.server.get('/', () => {
      throw new HttpException(418, "I'm a teapot!");
    });
  }

  protected initializeControllers(controllers: Controller[]) {
    if (controllers) {
      controllers.forEach((cantroller) => {
        this.server.use(cantroller.path, cantroller.router);
      });
    }
  }

  protected initializeErrorhandler() {
    this.server.use(errorMiddleware);
  }

  public getServer() {
    return this.server;
  }

  public listen(port: number) {
    return this.server.listen(port);
  }
}

// export app instance
export default App;

