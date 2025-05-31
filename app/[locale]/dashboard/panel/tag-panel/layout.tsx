import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

import { getServerSession } from "next-auth";
import authOptions from "@/lib/NextAuth/authOptions";
import TagsPanel from "@/components/Dashboard/Panel/Tags/TagsPanel";
import TagsHeader from "@/components/Common/TagsHeader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <TagsHeader />
      <div className="flex flex-col gap-8">
        <TagsPanel />
        {children}
      </div>
    </>
  );
}
