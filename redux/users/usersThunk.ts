import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "./usersSlice";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`
  );

  return response.data.data as UserType[];
});

export const getUser = createAsyncThunk("users/getUser", async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`
  );
  return response.data.data as UserType;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (user: FormData) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, user }: { id: string; user: FormData }) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
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
  async (id: string) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`
    );
    return id;
  }
);
