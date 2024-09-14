"use client";

import { login, logout, selectAuth } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useEffect } from "react";
import { UserSession } from "../_models/user-session";

export default function AuthActions({ cookies }: { cookies: RequestCookie[] }) {
  const loggedIn = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sessionCookie = cookies.find((c) => c.name === "session");
    const session = sessionCookie
      ? (JSON.parse(sessionCookie.value) as UserSession)
      : undefined;
    if (session) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, [cookies, dispatch]);

  return (
    <button className="btn btn-primary">
      {!loggedIn ? "Login" : "Logout"}
    </button>
  );
}
