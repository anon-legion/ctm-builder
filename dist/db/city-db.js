"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
const jsonDbConfig = new node_json_db_1.Config('db/json/city-db', true, true, '/');
const db = new node_json_db_1.JsonDB(jsonDbConfig);
exports.default = db;
