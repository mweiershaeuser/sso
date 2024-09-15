"use client";

import { selectAuth } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import AuthFactorsForm from "./_components/auth-factors-form";
import UsernameForm from "./_components/username-form";

export default function Login() {
  const router = useRouter();
  const { sessionCreated, loggedIn } = useAppSelector(selectAuth);

  if (sessionCreated && loggedIn) {
    router.push("/account");
  }

  return (
    <div className="p-4">
      <h1>Login</h1>
      {!sessionCreated && !loggedIn && <UsernameForm />}
      {sessionCreated && !loggedIn && <AuthFactorsForm />}
    </div>
  );
}
