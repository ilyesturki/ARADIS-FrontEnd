"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

// const TagSelectedUsers = dynamic(
//   () => import("@/components/Dashboard/Tag/CreateTag/CreateTag"),
//   {
//     ssr: false,
//     loading: () => <Skeleton className="w-full pt-6" />,
//   }
// );

import TagQrCode from "./TagQrCode";
import TagSelectedUsers from "./TagSelectedUsers";
import QRCodeScanStatisticsChart from "../Chart/Tag/QRCodeScanStatisticsChart";
import { useTranslations } from "next-intl";

const TagPanel = () => {
  const t = useTranslations("TagsPanelPage.TagPanel.TagSelectedUsers");
  return (
    <div>
      {/* <span className="flex px-2 py-4 text-sm sm:text-[28px] font-semibold capitalize text-greenAccent-900 text-opacity-80">
        TAG panel
      </span> */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mt-5">
        <TagSelectedUsers title={t("tableTitle")} isSelectPageSizes={false} />
        <div className="flex-1 grid max-lg:-order-1 max-sm:grid-cols-1 max-lg:grid-cols-[auto_auto] lg:grid-rows-[auto_auto] gap-4">
          <TagQrCode />
          <QRCodeScanStatisticsChart />
        </div>
      </div>
    </div>
  );
};

export default TagPanel;
