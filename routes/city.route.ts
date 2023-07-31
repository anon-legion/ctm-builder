import express from 'express';
import { postCity, getCitiesAll, getCityById, putCityById } from '../controllers/city.controller';
// import baseValidationChain from './utils/base-validation-chain';
// import expressValidatorHandler from '../models/express-validator-handler';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(
    // body('id').isString().isLength({ min: 2, max: 9 }).escape(),
    // body('name').isString().isLength({ min: 3, max: 50 }).escape(),
    // body('isActive').isBoolean({strict: true}),
    // expressValidatorHandler,
    postCity,
  )
  .get(
    getCitiesAll,
  )

// prettier-ignore
router.route('/:id')
  .get(getCityById)
  .put(putCityById)

export default router;
