/**
 * @author aliasgarbootwala@gmail.com
 */

import { httpPost, controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../config/types.js";
import BaseController from "./base.controller.js";
import { STATUS_CODE } from "../constants/statusCode.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { Request, Response } from "express";
import AuthService from "../services/auth.service.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import Logger from "../utils/logger.js";

@controller("/api/v1/user")
export class AuthController extends BaseController {
  @inject(TYPES.AuthService)
  authService!: AuthService;

  @inject(TYPES.Logger)
  logger!: Logger;

  @httpPost("/register")
  async register(req: Request, res: Response) {
    try {
      const { error } = registerSchema.validate(req.body);

      if (error) {
        return this.error(
          res,
          error.details[0].message,
          STATUS_CODE.BAD_REQUEST,
        );
      }

      const user = await this.authService.register(req.body);

      res.cookie("token", user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return this.success(res, user, STATUS_CODE.CREATED);
    } catch (error) {
      return this.error(
        res,
        error instanceof Error ? error.message : String(error),
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @httpPost("/login")
  async login(req: Request, res: Response) {
    try {
      const { error } = loginSchema.validate(req.body);

      if (error) {
        return this.error(
          res,
          error.details[0].message,
          STATUS_CODE.BAD_REQUEST,
        );
      }

      const user = await this.authService.login(req.body);

      res.cookie("token", user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return this.success(res, user, STATUS_CODE.OK);
    } catch (error) {
      return this.error(
        res,
        error instanceof Error ? error.message : String(error),
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @httpGet("/profile", authMiddleware)
  async profile(req: Request, res: Response) {
    try {
      const { token } = req.cookies;
      const user = await this.authService.profile({
        userId: req.user!.userId,
        token,
      });
      return this.success(res, user, STATUS_CODE.OK);
    } catch (error) {
      return this.error(
        res,
        error instanceof Error ? error.message : String(error),
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @httpGet("/logout", authMiddleware)
  async logout(req: Request, res: Response) {
    this.logger.info("requesting logout", { userId: req.user?.userId });
    try {
      const { token } = req.cookies;

      await this.authService.logout({token});

      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return this.success(
        res,
        { message: "Logged out successfully" },
        STATUS_CODE.OK,
      );
    } catch (error) {
      return this.error(
        res,
        error instanceof Error ? error.message : String(error),
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default AuthController;
