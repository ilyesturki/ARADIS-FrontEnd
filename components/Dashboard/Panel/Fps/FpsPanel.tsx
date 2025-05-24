"use client";

import FpsQrCode from "./FpsQrCode";
import FpsSelectedUsers from "./FpsSelectedUsers";
import QRCodeScanStatisticsChart from "../Chart/Fps/QRCodeScanStatisticsChart";
import { useTranslations } from "next-intl";

const FpsPanel = () => {
  const t = useTranslations("FpssPanelPage.FpsPanel.FpsSelectedUsers");
  return (
    <div>
      {/* <span className="flex px-2 py-4 text-sm sm:text-[28px] font-semibold capitalize text-greenAccent-900 text-opacity-80">
        FPS panel
      </span> */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mt-5">
        <FpsSelectedUsers title={t("tableTitle")} isSelectPageSizes={false} />
        <div className="flex-1 grid max-lg:-order-1 max-sm:grid-cols-1 max-lg:grid-cols-[1fr_1fr] lg:grid-rows-[1fr_1fr] gap-4">
          <FpsQrCode />
          <QRCodeScanStatisticsChart />
        </div>
      </div>
    </div>
  );
};

export default FpsPanel;
