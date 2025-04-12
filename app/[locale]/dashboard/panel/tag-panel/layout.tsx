import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

import { getServerSession } from "next-auth";
import authOptions from "@/lib/NextAuth/authOptions";
import TagsPanel from "@/components/Dashboard/Panel/Tags/TagsPanel";
import TagsPageTitle from "@/components/Common/TagsPageTitle";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <TagsPageTitle />
      <div className="flex flex-col gap-8">
        <TagsPanel />
        {children}
      </div>
    </>
  );
}
