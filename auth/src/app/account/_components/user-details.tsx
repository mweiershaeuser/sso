"use client";

import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";
import { useTranslations } from "next-intl";

export default function UserDetails() {
  const user = useAppSelector(selectUser);

  const t = useTranslations("Account.UserDetails");

  return (
    <>
      <p className="font-display font-bold text-5xl my-3">
        {t("greeting")} <span className="text-primary">{user.givenName}</span>!
      </p>
      <h2>{t("heading")}</h2>
      <p>
        {t("UserData.username")}: {user.username}
      </p>
      <p>
        {t("UserData.email")}: {user.email}
      </p>
      <p>
        {t("UserData.given-name")}: {user.givenName}
      </p>
      <p>
        {t("UserData.family-name")}: {user.familyName}
      </p>
    </>
  );
}
