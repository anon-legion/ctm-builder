"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
// catch all invalid route handler
const notFound = (_, res) => res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({ message: 'Route does not exist' });
exports.default = notFound;
