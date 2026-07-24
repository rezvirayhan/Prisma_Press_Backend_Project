import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { postService } from "./post.service";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await postService.createPost(payload, id as string);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "Post Created Successfully",
      data: result,
    });
  },
);
const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getPostStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getMyPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const postController = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getPostStatus,
  getMyPost,
};
