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
exports.postRouteStop = exports.getRouteStopsAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const route_stop_db_1 = __importDefault(require("../db/route-stop/route-stop-db"));
function getRouteStopsAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routeStopData = (yield route_stop_db_1.default.getData('/routeStops'));
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
            yield route_stop_db_1.default.push(`/routeStops[]`, {
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
