import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, Locale } from "./models/locale";

export default getRequestConfig(async () => {
  let locale: Locale = defaultLocale;

  const cookieStore = cookies();
  const localeCookie = cookieStore.get("locale");
  if (localeCookie && isLocale(localeCookie.value)) {
    locale = localeCookie.value;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
