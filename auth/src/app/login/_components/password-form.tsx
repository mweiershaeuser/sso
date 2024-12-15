"use client";

import { authenticateWithPassword } from "@/auth/server-actions";
import { TextInput } from "@/components/form/text-input";
import {
  addAlert,
  removeAlert,
  selectAlertWithId,
} from "@/store/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { webAuthnLoginErrorAlertId } from "./webauthn-form";

const passwordFormErrorAlertId = "ERR_PASSWORD_FORM";

export default function PasswordForm() {
  const t = useTranslations("Login.LoginForm.AuthFactorsForm.PasswordForm");

  const { username } = useAppSelector(selectUser);
  const webAuthnLoginErrorAlert = useAppSelector(
    selectAlertWithId(webAuthnLoginErrorAlertId),
  );
  const errorAlert = useAppSelector(
    selectAlertWithId(passwordFormErrorAlertId),
  );
  const dispatch = useAppDispatch();

  const [state, formAction] = useFormState(authenticateWithPassword, undefined);

  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (webAuthnLoginErrorAlert) {
      dispatch(removeAlert(webAuthnLoginErrorAlertId));
    }
    if (state?.errors?.password) {
      passwordRef.current?.focus();
    }
    if (state?.type === "error" && state?.message) {
      dispatch(
        addAlert({
          id: passwordFormErrorAlertId,
          type: "error",
          role: "alert",
          content: state.message,
        }),
      );
    } else if (errorAlert) {
      dispatch(removeAlert(passwordFormErrorAlertId));
    }
  }, [dispatch, state]);

  useEffect(() => {
    return () => {
      dispatch(removeAlert(passwordFormErrorAlertId));
    };
  }, []);

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

      <input
        type="hidden"
        name="user"
        value={username}
        autoComplete="username"
      />

      <TextInput
        name={"password"}
        label={t("password-input-label")}
        type="password"
        required
        autocomplete="current-password"
        formState={state}
        inputRef={passwordRef}
      />

      <input
        type="submit"
        className="btn btn-primary mt-3"
        value={t("submit-button-label")}
      />
    </form>
  );
}
