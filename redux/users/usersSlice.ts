import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./usersThunk";

export interface UserType {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  provider?: string;
  providerId?: string;
  image?: string;
  address?: {
    details: string;
    governorate: string;
    city: string;
    postalCode: string;
  };
  wishList?: string[];
  basketList?: string[];
  status: "active" | "inactive";
}

export type UserTypeWithoutId = Omit<UserType, "_id">;

export type flexibleUserType = Partial<UserType>;

interface UsersState {
  users: UserType[];
  user: UserType | null;
  loading: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  user: null,
  loading: false,
  updateSuccess: false,
  deleteSuccess: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loading = false;
          state.users.push(action.payload as UserType);
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loading = false;
          state.updateSuccess = true;
          const index = state.users.findIndex(
            (user) => user._id === action.payload._id
          );
          state.users[index] = action.payload;
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.updateSuccess = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.deleteSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.deleteSuccess = true;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.deleteSuccess = false;
        state.error = action.error.message as string;
      });
  },
});

export default usersSlice.reducer;

export const {} = usersSlice.actions;
