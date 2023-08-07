import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { ICity, IRoute } from '../models/types';

export function modelIdValidation<T extends ICity | IRoute>(model: Model<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const doc = await model.findById(id);

      if (!doc) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `document with id "${id}" not found` });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
  };
}

export default modelIdValidation;
