"use client";

import AuthState from "@/auth/models/auth-state";
import { ServerResponse } from "@/auth/models/server-response";
import { User } from "@/auth/models/user";
import LoginLogoutButton from "@/components/auth/login-logout-button";
import Avatar from "@/components/user/avatar";
import {
  addAlert,
  removeAlert,
  selectAlertWithId,
} from "@/store/alert/alertSlice";
import { setAuthState } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/user/userSlice";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const loadAuthStateErrorAlertId = "ERR_LOAD_AUTH_STATE";
const loadUserStateErrorAlertId = "ERR_LOAD_USER_STATE";

export default function AuthActions({
  authStateResponse,
  userResponse,
}: {
  authStateResponse: ServerResponse<AuthState>;
  userResponse: ServerResponse<User>;
}) {
  const loadAuthStateErrorAlert = useAppSelector(
    selectAlertWithId(loadAuthStateErrorAlertId),
  );
  const loadUserStateErrorAlert = useAppSelector(
    selectAlertWithId(loadUserStateErrorAlertId),
  );
  const dispatch = useAppDispatch();
  const t_global = useTranslations();

  const {
    type: authStateSuccess,
    data: authState,
    message: authStateError,
    messageT: authStateErrorT,
  } = authStateResponse;
  const {
    type: userSuccess,
    data: user,
    message: userError,
    messageT: userErrorT,
  } = userResponse;

  useEffect(() => {
    if (authState) {
      dispatch(setAuthState(authState));
    }
    if (user) {
      dispatch(setUser(user));
    }
  }, [authState, dispatch, user]);

  useEffect(() => {
    if (authStateSuccess === "error") {
      const errorMessage = authStateErrorT
        ? t_global(authStateErrorT)
        : (authStateError ?? t_global("global.errorMessages.generic"));
      dispatch(
        addAlert({
          id: loadAuthStateErrorAlertId,
          type: "error",
          role: "alert",
          content: errorMessage,
        }),
      );
    } else if (loadAuthStateErrorAlert) {
      dispatch(removeAlert(loadAuthStateErrorAlertId));
    }
    if (userSuccess === "error" && authStateSuccess !== "error") {
      const errorMessage = userErrorT
        ? t_global(userErrorT)
        : (userError ?? t_global("global.errorMessages.generic"));
      dispatch(
        addAlert({
          id: loadUserStateErrorAlertId,
          type: "error",
          role: "alert",
          content: errorMessage,
        }),
      );
    } else if (loadUserStateErrorAlert) {
      dispatch(removeAlert(loadUserStateErrorAlertId));
    }

    return () => {
      if (loadAuthStateErrorAlert) {
        dispatch(removeAlert(loadAuthStateErrorAlertId));
      }
      if (loadUserStateErrorAlert) {
        dispatch(removeAlert(loadUserStateErrorAlertId));
      }
    };
  }, [
    authStateError,
    authStateErrorT,
    authStateSuccess,
    dispatch,
    t_global,
    userError,
    userErrorT,
    userSuccess,
  ]);

  return (
    <div className="hidden md:flex gap-3">
      <LoginLogoutButton />
      {!!user && <Avatar user={user} />}
    </div>
  );
}
