import AuthState from "@/auth/models/auth-state";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { cookies } from "next/headers";
import {
  getAvailableAuthMethods,
  getSessionInfo,
  getUserInfo,
} from "./api-calls";
import {
  getPrimaryAuthFactorsFromAuthMethods,
  getSecondaryAuthFactorsFromAuthMethods,
} from "./models/auth-factors";
import { ServerResponse } from "./models/server-response";
import Session from "./models/session";
import { User } from "./models/user";

export function getSession(
  cookies: Pick<ReadonlyRequestCookies | RequestCookies, "get">,
): Session | undefined {
  const sessionCookie = cookies.get("session");

  if (!sessionCookie || !sessionCookie.value) {
    return undefined;
  }

  const session: {
    sessionId?: string;
    sessionToken?: string;
    stayLoggedIn?: boolean;
  } = JSON.parse(sessionCookie.value ?? "{}");
  if (
    session &&
    session.sessionId &&
    session.sessionToken &&
    session.stayLoggedIn !== undefined
  ) {
    return {
      sessionId: session.sessionId,
      sessionToken: session.sessionToken,
      stayLoggedIn: session.stayLoggedIn,
    };
  }
  return undefined;
}

export function getSessionFromCookie(): Session | undefined {
  const cookieStore = cookies();
  return getSession(cookieStore);
}

export async function getAuthStateFromSession(
  session?: Session,
): Promise<ServerResponse<AuthState>> {
  const authState: AuthState = {
    sessionCreated: false,
    availableAuthFactors: { primary: [], secondary: [] },
    loggedIn: false,
  };
  if (!session) {
    return {
      type: "error",
      message: "Es wurde keine Session gefunden.",
    };
  }

  authState.sessionCreated = true;

  const sessionInfoResponse = await getSessionInfo(session);
  if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
    return { type: "error", message: sessionInfoResponse.message };
  }

  const availableAuthMethodsResponse = await getAvailableAuthMethods(
    sessionInfoResponse.data.session.factors.user.id,
  );
  if (
    availableAuthMethodsResponse.type === "error" ||
    !availableAuthMethodsResponse.data
  ) {
    return { type: "error", message: availableAuthMethodsResponse.message };
  }
  authState.availableAuthFactors = {
    primary: getPrimaryAuthFactorsFromAuthMethods(
      availableAuthMethodsResponse.data,
    ),
    secondary: getSecondaryAuthFactorsFromAuthMethods(
      availableAuthMethodsResponse.data,
    ),
  };

  if (
    sessionInfoResponse.data.session.factors.webAuthN ||
    sessionInfoResponse.data.session.factors.password
    /* (sessionInfoResponse.data.session.factors.password  && sessionInfoResponse.data.session.factors.totp) */
  ) {
    authState.loggedIn = true;
  }

  return { type: "success", data: authState };
}

export async function getAuthState() {
  const session = getSessionFromCookie();
  return getAuthStateFromSession(session);
}

export async function getUserFromSession(
  session?: Session,
): Promise<ServerResponse<User>> {
  if (!session) {
    return {
      type: "error",
      message: "Es wurde keine Session gefunden.",
    };
  }
  const authStateResponse = await getAuthStateFromSession(session);
  if (authStateResponse.type === "error" || !authStateResponse.data) {
    return { type: "error", message: authStateResponse.message };
  }
  const sessionCreatedButNotAuthenticated =
    authStateResponse.data.sessionCreated && !authStateResponse.data.loggedIn;

  const sessionInfoResponse = await getSessionInfo(session);
  if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
    return { type: "error", message: sessionInfoResponse.message };
  }

  const userInfoResponse = await getUserInfo(
    sessionInfoResponse.data.session.factors.user.id,
  );
  if (userInfoResponse.type === "error" || !userInfoResponse.data) {
    return { type: "error", message: userInfoResponse.message };
  }

  return {
    type: "success",
    data: {
      id: sessionCreatedButNotAuthenticated
        ? ""
        : userInfoResponse.data.user.userId,
      username: userInfoResponse.data.user.username,
      givenName: userInfoResponse.data.user.human.profile.givenName,
      familyName: userInfoResponse.data.user.human.profile.familyName,
      email: sessionCreatedButNotAuthenticated
        ? ""
        : userInfoResponse.data.user.human.email.email,
    },
  };
}

export async function getUser() {
  const session = getSessionFromCookie();
  return getUserFromSession(session);
}
