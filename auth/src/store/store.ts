import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alert/alertSlice";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      alert: alertReducer,
      auth: authReducer,
      user: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
