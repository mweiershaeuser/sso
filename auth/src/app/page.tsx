import { login } from "./actions";

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="mb-2">Auth</h1>
      <form action={login} className="flex flex-col">
        <label className="input mb-2">
          <input type="text" name="user" placeholder="Benutzername" required />
        </label>

        <label className="input mb-2">
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
    </main>
  );
}
