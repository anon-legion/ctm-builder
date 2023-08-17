"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const routeSchema = new mongoose_1.Schema({
    cityId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'City',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
});
routeSchema.post('save', function (error, _doc, next) {
    if (error.name === 'MongoError' && error.message.includes('11000')) {
        return next(new Error('City name must be unique'));
    }
    else {
        return next(error);
    }
});
const BusRoute = (0, mongoose_1.model)('Bus-Route', routeSchema);
exports.default = BusRoute;
