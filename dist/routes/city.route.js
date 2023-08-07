"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const city_controller_1 = require("../controllers/city.controller");
const bus_route_controller_1 = require("../controllers/bus-route.controller");
const model_id_validation_1 = __importDefault(require("../middleware/model-id-validation"));
const express_validator_handler_1 = __importDefault(require("../middleware/express-validator-handler"));
const base_validation_chain_1 = __importDefault(require("./utils/base-validation-chain"));
const normalize_str_payload_1 = __importDefault(require("./utils/normalize-str-payload"));
const City_1 = __importDefault(require("../models/City"));
// initialize express router
const router = express_1.default.Router();
// prettier-ignore
router.route('/')
    .post((0, base_validation_chain_1.default)('name').isLength({ min: 4, max: 50 }).escape(), (0, express_validator_1.body)('isActive').isBoolean({ strict: true }), (0, normalize_str_payload_1.default)(), express_validator_handler_1.default, city_controller_1.postCity)
    .get(city_controller_1.getCitiesAll);
// prettier-ignore
router.route('/:id')
    .all((0, express_validator_1.param)('id').isMongoId())
    .all((0, model_id_validation_1.default)(City_1.default))
    .put((0, base_validation_chain_1.default)('name').isLength({ min: 4, max: 50 }).escape(), (0, express_validator_1.body)('isActive').isBoolean({ strict: true }), (0, normalize_str_payload_1.default)(), express_validator_handler_1.default, city_controller_1.putCityById)
    .get(city_controller_1.getCityById)
    .delete(city_controller_1.deleteCityById);
// prettier-ignore
router.route('/:id/bus-routes')
    .get((0, model_id_validation_1.default)(City_1.default), bus_route_controller_1.getBusRouteByCityId);
exports.default = router;
