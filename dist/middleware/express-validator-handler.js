"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const index_js_1 = require("../errors/index.js");
function expressValidatorHandler(req, _res, next) {
    const result = (0, express_validator_1.validationResult)(req).array();
    // validation error guard clause
    if (result.length)
        throw new index_js_1.InvalidPayloadError('Invalid payload', result);
    // if no validation errors, proceed to controller or next middleware
    next();
}
exports.default = expressValidatorHandler;
