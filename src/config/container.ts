/**
 * @author aliasgarbootwala@gmail.com
 */

import { Container } from "inversify";
import "reflect-metadata"
import { TYPES } from "./types.js";
import AuthService from "../services/auth.service.js";
import AuthRepository from "../repositories/auth.repository.js";
import Logger from "../utils/logger.js";
import MongoDatabase from "./database.js";
import AnalyticsRepository from "../repositories/analytics.repository.js";
import { AnalyticsService } from "../services/analytics.service.js";

const container = new Container();

// Database bindings
container.bind(TYPES.Database).to(MongoDatabase).inSingletonScope();

// Service bindings
container.bind(TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind(TYPES.AnalyticsService).to(AnalyticsService).inSingletonScope();

// Repository bindings
container.bind(TYPES.AuthRepository).to(AuthRepository).inSingletonScope();
container.bind(TYPES.AnalyticsRepository).to(AnalyticsRepository).inSingletonScope();


// Logger bindings
container.bind(TYPES.Logger).to(Logger).inSingletonScope();

export default container;