"use client";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hooks";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ShowFpsHeader = () => {
  const t = useTranslations("FpssPanelPage.FpsPanel.status");
  const fps = useAppSelector((state) => state.fpss.fps);
  const fpsId = useAppSelector((state) => state.fpss.fps?.fpsId);
  console.log(fps);
  return (
    <div className="flex justify-between sm:px-3 pt-6">
      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/dashboard/panel/fps-panel"
          className="w-6 h-6 sm:w-7 sm:h-7 flex justify-center items-center text-base font-semibold text-grayscale-100 bg-greenAccent-900 bg-opacity-70 hover:bg-opacity-60 rounded-lg shadow-[0_0_2px] shadow-grayscale-500"
        >
          <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5 rotate-180" />
        </Link>
        <Separator
          orientation="vertical"
          className="h-6 ml-1 sm:ml-2 bg-greenAccent-900 bg-opacity-40"
        />
        <span className="text-[10px] sm:text-xl font-medium text-greenAccent-900">
          {fpsId}
        </span>
      </div>

      <div
        className={`px-3 py-1 flex items-center rounded-full shadow-[0_0_4px] ${
          fps?.status === "completed"
            ? "bg-greenAccent-800 shadow-greenAccent-900"
            : fps?.status === "failed"
            ? "bg-redAccent-800 shadow-redAccent-900"
            : "bg-orangeAccent shadow-orangeAccent"
        }`}
      >
        <span className="text-[10px] font-bold uppercase text-grayscale-100">
          {fps?.status === "completed"
            ? t("completed")
            : fps?.status === "failed"
            ? t("failed")
            : t("inProgress")}
        </span>
      </div>
    </div>
  );
};

export default ShowFpsHeader;
