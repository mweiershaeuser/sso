import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.Sitemap.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Sitemap() {
  const t = useTranslations("legal.Sitemap");

  return (
    <div className="p-4">
      <h1>{t("h1")}</h1>
      <ul>
        <li>
          <Link href={"/"}>{t("links.home")}</Link>
        </li>
        <li>
          <Link href={"/login"}>{t("links.login")}</Link>
        </li>
        <li>
          <Link href={"/account"}>{t("links.account")}</Link>
        </li>
        <li>
          <Link href={"/imprint"}>{t("links.imprint")}</Link>
        </li>
        <li>
          <Link href={"/sitemap"}>{t("links.sitemap")}</Link>
        </li>
      </ul>
    </div>
  );
}
