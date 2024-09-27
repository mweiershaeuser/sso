import { createSession } from "@/auth/server-actions";
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
    <>
      <p aria-hidden>
        <i
          className="bi bi-info-circle-fill"
          aria-label="Info: "
          role="img"
        ></i>{" "}
        Pflichtfelder sind mit * markiert.
      </p>
      <form action={formAction} className="flex flex-col">
        <label className="form-control">
          <div className="label">
            <span
              className={`label-text ${state?.errors?.user && "text-error"}`}
            >
              Benutzername <span aria-hidden>*</span>
            </span>
          </div>
          <input
            type="text"
            name="user"
            ref={userRef}
            className={`input input-bordered ${state?.errors?.user && "input-error"}`}
            autoComplete="username"
            aria-required
            aria-invalid={!!state?.errors?.user}
            aria-describedby="userError"
          />
        </label>
        {state?.errors?.user && (
          <p id="userError" className="m-0 text-error">
            <i
              className="bi bi-exclamation-circle-fill"
              aria-label="Fehler: "
              role="img"
            ></i>{" "}
            {state?.errors?.user}
          </p>
        )}

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
    </>
  );
}
