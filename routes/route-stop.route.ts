import express from 'express';
import {
  getRouteStopsAll,
  postRouteStop,
  getRouteStopById,
  putRouteStopById,
  deleteRouteStopById,
} from '../controllers/route-stop.controller';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(postRouteStop)
  .get(getRouteStopsAll)

// prettier-ignore
router.route('/:id')
  .get(getRouteStopById)
  .put(putRouteStopById)
  .delete(deleteRouteStopById)

export default router;
