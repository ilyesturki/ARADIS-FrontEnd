// "use client";
import React from "react";
import CustomPieChart from "../Chart/CustomPieChart";
import FPSPerformanceChart from "../Chart/FPSPerformanceChart";
import CustomBarChart from "../Chart/CustomBarChart";
import FPSStatusChart from "../Chart/FPSStatusChart";
import CompletedFPSChart from "../Chart/CompletedFPSChart";
import QrScanRadarChart from "../Chart/QrScanRadarChart";
import FailedFPSChart from "../Chart/FailedFPSChart";

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
    <div className="grid  sm:grid-cols-2 lg:grid-cols-3 grid-rows-[repeat(6,auto)] sm:grid-rows-[auto_auto_auto] lg:grid-rows-[auto_auto] gap-6">
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
