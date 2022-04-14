import pgp, { QueryFile } from 'pg-promise';

const DEFAULT_DB_HOST = '127.0.0.1';
const DEFAULT_DB_PORT = 5432;
const DEFAULT_DB_USER = 'root';
const DEFAULT_DB_PASS = '123';
const DEFAULT_DB_NAME = 'megatrez_db';

export const pgPromise = pgp();

const pgTypes = pgPromise.pg.types;

// convert numeric to float type
pgTypes.setTypeParser(pgTypes.builtins.NUMERIC, (value) => parseFloat(value));

export const database = pgPromise({
  host: process.env.DB_HOST || DEFAULT_DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : DEFAULT_DB_PORT,
  user: process.env.DB_USER || DEFAULT_DB_USER,
  password: process.env.DB_PASS || DEFAULT_DB_PASS,
  database: process.env.DB_NAME || DEFAULT_DB_NAME,
});

export const sqlFile = (filePath: string): QueryFile =>
  new QueryFile(filePath, { compress: true });
