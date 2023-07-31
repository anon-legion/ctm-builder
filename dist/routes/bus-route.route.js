"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bus_route_controller_1 = require("../controllers/bus-route.controller");
// initialize express router
const router = express_1.default.Router();
// prettier-ignore
router.route('/')
    .post(bus_route_controller_1.postBusRoute)
    .get(bus_route_controller_1.getBusRoutesAll);
// prettier-ignore
router.route('/:id')
    .get(bus_route_controller_1.getBusRouteById)
    .put(bus_route_controller_1.putBusRouteById);
exports.default = router;
