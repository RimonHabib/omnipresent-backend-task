import { NextFunction, Request, Response, Router } from 'express';
import { CountryService } from '../../services/country/country-service';
import { Http } from '../../services/http/http';
import Controller from '../../interfaces/controller';
import EmployeeService from './employee-service';

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

  protected async getAll(request: Request, response: Response, next: NextFunction) {
    const employeeService = new EmployeeService(new CountryService(new Http()));
    try {
      const employeeList = await employeeService.findAll();

      response.status(200).json(employeeList);
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: 'something went wrong!',
      });
    }
  }
}

