/**
 * @author aliasgarbootwala@gmail.com
 */

import { STATUS_CODE } from "../constants/statusCode.js";
import { Response } from "express";

export class BaseController {
  success(res: Response, data: any, status = STATUS_CODE.OK) {
    res.status(status).json({
      data,
      success: true,
    });
  }

  error(
    res: Response,
    message: string,
    status = STATUS_CODE.INTERNAL_SERVER_ERROR,
  ) {
    res.status(status).json({
      message,
      success: false,
    });
  }
}

export default BaseController;
