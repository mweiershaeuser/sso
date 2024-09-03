"use server";

import { cookies } from "next/headers";

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
    }),
  });

  const session = await response.json();

  cookieStore.set("sessionId", session.sessionId, { httpOnly: true });
  cookieStore.set("sessionToken", session.sessionToken, { httpOnly: true });
}
