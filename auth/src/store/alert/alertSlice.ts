import { Alert } from "@/components/models/alert";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: Alert[] = [];

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      if (state.find((alert) => alert.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];
    },
    removeAlert: (state, action: PayloadAction<string>) =>
      state.filter((alert) => alert.id !== action.payload),
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert;
export const selectAlertWithId = (id: string) => (state: RootState) =>
  state.alert.find((alert) => alert.id === id);

export default alertSlice.reducer;
