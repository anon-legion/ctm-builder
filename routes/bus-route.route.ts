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
// import modelIdValidation from '../middleware/model-id-validation';
import baseStrValidation from './utils/base-validation-chain';
import payloadToTitleCase from './utils/normalize-str-payload';
import { getRouteStopsByRouteId } from '../controllers/route-stop.controller';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    baseStrValidation('name').isLength({ min: 3, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    body('isSymmetric').isBoolean({strict: true}),
    body('hasPath').isBoolean({strict: true}),
    body('weight').isNumeric().optional({ nullable: true }),
    payloadToTitleCase(),
    expressValidatorHandler,
    postBusRoute
  )
  .get(getBusRoutesAll)

// prettier-ignore
router.route('/:id')
  .put(
    baseStrValidation('name').isLength({ min: 3, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    body('isSymmetric').isBoolean({strict: true}),
    body('hasPath').isBoolean({strict: true}),
    body('weight').isNumeric().optional(),
    payloadToTitleCase(),
    expressValidatorHandler,
    putBusRouteById
  )
  .get(getBusRouteById)
  .delete(deleteBusRouteById)

// prettier-ignore
router.route('/:id/stops')
    .get(getRouteStopsByRouteId)

export default router;
