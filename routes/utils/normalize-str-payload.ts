import { body } from 'express-validator';
import { ICity, IRoute } from '../../models/types';

const toTitleCase = (text: string) => {
  return text.toLowerCase().replace(/\d+[A-Za-z]|\b[a-z]/g, (a) => a.toUpperCase());
};

function payloadToTitleCase<T extends ICity | IRoute>() {
  return body().custom((obj: T) => {
    obj.name = toTitleCase(obj.name);
    return obj;
  });
}

export default payloadToTitleCase;
