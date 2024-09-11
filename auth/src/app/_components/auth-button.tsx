"use client";

import { login, logout, selectAuth } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AuthButton() {
  const loggedIn = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        !loggedIn ? dispatch(login()) : dispatch(logout());
      }}
    >
      {!loggedIn ? "Login" : "Logout"}
    </button>
  );
}
