"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const placeSchema = new mongoose_1.Schema({
    cityId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'City',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    aliases: {
        type: [String],
        required: false,
        default: [],
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    },
    type: {
        type: String,
        required: false,
        default: null,
    },
    coords: {
        type: [Number, Number],
        required: false,
        default: null,
    },
});
placeSchema.post('save', function (error, _doc, next) {
    if (error.name === 'MongoError' && error.message.includes('11000')) {
        return next(new Error('City name must be unique'));
    }
    else {
        return next(error);
    }
});
const Place = (0, mongoose_1.model)('Place', placeSchema);
exports.default = Place;
