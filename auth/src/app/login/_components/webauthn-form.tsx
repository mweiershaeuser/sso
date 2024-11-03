"use client";

import { webauthnLoginFlow } from "@/auth/webauthn";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import toast from "react-hot-toast";

export default function WebauthnForm() {
  const t = useTranslations("Login.LoginForm.AuthFactorsForm.WebauthnForm");
  const t_global = useTranslations();

  const signInWithPasskey = useCallback(async () => {
    const {
      type: webauthnSuccess,
      message: webauthnError,
      messageT: webauthnErrorT,
    } = await webauthnLoginFlow();
    if (webauthnSuccess === "error") {
      toast.error(
        webauthnErrorT
          ? t_global(webauthnErrorT)
          : (webauthnError ?? t_global("global.errorMessages.generic")),
      );
    }
  }, [t_global]);

  return (
    <button className="btn btn-primary btn-block" onClick={signInWithPasskey}>
      {t("webauthnButtonLabel")}
    </button>
  );
}
