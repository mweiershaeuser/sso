import { getAuthStateFromSession, getSession } from "@/auth/server-operations";
import { NextRequest, NextResponse } from "next/server";

function getAuthStateFromRequest(request: NextRequest) {
  const cookies = request.cookies;
  const session = getSession(cookies);
  const authState = getAuthStateFromSession(session);
  return authState;
}

const protectedRoute = async (request: NextRequest) => {
  const authState = await getAuthStateFromRequest(request);
  if (!authState.loggedIn) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
};

const loginOrSignUpRoute = async (request: NextRequest) => {
  const authState = await getAuthStateFromRequest(request);
  if (authState.loggedIn) {
    return NextResponse.redirect(new URL("/account", request.nextUrl));
  }
};

const routes = new Map<
  string,
  (request: NextRequest) => Promise<NextResponse | undefined>
>([
  ["/login", loginOrSignUpRoute],
  ["/account", protectedRoute],
]);

export async function routeProtectionMiddleware(request: NextRequest) {
  const routeResponse = routes.get(request.nextUrl.pathname);
  if (routeResponse) {
    return await routeResponse(request);
  }
}
