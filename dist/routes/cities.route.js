"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// initialize express router
const router = express_1.default.Router();
router.route('/').get((req, res) => {
    res.status(200).send('getCities');
});
exports.default = router;
