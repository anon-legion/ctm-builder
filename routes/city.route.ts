import express from 'express';
import { body } from 'express-validator';
import { postCity, getCitiesAll, getCityById, putCityById, deleteCityById } from '../controllers/city.controller';
import { getBusRouteByCityId } from '../controllers/bus-route.controller';
import { getPlaceByCityId } from '../controllers/place.controller';
// import modelIdValidation from '../middleware/model-id-validation';
import expressValidatorHandler from '../middleware/express-validator-handler';
import baseStrValidation from './utils/base-validation-chain';
import payloadToTitleCase from './utils/normalize-str-payload';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    baseStrValidation('name').isLength({ min: 4, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    payloadToTitleCase(),
    expressValidatorHandler,
    postCity,
  )
  .get(getCitiesAll)

// prettier-ignore
router.route('/:id')
  // .all(modelIdValidation(City))
  .put(
    baseStrValidation('name').isLength({ min: 4, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    payloadToTitleCase(),
    expressValidatorHandler,
    putCityById
  )
  .get(getCityById)
  .delete(deleteCityById)

// prettier-ignore
router.route('/:id/bus-routes')
  .get(getBusRouteByCityId)

// prettier-ignore
router.route('/:id/places')
  .get(getPlaceByCityId)

export default router;
