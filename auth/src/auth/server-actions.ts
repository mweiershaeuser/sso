"use server";

import { cookies } from "next/headers";
import { getSessionInfo } from "./api-calls";
import Session from "./models/session";
import { getSessionFromCookie } from "./server-operations";

export async function createSession(formData: FormData) {
  const cookieStore = cookies();

  const user = formData.get("user");
  const stayLoggedIn = formData.get("stayLoggedIn") === "on";

  const response = await fetch(`${process.env.ZITADEL_HOST}/v2/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.ZITADEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      checks: {
        user: {
          loginName: user,
        },
      },
      lifetime: "2592000s",
    }),
  });

  const { sessionId, sessionToken }: Session = await response.json();
  const session: Session = { sessionId, sessionToken, stayLoggedIn };

  const sessionInfo = await getSessionInfo(session);

  cookieStore.set(`session`, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    ...(session.stayLoggedIn
      ? { expires: new Date(sessionInfo.session.expirationDate) }
      : {}),
  });
}

export async function authenticateWithPassword(formData: FormData) {
  const cookieStore = cookies();

  const session = getSessionFromCookie();

  if (!session) {
    return;
  }

  const password = formData.get("password");

  const response = await fetch(
    `${process.env.ZITADEL_HOST}/v2/sessions/${session.sessionId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.ZITADEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        checks: {
          password: {
            password: password,
          },
        },
        lifetime: "2592000s",
      }),
    },
  );
  const updatedSession: { sessionToken: string } = await response.json();
  session.sessionToken = updatedSession.sessionToken;

  const sessionInfo = await getSessionInfo(session);

  cookieStore.set(`session`, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    ...(session.stayLoggedIn
      ? { expires: new Date(sessionInfo.session.expirationDate) }
      : {}),
  });
}

export async function deleteSession() {
  const cookieStore = cookies();

  const session = getSessionFromCookie();

  if (!session) {
    return;
  }

  const response = await fetch(
    `${process.env.ZITADEL_HOST}/v2/sessions/${session.sessionId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.ZITADEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        sessionToken: session.sessionToken,
      }),
    },
  );

  if (response.status !== 200) {
    return;
  }

  cookieStore.delete(`session`);
}
