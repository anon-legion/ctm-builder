import { StatusCodes } from 'http-status-codes';
import CustomApiError from './custom-api';

class InvalidIdError extends CustomApiError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default InvalidIdError;
