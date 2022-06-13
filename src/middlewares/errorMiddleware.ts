import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/httpException';

const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong!';
  response.status(statusCode).json({
    message,
    statusCode,
  });
};

export default errorMiddleware;

