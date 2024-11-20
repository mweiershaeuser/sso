"use client";

import { User } from "@/auth/models/user";
import { useTranslations } from "next-intl";

export default function Avatar({ user }: { user: User }) {
  const t = useTranslations("components.user.Avatar");

  return (
    <div className={`avatar placeholder`}>
      <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full">
        {user.givenName.length >= 1 && user.familyName.length >= 1 ? (
          <span
            className="text-lg"
            aria-label={`${t("userInitialsLabel")} ${user.givenName} ${user.familyName}`}
          >
            <abbr
              title={`${user.givenName} ${user.familyName}`}
              className="no-underline"
            >
              {user.givenName[0]?.toUpperCase()}
              {user.familyName[0]?.toUpperCase()}
            </abbr>
          </span>
        ) : (
          <i
            className="bi bi-person-fill text-2xl"
            title={t("userIconLabel")}
            aria-label={t("userIconLabel")}
            role="img"
          ></i>
        )}
      </div>
    </div>
  );
}
