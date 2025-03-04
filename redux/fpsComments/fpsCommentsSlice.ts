import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getComments,
  createFpsComment,
  updateFpsComment,
  deleteFpsComment,
} from "./fpsCommentsThunk";

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

interface CommentsState {
  comments: FpsCommentType[];
  comment: FpsCommentType | null;
  loading: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  comment: null,
  loading: false,
  updateSuccess: false,
  deleteSuccess: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    resetComment: (state) => {
      state.comment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getComments.fulfilled,
        (state, action: PayloadAction<FpsCommentType[]>) => {
          state.loading = false;
          state.comments = action.payload;
        }
      )
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      .addCase(createFpsComment.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        createFpsComment.fulfilled,
        (state, action: PayloadAction<FpsCommentType>) => {
          state.loading = false;
          state.comments.push(action.payload as FpsCommentType);
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
        (state, action: PayloadAction<FpsCommentType>) => {
          state.loading = false;
          state.comments.push(action.payload as FpsCommentType);
          state.updateSuccess = true;
          const index = state.comments.findIndex(
            (comment) => comment.id === action.payload.id
          );
          state.comments[index] = action.payload;
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
      });
  },
});

export default commentsSlice.reducer;

export const { resetComment } = commentsSlice.actions;
