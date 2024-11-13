"use client";

import { authenticateWithPassword } from "@/auth/server-actions";
import { TextInput } from "@/components/form/text-input";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export default function PasswordForm() {
  const t = useTranslations("Login.LoginForm.AuthFactorsForm.PasswordForm");

  const { username } = useAppSelector(selectUser);
  const [state, formAction] = useFormState(authenticateWithPassword, undefined);

  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.errors?.password) {
      passwordRef.current?.focus();
    }
    if (state?.type === "error" && state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col">
      <p aria-hidden>
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
