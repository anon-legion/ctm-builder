import { JsonDB, Config } from 'node-json-db';

const jsonDbConfig = new Config('db/place/place-db', true, true, '/');

const db = new JsonDB(jsonDbConfig);

export default db;
