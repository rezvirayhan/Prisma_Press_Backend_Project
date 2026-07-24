import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status';

import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { postService } from './post.service';

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user?.id;
  const payload = req.body;
  const result = await postService.createPost(payload, id as string);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.CREATED,
    message: 'Post Created Successfully',
    data: result,
  });
});
const getAllPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await postService.getAllPost();
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Post Retrived Successfully',
    data: result,
  });
});
const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;
  if (!postId) {
    throw new Error('Post Id Required In Params ');
  }
  const result = await postService.getPostById(postId as string);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Post Retrived Successfully',
    data: result,
  });
});
const getMyPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.user?.id;
  const result = await postService.getMyPost(authorId as string);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'My Post Retrived Successfully',
    data: result,
  });
});
const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.user?.id;
  const isAdmin = req.user?.role === 'ADMIN';
  const postId = req.params.postId;
  const payload = req.body;
  const result = await postService.updatePost(
    postId as string,
    payload,
    authorId as string,
    isAdmin
  );
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: ' Post Updated Successfully',
    data: result,
  });
});
const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.user?.id;
  const isAdmin = req.user?.role === 'ADMIN';
  const postId = req.params.postId;
  await postService.deletePost(postId as string, authorId as string, isAdmin);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: ' Post Delete Successfully',
    data: null,
  });
});
const getPostStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const postController = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getPostStatus,
  getMyPost,
};
