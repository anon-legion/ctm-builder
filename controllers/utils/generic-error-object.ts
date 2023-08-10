import { Model } from 'mongoose';
import { ICity, IRoute, IPlace, IRouteStop } from '../../models/types';

function genericErrorObject<T extends ICity | IRoute | IPlace | IRouteStop>(message: string, model: Model<T>) {
  const nullModel: T = Object.keys(model.schema.obj).reduce((acc, key) => ({ ...acc, [key]: null }), {} as T);
  return {
    message,
    ...nullModel,
  };
}

export default genericErrorObject;
