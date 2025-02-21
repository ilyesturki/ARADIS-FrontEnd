import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getFpss,
  getFps,
  createFpsProblem,
  createFpsImmediateActions,
  createFpsCause,
  createFpsDefensiveActions,
  updateFps,
  deleteFps,
} from "./fpsThunk";

export type fpsProblemType = {
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
  userCategory: string;
  userService: string;
  comment: string;
  combien: string;
  pourquoi: string;
  image?: string;
  images?: string[];
  clientRisk: boolean;
};

export type fpsDefensiveActionType = {
  procedure: string;
  userCategory: string;
  userService: string;
  quand: string;
};

export type fpsCauseType = {
  causeList: string[];
  whyList: string[];
};

export type sortingResultsType = {
  product: string;
  sortedQuantity: string;
  quantityNOK: string;
  userCategory: string;
  userService: string;
};

export type immediatActionsType = { 
  description: string;
  userCategory: string;
  userService: string;
};

export type fpsImmediateActionsType = {
  alert?: string[];
  startSorting: boolean;
  sortingResults?: sortingResultsType[];
  concludeFromSorting?: string;
  immediatActions?: immediatActionsType[];
};

export interface FpsType {
  fpsId: string;
  currentStep: "problem" | "immediateActions" | "cause" | "defensiveActions";
  problem: fpsProblemType;
  defensiveActions?: fpsDefensiveActionType[];
  cause?: fpsCauseType;
  immediatActions?: fpsImmediateActionsType;
}

export type FpsTypeWithoutId = Omit<FpsType, "fpsId">;

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
  name: "fps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFpss.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFpss.fulfilled, (state, action: PayloadAction<FpsType[]>) => {
        state.loading = false;
        state.fpss = action.payload;
      })
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
      .addCase(createFpsProblem.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createFpsProblem.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
        }
      )
      .addCase(createFpsProblem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createFpsImmediateActions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createFpsImmediateActions.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
        }
      )
      .addCase(createFpsImmediateActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createFpsCause.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createFpsCause.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
        }
      )
      .addCase(createFpsCause.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createFpsDefensiveActions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createFpsDefensiveActions.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
        }
      )
      .addCase(createFpsDefensiveActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateFps.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(updateFps.fulfilled, (state, action: PayloadAction<FpsType>) => {
        state.loading = false;
        state.updateSuccess = true;
        const index = state.fpss.findIndex(
          (fps) => fps.fpsId === action.payload.fpsId
        );
        state.fpss[index] = action.payload;
      })
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
        state.fpss = state.fpss.filter((fps) => fps.fpsId !== action.payload);
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
