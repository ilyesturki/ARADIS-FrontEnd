"use client";
// import CreateTag from "@/components/Dashboard/Tag/CreateTag/CreateTag";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hooks";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ShowTagHeader = () => {
  const t = useTranslations("TagsPanelPage.TagPanel.status");
  const tag = useAppSelector((state) => state.tags.tag);
  const tagId = useAppSelector((state) => state.tags.tag?.tagId);
  console.log(tag);
  return (
    <div className="flex justify-between sm:px-3 pt-6">
      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/dashboard/panel/tag-panel"
          className="w-6 h-6 sm:w-7 sm:h-7 flex justify-center items-center text-base font-semibold text-grayscale-100 bg-greenAccent-900 bg-opacity-70 hover:bg-opacity-60 rounded-lg shadow-[0_0_2px] shadow-grayscale-500"
        >
          <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5 rotate-180" />
        </Link>
        <Separator
          orientation="vertical"
          className="h-6 ml-1 sm:ml-2 bg-greenAccent-900 bg-opacity-40"
        />
        <span className="text-[10px] sm:text-xl font-medium text-greenAccent-900">
          {tagId}
        </span>
      </div>

      <div
        className={`px-1.5 sm:px-3 sm:py-1 flex items-center rounded-full shadow-[0_0_4px] ${
          tag?.status === "done"
            ? "bg-greenAccent-800 shadow-greenAccent-900"
            : tag?.status === "toDo"
            ? "bg-redAccent-800 shadow-redAccent-900"
            : "bg-orangeAccent shadow-orangeAccent"
        }`}
      >
        <span className="text-[7px] sm:text-[10px] font-medium sm:font-bold uppercase text-grayscale-100">
          {tag?.status === "done"
            ? t("done")
            : tag?.status === "toDo"
            ? t("toDo")
            : t("open")}
        </span>
      </div>
    </div>
  );
};

export default ShowTagHeader;
