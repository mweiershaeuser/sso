"use server";

import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { getSessionInfo } from "./api-calls";
import { ServerResponse } from "./models/server-response";
import Session from "./models/session";
import {
  PasskeyRegistrationCodeResponse,
  StartPasskeyRegistrationResponse,
} from "./models/zitadel/passkey-registration";
import UpdatedSessionResponse from "./models/zitadel/updated-session-response";
import { getSessionFromCookie, getUserFromSession } from "./server-operations";

export async function createSession(
  _prevState: any,
  formData: FormData,
): Promise<ServerResponse> {
  const t = await getTranslations();

  const cookieStore = cookies();

  const user = formData.get("user");
  const stayLoggedIn = formData.get("stayLoggedIn") === "on";

  if (!user || user.toString().length < 1) {
    return {
      type: "error",
      errors: {
        user: t("auth.serverActions.createSession.errorMessages.emptyUsername"),
      },
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
            errors: {
              user: t(
                "auth.serverActions.createSession.errorMessages.userNotFound",
              ),
            },
          };

        default:
          return { type: "error", message: t("global.errorMessages.generic") };
      }
    }

    const { sessionId, sessionToken }: Session = await response.json();
    const session: Session = { sessionId, sessionToken, stayLoggedIn };

    const sessionInfoResponse = await getSessionInfo(session);

    if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
      const message = sessionInfoResponse.messageT
        ? t(sessionInfoResponse.messageT)
        : t("global.errorMessages.generic");
      return { type: "error", message };
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
      message: t("global.errorMessages.serverError"),
    };
  }
}

export async function authenticateWithPassword(
  _prevState: any,
  formData: FormData,
): Promise<ServerResponse> {
  const t = await getTranslations();

  const cookieStore = cookies();

  const session = getSessionFromCookie();

  if (!session) {
    return {
      type: "error",
      message: t(
        "auth.serverActions.authenticateWithPassword.errorMessages.noSessionFound",
      ),
    };
  }

  const password = formData.get("password");

  if (!password || password.toString().length < 1) {
    return {
      type: "error",
      errors: {
        password: t(
          "auth.serverActions.authenticateWithPassword.errorMessages.emptyPassword",
        ),
      },
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
            errors: {
              password: t(
                "auth.serverActions.authenticateWithPassword.errorMessages.passwordIncorrect",
              ),
            },
          };

        default:
          return { type: "error", message: t("global.errorMessages.generic") };
      }
    }

    const updatedSession: { sessionToken: string } = await response.json();
    session.sessionToken = updatedSession.sessionToken;

    const sessionInfoResponse = await getSessionInfo(session);

    if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
      const message = sessionInfoResponse.messageT
        ? t(sessionInfoResponse.messageT)
        : t("global.errorMessages.generic");
      return { type: "error", message };
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
      message: t("global.errorMessages.serverError"),
    };
  }
}

export async function authenticateWithTotp(
  _prevState: any,
  formData: FormData,
): Promise<ServerResponse> {
  const t = await getTranslations();

  const cookieStore = cookies();

  const session = getSessionFromCookie();

  if (!session) {
    return {
      type: "error",
      message: t(
        "auth.serverActions.authenticateWithTotp.errorMessages.noSessionFound",
      ),
    };
  }

  const totp = formData.get("totp");

  if (!totp || totp.toString().length !== 6) {
    return {
      type: "error",
      errors: {
        totp: t(
          "auth.serverActions.authenticateWithTotp.errorMessages.emptyTotp",
        ),
      },
    };
  }
  if (Object.is(parseInt(totp.toString()), NaN)) {
    return {
      type: "error",
      errors: {
        totp: t(
          "auth.serverActions.authenticateWithTotp.errorMessages.invalidCharacters",
        ),
      },
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
            totp: {
              code: totp,
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
            errors: {
              totp: t(
                "auth.serverActions.authenticateWithTotp.errorMessages.totpIncorrect",
              ),
            },
          };

        default:
          return { type: "error", message: t("global.errorMessages.generic") };
      }
    }

    const updatedSession: { sessionToken: string } = await response.json();
    session.sessionToken = updatedSession.sessionToken;

    const sessionInfoResponse = await getSessionInfo(session);

    if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
      const message = sessionInfoResponse.messageT
        ? t(sessionInfoResponse.messageT)
        : t("global.errorMessages.generic");
      return { type: "error", message };
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
      message: t("global.errorMessages.serverError"),
    };
  }
}

export async function startWebauthnRegistration(): Promise<
  ServerResponse<{
    passkeyId: string;
    creationOptions: StartPasskeyRegistrationResponse["publicKeyCredentialCreationOptions"]["publicKey"];
  }>
> {
  const t = await getTranslations();

  const session = getSessionFromCookie();
  if (!session) {
    return {
      type: "error",
      message: t(
        "auth.serverActions.startWebauthnRegistration.errorMessages.noSessionFound",
      ),
    };
  }

  const userResponse = await getUserFromSession(session);
  if (userResponse.type === "error" || !userResponse.data) {
    const message = userResponse.messageT
      ? t(userResponse.messageT)
      : t("global.errorMessages.generic");
    return { type: "error", message };
  }

  try {
    const requestRegistrationCodeResponse = await fetch(
      `${process.env.ZITADEL_HOST}/v2/users/${userResponse.data.id}/passkeys/registration_link`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.ZITADEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          returnCode: {},
        }),
      },
    );
    if (requestRegistrationCodeResponse.status !== 200) {
      switch (requestRegistrationCodeResponse.status) {
        default:
          return { type: "error", message: t("global.errorMessages.generic") };
      }
    }
    const { code }: PasskeyRegistrationCodeResponse =
      await requestRegistrationCodeResponse.json();

    const startPasskeyRegistrationResponse = await fetch(
      `${process.env.ZITADEL_HOST}/v2/users/${userResponse.data.id}/passkeys`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.ZITADEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          code,
          authenticator: "PASSKEY_AUTHENTICATOR_UNSPECIFIED",
        }),
      },
    );
    if (startPasskeyRegistrationResponse.status !== 200) {
      switch (startPasskeyRegistrationResponse.status) {
        default:
          return { type: "error", message: t("global.errorMessages.generic") };
      }
    }
    const {
      passkeyId,
      publicKeyCredentialCreationOptions: { publicKey },
    }: StartPasskeyRegistrationResponse =
      await startPasskeyRegistrationResponse.json();

    return {
      type: "success",
      data: { passkeyId, creationOptions: publicKey },
    };
  } catch (error) {
    return {
      type: "error",
      message: t("global.errorMessages.serverError"),
    };
  }
}

