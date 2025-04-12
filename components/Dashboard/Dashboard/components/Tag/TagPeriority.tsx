import { Badge } from "@/components/ui/badge";
import { GoAlertFill } from "react-icons/go";
const TagPeriority = ({ periority }: { periority: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-neutral-500">Periority :</span>

      <Badge
        variant={periority ? "destructive" : "default"}
        className={`flex items-center gap-1 px-1.5 py-1  ${
          periority ? "bg-orangeAccent" : "bg-blueAccent"
        } bg-opacity-10 rounded-sm`}
      >
        {periority ? (
          <GoAlertFill className="text-[16px] text-redAccent-900" />
        ) : (
          <GoAlertFill className="text-sm text-blueAccent" />
        )}

        <span
          className={`text-[12px] font-bold ${
            periority ? "text-redAccent-900" : "text-blueAccent"
          }`}
        >
          {periority ? "Urgent" : "Normal"}
        </span>
      </Badge>

      {/* <div
        className={`flex items-center gap-1 px-1.5 py-1.5  ${
          periority ? "bg-redAccent-900" : "bg-blueAccent"
        } bg-opacity-10 rounded-sm`}
      >
        {periority ? (
          <GoAlertFill className="text-sm text-redAccent-900" />
        ) : (
          <GoAlertFill className="text-sm text-blueAccent" />
        )}

        <span
          className={`text-[10px] font-bold ${
            periority ? "text-redAccent-900" : "text-blueAccent"
          }`}
        >
          {periority ? "Urgent" : "Normal"}
        </span>
      </div> */}
    </div>
  );
};

export default TagPeriority;
