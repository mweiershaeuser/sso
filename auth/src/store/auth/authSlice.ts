import AuthState from "@/auth/models/auth-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: AuthState = {
  sessionCreated: false,
  availableAuthFactors: { primary: [], secondary: [] },
  authenticatedAuthFactors: { primary: [], secondary: [] },
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectSessionCreated = (state: RootState) =>
  state.auth.sessionCreated;
export const selectAvailableAuthFactors = (state: RootState) =>
  state.auth.availableAuthFactors;
export const selectAuthenticatedAuthFactors = (state: RootState) =>
  state.auth.authenticatedAuthFactors;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;

export default authSlice.reducer;
