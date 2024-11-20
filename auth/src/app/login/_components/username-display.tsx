"use client";

import { deleteSession } from "@/auth/server-actions";
import Avatar from "@/components/user/avatar";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";
import { useTranslations } from "next-intl";

export default function UsernameDisplay() {
  const user = useAppSelector(selectUser);
  const { username, givenName, familyName } = user;

  const t = useTranslations("Login.LoginForm.UsernameDisplay");

  return (
    <>
      <p className="mb-2">{t("login-as")}:</p>
      <div className="flex flex-col sm:flex-row items-center justify-between bg-base-100 rounded-lg shadow p-4 gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Avatar user={user} />
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
