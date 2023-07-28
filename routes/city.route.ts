import express from 'express';
import { postCity } from '../controllers/city.controller';

// initialize express router
const router = express.Router();

// prettier-ignore
router.route('/')
  .post(postCity);

export default router;
