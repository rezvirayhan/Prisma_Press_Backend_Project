import HttpStatus from "http-status";

import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const loginResult = await authService.loginUser(payload);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "User Login Succesfully",
      data: loginResult,
    });
  },
);

export const authController = {
  loginUser,
};
