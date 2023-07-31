import express from 'express';
import { getRouteStopsAll, postRouteStop } from '../controllers/route-stop.controller';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(postRouteStop)
  .get(getRouteStopsAll)

export default router;
