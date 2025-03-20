import { Row } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FpsSelectedUsersColumn } from "../FpsSelectedUsersColumn";

const ScannedQrColumn = ({
  row,
  className,
}: {
  row: Row<FpsSelectedUsersColumn>;
  className?: string;
}) => {
  const title = row.getValue("scanStatus") as string;
  return (
    // <div className="flex w-full h-full pr-6">
    <div
      className={`w-fit px-2 py-0.5 flex items-center bg-opacity-90 border rounded-md shadow-[0_0_2px] ${
        title === "scanned"
          ? "bg-greenAccent-800 shadow-greenAccent-900"
          : "bg-redAccent-800 shadow-redAccent-900"
      }`}
    >
      <span className="text-[10px] font-bold uppercase text-grayscale-100">
        {title === "notScanned" ? "Not Scanned" : title}
      </span>
    </div>
    // </div>
  );
};

export default ScannedQrColumn;
