import { Row } from "@tanstack/react-table";
import { Fpss } from "../FpssColumn";
import { fpsProblemType } from "@/redux/fps/fpsSlice";
import { useTranslations } from "next-intl";

const ClientRiskColumn = ({ row }: { row: Row<Fpss> }) => {
  const t = useTranslations("FpssPanelPage.rows.clientRisk");
  const problem = row.getValue("problem") as fpsProblemType;
  return (
    <div
      className={`w-fit px-5 py-1 flex items-center bg-opacity-90 border rounded-md shadow-[0_0_2px] ${
        problem.clientRisk
          ? "bg-redAccent-800 shadow-redAccent-900"
          : "bg-greenAccent-800 shadow-greenAccent-900"
      }`}
    >
      <span className="text-[10px] font-bold text-grayscale-100">
        {problem.clientRisk ? t("yes") : t("no")}
      </span>
    </div>
  );
};

export default ClientRiskColumn;
