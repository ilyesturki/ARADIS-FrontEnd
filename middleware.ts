// middleware.ts
import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { authGuard } from "./lib/middleware/authGuard";

// Run i18n middleware first
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const intlResponse = intlMiddleware(req);

  // Let i18n middleware redirect if needed (e.g., no locale)
  if (intlResponse instanceof Response && intlResponse.status !== 200) {
    return intlResponse;
  }

  // Then check route access based on session
  const authResponse = await authGuard(req);
  return authResponse ?? intlResponse;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//   // Match all pathnames except for
//   // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
//   // - … the ones containing a dot (e.g. `favicon.ico`)
//   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
// };
