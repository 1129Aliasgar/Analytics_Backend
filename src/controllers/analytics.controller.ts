import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../config/types.js";
import { AnalyticsService } from "../services/analytics.service.js";
import BaseController from "./base.controller.js";
import { STATUS_CODE } from "../constants/statusCode.js";
import Logger from "../utils/logger.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userQuerySchema } from "../validators/analytics.validator.js";

@controller("/api/v1/analytics")
export class AnalyticsController extends BaseController {
  @inject(TYPES.AnalyticsService)
  analyticsService!: AnalyticsService;

  @inject(TYPES.Logger)
  logger!: Logger;

  @httpGet("/users", authMiddleware)
  async getUsers(req: Request, res: Response) {
    try {
      this.logger.info("Fetching users ...", { req: req.user!.userId });

      const { error } = userQuerySchema.validate(req.query);
      if (error) throw new Error(error.message);

      const { city, name, search, sortBy, order } = req.query as {
        city?: string;
        name?: string;
        search?: string;
        sortBy?: string;
        order?: "asc" | "desc" | undefined;
      };

      const age = req.query.age
        ? parseInt(req.query.age as string, 10)
        : undefined;

      const minAge = req.query.minAge
        ? parseInt(req.query.minAge as string, 10)
        : undefined;
      const maxAge = req.query.maxAge
        ? parseInt(req.query.maxAge as string, 10)
        : undefined;

      const page = req.query.page
        ? parseInt(req.query.page as string, 10)
        : undefined;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : undefined;

      const users = await this.analyticsService.getUsers(
        city,
        name,
        search,
        age,
        minAge,
        maxAge,
        sortBy,
        order,
        page,
        limit,
      );

      this.success(
        res,
        { message: "Users fetched successfully", users },
        STATUS_CODE.OK,
      );
    } catch (error) {
      this.error(
        res,
        error instanceof Error ? error.message : String(error),
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @httpGet("/user/:id", authMiddleware)
  async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      this.logger.info(`Fetching user with id ${id} ...`, {
        req: req.user!.userId,
      });
      const user = await this.analyticsService.getUserById(id);
      this.success(
        res,
        { message: "User fetched successfully", user },
        STATUS_CODE.OK,
      );
    } catch (error) {
      this.error(
        res,
        error instanceof Error ? error.message : String(error),
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
