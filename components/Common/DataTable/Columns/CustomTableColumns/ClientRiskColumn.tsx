import { Row } from "@tanstack/react-table";
import { Fpss } from "../FpssColumn";

const ClientRiskColumn = ({ row }: { row: Row<Fpss> }) => {
  const title = row.getValue("problem.clientRisk") ? "true" : "false";
  return (
    <div className="">
      <span className="flex text-sm font-medium text-grayscale-600 capitalize">
        {title}
      </span>
    </div>
  );
};

export default ClientRiskColumn;
