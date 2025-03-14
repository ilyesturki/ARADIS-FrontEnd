import { Row } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "../UsersColumn";

const ScannedQrColumn = ({
  row,
  className,
}: {
  row: Row<Users>;
  className?: string;
}) => {
  const title = row.getValue("status") as string;
  return (
    <div
      className={`w-fit px-3 py-1.5 flex items-center rounded-full shadow-[0_0_5px] ${
        title === "scanned"
          ? "bg-greenAccent-800 shadow-greenAccent-800"
          : "bg-redAccent-800 shadow-redAccent-800"
      }`}
    >
      <span className="text-xs font-bold uppercase text-grayscale-100">
        {title}
      </span>
    </div>
  );
};

export default ScannedQrColumn;
