import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import HttpStatus from "http-status";
import config from "../../config";
import { prisma } from "../../lib/prisma";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, ProfilePhoto } = req.body;

 

  res.status(HttpStatus.CREATED).json({
    success: true,
    statusCode: HttpStatus.CREATED,
    message: "User Register Successfully",
    data: {
      user,
    },
  });
};

export const userController = {
  registerUser,
};