export async function completeWebauthnRegistration(
  passkeyId: string,
  credentialJson: string,
): Promise<ServerResponse> {
  const t = await getTranslations();

  const session = getSessionFromCookie();
  if (!session) {
    return {
      type: "error",
      message: t(
        "auth.serverActions.completeWebauthnRegistration.errorMessages.noSessionFound",
      ),
    };
  }

  const userResponse = await getUserFromSession(session);
  if (userResponse.type === "error" || !userResponse.data) {
    const message = userResponse.messageT
      ? t(userResponse.messageT)
      : t("global.errorMessages.generic");
    return { type: "error", message };
  }

  try {
    const response = await fetch(
      `${process.env.ZITADEL_HOST}/v2/users/${userResponse.data.id}/passkeys/${passkeyId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.ZITADEL_ACCESS_TOKEN}`,
        },
        body: `{
          "publicKeyCredential": ${credentialJson},
          "passkeyName": "Passkey"
        }`,
      },
    );

    if (response.status !== 200) {
      switch (response.status) {
        default:
          return { type: "error", message: t("global.errorMessages.generic") };
      }
    }

    return {
      type: "success",
    };
  } catch (error) {
    return {
      type: "error",
      message: t("global.errorMessages.serverError"),
    };
  }
}

export async function createWebauthnChallenge(): Promise<
  ServerResponse<
    UpdatedSessionResponse["challenges"]["webAuthN"]["publicKeyCredentialRequestOptions"]["publicKey"]
  >
> {
  const t = await getTranslations();

  const cookieStore = cookies();

  const session = getSessionFromCookie();

  if (!session) {
    return {
      type: "error",
      message: t(
        "auth.serverActions.createWebauthnChallenge.errorMessages.noSessionFound",
      ),
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
          challenges: {
            webAuthN: {
              domain: process.env.APP_HOST,
              userVerificationRequirement:
                "USER_VERIFICATION_REQUIREMENT_REQUIRED",
            },
          },
          lifetime: "2592000s",
        }),
      },
    );

    if (response.status !== 200) {
      switch (response.status) {
        default:
          return { type: "error", message: t("global.errorMessages.generic") };
      }
    }

    const updatedSession: UpdatedSessionResponse = await response.json();
    session.sessionToken = updatedSession.sessionToken;

    const sessionInfoResponse = await getSessionInfo(session);

    if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
      const message = sessionInfoResponse.messageT
        ? t(sessionInfoResponse.messageT)
        : t("global.errorMessages.generic");
      return { type: "error", message };
    }

    cookieStore.set(`session`, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      ...(session.stayLoggedIn
        ? { expires: new Date(sessionInfoResponse.data.session.expirationDate) }
        : {}),
    });

    return {
      type: "success",
      data: updatedSession.challenges.webAuthN.publicKeyCredentialRequestOptions
        .publicKey,
    };
  } catch (error) {
    return {
      type: "error",
      message: t("global.errorMessages.serverError"),
    };
  }
}

export async function authenticateWithWebauthn(
  credentialJson: string,
): Promise<ServerResponse> {
  const t = await getTranslations();

  const cookieStore = cookies();

  const session = getSessionFromCookie();

  if (!session) {
    return {
      type: "error",
      message: t(
        "auth.serverActions.authenticateWithWebauthn.errorMessages.noSessionFound",
      ),
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
        body: `{
          "checks": {
            "webAuthN": {
              "credentialAssertionData": ${credentialJson}
            }
          },
          "lifetime": "2592000s"
        }`,
      },
    );

    if (response.status !== 200) {
      switch (response.status) {
        default:
          return { type: "error", message: t("global.errorMessages.generic") };
      }
    }

    const updatedSession: UpdatedSessionResponse = await response.json();
    session.sessionToken = updatedSession.sessionToken;

    const sessionInfoResponse = await getSessionInfo(session);

    if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
      const message = sessionInfoResponse.messageT
        ? t(sessionInfoResponse.messageT)
        : t("global.errorMessages.generic");
      return { type: "error", message };
    }

    cookieStore.set(`session`, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      ...(session.stayLoggedIn
        ? { expires: new Date(sessionInfoResponse.data.session.expirationDate) }
        : {}),
    });

    return {
      type: "success",
    };
  } catch (error) {
    return {
      type: "error",
      message: t("global.errorMessages.serverError"),
    };
  }
}

export async function deleteSession(): Promise<ServerResponse> {
  const t = await getTranslations();

  const cookieStore = cookies();

  const session = getSessionFromCookie();

  if (!session) {
    return {
      type: "error",
      message: t(
        "auth.serverActions.deleteSession.errorMessages.noSessionFound",
      ),
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

    cookieStore.delete(`session`);

    return { type: "success" };
  } catch (error) {
    cookieStore.delete(`session`);
    return { type: "success" };
  }
}
