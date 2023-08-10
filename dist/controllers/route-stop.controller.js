"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRouteStopById = exports.getRouteStopById = exports.postRouteStop = exports.getRouteStopsAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const Route_Stop_1 = __importDefault(require("../models/Route-Stop"));
const generic_error_object_1 = __importDefault(require("./utils/generic-error-object"));
function getRouteStopsAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routeStopQuery = yield Route_Stop_1.default.find({}, ['-__v']).sort({ name: 1 });
            res.status(http_status_codes_1.StatusCodes.OK).send([...routeStopQuery]);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send([]);
        }
    });
}
exports.getRouteStopsAll = getRouteStopsAll;
function postRouteStop(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { routeId, placeId, distance, isActive } = req.body;
        try {
            const newRouteStop = yield Route_Stop_1.default.create({ routeId, placeId, distance, isActive });
            res.status(http_status_codes_1.StatusCodes.CREATED).send(Object.assign({}, newRouteStop.toObject()));
        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).send((0, generic_error_object_1.default)('Resource already exists', Route_Stop_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', Route_Stop_1.default));
        }
    });
}
exports.postRouteStop = postRouteStop;
function getRouteStopById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const routeStopQuery = yield Route_Stop_1.default.findById(id, ['-__v']);
            if (!routeStopQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`Route stop with id "${id}" not found`, Route_Stop_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, routeStopQuery.toObject()));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal Server Error', Route_Stop_1.default));
        }
    });
}
exports.getRouteStopById = getRouteStopById;
function putRouteStopById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { routeId, placeId, distance, isActive } = req.body;
        try {
            const routeStopQuery = yield Route_Stop_1.default.findByIdAndUpdate(id, { routeId, placeId, distance, isActive }, { new: true }).select('-__v');
            if (!routeStopQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`Route stop with id "${id}" not found`, Route_Stop_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, routeStopQuery.toObject()));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal Server Error', Route_Stop_1.default));
        }
    });
}
exports.putRouteStopById = putRouteStopById;
