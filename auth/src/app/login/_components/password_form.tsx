"use client";

import { authenticateWithPassword } from "@/auth/server-actions";
import { TextInput } from "@/components/form/text-input";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

export default function PasswordForm() {
  const { username } = useAppSelector(selectUser);
  const [state, formAction] = useFormState(authenticateWithPassword, undefined);

  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col">
      <p aria-hidden>
        <i
          className="bi bi-info-circle-fill"
          aria-label="Info: "
          role="img"
        ></i>{" "}
        Pflichtfelder sind mit * markiert.
      </p>

      <input
        type="hidden"
        name="user"
        value={username}
        autoComplete="username"
      />

      <TextInput
        name={"password"}
        label={"Passwort"}
        type="password"
        required
        autocomplete="current-password"
        formState={state}
        inputRef={passwordRef}
      />

      <input
        type="submit"
        role="button"
        className="btn btn-primary mt-3"
        value="Anmelden"
      />
    </form>
  );
}
