"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const place_controller_1 = require("../controllers/place.controller");
const express_validator_handler_1 = __importDefault(require("../middleware/express-validator-handler"));
const base_validation_chain_1 = __importDefault(require("./utils/base-validation-chain"));
const normalize_str_payload_1 = __importDefault(require("./utils/normalize-str-payload"));
// initialize express router
const router = express_1.default.Router();
// prettier-ignore
router.route('/')
    .post((0, base_validation_chain_1.default)('name').isLength({ min: 4, max: 50 }).escape(), (0, express_validator_1.body)('isActive').isBoolean({ strict: true }), (0, express_validator_1.body)('aliases').isArray().escape().optional(), (0, normalize_str_payload_1.default)(), express_validator_handler_1.default, place_controller_1.postPlace)
    .get(place_controller_1.getPlacesAll);
// prettier-ignore
router.route('/:id')
    .put((0, base_validation_chain_1.default)('name').isLength({ min: 4 }).escape(), (0, express_validator_1.body)('isActive').isBoolean({ strict: true }), (0, express_validator_1.body)('aliases').isArray().escape().optional(), (0, normalize_str_payload_1.default)(), express_validator_handler_1.default, place_controller_1.putPlaceById)
    .get(place_controller_1.getPlaceById)
    .delete(place_controller_1.deletePlaceById);
exports.default = router;
