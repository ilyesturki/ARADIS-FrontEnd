import ProgressBox from "./ProgressBox";

const TagProgress = ({ status }: { status: "open" | "toDo" | "done" }) => {
  console.log(status);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center items-center gap-1.5 px-4">
        <ProgressBox status="done"></ProgressBox>
        <div className="w-[30px] h-[2px] bg-greenAccent-900 bg-opacity-60 rounded-sm"></div>
        <ProgressBox
          status={status === "toDo" ? "done" : "inProgress"}
        ></ProgressBox>
        <div
          className={`w-[30px] h-[2px] ${
            status === "open"
              ? "bg-neutral-300"
              : "bg-greenAccent-900 bg-opacity-60"
          } rounded-sm`}
        >
          {status === "open" && (
            <div className="w-4 h-[2px] bg-greenAccent-900  dark:text-grayscale-400  bg-opacity-60 rounded-sm"></div>
          )}
        </div>
        <ProgressBox
          status={status === "toDo" ? "done" : "notYet"}
        ></ProgressBox>
      </div>
      <div className="flex justify-center gap-14">
        <span className="text-[10px] font-bold text-greenAccent-900  dark:text-grayscale-400  text-opacity-70">
          Open
        </span>
        <span className=" text-[10px] font-bold text-greenAccent-900  dark:text-grayscale-400  text-opacity-70">
          To Do
        </span>
        <span
          className={`text-[10px] font-bold ${
            status === "open"
              ? "text-neutral-300"
              : "text-greenAccent-900 text-opacity-70  dark:text-grayscale-400 "
          }`}
        >
          Done
        </span>
      </div>
    </div>
  );
};

export default TagProgress;
