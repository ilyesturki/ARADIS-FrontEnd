// lib/middleware/authGuard.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function authGuard(
  req: NextRequest
): Promise<NextResponse | void> {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Normalize the pathname to ignore the language prefix
  const normalizedPathname = pathname.replace(/^\/(fr|en)\//, "/");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Safely cast token fields
  const role = typeof token?.role === "string" ? token.role : undefined;
  const userCategory =
    typeof token?.userCategory === "string" ? token.userCategory : undefined;
  const userService =
    typeof token?.userService === "string" ? token.userService : undefined;

  // Public route: /auth (only for NOT logged in)
  if (normalizedPathname.startsWith("/auth")) {
    if (token) {
      const redirectTo =
        role === "admin"
          ? "/dashboard/users"
          : ["top-management", "corporaite"].includes(userCategory || "")
          ? "/dashboard/panel/fps-panel"
          : "/dashboard/fps";
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
    return;
  }

  // Require auth for all other routes
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (normalizedPathname.startsWith("/dashboard/users")) {
    if (role === "admin") return;
    return redirectUnauthorized(req);
  }

  if (normalizedPathname.startsWith("/dashboard/panel")) {
    const allowedCategories = ["top-management", "corporaite"];
    const allowedServices = ["qualité", "productions", "maintenance"];
    if (role === "user" && allowedCategories.includes(userCategory || "")) {
      if (normalizedPathname.startsWith("/dashboard/panel/tag-panel/tag")) {
        if (allowedServices.includes(userService || "")) return;
        return redirectUnauthorized(req);
      }
      return;
    }

    return redirectUnauthorized(req);
  }

  if (normalizedPathname.startsWith("/dashboard/fps")) {
    const allowedCategories = ["operational", "midel-management"];
    if (role === "user" && allowedCategories.includes(userCategory || ""))
      return;
    return redirectUnauthorized(req);
  }

  return;
}

function redirectUnauthorized(req: NextRequest): NextResponse {
  return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
}
