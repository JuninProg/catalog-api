import * as dotenv from 'dotenv';
dotenv.config();

import { listen } from './config/server';

const DEFAULT_NODE_HOST = 'localhost';
const DEFAULT_NODE_PORT = 5500;

const host = process.env.NODE_HOST || DEFAULT_NODE_HOST;
const port = process.env.NODE_PORT
  ? parseInt(process.env.NODE_PORT)
  : DEFAULT_NODE_PORT;

listen(port, host);
