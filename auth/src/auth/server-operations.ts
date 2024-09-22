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

export async function getAuthStateFromSession(session?: Session) {
  const authState: AuthState = {
    sessionCreated: false,
    availableAuthFactors: { primary: [], secondary: [] },
    loggedIn: false,
  };
  if (!session) {
    return authState;
  }

  authState.sessionCreated = true;
  const sessionInfo = await getSessionInfo(session);

  const availableAuthMethods = await getAvailableAuthMethods(
    sessionInfo.session.factors.user.id,
  );
  authState.availableAuthFactors = {
    primary: getPrimaryAuthFactorsFromAuthMethods(availableAuthMethods),
    secondary: getSecondaryAuthFactorsFromAuthMethods(availableAuthMethods),
  };

  if (
    sessionInfo.session.factors.webAuthN ||
    sessionInfo.session.factors.password
    /* (sessionInfo.session.factors.password  && sessionInfo.session.factors.totp) */
  ) {
    authState.loggedIn = true;
  }

  return authState;
}

export async function getAuthState() {
  const session = getSessionFromCookie();
  return getAuthStateFromSession(session);
}

export async function getUserFromSession(session?: Session): Promise<User> {
  if (!session) {
    return {
      id: "",
      username: "",
      givenName: "",
      familyName: "",
      email: "",
    };
  }
  const authState = await getAuthStateFromSession(session);
  const sessionCreatedButNotAuthenticated = !(
    authState.sessionCreated && authState.loggedIn
  );

  const sessionInfo = await getSessionInfo(session);
  const userInfo = await getUserInfo(sessionInfo.session.factors.user.id);

  return {
    id: sessionCreatedButNotAuthenticated ? "" : userInfo.user.userId,
    username: userInfo.user.username,
    givenName: userInfo.user.human.profile.givenName,
    familyName: userInfo.user.human.profile.familyName,
    email: sessionCreatedButNotAuthenticated
      ? ""
      : userInfo.user.human.email.email,
  };
}

export async function getUser() {
  const session = getSessionFromCookie();
  return getUserFromSession(session);
}
