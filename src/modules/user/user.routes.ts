import { NextFunction, Request, Response, Router } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { catchAsync } from "../../utils/catchAsync";
import { jwtUtils } from "./../../utils/jwt";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.registerUser);

const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;
    if (!token) {
      throw new Error(
        "You Are not logged in. please log in to access this resource",
      );
    }
    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }
    const { email, name, id, role } = verifiedToken.data as JwtPayload;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error(
        "Forbidden You don't have permission to access this resource",
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
        name,
        role,
      },
    });
    if (!user) {
      throw new Error("User not found. please log in again");
    }
    if (user.activeStatus === "BLOCKED") {
      throw new Error("Your Account has been block. please contact support");
    }
    req.user = {
      email,
      name,
      id,
      role,
    };
    next();
  });
};

router.get(
  "/me",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  userController.getMyProfile,
);

export const userRoutes = router;
