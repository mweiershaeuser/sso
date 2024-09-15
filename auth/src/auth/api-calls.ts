import Session from "./models/session";
import { AuthMethod } from "./models/zitadel/auth-method";
import SessionInfo from "./models/zitadel/session-info";
import UserInfo from "./models/zitadel/user-info";

export async function getSessionInfo(session: Session) {
  const response = await fetch(
    `${process.env.ZITADEL_HOST}/v2/sessions/${session.sessionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ZITADEL_ACCESS_TOKEN}`,
      },
    },
  );
  const sessionInfo: SessionInfo = await response.json();
  return sessionInfo;
}

export async function getAvailableAuthMethods(userId: string) {
  const response = await fetch(
    `${process.env.ZITADEL_HOST}/v2/users/${userId}/authentication_methods`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ZITADEL_ACCESS_TOKEN}`,
      },
    },
  );
  const authMethodsInfo: { authMethodTypes: AuthMethod[] } =
    await response.json();
  return authMethodsInfo.authMethodTypes;
}

export async function getUserInfo(userId: string) {
  const response = await fetch(
    `${process.env.ZITADEL_HOST}/v2/users/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ZITADEL_ACCESS_TOKEN}`,
      },
    },
  );
  const userInfo: UserInfo = await response.json();
  return userInfo;
}
