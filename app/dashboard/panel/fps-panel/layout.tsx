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
import FpssPanelDashboard from "@/components/Dashboard/Panel/Fps/FpssPanelDashboard";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="flex flex-col gap-8">
      <FpssPanelDashboard />
      {children}
    </div>
  );
}
