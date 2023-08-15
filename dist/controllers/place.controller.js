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
exports.getPlaceByCityId = exports.deletePlaceById = exports.putPlaceById = exports.getPlaceById = exports.postPlace = exports.getPlacesAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const Place_1 = __importDefault(require("../models/Place"));
const generic_error_object_1 = __importDefault(require("./utils/generic-error-object"));
function getPlacesAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placeQuery = yield Place_1.default.find({}, ['-__v']).sort({ name: 1 }).populate('cityId', 'name');
            res.status(http_status_codes_1.StatusCodes.OK).send([...placeQuery]);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send([]);
        }
    });
}
exports.getPlacesAll = getPlacesAll;
function postPlace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cityId, name, aliases, isActive } = req.body;
        try {
            const newPlace = yield (yield Place_1.default.create({ cityId, name, aliases, isActive })).populate('cityId', 'name');
            res.status(http_status_codes_1.StatusCodes.CREATED).send(Object.assign({}, newPlace.toObject()));
        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).send((0, generic_error_object_1.default)('Resource already exists', Place_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', Place_1.default));
        }
    });
}
exports.postPlace = postPlace;
function getPlaceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const placeQuery = yield Place_1.default.findById(id).select('-__v');
            if (!placeQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`Place with id "${id}" not found`, Place_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, placeQuery.toObject()));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', Place_1.default));
        }
    });
}
exports.getPlaceById = getPlaceById;
function putPlaceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { cityId, name, aliases, isActive } = req.body;
        try {
            const placeQuery = yield Place_1.default.findByIdAndUpdate(id, { cityId, name, aliases, isActive }, { new: true })
                .populate('cityId', 'name')
                .select('-__v');
            if (!placeQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`Place with id "${id}" not found`, Place_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, placeQuery.toObject()));
        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).send((0, generic_error_object_1.default)('Resource already exists', Place_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', Place_1.default));
        }
    });
}
exports.putPlaceById = putPlaceById;
function deletePlaceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const placeQuery = yield Place_1.default.findByIdAndDelete(id).select('-__v');
            if (!placeQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`Place with id "${id}" not found`, Place_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, placeQuery.toObject()));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', Place_1.default));
        }
    });
}
exports.deletePlaceById = deletePlaceById;
function getPlaceByCityId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: cityId } = req.params;
        try {
            const placeQuery = yield Place_1.default.find({ cityId }).select('-__v').sort({ name: 1 }).populate('cityId', 'name');
            res.status(http_status_codes_1.StatusCodes.OK).send([...placeQuery]);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send([]);
        }
    });
}
exports.getPlaceByCityId = getPlaceByCityId;
