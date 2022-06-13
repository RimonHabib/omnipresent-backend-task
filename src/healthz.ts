import { Router } from 'express';
import Controller from './interfaces/controller';

export default class HealthController implements Controller {
  public path: string = '/healthz';
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get('/', (request, response) => {
      response.status(200).json({
        health: 'ok',
      });
    });
  }
}

