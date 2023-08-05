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
const city_db_1 = __importDefault(require("../db/city/city-db"));
function getCitiesAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cityQuery = (yield City_1.default.find({}, ['-__v']).sort({ name: 1 }));
            res.status(http_status_codes_1.StatusCodes.OK).send([...cityQuery]);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.getCitiesAll = getCitiesAll;
function postCity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, isActive } = req.body;
        try {
            const newCity = yield City_1.default.create({ name, isActive: isActive === false ? false : true });
            res.status(http_status_codes_1.StatusCodes.CREATED).send(Object.assign({}, newCity.toObject()));
        }
        catch (err) {
            if (err.code === 11000) {
                res.status(http_status_codes_1.StatusCodes.CONFLICT).send('Resource already exists');
            }
            else {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
            }
        }
    });
}
exports.postCity = postCity;
function getCityById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const index = yield city_db_1.default.getIndex(`/cities`, id);
            if (index === -1) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`City with id "${id}" not found`);
                return;
            }
            const cityData = (yield city_db_1.default.getData(`/cities[${index}]`));
            res.status(http_status_codes_1.StatusCodes.OK).send(Object.assign({}, cityData));
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.getCityById = getCityById;
function putCityById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, isActive } = req.body;
            const index = yield city_db_1.default.getIndex(`/cities`, id);
            if (index === -1) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`City with id "${id}" not found`);
                return;
            }
            yield city_db_1.default.push(`/cities[${index}]`, {
                id,
                name,
                isActive: isActive === false ? false : true,
            });
            const updatedCityData = yield city_db_1.default.getData(`/cities[${index}]`);
            res.status(http_status_codes_1.StatusCodes.OK).send({ updatedCityData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
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
            res.status(http_status_codes_1.StatusCodes.OK).send(`City with id "${id}" deleted`);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.deleteCityById = deleteCityById;
