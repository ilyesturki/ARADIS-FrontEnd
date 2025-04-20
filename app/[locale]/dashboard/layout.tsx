import CustomBreadCrumb from "@/components/Common/BreadCrumb";
import DashboardSideBar from "@/components/SideBar/DashboardSideBar";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import PageTitle from "@/components/Common/PageTitle";

import LocaleSwitcher from "@/components/Common/LocaleSwitcher";
import ThemeToggle from "@/components/Common/ThemeToggle/ThemeToggle";
import Notifications from "@/components/Common/Notifications/Notifications";

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
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="w-full flex justify-between pl-4 pr-9">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 text-grayscale-500" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadCrumb />
            </div>
            <div className="flex items-center gap-2">
              <Notifications />
              <ThemeToggle />
              <LocaleSwitcher />
            </div>
          </div>
        </header>
        <main className="px-9 pb-4">
          <div className=" flex flex-col gap-7 bg-sidebar py-9 px-7 border rounded-md">
            {/* <PageTitle /> */}
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
