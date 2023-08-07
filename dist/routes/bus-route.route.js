"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bus_route_controller_1 = require("../controllers/bus-route.controller");
const express_validator_handler_1 = __importDefault(require("../middleware/express-validator-handler"));
const model_id_validation_1 = __importDefault(require("../middleware/model-id-validation"));
const base_validation_chain_1 = __importDefault(require("./utils/base-validation-chain"));
const normalize_str_payload_1 = __importDefault(require("./utils/normalize-str-payload"));
const Bus_Route_1 = __importDefault(require("../models/Bus-Route"));
// initialize express router
const router = express_1.default.Router();
// prettier-ignore
router.route('/')
    .post((0, base_validation_chain_1.default)('name').isLength({ min: 3, max: 50 }).escape(), (0, express_validator_1.body)('isActive').isBoolean({ strict: true }), (0, normalize_str_payload_1.default)(), express_validator_handler_1.default, bus_route_controller_1.postBusRoute)
    .get(bus_route_controller_1.getBusRoutesAll);
// prettier-ignore
router.route('/:id')
    .all((0, express_validator_1.param)('id').isMongoId())
    .all((0, model_id_validation_1.default)(Bus_Route_1.default))
    .put((0, base_validation_chain_1.default)('name').isLength({ min: 4, max: 50 }).escape(), (0, express_validator_1.body)('isActive').isBoolean({ strict: true }), (0, normalize_str_payload_1.default)(), express_validator_handler_1.default, bus_route_controller_1.putBusRouteById)
    .get(bus_route_controller_1.getBusRouteById)
    .delete(bus_route_controller_1.deleteCityById);
exports.default = router;
