import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";
import HttpStatus from "http-status";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.registerUser );

export const userRoutes = router;
