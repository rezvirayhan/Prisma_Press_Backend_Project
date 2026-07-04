import { NextFunction, Request, Response, Router } from "express";
import httpStatus from "http-status";
import { Role } from "../../../generated/prisma/enums";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { jwtUtils } from "../../utils/jwt";
import { userController } from "./user.controller";

const router = Router();

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: string;
        role: Role;
      };
    }
  }
}

router.post("/register", userController.registerUser);

const auth = () => {
  return catchAsync(async (req: Request, res: Response, nuxt: NextFunction) => {
    const token =
      req.cookies.accessToken || req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;
  });
};

router.get(
  "/me",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    const { accessToken } = req.cookies;

    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }
    const { email, name, id, role } = verifiedToken;
    // const requiredRoles = ["ADMIN", "USER", "AUTHOR"];
    const requiredRoles = [Role.ADMIN, Role.USER, Role.AUTHOR];
    if (!requiredRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "Forbidden You dont have permission to acces this resource",
      });
    }
    req.user = {
      email,
      name,
      id,
      role,
    };
    next();
  },
  userController.getMyProfile,
);

export const userRoutes = router;
