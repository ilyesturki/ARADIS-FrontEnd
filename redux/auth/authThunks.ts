import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "@/utils/handleError";
import toast from "react-hot-toast";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ user }: { user: FormData }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-up`,
        user,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Sign-up successful!");
      toast.success(`Email sent to ${response.data?.data?.email}`);
      return response.data?.data?.email;
    } catch (error) {
      handleError(error);
    }
  }
);

export const verifySignUpCode = createAsyncThunk(
  "auth/verifySignUpCode",
  async ({ data }: { data: FormData }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-sign-up-code`,
        data
      );
      toast.success("Sign-up verified successfully!");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const activate = createAsyncThunk(
  "auth/activate",
  async ({ data }: { data: FormData }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-token`,
        data
      );
      toast.success("Account activated successfully!");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const setPassword = createAsyncThunk(
  "auth/setPassword",
  async ({ data }: { data: FormData }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/set-password`,
        data
      );
      toast.success("Account activated successfully!");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async ({ data }: { data: FormData }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forget-password`,
        data
      );
      toast.success("Password reset email sent!");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const verifyResetCode = createAsyncThunk(
  "auth/verifyResetCode",
  async ({ data }: { data: FormData }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-pw-reset-code`,
        data
      );
      toast.success("Password reset code verified!");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ data }: { data: FormData }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`,
        data
      );
      toast.success("Password reset successfully!");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);
