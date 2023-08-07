import express from 'express';
import { body } from 'express-validator';
import { postBusRoute, getBusRoutesAll, getBusRouteById, putBusRouteById } from '../controllers/bus-route.controller';
import baseValidationChain from './utils/base-validation-chain';
import expressValidatorHandler from '../middleware/express-validator-handler';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    baseValidationChain('name').isString().isLength({ min: 3, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    expressValidatorHandler,
    postBusRoute
  )
  .get(getBusRoutesAll)

// prettier-ignore
router.route('/:id')
  .get(getBusRouteById)
  .put(putBusRouteById)

export default router;
