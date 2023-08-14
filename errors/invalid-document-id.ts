import { StatusCodes } from 'http-status-codes';
import CustomApiError from './custom-api';

class InvalidDocumentIdError extends CustomApiError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default InvalidDocumentIdError;
