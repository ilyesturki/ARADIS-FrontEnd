import CustomBreadCrumb from "@/components/Common/BreadCrumb";
import DashboardSideBar from "@/components/SideBar/DashboardSideBar";
import type { Metadata } from "next";
import DashboardHeader from "@/components/Header/DashboardHeader";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-full bg-grayscale-100">
      <div className="h-full container flex">
        <DashboardSideBar />

        <div className=" flex-1 px-3 md:px-7 pb-4">
          <DashboardHeader />
          <div className=" flex flex-col gap-10 bg-grayscale-200 py-4 px-6 rounded-xl shadow-[0_0_3px] shadow-grayscale-400">
            <CustomBreadCrumb />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
