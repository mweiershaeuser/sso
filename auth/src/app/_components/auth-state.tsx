"use client";

import { selectAuth } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/hooks";

export default function AuthState() {
  const loggedIn = useAppSelector(selectAuth);

  return <span>{loggedIn ? "Angemeldet" : "Nicht angemeldet"}</span>;
}
