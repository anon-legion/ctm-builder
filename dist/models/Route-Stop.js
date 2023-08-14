"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Bus_Route_1 = __importDefault(require("./Bus-Route"));
const Place_1 = __importDefault(require("./Place"));
const errors_1 = require("../errors");
const routeStopSchema = new mongoose_1.Schema({
    routeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Bus-Route',
        required: true,
    },
    placeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    distance: {
        type: Number,
        required: true,
        default: 0,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
});
// add model pre hook to check if routeId and placeId are valid
routeStopSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [busRoute, place] = yield Promise.all([Bus_Route_1.default.findById(this.routeId), Place_1.default.findById(this.placeId)]);
            if (!busRoute || !place) {
                throw new errors_1.InvalidDocumentIdError('Invalid routeId or placeId');
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
const RouteStop = (0, mongoose_1.model)('Route-Stop', routeStopSchema);
exports.default = RouteStop;
