import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TagType } from "./tagSlice";

export const getTags = createAsyncThunk("tags/getTags", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags`
  );

  return response.data.data as TagType[];
});

export const getTag = createAsyncThunk("tags/getTag", async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag/${id}`
  );
  return response.data.data as TagType;
});

export const createTag = createAsyncThunk(
  "tags/createTag",
  async ({ id, tag }: { id: string; tag: FormData }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag/${id}`,
      tag,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as TagType;
  }
);

export const createActions = createAsyncThunk(
  "tags/createTagImmediateActions",
  async ({ id, tag }: { id: string; tag: FormData }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag/actions/${id}`,
      tag,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as TagType;
  }
);

export const createTagValidation = createAsyncThunk(
  "tags/createTagValidation",
  async ({ id, tag }: { id: string; tag: FormData }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag/validation/${id}`,
      tag,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as TagType;
  }
);

export const updateTag = createAsyncThunk(
  "tags/updateTag",
  async ({ id, tag }: { id: string; tag: FormData }) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/${id}`,
      tag,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as TagType;
  }
);
