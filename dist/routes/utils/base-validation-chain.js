"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const baseValidationChain = (field) => {
    return (0, express_validator_1.body)(field).trim().notEmpty();
};
exports.default = baseValidationChain;
