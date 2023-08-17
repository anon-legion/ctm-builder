"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.Schema({
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
citySchema.post('save', function (error, _doc, next) {
    if (error.name === 'MongoError' && error.message.includes('11000')) {
        return next(new Error('City name must be unique'));
    }
    else {
        return next(error);
    }
});
const City = (0, mongoose_1.model)('City', citySchema);
exports.default = City;
