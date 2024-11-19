"use client";

import LoginLogoutButton from "@/components/auth/login-logout-button";
import Logo from "@/components/common/logo";
import LocaleSwitch from "@/components/i18n/locale-switch";
import Avatar from "@/components/user/avatar";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useRef } from "react";
import Nav from "../../components/common/nav";

export default function Menu() {
  const t = useTranslations("RootLayout.Header.Menu");

  const user = useAppSelector(selectUser);

  const menuButton = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openMenu = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
    menuButton.current?.focus();
  }, []);

  return (
    <>
      <button
        className="btn btn-ghost btn-circle"
        onClick={openMenu}
        ref={menuButton}
      >
        <i
          className="bi bi-list text-2xl"
          aria-label={t("openMenuIconLabel")}
          role="img"
        ></i>
      </button>
      <dialog
        ref={dialogRef}
        className="min-w-full min-h-full m-0 p-6 open:flex flex-col"
      >
        <div className="flex justify-between mb-10">
          <Link
            href="/"
            className="btn btn-ghost"
            title={t("logoLinkTitle")}
            onClick={closeMenu}
          >
            <Logo />
          </Link>
          <button
            className="btn btn-ghost btn-circle ml-auto"
            onClick={closeMenu}
            autoFocus
          >
            <i
              className="bi bi-x-lg"
              aria-label={t("closeMenuIconLabel")}
              role="img"
            ></i>
          </button>
        </div>
        <Nav vertical textBold textSize="text-4xl" navCallback={closeMenu} />
        <div className="divider mt-10 mb-3"></div>
        <div className="flex justify-between flex-wrap">
          <div className="flex gap-3 flex-wrap">
            <Avatar user={user} />
            <LoginLogoutButton buttonCallback={closeMenu} />
          </div>
          <LocaleSwitch />
        </div>
      </dialog>
    </>
  );
}
