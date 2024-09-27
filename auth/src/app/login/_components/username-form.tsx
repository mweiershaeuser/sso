import { createSession } from "@/auth/server-actions";
import { useFormState } from "react-dom";

export default function UsernameForm() {
  const [state, formAction] = useFormState(createSession, undefined);
  return (
    <form action={formAction} className="flex flex-col">
      <label className="form-control mb-3">
        <div className="label">
          <span className="label-text">Benutzername</span>
        </div>
        <input
          type="text"
          name="user"
          className="input input-bordered"
          autoComplete="username"
        />
      </label>

      <div className="form-control mb-3">
        <label className="label cursor-pointer">
          <span className="label-text">Angemeldet bleiben</span>
          <input type="checkbox" name="stayLoggedIn" className="checkbox" />
        </label>
      </div>

      <input
        type="submit"
        role="button"
        className="btn btn-primary"
        value="Anmelden"
      />
    </form>
  );
}
