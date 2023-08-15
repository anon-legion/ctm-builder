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
exports.deleteRouteStopById = exports.getRouteStopsByRouteId = exports.putRouteStopById = exports.getRouteStopById = exports.postRouteStop = exports.getRouteStopsAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const Route_Stop_1 = __importDefault(require("../models/Route-Stop"));
const generic_error_object_1 = __importDefault(require("./utils/generic-error-object"));
const errors_1 = require("../errors");
function getRouteStopsAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routeStopQuery = yield Route_Stop_1.default.find({}, ['-__v'])
                .sort({ name: 1 })
                .populate({ path: 'placeId', select: 'name', populate: { path: 'cityId', select: 'name' } });
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
            const { _id } = newRouteStop;
            const routeStopQuery = yield Route_Stop_1.default.findById(_id, ['-__v']).populate({
                path: 'placeId',
                select: 'name',
                populate: { path: 'cityId', select: 'name' },
            });
            if (!routeStopQuery) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send((0, generic_error_object_1.default)('Something went wrong, try again later', Route_Stop_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.CREATED).send(Object.assign({}, routeStopQuery.toObject()));
        }
        catch (err) {
            if (err instanceof errors_1.InvalidDocumentIdError) {
                return res.status(err.statusCode).send((0, generic_error_object_1.default)(`${err.message}`, Route_Stop_1.default));
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
            const routeStopQuery = yield Route_Stop_1.default.findById(id, ['-__v']).populate({
                path: 'placeId',
                select: 'name',
                populate: { path: 'cityId', select: 'name' },
            });
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
            const routeStopQuery = yield Route_Stop_1.default.findByIdAndUpdate(id, { routeId, placeId, distance, isActive }, { new: true })
                .select('-__v')
                .populate({ path: 'placeId', select: 'name', populate: { path: 'cityId', select: 'name' } });
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
function getRouteStopsByRouteId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const routeStopQuery = yield Route_Stop_1.default.find({ routeId: id }, ['-__v'])
                .sort({ distance: 1 })
                .populate({ path: 'placeId', select: 'name', populate: { path: 'cityId', select: 'name' } });
            res.status(http_status_codes_1.StatusCodes.OK).send([...routeStopQuery]);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send([]);
        }
    });
}
exports.getRouteStopsByRouteId = getRouteStopsByRouteId;
function deleteRouteStopById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const routeStopQuery = yield Route_Stop_1.default.findByIdAndDelete(id)
                .select('-__v')
                .populate({ path: 'placeId', select: 'name', populate: { path: 'cityId', select: 'name' } });
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
exports.deleteRouteStopById = deleteRouteStopById;
