"use client";

import { authenticateWithPassword } from "@/auth/server-actions";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";
import { useFormState } from "react-dom";

export default function PasswordForm() {
  const { username } = useAppSelector(selectUser);
  const [state, formAction] = useFormState(authenticateWithPassword, undefined);

  return (
    <form action={formAction} className="flex flex-col">
      <input
        type="hidden"
        name="user"
        value={username}
        autoComplete="username"
      />

      <label className="form-control mb-3">
        <div className="label">
          <span className="label-text">Passwort</span>
        </div>
        <input
          type="password"
          name="password"
          className="input input-bordered"
          autoComplete="current-password"
        />
      </label>

      <input
        type="submit"
        role="button"
        className="btn btn-primary"
        value="Anmelden"
      />
    </form>
  );
}
