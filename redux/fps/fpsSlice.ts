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
  createFpsValidation,
  createFpsComment,
  updateFpsComment,
  deleteFpsComment,
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
  immediateActions?: immediatActionsType[];
};

export type FpsCommentType = {
  id?: string;
  comment: string;
  date: string;
  rating: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    image: string;
  };
};

export interface FpsType {
  fpsId: string;
  currentStep:
    | "problem"
    | "immediateActions"
    | "cause"
    | "defensiveActions"
    | "validation";
  problem: fpsProblemType;
  defensiveActions?: fpsDefensiveActionType[];
  cause?: fpsCauseType;
  immediateActions?: fpsImmediateActionsType;
  status: "inProgress" | "completed" | "failed";
  comments: FpsCommentType[];
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
  reducers: {
    resetFps: (state) => {
      state.fps = null;
      state.loading = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
      state.error = null;
    },
  },
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
        state.updateSuccess = false;
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
        state.updateSuccess = false;
      })
      .addCase(
        createFpsProblem.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
          state.updateSuccess = true;
        }
      )
      .addCase(createFpsProblem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })
      .addCase(createFpsImmediateActions.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        createFpsImmediateActions.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
          state.updateSuccess = true;
        }
      )
      .addCase(createFpsImmediateActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })
      .addCase(createFpsCause.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        createFpsCause.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
          state.updateSuccess = true;
        }
      )
      .addCase(createFpsCause.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })
      .addCase(createFpsDefensiveActions.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        createFpsDefensiveActions.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
          state.updateSuccess = true;
        }
      )
      .addCase(createFpsDefensiveActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })
      .addCase(createFpsValidation.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        createFpsValidation.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
          state.updateSuccess = true;
        }
      )
      .addCase(createFpsValidation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })
      .addCase(createFpsComment.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        createFpsComment.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
          state.updateSuccess = true;
        }
      )
      .addCase(createFpsComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })
      .addCase(updateFpsComment.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        updateFpsComment.fulfilled,
        (state, action: PayloadAction<FpsType>) => {
          state.loading = false;
          state.fpss.push(action.payload as FpsType);
          state.updateSuccess = true;
          const index = state.fpss.findIndex(
            (fps) => fps.fpsId === action.payload.fpsId
          );
          state.fpss[index] = action.payload;
        }
      )
      .addCase(updateFpsComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })
      .addCase(deleteFpsComment.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(deleteFpsComment.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(deleteFpsComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
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

export const { resetFps } = fpssSlice.actions;
