import axios from "axios";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/NextAuth/authOptions";

const instance = axios.create();

instance.interceptors.request.use(
  async (config) => {
    let token: string | null = null;

    if (typeof window === "undefined") {
      const session = await getServerSession(authOptions);
      token = session?.user?.token || null;
    } else {
      const session = await getSession();
      token = session?.user?.token || null;
    }

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
