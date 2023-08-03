"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const citySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
});
citySchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.message.includes('11000')) {
        next(new Error('City name must be unique'));
    }
    else {
        next(error);
    }
});
const City = mongoose_1.default.model('City', citySchema);
exports.default = City;
