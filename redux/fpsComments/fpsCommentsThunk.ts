import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FpsCommentType } from "./fpsCommentsSlice";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (id: string)  => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${id}`
    );

    return response.data.data as FpsCommentType[];
  }
);

export const createFpsComment = createAsyncThunk(
  "comments/createFpsComment",
  async ({ id, fpsComment }: { id: string; fpsComment: FormData }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/comment/${id}`,
      fpsComment,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as FpsCommentType;
  }
);

export const updateFpsComment = createAsyncThunk(
  "comments/updateFpsComment",
  async ({ id, fpsComment }: { id: string; fpsComment: FormData }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/comment/${id}`,
      fpsComment,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as FpsCommentType;
  }
);

export const deleteFpsComment = createAsyncThunk(
  "comments/deleteFpsComment",
  async (id: string) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/comment/${id}`
    );
    return id;
  }
);
