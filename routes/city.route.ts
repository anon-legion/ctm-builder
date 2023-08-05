import express from 'express';
import { body } from 'express-validator';
import { postCity, getCitiesAll, getCityById, putCityById, deleteCityById } from '../controllers/city.controller';
import { getBusRouteByCityId } from '../controllers/bus-route.controller';
import baseValidationChain from './utils/base-validation-chain';
import normalizeCityPayload from './utils/normalize-city-payload';
import expressValidatorHandler from '../middleware/express-validator-handler';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
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
  .delete(deleteCityById)

// prettier-ignore
router.route('/:id/bus-routes')
    .get(getBusRouteByCityId)

export default router;
