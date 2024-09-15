import { authenticateWithPassword } from "@/auth/server-actions";

export default function PasswordForm() {
  return (
    <form action={authenticateWithPassword} className="flex flex-col">
      <label className="form-control mb-3">
        <div className="label">
          <span className="label-text">Passwort</span>
        </div>
        <input
          type="password"
          name="password"
          className="input input-bordered"
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
