"use client";

import { deleteSession } from "@/auth/server-actions";
import { selectLoggedIn } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function LoginLogoutButton({
  buttonCallback,
}: {
  buttonCallback?: () => void;
}) {
  const router = useRouter();
  const t = useTranslations("components.auth.LoginLogoutButton");

  const loggedIn = useAppSelector(selectLoggedIn);

  const loginOrLogout = useCallback(() => {
    if (!loggedIn) {
      router.push("/login");
    } else {
      deleteSession();
    }
    if (buttonCallback) {
      buttonCallback();
    }
  }, [buttonCallback, loggedIn, router]);

  return (
    <button className="btn btn-primary" onClick={loginOrLogout}>
      {!loggedIn ? t("loginButtonText") : t("logoutButtonText")}
    </button>
  );
}
