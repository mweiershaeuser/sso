"use client";

import AuthState from "@/auth/models/auth-state";
import { User } from "@/auth/models/user";
import { deleteSession } from "@/auth/server-actions";
import { setAuthState } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/user/userSlice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function AuthActions({
  authState,
  user,
}: {
  authState?: AuthState;
  user?: User;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authState) {
      dispatch(setAuthState(authState));
    }
    if (user) {
      dispatch(setUser(user));
    }
  }, [authState, dispatch, user]);

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
        {!authState?.loggedIn ? "Login" : "Logout"}
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
