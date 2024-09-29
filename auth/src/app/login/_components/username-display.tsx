"use client";

import { deleteSession } from "@/auth/server-actions";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";

export default function UsernameDisplay() {
  const { username, givenName, familyName } = useAppSelector(selectUser);
  return (
    <>
      <p className="mb-2">Anmelden als:</p>
      <div className="flex items-center justify-between bg-base-100 rounded-lg shadow p-4">
        <div className="flex items-center gap-5">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full">
              <span className="text-lg">
                {givenName[0]?.toUpperCase()}
                {familyName[0]?.toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-2xl m-0">{`${givenName} ${familyName}`}</p>
            <p className="italic m-0">{username}</p>
          </div>
        </div>
        <div>
          <button
            className="btn btn-circle btn-outline"
            onClick={() => deleteSession()}
          >
            <i
              className="bi bi-x-lg"
              aria-label="Benutzer:in ändern"
              role="img"
            ></i>
          </button>
        </div>
      </div>
    </>
  );
}
