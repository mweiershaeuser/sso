"use client";

import Alert from "@/components/common/alert";
import Dialog from "@/components/common/dialog";
import { loginSuccessfulSearchParamKey } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectLoginLogoutDialogs,
  setLoginDialog,
  setLogoutDialog,
} from "@/store/loginLogoutDialogs/loginLogoutDialogsSlice";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function LoginLogoutDialogs() {
  const t = useTranslations("RootLayout.LoginLogoutDialogs");

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const loginSuccessful = !!searchParams.get(loginSuccessfulSearchParamKey);

  const { loginDialog, logoutDialog } = useAppSelector(
    selectLoginLogoutDialogs,
  );
  const dispatch = useAppDispatch();

  const setLoginDialogCallback = useCallback(
    (open: boolean) => {
      dispatch(setLoginDialog(open));
    },
    [dispatch],
  );

  const setLogoutDialogCallback = useCallback(
    (open: boolean) => {
      dispatch(setLogoutDialog(open));
    },
    [dispatch],
  );

  useEffect(() => {
    if (loginSuccessful) {
      const newSp = new URLSearchParams(searchParams);
      newSp.delete(loginSuccessfulSearchParamKey);
      router.replace(`${path}${newSp.size > 0 ? `?${newSp.toString()}` : ""}`);

      dispatch(setLoginDialog(true));
    }
  }, [dispatch, loginSuccessful]);

  return (
    <>
      <Dialog open={loginDialog} setOpen={setLoginDialogCallback}>
        <Alert type={"success"}>
          <p className="m-0">{t("loginDialogMessage")}</p>
        </Alert>
      </Dialog>
      <Dialog open={logoutDialog} setOpen={setLogoutDialogCallback}>
        <Alert type={"success"}>
          <p className="m-0">{t("logoutDialogMessage")}</p>
        </Alert>
      </Dialog>
    </>
  );
}
