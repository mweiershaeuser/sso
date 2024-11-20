"use client";

import { selectAuth } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { TextSize } from "../models/style-types";
import NavLink from "./nav-link";

export default function Nav({
  navCallback,
  vertical = false,
  textBold = false,
  textSize = "text-base",
}: {
  navCallback?: () => void;
  vertical?: boolean;
  textBold?: boolean;
  textSize?: TextSize;
}) {
  const t = useTranslations("components.common.Nav");
  const { loggedIn } = useAppSelector(selectAuth);

  return (
    <nav aria-label={t("navAriaLabel")}>
      <ul
        className={`font-display ${textBold ? "font-bold" : ""} ${textSize} flex ${vertical ? "flex-col" : "flex-row"} gap-5`}
      >
        <li>
          <NavLink
            path={"/"}
            label={t("links.home")}
            linkCallback={navCallback}
          ></NavLink>
        </li>
        {!loggedIn && (
          <li>
            <NavLink
              path={"/login"}
              label={t("links.login")}
              linkCallback={navCallback}
            ></NavLink>
          </li>
        )}
        {loggedIn && (
          <li>
            <NavLink
              path={"/account"}
              label={t("links.account")}
              linkCallback={navCallback}
            ></NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
