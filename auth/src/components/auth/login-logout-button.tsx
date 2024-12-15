"use client";

import { deleteSession } from "@/auth/server-actions";
import { selectLoggedIn } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLogoutDialog } from "@/store/loginLogoutDialogs/loginLogoutDialogsSlice";
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
  const dispatch = useAppDispatch();

  const loginOrLogout = useCallback(() => {
    if (!loggedIn) {
      router.push("/login");
    } else {
      deleteSession();
      dispatch(setLogoutDialog(true));
    }
    if (buttonCallback) {
      buttonCallback();
    }
  }, [buttonCallback, dispatch, loggedIn, router]);

  return (
    <button className="btn btn-primary" onClick={loginOrLogout}>
      {!loggedIn ? t("loginButtonText") : t("logoutButtonText")}
    </button>
  );
}
