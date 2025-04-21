import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

import { getServerSession } from "next-auth";
import authOptions from "@/lib/NextAuth/authOptions";
import FpssPanel from "@/components/Dashboard/Panel/Fpss/FpssPanel";
import FpssHeader from "@/components/Common/FpssHeader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <FpssHeader />
      <div className="flex flex-col gap-8">
        <FpssPanel />
        {children}
      </div>
    </>
  );
}
