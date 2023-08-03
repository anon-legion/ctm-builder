import { body } from 'express-validator';
import { City } from '../../models/types';

const toTitleCase = (text: string) => {
  return text.toLowerCase().replace(/\b./g, (a) => a.toUpperCase());
};

const normalizeCityPayload = () => {
  return body().custom((obj: City) => {
    obj.name = toTitleCase(obj.name);
    return obj;
  });
};

export default normalizeCityPayload;
