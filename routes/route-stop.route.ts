import express from 'express';
import { body } from 'express-validator';
import {
  getRouteStopsAll,
  postRouteStop,
  getRouteStopById,
  putRouteStopById,
  deleteRouteStopById,
} from '../controllers/route-stop.controller';
import expressValidatorHandler from '../middleware/express-validator-handler';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    body('distance').isNumeric().toFloat(),
    body('isActive').isBoolean({strict: true}),
    expressValidatorHandler,
    postRouteStop,
  )
  .get(getRouteStopsAll)

// prettier-ignore
router.route('/:id')
  .put(
    body('distance').isNumeric().toFloat(),
    body('isActive').isBoolean({strict: true}),
    expressValidatorHandler,
    putRouteStopById,
  )
  .get(getRouteStopById)
  .delete(deleteRouteStopById)

export default router;
