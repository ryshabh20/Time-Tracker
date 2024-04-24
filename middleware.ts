import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/";

  const token = request.cookies.get("authtoken")?.value || "";

  let user;
  try {
    user = token
      ? await jwtVerify(token, new TextEncoder().encode(process.env.SECRET))
      : null;
  } catch (error) {
    user = null;
  }

  if (!isPublicPath && !user) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicPath && user) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  if (
    (request.nextUrl.pathname.startsWith("/clients/admin") ||
      request.nextUrl.pathname.startsWith("/projects/admin") ||
      request.nextUrl.pathname.startsWith("/employees/admin")) &&
    user?.payload?.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
