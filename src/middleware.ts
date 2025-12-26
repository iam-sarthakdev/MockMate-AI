import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log("Middleware Token Check:", { path: request.nextUrl.pathname, hasToken: !!token });

  const url = request.nextUrl;

  const isAuthPage =
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/sign-up");

  const protectedRoutes = ["/", "/interview"];
  const isProtected = protectedRoutes.includes(url.pathname);

  // Always allow auth pages
  if (isAuthPage) return NextResponse.next();

  // Block protected pages if user not logged in
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/landingPage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (except /api/auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public files (public folder)
     */
    '/((?!api(?!/auth)|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
