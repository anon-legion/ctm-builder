import express from 'express';
import { body, param } from 'express-validator';
import {
  postBusRoute,
  getBusRoutesAll,
  getBusRouteById,
  putBusRouteById,
  deleteCityById,
} from '../controllers/bus-route.controller';
import expressValidatorHandler from '../middleware/express-validator-handler';
import modelIdValidation from '../middleware/model-id-validation';
import baseValidationChain from './utils/base-validation-chain';
import BusRoute from '../models/Bus-Route';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    baseValidationChain('name').isLength({ min: 3, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    expressValidatorHandler,
    postBusRoute
  )
  .get(getBusRoutesAll)

// prettier-ignore
router.route('/:id')
  .all(param('id').isMongoId())
  .all(modelIdValidation(BusRoute))
  .get(getBusRouteById)
  .put(putBusRouteById)
  .delete(deleteCityById)

export default router;
