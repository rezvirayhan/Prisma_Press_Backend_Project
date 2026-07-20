import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import HttpStatus from "http-status";
import config from "./config";
import { prisma } from "./lib/prisma";
const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/api/users/register", async (req: Request, res: Response) => {
  const { name, email, password, ProfilePhoto } = req.body;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("User with this email already Exists");
  }

  res.status(HttpStatus.CREATED).json({
    message: "User Register Succesfully",
  });
});

export default app;
