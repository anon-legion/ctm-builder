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
exports.deleteBusRouteById = exports.putBusRouteById = exports.getBusRoutesByCityId = exports.getBusRouteById = exports.postBusRoute = exports.getBusRoutesAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const Bus_Route_1 = __importDefault(require("../models/Bus-Route"));
const Route_Stop_1 = __importDefault(require("../models/Route-Stop"));
const generic_error_object_1 = __importDefault(require("./utils/generic-error-object"));
function getBusRoutesAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const busRouteQuery = yield Bus_Route_1.default.find({ isActive: true }, ['-__v'])
                .sort({ name: 1 })
                .populate('cityId', 'name');
            res.status(http_status_codes_1.StatusCodes.OK).send([...busRouteQuery]);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send([]);
        }
    });
}
exports.getBusRoutesAll = getBusRoutesAll;
function postBusRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cityId, name, isActive, isSymmetric, hasPath, weight } = req.body;
        try {
            const newBusRoute = yield Bus_Route_1.default.create({ cityId, name, isActive, isSymmetric, hasPath, weight });
            const { _id } = newBusRoute;
            const busRouteQuery = yield Bus_Route_1.default.findById(_id).select('-__v').populate('cityId', 'name');
            if (!busRouteQuery) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send((0, generic_error_object_1.default)('Something went wrong, try again later', Bus_Route_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.CREATED).send(Object.assign({}, busRouteQuery.toObject()));
        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).send((0, generic_error_object_1.default)('Resource already exists', Bus_Route_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', Bus_Route_1.default));
        }
    });
}
exports.postBusRoute = postBusRoute;
function getBusRouteById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const busRouteQuery = yield Bus_Route_1.default.findById(id).select('-__v');
            if (!busRouteQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`Bus route with id "${id}" not found`, Bus_Route_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, busRouteQuery.toObject()));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', Bus_Route_1.default));
        }
    });
}
exports.getBusRouteById = getBusRouteById;
function getBusRoutesByCityId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: cityId } = req.params;
        try {
            const busRouteQuery = yield Bus_Route_1.default.find({ cityId, isActive: true }, ['-__v'])
                .sort({ name: 1 })
                .populate('cityId', 'name');
            res.status(http_status_codes_1.StatusCodes.OK).send([...busRouteQuery]);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send([]);
        }
    });
}
exports.getBusRoutesByCityId = getBusRoutesByCityId;
function putBusRouteById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { cityId, name, isActive, isSymmetric, hasPath, weight } = req.body;
        try {
            const busRouteQuery = yield Bus_Route_1.default.findByIdAndUpdate(id, { cityId, name, isActive, isSymmetric, hasPath, weight }, { new: true })
                .populate('cityId', 'name')
                .select('-__v');
            if (!busRouteQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`Bus route with id "${id} not found`, Bus_Route_1.default));
            }
            if (!isActive) {
                yield Route_Stop_1.default.updateMany({ routeId: id }, { isActive: false });
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, busRouteQuery.toObject()));
        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).send((0, generic_error_object_1.default)('Resource already exists', Bus_Route_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', Bus_Route_1.default));
        }
    });
}
exports.putBusRouteById = putBusRouteById;
function deleteBusRouteById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // const busRouteQuery = await BusRoute.findByIdAndDelete(id).select('-__v');
            const [busRouteQuery, routeStopQuery] = yield Promise.all([
                Bus_Route_1.default.findByIdAndUpdate(id, { isActive: false }, { returnDocument: 'after' }).select('-__v'),
                Route_Stop_1.default.updateMany({ routeId: id }, { isActive: false }),
            ]);
            if (!busRouteQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`Bus route with id "${id}" not found`, Bus_Route_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign(Object.assign({}, busRouteQuery.toObject()), { affectedRoueStops: routeStopQuery.modifiedCount }));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', Bus_Route_1.default));
        }
    });
}
exports.deleteBusRouteById = deleteBusRouteById;
