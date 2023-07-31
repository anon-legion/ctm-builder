import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// catch all invalid route handler
const notFound = (_: Request, res: Response) =>
  res.status(StatusCodes.NOT_FOUND).send({ message: 'Route does not exist' });

export default notFound;
