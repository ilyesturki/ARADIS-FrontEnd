import ProgressBox from "./ProgressBox";

const TagProgress = ({
  status,
}: {
  status: "toDo" | "done" | "open";
}) => {
  console.log(status);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center items-center gap-1.5 px-4">
        <ProgressBox status="done"></ProgressBox>
        <div className="w-[30px] h-[2px] bg-greenAccent-900 bg-opacity-60 rounded-sm"></div>
        <ProgressBox
          status={status === "toDo" ? "toDo" : "done"}
        ></ProgressBox>
        <div
          className={`w-[30px] h-[2px] ${
            status === "toDo"
              ? "bg-neutral-300"
              : "bg-greenAccent-900 bg-opacity-60"
          } rounded-sm`}
        >
          {status === "toDo" && (
            <div className="w-4 h-[2px] bg-greenAccent-900 bg-opacity-60 rounded-sm"></div>
          )}
        </div>
        <ProgressBox
          status={status === "toDo" ? "open" : "done"}
        ></ProgressBox>
      </div>
      <div className="flex justify-center gap-8">
        <span className="ml-1 text-[10px] font-bold text-greenAccent-900 text-opacity-70">
          Open
        </span>
        <span className="ml-4 text-[10px] font-bold text-greenAccent-900 text-opacity-70">
          In progress
        </span>
        <span
          className={`text-[10px] font-bold ${
            status === "toDo"
              ? "text-neutral-300"
              : "text-greenAccent-900 text-opacity-70"
          }`}
        >
          Resolved
        </span>
      </div>
    </div>
  );
};

export default TagProgress;
