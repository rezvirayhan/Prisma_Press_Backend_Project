import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { jwtUtils } from "../../utils/jwt";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";
const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "User Register Successfully",
      data: { user },
    });
  },
);
const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }

    const profile = await userService.getMyProfileFromDB(verifiedToken.id);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "User Profile fetched successfully",
      data: { profile },
    });
  },
);
export const userController = {
  registerUser,
  getMyProfile,
};
