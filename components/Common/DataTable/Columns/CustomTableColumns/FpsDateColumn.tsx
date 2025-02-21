import { Row } from "@tanstack/react-table";
import { Fpss } from "../FpssColumn";

const FpsDateColumn = ({ row }: { row: Row<Fpss> }) => {
  const title = new Date(row.getValue("problem.quand")).getUTCDate();
  return (
    <div className="">
      <span className="flex text-sm font-medium text-grayscale-600 capitalize">
        {title}
      </span>
    </div>
  );
};

export default FpsDateColumn;
