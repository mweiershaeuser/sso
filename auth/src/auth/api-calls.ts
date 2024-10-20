import { ServerResponse } from "./models/server-response";
import Session from "./models/session";
import { AuthMethod } from "./models/zitadel/auth-method";
import SessionInfo from "./models/zitadel/session-info";
import UserInfo from "./models/zitadel/user-info";

export async function getSessionInfo(
  session: Session,
): Promise<ServerResponse<SessionInfo>> {
  try {
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
    return { type: "success", data: sessionInfo };
  } catch (error) {
    return {
      type: "error",
      messageT: "global.errorMessages.serverError",
    };
  }
}

export async function getAvailableAuthMethods(
  userId: string,
): Promise<ServerResponse<AuthMethod[]>> {
  try {
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
    return { type: "success", data: authMethodsInfo.authMethodTypes };
  } catch (error) {
    return {
      type: "error",
      messageT: "global.errorMessages.serverError",
    };
  }
}

export async function getUserInfo(
  userId: string,
): Promise<ServerResponse<UserInfo>> {
  try {
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
    return { type: "success", data: userInfo };
  } catch (error) {
    return {
      type: "error",
      messageT: "global.errorMessages.serverError",
    };
  }
}
