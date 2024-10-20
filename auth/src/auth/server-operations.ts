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
  getPrimaryAuthFactorsFromSessionInfo,
  getSecondaryAuthFactorsFromAuthMethods,
  getSecondaryAuthFactorsFromSessionInfo,
  PrimaryAuthFactor,
  SecondaryAuthFactor,
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
    authenticatedAuthFactors: { primary: [], secondary: [] },
    loggedIn: false,
  };
  if (!session) {
    return {
      type: "success",
      data: authState,
    };
  }

  const sessionInfoResponse = await getSessionInfo(session);
  if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
    return {
      type: "error",
      messageT: sessionInfoResponse.messageT,
      data: authState,
    };
  }

  const availableAuthMethodsResponse = await getAvailableAuthMethods(
    sessionInfoResponse.data.session.factors.user.id,
  );
  if (
    availableAuthMethodsResponse.type === "error" ||
    !availableAuthMethodsResponse.data
  ) {
    return {
      type: "error",
      messageT: availableAuthMethodsResponse.messageT,
      data: authState,
    };
  }

  authState.sessionCreated = true;
  authState.availableAuthFactors = {
    primary: getPrimaryAuthFactorsFromAuthMethods(
      availableAuthMethodsResponse.data,
    ),
    secondary: getSecondaryAuthFactorsFromAuthMethods(
      availableAuthMethodsResponse.data,
    ),
  };
  authState.authenticatedAuthFactors = {
    primary: getPrimaryAuthFactorsFromSessionInfo(sessionInfoResponse.data),
    secondary: getSecondaryAuthFactorsFromSessionInfo(sessionInfoResponse.data),
  };

  if (
    authState.authenticatedAuthFactors.primary.includes(
      PrimaryAuthFactor.WEB_AUTH_N,
    ) ||
    (authState.authenticatedAuthFactors.primary.includes(
      PrimaryAuthFactor.PASSWORD,
    ) &&
      authState.authenticatedAuthFactors.secondary.includes(
        SecondaryAuthFactor.TOTP,
      ))
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
  const emptyUser = {
    id: "",
    username: "",
    givenName: "",
    familyName: "",
    email: "",
  };
  if (!session) {
    return {
      type: "success",
      data: emptyUser,
    };
  }
  const authStateResponse = await getAuthStateFromSession(session);
  if (authStateResponse.type === "error" || !authStateResponse.data) {
    return {
      type: "error",
      messageT: authStateResponse.messageT,
      data: emptyUser,
    };
  }
  const sessionCreatedButNotAuthenticated =
    authStateResponse.data.sessionCreated && !authStateResponse.data.loggedIn;

  const sessionInfoResponse = await getSessionInfo(session);
  if (sessionInfoResponse.type === "error" || !sessionInfoResponse.data) {
    return {
      type: "error",
      messageT: sessionInfoResponse.messageT,
      data: emptyUser,
    };
  }

  const userInfoResponse = await getUserInfo(
    sessionInfoResponse.data.session.factors.user.id,
  );
  if (userInfoResponse.type === "error" || !userInfoResponse.data) {
    return {
      type: "error",
      messageT: userInfoResponse.messageT,
      data: emptyUser,
    };
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
