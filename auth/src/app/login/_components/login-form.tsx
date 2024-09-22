"use client";

import { selectAuth } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import AuthFactorsForm from "./auth-factors-form";
import UsernameDisplay from "./username-display";
import UsernameForm from "./username-form";

export default function LoginForm() {
  const { sessionCreated, loggedIn } = useAppSelector(selectAuth);

  return (
    <>
      {!sessionCreated && !loggedIn && <UsernameForm />}
      {sessionCreated && !loggedIn && (
        <>
          <UsernameDisplay />
          <AuthFactorsForm />
        </>
      )}
    </>
  );
}
