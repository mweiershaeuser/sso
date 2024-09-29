"use client";

import { locales } from "@/i18n/models/locale";
import { initialiseLocale, setLocale } from "@/i18n/server-actions";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export default function LocaleSwitch() {
  const locale = useLocale();

  useEffect(() => {
    initialiseLocale();
  }, []);

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <i
          className="bi bi-translate"
          aria-label="Sprachauswahl: "
          role="img"
        ></i>
        {locale}
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box bg-base-300 z-[1] p-2 shadow"
      >
        {locales.map((locale) => (
          <li key={locale}>
            <button onClick={() => setLocale(locale)}>{locale}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
