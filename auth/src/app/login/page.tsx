import { getAuthState } from "@/auth/server-operations";
import { redirect } from "next/navigation";
import LoginForm from "./_components/login-form";

export default async function Login() {
  const authStateResponse = await getAuthState();

  if (authStateResponse.data?.loggedIn) {
    redirect("/account");
  }

  return (
    <div className="p-4">
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
