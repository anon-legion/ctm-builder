import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import InvalidPayloadError from '../errors/invalid-payload';

function expressValidatorHandler(req: Request, _: Response, next: NextFunction) {
  const result = validationResult(req).array();
  // validation error guard clause
  if (result.length) throw new InvalidPayloadError('Invalid payload', result);

  // if no validation errors, proceed to controller or next middleware
  next();
}

export default expressValidatorHandler;
