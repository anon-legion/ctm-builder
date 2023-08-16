"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const route_stop_controller_1 = require("../controllers/route-stop.controller");
const express_validator_handler_1 = __importDefault(require("../middleware/express-validator-handler"));
// initialize express router
const router = express_1.default.Router();
// prettier-ignore
router.route('/')
    .post((0, express_validator_1.body)('distance').isNumeric().toFloat(), (0, express_validator_1.body)('isActive').isBoolean({ strict: true }), express_validator_handler_1.default, route_stop_controller_1.postRouteStop)
    .get(route_stop_controller_1.getRouteStopsAll);
// prettier-ignore
router.route('/:id')
    .put((0, express_validator_1.body)('distance').isNumeric().toFloat(), (0, express_validator_1.body)('isActive').isBoolean({ strict: true }), express_validator_handler_1.default, route_stop_controller_1.putRouteStopById)
    .get(route_stop_controller_1.getRouteStopById)
    .delete(route_stop_controller_1.deleteRouteStopById);
exports.default = router;
