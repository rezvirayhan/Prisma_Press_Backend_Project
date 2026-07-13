import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { prisma } from "../../lib/prisma";
const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, profilePhoto } = req.body;

  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isUserExists) {
    throw new Error("User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

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
