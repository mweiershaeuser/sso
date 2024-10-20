"use client";

import { selectAuth } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useLocale } from "next-intl";
import AuthFactorsForm from "./auth-factors-form";
import UsernameDisplay from "./username-display";
import UsernameForm from "./username-form";

export default function LoginForm() {
  const { sessionCreated, loggedIn } = useAppSelector(selectAuth);
  const locale = useLocale();

  return (
    <div key={locale}>
      {!sessionCreated && !loggedIn && <UsernameForm />}
      {sessionCreated && !loggedIn && (
        <>
          <UsernameDisplay />
          <AuthFactorsForm />
        </>
      )}
    </div>
  );
}
