import { body } from 'express-validator';
import { City } from '../../models/types';

const toTitleCase = (text: string) => {
  return text.toLowerCase().replace(/\b./g, (a) => a.toUpperCase());
};

const normalizeCityPayload = () => {
  return body().custom((obj: City) => {
    console.log(obj);
    obj.id = obj.id.toLowerCase();
    obj.name = toTitleCase(obj.name);
    console.log(obj);
    return obj;
  });
};

export default normalizeCityPayload;
