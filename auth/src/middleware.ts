import { NextRequest, NextResponse } from "next/server";
import { routeProtectionMiddleware } from "./middleware/auth-middleware";

export async function middleware(request: NextRequest) {
  const routeProtectionResponse = await routeProtectionMiddleware(request);
  if (routeProtectionResponse) {
    return routeProtectionResponse;
  }
  return NextResponse.next();
}
