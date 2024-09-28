import { createSession } from "@/auth/server-actions";
import { TextInput } from "@/components/form/text-input";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

export default function UsernameForm() {
  const [state, formAction] = useFormState(createSession, undefined);
  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.errors?.user) {
      userRef.current?.focus();
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
        name={"user"}
        label={"Benutzername"}
        required
        autocomplete="username"
        formState={state}
        inputRef={userRef}
      />

      <div className="form-control mt-3">
        <label className="label cursor-pointer">
          <span className="label-text">Angemeldet bleiben</span>
          <input type="checkbox" name="stayLoggedIn" className="checkbox" />
        </label>
      </div>

      <input
        type="submit"
        role="button"
        className="btn btn-primary mt-3"
        value="Anmelden"
      />
    </form>
  );
}
