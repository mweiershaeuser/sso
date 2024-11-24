"use server";

import { cookies } from "next/headers";
import { Locale } from "./models/locale";

export async function setLocale(locale: Locale) {
  const cookieStore = cookies();
  cookieStore.set("locale", locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
