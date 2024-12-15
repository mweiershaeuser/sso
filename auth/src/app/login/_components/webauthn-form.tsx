"use client";

import { webauthnLoginFlow } from "@/auth/webauthn";
import {
  addAlert,
  removeAlert,
  selectAlertWithId,
} from "@/store/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";

export const webAuthnLoginErrorAlertId = "ERR_WEBAUTHN_LOGIN";

export default function WebauthnForm() {
  const t = useTranslations("Login.LoginForm.AuthFactorsForm.WebauthnForm");
  const t_global = useTranslations();

  const errorAlert = useAppSelector(
    selectAlertWithId(webAuthnLoginErrorAlertId),
  );
  const dispatch = useAppDispatch();

  const signInWithPasskey = useCallback(async () => {
    const {
      type: webauthnSuccess,
      message: webauthnError,
      messageT: webauthnErrorT,
    } = await webauthnLoginFlow();
    if (webauthnSuccess === "error") {
      const errorMessage = webauthnErrorT
        ? t_global(webauthnErrorT)
        : (webauthnError ?? t_global("global.errorMessages.generic"));
      dispatch(
        addAlert({
          id: webAuthnLoginErrorAlertId,
          type: "error",
          role: "alert",
          content: errorMessage,
        }),
      );
    } else if (errorAlert) {
      dispatch(removeAlert(webAuthnLoginErrorAlertId));
    }
  }, [errorAlert, dispatch, t_global]);

  useEffect(() => {
    return () => {
      dispatch(removeAlert(webAuthnLoginErrorAlertId));
    };
  }, []);

  return (
    <button className="btn btn-primary btn-block" onClick={signInWithPasskey}>
      {t("webauthnButtonLabel")}
    </button>
  );
}
