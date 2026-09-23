/**
 * @author aliasgarbootwala@gmail.com
 */

export const TYPES = {
  // Controller Types
  AuthController: Symbol.for("AuthController"),
  AnalyticsController: Symbol.for("AnalyticsController"),

  // Service Types
  AuthService: Symbol.for("AuthService"),
  AnalyticsService: Symbol.for("AnalyticsService"),

  // Repository Types
  AuthRepository: Symbol.for("AuthRepository"),
  AnalyticsRepository: Symbol.for("AnalyticsRepository"),

  // Infrastructure Types
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  AuthMiddleware: Symbol.for("AuthMiddleware"),
  ApiError: Symbol.for("ApiError"),
};
