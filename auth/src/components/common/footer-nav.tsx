"use client";

import { useTranslations } from "next-intl";
import NavLink from "./nav-link";

export default function FooterNav() {
  const t = useTranslations("components.common.FooterNav");

  return (
    <nav aria-label={t("navAriaLabel")}>
      <ul className={`flex flex-col md:flex-row items-center gap-3 md:gap-5`}>
        <li>
          <NavLink path={"/imprint"} label={t("links.imprint")}></NavLink>
        </li>
        <li>
          <NavLink path={"/privacy"} label={t("links.privacy")}></NavLink>
        </li>
        <li>
          <NavLink path={"/sitemap"} label={t("links.sitemap")}></NavLink>
        </li>
      </ul>
    </nav>
  );
}
