"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const toTitleCase = (text) => {
    return text.toLowerCase().replace(/\b./g, (a) => a.toUpperCase());
};
const normalizeCityPayload = () => {
    return (0, express_validator_1.body)().custom((obj) => {
        obj.name = toTitleCase(obj.name);
        return obj;
    });
};
exports.default = normalizeCityPayload;
