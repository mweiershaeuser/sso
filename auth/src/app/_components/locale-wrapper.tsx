"use client";

import { initialiseLocale } from "@/i18n/server-actions";
import { useEffect } from "react";
import LocaleSwitch from "../../components/i18n/locale-switch";

export default function LocaleWrapper() {
  useEffect(() => {
    initialiseLocale();
  }, []);

  return (
    <div className="hidden md:flex">
      <LocaleSwitch />
    </div>
  );
}
