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
exports.putBusRouteById = exports.getBusRouteById = exports.postBusRoute = exports.getBusRoutesAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const bus_route_db_1 = __importDefault(require("../db/bus-route/bus-route-db"));
function getBusRoutesAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const busRouteData = (yield bus_route_db_1.default.getData('/bus-routes'));
            res.status(http_status_codes_1.StatusCodes.OK).send({ busRouteData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.getBusRoutesAll = getBusRoutesAll;
function postBusRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, cityId, name, isActive } = req.body;
        console.log(`isActive: ${isActive}\n ${typeof isActive}`);
        try {
            yield bus_route_db_1.default.push(`/bus-routes[]`, { id, cityId, name, isActive: isActive === false ? false : true });
            res
                .status(http_status_codes_1.StatusCodes.CREATED)
                .send(`postBusRoute: ${id}, ${cityId}, ${name}, ${isActive === false ? false : true}`);
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.postBusRoute = postBusRoute;
function getBusRouteById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const index = yield bus_route_db_1.default.getIndex(`/bus-routes`, id);
            if (index === -1) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`Bus Route with id "${id}" not found`);
                return;
            }
            const busRouteData = (yield bus_route_db_1.default.getData(`/bus-routes[${index}]`));
            res.status(http_status_codes_1.StatusCodes.OK).send({ busRouteData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.getBusRouteById = getBusRouteById;
function putBusRouteById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { cityId, name, isActive } = req.body;
            const index = yield bus_route_db_1.default.getIndex(`/bus-routes`, id);
            if (index === -1) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`Bus Route with id "${id}" not found`);
                return;
            }
            yield bus_route_db_1.default.push(`/bus-routes[${index}]`, {
                id,
                cityId,
                name,
                isActive: isActive === false ? false : true,
            });
            const updatedBusRouteData = yield bus_route_db_1.default.getData(`/bus-routes[${index}]`);
            res.status(http_status_codes_1.StatusCodes.OK).send({ updatedBusRouteData });
        }
        catch (err) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.putBusRouteById = putBusRouteById;
