import { body } from 'express-validator';

const baseStrValidation = (field: string) => {
  return body(field).trim().notEmpty().isString();
};

export default baseStrValidation;
