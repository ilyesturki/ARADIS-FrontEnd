import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  signUp,
  activate,
  setPassword,
  verifySignUpCode,
  forgetPassword,
  verifyResetCode,
  resetPassword,
} from "./authThunks";

interface AuthState {
  email: string | null;
  loading: boolean;
  error: string | null;
  signUpSuccess: boolean;
  verifySuccess: boolean;
  forgetPasswordSuccess: boolean;
  verifyResetCodeSuccess: boolean;
  resetPasswordSuccess: boolean;
}

const initialState: AuthState = {
  email: null,
  loading: false,
  error: null,
  signUpSuccess: false,
  verifySuccess: false,
  forgetPasswordSuccess: false,
  verifyResetCodeSuccess: false,
  resetPasswordSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetSignUpState: (state) => {
      state.signUpSuccess = false;
    },
    resetVerifyState: (state) => {
      state.verifySuccess = false;
    },
    resetForgetPasswordState: (state) => {
      state.forgetPasswordSuccess = false;
    },
    resetVerifyPwResetCodeState: (state) => {
      state.verifyResetCodeSuccess = false;
    },
    resetResetPasswordState: (state) => {
      state.resetPasswordSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signUpSuccess = false;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.email = action.payload;
        state.signUpSuccess = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
        state.error = "An error occurred during sign-up";
        state.signUpSuccess = false;
      })
      .addCase(verifySignUpCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verifySuccess = false;
      })
      .addCase(verifySignUpCode.fulfilled, (state) => {
        state.loading = false;
        state.verifySuccess = true;
      })
      .addCase(verifySignUpCode.rejected, (state) => {
        state.loading = false;
        state.error = "An error occurred during verification";
        state.verifySuccess = false;
      })
      .addCase(activate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activate.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(activate.rejected, (state) => {
        state.loading = false;
        state.error = "An error occurred during activation";
      })
      .addCase(setPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setPassword.rejected, (state) => {
        state.loading = false;
        state.error = "An error occurred during password setting";
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgetPasswordSuccess = false;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgetPasswordSuccess = true;
      })
      .addCase(forgetPassword.rejected, (state) => {
        state.loading = false;
        state.error = "An error occurred during password reset request";
        state.forgetPasswordSuccess = false;
      })
      .addCase(verifyResetCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verifyResetCodeSuccess = false;
      })
      .addCase(verifyResetCode.fulfilled, (state) => {
        state.loading = false;
        state.verifyResetCodeSuccess = true;
      })
      .addCase(verifyResetCode.rejected, (state) => {
        state.loading = false;
        state.error =
          "An error occurred during password reset code verification";
        state.verifyResetCodeSuccess = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.error = "An error occurred during password reset";
        state.resetPasswordSuccess = false;
      });
  },
});

export default authSlice.reducer;

export const {
  setUserEmail,
  resetSignUpState,
  resetVerifyState,
  resetForgetPasswordState,
  resetVerifyPwResetCodeState,
  resetResetPasswordState,
} = authSlice.actions;
