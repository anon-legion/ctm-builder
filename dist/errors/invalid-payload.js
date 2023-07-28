"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_api_1 = __importDefault(require("./custom-api"));
class InvalidPayloadError extends custom_api_1.default {
    constructor(message, validationErrors) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.validationErrors = validationErrors;
    }
}
exports.default = InvalidPayloadError;
