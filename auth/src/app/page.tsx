import { login } from "./actions";

export default function Home() {
  return (
    <div className="p-4">
      <h1>Login</h1>
      <form action={login} className="flex flex-col">
        <label className="input">
          <input type="text" name="user" placeholder="Benutzername" required />
        </label>

        <label className="input">
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            required
          />
        </label>

        <input
          type="submit"
          role="button"
          className="btn btn-primary"
          value="Anmelden"
        />
      </form>
    </div>
  );
}
