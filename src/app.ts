/**
 * @author aliasgarbootwala@gmail.com
*/

import "./config/config.js";
import express from 'express';
import "reflect-metadata"
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './config/container.js';
import "./controllers/index.js"
import { TYPES } from './config/types.js';
import { IDatabase } from './types/database.types.js';


const server = new InversifyExpressServer(container);

const db = container.get<IDatabase>(TYPES.Database);

try {
  await db.connect();
} catch (error) {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
}

server.setConfig((app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());
});

const app = server.build();

app.get('/health', (req, res) => {
  res.send('OK');
});

export default app;
