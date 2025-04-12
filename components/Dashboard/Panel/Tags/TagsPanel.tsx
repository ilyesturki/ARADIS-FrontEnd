"use client";


import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const TAGStatusChart = dynamic(() => import("../Chart/Tag/TAGStatusChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-[390px]" />,
});

const CompletedTAGChart = dynamic(
  () => import("../Chart/Tag/CompletedTAGChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[390px]" />,
  }
);

const QrScanRadarChart = dynamic(
  () => import("../Chart/Tag/QrScanRadarChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[390px]" />,
  }
);

// import { useSidebar } from "@/components/ui/sidebar";

const TagsPanel = () => {
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
      {/* <div className="sm:col-span-2 flex">
        <TAGPerformanceChart className="flex-1 !h-full" />
      </div> */}
      <QrScanRadarChart />
      <CompletedTAGChart />
      <TAGStatusChart />

      {/* <FailedTAGChart /> */}
    </div>
  );
};

export default TagsPanel;
