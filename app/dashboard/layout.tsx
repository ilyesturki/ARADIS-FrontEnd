import CustomBreadCrumb from "@/components/Common/BreadCrumb";
import DashboardSideBar from "@/components/SideBar/DashboardSideBar";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";

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
      <Header />
      <div className="h-full container flex">
        <DashboardSideBar />

        <div className=" flex-1 px-4 py-4">
          {/* <DashboardHeader /> */}
          <div className=" flex flex-col gap-10 bg-grayscale-200 py-4 px-6 rounded-lg shadow-[0_0_3px] shadow-grayscale-400">
            <CustomBreadCrumb />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
