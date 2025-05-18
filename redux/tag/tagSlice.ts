import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getTags,
  getTag,
  createTag,
  createActions,
  updateTag,
  createTagValidation,
} from "./tagThunk";
import { UserType } from "../users/usersSlice";

export type TagActionType = {
  procedure: string;
  userCategory: string;
  userService: string;
  quand: string;
};

export type EditedTagActionType = {
  procedure: string;
  userCategory: string;
  userService: string;
  quand: string;
  edit?: boolean;
};

export interface TagType {
  tagId: string;

  tagActions: TagActionType[];
  zone: string;
  machine: string;
  equipment: string;
  description: string;
  category: string;
  priority: "Normal" | "Urgent" | "T.Urgent";
  image: string;
  images: string[];
  qrCodeUrl: string;
  status: "open" | "toDo" | "done";
  closeDate: Date;

  user?: UserType;
}

export type TagTypeWithoutId = Omit<TagType, "tagId">;

export type flexibleTagType = Partial<TagType>;

interface TagsState {
  tags: TagType[];
  machine: string;
  tag: TagType | null;
  loading: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  error: string | null;
}

const initialState: TagsState = {
  tags: [],
  machine: "",
  tag: null,
  loading: false,
  updateSuccess: false,
  deleteSuccess: false,
  error: null,
};

const tagsSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    resetTag: (state) => {
      state.tag = null;
      state.loading = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
      state.error = null;
    },
    setMachine: (state, action) => {
      state.machine = action.payload;
    },
    resetMachine: (state) => {
      state.machine = "All";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTags.fulfilled, (state, action: PayloadAction<TagType[]>) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getTag.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(getTag.fulfilled, (state, action: PayloadAction<TagType>) => {
        state.loading = false;
        state.tag = action.payload;
      })
      .addCase(getTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createTag.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(createTag.fulfilled, (state, action: PayloadAction<TagType>) => {
        state.loading = false;
        state.tags.push(action.payload as TagType);
        state.updateSuccess = true;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })
      .addCase(createActions.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        createActions.fulfilled,
        (state, action: PayloadAction<TagType>) => {
          state.loading = false;
          state.tags.push(action.payload as TagType);
          state.updateSuccess = true;
        }
      )
      .addCase(createActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })
      .addCase(createTagValidation.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        createTagValidation.fulfilled,
        (state, action: PayloadAction<TagType>) => {
          state.loading = false;
          state.tags.push(action.payload as TagType);
          state.updateSuccess = true;
        }
      )
      .addCase(createTagValidation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.updateSuccess = false;
      })

      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(updateTag.fulfilled, (state, action: PayloadAction<TagType>) => {
        state.loading = false;
        state.updateSuccess = true;
        const index = state.tags.findIndex(
          (tag) => tag.tagId === action.payload.tagId
        );
        state.tags[index] = action.payload;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        state.updateSuccess = false;
        state.error = action.error.message as string;
      });
  },
});

export default tagsSlice.reducer;

export const { resetTag, setMachine, resetMachine } = tagsSlice.actions;
