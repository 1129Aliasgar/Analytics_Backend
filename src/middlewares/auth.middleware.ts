/**
 * @author aliasgarbootwala@gmail.com
 */

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.js";
import { STATUS_CODE } from "../constants/statusCode.js";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies?.token;
    if (!token) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ message: "Authentication required" });
    }
    const decoded = verifyToken(token);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }
};
