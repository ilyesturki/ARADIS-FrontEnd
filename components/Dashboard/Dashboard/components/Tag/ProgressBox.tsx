import { FaCheck } from "react-icons/fa";

const ProgressBox = ({
  status,
}: {
  status: "done" | "toDo" | "open";
}) => {
  return (
    <div
      className={`w-10 h-10 flex justify-center items-center ${
        status === "done"
          ? "bg-greenAccent-900 bg-opacity-60"
          : status === "toDo"
          ? "border-2 border-greenAccent-900"
          : "bg-neutral-300"
      } rounded-full`}
    >
      <span
        className={`text-base ${
          status === "toDo"
            ? "text-greenAccent-900"
            : "text-grayscale-100"
        }  font-bold`}
      >
        {status === "toDo" ? (
          "2"
        ) : status === "open" ? (
          "3"
        ) : (
          <FaCheck />
        )}
      </span>
    </div>
  );
};

export default ProgressBox;
