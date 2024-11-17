"use client";

import { deleteSession } from "@/auth/server-actions";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";
import { useTranslations } from "next-intl";

export default function UsernameDisplay() {
  const { username, givenName, familyName } = useAppSelector(selectUser);

  const t = useTranslations("Login.LoginForm.UsernameDisplay");

  return (
    <>
      <p className="mb-2">{t("login-as")}:</p>
      <div className="flex flex-col sm:flex-row items-center justify-between bg-base-100 rounded-lg shadow p-4 gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full">
              <span className="text-lg">
                {givenName[0]?.toUpperCase()}
                {familyName[0]?.toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <p className="font-bold m-0 text-center sm:text-left">{`${givenName} ${familyName}`}</p>
            <p className="italic m-0  text-center sm:text-left">{username}</p>
          </div>
        </div>
        <div>
          <button
            className="btn btn-circle btn-outline btn-primary"
            onClick={() => deleteSession()}
          >
            <i
              className="bi bi-x-lg"
              aria-label={t("change-user-button-aria-label")}
              role="img"
            ></i>
          </button>
        </div>
      </div>
    </>
  );
}
