"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const city_controller_1 = require("../controllers/city.controller");
// import baseValidationChain from './utils/base-validation-chain';
// import expressValidatorHandler from '../middleware/express-validator-handler';
// initialize express router
const router = express_1.default.Router();
// prettier-ignore
router.route('/')
    .post(
// body('id').isString().isLength({ min: 2, max: 9 }).escape(),
// body('name').isString().isLength({ min: 3, max: 50 }).escape(),
// body('isActive').isBoolean({strict: true}),
// expressValidatorHandler,
city_controller_1.postCity)
    .get(city_controller_1.getCitiesAll);
// prettier-ignore
router.route('/:id')
    .get(city_controller_1.getCityById)
    .put(city_controller_1.putCityById);
exports.default = router;
