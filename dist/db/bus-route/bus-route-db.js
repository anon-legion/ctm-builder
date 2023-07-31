"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
const jsonDbConfig = new node_json_db_1.Config('db/bus-route/bus-route-db', true, true, '/');
const db = new node_json_db_1.JsonDB(jsonDbConfig);
exports.default = db;
