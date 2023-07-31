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
const route_stop_db_1 = __importDefault(require("../db/route-stop/route-stop-db"));
function getRouteStopsAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routeStopData = (yield route_stop_db_1.default.getData('/route-stops'));
            res.status(http_status_codes_1.StatusCodes.OK).send({ routeStopData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.getRouteStopsAll = getRouteStopsAll;
function postRouteStop(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { routeId, placeId, distance, isActive } = req.body;
        const id = `${routeId}-${placeId}`;
        try {
            yield route_stop_db_1.default.push(`/route-stops[]`, {
                id,
                routeId,
                placeId,
                distance,
                isActive: isActive === false ? false : true,
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).send(`postRouteStop: ${id}, ${routeId}, ${placeId}, ${distance}, ${isActive}`);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.postRouteStop = postRouteStop;
function getRouteStopById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const index = yield route_stop_db_1.default.getIndex(`/route-stops`, id);
            if (index === -1) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`Route Stop with id "${id}" not found`);
                return;
            }
            const routeStopData = (yield route_stop_db_1.default.getData(`/route-stops[${index}]`));
            res.status(http_status_codes_1.StatusCodes.OK).send({ routeStopData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.getRouteStopById = getRouteStopById;
function putRouteStopById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { routeId, placeId, distance, isActive } = req.body;
            const index = yield route_stop_db_1.default.getIndex(`/route-stops`, id);
            if (index === -1) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`Route Stop with id "${id}" not found`);
                return;
            }
            yield route_stop_db_1.default.push(`/route-stops[${index}]`, {
                id,
                routeId,
                placeId,
                distance,
                isActive: isActive === false ? false : true,
            });
            const updatedRouteStopData = yield route_stop_db_1.default.getData(`/route-stops[${index}]`);
            res.status(http_status_codes_1.StatusCodes.OK).send({ updatedRouteStopData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.putRouteStopById = putRouteStopById;
