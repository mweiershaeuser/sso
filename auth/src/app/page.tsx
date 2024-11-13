import { getAuthState } from "@/auth/server-operations";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Home.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home() {
  const t = await getTranslations("Home");

  const authStateResponse = await getAuthState();

  return (
    <div className="grow flex flex-col p-4">
      <h1>{t("h1")}</h1>

      <div className="grow flex justify-center items-center">
        {!authStateResponse.data?.loggedIn && (
          <div className="card bg-base-200 w-96 shadow-xl">
            <div className="p-4">
              <Image
                src="/login_illustration.svg"
                alt=""
                width={5000}
                height={5000}
              />
            </div>

            <div className="card-body">
              <h2 className="card-title">{t("Cards.LoginCard.heading")}</h2>
              <p>{t("Cards.LoginCard.description")}</p>
              <div className="card-actions justify-end">
                <Link className="btn btn-primary" href={"login"}>
                  {t("Cards.LoginCard.action")}
                </Link>
              </div>
            </div>
          </div>
        )}

        {authStateResponse.data?.loggedIn && (
          <div className="card bg-base-200 w-96 shadow-xl">
            <div className="p-4">
              <Image
                src="/account_illustration.svg"
                alt=""
                width={5000}
                height={5000}
              />
            </div>

            <div className="card-body">
              <h2 className="card-title">{t("Cards.AccountCard.heading")}</h2>
              <p>{t("Cards.AccountCard.description")}</p>
              <div className="card-actions justify-end">
                <Link className="btn btn-primary" href={"account"}>
                  {t("Cards.AccountCard.action")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
