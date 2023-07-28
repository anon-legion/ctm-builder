"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const invalid_payload_1 = __importDefault(require("../errors/invalid-payload"));
function expressValidatorHandler(req, _, next) {
    const result = (0, express_validator_1.validationResult)(req).array();
    // validation error guard clause
    if (result.length)
        throw new invalid_payload_1.default('Invalid payload', result);
    // if no validation errors, proceed to controller or next middleware
    next();
}
exports.default = expressValidatorHandler;
