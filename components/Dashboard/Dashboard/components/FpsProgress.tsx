import ProgressBox from "./ProgressBox";

const FpsProgress = ({
  status,
}: {
  status: "inProgress" | "completed" | "failed";
}) => {
  console.log(status);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center items-center gap-1.5 px-4">
        <ProgressBox status="done"></ProgressBox>
        <div className="w-[30px] h-[2px] bg-greenAccent-800 rounded-sm"></div>
        <ProgressBox
          status={status === "inProgress" ? "inProgress" : "done"}
        ></ProgressBox>
        <div
          className={`w-[30px] h-[2px] ${
            status === "inProgress" ? "bg-neutral-400" : "bg-greenAccent-800"
          } rounded-sm`}
        >
          {status === "inProgress" && (
            <div className="w-4 h-[2px] bg-neutral-300 rounded-sm"></div>
          )}
        </div>
        <ProgressBox
          status={status === "inProgress" ? "notYet" : "done"}
        ></ProgressBox>
      </div>
      <div className="flex justify-center gap-9">
        <span className="text-[10px] font-bold text-greenAccent-800">Open</span>
        <span className="text-[10px] font-bold text-greenAccent-800">
          In progress
        </span>
        <span
          className={`text-[10px] font-bold ${
            status === "inProgress"
              ? "text-neutral-300"
              : "text-greenAccent-800"
          }`}
        >
          Resolved
        </span>
      </div>
    </div>
  );
};

export default FpsProgress;
