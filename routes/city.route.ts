import express from 'express';
import { body } from 'express-validator';
import { postCity, getCitiesAll, getCityById, putCityById } from '../controllers/city.controller';
import baseValidationChain from './utils/base-validation-chain';
import normalizeCityPayload from './utils/normalize-city-payload';
import expressValidatorHandler from '../middleware/express-validator-handler';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    baseValidationChain('id').isString().isLength({ min: 3, max: 5 }).escape(),
    baseValidationChain('name').isString().isLength({ min: 4, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    normalizeCityPayload(),
    expressValidatorHandler,
    postCity,
  )
  .get(
    getCitiesAll,
  )

// prettier-ignore
router.route('/:id')
  .get(getCityById)
  .put(putCityById)

export default router;
