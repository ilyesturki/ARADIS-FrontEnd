import providers from "./providers";
import { jwtCallback, sessionCallback } from "./callbacks";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers,
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
};

export default authOptions;
