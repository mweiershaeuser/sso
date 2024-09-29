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

  const {
    type: authStateSuccess,
    data: authState,
    message: authStateError,
  } = authStateResponse;
  const { type: userSuccess, data: user, message: userError } = userResponse;

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
      toast.error(authStateError ?? "Es ist ein Fehler aufgetreten.");
    }
    if (userSuccess === "error" && authStateSuccess !== "error") {
      toast.error(userError ?? "Es ist ein Fehler aufgetreten.");
    }
  }, [authStateError, authStateSuccess, userError, userSuccess]);

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
        <div className="avatar placeholder ml-2">
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
