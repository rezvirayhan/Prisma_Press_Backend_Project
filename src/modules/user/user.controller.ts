import { Request, Response } from "express";
import httpStatus from "http-status";
import { userServices } from "./user.service";
const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = await userServices.registerUserIntoDB(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Registered Sucessfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failked to register user ",
      error: (error as Error).message,
    });
  }
};

export const userController = {
  registerUser,
};
