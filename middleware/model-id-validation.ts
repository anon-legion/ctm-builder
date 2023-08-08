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
        const nullModel: T = Object.keys(model.schema.obj).reduce((acc, key) => ({ ...acc, [key]: null }), {} as T);
        return res.status(StatusCodes.NOT_FOUND).send({ message: `document with id "${id}" not found`, ...nullModel });
      }

      next();
    } catch (err) {
      const nullModel: T = Object.keys(model.schema.obj).reduce((acc, key) => ({ ...acc, [key]: null }), {} as T);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Server error', ...nullModel });
    }
  };
}

export default modelIdValidation;
