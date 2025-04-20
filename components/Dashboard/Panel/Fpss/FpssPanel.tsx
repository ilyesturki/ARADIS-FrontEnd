"use client";
import React from "react";


import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
const FPSPerformanceChart = dynamic(
  () => import("../Chart/Fps/FPSPerformanceChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="flex-1 h-[390px]" />,
  }
);
const FPSStatusChart = dynamic(() => import("../Chart/Fps/FPSStatusChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-[390px]" />,
});

const CompletedFPSChart = dynamic(() => import("../Chart/Fps/CompletedFPSChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-[390px]" />,
});

const QrScanRadarChart = dynamic(() => import("../Chart/Fps/QrScanRadarChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-[390px]" />,
});

const FailedFPSChart = dynamic(() => import("../Chart/Fps/FailedFPSChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-[390px]" />,
});
// import { useSidebar } from "@/components/ui/sidebar";

const FpssPanel = () => {
  // const {
  //   state,
  //   open,
  //   setOpen,
  //   openMobile,
  //   setOpenMobile,
  //   isMobile,
  //   toggleSidebar,
  // } = useSidebar();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-rows-[repeat(6,auto)] sm:grid-rows-[auto_auto_auto] lg:grid-rows-[auto_auto] gap-6">
      <div className="sm:col-span-2 flex">
        <FPSPerformanceChart className="flex-1 !h-full" />
      </div>
      <FPSStatusChart />
      <QrScanRadarChart />
      <CompletedFPSChart />
      <FailedFPSChart />
    </div>
  );
};

export default FpssPanel;
