import express from 'express';
import { postBusRoute, getBusRoutesAll, getBusRouteById, putBusRouteById } from '../controllers/bus-route.controller';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(postBusRoute)
  .get(getBusRoutesAll)

// prettier-ignore
router.route('/:id')
  .get(getBusRouteById)
  .put(putBusRouteById)

export default router;
