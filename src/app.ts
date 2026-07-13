import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import config from "./config";
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
  res.send("Hello world");
});

app.post("/api/users/register", async (req: Request, res: Response) => {
  const payload = req.body;
  console.log(payload);

  res
    .status(httpStatus.CREATED)
    .json({ message: "User registered successfully" });
});

export default app;
