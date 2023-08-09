"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const place_controller_1 = require("../controllers/place.controller");
// initialize express router
const router = express_1.default.Router();
// prettier-ignore
router.route('/')
    .post(place_controller_1.postPlace)
    .get(place_controller_1.getPlacesAll);
// prettier-ignore
router.route('/:id')
    .get(place_controller_1.getPlaceById)
    .put(place_controller_1.putPlaceById)
    .delete(place_controller_1.deletePlaceById);
exports.default = router;
