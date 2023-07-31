import { JsonDB, Config } from 'node-json-db';

const jsonDbConfig = new Config('db/bus-route/bus-route-db', true, true, '/');

const db = new JsonDB(jsonDbConfig);

export default db;
