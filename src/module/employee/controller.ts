import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../interfaces/controller';
import EmployeeService from './services/employee-service';

export default class EmployeeController implements Controller {
  path: string;
  router: Router = Router();
  constructor() {
    this.path = '/employee';
    this.initializeRouter();
  }

  protected initializeRouter() {
    this.router.get('/', this.getAll);
  }

  protected getAll(request: Request, response: Response, next: NextFunction) {
    const employeeService = new EmployeeService();
    try {
      employeeService.findAll().then((employeeList) => {
        response.status(200).json(employeeList);
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: 'something went wrong!',
      });
    }
  }
}

