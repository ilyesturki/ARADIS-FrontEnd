import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

interface SignInData {
  provider: string;
  providerId: string;
  email: string;
  name: string;
  image: string;
}

declare module "next-auth" {
  interface User {
    _id?: string;
    token?: string;
    role?: string;
  }
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      token?: string;
      role?: string;
    };
  }
}

export const signInCallback = async ({
  user,
  account,
  profile,
}: {
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
}): Promise<boolean | string> => {
  if (account?.provider === "google") {
    const data: SignInData = {
      provider: account.provider as string,
      providerId: account.providerAccountId as string,
      email: user.email as string,
      name: user.name as string,
      image: user.image as string,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/provider-sign-in`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );
      const userData = await res.json();
      if (res.ok) {
        if (userData?.data?._id && userData?.token) {
          user._id = userData.data._id;
          user.role = userData.data.role;
          (user as any).id = user._id;
          (user as any).role = user.role;
          (user as any).token = userData.token;

          console.log("2222222222222222222222");
          console.log(userData);
          console.log(user.role);

          return true;
          // return "/auth/success";
        } else {
          return `/auth/login?error=${encodeURIComponent("Sign-in failed")}`;
        }
      } else {
        return `/auth/login?error=${encodeURIComponent(
          userData?.message || "Sign-in failed" 
        )}`;
      }
    } catch (error: Error | any) {
      return `/login?error=${encodeURIComponent(
        error.response?.data?.message || "Sign-in failed"
      )}`;
    }
  }
  return true;
};

export const jwtCallback = async ({
  token,
  user,
}: {
  token: JWT;
  user?: User | AdapterUser;
}): Promise<JWT> => {
  if (user) {
    token.id = user._id;
    token.token = user.token;
    token.role=user.role;
    console.log("tokentokentokentokentokentokentokentoken");
    console.log("useruseruseruseruseruseruseruseruseruser");
    console.log(token);
    console.log(user)
  }
  return token;
};

export const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  if (session.user) {
    console.log(
      "sessiontokensessiontokensessiontokensessiontokensessiontokensessiontoken"
    );
    console.log(session);
    console.log(token);
    session.user.id = token.id as string;
    session.user.role = token.role as string;
    session.user.token = token.token as string;
  }
  return session;
};
