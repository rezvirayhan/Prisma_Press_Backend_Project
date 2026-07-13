import { Request, Response } from "express";
import httpStatus from "http-status";
import { userServices } from "./user.service";
const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await userServices.registerUserIntoDB(payload);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: {
      user,
    },
  });
};

export const userController = {
  registerUser,
};
