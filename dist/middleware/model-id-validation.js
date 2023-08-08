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
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelIdValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
function modelIdValidation(model) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const doc = yield model.findById(id);
            if (!doc) {
                const nullModel = Object.keys(model.schema.obj).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: null })), {});
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(Object.assign({ message: `document with id "${id}" not found` }, nullModel));
            }
            next();
        }
        catch (err) {
            const nullModel = Object.keys(model.schema.obj).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: null })), {});
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(Object.assign({ message: 'Server error' }, nullModel));
        }
    });
}
exports.modelIdValidation = modelIdValidation;
exports.default = modelIdValidation;
