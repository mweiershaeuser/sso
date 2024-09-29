"use client";

import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/userSlice";

export default function UserDetails() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <p className="font-display font-bold text-5xl my-3">
        Hallo <span className="text-primary">{user.givenName}</span>!
      </p>
      <h2>Deine Daten</h2>
      <p>Benutzername: {user.username}</p>
      <p>E-Mail: {user.email}</p>
      <p>Vorname: {user.givenName}</p>
      <p>Nachname: {user.familyName}</p>
    </>
  );
}
