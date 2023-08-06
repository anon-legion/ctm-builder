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
function getCitiesAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cityQuery = (yield City_1.default.find({}, ['-__v']).sort({ name: 1 }));
            return res.status(http_status_codes_1.StatusCodes.OK).send([...cityQuery]);
        }
        catch (err) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.getCitiesAll = getCitiesAll;
function postCity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, isActive } = req.body;
        try {
            const cityQuery = yield City_1.default.create({ name, isActive });
            return res.status(http_status_codes_1.StatusCodes.CREATED).send(Object.assign({}, cityQuery.toObject()));
        }
        catch (err) {
            if (err.code === 11000) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).send({ message: 'Resource already exists' });
            }
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
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
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({ message: `City with id "${id}" not found` });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, cityQuery.toObject()));
        }
        catch (err) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
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
            console.log(cityQuery);
            if (!cityQuery) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({ message: `City with id "${id}" not found` });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, cityQuery.toObject()));
        }
        catch (err) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.putCityById = putCityById;
function deleteCityById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const cityQuery = yield City_1.default.findByIdAndDelete(id);
            console.log(cityQuery);
            return res.status(http_status_codes_1.StatusCodes.OK).send({ message: `City with id "${id}" deleted` });
        }
        catch (err) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.deleteCityById = deleteCityById;
