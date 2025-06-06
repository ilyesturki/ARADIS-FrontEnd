import { Row } from "@tanstack/react-table";
import { FpsSelectedUsersColumn } from "../FpsSelectedUsersColumn";
import { useTranslations } from "next-intl";

const ScannedQrColumn = ({ row }: { row: Row<FpsSelectedUsersColumn> }) => {
  const t = useTranslations("FpssPanelPage.FpsPanel.FpsSelectedUsers.rows");
  const title = row.getValue("scanStatus") as string;
  return (
    <div
      className={`w-[70px] py-0.5 flex items-center justify-center bg-opacity-90 border rounded-md shadow-[0_0_2px] ${
        title === "scanned"
          ? "bg-greenAccent-800 shadow-greenAccent-900"
          : "bg-redAccent-800 shadow-redAccent-900"
      }`}
    >
      <span className="text-[10px] font-bold text-grayscale-100">
        {title === "scanned"
          ? t("scanStatus.scanned")
          : t("scanStatus.unscanned")}
      </span>
    </div>
  );
};

export default ScannedQrColumn;
