import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getQraps,
  getQrap,
  createQrap,
  updateQrap,
  deleteQrap,
} from "./qrapThunk";

export interface QrapType {
  id: number;
  quoi: string;
  ref: string;
  quand: string;
  ou: string;
  qui: string;
  comment: string;
  combien: string;
  pourqoui: string;
  image?: string;
}

export type QrapTypeWithoutId = Omit<QrapType, "id">;

export type flexibleQrapType = Partial<QrapType>;

interface QrapsState {
  qraps: QrapType[];
  qrap: QrapType | null;
  loading: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  error: string | null;
}

const initialState: QrapsState = {
  qraps: [],
  qrap: null,
  loading: false,
  updateSuccess: false,
  deleteSuccess: false,
  error: null,
};

const qrapsSlice = createSlice({
  name: "qraps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQraps.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getQraps.fulfilled,
        (state, action: PayloadAction<QrapType[]>) => {
          state.loading = false;
          state.qraps = action.payload;
        }
      )
      .addCase(getQraps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getQrap.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQrap.fulfilled, (state, action: PayloadAction<QrapType>) => {
        state.loading = false;
        state.qrap = action.payload;
      })
      .addCase(getQrap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createQrap.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createQrap.fulfilled,
        (state, action: PayloadAction<QrapType>) => {
          state.loading = false;
          state.qraps.push(action.payload as QrapType);
        }
      )
      .addCase(createQrap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateQrap.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        updateQrap.fulfilled,
        (state, action: PayloadAction<QrapType>) => {
          state.loading = false;
          state.updateSuccess = true;
          const index = state.qraps.findIndex(
            (qrap) => qrap.id === action.payload.id
          );
          state.qraps[index] = action.payload;
        }
      )
      .addCase(updateQrap.rejected, (state, action) => {
        state.loading = false;
        state.updateSuccess = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteQrap.pending, (state) => {
        state.loading = true;
        state.deleteSuccess = false;
      })
      .addCase(deleteQrap.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.deleteSuccess = true;
        state.qraps = state.qraps.filter((qrap) => qrap.id !== +action.payload);
      })
      .addCase(deleteQrap.rejected, (state, action) => {
        state.loading = false;
        state.deleteSuccess = false;
        state.error = action.error.message as string;
      });
  },
});

export default qrapsSlice.reducer;

export const {} = qrapsSlice.actions;
