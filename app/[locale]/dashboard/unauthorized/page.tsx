"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnauthorizedPage() {
  const { data: session } = useSession({ required: true });
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    if (!session?.user) return;
    const role = session?.user.role;
    const userCategory = session?.user.userCategory;

    setRedirectTo(
      role === "admin"
        ? "/dashboard/users"
        : ["top-management", "corporaite"].includes(userCategory || "")
        ? "/dashboard/panel/fps-panel"
        : "/dashboard/fps"
    );
  }, [session]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-5xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-xl font-semibold text-gray-800">Access Denied</p>
      <p className="mt-2 text-gray-600">
        You do not have permission to access this page.
      </p>
      <Link
        href={redirectTo}
        className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700 transition"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}
