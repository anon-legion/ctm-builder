import express from 'express';
import { body, param } from 'express-validator';
import {
  postBusRoute,
  getBusRoutesAll,
  getBusRouteById,
  putBusRouteById,
  deleteBusRouteById,
} from '../controllers/bus-route.controller';
import expressValidatorHandler from '../middleware/express-validator-handler';
import modelIdValidation from '../middleware/model-id-validation';
import baseStrValidation from './utils/base-validation-chain';
import payloadToTitleCase from './utils/normalize-str-payload';
import BusRoute from '../models/Bus-Route';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    baseStrValidation('name').isLength({ min: 3, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    payloadToTitleCase(),
    expressValidatorHandler,
    postBusRoute
  )
  .get(getBusRoutesAll)

// prettier-ignore
router.route('/:id')
  .all(param('id').isMongoId())
  .all(modelIdValidation(BusRoute))
  .put(
    baseStrValidation('name').isLength({ min: 4, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    payloadToTitleCase(),
    expressValidatorHandler,
    putBusRouteById
  )
  .get(getBusRouteById)
  .delete(deleteBusRouteById)

export default router;
