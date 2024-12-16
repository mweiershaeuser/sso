import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="grow flex flex-col p-4">
      <div className="grow flex justify-center items-center">
        <div className="card bg-base-200 w-96 shadow-xl">
          <div className="p-4">
            <Image
              src="/notfound_illustration.svg"
              alt=""
              width={5000}
              height={5000}
            />
          </div>

          <div className="card-body">
            <h1 className="card-title">{t("card.title")}</h1>
            <p>{t("card.description")}</p>
            <div className="card-actions justify-end">
              <Link className="btn btn-primary" href={"/"}>
                {t("card.action")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
