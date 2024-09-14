"use server";

import { cookies } from "next/headers";
import { UserSession } from "./_models/user-session";

export interface User {
  id: string;
  username: string;
}

interface SessionInfo {
  session: {
    id: string;
    creationDate: string;
    changeDate: string;
    sequence: string;
    factors: {
      user: {
        verifiedAt: string;
        id: string;
        loginName: string;
        displayName: string;
        organizationId: string;
      };
      password: {
        verifiedAt: string;
      };
      webAuthN: {
        verifiedAt: string;
        userVerified: boolean;
      };
      intent: {
        verifiedAt: string;
      };
      totp: {
        verifiedAt: string;
      };
      otpSms: {
        verifiedAt: string;
      };
      otpEmail: {
        verifiedAt: string;
      };
    };
    metadata: {};
    userAgent: {
      fingerprintId: string;
      ip: string;
      description: string;
      header: {};
    };
    expirationDate: string;
  };
}

export async function login(formData: FormData) {
  const cookieStore = cookies();

  const user = formData.get("user");
  const password = formData.get("password");

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
        password: {
          password: password,
        },
      },
      lifetime: "30s",
    }),
  });

  const { sessionId, sessionToken }: UserSession = await response.json();
  const session: UserSession = { sessionId, sessionToken };

  const sessionInfo = await fetchSessionInfo(session);

  cookieStore.set(`session`, JSON.stringify(session), {
    httpOnly: true,
    expires: new Date(sessionInfo.session.expirationDate),
  });
}

export async function getUserInfo() {
  const cookieStore = cookies();

  const session: UserSession = JSON.parse(
    cookieStore.get("session")?.value ?? "{}",
  );
  const sessionInfo = await fetchSessionInfo(session);
  const user: User = {
    id: sessionInfo.session.factors.user.id,
    username: sessionInfo.session.factors.user.loginName,
  };
  console.log(user);
}

async function fetchSessionInfo(session: UserSession) {
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
