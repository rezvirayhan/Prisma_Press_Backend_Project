import { NextFunction, Request, RequestHandler, Response } from "express";
import HttpStatus from "http-status";
import { userService } from "./user.service";

//  Start Hire Order Function

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to register User",
        error: (error as Error).message,
      });
    }
  };
};

//  End Hire Order Function

// const registerUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;
//     const user = await userService.registerUserIntoDB(payload);
//     res.status(HttpStatus.CREATED).json({
//       success: true,
//       statusCode: HttpStatus.CREATED,
//       message: "User Register Successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//       message: "Failed to register User",
//       error: (error as Error).message,
//     });
//   }
// };
const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);
    res.status(HttpStatus.CREATED).json({
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "User Register Successfully",
      data: {
        user,
      },
    });
  },
);
export const userController = {
  registerUser,
};
