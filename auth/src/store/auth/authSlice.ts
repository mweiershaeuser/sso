import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  loggedIn: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.loggedIn;
export default authSlice.reducer;
