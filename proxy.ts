import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Cheap redirect for signed-out traffic so protected pages never start
 * rendering. This is not the security boundary: the cookie is only checked for
 * presence, never verified. Real authorization lives in requireAdmin /
 * requireDoctor and in each Server Action.
 */
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
