import { body } from 'express-validator';

const baseValidationChain = (field: string) => {
  return body(field).trim().notEmpty();
};

export default baseValidationChain;
