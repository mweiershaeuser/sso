"use client";

import { PrimaryAuthFactor } from "@/auth/models/auth-factors";
import { webauthnRegistrationFlow } from "@/auth/webauthn";
import { selectAuth } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

export default function PasswordlessAuthSettings() {
  const t = useTranslations("Account.PasswordlessAuthSettings");
  const t_global = useTranslations();

  const router = useRouter();

  const { availableAuthFactors } = useAppSelector(selectAuth);

  const registerPasskey = useCallback(async () => {
    const {
      type: webauthnSuccess,
      message: webauthnError,
      messageT: webauthnErrorT,
    } = await webauthnRegistrationFlow();
    if (webauthnSuccess === "error") {
      toast.error(
        webauthnErrorT
          ? t_global(webauthnErrorT)
          : (webauthnError ?? t_global("global.errorMessages.generic")),
      );
    } else {
      router.refresh();
    }
  }, [router, t_global]);

  return (
    <>
      <h2>{t("heading")}</h2>
      {!availableAuthFactors.primary.includes(PrimaryAuthFactor.WEB_AUTH_N) ? (
        <button className="btn btn-primary" onClick={registerPasskey}>
          {t("registerButtonLabel")}
        </button>
      ) : (
        <p>{t("passkeyExistsMessage")}</p>
      )}
    </>
  );
}
