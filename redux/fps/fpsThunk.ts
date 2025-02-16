import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FpsType } from "./fpsSlice";

export const getFpss = createAsyncThunk("fpss/getFpss", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/fpss`
  );

  return response.data.data as FpsType[];
});

export const getFps = createAsyncThunk("fpss/getFps", async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/fpss/${id}`
  );
  return response.data.data as FpsType;
});

export const createFps = createAsyncThunk(
  "fpss/createFps",
  async (fps: FormData) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/fpss`,
      fps,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as FpsType;
  }
);

export const updateFps = createAsyncThunk(
  "fpss/updateFps",
  async ({ id, fps }: { id: string; fps: FormData }) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/fpss/${id}`,
      fps,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as FpsType;
  }
);
export const deleteFps = createAsyncThunk(
  "fpss/deleteFps",
  async (id: string) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/fpss/${id}`
    );
    return id;
  }
);
