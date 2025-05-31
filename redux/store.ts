import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import usersReducer from "./users/usersSlice";
import fpssReducer from "./fps/fpsSlice";
import tagsReducer from "./tag/tagSlice";
import fpsCommentsReducer from "./fpsComments/fpsCommentsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      users: usersReducer,
      fpss: fpssReducer,
      tags: tagsReducer,
      fpsComments: fpsCommentsReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

type Store = ReturnType<typeof makeStore>;

export const wrapper = createWrapper(makeStore);
