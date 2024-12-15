"use client";

import { PrimaryAuthFactor } from "@/auth/models/auth-factors";
import { webauthnRegistrationFlow } from "@/auth/webauthn";
import {
  addAlert,
  removeAlert,
  selectAlertWithId,
} from "@/store/alert/alertSlice";
import { selectAuth } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const webAuthnRegistrationErrorAlertId = "ERR_WEBAUTHN_REGISTRATION";

export default function PasswordlessAuthSettings() {
  const t = useTranslations("Account.PasswordlessAuthSettings");
  const t_global = useTranslations();

  const router = useRouter();

  const errorAlert = useAppSelector(
    selectAlertWithId(webAuthnRegistrationErrorAlertId),
  );
  const dispatch = useAppDispatch();

  const { availableAuthFactors } = useAppSelector(selectAuth);

  const registerPasskey = useCallback(async () => {
    const {
      type: webauthnSuccess,
      message: webauthnError,
      messageT: webauthnErrorT,
    } = await webauthnRegistrationFlow();
    if (webauthnSuccess === "error") {
      const errorMessage = webauthnErrorT
        ? t_global(webauthnErrorT)
        : (webauthnError ?? t_global("global.errorMessages.generic"));
      dispatch(
        addAlert({
          id: webAuthnRegistrationErrorAlertId,
          type: "error",
          role: "alert",
          content: errorMessage,
        }),
      );
    } else {
      if (errorAlert) {
        dispatch(removeAlert(webAuthnRegistrationErrorAlertId));
      }
      router.refresh();
    }
  }, [dispatch, errorAlert, router, t_global]);

  useEffect(() => {
    return () => {
      dispatch(removeAlert(webAuthnRegistrationErrorAlertId));
    };
  }, []);

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
