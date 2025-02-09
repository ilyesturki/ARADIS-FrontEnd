import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { QrapType } from "./qrapSlice";

export const getQraps = createAsyncThunk("qraps/getQraps", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/qraps`
  );

  return response.data.data as QrapType[];
});

export const getQrap = createAsyncThunk("qraps/getQrap", async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/qraps/${id}`
  );
  return response.data.data as QrapType;
});

export const createQrap = createAsyncThunk(
  "qraps/createQrap",
  async (qrap: FormData) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/qraps`,
      qrap,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as QrapType;
  }
);

export const updateQrap = createAsyncThunk(
  "qraps/updateQrap",
  async ({ id, qrap }: { id: string; qrap: FormData }) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/qraps/${id}`,
      qrap,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as QrapType;
  }
);
export const deleteQrap = createAsyncThunk(
  "qraps/deleteQrap",
  async (id: string) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/qraps/${id}`
    );
    return id;
  }
);
