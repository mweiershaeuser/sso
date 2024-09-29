import { getAuthState } from "@/auth/server-operations";
import { redirect } from "next/navigation";
import LoginForm from "./_components/login-form";

export default async function Login() {
  const authStateResponse = await getAuthState();

  if (authStateResponse.data?.loggedIn) {
    redirect("/account");
  }

  return (
    <div className="grow p-4 flex flex-col justify-center items-center">
      <div className="w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 p-8 rounded-lg bg-base-300 text-base-content">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
