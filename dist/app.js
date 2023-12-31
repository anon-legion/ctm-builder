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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors"); // import immediately to patch express
// import security packages
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
// import modules
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const city_route_1 = __importDefault(require("./routes/city.route"));
const bus_route_route_1 = __importDefault(require("./routes/bus-route.route"));
const place_route_1 = __importDefault(require("./routes/place.route"));
const route_stop_route_1 = __importDefault(require("./routes/route-stop.route"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
// initialize express
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
// middlewares
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// routes
app.use('/api/v1/cities', city_route_1.default);
app.use('/api/v1/bus-routes', bus_route_route_1.default);
app.use('/api/v1/places', place_route_1.default);
app.use('/api/v1/route-stops', route_stop_route_1.default);
app.use('/api/v1/test_endpoint', (_, res) => {
    res.status(200).send('Express + Typescript Server');
});
// serve index.html if url doesn't match any route
app.use(express_1.default.static(path_1.default.join(__dirname, '/client')));
app.get('*', (_, res) => {
    res.sendFile(path_1.default.join(__dirname, '/client/index.html'));
});
// 404 and error handler middleware to catch request errors
app.use(not_found_1.default);
app.use(error_handler_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // establish connection to MongoDB and start server
        yield mongoose_1.default.connect(process.env.MONGO_URI, { dbName: 'ctm' });
        app.listen(port, () => {
            // eslint-disable-next-line no-console
            console.log(`Server listening on port [${port}]`);
        });
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
});
// start server
start();
