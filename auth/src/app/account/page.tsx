import { getAuthState } from "@/auth/server-operations";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import PasswordlessAuthSettings from "./_components/passwordless-auth-settings";
import UserDetails from "./_components/user-details";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Account() {
  const t = await getTranslations("Account");

  const authStateResponse = await getAuthState();

  if (!authStateResponse.data?.loggedIn) {
    redirect("/login");
  }

  return (
    <div className="p-4">
      <h1 className="!font-sans font-normal badge badge-neutral p-4">
        {t("h1")}
      </h1>
      <UserDetails />
      <PasswordlessAuthSettings />
    </div>
  );
}
