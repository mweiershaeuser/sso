import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { loginDialog: boolean; logoutDialog: boolean } = {
  loginDialog: false,
  logoutDialog: false,
};

export const loginLogoutDialogsSlice = createSlice({
  name: "loginLogoutDialogs",
  initialState,
  reducers: {
    setLoginDialog: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loginDialog: action.payload,
    }),
    setLogoutDialog: (state, action: PayloadAction<boolean>) => ({
      ...state,
      logoutDialog: action.payload,
    }),
  },
});

export const { setLoginDialog, setLogoutDialog } =
  loginLogoutDialogsSlice.actions;

export const selectLoginLogoutDialogs = (state: RootState) =>
  state.loginLogoutDialogs;
export const selectLoginDialog = (state: RootState) =>
  state.loginLogoutDialogs.loginDialog;
export const selectLogoutDialog = (state: RootState) =>
  state.loginLogoutDialogs.logoutDialog;

export default loginLogoutDialogsSlice.reducer;
