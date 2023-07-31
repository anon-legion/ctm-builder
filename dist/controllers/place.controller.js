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
exports.putPlaceById = exports.getPlaceById = exports.postPlace = exports.getPlacesAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const place_db_1 = __importDefault(require("../db/place/place-db"));
function getPlacesAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placeData = (yield place_db_1.default.getData('/places'));
            res.status(http_status_codes_1.StatusCodes.OK).send({ placeData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.getPlacesAll = getPlacesAll;
function postPlace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cityId, name, aliases, isActive } = req.body;
        console.log(`isActive: ${isActive}\n ${typeof isActive}`);
        const placeCount = yield place_db_1.default.count('/places');
        const id = Number(placeCount) + 1;
        try {
            yield place_db_1.default.push(`/places[]`, { id, cityId, name, aliases, isActive: isActive === false ? false : true });
            res
                .status(http_status_codes_1.StatusCodes.CREATED)
                .send(`postPlace: ${id}, ${cityId}, ${name}, ${aliases}, ${isActive === false ? false : true}`);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.postPlace = postPlace;
function getPlaceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const index = yield place_db_1.default.getIndex(`/places`, Number(id));
            if (index === -1) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`Place with id "${id}" not found`);
                return;
            }
            const placeData = (yield place_db_1.default.getData(`/places[${index}]`));
            res.status(http_status_codes_1.StatusCodes.OK).send({ placeData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.getPlaceById = getPlaceById;
function putPlaceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const { cityId, name, aliases, isActive } = req.body;
            const index = yield place_db_1.default.getIndex(`/places`, id);
            if (index === -1) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`Place with id "${id}" not found`);
                return;
            }
            yield place_db_1.default.push(`/places[${index}]`, {
                id,
                cityId,
                name,
                aliases,
                isActive: isActive === false ? false : true,
            });
            const updatedPlaceData = yield place_db_1.default.getData(`/places[${index}]`);
            res.status(http_status_codes_1.StatusCodes.OK).send({ updatedPlaceData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.putPlaceById = putPlaceById;
