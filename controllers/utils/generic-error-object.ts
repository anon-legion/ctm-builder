import { Model } from 'mongoose';
import { ICity, IRoute } from '../../models/types';

function genericErrorObject<T extends ICity | IRoute>(message: string, model: Model<T>) {
  const nullModel: T = Object.keys(model.schema.obj).reduce((acc, key) => ({ ...acc, [key]: null }), {} as T);
  return {
    message,
    ...nullModel,
  };
}

export default genericErrorObject;
