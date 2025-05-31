import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { authGuard } from "./lib/middleware/authGuard";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const intlResponse = intlMiddleware(req);

  if (intlResponse instanceof Response && intlResponse.status !== 200) {
    return intlResponse;
  }

  const authResponse = await authGuard(req);
  return authResponse ?? intlResponse;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};


