import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CustomSideBar } from "@/components/SideBar/CustomSideBar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard",
};

import { getServerSession } from "next-auth";
import authOptions from "@/lib/NextAuth/authOptions";
import BreadCrumb from "@/components/Common/BreadCrumb";

import CustomDropDownMenu from "@/components/Common/CustomDropDownMenu";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <CustomSideBar session={session} />
      <SidebarInset className="dark:bg-gray-900">
        <header className="w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="w-full flex justify-between items-center max-sm:px-2 sm:pl-4 sm:pr-9">
            <div className="flex items-center gap-2">
              <SidebarTrigger className=" text-grayscale-500" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadCrumb />
            </div>
            <CustomDropDownMenu />
          </div>
        </header>
        <main className="sm:px-9 pb-4">
          <div className=" flex flex-col gap-7 bg-sidebar dark:bg-grayscale-500 dark:bg-opacity-90 py-9 px-2.5 sm:px-7 border sm:rounded-md">
            {/* <PageTitle /> */}
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
