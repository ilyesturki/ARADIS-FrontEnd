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

  console.log(
    "::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
  );
  console.log(pathname);
  console.log(token);
  console.log(
    "::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
  );

  // Public route: /auth (only for NOT logged in)
  if (normalizedPathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return;
  }

  // Require auth for all other routes
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Safely cast token fields
  const role = typeof token.role === "string" ? token.role : undefined;
  const userCategory =
    typeof token.userCategory === "string" ? token.userCategory : undefined;
  const userService =
    typeof token.userService === "string" ? token.userService : undefined;

  // Check for each protected route with language prefix handling
  if (normalizedPathname === "/dashboard") return;

  if (normalizedPathname.startsWith("/dashboard/fps")) {
    if (["operational", "midel-management"].includes(userCategory || ""))
      return;
    return redirectUnauthorized(req);
  }

  if (normalizedPathname.startsWith("/dashboard/users")) {
    if (role === "admin") return;
    return redirectUnauthorized(req);
  }

  if (normalizedPathname === "/dashboard/panel") {
    if (["top-management", "corporaite"].includes(userCategory || "")) return;
    return redirectUnauthorized(req);
  }

  if (normalizedPathname.startsWith("/dashboard/panel/tag-panel/tag")) {
    const allowedCategories = ["top-management", "corporaite"];
    const allowedServices = ["qualité", "productions", "maintenance"];
    if (
      allowedCategories.includes(userCategory || "") &&
      allowedServices.includes(userService || "")
    )
      return;
    return redirectUnauthorized(req);
  }

  return;
}

function redirectUnauthorized(req: NextRequest): NextResponse {
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}
