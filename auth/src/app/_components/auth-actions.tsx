"use client";

import AuthState from "@/auth/models/auth-state";
import { ServerResponse } from "@/auth/models/server-response";
import { User } from "@/auth/models/user";
import LoginLogoutButton from "@/components/auth/login-logout-button";
import Avatar from "@/components/user/avatar";
import { setAuthState } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/user/userSlice";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthActions({
  authStateResponse,
  userResponse,
}: {
  authStateResponse: ServerResponse<AuthState>;
  userResponse: ServerResponse<User>;
}) {
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
      toast.error(
        authStateErrorT
          ? t_global(authStateErrorT)
          : (authStateError ?? t_global("global.errorMessages.generic")),
      );
    }
    if (userSuccess === "error" && authStateSuccess !== "error") {
      toast.error(
        userErrorT
          ? t_global(userErrorT)
          : (userError ?? t_global("global.errorMessages.generic")),
      );
    }
  }, [
    authStateError,
    authStateErrorT,
    authStateSuccess,
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
