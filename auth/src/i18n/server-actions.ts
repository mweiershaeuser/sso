"use server";

import { cookies } from "next/headers";
import { defaultLocale, Locale } from "./models/locale";

export async function initialiseLocale() {
  const cookieStore = cookies();
  if (!cookieStore.has("locale")) {
    cookieStore.set("locale", defaultLocale, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }
}

export async function setLocale(locale: Locale) {
  const cookieStore = cookies();
  cookieStore.set("locale", locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
