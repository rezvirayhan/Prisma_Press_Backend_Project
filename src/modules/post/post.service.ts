import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./post.interface";

const createPost = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return result;
};
const getAllPost = () => {};
const getPostById = () => {};
const updatePost = () => {};
const deletePost = () => {};
const getPostStatus = () => {};
const getMyPost = () => {};

export const postService = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getPostStatus,
  getMyPost,
};
