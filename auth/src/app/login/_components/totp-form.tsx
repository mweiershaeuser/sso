"use client";

import { authenticateWithTotp } from "@/auth/server-actions";
import { TextInput } from "@/components/form/text-input";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export default function TotpForm() {
  const [state, formAction] = useFormState(authenticateWithTotp, undefined);

  const totpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.errors?.totp) {
      totpRef.current?.focus();
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
          aria-label="Info: "
          role="img"
        ></i>{" "}
        Pflichtfelder sind mit * markiert.
      </p>

      <TextInput
        name={"totp"}
        label={"Code"}
        type="text"
        required
        autocomplete="one-time-code"
        formState={state}
        inputRef={totpRef}
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
