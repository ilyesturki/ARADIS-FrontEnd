import { Row } from "@tanstack/react-table";
import { Fpss } from "../FpssColumn";

const FpsDateColumn = ({ data }: { data: any }) => {
  const rawDate = data.quand as string;
  console.log(rawDate);
  const formattedDate = rawDate
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(rawDate))
    : "Invalid Date";

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-700">{formattedDate}</span>
    </div>
  );
};

export default FpsDateColumn;
