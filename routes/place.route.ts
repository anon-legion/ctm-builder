import express from 'express';
import { postPlace, getPlacesAll, getPlaceById, putPlaceById, deletePlaceById } from '../controllers/place.controller';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(postPlace)
  .get(getPlacesAll)

// prettier-ignore
router.route('/:id')
  .get(getPlaceById)
  .put(putPlaceById)
  .delete(deletePlaceById)

export default router;
