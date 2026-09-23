/**
 * @author aliasgarbootwala@gmail.com
 */

import "./config/config.js";
import express from "express";
import "reflect-metadata";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/container.js";
import "./controllers/index.js";
import { TYPES } from "./config/types.js";
import { IDatabase } from "./types/database.types.js";
import cors from "cors";

const server = new InversifyExpressServer(container);

const db = container.get<IDatabase>(TYPES.Database);

try {
  await db.connect();
} catch (error) {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
}

server.setConfig((app) => {
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );
});

const app = server.build();

app.get("/health", (req, res) => {
  res.send("OK");
});

export default app;
