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
exports.deleteCityById = exports.putCityById = exports.getCityById = exports.postCity = exports.getCitiesAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const City_1 = __importDefault(require("../models/City"));
const generic_error_object_1 = __importDefault(require("./utils/generic-error-object"));
function getCitiesAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cityQuery = yield City_1.default.find({}, ['-__v']).sort({ name: 1 });
            res.status(http_status_codes_1.StatusCodes.OK).send([...cityQuery]);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send([]);
        }
    });
}
exports.getCitiesAll = getCitiesAll;
function postCity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, isActive } = req.body;
        try {
            const cityQuery = yield City_1.default.create({ name, isActive });
            res.status(http_status_codes_1.StatusCodes.CREATED).send(Object.assign({}, cityQuery.toObject()));
        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).send((0, generic_error_object_1.default)('Resource already exists', City_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', City_1.default));
        }
    });
}
exports.postCity = postCity;
function getCityById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const cityQuery = yield City_1.default.findById(id);
            if (!cityQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`City with id "${id}" not found`, City_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, cityQuery.toObject()));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', City_1.default));
        }
    });
}
exports.getCityById = getCityById;
function putCityById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, isActive } = req.body;
        try {
            const cityQuery = yield City_1.default.findByIdAndUpdate(id, { name, isActive }, { new: true });
            if (!cityQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`City with id "${id}" not found`, City_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, cityQuery.toObject()));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', City_1.default));
        }
    });
}
exports.putCityById = putCityById;
function deleteCityById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const cityQuery = yield City_1.default.findByIdAndDelete(id).select('-__v');
            if (!cityQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send((0, generic_error_object_1.default)(`City with id "${id}" not found`, City_1.default));
            }
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, cityQuery.toObject()));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send((0, generic_error_object_1.default)('Internal server error', City_1.default));
        }
    });
}
exports.deleteCityById = deleteCityById;
