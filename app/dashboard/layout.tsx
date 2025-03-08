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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <SidebarProvider>
      <CustomSideBar session={session} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadCrumb />
          </div>
        </header>
        <main className="px-9 pb-4">
          <div className=" flex flex-col gap-8 bg-sidebar-accent py-6 px-7 rounded-[7px] shadow-[0_0_3px] shadow-grayscale-400">
            <PageTitle />
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
