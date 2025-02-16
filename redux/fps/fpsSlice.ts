import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getFpss,
  getFps,
  createFps,
  updateFps,
  deleteFps,
} from "./fpsThunk";

export type fpsDefensiveActionType = {
  procedure: string;
  userCategory: string;
  userService: string;
  quand: string;
};

export interface FpsType {
  id: number;
  qid: string;
  type:
    | "Securite"
    | "Environnement"
    | "Qualite"
    | "TRS/Efficience"
    | "Maintenence"
    | "Autre";
  quoi: string;
  ref: string;
  quand: string;
  ou: string;
  qui: string;
  comment: string;
  combien: string;
  pourqoui: string;
  image?: string;
  images?: string[];
  users?: string[];
  defensiveActions?: fpsDefensiveActionType[];
}

export type FpsTypeWithoutId = Omit<FpsType, "id">;

export type flexibleFpsType = Partial<FpsType>;

export type fpsDefensiveActionsType = fpsDefensiveActionType[];

interface FpssState {
  fpss: FpsType[];
  fps: FpsType | null;
  loading: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  error: string | null;
}

const initialState: FpssState = {
  fpss: [],
  fps: null,
  loading: false,
  updateSuccess: false,
  deleteSuccess: false,
  error: null,
};

const fpssSlice = createSlice({
  name: "fpss",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFpss.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getFpss.fulfilled,
        (state, action: PayloadAction<FpsType[]>) => {
          state.loading = false;
          state.fpss = action.payload;
        }
      )
      .addCase(getFpss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getFps.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFps.fulfilled, (state, action: PayloadAction<FpsType>) => {
        state.loading = false;
        state.fps = action.payload;
      })
      .addCase(getFps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createFps.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createFps.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
        }
      )
      .addCase(createFps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateFps.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        updateFps.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.updateSuccess = true;
          const index = state.fpss.findIndex(
            (fps) => fps.id === action.payload.id
          );
          state.fpss[index] = action.payload;
        }
      )
      .addCase(updateFps.rejected, (state, action) => {
        state.loading = false;
        state.updateSuccess = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteFps.pending, (state) => {
        state.loading = true;
        state.deleteSuccess = false;
      })
      .addCase(deleteFps.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.deleteSuccess = true;
        state.fpss = state.fpss.filter((fps) => fps.id !== +action.payload);
      })
      .addCase(deleteFps.rejected, (state, action) => {
        state.loading = false;
        state.deleteSuccess = false;
        state.error = action.error.message as string;
      });
  },
});

export default fpssSlice.reducer;

export const {} = fpssSlice.actions;
