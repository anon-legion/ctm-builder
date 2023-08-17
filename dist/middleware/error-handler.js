"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const index_js_1 = require("../errors/index.js");
// if CustomApiError is thrown, it will assign the statusCode and message to customError object
// and will be caught by this error handler middleware
const errorHandlerMiddleware = (err, _, res, next) => {
    // set default
    const customError = {
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, try again later',
    };
    // error object to be sent as error response
    const errObj = {
        message: customError.message,
    };
    // if error is thrown by express-validator append validationErrors to errorObj
    if (err instanceof index_js_1.InvalidPayloadError) {
        errObj.errors = err.validationErrors;
        customError.statusCode = err.statusCode;
    }
    if (err instanceof index_js_1.InvalidIdError) {
        customError.statusCode = err.statusCode;
        errObj.message = err.message;
    }
    res.status(customError.statusCode).json(errObj);
};
exports.default = errorHandlerMiddleware;
