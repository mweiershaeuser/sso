"use server";

import { cookies } from "next/headers";
import { getSessionInfo } from "./api-calls";
import { ServerResponse } from "./models/server-response";
import Session from "./models/session";
import { getSessionFromCookie } from "./server-operations";

export async function createSession(
  _prevState: any,
  formData: FormData,
): Promise<ServerResponse> {
  const cookieStore = cookies();

  const user = formData.get("user");
  const stayLoggedIn = formData.get("stayLoggedIn") === "on";

  if (!user || user.toString().length < 1) {
    return {
      type: "error",
      errors: { user: "Bitte Benutzernamen eingeben!" },
    };
  }

  try {
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

    if (response.status !== 201) {
      switch (response.status) {
        case 404:
          return {
            type: "error",
            errors: { user: "Der Benutzer konnte nicht gefunden werden." },
          };

        default:
          return { type: "error", message: "Es ist ein Fehler aufgetreten." };
      }
    }

    const { sessionId, sessionToken }: Session = await response.json();
    const session: Session = { sessionId, sessionToken, stayLoggedIn };

    const sessionInfoResponse = await getSessionInfo(session);

    if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
      return sessionInfoResponse;
    }

    cookieStore.set(`session`, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      ...(session.stayLoggedIn
        ? {
            expires: new Date(sessionInfoResponse.data.session.expirationDate),
          }
        : {}),
    });

    return { type: "success" };
  } catch (error) {
    return {
      type: "error",
      message: "Der Server konnte nicht erreicht werden.",
    };
  }
}

export async function authenticateWithPassword(
  _prevState: any,
  formData: FormData,
): Promise<ServerResponse> {
  const cookieStore = cookies();

  const session = getSessionFromCookie();

  if (!session) {
    return {
      type: "error",
      message:
        "Es wurde keine Session gefunden. Bitte zuerst einen gültigen Benutzernamen eingeben.",
    };
  }

  const password = formData.get("password");

  if (!password || password.toString().length < 1) {
    return {
      type: "error",
      errors: { password: "Bitte Passwort eingeben!" },
    };
  }

  try {
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

    if (response.status !== 200) {
      switch (response.status) {
        case 400:
          return {
            type: "error",
            errors: { password: "Das Passwort ist falsch." },
          };

        default:
          return { type: "error", message: "Es ist ein Fehler aufgetreten." };
      }
    }

    const updatedSession: { sessionToken: string } = await response.json();
    session.sessionToken = updatedSession.sessionToken;

    const sessionInfoResponse = await getSessionInfo(session);

    if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
      return sessionInfoResponse;
    }

    cookieStore.set(`session`, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      ...(session.stayLoggedIn
        ? { expires: new Date(sessionInfoResponse.data.session.expirationDate) }
        : {}),
    });

    return { type: "success" };
  } catch (error) {
    return {
      type: "error",
      message: "Der Server konnte nicht erreicht werden.",
    };
  }
}

export async function deleteSession(): Promise<ServerResponse> {
  const cookieStore = cookies();

  const session = getSessionFromCookie();

  if (!session) {
    return {
      type: "error",
      message: "Es wurde keine Session gefunden.",
    };
  }

  try {
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
      return { type: "error", message: "Es ist ein Fehler aufgetreten." };
    }

    cookieStore.delete(`session`);

    return { type: "success" };
  } catch (error) {
    return {
      type: "error",
      message: "Der Server konnte nicht erreicht werden.",
    };
  }
}
