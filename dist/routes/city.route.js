"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const city_controller_1 = require("../controllers/city.controller");
// initialize express router
const router = express_1.default.Router();
// prettier-ignore
router.route('/')
    .post(city_controller_1.postCity);
exports.default = router;
