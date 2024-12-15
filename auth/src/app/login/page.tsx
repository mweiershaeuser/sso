import { getAuthState } from "@/auth/server-operations";
import { loginSuccessfulSearchParamKey } from "@/constants";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import LoginForm from "./_components/login-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Login.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Login() {
  const authStateResponse = await getAuthState();

  const t = await getTranslations("Login");

  if (authStateResponse.data?.loggedIn) {
    redirect(`/account?${loginSuccessfulSearchParamKey}=true`);
  }

  return (
    <div className="grow p-4 flex flex-col justify-center items-center">
      <div className="w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 p-8 rounded-lg bg-base-200 text-base-content">
        <h1>{t("h1")}</h1>
        <LoginForm />
      </div>
    </div>
  );
}
