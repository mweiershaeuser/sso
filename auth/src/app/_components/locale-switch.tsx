"use client";

import { Locale, locales, localeToLanguageMap } from "@/i18n/models/locale";
import { initialiseLocale, setLocale } from "@/i18n/server-actions";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";

export default function LocaleSwitch() {
  const locale = useLocale();
  const t = useTranslations("RootLayout.Header.LocaleSwitch");

  const localeLanguageString = useMemo(
    () => localeToLanguageMap.get(locale as Locale),
    [locale],
  );

  useEffect(() => {
    initialiseLocale();
  }, []);

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <i
          className="bi bi-translate"
          aria-label={`${t("icon-aria-label")}: `}
          role="img"
        ></i>
        <span aria-label={localeLanguageString}>{locale}</span>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box bg-base-300 z-[1] p-2 shadow"
      >
        {locales.map((locale) => (
          <li key={locale}>
            <button
              aria-label={localeToLanguageMap.get(locale)}
              onClick={() => setLocale(locale)}
            >
              {locale}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
