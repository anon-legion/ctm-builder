"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomApiError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.default = CustomApiError;
