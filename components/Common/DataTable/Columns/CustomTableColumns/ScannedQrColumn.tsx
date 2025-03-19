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
    <div className="flex w-full h-full pr-5">
      <div
        className={`w-fit px-3 py-[5px] mx-auto flex items-center bg-opacity-80 rounded-full shadow-[0_0_2px] ${
          title === "scanned"
            ? "bg-greenAccent-800 shadow-greenAccent-900"
            : "bg-redAccent-800 shadow-redAccent-900"
        }`}
      >
        <span className="text-[11px] font-bold uppercase text-grayscale-100">
          {title === "notScanned" ? "Not Scanned" : title}
        </span>
      </div>
    </div>
  );
};

export default ScannedQrColumn;
