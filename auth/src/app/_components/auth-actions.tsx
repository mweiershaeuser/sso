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
  authState: AuthState;
  user: User;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loggedIn } = authState;

  useEffect(() => {
    dispatch(setAuthState(authState));
    dispatch(setUser(user));
  }, [authState, dispatch, user]);

  const loginOrLogout = useCallback(() => {
    if (!loggedIn) {
      router.push("/login");
    } else {
      deleteSession();
    }
  }, [loggedIn, router]);

  return (
    <>
      <button className="btn btn-primary" onClick={loginOrLogout}>
        {!loggedIn ? "Login" : "Logout"}
      </button>
      {loggedIn && (
        <div className="avatar placeholder ml-2">
          <div className="bg-neutral text-neutral-content w-12 rounded-full">
            <span className="text-lg">
              {user.givenName[0]?.toUpperCase()}
              {user.familyName[0]?.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
