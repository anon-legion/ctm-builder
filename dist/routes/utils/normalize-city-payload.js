"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const toTitleCase = (text) => {
    return text.toLowerCase().replace(/\b./g, (a) => a.toUpperCase());
};
const normalizeCityPayload = () => {
    return (0, express_validator_1.body)().custom((obj) => {
        console.log(obj);
        obj.id = obj.id.toLowerCase();
        obj.name = toTitleCase(obj.name);
        console.log(obj);
        return obj;
    });
};
exports.default = normalizeCityPayload;
