"use client";

import { Locale, locales, localeToLanguageMap } from "@/i18n/models/locale";
import { setLocale } from "@/i18n/server-actions";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo, useRef, useState } from "react";
import Dialog from "../common/dialog";

export default function LocaleSwitch() {
  const locale = useLocale();
  const t = useTranslations("components.i18n.LocaleSwitch");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const localeButtonRef = useRef<HTMLButtonElement>(null);

  const localeLanguageString = useMemo(
    () => localeToLanguageMap.get(locale as Locale),
    [locale],
  );

  const selectLocale = useCallback((locale: Locale) => {
    setLocale(locale);
    setDialogOpen(false);
    localeButtonRef.current?.focus();
  }, []);

  return (
    <>
      <button
        className="btn btn-ghost"
        onClick={() => setDialogOpen(true)}
        ref={localeButtonRef}
      >
        <span className="whitespace-nowrap">
          <i
            className="bi bi-translate"
            aria-label={`${t("icon-aria-label")}: `}
            role="img"
          ></i>
          &nbsp;
          <abbr
            aria-label={localeLanguageString}
            title={localeLanguageString}
            className="no-underline"
          >
            {locale}
          </abbr>
        </span>
      </button>
      <Dialog open={dialogOpen} setOpen={setDialogOpen}>
        <h2 className="mt-0">Sprachauswahl</h2>
        <ul className="flex flex-col gap-3 not-prose">
          {locales.map((locale) => (
            <li key={locale} lang={locale}>
              <button
                onClick={() => selectLocale(locale)}
                className="btn btn-secondary btn-block"
              >
                {localeToLanguageMap.get(locale)}
              </button>
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  );
}
