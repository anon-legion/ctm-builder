"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
const RouteStop = (0, mongoose_1.model)('Route-Stop', routeStopSchema);
exports.default = RouteStop;
