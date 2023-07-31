import express from 'express';
import { postPlace, getPlacesAll, getPlaceById, putPlaceById } from '../controllers/place.controller';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(postPlace)
  .get(getPlacesAll)

// prettier-ignore
router.route('/:id')
  .get(getPlaceById)
  .put(putPlaceById);

export default router;
