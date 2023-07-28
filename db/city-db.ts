import { JsonDB, Config } from 'node-json-db';

const jsonDbConfig = new Config('db/json/city-db', true, true, '/');

const db = new JsonDB(jsonDbConfig);

export default db;
