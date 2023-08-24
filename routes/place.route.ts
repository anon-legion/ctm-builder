import express from 'express';
import { body } from 'express-validator';
import { postPlace, getPlacesAll, getPlaceById, putPlaceById, deletePlaceById } from '../controllers/place.controller';
import expressValidatorHandler from '../middleware/express-validator-handler';
import baseStrValidation from './utils/base-validation-chain';
import payloadToTitleCase from './utils/normalize-str-payload';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    baseStrValidation('name').isLength({ min: 4, max: 50 }).escape(),
    body('isActive').isBoolean({strict: true}),
    body('aliases').isArray().escape().optional(),
    baseStrValidation('type').isLength({ min: 3}).optional({ nullable: true}).escape(),
    body('coords').isArray({ min: 2, max: 2 }).optional({ nullable: true }),
    payloadToTitleCase(),
    expressValidatorHandler,
    postPlace,
  )
  .get(getPlacesAll)

// prettier-ignore
router.route('/:id')
  .put(
    baseStrValidation('name').isLength({ min: 4}).escape(),
    body('isActive').isBoolean({strict: true}),
    body('aliases').isArray().escape().optional(),
    baseStrValidation('type').isLength({ min: 3}).optional({ nullable: true}).escape(),
    body('coords').isArray({ min: 2, max: 2 }).optional({ nullable: true }),
    payloadToTitleCase(),
    expressValidatorHandler,
    putPlaceById,
  )
  .get(getPlaceById)
  .delete(deletePlaceById)

export default router;
