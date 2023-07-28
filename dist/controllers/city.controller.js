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
exports.getCityById = exports.postCity = exports.getCitiesAll = void 0;
const city_db_1 = __importDefault(require("../db/city-db"));
function getCitiesAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).send('getCities');
    });
}
exports.getCitiesAll = getCitiesAll;
function postCity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, name, isActive } = req.body;
        console.log(`isActive: ${isActive}\ntype: ${typeof isActive}`);
        yield city_db_1.default.push(`/cities[]`, { id, name, isActive });
        res.status(200).send(`postCity: ${id}, ${name}, ${isActive === false ? false : true}`);
    });
}
exports.postCity = postCity;
function getCityById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).send('getCityById');
    });
}
exports.getCityById = getCityById;
