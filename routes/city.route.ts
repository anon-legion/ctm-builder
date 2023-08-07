import express from 'express';
import { body, param } from 'express-validator';
import { postCity, getCitiesAll, getCityById, putCityById, deleteCityById } from '../controllers/city.controller';
import { getBusRouteByCityId } from '../controllers/bus-route.controller';
import modelIdValidation from '../middleware/model-id-validation';
import expressValidatorHandler from '../middleware/express-validator-handler';
import baseValidationChain from './utils/base-validation-chain';
import payloadToTitleCase from './utils/normalize-city-payload';
import City from '../models/City';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    baseValidationChain('name').isString().isLength({ min: 4, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    payloadToTitleCase(),
    expressValidatorHandler,
    postCity,
  )
  .get(getCitiesAll)

// prettier-ignore
router.route('/:id')
  .all(param('id').isMongoId())
  .all(modelIdValidation(City))
  .get(getCityById)
  .put(putCityById)
  .delete(deleteCityById)

// prettier-ignore
router.route('/:id/bus-routes')
    .get(modelIdValidation(City), getBusRouteByCityId)

export default router;
