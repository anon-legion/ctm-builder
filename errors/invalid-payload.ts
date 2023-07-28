import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'express-validator';
import CustomApiError from './custom-api';

class InvalidPayloadError extends CustomApiError {
  statusCode: StatusCodes;
  validationErrors: ValidationError[];
  constructor(message: string, validationErrors: ValidationError[]) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.validationErrors = validationErrors;
  }
}

export default InvalidPayloadError;
