import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "./userSlice";

export const getUser = createAsyncThunk("users/getUser", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`
  );
  return response.data.data as UserType;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ user }: { user: FormData }) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
      user,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as UserType;
  }
);

export const updateUserPassword = createAsyncThunk(
  "users/updateUserPassword",
  async ({ user }: { user: FormData }) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update-password`,
      user,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as UserType;
  }
);
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ user }: { user: FormData }) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
      {
        data: { user },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
);
