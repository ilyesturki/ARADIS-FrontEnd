"use client";
import React from "react";
import CustomPieChart from "../Chart/CustomPieChart";
// import FPSPerformanceChart from "../Chart/FPSPerformanceChart";
import CustomBarChart from "../Chart/CustomBarChart";
// import FPSStatusChart from "../Chart/FPSStatusChart";
// import CompletedFPSChart from "../Chart/CompletedFPSChart";
// import QrScanRadarChart from "../Chart/QrScanRadarChart";
// import FailedFPSChart from "../Chart/FailedFPSChart";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
const FPSPerformanceChart = dynamic(
  () => import("../Chart/FPSPerformanceChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="flex-1 h-[390px]" />,
  }
);
const FPSStatusChart = dynamic(() => import("../Chart/FPSStatusChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-[390px]" />,
});

const CompletedFPSChart = dynamic(() => import("../Chart/CompletedFPSChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-[390px]" />,
});

const QrScanRadarChart = dynamic(() => import("../Chart/QrScanRadarChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-[390px]" />,
});

const FailedFPSChart = dynamic(() => import("../Chart/FailedFPSChart"), {
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
