import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
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
    // console.log(req.user, "user request");
    // const { accessToken } = req.cookies;
    // const verifiedToken = jwtUtils.verifyToken(
    //   accessToken,
    //   config.jwt_access_secret,
    // );

    // if (typeof verifiedToken === "string") {
    //   throw new Error(verifiedToken);
    // }

    const profile = await userService.getMyProfileFromDB(
      req.user?.id as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "User Profile fetched successfully",
      data: { profile },
    });
  },
);

const updateMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;
    const updateProfile = await userService.updateMyProfileIntoDB(
      userId,
      payload,
    );
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "User Profile Updated successfully",
      data: { updateProfile },
    });
  },
);

export const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile,
};
