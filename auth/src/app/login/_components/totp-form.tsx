"use client";

import { authenticateWithTotp } from "@/auth/server-actions";
import { TextInput } from "@/components/form/text-input";
import { removeAlert, selectAlertWithId } from "@/store/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { webAuthnLoginErrorAlertId } from "./webauthn-form";

export default function TotpForm() {
  const t = useTranslations("Login.LoginForm.AuthFactorsForm.TotpForm");

  const webAuthnLoginErrorAlert = useAppSelector(
    selectAlertWithId(webAuthnLoginErrorAlertId),
  );
  const dispatch = useAppDispatch();

  const [state, formAction] = useFormState(authenticateWithTotp, undefined);

  const totpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (webAuthnLoginErrorAlert) {
      dispatch(removeAlert(webAuthnLoginErrorAlertId));
    }
    if (state?.errors?.totp) {
      totpRef.current?.focus();
    }
    if (state?.type === "error" && state?.message) {
      toast.error(state.message);
    }
  }, [dispatch, state]);

  return (
    <form action={formAction} className="flex flex-col">
      <p>
        <i
          className="bi bi-info-circle-fill"
          aria-label={`${t("required-message.icon-aria-label")}: `}
          role="img"
        ></i>{" "}
        {t("required-message.message")}
      </p>

      <TextInput
        name={"totp"}
        label={t("totp-input-label")}
        description={t("totp-input-description")}
        type="text"
        required
        autocomplete="one-time-code"
        inputMode="numeric"
        formState={state}
        inputRef={totpRef}
      />

      <input
        type="submit"
        className="btn btn-primary mt-3"
        value={t("submit-button-label")}
      />
    </form>
  );
}
