import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InvalidPayloadError, InvalidIdError } from '../errors/index.js';

interface CustomError {
  statusCode: number;
  message: string;
}

interface ErrorResponse {
  message: string;
  errors?: any;
}

// if CustomApiError is thrown, it will assign the statusCode and message to customError object
// and will be caught by this error handler middleware
const errorHandlerMiddleware = (err: Error, _: Request, res: Response, next: NextFunction) => {
  // set default
  const customError: CustomError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, try again later',
  };

  // error object to be sent as error response
  const errObj: ErrorResponse = {
    message: customError.message,
  };

  // if error is thrown by express-validator append validationErrors to errorObj
  if (err instanceof InvalidPayloadError) {
    errObj.errors = err.validationErrors;
    customError.statusCode = err.statusCode;
  }

  if (err instanceof InvalidIdError) {
    customError.statusCode = err.statusCode;
    errObj.message = err.message;
  }

  res.status(customError.statusCode).json(errObj);
};

export default errorHandlerMiddleware;
