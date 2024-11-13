"use client";

import AuthState from "@/auth/models/auth-state";
import { ServerResponse } from "@/auth/models/server-response";
import { User } from "@/auth/models/user";
import { deleteSession } from "@/auth/server-actions";
import { setAuthState } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/user/userSlice";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthActions({
  authStateResponse,
  userResponse,
}: {
  authStateResponse: ServerResponse<AuthState>;
  userResponse: ServerResponse<User>;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const t = useTranslations("RootLayout.Header.Auth");
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

  const loginOrLogout = useCallback(() => {
    if (!authState?.loggedIn) {
      router.push("/login");
    } else {
      deleteSession();
    }
  }, [authState?.loggedIn, router]);

  return (
    <>
      <button className="btn btn-primary" onClick={loginOrLogout}>
        {!authState?.loggedIn
          ? t("login-button-text")
          : t("logout-button-text")}
      </button>
      {authState?.loggedIn && (
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-12 rounded-full">
            <span className="text-lg">
              {user?.givenName[0]?.toUpperCase()}
              {user?.familyName[0]?.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
